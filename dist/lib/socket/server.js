"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomType = exports.ChatSocketServer = void 0;
exports.getChatSocketServer = getChatSocketServer;
const socket_io_1 = require("socket.io");
const logger_1 = require("@/lib/logger");
const prisma_1 = require("@/lib/prisma");
const client_1 = require("@/services/retell/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Room types for different conversation contexts
var RoomType;
(function (RoomType) {
    RoomType["CONVERSATION"] = "conversation";
    RoomType["CASE"] = "case";
    RoomType["SUPPORT"] = "support";
    RoomType["BROADCAST"] = "broadcast";
})(RoomType || (exports.RoomType = RoomType = {}));
class ChatSocketServer {
    constructor(httpServer) {
        this.activeSessions = new Map();
        this.roomParticipants = new Map();
        this.reconnectionTokens = new Map();
        // Rate limiting
        this.rateLimitMap = new Map();
        this.RATE_LIMIT_WINDOW = 60000; // 1 minute
        this.RATE_LIMIT_MAX = 30; // 30 messages per minute
        this.io = new socket_io_1.Server(httpServer, {
            cors: {
                origin: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
                credentials: true,
            },
            transports: ['websocket', 'polling'],
            pingTimeout: 60000,
            pingInterval: 25000,
        });
        this.setupMiddleware();
        this.setupEventHandlers();
        this.setupRoomHandlers();
        this.setupNotificationHandlers();
        this.setupCaseHandlers();
        this.setupReconnectionHandlers();
    }
    setupMiddleware() {
        // Authentication middleware
        this.io.use(async (socket, next) => {
            try {
                const sessionId = socket.handshake.auth.sessionId || `session_${Date.now()}`;
                const language = socket.handshake.auth.language || 'en';
                const token = socket.handshake.auth.token;
                const reconnectionToken = socket.handshake.auth.reconnectionToken;
                let userId;
                let userRole;
                let authenticated = false;
                // Try to authenticate with JWT token
                if (token) {
                    try {
                        const decoded = jsonwebtoken_1.default.verify(token, process.env.NEXTAUTH_SECRET);
                        userId = decoded.id;
                        userRole = decoded.role;
                        authenticated = true;
                    }
                    catch (error) {
                        logger_1.wsLogger.warn(socket.id, 'Invalid JWT token');
                    }
                }
                // Try to reconnect with reconnection token
                if (!authenticated && reconnectionToken) {
                    const sessionData = this.reconnectionTokens.get(reconnectionToken);
                    if (sessionData) {
                        const previousSession = JSON.parse(sessionData);
                        userId = previousSession.userId;
                        userRole = previousSession.userRole;
                        authenticated = previousSession.authenticated;
                        this.reconnectionTokens.delete(reconnectionToken);
                    }
                }
                socket.data = {
                    sessionId,
                    language,
                    userId,
                    userRole,
                    authenticated,
                };
                logger_1.wsLogger.connection(socket.id, {
                    sessionId,
                    language,
                    userId,
                    authenticated,
                    userAgent: socket.handshake.headers['user-agent'],
                });
                next();
            }
            catch (error) {
                logger_1.wsLogger.error(socket.id, error);
                next(new Error('Authentication failed'));
            }
        });
    }
    setupEventHandlers() {
        this.io.on('connection', socket => {
            const clientId = socket.id;
            const socketData = socket.data;
            this.activeSessions.set(clientId, socketData);
            // Generate reconnection token
            const reconnectionToken = this.generateReconnectionToken(socketData);
            socket.emit('auth:reconnection-token', { token: reconnectionToken });
            // Handle chat initialization
            socket.on('chat:init', async (data) => {
                try {
                    socketData.userId = data.userId || socketData.userId;
                    if (data.language) {
                        socketData.language = data.language;
                    }
                    // Create a new conversation
                    const conversation = await (0, prisma_1.getPrismaClient)().conversation.create({
                        data: {
                            userId: socketData.userId || 'anonymous',
                            channel: 'chat',
                            status: 'active',
                            language: socketData.language,
                            metadata: {
                                socketId: clientId,
                                sessionId: socketData.sessionId,
                                authenticated: socketData.authenticated,
                            },
                        },
                    });
                    socketData.conversationId = conversation.id;
                    socketData.roomId = `conversation_${conversation.id}`;
                    // Join conversation room
                    await this.joinRoom(socket, socketData.roomId, RoomType.CONVERSATION);
                    // Send welcome message
                    const welcomeMessage = await this.getWelcomeMessage(socketData.language);
                    socket.emit('message', {
                        role: 'assistant',
                        content: welcomeMessage,
                        timestamp: new Date().toISOString(),
                    });
                    logger_1.wsLogger.message(clientId, 'chat_initialized', 'outbound', welcomeMessage.length);
                }
                catch (error) {
                    logger_1.wsLogger.error(clientId, error);
                    socket.emit('error', { message: 'Failed to initialize chat' });
                }
            });
            // Handle incoming messages
            socket.on('message', async (message) => {
                try {
                    const { content, metadata } = message;
                    // Rate limiting check
                    if (!this.checkRateLimit(clientId)) {
                        socket.emit('error', { message: 'Too many messages. Please slow down.' });
                        return;
                    }
                    logger_1.wsLogger.message(clientId, 'user_message', 'inbound', content.length);
                    logger_1.userFlowLogger.flowStep('chat_interaction', 'message_received', socketData.sessionId);
                    // Store user message
                    if (socketData.conversationId) {
                        await (0, prisma_1.getPrismaClient)().message.create({
                            data: {
                                conversationId: socketData.conversationId,
                                role: 'user',
                                content,
                                metadata: metadata || {},
                            },
                        });
                    }
                    // Broadcast typing indicator to room
                    if (socketData.roomId) {
                        socket.to(socketData.roomId).emit('typing', {
                            userId: socketData.userId,
                            isTyping: true,
                        });
                    }
                    // Send typing indicator
                    socket.emit('typing', { isTyping: true });
                    // Process message with AI
                    const response = await this.processMessage(content, socketData);
                    // Store AI response
                    if (socketData.conversationId) {
                        await (0, prisma_1.getPrismaClient)().message.create({
                            data: {
                                conversationId: socketData.conversationId,
                                role: 'assistant',
                                content: response.content,
                                metadata: response.metadata || {},
                            },
                        });
                    }
                    // Send response
                    socket.emit('typing', { isTyping: false });
                    socket.emit('message', {
                        role: 'assistant',
                        content: response.content,
                        metadata: response.metadata,
                        timestamp: new Date().toISOString(),
                    });
                    // Broadcast to room if applicable
                    if (socketData.roomId) {
                        socket.to(socketData.roomId).emit('typing', {
                            userId: socketData.userId,
                            isTyping: false,
                        });
                    }
                    logger_1.wsLogger.message(clientId, 'assistant_message', 'outbound', response.content.length);
                    // Check if we need to escalate to human or voice
                    if (response.metadata?.escalate) {
                        await this.handleEscalation(socket, response.metadata.escalationType);
                    }
                }
                catch (error) {
                    logger_1.wsLogger.error(clientId, error);
                    socket.emit('typing', { isTyping: false });
                    socket.emit('error', { message: 'Failed to process message' });
                }
            });
            // Handle virtual assistant messages
            socket.on('user:message', async (data) => {
                try {
                    const { text, language, timestamp } = data;
                    logger_1.wsLogger.message(clientId, 'virtual_assistant_message', 'inbound', text.length);
                    // Store user message
                    if (socketData.conversationId) {
                        await (0, prisma_1.getPrismaClient)().message.create({
                            data: {
                                conversationId: socketData.conversationId,
                                role: 'user',
                                content: text,
                                metadata: { source: 'virtual_assistant', timestamp },
                            },
                        });
                    }
                    // Process with AI
                    const response = await this.processMessage(text, { ...socketData, language });
                    // Store AI response
                    if (socketData.conversationId) {
                        await (0, prisma_1.getPrismaClient)().message.create({
                            data: {
                                conversationId: socketData.conversationId,
                                role: 'assistant',
                                content: response.content,
                                metadata: { ...response.metadata, source: 'virtual_assistant' },
                            },
                        });
                    }
                    // Send response to virtual assistant
                    socket.emit('assistant:message', {
                        id: Date.now().toString(),
                        text: response.content,
                        metadata: response.metadata,
                        timestamp: new Date().toISOString(),
                    });
                    logger_1.wsLogger.message(clientId, 'virtual_assistant_response', 'outbound', response.content.length);
                }
                catch (error) {
                    logger_1.wsLogger.error(clientId, error);
                    socket.emit('assistant:error', { message: 'Failed to process message' });
                }
            });
            // Handle language change
            socket.on('language:change', (language) => {
                socketData.language = language;
                socket.emit('language:changed', { language });
            });
            // Handle typing indicators
            socket.on('typing:start', () => {
                if (socketData.roomId) {
                    socket.to(socketData.roomId).emit('typing', {
                        userId: socketData.userId,
                        isTyping: true,
                    });
                }
            });
            socket.on('typing:stop', () => {
                if (socketData.roomId) {
                    socket.to(socketData.roomId).emit('typing', {
                        userId: socketData.userId,
                        isTyping: false,
                    });
                }
            });
            // Handle disconnect
            socket.on('disconnect', async (reason) => {
                try {
                    const sessionDuration = Date.now() - parseInt(socketData.sessionId.split('_')[1]);
                    logger_1.wsLogger.disconnection(clientId, reason, sessionDuration);
                    // Leave all rooms
                    if (socketData.roomId) {
                        await this.leaveRoom(socket, socketData.roomId);
                    }
                    // Update conversation status
                    if (socketData.conversationId) {
                        await (0, prisma_1.getPrismaClient)().conversation.update({
                            where: { id: socketData.conversationId },
                            data: {
                                status: 'closed',
                                endedAt: new Date(),
                                metadata: {
                                    disconnectReason: reason,
                                    duration: sessionDuration,
                                },
                            },
                        });
                    }
                    this.activeSessions.delete(clientId);
                }
                catch (error) {
                    logger_1.wsLogger.error(clientId, error);
                }
            });
        });
    }
    setupRoomHandlers() {
        this.io.on('connection', socket => {
            const socketData = socket.data;
            // Join a specific room
            socket.on('room:join', async (data) => {
                try {
                    // Check authorization
                    if (!this.canJoinRoom(socketData, data.roomId, data.roomType)) {
                        socket.emit('room:error', { message: 'Unauthorized to join this room' });
                        return;
                    }
                    await this.joinRoom(socket, data.roomId, data.roomType);
                    socket.emit('room:joined', { roomId: data.roomId });
                    // Notify other participants
                    socket.to(data.roomId).emit('room:participant-joined', {
                        userId: socketData.userId,
                        socketId: socket.id,
                    });
                }
                catch (error) {
                    logger_1.wsLogger.error(socket.id, error);
                    socket.emit('room:error', { message: 'Failed to join room' });
                }
            });
            // Leave a room
            socket.on('room:leave', async (data) => {
                try {
                    await this.leaveRoom(socket, data.roomId);
                    socket.emit('room:left', { roomId: data.roomId });
                    // Notify other participants
                    socket.to(data.roomId).emit('room:participant-left', {
                        userId: socketData.userId,
                        socketId: socket.id,
                    });
                }
                catch (error) {
                    logger_1.wsLogger.error(socket.id, error);
                    socket.emit('room:error', { message: 'Failed to leave room' });
                }
            });
            // Send message to room
            socket.on('room:message', async (data) => {
                try {
                    if (!socket.rooms.has(data.roomId)) {
                        socket.emit('room:error', { message: 'Not in this room' });
                        return;
                    }
                    // Broadcast to room
                    this.io.to(data.roomId).emit('room:message', {
                        userId: socketData.userId,
                        message: data.message,
                        timestamp: new Date().toISOString(),
                    });
                }
                catch (error) {
                    logger_1.wsLogger.error(socket.id, error);
                    socket.emit('room:error', { message: 'Failed to send room message' });
                }
            });
        });
    }
    setupNotificationHandlers() {
        this.io.on('connection', socket => {
            const socketData = socket.data;
            // Subscribe to notifications
            socket.on('notifications:subscribe', async () => {
                try {
                    if (!socketData.userId) {
                        socket.emit('notifications:error', { message: 'Authentication required' });
                        return;
                    }
                    // Join user's notification room
                    const notificationRoom = `notifications_${socketData.userId}`;
                    socket.join(notificationRoom);
                    // Fetch and send unread notifications
                    const unreadNotifications = await (0, prisma_1.getPrismaClient)().notification.findMany({
                        where: {
                            userId: socketData.userId,
                            read: false,
                        },
                        orderBy: { createdAt: 'desc' },
                        take: 10,
                    });
                    socket.emit('notifications:initial', { notifications: unreadNotifications });
                }
                catch (error) {
                    logger_1.wsLogger.error(socket.id, error);
                    socket.emit('notifications:error', { message: 'Failed to subscribe to notifications' });
                }
            });
            // Mark notification as read
            socket.on('notifications:mark-read', async (data) => {
                try {
                    if (!socketData.userId) {
                        socket.emit('notifications:error', { message: 'Authentication required' });
                        return;
                    }
                    await (0, prisma_1.getPrismaClient)().notification.update({
                        where: {
                            id: data.notificationId,
                            userId: socketData.userId,
                        },
                        data: { read: true },
                    });
                    socket.emit('notifications:marked-read', { notificationId: data.notificationId });
                }
                catch (error) {
                    logger_1.wsLogger.error(socket.id, error);
                    socket.emit('notifications:error', { message: 'Failed to mark notification as read' });
                }
            });
        });
    }
    setupCaseHandlers() {
        this.io.on('connection', socket => {
            const socketData = socket.data;
            // Subscribe to case updates
            socket.on('case:subscribe', async (data) => {
                try {
                    if (!socketData.authenticated) {
                        socket.emit('case:error', { message: 'Authentication required' });
                        return;
                    }
                    // Verify user has access to this case
                    const userCase = await (0, prisma_1.getPrismaClient)().case.findFirst({
                        where: {
                            id: data.caseId,
                            OR: [{ clientId: socketData.userId }, { attorneyId: socketData.userId }],
                        },
                    });
                    if (!userCase) {
                        socket.emit('case:error', { message: 'Unauthorized to access this case' });
                        return;
                    }
                    // Join case room
                    const caseRoom = `case_${data.caseId}`;
                    await this.joinRoom(socket, caseRoom, RoomType.CASE);
                    socket.emit('case:subscribed', { caseId: data.caseId });
                }
                catch (error) {
                    logger_1.wsLogger.error(socket.id, error);
                    socket.emit('case:error', { message: 'Failed to subscribe to case updates' });
                }
            });
            // Unsubscribe from case updates
            socket.on('case:unsubscribe', async (data) => {
                try {
                    const caseRoom = `case_${data.caseId}`;
                    await this.leaveRoom(socket, caseRoom);
                    socket.emit('case:unsubscribed', { caseId: data.caseId });
                }
                catch (error) {
                    logger_1.wsLogger.error(socket.id, error);
                    socket.emit('case:error', { message: 'Failed to unsubscribe from case updates' });
                }
            });
        });
    }
    setupReconnectionHandlers() {
        this.io.on('connection', socket => {
            const socketData = socket.data;
            // Handle reconnection
            socket.on('reconnect:attempt', async (data) => {
                try {
                    if (data.conversationId) {
                        // Restore conversation state
                        const conversation = await (0, prisma_1.getPrismaClient)().conversation.findUnique({
                            where: { id: data.conversationId },
                            include: {
                                messages: {
                                    orderBy: { createdAt: 'desc' },
                                    take: 20,
                                },
                            },
                        });
                        if (conversation) {
                            socketData.conversationId = conversation.id;
                            socketData.roomId = `conversation_${conversation.id}`;
                            // Rejoin room
                            await this.joinRoom(socket, socketData.roomId, RoomType.CONVERSATION);
                            // Send conversation history
                            socket.emit('reconnect:success', {
                                conversation: {
                                    id: conversation.id,
                                    messages: conversation.messages.reverse(),
                                },
                            });
                        }
                    }
                }
                catch (error) {
                    logger_1.wsLogger.error(socket.id, error);
                    socket.emit('reconnect:error', { message: 'Failed to restore session' });
                }
            });
        });
    }
    async processMessage(content, socketData) {
        // This is where you'd integrate with your AI service
        // For now, we'll create a simple response system
        const lowerContent = content.toLowerCase();
        // Check for specific intents
        if (lowerContent.includes('appointment') || lowerContent.includes('schedule')) {
            return {
                content: socketData.language === 'es'
                    ? 'Puedo ayudarte a programar una cita. ¿Qué tipo de consulta legal necesitas?'
                    : 'I can help you schedule an appointment. What type of legal consultation do you need?',
                metadata: { intent: 'appointment' },
            };
        }
        if (lowerContent.includes('immigration') || lowerContent.includes('visa')) {
            return {
                content: socketData.language === 'es'
                    ? 'Nuestro equipo de inmigración puede ayudarte. ¿Necesitas ayuda con una visa, residencia, o ciudadanía?'
                    : 'Our immigration team can help you. Do you need assistance with a visa, green card, or citizenship?',
                metadata: { intent: 'immigration', practiceArea: 'immigration' },
            };
        }
        if (lowerContent.includes('accident') || lowerContent.includes('injury')) {
            return {
                content: socketData.language === 'es'
                    ? 'Lamento escuchar sobre tu accidente. ¿Cuándo ocurrió y has recibido atención médica?'
                    : "I'm sorry to hear about your accident. When did it occur and have you received medical attention?",
                metadata: { intent: 'personal_injury', practiceArea: 'personal_injury' },
            };
        }
        if (lowerContent.includes('speak') ||
            lowerContent.includes('talk') ||
            lowerContent.includes('call')) {
            return {
                content: socketData.language === 'es'
                    ? '¿Te gustaría hablar con alguien por teléfono? Puedo transferirte a nuestro asistente de voz.'
                    : 'Would you like to speak with someone over the phone? I can transfer you to our voice assistant.',
                metadata: { escalate: true, escalationType: 'voice' },
            };
        }
        // Default response
        return {
            content: socketData.language === 'es'
                ? 'Entiendo. ¿Puedes darme más detalles sobre tu situación legal?'
                : 'I understand. Can you provide more details about your legal situation?',
            metadata: {},
        };
    }
    async getWelcomeMessage(language) {
        if (language === 'es') {
            return '¡Hola! Soy el asistente virtual de Vasquez Law Firm. ¿Cómo puedo ayudarte hoy?';
        }
        return "Hello! I'm the Vasquez Law Firm virtual assistant. How can I help you today?";
    }
    async handleEscalation(socket, escalationType) {
        const socketData = socket.data;
        switch (escalationType) {
            case 'voice':
                // Create a Retell call for the user
                const retellClient = (0, client_1.getRetellClient)();
                socket.emit('escalation', {
                    type: 'voice',
                    message: socketData.language === 'es'
                        ? 'Te estoy transfiriendo a nuestro asistente de voz. Por favor, llama al 1-844-YO-PELEO.'
                        : "I'm transferring you to our voice assistant. Please call 1-844-YO-PELEO.",
                    phoneNumber: '1-844-967-3536',
                });
                break;
            case 'human':
                // Create support ticket for human agent
                if (socketData.userId && socketData.conversationId) {
                    await (0, prisma_1.getPrismaClient)().supportTicket.create({
                        data: {
                            userId: socketData.userId,
                            subject: 'Human Agent Requested',
                            description: `User requested to speak with a human agent during conversation ${socketData.conversationId}`,
                            category: 'GENERAL_INQUIRY',
                            priority: 'HIGH',
                            status: 'OPEN',
                            metadata: {
                                requestedAt: new Date(),
                                language: socketData.language,
                                conversationId: socketData.conversationId,
                            },
                        },
                    });
                }
                socket.emit('escalation', {
                    type: 'human',
                    message: socketData.language === 'es'
                        ? 'Un miembro de nuestro equipo se pondrá en contacto contigo pronto.'
                        : 'A member of our team will be in touch with you shortly.',
                });
                break;
        }
    }
    // Room management methods
    async joinRoom(socket, roomId, roomType) {
        socket.join(roomId);
        if (!this.roomParticipants.has(roomId)) {
            this.roomParticipants.set(roomId, new Set());
        }
        this.roomParticipants.get(roomId).add(socket.id);
        logger_1.wsLogger.info(socket.id, `Joined room: ${roomId} (${roomType})`);
    }
    async leaveRoom(socket, roomId) {
        socket.leave(roomId);
        const participants = this.roomParticipants.get(roomId);
        if (participants) {
            participants.delete(socket.id);
            if (participants.size === 0) {
                this.roomParticipants.delete(roomId);
            }
        }
        logger_1.wsLogger.info(socket.id, `Left room: ${roomId}`);
    }
    canJoinRoom(socketData, roomId, roomType) {
        // Implement authorization logic based on room type
        switch (roomType) {
            case RoomType.CONVERSATION:
                // Users can join their own conversations
                return true;
            case RoomType.CASE:
                // Only authenticated users with case access
                return socketData.authenticated;
            case RoomType.SUPPORT:
                // Only support staff and the requesting user
                return (socketData.authenticated &&
                    (socketData.userRole === 'ADMIN' || socketData.userRole === 'ATTORNEY'));
            case RoomType.BROADCAST:
                // Everyone can join broadcast rooms
                return true;
            default:
                return false;
        }
    }
    checkRateLimit(clientId) {
        const now = Date.now();
        const timestamps = this.rateLimitMap.get(clientId) || [];
        // Remove timestamps outside the window
        const validTimestamps = timestamps.filter(t => now - t < this.RATE_LIMIT_WINDOW);
        if (validTimestamps.length >= this.RATE_LIMIT_MAX) {
            return false;
        }
        validTimestamps.push(now);
        this.rateLimitMap.set(clientId, validTimestamps);
        return true;
    }
    // Reconnection token generation
    generateReconnectionToken(socketData) {
        const token = `reconnect_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const tokenData = JSON.stringify({
            userId: socketData.userId,
            userRole: socketData.userRole,
            authenticated: socketData.authenticated,
            language: socketData.language,
            conversationId: socketData.conversationId,
        });
        this.reconnectionTokens.set(token, tokenData);
        // Clean up old tokens after 5 minutes
        setTimeout(() => {
            this.reconnectionTokens.delete(token);
        }, 300000);
        return token;
    }
    // Public methods for external use
    getActiveSessionsCount() {
        return this.activeSessions.size;
    }
    getRoomParticipantCount(roomId) {
        return this.roomParticipants.get(roomId)?.size || 0;
    }
    broadcastToAll(event, data) {
        this.io.emit(event, data);
    }
    broadcastToUser(userId, event, data) {
        for (const [socketId, session] of this.activeSessions) {
            if (session.userId === userId) {
                this.io.to(socketId).emit(event, data);
            }
        }
    }
    broadcastToRoom(roomId, event, data) {
        this.io.to(roomId).emit(event, data);
    }
    // Send notification to specific user
    async sendNotification(userId, notification) {
        const notificationRoom = `notifications_${userId}`;
        this.io.to(notificationRoom).emit('notification', {
            ...notification,
            timestamp: new Date().toISOString(),
        });
        // Also store in database
        await (0, prisma_1.getPrismaClient)().notification.create({
            data: {
                userId,
                type: 'SYSTEM',
                title: notification.title,
                message: notification.message,
                metadata: notification.metadata,
                read: false,
            },
        });
    }
    // Send case update to all subscribed users
    async sendCaseUpdate(caseId, update) {
        const caseRoom = `case_${caseId}`;
        this.io.to(caseRoom).emit('case:update', {
            ...update,
            timestamp: new Date().toISOString(),
        });
        // Get case participants and send notifications
        const caseData = await (0, prisma_1.getPrismaClient)().case.findUnique({
            where: { id: caseId },
            select: {
                clientId: true,
                attorneyId: true,
                caseNumber: true,
            },
        });
        if (caseData) {
            const notificationMessage = this.getCaseUpdateMessage(update.updateType, caseData.caseNumber);
            // Notify client
            if (caseData.clientId) {
                await this.sendNotification(caseData.clientId, {
                    type: 'info',
                    title: 'Case Update',
                    message: notificationMessage,
                    metadata: { caseId, updateType: update.updateType },
                });
            }
            // Notify attorney
            if (caseData.attorneyId && caseData.attorneyId !== update.data.updatedBy) {
                await this.sendNotification(caseData.attorneyId, {
                    type: 'info',
                    title: 'Case Update',
                    message: notificationMessage,
                    metadata: { caseId, updateType: update.updateType },
                });
            }
        }
    }
    getCaseUpdateMessage(updateType, caseNumber) {
        const messages = {
            status_change: `Case ${caseNumber} status has been updated`,
            document_added: `New document added to case ${caseNumber}`,
            note_added: `New note added to case ${caseNumber}`,
            attorney_assigned: `Attorney assigned to case ${caseNumber}`,
            task_updated: `Task updated in case ${caseNumber}`,
        };
        return messages[updateType] || `Case ${caseNumber} has been updated`;
    }
}
exports.ChatSocketServer = ChatSocketServer;
// Export singleton instance
let chatSocketServer = null;
function getChatSocketServer(httpServer) {
    if (!chatSocketServer && httpServer) {
        chatSocketServer = new ChatSocketServer(httpServer);
    }
    if (!chatSocketServer) {
        throw new Error('Chat socket server not initialized');
    }
    return chatSocketServer;
}

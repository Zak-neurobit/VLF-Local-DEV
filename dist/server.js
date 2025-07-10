'use strict';
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g = Object.create((typeof Iterator === 'function' ? Iterator : Object).prototype);
    return (
      (g.next = verb(0)),
      (g['throw'] = verb(1)),
      (g['return'] = verb(2)),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                    ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                    : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.RoomType = exports.ChatSocketServer = void 0;
exports.getChatSocketServer = getChatSocketServer;
var socket_io_1 = require('socket.io');
var logger_1 = require('./src/lib/logger');
var prisma_1 = require('./src/lib/prisma');
var client_1 = require('./src/services/retell/client');
var jsonwebtoken_1 = __importDefault(require('jsonwebtoken'));
// Room types for different conversation contexts
var RoomType;
(function (RoomType) {
  RoomType['CONVERSATION'] = 'conversation';
  RoomType['CASE'] = 'case';
  RoomType['SUPPORT'] = 'support';
  RoomType['BROADCAST'] = 'broadcast';
})(RoomType || (exports.RoomType = RoomType = {}));
var ChatSocketServer = /** @class */ (function () {
  function ChatSocketServer(httpServer) {
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
  ChatSocketServer.prototype.setupMiddleware = function () {
    var _this = this;
    // Authentication middleware
    this.io.use(function (socket, next) {
      return __awaiter(_this, void 0, void 0, function () {
        var sessionId,
          language,
          token,
          reconnectionToken,
          userId,
          userRole,
          authenticated,
          decoded,
          sessionData,
          previousSession;
        return __generator(this, function (_a) {
          try {
            sessionId = socket.handshake.auth.sessionId || 'session_'.concat(Date.now());
            language = socket.handshake.auth.language || 'en';
            token = socket.handshake.auth.token;
            reconnectionToken = socket.handshake.auth.reconnectionToken;
            userId = void 0;
            userRole = void 0;
            authenticated = false;
            // Try to authenticate with JWT token
            if (token) {
              try {
                decoded = jsonwebtoken_1.default.verify(token, process.env.NEXTAUTH_SECRET);
                userId = decoded.id;
                userRole = decoded.role;
                authenticated = true;
              } catch (error) {
                logger_1.wsLogger.warn(socket.id, 'Invalid JWT token');
              }
            }
            // Try to reconnect with reconnection token
            if (!authenticated && reconnectionToken) {
              sessionData = this.reconnectionTokens.get(reconnectionToken);
              if (sessionData) {
                previousSession = JSON.parse(sessionData);
                userId = previousSession.userId;
                userRole = previousSession.userRole;
                authenticated = previousSession.authenticated;
                this.reconnectionTokens.delete(reconnectionToken);
              }
            }
            socket.data = {
              sessionId: sessionId,
              language: language,
              userId: userId,
              userRole: userRole,
              authenticated: authenticated,
            };
            logger_1.wsLogger.connection(socket.id, {
              sessionId: sessionId,
              language: language,
              userId: userId,
              authenticated: authenticated,
              userAgent: socket.handshake.headers['user-agent'],
            });
            next();
          } catch (error) {
            logger_1.wsLogger.error(socket.id, error);
            next(new Error('Authentication failed'));
          }
          return [2 /*return*/];
        });
      });
    });
  };
  ChatSocketServer.prototype.setupEventHandlers = function () {
    var _this = this;
    this.io.on('connection', function (socket) {
      var clientId = socket.id;
      var socketData = socket.data;
      _this.activeSessions.set(clientId, socketData);
      // Generate reconnection token
      var reconnectionToken = _this.generateReconnectionToken(socketData);
      socket.emit('auth:reconnection-token', { token: reconnectionToken });
      // Handle chat initialization
      socket.on('chat:init', function (data) {
        return __awaiter(_this, void 0, void 0, function () {
          var conversation, welcomeMessage, error_1;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                _a.trys.push([0, 4, , 5]);
                socketData.userId = data.userId || socketData.userId;
                if (data.language) {
                  socketData.language = data.language;
                }
                return [
                  4 /*yield*/,
                  (0, prisma_1.getPrismaClient)().conversation.create({
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
                  }),
                ];
              case 1:
                conversation = _a.sent();
                socketData.conversationId = conversation.id;
                socketData.roomId = 'conversation_'.concat(conversation.id);
                // Join conversation room
                return [
                  4 /*yield*/,
                  this.joinRoom(socket, socketData.roomId, RoomType.CONVERSATION),
                ];
              case 2:
                // Join conversation room
                _a.sent();
                return [4 /*yield*/, this.getWelcomeMessage(socketData.language)];
              case 3:
                welcomeMessage = _a.sent();
                socket.emit('message', {
                  role: 'assistant',
                  content: welcomeMessage,
                  timestamp: new Date().toISOString(),
                });
                logger_1.wsLogger.message(
                  clientId,
                  'chat_initialized',
                  'outbound',
                  welcomeMessage.length
                );
                return [3 /*break*/, 5];
              case 4:
                error_1 = _a.sent();
                logger_1.wsLogger.error(clientId, error_1);
                socket.emit('error', { message: 'Failed to initialize chat' });
                return [3 /*break*/, 5];
              case 5:
                return [2 /*return*/];
            }
          });
        });
      });
      // Handle incoming messages
      socket.on('message', function (message) {
        return __awaiter(_this, void 0, void 0, function () {
          var content, metadata, response, error_2;
          var _a;
          return __generator(this, function (_b) {
            switch (_b.label) {
              case 0:
                _b.trys.push([0, 8, , 9]);
                (content = message.content), (metadata = message.metadata);
                // Rate limiting check
                if (!this.checkRateLimit(clientId)) {
                  socket.emit('error', { message: 'Too many messages. Please slow down.' });
                  return [2 /*return*/];
                }
                logger_1.wsLogger.message(clientId, 'user_message', 'inbound', content.length);
                logger_1.userFlowLogger.flowStep(
                  'chat_interaction',
                  'message_received',
                  socketData.sessionId
                );
                if (!socketData.conversationId) return [3 /*break*/, 2];
                return [
                  4 /*yield*/,
                  (0, prisma_1.getPrismaClient)().message.create({
                    data: {
                      conversationId: socketData.conversationId,
                      role: 'user',
                      content: content,
                      metadata: metadata || {},
                    },
                  }),
                ];
              case 1:
                _b.sent();
                _b.label = 2;
              case 2:
                // Broadcast typing indicator to room
                if (socketData.roomId) {
                  socket.to(socketData.roomId).emit('typing', {
                    userId: socketData.userId,
                    isTyping: true,
                  });
                }
                // Send typing indicator
                socket.emit('typing', { isTyping: true });
                return [4 /*yield*/, this.processMessage(content, socketData)];
              case 3:
                response = _b.sent();
                if (!socketData.conversationId) return [3 /*break*/, 5];
                return [
                  4 /*yield*/,
                  (0, prisma_1.getPrismaClient)().message.create({
                    data: {
                      conversationId: socketData.conversationId,
                      role: 'assistant',
                      content: response.content,
                      metadata: response.metadata || {},
                    },
                  }),
                ];
              case 4:
                _b.sent();
                _b.label = 5;
              case 5:
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
                logger_1.wsLogger.message(
                  clientId,
                  'assistant_message',
                  'outbound',
                  response.content.length
                );
                if (!((_a = response.metadata) === null || _a === void 0 ? void 0 : _a.escalate))
                  return [3 /*break*/, 7];
                return [
                  4 /*yield*/,
                  this.handleEscalation(socket, response.metadata.escalationType),
                ];
              case 6:
                _b.sent();
                _b.label = 7;
              case 7:
                return [3 /*break*/, 9];
              case 8:
                error_2 = _b.sent();
                logger_1.wsLogger.error(clientId, error_2);
                socket.emit('typing', { isTyping: false });
                socket.emit('error', { message: 'Failed to process message' });
                return [3 /*break*/, 9];
              case 9:
                return [2 /*return*/];
            }
          });
        });
      });
      // Handle virtual assistant messages
      socket.on('user:message', function (data) {
        return __awaiter(_this, void 0, void 0, function () {
          var text, language, timestamp, response, error_3;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                _a.trys.push([0, 6, , 7]);
                (text = data.text), (language = data.language), (timestamp = data.timestamp);
                logger_1.wsLogger.message(
                  clientId,
                  'virtual_assistant_message',
                  'inbound',
                  text.length
                );
                if (!socketData.conversationId) return [3 /*break*/, 2];
                return [
                  4 /*yield*/,
                  (0, prisma_1.getPrismaClient)().message.create({
                    data: {
                      conversationId: socketData.conversationId,
                      role: 'user',
                      content: text,
                      metadata: { source: 'virtual_assistant', timestamp: timestamp },
                    },
                  }),
                ];
              case 1:
                _a.sent();
                _a.label = 2;
              case 2:
                return [
                  4 /*yield*/,
                  this.processMessage(
                    text,
                    __assign(__assign({}, socketData), { language: language })
                  ),
                ];
              case 3:
                response = _a.sent();
                if (!socketData.conversationId) return [3 /*break*/, 5];
                return [
                  4 /*yield*/,
                  (0, prisma_1.getPrismaClient)().message.create({
                    data: {
                      conversationId: socketData.conversationId,
                      role: 'assistant',
                      content: response.content,
                      metadata: __assign(__assign({}, response.metadata), {
                        source: 'virtual_assistant',
                      }),
                    },
                  }),
                ];
              case 4:
                _a.sent();
                _a.label = 5;
              case 5:
                // Send response to virtual assistant
                socket.emit('assistant:message', {
                  id: Date.now().toString(),
                  text: response.content,
                  metadata: response.metadata,
                  timestamp: new Date().toISOString(),
                });
                logger_1.wsLogger.message(
                  clientId,
                  'virtual_assistant_response',
                  'outbound',
                  response.content.length
                );
                return [3 /*break*/, 7];
              case 6:
                error_3 = _a.sent();
                logger_1.wsLogger.error(clientId, error_3);
                socket.emit('assistant:error', { message: 'Failed to process message' });
                return [3 /*break*/, 7];
              case 7:
                return [2 /*return*/];
            }
          });
        });
      });
      // Handle language change
      socket.on('language:change', function (language) {
        socketData.language = language;
        socket.emit('language:changed', { language: language });
      });
      // Handle typing indicators
      socket.on('typing:start', function () {
        if (socketData.roomId) {
          socket.to(socketData.roomId).emit('typing', {
            userId: socketData.userId,
            isTyping: true,
          });
        }
      });
      socket.on('typing:stop', function () {
        if (socketData.roomId) {
          socket.to(socketData.roomId).emit('typing', {
            userId: socketData.userId,
            isTyping: false,
          });
        }
      });
      // Handle disconnect
      socket.on('disconnect', function (reason) {
        return __awaiter(_this, void 0, void 0, function () {
          var sessionDuration, error_4;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                _a.trys.push([0, 5, , 6]);
                sessionDuration = Date.now() - parseInt(socketData.sessionId.split('_')[1]);
                logger_1.wsLogger.disconnection(clientId, reason, sessionDuration);
                if (!socketData.roomId) return [3 /*break*/, 2];
                return [4 /*yield*/, this.leaveRoom(socket, socketData.roomId)];
              case 1:
                _a.sent();
                _a.label = 2;
              case 2:
                if (!socketData.conversationId) return [3 /*break*/, 4];
                return [
                  4 /*yield*/,
                  (0, prisma_1.getPrismaClient)().conversation.update({
                    where: { id: socketData.conversationId },
                    data: {
                      status: 'closed',
                      endedAt: new Date(),
                      metadata: {
                        disconnectReason: reason,
                        duration: sessionDuration,
                      },
                    },
                  }),
                ];
              case 3:
                _a.sent();
                _a.label = 4;
              case 4:
                this.activeSessions.delete(clientId);
                return [3 /*break*/, 6];
              case 5:
                error_4 = _a.sent();
                logger_1.wsLogger.error(clientId, error_4);
                return [3 /*break*/, 6];
              case 6:
                return [2 /*return*/];
            }
          });
        });
      });
    });
  };
  ChatSocketServer.prototype.setupRoomHandlers = function () {
    var _this = this;
    this.io.on('connection', function (socket) {
      var socketData = socket.data;
      // Join a specific room
      socket.on('room:join', function (data) {
        return __awaiter(_this, void 0, void 0, function () {
          var error_5;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                _a.trys.push([0, 2, , 3]);
                // Check authorization
                if (!this.canJoinRoom(socketData, data.roomId, data.roomType)) {
                  socket.emit('room:error', { message: 'Unauthorized to join this room' });
                  return [2 /*return*/];
                }
                return [4 /*yield*/, this.joinRoom(socket, data.roomId, data.roomType)];
              case 1:
                _a.sent();
                socket.emit('room:joined', { roomId: data.roomId });
                // Notify other participants
                socket.to(data.roomId).emit('room:participant-joined', {
                  userId: socketData.userId,
                  socketId: socket.id,
                });
                return [3 /*break*/, 3];
              case 2:
                error_5 = _a.sent();
                logger_1.wsLogger.error(socket.id, error_5);
                socket.emit('room:error', { message: 'Failed to join room' });
                return [3 /*break*/, 3];
              case 3:
                return [2 /*return*/];
            }
          });
        });
      });
      // Leave a room
      socket.on('room:leave', function (data) {
        return __awaiter(_this, void 0, void 0, function () {
          var error_6;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, this.leaveRoom(socket, data.roomId)];
              case 1:
                _a.sent();
                socket.emit('room:left', { roomId: data.roomId });
                // Notify other participants
                socket.to(data.roomId).emit('room:participant-left', {
                  userId: socketData.userId,
                  socketId: socket.id,
                });
                return [3 /*break*/, 3];
              case 2:
                error_6 = _a.sent();
                logger_1.wsLogger.error(socket.id, error_6);
                socket.emit('room:error', { message: 'Failed to leave room' });
                return [3 /*break*/, 3];
              case 3:
                return [2 /*return*/];
            }
          });
        });
      });
      // Send message to room
      socket.on('room:message', function (data) {
        return __awaiter(_this, void 0, void 0, function () {
          return __generator(this, function (_a) {
            try {
              if (!socket.rooms.has(data.roomId)) {
                socket.emit('room:error', { message: 'Not in this room' });
                return [2 /*return*/];
              }
              // Broadcast to room
              this.io.to(data.roomId).emit('room:message', {
                userId: socketData.userId,
                message: data.message,
                timestamp: new Date().toISOString(),
              });
            } catch (error) {
              logger_1.wsLogger.error(socket.id, error);
              socket.emit('room:error', { message: 'Failed to send room message' });
            }
            return [2 /*return*/];
          });
        });
      });
    });
  };
  ChatSocketServer.prototype.setupNotificationHandlers = function () {
    var _this = this;
    this.io.on('connection', function (socket) {
      var socketData = socket.data;
      // Subscribe to notifications
      socket.on('notifications:subscribe', function () {
        return __awaiter(_this, void 0, void 0, function () {
          var notificationRoom, unreadNotifications, error_7;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                _a.trys.push([0, 2, , 3]);
                if (!socketData.userId) {
                  socket.emit('notifications:error', { message: 'Authentication required' });
                  return [2 /*return*/];
                }
                notificationRoom = 'notifications_'.concat(socketData.userId);
                socket.join(notificationRoom);
                return [
                  4 /*yield*/,
                  (0, prisma_1.getPrismaClient)().notification.findMany({
                    where: {
                      userId: socketData.userId,
                      read: false,
                    },
                    orderBy: { createdAt: 'desc' },
                    take: 10,
                  }),
                ];
              case 1:
                unreadNotifications = _a.sent();
                socket.emit('notifications:initial', { notifications: unreadNotifications });
                return [3 /*break*/, 3];
              case 2:
                error_7 = _a.sent();
                logger_1.wsLogger.error(socket.id, error_7);
                socket.emit('notifications:error', {
                  message: 'Failed to subscribe to notifications',
                });
                return [3 /*break*/, 3];
              case 3:
                return [2 /*return*/];
            }
          });
        });
      });
      // Mark notification as read
      socket.on('notifications:mark-read', function (data) {
        return __awaiter(_this, void 0, void 0, function () {
          var error_8;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                _a.trys.push([0, 2, , 3]);
                if (!socketData.userId) {
                  socket.emit('notifications:error', { message: 'Authentication required' });
                  return [2 /*return*/];
                }
                return [
                  4 /*yield*/,
                  (0, prisma_1.getPrismaClient)().notification.update({
                    where: {
                      id: data.notificationId,
                      userId: socketData.userId,
                    },
                    data: { read: true },
                  }),
                ];
              case 1:
                _a.sent();
                socket.emit('notifications:marked-read', { notificationId: data.notificationId });
                return [3 /*break*/, 3];
              case 2:
                error_8 = _a.sent();
                logger_1.wsLogger.error(socket.id, error_8);
                socket.emit('notifications:error', {
                  message: 'Failed to mark notification as read',
                });
                return [3 /*break*/, 3];
              case 3:
                return [2 /*return*/];
            }
          });
        });
      });
    });
  };
  ChatSocketServer.prototype.setupCaseHandlers = function () {
    var _this = this;
    this.io.on('connection', function (socket) {
      var socketData = socket.data;
      // Subscribe to case updates
      socket.on('case:subscribe', function (data) {
        return __awaiter(_this, void 0, void 0, function () {
          var userCase, caseRoom, error_9;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                _a.trys.push([0, 3, , 4]);
                if (!socketData.authenticated) {
                  socket.emit('case:error', { message: 'Authentication required' });
                  return [2 /*return*/];
                }
                return [
                  4 /*yield*/,
                  (0, prisma_1.getPrismaClient)().case.findFirst({
                    where: {
                      id: data.caseId,
                      OR: [{ clientId: socketData.userId }, { attorneyId: socketData.userId }],
                    },
                  }),
                ];
              case 1:
                userCase = _a.sent();
                if (!userCase) {
                  socket.emit('case:error', { message: 'Unauthorized to access this case' });
                  return [2 /*return*/];
                }
                caseRoom = 'case_'.concat(data.caseId);
                return [4 /*yield*/, this.joinRoom(socket, caseRoom, RoomType.CASE)];
              case 2:
                _a.sent();
                socket.emit('case:subscribed', { caseId: data.caseId });
                return [3 /*break*/, 4];
              case 3:
                error_9 = _a.sent();
                logger_1.wsLogger.error(socket.id, error_9);
                socket.emit('case:error', { message: 'Failed to subscribe to case updates' });
                return [3 /*break*/, 4];
              case 4:
                return [2 /*return*/];
            }
          });
        });
      });
      // Unsubscribe from case updates
      socket.on('case:unsubscribe', function (data) {
        return __awaiter(_this, void 0, void 0, function () {
          var caseRoom, error_10;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                _a.trys.push([0, 2, , 3]);
                caseRoom = 'case_'.concat(data.caseId);
                return [4 /*yield*/, this.leaveRoom(socket, caseRoom)];
              case 1:
                _a.sent();
                socket.emit('case:unsubscribed', { caseId: data.caseId });
                return [3 /*break*/, 3];
              case 2:
                error_10 = _a.sent();
                logger_1.wsLogger.error(socket.id, error_10);
                socket.emit('case:error', { message: 'Failed to unsubscribe from case updates' });
                return [3 /*break*/, 3];
              case 3:
                return [2 /*return*/];
            }
          });
        });
      });
    });
  };
  ChatSocketServer.prototype.setupReconnectionHandlers = function () {
    var _this = this;
    this.io.on('connection', function (socket) {
      var socketData = socket.data;
      // Handle reconnection
      socket.on('reconnect:attempt', function (data) {
        return __awaiter(_this, void 0, void 0, function () {
          var conversation, error_11;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                _a.trys.push([0, 4, , 5]);
                if (!data.conversationId) return [3 /*break*/, 3];
                return [
                  4 /*yield*/,
                  (0, prisma_1.getPrismaClient)().conversation.findUnique({
                    where: { id: data.conversationId },
                    include: {
                      messages: {
                        orderBy: { createdAt: 'desc' },
                        take: 20,
                      },
                    },
                  }),
                ];
              case 1:
                conversation = _a.sent();
                if (!conversation) return [3 /*break*/, 3];
                socketData.conversationId = conversation.id;
                socketData.roomId = 'conversation_'.concat(conversation.id);
                // Rejoin room
                return [
                  4 /*yield*/,
                  this.joinRoom(socket, socketData.roomId, RoomType.CONVERSATION),
                ];
              case 2:
                // Rejoin room
                _a.sent();
                // Send conversation history
                socket.emit('reconnect:success', {
                  conversation: {
                    id: conversation.id,
                    messages: conversation.messages.reverse(),
                  },
                });
                _a.label = 3;
              case 3:
                return [3 /*break*/, 5];
              case 4:
                error_11 = _a.sent();
                logger_1.wsLogger.error(socket.id, error_11);
                socket.emit('reconnect:error', { message: 'Failed to restore session' });
                return [3 /*break*/, 5];
              case 5:
                return [2 /*return*/];
            }
          });
        });
      });
    });
  };
  ChatSocketServer.prototype.processMessage = function (content, socketData) {
    return __awaiter(this, void 0, void 0, function () {
      var lowerContent;
      return __generator(this, function (_a) {
        lowerContent = content.toLowerCase();
        // Check for specific intents
        if (lowerContent.includes('appointment') || lowerContent.includes('schedule')) {
          return [
            2 /*return*/,
            {
              content:
                socketData.language === 'es'
                  ? 'Puedo ayudarte a programar una cita. ¿Qué tipo de consulta legal necesitas?'
                  : 'I can help you schedule an appointment. What type of legal consultation do you need?',
              metadata: { intent: 'appointment' },
            },
          ];
        }
        if (lowerContent.includes('immigration') || lowerContent.includes('visa')) {
          return [
            2 /*return*/,
            {
              content:
                socketData.language === 'es'
                  ? 'Nuestro equipo de inmigración puede ayudarte. ¿Necesitas ayuda con una visa, residencia, o ciudadanía?'
                  : 'Our immigration team can help you. Do you need assistance with a visa, green card, or citizenship?',
              metadata: { intent: 'immigration', practiceArea: 'immigration' },
            },
          ];
        }
        if (lowerContent.includes('accident') || lowerContent.includes('injury')) {
          return [
            2 /*return*/,
            {
              content:
                socketData.language === 'es'
                  ? 'Lamento escuchar sobre tu accidente. ¿Cuándo ocurrió y has recibido atención médica?'
                  : "I'm sorry to hear about your accident. When did it occur and have you received medical attention?",
              metadata: { intent: 'personal_injury', practiceArea: 'personal_injury' },
            },
          ];
        }
        if (
          lowerContent.includes('speak') ||
          lowerContent.includes('talk') ||
          lowerContent.includes('call')
        ) {
          return [
            2 /*return*/,
            {
              content:
                socketData.language === 'es'
                  ? '¿Te gustaría hablar con alguien por teléfono? Puedo transferirte a nuestro asistente de voz.'
                  : 'Would you like to speak with someone over the phone? I can transfer you to our voice assistant.',
              metadata: { escalate: true, escalationType: 'voice' },
            },
          ];
        }
        // Default response
        return [
          2 /*return*/,
          {
            content:
              socketData.language === 'es'
                ? 'Entiendo. ¿Puedes darme más detalles sobre tu situación legal?'
                : 'I understand. Can you provide more details about your legal situation?',
            metadata: {},
          },
        ];
      });
    });
  };
  ChatSocketServer.prototype.getWelcomeMessage = function (language) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (language === 'es') {
          return [
            2 /*return*/,
            '¡Hola! Soy el asistente virtual de Vasquez Law Firm. ¿Cómo puedo ayudarte hoy?',
          ];
        }
        return [
          2 /*return*/,
          "Hello! I'm the Vasquez Law Firm virtual assistant. How can I help you today?",
        ];
      });
    });
  };
  ChatSocketServer.prototype.handleEscalation = function (socket, escalationType) {
    return __awaiter(this, void 0, void 0, function () {
      var socketData, _a, retellClient;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            socketData = socket.data;
            _a = escalationType;
            switch (_a) {
              case 'voice':
                return [3 /*break*/, 1];
              case 'human':
                return [3 /*break*/, 2];
            }
            return [3 /*break*/, 5];
          case 1:
            retellClient = (0, client_1.getRetellClient)();
            socket.emit('escalation', {
              type: 'voice',
              message:
                socketData.language === 'es'
                  ? 'Te estoy transfiriendo a nuestro asistente de voz. Por favor, llama al 1-844-YO-PELEO.'
                  : "I'm transferring you to our voice assistant. Please call 1-844-YO-PELEO.",
              phoneNumber: '1-844-967-3536',
            });
            return [3 /*break*/, 5];
          case 2:
            if (!(socketData.userId && socketData.conversationId)) return [3 /*break*/, 4];
            return [
              4 /*yield*/,
              (0, prisma_1.getPrismaClient)().supportTicket.create({
                data: {
                  userId: socketData.userId,
                  subject: 'Human Agent Requested',
                  description:
                    'User requested to speak with a human agent during conversation '.concat(
                      socketData.conversationId
                    ),
                  category: 'GENERAL_INQUIRY',
                  priority: 'HIGH',
                  status: 'OPEN',
                  metadata: {
                    requestedAt: new Date(),
                    language: socketData.language,
                    conversationId: socketData.conversationId,
                  },
                },
              }),
            ];
          case 3:
            _b.sent();
            _b.label = 4;
          case 4:
            socket.emit('escalation', {
              type: 'human',
              message:
                socketData.language === 'es'
                  ? 'Un miembro de nuestro equipo se pondrá en contacto contigo pronto.'
                  : 'A member of our team will be in touch with you shortly.',
            });
            return [3 /*break*/, 5];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  // Room management methods
  ChatSocketServer.prototype.joinRoom = function (socket, roomId, roomType) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        socket.join(roomId);
        if (!this.roomParticipants.has(roomId)) {
          this.roomParticipants.set(roomId, new Set());
        }
        this.roomParticipants.get(roomId).add(socket.id);
        logger_1.wsLogger.info(
          socket.id,
          'Joined room: '.concat(roomId, ' (').concat(roomType, ')')
        );
        return [2 /*return*/];
      });
    });
  };
  ChatSocketServer.prototype.leaveRoom = function (socket, roomId) {
    return __awaiter(this, void 0, void 0, function () {
      var participants;
      return __generator(this, function (_a) {
        socket.leave(roomId);
        participants = this.roomParticipants.get(roomId);
        if (participants) {
          participants.delete(socket.id);
          if (participants.size === 0) {
            this.roomParticipants.delete(roomId);
          }
        }
        logger_1.wsLogger.info(socket.id, 'Left room: '.concat(roomId));
        return [2 /*return*/];
      });
    });
  };
  ChatSocketServer.prototype.canJoinRoom = function (socketData, roomId, roomType) {
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
        return (
          socketData.authenticated &&
          (socketData.userRole === 'ADMIN' || socketData.userRole === 'ATTORNEY')
        );
      case RoomType.BROADCAST:
        // Everyone can join broadcast rooms
        return true;
      default:
        return false;
    }
  };
  ChatSocketServer.prototype.checkRateLimit = function (clientId) {
    var _this = this;
    var now = Date.now();
    var timestamps = this.rateLimitMap.get(clientId) || [];
    // Remove timestamps outside the window
    var validTimestamps = timestamps.filter(function (t) {
      return now - t < _this.RATE_LIMIT_WINDOW;
    });
    if (validTimestamps.length >= this.RATE_LIMIT_MAX) {
      return false;
    }
    validTimestamps.push(now);
    this.rateLimitMap.set(clientId, validTimestamps);
    return true;
  };
  // Reconnection token generation
  ChatSocketServer.prototype.generateReconnectionToken = function (socketData) {
    var _this = this;
    var token = 'reconnect_'
      .concat(Date.now(), '_')
      .concat(Math.random().toString(36).substr(2, 9));
    var tokenData = JSON.stringify({
      userId: socketData.userId,
      userRole: socketData.userRole,
      authenticated: socketData.authenticated,
      language: socketData.language,
      conversationId: socketData.conversationId,
    });
    this.reconnectionTokens.set(token, tokenData);
    // Clean up old tokens after 5 minutes
    setTimeout(function () {
      _this.reconnectionTokens.delete(token);
    }, 300000);
    return token;
  };
  // Public methods for external use
  ChatSocketServer.prototype.getActiveSessionsCount = function () {
    return this.activeSessions.size;
  };
  ChatSocketServer.prototype.getRoomParticipantCount = function (roomId) {
    var _a;
    return (
      ((_a = this.roomParticipants.get(roomId)) === null || _a === void 0 ? void 0 : _a.size) || 0
    );
  };
  ChatSocketServer.prototype.broadcastToAll = function (event, data) {
    this.io.emit(event, data);
  };
  ChatSocketServer.prototype.broadcastToUser = function (userId, event, data) {
    for (var _i = 0, _a = this.activeSessions; _i < _a.length; _i++) {
      var _b = _a[_i],
        socketId = _b[0],
        session = _b[1];
      if (session.userId === userId) {
        this.io.to(socketId).emit(event, data);
      }
    }
  };
  ChatSocketServer.prototype.broadcastToRoom = function (roomId, event, data) {
    this.io.to(roomId).emit(event, data);
  };
  // Send notification to specific user
  ChatSocketServer.prototype.sendNotification = function (userId, notification) {
    return __awaiter(this, void 0, void 0, function () {
      var notificationRoom;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            notificationRoom = 'notifications_'.concat(userId);
            this.io
              .to(notificationRoom)
              .emit(
                'notification',
                __assign(__assign({}, notification), { timestamp: new Date().toISOString() })
              );
            // Also store in database
            return [
              4 /*yield*/,
              (0, prisma_1.getPrismaClient)().notification.create({
                data: {
                  userId: userId,
                  type: 'SYSTEM',
                  title: notification.title,
                  message: notification.message,
                  metadata: notification.metadata,
                  read: false,
                },
              }),
            ];
          case 1:
            // Also store in database
            _a.sent();
            return [2 /*return*/];
        }
      });
    });
  };
  // Send case update to all subscribed users
  ChatSocketServer.prototype.sendCaseUpdate = function (caseId, update) {
    return __awaiter(this, void 0, void 0, function () {
      var caseRoom, caseData, notificationMessage;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            caseRoom = 'case_'.concat(caseId);
            this.io
              .to(caseRoom)
              .emit(
                'case:update',
                __assign(__assign({}, update), { timestamp: new Date().toISOString() })
              );
            return [
              4 /*yield*/,
              (0, prisma_1.getPrismaClient)().case.findUnique({
                where: { id: caseId },
                select: {
                  clientId: true,
                  attorneyId: true,
                  caseNumber: true,
                },
              }),
            ];
          case 1:
            caseData = _a.sent();
            if (!caseData) return [3 /*break*/, 5];
            notificationMessage = this.getCaseUpdateMessage(update.updateType, caseData.caseNumber);
            if (!caseData.clientId) return [3 /*break*/, 3];
            return [
              4 /*yield*/,
              this.sendNotification(caseData.clientId, {
                type: 'info',
                title: 'Case Update',
                message: notificationMessage,
                metadata: { caseId: caseId, updateType: update.updateType },
              }),
            ];
          case 2:
            _a.sent();
            _a.label = 3;
          case 3:
            if (!(caseData.attorneyId && caseData.attorneyId !== update.data.updatedBy))
              return [3 /*break*/, 5];
            return [
              4 /*yield*/,
              this.sendNotification(caseData.attorneyId, {
                type: 'info',
                title: 'Case Update',
                message: notificationMessage,
                metadata: { caseId: caseId, updateType: update.updateType },
              }),
            ];
          case 4:
            _a.sent();
            _a.label = 5;
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  ChatSocketServer.prototype.getCaseUpdateMessage = function (updateType, caseNumber) {
    var messages = {
      status_change: 'Case '.concat(caseNumber, ' status has been updated'),
      document_added: 'New document added to case '.concat(caseNumber),
      note_added: 'New note added to case '.concat(caseNumber),
      attorney_assigned: 'Attorney assigned to case '.concat(caseNumber),
      task_updated: 'Task updated in case '.concat(caseNumber),
    };
    return messages[updateType] || 'Case '.concat(caseNumber, ' has been updated');
  };
  return ChatSocketServer;
})();
exports.ChatSocketServer = ChatSocketServer;
// Export singleton instance
var chatSocketServer = null;
function getChatSocketServer(httpServer) {
  if (!chatSocketServer && httpServer) {
    chatSocketServer = new ChatSocketServer(httpServer);
  }
  if (!chatSocketServer) {
    throw new Error('Chat socket server not initialized');
  }
  return chatSocketServer;
}

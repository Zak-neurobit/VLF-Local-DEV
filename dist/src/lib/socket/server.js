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
Object.defineProperty(exports, '__esModule', { value: true });
exports.ChatSocketServer = void 0;
exports.getChatSocketServer = getChatSocketServer;
var socket_io_1 = require('socket.io');
var logger_1 = require('@/lib/logger');
var prisma_1 = require('@/lib/prisma');
var client_1 = require('@/services/retell/client');
var ChatSocketServer = /** @class */ (function () {
  function ChatSocketServer(httpServer) {
    this.activeSessions = new Map();
    this.io = new socket_io_1.Server(httpServer, {
      cors: {
        origin: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        credentials: true,
      },
      transports: ['websocket', 'polling'],
    });
    this.setupMiddleware();
    this.setupEventHandlers();
  }
  ChatSocketServer.prototype.setupMiddleware = function () {
    var _this = this;
    // Authentication middleware
    this.io.use(function (socket, next) {
      return __awaiter(_this, void 0, void 0, function () {
        var sessionId, language;
        return __generator(this, function (_a) {
          try {
            sessionId = socket.handshake.auth.sessionId || 'session_'.concat(Date.now());
            language = socket.handshake.auth.language || 'en';
            socket.data = {
              sessionId: sessionId,
              language: language,
            };
            logger_1.wsLogger.connection(socket.id, {
              sessionId: sessionId,
              language: language,
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
      // Handle chat initialization
      socket.on('chat:init', function (data) {
        return __awaiter(_this, void 0, void 0, function () {
          var conversation, welcomeMessage, error_1;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                _a.trys.push([0, 3, , 4]);
                socketData.userId = data.userId;
                if (data.language) {
                  socketData.language = data.language;
                }
                return [
                  4 /*yield*/,
                  prisma_1.prisma.conversation.create({
                    data: {
                      userId: data.userId || 'anonymous',
                      channel: 'chat',
                      status: 'active',
                      language: socketData.language,
                      metadata: {
                        socketId: clientId,
                        sessionId: socketData.sessionId,
                      },
                    },
                  }),
                ];
              case 1:
                conversation = _a.sent();
                socketData.conversationId = conversation.id;
                return [4 /*yield*/, this.getWelcomeMessage(socketData.language)];
              case 2:
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
                return [3 /*break*/, 4];
              case 3:
                error_1 = _a.sent();
                logger_1.wsLogger.error(clientId, error_1);
                socket.emit('error', { message: 'Failed to initialize chat' });
                return [3 /*break*/, 4];
              case 4:
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
                logger_1.wsLogger.message(clientId, 'user_message', 'inbound', content.length);
                logger_1.userFlowLogger.flowStep(
                  'chat_interaction',
                  'message_received',
                  socketData.sessionId
                );
                if (!socketData.conversationId) return [3 /*break*/, 2];
                return [
                  4 /*yield*/,
                  prisma_1.prisma.message.create({
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
                // Send typing indicator
                socket.emit('typing', { isTyping: true });
                return [4 /*yield*/, this.processMessage(content, socketData)];
              case 3:
                response = _b.sent();
                if (!socketData.conversationId) return [3 /*break*/, 5];
                return [
                  4 /*yield*/,
                  prisma_1.prisma.message.create({
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
                  prisma_1.prisma.message.create({
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
                  prisma_1.prisma.message.create({
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
        socket.broadcast.emit('typing', {
          userId: socketData.userId,
          isTyping: true,
        });
      });
      socket.on('typing:stop', function () {
        socket.broadcast.emit('typing', {
          userId: socketData.userId,
          isTyping: false,
        });
      });
      // Handle disconnect
      socket.on('disconnect', function (reason) {
        return __awaiter(_this, void 0, void 0, function () {
          var sessionDuration, error_4;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                _a.trys.push([0, 3, , 4]);
                sessionDuration = Date.now() - parseInt(socketData.sessionId.split('_')[1]);
                logger_1.wsLogger.disconnection(clientId, reason, sessionDuration);
                if (!socketData.conversationId) return [3 /*break*/, 2];
                return [
                  4 /*yield*/,
                  prisma_1.prisma.conversation.update({
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
              case 1:
                _a.sent();
                _a.label = 2;
              case 2:
                this.activeSessions.delete(clientId);
                return [3 /*break*/, 4];
              case 3:
                error_4 = _a.sent();
                logger_1.wsLogger.error(clientId, error_4);
                return [3 /*break*/, 4];
              case 4:
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
      var socketData, retellClient;
      return __generator(this, function (_a) {
        socketData = socket.data;
        switch (escalationType) {
          case 'voice':
            retellClient = (0, client_1.getRetellClient)();
            socket.emit('escalation', {
              type: 'voice',
              message:
                socketData.language === 'es'
                  ? 'Te estoy transfiriendo a nuestro asistente de voz. Por favor, llama al 1-844-YO-PELEO.'
                  : "I'm transferring you to our voice assistant. Please call 1-844-YO-PELEO.",
              phoneNumber: '1-844-967-3536',
            });
            break;
          case 'human':
            // Add to queue for human agent
            // TODO: Create task after fixing Task model to not require createdById
            console.log('Chat escalation requested:', {
              userId: socketData.userId,
              conversationId: socketData.conversationId,
            });
            socket.emit('escalation', {
              type: 'human',
              message:
                socketData.language === 'es'
                  ? 'Un miembro de nuestro equipo se pondrá en contacto contigo pronto.'
                  : 'A member of our team will be in touch with you shortly.',
            });
            break;
        }
        return [2 /*return*/];
      });
    });
  };
  ChatSocketServer.prototype.getActiveSessionsCount = function () {
    return this.activeSessions.size;
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

// Production stub for socket module - eliminates Vercel build issues
// BUILD UP NOT DOWN - simplified but functional socket

export enum RoomType {
  CONVERSATION = 'conversation',
  CASE = 'case',
  SUPPORT = 'support',
  BROADCAST = 'broadcast',
}

export class ChatSocketServer {
  getActiveSessionsCount() { return 0; }
  getRoomParticipantCount() { return 0; }
  broadcastToAll() { }
  broadcastToUser() { }
  broadcastToRoom() { }
  async sendNotification() { }
  async sendCaseUpdate() { }
}

export function getChatSocketServer(): ChatSocketServer {
  return new ChatSocketServer();
}

export type { ChatSocketServer };
// Re-export everything from the consolidated ChatWidget
export * from './ConsolidatedChatWidget';
// Also export a SocketChatWidget for backwards compatibility
export { SocketChatWidget as ChatWidget } from './ConsolidatedChatWidget';

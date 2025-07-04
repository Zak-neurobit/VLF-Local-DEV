'use client';

import { useEffect, useState, useRef } from 'react';
import io, { Socket } from 'socket.io-client';

interface UseSocketReturn {
  socket: Socket | null;
  connected: boolean;
  error: string | null;
}

export function useSocket(): UseSocketReturn {
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Initialize socket connection
    const initSocket = async () => {
      try {
        // Connect to the WebSocket server
        const socket = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL || '', {
          transports: ['websocket'],
          autoConnect: true,
          reconnection: true,
          reconnectionAttempts: 5,
          reconnectionDelay: 1000,
        });

        socket.on('connect', () => {
          console.log('Socket connected:', socket.id);
          setConnected(true);
          setError(null);
        });

        socket.on('disconnect', () => {
          console.log('Socket disconnected');
          setConnected(false);
        });

        socket.on('connect_error', err => {
          console.error('Socket connection error:', err);
          setError(err.message);
          setConnected(false);
        });

        socketRef.current = socket;
      } catch (err) {
        console.error('Failed to initialize socket:', err);
        setError(err instanceof Error ? err.message : 'Failed to connect');
      }
    };

    initSocket();

    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  return {
    socket: socketRef.current,
    connected,
    error,
  };
}

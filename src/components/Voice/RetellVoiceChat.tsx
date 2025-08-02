'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Phone, PhoneOff, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface RetellVoiceChatProps {
  language: 'en' | 'es';
  onTranscript?: (transcript: string) => void;
  onResponse?: (response: string) => void;
}

export const RetellVoiceChat: React.FC<RetellVoiceChatProps> = ({
  language,
  onTranscript,
  onResponse,
}) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [transcript, setTranscript] = useState('');
  const webClientRef = useRef<any>(null);

  const startVoiceCall = async () => {
    setIsConnecting(true);

    try {
      // Get access token from our API
      const response = await fetch('/api/retell/create-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language,
          agentId: process.env.NEXT_PUBLIC_RETELL_AGENT_ID,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create call');
      }

      const { accessToken } = await response.json();

      // Initialize Retell Web Client
      if (typeof window !== 'undefined' && (window as any).RetellWebClient) {
        const RetellWebClient = (window as any).RetellWebClient;

        webClientRef.current = new RetellWebClient();

        // Set up event listeners
        webClientRef.current.on('call_started', () => {
          console.log('Call started');
          setIsConnected(true);
          setIsConnecting(false);
          toast.success(language === 'es' ? 'Llamada iniciada' : 'Call started');
        });

        webClientRef.current.on('call_ended', () => {
          console.log('Call ended');
          setIsConnected(false);
          toast(language === 'es' ? 'Llamada finalizada' : 'Call ended');
        });

        webClientRef.current.on('agent_start_talking', () => {
          console.log('Agent started talking');
        });

        webClientRef.current.on('agent_stop_talking', () => {
          console.log('Agent stopped talking');
        });

        webClientRef.current.on('audio_stream_started', () => {
          console.log('Audio stream started');
        });

        webClientRef.current.on('transcript', (data: any) => {
          console.log('Transcript:', data);
          if (data.transcript) {
            setTranscript(data.transcript);
            onTranscript?.(data.transcript);
          }
        });

        webClientRef.current.on('response', (data: any) => {
          console.log('Response:', data);
          if (data.response) {
            onResponse?.(data.response);
          }
        });

        webClientRef.current.on('error', (error: any) => {
          console.error('Retell error:', error);
          toast.error(language === 'es' ? 'Error en la llamada' : 'Call error');
          setIsConnecting(false);
          setIsConnected(false);
        });

        // Start the call
        await webClientRef.current.startCall({
          accessToken,
          sampleRate: 24000,
          enableUpdate: true,
        });
      } else {
        throw new Error('Retell SDK not loaded');
      }
    } catch (error) {
      console.error('Failed to start voice call:', error);
      toast.error(
        language === 'es' ? 'No se pudo iniciar la llamada de voz' : 'Failed to start voice call'
      );
      setIsConnecting(false);
    }
  };

  const endVoiceCall = () => {
    if (webClientRef.current) {
      webClientRef.current.stopCall();
      webClientRef.current = null;
    }
    setIsConnected(false);
  };

  const toggleMute = () => {
    if (webClientRef.current) {
      if (isMuted) {
        webClientRef.current.unmute();
      } else {
        webClientRef.current.mute();
      }
      setIsMuted(!isMuted);
    }
  };

  // Load Retell SDK
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.retellai.com/retell-client-sdk-web.min.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (webClientRef.current) {
        webClientRef.current.stopCall();
      }
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="flex items-center gap-2">
      <AnimatePresence mode="wait">
        {!isConnected ? (
          <motion.button
            key="start"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={startVoiceCall}
            disabled={isConnecting}
            className="p-3 bg-gradient-to-r from-gold-500 to-gold-600 text-black rounded-full hover:shadow-lg transition-all disabled:opacity-50"
            title={language === 'es' ? 'Iniciar llamada de voz' : 'Start voice call'}
          >
            {isConnecting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Phone className="w-5 h-5" />
            )}
          </motion.button>
        ) : (
          <>
            <motion.button
              key="mute"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={toggleMute}
              className={`p-3 rounded-full transition-all ${
                isMuted ? 'bg-red-500 text-white' : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
              title={language === 'es' ? 'Silenciar/Activar' : 'Mute/Unmute'}
            >
              {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </motion.button>

            <motion.button
              key="end"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={endVoiceCall}
              className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
              title={language === 'es' ? 'Finalizar llamada' : 'End call'}
            >
              <PhoneOff className="w-5 h-5" />
            </motion.button>
          </>
        )}
      </AnimatePresence>

      {transcript && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-full mb-2 left-0 right-0 bg-black/80 text-white p-2 rounded-lg text-sm"
        >
          {transcript}
        </motion.div>
      )}
    </div>
  );
};

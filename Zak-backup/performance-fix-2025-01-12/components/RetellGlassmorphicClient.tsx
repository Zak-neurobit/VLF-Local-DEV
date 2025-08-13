'use client';

import React, { useEffect, useRef, useState } from 'react';
import { RetellWebClient } from 'retell-client-js-sdk';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, PhoneOff, Mic, MicOff, Loader2, X, Volume2 } from 'lucide-react';

interface RetellGlassmorphicClientProps {
  isActive: boolean;
  onClose: () => void;
  language?: 'en' | 'es';
  onTranscript?: (transcript: string) => void;
  onResponse?: (response: string) => void;
}

export const RetellGlassmorphicClient: React.FC<RetellGlassmorphicClientProps> = ({
  isActive,
  onClose,
  language = 'en',
  onTranscript,
  onResponse
}) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isAgentTalking, setIsAgentTalking] = useState(false);
  const [isUserTalking, setIsUserTalking] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [bars] = useState(Array(40).fill(0));
  const [animatedBars, setAnimatedBars] = useState(bars);
  
  const retellClientRef = useRef<RetellWebClient | null>(null);
  const isStartingCall = useRef(false);

  // Translations
  const t = {
    en: {
      connecting: 'Connecting...',
      initiating: 'Initiating call. Please wait...',
      connected: 'Connected',
      callInProgress: 'Voice Call in Progress',
      endCall: 'End Call',
      mute: 'Mute',
      unmute: 'Unmute',
      aiAssistant: 'AI Legal Assistant',
      speaking: 'Listening...',
      agentSpeaking: 'Assistant is speaking...',
      userSpeaking: 'You are speaking...',
    },
    es: {
      connecting: 'Conectando...',
      initiating: 'Iniciando llamada. Por favor espere...',
      connected: 'Conectado',
      callInProgress: 'Llamada de Voz en Progreso',
      endCall: 'Finalizar',
      mute: 'Silenciar',
      unmute: 'Activar',
      aiAssistant: 'Asistente Legal IA',
      speaking: 'Escuchando...',
      agentSpeaking: 'El asistente está hablando...',
      userSpeaking: 'Estás hablando...',
    },
  };

  // Animate sound bars based on who's talking
  useEffect(() => {
    if (!isConnected || !isActive) return;

    const interval = setInterval(() => {
      if (isAgentTalking || isUserTalking) {
        setAnimatedBars(bars.map(() => {
          const baseHeight = 30;
          const variation = Math.random() * 50;
          return Math.min(100, baseHeight + variation);
        }));
      } else {
        setAnimatedBars(bars.map(() => 5));
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isConnected, isActive, bars, isAgentTalking, isUserTalking]);

  useEffect(() => {
    let mounted = true;
    
    if (isActive && !isConnected && !isConnecting && mounted) {
      startCall();
    }
    
    return () => {
      mounted = false;
      // Cleanup on unmount - ensure call is properly ended
      if (retellClientRef.current) {
        console.log('⚠️ Component unmounting, ending call...');
        try {
          // Try to stop the call
          retellClientRef.current.stopCall();
          
          // Remove event listeners
          if (typeof retellClientRef.current.removeAllListeners === 'function') {
            retellClientRef.current.removeAllListeners();
          }
        } catch (e) {
          console.error('Error stopping call on unmount:', e);
        }
        
        // Clear the reference
        retellClientRef.current = null;
        
        // Reset flag
        isStartingCall.current = false;
      }
    };
  }, [isActive]); // Only depend on isActive to avoid re-renders

  const startCall = async () => {
    // Prevent multiple simultaneous calls
    if (isStartingCall.current || isConnecting || isConnected) {
      console.log('Call already in progress, skipping...');
      return;
    }
    
    isStartingCall.current = true;
    console.log('🎤 Starting Retell Web SDK call...');
    setIsConnecting(true);
    const callStartTime = Date.now();

    try {
      // Step 1: Get call credentials from backend
      console.log('Getting call credentials...');
      
      const response = await fetch('/api/retell/create-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language,
          agentId: process.env.NEXT_PUBLIC_RETELL_AGENT_ID || ''
        })
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to create call: ${error}`);
      }

      const responseData = await response.json();
      const access_token = responseData.access_token;
      const call_id = responseData.call_id;
      const call_status = responseData.call_status;
      
      if (!access_token) {
        throw new Error('Invalid response from server: missing access_token');
      }
      
      const timeElapsed = Date.now() - callStartTime;
      console.log('✅ Got access token in', timeElapsed, 'ms');
      console.log('Call details:', { 
        call_id,
        call_status,
        token_length: access_token?.length,
        time_remaining: (30000 - timeElapsed) + 'ms'
      });

      // Step 2: IMMEDIATELY Initialize and Connect
      console.log('🚀 Connecting immediately to avoid timeout...');
      const retellClient = new RetellWebClient();
      retellClientRef.current = retellClient;

      // Step 3: Set up event listeners
      retellClient.on('call_started', () => {
        console.log('✅ Call started successfully at', Date.now() - callStartTime, 'ms');
        setIsConnected(true);
        setIsConnecting(false);
        toast.success('Connected to AI Assistant!');
      });

      retellClient.on('call_ended', () => {
        console.log('📞 Call ended');
        setIsConnected(false);
        cleanup();
      });

      retellClient.on('error', (error: any) => {
        console.error('❌ Retell error:', error);
        toast.error(error.message || 'Connection failed');
        setIsConnecting(false);
        setIsConnected(false);
        cleanup();
      });

      // Audio speaking events
      retellClient.on('agent_start_talking', () => {
        console.log('🤖 Agent started talking');
        setIsAgentTalking(true);
        setIsUserTalking(false);
      });

      retellClient.on('agent_stop_talking', () => {
        console.log('🤖 Agent stopped talking');
        setIsAgentTalking(false);
      });

      // Update events for transcripts
      retellClient.on('update', (update: any) => {
        console.log('📝 Update received:', update);
        
        if (update.transcript) {
          setTranscript(update.transcript);
          onTranscript?.(update.transcript);
          setIsUserTalking(true);
          setIsAgentTalking(false);
        }

        if (update.response) {
          setResponse(update.response);
          onResponse?.(update.response);
        }

        // Handle other update types
        if (update.type === 'transcript') {
          setTranscript(update.text || '');
          onTranscript?.(update.text || '');
        }
        
        if (update.type === 'response') {
          setResponse(update.text || '');
          onResponse?.(update.text || '');
        }
      });

      // Audio level monitoring
      retellClient.on('audio', (audio: Float32Array) => {
        if (audio && audio.length > 0) {
          const sum = audio.reduce((acc, val) => acc + Math.abs(val), 0);
          const average = sum / audio.length;
          const level = Math.min(100, average * 500);
          setAudioLevel(level);
        }
      });

      // Step 4: START CALL IMMEDIATELY
      console.log('⏱️ Starting call at', Date.now() - callStartTime, 'ms after request');
      
      try {
        await retellClient.startCall({
          accessToken: access_token,
          sampleRate: 24000,
        });
        
        console.log('✅ startCall() completed at', Date.now() - callStartTime, 'ms');
        
        // Try to start audio playback
        setTimeout(async () => {
          try {
            await retellClient.startAudioPlayback();
            console.log('✅ Audio playback started');
          } catch (audioError) {
            console.warn('Audio playback error (non-fatal):', audioError);
          }
        }, 100);
        
      } catch (startError: any) {
        console.error('❌ Failed to start call at', Date.now() - callStartTime, 'ms');
        console.error('Error details:', startError);
        throw new Error(`Connection failed: ${startError.message || 'Unknown error'}`);
      }

    } catch (error: any) {
      console.error('❌ Failed to start call:', error);
      toast.error(`Failed to connect: ${error.message || 'Unknown error'}`);
      isStartingCall.current = false;
      setIsConnecting(false);
      setIsConnected(false);
      cleanup();
      onClose();
    } finally {
      isStartingCall.current = false;
    }
  };

  const endCall = async () => {
    console.log('📞 Ending call... Current state:', {
      isConnected,
      isConnecting,
      hasClient: !!retellClientRef.current
    });
    
    // Set a flag to prevent multiple end call attempts
    if (!retellClientRef.current && !isConnected) {
      console.log('⚠️ No active call to end');
      cleanup();
      return;
    }
    
    if (retellClientRef.current) {
      try {
        console.log('🔌 Attempting to stop Retell call...');
        
        // Try to stop the call
        const stopPromise = retellClientRef.current.stopCall();
        
        // If stopCall returns a promise, await it with a timeout
        if (stopPromise && typeof stopPromise.then === 'function') {
          await Promise.race([
            stopPromise,
            new Promise((_, reject) => 
              setTimeout(() => reject(new Error('stopCall timeout')), 3000)
            )
          ]);
          console.log('✅ Call stopped successfully');
        } else {
          // If it's not a promise, just continue
          console.log('✅ stopCall executed (non-promise)');
        }
      } catch (error) {
        console.error('❌ Error stopping call:', error);
        // Continue with cleanup even if stopCall fails
      }
      
      // Additional cleanup: remove all event listeners
      try {
        if (retellClientRef.current) {
          // Remove all event listeners to ensure clean disconnection
          retellClientRef.current.removeAllListeners?.();
          console.log('🧹 Event listeners removed');
        }
      } catch (e) {
        console.warn('Could not remove event listeners:', e);
      }
    }
    
    // Always cleanup at the end
    cleanup();
    console.log('📞 Call ended and cleaned up');
  };

  const cleanup = () => {
    console.log('🧹 Running cleanup...');
    
    // Clear the client reference
    retellClientRef.current = null;
    
    // Reset all state
    setIsConnected(false);
    setIsConnecting(false);
    setTranscript('');
    setResponse('');
    setIsAgentTalking(false);
    setIsUserTalking(false);
    setAudioLevel(0);
    
    // Reset the call in progress flag
    isStartingCall.current = false;
    
    console.log('✅ Cleanup complete');
  };

  const toggleMute = () => {
    if (retellClientRef.current) {
      if (isMuted) {
        retellClientRef.current.unmute();
        setIsMuted(false);
        toast.success('Microphone unmuted');
      } else {
        retellClientRef.current.mute();
        setIsMuted(true);
        toast.success('Microphone muted');
      }
    }
  };

  const handleEndCall = async () => {
    console.log('🔴 End call button clicked');
    setIsConnecting(true); // Show loading state while ending call
    await endCall();
    onClose();
  };

  if (!isActive) return null;

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
          style={{
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {/* Glassmorphic Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '24px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.1)',
            }}
          >
            {/* Liquid glass effect - animated gradient */}
            <style dangerouslySetInnerHTML={{ __html: `
              @keyframes liquidGlass {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }
            `}} />
            <div
              className="absolute inset-0 rounded-3xl opacity-50"
              style={{
                background: 'linear-gradient(45deg, #FFD700, #FFA500, #FF6347, #FFD700)',
                backgroundSize: '300% 300%',
                animation: 'liquidGlass 8s ease infinite',
                filter: 'blur(40px)',
                zIndex: -1,
              }}
            />

            {/* Content */}
            <div className="relative p-8">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
                title="Close window"
              >
                <X className="w-5 h-5 text-white/70" />
              </button>

              {/* Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.3), rgba(255, 165, 0, 0.3))',
                    backdropFilter: 'blur(10px)',
                    border: '2px solid rgba(255, 215, 0, 0.5)',
                  }}
                >
                  {isConnecting ? (
                    <Loader2 className="w-10 h-10 text-white animate-spin" />
                  ) : (
                    <Phone className={`w-10 h-10 text-white ${isConnected ? 'animate-pulse' : ''}`} />
                  )}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {t[language].aiAssistant}
                </h3>
                <p className="text-white/70 text-sm">
                  {isConnecting ? t[language].initiating : 
                   isConnected ? (isAgentTalking ? t[language].agentSpeaking : 
                                 isUserTalking ? t[language].userSpeaking : 
                                 t[language].speaking) : 
                   t[language].callInProgress}
                </p>
              </div>

              {/* Sound Wave Visualization */}
              <div className="mb-6 h-24 flex items-center justify-center gap-1 px-4">
                {animatedBars.map((height, index) => (
                  <div
                    key={index}
                    className="w-1 bg-gradient-to-t from-gold-400 to-gold-600 rounded-full transition-all duration-150"
                    style={{
                      height: `${height}%`,
                      opacity: isConnected ? 1 : 0.3,
                    }}
                  />
                ))}
              </div>

              {/* Transcript Display */}
              {isConnected && (transcript || response) && (
                <div className="mb-4 p-4 rounded-lg bg-black/20 backdrop-blur-sm">
                  {transcript && (
                    <div className="text-white/80 text-sm mb-2">
                      <span className="text-gold-400">You:</span> {transcript}
                    </div>
                  )}
                  {response && (
                    <div className="text-white/80 text-sm">
                      <span className="text-blue-400">Assistant:</span> {response}
                    </div>
                  )}
                </div>
              )}

              {/* Control Buttons */}
              <div className="flex justify-center gap-4">
                {isConnected && (
                  <>
                    <button
                      onClick={toggleMute}
                      className={`p-4 rounded-full transition-all ${
                        isMuted 
                          ? 'bg-red-500/20 hover:bg-red-500/30 border-2 border-red-500/50' 
                          : 'bg-white/10 hover:bg-white/20 border-2 border-white/30'
                      }`}
                      title={isMuted ? t[language].unmute : t[language].mute}
                    >
                      {isMuted ? (
                        <MicOff className="w-6 h-6 text-red-400" />
                      ) : (
                        <Mic className="w-6 h-6 text-white" />
                      )}
                    </button>

                    <button
                      onClick={handleEndCall}
                      className="px-6 py-4 rounded-full bg-red-500/20 hover:bg-red-500/30 border-2 border-red-500/50 transition-all flex items-center gap-2"
                    >
                      <PhoneOff className="w-6 h-6 text-red-400" />
                      <span className="text-red-400 font-medium">{t[language].endCall}</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};
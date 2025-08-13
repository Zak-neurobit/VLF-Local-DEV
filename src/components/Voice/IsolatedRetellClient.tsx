'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { RetellWebClient } from 'retell-client-js-sdk';
import { toast } from 'react-hot-toast';

import { Phone, PhoneOff, Mic, MicOff, Loader2, X, Volume2, VolumeX } from 'lucide-react';

interface IsolatedRetellClientProps {
  isActive: boolean;
  onClose: () => void;
  language?: 'en' | 'es';
  onTranscript?: (transcript: string) => void;
  onResponse?: (response: string) => void;
}

export const IsolatedRetellClient: React.FC<IsolatedRetellClientProps> = ({
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
  const [volume, setVolume] = useState(70);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [bars] = useState(Array(40).fill(0));
  const [animatedBars, setAnimatedBars] = useState(bars);
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);
  
  const retellClientRef = useRef<RetellWebClient | null>(null);
  const isStartingCall = useRef(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const eventHandlersRef = useRef<Map<string, Function>>(new Map());
  const animationIntervalRef = useRef<NodeJS.Timeout | null>(null);

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
      volume: 'Volume',
      muted: 'Muted',
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
      volume: 'Volumen',
      muted: 'Silenciado',
    },
  };

  // Create portal element
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const el = document.createElement('div');
      el.id = 'retell-portal';
      document.body.appendChild(el);
      setPortalElement(el);
      
      return () => {
        if (document.body.contains(el)) {
          document.body.removeChild(el);
        }
      };
    }
  }, []);

  // Animate sound bars
  useEffect(() => {
    if (!isConnected || !isActive) {
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
        animationIntervalRef.current = null;
      }
      return;
    }

    animationIntervalRef.current = setInterval(() => {
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

    return () => {
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
        animationIntervalRef.current = null;
      }
    };
  }, [isConnected, isActive, bars, isAgentTalking, isUserTalking]);

  // Event handler callbacks (memoized to prevent re-creation)
  const handleCallStarted = useCallback(() => {
    console.log('✅ Call started successfully');
    setIsConnected(true);
    setIsConnecting(false);
    toast.success('Connected to AI Assistant!');
  }, []);

  const handleCallEnded = useCallback(() => {
    console.log('📞 Call ended');
    setIsConnected(false);
    cleanupCall();
  }, []);

  const handleError = useCallback((error: any) => {
    console.error('❌ Retell error:', error);
    toast.error(error.message || 'Connection failed');
    setIsConnecting(false);
    setIsConnected(false);
    cleanupCall();
  }, []);

  const handleAgentStartTalking = useCallback(() => {
    console.log('🤖 Agent started talking');
    setIsAgentTalking(true);
    setIsUserTalking(false);
  }, []);

  const handleAgentStopTalking = useCallback(() => {
    console.log('🤖 Agent stopped talking');
    setIsAgentTalking(false);
  }, []);

  const handleUpdate = useCallback((update: any) => {
    try {
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
    } catch (err) {
      console.error('Error handling update:', err);
    }
  }, [onTranscript, onResponse]);

  const cleanupCall = useCallback(() => {
    try {
      // Remove all event listeners
      if (retellClientRef.current && eventHandlersRef.current.size > 0) {
        eventHandlersRef.current.forEach((handler, event) => {
          try {
            retellClientRef.current?.off(event as any, handler as any);
          } catch (e) {
            console.warn(`Failed to remove listener for ${event}:`, e);
          }
        });
        eventHandlersRef.current.clear();
      }

      // Stop the call
      if (retellClientRef.current) {
        try {
          retellClientRef.current.stopCall();
        } catch (e) {
          console.warn('Error stopping call:', e);
        }
        retellClientRef.current = null;
      }

      // Clean up audio context
      if (audioContextRef.current) {
        try {
          audioContextRef.current.close();
        } catch (e) {
          console.warn('Error closing audio context:', e);
        }
        audioContextRef.current = null;
        gainNodeRef.current = null;
      }

      // Clear animation interval
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
        animationIntervalRef.current = null;
      }

      // Reset states
      isStartingCall.current = false;
      setIsConnected(false);
      setIsConnecting(false);
      setTranscript('');
      setResponse('');
      setIsAgentTalking(false);
      setIsUserTalking(false);
      setShowVolumeSlider(false);
    } catch (err) {
      console.error('Error during cleanup:', err);
    }
  }, []);

  const startCall = async () => {
    // Prevent multiple simultaneous calls
    if (isStartingCall.current || isConnecting || isConnected) {
      console.log('Call already in progress, skipping...');
      return;
    }
    
    isStartingCall.current = true;
    console.log('🎤 Starting Retell Web SDK call...');
    setIsConnecting(true);

    try {
      // Get call credentials
      const response = await fetch('/api/retell/create-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language,
          agentId: process.env.NEXT_PUBLIC_RETELL_AGENT_ID || ''
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to create call: ${response.status}`);
      }

      const responseData = await response.json();
      const access_token = responseData.access_token;
      
      if (!access_token) {
        throw new Error('No access token received');
      }

      // Initialize Retell client
      const retellClient = new RetellWebClient();
      retellClientRef.current = retellClient;

      // Set up audio context for volume control
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        gainNodeRef.current = audioContextRef.current.createGain();
        gainNodeRef.current.gain.value = volume / 100;
      } catch (audioErr) {
        console.warn('Could not set up audio context:', audioErr);
      }

      // Register event listeners and store them
      const registerEventListener = (event: string, handler: Function) => {
        retellClient.on(event as any, handler as any);
        eventHandlersRef.current.set(event, handler);
      };

      registerEventListener('call_started', handleCallStarted);
      registerEventListener('call_ended', handleCallEnded);
      registerEventListener('error', handleError);
      registerEventListener('agent_start_talking', handleAgentStartTalking);
      registerEventListener('agent_stop_talking', handleAgentStopTalking);
      registerEventListener('update', handleUpdate);

      // Start the call
      await retellClient.startCall({
        accessToken: access_token,
        sampleRate: 24000,
      });

      console.log('✅ Call initiated successfully');

    } catch (error: any) {
      console.error('❌ Failed to start call:', error);
      toast.error(`Failed to connect: ${error.message || 'Unknown error'}`);
      cleanupCall();
      onClose();
    } finally {
      isStartingCall.current = false;
    }
  };

  // Handle volume change
  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = newVolume / 100;
    }
  };

  // Toggle mute
  const toggleMute = () => {
    if (retellClientRef.current) {
      try {
        if (isMuted) {
          retellClientRef.current.unmute();
          setIsMuted(false);
          toast.success('Microphone unmuted');
        } else {
          retellClientRef.current.mute();
          setIsMuted(true);
          toast.success('Microphone muted');
        }
      } catch (err) {
        console.error('Error toggling mute:', err);
        toast.error('Failed to toggle mute');
      }
    }
  };

  // End call
  const handleEndCall = () => {
    cleanupCall();
    onClose();
  };

  // Start call when active
  useEffect(() => {
    if (isActive && !isConnected && !isConnecting) {
      startCall();
    }
    
    return () => {
      if (isActive) {
        cleanupCall();
      }
    };
  }, [isActive]);

  if (!isActive || !portalElement) return null;

  const modalContent = (
    <>
      {isActive && (
        <div
className="fixed inset-0 z-[100000] flex items-center justify-center p-4"

        >
          {/* Glassmorphic Card */}
          <div
className="relative w-full max-w-md"

          >
            {/* Animated gradient background */}
            <div
              className="absolute inset-0 rounded-3xl opacity-50"
             }
            />

            {/* Content */}
            <div className="relative p-8">
              {/* Close button */}
              <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
                title="Close window"
              >
                <X} className="w-5 h-5 text-white/70" />
              </button>

              {/* Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4"

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
                   isConnected ? (
                     isMuted ? t[language].muted :
                     isAgentTalking ? t[language].agentSpeaking : 
                     isUserTalking ? t[language].userSpeaking : 
                     t[language].speaking
                   ) : 
                   t[language].callInProgress}
                </p>
              </div>

              {/* Sound Wave Visualization */}
              <div className="mb-6 h-24 flex items-center justify-center gap-1 px-4">
                {animatedBars.map((height, index) => (
                  <div
                    key={index}

                className="w-1 bg-gradient-to-t from-gold-400 to-gold-600 rounded-full transition-all duration-150"
                   %`,
                      opacity: isConnected ? (isMuted ? 0.3 : 1) : 0.3,
                    }}
                  />
                ))}
              </div>

              {/* Transcript Display */}
              {isConnected && (transcript || response) && (
                <div className="mb-4 p-4 rounded-lg bg-black/20 backdrop-blur-sm max-h-32 overflow-y-auto">
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
                    {/* Mute Button */}
                    <button
                      onClick={toggleMute} className={`p-4 rounded-full transition-all ${
                        isMuted 
                          ? 'bg-red-500/30 hover:bg-red-500/40 border-2 border-red-500/50' 
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

                    {/* Volume Control */}
                    <div className="relative">
                      <button
                        onClick={() => setShowVolumeSlider(!showVolumeSlider)}

                className="p-4 rounded-full bg-white/10 hover:bg-white/20 border-2 border-white/30 transition-all"
                        title={t[language].volume}
                      >
                        {volume === 0 ? (
                          <VolumeX className="w-6 h-6 text-white" />
                        ) : (
                          <Volume2 className="w-6 h-6 text-white" />
                        )}
                      </button>
                      
                      {/* Volume Slider */}
                      <>
                        {showVolumeSlider && (
                          <div
className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black/80 rounded-lg p-3"

                          >
                            <div className="text-white/70 text-xs mb-2 text-center">
                              {t[language].volume}: {volume}%
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={volume} onChange={(e) => handleVolumeChange(parseInt(e.target.value))}

                className="w-full"
                             %, #333 ${volume}%, #333 100%)`,
                              }}
                            />
                          </div>
                        )}
                      </>
                    </div>

                    {/* End Call Button */}
                    <button onClick={handleEndCall}
      className="px-6 py-4 rounded-full bg-red-500/20 hover:bg-red-500/30 border-2 border-red-500/50 transition-all flex items-center gap-2"
                    >
                      <PhoneOff} className="w-6 h-6 text-red-400" />
                      <span} className="text-red-400 font-medium">{t[language].endCall}</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Animation keyframes */}
          <style jsx>{`
            @keyframes liquidGlass {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
          `}</style>
        </div>
      )}
    </>
  );

  return createPortal(modalContent, portalElement);
};
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { RetellWebClient } from 'retell-client-js-sdk';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, PhoneOff, Mic, MicOff, Loader2 } from 'lucide-react';

interface RetellWebSDKClientProps {
  isActive: boolean;
  onClose: () => void;
  language?: 'en' | 'es';
  onTranscript?: (transcript: string) => void;
  onResponse?: (response: string) => void;
  onAudioLevelChange?: (level: number) => void;
}

export const RetellWebSDKClient: React.FC<RetellWebSDKClientProps> = ({
  isActive,
  onClose,
  language = 'en',
  onTranscript,
  onResponse,
  onAudioLevelChange
}) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isAgentTalking, setIsAgentTalking] = useState(false);
  const [isUserTalking, setIsUserTalking] = useState(false);
  
  const retellClientRef = useRef<RetellWebClient | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (isActive && !isConnected && !isConnecting) {
      startCall();
    } else if (!isActive && isConnected) {
      endCall();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isActive]);

  const startCall = async () => {
    console.log('🎤 Starting Retell Web SDK call...');
    setIsConnecting(true);
    const callStartTime = Date.now();

    try {
      // Step 1: Get call credentials from your backend
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

      // Step 2: IMMEDIATELY Initialize and Connect (critical for 30-second window)
      console.log('🚀 Connecting immediately to avoid timeout...');
      const retellClient = new RetellWebClient();
      retellClientRef.current = retellClient;

      // Step 3: Set up minimal event listeners (don't delay connection)
      let isCallStarted = false;
      
      // Quick event setup - minimal to not delay connection
      retellClient.on('call_started', () => {
        console.log('✅ Call started successfully at', Date.now() - callStartTime, 'ms');
        isCallStarted = true;
        setIsConnected(true);
        setIsConnecting(false);
        toast.success('Connected!');
      });

      retellClient.on('call_ended', () => {
        console.log('📞 Call ended');
        setIsConnected(false);
        cleanup();
      });

      retellClient.on('error', (error: any) => {
        console.error('❌ Retell error:', error);
        console.error('Error occurred at', Date.now() - callStartTime, 'ms after start');
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
        
        // Handle different update types
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

      // Raw audio events for visualization (optional)
      retellClient.on('audio', (audio: Float32Array) => {
        // Calculate audio level for visualization
        if (audio && audio.length > 0) {
          const sum = audio.reduce((acc, val) => acc + Math.abs(val), 0);
          const average = sum / audio.length;
          const level = Math.min(100, average * 500); // Scale to 0-100
          onAudioLevelChange?.(level);
        }
      });

      // Step 4: START CALL IMMEDIATELY - This is critical!
      // Must join within 30 seconds of token creation
      console.log('⏱️ Starting call at', Date.now() - callStartTime, 'ms after request');
      
      try {
        // Minimal config for fastest connection
        await retellClient.startCall({
          accessToken: access_token,
          sampleRate: 24000,
        });
        
        console.log('✅ startCall() completed at', Date.now() - callStartTime, 'ms');
        
        // Try to start audio playback after connection
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
      setIsConnecting(false);
      setIsConnected(false);
      cleanup();
      onClose();
    }
  };

  const endCall = () => {
    console.log('📞 Ending call...');
    if (retellClientRef.current) {
      try {
        retellClientRef.current.stopCall();
      } catch (error) {
        console.error('Error stopping call:', error);
      }
    }
    cleanup();
  };

  const cleanup = () => {
    retellClientRef.current = null;
    setIsConnected(false);
    setIsConnecting(false);
    setTranscript('');
    setResponse('');
    setIsAgentTalking(false);
    setIsUserTalking(false);
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

  // Determine who is talking for visualization
  const isSomeoneTalking = isAgentTalking || isUserTalking;

  if (!isActive) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '100px',
      right: '20px',
      width: '380px',
      padding: '24px',
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      borderRadius: '20px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
      zIndex: 9999,
      border: '1px solid rgba(255, 255, 255, 0.3)'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
          {isConnecting ? '🔄 Connecting...' :
           isConnected ? '🟢 Voice Assistant' :
           '🔴 Disconnected'}
        </h3>
        <button 
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            opacity: 0.7,
            transition: 'opacity 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
        >
          ✕
        </button>
      </div>

      {/* Status Messages */}
      <div style={{ marginBottom: '20px', minHeight: '80px' }}>
        {isConnecting && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <Loader2 className="animate-spin" style={{ margin: '0 auto', width: '32px', height: '32px' }} />
            <p style={{ marginTop: '10px', color: '#666' }}>Initiating call. Please wait...</p>
          </div>
        )}

        {isConnected && (
          <>
            {/* Voice Activity Indicator */}
            <div style={{ 
              padding: '12px',
              background: isAgentTalking ? '#e3f2fd' : isUserTalking ? '#f3e5f5' : '#f5f5f5',
              borderRadius: '12px',
              marginBottom: '12px',
              transition: 'all 0.3s ease'
            }}>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
                {isAgentTalking ? '🤖 Assistant is speaking...' :
                 isUserTalking ? '🎤 You are speaking...' :
                 '🎧 Listening...'}
              </div>
            </div>

            {/* Transcript */}
            {transcript && (
              <div style={{ 
                padding: '10px',
                background: '#f0f0f0',
                borderRadius: '8px',
                marginBottom: '8px',
                fontSize: '14px'
              }}>
                <strong>You:</strong> {transcript}
              </div>
            )}

            {/* Response */}
            {response && (
              <div style={{ 
                padding: '10px',
                background: '#e8f4f8',
                borderRadius: '8px',
                fontSize: '14px'
              }}>
                <strong>Assistant:</strong> {response}
              </div>
            )}
          </>
        )}
      </div>

      {/* Sound Wave Visualization */}
      {isConnected && (
        <div style={{ 
          height: '60px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          gap: '3px',
          marginBottom: '20px'
        }}>
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              style={{
                width: '3px',
                background: isAgentTalking ? 'linear-gradient(to top, #4CAF50, #8BC34A)' : 
                          isUserTalking ? 'linear-gradient(to top, #2196F3, #64B5F6)' : 
                          '#ddd',
                borderRadius: '2px',
                transition: 'all 0.2s ease'
              }}
              animate={{
                height: isSomeoneTalking ? 
                  `${20 + Math.random() * 40}px` : 
                  '10px'
              }}
              transition={{
                duration: 0.2,
                repeat: isSomeoneTalking ? Infinity : 0,
                repeatType: 'reverse'
              }}
            />
          ))}
        </div>
      )}

      {/* Controls */}
      {isConnected && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
          <button 
            onClick={toggleMute}
            style={{
              padding: '12px',
              borderRadius: '50%',
              background: isMuted ? '#f44336' : '#2196F3',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease'
            }}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
          </button>

          <button 
            onClick={endCall}
            style={{
              padding: '12px 24px',
              borderRadius: '25px',
              background: '#f44336',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '16px',
              fontWeight: '500',
              transition: 'all 0.3s ease'
            }}
          >
            <PhoneOff size={20} />
            End Call
          </button>
        </div>
      )}
    </div>
  );
};
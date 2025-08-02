'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Sphere } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, VolumeX, Phone, X } from 'lucide-react';

declare global {
  interface SpeechRecognitionEvent extends Event {
    resultIndex: number;
    results: SpeechRecognitionResultList;
  }

  interface SpeechRecognitionErrorEvent extends Event {
    error: string;
  }
}

interface VirtualAssistantProps {
  onMessage?: (message: string) => void;
  language?: 'en' | 'es';
  onClose?: () => void;
}

// Animated Avatar Component
function Avatar({ isSpeaking }: { isSpeaking: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(state => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;

      // Rotation when speaking
      if (isSpeaking) {
        meshRef.current.rotation.y += 0.02;
      } else {
        // Slowly return to center
        meshRef.current.rotation.y *= 0.95;
      }

      // Scale on hover
      const targetScale = hovered ? 1.1 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group>
      {/* Head */}
      <Sphere
        ref={meshRef}
        args={[1, 32, 32]}
        position={[0, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          color="#6B1F2E"
          metalness={0.3}
          roughness={0.7}
          emissive="#6B1F2E"
          emissiveIntensity={isSpeaking ? 0.2 : 0.1}
        />
      </Sphere>

      {/* Eyes */}
      <Sphere args={[0.15, 16, 16]} position={[-0.3, 0.2, 0.9]}>
        <meshStandardMaterial color="#ffffff" />
      </Sphere>
      <Sphere args={[0.15, 16, 16]} position={[0.3, 0.2, 0.9]}>
        <meshStandardMaterial color="#ffffff" />
      </Sphere>

      {/* Pupils */}
      <Sphere args={[0.08, 16, 16]} position={[-0.3, 0.2, 1]}>
        <meshStandardMaterial color="#000000" />
      </Sphere>
      <Sphere args={[0.08, 16, 16]} position={[0.3, 0.2, 1]}>
        <meshStandardMaterial color="#000000" />
      </Sphere>

      {/* Mouth (changes when speaking) */}
      <Box args={[0.6, 0.1, 0.1]} position={[0, -0.3, 0.95]}>
        <meshStandardMaterial color="#000000" />
      </Box>

      {/* Body */}
      <Box args={[1.5, 2, 0.8]} position={[0, -2, 0]}>
        <meshStandardMaterial color="#1a1a1a" />
      </Box>

      {/* Tie */}
      <Box args={[0.2, 1.2, 0.1]} position={[0, -1.5, 0.5]}>
        <meshStandardMaterial color="#C9974D" />
      </Box>
    </group>
  );
}

// Speech Recognition Hook
function useSpeechRecognition(onMessage: (message: string) => void, language: string) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = language === 'es' ? 'es-ES' : 'en-US';

      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (!result || !result[0]) continue;
          const transcript = result[0].transcript;
          if (result.isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        setTranscript(interimTranscript || finalTranscript);

        if (finalTranscript) {
          onMessage(finalTranscript);
        }
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [language, onMessage]);

  const toggleListening = useCallback(() => {
    if (recognitionRef.current) {
      if (isListening) {
        recognitionRef.current.stop();
      } else {
        recognitionRef.current.start();
        setIsListening(true);
      }
    }
  }, [isListening]);

  return { isListening, transcript, toggleListening };
}

// Main Virtual Assistant Component
export default function VirtualAssistant3D({
  onMessage = () => {},
  language = 'en',
  onClose,
}: VirtualAssistantProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [assistantMessage, setAssistantMessage] = useState('');
  const { isListening, transcript, toggleListening } = useSpeechRecognition(onMessage, language);

  // Simulate assistant speaking
  const speak = useCallback(
    (text: string) => {
      setAssistantMessage(text);
      setIsSpeaking(true);

      if (!isMuted && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language === 'es' ? 'es-ES' : 'en-US';
        utterance.onend = () => setIsSpeaking(false);
        speechSynthesis.speak(utterance);
      } else {
        // Simulate speaking duration
        setTimeout(() => setIsSpeaking(false), 3000);
      }
    },
    [isMuted, language]
  );

  // Welcome message
  useEffect(() => {
    const welcomeMessage =
      language === 'es'
        ? '¡Hola! Soy tu asistente legal virtual. ¿En qué puedo ayudarte hoy?'
        : "Hello! I'm your virtual legal assistant. How can I help you today?";
    speak(welcomeMessage);
  }, [language, speak]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed bottom-4 right-4 w-96 h-[600px] bg-white dark:bg-gray-900 rounded-lg shadow-2xl overflow-hidden z-50"
    >
      {/* Header */}
      <div className="bg-[#6B1F2E] text-white p-4 flex justify-between items-center">
        <h3 className="font-semibold">Virtual Legal Assistant</h3>
        <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* 3D Scene */}
      <div className="h-64 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Avatar isSpeaking={isSpeaking} />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>

      {/* Message Display */}
      <div className="p-4 h-32 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <AnimatePresence mode="wait">
          {assistantMessage && (
            <motion.div
              key={assistantMessage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-sm text-gray-700 dark:text-gray-300"
            >
              <p className="font-medium text-[#6B1F2E] mb-1">Assistant:</p>
              <p>{assistantMessage}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {transcript && (
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            <p className="font-medium text-gray-800 dark:text-gray-200 mb-1">You:</p>
            <p>{transcript}</p>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-900 border-t dark:border-gray-700">
        <div className="flex justify-center gap-4">
          <button
            onClick={toggleListening}
            className={`p-3 rounded-full transition-all ${
              isListening
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {isListening ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>

          <button
            onClick={() => (window.location.href = 'tel:18449673536')}
            className="p-3 rounded-full bg-[#6B1F2E] hover:bg-[#8B2635] text-white transition-colors"
          >
            <Phone className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-center mt-3 text-gray-500 dark:text-gray-400">
          {language === 'es'
            ? 'Haz clic en el micrófono para hablar'
            : 'Click the microphone to speak'}
        </p>
      </div>
    </motion.div>
  );
}

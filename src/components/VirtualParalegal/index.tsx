'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, useFBX, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { useChat } from 'ai/react';

// 3D Avatar Component
function Avatar3D({ speaking }: { speaking: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  // For FBX models, we need to use a try-catch as the model might not exist
  let fbxModel = null;
  try {
    fbxModel = useFBX('/models/paralegal-avatar.fbx');
  } catch (error) {
    console.log('FBX model not found, using fallback');
  }

  const { actions } = useAnimations(fbxModel?.animations || [], groupRef);

  useEffect(() => {
    if (speaking && actions?.talking) {
      actions.talking.play();
    } else if (actions?.idle) {
      actions.idle.play();
    }
  }, [speaking, actions]);

  // Use animated 3D shape as avatar
  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} scale={[1, 1.5, 1]}>
        <capsuleGeometry args={[0.5, 1, 8, 16]} />
        <meshStandardMaterial
          color={speaking ? '#C9974D' : '#6B1F2E'}
          metalness={0.5}
          roughness={0.5}
          emissive={speaking ? '#C9974D' : '#000000'}
          emissiveIntensity={speaking ? 0.5 : 0}
        />
      </mesh>
      {/* Add animated eyes */}
      <mesh position={[0.2, 0.5, 0.4]} scale={[0.1, 0.1, 0.1]}>
        <sphereGeometry />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-0.2, 0.5, 0.4]} scale={[0.1, 0.1, 0.1]}>
        <sphereGeometry />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* Add animated mouth */}
      <mesh position={[0, 0, 0.5]} scale={[0.3, speaking ? 0.2 : 0.1, 0.1]}>
        <boxGeometry />
        <meshStandardMaterial color="#333333" />
      </mesh>
    </group>
  );
}

interface VirtualParalegalProps {
  language: 'en' | 'es';
  onClose: () => void;
}

export default function VirtualParalegal({ language, onClose }: VirtualParalegalProps) {
  const [stage, setStage] = useState<'greeting' | 'listening' | 'thinking' | 'responding'>(
    'greeting'
  );
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/ai/paralegal',
    initialMessages: [
      {
        id: '1',
        role: 'system',
        content:
          language === 'en'
            ? 'You are a virtual paralegal for Vasquez Law Firm. Be helpful, professional, and guide users to schedule consultations when appropriate.'
            : 'Eres un asistente legal virtual para Vasquez Law Firm. Sé útil, profesional y guía a los usuarios a programar consultas cuando sea apropiado.',
      },
    ],
  });

  const content = {
    en: {
      greeting: "Hello! I\'m your AI paralegal assistant. How can I help you today?",
      listening: "I'm listening...",
      thinking: 'Let me think about that...',
      askName: 'May I have your name?',
      askEmail: "What's your email address?",
      askPhone: "What's the best phone number to reach you?",
      askIssue: 'Please briefly describe your legal issue.',
      schedule: 'Schedule Consultation',
      speak: 'Speak',
      type: 'Type',
      send: 'Send',
      placeholder: 'Type your message or click the microphone to speak...',
    },
    es: {
      greeting: '¡Hola! Soy su asistente legal de IA. ¿Cómo puedo ayudarle hoy?',
      listening: 'Estoy escuchando...',
      thinking: 'Déjame pensar en eso...',
      askName: '¿Cuál es su nombre?',
      askEmail: '¿Cuál es su correo electrónico?',
      askPhone: '¿Cuál es el mejor número para contactarle?',
      askIssue: 'Por favor describa brevemente su problema legal.',
      schedule: 'Programar Consulta',
      speak: 'Hablar',
      type: 'Escribir',
      send: 'Enviar',
      placeholder: 'Escriba su mensaje o haga clic en el micrófono para hablar...',
    },
  };

  const t = content[language];

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = language === 'es' ? 'es-ES' : 'en-US';

      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');

        setTranscript(transcript);

        if (event.results[0].isFinal) {
          handleInputChange({
            target: { value: transcript },
          } as React.ChangeEvent<HTMLInputElement>);
          setIsListening(false);
        }
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };
    }
  }, [language, handleInputChange]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
      setStage('listening');
    }
  };

  // Update stage based on chat state
  useEffect(() => {
    if (isLoading) {
      setStage('thinking');
    } else if (messages.length > 1) {
      setStage('responding');
    }
  }, [isLoading, messages]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={e => e.stopPropagation()}
          className="relative mx-4 w-full max-w-4xl overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-[#1a0a0f] to-black shadow-2xl"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            <svg
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="flex h-[600px]">
            {/* 3D Avatar Section */}
            <div className="relative w-1/3 border-r border-white/10 bg-gradient-to-b from-[#6B1F2E]/20 to-transparent">
              <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <OrbitControls enableZoom={false} enablePan={false} />
                <Avatar3D speaking={stage === 'responding'} />
              </Canvas>

              {/* Status Indicator */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="rounded-full bg-black/50 px-4 py-2 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        stage === 'listening'
                          ? 'animate-pulse bg-red-500'
                          : stage === 'thinking'
                            ? 'animate-pulse bg-yellow-500'
                            : 'bg-green-500'
                      }`}
                    />
                    <span className="text-sm text-white">
                      {stage === 'listening'
                        ? t.listening
                        : stage === 'thinking'
                          ? t.thinking
                          : 'Online'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Section */}
            <div className="flex flex-1 flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6">
                <AnimatePresence initial={false}>
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className={`mb-4 flex ${
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          message.role === 'user'
                            ? 'bg-[#C9974D] text-black'
                            : 'bg-white/10 text-white backdrop-blur-sm'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Welcome message if no messages */}
                {messages.length === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                  >
                    <h3 className="mb-4 text-2xl font-bold text-white">{t.greeting}</h3>
                    <div className="grid gap-3">
                      {['Immigration', 'Personal Injury', 'Criminal Defense', 'Workers Comp'].map(
                        area => (
                          <button
                            key={area}
                            onClick={() =>
                              handleInputChange({
                                target: { value: `I need help with ${area}` },
                              } as React.ChangeEvent<HTMLInputElement>)
                            }
                            className="rounded-lg bg-white/10 px-4 py-3 text-white backdrop-blur-sm transition-all hover:bg-white/20"
                          >
                            {area}
                          </button>
                        )
                      )}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Input Section */}
              <form onSubmit={handleSubmit} className="border-t border-white/10 p-4">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={isListening ? transcript : input}
                      onChange={handleInputChange}
                      placeholder={t.placeholder}
                      className="w-full rounded-full bg-white/10 px-6 py-3 pr-12 text-white placeholder-gray-400 backdrop-blur-sm transition-colors focus:bg-white/20 focus:outline-none"
                      disabled={isListening}
                    />
                    <button
                      type="button"
                      onClick={toggleListening}
                      className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 transition-colors ${
                        isListening ? 'bg-red-500 text-white' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                        />
                      </svg>
                    </button>
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading || (!input && !transcript)}
                    className="rounded-full bg-[#C9974D] px-6 py-3 font-semibold text-black transition-all hover:bg-[#E5B568] disabled:opacity-50"
                  >
                    {t.send}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

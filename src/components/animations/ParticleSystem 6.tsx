'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import confetti from 'canvas-confetti';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  velocity: { x: number; y: number };
  life: number;
  opacity: number;
  color: string;
}

interface ParticleSystemProps {
  count?: number;
  colors?: string[];
  speed?: number;
  spread?: number;
  gravity?: number;
  fade?: boolean;
  connect?: boolean;
  mouse?: boolean;
}

export function ParticleSystem({
  count = 50,
  colors = ['#6B1F2E', '#C9974D', '#8B2635'],
  speed = 1,
  spread = 50,
  gravity = 0.1,
  fade = true,
  connect = false,
  mouse = true,
}: ParticleSystemProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize particles
    particlesRef.current = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      velocity: {
        x: (Math.random() - 0.5) * speed,
        y: (Math.random() - 0.5) * speed,
      },
      life: 1,
      opacity: 1,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    if (mouse) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.velocity.x;
        particle.y += particle.velocity.y;

        // Apply gravity
        particle.velocity.y += gravity;

        // Mouse interaction
        if (mouse) {
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            const force = (100 - distance) / 100;
            particle.velocity.x -= (dx / distance) * force * 0.5;
            particle.velocity.y -= (dy / distance) * force * 0.5;
          }
        }

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.velocity.x *= -0.8;
          particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.velocity.y *= -0.8;
          particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        }

        // Fade out
        if (fade) {
          particle.life -= 0.005;
          particle.opacity = particle.life;
        }

        // Reset dead particles
        if (particle.life <= 0) {
          particle.x = Math.random() * canvas.width;
          particle.y = 0;
          particle.life = 1;
          particle.velocity = {
            x: (Math.random() - 0.5) * speed,
            y: Math.random() * speed,
          };
        }

        // Draw connections
        if (connect) {
          particlesRef.current.slice(index + 1).forEach((other) => {
            const dx = particle.x - other.x;
            const dy = particle.y - other.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(107, 31, 46, ${(1 - distance / 100) * 0.3})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(other.x, other.y);
              ctx.stroke();
            }
          });
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [count, colors, speed, spread, gravity, fade, connect, mouse]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}

// Confetti explosion component
export function ConfettiExplosion({ 
  trigger = false,
  particleCount = 100,
  spread = 70,
  origin = { x: 0.5, y: 0.5 }
}: {
  trigger?: boolean;
  particleCount?: number;
  spread?: number;
  origin?: { x: number; y: number };
}) {
  useEffect(() => {
    if (trigger) {
      confetti({
        particleCount,
        spread,
        origin,
        colors: ['#6B1F2E', '#C9974D', '#8B2635', '#D4A574'],
        ticks: 200,
        gravity: 1,
        decay: 0.94,
        startVelocity: 30,
        shapes: ['circle', 'square'],
        scalar: 1,
      });
    }
  }, [trigger, particleCount, spread, origin]);

  return null;
}

// Floating particles background
export function FloatingParticles({ density = 30 }: { density?: number }) {
  const particles = Array.from({ length: density }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 20,
    x: Math.random() * 100,
  }));

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-br from-[#6B1F2E] to-[#C9974D]"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
          }}
          animate={{
            y: ['-10vh', '110vh'],
            x: [0, Math.random() * 100 - 50],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}
'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { useGestures } from '@/hooks/useGestures';

// Spring physics ball
export function SpringBall() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 10, stiffness: 100 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  return (
    <div className="relative h-96 w-full overflow-hidden rounded-lg bg-gray-100">
      <motion.div
        className="absolute h-16 w-16 cursor-grab rounded-full bg-gradient-to-br from-[#6B1F2E] to-[#C9974D] active:cursor-grabbing"
        drag
        dragConstraints={{ left: -150, right: 150, top: -150, bottom: 150 }}
        dragElastic={0.2}
        whileDrag={{ scale: 1.2 }}
        style={{ x: xSpring, y: ySpring }}
        onDrag={(e, info) => {
          x.set(info.offset.x);
          y.set(info.offset.y);
        }}
        onDragEnd={() => {
          x.set(0);
          y.set(0);
        }}
      />
    </div>
  );
}

// Gravity simulation
export function GravitySimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      life: number;
    }

    const particles: Particle[] = [];
    const gravity = 0.5;
    const friction = 0.99;
    const colors = ['#6B1F2E', '#C9974D', '#8B2635'];

    // Create particles on click
    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      for (let i = 0; i < 10; i++) {
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 10,
          vy: (Math.random() - 0.5) * 10,
          radius: Math.random() * 5 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 1,
        });
      }
    };

    canvas.addEventListener('click', handleClick);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];

        // Apply physics
        particle.vy += gravity;
        particle.vx *= friction;
        particle.vy *= friction;
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= 0.01;

        // Bounce off walls
        if (particle.x + particle.radius > canvas.width || particle.x - particle.radius < 0) {
          particle.vx *= -0.8;
          particle.x = Math.max(
            particle.radius,
            Math.min(canvas.width - particle.radius, particle.x)
          );
        }

        if (particle.y + particle.radius > canvas.height) {
          particle.vy *= -0.8;
          particle.y = canvas.height - particle.radius;

          // Add some randomness to prevent settling
          if (Math.abs(particle.vy) < 1) {
            particle.vy = -Math.random() * 5;
          }
        }

        // Remove dead particles
        if (particle.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        // Draw particle
        ctx.globalAlpha = particle.life;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      canvas.removeEventListener('click', handleClick);
    };
  }, []);

  return <canvas ref={canvasRef} className="h-96 w-full cursor-pointer rounded-lg bg-gray-50" />;
}

// Elastic collision balls
export function ElasticCollision() {
  const ball1X = useMotionValue(100);
  const ball1Y = useMotionValue(100);
  const ball2X = useMotionValue(300);
  const ball2Y = useMotionValue(100);

  const handleDragEnd = (ballIndex: number) => {
    // Simple collision detection
    const distance = Math.sqrt(
      Math.pow(ball1X.get() - ball2X.get(), 2) + Math.pow(ball1Y.get() - ball2Y.get(), 2)
    );

    if (distance < 80) {
      // Collision detected - bounce apart
      const angle = Math.atan2(ball2Y.get() - ball1Y.get(), ball2X.get() - ball1X.get());
      const force = 100;

      if (ballIndex === 1) {
        ball2X.set(ball2X.get() + Math.cos(angle) * force);
        ball2Y.set(ball2Y.get() + Math.sin(angle) * force);
      } else {
        ball1X.set(ball1X.get() - Math.cos(angle) * force);
        ball1Y.set(ball1Y.get() - Math.sin(angle) * force);
      }
    }
  };

  return (
    <div className="relative h-96 w-full overflow-hidden rounded-lg bg-gray-100">
      <motion.div
        className="absolute h-20 w-20 cursor-grab rounded-full bg-[#6B1F2E] active:cursor-grabbing"
        drag
        dragConstraints={{ left: 0, right: 300, top: 0, bottom: 300 }}
        style={{ x: ball1X, y: ball1Y }}
        onDragEnd={() => handleDragEnd(1)}
        whileDrag={{ scale: 1.1 }}
      />
      <motion.div
        className="absolute h-20 w-20 cursor-grab rounded-full bg-[#C9974D] active:cursor-grabbing"
        drag
        dragConstraints={{ left: 0, right: 300, top: 0, bottom: 300 }}
        style={{ x: ball2X, y: ball2Y }}
        onDragEnd={() => handleDragEnd(2)}
        whileDrag={{ scale: 1.1 }}
      />
    </div>
  );
}

// Pendulum animation
export function Pendulum() {
  const rotation = useMotionValue(0);
  const velocity = useMotionValue(5);

  useEffect(() => {
    const gravity = 0.5;
    const length = 200;
    const damping = 0.995;

    const animate = () => {
      const angle = rotation.get();
      const vel = velocity.get();

      // Physics calculation
      const acceleration = -(gravity / length) * Math.sin((angle * Math.PI) / 180);
      const newVelocity = vel + acceleration;
      const newAngle = angle + newVelocity;

      velocity.set(newVelocity * damping);
      rotation.set(newAngle);

      requestAnimationFrame(animate);
    };

    animate();
  }, [rotation, velocity]);

  return (
    <div className="relative h-96 w-full">
      <div className="absolute left-1/2 top-0 h-8 w-8 -translate-x-1/2 rounded-full bg-gray-400" />
      <motion.div
        className="absolute left-1/2 top-0 w-1 bg-gray-600"
        style={{
          height: 200,
          rotate: rotation,
          originY: 0,
        }}
      >
        <motion.div
          className="absolute -bottom-10 -left-5 h-10 w-10 rounded-full bg-gradient-to-br from-[#6B1F2E] to-[#C9974D]"
          drag="x"
          dragConstraints={{ left: -100, right: 100 }}
          onDrag={(e, info) => {
            rotation.set(info.offset.x / 2);
            velocity.set(0);
          }}
        />
      </motion.div>
    </div>
  );
}

// Momentum scroll
export function MomentumScroll({ children }: { children: React.ReactNode }) {
  const scrollY = useMotionValue(0);
  const scrollYSmooth = useSpring(scrollY, {
    damping: 15,
    stiffness: 90,
  });

  return (
    <motion.div
      className="h-96 overflow-hidden rounded-lg bg-gray-50"
      onWheel={e => {
        e.preventDefault();
        scrollY.set(scrollY.get() - e.deltaY);
      }}
    >
      <motion.div
        style={{ y: scrollYSmooth }}
        drag="y"
        dragConstraints={{ top: -500, bottom: 0 }}
        onDrag={(e, info) => {
          scrollY.set(info.offset.y);
        }}
        className="p-8"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

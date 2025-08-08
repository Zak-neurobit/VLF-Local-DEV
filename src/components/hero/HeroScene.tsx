'use client';

import React, { useRef, useEffect, useState } from 'react';
// Three.js removed - 3D not needed;
// React Three Fiber removed - 3D not needed;
// React Three Fiber removed - 3D not needed;
import { safeWindow, addWindowListener } from '@/lib/utils/browser';

// Particle Field Background
function ParticleField() {
  const count = 500;
  const mesh = useRef<THREE.Points>(null);

  const particles = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    particles[i * 3] = (Math.random() - 0.5) * 10;
    particles[i * 3 + 1] = (Math.random() - 0.5) * 10;
    particles[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }

  useFrame(state => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.05;
      mesh.current.rotation.y = state.clock.elapsedTime * 0.075;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#C9974D" transparent opacity={0.8} />
    </points>
  );
}

export default function HeroScene() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(safeWindow.innerWidth < 768);
    };

    checkMobile();
    const removeListener = addWindowListener('resize', checkMobile);
    return removeListener;
  }, []);

  // Simplified gradient background for mobile
  if (isMobile) {
    return (
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-black to-primary/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 opacity-50">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <ParticleField />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}

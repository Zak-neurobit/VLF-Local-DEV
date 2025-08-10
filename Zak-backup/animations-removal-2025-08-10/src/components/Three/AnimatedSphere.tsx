'use client';

// React Three Fiber removed - 3D not needed;

export default function AnimatedSphere() {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[1, 100, 200]} scale={2}>
        <MeshDistortMaterial
          color="#7C1818"
          attach="material"
          distort={0.5}
          speed={2}
          roughness={0}
        />
      </Sphere>
    </Float>
  );
}

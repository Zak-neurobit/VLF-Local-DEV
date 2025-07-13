'use client';

import React from 'react';
import { AnimationShowcase } from '@/components/animations';
import { ParticleSystem } from '@/components/animations/ParticleSystem';
import { CurtainTransition } from '@/components/animations/PageTransitions';
import {
  SpringBall,
  GravitySimulation,
  ElasticCollision,
  Pendulum,
  MomentumScroll,
} from '@/components/animations/PhysicsAnimations';

export default function AnimationsDemoPage() {
  return (
    <CurtainTransition>
      <div className="relative min-h-screen">
        {/* Interactive particle background */}
        <ParticleSystem count={30} connect={true} mouse={true} fade={true} />

        {/* Main content */}
        <div className="relative z-10">
          {/* Hero Section */}
          <section className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-sm">
            <div className="text-center">
              <h1 className="mb-6 text-6xl font-bold">
                <span className="bg-gradient-to-r from-[#6B1F2E] via-[#C9974D] to-[#8B2635] bg-clip-text text-transparent">
                  Epic Animations Showcase
                </span>
              </h1>
              <p className="text-2xl text-gray-600">
                The most visually stunning law firm website ever created
              </p>
              <div className="mt-8">
                <a
                  href="#showcase"
                  className="inline-block rounded-lg bg-gradient-to-r from-[#6B1F2E] to-[#8B2635] px-8 py-4 text-white transition-transform hover:scale-105"
                >
                  Explore Animations
                </a>
              </div>
            </div>
          </section>

          {/* Physics Animations Section */}
          <section className="bg-white py-20">
            <div className="container mx-auto px-4">
              <h2 className="mb-12 text-center text-4xl font-bold">Physics-Based Animations</h2>

              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-2xl font-semibold">Spring Physics</h3>
                  <SpringBall />
                </div>

                <div>
                  <h3 className="mb-4 text-2xl font-semibold">Gravity Simulation</h3>
                  <p className="mb-4 text-gray-600">Click to create particles!</p>
                  <GravitySimulation />
                </div>

                <div>
                  <h3 className="mb-4 text-2xl font-semibold">Elastic Collision</h3>
                  <p className="mb-4 text-gray-600">Drag the balls and watch them collide!</p>
                  <ElasticCollision />
                </div>

                <div>
                  <h3 className="mb-4 text-2xl font-semibold">Pendulum Motion</h3>
                  <p className="mb-4 text-gray-600">Drag the pendulum to start swinging!</p>
                  <Pendulum />
                </div>
              </div>

              <div className="mt-12">
                <h3 className="mb-4 text-2xl font-semibold">Momentum Scroll</h3>
                <MomentumScroll>
                  <div className="space-y-4">
                    <h4 className="text-xl font-bold text-[#6B1F2E]">
                      Experience Smooth Scrolling
                    </h4>
                    <p className="text-gray-600">
                      This container has momentum-based scrolling with spring physics. Try scrolling
                      or dragging to feel the smooth motion!
                    </p>
                    {Array.from({ length: 20 }, (_, i) => (
                      <p key={i} className="text-gray-600">
                        Scroll item {i + 1} - Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit.
                      </p>
                    ))}
                  </div>
                </MomentumScroll>
              </div>
            </div>
          </section>

          {/* Main Animation Showcase */}
          <div id="showcase">
            <AnimationShowcase />
          </div>

          {/* Instructions Section */}
          <section className="bg-gray-50 py-20">
            <div className="container mx-auto px-4">
              <h2 className="mb-8 text-center text-4xl font-bold">How to Use These Animations</h2>

              <div className="mx-auto max-w-4xl space-y-6 text-gray-600">
                <div className="rounded-lg bg-white p-6 shadow-lg">
                  <h3 className="mb-3 text-xl font-semibold text-[#6B1F2E]">
                    1. Import Animations
                  </h3>
                  <pre className="rounded bg-gray-100 p-4">
                    <code>{`import { ParallaxHero, MagneticButton, LiquidReveal } from '@/components/animations';`}</code>
                  </pre>
                </div>

                <div className="rounded-lg bg-white p-6 shadow-lg">
                  <h3 className="mb-3 text-xl font-semibold text-[#6B1F2E]">
                    2. Use Animation Hooks
                  </h3>
                  <pre className="rounded bg-gray-100 p-4">
                    <code>{`import { useParallax, useScrollReveal, useMagneticHover } from '@/hooks';

const { ref, y, scale } = useParallax();`}</code>
                  </pre>
                </div>

                <div className="rounded-lg bg-white p-6 shadow-lg">
                  <h3 className="mb-3 text-xl font-semibold text-[#6B1F2E]">
                    3. Apply to Components
                  </h3>
                  <pre className="rounded bg-gray-100 p-4">
                    <code>{`<motion.div ref={ref} style={{ y, scale }}>
  <YourContent />
</motion.div>`}</code>
                  </pre>
                </div>

                <div className="rounded-lg bg-white p-6 shadow-lg">
                  <h3 className="mb-3 text-xl font-semibold text-[#6B1F2E]">Performance Tips</h3>
                  <ul className="list-inside list-disc space-y-2">
                    <li>Use GPU-accelerated properties (transform, opacity)</li>
                    <li>Implement lazy loading for heavy animations</li>
                    <li>Respect user&apos;s prefers-reduced-motion setting</li>
                    <li>Test on various devices for optimal performance</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </CurtainTransition>
  );
}

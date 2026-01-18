import { useEffect, useRef, useMemo } from 'react';

/**
 * CSS-Only Animated Particles Background
 * Lightweight alternative to Three.js implementation
 * Pure CSS animations for film grain effect
 * Optimized for mobile: reduced particles, respects prefers-reduced-motion
 */
export const CSSParticlesBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Determine particle count based on device and preferences
  const particleCount = useMemo(() => {
    if (typeof window === 'undefined') return 20;

    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return 0; // No particles for reduced motion
    }

    // Check for mobile
    if (window.innerWidth < 768) {
      return 15; // Fewer particles on mobile
    }

    return 50; // Full particles on desktop
  }, []);

  useEffect(() => {
    if (!containerRef.current || particleCount === 0) return;

    // Generate random particles
    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';

      // Random position
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = Math.random() * 3 + 1; // 1-4px
      const duration = Math.random() * 20 + 15; // 15-35s
      const delay = Math.random() * 10; // 0-10s

      particle.style.cssText = `
        position: absolute;
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        background: rgba(139, 58, 24, 0.3);
        border-radius: 50%;
        pointer-events: none;
        animation: float ${duration}s ${delay}s infinite ease-in-out;
        filter: blur(1px);
        will-change: transform, opacity;
      `;

      containerRef.current.appendChild(particle);
      particles.push(particle);
    }

    // Cleanup
    return () => {
      particles.forEach(p => p.remove());
    };
  }, [particleCount]);

  // Don't render anything if reduced motion is preferred
  if (particleCount === 0) {
    return null;
  }

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.2;
          }
          25% {
            transform: translate(10px, -20px) scale(1.1);
            opacity: 0.4;
          }
          50% {
            transform: translate(-5px, -40px) scale(0.9);
            opacity: 0.3;
          }
          75% {
            transform: translate(15px, -60px) scale(1.05);
            opacity: 0.35;
          }
        }

        @keyframes grain {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.25; }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .particle {
            animation: none !important;
          }
        }
      `}</style>

      <div
        ref={containerRef}
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.05) 100%)'
        }}
      >
        {/* Film grain overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
            opacity: 0.08,
            animation: 'grain 8s steps(10) infinite',
            mixBlendMode: 'overlay',
          }}
        />
      </div>
    </>
  );
};


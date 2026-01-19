import React, { useEffect, useState, useMemo } from 'react';
import { translations, Language } from '../translations';

export const NoiseOverlay: React.FC = () => {
  // Disable noise overlay on mobile for better performance
  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return true;
    return window.innerWidth < 768 ||
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }, []);

  // Don't render on mobile - saves CPU
  if (isMobile) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none w-full h-full overflow-hidden mix-blend-multiply opacity-20">
      {/* Simple CSS noise pattern - lightweight */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,0.03) 0%, transparent 50%)',
          backgroundSize: '8px 8px'
        }}
      />
    </div>
  );
};

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 z-[9999] pointer-events-none transition-transform duration-75 ease-out"
      style={{
        transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
      }}
    >
      <div
        className={`rounded-full transition-all duration-300 ease-out border-2 border-daez-blood ${isHovering ? 'w-12 h-12 bg-daez-blood/40 scale-125' : 'w-4 h-4 bg-daez-blood'
          }`}
      />
    </div>
  );
};

interface StickyCTAProps {
  language: Language;
}

export const StickyCTA: React.FC<StickyCTAProps> = ({ language }) => {
  const t = translations[language].cta;

  return (
    <a href="#contact" className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 group cursor-none mix-blend-difference text-white">
      <div className="relative flex items-center justify-center w-20 h-20 md:w-32 md:h-32">
        {/* Stamp Effect Background */}
        <div className="absolute inset-0 bg-white rounded-full opacity-0 group-hover:opacity-10 transition-opacity"></div>

        <div className="absolute inset-0 border-2 border-white rounded-full group-hover:bg-white group-hover:text-black transition-colors duration-300 flex items-center justify-center filter-ink">
          <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow">
            <path id="curve" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
            <text fontSize="11.5" fontWeight="bold" className="uppercase font-mono fill-current">
              <textPath href="#curve" startOffset="50%" textAnchor="middle">
                {t.text}
              </textPath>
            </text>
          </svg>
        </div>
        <div className="absolute font-display text-2xl font-bold group-hover:rotate-12 transition-transform">
          {t.center}
        </div>
      </div>
    </a>
  );
};

export const SectionHeader: React.FC<{ title: string; subtitle: string; inverse?: boolean }> = ({ title, subtitle, inverse }) => (
  <div className={`border-b-4 pb-2 mb-16 flex flex-col md:flex-row justify-between items-end ${inverse ? 'border-daez-paper' : 'border-daez-ink'}`}>
    <h2 className={`text-6xl md:text-9xl font-display uppercase tracking-tighter leading-[0.8] filter-ink ${inverse ? 'text-daez-paper' : 'text-daez-ink'}`}>
      {title}
    </h2>
    <span className="font-mono text-daez-blood text-sm md:text-base mb-2 font-bold uppercase tracking-widest">
      No. {Math.floor(Math.random() * 9999)} // {subtitle}
    </span>
  </div>
);

import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { Link } from 'react-router-dom';
import { translations, Language } from '../translations';
import { CSSParticlesBackground } from './CSSParticlesBackground';

interface HeroProps {
  language: Language;
}

const Hero: React.FC<HeroProps> = ({ language }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState<number>(0);
  const [isMetadataLoaded, setIsMetadataLoaded] = useState<boolean>(false);

  const t = translations[language].hero;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setIsMetadataLoaded(true);
    }
  };

  // Sync scroll progress directly to video playhead
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (videoRef.current && isMetadataLoaded && duration > 0) {
      const targetTime = latest * duration;
      const safeTime = Math.min(Math.max(targetTime, 0), duration - 0.02);
      videoRef.current.currentTime = safeTime;
    }
  });

  // Check if video is already ready on mount (cached asset)
  useEffect(() => {
    if (videoRef.current && videoRef.current.readyState >= 1) {
      setDuration(videoRef.current.duration);
      setIsMetadataLoaded(true);
    }
  }, []);

  // Title scaling and fading overlay
  const scale = useTransform(scrollYProgress, [0, 0.45], [1.0, 15.0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.35, 0.45], [1.0, 1.0, 0.0]);

  // Content (desc copy + buttons) fade-in and slide-up overlay
  const contentOpacity = useTransform(scrollYProgress, [0.22, 0.38, 0.8, 0.95], [0.0, 1.0, 1.0, 0.0]);
  const contentY = useTransform(scrollYProgress, [0.22, 0.38], [50, 0]);

  // Stamp / rated badge opacity
  const stampOpacity = useTransform(scrollYProgress, [0.15, 0.3, 0.85, 0.95], [0.0, 0.7, 0.7, 0.0]);

  return (
    <section 
      ref={containerRef} 
      id="hero" 
      className="relative w-full h-[300vh] bg-aiwass-bg border-b-4 border-aiwass-text"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center">
        
        {/* CSS Particles Background */}
        <CSSParticlesBackground />

        {/* Local Video Element */}
        <video
          ref={videoRef}
          src="/assets/hero.mp4"
          preload="auto"
          playsInline
          muted
          controls={false}
          className="absolute inset-0 w-full h-full object-cover z-0 grayscale contrast-125"
          onLoadedMetadata={handleLoadedMetadata}
        />

        {/* Fallback image if video metadata is not ready */}
        {!isMetadataLoaded && (
          <img
            src="/assets/hero-emavisual.webp"
            alt="Emanuel Parra"
            className="absolute inset-0 w-full h-full object-cover z-0 grayscale contrast-125 opacity-70"
          />
        )}

        {/* Color Gradient Overlay for Halftone and cinematic print look */}
        <div className="absolute inset-0 bg-gradient-to-tr from-aiwass-purple to-aiwass-red mix-blend-screen opacity-35 z-10 pointer-events-none"></div>

        {/* Halftone dots texture overlay */}
        <div className="absolute inset-0 bg-[size:4px_4px] bg-halftone-sm opacity-15 mix-blend-overlay pointer-events-none z-10"></div>

        {/* Mix Blend Difference Zooming Title Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none mix-blend-difference overflow-hidden">
          <motion.h1 
            style={{ scale, opacity: titleOpacity }}
            className="font-display text-[12vw] md:text-[14vw] text-white font-black uppercase text-center tracking-tighter leading-none whitespace-nowrap filter-ink"
          >
            AIWASS STUDIO
          </motion.h1>
        </div>

        {/* Cinematic Manifesto Content Overlay */}
        <motion.div 
          style={{ opacity: contentOpacity, y: contentY }}
          className="absolute inset-0 z-30 flex flex-col justify-center items-center text-center px-6 pointer-events-none select-none max-w-4xl mx-auto"
        >
          {/* Top credit */}
          <div className="font-mono text-xs md:text-sm font-bold tracking-widest text-aiwass-text opacity-70 uppercase mb-4">
            {t.topText}
          </div>

          {/* Subtitle */}
          <div className="font-mono text-sm md:text-lg font-bold tracking-widest text-aiwass-red uppercase mb-6">
            {t.subtitle}
          </div>

          {/* Manifesto description */}
          <p className="text-xl md:text-3xl font-serif text-aiwass-text/90 leading-relaxed font-light mb-12 max-w-3xl">
            {t.description}
          </p>

          {/* CTA Buttons - Enable pointer events to let users click them */}
          <div className="flex flex-col sm:flex-row gap-6 items-center justify-center pointer-events-auto">
            {/* Showreel Button */}
            <div className="group relative inline-block">
              <div className="absolute inset-0 bg-aiwass-text transform translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform"></div>
              <Link
                to="/work"
                className="relative block bg-aiwass-bg border-2 border-aiwass-text text-aiwass-text font-display text-xl md:text-3xl px-8 py-3 uppercase tracking-wide hover:bg-aiwass-purple hover:text-white hover:border-aiwass-purple transition-colors duration-200 cursor-none"
              >
                {t.btnShowreel}
              </Link>
            </div>

            {/* Contact Button */}
            <div className="group relative inline-block">
              <div className="absolute inset-0 bg-aiwass-red transform translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform"></div>
              <Link
                to="/contact"
                className="relative block bg-aiwass-bg border-2 border-aiwass-red text-aiwass-red font-display text-xl md:text-3xl px-8 py-3 uppercase tracking-wide hover:bg-aiwass-red hover:text-white hover:border-aiwass-red transition-colors duration-200 cursor-none"
              >
                {t.btnContact}
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Rating Stamp in Bottom Left */}
        <motion.div 
          style={{ opacity: stampOpacity }}
          className="absolute bottom-8 left-8 hidden md:block border-2 border-aiwass-text p-2 rotate-1 text-aiwass-text z-30 pointer-events-none"
        >
          <div className="font-display text-2xl leading-none">{t.ratedR}</div>
          <div className="font-mono text-[10px] leading-none text-center mt-1">{t.restricted}</div>
          <div className="font-mono text-[8px] leading-tight text-center mt-1 whitespace-pre-line">{t.ratedDesc}</div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Services from '../components/Services';
import Brands from '../components/Brands';
import Skills from '../components/Skills';
import Work from '../components/Work';
import About from '../components/About';
import { InstagramFeed } from '../components/InstagramFeed';
import Contact from '../components/Contact';
import { translations, Language } from '../translations';

gsap.registerPlugin(ScrollTrigger);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    }
  }
};

const letterVariants = {
  hidden: (i: number) => ({
    opacity: 0, 
    y: 90,
    scaleY: 2.2,
    scaleX: 0.75,
    skewX: i % 2 === 0 ? -25 : 25,
    rotate: i % 2 === 0 ? 12 : -12
  }),
  visible: { 
    opacity: 1, 
    y: 0,
    scaleY: 1,
    scaleX: 1,
    skewX: 0,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 140,
      damping: 11
    }
  }
};

export function Hero({ language }: { language: Language }) {
  const t = translations[language].hero;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Frame sequence calculation
  const totalFrames = 179;
  const getFramePath = (index: number) => {
    const paddedIndex = String(index).padStart(5, '0');
    return `/hero-frames/Hero_${paddedIndex}.jpg`;
  };

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    // Preload images into browser cache to prevent flickering
    for (let i = 0; i < totalFrames; i++) {
      const preloadImg = new Image();
      preloadImg.src = getFramePath(i);
    }

    let tl: gsap.core.Timeline | null = null;

    const initScrollTrigger = () => {
      if (tl) return;

      tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "+=250%",  // Physical scroll height space (pin length)
          pin: true,      // Lock viewport to run animation
          scrub: true,    // Direct sync with scroll position
          onUpdate: (self) => {
            // Sync frame synchronously on scroll, matching original video.currentTime logic
            const activeFrame = Math.round(self.progress * (totalFrames - 1));
            img.src = getFramePath(activeFrame);
          }
        }
      });

      // Fade out text block on scroll (identical to original)
      tl.to(
        contentRef.current,
        { y: -60, opacity: 0, ease: "power1.out" },
        0
      );

      // Force ScrollTrigger to refresh and recalculate layout positions
      ScrollTrigger.refresh();
    };

    // Wait for the first image to be loaded (complete or onload), matching loadedmetadata logic
    const firstImgPath = getFramePath(0);
    const testImg = new Image();
    testImg.src = firstImgPath;
    
    if (testImg.complete) {
      initScrollTrigger();
    } else {
      testImg.onload = initScrollTrigger;
      testImg.onerror = initScrollTrigger; // fallback if image fails to load
    }

    // Refresh after a slight delay to ensure all other components (like InstagramFeed) have finished rendering
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(refreshTimer);
      if (tl) {
        tl.kill();
        if (tl.scrollTrigger) tl.scrollTrigger.kill();
      }
    };
  }, []);

  return (
    <div ref={wrapperRef} id="hero" className="relative w-full h-screen bg-[#0A0A0A] p-2 md:p-3 flex flex-col overflow-visible">
      <section className="relative w-full h-full bg-[#0A0A0A] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden flex items-center shadow-2xl border border-[#3F04BF]/30">
        
        {/* El archivo de imagen secuencial de Aiwass Studio */}
        <img 
          ref={imgRef}
          src="/hero-frames/Hero_00000.jpg"
          alt="Hero animation frame"
          className="absolute inset-0 z-0 w-full h-full object-cover opacity-100"
        />

        {/* Capa de Información del Hero */}
        <div ref={contentRef} className="relative flex flex-col items-start text-left max-w-2xl justify-center h-full pl-6 md:pl-16 z-10 w-full md:w-3/5 pointer-events-none">
          <motion.h1 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="font-display text-7xl md:text-9xl uppercase tracking-tighter text-[#F2EFE9] leading-[0.9] drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] mb-4 filter-ink flex flex-wrap pointer-events-auto cursor-none select-none"
          >
            {t.hero_title.split(" ").map((word, wordIdx) => (
              <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.2em]">
                {Array.from(word).map((char, charIdx) => {
                  const globalIdx = wordIdx * 10 + charIdx;
                  return (
                    <motion.span
                      key={charIdx}
                      custom={globalIdx}
                      variants={letterVariants}
                      whileHover={{
                        scaleY: 1.18,
                        scaleX: 1.22,
                        rotate: [0, -10, 8, -4, 0],
                        y: -15,
                        transition: {
                          duration: 0.4,
                          ease: "easeOut"
                        }
                      }}
                      className="inline-block origin-bottom"
                    >
                      {char}
                    </motion.span>
                  );
                })}
              </span>
            ))}
          </motion.h1>
          <p className="font-mono text-xs md:text-sm text-[#F21B42] tracking-[0.3em] uppercase mb-6">
            {t.hero_subtitle}
          </p>
          <p className="font-serif text-base md:text-lg text-[#F2EFE9]/90 max-w-xl leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            {t.hero_tagline}
          </p>
        </div>
      </section>
    </div>
  );
}

interface HomeProps {
  language: Language;
}

export const Home: React.FC<HomeProps> = ({ language }) => {
  return (
    <div className="w-full bg-[#0A0A0A] overflow-x-hidden">
      <Hero language={language} />

      <div className="relative z-20 bg-[#0A0A0A] -mt-[2px]">
        {/* Clients Logo Carousel */}
        <Brands language={language} />

        <Services language={language} />

        {/* Creative & Technical Skills */}
        <Skills language={language} />

        {/* Projects Portfolio Billboard */}
        <Work language={language} />

        {/* Manifesto Section */}
        <About language={language} />

        {/* Live Instagram Feed */}
        <InstagramFeed language={language} beholdFeedId="K4eRhAkoVQhUKDsc4Tr2" />

        {/* Advanced Casting Call Form */}
        <Contact language={language} />
      </div>
    </div>
  );
};

export default Home;

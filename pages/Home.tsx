import React, { useEffect, useRef, useState } from "react";
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [videoPreload, setVideoPreload] = useState<'none' | 'auto'>('none');

  useEffect(() => {
    // IntersectionObserver to lazy load the video
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVideoPreload('auto');
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
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
            const video = videoRef.current;
            if (video && video.duration) {
              const targetTime = self.progress * video.duration;
              // Safe time bounding to prevent flicker
              video.currentTime = Math.min(Math.max(targetTime, 0), video.duration - 0.02);
            }
          }
        }
      });

      // Fade out text block on scroll
      tl.to(
        contentRef.current,
        { y: -60, opacity: 0, ease: "power1.out" },
        0
      );

      ScrollTrigger.refresh();
    };

    initScrollTrigger();

    // Refresh after a slight delay to ensure correct heights
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(refreshTimer);
      observer.disconnect();
      if (tl) {
        tl.kill();
        if (tl.scrollTrigger) tl.scrollTrigger.kill();
      }
    };
  }, []);

  return (
    <div ref={wrapperRef} id="hero" className="relative w-full h-screen bg-[#0A0A0A] p-2 md:p-3 flex flex-col overflow-visible">
      <section className="relative w-full h-full bg-[#0A0A0A] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden flex items-center shadow-2xl border border-[#3F04BF]/30">
        
        {/* Local Video Element */}
        <video
          ref={videoRef}
          src="/assets/hero.mp4"
          preload={videoPreload}
          playsInline
          muted
          autoPlay
          controls={false}
          className="absolute inset-0 z-0 w-full h-full object-cover opacity-100 grayscale contrast-125"
        />

        {/* Fallback image if video is not preloaded */}
        {videoPreload === 'none' && (
          <img
            src="/assets/hero-emavisual.webp"
            alt="Hero fallback background"
            className="absolute inset-0 z-0 w-full h-full object-cover grayscale contrast-125 opacity-70"
          />
        )}

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

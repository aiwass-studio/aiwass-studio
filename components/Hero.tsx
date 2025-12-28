import React, { useEffect, useState } from 'react';
import { translations, Language } from '../translations';

interface HeroProps {
  language: Language;
}

const Hero: React.FC<HeroProps> = ({ language }) => {
  const [offset, setOffset] = useState(0);
  const t = translations[language].hero;

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="hero" className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden bg-daez-paper border-b-4 border-daez-ink">

      {/* Background Poster Image - The "Red Face" Vibe (Now Green) */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          {/* The Image treated with mix-blend-multiply to sit ON the paper */}
          <img
            src="/assets/hero-emavisual.png"
            alt="Emanuel Parra"
            className="absolute inset-0 w-full h-full object-cover object-[75%_center] md:object-center mix-blend-multiply filter contrast-[1.2] brightness-90 grayscale"
            style={{
              opacity: 0.8,
              transform: `scale(${1 + offset * 0.0002})`
            }}
          />
          {/* Green Overlay (daez-blood is now green) */}
          <div className="absolute inset-0 bg-daez-blood mix-blend-lighten opacity-60"></div>

          {/* Halftone Texture Overlay */}
          <div className="absolute inset-0 bg-[size:4px_4px] bg-halftone-sm opacity-20 mix-blend-overlay"></div>
        </div>
      </div>

      {/* Top production credit - CENTERED and aligned with nav */}
      <div className="absolute top-12 left-0 right-0 z-10 pt-6 px-4 hidden lg:block">
        <div className="font-mono text-xs md:text-sm font-bold tracking-widest text-daez-ink opacity-70 text-center">
          {t.topText}
        </div>
      </div>

      {/* Main Typography - Styled like a vintage movie poster title */}
      <div className="relative z-10 w-full px-4 md:px-12 mt-20 md:mt-0 text-left">
        {/* Title and subtitle - LEFT ALIGNED */}
        <div className="max-w-2xl relative">


          <h1 className="font-display text-[12vw] md:text-[8vw] leading-[0.85] tracking-tighter text-daez-ink mix-blend-multiply filter-ink select-none mb-4">
            {t.mainTitle1}
            <span className="block text-daez-blood">{t.mainTitle2}</span>
          </h1>

          <div className="mt-8 font-mono text-sm md:text-lg font-bold tracking-widest text-daez-charcoal uppercase">
            {t.subtitle}
          </div>
        </div>



        {/* Mobile buttons - keep in flow for mobile */}
        <div className="md:hidden mt-16 flex flex-col items-center justify-center">
          <div className="flex flex-col gap-4 items-center">
            <div className="group relative inline-block">
              <div className="absolute inset-0 bg-daez-ink transform translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform"></div>
              <a
                href="#work"
                className="relative block bg-daez-paper border-2 border-daez-ink text-daez-ink font-display text-xl px-8 py-3 uppercase tracking-wide hover:bg-daez-blood hover:text-daez-ink hover:border-daez-blood transition-colors duration-200"
              >
                {t.btnShowreel}
              </a>
            </div>

            <div className="group relative inline-block">
              <div className="absolute inset-0 bg-daez-blood transform translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform"></div>
              <a
                href="#contact"
                className="relative block bg-daez-paper border-2 border-daez-blood text-daez-blood font-display text-xl px-8 py-3 uppercase tracking-wide hover:bg-daez-blood hover:text-daez-ink transition-colors duration-200"
              >
                {t.btnContact}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons - aligned with RATED R box vertically, centered horizontally */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block z-20">
        <div className="flex flex-row gap-4 items-center">
          <div className="group relative inline-block">
            <div className="absolute inset-0 bg-daez-ink transform translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform"></div>
            <a
              href="#work"
              className="relative block bg-daez-paper border-2 border-daez-ink text-daez-ink font-display text-xl md:text-3xl px-8 py-3 uppercase tracking-wide hover:bg-daez-blood hover:text-daez-ink hover:border-daez-blood transition-colors duration-200"
            >
              {t.btnShowreel}
            </a>
          </div>

          <div className="group relative inline-block">
            <div className="absolute inset-0 bg-daez-blood transform translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform"></div>
            <a
              href="#contact"
              className="relative block bg-daez-paper border-2 border-daez-blood text-daez-blood font-display text-xl md:text-3xl px-8 py-3 uppercase tracking-wide hover:bg-daez-blood hover:text-daez-ink transition-colors duration-200"
            >
              {t.btnContact}
            </a>
          </div>
        </div>
      </div>

      {/* Footer / Rating Stamp */}
      <div className="absolute bottom-8 left-8 hidden md:block border-2 border-daez-ink p-2 rotate-1 mix-blend-multiply opacity-70">
        <div className="font-display text-2xl leading-none">{t.ratedR}</div>
        <div className="font-mono text-[10px] leading-none text-center mt-1">{t.restricted}</div>
        <div className="font-mono text-[8px] leading-tight text-center mt-1 whitespace-pre-line">{t.ratedDesc}</div>
      </div>
    </section>
  );
};

export default Hero;
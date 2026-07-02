import React from 'react';
import { motion } from 'framer-motion';
import { translations, Language } from '../translations';

interface AboutPageProps {
  language: Language;
}

export const AboutPage: React.FC<AboutPageProps> = ({ language }) => {
  const t = translations[language];
  const isEs = language === 'es';
  const isIt = language === 'it';

  // Framer Motion animation configurations
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.2
      }
    },
    viewport: { once: true }
  };

  return (
    <div className="w-full min-h-screen bg-[#0A0A0A] pt-32 pb-24 px-4 md:px-12 text-[#F2EFE9] font-serif relative overflow-hidden">
      {/* Decorative background grid and halftone textures */}
      <div className="absolute inset-0 bg-[size:24px_24px] bg-halftone-lg opacity-5 pointer-events-none"></div>
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#3F04BF]/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#F21B42]/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Header Section */}
        <div className="border-b border-[#F2EFE9]/25 pb-8 mb-20 flex flex-col md:flex-row justify-between items-end gap-4">
          <h1 className="text-5xl md:text-8xl font-display uppercase tracking-tighter leading-none filter-ink text-[#F2EFE9]">
            {t.about_title}
          </h1>
          <span className="font-mono text-[#F21B42] text-xs md:text-sm font-bold uppercase tracking-widest border border-[#F21B42]/30 px-3 py-1">
            // {isEs ? 'MANIFIESTO E HISTORIA TÉCNICA' : isIt ? 'MANIFESTO E STORIA TECNICA' : 'TECHNICAL MANIFESTO & SYSTEM ARCHIVE'}
          </span>
        </div>

        {/* Section 01: El Arquetipo / Declaración de Intenciones */}
        <motion.section 
          {...fadeInUp}
          className="relative w-full border-2 border-[#3F04BF] bg-black p-8 md:p-16 mb-32 overflow-hidden group hover:border-[#F21B42] transition-colors duration-300"
        >
          {/* Asymmetric Halftone Badge */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-halftone-sm opacity-10 pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            <div className="lg:col-span-7 space-y-6">
              <span className="font-mono text-xs text-[#F21B42] tracking-widest uppercase block">// {t.about_title} // ARCHIVE_00</span>
              <h2 className="font-display text-4xl md:text-7xl uppercase tracking-tighter text-[#F2EFE9] leading-[0.95] filter-ink">
                {t.about_hero_title}
              </h2>
              <div className="w-20 h-[3px] bg-[#3F04BF] group-hover:bg-[#F21B42] transition-colors duration-300"></div>
              <p className="text-xl md:text-2xl text-[#F2EFE9]/90 font-serif leading-relaxed max-w-3xl border-l-4 border-[#3F04BF] pl-6 group-hover:border-[#F21B42] transition-colors duration-300">
                {t.about_hero_tagline}
              </p>
            </div>
            
            <div className="lg:col-span-5 flex justify-center w-full">
              <div className="relative w-full max-w-[340px] aspect-[3/4] border-2 border-[#3F04BF] group-hover:border-[#F21B42] transition-colors duration-300 overflow-hidden bg-black p-2.5 shadow-2xl">
                {/* Decorative retro marks */}
                <div className="absolute top-1 left-2.5 font-mono text-[8px] text-[#3F04BF]/70 group-hover:text-[#F21B42]/70 transition-colors z-20">SYS.SRC // EMA_PORTRAIT.RAW</div>
                <div className="absolute bottom-1 right-2.5 font-mono text-[8px] text-[#3F04BF]/70 group-hover:text-[#F21B42]/70 transition-colors z-20">[ AIWASS STUDIO ]</div>
                <div className="w-full h-full overflow-hidden relative">
                  <img 
                    src="/assets/about/about-studio.jpg" 
                    alt="Ema Craist // Aiwass Studio" 
                    className="w-full h-full object-cover filter contrast-125 brightness-95 grayscale hover:grayscale-0 transition-all duration-750 ease-out transform scale-105 hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 pointer-events-none"></div>
                  <div className="absolute inset-0 bg-[size:16px_16px] bg-halftone-sm opacity-5 pointer-events-none"></div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section 02: La Cronología / De la Tinta al Código */}
        <motion.section 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-32 mb-32"
        >
          {/* Header Title */}
          <div className="w-full border-b border-[#3F04BF]/30 pb-4">
            <h3 className="font-mono text-sm uppercase tracking-widest text-[#3F04BF] font-bold">
              // {t.about_bio_title}
            </h3>
          </div>

          {/* Phase 01: Analog Origin */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-36">
              <div className="flex items-center gap-4">
                <span className="font-mono text-5xl md:text-7xl text-[#3F04BF] font-bold">01</span>
                <div className="h-[2px] bg-[#3F04BF]/30 flex-grow"></div>
              </div>
              <span className="font-mono text-xs text-[#F21B42] tracking-widest uppercase block">
                [ PHASE 01 // ANALOG ORIGIN — 2018 ]
              </span>
              <h4 className="font-display text-4xl md:text-6xl uppercase tracking-tighter leading-none text-[#F2EFE9] filter-ink">
                {isEs ? 'TINTA Y PRESIÓN' : isIt ? 'INCHIOSTRO E PRESSIONE' : 'INK & PRESSURE'}
              </h4>
              <p className="text-lg text-[#F2EFE9]/85 leading-relaxed font-serif uppercase tracking-wide border-l-2 border-[#3F04BF] pl-6">
                {t.about_bio_p1}
              </p>
              <div className="font-mono text-[10px] text-[#A0A0A0]/70 space-y-1">
                <div>// RAW TOOLS: MANUAL SCREEN PRESS / TEXTILE INKS</div>
                <div>// INFLUENCES: PUNK ROCK / DIY ZINES / ALTERNATIVE BEATS</div>
              </div>
            </div>

            {/* Right Media Section */}
            <div className="lg:col-span-7 flex flex-col md:flex-row gap-6 items-start">
              
              {/* Left Media Block: Stamping Video (Vertical - aspect-[9/16]) */}
              <div className="w-full md:w-5/12 flex-shrink-0 relative aspect-[9/16] border-2 border-[#3F04BF] hover:border-[#F21B42] bg-[#0A0A0A] p-2.5 shadow-2xl transition-colors duration-500 group/vid flex flex-col justify-between">
                {/* Decorative retro marks */}
                <div className="absolute top-1.5 left-3 font-mono text-[8px] text-[#3F04BF]/70 group-hover:text-[#F21B42]/70 transition-colors z-20">SYS.SRC // BEGINNINGS_CLIP.RAW</div>
                <div className="absolute top-1.5 right-3 font-mono text-[7px] bg-[#3F04BF]/20 px-1 py-0.5 text-[#F2EFE9]/80 border border-[#3F04BF]/30 tracking-widest z-20">MUTED</div>
                
                <div className="w-full h-full overflow-hidden relative border border-[#3F04BF]/20">
                  <video
                    src="/assets/about/about-beginnings.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover filter contrast-125 brightness-90 grayscale hover:grayscale-0 transition-all duration-750 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 pointer-events-none"></div>
                  <div className="absolute inset-0 bg-[size:16px_16px] bg-halftone-sm opacity-5 pointer-events-none"></div>
                </div>
                
                <div className="absolute bottom-1.5 left-3 font-mono text-[8px] text-[#3F04BF]/70 group-hover:text-[#F21B42]/70 transition-colors z-20">// PHYSICAL_STAMP_2018</div>
              </div>

              {/* Right Media Block: Drumming Photos Stack (2 Cinematic - aspect-video stacked) */}
              <div className="w-full md:w-7/12 flex flex-col gap-6">
                {/* Drum Image 1 */}
                <div className="relative aspect-video border-2 border-[#3F04BF] hover:border-[#F21B42] bg-[#0A0A0A] p-2 shadow-2xl transition-colors duration-500 group/img1">
                  <div className="absolute top-1 left-2 font-mono text-[8px] text-[#3F04BF]/70 group-hover:text-[#F21B42]/70 z-20">// STAGE_SESSION.RAW</div>
                  <div className="w-full h-full overflow-hidden relative border border-[#3F04BF]/20">
                    <img 
                      src="/assets/about/about-analog-1.jpg" 
                      alt="Ema Craist drumming live" 
                      className="w-full h-full object-cover filter grayscale contrast-120 brightness-95 hover:grayscale-0 transition-all duration-750 ease-out hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none"></div>
                    <span className="absolute bottom-1.5 left-3 font-mono text-[8px] text-[#F2EFE9]/85">
                      // PHYSICAL_DRUMS_STAGE_2018.JPG
                    </span>
                  </div>
                </div>
                
                {/* Drum Image 2 */}
                <div className="relative aspect-video border-2 border-[#3F04BF] hover:border-[#F21B42] bg-[#0A0A0A] p-2 shadow-2xl transition-colors duration-500 group/img2">
                  <div className="absolute top-1 left-2 font-mono text-[8px] text-[#3F04BF]/70 group-hover:text-[#F21B42]/70 z-20">// REHEARSAL_SESSION.RAW</div>
                  <div className="w-full h-full overflow-hidden relative border border-[#3F04BF]/20">
                    <img 
                      src="/assets/about/about-analog-2.jpg" 
                      alt="Ema Craist drumming rehearsal" 
                      className="w-full h-full object-cover filter grayscale contrast-120 brightness-95 hover:grayscale-0 transition-all duration-750 ease-out hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none"></div>
                    <span className="absolute bottom-1.5 left-3 font-mono text-[8px] text-[#F2EFE9]/85">
                      // PHYSICAL_DRUMS_STUDIO_2018.JPG
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Phase 02: Digital Evolution */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-16 border-t border-[#3F04BF]/10">
            {/* Left Media (Code Terminal) */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="border-2 border-[#3F04BF] bg-black/90 font-mono text-xs md:text-sm p-6 shadow-2xl relative overflow-hidden group/terminal hover:border-[#F21B42] transition-colors duration-500">
                <div className="flex items-center justify-between border-b border-[#3F04BF]/20 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#F21B42]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#3F04BF]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
                  </div>
                  <span className="text-[10px] text-[#A0A0A0] tracking-wider">// AIWASS_ENGINE.TSX</span>
                </div>
                
                <div className="space-y-1.5 text-left select-none text-[#F2EFE9]/85 font-mono leading-relaxed overflow-x-auto">
                  <div className="flex"><span className="text-[#3F04BF]/40 mr-4 select-none w-6">01</span><span className="text-[#F21B42]">import</span><span> {'{ motion, AnimatePresence }'} </span><span className="text-[#F21B42]">from</span> <span className="text-emerald-400">'framer-motion'</span><span>;</span></div>
                  <div className="flex"><span className="text-[#3F04BF]/40 mr-4 select-none w-6">02</span><span className="text-[#F21B42]">import</span><span> {'{ useDesignSystem }'} </span><span className="text-[#F21B42]">from</span> <span className="text-emerald-400">'@aiwass/core'</span><span>;</span></div>
                  <div className="flex"><span className="text-[#3F04BF]/40 mr-4 select-none w-6">03</span><span className="text-gray-500">// Initialize high-fidelity canvas system</span></div>
                  <div className="flex"><span className="text-[#3F04BF]/40 mr-4 select-none w-6">04</span><span className="text-[#F21B42]">export const</span> <span className="text-[#3F04BF] font-bold">DigitalCraft</span> <span>= () =&gt; {'{'}</span></div>
                  <div className="flex"><span className="text-[#3F04BF]/40 mr-4 select-none w-6">05</span><span className="text-[#F21B42] ml-6">const</span> <span>{'{ tokens }'} = </span><span className="text-[#3F04BF]">useDesignSystem</span><span>();</span></div>
                  <div className="flex"><span className="text-[#3F04BF]/40 mr-4 select-none w-6">06</span><span className="text-[#F21B42] ml-6">return</span> <span>(</span></div>
                  <div className="flex"><span className="text-[#3F04BF]/40 mr-4 select-none w-6">07</span><span className="text-gray-500 ml-12">&lt;</span><span className="text-[#3F04BF]">motion.div</span> <span className="text-[#F21B42]">className</span><span>=</span><span className="text-emerald-400">"cyber-matrix"</span></div>
                  <div className="flex"><span className="text-[#3F04BF]/40 mr-4 select-none w-6">08</span><span className="text-[#F21B42] ml-12">animate</span><span>={`{{ opacity: 1, filter: "blur(0px)" }}`}</span></div>
                  <div className="flex"><span className="text-[#3F04BF]/40 mr-4 select-none w-6">09</span><span className="text-[#F21B42] ml-12">transition</span><span>={`{{ ease: [0.23, 1, 0.32, 1] }}`}</span></div>
                  <div className="flex"><span className="text-[#3F04BF]/40 mr-4 select-none w-6">10</span><span className="text-gray-500 ml-12">/&gt;</span></div>
                  <div className="flex"><span className="text-[#3F04BF]/40 mr-4 select-none w-6">11</span><span className="text-gray-500 ml-6">);</span></div>
                  <div className="flex"><span className="text-[#3F04BF]/40 mr-4 select-none w-6">12</span><span>{'};'}</span></div>
                </div>

                {/* Glitch filter effect */}
                <div className="absolute inset-0 bg-scanlines opacity-[0.04] pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-[#3F04BF]/5 via-transparent to-transparent opacity-0 group-hover/terminal:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-5 order-1 lg:order-2 space-y-6 lg:sticky lg:top-36">
              <div className="flex items-center gap-4">
                <span className="font-mono text-5xl md:text-7xl text-[#3F04BF] font-bold">02</span>
                <div className="h-[2px] bg-[#3F04BF]/30 flex-grow"></div>
              </div>
              <span className="font-mono text-xs text-[#F21B42] tracking-widest uppercase block">
                [ PHASE 02 // DIGITAL ARCHITECTURE — 2020 // 2026 ]
              </span>
              <h4 className="font-display text-4xl md:text-6xl uppercase tracking-tighter leading-none text-[#F2EFE9] filter-ink">
                {isEs ? 'ARQUITECTURA Y CÓDIGO' : isIt ? 'ARCHITETTURA E CODICE' : 'ARCHITECTURE & CODE'}
              </h4>
              <p className="text-lg text-[#F2EFE9]/85 leading-relaxed font-serif uppercase tracking-wide border-l-2 border-[#3F04BF] pl-6">
                {t.about_bio_p2}
              </p>
              <div className="font-mono text-[10px] text-[#A0A0A0]/70 space-y-1">
                <div>// DIGITAL SYSTEM: REACT / VITE / TAILWIND / MOTION</div>
                <div>// INFRASTRUCTURE: AUTOMATED PIPELINES / CUSTOM FRAMEWORKS</div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section 03: Alquimia Técnica (Filosofía de Trabajo) */}
        <motion.section 
          {...fadeInUp}
          className="relative w-full border-2 border-[#3F04BF] bg-black p-8 md:p-16 mb-16 overflow-hidden group hover:border-[#F21B42] transition-colors duration-300"
        >
          {/* Subtle distress border effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#3F04BF]/5 via-transparent to-[#F21B42]/5 pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start justify-between">
            <div className="max-w-md">
              <span className="font-mono text-xs text-[#3F04BF] group-hover:text-[#F21B42] transition-colors font-bold block mb-3">// WORK PHILOSOPHY</span>
              <h3 className="font-display text-4xl md:text-6xl uppercase tracking-tighter text-[#F2EFE9] filter-ink">
                {t.about_philosophy_title}
              </h3>
            </div>
            
            <div className="max-w-2xl border-t-2 md:border-t-0 md:border-l-2 border-[#3F04BF]/20 md:pl-8 pt-6 md:pt-0">
              <p className="text-base md:text-lg text-[#F2EFE9]/75 font-mono leading-relaxed uppercase">
                {t.about_philosophy_body}
              </p>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
};

export default AboutPage;

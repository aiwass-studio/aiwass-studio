import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { CustomCursor, NoiseOverlay, StickyCTA } from './components/UI';
import Preloader from './components/Preloader';
import Hero from './components/Hero';
import Services from './components/Services';
import Brands from './components/Brands';
import Skills from './components/Skills';
import Work from './components/Work';
import About from './components/About';
import Contact from './components/Contact';
import { translations, Language } from './translations';

function App() {
  const [loading, setLoading] = React.useState(true);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [language, setLanguage] = React.useState<Language>('es');

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  const t = translations[language];

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" onLoadComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <div className="relative min-h-screen bg-daez-paper text-daez-ink overflow-x-hidden selection:bg-daez-blood selection:text-white">
          {/* Atmosphere & Utilities */}
          <CustomCursor />
          <NoiseOverlay />
          <StickyCTA language={language} />

          {/* Top Marquee */}
          <div className="fixed top-0 left-0 w-full z-50 bg-daez-ink text-daez-paper py-2 overflow-hidden border-b-2 border-daez-blood">
            <div className="flex whitespace-nowrap animate-marquee">
              <span className="font-mono text-xs font-bold tracking-widest px-4">
                UNA PRODUCCIÓN DE EMA VISUAL • EN TECHNICOLOR • DISEÑO VISCERAL • CÓDIGO LIMPIO • RATED R •
                UNA PRODUCCIÓN DE EMA VISUAL • EN TECHNICOLOR • DISEÑO VISCERAL • CÓDIGO LIMPIO • RATED R •
                UNA PRODUCCIÓN DE EMA VISUAL • EN TECHNICOLOR • DISEÑO VISCERAL • CÓDIGO LIMPIO • RATED R •
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="fixed top-[34px] lg:top-12 left-0 w-full z-40 px-6 py-6 flex justify-between items-center pointer-events-none">
            {/* Backdrop blur only on mobile, positioned flush with black strip */}
            <div className="absolute inset-0 bg-daez-paper/80 backdrop-blur-sm -z-10 lg:hidden"></div>
            <div className="pointer-events-auto cursor-none z-50">
              <img src="/assets/Ema-logo.svg" alt="EMA" className="h-10 w-auto" />
            </div>

            <div className="flex items-center gap-4 pointer-events-auto">
              {/* Language Switcher */}
              <div className="flex items-center gap-2">
                <span className={`font-mono text-xs uppercase ${language === 'es' ? 'text-daez-blood font-bold' : 'text-daez-ink/50'}`}>
                  ES
                </span>
                <button
                  onClick={toggleLanguage}
                  className="relative w-12 h-6 bg-daez-ink/20 rounded-full cursor-none transition-colors hover:bg-daez-ink/30"
                >
                  <div className={`absolute top-1 w-4 h-4 bg-daez-blood rounded-full transition-all duration-300 ${language === 'es' ? 'left-1' : 'left-7'}`}></div>
                </button>
                <span className={`font-mono text-xs uppercase ${language === 'en' ? 'text-daez-blood font-bold' : 'text-daez-ink/50'}`}>
                  EN
                </span>
              </div>

              {/* Hamburger Button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="cursor-none flex flex-col gap-1.5 p-2 group"
                aria-label="Menu"
              >
                <span className={`block w-8 h-0.5 bg-daez-ink transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block w-8 h-0.5 bg-daez-ink transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-8 h-0.5 bg-daez-ink transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </button>
            </div>
          </nav>

          {/* Menu Popup Overlay */}
          <div className={`fixed inset-0 z-50 transition-all duration-500 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            {/* Background overlay */}
            <div
              className="absolute inset-0 bg-daez-ink/95 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            ></div>

            {/* Menu Content */}
            <div className={`relative h-full flex flex-col items-center justify-center transition-transform duration-500 ${menuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
              {/* Close button */}
              <button
                onClick={() => setMenuOpen(false)}
                className="absolute top-24 right-8 cursor-none text-daez-paper hover:text-daez-blood transition-colors"
              >
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Menu Links */}
              <nav className="flex flex-col gap-6 text-center">
                <a
                  href="#hero"
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-4xl md:text-6xl uppercase text-daez-paper hover:text-daez-blood transition-colors cursor-none tracking-tighter"
                >
                  {t.nav.home}
                </a>
                <a
                  href="#about"
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-4xl md:text-6xl uppercase text-daez-paper hover:text-daez-blood transition-colors cursor-none tracking-tighter"
                >
                  {t.nav.about}
                </a>
                <a
                  href="#services"
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-4xl md:text-6xl uppercase text-daez-paper hover:text-daez-blood transition-colors cursor-none tracking-tighter"
                >
                  {t.nav.services}
                </a>
                <a
                  href="#work"
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-4xl md:text-6xl uppercase text-daez-paper hover:text-daez-blood transition-colors cursor-none tracking-tighter"
                >
                  {t.nav.projects}
                </a>
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-4xl md:text-6xl uppercase text-daez-paper hover:text-daez-blood transition-colors cursor-none tracking-tighter"
                >
                  {t.nav.contact}
                </a>
              </nav>

              {/* Decorative elements */}
              <div className="absolute bottom-8 font-mono text-xs text-daez-paper/50 uppercase tracking-widest">
                {t.menu.production}
              </div>
            </div>
          </div>

          {/* Main Content Flow */}
          <main className="relative z-10">
            <Hero language={language} />
            <Services language={language} />
            <Brands language={language} />
            <Skills language={language} />
            <Work language={language} />
            <About language={language} />
            <Contact language={language} />
          </main>
        </div>
      )}
    </>
  );
}

export default App;
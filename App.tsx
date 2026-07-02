import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { CustomCursor, NoiseOverlay, StickyCTA } from './components/UI';
import Preloader from './components/Preloader';
import Home from './pages/Home';
import WorkPage from './pages/WorkPage';
import PricingPage from './pages/PricingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LinksPage from './pages/LinksPage';
import Footer from './components/Footer';
import { translations, Language } from './translations';
import { AiwassLogo } from './components/AiwassLogo';

// Scroll to top on route transitions
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  (window as any).__language = language; // Sync assign during render to avoid lagging child hook states
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  const location = useLocation();
  const currentLanguage = language;
  const isEs = language === 'es';
  const t = translations[language];

  useEffect(() => {
    (window as any).__language = language;
    window.dispatchEvent(new Event('languagechange'));
  }, [language]);

  useEffect(() => {
    if (loading) return;

    // Observe #hero element if we are on the Home page
    const hero = document.getElementById('hero');
    if (!hero) {
      setIsHeroVisible(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, [loading, location.pathname]);

  const showScrolledLogo = location.pathname !== '/' || !isHeroVisible;

  const marqueeText = language === 'es'
    ? "AIWASS STUDIO • ESTÉTICA DISRUPTIVA • BRANDING • WEB DEV • APP DEVELOPMENT • SÓLO PARA MARCAS CON ACTITUD •"
    : language === 'it'
    ? "AIWASS STUDIO • ESTETICA DIROMPENTE • BRANDING • WEB DEV • APP DEVELOPMENT • SOLO PER MARCHI CON ATTITUDINE •"
    : "AIWASS STUDIO • DISRUPTIVE AESTHETICS • BRANDING • WEB DEV • APP DEVELOPMENT • ONLY FOR BRANDS WITH ATTITUDE •";

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" onLoadComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <div className="relative min-h-screen bg-aiwass-bg text-aiwass-text overflow-x-hidden selection:bg-aiwass-red selection:text-white flex flex-col justify-between">
          
          {/* Atmosphere & Utilities */}
          <CustomCursor />
          <NoiseOverlay />
          <StickyCTA language={language} />

          {/* Top Marquee */}
          <div className="fixed top-0 left-0 w-full z-50 bg-black text-aiwass-text py-2 overflow-hidden border-b-2 border-aiwass-purple">
            <div className="flex whitespace-nowrap animate-marquee">
              <span className="font-mono text-xs font-bold tracking-widest px-4">
                {marqueeText} {marqueeText} {marqueeText}
              </span>
            </div>
          </div>

          {/* Navigation Header */}
          <nav className="fixed top-[34px] lg:top-12 left-0 w-full z-40 px-6 py-6 flex justify-between items-center pointer-events-none">
            {/* Backdrop blur only on mobile */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm -z-10 lg:hidden"></div>

            {/* Logo Container wrapping AiwassLogo in Router Link */}
            <Link to="/" className="pointer-events-auto cursor-none z-50 relative h-10 flex items-center">
              <AiwassLogo 
                className={`h-10 w-auto transition-colors duration-300 ${showScrolledLogo ? 'text-aiwass-purple' : 'text-aiwass-text'} hover:text-aiwass-red`} 
              />
            </Link>

            <div className="flex items-center gap-4 pointer-events-auto">
              {/* Language Switcher (Brutalist Button Bar) */}
              <div className="flex items-center gap-3 border-2 border-[#3F04BF] p-1.5 bg-[#0A0A0A]">
                {[
                  { code: 'en', src: 'https://flagcdn.com/us.svg', alt: 'USA' },
                  { code: 'es', src: 'https://flagcdn.com/ve.svg', alt: 'Venezuela' },
                  { code: 'it', src: 'https://flagcdn.com/it.svg', alt: 'Italia' }
                ].map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`w-7 h-5 transition-all duration-150 border ${
                      currentLanguage === lang.code
                        ? 'border-[#F21B42] scale-110 shadow-[0_0_8px_#F21B42]'
                        : 'border-transparent opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img src={lang.src} alt={lang.alt} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Hamburger Button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="cursor-none flex flex-col gap-1.5 p-2 group z-50 relative"
                aria-label="Menu"
              >
                <span className={`block w-8 h-0.5 bg-aiwass-text transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block w-8 h-0.5 bg-aiwass-text transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-8 h-0.5 bg-aiwass-text transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </button>
            </div>
          </nav>

          {/* Menu Popup Overlay */}
          <div className={`fixed inset-0 z-50 transition-all duration-500 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            {/* Background overlay */}
            <div
              className="absolute inset-0 bg-black/95 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            ></div>

            {/* Menu Content */}
            <div className={`relative h-full flex flex-col items-center justify-center transition-transform duration-500 ${menuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
              {/* Menu Links */}
              <nav className="flex flex-col gap-6 text-center">
                <Link
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-4xl md:text-6xl uppercase text-aiwass-text hover:text-aiwass-purple transition-colors cursor-none tracking-tighter"
                >
                  {t.nav.home}
                </Link>
                <Link
                  to="/about"
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-4xl md:text-6xl uppercase text-aiwass-text hover:text-aiwass-purple transition-colors cursor-none tracking-tighter"
                >
                  {t.nav.about}
                </Link>
                <Link
                  to="/pricing"
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-4xl md:text-6xl uppercase text-aiwass-text hover:text-aiwass-purple transition-colors cursor-none tracking-tighter"
                >
                  {t.nav.pricing}
                </Link>
                <Link
                  to="/work"
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-4xl md:text-6xl uppercase text-aiwass-text hover:text-aiwass-purple transition-colors cursor-none tracking-tighter"
                >
                  {t.nav.work}
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-4xl md:text-6xl uppercase text-aiwass-text hover:text-aiwass-purple transition-colors cursor-none tracking-tighter"
                >
                  {t.nav.contact}
                </Link>
              </nav>

              {/* Decorative elements */}
              <div className="absolute bottom-8 font-mono text-xs text-aiwass-text/50 uppercase tracking-widest">
                {t.menu.production}
              </div>
            </div>
          </div>

          {/* Main Content Routing Flow */}
          <main className="relative z-10 flex-grow">
            <Routes>
              <Route path="/" element={<Home language={language} />} />
              <Route path="/work" element={<WorkPage language={language} />} />
              <Route path="/pricing" element={<PricingPage language={language} />} />
              <Route path="/about" element={<AboutPage language={language} />} />
              <Route path="/contact" element={<ContactPage language={language} />} />
              <Route path="/links" element={<LinksPage language={language} />} />
            </Routes>
          </main>

          {/* Persistent Global Footer */}
          <Footer language={language} />
        </div>
      )}
    </>
  );
}

export default App;
import React from 'react';
import { Link } from 'react-router-dom';
import { translations, Language } from '../translations';
import { AiwassLogo } from '../components/AiwassLogo';

interface LinksPageProps {
  language: Language;
}

export const LinksPage: React.FC<LinksPageProps> = ({ language }) => {
  const t = translations[language];

  const internalLinks = [
    { label: 'Casting Call', url: '/contact' },
    { label: 'Selected Manifestations', url: '/work' },
    { label: 'Pricing Architecture', url: '/pricing' }
  ];

  const externalLinks = [
    { label: 'Secure Support (WhatsApp)', url: 'https://wa.me/19453981995' },
    { label: 'Creative Archive (Behance)', url: 'https://www.behance.net/emavisual' }
  ];

  return (
    <div className="w-full min-h-screen bg-[#0A0A0A] text-[#F2EFE9] font-sans flex flex-col items-center px-4 pt-32 pb-12 overflow-x-hidden relative">
      {/* Background Halftone & Atmospheric Glows */}
      <div className="absolute inset-0 bg-[size:24px_24px] bg-halftone-lg opacity-5 pointer-events-none"></div>
      
      {/* Core Container */}
      <div className="w-full max-w-md flex flex-col items-center relative z-10 space-y-8">
        
        {/* Header Block */}
        <div className="w-full border-2 border-[#3F04BF] bg-black p-6 text-center space-y-4 shadow-[4px_4px_0px_#3F04BF]">
          {/* Logo compact */}
          <div className="flex justify-center mb-2">
            <AiwassLogo className="h-10 w-auto text-[#F2EFE9]" />
          </div>
          
          {/* Subheading / Tag */}
          <div className="font-mono text-xs text-[#F21B42] font-bold tracking-widest uppercase">
            [ ARCHIVE // LINKS ]
          </div>
          
          {/* Divider */}
          <div className="w-12 h-0.5 bg-[#3F04BF] mx-auto"></div>
          
          {/* short SEO description */}
          <p className="font-mono text-[10px] text-[#A0A0A0] uppercase tracking-wide leading-relaxed">
            {t.links_tagline}
          </p>
        </div>

        {/* Buttons List */}
        <div className="w-full flex flex-col items-center">
          
          {/* Internal links */}
          {internalLinks.map((link, idx) => (
            <Link
              key={idx}
              to={link.url}
              className="w-full max-w-md border-2 border-[#3F04BF] bg-[#0A0A0A] p-4 font-mono text-xs uppercase tracking-widest flex justify-between items-center transition-all duration-150 hover:bg-[#F21B42] hover:border-[#F21B42] hover:text-[#0A0A0A] hover:scale-[1.01] mb-3 select-none cursor-none shadow-[2px_2px_0px_#3F04BF] hover:shadow-none"
            >
              <span>{link.label}</span>
              <span className="font-bold">[ GO ]</span>
            </Link>
          ))}

          {/* External links */}
          {externalLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-md border-2 border-[#3F04BF] bg-[#0A0A0A] p-4 font-mono text-xs uppercase tracking-widest flex justify-between items-center transition-all duration-150 hover:bg-[#F21B42] hover:border-[#F21B42] hover:text-[#0A0A0A] hover:scale-[1.01] mb-3 select-none cursor-none shadow-[2px_2px_0px_#3F04BF] hover:shadow-none"
            >
              <span>{link.label}</span>
              <span className="font-bold">[ EXT ↗ ]</span>
            </a>
          ))}
          
        </div>

        {/* Footer info block */}
        <div className="text-center pt-4">
          <Link 
            to="/" 
            className="font-mono text-[10px] text-[#3F04BF] hover:text-[#F21B42] uppercase tracking-widest transition-colors cursor-none"
          >
            // RETURN TO MONOLITH
          </Link>
        </div>

      </div>
    </div>
  );
};

export default LinksPage;

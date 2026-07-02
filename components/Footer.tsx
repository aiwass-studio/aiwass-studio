import React from 'react';
import { motion } from 'framer-motion';
import { translations, Language } from '../translations';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = translations[language].contact;

  return (
    <footer className="w-full bg-[#0A0A0A] border-t-4 border-aiwass-text pt-16 pb-12 px-6 md:px-12 relative z-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          
          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-mono text-xs uppercase font-bold mb-4 text-aiwass-red">// {t.footerContact}</h4>
            <div className="space-y-3 font-mono text-xs text-aiwass-text/80">
              <p>
                <strong>{t.footerEmail}</strong>
                <br />
                <a href="mailto:contacto@aiwass.studio" className="hover:text-aiwass-red transition-colors">
                  contacto@aiwass.studio
                </a>
              </p>
              <p>
                <strong>{t.footerWhatsapp}</strong>
                <br />
                <a href="https://wa.me/19453981995" target="_blank" rel="noopener noreferrer" className="hover:text-aiwass-red transition-colors">
                  +1 (945) 398-1995
                </a>
              </p>
              <p>
                <strong>{t.footerLocation}</strong>
                <br />
                {t.footerLocationText}
                <br />
                <span className="opacity-60 text-[10px]">{t.footerRemote}</span>
              </p>
            </div>
          </motion.div>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-mono text-xs uppercase font-bold mb-4 text-aiwass-red">// {t.footerSocial}</h4>
            <div className="space-y-3 font-mono text-xs text-aiwass-text/80">
              <p>
                <a href="https://www.instagram.com/aiwass.studio" target="_blank" rel="noopener noreferrer" className="hover:text-aiwass-purple transition-colors">
                  {t.footerInstagram}
                </a>
              </p>
              <p>
                <a href="https://tiktok.com/@aiwass.studio" target="_blank" rel="noopener noreferrer" className="hover:text-aiwass-purple transition-colors">
                  {t.footerTikTok}
                </a>
              </p>
              <p>
                <a href="https://www.behance.net/emavisual" target="_blank" rel="noopener noreferrer" className="hover:text-aiwass-purple transition-colors">
                  {t.footerBehance}
                </a>
              </p>
            </div>
          </motion.div>

          {/* Copyright & Stamp */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h4 className="font-mono text-xs uppercase font-bold mb-4 text-aiwass-red">// {t.footerCopyright}</h4>
            <div className="flex items-center gap-6 justify-between md:justify-start">
              <div>
                <p className="font-mono text-xs text-aiwass-text">{t.footerCopy}</p>
                <p className="font-mono italic text-[10px] mt-2 text-aiwass-text/60">{t.footerQuote}</p>
              </div>
              
              {/* Rotating brand stamp (Thelema Unicursal Hexagram) */}
              <div className="w-20 h-20 flex-shrink-0 rotate-[-12deg] opacity-75 hover:opacity-100 hover:rotate-[12deg] transition-all duration-500">
                <div 
                  className="w-full h-full bg-aiwass-purple hover:bg-aiwass-red transition-colors duration-300"
                  style={{
                    mask: 'url(/assets/stamp.svg) no-repeat center / contain',
                    WebkitMask: 'url(/assets/stamp.svg) no-repeat center / contain'
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

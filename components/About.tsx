import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from './UI';
import { translations, Language } from '../translations';

interface AboutProps {
  language: Language;
}

const About: React.FC<AboutProps> = ({ language }) => {
  const t = translations[language].about;

  return (
    <section id="about" className="py-24 px-4 md:px-12 bg-aiwass-bg relative overflow-hidden border-y-4 border-aiwass-text">
      {/* Duotone Filter Definition - Hidden */}
      <svg className="hidden">
        <filter id="duotone">
          <feColorMatrix type="matrix" values="
            0.01 0 0 0 0.16
            1 0 0 0 0.01
            0 0 0 0 0.27
            0 0 0 1 0" />
        </filter>
      </svg>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">

        {/* Left: Image or Graphic Block */}
        <div className="col-span-1 md:col-span-5 relative">
          <motion.div
            className="relative group"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="absolute inset-[-4px] border-4 border-aiwass-text bg-[#121212] rotate-2 z-0"></div>
            <div className="relative overflow-hidden bg-aiwass-purple">
              <img
                src="/assets/director.jpg"
                alt="Emanuel Parra"
                className="relative z-10 w-full object-cover grayscale-[0.5] contrast-110 shadow-xl transition-all duration-300 group-hover:mix-blend-screen"
              />
              <div className="absolute inset-0 z-20 bg-[#290245] mix-blend-lighten opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
            <div className="absolute top-2 left-2 bg-[#121212] px-4 py-2 font-display text-sm rotate-[-2deg] border-2 border-aiwass-text shadow-md text-aiwass-text">
              {t.title}
            </div>
          </motion.div>
        </div>

        {/* Right: The Manifesto (Script Style) */}
        <div className="col-span-1 md:col-span-7 font-mono text-aiwass-text relative">
          <h2 className="text-8xl font-display text-aiwass-text mb-12 absolute -top-16 -right-12 opacity-5 select-none">
            DIRECTOR
          </h2>

          <div className="border-l-4 border-aiwass-text pl-8 py-2">
            <motion.h3
              className="font-display text-3xl uppercase mb-8 tracking-widest text-aiwass-purple"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {t.title}
            </motion.h3>

            <div className="space-y-8 font-serif text-lg text-aiwass-text/90 leading-relaxed">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <span className="font-mono text-aiwass-red text-xs tracking-widest uppercase mb-2 block">// ORIGINS.RAW</span>
                <p className="font-light">{t.p1}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <span className="font-mono text-aiwass-red text-xs tracking-widest uppercase mb-2 block">// ANTI_CORPORATE.MANIFESTO</span>
                <p className="font-light">{t.p2}</p>
              </motion.div>

              <motion.h4
                className="font-display text-4xl md:text-6xl uppercase leading-none my-12 text-aiwass-red tracking-tighter border-y-4 border-aiwass-red py-6 select-none"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                "{t.quote}"
              </motion.h4>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <span className="font-mono text-aiwass-red text-xs tracking-widest uppercase mb-2 block">// TECH_DEVELOPMENT.AUTOMATION</span>
                <p className="font-light">{t.p3}</p>
              </motion.div>
            </div>

            <motion.div
              className="mt-16 border-t-2 border-dashed border-aiwass-text pt-8 grid grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
            >
              <div className="flex flex-col">
                <span className="text-4xl font-display">{t.stat1}</span>
                <span className="text-xs uppercase opacity-50">{t.stat1Label}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-display">{t.stat2}</span>
                <span className="text-xs uppercase opacity-50">{t.stat2Label}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-display">{t.stat3}</span>
                <span className="text-xs uppercase opacity-50">{t.stat3Label}</span>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
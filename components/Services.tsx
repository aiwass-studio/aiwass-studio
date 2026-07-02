import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { translations, Language } from '../translations';

interface ServicesProps {
  language?: Language;
}

const Services: React.FC<ServicesProps> = ({ language = 'en' }) => {
  const t = translations[language].services;
  const [activeRow, setActiveRow] = useState<number | null>(0); // Open first service by default

  const services = [
    {
      id: '01',
      ...t.service1
    },
    {
      id: '02',
      ...t.service2
    },
    {
      id: '03',
      ...t.service3
    },
    {
      id: '04',
      ...t.service4
    },
  ];

  return (
    <section id="services" className="relative z-20 w-full bg-[#0A0A0A] py-24 px-4 border-t-2 border-[#3F04BF]">

      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-30"
        >
          <source src="/assets/videos/background-pattern.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#0A0A0A] opacity-[0.8]"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.h2
            className="font-display text-5xl md:text-8xl uppercase text-aiwass-red tracking-tight leading-none mb-4 filter-ink"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t.title}
          </motion.h2>
          <motion.p
            className="font-serif italic text-lg text-aiwass-text/70 mt-2 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {t.subtitle}
          </motion.p>
        </div>

        {/* Interactive Menu Stack */}
        <div className="border-t-2 border-aiwass-text/40">
          {services.map((service, index) => {
            const isOpen = activeRow === index;
            const isViolet = index % 2 === 0;

            return (
              <motion.div
                key={service.id}
                onClick={() => setActiveRow(isOpen ? null : index)}
                className="border-b-2 border-aiwass-text/40 bg-transparent cursor-none relative transition-colors duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{
                  backgroundColor: isViolet
                    ? "rgba(63, 4, 191, 0.12)" // Subtle violet reaction
                    : ["rgba(242, 27, 66, 0.7)", "rgba(242, 27, 66, 0.12)"], // Red flash/destello then settling
                  transition: {
                    duration: isViolet ? 0.3 : 0.4,
                    times: isViolet ? undefined : [0, 1],
                    ease: "easeOut"
                  }
                }}
              >
                <div className="p-6 md:p-10 select-none">
                  {/* Row Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4 md:gap-8">
                      <span className="font-mono text-sm md:text-base text-aiwass-red font-bold">
                        {service.id} //
                      </span>
                      <h3 className="font-display text-2xl md:text-4xl uppercase tracking-tighter text-aiwass-text">
                        {service.title}
                      </h3>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between md:justify-end gap-2 md:gap-6 w-full md:w-auto">
                      <span className="font-mono text-xs md:text-sm text-aiwass-text/60 md:text-right max-w-xs md:max-w-md">
                        {service.subtitle}
                      </span>
                      <span className={`font-mono text-xl md:text-2xl transition-transform duration-300 ${isOpen ? 'rotate-45 text-aiwass-red' : 'text-aiwass-text/40'} self-end md:self-auto`}>
                        +
                      </span>
                    </div>
                  </div>

                  {/* Expandable Details Container */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pt-8 mt-6 border-t border-dashed border-aiwass-text/25 grid grid-cols-1 md:grid-cols-12 gap-8">
                          {/* Left: Detailed Description */}
                          <div className="col-span-1 md:col-span-8">
                            <p className="font-mono text-xs md:text-sm text-aiwass-text/80 leading-relaxed max-w-3xl whitespace-pre-line">
                              {service.desc}
                            </p>
                          </div>

                          {/* Right: Key Deliverables & Time Label */}
                          <div className="col-span-1 md:col-span-4 flex flex-col justify-between gap-6">
                            <div>
                              <span className="font-mono text-[10px] text-aiwass-red tracking-widest uppercase block mb-2">
                                // {t.includesLabel}
                              </span>
                              <p className="font-mono text-xs leading-relaxed text-aiwass-text/70 uppercase">
                                {service.includes}
                              </p>
                            </div>
                            <div className="font-mono text-xs uppercase tracking-wider text-aiwass-purple font-black">
                              // {service.time}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="mt-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, type: "spring" }}
          >
            <a
              href="#contact"
              className="inline-block bg-aiwass-text text-aiwass-bg font-display text-xl md:text-3xl px-12 py-4 uppercase tracking-wide hover:bg-aiwass-red hover:text-white transition-all duration-300 shadow-[6px_6px_0px_#3F04BF] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] cursor-none"
            >
              {language === 'es' ? 'SOLICITAR COTIZACIÓN' : 'REQUEST QUOTE'}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Services;
import React from 'react';
import { motion } from 'framer-motion';
import { translations, Language } from '../translations';

interface ServicesProps {
  language: Language;
}

const Services: React.FC<ServicesProps> = ({ language }) => {
  const t = translations[language].services;

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
    <section id="services" className="py-24 px-4 md:px-12 bg-daez-ink text-daez-paper relative border-y-8 border-double border-daez-paper">

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            className="font-display text-5xl md:text-7xl uppercase text-daez-blood tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t.title}
          </motion.h2>
          <motion.p
            className="font-serif italic opacity-60 mt-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {t.subtitle}
          </motion.p>
        </div>

        <div className="space-y-2">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="border-2 border-daez-paper bg-daez-ink/50 hover:bg-daez-blood/10 transition-all duration-300 group cursor-none"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">

                {/* Service Number */}
                <div className="col-span-1 md:col-span-1">
                  <div className="text-6xl font-display text-daez-blood/30 group-hover:text-daez-blood transition-colors">
                    {service.id}
                  </div>
                </div>

                {/* Service Details */}
                <div className="col-span-1 md:col-span-11">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="font-display text-2xl md:text-4xl uppercase tracking-tight leading-none mb-2">
                        {service.title}
                      </h3>
                      <p className="font-mono text-xs uppercase tracking-widest text-daez-blood">
                        {service.subtitle}
                      </p>
                    </div>
                    <div className="font-mono text-xs uppercase tracking-wider opacity-60 md:text-right whitespace-nowrap">
                      {service.time}
                    </div>
                  </div>

                  <p className="font-serif text-sm md:text-base leading-relaxed mb-4 opacity-90">
                    {service.desc}
                  </p>

                  <div className="border-t border-dashed border-daez-paper/30 pt-4">
                    <p className="font-mono text-[10px] uppercase tracking-wide opacity-60 mb-2">
                      {t.includesLabel}
                    </p>
                    <p className="font-mono text-xs opacity-80">
                      {service.includes}
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, type: "spring" }}
          >
            <a href="#contact" className="inline-block bg-daez-paper text-daez-ink font-display text-xl md:text-3xl px-12 py-4 uppercase tracking-wide hover:bg-daez-blood hover:text-daez-paper transition-all duration-300 shadow-[6px_6px_0px_rgba(0,0,0,0.3)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] cursor-none">
              {language === 'es' ? 'SOLICITAR COTIZACIÓN' : 'REQUEST QUOTE'}
            </a>
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default Services;
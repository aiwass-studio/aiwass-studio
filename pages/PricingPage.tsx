import React from 'react';
import { translations, Language } from '../translations';

interface PricingPageProps {
  language: Language;
}

export const PricingPage: React.FC<PricingPageProps> = ({ language }) => {
  const t = translations[language];
  const isEs = language === 'es';
  const isIt = language === 'it';

  const tiers = [
    {
      id: '01',
      titleKey: 'tier1_title' as const,
      descKey: 'tier1_desc' as const,
      price: t.price_tier1,
      deliverables: isEs 
        ? ['Logotipos Primarios y Secundarios', 'Manual de Identidad Visual', 'Asset Pack Gráfico e Iconografía', 'Dirección de Arte & Estrategia', 'Archivos Finales Vectoriales', 'Aplicaciones Físicas y Mockups']
        : isIt
        ? ['Loghi Primari e Secondari', 'Manuale di Identità Visiva', 'Asset Pack Grafico e Iconografia', 'Direzione Artistica & Strategia', 'File Finali Vettoriali', 'Applicazioni Fisiche e Mockup']
        : ['Primary & Secondary Logotypes', 'Visual Style Guide & Rules', 'Custom Graphic Asset Pack', 'Art Direction & Vibe Strategy', 'Production-Ready Vectors', 'Physical & Digital Mockups']
    },
    {
      id: '02',
      titleKey: 'tier2_title' as const,
      descKey: 'tier2_desc' as const,
      price: t.price_tier2,
      deliverables: isEs
        ? ['Diseño de Interfaz UI/UX a Medida', 'Desarrollo Frontend React / Vite', 'Estilos Modernos con Tailwind CSS', 'Animaciones de Scroll Avanzadas', 'Optimización de LCP y SEO Técnico', 'Integración de APIs y Formulación']
        : isIt
        ? ['Design di Interfaccia UI/UX su Misura', 'Sviluppo Frontend React / Vite', 'Stili Moderni con Tailwind CSS', 'Animazioni di Scroll Avanzate', 'Ottimizzazione LCP e SEO Tecnico', 'Integrazione di API e Moduli']
        : ['Bespoke UI/UX Interface Design', 'Vite & React Frontend Development', 'Modern Tailwind CSS Styling', 'Advanced Scroll Animations (GSAP)', 'Technical SEO & LCP Optimization', 'API Integration & Form Setup']
    },
    {
      id: '03',
      titleKey: 'tier3_title' as const,
      descKey: 'tier3_desc' as const,
      price: t.price_tier3,
      deliverables: isEs
        ? ['Sistema de Identidad de Marca Completo', 'Desarrollo Web & Código a Medida', 'Cápsula de Indumentaria Streetwear', 'Fichas Técnicas para Taller (Tech Packs)', 'Sincronía Digital-Física Absoluta', 'Dirección de Arte y Asesoramiento 1-on-1']
        : isIt
        ? ['Sistema di Identità di Marca Completo', 'Sviluppo Web e Codice su Misura', 'Capsule di Abbigliamento Streetwear', 'Schede Tecniche di Produzione (Tech Packs)', 'Sincronia Digitale-Fisica Assoluta', 'Direzione Artistica e Consulenza 1-a-1']
        : ['Complete Brand Identity System', 'Custom Coded Web Application', 'Streetwear Apparel Capsule', 'Production-Ready Tech Packs', 'Absolute Digital-Physical Unity', '1-on-1 Art Direction & Consulting']
    }
  ];

  const alacarteServices = [
    {
      name: 'Bespoke Visual Identity System',
      desc: isEs 
        ? 'Desarrollo integral de logotipo, tipografía, paleta de colores y guía de estilo de marca.' 
        : isIt 
        ? 'Sviluppo completo di logo, tipografia, tavolozza dei colori e linee guida del marchio.' 
        : 'Complete development of visual logo systems, typography, color palette, and visual guidelines.',
      price: isIt ? '650 €' : '$650 USD'
    },
    {
      name: 'Custom Frontend Engineering (React/Vite)',
      desc: isEs 
        ? 'Desarrollo de interfaz de alta velocidad con animaciones interactivas y código limpio.' 
        : isIt 
        ? 'Sviluppo front-end ad alta velocità con animazioni interattive e codice pulito.' 
        : 'High-speed frontend implementation with interactive components and clean code structure.',
      price: isIt ? '1,100 €' : '$1,100 USD'
    },
    {
      name: 'Streetwear Apparel Design & Tech Packs',
      desc: isEs 
        ? 'Diseño de prendas urbanas y preparación de fichas técnicas para producción en fábrica.' 
        : isIt 
        ? 'Design di abbigliamento streetwear e schede tecniche pronte per la produzione.' 
        : 'Industrial streetwear apparel design and production-ready technical specification packages.',
      price: isIt ? '750 €' : '$750 USD'
    },
    {
      name: 'Advanced Motion & Interaction Design',
      desc: isEs 
        ? 'Integración de animaciones avanzadas mediante GSAP, ScrollTrigger y transiciones fluidas.' 
        : isIt 
        ? 'Integrazione di animazioni avanzate con GSAP, ScrollTrigger e transizioni fluide.' 
        : 'Advanced motion graphics, scroll-driven interactive behaviors (GSAP), and premium transitions.',
      price: isIt ? '400 €' : '$400 USD'
    },
    {
      name: 'Technical SEO & Web Vitals Optimization',
      desc: isEs 
        ? 'Optimización de Core Web Vitals, tiempos de carga ultrarrápidos y auditoría SEO técnica.' 
        : isIt 
        ? 'Ottimizzazione di Core Web Vitals, velocità di caricamento fulminea e controlli SEO tecnici.' 
        : 'Core Web Vitals fine-tuning, page loading performance audit, and technical SEO structure.',
      price: isIt ? '350 €' : '$350 USD'
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#0A0A0A] pt-32 pb-24 px-4 md:px-12 text-[#F2EFE9] font-sans relative overflow-hidden">
      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-[size:24px_24px] bg-halftone-lg opacity-5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Clean Header */}
        <div className="border-b-4 border-[#F2EFE9] pb-6 mb-16 flex flex-col md:flex-row justify-between items-end">
          <h1 className="text-5xl md:text-8xl font-display uppercase tracking-tighter leading-none filter-ink text-[#F2EFE9]">
            {t.pricing_title}
          </h1>
          <span className="font-mono text-[#F21B42] text-xs md:text-sm mb-2 font-bold uppercase tracking-widest">
            // {isEs ? 'REQUERIMIENTOS TÉCNICOS & PRECIOS FIJOS' : isIt ? 'REQUISITI TECNICI & PREZZI FISSI' : 'TECHNICAL SPECS & FIXED RATES'}
          </span>
        </div>

        {/* Pricing Rows */}
        <div className="flex flex-col border-t-2 border-[#3F04BF]">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className="grid grid-cols-1 md:grid-cols-12 border-b-2 border-[#3F04BF] py-12 gap-6 transition-all duration-200 hover:border-[#F21B42]"
            >
              {/* Left Column */}
              <div className="md:col-span-4 flex flex-col justify-between">
                <div>
                  <div className="font-mono text-sm text-[#3F04BF] mb-2">// TIER {tier.id}</div>
                  <h2 className="text-4xl md:text-6xl uppercase tracking-tighter text-[#F2EFE9] font-display">
                    {t[tier.titleKey]}
                  </h2>
                  <div className="text-[#F21B42] font-mono text-xl md:text-2xl mt-2 font-bold">
                    {tier.price}
                  </div>
                </div>
                
                <a
                  href="/contact"
                  className="hidden md:inline-block w-fit mt-8 border-2 border-[#3F04BF] text-[#F2EFE9] font-mono text-xs font-bold px-6 py-2.5 uppercase tracking-widest hover:bg-[#F21B42] hover:border-[#F21B42] hover:text-[#F2EFE9] transition-all duration-200 cursor-none"
                >
                  {isEs ? 'COMENZAR PROYECTO //' : isIt ? 'INIZIA PROGETTO //' : 'START PROJECT //'}
                </a>
              </div>

              {/* Right Column */}
              <div className="md:col-span-8 md:border-l-2 md:border-[#3F04BF]/40 md:pl-8 flex flex-col gap-6 justify-between">
                <div className="flex flex-col gap-4">
                  <p className="text-lg text-[#F2EFE9]/80 max-w-2xl font-normal font-serif">
                    {t[tier.descKey]}
                  </p>

                  <div className="mt-4">
                    <span className="font-mono text-[10px] text-[#3F04BF] tracking-widest uppercase block mb-3">// {isEs ? 'ENTREGABLES CLAVE' : isIt ? 'CONSEGNE CHIAVE' : 'KEY DELIVERABLES'}</span>
                    <div className="text-xs md:text-sm tracking-wide text-[#F2EFE9]/60 grid grid-cols-1 md:grid-cols-2 gap-3 font-mono">
                      {tier.deliverables.map((del, dIdx) => (
                        <div key={dIdx} className="flex items-center gap-2">
                          <span className="text-[#3F04BF] font-bold font-mono">//</span>
                          <span className="uppercase">{del}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <a
                  href="/contact"
                  className="inline-block md:hidden text-center w-full mt-6 border-2 border-[#3F04BF] text-[#F2EFE9] font-mono text-xs font-bold py-3 uppercase tracking-widest hover:bg-[#F21B42] hover:border-[#F21B42] transition-all duration-200 cursor-none"
                >
                  {isEs ? 'COMENZAR PROYECTO //' : isIt ? 'INIZIA PROGETTO //' : 'START PROJECT //'}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* À La Carte Systems */}
        <div className="mt-24 mb-10">
          <div className="border-b-4 border-[#F2EFE9] pb-4 mb-8">
            <h2 className="text-4xl md:text-6xl font-display uppercase tracking-tighter text-[#F2EFE9] filter-ink">
              {t.separate_services_title}
            </h2>
          </div>
          <div className="flex flex-col border-t-2 border-[#3F04BF]">
            {alacarteServices.map((service, idx) => (
              <div 
                key={idx} 
                className="grid grid-cols-1 md:grid-cols-12 border-b-2 border-[#3F04BF]/40 py-6 gap-4 transition-all duration-200 hover:border-[#F21B42]"
              >
                <div className="md:col-span-9 flex flex-col justify-center">
                  <span className="font-mono text-sm text-[#F2EFE9] uppercase tracking-wider">{service.name}</span>
                  <span className="font-serif text-xs text-[#F2EFE9]/60 mt-1">{service.desc}</span>
                </div>
                <div className="md:col-span-3 flex items-center md:justify-end text-left md:text-right">
                  <span className="font-mono text-sm md:text-base font-bold text-[#F21B42] whitespace-nowrap">{service.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Protocols */}
        <div className="mt-24 mb-12">
          <div className="border-b-4 border-[#F2EFE9] pb-4 mb-10">
            <h2 className="text-4xl md:text-6xl font-display uppercase tracking-tighter text-[#F2EFE9] filter-ink">
              {t.payment_terms_title}
            </h2>
          </div>
          
          <div className="border-4 border-[#3F04BF] bg-black p-6 md:p-8 shadow-[6px_6px_0px_#3F04BF] relative group transition-colors duration-300 hover:border-[#F21B42]">
            <div className="absolute -top-3.5 left-4 bg-black border-2 border-[#F21B42] text-[#F21B42] font-mono text-[9px] px-2.5 py-0.5 uppercase tracking-widest font-bold">
              [ FINANCIAL_PROTOCOLS // SOURCE ]
            </div>
            
            <div className="space-y-6 pt-4 font-mono text-xs md:text-sm uppercase tracking-wider leading-relaxed">
              <div className="flex flex-col md:flex-row md:items-start gap-2 border-b border-[#3F04BF]/30 pb-4">
                <span className="text-[#F21B42] font-bold shrink-0">// STANDARD ESCROW:</span>
                <span className="text-[#F2EFE9]/80">{t.payment_standard}</span>
              </div>
              <div className="flex flex-col md:flex-row md:items-start gap-2">
                <span className="text-[#F21B42] font-bold shrink-0">// EXTENDED FRAMEWORKS:</span>
                <span className="text-[#F2EFE9]/80">{t.payment_extended}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Custom note block */}
        <div className="mt-20 border-2 border-[#3F04BF] p-6 md:p-10 text-center max-w-3xl mx-auto bg-black relative group hover:border-[#F21B42] transition-colors duration-300">
          <div className="absolute top-0 left-0 bg-[#3F04BF] text-black font-mono text-[9px] px-2 py-0.5 uppercase tracking-widest group-hover:bg-[#F21B42] transition-colors">
            {isEs ? 'ALERTA DE PRODUCCIÓN' : isIt ? 'AVVISO DI PRODUZIONE' : 'PRODUCTION ALERT'}
          </div>
          <h4 className="font-display text-3xl uppercase text-[#F21B42] mb-3 tracking-tight mt-2">
            {isEs ? '¿PROYECTO A MEDIDA?' : isIt ? 'PROGETTO SU MISURA?' : 'CUSTOM SYSTEM REQUIRED?'}
          </h4>
          <p className="font-mono text-xs text-[#F2EFE9]/75 uppercase leading-relaxed max-w-2xl mx-auto mb-6">
            {isEs 
              ? 'Si tu visión requiere un alcance técnico o estético no listado aquí, diseñamos guiones y contratos personalizados. La distorsión creativa no tiene límites.'
              : isIt
              ? 'Se la tua visione richiede un ambito tecnico o estetico non elencato qui, progettiamo script e contratti personalizzati. La distorsione creativa non ha limiti.'
              : 'If your vision demands a technical or aesthetic scope not mapped here, we write custom visual scripts. Transgressive ideas are always welcome.'}
          </p>
          <a
            href="/contact"
            className="inline-block font-mono text-xs font-bold text-[#F21B42] hover:text-[#3F04BF] border-b-2 border-[#F21B42] hover:border-[#3F04BF] pb-1 uppercase tracking-widest cursor-none transition-colors"
          >
            {isEs ? 'INICIAR AUDICIÓN PERSONALIZADA //' : isIt ? 'INIZIA AUDIZIONE PERSONALIZZATA //' : 'START A CUSTOM AUDITION //'}
          </a>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { translations, Language } from '../translations';

interface ContactPageProps {
  language: Language;
}

export const ContactPage: React.FC<ContactPageProps> = ({ language }) => {
  const t = translations[language];
  const isEs = language === 'es';
  const isIt = language === 'it';

  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] }
  };

  const disciplines = [
    { id: 'branding', label: 'Alternative Branding' },
    { id: 'web', label: 'Custom Web/App Dev' },
    { id: 'streetwear', label: 'Streetwear Concept & Production' },
    { id: 'music', label: 'Sonic/Music Visual Identity' }
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedDiscipline) {
      alert(isEs ? 'Por favor selecciona una disciplina visual.' : isIt ? 'Seleziona una disciplina visiva.' : 'Please select a visual discipline.');
      return;
    }
    setStatus('sending');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(import.meta.env.VITE_MAKE_WEBHOOK_URL || '', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
        setSelectedDiscipline('');
      } else {
        setStatus('idle');
        alert(isEs ? 'Error al enviar el formulario. Por favor intenta de nuevo.' : isIt ? 'Errore nell\'invio del modulo. Riprova.' : 'Error submitting form. Please try again.');
      }
    } catch (error) {
      setStatus('idle');
      alert(isEs ? 'Error de red. Por favor intenta de nuevo.' : isIt ? 'Errore di rete. Riprova.' : 'Network error. Please try again.');
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#0A0A0A] pt-32 pb-24 px-4 md:px-12 text-[#F2EFE9] font-serif relative overflow-hidden">
      {/* Halftone and radial glowing backgrounds */}
      <div className="absolute inset-0 bg-[size:24px_24px] bg-halftone-lg opacity-5 pointer-events-none"></div>
      <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#3F04BF]/5 blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#F21B42]/5 blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* LEFT SIDE: Positioning & Direct Support Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="lg:col-span-5 space-y-12 lg:sticky lg:top-32"
          >
            {/* Title block */}
            <div className="space-y-6">
              <span className="font-mono text-xs text-[#F21B42] tracking-widest uppercase block">// AUDITION CALL</span>
              <h1 className="text-5xl md:text-8xl font-display uppercase tracking-tighter leading-[0.9] filter-ink text-[#F2EFE9]">
                {t.contact_title}
              </h1>
              <div className="w-24 h-[3px] bg-[#3F04BF]"></div>
              <p className="text-lg md:text-xl text-[#F2EFE9]/90 leading-relaxed font-serif uppercase tracking-wide border-l-4 border-[#3F04BF] pl-6">
                {t.contact_subtitle}
              </p>
            </div>

            {/* Direct Support & Emergencies Card */}
            <div className="border-2 border-[#3F04BF] bg-black p-6 md:p-8 relative shadow-2xl overflow-hidden group hover:border-[#F21B42] transition-colors duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-halftone-sm opacity-5 pointer-events-none"></div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#F21B42]"></div>
              <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-[#F21B42]"></div>
              
              <div className="space-y-6 relative z-10">
                <div>
                  <span className="font-mono text-[9px] text-[#A0A0A0] block">// IMMEDIATE DIRECT CHANNELS</span>
                  <h3 className="font-display text-2xl uppercase tracking-wider text-[#F2EFE9] mt-2">
                    {isEs ? 'LÍNEA DE EMERGENCIA' : isIt ? 'LINEA DI EMERGENZA' : 'EMERGENCY HOTLINE'}
                  </h3>
                </div>
                
                <a 
                  href="https://wa.me/19453981995" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-4 p-4 border border-[#3F04BF]/40 bg-[#0A0A0A] hover:bg-[#F21B42]/10 hover:border-[#F21B42] transition-all duration-300 group/wa scale-[1.0] active:scale-[0.98]"
                >
                  <div className="w-10 h-10 rounded-none bg-[#3F04BF] group-hover/wa:bg-[#F21B42] flex items-center justify-center font-mono font-bold text-[#F2EFE9] text-lg transition-colors">
                    WA
                  </div>
                  <div>
                    <div className="font-mono text-[9px] text-[#A0A0A0] block">// CHAT ON WHATSAPP</div>
                    <div className="font-mono text-sm md:text-base font-bold text-[#F2EFE9] tracking-wider">+1 (945) 398-1995</div>
                  </div>
                </a>

                {/* Social Channels */}
                <div className="space-y-3 pt-2">
                  <span className="font-mono text-[9px] text-[#A0A0A0] block font-bold">// DIGITAL TRANSMISSIONS</span>
                  <div className="grid grid-cols-3 gap-3">
                    <a 
                      href="https://instagram.com/aiwass.studio" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="border border-[#3F04BF]/30 hover:border-[#F21B42] hover:bg-[#F21B42]/5 text-center py-2.5 font-mono text-[10px] tracking-widest uppercase transition-colors"
                    >
                      INSTAGRAM
                    </a>
                    <a 
                      href="https://tiktok.com/@aiwass.studio" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="border border-[#3F04BF]/30 hover:border-[#F21B42] hover:bg-[#F21B42]/5 text-center py-2.5 font-mono text-[10px] tracking-widest uppercase transition-colors"
                    >
                      TIKTOK
                    </a>
                    <a 
                      href="https://behance.net" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="border border-[#3F04BF]/30 hover:border-[#F21B42] hover:bg-[#F21B42]/5 text-center py-2.5 font-mono text-[10px] tracking-widest uppercase transition-colors"
                    >
                      BEHANCE
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* RIGHT SIDE: The Audition Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="lg:col-span-7"
          >
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  className="border-2 border-[#F21B42] bg-[#F21B42]/5 p-8 md:p-16 text-center space-y-8 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-halftone-sm opacity-5 pointer-events-none"></div>
                  
                  {/* Glowing success circles */}
                  <div className="w-24 h-24 rounded-full border-2 border-[#F21B42] flex items-center justify-center mx-auto relative group">
                    <div className="absolute inset-0 rounded-full bg-[#F21B42]/20 animate-ping"></div>
                    <span className="font-mono text-2xl text-[#F21B42] font-bold">✓</span>
                  </div>

                  <div className="space-y-4">
                    <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tighter text-[#F2EFE9] filter-ink">
                      {isEs ? 'AUDICIÓN APROBADA' : isIt ? 'AUDIZIONE APPROVATA' : 'AUDITION RECEIVED'}
                    </h2>
                    <p className="font-serif text-lg md:text-xl text-[#F2EFE9]/90 max-w-lg mx-auto">
                      {t.contact_success}
                    </p>
                  </div>
                  
                  <div className="pt-6">
                    <button 
                      onClick={() => setStatus('idle')} 
                      className="border border-[#F21B42] hover:bg-[#F21B42] hover:text-[#F2EFE9] text-[#F21B42] px-8 py-3.5 font-mono text-xs uppercase tracking-widest transition-all duration-300 font-bold"
                    >
                      {isEs ? 'ENVIAR OTRA AUDICIÓN' : isIt ? 'INVIA UN\'ALTRA AUDIZIONE' : 'SUBMIT ANOTHER AUDITION'}
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-12 border border-[#3F04BF]/40 bg-black/60 p-8 md:p-12 shadow-2xl relative"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-halftone-sm opacity-5 pointer-events-none"></div>
                  
                  {/* BLOCK 01: Identidad Base */}
                  <div className="space-y-8">
                    <div className="flex items-center gap-3 border-b border-[#3F04BF]/20 pb-2">
                      <span className="font-mono text-xs text-[#3F04BF] font-bold">BLOCK 01</span>
                      <span className="font-mono text-[10px] text-[#A0A0A0] tracking-widest uppercase">// IDENTITY_BASE</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Name input */}
                      <div className="relative group">
                        <label className="block font-mono text-xs text-[#3F04BF] tracking-wider mb-2 uppercase">// {t.field_name}</label>
                        <input 
                          required 
                          type="text" 
                          name="name" 
                          className="w-full bg-transparent border-b border-[#F2EFE9]/30 focus:border-[#F21B42] py-2 font-serif text-xl focus:outline-none transition-colors text-[#F2EFE9] placeholder-[#A0A0A0]/40"
                          placeholder={isEs ? "Ej. Ema Craist" : "E.g. Ema Craist"} 
                        />
                        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#F21B42] group-focus-within:w-full transition-all duration-500"></span>
                      </div>

                      {/* Email input */}
                      <div className="relative group">
                        <label className="block font-mono text-xs text-[#3F04BF] tracking-wider mb-2 uppercase">// EMAIL</label>
                        <input 
                          required 
                          type="email" 
                          name="email" 
                          className="w-full bg-transparent border-b border-[#F2EFE9]/30 focus:border-[#F21B42] py-2 font-serif text-xl focus:outline-none transition-colors text-[#F2EFE9] placeholder-[#A0A0A0]/40"
                          placeholder="hello@aiwass.studio" 
                        />
                        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#F21B42] group-focus-within:w-full transition-all duration-500"></span>
                      </div>
                    </div>

                    {/* Instagram/Website Link */}
                    <div className="relative group">
                      <label className="block font-mono text-xs text-[#3F04BF] tracking-wider mb-2 uppercase">// {t.field_link}</label>
                      <input 
                        required 
                        type="url" 
                        name="link" 
                        className="w-full bg-transparent border-b border-[#F2EFE9]/30 focus:border-[#F21B42] py-2 font-serif text-xl focus:outline-none transition-colors text-[#F2EFE9] placeholder-[#A0A0A0]/40"
                        placeholder="https://instagram.com/yourbrand" 
                      />
                      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#F21B42] group-focus-within:w-full transition-all duration-500"></span>
                    </div>
                  </div>

                  {/* BLOCK 02: Dirección de Proyecto */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 border-b border-[#3F04BF]/20 pb-2">
                      <span className="font-mono text-xs text-[#3F04BF] font-bold">BLOCK 02</span>
                      <span className="font-mono text-[10px] text-[#A0A0A0] tracking-widest uppercase">// PROJECT_DIRECTION</span>
                    </div>
                    
                    <div className="space-y-4">
                      <label className="block font-mono text-xs text-[#F21B42] tracking-wider uppercase">// {t.field_type}</label>
                      <input type="hidden" name="discipline" value={selectedDiscipline} required />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {disciplines.map((d) => {
                          const isActive = selectedDiscipline === d.id;
                          return (
                            <button
                              key={d.id}
                              type="button"
                              onClick={() => setSelectedDiscipline(d.id)}
                              className={`text-left p-4 border transition-all duration-300 rounded-none relative overflow-hidden flex flex-col justify-between aspect-[4/1.2] md:aspect-auto select-none ${
                                isActive 
                                  ? 'border-[#F21B42] bg-[#F21B42]/10 shadow-[4px_4px_0px_#F21B42] translate-x-[-2px] translate-y-[-2px]' 
                                  : 'border-[#3F04BF]/30 hover:border-[#3F04BF] bg-black/40 hover:bg-[#3F04BF]/5'
                              }`}
                            >
                              <span className={`font-mono text-[8px] tracking-widest ${isActive ? 'text-[#F21B42]' : 'text-[#3F04BF]'}`}>
                                {isActive ? '// SELECTED' : `// DISC_${d.id.toUpperCase()}`}
                              </span>
                              <span className="font-serif text-base md:text-lg font-bold tracking-wide uppercase leading-tight mt-2 text-[#F2EFE9]">
                                {d.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* BLOCK 03: Alineación Financiera */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 border-b border-[#3F04BF]/20 pb-2">
                      <span className="font-mono text-xs text-[#3F04BF] font-bold">BLOCK 03</span>
                      <span className="font-mono text-[10px] text-[#A0A0A0] tracking-widest uppercase">// FINANCIAL_ALIGNMENT</span>
                    </div>

                    <div className="relative group">
                      <label className="block font-mono text-xs text-[#F21B42] tracking-wider mb-3 uppercase">// {t.field_budget}</label>
                      <select 
                        required 
                        name="budget" 
                        className="w-full bg-black border border-[#3F04BF]/40 group-hover:border-[#F21B42]/40 focus:border-[#F21B42] text-[#F2EFE9] py-3.5 px-4 font-serif text-lg md:text-xl focus:outline-none transition-all duration-300 rounded-none appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-black text-[#A0A0A0]">{isEs ? 'Seleccionar nivel de inversión...' : isIt ? 'Seleziona livello di investimento...' : 'Select investment tier...'}</option>
                        <option value="core" className="bg-[#0A0A0A] text-[#F2EFE9]">{t.budget_tier1}</option>
                        <option value="digital" className="bg-[#0A0A0A] text-[#F2EFE9]">{t.budget_tier2}</option>
                        <option value="monolith" className="bg-[#0A0A0A] text-[#F2EFE9]">{t.budget_tier3}</option>
                      </select>
                      <div className="absolute right-4 bottom-4 pointer-events-none text-[#3F04BF] group-hover:text-[#F21B42] transition-colors font-bold font-mono text-xs">▼</div>
                    </div>
                  </div>

                  {/* BLOCK 04: Diagnóstico de Marca */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 border-b border-[#3F04BF]/20 pb-2">
                      <span className="font-mono text-xs text-[#3F04BF] font-bold">BLOCK 04</span>
                      <span className="font-mono text-[10px] text-[#A0A0A0] tracking-widest uppercase">// BRAND_DIAGNOSIS</span>
                    </div>

                    <div className="relative group">
                      <label className="block font-mono text-xs text-[#F21B42] tracking-wider mb-2 uppercase">// {t.field_message}</label>
                      <textarea 
                        required 
                        name="message" 
                        rows={4} 
                        className="w-full bg-black/40 p-4 border border-[#3F04BF]/30 focus:border-[#F21B42] font-mono text-sm resize-none focus:outline-none transition-colors text-[#F2EFE9] placeholder-[#A0A0A0]/40" 
                        placeholder={isEs ? "¿Cuál es el mayor cuello de botella actual de tu marca o qué regla quieres romper?" : "What is the current biggest bottleneck for your brand or what rule do you want to break?"}
                      />
                      <div className="absolute -top-1 -left-1 w-2 h-2 bg-[#3F04BF]/0 group-focus-within:bg-[#F21B42] transition-colors"></div>
                      <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#3F04BF]/0 group-focus-within:bg-[#F21B42] transition-colors"></div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-between items-center pt-6">
                    <div className="hidden md:block w-16 h-16 rotate-[-10deg] opacity-60 hover:opacity-100 transition-opacity duration-300">
                      <div 
                        className="w-full h-full bg-[#3F04BF] hover:bg-[#F21B42] transition-colors duration-300"
                        style={{
                          mask: 'url(/assets/aiwass-isotipo.svg) no-repeat center / contain',
                          WebkitMask: 'url(/assets/aiwass-isotipo.svg) no-repeat center / contain'
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="bg-[#F2EFE9] text-[#0A0A0A] font-display text-2xl md:text-3xl px-12 py-4 hover:bg-[#F21B42] hover:text-white transition-all duration-200 uppercase w-full md:w-auto shadow-[4px_4px_0px_#3F04BF] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                    >
                      {status === 'sending' ? (isEs ? 'ENVIANDO...' : isIt ? 'INVIANDO...' : 'SENDING...') : t.contact_submit}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;

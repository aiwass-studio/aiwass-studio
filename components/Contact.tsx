import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from './UI';
import { translations, Language } from '../translations';

interface ContactProps {
    language: Language;
}

const Contact: React.FC<ContactProps> = ({ language }) => {
    const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
    const t = translations[language].contact;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('sending');

        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            const response = await fetch('https://formspree.io/f/mzzgywyb', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setStatus('success');
                form.reset();
            } else {
                setStatus('idle');
                alert(language === 'es' ? 'Error al enviar el mensaje. Por favor intenta de nuevo.' : language === 'it' ? 'Errore nell\'invio del messaggio. Riprova.' : 'Error sending message. Please try again.');
            }
        } catch (error) {
            setStatus('idle');
            alert(language === 'es' ? 'Error al enviar el mensaje. Por favor intenta de nuevo.' : language === 'it' ? 'Errore nell\'invio del messaggio. Riprova.' : 'Error sending message. Please try again.');
        }
    };

    return (
        <section id="contact" className="py-24 px-4 md:px-12 bg-aiwass-bg text-aiwass-text relative overflow-hidden">
            {/* Texture Overlay - inline pattern instead of external URL */}
            <div
                className="absolute inset-0 mix-blend-screen opacity-15"
                style={{
                    backgroundImage: 'radial-gradient(circle, rgba(242,239,233,0.15) 1px, transparent 1px)',
                    backgroundSize: '4px 4px'
                }}
            />

            <motion.div
                className="relative z-10 max-w-5xl mx-auto"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="bg-[#121212] text-aiwass-text p-2 md:p-4 shadow-2xl rotate-3 md:rotate-3 scale-[1.02]">
                    {/* Inner Border Container */}
                    <div className="border-4 border-aiwass-text p-6 md:p-12 relative h-full">

                        <div className="absolute top-0 left-0 bg-black text-aiwass-text px-4 py-2 font-display uppercase tracking-widest text-xl border border-aiwass-text/30">
                            {t.castingCall}
                        </div>

                        <div className="mt-12 mb-8 text-center">
                            <h2 className="font-display text-6xl md:text-8xl uppercase leading-none filter-ink">{t.title}</h2>
                            <p className="font-serif text-lg mt-4 text-daez-charcoal">{t.subtitle1}<br />{t.subtitle2}</p>
                        </div>

                        {status === 'success' ? (
                            <div className="border-2 border-dashed border-aiwass-red p-12 text-center bg-aiwass-red/10">
                                <h3 className="font-display text-6xl text-aiwass-red mb-4 rotate-[-2deg]">{t.successTitle}</h3>
                                <p className="font-serif italic text-lg">{t.successSubtitle}</p>
                                <p className="font-mono text-sm mt-4 opacity-60">{t.successMessage}</p>
                                <button onClick={() => setStatus('idle')} className="mt-8 text-xs underline font-mono uppercase font-bold">{t.successBtn}</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="group">
                                        <label className="block font-mono text-xs uppercase font-bold mb-2">{t.labelName}</label>
                                        <input required type="text" name="name" className="w-full bg-transparent border-b-2 border-aiwass-text py-2 font-serif text-2xl focus:outline-none focus:border-aiwass-red transition-colors placeholder-gray-500 text-aiwass-text" placeholder={t.placeholderName} />
                                    </div>
                                    <div className="group">
                                        <label className="block font-mono text-xs uppercase font-bold mb-2">{t.labelEmail}</label>
                                        <input required type="email" name="email" className="w-full bg-transparent border-b-2 border-aiwass-text py-2 font-serif text-2xl focus:outline-none focus:border-aiwass-red transition-colors placeholder-gray-500 text-aiwass-text" placeholder={t.placeholderEmail} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="group">
                                        <label className="block font-mono text-xs uppercase font-bold mb-2">{t.labelProjectType}</label>
                                        <select required name="projectType" className="w-full bg-[#121212] border-b-2 border-aiwass-text py-2 font-serif text-2xl focus:outline-none focus:border-aiwass-red transition-colors text-aiwass-text">
                                            <option value="" className="bg-[#121212] text-aiwass-text">{t.selectPlaceholder}</option>
                                            <option value="branding" className="bg-[#121212] text-aiwass-text">{t.optionBranding}</option>
                                            <option value="web" className="bg-[#121212] text-aiwass-text">{t.optionWeb}</option>
                                            <option value="streetwear" className="bg-[#121212] text-aiwass-text">{t.optionStreetwear}</option>
                                            <option value="music" className="bg-[#121212] text-aiwass-text">{t.optionMusic}</option>
                                        </select>
                                    </div>
                                    <div className="group">
                                        <label className="block font-mono text-xs uppercase font-bold mb-2">{t.labelBudget}</label>
                                        <select required name="budget" className="w-full bg-[#121212] border-b-2 border-aiwass-text py-2 font-serif text-2xl focus:outline-none focus:border-aiwass-red transition-colors text-aiwass-text">
                                            <option value="" className="bg-[#121212] text-aiwass-text">{t.selectPlaceholder}</option>
                                            <option value="1500-3000" className="bg-[#121212] text-aiwass-text">$1,500 - $3,000</option>
                                            <option value="3000-6000" className="bg-[#121212] text-aiwass-text">$3,000 - $6,000</option>
                                            <option value="6000-12000" className="bg-[#121212] text-aiwass-text">$6,000 - $12,000</option>
                                            <option value="12000+" className="bg-[#121212] text-aiwass-text">$12,000+</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="block font-mono text-xs uppercase font-bold mb-2">{t.labelDetails}</label>
                                    <textarea required name="message" rows={4} className="w-full bg-black/40 p-4 border-2 border-aiwass-text/30 focus:border-aiwass-red font-mono text-sm resize-none focus:outline-none transition-colors text-aiwass-text" placeholder={t.placeholderDetails}></textarea>
                                </div>

                                <div className="flex justify-between items-center pt-6">
                                    <div className="hidden md:block w-32 h-32 rotate-[-12deg] opacity-75 hover:opacity-100 transition-opacity duration-300">
                                        <div 
                                            className="w-full h-full bg-aiwass-purple hover:bg-aiwass-red transition-colors duration-300"
                                            style={{
                                                mask: 'url(/assets/aiwass-isotipo.svg) no-repeat center / contain',
                                                WebkitMask: 'url(/assets/aiwass-isotipo.svg) no-repeat center / contain'
                                            }}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={status === 'sending'}
                                        className="bg-aiwass-text text-aiwass-bg font-display text-3xl px-12 py-4 hover:bg-aiwass-red hover:text-white transition-all duration-200 uppercase w-full md:w-auto shadow-[4px_4px_0px_#3F04BF] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                                    >
                                        {status === 'sending' ? t.btnSending : t.btnSubmit}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default Contact;
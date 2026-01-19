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
                alert('Error al enviar el mensaje. Por favor intenta de nuevo.');
            }
        } catch (error) {
            setStatus('idle');
            alert('Error al enviar el mensaje. Por favor intenta de nuevo.');
        }
    };

    return (
        <section id="contact" className="py-24 px-4 md:px-12 bg-[#450474] text-daez-paper relative overflow-hidden">
            {/* Texture Overlay - inline pattern instead of external URL */}
            <div
                className="absolute inset-0 mix-blend-multiply opacity-30"
                style={{
                    backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)',
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
                <div className="bg-daez-paper text-daez-ink p-2 md:p-4 shadow-2xl rotate-3 md:rotate-3 scale-[1.02]">
                    {/* Inner Border Container */}
                    <div className="border-4 border-daez-ink p-6 md:p-12 relative h-full">

                        <div className="absolute top-0 left-0 bg-daez-ink text-daez-paper px-4 py-2 font-display uppercase tracking-widest text-xl">
                            {t.castingCall}
                        </div>

                        <div className="mt-12 mb-8 text-center">
                            <h2 className="font-display text-6xl md:text-8xl uppercase leading-none filter-ink">{t.title}</h2>
                            <p className="font-serif text-lg mt-4 text-daez-charcoal">{t.subtitle1}<br />{t.subtitle2}</p>
                        </div>

                        {status === 'success' ? (
                            <div className="border-2 border-dashed border-daez-blood p-12 text-center bg-daez-blood/10">
                                <h3 className="font-display text-6xl text-daez-blood mb-4 rotate-[-2deg]">{t.successTitle}</h3>
                                <p className="font-serif italic text-lg">{t.successSubtitle}</p>
                                <p className="font-mono text-sm mt-4 opacity-60">{t.successMessage}</p>
                                <button onClick={() => setStatus('idle')} className="mt-8 text-xs underline font-mono uppercase font-bold">{t.successBtn}</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="group">
                                        <label className="block font-mono text-xs uppercase font-bold mb-2">{t.labelName}</label>
                                        <input required type="text" name="name" className="w-full bg-transparent border-b-2 border-daez-ink py-2 font-serif text-2xl focus:outline-none focus:border-daez-blood transition-colors placeholder-gray-400" placeholder={t.placeholderName} />
                                    </div>
                                    <div className="group">
                                        <label className="block font-mono text-xs uppercase font-bold mb-2">{t.labelEmail}</label>
                                        <input required type="email" name="email" className="w-full bg-transparent border-b-2 border-daez-ink py-2 font-serif text-2xl focus:outline-none focus:border-daez-blood transition-colors placeholder-gray-400" placeholder={t.placeholderEmail} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="group">
                                        <label className="block font-mono text-xs uppercase font-bold mb-2">{t.labelProjectType}</label>
                                        <select required name="projectType" className="w-full bg-transparent border-b-2 border-daez-ink py-2 font-serif text-2xl focus:outline-none focus:border-daez-blood transition-colors">
                                            <option value="">{t.selectPlaceholder}</option>
                                            <option value="branding">{t.optionBranding}</option>
                                            <option value="web">{t.optionWeb}</option>
                                            <option value="streetwear">{t.optionStreetwear}</option>
                                            <option value="music">{t.optionMusic}</option>
                                        </select>
                                    </div>
                                    <div className="group">
                                        <label className="block font-mono text-xs uppercase font-bold mb-2">{t.labelBudget}</label>
                                        <select required name="budget" className="w-full bg-transparent border-b-2 border-daez-ink py-2 font-serif text-2xl focus:outline-none focus:border-daez-blood transition-colors">
                                            <option value="">{t.selectPlaceholder}</option>
                                            <option value="100-300">$100 - $300</option>
                                            <option value="300-500">$300 - $500</option>
                                            <option value="500-1000">$500 - $1,000</option>
                                            <option value="1000+">$1,000+</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="block font-mono text-xs uppercase font-bold mb-2">{t.labelDetails}</label>
                                    <textarea required name="message" rows={4} className="w-full bg-gray-100/50 p-4 border-2 border-gray-300 focus:border-daez-ink font-mono text-sm resize-none focus:outline-none transition-colors" placeholder={t.placeholderDetails}></textarea>
                                </div>

                                <div className="flex justify-between items-center pt-6">
                                    <div className="hidden md:block w-32 h-32 rotate-[-12deg] opacity-70 mix-blend-multiply">
                                        <img src="/assets/stamp.svg" alt="Official Stamp" className="w-full h-full object-contain" />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={status === 'sending'}
                                        className="bg-daez-ink text-daez-paper font-display text-3xl px-12 py-4 hover:bg-daez-blood hover:text-white transition-all duration-200 uppercase w-full md:w-auto shadow-[4px_4px_0px_#2CFF05] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                                    >
                                        {status === 'sending' ? t.btnSending : t.btnSubmit}
                                    </button>
                                </div>
                            </form>
                        )}

                        <div className="mt-12 border-t-2 border-daez-ink pt-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <h4 className="font-mono text-xs uppercase font-bold mb-3 text-daez-blood">{t.footerContact}</h4>
                                    <div className="space-y-2 font-mono text-xs">
                                        <p><strong>{t.footerEmail}</strong><br />emanuel@daezdigital.com</p>
                                        <p><strong>{t.footerWhatsapp}</strong><br />
                                            <a href="https://wa.me/584120591116" target="_blank" rel="noopener noreferrer" className="hover:text-daez-blood transition-colors">
                                                +58 412-059-1116
                                            </a>
                                        </p>
                                        <p><strong>{t.footerLocation}</strong><br />{t.footerLocationText}<br /><span className="opacity-60">{t.footerRemote}</span></p>
                                    </div>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <h4 className="font-mono text-xs uppercase font-bold mb-3 text-daez-blood">{t.footerSocial}</h4>
                                    <div className="space-y-2 font-mono text-xs">
                                        <p><a href="https://www.instagram.com/ema.visual" target="_blank" rel="noopener noreferrer" className="hover:text-daez-blood transition-colors">{t.footerInstagram}</a></p>
                                        <p><a href="https://linkedin.com/in/emavisual" target="_blank" rel="noopener noreferrer" className="hover:text-daez-blood transition-colors">{t.footerLinkedIn}</a></p>
                                        <p><a href="https://www.behance.net/emavisual" target="_blank" rel="noopener noreferrer" className="hover:text-daez-blood transition-colors">{t.footerBehance}</a></p>
                                    </div>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <h4 className="font-mono text-xs uppercase font-bold mb-3 text-daez-blood">{t.footerCopyright}</h4>
                                    <div className="flex items-center gap-4">
                                        <div>
                                            <p className="font-mono text-xs">{t.footerCopy}</p>
                                            <p className="font-serif italic text-[9px] mt-2 opacity-60">{t.footerQuote}</p>
                                        </div>
                                        {/* Mobile-only stamp */}
                                        <div className="block md:hidden w-20 h-20 flex-shrink-0 rotate-[-12deg] opacity-70 mix-blend-multiply">
                                            <img src="/assets/stamp.svg" alt="Official Stamp" className="w-full h-full object-contain" />
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default Contact;
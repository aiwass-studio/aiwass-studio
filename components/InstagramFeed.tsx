import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Language, translations } from '../translations';

interface InstagramFeedProps {
    language: Language;
    beholdFeedId?: string; // Optional custom feed ID
}

export const InstagramFeed: React.FC<InstagramFeedProps> = ({
    language,
    beholdFeedId = "K4eRhAkoVQhUKDsc4Tr2"
}) => {
    const t = translations[language];

    // Dynamically inject the Behold widget script on mount
    useEffect(() => {
        const scriptSrc = "https://w.behold.so/widget.js";
        const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);
        
        if (!existingScript) {
            const script = document.createElement("script");
            script.type = "module";
            script.src = scriptSrc;
            document.head.appendChild(script);
        }

        // Poll to hide the branding credit link inside both Light DOM and open Shadow DOM
        const purgeBranding = () => {
            // 1. Light DOM Purge
            const lightBranding = document.querySelectorAll('a.branding, a[href*="behold.so"], a[aria-label="behold"]');
            lightBranding.forEach(el => el.remove());
            
            // 2. Shadow DOM Purge (for behold-widget encapsulated markup)
            const widgets = document.querySelectorAll('behold-widget');
            widgets.forEach(widget => {
                if (widget.shadowRoot) {
                    const shadowBranding = widget.shadowRoot.querySelectorAll('a.branding, a[href*="behold.so"], a[aria-label="behold"]');
                    shadowBranding.forEach(el => el.remove());
                }
            });
        };

        // Run immediately
        purgeBranding();

        // Observe document changes to delete it on insertion
        const observer = new MutationObserver(() => {
            purgeBranding();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        // Fallback interval to ensure it stays removed
        const interval = setInterval(purgeBranding, 200);

        return () => {
            observer.disconnect();
            clearInterval(interval);
        };
    }, []);

    return (
        <section id="instagram" className="relative py-24 bg-[#121212] overflow-hidden border-t-2 border-[#3F04BF]/30">
            {/* Film Grain Overlay */}
            <div
                className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    backgroundSize: '150px 150px',
                }}
            />

            {/* Halftone Pattern Background */}
            <div className="absolute inset-0 opacity-10 bg-halftone-sm bg-[length:8px_8px]" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    {/* Distressed Label */}
                    <div className="inline-block mb-4">
                        <span className="font-mono text-xs tracking-[0.3em] text-aiwass-red uppercase px-3 py-1 border border-aiwass-red">
                            @AIWASS.STUDIO
                        </span>
                    </div>

                    <h2 className="font-display text-5xl md:text-7xl text-aiwass-text uppercase tracking-tight mb-4">
                        {t.instagram?.title || 'INSTAGRAM'}
                    </h2>

                    <p className="font-mono text-sm text-aiwass-text/60 max-w-md mx-auto">
                        {t.instagram?.subtitle || 'TRANSMISIONES DESDE EL CAOS VISUAL'}
                    </p>
                </motion.div>

                {/* Instagram Grid via Behold Widget */}
                <div className="max-w-4xl mx-auto relative z-10 border-2 border-[#3F04BF]/40 bg-black/60 p-4 md:p-6 shadow-2xl">
                    {/* @ts-ignore */}
                    <behold-widget feed-id={beholdFeedId}></behold-widget>
                </div>

                {/* CTA Button */}
                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                >
                    <a
                        href="https://instagram.com/aiwass.studio"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-3 font-mono text-sm text-aiwass-text border-2 border-aiwass-text px-6 py-3 hover:bg-aiwass-purple hover:border-aiwass-purple hover:text-white transition-all duration-300"
                    >
                        <span className="uppercase tracking-wider">
                            {t.instagram?.followButton || 'SEGUIR EN INSTAGRAM'}
                        </span>
                        <svg
                            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                    </a>
                </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-8 left-8 font-mono text-[10px] text-aiwass-text/30 tracking-widest">
                FEED://INSTAGRAM
            </div>
            <div className="absolute bottom-8 right-8 font-mono text-[10px] text-aiwass-text/30 tracking-widest">
                V.2026.01
            </div>
        </section>
    );
};

export default InstagramFeed;

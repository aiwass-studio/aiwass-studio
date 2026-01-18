import React from 'react';
import { motion } from 'framer-motion';
import { translations, Language } from '../translations';

interface BrandsProps {
    language: Language;
}

const logos = [
    'AAPLUS+.webp',
    'CACAO VIVO LOGO PRINCIPAL.webp',
    'CONNEXO ISO WORD O.webp',
    'DAEZ DIGITAL WEB.webp',
    'ECHAME ESE CUENTO LOGOTIPO.svg',
    'EDUFETUS LOGO.svg',
    'El Rincón del Maiz.webp',
    'EyB logo.webp',
    'Imagotipo.webp',
    'Logo orange.webp',
    'LogoSVG.svg',
    'Poción de Luna.webp',
    'SEA GREEN2.webp',
    'SN NEGRO.webp',
    'Textiles Continental.webp',
    'UGLY COOKIES.svg',
    'WORDMARK GREEN.svg',
    'eko.webp',
    'quantum-code.svg'
];

const Brands: React.FC<BrandsProps> = ({ language }) => {
    // Handling potential missing translation safely
    const t = translations[language].brands || { title: 'CLIENTS' };

    return (
        <section id="brands" className="py-24 bg-daez-paper border-b-4 border-daez-ink relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-12 mb-16 text-center">
                <h2 className="font-display text-4xl md:text-5xl text-daez-ink uppercase tracking-wider">
                    {t.title}
                </h2>
            </div>

            <div className="relative w-full overflow-hidden">
                {/* Gradient Masks */}
                <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-daez-paper to-transparent z-10"></div>
                <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-daez-paper to-transparent z-10"></div>

                <div className="flex w-max">
                    <motion.div
                        className="flex gap-16 items-center px-8 py-10"
                        animate={{ x: "-50%" }}
                        transition={{
                            duration: 40,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    >
                        {/* Duplicate the array to ensure seamless looping */}
                        {[...logos, ...logos].map((logo, index) => (
                            <div key={index} className="w-48 h-32 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-80 hover:opacity-100 hover:scale-110">
                                <img
                                    src={`/assets/brands/${logo}`}
                                    alt="Brand Logo"
                                    loading="lazy"
                                    decoding="async"
                                    className="max-w-full max-h-full object-contain"
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Brands;

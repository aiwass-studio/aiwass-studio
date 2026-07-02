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
        <section id="brands" className="py-24 bg-aiwass-bg border-b-4 border-aiwass-text relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-12 mb-16 text-center">
                <h2 className="font-display text-4xl md:text-5xl text-aiwass-text uppercase tracking-wider">
                    {t.title}
                </h2>
            </div>

            <div className="relative w-full overflow-hidden">
                {/* Gradient Masks */}
                <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-aiwass-bg to-transparent z-10"></div>
                <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-aiwass-bg to-transparent z-10"></div>

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
                            <div key={index} className="group w-48 h-32 flex items-center justify-center transition-all duration-300 hover:scale-110">
                                <img
                                    src={`/assets/brands/${logo}`}
                                    alt="Brand Logo"
                                    loading="lazy"
                                    decoding="async"
                                    className="max-w-full max-h-full object-contain brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-300"
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

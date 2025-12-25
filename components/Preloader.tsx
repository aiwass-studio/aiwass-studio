import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const logos = [
    '/assets/loader/logo-ema1.png',
    '/assets/loader/logo-ema2.png',
    '/assets/loader/logo-ema3.png'
];

interface PreloaderProps {
    onLoadComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onLoadComplete }) => {
    const [currentLogoIndex, setCurrentLogoIndex] = useState(0);

    useEffect(() => {
        // Cycle through logos every 600ms
        const logoInterval = setInterval(() => {
            setCurrentLogoIndex((prev) => (prev + 1) % logos.length);
        }, 600);

        // Complete preloader after 2.4 seconds (4 full cycles)
        const completeTimeout = setTimeout(() => {
            onLoadComplete();
        }, 2400);

        return () => {
            clearInterval(logoInterval);
            clearTimeout(completeTimeout);
        };
    }, [onLoadComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[9999] bg-daez-ink flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="relative w-64 h-64 flex items-center justify-center">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentLogoIndex}
                        src={logos[currentLogoIndex]}
                        alt="Loading"
                        className="absolute w-full h-full object-contain"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                    />
                </AnimatePresence>
            </div>

            {/* Optional subtle noise overlay */}
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>
        </motion.div>
    );
};

export default Preloader;

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const logos = [
    '/assets/loader/logo-ema1.webp',
    '/assets/loader/logo-ema2.webp',
    '/assets/loader/logo-ema3.webp'
];

interface PreloaderProps {
    onLoadComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onLoadComplete }) => {
    const [currentLogoIndex, setCurrentLogoIndex] = useState(0);

    // Detect if mobile or slow connection - disable video for performance
    const showVideo = useMemo(() => {
        if (typeof window === 'undefined') return false;

        // Check for mobile device
        const isMobile = window.innerWidth < 768 ||
            /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        // Check for slow connection
        const connection = (navigator as any).connection;
        const isSlowConnection = connection &&
            (connection.saveData || connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        return !isMobile && !isSlowConnection && !prefersReducedMotion;
    }, []);

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
            className="fixed inset-0 z-[9999] bg-daez-ink flex items-center justify-center overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Video Background - Only on desktop with good connection */}
            {showVideo && (
                <div className="absolute inset-0 z-0">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="none"
                        className="w-full h-full object-cover opacity-50"
                    >
                        <source src="/assets/videos/background-pattern.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-black opacity-[0.63]"></div>
                </div>
            )}

            <div className="relative z-10 w-64 h-64 flex items-center justify-center">
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


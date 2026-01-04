import { motion } from 'framer-motion';

interface StaggeredTextProps {
    text: string;
    className?: string;
    delay?: number;
    staggerDelay?: number;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

/**
 * StaggeredText Component - Animates text with staggered word-by-word effect
 * 
 * @param text - Text string to animate
 * @param className - CSS classes for the container
 * @param delay - Initial delay before animation starts (default: 0)
 * @param staggerDelay - Delay between each word animation (default: 0.08)
 * @param as - HTML element type (default: 'div')
 * 
 * @example
 * <StaggeredText 
 *   text="DIRECTED BY EMA VISUAL" 
 *   className="text-4xl font-bold"
 *   delay={0.2}
 * />
 */
export const StaggeredText = ({
    text,
    className = '',
    delay = 0,
    staggerDelay = 0.08,
    as = 'div',
}: StaggeredTextProps) => {
    // Split text into words
    const words = text.split(' ');

    // Animation variants for the container
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: delay,
            },
        },
    };

    // Animation variants for each word
    const wordVariants = {
        hidden: {
            opacity: 0,
            y: 20,
            filter: 'blur(8px)',
        },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
                duration: 0.5,
                ease: [0.25, 0.4, 0.25, 1],
            },
        },
    };

    // Component to render
    const Component = motion[as] as any;

    return (
        <Component
            className={className}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {words.map((word, index) => (
                <motion.span
                    key={`${word}-${index}`}
                    variants={wordVariants}
                    className="inline-block mr-[0.25em] last:mr-0"
                >
                    {word}
                </motion.span>
            ))}
        </Component>
    );
};

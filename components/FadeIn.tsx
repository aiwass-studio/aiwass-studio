import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right';

interface FadeInProps {
    children: ReactNode;
    delay?: number;
    direction?: Direction;
    duration?: number;
    className?: string;
}

/**
 * FadeIn Component - Subtle fade and slide animation
 * 
 * @param children - Content to animate
 * @param delay - Animation delay in seconds (default: 0)
 * @param direction - Direction of slide: 'up' | 'down' | 'left' | 'right' (default: 'up')
 * @param duration - Animation duration in seconds (default: 0.6)
 * @param className - Additional CSS classes
 * 
 * @example
 * <FadeIn direction="up" delay={0.2}>
 *   <h1>Title</h1>
 * </FadeIn>
 */
export const FadeIn = ({
    children,
    delay = 0,
    direction = 'up',
    duration = 0.6,
    className = '',
}: FadeInProps) => {
    // Define the offset based on direction
    const getOffset = (): { x: number; y: number } => {
        const offset = 20; // Subtle offset in pixels

        switch (direction) {
            case 'up':
                return { x: 0, y: offset };
            case 'down':
                return { x: 0, y: -offset };
            case 'left':
                return { x: offset, y: 0 };
            case 'right':
                return { x: -offset, y: 0 };
            default:
                return { x: 0, y: offset };
        }
    };

    const offset = getOffset();

    return (
        <motion.div
            initial={{
                opacity: 0,
                x: offset.x,
                y: offset.y,
            }}
            whileInView={{
                opacity: 1,
                x: 0,
                y: 0,
            }}
            viewport={{
                once: true, // Animation happens only once when element enters viewport
                margin: '-50px', // Start animation slightly before element is visible
            }}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.4, 0.25, 1], // Smooth cubic-bezier easing
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

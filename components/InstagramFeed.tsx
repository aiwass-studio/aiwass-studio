import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Language, translations } from '../translations';

interface InstagramPost {
    id: string;
    mediaUrl: string;
    permalink: string;
    caption?: string;
    mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
    timestamp: string;
}

interface InstagramFeedProps {
    language: Language;
    beholdFeedId?: string; // Your Behold.so Feed ID
    maxPosts?: number;
}

// Demo posts for preview mode (before connecting Behold)
const DEMO_POSTS: InstagramPost[] = [
    {
        id: '1',
        mediaUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
        permalink: 'https://instagram.com',
        caption: 'VISUAL CHAOS',
        mediaType: 'IMAGE',
        timestamp: '2026-01-15T12:00:00Z'
    },
    {
        id: '2',
        mediaUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=400&fit=crop',
        permalink: 'https://instagram.com',
        caption: 'RATED R',
        mediaType: 'IMAGE',
        timestamp: '2026-01-14T12:00:00Z'
    },
    {
        id: '3',
        mediaUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=400&fit=crop',
        permalink: 'https://instagram.com',
        caption: 'STREETWEAR',
        mediaType: 'IMAGE',
        timestamp: '2026-01-13T12:00:00Z'
    },
    {
        id: '4',
        mediaUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop',
        permalink: 'https://instagram.com',
        caption: 'BRANDING',
        mediaType: 'IMAGE',
        timestamp: '2026-01-12T12:00:00Z'
    },
    {
        id: '5',
        mediaUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
        permalink: 'https://instagram.com',
        caption: 'DIRECTING',
        mediaType: 'IMAGE',
        timestamp: '2026-01-11T12:00:00Z'
    },
    {
        id: '6',
        mediaUrl: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=400&fit=crop',
        permalink: 'https://instagram.com',
        caption: 'AUDIO',
        mediaType: 'IMAGE',
        timestamp: '2026-01-10T12:00:00Z'
    },
];

export const InstagramFeed: React.FC<InstagramFeedProps> = ({
    language,
    beholdFeedId,
    maxPosts = 6
}) => {
    const [posts, setPosts] = useState<InstagramPost[]>(DEMO_POSTS);
    const [loading, setLoading] = useState(false);
    const [isDemo, setIsDemo] = useState(true);
    const t = translations[language];

    // Fetch from Behold.so API when Feed ID is provided
    useEffect(() => {
        if (!beholdFeedId) {
            setIsDemo(true);
            setPosts(DEMO_POSTS.slice(0, maxPosts));
            return;
        }

        const fetchInstagramFeed = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://feeds.behold.so/${beholdFeedId}`);
                const data = await response.json();

                if (data && data.posts && Array.isArray(data.posts)) {
                    const formattedPosts: InstagramPost[] = data.posts.slice(0, maxPosts).map((post: any) => ({
                        id: post.id,
                        mediaUrl: post.sizes?.medium?.mediaUrl || post.thumbnailUrl || post.mediaUrl,
                        permalink: post.permalink,
                        caption: post.prunedCaption || post.caption,
                        mediaType: post.mediaType,
                        timestamp: post.timestamp
                    }));
                    setPosts(formattedPosts);
                    setIsDemo(false);
                }
            } catch (error) {
                console.error('Error fetching Instagram feed:', error);
                setPosts(DEMO_POSTS.slice(0, maxPosts));
                setIsDemo(true);
            }
            setLoading(false);
        };

        fetchInstagramFeed();
    }, [beholdFeedId, maxPosts]);

    return (
        <section id="instagram" className="relative py-24 bg-daez-ink overflow-hidden">
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
                        <span className="font-mono text-xs tracking-[0.3em] text-daez-blood uppercase px-3 py-1 border border-daez-blood">
                            @EMAVISUAL
                        </span>
                    </div>

                    <h2 className="font-display text-5xl md:text-7xl text-daez-paper uppercase tracking-tight mb-4">
                        {t.instagram?.title || 'INSTAGRAM'}
                    </h2>

                    <p className="font-mono text-sm text-daez-paper/60 max-w-md mx-auto">
                        {t.instagram?.subtitle || 'TRANSMISIONES DESDE EL CAOS VISUAL'}
                    </p>

                    {/* Demo Mode Indicator */}
                    {isDemo && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-4"
                        >
                            <span className="font-mono text-[10px] text-daez-rust uppercase tracking-wider">
                                [ MODO DEMO - CONECTA BEHOLD.SO PARA VER TU FEED ]
                            </span>
                        </motion.div>
                    )}
                </motion.div>

                {/* Instagram Grid */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="w-8 h-8 border-2 border-daez-blood border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : (
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-4xl mx-auto"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ staggerChildren: 0.1 }}
                    >
                        {posts.map((post, index) => (
                            <InstagramPostCard key={post.id} post={post} index={index} />
                        ))}
                    </motion.div>
                )}

                {/* CTA Button */}
                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                >
                    <a
                        href="https://instagram.com/emavisual"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-3 font-mono text-sm text-daez-paper border-2 border-daez-paper px-6 py-3 hover:bg-daez-blood hover:border-daez-blood hover:text-daez-ink transition-all duration-300"
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
            <div className="absolute top-8 left-8 font-mono text-[10px] text-daez-paper/30 tracking-widest">
                FEED://INSTAGRAM
            </div>
            <div className="absolute bottom-8 right-8 font-mono text-[10px] text-daez-paper/30 tracking-widest">
                V.2026.01
            </div>
        </section>
    );
};

// Individual Post Card with Grindhouse Effects
const InstagramPostCard: React.FC<{ post: InstagramPost; index: number }> = ({ post, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.a
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative aspect-square overflow-hidden group cursor-pointer border-2 border-daez-paper/10 hover:border-daez-blood transition-colors duration-300"
        >
            {/* Image with Grindhouse Filter */}
            <motion.div
                className="absolute inset-0"
                animate={{
                    scale: isHovered ? 1.1 : 1,
                    filter: isHovered
                        ? 'grayscale(0%) contrast(120%) saturate(120%)'
                        : 'grayscale(60%) contrast(110%) saturate(80%)'
                }}
                transition={{ duration: 0.4 }}
            >
                <img
                    src={post.mediaUrl}
                    alt={post.caption || 'Instagram post'}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
            </motion.div>

            {/* Halftone Overlay */}
            <div
                className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-30 transition-opacity duration-300 group-hover:opacity-10"
                style={{
                    backgroundImage: 'radial-gradient(circle, #121212 1px, transparent 1px)',
                    backgroundSize: '4px 4px'
                }}
            />

            {/* Scan Lines Effect */}
            <div
                className="absolute inset-0 pointer-events-none opacity-20 group-hover:opacity-10 transition-opacity"
                style={{
                    background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)'
                }}
            />

            {/* Green Tint Overlay on Hover */}
            <motion.div
                className="absolute inset-0 bg-daez-blood pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 0.15 : 0 }}
                transition={{ duration: 0.3 }}
            />

            {/* Caption Overlay */}
            <motion.div
                className="absolute inset-0 flex items-end justify-start p-3 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            >
                <div className="bg-daez-ink/90 px-2 py-1">
                    <span className="font-mono text-[10px] text-daez-blood uppercase tracking-wider">
                        {post.caption?.slice(0, 30) || 'VIEW POST'}
                        {(post.caption?.length || 0) > 30 && '...'}
                    </span>
                </div>
            </motion.div>

            {/* Corner Marks (Film Frame Effect) */}
            <div className="absolute top-1 left-1 w-3 h-3 border-l border-t border-daez-paper/30 group-hover:border-daez-blood transition-colors" />
            <div className="absolute top-1 right-1 w-3 h-3 border-r border-t border-daez-paper/30 group-hover:border-daez-blood transition-colors" />
            <div className="absolute bottom-1 left-1 w-3 h-3 border-l border-b border-daez-paper/30 group-hover:border-daez-blood transition-colors" />
            <div className="absolute bottom-1 right-1 w-3 h-3 border-r border-b border-daez-paper/30 group-hover:border-daez-blood transition-colors" />

            {/* Glitch Effect on Hover */}
            {isHovered && (
                <>
                    <motion.div
                        className="absolute inset-0 bg-red-500/10 pointer-events-none"
                        animate={{
                            x: [0, -2, 2, 0],
                            opacity: [0, 0.3, 0.3, 0]
                        }}
                        transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 0.5 }}
                    />
                    <motion.div
                        className="absolute inset-0 bg-cyan-500/10 pointer-events-none"
                        animate={{
                            x: [0, 2, -2, 0],
                            opacity: [0, 0.3, 0.3, 0]
                        }}
                        transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 0.5, delay: 0.1 }}
                    />
                </>
            )}
        </motion.a>
    );
};

export default InstagramFeed;

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from './UI';
import { translations, Language } from '../translations';

interface SkillsProps {
    language: Language;
}

const Skills: React.FC<SkillsProps> = ({ language }) => {
    const t = translations[language].skills;

    // Custom Logos as SVGs
    const getIcon = (id: string) => {
        switch (id) {
            case 'ai':
                return <img src="/assets/skills/illustrator.png" alt="Adobe Illustrator" className="w-8 h-8 object-contain" />;
            case 'ps':
                return <img src="/assets/skills/photoshop.png" alt="Adobe Photoshop" className="w-8 h-8 object-contain" />;
            case 'wp':
                return <img src="/assets/skills/wordpress.png" alt="WordPress" className="w-8 h-8 object-contain" />;
            case 'gemini':
                return <img src="/assets/skills/gemini.png" alt="Gemini AI" className="w-8 h-8 object-contain" />;
            default:
                return null;
        }
    };

    return (
        <section id="skills" className="py-24 px-4 md:px-12 bg-daez-ink text-daez-paper relative overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <SectionHeader title={t.title} subtitle={t.subtitle} inverse />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 mt-16">

                    {/* Skills Column */}
                    <div className="space-y-12">
                        <h3 className="font-display text-4xl text-[#2CFF05]">{t.section1}</h3>
                        <div className="space-y-8">
                            {t.list1.map((skill: any, index: number) => (
                                <div key={index}>
                                    <div className="flex justify-between mb-2 font-mono text-sm tracking-widest uppercase">
                                        <span>{skill.name}</span>
                                    </div>
                                    <div className="h-4 bg-gray-800 border border-gray-700 relative overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${skill.level}%` }}
                                            transition={{ duration: 1.5, ease: "easeOut", delay: index * 0.1 }}
                                            viewport={{ once: true }}
                                            className="h-full bg-[#2CFF05] relative"
                                        >
                                            {/* Glitch stripes */}
                                            <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,#000_2px,#000_4px)] opacity-10"></div>
                                        </motion.div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tools Column */}
                    <div className="space-y-12">
                        <h3 className="font-display text-4xl text-[#2CFF05]">{t.section2}</h3>
                        <div className="space-y-8">
                            {t.list2.map((tool: any, index: number) => (
                                <div key={index}>
                                    <div className="flex justify-between mb-2 font-mono text-sm tracking-widest uppercase items-center">
                                        <div className="flex items-center gap-3">
                                            {getIcon(tool.id)}
                                            <span>{tool.name}</span>
                                        </div>
                                    </div>
                                    <div className="h-4 bg-gray-800 border border-gray-700 relative overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${tool.level}%` }}
                                            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 + (index * 0.1) }}
                                            viewport={{ once: true }}
                                            className="h-full bg-white relative"
                                        >
                                            {/* Glitch stripes */}
                                            <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,#2CFF05_2px,#2CFF05_4px)] opacity-20"></div>
                                        </motion.div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            {/* Background Decor */}
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#2CFF05] rounded-full blur-[120px] opacity-10 pointer-events-none"></div>
        </section>
    );
};

export default Skills;

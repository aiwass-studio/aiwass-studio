import React from 'react';
import { SectionHeader } from './UI';
import { translations, Language } from '../translations';

interface WorkProps {
  language: Language;
}

interface Project {
  id: number;
  title: string;
  genre: string;
  director: string;
  runtime: string;
  image: string;
  year: string;
  link: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'EL RINCÓN DEL MAÍZ',
    genre: 'BRANDING',
    director: 'AIWASS STUDIO',
    runtime: '2025',
    image: '/assets/work/el-rincon-del-maiz.webp',
    year: '2025',
    link: 'https://www.behance.net/gallery/233095927/El-Rincon-del-Maiz-Branding-Logo-Design'
  },
  {
    id: 2,
    title: 'CONNEXO',
    genre: 'BRANDING • PACKAGING • WEB',
    director: 'AIWASS STUDIO',
    runtime: '2025',
    image: '/assets/work/connexo.webp',
    year: '2025',
    link: 'https://www.behance.net/gallery/232163545/Connexo-Branding-Technology-NFC-Company'
  },
  {
    id: 3,
    title: 'KANAMIT CULT',
    genre: 'STREETWEAR BRANDING',
    director: 'AIWASS STUDIO',
    runtime: '2025',
    image: '/assets/work/kanamit-cult.webp',
    year: '2025',
    link: 'https://www.behance.net/gallery/231942751/Kanamit-Cult-Streetwear-Branding'
  },
  {
    id: 4,
    title: 'NÁTURAL',
    genre: 'BRANDING',
    director: 'AIWASS STUDIO',
    runtime: '2024',
    image: '/assets/work/natural.webp',
    year: '2024',
    link: 'https://www.behance.net/gallery/215422833/NATURAL-JEWELRY-LOGO-DESIGN'
  },
  {
    id: 5,
    title: 'ANTIMONIO',
    genre: 'STREETWEAR DESIGN',
    director: 'AIWASS STUDIO',
    runtime: '2023',
    image: '/assets/work/antimonio.webp',
    year: '2023',
    link: 'https://www.behance.net/gallery/184376243/ANTIMONIO-STREETWEAR-DESIGN-T-SHIRT'
  },
  {
    id: 6,
    title: 'LA BÚSQUEDA',
    genre: 'PODCAST BRANDING',
    director: 'AIWASS STUDIO',
    runtime: '2022',
    image: '/assets/work/la-busqueda.webp',
    year: '2022',
    link: 'https://www.behance.net/gallery/178679695/La-Busqueda-Podcast-Visual-identity'
  },
];

const Work: React.FC<WorkProps> = ({ language }) => {
  const t = translations[language].work;

  return (
    <section id="work" className="py-24 px-4 md:px-12 bg-aiwass-bg text-aiwass-text relative">
      <SectionHeader title={t.title} subtitle={t.subtitle} />

      {/* Grid Layout - WHEATPASTE / STREET STYLE (Restored) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-8 px-4">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`group relative ${index % 2 === 0 ? 'md:rotate-1' : 'md:-rotate-1'} hover:rotate-0 transition-transform duration-500`}
          >

            {/* Tape Effect */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-aiwass-text/15 border border-white/5 opacity-90 rotate-[-1deg] shadow-sm z-20 pointer-events-none"></div>

            {/* Card Container */}
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block relative bg-aiwass-bg border-4 border-aiwass-text p-2 shadow-[8px_8px_0px_#3F04BF] group-hover:shadow-[12px_12px_0px_#F21B42] group-hover:border-aiwass-red transition-all duration-300"
            >

              {/* Image */}
              <div className="relative overflow-hidden aspect-[3/4] border-2 border-aiwass-text">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 group-hover:scale-110 transition-all duration-700 ease-out"
                />
              </div>

              {/* Info Block */}
              <div className="mt-4 text-center relative">
                <h3 className="font-display text-3xl leading-none uppercase tracking-tighter mb-1 relative z-10 group-hover:text-aiwass-red transition-colors">
                  {project.title}
                </h3>
                <p className="font-mono text-xs uppercase tracking-widest opacity-70">
                  {project.genre}
                </p>

                {/* "Sticker" details */}
                <div className="absolute -right-4 -bottom-6 bg-[#121212] text-aiwass-text font-mono text-[10px] px-2 py-1 rotate-[-10deg] border border-aiwass-text group-hover:border-aiwass-red group-hover:text-aiwass-red transition-colors">
                  {project.runtime}
                </div>
              </div>
            </a>

          </div>
        ))}
      </div>

    </section>
  );
};

export default Work;
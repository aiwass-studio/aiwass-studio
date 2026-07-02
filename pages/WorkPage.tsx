import { useEffect, useRef } from "react";
import { translations, Language } from "../translations";
import gsap from "gsap";

// 1. ARRAY DE DATOS REALES (Preservando los datos originales del proyecto de forma estricta)
const REAL_PROJECTS = [
  {
    id: "01",
    title: "EL RINCÓN DEL MAÍZ",
    client: "El Rincón del Maíz",
    services: "Branding",
    year: "2025",
    imageUrl: "/assets/work/el-rincon-del-maiz.webp"
  },
  {
    id: "02",
    title: "CONNEXO",
    client: "Connexo",
    services: "Branding • Packaging • Web",
    year: "2025",
    imageUrl: "/assets/work/connexo.webp"
  },
  {
    id: "03",
    title: "KANAMIT CULT",
    client: "Kanamit Cult",
    services: "Streetwear Branding",
    year: "2025",
    imageUrl: "/assets/work/kanamit-cult.webp"
  },
  {
    id: "04",
    title: "NÁTURAL",
    client: "Nátural",
    services: "Branding",
    year: "2024",
    imageUrl: "/assets/work/natural.webp"
  },
  {
    id: "05",
    title: "ANTIMONIO",
    client: "Antimonio",
    services: "Streetwear Design",
    year: "2023",
    imageUrl: "/assets/work/antimonio.webp"
  },
  {
    id: "06",
    title: "LA BÚSQUEDA",
    client: "La Búsqueda",
    services: "Podcast Branding",
    year: "2022",
    imageUrl: "/assets/work/la-busqueda.webp"
  }
];

interface WorkPageProps {
  language: Language;
}

export default function WorkPage({ language }: WorkPageProps) {
  const t = translations[language];
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="w-full min-h-screen bg-[#0A0A0A] pt-32 pb-24 px-4 md:px-12 text-[#F2EFE9] font-sans overflow-x-hidden">
      {/* Cabecera Brutalista de la Página */}
      <div className="w-full border-b-2 border-[#3F04BF] pb-8 mb-16">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#F21B42]">
          [ LOG // ARCHIVE ]
        </span>
        <h1 className="font-display text-5xl md:text-8xl uppercase tracking-tighter text-[#F2EFE9] mt-2">
          {t.work.title}
        </h1>
      </div>

      {/* Grilla Industrial Estricta */}
      <div className="flex flex-col w-full border-t-2 border-[#3F04BF]">
        {REAL_PROJECTS.map((project) => (
          <div 
            key={project.id}
            className="group grid grid-cols-1 md:grid-cols-12 w-full border-b-2 border-[#3F04BF] transition-colors duration-200 hover:border-[#F21B42]"
          >
            {/* Panel Izquierdo: Ficha Técnica (Metadata Panel al estilo Solarity) */}
            <div className="md:col-span-4 p-6 md:p-8 flex flex-col justify-between bg-[#0A0A0A] border-b-2 md:border-b-0 md:border-r-2 border-[#3F04BF]/40 transition-colors duration-200 group-hover:border-r-[#F21B42]/40">
              <div>
                <span className="font-mono text-xs text-[#F21B42] block mb-2 font-bold">
                  // CASE STUDY {project.id}
                </span>
                <h2 className="font-display text-3xl md:text-5xl uppercase tracking-tighter text-[#F2EFE9] group-hover:text-[#F21B42] transition-colors duration-200">
                  {project.title}
                </h2>
              </div>

              {/* Bloque de Especificaciones */}
              <div className="flex flex-col gap-2 mt-8 md:mt-0 font-mono text-xs tracking-wide text-[#F2EFE9]/60">
                <div className="grid grid-cols-3 border-b border-[#3F04BF]/20 pb-1">
                  <span className="text-[#3F04BF] font-bold">CLIENT:</span>
                  <span className="col-span-2 text-[#F2EFE9] uppercase">{project.client}</span>
                </div>
                <div className="grid grid-cols-3 border-b border-[#3F04BF]/20 pb-1">
                  <span className="text-[#3F04BF] font-bold">YEAR:</span>
                  <span className="col-span-2 text-[#F2EFE9]">{project.year}</span>
                </div>
                <div className="grid grid-cols-3 pt-1">
                  <span className="text-[#3F04BF] font-bold">SERVICES:</span>
                  <span className="col-span-2 text-[#F2EFE9]/90 normal-case leading-relaxed">{project.services}</span>
                </div>
              </div>
            </div>

            {/* Panel Derecho: Contenedor Visual de Gran Formato */}
            <div className="md:col-span-8 overflow-hidden relative min-h-[350px] md:min-h-[480px] bg-[#121212]">
              {/* Imagen del Proyecto */}
              <img 
                src={project.imageUrl} 
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.01] filter grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100"
                onError={(e) => {
                  // Fallback visual si no encuentra la imagen real para que no quede roto
                  e.currentTarget.style.display = 'none';
                }}
              />
              {/* Overlay de diseño brutalista en la esquina */}
              <div className="absolute bottom-4 right-4 bg-[#0A0A0A] border border-[#3F04BF] px-3 py-1 font-mono text-[10px] text-[#F2EFE9]/40 tracking-widest uppercase z-10">
                [ VIEW ARCHIVE ]
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

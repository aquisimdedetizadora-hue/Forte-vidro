import React, { useState } from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import facadePhoto from '../assets/forte-vidros-fachada.jpg';

/**
 * Fotografia real da fachada da Forte Vidros em Matupá - MT.
 * Suporta importação direta de asset pelo Vite e fallbacks públicos.
 */
export const HERO_FACADE_IMAGE = facadePhoto || '/images/forte-vidros-fachada.jpg';

export const Hero: React.FC = () => {
  const [imgSrc, setImgSrc] = useState<string>(HERO_FACADE_IMAGE);

  return (
    <section
      id="hero-section"
      className="relative w-full min-h-screen bg-white text-[#000000] flex items-center select-auto pt-20"
    >
      <div className="w-full max-w-[1440px] mx-auto px-[5vw] py-16 sm:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-center">
          {/* Coluna Esquerda: Conteúdo Editorial Minimalista */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* EYEBROW */}
            <span className="text-xs sm:text-sm font-semibold tracking-[0.22em] text-[#86868B] uppercase mb-4 sm:mb-6 block select-none">
              FORTE VIDROS
            </span>

            {/* HEADLINE */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] xl:text-[76px] font-bold tracking-tight text-[#000000] leading-[1.06] mb-6 sm:mb-8">
              ARQUITETURA QUE VALORIZA CADA DETALHE.
            </h1>

            {/* DESCRIÇÃO */}
            <p className="text-base sm:text-lg text-[#86868B] font-normal leading-relaxed max-w-xl mb-8 sm:mb-10">
              Esquadrias em alumínio e vidro temperado para projetos que unem estética, precisão e qualidade.
            </p>

            {/* CTA PRINCIPAL (WhatsApp Oficial) */}
            <div className="mb-6 sm:mb-8">
              <a
                id="hero-cta-whatsapp"
                href="https://wa.me/5566992557597"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#1677FF] hover:bg-[#0f62d8] text-white font-medium text-sm sm:text-base tracking-wide transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer group"
              >
                <span>Falar com a Forte Vidros</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </div>

            {/* LOCALIZAÇÃO */}
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#86868B] font-medium tracking-wide">
              <MapPin className="w-4 h-4 text-[#86868B] shrink-0" />
              <span>Matupá — MT e região</span>
            </div>
          </div>

          {/* Coluna Direita: Área da Fotografia da Fachada */}
          <div className="lg:col-span-5 w-full">
            <div className="w-full aspect-[4/3] rounded-xl overflow-hidden border border-[#D2D2D7] bg-[#F5F5F7] relative flex items-center justify-center transition-all duration-300 shadow-sm group">
              <div
                id="facade-photo-placeholder"
                className="w-full h-full relative overflow-hidden"
              >
                <img
                  id="facade-photo-img"
                  src={imgSrc}
                  onError={() => {
                    if (imgSrc !== '/images/forte-vidros-fachada.jpg') {
                      setImgSrc('/images/forte-vidros-fachada.jpg');
                    } else if (imgSrc !== '/assets/aistudio/forte-vidros-fachada.jpg') {
                      setImgSrc('/assets/aistudio/forte-vidros-fachada.jpg');
                    }
                  }}
                  alt="Fachada da Forte Vidros em Matupá — MT"
                  className="w-full h-full object-cover select-none transition-transform duration-500 group-hover:scale-105"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

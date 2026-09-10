import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';

export const About: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {
        // Políticas de autoplay do navegador
      });
    }
  }, []);
  return (
    <motion.section
      id="about-section"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full bg-white text-[#000000] py-24 sm:py-32 lg:py-36 border-t border-[#D2D2D7]/60 select-auto"
    >
      <div className="w-full max-w-[1440px] mx-auto px-[5vw]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 xl:gap-24 items-start">
          
          {/* Coluna Esquerda: Headline Institucional e Descrição */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* EYEBROW */}
            <span className="text-xs sm:text-sm font-semibold tracking-[0.22em] text-[#86868B] uppercase mb-4 sm:mb-6 block select-none">
              SOBRE A FORTE VIDROS
            </span>

            {/* HEADLINE GRANDE */}
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-[54px] xl:text-[62px] font-bold tracking-tight text-[#000000] leading-[1.04] mb-8 sm:mb-10">
              UMA EMPRESA QUE TRANSFORMA PROJETOS EM ESPAÇOS.
            </h2>

            {/* TEXTO INSTITUCIONAL CURTO */}
            <p className="text-base sm:text-lg lg:text-xl text-[#86868B] font-normal leading-relaxed max-w-xl">
              A Forte Vidros atua com esquadrias em alumínio e vidro temperado, levando precisão, qualidade e acabamento para projetos em Matupá e região.
            </p>
          </div>

          {/* Coluna Direita: Informações Objetivas + Elemento Arquitetônico Discreto */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div className="space-y-8 sm:space-y-10">
              
              {/* BLOCO: O QUE FAZEMOS */}
              <div>
                <span className="text-xs font-semibold tracking-[0.22em] text-[#86868B] uppercase block mb-3 select-none">
                  O QUE FAZEMOS
                </span>
                <ul className="space-y-2 text-lg sm:text-xl font-medium text-[#000000]">
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#000000]" />
                    <span>Esquadrias em alumínio</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#000000]" />
                    <span>Vidro temperado</span>
                  </li>
                </ul>
              </div>

              {/* DIVISOR SUTIL */}
              <div className="w-full h-px bg-[#D2D2D7]" />

              {/* BLOCO: ONDE ESTAMOS */}
              <div>
                <span className="text-xs font-semibold tracking-[0.22em] text-[#86868B] uppercase block mb-3 select-none">
                  ONDE ESTAMOS
                </span>
                <div className="space-y-1">
                  <p className="text-lg sm:text-xl font-medium text-[#000000]">
                    Matupá — MT
                  </p>
                  <p className="text-sm sm:text-base text-[#86868B] font-normal">
                    Atendimento em toda a região
                  </p>
                </div>
              </div>
            </div>

            {/* ELEMENTO EM VÍDEO (Looping Infinito - Execução & Processo) */}
            <div
              id="architectural-schematic-element"
              className="mt-12 pt-8 border-t border-[#D2D2D7]/60"
            >
              <div className="w-full bg-[#F5F5F7] rounded-xl border border-[#D2D2D7] p-3 sm:p-4 flex flex-col gap-3 shadow-sm group">
                {/* Vídeo em looping infinito */}
                <div className="w-full aspect-[16/9] rounded-lg overflow-hidden bg-black relative">
                  <video
                    ref={videoRef}
                    id="about-loop-video"
                    src="/assets/aistudio/forte-vidros-loop.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls={false}
                    preload="auto"
                    className="w-full h-full object-cover select-none"
                    aria-label="Vídeo em looping contínuo da Forte Vidros"
                  />
                </div>

                {/* Rótulo técnico discreto */}
                <div className="flex items-center justify-between px-1 text-[11px] font-medium tracking-[0.18em] text-[#86868B] uppercase">
                  <span>EXECUÇÃO & PRECISÃO</span>
                  <span>FORTE VIDROS EM AÇÃO</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </motion.section>
  );
};

import React from 'react';
import { motion } from 'motion/react';

export const About: React.FC = () => {
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

            {/* ELEMENTO ARQUITETÔNICO DISCRETO (Diagrama Técnico Linear Minimalista) */}
            <div
              id="architectural-schematic-element"
              className="mt-12 pt-8 border-t border-[#D2D2D7]/60"
            >
              <div className="w-full bg-[#F5F5F7] rounded-xl border border-[#D2D2D7] p-5 sm:p-6 flex flex-col gap-4">
                
                {/* SVG Técnico Linear representando esquadria de alumínio e folha de vidro com cotas */}
                <svg
                  viewBox="0 0 360 140"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-auto text-[#000000]"
                >
                  {/* Linhas de grade técnica de fundo (Grid milimétrico) */}
                  <line x1="20" y1="20" x2="340" y2="20" stroke="#D2D2D7" strokeWidth="0.75" strokeDasharray="3 3" />
                  <line x1="20" y1="120" x2="340" y2="120" stroke="#D2D2D7" strokeWidth="0.75" strokeDasharray="3 3" />
                  <line x1="20" y1="20" x2="20" y2="120" stroke="#D2D2D7" strokeWidth="0.75" strokeDasharray="3 3" />
                  <line x1="340" y1="20" x2="340" y2="120" stroke="#D2D2D7" strokeWidth="0.75" strokeDasharray="3 3" />

                  {/* Marco estrutural externo (Perfil de Alumínio) */}
                  <rect x="35" y="25" width="290" height="90" rx="1" stroke="#000000" strokeWidth="1.25" />
                  
                  {/* Perfil interno de vedação e folha móvel */}
                  <rect x="42" y="32" width="276" height="76" stroke="#86868B" strokeWidth="0.75" />

                  {/* Painel de Vidro Temperado com reflexo sutil de 45 graus */}
                  <rect x="48" y="38" width="264" height="64" fill="#FFFFFF" stroke="#D2D2D7" strokeWidth="0.5" />
                  <line x1="160" y1="42" x2="190" y2="98" stroke="#D2D2D7" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="175" y1="42" x2="205" y2="98" stroke="#D2D2D7" strokeWidth="1" strokeDasharray="4 4" />

                  {/* Eixo do pivô / alinhamento vertical com acento azul de precisão (#1677FF) */}
                  <line x1="110" y1="20" x2="110" y2="120" stroke="#1677FF" strokeWidth="1" strokeDasharray="2 2" />
                  <circle cx="110" cy="25" r="2.5" fill="#1677FF" />
                  <circle cx="110" cy="115" r="2.5" fill="#1677FF" />

                  {/* Marcas de cota arquitetônica nas extremidades */}
                  <line x1="30" y1="25" x2="35" y2="25" stroke="#86868B" strokeWidth="1" />
                  <line x1="30" y1="115" x2="35" y2="115" stroke="#86868B" strokeWidth="1" />
                  <line x1="32.5" y1="25" x2="32.5" y2="115" stroke="#86868B" strokeWidth="0.75" />

                  <line x1="35" y1="125" x2="35" y2="120" stroke="#86868B" strokeWidth="1" />
                  <line x1="325" y1="125" x2="325" y2="120" stroke="#86868B" strokeWidth="1" />
                  <line x1="35" y1="122.5" x2="325" y2="122.5" stroke="#86868B" strokeWidth="0.75" />

                  {/* Marcação de cruz de precisão (+) nos cantos técnicos */}
                  <path d="M18 18 H22 M20 16 V20" stroke="#86868B" strokeWidth="0.75" />
                  <path d="M338 18 H342 M340 16 V20" stroke="#86868B" strokeWidth="0.75" />
                  <path d="M18 122 H22 M20 120 V124" stroke="#86868B" strokeWidth="0.75" />
                  <path d="M338 122 H342 M340 120 V124" stroke="#86868B" strokeWidth="0.75" />
                </svg>

                {/* Rótulo técnico discreto */}
                <div className="flex items-center justify-between text-[11px] font-medium tracking-[0.18em] text-[#86868B] uppercase">
                  <span>ESTRUTURA & ESQUADRIA</span>
                  <span>DETALHE TÉCNICO // PRECISÃO</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </motion.section>
  );
};

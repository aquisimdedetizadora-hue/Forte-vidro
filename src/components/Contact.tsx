import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, MapPin, Instagram, ExternalLink } from 'lucide-react';

export const Contact: React.FC = () => {
  const whatsappUrl = 'https://wa.me/5566992557597';
  const mapsUrl = 'https://maps.app.goo.gl/aWDzqSnGax1ak5vE8';
  const instagramUrl = 'https://instagram.com/fortevidrooficial';

  return (
    <motion.section
      id="contact-section"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full bg-[#000000] text-[#FFFFFF] pt-24 sm:pt-32 lg:pt-36 pb-12 sm:pb-16 select-auto"
    >
      <div className="w-full max-w-[1440px] mx-auto px-[5vw]">
        
        {/* Grid Principal: Conteúdo & Contatos (Esquerda) vs. Google Maps (Direita) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 xl:gap-24 items-start pb-20 sm:pb-28 border-b border-[#2A2A2A]">
          
          {/* Coluna Esquerda: Headline & Informações de Contato */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* EYEBROW */}
            <span className="text-xs sm:text-sm font-semibold tracking-[0.22em] text-[#86868B] uppercase mb-4 sm:mb-6 block select-none">
              FALE COM A FORTE VIDROS
            </span>

            {/* HEADLINE */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-bold tracking-tight text-[#FFFFFF] leading-[1.02] mb-6 sm:mb-8">
              SEU PROJETO<br />COMEÇA AQUI.
            </h2>

            {/* TEXTO DE APOIO */}
            <p className="text-base sm:text-lg text-[#86868B] font-normal leading-relaxed max-w-xl mb-12 sm:mb-16">
              Fale com a nossa equipe, visite nossa loja ou encontre a Forte Vidros no mapa.
            </p>

            {/* ESTRUTURA EDITORIAL DE CONTATOS */}
            <div className="w-full space-y-10 sm:space-y-12">
              
              {/* BLOCO WHATSAPP (CTA PRINCIPAL) */}
              <div className="space-y-4">
                <span className="text-xs font-semibold tracking-[0.22em] text-[#86868B] uppercase block select-none">
                  WHATSAPP
                </span>
                <p className="text-2xl sm:text-3xl font-medium tracking-tight text-[#FFFFFF]">
                  +55 66 99255-7597
                </p>
                <div>
                  <a
                    id="contact-cta-whatsapp"
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Falar no WhatsApp com a Forte Vidros"
                    className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#1677FF] hover:bg-[#0f62d8] text-white font-medium text-sm sm:text-base tracking-wide transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer group"
                  >
                    <span>Falar no WhatsApp</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </a>
                </div>
              </div>

              {/* DIVISOR SUTIL */}
              <div className="w-full h-px bg-[#2A2A2A]" />

              {/* BLOCO INSTAGRAM */}
              <div className="space-y-2">
                <span className="text-xs font-semibold tracking-[0.22em] text-[#86868B] uppercase block select-none">
                  INSTAGRAM
                </span>
                <div className="flex items-center gap-3">
                  <Instagram className="w-5 h-5 text-[#86868B]" />
                  <p className="text-lg sm:text-xl font-medium text-[#FFFFFF]">
                    @fortevidrooficial
                  </p>
                </div>
                <div>
                  <a
                    id="contact-link-instagram"
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Abrir perfil da Forte Vidros no Instagram"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#86868B] hover:text-[#FFFFFF] transition-colors duration-200 group mt-1"
                  >
                    <span>Instagram</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>

              {/* DIVISOR SUTIL */}
              <div className="w-full h-px bg-[#2A2A2A]" />

              {/* BLOCO LOCALIZAÇÃO */}
              <div className="space-y-2">
                <span className="text-xs font-semibold tracking-[0.22em] text-[#86868B] uppercase block select-none">
                  LOCALIZAÇÃO
                </span>
                <div className="text-base sm:text-lg font-medium text-[#FFFFFF] leading-relaxed">
                  <p>Rua 09, 525 — Centro</p>
                  <p>Matupá — MT</p>
                  <p className="text-[#86868B] font-normal text-sm sm:text-base">78525-000</p>
                </div>
              </div>

            </div>
          </div>

          {/* Coluna Direita: Bloco Visual do Google Maps */}
          <div className="lg:col-span-5 w-full">
            <div className="w-full flex flex-col gap-4">
              
              {/* Cartão Visual de Localização (Clicável para abrir no Google Maps) */}
              <a
                id="contact-map-card"
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir localização da Vidraçaria Forte Vidros no Google Maps"
                className="group block w-full rounded-xl overflow-hidden border border-[#2A2A2A] hover:border-[#444444] bg-[#111111] transition-all duration-300 relative cursor-pointer"
              >
                {/* Visual Arquitetônico Minimalista do Mapa (Grid de Matupá e Marcador) */}
                <div className="relative w-full aspect-[4/3] min-h-[300px] sm:min-h-[360px] bg-[#0d0d0d] flex items-center justify-center overflow-hidden">
                  
                  {/* Grade geométrica representando o traçado urbano ortogonal de Matupá */}
                  <svg
                    className="absolute inset-0 w-full h-full opacity-40 group-hover:opacity-60 transition-opacity duration-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 500 380"
                    fill="none"
                  >
                    {/* Quadras e vias de fundo */}
                    <rect x="0" y="0" width="500" height="380" fill="#0c0c0c" />
                    
                    {/* Linhas de quarteirões ortogonais */}
                    <line x1="0" y1="60" x2="500" y2="60" stroke="#1f1f1f" strokeWidth="1.5" />
                    <line x1="0" y1="120" x2="500" y2="120" stroke="#1f1f1f" strokeWidth="1.5" />
                    <line x1="0" y1="180" x2="500" y2="180" stroke="#2a2a2a" strokeWidth="2.5" />
                    <line x1="0" y1="240" x2="500" y2="240" stroke="#1f1f1f" strokeWidth="1.5" />
                    <line x1="0" y1="300" x2="500" y2="300" stroke="#1f1f1f" strokeWidth="1.5" />

                    <line x1="80" y1="0" x2="80" y2="380" stroke="#1f1f1f" strokeWidth="1.5" />
                    <line x1="160" y1="0" x2="160" y2="380" stroke="#1f1f1f" strokeWidth="1.5" />
                    <line x1="250" y1="0" x2="250" y2="380" stroke="#2a2a2a" strokeWidth="2.5" />
                    <line x1="340" y1="0" x2="340" y2="380" stroke="#1f1f1f" strokeWidth="1.5" />
                    <line x1="420" y1="0" x2="420" y2="380" stroke="#1f1f1f" strokeWidth="1.5" />

                    {/* Destaque das vias principais de acesso */}
                    <text x="256" y="28" fill="#444444" fontSize="9" letterSpacing="0.15em" fontFamily="sans-serif">AV. HERMÍNIO OMETTO</text>
                    <text x="20" y="174" fill="#444444" fontSize="9" letterSpacing="0.15em" fontFamily="sans-serif">RUA 09 // CENTRO</text>

                    {/* Geometrias de lotes */}
                    <rect x="90" y="70" width="60" height="40" fill="#141414" stroke="#222222" strokeWidth="0.5" />
                    <rect x="170" y="70" width="70" height="40" fill="#141414" stroke="#222222" strokeWidth="0.5" />
                    <rect x="260" y="70" width="70" height="40" fill="#141414" stroke="#222222" strokeWidth="0.5" />
                    <rect x="170" y="130" width="70" height="40" fill="#141414" stroke="#222222" strokeWidth="0.5" />
                    <rect x="260" y="130" width="70" height="40" fill="#1677FF" fillOpacity="0.08" stroke="#1677FF" strokeWidth="1" />
                    <rect x="170" y="190" width="70" height="40" fill="#141414" stroke="#222222" strokeWidth="0.5" />
                    <rect x="260" y="190" width="70" height="40" fill="#141414" stroke="#222222" strokeWidth="0.5" />

                    {/* Círculos de pulso e radar sobre a localização exata */}
                    <circle cx="260" cy="180" r="32" stroke="#1677FF" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                    <circle cx="260" cy="180" r="16" stroke="#1677FF" strokeWidth="1" opacity="0.6" />
                  </svg>

                  {/* Pin Central da Forte Vidros */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
                    <div className="relative flex items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-[#1677FF] opacity-30"></span>
                      <div className="relative w-9 h-9 rounded-full bg-[#1677FF] flex items-center justify-center text-white shadow-lg border-2 border-[#000000]">
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Badge Discreta Sobreposta no Topo */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <div className="px-3.5 py-2 rounded-lg bg-[#000000]/85 backdrop-blur-md border border-[#2A2A2A] text-left">
                      <span className="text-[11px] font-semibold tracking-wider text-[#FFFFFF] block uppercase">
                        VIDRAÇARIA FORTE VIDROS
                      </span>
                      <span className="text-[10px] text-[#86868B] block">
                        Rua 09, 525 — Matupá, MT
                      </span>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-[#000000]/80 border border-[#2A2A2A] flex items-center justify-center text-[#86868B] group-hover:text-[#FFFFFF] group-hover:border-[#444444] transition-colors">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Legenda de clique no rodapé do cartão */}
                  <div className="absolute bottom-3 right-4 pointer-events-none">
                    <span className="text-[10px] tracking-wider text-[#86868B] uppercase font-medium bg-[#000000]/80 px-2.5 py-1 rounded border border-[#2A2A2A]">
                      Google Maps Interativo
                    </span>
                  </div>
                </div>
              </a>

              {/* CTA SECUNDÁRIO (ABRIR NO GOOGLE MAPS) */}
              <div>
                <a
                  id="contact-cta-maps"
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Abrir rota para a Forte Vidros no Google Maps"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#111111] hover:bg-[#1a1a1a] text-[#FFFFFF] hover:text-white font-medium text-sm tracking-wide border border-[#2A2A2A] hover:border-[#444444] transition-all duration-200 cursor-pointer group"
                >
                  <span>Abrir no Google Maps</span>
                  <ArrowRight className="w-4 h-4 text-[#86868B] group-hover:text-white transition-transform duration-200 group-hover:translate-x-1" />
                </a>
              </div>

            </div>
          </div>

        </div>

        {/* RODAPÉ MINIMALISTA (Encerramento da Página) */}
        <footer id="minimal-footer" className="pt-12 sm:pt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 text-xs text-[#86868B]">
          
          <div className="space-y-1">
            <span className="text-sm font-semibold tracking-wider text-[#FFFFFF] uppercase block">
              FORTE VIDROS
            </span>
            <p className="text-[#86868B]">
              Matupá — MT e região
            </p>
          </div>

          <div className="text-[#86868B]">
            © {new Date().getFullYear()} Forte Vidros. Todos os direitos reservados.
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FFFFFF] transition-colors duration-200"
            >
              Instagram
            </a>
            <span className="text-[#2A2A2A]">·</span>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FFFFFF] transition-colors duration-200"
            >
              WhatsApp
            </a>
            <span className="text-[#2A2A2A]">·</span>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FFFFFF] transition-colors duration-200"
            >
              Google Maps
            </a>
          </div>

        </footer>

      </div>
    </motion.section>
  );
};

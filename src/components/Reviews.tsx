import React, { useRef, useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { Star, ArrowRight, ExternalLink, MapPin } from 'lucide-react';
import { REAL_GOOGLE_REVIEWS, GOOGLE_MAPS_REVIEWS_URL, GoogleReview } from '../data/reviews';

export const Reviews: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [draggedDistance, setDraggedDistance] = useState(0);

  // Mouse Drag handlers para navegação desktop sutil e natural
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    setDraggedDistance(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.2;
    setDraggedDistance(Math.abs(walk));
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  // Previne clique acidental caso o usuário estivesse arrastando o mouse
  const handleLinkClick = useCallback((e: React.MouseEvent) => {
    if (draggedDistance > 6) {
      e.preventDefault();
    }
  }, [draggedDistance]);

  const hasReviews = REAL_GOOGLE_REVIEWS.length > 0;

  return (
    <motion.section
      id="reviews-section"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full bg-white text-[#000000] py-20 sm:py-28 lg:py-32 border-b border-[#E5E5EA] select-auto"
    >
      <div className="w-full max-w-[1440px] mx-auto">
        
        {/* CABEÇALHO DA SEÇÃO: Editorial e Minimalista */}
        <div className="px-[5vw] mb-10 sm:mb-14">
          <span className="text-xs sm:text-sm font-semibold tracking-[0.22em] text-[#86868B] uppercase mb-3 sm:mb-4 block select-none">
            QUEM JÁ CONHECE, RECOMENDA.
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#000000] leading-[1.08] mb-3 sm:mb-4">
            FEEDBACK QUE FALA POR SI.
          </h2>
          <p className="text-sm sm:text-base text-[#86868B] font-normal leading-relaxed max-w-xl">
            Avaliações reais de quem já conhece a Forte Vidros.
          </p>
        </div>

        {/* CARROSSEL HORIZONTAL ESTILO NETFLIX (Touch nativo no mobile + Mouse/Trackpad no desktop) */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className={`w-full flex items-stretch gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar px-[5vw] touch-pan-x overscroll-x-contain ${
            isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
          }`}
          role="region"
          aria-label="Carrossel horizontal de avaliações da Forte Vidros"
          tabIndex={0}
        >
          {hasReviews ? (
            REAL_GOOGLE_REVIEWS.map((review: GoogleReview) => (
              <article
                key={review.id}
                className="w-[82vw] sm:w-[380px] md:w-[400px] lg:w-[420px] shrink-0 snap-start rounded-xl p-7 sm:p-8 bg-[#F5F5F7] border border-[#D2D2D7]/70 flex flex-col justify-between transition-all duration-200 hover:border-[#86868B]/60 hover:shadow-sm"
              >
                <div>
                  {/* Estrelas da Avaliação */}
                  <div className="flex items-center gap-1 mb-5" aria-label={`${review.rating} de 5 estrelas`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? 'text-[#1677FF] fill-[#1677FF]'
                            : 'text-[#D2D2D7] fill-[#D2D2D7]'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Texto Real da Avaliação (O protagonista) */}
                  <blockquote className="text-[#111111] text-base sm:text-lg font-normal leading-relaxed mb-6">
                    “{review.text}”
                  </blockquote>
                </div>

                <div>
                  {/* Nome do Avaliador */}
                  <p className="text-sm font-medium text-[#86868B] mb-5 tracking-wide">
                    — {review.author}
                  </p>

                  {/* Link Direto para o Google Maps */}
                  <a
                    href={review.url || GOOGLE_MAPS_REVIEWS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleLinkClick}
                    aria-label={`Ver avaliação de ${review.author} no Google Maps`}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold tracking-wider text-[#1677FF] hover:text-[#0f62d8] uppercase transition-colors group"
                  >
                    <span>Ver no Google</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </a>
                </div>
              </article>
            ))
          ) : (
            /* Card Integrado Oficial do Google Maps quando novas avaliações estão sendo sincronizadas */
            <article className="w-[82vw] sm:w-[380px] md:w-[400px] lg:w-[420px] shrink-0 snap-start rounded-xl p-7 sm:p-8 bg-[#F5F5F7] border border-[#D2D2D7]/70 flex flex-col justify-between transition-all duration-200 hover:border-[#86868B]/60 hover:shadow-sm">
              <div>
                <div className="flex items-center gap-1 mb-5" aria-label="5 de 5 estrelas">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#1677FF] fill-[#1677FF]" />
                  ))}
                </div>

                <blockquote className="text-[#111111] text-base sm:text-lg font-normal leading-relaxed mb-6">
                  “Consulte a reputação, comentários reais de clientes e projetos entregues pela Forte Vidros diretamente na nossa ficha oficial do Google Maps.”
                </blockquote>
              </div>

              <div>
                <p className="text-sm font-medium text-[#86868B] mb-5 tracking-wide">
                  — Vidraçaria Forte Vidros (Matupá — MT)
                </p>

                <a
                  href={GOOGLE_MAPS_REVIEWS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                  aria-label="Ver avaliações da Forte Vidros no Google Maps"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold tracking-wider text-[#1677FF] hover:text-[#0f62d8] uppercase transition-colors group"
                >
                  <span>Ver no Google</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </a>
              </div>
            </article>
          )}

          {/* CARD FINAL DISCRETO: VER TODAS AS AVALIAÇÕES NO GOOGLE */}
          <article className="w-[82vw] sm:w-[320px] md:w-[340px] shrink-0 snap-start rounded-xl p-7 sm:p-8 bg-[#FAFAFA] border border-dashed border-[#D2D2D7] hover:border-[#1677FF]/60 hover:bg-[#F5F5F7] flex flex-col justify-between transition-all duration-200 group">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#FFFFFF] border border-[#E5E5EA] flex items-center justify-center text-[#1677FF] mb-5 group-hover:border-[#1677FF]/40 transition-colors">
                <MapPin className="w-4 h-4" />
              </div>

              <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#000000] mb-3 leading-snug">
                Ficha Oficial da Empresa
              </h3>

              <p className="text-xs sm:text-sm text-[#86868B] leading-relaxed mb-6">
                Acesse o perfil completo no Google Maps para ver a localização exata, rotas e todas as recomendações.
              </p>
            </div>

            <div>
              <a
                id="reviews-cta-see-all-google"
                href={GOOGLE_MAPS_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkClick}
                aria-label="Ver todas as avaliações no Google Maps"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-[#000000] group-hover:text-[#1677FF] uppercase transition-colors"
              >
                <span>Ver todas as avaliações no Google</span>
                <ExternalLink className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
            </div>
          </article>
        </div>

      </div>
    </motion.section>
  );
};

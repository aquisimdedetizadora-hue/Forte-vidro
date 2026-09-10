import React, { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import { Hero } from './Hero';

gsap.registerPlugin(ScrollTrigger);

interface ScrollImageSequenceProps {
  frameCount?: number;
  basePath?: string;
  getFrameFileName?: (index: number) => string;
  className?: string;
}

export const ScrollImageSequence: React.FC<ScrollImageSequenceProps> = ({
  frameCount = 180,
  basePath = '/image-sequence',
  getFrameFileName = (i: number) => {
    const pad = String(i + 1).padStart(3, '0');
    return `ezgif-frame-${pad}.jpg`;
  },
  className = '',
}) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const pinContainerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroOverlayRef = useRef<HTMLDivElement | null>(null);
  const scrollPromptRef = useRef<HTMLDivElement | null>(null);

  // Loaded images storage (0 to frameCount - 1)
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(frameCount).fill(null));
  const currentFrameRef = useRef<number>(0);
  const isRenderingRef = useRef<boolean>(false);
  const prefersReducedMotionRef = useRef<boolean>(false);

  // High precision drawing with intelligent-fit (contain)
  // Preserves 100% of the image composition: all 3 doors fully visible without lateral crop
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const images = imagesRef.current;
    let img = images[frameIndex];

    // Fallback search for nearest loaded frame if target frame isn't decoded yet
    if (!img) {
      for (let offset = 1; offset < frameCount; offset++) {
        if (frameIndex - offset >= 0 && images[frameIndex - offset]) {
          img = images[frameIndex - offset];
          break;
        }
        if (frameIndex + offset < frameCount && images[frameIndex + offset]) {
          img = images[frameIndex + offset];
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (width === 0 || height === 0) return;

    // Handle high DPI (capped at 2 for performance)
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const targetW = Math.round(width * dpr);
    const targetH = Math.round(height * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // Preencher a imagem (Cover Fill / Background 100% Viewport):
    // Preenche 100% da tela/viewport sem deixar margens ou faixas vazias,
    // mantendo a proporção natural da imagem (sem esticar vertical ou horizontalmente)
    // e executando a animação dos 180 frames perfeitamente sincronizada ao scroll.
    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;
    const scale = Math.max(width / imgW, height / imgH);

    const renderW = Math.round(imgW * scale);
    const renderH = Math.round(imgH * scale);
    const offsetX = Math.round((width - renderW) / 2);
    const offsetY = Math.round((height - renderH) / 2);

    // Limpa o canvas antes do desenho
    ctx.clearRect(0, 0, width, height);

    // Desenha o frame atual da sequência preenchendo completamente o background
    ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
    ctx.restore();
  }, [frameCount]);

  // Request a render outside React's lifecycle
  const scheduleRender = useCallback((frameIndex: number) => {
    currentFrameRef.current = frameIndex;
    if (!isRenderingRef.current) {
      isRenderingRef.current = true;
      requestAnimationFrame(() => {
        drawFrame(currentFrameRef.current);
        isRenderingRef.current = false;
      });
    }
  }, [drawFrame]);

  // Handle resizing
  useEffect(() => {
    const handleResize = () => {
      scheduleRender(currentFrameRef.current);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [scheduleRender]);

  // Preloading images: Prioritize Frame 001 immediately, then background load the rest
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotionRef.current = mediaQuery.matches;

    let isMounted = true;
    const images = imagesRef.current;

    const loadSingleImage = (index: number): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        const src = `${basePath}/${getFrameFileName(index)}`;
        img.src = src;

        const onDone = () => {
          if (!isMounted) return;
          images[index] = img;
          if (index === currentFrameRef.current) {
            scheduleRender(index);
          }
          resolve(img);
        };

        if (img.decode) {
          img.decode().then(onDone).catch(() => {
            img.onload = onDone;
            img.onerror = reject;
          });
        } else {
          img.onload = onDone;
          img.onerror = reject;
        }
      });
    };

    // 1. Immediately load Frame 001 (index 0)
    loadSingleImage(0).then(() => {
      if (isMounted) {
        scheduleRender(0);
      }
    });

    // If reduced motion is active, show hero directly and stop sequence preloading
    if (mediaQuery.matches) {
      if (heroOverlayRef.current) {
        heroOverlayRef.current.style.opacity = '1';
        heroOverlayRef.current.style.pointerEvents = 'auto';
      }
      if (canvasRef.current) {
        canvasRef.current.style.opacity = '0';
      }
      return;
    }

    // 2. Preload remaining frames in staggered batches
    const batchSize = 6;
    let nextIndexToLoad = 1;

    const loadBatch = () => {
      if (!isMounted || nextIndexToLoad >= frameCount) return;

      const batchPromises: Promise<unknown>[] = [];
      for (let i = 0; i < batchSize && nextIndexToLoad < frameCount; i++) {
        const idx = nextIndexToLoad++;
        batchPromises.push(loadSingleImage(idx).catch(() => {}));
      }

      Promise.all(batchPromises).then(() => {
        if (isMounted && nextIndexToLoad < frameCount) {
          setTimeout(loadBatch, 16);
        }
      });
    };

    loadBatch();

    return () => {
      isMounted = false;
    };
  }, [basePath, frameCount, getFrameFileName, scheduleRender]);

  // GSAP ScrollTrigger Setup
  // Transitions: TRÊS PORTAS -> APROXIMAÇÃO -> PORTA CENTRAL ABRE -> FRAME 180 CONGELA -> PORTAS DESAPARECEM -> HERO APARECE -> LANDING PAGE
  useEffect(() => {
    const section = sectionRef.current;
    const pinContainer = pinContainerRef.current;
    if (!section || !pinContainer) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      pin: pinContainer,
      pinSpacing: true, // Smooth pin spacing
      scrub: 0.1, // Silky smooth scrub
      anticipatePin: 1,
      onUpdate: (self) => {
        const p = self.progress; // 0 to 1

        let targetFrame: number;
        let canvasOpacity: number;
        let heroOpacity: number;
        let blurAmount: number; // in px
        let promptOpacity: number;

        // Stage 0: Initial Entrance & Scroll Cue (p: 0 -> 0.08)
        // Ao entrar no site: imagem desfocada + aviso "Role para baixo".
        // Assim que o usuário rola para baixo: o desfoque dissipa suavemente até 0 e o aviso desaparece.
        if (p <= 0.08) {
          const introProgress = p / 0.08;
          blurAmount = Math.max(0, (1 - introProgress) * 16);
          promptOpacity = Math.max(0, 1 - introProgress);
          targetFrame = 0;
          canvasOpacity = 1;
          heroOpacity = 0;
        }
        // Stage 1: Portas -> Aproximação -> Porta Central Abre (Frames 1 a 180) (p: 0.08 -> 0.75)
        else if (p <= 0.75) {
          const animProgress = (p - 0.08) / (0.75 - 0.08);
          targetFrame = Math.min(frameCount - 1, Math.floor(animProgress * (frameCount - 1)));
          canvasOpacity = 1;
          heroOpacity = 0;
          blurAmount = 0;
          promptOpacity = 0;
        }
        // Stage 2: Frame 180 Congela (porta aberta em destaque) (p: 0.75 -> 0.86)
        else if (p <= 0.86) {
          targetFrame = frameCount - 1;
          canvasOpacity = 1;
          heroOpacity = 0;
          blurAmount = 0;
          promptOpacity = 0;
        }
        // Stage 3: Portas Desaparecem -> Hero Aparece (seamless crossfade) (p: 0.86 -> 1.0)
        else {
          targetFrame = frameCount - 1;
          const fadeProgress = (p - 0.86) / 0.14;
          canvasOpacity = Math.max(0, 1 - fadeProgress);
          heroOpacity = Math.min(1, Math.max(0, fadeProgress));
          blurAmount = 0;
          promptOpacity = 0;
        }

        const clampedFrame = Math.min(Math.max(0, targetFrame), frameCount - 1);
        scheduleRender(clampedFrame);

        if (canvasRef.current) {
          canvasRef.current.style.opacity = String(canvasOpacity);
          if (blurAmount > 0.1) {
            canvasRef.current.style.filter = `blur(${blurAmount.toFixed(1)}px)`;
          } else {
            canvasRef.current.style.filter = 'none';
          }
        }
        if (scrollPromptRef.current) {
          scrollPromptRef.current.style.opacity = String(promptOpacity);
          scrollPromptRef.current.style.pointerEvents = promptOpacity > 0.1 ? 'auto' : 'none';
          scrollPromptRef.current.style.transform = `translateY(${(1 - promptOpacity) * -20}px) scale(${0.96 + promptOpacity * 0.04})`;
        }
        if (heroOverlayRef.current) {
          heroOverlayRef.current.style.opacity = String(heroOpacity);
          heroOverlayRef.current.style.pointerEvents = heroOpacity > 0.6 ? 'auto' : 'none';
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, [frameCount, scheduleRender]);

  const handlePromptClick = () => {
    const section = sectionRef.current;
    if (section) {
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: sectionTop + window.innerHeight * 0.6,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="intro-sequence-section"
      ref={sectionRef}
      className={`relative w-full h-[350vh] max-md:h-[250vh] bg-white ${className}`}
    >
      <div
        id="intro-sequence-pin"
        ref={pinContainerRef}
        className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-white"
      >
        {/* 2D Canvas com desfoque inicial (16px) que dissipa com a rolagem */}
        <canvas
          id="intro-sequence-canvas"
          ref={canvasRef}
          style={{
            filter: 'blur(16px)',
          }}
          className="absolute inset-0 w-full h-full block select-none pointer-events-none transition-opacity duration-75"
        />

        {/* Aviso "Role para baixo" com indicador interativo */}
        <div
          id="scroll-down-cue"
          ref={scrollPromptRef}
          onClick={handlePromptClick}
          style={{ opacity: 1, pointerEvents: 'auto' }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 select-none cursor-pointer transition-transform duration-75"
        >
          <div className="bg-zinc-950/75 hover:bg-zinc-950/85 backdrop-blur-md border border-white/20 px-8 py-7 rounded-2xl shadow-2xl flex flex-col items-center text-center max-w-sm w-full mx-4 transition-all duration-200 group">
            {/* Indicador animado de scroll */}
            <div className="w-7 h-11 rounded-full border-2 border-white/80 flex items-start justify-center p-1.5 mb-4 shadow-sm group-hover:border-white transition-colors">
              <div className="w-1.5 h-2.5 bg-white rounded-full animate-bounce" />
            </div>

            {/* Texto principal solicitado */}
            <span className="text-2xl font-bold tracking-tight text-white mb-2">
              Role para baixo
            </span>

            <p className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed mb-4">
              Deslize para abrir as portas e iniciar a experiência
            </p>

            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-400 group-hover:text-white transition-colors">
              <span>Iniciar</span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </div>
          </div>
        </div>

        {/* Hero Layer that fades in seamlessly as doors dissolve at Frame 180 */}
        <div
          id="hero-transition-overlay"
          ref={heroOverlayRef}
          style={{ opacity: 0, pointerEvents: 'none' }}
          className="absolute inset-0 w-full h-full bg-white z-10 transition-opacity duration-75 overflow-y-auto"
        >
          <Hero />
        </div>
      </div>
    </section>
  );
};

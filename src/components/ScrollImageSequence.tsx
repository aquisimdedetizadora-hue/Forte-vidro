import React, { useEffect, useRef, useState, useCallback } from 'react';

interface ScrollImageSequenceProps {
  frameCount?: number;
  basePath?: string;
  getFrameFileName?: (index: number) => string;
  children?: React.ReactNode;
}

export const ScrollImageSequence: React.FC<ScrollImageSequenceProps> = ({
  frameCount = 151,
  basePath = '/image-sequence',
  getFrameFileName = (index) => {
    const pad = String(index + 1).padStart(3, '0');
    return `ezgif-frame-${pad}.webp`;
  },
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroLayerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<Record<number, HTMLImageElement>>({});
  const loadedIndicesRef = useRef<Set<number>>(new Set());
  const currentFrameRef = useRef<number>(0);
  const isRenderingRef = useRef<boolean>(false);
  const rafIdRef = useRef<number | null>(null);
  const isReducedMotionRef = useRef<boolean>(false);

  const [isLoadedFirstFrame, setIsLoadedFirstFrame] = useState<boolean>(false);
  const [canvasOpacity, setCanvasOpacity] = useState<number>(1);
  const [heroOpacity, setHeroOpacity] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      isReducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
  }, []);

  // Helper to find nearest loaded frame if target is still loading
  const getNearestLoadedFrame = useCallback((targetIndex: number): HTMLImageElement | null => {
    const images = imagesRef.current;
    if (images[targetIndex]) return images[targetIndex];

    const loaded: number[] = Array.from(loadedIndicesRef.current);
    if (loaded.length === 0) return null;

    let nearest: number = loaded[0];
    let minDiff = Math.abs(targetIndex - nearest);
    for (let i = 1; i < loaded.length; i++) {
      const currentVal = loaded[i];
      const diff = Math.abs(targetIndex - currentVal);
      if (diff < minDiff) {
        minDiff = diff;
        nearest = currentVal;
      }
    }
    return images[nearest] || null;
  }, []);

  // High precision drawing with cover math on high-DPI canvas
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const img = getNearestLoadedFrame(frameIndex);
    if (!img) return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (width === 0 || height === 0) return;

    // High DPI scaling (capped at 2 for optimal mobile/desktop balance)
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const targetW = Math.round(width * dpr);
    const targetH = Math.round(height * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Cover math: preserve aspect ratio, completely cover viewport
    const imgW = img.naturalWidth || 1248;
    const imgH = img.naturalHeight || 704;
    const scale = Math.max(width / imgW, height / imgH);
    const renderW = imgW * scale;
    const renderH = imgH * scale;
    const offsetX = (width - renderW) / 2;
    const offsetY = (height - renderH) / 2;

    ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
    ctx.restore();
    currentFrameRef.current = frameIndex;
  }, [getNearestLoadedFrame]);

  // Schedule render on next animation frame
  const scheduleRender = useCallback((frameIndex: number) => {
    if (isRenderingRef.current) return;
    isRenderingRef.current = true;

    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }

    rafIdRef.current = requestAnimationFrame(() => {
      drawFrame(frameIndex);
      isRenderingRef.current = false;
    });
  }, [drawFrame]);

  // Preload all 151 images with priority to initial frames and progressive streaming
  useEffect(() => {
    let isMounted = true;

    const loadSingleImage = (index: number): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        if (imagesRef.current[index]) {
          resolve(imagesRef.current[index]);
          return;
        }

        const img = new Image();
        const pad = String(index + 1).padStart(3, '0');
        const webpSrc = `${basePath}/ezgif-frame-${pad}.webp`;
        const jpgFallback = `${basePath}/ezgif-frame-${pad}.jpg`;

        const onDone = () => {
          if (!isMounted) return;
          imagesRef.current[index] = img;
          loadedIndicesRef.current.add(index);
          resolve(img);
        };

        img.onload = () => {
          if (img.decode) {
            img.decode().then(onDone).catch(onDone);
          } else {
            onDone();
          }
        };

        img.onerror = () => {
          // If webp fails, fallback to local JPG
          if (img.src.endsWith('.webp')) {
            img.src = jpgFallback;
          } else {
            reject();
          }
        };

        img.src = webpSrc;
      });
    };

    // 1. Immediately load Frame 001 (index 0) and render
    loadSingleImage(0).then(() => {
      if (isMounted) {
        setIsLoadedFirstFrame(true);
        scheduleRender(0);
      }
    });

    // 2. Preload remaining frames in progressive streaming batches
    const batchSize = 10;
    let nextIndexToLoad = 1;

    const loadBatch = () => {
      if (!isMounted || nextIndexToLoad >= frameCount) return;

      const batchPromises: Promise<HTMLImageElement>[] = [];
      const endIndex = Math.min(nextIndexToLoad + batchSize, frameCount);

      for (let i = nextIndexToLoad; i < endIndex; i++) {
        batchPromises.push(loadSingleImage(i));
      }
      nextIndexToLoad = endIndex;

      Promise.all(batchPromises).then(() => {
        if (isMounted && nextIndexToLoad < frameCount) {
          setTimeout(loadBatch, 16);
        }
      });
    };

    // Start background streaming
    loadBatch();

    return () => {
      isMounted = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [basePath, frameCount, scheduleRender]);

  // Scroll listener tracking scroll position, calculating frame and handling freeze + fade
  useEffect(() => {
    let scrollRafId: number | null = null;

    const handleScroll = () => {
      if (scrollRafId) return;

      scrollRafId = requestAnimationFrame(() => {
        scrollRafId = null;

        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const scrollableDist = container.clientHeight - window.innerHeight;
        if (scrollableDist <= 0) return;

        // Calculate progress from 0.0 to 1.0
        const rawProgress = -rect.top / scrollableDist;
        const progress = Math.min(Math.max(rawProgress, 0), 1);

        if (isReducedMotionRef.current) {
          // Reduced motion: show frame 0 and fade smoothly to Hero
          const heroProgress = Math.min(Math.max((progress - 0.1) / 0.5, 0), 1);
          const cOpacity = 1 - heroProgress;
          const hOpacity = heroProgress;

          if (canvasRef.current) {
            canvasRef.current.style.opacity = String(cOpacity);
            canvasRef.current.style.pointerEvents = cOpacity <= 0.02 ? 'none' : 'auto';
          }
          if (heroLayerRef.current) {
            heroLayerRef.current.style.opacity = String(hOpacity);
            heroLayerRef.current.style.pointerEvents = hOpacity >= 0.98 ? 'auto' : 'none';
          }
          setCanvasOpacity(cOpacity);
          setHeroOpacity(hOpacity);
          return;
        }

        // FASE 1: 0.0 -> 0.8 controls sequence frames (0 to 150)
        // sequenceProgress = clamp(map(scrollProgress, 0, 0.8, 0, 1), 0, 1)
        // frameIndex = Math.round(sequenceProgress * 150)
        const sequenceProgress = Math.min(Math.max(progress / 0.8, 0), 1);
        const targetFrame = Math.min(Math.round(sequenceProgress * 150), 150);

        // FASE 2: 0.8 -> 1.0 controls fade to Hero
        // heroProgress = clamp(map(scrollProgress, 0.8, 1, 0, 1), 0, 1)
        // Canvas opacity: 1 -> 0
        // Hero opacity: 0 -> 1
        const heroProgress = Math.min(Math.max((progress - 0.8) / 0.2, 0), 1);
        const cOpacity = 1 - heroProgress;
        const hOpacity = heroProgress;

        // Update DOM styles directly for zero-latency 120fps hardware acceleration
        if (canvasRef.current) {
          canvasRef.current.style.opacity = String(cOpacity);
          canvasRef.current.style.pointerEvents = cOpacity <= 0.02 ? 'none' : 'auto';
        }
        if (heroLayerRef.current) {
          heroLayerRef.current.style.opacity = String(hOpacity);
          heroLayerRef.current.style.pointerEvents = hOpacity >= 0.98 ? 'auto' : 'none';
        }

        setCanvasOpacity(cOpacity);
        setHeroOpacity(hOpacity);

        // Render target frame only when frame changes
        // When progress >= 0.8, targetFrame is strictly locked at 150 (Frame 151)
        // Completely frozen: no zoom, no parallax, no movement, no re-render.
        if (targetFrame !== currentFrameRef.current) {
          scheduleRender(targetFrame);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (scrollRafId) cancelAnimationFrame(scrollRafId);
    };
  }, [frameCount, scheduleRender]);

  return (
    <section
      id="intro-sequence-section"
      ref={containerRef}
      className="relative w-full h-[400vh] bg-white"
      aria-label="Apresentação Interativa da Forte Vidros em 151 Quadros"
    >
      {/* Sticky Fullscreen Canvas Viewport */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden select-none">
        {/* HERO LAYER POSITIONED BEHIND CANVAS */}
        <div
          id="hero-reveal-layer"
          ref={heroLayerRef}
          className="absolute inset-0 w-full h-full flex items-center justify-center overflow-y-auto lg:overflow-visible"
          style={{
            opacity: heroOpacity,
            pointerEvents: heroOpacity >= 0.98 ? 'auto' : 'none',
          }}
        >
          {children}
        </div>

        {/* CANVAS IN FRONT */}
        <canvas
          id="scroll-sequence-canvas"
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block object-cover select-none"
          style={{
            opacity: isLoadedFirstFrame ? canvasOpacity : 0,
            pointerEvents: canvasOpacity <= 0.02 ? 'none' : 'auto',
          }}
        />
      </div>
    </section>
  );
};

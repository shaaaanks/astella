'use client';

import { useEffect, useRef, useState } from 'react';
import { useSmoothScroll } from './SmoothScroll';

const sequences = [
  { start: 0, end: 0.33, folder: '1', frameCount: 240 },
  { start: 0.33, end: 0.66, folder: '2', frameCount: 240 },
  { start: 0.66, end: 1.0, folder: '3', frameCount: 240 },
];

export default function ScrollytellingRenderer({ onLoadingUpdate, onFirstSequenceLoaded, onScrollUpdate }) {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const scrollData = useRef({ progress: 0, lastProgress: -1 });
  const canvasSize = useRef({ w: 0, h: 0 });
  const [isReady, setIsReady] = useState(false);
  const lenis = useSmoothScroll();

  useEffect(() => {
    let isUnmounted = false;
    let loadedTotal = 0;
    const totalFrames = sequences.reduce((acc, s) => acc + s.frameCount, 0);

    const loadSequence = async (seqIndex) => {
      if (isUnmounted) return;
      const seq = sequences[seqIndex];
      const promises = [];

      for (let i = 1; i <= seq.frameCount; i++) {
        promises.push(new Promise((resolve) => {
          const img = new Image();
          const frameNum = String(i).padStart(3, '0');
          img.src = `/frames/${seq.folder}/ezgif-frame-${frameNum}.jpg`;
          img.onload = () => {
            loadedTotal++;
            const currentPercent = Math.round((loadedTotal / totalFrames) * 100);
            if (onLoadingUpdate && currentPercent % 5 === 0) {
              onLoadingUpdate(currentPercent);
            }
            resolve({ img, index: i });
          };
          img.onerror = () => {
            loadedTotal++;
            resolve(null);
          };
        }));
      }

      const results = await Promise.all(promises);
      if (isUnmounted) return;
      
      const validResults = results.filter(r => r !== null);
      imagesRef.current = [...imagesRef.current, ...validResults];
      
      if (seqIndex === 0) {
        setIsReady(true);
        if (onFirstSequenceLoaded) onFirstSequenceLoaded();
      }

      if (seqIndex < sequences.length - 1) {
        setTimeout(() => loadSequence(seqIndex + 1), 50);
      }
    };

    loadSequence(0);

    const handleScroll = (scroll) => {
      let currentProgress = 0;
      if (scroll) {
        currentProgress = scroll.progress;
      } else {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight <= 0) return;
        currentProgress = Math.max(0, Math.min(1, scrollTop / docHeight));
      }
      scrollData.current.progress = currentProgress;
      if (onScrollUpdate) onScrollUpdate(currentProgress);
    };

    if (lenis) {
      lenis.on('scroll', handleScroll);
    } else {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }
    
    handleScroll();

    const handleResize = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      canvasSize.current = { w: window.innerWidth, h: window.innerHeight };
      scrollData.current.lastProgress = -1;
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    let rafId = null;
    
    const renderLoop = () => {
      if (isUnmounted || !canvasRef.current) return;
      
      const ctx = canvasRef.current.getContext('2d', { alpha: false });
      if (!ctx) return;

      const { progress, lastProgress } = scrollData.current;
      const availableFrames = imagesRef.current.length;

      if (availableFrames > 0 && (progress !== lastProgress)) {
        let frameIndex = Math.floor(progress * (availableFrames - 1));
        frameIndex = Math.max(0, Math.min(frameIndex, availableFrames - 1));

        const frame = imagesRef.current[frameIndex];
        if (frame && frame.img.complete) {
          const image = frame.img;
          const { w, h } = canvasSize.current;
          
          if (w === 0 || h === 0) {
            handleResize();
            return;
          }

          const imgRatio = image.width / image.height;
          const canvasRatio = w / h;

          let drawWidth, drawHeight, x, y;
          if (imgRatio > canvasRatio) {
            drawHeight = h;
            drawWidth = h * imgRatio;
            x = (w - drawWidth) / 2;
            y = 0;
          } else {
            drawWidth = w;
            drawHeight = w / imgRatio;
            x = 0;
            y = (h - drawHeight) / 2;
          }

          ctx.drawImage(image, x, y, drawWidth, drawHeight);
          scrollData.current.lastProgress = progress;
        }
      }

      rafId = requestAnimationFrame(renderLoop);
    };

    rafId = requestAnimationFrame(renderLoop);

    return () => {
      isUnmounted = true;
      if (lenis) {
        lenis.off('scroll', handleScroll);
      } else {
        window.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('resize', handleResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [lenis]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        background: '#050505',
        opacity: isReady ? 1 : 0,
        transition: 'opacity 1s ease',
      }}
    />
  );
}

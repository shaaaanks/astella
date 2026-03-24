'use client';

import { useState, useEffect } from 'react';

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let requestRef = null;

    const handleScroll = () => {
      if (requestRef) return;

      requestRef = window.requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = scrollTop / docHeight;
        
        // Round to 4 decimal places to avoid micro-updates
        const roundedProgress = Math.round(scrollPercent * 10000) / 10000;
        setProgress(roundedProgress);
        
        requestRef = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (requestRef) window.cancelAnimationFrame(requestRef);
    };
  }, []);

  return progress;
}

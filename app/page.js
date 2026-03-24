'use client';

import { useState, useEffect, useMemo } from 'react';
import ScrollytellingRenderer from '@/components/ScrollytellingRenderer';
import Navbar from '@/components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';

const stats = [
  { label: 'UI SCORE', value: '42/100', color: '#ff4d4d' },
  { label: 'PERFORMANCE', value: 'poor', color: '#ff4d4d' },
  { label: 'SEO', value: '85/100', color: 'var(--brand-green)' },
  { label: 'ACCESSIBILITY', value: '64/100', color: '#ffbd00' }
];

export default function Home() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isReadyForHero, setIsReadyForHero] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isReadyForHero) {
      const timer = setTimeout(() => setIsLoaded(true), 600);
      return () => clearTimeout(timer);
    }
  }, [isReadyForHero]);

  // Derived visibility states
  const heroOpacity = useMemo(() => {
    if (scrollProgress < 0.05) return 1;
    return Math.max(0, 1 - (scrollProgress - 0.05) * 15);
  }, [scrollProgress]);

  const finalOverlayOpacity = useMemo(() => {
    if (scrollProgress < 0.94) return 0;
    return Math.min(1, (scrollProgress - 0.94) * 20);
  }, [scrollProgress]);

  if (!isMounted) return null;

  return (
    <main style={{ position: 'relative', backgroundColor: '#050505', minHeight: '100vh', overflowX: 'hidden' }}>
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              backgroundColor: '#050505',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <motion.div
              style={{
                width: '300px',
                height: '2px',
                backgroundColor: 'rgba(255,255,255,0.05)',
                position: 'relative',
                overflow: 'hidden',
                marginBottom: '20px'
              }}
            >
              <motion.div
                animate={{ width: `${loadingProgress}%` }}
                transition={{ type: "spring", stiffness: 40, damping: 20 }}
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  height: '100%',
                  backgroundColor: 'var(--brand-green)',
                  boxShadow: '0 0 20px var(--brand-green)'
                }}
              />
            </motion.div>
            <p className="mono-text" style={{ fontSize: '10px', letterSpacing: '4px', opacity: 0.4, textTransform: 'uppercase' }}>
              CALIBRATING AI AUDIT {loadingProgress}%
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar style={{ zIndex: 100 }} />
      
      <ScrollytellingRenderer 
        onLoadingUpdate={setLoadingProgress} 
        onFirstSequenceLoaded={() => setIsReadyForHero(true)}
        onScrollUpdate={setScrollProgress}
      />

      <div className="grid-bg" style={{ 
        position: 'fixed', 
        inset: 0, 
        zIndex: 5, 
        pointerEvents: 'none',
        opacity: 0.5
      }} />

      {/* Hero Section (Start) - Left Aligned & Interactive */}
      <motion.div 
        initial={{ opacity: 0, x: -60 }}
        animate={isLoaded ? { opacity: heroOpacity, x: 0 } : { opacity: 0, x: -60 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ 
          position: 'fixed',
          top: '25vh',
          left: '10vw',
          zIndex: 50, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'flex-start',
          textAlign: 'left',
          maxWidth: '800px',
          pointerEvents: heroOpacity > 0.1 ? 'auto' : 'none'
        }}
      >
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="tag" 
          style={{ color: 'var(--brand-green)', borderColor: 'rgba(217, 255, 84, 0.3)', marginBottom: '32px', padding: '8px 20px' }}
        >
          ● AI-POWERED AUDIT
        </motion.span>

        <motion.h1 
          className="interactive-title"
          style={{ 
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(4rem, 11vw, 9rem)', 
            lineHeight: 0.85, 
            color: '#FFFFFF', 
            marginBottom: '32px',
            textTransform: 'uppercase',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            cursor: 'default'
          }}
        >
          YOUR WEBSITE,<br />
          <span className="text-glow" style={{ color: 'var(--brand-green)', display: 'inline-block' }}>
            ROASTED BY AI
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 0.5 } : {}}
          transition={{ delay: 0.8 }}
          style={{ 
            color: '#FFFFFF', 
            fontSize: 'clamp(1rem, 1.5vw, 1.3rem)', 
            maxWidth: '520px',
            lineHeight: 1.4,
            fontWeight: 400
          }}>
          Stop guessing why your bounce rate is high. Let our AI crawl your site and tell you the brutal truth.
        </motion.p>
      </motion.div>

      {/* Final Overlay (End) - Stats & Centered CTA */}
      <motion.div 
        style={{ 
          position: 'fixed',
          inset: 0,
          zIndex: 60,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#050505',
          opacity: finalOverlayOpacity,
          pointerEvents: finalOverlayOpacity > 0.1 ? 'auto' : 'none',
          padding: '0 20px',
          textAlign: 'center'
        }}
      >
        <div style={{ maxWidth: '800px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', 
            gap: '16px', 
            width: '100%',
            marginBottom: '64px'
          }}>
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={finalOverlayOpacity > 0.5 ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.1 }}
                className="stats-card"
                style={{
                  padding: '24px',
                  borderRadius: '16px',
                  textAlign: 'left'
                }}
              >
                <div className="mono-text" style={{ fontSize: '10px', opacity: 0.4, marginBottom: '8px' }}>{stat.label}</div>
                <div style={{ fontSize: '24px', fontWeight: 600, color: stat.color }}>{stat.value}</div>
              </motion.div>
            ))}
          </div>

          <h2 style={{ 
            fontSize: 'clamp(3rem, 6vw, 5rem)', 
            marginBottom: '24px', 
            textTransform: 'uppercase',
            lineHeight: 0.9,
            color: '#FFFFFF'
          }}>
            READY FOR THE <span style={{ color: 'var(--brand-green)' }}>FULL REPORT?</span>
          </h2>

          <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '540px', marginBottom: '48px', lineHeight: 1.6 }}>
            The preview above is just the beginning. Enter your URL below to get the 50-page deep-dive report.
          </p>

          <div style={{ 
            display: 'flex', 
            gap: '12px', 
            backgroundColor: 'rgba(255,255,255,0.03)',
            padding: '8px',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.08)',
            width: '100%',
            maxWidth: '550px',
            marginBottom: '40px'
          }}>
            <input 
              type="text" 
              placeholder="Your website URL..." 
              className="input-dark"
              style={{ flex: 1, border: 'none', background: 'transparent', fontSize: '1.1rem', padding: '0 1rem' }} 
            />
            <button className="btn-brand" style={{ whiteSpace: 'nowrap', padding: '1.1rem 2.2rem', fontSize: '1rem', borderRadius: '12px' }}>
              GET FULL AUDIT →
            </button>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {["UI/UX", "SEO", "Accessibility", "Performance"].map(tag => (
              <span key={tag} className="tag" style={{ padding: '0.6rem 1.4rem', fontSize: '0.85rem' }}>{tag}</span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scrollable Container */}
      <div style={{ height: '800vh', pointerEvents: 'none' }}></div>
    </main>
  );
}

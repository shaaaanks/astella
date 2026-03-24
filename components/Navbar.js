'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`navbar-wrapper ${scrolled ? 'navbar-scrolled' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        padding: scrolled ? '12px 0' : '24px 0',
      }}
    >
      <div className="nav-container">
        <div className={`nav-content-box ${scrolled ? 'glass' : ''}`} style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          padding: scrolled ? '12px 24px' : '0',
          borderRadius: scrolled ? '100px' : '0',
          transition: 'all 0.5s ease'
        }}>
          {/* Logo */}
          <div className="nav-logo">
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'inherit' }}>
              <div className="logo-box">R</div>
              <span style={{ color: '#fff' }}>ROASTED<span style={{ color: 'var(--brand-green)' }}>.AI</span></span>
            </Link>
          </div>

          {/* Links */}
          <div className="nav-links">
            {['Features', 'Scan', 'Pricing', 'Docs'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="nav-link-item"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.6)',
                  transition: 'color 0.3s ease'
                }}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="nav-actions">
            {user ? (
              <>
                <span className="mono-text" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>
                  {user.email.split('@')[0].toUpperCase()}
                </span>
                <button 
                  onClick={logout}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    color: '#FFFFFF',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '8px 16px'
                  }}
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link href="/register" style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: '#FFFFFF',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px 16px',
                  textDecoration: 'none'
                }}>
                  Log In
                </Link>
                <Link href="/register" className="btn-brand" style={{
                  fontFamily: 'var(--font-body)',
                  padding: '10px 24px',
                  fontSize: '0.9rem',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  Sign Up Free
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .nav-link-item:hover {
          color: var(--brand-green) !important;
        }
      `}</style>
    </motion.nav>
  );
}

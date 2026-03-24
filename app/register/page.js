'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signup, loginWithGoogle } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password);
      }
      router.push('/');
    } catch (err) {
      setError(err.message.replace('Firebase:', '').trim());
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await loginWithGoogle();
      router.push('/');
    } catch (err) {
      setError(err.message.replace('Firebase:', '').trim());
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ 
      minHeight: '100vh', 
      backgroundColor: '#050505',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: '100%',
          maxWidth: '440px',
          zIndex: 10,
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          borderRadius: '32px',
          padding: '48px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ 
            width: '48px', 
            height: '48px', 
            background: 'var(--brand-green)', 
            borderRadius: '12px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            margin: '0 auto 20px',
            color: '#000',
            fontWeight: 800,
            fontSize: '1.5rem'
          }}>R</div>
          <h1 style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: '2.5rem', 
            letterSpacing: '-0.02em',
            marginBottom: '8px'
          }}>
            {isLogin ? 'WELCOME BACK' : 'CREATE ACCOUNT'}
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.9rem' }}>
            {isLogin ? 'Enter your credentials to continue' : 'Join the world\'s most brutal AI auditor'}
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label className="mono-text" style={{ fontSize: '10px', opacity: 0.5, letterSpacing: '1px' }}>EMAIL ADDRESS</label>
            <input
              type="email"
              required
              className="input-dark"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              style={{ padding: '14px 18px', borderRadius: '12px' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label className="mono-text" style={{ fontSize: '10px', opacity: 0.5, letterSpacing: '1px' }}>PASSWORD</label>
            <input
              type="password"
              required
              className="input-dark"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ padding: '14px 18px', borderRadius: '12px' }}
            />
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={{
                  padding: '12px 16px',
                  background: 'rgba(217, 255, 84, 0.05)',
                  border: '1px solid rgba(217, 255, 84, 0.2)',
                  borderRadius: '12px',
                  color: 'var(--brand-green)',
                  fontSize: '0.85rem'
                }}
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <button
            disabled={loading}
            className="btn-brand"
            style={{ 
              width: '100%', 
              justifyContent: 'center', 
              padding: '14px', 
              borderRadius: '12px',
              marginTop: '12px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'PROCESSING...' : (isLogin ? 'LOG IN' : 'SIGN UP FREE')}
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '24px 0' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.05)' }} />
          <span className="mono-text" style={{ fontSize: '10px', opacity: 0.3 }}>OR</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.05)' }} />
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#fff',
            fontFamily: 'var(--font-body)',
            fontWeight: 500,
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" />
            <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" />
            <path fill="#FBBC05" d="M3.964 10.706c-.18-.54-.282-1.117-.282-1.706 0-.589.102-1.166.282-1.706V4.962H.957C.347 6.177 0 7.549 0 9s.347 2.823.957 4.038l3.007-2.332z" />
            <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.443 2.048.957 4.962L3.964 7.294C4.672 5.167 6.656 3.58 9 3.58z" />
          </svg>
          CONTINUE WITH GOOGLE
        </button>

        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <p style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.9rem' }}>
            {isLogin ? 'Don\'t have an account?' : 'Already have an account?'}
            <button
              onClick={() => setIsLogin(!isLogin)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--brand-green)',
                fontWeight: 600,
                marginLeft: '8px',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>
      </motion.div>
    </main>
  );
}

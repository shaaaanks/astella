'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signup, loginWithGoogle, loginWithGithub } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        // In a real app, you'd save firstName and lastName to Firestore here
        await signup(email, password);
      }
      router.push('/');
    } catch (err) {
      setError(err.message.replace('Firebase:', '').trim());
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setError('');
    setLoading(true);
    try {
      if (provider === 'google') await loginWithGoogle();
      if (provider === 'github') await loginWithGithub();
      router.push('/');
    } catch (err) {
      setError(err.message.replace('Firebase:', '').trim());
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { id: 1, title: 'Sign up your account', description: 'Complete these easy steps to register your account.' }
  ];

  return (
    <motion.main 
      layout
      style={{ 
        minHeight: '100vh', 
        backgroundColor: '#050505',
        display: 'flex',
        flexDirection: isLogin ? 'row' : 'row-reverse',
        overflow: 'hidden',
        color: '#fff'
      }}
    >
      {/* Left Side - Branding & Steps */}
      <motion.div 
        layout
        transition={{ 
          type: "spring", 
          stiffness: 30, 
          damping: 20, 
          duration: 1.5 
        }}
        style={{
          flex: '1.2',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '60px',
          overflow: 'hidden'
        }}
      >
        {/* Background Gradient */}
        <div style={{
          position: 'absolute',
          inset: '20px',
          background: 'linear-gradient(135deg, #D9FF54 0%, #1a2a00 100%)',
          borderRadius: '32px',
          opacity: 0.9,
          zIndex: 1
        }} />
        
        {/* Grain Overlay */}
        <div className="grid-bg" style={{ 
          position: 'absolute', 
          inset: '20px', 
          zIndex: 2, 
          opacity: 0.2,
          borderRadius: '32px'
        }} />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '80px' }}>
            <div style={{ 
              width: '32px', height: '32px', borderRadius: '50%', 
              border: '2px solid #000', display: 'flex', 
              alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 900 
            }}>O</div>
            <span style={{ fontWeight: 600, color: '#000', fontSize: '1.2rem', letterSpacing: '-0.02em' }}>OnlyPipe</span>
          </div>

          <h2 style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: '3.5rem', 
            lineHeight: 1, 
            color: '#000', 
            marginBottom: '16px',
            textTransform: 'none'
          }}>
            Get Started with Us
          </h2>
          <p style={{ color: 'rgba(0,0,0,0.6)', marginBottom: '48px', fontSize: '1.1rem' }}>
            Complete these easy steps to register your account.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {steps.map((step) => (
              <div key={step.id} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px 24px',
                background: step.id === 1 ? '#fff' : 'rgba(0,0,0,0.1)',
                borderRadius: '16px',
                color: step.id === 1 ? '#000' : 'rgba(0,0,0,0.4)',
                border: step.id === 1 ? 'none' : '1px solid rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease'
              }}>
                <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{step.title}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Right Side - Form */}
      <motion.div 
        layout
        transition={{ 
          type: "spring", 
          stiffness: 30, 
          damping: 20, 
          duration: 1.5 
        }}
        style={{
          flex: '1.8',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
          backgroundColor: '#050505',
          position: 'relative'
        }}
      >
        <div style={{ width: '100%', maxWidth: '440px' }}>
          <div style={{ marginBottom: '40px' }}>
            <h1 style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: '2.5rem', 
              marginBottom: '8px',
              textTransform: 'none'
            }}>
              {isLogin ? 'Log In to Account' : 'Sign Up Account'}
            </h1>
            <p style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.95rem' }}>
              {isLogin ? 'Welcome back! Please enter your details.' : 'Enter your personal data to create your account.'}
            </p>
          </div>

          {/* Social Logins */}
          <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
            <button 
              onClick={() => handleSocialLogin('google')}
              disabled={loading}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '12px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#fff',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
            >
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" />
                <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" />
                <path fill="#FBBC05" d="M3.964 10.706c-.18-.54-.282-1.117-.282-1.706 0-.589.102-1.166.282-1.706V4.962H.957C.347 6.177 0 7.549 0 9s.347 2.823.957 4.038l3.007-2.332z" />
                <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.443 2.048.957 4.962L3.964 7.294C4.672 5.167 6.656 3.58 9 3.58z" />
              </svg>
              Continue with Google
            </button>
          </div>

          <div style={{ position: 'relative', textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'rgba(255,255,255,0.05)' }} />
            <span style={{ 
              position: 'relative', 
              background: '#050505', 
              padding: '0 12px', 
              fontSize: '0.8rem', 
              color: 'rgba(255,255,255,0.2)' 
            }}>Or</span>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{ display: 'flex', gap: '16px', overflow: 'hidden' }}
                >
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'rgba(255,255,255,0.6)' }}>First Name</label>
                    <input
                      type="text"
                      className="input-dark"
                      placeholder="eg. John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      style={{ padding: '14px', borderRadius: '12px', width: '100%' }}
                    />
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'rgba(255,255,255,0.6)' }}>Last Name</label>
                    <input
                      type="text"
                      className="input-dark"
                      placeholder="eg. Francisco"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      style={{ padding: '14px', borderRadius: '12px', width: '100%' }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'rgba(255,255,255,0.6)' }}>Email</label>
              <input
                type="email"
                required
                className="input-dark"
                placeholder="eg. johnfrans@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ padding: '14px', borderRadius: '12px' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'rgba(255,255,255,0.6)' }}>Password</label>
                {isLogin && <button type="button" style={{ background: 'none', border: 'none', color: 'var(--brand-green)', fontSize: '0.8rem', cursor: 'pointer' }}>Forgot Password?</button>}
              </div>
              <input
                type="password"
                required
                className="input-dark"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ padding: '14px', borderRadius: '12px' }}
              />
              {!isLogin && <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>Must be at least 8 characters.</p>}
            </div>

            {error && (
              <div style={{ 
                padding: '12px', borderRadius: '12px', 
                background: 'rgba(255, 77, 77, 0.1)', 
                border: '1px solid rgba(255, 77, 77, 0.2)', 
                color: '#ff4d4d', fontSize: '0.85rem' 
              }}>
                {error}
              </div>
            )}

            <button
              disabled={loading}
              className="btn-brand"
              style={{
                padding: '16px',
                borderRadius: '12px',
                fontSize: '1rem',
                justifyContent: 'center',
                marginTop: '8px',
                width: '100%',
                opacity: loading ? 0.7 : 1,
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Processing...' : (isLogin ? 'Log In' : 'Sign Up')}
            </button>

            <p style={{ textAlign: 'center', fontSize: '0.9rem', color: 'rgba(255,255,255,0.4)', marginTop: '8px' }}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#fff',
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </form>
        </div>
      </motion.div>
    </motion.main>
  );
}

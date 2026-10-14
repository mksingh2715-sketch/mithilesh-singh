import React, { useState } from 'react';
import {
  auth,
  googleProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from '../firebase/config';
import { School, LogIn, UserPlus, Shield, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

interface AuthScreenProps {
  onDemoLoginRequested?: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setError(null);
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      console.error('Google Auth error:', err);
      // If popup was blocked or closed, give helpful instruction
      setError(err?.message || 'Google Sign-in failed. You can also use email & password.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    try {
      setError(null);
      setLoading(true);
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email.trim(), password);
      } else {
        await signInWithEmailAndPassword(auth, email.trim(), password);
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      let msg = err?.message || 'Authentication failed.';
      if (err?.code === 'auth/invalid-credential' || err?.code === 'auth/user-not-found' || err?.code === 'auth/wrong-password') {
        msg = 'Invalid email or password. If you are new, click "Create HM Account" below.';
      } else if (err?.code === 'auth/email-already-in-use') {
        msg = 'This email is already registered. Please click "Sign In" instead.';
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoHM = async () => {
    try {
      setError(null);
      setLoading(true);
      const demoEmail = 'hm.sitamarhi@biharschool.gov.in';
      const demoPass = 'Bih@rSchool2026';
      try {
        await signInWithEmailAndPassword(auth, demoEmail, demoPass);
      } catch (signInErr: any) {
        // If not created yet, register it
        await createUserWithEmailAndPassword(auth, demoEmail, demoPass);
      }
    } catch (err: any) {
      console.error('Demo auth error:', err);
      setError(err?.message || 'Failed to sign in with demo account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex flex-col justify-center items-center p-4">
      {/* Top Emblem / Title */}
      <div className="max-w-md w-full text-center mb-6 space-y-2">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-600 text-white shadow-xl mb-1 ring-4 ring-emerald-500/20">
          <School className="w-8 h-8" />
        </div>
        <div className="text-amber-400 font-semibold tracking-wider text-xs uppercase">
          शिक्षा विभाग, बिहार सरकार (DEPARTMENT OF EDUCATION, BIHAR)
        </div>
        <h1 className="text-2xl font-black text-white tracking-tight">
          Bihar School Teacher Master Data Manager
        </h1>
        <p className="text-xs text-slate-300">
          शिक्षक मास्टर डाटा प्रपत्र (I - X) आधिकारिक पोर्टल • प्रधान शिक्षक / प्रधानाध्यापक लॉगिन
        </p>
      </div>

      {/* Login Card */}
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Banner */}
        <div className="bg-slate-900 text-white p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold tracking-wide uppercase">
              Headmaster Secure Portal
            </span>
          </div>
          <span className="text-[10px] bg-slate-800 text-amber-300 px-2 py-0.5 rounded font-mono">
            UDISE VERIFIED
          </span>
        </div>

        <div className="p-6 space-y-5">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Quick Demo Headmaster Button */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center space-y-2">
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-amber-900">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Instant Evaluation</span>
            </div>
            <p className="text-[11px] text-amber-700">
              Click below to login instantly as a Bihar Headmaster with preloaded sample school records:
            </p>
            <button
              type="button"
              onClick={handleQuickDemoHM}
              disabled={loading}
              className="w-full py-2 px-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white text-xs font-bold rounded-lg shadow transition flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              <span>Instant HM Demo Sign-In</span>
            </button>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-3 text-[11px] font-semibold text-slate-400 uppercase">
              Or Use Your Credentials
            </span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          {/* Google Popup Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-sm disabled:opacity-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Email / Password Form */}
          <form onSubmit={handleEmailAuth} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                HM Official Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="headmaster@school.edu.in"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow transition flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              {isRegister ? <UserPlus className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
              <span>{loading ? 'Authenticating...' : isRegister ? 'Register HM Account' : 'Sign In as Headmaster'}</span>
            </button>
          </form>

          {/* Toggle Register / Login */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => {
                setIsRegister(!isRegister);
                setError(null);
              }}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
            >
              {isRegister
                ? 'Already have an account? Sign In'
                : 'Need a new school account? Create HM Account'}
            </button>
          </div>
        </div>

        {/* Footer Security Note */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-emerald-600" />
          <span>Tenant isolation enforced via Firebase Security Rules</span>
        </div>
      </div>
    </div>
  );
};

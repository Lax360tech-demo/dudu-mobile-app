import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Zap, Lock, Mail, ShieldCheck, ArrowRight } from 'lucide-react';

export const AdminLoginScreen = () => {
  const navigate = useNavigate();
  const { setIsAdminAuthenticated } = useApp();
  const [email, setEmail] = useState('admin@lax360demo.com');
  const [password, setPassword] = useState('demo1234');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsAdminAuthenticated(true);
      navigate('/admin/dashboard');
    }, 600);
  };

  const handleQuickDemoLogin = () => {
    setIsAdminAuthenticated(true);
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white mx-auto shadow-md">
            <Zap className="w-6 h-6 fill-amber-300 text-amber-300 animate-pulse" />
          </div>
          <h1 className="text-xl font-black text-white tracking-tight">LAX360 Dark Store Admin</h1>
          <p className="text-xs text-slate-400">
            Sign in to access order queue, inventory control & live fleet dispatch
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-400 block mb-1">
              Admin Email Address
            </label>
            <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus-within:ring-1 focus-within:ring-brand-500">
              <Mail className="w-4 h-4 text-slate-500 mr-2 shrink-0" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent focus:outline-none w-full"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 block mb-1">
              Security Password
            </label>
            <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus-within:ring-1 focus-within:ring-brand-500">
              <Lock className="w-4 h-4 text-slate-500 mr-2 shrink-0" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent focus:outline-none w-full"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-md transition flex items-center justify-center space-x-2"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In as Administrator'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-slate-900 px-2 text-slate-500">or presentation access</span>
          </div>
        </div>

        {/* Quick Demo Login */}
        <button
          type="button"
          onClick={handleQuickDemoLogin}
          className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center space-x-2 transition"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>One-Click Demo Admin Login</span>
        </button>
      </div>
    </div>
  );
};

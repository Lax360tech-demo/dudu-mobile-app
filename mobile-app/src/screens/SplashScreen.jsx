import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, ShieldCheck, ArrowRight, Sparkles, Clock, Leaf } from 'lucide-react';

export const SplashScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-full bg-gradient-to-b from-brand-950 via-slate-900 to-slate-950 text-white p-6 flex flex-col justify-between">
      <div className="pt-8 text-center">
        <div className="w-16 h-16 rounded-3xl bg-brand-600 flex items-center justify-center text-white mx-auto mb-4 shadow-xl shadow-brand-500/20">
          <Zap className="w-8 h-8 text-amber-300 fill-amber-300 animate-pulse" />
        </div>

        <h1 className="text-3xl font-black tracking-tight text-white">LAX360</h1>
        <p className="text-sm text-brand-200 mt-1 font-medium">
          Groceries & Essentials in 10 Minutes
        </p>

        <div className="mt-8 space-y-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-left text-xs">
          <div className="flex items-center space-x-2.5 text-slate-300">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Superfast 10-12 min doorstep delivery</span>
          </div>
          <div className="flex items-center space-x-2.5 text-slate-300">
            <Leaf className="w-4 h-4 text-emerald-400" />
            <span>100% farm fresh organic produce</span>
          </div>
          <div className="flex items-center space-x-2.5 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-brand-400" />
            <span>Interactive simulated order & rider tracking</span>
          </div>
        </div>
      </div>

      <div className="space-y-3 pb-6">
        <button
          onClick={() => navigate('/app')}
          className="w-full bg-brand-600 hover:bg-brand-500 text-white font-black py-3.5 rounded-2xl shadow-lg transition flex items-center justify-center space-x-2 text-xs"
        >
          <span>Start Shopping as Guest</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => navigate('/app/login')}
          className="w-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-bold py-3 rounded-2xl text-xs border border-slate-700 transition"
        >
          Sign In with Mobile (Demo)
        </button>

        <p className="text-[10px] text-slate-500 text-center">
          ⚡ Demo Prototype for LAX360 Presentation
        </p>
      </div>
    </div>
  );
};

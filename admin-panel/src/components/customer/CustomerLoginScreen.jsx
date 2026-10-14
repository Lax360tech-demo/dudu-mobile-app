import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Zap, ShieldCheck, ArrowRight, Smartphone, Sparkles } from 'lucide-react';

export const CustomerLoginScreen = () => {
  const navigate = useNavigate();
  const { setIsCustomerAuthenticated } = useApp();
  const [phone, setPhone] = useState('9876543210');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('phone'); // phone, otp
  const [loading, setLoading] = useState(false);

  const handleSendOtp = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
      setOtp('4321'); // Auto-fill demo OTP
    }, 600);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsCustomerAuthenticated(true);
      navigate('/app');
    }, 600);
  };

  const handleGuestEntry = () => {
    setIsCustomerAuthenticated(true);
    navigate('/app');
  };

  return (
    <div className="min-h-full bg-gradient-to-b from-brand-950 via-slate-900 to-slate-950 text-white p-6 flex flex-col justify-between">
      {/* Top Branding */}
      <div>
        <div className="flex items-center space-x-2 text-brand-400 font-bold tracking-widest text-sm mb-6">
          <Zap className="w-5 h-5 text-amber-400 fill-amber-400 animate-bounce" />
          <span>LAX360 QUICK COMMERCE</span>
        </div>

        <div className="space-y-2 mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-white leading-tight">
            Groceries delivered in <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-400 to-brand-400">10 Minutes</span>.
          </h1>
          <p className="text-sm text-slate-400">
            India's fastest doorstep delivery experience for fruits, veggies, snacks & electronics.
          </p>
        </div>
      </div>

      {/* Auth Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-2xl backdrop-blur-md">
        {step === 'phone' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Mobile Number
              </label>
              <div className="flex items-center bg-slate-950 border border-slate-700 rounded-2xl px-3 py-2.5 focus-within:ring-2 focus-within:ring-brand-500">
                <span className="text-xs font-bold text-slate-400 mr-2 border-r border-slate-700 pr-2">
                  🇮🇳 +91
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 10-digit number"
                  className="bg-transparent text-white text-sm focus:outline-none w-full font-medium"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || phone.length < 10}
              className="w-full bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold py-3 rounded-2xl shadow-lg transition flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <span>{loading ? 'Sending Demo OTP...' : 'Continue'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Enter 4-Digit Demo OTP
                </label>
                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="text-[11px] text-brand-400 hover:underline"
                >
                  Change Number
                </button>
              </div>
              <input
                type="text"
                maxLength={4}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="4 3 2 1"
                className="w-full bg-slate-950 border border-brand-500/50 rounded-2xl px-4 py-3 text-center text-xl font-bold tracking-widest text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                required
              />
              <span className="text-[10px] text-emerald-400 mt-1 block text-center">
                ✨ Demo OTP auto-filled: 4321
              </span>
            </div>

            <button
              type="submit"
              disabled={loading || otp.length < 4}
              className="w-full bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold py-3 rounded-2xl shadow-lg transition flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <span>{loading ? 'Verifying...' : 'Verify & Enter Demo'}</span>
              <ShieldCheck className="w-4 h-4" />
            </button>
          </form>
        )}

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-slate-900 px-2 text-slate-500">or</span>
          </div>
        </div>

        {/* 1-Click Guest Access */}
        <button
          type="button"
          onClick={handleGuestEntry}
          className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold py-2.5 rounded-2xl text-xs flex items-center justify-center space-x-2 transition"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Explore Prototype as Guest</span>
        </button>
      </div>

      {/* Safety & Compliance Badge */}
      <div className="pt-4 text-center">
        <p className="text-[11px] text-slate-500">
          🔒 Demo Presentation Environment • No SMS or Payments Billed
        </p>
      </div>
    </div>
  );
};

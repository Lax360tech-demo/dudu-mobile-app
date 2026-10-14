import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, ShieldCheck, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';

export const LoginScreen = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('9876543210');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('phone');
  const [loading, setLoading] = useState(false);

  const handleSendOtp = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
      setOtp('4321');
    }, 600);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/app');
    }, 600);
  };

  return (
    <div className="min-h-full bg-gradient-to-b from-brand-950 via-slate-900 to-slate-950 text-white p-6 flex flex-col justify-between">
      <div>
        <button
          onClick={() => navigate(-1)}
          className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center space-x-2 text-brand-400 font-bold tracking-widest text-xs mb-3">
          <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span>LAX360 QUICK COMMERCE</span>
        </div>

        <h1 className="text-2xl font-black text-white leading-tight mb-2">
          Doorstep delivery in 10 minutes.
        </h1>
        <p className="text-xs text-slate-400">
          Enter your mobile number to sign in or test the prototype as guest.
        </p>
      </div>

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
              className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-3 rounded-2xl shadow-lg transition flex items-center justify-center space-x-2 disabled:opacity-50 text-xs"
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
                  Change
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
                ✨ Auto-filled demo OTP: 4321
              </span>
            </div>

            <button
              type="submit"
              disabled={loading || otp.length < 4}
              className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-3 rounded-2xl shadow-lg transition flex items-center justify-center space-x-2 text-xs"
            >
              <span>{loading ? 'Verifying...' : 'Verify & Enter'}</span>
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

        <button
          type="button"
          onClick={() => navigate('/app')}
          className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold py-2.5 rounded-2xl text-xs flex items-center justify-center space-x-2 transition"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Explore Prototype as Guest</span>
        </button>
      </div>

      <div className="pt-4 text-center">
        <p className="text-[11px] text-slate-500">
          🔒 Demo Environment • No real SMS billed
        </p>
      </div>
    </div>
  );
};

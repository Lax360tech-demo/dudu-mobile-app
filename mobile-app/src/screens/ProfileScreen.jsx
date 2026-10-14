import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CustomerLocationModal } from '../components/CustomerLocationModal';
import {
  User,
  MapPin,
  HelpCircle,
  RotateCcw,
  LogOut,
  ChevronRight,
  Shield,
  Zap,
  Gift,
  Clock,
  Sparkles,
  Phone,
  CheckCircle2,
  Plus
} from 'lucide-react';

export const ProfileScreen = () => {
  const navigate = useNavigate();
  const { customer, resetAllDemoData, simulationSpeed, setSimulationSpeed } = useApp();
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showFaqModal, setShowFaqModal] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleReset = () => {
    if (window.confirm('Reset all demo orders, cart, and mock settings to initial state?')) {
      resetAllDemoData();
      setResetSuccess(true);
      setTimeout(() => setResetSuccess(false), 2500);
    }
  };

  const handleSignOut = () => {
    navigate('/app/login');
  };

  return (
    <div className="space-y-4 p-3 sm:p-4 pb-8">
      <CustomerLocationModal
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
      />

      {/* FAQ Modal */}
      {showFaqModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full space-y-4 shadow-2xl animate-in zoom-in-95 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <HelpCircle className="w-5 h-5 text-brand-600" />
                <h3 className="font-black text-slate-900 text-sm">Customer FAQs</h3>
              </div>
              <button
                onClick={() => setShowFaqModal(false)}
                className="text-xs font-bold text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <h4 className="font-extrabold text-slate-900 mb-1">
                  ⚡ How does 10-minute delivery work?
                </h4>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  LAX360 operates micro-fulfillment centers (dark stores) within 1.8km radius of customers in Bandra West. Pickers assemble bags in 120 seconds, and riders dispatch immediately.
                </p>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <h4 className="font-extrabold text-slate-900 mb-1">
                  📦 Are the fresh items sanitized?
                </h4>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  All fruits, vegetables, and greens undergo 3-step ozone sanitization and are stored in temperature-controlled cold pods.
                </p>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <h4 className="font-extrabold text-slate-900 mb-1">
                  💳 What payment methods are supported?
                </h4>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  In this demo prototype, UPI (Instant), Visa/Mastercard credit/debit cards, and Cash on Delivery are fully simulated.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowFaqModal(false)}
              className="w-full bg-brand-600 text-white font-bold py-2.5 rounded-xl text-xs hover:bg-brand-500"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between pb-1">
        <h2 className="text-base font-black text-slate-900 tracking-tight">My Account</h2>
        <span className="text-[10px] font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full border border-brand-200">
          Demo Customer
        </span>
      </div>

      {/* Profile Hero Card */}
      <div className="bg-gradient-to-r from-brand-600 via-purple-700 to-indigo-800 rounded-3xl p-4 sm:p-5 text-white shadow-xl shadow-brand-500/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center space-x-3.5 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-black text-xl text-white border border-white/30 shadow-inner">
            {customer.name?.split(' ').map(n => n[0]).join('') || 'RV'}
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-black text-base tracking-tight">{customer.name}</h3>
              <div className="bg-amber-400 text-slate-950 font-black text-[9px] px-1.5 py-0.5 rounded-md flex items-center space-x-0.5">
                <Zap className="w-2.5 h-2.5 fill-slate-950" />
                <span>VIP</span>
              </div>
            </div>
            <p className="text-brand-200 text-xs mt-0.5 font-mono">{customer.phone}</p>
            <p className="text-brand-200/80 text-[11px] truncate max-w-[180px]">{customer.email}</p>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-[11px]">
          <div className="flex items-center space-x-1.5 text-brand-100">
            <Gift className="w-3.5 h-3.5 text-amber-300" />
            <span>LAX Pass Member • Free Delivery</span>
          </div>
          <span className="font-bold text-amber-300">Active</span>
        </div>
      </div>

      {/* Reset Confirmation Banner */}
      {resetSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 flex items-center space-x-2 text-emerald-800 text-xs animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Demo orders, cart, and addresses reset to defaults!</span>
        </div>
      )}

      {/* Saved Addresses Section */}
      <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-brand-600" />
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              Saved Delivery Addresses ({customer.addresses?.length || 0})
            </h4>
          </div>
          <button
            onClick={() => setShowLocationModal(true)}
            className="text-[11px] font-bold text-brand-600 hover:underline flex items-center space-x-0.5"
          >
            <Plus className="w-3 h-3" />
            <span>Add / Manage</span>
          </button>
        </div>

        <div className="space-y-2">
          {customer.addresses?.map((addr) => (
            <div
              key={addr.id}
              onClick={() => setShowLocationModal(true)}
              className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start justify-between cursor-pointer hover:bg-slate-100/70 transition"
            >
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-xs font-bold text-slate-900">{addr.tag}</span>
                  {addr.isDefault && (
                    <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {addr.flat}, {addr.area}, {addr.city}
                </p>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 mt-1" />
            </div>
          ))}
        </div>
      </div>

      {/* Quick Menu Options */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs divide-y divide-slate-100">
        <button
          onClick={() => navigate('/app/orders')}
          className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-brand-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">Order History</span>
              <span className="text-[10px] text-slate-400">View receipts and track shipments</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          onClick={() => setShowFaqModal(true)}
          className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">Customer Support & FAQs</span>
              <span className="text-[10px] text-slate-400">10-minute delivery FAQs and policies</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          onClick={() => alert('Demo Hotline: +91 22 6123 4567 • darkstore-support@lax360.demo')}
          className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">Contact Dark Store Team</span>
              <span className="text-[10px] text-slate-400">Bandra West operations hotline</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      {/* Stakeholder Demo Controls Card */}
      <div className="bg-slate-900 text-white rounded-3xl p-4 shadow-lg space-y-3 border border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5 text-amber-400 font-extrabold text-xs">
            <Sparkles className="w-4 h-4" />
            <span>Prototype Presentation Tools</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">v1.2-web</span>
        </div>

        <p className="text-[11px] text-slate-300">
          Reset all orders and state anytime to deliver a clean customer journey walkthrough to stakeholders.
        </p>

        {/* Speed Multiplier */}
        <div className="flex items-center justify-between pt-1 pb-1 text-xs">
          <span className="text-slate-400">GPS Simulation Speed:</span>
          <div className="flex items-center space-x-1">
            {[1, 2, 5].map((spd) => (
              <button
                key={spd}
                onClick={() => setSimulationSpeed(spd)}
                className={`px-2 py-0.5 rounded-lg text-xs font-bold transition ${
                  simulationSpeed === spd
                    ? 'bg-brand-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleReset}
          className="w-full bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 font-bold py-2.5 rounded-2xl text-xs flex items-center justify-center space-x-2 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Demo Data (Clear Storage)</span>
        </button>

        <button
          onClick={handleSignOut}
          className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-2.5 rounded-2xl text-xs flex items-center justify-center space-x-1.5 transition"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out / Switch Demo User</span>
        </button>
      </div>
    </div>
  );
};

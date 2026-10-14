import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  User,
  MapPin,
  HelpCircle,
  RotateCcw,
  LayoutDashboard,
  LogOut,
  ChevronRight,
  ShieldCheck,
  CreditCard,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  X
} from 'lucide-react';
import { CustomerLocationModal } from './CustomerLocationModal';

export const CustomerProfileScreen = () => {
  const navigate = useNavigate();
  const { customer, resetAllDemoData, setIsCustomerAuthenticated } = useApp();
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showFaqModal, setShowFaqModal] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(null);

  const faqs = [
    {
      q: 'How does 10-minute delivery work?',
      a: 'LAX360 operates micro dark stores within a 2km radius of Bandra West. Our picking team gathers and packs items within 2.5 minutes, and delivery partners express dispatch right away.'
    },
    {
      q: 'Is there a minimum order value for free delivery?',
      a: 'Yes, orders above ₹199 qualify for 100% free delivery. You can also use promo code FREEDEL on checkout.'
    },
    {
      q: 'What if an item is damaged or missing?',
      a: 'We offer instant no-questions-asked refunds directly to your LAX360 wallet or source bank within seconds.'
    },
    {
      q: 'Is live GPS tracking available for my rider?',
      a: 'In this presentation prototype, live telemetry is authentically simulated along neighborhood streets with controllable demo controls.'
    }
  ];

  const handleLogout = () => {
    setIsCustomerAuthenticated(false);
    navigate('/app/login');
  };

  return (
    <div className="p-3 sm:p-4 space-y-4 pb-24">
      <CustomerLocationModal
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
      />

      {/* User Card */}
      <div className="bg-gradient-to-r from-brand-600 to-indigo-700 rounded-3xl p-4 text-white shadow-md flex items-center space-x-3.5">
        <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-xl font-black border border-white/30">
          RV
        </div>
        <div className="flex-1">
          <h2 className="text-base font-black leading-tight">{customer.name}</h2>
          <p className="text-xs text-brand-100">{customer.phone}</p>
          <span className="inline-block mt-1 bg-amber-400 text-slate-950 font-bold text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider">
            LAX VIP Member
          </span>
        </div>
      </div>

      {/* Quick Account Links */}
      <div className="bg-white rounded-2xl border border-slate-100 divide-y divide-slate-100 shadow-xs overflow-hidden">
        {/* Saved Addresses */}
        <div
          onClick={() => setShowLocationModal(true)}
          className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800">Saved Delivery Addresses</div>
              <div className="text-[10px] text-slate-400">{customer.addresses?.length || 3} saved addresses</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>

        {/* Customer Support FAQ */}
        <div
          onClick={() => setShowFaqModal(true)}
          className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800">Help & Support FAQ</div>
              <div className="text-[10px] text-slate-400">Order issues, refunds, live chat</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>

        {/* Switch to Admin Dashboard */}
        <div
          onClick={() => navigate('/admin/dashboard')}
          className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition bg-indigo-50/30"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <LayoutDashboard className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-indigo-950">Switch to Admin Panel</div>
              <div className="text-[10px] text-indigo-600">Inspect orders, products & inventory</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-indigo-400" />
        </div>
      </div>

      {/* Demo Prototype Settings */}
      <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-xs space-y-3">
        <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
          Demo Presentation Controls
        </h3>

        <button
          onClick={resetAllDemoData}
          className="w-full bg-slate-50 hover:bg-red-50 text-slate-700 hover:text-red-700 border border-slate-200 hover:border-red-200 font-bold p-3 rounded-xl text-xs flex items-center justify-center space-x-2 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Demo Data to Defaults</span>
        </button>

        <button
          onClick={handleLogout}
          className="w-full text-slate-500 hover:text-slate-800 text-xs font-semibold py-2 flex items-center justify-center space-x-1"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Logout (Customer Demo)</span>
        </button>
      </div>

      {/* FAQ Drawer Modal */}
      {showFaqModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm p-0 animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-t-3xl shadow-2xl p-4 max-h-[80vh] overflow-y-auto space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">Customer Care & FAQ</h3>
              <button
                onClick={() => setShowFaqModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              {faqs.map((faq, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                  <h4 className="text-xs font-bold text-slate-900">{faq.q}</h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                alert('Demo Support Assistant: All systems operational. Your delivery partner is on schedule!');
                setShowFaqModal(false);
              }}
              className="w-full bg-brand-600 text-white font-bold py-2.5 rounded-xl text-xs shadow-md"
            >
              Start Live Chat (Demo Assistant)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

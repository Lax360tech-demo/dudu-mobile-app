import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Home,
  Grid,
  ShoppingBag,
  User,
  MapPin,
  ChevronDown,
  Search,
  Zap,
  ArrowRight,
  Wifi,
  BatteryCharging
} from 'lucide-react';
import { CustomerLocationModal } from './CustomerLocationModal';

export const PhoneFrameContainer = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isPhoneFrame, cart, getCartTotals, selectedAddress } = useApp();
  const [showLocationModal, setShowLocationModal] = useState(false);

  const { itemCount, grandTotal } = getCartTotals();

  // Navigation tabs
  const navTabs = [
    { label: 'Home', path: '/app', icon: Home },
    { label: 'Categories', path: '/app/categories', icon: Grid },
    { label: 'Orders', path: '/app/orders', icon: ShoppingBag },
    { label: 'Profile', path: '/app/profile', icon: User }
  ];

  const isCurrentTab = (path) => {
    if (path === '/app') return location.pathname === '/app';
    return location.pathname.startsWith(path);
  };

  // Hide bottom bar on specific checkout/tracking flows if preferred or keep it clean
  const hideBottomBar = location.pathname.startsWith('/app/track') || location.pathname === '/app/checkout';
  const showFloatingCart = itemCount > 0 && !location.pathname.startsWith('/app/cart') && !location.pathname.startsWith('/app/checkout') && !location.pathname.startsWith('/app/track');

  return (
    <div className={`w-full flex justify-center items-center py-4 sm:py-8 ${isPhoneFrame ? 'bg-slate-950/90 min-h-[calc(100vh-45px)]' : 'bg-slate-100 min-h-screen'}`}>
      <CustomerLocationModal
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
      />

      {/* Frame Container */}
      <div
        className={`w-full transition-all duration-300 relative flex flex-col ${
          isPhoneFrame
            ? 'max-w-[420px] h-[870px] bg-white rounded-[48px] phone-viewport-shadow overflow-hidden border-[8px] border-slate-800'
            : 'max-w-md min-h-screen bg-white shadow-2xl rounded-none sm:rounded-3xl overflow-hidden'
        }`}
      >
        {/* iOS Style Status Bar */}
        {isPhoneFrame && (
          <div className="bg-slate-900 text-white px-7 pt-3 pb-2 flex items-center justify-between text-[11px] font-semibold select-none z-40 relative">
            <span>9:41</span>
            
            {/* Dynamic Island Pill */}
            <div className="w-24 h-4 bg-black rounded-full absolute left-1/2 -translate-x-1/2 top-2 flex items-center justify-end px-2">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-950 border border-slate-800" />
            </div>

            <div className="flex items-center space-x-1.5 text-slate-300">
              <span className="text-[10px] font-bold">5G</span>
              <Wifi className="w-3 h-3" />
              <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
            </div>
          </div>
        )}

        {/* Top Location Bar (Quick Commerce Hallmark) */}
        {!location.pathname.startsWith('/app/login') && (
          <div className="bg-white px-4 py-2.5 border-b border-slate-100 sticky top-0 z-30 flex items-center justify-between shadow-xs">
            <div
              onClick={() => setShowLocationModal(true)}
              className="flex items-center space-x-2 cursor-pointer group flex-1 max-w-[70%]"
            >
              <div className="w-7 h-7 rounded-full bg-brand-50 flex items-center justify-center text-brand-600 group-hover:bg-brand-100 transition">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="truncate text-left">
                <div className="flex items-center space-x-1">
                  <span className="text-xs font-black text-slate-900 tracking-tight">
                    {selectedAddress?.tag || 'Home'}
                  </span>
                  <ChevronDown className="w-3 h-3 text-slate-500 group-hover:translate-y-0.5 transition" />
                </div>
                <p className="text-[10px] text-slate-500 truncate">
                  {selectedAddress?.flat || 'Linking Rd'}, {selectedAddress?.area || 'Bandra West'}
                </p>
              </div>
            </div>

            {/* Delivery Guarantee Pill */}
            <div className="flex items-center space-x-1 bg-gradient-to-r from-amber-500 to-rose-500 text-white px-2.5 py-1 rounded-full shadow-sm text-[10px] font-black tracking-wide">
              <Zap className="w-3 h-3 fill-white" />
              <span>10 MINS</span>
            </div>
          </div>
        )}

        {/* Scrollable Viewport Body */}
        <main className="flex-1 overflow-y-auto bg-slate-50 relative pb-20 no-scrollbar">
          {children}
        </main>

        {/* Floating Cart CTA Drawer (Appears when cart has items) */}
        {showFloatingCart && (
          <div className="absolute bottom-16 left-3 right-3 z-40 animate-in slide-in-from-bottom duration-200">
            <div
              onClick={() => navigate('/app/cart')}
              className="bg-brand-600 hover:bg-brand-700 text-white p-3 rounded-2xl shadow-xl flex items-center justify-between cursor-pointer border border-brand-500 transition active:scale-[0.99]"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center font-bold text-sm">
                  {itemCount}
                </div>
                <div>
                  <div className="text-xs font-extrabold flex items-center space-x-1">
                    <span>₹{grandTotal}</span>
                    <span className="text-brand-200 font-normal text-[10px]">plus taxes</span>
                  </div>
                  <div className="text-[10px] text-brand-100 font-medium">
                    ⚡ 10 min express dispatch
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-1 bg-white text-brand-700 px-3 py-1.5 rounded-xl font-bold text-xs shadow-xs">
                <span>View Cart</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        )}

        {/* Bottom Tab Bar Navigation */}
        {!hideBottomBar && !location.pathname.startsWith('/app/login') && (
          <nav className="bg-white border-t border-slate-100 px-2 py-2 flex items-center justify-around sticky bottom-0 z-30 shadow-lg">
            {navTabs.map((tab) => {
              const active = isCurrentTab(tab.path);
              const Icon = tab.icon;
              return (
                <button
                  key={tab.path}
                  onClick={() => navigate(tab.path)}
                  className={`flex flex-col items-center py-1 px-3 rounded-xl transition duration-150 relative ${
                    active ? 'text-brand-600 font-bold' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${active ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                  <span className="text-[10px] mt-0.5">{tab.label}</span>
                  {tab.path === '/app/orders' && (
                    <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  )}
                </button>
              );
            })}
          </nav>
        )}

        {/* iPhone Bottom Home Indicator Bar */}
        {isPhoneFrame && (
          <div className="bg-white pt-1 pb-2 flex justify-center">
            <div className="w-32 h-1 bg-slate-300 rounded-full" />
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Smartphone,
  LayoutDashboard,
  RotateCcw,
  Zap,
  Navigation,
  Eye,
  Maximize2,
  Minimize2,
  ChevronDown,
  Clock,
  ShieldAlert
} from 'lucide-react';

export const DemoPresentationToolbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    isPhoneFrame,
    setIsPhoneFrame,
    resetAllDemoData,
    orders,
    simulationSpeed,
    setSimulationSpeed
  } = useApp();

  const [showOrderDropdown, setShowOrderDropdown] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);

  const isCustomerApp = location.pathname.startsWith('/app');
  const isAdminPanel = location.pathname.startsWith('/admin');

  // Find active out for delivery order for quick jump
  const activeDeliveryOrder = orders.find(o => o.status === 'Out for Delivery') || orders[0];

  const handleReset = () => {
    resetAllDemoData();
    setResetConfirm(false);
    navigate('/app');
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 text-white select-none px-3 py-2 text-xs shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left: Brand Identity */}
        <div className="flex items-center space-x-2.5">
          <div className="flex items-center space-x-1.5 bg-gradient-to-r from-brand-600 to-indigo-600 px-2.5 py-1 rounded-lg font-bold tracking-wider text-white shadow-sm">
            <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300 animate-pulse" />
            <span>LAX360</span>
          </div>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px] font-medium border border-slate-700">
            Zepto-Ref Quick Commerce Demo
          </span>
        </div>

        {/* Center: Presentation Mode Switcher */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 space-x-1">
          <button
            onClick={() => navigate('/app')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all duration-200 ${
              isCustomerApp
                ? 'bg-brand-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Customer App (Mobile)</span>
          </button>

          <button
            onClick={() => navigate('/admin/dashboard')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all duration-200 ${
              isAdminPanel
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Admin Operations</span>
          </button>
        </div>

        {/* Right: Presentation Utilities */}
        <div className="flex items-center space-x-2">
          {/* Quick jump to live tracking */}
          {activeDeliveryOrder && (
            <div className="relative">
              <button
                onClick={() => setShowOrderDropdown(!showOrderDropdown)}
                className="flex items-center space-x-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 px-2.5 py-1 rounded-lg transition"
                title="Quick jump to Live Delivery Tracking"
              >
                <Navigation className="w-3 h-3 text-amber-400 animate-spin" />
                <span className="font-medium hidden md:inline">Live Tracking: #{activeDeliveryOrder.id}</span>
                <ChevronDown className="w-3 h-3 ml-0.5" />
              </button>

              {showOrderDropdown && (
                <div className="absolute right-0 mt-1 w-60 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 z-50">
                  <div className="text-[10px] text-slate-400 font-semibold px-2 py-1 uppercase tracking-wider">
                    Inspect Active Demos
                  </div>
                  <button
                    onClick={() => {
                      setShowOrderDropdown(false);
                      navigate(`/app/track/${activeDeliveryOrder.id}`);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-800 text-slate-200 flex items-center justify-between"
                  >
                    <span>View Customer Tracking</span>
                    <span className="text-[10px] bg-brand-900 text-brand-300 px-1.5 py-0.5 rounded">Rider Map</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowOrderDropdown(false);
                      navigate(`/admin/delivery-tracking`);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-800 text-slate-200 flex items-center justify-between mt-1"
                  >
                    <span>View Admin Fleet Map</span>
                    <span className="text-[10px] bg-indigo-900 text-indigo-300 px-1.5 py-0.5 rounded">Fleet</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowOrderDropdown(false);
                      navigate(`/admin/orders/${activeDeliveryOrder.id}`);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-800 text-slate-200 flex items-center justify-between mt-1"
                  >
                    <span>Admin Order Detail</span>
                    <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">Status</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Phone Bezel toggle (Customer Mode) */}
          {isCustomerApp && (
            <button
              onClick={() => setIsPhoneFrame(!isPhoneFrame)}
              className="flex items-center space-x-1 px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
              title={isPhoneFrame ? "Switch to Full Browser View" : "Switch to Phone Mockup Frame"}
            >
              {isPhoneFrame ? (
                <>
                  <Maximize2 className="w-3 h-3 text-slate-400" />
                  <span className="hidden lg:inline text-[11px]">Full Screen</span>
                </>
              ) : (
                <>
                  <Minimize2 className="w-3 h-3 text-slate-400" />
                  <span className="hidden lg:inline text-[11px]">Phone Frame</span>
                </>
              )}
            </button>
          )}

          {/* Reset Demo State Button */}
          {resetConfirm ? (
            <div className="flex items-center space-x-1 bg-red-950/70 border border-red-700/60 px-2 py-0.5 rounded-lg">
              <span className="text-[10px] text-red-300 font-semibold">Confirm Reset?</span>
              <button
                onClick={handleReset}
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-1.5 py-0.5 rounded text-[10px]"
              >
                Yes
              </button>
              <button
                onClick={() => setResetConfirm(false)}
                className="text-slate-400 hover:text-white px-1 text-[10px]"
              >
                No
              </button>
            </div>
          ) : (
            <button
              onClick={() => setResetConfirm(true)}
              className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-red-900/30 hover:border-red-700/50 text-slate-300 hover:text-red-300 border border-slate-700 transition"
              title="Reset all orders, stock, and cart to default demo seed data"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden md:inline">Reset Demo</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

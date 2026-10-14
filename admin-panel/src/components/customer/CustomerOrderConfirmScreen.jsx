import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  CheckCircle2,
  Navigation,
  Clock,
  ArrowRight,
  ShoppingBag,
  MapPin,
  Sparkles,
  Zap
} from 'lucide-react';

export const CustomerOrderConfirmScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders } = useApp();

  const order = orders.find(o => o.id === id) || orders[0];

  return (
    <div className="flex flex-col min-h-full bg-white p-4 space-y-5 pb-24 text-center">
      {/* Animated Success Badge */}
      <div className="pt-6 pb-2">
        <div className="relative inline-block">
          <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mx-auto shadow-inner animate-in zoom-in-75 duration-300">
            <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
          </div>
          <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center text-xs font-black shadow-md animate-bounce">
            ⚡
          </div>
        </div>

        <h1 className="text-xl font-black text-slate-900 mt-4 leading-tight">
          Order Placed Successfully!
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Dark store picking team has received your order
        </p>

        <div className="inline-block mt-3 px-3 py-1 bg-slate-100 rounded-full text-xs font-mono font-bold text-slate-800 border border-slate-200">
          Order ID: #{order?.id || id}
        </div>
      </div>

      {/* 10-Min Delivery ETA Card */}
      <div className="bg-gradient-to-r from-brand-50 to-indigo-50 border border-brand-200 rounded-2xl p-4 text-left shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-black text-brand-900 flex items-center space-x-1">
            <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>Express 10-Minute Dispatch</span>
          </span>
          <span className="text-[10px] bg-brand-600 text-white font-bold px-2 py-0.5 rounded-full">
            ON TRACK
          </span>
        </div>

        <div className="text-sm font-extrabold text-slate-900">
          Estimated Delivery: {order?.estimatedDeliveryTime || '10-12 Mins'}
        </div>
        <p className="text-[11px] text-slate-600 mt-0.5">
          Delivering to: <span className="font-semibold text-slate-800">{order?.deliveryAddress?.flat || 'Home Address'}</span>
        </p>
      </div>

      {/* Quick Track Button */}
      <button
        onClick={() => navigate(`/app/track/${order?.id}`)}
        className="w-full bg-brand-600 hover:bg-brand-700 text-white font-black py-3.5 rounded-2xl shadow-xl flex items-center justify-center space-x-2 transition active:scale-[0.99]"
      >
        <Navigation className="w-4 h-4 fill-current" />
        <span>Track Live Delivery on Map</span>
        <ArrowRight className="w-4 h-4" />
      </button>

      {/* Order Item Summary */}
      <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80 text-left space-y-2 text-xs">
        <div className="flex items-center justify-between font-bold text-slate-800 pb-1 border-b border-slate-200">
          <span>Items Ordered ({order?.items?.length || 0})</span>
          <span className="text-brand-600 font-black">₹{order?.billSummary?.grandTotal || 0}</span>
        </div>

        <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
          {order?.items?.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-[11px] text-slate-600">
              <span className="truncate max-w-[200px]">
                {item.quantity}x {item.name}
              </span>
              <span className="font-semibold text-slate-800">₹{item.price * item.quantity}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Continue Shopping button */}
      <button
        onClick={() => navigate('/app')}
        className="text-xs font-bold text-brand-600 hover:text-brand-700 hover:underline pt-2 block mx-auto"
      >
        ← Continue Shopping
      </button>
    </div>
  );
};

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  CheckCircle2,
  Zap,
  MapPin,
  Clock,
  ArrowRight,
  ShoppingBag,
  ChevronRight
} from 'lucide-react';

export const OrderConfirmationScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders } = useApp();

  const order = orders.find(o => o.id === id) || orders[0];

  return (
    <div className="p-4 sm:p-5 flex flex-col justify-between min-h-full space-y-6">
      <div className="flex flex-col items-center text-center pt-4">
        {/* Animated Celebration Icon */}
        <div className="relative mb-4">
          <div className="w-20 h-20 rounded-full bg-emerald-50 border-4 border-emerald-100 flex items-center justify-center text-emerald-600 shadow-xl shadow-emerald-500/10">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-amber-400 border-2 border-white flex items-center justify-center text-slate-900 shadow-sm animate-bounce">
            <Zap className="w-3.5 h-3.5 fill-slate-900 text-slate-900" />
          </div>
        </div>

        <span className="text-[10px] font-black tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full uppercase border border-emerald-200">
          Order Placed Successfully
        </span>

        <h1 className="text-xl font-black text-slate-900 mt-2">
          Your order is on the way!
        </h1>
        <p className="text-xs text-slate-500 mt-1 max-w-[260px]">
          Our dark store picker has started packing your fresh items in Bandra West.
        </p>

        {/* Order ID Badge */}
        <div className="mt-3 inline-flex items-center space-x-1.5 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full text-xs font-mono font-bold text-slate-800">
          <span>Order ID:</span>
          <span className="text-brand-600">#{order?.id || id}</span>
        </div>

        {/* 10-Minute Guarantee Highlight Card */}
        <div className="w-full bg-gradient-to-br from-brand-50 via-purple-50 to-indigo-50 border border-brand-100 rounded-2xl p-4 mt-5 text-left shadow-xs">
          <div className="flex items-center justify-between pb-2 border-b border-brand-100/60">
            <div className="flex items-center space-x-1.5 text-brand-700 font-extrabold text-xs">
              <Zap className="w-3.5 h-3.5 fill-brand-600 text-brand-600" />
              <span>10-Minute Dark Store Dispatch</span>
            </div>
            <span className="text-[10px] font-bold text-brand-600 bg-white px-2 py-0.5 rounded-full border border-brand-200">
              Live
            </span>
          </div>

          <div className="mt-3 flex items-start justify-between">
            <div>
              <div className="text-sm font-black text-slate-900">
                {order?.estimatedDeliveryTime || 'Arriving in 10-12 mins'}
              </div>
              <div className="flex items-center space-x-1 text-[11px] text-slate-500 mt-1">
                <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                <span className="truncate max-w-[220px]">
                  {order?.deliveryAddress?.flat || 'Home'}, {order?.deliveryAddress?.area || 'Bandra West'}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 font-medium block">Total Paid</span>
              <span className="text-sm font-black text-slate-900">
                ₹{order?.billSummary?.grandTotal || 0}
              </span>
            </div>
          </div>
        </div>

        {/* Order Items Preview */}
        {order?.items && order.items.length > 0 && (
          <div className="w-full bg-white rounded-2xl border border-slate-100 p-3 mt-4 text-left shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Items Ordered ({order.items.length})
              </span>
              <button
                onClick={() => navigate(`/app/orders/${order.id}`)}
                className="text-[11px] font-bold text-brand-600 hover:underline flex items-center"
              >
                <span>View Receipt</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <div className="divide-y divide-slate-50">
              {order.items.slice(0, 3).map((item, idx) => (
                <div key={idx} className="py-1.5 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2 truncate pr-2">
                    <span className="font-bold text-slate-700">{item.quantity}x</span>
                    <span className="text-slate-600 truncate">{item.name}</span>
                  </div>
                  <span className="font-extrabold text-slate-900 shrink-0">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
              {order.items.length > 3 && (
                <div className="pt-1.5 text-center text-[10px] font-semibold text-slate-400">
                  +{order.items.length - 3} more items
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="space-y-2.5 pt-2">
        <button
          onClick={() => navigate(`/app/track/${order?.id}`)}
          className="w-full bg-brand-600 hover:bg-brand-500 active:scale-[0.99] text-white font-extrabold py-3.5 rounded-2xl shadow-lg shadow-brand-600/20 transition flex items-center justify-center space-x-2 text-xs"
        >
          <Zap className="w-4 h-4 fill-amber-300 text-amber-300" />
          <span>Track Delivery Live on Map</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => navigate(`/app/orders/${order?.id}`)}
          className="w-full bg-white hover:bg-slate-50 text-slate-700 font-bold py-3 rounded-2xl border border-slate-200 transition flex items-center justify-center space-x-1.5 text-xs shadow-xs"
        >
          <ShoppingBag className="w-3.5 h-3.5 text-slate-500" />
          <span>Order Timeline & Invoice</span>
        </button>

        <button
          onClick={() => navigate('/app')}
          className="w-full text-center py-2 text-xs font-bold text-brand-600 hover:text-brand-700"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

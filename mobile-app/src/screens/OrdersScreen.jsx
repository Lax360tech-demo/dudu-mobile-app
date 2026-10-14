import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  ShoppingBag,
  Zap,
  CheckCircle2,
  Clock,
  ChevronRight,
  Package,
  ArrowRight,
  Navigation
} from 'lucide-react';

export const OrdersScreen = () => {
  const navigate = useNavigate();
  const { orders } = useApp();

  return (
    <div className="space-y-3 p-3 sm:p-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-1">
        <div>
          <h2 className="text-base font-black text-slate-900 tracking-tight">My Orders</h2>
          <p className="text-[11px] text-slate-500">
            {orders.length} total orders placed
          </p>
        </div>
        <div className="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center text-brand-600">
          <ShoppingBag className="w-4 h-4" />
        </div>
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <div className="bg-white rounded-3xl p-8 text-center border border-slate-100 shadow-xs space-y-3 mt-6">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <Package className="w-8 h-8" />
          </div>
          <h3 className="text-sm font-black text-slate-900">No orders yet</h3>
          <p className="text-xs text-slate-500 max-w-[200px] mx-auto">
            Order fresh groceries and get them delivered in 10 minutes!
          </p>
          <button
            onClick={() => navigate('/app')}
            className="bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => {
            const isActive = order.status !== 'Delivered' && order.status !== 'Cancelled';
            const isDelivered = order.status === 'Delivered';

            return (
              <div
                key={order.id}
                onClick={() => navigate(`/app/orders/${order.id}`)}
                className={`bg-white rounded-2xl border transition-all duration-150 p-3.5 shadow-xs cursor-pointer hover:shadow-md ${
                  isActive ? 'border-brand-200 bg-gradient-to-b from-purple-50/30 to-white ring-1 ring-brand-100' : 'border-slate-100'
                }`}
              >
                {/* Top Row: Status & Order ID */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center ${
                        isActive
                          ? 'bg-amber-100 text-amber-700 animate-pulse'
                          : isDelivered
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-rose-100 text-rose-700'
                      }`}
                    >
                      {isActive ? (
                        <Navigation className="w-3.5 h-3.5" />
                      ) : isDelivered ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <Clock className="w-3.5 h-3.5" />
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-900 font-mono">
                        #{order.id}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {new Date(order.createdAt).toLocaleDateString([], {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      isActive
                        ? 'bg-amber-100 text-amber-800 border border-amber-200'
                        : isDelivered
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-rose-100 text-rose-800 border border-rose-200'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Items Summary */}
                <div className="my-2.5 bg-slate-50/80 rounded-xl p-2 text-[11px] text-slate-600 truncate border border-slate-100">
                  <span className="font-semibold text-slate-700">Items: </span>
                  {order.items?.map((i) => `${i.quantity}x ${i.name}`).join(', ')}
                </div>

                {/* Bottom Row: Amount & Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Grand Total</span>
                    <span className="text-sm font-black text-slate-900">
                      ₹{order.billSummary?.grandTotal || 0}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    {isActive && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/app/track/${order.id}`);
                        }}
                        className="bg-brand-600 hover:bg-brand-700 text-white font-black text-[11px] px-3 py-1.5 rounded-xl flex items-center space-x-1 shadow-sm transition active:scale-95"
                      >
                        <Zap className="w-3 h-3 fill-amber-300 text-amber-300" />
                        <span>Live Track</span>
                      </button>
                    )}

                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:text-brand-600 transition">
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

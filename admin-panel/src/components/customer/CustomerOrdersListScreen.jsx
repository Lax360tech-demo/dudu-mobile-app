import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  ShoppingBag,
  Navigation,
  Clock,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  PackageCheck
} from 'lucide-react';

export const CustomerOrdersListScreen = () => {
  const navigate = useNavigate();
  const { orders } = useApp();

  return (
    <div className="p-3 sm:p-4 space-y-4 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div>
          <h1 className="text-base font-black text-slate-900 leading-tight">My Orders</h1>
          <span className="text-[10px] text-slate-400">Past & ongoing deliveries</span>
        </div>
        <div className="text-xs font-bold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-xl">
          {orders.length} Total
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-3">
        {orders.map((order) => {
          const isActive = order.status !== 'Delivered' && order.status !== 'Cancelled';
          const isDelivered = order.status === 'Delivered';

          return (
            <div
              key={order.id}
              onClick={() => navigate(`/app/order/${order.id}`)}
              className="bg-white rounded-2xl border border-slate-100 hover:border-slate-200 p-3.5 shadow-xs transition cursor-pointer space-y-3"
            >
              {/* Order Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    isActive ? 'bg-amber-100 text-amber-700' : isDelivered ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {isActive ? <Navigation className="w-4 h-4 animate-spin" /> : isDelivered ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      Order #{order.id}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {new Date(order.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>

                <div className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                  isActive
                    ? 'bg-amber-50 text-amber-700 border border-amber-200 animate-pulse'
                    : isDelivered
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {order.status}
                </div>
              </div>

              {/* Items Preview */}
              <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
                {order.items?.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-1 bg-slate-50 border border-slate-100 px-2 py-1 rounded-lg text-[10px] text-slate-600 shrink-0"
                  >
                    <span className="font-bold text-slate-800">{item.quantity}x</span>
                    <span className="truncate max-w-[120px]">{item.name}</span>
                  </div>
                ))}
              </div>

              {/* Footer Row */}
              <div className="pt-2 border-t border-slate-50 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">Total Paid</span>
                  <span className="font-black text-slate-900">₹{order.billSummary?.grandTotal}</span>
                </div>

                <div className="flex items-center space-x-2">
                  {isActive && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/app/track/${order.id}`);
                      }}
                      className="bg-brand-600 hover:bg-brand-700 text-white font-bold px-3 py-1.5 rounded-xl text-xs flex items-center space-x-1 shadow-xs"
                    >
                      <Navigation className="w-3 h-3 fill-current" />
                      <span>Track Live</span>
                    </button>
                  )}
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

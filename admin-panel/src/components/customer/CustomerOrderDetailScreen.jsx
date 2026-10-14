import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  Navigation,
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Receipt,
  RotateCcw,
  ShieldCheck,
  CreditCard,
  XCircle
} from 'lucide-react';

export const CustomerOrderDetailScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders, cancelOrder } = useApp();
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const order = orders.find(o => o.id === id);

  if (!order) {
    return (
      <div className="p-8 text-center">
        <h3 className="text-sm font-bold text-slate-800">Order Not Found</h3>
        <button
          onClick={() => navigate('/app/orders')}
          className="mt-4 bg-brand-600 text-white px-4 py-2 rounded-xl text-xs font-bold"
        >
          View All Orders
        </button>
      </div>
    );
  }

  const isActive = order.status !== 'Delivered' && order.status !== 'Cancelled';
  const canCancel = order.status === 'Placed' || order.status === 'Confirmed';

  const handleCancel = () => {
    cancelOrder(order.id, 'Cancelled by Customer');
    setShowCancelConfirm(false);
  };

  return (
    <div className="p-3 sm:p-4 space-y-4 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigate('/app/orders')}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-200"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-sm font-black text-slate-900 leading-tight">Order Details</h1>
            <span className="text-[10px] text-slate-400">ID: #{order.id}</span>
          </div>
        </div>

        {isActive && (
          <button
            onClick={() => navigate(`/app/track/${order.id}`)}
            className="bg-brand-600 text-white font-bold px-3 py-1.5 rounded-xl text-xs flex items-center space-x-1 shadow-xs"
          >
            <Navigation className="w-3 h-3 fill-current" />
            <span>Live Map</span>
          </button>
        )}
      </div>

      {/* Status Hero Card */}
      <div className={`p-4 rounded-2xl border ${
        isActive
          ? 'bg-amber-50/60 border-amber-200 text-amber-900'
          : order.status === 'Delivered'
          ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
          : 'bg-red-50/60 border-red-200 text-red-900'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider block">
              Current Status
            </span>
            <div className="text-base font-extrabold mt-0.5">{order.status}</div>
          </div>
          <div className="text-right text-xs">
            <span className="text-[10px] opacity-80 block">Estimated Time</span>
            <span className="font-bold">{order.estimatedDeliveryTime}</span>
          </div>
        </div>
      </div>

      {/* Items Breakdown */}
      <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-xs space-y-3">
        <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center space-x-1">
          <Receipt className="w-3.5 h-3.5 text-brand-600" />
          <span>Items Ordered ({order.items?.length || 0})</span>
        </h3>

        <div className="divide-y divide-slate-100">
          {order.items?.map((item, idx) => (
            <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2.5">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-10 h-10 rounded-xl object-contain bg-slate-50 border p-1"
                />
                <div>
                  <div className="font-bold text-slate-900">{item.name}</div>
                  <div className="text-[10px] text-slate-400">{item.unit} • Qty: {item.quantity}</div>
                </div>
              </div>
              <span className="font-extrabold text-slate-900">
                ₹{item.price * item.quantity}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery Info */}
      <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-xs space-y-2 text-xs">
        <h3 className="font-black text-slate-900 uppercase tracking-wider text-[11px] flex items-center space-x-1">
          <MapPin className="w-3.5 h-3.5 text-brand-600" />
          <span>Delivery Details</span>
        </h3>

        <div className="text-slate-700">
          <div className="font-bold text-slate-900">{order.customer?.name}</div>
          <div>{order.deliveryAddress?.flat}, {order.deliveryAddress?.street}</div>
          <div className="text-slate-400 text-[11px]">{order.deliveryAddress?.area}</div>
        </div>

        {order.deliveryInstructions && (
          <div className="p-2 bg-slate-50 rounded-xl text-[11px] text-slate-600 mt-2">
            <span className="font-bold">Instructions: </span>
            {order.deliveryInstructions}
          </div>
        )}
      </div>

      {/* Bill & Payment Info */}
      <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-xs space-y-2 text-xs">
        <h3 className="font-black text-slate-900 uppercase tracking-wider text-[11px] flex items-center space-x-1">
          <CreditCard className="w-3.5 h-3.5 text-brand-600" />
          <span>Payment & Billing</span>
        </h3>

        <div className="flex justify-between text-slate-600">
          <span>Payment Method</span>
          <span className="font-bold text-slate-800">{order.paymentMethod}</span>
        </div>

        <div className="flex justify-between text-slate-600">
          <span>Items Total</span>
          <span>₹{order.billSummary?.itemsTotal}</span>
        </div>

        {order.billSummary?.discount > 0 && (
          <div className="flex justify-between text-brand-600 font-semibold">
            <span>Coupon Discount ({order.billSummary.couponCode})</span>
            <span>-₹{order.billSummary.discount}</span>
          </div>
        )}

        <div className="flex justify-between text-slate-600">
          <span>Delivery & Handling Fee</span>
          <span>₹{(order.billSummary?.deliveryFee || 0) + (order.billSummary?.handlingFee || 5)}</span>
        </div>

        {order.billSummary?.tip > 0 && (
          <div className="flex justify-between text-slate-600">
            <span>Rider Tip</span>
            <span>₹{order.billSummary.tip}</span>
          </div>
        )}

        <div className="pt-2 border-t border-slate-100 flex justify-between font-black text-sm text-slate-900">
          <span>Grand Total</span>
          <span className="text-brand-700">₹{order.billSummary?.grandTotal}</span>
        </div>
      </div>

      {/* Cancel Order Option if eligible */}
      {canCancel && (
        <div className="pt-2">
          {showCancelConfirm ? (
            <div className="p-3 bg-red-50 border border-red-200 rounded-2xl text-center space-y-2">
              <span className="text-xs font-bold text-red-900 block">
                Are you sure you want to cancel this order?
              </span>
              <div className="flex justify-center space-x-2">
                <button
                  onClick={handleCancel}
                  className="bg-red-600 text-white font-bold px-4 py-1.5 rounded-xl text-xs hover:bg-red-700"
                >
                  Confirm Cancel
                </button>
                <button
                  onClick={() => setShowCancelConfirm(false)}
                  className="bg-slate-200 text-slate-700 font-bold px-4 py-1.5 rounded-xl text-xs"
                >
                  Nevermind
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowCancelConfirm(true)}
              className="w-full py-2.5 rounded-2xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold transition flex items-center justify-center space-x-1"
            >
              <XCircle className="w-4 h-4" />
              <span>Cancel Order</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

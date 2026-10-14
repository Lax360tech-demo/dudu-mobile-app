import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft,
  Zap,
  Navigation,
  CheckCircle2,
  Clock,
  MapPin,
  CreditCard,
  FileText,
  AlertCircle,
  HelpCircle,
  Check,
  XCircle
} from 'lucide-react';

export const OrderDetailScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders, updateOrderStatus } = useApp();

  const order = orders.find(o => o.id === id) || orders[0];
  const isActive = order?.status !== 'Delivered' && order?.status !== 'Cancelled';
  const isDelivered = order?.status === 'Delivered';
  const isCancelled = order?.status === 'Cancelled';

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel this order? (Demo simulation)')) {
      updateOrderStatus(order.id, 'Cancelled');
    }
  };

  if (!order) {
    return (
      <div className="p-6 text-center space-y-3">
        <p className="text-sm text-slate-500">Order not found.</p>
        <button
          onClick={() => navigate('/app/orders')}
          className="text-xs font-bold text-brand-600 underline"
        >
          Back to Orders
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3.5 p-3 sm:p-4">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-1">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigate(-1)}
            className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-sm font-black text-slate-900 font-mono">
              Order #{order.id}
            </h2>
            <p className="text-[10px] text-slate-400">
              {new Date(order.createdAt).toLocaleString([], {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>

        {isActive && (
          <button
            onClick={() => navigate(`/app/track/${order.id}`)}
            className="bg-brand-600 hover:bg-brand-700 text-white font-black text-[11px] px-3 py-1.5 rounded-xl flex items-center space-x-1.5 shadow-sm transition active:scale-95"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Track Map</span>
          </button>
        )}
      </div>

      {/* Hero Status Banner */}
      <div
        className={`rounded-2xl p-4 border text-left shadow-xs ${
          isActive
            ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white border-amber-600'
            : isDelivered
            ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white border-emerald-700'
            : 'bg-gradient-to-r from-rose-500 to-red-600 text-white border-rose-600'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black tracking-widest uppercase opacity-90">
            {isActive ? 'CURRENT STATUS' : isDelivered ? 'DELIVERY COMPLETED' : 'ORDER CANCELLED'}
          </span>
          <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full text-[10px] font-black">
            <Zap className="w-3 h-3 fill-white" />
            <span>{isDelivered ? 'Delivered' : isCancelled ? 'Void' : '10-Min Promise'}</span>
          </div>
        </div>

        <h3 className="text-lg font-black mt-1 leading-snug">
          {order.status}
        </h3>
        <p className="text-xs opacity-90 mt-0.5">
          {isDelivered
            ? 'Package handed over at your doorstep'
            : isCancelled
            ? 'Order was cancelled per customer request'
            : order.estimatedDeliveryTime || 'Arriving in 10-12 mins'}
        </p>
      </div>

      {/* Progress Timeline Stepper */}
      <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-xs">
        <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-3">
          Order Timeline
        </h4>

        <div className="space-y-3 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
          {order.timeline?.map((step, idx) => {
            const isDone = step.done;
            const isCurrent = order.status === step.status;

            return (
              <div key={idx} className="flex items-start space-x-3 relative z-10">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-2 transition ${
                    isDone
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : isCurrent
                      ? 'bg-amber-400 border-amber-500 text-slate-900 animate-pulse'
                      : 'bg-white border-slate-200 text-slate-400'
                  }`}
                >
                  {isDone ? (
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  ) : (
                    <span className="text-[10px] font-bold">{idx + 1}</span>
                  )}
                </div>

                <div className="flex-1 flex items-center justify-between pt-0.5">
                  <div>
                    <span
                      className={`text-xs block ${
                        isDone || isCurrent
                          ? 'font-bold text-slate-900'
                          : 'font-medium text-slate-400'
                      }`}
                    >
                      {step.status}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    {step.timestamp}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Items Breakdown */}
      <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-xs">
        <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-100">
          <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
            Items ({order.items?.length || 0})
          </h4>
          <span className="text-[11px] font-bold text-slate-500">
            Qty Total: {order.items?.reduce((s, i) => s + i.quantity, 0)}
          </span>
        </div>

        <div className="divide-y divide-slate-50">
          {order.items?.map((item, idx) => (
            <div key={idx} className="py-2.5 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-10 h-10 object-contain rounded-xl bg-slate-50 p-1 border border-slate-100"
                />
                <div>
                  <h5 className="text-xs font-bold text-slate-800 line-clamp-1 max-w-[170px]">
                    {item.name}
                  </h5>
                  <p className="text-[10px] text-slate-400">
                    {item.unit} • ₹{item.price} each
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs font-black text-slate-900">
                  ₹{item.price * item.quantity}
                </div>
                <div className="text-[10px] text-slate-400 font-semibold">
                  Qty: {item.quantity}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bill Receipt */}
      <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-xs">
        <div className="flex items-center space-x-1.5 mb-3 text-slate-900">
          <FileText className="w-3.5 h-3.5 text-brand-600" />
          <h4 className="text-xs font-black uppercase tracking-wider">
            Bill Receipt
          </h4>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between text-slate-600">
            <span>Items Total</span>
            <span className="font-semibold text-slate-900">₹{order.billSummary?.itemsTotal}</span>
          </div>

          {order.billSummary?.discount > 0 && (
            <div className="flex justify-between text-brand-600 font-semibold">
              <span>Coupon Discount ({order.billSummary?.couponCode || 'APPLIED'})</span>
              <span>-₹{order.billSummary?.discount}</span>
            </div>
          )}

          <div className="flex justify-between text-slate-600">
            <span>Delivery Fee</span>
            <span className="font-semibold text-slate-900">
              {order.billSummary?.deliveryFee === 0 ? (
                <span className="text-emerald-600 font-bold uppercase text-[11px]">FREE</span>
              ) : (
                `₹${order.billSummary?.deliveryFee}`
              )}
            </span>
          </div>

          <div className="flex justify-between text-slate-600">
            <span>Handling Charges</span>
            <span className="font-semibold text-slate-900">₹{order.billSummary?.handlingFee || 5}</span>
          </div>

          {order.billSummary?.tip > 0 && (
            <div className="flex justify-between text-slate-600">
              <span>Rider Tip</span>
              <span className="font-semibold text-slate-900">₹{order.billSummary?.tip}</span>
            </div>
          )}

          <div className="border-t border-slate-200 pt-2.5 mt-2 flex justify-between items-center">
            <div>
              <span className="text-xs font-black text-slate-900 block">Grand Total Paid</span>
              <span className="text-[10px] text-slate-400 font-medium">via {order.paymentMethod || 'UPI'}</span>
            </div>
            <span className="text-base font-black text-brand-600">
              ₹{order.billSummary?.grandTotal}
            </span>
          </div>
        </div>
      </div>

      {/* Delivery Destination & Instructions */}
      <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-xs space-y-3 text-xs">
        <div>
          <div className="flex items-center space-x-1.5 text-slate-400 font-bold uppercase text-[10px] mb-1">
            <MapPin className="w-3.5 h-3.5 text-brand-600" />
            <span>Delivery Address</span>
          </div>
          <p className="font-bold text-slate-900">
            {order.deliveryAddress?.flat || 'Apartment / Flat'}, {order.deliveryAddress?.area || 'Bandra West'}
          </p>
          <p className="text-[11px] text-slate-500">
            {order.deliveryAddress?.city || 'Mumbai'} - {order.deliveryAddress?.pincode || '400050'}
          </p>
        </div>

        {order.deliveryInstructions && (
          <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase block mb-0.5">
              Rider Instructions
            </span>
            <p className="text-[11px] text-slate-700 font-medium">
              "{order.deliveryInstructions}"
            </p>
          </div>
        )}
      </div>

      {/* Support & Actions */}
      <div className="space-y-2 pt-1 pb-4">
        {isActive && (
          <button
            onClick={() => navigate(`/app/track/${order.id}`)}
            className="w-full bg-brand-600 hover:bg-brand-500 text-white font-black py-3 rounded-2xl text-xs flex items-center justify-center space-x-2 shadow-md transition"
          >
            <Navigation className="w-4 h-4" />
            <span>Open Interactive Map Tracking</span>
          </button>
        )}

        {isActive && order.status === 'Placed' && (
          <button
            onClick={handleCancel}
            className="w-full bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold py-2.5 rounded-2xl text-xs border border-rose-200 transition flex items-center justify-center space-x-1"
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>Cancel Order (Demo Simulation)</span>
          </button>
        )}

        <button
          onClick={() => alert('Demo Support Hotline: Our 10-Minute Bandra store is ready to assist you!')}
          className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 rounded-2xl text-xs transition flex items-center justify-center space-x-1.5"
        >
          <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
          <span>Need Help with this Order?</span>
        </button>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { SchematicTrackingMap } from '../common/SchematicTrackingMap';
import {
  ArrowLeft,
  Phone,
  MessageSquare,
  Star,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Zap,
  MapPin
} from 'lucide-react';

export const CustomerTrackingScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders } = useApp();
  const [showItemsDrawer, setShowItemsDrawer] = useState(false);
  const [callAlert, setCallAlert] = useState(false);

  const order = orders.find(o => o.id === id) || orders[0];

  if (!order) {
    return (
      <div className="p-8 text-center">
        <h3 className="text-sm font-bold text-slate-800">Order Not Found</h3>
        <p className="text-xs text-slate-500 mt-1">This order tracking link is invalid or expired.</p>
        <button
          onClick={() => navigate('/app/orders')}
          className="mt-4 bg-brand-600 text-white px-4 py-2 rounded-xl text-xs font-bold"
        >
          View All Orders
        </button>
      </div>
    );
  }

  const partner = order.deliveryPartner || {
    name: 'Vikram Sharma',
    phone: '+91 98201 54321',
    vehicle: 'Honda Activa 6G (MH 02 CD 4192)',
    rating: 4.9,
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
  };

  const isDelivered = order.status === 'Delivered';
  const isCancelled = order.status === 'Cancelled';

  const handleDemoCall = () => {
    setCallAlert(true);
    setTimeout(() => setCallAlert(false), 3000);
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-50 relative pb-16">
      {/* Top Header */}
      <div className="bg-white p-3 border-b border-slate-100 flex items-center justify-between sticky top-0 z-20 shadow-xs">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigate('/app/orders')}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-200"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-xs font-black text-slate-900">Order #{order.id}</span>
              <span className="text-[10px] bg-brand-100 text-brand-700 font-bold px-1.5 py-0.2 rounded">
                {order.status}
              </span>
            </div>
            <p className="text-[10px] text-slate-400">
              {order.deliveryAddress?.flat}, {order.deliveryAddress?.area}
            </p>
          </div>
        </div>

        <button
          onClick={() => alert('Support connected (Demo FAQ Mode)')}
          className="flex items-center space-x-1 text-[11px] font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-xl hover:bg-slate-200"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Help</span>
        </button>
      </div>

      <div className="p-3 sm:p-4 space-y-3">
        {/* Call Toast notification */}
        {callAlert && (
          <div className="bg-emerald-600 text-white p-2.5 rounded-xl text-xs font-semibold shadow-lg flex items-center justify-between animate-in slide-in-from-top">
            <span>📞 Calling {partner.name} ({partner.phone})... [Demo Call Simulation]</span>
            <button onClick={() => setCallAlert(false)} className="text-white text-xs font-bold">✕</button>
          </div>
        )}

        {/* Schematic Interactive Tracking Map */}
        <SchematicTrackingMap order={order} height="280px" showControls={true} />

        {/* ETA & Status Card */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                {isDelivered ? 'Delivery Complete' : isCancelled ? 'Order Cancelled' : 'Express ETA'}
              </span>
              <h2 className="text-xl font-black text-slate-900 leading-tight">
                {isDelivered ? (
                  <span className="text-emerald-600 flex items-center space-x-1">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Delivered at Doorstep</span>
                  </span>
                ) : isCancelled ? (
                  <span className="text-red-600">Order Cancelled</span>
                ) : (
                  <span className="flex items-center space-x-1">
                    <span>Arriving in {order.trackingSimulation?.etaMinutes || 4} mins</span>
                    <Zap className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
                  </span>
                )}
              </h2>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-400">Order Status</span>
              <div className="text-xs font-extrabold text-brand-700 bg-brand-50 border border-brand-200 px-2.5 py-0.5 rounded-full mt-0.5">
                {order.status}
              </div>
            </div>
          </div>

          {/* Delivery Partner Card */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={partner.photo}
                alt={partner.name}
                className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-xs"
              />
              <div>
                <div className="text-xs font-black text-slate-900 flex items-center space-x-1">
                  <span>{partner.name}</span>
                  <span className="flex items-center text-[10px] text-emerald-700 bg-emerald-100 px-1 rounded font-bold">
                    <Star className="w-2.5 h-2.5 fill-emerald-600 mr-0.5" />
                    {partner.rating}
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  {partner.vehicle}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-1.5">
              <button
                onClick={handleDemoCall}
                className="w-8 h-8 rounded-full bg-brand-600 hover:bg-brand-700 text-white flex items-center justify-center shadow-xs transition"
                title="Call Delivery Partner (Mock)"
              >
                <Phone className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleDemoCall}
                className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition"
                title="Message Delivery Partner (Mock)"
              >
                <MessageSquare className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Order Status Progress Stepper */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-3">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
            Order Status Lifecycle
          </h3>

          <div className="space-y-3 relative pl-2">
            {order.timeline?.map((step, idx) => {
              const isPastOrCurrent = step.done;
              const isCurrent = step.status === order.status;

              return (
                <div key={step.status} className="flex items-start space-x-3 relative">
                  {/* Vertical line connecting steps */}
                  {idx < order.timeline.length - 1 && (
                    <div
                      className={`absolute left-2.5 top-5 bottom-0 w-0.5 ${
                        order.timeline[idx + 1].done ? 'bg-emerald-500' : 'bg-slate-200'
                      }`}
                    />
                  )}

                  {/* Icon Node */}
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center z-10 text-[9px] font-bold ${
                      isPastOrCurrent
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-200 text-slate-400'
                    }`}
                  >
                    {isPastOrCurrent ? '✓' : idx + 1}
                  </div>

                  {/* Step Info */}
                  <div className="flex-1 flex items-center justify-between">
                    <div>
                      <div className={`text-xs font-bold ${isCurrent ? 'text-brand-600' : isPastOrCurrent ? 'text-slate-900' : 'text-slate-400'}`}>
                        {step.status}
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {step.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Items Summary Accordion */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <button
            onClick={() => setShowItemsDrawer(!showItemsDrawer)}
            className="w-full p-3 flex items-center justify-between text-xs font-bold text-slate-800 hover:bg-slate-50 transition"
          >
            <span>Items in this Order ({order.items?.length || 0})</span>
            <div className="flex items-center space-x-1 text-brand-600">
              <span>₹{order.billSummary?.grandTotal}</span>
              {showItemsDrawer ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>

          {showItemsDrawer && (
            <div className="p-3 border-t border-slate-100 divide-y divide-slate-100 space-y-2">
              {order.items?.map((item, idx) => (
                <div key={idx} className="pt-2 flex items-center justify-between text-xs text-slate-700">
                  <div className="flex items-center space-x-2">
                    <img src={item.image} alt={item.name} className="w-8 h-8 rounded-lg object-contain bg-slate-50 p-0.5 border" />
                    <div>
                      <div className="font-semibold">{item.name}</div>
                      <div className="text-[10px] text-slate-400">{item.unit}</div>
                    </div>
                  </div>
                  <span className="font-bold">Qty: {item.quantity}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { SchematicTrackingMap } from '../components/SchematicTrackingMap';
import {
  ArrowLeft,
  Phone,
  MessageSquare,
  Star,
  Zap,
  MapPin,
  Shield,
  KeyRound,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Package,
  Sparkles,
  Info
} from 'lucide-react';

export const DeliveryTrackingScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders } = useApp();
  const [showItems, setShowItems] = useState(false);
  const [callAlert, setCallAlert] = useState(false);
  const [msgAlert, setMsgAlert] = useState(false);

  const order = orders.find(o => o.id === id) || orders[0];

  const partner = order?.deliveryPartner || {
    name: 'Vikram Sharma',
    phone: '+91 98201 54321',
    vehicle: 'Honda Activa 6G (MH 02 CD 4192)',
    rating: 4.9,
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
  };

  const isDelivered = order?.status === 'Delivered';
  const etaMinutes = order?.trackingSimulation?.etaMinutes ?? 4;

  return (
    <div className="space-y-3.5 p-3 sm:p-4">
      {/* Call simulation modal */}
      {callAlert && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 max-w-xs w-full text-center space-y-3 shadow-2xl animate-in zoom-in-95">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <Phone className="w-7 h-7 animate-pulse" />
            </div>
            <div>
              <h4 className="font-black text-slate-900 text-sm">Calling {partner.name}...</h4>
              <p className="text-xs text-slate-500 font-mono mt-0.5">{partner.phone}</p>
            </div>
            <p className="text-[11px] text-slate-400 bg-slate-50 p-2 rounded-xl">
              Simulated caller gateway for client demonstration prototype.
            </p>
            <button
              onClick={() => setCallAlert(false)}
              className="w-full bg-rose-600 text-white font-bold py-2 rounded-xl text-xs hover:bg-rose-700"
            >
              End Demo Call
            </button>
          </div>
        </div>
      )}

      {/* Message simulation modal */}
      {msgAlert && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 max-w-xs w-full text-center space-y-3 shadow-2xl animate-in zoom-in-95">
            <div className="w-14 h-14 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center mx-auto">
              <MessageSquare className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-black text-slate-900 text-sm">Quick Message to Rider</h4>
              <p className="text-xs text-slate-500 mt-0.5">Choose instruction:</p>
            </div>
            <div className="space-y-1.5 text-left text-xs">
              {['Please leave at reception', 'Do not ring bell', 'Call when downstairs'].map((msg, i) => (
                <button
                  key={i}
                  onClick={() => {
                    alert(`Message sent to ${partner.name}: "${msg}"`);
                    setMsgAlert(false);
                  }}
                  className="w-full text-left p-2.5 rounded-xl bg-slate-50 hover:bg-brand-50 border border-slate-200 hover:border-brand-300 font-medium text-slate-700 transition"
                >
                  "{msg}"
                </button>
              ))}
            </div>
            <button
              onClick={() => setMsgAlert(false)}
              className="w-full bg-slate-100 text-slate-600 font-bold py-2 rounded-xl text-xs hover:bg-slate-200"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between pb-1">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigate(-1)}
            className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-sm font-black text-slate-900">Live Delivery Tracking</h2>
            <div className="flex items-center space-x-1.5 text-[10px] text-slate-400">
              <span>Order #{order?.id}</span>
              <span>•</span>
              <span className="text-emerald-600 font-bold flex items-center space-x-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Simulated GPS Active</span>
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate(`/app/orders/${order?.id}`)}
          className="text-[11px] font-bold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-xl border border-brand-200 hover:bg-brand-100 transition"
        >
          Details
        </button>
      </div>

      {/* Schematic Map View */}
      <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-white">
        <SchematicTrackingMap order={order} height="280px" showControls={true} />
      </div>

      {/* ETA & Status Highlight Card */}
      <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-xs">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] font-black tracking-wider text-slate-400 uppercase">
              {isDelivered ? 'COMPLETED' : 'ESTIMATED ARRIVAL'}
            </span>
            <div className="text-xl font-black text-slate-900 mt-0.5 flex items-center space-x-2">
              <span>{isDelivered ? 'Delivered safely!' : `Arriving in ${etaMinutes} mins`}</span>
              {!isDelivered && (
                <div className="flex items-center space-x-0.5 bg-amber-100 text-amber-800 text-[10px] font-black px-2 py-0.5 rounded-full">
                  <Zap className="w-3 h-3 fill-amber-500 text-amber-500" />
                  <span>10 MIN</span>
                </div>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-1 flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate max-w-[210px]">
                {order?.trackingSimulation?.currentStreet || 'Navigating neighborhood street'}
              </span>
            </p>
          </div>

          <span
            className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${
              isDelivered
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                : 'bg-brand-100 text-brand-800 border border-brand-200'
            }`}
          >
            {order?.status}
          </span>
        </div>

        {/* Safe OTP PIN info */}
        {!isDelivered && (
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs bg-slate-50 p-2.5 rounded-xl">
            <div className="flex items-center space-x-2 text-slate-700">
              <KeyRound className="w-4 h-4 text-brand-600" />
              <div>
                <span className="font-bold text-[11px] block">Delivery OTP</span>
                <span className="text-[10px] text-slate-400">Share with partner at door</span>
              </div>
            </div>
            <div className="font-mono font-black text-sm text-brand-600 tracking-wider bg-white px-2.5 py-1 rounded-lg border border-brand-200 shadow-xs">
              7291
            </div>
          </div>
        )}
      </div>

      {/* Delivery Partner Profile Card */}
      <div className="bg-white rounded-2xl border border-slate-100 p-3.5 shadow-xs flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={partner.photo}
              alt={partner.name}
              className="w-12 h-12 rounded-2xl object-cover border border-slate-200 shadow-xs"
            />
            <div className="absolute -bottom-1 -right-1 bg-amber-400 text-slate-900 rounded-full p-0.5 border border-white">
              <Zap className="w-2.5 h-2.5 fill-slate-900" />
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-1.5">
              <h4 className="text-xs font-black text-slate-900">{partner.name}</h4>
              <div className="flex items-center space-x-0.5 bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded text-[10px] font-black border border-amber-200">
                <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                <span>{partner.rating}</span>
              </div>
            </div>
            <p className="text-[10px] text-slate-500 mt-0.5 font-medium">{partner.vehicle}</p>
            <p className="text-[10px] text-slate-400 font-mono">{partner.phone}</p>
          </div>
        </div>

        <div className="flex items-center space-x-1.5">
          <button
            onClick={() => setCallAlert(true)}
            className="w-9 h-9 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white flex items-center justify-center shadow-xs transition active:scale-95"
            title="Call Delivery Partner"
          >
            <Phone className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMsgAlert(true)}
            className="w-9 h-9 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition active:scale-95"
            title="Message Delivery Partner"
          >
            <MessageSquare className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Accordion: Ordered Items */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs">
        <button
          onClick={() => setShowItems(!showItems)}
          className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50/50 transition"
        >
          <div className="flex items-center space-x-2">
            <Package className="w-4 h-4 text-brand-600" />
            <span className="text-xs font-black text-slate-900">
              Items in this Delivery ({order?.items?.length || 0})
            </span>
          </div>
          {showItems ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {showItems && (
          <div className="p-3.5 pt-0 border-t border-slate-100 space-y-2">
            {order?.items?.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs py-1">
                <span className="text-slate-700 truncate max-w-[200px]">
                  {item.quantity}x {item.name}
                </span>
                <span className="font-extrabold text-slate-900 shrink-0">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Simulation Info Note */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 flex items-start space-x-2 text-[11px] text-amber-900">
        <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p>
          <span className="font-bold">Live Demo Note:</span> The rider icon moves realistically along Bandra West roads towards the customer pin. Use the map buttons to Play, Pause, or Step forward.
        </p>
      </div>
    </div>
  );
};

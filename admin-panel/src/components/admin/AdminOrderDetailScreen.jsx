import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { SchematicTrackingMap } from '../common/SchematicTrackingMap';
import {
  ArrowLeft,
  Truck,
  User,
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Receipt,
  RotateCcw,
  ExternalLink,
  ShieldCheck,
  CreditCard,
  Send
} from 'lucide-react';
import { ORDER_STAGES } from '../../mock/initialData';

export const AdminOrderDetailScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    orders,
    partners,
    updateOrderStatus,
    assignDeliveryPartner,
    cancelOrder
  } = useApp();

  const order = orders.find(o => o.id === id);

  if (!order) {
    return (
      <div className="p-8 text-center bg-slate-900 border border-slate-800 rounded-2xl">
        <h3 className="text-base font-bold text-white">Order Not Found</h3>
        <p className="text-xs text-slate-400 mt-1">The requested order does not exist.</p>
        <button
          onClick={() => navigate('/admin/orders')}
          className="mt-4 bg-brand-600 text-white px-4 py-2 rounded-xl text-xs font-bold"
        >
          Back to Orders
        </button>
      </div>
    );
  }

  const handleStatusChange = (e) => {
    updateOrderStatus(order.id, e.target.value);
  };

  const handlePartnerChange = (e) => {
    assignDeliveryPartner(order.id, e.target.value);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate('/admin/orders')}
            className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-black text-white">Order #{order.id}</h1>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800">
                {order.status}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Created: {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Quick jump to customer live tracking screen */}
        <button
          onClick={() => navigate(`/app/track/${order.id}`)}
          className="bg-brand-600 hover:bg-brand-700 text-white font-bold px-3.5 py-2 rounded-xl text-xs flex items-center space-x-1.5 shadow-md transition self-start sm:self-auto"
        >
          <span>Preview Customer Tracking View</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Control Panel: Order Lifecycle & Partner Assignment */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Status Transition Card */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-black text-white uppercase tracking-wider block">
              Update Order Status (Synchronized with Customer App)
            </label>
            <span className="text-[10px] text-emerald-400 font-semibold">● Instant Live Sync</span>
          </div>

          <div className="flex space-x-2">
            <select
              value={order.status}
              onChange={handleStatusChange}
              className="flex-1 bg-slate-950 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {ORDER_STAGES.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <p className="text-[10px] text-slate-400">
            Changing this status automatically triggers step updates in the customer app's timeline and animated tracking view.
          </p>
        </div>

        {/* Partner Assignment Card */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-3">
          <label className="text-xs font-black text-white uppercase tracking-wider block">
            Assign Delivery Partner
          </label>
          <div className="flex space-x-2">
            <select
              value={order.deliveryPartner?.id || ''}
              onChange={handlePartnerChange}
              className="flex-1 bg-slate-950 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {partners.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.vehicle} • {p.status})
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-400">
            <span>Rider: {order.deliveryPartner?.name || 'None'}</span>
            <span>Phone: {order.deliveryPartner?.phone || 'N/A'}</span>
          </div>
        </div>
      </div>

      {/* Embedded Live Schematic Map */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-black text-white uppercase tracking-wider flex items-center space-x-2">
            <Truck className="w-4 h-4 text-brand-400" />
            <span>Simulated Rider Telemetry & Route</span>
          </h2>
          <span className="text-[10px] text-slate-400">
            Controllable simulation synced with customer screen
          </span>
        </div>

        <SchematicTrackingMap order={order} height="320px" showControls={true} />
      </div>

      {/* Details Grid: Customer Info, Items & Financials */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Customer & Address Card */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-3 text-xs">
          <h3 className="font-black text-white uppercase tracking-wider flex items-center space-x-1.5">
            <User className="w-4 h-4 text-brand-400" />
            <span>Customer Details</span>
          </h3>

          <div className="space-y-1.5 text-slate-300">
            <div className="font-bold text-white text-sm">{order.customer?.name}</div>
            <div>Phone: {order.customer?.phone}</div>
            <div>Email: {order.customer?.email}</div>
          </div>

          <div className="pt-2 border-t border-slate-800">
            <div className="font-bold text-white mb-1 flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              <span>Delivery Address</span>
            </div>
            <div className="text-slate-400">
              {order.deliveryAddress?.flat}, {order.deliveryAddress?.street}
            </div>
            <div className="text-slate-500 text-[10px]">
              {order.deliveryAddress?.area}
            </div>
          </div>

          {order.deliveryInstructions && (
            <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-300">
              <span className="font-bold text-amber-400">Delivery Instructions: </span>
              {order.deliveryInstructions}
            </div>
          )}
        </div>

        {/* Itemized Order List */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-3 lg:col-span-2 text-xs">
          <h3 className="font-black text-white uppercase tracking-wider flex items-center space-x-1.5">
            <Receipt className="w-4 h-4 text-brand-400" />
            <span>Ordered Items ({order.items?.length || 0})</span>
          </h3>

          <div className="divide-y divide-slate-800">
            {order.items?.map((item, idx) => (
              <div key={idx} className="py-2.5 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 rounded-xl object-contain bg-slate-950 border border-slate-800 p-1"
                  />
                  <div>
                    <div className="font-bold text-white">{item.name}</div>
                    <div className="text-[10px] text-slate-400">{item.unit} • Unit Price: ₹{item.price}</div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-bold text-white block">₹{item.price * item.quantity}</span>
                  <span className="text-[10px] text-slate-400">Qty: {item.quantity}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Financial Breakdown */}
          <div className="pt-3 border-t border-slate-800 space-y-1.5 text-slate-400">
            <div className="flex justify-between">
              <span>Items Total</span>
              <span className="text-white font-semibold">₹{order.billSummary?.itemsTotal}</span>
            </div>
            {order.billSummary?.discount > 0 && (
              <div className="flex justify-between text-brand-400">
                <span>Coupon Discount ({order.billSummary.couponCode})</span>
                <span>-₹{order.billSummary.discount}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Delivery & Platform Fees</span>
              <span className="text-white font-semibold">
                ₹{(order.billSummary?.deliveryFee || 0) + (order.billSummary?.handlingFee || 5)}
              </span>
            </div>
            {order.billSummary?.tip > 0 && (
              <div className="flex justify-between">
                <span>Rider Tip</span>
                <span className="text-white font-semibold">₹{order.billSummary.tip}</span>
              </div>
            )}
            <div className="pt-2 border-t border-slate-800 flex justify-between font-black text-sm text-white">
              <span>Grand Total</span>
              <span className="text-brand-400">₹{order.billSummary?.grandTotal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

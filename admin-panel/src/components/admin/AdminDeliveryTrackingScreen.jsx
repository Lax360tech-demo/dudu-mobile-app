import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { SchematicTrackingMap } from '../common/SchematicTrackingMap';
import {
  Truck,
  Navigation,
  Battery,
  Star,
  MapPin,
  ExternalLink,
  Zap,
  Phone,
  Clock,
  CheckCircle2
} from 'lucide-react';

export const AdminDeliveryTrackingScreen = () => {
  const navigate = useNavigate();
  const { partners, orders } = useApp();

  // Find active out-for-delivery order
  const activeOrder = orders.find(o => o.status === 'Out for Delivery') || orders[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-black text-white tracking-tight">Delivery Fleet & Live Tracking</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time dark store dispatch telemetry, partner status, and route simulation
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs bg-emerald-950 text-emerald-400 border border-emerald-800 px-3 py-1.5 rounded-xl font-bold flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>4 Riders Active in Bandra West</span>
          </span>
        </div>
      </div>

      {/* Main Schematic City Map */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-black text-white uppercase tracking-wider flex items-center space-x-2">
            <Navigation className="w-4 h-4 text-brand-400" />
            <span>Active Delivery Route Simulation: Order #{activeOrder?.id}</span>
          </h2>
          <button
            onClick={() => navigate(`/app/track/${activeOrder?.id}`)}
            className="text-[11px] font-bold text-brand-400 hover:underline flex items-center space-x-1"
          >
            <span>Open Customer Map View</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>

        <SchematicTrackingMap order={activeOrder} height="360px" showControls={true} />
      </div>

      {/* Fleet Partners Telemetry Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-sm overflow-hidden space-y-3">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-xs font-black text-white uppercase tracking-wider">
            Delivery Partner Fleet Telemetry
          </h3>
          <span className="text-[10px] text-slate-400">
            Simulated GPS ping every 2.5s
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 font-bold border-b border-slate-800">
              <tr>
                <th className="p-3.5">Partner</th>
                <th className="p-3.5">Vehicle & Contact</th>
                <th className="p-3.5">Rating & Trips</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Current Location</th>
                <th className="p-3.5">Battery</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {partners.map((partner) => {
                const assignedOrder = orders.find(o => o.deliveryPartner?.id === partner.id && o.status !== 'Delivered');

                return (
                  <tr key={partner.id} className="hover:bg-slate-800/60 transition">
                    <td className="p-3.5">
                      <div className="flex items-center space-x-3">
                        <img
                          src={partner.photo}
                          alt={partner.name}
                          className="w-10 h-10 rounded-full object-cover border border-slate-700"
                        />
                        <div>
                          <div className="font-bold text-white">{partner.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">ID: {partner.id}</div>
                        </div>
                      </div>
                    </td>

                    <td className="p-3.5">
                      <div className="font-semibold text-slate-200">{partner.vehicle}</div>
                      <div className="text-[10px] text-slate-400">{partner.phone}</div>
                    </td>

                    <td className="p-3.5">
                      <div className="flex items-center space-x-1 font-bold text-amber-300">
                        <Star className="w-3.5 h-3.5 fill-amber-300" />
                        <span>{partner.rating}</span>
                      </div>
                      <div className="text-[10px] text-slate-500">{partner.totalDeliveries} delivered</div>
                    </td>

                    <td className="p-3.5">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        partner.status === 'On Delivery'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800 animate-pulse'
                          : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      }`}>
                        {partner.status}
                      </span>
                    </td>

                    <td className="p-3.5">
                      <div className="flex items-center space-x-1.5 text-slate-300">
                        <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        <span className="truncate max-w-[180px]">{partner.currentLocation?.address || 'Linking Rd'}</span>
                      </div>
                    </td>

                    <td className="p-3.5 font-mono text-emerald-400 font-bold">
                      {partner.batteryLevel}
                    </td>

                    <td className="p-3.5 text-right">
                      {assignedOrder ? (
                        <button
                          onClick={() => navigate(`/admin/orders/${assignedOrder.id}`)}
                          className="bg-brand-600 hover:bg-brand-700 text-white font-bold px-3 py-1 rounded-xl text-xs transition"
                        >
                          View Order #{assignedOrder.id}
                        </button>
                      ) : (
                        <span className="text-[10px] text-slate-500 font-medium">Standby at Hub</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

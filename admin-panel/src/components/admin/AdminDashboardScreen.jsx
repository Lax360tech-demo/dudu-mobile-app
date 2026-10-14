import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  ShoppingBag,
  Clock,
  Truck,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Navigation,
  ChevronRight,
  Zap,
  Package
} from 'lucide-react';

export const AdminDashboardScreen = () => {
  const navigate = useNavigate();
  const { orders, products, updateOrderStatus, partners } = useApp();

  const activeOrders = orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled');
  const deliveredOrders = orders.filter(o => o.status === 'Delivered');
  const lowStockProducts = products.filter(p => p.stock <= 5);

  const totalRevenue = orders.reduce((sum, o) => sum + (o.billSummary?.grandTotal || 0), 0);

  // Quick transition button handler
  const handleQuickAdvance = (order, e) => {
    e.stopPropagation();
    const statusFlow = [
      'Placed',
      'Confirmed',
      'Preparing',
      'Packed',
      'Ready for Pickup',
      'Partner Assigned',
      'Picked Up',
      'Out for Delivery',
      'Delivered'
    ];
    const currentIndex = statusFlow.indexOf(order.status);
    if (currentIndex < statusFlow.length - 1) {
      updateOrderStatus(order.id, statusFlow[currentIndex + 1]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-black text-white tracking-tight">Dark Store Operations Dashboard</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time fulfillment metrics, order queue & delivery fleet tracking
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigate('/admin/orders')}
            className="bg-brand-600 hover:bg-brand-700 text-white font-bold px-3 py-1.5 rounded-xl text-xs shadow-md transition flex items-center space-x-1"
          >
            <span>All Orders ({orders.length})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => navigate('/admin/delivery-tracking')}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold px-3 py-1.5 rounded-xl text-xs transition flex items-center space-x-1"
          >
            <Truck className="w-3.5 h-3.5 text-amber-400" />
            <span>Live Fleet Map</span>
          </button>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Metric 1 */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Total Sales Value</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-950 text-emerald-400 flex items-center justify-center">
              ₹
            </div>
          </div>
          <div className="text-xl font-black text-white mt-2">
            ₹{totalRevenue.toLocaleString()}
          </div>
          <div className="flex items-center text-[10px] text-emerald-400 font-semibold mt-1">
            <TrendingUp className="w-3 h-3 mr-1" />
            <span>+18.4% vs last week</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Active Deliveries</span>
            <div className="w-8 h-8 rounded-xl bg-amber-950 text-amber-400 flex items-center justify-center">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-black text-white mt-2">
            {activeOrders.length}
          </div>
          <div className="text-[10px] text-amber-400 font-semibold mt-1">
            ⚡ Avg packing: 2.1 mins
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>On-Time SLA Rate</span>
            <div className="w-8 h-8 rounded-xl bg-brand-950 text-brand-400 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-black text-white mt-2">
            98.6%
          </div>
          <div className="text-[10px] text-slate-400 font-semibold mt-1">
            Standard: &lt; 12 mins
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Low Stock Alerts</span>
            <div className="w-8 h-8 rounded-xl bg-rose-950 text-rose-400 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-black text-white mt-2">
            {lowStockProducts.length} Items
          </div>
          <div className="text-[10px] text-rose-400 font-semibold mt-1">
            Needs replenishment
          </div>
        </div>
      </div>

      {/* Real-Time Live Order Fulfillment Queue */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            <h2 className="text-sm font-black text-white">
              Live Fulfillment Queue ({activeOrders.length} In Progress)
            </h2>
          </div>
          <span className="text-[10px] text-slate-400 hidden sm:inline">
            Click any order for full telemetry & partner re-assignment
          </span>
        </div>

        {activeOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/70 text-slate-400 font-bold border-b border-slate-800">
                <tr>
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Items</th>
                  <th className="p-3">Assigned Partner</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Progress</th>
                  <th className="p-3 text-right">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {activeOrders.map((order) => (
                  <tr
                    key={order.id}
                    onClick={() => navigate(`/admin/orders/${order.id}`)}
                    className="hover:bg-slate-800/60 cursor-pointer transition"
                  >
                    <td className="p-3 font-mono font-bold text-brand-400">
                      #{order.id}
                    </td>
                    <td className="p-3">
                      <div className="font-semibold text-white">{order.customer?.name}</div>
                      <div className="text-[10px] text-slate-500">{order.deliveryAddress?.area}</div>
                    </td>
                    <td className="p-3">
                      <span className="font-bold text-white">{order.items?.length || 0} items</span>
                      <div className="text-[10px] text-slate-500">₹{order.billSummary?.grandTotal}</div>
                    </td>
                    <td className="p-3">
                      <span className="font-medium text-slate-200">
                        {order.deliveryPartner?.name || 'Unassigned'}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800/80">
                        {order.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-brand-500 h-full rounded-full"
                            style={{ width: `${order.trackingSimulation?.progress || 10}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-mono text-slate-400">
                          {order.trackingSimulation?.etaMinutes || 5}m
                        </span>
                      </div>
                    </td>
                    <td className="p-3 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={(e) => handleQuickAdvance(order, e)}
                        className="bg-brand-600 hover:bg-brand-700 text-white font-bold px-2.5 py-1 rounded-lg text-[10px] shadow-xs transition"
                      >
                        Advance Stage →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-slate-500 text-xs">
            All orders fulfilled! No active orders in dark store queue.
          </div>
        )}
      </div>

      {/* Fleet & Low Stock Quick Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Delivery Fleet Quick Preview */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center space-x-1.5">
              <Truck className="w-4 h-4 text-brand-400" />
              <span>Bandra Delivery Fleet ({partners.length} Riders)</span>
            </h3>
            <button
              onClick={() => navigate('/admin/delivery-tracking')}
              className="text-[11px] font-bold text-brand-400 hover:underline"
            >
              View Fleet Map
            </button>
          </div>

          <div className="divide-y divide-slate-800">
            {partners.map((partner) => (
              <div key={partner.id} className="py-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2.5">
                  <img src={partner.photo} alt={partner.name} className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <div className="font-bold text-white">{partner.name}</div>
                    <div className="text-[10px] text-slate-400">{partner.vehicle}</div>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-bold ${
                    partner.status === 'On Delivery' ? 'bg-amber-950 text-amber-300' : 'bg-emerald-950 text-emerald-400'
                  }`}>
                    {partner.status}
                  </span>
                  <div className="text-[10px] text-slate-500 mt-0.5">{partner.rating} ⭐</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Watchlist */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center space-x-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>Low Inventory Items</span>
            </h3>
            <button
              onClick={() => navigate('/admin/inventory')}
              className="text-[11px] font-bold text-brand-400 hover:underline"
            >
              Manage Stock
            </button>
          </div>

          <div className="divide-y divide-slate-800">
            {lowStockProducts.slice(0, 4).map((product) => (
              <div key={product.id} className="py-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2.5">
                  <img src={product.image} alt={product.name} className="w-8 h-8 rounded-lg object-contain bg-slate-800 p-0.5" />
                  <div>
                    <div className="font-semibold text-white truncate max-w-[180px]">{product.name}</div>
                    <div className="text-[10px] text-slate-400">{product.unit}</div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-bold text-rose-400 bg-rose-950/70 border border-rose-800/80 px-2 py-0.5 rounded-lg text-[10px]">
                    {product.stock} units remaining
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

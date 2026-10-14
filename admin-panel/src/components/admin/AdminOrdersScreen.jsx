import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  ShoppingBag,
  Search,
  Filter,
  ChevronRight,
  Navigation,
  CheckCircle2,
  Clock,
  AlertCircle,
  Truck
} from 'lucide-react';

export const AdminOrdersScreen = () => {
  const navigate = useNavigate();
  const { orders } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filterTabs = [
    { label: 'All Orders', value: 'ALL' },
    { label: 'Active', value: 'ACTIVE' },
    { label: 'Out for Delivery', value: 'Out for Delivery' },
    { label: 'Preparing', value: 'Preparing' },
    { label: 'Delivered', value: 'Delivered' },
    { label: 'Cancelled', value: 'Cancelled' }
  ];

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // Status filter
      if (statusFilter === 'ACTIVE') {
        if (order.status === 'Delivered' || order.status === 'Cancelled') return false;
      } else if (statusFilter !== 'ALL') {
        if (order.status !== statusFilter) return false;
      }

      // Search query
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        order.id.toLowerCase().includes(q) ||
        order.customer?.name?.toLowerCase().includes(q) ||
        order.customer?.phone?.includes(q) ||
        order.deliveryAddress?.area?.toLowerCase().includes(q)
      );
    });
  }, [orders, statusFilter, searchQuery]);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-black text-white tracking-tight">Order Management</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Monitor, assign delivery partners, and control order lifecycle stages
          </p>
        </div>

        <div className="text-xs text-slate-400 font-semibold bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
          Total Orders: <span className="text-white font-bold">{orders.length}</span>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by Order ID, customer, phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto no-scrollbar py-0.5">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setStatusFilter(tab.value)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                statusFilter === tab.value
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 font-bold border-b border-slate-800">
              <tr>
                <th className="p-3.5">Order ID</th>
                <th className="p-3.5">Timestamp</th>
                <th className="p-3.5">Customer & Area</th>
                <th className="p-3.5">Items</th>
                <th className="p-3.5">Total & Payment</th>
                <th className="p-3.5">Delivery Partner</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => {
                  const isActive = order.status !== 'Delivered' && order.status !== 'Cancelled';
                  const isDelivered = order.status === 'Delivered';

                  return (
                    <tr
                      key={order.id}
                      onClick={() => navigate(`/admin/orders/${order.id}`)}
                      className="hover:bg-slate-800/60 cursor-pointer transition"
                    >
                      <td className="p-3.5 font-mono font-bold text-brand-400">
                        #{order.id}
                      </td>
                      <td className="p-3.5 text-slate-400 text-[11px]">
                        {new Date(order.createdAt).toLocaleDateString([], {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="p-3.5">
                        <div className="font-semibold text-white">{order.customer?.name}</div>
                        <div className="text-[10px] text-slate-500">{order.deliveryAddress?.area}</div>
                      </td>
                      <td className="p-3.5">
                        <span className="font-bold text-white">{order.items?.length || 0} items</span>
                      </td>
                      <td className="p-3.5">
                        <div className="font-bold text-white">₹{order.billSummary?.grandTotal}</div>
                        <div className="text-[10px] text-slate-500">{order.paymentMethod}</div>
                      </td>
                      <td className="p-3.5">
                        <div className="flex items-center space-x-1.5">
                          <Truck className="w-3.5 h-3.5 text-slate-400" />
                          <span className="font-medium text-slate-200">
                            {order.deliveryPartner?.name || 'Unassigned'}
                          </span>
                        </div>
                      </td>
                      <td className="p-3.5">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          isActive
                            ? 'bg-amber-950 text-amber-300 border border-amber-800/80 animate-pulse'
                            : isDelivered
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/80'
                            : 'bg-red-950 text-red-300 border border-red-800/80'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/admin/orders/${order.id}`);
                          }}
                          className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-3 py-1 rounded-xl text-xs transition"
                        >
                          Inspect →
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-500 text-xs">
                    No orders match your filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Search, ShoppingBag, MapPin, X, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AdminCustomersScreen = () => {
  const navigate = useNavigate();
  const { customer, orders } = useApp();
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Group orders by customer
  const customerList = [
    {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      tier: 'LAX VIP Member',
      addresses: customer.addresses,
      orders: orders.filter(o => o.customer?.email === customer.email || o.customer?.phone === customer.phone)
    },
    {
      id: 'cust-002',
      name: 'Pooja Nair',
      email: 'pooja.n@gmail.com',
      phone: '+91 98190 22334',
      tier: 'Gold Member',
      addresses: [
        { tag: 'Home', flat: 'Penthouse 1102, Silver Arch', area: 'Perry Cross Rd, Bandra' }
      ],
      orders: orders.filter(o => o.customer?.name === 'Pooja Nair')
    },
    {
      id: 'cust-003',
      name: 'Aditya Roy',
      email: 'aditya.roy@yahoo.com',
      phone: '+91 99304 88771',
      tier: 'Standard Member',
      addresses: [
        { tag: 'Office', flat: 'Cabin 4A, Innovate Tower', area: 'Hill Rd, Bandra' }
      ],
      orders: orders.filter(o => o.customer?.name === 'Aditya Roy')
    }
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-black text-white tracking-tight">Customer Database</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Registered customer profiles, ordering frequencies, and saved addresses
          </p>
        </div>

        <div className="text-xs font-bold text-slate-300 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
          Active Accounts: <span className="text-brand-400">{customerList.length}</span>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 font-bold border-b border-slate-800">
              <tr>
                <th className="p-3.5">Customer Profile</th>
                <th className="p-3.5">Contact Details</th>
                <th className="p-3.5">Membership Tier</th>
                <th className="p-3.5">Total Orders Placed</th>
                <th className="p-3.5">Lifetime Spend</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {customerList.map((cust) => {
                const totalSpent = cust.orders.reduce((sum, o) => sum + (o.billSummary?.grandTotal || 0), 0);

                return (
                  <tr key={cust.id} className="hover:bg-slate-800/60 transition">
                    <td className="p-3.5">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white font-bold flex items-center justify-center">
                          {cust.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-bold text-white">{cust.name}</div>
                          <div className="text-[10px] text-slate-500 font-mono">ID: {cust.id}</div>
                        </div>
                      </div>
                    </td>

                    <td className="p-3.5">
                      <div className="text-slate-200">{cust.phone}</div>
                      <div className="text-[10px] text-slate-500">{cust.email}</div>
                    </td>

                    <td className="p-3.5">
                      <span className="font-bold text-[10px] bg-brand-950 text-brand-300 border border-brand-800 px-2 py-0.5 rounded-lg">
                        {cust.tier}
                      </span>
                    </td>

                    <td className="p-3.5 font-bold text-white">
                      {cust.orders.length} orders
                    </td>

                    <td className="p-3.5 font-bold text-emerald-400">
                      ₹{totalSpent}
                    </td>

                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => setSelectedCustomer(cust)}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-3 py-1 rounded-xl text-xs transition"
                      >
                        Order History
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Order History Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-3xl p-5 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div>
                <h3 className="font-bold text-white text-sm">{selectedCustomer.name}'s History</h3>
                <span className="text-[10px] text-slate-400">{selectedCustomer.phone}</span>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5">
              {selectedCustomer.orders.map((ord) => (
                <div
                  key={ord.id}
                  onClick={() => {
                    setSelectedCustomer(null);
                    navigate(`/admin/orders/${ord.id}`);
                  }}
                  className="p-3 bg-slate-950 border border-slate-800 rounded-xl hover:border-slate-700 cursor-pointer flex items-center justify-between transition text-xs"
                >
                  <div>
                    <div className="font-bold text-brand-400 font-mono">#{ord.id}</div>
                    <div className="text-[10px] text-slate-400">{ord.status} • {ord.items?.length || 0} items</div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-white">₹{ord.billSummary?.grandTotal}</span>
                    <div className="text-[10px] text-slate-500">Inspect →</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

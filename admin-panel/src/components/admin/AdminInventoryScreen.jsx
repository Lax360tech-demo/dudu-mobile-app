import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Boxes,
  Search,
  AlertTriangle,
  CheckCircle2,
  Plus,
  RefreshCw,
  Package
} from 'lucide-react';

export const AdminInventoryScreen = () => {
  const { products, updateStock, categories } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('ALL'); // ALL, LOW, OUT

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (filterType === 'LOW' && (p.stock > 5 || p.stock === 0)) return false;
      if (filterType === 'OUT' && p.stock > 0) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.sku?.toLowerCase().includes(q);
    });
  }, [products, filterType, searchQuery]);

  const handleQuickAdd = (id, currentStock, amount) => {
    updateStock(id, currentStock + amount);
  };

  const handleCustomStock = (id, val) => {
    const num = parseInt(val, 10);
    if (!isNaN(num) && num >= 0) {
      updateStock(id, num);
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-black text-white tracking-tight">Dark Store Inventory Control</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Monitor real-time item availability, replenishment alerts, and stock thresholds
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs bg-rose-950/70 border border-rose-800 text-rose-300 px-3 py-1.5 rounded-xl font-bold">
            {products.filter(p => p.stock <= 5).length} Low Stock Alerts
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search items by name or SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </div>

        <div className="flex items-center space-x-1.5 w-full md:w-auto overflow-x-auto py-0.5">
          {[
            { label: 'All Items', val: 'ALL' },
            { label: 'Low Stock (≤ 5)', val: 'LOW' },
            { label: 'Out of Stock (0)', val: 'OUT' }
          ].map((tab) => (
            <button
              key={tab.val}
              onClick={() => setFilterType(tab.val)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                filterType === tab.val
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-slate-950 text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 font-bold border-b border-slate-800">
              <tr>
                <th className="p-3.5">SKU & Product</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Unit Price</th>
                <th className="p-3.5">Current Stock Level</th>
                <th className="p-3.5">Inventory Status</th>
                <th className="p-3.5 text-right">Quick Restock Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {filteredProducts.map((prod) => {
                const category = categories.find((c) => c.id === prod.categoryId);
                const isOutOfStock = prod.stock <= 0;
                const isLowStock = prod.stock > 0 && prod.stock <= 5;

                return (
                  <tr key={prod.id} className="hover:bg-slate-800/60 transition">
                    <td className="p-3.5">
                      <div className="flex items-center space-x-3">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-10 h-10 rounded-xl object-contain bg-slate-950 border border-slate-800 p-1 shrink-0"
                        />
                        <div>
                          <div className="font-bold text-white line-clamp-1 max-w-[200px]">
                            {prod.name}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            {prod.sku} • {prod.unit}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="p-3.5 text-slate-300">
                      {category?.name || 'Category'}
                    </td>

                    <td className="p-3.5 font-bold text-white">
                      ₹{prod.price}
                    </td>

                    <td className="p-3.5">
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          min="0"
                          value={prod.stock}
                          onChange={(e) => handleCustomStock(prod.id, e.target.value)}
                          className="w-16 bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-center font-mono font-bold text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                        />
                        <span className="text-[11px] text-slate-500">units</span>
                      </div>
                    </td>

                    <td className="p-3.5">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          isOutOfStock
                            ? 'bg-red-950 text-red-400 border border-red-800'
                            : isLowStock
                            ? 'bg-amber-950 text-amber-400 border border-amber-800 animate-pulse'
                            : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        }`}
                      >
                        {isOutOfStock
                          ? 'Out of Stock'
                          : isLowStock
                          ? 'Critical (< 5)'
                          : 'In Stock'}
                      </span>
                    </td>

                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <button
                          onClick={() => handleQuickAdd(prod.id, prod.stock, 10)}
                          className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono font-bold px-2.5 py-1 rounded-lg text-[10px] border border-slate-700 transition"
                          title="Restock +10 units"
                        >
                          +10
                        </button>
                        <button
                          onClick={() => handleQuickAdd(prod.id, prod.stock, 50)}
                          className="bg-brand-600 hover:bg-brand-700 text-white font-mono font-bold px-2.5 py-1 rounded-lg text-[10px] shadow-xs transition"
                          title="Restock +50 units"
                        >
                          +50
                        </button>
                      </div>
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

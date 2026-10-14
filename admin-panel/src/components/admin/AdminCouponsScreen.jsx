import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Tag, Plus, Check, X, Percent } from 'lucide-react';

export const AdminCouponsScreen = () => {
  const { coupons, addCoupon, toggleCouponActive } = useApp();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCode, setNewCode] = useState('');
  const [discountType, setDiscountType] = useState('flat');
  const [discountValue, setDiscountValue] = useState('50');
  const [minOrderValue, setMinOrderValue] = useState('199');
  const [description, setDescription] = useState('');

  const handleCreateCoupon = (e) => {
    e.preventDefault();
    if (!newCode.trim()) return;
    addCoupon({
      code: newCode.toUpperCase().trim(),
      discountType,
      discountValue: parseFloat(discountValue),
      minOrderValue: parseFloat(minOrderValue),
      description: description || `Get ${discountType === 'flat' ? `₹${discountValue}` : `${discountValue}%`} OFF on orders above ₹${minOrderValue}`
    });
    setNewCode('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-black text-white tracking-tight">Coupon & Promotions Engine</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Create discount vouchers, configure minimum cart values, and toggle promo campaigns
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-brand-600 hover:bg-brand-700 text-white font-bold px-3.5 py-2 rounded-xl text-xs flex items-center space-x-1.5 shadow-md transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Create New Coupon</span>
        </button>
      </div>

      {/* Coupons Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 font-bold border-b border-slate-800">
              <tr>
                <th className="p-3.5">Promo Code</th>
                <th className="p-3.5">Discount Benefit</th>
                <th className="p-3.5">Min Cart Value</th>
                <th className="p-3.5">Campaign Description</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {coupons.map((coupon) => (
                <tr key={coupon.code} className="hover:bg-slate-800/60 transition">
                  <td className="p-3.5">
                    <span className="font-mono font-black text-brand-400 bg-brand-950/80 px-2.5 py-1 rounded-lg border border-brand-800">
                      {coupon.code}
                    </span>
                  </td>

                  <td className="p-3.5 font-bold text-white">
                    {coupon.discountType === 'flat' ? `Flat ₹${coupon.discountValue} OFF` : `${coupon.discountValue}% Instant OFF`}
                  </td>

                  <td className="p-3.5 text-slate-300 font-mono">
                    ₹{coupon.minOrderValue}
                  </td>

                  <td className="p-3.5 text-slate-400 max-w-xs truncate">
                    {coupon.description}
                  </td>

                  <td className="p-3.5">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      coupon.isActive ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-slate-800 text-slate-500 border border-slate-700'
                    }`}>
                      {coupon.isActive ? 'Active & Live' : 'Paused'}
                    </span>
                  </td>

                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => toggleCouponActive(coupon.code)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                        coupon.isActive
                          ? 'bg-slate-800 text-slate-300 hover:text-white'
                          : 'bg-emerald-600 text-white'
                      }`}
                    >
                      {coupon.isActive ? 'Pause Coupon' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Coupon Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="font-bold text-white text-sm">Create New Promo Voucher</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCoupon} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">
                  Coupon Code (Uppercase)
                </label>
                <input
                  type="text"
                  placeholder="e.g. MONSOON20"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono font-bold text-white focus:outline-none focus:ring-1 focus:ring-brand-500 uppercase"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">
                    Discount Type
                  </label>
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                  >
                    <option value="flat">Flat Amount (₹)</option>
                    <option value="percentage">Percentage (%)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">
                    Discount Value
                  </label>
                  <input
                    type="number"
                    value={discountValue}
                    onChange={(e) => setDiscountValue(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">
                  Minimum Cart Value (₹)
                </label>
                <input
                  type="number"
                  value={minOrderValue}
                  onChange={(e) => setMinOrderValue(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">
                  User Facing Description
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Flat ₹50 off on orders above ₹199"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-brand-600 hover:bg-brand-700 text-white font-bold px-5 py-2 rounded-xl text-xs shadow-md"
                >
                  Publish Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

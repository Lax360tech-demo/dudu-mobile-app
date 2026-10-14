import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Layers, Plus, Edit2, Check, X, Tag } from 'lucide-react';

export const AdminCategoriesScreen = () => {
  const { categories, addCategory, updateCategory, toggleCategoryActive, products } = useApp();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatDescription, setNewCatDescription] = useState('');
  const [newCatBanner, setNewCatBanner] = useState('');

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCatName) return;
    addCategory({
      name: newCatName,
      description: newCatDescription || 'Express delivery in 10 minutes.',
      banner: newCatBanner || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80',
      badge: 'New'
    });
    setNewCatName('');
    setNewCatDescription('');
    setNewCatBanner('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-black text-white tracking-tight">Category Hierarchy & Tiles</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure store categories, banners, and visibility for customer app navigation
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-brand-600 hover:bg-brand-700 text-white font-bold px-3.5 py-2 rounded-xl text-xs flex items-center space-x-1.5 shadow-md transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => {
          const catItemCount = products.filter(p => p.categoryId === cat.id).length;

          return (
            <div
              key={cat.id}
              className={`bg-slate-900 border rounded-2xl p-4 shadow-sm flex flex-col justify-between transition ${
                cat.isActive ? 'border-slate-800' : 'border-slate-800/50 opacity-60'
              }`}
            >
              <div>
                <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 mb-3 border border-slate-800">
                  <img
                    src={cat.banner}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                  />
                  {cat.badge && (
                    <span className="absolute top-2 left-2 bg-brand-600 text-white text-[9px] font-black px-2 py-0.5 rounded-md shadow-xs">
                      {cat.badge}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-white text-sm">{cat.name}</h3>
                  <span className="text-[10px] bg-slate-800 text-slate-300 font-bold px-2 py-0.5 rounded-lg border border-slate-700">
                    {catItemCount} Items
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {cat.description}
                </p>
              </div>

              {/* Bottom Actions */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-mono">ID: {cat.id}</span>
                <button
                  onClick={() => toggleCategoryActive(cat.id)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition flex items-center space-x-1 ${
                    cat.isActive
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  <span>{cat.isActive ? 'Active on App' : 'Hidden'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Category Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="font-bold text-white text-sm">Create New Category</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddCategory} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Gourmet Coffee & Tea"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Brief description for customer app header"
                  value={newCatDescription}
                  onChange={(e) => setNewCatDescription(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">
                  Banner Image URL
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={newCatBanner}
                  onChange={(e) => setNewCatBanner(e.target.value)}
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
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

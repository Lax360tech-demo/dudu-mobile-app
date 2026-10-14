import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ProductCard } from './ProductCard';
import { ArrowLeft, Filter, SlidersHorizontal, Check } from 'lucide-react';

export const CustomerCategoriesScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { categories, products } = useApp();

  const activeCategories = categories.filter(c => c.isActive);
  const [selectedCatId, setSelectedCatId] = useState(id || activeCategories[0]?.id || 'cat-groceries');
  const [sortBy, setSortBy] = useState('popular'); // popular, price-low, price-high, discount
  const [showOnlyInStock, setShowOnlyInStock] = useState(false);

  const currentCategory = categories.find(c => c.id === selectedCatId) || activeCategories[0];

  // Filter & Sort products
  const categoryProducts = products.filter(p => {
    if (p.categoryId !== selectedCatId) return false;
    if (showOnlyInStock && p.stock <= 0) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'discount') return b.discountPercent - a.discountPercent;
    return b.rating - a.rating;
  });

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white p-3 border-b border-slate-100 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigate('/app')}
            className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-200"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-xs font-black text-slate-900 leading-tight">
              {currentCategory?.name || 'All Categories'}
            </h2>
            <span className="text-[10px] text-slate-400">
              {categoryProducts.length} Products Available
            </span>
          </div>
        </div>

        {/* Sort selector */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-xl px-2 py-1 text-[11px] font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-500"
        >
          <option value="popular">Popular</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="discount">Highest Discount</option>
        </select>
      </div>

      {/* Main Container: Split view with vertical category sidebar and product grid */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Category Rail */}
        <aside className="w-20 bg-slate-50 border-r border-slate-100 overflow-y-auto no-scrollbar py-2 flex flex-col space-y-1">
          {activeCategories.map((cat) => {
            const isSelected = cat.id === selectedCatId;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCatId(cat.id)}
                className={`flex flex-col items-center p-2 text-center transition relative ${
                  isSelected ? 'bg-white text-brand-600 font-bold shadow-xs' : 'text-slate-500 hover:bg-slate-100/60'
                }`}
              >
                {isSelected && (
                  <div className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-brand-600 rounded-r" />
                )}
                <div className="w-10 h-10 rounded-xl overflow-hidden mb-1 p-0.5 bg-white border border-slate-100 shadow-2xs">
                  <img src={cat.banner} alt={cat.name} className="w-full h-full object-cover rounded-lg" />
                </div>
                <span className="text-[9px] leading-tight line-clamp-2">
                  {cat.name.split(',')[0]}
                </span>
              </button>
            );
          })}
        </aside>

        {/* Right Products Content Area */}
        <div className="flex-1 overflow-y-auto p-3 no-scrollbar space-y-3 bg-white">
          {/* Category Banner Highlight */}
          {currentCategory && (
            <div className="p-3 rounded-2xl bg-gradient-to-r from-brand-50 to-indigo-50 border border-brand-100">
              <h3 className="text-xs font-black text-brand-900">{currentCategory.name}</h3>
              <p className="text-[10px] text-brand-700 mt-0.5">{currentCategory.description}</p>
            </div>
          )}

          {/* Quick in-stock filter */}
          <div className="flex items-center justify-between text-[11px]">
            <button
              onClick={() => setShowOnlyInStock(!showOnlyInStock)}
              className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-xl border text-[10px] font-bold transition ${
                showOnlyInStock
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                  : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}
            >
              <div className={`w-3 h-3 rounded-full border flex items-center justify-center ${showOnlyInStock ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300'}`}>
                {showOnlyInStock && <Check className="w-2.5 h-2.5" />}
              </div>
              <span>In-Stock Only</span>
            </button>

            <span className="text-[10px] text-slate-400">
              ⚡ Express 10 Min Delivery
            </span>
          </div>

          {/* Product Grid */}
          {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-2.5">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xs text-slate-500">No products available in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

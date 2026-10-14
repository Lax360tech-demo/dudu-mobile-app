import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import {
  Search,
  Zap,
  ArrowRight,
  X
} from 'lucide-react';

export const HomeScreen = () => {
  const navigate = useNavigate();
  const { products, categories } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const promoBanners = [
    {
      id: 1,
      title: 'Midnight Cravings & Essentials',
      subtitle: '⚡ In 10 Mins or FREE',
      gradient: 'from-purple-900 via-indigo-900 to-brand-900',
      badge: 'FLAT ₹100 OFF',
      code: 'LAXFIRST'
    },
    {
      id: 2,
      title: 'Hydroponic Fresh Greens',
      subtitle: 'Direct from greenhouse harvest',
      gradient: 'from-emerald-950 via-teal-900 to-green-900',
      badge: 'UP TO 30% OFF',
      code: 'SUPERFAST'
    }
  ];

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.subcategory?.toLowerCase().includes(q)
    );
  }, [searchQuery, products]);

  const trendingProducts = useMemo(() => products.slice(0, 4), [products]);
  const freshProduce = useMemo(() => products.filter(p => p.categoryId === 'cat-groceries').slice(0, 4), [products]);
  const dairyProducts = useMemo(() => products.filter(p => p.categoryId === 'cat-dairy').slice(0, 4), [products]);

  return (
    <div className="space-y-4 p-3 sm:p-4">
      {/* Search Header */}
      <div className="relative">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='Search "Alphonso Mango", "Milk", "Earbuds"...'
            className="w-full bg-white border border-slate-200 rounded-2xl pl-10 pr-9 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {searchQuery.trim() ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-700">
              Found {filteredProducts.length} results for "{searchQuery}"
            </h3>
            <button
              onClick={() => setSearchQuery('')}
              className="text-[11px] font-semibold text-brand-600 hover:underline"
            >
              Clear
            </button>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-2.5">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-6 text-center border border-slate-100">
              <h4 className="font-bold text-slate-800 text-sm">No items found</h4>
              <p className="text-xs text-slate-500 mt-1">Try searching for "Mango" or "Milk"</p>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Promo Carousel */}
          <div className="overflow-x-auto no-scrollbar flex space-x-3 snap-x">
            {promoBanners.map((banner) => (
              <div
                key={banner.id}
                className={`min-w-full rounded-2xl p-4 bg-gradient-to-r ${banner.gradient} text-white shadow-md relative overflow-hidden flex flex-col justify-between h-36 snap-center`}
              >
                <div>
                  <div className="inline-block bg-white/20 backdrop-blur-sm text-amber-300 font-black text-[10px] px-2 py-0.5 rounded-full mb-1">
                    {banner.badge}
                  </div>
                  <h3 className="font-black text-base leading-tight tracking-tight">
                    {banner.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">{banner.subtitle}</p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-amber-300 font-bold font-mono">
                    Code: {banner.code}
                  </span>
                  <button
                    onClick={() => navigate('/app/categories')}
                    className="bg-white text-slate-900 font-bold px-3 py-1 rounded-xl text-xs hover:bg-slate-100 flex items-center space-x-1"
                  >
                    <span>Shop Now</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Shop By Category Grid */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black text-slate-900 tracking-tight">
                Explore Categories
              </h3>
              <button
                onClick={() => navigate('/app/categories')}
                className="text-[11px] font-bold text-brand-600 hover:text-brand-700 flex items-center space-x-0.5"
              >
                <span>See All</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {categories.slice(0, 8).map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => navigate(`/app/category/${cat.id}`)}
                  className="bg-white rounded-2xl p-2 border border-slate-100 hover:border-brand-300 transition cursor-pointer flex flex-col items-center text-center group"
                >
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-50 mb-1.5 p-1 group-hover:scale-105 transition">
                    <img
                      src={cat.banner}
                      alt={cat.name}
                      className="w-full h-full object-cover rounded-lg"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-slate-800 line-clamp-1 leading-tight group-hover:text-brand-600">
                    {cat.name.split(',')[0]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Rail */}
          <section className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5">
                <span className="text-amber-500 font-bold">🔥</span>
                <h3 className="text-xs font-black text-slate-900 tracking-tight">
                  Trending in Bandra West
                </h3>
              </div>
              <span className="text-[10px] font-semibold text-slate-400">⚡ 10 Mins Delivery</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {trendingProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>

          {/* Farm Fresh Rail */}
          <section className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5">
                <span className="text-emerald-500 font-bold">🥬</span>
                <h3 className="text-xs font-black text-slate-900 tracking-tight">
                  Farm Fresh Daily Greens
                </h3>
              </div>
              <button
                onClick={() => navigate('/app/category/cat-groceries')}
                className="text-[11px] font-bold text-brand-600 hover:underline"
              >
                View All
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {freshProduce.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>

          {/* Dairy Rail */}
          <section className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5">
                <span className="text-sky-500 font-bold">🥛</span>
                <h3 className="text-xs font-black text-slate-900 tracking-tight">
                  Dairy & Breakfast
                </h3>
              </div>
              <button
                onClick={() => navigate('/app/category/cat-dairy')}
                className="text-[11px] font-bold text-brand-600 hover:underline"
              >
                View All
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {dairyProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  Share2,
  Zap,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Plus,
  Minus,
  Sparkles
} from 'lucide-react';

export const CustomerProductDetailScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, cart, addToCart, updateCartQuantity, selectedAddress } = useApp();

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="p-8 text-center">
        <h3 className="text-sm font-bold text-slate-800">Product Not Found</h3>
        <p className="text-xs text-slate-500 mt-1">This item might be unavailable or removed.</p>
        <button
          onClick={() => navigate('/app')}
          className="mt-4 bg-brand-600 text-white px-4 py-2 rounded-xl text-xs font-bold"
        >
          Back to Store
        </button>
      </div>
    );
  }

  const cartItem = cart.find(item => item.product.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;
  const isOutOfStock = product.stock <= 0;

  return (
    <div className="flex flex-col min-h-full bg-white relative pb-24">
      {/* Top Header */}
      <div className="p-3 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-20">
        <button
          onClick={() => navigate(-1)}
          className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-200"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <span className="text-xs font-bold text-slate-500 truncate max-w-[200px]">
          {product.brand}
        </span>
        <button
          onClick={() => alert('Link copied to clipboard (Demo)')}
          className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-200"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-4">
        {/* Large Product Hero Image */}
        <div className="relative bg-slate-50 rounded-3xl p-6 aspect-square flex items-center justify-center border border-slate-100 overflow-hidden">
          {product.discountPercent > 0 && (
            <div className="absolute top-3 left-3 bg-brand-600 text-white font-extrabold text-xs px-2.5 py-1 rounded-xl shadow-xs">
              {product.discountPercent}% OFF
            </div>
          )}

          <div className="absolute top-3 right-3 bg-white/90 p-1 rounded-lg shadow-xs">
            <div className={`w-3.5 h-3.5 border flex items-center justify-center ${product.isVeg ? 'border-emerald-600' : 'border-amber-700'}`}>
              <div className={`w-2 h-2 rounded-full ${product.isVeg ? 'bg-emerald-600' : 'bg-amber-700'}`} />
            </div>
          </div>

          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain max-h-64"
          />

          {isOutOfStock && (
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center">
              <span className="bg-red-600 text-white font-black text-xs px-3 py-1 rounded-xl uppercase tracking-wider">
                Currently Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Product Title & Brand */}
        <div>
          <div className="text-xs font-bold text-brand-600 tracking-wide uppercase mb-1">
            {product.brand}
          </div>
          <h1 className="text-base font-extrabold text-slate-900 leading-snug">
            {product.name}
          </h1>
          <div className="text-xs text-slate-500 font-medium mt-1">
            Pack Size: <span className="font-bold text-slate-800">{product.unit}</span>
          </div>

          <div className="flex items-center space-x-2 mt-2">
            <div className="flex items-center space-x-1 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-lg text-xs font-bold border border-emerald-200">
              <Star className="w-3 h-3 fill-emerald-600" />
              <span>{product.rating}</span>
            </div>
            <span className="text-xs text-slate-400">
              ({product.ratingCount || 120} verified reviews)
            </span>
          </div>
        </div>

        {/* Price & Delivery Card */}
        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between">
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-xl font-black text-slate-900">₹{product.price}</span>
              {product.mrp > product.price && (
                <span className="text-xs text-slate-400 line-through">₹{product.mrp}</span>
              )}
            </div>
            <span className="text-[10px] text-slate-500">(Inclusive of all taxes)</span>
          </div>

          <div className="text-right">
            <div className="inline-flex items-center space-x-1 bg-amber-500 text-white px-2 py-0.5 rounded-full text-[10px] font-black">
              <Zap className="w-3 h-3 fill-white" />
              <span>10 MINS</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">
              To {selectedAddress?.tag || 'Home'}
            </div>
          </div>
        </div>

        {/* Product Details & Specifications */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
            Product Information
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {product.description}
          </p>

          {product.storage && (
            <div className="p-3 bg-brand-50/50 rounded-2xl border border-brand-100 text-xs text-brand-900">
              <span className="font-bold block mb-0.5">Storage Instruction:</span>
              <span className="text-slate-600">{product.storage}</span>
            </div>
          )}

          {/* Quick Commerce Assurances */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <div className="p-2.5 rounded-xl border border-slate-100 bg-slate-50 flex items-start space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[11px] font-bold text-slate-800">100% Authentic</h4>
                <p className="text-[10px] text-slate-500">Sourced directly from verified brands</p>
              </div>
            </div>
            <div className="p-2.5 rounded-xl border border-slate-100 bg-slate-50 flex items-start space-x-2">
              <Truck className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[11px] font-bold text-slate-800">Cold Chain</h4>
                <p className="text-[10px] text-slate-500">Preserved in climate-controlled hubs</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Add Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[420px] mx-auto bg-white border-t border-slate-100 p-3 flex items-center justify-between z-30 shadow-lg">
        <div>
          <span className="text-[10px] text-slate-400 block">Total Price</span>
          <span className="text-base font-black text-slate-900">
            ₹{quantity > 0 ? product.price * quantity : product.price}
          </span>
        </div>

        <div>
          {isOutOfStock ? (
            <button
              disabled
              className="px-6 py-2.5 rounded-2xl text-xs font-bold bg-slate-100 text-slate-400 cursor-not-allowed"
            >
              Out of Stock
            </button>
          ) : quantity === 0 ? (
            <button
              onClick={() => addToCart(product, 1)}
              className="bg-brand-600 hover:bg-brand-700 text-white font-black px-6 py-2.5 rounded-2xl text-xs shadow-md transition active:scale-95 flex items-center space-x-1.5"
            >
              <span>ADD TO CART</span>
              <Plus className="w-4 h-4 stroke-[3]" />
            </button>
          ) : (
            <div className="flex items-center bg-brand-600 text-white rounded-2xl shadow-md overflow-hidden">
              <button
                onClick={() => updateCartQuantity(product.id, quantity - 1)}
                className="px-3.5 py-2.5 hover:bg-brand-700 transition"
              >
                <Minus className="w-3.5 h-3.5 stroke-[3]" />
              </button>
              <span className="px-3 text-xs font-black min-w-7 text-center">
                {quantity}
              </span>
              <button
                onClick={() => updateCartQuantity(product.id, quantity + 1)}
                disabled={quantity >= product.stock}
                className="px-3.5 py-2.5 hover:bg-brand-700 transition disabled:opacity-40"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

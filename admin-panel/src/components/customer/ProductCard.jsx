import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Minus, Star, Zap } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ProductCard = ({ product, compact = false }) => {
  const navigate = useNavigate();
  const { cart, addToCart, updateCartQuantity } = useApp();

  const cartItem = cart.find(item => item.product.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;
  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 3;

  const handleCardClick = () => {
    navigate(`/app/product/${product.id}`);
  };

  const handleAddClick = (e) => {
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product, 1);
  };

  const handleIncrement = (e) => {
    e.stopPropagation();
    if (quantity >= product.stock) return;
    updateCartQuantity(product.id, quantity + 1);
  };

  const handleDecrement = (e) => {
    e.stopPropagation();
    updateCartQuantity(product.id, quantity - 1);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-2xl border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between overflow-hidden relative group"
    >
      {/* Top Image & Badges Container */}
      <div className="relative bg-slate-50 aspect-square flex items-center justify-center p-2.5 overflow-hidden">
        {/* Discount Tag */}
        {product.discountPercent > 0 && (
          <div className="absolute top-2 left-2 z-10 bg-brand-600 text-white font-black text-[9px] px-1.5 py-0.5 rounded-md shadow-sm">
            {product.discountPercent}% OFF
          </div>
        )}

        {/* 10 Min Delivery Tag */}
        <div className="absolute bottom-2 left-2 z-10 bg-slate-900/80 backdrop-blur-sm text-amber-300 font-bold text-[9px] px-1.5 py-0.5 rounded-md flex items-center space-x-0.5">
          <Zap className="w-2.5 h-2.5 fill-amber-300 text-amber-300" />
          <span>10 MINS</span>
        </div>

        {/* Veg / Non-veg Indicator */}
        <div className="absolute top-2 right-2 z-10 bg-white/90 p-0.5 rounded shadow-xs">
          <div className={`w-3 h-3 border flex items-center justify-center ${product.isVeg ? 'border-emerald-600' : 'border-amber-700'}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${product.isVeg ? 'bg-emerald-600' : 'bg-amber-700'}`} />
          </div>
        </div>

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center">
            <span className="bg-red-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-3 flex flex-col flex-1 justify-between">
        <div>
          {/* Brand & Weight */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium mb-0.5">
            <span className="truncate">{product.brand}</span>
            <span className="font-semibold text-slate-600 ml-1">{product.unit}</span>
          </div>

          {/* Product Title */}
          <h4 className="text-xs font-bold text-slate-800 line-clamp-2 leading-tight group-hover:text-brand-600 transition-colors">
            {product.name}
          </h4>
        </div>

        {/* Bottom Pricing & Add Action */}
        <div className="mt-3 pt-2 border-t border-slate-50 flex items-center justify-between">
          <div>
            <div className="flex items-baseline space-x-1">
              <span className="text-sm font-extrabold text-slate-900">₹{product.price}</span>
              {product.mrp > product.price && (
                <span className="text-[10px] text-slate-400 line-through">₹{product.mrp}</span>
              )}
            </div>
            {isLowStock && !isOutOfStock && (
              <span className="text-[9px] text-amber-600 font-bold block">
                Only {product.stock} left
              </span>
            )}
          </div>

          {/* Add / Quantity Stepper */}
          <div onClick={(e) => e.stopPropagation()}>
            {isOutOfStock ? (
              <button
                disabled
                className="px-2.5 py-1 rounded-xl text-[11px] font-bold bg-slate-100 text-slate-400 cursor-not-allowed"
              >
                ADD
              </button>
            ) : quantity === 0 ? (
              <button
                onClick={handleAddClick}
                className="px-3.5 py-1 rounded-xl text-xs font-extrabold text-brand-600 bg-brand-50 hover:bg-brand-600 hover:text-white border border-brand-200 transition-all duration-150 shadow-xs flex items-center space-x-1"
              >
                <span>ADD</span>
                <Plus className="w-3 h-3 stroke-[3]" />
              </button>
            ) : (
              <div className="flex items-center bg-brand-600 text-white rounded-xl shadow-xs overflow-hidden">
                <button
                  onClick={handleDecrement}
                  className="px-2 py-1 hover:bg-brand-700 transition active:scale-90"
                >
                  <Minus className="w-3 h-3 stroke-[3]" />
                </button>
                <span className="px-2 text-xs font-black min-w-5 text-center">
                  {quantity}
                </span>
                <button
                  onClick={handleIncrement}
                  disabled={quantity >= product.stock}
                  className="px-2 py-1 hover:bg-brand-700 transition active:scale-90 disabled:opacity-40"
                >
                  <Plus className="w-3 h-3 stroke-[3]" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

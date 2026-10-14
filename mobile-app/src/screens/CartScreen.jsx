import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft,
  Trash2,
  Plus,
  Minus,
  Tag,
  Check,
  Zap,
  ArrowRight,
  ShoppingBag,
  X
} from 'lucide-react';

export const CartScreen = () => {
  const navigate = useNavigate();
  const {
    cart,
    updateCartQuantity,
    clearCart,
    getCartTotals,
    coupons,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    deliveryTip,
    setDeliveryTip
  } = useApp();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponError, setCouponError] = useState('');
  const [showCouponModal, setShowCouponModal] = useState(false);

  const totals = getCartTotals();

  const handleApplyCoupon = (code) => {
    setCouponError('');
    const res = applyCoupon(code);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setShowCouponModal(false);
      setInputCoupon('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 text-center">
        <div className="w-20 h-20 rounded-3xl bg-brand-50 flex items-center justify-center text-brand-600 mb-4 shadow-sm">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-base font-extrabold text-slate-800">Your cart is empty</h2>
        <p className="text-xs text-slate-500 mt-1 max-w-xs">
          Explore farm fresh fruits, cold pressed juices, and bakery delights delivered in 10 minutes.
        </p>
        <button
          onClick={() => navigate('/app')}
          className="mt-6 bg-brand-600 hover:bg-brand-700 text-white font-bold px-6 py-2.5 rounded-2xl text-xs shadow-md"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-4 space-y-4 pb-28">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigate('/app')}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-200"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-sm font-black text-slate-900 leading-tight">Your Cart</h1>
            <span className="text-[10px] text-slate-500">{totals.itemCount} items</span>
          </div>
        </div>

        <button
          onClick={clearCart}
          className="text-[11px] font-bold text-red-600 hover:underline flex items-center space-x-1"
        >
          <Trash2 className="w-3 h-3" />
          <span>Clear</span>
        </button>
      </div>

      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/80 rounded-2xl p-3">
        <div className="flex items-center justify-between text-xs mb-1.5 font-bold">
          <span className="text-emerald-900 flex items-center space-x-1">
            <Zap className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
            <span>
              {totals.amountNeededForFreeDelivery === 0
                ? 'You unlocked FREE 10-Min Delivery! 🎉'
                : `Add ₹${totals.amountNeededForFreeDelivery} more for FREE delivery`}
            </span>
          </span>
          <span className="text-emerald-700 text-[10px]">Threshold: ₹{totals.freeDeliveryThreshold}</span>
        </div>
        <div className="w-full bg-emerald-200/60 rounded-full h-2 overflow-hidden">
          <div
            className="bg-emerald-600 h-full rounded-full transition-all duration-300"
            style={{
              width: `${Math.min(100, (totals.itemsTotal / totals.freeDeliveryThreshold) * 100)}%`
            }}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 divide-y divide-slate-100 shadow-xs overflow-hidden">
        {cart.map(({ product, quantity }) => (
          <div key={product.id} className="p-3 flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1 min-w-0 pr-2">
              <img
                src={product.image}
                alt={product.name}
                className="w-12 h-12 rounded-xl object-contain bg-slate-50 border border-slate-100 p-1 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-slate-800 truncate">{product.name}</h4>
                <div className="text-[10px] text-slate-400 mt-0.5">{product.unit}</div>
                <div className="text-xs font-black text-slate-900 mt-1">₹{product.price * quantity}</div>
              </div>
            </div>

            <div className="flex items-center bg-brand-50 text-brand-700 rounded-xl border border-brand-200 shadow-2xs">
              <button
                onClick={() => updateCartQuantity(product.id, quantity - 1)}
                className="px-2 py-1 hover:bg-brand-100"
              >
                <Minus className="w-3 h-3 stroke-[3]" />
              </button>
              <span className="px-2 text-xs font-black min-w-5 text-center">
                {quantity}
              </span>
              <button
                onClick={() => updateCartQuantity(product.id, quantity + 1)}
                disabled={quantity >= product.stock}
                className="px-2 py-1 hover:bg-brand-100 disabled:opacity-40"
              >
                <Plus className="w-3 h-3 stroke-[3]" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-3.5 shadow-xs space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Tag className="w-4 h-4 text-brand-600" />
            <span className="text-xs font-bold text-slate-900">Avail Coupons & Offers</span>
          </div>
          <button
            onClick={() => setShowCouponModal(true)}
            className="text-[11px] font-bold text-brand-600 hover:underline"
          >
            {appliedCoupon ? 'Change' : 'View Offers'}
          </button>
        </div>

        {appliedCoupon ? (
          <div className="p-2.5 rounded-xl bg-brand-50 border border-brand-200 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 rounded-full bg-brand-600 text-white flex items-center justify-center">
                <Check className="w-3 h-3" />
              </div>
              <div>
                <span className="font-mono font-bold text-brand-900">{appliedCoupon.code}</span>
                <span className="text-[10px] text-brand-700 block">Applied! Saved ₹{totals.couponDiscount}</span>
              </div>
            </div>
            <button
              onClick={removeCoupon}
              className="text-[10px] font-bold text-red-600 hover:underline"
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Enter Coupon (e.g. LAXFIRST)"
              value={inputCoupon}
              onChange={(e) => setInputCoupon(e.target.value.toUpperCase())}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs uppercase font-mono tracking-wider focus:outline-none"
            />
            <button
              onClick={() => handleApplyCoupon(inputCoupon)}
              disabled={!inputCoupon.trim()}
              className="bg-brand-600 text-white font-bold px-3 py-1.5 rounded-xl text-xs hover:bg-brand-700 disabled:opacity-40"
            >
              Apply
            </button>
          </div>
        )}

        {couponError && (
          <p className="text-[10px] text-red-600 font-semibold">{couponError}</p>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-3.5 shadow-xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-900">Delivery Partner Tip</span>
          <span className="text-[10px] text-slate-400">100% goes to your rider</span>
        </div>
        <div className="flex space-x-2">
          {[0, 10, 20, 50].map((tipVal) => (
            <button
              key={tipVal}
              onClick={() => setDeliveryTip(tipVal)}
              className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition ${
                deliveryTip === tipVal
                  ? 'bg-brand-600 text-white border-brand-600'
                  : 'bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              {tipVal === 0 ? 'No Tip' : `₹${tipVal}`}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-3.5 shadow-xs space-y-2 text-xs">
        <h4 className="font-black text-slate-900 text-xs pb-1 border-b border-slate-100">
          Bill Details
        </h4>
        <div className="flex justify-between text-slate-600">
          <span>Items Total</span>
          <span className="font-semibold text-slate-900">₹{totals.itemsTotal}</span>
        </div>
        {totals.couponDiscount > 0 && (
          <div className="flex justify-between text-brand-600 font-medium">
            <span>Coupon Discount ({appliedCoupon?.code})</span>
            <span className="font-bold">-₹{totals.couponDiscount}</span>
          </div>
        )}
        <div className="flex justify-between text-slate-600">
          <span>Delivery Fee</span>
          <span className="font-semibold text-slate-900">
            {totals.deliveryFee === 0 ? 'FREE' : `₹${totals.deliveryFee}`}
          </span>
        </div>
        <div className="flex justify-between text-slate-600">
          <span>Handling Fee</span>
          <span className="font-semibold text-slate-900">₹{totals.handlingFee}</span>
        </div>
        {totals.tip > 0 && (
          <div className="flex justify-between text-slate-600">
            <span>Rider Tip</span>
            <span className="font-semibold text-slate-900">₹{totals.tip}</span>
          </div>
        )}
        <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-sm font-black text-slate-900">
          <span>To Pay</span>
          <span className="text-base text-brand-700">₹{totals.grandTotal}</span>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-[420px] mx-auto bg-white border-t border-slate-100 p-3 z-30 shadow-xl">
        <button
          onClick={() => navigate('/app/checkout')}
          className="w-full bg-brand-600 hover:bg-brand-700 text-white font-black py-3 rounded-2xl shadow-lg flex items-center justify-between px-4"
        >
          <div className="text-left">
            <span className="text-[10px] text-brand-200 block uppercase font-bold">Total Amount</span>
            <span className="text-base font-black">₹{totals.grandTotal}</span>
          </div>
          <div className="flex items-center space-x-1.5 text-xs font-bold bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-xl">
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </button>
      </div>

      {showCouponModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm p-0">
          <div className="bg-white w-full max-w-md rounded-t-3xl shadow-2xl p-4 max-h-[70vh] overflow-y-auto space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">Available Coupons</h3>
              <button
                onClick={() => setShowCouponModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2.5">
              {coupons.map((coupon) => (
                <div
                  key={coupon.code}
                  className="p-3 border border-dashed border-brand-300 rounded-2xl bg-brand-50/40 flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-black text-xs bg-brand-600 text-white px-2 py-0.5 rounded-lg">
                        {coupon.code}
                      </span>
                      <span className="text-[10px] font-bold text-brand-900">
                        {coupon.discountType === 'flat' ? `Flat ₹${coupon.discountValue} OFF` : `${coupon.discountValue}% OFF`}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-600 mt-1">{coupon.description}</p>
                  </div>
                  <button
                    onClick={() => handleApplyCoupon(coupon.code)}
                    className="bg-brand-600 text-white font-bold px-3 py-1.5 rounded-xl text-xs"
                  >
                    Apply
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

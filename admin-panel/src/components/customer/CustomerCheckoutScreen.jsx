import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  MapPin,
  Clock,
  ShieldCheck,
  CreditCard,
  Smartphone,
  Banknote,
  CheckCircle2,
  AlertCircle,
  Zap,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { CustomerLocationModal } from './CustomerLocationModal';

export const CustomerCheckoutScreen = () => {
  const navigate = useNavigate();
  const {
    cart,
    selectedAddress,
    getCartTotals,
    deliveryInstructions,
    setDeliveryInstructions,
    createOrder
  } = useApp();

  const [showLocationModal, setShowLocationModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('UPI'); // UPI, Card, COD
  const [simulateFailure, setSimulateFailure] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  const totals = getCartTotals();

  const instructionOptions = [
    'Leave at door',
    'Do not ring bell',
    'Call before arriving',
    'Leave with security guard'
  ];

  const handlePlaceOrder = () => {
    setPaymentError(null);
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);

      if (simulateFailure) {
        setPaymentError({
          title: 'Payment Simulation Failed',
          message: 'The mock bank server declined the transaction (Demo Error State). Switch toggle to test successful checkout.',
          code: 'ERR_MOCK_PAYMENT_DECLINED'
        });
        return;
      }

      // Create Order in shared state
      const newOrder = createOrder({
        paymentMethod: selectedPayment === 'UPI' ? 'UPI (GPay / PhonePe)' : selectedPayment === 'Card' ? 'Credit Card (Visa)' : 'Cash on Delivery'
      });

      // Navigate to order confirmation
      navigate(`/app/order/${newOrder.id}`);
    }, 1200);
  };

  return (
    <div className="p-3 sm:p-4 space-y-4 pb-28">
      <CustomerLocationModal
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
      />

      {/* Header */}
      <div className="flex items-center space-x-2 pb-2 border-b border-slate-100">
        <button
          onClick={() => navigate('/app/cart')}
          className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-200"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="text-sm font-black text-slate-900 leading-tight">Checkout</h1>
          <span className="text-[10px] text-slate-500">Express 10-Minute Delivery</span>
        </div>
      </div>

      {/* Delivery Address Card */}
      <div className="bg-white rounded-2xl border border-slate-100 p-3.5 shadow-xs space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-900">
            <MapPin className="w-4 h-4 text-brand-600" />
            <span>Delivery Address</span>
          </div>
          <button
            onClick={() => setShowLocationModal(true)}
            className="text-[11px] font-bold text-brand-600 hover:underline"
          >
            Change
          </button>
        </div>

        <div className="p-2.5 bg-slate-50 rounded-xl text-xs">
          <div className="font-bold text-slate-800">{selectedAddress?.tag || 'Home'}</div>
          <div className="text-slate-600 text-[11px] mt-0.5">
            {selectedAddress?.flat}, {selectedAddress?.street}
          </div>
          <div className="text-slate-400 text-[10px]">
            {selectedAddress?.area}, {selectedAddress?.city} - {selectedAddress?.pincode}
          </div>
        </div>
      </div>

      {/* Delivery Instructions */}
      <div className="bg-white rounded-2xl border border-slate-100 p-3.5 shadow-xs space-y-2">
        <span className="text-xs font-bold text-slate-900 block">
          Delivery Instructions for Rider
        </span>
        <div className="grid grid-cols-2 gap-2">
          {instructionOptions.map((opt) => {
            const isSelected = deliveryInstructions === opt;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => setDeliveryInstructions(opt)}
                className={`p-2 rounded-xl text-[10px] font-semibold text-left border transition ${
                  isSelected
                    ? 'bg-brand-50 border-brand-500 text-brand-900'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {/* Payment Options */}
      <div className="bg-white rounded-2xl border border-slate-100 p-3.5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-900">Payment Method</span>
          <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
            100% Mock Safe
          </span>
        </div>

        <div className="space-y-2">
          {/* UPI */}
          <div
            onClick={() => setSelectedPayment('UPI')}
            className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${
              selectedPayment === 'UPI' ? 'border-brand-500 bg-brand-50/50 ring-1 ring-brand-500' : 'border-slate-200 bg-slate-50'
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                UPI
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Instant UPI (Recommended)</div>
                <div className="text-[10px] text-slate-500">Google Pay, PhonePe, Paytm QR</div>
              </div>
            </div>
            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedPayment === 'UPI' ? 'border-brand-600 bg-brand-600' : 'border-slate-300'}`}>
              {selectedPayment === 'UPI' && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
            </div>
          </div>

          {/* Card */}
          <div
            onClick={() => setSelectedPayment('Card')}
            className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${
              selectedPayment === 'Card' ? 'border-brand-500 bg-brand-50/50 ring-1 ring-brand-500' : 'border-slate-200 bg-slate-50'
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                <CreditCard className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Credit / Debit Card</div>
                <div className="text-[10px] text-slate-500">Visa •••• 4242 (Mock)</div>
              </div>
            </div>
            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedPayment === 'Card' ? 'border-brand-600 bg-brand-600' : 'border-slate-300'}`}>
              {selectedPayment === 'Card' && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
            </div>
          </div>

          {/* COD */}
          <div
            onClick={() => setSelectedPayment('COD')}
            className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${
              selectedPayment === 'COD' ? 'border-brand-500 bg-brand-50/50 ring-1 ring-brand-500' : 'border-slate-200 bg-slate-50'
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold text-xs">
                <Banknote className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Pay on Delivery</div>
                <div className="text-[10px] text-slate-500">Cash or UPI upon delivery</div>
              </div>
            </div>
            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedPayment === 'COD' ? 'border-brand-600 bg-brand-600' : 'border-slate-300'}`}>
              {selectedPayment === 'COD' && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
            </div>
          </div>
        </div>

        {/* Presentation Payment Simulation Mode Switcher */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs bg-slate-50 p-2.5 rounded-xl">
          <div className="flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span className="text-[11px] font-semibold text-slate-700">Demo Simulation:</span>
          </div>

          <div className="flex space-x-1">
            <button
              type="button"
              onClick={() => { setSimulateFailure(false); setPaymentError(null); }}
              className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border transition ${
                !simulateFailure
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                  : 'bg-white text-slate-600 border-slate-200'
              }`}
            >
              Simulate Success
            </button>
            <button
              type="button"
              onClick={() => setSimulateFailure(true)}
              className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border transition ${
                simulateFailure
                  ? 'bg-red-600 text-white border-red-600 shadow-2xs'
                  : 'bg-white text-slate-600 border-slate-200'
              }`}
            >
              Simulate Failure
            </button>
          </div>
        </div>

        {/* Error Alert if Payment Failed */}
        {paymentError && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs space-y-1 animate-in shake">
            <div className="flex items-center space-x-1.5 text-red-700 font-bold">
              <AlertCircle className="w-4 h-4" />
              <span>{paymentError.title}</span>
            </div>
            <p className="text-[11px] text-red-600">{paymentError.message}</p>
          </div>
        )}
      </div>

      {/* Bill Recap */}
      <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200/80 text-xs flex items-center justify-between">
        <div>
          <span className="text-[10px] text-slate-500 block">Total Payable</span>
          <span className="text-base font-black text-slate-900">₹{totals.grandTotal}</span>
        </div>
        <span className="text-[10px] text-slate-400 font-medium">⚡ Arriving in 10-12 Mins</span>
      </div>

      {/* Fixed Sticky Place Order Button */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[420px] mx-auto bg-white border-t border-slate-100 p-3 z-30 shadow-xl">
        <button
          onClick={handlePlaceOrder}
          disabled={isProcessing}
          className="w-full bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white font-black py-3 rounded-2xl shadow-lg flex items-center justify-center space-x-2 transition active:scale-[0.99] disabled:opacity-50"
        >
          {isProcessing ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Processing Demo Payment...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <span>Pay ₹{totals.grandTotal} & Place Order</span>
              <Zap className="w-4 h-4 fill-white" />
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  MapPin,
  Crosshair,
  Search,
  Check,
  Plus,
  Home,
  Briefcase,
  Building,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CustomerLocationModal = ({ isOpen, onClose }) => {
  const { customer, selectedAddress, setSelectedAddress, addCustomerAddress } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDetectingGps, setIsDetectingGps] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTag, setNewTag] = useState('Home');
  const [newFlat, setNewFlat] = useState('');
  const [newStreet, setNewStreet] = useState('');

  if (!isOpen) return null;

  const handleDetectGps = () => {
    setIsDetectingGps(true);
    setTimeout(() => {
      setIsDetectingGps(false);
      const detected = {
        id: `addr-gps-${Date.now()}`,
        tag: 'Current Location',
        isDefault: false,
        flat: 'Bandra Linking Road Apt 3B',
        street: 'Opp. KFC, Linking Road',
        area: 'Bandra West',
        city: 'Mumbai',
        pincode: '400050',
        landmark: 'Near Bandra Station'
      };
      setSelectedAddress(detected);
      onClose();
    }, 900);
  };

  const handleSelect = (addr) => {
    setSelectedAddress(addr);
    onClose();
  };

  const handleSaveNewAddress = (e) => {
    e.preventDefault();
    if (!newFlat || !newStreet) return;
    const added = addCustomerAddress({
      tag: newTag,
      flat: newFlat,
      street: newStreet,
      area: 'Bandra West',
      city: 'Mumbai',
      pincode: '400050',
      landmark: 'Demo Landmark'
    });
    setSelectedAddress(added);
    setShowAddForm(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center text-brand-600">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Select Delivery Location</h3>
              <p className="text-[11px] text-slate-500">Superfast 10-minute delivery to Bandra West</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-900"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4 overflow-y-auto">
          {/* Search Location */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search area, apartment, or street..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>

          {/* GPS Detector button */}
          <button
            onClick={handleDetectGps}
            disabled={isDetectingGps}
            className="w-full p-3 bg-gradient-to-r from-brand-50 to-indigo-50 border border-brand-100 rounded-2xl flex items-center justify-between text-left hover:border-brand-300 transition"
          >
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-brand-600 text-white flex items-center justify-center shadow-sm">
                <Crosshair className={`w-4 h-4 ${isDetectingGps ? 'animate-spin' : ''}`} />
              </div>
              <div>
                <div className="text-xs font-bold text-brand-900">
                  {isDetectingGps ? 'Detecting high-precision GPS...' : 'Use Current Location'}
                </div>
                <div className="text-[10px] text-brand-700">Linking Road, Bandra West • 10-12 Mins</div>
              </div>
            </div>
            <span className="text-[10px] font-bold text-brand-600 bg-white px-2 py-0.5 rounded-full border border-brand-200">
              ⚡ FASTEST
            </span>
          </button>

          {/* Saved Addresses List */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-800">Saved Addresses</span>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="text-[11px] font-semibold text-brand-600 hover:text-brand-700 flex items-center space-x-1"
              >
                <Plus className="w-3 h-3" />
                <span>{showAddForm ? 'Cancel' : 'Add New'}</span>
              </button>
            </div>

            {/* Add Address Form toggle */}
            {showAddForm && (
              <form onSubmit={handleSaveNewAddress} className="mb-3 p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex space-x-2">
                  {['Home', 'Office', 'Other'].map(t => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setNewTag(t)}
                      className={`px-3 py-1 rounded-lg text-[11px] font-medium border ${
                        newTag === t ? 'bg-brand-600 text-white border-brand-600' : 'bg-white text-slate-600 border-slate-200'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Flat / House / Floor No."
                  value={newFlat}
                  onChange={e => setNewFlat(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="Street / Society / Landmark"
                  value={newStreet}
                  onChange={e => setNewStreet(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-brand-600 text-white font-bold py-1.5 rounded-xl text-xs hover:bg-brand-700 transition"
                >
                  Save & Deliver Here
                </button>
              </form>
            )}

            <div className="space-y-2">
              {customer.addresses.map((addr) => {
                const isSelected = selectedAddress?.id === addr.id;
                return (
                  <div
                    key={addr.id}
                    onClick={() => handleSelect(addr)}
                    className={`p-3 rounded-2xl border cursor-pointer transition flex items-start justify-between ${
                      isSelected
                        ? 'border-brand-500 bg-brand-50/50 ring-1 ring-brand-500'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start space-x-2.5">
                      <div className="mt-0.5 text-slate-500">
                        {addr.tag === 'Home' ? (
                          <Home className="w-4 h-4 text-brand-600" />
                        ) : addr.tag === 'Office' ? (
                          <Briefcase className="w-4 h-4 text-indigo-600" />
                        ) : (
                          <Building className="w-4 h-4 text-slate-600" />
                        )}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 flex items-center space-x-1.5">
                          <span>{addr.tag}</span>
                          {addr.isDefault && (
                            <span className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-medium">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-600 line-clamp-1 mt-0.5">
                          {addr.flat}, {addr.street}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {addr.area}, {addr.city} - {addr.pincode}
                        </p>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-brand-600 text-white flex items-center justify-center shadow-sm">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-center text-[11px] text-slate-500">
          Instant 10-Minute Serviceability Active across Bandra, Khar & Santacruz
        </div>
      </div>
    </div>
  );
};

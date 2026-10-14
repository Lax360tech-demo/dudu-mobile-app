import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Package,
  Layers,
  Boxes,
  ShoppingBag,
  Truck,
  Users,
  Tag,
  BarChart3,
  LogOut,
  Zap,
  Search,
  Bell,
  Menu,
  X,
  ExternalLink,
  Smartphone,
  ChevronRight
} from 'lucide-react';

export const AdminLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orders, setIsAdminAuthenticated } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Active in-progress orders count
  const activeOrdersCount = orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length;

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Orders', path: '/admin/orders', icon: ShoppingBag, badge: activeOrdersCount > 0 ? activeOrdersCount : null },
    { label: 'Products', path: '/admin/products', icon: Package },
    { label: 'Categories', path: '/admin/categories', icon: Layers },
    { label: 'Inventory', path: '/admin/inventory', icon: Boxes },
    { label: 'Delivery Fleet', path: '/admin/delivery-tracking', icon: Truck },
    { label: 'Customers', path: '/admin/customers', icon: Users },
    { label: 'Coupons', path: '/admin/coupons', icon: Tag },
    { label: 'Reports', path: '/admin/reports', icon: BarChart3 }
  ];

  const handleLogout = () => {
    setIsAdminAuthenticated(false);
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased">
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex w-64 bg-slate-900 border-r border-slate-800 flex-col justify-between shrink-0">
          <div>
            {/* Brand Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
                  <Zap className="w-4 h-4 fill-amber-300 text-amber-300" />
                </div>
                <div>
                  <h1 className="font-black text-sm text-white tracking-wide">LAX360 ADMIN</h1>
                  <span className="text-[10px] text-slate-400">Dark Store Operations</span>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="p-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path || (item.path !== '/admin/dashboard' && location.pathname.startsWith(item.path));
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition ${
                      isActive
                        ? 'bg-brand-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${isActive ? 'bg-white text-brand-700' : 'bg-brand-600 text-white'}`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Bottom Sidebar Hub */}
          <div className="p-3 border-t border-slate-800 space-y-2">
            {/* Quick jump to customer app */}
            <button
              onClick={() => navigate('/app')}
              className="w-full bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 p-2.5 rounded-xl text-xs flex items-center justify-between transition"
            >
              <div className="flex items-center space-x-2">
                <Smartphone className="w-4 h-4 text-brand-400" />
                <span className="font-semibold">Customer App</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="w-full text-slate-400 hover:text-red-400 text-xs font-semibold p-2 flex items-center space-x-2 transition rounded-xl hover:bg-slate-800/40"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout Admin</span>
            </button>
          </div>
        </aside>

        {/* Mobile Header Menu Overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex">
            <div className="w-64 bg-slate-900 h-full p-4 flex flex-col justify-between border-r border-slate-800 animate-in slide-in-from-left">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-brand-400" />
                    <span className="font-bold text-sm text-white">LAX360 Ops</span>
                  </div>
                  <button onClick={() => setMobileMenuOpen(false)} className="text-slate-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <nav className="space-y-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800"
                    >
                      <div className="flex items-center space-x-2">
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[10px] bg-brand-600 text-white px-1.5 py-0.5 rounded-full font-bold">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </nav>
              </div>

              <button
                onClick={() => { setMobileMenuOpen(false); navigate('/app'); }}
                className="w-full bg-brand-600 text-white font-bold p-2.5 rounded-xl text-xs flex items-center justify-center space-x-2"
              >
                <Smartphone className="w-4 h-4" />
                <span>Go to Customer App</span>
              </button>
            </div>
            <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
          </div>
        )}

        {/* Main Admin Content Body */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Top Admin Bar */}
          <header className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-bold text-slate-200">
                    Bandra Hub #01 (Active)
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 hidden sm:block">
                  Avg. Pick Time: 2.1m • 10-Min SLA 98.4%
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="hidden md:flex items-center space-x-1.5 bg-slate-800/80 px-3 py-1 rounded-xl border border-slate-700 text-xs">
                <span className="text-slate-400">Active Deliveries:</span>
                <span className="font-black text-amber-400">{activeOrdersCount}</span>
              </div>

              <div className="flex items-center space-x-2 border-l border-slate-800 pl-3">
                <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-xs text-white">
                  AD
                </div>
                <span className="text-xs font-semibold text-slate-300 hidden sm:inline">
                  Demo Manager
                </span>
              </div>
            </div>
          </header>

          {/* Child Page Content */}
          <main className="p-4 sm:p-6 flex-1 bg-slate-950 text-slate-100">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

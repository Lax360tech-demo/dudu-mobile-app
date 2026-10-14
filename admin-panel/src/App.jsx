import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { DemoPresentationToolbar } from './components/common/DemoPresentationToolbar';

// Customer Components
import { PhoneFrameContainer } from './components/customer/PhoneFrameContainer';
import { CustomerHomeScreen } from './components/customer/CustomerHomeScreen';
import { CustomerCategoriesScreen } from './components/customer/CustomerCategoriesScreen';
import { CustomerProductDetailScreen } from './components/customer/CustomerProductDetailScreen';
import { CustomerCartScreen } from './components/customer/CustomerCartScreen';
import { CustomerCheckoutScreen } from './components/customer/CustomerCheckoutScreen';
import { CustomerOrderConfirmScreen } from './components/customer/CustomerOrderConfirmScreen';
import { CustomerOrdersListScreen } from './components/customer/CustomerOrdersListScreen';
import { CustomerOrderDetailScreen } from './components/customer/CustomerOrderDetailScreen';
import { CustomerTrackingScreen } from './components/customer/CustomerTrackingScreen';
import { CustomerProfileScreen } from './components/customer/CustomerProfileScreen';
import { CustomerLoginScreen } from './components/customer/CustomerLoginScreen';

// Admin Components
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminLoginScreen } from './components/admin/AdminLoginScreen';
import { AdminDashboardScreen } from './components/admin/AdminDashboardScreen';
import { AdminOrdersScreen } from './components/admin/AdminOrdersScreen';
import { AdminOrderDetailScreen } from './components/admin/AdminOrderDetailScreen';
import { AdminProductsScreen } from './components/admin/AdminProductsScreen';
import { AdminCategoriesScreen } from './components/admin/AdminCategoriesScreen';
import { AdminInventoryScreen } from './components/admin/AdminInventoryScreen';
import { AdminDeliveryTrackingScreen } from './components/admin/AdminDeliveryTrackingScreen';
import { AdminCustomersScreen } from './components/admin/AdminCustomersScreen';
import { AdminCouponsScreen } from './components/admin/AdminCouponsScreen';
import { AdminReportsScreen } from './components/admin/AdminReportsScreen';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        {/* Global Demo Presentation Switcher & Utilities Bar */}
        <DemoPresentationToolbar />

        <Routes>
          {/* Default Redirect to Customer App */}
          <Route path="/" element={<Navigate to="/app" replace />} />

          {/* Customer Routes */}
          <Route path="/app" element={<PhoneFrameContainer><CustomerHomeScreen /></PhoneFrameContainer>} />
          <Route path="/app/login" element={<PhoneFrameContainer><CustomerLoginScreen /></PhoneFrameContainer>} />
          <Route path="/app/categories" element={<PhoneFrameContainer><CustomerCategoriesScreen /></PhoneFrameContainer>} />
          <Route path="/app/category/:id" element={<PhoneFrameContainer><CustomerCategoriesScreen /></PhoneFrameContainer>} />
          <Route path="/app/product/:id" element={<PhoneFrameContainer><CustomerProductDetailScreen /></PhoneFrameContainer>} />
          <Route path="/app/cart" element={<PhoneFrameContainer><CustomerCartScreen /></PhoneFrameContainer>} />
          <Route path="/app/checkout" element={<PhoneFrameContainer><CustomerCheckoutScreen /></PhoneFrameContainer>} />
          <Route path="/app/order/:id" element={<PhoneFrameContainer><CustomerOrderConfirmScreen /></PhoneFrameContainer>} />
          <Route path="/app/orders" element={<PhoneFrameContainer><CustomerOrdersListScreen /></PhoneFrameContainer>} />
          <Route path="/app/orders/:id" element={<PhoneFrameContainer><CustomerOrderDetailScreen /></PhoneFrameContainer>} />
          <Route path="/app/track/:id" element={<PhoneFrameContainer><CustomerTrackingScreen /></PhoneFrameContainer>} />
          <Route path="/app/profile" element={<PhoneFrameContainer><CustomerProfileScreen /></PhoneFrameContainer>} />

          {/* Admin Routes */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/login" element={<AdminLoginScreen />} />
          <Route path="/admin/dashboard" element={<AdminLayout><AdminDashboardScreen /></AdminLayout>} />
          <Route path="/admin/orders" element={<AdminLayout><AdminOrdersScreen /></AdminLayout>} />
          <Route path="/admin/orders/:id" element={<AdminLayout><AdminOrderDetailScreen /></AdminLayout>} />
          <Route path="/admin/products" element={<AdminLayout><AdminProductsScreen /></AdminLayout>} />
          <Route path="/admin/categories" element={<AdminLayout><AdminCategoriesScreen /></AdminLayout>} />
          <Route path="/admin/inventory" element={<AdminLayout><AdminInventoryScreen /></AdminLayout>} />
          <Route path="/admin/delivery-tracking" element={<AdminLayout><AdminDeliveryTrackingScreen /></AdminLayout>} />
          <Route path="/admin/customers" element={<AdminLayout><AdminCustomersScreen /></AdminLayout>} />
          <Route path="/admin/coupons" element={<AdminLayout><AdminCouponsScreen /></AdminLayout>} />
          <Route path="/admin/reports" element={<AdminLayout><AdminReportsScreen /></AdminLayout>} />

          {/* Fallback Graceful Route */}
          <Route path="*" element={<Navigate to="/app" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

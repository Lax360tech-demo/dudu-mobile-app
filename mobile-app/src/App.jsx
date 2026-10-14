import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { PhoneFrameContainer } from './components/PhoneFrameContainer';

import { SplashScreen } from './screens/SplashScreen';
import { LoginScreen } from './screens/LoginScreen';
import { HomeScreen } from './screens/HomeScreen';
import { CategoriesScreen } from './screens/CategoriesScreen';
import { ProductDetailScreen } from './screens/ProductDetailScreen';
import { CartScreen } from './screens/CartScreen';
import { CheckoutScreen } from './screens/CheckoutScreen';
import { OrderConfirmationScreen } from './screens/OrderConfirmationScreen';
import { OrdersScreen } from './screens/OrdersScreen';
import { OrderDetailScreen } from './screens/OrderDetailScreen';
import { DeliveryTrackingScreen } from './screens/DeliveryTrackingScreen';
import { ProfileScreen } from './screens/ProfileScreen';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <PhoneFrameContainer>
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/app" element={<HomeScreen />} />
            <Route path="/app/login" element={<LoginScreen />} />
            <Route path="/app/categories" element={<CategoriesScreen />} />
            <Route path="/app/category/:id" element={<CategoriesScreen />} />
            <Route path="/app/product/:id" element={<ProductDetailScreen />} />
            <Route path="/app/cart" element={<CartScreen />} />
            <Route path="/app/checkout" element={<CheckoutScreen />} />
            <Route path="/app/order/:id" element={<OrderConfirmationScreen />} />
            <Route path="/app/orders" element={<OrdersScreen />} />
            <Route path="/app/orders/:id" element={<OrderDetailScreen />} />
            <Route path="/app/track/:id" element={<DeliveryTrackingScreen />} />
            <Route path="/app/profile" element={<ProfileScreen />} />
            <Route path="*" element={<Navigate to="/app" replace />} />
          </Routes>
        </PhoneFrameContainer>
      </BrowserRouter>
    </AppProvider>
  );
}

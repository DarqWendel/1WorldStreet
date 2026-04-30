import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth }           from '@/contexts/AuthContext';
import { CartProvider }                    from '@/contexts/CartContext';
import { OrdersProvider }                  from '@/contexts/OrdersContext';
import { StoreConfigProvider }             from '@/contexts/StoreConfigContext';
import { ProductsProvider }               from '@/contexts/ProductsContext';
import Navbar                              from '@/components/shared/Navbar';
import Footer                              from '@/components/shared/Footer';
import { Toaster }                         from '@/components/ui/toaster';

import HomePage              from '@/pages/HomePage';
import ProductsPage          from '@/pages/ProductsPage';
import ProductDetailPage     from '@/pages/ProductDetailPage';
import CartPage              from '@/pages/CartPage';
import CheckoutPage          from '@/pages/CheckoutPage';
import LoginPage             from '@/pages/LoginPage';
import OrderConfirmationPage from '@/pages/OrderConfirmationPage';
import AboutPage             from '@/pages/AboutPage';
import ContactPage           from '@/pages/ContactPage';
import PolicyPage            from '@/pages/PolicyPage';
import DropsPage             from '@/pages/DropsPage';
import AdminPage             from '@/pages/AdminPage';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  if (!isLoggedIn) return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
};

const AdminRoute = ({ children }) => {
  const { isAdmin } = useAuth();
  if (!isAdmin) return <Navigate to="/" replace />;
  return children;
};

function AppRoutes() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/"                   element={<HomePage />} />
          <Route path="/products"           element={<ProductsPage />} />
          <Route path="/product/:id"        element={<ProductDetailPage />} />
          <Route path="/drops"              element={<DropsPage />} />
          <Route path="/about"              element={<AboutPage />} />
          <Route path="/contact"            element={<ContactPage />} />
          <Route path="/policy/:type"       element={<PolicyPage />} />
          <Route path="/login"              element={<LoginPage />} />
          <Route path="/cart"               element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
          <Route path="/checkout"           element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
          <Route path="/order-confirmation" element={<ProtectedRoute><OrderConfirmationPage /></ProtectedRoute>} />
          <Route path="/admin"              element={<AdminRoute><AdminPage /></AdminRoute>} />
        </Routes>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <StoreConfigProvider>
        <ProductsProvider>
        <OrdersProvider>
          <CartProvider>
            <Router>
              <AppRoutes />
            </Router>
          </CartProvider>
        </OrdersProvider>
        </ProductsProvider>
      </StoreConfigProvider>
    </AuthProvider>
  );
}

export default App;

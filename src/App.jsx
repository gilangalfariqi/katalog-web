import React, { useState } from 'react';
import './App.css';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import { CatalogPage } from './pages/CatalogPage';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartModal } from './components/CartModal';

function AppContent() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartClick = () => setIsCartOpen(true);
  const handleCloseCart = () => setIsCartOpen(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onOpenCart={handleCartClick} />
      <div className="flex-grow">
        <CatalogPage onCartClick={handleCartClick} />
      </div>
      <Footer />
      <CartModal
        isOpen={isCartOpen}
        onClose={handleCloseCart}
      />
      <Analytics />
      <SpeedInsights />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </CartProvider>
  );
}

export default App;

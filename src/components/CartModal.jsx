import React, { useEffect, useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, MessageCircle, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

function CartItemCard({ item, onUpdateQuantity, onRemove }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
      {/* Product Image */}
      <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
        {item.image_url && !imageError ? (
          <img
            src={item.image_url}
            alt={item.name}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-2xl">
            👗
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-gray-900 truncate mb-1">
          {item.name}
        </h4>
        <p className="text-primary font-bold text-sm mb-3">
          {item.formattedPrice}
        </p>

        {/* Quantity Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onUpdateQuantity(item.id, -1)}
              className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
              aria-label="Kurangi quantity"
            >
              <Minus size={14} />
            </button>
            <span className="w-8 text-center font-semibold text-gray-900">
              {item.qty}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.id, 1)}
              className="w-8 h-8 rounded-lg bg-primary hover:bg-primary-dark flex items-center justify-center text-white transition-colors"
              aria-label="Tambah quantity"
            >
              <Plus size={14} />
            </button>
          </div>

          <button
            onClick={() => onRemove(item.id)}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Hapus dari keranjang"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Item Total */}
      <div className="text-right">
        <p className="text-sm font-bold text-gray-900">
          {new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
          }).format(item.price * item.qty)}
        </p>
      </div>
    </div>
  );
}

function EmptyCart({ onClose }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
        <ShoppingBag size={40} className="text-gray-300" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Keranjang kamu kosong
      </h3>
      <p className="text-sm text-gray-500 text-center mb-6">
        Yuk, mulai belanja untuk tampil lebih percaya diri!
      </p>
      <button
        onClick={onClose}
        className="w-full max-w-xs inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-accent text-white font-semibold rounded-xl py-3.5 px-6 transition-all duration-300 shadow-md hover:shadow-lg"
      >
        <ArrowRight size={18} />
        <span>Mulai Belanja</span>
      </button>
    </div>
  );
}

export function CartModal({ isOpen, onClose }) {
  const { cart, totals, updateQuantity, removeFromCart, clearCart, generateWhatsAppLink } = useCart();

  // ESC key to close
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const whatsappLink = generateWhatsAppLink();

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-In Panel */}
      <div 
        className={`fixed inset-y-0 right-0 z-[70] w-full sm:w-[480px] bg-white shadow-2xl transform transition-transform duration-500 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex-shrink-0 p-6 border-b border-gray-100 flex items-center justify-between bg-cream-50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
              <ShoppingBag className="text-primary" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-serif font-black text-brown-900">Your Bag</h2>
              <p className="text-sm text-brown-600 font-medium">
                {totals.itemCount} {totals.itemCount === 1 ? 'item' : 'items'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-3 rounded-full hover:bg-white hover:shadow-soft text-brown-400 hover:text-brown-900 transition-all group"
            aria-label="Close cart"
          >
            <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
          {cart.length === 0 ? (
            <EmptyCart onClose={onClose} />
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeFromCart}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="flex-shrink-0 p-6 bg-cream-50 border-t border-gray-100 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-brown-600">
                <span className="font-medium">Subtotal</span>
                <span className="font-bold">{totals.formattedSubtotal}</span>
              </div>
              <div className="flex items-center justify-between text-brown-900 pt-3 border-t border-gray-200">
                <span className="text-xl font-serif font-black">Total Amount</span>
                <span className="text-2xl font-black tracking-tight">{totals.formattedTotal}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-primary hover:bg-primary-dark text-white font-serif font-black py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all hover:shadow-luxury hover:-translate-y-0.5"
              >
                <MessageCircle size={24} />
                <span>Checkout via WhatsApp</span>
                <ArrowRight size={20} className="ml-2" />
              </a>
              
              <button
                onClick={clearCart}
                className="w-full text-brown-400 hover:text-red-500 text-sm font-medium py-2 transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 size={16} />
                Empty Shopping Bag
              </button>
            </div>
            
            <p className="text-center text-xs text-brown-400">
              Orders are processed securely via WhatsApp
            </p>
          </div>
        )}
      </div>
    </>
  );
}


import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";

const CartContext = createContext(null);

const WHATSAPP_NUMBER = "082174128947";
const STORAGE_KEY = "katalog_cart";

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.warn("Error loading cart:", e);
      return [];
    }
  });

  // Sync to localStorage whenever cart changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.warn("Error saving cart to localStorage:", error);
    }
  }, [cart]);

  // Add product to cart
  const addToCart = useCallback((product, quantity = 1) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);

      if (existingItem) {
        // Update quantity if item already exists
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + quantity }
            : item
        );
      }

      // Add new item to cart
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          formattedPrice: product.formattedPrice,
          image_url: product.image_url,
          qty: quantity,
        },
      ];
    });
  }, []);

  // Remove product from cart
  const removeFromCart = useCallback((productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  // Update product quantity (increment/decrement)
  const updateQuantity = useCallback((productId, delta) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === productId) {
          const newQty = Math.max(1, item.qty + delta);
          return { ...item, qty: newQty };
        }
        return item;
      })
    );
  }, []);

  // Set specific quantity
  const setQuantity = useCallback((productId, quantity) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === productId) {
          return { ...item, qty: Math.max(1, quantity) };
        }
        return item;
      })
    );
  }, []);

  // Clear entire cart
  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Check if product is in cart
  const isInCart = useCallback(
    (productId) => {
      return cart.some((item) => item.id === productId);
    },
    [cart]
  );

  // Calculate totals
  const totals = useMemo(() => {
    const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalSubtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const totalPrice = totalSubtotal;

    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });

    return {
      itemCount,
      totalPrice,
      formattedSubtotal: formatter.format(totalSubtotal),
      formattedTotal: formatter.format(totalPrice),
    };
  }, [cart]);

  // Generate WhatsApp checkout message
  const generateWhatsAppMessage = useCallback(() => {
    if (cart.length === 0) return null;

    let message =
      "Halo Niueza, saya ingin memesan:\n\n";

    cart.forEach((item, index) => {
      const itemTotal = item.price * item.qty;
      const formattedItemTotal = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(itemTotal);

      message += `${index + 1}. *${item.name}*\n`;
      message += `   Qty: ${item.qty}\n`;
      message += `   Subtotal: ${formattedItemTotal}\n\n`;
    });

    message += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `📦 Total Items: ${totals.itemCount}\n`;
    message += `💰 Total Pembayaran: ${totals.formattedTotal}\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `\nMohon konfirmasi ketersediaan stok. Terima kasih! 🙏`;

    return encodeURIComponent(message);
  }, [cart, totals]);

  // Generate WhatsApp checkout link
  const generateWhatsAppLink = useCallback(() => {
    const message = generateWhatsAppMessage();
    if (!message) return null;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  }, [generateWhatsAppMessage]);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    setQuantity,
    clearCart,
    isInCart,
    totals,
    generateWhatsAppLink,
    whatsappNumber: WHATSAPP_NUMBER,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

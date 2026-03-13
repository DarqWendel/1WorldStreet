import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

const STORAGE_KEY = '1worldstrt_cart';

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  // Adiciona item; se já existir com mesmo tamanho/cor, incrementa quantidade
  const addToCart = (productToAdd) => {
    setCart((prev) => {
      const idx = prev.findIndex(
        (item) => item.id === productToAdd.id &&
                  item.selectedSize  === productToAdd.selectedSize &&
                  item.selectedColor === productToAdd.selectedColor
      );
      if (idx !== -1) {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + productToAdd.quantity };
        return updated;
      }
      return [...prev, productToAdd];
    });
  };

  const updateQuantity = (id, size, color, qty) =>
    setCart((prev) => prev.map((item) =>
      item.id === id && item.selectedSize === size && item.selectedColor === color
        ? { ...item, quantity: Math.max(1, qty) }
        : item
    ));

  const removeFromCart = (id, size, color) =>
    setCart((prev) => prev.filter(
      (item) => !(item.id === id && item.selectedSize === size && item.selectedColor === color)
    ));

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

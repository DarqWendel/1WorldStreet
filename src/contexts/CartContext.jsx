
import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const localData = localStorage.getItem('1worldstrt_cart');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem('1worldstrt_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (productToAdd) => {
    setCart(prevCart => {
      const existingProductIndex = prevCart.findIndex(
        item => item.id === productToAdd.id && item.selectedSize === productToAdd.selectedSize && item.selectedColor === productToAdd.selectedColor
      );

      if (existingProductIndex !== -1) {
        // Produto com mesmas variações já existe, atualiza a quantidade
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += productToAdd.quantity;
        return updatedCart;
      } else {
        // Produto novo ou com variações diferentes
        return [...prevCart, productToAdd];
      }
    });
  };

  const updateQuantity = (productId, size, color, newQuantity) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId && item.selectedSize === size && item.selectedColor === color
          ? { ...item, quantity: Math.max(1, newQuantity) } // Garante que a quantidade não seja menor que 1
          : item
      )
    );
  };

  const removeFromCart = (productId, size, color) => {
    setCart(prevCart =>
      prevCart.filter(item => !(item.id === productId && item.selectedSize === size && item.selectedColor === color))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

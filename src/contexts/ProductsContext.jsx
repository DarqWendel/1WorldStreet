/**
 * ProductsContext — integrado com Supabase
 * - Produtos e estoque vêm do banco de dados
 * - Reservas garantem que dois clientes não comprem o mesmo item
 * - Fallback para dados locais se o banco estiver indisponível
 */
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { allProductsData } from '@/data/products';

const ProductsContext = createContext(null);

export const ProductsProvider = ({ children }) => {
  const [products,  setProducts ] = useState([]);
  const [loading,   setLoading  ] = useState(true);
  const [error,     setError    ] = useState(null);

  // ── Buscar produtos + estoque do Supabase ──────────────────
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const { data: prods, error: prodErr } = await supabase
        .from('products')
        .select('*, stock(size, quantity)')
        .eq('active', true)
        .order('created_at', { ascending: true });

      if (prodErr) throw prodErr;

      const formatted = prods.map(p => ({
        id:             p.id,
        name:           p.name,
        price:          String(p.price),
        description:    p.description,
        category:       p.category,
        images:         p.images || [],
        tags:           p.tags   || [],
        colors:         p.colors || [],
        availableSizes: (p.stock || []).filter(s => s.quantity > 0).map(s => s.size),
        stock:          Object.fromEntries((p.stock || []).map(s => [s.size, s.quantity])),
      }));

      setProducts(formatted);
      setError(null);
    } catch (err) {
      console.error('Supabase indisponível, usando dados locais:', err);
      setProducts(allProductsData.map(p => ({
        ...p,
        stock: Object.fromEntries((p.availableSizes || []).map(s => [s, 10])),
      })));
      setError('offline');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  // ── Verificar estoque disponível (descontando reservas ativas) ──
  const checkAvailableStock = async (productId, size) => {
    const { data, error } = await supabase
      .rpc('available_stock', { p_product_id: productId, p_size: size });
    if (error) return null;
    return data;
  };

  // ── Reservar itens do carrinho por 15 minutos ──────────────
  const reserveCartItems = async (cartItems) => {
    const unavailable = [];
    const reservationIds = [];

    for (const item of cartItems) {
      const available = await checkAvailableStock(item.id, item.selectedSize);
      if (available === null || available < item.quantity) {
        unavailable.push({
          name: item.name,
          size: item.selectedSize,
          requested: item.quantity,
          available: available ?? 0,
        });
      }
    }

    if (unavailable.length > 0) return { ok: false, unavailable };

    for (const item of cartItems) {
      const { data, error } = await supabase
        .from('reservations')
        .insert({ product_id: item.id, size: item.selectedSize, quantity: item.quantity })
        .select('id')
        .single();

      if (error) {
        if (reservationIds.length > 0) {
          await supabase.from('reservations').delete().in('id', reservationIds);
        }
        return { ok: false, unavailable: [{ name: item.name, size: item.selectedSize }] };
      }
      reservationIds.push(data.id);
    }

    return { ok: true, reservationIds };
  };

  // ── Confirmar reservas e baixar estoque ───────────────────
  const confirmReservations = async (reservationIds, orderId) => {
    if (!reservationIds?.length) return;

    await supabase
      .from('reservations')
      .update({ confirmed: true, order_id: orderId })
      .in('id', reservationIds);

    for (const id of reservationIds) {
      const { data: res } = await supabase
        .from('reservations')
        .select('product_id, size, quantity')
        .eq('id', id)
        .single();

      if (res) {
        const { data: s } = await supabase
          .from('stock')
          .select('quantity')
          .eq('product_id', res.product_id)
          .eq('size', res.size)
          .single();

        if (s) {
          await supabase.from('stock').update({
            quantity: Math.max(0, s.quantity - res.quantity)
          })
          .eq('product_id', res.product_id)
          .eq('size', res.size);
        }
      }
    }

    fetchProducts();
  };

  // ── Cancelar reservas ────────────────────────────────────
  const cancelReservations = async (reservationIds) => {
    if (!reservationIds?.length) return;
    await supabase.from('reservations').delete().in('id', reservationIds);
  };

  // ── Admin: adicionar produto ──────────────────────────────
  const addProduct = async (form) => {
    const { data, error } = await supabase
      .from('products')
      .insert({
        name:        form.name,
        price:       parseFloat(String(form.price).replace(',', '.')),
        description: form.description || '',
        category:    form.category    || 'Camisetas',
        images:      form.images      || [],
        tags:        form.tags        || [],
        colors:      form.colors      || [],
      })
      .select('id')
      .single();

    if (error) throw error;

    if (form.availableSizes?.length) {
      await supabase.from('stock').insert(
        form.availableSizes.map(size => ({
          product_id: data.id,
          size,
          quantity: parseInt(form.initialStock) || 0,
        }))
      );
    }

    await fetchProducts();
    return data.id;
  };

  // ── Admin: atualizar produto ──────────────────────────────
  const updateProduct = async (id, form) => {
    await supabase.from('products').update({
      name:        form.name,
      price:       parseFloat(String(form.price).replace(',', '.')),
      description: form.description || '',
      category:    form.category    || 'Camisetas',
      images:      form.images      || [],
      tags:        form.tags        || [],
      colors:      form.colors      || [],
    }).eq('id', id);
    await fetchProducts();
  };

  // ── Admin: atualizar estoque ──────────────────────────────
  const updateStock = async (productId, size, quantity) => {
    await supabase.from('stock')
      .upsert(
        { product_id: productId, size, quantity: Math.max(0, quantity) },
        { onConflict: 'product_id,size' }
      );
    await fetchProducts();
  };

  // ── Admin: remover produto (soft delete) ─────────────────
  const deleteProduct = async (id) => {
    await supabase.from('products').update({ active: false }).eq('id', id);
    await fetchProducts();
  };

  return (
    <ProductsContext.Provider value={{
      products, loading, error, fetchProducts,
      checkAvailableStock,
      reserveCartItems, confirmReservations, cancelReservations,
      addProduct, updateProduct, updateStock, deleteProduct,
    }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error('useProducts deve ser usado dentro de ProductsProvider');
  return ctx;
};

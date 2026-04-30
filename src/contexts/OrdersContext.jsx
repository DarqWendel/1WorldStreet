/**
 * OrdersContext — integrado com Supabase
 * Pedidos são salvos no banco de dados.
 * Fallback para localStorage se o banco estiver indisponível.
 */
import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export const OrdersContext = createContext();

const STORAGE_KEY = '1worldstrt_orders';

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  // Buscar pedidos do Supabase ao montar
  useEffect(() => {
    supabase.from('orders')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) {
          const mapped = data.map(o => ({
            id:       o.id,
            customer: { name: o.customer_name, email: o.customer_email, phone: o.customer_phone },
            address:  { address: o.address, city: o.city, state: o.state, zip: o.zip },
            items:    o.items,
            total:    o.total,
            status:   o.status,
            date:     o.created_at?.slice(0, 10),
            createdAt: o.created_at,
          }));
          setOrders(mapped);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(mapped));
        }
      });
  }, []);

  // Cria pedido no Supabase e retorna o ID
  const createOrder = async ({ customer, items, total, address }) => {
    const orderId = `1WRLD-${Date.now().toString().slice(-6)}`;

    const newOrder = {
      id:             orderId,
      customer_name:  customer.name,
      customer_email: customer.email,
      customer_phone: customer.phone,
      address:        address.address,
      city:           address.city,
      state:          address.state,
      zip:            address.zip,
      items,
      total,
      status: 'Aguardando',
    };

    const { error } = await supabase.from('orders').insert(newOrder);

    const frontendOrder = {
      id: orderId,
      customer, address, items, total,
      status: 'Aguardando',
      date: new Date().toISOString().slice(0, 10),
      createdAt: new Date().toISOString(),
    };

    if (error) {
      // Fallback local se o banco falhar
      console.error('Erro ao salvar pedido no Supabase, salvando local:', error);
    }

    setOrders(prev => {
      const updated = [frontendOrder, ...prev];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });

    return orderId;
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    await supabase.from('orders').update({ status: newStatus }).eq('id', orderId);
    setOrders(prev => {
      const updated = prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <OrdersContext.Provider value={{ orders, createOrder, updateOrderStatus }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => useContext(OrdersContext);

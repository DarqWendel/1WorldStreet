/**
 * ============================================================
 * STORE CONFIG CONTEXT — Configurações da Loja
 * ============================================================
 * Gerencia configurações de PIX, WhatsApp e conteúdo do site.
 * Editável pelo administrador sem necessidade de código.
 * ============================================================
 */

import React, { createContext, useState, useContext, useEffect } from 'react';

export const StoreConfigContext = createContext();

const STORAGE_KEY = '1worldstrt_config';

const DEFAULT_CONFIG = {
  // Configurações PIX
  pixKey: 'contato@1worldstrt.com',
  pixKeyType: 'email',       // email | cpf | telefone | aleatoria
  pixReceiverName: '1worldstrt',
  pixQrCodeUrl: '',          // URL da imagem do QR Code (opcional)

  // Configurações WhatsApp
  whatsappNumber: '5585999999999',  // Formato: 55 + DDD + número (sem espaços/hifens)
  whatsappMessage: `Olá! Gostaria de confirmar meu pedido:

🧾 *Pedido:* {orderId}

📦 *Produtos:*
{items}

💰 *Total:* R$ {total}

💳 *Pagamento:* PIX

Obrigado! 🙏`,

  // Conteúdo do site (editável pelo admin)
  heroTitle: '1W$TrEET',
  heroSubtitle: 'Moda urbana da favela para o mundo.',
  heroCta: 'Ver Coleção',

  // Configurações de frete
  freeShipping: true,
  shippingPrice: 0,
};

export const StoreConfigProvider = ({ children }) => {
  const [config, setConfig] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return saved ? { ...DEFAULT_CONFIG, ...saved } : DEFAULT_CONFIG;
    } catch { return DEFAULT_CONFIG; }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }, [config]);

  const updateConfig = (updates) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  // Gera mensagem do WhatsApp com variáveis substituídas
  const buildWhatsappMessage = ({ orderId, items, total }) => {
    const itemsText = items
      .map(i => `• ${i.name} (${i.selectedSize || ''} ${i.selectedColor || ''}) x${i.quantity} — R$ ${(parseFloat(i.price) * i.quantity).toFixed(2).replace('.', ',')}`)
      .join('\n');

    return config.whatsappMessage
      .replace('{orderId}', orderId)
      .replace('{items}', itemsText)
      .replace('{total}', parseFloat(total).toFixed(2).replace('.', ','));
  };

  // Abre WhatsApp com mensagem pré-formatada
  const openWhatsapp = ({ orderId, items, total }) => {
    const message = buildWhatsappMessage({ orderId, items, total });
    const encoded = encodeURIComponent(message);
    const number = config.whatsappNumber.replace(/\D/g, '');
    window.open(`https://wa.me/${number}?text=${encoded}`, '_blank');
  };

  return (
    <StoreConfigContext.Provider value={{ config, updateConfig, buildWhatsappMessage, openWhatsapp }}>
      {children}
    </StoreConfigContext.Provider>
  );
};

export const useStoreConfig = () => useContext(StoreConfigContext);

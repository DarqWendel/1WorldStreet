import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { CheckCircle, Package, MessageCircle } from 'lucide-react';
import { useStoreConfig } from '@/contexts/StoreConfigContext';
import { useOrders } from '@/contexts/OrdersContext';

const OrderConfirmationPage = () => {
  const [searchParams] = useSearchParams();
  const { openWhatsapp } = useStoreConfig();
  const { orders } = useOrders();

  const orderId = searchParams.get('orderId');
  const total   = searchParams.get('total');

  // Busca os itens do pedido para o botão WhatsApp
  const order = orders.find(o => o.id === orderId);

  if (!orderId) return (
    <div className="container mx-auto section-padding text-center container-padding">
      <h1 className="text-2xl font-bold mb-4">Pedido não encontrado</h1>
      <Button asChild><Link to="/">Voltar para Home</Link></Button>
    </div>
  );

  const handleWhatsapp = () => {
    if (order) {
      openWhatsapp({ orderId, items: order.items, total });
    }
  };

  return (
    <div className="container mx-auto section-padding container-padding flex items-center justify-center min-h-[70vh]">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
        className="bg-card border border-border/50 rounded-xl p-8 sm:p-10 text-center max-w-lg w-full shadow-2xl">
        <CheckCircle className="w-20 h-20 mx-auto text-green-500 mb-6" />
        <h1 className="text-3xl sm:text-4xl font-black text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>
          Pedido Confirmado!
        </h1>
        <p className="text-muted-foreground mb-6">Obrigado pela sua compra na 1worldstrt!</p>
        <div className="bg-input/40 border border-border/40 rounded-lg p-5 mb-6 text-left space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Pedido:</span>
            <span className="font-semibold text-primary font-mono">{orderId}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total:</span>
            <span className="font-bold text-accent font-mono">R$ {parseFloat(total).toFixed(2).replace('.', ',')}</span>
          </div>
          <div className="flex justify-between text-sm items-center pt-2 border-t border-border/30">
            <span className="text-muted-foreground">Status:</span>
            <span className="flex items-center gap-1.5 text-yellow-400 font-semibold text-xs">
              <Package className="h-3.5 w-3.5" /> Aguardando Confirmação PIX
            </span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          Após confirmarmos o pagamento PIX, seu pedido será separado e enviado.
          Você pode nos contatar pelo WhatsApp para agilizar.
        </p>

        <div className="flex flex-col gap-3">
          {order && (
            <Button onClick={handleWhatsapp}
              className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold">
              <MessageCircle className="h-5 w-5 mr-2" /> Confirmar pelo WhatsApp
            </Button>
          )}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
              <Link to="/products">Continuar Comprando</Link>
            </Button>
            <Button asChild variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
              <Link to="/">Ir para Home</Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderConfirmationPage;

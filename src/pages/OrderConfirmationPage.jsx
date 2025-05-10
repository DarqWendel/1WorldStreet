
import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { CheckCircle, Package, ShoppingBag } from 'lucide-react';

const OrderConfirmationPage = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const total = searchParams.get('total');

  // Fallback if params are missing
  if (!orderId || !total) {
    return (
      <div className="container mx-auto section-padding text-center container-padding">
          <ShoppingBag className="w-20 h-20 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Informações do Pedido Indisponíveis</h1>
          <p className="text-muted-foreground mb-6">Não foi possível carregar os detalhes do seu pedido.</p>
          <Button asChild>
            <Link to="/">Voltar para Home</Link>
          </Button>
      </div>
    );
  }


  return (
    <div className="container mx-auto section-padding flex items-center justify-center container-padding">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-card p-8 sm:p-10 rounded-xl shadow-2xl text-center max-w-lg w-full"
      >
        <CheckCircle className="w-20 h-20 sm:w-24 sm:h-24 mx-auto text-green-500 mb-6" />
        <h1 className="text-3xl sm:text-4xl font-bold text-card-foreground mb-3">Pedido Confirmado!</h1>
        <p className="text-lg text-muted-foreground mb-6">Obrigado pela sua compra na 1worldstrt!</p>

        <div className="bg-input p-6 rounded-lg mb-8 text-left space-y-3">
          <div className="flex justify-between">
            <span className="font-medium text-muted-foreground">Número do Pedido:</span>
            <span className="font-semibold text-primary">{orderId}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-muted-foreground">Valor Total:</span>
            <span className="font-semibold text-primary">R$ {parseFloat(total).toFixed(2).replace('.', ',')}</span>
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-border">
            <span className="font-medium text-muted-foreground">Status:</span>
            <span className="font-semibold text-green-500 flex items-center">
              <Package className="w-4 h-4 mr-1.5" /> Em Processamento
            </span>
          </div>
        </div>

        <p className="text-muted-foreground mb-8 text-sm">
          Você receberá um e-mail com os detalhes do seu pedido e informações de rastreamento em breve.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link to="/products">Continuar Comprando</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
            <Link to="/">Ir para Home</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderConfirmationPage;

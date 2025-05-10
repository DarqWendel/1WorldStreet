
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingCart, XCircle } from 'lucide-react';
import { CartContext } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/use-toast';

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useContext(CartContext);
  const { toast } = useToast();

  const totalAmount = cart.reduce((sum, item) => {
    const price = parseFloat(item.price);
    return sum + (price * item.quantity);
  }, 0);

  const handleRemoveFromCart = (productId, size, color) => {
    const itemToRemove = cart.find(item => item.id === productId && item.selectedSize === size && item.selectedColor === color);
    if (itemToRemove) {
        removeFromCart(productId, size, color);
        toast({
          title: `${itemToRemove.name} removido`,
          description: "O item foi removido do seu carrinho.",
          variant: "destructive"
        });
    }
  };
  
  const handleClearCart = () => {
    if (cart.length > 0) {
        clearCart();
        toast({
          title: "Carrinho limpo",
          description: "Todos os itens foram removidos do seu carrinho.",
          variant: "destructive"
        });
    }
  };

  if (cart.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto section-padding text-center container-padding min-h-[60vh] flex flex-col justify-center items-center"
      >
        <ShoppingCart className="w-24 h-24 mx-auto text-muted-foreground mb-6" />
        <h1 className="text-3xl font-bold mb-4 text-foreground">Seu carrinho está vazio</h1>
        <p className="text-muted-foreground mb-8">Parece que você ainda não adicionou nada. Que tal explorar nossos produtos?</p>
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link to="/products">Ver Produtos</Link>
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="container mx-auto section-padding container-padding">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold mb-8 text-primary text-center"
      >
        Seu Carrinho de Compras
      </motion.h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:w-2/3 bg-card p-6 rounded-lg shadow-xl"
        >
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-border">
            <h2 className="text-xl font-semibold text-card-foreground">Produtos no Carrinho ({cart.reduce((acc, item) => acc + item.quantity, 0)})</h2>
            {cart.length > 0 && (
              <Button variant="outline" size="sm" onClick={handleClearCart} className="text-destructive border-destructive hover:bg-destructive/10">
                <XCircle className="w-4 h-4 mr-2" /> Limpar Carrinho
              </Button>
            )}
          </div>
          
          {cart.map((item, index) => (
            <motion.div
              key={`${item.id}-${item.selectedSize || 'defaultSize'}-${item.selectedColor || 'defaultColor'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex flex-col sm:flex-row items-center gap-4 py-4 border-b border-border last:border-b-0"
            >
              <Link to={`/product/${item.id}`} className="flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-md overflow-hidden border border-border">
                <img src={item.images[0]} alt={item.alt || item.name} className="w-full h-full object-cover" />
              </Link>
              <div className="flex-grow text-center sm:text-left">
                <Link to={`/product/${item.id}`}>
                  <h3 className="text-lg font-semibold text-card-foreground hover:text-primary transition-colors">{item.name}</h3>
                </Link>
                <p className="text-sm text-muted-foreground">
                  {item.selectedSize && `Tamanho: ${item.selectedSize}`}
                  {item.selectedSize && item.selectedColor && ", "}
                  {item.selectedColor && `Cor: ${item.selectedColor}`}
                </p>
                <p className="text-md text-primary font-semibold mt-1 sm:mt-0">R$ {parseFloat(item.price).toFixed(2).replace('.', ',')}</p>
              </div>
              <div className="flex items-center space-x-2 my-2 sm:my-0">
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, Math.max(1, item.quantity - 1))}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-3 py-1 w-10 text-center bg-input rounded-md">{item.quantity}</span>
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-lg font-semibold text-primary w-24 text-center sm:text-right">
                R$ {(parseFloat(item.price) * item.quantity).toFixed(2).replace('.', ',')}
              </p>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => handleRemoveFromCart(item.id, item.selectedSize, item.selectedColor)}>
                <Trash2 className="h-5 w-5" />
              </Button>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:w-1/3 bg-card p-6 rounded-lg shadow-xl h-fit"
        >
          <h2 className="text-xl font-semibold mb-6 text-card-foreground pb-4 border-b border-border">Resumo do Pedido</h2>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-card-foreground">
              <span>Subtotal:</span>
              <span>R$ {totalAmount.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex justify-between text-card-foreground">
              <span>Frete:</span>
              <span>Grátis</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-primary pt-2 border-t border-border">
              <span>Total:</span>
              <span>R$ {totalAmount.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>
          <div className="mb-6">
            <Label htmlFor="coupon" className="block text-sm font-medium text-card-foreground mb-1">Cupom de Desconto:</Label>
            <div className="flex gap-2">
              <Input type="text" id="coupon" placeholder="Insira seu cupom" className="bg-input"/>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">Aplicar</Button>
            </div>
          </div>
          <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg">
            <Link to="/checkout">Finalizar Compra</Link>
          </Button>
          <Button asChild variant="link" className="w-full mt-3 text-primary hover:text-primary/80">
            <Link to="/products">Continuar Comprando</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default CartPage;

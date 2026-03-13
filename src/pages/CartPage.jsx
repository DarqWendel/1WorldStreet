import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button }      from '@/components/ui/button';
import { Input }       from '@/components/ui/input';
import { Label }       from '@/components/ui/label';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingCart, X } from 'lucide-react';
import { CartContext } from '@/contexts/CartContext';
import { useToast }   from '@/components/ui/use-toast';

const fmt = v => Number(v).toFixed(2).replace('.', ',');

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useContext(CartContext);
  const { toast } = useToast();
  const total = cart.reduce((s, i) => s + parseFloat(i.price) * i.quantity, 0);

  const handleRemove = (id, size, color, name) => {
    removeFromCart(id, size, color);
    toast({ title: `"${name}" removido`, variant: 'destructive', duration: 2500 });
  };

  if (cart.length === 0) return (
    <div className="container mx-auto section-padding container-padding min-h-[60vh] flex flex-col items-center justify-center text-center">
      <ShoppingCart className="w-16 h-16 text-muted-foreground/40 mb-4" />
      <h1 className="text-3xl font-black text-foreground mb-2" style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>Seu carrinho está vazio</h1>
      <p className="text-muted-foreground mb-8">Você ainda não adicionou nenhum produto.</p>
      <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
        <Link to="/products">Explorar Produtos</Link>
      </Button>
    </div>
  );

  return (
    <div className="container mx-auto section-padding container-padding">
      <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="text-4xl md:text-5xl font-black text-foreground mb-10" style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>
        Carrinho de Compras
      </motion.h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Lista de itens */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/40">
            <p className="text-sm text-muted-foreground">
              <span className="text-foreground font-semibold">{cart.reduce((a, i) => a + i.quantity, 0)}</span> item(s)
            </p>
            <button onClick={() => { clearCart(); toast({ title: 'Carrinho esvaziado', variant: 'destructive', duration: 2500 }); }}
              className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1 transition-colors">
              <X className="w-3 h-3" /> Limpar tudo
            </button>
          </div>

          <AnimatePresence>
            {cart.map(item => (
              <motion.div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }}
                className="flex gap-4 py-5 border-b border-border/30 last:border-0">
                <Link to={`/product/${item.id}`} className="flex-shrink-0">
                  <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-md overflow-hidden bg-muted border border-border/30">
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                </Link>
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <Link to={`/product/${item.id}`}>
                      <h3 className="font-semibold text-foreground hover:text-primary transition-colors leading-tight">{item.name}</h3>
                    </Link>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.selectedSize && `Tam: ${item.selectedSize}`}
                      {item.selectedSize && item.selectedColor && ' · '}
                      {item.selectedColor && `Cor: ${item.selectedColor}`}
                    </p>
                  </div>
                  <div className="flex items-center justify-between flex-wrap gap-2 mt-2">
                    <div className="flex items-center border border-border/50 rounded overflow-hidden">
                      <button onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, Math.max(1, item.quantity - 1))}
                        className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors">
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 h-8 flex items-center justify-center text-sm font-semibold bg-input/30">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors">
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="font-bold text-accent" style={{ fontFamily: "'Space Mono',monospace", fontSize: '0.82rem' }}>
                        R$ {fmt(parseFloat(item.price) * item.quantity)}
                      </p>
                      <button onClick={() => handleRemove(item.id, item.selectedSize, item.selectedColor, item.name)}
                        className="text-muted-foreground hover:text-destructive transition-colors" aria-label="Remover">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Resumo */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="w-full lg:w-80 flex-shrink-0">
          <div className="bg-card border border-border/50 rounded-lg p-6 sticky top-24">
            <h2 className="font-semibold text-foreground mb-5 pb-3 border-b border-border/40">Resumo do Pedido</h2>
            <div className="space-y-2 mb-5">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>R$ {fmt(total)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Frete</span>
                <span className="text-primary font-medium">Grátis</span>
              </div>
            </div>
            {/* TODO (backend): validar cupom via API */}
            <div className="mb-5 pb-5 border-b border-border/40">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">Cupom de Desconto</Label>
              <div className="flex gap-2">
                <Input placeholder="Seu cupom..." className="bg-input/60 h-9 text-sm flex-1" />
                <Button variant="outline" size="sm" className="border-primary/30 text-primary hover:bg-primary/10 text-xs">Aplicar</Button>
              </div>
            </div>
            <div className="flex justify-between items-center mb-6">
              <span className="font-semibold text-foreground">Total</span>
              <span className="text-xl font-bold text-accent" style={{ fontFamily: "'Space Mono',monospace" }}>R$ {fmt(total)}</span>
            </div>
            <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold tracking-wider">
              <Link to="/checkout">Finalizar Compra</Link>
            </Button>
            <Button asChild variant="link" className="w-full mt-2 text-muted-foreground hover:text-foreground text-sm">
              <Link to="/products">Continuar Comprando</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CartPage;

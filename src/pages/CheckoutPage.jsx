
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { CreditCard, Lock, User, Mail, Phone, MapPin, ShoppingBag } from 'lucide-react';
import { CartContext } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/use-toast';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const CheckoutPage = () => {
  const { cart, clearCart } = useContext(CartContext);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '',
    address: '', city: '', state: '', zip: '',
    cardNumber: '', expiryDate: '', cvv: '', paymentMethod: 'creditCard'
  });

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePaymentMethodChange = (value) => {
    setFormData(prev => ({ ...prev, paymentMethod: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simular processamento de pedido
    console.log("Pedido enviado:", formData, cart);
    const orderId = `1WRLD-${Date.now().toString().slice(-6)}`;
    
    toast({
      title: "Pedido Confirmado!",
      description: `Seu pedido ${orderId} foi realizado com sucesso.`,
      duration: 5000,
    });
    clearCart();
    navigate(`/order-confirmation?orderId=${orderId}&total=${totalAmount.toFixed(2)}`);
  };

  if (cart.length === 0 && totalAmount === 0) { // Check if cart was cleared just before navigating here
    return (
      <div className="container mx-auto section-padding text-center container-padding">
        <ShoppingBag className="w-20 h-20 mx-auto text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold mb-2">Seu carrinho está vazio.</h1>
        <p className="text-muted-foreground mb-6">Não há itens para finalizar a compra.</p>
        <Button asChild>
          <Link to="/products">Voltar aos Produtos</Link>
        </Button>
      </div>
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
        Finalizar Compra
      </motion.h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Customer & Shipping Info */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-2 bg-card p-6 sm:p-8 rounded-lg shadow-xl space-y-6"
        >
          <div>
            <h2 className="text-xl font-semibold mb-4 text-card-foreground flex items-center"><User className="w-5 h-5 mr-2 text-primary" />Informações Pessoais</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><Label htmlFor="name">Nome Completo</Label><Input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} className="bg-input" /></div>
              <div><Label htmlFor="email">E-mail</Label><Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className="bg-input" /></div>
              <div><Label htmlFor="phone">Telefone</Label><Input id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange} className="bg-input" /></div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4 text-card-foreground flex items-center"><MapPin className="w-5 h-5 mr-2 text-primary" />Endereço de Entrega</h2>
            <div className="space-y-4">
              <div><Label htmlFor="address">Endereço</Label><Input id="address" name="address" type="text" required value={formData.address} onChange={handleChange} className="bg-input" /></div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div><Label htmlFor="city">Cidade</Label><Input id="city" name="city" type="text" required value={formData.city} onChange={handleChange} className="bg-input" /></div>
                <div><Label htmlFor="state">Estado</Label><Input id="state" name="state" type="text" required value={formData.state} onChange={handleChange} className="bg-input" /></div>
                <div><Label htmlFor="zip">CEP</Label><Input id="zip" name="zip" type="text" required value={formData.zip} onChange={handleChange} className="bg-input" /></div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4 text-card-foreground flex items-center"><CreditCard className="w-5 h-5 mr-2 text-primary" />Informações de Pagamento</h2>
            <RadioGroup defaultValue="creditCard" name="paymentMethod" onValueChange={handlePaymentMethodChange} className="mb-4">
              <div className="flex items-center space-x-2"><RadioGroupItem value="creditCard" id="r1" /><Label htmlFor="r1">Cartão de Crédito</Label></div>
              <div className="flex items-center space-x-2"><RadioGroupItem value="pix" id="r2" /><Label htmlFor="r2">PIX</Label></div>
              <div className="flex items-center space-x-2"><RadioGroupItem value="boleto" id="r3" /><Label htmlFor="r3">Boleto Bancário</Label></div>
            </RadioGroup>

            {formData.paymentMethod === 'creditCard' && (
              <div className="space-y-4">
                <div><Label htmlFor="cardNumber">Número do Cartão</Label><Input id="cardNumber" name="cardNumber" type="text" required value={formData.cardNumber} onChange={handleChange} className="bg-input" placeholder="XXXX XXXX XXXX XXXX"/></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label htmlFor="expiryDate">Validade (MM/AA)</Label><Input id="expiryDate" name="expiryDate" type="text" required value={formData.expiryDate} onChange={handleChange} className="bg-input" placeholder="MM/AA"/></div>
                  <div><Label htmlFor="cvv">CVV</Label><Input id="cvv" name="cvv" type="text" required value={formData.cvv} onChange={handleChange} className="bg-input" placeholder="XXX"/></div>
                </div>
              </div>
            )}
            {formData.paymentMethod === 'pix' && (
              <div className="bg-input p-4 rounded-md text-center">
                <p className="font-semibold text-card-foreground">Pagamento com PIX</p>
                <p className="text-sm text-muted-foreground mt-2">Um QR Code será gerado após a confirmação do pedido.</p>
                <img  alt="Exemplo de QR Code para pagamento PIX" className="w-32 h-32 mx-auto my-4" src="https://images.unsplash.com/photo-1595079676339-1534801ad6cf" />
              </div>
            )}
             {formData.paymentMethod === 'boleto' && (
              <div className="bg-input p-4 rounded-md text-center">
                <p className="font-semibold text-card-foreground">Pagamento com Boleto</p>
                <p className="text-sm text-muted-foreground mt-2">O boleto será gerado e enviado para o seu e-mail após a confirmação do pedido.</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Order Summary */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-1 bg-card p-6 sm:p-8 rounded-lg shadow-xl h-fit"
        >
          <h2 className="text-xl font-semibold mb-6 text-card-foreground pb-4 border-b border-border flex items-center"><ShoppingBag className="w-5 h-5 mr-2 text-primary" />Resumo do Pedido</h2>
          <div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-2">
            {cart.map(item => (
              <div key={item.id + (item.selectedSize || '') + (item.selectedColor || '')} className="flex justify-between items-start text-sm">
                <div className="flex-grow">
                  <span className="font-medium text-card-foreground">{item.name}</span>
                  <span className="text-muted-foreground"> (x{item.quantity})</span>
                  <p className="text-xs text-muted-foreground">
                    {item.selectedSize && `T: ${item.selectedSize}`}
                    {item.selectedSize && item.selectedColor && ", "}
                    {item.selectedColor && `C: ${item.selectedColor}`}
                </p>
                </div>
                <span className="text-card-foreground">R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
              </div>
            ))}
          </div>
          <div className="space-y-2 pt-4 border-t border-border">
            <div className="flex justify-between text-card-foreground font-medium">
              <span>Subtotal:</span>
              <span>R$ {totalAmount.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex justify-between text-card-foreground font-medium">
              <span>Frete:</span>
              <span>Grátis</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-primary pt-2 border-t border-border mt-2">
              <span>Total:</span>
              <span>R$ {totalAmount.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>
          <Button type="submit" size="lg" className="w-full mt-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg">
            <Lock className="w-5 h-5 mr-2" /> Confirmar Pedido
          </Button>
        </motion.div>
      </form>
    </div>
  );
};

export default CheckoutPage;

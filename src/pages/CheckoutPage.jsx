import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button }        from '@/components/ui/button';
import { Input }         from '@/components/ui/input';
import { Label }         from '@/components/ui/label';
import { motion }        from 'framer-motion';
import { Lock, MapPin, User, Mail, Phone, ShoppingBag, Copy, Check, QrCode, MessageCircle, AlertTriangle, Clock } from 'lucide-react';
import { CartContext }   from '@/contexts/CartContext';
import { useAuth }       from '@/contexts/AuthContext';
import { useOrders }     from '@/contexts/OrdersContext';
import { useProducts }   from '@/contexts/ProductsContext';
import { useStoreConfig } from '@/contexts/StoreConfigContext';
import { useToast }      from '@/components/ui/use-toast';

const fmt = v => Number(v).toFixed(2).replace('.', ',');
const RESERVATION_MINUTES = 15;

const CheckoutPage = () => {
  const { cart, clearCart }         = useContext(CartContext);
  const { currentUser }             = useAuth();
  const { createOrder }             = useOrders();
  const { reserveCartItems, confirmReservations, cancelReservations } = useProducts();
  const { config, openWhatsapp }    = useStoreConfig();
  const { toast }                   = useToast();
  const navigate                    = useNavigate();

  const [step,           setStep          ] = useState(1); // 1=dados, 2=pix
  const [copied,         setCopied        ] = useState(false);
  const [orderId,        setOrderId       ] = useState(null);
  const [reservationIds, setReservationIds] = useState([]);
  const [reserving,      setReserving     ] = useState(false);
  const [stockError,     setStockError    ] = useState(null); // itens indisponíveis
  const [timeLeft,       setTimeLeft      ] = useState(RESERVATION_MINUTES * 60);

  const timerRef    = useRef(null);
  const canceledRef = useRef(false);

  const [formData, setFormData] = useState({
    name:    currentUser?.name  || '',
    email:   currentUser?.email || '',
    phone:   '',
    address: '',
    city:    '',
    state:   '',
    zip:     '',
  });

  const total = cart.reduce((s, i) => s + parseFloat(i.price) * i.quantity, 0);

  // ── Countdown de 15 min na tela do PIX ────────────────────
  useEffect(() => {
    if (step !== 2) return;
    setTimeLeft(RESERVATION_MINUTES * 60);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          if (!canceledRef.current) {
            canceledRef.current = true;
            cancelReservations(reservationIds);
            toast({
              title: 'Tempo esgotado!',
              description: 'Sua reserva expirou. Os itens foram liberados.',
              variant: 'destructive',
            });
            navigate('/cart');
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [step]);

  const fmtTime = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  // ── STEP 1 → STEP 2: verificar e reservar estoque ─────────
  const handleDataSubmit = async (e) => {
    e.preventDefault();
    setReserving(true);
    setStockError(null);

    try {
      const result = await reserveCartItems(cart);

      if (!result.ok) {
        setStockError(result.unavailable);
        setReserving(false);
        return;
      }

      // Estoque reservado com sucesso — criar pedido
      const newOrderId = await createOrder({
        customer: { name: formData.name, email: formData.email, phone: formData.phone },
        address:  { address: formData.address, city: formData.city, state: formData.state, zip: formData.zip },
        items: cart,
        total,
      });

      setReservationIds(result.reservationIds);
      setOrderId(newOrderId);
      setStep(2);
      canceledRef.current = false;
      window.scrollTo(0, 0);
    } catch (err) {
      toast({ title: 'Erro ao processar pedido.', description: 'Tente novamente.', variant: 'destructive' });
    } finally {
      setReserving(false);
    }
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText(config.pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
    toast({ title: 'Chave PIX copiada!' });
  };

  const handleSendWhatsapp = () => openWhatsapp({ orderId, items: cart, total });

  // ── Confirmar pagamento: baixa estoque definitivamente ────
  const handleConfirmPayment = async () => {
    clearInterval(timerRef.current);
    canceledRef.current = true;
    await confirmReservations(reservationIds, orderId);
    clearCart();
    navigate(`/order-confirmation?orderId=${orderId}&total=${total.toFixed(2)}`);
  };

  // ── Voltar: cancelar reservas ────────────────────────────
  const handleBack = async () => {
    clearInterval(timerRef.current);
    canceledRef.current = true;
    await cancelReservations(reservationIds);
    setReservationIds([]);
    setStep(1);
  };

  if (cart.length === 0) return (
    <div className="container mx-auto section-padding container-padding text-center min-h-[60vh] flex flex-col items-center justify-center">
      <ShoppingBag className="w-16 h-16 text-muted-foreground/40 mb-4" />
      <h1 className="text-2xl font-bold mb-2">Carrinho vazio</h1>
      <Button asChild className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">
        <Link to="/products">Ver Produtos</Link>
      </Button>
    </div>
  );

  return (
    <div className="container mx-auto section-padding container-padding">
      <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="text-4xl md:text-5xl font-black text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>
        Finalizar Compra
      </motion.h1>

      {/* Indicador de steps */}
      <div className="flex items-center gap-3 mb-10">
        {[{ n: 1, label: 'Seus dados' }, { n: 2, label: 'Pagamento PIX' }].map((s, i) => (
          <React.Fragment key={s.n}>
            <div className={`flex items-center gap-2 text-sm font-semibold ${step >= s.n ? 'text-accent' : 'text-muted-foreground'}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 ${step >= s.n ? 'bg-accent text-accent-foreground border-accent' : 'border-border/50 text-muted-foreground'}`}>
                {s.n}
              </div>
              {s.label}
            </div>
            {i === 0 && <div className="flex-1 h-px bg-border/40 max-w-[60px]" />}
          </React.Fragment>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0">

          {/* STEP 1 — Dados */}
          {step === 1 && (
            <motion.form onSubmit={handleDataSubmit} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}
              className="bg-card border border-border/50 rounded-lg p-6 space-y-6">

              {/* Aviso de estoque indisponível */}
              {stockError && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <p className="text-sm font-semibold text-red-400">Itens indisponíveis no estoque</p>
                  </div>
                  {stockError.map((item, i) => (
                    <p key={i} className="text-xs text-red-300/80 ml-6">
                      {item.name} — Tamanho {item.size}
                      {item.available === 0 ? ' (esgotado)' : ` (apenas ${item.available} disponível)`}
                    </p>
                  ))}
                  <p className="text-xs text-muted-foreground mt-2 ml-6">
                    Volte ao carrinho e ajuste as quantidades.
                  </p>
                </div>
              )}

              <div>
                <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2 text-lg">
                  <User className="h-5 w-5 text-primary" /> Informações Pessoais
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">Nome completo</Label>
                    <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="bg-input/60" />
                  </div>
                  <div>
                    <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">E-mail</Label>
                    <Input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="bg-input/60" />
                  </div>
                  <div>
                    <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">Telefone / WhatsApp</Label>
                    <Input required type="tel" placeholder="(85) 99999-9999" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="bg-input/60" />
                  </div>
                </div>
              </div>

              <div className="border-t border-border/40 pt-5">
                <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2 text-lg">
                  <MapPin className="h-5 w-5 text-primary" /> Endereço de Entrega
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">Endereço e número</Label>
                    <Input required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="bg-input/60" />
                  </div>
                  <div>
                    <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">Cidade</Label>
                    <Input required value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="bg-input/60" />
                  </div>
                  <div>
                    <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">Estado</Label>
                    <Input required maxLength={2} placeholder="CE" value={formData.state} onChange={e => setFormData({...formData, state: e.target.value.toUpperCase()})} className="bg-input/60" />
                  </div>
                  <div>
                    <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">CEP</Label>
                    <Input required placeholder="00000-000" value={formData.zip} onChange={e => setFormData({...formData, zip: e.target.value})} className="bg-input/60" />
                  </div>
                </div>
              </div>

              <Button type="submit" size="lg" disabled={reserving}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold tracking-wider">
                {reserving ? 'Verificando estoque...' : 'Continuar para Pagamento →'}
              </Button>
            </motion.form>
          )}

          {/* STEP 2 — PIX */}
          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}
              className="bg-card border border-border/50 rounded-lg p-6">

              <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2 text-lg">
                <QrCode className="h-5 w-5 text-primary" /> Pagamento via PIX
              </h2>

              {/* Cronômetro de reserva */}
              <div className={`flex items-center justify-between rounded-lg px-4 py-3 mb-5 border ${
                timeLeft < 120 ? 'bg-red-500/10 border-red-500/30' : 'bg-yellow-500/10 border-yellow-500/30'
              }`}>
                <div className="flex items-center gap-2">
                  <Clock className={`h-4 w-4 ${timeLeft < 120 ? 'text-red-400' : 'text-yellow-400'}`} />
                  <span className="text-xs text-muted-foreground">Itens reservados por</span>
                </div>
                <span className={`font-mono font-bold text-lg ${timeLeft < 120 ? 'text-red-400' : 'text-yellow-400'}`}>
                  {fmtTime(timeLeft)}
                </span>
              </div>

              {orderId && (
                <div className="bg-primary/10 border border-primary/30 rounded-lg px-4 py-3 mb-5 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Seu pedido</span>
                  <span className="font-mono font-bold text-primary text-sm">{orderId}</span>
                </div>
              )}

              <div className="space-y-3 mb-6">
                {[
                  'Abra o app do seu banco',
                  'Escolha a opção PIX',
                  'Cole a chave PIX abaixo ou escaneie o QR Code',
                  'Confirme o pagamento e clique em "Já paguei"',
                ].map((txt, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-accent/20 text-accent text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                    <p className="text-sm text-foreground/80">{txt}</p>
                  </div>
                ))}
              </div>

              <div className="bg-muted/30 border border-border/50 rounded-lg p-5 mb-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                  Chave PIX ({config.pixKeyType})
                </p>
                <div className="flex items-center gap-3">
                  <p className="font-mono text-accent font-semibold flex-1 text-sm break-all">{config.pixKey}</p>
                  <Button size="sm" variant="outline" onClick={handleCopyPix}
                    className={`flex-shrink-0 border-primary/30 transition-colors ${copied ? 'border-green-500/50 text-green-400' : 'text-primary hover:bg-primary/10'}`}>
                    {copied ? <><Check className="h-3.5 w-3.5 mr-1" /> Copiado!</> : <><Copy className="h-3.5 w-3.5 mr-1" /> Copiar</>}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-3">Titular: <span className="text-foreground font-medium">{config.pixReceiverName}</span></p>
                <p className="text-xs text-muted-foreground">Valor: <span className="text-accent font-bold font-mono">R$ {fmt(total)}</span></p>
              </div>

              {config.pixQrCodeUrl ? (
                <div className="w-44 h-44 mx-auto mb-6 border-2 border-border/40 rounded-lg overflow-hidden">
                  <img src={config.pixQrCodeUrl} alt="QR Code PIX" className="w-full h-full object-contain bg-white p-2" />
                </div>
              ) : (
                <div className="w-44 h-44 mx-auto mb-6 border-2 border-border/40 rounded-lg flex items-center justify-center bg-white">
                  <div className="text-center">
                    <QrCode className="h-20 w-20 text-gray-800 mx-auto" />
                    <p className="text-[10px] text-gray-500 mt-1">QR Code</p>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <Button onClick={handleSendWhatsapp} size="lg" variant="outline"
                  className="w-full border-green-500/50 text-green-400 hover:bg-green-500/10 font-semibold tracking-wider">
                  <MessageCircle className="h-5 w-5 mr-2" /> Enviar pedido via WhatsApp
                </Button>
                <Button onClick={handleConfirmPayment} size="lg"
                  className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold tracking-wider">
                  <Check className="h-5 w-5 mr-2" /> Já Paguei — Confirmar Pedido
                </Button>
                <Button variant="ghost" onClick={handleBack} className="w-full text-muted-foreground hover:text-foreground text-sm">
                  ← Voltar e editar dados
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center mt-4">
                Após a confirmação do pagamento, você receberá a confirmação do pedido.
              </p>
            </motion.div>
          )}
        </div>

        {/* Resumo */}
        <div className="w-full lg:w-80 flex-shrink-0">
          <div className="bg-card border border-border/50 rounded-lg p-6 sticky top-24">
            <h2 className="font-semibold text-foreground mb-4 pb-3 border-b border-border/40">Resumo</h2>
            <div className="space-y-3 mb-4 max-h-60 overflow-y-auto pr-1">
              {cart.map(item => (
                <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-3 text-sm">
                  <div className="w-12 h-12 rounded overflow-hidden bg-muted flex-shrink-0 border border-border/20">
                    {item.images?.[0] && <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-xs leading-tight">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.selectedSize && `${item.selectedSize}`}
                      {item.selectedSize && item.selectedColor && ' · '}
                      {item.selectedColor} · x{item.quantity}
                    </p>
                    <p className="text-accent text-xs font-bold" style={{ fontFamily: "'Space Mono',monospace" }}>
                      R$ {fmt(parseFloat(item.price) * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-border/40 pt-4 space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Subtotal</span><span>R$ {fmt(total)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Frete</span><span className="text-primary font-medium">Grátis</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-accent pt-1 border-t border-border/40" style={{ fontFamily: "'Space Mono',monospace" }}>
                <span className="font-sans text-base">Total</span>
                <span>R$ {fmt(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

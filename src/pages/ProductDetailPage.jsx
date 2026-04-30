import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button }      from '@/components/ui/button';
import { Label }       from '@/components/ui/label';
import { motion }      from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus, Minus, ShoppingCart, ArrowLeft, Package } from 'lucide-react';
import { useToast }    from '@/components/ui/use-toast';
import { CartContext } from '@/contexts/CartContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useProducts } from '@/contexts/ProductsContext';
import ProductCard     from '@/components/products/ProductCard';

const ProductDetailPage = () => {
  const { id }        = useParams();
  const navigate      = useNavigate();
  const { toast }     = useToast();
  const { addToCart } = useContext(CartContext);


  const { products } = useProducts();
  const product = products.find(p => p.id.toString() === id);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity,          setQuantity         ] = useState(1);
  const [selectedSize,      setSelectedSize     ] = useState('');
  const [selectedColor,     setSelectedColor    ] = useState('');

  useEffect(() => {
    if (product) {
      setSelectedSize(product.availableSizes?.[0] || '');
      setSelectedColor(product.colors?.[0] || '');
    }
    setCurrentImageIndex(0);
    setQuantity(1);
  }, [product]);

  if (!product) return (
    <div className="container mx-auto section-padding text-center container-padding min-h-[60vh] flex flex-col items-center justify-center">
      <Package className="w-16 h-16 text-muted-foreground mb-4" />
      <h2 className="text-2xl font-bold text-foreground mb-2">Produto não encontrado</h2>
      <p className="text-muted-foreground mb-6">Este produto não existe ou foi removido.</p>
      <Button onClick={() => navigate('/products')}><ArrowLeft className="mr-2 h-4 w-4" /> Voltar</Button>
    </div>
  );

  const nextImage = () => setCurrentImageIndex(i => (i + 1) % product.images.length);
  const prevImage = () => setCurrentImageIndex(i => (i - 1 + product.images.length) % product.images.length);

  const handleAddToCart = () => {
    if (product.availableSizes?.length > 0 && !selectedSize)  { toast({ title: 'Selecione o tamanho', variant: 'destructive' }); return; }
    if (product.colors?.length > 0 && !selectedColor)         { toast({ title: 'Selecione a cor',     variant: 'destructive' }); return; }
    addToCart({ ...product, quantity, selectedSize, selectedColor });
    toast({ title: '✓ Adicionado ao carrinho', description: `${product.name}${selectedSize ? ` · ${selectedSize}` : ''}` });
  };

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <div className="container mx-auto section-padding container-padding">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-8 text-muted-foreground hover:text-foreground -ml-2">
        <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">

        {/* Galeria */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <div className="relative aspect-square overflow-hidden rounded-lg bg-card border border-border/40 mb-3">
            <img key={`${product.id}-${currentImageIndex}`} src={product.images[currentImageIndex]} alt={product.alt} className="w-full h-full object-contain" />
            {product.images.length > 1 && (
              <>
                <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 flex items-center justify-center hover:border-primary/50 transition-all" aria-label="Anterior">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 flex items-center justify-center hover:border-primary/50 transition-all" aria-label="Próxima">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {product.images.map((src, i) => (
                <button key={i} onClick={() => setCurrentImageIndex(i)}
                  className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${i === currentImageIndex ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Info */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="flex flex-col gap-6">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground">{product.category}</span>
            {product.drop && <span className="badge-tag">{product.drop}</span>}
          </div>

          <h1 className="text-3xl lg:text-4xl font-black text-foreground leading-tight" style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>{product.name}</h1>

          <p className="text-3xl font-bold text-accent" style={{ fontFamily: "'Space Mono',monospace" }}>
            R$ {parseFloat(product.price).toFixed(2).replace('.', ',')}
          </p>

          <p className="text-muted-foreground leading-relaxed text-sm border-t border-border/40 pt-5">{product.description}</p>

          <div className="flex flex-col gap-4 pt-1">
            {product.availableSizes?.length > 0 && (
              <div>
                <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Tamanho</Label>
                <div className="flex flex-wrap gap-2">
                  {product.availableSizes.map(size => (
                    <button key={size} onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded border text-sm font-semibold tracking-wider transition-all ${selectedSize === size ? 'bg-primary/20 border-primary text-primary' : 'border-border/50 text-muted-foreground hover:border-primary/40 hover:text-foreground'}`}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {product.colors?.length > 0 && (
              <div>
                <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Cor</Label>
                <Select value={selectedColor} onValueChange={setSelectedColor}>
                  <SelectTrigger className="w-48 bg-input/60"><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>{product.colors.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <div className="flex items-center border border-border/50 rounded-md overflow-hidden">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-9 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors" aria-label="Diminuir">
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-10 h-10 flex items-center justify-center text-sm font-semibold bg-input/40">{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)} className="w-9 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors" aria-label="Aumentar">
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
            <Button size="lg" onClick={handleAddToCart} className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold tracking-wider">
              <ShoppingCart className="mr-2 h-4 w-4" /> Adicionar ao Carrinho
            </Button>
          </div>
        </motion.div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-20 pt-12 border-t border-border/40">
          <h2 className="text-3xl font-black text-foreground mb-8" style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>Você Também Pode Gostar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {relatedProducts.map((p, i) => <ProductCard key={p.id} product={p} index={i} viewMode="grid" />)}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;

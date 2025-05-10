
import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus, Minus, ShoppingCart, ArrowLeft } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { CartContext } from '@/contexts/CartContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { allProductsData } from '@/data/products'; 

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = allProductsData.find(p => p.id.toString() === id);
  const { toast } = useToast();
  const { addToCart } = useContext(CartContext);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    if (product) {
      setSelectedSize(product.availableSizes?.[0] || '');
      setSelectedColor(product.colors?.[0] || '');
    }
    // Reset image index and quantity when product changes
    setCurrentImageIndex(0);
    setQuantity(1);
  }, [product]);

  if (!product) {
    return (
      <div className="container mx-auto section-padding text-center flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-3xl font-bold text-destructive mb-4">Produto Não Encontrado</h2>
        <p className="text-muted-foreground mb-8">O produto que você está procurando não existe ou foi removido.</p>
        <Button onClick={() => navigate('/products')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar aos Produtos
        </Button>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length);
  };

  const handleAddToCart = () => {
    if (product.availableSizes && product.availableSizes.length > 0 && !selectedSize) {
        toast({
            title: "Selecione o tamanho",
            description: "Por favor, escolha um tamanho para adicionar ao carrinho.",
            variant: "destructive",
        });
        return;
    }
    if (product.colors && product.colors.length > 0 && !selectedColor) {
        toast({
            title: "Selecione a cor",
            description: "Por favor, escolha uma cor para adicionar ao carrinho.",
            variant: "destructive",
        });
        return;
    }

    addToCart({ ...product, quantity, selectedSize, selectedColor });
    toast({
      title: `${product.name} adicionado ao carrinho!`,
      description: `Quantidade: ${quantity}${selectedSize ? `, Tamanho: ${selectedSize}` : ''}${selectedColor ? `, Cor: ${selectedColor}` : ''}`,
      variant: "default",
    });
  };
  
  const relatedProducts = allProductsData.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="container mx-auto section-padding container-padding">
      <Button variant="outline" onClick={() => navigate(-1)} className="mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
      </Button>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start"
      >
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-card p-4 rounded-lg shadow-xl"
        >
          <div className="relative aspect-square overflow-hidden rounded-md">
            <img  
              key={`${product.id}-${currentImageIndex}`} 
              src={product.images[currentImageIndex]}
              alt={`${product.alt} - Visualização ${currentImageIndex + 1}`} 
              className="w-full h-full object-contain transition-opacity duration-300"
            />
            {product.images.length > 1 && (
              <>
                <Button variant="ghost" size="icon" onClick={prevImage} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-background/50 hover:bg-background/80 text-foreground">
                  <ChevronLeft />
                </Button>
                <Button variant="ghost" size="icon" onClick={nextImage} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-background/50 hover:bg-background/80 text-foreground">
                  <ChevronRight />
                </Button>
              </>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex space-x-2 mt-4 overflow-x-auto pb-2">
              {product.images.map((imgSrc, index) => (
                <div key={index}
                  className={`w-20 h-20 rounded-md overflow-hidden cursor-pointer border-2 ${index === currentImageIndex ? 'border-primary' : 'border-transparent hover:border-muted'}`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img src={imgSrc} alt={`Miniatura ${index+1} de ${product.name}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col"
        >
          <Link to={`/products?category=${product.category.toLowerCase()}`} className="text-sm text-primary hover:underline mb-2">{product.category}</Link>
          <h1 className="text-3xl lg:text-4xl font-bold mb-3 text-foreground">{product.name}</h1>
          <div className="flex items-baseline mb-4">
            <p className="text-3xl text-primary font-bold mr-3">R$ {parseFloat(product.price).toFixed(2).replace('.', ',')}</p>
            {product.originalPrice && (
              <p className="text-xl text-muted-foreground line-through">R$ {parseFloat(product.originalPrice).toFixed(2).replace('.', ',')}</p>
            )}
          </div>
          <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {product.availableSizes && product.availableSizes.length > 0 && (
              <div>
                <Label htmlFor="size-select" className="block text-sm font-medium text-foreground mb-1">Tamanho:</Label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger id="size-select" className="w-full bg-input">
                    <SelectValue placeholder="Selecione o tamanho" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.availableSizes.map(size => (
                      <SelectItem key={size} value={size}>{size}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            {product.colors && product.colors.length > 0 && (
              <div>
                <Label htmlFor="color-select" className="block text-sm font-medium text-foreground mb-1">Cor:</Label>
                <Select value={selectedColor} onValueChange={setSelectedColor}>
                  <SelectTrigger id="color-select" className="w-full bg-input">
                    <SelectValue placeholder="Selecione a cor" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.colors.map(color => (
                      <SelectItem key={color} value={color}>{color}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          
          <div className="flex items-center mb-6">
            <Label className="block text-sm font-medium text-foreground mr-4">Quantidade:</Label>
            <div className="flex items-center border border-input rounded">
              <Button variant="ghost" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="rounded-r-none">
                <Minus className="h-4 w-4" />
              </Button>
              <span className="px-4 py-2 text-center w-12 bg-input">{quantity}</span>
              <Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)} className="rounded-l-none">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Button size="lg" onClick={handleAddToCart} className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg py-3 px-8">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Adicionar ao Carrinho
          </Button>
        </motion.div>
      </motion.div>

      {relatedProducts.length > 0 && (
        <div className="mt-16 pt-12 border-t border-border">
          <h2 className="text-2xl font-bold mb-6 text-center text-primary">Você também pode gostar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map(relatedProd => (
              <motion.div 
                key={relatedProd.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="bg-card rounded-lg shadow-lg overflow-hidden group"
              >
                <Link to={`/product/${relatedProd.id}`} className="block">
                  <div className="w-full h-56 overflow-hidden">
                    <img src={relatedProd.images[0]} alt={relatedProd.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-md font-semibold mb-1 text-card-foreground truncate">{relatedProd.name}</h3>
                    <p className="text-sm text-primary font-bold">R$ {parseFloat(relatedProd.price).toFixed(2).replace('.', ',')}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;

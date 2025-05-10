
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const ProductCard = ({ product, index, viewMode }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      key={product.id}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.4, delay: index * 0.05 }}
      layout 
      className={`bg-card rounded-lg shadow-xl overflow-hidden group flex ${viewMode === 'grid' ? 'flex-col' : 'flex-row items-center'}`}
    >
      <Link to={`/product/${product.id}`} className={`block ${viewMode === 'grid' ? 'w-full h-80 md:h-96' : 'w-1/3 h-40 md:h-48 flex-shrink-0'}`}>
        <div className="w-full h-full overflow-hidden">
          <img src={product.images[0]} alt={product.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out" />
        </div>
      </Link>
      <div className={`p-4 flex flex-col flex-grow ${viewMode === 'grid' ? 'text-left' : 'ml-4 w-2/3'}`}>
        <Link to={`/product/${product.id}`} className="block">
          <h3 className={`font-semibold mb-1 text-card-foreground hover:text-primary transition-colors truncate ${viewMode === 'grid' ? 'text-lg' : 'text-xl'}`} title={product.name}>{product.name}</h3>
        </Link>
        <p className={`text-xs text-muted-foreground mb-2 ${viewMode === 'list' ? 'hidden sm:block' : ''}`}>{product.category}{product.drop ? ` - ${product.drop}` : ''}</p>
        <p className={`text-primary font-bold ${viewMode === 'grid' ? 'text-md mt-auto mb-3' : 'text-lg mb-3'}`}>R$ {product.price}</p>
        {viewMode === 'list' && (
            <p className="text-sm text-muted-foreground mb-3 hidden md:block max-lines-2">
                {product.description.substring(0,100)}...
            </p>
        )}
        <Button asChild variant="outline" className={`w-full border-primary text-primary hover:bg-primary/10 ${viewMode === 'grid' ? 'mt-auto' : 'mt-2 md:mt-auto md:w-1/2'}`}>
          <Link to={`/product/${product.id}`}>Ver Detalhes</Link>
        </Button>
      </div>
    </motion.div>
  );
};

export default ProductCard;

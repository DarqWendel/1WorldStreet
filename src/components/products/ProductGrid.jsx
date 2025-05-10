
import React from 'react';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { LayoutGrid, List } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductGrid = ({ products, viewMode, onViewModeChange }) => {
  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="w-full md:w-3/4 lg:w-4/5"
    >
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-muted-foreground">{products.length} produto(s) encontrado(s)</p>
        <div className="flex items-center gap-2">
          <Button variant={viewMode === 'grid' ? 'secondary' : 'ghost'} size="icon" onClick={() => onViewModeChange('grid')}>
            <LayoutGrid className="h-5 w-5" />
          </Button>
          <Button variant={viewMode === 'list' ? 'secondary' : 'ghost'} size="icon" onClick={() => onViewModeChange('list')}>
            <List className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">Nenhum produto encontrado com os filtros selecionados.</p>
          <p className="text-sm text-muted-foreground mt-2">Tente ajustar seus filtros ou limpar a busca.</p>
        </div>
      ) : (
        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3' : 'grid-cols-1'}`}>
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} viewMode={viewMode} />
          ))}
        </div>
      )}
      {products.length > 0 && (
        <div className="mt-12 flex justify-center">
          <Button variant="outline" className="mr-2" disabled>Anterior</Button>
          <Button variant="outline" disabled>Próxima</Button>
        </div>
      )}
    </motion.main>
  );
};

export default ProductGrid;

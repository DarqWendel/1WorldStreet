import React from 'react';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { LayoutGrid, List, PackageSearch } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductGrid = ({ products, viewMode, onViewModeChange }) => (
  <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="flex-1 min-w-0">

    <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/40">
      <p className="text-sm text-muted-foreground">
        <span className="text-foreground font-semibold">{products.length}</span> produto{products.length !== 1 ? 's' : ''} encontrado{products.length !== 1 ? 's' : ''}
      </p>
      <div className="flex items-center gap-1 border border-border/50 rounded-md p-1">
        <Button variant={viewMode==='grid'?'secondary':'ghost'} size="sm" onClick={() => onViewModeChange('grid')} className="h-7 w-7 p-0" aria-label="Grade">
          <LayoutGrid className="h-3.5 w-3.5" />
        </Button>
        <Button variant={viewMode==='list'?'secondary':'ghost'} size="sm" onClick={() => onViewModeChange('list')} className="h-7 w-7 p-0" aria-label="Lista">
          <List className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>

    {products.length === 0 && (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20">
        <PackageSearch className="w-14 h-14 mx-auto text-muted-foreground/40 mb-4" />
        <h3 className="text-xl font-semibold text-muted-foreground mb-2">Nenhum produto encontrado</h3>
        <p className="text-sm text-muted-foreground/60">Tente ajustar os filtros.</p>
      </motion.div>
    )}

    {products.length > 0 && (
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5' : 'flex flex-col gap-4'}>
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} viewMode={viewMode} />
        ))}
      </div>
    )}

    {products.length > 0 && (
      <div className="mt-12 flex justify-center gap-2">
        <Button variant="outline" size="sm" disabled className="text-xs">← Anterior</Button>
        <Button variant="outline" size="sm" disabled className="text-xs px-4 bg-primary/10 border-primary/30 text-primary">1</Button>
        <Button variant="outline" size="sm" disabled className="text-xs">Próxima →</Button>
      </div>
    )}
  </motion.main>
);

export default ProductGrid;

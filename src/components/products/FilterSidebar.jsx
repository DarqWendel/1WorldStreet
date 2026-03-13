import React from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { allProductsData } from '@/data/products';

const AVAILABLE_SIZES = ['P', 'M', 'G', 'GG', 'ÚNICO'];

const FilterSidebar = ({ searchTerm, onSearchTermChange, selectedCategory, onSelectedCategoryChange, selectedSizes, onSizeChange }) => {
  const categories = ['Todas', ...new Set(allProductsData.map(p => p.category))];
  const hasFilters = searchTerm || selectedCategory !== 'Todas' || selectedSizes.length > 0;

  const clearAll = () => {
    onSearchTermChange('');
    onSelectedCategoryChange('Todas');
    selectedSizes.forEach(s => onSizeChange(s));
  };

  return (
    <motion.aside initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className="w-full md:w-64 lg:w-72 flex-shrink-0">
      <div className="bg-card border border-border/50 rounded-lg p-5 sticky top-24">

        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2 text-foreground">
            <SlidersHorizontal className="w-4 h-4 text-primary" />
            <span className="font-semibold text-sm uppercase tracking-wider">Filtros</span>
          </div>
          {hasFilters && (
            <button onClick={clearAll} className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1 transition-colors">
              <X className="w-3 h-3" /> Limpar
            </button>
          )}
        </div>

        <div className="mb-5">
          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">Buscar</Label>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input type="text" placeholder="Nome ou tag..." value={searchTerm} onChange={e => onSearchTermChange(e.target.value)} className="pl-8 bg-input/60 h-9 text-sm" />
          </div>
        </div>

        <div className="border-t border-border/40 my-4" />

        <div className="mb-5">
          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">Categoria</Label>
          <Select value={selectedCategory} onValueChange={onSelectedCategoryChange}>
            <SelectTrigger className="bg-input/60 h-9 text-sm"><SelectValue placeholder="Todas" /></SelectTrigger>
            <SelectContent>
              {categories.map(c => <SelectItem key={c} value={c} className="text-sm">{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="border-t border-border/40 my-4" />

        <div>
          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 block">Tamanho</Label>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_SIZES.map(size => (
              <button key={size} onClick={() => onSizeChange(size)}
                className={`px-3 py-1.5 rounded text-xs font-semibold tracking-wider border transition-all duration-200 ${
                  selectedSizes.includes(size)
                    ? 'bg-primary/20 border-primary text-primary'
                    : 'bg-muted/40 border-border/50 text-muted-foreground hover:border-primary/50 hover:text-foreground'
                }`}>
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-border/40 my-4" />
        <div>
          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">Preço</Label>
          <div className="h-9 bg-muted/20 border border-border/30 rounded flex items-center justify-center">
            <span className="text-xs text-muted-foreground/60">Em breve</span>
          </div>
        </div>

      </div>
    </motion.aside>
  );
};

export default FilterSidebar;

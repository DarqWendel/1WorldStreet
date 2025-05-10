
import React from 'react';
import { motion } from 'framer-motion';
import { Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { allProductsData } from '@/data/products';

const FilterSidebar = ({ 
  searchTerm, 
  onSearchTermChange, 
  selectedCategory, 
  onSelectedCategoryChange, 
  selectedSizes, 
  onSizeChange 
}) => {
  const categories = ['Todas', ...new Set(allProductsData.map(p => p.category))];
  const sizes = ['P', 'M', 'G', 'GG', 'ÚNICO'];

  return (
    <motion.aside 
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full md:w-1/4 lg:w-1/5 bg-card p-6 rounded-lg shadow-lg h-fit sticky top-24"
    >
      <h3 className="text-xl font-semibold mb-6 text-card-foreground flex items-center">
        <Filter className="w-5 h-5 mr-2 text-primary" />
        Filtros
      </h3>
      
      <div className="mb-6">
        <Label htmlFor="search-product" className="text-sm font-medium text-card-foreground mb-2 block">Buscar Produto</Label>
        <div className="relative">
          <Input 
            type="text" 
            id="search-product" 
            placeholder="Nome ou tag..." 
            className="pl-8 bg-input"
            value={searchTerm}
            onChange={(e) => onSearchTermChange(e.target.value)}
          />
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      <div className="mb-6">
        <Label className="text-sm font-medium text-card-foreground mb-2 block">Categoria</Label>
        <Select value={selectedCategory} onValueChange={onSelectedCategoryChange}>
          <SelectTrigger className="w-full bg-input">
            <SelectValue placeholder="Selecionar categoria" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mb-6">
        <Label className="text-sm font-medium text-card-foreground mb-2 block">Tamanho</Label>
        <div className="grid grid-cols-2 gap-2">
          {sizes.map(size => (
            <div key={size} className="flex items-center space-x-2">
              <Checkbox 
                id={`size-${size}`} 
                checked={selectedSizes.includes(size)}
                onCheckedChange={() => onSizeChange(size)}
              />
              <Label htmlFor={`size-${size}`} className="text-sm font-normal text-card-foreground cursor-pointer">{size}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium text-card-foreground mb-2 block">Faixa de Preço</Label>
          <div className="h-10 bg-input rounded flex items-center justify-center text-muted-foreground text-sm">
            Controle de Preço (Em breve)
          </div>
      </div>
    </motion.aside>
  );
};

export default FilterSidebar;

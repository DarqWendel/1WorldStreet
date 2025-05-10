
import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import FilterSidebar from '@/components/products/FilterSidebar';
import ProductGrid from '@/components/products/ProductGrid';
import { allProductsData } from '@/data/products';

const ProductsPage = () => {
  const location = useLocation();
  
  const [filteredProducts, setFilteredProducts] = useState(allProductsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [viewMode, setViewMode] = useState('grid');

  const uniqueCategories = ['Todas', ...new Set(allProductsData.map(p => p.category))];

  const applyFilters = useCallback(() => {
    let tempProducts = allProductsData;

    if (searchTerm) {
      tempProducts = tempProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
      );
    }

    if (selectedCategory !== 'Todas') {
      tempProducts = tempProducts.filter(product => product.category === selectedCategory);
    }
    
    if (selectedSizes.length > 0) {
      tempProducts = tempProducts.filter(product => 
        product.availableSizes && product.availableSizes.some(size => selectedSizes.includes(size))
      );
    }
    setFilteredProducts(tempProducts);
  }, [searchTerm, selectedCategory, selectedSizes]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryFromUrl = params.get('category');
    const filterFromUrl = params.get('filter');

    if (categoryFromUrl) {
      const formattedCategory = categoryFromUrl.charAt(0).toUpperCase() + categoryFromUrl.slice(1);
      if (uniqueCategories.includes(formattedCategory)) {
        setSelectedCategory(formattedCategory);
      } else {
        setSelectedCategory('Todas');
      }
    } else if (filterFromUrl === 'novidades') {
      setSelectedCategory('Todas'); // Placeholder: implement specific logic for 'novidades' if needed
    } else {
      setSelectedCategory('Todas');
    }
  }, [location.search, uniqueCategories]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleSizeChange = (size) => {
    setSelectedSizes(prevSelectedSizes => 
      prevSelectedSizes.includes(size) 
        ? prevSelectedSizes.filter(s => s !== size) 
        : [...prevSelectedSizes, size]
    );
  };

  return (
    <div className="container mx-auto section-padding container-padding">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary">Nossa Coleção</h1>
        <p className="text-lg text-muted-foreground mt-2">Explore o estilo que define as ruas.</p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-8">
        <FilterSidebar
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onSelectedCategoryChange={setSelectedCategory}
          selectedSizes={selectedSizes}
          onSizeChange={handleSizeChange}
        />
        <ProductGrid 
          products={filteredProducts}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
      </div>
    </div>
  );
};

export default ProductsPage;

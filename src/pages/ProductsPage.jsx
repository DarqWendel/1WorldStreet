import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import FilterSidebar from '@/components/products/FilterSidebar';
import ProductGrid from '@/components/products/ProductGrid';

const ProductsPage = () => {

  const location = useLocation();

  const [productsFromApi, setProductsFromApi] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [viewMode, setViewMode] = useState('grid');

  // Buscar produtos da API
  useEffect(() => {
  fetch("http://localhost:8080/products")
    .then(res => res.json())
    .then(data => {

      const formattedProducts = data.map(p => ({
        id: p.id,
        name: p.name,
        price: p.price,
        description: p.description,

        image: "/images/placeholder.png",
        category: "Roupas",
        colors: ["preto"],
        availableSizes: ["M"]
      }));

      setProductsFromApi(formattedProducts);
      setFilteredProducts(formattedProducts);
    });

}, []);
  // Ler parâmetros da URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q');
    const cat = params.get('category');

    if (q) setSearchTerm(q);
    if (cat) setSelectedCategory(cat.charAt(0).toUpperCase() + cat.slice(1));
  }, [location.search]);

  // Aplicar filtros
  const applyFilters = useCallback(() => {

    let result = productsFromApi;

    if (searchTerm) {
      const q = searchTerm.toLowerCase();

      result = result.filter(p =>
        p.name?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== 'Todas') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (selectedSizes.length > 0) {
      result = result.filter(
        p => p.availableSizes &&
        p.availableSizes.some(s => selectedSizes.includes(s))
      );
    }

    setFilteredProducts(result);

  }, [productsFromApi, searchTerm, selectedCategory, selectedSizes]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleSizeChange = (size) =>
    setSelectedSizes(prev =>
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );

  return (
    <div className="container mx-auto section-padding container-padding">

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >

        <h1
          className="text-4xl md:text-5xl font-extrabold text-primary"
          style={{ fontFamily: "'Barlow Condensed',sans-serif" }}
        >
          {searchTerm ? 'Resultados da busca' : 'Nossa Colecao'}
        </h1>

        <p className="text-lg text-muted-foreground mt-2">
          {searchTerm
            ? `${filteredProducts.length} produto(s) encontrado(s) para "${searchTerm}"`
            : 'Explore o estilo que define as ruas.'}
        </p>

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
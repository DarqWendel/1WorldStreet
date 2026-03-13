import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const ProductCard = ({ product, index, viewMode }) => {

  const variants = {
    hidden:  { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0  },
  };

  if (viewMode === 'grid') {
    return (
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.4, delay: index * 0.06 }}
        layout
      >
        <Link
          to={`/product/${product.id}`}
          className="group block bg-card rounded-lg overflow-hidden border border-border/40 hover:border-primary/30 transition-all duration-300 card-hover"
        >

          <div className="relative aspect-[3/4] overflow-hidden bg-muted flex items-center justify-center">

            <img
              src={product.images[0]}
              alt={product.alt}
              className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
            />

            {product.drop && (
              <div className="absolute top-3 left-3">
                <span className="badge-tag text-[10px]">
                  {product.drop}
                </span>
              </div>
            )}

          </div>

          <div className="p-4">

            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              {product.category}
            </p>

            <h3 className="text-sm font-semibold text-foreground mb-2 line-clamp-2">
              {product.name}
            </h3>

            <div className="flex items-center justify-between">

              <span className="text-sm font-bold text-primary">
                R$ {product.price}
              </span>

              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />

            </div>

          </div>

        </Link>
      </motion.div>
    );
  }

  return null;
};

export default ProductCard;
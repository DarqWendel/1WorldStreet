
import React, { useState, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { CartContext } from '@/contexts/CartContext';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cart } = useContext(CartContext);

  const logoUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/4bc2c226-6f2b-4714-b7d1-aa973e368ed3/a0ea57dfc92fd6cd589368884c22e741.png";

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Produtos' },
    { href: '/drops', label: 'Drops' },
    { href: '/about', label: 'Sobre' },
    { href: '/contact', label: 'Contato' },
  ];

  const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  return (
    <nav className="bg-background/80 backdrop-blur-md sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex items-center justify-between py-3 container-padding">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logoUrl} alt="1worldstrt Logo" className="h-10 md:h-12" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? 'text-primary' : 'text-foreground'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Icons and Search */}
        <div className="flex items-center space-x-2 md:space-x-3">
          <Button variant="ghost" size="icon" onClick={toggleSearch} className="text-foreground hover:text-primary">
            <Search className="h-5 w-5" />
          </Button>
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon" className="text-foreground hover:text-primary">
              <ShoppingCart className="h-5 w-5" />
              {totalItemsInCart > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {totalItemsInCart}
                </span>
              )}
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="ghost" size="icon" className="text-foreground hover:text-primary">
              <User className="h-5 w-5" />
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu} className="text-foreground hover:text-primary">
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="container mx-auto pb-3 container-padding"
          >
            <div className="relative">
              <Input type="search" placeholder="Buscar produtos..." className="w-full pl-10 bg-input text-foreground placeholder:text-muted-foreground" />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-background/95 backdrop-blur-sm absolute w-full shadow-lg left-0"
            style={{ top: 'calc(100% - 1px)' }} 
          >
            <div className="flex flex-col space-y-1 px-4 pt-2 pb-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium transition-colors hover:bg-secondary hover:text-primary ${
                      isActive ? 'bg-secondary text-primary' : 'text-foreground'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

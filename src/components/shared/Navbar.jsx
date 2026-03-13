import React, { useState, useContext, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, LogOut, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { CartContext } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Produtos' },
  { href: '/drops', label: 'Drops' },
  { href: '/about', label: 'Sobre' },
  { href: '/contact', label: 'Contato' },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const { cart } = useContext(CartContext);
  const { isLoggedIn, isAdmin, currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const totalItems = cart.reduce((t, i) => t + i.quantity, 0);

  useEffect(() => {
    const fn = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const fn = (e) => { if (!e.target.closest('#user-menu-wrapper')) setShowUserMenu(false); };
    document.addEventListener('click', fn);
    return () => document.removeEventListener('click', fn);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleLogout = () => { logout(); setShowUserMenu(false); navigate('/'); };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/95 backdrop-blur-md shadow-[0_1px_0_rgba(255,255,255,0.06)]' : 'bg-background/80 backdrop-blur-sm'}`}>
      <div className="container mx-auto container-padding">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2">
            <img src="/images/brand/logo.webp" alt="1worldstrt" className="h-9 md:h-11 w-auto" />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(l => (
              <NavLink key={l.href} to={l.href} end={l.href==='/'} className={({ isActive }) =>
                `text-xs font-semibold tracking-widest uppercase transition-colors duration-200 ${isActive ? 'text-accent' : 'text-foreground/70 hover:text-foreground'}`}>
                {l.label}
              </NavLink>
            ))}
            {isAdmin && (
              <NavLink to="/admin" className="text-xs font-semibold tracking-widest uppercase text-primary hover:text-accent flex items-center gap-1 transition-colors">
                <Shield className="h-3 w-3" /> Admin
              </NavLink>
            )}
          </div>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(!isSearchOpen)} className="text-foreground/70 hover:text-accent">
              <Search className="h-4 w-4" />
            </Button>

            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative text-foreground/70 hover:text-accent">
                <ShoppingCart className="h-4 w-4" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-accent text-accent-foreground text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {isLoggedIn ? (
              <div className="relative" id="user-menu-wrapper">
                <Button variant="ghost" size="icon" onClick={() => setShowUserMenu(!showUserMenu)}
                  className={`text-foreground/70 hover:text-accent ${isAdmin ? 'ring-1 ring-primary/50 rounded-full' : ''}`}>
                  <User className="h-4 w-4" />
                </Button>
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:8}} transition={{duration:0.15}}
                      className="absolute right-0 mt-2 w-52 bg-card border border-border/50 rounded-lg shadow-xl overflow-hidden z-50">
                      <div className="px-4 py-3 border-b border-border/40">
                        <p className="text-sm font-semibold text-foreground truncate">{currentUser?.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{currentUser?.email}</p>
                        {isAdmin && <span className="inline-flex items-center gap-1 text-[10px] text-primary font-bold mt-1"><Shield className="h-2.5 w-2.5" /> Administrador</span>}
                      </div>
                      {isAdmin && (
                        <Link to="/admin" onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-muted/50 transition-colors">
                          <Shield className="h-4 w-4 text-primary" /> Painel Admin
                        </Link>
                      )}
                      <button onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors">
                        <LogOut className="h-4 w-4" /> Sair
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/login"><Button variant="ghost" size="icon" className="text-foreground/70 hover:text-accent"><User className="h-4 w-4" /></Button></Link>
            )}

            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-foreground/70 hover:text-accent ml-1">
              <AnimatePresence mode="wait" initial={false}>
                {isMobileMenuOpen
                  ? <motion.div key="x" initial={{rotate:-90,opacity:0}} animate={{rotate:0,opacity:1}} exit={{opacity:0}} transition={{duration:0.15}}><X className="h-5 w-5" /></motion.div>
                  : <motion.div key="m" initial={{rotate:90,opacity:0}} animate={{rotate:0,opacity:1}} exit={{opacity:0}} transition={{duration:0.15}}><Menu className="h-5 w-5" /></motion.div>}
              </AnimatePresence>
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:0.2}} className="overflow-hidden border-t border-border/40">
            <div className="container mx-auto container-padding py-3">
              <form onSubmit={handleSearch} className="relative max-w-lg mx-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input autoFocus type="search" placeholder="Buscar: dragão, vermelha, world, fé em deus..."
                  value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  className="pl-9 pr-24 bg-input/60 border-border/60" />
                <Button type="submit" size="sm" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 bg-primary hover:bg-primary/90 text-primary-foreground text-xs px-3">
                  Buscar
                </Button>
              </form>
              <div className="flex gap-2 mt-2 max-w-lg mx-auto flex-wrap">
                {['Camisetas','Croppeds','Dragão','World','Fé em Deus','Vermelho','Branco'].map(tag => (
                  <button key={tag} onClick={() => { navigate(`/products?q=${tag}`); setIsSearchOpen(false); setSearchQuery(''); }}
                    className="text-xs px-2 py-1 rounded bg-muted/40 border border-border/40 text-muted-foreground hover:text-accent hover:border-accent/50 transition-colors">
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:0.25}} className="overflow-hidden md:hidden border-t border-border/40 bg-card/95 backdrop-blur-md">
            <div className="container mx-auto container-padding py-4 flex flex-col gap-1">
              {navLinks.map((l, i) => (
                <motion.div key={l.href} initial={{x:-16,opacity:0}} animate={{x:0,opacity:1}} transition={{delay:i*0.05,duration:0.2}}>
                  <NavLink to={l.href} end={l.href==='/'} onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) => `block px-4 py-3 rounded-md text-sm font-semibold tracking-wider uppercase transition-colors ${isActive ? 'bg-accent/10 text-accent' : 'text-foreground/70 hover:text-foreground hover:bg-muted/50'}`}>
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
              {isAdmin && <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 px-4 py-3 rounded-md text-sm font-semibold text-primary hover:bg-primary/10 transition-colors"><Shield className="h-4 w-4" /> Admin</Link>}
              {isLoggedIn
                ? <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-3 rounded-md text-sm font-semibold text-destructive hover:bg-destructive/10 transition-colors"><LogOut className="h-4 w-4" /> Sair</button>
                : <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 px-4 py-3 rounded-md text-sm font-semibold text-foreground/70 hover:text-foreground hover:bg-muted/50 transition-colors"><User className="h-4 w-4" /> Entrar / Cadastrar</Link>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
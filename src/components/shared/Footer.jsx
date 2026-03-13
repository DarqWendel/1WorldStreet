import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Youtube, Twitter } from 'lucide-react';

const logoUrl = "/images/brand/logo.webp";

const socialLinks = [
  { href: 'https://instagram.com/1worldstrt', icon: Instagram, label: 'Instagram' },
  { href: '#', icon: Youtube,   label: 'YouTube' },
  { href: '#', icon: Twitter,   label: 'Twitter' },
];

const nav1 = [
  { href: '/products', label: 'Produtos'  },
  { href: '/drops',    label: 'Drops'     },
  { href: '/about',    label: 'Sobre Nós' },
  { href: '/contact',  label: 'Contato'   },
];

const nav2 = [
  { href: '/policy/shipping', label: 'Frete'       },
  { href: '/policy/returns',  label: 'Trocas'      },
  { href: '/policy/privacy',  label: 'Privacidade' },
  { href: '/policy/terms',    label: 'Termos'      },
  { href: '/policy/faq',      label: 'FAQ'         },
];

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-card border-t border-border/50">

      <div className="border-b border-border/30 bg-primary/5">
        <div className="container mx-auto container-padding py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-2xl font-bold text-foreground" style={{fontFamily:"'Barlow Condensed',sans-serif"}}>SIGA A GENTE NAS REDES</p>
            <p className="text-sm text-muted-foreground mt-1">Fique por dentro dos drops e novidades.</p>
          </div>
          <div className="flex gap-4">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-all duration-200">
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto container-padding py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-5">
              <img src={logoUrl} alt="1worldstrt" className="h-12 w-auto" />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Um mundo nas ruas. Expressamos a cultura urbana através de peças únicas e autênticas.
            </p>
            <p className="text-xs text-muted-foreground/60 mt-4 font-mono">contato@1worldstrt.com</p>
            <p className="text-xs text-muted-foreground/60 font-mono">Fortaleza — CE</p>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-5">Navegação</p>
            <ul className="space-y-2.5">
              {nav1.map(({ href, label }) => (
                <li key={href}><Link to={href} className="text-sm text-foreground/60 hover:text-accent transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-5">Políticas</p>
            <ul className="space-y-2.5">
              {nav2.map(({ href, label }) => (
                <li key={href}><Link to={href} className="text-sm text-foreground/60 hover:text-accent transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border/30">
        <div className="container mx-auto container-padding py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground/50">© {year} 1worldstrt. Todos os direitos reservados.</p>
          <p className="text-xs text-muted-foreground/40">Feito com <span className="text-accent">♥</span> nas ruas para o mundo.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

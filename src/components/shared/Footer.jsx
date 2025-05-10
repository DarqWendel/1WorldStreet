
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const logoUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/4bc2c226-6f2b-4714-b7d1-aa973e368ed3/a0ea57dfc92fd6cd589368884c22e741.png";

  return (
    <footer className="bg-neutral-900 text-neutral-300 section-padding border-t-2 border-primary">
      <div className="container mx-auto container-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About Section */}
          <div>
            <Link to="/" className="block mb-4">
              <img src={logoUrl} alt="1worldstrt Logo" className="h-12" />
            </Link>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Um mundo nas ruas. Expressamos a cultura urbana através de peças únicas e autênticas. Qualidade e atitude em cada detalhe.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-lg font-semibold text-neutral-100 mb-4">Navegação</h5>
            <ul className="space-y-2">
              <li><Link to="/products" className="hover:text-primary transition-colors text-sm">Produtos</Link></li>
              <li><Link to="/drops" className="hover:text-primary transition-colors text-sm">Drops</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors text-sm">Sobre Nós</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors text-sm">Contato</Link></li>
              <li><Link to="/policy/faq" className="hover:text-primary transition-colors text-sm">FAQ</Link></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h5 className="text-lg font-semibold text-neutral-100 mb-4">Políticas</h5>
            <ul className="space-y-2">
              <li><Link to="/policy/shipping" className="hover:text-primary transition-colors text-sm">Política de Frete</Link></li>
              <li><Link to="/policy/returns" className="hover:text-primary transition-colors text-sm">Trocas e Devoluções</Link></li>
              <li><Link to="/policy/privacy" className="hover:text-primary transition-colors text-sm">Política de Privacidade</Link></li>
              <li><Link to="/policy/terms" className="hover:text-primary transition-colors text-sm">Termos de Serviço</Link></li>
            </ul>
          </div>

          {/* Social Media & Contact */}
          <div>
            <h5 className="text-lg font-semibold text-neutral-100 mb-4">Siga-nos</h5>
            <div className="flex space-x-4 mb-4">
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-primary transition-colors"><Facebook size={22} /></a>
              <a href="https://instagram.com/1worldstrt" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-primary transition-colors"><Instagram size={22} /></a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-primary transition-colors"><Twitter size={22} /></a>
            </div>
            <h5 className="text-lg font-semibold text-neutral-100 mt-6 mb-2">Contato</h5>
            <p className="text-sm text-neutral-400">contato@1worldstrt.com</p>
            <p className="text-sm text-neutral-400">Barra do Ceará, Fortaleza - CE</p>
          </div>
        </div>

        <div className="border-t border-neutral-700 mt-10 pt-8 text-center">
          <p className="text-sm text-neutral-500">
            &copy; {currentYear} 1worldstrt. Todos os direitos reservados.
          </p>
          <p className="text-xs text-neutral-600 mt-1">
            Feito com <span className="text-primary">♥</span> nas ruas para o mundo.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

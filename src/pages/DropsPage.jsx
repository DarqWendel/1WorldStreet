import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { allProductsData, lookbookImages } from '@/data/products';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const dropItems = [
  { productId: 7, modelImage: '/images/lookbook/look-01.jpg', productImage: '/images/lookbook/look-02.jpg', name: 'World St. Fogo (Branca)', desc: 'Leveza e atitude para os dias de sol.' },
  { productId: 3, modelImage: '/images/lookbook/look-07.jpg', productImage: '/images/products/dragao-vermelho-frente.webp', name: 'Dragao (Vermelha)', desc: 'Conecte-se com a rua sem perder o estilo.' },
  { productId: 4, modelImage: '/images/lookbook/look-13.jpg', productImage: '/images/products/dragao-roxa-frente.webp', name: 'Cropped Dragao (Roxa)', desc: 'Para quem tem atitude de sobra.' },
  { productId: 1, modelImage: '/images/lookbook/look-09.jpg', productImage: '/images/products/fe-em-deus-creme-frente.webp', name: 'Fe em Deus (Creme)', desc: 'A declaracao de quem venceu.' },
  { productId: 5, modelImage: '/images/lookbook/look-04.jpg', productImage: '/images/products/world-verde-frente.webp', name: 'World (Verde)', desc: 'O classico que nunca sai de moda.' },
  { productId: 6, modelImage: '/images/lookbook/look-04.jpg', productImage: '/images/products/world-marrom-frente.webp', name: 'World (Marrom)', desc: 'Terroso, urbano, autêntico.' },
];

const DropsPage = () => (
  <div className="bg-background text-foreground">
    <section className="relative min-h-[70vh] flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <img src={lookbookImages.hero} alt="Drop 1WorldStrt" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>
      <div className="container mx-auto container-padding relative z-10 pb-20 text-center w-full">
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.15 } } }}>
          <motion.p variants={fadeUp} className="badge-tag inline-block mb-4">Novo Lancamento</motion.p>
          <motion.h1 variants={fadeUp} className="text-6xl md:text-9xl font-black text-white leading-none tracking-tight" style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>
            DROP
          </motion.h1>
          <motion.p variants={fadeUp} className="text-accent text-3xl md:text-5xl font-black tracking-[0.3em] uppercase mt-2">Colecao Atual</motion.p>
        </motion.div>
      </div>
    </section>

    <section id="drop-gallery" className="section-padding">
      <div className="container mx-auto container-padding">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-primary" style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>As Pecas</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dropItems.map((item, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-card rounded-lg shadow-xl overflow-hidden group flex flex-col border border-border/40">
              <div className="relative aspect-[3/4] overflow-hidden">
                <img src={item.modelImage} alt={item.name} className="w-full h-full object-cover transition-opacity duration-400 group-hover:opacity-0 absolute inset-0" />
                <img src={item.productImage} alt={item.name} className="w-full h-full object-cover opacity-0 transition-opacity duration-400 group-hover:opacity-100 absolute inset-0" />
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-foreground mb-1">{item.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-grow">{item.desc}</p>
                <Button asChild variant="outline" className="w-full border-primary/30 text-primary hover:bg-primary/10">
                  <Link to={'/product/' + item.productId}>Ver Produto</Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding bg-card/30">
      <div className="container mx-auto container-padding text-center">
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-black text-foreground mb-6" style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>
          Gostou? Ve a Colecao Completa
        </motion.h2>
        <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold tracking-wider px-10 py-6 text-lg">
          <Link to="/products" className="flex items-center gap-2">
            Ver Todos os Produtos <ArrowRight className="h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  </div>
);

export default DropsPage;
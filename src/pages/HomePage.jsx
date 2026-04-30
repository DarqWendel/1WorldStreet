import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Quote, ChevronDown } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };

// ── Hero: sequência de imagens que fazem slideshow ────────────
const heroSlides = [
  {
    img: '/images/lookbook/look-11.jpg',
    label: 'Dragão',
    title: 'FORÇA',
    sub: 'QUE NÃO SE EXPLICA',
    position: 'center 20%',
  },
  {
    img: '/images/lookbook/look-04.jpg',
    label: 'World',
    title: 'UM MUNDO',
    sub: 'NAS RUAS',
    position: 'center 30%',
  },
  {
    img: '/images/lookbook/look-10.jpg',
    label: 'Coleção',
    title: 'ATITUDE',
    sub: 'EM CADA DETALHE',
    position: 'center 15%',
  },
  {
    img: '/images/lookbook/look-09.jpg',
    label: 'Fé em Deus',
    title: 'A FAVELA',
    sub: 'VENCEU',
    position: 'center 25%',
  },
];

// ── Produtos em destaque ──────────────────────────────────────
const featuredProducts = [
  {
    id: 3,
    name: 'Camiseta Dragão',
    price: 'R$ 149,90',
    tag: 'NOVO',
    image: '/images/products/dragao-vermelho-frente.webp',
    lifestyle: '/images/lookbook/look-08.jpg',
    alt: 'Camiseta vermelha com dragão',
  },
  {
    id: 1,
    name: 'Fé em Deus',
    price: 'R$ 119,90',
    tag: 'CLÁSSICO',
    image: '/images/products/fe-em-deus-creme-frente.webp',
    lifestyle: '/images/lookbook/look-09.jpg',
    alt: 'Camiseta creme Fé em Deus',
  },
  {
    id: 5,
    name: 'Camiseta World',
    price: 'R$ 129,90',
    tag: 'ESSENCIAL',
    image: '/images/products/world-verde-frente.webp',
    lifestyle: '/images/lookbook/look-04.jpg',
    alt: 'Camiseta verde World',
  },
];

// ── Grade do lookbook ─────────────────────────────────────────
const lookbookGrid = [
  { src: '/images/lookbook/look-01.jpg', span: 'row-span-2', alt: 'Look 1' },
  { src: '/images/lookbook/look-07.jpg', span: '',           alt: 'Look 2' },
  { src: '/images/lookbook/look-13.jpg', span: '',           alt: 'Look 3' },
  { src: '/images/lookbook/look-06.jpg', span: 'row-span-2', alt: 'Look 4' },
  { src: '/images/lookbook/look-12.jpg', span: '',           alt: 'Look 5' },
  { src: '/images/lookbook/look-03.jpg', span: '',           alt: 'Look 6' },
];

const testimonials = [
  { id: 1, text: 'As peças da 1worldstrt são puro estilo e conforto. A qualidade é absurda e as estampas são únicas. Já virei cliente fiel!', author: '__trixxe', location: 'Fortaleza — CE' },
  { id: 2, text: 'Chegou tudo certinho e rápido. A camiseta é ainda mais bonita pessoalmente. Representa demais a nossa cultura!', author: 'yzxx777', location: 'Fortaleza — CE' },
];

// ─────────────────────────────────────────────────────────────
const HomePage = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  // Troca automática de slide a cada 4 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[activeSlide];

  return (
    <div className="text-foreground">

      {/* ════════════════════════════════════════════════════
          HERO — Layout editorial: texto + moldura TV
          ════════════════════════════════════════════════════ */}
      <section className="relative h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] min-h-[560px] bg-background overflow-hidden flex items-center">

        {/* Fundo com gradiente radial sutil */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(var(--primary)/0.12)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(var(--accent)/0.06)_0%,_transparent_50%)]" />

        {/* Layout: texto à esquerda + moldura à direita */}
        <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-stretch gap-0">

          {/* ── Coluna esquerda: texto + elementos street ── */}
          <div className="relative flex flex-col justify-center flex-shrink-0 w-full md:w-[45%] px-8 md:px-12 lg:px-16 pt-6 md:pt-0 overflow-hidden">

            {/* Número do slide gigante — fundo decorativo estilo magazine */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`bg-num-${activeSlide}`}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute right-0 bottom-8 select-none pointer-events-none leading-none"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 'clamp(10rem, 22vw, 20rem)',
                  fontWeight: 900,
                  color: 'transparent',
                  WebkitTextStroke: '1px rgba(255,255,255,0.04)',
                  lineHeight: 1,
                }}
              >
                0{activeSlide + 1}
              </motion.div>
            </AnimatePresence>

            {/* Linha vertical accent — detalhe lateral esquerdo */}
            <div className="absolute left-4 md:left-5 top-1/4 bottom-1/4 w-[2px] bg-gradient-to-b from-transparent via-accent/60 to-transparent" />

            {/* Tag de coleção no topo — estilo etiqueta */}
            <motion.div
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-[1px] w-8 bg-accent/60" />
              <span className="text-[10px] font-black tracking-[0.3em] uppercase text-muted-foreground"
                style={{ fontFamily: "'Space Mono', monospace" }}>
                1WORLDSTRT
              </span>
              <div className="h-[1px] flex-1 bg-border/40" />
            </motion.div>

            {/* Badge */}
            <AnimatePresence mode="wait">
              <motion.div key={`badge-${activeSlide}`}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.35 }}>
                <span className="badge-tag mb-4 inline-block">{slide.label}</span>
              </motion.div>
            </AnimatePresence>

            {/* Título */}
            <AnimatePresence mode="wait">
              <motion.div key={`title-${activeSlide}`}
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5, ease: 'easeOut' }}>
                <h1 className="font-black text-white leading-none mb-2"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(3.5rem, 7vw, 7rem)', textShadow: '0 4px 32px rgba(0,0,0,0.6)' }}>
                  {slide.title}
                </h1>
                <p className="text-accent font-black tracking-[0.25em] uppercase mb-8"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(1rem, 2vw, 1.6rem)' }}>
                  {slide.sub}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Botões */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-wrap gap-3 mb-10">
              <Button asChild size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold tracking-widest px-8 h-12">
                <Link to="/products">VER COLEÇÃO</Link>
              </Button>
              <Button asChild variant="outline" size="lg"
                className="border-white/40 text-white hover:bg-white/10 font-semibold tracking-widest px-8 h-12">
                <Link to="/drops" className="flex items-center gap-2">DROPS <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </motion.div>

            {/* Rodapé do bloco: indicadores + contador */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {heroSlides.map((_, i) => (
                  <button key={i} onClick={() => setActiveSlide(i)}
                    className={`transition-all duration-300 rounded-full ${i === activeSlide ? 'w-8 h-2 bg-accent' : 'w-2 h-2 bg-white/30 hover:bg-white/60'}`}
                    aria-label={`Slide ${i + 1}`} />
                ))}
              </div>
              <span className="text-[11px] font-black tracking-widest text-muted-foreground/50 select-none"
                style={{ fontFamily: "'Space Mono', monospace" }}>
                0{activeSlide + 1} / 0{heroSlides.length}
              </span>
            </div>
          </div>

          {/* ── Coluna direita: foto estilo street/zine ── */}
          <div className="flex-1 flex items-stretch justify-center h-full min-h-0">
            <div className="relative w-full h-full overflow-hidden" style={{ clipPath: 'polygon(6% 0%, 100% 0%, 94% 100%, 0% 100%)' }}>

              {/* Imagem com transição */}
              <AnimatePresence mode="sync">
                <motion.img
                  key={activeSlide}
                  src={slide.img}
                  alt={slide.label}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: 'easeInOut' }}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
              </AnimatePresence>

              {/* Overlay escuro nas bordas para blend com o fundo */}
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-background/80 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/30 pointer-events-none" />

              {/* Linha decorativa accent no topo */}
              <div className="absolute top-0 left-[6%] right-0 h-[3px] bg-accent/70 pointer-events-none" />
              {/* Linha decorativa accent embaixo */}
              <div className="absolute bottom-0 left-0 right-[6%] h-[3px] bg-primary/60 pointer-events-none" />
            </div>
          </div>

        </div>

        {/* Scroll hint — desktop */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-1"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
          <span className="text-[10px] tracking-widest uppercase text-white/40 font-semibold">scroll</span>
          <ChevronDown className="h-4 w-4 text-white/40" />
        </motion.div>
      </section>


      {/* ════════════════════════════════════════════════════
          FAIXA — Texto corrido animado (street tape)
          ════════════════════════════════════════════════════ */}
      <div className="overflow-hidden bg-accent py-3 border-y border-accent/50">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="flex gap-0 whitespace-nowrap"
        >
          {[...Array(6)].map((_, i) => (
            <span key={i} className="text-accent-foreground font-black tracking-[0.3em] uppercase text-sm px-8"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1rem' }}>
              1WORLDSTRT &nbsp;·&nbsp; UM MUNDO NAS RUAS &nbsp;·&nbsp; FORTALEZA CE &nbsp;·&nbsp; FÉ EM DEUS &nbsp;·&nbsp;
            </span>
          ))}
        </motion.div>
      </div>


      {/* ════════════════════════════════════════════════════
          PRODUTOS EM DESTAQUE — Cards com hover flip
          ════════════════════════════════════════════════════ */}
      <section className="section-padding bg-background">
        <div className="container mx-auto container-padding">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            transition={{ duration: 0.5 }} className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">Mais Vendidos</p>
              <h2 className="text-4xl md:text-6xl font-black text-foreground leading-none"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                PRODUTOS<br /><span className="text-primary">EM DESTAQUE</span>
              </h2>
            </div>
            <Link to="/products" className="text-sm font-semibold text-muted-foreground hover:text-accent flex items-center gap-1 transition-colors">
              Ver todos <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredProducts.map((product, i) => (
              <motion.div key={product.id} initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} transition={{ duration: 0.5, delay: i * 0.12 }}>
                <Link to={`/product/${product.id}`} className="group block bg-card rounded-xl overflow-hidden border border-border/40 hover:border-primary/40 transition-all duration-300 card-hover">

                  {/* Imagem com hover: produto → lifestyle */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                    <img src={product.image} alt={product.alt}
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0" />
                    <img src={product.lifestyle} alt={product.alt + ' lifestyle'}
                      className="absolute inset-0 w-full h-full object-cover object-top opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    {/* Badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="badge-tag">{product.tag}</span>
                    </div>

                    {/* Overlay escuro no hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </div>

                  <div className="p-5 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-foreground text-base leading-tight">{product.name}</h3>
                      <p className="text-accent font-bold mt-0.5"
                        style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.82rem' }}>
                        {product.price}
                      </p>
                    </div>
                    <div className="w-9 h-9 rounded-full border-2 border-border/50 flex items-center justify-center text-muted-foreground group-hover:border-accent group-hover:text-accent group-hover:bg-accent/10 transition-all duration-200">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════
          LOOKBOOK — Grade de fotos assimétrica
          ════════════════════════════════════════════════════ */}
      <section className="section-padding bg-card/20">
        <div className="container mx-auto container-padding">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            transition={{ duration: 0.5 }} className="text-center mb-10">
            <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-2">Na Rua</p>
            <h2 className="text-4xl md:text-6xl font-black text-foreground"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              LOOKBOOK
            </h2>
          </motion.div>

          {/* Grade assimétrica */}
          <div className="grid grid-cols-3 grid-rows-4 gap-2 md:gap-3 h-[600px] md:h-[800px]">
            {/* Grande esquerda */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              transition={{ duration: 0.5, delay: 0 }}
              className="col-span-2 row-span-2 rounded-xl overflow-hidden bg-muted">
              <img src="/images/lookbook/look-11.jpg" alt="Lookbook casal"
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700" />
            </motion.div>

            {/* Pequena direita topo */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="col-span-1 row-span-1 rounded-xl overflow-hidden bg-muted">
              <img src="/images/lookbook/look-07.jpg" alt="Look"
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700" />
            </motion.div>

            {/* Pequena direita meio */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="col-span-1 row-span-1 rounded-xl overflow-hidden bg-muted">
              <img src="/images/lookbook/look-13.jpg" alt="Look"
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700" />
            </motion.div>

            {/* Pequena esquerda baixo */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="col-span-1 row-span-2 rounded-xl overflow-hidden bg-muted">
              <img src="/images/lookbook/look-06.jpg" alt="Look"
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700" />
            </motion.div>

            {/* Grande centro baixo */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="col-span-1 row-span-2 rounded-xl overflow-hidden bg-muted">
              <img src="/images/lookbook/look-03.jpg" alt="Look"
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700" />
            </motion.div>

            {/* Pequena direita baixo */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="col-span-1 row-span-2 rounded-xl overflow-hidden bg-muted">
              <img src="/images/lookbook/look-10.jpg" alt="Look"
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700" />
            </motion.div>
          </div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            transition={{ duration: 0.4 }} className="text-center mt-8">
            <Button asChild variant="outline" size="lg"
              className="border-primary/30 text-primary hover:bg-primary/10 font-semibold tracking-wider px-10">
              <Link to="/drops" className="flex items-center gap-2">
                Ver Drops <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════
          BANNER DUPLO — Dois CTAs lado a lado
          ════════════════════════════════════════════════════ */}
      <section className="section-padding bg-background">
        <div className="container mx-auto container-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Banner 1 — Nova Coleção */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="relative rounded-xl overflow-hidden h-80 group">
              <img src="/images/lookbook/look-04.jpg" alt="Coleção World"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-xs tracking-widest uppercase text-accent font-semibold mb-1">Nova Coleção</p>
                <h3 className="text-3xl font-black text-white mb-3"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>COLEÇÃO WORLD</h3>
                <Button asChild size="sm" className="bg-white text-background hover:bg-white/90 font-semibold tracking-wider">
                  <Link to="/products?q=world">Explorar</Link>
                </Button>
              </div>
            </motion.div>

            {/* Banner 2 — Dragão */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative rounded-xl overflow-hidden h-80 group">
              <img src="/images/lookbook/look-08.jpg" alt="Coleção Dragão"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-xs tracking-widest uppercase text-accent font-semibold mb-1">Mais Vendido</p>
                <h3 className="text-3xl font-black text-white mb-3"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>COLEÇÃO DRAGÃO</h3>
                <Button asChild size="sm" className="bg-white text-background hover:bg-white/90 font-semibold tracking-wider">
                  <Link to="/products?q=dragão">Explorar</Link>
                </Button>
              </div>
            </motion.div>

          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════
          DEPOIMENTOS
          ════════════════════════════════════════════════════ */}
      <section className="section-padding bg-card/20">
        <div className="container mx-auto container-padding">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            transition={{ duration: 0.5 }} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-foreground"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>QUEM USA, APROVA</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimonials.map((item, i) => (
              <motion.div key={item.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card border border-border/40 rounded-xl p-7 relative">
                <Quote className="absolute top-5 right-5 w-8 h-8 text-primary/20" />
                <p className="text-foreground/80 leading-relaxed mb-5 italic">"{item.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-black text-sm">
                    {item.author[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">@{item.author}</p>
                    <p className="text-xs text-muted-foreground">{item.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════
          CTA FINAL
          ════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/lookbook/look-05.jpg" alt="CTA background"
            className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-background/85" />
        </div>
        <div className="relative z-10 container mx-auto container-padding py-28 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}>
            <motion.p variants={fadeUp} className="badge-tag inline-block mb-5">1worldstrt</motion.p>
            <motion.h2 variants={fadeUp} transition={{ duration: 0.6 }}
              className="text-5xl md:text-8xl font-black text-white leading-none mb-6"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              PRONTO PARA<br /><span className="text-accent">MARCAR PRESENÇA?</span>
            </motion.h2>
            <motion.p variants={fadeUp} transition={{ duration: 0.6 }}
              className="text-foreground/70 text-lg max-w-xl mx-auto mb-10">
              Descubra os lançamentos que vão elevar seu estilo e mostrar sua atitude pro mundo.
            </motion.p>
            <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
              <Button asChild size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-black tracking-wider text-lg px-14 py-7 h-auto">
                <Link to="/products">COMPRE AGORA</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;

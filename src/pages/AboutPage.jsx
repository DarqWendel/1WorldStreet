import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const AboutPage = () => (
  <div className="bg-background text-foreground section-padding">
    <div className="container mx-auto container-padding">
      <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.12 } } }} className="text-center mb-16">
        <motion.p variants={fadeUp} className="badge-tag inline-block mb-4">Nossa Historia</motion.p>
        <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-black text-primary leading-none" style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>
          1WORLDSTRT
        </motion.h1>
        <motion.p variants={fadeUp} className="text-xl text-muted-foreground mt-4 max-w-2xl mx-auto leading-relaxed">
          "Um mundo nas ruas" nao e apenas nosso slogan — e nossa filosofia. Nascemos da paixao pela cultura urbana e pela autoexpressao genuina.
        </motion.p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }}>
          <h2 className="text-4xl font-black text-foreground mb-5" style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>Nossa Historia</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            A 1worldstrt surgiu da uniao de mentes criativas que respiram o lifestyle das ruas de Fortaleza. Cansados do comum, criamos uma marca que traduz autenticidade, diversidade e energia urbana em pecas unicas.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Cada design conta uma historia. Usamos materiais de alta qualidade e nos importamos com cada detalhe — do corte a estampa — para que voce vista nao apenas uma roupa, mas uma atitude.
          </p>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6, delay: 0.1 }}
          className="aspect-[4/5] rounded-xl overflow-hidden bg-card border border-border/40">
          <img src="/images/lookbook/look-10.jpg" alt="1worldstrt lifestyle" className="w-full h-full object-cover" />
        </motion.div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {[
          { title: 'Nossa Missao', text: 'Oferecer moda streetwear autentica e de alta qualidade que inspire a autoexpressao e celebre a diversidade da cultura urbana.' },
          { title: 'Nossa Visao', text: 'Ser uma marca de referencia em streetwear, conectando pessoas atraves da moda e da cultura, mantendo sempre nossas raizes autenticas.' },
          { title: 'Nossos Valores', text: 'Autenticidade, Criatividade, Qualidade, Respeito a Diversidade e Paixao pela Cultura de Rua.' },
        ].map((card, i) => (
          <motion.div key={card.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-card border border-border/40 rounded-lg p-7">
            <h3 className="text-xl font-black text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>{card.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{card.text}</p>
          </motion.div>
        ))}
      </div>

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }} className="text-center">
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold tracking-wider px-10">
          <Link to="/products">Explorar Colecao</Link>
        </Button>
      </motion.div>
    </div>
  </div>
);

export default AboutPage;
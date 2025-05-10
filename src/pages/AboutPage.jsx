
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Heart, SprayCan } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AboutPage = () => {
  return (
    <div className="bg-background text-foreground section-padding">
      <div className="container mx-auto container-padding">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-24"
        >
          <SprayCan className="w-20 h-20 mx-auto text-primary mb-6" />
          <h1 className="text-4xl md:text-6xl font-extrabold text-primary mb-4">Sobre a 1worldstrt</h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            "Um mundo nas ruas" não é apenas nosso slogan, é nossa filosofia. Nascemos da paixão pela cultura urbana e pela autoexpressão.
          </p>
        </motion.section>

        {/* Our Story */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-12 items-center mb-16 md:mb-24"
        >
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Nossa História</h2>
            <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
              A 1worldstrt surgiu da união de mentes criativas que respiram o lifestyle das ruas. Cansados do comum, decidimos criar uma marca que traduzisse a autenticidade, a diversidade e a energia vibrante das metrópoles em peças de vestuário únicas.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Cada design é pensado para contar uma história, para ser uma extensão da sua personalidade. Usamos materiais de alta qualidade e nos preocupamos com cada detalhe, do corte à estampa, para que você vista não apenas uma roupa, mas uma atitude.
            </p>
          </div>
          <div className="order-1 md:order-2 h-80 md:h-96 rounded-xl overflow-hidden shadow-xl">
            <img  alt="Colagem de fotos urbanas e detalhes de design da marca" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1652805976332-3ea2cf30e146" />
          </div>
        </motion.section>

        {/* Mission, Vision, Values */}
        <section className="mb-16 md:mb-24">
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card p-8 rounded-lg shadow-lg"
            >
              <Target className="w-12 h-12 mx-auto text-primary mb-4" />
              <h3 className="text-2xl font-semibold text-card-foreground mb-3">Nossa Missão</h3>
              <p className="text-muted-foreground leading-relaxed">
                Oferecer moda streetwear autêntica e de alta qualidade que inspire a autoexpressão e celebre a diversidade da cultura urbana.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="bg-card p-8 rounded-lg shadow-lg"
            >
              <Users className="w-12 h-12 mx-auto text-primary mb-4" />
              <h3 className="text-2xl font-semibold text-card-foreground mb-3">Nossa Visão</h3>
              <p className="text-muted-foreground leading-relaxed">
                Ser uma marca global de referência em streetwear, conectando pessoas através da moda e da cultura, mantendo sempre nossas raízes autênticas.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-card p-8 rounded-lg shadow-lg"
            >
              <Heart className="w-12 h-12 mx-auto text-primary mb-4" />
              <h3 className="text-2xl font-semibold text-card-foreground mb-3">Nossos Valores</h3>
              <p className="text-muted-foreground leading-relaxed">
                Autenticidade, Criatividade, Qualidade, Respeito à Diversidade e Paixão pela Cultura de Rua.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Faça Parte do Nosso Mundo</h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
            Siga-nos nas redes sociais e fique por dentro dos lançamentos, inspirações e do universo 1worldstrt.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link to="/products">Explorar Coleção</Link>
          </Button>
        </motion.section>
      </div>
    </div>
  );
};

export default AboutPage;

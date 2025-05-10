
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ShoppingBag, Zap, Users, MessageCircle, ArrowRight } from 'lucide-react';

const productPlaceholders = {
  "Camiseta Fé em Deus / Favela Venceu (Creme)": "https://storage.googleapis.com/hostinger-horizons-assets-prod/4bc2c226-6f2b-4714-b7d1-aa973e368ed3/104efeb48ece87ce1c015afb9aac2888.png", // Frente
  "Camiseta Dragão (Vermelha)": "https://storage.googleapis.com/hostinger-horizons-assets-prod/4bc2c226-6f2b-4714-b7d1-aa973e368ed3/1e757c955a0abcaf9bfd3ef02c6593b0.png",
  "Camiseta World (Azul Marinho)": "https://storage.googleapis.com/hostinger-horizons-assets-prod/4bc2c226-6f2b-4714-b7d1-aa973e368ed3/57057f73379849b0e7dfced25fb5c298.png",
  "Camiseta World St. Fogo (Branca)": "https://storage.googleapis.com/hostinger-horizons-assets-prod/4bc2c226-6f2b-4714-b7d1-aa973e368ed3/cff7618c997017f7b89aefb59ada9fc2.png",
  "Camiseta Irrastreável (Preta)": "https://storage.googleapis.com/hostinger-horizons-assets-prod/4bc2c226-6f2b-4714-b7d1-aa973e368ed3/955658c01932dd631c264853a86576aa.png",
  "Camiseta World Street Monkey (Preta)": "https://storage.googleapis.com/hostinger-horizons-assets-prod/4bc2c226-6f2b-4714-b7d1-aa973e368ed3/f448f98d2a42d915a7be064078943b1d.png",
};

const dropImages = [
  { id: 'drop1', src: "https://storage.googleapis.com/hostinger-horizons-assets-prod/4bc2c226-6f2b-4714-b7d1-aa973e368ed3/eb790536fa3aaf5f7d2f182e5869dd8c.jpg", alt: "Modelo feminina na praia com camiseta Irrastreável"},
  { id: 'drop2', src: "https://storage.googleapis.com/hostinger-horizons-assets-prod/4bc2c226-6f2b-4714-b7d1-aa973e368ed3/cc29818001293476ff282cbc4210bac1.jpg", alt: "Modelo masculino em rochas com camiseta Irrastreável"},
  { id: 'drop3', src: "https://storage.googleapis.com/hostinger-horizons-assets-prod/4bc2c226-6f2b-4714-b7d1-aa973e368ed3/f1602b4d85f82034999684a29f5a19c2.jpg", alt: "Modelo feminina na praia mostrando a mão com camiseta World St."},
  { id: 'drop4', src: "https://storage.googleapis.com/hostinger-horizons-assets-prod/4bc2c226-6f2b-4714-b7d1-aa973e368ed3/f98190e910ad64f6d972056a9948f3e7.jpg", alt: "Modelo masculino de costas com camiseta Irrastreável"},
  { id: 'drop5', src: "https://storage.googleapis.com/hostinger-horizons-assets-prod/4bc2c226-6f2b-4714-b7d1-aa973e368ed3/67e03eb71d4f820e6544a21a2c1345c5.jpg", alt: "Casal na praia ao pôr do sol com camisetas Irrastreável"}
];


const HomePage = () => {
  const heroImageUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/4bc2c226-6f2b-4714-b7d1-aa973e368ed3/67e03eb71d4f820e6544a21a2c1345c5.jpg";
  const logoUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/4bc2c226-6f2b-4714-b7d1-aa973e368ed3/a0ea57dfc92fd6cd589368884c22e741.png";


  const featuredProducts = [
    { id: 9, name: 'Camiseta Irrastreável (Preta)', price: 'R$ 139,90', image: productPlaceholders['Camiseta Irrastreável (Preta)'], alt: 'Camiseta preta com estampa Irrastreável nas costas'},
    { id: 7, name: 'Camiseta World St. Fogo (Branca)', price: 'R$ 129,90', image: productPlaceholders['Camiseta World St. Fogo (Branca)'], alt: 'Camiseta branca com estampa World Street Fogo nas costas' },
    { id: 1, name: 'Camiseta Fé em Deus / Favela Venceu (Creme)', price: 'R$ 119,90', image: productPlaceholders['Camiseta Fé em Deus / Favela Venceu (Creme)'], alt: 'Camiseta creme com estampa Fé em Deus na frente e Favela Venceu nas costas' },
  ];

  const categories = [
    { name: 'Camisetas', imagePlaceholder: 'Camiseta Dragão (Vermelha)', link: '/products?category=camisetas', alt: 'Camisetas estampadas da 1worldstrt' },
    { name: 'Drops', imagePlaceholder: 'Camiseta Irrastreável (Preta)', link: '/drops', alt: 'Novos lançamentos e drops exclusivos' },
    { name: 'Novidades', imagePlaceholder: 'Camiseta World Street Monkey (Preta)', link: '/products?filter=novidades', alt: 'Novidades da 1worldstrt' },
  ];


  return (
    <div className="text-foreground">
      {/* Hero Banner */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-neutral-900 text-white min-h-[70vh] md:min-h-[85vh] flex items-center justify-center section-padding"
      >
        <div className="absolute inset-0">
          <img src={heroImageUrl} alt="Casal na praia ao por do sol com camisetas 1worldstrt" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        </div>
        <div className="container mx-auto relative z-10 text-center container-padding">
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <img src={logoUrl} alt="1worldstrt Logo" className="h-20 md:h-28 mx-auto"/>
          </motion.div>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-3xl mb-8 max-w-3xl mx-auto text-neutral-200 font-medium"
            style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.6)' }}
          >
            UM MUNDO NAS RUAS.
          </motion.p>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-10 py-6 text-lg shadow-lg">
              <Link to="/products">Ver Coleção Completa</Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Drop Section */}
      <section className="section-padding bg-background">
        <div className="container mx-auto text-center container-padding">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-accent">DROP 5</h2>
          <p className="text-4xl md:text-5xl font-extrabold mb-10 text-primary uppercase tracking-wider">IRRASTREÁVEL</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {dropImages.slice(0,3).map((drop, index) => (
              <motion.div
                key={drop.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-lg shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out group aspect-[3/4]"
              >
                <img src={drop.src} alt={drop.alt} className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </div>
           <Button asChild size="lg" variant="outline" className="border-accent text-accent hover:bg-accent/10 font-semibold px-8 py-5 text-md">
              <Link to="/drops" className="flex items-center">
                Ver Drop Completo <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
        </div>
      </section>


      {/* Destaques / Produtos em Oferta */}
      <section className="section-padding bg-neutral-800">
        <div className="container mx-auto text-center container-padding">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-primary">Produtos em Destaque</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-lg shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out group flex flex-col"
              >
                <Link to={`/product/${product.id}`} className="block">
                  <div className="w-full h-80 md:h-96 overflow-hidden">
                    <img src={product.image} alt={product.alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out" />
                  </div>
                </Link>
                <div className="p-6 text-left flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold mb-2 text-card-foreground">{product.name}</h3>
                  <p className="text-lg text-primary font-bold mb-4 mt-auto">{product.price}</p>
                  <Button asChild variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
                    <Link to={`/product/${product.id}`}>Ver Detalhes</Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categorias Principais */}
      <section className="section-padding bg-background">
        <div className="container mx-auto text-center container-padding">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-primary">Explore Nossas Categorias</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.15 }}
              >
                <Link to={category.link} className="block group">
                  <div className="relative rounded-lg overflow-hidden shadow-lg aspect-square">
                    <img src={productPlaceholders[category.imagePlaceholder]} alt={category.alt} className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center p-4">
                      <h3 className="text-2xl font-bold text-white text-center">{category.name}</h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="section-padding bg-neutral-800">
        <div className="container mx-auto text-center container-padding">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-primary">O Que Dizem Nossos Clientes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-card p-8 rounded-lg shadow-lg"
            >
              <MessageCircle className="text-primary w-10 h-10 mb-4 mx-auto md:mx-0" />
              <p className="text-card-foreground mb-4 italic leading-relaxed">"As peças da 1worldstrt são puro estilo e conforto. A qualidade é absurda e as estampas são únicas. Já virei cliente fiel!"</p>
              <p className="font-semibold text-neutral-400">- __trixxe, Fortaleza - CE</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay:0.1 }}
              className="bg-card p-8 rounded-lg shadow-lg"
            >
              <MessageCircle className="text-primary w-10 h-10 mb-4 mx-auto md:mx-0" />
              <p className="text-card-foreground mb-4 italic leading-relaxed">"Chegou tudo certinho e rápido. A camiseta é ainda mais bonita pessoalmente. Representa demais a nossa cultura!"</p>
              <p className="font-semibold text-neutral-400">- yzxx777, Fortaleza - CE</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="section-padding bg-neutral-900">
        <div className="container mx-auto text-center container-padding">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-primary mb-6"
          >
            Pronto para Marcar Presença?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay:0.1 }}
            className="text-lg text-foreground mb-8 max-w-xl mx-auto"
          >
            Descubra os lançamentos que vão elevar seu estilo e mostrar sua atitude pro mundo.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay:0.2 }}
          >
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-10 py-6 text-lg shadow-md">
              <Link to="/products">Compre Agora</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

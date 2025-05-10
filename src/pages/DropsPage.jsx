
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const dropName = "DROP 5 IRRASTREÁVEL";

const dropItems = [
  { 
    id: 'drop-item-1', 
    modelImage: "https://storage.googleapis.com/hostinger-horizons-assets-prod/4bc2c226-6f2b-4714-b7d1-aa973e368ed3/eb790536fa3aaf5f7d2f182e5869dd8c.jpg", 
    altModel: "Modelo feminina na praia com camiseta Irrastreável branca",
    productImage: "https://storage.googleapis.com/hostinger-horizons-assets-prod/4bc2c226-6f2b-4714-b7d1-aa973e368ed3/cff7618c997017f7b89aefb59ada9fc2.png", // Camiseta World St. Fogo (Branca)
    altProduct: "Camiseta branca com estampa World Street Fogo nas costas",
    productName: "Camiseta World St. Fogo (Branca)",
    productId: 7, // Corresponde ao ID do produto em ProductsPage
    description: "Leveza e atitude para os dias de sol. A estampa vibrante reflete a energia das ruas."
  },
  { 
    id: 'drop-item-2', 
    modelImage: "https://storage.googleapis.com/hostinger-horizons-assets-prod/4bc2c226-6f2b-4714-b7d1-aa973e368ed3/cc29818001293476ff282cbc4210bac1.jpg", 
    altModel: "Modelo masculino em rochas com camiseta Irrastreável marrom",
    productImage: "https://storage.googleapis.com/hostinger-horizons-assets-prod/4bc2c226-6f2b-4714-b7d1-aa973e368ed3/955658c01932dd631c264853a86576aa.png", // Camiseta Irrastreável (Preta) - Usando como placeholder, ideal ter a marrom
    altProduct: "Camiseta preta com estampa Irrastreável",
    productName: "Camiseta Irrastreável (Marrom)",
    productId: 9, // Corresponde ao ID da camiseta Irrastreável preta, ideal ter um produto marrom
    description: "Conecte-se com a natureza sem perder o estilo urbano. Resistência e conforto para qualquer aventura."
  },
  { 
    id: 'drop-item-3', 
    modelImage: "https://storage.googleapis.com/hostinger-horizons-assets-prod/4bc2c226-6f2b-4714-b7d1-aa973e368ed3/f1602b4d85f82034999684a29f5a19c2.jpg", 
    altModel: "Modelo feminina na praia com camiseta World St branca",
    productImage: "https://storage.googleapis.com/hostinger-horizons-assets-prod/4bc2c226-6f2b-4714-b7d1-aa973e368ed3/6b7ad69bc0e9e611134885b418b26857.png", // Camiseta World (Branca)
    altProduct: "Camiseta branca com estampa World na frente",
    productName: "Camiseta World (Branca)",
    productId: 8,
    description: "Simplicidade que fala alto. O design clássico com a pegada 1worldstrt para todos os momentos."
  },
  { 
    id: 'drop-item-4', 
    modelImage: "https://storage.googleapis.com/hostinger-horizons-assets-prod/4bc2c226-6f2b-4714-b7d1-aa973e368ed3/f98190e910ad64f6d972056a9948f3e7.jpg", 
    altModel: "Modelo masculino de costas na praia com camiseta Irrastreável marrom",
    productImage: "https://storage.googleapis.com/hostinger-horizons-assets-prod/4bc2c226-6f2b-4714-b7d1-aa973e368ed3/955658c01932dd631c264853a86576aa.png", // Camiseta Irrastreável (Preta) - Usando como placeholder
    altProduct: "Camiseta preta com estampa Irrastreável",
    productName: "Camiseta Irrastreável Costas (Marrom)",
    productId: 9,
    description: "A estampa que define o drop. Detalhes que contam histórias e marcam sua presença."
  },
  { 
    id: 'drop-item-5', 
    modelImage: "https://storage.googleapis.com/hostinger-horizons-assets-prod/4bc2c226-6f2b-4714-b7d1-aa973e368ed3/67e03eb71d4f820e6544a21a2c1345c5.jpg", 
    altModel: "Casal na praia ao pôr do sol com camisetas Irrastreável",
    productImage: "https://storage.googleapis.com/hostinger-horizons-assets-prod/4bc2c226-6f2b-4714-b7d1-aa973e368ed3/cff7618c997017f7b89aefb59ada9fc2.png", // Uma branca e uma preta/marrom seriam ideais
    altProduct: "Camisetas do Drop Irrastreável",
    productName: "Pack Casal Irrastreável", // Nome ilustrativo
    productId: 9, // Apenas um ID de exemplo
    description: "Compartilhe o estilo. O Drop Irrastreável para você e quem te acompanha nessa jornada."
  }
];

const DropsPage = () => {
  const heroDropImage = dropItems.find(item => item.id === 'drop-item-5')?.modelImage || dropItems[0]?.modelImage;

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section for the Drop */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-neutral-900 text-white min-h-[60vh] md:min-h-[75vh] flex items-center justify-center section-padding"
      >
        <div className="absolute inset-0">
          <img src={heroDropImage} alt={`${dropName} - Imagem principal do drop`} className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        </div>
        <div className="container mx-auto relative z-10 text-center container-padding">
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl md:text-3xl text-accent font-semibold mb-2 tracking-wide"
          >
            NOVO LANÇAMENTO
          </motion.p>
          <motion.h1
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-5xl md:text-7xl font-extrabold mb-8 uppercase tracking-wider"
            style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}
          >
            {dropName}
          </motion.h1>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-10 py-6 text-lg shadow-lg">
              <Link to={`#drop-gallery`}>Explorar o Drop</Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Drop Gallery Section */}
      <section id="drop-gallery" className="section-padding">
        <div className="container mx-auto container-padding">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-primary">
            Conheça as Peças do {dropName}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dropItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-lg shadow-xl overflow-hidden group flex flex-col"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img src={item.modelImage} alt={item.altModel} className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0" />
                  <img src={item.productImage} alt={item.altProduct} className="w-full h-full object-cover absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
                <div className="p-6 text-left flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold mb-2 text-card-foreground">{item.productName}</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-grow">{item.description}</p>
                  <Button asChild variant="outline" className="w-full border-primary text-primary hover:bg-primary/10 mt-auto">
                    <Link to={`/product/${item.productId}`}>Ver Produto</Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

       {/* Call to Action to All Products */}
      <section className="section-padding bg-neutral-800">
        <div className="container mx-auto text-center container-padding">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-primary mb-6"
          >
            Gostou do Drop?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay:0.1 }}
            className="text-lg text-foreground mb-8 max-w-xl mx-auto"
          >
            Explore todas as coleções e encontre outras peças que são a sua cara.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay:0.2 }}
          >
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-10 py-6 text-lg shadow-md">
              <Link to="/products" className="flex items-center">
                Ver Todos os Produtos <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DropsPage;

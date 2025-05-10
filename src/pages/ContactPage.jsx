
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Mail, Phone, MessageSquare, MapPin, Send } from 'lucide-react';

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulação de envio
    console.log('Formulário de contato enviado:', formData);
    toast({
      title: "Mensagem Enviada!",
      description: "Obrigado por entrar em contato. Responderemos em breve.",
    });
    setFormData({ name: '', email: '', subject: '', message: '' }); // Limpa o formulário
  };

  return (
    <div className="bg-background text-foreground section-padding">
      <div className="container mx-auto container-padding">
        <motion.section
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <MessageSquare className="w-20 h-20 mx-auto text-primary mb-6" />
          <h1 className="text-4xl md:text-6xl font-extrabold text-primary mb-4">Entre em Contato</h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Tem alguma dúvida, sugestão ou quer fazer uma parceria? Adoraríamos ouvir você!
          </p>
        </motion.section>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card p-8 rounded-xl shadow-xl"
          >
            <h2 className="text-2xl font-semibold text-card-foreground mb-6">Envie uma Mensagem</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Seu Nome</Label>
                <Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="bg-input" />
              </div>
              <div>
                <Label htmlFor="email">Seu E-mail</Label>
                <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="bg-input" />
              </div>
              <div>
                <Label htmlFor="subject">Assunto</Label>
                <Input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required className="bg-input" />
              </div>
              <div>
                <Label htmlFor="message">Sua Mensagem</Label>
                <Textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} required className="bg-input" />
              </div>
              <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <Send className="w-5 h-5 mr-2" /> Enviar Mensagem
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="bg-card p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-card-foreground mb-3 flex items-center">
                <Mail className="w-6 h-6 mr-3 text-primary" /> E-mail
              </h3>
              <a href="mailto:contato@1worldstrt.com" className="text-muted-foreground hover:text-primary transition-colors">
                contato@1worldstrt.com
              </a>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-card-foreground mb-3 flex items-center">
                <Phone className="w-6 h-6 mr-3 text-primary" /> Telefone / WhatsApp
              </h3>
              <p className="text-muted-foreground">(XX) XXXXX-XXXX</p>
            </div>
             <div className="bg-card p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-card-foreground mb-3 flex items-center">
                <MapPin className="w-6 h-6 mr-3 text-primary" /> Nosso Endereço (Escritório)
              </h3>
              <p className="text-muted-foreground">Rua da Inspiração Urbana, 123<br />Cidade Criativa, UF - CEP 00000-000<br/>(Apenas escritório, não realizamos vendas no local)</p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-lg">
               <h3 className="text-xl font-semibold text-card-foreground mb-3">Horário de Atendimento</h3>
               <p className="text-muted-foreground">Segunda a Sexta: 9h às 18h</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

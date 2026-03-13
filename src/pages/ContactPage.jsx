import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

const ContactPage = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({ title: 'Mensagem enviada!', description: 'Responderemos em breve.' });
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="bg-background text-foreground section-padding">
      <div className="container mx-auto container-padding">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-14">
          <MessageSquare className="w-14 h-14 mx-auto text-primary mb-4" />
          <h1 className="text-5xl md:text-6xl font-black text-primary" style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>Entre em Contato</h1>
          <p className="text-muted-foreground mt-3 text-lg max-w-xl mx-auto">Duvidas, parcerias ou so querer trocar uma ideia? Manda ver.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-start max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="bg-card border border-border/50 rounded-xl p-7">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">Nome</Label>
                <Input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="bg-input/60" />
              </div>
              <div>
                <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">E-mail</Label>
                <Input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="bg-input/60" />
              </div>
              <div>
                <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">Assunto</Label>
                <Input required value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} className="bg-input/60" />
              </div>
              <div>
                <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">Mensagem</Label>
                <Textarea required rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="bg-input/60" />
              </div>
              <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold tracking-wider">
                <Send className="h-4 w-4 mr-2" /> Enviar Mensagem
              </Button>
            </form>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-5">
            {[
              { icon: Mail, title: 'E-mail', text: 'contato@1worldstrt.com', href: 'mailto:contato@1worldstrt.com' },
              { icon: Phone, title: 'WhatsApp', text: '(85) 99999-9999', href: 'https://wa.me/5585999999999' },
              { icon: MapPin, title: 'Localizacao', text: 'Fortaleza, CE — Brasil', href: null },
            ].map(item => (
              <div key={item.title} className="bg-card border border-border/40 rounded-lg p-5 flex items-start gap-4">
                <item.icon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground text-sm">{item.title}</p>
                  {item.href
                    ? <a href={item.href} className="text-muted-foreground text-sm hover:text-accent transition-colors">{item.text}</a>
                    : <p className="text-muted-foreground text-sm">{item.text}</p>}
                </div>
              </div>
            ))}
            <div className="bg-card border border-border/40 rounded-lg p-5">
              <p className="font-semibold text-foreground text-sm mb-1">Horario de Atendimento</p>
              <p className="text-muted-foreground text-sm">Segunda a Sexta: 9h as 18h</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
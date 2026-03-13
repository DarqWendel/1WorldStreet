import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FileText, Shield, Truck, HelpCircle, RotateCcw } from 'lucide-react';

const policies = {
  shipping: {
    title: 'Politica de Frete', icon: Truck,
    items: [
      { h: 'Opcoes de Envio', t: 'Oferecemos Sedex, PAC e transportadoras parceiras. Prazo e custo variam conforme localidade e modalidade.' },
      { h: 'Prazos', t: 'Calculado apos confirmacao do pagamento. Voce receberá o codigo de rastreamento por e-mail.' },
      { h: 'Frete Gratis', t: 'Para compras acima de determinado valor. Consulte as condicoes no carrinho.' },
    ]
  },
  returns: {
    title: 'Trocas e Devolucoes', icon: RotateCcw,
    items: [
      { h: 'Prazo', t: 'Ate 7 dias corridos apos o recebimento para solicitar troca ou devolucao por arrependimento.' },
      { h: 'Condicoes', t: 'Produto em embalagem original, sem uso, com etiquetas.' },
      { h: 'Processo', t: 'Entre em contato informando o numero do pedido. Forneceremos instrucoes de devolucao.' },
      { h: 'Reembolso', t: 'Processado apos recebimento e analise do produto. Estornado na forma de pagamento original.' },
    ]
  },
  privacy: {
    title: 'Politica de Privacidade', icon: Shield,
    items: [
      { h: 'Coleta de Dados', t: 'Coletamos nome, e-mail, endereco e dados de pagamento para processar pedidos.' },
      { h: 'Seguranca', t: 'Implementamos medidas de seguranca para proteger suas informacoes.' },
      { h: 'Compartilhamento', t: 'Nao vendemos dados pessoais. Compartilhamos apenas com parceiros logisticos necessarios.' },
    ]
  },
  terms: {
    title: 'Termos de Servico', icon: FileText,
    items: [
      { h: 'Aceitacao', t: 'Ao usar o site, voce concorda com estes termos.' },
      { h: 'Propriedade Intelectual', t: 'Todo o conteudo do site e propriedade da 1worldstrt.' },
      { h: 'Precos', t: 'Nos reservamos o direito de alterar precos sem aviso previo.' },
    ]
  },
  faq: {
    title: 'Perguntas Frequentes', icon: HelpCircle,
    items: [
      { h: 'Como rastrear meu pedido?', t: 'Voce receberá o codigo de rastreamento por e-mail apos o envio.' },
      { h: 'Como funciona o pagamento PIX?', t: 'Apos finalizar o pedido, voce recebe a chave PIX. Apos o pagamento, confirme e seu pedido sera processado.' },
      { h: 'Posso trocar um produto?', t: 'Sim. Veja nossa Politica de Trocas para prazos e condicoes.' },
      { h: 'Como entrar em contato?', t: 'Por e-mail (contato@1worldstrt.com) ou WhatsApp. Atendemos de segunda a sexta, 9h as 18h.' },
    ]
  },
};

const PolicyPage = () => {
  const { type } = useParams();
  const policy = policies[type];

  if (!policy) return (
    <div className="container mx-auto section-padding text-center container-padding">
      <h1 className="text-3xl font-bold mb-4">Pagina nao encontrada</h1>
      <Button asChild><Link to="/">Voltar para Home</Link></Button>
    </div>
  );

  const Icon = policy.icon;

  return (
    <div className="bg-background text-foreground section-padding">
      <div className="container mx-auto container-padding max-w-3xl">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-12">
          <Icon className="w-14 h-14 mx-auto text-primary mb-5" />
          <h1 className="text-4xl md:text-5xl font-black text-primary" style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>{policy.title}</h1>
          <p className="text-xs text-muted-foreground mt-2">Ultima atualizacao: Janeiro 2025</p>
        </motion.div>
        <div className="bg-card border border-border/50 rounded-xl p-8 space-y-8">
          {policy.items.map((item, i) => (
            <div key={i}>
              <h2 className="text-xl font-bold text-foreground mb-2" style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>{item.h}</h2>
              <p className="text-muted-foreground leading-relaxed text-sm">{item.t}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Button asChild variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
            <Link to="/contact">Ainda tem duvidas? Fale Conosco</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PolicyPage;
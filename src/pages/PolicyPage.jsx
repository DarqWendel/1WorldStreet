
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Shield, Truck, HelpCircle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const policiesData = {
  shipping: {
    title: "Política de Frete",
    icon: Truck,
    content: [
      { heading: "Opções de Envio", text: "Oferecemos diversas opções de envio para atender às suas necessidades, incluindo Sedex, PAC e transportadoras parceiras. O prazo e o custo variam conforme a localidade e a modalidade escolhida." },
      { heading: "Prazos de Entrega", text: "O prazo de entrega é calculado a partir da confirmação do pagamento e pode variar. Você poderá acompanhar o status do seu pedido através do código de rastreamento que será enviado por e-mail." },
      { heading: "Frete Grátis", text: "Oferecemos frete grátis para compras acima de um determinado valor (consulte as condições vigentes no carrinho de compras). Esta promoção é válida para regiões específicas." },
      { heading: "Atrasos na Entrega", text: "Embora nos esforcemos para cumprir todos os prazos, eventuais atrasos podem ocorrer devido a fatores externos. Caso isso aconteça, entre em contato conosco para que possamos ajudar." },
    ]
  },
  returns: {
    title: "Trocas e Devoluções",
    icon: RotateCcw,
    content: [
      { heading: "Prazo para Solicitação", text: "Você tem até 7 (sete) dias corridos, a contar da data de recebimento do produto, para solicitar a troca ou devolução por arrependimento, conforme o Código de Defesa do Consumidor." },
      { heading: "Condições do Produto", text: "O produto deve ser devolvido em sua embalagem original, sem indícios de uso, com todas as etiquetas e acessórios. Produtos personalizados ou íntimos podem ter políticas específicas." },
      { heading: "Processo de Troca/Devolução", text: "Entre em contato com nosso atendimento ao cliente informando o número do pedido e o motivo da solicitação. Forneceremos as instruções para o envio do produto." },
      { heading: "Reembolso", text: "Em caso de devolução, o reembolso será processado após o recebimento e análise do produto em nosso centro de distribuição. O valor será estornado conforme a forma de pagamento original." },
      { heading: "Produto com Defeito", text: "Se o produto apresentar defeito de fabricação, você tem até 30 (trinta) dias corridos após o recebimento para solicitar a troca. Entre em contato conosco para avaliação." },
    ]
  },
  privacy: {
    title: "Política de Privacidade",
    icon: Shield,
    content: [
      { heading: "Coleta de Dados", text: "Coletamos informações pessoais como nome, e-mail, endereço e dados de pagamento para processar seus pedidos e melhorar sua experiência em nossa loja. Seus dados são protegidos e confidenciais." },
      { heading: "Uso das Informações", text: "Utilizamos seus dados para processar pedidos, realizar entregas, enviar comunicações sobre promoções (com seu consentimento), personalizar sua navegação e cumprir obrigações legais." },
      { heading: "Segurança dos Dados", text: "Implementamos medidas de segurança robustas para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição. Utilizamos criptografia e protocolos seguros." },
      { heading: "Compartilhamento de Dados", text: "Não vendemos nem alugamos seus dados pessoais. Podemos compartilhar informações com parceiros logísticos e de pagamento, estritamente para a finalidade de processar seu pedido." },
      { heading: "Cookies", text: "Utilizamos cookies para melhorar sua experiência de navegação, lembrar suas preferências e analisar o tráfego do site. Você pode gerenciar o uso de cookies nas configurações do seu navegador." },
      { heading: "Seus Direitos", text: "Você tem o direito de acessar, corrigir, atualizar ou solicitar a exclusão dos seus dados pessoais. Entre em contato conosco para exercer seus direitos." },
    ]
  },
  terms: {
    title: "Termos de Serviço",
    icon: FileText,
    content: [
      { heading: "Aceitação dos Termos", text: "Ao acessar e utilizar o site da 1worldstrt, você concorda em cumprir estes Termos de Serviço e todas as leis e regulamentos aplicáveis." },
      { heading: "Uso do Site", text: "Você concorda em usar o site apenas para fins legais e de acordo com estes termos. É proibido o uso do site para atividades fraudulentas ou ilegais." },
      { heading: "Propriedade Intelectual", text: "Todo o conteúdo do site, incluindo textos, imagens, logotipos, designs e software, é propriedade da 1worldstrt ou de seus licenciadores e é protegido por leis de direitos autorais." },
      { heading: "Preços e Produtos", text: "Nos reservamos o direito de alterar preços, descrições de produtos e disponibilidade a qualquer momento, sem aviso prévio. Faremos o possível para garantir a precisão das informações." },
      { heading: "Limitação de Responsabilidade", text: "A 1worldstrt não se responsabiliza por danos diretos, indiretos, incidentais ou consequenciais resultantes do uso ou da incapacidade de usar nosso site ou produtos." },
      { heading: "Modificações nos Termos", text: "Podemos revisar estes Termos de Serviço periodicamente. As alterações entrarão em vigor imediatamente após a publicação no site. Seu uso continuado do site após tais alterações constitui sua aceitação dos novos termos." },
    ]
  },
  faq: {
    title: "Perguntas Frequentes (FAQ)",
    icon: HelpCircle,
    content: [
      { heading: "Como faço para rastrear meu pedido?", text: "Após o envio do seu pedido, você receberá um e-mail com o código de rastreamento e um link para acompanhar a entrega." },
      { heading: "Quais formas de pagamento são aceitas?", text: "Aceitamos cartões de crédito (Visa, Mastercard, Amex, Elo), PIX e Boleto Bancário." },
      { heading: "Posso trocar um produto?", text: "Sim, consulte nossa Política de Trocas e Devoluções para mais informações sobre prazos e condições." },
      { heading: "Qual o prazo de entrega?", text: "O prazo de entrega varia de acordo com sua localidade e a forma de envio escolhida. Você pode simular o prazo no carrinho de compras." },
      { heading: "Os produtos têm garantia?", text: "Sim, oferecemos garantia contra defeitos de fabricação. Consulte nossa Política de Trocas e Devoluções." },
      { heading: "Como entro em contato com o atendimento ao cliente?", text: "Você pode nos contatar por e-mail (contato@1worldstrt.com) ou telefone/WhatsApp (XX) XXXXX-XXXX. Nosso horário de atendimento é de Segunda a Sexta, das 9h às 18h." },
    ]
  }
};

const PolicyPage = () => {
  const { type } = useParams();
  const policy = policiesData[type];

  if (!policy) {
    return (
      <div className="container mx-auto section-padding text-center">
        <h1 className="text-3xl font-bold mb-4">Política não encontrada</h1>
        <p className="text-muted-foreground mb-6">A página que você está procurando não existe.</p>
        <Button asChild>
          <Link to="/">Voltar para Home</Link>
        </Button>
      </div>
    );
  }

  const IconComponent = policy.icon;

  return (
    <div className="bg-background text-foreground section-padding">
      <div className="container mx-auto container-padding">
        <motion.section
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 md:mb-16"
        >
          {IconComponent && <IconComponent className="w-16 h-16 md:w-20 md:h-20 mx-auto text-primary mb-6" />}
          <h1 className="text-3xl md:text-5xl font-extrabold text-primary mb-3">{policy.title}</h1>
          <p className="text-md md:text-lg text-muted-foreground">Última atualização: 06 de maio de 2025</p>
        </motion.section>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto bg-card p-6 sm:p-8 md:p-10 rounded-xl shadow-xl space-y-8"
        >
          {policy.content.map((section, index) => (
            <div key={index}>
              <h2 className="text-xl sm:text-2xl font-semibold text-card-foreground mb-3">{section.heading}</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{section.text}</p>
            </div>
          ))}
        </motion.div>

         <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
            <Link to="/contact">Ainda tem dúvidas? Fale Conosco</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default PolicyPage;

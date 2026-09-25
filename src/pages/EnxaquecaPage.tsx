import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from "framer-motion";
import { buildWhatsappLink } from '../lib/whatsapp';
import { Seo, physicianSchema, faqSchema } from '../components/Seo';
import { AtendimentoParticular } from '../components/AtendimentoParticular';
import { Navbar as SiteNavbar } from '../components/Navbar';

import { 
  Menu, 
  X, 
  CheckCircle2, 
  BrainCircuit, 
  Zap, 
  Activity, 
  ArrowRight, 
  MapPin, 
  MessageCircle, 
  Calendar,
  ChevronDown,
  Phone,
  XCircle,
  Shield,
  Snowflake,
  Quote
} from 'lucide-react';

// --- Constants ---
// Mensagem dos botões do corpo da página (Hero, jornada, mapa, rodapé, FAB).
// Difere entre acesso orgânico (/enxaqueca) e tráfego pago
// (lp.drarlanneuro.com/enxaqueca), para identificar a origem do contato.
const WHATSAPP_MSG_ORGANICO = "Olá, vim através do site de *Enxaqueca e Dores de Cabeça* e gostaria de mais informações sobre a Consulta com o Dr Arlan...";
const WHATSAPP_MSG_LP = "Olá, vim através do Google pelo site de *Enxaqueca e Dores de Cabeça* e gostaria de mais informações sobre a Consulta com o Dr Arlan...";

// Contexto com o link de WhatsApp já resolvido (orgânico vs. LP), consumido
// pelos botões espalhados pelos subcomponentes desta página.
const WhatsappLinkContext = createContext(buildWhatsappLink(WHATSAPP_MSG_ORGANICO));
const useWhatsappLink = () => useContext(WhatsappLinkContext);

const FAQS = [
  {
    q: "Botox para enxaqueca é o mesmo da estética?",
    a: "A substância é a mesma, mas os pontos de aplicação e as doses são técnicos e focados em nervos específicos da dor, diferindo completamente do uso estético."
  },
  {
    q: "Dr. Arlan atende convênios?",
    a: "O foco é o atendimento particular personalizado para garantir o tempo e a atenção necessários, mas fornecemos nota e relatório detalhado para solicitação de reembolso junto ao seu convênio."
  },
  {
    q: "Vou precisar de cirurgia na cabeça?",
    a: "Na grande maioria dos casos de enxaqueca, o tratamento é 100% clínico e não cirúrgico. A cirurgia é considerada apenas em situações muito específicas e raras."
  },
  {
    q: "Por que devo tratar minha dor de cabeça com um neurocirurgião e não com um clínico geral?",
    a: "A formação em neurocirurgia do Dr. Arlan, com especialização na USP, oferece uma visão muito mais profunda da anatomia dos nervos e do crânio. Isso permite diagnósticos de precisão cirúrgica para aplicar tratamentos clínicos (como os bloqueios e a neuromodulação) exatamente onde a dor nasce, algo que um clínico geral muitas vezes não consegue mapear."
  },
  {
    q: "Eu já tomo muitos analgésicos. Esse tratamento vai me fazer parar de tomar remédios?",
    a: "O objetivo principal é interromper o \"ciclo do rebote\", onde você toma remédio para a dor, mas ele acaba gerando uma nova crise dias depois. Através da Toxina Botulínica ou Neuromodulação, buscamos reduzir a sua dependência de medicações orais, tratando a causa neurológica e não apenas mascarando o sintoma"
  },
  {
    q: "Quanto tempo dura o efeito dos tratamentos como Botox ou Neuromodulação?",
    a: "O foco do Dr. Arlan Marques é proporcionar períodos prolongados de liberdade e qualidade de vida. No caso da Toxina Botulínica, os resultados costumam durar entre 3 a 4 meses, dependendo do organismo. Já a Neuromodulação busca \"reeducar\" o sistema nervoso para um controle de dor a longo prazo. O objetivo é que você esqueça que a dor existe, e não que precise voltar à clínica toda semana."
  },
  {
    q: "Infiltrações e Bloqueios são seguros?",
    a: "Totalmente seguros quando realizados por um especialista com o currículo do Dr. Arlan. Como neurocirurgião formado pela UFAM com subespecialidade na USP/SP, ele possui um domínio profundo da anatomia dos nervos. Além disso, os procedimentos são guiados por imagem (ultrassom ou raio-x), garantindo que a medicação atinja o ponto exato da dor com precisão milimétrica, sem riscos para as estruturas ao redor."
  }
];

// --- Components ---

// 1. UI Components
type ButtonProps = {
  variant?: 'primary' | 'outline' | 'ghost';
  icon?: any;
  shimmer?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
};

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  icon: Icon,
  shimmer = false,
  href,
  ...props 
}: ButtonProps) => {
  const baseStyles = "relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 active:scale-95 text-sm md:text-base overflow-hidden";
  
  const variants = {
    primary: "bg-sky-500 hover:bg-sky-600 text-white shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)]",
    outline: "border border-sky-500 text-sky-600 hover:bg-sky-50",
    ghost: "text-slate-600 hover:text-sky-600 hover:bg-slate-100"
  };

  const content = (
    <>
      {shimmer && (
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-[35deg] pointer-events-none" />
      )}
      
      {/* Content z-index adjustment to stay above shimmer */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {Icon && <Icon className="w-4 h-4 md:w-5 md:h-5" />}
      </span>
    </>
  );

  if (href) {
    return (
      <a 
        href={href} 
        className={`${baseStyles} ${variants[variant]} ${className}`} 
        target={props.target || (href.startsWith('http') ? '_blank' : undefined)}
        rel={props.rel || (href.startsWith('http') ? 'noopener noreferrer' : undefined)}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {content}
    </button>
  );
};

const Section = React.forwardRef<HTMLElement, { children?: React.ReactNode, className?: string, id?: string }>(({ 
  children, 
  className = '', 
  id = '' 
}, ref) => (
  <section ref={ref} id={id} className={`py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto ${className}`}>
    {children}
  </section>
));

const Badge = ({ children, className = '' }: { children?: React.ReactNode, className?: string }) => (
  <span className={`inline-block px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-600 text-xs md:text-sm font-semibold tracking-wide uppercase mb-4 ${className}`}>
    {children}
  </span>
);

// 2. Specific Sections

// Navbar com âncoras (Sintomas, Tratamentos, Sobre o Dr., Localização) —
// exclusiva da LP de tráfego pago (lp.drarlanneuro.com). Quando a página é
// acessada via /enxaqueca dentro do site principal, usamos o Navbar
// compartilhado (Home / Dores Crônicas / Enxaqueca / Neurocirurgia) em vez
// desta, para o visitante conseguir navegar para as outras páginas. Ver
// isLpHost em App.tsx e a prop `isLp` de EnxaquecaPage.
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappLink = useWhatsappLink();

  const navLinks = [
    { name: 'Sintomas', href: '#sintomas' },
    { name: 'Tratamentos', href: '#tratamentos' },
    { name: 'Sobre o Dr.', href: '#sobre' },
    { name: 'Localização', href: '#localizacao' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-16">
          <div className="flex-shrink-0 font-heading font-bold text-xl text-slate-900">
            Dr. Arlan <span className="text-sky-600">Marques</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-slate-600 hover:text-sky-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <Button variant="primary" className="!px-5 !py-2 !text-sm" href={whatsappLink}>
                Agendar Consulta
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-slate-900 p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 absolute w-full">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-slate-600 hover:text-sky-600 block px-3 py-4 rounded-md text-base font-medium text-center border-b border-slate-200/70"
              >
                {link.name}
              </a>
            ))}
            <div className="p-4">
              <Button variant="primary" className="w-full justify-center" href={whatsappLink}>
                Agendar Consulta
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  const whatsappLink = useWhatsappLink();
  return (
    <div className="relative min-h-screen flex flex-col md:flex-row bg-white">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-slate-50 z-0 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-sky-200/30 blur-[120px] rounded-full pointer-events-none z-0"></div>

      {/* Left Content (Text) - Simulating the grid container alignment */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-4 md:pl-12 lg:pl-20 pt-28 md:pt-16 pb-12 relative z-10">
        <div className="max-w-xl lg:max-w-2xl w-full mx-auto md:mr-8 md:ml-auto text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 mb-6 backdrop-blur-sm mx-auto md:mx-0">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-medium text-slate-600">Dr. Arlan Marques | CRM 4862 | RQE 2634</span>
          </div>

          <h1 className="font-heading font-bold text-2xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight mb-6 text-slate-900">
            Sua vida não pode parar em um <span className="text-sky-600">quarto escuro!</span>
          </h1>

          <p className="font-sans text-slate-600 text-lg md:text-xl leading-relaxed mb-8 max-w-lg mx-auto md:mx-0">
            Tratamentos de alta precisão para <span className="text-slate-900 font-medium">ENXAQUECA e Dores Crônicas em Manaus.</span>
            Recupere sua rotina com quem é especialista em tirar você do ciclo da dor e da dependência de analgésicos<span className="hidden md:inline"> - Atendimento Particular</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <Button icon={Calendar} className="w-fit mx-auto sm:mx-0 sm:w-auto" shimmer href={whatsappLink}>
              QUERO AGENDAR AVALIAÇÃO
            </Button>
          </div>
        </div>
      </div>

      {/* Right Content (Image) - Full Bleed */}
      <div className="w-full md:w-1/2 h-[35vh] md:h-auto md:min-h-screen relative z-0">
         {/* Mobile Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent md:hidden z-10"></div>

        {/* Desktop Side Fade (Optional: helps text readability if they overlap slightly) */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent hidden md:block z-10"></div>

        <img
          src="/images/drarlan-header.png"
          alt="Dr. Arlan Marques Neurocirurgião"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
      </div>
    </div>
  );
};


const InfiniteMarquee = () => {
  const contentMobile = "ATENDIMENTO PARTICULAR • ESPECIALISTA EM DOR • ATENDIMENTO PARTICULAR •";
  const contentDesktop = "DR. ARLAN MARQUES • NEUROCIRURGIÃO • ESPECIALISTA EM DOR •";

  return (
    <div className="bg-brand-navy py-2 overflow-hidden border-y border-brand-navy relative z-10">
      {/* Side Masks for smooth entry/exit */}
      <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-brand-navy to-transparent z-20"></div>
      <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-brand-navy to-transparent z-20"></div>

      <div className="flex whitespace-nowrap">
        {/* First Loop */}
        <div className="flex animate-marquee min-w-full shrink-0 items-center">
           {[...Array(3)].map((_, i) => (
             <span key={i} className="mx-8 text-xs md:text-sm font-heading font-semibold text-sky-400/90 tracking-widest uppercase">
               <span className="md:hidden">{contentMobile}</span>
               <span className="hidden md:inline">{contentDesktop}</span>
             </span>
           ))}
        </div>
        {/* Second Loop (Duplicate for seamless scroll) */}
        <div className="flex animate-marquee min-w-full shrink-0 items-center" aria-hidden="true">
           {[...Array(3)].map((_, i) => (
             <span key={i} className="mx-8 text-xs md:text-sm font-heading font-semibold text-sky-400/90 tracking-widest uppercase">
               <span className="md:hidden">{contentMobile}</span>
               <span className="hidden md:inline">{contentDesktop}</span>
             </span>
           ))}
        </div>
      </div>
    </div>
  );
};

const Symptoms = () => {
  const symptomsList = [
    "Dor latejante que piora com o calor de Manaus ou luz forte.",
    "Náuseas ou sensibilidade extrema a ruídos durante a crise.",
    "Sensação de \"pressão\" que não passa com remédios de farmácia.",
    "Necessidade frequente de faltar ao trabalho ou compromissos sociais."
  ];

  return (
    <Section id="sintomas" className="bg-white relative">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="font-heading font-bold text-2xl md:text-4xl text-slate-900 mb-6">
            A dor de cabeça se tornou o centro da sua rotina?
          </h2>
          <p className="text-slate-600 text-lg mb-8">
            Se você sente que sua vida é refém da próxima crise, identifique seus sintomas abaixo:
          </p>
          <div className="space-y-4">
            {symptomsList.map((item, index) => (
              <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-brand-navy border border-brand-navy hover:border-sky-500/40 transition-colors">
                <CheckCircle2 className="w-6 h-6 text-sky-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-200">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative md:block">
           {/* Abstract visual representation of pain/relief */}
           <div className="absolute inset-0 bg-sky-200/40 blur-[100px] rounded-full"></div>
           <div className="relative bg-white rounded-2xl p-8 border border-slate-200 shadow-xl animate-float">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4 text-slate-700">
                    <Activity className="text-sky-600" />
                    <span>Frequência das crises</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-sky-500 w-3/4"></div>
                </div>

                <div className="flex items-center gap-4 text-slate-700">
                    <Zap className="text-sky-600" />
                    <span>Intensidade da dor</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-red-400 w-full"></div>
                </div>
                <div className="mt-4 p-4 bg-sky-50 rounded-lg border border-sky-200 text-sky-700 text-sm">
                    Identificar os padrões é o primeiro passo para o tratamento correto.
                </div>
              </div>
           </div>
        </div>
      </div>
    </Section>
  );
};

const Mechanism = () => {
  const mechanisms = [
    {
      icon: Activity,
      title: "Toxina Botulínica Terapêutica",
      description: "O botox \"desliga\" os sinais de dor na musculatura e nervos da face/crânio, reduzindo a frequência das crises."
    },
    {
      icon: BrainCircuit,
      title: "Neuromodulação e Bloqueios",
      description: "Tecnologia avançada para \"reprogramar\" nervos supersensíveis e interromper o ciclo da dor sem necessidade de cortes."
    },
    {
      icon: Zap,
      title: "Procedimentos Guiados por Imagem",
      description: "O uso de ultrassom/raio-x para garantir que o tratamento atinja o ponto exato da dor com segurança total."
    }
  ];

  return (
    <Section id="tratamentos" className="bg-white">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <Badge>A ciência por trás do Alívio</Badge>
        <h2 className="font-heading font-bold text-2xl md:text-4xl text-slate-900 mb-4">
          Muito além da medicação comum:<br/>Tecnologia contra a dor.
        </h2>
        <p className="text-slate-600">Tratamentos minimamente invasivos focados na causa.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {mechanisms.map((item, index) => (
          <div key={index} className="bg-brand-navy p-8 rounded-xl border border-brand-navy hover:border-sky-500/50 transition-all duration-300 group hover:-translate-y-1 shadow-lg">
            <div className="w-14 h-14 bg-white/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-sky-500/20 transition-colors">
              <item.icon className="w-8 h-8 text-sky-400" />
            </div>
            <h3 className="font-heading font-bold text-xl text-white mb-3">{item.title}</h3>
            <p className="text-slate-300 leading-relaxed text-sm">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
};

const ComparisonTable = () => {
  const comparisonData = [
    {
      situation: "Efeito",
      common: "Alívio temporário (mascara o problema).",
      specialized: "Trata a origem neurológica da dor."
    },
    {
      situation: "Frequência",
      common: "Efeito rebote (a dor volta mais forte).",
      specialized: "Redução progressiva do número de crises."
    },
    {
      situation: "Saúde",
      common: "Sobrecarga de fígados e rins.",
      specialized: "Procedimentos localizados e seguros."
    }
  ];

  return (
    <section className="relative py-24 md:py-40 overflow-hidden bg-white">
      {/* 1. Linha Conectora com "Nó Nervoso" (Altura Aumentada) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-56 w-px bg-gradient-to-b from-transparent via-slate-300 to-transparent">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-sky-500 shadow-[0_0_20px_rgba(14,165,233,0.6)] animate-pulse"></div>
      </div>

      {/* 2. Gradiente de Profundidade */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-100/40 via-transparent to-transparent pointer-events-none -z-10"></div>

      {/* 3. Marca d'água Tipográfica Gigante (Fundo/Base) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none opacity-100 z-0">
         <span className="font-heading font-black text-[12vw] leading-none text-sky-100 tracking-tighter uppercase whitespace-nowrap">
            NEUROCIRURGIA
         </span>
      </div>


      {/* Main Content (Z-Index 10 para ficar sobre os efeitos, com margem top para não encostar na linha) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 mt-24">
        <div className="bg-slate-50 rounded-3xl border border-slate-200 p-1 md:p-8 backdrop-blur-sm shadow-xl">
          <div className="text-center mb-10 pt-8 md:pt-0 px-4">
            <h2 className="font-heading font-bold text-xl md:text-3xl text-slate-900">Por que buscar um especialista?</h2>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto rounded-xl">
            <table className="w-full min-w-[600px] border-collapse">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="p-4 text-left text-slate-500 font-medium w-1/4">Situação</th>
                  <th className="p-4 text-left text-red-600/80 font-bold w-1/3">Automedicação Comum</th>
                  <th className="p-4 text-left text-sky-600 font-bold w-1/3">Tratamento Especializado</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((item, idx) => (
                  <tr key={idx} className="border-b border-slate-200 hover:bg-white transition-colors">
                    <td className="p-4 text-slate-700 font-medium">{item.situation}</td>
                    <td className="p-4 text-slate-500">{item.common}</td>
                    <td className="p-4 text-slate-900 font-medium">{item.specialized}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards View */}
          <div className="md:hidden space-y-4 px-4 pb-8">
            {comparisonData.map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col gap-4">
                <h3 className="font-heading font-bold text-xl text-slate-900 border-b border-slate-200 pb-2">
                  {item.situation}
                </h3>

                {/* Common Block */}
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <div className="flex items-center gap-2 mb-2">
                     <span className="text-xs font-bold text-red-600/80 uppercase tracking-wider">Automedicação Comum</span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.common}</p>
                </div>

                {/* Specialized Block */}
                <div className="bg-brand-navy rounded-lg p-4 border border-brand-navy relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 opacity-10">
                    <CheckCircle2 size={40} className="text-sky-400" />
                  </div>
                  <div className="flex items-center gap-2 mb-2 relative z-10">
                     <CheckCircle2 size={16} className="text-sky-400" />
                     <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Tratamento Especializado</span>
                  </div>
                  <p className="text-white font-medium text-sm leading-relaxed relative z-10">{item.specialized}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Journey = () => {
  const whatsappLink = useWhatsappLink();
  const steps = useMemo(
    () => [
      {
        number: "1",
        title: "Mapeamento Detalhado",
        desc: "Uma investigação profunda do seu histórico de dor, gatilhos e tratamentos anteriores.",
      },
      {
        number: "2",
        title: "Diagnóstico de Precisão",
        desc: "Avaliação técnica para identificar o tipo exato de cefaleia ou enxaqueca.",
      },
      {
        number: "3",
        title: "Plano de Ataque Personalizado",
        desc: "Definição da melhor tecnologia (Botox, Bloqueio ou Neuromodulação) para o seu caso específico.",
      },
    ],
    []
  );

  // Container que “dirige” o scroll progress
  const containerRef = useRef<HTMLElement | null>(null);

  // Bloco que define a altura do beam (apenas onde estão os steps)
  const stepsWrapRef = useRef<HTMLDivElement | null>(null);

  // Medidas do beam (topo e altura) dentro do wrap
  const [beam, setBeam] = useState({ top: 0, height: 0 });

  // Progresso de scroll dentro da seção
  const { scrollYProgress } = useScroll({
    // framer aceita HTMLElement/RefObject; aqui usamos o ref do Section via callback
    target: containerRef as any,
    offset: ["start 20%", "end 80%"], // ajuste fino se quiser o beam começar antes/depois
  });

  // Linha ativa cresce de 0 -> altura medida
  const activeHeight = useTransform(scrollYProgress, [0, 1], [0, beam.height]);
  const activeOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);

  // Medir topo/altura do beam com ResizeObserver (não quebra quando imagens/fontes carregam)
  useEffect(() => {
    const wrap = stepsWrapRef.current;
    if (!wrap) return;

    const measure = () => {
      const circles = wrap.querySelectorAll<HTMLElement>("[data-journey-circle]");
      if (!circles.length) return;

      const wrapRect = wrap.getBoundingClientRect();
      const first = circles[0].getBoundingClientRect();
      const last = circles[circles.length - 1].getBoundingClientRect();

      // centro vertical do primeiro e do último círculo (para a linha ficar “bonita”)
      const firstCenterY = first.top - wrapRect.top + first.height / 2;
      const lastCenterY = last.top - wrapRect.top + last.height / 2;

      setBeam({
        top: Math.max(0, firstCenterY),
        height: Math.max(0, lastCenterY - firstCenterY),
      });
    };

    measure();

    const ro = new ResizeObserver(() => measure());
    ro.observe(wrap);

    // também mede ao terminar fontes/imagens (segurança extra)
    window.addEventListener("load", measure);
    window.addEventListener("resize", measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("load", measure);
      window.removeEventListener("resize", measure);
    };
  }, [steps]);

  return (
    <Section
      className="bg-white relative"
      id="journey"
      // pega o elemento real para o useScroll
      ref={(el: any) => {
        containerRef.current = el as HTMLElement | null;
      }}
    >
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none opacity-100 z-0">
        <span className="font-heading font-black text-[10vw] md:text-[8vw] leading-none text-sky-100 tracking-tighter uppercase whitespace-nowrap">
          CONTROLE DA DOR
        </span>
      </div>

      <div className="max-w-7xl mx-auto py-10 px-4 md:px-8 lg:px-10 text-center relative z-10">
        <h2 className="font-heading font-bold text-2xl md:text-4xl text-slate-900 mb-4">
          O que esperar da sua consulta?
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base mb-12">
          Um processo estruturado para entender a sua dor e propor soluções reais.
        </p>
      </div>

      {/* WRAP dos steps (onde o beam fica “preso”) */}
      <div ref={stepsWrapRef} className="max-w-4xl mx-auto space-y-5 relative z-10 px-4 md:px-0">
        {/* Beam (MOBILE ONLY) */}
        <div className="md:hidden pointer-events-none absolute left-[24px] top-0 bottom-0 z-0">
          {/* Linha base (cinza) */}
          <div
            className="absolute w-[2px] bg-slate-300 rounded-full"
            style={{
              top: beam.top,
              height: beam.height,
            }}
          />

          {/* Linha ativa (cresce com scroll) */}
          <motion.div
            className="absolute w-[2px] rounded-full bg-sky-500/90 shadow-[0_0_18px_rgba(14,165,233,0.35)]"
            style={{
              top: beam.top,
              height: activeHeight,
              opacity: activeOpacity,
            }}
          />
        </div>

        {steps.map((step, idx) => (
          <div key={idx} className="flex gap-6 md:gap-8 items-start relative z-10">
            {/* Number Circle */}
            <div
              data-journey-circle
              className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full bg-brand-navy border border-brand-navy flex items-center justify-center shadow-lg shadow-sky-900/10 relative"
            >
              <span className="text-sky-400 font-heading font-bold text-lg md:text-2xl">
                {step.number}
              </span>
            </div>

            {/* Card */}
            <div className="flex-1 bg-brand-navy p-4 md:p-5 rounded-2xl border border-brand-navy shadow-lg hover:border-sky-500/40 transition-colors">
              <h3 className="font-heading font-bold text-lg md:text-xl text-white mb-1">
                {step.title}
              </h3>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                {step.desc}
              </p>
            </div>
          </div>
        ))}

        <AtendimentoParticular />

        <div className="text-center mt-12 pb-2">
          <Button
            variant="primary"
            icon={ArrowRight}
            className="w-fit md:w-auto shadow-lg shadow-sky-500/10"
            shimmer
            href={whatsappLink}
          >
            Começar minha jornada
          </Button>
        </div>
      </div>
    </Section>
  );
};


const Authority = () => {
  const institutions = [
    { name: "Hospital Check-Up e Hospital Adventista", role: "Neurocirurgião do corpo clínico." },
    { name: "FCECON/AM", role: "Especialista no serviço de Neuro-oncologia." },
    { name: "Hospital João Lúcio", role: "Atuação no serviço de Neuro-traumatologia." },
    { name: "HUGV", role: "Preceptor no serviço de residência médica de Neurocirurgia." }
  ];

  return (
    <Section id="sobre" className="bg-slate-50 py-20">
      <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 relative overflow-hidden shadow-sm">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-100/60 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

        <div className="flex flex-col md:flex-row items-start gap-12 relative z-10">
          <div className="w-full md:w-1/3 md:sticky md:top-24">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden border-2 border-slate-200 shadow-xl bg-slate-50">
              <img
                src="/images/drarlan-hospital.jpg"
                alt="Dr. Arlan Marques"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="w-full md:w-2/3">
            <h2 className="font-heading font-bold text-2xl md:text-4xl text-slate-900 mb-6">
              Experiência que traz segurança e precisão.
            </h2>

            <div className="space-y-6 text-slate-700 text-lg leading-relaxed">
              <p>
                Dr. Arlan Marques é médico neurocirurgião formado pela Universidade Federal do Amazonas (UFAM), com mais de <strong className="text-sky-600">15 anos de atuação especializada</strong> no sistema nervoso e no controle da dor. Sua trajetória é marcada pela excelência técnica, com residência médica em Neurocirurgia pelo HUGV e subespecialização em Neuro-oncologia pelo prestigiado Hospital das Clínicas da USP (São Paulo).
              </p>
              <p>
                Aliando o rigor acadêmico à inovação, possui pós-graduação em Tratamento da Dor pela SINPAIN, o que o permite oferecer as técnicas mais modernas para o alívio de enxaquecas e dores crônicas sem a necessidade imediata de intervenções invasivas.
              </p>
            </div>

            <div className="border-l-4 border-sky-500 pl-6 py-4 my-8 italic text-slate-600 bg-slate-50 rounded-r-lg">
              "Minha filosofia é buscar o melhor resultado com o menor impacto possível na vida do paciente. Trato a pessoa, não apenas o sintoma, priorizando tratamentos clínicos avançados e reservando a cirurgia apenas como a última alternativa terapêutica."
            </div>

            <div className="pt-4 border-t border-slate-200">
              <p className="text-sm text-sky-600 uppercase tracking-wider font-semibold mb-4">Instituições e Atuação Regional</p>
              <p className="text-slate-600 mb-6 text-base">Sua experiência é consolidada pela atuação nas mais respeitadas instituições de saúde de Manaus:</p>

              <ul className="space-y-3">
                {institutions.map((inst, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2.5 flex-shrink-0"></span>
                    <span className="text-slate-700">
                      <strong className="text-slate-900">{inst.name}:</strong> {inst.role}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

const DEPOIMENTOS = [
  {
    nome: 'Malena',
    tag: 'Enxaqueca Crônica',
    texto: 'Convivia há anos com enxaqueca crônica, dor praticamente todos os dias, e os remédios já não faziam mais efeito. Com o Dr. Arlan fiz o bloqueio para cefaleia e a mudança foi muito significativa: a intensidade e a frequência das crises diminuíram, e hoje vivo sem precisar tomar remédio para dor todos os dias.',
  },
  {
    nome: 'Henrique',
    tag: 'Dor de Cabeça Crônica',
    texto: 'Meu pai está bem melhor das dores de cabeça. Desde sexta ele tem estado muito melhor das dores. Não que ele não sinta, mas são muito menos intensas e também bem menos frequentes que antes.',
  },
  {
    nome: 'Larissa',
    tag: 'Enxaqueca',
    texto: 'Melhorei bastante. Dor de cabeça ainda estou sentindo, mas de forma bem sutil comparado a como eu estava sentindo antes. Estou me sentindo mais viva, estou me sentindo melhor.',
  },
];

const Testimonials = () => {
  return (
    <Section className="bg-slate-50">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="font-heading font-bold text-2xl md:text-4xl text-slate-900 mb-2">DEPOIMENTOS</h2>
        <p className="text-slate-600">Confira o que diz os pacientes!</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {DEPOIMENTOS.map((d, i) => (
          <div key={i} className="bg-brand-navy border border-white/10 rounded-2xl p-6">
            <Quote className="w-6 h-6 text-sky-400 mb-3" />
            <p className="text-slate-300 text-sm leading-relaxed mb-4">{d.texto}</p>
            <p className="text-white font-medium text-sm">Paciente {d.nome}</p>
            <p className="text-sky-400 text-xs">{d.tag}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

const Location = () => {
  const images = [
    "/images/consultorio-01.webp",
    "/images/consultorio-03.webp",
    "/images/consultorio-05.webp",
    "/images/consultorio-06.webp"
  ];

  return (
    <Section id="localizacao" className="bg-white">
      <div className="text-center mb-12">
        <Badge>Nosso Consultório</Badge>
        <h2 className="font-heading font-bold text-2xl md:text-4xl text-slate-900 mb-4">
          Atendimento Premium na Ponta Negra
        </h2>
        <p className="text-slate-600">Britannia Park Offices - Manaus/AM</p>
      </div>

      {/* --- DESKTOP LAYOUT (Static, varied heights) --- */}
      <div className="hidden md:flex gap-4 items-center justify-center mb-12 h-96">
        {images.map((src, idx) => {
          // Indices 1 and 2 are center (taller)
          const isCenter = idx === 1 || idx === 2;
          return (
            <div
              key={idx}
              className={`relative rounded-2xl overflow-hidden transition-all duration-500 hover:opacity-100 border border-slate-200 group
                ${isCenter
                  ? 'h-96 flex-[1.2] shadow-2xl shadow-sky-900/10 z-10'
                  : 'h-72 flex-1 opacity-70 hover:flex-[1.1] grayscale hover:grayscale-0'
                }
              `}
            >
              <img src={src} alt={`Consultório ${idx + 1}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
          )
        })}
      </div>

      {/* --- MOBILE LAYOUT (Infinite Carousel) --- */}
      <div className="md:hidden overflow-hidden -mx-4 mb-12 relative">
        {/* Side masks for seamless fade effect */}
        <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        <div className="flex w-max">
           {/* Track 1 */}
           <div className="flex animate-marquee shrink-0">
             {images.map((src, idx) => (
                <div key={`track1-${idx}`} className="w-72 h-64 flex-shrink-0 mx-2 rounded-xl overflow-hidden border border-slate-200 relative">
                  <img src={src} alt="Consultório" loading="lazy" className="w-full h-full object-cover" />
                </div>
             ))}
           </div>
           {/* Track 2 (Duplicate for loop) */}
           <div className="flex animate-marquee shrink-0">
             {images.map((src, idx) => (
                <div key={`track2-${idx}`} className="w-72 h-64 flex-shrink-0 mx-2 rounded-xl overflow-hidden border border-slate-200 relative">
                  <img src={src} alt="Consultório" loading="lazy" className="w-full h-full object-cover" />
                </div>
             ))}
           </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center bg-slate-50 p-6 rounded-2xl border border-slate-200">
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <MapPin className="text-sky-600 w-6 h-6 mt-1 flex-shrink-0" />
            <div>
              <h4 className="text-slate-900 font-bold text-lg">Localização Privilegiada</h4>
              <p className="text-slate-600">Estacionamento fácil e segurança para seu conforto.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
             <Calendar className="text-sky-600 w-6 h-6 mt-1 flex-shrink-0" />
             <div>
                <h4 className="text-slate-900 font-bold text-lg">Agendamento Flexível</h4>
                <p className="text-slate-600">Horários que se adaptam à sua rotina.</p>
             </div>
          </div>
          <div className="flex items-start gap-4">
             <Snowflake className="text-sky-600 w-6 h-6 mt-1 flex-shrink-0" />
             <div>
                <h4 className="text-slate-900 font-bold text-lg">Ambiente Climatizado</h4>
                <p className="text-slate-600">Conforto térmico e instalações modernas.</p>
             </div>
          </div>
          <div className="flex items-start gap-4">
             <Shield className="text-sky-600 w-6 h-6 mt-1 flex-shrink-0" />
             <div>
                <h4 className="text-slate-900 font-bold text-lg">Privacidade Total</h4>
                <p className="text-slate-600">Discrição e isolamento acústico garantidos.</p>
             </div>
          </div>
        </div>
        <div className="relative h-full min-h-[300px] w-full rounded-xl overflow-hidden bg-slate-200 flex items-center justify-center group cursor-pointer">
           {/* Placeholder for Map */}
           <div className="absolute inset-0 bg-white opacity-40 z-10 group-hover:opacity-20 transition-opacity"></div>
           <img src="/images/googlemaps.webp" alt="Mapa" loading="lazy" className="absolute inset-0 w-full h-full object-cover blur-[2px]" />
           <Button className="relative z-20 shadow-xl" icon={MapPin}>
              CLIQUE PARA ABRIR NO GOOGLE MAPS
           </Button>
        </div>
      </div>
    </Section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section className="max-w-4xl md:max-w-[52rem] mx-auto bg-white">
      <div className="text-center mb-12">
        <h2 className="font-heading font-bold text-xl md:text-3xl text-slate-900 mb-4">Dúvidas Frequentes</h2>
      </div>

      <div className="space-y-4">
        {FAQS.map((faq, idx) => (
          <div
            key={idx}
            className="border border-brand-navy rounded-xl bg-brand-navy overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
            >
              <span className="font-heading font-semibold text-white text-lg">{faq.q}</span>
              <ChevronDown className={`w-5 h-5 text-sky-400 transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`} />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === idx ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <div className="p-6 pt-0 text-slate-300 leading-relaxed border-t border-white/10 mt-2">
                {faq.a}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

const Footer = () => {
  const whatsappLink = useWhatsappLink();
  return (
    <footer className="bg-brand-navy border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
        <div className="max-w-2xl mx-auto mb-12">
          <h2 className="font-heading font-bold text-2xl md:text-4xl text-white mb-6">
            Não deixe a dor decidir como será o seu dia.
          </h2>
          <Button variant="primary" className="w-fit mx-auto sm:w-auto text-lg py-4 px-6 md:px-8" icon={MessageCircle} shimmer href={whatsappLink}>
            AGENDAR CONSULTA VIA WHATSAPP
          </Button>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-300 text-sm gap-4">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
            <span className="font-semibold text-white">Dr. Arlan Marques</span>
            <span className="hidden md:inline">•</span>
            <span>CRM 4862 | RQE 2634</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={14} />
            <span>Britannia Park Offices - Manaus/AM</span>
          </div>
        </div>

        <div className="mt-8 text-xs text-slate-400">
          &copy; {new Date().getFullYear()} Dr. Arlan Marques. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

// 3. Main Layout Assembly

export default function EnxaquecaPage({ isLp = true }: { isLp?: boolean }) {
  const whatsappLink = buildWhatsappLink(isLp ? WHATSAPP_MSG_LP : WHATSAPP_MSG_ORGANICO);

  return (
    <WhatsappLinkContext.Provider value={whatsappLink}>
    <main className="bg-white min-h-screen font-sans selection:bg-sky-500 selection:text-white overflow-x-hidden">
      <Seo
        title="Tratamento de Enxaqueca e Dores de Cabeça em Manaus | Dr. Arlan Marques"
        description="Tratamentos de alta precisão para enxaqueca e dores crônicas de cabeça em Manaus, sem cirurgia: toxina botulínica, bloqueios e neuromodulação, com o neurocirurgião Dr. Arlan Marques."
        path="/enxaqueca"
        canonicalPath="/enxaqueca"
        noindex={isLp}
        jsonLd={[physicianSchema, faqSchema(FAQS)]}
      />
      {isLp ? <Navbar /> : <SiteNavbar whatsappMessage={WHATSAPP_MSG_ORGANICO} />}
      <Hero />
      <InfiniteMarquee />
      <Symptoms />
      <Mechanism />
      <ComparisonTable />
      <Journey />
      <Authority />
      <Testimonials />
      <Location />
      <FAQ />
      <Footer />

      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-green-500/30 transition-all active:scale-95 flex items-center justify-center"
        >
          <MessageCircle className="w-6 h-6" />
        </a>
      </div>
    </main>
    </WhatsappLinkContext.Provider>
  );
}
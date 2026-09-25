import React from 'react';
import { SiteLayout } from '../components/SiteLayout';
import { Section, Button } from '../components/ui';
import { SobreDrArlan } from '../components/SobreDrArlan';
import { CuidadoAlemDaNeurocirurgia } from '../components/CuidadoAlemDaNeurocirurgia';
import { LocalAtendimento } from '../components/LocalAtendimento';
import { AtendimentoParticular } from '../components/AtendimentoParticular';
import { AcompanhamentoPosOperatorio } from '../components/AcompanhamentoPosOperatorio';
import { Contato } from '../components/Contato';
import { Hero } from '../components/Hero';
import { Seo, physicianSchema, breadcrumbSchema } from '../components/Seo';
import { Brain, CheckCircle2, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import { buildWhatsappLink } from '../lib/whatsapp';
import { LpAnchorNavbar } from '../components/LpAnchorNavbar';

const LP_NAV_LINKS = [
  { name: 'Sintomas', href: '#sintomas' },
  { name: 'Tratamentos', href: '#tratamentos' },
  { name: 'Sobre o Dr.', href: '#sobre' },
  { name: 'Localização', href: '#localizacao' },
];

// Mensagem dos botões da página. Difere entre acesso orgânico
// (/neurocirurgiao) e tráfego pago (lp.drarlanneuro.com/neurocirurgiao),
// para identificar a origem do contato.
const WHATSAPP_MSG_ORGANICO = 'Olá, vim através do site do Dr Arlan e gostaria de mais informações sobre aneurisma / tumor cerebral!';
const WHATSAPP_MSG_LP = 'Olá, vim através do Google pelo site de aneurisma / tumor cerebral e gostaria de mais informações...';

const DIAGNOSTICOS = [
  { titulo: 'Aneurisma Cerebral', texto: 'Dilatação na parede de uma artéria do cérebro, muitas vezes silenciosa e descoberta em exames de rotina.' },
  { titulo: 'Hemorragia Subaracnóidea', texto: 'Sangramento causado pela ruptura de um aneurisma - Emergência.' },
  { titulo: 'Meningiomas', texto: 'Tumores, geralmente benignos, das membranas que envolvem o cérebro.' },
  { titulo: 'Gliomas', texto: 'Tumores que se originam no próprio tecido cerebral.' },
  { titulo: 'Metástases Cerebrais', texto: 'Lesões no cérebro originadas de tumores em outras partes do corpo.' },
];

const SINTOMAS = [
  { titulo: 'Dor de Cabeça Súbita e Intensa', texto: '"A pior dor de cabeça da vida" - Sinal de Urgência.' },
  { titulo: 'Dor de Cabeça Progressiva', texto: 'Que piora com o tempo, pior ao acordar ou acompanhada de vômitos.' },
  { titulo: 'Crises Convulsivas', texto: 'Principalmente a primeira crise na vida adulta.' },
  { titulo: 'Alterações na Visão', texto: 'Visão dupla, embaçada ou perda de parte do campo visual.' },
  { titulo: 'Fraqueza ou Dormência', texto: 'Em um lado do corpo, no rosto, braço ou perna.' },
  { titulo: 'Mudanças na Fala ou no Comportamento', texto: 'Confusão, esquecimento ou dificuldade para falar.' },
];

const TRATAMENTOS = [
  { titulo: 'Cirurgia de Aneurisma Cerebral', texto: 'Tratamento do aneurisma para excluí-lo da circulação e prevenir sangramentos, com planejamento individualizado para cada caso.' },
  { titulo: 'Aneurisma Descoberto em Exame', texto: 'Avaliação do risco de ruptura para definir, com clareza, entre acompanhamento com exames ou tratamento preventivo.' },
  { titulo: 'Cirurgia de Tumor Cerebral', texto: 'Remoção da lesão com o máximo de segurança, planejada a partir dos exames de imagem para preservar as funções neurológicas.' },
  { titulo: 'Microcirurgia Cerebral', texto: 'Uso do microscópio cirúrgico para maior precisão e menor agressão aos tecidos saudáveis.' },
  { titulo: 'Biópsia Cerebral', texto: 'Obtenção de amostra da lesão para um diagnóstico preciso e a definição do melhor tratamento.' },
  { titulo: 'Segunda Opinião', texto: 'Revisão de exames e laudos para quem recebeu um diagnóstico e quer segurança antes de decidir.' },
];

const DEPOIMENTOS = [
  {
    nome: 'Maria Cecília',
    tag: 'Cirurgia Aneurisma',
    texto: `Descobrir que tinha um aneurisma foi um choque, jamais tinha sentido nada e ter sofrido uma hemorragia cerebral já foi um grande susto na minha vida.

Pensei na minha família... pensei nos meus filhos...

Recebi orientação clara, acompanhamento constante e segurança. Decidi realizar a cirurgia e tudo aconteceu conforme o Dr Arlan disse e sou muito grata a Deus que deu tudo certo.

Hoje vivo com tranquilidade, e com a certeza de que fui muito bem cuidada.`,
  },
  {
    nome: 'Beatriz',
    tag: 'Cirurgia Tumor Cerebral',
    texto: `Quando ouvi o diagnóstico de tumor cerebral eu senti medo, medo do que podia acontecer, de não resistir a cirurgia ou ficar com sequelas graves

Mas também encontrei acolhimento e cuidado com o Dr Arlan, me passou muita confinaça.

A cirurgia foi um sucesso.
A recuperação superou minhas expectativas.
Hoje sigo em frente e com muita gratidão por cada passo desse caminho, levo uma vida praticamente normal.`,
  },
  {
    nome: 'José',
    tag: 'Cirurgia Neuralgia de Trigêmio',
    texto: `Eu ja acordava cansado, a dor dominava meus dias e minhas noites já a vários anos e cada vez pior.

Sofria a vários anos com diagnóstico de neuralgia de trigêmeo (uma dor lancinante)

Depois do tratamento intervencionista para meu caso que foi a radiofrequência para nervo trigêmeo, já senti resultado.

Um alívio, que me fez voltar a sorris, a brincar com meus netos e até voltar a sonha, graças ao Dr essa dor ficou pra trás!`,
  },
  {
    nome: 'Antônio',
    tag: 'Cirurgia Coluna',
    texto: `Eu cheguei ja fazer vários tratamentos e já estava cansado. A dor na coluna fazia parte de todos os meus dias. Tirava meu sono... meu trabalho... minha vida.

Depois da cirurgia... tudo começou a mudar. A recuperação veio aos poucos... mas veio.

Hoje eu caminho sem dor... durmo melhor... vivo melhor.

Isso não é só uma cirurgia, apesar de ter alguns medos ao saber que precisava de cirurgia foi a melhor decisão que tomei para poder hj dizer que a cirurgia foi o passo para recuperar a própria vida.`,
  },
];

export default function NeurocirurgiaoPage({ isLp = false }: { isLp?: boolean }) {
  const WHATSAPP_MSG = isLp ? WHATSAPP_MSG_LP : WHATSAPP_MSG_ORGANICO;
  const whatsappLink = buildWhatsappLink(WHATSAPP_MSG);

  return (
    <SiteLayout
      whatsappMessage={WHATSAPP_MSG}
      navbar={isLp ? <LpAnchorNavbar navLinks={LP_NAV_LINKS} whatsappMessage={WHATSAPP_MSG} /> : undefined}
    >
      <Seo
        title="Cirurgia de Aneurisma e Tumor Cerebral em Manaus | Dr. Arlan Marques"
        description="Neurocirurgião em Manaus especializado em aneurismas e tumores cerebrais. Diagnóstico preciso, cirurgia com planejamento individualizado e acompanhamento do diagnóstico à recuperação, com Dr. Arlan Marques."
        path="/neurocirurgiao"
        jsonLd={[
          physicianSchema,
          breadcrumbSchema([
            { name: 'Início', path: '/' },
            { name: 'Neurocirurgia', path: '/neurocirurgiao' },
          ]),
        ]}
      />
      <Hero
        title="Neurocirurgião em Manaus para Aneurismas e Tumores Cerebrais"
        description={
          <>
            Diagnóstico preciso e cirurgia com <strong className="font-semibold">Planejamento Individualizado</strong> para
            <em className="text-sky-300 not-italic"> aneurismas cerebrais e tumores do sistema nervoso.</em> Segurança
            e clareza em cada decisão, do diagnóstico à recuperação.
          </>
        }
        ctaLabel="Agendar Avaliação"
        ctaHref={whatsappLink}
      />

      {/* Experiência */}
      <div className="bg-brand-navy border-t border-white/10">
        <Section className="py-6 md:py-8">
          <div className="grid md:grid-cols-[auto_1fr] gap-8 md:gap-16 items-center">
            <div className="hidden md:flex md:flex-col items-start justify-center md:border-r md:border-white/10 md:pr-16">
              <span className="font-heading text-6xl md:text-7xl font-black text-white leading-none tracking-tight">
                <span className="text-sky-400">+</span>15
              </span>
              <span className="text-sky-400 font-medium uppercase tracking-wide text-sm md:text-base">
                anos de experiência
              </span>
            </div>

            <div>
              <h2 className="font-heading text-xl md:text-3xl font-bold text-white mb-4">
                <span className="md:hidden">
                  <span className="text-sky-400">+</span>15 Anos de Experiência em Neurocirurgia
                </span>
              </h2>
              <p className="text-slate-300 leading-relaxed">
                Dr. Arlan Marques une sólida formação acadêmica à prática constante em neurocirurgia.
              </p>
              <p className="text-slate-300 leading-relaxed mt-3">
                Diante de um diagnóstico de aneurisma ou tumor cerebral, o foco é explicar com
                clareza cada opção, avaliar o risco real de cada caso e indicar a cirurgia apenas
                quando ela é o melhor caminho, com planejamento cuidadoso para preservar as funções
                neurológicas.
              </p>
            </div>
          </div>

          <AtendimentoParticular />
        </Section>
      </div>

      {/* Diagnóstico e Sintomas */}
      <Section id="sintomas">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-heading text-2xl md:text-4xl font-bold text-slate-900 mb-2">
            Aneurismas, Tumores Cerebrais e Sinais de Alerta
          </h2>
          <p className="text-slate-600">Saiba quando é a hora de buscar uma avaliação especializada.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="border border-slate-300 rounded-2xl p-6">
            <h3 className="text-sky-600 font-heading font-bold uppercase text-sm tracking-wide mb-4">Diagnóstico</h3>
            <ul className="space-y-4">
              {DIAGNOSTICOS.map((d) => (
                <li key={d.titulo} className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                  <p className="text-slate-700 text-sm"><strong className="text-slate-800">{d.titulo}:</strong> {d.texto}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-slate-300 rounded-2xl p-6">
            <h3 className="text-sky-600 font-heading font-bold uppercase text-sm tracking-wide mb-4">Sintomas</h3>
            <ul className="space-y-4">
              {SINTOMAS.map((s) => (
                <li key={s.titulo} className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                  <p className="text-slate-700 text-sm"><strong className="text-slate-800">{s.titulo}:</strong> {s.texto}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-center text-slate-600 text-sm mt-8 max-w-xl mx-auto">
          Dores de cabeça frequentes, que vão e voltam, costumam ter outra causa, como a enxaqueca.{' '}
          <Link to="/enxaqueca" className="text-sky-700 font-medium underline underline-offset-2">
            Conheça o tratamento
          </Link>
        </p>
      </Section>

      {/* Tratamentos e Cirurgias */}
      <Section id="tratamentos">
        <h2 className="font-heading text-2xl md:text-4xl font-bold text-slate-900 text-center mb-12">
          Tratamentos Especializados em Neurocirurgia Cerebral
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRATAMENTOS.map((t) => (
            <div key={t.titulo} className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden">
              <div className="h-24 bg-brand-navy flex items-center justify-center">
                <Brain className="w-10 h-10 text-sky-400" />
              </div>
              <div className="p-6">
                <h3 className="font-heading text-lg font-bold text-slate-900 mb-2">{t.titulo}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{t.texto}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 max-w-md mx-auto">
          <h4 className="text-sky-600 font-heading font-bold uppercase text-sm tracking-wide mb-3 text-center">Dentre outros como:</h4>
          <ul className="space-y-2">
            <li className="flex items-center gap-3 justify-center">
              <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0" />
              <Link to="/neurocirurgiao-coluna-e-hernia" className="text-sky-700 text-sm underline underline-offset-2">
                Cirurgia de Coluna e Hérnia de Disco
              </Link>
            </li>
            <li className="flex items-center gap-3 justify-center">
              <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0" />
              <span className="text-slate-700 text-sm">Neuralgia do Trigêmeo</span>
            </li>
          </ul>
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-700 mb-4">Agende sua avaliação e tire suas dúvidas com quem vai cuidar do seu caso.</p>
          <Button href={whatsappLink} className="mx-auto">Agendar Avaliação</Button>
        </div>
      </Section>

      <AcompanhamentoPosOperatorio whatsappLink={whatsappLink} />

      {/* Depoimentos */}
      <div className="bg-white">
        <Section>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-heading text-2xl md:text-4xl font-bold text-slate-900 mb-2">DEPOIMENTOS</h2>
            <p className="text-slate-600">Confira o que diz os Pacientes!</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {DEPOIMENTOS.map((d) => (
              <div key={d.nome} className="bg-brand-navy border border-white/10 rounded-2xl p-6">
                <Quote className="w-6 h-6 text-sky-400 mb-3" />
                <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line mb-4">{d.texto}</p>
                <p className="text-white font-medium text-sm">Paciente {d.nome}</p>
                <p className="text-sky-400 text-xs">{d.tag}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>

      <SobreDrArlan />
      <CuidadoAlemDaNeurocirurgia />
      <LocalAtendimento />
      <Contato whatsappMessage={WHATSAPP_MSG} />
    </SiteLayout>
  );
}

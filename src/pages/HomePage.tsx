import React from 'react';
import { SiteLayout } from '../components/SiteLayout';
import { Section, Button, Badge } from '../components/ui';
import { Hero } from '../components/Hero';
import { SobreDrArlan } from '../components/SobreDrArlan';
import { CuidadoAlemDaNeurocirurgia } from '../components/CuidadoAlemDaNeurocirurgia';
import { LocalAtendimento } from '../components/LocalAtendimento';
import { AtendimentoParticular } from '../components/AtendimentoParticular';
import { Contato } from '../components/Contato';
import { WhatsappFloatButton } from '../components/WhatsappFloatButton';
import { Seo, physicianSchema, breadcrumbSchema } from '../components/Seo';
import { CheckCircle2 } from 'lucide-react';
import { buildWhatsappLink } from '../lib/whatsapp';

const WHATSAPP_MSG = "Olá, vim pelo site e gostaria de mais informações sobre o atendimento para tratamento de dores com o Dr Arlan...";

const PROCEDIMENTOS = [
  {
    titulo: 'Infiltrações e Bloqueios',
    imagem: '/images/wp/infiltracao-bloqueio-joelho.avif',
    texto: 'Tratamentos minimamente invasivos que aliviam dores de nervos, articulações e músculos. As infiltrações e bloqueios ajudam no controle rápido da dor, trazendo conforto e qualidade de vida sem necessidade de cirurgia.',
  },
  {
    titulo: 'Toxina Botulínica',
    imagem: '/images/wp/dor-de-cabeca-01.png',
    texto: 'Indicada para quem sofre com enxaqueca frequente ou dores musculares intensas. A aplicação da toxina botulínica reduz as crises de dor, melhora a rotina e devolve bem-estar com segurança.',
  },
  {
    titulo: 'Procedimentos guiados por imagem',
    imagem: '/images/wp/exame-raio-x-01.png',
    texto: 'Com auxílio de ultrassom ou raio-X, esses procedimentos tratam a dor de forma precisa e segura. Opções como radiofrequência e neuromodulação aliviam dores articulares e neuropáticas de maneira eficaz, sem cortes.',
  },
  {
    titulo: 'Neuromodulação',
    imagem: '/images/wp/neuromodulacao-espinhal-01.png',
    texto: 'Tecnologia avançada para o controle da dor crônica. A neuromodulação estimula nervos ou a medula espinhal, reduzindo dores persistentes e devolvendo ao paciente liberdade para viver sem limitações.',
  },
  {
    titulo: 'Dentre Outros...',
    imagem: '/images/wp/dentre-outros-01.png',
    texto: '',
  },
];

const DOENCAS = [
  'Aneurismas', 'Derrames', 'Epilepsia', 'Gliomas', 'Hérnias de disco',
  'Hidrocefalia', 'Isquemia cerebral', 'Obstrução arterial',
  'Traumas e dor crônica na coluna vertebral', 'Traumatismos cranianos',
  'Tumores (cerebrais, da coluna e da medula)', 'Outro...',
];

export default function HomePage() {
  const whatsappLink = buildWhatsappLink(WHATSAPP_MSG);

  return (
    <SiteLayout whatsappMessage={WHATSAPP_MSG}>
      <Seo
        title="Dr. Arlan Marques | Especialista em Dores Crônicas e Agudas em Manaus"
        description="Neurocirurgião especialista em tratamentos clínicos e não cirúrgicos para enxaqueca, dor lombar e articulações. Atendimento em Manaus – AM. Mais de 15 anos de experiência."
        path="/"
        jsonLd={[
          physicianSchema,
          breadcrumbSchema([{ name: 'Início', path: '/' }]),
        ]}
      />
      <Hero
        title="Tratamentos Especializados para Dores Crônicas e Agudas"
        description={
          <>
            Dr. Arlan Marques – Neurocirurgião especialista em{' '}
            <em className="font-semibold not-italic">tratamentos clínicos e não cirúrgicos</em>{' '}
            para Enxaqueca, dor na Lombar, Articulações etc. Atendimento em Manaus – AM!
          </>
        }
        ctaLabel="Agendar pelo WhatsApp"
        ctaHref={whatsappLink}
        image="/images/dr-arlan-02.webp"
        imageMobile="/images/dr-arlan-02.webp"
        // A foto é horizontal com o doutor à direita do centro; no recorte
        // vertical do mobile é preciso ancorar nele, senão sobra só o ombro.
        imagePosition="60% 25%"
        imagePositionMobile="56% 12%"
        // O rosto fica alto nesta foto: o texto desce mais e o título encolhe
        // para não cobrir o doutor no mobile.
        topSpacingMobile="pt-44"
        titleSizeMobile="text-[1.3rem]"
      />

      {/* Experiência */}
      <div className="bg-brand-navy border-t border-white/10">
        <Section className="py-12 md:py-14">
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
                  <span className="text-sky-400">+</span>15 Anos de Experiência
                </span>
                <span className="hidden md:inline">Dr Arlan Marques</span>
              </h2>
              <p className="text-slate-300 leading-relaxed">
                Na maioria dos casos, o tratamento adequado para dores crônicas e agudas pode ser
                feito de forma clínica, sem cirurgia.
              </p>
              <p className="text-slate-300 leading-relaxed mt-3">
                Apenas em situações específicas, Dr. Arlan, também especialista em cirurgias
                complexas, poderá indicar e realizar essa 2° opção.
              </p>
            </div>
          </div>
        </Section>
      </div>

      {/* Procedimentos */}
      <Section id="tratamentos">
        <h2 className="font-heading text-2xl md:text-4xl font-bold text-slate-900 text-center mb-12">
          Conheça alguns dos <span className="text-sky-600">procedimentos</span> realizados pelo Dr. Arlan Marques
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROCEDIMENTOS.map((p) => (
            <div key={p.titulo} className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden">
              <img src={p.imagem} alt={p.titulo} loading="lazy" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="font-heading text-lg font-bold text-slate-900 mb-2">{p.titulo}</h3>
                {p.texto && <p className="text-slate-600 text-sm leading-relaxed">{p.texto}</p>}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-700 mb-4">Agende sua Consulta e descubra a melhor solução para o seu caso.</p>
          <Button href={whatsappLink} className="mx-auto">Descobrir melhor Tratamento</Button>
        </div>
      </Section>

      {/* Cada Paciente é Único */}
      <div className="bg-brand-navy border-t border-white/10">
        <Section className="py-12 md:py-14">
          <div className="grid md:grid-cols-[auto_1fr] gap-8 md:gap-16 items-center">
            <div className="flex justify-center md:justify-start md:border-r md:border-white/10 md:pr-16">
              <span className="font-heading text-2xl md:text-4xl font-bold text-white text-center md:text-left leading-tight">
                Cada Paciente<br />é Único!
              </span>
            </div>

            <p className="text-slate-300 leading-relaxed text-center md:text-left">
              O objetivo do Dr. Arlan é buscar sempre o melhor resultado com o{' '}
              <strong className="text-white">menor impacto possível</strong> — priorizando
              tratamentos não cirúrgicos e indicando cirurgia apenas quando for a última
              alternativa, que também poderá ser realizada pelo Dr.
            </p>
          </div>

          <AtendimentoParticular />
        </Section>
      </div>

      {/* Doenças */}
      <div className="bg-slate-50 border-b border-slate-200">
        <Section id="sintomas">
          <div className="text-center mb-8">
            <h2 className="font-heading text-xl md:text-3xl font-bold text-slate-900 mb-1">E quanto as Doenças?</h2>
            <p className="text-slate-600">Quais tipos o Dr Arlan também trata?</p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {DOENCAS.map((d) => (
              <div key={d} className="flex items-center gap-3 bg-brand-blue border border-brand-blue/40 rounded-xl px-4 py-3">
                <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
                <span className="text-white text-sm">{d}</span>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-brand-blue border border-brand-blue/40 rounded-2xl px-6 py-5 md:px-8 md:py-5 flex flex-col md:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
            <p className="text-white text-base md:text-lg font-medium text-center md:text-left">
              Agende sua Consulta para resolver a sua Dor o quanto antes!
            </p>
            <Button href={whatsappLink} className="shrink-0">Agendar pelo Whatsapp</Button>
          </div>
        </Section>
      </div>

      <SobreDrArlan />
      <CuidadoAlemDaNeurocirurgia />
      <LocalAtendimento />
      <Contato whatsappMessage={WHATSAPP_MSG} />
      <WhatsappFloatButton href={whatsappLink} />
    </SiteLayout>
  );
}

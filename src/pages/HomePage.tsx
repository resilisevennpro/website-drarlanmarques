import React from 'react';
import { SiteLayout } from '../components/SiteLayout';
import { Section, Button, Badge } from '../components/ui';
import { Hero } from '../components/Hero';
import { SobreDrArlan } from '../components/SobreDrArlan';
import { CuidadoAlemDaNeurocirurgia } from '../components/CuidadoAlemDaNeurocirurgia';
import { LocalAtendimento } from '../components/LocalAtendimento';
import { Contato } from '../components/Contato';
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
      />

      {/* Experiência */}
      <div className="bg-brand-navy">
        <Section className="text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-1">Dr Arlan Marques</h2>
          <p className="text-sky-400 font-medium mb-6">Mais de 13 anos de experiência</p>
          <p className="text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Na maioria dos casos, o tratamento adequado para dores crônicas e agudas pode ser
            feito de forma clínica, sem cirurgia.
          </p>
          <p className="text-slate-300 max-w-3xl mx-auto leading-relaxed mt-2">
            Apenas em situações específicas, Dr. Arlan, também especialista em cirurgias
            complexas, poderá indicar e realizar essa 2° opção.
          </p>
        </Section>
      </div>

      {/* Procedimentos */}
      <Section id="tratamentos">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900 text-center mb-12">
          Conheça alguns dos <span className="text-sky-600">procedimentos</span> realizados pelo Dr. Arlan Marques
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROCEDIMENTOS.map((p) => (
            <div key={p.titulo} className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden">
              <img src={p.imagem} alt={p.titulo} className="w-full h-48 object-cover" />
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

      {/* Cada Paciente é Único + Doenças */}
      <div className="bg-brand-blue">
        <Section id="sintomas">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">Cada Paciente é Único!</h2>
            <p className="text-sky-50/90 leading-relaxed">
              O objetivo do Dr. Arlan é buscar sempre o melhor resultado com o{' '}
              <strong className="text-white">menor impacto possível</strong> — priorizando
              tratamentos não cirúrgicos e indicando cirurgia apenas quando for a última
              alternativa, que também poderá ser realizada pelo Dr.
            </p>
          </div>

          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-1">E quanto as Doenças?</h2>
            <p className="text-sky-50/90">Quais tipos o Dr Arlan também trata?</p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {DOENCAS.map((d) => (
              <div key={d} className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl px-4 py-3">
                <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
                <span className="text-white text-sm">{d}</span>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* CTA */}
      <div className="bg-brand-navy">
        <Section className="text-center">
          <p className="text-white text-xl font-medium mb-6">
            Agende sua Consulta para resolver a sua Dor o quanto antes!
          </p>
          <Button href={whatsappLink} className="mx-auto">Agendar pelo Whatsapp</Button>
        </Section>
      </div>

      <SobreDrArlan />
      <CuidadoAlemDaNeurocirurgia />
      <LocalAtendimento />
      <Contato whatsappMessage={WHATSAPP_MSG} />
    </SiteLayout>
  );
}

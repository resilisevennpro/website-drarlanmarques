import React from 'react';
import { SiteLayout } from '../components/SiteLayout';
import { Section, Button } from '../components/ui';
import { SobreDrArlan } from '../components/SobreDrArlan';
import { CuidadoAlemDaNeurocirurgia } from '../components/CuidadoAlemDaNeurocirurgia';
import { LocalAtendimento } from '../components/LocalAtendimento';
import { AtendimentoParticular } from '../components/AtendimentoParticular';
import { Contato } from '../components/Contato';
import { Hero } from '../components/Hero';
import { Seo, physicianSchema, breadcrumbSchema } from '../components/Seo';
import { CheckCircle2, Quote } from 'lucide-react';
import { buildWhatsappLink } from '../lib/whatsapp';

const WHATSAPP_MSG = 'Olá, vim através do site de "Neurocirurgia" do Dr Arlan e gostaria de mais informações!';

const DIAGNOSTICOS = [
  { titulo: 'Espondilolistese e Anterolistese', texto: 'Escorregamento de vértebra, Graus 1 a 4.' },
  { titulo: 'Espondilólise', texto: 'Fratura por estresse na coluna.' },
  { titulo: 'Hérnia de Disco Extrusa', texto: 'Lombar e Cervical.' },
  { titulo: 'Estenose de Canal Vertebral', texto: 'Estreitamento do canal da medula.' },
  { titulo: 'Osteofitose', texto: 'Bico de Papagaio com compressão.' },
];

const SINTOMAS = [
  { titulo: 'Dor Ciática Grave', texto: 'Dor que irradia da lombar para a perna/pé.' },
  { titulo: 'Pé Caído ou Perda de Força', texto: 'Dificuldade de mover o pé ou a perna - Sinal de Urgência.' },
  { titulo: 'Formigamento e Dormência', texto: 'Nas mãos ou pés.' },
  { titulo: 'Dor Cervical Irradiada', texto: 'Dor no pescoço que desce para os braços.' },
  { titulo: 'Coluna Travada', texto: 'Dores agudas que impedem o movimento.' },
];

const TRATAMENTOS = [
  { titulo: 'Hérnia de Disco (Lombar e Cervical)', imagem: '/images/wp/1-Hernia-de-Disco.png', texto: 'Tratamento definitivo para hérnias extrusas e dores ciáticas, com foco em preservação da mobilidade.' },
  { titulo: 'Cirurgia Minimamente Invasiva', imagem: '/images/wp/2-Cirurgia-Minimamente-Invasiva.png', texto: 'Procedimentos por vídeo (Endoscopia) ou microscopia para rápida recuperação e menor agressão aos tecidos.' },
  { titulo: 'Espondilolistese e Anterolistese', imagem: '/images/wp/3-Espondilolistese-e-Anterolistese.png', texto: 'Correção de escorregamentos vertebrais (Graus 1 a 4) e instabilidade da coluna com fixação segura.' },
  { titulo: 'Estenose de Canal Vertebral', imagem: '/images/wp/4-Estenose-de-Canal-Vertebral.png', texto: 'Descompressão da medula e nervos para alívio de formigamentos, perda de força e dores nas pernas.' },
  { titulo: 'Bloqueios e Infiltrações', imagem: '/images/wp/5-Bloqueios-e-Infiltracoes.png', texto: 'Procedimentos rápidos para alívio imediato da dor e diagnóstico preciso da origem do problema.' },
  { titulo: 'Artrodese de Coluna', imagem: '/images/wp/6-Artrodese-de-Coluna.png', texto: 'Fusão vertebral moderna para casos de instabilidade grave, utilizando tecnologia de ponta.' },
];

const DEPOIMENTOS = [
  {
    nome: 'Antônio',
    tag: 'Cirurgia Coluna',
    texto: `Eu cheguei ja fazer vários tratamentos e já estava cansado. A dor na coluna fazia parte de todos os meus dias. Tirava meu sono... meu trabalho... minha vida.

Depois da cirurgia... tudo começou a mudar. A recuperação veio aos poucos... mas veio.

Hoje eu caminho sem dor... durmo melhor... vivo melhor.

Isso não é só uma cirurgia, apesar de ter alguns medos ao saber que precisava de cirurgia foi a melhor decisão que tomei para poder hj dizer que a cirurgia foi o passo para recuperar a própria vida.`,
  },
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
];

export default function NeurocirurgiaoPage() {
  const whatsappLink = buildWhatsappLink(WHATSAPP_MSG);

  return (
    <SiteLayout whatsappMessage={WHATSAPP_MSG}>
      <Seo
        title="Cirurgia de Coluna e Hérnia de Disco em Manaus | Dr. Arlan Marques"
        description="Referência em cirurgia de coluna e hérnia de disco em Manaus. Técnicas minimamente invasivas (endoscopia, microcirurgia) para cervical e lombar, com Dr. Arlan Marques, neurocirurgião."
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
        title="Referência em Cirurgia de Coluna e Hérnia de Disco em Manaus"
        description={
          <>
            Tratamentos modernos e <strong className="font-semibold">Técnicas Minimamente Invasivas</strong> para
            patologias da <em className="text-sky-300 not-italic">Cervical e Lombar.</em> Recupere sua qualidade de
            vida com segurança e atendimento exclusivo.
          </>
        }
        ctaLabel="Agendar Avaliação"
        ctaHref={whatsappLink}
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
                  <span className="text-sky-400">+</span>15 Anos de Experiência em Neurocirurgia
                </span>
                <span className="hidden md:inline">Dr Arlan Marques</span>
              </h2>
              <p className="text-slate-300 leading-relaxed">
                Dr. Arlan Marques une sólida formação acadêmica à prática constante em cirurgias de coluna.
              </p>
              <p className="text-slate-300 leading-relaxed mt-3">
                O foco do atendimento é oferecer um diagnóstico preciso e indicar a intervenção
                cirúrgica apenas quando necessário, priorizando técnicas como Endoscopia de Coluna
                e Microcirurgia, que proporcionam cortes menores, menos dor pós-operatória e retorno
                rápido à rotina.
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
            Condições da Coluna e Sintomas de Alerta
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
      </Section>

      {/* Tratamentos e Cirurgias */}
      <Section id="tratamentos">
        <h2 className="font-heading text-2xl md:text-4xl font-bold text-slate-900 text-center mb-12">
          Tratamentos Especializados e Cirurgias da Coluna
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRATAMENTOS.map((t) => (
            <div key={t.titulo} className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden">
              <img src={t.imagem} alt={t.titulo} loading="lazy" className="w-full h-40 object-cover saturate-60 grayscale-[25%] contrast-90" />
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
            {['Tumores do Sistema Nervoso', 'Aneurismas'].map((item) => (
              <li key={item} className="flex items-center gap-3 justify-center">
                <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0" />
                <span className="text-slate-700 text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-700 mb-4">Agende sua Avaliação para resolver a sua dor o quanto antes!</p>
          <Button href={whatsappLink} className="mx-auto">Descobrir melhor Tratamento</Button>
        </div>
      </Section>

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

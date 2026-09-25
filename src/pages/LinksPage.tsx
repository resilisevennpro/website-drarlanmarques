import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, MapPin, ChevronRight } from 'lucide-react';
import { Seo, physicianSchema } from '../components/Seo';
import { buildWhatsappLink } from '../lib/whatsapp';

// Página /links: o "link da bio" do Instagram. Curta e sem menu — só foto,
// botões para as páginas internas e, abaixo, localização e sobre o doutor.
// O contato por WhatsApp acontece dentro de cada página de destino — a única
// exceção é o acompanhamento pós-operatório, que vai direto para o WhatsApp.

const LINKS = [
  {
    href: '/enxaqueca',
    titulo: 'Enxaqueca',
    descricao: 'Viva sem o medo da próxima crise de dor de cabeça',
  },
  {
    href: '/',
    titulo: 'Dores crônicas e agudas',
    descricao: 'Alívio da dor na coluna, lombar e articulações — sem cirurgia',
  },
  {
    href: '/neurocirurgiao',
    titulo: 'Aneurismas e tumores cerebrais',
    descricao: 'Quando a cirurgia é necessária, com segurança e experiência',
  },
  {
    href: '/neurocirurgiao-coluna-e-hernia',
    titulo: 'Cirurgia de coluna e hérnia de disco',
    descricao: 'Técnicas minimamente invasivas para cervical e lombar',
  },
  {
    href: buildWhatsappLink(
      'Olá, vim através do site do Dr Arlan e gostaria de falar sobre o acompanhamento pós-operatório!'
    ),
    titulo: 'Acompanhamento pós-operatório',
    descricao: 'Fale pelo WhatsApp sobre a sua recuperação',
    externo: true,
  },
];

// Perfil do Google Business do Dr. Arlan. Montado com o place ID (query_place_id)
// em vez de colar a URL longa do navegador, que carrega coordenadas de sessão e
// um parâmetro `g_ep` que expira.
const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Dr.%20Arlan%20Marques%20Neurocirurgi%C3%A3o%20Ponta%20Negra%20Manaus&query_place_id=0xa562787b7016310a';

const INSTAGRAM_URL = 'https://www.instagram.com/dr.arlanmarques/';

export default function LinksPage() {
  return (
    <div className="min-h-screen bg-white">
      <Seo
        title="Dr. Arlan Marques | Links"
        description="Neurocirurgião em Manaus – AM. Tratamento de dores crônicas e agudas, enxaqueca e coluna. Acesse os conteúdos e agende sua consulta."
        path="/links"
        jsonLd={physicianSchema}
      />

      {/* No mobile é uma coluna só (o uso típico, vindo do Instagram). A partir
          de lg vira duas colunas: o perfil fica fixo à esquerda enquanto o
          conteúdo rola à direita, em vez de uma faixa estreita perdida na tela. */}
      <main className="mx-auto w-full max-w-md lg:max-w-5xl px-5 py-12 md:py-16 lg:py-10 lg:grid lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-14 lg:items-start">
        {/* Mobile: imagem de borda a borda da tela. Fica FORA do header porque,
            como filha de um container flex, a largura seria calculada pelo flex
            e o w-screen não valeria — sobrariam faixas brancas nas laterais.
            O -mt anula o padding de topo e encosta a foto no alto da página. */}
        <img
          src="/images/dr-arlan-retrato.webp"
          alt="Dr. Arlan Marques"
          className="lg:hidden w-screen max-w-none relative left-1/2 -translate-x-1/2 -mt-12 md:-mt-16 mb-8 aspect-square object-cover [object-position:50%_12%]"
        />

        {/* Cabeçalho */}
        <header className="flex flex-col items-center text-center lg:items-start lg:text-left">
          {/* Desktop: retrato grande ocupando a coluna, sem recorte redondo. */}
          <img
            src="/images/dr-arlan-retrato.webp"
            alt="Dr. Arlan Marques"
            className="hidden lg:block w-full rounded-2xl object-cover aspect-[3/4] shadow-sm"
          />

          <h1 className="font-heading text-2xl md:text-3xl font-bold text-slate-900 lg:mt-5">
            Dr. Arlan Marques
          </h1>
          <p className="text-sky-600 font-medium text-sm mt-1">CRM 4962 | RQE 2634</p>

          <p className="text-slate-600 text-sm leading-relaxed mt-4">
            Neurocirurgião especialista em tratamento de dores crônicas e agudas.
            Manaus – AM.
          </p>

          <span className="inline-block mt-4 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-semibold tracking-wide uppercase">
            +15 anos de experiência
          </span>
        </header>

        <div className="lg:min-w-0">
        {/* Botões */}
        <nav className="mt-10 lg:mt-2 flex flex-col gap-3">
          {LINKS.map((link) => {
            const className ="group flex items-center justify-between gap-4 rounded-2xl bg-brand-blue px-5 py-4 shadow-[0_4px_14px_rgba(56,111,163,0.25)] transition-all duration-300 hover:bg-brand-navy hover:shadow-[0_6px_20px_rgba(56,111,163,0.35)] active:scale-[0.98]";
            const conteudo = (
              <>
              <span className="min-w-0">
                <span className="block font-heading font-bold text-white text-base leading-snug">
                  {link.titulo}
                </span>
                <span className="block text-white/75 text-xs mt-0.5 leading-snug">
                  {link.descricao}
                </span>
              </span>
              <ChevronRight className="w-5 h-5 text-white shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
              </>
            );
            return link.externo ? (
              <a key={link.titulo} href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
                {conteudo}
              </a>
            ) : (
              <Link key={link.titulo} to={link.href} className={className}>
                {conteudo}
              </Link>
            );
          })}

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-4 rounded-2xl bg-white border border-slate-200 shadow-sm px-5 py-4 transition-all duration-300 hover:border-sky-400 hover:shadow-md active:scale-[0.98]"
          >
            <span className="flex items-center gap-3 min-w-0">
              <Instagram className="w-5 h-5 text-sky-500 shrink-0" />
              <span className="min-w-0">
                <span className="block font-heading font-bold text-slate-900 text-base leading-snug">
                  Instagram
                </span>
                <span className="block text-slate-500 text-xs mt-0.5 leading-snug">
                  @dr.arlanmarques
                </span>
              </span>
            </span>
            <ChevronRight className="w-5 h-5 text-sky-500 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </nav>

        {/* Localização */}
        <section className="mt-12">
          <h2 className="font-heading text-sm font-bold text-sky-600 uppercase tracking-wide mb-4">
            Onde atendo
          </h2>

          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block sm:flex sm:items-center rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:border-sky-400 hover:shadow-md active:scale-[0.98]"
          >
            <img
              src="/images/consultorio-01.webp"
              alt="Clínica Britannia Park Offices"
              loading="lazy"
              className="w-full h-36 sm:w-48 sm:h-32 sm:shrink-0 object-cover"
            />
            <span className="flex items-start gap-3 px-5 py-4 sm:items-center">
              <MapPin className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
              <span>
                <span className="block font-heading font-bold text-slate-900 text-sm">
                  Clínica Britannia Park Offices
                </span>
                <span className="block text-slate-500 text-xs mt-1 leading-relaxed">
                  Av. Coronel Teixeira, 6225 – Sala 1408
                  <br />
                  Ponta Negra, Manaus – AM
                </span>
                <span className="block text-sky-600 text-xs mt-2 font-medium">
                  Ver no Google Maps
                </span>
              </span>
            </span>
          </a>
        </section>

        {/* Sobre */}
        <section className="mt-12">
          <h2 className="font-heading text-sm font-bold text-sky-600 uppercase tracking-wide mb-4">
            Sobre o Dr. Arlan
          </h2>

          <p className="text-slate-600 text-sm leading-relaxed max-w-prose">
            Formado em medicina em 2005 pela Universidade Federal do Amazonas, com
            especialização em neurocirurgia pelo Hospital Universitário Getúlio Vargas
            (2005–2009) e sub especialização em neuro oncologia pelo Hospital das
            Clínicas – USP/SP (2010). Pós graduado em tratamento da dor pela SINPAIN
            (2023).
          </p>

          <p className="text-slate-600 text-sm leading-relaxed mt-4 max-w-prose">
            Na maioria dos casos, o tratamento adequado para dores crônicas e agudas
            pode ser feito de forma clínica, sem cirurgia. O objetivo é sempre o melhor
            resultado com o menor impacto possível.
          </p>
        </section>

        <footer className="mt-12 pt-6 border-t border-slate-200 text-center lg:text-left">
          <p className="text-slate-400 text-xs leading-relaxed">
            Dr. Arlan Marques – CRM 4962 RQE 2634
          </p>
          <p className="text-slate-400 text-xs mt-1">
            Conteúdo informativo. Não substitui consulta médica.
          </p>
          <p className="text-slate-400 text-xs mt-2">
            Desenvolvido por{' '}
            <a
              href="https://instagram.com/resilisevenn"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-600 transition-colors"
            >
              Resili Sevenn
            </a>
          </p>
        </footer>
        </div>
      </main>
    </div>
  );
}

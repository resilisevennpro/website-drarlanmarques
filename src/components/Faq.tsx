import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Section } from './ui';

export type FaqItem = { q: string; a: string };

// Bloco de Perguntas Frequentes reutilizável no visual claro do site
// principal (Home, Neurocirurgia, Coluna). Usar sempre junto com
// faqSchema(faqs) no jsonLd da página — ajuda tanto o Google (rich
// snippets) quanto respostas de IA a citar o conteúdo corretamente.
export const Faq = ({ items, title = 'Dúvidas Frequentes' }: { items: FaqItem[]; title?: string }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section id="duvidas">
      <div className="max-w-[42rem] mx-auto">
        <h2 className="font-heading text-2xl md:text-4xl font-bold text-slate-900 text-center mb-12">{title}</h2>

        <div className="space-y-4">
          {items.map((faq, idx) => (
            <div key={idx} className="border border-slate-200 rounded-xl bg-slate-50 overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-100 transition-colors"
              >
                <span className="font-heading font-semibold text-slate-900">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-sky-600 shrink-0 transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === idx ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="px-5 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-200 pt-4">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

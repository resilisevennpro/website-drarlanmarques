import React from 'react';
import { Section } from './ui';
import { Instagram } from 'lucide-react';

const CREDENCIAIS = [
  'Sou neurocirurgião no serviço residência médica neurocirurgia do HUGV',
  'Neurocirurgião do serviço de Neuro oncologia do FCECON/AM',
  'Neurocirurgião do Hospital e Pronto Socorro Dr João Lúcio Pereira Machado serviço neuro traumatologia',
  'Neurocirurgião do serviço neurocirurgia hospital adventista de Manaus',
  'Neurocirurgião do serviço de dor do hospital check-up de Manaus',
];

export const SobreDrArlan = () => (
  <div className="bg-brand-navy">
    <Section id="sobre" className="grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="font-heading text-2xl md:text-4xl font-bold text-white mb-1">Dr. Arlan Marques</h2>
        <p className="text-sky-400 font-medium mb-6">CRM 4962 | RQE 2634</p>

        <p className="text-slate-300 leading-relaxed mb-6">
          Sou Dr Arlan Marques, neurocirurgião, me formei médico em 2005 pela universidade
          federal do Amazonas, realizei minha especialização em neurocirurgia pelo hospital
          universitário Getúlio Vargas 2005 a 2009, fiz minha sub especialização em neuro
          oncologia pelo Hospital das Clínicas – USP / SP em 2010, sou pós graduado em
          tratamento da dor pela SINPAIN 2023
        </p>

        <ul className="space-y-3 mb-6">
          {CREDENCIAIS.map((item) => (
            <li key={item} className="flex gap-3 text-slate-300 text-sm">
              <span className="text-sky-400 mt-1">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <a
          href="https://www.instagram.com/dr.arlanmarques/?hl=en"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 font-medium"
        >
          <Instagram className="w-5 h-5" /> @dr.arlanmarques
        </a>
      </div>

      <div className="rounded-2xl overflow-hidden md:max-w-sm md:justify-self-end">
        <img src="/images/wp/drarlan-bg10.webp" alt="Dr. Arlan Marques" loading="lazy" className="w-full h-full object-cover" />
      </div>
    </Section>
  </div>
);

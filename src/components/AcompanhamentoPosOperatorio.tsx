import React from 'react';
import { HeartPulse } from 'lucide-react';
import { Section, Button } from './ui';

// Bloco compartilhado pelas páginas de neurocirurgia, posicionado antes
// dos depoimentos.
export const AcompanhamentoPosOperatorio = ({ whatsappLink }: { whatsappLink: string }) => (
  <Section id="pos-operatorio">
    <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-4 md:gap-6 bg-brand-navy rounded-2xl shadow-lg px-6 py-8 md:px-10 text-center md:text-left">
      <div className="shrink-0 w-14 h-14 rounded-full bg-sky-500 flex items-center justify-center">
        <HeartPulse className="w-7 h-7 text-white" />
      </div>
      <div>
        <h2 className="font-heading text-xl md:text-2xl font-bold text-white mb-2">
          Acompanhamento pós-operatório
        </h2>
        <p className="text-white/80 text-sm md:text-base leading-relaxed mb-4">
          O cuidado não termina na cirurgia. O Dr. Arlan também realiza o acompanhamento
          pós-operatório, orientando cada etapa da sua recuperação com segurança.
        </p>
        <Button href={whatsappLink} className="mx-auto md:mx-0">Agendar acompanhamento</Button>
      </div>
    </div>
  </Section>
);

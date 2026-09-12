import React from 'react';
import { Section } from './ui';

export const CuidadoAlemDaNeurocirurgia = () => (
  <div className="bg-brand-blue">
    <Section className="grid md:grid-cols-2 gap-12 items-center">
      <div className="rounded-2xl overflow-hidden order-2 md:order-1">
        <img src="/images/wp/drarlan-bg11.webp" alt="Pós-graduação em tratamento da dor" loading="lazy" className="w-full h-full object-cover" />
      </div>
      <div className="order-1 md:order-2">
        <h2 className="font-heading text-2xl md:text-4xl font-bold text-white mb-2">
          Cuidado que vai além da Neurocirurgia
        </h2>
        <p className="text-sky-100 font-medium mb-6">Pós-graduação em tratamento dor</p>
        <p className="text-sky-50/90 leading-relaxed">
          Com uma pós-graduação dedicada ao alívio da dor, o Dr. Arlan combina expertise em
          neurocirurgia com abordagens avançadas para proporcionar mais qualidade de vida
          aos seus pacientes.
        </p>
      </div>
    </Section>
  </div>
);

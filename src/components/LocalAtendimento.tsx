import React from 'react';
import { Section } from './ui';

const FOTOS = [
  '/images/wp/drarlan-bg8.webp',
  '/images/wp/drarlan-bg7.webp',
  '/images/wp/drarlan-bg6.webp',
  '/images/wp/drarlan-bg5.webp',
  '/images/wp/drarlan-bg4.webp',
  '/images/wp/drarlan-bg3.webp',
];

export const LocalAtendimento = () => (
  <div className="bg-white">
    <Section id="localizacao">
      <div className="text-center mb-10">
        <h2 className="font-heading text-2xl md:text-4xl font-bold text-slate-900 mb-2">
          Tranquilidade e conforto para seu atendimento
        </h2>
        <p className="text-slate-600">Clínica Britannia Park Offices</p>
        <p className="text-slate-600">Av. Coronel Teixeira, 6225 – Ponta Negra, Manaus – AM</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {FOTOS.map((src) => (
          <div key={src} className="rounded-xl overflow-hidden aspect-[4/3]">
            <img src={src} alt="Clínica Britannia Park Offices" loading="lazy" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </Section>
  </div>
);

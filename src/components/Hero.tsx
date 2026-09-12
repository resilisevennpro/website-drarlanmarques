import React from 'react';
import { Button } from './ui';

// Réplica do hero original do WordPress (container Elementor 9329b4b):
// imagem de fundo drarlan-bg2.webp, min-height 750px, overlay em gradiente
// transparente -> #112640 (brand-navy) de cima para baixo. Ver PLANEJAMENTO.md.
export const Hero = ({
  title,
  description,
  ctaLabel,
  ctaHref,
}: {
  title: React.ReactNode;
  description: React.ReactNode;
  ctaLabel: string;
  ctaHref: string;
}) => (
  <div
    className="relative flex items-center justify-center md:justify-start text-center md:text-left min-h-[600px] md:min-h-[750px] bg-cover bg-center md:bg-[position:75%_center] px-4 sm:px-6 md:px-12 lg:px-20
      bg-[url('/images/wp/drarlan-mobile.webp')] md:bg-[url('/images/wp/drarlan-bg2.webp')]"
  >
    {/* Overlay uniforme para garantir contraste em qualquer ponto da foto */}
    <div className="absolute inset-0 bg-brand-navy/40" />
    {/* Gradiente igual ao original: transparente no topo, sólido na base */}
    <div
      className="absolute inset-0"
      style={{ backgroundImage: 'linear-gradient(182deg, #11264000 0%, #112640 100%)' }}
    />
    {/* No desktop, reforço de escurecimento à esquerda para o texto não competir com o rosto na foto */}
    <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-brand-navy/70 via-brand-navy/20 to-transparent" />
    <div className="relative z-10 max-w-3xl py-16 md:py-20">
      <span className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sky-300 text-xs md:text-sm font-semibold tracking-wide uppercase mb-5">
        Atendimento Particular
      </span>
      <h1 className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
        {title}
      </h1>
      <p className="text-slate-200 text-base md:text-lg mb-8">
        {description}
      </p>
      <Button href={ctaHref} className="mx-auto md:mx-0">{ctaLabel}</Button>
    </div>
  </div>
);

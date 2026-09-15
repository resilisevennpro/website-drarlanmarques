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
  /** Imagem de fundo. Por padrão a do site original; páginas podem trocar. */
  image = '/images/wp/drarlan-bg2.webp',
  imageMobile = '/images/wp/drarlan-mobile.webp',
  /** Enquadramento (background-position) de cada versão, quando a composição
      da foto exige um ancoramento diferente do padrão. */
  imagePosition,
  imagePositionMobile,
  /** Espaçamento do topo no mobile. Fotos em que o rosto fica alto pedem um
      valor maior, para o texto não cobrir o doutor. */
  topSpacingMobile = 'pt-28',
  /** Tamanho do h1 no mobile. Títulos longos pedem um valor menor. */
  titleSizeMobile = 'text-[1.5rem]',
}: {
  title: React.ReactNode;
  description: React.ReactNode;
  ctaLabel: string;
  ctaHref: string;
  image?: string;
  imageMobile?: string;
  imagePosition?: string;
  imagePositionMobile?: string;
  topSpacingMobile?: string;
  titleSizeMobile?: string;
}) => (
  <div
    className="relative flex items-start md:items-center justify-center md:justify-start text-center md:text-left min-h-[520px] md:min-h-[750px] bg-cover bg-[position:var(--hero-pos-mobile,50%_20%)] md:bg-[position:var(--hero-pos,75%_center)] px-4 sm:px-6 md:px-12 lg:px-20
      bg-[image:var(--hero-mobile)] md:bg-[image:var(--hero-desktop)]"
    style={{
      '--hero-mobile': `url('${imageMobile}')`,
      '--hero-desktop': `url('${image}')`,
      ...(imagePositionMobile && { '--hero-pos-mobile': imagePositionMobile }),
      ...(imagePosition && { '--hero-pos': imagePosition }),
    } as React.CSSProperties}
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
    {/* No mobile o badge desce para baixo do h1 (order), porque no topo ele
        encosta no rosto do doutor na foto de fundo. No desktop segue acima. */}
    <div className={`relative z-10 max-w-3xl ${topSpacingMobile} pb-8 md:py-20`}>
      {/* O badge aparece duas vezes, alternadas por breakpoint: no mobile ele
          fica abaixo do h1, porque no topo encosta no rosto do doutor na foto
          de fundo; no desktop segue acima, como no site original. Duplicar é
          mais simples aqui do que tornar o bloco flex, que altera a altura do
          hero e desloca o enquadramento da foto. */}
      <span className="hidden md:inline-block px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sky-300 text-sm font-semibold tracking-wide uppercase mb-5">
        Atendimento Particular
      </span>
      <h1 className={`font-heading ${titleSizeMobile} sm:text-4xl md:text-6xl font-bold text-white mb-3 md:mb-6 leading-tight`}>
        {title}
      </h1>
      <span className="md:hidden inline-block px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sky-300 text-xs font-semibold tracking-wide uppercase mb-5">
        Atendimento Particular
      </span>
      <p className="text-slate-200 text-base md:text-lg mb-8">
        {description}
      </p>
      <Button href={ctaHref} className="mx-auto md:mx-0">{ctaLabel}</Button>
    </div>
  </div>
);

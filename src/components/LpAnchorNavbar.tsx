import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui';
import { buildWhatsappLink } from '../lib/whatsapp';

// Navbar para páginas de tráfego pago servidas em lp.drarlanneuro.com (ex:
// lp.drarlanneuro.com/neurocirurgiao). Só tem links âncora para seções da
// própria página — nenhuma saída para outras páginas do site, para não
// desviar o visitante que chegou por um anúncio pago. Ver EnxaquecaPage.tsx
// para o mesmo padrão já usado na LP de enxaqueca.
export type LpNavLink = { name: string; href: string };

export const LpAnchorNavbar = ({
  navLinks,
  whatsappMessage,
}: {
  navLinks: LpNavLink[];
  whatsappMessage: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappLink = buildWhatsappLink(whatsappMessage);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-2 flex items-center justify-between">
        <a href="#" className="flex items-center">
          <img src="/images/wp/drarlan-logo.webp" alt="Dr. Arlan Marques" className="h-10 md:h-11 w-auto" />
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-slate-600 hover:text-sky-600 transition-colors text-sm font-medium">
              {link.name}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button href={whatsappLink} className="!py-2 !px-5 !text-sm">Agende pelo WhatsApp</Button>
        </div>

        <button className="md:hidden text-slate-700" onClick={() => setIsOpen(!isOpen)} aria-label="Menu">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-slate-600 hover:text-sky-600 transition-colors" onClick={() => setIsOpen(false)}>
              {link.name}
            </a>
          ))}
          <Button href={whatsappLink} className="w-full">Agende pelo WhatsApp</Button>
        </div>
      )}
    </header>
  );
};

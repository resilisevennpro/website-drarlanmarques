import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from './ui';
import { buildWhatsappLink } from '../lib/whatsapp';

// "Home" leva para /links (o hub de links da bio), não para a raiz: a home do
// site é a própria página de dores crônicas, acessível pelo item seguinte.
const NAV_LINKS = [
  { name: 'Home', to: '/links' },
  { name: 'Dores Crônicas', to: '/' },
  { name: 'Enxaqueca', to: '/enxaqueca' },
  { name: 'Neurocirurgia', to: '/neurocirurgiao' },
];

export const Navbar = ({ whatsappMessage }: { whatsappMessage: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappLink = buildWhatsappLink(whatsappMessage);

  // Fundo branco sólido: a logo tem fundo branco próprio e destoava quando a
  // barra era translúcida sobre a foto do hero.
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-2 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src="/images/wp/drarlan-logo.webp" alt="Dr. Arlan Marques" className="h-10 md:h-11 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <Link key={link.to} to={link.to} className="text-slate-600 hover:text-sky-600 transition-colors text-sm font-medium">
              {link.name}
            </Link>
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
          {NAV_LINKS.map((link) => (
            <Link key={link.to} to={link.to} className="text-slate-600 hover:text-sky-600 transition-colors" onClick={() => setIsOpen(false)}>
              {link.name}
            </Link>
          ))}
          <Button href={whatsappLink} className="w-full">Agende pelo WhatsApp</Button>
        </div>
      )}
    </header>
  );
};

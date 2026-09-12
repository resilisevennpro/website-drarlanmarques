import React from 'react';
import { Section, Button } from './ui';
import { Instagram, MessageCircle } from 'lucide-react';
import { buildWhatsappLink } from '../lib/whatsapp';

const MAPS_LINK = "https://www.google.com/maps/place/Britannia+Park+Offices/";

export const Contato = ({ whatsappMessage }: { whatsappMessage: string }) => {
  const whatsappLink = buildWhatsappLink(whatsappMessage);

  return (
    <div className="bg-brand-navy">
      <Section id="contato" className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
        <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="block rounded-2xl overflow-hidden border border-slate-700">
          <img src="/images/wp/mapa-clinica.png" alt="Localização no Google Maps" loading="lazy" className="w-full h-auto" />
        </a>

        <div className="text-center flex flex-col items-center">
          <h2 className="font-heading text-2xl md:text-4xl font-bold text-white mb-10">CONTATO</h2>

          <div className="space-y-10 flex flex-col items-center">
            <div className="flex flex-col items-center">
              <p className="flex items-center gap-3 text-slate-300 font-medium mb-4">
                <MessageCircle className="w-5 h-5 text-sky-400" /> Agende através do WhatsApp
              </p>
              <Button href={whatsappLink}>Agendar Agora</Button>
            </div>

            <div className="flex flex-col items-center">
              <a href="https://www.instagram.com/dr.arlanmarques/?hl=en" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-300 hover:text-sky-400 font-medium">
                <Instagram className="w-5 h-5 text-sky-400" /> Acompanhe no Instagram
              </a>
              <p className="text-slate-500 text-sm mt-1">@dr.arlanmarques</p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

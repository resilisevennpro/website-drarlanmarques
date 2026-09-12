import React from 'react';
import { MessageCircle } from 'lucide-react';

// No WordPress original, esse botão flutuante (plugin Joinchat) só
// aparecia na página inicial (front_page), não nas outras páginas.
// Ver PLANEJAMENTO.md.
export const WhatsappFloatButton = ({ href }: { href: string }) => (
  <div className="fixed bottom-6 right-6 z-50 md:hidden">
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-green-500/30 transition-all active:scale-95 flex items-center justify-center"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  </div>
);

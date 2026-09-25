import React from 'react';

export const Footer = () => (
  <footer className="bg-brand-navy border-t border-slate-800 py-8 px-4 text-center text-slate-400 text-sm">
    <p>2025 © Dr. Arlan Marques – CRM 4962 RQE 2634 . Todos os direitos reservados</p>
    <p className="mt-2 text-xs">
      Desenvolvido por{' '}
      <a
        href="https://instagram.com/resilisevenn"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-sky-400 transition-colors"
      >
        Resili Sevenn
      </a>
    </p>
  </footer>
);

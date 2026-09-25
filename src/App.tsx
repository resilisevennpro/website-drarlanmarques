import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import EnxaquecaPage from './pages/EnxaquecaPage';
import HomePage from './pages/HomePage';
import NeurocirurgiaoPage from './pages/NeurocirurgiaoPage';
import NeurocirurgiaColunaHerniaPage from './pages/NeurocirurgiaColunaHerniaPage';
import BioPage from './pages/BioPage';
import LinksPage from './pages/LinksPage';

// lp.drarlanneuro.com serve apenas a landing page de enxaqueca (sem menu
// nem rotas do site principal). Qualquer outro host (drarlanneuro.com,
// localhost em dev, previews da Vercel) serve o site principal com rotas.
// Ver PLANEJAMENTO.md, seção 6.
function isLpHost(hostname: string): boolean {
  return hostname.startsWith('lp.');
}

export default function App() {
  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';

  if (isLpHost(hostname)) {
    return (
      <HelmetProvider>
        <EnxaquecaPage />
      </HelmetProvider>
    );
  }

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/neurocirurgiao" element={<NeurocirurgiaoPage />} />
          <Route path="/neurocirurgiao-coluna-e-hernia" element={<NeurocirurgiaColunaHerniaPage />} />
          <Route path="/bio" element={<BioPage />} />
          <Route path="/links" element={<LinksPage />} />
          <Route path="/enxaqueca" element={<EnxaquecaPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

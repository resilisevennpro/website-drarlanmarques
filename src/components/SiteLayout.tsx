import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const SiteLayout = ({
  whatsappMessage,
  children,
  navbar,
}: {
  whatsappMessage: string;
  children: React.ReactNode;
  // Sobrescreve a navbar padrão do site. Usado pelas páginas de tráfego
  // pago (lp.drarlanneuro.com/...), que precisam de uma navbar sem saída
  // para outras páginas — ver LpAnchorNavbar.
  navbar?: React.ReactNode;
}) => (
  <div className="bg-white min-h-screen">
    {navbar ?? <Navbar whatsappMessage={whatsappMessage} />}
    {children}
    <Footer />
  </div>
);

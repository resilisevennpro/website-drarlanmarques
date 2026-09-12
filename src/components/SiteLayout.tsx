import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const SiteLayout = ({ whatsappMessage, children }: { whatsappMessage: string, children: React.ReactNode }) => (
  <div className="bg-white min-h-screen">
    <Navbar whatsappMessage={whatsappMessage} />
    {children}
    <Footer />
  </div>
);

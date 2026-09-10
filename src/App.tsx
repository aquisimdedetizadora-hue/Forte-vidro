import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Reviews } from './components/Reviews';
import { Contact } from './components/Contact';

export default function App() {
  return (
    <main id="app-root" className="min-h-screen bg-white text-[#000000] selection:bg-[#000000] selection:text-white">
      {/* Header com navegação e botão WhatsApp */}
      <Header />

      {/* SEÇÃO PRINCIPAL (HERO) */}
      <Hero />

      {/* SEGUNDA SEÇÃO: APRESENTAÇÃO DA FORTE VIDROS */}
      <About />

      {/* PROVA SOCIAL: AVALIAÇÕES REAIS NO GOOGLE MAPS */}
      <Reviews />

      {/* SEÇÃO FINAL: CONTATO + LOCALIZAÇÃO + RODAPÉ */}
      <Contact />
    </main>
  );
}

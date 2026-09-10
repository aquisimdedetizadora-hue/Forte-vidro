import React from 'react';
import { ScrollImageSequence } from './components/ScrollImageSequence';
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

      {/* ANIMAÇÃO DE SCROLL DOS 151 FRAMES (1 A 151) COM TRANSIÇÃO EM FADE PARA A HERO */}
      <ScrollImageSequence
        frameCount={151}
        basePath="/image-sequence"
      >
        <Hero />
      </ScrollImageSequence>

      {/* SEGUNDA SEÇÃO: APRESENTAÇÃO DA FORTE VIDROS */}
      <About />

      {/* PROVA SOCIAL: AVALIAÇÕES REAIS NO GOOGLE MAPS */}
      <Reviews />

      {/* SEÇÃO FINAL: CONTATO + LOCALIZAÇÃO + RODAPÉ */}
      <Contact />
    </main>
  );
}

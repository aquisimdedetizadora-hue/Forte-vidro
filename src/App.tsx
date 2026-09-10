import React from 'react';
import { ScrollImageSequence } from './components/ScrollImageSequence';
import { Header } from './components/Header';
import { About } from './components/About';
import { Reviews } from './components/Reviews';
import { Contact } from './components/Contact';

export default function App() {
  return (
    <main id="app-root" className="min-h-screen bg-white text-[#000000] selection:bg-[#000000] selection:text-white">
      {/* Header minimalista que surge na transição da Hero */}
      <Header />

      {/* Experiência Cinematográfica de 180 frames + Transição Seamless para a Hero da Forte Vidros */}
      <ScrollImageSequence
        frameCount={180}
        basePath="/image-sequence"
        getFrameFileName={(index) => {
          const pad = String(index + 1).padStart(3, '0');
          return `ezgif-frame-${pad}.jpg`;
        }}
      />

      {/* SEGUNDA SEÇÃO: APRESENTAÇÃO DA FORTE VIDROS */}
      <About />

      {/* PROVA SOCIAL: AVALIAÇÕES REAIS NO GOOGLE MAPS */}
      <Reviews />

      {/* SEÇÃO FINAL: CONTATO + LOCALIZAÇÃO + RODAPÉ */}
      <Contact />
    </main>
  );
}

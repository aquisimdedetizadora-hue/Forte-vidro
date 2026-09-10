import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

export const Header: React.FC = () => {
  const [isScrolledPastIntro, setIsScrolledPastIntro] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show header once user enters the Hero transition phase of the sequence
      const introSection = document.getElementById('intro-sequence-section');
      if (introSection) {
        const rect = introSection.getBoundingClientRect();
        const scrollableDist = introSection.clientHeight - window.innerHeight;
        const progress = scrollableDist > 0 ? -rect.top / scrollableDist : 1;
        setIsScrolledPastIntro(progress >= 0.82);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolledPastIntro
          ? 'opacity-100 translate-y-0 pointer-events-auto bg-white/90 backdrop-blur-md border-b border-zinc-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]'
          : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <button
          id="header-brand-button"
          onClick={() => scrollToSection('hero-section')}
          className="text-left group cursor-pointer focus:outline-none"
        >
          <span className="text-xl font-bold tracking-tight text-zinc-900 block leading-tight">
            FORTE VIDROS
          </span>
          <span className="text-[11px] font-medium tracking-widest text-zinc-600 uppercase block">
            Engenharia & Arquitetura
          </span>
        </button>

        <nav className="flex items-center gap-6 text-xs sm:text-sm font-medium text-[#86868B]">
          <button
            id="nav-link-about"
            onClick={() => scrollToSection('about-section')}
            className="hover:text-[#000000] transition-colors cursor-pointer"
          >
            Sobre
          </button>
          <button
            id="nav-link-contact"
            onClick={() => scrollToSection('contact-section')}
            className="hover:text-[#000000] transition-colors cursor-pointer"
          >
            Contato
          </button>
        </nav>

        <div className="flex items-center gap-4">
          <a
            id="header-whatsapp-cta"
            href="https://wa.me/5566992557597"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full text-xs font-semibold tracking-wide uppercase bg-[#000000] hover:bg-[#1677FF] text-white transition-all duration-200 shadow-sm cursor-pointer"
          >
            <span>WhatsApp</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
};

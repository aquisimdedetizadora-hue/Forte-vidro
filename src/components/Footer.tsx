import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-white text-zinc-600 border-t border-zinc-200 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-zinc-100">
          <div>
            <span className="text-2xl font-bold tracking-tight text-zinc-950 block">
              FORTE VIDROS
            </span>
            <p className="text-xs text-zinc-500 mt-1 max-w-sm">
              Sistemas arquitetônicos de alto padrão em vidro estrutural e esquadrias de alumínio minimalistas.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <button
              id="footer-back-to-top"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-zinc-200 bg-zinc-50 text-xs font-semibold text-zinc-800 hover:bg-zinc-100 transition-colors cursor-pointer"
            >
              <span>Voltar ao Topo</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            © {new Date().getFullYear()} Forte Vidros Engenharia Ltda. Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-6">
            <span>NBR 7199</span>
            <span>NBR 10821</span>
            <span>NBR 14718</span>
            <span>ISO 9001</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

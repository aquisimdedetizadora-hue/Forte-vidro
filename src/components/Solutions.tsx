import React, { useState } from 'react';
import { Layers, Shield, Maximize2, Compass, CheckCircle2, ChevronRight } from 'lucide-react';
import { ArchitectureSolution } from '../types';

const SOLUTIONS_DATA: ArchitectureSolution[] = [
  {
    id: 'portas-pivotantes',
    title: 'Portas Pivotantes Monumentais',
    subtitle: 'Grandes Vãos com Perfis Invisíveis',
    description: 'Sistemas estruturados para portas de entrada de até 6 metros de altura e 800 kg por folha. Eixos pivotantes de alta precisão com amortecimento hidráulico integrado ao piso e perfis ocultos que valorizam a pureza dos volumes arquitetônicos.',
    specs: [
      'Capacidade de carga até 800 kg por pivô',
      'Vidro laminado temperado com até 24 mm de espessura',
      'Fechaduras magnéticas com biometria ou automação residencial',
      'Acabamento em alumínio anodizado escovado ou pintura eletrostática',
    ],
  },
  {
    id: 'fachadas-glazing',
    title: 'Fachadas Pele de Vidro & Structural Glazing',
    subtitle: 'Envoltórias Térmicas de Alto Desempenho',
    description: 'Fachadas contínuas com fixação oculta de vidro por fita estrutural de silicone homologado. Maximizam a incidência de luz natural enquanto bloqueiam a radiação ultravioleta e o ganho térmico excessivo através de vidros seletivos de última geração.',
    specs: [
      'Vidros duplos insulados com câmara de argônio',
      'Redução de carga térmica de ar-condicionado de até 40%',
      'Isolamento acústico testado contra ruídos urbanos intensos',
      'Ensaios de estanqueidade a pressão de vento de até 2.500 Pa',
    ],
  },
  {
    id: 'guarda-corpos',
    title: 'Guarda-Corpos Autoportantes',
    subtitle: 'Segurança Total sem Interrupção Visual',
    description: 'Sistemas autoportantes com perfil contínuo de ancoragem embutido no piso acabado ou entre lajes. Proporcionam visão panorâmica limpa em varandas, escadas e terraços sem a necessidade de montantes verticais.',
    specs: [
      'Em total conformidade com a norma ABNT NBR 14718',
      'Vidro laminado temperado de segurança com película SentryGlas',
      'Resistência a impactos dinâmicos e carga horizontal de 2,5 kN/m',
      'Drenagem pluvial oculta integrada no perfil de alumínio estrutural',
    ],
  },
  {
    id: 'coberturas-claraboyas',
    title: 'Coberturas & Claraboyas Térmicas',
    subtitle: 'Luz Zenital com Controle Solar Rigoroso',
    description: 'Planos inclinados e claraboyas desenvolvidas com vedação dupla e perfis com ruptura de ponte térmica. Projetadas com inclinação calibrada e vidros autolimpantes de alto fator solar para conforto absoluto.',
    specs: [
      'Vidros especiais com camada pirolítica autolimpante',
      'Estrutura em perfis reforçados com calhas coletoras de condensação',
      'Filtro de até 99% dos raios UV preservando interiores',
      'Possibilidade de abertura motorizada para ventilação cruzada',
    ],
  },
  {
    id: 'divisorias-acusticas',
    title: 'Painéis Deslizantes & Divisórias Acústicas',
    subtitle: 'Integração Espacial com Isolamento Acústico',
    description: 'Divisórias piso-teto com caixilharia minimalista e trilhos embutidos no piso sem ressalto. Permitem integrar ou compartimentar ambientes residenciais e corporativos mantendo o conforto acústico privativo.',
    specs: [
      'Atenuação sonora calibrada até 45 dB RW',
      'Trilho inferior 100% nivelado com o piso (acessibilidade plena)',
      'Vidros serigrafados, translúcidos, inteligentes (switchable) ou extra-clear',
      'Vedação com borrachas de EPDM e escovas de alta densidade',
    ],
  },
];

export const Solutions: React.FC = () => {
  const [activeSolutionId, setActiveSolutionId] = useState<string>(SOLUTIONS_DATA[0].id);
  const activeSolution = SOLUTIONS_DATA.find((s) => s.id === activeSolutionId) || SOLUTIONS_DATA[0];

  return (
    <section id="solutions-section" className="py-24 px-6 bg-zinc-50 border-b border-zinc-200">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-200/80 text-zinc-800 text-xs font-semibold uppercase tracking-widest mb-4">
            <Layers className="w-3.5 h-3.5 text-zinc-900" />
            <span>Portfólio de Soluções</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-950 mb-6">
            Sistemas arquitetônicos sob medida para projetos arrojados.
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 leading-relaxed">
            Cada esquadria e elemento de vidro da Forte Vidros é fabricado com especificações técnicas milimétricas, aliando materiais nobres, tecnologia de montagem e homologação de engenharia.
          </p>
        </div>

        {/* Interactive Solution Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Solution Selector Sidebar */}
          <div className="lg:col-span-5 flex flex-col gap-2">
            {SOLUTIONS_DATA.map((sol) => {
              const isActive = sol.id === activeSolutionId;
              return (
                <button
                  key={sol.id}
                  id={`solution-tab-${sol.id}`}
                  onClick={() => setActiveSolutionId(sol.id)}
                  className={`text-left p-5 rounded-2xl transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-white border-zinc-300 shadow-[0_2px_10px_rgba(0,0,0,0.04)] ring-1 ring-zinc-900/5'
                      : 'bg-transparent border-transparent hover:bg-zinc-100/80 text-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3
                        className={`text-base font-semibold transition-colors ${
                          isActive ? 'text-zinc-950' : 'text-zinc-700'
                        }`}
                      >
                        {sol.title}
                      </h3>
                      <p className="text-xs text-zinc-600 mt-1 font-medium">{sol.subtitle}</p>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isActive ? 'text-zinc-950 translate-x-1' : 'text-zinc-400'
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Solution Details Panel */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-zinc-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wider bg-zinc-100 text-zinc-800">
                Especificação Técnica
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-zinc-950 mb-2">
              {activeSolution.title}
            </h3>
            <p className="text-sm font-semibold text-zinc-600 mb-6 uppercase tracking-wider">
              {activeSolution.subtitle}
            </p>

            <p className="text-zinc-600 leading-relaxed text-base mb-8">
              {activeSolution.description}
            </p>

            <div className="border-t border-zinc-100 pt-6">
              <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-900 mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4 text-zinc-700" />
                <span>Critérios de Engenharia & Diferenciais</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeSolution.specs.map((spec, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/60"
                  >
                    <CheckCircle2 className="w-4 h-4 text-zinc-800 shrink-0 mt-0.5" />
                    <span className="text-xs font-medium text-zinc-700 leading-snug">
                      {spec}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-100 flex items-center justify-between flex-wrap gap-4">
              <div className="text-xs text-zinc-600">
                Projetos entregues com laudo de ensaio e garantia estendida de 5 anos.
              </div>
              <button
                id="solution-inquiry-button"
                onClick={() => {
                  const el = document.getElementById('contact-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-zinc-900 text-white text-xs font-semibold hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <span>Solicitar Memorial Descritivo</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

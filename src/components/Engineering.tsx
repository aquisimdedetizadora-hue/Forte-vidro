import React from 'react';
import { Gauge, ShieldCheck, Cpu, Sliders, FileText, Check } from 'lucide-react';

export const Engineering: React.FC = () => {
  const standards = [
    {
      code: 'ABNT NBR 7199',
      title: 'Vidros na Construção Civil',
      desc: 'Dimensionamento exato de espessura para suportar pressão de vento, dilatação térmica e impactos acidentais.',
    },
    {
      code: 'ABNT NBR 10821',
      title: 'Esquadrias para Edificações',
      desc: 'Certificação de desempenho para permeabilidade ao ar, estanqueidade à água e cargas distribuídas uniformemente.',
    },
    {
      code: 'ABNT NBR 14718',
      title: 'Guarda-Corpos para Edificações',
      desc: 'Rigorosos testes de esforço estático vertical, esforço estático horizontal e impacto de corpo mole.',
    },
  ];

  return (
    <section id="engineering-section" className="py-24 px-6 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-800 text-xs font-semibold uppercase tracking-widest mb-4">
              <Cpu className="w-3.5 h-3.5 text-zinc-900" />
              <span>Engenharia & Rigor Normativo</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-950 mb-6">
              A exatidão milimétrica que viabiliza a transparência.
            </h2>
            <p className="text-base sm:text-lg text-zinc-600 leading-relaxed">
              Grandes planos envidraçados exigem responsabilidade estrutural e física dos materiais. Na Forte Vidros, toda solução passa por cálculo de elementos finitos, seleção criteriosa de ligas de alumínio e ensaios de estanqueidade antes da instalação em obra.
            </p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80">
              <Gauge className="w-6 h-6 text-zinc-900 mb-3" />
              <div className="text-2xl font-bold text-zinc-950 mb-1">0,5 mm</div>
              <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Tolerância Dimensional</div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Cortes em centros de usinagem CNC de 5 eixos asseguram junções perfeitas em esquadrias minimalistas.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80">
              <ShieldCheck className="w-6 h-6 text-zinc-900 mb-3" />
              <div className="text-2xl font-bold text-zinc-950 mb-1">2.500 Pa</div>
              <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Pressão de Ruptura</div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Fachadas e claraboyas testadas para resistir a rajadas de ventos extremos e tempestades tropicais.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80">
              <Sliders className="w-6 h-6 text-zinc-900 mb-3" />
              <div className="text-2xl font-bold text-zinc-950 mb-1">42 dB</div>
              <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Atenuação Sonora</div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Sistemas duplos insulados com PVB acústico que isolam ruídos de tráfego intenso e centros urbanos.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80">
              <FileText className="w-6 h-6 text-zinc-900 mb-3" />
              <div className="text-2xl font-bold text-zinc-950 mb-1">100% ART</div>
              <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Responsabilidade Técnica</div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Emissão de Anotação de Responsabilidade Técnica (CREA) acompanhada de memória de cálculo para cada obra.
              </p>
            </div>
          </div>
        </div>

        {/* Standards Banner */}
        <div className="bg-zinc-900 text-white rounded-3xl p-8 sm:p-12">
          <div className="mb-8">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">
              Conformidade Regulamentar Obrigatória
            </h3>
            <div className="text-2xl sm:text-3xl font-bold text-white">
              Garantia de segurança para arquitetos, construtores e proprietários.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {standards.map((st, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-zinc-800/80 border border-zinc-700/60">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold tracking-wider mb-2 uppercase">
                  <Check className="w-4 h-4" />
                  <span>{st.code}</span>
                </div>
                <h4 className="text-base font-semibold text-white mb-2">{st.title}</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

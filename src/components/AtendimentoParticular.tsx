import React from 'react';
import { Receipt } from 'lucide-react';

export const AtendimentoParticular = () => (
  <div className="mt-10 md:mt-12 max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-4 md:gap-6 bg-sky-50 border border-sky-200 rounded-2xl px-6 py-6 md:px-8 text-center md:text-left">
    <div className="shrink-0 w-12 h-12 rounded-full bg-sky-500 flex items-center justify-center">
      <Receipt className="w-6 h-6 text-white" />
    </div>
    <div>
      <h3 className="font-heading font-bold text-slate-900 mb-1">Atendimento particular</h3>
      <p className="text-slate-600 text-sm leading-relaxed">
        O Dr. Arlan não atende por convênios — o foco é um atendimento particular
        personalizado, com nota e relatório detalhado para solicitação de reembolso junto
        ao seu plano de saúde.
      </p>
    </div>
  </div>
);

import React from 'react';
import { CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';
import { mockAiInsights } from '../data/mockData';

export default function AIInsights() {
  return (
    <div className="glass-panel p-5 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={16} className="text-violet-400" />
          <h4 className="text-sm font-semibold text-slate-200">AI Diagnostic Insights</h4>
        </div>
        <div className="space-y-3">
          {mockAiInsights.map((insight) => (
            <div key={insight.id} className="p-3 rounded-lg bg-slate-950/40 border border-slate-800/60 flex items-start gap-3">
              {insight.type === 'strength' && <CheckCircle2 size={16} className="text-emerald-400 mt-0.5 flex-shrink-0" />}
              {insight.type === 'warning' && <AlertTriangle size={16} className="text-amber-400 mt-0.5 flex-shrink-0" />}
              {insight.type === 'action' && <Sparkles size={16} className="text-violet-400 mt-0.5 flex-shrink-0" />}
              <p className="text-xs text-slate-300 leading-relaxed">{insight.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
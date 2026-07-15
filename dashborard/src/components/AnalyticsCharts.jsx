import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { mockPerformanceData } from '../data/mockData';

export default function AnalyticsCharts() {
  return (
    <div className="glass-panel p-5 h-[340px] flex flex-col justify-between">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h4 className="text-sm font-semibold text-slate-200">Performance Metrics</h4>
          <p className="text-xs text-slate-500">Rating progression & submission intensity</p>
        </div>
        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-violet-500"></span><span className="text-slate-400">Rating</span></div>
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-400"></span><span className="text-slate-400">Submissions</span></div>
        </div>
      </div>

      <div className="w-full h-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockPerformanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRating" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorSub" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
            <YAxis yAxisId="left" stroke="#64748b" fontSize={11} domain={['dataMin - 50', 'dataMax + 50']} tickLine={false} />
            <YAxis yAxisId="right" orientation="right" stroke="#64748b" fontSize={11} tickLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' }}
              itemStyle={{ fontSize: '12px' }}
              labelStyle={{ fontSize: '12px', fontWeight: 'bold', color: '#94a3b8' }}
            />
            <Area yAxisId="left" type="monotone" dataKey="Rating" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorRating)" />
            <Area yAxisId="right" type="monotone" dataKey="Submissions" stroke="#60a5fa" strokeWidth={2} fillOpacity={1} fill="url(#colorSub)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
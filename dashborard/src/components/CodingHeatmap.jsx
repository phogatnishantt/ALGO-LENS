import React from 'react';
import { mockHeatmapData } from '../data/mockData';

export default function CodingHeatmap() {
  const getColor = (val) => {
    if (val === 0) return 'bg-slate-900 border border-slate-800/80';
    if (val <= 2) return 'bg-violet-950 text-violet-300';
    if (val <= 4) return 'bg-violet-700 text-violet-100';
    return 'bg-violet-500 text-white';
  };

  return (
    <div className="glass-panel p-5">
      <h4 className="text-sm font-semibold text-slate-200 mb-1">Consistency Grid</h4>
      <p className="text-xs text-slate-500 mb-4">Submission distribution across the past 4 weeks</p>
      
      <div className="grid grid-flow-col grid-rows-7 gap-1.5 justify-start">
        {mockHeatmapData.map((day) => (
          <div 
            key={day.day}
            className={`w-6 h-6 rounded-md flex items-center justify-center text-[9px] font-bold transition-all duration-300 hover:scale-110 cursor-pointer ${getColor(day.value)}`}
            title={`Day ${day.day}: ${day.value} Accepted Submissions`}
          >
            {day.value > 0 ? day.value : ""}
          </div>
        ))}
      </div>
      
      <div className="flex justify-end gap-2 items-center mt-3 text-[10px] text-slate-500">
        <span>Less</span>
        <div className="w-2.5 h-2.5 rounded bg-slate-900 border border-slate-800"></div>
        <div className="w-2.5 h-2.5 rounded bg-violet-950"></div>
        <div className="w-2.5 h-2.5 rounded bg-violet-700"></div>
        <div className="w-2.5 h-2.5 rounded bg-violet-500"></div>
        <span>More</span>
      </div>
    </div>
  );
}
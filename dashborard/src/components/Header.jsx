import React from 'react';
import { Bell, Search, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between py-4 px-6 glass-panel rounded-none border-b border-0 border-slate-800/60 bg-[#0b0c10]/40 sticky top-0 z-30">
      <div className="relative max-w-xs w-full hidden sm:block">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
        <input 
          type="text" 
          placeholder="Search submissions, tags..." 
          className="w-full pl-9 pr-4 py-1.5 bg-slate-950/60 border border-slate-800/80 rounded-lg text-sm text-slate-300 placeholder-slate-500 focus:outline-none focus:border-violet-500/50 transition-all"
        />
      </div>
      
      <div className="flex items-center gap-4 ml-auto">
        <button className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 rounded-lg transition-all relative">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-violet-500 rounded-full"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-2 border-l border-slate-800">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-600 to-blue-500 flex items-center justify-center text-white font-semibold text-sm shadow-inner">
            CP
          </div>
          <div className="hidden md:block text-left">
            <p className="text-xs font-medium text-slate-200">CompetitiveCoder</p>
            <p className="text-[10px] text-slate-500">Tier: Expert</p>
          </div>
        </div>
      </div>
    </header>
  );
}
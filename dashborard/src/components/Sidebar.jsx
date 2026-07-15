import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { LayoutDashboard, History, Trophy, Settings, Terminal, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Sidebar() {
  const { activeTab, setActiveTab } = useDashboard();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'history', label: 'Coding Activity', icon: History },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="fixed bottom-0 left-0 z-40 w-full md:sticky md:top-0 md:h-screen md:w-64 glass-panel rounded-none border-t border-x-0 md:border-t-0 md:border-r bg-[#0e1118]/90 md:bg-transparent px-4 py-3 md:py-6 flex md:flex-col justify-between items-center md:items-stretch">
      <div className="hidden md:flex items-center gap-3 px-2 mb-8">
        <div className="p-2 bg-gradient-to-tr from-violet-600 to-blue-500 rounded-lg text-white">
          <Terminal size={20} />
        </div>
        <span className="font-bold text-lg tracking-wider bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
          Ascend<span className="text-violet-500">CP</span>
        </span>
      </div>

      <nav className="flex w-full md:flex-col justify-around md:justify-start gap-1 md:gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive ? 'text-violet-400' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute inset-0 bg-violet-500/10 border-l-2 border-violet-500 rounded-lg hidden md:block"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Icon size={18} className="relative z-10" />
              <span className="hidden md:inline relative z-10">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="hidden md:flex items-center gap-2 p-3 mt-auto rounded-lg bg-slate-900/40 border border-slate-800 text-xs text-slate-400">
        <ShieldAlert size={14} className="text-violet-400 flex-shrink-0" />
        <span>Vite Production Mock Mode</span>
      </div>
    </aside>
  );
}
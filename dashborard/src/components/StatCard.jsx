import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Award, Zap, Flame } from 'lucide-react';

const icons = [TrendingUp, Award, Zap, Flame];

export default function StatCard({ stat, index }) {
  const IconComponent = icons[index % icons.length];
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="glass-panel glass-card-hover p-5 flex flex-col justify-between min-h-[110px]"
    >
      <div className="flex justify-between items-start">
        <span className="text-xs font-medium text-slate-400 tracking-wider uppercase">{stat.title}</span>
        <div className="p-1.5 bg-slate-950/60 border border-slate-800 rounded-md text-violet-400">
          <IconComponent size={14} />
        </div>
      </div>
      <div className="mt-2 flex items-baseline justify-between">
        <h3 className="text-2xl font-bold text-slate-100 tracking-tight">{stat.value}</h3>
        <span className={`text-[11px] font-medium ${stat.type === 'up' ? 'text-emerald-400' : 'text-slate-500'}`}>
          {stat.change}
        </span>
      </div>
    </motion.div>
  );
}
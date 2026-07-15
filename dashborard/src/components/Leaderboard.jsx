import React from 'react';
import { mockLeaderboard } from '../data/mockData';

export default function Leaderboard() {
  return (
    <div className="glass-panel p-5">
      <h4 className="text-sm font-semibold text-slate-200 mb-1">Global Standing Standouts</h4>
      <p className="text-xs text-slate-500 mb-4">Realtime ranking calculation tier benchmarks</p>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <th className="pb-3 pl-2">Rank</th>
              <th className="pb-3">Handle</th>
              <th className="pb-3">Rating</th>
              <th className="pb-3 text-right pr-2">Solved</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-900/60 text-xs">
            {mockLeaderboard.map((user) => (
              <tr 
                key={user.rank} 
                className={`transition-colors ${user.isUser ? 'bg-violet-500/10 text-violet-300 font-semibold' : 'text-slate-300 hover:bg-slate-900/30'}`}
              >
                <td className="py-3.5 pl-2">#{user.rank}</td>
                <td className="py-3.5 font-mono">{user.name}</td>
                <td className="py-3.5">{user.rating}</td>
                <td className="py-3.5 text-right pr-2 font-medium">{user.solved}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatCard from './components/StatCard';
import AnalyticsCharts from './components/AnalyticsCharts';
import CodingHeatmap from './components/CodingHeatmap';
import AIInsights from './components/AIInsights';
import Leaderboard from './components/Leaderboard';
import SettingsForm from './components/SettingsForm';
import { mockStats, mockSessions } from './data/mockData';
import { useDashboard } from './context/DashboardContext';

function MainDashboardView() {
  return (
    <div className="space-y-6">
      {/* Upper Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {mockStats.map((stat, i) => (
          <StatCard key={stat.id} stat={stat} index={i} />
        ))}
      </div>

      {/* Main Insights Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AnalyticsCharts />
        </div>
        <div>
          <AIInsights />
        </div>
      </div>

      {/* Lower Operations Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <CodingHeatmap />
        </div>
        
        {/* Recent Session Logs Component */}
        <div className="lg:col-span-2 glass-panel p-5">
          <h4 className="text-sm font-semibold text-slate-200 mb-1">Recent Submissions Queue</h4>
          <p className="text-xs text-slate-500 mb-4">Live simulation metrics history log status</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-500 font-semibold border-b border-slate-800 pb-2">
                  <th className="pb-2">Problem</th>
                  <th className="pb-2">Outcome</th>
                  <th className="pb-2">Language</th>
                  <th className="pb-2 text-right">Runtime</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900/60">
                {mockSessions.map((session) => (
                  <tr key={session.id} className="text-slate-300 hover:bg-slate-900/20">
                    <td className="py-2.5 font-medium">{session.problem}</td>
                    <td className="py-2.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        session.outcome === 'Accepted' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                      }`}>
                        {session.outcome}
                      </span>
                    </td>
                    <td className="py-2.5 text-slate-400 font-mono">{session.lang}</td>
                    <td className="py-2.5 text-right text-slate-400 font-mono">{session.runtime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const { activeTab } = useDashboard();

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#08090c]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 mb-20 md:mb-0">
        <Header />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {activeTab === 'dashboard' && <MainDashboardView />}
          {activeTab === 'history' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1"><CodingHeatmap /></div>
              <div className="lg:col-span-2"><AnalyticsCharts /></div>
            </div>
          )}
          {activeTab === 'leaderboard' && <Leaderboard />}
          {activeTab === 'settings' && <SettingsForm />}
        </main>
      </div>
    </div>
  );
}
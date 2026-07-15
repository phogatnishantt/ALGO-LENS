import React, { useState } from 'react';

export default function SettingsForm() {
  const [handle, setHandle] = useState('CompetitiveCoder');
  const [webhook, setWebhook] = useState('https://api.ascendcp.com/hooks/v1/x982f');
  
  return (
    <div className="glass-panel p-6 max-w-2xl">
      <h4 className="text-base font-semibold text-slate-200 mb-1">Platform Settings</h4>
      <p className="text-xs text-slate-500 mb-6">Configure runtime variables and telemetry synchronization.</p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">CP Handle (Codeforces / CodeChef Alias)</label>
          <input 
            type="text" 
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-violet-500/60"
          />
        </div>
        
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">API Webhook Telemetry Endpoint</label>
          <input 
            type="text" 
            value={webhook}
            onChange={(e) => setWebhook(e.target.value)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-400 focus:outline-none focus:border-violet-500/60"
          />
        </div>
        
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button 
            type="button"
            className="px-4 py-2 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white rounded-lg text-xs font-semibold shadow-lg transition-all"
            onClick={() => alert('Mock preferences synced successfully!')}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
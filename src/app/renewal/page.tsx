"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function RenewalWorkspace() {
  const [activeTab, setActiveTab] = useState("ALL RENEWALS");
  
  // AI Feedback System
  const [feedbackState, setFeedbackState] = useState<Record<string, { sentiment: boolean | null, issues: string[], comment: string, submitted: boolean }>>({});
  const [activeFeedbackId, setActiveFeedbackId] = useState<string | null>(null);

  const handleFeedback = (id: string, sentiment: boolean) => {
    setFeedbackState(prev => ({ ...prev, [id]: { sentiment, issues: [], comment: '', submitted: false } }));
    if (!sentiment) setActiveFeedbackId(id);
    else setTimeout(() => setFeedbackState(prev => ({ ...prev, [id]: { ...prev[id], submitted: true } })), 1000);
  };

  const renderFeedback = (id: string) => {
    const state = feedbackState[id] || { sentiment: null, issues: [], comment: '', submitted: false };
    if (state.submitted) return (
      <div className="flex items-center gap-1 py-1 animate-in fade-in duration-500">
        <span className="material-symbols-outlined text-teal-600 text-[10px]">check_circle</span>
        <p className="text-[8px] font-bold text-teal-700 uppercase tracking-widest">Feedback Received</p>
      </div>
    );

    if (activeFeedbackId === id && state.sentiment === false) {
      return (
        <div className="mt-2 p-3 bg-white border border-outline-variant/30 rounded-lg shadow-sm animate-in zoom-in duration-200">
          <p className="text-[9px] font-bold text-slate-500 uppercase mb-2">Report AI Error</p>
          <div className="flex flex-wrap gap-1 mb-2">
            {["Churn Hallucination", "Mispriced Risk", "Context Gap"].map(issue => (
              <button key={issue} onClick={() => {}} className="text-[8px] px-2 py-0.5 rounded bg-slate-100 text-slate-600">{issue}</button>
            ))}
          </div>
          <button onClick={() => setFeedbackState(prev => ({ ...prev, [id]: { ...prev[id], submitted: true } }))} className="w-full py-1 bg-primary text-white text-[9px] font-bold rounded uppercase">Submit</button>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2 mt-2 border-t border-slate-100 pt-2">
        <span className="text-[8px] font-bold text-slate-400 uppercase">Correct?</span>
        <button onClick={() => handleFeedback(id, true)} className={`material-symbols-outlined text-xs ${state.sentiment === true ? 'text-teal-600' : 'text-slate-400'}`}>thumb_up</button>
        <button onClick={() => handleFeedback(id, false)} className={`material-symbols-outlined text-xs ${state.sentiment === false ? 'text-error' : 'text-slate-400'}`}>thumb_down</button>
      </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col pt-16 h-screen overflow-hidden bg-surface">
      {/* Header Section */}
      <section className="bg-white px-8 py-6 border-b border-slate-200 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-extrabold text-primary">Renewal Intelligence</h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">Managing retention for Portfolio Cycle: Q2 2024</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-teal-50 px-4 py-2 rounded-lg border border-teal-100">
            <p className="text-[9px] font-bold text-teal-700 uppercase tracking-widest">Retention Ratio</p>
            <p className="text-xl font-black text-teal-900">92.4%</p>
          </div>
          <div className="bg-amber-50 px-4 py-2 rounded-lg border border-amber-100">
            <p className="text-[9px] font-bold text-amber-700 uppercase tracking-widest">Churn Risk (Expiring)</p>
            <p className="text-xl font-black text-amber-900">₹4.2 Cr</p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Work Queue */}
        <section className="flex-1 overflow-y-auto p-8 space-y-8">
          <div className="flex gap-4 border-b border-slate-200 mb-6">
            {["ALL RENEWALS", "HIGH CHURN RISK", "PENDING TERMS"].map(t => (
              <button 
                key={t}
                onClick={() => setActiveTab(t)}
                className={`pb-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative ${activeTab === t ? 'text-primary' : 'text-slate-400'}`}
              >
                {t}
                {activeTab === t && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary animate-in fade-in slide-in-from-left-2"></div>}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full text-left table-auto">
              <thead className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold uppercase text-slate-500 tracking-widest">
                <tr>
                  <th className="px-6 py-4">Policyholder</th>
                  <th className="px-6 py-4">Expiry Date</th>
                  <th className="px-6 py-4">Current Premium</th>
                  <th className="px-6 py-4">AI Churn Score</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { id: 'R-7721', name: 'Digital Dynamics Inc.', expiry: '2024-05-12', premium: '₹12,40,000', score: 12, label: 'LOW' },
                  { id: 'R-8832', name: 'SecureStream Logistics', expiry: '2024-05-18', premium: '₹4,50,000', score: 68, label: 'HIGH' },
                  { id: 'R-9011', name: 'CloudScale Data Systems', expiry: '2024-06-02', premium: '₹45,00,000', score: 84, label: 'CRITICAL' },
                  { id: 'R-1022', name: 'Apex Health Systems', expiry: '2024-06-15', premium: '₹8,90,000', score: 24, label: 'LOW' }
                ].map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-primary">{item.name}</span>
                        <span className="text-[10px] text-slate-400 font-medium">{item.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                       <span className={`text-[11px] font-bold ${item.score > 70 ? 'text-error' : 'text-slate-600'}`}>{item.expiry}</span>
                    </td>
                    <td className="px-6 py-5 text-sm font-semibold">{item.premium}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-24 bg-slate-100 h-1 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${item.score > 70 ? 'bg-error' : item.score > 40 ? 'bg-amber-500' : 'bg-teal-500'}`} style={{ width: `${item.score}%` }}></div>
                        </div>
                        <span className={`text-[10px] font-black ${item.score > 70 ? 'text-error' : 'text-slate-500'}`}>{item.score}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="text-[10px] font-bold text-primary border border-primary/20 px-3 py-1.5 rounded-lg hover:bg-primary hover:text-white transition-all uppercase tracking-widest">Analyze</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Right: AI Intelligence Hub */}
        <aside className="w-[400px] bg-slate-50 border-l border-slate-200 p-8 overflow-y-auto space-y-8">
           <div className="flex items-center justify-between mb-4">
              <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">psychology</span> Renewal Intelligence
              </h3>
              <span className="text-[8px] bg-primary text-white px-2 py-0.5 rounded font-black">ACTIVE</span>
           </div>

           {/* Prediction Card 1 */}
           <div className="bg-white p-5 rounded-2xl shadow-sm border border-primary/5 group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[9px] font-black bg-teal-50 text-teal-700 px-2 py-0.5 rounded border border-teal-200 flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">verified</span> 98% CONFIDENCE</span>
              </div>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Churn Prediction: SecureStream</p>
              <h4 className="text-sm font-black text-primary leading-snug mb-3">High Churn Risk detected due to sectoral premium drift.</h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Logistic sector data indicates a <span className="text-error font-bold">-12% softening</span> in market rates. Current terms are 4.5% above peer median.
              </p>
              <div className="flex justify-between items-center text-[10px]">
                <span className="font-bold text-primary flex items-center gap-1 cursor-pointer hover:underline"><span className="material-symbols-outlined text-xs">analytics</span> View Market Comp</span>
                <span className="font-black text-teal-600">RE-PRICE SUGGESTED</span>
              </div>
              {renderFeedback('churn-prediction-securestream')}
           </div>

           {/* Prediction Card 2 */}
           <div className="bg-white p-5 rounded-2xl shadow-sm border border-primary/5 group overflow-hidden">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Upsell Signal: Digital Dynamics</p>
              <h4 className="text-sm font-black text-primary leading-snug mb-3">Upsell potential identified; Client expanded EDR footprint by 40%.</h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                System detection shows EDR rollout complete. Recommendation: Pitch <span className="text-teal-600 font-bold">Comprehensive Cyber</span> with 25% lower deductible.
              </p>
              <div className="flex justify-between items-center text-[10px]">
                 <span className="font-bold text-primary flex items-center gap-1 cursor-pointer hover:underline"><span className="material-symbols-outlined text-xs">add_task</span> Prepare Terms</span>
                 <span className="font-black text-teal-600">92% SUCCESS PROB.</span>
              </div>
              {renderFeedback('upsell-digital')}
           </div>

           <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
              <h5 className="text-[10px] font-black text-primary uppercase mb-4">Renewal Co-pilot Tips</h5>
              <div className="space-y-4">
                <div className="flex gap-4">
                   <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 opacity-40"></div>
                   <p className="text-xs text-slate-600 leading-relaxed italic">"Focus on the FinTech segment this week; retention rates are 4% higher for policies with ₹10Cr+ limit."</p>
                </div>
                <div className="flex gap-4">
                   <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 opacity-40"></div>
                   <p className="text-xs text-slate-600 leading-relaxed italic">"Market drift detected in Healthcare. Expect downward pressure on premiums."</p>
                </div>
              </div>
           </div>
        </aside>
      </div>
    </div>
  );
}

"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [feedbackState, setFeedbackState] = React.useState<Record<string, { sentiment: boolean | null, issues: string[], comment: string, submitted: boolean }>>({});
  const [activeFeedbackId, setActiveFeedbackId] = React.useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleFeedback = (id: string, sentiment: boolean) => {
    setFeedbackState(prev => ({ ...prev, [id]: { sentiment, issues: [], comment: '', submitted: false } }));
    if (!sentiment) setActiveFeedbackId(id);
    else setTimeout(() => setFeedbackState(prev => ({ ...prev, [id]: { ...prev[id], submitted: true } })), 1000);
  };

  const renderFeedback = (id: string) => {
    const state = feedbackState[id] || { sentiment: null, issues: [], comment: '', submitted: false };
    if (state.submitted) return <p className="text-[9px] font-bold text-teal-400 mt-2 uppercase">Feedback Received</p>;

    if (activeFeedbackId === id && state.sentiment === false) {
      return (
        <div className="mt-3 p-3 bg-white/5 border border-white/10 rounded-lg animate-in zoom-in duration-200">
          <p className="text-[9px] font-bold text-slate-400 uppercase mb-2">Report Inaccuracy</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {["Fact Error", "Context Gap", "Mismatch"].map(issue => (
              <button 
                key={issue}
                onClick={() => {
                   const issues = state.issues.includes(issue) ? state.issues.filter(i => i !== issue) : [...state.issues, issue];
                   setFeedbackState(prev => ({ ...prev, [id]: { ...prev[id], issues } }));
                }}
                className={`text-[8px] px-2 py-1 rounded ${state.issues.includes(issue) ? 'bg-primary text-white' : 'bg-white/10 text-slate-400'}`}
              >
                {issue}
              </button>
            ))}
          </div>
          <button 
            onClick={() => setFeedbackState(prev => ({ ...prev, [id]: { ...prev[id], submitted: true } }))}
            className="w-full py-1.5 bg-primary text-white text-[9px] font-bold rounded uppercase"
          >
            Submit
          </button>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2 mt-2 opacity-60 hover:opacity-100 transition-opacity">
        <span className="text-[8px] font-bold text-slate-500 uppercase">Correct?</span>
        <button onClick={() => handleFeedback(id, true)} className={`material-symbols-outlined text-xs ${state.sentiment === true ? 'text-teal-400' : 'text-slate-500'}`}>thumb_up</button>
        <button onClick={() => handleFeedback(id, false)} className={`material-symbols-outlined text-xs ${state.sentiment === false ? 'text-error' : 'text-slate-500'}`}>thumb_down</button>
      </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col space-y-10 p-10 max-w-[1600px]">
      <section className="flex flex-col md:flex-row justify-between items-end gap-6 pt-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-primary leading-tight">Good morning, Pranav</h1>
          <div className="flex items-center gap-4 mt-2">
            <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest">Cyber Underwriter</span>
            <div className="flex items-center gap-2 text-on-surface-variant text-sm">
              <span className="material-symbols-outlined text-sm text-tertiary-fixed-dim" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
              <span className="font-medium">5 New, 3 Pending, 2 High-Risk</span>
            </div>
          </div>
        </div>
        <div className="bg-error-container text-on-error-container px-4 py-3 rounded-xl flex items-center gap-3 border border-error/10 cursor-pointer hover:bg-error-container/80 transition-colors" title="1 High Risk | 1 Medium Risk">
          <span className="material-symbols-outlined animate-pulse">priority_high</span>
          <p className="text-xs font-semibold uppercase tracking-wider">SLA AWARENESS: 2 CASES NEARING SLA BREACH</p>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-slate-200 border-b-2 hover:border-primary transition-all group">
          <p className="text-on-surface-variant text-[11px] font-bold uppercase tracking-[0.15em] mb-4">New Proposals</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-primary">5</span>
            <span className="text-xs text-on-surface-variant font-medium">Unopened</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-slate-200 border-2 border-amber-400 transition-all hover:bg-amber-50/10 cursor-pointer">
          <p className="text-on-surface-variant text-[11px] font-bold uppercase tracking-[0.15em] mb-4">Pending Reviews</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-primary">2</span>
            <span className="text-[10px] text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200/50">SLA &lt; 24h</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-error border-2 hover:bg-error/5 transition-all cursor-pointer group">
          <p className="text-error text-[11px] font-bold uppercase tracking-[0.15em] mb-4">SLA Breached</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-error">1</span>
            <span className="text-[10px] text-white font-bold bg-error px-2 py-0.5 rounded flex items-center gap-1"><span className="material-symbols-outlined text-[12px] animate-pulse">priority_high</span>CRITICAL</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-slate-200 border-b-2 hover:border-primary transition-all">
          <p className="text-on-surface-variant text-[11px] font-bold uppercase tracking-[0.15em] mb-4">Referrals</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-primary">1</span>
            <span className="text-xs text-on-surface-variant font-medium">Sent by me</span>
          </div>
        </div>
        <Link href="/renewal" className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-slate-200 border-b-2 hover:border-primary transition-all group cursor-pointer hover:bg-slate-50">
          <p className="text-on-surface-variant text-[11px] font-bold uppercase tracking-[0.15em] mb-4 group-hover:text-primary transition-colors">Renewals Due</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-primary">8</span>
            <span className="text-xs text-on-surface-variant font-medium">0-30 days</span>
          </div>
        </Link>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-200/20 rounded-xl overflow-hidden shadow-2xl">
          <div className="px-6 py-4 flex items-center justify-between bg-white/5 border-b border-white/10">
            <h3 className="text-teal-400 font-bold uppercase tracking-[0.2em] text-[10px]">Agentic Alerts</h3>
            <span className="material-symbols-outlined text-teal-400 text-sm">psychology</span>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col h-full bg-white/5 p-5 rounded-lg border border-white/5">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-error text-lg">error</span>
                <p className="text-white text-xs font-bold uppercase tracking-wider">Risk Alert</p>
                <span className="ml-auto text-[9px] font-bold bg-teal-400/10 text-teal-400 px-1.5 py-0.5 rounded border border-teal-400/20 whitespace-nowrap">CONFIDENCE: HIGH</span>
              </div>
              <div className="flex-1">
                <p className="text-slate-300 text-sm leading-relaxed">3 Healthcare risks identified in queue <span className="text-teal-400">without MFA</span> implementation. High correlation with current sectoral breach trends.</p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5">
                {renderFeedback("alert-risk")}
              </div>
            </div>
            <div className="flex flex-col h-full bg-white/5 p-5 rounded-lg border border-white/5">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-teal-400 text-lg">lightbulb</span>
                <p className="text-white text-xs font-bold uppercase tracking-wider">Referral Insights</p>
                <span className="ml-auto text-[9px] font-bold bg-amber-400/10 text-amber-400 px-1.5 py-0.5 rounded border border-amber-400/20 whitespace-nowrap">CONFIDENCE: MED</span>
              </div>
              <div className="flex-1">
                <p className="text-slate-300 text-sm leading-relaxed">Historical data suggests <span className="text-teal-400">Deductibles ≥₹10L</span> have a 45% higher approval rate for similar risk profiles.</p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5">
                {renderFeedback("alert-referral")}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-200/20 p-6 rounded-xl flex flex-col justify-between shadow-2xl">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <h3 className="text-teal-400 text-[11px] font-bold uppercase tracking-[0.2em]">Portfolio Signals</h3>
              <span className="material-symbols-outlined text-teal-400 text-sm">monitoring</span>
            </div>
            <div className="flex flex-col gap-y-3">
              {/* Row 1 */}
              <div className="grid grid-cols-[1fr_80px_100px] items-center gap-4 py-2 border-b border-white/5 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed-dim"></div>
                  <span className="text-sm font-medium text-slate-300">Aggregated Ransomware Exposure</span>
                </div>
                <span className="text-xs font-bold text-teal-400 text-right">Stable</span>
                <div className="flex justify-end scale-90 origin-right">
                  {renderFeedback("sig-ransom")}
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-[1fr_80px_100px] items-center gap-4 py-2 border-b border-white/5 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-error"></div>
                  <span className="text-sm font-medium text-slate-300">Supply Chain Vulnerability</span>
                </div>
                <span className="text-xs font-bold text-error text-right">+12%</span>
                <div className="flex justify-end scale-90 origin-right">
                  {renderFeedback("sig-supply")}
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-[1fr_80px_100px] items-center gap-4 py-2 border-b border-white/5 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                  <span className="text-sm font-medium text-slate-300">Renewal Retention Rate</span>
                </div>
                <span className="text-xs font-bold text-white text-right">92%</span>
                <div className="flex justify-end scale-90 origin-right">
                  {renderFeedback("sig-retention")}
                </div>
              </div>

              {/* Portfolio Drift Signal */}
              <div className="mt-2 bg-white/5 px-4 py-3 rounded-lg border border-white/5">
                <div className="flex items-start gap-3 mb-2">
                  <img className="w-7 h-7 rounded-sm object-cover shrink-0 ring-1 ring-white/10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAv_-s4-kM-xS3Rd9CQ1k-QYm6ulhdFTHn8g5VGKUAHTUy3GKt79oN3y-5pu9OZoiRiqGFgING5HQhOzfL3GdZcsuas9RqNPT49wcZILjS6MDHKmNT0vcAtNKgYjU_lexxc2xEybLCz4cGSv7EacIizshUN3YxhJZgROo1MGqQAfN8No2QYhqfqNJVvkcNxmz7SRR_KVJF3bzFwOf7EjpBeO46EbwKZdTHmooaWwApMz-xzQ2pllnCiP5iFYXW5YPoQKGVMSgMKiXM" alt="Portfolio drift signal"/>
                  <p className="text-[11px] text-slate-300 leading-tight">
                    <span className="font-bold text-teal-400 uppercase mr-1">Portfolio Drift:</span> 
                    Increased exposure in FinTech sector detected across 12 high-limit accounts.
                  </p>
                </div>
                <div className="pt-2 border-t border-white/5">
                  {renderFeedback("sig-drift")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-container-lowest rounded-xl shadow-sm border border-slate-200 overflow-hidden w-full">
        <div className="px-8 py-6 flex justify-between items-center border-b border-slate-200">
          <h2 className="text-lg font-bold text-primary">Priority Work Queue</h2>
          <button className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant flex items-center gap-2 hover:text-primary transition-colors">
            View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1200px] table-auto whitespace-nowrap">
            <thead>
              <tr className="bg-surface-container-low text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                <th className="px-8 py-4 text-left w-24">Priority</th>
                <th className="px-6 py-4 text-left">Proposal ID</th>
                <th className="px-6 py-4 text-left">Customer Name</th>
                <th className="px-6 py-4 text-center">Risk</th>
                <th className="px-6 py-4 text-left">Stage</th>
                <th className="px-6 py-4 text-left">SLA</th>
                <th className="px-8 py-4 text-left">SUGGESTED ACTION</th>
                <th className="px-8 py-4 text-right">ACTIONS</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {/* Row 1 */}
              <tr className="hover:bg-surface-container-high transition-colors group cursor-pointer">
                <td className="px-8 py-6 relative group">
                  <span className="material-symbols-outlined text-error cursor-help" style={{ fontVariationSettings: "'FILL' 1" }}>error</span>
                  <div className="absolute left-16 top-1/2 -translate-y-1/2 w-64 whitespace-normal bg-slate-800 text-white p-3 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 shadow-xl text-xs before:content-[''] before:absolute before:right-full before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-transparent before:border-r-slate-800 pointer-events-none">
                    <p className="font-bold mb-1.5 text-slate-400 uppercase tracking-widest text-[9px]">Priority Triggers</p>
                    <ul className="list-disc pl-3 space-y-1 text-[10px] marker:text-error">
                      <li><strong>TAT Breach:</strong> &gt;24h in Intake Review</li>
                      <li>High Severity Security Alert (EASM)</li>
                    </ul>
                  </div>
                </td>
                <td className="px-6 py-6 font-medium">CYB-9021</td>
                <td className="px-6 py-6">Acme FinTech Ltd.</td>
                <td className="px-6 py-6 text-center"><div className="flex flex-col items-center gap-1 min-w-[100px]"><div className="flex justify-between w-full text-[10px] font-bold text-error"><span>82/100</span></div><div className="w-full bg-error-container h-1.5 rounded-full overflow-hidden"><div className="bg-error h-full rounded-full" style={{ width: '82%' }}></div></div><span className="text-[9px] font-extrabold text-error/70 uppercase tracking-tighter">HIGH</span></div></td>
                <td className="px-6 py-6 text-sm">Intake Review</td>
                <td className="px-6 py-6 text-sm">8h</td>
                <td className="px-8 py-6"><div className="inline-flex items-center px-3 py-1 rounded text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200 uppercase tracking-wide">Review controls</div></td>
                <td className="px-8 py-6 text-right">
                  <div className="flex justify-end items-center gap-4 text-slate-400">
                    <Link href="/case?id=CYB-9021" className="hover:text-primary transition-colors flex items-center justify-center" title="Open Case">
                      <span className="material-symbols-outlined text-[20px]">search</span>
                    </Link>
                    <Link href="/case?id=CYB-9021&tab=RISK" className="hover:text-error transition-colors flex items-center justify-center" title="Jump to issue tab">
                      <span className="material-symbols-outlined text-[20px]">warning</span>
                    </Link>
                  </div>
                </td>
              </tr>
              {/* Row 2 */}
              <tr className="hover:bg-surface-container-high transition-colors group cursor-pointer">
                <td className="px-8 py-6 relative group">
                  <span className="material-symbols-outlined text-amber-500 cursor-help" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                  <div className="absolute left-16 top-1/2 -translate-y-1/2 w-64 whitespace-normal bg-slate-800 text-white p-3 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 shadow-xl text-xs before:content-[''] before:absolute before:right-full before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-transparent before:border-r-slate-800 pointer-events-none">
                    <p className="font-bold mb-1.5 text-slate-400 uppercase tracking-widest text-[9px]">Priority Triggers</p>
                    <ul className="list-disc pl-3 space-y-1 text-[10px] marker:text-amber-500">
                      <li><strong>SLA Warning:</strong> 4h remaining on Referral</li>
                      <li>Pending Authority Approval (₹40Cr limits)</li>
                    </ul>
                  </div>
                </td>
                <td className="px-6 py-6 font-medium">CYB-8834</td>
                <td className="px-6 py-6">Global Healthcare Inc.</td>
                <td className="px-6 py-6 text-center"><div className="flex flex-col items-center gap-1 min-w-[100px]"><div className="flex justify-between w-full text-[10px] font-bold text-amber-600"><span>45/100</span></div><div className="w-full bg-amber-100 h-1.5 rounded-full overflow-hidden"><div className="bg-amber-500 h-full rounded-full" style={{ width: '45%' }}></div></div><span className="text-[9px] font-extrabold text-amber-600/70 uppercase tracking-tighter">MEDIUM</span></div></td>
                <td className="px-6 py-6 text-sm">Policy Structuring</td>
                <td className="px-6 py-6 text-sm">2d</td>
                <td className="px-8 py-6"><div className="inline-flex items-center px-3 py-1 rounded text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200 uppercase tracking-wide">Prepare referral</div></td>
                <td className="px-8 py-6 text-right">
                  <div className="flex justify-end items-center gap-4 text-slate-400">
                    <Link href="/case?id=CYB-8834" className="hover:text-primary transition-colors flex items-center justify-center" title="Open Case">
                      <span className="material-symbols-outlined text-[20px]">search</span>
                    </Link>
                    <Link href="/case?id=CYB-8834&tab=COVERAGE" className="hover:text-error transition-colors flex items-center justify-center" title="Jump to issue tab">
                      <span className="material-symbols-outlined text-[20px]">warning</span>
                    </Link>
                  </div>
                </td>
              </tr>
              {/* Row 3 */}
              <tr className="hover:bg-surface-container-high transition-colors group cursor-pointer">
                <td className="px-8 py-6 relative group">
                  <span className="material-symbols-outlined text-slate-300 cursor-help">check_circle</span>
                  <div className="absolute left-16 top-1/2 -translate-y-1/2 w-64 whitespace-normal bg-slate-800 text-white p-3 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 shadow-xl text-xs before:content-[''] before:absolute before:right-full before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-transparent before:border-r-slate-800 pointer-events-none">
                    <p className="font-bold mb-1.5 text-slate-400 uppercase tracking-widest text-[9px]">Priority Triggers</p>
                    <ul className="list-disc pl-3 space-y-1 text-[10px] marker:text-teal-400 text-slate-300">
                      <li>Standard SLA tracking</li>
                      <li>No outstanding subjectivities</li>
                    </ul>
                  </div>
                </td>
                <td className="px-6 py-6 font-medium">CYB-9102</td>
                <td className="px-6 py-6">NexGen Logistics</td>
                <td className="px-6 py-6 text-center"><div className="flex flex-col items-center gap-1 min-w-[100px]"><div className="flex justify-between w-full text-[10px] font-bold text-slate-500"><span>18/100</span></div><div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden"><div className="bg-slate-400 h-full rounded-full" style={{ width: '18%' }}></div></div><span className="text-[9px] font-extrabold text-slate-500/70 uppercase tracking-tighter">LOW</span></div></td>
                <td className="px-6 py-6 text-sm">Final Review</td>
                <td className="px-6 py-6 text-sm">5d</td>
                <td className="px-8 py-6"><div className="inline-flex items-center px-3 py-1 rounded text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200 uppercase tracking-wide">Await info</div></td>
                <td className="px-8 py-6 text-right">
                  <div className="flex justify-end items-center gap-4 text-slate-400">
                    <Link href="/case?id=CYB-9102" className="hover:text-primary transition-colors flex items-center justify-center" title="Open Case">
                      <span className="material-symbols-outlined text-[20px]">search</span>
                    </Link>
                    <Link href="/case?id=CYB-9102&tab=PRICING" className="hover:text-error transition-colors flex items-center justify-center" title="Jump to issue tab">
                      <span className="material-symbols-outlined text-[20px]">warning</span>
                    </Link>
                  </div>
                </td>
              </tr>
              {/* Row 4 */}
              <tr className="hover:bg-surface-container-high transition-colors group cursor-pointer">
                <td className="px-8 py-6 relative group">
                  <span className="material-symbols-outlined text-error cursor-help" style={{ fontVariationSettings: "'FILL' 1" }}>error</span>
                  <div className="absolute left-16 top-1/2 -translate-y-1/2 w-64 whitespace-normal bg-slate-800 text-white p-3 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 shadow-xl text-xs before:content-[''] before:absolute before:right-full before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-transparent before:border-r-slate-800 pointer-events-none">
                    <p className="font-bold mb-1.5 text-slate-400 uppercase tracking-widest text-[9px]">Priority Triggers</p>
                    <ul className="list-disc pl-3 space-y-1 text-[10px] marker:text-error">
                      <li><strong>Escalation:</strong> Ransomware claims history detected</li>
                      <li>Immediate UW review required for limit containment</li>
                    </ul>
                  </div>
                </td>
                <td className="px-6 py-6 font-medium">CYB-9055</td>
                <td className="px-6 py-6">CloudScale Data</td>
                <td className="px-6 py-6 text-center"><div className="flex flex-col items-center gap-1 min-w-[100px]"><div className="flex justify-between w-full text-[10px] font-bold text-error"><span>76/100</span></div><div className="w-full bg-error-container h-1.5 rounded-full overflow-hidden"><div className="bg-error h-full rounded-full" style={{ width: '76%' }}></div></div><span className="text-[9px] font-extrabold text-error/70 uppercase tracking-tighter">HIGH</span></div></td>
                <td className="px-6 py-6 text-sm">Risk Analysis</td>
                <td className="px-6 py-6 text-sm">12h</td>
                <td className="px-8 py-6"><div className="inline-flex items-center px-3 py-1 rounded text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200 uppercase tracking-wide">Review controls</div></td>
                <td className="px-8 py-6 text-right">
                  <div className="flex justify-end items-center gap-4 text-slate-400">
                    <Link href="/case?id=CYB-9055" className="hover:text-primary transition-colors flex items-center justify-center" title="Open Case">
                      <span className="material-symbols-outlined text-[20px]">search</span>
                    </Link>
                    <Link href="/case?id=CYB-9055&tab=RISK" className="hover:text-error transition-colors flex items-center justify-center" title="Jump to issue tab">
                      <span className="material-symbols-outlined text-[20px]">warning</span>
                    </Link>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
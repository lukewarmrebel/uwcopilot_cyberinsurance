"use client";
import React, { useState } from "react";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="bg-surface text-on-background min-h-screen flex">

<aside className={`h-screen w-64 fixed left-0 top-0 overflow-y-auto bg-slate-950 dark:bg-black flex flex-col shadow-2xl z-50 py-6 px-4 gap-2 transition-transform duration-300 z-[60] ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
<div className="mb-8 px-2">
<div className="flex items-center gap-3">
<div className="w-8 h-8 bg-teal-400 flex items-center justify-center rounded-sm">
<span className="material-symbols-outlined text-slate-950" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
</div>
<div>
<div className="text-lg font-bold text-white font-headline">Sovereign Curator</div>
<div className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Intelligence Hub</div>
</div>
</div>
</div>
<nav className="flex-1 space-y-1">
<a className="flex items-center gap-3 px-4 py-3 bg-slate-800 text-teal-400 border-r-4 border-teal-400 transition-all duration-200 translate-x-1" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="text-xs font-semibold uppercase tracking-wider font-label">Dashboard</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-900 transition-all duration-200 hover:translate-x-1" href="#">
<span className="material-symbols-outlined">work</span>
<span className="text-xs font-semibold uppercase tracking-wider font-label">My Cases</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-900 transition-all duration-200 hover:translate-x-1" href="#">
<span className="material-symbols-outlined">assignment_late</span>
<span className="text-xs font-semibold uppercase tracking-wider font-label">Referrals</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-900 transition-all duration-200 hover:translate-x-1" href="#">
<span className="material-symbols-outlined">refresh</span>
<span className="text-xs font-semibold uppercase tracking-wider font-label">Renewals</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-900 transition-all duration-200 hover:translate-x-1" href="#">
<span className="material-symbols-outlined">pie_chart</span>
<span className="text-xs font-semibold uppercase tracking-wider font-label">Portfolio</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-900 transition-all duration-200 hover:translate-x-1" href="#">
<span className="material-symbols-outlined">security</span>
<span className="text-xs font-semibold uppercase tracking-wider font-label">Audit</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-900 transition-all duration-200 hover:translate-x-1" href="#">
<span className="material-symbols-outlined">menu_book</span>
<span className="text-xs font-semibold uppercase tracking-wider font-label">Knowledge Base</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-900 transition-all duration-200 hover:translate-x-1" href="#">
<span className="material-symbols-outlined">admin_panel_settings</span>
<span className="text-xs font-semibold uppercase tracking-wider font-label">Admin</span>
</a>
</nav>
<div className="mt-auto space-y-1 border-t border-slate-800 pt-4">
<a className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-900 transition-all duration-200" href="#">
<span className="material-symbols-outlined">settings</span>
<span className="text-xs font-semibold uppercase tracking-wider font-label">Settings</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-900 transition-all duration-200" href="#">
<span className="material-symbols-outlined">help</span>
<span className="text-xs font-semibold uppercase tracking-wider font-label">Support</span>
</a>
<div className="flex items-center gap-3 px-2 mt-4">
<img alt="Underwriter Portrait" className="w-10 h-10 rounded-full border border-slate-700 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfyvK_G1CYMLTQ_Sk5eGE0kfzo1e00F3YkA7ATrTbaK8xaGwfuKYCgj4M8XFxYU-4BqO6r9BLyjHCfi5icJoprVDuI25n7xwJI5-QV0SgTDU30knYYlgZZdJrCVtVvOtgFTXLNqtzWkqjTcQOsWQX2TTEdWmkF9OMO6BvhcL8nycq7grc8gtWYMG3giITjnSZiJgGdzrBi88b3v0GI_gTFsi8JvBqk--XUQBu1X_i5waR-iMZLhzCC9e89UMq-6vX_qvA4PXV96no"/>
<div className="overflow-hidden">
<p className="text-white text-sm font-semibold truncate">Pranav</p>
<p className="text-teal-400 text-[10px] uppercase tracking-tighter">Cyber Underwriter</p>
</div>
</div>
</div>
</aside>
<main className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
<header className={`fixed top-0 right-0 h-16 z-40 bg-white dark:bg-slate-900 flex justify-between items-center px-6 border-b border-slate-100 dark:border-slate-800/50 transition-all duration-300 ${isSidebarOpen ? 'w-[calc(100%-16rem)]' : 'w-full'}`}>
<div className="flex items-center gap-4 flex-1">
<button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 -ml-2 text-slate-500 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors flex items-center justify-center">
  <span className="material-symbols-outlined">menu</span>
</button>
<div className="relative w-96">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
<input className="w-full bg-slate-100 dark:bg-slate-800/50 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-slate-300 transition-all font-body text-slate-950 dark:text-white" placeholder="Search proposals, clients, or risks..." type="text"/>
</div>
</div>
<div className="flex items-center gap-6">
<div className="flex items-center gap-4">
<span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-label">Cyber Underwriter | Authority: ₹25 Cr</span>
<div className="h-6 w-px bg-slate-200 dark:bg-slate-700"></div>
<div className="relative cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 p-2 rounded-full transition-colors active:opacity-80 active:scale-[0.99]">
<span className="material-symbols-outlined text-slate-950 dark:text-white">notifications</span>
<span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-white dark:border-slate-900"></span>
</div>
</div>
<img alt="User Profile Avatar" className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfyvK_G1CYMLTQ_Sk5eGE0kfzo1e00F3YkA7ATrTbaK8xaGwfuKYCgj4M8XFxYU-4BqO6r9BLyjHCfi5icJoprVDuI25n7xwJI5-QV0SgTDU30knYYlgZZdJrCVtVvOtgFTXLNqtzWkqjTcQOsWQX2TTEdWmkF9OMO6BvhcL8nycq7grc8gtWYMG3giITjnSZiJgGdzrBi88b3v0GI_gTFsi8JvBqk--XUQBu1X_i5waR-iMZLhzCC9e89UMq-6vX_qvA4PXV96no"/>
</div>
</header>
<div className="mt-16 p-10 space-y-10 max-w-[1600px]">
<section className="flex flex-col md:flex-row justify-between items-end gap-6">
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
<section className="grid grid-cols-1 md:grid-cols-4 gap-6">
<div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-slate-200 border-b-2 hover:border-primary transition-all group">
<p className="text-on-surface-variant text-[11px] font-bold uppercase tracking-[0.15em] mb-4">New Proposals</p>
<div className="flex items-baseline gap-2">
<span className="text-4xl font-extrabold text-primary">5</span>
<span className="text-xs text-on-surface-variant font-medium">Unopened</span>
</div>
</div>
<div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-slate-200 border-2 border-amber-400 transition-all">
<p className="text-on-surface-variant text-[11px] font-bold uppercase tracking-[0.15em] mb-4">Pending Reviews</p>
<div className="flex items-baseline gap-2">
<span className="text-4xl font-extrabold text-primary">3</span>
<span className="text-[10px] text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded">SLA &lt; 24h</span>
<span className="text-[10px] text-white font-bold bg-error px-2 py-0.5 rounded flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">priority_high</span>SLA BREACH</span></div>
</div>
<div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-slate-200 border-b-2 hover:border-primary transition-all">
<p className="text-on-surface-variant text-[11px] font-bold uppercase tracking-[0.15em] mb-4">Referrals</p>
<div className="flex items-baseline gap-2">
<span className="text-4xl font-extrabold text-primary">1</span>
<span className="text-xs text-on-surface-variant font-medium">Sent by me</span>
</div>
</div>
<div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-slate-200 border-b-2 hover:border-primary transition-all">
<p className="text-on-surface-variant text-[11px] font-bold uppercase tracking-[0.15em] mb-4">Renewals Due</p>
<div className="flex items-baseline gap-2">
<span className="text-4xl font-extrabold text-primary">8</span>
<span className="text-xs text-on-surface-variant font-medium">0-30 days</span>
</div>
</div>
</section>
<section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
<div className="bg-slate-900/90 backdrop-blur-xl border border-slate-200/20 rounded-xl overflow-hidden shadow-2xl">
<div className="px-6 py-4 flex items-center justify-between bg-white/5 border-b border-white/10">
<h3 className="text-teal-400 font-bold uppercase tracking-[0.2em] text-[10px]">Agentic Alerts</h3>
<span className="material-symbols-outlined text-teal-400 text-sm">psychology</span>
</div>
<div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
<div className="space-y-3">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-error text-lg">error</span>
<p className="text-white text-xs font-bold uppercase tracking-wider">Risk Alert</p><span className="ml-auto text-[9px] font-bold bg-teal-400/10 text-teal-400 px-1.5 py-0.5 rounded border border-teal-400/20 whitespace-nowrap">CONFIDENCE: HIGH</span>
</div>
<div className="bg-white/5 p-4 rounded-lg">
<p className="text-slate-300 text-sm leading-relaxed">3 Healthcare risks identified in queue <span className="text-teal-400">without MFA</span> implementation. High correlation with current sectoral breach trends.</p>
</div>
</div>
<div className="space-y-3">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-teal-400 text-lg">lightbulb</span>
<p className="text-white text-xs font-bold uppercase tracking-wider">Referral Insights</p><span className="ml-auto text-[9px] font-bold bg-amber-400/10 text-amber-400 px-1.5 py-0.5 rounded border border-amber-400/20 whitespace-nowrap">CONFIDENCE: MED</span>
</div>
<div className="bg-white/5 p-4 rounded-lg">
<p className="text-slate-300 text-sm leading-relaxed">Historical data suggests <span className="text-teal-400">Deductibles ≥₹10L</span> have a 45% higher approval rate for similar risk profiles.</p>
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
<div className="flex flex-col gap-y-4">
<div className="flex justify-between items-center whitespace-nowrap">
<div className="flex items-center gap-3">
<div className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed-dim"></div>
<span className="text-sm font-medium text-slate-300">Aggregated Ransomware Exposure</span>
</div>
<span className="text-xs font-bold text-teal-400">Stable</span>
</div>
<div className="flex justify-between items-center whitespace-nowrap">
<div className="flex items-center gap-3">
<div className="w-1.5 h-1.5 rounded-full bg-error"></div>
<span className="text-sm font-medium text-slate-300">Supply Chain Vulnerability</span>
</div>
<span className="text-xs font-bold text-error">+12%</span>
</div>
<div className="flex justify-between items-center whitespace-nowrap">
<div className="flex items-center gap-3">
<div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
<span className="text-sm font-medium text-slate-300">Renewal Retention Rate</span>
</div>
<span className="text-xs font-bold text-white">92%</span>
</div>
<div className="bg-white/5 px-3 py-2 rounded flex items-start gap-3 border border-white/5">
<img className="w-6 h-6 rounded-sm object-cover shrink-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAv_-s4-kM-xS3Rd9CQ1k-QYm6ulhdFTHn8g5VGKUAHTUy3GKt79oN3y-5pu9OZoiRiqGFgING5HQhOzfL3GdZcsuas9RqNPT49wcZILjS6MDHKmNT0vcAtNKgYjU_lexxc2xEybLCz4cGSv7EacIizshUN3YxhJZgROo1MGqQAfN8No2QYhqfqNJVvkcNxmz7SRR_KVJF3bzFwOf7EjpBeO46EbwKZdTHmooaWwApMz-xzQ2pllnCiP5iFYXW5YPoQKGVMSgMKiXM"/>
<p className="text-[10px] text-slate-300 leading-tight"><span className="font-bold text-teal-400 uppercase">Portfolio Drift:</span> Increased exposure in FinTech sector detected.</p>
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
<tr className="hover:bg-surface-container-high transition-colors group cursor-pointer">
<td className="px-8 py-6">
<span className="material-symbols-outlined text-error" style={{ fontVariationSettings: "'FILL' 1" }}>error</span>
</td>
<td className="px-6 py-6 font-medium">CYB-9021</td>
<td className="px-6 py-6">Acme FinTech Ltd.</td>
<td className="px-6 py-6 text-center"><div className="flex flex-col items-center gap-1 min-w-[100px]"><div className="flex justify-between w-full text-[10px] font-bold text-error"><span>82/100</span></div><div className="w-full bg-error-container h-1.5 rounded-full overflow-hidden"><div className="bg-error h-full rounded-full" style={{ width: '82%' }}></div></div><span className="text-[9px] font-extrabold text-error/70 uppercase tracking-tighter">HIGH</span></div></td>
<td className="px-6 py-6 text-sm">Intake Review</td>
<td className="px-6 py-6 text-sm">8h</td>
<td className="px-8 py-6"><div className="inline-flex items-center px-3 py-1 rounded text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200 uppercase tracking-wide">Review controls</div></td>
<td className="px-8 py-6 text-right">
<div className="flex justify-end items-center gap-4 text-slate-400">
<button className="hover:text-primary transition-colors flex items-center justify-center" title="Open Case">
<span className="material-symbols-outlined text-[20px]">search</span>
</button>
<button className="hover:text-error transition-colors flex items-center justify-center" title="Jump to issue tab">
<span className="material-symbols-outlined text-[20px]">warning</span>
</button>
</div>
</td></tr>
<tr className="hover:bg-surface-container-high transition-colors group cursor-pointer">
<td className="px-8 py-6">
<span className="material-symbols-outlined text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
</td>
<td className="px-6 py-6 font-medium">CYB-8834</td>
<td className="px-6 py-6">Global Healthcare Inc.</td>
<td className="px-6 py-6 text-center"><div className="flex flex-col items-center gap-1 min-w-[100px]"><div className="flex justify-between w-full text-[10px] font-bold text-amber-600"><span>45/100</span></div><div className="w-full bg-amber-100 h-1.5 rounded-full overflow-hidden"><div className="bg-amber-500 h-full rounded-full" style={{ width: '45%' }}></div></div><span className="text-[9px] font-extrabold text-amber-600/70 uppercase tracking-tighter">MEDIUM</span></div></td>
<td className="px-6 py-6 text-sm">Policy Structuring</td>
<td className="px-6 py-6 text-sm">2d</td>
<td className="px-8 py-6"><div className="inline-flex items-center px-3 py-1 rounded text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200 uppercase tracking-wide">Prepare referral</div></td>
<td className="px-8 py-6 text-right">
<div className="flex justify-end items-center gap-4 text-slate-400">
<button className="hover:text-primary transition-colors flex items-center justify-center" title="Open Case">
<span className="material-symbols-outlined text-[20px]">search</span>
</button>
<button className="hover:text-error transition-colors flex items-center justify-center" title="Jump to issue tab">
<span className="material-symbols-outlined text-[20px]">warning</span>
</button>
</div>
</td></tr>
<tr className="hover:bg-surface-container-high transition-colors group cursor-pointer">
<td className="px-8 py-6">
<span className="material-symbols-outlined text-slate-300">check_circle</span>
</td>
<td className="px-6 py-6 font-medium">CYB-9102</td>
<td className="px-6 py-6">NexGen Logistics</td>
<td className="px-6 py-6 text-center"><div className="flex flex-col items-center gap-1 min-w-[100px]"><div className="flex justify-between w-full text-[10px] font-bold text-slate-500"><span>18/100</span></div><div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden"><div className="bg-slate-400 h-full rounded-full" style={{ width: '18%' }}></div></div><span className="text-[9px] font-extrabold text-slate-500/70 uppercase tracking-tighter">LOW</span></div></td>
<td className="px-6 py-6 text-sm">Final Review</td>
<td className="px-6 py-6 text-sm">5d</td>
<td className="px-8 py-6"><div className="inline-flex items-center px-3 py-1 rounded text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200 uppercase tracking-wide">Await info</div></td>
<td className="px-8 py-6 text-right">
<div className="flex justify-end items-center gap-4 text-slate-400">
<button className="hover:text-primary transition-colors flex items-center justify-center" title="Open Case">
<span className="material-symbols-outlined text-[20px]">search</span>
</button>
<button className="hover:text-error transition-colors flex items-center justify-center" title="Jump to issue tab">
<span className="material-symbols-outlined text-[20px]">warning</span>
</button>
</div>
</td></tr>
<tr className="hover:bg-surface-container-high transition-colors group cursor-pointer">
<td className="px-8 py-6">
<span className="material-symbols-outlined text-error" style={{ fontVariationSettings: "'FILL' 1" }}>error</span>
</td>
<td className="px-6 py-6 font-medium">CYB-9055</td>
<td className="px-6 py-6">CloudScale Data</td>
<td className="px-6 py-6 text-center"><div className="flex flex-col items-center gap-1 min-w-[100px]"><div className="flex justify-between w-full text-[10px] font-bold text-error"><span>76/100</span></div><div className="w-full bg-error-container h-1.5 rounded-full overflow-hidden"><div className="bg-error h-full rounded-full" style={{ width: '76%' }}></div></div><span className="text-[9px] font-extrabold text-error/70 uppercase tracking-tighter">HIGH</span></div></td>
<td className="px-6 py-6 text-sm">Risk Analysis</td>
<td className="px-6 py-6 text-sm">12h</td>
<td className="px-8 py-6"><div className="inline-flex items-center px-3 py-1 rounded text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200 uppercase tracking-wide">Review controls</div></td>
<td className="px-8 py-6 text-right">
<div className="flex justify-end items-center gap-4 text-slate-400">
<button className="hover:text-primary transition-colors flex items-center justify-center" title="Open Case">
<span className="material-symbols-outlined text-[20px]">search</span>
</button>
<button className="hover:text-error transition-colors flex items-center justify-center" title="Jump to issue tab">
<span className="material-symbols-outlined text-[20px]">warning</span>
</button>
</div>
</td></tr>
</tbody>
</table>
</div>
</section>
</div>
</main>


    </div>
  );
}
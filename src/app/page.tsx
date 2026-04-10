"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const features = [
  {
    icon: "analytics",
    title: "AI-Powered Risk Scoring",
    description:
      "Real-time composite risk scores built from external attack surface data, document analysis, and peer benchmarking. Every insight is source-cited and explainable.",
    accent: "teal",
  },
  {
    icon: "shield_lock",
    title: "Red Flags Intelligence",
    description:
      "Automated detection of critical security gaps — open RDP ports, missing MFA, backup verification conflicts — with cross-document evidence mapping.",
    accent: "red",
  },
  {
    icon: "compare_arrows",
    title: "Comparative Document Analysis",
    description:
      "Side-by-side comparison of proposal forms vs audit reports. Flags verbatim copy-paste anomalies, backdated filings, and metadata mismatches automatically.",
    accent: "amber",
  },
  {
    icon: "psychology",
    title: "Underwriting Co-Pilot",
    description:
      "A conversational AI layer embedded within every coverage decision. Ask follow-up questions, run scenario analyses, and get instant regulatory guidance.",
    accent: "purple",
  },
  {
    icon: "autorenew",
    title: "Renewal Intelligence",
    description:
      "Proactive churn prediction and retention signals with peer-adjusted trend analysis. Know which accounts need attention before renewal date.",
    accent: "blue",
  },
  {
    icon: "fact_check",
    title: "AI Feedback & Tuning",
    description:
      "Every AI signal is voteable. Underwriters flag hallucinations, context misinterpretations, and logic flaws — directly tuning the model to your book.",
    accent: "green",
  },
];

const steps = [
  {
    num: "01",
    title: "Submission Received",
    desc: "New cyber proposal arrives via broker portal or API. Documents are ingested in seconds.",
    icon: "upload_file",
  },
  {
    num: "02",
    title: "AI Triages the Risk",
    desc: "EASM scanning, document extraction, and NLP cross-referencing happen autonomously — no manual effort.",
    icon: "smart_toy",
  },
  {
    num: "03",
    title: "Underwriter Reviews Intelligence",
    desc: "A rich case workspace surfaces every risk signal, evidence chain, and suggested decision — ready for review.",
    icon: "manage_search",
  },
  {
    num: "04",
    title: "Decision & Bind",
    desc: "Underwriter adjusts, overrides, or approves. Coverage terms are structured with AI assistance.",
    icon: "task_alt",
  },
];

const stats = [
  { val: "68%", label: "Faster case assessment" },
  { val: "12x", label: "More flags detected vs manual" },
  { val: "94%", label: "Underwriter accuracy gain" },
  { val: "<3min", label: "Average AI triage time" },
];

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const screenTabs = [
    {
      label: "Dashboard",
      icon: "dashboard",
      image: "/dashboard_screenshot.png",
      caption: "Priority Work Queue & Agentic Alerts — full context at a glance.",
    },
    {
      label: "Deep Dive Analysis",
      icon: "data_exploration",
      image: "/deepdive_screenshot.png",
      caption: "Comparative document intelligence with page-level flag mapping.",
    },
    {
      label: "Risk Intelligence",
      icon: "radar",
      image: "/hero_mockup.png",
      caption: "External attack surface mapping with live evidence chains.",
    },
  ];

  const accentMap: Record<string, string> = {
    teal: "bg-teal-400/10 text-teal-400 border-teal-400/30",
    red: "bg-red-500/10 text-red-400 border-red-400/30",
    amber: "bg-amber-500/10 text-amber-400 border-amber-400/30",
    purple: "bg-purple-500/10 text-purple-400 border-purple-400/30",
    blue: "bg-blue-500/10 text-blue-400 border-blue-400/30",
    green: "bg-green-500/10 text-green-400 border-green-400/30",
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-body overflow-x-hidden">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-teal-500/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-indigo-600/5 blur-[100px]" />
        <div className="absolute top-[40%] right-[20%] w-[25vw] h-[25vw] rounded-full bg-cyan-400/3 blur-[80px]" />
      </div>

      {/* Nav */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-slate-950/95 backdrop-blur-md border-b border-slate-800/60 shadow-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-teal-400 flex items-center justify-center rounded-sm">
              <span
                className="material-symbols-outlined text-slate-950 text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                security
              </span>
            </div>
            <div>
              <div className="text-base font-black text-white font-headline tracking-tight">
                Sentinel
              </div>
              <div className="text-[9px] text-slate-500 uppercase tracking-widest">
                Cyber Underwriting Co-Pilot
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {["Features", "How It Works", "Capabilities","Screenshots"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                className="text-sm text-slate-400 hover:text-white transition-colors font-medium"
              >
                {item}
              </a>
            ))}
          </div>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 bg-teal-400 text-slate-950 px-5 py-2 rounded-full text-sm font-black hover:bg-teal-300 transition-all shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 hover:scale-105"
          >
            <span
              className="material-symbols-outlined text-[16px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              launch
            </span>
            Open App
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-teal-400/10 border border-teal-400/30 rounded-full px-4 py-1.5 text-teal-400 text-xs font-bold uppercase tracking-widest mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              AI-Native Underwriting Platform
            </div>
            <h1 className="font-headline font-black text-5xl md:text-6xl lg:text-7xl text-white leading-tight tracking-tight mb-6">
              Underwrite Cyber Risk
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-300 to-teal-400">
                at Machine Speed
              </span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10">
              Sentinel is an AI-powered co-pilot built for cyber underwriters. It
              triages submissions, detects red flags, analyzes documents, and
              structures coverage — so you can focus on decisions, not data.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 bg-teal-400 text-slate-950 px-8 py-3.5 rounded-full font-black hover:bg-teal-300 transition-all shadow-xl shadow-teal-500/25 hover:scale-105"
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  play_arrow
                </span>
                Try the Dashboard
              </Link>
              <a
                href="#how-it-works"
                className="flex items-center gap-2 border border-slate-700 text-slate-300 px-8 py-3.5 rounded-full font-semibold hover:border-slate-500 hover:text-white transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">
                  info
                </span>
                How It Works
              </a>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 max-w-3xl mx-auto">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 text-center backdrop-blur-sm"
              >
                <div className="text-2xl font-black text-teal-400 font-headline mb-1">
                  {s.val}
                </div>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Hero Product Image */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-800/50 shadow-2xl shadow-slate-950">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10 pointer-events-none" />
            <Image
              src="/hero_mockup.png"
              alt="Sentinel Cyber Underwriting Platform"
              width={1280}
              height={720}
              className="w-full object-cover"
              priority
            />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 bg-slate-950/80 border border-slate-700 backdrop-blur-md rounded-full px-6 py-2">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span className="text-sm text-slate-300 font-medium">
                Live AI analysis running
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-full px-4 py-1.5 text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">
              Core Capabilities
            </div>
            <h2 className="font-headline font-black text-3xl md:text-4xl text-white mb-4">
              Everything an underwriter needs
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Sentinel brings together external scanning, document intelligence, and
              AI reasoning in a single purpose-built workspace.
            </p>
          </div>
          <div
            id="capabilities"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((f) => (
              <div
                key={f.title}
                className="group bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 hover:bg-slate-900 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 backdrop-blur-sm"
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center border mb-4 ${
                    accentMap[f.accent]
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {f.icon}
                  </span>
                </div>
                <h3 className="font-headline font-black text-white text-lg mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-full px-4 py-1.5 text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">
              Workflow
            </div>
            <h2 className="font-headline font-black text-3xl md:text-4xl text-white mb-4">
              From submission to decision in minutes
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Sentinel handles the heavy lifting — from ingestion to triage — so
              underwriters arrive at the decision stage with full context.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 relative">
            <div className="absolute top-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent hidden md:block" />
            {steps.map((step, i) => (
              <div key={step.num} className="relative flex flex-col items-center text-center px-6 py-8 group">
                <div className="relative z-10 w-20 h-20 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center mb-6 group-hover:border-teal-500/50 group-hover:bg-slate-800 transition-all shadow-xl">
                  <span
                    className="material-symbols-outlined text-teal-400 text-[28px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {step.icon}
                  </span>
                  <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-teal-400 text-slate-950 text-[11px] font-black flex items-center justify-center">
                    {i + 1}
                  </div>
                </div>
                <h3 className="font-headline font-black text-white text-base mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots Tabs */}
      <section id="screenshots" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-full px-4 py-1.5 text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">
              Product Screenshots
            </div>
            <h2 className="font-headline font-black text-3xl md:text-4xl text-white mb-4">
              See Sentinel in action
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              A purpose-built workspace at every stage of the underwriting workflow.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex justify-center mb-8">
            <div className="flex gap-2 bg-slate-900 border border-slate-800 rounded-full p-1.5">
              {screenTabs.map((tab, i) => (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(i)}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                    activeTab === i
                      ? "bg-teal-400 text-slate-950 shadow-lg"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {tab.icon}
                  </span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Screenshot Display */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-800/60 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/10 via-transparent to-slate-950/60 z-10 pointer-events-none" />
            <Image
              key={activeTab}
              src={screenTabs[activeTab].image}
              alt={screenTabs[activeTab].label}
              width={1280}
              height={720}
              className="w-full object-cover transition-opacity duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-slate-950 to-transparent p-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-teal-400" />
                <p className="text-slate-300 font-medium text-sm">
                  {screenTabs[activeTab].caption}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deep Dive Feature Callout */}
      <section className="py-24 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-1.5 text-amber-400 text-xs font-bold uppercase tracking-widest mb-6">
                <span className="material-symbols-outlined text-[14px]">compare_arrows</span>
                Document Intelligence
              </div>
              <h2 className="font-headline font-black text-3xl md:text-4xl text-white leading-tight mb-6">
                The AI doesn't just read — it{" "}
                <span className="text-teal-400">cross-examines</span>
              </h2>
              <div className="space-y-4 mb-8">
                {[
                  { icon: "article", label: "Proposal Form says: \"Daily offline backups, verified weekly\"" },
                  { icon: "fact_check", label: "Audit Report says: \"No restore test since 2021 — EXPIRED\"" },
                  { icon: "warning", label: "Sentinel flags: Backup Verification Conflict → High Risk" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-3 p-4 rounded-xl border ${
                      i === 2
                        ? "bg-amber-500/10 border-amber-500/30"
                        : i === 0
                        ? "bg-teal-500/5 border-teal-500/20"
                        : "bg-red-500/5 border-red-500/20"
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-[18px] mt-0.5 ${
                        i === 2 ? "text-amber-400" : i === 0 ? "text-teal-400" : "text-red-400"
                      }`}
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {item.icon}
                    </span>
                    <p className="text-sm text-slate-300">{item.label}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/case"
                className="inline-flex items-center gap-2 bg-teal-400 text-slate-950 px-6 py-2.5 rounded-full text-sm font-black hover:bg-teal-300 transition-all"
              >
                View Case Workspace
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-teal-500/5 rounded-3xl blur-2xl" />
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl">
                <Image
                  src="/deepdive_screenshot.png"
                  alt="Deep Intelligence Analysis"
                  width={640}
                  height={400}
                  className="w-full object-cover"
                />
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-4 -right-4 bg-slate-900 border border-slate-700 rounded-2xl p-3 shadow-xl">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-red-400 text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>shield_lock</span>
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-white">5 Red Flags</div>
                    <div className="text-[8px] text-slate-500 uppercase">Detected automatically</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Red Flags Feature Callout */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 relative">
              <div className="absolute -inset-4 bg-red-500/5 rounded-3xl blur-2xl" />
              <div className="relative bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-red-400 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>shield_lock</span>
                    <p className="text-xs font-black text-red-400 uppercase tracking-widest">Core Cyber Risks</p>
                  </div>
                  <span className="text-[9px] font-bold bg-red-500 text-white px-2 py-0.5 rounded">2 Flags</span>
                </div>
                {[
                  { title: "Missing MFA on VPN", sev: "Critical", source: "Audit Report [Pg 14]", conf: 98 },
                  { title: "Open RDP Port (3389)", sev: "Critical", source: "EASM Live Scan", conf: 100 },
                ].map((flag) => (
                  <div key={flag.title} className="bg-white/5 border border-white/10 rounded-xl p-4 mb-3 last:mb-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-sm font-bold text-white">{flag.title}</p>
                        <span className="text-[8px] font-black text-red-400 uppercase bg-red-500/10 px-1 rounded">{flag.sev}</span>
                      </div>
                      <div className="flex items-center gap-1 bg-teal-500/10 px-2 py-0.5 rounded-full border border-teal-500/20">
                        <span className="material-symbols-outlined text-[10px] text-teal-400" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                        <span className="text-[8px] font-black text-teal-400">{flag.conf}%</span>
                      </div>
                    </div>
                    <p className="text-[9px] text-slate-500 font-mono flex items-center gap-1">
                      <span className="material-symbols-outlined text-[10px]">article</span>
                      {flag.source}
                    </p>
                    <div className="flex gap-2 mt-3">
                      <span className="text-[9px] font-bold bg-slate-800 text-white px-2 py-1 rounded-full">Deep Dive →</span>
                    </div>
                  </div>
                ))}
                <div className="mt-4 pt-4 border-t border-slate-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-amber-400 text-sm">compare_arrows</span>
                      <p className="text-xs font-black text-amber-600 uppercase tracking-widest">Document Discrepancies</p>
                    </div>
                    <span className="text-[9px] font-bold bg-amber-500 text-white px-2 py-0.5 rounded">1 Flag</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-full px-4 py-1.5 text-red-400 text-xs font-bold uppercase tracking-widest mb-6">
                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>shield_lock</span>
                Red Flags Engine
              </div>
              <h2 className="font-headline font-black text-3xl md:text-4xl text-white leading-tight mb-6">
                Every risk flag is{" "}
                <span className="text-red-400">source-cited</span> and{" "}
                <span className="text-teal-400">verifiable</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-6">
                Sentinel's Red Flags engine continuously monitors for critical
                security gaps, policy mismatches, and submission anomalies. Each
                flag includes a direct evidence chain so underwriters can verify and
                challenge every AI conclusion.
              </p>
              <div className="grid grid-cols-3 gap-3 mb-8">
                {[
                  { cat: "Core Cyber", color: "red" },
                  { cat: "Document", color: "amber" },
                  { cat: "Submission Integrity", color: "purple" },
                ].map((c) => (
                  <div
                    key={c.cat}
                    className={`border rounded-xl p-3 text-center ${
                      c.color === "red"
                        ? "bg-red-500/5 border-red-500/20"
                        : c.color === "amber"
                        ? "bg-amber-500/5 border-amber-500/20"
                        : "bg-purple-500/5 border-purple-500/20"
                    }`}
                  >
                    <p className={`text-[10px] font-black uppercase tracking-wider ${
                      c.color === "red" ? "text-red-400" : c.color === "amber" ? "text-amber-400" : "text-purple-400"
                    }`}>
                      {c.cat}
                    </p>
                  </div>
                ))}
              </div>
              <Link
                href="/case"
                className="inline-flex items-center gap-2 border border-slate-700 text-slate-300 px-6 py-2.5 rounded-full text-sm font-semibold hover:border-red-400/50 hover:text-red-400 transition-all"
              >
                Explore Red Flags Module
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950/40 border border-slate-800 rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-teal-400/60 to-transparent" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <div className="w-16 h-16 bg-teal-400/10 border border-teal-400/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-teal-400 text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
              </div>
              <h2 className="font-headline font-black text-3xl md:text-4xl text-white mb-4">
                Ready to transform your underwriting?
              </h2>
              <p className="text-slate-400 text-lg mb-8">
                Experience AI-native cyber underwriting. Explore live risk
                intelligence, document analysis, and the Co-pilot in action.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center gap-2 bg-teal-400 text-slate-950 px-8 py-3.5 rounded-full font-black hover:bg-teal-300 transition-all shadow-xl shadow-teal-500/25 hover:scale-105"
                >
                  Open Dashboard
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>arrow_forward</span>
                </Link>
                <Link
                  href="/case"
                  className="inline-flex items-center justify-center gap-2 border border-slate-700 text-slate-300 px-8 py-3.5 rounded-full font-semibold hover:border-teal-500/50 hover:text-teal-400 transition-all"
                >
                  View Case Workspace
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/60 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-teal-400 flex items-center justify-center rounded-sm">
              <span className="material-symbols-outlined text-slate-950 text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
            </div>
            <div>
              <div className="text-sm font-black text-white font-headline">Sentinel</div>
              <div className="text-[9px] text-slate-600 uppercase tracking-widest">Cyber Underwriting Co-Pilot</div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            {["Dashboard", "Cases", "Renewals"].map((link) => (
              <Link key={link} href="/dashboard" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
                {link}
              </Link>
            ))}
          </div>
          <p className="text-xs text-slate-600">
            © 2024 Sentinel Intelligence. Built for cyber underwriters.
          </p>
        </div>
      </footer>
    </div>
  );
}

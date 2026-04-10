"use client";
import React, { useState, useEffect } from "react";

export default function CaseWorkspace() {
  const [activeTab, setActiveTab] = useState("COVERAGE STRUCTURING");
  const [caseId, setCaseId] = useState("CYB-24103");
  const [companyName, setCompanyName] = useState("ABC Healthcare Pvt Ltd");
  const [baseRiskScore, setBaseRiskScore] = useState(78);
  const [currentWorkflowIdx, setCurrentWorkflowIdx] = useState(1);
  const [mfaOverride, setMfaOverride] = useState(false);
  const [backupOverride, setBackupOverride] = useState(false);
  const [edrOverride, setEdrOverride] = useState(false);
  const [emailSecOverride, setEmailSecOverride] = useState(false);
  const [patchOverride, setPatchOverride] = useState(false);
  
  const riskScore = baseRiskScore 
    - (mfaOverride ? 12 : 0) 
    - (backupOverride ? 5 : 0)
    - (edrOverride ? 10 : 0)
    - (emailSecOverride ? 5 : 0)
    - (patchOverride ? 3 : 0);

  const [aggLimit, setAggLimit] = useState(10);
  const [extortionSublimit, setExtortionSublimit] = useState(2);
  const [biWaitingPeriod, setBiWaitingPeriod] = useState(12);
  const [selectedPackage, setSelectedPackage] = useState("Enhanced");
  const [commercialDiscount, setCommercialDiscount] = useState(0);
  const [activeDockTab, setActiveDockTab] = useState<string | null>(null);
  const [activeDeepDive, setActiveDeepDive] = useState<any>(null);
  const [showCopilot, setShowCopilot] = useState(false);

  // AI Feedback System
  const [feedbackState, setFeedbackState] = useState<Record<string, { sentiment: boolean | null, issues: string[], comment: string, submitted: boolean }>>({});
  const [activeFeedbackId, setActiveFeedbackId] = useState<string | null>(null);

  const handleFeedback = (id: string, sentiment: boolean) => {
    setFeedbackState(prev => ({
      ...prev,
      [id]: { sentiment, issues: [], comment: '', submitted: false }
    }));
    if (!sentiment) setActiveFeedbackId(id);
    else {
      // Auto-submit if helpful
      setTimeout(() => {
        setFeedbackState(prev => ({
           ...prev,
           [id]: { ...prev[id], submitted: true }
        }));
      }, 1000);
    }
  };

  const submitInaccuracy = (id: string) => {
    setFeedbackState(prev => ({
      ...prev,
      [id]: { ...prev[id], submitted: true }
    }));
    setTimeout(() => setActiveFeedbackId(null), 2000);
  };

  const renderFeedback = (id: string, isOverlay: boolean = false) => {
    const state = feedbackState[id] || { sentiment: null, issues: [], comment: '', submitted: false };
    
    if (state.submitted) {
      return (
        <div className="flex items-center gap-2 py-2 animate-in fade-in duration-500">
          <span className="material-symbols-outlined text-teal-600 text-sm">check_circle</span>
          <p className="text-[10px] font-bold text-teal-700 uppercase tracking-widest">Feedback Received. Tuning Intelligence...</p>
        </div>
      );
    }

    if (activeFeedbackId === id && state.sentiment === false) {
      return (
        <div className={`mt-4 p-4 border rounded-xl animate-in slide-in-from-top-2 duration-300 ${isOverlay ? 'bg-white border-primary/20 shadow-lg' : 'bg-slate-50 border-outline-variant/50'}`}>
          <div className="flex justify-between items-center mb-3">
             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Report AI Inaccuracy</p>
             <button onClick={() => setActiveFeedbackId(null)} className="material-symbols-outlined text-xs text-slate-400 hover:text-slate-600">close</button>
          </div>
          <div className="space-y-2 mb-4">
             {[
               "Fact Hallucination", 
               "Context Misinterpretation", 
               "Outdated / Stale Info", 
               "Data Parsing Error", 
               "Reasoning Logic Flaw"
             ].map(issue => (
               <label key={issue} className="flex items-center gap-2 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    className="w-3 h-3 rounded accent-primary" 
                    checked={state.issues.includes(issue)}
                    onChange={(e) => {
                      const newIssues = e.target.checked 
                        ? [...state.issues, issue]
                        : state.issues.filter(i => i !== issue);
                      setFeedbackState(prev => ({ ...prev, [id]: { ...prev[id], issues: newIssues } }));
                    }}
                  />
                  <span className="text-[10px] font-medium text-slate-600 group-hover:text-primary transition-colors">{issue}</span>
               </label>
             ))}
          </div>
          <textarea 
            className="w-full text-[10px] p-2 border border-outline-variant/30 rounded bg-white focus:outline-none focus:ring-1 focus:ring-primary h-12 mb-3 resize-none"
            placeholder="Help us improve. What specifically is wrong?"
            value={state.comment}
            onChange={(e) => setFeedbackState(prev => ({ ...prev, [id]: { ...prev[id], comment: e.target.value } }))}
          ></textarea>
          <button 
            onClick={() => submitInaccuracy(id)}
            className="w-full py-2 bg-primary text-white text-[10px] font-bold rounded uppercase tracking-widest hover:bg-primary-dark transition-colors"
          >
            Submit Correction
          </button>
        </div>
      );
    }

    return (
      <div className={`flex items-center justify-between gap-4 py-3 border-t border-outline-variant/10 mt-2`}>
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Helpful?</p>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => handleFeedback(id, true)} 
            className={`p-1 rounded transition-colors ${state.sentiment === true ? 'text-teal-600 bg-teal-50' : 'text-slate-400 hover:bg-slate-100'}`}
          >
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: state.sentiment === true ? "'FILL' 1" : "" }}>thumb_up</span>
          </button>
          <button 
            onClick={() => handleFeedback(id, false)} 
            className={`p-1 rounded transition-colors ${state.sentiment === false ? 'text-error bg-error/10' : 'text-slate-400 hover:bg-slate-100'}`}
          >
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: state.sentiment === false ? "'FILL' 1" : "" }}>thumb_down</span>
          </button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabStr = params.get('tab');
    if (tabStr) {
       if (tabStr === 'RISK') setActiveTab('RISK ASSESSMENT');
       if (tabStr === 'COVERAGE') setActiveTab('COVERAGE STRUCTURING');
       if (tabStr === 'PRICING') setActiveTab('PRICING INTELLIGENCE');
    }
    const id = params.get('id');
    if (id) {
       setCaseId(id);
       if (id === 'CYB-9021') {
          setCompanyName('Acme FinTech Ltd.');
          setBaseRiskScore(82);
          setCurrentWorkflowIdx(0);
       }
       if (id === 'CYB-8834') {
          setCompanyName('Global Healthcare Inc.');
          setBaseRiskScore(45);
          setCurrentWorkflowIdx(2);
       }
       if (id === 'CYB-9102') {
          setCompanyName('NexGen Logistics');
          setBaseRiskScore(18);
          setCurrentWorkflowIdx(4);
       }
       if (id === 'CYB-9055') {
          setCompanyName('CloudScale Data');
          setBaseRiskScore(76);
          setCurrentWorkflowIdx(1);
       }
    }
  }, []);

  // Pricing Engine
  const basePremium = aggLimit * 1.5;
  const mfaPenalty = !mfaOverride ? (basePremium * 0.15) : 0;
  const edrCredit = edrOverride ? -(basePremium * 0.10) : 0;
  const emailCredit = emailSecOverride ? -(basePremium * 0.05) : 0;
  const patchCredit = patchOverride ? -(basePremium * 0.05) : 0;
  
  const ransomwareLoad = extortionSublimit > 2 ? ((extortionSublimit - 2) * 0.75) : 0;
  const backupWaiver = backupOverride ? -(basePremium * 0.05) : 0;
  const techPremium = basePremium + mfaPenalty + edrCredit + emailCredit + patchCredit + ransomwareLoad + backupWaiver;
  const finalPremium = techPremium * (1 + (commercialDiscount / 100));
  const elr = 55 / (finalPremium / techPremium);

  return (
    <div className="flex-1 flex flex-col pt-16 h-screen overflow-hidden">

      <section className="bg-surface-container-low px-8 py-4 flex items-center justify-between border-b border-surface-container-high shadow-sm relative z-30">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Proposal ID: {caseId}</span>
            <span className="w-1 h-1 rounded-full bg-slate-400"></span>
            <a className="text-sm font-bold text-primary hover:underline" href="#">{companyName}</a>
          </div>
          <div className="flex gap-4 mt-2">
            <div className="flex flex-col">
              <span className="text-[9px] uppercase font-bold text-on-surface-variant tracking-tighter">Risk Band</span>
              <span className={`text-xs font-bold flex items-center gap-1 ${riskScore >= 70 ? 'text-error' : riskScore >= 40 ? 'text-amber-600' : 'text-teal-600'}`}>
                <span className={`w-2 h-2 rounded-full ${riskScore >= 70 ? 'bg-error' : riskScore >= 40 ? 'bg-amber-500' : 'bg-teal-500'}`}></span> {riskScore >= 70 ? 'HIGH' : riskScore >= 40 ? 'MEDIUM' : 'LOW'}
              </span>
            </div>
            <div className="flex flex-col border-l border-outline-variant pl-4">
              <span className="text-[9px] uppercase font-bold text-on-surface-variant tracking-tighter">Eligibility</span>
              <span className="text-xs font-bold text-orange-600 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span> CONDITIONAL
              </span>
            </div>
            <div className="flex flex-col border-l border-outline-variant pl-4">
              <span className="text-[9px] uppercase font-bold text-on-surface-variant tracking-tighter mb-1.5">Workflow Tracker</span>
              <div className="flex items-center gap-1.5">
                {[
                  { id: 'INTAKE', label: 'Intake', title: 'Intake Review' },
                  { id: 'RISK', label: 'Risk', title: 'Risk Assessment' },
                  { id: 'STRUCT', label: 'Struct', title: 'Policy Structuring' },
                  { id: 'PRICE', label: 'Price', title: 'Pricing Intelligence' },
                  { id: 'AUTH', label: 'Auth', title: 'Final Authorization' }
                ].map((step, idx) => {
                  let currentIdx = currentWorkflowIdx;
                  if (activeTab === "RISK ASSESSMENT") currentIdx = 1;
                  if (activeTab === "COVERAGE STRUCTURING") currentIdx = 2;
                  if (activeTab === "PRICING INTELLIGENCE") currentIdx = 3;
                  
                  // Status Logic
                  const isCompleted = idx < currentIdx;
                  const isActive = idx === currentIdx;
                  
                  return (
                    <React.Fragment key={step.id}>
                      <div 
                        className={`flex items-center gap-1.5 group cursor-help relative ${!isCompleted && !isActive ? 'opacity-50' : ''}`}
                        title={`${step.title} (${isCompleted ? 'Completed' : isActive ? 'In Progress' : 'Pending'})`}
                      >
                        {isCompleted ? (
                          <div className="w-3.5 h-3.5 rounded-full bg-teal-500 flex items-center justify-center text-white">
                            <span className="material-symbols-outlined text-[9px] font-bold">check</span>
                          </div>
                        ) : isActive ? (
                          <div className="w-3.5 h-3.5 rounded-full bg-amber-500 flex items-center justify-center -translate-y-px">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                          </div>
                        ) : (
                          <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-300 flex items-center justify-center">
                             <span className="text-[6px] text-slate-400 font-bold">{idx + 1}</span>
                          </div>
                        )}
                        <span className={`text-[9px] font-bold uppercase tracking-wide ${isCompleted ? 'text-teal-500' : isActive ? 'text-amber-600' : 'text-slate-500'}`}>
                          {step.label}
                        </span>
                      </div>
                      {idx < 4 && (
                        <div className={`w-4 h-px ${isCompleted ? 'bg-teal-500/30' : 'bg-slate-200'}`}></div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <div className="bg-error-container/20 p-3 rounded-lg flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-[9px] uppercase font-bold text-error tracking-tighter">Authority Breach</span>
              <span className="text-sm font-black text-on-error-container">₹40 Cr <span className="text-[10px] font-normal opacity-70">/ ₹25 Cr Cap</span></span>
            </div>
            <span className="material-symbols-outlined text-error" data-weight="fill">warning</span>
          </div>
          <div className="flex gap-2">
            <button className="p-2 bg-surface-container-lowest border border-outline-variant rounded hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-on-surface-variant">refresh</span>
            </button>
            <button className="p-2 bg-surface-container-lowest border border-outline-variant rounded hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-on-surface-variant">account_tree</span>
            </button>
          </div>
        </div>
      </section>

      {/*  Three-Panel Layout  */}
      <div className="flex flex-1 overflow-hidden">
        {/*  Left Panel: Risk Facts  */}
        <aside className="w-64 bg-slate-50 border-r border-slate-200 overflow-y-auto no-scrollbar p-6">
          <h3 className="font-headline font-extrabold text-xs uppercase tracking-[0.15em] text-on-surface-variant mb-6">Risk Facts</h3>
          <div className="space-y-6">
            {/*  Customer Profile  */}
            <section className="bg-surface-container-low p-4 rounded-xl">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Customer Profile</span>
                <span className="text-[9px] px-1.5 py-0.5 bg-slate-200 text-slate-600 font-bold rounded">PROPOSAL</span>
              </div>
              <ul className="space-y-3">
                <li><p className="text-[10px] text-on-surface-variant uppercase tracking-tighter">Industry</p><p className="text-sm font-semibold">Healthcare</p></li>
                <li><p className="text-[10px] text-on-surface-variant uppercase tracking-tighter">Turnover</p><p className="text-sm font-semibold">₹250 Cr</p></li>
                <li><p className="text-[10px] text-on-surface-variant uppercase tracking-tighter">Geography</p><p className="text-sm font-semibold">India (5 States)</p></li>
                <li><p className="text-[10px] text-on-surface-variant uppercase tracking-tighter">Employees</p><p className="text-sm font-semibold">1,200</p></li>
              </ul>
            </section>
            {/*  Cyber Exposure  */}
            <section>
              <h4 className="text-[11px] font-bold text-on-surface mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-xs">analytics</span> Cyber Exposure
              </h4>
              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] font-medium bg-surface-container-highest px-2 py-1 rounded">PII &amp; Health Records</span>
                <span className="text-[10px] font-medium bg-surface-container-highest px-2 py-1 rounded">High IT Dependency</span>
                <span className="text-[10px] font-medium bg-surface-container-highest px-2 py-1 rounded">12 Third-Party Vendors</span>
              </div>
            </section>
            {/*  Security Controls  */}
            <section className="bg-surface-container-low p-4 rounded-xl">
              <h4 className="text-[11px] font-bold text-on-surface mb-3">Security Controls</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-on-surface-variant">Firewall</span>
                  <span className="material-symbols-outlined text-teal-600 text-sm" data-weight="fill">check_circle</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-xs ${edrOverride ? 'text-on-surface-variant' : 'text-error font-bold'}`}>EDR Implementation</span>
                  <span className={`material-symbols-outlined text-sm ${edrOverride ? 'text-teal-600' : 'text-error'}`} data-weight="fill">{edrOverride ? 'check_circle' : 'cancel'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-xs ${mfaOverride ? 'text-on-surface-variant' : 'text-error font-bold'}`}>MFA Implementation</span>
                  <span className={`material-symbols-outlined text-sm ${mfaOverride ? 'text-teal-600' : 'text-error'}`} data-weight="fill">{mfaOverride ? 'check_circle' : 'cancel'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-on-surface-variant">Patching (72h)</span>
                  <span className={`text-[10px] font-bold uppercase ${patchOverride ? 'text-teal-600' : 'text-amber-600'}`}>{patchOverride ? 'Optimized' : 'Monthly'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-on-surface-variant">Email Security</span>
                  <span className={`material-symbols-outlined text-sm ${emailSecOverride ? 'text-teal-600' : 'text-amber-600'}`} data-weight="fill">{emailSecOverride ? 'check_circle' : 'pending'}</span>
                </div>
              </div>
            </section>
            {/*  Claims  */}
            <section className="border-t border-surface-container-high pt-4">
              <h4 className="text-[11px] font-bold text-on-surface mb-2">Claims History</h4>
              <div className="p-3 border-l-2 border-error bg-error/5">
                <p className="text-xs font-bold text-error">Ransomware Event</p>
                <p className="text-[10px] text-slate-500 mt-1">₹45 Lakhs loss | 36 Months ago</p>
              </div>
            </section>
          </div>
        </aside>

        {/*  Center Panel: Agent Intelligence  */}
        <section className="flex-1 bg-surface-container-low overflow-y-auto no-scrollbar flex flex-col">
          {/*  Intelligence Tabs  */}
          <div className="px-8 mt-6">
            <div className="flex gap-8 border-b border-surface-container-high">
              <button onClick={() => setActiveTab("OVERVIEW")} className={`pb-3 text-xs tracking-tight transition-colors ${activeTab === 'OVERVIEW' ? 'border-b-2 border-primary font-bold text-primary' : 'font-medium text-on-surface-variant hover:text-primary'}`}>OVERVIEW</button>
              <button onClick={() => setActiveTab("RISK ASSESSMENT")} className={`pb-3 text-xs tracking-tight transition-colors ${activeTab === 'RISK ASSESSMENT' ? 'border-b-2 border-primary font-bold text-primary' : 'font-medium text-on-surface-variant hover:text-primary'}`}>RISK ASSESSMENT</button>
              <button onClick={() => setActiveTab("COVERAGE STRUCTURING")} className={`pb-3 text-xs tracking-tight transition-colors ${activeTab === 'COVERAGE STRUCTURING' ? 'border-b-2 border-primary font-bold text-primary' : 'font-medium text-on-surface-variant hover:text-primary'}`}>COVERAGE STRUCTURING</button>
              <button onClick={() => setActiveTab("PRICING INTELLIGENCE")} className={`pb-3 text-xs tracking-tight transition-colors ${activeTab === 'PRICING INTELLIGENCE' ? 'border-b-2 border-primary font-bold text-primary' : 'font-medium text-on-surface-variant hover:text-primary'}`}>PRICING INTELLIGENCE</button>
            </div>
          </div>
          <div className="p-8 space-y-8">
            {activeTab === "OVERVIEW" && (
              <>
                <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 shadow-sm">
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.15em] mb-6 text-center">RISK SNAPSHOT</p>
                  <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter mb-1">Risk Score</span>
                      <span className="text-6xl font-headline font-black">{riskScore}<span className="text-2xl font-normal opacity-40">/100</span></span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 shadow-sm">
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.15em] mb-4">TOP LOSS DRIVERS</p>
                    <ol className="space-y-4">
                      <li className="flex gap-3 items-start">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-error-container text-error text-[10px] font-bold shrink-0">1</span>
                        <span className="text-sm font-medium text-on-surface-variant">No MFA on privileged access</span>
                      </li>
                      <li className="flex gap-3 items-start">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-error-container text-error text-[10px] font-bold shrink-0">2</span>
                        <span className="text-sm font-medium text-on-surface-variant">Sensitive health data exposure (PII)</span>
                      </li>
                      <li className="flex gap-3 items-start">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-error-container text-error text-[10px] font-bold shrink-0">3</span>
                        <span className="text-sm font-medium text-on-surface-variant">Prior ransomware incident (2023)</span>
                      </li>
                    </ol>
                  </div>
                  <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 shadow-sm">
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.15em] mb-4">WHAT MOVES THE RISK</p>
                    <ul className="space-y-4">
                      <li className="flex gap-3 items-start">
                        <span className="material-symbols-outlined text-teal-600 text-lg mt-0.5">trending_down</span>
                        <div>
                          <p className="text-sm font-medium">Verify MFA & EDR Coverage</p>
                          <p className="text-xs font-bold text-teal-600">-{12 + (edrOverride ? 0 : 10)} Risk Score potential</p>
                        </div>
                      </li>
                      <li className="flex gap-3 items-start opacity-70">
                        <span className="material-symbols-outlined text-teal-400 text-lg mt-0.5">moving</span>
                        <div>
                          <p className="text-sm font-medium">Email Security Optimization</p>
                          <p className="text-xs font-bold text-teal-600">-5 Risk Score</p>
                        </div>
                      </li>
                      <li className="flex gap-3 items-start">
                        <span className="material-symbols-outlined text-teal-600 text-lg mt-0.5">trending_down</span>
                        <div>
                          <p className="text-sm font-medium">Conduct quarterly offline backup tests</p>
                          <p className="text-xs font-bold text-teal-600">-5 Risk Score</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div className="bg-surface-container-lowest p-5 rounded-xl border-0 shadow-sm">
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-4">Controls Maturity</p>
                    <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-teal-500 w-[65%]"></div>
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="text-[10px] text-on-surface-variant">Baseline</span>
                      <span className="text-[10px] font-bold">65%</span>
                    </div>
                  </div>
                  <div className="bg-surface-container-lowest p-5 rounded-xl border-0 shadow-sm">
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-4">Operational Stability</p>
                    <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-orange-400 w-[42%]"></div>
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="text-[10px] text-on-surface-variant">Resilience</span>
                      <span className="text-[10px] font-bold">42%</span>
                    </div>
                  </div>
                  <div className="bg-surface-container-lowest p-5 rounded-xl border-0 shadow-sm">
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-4">Threat Environment</p>
                    <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-error w-[88%]"></div>
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="text-[10px] text-on-surface-variant">Volatility</span>
                      <span className="text-[10px] font-bold text-error">CRITICAL</span>
                    </div>
                  </div>
                </div>
                <div className="bg-surface-container-lowest p-8 rounded-xl border-0 shadow-sm">
                  <h3 className="font-headline font-bold text-lg mb-4">Agent Insights Narrative</h3>
                  <div className="space-y-4 text-sm text-on-surface-variant leading-relaxed">
                    <p>Based on the analysis of the <span className="font-bold text-on-surface">IT Audit Report (2023)</span> and the current healthcare landscape, ABC Healthcare represents a complex risk profile. While turnover is substantial at ₹250 Cr, the cybersecurity infrastructure is uneven.</p>
                    <p>The <span className="text-error font-medium">prior ransomware incident</span> resulted in a ₹45 Lakh loss, which is relatively contained for their size, suggesting an effective recovery plan but a failure in initial perimeter defense. The current lack of MFA is the single largest technical liability.</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Policy Recommendation: Limit Cyber Extortion coverage to ₹5 Cr until MFA is verified.</li>
                      <li>Referral Requirement: Total limit (₹40 Cr) exceeds individual authority level.</li>
                    </ul>
                  </div>
                </div>
              </>
            )}
            {activeTab === "RISK ASSESSMENT" && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div className="grid grid-cols-3 gap-6">
                  <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/50 relative overflow-hidden filter drop-shadow-sm">
                     <div className="absolute top-0 left-0 w-1 h-full bg-primary/40"></div>
                     <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest mb-1 flex justify-between items-center"><span>Risk Benchmarking</span> <span className="material-symbols-outlined text-[14px]">leaderboard</span></p>
                     <div className="flex items-end gap-3 font-headline mb-3">
                        <span className="text-3xl font-black">{riskScore}</span>
                        <span className="text-xs font-bold text-slate-400 mb-1">vs 62 Avg</span>
                     </div>
                     <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-primary h-full transition-all duration-500" style={{width: `${(riskScore/100)*100}%`}}></div>
                     </div>
                     <div className="w-full bg-transparent h-1.5 rounded-full overflow-visible relative -mt-1.5">
                        <div className="absolute top-[-3px] w-1 h-3 bg-slate-500 rounded-sm" style={{left: '62%'}} title="Industry Average"></div>
                     </div>
                     <p className="text-[10px] mt-2 text-on-surface-variant">Profile ranks in the <span className="font-bold text-error">bottom 30%</span> of peers.</p>
                  </div>

                  <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/50 relative overflow-hidden filter drop-shadow-sm">
                     <div className="absolute top-0 left-0 w-1 h-full bg-amber-500/40"></div>
                     <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest mb-1 flex justify-between items-center"><span>Peer Control Deficit</span> <span className="material-symbols-outlined text-[14px]">pie_chart</span></p>
                     <div className="flex items-center gap-3 mb-2 mt-2">
                        <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-sm border border-amber-500/20">85%</div>
                        <p className="text-xs font-semibold text-on-surface leading-tight">of similar healthcare MSMEs enforce MFA.</p>
                     </div>
                     <p className="text-[10px] border-t border-outline-variant/30 pt-2 mt-2 text-on-surface-variant"><span className="text-amber-600 font-bold">Client is an outlier</span>. MFA absence significantly diverges from standard practice.</p>
                  </div>

                  <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/50 relative overflow-hidden filter drop-shadow-sm">
                     <div className="absolute top-0 left-0 w-1 h-full bg-error/40"></div>
                     <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest mb-1 flex justify-between items-center"><span>Sector Threat Landscape</span> <span className="material-symbols-outlined text-[14px]">monitoring</span></p>
                     <div className="flex items-center gap-3 mb-2 mt-2">
                         <div className="w-10 h-10 rounded-full bg-error/10 text-error flex items-center justify-center font-bold border border-error/20"><span className="material-symbols-outlined text-sm">trending_up</span></div>
                        <p className="text-xs font-semibold text-on-surface leading-tight">Ransomware attacks up 40% in health sector.</p>
                     </div>
                     <p className="text-[10px] border-t border-outline-variant/30 pt-2 mt-2 text-on-surface-variant">Combined with open RDP, client fits the exact profile for current threat campaigns.</p>
                  </div>
                </div>

                <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="material-symbols-outlined text-primary">document_scanner</span>
                    <h3 className="font-headline font-bold text-sm tracking-wide">INTAKE DOCUMENT INTELLIGENCE</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-1 space-y-3">
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Processed Files</p>
                        <button onClick={() => setActiveDockTab("DOCS")} className="text-[9px] font-bold text-primary hover:underline uppercase tracking-tighter">See All</button>
                      </div>
                      <div className="bg-surface-container/50 p-3 rounded-lg border border-primary/20 flex items-center gap-3 cursor-pointer hover:bg-surface-container transition-colors">
                         <span className="material-symbols-outlined text-error text-lg">picture_as_pdf</span>
                         <div>
                           <p className="text-xs font-bold text-primary">IT_Audit_Report_2023.pdf</p>
                           <p className="text-[9px] text-on-surface-variant">42 Pages • Processed 2h ago</p>
                         </div>
                      </div>
                      <div className="bg-surface-container/30 p-3 rounded-lg border border-outline-variant/30 flex items-center gap-3 cursor-pointer hover:bg-surface-container transition-colors">
                         <span className="material-symbols-outlined text-primary text-lg">description</span>
                         <div>
                           <p className="text-xs font-semibold text-on-surface">Cyber_Proposal_Form.docx</p>
                           <p className="text-[9px] text-on-surface-variant">5 Pages • Processed 2h ago</p>
                         </div>
                      </div>
                    </div>
                    <div className="col-span-2 space-y-3">
                       <div className="flex justify-between items-center mb-1">
                         <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Extracted Red Flags</p>
                         <button onClick={() => setActiveDockTab("FLAGS")} className="text-[9px] font-bold text-primary hover:underline uppercase tracking-tighter">See All Intelligence</button>
                       </div>
                      <div className="flex gap-4">
                         <div className="flex-1 bg-error/5 border border-error/20 p-4 rounded-lg relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-error"></div>
                            <div className="flex items-start justify-between">
                               <p className="text-xs font-bold text-on-surface mb-2">Missing MFA on VPN</p>
                               <span className="text-[9px] bg-white px-1.5 py-0.5 rounded shadow-sm font-semibold text-slate-500 border border-slate-200">Page 14</span>
                            </div>
                            <p className="text-[10px] text-on-surface-variant italic leading-relaxed">"...remote access for administrative staff is currently secured via Active Directory credentials only. Hardware tokens have not been fully rolled out."</p>
                         </div>
                         <div className="flex-1 bg-amber-500/5 border border-amber-500/20 p-4 rounded-lg relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
                            <div className="flex items-start justify-between">
                               <p className="text-xs font-bold text-on-surface mb-2">Unverified Backups</p>
                               <span className="text-[9px] bg-white px-1.5 py-0.5 rounded shadow-sm font-semibold text-slate-500 border border-slate-200">Form Q.12</span>
                            </div>
                            <p className="text-[10px] text-on-surface-variant italic leading-relaxed">Proposal form indicated 'Yes' for backups, but Audit Report states restore tests have not been conducted since 2021.</p>
                         </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 shadow-sm flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-teal-600">verified_user</span>
                        <h3 className="font-headline font-bold text-sm tracking-wide">ESSENTIAL CONTROLS (MSME)</h3>
                      </div>
                      <span className="text-[10px] bg-surface-container px-2 py-1 rounded font-bold uppercase tracking-wider text-on-surface-variant">CIS IG1 Focus</span>
                    </div>
                    
                    <div className="flex-1 space-y-4">
                      <div className="border border-outline-variant/50 rounded-lg overflow-hidden">
                         <div className="bg-surface-container-low px-4 py-2 border-b border-outline-variant/50 flex justify-between items-center">
                            <span className="text-[10px] font-bold text-on-surface uppercase tracking-widest">Identity & Access</span>
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${mfaOverride ? 'bg-teal-100 text-teal-700' : 'bg-error-container text-on-error-container'}`}>{mfaOverride ? 'VERIFIED BY UW' : 'FAILED'}</span>
                         </div>
                         <div className="p-4 bg-white">
                            <div className="flex justify-between items-center mb-1">
                               <p className="text-xs font-semibold text-on-surface">Multi-Factor Authentication (MFA)</p>
                               <label className="relative inline-flex items-center cursor-pointer">
                                 <input type="checkbox" className="sr-only peer" checked={mfaOverride} onChange={() => setMfaOverride(!mfaOverride)} />
                                 <div className="w-7 h-4 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-teal-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all"></div>
                               </label>
                            </div>
                            <p className="text-[10px] text-on-surface-variant">Required for Email, VPN, and Admin access.</p>
                            {mfaOverride && <p className="text-[9px] text-teal-600 mt-2 font-semibold bg-teal-50 p-1.5 rounded inline-block">Risk score automatically adjusted (-12 pts).</p>}
                         </div>
                      </div>
                      
                      <div className="border border-outline-variant/50 rounded-lg overflow-hidden">
                         <div className="bg-surface-container-low px-4 py-2 border-b border-outline-variant/50 flex justify-between items-center">
                            <span className="text-[10px] font-bold text-on-surface uppercase tracking-widest">Infrastructure Security</span>
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${edrOverride ? 'bg-teal-100 text-teal-700' : 'bg-error-container text-on-error-container'}`}>{edrOverride ? 'EDR VERIFIED' : 'NO EDR DETECTED'}</span>
                         </div>
                         <div className="p-4 bg-white">
                            <div className="flex justify-between items-center mb-1">
                               <p className="text-xs font-semibold text-on-surface">Endpoint Detection & Response (EDR)</p>
                               <label className="relative inline-flex items-center cursor-pointer">
                                 <input type="checkbox" className="sr-only peer" checked={edrOverride} onChange={() => setEdrOverride(!edrOverride)} />
                                 <div className="w-7 h-4 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-teal-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all"></div>
                               </label>
                            </div>
                            <p className="text-[10px] text-on-surface-variant">Live monitoring and response for ransomware/malware.</p>
                            {edrOverride && <p className="text-[9px] text-teal-600 mt-2 font-semibold bg-teal-50 p-1.5 rounded inline-block">Risk score automatically adjusted (-10 pts).</p>}
                         </div>
                      </div>

                      <div className="border border-outline-variant/50 rounded-lg overflow-hidden">
                         <div className="bg-surface-container-low px-4 py-2 border-b border-outline-variant/50 flex justify-between items-center">
                            <span className="text-[10px] font-bold text-on-surface uppercase tracking-widest">Operational Resilience</span>
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${emailSecOverride ? 'bg-teal-100 text-teal-700' : 'bg-amber-100 text-amber-700'}`}>{emailSecOverride ? 'SECURE' : 'VULNERABLE'}</span>
                         </div>
                         <div className="p-4 bg-white">
                            <div className="flex justify-between items-center mb-1">
                               <p className="text-xs font-semibold text-on-surface">Email Security & Anti-Phishing</p>
                               <label className="relative inline-flex items-center cursor-pointer">
                                 <input type="checkbox" className="sr-only peer" checked={emailSecOverride} onChange={() => setEmailSecOverride(!emailSecOverride)} />
                                 <div className="w-7 h-4 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-teal-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all"></div>
                               </label>
                            </div>
                            <p className="text-[10px] text-on-surface-variant">DMARC, SPF, and Phishing simulation training.</p>
                            {emailSecOverride && <p className="text-[9px] text-teal-600 mt-2 font-semibold bg-teal-50 p-1.5 rounded inline-block">Risk score automatically adjusted (-5 pts).</p>}
                         </div>
                      </div>

                      <div className="border border-outline-variant/50 rounded-lg overflow-hidden">
                         <div className="bg-surface-container-low px-4 py-2 border-b border-outline-variant/50 flex justify-between items-center">
                            <span className="text-[10px] font-bold text-on-surface uppercase tracking-widest">Recovery Resilience</span>
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${backupOverride ? 'bg-teal-100 text-teal-700' : 'bg-amber-100 text-amber-700'}`}>{backupOverride ? 'VERIFIED BY UW' : 'UNCLEAR'}</span>
                         </div>
                         <div className="p-4 bg-white">
                            <div className="flex justify-between items-center mb-1">
                               <p className="text-xs font-semibold text-on-surface">Offline / Immutable Backups</p>
                               <label className="relative inline-flex items-center cursor-pointer">
                                 <input type="checkbox" className="sr-only peer" checked={backupOverride} onChange={() => setBackupOverride(!backupOverride)} />
                                 <div className="w-7 h-4 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-teal-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all"></div>
                               </label>
                            </div>
                            <p className="text-[10px] text-on-surface-variant">Tested offline backups segregated from main network.</p>
                            {backupOverride && <p className="text-[9px] text-teal-600 mt-2 font-semibold bg-teal-50 p-1.5 rounded inline-block">Risk score automatically adjusted (-5 pts).</p>}
                         </div>
                      </div>

                      <div className="border border-outline-variant/50 rounded-lg overflow-hidden">
                         <div className="bg-surface-container-low px-4 py-2 border-b border-outline-variant/50 flex justify-between items-center">
                            <span className="text-[10px] font-bold text-on-surface uppercase tracking-widest">Vuln Management</span>
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${patchOverride ? 'bg-teal-100 text-teal-700' : 'bg-amber-100 text-amber-700'}`}>{patchOverride ? 'OPTIMIZED' : 'LEGACY'}</span>
                         </div>
                         <div className="p-4 bg-white">
                            <div className="flex justify-between items-center mb-1">
                               <p className="text-xs font-semibold text-on-surface">Critical Patch Protocol (72h)</p>
                               <label className="relative inline-flex items-center cursor-pointer">
                                 <input type="checkbox" className="sr-only peer" checked={patchOverride} onChange={() => setPatchOverride(!patchOverride)} />
                                 <div className="w-7 h-4 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-teal-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all"></div>
                               </label>
                            </div>
                            <p className="text-[10px] text-on-surface-variant">Automated patching for CVEs with CVSS &gt; 8.0.</p>
                            {patchOverride && <p className="text-[9px] text-teal-600 mt-2 font-semibold bg-teal-50 p-1.5 rounded inline-block">Risk score automatically adjusted (-3 pts).</p>}
                         </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-900 rounded-xl shadow-sm flex flex-col overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                       <span className="material-symbols-outlined text-8xl text-white">radar</span>
                    </div>
                    <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-slate-950/50 relative z-10">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-teal-400 text-sm">wifi_tethering</span>
                        <h3 className="font-headline font-bold text-sm tracking-wide text-white">EXTERNAL ATTACK SURFACE</h3>
                      </div>
                      <span className="flex items-center gap-1 text-[9px] font-bold text-teal-400 bg-teal-400/10 px-2 py-1 rounded-full"><span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse"></span> LIVE SCAN</span>
                    </div>
                    <div className="p-6 relative z-10 space-y-5">
                       <div className="space-y-1">
                         <p className="text-[10px] font-mono text-slate-400">Target: abc-healthcare.in</p>
                         <p className="text-[10px] font-mono text-slate-400">IP Range: 103.45.xx.xx</p>
                       </div>
                       
                       <div className="space-y-3">
                          <div className="bg-white/5 rounded p-3 border border-error/30 border-l-2 border-l-error">
                             <div className="flex justify-between items-center mb-1">
                                <span className="text-[11px] font-bold text-white font-mono">PORT 3389 (RDP) - OPEN</span>
                                <span className="text-[9px] font-bold uppercase tracking-wider text-error">CRITICAL</span>
                             </div>
                             <p className="text-[10px] text-slate-400">Remote Desktop Protocol exposed to public internet. High risk for brute-force ransomware deployment.</p>
                          </div>
                          
                          <div className="bg-white/5 rounded p-3 border border-amber-500/30 border-l-2 border-l-amber-500">
                             <div className="flex justify-between items-center mb-1">
                                <span className="text-[11px] font-bold text-white font-mono">DARK WEB MENTIONS</span>
                                <span className="text-[9px] font-bold uppercase tracking-wider text-amber-500">MEDIUM</span>
                             </div>
                             <p className="text-[10px] text-slate-400">2 employee emails found in 2024 'Apollo' credential dump. Passwords may be compromised.</p>
                          </div>
                          
                          <div className="bg-white/5 rounded p-3 border border-teal-500/30 border-l-2 border-l-teal-500">
                             <div className="flex justify-between items-center mb-1">
                                <span className="text-[11px] font-bold text-white font-mono">DMARC/SPF CONFIG</span>
                                <span className="text-[9px] font-bold uppercase tracking-wider text-teal-500">SECURE</span>
                             </div>
                             <p className="text-[10px] text-slate-400">Email spoofing protections are active and correctly configured.</p>
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "COVERAGE STRUCTURING" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-headline font-bold">Policy Structuring Workspace</h2>
                  <div className="bg-surface-container-high px-3 py-1 rounded text-xs font-bold text-on-surface flex items-center gap-2 shadow-sm border border-outline-variant/30">
                    Authority Utilization <div className="w-24 h-1.5 bg-slate-300 rounded-full overflow-hidden"><div className="bg-primary h-full" style={{width: `${(aggLimit/25)*100}%`}}></div></div>
                    <span className={aggLimit > 25 ? 'text-error' : 'text-primary'}>₹{aggLimit}Cr / ₹25Cr</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  {/* Left Column: Structuring Controls */}
                  <div className="col-span-2 space-y-6">
                    <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 shadow-sm">
                      <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-4">Quick Packages</p>
                      <div className="grid grid-cols-3 gap-4">
                        <button onClick={() => {setSelectedPackage("Standard"); setAggLimit(5); setExtortionSublimit(1); setBiWaitingPeriod(24);}} className={`p-4 rounded-lg border text-left transition-all ${selectedPackage === 'Standard' ? 'border-primary ring-1 ring-primary bg-primary/5' : 'border-outline-variant/50 hover:bg-surface-container-low'}`}>
                          <h4 className="font-bold text-sm mb-1">Standard</h4>
                          <p className="text-[10px] text-on-surface-variant">₹5 Cr Aggregate</p>
                        </button>
                        <button onClick={() => {setSelectedPackage("Enhanced"); setAggLimit(10); setExtortionSublimit(2); setBiWaitingPeriod(12);}} className={`p-4 rounded-lg border text-left transition-all ${selectedPackage === 'Enhanced' ? 'border-primary ring-1 ring-primary bg-primary/5' : 'border-outline-variant/50 hover:bg-surface-container-low'}`}>
                          <h4 className="font-bold text-sm mb-1">Enhanced</h4>
                          <p className="text-[10px] text-on-surface-variant">₹10 Cr Aggregate</p>
                        </button>
                        <button onClick={() => {setSelectedPackage("Comprehensive"); setAggLimit(25); setExtortionSublimit(5); setBiWaitingPeriod(8);}} className={`p-4 rounded-lg border text-left transition-all ${selectedPackage === 'Comprehensive' ? 'border-primary ring-1 ring-primary bg-primary/5' : 'border-outline-variant/50 hover:bg-surface-container-low'}`}>
                          <h4 className="font-bold text-sm mb-1 text-primary">Comprehensive</h4>
                          <p className="text-[10px] text-on-surface-variant">₹25 Cr Aggregate</p>
                        </button>
                      </div>
                    </div>

                    <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 shadow-sm space-y-8">
                       <div>
                         <div className="flex justify-between items-center mb-2">
                           <label className="text-sm font-bold text-on-surface">Aggregate Policy Limit</label>
                           <span className="text-lg font-black text-primary">₹{aggLimit} Cr</span>
                         </div>
                         <input type="range" min="1" max="40" value={aggLimit} onChange={(e) => {setAggLimit(Number(e.target.value)); setSelectedPackage("Custom");}} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary" />
                       </div>
                       
                       <div className={`p-4 rounded-lg border ${extortionSublimit > 5 && !mfaOverride ? 'bg-error-container/20 border-error/50' : 'bg-surface-container-low border-outline-variant/30'}`}>
                         <div className="flex justify-between items-center mb-2">
                           <label className="text-sm font-bold text-on-surface">Cyber Extortion Sub-limit</label>
                           <span className="text-sm font-bold text-on-surface">₹{extortionSublimit} Cr</span>
                         </div>
                         <input type="range" min="0" max={aggLimit} value={extortionSublimit} onChange={(e) => {setExtortionSublimit(Number(e.target.value)); setSelectedPackage("Custom");}} className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${extortionSublimit > 5 && !mfaOverride ? 'accent-error bg-slate-200' : 'accent-primary bg-slate-200'}`} />
                         {extortionSublimit > 5 && !mfaOverride && (
                            <p className="text-[10px] text-error mt-3 flex items-start gap-1 font-medium"><span className="material-symbols-outlined text-[14px]">warning</span> AI Appetite Guardrail: MFA is currently unverified. Recommend restricting Cyber Extortion to ₹5 Cr max.</p>
                         )}
                         {extortionSublimit > 3 && !edrOverride && (
                            <p className="text-[10px] text-amber-600 mt-2 flex items-start gap-1 font-medium"><span className="material-symbols-outlined text-[14px]">info</span> Recommendation: EDR is missing. High Ransomware limits are commercially sensitive.</p>
                         )}
                         {extortionSublimit > 5 && mfaOverride && (
                            <p className="text-[10px] text-teal-600 mt-3 flex items-start gap-1 font-medium"><span className="material-symbols-outlined text-[14px]">check_circle</span> MFA formally verified by Underwriter. Extortion limit extension approved.</p>
                         )}
                       </div>

                       <div>
                         <div className="flex justify-between items-center mb-2">
                           <label className="text-sm font-bold text-on-surface">Business Interruption Waiting Period</label>
                           <span className="text-sm font-bold text-on-surface">{biWaitingPeriod} Hours</span>
                         </div>
                         <input type="range" min="8" max="48" step="4" value={biWaitingPeriod} onChange={(e) => {setBiWaitingPeriod(Number(e.target.value)); setSelectedPackage("Custom");}} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary" />
                       </div>
                    </div>
                  </div>

                  <div className="col-span-1 space-y-6">
                    <div className="bg-slate-900 rounded-xl shadow-sm overflow-hidden text-white border border-slate-700">
                       <div className="px-5 py-3 border-b border-white/10 flex items-center gap-2 bg-slate-800/50">
                         <span className="material-symbols-outlined text-teal-400 text-sm">bid_landscape</span>
                         <h3 className="font-headline font-bold text-xs tracking-wider">MSME BENCHMARKING</h3>
                       </div>
                       <div className="p-5 space-y-4">
                         <p className="text-[10px] text-slate-400">Healthcare subset (Turnover: ₹100-500Cr)</p>
                         <div className="space-y-2">
                           <div className="flex justify-between items-center">
                             <span className="text-xs font-semibold">Typical Aggregate</span>
                             <span className="text-xs font-bold text-teal-400">₹10 Cr</span>
                           </div>
                           <div className="flex justify-between items-center">
                             <span className="text-xs font-semibold">Extortion Sub-limit</span>
                             <span className="text-xs font-bold text-teal-400">₹2.5 Cr</span>
                           </div>
                           <div className="flex justify-between items-center">
                             <span className="text-xs font-semibold">Retention</span>
                             <span className="text-xs font-bold text-white">₹5 Lakhs</span>
                           </div>
                         </div>
                       </div>
                    </div>

                    <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 shadow-sm">
                       <div className="flex items-center gap-2 mb-4">
                         <span className="material-symbols-outlined text-primary">policy</span>
                         <h3 className="font-headline font-bold text-sm tracking-wide">REQUIRED ENDORSEMENTS</h3>
                       </div>
                       <div className="space-y-3">
                          <label className="flex items-start gap-3 p-2 rounded hover:bg-surface-container-low cursor-pointer">
                             <input type="checkbox" className="mt-0.5 accent-primary flex-shrink-0" defaultChecked />
                             <div>
                               <p className="text-xs font-bold text-on-surface leading-tight">Exclude Unencrypted Portable Devices</p>
                               <p className="text-[9px] text-on-surface-variant mt-0.5">Recommended per baseline Healthcare data controls.</p>
                             </div>
                          </label>
                          <label className="flex items-start gap-3 p-2 rounded hover:bg-surface-container-low cursor-pointer">
                             <input type="checkbox" className="mt-0.5 accent-primary flex-shrink-0" checked={!backupOverride} onChange={() => {}} />
                             <div>
                               <p className="text-xs font-bold text-on-surface leading-tight">Subject to Clean Backup Test (30 Days)</p>
                               <p className={`text-[9px] mt-0.5 ${backupOverride ? 'text-teal-600' : 'text-error'}`}>{backupOverride ? 'Waived since UW verified backups.' : 'Triggered by unverified offline backups.'}</p>
                             </div>
                          </label>
                          <label className="flex items-start gap-3 p-2 rounded hover:bg-surface-container-low cursor-pointer opacity-60">
                             <input type="checkbox" className="mt-0.5 accent-primary flex-shrink-0" />
                             <div>
                               <p className="text-xs font-bold text-on-surface leading-tight">Exclude Social Engineering Fraud</p>
                             </div>
                          </label>
                       </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end pt-4 gap-4 border-t border-outline-variant/30">
                  <button className="px-6 py-2.5 text-sm font-bold text-on-surface bg-surface-container hover:bg-surface-container-high transition-colors rounded-lg border border-outline-variant">Save Draft</button>
                  <button className="px-6 py-2.5 text-sm font-bold text-white bg-primary hover:bg-primary-dark transition-colors rounded-lg shadow-md flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer" disabled={extortionSublimit > 5 && !mfaOverride}>
                    <span className="material-symbols-outlined text-[18px]">request_quote</span> Prepare Quote Pack
                  </button>
                </div>
              </div>
            )}
            {activeTab === "PRICING INTELLIGENCE" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                 <h2 className="text-lg font-headline font-bold mb-4">Pricing Engine & Ledger</h2>
                 <div className="grid grid-cols-3 gap-6">
                   <div className="col-span-2 space-y-6">
                     <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl overflow-hidden shadow-sm">
                        <div className="bg-slate-50 px-6 py-4 border-b border-outline-variant/30 flex justify-between items-center">
                          <h3 className="font-bold text-sm text-on-surface">Premium Build-Up Ledger</h3>
                          <span className="text-[10px] uppercase font-bold text-slate-400">Values in INR (Lakhs)</span>
                        </div>
                        <div className="p-6 space-y-4 font-mono text-sm">
                           <div className="flex justify-between items-center pb-3 border-b border-dashed border-slate-200">
                             <div>
                               <p className="font-semibold text-slate-700">Base Premium</p>
                               <p className="text-[10px] font-sans text-slate-500 mt-0.5">Calculated at 0.15% rate on ₹{aggLimit}Cr Aggregate Limit.</p>
                             </div>
                             <span className="font-bold">₹{basePremium.toFixed(2)}L</span>
                           </div>
                           <div className="flex justify-between items-center pb-3 border-b border-dashed border-slate-200">
                              <div>
                                <p className="font-semibold text-on-surface">MFA Status</p>
                                {mfaOverride 
                                  ? <p className="text-[10px] font-sans text-teal-600 mt-0.5"><span className="material-symbols-outlined text-[10px]">check_circle</span> 15% credit applied (Identity Controls Verified).</p>
                                  : <p className="text-[10px] font-sans text-error mt-0.5"><span className="material-symbols-outlined text-[10px]">warning</span> 15% load applied (Unverified Identity Controls).</p>}
                              </div>
                              <span className={`${mfaPenalty > 0 ? 'text-error font-bold' : 'text-teal-600 font-bold'}`}>{mfaPenalty > 0 ? '+' : '-'} ₹{Math.abs(mfaPenalty).toFixed(2)}L</span>
                            </div>
                            <div className="flex justify-between items-center pb-3 border-b border-dashed border-slate-200">
                              <div>
                                <p className="font-semibold text-on-surface">Active Defenses (EDR)</p>
                                <p className="text-[10px] font-sans text-slate-500 mt-0.5">{edrOverride ? '10% EDR credit applied' : 'Standard rate (No EDR credit)'}</p>
                              </div>
                              <span className={`${edrCredit < 0 ? 'text-teal-600 font-bold' : 'text-slate-400'}`}>₹{edrCredit.toFixed(2)}L</span>
                            </div>
                            <div className="flex justify-between items-center pb-3 border-b border-dashed border-slate-200">
                              <div>
                                <p className="font-semibold text-on-surface">Email & Ops Resilience</p>
                                <p className="text-[10px] font-sans text-slate-500 mt-0.5">{emailSecOverride || patchOverride ? 'Aggregated resilience credits applied' : 'No resilience modifiers'}</p>
                              </div>
                              <span className={`${(emailCredit + patchCredit) < 0 ? 'text-teal-600 font-bold' : 'text-slate-400'}`}>₹{(emailCredit + patchCredit).toFixed(2)}L</span>
                            </div>
                           <div className="flex justify-between items-center pb-3 border-b border-dashed border-slate-200">
                             <div>
                               <p className="font-semibold text-amber-600">Extortion Sub-Limit Load</p>
                               {ransomwareLoad > 0 
                                 ? <p className="text-[10px] font-sans text-amber-600 mt-0.5">Added load for exceeding baseline ₹2Cr ransomware limit.</p>
                                 : <p className="text-[10px] font-sans text-slate-500 mt-0.5">No penalty: Extortion sub-limit is within nominal ₹2Cr boundary.</p>}
                             </div>
                             <span className={`${ransomwareLoad > 0 ? 'text-amber-600 font-bold' : 'text-slate-400'}`}>+ ₹{ransomwareLoad.toFixed(2)}L</span>
                           </div>
                           <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                             <div>
                               <p className="font-semibold text-teal-600">Offline Backup Discount</p>
                               {backupOverride 
                                 ? <p className="text-[10px] font-sans text-teal-600 mt-0.5">-5% credit for explicitly verified offline, immutable backups.</p>
                                 : <p className="text-[10px] font-sans text-slate-500 mt-0.5">Credit unavailable: Backups unverified.</p>}
                             </div>
                             <span className={`${backupOverride ? 'text-teal-600 font-bold' : 'text-slate-400'}`}>- ₹{Math.abs(backupWaiver).toFixed(2)}L</span>
                           </div>
                           <div className="flex justify-between items-center pt-2">
                             <p className="font-black text-slate-800 text-base font-sans">TECHNICAL PREMIUM</p>
                             <span className="font-black text-slate-800 text-lg">₹{techPremium.toFixed(2)}L</span>
                           </div>
                        </div>
                     </div>
                   </div>
                   <div className="col-span-1 space-y-6">
                     <div className="bg-slate-900 rounded-xl p-6 text-white overflow-hidden relative shadow-lg">
                       <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
                       <h3 className="font-headline font-bold text-xs tracking-wider text-slate-400 mb-6">COMMERCIAL TUNING</h3>
                       <div className="mb-8 relative z-10">
                         <div className="flex justify-between mb-2">
                           <label className="text-sm font-semibold">Underwriter Override</label>
                           <span className={`text-sm font-bold ${commercialDiscount < 0 ? 'text-teal-400' : commercialDiscount > 0 ? 'text-error' : 'text-slate-300'}`}>
                             {commercialDiscount > 0 ? '+' : ''}{commercialDiscount}%
                           </span>
                         </div>
                         <input type="range" min="-20" max="20" value={commercialDiscount} onChange={(e) => setCommercialDiscount(Number(e.target.value))} className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary" />
                         <div className="flex justify-between mt-1 text-[9px] text-slate-500">
                           <span>-20% (Discount)</span><span>0</span><span>+20% (Load)</span>
                         </div>
                       </div>
                       <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700 relative z-10">
                          <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-1">Final Quoted Premium</p>
                          <div className="flex items-baseline gap-1">
                             <span className="text-3xl font-black text-white">₹{finalPremium.toFixed(2)}</span>
                             <span className="text-sm font-bold text-slate-400">Lakhs</span>
                          </div>
                       </div>
                       <div className="mt-6 flex items-center justify-between relative z-10">
                          <span className="text-xs text-slate-400">Expected Loss Ratio (ELR)</span>
                          <span className={`text-sm font-bold ${elr > 65 ? 'text-error' : 'text-teal-400'}`}>{elr.toFixed(1)}%</span>
                       </div>
                       {elr > 65 && <p className="text-[9px] text-error mt-2 relative z-10">Warning: Commercial discount pushes ELR past 65% profitability threshold.</p>}
                     </div>
                   </div>
                 </div>
              </div>
            )}
            {activeTab !== "OVERVIEW" && activeTab !== "RISK ASSESSMENT" && activeTab !== "COVERAGE STRUCTURING" && activeTab !== "PRICING INTELLIGENCE" && (
              <div className="flex flex-col items-center justify-center p-20 text-on-surface-variant opacity-70">
                <span className="material-symbols-outlined text-4xl mb-4">construction</span>
                <p className="font-medium">{activeTab} module is coming soon.</p>
              </div>
            )}
          </div>
        </section>

        {/*  Right Panel: Decision & Actions  */}
        <aside className="w-[300px] bg-amber-50/30 border-l border-amber-200/50 p-6 flex flex-col overflow-y-auto">
          <h3 className="font-headline font-extrabold text-xs uppercase tracking-[0.15em] text-on-surface-variant mb-6">Decision Zone</h3>
          <div className="flex-1 space-y-6">
            <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/50 shadow-sm border-t-4 border-t-primary">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Live Quote Summary</p>
              <div className="space-y-4">
                 <div>
                   <p className="text-[10px] text-on-surface-variant mb-1">Total Capacity</p>
                   <p className="text-sm font-bold text-on-surface">₹{aggLimit} Cr Limit</p>
                 </div>
                 <div className="flex justify-between items-end">
                   <div>
                     <p className="text-[10px] text-on-surface-variant mb-1">Quoted Premium</p>
                     <p className="text-xl font-black text-primary flex items-baseline gap-1">₹{finalPremium.toFixed(2)} <span className="text-[10px] font-semibold">Lakhs</span></p>
                   </div>
                   {commercialDiscount !== 0 && (
                     <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${commercialDiscount < 0 ? 'bg-teal-50 text-teal-600 border border-teal-100' : 'bg-red-50 text-error border border-error/20'}`}>
                       {commercialDiscount > 0 ? '+' : ''}{commercialDiscount}% Adj
                     </span>
                   )}
                 </div>
              </div>
            </div>
            <div className="bg-surface-container-high p-4 rounded-xl border border-outline-variant/30">
               <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">System Gateways</h4>
               <ul className="space-y-3">
                 <li className="flex items-start gap-2">
                   <span className={`material-symbols-outlined text-[16px] mt-0.5 ${aggLimit > 25 ? 'text-error' : 'text-teal-600'}`} data-weight="fill">{aggLimit > 25 ? 'cancel' : 'check_circle'}</span>
                   <div>
                     <span className="text-xs font-bold text-on-surface leading-none">Authority Limit</span>
                     {aggLimit > 25 
                       ? <p className="text-[9px] text-error mt-0.5 leading-tight">Capacity exceeds ₹25Cr UW bound.</p>
                       : <p className="text-[9px] text-teal-600 mt-0.5 leading-tight">Within standard ₹25Cr bound.</p>}
                   </div>
                 </li>
                 <li className="flex items-start gap-2">
                   <span className={`material-symbols-outlined text-[16px] mt-0.5 ${(extortionSublimit > 5 && !mfaOverride) ? 'text-error' : 'text-teal-600'}`} data-weight="fill">{(extortionSublimit > 5 && !mfaOverride) ? 'cancel' : 'check_circle'}</span>
                   <div>
                     <span className="text-xs font-bold text-on-surface leading-none">Risk Strategy</span>
                     {(extortionSublimit > 5 && !mfaOverride)
                       ? <p className="text-[9px] text-error mt-0.5 leading-tight">Extortion limit &gt; ₹5Cr without verified MFA.</p>
                       : <p className="text-[9px] text-teal-600 mt-0.5 leading-tight">Limits aligned with security profile.</p>}
                   </div>
                 </li>
                 <li className="flex items-start gap-2">
                   <span className={`material-symbols-outlined text-[16px] mt-0.5 ${elr > 65 ? 'text-error' : 'text-teal-600'}`} data-weight="fill">{elr > 65 ? 'cancel' : 'check_circle'}</span>
                   <div>
                     <span className="text-xs font-bold text-on-surface leading-none">Profitability</span>
                     {elr > 65
                       ? <p className="text-[9px] text-error mt-0.5 leading-tight">ELR {elr.toFixed(1)}% breaches 65% max threshold.</p>
                       : <p className="text-[9px] text-teal-600 mt-0.5 leading-tight">Acceptable ELR trajectory.</p>}
                   </div>
                 </li>
               </ul>
            </div>
          </div>
          <div className="space-y-3 pt-4 border-t border-outline-variant/30 mt-auto pb-4">
            { (aggLimit > 25 || (extortionSublimit > 5 && !mfaOverride) || elr > 65) ? (
                <button className="w-full py-4 bg-slate-800 text-white font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-slate-900 transition-colors shadow-md">
                  <span className="material-symbols-outlined text-amber-400">lock</span> REFER TO MANAGER
                </button>
            ) : (
                <button className="w-full py-4 bg-primary text-white font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-primary-dark transition-colors shadow-md">
                  <span className="material-symbols-outlined">verified_user</span> AUTHORIZE & ISSUE
                </button>
            )}
            <button className="w-full py-3 bg-surface border border-outline-variant text-on-surface font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">description</span> Export Workup
            </button>
          </div>
        </aside>
      </div>

      {/* Bottom Drawer Overlay */}
      {activeDockTab && (
        <div className="fixed inset-0 bg-slate-900/20 z-40" onClick={() => setActiveDockTab(null)}></div>
      )}

      {/* Bottom Drawer Panel */}
      <div className={`fixed bottom-12 right-0 left-64 bg-surface-container-lowest border-t border-outline-variant/30 shadow-2xl z-50 transition-transform duration-300 ease-in-out flex flex-col ${activeDockTab ? 'translate-y-0 h-96' : 'translate-y-full h-0 border-transparent shadow-none'}`}>
        {activeDockTab && (
          <>
            <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/30 bg-slate-50">
               <h4 className="font-headline font-bold text-sm tracking-wider flex items-center gap-2">
                  {activeDockTab === "NOTES" && <><span className="material-symbols-outlined text-teal-600">notes</span> UNDERWRITER NOTES</>}
                  {activeDockTab === "RATIONALE" && <><span className="material-symbols-outlined text-primary">psychology</span> AGENT RATIONALE</>}
                  {activeDockTab === "LOGS" && <><span className="material-symbols-outlined text-on-surface-variant">terminal</span> BACKGROUND LOGS</>}
                  {activeDockTab === "DOCS" && <><span className="material-symbols-outlined text-amber-600">description</span> DOCUMENT REPOSITORY</>}
                  {activeDockTab === "FLAGS" && <><span className="material-symbols-outlined text-error">report</span> RED FLAGS</>}
                  {activeDockTab === "TIMELINE" && <><span className="material-symbols-outlined text-teal-600">schedule</span> CASE TIMELINE</>}
               </h4>
               <button onClick={() => setActiveDockTab(null)} className="p-1 hover:bg-slate-200 rounded text-slate-500 transition-colors">
                  <span className="material-symbols-outlined text-sm">close</span>
               </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {activeDockTab === "NOTES" && (
                 <div className="h-full flex flex-col gap-4">
                    <div className="flex-1 border border-outline-variant/50 rounded-lg p-4 bg-white overflow-y-auto space-y-4">
                       <div className="flex gap-4">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs shrink-0">VR</div>
                          <div>
                             <p className="text-[10px] text-slate-400 mb-1">Vikram Rathore • Today, 10:45 AM</p>
                             <p className="text-sm text-slate-700">Client indicated they are migrating emails to Office365 next month, which will enforce MFA globally. Conditional bind: require proof of O365 migration completion within 30 days of inception.</p>
                          </div>
                       </div>
                    </div>
                    <div className="flex gap-2">
                       <textarea className="flex-1 border border-outline-variant/50 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary h-16" placeholder="Add an internal note or requirement..."></textarea>
                       <button className="bg-primary text-white px-4 rounded-lg font-bold text-sm hover:bg-primary-dark transition-colors flex items-center justify-center h-16 w-16 shadow-sm"><span className="material-symbols-outlined">send</span></button>
                    </div>
                 </div>
              )}
              {activeDockTab === "RATIONALE" && (
                 <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white border text-left border-outline-variant/50 p-4 rounded-lg shadow-sm">
                       <p className="text-[10px] uppercase font-bold tracking-widest text-primary mb-2">Automated Underwriting Guideline Mapping</p>
                       <h5 className="font-bold text-sm mb-3">Healthcare Sector Tiers (India)</h5>{renderFeedback("rationale-healthcare")}
                       <p className="text-xs text-slate-600 mb-4 leading-relaxed">Turnover segment ₹100-500Cr classifies as Tier 2. According to Guideline HA-42, Tier 2 facilities are eligible for limits up to ₹25Cr strictly subject to isolated backup verification.</p>
                       <div className="p-3 bg-teal-50 border border-teal-100 rounded text-xs text-teal-800">
                          <strong>Rule Passed:</strong> Backup override triggered manually by underwriter.
                       </div>
                    </div>
                    <div className="bg-white border text-left border-outline-variant/50 p-4 rounded-lg shadow-sm">
                       <p className="text-[10px] uppercase font-bold tracking-widest text-primary mb-2">Base Rate Selection</p>
                       <h5 className="font-bold text-sm mb-3">0.15% Base Rate Derivation</h5>{renderFeedback("rationale-baserate")}
                       <p className="text-xs text-slate-600 mb-4 leading-relaxed">Derived from actuarial tables for NAICS 622110 (General Medical and Surgical Hospitals). Increased from base 0.12% due to historical ransomware incidence frequency within the immediate geographic zone.</p>
                       <div className="p-3 bg-amber-50 border border-amber-100 rounded text-xs text-amber-800 flex gap-2">
                          <span className="material-symbols-outlined text-[16px]">map</span> Locational Load (+0.03% applied)
                       </div>
                    </div>
                 </div>
              )}
              {activeDockTab === "LOGS" && (
                 <div className="bg-slate-950 font-mono text-[11px] text-teal-400/80 p-4 rounded-lg h-full overflow-y-auto space-y-1 border border-slate-700 shadow-inner">
                   <p>[10:41:03.220] INFO  - Document pipeline ingested: ['security-app-2023.pdf', 'financial-statement.pdf', 'it-audit.pdf']</p>
                   <p>[10:41:04.105] DEBUG - Extracting entities using Gemini-Pro-Vision...</p>
                   <p>[10:41:06.551] INFO  - Entity extraction complete. Risk context hydrated.</p>
                   <p>[10:41:06.560] WARN  - Missing data point: "MFA on Email". Requesting manual UW verification.</p>
                   <p>[10:41:07.112] INFO  - Spawning background web agent for EASM scan on domain 'abc-healthcare.in'...</p>
                   <p>[10:41:12.890] ERROR - EASM Scan: Port 3389 exposed on subnet block 103.45.x.x.</p>
                   <p>[10:41:13.002] INFO  - Synchronizing state with Decision Engine...</p>
                   <p className="text-white pt-2 animate-pulse">&gt; _</p>
                 </div>
              )}
              {activeDockTab === "DOCS" && (
                 <div className="grid grid-cols-4 gap-4">
                    <div className="border border-outline-variant/50 bg-white rounded-lg p-4 flex flex-col items-center justify-center text-center hover:border-primary cursor-pointer group shadow-sm transition-all hover:-translate-y-1">
                       <span className="material-symbols-outlined text-4xl text-error mb-3 group-hover:scale-110 transition-transform">picture_as_pdf</span>
                       <p className="font-bold text-xs text-slate-700 line-clamp-1 w-full">Cyber-App-Signed.pdf</p>
                       <p className="text-[9px] text-slate-400 mt-1">Uploaded 10:41 AM</p>
                       <button className="mt-4 text-[10px] bg-slate-100 text-slate-600 font-bold px-3 py-1 rounded w-full group-hover:bg-primary group-hover:text-white transition-colors" onClick={() => setActiveDeepDive({"title":"Cyber Proposal Extraction","source":"Cyber-App-Signed.pdf","evidence":"Company declares 1,200 employees and ₹250 Cr revenue in Section 1.1. Backups verified as Daily in Section 4.5.","confidence":98})}>Examine Extraction</button>
                       <div className="mt-1 flex justify-center"><span className="text-[8px] font-bold text-teal-600 bg-teal-50 px-1 rounded flex items-center gap-1"><span className="material-symbols-outlined text-[10px]">verified</span> 98%</span></div>
                    </div>
                    <div className="border border-outline-variant/50 bg-white rounded-lg p-4 flex flex-col items-center justify-center text-center hover:border-primary cursor-pointer group shadow-sm transition-all hover:-translate-y-1">
                       <span className="material-symbols-outlined text-4xl text-error mb-3 group-hover:scale-110 transition-transform">picture_as_pdf</span>
                       <p className="font-bold text-xs text-slate-700 line-clamp-1 w-full">IT_Audit_Report.pdf</p>
                       <p className="text-[9px] text-slate-400 mt-1">Uploaded 10:41 AM</p>
                       <button className="mt-4 text-[10px] bg-slate-100 text-slate-600 font-bold px-3 py-1 rounded w-full group-hover:bg-primary group-hover:text-white transition-colors" onClick={() => setActiveDeepDive({"title":"IT Audit Intelligence","source":"IT_Audit_Report.pdf","evidence":"Auditor confirms MFA is only partially rolled out for remote admins. Recovery tests are overdue since 2021.","confidence":96})}>Examine Extraction</button>
                       <div className="mt-1 flex justify-center"><span className="text-[8px] font-bold text-teal-600 bg-teal-50 px-1 rounded flex items-center gap-1"><span className="material-symbols-outlined text-[10px]">verified</span> 96%</span></div>
                    </div>
                    <div className="border border-outline-variant/50 bg-white rounded-lg p-4 flex flex-col items-center justify-center text-center hover:border-primary cursor-pointer group shadow-sm transition-all hover:-translate-y-1 relative">
                       <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-[8px] font-bold px-2 py-0.5 rounded-full shadow border-2 border-white">FLAGGED</span>
                       <span className="material-symbols-outlined text-4xl text-error mb-3 group-hover:scale-110 transition-transform">picture_as_pdf</span>
                       <p className="font-bold text-xs text-slate-700 line-clamp-1 w-full">Incident-Rapport-2023.pdf</p>
                       <p className="text-[9px] text-slate-400 mt-1">Uploaded 10:41 AM</p>
                       <button className="mt-4 text-[10px] bg-slate-100 text-slate-600 font-bold px-3 py-1 rounded w-full group-hover:bg-primary group-hover:text-white transition-colors" onClick={() => setActiveDeepDive({"title":"Incident Intelligence","source":"Incident-Rapport-2023.pdf","evidence":"Ransomware incident confirmed at 02:45 UTC on 2023-01-12. Primary entry point: Compromised RDP session.","confidence":85})}>Examine Extraction</button>
                       <div className="mt-1 flex justify-center"><span className="text-[8px] font-bold text-teal-600 bg-teal-50 px-1 rounded flex items-center gap-1"><span className="material-symbols-outlined text-[10px]">verified</span> 85%</span></div>
                    </div>
                    <div className="border border-dashed border-outline-variant/50 bg-slate-50 flex items-center justify-center rounded-lg cursor-pointer hover:bg-slate-100 transition-colors group">
                       <div className="text-center">
                          <span className="material-symbols-outlined text-3xl text-slate-400 mb-2 group-hover:text-primary transition-colors">upload_file</span>
                          <p className="text-xs font-bold text-slate-500 group-hover:text-primary transition-colors">Upload Additional File</p>
                       </div>
                    </div>
                 </div>
              )}
              {activeDockTab === "FLAGS" && (
                 <div className="h-full overflow-y-auto bg-slate-50/50 scrollbar-thin scrollbar-thumb-slate-200">
                    <div className="grid grid-cols-3 h-full divide-x divide-slate-200">
                       {/* Column 1: Core Cyber Risks */}
                       <div className="flex flex-col bg-slate-50/30">
                          <div className="px-5 py-3 flex items-center gap-2 bg-white border-b border-error/20 sticky top-0 z-10 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
                             <span className="material-symbols-outlined text-error text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>shield_lock</span>
                             <p className="text-[10px] font-black text-error uppercase tracking-[0.2em] flex-1">Core Cyber Risks</p>
                             <span className="text-[9px] font-bold bg-error text-white px-1.5 py-0.5 rounded border border-error shadow-sm">2 Flags</span>
                          </div>
                          <div className="p-4 space-y-4">
                             <div className="bg-white rounded-xl overflow-hidden border border-outline-variant/30 shadow-sm group hover:border-error/30 transition-all hover:shadow-md">
                                <div className="px-4 py-3 flex items-start justify-between gap-2 border-b border-slate-100 bg-slate-50/40">
                                   <div>
                                      <p className="text-xs font-bold text-slate-900 leading-tight">Missing MFA on VPN</p>
                                      <span className="text-[8px] font-black text-error uppercase tracking-widest px-1 bg-error/10 rounded">Critical</span>
                                   </div>
                                   <div className="flex items-center gap-1 bg-teal-500/10 px-2 py-0.5 rounded-full border border-teal-500/20 shrink-0 shadow-sm">
                                      <span className="material-symbols-outlined text-[10px] text-teal-600" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                                      <span className="text-[8px] font-black text-teal-600">98%</span>
                                   </div>
                                </div>
                                <div className="px-4 py-3">
                                   <p className="text-[10px] text-slate-600 italic leading-relaxed border-l-2 border-error pl-3 mb-2 bg-error/[0.02] py-1">"...secured via AD credentials only. Hardware tokens not fully rolled out."</p>
                                   <p className="text-[9px] text-slate-500 font-mono flex items-center gap-1"><span className="material-symbols-outlined text-[10px]">article</span> Audit Report [Pg 14]</p>
                                </div>
                                 <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50/30 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => setActiveDeepDive({
                                       title: 'Missing MFA on VPN', 
                                       mainSource: 'Audit Report',
                                       confidence: 98,
                                       sources: [
                                          { name: 'Security Audit [2024]', page: 14, excerpt: 'Remote access secured via Active Directory credentials only. Hardware tokens not fully rolled out. MFA enrollment remains at 40% for VPN concentrators.', type: 'AUDIT' },
                                          { name: 'Internal Wiki', page: 2, excerpt: 'VPN access guidelines: "All users must use AD credentials." (Last updated 2021). No mention of mandatory MFA.', type: 'DOC' }
                                       ],
                                       pageMap: [1, 2, 8, 14, 15],
                                       activePage: 14
                                    })} className="text-[9px] font-bold bg-slate-800 text-white px-3 py-1.5 rounded-full hover:bg-slate-900 transition-colors flex items-center gap-1 shadow-sm"><span className="material-symbols-outlined text-[11px]">data_exploration</span> Deep Dive</button>
                                 </div>
                             </div>

                             <div className="bg-white rounded-xl overflow-hidden border border-outline-variant/30 shadow-sm group hover:border-error/30 transition-all hover:shadow-md">
                                <div className="px-4 py-3 flex items-start justify-between gap-2 border-b border-slate-100 bg-slate-50/40">
                                   <div>
                                      <p className="text-xs font-bold text-slate-900 leading-tight">Open RDP Port (3389)</p>
                                      <span className="text-[8px] font-black text-error uppercase tracking-widest px-1 bg-error/10 rounded">Critical</span>
                                   </div>
                                   <div className="flex items-center gap-1 bg-teal-500/10 px-2 py-0.5 rounded-full border border-teal-500/20 shrink-0 shadow-sm">
                                      <span className="material-symbols-outlined text-[10px] text-teal-600" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                                      <span className="text-[8px] font-black text-teal-600">100%</span>
                                   </div>
                                </div>
                                <div className="px-4 py-3">
                                   <p className="text-[10px] text-slate-600 italic leading-relaxed border-l-2 border-error pl-3 mb-2 bg-error/[0.02] py-1">"Scanned: 103.45.xx.xx. Port 3389 explicitly found exposed to public internet."</p>
                                   <p className="text-[9px] text-slate-500 font-mono flex items-center gap-1"><span className="material-symbols-outlined text-[10px]">radar</span> EASM Live Scan</p>
                                </div>
                                <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50/30 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                   <button onClick={() => setActiveDeepDive({
                                       title: "Open RDP Port (3389)", 
                                       mainSource: "EASM Scan",
                                       confidence: 100,
                                       sources: [
                                          { name: "External Attack Surface Map", page: 1, excerpt: "Target: 103.45.xx.xx. Service: ms-wbt-server (RDP). Port: 3389. State: OPEN. Version: Windows Server 2016.", type: "SCAN" },
                                          { name: "IT Assets Inventory", page: 5, excerpt: "Asset ID: SRV-PROD-01. IP: 103.45.xx.xx. Status: Production. Notes: \"External access disabled\". (CONFLICT DETECTED)", type: "INVENTORY" }
                                       ],
                                       pageMap: [1, 2, 3, 5, 8],
                                       activePage: 1
                                    })} className="text-[9px] font-bold bg-slate-800 text-white px-3 py-1.5 rounded-full hover:bg-slate-900 transition-colors flex items-center gap-1 shadow-sm"><span className="material-symbols-outlined text-[11px]">data_exploration</span> Deep Dive</button>
                                </div>
                             </div>
                          </div>
                       </div>

                       {/* Column 2: Document Discrepancies */}
                       <div className="flex flex-col bg-slate-50/30">
                          <div className="px-5 py-3 flex items-center gap-2 bg-white border-b border-amber-500/20 sticky top-0 z-10 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
                             <span className="material-symbols-outlined text-amber-500 text-sm">compare_arrows</span>
                             <p className="text-[10px] font-black text-amber-600 uppercase tracking-[0.2em] flex-1">Document Discrepancies</p>
                             <span className="text-[9px] font-bold bg-amber-500 text-white px-1.5 py-0.5 rounded border border-amber-500 shadow-sm">1 Flag</span>
                          </div>
                          <div className="p-4 space-y-4">
                             <div className="bg-white rounded-xl overflow-hidden border border-outline-variant/30 shadow-sm group hover:border-amber-500/30 transition-all hover:shadow-md">
                                <div className="px-4 py-3 flex items-start justify-between gap-2 border-b border-slate-100 bg-slate-50/40">
                                   <div>
                                      <p className="text-xs font-bold text-slate-900 leading-tight">Backup Verification Conflict</p>
                                      <span className="text-[8px] font-black text-amber-600 uppercase tracking-widest px-1 bg-amber-500/10 rounded">High</span>
                                   </div>
                                   <div className="flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20 shrink-0 shadow-sm">
                                      <span className="material-symbols-outlined text-[10px] text-amber-600" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                                      <span className="text-[8px] font-black text-amber-600">85%</span>
                                   </div>
                                </div>
                                <div className="px-4 py-3">
                                   <div className="grid grid-cols-2 gap-2 mb-3">
                                      <div className="bg-teal-500/5 border border-teal-500/20 p-2 rounded-lg">
                                         <p className="text-[8px] font-black text-teal-600 uppercase tracking-widest mb-1">Proposal Form</p>
                                         <p className="text-[10px] text-slate-600 italic">"Yes, daily offline backups."</p>
                                      </div>
                                      <div className="bg-error/5 border border-error/20 p-2 rounded-lg">
                                         <p className="text-[8px] font-black text-error uppercase tracking-widest mb-1">Audit Report</p>
                                         <p className="text-[10px] text-slate-600 italic">"No restore tests since 2021."</p>
                                      </div>
                                   </div>
                                   <p className="text-[9px] text-slate-500 font-mono flex items-center gap-1"><span className="material-symbols-outlined text-[10px]">merge</span> Multi-Doc Cross Reference</p>
                                </div>
                                <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50/30 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                   <button onClick={() => setActiveDeepDive({
                                       title: "Backup Verification Conflict", 
                                       mainSource: "Multi-Doc Cross Ref",
                                       confidence: 85,
                                       sources: [
                                          { name: "Proposal Form", page: 8, excerpt: "Q12: \"Do you maintain offline backups?\" Ans: YES. Frequency: Daily. Verification: Weekly.", type: "PROPOSAL" },
                                          { name: "IT Audit Report", page: 14, excerpt: "Section 9.3: \"Recovery testing for offline assets was last conducted in 2021. Current validation status: PENDING/EXPIRED.\"", type: "AUDIT" }
                                       ],
                                       pageMap: [4, 8, 12, 14, 18],
                                       activePage: 8
                                    })} className="text-[9px] font-bold bg-slate-800 text-white px-3 py-1.5 rounded-full hover:bg-slate-900 transition-colors flex items-center gap-1 shadow-sm"><span className="material-symbols-outlined text-[11px]">data_exploration</span> Deep Dive</button>
                                </div>
                             </div>
                          </div>
                       </div>

                       {/* Column 3: Submission Integrity */}
                       <div className="flex flex-col bg-slate-50/30">
                          <div className="px-5 py-3 flex items-center gap-2 bg-white border-b border-purple-500/20 sticky top-0 z-10 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
                             <span className="material-symbols-outlined text-purple-500 text-sm">content_paste_search</span>
                             <p className="text-[10px] font-black text-purple-600 uppercase tracking-[0.2em] flex-1">Submission Integrity</p>
                             <span className="text-[9px] font-bold bg-purple-500 text-white px-1.5 py-0.5 rounded border border-purple-500 shadow-sm">2 Flags</span>
                          </div>
                          <div className="p-4 space-y-4">
                             <div className="bg-white rounded-xl overflow-hidden border border-outline-variant/30 shadow-sm group hover:border-purple-400/30 transition-all hover:shadow-md">
                                <div className="px-4 py-3 flex items-start justify-between gap-2 border-b border-slate-100 bg-slate-50/40">
                                   <div>
                                      <p className="text-xs font-bold text-slate-900 leading-tight">Questionnaire Anomalies</p>
                                      <span className="text-[8px] font-black text-purple-600 uppercase tracking-widest px-1 bg-purple-500/10 rounded">Suspicious</span>
                                   </div>
                                   <div className="flex items-center gap-1 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20 shrink-0 shadow-sm">
                                      <span className="material-symbols-outlined text-[10px] text-purple-600" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                                      <span className="text-[8px] font-black text-purple-600">92%</span>
                                   </div>
                                </div>
                                <div className="px-4 py-3">
                                   <p className="text-[10px] text-slate-600 italic leading-relaxed border-l-2 border-purple-500 pl-3 mb-2 bg-purple-500/[0.02] py-1">"Identical copy-paste answers detected across Sections 4, 7, and 9 (Control Maturity)."</p>
                                   <p className="text-[9px] text-slate-500 mt-2 font-mono flex items-center gap-1"><span className="material-symbols-outlined text-[10px]">text_fields</span> Linguistic Analysis</p>
                                </div>
                                <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50/30 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                   <button onClick={() => setActiveDeepDive({
                                       title: "Questionnaire Anomalies", 
                                       mainSource: "Linguistic Analysis",
                                       confidence: 92,
                                       sources: [
                                          { name: "Proposal Form (Section 4)", page: 7, excerpt: "\"The organization maintains a robust perimeter security model with multi-layered firewalls...\"", type: "PROPOSAL" },
                                          { name: "Proposal Form (Section 9)", page: 12, excerpt: "\"The organization maintains a robust perimeter security model with multi-layered firewalls...\" (Identical verbatim match)", type: "PROPOSAL" }
                                       ],
                                       pageMap: [1, 7, 12, 15],
                                       activePage: 7
                                    })} className="text-[9px] font-bold bg-slate-800 text-white px-3 py-1.5 rounded-full hover:bg-slate-900 transition-colors flex items-center gap-1 shadow-sm"><span className="material-symbols-outlined text-[11px]">data_exploration</span> Deep Dive</button>
                                </div>
                             </div>

                             <div className="bg-white rounded-xl overflow-hidden border border-outline-variant/30 shadow-sm group hover:border-purple-400/30 transition-all hover:shadow-md">
                                <div className="px-4 py-3 flex items-start justify-between gap-2 border-b border-slate-100 bg-slate-50/40">
                                   <div>
                                      <p className="text-xs font-bold text-slate-900 leading-tight">Metadata Mismatch</p>
                                      <span className="text-[8px] font-black text-purple-600 uppercase tracking-widest px-1 bg-purple-500/10 rounded">Suspicious</span>
                                   </div>
                                   <div className="flex items-center gap-1 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20 shrink-0 shadow-sm">
                                      <span className="material-symbols-outlined text-[10px] text-purple-600" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                                      <span className="text-[8px] font-black text-purple-600">100%</span>
                                   </div>
                                </div>
                                <div className="px-4 py-3">
                                   <div className="bg-slate-50 p-3 rounded-lg border border-outline-variant/30 space-y-2">
                                      <div className="flex justify-between items-center bg-white p-1.5 rounded border border-outline-variant/10">
                                         <p className="text-[8px] text-slate-500 uppercase font-mono">Signed Date</p>
                                         <p className="text-[10px] font-bold text-slate-900 border-b border-teal-500">2024-04-01</p>
                                      </div>
                                      <div className="flex justify-between items-center bg-white p-1.5 rounded border border-outline-variant/10">
                                         <p className="text-[8px] text-slate-500 uppercase font-mono">File Metadata</p>
                                         <p className="text-[10px] font-bold text-error border-b border-error">2023-11-15</p>
                                      </div>
                                   </div>
                                   <p className="text-[9px] text-slate-500 mt-2 font-mono flex items-center gap-1"><span className="material-symbols-outlined text-[10px]">fingerprint</span> File Metadata Extract</p>
                                </div>
                                <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50/30 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                   <button onClick={() => setActiveDeepDive({
                                       title: "Metadata Mismatch", 
                                       mainSource: "Forensic Extraction",
                                       confidence: 100,
                                       sources: [
                                          { name: "Signed Proposal PDF", page: 1, excerpt: "Signature Date Field: 2024-04-01. (User visible)", type: "DOC" },
                                          { name: "XMP Metadata Header", page: 1, excerpt: "xmp:CreateDate=\"2023-11-15T11:42:00\". xmp:ModifyDate=\"2023-11-15T12:10:00\". (Encoded timestamp)", type: "FORENSIC" }
                                       ],
                                       pageMap: [1],
                                       activePage: 1
                                    })} className="text-[9px] font-bold bg-slate-800 text-white px-3 py-1.5 rounded-full hover:bg-slate-900 transition-colors flex items-center gap-1 shadow-sm"><span className="material-symbols-outlined text-[11px]">data_exploration</span> Deep Dive</button>
                                </div>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
              )}
              {activeDockTab === "TIMELINE" && (
                 <div className="max-w-xl mx-auto space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                       <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-100 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                          <span className="material-symbols-outlined text-sm">mail</span>
                       </div>
                       <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded bg-white border border-outline-variant/30 shadow-sm">
                          <div className="flex items-center justify-between space-x-2 mb-1">
                             <div className="font-bold text-xs text-slate-900">Submission Received</div>
                             <time className="font-mono text-[9px] text-slate-500">10:41 AM</time>
                          </div>
                          <div className="text-slate-600 text-[10px]">Via broker API integration. 4 attachments included.</div>
                       </div>
                    </div>
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                       <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-primary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                          <span className="material-symbols-outlined text-[16px]">smart_toy</span>
                       </div>
                       <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded bg-primary/5 border border-primary/20 shadow-sm">
                          <div className="flex items-center justify-between space-x-2 mb-1">
                             <div className="font-bold text-xs text-primary">Initial AI Processing</div>
                             <time className="font-mono text-[9px] text-primary">10:41 AM</time>
                          </div>
                          <div className="text-slate-600 text-[10px]">Ran document extraction and external attack surface mapping. Pre-populated risk facts and generated score (73/100).</div>
                       </div>
                    </div>
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                       <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-amber-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 box-content ring-4 ring-white">
                          <span className="material-symbols-outlined text-[16px]">edit_note</span>
                       </div>
                       <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border-2 border-amber-200 bg-white shadow-sm">
                          <div className="flex items-center justify-between space-x-2 mb-1">
                             <div className="font-bold text-xs text-slate-900">Active UW Assessment</div>
                             <time className="font-mono text-[9px] text-slate-500">Currently...</time>
                          </div>
                          <div className="text-slate-600 text-[10px]">Underwriter is modifying policy structure.</div>
                       </div>
                    </div>
                 </div>
              )}
            </div>
          </>
        )}
      </div>

      {/*  Bottom Dock Buttons  */}
      <footer className="fixed bottom-0 right-0 left-64 h-12 bg-slate-900 text-white flex items-center px-8 z-50">
        <div className="flex items-center gap-10">
          <button onClick={() => setActiveDockTab(activeDockTab === "NOTES" ? null : "NOTES")} className={`text-[10px] font-bold tracking-[0.1em] flex items-center gap-2 transition-colors ${activeDockTab === "NOTES" ? "text-teal-400" : "text-white opacity-60 hover:opacity-100"}`}>
            <span className="material-symbols-outlined text-sm">notes</span> UW NOTES
          </button>
          <button onClick={() => setActiveDockTab(activeDockTab === "RATIONALE" ? null : "RATIONALE")} className={`text-[10px] font-bold tracking-[0.1em] flex items-center gap-2 transition-colors ${activeDockTab === "RATIONALE" ? "text-primary" : "text-white opacity-60 hover:opacity-100"}`}>
            <span className="material-symbols-outlined text-sm">psychology</span> RATIONALE
          </button>
          <button onClick={() => setActiveDockTab(activeDockTab === "LOGS" ? null : "LOGS")} className={`text-[10px] font-bold tracking-[0.1em] flex items-center gap-2 transition-colors ${activeDockTab === "LOGS" ? "text-slate-300" : "text-white opacity-60 hover:opacity-100"}`}>
            <span className="material-symbols-outlined text-sm">terminal</span> AGENT LOGS
          </button>
          <button onClick={() => setActiveDockTab(activeDockTab === "DOCS" ? null : "DOCS")} className={`text-[10px] font-bold tracking-[0.1em] flex items-center gap-2 transition-colors ${activeDockTab === "DOCS" ? "text-amber-500" : "text-white opacity-60 hover:opacity-100"}`}>
            <span className="material-symbols-outlined text-sm">description</span> DOCUMENTS <span className={`px-1 rounded ${activeDockTab === "DOCS" ? "bg-amber-500/20" : "bg-teal-500/20 text-teal-400"}`}>4</span>
          </button>
          <button onClick={() => setActiveDockTab(activeDockTab === "FLAGS" ? null : "FLAGS")} className={`text-[10px] font-bold tracking-[0.1em] flex items-center gap-2 transition-colors ${activeDockTab === "FLAGS" ? "text-error" : "text-white opacity-60 hover:opacity-100"}`}>
            <span className="material-symbols-outlined text-sm">report</span> RED FLAGS <span className={`px-1 rounded ${activeDockTab === "FLAGS" ? "bg-error/20 text-error" : "bg-error/20 text-error"}`}>5</span>
          </button>
          <button onClick={() => setActiveDockTab(activeDockTab === "TIMELINE" ? null : "TIMELINE")} className={`text-[10px] font-bold tracking-[0.1em] flex items-center gap-2 transition-colors ${activeDockTab === "TIMELINE" ? "text-teal-400" : "text-white opacity-60 hover:opacity-100"}`}>
            <span className="material-symbols-outlined text-sm">schedule</span> TIMELINE
          </button>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <span className="text-[9px] font-mono text-slate-500">SYSTEM STATUS: OPTIMAL</span>
          <span className="material-symbols-outlined text-sm text-slate-500 cursor-pointer" onClick={() => setActiveDockTab(activeDockTab ? null : "NOTES")}>{activeDockTab ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}</span>
        </div>
      </footer>

      {/* Intelligence Deep Dive Overlay */}
      {activeDeepDive && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-12">
          <div className="bg-surface-container-lowest w-full max-w-6xl h-full rounded-2xl shadow-2xl border border-outline-variant/30 flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="px-8 py-5 border-b border-outline-variant/30 flex justify-between items-center bg-slate-50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">data_exploration</span>
                </div>
                <div>
                  <h3 className="font-headline font-black text-lg tracking-tight">{activeDeepDive.title}</h3>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest flex items-center gap-2">
                    Deep Intelligence Analysis <span className="w-1 h-1 rounded-full bg-slate-300"></span> 
                    <span className="flex items-center gap-1 text-teal-600">
                      <span className="material-symbols-outlined text-[12px]">verified</span> Source Verified
                    </span>
                  </p>
                </div>
              </div>
              <button onClick={() => setActiveDeepDive(null)} className="p-2 hover:bg-slate-200 rounded-lg text-slate-500 transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex-1 flex overflow-hidden">
              {/* Left sidebar: Page Mapping (Thumbnail Strip) */}
              <div className="w-20 border-r border-outline-variant/30 flex flex-col bg-slate-50 overflow-hidden">
                <div className="p-3 border-b border-outline-variant/20 flex flex-col items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-slate-400">map</span>
                  <span className="text-[8px] font-black text-slate-400 uppercase">Map</span>
                </div>
                <div className="flex-1 overflow-y-auto px-2 py-4 space-y-3 scrollbar-none">
                  {(activeDeepDive.pageMap || [1, 2, 3, 4, 5]).map((pg: number) => (
                    <button 
                      key={pg} 
                      className={`w-full aspect-[3/4] rounded border-2 transition-all flex flex-col items-center justify-center gap-0.5 relative group ${pg === activeDeepDive.activePage ? 'bg-white border-primary shadow-md' : 'bg-slate-100 border-slate-200 hover:border-slate-300'}`}
                    >
                      <div className={`w-full h-1/2 bg-slate-200 rounded-t-sm mb-auto ${pg === activeDeepDive.activePage ? 'bg-primary/10' : ''}`}></div>
                      <span className="text-[10px] font-bold text-slate-500">{pg}</span>
                      {activeDeepDive.activePage === pg && (
                        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-error ring-2 ring-white"></span>
                      )}
                      <div className="absolute inset-0 bg-primary/0 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Center: Document Evidence / Comparative Analysis */}
              <div className="flex-1 p-8 overflow-y-auto bg-slate-100/30">
                <div className="flex items-center justify-between mb-6">
                  <div>
                     <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Source Comparison Hub</p>
                     <div className="flex items-center gap-2">
                        <span className="text-[9px] px-2 py-0.5 bg-primary/10 text-primary border border-primary/20 rounded font-bold uppercase">{activeDeepDive.mainSource || activeDeepDive.source}</span>
                        <span className="text-[9px] text-slate-400 font-medium">Auto-Linked Analysis</span>
                     </div>
                  </div>
                  <div className="flex items-center gap-3">
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Confidence Metrics</p>
                     <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-outline-variant/30 shadow-sm">
                        <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                        <span className="text-[10px] font-black text-slate-700">{activeDeepDive.confidence}%</span>
                     </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                   {(activeDeepDive.sources || [{ name: activeDeepDive.source, page: activeDeepDive.activePage || '?', excerpt: activeDeepDive.evidence, type: 'DOC' }]).map((src: any, idx: number) => (
                      <div key={idx} className="bg-white rounded-xl border border-outline-variant/40 shadow-sm overflow-hidden flex flex-col">
                        <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                           <div className="flex items-center gap-2">
                              <span className="material-symbols-outlined text-[14px] text-slate-400">
                                 {src.type === 'AUDIT' ? 'fact_check' : src.type === 'SCAN' ? 'radar' : 'article'}
                              </span>
                              <span className="text-[10px] font-black text-slate-600 uppercase tracking-wide">{src.name}</span>
                           </div>
                           <span className="text-[9px] font-bold text-slate-400">PAGE {src.page}</span>
                        </div>
                        <div className="p-6 relative">
                           <div className={`absolute top-0 left-0 w-1 h-full ${idx === 0 ? 'bg-primary/30' : 'bg-amber-500/30'}`}></div>
                           <p className="text-sm text-slate-700 leading-relaxed italic font-serif">
                              "{src.excerpt}"
                           </p>
                        </div>
                        <div className="px-4 py-2 border-t border-slate-50 mt-auto flex items-center justify-between">
                           <div className="flex gap-1">
                              <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
                              <div className="w-1.5 h-1.5 rounded-full bg-teal-500/30"></div>
                              <div className="w-1.5 h-1.5 rounded-full bg-teal-500/30"></div>
                           </div>
                           <button className="text-[9px] font-bold text-primary hover:underline">Download Metadata</button>
                        </div>
                      </div>
                   ))}
                </div>

                {/* Evidence Hub (Reference Documents) */}
                <div className="mt-8">
                   <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Reference Document Hub</p>
                   <div className="grid grid-cols-4 gap-4">
                      {[
                        { title: 'Proposal Form', type: 'PDF', date: '2024-04-01' },
                        { title: 'IT Audit report', type: 'PDF', date: '2024-03-15' },
                        { title: 'Forensic Scan', type: 'RAW', date: '2024-04-02' },
                        { title: 'Company Wiki', type: 'HTML', date: '2021-11-20' }
                      ].map((doc, i) => (
                        <div key={i} className="bg-white p-3 rounded-xl border border-outline-variant/30 hover:shadow-md transition-all cursor-pointer group">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                 <span className="material-symbols-outlined text-[18px]">
                                    {doc.type === 'PDF' ? 'picture_as_pdf' : doc.type === 'RAW' ? 'terminal' : 'language'}
                                 </span>
                              </div>
                              <div className="flex-1 min-w-0">
                                 <p className="text-[10px] font-bold text-slate-700 truncate">{doc.title}</p>
                                 <p className="text-[8px] text-slate-400 uppercase">{doc.date}</p>
                              </div>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="mt-8 space-y-4">
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Stability & Fact Confidence</p>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border border-outline-variant/30">
                         <p className="text-[9px] text-slate-400 uppercase font-bold mb-1">OCR Stability</p>
                         <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                               <div className="bg-teal-500 h-full" style={{width: '98%'}}></div>
                            </div>
                            <span className="text-xs font-bold text-teal-600">98%</span>
                         </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-outline-variant/30">
                         <p className="text-[9px] text-slate-400 uppercase font-bold mb-1">Human-in-the-loop confidence</p>
                         <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                               <div className="bg-primary h-full" style={{width: `${activeDeepDive.confidence}%`}}></div>
                            </div>
                            <span className="text-xs font-bold text-primary">{activeDeepDive.confidence}%</span>
                         </div>
                      </div>
                   </div>
                </div>
              </div>

              {/* Right: Agent Thinking & Chat */}
              <div className="w-[450px] flex flex-col bg-white">
                <div className="flex-1 p-8 overflow-y-auto space-y-6">
                   <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Agent Reasoning Chain</p>
                      <div className="space-y-4">
                         <div className="flex gap-4">
                            <div className="w-1 h-auto bg-slate-200 rounded-full"></div>
                            <div className="flex-1 space-y-3">
                               <div className="p-3 bg-slate-50 rounded-lg text-xs leading-relaxed text-slate-600">
                                  <strong>Step 1:</strong> Entity linkage identified "Active Directory credentials" as the primary Auth mechanism for VPN block.
                               </div>
                               <div className="p-3 bg-slate-50 rounded-lg text-xs leading-relaxed text-slate-600">
                                  <strong>Step 2:</strong> Cross-referenced with Section 4.2 which requires Hardware Tokens for all admin access.
                               </div>
                               <div className="p-3 bg-teal-50 border border-teal-100 rounded-lg text-xs leading-relaxed text-teal-800">
                                  <strong>Conclusion:</strong> Mismatch confirmed. High probability of perimeter vulnerability.
                               </div>
                            </div>
                         </div>
                         {renderFeedback(activeDeepDive.title, true)}
                      </div>
                   </div>

                   <div className="border-t border-outline-variant/30 pt-6">
                      <div className="flex items-center justify-between mb-4">
                         <p className="text-[10px] font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                            <span className="material-symbols-outlined text-[14px]">psychology</span> Ask Underwriting Co-pilot
                         </p>
                         <span className="text-[8px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-black">AI ACTIVE</span>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-xl border border-primary/10 space-y-3">
                         <div className="flex gap-3">
                            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-[10px] font-bold">A</div>
                            <p className="text-xs text-slate-600 italic mt-0.5">"I've analyzed the specific snippet. Would you like me to check if this was mitigated in the later 2024 security patch notes?"</p>
                         </div>
                         <div className="flex gap-2">
                            <button className="text-[10px] bg-white border border-outline-variant/50 px-3 py-1.5 rounded-full hover:bg-primary/5 transition-colors">Yes, search 2024 notes</button>
                            <button className="text-[10px] bg-white border border-outline-variant/50 px-3 py-1.5 rounded-full hover:bg-primary/5 transition-colors">Compare with Peer risk</button>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="p-6 border-t border-outline-variant/30 bg-slate-50">
                   <div className="relative">
                      <textarea 
                        className="w-full bg-white border border-outline-variant/50 rounded-xl p-4 pr-12 text-sm focus:outline-none focus:ring-1 focus:ring-primary h-24 shadow-inner resize-none"
                        placeholder="Ask a clarifying question about this extraction..."
                      ></textarea>
                      <button className="absolute bottom-4 right-4 text-primary p-1 rounded-lg hover:bg-primary/10 transition-colors">
                         <span className="material-symbols-outlined">send</span>
                      </button>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

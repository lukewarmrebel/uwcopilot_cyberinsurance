"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Routes that should render without the AppShell chrome
const SHELL_EXCLUDED_ROUTES = ["/landing"];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Passthrough for standalone pages
  if (SHELL_EXCLUDED_ROUTES.includes(pathname)) {
    return <>{children}</>;
  }

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
          <Link className="flex items-center gap-3 px-4 py-3 bg-slate-800 text-teal-400 border-r-4 border-teal-400 transition-all duration-200 translate-x-1" href="/">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-xs font-semibold uppercase tracking-wider font-label">Dashboard</span>
          </Link>
          <a className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-900 transition-all duration-200 hover:translate-x-1" href="#">
            <span className="material-symbols-outlined">work</span>
            <span className="text-xs font-semibold uppercase tracking-wider font-label">My Cases</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-900 transition-all duration-200 hover:translate-x-1" href="#">
            <span className="material-symbols-outlined">assignment_late</span>
            <span className="text-xs font-semibold uppercase tracking-wider font-label">Referrals</span>
          </a>
          <Link className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-900 transition-all duration-200 hover:translate-x-1" href="/renewal">
            <span className="material-symbols-outlined">refresh</span>
            <span className="text-xs font-semibold uppercase tracking-wider font-label">Renewals</span>
          </Link>
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
              <p className="text-white text-sm font-semibold truncate">Alex</p>
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

        {children}

      </main>
    </div>
  );
}

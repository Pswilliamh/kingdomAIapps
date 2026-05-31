import React, { useState } from 'react';
import { 
  Lock, 
  RefreshCw, 
  Check, 
  Database,
  ArrowUpRight,
  TrendingUp,
  Cpu,
  CircleCheck,
  FileSpreadsheet
} from 'lucide-react';

export const TokenizationLedgerLayout: React.FC = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [ledgerEntries, setLedgerEntries] = useState([
    {
      txHash: "0x3f5b...b9f0",
      block: 3012952,
      asset: "Genesis App Node",
      value: "$7.00 USD",
      verifierId: "Aegis-Secure",
      status: "Committed"
    },
    {
      txHash: "0x12dc...cf21",
      block: 3012948,
      asset: "Escrow Power Escrow",
      value: "5,000 Credits",
      verifierId: "Symphony-Hub",
      status: "Committed"
    },
    {
      txHash: "0x9dfc...7b51",
      block: 3012935,
      asset: "SSL Certificate Deed",
      value: "1 Domain key",
      verifierId: "Kinetix-Verify",
      status: "Committed"
    },
    {
      txHash: "0xe64a...93ab",
      block: 3012912,
      asset: "Docker Sandbox Volume",
      value: "100% Isolated",
      verifierId: "System Shield",
      status: "Committed"
    }
  ]);

  const triggerRefresh = () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    setTimeout(() => {
      // Prepend a dummy verified block transaction
      const newBlock = ledgerEntries[0].block + Math.floor(Math.random() * 5) + 1;
      const hexChars = "0123456789abcdef";
      const randomHash = "0x" + Array.from({length: 4}, () => hexChars[Math.floor(Math.random() * 16)]).join("") + "... " + Array.from({length: 4}, () => hexChars[Math.floor(Math.random() * 16)]).join("");
      const newEntry = {
        txHash: randomHash,
        block: newBlock,
        asset: "Container Ledger Allocation",
        value: "Stable 200 OK",
        verifierId: "Aegis-I",
        status: "Committed"
      };
      setLedgerEntries(prev => [newEntry, ...prev.slice(0, 5)]);
      setIsRefreshing(false);
    }, 800);
  };

  return (
    <div id="tokenization-ledger-main" className="space-y-16 py-6 md:py-12 animate-fade-in relative z-10 text-left">
      
      {/* 1. TOKENS HERO SECTION */}
      <section className="text-center max-w-4xl mx-auto space-y-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-emerald-500/25 bg-emerald-500/10 text-emerald-400 text-xs font-semibold tracking-wide uppercase">
          <Database className="w-3.5 h-3.5 mr-0.5 animate-pulse" />
          <span>Secure Tokenized Ledger Ledger</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
          Secure Ledger Tracking.<br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-350 to-emerald-400 bg-clip-text text-transparent font-sans">
            Cryptographic Node Tables.
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-slate-400 font-normal leading-relaxed max-w-2xl mx-auto">
          Every compilation event, sandboxed database commit, and domain asset ownership deed is bound permanently to our verified secure ledger tracking structure.
        </p>
      </section>

      {/* 2. CRYPTO DATA TABLE DISPLAY */}
      <section className="max-w-5xl mx-auto">
        <div className="bg-slate-900/60 rounded-3xl border border-white/5 overflow-hidden shadow-2xl backdrop-blur-xl relative">
          {/* Accent decoration */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-500/5 blur-2xl rounded-full pointer-events-none" />

          {/* Table Toolbar controls */}
          <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Sovereign Asset Ledger</h3>
              </div>
              <p className="text-xs text-slate-450">Active verified transaction streams within isolated Cloud Run and Firebase clusters.</p>
            </div>

            <button
              onClick={triggerRefresh}
              disabled={isRefreshing}
              className="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
              <span>{isRefreshing ? "Checking Ledgers..." : "Check block states"}</span>
            </button>
          </div>

          {/* Grid Layout of Data Matrix */}
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-[11px] text-slate-300">
              <thead>
                <tr className="bg-slate-950/80 border-b border-white/5 text-slate-500 tracking-wider uppercase text-[9px] font-bold">
                  <th className="p-4 md:p-5">Tx Hash</th>
                  <th className="p-4 md:p-5">Block</th>
                  <th className="p-4 md:p-5">Asset Parameter</th>
                  <th className="p-4 md:p-5">Allocated Size</th>
                  <th className="p-4 md:p-5">Verifier node</th>
                  <th className="p-4 md:p-5 text-center">Protocol</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 bg-slate-900/10">
                {ledgerEntries.map((row, index) => (
                  <tr 
                    key={index} 
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="p-4 md:p-5 font-bold text-white flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {row.txHash}
                    </td>
                    <td className="p-4 md:p-5 text-slate-400">{row.block}</td>
                    <td className="p-4 md:p-5 font-bold text-slate-200">{row.asset}</td>
                    <td className="p-4 md:p-5 text-emerald-400 font-extrabold">{row.value}</td>
                    <td className="p-4 md:p-5 text-slate-400 flex items-center gap-1">
                      <Cpu className="w-3.5 h-3.5 text-emerald-500/50" />
                      <span>{row.verifierId}</span>
                    </td>
                    <td className="p-4 md:p-5 text-center">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-black tracking-widest uppercase">
                        <CircleCheck className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                        <span>{row.status}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-slate-950/40 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500 font-bold">
            <span className="flex items-center gap-1.5">
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-500" />
              <span>Real-time Secure Ledger verified &bull; 100% decentralized compliance</span>
            </span>
            <span>Escrow Status: Secure 200 OK</span>
          </div>

        </div>
      </section>

    </div>
  );
};

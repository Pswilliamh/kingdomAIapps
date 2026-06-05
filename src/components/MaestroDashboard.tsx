import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Copy, 
  Check, 
  Play, 
  Pause, 
  Mic, 
  Volume2, 
  BarChart2, 
  CheckSquare, 
  Layers, 
  RefreshCw,
  Plus,
  Trash2,
  Calendar,
  DollarSign,
  TrendingUp,
  Users,
  Terminal,
  Grid
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SplitWorkspace } from './SplitWorkspace';

// ==========================================
// 1. REGISTRY OF INTERACTIVE APP PREVIEWS
// ==========================================

// --- A. TEXT TO SPEECH PODCAST APP ---
const VoiceCastApp: React.FC = () => {
  const [script, setScript] = useState("Hello and welcome back. In this episode of Creator Studio, we explore the future of independent app creation. Let's dive deep...");
  const [voiceSelected, setVoiceSelected] = useState("Aura-Serene");
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState("1.0x");
  const [volume, setVolume] = useState(80);
  const [tracks, setTracks] = useState([
    { id: 1, title: "01_Introduction_Monaural.wav", duration: "02:41", status: "Ready" },
    { id: 2, title: "02_Systemic_Sovereignty.wav", duration: "11:05", status: "Draft" },
  ]);

  return (
    <div className="bg-slate-950/80 border border-violet-500/10 rounded-2xl p-6 text-white space-y-6 max-w-2xl mx-auto shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div className="flex items-center space-x-3 text-left">
          <div className="p-2.5 bg-violet-600/20 rounded-xl border border-violet-500/20 text-violet-400">
            <Mic className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight">VoiceCast Studio</h1>
            <p className="text-[11px] text-slate-400">High-fidelity voice synthesis engine</p>
          </div>
        </div>
        <span className="text-[10px] bg-violet-500/10 text-violet-300 border border-violet-500/20 px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> Aura HD Audio
        </span>
      </div>

      <div className="space-y-4 text-left">
        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
            Voice Narrator Script
          </label>
          <textarea
            value={script}
            onChange={(e) => setScript(e.target.value)}
            className="w-full h-32 bg-slate-900 border border-white/10 focus:border-violet-500/50 rounded-xl p-3 text-xs leading-relaxed text-white outline-none resize-none"
            placeholder="Type speech scripts here..."
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Voice Persona</label>
            <select
              value={voiceSelected}
              onChange={(e) => setVoiceSelected(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none cursor-pointer focus:border-violet-500/45"
            >
              <option value="Aura-Serene">Aura-Serene (Warm Podcast)</option>
              <option value="Nova-Energetic">Nova-Energetic (Upbeat AD)</option>
              <option value="Sage-Narrator">Sage-Narrator (Docu Series)</option>
              <option value="Echo-Symmetric">Echo-Symmetric (Assitant Flat)</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Play Speed</label>
            <div className="flex gap-1.5">
              {["0.8x", "1.0x", "1.2x", "1.5x"].map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`flex-1 py-2 text-center rounded-lg text-xs font-semibold border transition-all ${
                    speed === s 
                      ? 'bg-violet-600 border-violet-500 text-white' 
                      : 'bg-slate-905 bg-slate-900 border-white/5 text-slate-400 hover:text-white hover:border-white/10'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Volume & Pulsing waveform */}
        <div className="bg-slate-900/60 p-4 rounded-xl border border-white/5 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 flex items-center gap-1"><Volume2 className="w-3.5 h-3.5 text-slate-450" /> Volume: {volume}%</span>
            <span className="font-mono text-slate-500">44.1 kHz FL32</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={volume} 
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-full accent-violet-500 h-1 bg-slate-950 rounded-lg cursor-pointer"
          />

          <div className="h-10 bg-slate-950/80 rounded-lg border border-white/5 flex items-end justify-center gap-1 p-2 relative overflow-hidden">
            <div className="absolute inset-0 bg-violet-600/5 blur-md pointer-events-none" />
            {Array.from({ length: 42 }).map((_, idx) => {
              const h = isPlaying ? Math.floor(Math.random() * 28) + 4 : 4;
              return (
                <div 
                  key={idx} 
                  className="w-1 bg-gradient-to-t from-violet-600 via-indigo-500 to-fuchsia-400 rounded-full transition-all duration-150" 
                  style={{ height: `${h}px` }}
                />
              );
            })}
          </div>
        </div>

        {/* Trigger and files list */}
        <div className="flex gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex-1 bg-violet-600 hover:bg-violet-500 text-white px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-violet-600/10"
          >
            {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white" />}
            <span>{isPlaying ? "Pause Stream" : "Synthesize Voice"}</span>
          </button>
        </div>

        {/* Track Lists */}
        <div className="space-y-2 pt-2 border-t border-white/5">
          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Generated Library Archives</span>
          {tracks.map((t) => (
            <div key={t.id} className="bg-slate-950/70 p-2.5 rounded-lg border border-white/5 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300 truncate max-w-xs">{t.title}</span>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-slate-500">{t.duration}</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                  t.status === 'Ready' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-900 text-slate-400'
                }`}>{t.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- B. MODERN SAAS ANALYTICS DASHBOARD ---
const SaasDashboardApp: React.FC = () => {
  const [filterPeriod, setFilterPeriod] = useState("Last 30 Days");
  const stats = [
    { label: "Active Revenue", value: "$48,259.00", change: "+14.2%", isUp: true, icon: DollarSign, color: "text-emerald-400" },
    { label: "Creative Creators", value: "12,948", change: "+22.5%", isUp: true, icon: Users, color: "text-violet-400" },
    { label: "Completion Rate", value: "98.4%", change: "+3.1%", isUp: true, icon: TrendingUp, color: "text-amber-400" },
  ];

  return (
    <div className="bg-slate-950/80 border border-indigo-500/10 rounded-2xl p-6 text-white space-y-6 max-w-2xl mx-auto shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div className="text-left">
          <h2 className="text-base font-bold text-slate-100">Vortex Analytics Command</h2>
          <p className="text-[11px] text-slate-400">Continuous workspace monitoring metrics</p>
        </div>
        <div className="flex items-center space-x-2">
          {["7D", "30D", "12M"].map(p => (
            <button
              key={p}
              onClick={() => setFilterPeriod(p === "7D" ? "Last 7 Days" : p === "30D" ? "Last 30 Days" : "Last Year")}
              className={`px-2.5 py-1 rounded text-[10px] font-bold border transition-all cursor-pointer ${
                (p === "7D" && filterPeriod === "Last 7 Days") || (p === "30D" && filterPeriod === "Last 30 Days") || (p === "12M" && filterPeriod === "Last Year")
                  ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300' 
                  : 'bg-transparent border-white/5 text-slate-400 hover:text-white'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Stats grids */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
        {stats.map((st, i) => (
          <div key={i} className="bg-slate-900 border border-white/5 p-4 rounded-xl space-y-2 hover:border-indigo-500/20 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">{st.label}</span>
              <st.icon className={`w-3.5 h-3.5 ${st.color}`} />
            </div>
            <div>
              <span className="text-lg font-black font-mono">{st.value}</span>
              <span className="text-[9px] text-emerald-400 ml-1.5 font-bold font-mono">{st.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Vector Line Chart (Zero-dependency SVG) */}
      <div className="bg-slate-900/60 border border-white/5 p-4 rounded-xl space-y-2 text-left">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hourly Performance Blueprint</span>
        <div className="h-28 w-full border-b border-l border-white/5 py-4 relative flex items-end">
          {/* Custom SVG line */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chart-glow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25"/>
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0"/>
              </linearGradient>
            </defs>
            {/* Draw gradient area */}
            <path 
              d="M 0 80 Q 20 40 40 60 T 80 20 T 100 35 L 100 100 L 0 100 Z" 
              fill="url(#chart-glow)" 
            />
            {/* Draw line path */}
            <path 
              d="M 0 80 Q 20 40 40 60 T 80 20 T 100 35" 
              fill="none" 
              stroke="#818cf8" 
              strokeWidth="2.5" 
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex justify-between items-center px-4 pointer-events-none">
            <span className="text-[8px] text-slate-500 font-mono">03:00 UTC</span>
            <span className="text-[8px] text-slate-500 font-mono">12:00 UTC</span>
            <span className="text-[8px] text-slate-500 font-mono">18:00 UTC</span>
          </div>
        </div>
      </div>

      {/* List content dashboard table */}
      <div className="space-y-2 text-left">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-semibold">Active Transactions Stream</span>
        <div className="space-y-1.5 font-mono text-[11px]">
          {[
            { tag: "API_GATEWAY", user: "Client_Aura_9", amount: "+$12.50", st: "SECURE" },
            { tag: "SSL_VERIFIER", user: "Client_Echo_v", amount: "+$8.00", st: "VERIFIED" },
          ].map((tx, idx) => (
            <div key={idx} className="bg-slate-950/40 p-2.5 rounded-lg border border-white/5 flex items-center justify-between">
              <span className="font-semibold text-slate-350">{tx.tag}</span>
              <span className="text-slate-500">{tx.user}</span>
              <div className="flex items-center gap-3">
                <span className="text-emerald-400 font-bold">{tx.amount}</span>
                <span className="text-[8px] bg-indigo-500/10 text-indigo-300 font-bold border border-indigo-500/20 px-1.5 py-0.5 rounded font-sans">{tx.st}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- C. DYNAMIC TASK PLANNER / Checklist APP ---
const PulseTaskApp: React.FC = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Design clean creative workspace components", category: "Design", done: true },
    { id: 2, text: "Hook reactive states together for code copiers", category: "Core App", done: false },
    { id: 3, text: "Deliver pristine visual output immediately on first turn", category: "Delivery", done: false }
  ]);
  const [newInput, setNewInput] = useState('');
  const [catSelected, setCatSelected] = useState('Design');

  const handleAddTask = () => {
    if (!newInput.trim()) return;
    setTasks(prev => [
      ...prev,
      {
        id: Date.now(),
        text: newInput.trim(),
        category: catSelected,
        done: false
      }
    ]);
    setNewInput('');
  };

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const removeTask = (id: number) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="bg-slate-950/80 border border-amber-500/10 rounded-2xl p-6 text-white space-y-6 max-w-2xl mx-auto shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div className="text-left">
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-1.5">
            <CheckSquare className="w-4 h-4 text-amber-500" /> Pulse Planner
          </h2>
          <p className="text-[11px] text-slate-400">Bespoke modular task management</p>
        </div>
        <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full font-bold">
          {tasks.filter(t => !t.done).length} Remaining
        </span>
      </div>

      {/* Input controls */}
      <div className="flex flex-col sm:flex-row gap-2">
        <input 
          type="text"
          value={newInput}
          onChange={(e) => setNewInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleAddTask(); }}
          placeholder="New milestone item..."
          className="flex-1 bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-505 placeholder-slate-500 outline-none"
        />
        <select
          value={catSelected}
          onChange={(e) => setCatSelected(e.target.value)}
          className="bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-300 outline-none"
        >
          <option value="Design">Design</option>
          <option value="Core App">Core App</option>
          <option value="Delivery">Delivery</option>
        </select>
        <button
          onClick={handleAddTask}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs tracking-wider uppercase transition-colors"
        >
          Add Item
        </button>
      </div>

      {/* Tasks listing area */}
      <div className="space-y-2 text-left">
        {tasks.map((t) => (
          <div key={t.id} className="bg-slate-900/45 p-3 rounded-xl border border-white/5 flex items-center justify-between group transition-all">
            <div className="flex items-center space-x-3 text-xs">
              <button 
                onClick={() => toggleTask(t.id)}
                className={`w-4 h-4 rounded border flex items-center justify-center transition-all cursor-pointer ${
                  t.done ? 'bg-amber-500 border-amber-500 text-slate-950' : 'border-white/20 hover:border-white/40'
                }`}
              >
                {t.done && <Check className="w-3 h-3 text-slate-950" />}
              </button>
              <span className={`transition-all ${t.done ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                {t.text}
              </span>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-[9px] font-semibold bg-slate-950 px-2 py-0.5 border border-white/5 text-slate-400 rounded-md font-mono">
                {t.category}
              </span>
              <button 
                onClick={() => removeTask(t.id)}
                className="text-slate-500 hover:text-red-400 opacity-60 hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- D. PRODUCT SHOWCASE / INFINITY PORTFOLIO APP ---
const InfinityShowcaseApp: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState(1);
  const items = [
    { id: 1, name: "Sovereign Web Space", price: "$120/mo", detail: "Fully isolated Docker partitions with built-in Reverse proxies and customizable subdomains.", icon: Layers },
    { id: 2, name: "Aura Audio Processor", price: "$45/mo", detail: "Narrate dynamic text scripts into highly immersive voice streams via customizable vocal nodes.", icon: Mic },
    { id: 3, name: "Aegis Ingress Protect", price: "$80/mo", detail: "Cryptographically lock domain signatures against malicious external interference easily.", icon: Grid },
  ];

  return (
    <div className="bg-slate-950/80 border border-violet-500/10 rounded-2xl p-6 text-white space-y-6 max-w-2xl mx-auto shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div className="text-left">
          <h2 className="text-base font-bold text-slate-100">Bespoke Digital Showcase</h2>
          <p className="text-[11px] text-slate-400 font-sans">High-density modern bento presentation</p>
        </div>
        <span className="text-[9px] font-bold text-violet-400 uppercase tracking-widest bg-violet-600/10 border border-violet-500/20 px-2 py-0.5 rounded-full">
          Featured
        </span>
      </div>

      {/* Selection row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {items.map((it) => {
          const Icon = it.icon;
          return (
            <button
              key={it.id}
              onClick={() => setSelectedProduct(it.id)}
              className={`p-4 rounded-xl border text-left transition-all ${
                selectedProduct === it.id 
                  ? 'bg-violet-600/25 border-violet-500 text-white shadow-lg' 
                  : 'bg-slate-900 border-white/5 text-slate-450 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5 text-violet-400 mb-2" />
              <h3 className="text-xs font-bold font-sans tracking-wide block">{it.name}</h3>
              <p className="text-[11px] text-slate-500 font-mono mt-0.5">{it.price}</p>
            </button>
          )
        })}
      </div>

      {/* Focused details */}
      {(() => {
        const product = items.find(i => i.id === selectedProduct) || items[0];
        const ActiveIcon = product.icon;
        return (
          <div className="p-5 bg-slate-905 bg-slate-900/60 border border-white/5 rounded-xl text-left space-y-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-violet-600/5 blur-2xl rounded-full" />
            <div className="flex items-center space-x-2 text-violet-300">
              <ActiveIcon className="w-4 h-4 text-violet-400" />
              <span className="text-xs font-bold uppercase tracking-wider font-sans">{product.name} Description</span>
            </div>
            <p className="text-xs text-slate-350 leading-relaxed font-sans">{product.detail}</p>
            <button className="w-full sm:w-auto bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold px-4 py-2 rounded-lg gap-1.5 inline-flex items-center justify-center transition-colors">
              <span>Request Customization</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        );
      })()}
    </div>
  );
};


// ==========================================
// 2. CORRESPONDING RAW SOURCE CODE STRINGS
// ==========================================
const codeTemplates: Record<string, string> = {
  audio: `import React, { useState } from 'react';
import { Mic, Volume2, Play, Pause, Sparkles, Disc } from 'lucide-react';

export default function VoiceCastApp() {
  const [script, setScript] = useState("Hello and welcome back. Let's explore the future of independent app creation...");
  const [voiceSelected, setVoiceSelected] = useState("Aura-Serene");
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);

  return (
    <div className="max-w-2xl mx-auto bg-slate-950 text-white rounded-3xl p-6 border border-violet-500/10 shadow-2xl space-y-6">
      <div className="flex items-center justify-between border-b border-light-alpha/5 pb-4">
        <h1 className="text-base font-bold tracking-tight">VoiceCast Studio</h1>
        <span className="text-xs bg-violet-600/20 px-3 py-1 rounded-full text-violet-300 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" /> High Fidelity
        </span>
      </div>

      <textarea
        value={script}
        onChange={(e) => setScript(e.target.value)}
        className="w-full h-32 bg-slate-900 border border-white/10 rounded-2xl p-4 text-xs text-white focus:border-violet-500 outline-none leading-relaxed"
      />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase block mb-1">Voice Persona</label>
          <select
            value={voiceSelected}
            onChange={(e) => setVoiceSelected(e.target.value)}
            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-200"
          >
            <option value="Aura-Serene">Aura-Serene</option>
            <option value="Nova-Energetic">Nova-Energetic</option>
            <option value="Sage-Narrator">Sage-Narrator</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase block mb-1">Volume</label>
          <input type="range" className="w-full accent-violet-500" value={volume} onChange={e => setVolume(Number(e.target.value))} />
        </div>
      </div>

      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="w-full bg-violet-600 hover:bg-violet-500 text-white py-3 rounded-xl font-bold font-sans text-xs uppercase"
      >
        {isPlaying ? 'Pause' : 'Synthesize Voice'}
      </button>
    </div>
  );
}`,
  dashboard: `import React, { useState } from 'react';
import { DollarSign, Users, TrendingUp, ArrowUpRight } from 'lucide-react';

export default function AnalyticsDashboard() {
  const stats = [
    { label: "Revenue", value: "$48,259.00", change: "+14.2%" },
    { label: "Creators", value: "12,948", change: "+22.5%" },
    { label: "Rate", value: "98.4%", change: "+3.1%" }
  ];

  return (
    <div className="bg-slate-950 p-6 rounded-3xl border border-indigo-500/10 text-white space-y-6">
      <h2 className="text-base font-bold text-slate-100">Analytics Monitoring Command</h2>
      
      <div className="grid grid-cols-3 gap-4">
        {stats.map((st, i) => (
          <div key={i} className="bg-slate-900 p-4 rounded-xl border border-white/5">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">{st.label}</span>
            <span className="text-lg font-black font-semibold block">{st.value}</span>
            <span className="text-[9px] text-emerald-400">{st.change}</span>
          </div>
        ))}
      </div>
    </div>
  );
}`,
  todo: `import React, { useState } from 'react';
import { Check, Trash2, CheckSquare } from 'lucide-react';

export default function AppTodoList() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Design clean creative workspace", category: "Design", done: true },
    { id: 2, text: "Hook reactive states together for code copiers", category: "Core App", done: false }
  ]);
  const [newInput, setNewInput] = useState('');

  const handleAdd = () => {
    if (!newInput.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newInput, category: "Core App", done: false }]);
    setNewInput('');
  };

  return (
    <div className="bg-slate-950 p-6 rounded-3xl border border-amber-500/10 text-white space-y-4">
      <h2 className="text-base font-bold text-slate-100 flex items-center gap-1.5">
        <CheckSquare className="w-4 h-4 text-amber-500" /> Pulse Planner
      </h2>

      <div className="flex gap-2">
        <input 
          type="text"
          value={newInput}
          onChange={e => setNewInput(e.target.value)}
          placeholder="New task item..."
          className="flex-1 bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
        />
        <button onClick={handleAdd} className="px-4 py-2 bg-amber-500 text-slate-950 text-xs font-bold rounded-lg uppercase">Add</button>
      </div>

      <div className="space-y-2">
        {tasks.map(t => (
          <div key={t.id} className="bg-slate-900 p-3 rounded-xl border border-white/5 flex items-center justify-between">
            <span className={t.done ? "line-through text-slate-500 text-xs" : "text-xs text-slate-200"}>{t.text}</span>
            <button onClick={() => setTasks(tasks.filter(tk => tk.id !== t.id))} className="text-slate-500 hover:text-red-400">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}`,
  showcase: `import React, { useState } from 'react';
import { Layers, ArrowRight } from 'lucide-react';

export default function ProductCard() {
  return (
    <div className="bg-slate-950 p-6 rounded-3xl border border-violet-500/10 text-white space-y-4">
      <h2 className="text-base font-bold text-slate-100">Bespoke Product Showcase</h2>
      <div className="bg-slate-900 border border-white/5 p-5 rounded-xl">
        <h3 className="text-xs font-bold uppercase tracking-wider text-violet-300">Sovereign Web Space Layout</h3>
        <p className="text-xs text-slate-400 mt-2">Fully isolated Docker partitions with built-in Reverse proxies and customizable subdomains.</p>
        <button className="bg-violet-600 hover:bg-violet-500 text-white text-xs px-4 py-2 rounded-lg mt-4 flex items-center gap-1.5">
          <span>Proceed</span> <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}`
};

const IframeRunner: React.FC<{ code: string }> = ({ code }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!iframeRef.current) return;

    let parsedCode = code;

    // Filter imports out so Babel Standalone compiles without es-modules loading errors
    parsedCode = parsedCode.replace(/import\s+React[^{]*from\s+['"]react['"];?/g, '');
    parsedCode = parsedCode.replace(/import\s+{[^}]+}\s+from\s+['"]react['"];?/g, '');
    
    // Convert lucide-react imports to destructuring from standard Lucide global
    const lucideImportRegex = /import\s+{([^}]+)}\s+from\s+['"](lucide-react|lucide)['"];?/g;
    let match;
    const importedIcons = new Set<string>();
    while ((match = lucideImportRegex.exec(parsedCode)) !== null) {
      match[1].split(',').forEach(name => {
        const trimmed = name.trim();
        if (trimmed && !trimmed.includes(' as ')) {
          importedIcons.add(trimmed);
        } else if (trimmed && trimmed.includes(' as ')) {
          const parts = trimmed.split(/\s+as\s+/);
          if (parts[0].trim()) importedIcons.add(parts[0].trim());
        }
      });
    }
    parsedCode = parsedCode.replace(lucideImportRegex, '');

    // Replace standard export statements
    parsedCode = parsedCode.replace(/export\s+default\s+function\s+([a-zA-Z0-9_]+)/g, 'function $1');
    parsedCode = parsedCode.replace(/export\s+default\s+class\s+([a-zA-Z0-9_]+)/g, 'class $1');
    parsedCode = parsedCode.replace(/export\s+const\s+([a-zA-Z0-9_]+)/g, 'const $1');
    parsedCode = parsedCode.replace(/export\s+default\s+[a-zA-Z0-9_]+;?/g, '');

    // Setup variable declaration for mapped Lucide icons
    let lucideDeclarations = '';
    if (importedIcons.size > 0) {
      lucideDeclarations = `const { ${Array.from(importedIcons).join(', ')} } = Lucide;`;
    } else {
      lucideDeclarations = `const { Sparkles, Play, Pause, Volume2, Mic, Check, CheckSquare, Trash2, ArrowRight } = Lucide;`;
    }

    const srcDocContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <script src="https://unpkg.com/lucide-react@latest/dist/umd/lucide-react.min.js"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
            mono: ['JetBrains Mono', 'monospace'],
          },
        },
      },
    }
  </script>
  <style>
    body {
      background-color: transparent;
      color: #f8fafc;
      font-family: 'Inter', sans-serif;
      margin: 0;
      padding: 0;
    }
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.12);
      border-radius: 99px;
    }
  </style>
</head>
<body class="bg-slate-950 p-4 text-slate-100 min-h-[480px]">
  <div id="mount-root"></div>
  
  <div id="error-console" class="hidden p-6 bg-red-950/50 border border-red-500/20 rounded-2xl text-red-300 font-mono text-xs m-4">
    <div class="flex items-center gap-2 text-red-400 font-bold uppercase tracking-wider text-[10px] mb-2">
      <span class="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
      <span>Runtime Compilation Error</span>
    </div>
    <pre id="error-message" class="whitespace-pre-wrap font-mono leading-relaxed text-red-200"></pre>
  </div>

  <script type="text/babel">
    try {
      const { useState, useEffect, useRef, useMemo, useCallback } = React;
      
      const Lucide = window.LucideReact || window.Lucide;
      if (!Lucide) {
        throw new Error("Lucide Icons engine failed to bootstrap in the runtime container.");
      }
      
      ${lucideDeclarations}

      ${parsedCode}

      let Target = null;
      if (typeof App !== 'undefined') {
        Target = App;
      } else if (typeof VoiceCastApp !== 'undefined') {
        Target = VoiceCastApp;
      } else if (typeof AnalyticsDashboard !== 'undefined') {
        Target = AnalyticsDashboard;
      } else if (typeof AppTodoList !== 'undefined') {
        Target = AppTodoList;
      } else if (typeof ProductCard !== 'undefined') {
        Target = ProductCard;
      }
      
      if (!Target) {
        const keys = Object.keys(window).filter(k => 
          k[0] === k[0].toUpperCase() && 
          typeof window[k] === 'function' && 
          k !== 'React' && k !== 'ReactDOM' && k !== 'Lucide' && k !== 'LucideReact'
        );
        if (keys.length > 0) {
          Target = window[keys[0]];
        }
      }

      if (Target) {
        const root = ReactDOM.createRoot(document.getElementById('mount-root'));
        root.render(<Target />);
      } else {
        throw new Error("Could not find a valid React component function in the generated script.");
      }
    } catch (err) {
      console.error(err);
      document.getElementById('error-console').classList.remove('hidden');
      document.getElementById('error-message').textContent = err.toString();
    }
  </script>
</body>
</html>
`;

    iframeRef.current.srcdoc = srcDocContent;
  }, [code]);

  return (
    <div className="w-full h-[520px] bg-slate-950 rounded-2xl overflow-hidden border border-white/5 relative">
      <iframe
        ref={iframeRef}
        title="Live Interactive Sandboxed Preview"
        className="w-full h-full border-none bg-slate-950"
        sandbox="allow-scripts"
      />
    </div>
  );
};

interface MaestroDashboardProps {
  initialEstateName: string;
}

export const MaestroDashboard: React.FC<MaestroDashboardProps> = () => {
  return (
    <div id="maestro-clean-main" className="max-w-7xl mx-auto py-8 md:py-16 space-y-12 text-center relative z-10 animate-fade-in font-sans">
      
      {/* 1. CENTRAL SPACIOUS PORTAL HERO */}
      <div className="space-y-4 max-w-2xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
          What Does Your <span className="bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 bg-clip-text text-transparent italic">Soul</span> See?
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 uppercase tracking-widest font-black flex items-center justify-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>Automated Architecture Gateway</span>
        </p>
      </div>

      {/* 2. SPLIT WORKSPACE: CHAT & LIVE PREVIEW STAGE */}
      <SplitWorkspace />

    </div>
  );
};

const _deprecated_MaestroDashboard: React.FC<MaestroDashboardProps> = () => {
  const [promptValue, setPromptValue] = useState('');
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [generatedKey, setGeneratedKey] = useState<string | null>(null); // 'audio' | 'dashboard' | 'todo' | 'showcase' | 'custom'
  const [copied, setCopied] = useState(false);
  const [isSynthesizing, setIsSynthesizing] = useState(false);

  // Custom AI Dynamic States
  const [customAppName, setCustomAppName] = useState('');
  const [customExplanation, setCustomExplanation] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [generationError, setGenerationError] = useState<string | null>(null);

  const predefinedSuggests = [
    { label: "Voice Narrator App", icon: Mic, key: "audio" },
    { label: "Clean SaaS Analytics", icon: BarChart2, key: "dashboard" },
    { label: "Todo Checklist Planner", icon: CheckSquare, key: "todo" },
    { label: "Creative Bento Portfolio", icon: Layers, key: "showcase" }
  ];

  const handleGenerate = (key: string) => {
    setIsSynthesizing(true);
    setGeneratedKey(null);
    setCopied(false);
    setGenerationError(null);
    
    setTimeout(() => {
      setIsSynthesizing(false);
      setGeneratedKey(key);
    }, 450);
  };

  const handleTextSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const prompt = promptValue.trim();
    if (!prompt) return;

    setIsSynthesizing(true);
    setGeneratedKey(null);
    setGenerationError(null);
    setCopied(false);
    
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to process layout template. Server returned status code ${response.status}`);
      }

      const data = await response.json();
      setCustomAppName(data.appName || "Interactive Blueprint");
      setCustomExplanation(data.explanation || "Your intelligent design layout successfully compiled.");
      setCustomCode(data.code || "");
      setGeneratedKey("custom");
      setActiveTab("preview");
      setPromptValue('');
    } catch (err: any) {
      console.error(err);
      setGenerationError(err?.message || "An error occurred while compiling your design blueprint.");
    } finally {
      setIsSynthesizing(false);
    }
  };

  const handleCopyCode = () => {
    if (!generatedKey) return;
    const code = generatedKey === 'custom' ? customCode : (codeTemplates[generatedKey] || "");
    try {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div id="maestro-clean-main" className="max-w-4xl mx-auto py-8 md:py-16 space-y-12 text-center relative z-10 animate-fade-in font-sans">
      
      {/* 1. CENTRAL SPACIOUS PORTAL HERO */}
      <div className="space-y-4 max-w-2xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
          What Does Your <span className="bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 bg-clip-text text-transparent italic">Soul</span> See?
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 uppercase tracking-widest font-black flex items-center justify-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>Automated Architecture Gateway</span>
        </p>
      </div>

      {/* 2. SINGLE CENTERED INPUT CAPSULE */}
      <form onSubmit={handleTextSubmit} className="max-w-xl mx-auto">
        <div className="group relative rounded-full bg-slate-900/80 border border-slate-850 hover:border-amber-400 focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-400/20 px-6 py-4 flex items-center transition-all shadow-xl shadow-black/40">
          
          <input
            type="text"
            value={promptValue}
            onChange={(e) => setPromptValue(e.target.value)}
            placeholder="Type your design vision (e.g. podcast studio app, saas dashboard)..."
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none pr-4 font-normal"
          />
          
          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-2.5 rounded-full text-xs uppercase tracking-widest flex items-center gap-1.5 transition-all shrink-0 cursor-pointer shadow-md"
          >
            <span>Launch Blueprint ➔</span>
          </button>
        </div>

        {/* Suggestion tags underneath */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          <span className="text-[10px] text-slate-500 font-mono font-bold uppercase mr-1">Directives:</span>
          {predefinedSuggests.map((s) => {
            const Icon = s.icon;
            return (
              <button
                key={s.key}
                type="button"
                onClick={() => handleGenerate(s.key)}
                className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full border border-white/5 bg-slate-900 hover:bg-slate-950 hover:border-amber-500/20 text-[10px] text-slate-400 hover:text-amber-300 transition-all cursor-pointer font-medium"
              >
                <Icon className="w-3 h-3 text-slate-500" />
                <span>{s.label}</span>
              </button>
            )
          })}
        </div>
      </form>

      {/* 3. READY TO COPY ASSET VIEWER */}
      <div className="max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          {isSynthesizing && (
            <motion.div
              key="loader"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="p-12 text-center bg-slate-900/30 border border-white/5 rounded-3xl backdrop-blur-md flex flex-col items-center justify-center space-y-4"
            >
              <div className="w-10 h-10 rounded-full border-2 border-t-amber-400 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
              <div className="space-y-1">
                <p className="text-xs font-bold text-amber-400 tracking-widest uppercase font-mono">Synthesizing Creative Blueprint...</p>
                <p className="text-[10px] text-slate-500">Assembling standalone interactive component layout</p>
              </div>
            </motion.div>
          )}

          {generationError && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-red-950/25 border border-red-500/20 rounded-3xl m-4 text-left max-w-2xl mx-auto space-y-2 font-mono text-xs shadow-xl"
            >
              <div className="flex items-center gap-2 text-red-500 font-bold uppercase tracking-wider text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                <span>AI Blueprint Generation Failed</span>
              </div>
              <p className="font-sans text-slate-300 text-xs font-semibold">{generationError}</p>
            </motion.div>
          )}

          {!isSynthesizing && generatedKey && (
            <motion.div
              key="viewer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900/30 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-md shadow-2xl space-y-4"
            >
              {/* Header Tabs */}
              <div className="bg-slate-950 px-6 py-4 border-b border-light-alpha/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-left">
                  <div className="flex gap-4">
                    <button
                      onClick={() => setActiveTab('preview')}
                      className={`text-xs font-bold uppercase tracking-wider pb-1.5 border-b-2 transition-all cursor-pointer ${
                        activeTab === 'preview' 
                          ? 'border-amber-400 text-white' 
                          : 'border-transparent text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      Interactive Live Component
                    </button>
                    <button
                      onClick={() => setActiveTab('code')}
                      className={`text-xs font-bold uppercase tracking-wider pb-1.5 border-b-2 transition-all cursor-pointer ${
                        activeTab === 'code' 
                          ? 'border-amber-400 text-white' 
                          : 'border-transparent text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      TSX Code Block
                    </button>
                  </div>
                  {generatedKey === 'custom' && (
                    <span className="text-[10px] bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold font-mono px-2 py-0.5 rounded-full uppercase">
                      {customAppName}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center space-x-1.5 bg-slate-900 border border-white/10 hover:border-amber-500/35 px-4 py-2 rounded-xl text-xs font-bold text-slate-350 hover:text-white transition-all cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400 animate-bounce" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied Workspace!" : "Copy Clean Code"}</span>
                  </button>
                </div>
              </div>

              {/* Tabs Body */}
              <div className="p-6">
                {activeTab === 'preview' ? (
                  <div className="p-2 sm:p-4 bg-slate-950/40 border border-white/5 rounded-2xl">
                    {generatedKey === 'audio' && <VoiceCastApp />}
                    {generatedKey === 'dashboard' && <SaasDashboardApp />}
                    {generatedKey === 'todo' && <PulseTaskApp />}
                    {generatedKey === 'showcase' && <InfinityShowcaseApp />}
                    {generatedKey === 'custom' && <IframeRunner code={customCode} />}
                  </div>
                ) : (
                  <div className="bg-slate-950 border border-white/5 rounded-2xl p-4 text-left relative group">
                    <pre className="text-[11px] text-amber-300 overflow-x-auto max-h-96 scrollbar-thin scrollbar-thumb-white/15 scrollbar-track-transparent pr-4 select-all leading-relaxed font-mono">
                      <code>{generatedKey === 'custom' ? customCode : codeTemplates[generatedKey]}</code>
                    </pre>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
};

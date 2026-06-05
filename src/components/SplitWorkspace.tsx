import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Copy, 
  Check, 
  Mic, 
  Play, 
  Pause, 
  Volume2, 
  BarChart2, 
  CheckSquare, 
  Layers, 
  Send,
  Code,
  Layout,
  MessageSquare,
  AlertTriangle,
  Flame
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// ==========================================
// PRESETS: PRE-BUILT DEMO APP DEFINITIONS
// ==========================================

const VoiceCastApp: React.FC = () => {
  const [script, setScript] = useState("Hello and welcome back. In this episode of Creator Studio, we explore the future of independent app creation. Let's dive deep...");
  const [voiceSelected, setVoiceSelected] = useState("Aura-Serene");
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState("1.0x");
  const [volume, setVolume] = useState(80);
  const [tracks] = useState([
    { id: 1, title: "01_Introduction_Monaural.wav", duration: "02:41", status: "Ready" },
    { id: 2, title: "02_Systemic_Sovereignty.wav", duration: "11:05", status: "Draft" },
  ]);

  return (
    <div className="bg-slate-950/80 border border-violet-500/10 rounded-2xl p-6 text-white space-y-6 max-w-full mx-auto shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div className="flex items-center space-x-3 text-left">
          <div className="p-2 bg-violet-600/20 rounded-xl border border-violet-500/20 text-violet-400">
            <Mic className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight">VoiceCast Studio</h1>
            <p className="text-[10px] text-slate-400">High-fidelity voice synthesis engine</p>
          </div>
        </div>
        <span className="text-[9px] bg-violet-500/10 text-violet-300 border border-violet-500/20 px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
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
            className="w-full h-24 bg-slate-900 border border-white/10 focus:border-violet-500/50 rounded-xl p-3 text-xs leading-relaxed text-white outline-none resize-none font-sans"
            placeholder="Type speech scripts here..."
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Voice Persona</label>
            <select
              value={voiceSelected}
              onChange={(e) => setVoiceSelected(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-2.5 py-2 text-xs text-slate-200 outline-none cursor-pointer focus:border-violet-500/45 font-sans"
            >
              <option value="Aura-Serene">Aura-Serene (Warm Podcast)</option>
              <option value="Nova-Energetic">Nova-Energetic (Upbeat AD)</option>
              <option value="Sage-Narrator">Sage-Narrator (Docu Series)</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Play Speed</label>
            <div className="flex gap-1">
              {["1.0x", "1.2x", "1.5x"].map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`flex-1 py-2 text-center rounded-lg text-[10px] font-bold border transition-all ${
                    speed === s 
                      ? 'bg-violet-600 border-violet-500 text-white' 
                      : 'bg-slate-900 border-white/5 text-slate-400 hover:text-slate-250'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-slate-900/60 p-3 rounded-xl border border-white/5 space-y-2">
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-slate-400 flex items-center gap-1"><Volume2 className="w-3.5 h-3.5" /> Volume: {volume}%</span>
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

          <div className="h-8 bg-slate-950/80 rounded-lg border border-white/5 flex items-end justify-center gap-0.5 p-1 relative overflow-hidden">
            <div className="absolute inset-0 bg-violet-600/5 blur-md" />
            {Array.from({ length: 36 }).map((_, idx) => {
              const h = isPlaying ? Math.floor(Math.random() * 20) + 2 : 2;
              return (
                <div 
                  key={idx} 
                  className="w-1 bg-gradient-to-t from-violet-600 via-indigo-505 to-fuchsia-400 rounded-full transition-all duration-150" 
                  style={{ height: `${h}px` }}
                />
              );
            })}
          </div>
        </div>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-full bg-violet-600 hover:bg-violet-500 text-white px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-lg font-sans"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          <span>{isPlaying ? "Pause Stream" : "Synthesize Voice"}</span>
        </button>
      </div>
    </div>
  );
};

const SaasDashboardApp: React.FC = () => {
  return (
    <div className="bg-slate-950 border border-indigo-500/10 rounded-2xl p-6 text-white space-y-5 max-w-full mx-auto shadow-2xl text-left">
      <div>
        <h2 className="text-sm font-bold text-slate-100">Vortex Analytics Workspace</h2>
        <p className="text-[10px] text-slate-400">Instant metrics layout parsed dynamically on first turn.</p>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        {[
          { l: "Revenue", v: "$48,259.00", c: "+14.2%" },
          { l: "Creators", v: "12,948", c: "+22.5%" },
          { l: "Delivery", v: "98.4%", c: "+3.1%" }
        ].map((st, i) => (
          <div key={i} className="bg-slate-900 p-3 rounded-lg border border-white/5">
            <span className="text-[9px] text-slate-400 uppercase tracking-wider block">{st.l}</span>
            <span className="text-xs font-black font-mono block mt-1">{st.v}</span>
            <span className="text-[9px] text-emerald-400 font-bold">{st.c}</span>
          </div>
        ))}
      </div>

      <div className="p-3 bg-slate-900 rounded-lg border border-white/5">
        <span className="text-[9px] text-indigo-400 uppercase font-bold tracking-widest block mb-2">Real Estate Bandwidth Utilization</span>
        <div className="flex items-end justify-between gap-1 h-20 pt-2">
          {[40, 60, 45, 80, 55, 90, 75, 95, 85, 100].map((h, i) => (
            <div key={i} className="flex-1 bg-indigo-500/20 rounded-t overflow-hidden relative">
              <div 
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-indigo-650 to-violet-500 rounded-t" 
                style={{ height: `${h}%` }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PulseTaskApp: React.FC = () => {
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

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="bg-slate-950 p-5 rounded-2xl border border-amber-500/10 text-white space-y-4 max-w-full mx-auto text-left">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5 font-mono">
          <CheckSquare className="w-4 h-4 text-amber-500" /> Pulse Planner
        </h2>
        <span className="text-[9px] bg-slate-900 px-2 py-0.5 rounded text-slate-500">{tasks.filter(t => !t.done).length} active</span>
      </div>
      
      <div className="flex gap-2">
        <input 
          type="text"
          value={newInput}
          onChange={e => setNewInput(e.target.value)}
          placeholder="New task item..."
          className="flex-1 bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-amber-500/50"
        />
        <button onClick={handleAdd} className="px-3 py-1.5 bg-amber-500 text-slate-950 text-[10px] font-black rounded-lg uppercase tracking-wider font-sans">Add</button>
      </div>
      
      <div className="space-y-1.5 max-h-48 overflow-y-auto">
        {tasks.map(t => (
          <div key={t.id} className="bg-slate-900 p-2.5 rounded-lg border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => toggleTask(t.id)}>
              <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-all ${
                t.done ? 'bg-amber-500 border-amber-500' : 'border-white/20 hover:border-amber-400/50'
              }`}>
                {t.done && <Check className="w-2.5 h-2.5 text-slate-950 stroke-[3]" />}
              </div>
              <span className={`text-xs ${t.done ? "line-through text-slate-500" : "text-slate-200"}`}>{t.text}</span>
            </div>
            <button onClick={() => removeTask(t.id)} className="text-slate-500 hover:text-rose-400 transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const InfinityShowcaseApp: React.FC = () => {
  return (
    <div className="bg-slate-950 p-6 rounded-2xl border border-violet-500/10 text-white space-y-4 max-w-full mx-auto text-left">
      <div className="flex items-center gap-1.5 text-violet-400 text-xs font-mono uppercase tracking-widest font-black">
        <Layers className="w-4 h-4" /> Portfolio Showcase
      </div>
      <h3 className="text-sm font-bold text-white">Sovereign Web Space Layout</h3>
      <p className="text-xs text-slate-400">Fully isolated Docker partitions with built-in Reverse proxies and customizable subdomains.</p>
      
      <div className="p-4 bg-slate-900 border border-white/5 rounded-xl space-y-2">
        <span className="text-[9px] bg-indigo-500/10 text-indigo-300 font-bold uppercase py-0.5 px-2 rounded-full border border-indigo-400/20">Microservice Node</span>
        <p className="text-[11px] text-slate-350 leading-relaxed font-sans">
          Orchestrate clean dynamic frontend outputs securely on custom hostnames with Zero Configuration setup required.
        </p>
      </div>
    </div>
  );
};

// ==========================================
// CODE TEMPLATES USED FOR COPY CODE TABS
// ==========================================
const codeTemplates: Record<string, string> = {
  audio: `import React, { useState } from 'react';
import { Mic, Volume2, Play, Pause, Sparkles } from 'lucide-react';

export default function VoiceCastApp() {
  const [script, setScript] = useState("Hello and welcome back. In this episode of Creator Studio, we explore the future of independent app creation. Let's dive deep...");
  const [voiceSelected, setVoiceSelected] = useState("Aura-Serene");
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState("1.0x");
  const [volume, setVolume] = useState(80);

  return (
    <div className="max-w-2xl mx-auto bg-slate-950 text-white rounded-3xl p-6 border border-violet-500/10 shadow-2xl space-y-6">
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <h1 className="text-sm font-bold tracking-tight">VoiceCast Studio</h1>
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
          </select>
        </div>
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase block mb-1">Volume</label>
          <input type="range" className="w-full accent-violet-500" value={volume} onChange={e => setVolume(Number(e.target.value))} />
        </div>
      </div>

      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="w-full bg-violet-600 hover:bg-violet-500 text-white py-3 rounded-xl font-bold text-xs uppercase"
      >
        {isPlaying ? 'Pause Stream' : 'Synthesize Voice'}
      </button>
    </div>
  );
}`,
  dashboard: `import React from 'react';
import { DollarSign, Users, TrendingUp } from 'lucide-react';

export default function AnalyticsDashboard() {
  const stats = [
    { label: "Revenue", value: "$48,259.00", change: "+14.2%" },
    { label: "Creators", value: "12,948", change: "+22.5%" },
    { label: "Rate", value: "98.4%", change: "+3.1%" }
  ];

  return (
    <div className="bg-slate-950 p-6 rounded-3xl border border-indigo-500/10 text-white space-y-6">
      <h2 className="text-base font-bold text-slate-100">Analytics Monitoring Workspace</h2>
      <div className="grid grid-cols-3 gap-4">
        {stats.map((st, i) => (
          <div key={i} className="bg-slate-900 p-4 rounded-xl border border-white/5">
            <span className="text-[10px] text-slate-400 uppercase block">{st.label}</span>
            <span className="text-lg font-black block">{st.value}</span>
            <span className="text-[9px] text-emerald-400">{st.change}</span>
          </div>
        ))}
      </div>
    </div>
  );
}`,
  todo: `import React, { useState } from 'react';
import { Check, CheckSquare } from 'lucide-react';

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
      <h2 className="text-base font-bold text-slate-100 flex items-center gap-1.5"><CheckSquare /> Pulse Planner</h2>
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
    </div>
  );
}`,
  showcase: `import React from 'react';
import { Layers } from 'lucide-react';

export default function ProductCard() {
  return (
    <div className="bg-slate-950 p-6 rounded-3xl border border-violet-500/10 text-white space-y-4">
      <h2 className="text-base font-bold text-slate-100 flex items-center gap-1.5"><Layers /> Bespoke Product Showcase</h2>
      <div className="bg-slate-900 border border-white/5 p-5 rounded-xl">
        <h3 className="text-xs font-bold uppercase tracking-wider text-violet-300 font-mono">Sovereign Web Space Layout</h3>
        <p className="text-xs text-slate-400 mt-2">Fully isolated Docker partitions with built-in Reverse proxies and customizable subdomains.</p>
      </div>
    </div>
  );
}`
};

// ==========================================
// IFRAME RUNNER CONVERT FROM DYNAMIC REACT
// ==========================================
const IframeRunner: React.FC<{ code: string }> = ({ code }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!iframeRef.current) return;

    let parsedCode = code;

    // Filter imports out so Babel Standalone compiles without es-modules loading errors
    parsedCode = parsedCode.replace(/import\s+React[^{]*from\s+['"]react['"];?/g, '');
    parsedCode = parsedCode.replace(/import\s+{[^}]+}\s+from\s+['"]react['"];?/g, '');
    
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

    parsedCode = parsedCode.replace(/export\s+default\s+function\s+([a-zA-Z0-9_]+)/g, 'function $1');
    parsedCode = parsedCode.replace(/export\s+default\s+class\s+([a-zA-Z0-9_]+)/g, 'class $1');
    parsedCode = parsedCode.replace(/export\s+const\s+([a-zA-Z0-9_]+)/g, 'const $1');
    parsedCode = parsedCode.replace(/export\s+default\s+[a-zA-Z0-9_]+;?/g, '');

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
<body class="bg-slate-950 p-4 text-slate-100 min-h-[460px]">
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
    <div className="w-full h-[480px] bg-slate-950 rounded-2xl overflow-hidden border border-white/5 relative">
      <iframe
        ref={iframeRef}
        title="Live Interactive Sandboxed Preview"
        className="w-full h-full border-none bg-slate-950"
        sandbox="allow-scripts"
      />
    </div>
  );
};

// ==========================================
// MAIN REUSABLE MODULE: SPLIT WORKSPACE
// ==========================================
interface Message {
  id: string;
  sender: 'visitor' | 'symphony';
  text: string;
  timestamp: Date;
  appName?: string;
  explanation?: string;
}

export const SplitWorkspace: React.FC = () => {
  const [promptValue, setPromptValue] = useState('');
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [generatedKey, setGeneratedKey] = useState<string>('audio'); // Default selected to prevent blank screens
  const [copied, setCopied] = useState(false);
  const [isSynthesizing, setIsSynthesizing] = useState(false);

  // Dynamic customization values
  const [customAppName, setCustomAppName] = useState('');
  const [customExplanation, setCustomExplanation] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [generationError, setGenerationError] = useState<string | null>(null);

  // Conversational Chat Messages
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial-welcome",
      sender: "symphony",
      text: "Hello, Creator! I am Symphony AI, your high-performance design engine. Describe any interactive layout or application you would like to build below, and I will instantly compose a premium preview on the right stage.",
      timestamp: new Date()
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll inside chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSynthesizing]);

  const activeCode = generatedKey === 'custom' ? customCode : (codeTemplates[generatedKey] || "");

  const handlePresetSelect = (key: string, label: string) => {
    setIsSynthesizing(true);
    setGenerationError(null);
    setCopied(false);

    // Direct conversational re-routing logs (avoid technical DB/VM/Port logs)
    const newMsgId = Date.now().toString();
    setMessages(prev => [
      ...prev,
      {
        id: "vis-" + newMsgId,
        sender: "visitor",
        text: `Toggle Preset: ${label}`,
        timestamp: new Date()
      }
    ]);

    setTimeout(() => {
      setIsSynthesizing(false);
      setGeneratedKey(key);
      setMessages(prev => [
        ...prev,
        {
          id: "sym-" + newMsgId,
          sender: "symphony",
          text: `Success! I have hot-loaded the custom pre-built template layout for "${label}". Click on the 'TSX Source Code' tab on the right window to copy or modify its pristine state values.`,
          timestamp: new Date()
        }
      ]);
    }, 400);
  };

  const executeGeneration = async (prompt: string) => {
    setIsSynthesizing(true);
    setGenerationError(null);
    setCopied(false);

    const matchMsgId = Date.now().toString();
    setMessages(prev => [
      ...prev,
      {
        id: "vis-" + matchMsgId,
        sender: "visitor",
        text: prompt,
        timestamp: new Date()
      }
    ]);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to process layout template. Server returned error status code.");
      }

      const data = await response.json();
      const appName = data.appName || "Interactive Blueprint";
      const explanation = data.explanation || "Premium application layout successfully generated.";

      setCustomAppName(appName);
      setCustomExplanation(explanation);
      setCustomCode(data.code || "");
      setGeneratedKey("custom");
      setActiveTab("preview");

      setMessages(prev => [
        ...prev,
        {
          id: "sym-" + matchMsgId,
          sender: "symphony",
          text: `I have compiled the new workspace component layer.`,
          appName,
          explanation,
          timestamp: new Date()
        }
      ]);
    } catch (err: any) {
      console.error(err);
      setGenerationError("Ah! There was an issue processing your app design instructions. Let's try again.");
      setMessages(prev => [
        ...prev,
        {
          id: "err-" + matchMsgId,
          sender: "symphony",
          text: "Design synthesis failed. Let's review your request constraints or try an alternative command prompt.",
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsSynthesizing(false);
    }
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const prompt = promptValue.trim();
    if (!prompt || isSynthesizing) return;
    setPromptValue('');
    executeGeneration(prompt);
  };

  const handleCopyCode = () => {
    try {
      navigator.clipboard.writeText(activeCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const suggestions = [
    { label: "Bilingual Text To Speech App", icon: Mic, prompt: "Build a bilingual text to speech app with dynamic controls" },
    { label: "Podcast Streamer Platform", icon: Flame, prompt: "Build a premium audio podcast streamer panel with visual sound waves" },
    { label: "Modern CRM Task Planner", icon: CheckSquare, prompt: "Build a responsive grid CRM task board with active filters" },
    { label: "Startup Analytics Dashboard", icon: BarChart2, prompt: "Build a beautiful executive saas analytics chart widget" }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 md:py-10 animate-fade-in text-left">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ==========================================
            LEFT COLUMN: CHAT INPUT & PROMPT ENGINE
           ========================================== */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/5 rounded-3xl p-5 md:p-6 flex flex-col h-[520px] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full" />
            
            {/* Left Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-3.5 mb-4 shrink-0">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 bg-gradient-to-tr from-amber-500/10 to-violet-500/10 border border-amber-500/20 rounded-xl">
                  <MessageSquare className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-tight">Symphony Chat Engine</h3>
                  <p className="text-[10px] text-slate-500 font-medium">Aesthetic UI Architect Node</p>
                </div>
              </div>
              <span className="flex items-center gap-1.5 text-[9px] bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">
                <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                Live AI Engine
              </span>
            </div>

            {/* Chat Messages Log */}
            <div className="flex-1 overflow-y-auto space-y-3.5 pr-2 mb-4 scrollbar-thin scrollbar-thumb-white/10 text-xs">
              <AnimatePresence initial={false}>
                {messages.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex flex-col max-w-[85%] ${m.sender === 'visitor' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                  >
                    <span className="text-[9px] text-slate-500 font-mono mb-1 font-bold">
                      {m.sender === 'visitor' ? 'Visitor Guest' : 'Symphony AI'}
                    </span>
                    
                    <div className={`p-3.5 rounded-2xl leading-relaxed font-sans ${
                      m.sender === 'visitor' 
                        ? 'bg-amber-500 text-slate-950 font-semibold rounded-tr-none' 
                        : 'bg-slate-950 border border-white/5 text-slate-200 rounded-tl-none'
                    }`}>
                      <p>{m.text}</p>
                      
                      {m.appName && (
                        <div className="mt-3 pt-2.5 border-t border-white/5 space-y-1 text-[11px] font-sans">
                          <span className="text-[9px] bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider block w-fit">
                            Manifested: {m.appName}
                          </span>
                          <p className="text-slate-400 italic mt-1 font-medium">
                            &ldquo;{m.explanation}&rdquo;
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}

                {isSynthesizing && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-start max-w-[85%] mr-auto"
                  >
                    <span className="text-[9px] text-slate-500 font-mono mb-1 font-bold">Symphony AI</span>
                    <div className="p-4 bg-slate-950 border border-white/5 rounded-2xl rounded-tl-none flex items-center space-x-3 text-slate-400">
                      <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold">Synthesizing Blueprint...</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Error Indicators */}
            {generationError && (
              <div className="px-3.5 py-2.5 bg-red-950/20 border border-red-500/15 rounded-xl flex items-start gap-2 text-[10px] text-red-400 font-mono mb-3 shrink-0">
                <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <p className="leading-normal">{generationError}</p>
              </div>
            )}

            {/* Chat Input Area */}
            <form onSubmit={handleChatSubmit} className="relative shrink-0">
              <div className="relative rounded-2xl bg-slate-950 border border-white/10 hover:border-amber-550 focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-400/15 p-2.5 flex items-center transition-all">
                <textarea
                  value={promptValue}
                  onChange={(e) => setPromptValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleChatSubmit(e);
                    }
                  }}
                  placeholder="Describe your design vision (e.g. bilingual text to speech app, fitness planner)..."
                  className="flex-1 bg-transparent text-xs text-white placeholder-slate-500 outline-none pr-3 resize-none h-11 py-1 font-sans leading-relaxed"
                  disabled={isSynthesizing}
                />
                <button
                  type="submit"
                  disabled={!promptValue.trim() || isSynthesizing}
                  className={`p-3.5 rounded-xl flex items-center justify-center transition-all ${
                    promptValue.trim() && !isSynthesizing 
                      ? 'bg-amber-500 text-slate-950 hover:bg-amber-400 cursor-pointer shadow-lg shadow-amber-505/10' 
                      : 'bg-white/5 text-slate-600 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>

          </div>

          {/* Quick presets & helpers panel */}
          <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-4 space-y-3">
            <span className="text-[10px] text-slate-500 font-mono font-bold uppercase tracking-wider block">Quick Directives (Preset Templates):</span>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => handlePresetSelect('audio', 'Voice Narrator App')} className="p-2.5 bg-slate-950 hover:bg-slate-950/80 border border-white/5 hover:border-violet-500/20 rounded-xl text-left transition-all cursor-pointer group flex items-center gap-2">
                <Mic className="w-3.5 h-3.5 text-violet-400 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-sans font-bold text-slate-350">Voice Assistant App</span>
              </button>
              <button onClick={() => handlePresetSelect('dashboard', 'SaaS Analytics Dashboard')} className="p-2.5 bg-slate-950 hover:bg-slate-950/80 border border-white/5 hover:border-indigo-500/20 rounded-xl text-left transition-all cursor-pointer group flex items-center gap-2">
                <BarChart2 className="w-3.5 h-3.5 text-indigo-400 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-sans font-bold text-slate-350">Analytics Dashboard</span>
              </button>
              <button onClick={() => handlePresetSelect('todo', 'Todo Checklist Planner')} className="p-2.5 bg-slate-950 hover:bg-slate-950/80 border border-white/5 hover:border-amber-500/20 rounded-xl text-left transition-all cursor-pointer group flex items-center gap-2">
                <CheckSquare className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-sans font-bold text-slate-350">Checklist Planner</span>
              </button>
              <button onClick={() => handlePresetSelect('showcase', 'Creative Portfolio Card')} className="p-2.5 bg-slate-950 hover:bg-slate-950/80 border border-white/5 hover:border-violet-500/20 rounded-xl text-left transition-all cursor-pointer group flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-violet-400 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-sans font-bold text-slate-350">Portfolio Showcase</span>
              </button>
            </div>
          </div>
        </div>

        {/* ==========================================
            RIGHT COLUMN: LIVE PREVIEW STAGE
           ========================================== */}
        <div className="lg:col-span-7">
          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[608px]">
            
            {/* Split Right Tabs bar */}
            <div className="bg-slate-950 px-5 py-3.5 border-b border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3.5 shrink-0">
              <div className="flex items-center gap-4 text-xs font-mono font-bold tracking-tight text-left">
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`pb-1.5 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 uppercase ${
                    activeTab === 'preview' 
                      ? 'border-amber-400 text-white' 
                      : 'border-transparent text-slate-500 hover:text-slate-350'
                  }`}
                >
                  <Layout className="w-3.5 h-3.5" />
                  Live Preview Container
                </button>
                <button
                  onClick={() => setActiveTab('code')}
                  className={`pb-1.5 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 uppercase ${
                    activeTab === 'code' 
                      ? 'border-amber-400 text-white' 
                      : 'border-transparent text-slate-500 hover:text-slate-350'
                  }`}
                >
                  <Code className="w-3.5 h-3.5" />
                  TSX Source Code
                </button>
              </div>

              {/* Action utilities */}
              <div className="flex items-center gap-2.5">
                {generatedKey === 'custom' && customAppName && (
                  <span className="text-[9px] bg-amber-500/10 border border-amber-500/20 text-amber-405 text-amber-400 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">
                    {customAppName}
                  </span>
                )}
                
                <button
                  onClick={handleCopyCode}
                  className="flex items-center space-x-1.5 bg-slate-900 border border-white/10 hover:border-amber-500/30 px-3.5 py-2 rounded-xl text-[10px] font-bold text-slate-350 hover:text-white transition-all cursor-pointer font-mono"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400 animate-bounce" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "COPY SUCCESS!" : "COPY CLEAN CODE"}</span>
                </button>
              </div>
            </div>

            {/* Split Right Content Stage */}
            <div className="p-5 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
              <AnimatePresence mode="wait">
                {activeTab === 'preview' ? (
                  <motion.div
                    key="stage-preview"
                    initial={{ opacity: 0, scale: 0.99 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col justify-between"
                  >
                    <div className="p-2 sm:p-3 bg-slate-950/30 border border-white/5 rounded-2xl flex-1 flex flex-col justify-center">
                      {generatedKey === 'audio' && <VoiceCastApp />}
                      {generatedKey === 'dashboard' && <SaasDashboardApp />}
                      {generatedKey === 'todo' && <PulseTaskApp />}
                      {generatedKey === 'showcase' && <InfinityShowcaseApp />}
                      {generatedKey === 'custom' && <IframeRunner code={customCode} />}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="stage-code"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-slate-950 border border-white/5 rounded-2xl p-4 text-left relative group h-full overflow-hidden flex flex-col"
                  >
                    <pre className="text-[10px] text-amber-300 overflow-auto scrollbar-thin scrollbar-thumb-white/15 scrollbar-track-transparent pr-4 select-all leading-relaxed font-mono font-semibold flex-1">
                      <code>{activeCode}</code>
                    </pre>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

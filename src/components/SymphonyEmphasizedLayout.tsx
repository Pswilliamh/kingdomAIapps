import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Mic, 
  Play, 
  Pause, 
  ArrowRight, 
  Copy, 
  Check, 
  Volume2, 
  BarChart2, 
  CheckSquare, 
  Layers, 
  Workflow
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SplitWorkspace } from './SplitWorkspace';

// ==========================================
// 1. REGISTRY OF INTERACTIVE APP PREVIEWS
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
                      : 'bg-slate-900 border-white/5 text-slate-400 hover:text-white hover:border-white/10'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-slate-900/60 p-4 rounded-xl border border-white/5 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 flex items-center gap-1"><Volume2 className="w-3.5 h-3.5" /> Volume: {volume}%</span>
            <span className="font-mono text-slate-500 font-sans">44.1 kHz FL32</span>
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
            <div className="absolute inset-0 bg-violet-600/5 blur-md" />
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

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-full bg-violet-600 hover:bg-violet-500 text-white px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          <span>{isPlaying ? "Pause Stream" : "Synthesize Voice"}</span>
        </button>

        <div className="space-y-2 pt-2 border-t border-white/5">
          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Archives</span>
          {tracks.map((t) => (
            <div key={t.id} className="bg-slate-950/70 p-2.5 rounded-lg border border-white/5 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300 truncate">{t.title}</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20 uppercase">{t.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SaasDashboardApp: React.FC = () => {
  return (
    <div className="bg-slate-950 border border-indigo-500/10 rounded-2xl p-6 text-white space-y-6 max-w-2xl mx-auto shadow-2xl text-left">
      <h2 className="text-base font-bold text-slate-100">Vortex Analytics Workspace</h2>
      <p className="text-xs text-slate-400">Instant metrics layout parsed dynamically on first turn.</p>
      
      <div className="grid grid-cols-3 gap-4">
        {[
          { l: "Revenue", v: "$48,259.00", c: "+14.2%" },
          { l: "Creators", v: "12,948", c: "+22.5%" },
          { l: "Delivery", v: "98.4%", c: "+3.1%" }
        ].map((st, i) => (
          <div key={i} className="bg-slate-900 p-4 rounded-xl border border-white/5">
            <span className="text-[10px] text-slate-400 uppercase block">{st.l}</span>
            <span className="text-base font-black font-mono block mt-1">{st.v}</span>
            <span className="text-[9px] text-emerald-405 text-emerald-400">{st.c}</span>
          </div>
        ))}
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

  return (
    <div className="bg-slate-950 p-6 rounded-3xl border border-amber-500/10 text-white space-y-4 max-w-2xl mx-auto text-left">
      <h2 className="text-base font-bold text-slate-100 flex items-center gap-1.5">Pulse Planner</h2>
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
          </div>
        ))}
      </div>
    </div>
  );
};

const InfinityShowcaseApp: React.FC = () => {
  return (
    <div className="bg-slate-950 p-6 rounded-3xl border border-violet-500/10 text-white space-y-4 max-w-2xl mx-auto text-left">
      <h2 className="text-base font-bold text-slate-100">Bespoke Product Showcase</h2>
      <div className="bg-slate-900 border border-white/5 p-5 rounded-xl">
        <h3 className="text-xs font-bold uppercase tracking-wider text-violet-300">Sovereign Web Space Layout</h3>
        <p className="text-xs text-slate-400 mt-2">Fully isolated Docker partitions with built-in Reverse proxies and customizable subdomains.</p>
      </div>
    </div>
  );
};

// ==========================================
// 2. CODE STRINGS
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
import { DollarSign, Users, TrendingUp } from 'lucide-react';

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
      <h2 className="text-base font-bold text-slate-100 flex items-center gap-1.5">Pulse Planner</h2>
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
  showcase: `import React, { useState } from 'react';
import { Layers, ArrowRight } from 'lucide-react';

export default function ProductCard() {
  return (
    <div className="bg-slate-950 p-6 rounded-3xl border border-violet-500/10 text-white space-y-4">
      <h2 className="text-base font-bold text-slate-100">Bespoke Product Showcase</h2>
      <div className="bg-slate-900 border border-white/5 p-5 rounded-xl">
        <h3 className="text-xs font-bold uppercase tracking-wider text-violet-300">Sovereign Web Space Layout</h3>
        <p className="text-xs text-slate-400 mt-2">Fully isolated Docker partitions with built-in Reverse proxies and customizable subdomains.</p>
      </div>
    </div>
  );
}`
};


interface SymphonyEmphasizedLayoutProps {
  onOpenSymphonyChat: () => void;
  initialEstateName: string;
}

export const SymphonyEmphasizedLayout: React.FC<SymphonyEmphasizedLayoutProps> = () => {
  return (
    <div id="symphony-creator-main" className="max-w-7xl mx-auto py-8 md:py-16 space-y-12 animate-fade-in relative z-10 font-sans">
      
      {/* 1. AUDIO HERO HEADER */}
      <section className="text-center max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-violet-500/25 bg-violet-500/10 text-violet-400 text-xs font-semibold tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5 mr-0.5 animate-pulse" />
          <span>Symphony Audio-Creator Workspace</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-none">
          Lock Down Your <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-fuchsia-400 bg-clip-text text-transparent">Audio Creator</span> App.
        </h1>

        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xl mx-auto font-normal">
          An ultra-clean workspace. Prompt your creative design, and observe functional code blocks with interactive audio player overlays compile immediately.
        </p>
      </section>

      {/* 2. SPLIT WORKSPACE: CHAT & LIVE PREVIEW STAGE */}
      <SplitWorkspace />

    </div>
  );
};

const _deprecated_Symphony: React.FC<SymphonyEmphasizedLayoutProps> = () => {
  const [isPlayingWave, setIsPlayingWave] = useState(true);
  const [promptValue, setPromptValue] = useState('');
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isSynthesizing, setIsSynthesizing] = useState(false);

  const predefinedPrompts = [
    { label: "Voice Narrator Creator", key: "audio" },
    { label: "SaaS Command Dashboard", key: "dashboard" },
    { label: "Milestone Task Planner", key: "todo" },
    { label: "Modular Creative Portfolio", key: "showcase" }
  ];

  // Animated soundwave heights
  const waveBarsCount = 28;
  const [waveHeights, setWaveHeights] = useState<number[]>(
    Array.from({ length: waveBarsCount }, () => Math.floor(Math.random() * 32) + 8)
  );

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlayingWave) {
      interval = setInterval(() => {
        setWaveHeights(Array.from({ length: waveBarsCount }, () => Math.floor(Math.random() * 40) + 6));
      }, 120);
    }
    return () => clearInterval(interval);
  }, [isPlayingWave]);

  const handleGenerate = (key: string) => {
    setIsSynthesizing(true);
    setGeneratedKey(null);
    setCopied(false);
    
    // Bypass technical explanation delays
    setTimeout(() => {
      setIsSynthesizing(false);
      setGeneratedKey(key);
    }, 450);
  };

  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptValue.trim()) return;
    
    const textLower = promptValue.toLowerCase();
    let key = "showcase";
    if (textLower.includes('podcast') || textLower.includes('speech') || textLower.includes('audio') || textLower.includes('voice') || textLower.includes('radio')) {
      key = "audio";
    } else if (textLower.includes('dashboard') || textLower.includes('analytics') || textLower.includes('saas') || textLower.includes('chart') || textLower.includes('admin')) {
      key = "dashboard";
    } else if (textLower.includes('todo') || textLower.includes('task') || textLower.includes('checklist') || textLower.includes('planner') || textLower.includes('list')) {
      key = "todo";
    }
    
    setPromptValue('');
    handleGenerate(key);
  };

  const handleCopyCode = () => {
    if (!generatedKey) return;
    const code = codeTemplates[generatedKey] || "";
    try {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div id="symphony-creator-main" className="max-w-4xl mx-auto py-8 md:py-16 space-y-12 animate-fade-in relative z-10 font-sans">
      
      {/* 1. AUDIO HERO HEADER */}
      <section className="text-center max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-violet-500/25 bg-violet-500/10 text-violet-400 text-xs font-semibold tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5 mr-0.5 animate-pulse" />
          <span>Symphony Audio-Creator Workspace</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-none">
          Lock Down Your <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-fuchsia-400 bg-clip-text text-transparent">Audio Creator</span> App.
        </h1>

        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xl mx-auto font-normal">
          An ultra-clean workspace. Prompt your creative design, and observe functional code blocks with interactive audio player overlays compile immediately.
        </p>

        {/* 2. AUDIO EQUALIZER SIGNAL WELL */}
        <div className="max-w-xl mx-auto bg-slate-900/60 p-6 rounded-2xl border border-white/5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] text-violet-300 uppercase tracking-widest font-bold">Creator Wave Monitor</span>
            <button 
              onClick={() => setIsPlayingWave(!isPlayingWave)}
              className="text-[9px] font-semibold text-slate-400 bg-slate-950 border border-white/5 px-2 py-0.5 rounded transition-all cursor-pointer"
            >
              SIGNAL: {isPlayingWave ? "LIVE" : "STANDBY"}
            </button>
          </div>

          <div className="h-16 flex items-end justify-center gap-1 bg-slate-950 border border-white/5 rounded-xl px-4 py-2 relative overflow-hidden">
            <div className="absolute inset-0 bg-violet-600/5 blur-md pointer-events-none" />
            {waveHeights.map((h, i) => (
              <div 
                key={i} 
                className="w-1.5 rounded-full bg-gradient-to-t from-violet-600 via-indigo-500 to-fuchsia-400 transition-all duration-150" 
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. CENTERED WORKSPACE INPUT CAPSULE */}
      <section className="max-w-xl mx-auto">
        <form onSubmit={handlePromptSubmit} className="group relative rounded-full bg-slate-900 border border-white/10 hover:border-violet-500 focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-500/20 px-6 py-4 flex items-center transition-all shadow-xl">
          <input
            type="text"
            value={promptValue}
            onChange={(e) => setPromptValue(e.target.value)}
            placeholder="Prompt your application vision (e.g. text-to-speech podcast app)..."
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none pr-4 font-normal"
          />
          <button
            type="submit"
            className="bg-violet-600 hover:bg-violet-500 text-white font-bold px-5 py-2.5 rounded-full text-xs uppercase tracking-widest flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>Compile</span>
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </button>
        </form>

        {/* Suggestion tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {predefinedPrompts.map((p) => (
            <button
              key={p.key}
              type="button"
              onClick={() => handleGenerate(p.key)}
              className="inline-flex items-center px-3 py-1 rounded-full border border-white/5 bg-slate-900 hover:bg-slate-950 hover:border-violet-500/20 text-[10px] text-slate-400 hover:text-violet-300 transition-all cursor-pointer font-medium"
            >
              <span>{p.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* 4. CODE PREVIEW CONTAINER */}
      <section className="max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          {isSynthesizing && (
            <motion.div
              key="loader"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="p-12 text-center bg-slate-900/30 border border-white/5 rounded-3xl backdrop-blur-md flex flex-col items-center justify-center space-y-4"
            >
              <div className="w-10 h-10 rounded-full border-2 border-t-violet-400 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
              <p className="text-xs font-bold text-violet-400 tracking-widest uppercase font-mono">Synthesizing Creative Blueprint...</p>
            </motion.div>
          )}

          {!isSynthesizing && generatedKey && (
            <motion.div
              key="viewer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900/40 border border-white/5 rounded-3xl overflow-hidden shadow-2xl space-y-4"
            >
              {/* Header Tabs */}
              <div className="bg-slate-950 px-6 py-4 border-b border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex gap-4">
                  <button
                    onClick={() => setActiveTab('preview')}
                    className={`text-xs font-bold uppercase pb-1 border-b-2 transition-all cursor-pointer ${
                      activeTab === 'preview' 
                        ? 'border-violet-400 text-white font-black' 
                        : 'border-transparent text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    Live Component
                  </button>
                  <button
                    onClick={() => setActiveTab('code')}
                    className={`text-xs font-bold uppercase pb-1 border-b-2 transition-all cursor-pointer ${
                      activeTab === 'code' 
                        ? 'border-violet-400 text-white font-black' 
                        : 'border-transparent text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    TSX Source Code
                  </button>
                </div>

                <button
                  onClick={handleCopyCode}
                  className="flex items-center space-x-1.5 bg-slate-900 border border-white/10 hover:border-violet-500/30 px-4 py-2 rounded-xl text-xs font-bold text-slate-350 hover:text-white transition-all cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400 animate-bounce" /> : <Copy className="w-3.5 h-3.5 animate-pulse" />}
                  <span>{copied ? "Copied!" : "Copy Clean Code"}</span>
                </button>
              </div>

              {/* Body */}
              <div className="p-6">
                {activeTab === 'preview' ? (
                  <div className="p-4 bg-slate-950/40 border border-white/5 rounded-2xl">
                    {generatedKey === 'audio' && <VoiceCastApp />}
                    {generatedKey === 'dashboard' && <SaasDashboardApp />}
                    {generatedKey === 'todo' && <PulseTaskApp />}
                    {generatedKey === 'showcase' && <InfinityShowcaseApp />}
                  </div>
                ) : (
                  <div className="bg-slate-950 border border-white/5 rounded-2xl p-4 text-left">
                    <pre className="text-[11px] text-violet-300 overflow-x-auto max-h-96 pr-4 select-all leading-relaxed font-mono">
                      <code>{codeTemplates[generatedKey]}</code>
                    </pre>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

    </div>
  );
};

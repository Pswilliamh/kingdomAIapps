import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Mic, 
  Play, 
  MessageSquare, 
  Terminal, 
  Cpu, 
  ShieldAlert, 
  Radio, 
  ArrowRight,
  Workflow,
  CheckCircle,
  Activity
} from 'lucide-react';

interface SymphonyEmphasizedLayoutProps {
  onOpenSymphonyChat: () => void;
  initialEstateName: string;
}

export const SymphonyEmphasizedLayout: React.FC<SymphonyEmphasizedLayoutProps> = ({ 
  onOpenSymphonyChat,
  initialEstateName
}) => {
  const [isPlayingWave, setIsPlayingWave] = useState(true);
  const [userPrompt, setUserPrompt] = useState('');
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    "Symphony Voice Core V2.0 initialized (Aegis-Secure).",
    "Ready for sound-wave intent mapping..."
  ]);
  const [compilingStep, setCompilingStep] = useState<string>('idle'); // 'idle' | 'analyzing' | 'building' | 'deployed'

  const predefinedPrompts = [
    "Compile client-side routing on port 3000",
    "Provision secure isolated Firestore db schema",
    "Scale multi-agent sandbox containers",
    "Affix customized domain deed credentials"
  ];

  // Animated wave bars
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

  const handlePromptSubmit = (promptText: string) => {
    if (!promptText.trim()) return;
    setUserPrompt('');
    setConsoleLogs(prev => [
      ...prev,
      `> Voice request: "${promptText}"`,
      "[Symphony Voice Layer] Decoding signal amplitude...",
      "[Symphony Voice Layer] Semantic match: Sovereign Sandbox Directive."
    ]);
    setCompilingStep('analyzing');

    setTimeout(() => {
      setConsoleLogs(prev => [
        ...prev,
        "[Orchestrator Core] Building modular AST for sandboxed cloud container...",
        "[Aegis Core] Provisioning isolated database partition: stable-us-central1-firestore-db"
      ]);
      setCompilingStep('building');
    }, 1500);

    setTimeout(() => {
      setConsoleLogs(prev => [
        ...prev,
        "[Kinetix Core] Routing engine live on secure region gateway.",
        "[Genesis Core] Domain compiled successfully: 200 OK."
      ]);
      setCompilingStep('deployed');
    }, 3500);
  };

  return (
    <div id="symphony-emphasized-main" className="space-y-16 py-6 md:py-12 animate-fade-in relative z-10">
      
      {/* 1. VOCAL HERO AREA */}
      <section className="text-center max-w-4xl mx-auto space-y-8">
        <div className="inline-flex items-center space-x-2 px-3  py-1 rounded-full border border-violet-500/25 bg-violet-500/10 text-violet-400 text-xs font-semibold tracking-wide uppercase">
          <Radio className="w-3.5 h-3.5 mr-0.5 animate-pulse text-violet-400" />
          <span>Symphony AI Audio-Visual Mode</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
          Orchestrate with Sound.<br />
          <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent font-sans">
            Symphony AI Voice Agent Active.
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-slate-400 font-normal leading-relaxed max-w-2xl mx-auto">
          Experience sound-driven compilation. Speak or type your app estate requirements, and observe the Symphony multi-agent node build and sync your isolated digital environment in real-time.
        </p>

        {/* VOICE PULSE WIDGET */}
        <div className="max-w-2xl mx-auto bg-gradient-to-br from-violet-950/40 to-indigo-950/40 p-6 md:p-8 rounded-3xl border border-violet-500/20 backdrop-blur-xl shadow-2xl relative overflow-hidden space-y-6">
          <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-500/10 blur-2xl rounded-full pointer-events-none" />
          
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
              <span className="font-mono text-[10px] text-violet-300 uppercase tracking-widest font-black">Voice Signal Pipeline</span>
            </div>
            <button 
              onClick={() => setIsPlayingWave(!isPlayingWave)} 
              className="text-[9px] font-mono text-slate-500 bg-white/5 px-2 py-0.5 rounded border border-white/5 hover:text-white transition-colors"
            >
              Telemetry Wave: {isPlayingWave ? "ACTIVE" : "PAUSED"}
            </button>
          </div>

          {/* Glowing Equalizer Waves */}
          <div className="h-24 flex items-end justify-center gap-1.5 px-4 bg-slate-950/70 rounded-2xl relative overflow-hidden border border-white/5 py-4">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-violet-600/5 blur-xl pointer-events-none" />
            
            {waveHeights.map((h, i) => (
              <div 
                key={i} 
                className="w-2 rounded-full transition-all duration-150 bg-gradient-to-t from-indigo-500 via-violet-500 to-fuchsia-400" 
                style={{ height: `${h}%` }}
              />
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                setIsPlayingWave(true);
                handlePromptSubmit("Compile custom voice components to build local system controllers.");
              }}
              className="w-full sm:w-auto px-6 py-3.5 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-xl shadow-lg shadow-violet-500/20 transition-all cursor-pointer flex items-center justify-center gap-2 text-sm uppercase tracking-wide"
            >
              <Mic className="w-4 h-4 text-white animate-bounce" />
              <span>Voice Prompt Live</span>
            </button>

            <button
              onClick={onOpenSymphonyChat}
              className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 border border-violet-500/30 hover:border-violet-500/60 text-violet-300 hover:text-white font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 text-sm uppercase tracking-wide"
            >
              <MessageSquare className="w-4 h-4 text-violet-400" />
              <span>Launch Controller chat</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. LIVE COMPILER INTERACTIVE CONSOLE */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
        
        {/* Left Column: Input and presets */}
        <div className="bg-slate-900/60 p-6 md:p-8 rounded-3xl border border-white/5 flex flex-col justify-between space-y-6">
          <div className="space-y-2 text-left">
            <div className="flex items-center space-x-2 text-violet-400 font-mono text-[10px] font-bold uppercase tracking-wider">
              <Cpu className="w-4 h-4" />
              <span>Symphony Directives Console</span>
            </div>
            <h3 className="text-xl font-black text-white">Sovereign Direct Prompting</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Feed detailed commands directly into the terminal below. Preconfigured directive options can be triggered at any time.
            </p>
          </div>

          {/* Quick presets */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block text-left">Pre-vetted Directives</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
              {predefinedPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePromptSubmit(p)}
                  className="p-2.5 bg-slate-950/80 hover:bg-violet-950/20 hover:border-violet-500/20 rounded-lg text-[10px] text-slate-400 hover:text-violet-300 font-mono border border-white/5 text-left truncate transition-all flex items-center justify-between"
                >
                  <span className="truncate">{p}</span>
                  <Play className="w-2.5 h-2.5 shrink-0 ml-1.5 opacity-60 group-hover:opacity-100" />
                </button>
              ))}
            </div>
          </div>

          {/* Search/input form */}
          <div className="space-y-2 text-left">
            <div className="relative">
              <input
                type="text"
                placeholder="What sandbox application should Symphony build next?"
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handlePromptSubmit(userPrompt);
                }}
                className="w-full bg-slate-950 border border-white/10 focus:border-violet-500 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 outline-none pr-10 font-mono"
              />
              <button
                onClick={() => handlePromptSubmit(userPrompt)}
                className="absolute right-2.5 top-2.5 bg-violet-600/30 p-1.5 rounded-md hover:bg-violet-600 text-violet-300 hover:text-white transition-colors"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Code log screen */}
        <div className="bg-slate-950 border border-white/5 rounded-3xl p-5 font-mono flex flex-col justify-between overflow-hidden shadow-inner h-96">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="text-[10px] text-slate-500 font-bold ml-2">symphony@compiler-telemetry:~</span>
            </div>
            
            {/* Status indicator */}
            {compilingStep === 'idle' && (
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest bg-slate-900 border border-white/5 px-2 rounded">
                Idle
              </span>
            )}
            {compilingStep === 'analyzing' && (
              <span className="text-[10px] text-yellow-400 font-black uppercase tracking-widest bg-yellow-400/10 border border-yellow-400/20 px-2 rounded animate-pulse flex items-center gap-1">
                <Workflow className="w-2.5 h-2.5 animate-spin" />
                Matching Intent
              </span>
            )}
            {compilingStep === 'building' && (
              <span className="text-[10px] text-indigo-400 font-black uppercase tracking-widest bg-indigo-400/10 border border-indigo-400/20 px-2 rounded animate-pulse flex items-center gap-1">
                <Cpu className="w-2.5 h-2.5 animate-spin" />
                Compiling Core
              </span>
            )}
            {compilingStep === 'deployed' && (
              <span className="text-[10px] text-emerald-400 font-black uppercase tracking-widest bg-emerald-400/10 border border-emerald-400/20 px-2 rounded flex items-center gap-1">
                <CheckCircle className="w-2.5 h-2.5 text-emerald-400" />
                Done 200 OK
              </span>
            )}
          </div>

          {/* Code outputs */}
          <div className="flex-1 overflow-y-auto text-[10px] text-slate-400 text-left py-4 space-y-2 font-mono scrollbar-thin">
            {consoleLogs.map((log, index) => {
              let textClass = "text-slate-400";
              if (log.startsWith(">")) textClass = "text-white font-bold";
              else if (log.includes("[Symphony") || log.includes("[Orchestrator")) textClass = "text-violet-400";
              else if (log.includes("[Aegis")) textClass = "text-blue-400";
              else if (log.includes("[Kinetix") || log.includes("[Genesis")) textClass = "text-emerald-400";
              
              return (
                <div key={index} className={`${textClass} leading-relaxed`}>
                  {log}
                </div>
              );
            })}
          </div>

          <div className="border-t border-white/5 pt-3 flex items-center justify-between text-[9px] text-slate-500 font-bold">
            <span>Terminal Core Active</span>
            <div className="flex items-center space-x-1">
              <Activity className="w-3 h-3 text-violet-500 animate-pulse" />
              <span>Latency: 28ms</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

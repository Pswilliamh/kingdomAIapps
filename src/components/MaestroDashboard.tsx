import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Settings, 
  Terminal, 
  Map, 
  Check, 
  Layers, 
  Cpu, 
  Activity, 
  Network, 
  Lock, 
  Server, 
  Globe, 
  RefreshCw, 
  Play, 
  Sliders, 
  Shield, 
  Zap, 
  ChevronRight,
  Database,
  Eye,
  Smartphone,
  Monitor,
  Laptop
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MaestroDashboardProps {
  initialEstateName: string;
}

export const MaestroDashboard: React.FC<MaestroDashboardProps> = ({ 
  initialEstateName 
}) => {
  // Left Panel States
  const [estateName, setEstateName] = useState(initialEstateName || 'sovereign-kingdom.com');
  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState<number>(0);
  const [region, setRegion] = useState<string>('us-central');
  const [isVMEnabled, setIsVMEnabled] = useState<boolean>(true);
  const [isSSLEnabled, setIsSSLEnabled] = useState<boolean>(true);
  const [isAegisEnabled, setIsAegisEnabled] = useState<boolean>(true);
  const [isTurboEnabled, setIsTurboEnabled] = useState<boolean>(false);
  const [simulationActive, setSimulationActive] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const milestones = [
    {
      id: 1,
      name: "Blueprint Analysis",
      coreFile: "blueprint-ast.json",
      status: "Verified",
      desc: "Translates human-spoken natural prompts into an advanced modular blueprint mapping file (blueprint-app.json). Validated against standard schema engines with strict static code checks.",
      logs: [
        "Analyzing user query semantic hierarchy...",
        "Applying deep parsing grammar vectors...",
        "Compiling state managers and generating reactive schema hooks."
      ]
    },
    {
      id: 2,
      name: "Isolate Cloud Container",
      coreFile: "sandbox-isolated-vm.sh",
      status: "Encrypted",
      desc: "Deploys a lightweight developer environment using cloud sandbox containers. The database sits in an isolated VPC partitioned specifically for your user keys.",
      logs: [
        "Spawning isolated container partition securely...",
        "Assigning interface ingress port and configuring reverse proxies.",
        "Establishing Virtual Private Cloud boundary parameters."
      ]
    },
    {
      id: 3,
      name: "Establish Cryptographic Deed",
      coreFile: "ssl-handshake-cert.crt",
      status: "Protected",
      desc: "Binds the digital app housing to a customized domain with automated payment triggers. Assures zero closed proprietary locks exist.",
      logs: [
        "Requesting automatic let's encrypt TLS certificate chain...",
        "Bypassing central root domain constraints.",
        "Locking domain deed to cryptographic signature wallet credentials."
      ]
    },
    {
      id: 4,
      name: "Handover Digital Real Estate",
      coreFile: "sovereign-manifest-app.zip",
      status: "Delivered",
      desc: "Transfers the compiled webapp bundle directly back to the constructor. Provides immediate download permissions alongside live persistent staging keys.",
      logs: [
        "Structuring build files into fully optimized dist directory...",
        "Assembling zip payload with pre-configured staging variables.",
        "System fully operational. Ready for sovereign production launch!"
      ]
    }
  ];

  // Auto-generate terminal logs when state elements modify
  useEffect(() => {
    const timestamp = new Date().toLocaleTimeString();
    const newLog = `[${timestamp}] Configured: Estate="${estateName}", Milestone="${milestones[activeMilestoneIndex].name}", Region="${region}", VM=${isVMEnabled}, SSL=${isSSLEnabled}, Aegis=${isAegisEnabled}, Turbo=${isTurboEnabled}`;
    setLogs(prev => [newLog, ...prev].slice(0, 50));
  }, [estateName, activeMilestoneIndex, region, isVMEnabled, isSSLEnabled, isAegisEnabled, isTurboEnabled]);

  const handleTriggerSimulation = () => {
    setSimulationActive(true);
    const interval = setTimeout(() => {
      setSimulationActive(false);
      const timestamp = new Date().toLocaleTimeString();
      setLogs(prev => [`[${timestamp}] SUCCESS: Full-stack workspace compilation complete!`, ...prev]);
    }, 2000);
    return () => clearTimeout(interval);
  };

  const handleReset = () => {
    setEstateName(initialEstateName || 'sovereign-kingdom.com');
    setActiveMilestoneIndex(0);
    setRegion('us-central');
    setIsVMEnabled(true);
    setIsSSLEnabled(true);
    setIsAegisEnabled(true);
    setIsTurboEnabled(false);
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] Reset: Workspace returned to architectural defaults.`, ...prev]);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[700px] border border-white/5 rounded-3xl overflow-hidden shadow-2xl relative bg-slate-950 text-left">
      
      {/* LEFT SIDEBAR PANEL: Rich dark (#111), fixed width 400px on desktop, vertical auto-scrolling */}
      <div 
        className="w-full lg:w-[400px] lg:flex-shrink-0 flex flex-col border-r border-white/5"
        style={{ backgroundColor: '#111111' }}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-white/5 bg-black/20">
          <div className="flex items-center space-x-2 text-amber-400">
            <Sliders className="w-5 h-5 text-amber-400" />
            <span className="font-mono text-[10px] font-black uppercase tracking-widest">Maestro Workspace Panel</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight mt-1">Configurator Engine</h2>
          <p className="text-xs text-slate-400 mt-1">Manipulate the variables below to orchestrate the application layout dynamically.</p>
        </div>

        {/* Scrollable Workspace Controls */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[600px] custom-scrollbar flex-1">
          
          {/* Section 1: Core Domain Estate */}
          <div className="space-y-3">
            <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Estate Domain Name
            </label>
            <div className="relative">
              <Globe className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                value={estateName}
                onChange={(e) => setEstateName(e.target.value)}
                placeholder="domain-identity.io"
                className="w-full bg-slate-950 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-600 font-mono focus:outline-none focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500/50"
              />
            </div>
            <p className="text-[10px] text-slate-500">
              Live updates the cryptographic sandbox host badge.
            </p>
          </div>

          {/* Section 2: Active Pipeline Stage */}
          <div className="space-y-3">
            <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Active Milestone Step
            </label>
            <div className="relative">
              <Layers className="absolute left-3 top-2.5 w-4 h-4 text-amber-500/70" />
              <select
                value={activeMilestoneIndex}
                onChange={(e) => setActiveMilestoneIndex(Number(e.target.value))}
                className="w-full bg-slate-950 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500/50 cursor-pointer appearance-none"
              >
                {milestones.map((ms, idx) => (
                  <option key={ms.id} value={idx}>
                    Stage {ms.id}: {ms.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Section 3: Region Select */}
          <div className="space-y-3">
            <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Infrastructure Target Region
            </label>
            <div className="relative">
              <Network className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500/50 cursor-pointer appearance-none"
              >
                <option value="us-central">US-Central (Iowa Dev Cluster)</option>
                <option value="eu-west">EU-West (Frankfurt Enterprise)</option>
                <option value="ap-east">AP-East (Tokyo Hyperscale)</option>
                <option value="ap-southeast">AP-Southeast (Singapore Hub)</option>
              </select>
            </div>
          </div>

          {/* Section 4: Module Toggles */}
          <div className="space-y-4 pt-2 border-t border-white/5">
            <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Sovereign Guard Toggles
            </label>

            {/* Toggle 1: VM Sandbox */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/40 border border-white/5 hover:border-white/10 transition-colors">
              <div className="flex items-center space-x-2.5">
                <Server className={`w-4 h-4 ${isVMEnabled ? 'text-amber-400' : 'text-slate-600'}`} />
                <div className="text-left">
                  <div className="text-[11px] font-bold text-white">Cloud VM sandbox</div>
                  <div className="text-[9px] text-slate-400">Isolate development layers</div>
                </div>
              </div>
              <input 
                type="checkbox"
                checked={isVMEnabled}
                onChange={(e) => setIsVMEnabled(e.target.checked)}
                className="w-4 h-4 accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Toggle 2: SSL Handshake */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/40 border border-white/5 hover:border-white/10 transition-colors">
              <div className="flex items-center space-x-2.5">
                <Lock className={`w-4 h-4 ${isSSLEnabled ? 'text-violet-400' : 'text-slate-600'}`} />
                <div className="text-left">
                  <div className="text-[11px] font-bold text-white">TLS/SSL Encryption</div>
                  <div className="text-[9px] text-slate-400">Inject security lock handshake</div>
                </div>
              </div>
              <input 
                type="checkbox"
                checked={isSSLEnabled}
                onChange={(e) => setIsSSLEnabled(e.target.checked)}
                className="w-4 h-4 accent-violet-500 cursor-pointer"
              />
            </div>

            {/* Toggle 3: Aegis Shield */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/40 border border-white/5 hover:border-white/10 transition-colors">
              <div className="flex items-center space-x-2.5">
                <Shield className={`w-4 h-4 ${isAegisEnabled ? 'text-emerald-400' : 'text-slate-600'}`} />
                <div className="text-left">
                  <div className="text-[11px] font-bold text-white">Aegis Core Defense</div>
                  <div className="text-[9px] text-slate-400 font-sans">Shield API routes automatically</div>
                </div>
              </div>
              <input 
                type="checkbox"
                checked={isAegisEnabled}
                onChange={(e) => setIsAegisEnabled(e.target.checked)}
                className="w-4 h-4 accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* Toggle 4: Hyper Performance Mode */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/40 border border-white/5 hover:border-white/10 transition-colors">
              <div className="flex items-center space-x-2.5">
                <Zap className={`w-4 h-4 ${isTurboEnabled ? 'text-yellow-400 animate-bounce' : 'text-slate-600'}`} />
                <div className="text-left">
                  <div className="text-[11px] font-bold text-white">Hyper Turbo Boost</div>
                  <div className="text-[9px] text-slate-400">Unlock maximum FPS compiling</div>
                </div>
              </div>
              <input 
                type="checkbox"
                checked={isTurboEnabled}
                onChange={(e) => setIsTurboEnabled(e.target.checked)}
                className="w-4 h-4 accent-yellow-400 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Sidebar Footer Operations */}
        <div className="p-6 border-t border-white/5 bg-black/30 space-y-3">
          <button
            onClick={handleTriggerSimulation}
            disabled={simulationActive}
            className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider font-mono transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/10 cursor-pointer disabled:opacity-50"
          >
            {simulationActive ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Compiling State Map...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>Compile & Sync Setup</span>
              </>
            )}
          </button>
          
          <button
            onClick={handleReset}
            className="w-full bg-slate-900 hover:bg-slate-800 text-slate-350 border border-white/15 py-2 px-4 rounded-xl text-[10px] uppercase font-mono tracking-wider transition-colors cursor-pointer"
          >
            Reset Master Config
          </button>
        </div>
      </div>

      {/* RIGHT PREVIEW STAGE: Style as broad, high-contrast canvas (#1a1a1a) */}
      <div 
        className="flex-1 p-6 md:p-8 flex flex-col justify-between"
        style={{ backgroundColor: '#1a1a1a' }}
      >
        {/* Inside Preview Stage Header with device view ports preview simulation */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-white/5 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-slate-400">
              <Eye className="w-4 h-4" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Live Stage Previewer</span>
            </div>
            <h3 className="text-white text-base font-bold mt-0.5">Automated Architecture Blueprint</h3>
          </div>

          {/* Interactive Device View toggles */}
          <div className="flex items-center bg-slate-900 border border-white/10 rounded-xl p-1 space-x-1">
            <button 
              onClick={() => setPreviewDevice('desktop')}
              className={`p-1.5 rounded-lg transition-colors ${previewDevice === 'desktop' ? 'bg-amber-500/20 text-amber-400' : 'text-slate-500 hover:text-white'}`}
              title="Simulator Desktop Layout"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setPreviewDevice('tablet')}
              className={`p-1.5 rounded-lg transition-colors ${previewDevice === 'tablet' ? 'bg-amber-500/20 text-amber-400' : 'text-slate-500 hover:text-white'}`}
              title="Simulator Tablet Layout"
            >
              <Laptop className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setPreviewDevice('mobile')}
              className={`p-1.5 rounded-lg transition-colors ${previewDevice === 'mobile' ? 'bg-amber-500/20 text-amber-400' : 'text-slate-500 hover:text-white'}`}
              title="Simulator Mobile phone Layout"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Live device preview layout rendering mock space */}
        <div className="flex-1 my-6 flex items-center justify-center">
          <div 
            className={`transition-all duration-300 border border-white/10 rounded-2xl bg-slate-950/90 shadow-2xl relative overflow-hidden flex flex-col justify-between p-6 ${
              previewDevice === 'desktop' ? 'w-full max-w-4xl min-h-[440px]' : 
              previewDevice === 'tablet' ? 'w-[600px] min-h-[420px]' : 
              'w-[320px] min-h-[460px]'
            }`}
          >
            {/* Visual shine accents on preview */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-tr from-amber-500/10 to-indigo-500/5 blur-3xl rounded-full" />
            
            {/* Live Interactive Header Render */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/5 pb-4 gap-2 relative z-10">
              <div>
                <span className="text-[9px] font-mono uppercase bg-amber-500/20 border border-amber-500/30 text-amber-300 px-2 py-0.5 rounded-md font-bold">
                  Sovereign App Estate
                </span>
                <h4 className="text-sm font-mono mt-1.5 text-white flex items-center gap-1.5 font-bold">
                  <Globe className="w-3.5 h-3.5 text-indigo-400" />
                  <span>https://{estateName || 'unknown-estate.io'}</span>
                </h4>
              </div>
              <div className="text-[10px] text-slate-400 bg-slate-900 border border-white/5 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-[9px] uppercase font-bold text-amber-300">
                  {region.toUpperCase()} CLUSTER
                </span>
              </div>
            </div>

            {/* Live Dynamic Info Box describing chosen Milestone */}
            <div className="my-5 space-y-4 text-left relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-amber-400 font-mono text-[10px]">
                  <span>Milestone Stage 0{activeMilestoneIndex + 1}</span>
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  <span className="text-slate-350">{milestones[activeMilestoneIndex].coreFile}</span>
                </div>
                <span className="text-[9px] text-white bg-indigo-600/30 border border-indigo-500 p-1.5 rounded-md font-bold font-mono">
                  {milestones[activeMilestoneIndex].status}
                </span>
              </div>

              <div>
                <h3 className="text-white text-base font-black tracking-tight">{milestones[activeMilestoneIndex].name}</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-sans mt-1.5">{milestones[activeMilestoneIndex].desc}</p>
              </div>

              {/* Connected Active Badges indicating toggle options */}
              <div className="flex flex-wrap gap-2 pt-2">
                {isVMEnabled && (
                  <span className="text-[9px] font-mono text-emerald-300 bg-emerald-500/5 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                    + Isolated Sandbox Active
                  </span>
                )}
                {isSSLEnabled && (
                  <span className="text-[9px] font-mono text-violet-300 bg-violet-500/5 border border-violet-500/20 px-2 py-0.5 rounded-md">
                    + TLS 1.3 Certified
                  </span>
                )}
                {isAegisEnabled && (
                  <span className="text-[9px] font-mono text-cyan-300 bg-cyan-500/5 border border-cyan-500/20 px-2 py-0.5 rounded-md">
                    + Aegis Security Shield
                  </span>
                )}
                {isTurboEnabled && (
                  <span className="text-[9px] font-mono text-yellow-300 bg-yellow-500/5 border border-yellow-500/20 px-2 py-0.5 rounded-md animate-pulse">
                    + Hyper Turbo compile (60fps)
                  </span>
                )}
              </div>
            </div>

            {/* Visual Workflow Steps Path Bar */}
            <div className="bg-slate-900/60 border border-white/5 p-4 rounded-xl space-y-3 relative z-10 w-full">
              <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-widest block font-mono">Pipeline Path Indicator</span>
              <div className="grid grid-cols-4 gap-2 text-center text-[9px] font-mono font-bold">
                {milestones.map((ms, idx) => {
                  const state = idx === activeMilestoneIndex ? 'active' : (idx < activeMilestoneIndex ? 'passed' : 'pending');
                  return (
                    <div 
                      key={ms.id} 
                      onClick={() => setActiveMilestoneIndex(idx)}
                      className={`p-2.5 rounded-lg border transition-all duration-300 cursor-pointer ${
                        state === 'active' ? 'bg-amber-500/10 border-amber-400 text-amber-300 shadow-md shadow-amber-500/5 scale-[1.03]' : 
                        state === 'passed' ? 'bg-slate-900 border-indigo-500/30 text-indigo-300 opacity-80' : 
                        'bg-slate-950 border-white/5 text-slate-650 opacity-50 hover:opacity-100'
                      }`}
                    >
                      <div className="font-mono text-[8px] text-slate-400 mb-0.5">0{ms.id}</div>
                      <div className="truncate text-[9px]">{ms.name}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Simulated Live Compilation Speed and Target VM Latency Data */}
            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-[#777]">
              <div className="flex items-center space-x-2">
                <Activity className="w-3.5 h-3.5 text-amber-500" />
                <span className="font-sans">Compilation Engine status: <strong className="text-slate-300 font-bold">{isTurboEnabled ? '99.8% Optimized' : 'Standard 1x'}</strong></span>
              </div>
              <div className="font-mono text-indigo-400">
                100% Client-Owned
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Telemetry Monitor terminal */}
        <div className="bg-slate-950 rounded-xl border border-white/5 p-4 font-mono text-left shadow-lg">
          <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
            <div className="flex items-center space-x-2">
              <Terminal className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-[10px] font-mono font-bold text-slate-400">MAESTRO_TELEMETRY_SHELL</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
              <span className="text-[9px] text-[#555] font-mono uppercase tracking-widest font-black">Ready</span>
            </div>
          </div>
          
          <div className="pt-3 max-h-[110px] overflow-y-auto space-y-1.5 text-[10px] text-zinc-400 font-mono custom-scrollbar">
            {logs.length === 0 ? (
              <div className="text-zinc-650 leading-relaxed italic">Interactive logs will stream here as we adjust parameters...</div>
            ) : (
              logs.map((log, lIdx) => {
                let colorClass = "text-zinc-400";
                if (log.includes("SUCCESS")) colorClass = "text-emerald-400 font-bold";
                if (log.includes("Reset")) colorClass = "text-slate-500 leading-normal";
                return (
                  <div key={lIdx} className={`font-mono flex items-start gap-1 leading-normal ${colorClass}`}>
                    <span className="text-amber-500 grow-0 shrink-0 select-none">❯</span>
                    <span className="break-all">{log}</span>
                  </div>
                );
              })
            )}

            {/* Stage sub-logs corresponding to current stage */}
            {milestones[activeMilestoneIndex].logs.map((sl, index) => (
              <div key={`sub-${index}`} className="font-mono text-[9px] text-indigo-300 flex items-start gap-1 opacity-85 leading-normal">
                <span className="text-indigo-400 grow-0 shrink-0 select-none">~</span>
                <span>{sl}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

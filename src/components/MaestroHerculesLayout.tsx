import React, { useState } from 'react';
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
  Lock
} from 'lucide-react';

interface MaestroHerculesLayoutProps {
  initialEstateName: string;
}

export const MaestroHerculesLayout: React.FC<MaestroHerculesLayoutProps> = ({ 
  initialEstateName 
}) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      id: 1,
      name: "Blueprint Blueprinting",
      subtitle: "Parsing specifications and semantic blueprints",
      coreFile: "blueprint-ast.json",
      status: "Verified",
      desc: "Translates human-spoken natural prompts into an advanced modular blueprint mapping file (blueprint-app.json). Validated against standard validation schemas.",
      telemetry: [
        "Raw intent mapped: 'Create clean dashboard with a full database pipeline'",
        "Compiling state managers...",
        "Validating package boundaries inside sandbox runtime"
      ]
    },
    {
      id: 2,
      name: "Isolate Cloud Containers",
      subtitle: "Securing private computing space",
      coreFile: "sandbox-isolated-vm.sh",
      status: "Encrypted",
      desc: "Deploys a lightweight developer environment using cloud sandbox containers. The database sits in an isolated VPC partitioned specifically for your user keys.",
      telemetry: [
        "Spawning isolated docker partition under port 3000...",
        "Assigning host 0.0.0.0 ingress paths to reverse proxy",
        "Configuring security shield: Aegis Core"
      ]
    },
    {
      id: 3,
      name: "Establish Cryptographic Deeds",
      subtitle: "Injecting SSL certificate and locks",
      coreFile: "ssl-handshake-cert.crt",
      status: "Protected",
      desc: "Binds the digital app housing to a customized domain with automated Stripe payment triggers. Assures zero closed proprietary locks exist.",
      telemetry: [
        "Generating TLS certificate chains...",
        "Locking domain deed to cryptographic signature wallet",
        "SSL keys declared successfully"
      ]
    },
    {
      id: 4,
      name: "Handover Digital Real Estate",
      subtitle: "Syncing final full-stack assets",
      coreFile: "sovereign-manifest-app.zip",
      status: "Delivered",
      desc: "Transfers the compiled webapp bundle directly back to the constructor. Provides immediate download permissions alongside live persistent staging keys.",
      telemetry: [
        "Structuring build output into standard dist/ static files",
        "Assembling zip download matrix...",
        "Staging live dashboard ready for operational access."
      ]
    }
  ];

  return (
    <div id="maestro-hercules-main" className="space-y-16 py-6 md:py-12 animate-fade-in relative z-10 text-left">
      
      {/* 1. ARCHITECT HEADER */}
      <section className="text-center max-w-4xl mx-auto space-y-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-amber-500/25 bg-amber-500/10 text-amber-400 text-xs font-semibold tracking-wide uppercase">
          <Layers className="w-3.5 h-3.5 mr-0.5 animate-pulse" />
          <span>Hercules Clean-Flow Layout Mode</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
          Spacious. Modular. Linear.<br />
          <span className="bg-gradient-to-r from-amber-400 via-yellow-250 to-amber-500 bg-clip-text text-transparent font-sans">
            Junior Architect Core Focus
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-slate-400 font-normal leading-relaxed max-w-2xl mx-auto">
          A design methodology tailored for precise alignment of modular assets. Observe each segment of the compilation pathway unfold in crystal-clear sequential order.
        </p>
      </section>

      {/* 2. HERCULES TIMELINE BLOCK */}
      <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Progress Pipeline Flow (Left 5 cols) */}
        <div className="md:col-span-5 space-y-4">
          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block">Pipeline Milestones</span>
          
          <div className="space-y-3 relative border-l border-white/5 pl-4 ml-2">
            {steps.map((step, idx) => {
              const isSelected = idx === activeStep;
              return (
                <div 
                  key={step.id}
                  onClick={() => setActiveStep(idx)}
                  className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer text-left relative ${
                    isSelected 
                      ? "bg-amber-500/10 border-amber-500/30 text-white translate-x-2 shadow-[0_0_15px_rgba(245,158,11,0.05)]" 
                      : "bg-slate-900/40 border-white/5 text-slate-400 hover:border-white/10"
                  }`}
                >
                  {/* Indicator bullet */}
                  <div className={`absolute -left-[21px] top-[22px] w-2.5 h-2.5 rounded-full border border-slate-950 flex items-center justify-center transition-colors ${
                    isSelected ? "bg-amber-400 scale-125" : "bg-slate-800"
                  }`} />

                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] uppercase font-black text-amber-500">Milestone 0{step.id}</span>
                    <span className="text-[8px] bg-slate-950 border border-white/5 px-1.5 py-0.5 rounded text-slate-500 font-mono tracking-wider">{step.status}</span>
                  </div>
                  <h4 className="text-sm font-bold mt-1 text-slate-100">{step.name}</h4>
                  <p className="text-[11px] text-slate-450 mt-0.5">{step.subtitle}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Detail Card (Right 7 cols) */}
        <div className="md:col-span-7 bg-slate-900/60 p-6 md:p-8 rounded-3xl border border-white/5 relative overflow-hidden space-y-6 flex flex-col justify-between h-full min-h-[420px]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-2xl rounded-full pointer-events-none" />

          {/* Header info of active step */}
          <div className="space-y-2 border-b border-white/5 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-amber-400">
                <Compass className="w-4 h-4" />
                <span className="font-mono text-[10px] font-black uppercase tracking-widest text-amber-400">Section Analysis</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono font-bold font-sans">Scope Key: {steps[activeStep].coreFile}</span>
            </div>
            
            <h3 className="text-lg font-black text-white">{steps[activeStep].name}</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">{steps[activeStep].desc}</p>
          </div>

          {/* Telemetry Logger */}
          <div className="bg-slate-950/90 border border-white/5 rounded-xl p-4 font-mono space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <span className="text-[10px] text-slate-500 font-bold">MIL_SECURE_LOGGER (live telemetry)</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            
            <div className="space-y-1.5 pt-1 text-[9px] text-slate-400">
              {steps[activeStep].telemetry.map((line, lIdx) => (
                <div key={lIdx} className="flex items-start gap-1">
                  <span className="text-amber-500 shrink-0">~</span>
                  <span>{line}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[10px] font-mono text-slate-500">Verification Rate: 100% (Absolute Ownership)</span>
            </div>
            
            <button
              onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
              className="text-[10px] font-bold text-white bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 hover:border-amber-500/50 px-3.5 py-1.5 rounded-lg font-sans uppercase tracking-wider transition-colors cursor-pointer"
            >
              Analyze Next Milestone
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};

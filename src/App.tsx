import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Globe,
  Zap,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Loader2,
  LayoutDashboard,
  Shield,
  Coins,
  DollarSign,
  Plus,
  Compass,
  Key,
  Database,
  Sliders,
  Check,
  Building,
  Cpu,
  LogOut,
  Sparkles,
  Info,
  ChevronRight,
  User,
  ShieldCheck,
  Activity,
  Server,
  Play,
  Settings,
  Grid,
  CreditCard,
  BookOpen,
  HelpCircle,
  MessageSquare,
  MessageCircle,
  Send,
  Heart,
  Store,
  Sprout,
  Award,
  Archive
} from 'lucide-react';
import { MatrixTerminalGlitchText } from './components/MatrixTerminalGlitchText';
import { SymphonyEmphasizedLayout } from './components/SymphonyEmphasizedLayout';
import { MaestroHerculesLayout } from './components/MaestroHerculesLayout';
import { MaestroDashboard } from './components/MaestroDashboard';
import { TokenizationLedgerLayout } from './components/TokenizationLedgerLayout';
import { SplitWorkspace } from './components/SplitWorkspace';

interface GatewayEngine {
  id: string;
  title: string;
  hook: string;
  symphonyGreeting: string;
}

const gatewayMatrix: GatewayEngine[] = [
  {
    id: 'symphony',
    title: 'Symphony AI',
    hook: 'The automated high-performance App Generator for creators.',
    symphonyGreeting: 'Hello! I am Symphony AI, your automated, high-performance App Generator for creators. Tell me what type of application you would like to build today, and I will instantly lay out a beautiful, functional blueprint, layout pattern, or component prototype for you on the very first turn!'
  }
];

interface AINode {
  id: string;
  name: string;
  model: string;
  status: 'active' | 'provisioning' | 'paused';
  creditsConsumed: number;
  created: string;
}

export default function App() {
  // Navigation View: 'landing' | 'checkout' | 'dashboard'
  const [view, setView] = useState<'landing' | 'checkout' | 'dashboard'>('landing');

  // Dynamic hostname-based layout switching and manual admin override
  const [currentHost] = useState(() => {
    try {
      return window.location.hostname || '';
    } catch {
      return '';
    }
  });

  const [currentPath] = useState(() => {
    try {
      return window.location.pathname || '/';
    } catch {
      return '/';
    }
  });

  const [overrideLayout, setOverrideLayoutState] = useState<'symphony' | 'maestro' | 'tokenization' | 'default' | null>(() => {
    try {
      const saved = localStorage.getItem('kingdom_layout_override');
      return (saved as any) || null;
    } catch {
      return null;
    }
  });

  const setOverrideLayout = (val: 'symphony' | 'maestro' | 'tokenization' | 'default' | null) => {
    setOverrideLayoutState(val);
    try {
      if (val) {
        localStorage.setItem('kingdom_layout_override', val);
      } else {
        localStorage.removeItem('kingdom_layout_override');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const activeLayout = (() => {
    if (overrideLayout) return overrideLayout;
    if (currentHost.includes('symphoniaiapps.com')) return 'symphony';
    if (currentHost.includes('maestroaiapps.com')) return 'maestro';
    if (currentHost.includes('tokenizationaiapps.com')) return 'tokenization';
    return 'default';
  })();

  // Domain search state
  const [domain, setDomain] = useState('');
  const [searchResult, setSearchResult] = useState<{ checked: string; available: boolean; message: string } | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Billing top-up state
  const [selectedTopUp, setSelectedTopUp] = useState<number>(0); // Default to $0 (Starter Pack)
  const [showTooltip, setShowTooltip] = useState(false);
  const [affiliateCopied, setAffiliateCopied] = useState(false);
  
  // Accordion faq index and low-profile cookie compliance states
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [cookieConsent, setCookieConsent] = useState(() => {
    try {
      const saved = localStorage.getItem('kingdom_cookie_consent');
      return saved === 'true';
    } catch {
      return false;
    }
  });

  // Symphony floating orchestrator engine state
  const [selectedEngineId, setSelectedEngineId] = useState('symphony');
  const activeEngine = gatewayMatrix.find(e => e.id === selectedEngineId) || gatewayMatrix[0];

  // Symphony floating orchestrator chat states
  const [isSymphonyOpen, setIsSymphonyOpen] = useState(false);
  const [symphonyInput, setSymphonyInput] = useState('');
  const [isSymphonyTyping, setIsSymphonyTyping] = useState(false);
  const [symphonyMessages, setSymphonyMessages] = useState<Array<{ sender: 'user' | 'symphony'; text: string; timestamp: Date }>>([
    {
      sender: 'symphony',
      text: gatewayMatrix[0].symphonyGreeting,
      timestamp: new Date()
    }
  ]);

  // User digital estate configuration
  const [customDomain, setCustomDomain] = useState('genesis');
  const [estateName, setEstateName] = useState('My First Kingdom');
  const [initialNodeName, setInitialNodeName] = useState('Aegis-I');
  const [userEmail, setUserEmail] = useState('');

  // Admin and Developer Simulation state
  const ADMIN_EMAIL_IDENTITY = 'pswilliamh@gmail.com';
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      if (window.location.pathname === '/03master-06control-09panel') {
        return true;
      }
      const cached = localStorage.getItem('kingdom_admin_mode');
      return cached === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (currentPath === '/03master-06control-09panel') {
      setIsAdmin(true);
    }
  }, [currentPath]);
  const [devSimulationMode, setDevSimulationMode] = useState(true); // Default to true for easy validation and testing
  const [isCleanFlow, setIsCleanFlow] = useState(false);
  const [firestoreWriteStatus, setFirestoreWriteStatus] = useState<string>('');

  // Auto-detect testing admin identity from typed email address
  useEffect(() => {
    const isTestIdent = userEmail.toLowerCase().trim() === ADMIN_EMAIL_IDENTITY;
    if (isTestIdent) {
      setIsAdmin(true);
      try {
        localStorage.setItem('kingdom_admin_mode', 'true');
      } catch (e) {
        console.error(e);
      }
    }
  }, [userEmail]);

  // Active User session values
  const [userCredits, setUserCredits] = useState<number>(5000); // Default to starting pack (5000 credits)
  const [hasPaidFee, setHasPaidFee] = useState(false);
  const [nodes, setNodes] = useState<AINode[]>([
    {
      id: 'node-1',
      name: 'Aegis-I',
      model: 'Sovereign Llama 3',
      status: 'active',
      creditsConsumed: 240,
      created: '2026-05-26 11:30'
    }
  ]);

  // Simulated node query tool states
  const [selectedNodeId, setSelectedNodeId] = useState('node-1');
  const [nodeQuery, setNodeQuery] = useState('');
  const [nodeResponse, setNodeResponse] = useState('');
  const [isQuerying, setIsQuerying] = useState(false);

  // Domain verification helper
  const handleDomainCheck = (e: FormEvent) => {
    e.preventDefault();
    if (!domain) return;
    setIsSearching(true);
    setSearchResult(null);

    setTimeout(() => {
      setIsSearching(false);
      const isAvailable = domain.length >= 4 && !domain.includes('google') && !domain.includes('apple');
      setSearchResult({
        checked: domain,
        available: isAvailable,
        message: isAvailable
          ? `"${domain}.kingdomaiapps.com" is available to claim!`
          : `"${domain}.kingdomaiapps.com" is already registered or reserved.`,
      });
    }, 800);
  };

  const handleSendSymphony = (e: FormEvent) => {
    e.preventDefault();
    if (!symphonyInput.trim() || isSymphonyTyping) return;
    
    const userMsg = symphonyInput.trim();
    setSymphonyInput('');
    setSymphonyMessages(prev => [...prev, { sender: 'user', text: userMsg, timestamp: new Date() }]);
    setIsSymphonyTyping(true);
    
    setTimeout(() => {
      setIsSymphonyTyping(false);
      
      let replyText = "";
      const lower = userMsg.toLowerCase();
      
      if (lower.includes('podcast') || lower.includes('text-to-speech') || lower.includes('speech') || lower.includes('audio')) {
        replyText = `### Symphony AI Audio Engine — Premium Podcast Generator Blueprint

I have generated an instant layout pattern for your **VoiceCast (Text-to-Speech Podcast App)**:

\`\`\`tsx
import React, { useState } from 'react';
import { Play, Pause, Disc, Volume2, Sparkles, Mic, FileText } from 'lucide-react';

export default function VoiceCastApp() {
  const [script, setScript] = useState("Welcome to today's episode. Today we dive deep into...");
  const [voiceSelected, setVoiceSelected] = useState("Aura-Serene");
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="max-w-4xl mx-auto bg-[#0a0f1d] text-white rounded-3xl p-6 border border-violet-500/10 shadow-2xl space-y-6">
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-violet-600/20 rounded-xl border border-violet-500/20 text-violet-400">
            <Mic className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">VoiceCast Studio</h1>
            <p className="text-xs text-slate-400">Interactive podcast and narration generator</p>
          </div>
        </div>
        <span className="text-xs bg-slate-900 px-3 py-1 rounded-full border border-white/5 text-violet-300 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" /> High Fidelity Mode
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Podcast Script Description</label>
          <textarea
            value={script}
            onChange={(e) => setScript(e.target.value)}
            className="w-full h-48 bg-slate-950 border border-white/10 rounded-2xl p-4 text-xs font-sans text-white focus:border-violet-500 outline-none leading-relaxed resize-none"
          />
        </div>

        <div className="bg-slate-950/60 rounded-2xl border border-white/5 p-5 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Voice Persona Configuration</span>
            <div className="grid grid-cols-2 gap-2">
              {['Aura-Serene', 'Nova-Energetic', 'Sage-Narrator', 'Echo-Symmetric'].map(voice => (
                <button
                  key={voice}
                  onClick={() => setVoiceSelected(voice)}
                  className={\`p-3 rounded-xl border text-xs font-medium text-left transition-all \${
                    voiceSelected === voice 
                      ? 'bg-violet-600/25 border-violet-500 text-white' 
                      : 'bg-slate-900/40 border-white/5 text-slate-400 hover:text-white'
                  }\`}
                >
                  {voice}
                </button>
              ))}
            </div>
            
            <div className="bg-slate-900/80 rounded-xl p-3 border border-white/5 flex items-center gap-3">
              <Disc className={\`w-5 h-5 text-violet-400 \${isPlaying ? 'animate-spin' : ''}\`} />
              <div className="flex-1 min-w-0">
                <span className="text-xs font-semibold block text-slate-200">Current Compilation Wave</span>
                <span className="text-[10px] text-slate-500 font-mono block truncate">44.1 kHz • Stereo • Float32</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex-1 bg-violet-600 hover:bg-violet-500 text-white px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlaying ? "Pause Stream" : "Synthesize Podcast"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
\`\`\`

*This layout has been fully optimized for creators. It provides clear script input, dynamic voice selector controls, and ambient state handling.*`;
      } else if (lower.includes('dashboard') || lower.includes('analytics') || lower.includes('admin') || lower.includes('chart')) {
        replyText = `### Symphony AI Analytics Layout — High-Performance Dashboard Pattern

Here is an elegant dashboard blueprint generated instantly for your analytics dashboard:

\`\`\`tsx
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, DollarSign, Zap } from 'lucide-react';

const stats = [
  { label: "Active Revenue", value: "$48,259", change: "+14.2%", icon: DollarSign, color: "text-emerald-400" },
  { label: "Creative Users", value: "12,948", change: "+22.5%", icon: Users, color: "text-violet-400" },
  { label: "Generation Tasks", value: "842,102", change: "+35.1%", icon: Zap, color: "text-amber-400" },
];

export default function AnalyticsDashboard() {
  return (
    <div className="bg-[#090d16] text-white p-6 rounded-3xl border border-white/5 shadow-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold tracking-tight">Analytics Command Hub</h2>
          <p className="text-xs text-slate-400">Real-time performance metrics</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-slate-950/60 p-4 rounded-2xl border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">{stat.label}</span>
              <stat.icon className={\`w-4 h-4 \${stat.color}\`} />
            </div>
            <div className="flex items-end justify-between">
              <span className="text-xl font-bold">{stat.value}</span>
              <span className="text-xs text-emerald-400 flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
\`\`\`

*This blueprint features elegant, low-profile status card grids paired with a clean dark-canvas aesthetic that represents information in perfect, clean density.*`;
      } else if (lower.includes('todo') || lower.includes('task') || lower.includes('list') || lower.includes('checklist')) {
        replyText = `### Symphony AI Productivity Blueprint — High-Performance Task Manager Pattern

Here is an elegant, minimal user interface boilerplate crafted instantly for task list applications:

\`\`\`tsx
import React, { useState } from 'react';
import { Check, Trash2, Plus, Sparkles } from 'lucide-react';

export default function AppTodoList() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Design high-fidelity custom interface layout", done: true },
    { id: 2, text: "Refactor response handlers inside core engine", done: false },
  ]);

  return (
    <div className="max-w-md mx-auto bg-slate-950 p-6 rounded-3xl border border-white/5 shadow-2xl space-y-4">
      <h3 className="text-md font-bold tracking-tight text-white flex items-center gap-1.5">
        <Sparkles className="w-4 h-4 text-violet-400" /> Task Planner
      </h3>
      
      <div className="space-y-2">
        {tasks.map(t => (
          <div key={t.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
            <span className={\`text-xs \${t.done ? 'line-through text-slate-500' : 'text-slate-200'}\`}>
              {t.text}
            </span>
            <button className="text-slate-400 hover:text-red-400 transition-colors">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
\`\`\`

*This checklist incorporates comfortable margins, subtle element borders, and high contrast typography tailored for peak focus.*`;
      } else if (lower.includes('domain') || lower.includes('claim') || lower.includes('register') || lower.includes('subdomain')) {
        replyText = "Hello! Symphony AI can assist you in generating custom front-end landing pages, portfolio structures, or application components. Your custom subdomains map seamlessly to your completed visual estate patterns instantly.";
      } else if (lower.includes('fuel') || lower.includes('credit') || lower.includes('power')) {
        replyText = "Symphony App Generator status: Generation credits provide direct computational power to your code build modules. These are allocated immediately to your profile so you can instantly design apps.";
      } else if (lower.includes('code') || lower.includes('ownership') || lower.includes('data')) {
        replyText = "Intellectual property policy: You retain 100% absolute, non-revocable ownership over all generated data vectors and code files. Symphony keeps zero proprietary locks on your custom assets.";
      } else if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
        replyText = "Hello! I am Symphony AI, your automated, high-performance App Generator for creators. Tell me what type of application you would like to build today (e.g., a text-to-speech podcast app, a task planner, or a creative portfolio), and I will instantly assemble the blueprint and custom styling components for you on the very first turn!";
      } else if (lower.includes('symphony') || lower.includes('who are you') || lower.includes('live orchestrator')) {
        replyText = "You are speaking to Symphony AI, an automated, high-performance App Generator for creators. My role is to serve visiting users instantly and deliver finished layouts, interactive components, and clean React code directly to creators with zero technical complications.";
      } else {
        replyText = `### Symphony AI Custom Blueprint — Layout Pattern Generated Instantly

I have assembled a beautiful visual component pattern based on your inquiry (**"${userMsg}"**):

\`\`\`tsx
import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function GeneratedProductCard() {
  return (
    <div className="p-6 bg-gradient-to-br from-slate-900 to-indigo-950/40 border border-violet-500/10 rounded-2xl shadow-xl flex flex-col justify-between space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase font-bold tracking-widest text-violet-400">AI Blueprint V1.0</span>
        <Sparkles className="w-4 h-4 text-violet-400 animate-pulse" />
      </div>
      <div>
        <h4 className="text-md font-bold text-white tracking-tight">Interactive Creative Module</h4>
        <p className="text-xs text-slate-300 leading-relaxed mt-1">
          A bespoke visual interface component assembled to fit your customized request. Highly modular, clean, and styled with high-contrast elements.
        </p>
      </div>
      <button className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs py-2 rounded-xl flex items-center justify-center gap-1.5 transition-colors">
        <span>Proceed with Build</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
\`\`\`

*This layout has been successfully synthesized. It focuses on beautiful typography paired with comfortable padding and high-contrast color highlights to draw visual rhythm.*`;
      }
      
      setSymphonyMessages(prev => [...prev, { sender: 'symphony', text: replyText, timestamp: new Date() }]);
    }, 1200);
  };

  const topUpOptions = [
    { amount: 5, credits: 5000, creditsFormatted: "5,000", bonus: "Starter pack" },
    { amount: 10, credits: 11000, creditsFormatted: "11,000", bonus: "+10% bonus value" },
    { amount: 15, credits: 17500, creditsFormatted: "17,500", bonus: "+16% popular choice" },
    { amount: 20, credits: 25000, creditsFormatted: "25,000", bonus: "+25% best utility" },
  ];

  // Dynamic values based on selections
  const selectedCredits = selectedTopUp === 0 ? 0 : (topUpOptions.find(o => o.amount === selectedTopUp)?.credits || 0);
  const selectedCreditsFormatted = selectedTopUp === 0 ? "0" : (topUpOptions.find(o => o.amount === selectedTopUp)?.creditsFormatted || "0");

  // Checkout process simulation steps
  const [checkoutStep, setCheckoutStep] = useState<number>(0); // 0: Config/Form, 1: Loading Provisioning, 2: Success Splash
  const [provisioningLogs, setProvisioningLogs] = useState<string[]>([]);
  const [currLogIndex, setCurrLogIndex] = useState(0);
  const [provisioningTime, setProvisioningTime] = useState<number>(0);
  const [appEstatePayload, setAppEstatePayload] = useState<any>(null);

  // Custom states for Orchestration Terminal animations
  const [typedCode, setTypedCode] = useState('');
  const [compiledFilesCount, setCompiledFilesCount] = useState(0);

  // States for the main landing page Orchestration terminal demo
  const [terminalActiveStep, setTerminalActiveStep] = useState(0);
  const [terminalTypedPrompt, setTerminalTypedPrompt] = useState('');
  const [terminalChecklistCount, setTerminalChecklistCount] = useState(0);
  const [terminalFrameLoaded, setTerminalFrameLoaded] = useState(false);

  // Typed prompt simulator for Orchestration Terminal Step 0
  useEffect(() => {
    if (terminalActiveStep === 0) {
      setTerminalTypedPrompt('');
      const targetPrompt = "Build a real-time chess platform with secure cryptographic vaults and independent database nodes...";
      let curr = 0;
      const t = setInterval(() => {
        if (curr <= targetPrompt.length) {
          setTerminalTypedPrompt(targetPrompt.substring(0, curr));
          curr++;
        } else {
          clearInterval(t);
        }
      }, 30);
      return () => clearInterval(t);
    }
  }, [terminalActiveStep]);

  // Stagger sequence for Orchestration Terminal Step 1
  useEffect(() => {
    if (terminalActiveStep === 1) {
      setTerminalChecklistCount(0);
      const interval = setInterval(() => {
        setTerminalChecklistCount(prev => {
          if (prev < 5) return prev + 1;
          clearInterval(interval);
          return prev;
        });
      }, 150); // fast 150ms delay stagger fade-in as requested
      return () => clearInterval(interval);
    }
  }, [terminalActiveStep]);

  // Preview frame load delay for Step 2
  useEffect(() => {
    if (terminalActiveStep === 2) {
      setTerminalFrameLoaded(false);
      const t = setTimeout(() => {
        setTerminalFrameLoaded(true);
      }, 600);
      return () => clearTimeout(t);
    }
  }, [terminalActiveStep]);

  // Automatic advance cycle for the Orchard terminal demo
  useEffect(() => {
    const mainTimer = setInterval(() => {
      setTerminalActiveStep(prev => (prev + 1) % 3);
    }, 8000); // 8 seconds per demo step
    return () => clearInterval(mainTimer);
  }, []);

  useEffect(() => {
    if (checkoutStep === 1) {
      setTypedCode('');
      const fullText = `// Building src/components/SymphonyApp.tsx...\nimport React from "react";\nimport { Sparkles } from "lucide-react";\n\nexport const SymphonyApp: React.FC = () => {\n  return (\n    <div className="p-6 bg-slate-950 border border-violet-500/10 rounded-2xl shadow-xl">\n      <h3 className="font-bold text-sm text-white">Symphony App Built!</h3>\n      <p className="text-xs text-slate-400 mt-1">Instant layout custom generated designed for creators.</p>\n    </div>\n  );\n};`;
      let currentIdx = 0;
      const t = setInterval(() => {
        if (currentIdx < fullText.length) {
          setTypedCode(fullText.substring(0, currentIdx + 2));
          currentIdx += 2;
        } else {
          clearInterval(t);
        }
      }, 15);
      return () => clearInterval(t);
    } else {
      setTypedCode('');
    }
  }, [checkoutStep]);

  useEffect(() => {
    if (checkoutStep === 1) {
      setCompiledFilesCount(0);
      const interval = setInterval(() => {
        setCompiledFilesCount(prev => {
          if (prev < 6) {
            return prev + 1;
          } else {
            clearInterval(interval);
            return prev;
          }
        });
      }, 650); // Stagger files over the 5 second period
      return () => clearInterval(interval);
    } else {
      setCompiledFilesCount(0);
    }
  }, [checkoutStep]);

  const stepsLogs = [
    "Spinning up micro-VM sandboxed isolation chamber...",
    "Allocating sovereign cryptographic name routing...",
    "Injecting secure localized API gateways...",
    "Registering domain lock entry records on Kingdom.aiapps register...",
    "Provisioning deep neural node Aegis-I...",
    "Seeding initial fuel transaction payload...",
    "Estate successfully isolated and anchored!"
  ];

  // Start checkout estate synthesis
  const handleStartProvisioning = () => {
    const targetEmail = userEmail || 'pswilliamh@gmail.com';
    const targetDomain = `${domain || 'genesis'}.kingdomaiapps.com`;
    const targetAssistantName = initialNodeName || 'Aegis-I';

    const payload = {
      ownerEmail: targetEmail,
      sovereignDomain: targetDomain,
      appAssistantName: targetAssistantName,
      creditEnergyBalance: 5000,
      deploymentStatus: 'provisioning' as const
    };

    setAppEstatePayload(payload);
    setProvisioningTime(0);
    setCheckoutStep(1);

    if (devSimulationMode) {
      setFirestoreWriteStatus(`[MOCK FIRESTORE WRITE INITIALIZED] Staging document payload to 'app_estates' with isolation hashes. Transitioning credentials in simulated memory partition...`);
    } else {
      setFirestoreWriteStatus('');
    }
  };

  // Timer loop for Success Redirection Canvas (0-5 seconds)
  useEffect(() => {
    if (checkoutStep === 1) {
      const interval = setInterval(() => {
        setProvisioningTime(prev => {
          if (prev < 5) {
            const nextSec = prev + 1;
            setAppEstatePayload((currentPayload: any) => {
              if (!currentPayload) return null;
              return {
                ...currentPayload,
                deploymentStatus: nextSec >= 5 ? 'active' : 'provisioning'
              };
            });
            return nextSec;
          } else {
            clearInterval(interval);
            return prev;
          }
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [checkoutStep]);

  // Transition to Step 2 when timer reaches 5 seconds
  useEffect(() => {
    if (checkoutStep === 1 && provisioningTime === 5) {
      const timer = setTimeout(() => {
        setHasPaidFee(true);
        const topUpPack = topUpOptions.find(o => o.amount === selectedTopUp);
        const newCredits = 5000 + (selectedTopUp === 0 ? 0 : (topUpPack ? topUpPack.credits : 0));
        setUserCredits(newCredits);
        
        setNodes([
          {
            id: 'node-1',
            name: initialNodeName || 'Aegis-I',
            model: 'Sovereign Llama 3',
            status: 'active',
            creditsConsumed: 0,
            created: new Date().toISOString().slice(0, 16).replace('T', ' ')
          }
        ]);
        setCustomDomain(domain || 'genesis');
        
        setFirestoreWriteStatus(`[MOCK FIRESTORE WRITE] Committed payload dynamically to 'app_estates/pswilliamh-genesis' mapping isolated schema keys of ${initialNodeName || 'Aegis-I'}. Verification status: Stable 200 OK.`);
        setCheckoutStep(2);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [checkoutStep, provisioningTime]);

  // Dashboard state tabs
  const [dashboardTab, setDashboardTab] = useState<'overview' | 'nodes' | 'billing' | 'settings'>('overview');

  // Node Creator dynamic form state
  const [newNodeName, setNewNodeName] = useState('');
  const [newNodeModel, setNewNodeModel] = useState('Sovereign Llama 3');
  const [isCreatingNode, setIsCreatingNode] = useState(false);

  const handleCreateNode = (e: FormEvent) => {
    e.preventDefault();
    if (!newNodeName.trim()) return;

    setIsCreatingNode(true);
    setTimeout(() => {
      const newNode: AINode = {
        id: `node-${Date.now()}`,
        name: newNodeName,
        model: newNodeModel,
        status: 'active',
        creditsConsumed: 0,
        created: new Date().toISOString().slice(0, 16).replace('T', ' ')
      };

      setNodes(prev => [...prev, newNode]);
      setNewNodeName('');
      setIsCreatingNode(false);
      // Automatically switch query node selector
      setSelectedNodeId(newNode.id);
    }, 1200);
  };

  // Run a prompt interface that consumes simulated credits
  const handleQueryNode = (e: FormEvent) => {
    e.preventDefault();
    if (!nodeQuery.trim() || isQuerying || userCredits < 100) return;

    setIsQuerying(true);
    setNodeResponse('');

    const activeNode = nodes.find(n => n.id === selectedNodeId);
    
    setTimeout(() => {
      setIsQuerying(false);
      setUserCredits(prev => Math.max(0, prev - 120));
      setNodes(prev => prev.map(n => n.id === selectedNodeId ? { ...n, creditsConsumed: n.creditsConsumed + 120 } : n));
      
      const responses: Record<string, string> = {
        hello: `Estate authority node [${activeNode?.name}] online. Scanning boundary configurations... All secure.`,
        status: `Sovereign network healthy. Current domain anchor registered to [${customDomain}.kingdomaiapps.com]. Property taxes remain fully pre-paid.`,
        estate: `Analyzing domain space. We have mapped 100% boundary coordinates. Node [${activeNode?.name}] is ready for background execution.`,
        manifest: `Compiling neural blueprints. Manifesting intelligent protocols... Success. The domain space handles traffic flawlessly.`,
      };

      const queryLower = nodeQuery.toLowerCase();
      let match = responses.status;
      if (queryLower.includes('hello') || queryLower.includes('hi')) match = responses.hello;
      else if (queryLower.includes('estate') || queryLower.includes('domain')) match = responses.estate;
      else if (queryLower.includes('manifest') || queryLower.includes('create') || queryLower.includes('agent')) match = responses.manifest;
      
      setNodeResponse(match);
      setNodeQuery('');
    }, 1000);
  };

  // Moving star particle background effect
  useEffect(() => {
    const canvas = document.getElementById('star-particles-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Array<{
      x: number;
      y: number;
      size: number;
      speed: number;
      opacity: number;
      twinkleSpeed: number;
      color: string;
    }> = [];

    const initStars = (width: number, height: number) => {
      stars = [];
      for (let i = 0; i < 50; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.5 + 0.5,
          speed: Math.random() * 0.15 + 0.05, // slow downward drift
          opacity: Math.random(),
          twinkleSpeed: Math.random() * 0.015 + 0.005,
          color: Math.random() > 0.4 ? '#ffffff' : '#a5b4fc', // white or light indigo
        });
      }
    };

    const handleResize = () => {
      const parent = canvas.parentElement;
      const width = parent ? parent.clientWidth : window.innerWidth;
      const height = parent ? parent.scrollHeight : window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initStars(width, height);
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });

    const parent = canvas.parentElement;
    if (parent) {
      resizeObserver.observe(parent);
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        
        star.opacity += star.twinkleSpeed;
        if (star.opacity > 1 || star.opacity < 0.1) {
          star.twinkleSpeed = -star.twinkleSpeed;
        }
        
        ctx.fillStyle = star.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(1, star.opacity));
        ctx.fill();

        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });
      
      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-violet-500/30 overflow-hidden relative workspace-canvas">
      
      {/* GLOBAL BACKGROUND GLOWS WITH INTERACTIVE PARTICLE CANVAS */}
      <canvas id="star-particles-canvas" className="absolute top-0 left-0 w-full h-full pointer-events-none z-0" />
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* LAYER 1: THE TRANSLUCENT GLOBAL TERRITORY GRID MAP AND PULSING NODES */}
      <div className="absolute inset-0 z-0 pointer-events-none global-territory-grid">
        {/* Subtle coordinate mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.035)_1.5px,transparent_1.5px)] bg-[size:32px_32px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:128px_128px]" />
        
        {/* Pulsing state points representing distributed App-Estates */}
        <div className="absolute top-1/4 left-1/4 w-3.5 h-3.5 rounded-full bg-violet-500/30 shadow-[0_0_15px_rgba(139,92,246,0.5)] animate-pulse" />
        <div className="absolute top-1/3 left-2/3 w-3 h-3 rounded-full bg-indigo-500/40 shadow-[0_0_12px_rgba(99,102,241,0.6)] animate-pulse" />
        <div className="absolute top-2/3 left-1/3 w-2.5 h-2.5 rounded-full bg-emerald-500/40 shadow-[0_0_14px_rgba(16,185,129,0.7)] animate-pulse" />
        <div className="absolute top-3/4 left-3/4 w-4 h-4 rounded-full bg-indigo-400/30 shadow-[0_0_16px_rgba(129,140,248,0.5)] animate-pulse font-mono flex items-center justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
        </div>
        <div className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full bg-violet-400/30 shadow-[0_0_20px_rgba(167,139,250,0.6)] animate-pulse" />
        
        {/* Coordinate orbital loops */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-violet-500/5 animate-[spin_80s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-indigo-500/5 animate-[spin_120s_linear_infinite]" />
      </div>

      {/* LAYER 2: CHANNELS LANDING CONTENT UNDER THE CRISP FOREFRONT DENSITY */}
      <div className="visionary-text-layer">
        {/* HEADER NAVBAR */}
        <header className="relative z-25 border-b border-white/5 bg-slate-950/50 backdrop-blur-md sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setView('landing')}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
               <span className="text-white font-bold text-lg tracking-wider">K</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-white bg-clip-text">
              Kingdom<span className="text-violet-500">.aiapps</span>
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {view !== 'landing' ? (
              <button 
                onClick={() => setView('landing')}
                className="text-xs text-slate-400 hover:text-white transition-colors"
              >
                Return to Landing
              </button>
            ) : null}

            {view === 'landing' ? (
              window.location.pathname === "/03master-06control-09panel" && (
                <button
                  onClick={() => setView('dashboard')}
                  className="px-4.5 py-2 text-xs font-semibold text-white tracking-wide uppercase border border-violet-500/40 hover:border-violet-450 rounded-xl transition-all duration-200 bg-gradient-to-r from-violet-600/80 to-indigo-600/80 hover:from-violet-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 flex items-center space-x-2 shadow-lg shadow-violet-500/10 cursor-pointer"
                >
                  <LayoutDashboard className="w-4 h-4 text-violet-200 animate-pulse" />
                  <span>Sovereign Hub</span>
                </button>
              )
            ) : (
              <button
                onClick={() => {
                  setView('landing');
                  setHasPaidFee(false);
                }}
                className="px-4 py-2 text-sm font-medium text-rose-400 hover:text-rose-300 border border-white/5 hover:border-rose-950/50 rounded-lg transition-all duration-200 bg-slate-900/20 hover:bg-rose-950/20 focus:outline-none flex items-center space-x-1.5"
              >
                <LogOut className="w-4 h-4" />
                <span>Simulate Logout</span>
               </button>
            )}
          </div>
        </div>
      </header>

      {/* VIEW DEPLOYMENT ROUTING */}
      <AnimatePresence mode="wait">
        
        {/* LANDING PAGE VIEW */}
        {view === 'landing' && (
          <motion.main
            key="landing"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-20"
          >
            {(window.location.hostname === "maestroaiapps.com" || window.location.hostname === "www.maestroaiapps.com" || activeLayout === 'maestro') ? (
              <MaestroDashboard initialEstateName={estateName} />
            ) : (
              <>
                {activeLayout === 'default' && (
              <>
                {/* HERO SECTION */}
            <section className="text-center max-w-3xl mx-auto space-y-8 pt-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-400 text-xs font-semibold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5 mr-0.5 animate-pulse" />
                <span>Now Launching: Version 2.0</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
                Establish Your Digital Residence.<br />
                <span className="glow-pulse-ticker">
                  Build Your Digital-Web-App-Estate.
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-slate-400 font-normal leading-relaxed">
                From a single prompt, manifest a fully functional digital app estate with real-world value. Your knowledge, your code, your operational space—absolute digital sovereignty.
              </p>

              {/* PRIMARY CALL TO ACTION */}
              <div className="pt-4 space-y-4">
                <button 
                  onClick={() => setView('checkout')}
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-base sm:text-lg font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-violet-600/30 hover:shadow-violet-600/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <span>Establish Your Estate (Only $7)</span>
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  $7/mo property maintenance &bull; Secure cloud isolation &bull; Cancel anytime
                </p>
              </div>
            </section>

            {/* SPLIT WORKSPACE: CHAT & LIVE PREVIEW STAGE */}
            <SplitWorkspace />

            {/* SECTION: CREATION HORIZON DATA BANNER & CAROUSEL */}
            <section className="py-12 border-t border-white/5 space-y-12 relative overflow-hidden">
              <style>{`
                @keyframes infiniteScrollText {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
                @keyframes infiniteScrollCards {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
                @keyframes glowPulseTicker {
                  0% {
                    background-position: 0% 50%;
                    text-shadow: 0 0 10px rgba(99, 102, 241, 0.4), 0 0 20px rgba(139, 92, 246, 0.2);
                  }
                  50% {
                    background-position: 100% 50%;
                    text-shadow: 0 0 25px rgba(59, 130, 246, 0.8), 0 0 45px rgba(139, 92, 246, 0.6);
                  }
                  100% {
                    background-position: 0% 50%;
                    text-shadow: 0 0 10px rgba(99, 102, 241, 0.4), 0 0 20px rgba(139, 92, 246, 0.2);
                  }
                }
                .glow-pulse-ticker {
                  background: linear-gradient(90deg, #60a5fa, #c084fc, #818cf8, #c084fc, #60a5fa);
                  background-size: 200% auto;
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  background-clip: text;
                  animation: glowPulseTicker 3.5s linear infinite;
                }
                .animate-marquee-text {
                  display: flex;
                  width: max-content;
                  animation: infiniteScrollText 50s linear infinite;
                }
                .animate-marquee-text:hover {
                  animation-play-state: paused;
                }
                .animate-marquee-cards {
                  display: flex;
                  width: max-content;
                  animation: infiniteScrollCards 45s linear infinite;
                }
                .animate-marquee-cards:hover {
                  animation-play-state: paused;
                }
              `}</style>

              {/* Data Ticker / Banner Info Title */}
              <div className="text-center space-y-3 max-w-4xl mx-auto px-4">
                <span className="text-xs font-bold tracking-[0.3em] uppercase text-amber-500 font-mono block">
                  Creation Horizon Metrics
                </span>
                <h3 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-none uppercase font-sans">
                  The Digital Web-Estate <span className="bg-gradient-to-r from-violet-400 via-amber-400 to-indigo-400 bg-clip-text text-transparent">Is Massive</span>
                </h3>
                <p className="text-sm text-slate-400">
                  You are early in your creation footprint. The expansion capability of unchained sovereign applications is virtually limitless.
                </p>
              </div>

              {/* Full-width Marquee Ticker */}
              <div className="relative py-4 bg-slate-950 border-y border-white/5 overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

                <div className="animate-marquee-text flex whitespace-nowrap gap-16 text-sm font-extrabold font-mono tracking-wider">
                  {[1, 2].map((loopIdx) => (
                    <div key={loopIdx} className="flex items-center gap-16 select-none">
                      <span className="text-amber-400">YOU ARE EARLY IN YOUR CREATION IDEA.</span>
                      <span className="text-violet-400">THE DIGITAL WEB-ESTATE IS MASSIVE.</span>
                      <span className="text-white">AN ESTIMATED 1.34 BILLION REGISTERED WEBSITES EXIST.</span>
                      <span className="text-rose-400">ONLY ~15% (201M) ACTIVELY MAINTAINED.</span>
                      <span className="text-yellow-400">OVER 250,000 NEW SITES LAUNCH DAILY.</span>
                      <span className="text-emerald-400 font-black">NEARLY ALL WILL REQUIRE UPGRADES BY 2030.</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Infinite Scrolling Thumbnail Carousel */}
              <div className="relative py-4 overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-950 via-slate-950/40 to-transparent z-10 pointer-events-none" />

                <div className="animate-marquee-cards flex gap-6">
                  {/* Dynamic render of the 5 cards mapped and duplicated to form a seamless continuous wheel */}
                  {[
                    // Card 1: Community Garden Organizer (ID: 1)
                    { 
                      id: 1,
                      title: "Community Garden Organizer", 
                      tag: "Logistics", 
                      icon: Sprout, 
                      bg: "from-emerald-500/10 to-teal-500/5", 
                      border: "border-emerald-500/20 hover:border-emerald-500/40", 
                      iconColor: "text-emerald-400", 
                      desc: "Collaborative schedule coordinates and local nodes.",
                      wireframe: (
                        <div className="mt-4 bg-slate-950/90 border border-white/5 rounded-xl p-3 space-y-2 text-[9px] text-slate-500 font-mono">
                          <div className="flex items-center justify-between pb-1.5 border-b border-white/5">
                            <div className="flex items-center space-x-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 animate-pulse" />
                              <span className="text-[8px] font-bold text-slate-300">GARDEN COORD</span>
                            </div>
                            <span className="text-[7px] bg-emerald-500/15 text-emerald-400 px-1.5 py-0.5 rounded uppercase font-bold">Active</span>
                          </div>
                          <div className="space-y-1 py-1">
                            <div className="bg-slate-900/60 p-1 rounded border border-white/5 flex items-center justify-between">
                              <span className="text-slate-300 text-[8px]">Sector Beta Hydration</span>
                              <span className="text-emerald-400 font-bold font-mono">ON_LINE</span>
                            </div>
                            <div className="bg-slate-900/60 p-1 rounded border border-white/5 flex items-center justify-between">
                              <span className="text-slate-300 text-[8px]">Soil Moisture Level</span>
                              <span className="text-amber-400 font-bold font-mono">82%</span>
                            </div>
                          </div>
                          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-center py-1 rounded text-[7.5px] font-black tracking-widest uppercase">
                            Telemetry Feed Live
                          </div>
                        </div>
                      )
                    },
                    // Card 2: Non-Profit Fundraiser Port (ID: 2)
                    { 
                      id: 2,
                      title: "Non-Profit Fundraiser Port", 
                      tag: "Finance", 
                      icon: Heart, 
                      bg: "from-rose-500/10 to-pink-500/5", 
                      border: "border-rose-500/20 hover:border-rose-500/40", 
                      iconColor: "text-rose-400", 
                      desc: "Independent secure payment routing and backings.",
                      wireframe: (
                        <div className="mt-4 bg-slate-950/90 border border-white/5 rounded-xl p-3 space-y-2 text-[9px] text-slate-500 font-mono">
                          <div className="flex items-center justify-between pb-1.5 border-b border-white/5">
                            <div className="flex items-center space-x-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-400/80 animate-pulse" />
                              <span className="text-[8px] font-bold text-slate-300">CAMPAIGN TALLY</span>
                            </div>
                            <span className="text-[7px] bg-rose-500/15 text-rose-400 px-1 rounded uppercase font-bold">92% Met</span>
                          </div>
                          <div className="space-y-1.5 py-1">
                            <div className="flex justify-between text-slate-300 text-[8px] font-bold">
                              <span>Target Pool Raised</span>
                              <span>$25,000 USD</span>
                            </div>
                            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-white/5">
                              <div className="bg-gradient-to-r from-rose-500 to-pink-500 h-full w-[90%]" />
                            </div>
                          </div>
                          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-300 text-center py-1 rounded text-[7.5px] font-black tracking-widest uppercase">
                            Secure Crypto Ledger Enforced
                          </div>
                        </div>
                      )
                    },
                    // Card 3: Vocational Skill Tracker (ID: 3)
                    { 
                      id: 3,
                      title: "Vocational Skill Tracker", 
                      tag: "LMS", 
                      icon: Award, 
                      bg: "from-amber-500/10 to-yellow-500/5", 
                      border: "border-amber-500/20 hover:border-amber-500/40", 
                      iconColor: "text-amber-400", 
                      desc: "Sovereign educational record mapping engine.",
                      wireframe: (
                        <div className="mt-4 bg-slate-950/90 border border-white/5 rounded-xl p-3 space-y-2 text-[9px] text-slate-500 font-mono">
                          <div className="flex items-center justify-between pb-1.5 border-b border-white/5">
                            <div className="flex items-center space-x-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 animate-pulse" />
                              <span className="text-[8px] font-bold text-slate-300">SKILL COMPETENCY PASSPORT</span>
                            </div>
                            <span className="text-[7px] bg-amber-500/15 text-amber-400 px-1 rounded uppercase font-bold">Level 4</span>
                          </div>
                          <div className="space-y-1.5 py-1">
                            <div className="flex justify-between text-slate-300 text-[8px] font-bold">
                              <span>Core Modules Verified</span>
                              <span>12 / 15 Verified</span>
                            </div>
                            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-white/5">
                              <div className="bg-gradient-to-r from-amber-500 to-yellow-500 h-full w-[80%]" />
                            </div>
                          </div>
                          <div className="bg-amber-500/10 border border-amber-500/20 text-amber-300 text-center py-1 rounded text-[7.5px] font-black tracking-widest uppercase">
                            Sovereign Passport Endorsed
                          </div>
                        </div>
                      )
                    },
                    // Card 4: Local Artisan Market Hub (ID: 4)
                    { 
                      id: 4,
                      title: "Local Artisan Market Hub", 
                      tag: "E-Commerce", 
                      icon: Store, 
                      bg: "from-violet-500/10 to-indigo-500/5", 
                      border: "border-violet-500/20 hover:border-violet-500/40", 
                      iconColor: "text-violet-400", 
                      desc: "Decentralized product displays and checkout logic.",
                      wireframe: (
                        <div className="mt-4 bg-slate-950/90 border border-white/5 rounded-xl p-3 space-y-2 text-[9px] text-slate-500 font-mono">
                          <div className="flex items-center justify-between pb-1.5 border-b border-white/5">
                            <div className="flex items-center space-x-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-violet-400/80 animate-pulse" />
                              <span className="text-[8px] font-bold text-slate-300">ARTISAN SHOP</span>
                            </div>
                            <span className="text-[7px] bg-violet-500/10 text-violet-400 px-1 rounded uppercase font-bold">Cart [3]</span>
                          </div>
                          <div className="grid grid-cols-2 gap-1.5 py-1">
                            <div className="bg-slate-900/60 p-1.5 rounded border border-white/5 space-y-1">
                              <div className="h-6 bg-slate-950 rounded flex items-center justify-center font-sans font-black text-slate-200 text-[9px]">$59.00</div>
                              <div className="w-12 h-1 bg-slate-800 rounded mx-auto text-center" />
                            </div>
                            <div className="bg-slate-900/60 p-1.5 rounded border border-white/5 space-y-1">
                              <div className="h-6 bg-slate-950 rounded flex items-center justify-center font-sans font-black text-slate-200 text-[9px]">$120.00</div>
                              <div className="w-8 h-1 bg-slate-800 rounded mx-auto text-center" />
                            </div>
                          </div>
                          <div className="bg-violet-500/10 border border-violet-500/20 text-violet-300 text-center py-1 rounded text-[7.5px] font-black tracking-widest uppercase">
                            Direct Checkout Enabled
                          </div>
                        </div>
                      )
                    },
                    // Card 5: Digital Blueprint Archive (ID: 5)
                    { 
                      id: 5,
                      title: "Digital Blueprint Archive", 
                      tag: "Document Space", 
                      icon: Archive, 
                      bg: "from-indigo-500/10 to-blue-500/5", 
                      border: "border-indigo-500/20 hover:border-indigo-500/40", 
                      iconColor: "text-indigo-400", 
                      desc: "Distributed document metadata and cloud vaults.",
                      wireframe: (
                        <div className="mt-4 bg-slate-950/90 border border-white/5 rounded-xl p-3 space-y-2 text-[9px] text-slate-500 font-mono">
                          <div className="flex items-center justify-between pb-1.5 border-b border-white/5">
                            <div className="flex items-center space-x-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400/80 animate-pulse" />
                              <span className="text-[8px] font-bold text-slate-300">BLUEPRINT GRID</span>
                            </div>
                            <span className="text-[7px] bg-indigo-500/15 text-indigo-400 px-1 rounded uppercase font-bold">Cloud Sync</span>
                          </div>
                          <div className="grid grid-cols-3 gap-1 py-1 font-mono text-[7px]" >
                            <div className="bg-slate-900 p-1 rounded border border-white/5 flex flex-col justify-between h-8">
                              <span className="text-slate-500 text-[6px]">.dwg</span>
                              <span className="text-indigo-300 font-bold">GRID-B</span>
                            </div>
                            <div className="bg-slate-900 p-1 rounded border border-white/5 flex flex-col justify-between h-8">
                              <span className="text-slate-500 text-[6px]">.dwg</span>
                              <span className="text-indigo-300 font-bold">GRID-C</span>
                            </div>
                            <div className="bg-slate-900 p-1 rounded border border-white/5 flex flex-col justify-between h-8">
                              <span className="text-slate-500 text-[6px]">.dwg</span>
                              <span className="text-indigo-300 font-bold">GRID-D</span>
                            </div>
                          </div>
                          <div className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-center py-1 rounded text-[7.5px] font-black tracking-widest uppercase">
                            Distributed Cloud Directory
                          </div>
                        </div>
                      )
                    }
                  ].flatMap((originalCard) => [
                    { ...originalCard, isDup: false },
                    { ...originalCard, title: `${originalCard.title} `, isDup: true } // Creates unique objects for keys
                  ]).map((card, cIdx) => {
                    const CardIcon = card.icon;
                    return (
                      <div 
                        key={card.isDup ? `card-dup-${card.id}` : `card-orig-${card.id}`}
                        className={`w-72 sm:w-80 flex-shrink-0 p-6 rounded-2xl bg-gradient-to-br ${card.bg} border ${card.border} backdrop-blur-md transition-all duration-300 transform hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(245,158,11,0.06)] group relative cursor-pointer`}
                      >
                        {/* Glow corner element on hover */}
                        <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/15 transition-all duration-300 pointer-events-none" />
                        
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[10px] font-bold tracking-widest uppercase font-mono px-2.5 py-1 rounded bg-slate-950/60 border border-white/5 text-slate-400">
                            {card.tag}
                          </span>
                          <div className={`w-10 h-10 rounded-xl bg-slate-950/40 flex items-center justify-center border border-white/5 group-hover:border-amber-500/20 transition-all ${card.iconColor}`}>
                            <CardIcon className="w-5 h-5" />
                          </div>
                        </div>

                        <h4 className="text-base font-extrabold text-white tracking-tight group-hover:text-amber-400 transition-colors mb-1.5 label-text">
                          {card.title}
                        </h4>
                        <p className="text-xs text-slate-400 font-sans leading-relaxed">
                          {card.desc}
                        </p>
                        
                        {/* Real, Beautiful Skeletal Wireframe Webapp Indicator */}
                        {card.wireframe}
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* MANIFESTO & VIDEO SHOWCASE BLOCK */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-20 items-center border-t border-white/5">
              {/* LEFT COLUMN: THE CORE TRUTH */}
              <div className="space-y-6 text-left">
                <h2 className="text-3xl font-extrabold text-indigo-400 font-sans tracking-tight">
                  The Foundation of Kingdom.aiapps: Your App-Estate Architecture
                </h2>
                <p className="text-base text-slate-200 font-medium leading-relaxed border-l-2 border-indigo-500 pl-4 py-1">
                  Kingdom.aiapps is explicitly built for the architectural deployment of independent full-stack web applications. We do not sell static domain names or run closed text spaces. We empower you to construct, own, and download fully isolated App-Estates that operate as your sovereign digital residence.
                </p>
                <p className="text-base text-slate-300 font-normal leading-relaxed">
                  Many believe a domain name is just an address you buy from a massive corporation. We see the truth. The internet is a vast grid of sovereign territory, and a domain name is your legal deed. Kingdom.aiapps does not simply rent you a name string—we empower you to construct a living, breathing digital app residence. A place of absolute ownership, designed by your intent, hosted in complete isolation, and entirely unbending. You build it. You own it. You rule it.
                </p>
              </div>

              {/* RIGHT COLUMN: THE SOVEREIGN AVATAR VIDEO PLAYER */}
              <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-950">
                <video
                  src="/welcome-avatar.mp4"
                  controls
                  playsInline
                  className="w-full h-full rounded-2xl border border-slate-800 shadow-2xl object-cover"
                />
              </div>
            </section>

            {/* FIRSTPROMOTER-INSPIRED STICKY SNAP-STACKING CONFIGURATION */}
            <div className="sticky-stack-container space-y-0 relative w-full pt-10">
              {/* STACK LAYER 2: THE SOVEREIGN CREATOR HUB CARD GRID */}
              <div id="creator-hub-layer" className="sticky-stack-layer stack-layer-glow-indigo z-20 rounded-3xl p-6 md:p-10 shadow-2xl relative space-y-8">
                <div className="absolute -top-10 left-10 w-40 h-40 bg-indigo-500/5 blur-3xl rounded-full pointer-events-none" />
                
                <div className="border-b border-white/5 pb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                    <Building className="w-6 h-6 text-violet-400" />
                    <span>Sovereign Creator Hub</span>
                    {isAdmin && (
                      <span className="text-[10px] bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 px-2 py-0.5 rounded font-mono uppercase tracking-wider">
                        Master Admin
                      </span>
                    )}
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">Configure and fuel your sovereign intelligence network.</p>
                </div>
                
                <div className="flex flex-wrap items-center gap-3">
                  {/* MASTER ADMIN BYPASS STATUS & SIMULATION SWITCH - Hidden on public route, visible on secret route */}
                  {currentPath === '/03master-06control-09panel' && (
                    isAdmin ? (
                      <div className="flex items-center space-x-3 bg-violet-950/40 border border-violet-500/20 px-3.5 py-2 rounded-xl">
                        <Sliders className="w-4 h-4 text-violet-400" />
                        <span className="text-xs font-semibold text-violet-300">Developer Simulation Mode</span>
                        <button
                          type="button"
                          onClick={() => setDevSimulationMode(!devSimulationMode)}
                          className={`relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                            devSimulationMode ? 'bg-indigo-500' : 'bg-slate-800'
                          }`}
                          aria-label="Developer Simulation Toggle"
                        >
                          <span
                            className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                              devSimulationMode ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setUserEmail('PsWilliamh@gmail.com');
                          setIsAdmin(true);
                          localStorage.setItem('kingdom_admin_mode', 'true');
                        }}
                        className="text-xs bg-slate-900 border border-indigo-500/35 text-indigo-300 hover:text-white px-3 py-2 rounded-xl transition-all font-mono hover:bg-indigo-950/30 font-semibold cursor-pointer"
                      >
                        Unlock Admin Mode (PsWilliamh@gmail.com)
                      </button>
                    )
                  )}

                  <div className="flex items-center space-x-2 text-xs text-slate-400 bg-slate-950/50 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 w-fit h-fit">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Estate Nodes Active Currently</span>
                  </div>
                </div>
              </div>

              {/* STACK LAYER 1: THE MASTER VISIONARY QUOTE HEADER */}
              <div id="visionary-quote-layer" className="sticky-stack-layer stack-layer-glow-violet z-10 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-violet-600/10 blur-3xl rounded-full pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-600/5 blur-3xl rounded-full pointer-events-none" />
                
                {/* Visual subtle node grid in Quote layer to reinforce technology */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[radial-gradient(rgba(255,255,255,0.025)_1.5px,transparent_1.5px)] bg-[size:24px_24px] rounded-3xl" />
                
                <div className="text-center space-y-6 max-w-4xl mx-auto z-10 relative">
                  <span className="text-xs sm:text-sm font-bold tracking-[0.35em] uppercase text-slate-500 font-mono inline-block mb-2">
                    Sovereign Visionary Directive
                  </span>
                  
                  <blockquote className="text-2xl sm:text-3.5xl md:text-5xl font-extrabold tracking-tight leading-[1.25] font-sans px-4">
                    <span className="text-white font-medium text-slate-100">
                      "The question is not, What Can The Software Or App DO, But it is... "
                    </span>
                    <span className="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-250 to-amber-500 font-black animate-pulse leading-none">
                      WHAT DOES THE SOUL SEE?"
                    </span>
                  </blockquote>

                  <p className="text-xs sm:text-sm text-indigo-400 font-mono tracking-widest font-semibold mt-10 uppercase flex items-center justify-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                    <span>Kingdom.aiapps Engine v2.0</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  </p>
                </div>
              </div>

              {/* THE 4-STEP CONCIERGE FLOW */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-8 border-b border-t border-white/5 max-w-7xl mx-auto text-left relative z-10 my-4">
                {[
                  { step: "01", title: "Claim Estate", desc: "Connect your sovereign domain territory." },
                  { step: "02", title: "Fuel Container", desc: "Select your credits pack to power computing." },
                  { step: "03", title: "Speak Vision", desc: "Dictate what your soul sees directly to the builder." },
                  { step: "04", title: "Dominate Web", desc: "Launch your application live to the global map." }
                ].map((item, idx) => (
                  <div key={idx} className="relative p-6 rounded-2xl bg-slate-900/35 border border-white/5 hover:border-amber-500/35 hover:shadow-[0_0_20px_rgba(245,158,11,0.1)] hover:bg-white/[0.04] hover:scale-[1.02] transform-gpu transition-all duration-300 group overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                      <span className="text-7xl font-extrabold font-mono text-white tracking-tighter select-none">{item.step}</span>
                    </div>
                    <div className="flex items-center space-x-3 mb-3 relative z-10">
                      <span className="flex items-center justify-center font-mono font-bold text-xs text-violet-450 bg-violet-500/10 border border-violet-500/20 w-8 h-8 rounded-lg shadow-sm">
                        {item.step}
                      </span>
                      <h4 className="text-base font-extrabold text-white tracking-tight">{item.title}</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed relative z-10 font-sans">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* TERRITORY SEARCH COMPONENT */}
                <div className="steel-navy-card backdrop-blur-xl rounded-3xl p-8 sm:p-10 flex flex-col justify-between min-h-[480px] shadow-2xl relative overflow-hidden">
                  
                  {/* The Background Video Layer */}
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none mix-blend-screen"
                  >
                    <source src="/sovereign-map.mp4" type="video/mp4" />
                  </video>

                  <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
                    <div>
                      <div className="flex items-start space-x-4 mb-5">
                        <div className="p-2.5 bg-violet-600/15 text-violet-400 rounded-xl mt-1 flex-shrink-0">
                          <Globe className="w-5.5 h-5.5" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white tracking-tight">Verify Domain Territory</h3>
                          <p 
                            className="text-xl sm:text-2xl text-slate-100 font-bold leading-relaxed mt-1"
                            style={{ fontSize: '1.35rem' }}
                          >
                            Establish your digital residency and lock down your sovereign kingdom webapp-estate.
                          </p>
                        </div>
                      </div>

                      <form onSubmit={handleDomainCheck} className="space-y-4">
                        <div className="relative">
                          <input
                            type="text"
                            value={domain}
                            onChange={(e) => setDomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                            placeholder="enter-your-domain"
                            className="w-full bg-slate-950/80 border border-white/20 rounded-xl py-4 pl-4 pr-32 text-slate-100 placeholder-slate-600 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500/50 transition-all font-mono"
                          />
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
                            <span className="text-slate-400 text-xs mr-3 font-mono">.kingdomaiapps.com</span>
                            <button
                              type="submit"
                              disabled={isSearching || !domain}
                              className="bg-violet-600 hover:bg-violet-500 disabled:bg-slate-800 disabled:text-slate-500 text-white px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center space-x-1"
                            >
                              {isSearching ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                              <span>{isSearching ? 'Checking' : 'Check'}</span>
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>

                    {/* Status Message Display */}
                    <div className="min-h-[64px] flex items-center">
                      {searchResult ? (
                        <div className={`w-full p-4 rounded-xl border flex items-start space-x-3 text-sm transition-all duration-200 ${
                          searchResult.available 
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
                            : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                        }`}>
                        {searchResult.available ? (
                            <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                          ) : (
                            <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                          )}
                          <div>
                            <p className="font-semibold">{searchResult.available ? 'Identity Available' : 'Reserved Territory'}</p>
                            <p className="text-xs text-slate-200 mt-0.5">{searchResult.message}</p>
                            {searchResult.available && (
                              <button 
                                onClick={() => {
                                  setView('checkout');
                                }}
                                className="mt-2 text-xs font-bold text-violet-400 hover:text-violet-300 flex items-center gap-1 cursor-pointer"
                              >
                                <span>Claim Estate domain now</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      ) : (
                        <p className="text-xs text-slate-400 italic block leading-relaxed">
                          Type a domain check availability to instantly map your secure web real-estate space. (Example: "alpha-net")
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* BILLING COMPONENT (TOP-UP OPTIONS) */}
                <div className="steel-navy-card backdrop-blur-xl rounded-3xl p-8 sm:p-10 flex flex-col justify-between min-h-[480px] shadow-2xl relative overflow-hidden">
                  
                  {/* The Background Video Layer */}
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none mix-blend-screen"
                  >
                    <source src="/sovereign-map.mp4" type="video/mp4" />
                  </video>

                  <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
                    <div>
                      <div className="flex items-start justify-between mb-5">
                        <div className="flex items-start space-x-4">
                          <div className="p-2.5 bg-indigo-600/15 text-indigo-400 rounded-xl mt-1 flex-shrink-0">
                            <Zap className="w-5.5 h-5.5" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white tracking-tight">Fuel Your Sovereignty</h3>
                            <p 
                              className="text-xl sm:text-2xl text-slate-100 font-bold leading-relaxed mt-1"
                              style={{ fontSize: '1.35rem' }}
                            >
                              Initialize your private cloud webapp-estate and activate live build A.I. chat container.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Sliding-Scale Credit Top-Up Options */}
                      <div className="grid grid-cols-2 gap-3 mt-4">
                        {topUpOptions.map((option) => (
                          <button
                            type="button"
                            key={option.amount}
                            onClick={() => setSelectedTopUp(option.amount)}
                            className={`relative flex flex-col items-start p-4 rounded-xl border text-left transition-all duration-250 cursor-pointer ${
                              selectedTopUp === option.amount
                                ? 'bg-indigo-500/15 border-indigo-500/60 shadow-lg shadow-indigo-500/20 ring-1 ring-indigo-500/60 z-10'
                                : 'bg-slate-950/80 border-white/10 hover:border-white/20 hover:bg-slate-900/60'
                            }`}
                          >
                            <div className="flex justify-between items-center w-full">
                              <span className="text-base font-extrabold text-white">${option.amount} USD</span>
                              {selectedTopUp === option.amount && (
                                <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 shadow-sm animate-pulse" />
                              )}
                            </div>
                            <span className="text-xs text-slate-200 font-semibold mt-1">
                              {option.creditsFormatted} Credits
                            </span>
                            <span className="text-[10px] text-indigo-300 font-semibold mt-1 uppercase tracking-wider block">
                              {option.bonus}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Selected Amount Action */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-slate-400 block font-medium">Estate Preloaded Capital</span>
                        <span className="text-sm sm:text-base font-bold text-white">
                          ${selectedTopUp}.00 USD &bull; <span className="text-indigo-400 font-extrabold">{selectedCreditsFormatted} cr.</span>
                        </span>
                      </div>
                      <button 
                        onClick={() => setView('checkout')}
                        className="px-6 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all focus:outline-none cursor-pointer hover:shadow-lg hover:shadow-indigo-500/25"
                      >
                        Lock in Pack
                      </button>
                    </div>
                  </div>

                </div>

                </div>

              </div>

              {/* STACK LAYER 3: THE AFFILIATE & SUPPORT MODULES */}
              <div id="affiliate-support-layer" className="sticky-stack-layer stack-layer-glow-amber z-30 rounded-3xl p-6 md:p-10 shadow-3xl relative space-y-10">
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber-500/5 blur-3xl rounded-full pointer-events-none" />
                
                <div className="text-center max-w-2xl mx-auto space-y-2 z-10 relative">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Sovereign Growth & Alliance</h3>
                  <p className="text-sm text-slate-400 leading-relaxed font-semibold">Scale your passive capital deeds and connect directly with core cluster administrators.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl mx-auto z-10 relative">
                  
                  {/* SOVEREIGN AFFILIATE PARTNERSHIP */}
                  <div className="bg-slate-950/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-xl relative overflow-hidden flex flex-col justify-between h-full min-h-[350px]">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-3xl rounded-full pointer-events-none" />
                    <div>
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2.5 bg-amber-500/15 text-amber-400 rounded-xl">
                          <Coins className="w-5.5 h-5.5" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white tracking-tight">Sovereign Affiliate Partnership</h3>
                          <p className="text-xs text-amber-400 uppercase tracking-widest font-mono font-bold mt-0.5">Earn 20% Royalty-Deeds</p>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base text-slate-350 leading-relaxed text-left mt-2">
                        Partner with Kingdom.aiapps to expand our distributed digital frontiers. Accumulate persistent lifetime royalty commissions of <span className="text-white font-bold">20%</span> on every private webapp-estate maintained or top-up credit purchased under your cryptographic referrer node identifier.
                      </p>
                    </div>
                    <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6">
                      <div className="text-left w-full sm:w-auto">
                        <span className="text-[10px] text-slate-500 block font-bold uppercase tracking-widest font-mono">Partner with Kingdom.aiapps / YOUR SOVEREIGN CODE</span>
                        <span className="text-xs font-mono text-amber-300 font-bold truncate block max-w-[240px]">
                          https://kingdomaiapps.com/?ref=my-first-ki
                        </span>
                      </div>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText("https://kingdomaiapps.com/?ref=my-first-ki");
                          setAffiliateCopied(true);
                          setTimeout(() => setAffiliateCopied(false), 2000);
                        }}
                        className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-xl hover:from-amber-300 hover:to-yellow-400 transition-all font-mono shadow-md cursor-pointer flex-shrink-0 w-full sm:w-auto text-center font-bold"
                        type="button"
                      >
                        {affiliateCopied ? 'Link Copied!' : 'Copy Partner Link'}
                      </button>
                    </div>
                  </div>

                  {/* TECHNICAL SUPPORT PORTAL */}
                  <div className="bg-slate-950/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-xl relative overflow-hidden flex flex-col justify-between h-full min-h-[350px]">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full pointer-events-none" />
                    <div>
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2.5 bg-violet-600/15 text-violet-400 rounded-xl">
                          <HelpCircle className="w-5.5 h-5.5 text-violet-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white tracking-tight">Technical Support Portal</h3>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base text-slate-350 leading-relaxed text-left mt-2">
                        Encountering issues or need to ask a question? Please first connect with our AI chat specialist, Symphony, available 24/7. If your issue requires deep technical escalation, Symphony will instantly issue you a direct support ticket.
                      </p>
                    </div>
                    <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6">
                      <div className="text-left w-full sm:w-auto">
                        <span className="text-[10px] text-slate-500 block font-bold uppercase tracking-widest mb-1 font-mono">ESTATE RESOLUTION ROUTE</span>
                        <span className="text-xs font-mono text-indigo-300 font-bold block">AI Chat Escalation Active</span>
                      </div>
                      <button 
                        type="button"
                        onClick={() => setIsSymphonyOpen(true)}
                        className="inline-flex items-center justify-center px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 border border-violet-500/30 rounded-xl text-xs font-bold text-white transition-all font-mono w-full sm:w-auto text-center shadow-lg shadow-violet-600/20 cursor-pointer"
                      >
                        Open Symphony Chat
                      </button>
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* SECTION: DYNAMIC ORCHESTRATION TERMINAL DEMO */}
            <section className="py-12 border-t border-white/5 space-y-10 relative z-10 max-w-7xl mx-auto">
              <div className="text-center space-y-3 max-w-2xl mx-auto">
                <span className="text-xs font-bold tracking-[0.25em] uppercase text-violet-400 font-mono block">
                  Symphony Development Pipeline
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Sovereign App Generation, <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-amber-400 to-indigo-400 font-black">Orchestrated Live</span>
                </h2>
                <p className="text-sm text-slate-400">
                  Experience how Symphony translates simple voice and text commands into fully compiled, isolated digital estates in real time.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center font-sans">
                {/* Left side: Golden / Violet Accordion steps */}
                <div className="lg:col-span-5 space-y-4">
                  {[
                    {
                      step: 0,
                      title: "1. Speak Your Vision",
                      desc: "Input natural language prompt or streaming audio. Symphony instantly translates your intent into secure full-stack code maps.",
                    },
                    {
                      step: 1,
                      title: "2. Symphony Orchestrates",
                      desc: "Multi-agent nodes balance files and assemble features, compiling individual modules with millisecond execution speeds.",
                    },
                    {
                      step: 2,
                      title: "3. Instant Sovereign Deployment",
                      desc: "An isolated development sandbox is spun up inside a secure container automatically, mapping directly to your domain deed.",
                    }
                  ].map((s) => {
                    const isActive = terminalActiveStep === s.step;
                    return (
                      <button
                        key={s.step}
                        onClick={() => setTerminalActiveStep(s.step)}
                        className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 transform-gpu cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                          isActive
                            ? 'bg-slate-900/70 border-violet-500/50 shadow-[0_0_15px_rgba(139,92,246,0.15)] scale-[1.01]'
                            : 'bg-slate-950/20 border-white/5 hover:bg-slate-900/30'
                        }`}
                        type="button"
                      >
                        {/* Glowing progress line on active step */}
                        {isActive && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-violet-500 via-amber-400 to-indigo-500" />
                        )}
                        <div className="space-y-1.5 pl-2">
                          <h4 className={`text-base font-extrabold tracking-tight transition-colors ${isActive ? 'text-white' : 'text-slate-400 hover:text-white'}`}>
                            {s.title}
                          </h4>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            {s.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Right side: Interactive Simulated Terminal Container */}
                <div className="lg:col-span-7">
                  <div className="bg-slate-950 border border-violet-500/35 rounded-2xl shadow-3xl overflow-hidden font-mono text-left select-none relative z-10">
                    {/* OS Terminal Header */}
                    <div className="bg-slate-900 px-4 py-3 border-b border-white/10 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        <span className="text-[10px] sm:text-xs text-slate-400 ml-2">symphony@orchestrate:~</span>
                      </div>
                      <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded uppercase font-bold tracking-wider animate-pulse">
                        ● PIPELINE ACTIVE
                      </span>
                    </div>

                    {/* Interactive Content Windows */}
                    <div className="p-6 min-h-[300px] flex flex-col justify-between bg-slate-950/95">
                      
                      {/* CASE 0: SPEAK YOUR VISION */}
                      {terminalActiveStep === 0 && (
                        <div className="space-y-5 animate-[fadeIn_0.3s_ease-out]">
                          <div className="flex items-center justify-between text-xs text-slate-500 font-mono pb-2 border-b border-white/5 uppercase tracking-wide">
                            <span>Input Streamer / Voice Recognition Decoder</span>
                            <span className="text-amber-400 font-bold animate-pulse">&bull; Live Streaming</span>
                          </div>
                          <div className="space-y-3 font-mono">
                            <p className="text-violet-400 text-xs sm:text-sm font-semibold tracking-wide">
                              $ input-vision --stream --voice-active
                            </p>
                            <div className="text-slate-300 text-sm leading-relaxed min-h-[60px] whitespace-pre-wrap font-sans bg-slate-900/50 p-4 rounded-xl border border-white/5">
                              {terminalTypedPrompt}
                              <span className="inline-block w-2 h-4 bg-violet-400 ml-1 animate-pulse" />
                            </div>
                          </div>

                          {/* Live simulated audio equalizer visualizer */}
                          <div className="flex items-center gap-1.5 pt-4 bg-slate-900/30 p-3 rounded-xl border border-white/5">
                            <span className="text-[10px] text-slate-500 font-semibold uppercase mr-2 font-sans">Voice Feed:</span>
                            {[
                              "h-4 duration-500", "h-7 duration-300", "h-11 duration-200", 
                              "h-5 duration-700", "h-9 duration-400", "h-12 duration-250", 
                              "h-6 duration-600", "h-4 duration-500", "h-10 duration-350"
                            ].map((hClass, eqIdx) => (
                              <div 
                                key={eqIdx} 
                                className={`w-1 bg-gradient-to-t from-violet-500 to-amber-400 rounded-full animate-bounce ${hClass}`}
                                style={{ animationDelay: `${eqIdx * 80}ms` }}
                              />
                            ))}
                            <span className="text-[9px] text-amber-400/90 font-bold ml-auto uppercase tracking-widest">Audio Synced</span>
                          </div>
                        </div>
                      )}

                      {/* CASE 1: SYMPHONY ORCHESTRATES */}
                      {terminalActiveStep === 1 && (
                        <div className="space-y-4 animate-[fadeIn_0.3s_ease-out]">
                          <div className="flex items-center justify-between text-xs text-slate-500 font-mono pb-2 border-b border-white/5 uppercase tracking-wide">
                            <span>Multi-Agent Compiler / File Sandbox Output</span>
                            <span className="text-violet-400 font-bold animate-pulse">&bull; Live Transpiling</span>
                          </div>
                          
                          <div className="space-y-2 text-xs">
                            {[
                              { path: "src/components/chess.tsx", desc: "Interactive HTML5 state board view module" },
                              { path: "src/lib/chess-engine.ts", desc: "Game logic coordinates validation and moves" },
                              { path: "server.ts", desc: "Express private container listener and CORS gateway" },
                              { path: "firestore.rules", desc: "Granular ABAC file security transaction rules" },
                              { path: "package.json", desc: "Isolated dependency manifest parameters" }
                            ].map((fItem, fIdx) => {
                              const isShown = fIdx < terminalChecklistCount;
                              return (
                                <div 
                                  key={fItem.path}
                                  className={`flex items-center justify-between p-2 rounded border transition-all duration-350 ${
                                    isShown 
                                      ? 'opacity-100 bg-slate-900/50 border-white/5' 
                                      : 'opacity-0'
                                  }`}
                                >
                                  <div className="flex items-center space-x-2 truncate">
                                    <span className="text-emerald-400">&bull;</span>
                                    <span className="font-bold text-slate-100 text-[11px] sm:text-xs truncate">{fItem.path}</span>
                                    <span className="text-[9px] text-slate-500 hidden sm:inline font-sans">- {fItem.desc}</span>
                                  </div>
                                  {isShown && (
                                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase flex items-center gap-1 scale-[0.9]">
                                      <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
                                      <span>Success</span>
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* CASE 2: INSTANT SOVEREIGN DEPLOYMENT */}
                      {terminalActiveStep === 2 && (
                        <div className="space-y-4 animate-[fadeIn_0.3s_ease-out]">
                          <div className="flex items-center justify-between text-xs text-slate-500 font-mono pb-2 border-b border-white/5 uppercase tracking-wide">
                            <span>Live Sandbox Environment View</span>
                            <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                              <span>Estates Operational</span>
                            </span>
                          </div>

                          {/* Mini simulated browser frame */}
                          <div className="bg-slate-900 rounded-xl border border-white/10 overflow-hidden shadow-inner font-sans">
                            <div className="bg-slate-950 px-3 py-1.5 flex items-center space-x-2 border-b border-white/5 font-mono">
                              <div className="flex space-x-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                              </div>
                              <div className="bg-slate-900/80 px-2 py-0.5 rounded text-[9px] text-slate-400 max-w-xs truncate">
                                https://alpha-chess.kingdomaiapps.com/
                              </div>
                            </div>

                            {/* Mini application UI preview with smooth loading */}
                            <div className="p-4 bg-slate-950 min-h-[140px] flex flex-col justify-between">
                              {terminalFrameLoaded ? (
                                <div className="space-y-3 animate-[fadeIn_0.5s_ease-out]">
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-white tracking-tight">Chess Platform Arena</span>
                                    <span className="text-[10px] bg-slate-900 text-amber-400 border border-amber-500/20 px-1.5 py-0.5 rounded font-mono font-bold tracking-wider">LOBBY #1</span>
                                  </div>
                                  <div className="grid grid-cols-3 gap-2 text-center">
                                    <div className="bg-slate-900/60 p-2 rounded border border-white/5">
                                      <span className="text-[9px] text-slate-450 block uppercase font-bold tracking-wide">STATE ENGINE</span>
                                      <span className="text-xs font-bold text-emerald-400 font-mono">ACTIVE</span>
                                    </div>
                                    <div className="bg-slate-900/60 p-2 rounded border border-white/5">
                                      <span className="text-[9px] text-slate-455 block uppercase font-bold tracking-wide">COMPUTE ROUTE</span>
                                      <span className="text-xs font-bold text-violet-400 font-mono">3000 CJS</span>
                                    </div>
                                    <div className="bg-slate-900/60 p-2 rounded border border-white/5">
                                      <span className="text-[9px] text-slate-450 block uppercase font-bold tracking-wide">SECURE BACKUPS</span>
                                      <span className="text-xs font-bold text-indigo-400 font-mono">ENFORCED</span>
                                    </div>
                                  </div>
                                  <button
                                    onClick={() => setView('checkout')}
                                    className="w-full py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-[10px] font-bold text-white rounded-lg transition-all"
                                  >
                                    Establish Your Estate Now &rarr;
                                  </button>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center justify-center p-8 space-y-2">
                                  <Loader2 className="w-5 h-5 text-violet-400 animate-spin" />
                                  <p className="text-[10px] text-slate-500">Connecting private container secure proxy...</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Terminal Bottom Info */}
                      <div className="text-[10px] text-slate-600 pt-3 border-t border-white/5 flex items-center justify-between font-sans mt-4">
                        <span>Active Region: US-CENTRAL isolated sandbox VM</span>
                        <span className="text-violet-400 font-mono font-bold">STABLE 60fps</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION: THE SOVEREIGNTY MATRIX SECTION */}
            <section className="py-12 border-t border-white/5 relative z-10 max-w-5xl mx-auto space-y-10">
              {/* Premium Cinematic Background Loop */}
              <div className="max-w-2xl mx-auto rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(99,102,241,0.15)] bg-slate-950/40 relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 to-violet-500/10 opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <video 
                  src="/kingdomaiapps.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto aspect-video object-cover block relative z-10"
                />
              </div>

              <div className="text-center space-y-3 max-w-2xl mx-auto font-sans">
                <span className="text-xs font-bold tracking-[0.25em] uppercase text-emerald-400 font-mono block">
                  Absolute Ownership
                </span>
                <motion.h2 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1.05 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight origin-center transform-gpu"
                >
                  You Own the Code. The Database. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-250 to-amber-550 font-black font-sans">
                    The Hosting. All of It.
                  </span>
                </motion.h2>
                <p className="text-sm text-slate-450">
                  Most AI code assistants lock you into a proprietary walled garden where you lose access the moment you cancel. Kingdom.aiapps offers complete, decentralized operational independence.
                </p>
              </div>

              {/* Matrix Compare Table Grid */}
              <div className="bg-slate-900/30 border border-white/10 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md">
                <div className="grid grid-cols-1 md:grid-cols-12 bg-slate-950/70 border-b border-white/10 divide-y md:divide-y-0 md:divide-x divide-white/10 text-left font-mono font-bold uppercase tracking-wider text-xs">
                  <div className="md:col-span-4 p-5 text-slate-400">Sovereignty Vector</div>
                  <div className="md:col-span-4 p-5 text-rose-455">Other AI Builders</div>
                  <div className="md:col-span-4 p-5 text-emerald-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    <span>Kingdom.aiapps (V2)</span>
                  </div>
                </div>

                <div className="divide-y divide-white/5">
                  {[
                    {
                      vector: "Application Portability",
                      desc: "The absolute right to download, configure, and migrate your web outputs independently.",
                      other: "Locked to their platform",
                      otherSub: "If you stop paying their expensive retainer, your application files are unreachable.",
                      kingdom: "Your independent sandbox forever",
                      kingdomSub: "Download your completed, standardized TypeScript backend and React assets at any point."
                    },
                    {
                      vector: "Database Operations",
                      desc: "Complete storage configuration, schema isolation, and read-write rule boundaries.",
                      other: "Their database, their rules",
                      otherSub: "Shared multi-tenant database clusters. High possibility of privacy overlap.",
                      kingdom: "Sovereign database control",
                      kingdomSub: "Provision isolated Firestore collection rules with unbending user attribution checks."
                    },
                    {
                      vector: "Operational Autonomy",
                      desc: "Guaranteed uptime and continuous live rendering of your web products indefinitely.",
                      other: "Goes dark if you cancel",
                      otherSub: "If you unsubscribe, they delete or disable your app. Your custom assets expire.",
                      kingdom: "Keeps running independently",
                      kingdomSub: "Deploy your built system directly onto secure isolated servers that maintain state forever."
                    }
                  ].map((row, idx) => (
                    <div 
                      key={idx} 
                      className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-white/10 text-left transition-all duration-300 transform-gpu hover:bg-slate-900/40 hover:border-amber-500/35 hover:shadow-[0_0_20px_rgba(245,158,11,0.08)] backdrop-blur-md group relative"
                    >
                      {/* Vector Column */}
                      <div className="md:col-span-4 p-5 md:p-6 flex flex-col justify-center space-y-1.5">
                        <h4 className="text-sm font-bold text-white tracking-tight group-hover:text-amber-400 transition-colors">
                          {row.vector}
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed font-sans">
                          {row.desc}
                        </p>
                      </div>

                      {/* Other Builders Column */}
                      <div className="md:col-span-4 p-5 md:p-6 flex flex-col justify-center bg-rose-500/[0.015] space-y-2">
                        <div className="flex items-center space-x-2 text-rose-500 font-bold font-mono">
                          <XCircle className="w-5 h-5 text-rose-500" />
                          <span className="text-xs sm:text-sm text-slate-100">{row.other}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                          {row.otherSub}
                        </p>
                      </div>

                      {/* Kingdom.aiapps Column */}
                      <div className="md:col-span-4 p-5 md:p-6 flex flex-col justify-center bg-emerald-500/[0.015] space-y-2">
                        <div className="flex items-center space-x-2 text-emerald-400 font-bold font-mono">
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          <span className="text-xs sm:text-sm text-slate-100">{row.kingdom}</span>
                        </div>
                        <p className="text-[11px] text-slate-350 leading-relaxed font-sans">
                          {row.kingdomSub}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
              </>
            )}

            {/* Specialized layout views */}
            {activeLayout === 'symphony' && (
              <SymphonyEmphasizedLayout 
                onOpenSymphonyChat={() => setIsSymphonyOpen(true)} 
                initialEstateName={estateName} 
              />
            )}

            {activeLayout === 'maestro' && (
              <MaestroDashboard 
                initialEstateName={estateName} 
              />
            )}

            {activeLayout === 'tokenization' && (
              <TokenizationLedgerLayout />
            )}

            {/* STEWARDSHIP GUIDE & TRANSPARENCY HELP SECTION */}
            <section className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 backdrop-blur-md space-y-6 text-left shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-violet-600/5 blur-3xl rounded-full pointer-events-none" />
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-violet-400">
                  <BookOpen className="w-5 h-5 text-violet-400" />
                  <span className="text-[10px] text-violet-400 font-bold uppercase tracking-widest font-mono">Operational Resource Guide</span>
                </div>
                <h2 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-violet-400 via-indigo-400 to-violet-450 bg-clip-text text-transparent font-sans">
                  Stewardship Guide: How Your App-Estate Builds
                </h2>
                <p className="text-sm text-slate-400">
                  Transparency on real-time infrastructure costs and strategic engineering workflows.
                </p>
              </div>

              <p className="text-sm text-slate-350 leading-relaxed font-sans max-w-4xl">
                Building applications with an AI agent is a highly iterative process. Because Kingdom.aiapps incurs direct, live infrastructure and processing costs from our underlying AI model providers, we pass those operational usage costs through.
              </p>

              <div className="grid grid-cols-1 gap-4 pt-4">
                {/* STRATEGY 1 */}
                <div className="p-5 bg-slate-950/40 rounded-xl border border-white/5 transition-all duration-300 transform-gpu hover:scale-[1.015] hover:bg-white/[0.04] hover:border-amber-500/35 hover:shadow-[0_0_20px_rgba(245,158,11,0.08)] space-y-2">
                  <div className="flex items-center space-x-2 text-violet-400">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-violet-500/10 border border-violet-500/20 font-mono">01</span>
                    <h3 className="text-sm font-bold text-white">Scope Things Down</h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Instead of asking the agent to build a large, complex system all at once, break your requests into small, bite-sized tasks.
                  </p>
                </div>

                {/* STRATEGY 2 */}
                <div className="p-5 bg-slate-950/40 rounded-xl border border-white/5 transition-all duration-300 transform-gpu hover:scale-[1.015] hover:bg-white/[0.04] hover:border-amber-500/35 hover:shadow-[0_0_20px_rgba(245,158,11,0.08)] space-y-2">
                  <div className="flex items-center space-x-2 text-violet-450">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-violet-500/10 border border-violet-500/20 font-mono">02</span>
                    <h3 className="text-sm font-bold text-white">Use Separate Threads for New Features</h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    As a conversation gets longer, the agent has to read the entire history of that thread for every new prompt, which consumes significantly more tokens.
                  </p>
                </div>

                {/* STRATEGY 3 */}
                <div className="p-5 bg-slate-950/40 rounded-xl border border-white/5 transition-all duration-300 transform-gpu hover:scale-[1.015] hover:bg-white/[0.04] hover:border-amber-500/35 hover:shadow-[0_0_20px_rgba(245,158,11,0.08)] space-y-2">
                  <div className="flex items-center space-x-2 text-violet-400">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-violet-500/10 border border-violet-500/20 font-mono">03</span>
                    <h3 className="text-sm font-bold text-white">Provide Detailed Prompts</h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    When an error occurs, try copy-pasting the exact technical error snippet or explaining the precise expected behavior.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 space-y-2 text-xs text-slate-400">
                <p className="font-semibold text-slate-350">
                  By keeping your workspace highly organized, you maximize the efficiency of your prompt energy resources and build highly optimized applications.
                </p>
                <p className="italic text-indigo-400 font-semibold">
                  Good luck building out your next features!
                </p>
              </div>
            </section>

            {/* SOVEREIGN PHILOSOPHY SECTION */}
            <section className="py-16 text-center max-w-3xl mx-auto space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-bold tracking-[0.3em] uppercase text-amber-500 font-mono block animate-pulse">
                  WHAT DOES THE SOUL SEE
                </span>
                <h2 className="text-2xl sm:text-3.5xl font-extrabold text-white font-sans tracking-tight leading-tight">
                  The Law of <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-250 to-amber-550 font-black">Digital Territory</span>
                </h2>
              </div>
              <p className="text-sm sm:text-base text-slate-350 font-normal leading-relaxed">
                We believe the internet is not merely a data stream; it is an infinite grid of sovereign territory. A domain name is more than an address—it is your permanent digital identity, your legal deed, and the baseline anchor of your real estate asset. In an era of centralized tech rental, Kingdom.aiapps returns absolute ownership to the creator. Your knowledge, your domain, your unbending digital estate.
              </p>
            </section>

            {/* BENEFITS VALUE TILES SECTION */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl transition-all duration-300 transform-gpu hover:scale-[1.02] hover:bg-white/[0.04] hover:border-amber-500/35 hover:shadow-[0_0_20px_rgba(245,158,11,0.1)] space-y-3 shadow-lg">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Private Cloud Isolation</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Every estate is deployed inside its own dedicated sandboxed environment. Your applications run securely within an isolated micro-virtual machine boundary with complete privacy protection.
                </p>
              </div>

              <div className="p-6 bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl transition-all duration-300 transform-gpu hover:scale-[1.02] hover:bg-white/[0.04] hover:border-amber-500/35 hover:shadow-[0_0_20px_rgba(245,158,11,0.1)] space-y-3 shadow-lg">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                  <Coins className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Sovereign Asset Ownership</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Your domain serves as a permanent cryptographic deed of ownership. Map your custom .kingdomaiapps.com address directly to isolated application assets and decentralized identity systems with zero third-party override.
                </p>
              </div>

              <div className="p-6 bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl transition-all duration-300 transform-gpu hover:scale-[1.02] hover:bg-white/[0.04] hover:border-amber-500/35 hover:shadow-[0_0_20px_rgba(245,158,11,0.1)] space-y-3 shadow-lg">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">On-Demand Engine Scaling</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Provision and orchestrate your application containers on-demand. Seamlessly expand compute nodes and allocate processing capacity using a frictionless, credit-based fuel top-up system.
                </p>
              </div>
            </section>

            {/* MARKET MATRIX STATS SECTION */}
            <section className="py-16 border-t border-b border-white/5 relative overflow-hidden my-8">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600/5 via-transparent to-indigo-600/5 pointer-events-none" />
              <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 rounded-2xl bg-slate-900/25 border border-white/5 transition-all duration-300 transform-gpu hover:scale-[1.02] hover:bg-white/[0.04] hover:border-amber-500/35 hover:shadow-[0_0_20px_rgba(245,158,11,0.1)] text-center md:text-left space-y-2">
                    <p className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-violet-400 font-mono uppercase">PROJECTED OPPORTUNITY</p>
                    <h3 className="text-3xl sm:text-4xl lg:text-4.5xl font-black font-sans bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-400 leading-none">
                      $1.3 TRILLION
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 font-medium">Projected global software market space.</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-slate-900/25 border border-white/5 transition-all duration-300 transform-gpu hover:scale-[1.02] hover:bg-white/[0.04] hover:border-amber-500/35 hover:shadow-[0_0_20px_rgba(245,158,11,0.1)] text-center md:text-left space-y-2">
                    <p className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-amber-400 font-mono uppercase">ANCHOR DISPATCH SPEED</p>
                    <h3 className="text-3xl sm:text-4xl lg:text-4.5xl font-black font-sans bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-yellow-250 to-amber-550 leading-none animate-pulse">
                      &lt; 15 MIN
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 font-medium">Average setup time to anchor a new webapp-estate.</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-slate-900/25 border border-white/5 transition-all duration-300 transform-gpu hover:scale-[1.02] hover:bg-white/[0.04] hover:border-amber-500/35 hover:shadow-[0_0_20px_rgba(245,158,11,0.1)] text-center md:text-left space-y-2 font-sans">
                    <p className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-emerald-400 font-mono uppercase">CONTROL &amp; ASSURANCE</p>
                    <h3 className="text-3xl sm:text-4xl lg:text-4.5xl font-black font-sans bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-emerald-350 to-teal-400 leading-none">
                      100% SOVEREIGN
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 font-medium">Absolute ownership over your code and data vectors.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* COMMON QUESTIONS ACCORDION */}
            <section className="py-12 border-b border-white/5 max-w-4xl mx-auto space-y-10 relative z-10 font-sans">
              <div className="text-center space-y-3">
                <span className="text-xs font-bold tracking-[0.3em] uppercase text-violet-400 font-mono block">
                  ONBOARDING KNOWLEDGE BASE
                </span>
                <h2 className="text-2xl sm:text-3.5xl font-extrabold text-white font-sans tracking-tight leading-tight flex flex-col sm:flex-row items-center justify-center gap-x-2">
                  <span>Common Questions &amp;</span>
                  <MatrixTerminalGlitchText 
                    text="Sovereign Directives" 
                    className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-400 to-violet-400 font-black font-sans"
                  />
                </h2>
                <p className="text-sm text-slate-400 max-w-lg mx-auto">
                  Get answers to core concepts regarding sandbox cloud isolation, domain deeds, and software scale.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    q: "What is an App-Estate?",
                    a: "An App-Estate is a fully isolated, sovereign full-stack application environment. Unlike shared hosts, your estate runs inside its own sandboxed container with a custom domain, private databases, and guaranteed compute resource allocations designed purely for your business logic."
                  },
                  {
                    q: "How do credits and fuel work?",
                    a: "Your App-Estate is powered by credits. Think of them as fuel for computational execution and real-time AI builders. As you interact, generate features, or serve traffic, credits are safely consumed. You can top up your estate's pre-loaded fuel pack on an on-demand basis."
                  },
                  {
                    q: "Do I get full ownership of my code?",
                    a: "Yes, 100%. Absolute sovereignty means you own every coordinate, file, and data-vector. You are never locked in, can download your entire compiled codebase at any time, and can host it independently on your or our distributed network."
                  },
                  {
                    q: "How does the custom domain configuration work?",
                    a: "Every established estate immediately registers a subdomain on the high-performance .kingdomaiapps.com network. You can configure and map your domain territory instantly inside the verification dashboard with zero manual configuration."
                  }
                ].map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div 
                      key={idx} 
                      className="border border-white/5 rounded-2xl bg-slate-900/10 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-white/10"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer focus:outline-none"
                        type="button"
                      >
                        <span className="text-sm sm:text-base font-extrabold text-white tracking-tight">{faq.q}</span>
                        <span className="ml-4 flex-shrink-0 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 transition-transform duration-300">
                          <Plus className={`w-4 h-4 text-violet-405 transition-transform duration-300 ${isOpen ? 'rotate-45 text-amber-400 font-bold' : ''}`} />
                        </span>
                      </button>
                      
                      <div 
                        className={`transition-all duration-300 ease-in-out overflow-hidden ${
                          isOpen ? 'max-h-60 border-t border-white/5' : 'max-h-0'
                        }`}
                      >
                        <div className="p-6 text-xs sm:text-sm text-slate-300 leading-relaxed text-left font-sans bg-slate-950/20">
                          {faq.a}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
              </>
            )}
          </motion.main>
        )}

        {/* CHECKOUT / SYNTHESIS STEP OVERLAY */}
        {view === 'checkout' && (
          <motion.div
            key="checkout"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="relative z-10 max-w-3xl mx-auto px-4 py-12 md:py-20"
          >
            <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              
              {/* Checkout Progress Header Bar */}
              <div className="bg-slate-950/50 backdrop-blur-md px-6 py-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Building className="w-5 h-5 text-violet-400" />
                  <span className="font-bold text-sm text-white">Sovereign Estate Synthesis</span>
                  <span className="hidden md:inline-flex items-center text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded font-mono font-bold tracking-wider uppercase">
                    STRIPE COMPLIANT | SECURE PLATFORM
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="md:hidden inline-flex items-center text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded font-mono font-bold tracking-wider uppercase">
                    STRIPE COMPLIANT | SECURE PLATFORM
                  </span>
                  <button 
                    onClick={() => setView('landing')} 
                    className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
                    disabled={checkoutStep === 1}
                  >
                    Cancel
                  </button>
                </div>
              </div>

              {/* STEP 0: THE CONFIG FORM */}
              {checkoutStep === 0 && (
                <div className="p-6 md:p-8 space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-white">Configure Your Digital Domain</h2>
                    <p className="text-sm text-slate-400">Provide naming identifiers for cryptographic sandboxed anchor deployment.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-400 block">Sovereign Domain Name</label>
                      <div className="flex rounded-xl overflow-hidden border border-white/10 bg-slate-950/60 focus-within:ring-2 focus-within:ring-violet-500/50 transition-all">
                        <input
                          type="text"
                          value={domain}
                          onChange={(e) => setDomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                          placeholder="your-estate-name"
                          className="w-full bg-transparent px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-0 font-mono"
                        />
                        <span className="bg-slate-900/50 px-3 py-2.5 text-xs text-slate-400 flex items-center border-l border-white/10 font-mono">.kingdomaiapps.com</span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-400 block">Estate Title (Human Readable)</label>
                      <input
                        type="text"
                        value={estateName}
                        onChange={(e) => setEstateName(e.target.value)}
                        placeholder="e.g. Neo Tokyo Garrison"
                        className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all font-sans"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-400 block">App Assistant Name</label>
                      <input
                        type="text"
                        value={initialNodeName}
                        onChange={(e) => setInitialNodeName(e.target.value)}
                        placeholder="Name the custom AI assistant that will help manage and guide your digital app residence."
                        className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all font-mono"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-400 block">Contact Sovereign Email</label>
                      <input
                        type="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        placeholder="sovereign@domain.com"
                        className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all font-sans"
                      />
                    </div>
                  </div>

                  {/* DYNAMIC FUEL SELECTION SELECTOR */}
                  <div className="space-y-2 border-t border-white/5 pt-4">
                    <label className="text-xs font-bold text-slate-400 block uppercase tracking-wider font-sans">Preloaded Sovereign node Fuel</label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-sans">
                      <button
                        type="button"
                        onClick={() => setSelectedTopUp(0)}
                        className={`p-2.5 rounded-xl text-center border text-xs transition-all cursor-pointer flex flex-col items-center justify-center ${
                          selectedTopUp === 0
                            ? 'bg-indigo-500/10 border-indigo-500/50 text-white font-bold ring-1 ring-indigo-500/50'
                            : 'bg-slate-950/60 border-white/5 text-slate-400 hover:border-white/10 hover:text-slate-300'
                        }`}
                      >
                        <span className="font-bold text-slate-300">0 Credits</span>
                        <span className="text-[10px] text-slate-500 mt-0.5 font-medium">No Preloaded Fuel ($0)</span>
                      </button>
                      {topUpOptions.map((opt) => (
                        <button
                          type="button"
                          key={opt.amount}
                          onClick={() => setSelectedTopUp(opt.amount)}
                          className={`p-2.5 rounded-xl text-center border text-xs transition-all cursor-pointer flex flex-col items-center justify-center ${
                            selectedTopUp === opt.amount
                              ? 'bg-indigo-500/10 border-indigo-500/50 text-white font-bold ring-1 ring-indigo-500/50'
                              : 'bg-slate-950/60 border-white/5 text-slate-400 hover:border-white/10 hover:text-slate-300'
                          }`}
                        >
                          <span className="font-bold text-indigo-400">+{opt.creditsFormatted}</span>
                          <span className="text-[10px] text-slate-500 mt-0.5 font-medium">${opt.amount} USD</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Summary of billing breakdown */}
                  <div className="p-4 bg-slate-950/60 backdrop-blur-md border border-white/5 rounded-xl space-y-2.5">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center justify-between">
                      <span>Deployment Capital Allocation</span>
                      <span className="text-indigo-400">Invoice Sum</span>
                    </h4>
                    <div className="text-sm space-y-2 text-slate-400 font-sans">
                      <div className="flex justify-between">
                        <span>Estate Host & Server Maintenance (Billed Monthly)</span>
                        <span className="text-white font-medium">$7.00 USD</span>
                      </div>
                      <div className="flex justify-between text-emerald-400/90 text-xs">
                        <span>First-Time User Welcome Pack (+5,000 Credits)</span>
                        <span className="font-semibold text-emerald-400">FREE ($5.00 Value Gifted)</span>
                      </div>
                      {selectedTopUp > 0 && (
                        <div className="flex justify-between text-xs text-indigo-300">
                          <span>Preloaded Node Fuel (+{selectedCreditsFormatted} Credits)</span>
                          <span className="text-white font-medium">${selectedTopUp}.00 USD</span>
                        </div>
                      )}
                    </div>
                    <div className="border-t border-white/5 pt-2 flex justify-between items-center text-sm font-bold text-white relative">
                      <div className="flex items-center space-x-1.5">
                        <span>Total Authorized Deposit (Payable now):</span>
                        <div className="relative inline-flex items-center">
                          <button
                            type="button"
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                            onClick={() => setShowTooltip(!showTooltip)}
                            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none cursor-pointer"
                            aria-label="Absolute Honesty Tooltip"
                          >
                            <Info className="w-4 h-4 text-slate-400 hover:text-indigo-400 transition-colors" />
                          </button>
                          
                          <AnimatePresence>
                            {showTooltip && (
                              <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 5 }}
                                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-4 bg-slate-950/95 backdrop-blur-lg border border-white/10 rounded-xl shadow-2xl text-xs text-slate-300 font-normal leading-relaxed z-50 text-left"
                              >
                                <span className="font-bold text-indigo-400 block mb-1">Absolute Honesty Policy</span>
                                Your $7 deposit covers your first month of cloud server maintenance to keep your digital app residence broadcasting live. Your starting fuel credits are a 100% free gift from us. You will never be automatically charged for extra credits. Additional fuel packs ($5, $10, $15, $20) are strictly on-demand. You only buy them manually when you choose to expand your estate.
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                      <span className="text-lg text-emerald-400 font-mono">${7 + selectedTopUp}.00 USD</span>
                    </div>
                  </div>

                  {/* Submit pay action */}
                  <div className="pt-2 font-sans">
                    <button
                      type="button"
                      onClick={handleStartProvisioning}
                      className="w-full py-4 text-center font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 rounded-xl shadow-lg shadow-violet-500/10 hover:shadow-violet-500/25 transition-all text-base cursor-pointer flex items-center justify-center space-x-2"
                    >
                      <CreditCard className="w-5 h-5" />
                      <span>Authorize Payment & Deploy Estate</span>
                    </button>
                    
                    {/* Kingdom Integrity Guarantee micro-disclaimer */}
                    <div className="mt-4 p-3.5 bg-emerald-500/5 border border-emerald-500/10 rounded-xl flex items-start space-x-2.5 text-left text-[11px] text-slate-400 font-sans">
                      <ShieldCheck className="w-4 h-4 flex-shrink-0 text-emerald-400 mt-0.5" />
                      <div>
                        <span className="text-emerald-400 font-bold block mb-0.5">Kingdom Integrity Guarantee</span>
                        <span>Fully sandboxed micro-VM execution with robust private clusters. Your neural keys and memory remain fully isolated on decentralized node clusters. Cancel or terminate anytime with complete state destruction.</span>
                      </div>
                    </div>

                    <p className="text-center text-[10px] text-slate-500 mt-3.5">
                      By authorizing, you launch an isolated sandbox VM running on standard Kingdom hosting networks. Terms apply.
                    </p>
                  </div>

                </div>
              )}

              {/* STEP 1: SOVEREIGN SUCCESS REDIRECTION CANVAS */}
              {checkoutStep === 1 && (
                <div className="p-6 md:p-10 text-center space-y-6 relative overflow-hidden bg-slate-950/90 rounded-3xl border border-violet-500/20 shadow-2xl">
                  {/* Glowing core accents */}
                  <div className="absolute top-0 left-1/4 w-72 h-72 bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />
                  <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

                  <div className="relative w-20 h-20 mx-auto">
                    <div className="absolute inset-0 rounded-full border border-violet-500/20" />
                    <div className="absolute inset-0 rounded-full border-2 border-t-violet-400 border-r-indigo-400 border-b-transparent border-l-transparent animate-spin" />
                    <div className="absolute inset-2.5 bg-slate-950 rounded-full flex items-center justify-center border border-white/5">
                      <Cpu className="w-7 h-7 text-violet-400 animate-pulse" />
                    </div>
                    <div className="absolute -inset-1 rounded-full bg-violet-500/10 blur-sm animate-pulse pointer-events-none" />
                  </div>

                  <div className="space-y-1 font-sans">
                    <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
                      Sovereign Success Redirection Canvas
                    </h3>
                    <p className="text-[10px] md:text-xs text-indigo-400 font-mono tracking-widest uppercase">
                      Initializing Domain-App Isolation Matrix ({provisioningTime}s / 5s)
                    </p>
                  </div>

                  {/* HIGH-TECH ORCHESTRATION TERMINAL */}
                  <div className="max-w-3xl mx-auto bg-slate-950/95 border border-violet-500/35 rounded-2xl overflow-hidden shadow-2xl text-left font-mono my-2 select-none relative z-10">
                    {/* OS Header */}
                    <div className="bg-slate-900/80 px-4 py-3 border-b border-white/10 flex items-center justify-between">
                      <div className="flex items-center space-x-2 font-mono">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/90 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/90 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/90 inline-block" />
                        <span className="text-[10px] md:text-xs text-slate-400 ml-2 flex items-center gap-1.5">
                          <span>symphony@orchestration-engine:~</span>
                          <span className="text-[8px] sm:text-[9px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">VM Isolate</span>
                        </span>
                      </div>
                      <span className="text-[9px] text-slate-500 hidden sm:inline">PORT: 3000</span>
                    </div>

                    {/* Split View Components Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10 bg-slate-950/45">
                      
                      {/* Left: Interactive code streaming area */}
                      <div className="p-4 flex flex-col justify-between min-h-[220px]">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-[9px] text-slate-500 font-bold uppercase tracking-wider pb-1.5 border-b border-white/5 font-mono">
                            <span>Compilation: Code Streamer</span>
                            <span className="text-amber-400 animate-pulse font-extrabold uppercase text-[8px] tracking-wider">&bull; Live Transpiling</span>
                          </div>
                          
                          <div className="text-[10px] sm:text-xs text-slate-350 font-mono overflow-y-auto max-h-[170px] whitespace-pre-wrap leading-relaxed mt-1 scrollbar-thin scrollbar-thumb-white/5">
                            {typedCode}
                            <span className="inline-block w-1.5 h-3.5 bg-violet-400 ml-1 animate-[pulse_1.5s_infinite]" />
                          </div>
                        </div>
                        <div className="text-[9px] text-slate-600 pt-2 border-t border-white/5 flex items-center justify-between font-sans">
                          <span>Writing custom assets & configs...</span>
                          <span className="text-violet-400 font-mono">60 FPS live</span>
                        </div>
                      </div>

                      {/* Right: Cascade Stagger success list */}
                      <div className="p-4 flex flex-col justify-between min-h-[220px]">
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between text-[9px] text-slate-500 font-bold uppercase tracking-wider pb-1.5 border-b border-white/5 font-mono">
                            <span>Symphony Compilation Pipeline</span>
                            <span className="text-emerald-400 font-bold text-[8px] tracking-wider">PIPELINE STAGED</span>
                          </div>

                          <div className="space-y-1.5 text-[11px] font-mono">
                            {[
                              { path: "src/components/symphony.tsx", desc: "Symphony primary orchestrator component definition" },
                              { path: "src/App.tsx", desc: "Main entrypoint application router and direct states" },
                              { path: "src/main.tsx", desc: "Bootstrap loader Virtual DOM mounting" },
                              { path: "server.ts", desc: "Express sandboxed dev environment proxy layers" },
                              { path: "firestore.rules", desc: "Isolated ABAC database transaction security rules" },
                              { path: "package.json", desc: "Sovereign manifest and preloaded fuel balance" }
                            ].map((file, fsIdx) => {
                              const isVisible = fsIdx < compiledFilesCount;
                              return (
                                <div 
                                  key={file.path}
                                  className={`flex items-start justify-between gap-3 p-1.5 rounded border transition-all duration-300 transform-gpu ${
                                    isVisible 
                                      ? 'opacity-100 translate-x-0 bg-slate-900/50 border-white/5' 
                                      : 'opacity-0 -translate-x-2 bg-transparent border-transparent'
                                  }`}
                                >
                                  <div className="overflow-hidden">
                                    <p className="font-bold text-slate-200 text-[10px] sm:text-xs truncate flex items-center gap-1.5">
                                      <span className="text-violet-400">&bull;</span>
                                      {file.path}
                                    </p>
                                    <p className="text-[9px] text-slate-500 truncate mt-0.5 font-sans">{file.desc}</p>
                                  </div>
                                  {isVisible && (
                                    <span className="self-center flex items-center gap-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded text-[8px] font-bold tracking-wider">
                                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                      <span>[Success]</span>
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        <div className="text-[9px] text-slate-600 pt-2 border-t border-white/5 flex items-center justify-between font-sans">
                          <span>Partition cluster: US-CENTRAL</span>
                          <span className="text-emerald-400 font-mono font-bold">200 OK</span>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* CONSOLE DETAILS CODE BLOCK */}
                  <div className="max-w-3xl mx-auto space-y-1.5 text-left relative z-10">
                    <span className="text-[9px] text-slate-550 font-bold uppercase tracking-widest block font-sans">
                      Asset Blueprint Parameters (Firestore Payload Spec)
                    </span>
                    <div className="bg-slate-950 border border-white/5 p-3 sm:p-4 rounded-xl shadow-inner relative overflow-hidden group font-mono">
                      <div className="absolute top-1.5 right-2 selection:bg-transparent text-[8px] text-slate-600 font-bold">
                        JSON_SCHEMA_v2_ABAC
                      </div>
                      <pre className="text-[10px] text-indigo-300 overflow-x-auto selection:bg-indigo-500/20 max-h-40 scrollbar-thin scrollbar-thumb-white/5">
                        <code>{JSON.stringify(appEstatePayload, null, 2)}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: SPLASH SUCCESS */}
              {checkoutStep === 2 && (
                <div className="p-8 md:p-12 text-center space-y-8">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto shadow-inner border border-emerald-500/10">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-white">Digital Sovereign Established!</h3>
                    <p className="text-sm text-slate-400">Estate VM isolated and fully anchored to your cryptographic nameplate.</p>
                  </div>

                  {/* Summary card */}
                  <div className="max-w-md mx-auto p-4 bg-slate-950/60 backdrop-blur-md border border-white/5 rounded-xl space-y-1.5 text-sm text-left font-sans animate-fade-in">
                    <div className="flex justify-between border-b border-white/5 pb-1.5 text-xs text-slate-500 font-bold uppercase tracking-wider">
                      <span>Attribute</span>
                      <span>Configured Node</span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="text-slate-400">Estate Domain:</span>
                      <span className="text-white font-mono font-semibold">{customDomain || 'genesis'}.kingdomaiapps.com</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Domain Authority:</span>
                      <span className="text-white font-semibold">{estateName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Primary Neural Core:</span>
                      <span className="text-indigo-400 font-mono font-medium">{initialNodeName || 'Aegis-I'}</span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-white/5 font-semibold">
                      <span className="text-slate-400">Sovereign Credit Fuel:</span>
                      <span className="text-emerald-400">{selectedCreditsFormatted} Credits ready</span>
                    </div>
                  </div>

                  {/* FIRESTORE ISOLATION WRITES FOR DEV SIMULATION MODE */}
                  {devSimulationMode && firestoreWriteStatus && (
                    <div className="max-w-md mx-auto p-4 bg-indigo-950/25 border border-indigo-500/30 rounded-xl space-y-2 text-left font-mono text-xs">
                      <div className="flex items-center space-x-2 text-indigo-400 font-bold uppercase tracking-wider text-[11px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                        <span>Firestore Isolation Keys Synced</span>
                      </div>
                      <p className="text-slate-300 leading-relaxed text-[11px] font-sans">
                        {firestoreWriteStatus}
                      </p>
                      <div className="text-[10px] text-slate-500">
                        Isolated Partition: <span className="text-indigo-300">stable-us-central1-firestore-db</span>
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setView('dashboard');
                      setDashboardTab('overview');
                      setCheckoutStep(0); // Reset for future checkout simulated experiences
                    }}
                    className="px-8 py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-violet-500/15 hover:shadow-violet-500/30 transition-all cursor-pointer inline-flex items-center space-x-2"
                  >
                    <span>Enter Sovereign Workspace</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

            </div>

                        {/* ADMIN TESTING DASHBOARD PANEL - Secured behind private unlisted URL path */}

          </motion.div>
        )}

        {/* CREATOR DASHBOARD VIEW */}
        {view === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.25 }}
            className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8"
          >
            
            {/* Dashboard Workspace Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-white/5 pb-6 gap-4">
              <div>
                <div className="flex items-center space-x-2.5 text-xs text-slate-500 font-bold uppercase tracking-widest">
                  <span className="font-mono text-violet-400 bg-violet-600/5 border border-violet-500/15 px-2 py-0.5 rounded">ESTATE NODE CHUB</span>
                  <span>&bull;</span>
                  <span>Isolation Live</span>
                </div>
                <h1 className="text-3xl font-black text-white tracking-tight mt-1">{estateName}</h1>
                <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5 font-mono">
                  <Globe className="w-3.5 h-3.5 text-indigo-400" />
                  <span>https://{customDomain}.kingdomaiapps.com</span>
                </p>
              </div>

              {/* Stats highlights */}
              <div className="flex items-center space-x-4">
                <div className="bg-slate-950/40 backdrop-blur-md border border-white/10 p-3.5 rounded-2xl flex items-center space-x-3.5 shadow-lg">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <Coins className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block font-bold uppercase tracking-wider">FUEL BALANCE</span>
                    <span className="text-base font-extrabold text-white font-mono">{userCredits.toLocaleString()} <span className="text-[10px] text-slate-400 font-normal">Credits</span></span>
                  </div>
                </div>

                <div className="bg-slate-950/40 backdrop-blur-md border border-white/10 p-3.5 rounded-2xl flex items-center space-x-3.5 shadow-lg">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block font-bold uppercase tracking-wider">ACTIVE NODES</span>
                    <span className="text-base font-extrabold text-white font-mono">{nodes.length} <span className="text-[10px] text-slate-400 font-normal">VM cores</span></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Nav Menu */}
            <div className="flex border-b border-white/5 space-x-6">
              {[
                { id: 'overview', label: 'Overview', icon: LayoutDashboard },
                { id: 'nodes', label: 'Intelligence Nodes', icon: Cpu },
                { id: 'billing', label: 'Fuel & Maintenance', icon: Zap },
                { id: 'settings', label: 'Cryptographic Settings', icon: Settings },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setDashboardTab(tab.id as any)}
                    className={`pb-4 text-sm font-semibold flex items-center space-x-2 cursor-pointer border-b-2 transition-all duration-200 ${
                      dashboardTab === tab.id
                        ? 'border-violet-500 text-white'
                        : 'border-transparent text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* DASHBOARD SUITES */}
            <div className="grid grid-cols-1 gap-8">
              
              {/* TAB: OVERVIEW */}
              {dashboardTab === 'overview' && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Primary welcome card widget */}
                    <div className="lg:col-span-2 p-6 bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl flex flex-col justify-between space-y-6 relative overflow-hidden shadow-xl">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/5 blur-2xl rounded-full" />
                      
                      <div className="space-y-2">
                        <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-400 font-bold uppercase">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                          <span>ALL SYSTEMS SECURED</span>
                        </div>
                        <h2 className="text-xl font-extrabold text-white">Sovereign Space Operational</h2>
                        <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
                          Your physical micro-VM cluster is running isolated under authority host. Active queries are mapped via secure proxy pipelines to cryptographic sub-domain name records.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/5">
                        <div className="space-y-0.5">
                          <span className="text-xs text-slate-500 block font-semibold">Domain Registration</span>
                          <span className="text-sm font-bold text-white font-mono flex items-center gap-1">
                            <Check className="w-4 h-4 text-emerald-400" />
                            <span>{customDomain}.kingdomaiapps.com</span>
                          </span>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-xs text-slate-500 block font-semibold">Maintenance Cost Plan</span>
                          <span className="text-sm font-bold text-white flex items-center gap-1">
                            <span>$7.00/mo &bull; Pre-authorized</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Credit Info Widget */}
                    <div className="p-6 bg-indigo-500/5 backdrop-blur-xl border border-indigo-500/25 rounded-3xl flex flex-col justify-between space-y-6 shadow-lg shadow-indigo-500/5">
                      <div className="space-y-2.5">
                        <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider flex items-center justify-between font-sans">
                          <span>Fuel Account</span>
                          <Zap className="w-4 h-4" />
                        </h3>
                        <div className="py-2">
                          <span className="text-3xl font-black text-white font-mono">{userCredits.toLocaleString()}</span>
                          <span className="text-xs text-slate-400 ml-1.5 font-sans">Credits remain</span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed font-sans">
                          Credits feed your active intelligence nodes. Standard requests expend approximately <span className="text-indigo-400 font-semibold font-mono">120 cr.</span> per prompt run.
                        </p>
                      </div>

                      <button
                        onClick={() => setDashboardTab('billing')}
                        className="w-full py-2.5 text-center text-xs font-bold text-white bg-indigo-600/20 hover:bg-indigo-600/30 border border-white/10 hover:border-indigo-500/30 rounded-xl transition-all cursor-pointer font-sans"
                      >
                        Top-up prompt fuel credits
                      </button>
                    </div>

                  </div>

                  {/* INTERACTIVE COMPONENT: NODE PROMPT QUERY TERMINAL */}
                  <div className="p-6 bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl space-y-4 shadow-xl">
                    <div className="flex items-center justify-between border-b border-white/5 pb-3 font-sans">
                      <div>
                        <h3 className="text-base font-bold text-white">Interactive Sentry Console</h3>
                        <p className="text-xs text-slate-400">Trigger standard intelligence weights currently bound inside your VM sandbox.</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <label className="text-xs font-semibold text-slate-500">Query Target:</label>
                        <select
                          value={selectedNodeId}
                          onChange={(e) => setSelectedNodeId(e.target.value)}
                          className="bg-slate-950/60 border border-white/10 text-xs text-slate-300 rounded-lg px-2.5 py-1.5 font-mono focus:outline-none focus:ring-1 focus:ring-violet-500/50"
                        >
                          {nodes.map(n => (
                            <option key={n.id} value={n.id}>{n.name} ({n.model})</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      
                      {/* Form panel */}
                      <form onSubmit={handleQueryNode} className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-400 font-sans">Instruct Node payload</label>
                          <textarea
                            value={nodeQuery}
                            onChange={(e) => setNodeQuery(e.target.value)}
                            placeholder="Type 'hello', 'status', 'estate', 'manifest' to query the instance..."
                            rows={3}
                            className="w-full bg-slate-950/60 border border-white/10 rounded-xl p-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all font-mono"
                          />
                        </div>

                        <div className="flex items-center justify-between font-sans">
                          <div className="flex items-center space-x-1.5 text-slate-500 text-xs">
                            <Info className="w-3.5 h-3.5" />
                            <span>Run consumes 120 cr.</span>
                          </div>
                          <button
                            type="submit"
                            disabled={isQuerying || !nodeQuery.trim() || userCredits < 100}
                            className="bg-violet-600 hover:bg-violet-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-semibold text-xs py-2 px-5 rounded-lg transition-all cursor-pointer flex items-center space-x-1.5"
                          >
                            {isQuerying ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
                            <span>{isQuerying ? 'Querying...' : 'Fire Query'}</span>
                          </button>
                        </div>
                      </form>

                      {/* Display panel */}
                      <div className="bg-slate-950/50 backdrop-blur-md border border-white/10 p-4 rounded-xl flex flex-col justify-between font-mono text-xs text-slate-400 min-h-[160px] shadow-inner">
                        <div className="space-y-2">
                          <div className="flex justify-between border-b border-white/5 pb-1.5 text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
                            <span>Console Response Output</span>
                            <span className="text-indigo-400">Stream payload</span>
                          </div>
                          
                          {nodeResponse ? (
                            <div className="whitespace-pre-wrap text-slate-250 leading-relaxed font-sans mt-2 text-sm">{nodeResponse}</div>
                          ) : (
                            <p className="text-slate-600 italic font-sans">No output logged. Dispatch instructions above to view micro-VM responses in real-time.</p>
                          )}
                        </div>

                        <div className="text-[10px] text-slate-500 text-right pt-2 border-t border-white/5">
                          Active Sandbox VM IP: <span className="text-indigo-500">10.122.4.9</span>
                        </div>
                      </div>

                    </div>
                  </div>

                </motion.div>
              )}

              {/* TAB: NODES MANAGEMENT */}
              {dashboardTab === 'nodes' && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Active list column */}
                    <div className="lg:col-span-2 space-y-4">
                      <h3 className="text-base font-bold text-white">Configured Sandbox Clusters</h3>
                      
                      <div className="space-y-3">
                        {nodes.map((node) => (
                          <div 
                            key={node.id}
                            className="p-4 bg-slate-900/40 backdrop-blur-xl border border-white/10 hover:border-white/20 rounded-2xl transition-all duration-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-md"
                          >
                            <div className="flex items-center space-x-3.5">
                              <div className="w-10 h-10 rounded-lg bg-violet-600/10 text-violet-400 flex items-center justify-center">
                                <Cpu className="w-5 h-5" />
                              </div>
                              <div>
                                <h4 className="font-bold text-white text-sm font-mono">{node.name}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-xs text-slate-400">{node.model}</span>
                                  <span className="text-[10px] text-slate-500 font-bold">&bull;</span>
                                  <span className="text-[10px] text-slate-500 font-mono">Created {node.created}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between sm:justify-end gap-6 text-xs font-sans">
                              <div className="space-y-0.5 text-right">
                                <span className="text-slate-500 text-[10px] block font-semibold">CUMULATIVE LOAD</span>
                                <span className="font-mono text-slate-300 font-bold">{node.creditsConsumed.toLocaleString()} cr. used</span>
                              </div>

                              <div className="flex items-center space-x-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/20" />
                                <span className="text-slate-300 font-medium">Isolated Run</span>
                              </div>
                            </div>

                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Node Creator Form */}
                    <div className="p-6 bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl h-fit space-y-5 shadow-xl">
                      <div className="border-b border-white/5 pb-3">
                        <h3 className="font-bold text-white">Synthesize Intelligence Node</h3>
                        <p className="text-xs text-slate-400 mt-1">Deploy an additional micro model instance inside this space.</p>
                      </div>

                      <form onSubmit={handleCreateNode} className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-400">Node Identifier</label>
                          <input
                            type="text"
                            required
                            value={newNodeName}
                            onChange={(e) => setNewNodeName(e.target.value.replace(/[^a-zA-Z0-9-]/g, ''))}
                            placeholder="e.g. Sentry-II"
                            className="w-full bg-slate-950/60 border border-white/10 rounded-lg p-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-violet-500/50 font-mono"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-400">Primary Core Weights</label>
                          <select
                            value={newNodeModel}
                            onChange={(e) => setNewNodeModel(e.target.value)}
                            className="w-full bg-slate-950/60 border border-white/10 rounded-lg p-2.5 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-violet-500/50 font-sans"
                          >
                            <option value="Sovereign Llama 3">Sovereign Llama 3 (8B weights)</option>
                            <option value="Royal Deep Oracle 2">Royal Deep Oracle (Reasoning models)</option>
                            <option value="Whisper Transcription">Whisper Synthesis Core</option>
                          </select>
                        </div>

                        <button
                          type="submit"
                          disabled={isCreatingNode || !newNodeName.trim()}
                          className="w-full py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 font-semibold text-xs text-white rounded-lg transition-all cursor-pointer flex items-center justify-center space-x-1"
                        >
                          {isCreatingNode ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                          <span>{isCreatingNode ? 'Synthesizing...' : 'Synthesize VM Core'}</span>
                        </button>
                      </form>
                    </div>

                  </div>
                </motion.div>
              )}

              {/* TAB: FUEL & BILLING */}
              {dashboardTab === 'billing' && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    {/* Pre-purchased fuel recharge area */}
                    <div className="p-6 bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl space-y-6 shadow-xl">
                      <div className="border-b border-white/5 pb-3 flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-white text-base">Quick Recharge Prompt Fuel</h3>
                          <p className="text-xs text-slate-400 mt-1">Refuel credits instantly directly to this estate sandbox.</p>
                        </div>
                        <Coins className="w-6 h-6 text-indigo-400" />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {topUpOptions.map((opt) => (
                          <button
                            key={opt.amount}
                            onClick={() => {
                              setSelectedTopUp(opt.amount);
                              setUserCredits(prev => prev + opt.credits);
                              alert(`Simulated Transaction Approved: pre-loaded ${opt.creditsFormatted} credits instantly added to your account!`);
                            }}
                            className="relative flex flex-col items-start p-4 bg-slate-950/60 hover:bg-slate-950 border border-white/5 hover:border-white/10 rounded-xl text-left transition-all duration-200 cursor-pointer shadow-md"
                          >
                            <span className="text-xs text-indigo-400 font-bold uppercase tracking-wider">{opt.bonus}</span>
                            <span className="text-lg font-bold text-white mt-1">${opt.amount} USD</span>
                            <span className="text-xs text-slate-400 mt-0.5 font-mono">+{opt.creditsFormatted} Credits</span>
                          </button>
                        ))}
                      </div>

                      <p className="text-xs text-slate-500 tracking-wide font-normal">
                        Note: Transactions are processed as sandbox payloads in this mockup state interface. Your credit value is updated immediately.
                      </p>
                    </div>

                    {/* Subscription & Property stats */}
                    <div className="p-6 bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl flex flex-col justify-between space-y-6 shadow-xl">
                      <div className="space-y-4">
                        <div className="border-b border-white/5 pb-3">
                          <h3 className="font-bold text-white text-base">Authorized Maintenance Logs</h3>
                          <p className="text-xs text-slate-400 mt-1">Secure record keeping for recurring digital sovereignty fees.</p>
                        </div>

                        <div className="space-y-2.5 text-sm text-slate-300 font-sans">
                          <div className="flex justify-between items-center bg-slate-950/60 p-3 rounded-xl border border-white/5">
                            <span className="text-slate-400">Monthly Maintenance Anchor:</span>
                            <span className="text-white font-semibold font-mono">$7.00 USD / mo</span>
                          </div>
                          
                          <div className="flex justify-between items-center bg-slate-950/60 p-3 rounded-xl border border-white/5">
                            <span className="text-slate-400">Payment Gateway Token:</span>
                            <span className="text-white font-mono font-medium flex items-center gap-1">
                              <ShieldCheck className="w-4 h-4 text-emerald-400" />
                              <span>Card Auth Active</span>
                            </span>
                          </div>

                          <div className="flex justify-between items-center bg-slate-950/60 p-3 rounded-xl border border-white/5 font-sans">
                            <span className="text-slate-400">Property Boundary Status:</span>
                            <span className="text-emerald-400 font-bold uppercase text-xs">Pre-authorized</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/5 flex justify-between items-center font-sans">
                        <span className="text-xs text-slate-500 font-sans">Authorized for registration account: {userEmail || 'sovereign@kingdom.ai'}</span>
                        <button
                          onClick={() => {
                            if (confirm('Cancel recurring sovereign property maintenance? (This shuts down container node hosting)')) {
                              setView('landing');
                              setHasPaidFee(false);
                            }
                          }}
                          className="text-xs text-rose-400 hover:text-rose-300 font-bold transition-all cursor-pointer"
                        >
                          Decommission Property
                        </button>
                      </div>

                    </div>

                  </div>
                </motion.div>
              )}

              {/* TAB: CRYPTOGRAPHIC SETTINGS */}
              {dashboardTab === 'settings' && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl space-y-6 shadow-xl"
                >
                  <div className="border-b border-white/5 pb-4 font-sans">
                    <h3 className="font-bold text-white text-base">Sovereign Domain Settings</h3>
                    <p className="text-xs text-slate-400 mt-1">Manage private configurations and cryptographic metadata linked to this sandbox.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    <div className="space-y-3 font-sans">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Update Estate Domain Name</h4>
                      <div className="flex rounded-xl overflow-hidden border border-white/10 bg-slate-950/60 focus-within:ring-2 focus-within:ring-violet-500/50 transition-all">
                        <input
                          type="text"
                          value={customDomain}
                          onChange={(e) => setCustomDomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                          className="w-full bg-transparent px-3 py-2 text-xs text-white font-mono focus:outline-none"
                        />
                        <span className="bg-slate-900/50 px-3 py-2 text-xs text-slate-500 flex items-center text-center font-mono border-l border-white/10">.kingdomaiapps.com</span>
                      </div>
                      <p className="text-[10px] text-slate-500 font-normal">Editing this anchor updates DNS routers inside the sandbox VM. Traffic automatically routes.</p>
                    </div>

                    <div className="space-y-3 font-sans">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Estate Authoritative Naming</h4>
                      <input
                        type="text"
                        value={estateName}
                        onChange={(e) => setEstateName(e.target.value)}
                        className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all font-sans"
                      />
                      <p className="text-[10px] text-slate-500 font-normal">Sovereignty claims will reflect this human-readable title inside the Hub index.</p>
                    </div>

                  </div>

                  <div className="pt-6 border-t border-white/5 space-y-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 font-mono">
                      <Key className="w-4 h-4 text-violet-400" />
                      <span>Estate Private Authority Keys</span>
                    </h4>

                    <div className="p-4 bg-slate-950/50 backdrop-blur-md border border-white/10 rounded-xl space-y-2 font-mono text-xs text-slate-400 select-all">
                      <div>SECKEY_ROUTING_KEY_PAIR="k_sec_10989218aa34bc98"</div>
                      <div>RSA_SHA256_FINGERPRINT="4F:E2:32:0A:11:99:BB:CC:DD"</div>
                      <div className="text-[10px] text-slate-600 select-none">Private keys must never be revealed. Safe and stored in VM keystore.</div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between items-center text-xs border-t border-white/5 font-sans">
                    <span className="text-slate-500">Need to fully reset sandbox and test the original landing page flow?</span>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm('Are you sure you want to reset all custom sandbox nodes to show the landing page again?')) {
                          setView('landing');
                          setDomain('');
                          setSearchResult(null);
                          setSelectedTopUp(15);
                          setHasPaidFee(false);
                          setEstateName('My First Kingdom');
                          setInitialNodeName('Aegis-I');
                          setNodes([
                            {
                              id: 'node-1',
                              name: 'Aegis-I',
                              model: 'Sovereign Llama 3',
                              status: 'active',
                              creditsConsumed: 240,
                              created: '2026-05-26 11:30'
                            }
                          ]);
                        }
                      }}
                      className="text-violet-400 hover:text-violet-300 font-bold cursor-pointer font-sans"
                    >
                      Hard Reset Workspace
                    </button>
                  </div>

                </motion.div>
              )}

            </div>

          </motion.div>
        )}

      </AnimatePresence>

      </div>

      {/* FOOTER BAR */}
      <footer className="border-t border-white/5 bg-slate-950/45 backdrop-blur-sm py-12 text-center text-xs text-slate-500 relative z-10 font-mono mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>&copy; {new Date().getFullYear()} Kingdom.aiapps. All rights to digital domain sovereignty reserved.</p>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-2 sm:mt-0">
            <a href="mailto:hello@kingdomaiapps.com" className="text-slate-400 hover:text-indigo-300 transition-colors">hello@kingdomaiapps.com</a>
            <span className="text-slate-700 hidden sm:inline">&bull;</span>
            <div className="flex items-center space-x-4">
              <span className="text-[10px] bg-slate-900/50 border border-white/10 px-2 py-0.5 rounded text-indigo-400 font-bold uppercase tracking-wider">STABLE VERSION 2.0</span>
              <span className="text-slate-600">Secure Cluster Isolation Active</span>
            </div>
          </div>
        </div>
      </footer>

      {/* LOW-PROFILE COOKIE COMPLIANCE */}
      <AnimatePresence>
        {!cookieConsent && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-6 left-6 z-[999] max-w-xs sm:max-w-sm bg-slate-950/90 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col space-y-3"
          >
            <div className="flex items-start space-x-3 text-left">
              <div className="p-2 bg-violet-600/15 text-violet-405 rounded-xl mt-0.5 flex-shrink-0">
                <ShieldCheck className="w-4 h-4 text-violet-400" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-white tracking-widest uppercase font-mono">Territorial Privacy</h4>
                <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                  We use cookies and sovereign telemetry nodes to protect, secure, and customize your dedicated cloud App-Estate environment.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end space-x-2 pt-2 border-t border-white/5">
              <button
                onClick={() => {
                  setCookieConsent(true);
                  try {
                    localStorage.setItem('kingdom_cookie_consent', 'true');
                  } catch (e) {
                    console.error(e);
                  }
                }}
                className="px-4 py-2 text-[10px] font-bold text-slate-950 bg-gradient-to-r from-violet-400 to-indigo-400 hover:from-violet-300 hover:to-indigo-300 rounded-lg transition-all font-mono uppercase cursor-pointer"
                type="button"
              >
                Accept Deeds
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING SYMPHONY ORCHESTRATOR CHAT */}
      <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end">
        <AnimatePresence>
          {isSymphonyOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="w-80 sm:w-96 bg-slate-950/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col mb-4 max-h-[500px] h-[450px]"
            >
              {/* Header */}
              <div className="p-4 bg-gradient-to-r from-slate-900 to-indigo-950/50 border-b border-white/5 flex items-start justify-between">
                <div className="flex items-start space-x-3 text-left">
                  <div className="p-2 bg-violet-600/15 text-violet-405 rounded-xl mt-0.5 flex-shrink-0 border border-violet-500/20">
                    <Sparkles className="w-4 h-4 text-violet-400 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white tracking-wider flex items-center gap-1.5 font-sans">
                      {activeEngine.title}
                      <span className="text-[9px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-full font-bold uppercase tracking-widest">
                        App Generator
                      </span>
                    </h4>
                    {/* The requested Symphony subtitle */}
                    <p className="text-[10px] sm:text-[11px] text-slate-300 italic font-sans leading-relaxed mt-0.5 max-w-[220px] sm:max-w-[250px] font-normal">
                      {activeEngine.hook}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSymphonyOpen(false)}
                  className="p-1 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors cursor-pointer text-xl font-bold font-mono leading-none"
                >
                  &times;
                </button>
              </div>



              {/* Messages Body */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-white/10 text-left">
                {symphonyMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-br from-violet-600 to-indigo-600 text-white rounded-tr-none'
                          : 'bg-slate-900/85 border border-white/5 text-slate-200 rounded-tl-none'
                      }`}
                    >
                      <p className="font-sans font-medium">{msg.text}</p>
                      <span className="text-[8px] text-slate-400 block text-right mt-1 opacity-60 font-mono">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))}
                
                {isSymphonyTyping && (
                  <div className="flex justify-start">
                    <div className="bg-slate-900/85 border border-white/5 rounded-2xl rounded-tl-none p-3 space-x-1 flex items-center">
                      <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Input */}
              <form onSubmit={handleSendSymphony} className="p-3 border-t border-white/5 bg-slate-950 flex items-center gap-2">
                <input
                  type="text"
                  value={symphonyInput}
                  onChange={(e) => setSymphonyInput(e.target.value)}
                  placeholder="Ask Symphony to generate an app (e.g. podcast app, to-do list)..."
                  className="flex-1 bg-slate-900/70 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-violet-500/50 transition-all font-sans"
                />
                <button
                  type="submit"
                  disabled={!symphonyInput.trim() || isSymphonyTyping}
                  className="p-2.5 bg-violet-600 hover:bg-violet-500 disabled:bg-slate-900 disabled:text-slate-600 text-white rounded-xl transition-all cursor-pointer flex-shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Launcher Button */}
        <button
          onClick={() => setIsSymphonyOpen(!isSymphonyOpen)}
          type="button"
          className="relative group flex items-center justify-center p-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-full shadow-[0_10px_30px_rgba(109,40,217,0.4)] hover:shadow-[0_10px_35px_rgba(109,40,217,0.6)] border border-violet-500/30 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 cursor-pointer"
        >
          {isSymphonyOpen ? (
            <span className="text-xl font-bold font-mono h-6 w-6 flex items-center justify-center">&times;</span>
          ) : (
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
              <span className="text-xs font-bold font-mono tracking-wider uppercase pr-1 hidden sm:inline text-amber-100">{activeEngine.title}</span>
            </div>
          )}
          
          {/* Unread dot indicator when closed */}
          {!isSymphonyOpen && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          )}
        </button>
      </div>

    </div>
  );
}

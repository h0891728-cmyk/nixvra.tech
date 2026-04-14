import React, { useState, useEffect } from 'react';
import { ChevronDown, X, Code, Terminal, Layers, TrendingUp, CheckCircle, Database, Server, Smartphone, LayoutDashboard, Globe, Zap, MessageSquare, Briefcase, Cpu, Check, FileCheck, Rocket, GitBranch } from 'lucide-react';
import NixvraLogo from './components/NixvraLogo';

// --- BUBBLE BACKGROUND COMPONENT ---
const BubbleBackground = () => {
  const [bubbles, setBubbles] = useState<Array<{ id: number, left: string, size: string, duration: string, delay: string }>>([]);
  useEffect(() => {
    const newBubbles = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 120 + 40}px`,
      duration: `${Math.random() * 10 + 10}s`,
      delay: `${Math.random() * 5}s`
    }));
    setBubbles(newBubbles);
  }, []);
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {bubbles.map((bubble) => (
         <div key={bubble.id} className="absolute rounded-full bubble-animate" style={{ left: bubble.left, width: bubble.size, height: bubble.size, animationDuration: bubble.duration, animationDelay: bubble.delay }} />
      ))}
    </div>
  );
};

// --- TYPEWRITER HOOK ---
const useTypewriter = (words: string[], typingSpeed = 100, deletingSpeed = 50, pauseDelay = 2000) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    const handleType = () => {
      const currentWord = words[loopNum % words.length];
      if (isDeleting) setText(currentWord.substring(0, text.length - 1));
      else setText(currentWord.substring(0, text.length + 1));

      let typeSpeed = isDeleting ? deletingSpeed : typingSpeed;
      if (!isDeleting && text === currentWord) {
        typeSpeed = pauseDelay;
        setIsDeleting(true);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        typeSpeed = 500;
      }
      return typeSpeed;
    };
    const timer = setTimeout(handleType, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, words, typingSpeed, deletingSpeed, pauseDelay]);
  return text;
};

const SERVICES = [
  {
    id: 1, title: "React UI/UX Architecture", icon: <Code className="w-8 h-8 text-[#00B077]" />,
    shortDesc: "Pixel-perfect frontends built for extreme user retention and fast metrics.",
    fullDesc: "We don't use WordPress or generic drag-and-drop builders. We write pure React, Next.js, and Vite code to construct tailored single-page applications. The result is a frictionless, app-like experience right in the browser, eliminating bounce rates.",
    bottleneck: "Slow, generic templates driving away high-ticket target clients who expect premium experiences.",
    solution: "Sub-second LCP loads, advanced state management, and fluid custom CSS animations wrapping native JS.",
    roi: ["40% Jump in User Retention", "Sub-second LCP Speeds", "Premium Brand Perception"], tabs: ["Overview", "Technical specs"]
  },
  {
    id: 2, title: "Python Cloud Automation", icon: <Terminal className="w-8 h-8 text-[#00B077]" />,
    shortDesc: "Eliminate extreme manual data entry with Python cloud scripts.",
    fullDesc: "Stop paying entry-level employees to copy-paste data between Excel sheets and messy CRMs. Our Python daemons sit securely in the cloud and handle API syncing, scraping, and massive reporting flawlessly 24/7.",
    bottleneck: "Wasting thousands of hours on repetitive excel/CRM tasks leading to catastrophic human error.",
    solution: "Secure AWS-hosted Python daemons handling custom APIs and large scale database crunching autonomously.",
    roi: ["100+ Operational Hours Saved", "Absolute Zero Human Error", "Real-time System Sync"], tabs: ["Overview", "Technical specs"]
  },
  {
    id: 3, title: "Laravel Core Backend", icon: <Database className="w-8 h-8 text-[#00B077]" />,
    shortDesc: "Bulletproof relational databases powering complex web systems.",
    fullDesc: "The strict backbone of any heavy web application. We architect structured Laravel backends using flawless Eloquent typing, queue systems for async tasks, and robust API endpoints for your frontends to consume efficiently.",
    bottleneck: "Brittle PHP backends crashing under user load or facing devastating SQL security flaws.",
    solution: "MVC-architecture APIs deployed with strict ORM typing frameworks and high-speed Redis caching layers.",
    roi: ["Enterprise-Grade Security", "10x Scalability Margin", "Seamless 3rd-Party Integrations"], tabs: ["Overview", "Technical specs"]
  },
  {
    id: 4, title: "Paid Ads & Core Lead Gen", icon: <TrendingUp className="w-8 h-8 text-[#00B077]" />,
    shortDesc: "Aggressive Meta and Google pipeline setups booking sales calls.",
    fullDesc: "Building the tech is step one. Step two is feeding it extreme high-intent traffic. We build A/B tested creative hooks mapped directly into automated CRM funnels that convert clicks into cash.",
    bottleneck: "Burning capital on 'boosted' posts and vague brand awareness with zero measurable ROI.",
    solution: "A/B Data-driven creative funnels driving hyper-local traffic to specially coded landing platforms.",
    roi: ["300%+ ROAS Modeling", "Transparent CPA Reporting", "Automated Lead Routing to CRM"], tabs: ["Overview", "Technical specs"]
  }
];

const PORTFOLIOS = [
  {
    id: 101, title: "Enterprise FinTech Migration", icon: <Briefcase className="w-8 h-8 text-[#00B077]" />,
    shortDesc: "+400% API Throughput",
    fullDesc: "Rebuilt a legacy monolithic system into a decoupled React & Laravel microservice architecture. By ditching outdated frameworks, the client now scales smoothly past 100k active users without fatal database lockups or timeout barriers.",
    bottleneck: "Legacy massive monolith freezing at 5,000 concurrent transactions, losing high-value trades.",
    solution: "Decoupled PostgreSQL DB array with a pure React frontend ensuring instantaneous order books.",
    roi: ["+400% API Throughput", "Zero Downtime Deployments", "Massive Edge Routing Speed"], tabs: ["Overview", "Technical specs"]
  },
  {
    id: 102, title: "Healthcare CRM Automation", icon: <Briefcase className="w-8 h-8 text-[#00B077]" />,
    shortDesc: "120 Hrs Saved/Mo",
    fullDesc: "Deployed secure Python daemons that automatically scrape, parse, and synchronize critical patient appointment data across 4 disconnected hospital legacy systems in real-time, eliminating manual admin bottlenecks entirely.",
    bottleneck: "Massive disconnected hospital sub-systems requiring 5 full-time admins just to enter patient data manually.",
    solution: "End-to-end Python scheduling daemons automatically pulling patient HL7 data and mapping it live.",
    roi: ["120 Hours Saved/Mo", "0% Human Error Rate", "Instant Patient Triage Synced"], tabs: ["Overview", "Technical specs"]
  },
  {
    id: 103, title: "B2B Logistics Workflow Engine", icon: <Briefcase className="w-8 h-8 text-[#00B077]" />,
    shortDesc: "Sub-second Routing Loads",
    fullDesc: "Engineered a custom geospatial routing application using advanced PostgreSQL extensions and a bleeding-edge frontend. Slashing automated freight calculation reporting times by a massive 80%.",
    bottleneck: "Slow calculation algorithms taking 3+ minutes to quote a freight path, losing B2B cargo deals.",
    solution: "Custom geospatial PostGIS database mapping raw algorithms into a heavily optimized SPA frontend.",
    roi: ["Sub-second Payload Loads", "80% Faster Quoting Times", "Doubled Contract Win-Rate"], tabs: ["Overview", "Technical specs"]
  }
];

const FAQS = [
  { q: "Do you use WordPress templates?", a: "No. We build custom-coded ecosystems using modern tools for pure performance and scalability. Templates bloat and crash. Code scales infinitely." },
  { q: "How do you handle Indore/Jabalpur projects?", a: "We serve MP natively. We structure discovery sessions digitally or in person depending on your operational preferences to ensure total alignment." },
  { q: "What is your typical execution timeline?", a: "MVP architectures are generally deployed within 4-8 weeks, scaling heavily depending on backend requirements." }
];

// TIMELINE DATA FOR ROADMAP
const PIPELINE_STEPS = [
  { step: 1, title: "The Tactical Audit", icon: <FileCheck className="w-5 h-5 text-[#111111]"/>, content: "We initiate a severe deep dive into your current IT bottleneck, failing CRMs, and broken templates. We don't guess—we map exactly where your local MP business is bleeding efficiency." },
  { step: 2, title: "Relational Architecture", icon: <GitBranch className="w-5 h-5 text-[#111111]"/>, content: "Drafting the complex React/Laravel schema. We map out precise database structures, flawless API endpoint routes, and strict UX/UI wireframes before executing a single line of production code." },
  { step: 3, title: "Engineered Development", icon: <LayoutDashboard className="w-5 h-5 text-[#111111]"/>, content: "Hardcore, native software construction. No drag-and-drop. We compile pure Next.js/Vite packages integrated tightly with secure PHP/Laravel backing databases." },
  { step: 4, title: "Live Cloud Deployment", icon: <Rocket className="w-5 h-5 text-[#111111]"/>, content: "Pushing the finalized SPA application to high-availability AWS/Linux server nodes. We configure CI/CD pipelines, install precise Redis caching, and formally hand over the keys to the massive ecosystem." }
];

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [activeModal, setActiveModal] = useState<typeof SERVICES[0] | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const typingText = useTypewriter(["Business.", "Revenue.", "Automations.", "Ecosystems."], 120, 80, 2500);

  useEffect(() => {
    const timer = setTimeout(() => {
       setIsFading(true);
       setTimeout(() => setIsLoading(false), 800);
    }, 500); // 0.5 seconds
    return () => clearTimeout(timer);
  }, []);

  const WHATSAPP_URL = "https://wa.me/917078524164?text=I'm%20interested%20in%20an%20architecture%20audit";

  return (
    <>
      {isLoading && (
         <div className={`fixed inset-0 z-[999] flex items-center justify-center bg-white transition-opacity duration-700 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
           <div className="w-32 md:w-40 animate-pulse p-4">
              <NixvraLogo animated={true} iconOnly={true} />
           </div>
         </div>
      )}

      <div className={`relative font-sans selection:bg-[#00B077]/20 text-[#111111] z-10 overflow-hidden text-base ${isLoading ? 'h-screen overflow-hidden' : ''} bg-white`}>
        <BubbleBackground />

        {/* Floating WhatsApp CTA */}
        <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-3 md:p-4 rounded-full shadow-lg hover:scale-110 transition-transform whatsapp-float cursor-pointer flex items-center justify-center border border-gray-100">
          <MessageSquare className="w-6 h-6 md:w-7 md:h-7" />
        </a>

        {/* HEADER */}
        <header className="fixed top-0 w-full z-40 px-6 py-4 border-b border-gray-200 bg-white/90 backdrop-blur-xl shrink-0 shadow-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center w-24 md:w-32">
              <NixvraLogo animated={true} />
            </div>
            <div className="hidden lg:flex items-center space-x-8 text-[13px] font-bold text-gray-500">
              <a href="#portfolio" className="hover:text-[#00B077] transition-colors tracking-wide">Portfolio</a>
              <a href="#services" className="hover:text-[#00B077] transition-colors tracking-wide">Architectures</a>
              <a href="#roadmap" className="hover:text-[#00B077] transition-colors tracking-wide">Pipeline</a>
              <a href="#pricing" className="hover:text-[#00B077] transition-colors tracking-wide">Pricing</a>
            </div>
            <button onClick={() => window.open(WHATSAPP_URL)} className="bg-[#00B077] hover:bg-[#008E60] text-white px-6 py-2 text-[13px] rounded-full font-bold transition-all shadow-md shadow-[#00B077]/20 uppercase tracking-widest">
               Contact
            </button>
          </div>
        </header>

        <main className="relative z-10">
          {/* SECTION 1: HERO */}
          <section className="relative min-h-[100dvh] flex flex-col items-center justify-center pt-28 px-6 text-center max-w-5xl mx-auto snap-start">
            <div className="animate-slide-up bg-white border border-gray-200 rounded-full px-5 py-2 mb-8 flex items-center shadow-sm" style={{ animationDelay: '0.1s' }}>
               <span className="w-2.5 h-2.5 rounded-full bg-[#00B077] mr-3 animate-pulse shadow-[0_0_8px_rgba(0,176,119,0.6)]" />
               <span className="text-xs uppercase tracking-widest text-[#111111] font-bold">Scaling MP's Digital Frontier</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-[68px] font-black tracking-tight mb-6 leading-tight animate-slide-up text-[#111111]" style={{ animationDelay: '0.3s' }}>
              Transforming
              <br className="hidden md:block"/>
              <span className="inline-block min-w-[320px] text-center md:text-left text-transparent bg-clip-text bg-gradient-to-r from-[#008E60] to-[#00B077] md:ml-4 pt-1">
                 {typingText}
              </span><span className="typewriter-cursor w-1.5 md:w-2"></span>
            </h1>
            
            <p className="text-[15px] md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed animate-slide-up font-medium" style={{ animationDelay: '0.5s' }}>
              Madhya Pradesh's premier technical pipeline. From Indore to Jabalpur, we aggressively replace brittle digital templates 
              with high-margin React frontend ecosystems, autonomous Python automations, and deep native Laravel codebases.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 animate-slide-up w-full sm:w-auto" style={{ animationDelay: '0.7s' }}>
              <button onClick={() => window.open(WHATSAPP_URL)} className="w-full sm:w-auto px-8 py-4 bg-[#00B077] hover:bg-[#008E60] text-white rounded-full font-bold transition-transform hover:-translate-y-1 shadow-md shadow-[#00B077]/30 text-[14px] md:text-base text-center flex items-center justify-center tracking-wide">
                <MessageSquare className="w-5 h-5 mr-3"/> Run Technical Audit
              </button>
              <a href="#roadmap" className="w-full sm:w-auto px-8 py-4 bg-white border border-gray-300 hover:bg-gray-50 text-[#111111] rounded-full font-bold transition-all text-[14px] md:text-base text-center tracking-wide shadow-sm hover:shadow-md">
                Examine Pipeline
              </a>
            </div>
          </section>

          {/* SECTION 2: TRUSTED BY METRICS */}
          <section className="bg-gray-50 border-y border-gray-200 py-12 snap-start flex flex-col justify-center">
              <div className="max-w-7xl mx-auto px-6 w-full text-center">
                 <p className="text-xs uppercase tracking-widest text-[#00B077] mb-8 font-extrabold block">Trusted Natively By MP's Scaling Firms</p>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-14 text-center divide-x divide-gray-200">
                    <div>
                       <h4 className="text-3xl md:text-5xl font-black text-[#111111] mb-2 tracking-tight">₹10Cr+</h4>
                       <p className="text-xs md:text-[13px] text-gray-500 font-bold uppercase tracking-wider">Revenue Managed</p>
                    </div>
                    <div>
                       <h4 className="text-3xl md:text-5xl font-black text-[#00B077] mb-2 tracking-tight">99.9%</h4>
                       <p className="text-xs md:text-[13px] text-gray-500 font-bold uppercase tracking-wider">Server Uptime</p>
                    </div>
                    <div>
                       <h4 className="text-3xl md:text-5xl font-black text-[#111111] mb-2 tracking-tight">5M+</h4>
                       <p className="text-xs md:text-[13px] text-gray-500 font-bold uppercase tracking-wider">API Invocations</p>
                    </div>
                    <div>
                       <h4 className="text-3xl md:text-5xl font-black text-[#111111] mb-2 tracking-tight">24/7</h4>
                       <p className="text-xs md:text-[13px] text-gray-500 font-bold uppercase tracking-wider">Daemons Active</p>
                    </div>
                 </div>
              </div>
          </section>

          {/* SECTION 3: AGENCY DNA / PHILOSOPHY */}
          <section className="min-h-[100dvh] py-20 px-6 flex flex-col justify-center snap-start relative overflow-hidden bg-white">
             <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#00B077]/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
             <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                   <h2 className="text-4xl md:text-6xl font-black mb-5 tracking-tight leading-tight text-[#111111]">The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#008E60] to-[#00B077]">Agency DNA</span></h2>
                   <p className="text-[#00B077] text-[13px] font-mono font-black uppercase tracking-widest mb-6 border-l-[4px] border-[#00B077] pl-4">Raw Engineering &gt; Traditional Marketing.</p>
                   <p className="text-gray-600 text-[15px] md:text-lg leading-relaxed mb-6 font-medium">
                      Nixvra by Wabcripte was founded to absolutely dominate the massive vacuum in the regional IT market: agencies selling slow, bloated, pre-built template configurations while masking it as true software operations. 
                   </p>
                   <p className="text-gray-600 text-[15px] md:text-lg leading-relaxed mb-8 font-medium">
                      We attack scaling problems natively. If you have an operational business bottleneck, we don't install a generic plugin. We immediately deploy custom AWS architecture, structure an intense Relational Database, and write strict React frontends that compute synchronously fast.
                   </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                   <div className="bg-white border border-gray-200 p-8 rounded-3xl hover:border-[#00B077]/50 transition-all hover:-translate-y-2 shadow-sm hover:shadow-xl">
                      <Cpu className="w-8 h-8 text-[#00B077] mb-4"/>
                      <h4 className="text-xl font-black mb-2 text-[#111111]">Native Syntax</h4>
                      <p className="text-[14px] text-gray-500 leading-relaxed font-medium">Zero drag-and-drop builders. Pure logic code scaling indefinitely.</p>
                   </div>
                   <div className="bg-white border border-gray-200 p-8 rounded-3xl hover:border-yellow-400/50 transition-all hover:-translate-y-2 shadow-sm hover:shadow-xl">
                      <Zap className="w-8 h-8 text-yellow-500 mb-4"/>
                      <h4 className="text-xl font-black mb-2 text-[#111111]">Massive Speed</h4>
                      <p className="text-[14px] text-gray-500 leading-relaxed font-medium">Vite-powered SPAs capturing sub-second payload deliveries.</p>
                   </div>
                   <div className="bg-gradient-to-br from-[#00B077]/5 to-white border border-[#00B077]/20 p-8 rounded-3xl col-span-1 sm:col-span-2 flex items-center justify-between group cursor-pointer hover:border-[#00B077]/60 transition-all shadow-sm hover:shadow-md" onClick={() => window.open(WHATSAPP_URL)}>
                      <div>
                        <h4 className="text-2xl font-black text-[#111111] mb-2">Join the Ecosystem</h4>
                        <p className="text-[12px] text-[#00B077] font-bold uppercase tracking-widest">Speak directly to engineering &rarr;</p>
                      </div>
                      <MessageSquare className="w-10 h-10 text-[#00B077] group-hover:scale-110 transition-transform" />
                   </div>
                </div>
             </div>
          </section>

          {/* SECTION 4: SERVICES SWIPER */}
          <section id="services" className="min-h-[100dvh] py-20 px-6 flex flex-col justify-center snap-start overflow-hidden relative bg-gray-50">
            <div className="mb-12 max-w-7xl mx-auto w-full border-l-[6px] border-[#00B077] pl-6 relative z-10">
              <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tight text-[#111111]">Core Architectures</h2>
              <p className="text-gray-500 text-[15px] md:text-lg font-bold">The four aggressive pillars of Nixvra's digital scaling infrastructure block.</p>
            </div>
            <div className="flex w-max space-x-8 px-6 animate-marquee hover:[animation-play-state:paused] pb-10">
               {[...SERVICES, ...SERVICES].map((service, idx) => (
                  <div key={`${service.id}-${idx}`} onClick={() => { setActiveModal(service); setActiveTab(0); }} className="w-[85vw] sm:w-[320px] md:w-[380px] cursor-pointer bg-white border border-gray-200 hover:border-[#00B077]/60 rounded-[2rem] p-10 flex flex-col transition-all duration-300 hover:-translate-y-3 group shadow-lg hover:shadow-2xl shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-[#00B077]/10 flex items-center justify-center mb-6 group-hover:bg-[#00B077]/20 transition-colors border border-[#00B077]/20">
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-black mb-4 text-[#111111] group-hover:text-[#00B077] transition-colors">{service.title}</h3>
                    <p className="text-gray-500 text-[15px] leading-relaxed mb-8 flex-grow font-medium">{service.shortDesc}</p>
                    <div className="mt-auto pt-6 border-t border-gray-100 text-[#00B077] font-bold flex items-center text-[13px] uppercase tracking-widest transition-all">
                      Load Dashboard <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                    </div>
                  </div>
                ))}
            </div>
          </section>

          {/* SECTION 5: PORTFOLIO & CASE STUDIES */}
          <section id="portfolio" className="min-h-[100dvh] py-20 px-6 bg-white border-y border-gray-200 flex flex-col justify-center snap-start relative">
             <div className="max-w-7xl mx-auto w-full z-10">
                 <div className="mb-16 text-center">
                   <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tight text-[#111111]">Enterprise Case Studies</h2>
                   <p className="text-gray-500 text-[15px] md:text-lg max-w-2xl mx-auto font-medium leading-relaxed">Demonstrating massive, quantifiable business transformation through high-end software orchestration.</p>
                 </div>
                 
                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {PORTFOLIOS.map((item) => (
                       <div key={item.id} onClick={() => { setActiveModal(item); setActiveTab(0); }} className="bg-white border border-gray-200 rounded-[2rem] p-8 hover:border-[#00B077]/50 shadow-md hover:shadow-2xl transition-all flex flex-col group -translate-y-0 hover:-translate-y-2 cursor-pointer">
                          <div className="flex items-center space-x-3 mb-6 text-[#00B077]">
                             <div className="bg-[#00B077]/10 p-2.5 rounded-xl border border-[#00B077]/20"><Briefcase className="w-5 h-5"/></div>
                             <span className="text-[12px] uppercase font-black tracking-widest">{item.title}</span>
                          </div>
                          <h4 className="text-2xl md:text-3xl font-black mb-4 text-[#111111] tracking-tight">{item.shortDesc}</h4>
                          <p className="text-gray-600 text-[15px] leading-relaxed flex-grow font-medium">
                             {item.fullDesc}
                          </p>
                          <div className="mt-6 pt-6 border-t border-gray-100 text-[#00B077] uppercase text-[12px] font-black tracking-widest flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                             View Complete Build ➔
                          </div>
                       </div>
                    ))}
                 </div>
                 
                 <div className="mt-16 text-center">
                    <button onClick={() => window.open(WHATSAPP_URL)} className="px-10 py-5 border-2 border-gray-300 rounded-full text-[14px] font-bold tracking-widest uppercase text-gray-700 hover:bg-gray-50 transition-all hover:border-[#00B077] hover:scale-105 hover:text-[#111111] shadow-sm">Request Full Corporate Portfolio</button>
                 </div>
             </div>
          </section>

          {/* SECTION 6: LIVE PREVIEWS */}
          <section id="examples" className="min-h-[100dvh] py-20 px-6 flex flex-col justify-center snap-start relative bg-gray-50">
            <div className="max-w-7xl mx-auto w-full relative z-10">
               <div className="mb-14 border-l-[6px] border-[#00B077] pl-6">
                <h2 className="text-4xl md:text-6xl font-black mb-3 tracking-tight text-[#111111]">Live Engineering Modules</h2>
                <p className="text-gray-500 text-[15px] md:text-lg font-bold">Native UI components tracking real-time layout structures logically.</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                 <div className="mockup-window rounded-3xl border border-gray-200 p-8 hover:border-[#00B077]/30">
                    <div className="flex items-center space-x-2 mb-8">
                       <div className="w-3.5 h-3.5 rounded-full bg-red-400"></div><div className="w-3.5 h-3.5 rounded-full bg-yellow-400"></div><div className="w-3.5 h-3.5 rounded-full bg-[#00B077]"></div>
                       <span className="ml-4 text-[12px] text-gray-400 font-mono tracking-widest uppercase font-bold">Admin Engine Tracking v2.1</span>
                    </div>
                    <div className="grid grid-cols-2 gap-6 mb-8">
                      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 hover:border-[#00B077]/40 transition-colors">
                        <div className="text-gray-500 text-[12px] uppercase tracking-widest mb-2 font-black">Revenue Matrix</div>
                        <div className="text-3xl font-black text-[#00B077]">₹4.2L</div>
                      </div>
                      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 hover:border-gray-300 transition-colors">
                        <div className="text-gray-500 text-[12px] uppercase tracking-widest mb-2 font-black">Active Queries</div>
                        <div className="text-3xl font-black text-[#111111]">12,045</div>
                      </div>
                    </div>
                    <div className="h-32 flex items-end justify-between space-x-2 pt-4 border-b-2 border-gray-100 pb-2">
                      {[45, 70, 35, 90, 65, 85, 100].map((h, i) => (
                        <div key={i} className="w-full bg-[#00B077]/10 hover:bg-[#00B077] rounded-t-lg transition-all duration-300 relative group cursor-pointer" style={{ height: `${h}%` }}>
                           <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-white bg-black text-xs py-1.5 px-3 rounded opacity-0 group-hover:opacity-100 font-bold shadow-xl pointer-events-none">{h}%</div>
                        </div>
                      ))}
                    </div>
                 </div>
                 <div className="mockup-window rounded-3xl border border-gray-200 p-8 hover:border-[#00B077]/30">
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <h4 className="text-2xl font-black mb-1 text-[#111111]">API Socket Gateway</h4>
                        <p className="text-gray-500 text-[14px] font-bold">Mapped layout structure pinging dummy targets</p>
                      </div>
                      <div className="animate-pulse bg-[#00B077]/10 text-[#008E60] px-3 py-1.5 rounded-lg text-[12px] font-black border border-[#00B077]/20 flex items-center tracking-widest uppercase">
                         <div className="w-2 h-2 rounded-full bg-[#00B077] mr-2 shadow-sm"></div> Live 
                      </div>
                    </div>
                    <div className="space-y-4">
                      {['Jabalpur Secure Node', 'Indore Root Auth', 'MP Main Backup Cluster'].map((node, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:border-gray-300 border border-transparent transition-all">
                          <div className="flex items-center space-x-4">
                            <div className={`w-3 h-3 rounded-full shadow-sm ${i === 0 ? 'bg-[#00B077]' : 'bg-yellow-400'}`}></div>
                            <span className="font-bold text-[15px] text-gray-700">{node}</span>
                          </div>
                          <span className="text-[12px] font-mono uppercase font-black text-[#008E60] bg-[#00B077]/10 px-2.5 py-1 rounded">200 OK</span>
                        </div>
                      ))}
                    </div>
                    <button onClick={() => window.open(WHATSAPP_URL)} className="mt-8 w-full py-4 border-2 border-gray-200 rounded-xl text-[14px] font-black uppercase tracking-widest text-[#111111] hover:text-white transition-all bg-white hover:bg-[#00B077] hover:border-[#00B077] shadow-sm">
                      Force Manual Refresh Sync
                    </button>
                 </div>
              </div>
            </div>
          </section>

          {/* SECTION 7: INTEGRATIONS */}
          <section className="py-20 px-6 overflow-hidden bg-white border-y border-gray-200 flex flex-col justify-center">
             <p className="text-center text-[14px] md:text-[15px] uppercase tracking-widest text-[#00B077] mb-10 font-black">Orchestrating High-End Enterprise Tech Stacks</p>
             <div className="flex space-x-16 animate-marquee whitespace-nowrap">
                 {[1,2,3,4].map(set => (
                   <React.Fragment key={set}>
                     <div className="flex items-center space-x-4"><LayoutDashboard className="w-8 h-8 text-[#111111]"/> <span className="font-mono text-xl font-black text-[#111111]">React Vite Native</span></div>
                     <div className="flex items-center space-x-4"><Database className="w-8 h-8 text-[#00B077]"/> <span className="font-mono text-xl font-black text-[#111111]">Laravel ORM Layers</span></div>
                     <div className="flex items-center space-x-4"><Terminal className="w-8 h-8 text-yellow-500"/> <span className="font-mono text-xl font-black text-[#111111]">Python Cloud Daemons</span></div>
                     <div className="flex items-center space-x-4"><Server className="w-8 h-8 text-blue-500"/> <span className="font-mono text-xl font-black text-[#111111]">AWS EC2 Dedicated</span></div>
                     <div className="flex items-center space-x-4"><Globe className="w-8 h-8 text-orange-500"/> <span className="font-mono text-xl font-black text-[#111111]">Cloudflare Edge Nodes</span></div>
                   </React.Fragment>
                 ))}
             </div>
          </section>

          {/* SECTION 8: PIPELINE ROADMAP */}
          <section id="roadmap" className="min-h-[100dvh] py-20 px-6 flex flex-col justify-center snap-start relative bg-gray-50">
              <div className="max-w-6xl mx-auto w-full">
                 <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-black mb-5 tracking-tight text-[#111111]">The Execution Roadmap</h2>
                    <p className="text-gray-500 text-[15px] md:text-lg max-w-2xl mx-auto font-bold tracking-wide">The brutal Wabcripte methodology to decisively pull local MP businesses out of massive technical debt.</p>
                 </div>

                 {/* Advanced Vertical Timeline */}
                 <div className="relative wrap overflow-hidden p-2 md:p-8 h-full">
                    <div className="absolute h-full border-r-[3px] border-gray-200 left-6 md:left-1/2 top-0 shadow-sm"></div>
                    
                    {PIPELINE_STEPS.map((step, index) => {
                       const isRightSide = index % 2 === 0;
                       
                       return (
                          <div key={index} className={`mb-12 flex justify-between items-center w-full ${isRightSide ? 'md:flex-row-reverse' : ''}`}>
                             <div className="hidden md:block w-5/12"></div>
                             
                             <div className="z-20 absolute left-6 md:left-1/2 -translate-x-1/2 md:translate-x-[-50%] flex items-center shadow-md justify-center w-12 h-12 bg-white border-[4px] border-[#00B077] rounded-full">
                                {step.icon}
                             </div>
                             
                             <div className={`w-full md:w-5/12 ml-14 md:ml-0 bg-white border border-gray-200 rounded-3xl p-8 transition-all duration-300 hover:scale-[1.02] hover:border-[#00B077]/50 shadow-md hover:shadow-xl group cursor-default`}>
                                 <div className="text-[#00B077] font-black text-[12px] uppercase tracking-widest mb-3 border-b border-gray-100 pb-2 inline-block">Phase 0{step.step}</div>
                                 <h4 className="font-black text-2xl text-[#111111] mb-3 mt-1 group-hover:text-[#00B077] transition-colors tracking-tight">{step.title}</h4>
                                 <p className="text-[15px] leading-relaxed text-gray-500 font-medium">
                                    {step.content}
                                 </p>
                             </div>
                          </div>
                       )
                    })}
                 </div>
              </div>
          </section>

          {/* SECTION 9: PRICING / ENGAGEMENT */}
          <section id="pricing" className="min-h-[100dvh] py-20 px-6 bg-white border-y border-gray-200 flex flex-col justify-center snap-start relative">
             <div className="absolute right-0 top-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-50 via-white to-white pointer-events-none"></div>
             
             <div className="max-w-6xl mx-auto w-full relative z-10">
                <div className="text-center mb-16 border-b border-gray-100 pb-12">
                   <h2 className="text-4xl md:text-6xl font-black mb-5 tracking-tight text-[#111111]">Financial Engagement Models</h2>
                   <p className="text-gray-500 text-[15px] md:text-lg font-bold max-w-2xl mx-auto">Absolute pristine SaaS frameworks scaled precisely to your agency's capital allocation.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
                   {/* MODEL 1 */}
                   <div className="p-10 rounded-[2.5rem] bg-white border border-gray-200 hover:border-gray-300 transition-all flex flex-col group shadow-lg hover:shadow-2xl -translate-y-0 hover:-translate-y-2">
                      <div className="flex items-center space-x-4 mb-5">
                         <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200"><Code className="w-6 h-6 text-[#111111]"/></div>
                         <h3 className="text-2xl md:text-3xl font-black text-[#111111]">MVP Build Out</h3>
                      </div>
                      <p className="text-[#008E60] font-black text-[11px] uppercase mb-6 tracking-widest inline-block border border-[#00B077]/20 bg-[#00B077]/10 px-3 py-1.5 rounded w-fit">Project Bracket Scale</p>
                      <p className="text-[15px] md:text-lg text-gray-600 mb-8 flex-grow font-medium leading-relaxed">
                         Massive full-stack React and Laravel base architecture setup. Perfect for totally replacing tragically poor WordPress platforms.
                      </p>
                      <ul className="space-y-4 mb-10">
                         <li className="flex items-center text-[14px] md:text-[15px] font-bold text-gray-700"><Check className="w-5 h-5 text-[#00B077] mr-4"/> Sub-second UX load times</li>
                         <li className="flex items-center text-[14px] md:text-[15px] font-bold text-gray-700"><Check className="w-5 h-5 text-[#00B077] mr-4"/> Extremely clean DB Structures</li>
                         <li className="flex items-center text-[14px] md:text-[15px] font-bold text-gray-700"><Check className="w-5 h-5 text-[#00B077] mr-4"/> Core MP Local Launch protocol</li>
                      </ul>
                      <button onClick={() => window.open(WHATSAPP_URL)} className="w-full py-5 bg-white border-2 border-gray-200 rounded-2xl text-[14px] hover:bg-gray-50 transition-all font-black tracking-widest uppercase text-[#111111]">Initiate Build Setup</button>
                   </div>

                   {/* MODEL 2 */}
                   <div className="p-10 rounded-[2.5rem] bg-gray-50 border-[3px] border-[#00B077] shadow-[0_0_50px_rgba(0,176,119,0.15)] relative overflow-hidden flex flex-col group -translate-y-0 hover:-translate-y-2">
                      <div className="absolute top-0 right-0 bg-[#00B077] text-white text-[11px] font-black px-4 py-2 uppercase tracking-widest rounded-bl-2xl shadow-md">Enterprise Retainer Base</div>
                      <div className="flex items-center space-x-4 mb-5 mt-2">
                         <div className="p-3 bg-white rounded-2xl border border-gray-200 shadow-sm"><Server className="w-6 h-6 text-[#00B077]"/></div>
                         <h3 className="text-2xl md:text-3xl font-black text-[#111111]">Enterprise Network</h3>
                      </div>
                      <p className="text-[#008E60] font-black text-[11px] uppercase mb-6 tracking-widest inline-block border border-[#00B077]/20 bg-[#00B077]/10 px-3 py-1.5 rounded w-fit">Long-Term Growth Bracket</p>
                      <p className="text-[15px] md:text-lg text-gray-600 mb-8 flex-grow font-medium leading-relaxed">
                         Custom deep-stack Python DB autonomous scripting, constant active server architecture scaling, balancing, and pure lead pipeline structuring.
                      </p>
                      <ul className="space-y-4 mb-10">
                         <li className="flex items-center text-[14px] md:text-[15px] font-bold text-gray-700"><Check className="w-5 h-5 text-[#00B077] mr-4"/> Core Python automation scripting</li>
                         <li className="flex items-center text-[14px] md:text-[15px] font-bold text-gray-700"><Check className="w-5 h-5 text-[#00B077] mr-4"/> Deep AWS/Cloudflare monitoring</li>
                         <li className="flex items-center text-[14px] md:text-[15px] font-bold text-gray-700"><Check className="w-5 h-5 text-[#00B077] mr-4"/> Continuous live architectural patches</li>
                      </ul>
                      <button onClick={() => window.open(WHATSAPP_URL)} className="w-full py-5 bg-[#00B077] text-white rounded-2xl text-[14px] hover:bg-[#008E60] transition-all font-black shadow-lg shadow-[#00B077]/20 uppercase tracking-widest">Speak To Retainer Scaling</button>
                   </div>
                </div>
             </div>
          </section>

          {/* SECTION 10: FAQ & CTA */}
          <section id="faqs" className="min-h-[100dvh] py-24 px-6 flex flex-col justify-center snap-start relative overflow-hidden bg-gray-50">
            <div className="max-w-4xl mx-auto w-full mb-20 relative z-10">
              <h2 className="text-3xl md:text-5xl font-black mb-10 text-center tracking-tight border-b border-gray-200 pb-8 text-[#111111]">Extreme Technical FAQ Specs</h2>
              <div className="space-y-5">
                {FAQS.map((faq, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-3xl overflow-hidden hover:border-[#00B077]/40 transition-colors shadow-sm hover:shadow-md">
                    <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full px-8 py-6 flex items-center justify-between text-left focus:outline-none">
                      <span className="font-black text-[15px] md:text-lg text-[#111111] tracking-wide">{faq.q}</span>
                      <ChevronDown className={`w-6 h-6 text-[#00B077] transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`px-8 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-64 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <p className="text-gray-600 text-[15px] leading-relaxed border-t border-gray-100 pt-5 font-medium">{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center shadow-xl bg-white border border-gray-200 rounded-[3rem] p-10 md:p-16 max-w-4xl mx-auto w-full relative z-10 hover:border-[#00B077]/50 transition-colors">
               <Zap className="w-12 h-12 text-[#00B077] mx-auto mb-6 animate-pulse" />
               <h2 className="text-3xl md:text-5xl font-black mb-4 text-[#111111] tracking-tight">Ready to compile the architecture?</h2>
               <p className="text-[15px] md:text-lg text-gray-500 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">Stop gambling local capital on failing builder templates. Hook up to our WhatsApp array logically and chat direct with the engineers natively.</p>
               <button onClick={() => window.open(WHATSAPP_URL)} className="px-10 py-5 bg-[#00B077] text-white font-black rounded-full text-[15px] shadow-lg shadow-[#00B077]/30 hover:scale-105 hover:bg-[#008E60] transition-all outline-none tracking-widest uppercase items-center flex justify-center mx-auto w-full sm:w-auto">
                 <MessageSquare className="w-6 h-6 mr-3"/> Execute Build Hook Live
               </button>
            </div>
          </section>
        </main>

        {/* FOOTER */}
        <footer className="bg-white py-14 px-6 border-t border-gray-200 relative z-10 w-full shrink-0 h-auto">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="w-24 md:w-32 mb-6"><NixvraLogo animated={true} /></div>
               <p className="text-[13px] md:text-[14px] text-gray-500 max-w-md leading-relaxed font-bold">
                 Massive Intelligent Digital Architectures strictly deployed natively by Wabcripte Framework. HQ Node Maps: Indore, Jabalpur. 
                 High-end application interfaces coded purely for extreme performance processing operations.
               </p>
            </div>
            <div className="md:text-right text-[13px] md:text-[14px] text-gray-500">
               <div className="flex space-x-6 md:justify-end mb-4">
                  <span onClick={() => window.open(WHATSAPP_URL)} className="hover:text-[#00B077] cursor-pointer font-black uppercase tracking-widest transition-colors text-[12px]">Terms of Architecture Scale</span>
                  <span onClick={() => window.open(WHATSAPP_URL)} className="hover:text-[#00B077] cursor-pointer font-black uppercase tracking-widest transition-colors text-[12px]">Digital Encrypted Policy</span>
               </div>
               <span className="opacity-80 font-bold tracking-wider text-[12px] text-[#111111]">© 2026 Wabcripte Technical Operating Software Pvt. Ltd.</span>
            </div>
          </div>
        </footer>

        {/* PROPER SAAS DASHBOARD MODAL */}
        {activeModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-md" onClick={() => setActiveModal(null)}></div>
            <div className="relative bg-white border border-gray-200 w-full max-w-2xl rounded-3xl shadow-2xl flex flex-col z-10 animate-slide-up h-[85vh] md:h-auto overflow-hidden">
              {/* Modal Header */}
              <div className="p-6 md:p-8 border-b border-gray-100 bg-gray-50 flex items-center justify-between shrink-0">
                 <div className="flex items-center space-x-4">
                   <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center border border-gray-200 shadow-sm">{activeModal.icon}</div>
                   <h3 className="font-black text-xl md:text-2xl tracking-tight text-[#111111]">{activeModal.title}</h3>
                 </div>
                 <button onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-[#111111] bg-white hover:bg-gray-100 p-2.5 rounded-xl border border-gray-200 transition-all hover:rotate-90 shadow-sm"><X className="w-6 h-6" /></button>
              </div>
              
              {/* Modal Tabs */}
              <div className="flex space-x-8 px-8 border-b-[2px] border-gray-100 shrink-0 bg-white overflow-x-auto no-scrollbar">
                 {activeModal.tabs.map((tab, idx) => (
                   <button key={idx} onClick={() => setActiveTab(idx)} className={`py-5 text-[12px] uppercase tracking-widest font-black border-b-[3px] transition-all whitespace-nowrap ${activeTab === idx ? 'border-[#00B077] text-[#00B077]' : 'border-transparent text-gray-500 hover:text-[#111111] hover:border-gray-300'}`}>
                      {tab}
                   </button>
                 ))}
              </div>

              {/* Modal Body */}
              <div className="p-8 flex-grow overflow-y-auto no-scrollbar bg-white">
                 {activeTab === 0 ? (
                   <div className="space-y-8">
                      <p className="text-[15px] md:text-[16px] text-gray-700 leading-relaxed bg-gray-50 p-6 rounded-2xl border border-gray-200 font-bold">{activeModal.fullDesc}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                         <div className="bg-red-50 border-l-[4px] border-red-500 p-6 rounded-r-2xl shadow-sm">
                            <h4 className="text-[12px] text-red-600 font-black uppercase mb-3 tracking-widest flex items-center"><X className="w-5 h-5 mr-2"/> Exact Bottleneck Fault</h4>
                            <p className="text-[14px] text-gray-600 leading-relaxed font-bold">{activeModal.bottleneck}</p>
                         </div>
                         <div className="bg-[#00B077]/5 border-l-[4px] border-[#00B077] p-6 rounded-r-2xl shadow-sm">
                            <h4 className="text-[12px] text-[#008E60] font-black uppercase mb-3 tracking-widest flex items-center"><Check className="w-5 h-5 mr-2"/> Native Code Protocol Solution</h4>
                            <p className="text-[14px] text-gray-600 leading-relaxed font-bold">{activeModal.solution}</p>
                         </div>
                      </div>
                   </div>
                 ) : (
                   <div className="space-y-5">
                      <h4 className="text-[12px] text-gray-500 font-black uppercase tracking-widest mb-6 border-b border-gray-100 pb-4">Actively Generated Engineering Spec ROI Targets</h4>
                      {activeModal.roi.map((metric, idx) => (
                        <div key={idx} className="flex items-center space-x-4 bg-white border border-gray-200 p-5 rounded-2xl hover:border-[#00B077]/40 transition-all shadow-sm hover:-translate-y-1 cursor-default">
                          <div className="bg-[#00B077]/10 p-2.5 rounded-xl border border-[#00B077]/20"><CheckCircle className="w-6 h-6 text-[#00B077]" /></div>
                          <span className="text-[15px] md:text-[16px] font-black text-[#111111] tracking-wide">{metric}</span>
                        </div>
                      ))}
                   </div>
                 )}
              </div>

              {/* Modal Footer */}
              <div className="p-6 md:p-8 border-t border-gray-100 bg-gray-50 shrink-0">
                 <button onClick={() => window.open(WHATSAPP_URL)} className="w-full py-5 bg-[#00B077] hover:bg-[#008E60] text-white rounded-2xl text-[14px] font-black transition-all shadow-lg shadow-[#00B077]/20 uppercase tracking-[0.15em] hover:scale-[1.02]">Generate System Framework Layout Array Route via WhatsApp Ping Sync</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Shield, ArrowRight, Terminal, Globe, 
  TrendingUp, Layers, Cpu, Code2
} from 'lucide-react';

// --- MAGNETIC BUTTON INCLUDED LOCALLY TO PREVENT ERRORS ---
const MagneticButton = ({ children, className, onClick, type = "button", href, target, rel }: any) => {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  const Wrapper: any = href ? motion.a : motion.button;
  const props = href ? { href, target, rel } : { type, onClick };

  return (
    <Wrapper
      ref={ref}
      {...props}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative overflow-hidden ${className}`}
    >
      {children}
    </Wrapper>
  );
};

const WHATSAPP_URL = "https://wa.me/917078524164?text=Hello%20Nixvra%20Solutions,%20I%20want%20to%20discuss%20a%20scalable%20digital%20project.";

const WhyUsDetailed = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const reasons = [
    { 
      icon: Terminal, 
      title: "No Fluff, Pure Execution", 
      desc: "We skip the endless 'astrology-based' marketing meetings and motivational clichés. We look at the raw data, engineer the solution, and deploy it." 
    },
    { 
      icon: Globe, 
      title: "Jabalpur Roots, Global Quality", 
      desc: "Directed by the Wabcripte Framework, we leverage elite engineering talent from MP to deliver architectures that match Silicon Valley standards." 
    },
    { 
      icon: TrendingUp, 
      title: "Built for Revenue, Not Just Looks", 
      desc: "Every React component and Laravel API endpoint is optimized for one thing: scaling your operations and increasing your bottom-line ROI." 
    },
    { 
      icon: Layers, 
      title: "Scalable Product Focus", 
      desc: "We don't do short-term freelance tasking. We build long-term scalable tech products, automated systems, and enterprise architectures." 
    },
    { 
      icon: Cpu, 
      title: "AI & Automation Native", 
      desc: "We bake intelligent Python automation directly into your system to eliminate manual data entry, bridging your CRM with WhatsApp instantly." 
    },
    {
      icon: Code2,
      title: "Full-Stack Ownership",
      desc: "From initial UI/UX strategy to Framer Motion frontend and secure backend deployment, we own the entire technical pipeline."
    }
  ];

  const duplicatedReasons = [...reasons, ...reasons];

  return (
    <section id="why-us" className="py-24 md:py-32 bg-[#030305] relative overflow-hidden text-white">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }} 
          className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-[radial-gradient(circle,_rgba(16,185,129,0.12)_0%,_transparent_70%)] rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ rotate: -360 }} 
          transition={{ duration: 70, repeat: Infinity, ease: "linear" }} 
          className="absolute -bottom-[20%] -left-[10%] w-[500px] h-[500px] md:w-[600px] md:h-[600px] bg-[radial-gradient(circle,_rgba(59,130,246,0.1)_0%,_transparent_70%)] rounded-full blur-3xl" 
        />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDM5LjVsNDAtLjBNMzkuNSAwdi00MCIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')] opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }} 
            transition={{ duration: 0.8 }} 
            ref={ref}
            className="lg:col-span-5 relative z-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs md:text-sm font-bold mb-6 backdrop-blur-md">
              <Shield size={16} /> The Wabcripte Advantage
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tighter leading-[1.1]">
              Why settle for templates when you can have <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">custom engines?</span>
            </h2>
            
            <p className="text-gray-400 text-base md:text-lg mb-10 leading-relaxed font-medium">
              Standard agencies use bloated legacy setups that crash under pressure. We write pure, scalable code. By combining deep technical capability with aggressive business strategy, we build digital assets designed to dominate.
            </p>
            
            <MagneticButton 
              href={WHATSAPP_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-3 bg-white text-gray-900 font-bold px-8 py-4 rounded-xl transition-all hover:bg-gray-100 shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(16,185,129,0.3)] hover:-translate-y-1"
            >
              Request System Audit <ArrowRight size={20} />
            </MagneticButton>
          </motion.div>

          <div className="lg:col-span-7 relative h-[500px] md:h-[650px] w-full rounded-[2rem] overflow-hidden">
            <div className="absolute inset-0 pointer-events-none z-10" 
                 style={{ background: 'linear-gradient(to bottom, #030305 0%, transparent 15%, transparent 85%, #030305 100%)' }} 
            />

            <motion.div
              className="flex flex-col gap-6"
              animate={{ y: ["0%", "-50%"] }}
              transition={{
                y: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 25, 
                  ease: "linear",
                },
              }}
            >
              {duplicatedReasons.map((item, i) => (
                <div 
                  key={i} 
                  className="bg-white/[0.02] backdrop-blur-xl border border-white/5 p-6 md:p-8 rounded-[1.5rem] hover:bg-white/[0.04] hover:border-emerald-500/30 transition-all duration-300 group flex gap-5 items-start relative overflow-hidden shrink-0"
                >
                  <div className="absolute top-1/2 left-0 -translate-y-1/2 w-1 h-1/2 bg-emerald-500 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_20px_rgba(16,185,129,1)]" />
                  
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-white/5 rounded-2xl flex items-center justify-center shrink-0 border border-white/10 group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10 transition-colors">
                    <item.icon className="text-gray-400 group-hover:text-emerald-400 transition-colors" size={24} />
                  </div>
                  
                  <div>
                    <h4 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 tracking-tight group-hover:text-emerald-300 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyUsDetailed;
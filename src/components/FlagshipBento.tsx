import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { 
  Layers, Cpu, Database, ArrowRight, 
  X, CheckCircle2, Target, Zap, Server
} from 'lucide-react';

// --- ANIMATION VARIANTS ---
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
};

// --- PRESENTATION MODAL COMPONENT ---
const PresentationModal = ({ data, isOpen, onClose }) => {
  if (!data) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-gray-900/60 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div 
            initial={{ scale: 0.95, y: 30, opacity: 0 }} 
            animate={{ scale: 1, y: 0, opacity: 1 }} 
            exit={{ scale: 0.95, y: 30, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-5xl max-h-[95vh] overflow-y-auto bg-white rounded-[2rem] shadow-[0_40px_80px_rgba(0,0,0,0.2)] flex flex-col relative custom-scrollbar"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 z-20 flex items-center justify-between p-4 md:p-8 border-b border-gray-100 bg-white/90 backdrop-blur-xl rounded-t-[2rem]">
              <div className="flex items-center gap-3 md:gap-4">
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-${data.color}-50 border border-${data.color}-100 flex items-center justify-center text-${data.color}-600 shrink-0`}>
                  <data.icon size={24} className="md:w-7 md:h-7" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight leading-tight">{data.title}</h3>
                  <div className={`text-${data.color}-600 text-[10px] md:text-xs font-bold tracking-widest uppercase mt-1 flex items-center gap-1`}>
                    <Target size={12} /> Client Presentation Mode
                  </div>
                </div>
              </div>
              <button 
                onClick={onClose} 
                className="p-2 md:p-3 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-900 shrink-0"
              >
                <X size={20} />
              </button>
            </div>

            {/* Pitch Content */}
            <div className="p-4 md:p-10 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Left Side: The Business Case */}
                <div>
                  <div className="mb-8 md:mb-10">
                    <h4 className="text-xs md:text-sm font-bold text-red-500 tracking-widest uppercase mb-3">The Business Bottleneck</h4>
                    <p className="text-gray-700 text-base md:text-lg leading-relaxed font-medium bg-red-50/50 p-5 md:p-6 rounded-2xl border border-red-100">
                      {data.problem}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className={`text-xs md:text-sm font-bold text-${data.color}-600 tracking-widest uppercase mb-4`}>The Architecture Solution</h4>
                    <div className="space-y-3 md:space-y-4">
                      {data.features.map((feat, i) => (
                        <motion.div 
                          key={i} 
                          initial={{ opacity: 0, x: -20 }} 
                          animate={{ opacity: 1, x: 0 }} 
                          transition={{ delay: i * 0.1 }} 
                          className="flex items-start gap-3 md:gap-4 p-4 md:p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-gray-200 transition-colors"
                        >
                          <CheckCircle2 className={`text-${data.color}-500 shrink-0 mt-0.5`} size={20} />
                          <span className="text-gray-800 text-sm md:text-base font-semibold">{feat}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Side: ROI & Tech Specs */}
                <div className="bg-gray-900 rounded-[2rem] p-6 md:p-10 border border-gray-800 flex flex-col justify-center relative overflow-hidden shadow-2xl mt-4 lg:mt-0">
                  {/* Decorative internal glow */}
                  <div className={`absolute top-0 right-0 w-64 h-64 bg-${data.color}-500/20 rounded-full blur-[80px] pointer-events-none`} />
                  
                  <h4 className="text-white text-xl md:text-2xl font-black mb-6 md:mb-8 relative z-10">Expected ROI Metrics</h4>
                  
                  <div className="space-y-4 md:space-y-6 relative z-10 mb-8 md:mb-10">
                    {data.stats.map((stat, i) => (
                      <div key={i} className="flex justify-between items-end border-b border-gray-800 pb-3 md:pb-4">
                        <span className="text-gray-400 text-sm md:text-base font-medium">{stat.label}</span>
                        <span className="text-2xl md:text-3xl font-black text-white tracking-tight">{stat.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto relative z-10">
                    <button className={`w-full py-3 md:py-4 bg-${data.color}-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-${data.color}-600 transition-colors shadow-[0_0_20px_rgba(0,0,0,0.2)] text-sm md:text-base`}>
                      <Zap size={18} /> Approve This Architecture
                    </button>
                    <p className="text-center text-gray-500 text-[10px] md:text-xs mt-4 font-medium">Data-backed execution.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- MAIN BENTO SECTION ---
const FlagshipBento = () => {
  const [selectedService, setSelectedService] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = {
    react: {
      id: "react",
      icon: Layers, 
      title: "React UI/UX Architecture", 
      color: "emerald",
      shortDesc: "Sub-second load times. We replace legacy WordPress with headless React architectures that feel instant.",
      problem: "Most businesses lose 40% of traffic because their outdated WordPress themes load slowly, drop database connections, and fail Core Web Vitals tests.",
      features: [
        "Headless React/Vite architecture for instant page transitions.",
        "Component-Driven UI with Framer Motion aesthetics.",
        "Zero legacy bloat—pure code execution for SEO dominance."
      ],
      stats: [
        { label: "Avg. Load Time Decrease", value: "-78%" },
        { label: "Bounce Rate Reduction", value: "32%" },
        { label: "Conversion Rate Lift", value: "2.4x" }
      ]
    },
    python: {
      id: "python",
      icon: Cpu, 
      title: "Python Automation", 
      color: "blue",
      shortDesc: "Deploy custom scripts that connect web forms directly to WhatsApp and CRM instantly.",
      problem: "Your sales team is wasting hours manually shifting lead data from contact forms into spreadsheets and typing out introductory WhatsApp messages.",
      features: [
        "Instant Webhook interceptors for all lead forms.",
        "Automated WhatsApp API integration for instant client greetings.",
        "Data scraping and automated CRM database population."
      ],
      stats: [
        { label: "Manual Hours Saved/Mo", value: "120+" },
        { label: "Lead Response Time", value: "< 2s" },
        { label: "Data Routing Accuracy", value: "100%" }
      ]
    },
    laravel: {
      id: "laravel",
      icon: Database, 
      title: "Laravel Core Backend", 
      color: "purple",
      shortDesc: "Enterprise-grade database structuring protected against SQLi. True scalable infrastructure.",
      problem: "As user traffic scales, standard shared-hosting databases crash, leading to downtime, lost data, and severe security vulnerabilities.",
      features: [
        "Custom relational database architecture built on MySQL.",
        "Role-Based Access Control (RBAC) for internal security.",
        "Highly secure, scalable RESTful APIs serving the frontend."
      ],
      stats: [
        { label: "Concurrent User Capacity", value: "10k+" },
        { label: "Uptime Guarantee", value: "99.9%" },
        { label: "Security Breaches", value: "0" }
      ]
    },
    leadgen: {
      id: "leadgen",
      icon: Target, 
      title: "Paid Ads & Lead Gen", 
      color: "rose",
      shortDesc: "High-converting Meta & Google Ads designed to flood your CRM with qualified, high-ticket leads.",
      problem: "You are burning marketing budget on 'brand awareness' ads that generate likes but zero actual sales. Standard agencies focus on clicks instead of revenue.",
      features: [
        "Data-driven Meta & Google Ads structured for maximum ROAS.",
        "High-converting landing pages linked directly to your Python/Laravel CRM.",
        "Continuous A/B testing on ad creatives to drastically lower Cost Per Lead."
      ],
      stats: [
        { label: "Target ROAS Lift", value: "3.5x" },
        { label: "Cost Per Lead (CPL)", value: "-40%" },
        { label: "Lead Quality Score", value: "95%" }
      ]
    }
  };

  return (
    <section id="flagship" className="py-20 md:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs md:text-sm font-bold mb-4 md:mb-6">
            <Server size={16} /> The Complete Funnel
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight mb-4 md:mb-6">
            One Multi-Powerful System.
          </h2>
          <p className="text-gray-500 text-base md:text-lg font-medium px-4">
            Click on any module below to open the technical presentation and review the business ROI.
          </p>
        </div>

        <motion.div 
          ref={ref} 
          variants={staggerContainer} 
          initial="hidden" 
          animate={isInView ? "visible" : "hidden"} 
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
        >
          {/* React Bento Card */}
          <motion.div 
            variants={fadeUp} 
            onClick={() => setSelectedService(services.react)} 
            className="md:col-span-2 bg-[#FAFAFA] rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12 border border-gray-200 cursor-pointer hover:border-emerald-300 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.15)] transition-all duration-500 relative group overflow-hidden"
          >
            <div className="absolute right-0 top-0 w-64 h-64 md:w-80 md:h-80 bg-emerald-100/40 rounded-full blur-[80px] -z-10 group-hover:scale-125 group-hover:bg-emerald-200/40 transition-all duration-700" />
            <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-2xl flex items-center justify-center mb-6 md:mb-8 border border-gray-200 shadow-sm group-hover:border-emerald-200 group-hover:shadow-emerald-100 transition-all duration-300">
              <Layers className="text-emerald-600 w-7 h-7 md:w-8 md:h-8" />
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-3 md:mb-4 tracking-tight group-hover:text-emerald-600 transition-colors">
              {services.react.title}
            </h3>
            <p className="text-gray-500 text-sm md:text-lg max-w-md leading-relaxed mb-6 md:mb-8 font-medium">
              {services.react.shortDesc}
            </p>
            <div className="flex items-center text-emerald-600 font-bold text-[10px] md:text-sm uppercase tracking-wider gap-2 group-hover:translate-x-2 transition-transform bg-emerald-50 w-fit px-4 py-2 rounded-full mt-auto">
              Open ROI Presentation <ArrowRight size={14} md:size={16}/>
            </div>
          </motion.div>

          {/* Python Bento Card */}
          <motion.div 
            variants={fadeUp} 
            onClick={() => setSelectedService(services.python)} 
            className="md:col-span-1 bg-[#FAFAFA] rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 border border-gray-200 cursor-pointer hover:border-blue-300 hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.15)] transition-all duration-500 group overflow-hidden relative flex flex-col justify-center"
          >
            <div className="absolute -right-10 -top-10 w-48 h-48 bg-blue-100/50 rounded-full blur-[50px] -z-10 group-hover:scale-150 transition-transform duration-700" />
            <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-2xl flex items-center justify-center mb-5 md:mb-6 border border-gray-200 shadow-sm group-hover:border-blue-200 group-hover:shadow-blue-100 transition-all duration-300">
              <Cpu className="text-blue-600 w-6 h-6 md:w-7 md:h-7" />
            </div>
            <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-2 md:mb-3 tracking-tight group-hover:text-blue-600 transition-colors">
              {services.python.title}
            </h3>
            <p className="text-gray-500 leading-relaxed text-xs md:text-sm mb-6 md:mb-8 font-medium">
              {services.python.shortDesc}
            </p>
            <div className="flex items-center text-blue-600 font-bold text-[10px] md:text-sm uppercase tracking-wider gap-2 group-hover:translate-x-2 transition-transform mt-auto">
              Open Presentation <ArrowRight size={14}/>
            </div>
          </motion.div>

          {/* Laravel Bento Card */}
          <motion.div 
            variants={fadeUp} 
            onClick={() => setSelectedService(services.laravel)} 
            className="md:col-span-1 bg-[#FAFAFA] rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 border border-gray-200 cursor-pointer hover:border-purple-300 hover:shadow-[0_20px_40px_-15px_rgba(168,85,247,0.15)] transition-all duration-500 group overflow-hidden relative flex flex-col justify-center"
          >
             <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-purple-100/50 rounded-full blur-[50px] -z-10 group-hover:scale-150 transition-transform duration-700" />
            <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-2xl flex items-center justify-center mb-5 md:mb-6 border border-gray-200 shadow-sm group-hover:border-purple-200 group-hover:shadow-purple-100 transition-all duration-300">
              <Database className="text-purple-600 w-6 h-6 md:w-7 md:h-7" />
            </div>
            <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-2 md:mb-3 tracking-tight group-hover:text-purple-600 transition-colors">
              {services.laravel.title}
            </h3>
            <p className="text-gray-500 leading-relaxed text-xs md:text-sm mb-6 md:mb-8 font-medium">
              {services.laravel.shortDesc}
            </p>
            <div className="flex items-center text-purple-600 font-bold text-[10px] md:text-sm uppercase tracking-wider gap-2 group-hover:translate-x-2 transition-transform mt-auto">
              Open Presentation <ArrowRight size={14}/>
            </div>
          </motion.div>

          {/* Lead Gen & Ads Bento Card */}
          <motion.div 
            variants={fadeUp} 
            onClick={() => setSelectedService(services.leadgen)} 
            className="md:col-span-2 bg-[#FAFAFA] rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12 border border-gray-200 cursor-pointer hover:border-rose-300 hover:shadow-[0_20px_40px_-15px_rgba(225,29,72,0.15)] transition-all duration-500 relative group overflow-hidden"
          >
            <div className="absolute right-0 bottom-0 w-64 h-64 md:w-80 md:h-80 bg-rose-100/40 rounded-full blur-[80px] -z-10 group-hover:scale-125 group-hover:bg-rose-200/40 transition-all duration-700" />
            <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-2xl flex items-center justify-center mb-6 md:mb-8 border border-gray-200 shadow-sm group-hover:border-rose-200 group-hover:shadow-rose-100 transition-all duration-300">
              <Target className="text-rose-500 w-7 h-7 md:w-8 md:h-8" />
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-3 md:mb-4 tracking-tight group-hover:text-rose-500 transition-colors">
              {services.leadgen.title}
            </h3>
            <p className="text-gray-500 text-sm md:text-lg max-w-md leading-relaxed mb-6 md:mb-8 font-medium">
              {services.leadgen.shortDesc}
            </p>
            <div className="flex items-center text-rose-500 font-bold text-[10px] md:text-sm uppercase tracking-wider gap-2 group-hover:translate-x-2 transition-transform bg-rose-50 w-fit px-4 py-2 rounded-full mt-auto">
              Open ROI Presentation <ArrowRight size={14} md:size={16}/>
            </div>
          </motion.div>

        </motion.div>
      </div>

      <PresentationModal 
        isOpen={!!selectedService} 
        onClose={() => setSelectedService(null)} 
        data={selectedService} 
      />
    </section>
  );
};

export default FlagshipBento;
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Terminal } from 'lucide-react';

// --- INDIVIDUAL TIMELINE STEP COMPONENT ---
const TimelineStep = ({ step, isLast }) => {
  const ref = useRef(null);
  // Detects when this specific card reaches the middle of the viewport
  const isInView = useInView(ref, { once: false, margin: "-40% 0px -40% 0px" });

  return (
    <div ref={ref} className="flex gap-6 md:gap-10 relative group">
      {/* Node (Number) */}
      <div 
        className={`w-14 h-14 md:w-20 md:h-20 rounded-2xl flex items-center justify-center shrink-0 border-2 transition-all duration-500 z-10 
        ${isInView 
          ? 'bg-emerald-600 border-emerald-500 text-white shadow-[0_0_30px_rgba(16,185,129,0.4)] scale-110' 
          : 'bg-white border-gray-200 text-gray-300'}`}
      >
        <span className="text-xl md:text-3xl font-black font-mono">{step.num}</span>
      </div>
      
      {/* Content Box */}
      <div 
        className={`flex-1 p-6 md:p-10 rounded-[2rem] border transition-all duration-500 mb-12 md:mb-24
        ${isInView 
          ? 'bg-white border-emerald-200 shadow-[0_20px_40px_-15px_rgba(16,185,129,0.15)] scale-100 opacity-100' 
          : 'bg-gray-50 border-gray-100 shadow-sm scale-95 opacity-50'}`}
      >
        <h4 className={`text-xl md:text-3xl font-black mb-3 md:mb-4 tracking-tight transition-colors duration-500 ${isInView ? 'text-gray-900' : 'text-gray-400'}`}>
          {step.title}
        </h4>
        <p className={`text-sm md:text-lg leading-relaxed font-medium transition-colors duration-500 ${isInView ? 'text-gray-600' : 'text-gray-400'}`}>
          {step.desc}
        </p>
      </div>
    </div>
  );
};

// --- MAIN PROCESS SECTION ---
const Process = () => {
  const containerRef = useRef(null);
  
  // Track the scroll progress through the entire section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Map the scroll progress to the height of the glowing timeline
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const steps = [
    { num: "01", title: "Architecture Sync", desc: "Analyzing legacy systems and mapping new database and UI structures. We identify the business bottlenecks before writing a single line of code." },
    { num: "02", title: "Frontend Engineering", desc: "Building blazing fast React interfaces with polished Framer Motion aesthetics. Sub-second load times optimized directly for Core Web Vitals." },
    { num: "03", title: "Backend & Automation", desc: "Deploying highly secure Laravel APIs and integrating custom Python pipelines that push web leads directly into your CRM and WhatsApp." },
    { num: "04", title: "Launch & Scale", desc: "Pushing to production with 24/7 server monitoring, baked-in technical SEO frameworks, and aggressive conversion rate optimization." }
  ];

  return (
    <section id="process" ref={containerRef} className="py-24 md:py-40 bg-[#FAFAFA] border-y border-gray-200/50 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
          
          {/* Left Column - Sticky Details */}
          <div className="lg:w-5/12">
            <div className="lg:sticky lg:top-40">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900 text-white text-xs md:text-sm font-bold mb-6 shadow-lg shadow-gray-900/20">
                <Terminal size={16} className="text-emerald-400" /> Wabcripte Framework
              </div>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 tracking-tight leading-[1.05]">
                Execution <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Pipeline.</span>
              </h2>
              <p className="text-gray-500 text-lg md:text-xl leading-relaxed font-medium max-w-md">
                A transparent, aggressive roadmap to take your digital infrastructure from outdated templates to a state-of-the-art scalable engine.
              </p>
            </div>
          </div>
          
          {/* Right Column - Scrolling Timeline */}
          <div className="lg:w-7/12 relative pt-10">
            {/* Background Line (Faint Grey) */}
            <div className="absolute left-[27px] md:left-[39px] top-10 bottom-0 w-[2px] bg-gray-200 rounded-full" />
            
            {/* Animated Progress Line (Glowing Emerald) */}
            <motion.div 
              className="absolute left-[27px] md:left-[39px] top-10 w-[2px] bg-emerald-500 origin-top rounded-full z-0 shadow-[0_0_15px_rgba(16,185,129,0.8)]"
              style={{ height: lineHeight }}
            />

            {/* Render the Steps */}
            <div className="relative z-10">
              {steps.map((step, idx) => (
                <TimelineStep 
                  key={idx} 
                  step={step} 
                  isLast={idx === steps.length - 1} 
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Process;
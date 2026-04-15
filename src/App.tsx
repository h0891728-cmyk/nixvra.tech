import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import NixvraLogo from './components/NixvraLogo';
import HomePage from './pages/HomePage';
import InsightDetail from './pages/InsightDetail';
import AuditPlatform from './pages/AuditPlatform';

// BUBBLE BACKGROUND COMPONENT
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

// Autoscroll to top natively
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const WHATSAPP_URL = "https://wa.me/917078524164?text=I'm%20interested%20in%20an%20architecture%20audit";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      {/* Floating WhatsApp CTA */}
      <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-3 md:p-4 rounded-full shadow-lg hover:scale-110 transition-transform whatsapp-float cursor-pointer flex items-center justify-center border border-gray-100">
        <MessageSquare className="w-6 h-6 md:w-7 md:h-7" />
      </a>

      {/* HEADER */}
      <header className="fixed top-0 w-full z-40 px-6 py-4 border-b border-gray-200 bg-white/90 backdrop-blur-xl shrink-0 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center w-24 md:w-32 cursor-pointer">
            <NixvraLogo animated={true} />
          </Link>
          <div className="hidden lg:flex items-center space-x-8 text-[13px] font-bold text-gray-500">
            <Link to="/#portfolio" className="hover:text-[#00B077] transition-colors tracking-wide">Portfolio</Link>
            <Link to="/#services" className="hover:text-[#00B077] transition-colors tracking-wide">Architectures</Link>
            <Link to="/#roadmap" className="hover:text-[#00B077] transition-colors tracking-wide">Pipeline</Link>
            <Link to="/#pricing" className="hover:text-[#00B077] transition-colors tracking-wide hidden lg:inline-block">Pricing</Link>
            <Link to="/audit" className="text-[#00B077] bg-[#00B077]/10 px-4 py-1.5 rounded-full hover:bg-[#00B077]/20 transition-colors tracking-widest uppercase font-black text-[11px]">Free Audit Engine</Link>
          </div>
          <button onClick={() => window.open(WHATSAPP_URL)} className="bg-[#00B077] hover:bg-[#008E60] text-white px-6 py-2 text-[13px] rounded-full font-bold transition-all shadow-md shadow-[#00B077]/20 uppercase tracking-widest">
             Contact
          </button>
        </div>
      </header>

      {/* LAYOUT BODY */}
      <div className="relative font-sans selection:bg-[#00B077]/20 text-[#111111] z-10 overflow-hidden text-base bg-transparent min-h-[100dvh]">
         <BubbleBackground />
         <Routes>
           <Route path="/" element={<HomePage />} />
           <Route path="/insight/:id" element={<InsightDetail />} />
           <Route path="/audit" element={<AuditPlatform />} />
         </Routes>
      </div>

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
    </BrowserRouter>
  );
}
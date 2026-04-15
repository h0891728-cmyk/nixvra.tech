import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { MessageCircle, Menu, X } from 'lucide-react';

// 1. Import your SVG logo (Ensure this path matches your Vite/Next setup)
import logo from '../assets/logo.svg'; 

// 2. Constants for WhatsApp
const WA_NUMBER = "917078524164";
const WA_MESSAGE = encodeURIComponent("Hello Nixvra Solutions, I want to discuss a scalable digital project.");
const WHATSAPP_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

// 3. INCLUDED LOCALLY: MagneticButton (Prevents "undefined" import errors)
const MagneticButton = ({ children, className, onClick, type = "button", href, target, rel }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  const Wrapper = href ? motion.a : motion.button;
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

// 4. MAIN NAVBAR COMPONENT
const Navbar = () => {
  const { scrollY } = useScroll();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Dynamic Glassmorphism on Scroll
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.8]);
  const blur = useTransform(scrollY, [0, 100], [0, 16]);
  const py = useTransform(scrollY, [0, 100], ["1.5rem", "1rem"]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 1]);

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.nav 
        className="fixed top-0 w-full z-[80] px-4 md:px-6 transition-all"
        style={{ paddingTop: py, paddingBottom: py }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="flex items-center justify-between px-4 md:px-6 py-4 rounded-full"
            style={{ 
              backgroundColor: useTransform(bgOpacity, v => `rgba(255, 255, 255, ${v})`),
              backdropFilter: useTransform(blur, v => `blur(${v}px)`),
              borderWidth: "1px",
              borderColor: useTransform(borderOpacity, v => `rgba(229, 231, 235, ${v})`),
              boxShadow: useTransform(borderOpacity, v => `0 4px 6px -1px rgba(0, 0, 0, ${v * 0.05})`)
            }}
          >
            {/* --- LOGO SECTION --- */}
            <div className="flex items-center gap-3 relative z-[90]">
              <img 
                src={logo} 
                alt="Nixvra Logo" 
                className="h-5 object-contain" 
              />
            </div>
            
            {/* --- DESKTOP LINKS --- */}
            <div className="hidden lg:flex items-center gap-8 text-sm font-bold text-gray-600">
              <MagneticButton href="#flagship" className="hover:text-emerald-600 transition-colors">Architecture</MagneticButton>
              <MagneticButton href="#why-us" className="hover:text-emerald-600 transition-colors">Why Nixvra</MagneticButton>
              <MagneticButton href="#process" className="hover:text-emerald-600 transition-colors">Execution</MagneticButton>
              <MagneticButton href="#faq" className="hover:text-emerald-600 transition-colors">FAQ</MagneticButton>
            </div>
            
            {/* --- CTA & MOBILE TOGGLE --- */}
            <div className="flex items-center gap-3 relative z-[90]">
              <MagneticButton 
                href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" 
                className="bg-emerald-600 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-emerald-700 transition-all shadow-[0_4px_14px_0_rgba(16,185,129,0.39)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.23)] hover:-translate-y-0.5 flex items-center gap-2"
              >
                <MessageCircle size={16} /> 
                <span className="hidden sm:inline">Engage</span>
              </MagneticButton>

              {/* Hamburger Button for Mobile */}
              <button 
                className="lg:hidden p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-900"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </motion.div>
        </div>
      </motion.nav>

      {/* --- MOBILE FULLSCREEN MENU --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[70] bg-white/95 backdrop-blur-2xl flex flex-col items-center justify-center lg:hidden"
          >
            <div className="flex flex-col items-center gap-8 text-2xl font-black text-gray-900 tracking-tight">
              <a href="#flagship" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-emerald-600 transition-colors">Architecture</a>
              <a href="#why-us" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-emerald-600 transition-colors">Why Nixvra</a>
              <a href="#process" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-emerald-600 transition-colors">Execution</a>
              <a href="#faq" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-emerald-600 transition-colors">FAQ</a>
              
              <div className="w-16 h-[1px] bg-gray-200 my-4"></div>
              
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-emerald-600 flex items-center gap-3 text-xl">
                <MessageCircle size={24} /> Let's Talk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
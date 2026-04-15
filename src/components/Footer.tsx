import React from 'react';
import { MessageCircle, ArrowUpRight } from 'lucide-react';
import logo from '../assets/logo.svg'; 

const WHATSAPP_URL = "https://wa.me/917078524164?text=Hello%20Nixvra%20Solutions,%20I%20want%20to%20discuss%20a%20scalable%20digital%20project.";

const Footer = () => {
  return (
    <footer className="bg-white relative overflow-hidden pt-24 pb-8">
      {/* Premium Top Border Glow */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-emerald-50/50 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row justify-between gap-16 mb-20">
          
          {/* Brand & Mission */}
          <div className="max-w-sm">
            <div className="mb-8">
              {/* Logo Only - No Text */}
              <img 
                src={logo} 
                alt="Nixvra Brand Identity" 
                className="h-7 object-contain" 
              />
            </div>
            <p className="text-gray-500 text-lg leading-relaxed font-medium">
              Transforming business through pure code execution and intelligent automation. We build systems designed to dominate.
            </p>
          </div>

          {/* Navigation Matrix */}
          <div className="flex flex-col sm:flex-row gap-16 md:gap-24">
            
            {/* Column 1: Architecture */}
            <div className="flex flex-col gap-6">
              <h4 className="font-bold text-gray-900 uppercase tracking-widest text-xs">Architecture</h4>
              <ul className="space-y-4 text-base font-medium text-gray-500">
                <li>
                  <a href="#flagship" className="group flex items-center gap-2 hover:text-emerald-600 transition-colors">
                    React Ecosystems 
                    <ArrowUpRight size={14} className="opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                  </a>
                </li>
                <li>
                  <a href="#flagship" className="group flex items-center gap-2 hover:text-emerald-600 transition-colors">
                    Python Bots
                    <ArrowUpRight size={14} className="opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                  </a>
                </li>
                <li>
                  <a href="#flagship" className="group flex items-center gap-2 hover:text-emerald-600 transition-colors">
                    Laravel APIs
                    <ArrowUpRight size={14} className="opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: Engage */}
            <div className="flex flex-col gap-6">
              <h4 className="font-bold text-gray-900 uppercase tracking-widest text-xs">Engage</h4>
              <ul className="space-y-4 text-base font-medium text-gray-500">
                <li>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 text-emerald-600 hover:text-emerald-700 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                      <MessageCircle size={14} className="fill-emerald-600 text-emerald-600" />
                    </div>
                    Initiate Audit
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Bar: Copyright & Location */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-bold tracking-widest uppercase text-gray-400">
          <p className="flex items-center gap-2">
            © {new Date().getFullYear()} Nixvra Solutions <span className="text-gray-300">|</span> Directed by Wabcripte
          </p>
          <p className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Operating from Jabalpur, MP, India
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
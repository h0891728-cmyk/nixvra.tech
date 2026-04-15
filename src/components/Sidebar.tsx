import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Filter, X, Search } from 'lucide-react';
import clsx from 'clsx';

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
}

function FilterSection({ title, children, isOpen = true }: FilterSectionProps) {
  const [open, setOpen] = useState(isOpen);

  return (
    <div className="border-b border-gray-100 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-left font-medium text-gray-900 hover:text-gold-600 transition-colors"
      >
        <span>{title}</span>
        {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pt-4 pb-2 space-y-2">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface SidebarProps {
  className?: string;
  onClose?: () => void;
  isMobile?: boolean;
}

export default function Sidebar({ className, onClose, isMobile }: SidebarProps) {
  const [priceRange, setPriceRange] = useState([1000000, 50000000]);

  return (
    <aside className={clsx(
      "w-full bg-white p-6 overflow-y-auto no-scrollbar",
      !isMobile && "rounded-xl shadow-sm border border-gray-100 sticky top-24 max-h-[calc(100vh-8rem)]",
      isMobile && "h-full",
      className
    )}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
          <Filter className="w-5 h-5" /> Filters
        </h2>
        <div className="flex items-center gap-4">
          <button className="text-xs font-medium text-gray-500 hover:text-black uppercase tracking-wider">
            Reset All
          </button>
          {isMobile && onClose && (
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-1">
        <FilterSection title="Property Type">
          <div className="space-y-2">
            {['Apartment', 'Villa', 'Penthouse', 'Townhouse', 'Office', 'Plot'].map((type) => (
              <label key={type} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center">
                  <input type="checkbox" className="peer w-4 h-4 border-2 border-gray-300 rounded-sm checked:bg-black checked:border-black transition-colors appearance-none" />
                  <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 left-0.5 top-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-sm text-gray-600 group-hover:text-black transition-colors">{type}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Price Range (AED)">
          <div className="px-1">
             <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                <span>{priceRange[0].toLocaleString()}</span>
                <span>{priceRange[1].toLocaleString()}+</span>
             </div>
             <input 
               type="range" 
               min="1000000" 
               max="50000000" 
               step="500000"
               className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
             />
          </div>
        </FilterSection>

        <FilterSection title="Bedrooms">
          <div className="flex flex-wrap gap-2">
            {['Studio', '1', '2', '3', '4', '5+'].map((bed) => (
              <button
                key={bed}
                className="px-3 py-1.5 border border-gray-200 rounded-full text-sm text-gray-600 hover:border-black hover:text-black transition-colors focus:bg-black focus:text-white focus:border-black"
              >
                {bed}
              </button>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Location">
          <div className="relative">
             <input 
               type="text" 
               placeholder="Search location..." 
               className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black transition-colors"
             />
             <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
          </div>
          <div className="mt-3 space-y-2">
             {['Downtown Dubai', 'Palm Jumeirah', 'Dubai Marina', 'Business Bay'].map(loc => (
                <label key={loc} className="flex items-center gap-3 cursor-pointer group">
                   <input type="checkbox" className="peer w-4 h-4 border-gray-300 rounded text-black focus:ring-black" />
                   <span className="text-sm text-gray-600 group-hover:text-black">{loc}</span>
                </label>
             ))}
          </div>
        </FilterSection>
        
        <FilterSection title="Amenities">
           <div className="space-y-2">
              {['Pool', 'Gym', 'Parking', 'Security', 'Balcony', 'Sea View'].map(amenity => (
                 <label key={amenity} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="peer w-4 h-4 border-gray-300 rounded text-black focus:ring-black" />
                    <span className="text-sm text-gray-600 group-hover:text-black">{amenity}</span>
                 </label>
              ))}
           </div>
        </FilterSection>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-100">
        <button className="w-full py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors shadow-lg shadow-black/10">
          Apply Filters
        </button>
      </div>
    </aside>
  );
}

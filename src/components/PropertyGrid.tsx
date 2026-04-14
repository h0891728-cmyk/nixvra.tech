import { useState } from 'react';
import PropertyCard, { Property } from './PropertyCard';
import { properties } from '../data/properties';
import { motion } from 'framer-motion';

export default function PropertyGrid() {
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = () => {
    setIsLoading(true);
    // Simulate network delay
    setTimeout(() => {
      setVisibleCount((prev) => prev + 3);
      setIsLoading(false);
    }, 800);
  };

  const visibleProperties = properties.slice(0, visibleCount);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium text-gray-500">
          Showing <span className="text-black font-bold">{properties.length}</span> properties
        </h2>
        
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500">Sort by:</span>
          <select className="bg-transparent font-medium text-black focus:outline-none cursor-pointer">
            <option>Newest First</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {visibleProperties.map((property, index) => (
          <PropertyCard key={property.id} property={property} index={index % 3} />
        ))}
      </div>

      {visibleCount < properties.length && (
        <div className="mt-16 flex justify-center">
          <button
            onClick={handleLoadMore}
            disabled={isLoading}
            className="px-8 py-3 bg-white border border-gray-200 text-black font-medium rounded-full hover:bg-black hover:text-white hover:border-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Loading...
              </>
            ) : (
              'Load More Properties'
            )}
          </button>
        </div>
      )}
    </div>
  );
}

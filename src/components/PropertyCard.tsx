import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MapPin, Bed, Bath, Square } from 'lucide-react';
import clsx from 'clsx';

export interface Property {
  id: string;
  title: string;
  price: string;
  location: string;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  type: string;
  isFeatured?: boolean;
}

interface PropertyCardProps {
  property: Property;
  index: number;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <motion.img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          loading="lazy"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {property.isFeatured && (
            <span className="px-3 py-1 bg-black/80 backdrop-blur-sm text-white text-xs font-medium uppercase tracking-wider rounded-full">
              Featured
            </span>
          )}
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-black text-xs font-medium uppercase tracking-wider rounded-full">
            {property.type}
          </span>
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors z-10"
        >
          <Heart
            className={clsx(
              "w-5 h-5 transition-colors duration-300",
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-700 hover:text-black"
            )}
          />
        </button>

        {/* Price Tag (Bottom Left on Image) */}
        <div className="absolute bottom-4 left-4 text-white">
          <p className="text-2xl font-bold tracking-tight">{property.price}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 group-hover:text-gold-600 transition-colors">
            {property.title}
          </h3>
        </div>
        
        <div className="flex items-center gap-1 text-gray-500 text-sm mb-4">
          <MapPin className="w-4 h-4" />
          <span className="line-clamp-1">{property.location}</span>
        </div>

        {/* Meta Icons */}
        <div className="flex items-center gap-6 text-gray-600 text-sm border-t border-gray-100 pt-4">
          <div className="flex items-center gap-2">
            <Bed className="w-4 h-4 text-gray-400" />
            <span>{property.beds} Beds</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath className="w-4 h-4 text-gray-400" />
            <span>{property.baths} Baths</span>
          </div>
          <div className="flex items-center gap-2">
            <Square className="w-4 h-4 text-gray-400" />
            <span>{property.sqft.toLocaleString()} sqft</span>
          </div>
        </div>

        {/* View Details Button (appears on hover or always visible on mobile) */}
        <div className="mt-4 overflow-hidden h-0 group-hover:h-10 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100">
           <button className="w-full py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">
             View Details
           </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;

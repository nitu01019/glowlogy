/**
 * ServiceCard Component
 * Individual service card with animations
 */

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { OptimizedImage } from '../ui';

export const ServiceCard = ({
  service,
  index = 0,
}) => {
  const { id, name, description, duration, price, image, category } = service;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <Link to={`/services/${category || id}`} className="group block h-full">
        <motion.div
          className="relative h-full bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
          whileHover={{
            y: -8,
            boxShadow: "0 20px 40px rgba(139,90,43,0.15)",
          }}
          transition={{ duration: 0.25 }}
        >
          {/* Image */}
          {image && (
            <div className="relative h-48 overflow-hidden">
              <OptimizedImage
                src={image}
                alt={name}
                aspectRatio="16/9"
                className="group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              
              {/* Price tag */}
              <motion.div
                className="absolute bottom-3 left-3 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-sm font-semibold text-primary shadow-sm"
                whileHover={{ scale: 1.05 }}
              >
                ₹{typeof price === 'number' ? price.toLocaleString() : price}
              </motion.div>
            </div>
          )}

          {/* Content */}
          <div className="p-6">
            {duration && (
              <div className="flex items-center gap-2 mb-2">
                <Clock size={14} className="text-gray-400" />
                <span className="text-sm text-gray-500">
                  {typeof duration === 'number' ? `${duration} min` : duration}
                </span>
              </div>
            )}

            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-200">
              {name}
            </h3>
            
            {description && (
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {description}
              </p>
            )}

            <motion.span
              className="inline-flex items-center gap-2 text-primary font-medium text-sm"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              Learn More
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
            </motion.span>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default ServiceCard;

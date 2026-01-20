/**
 * Locations Section
 * Mobile-friendly grid
 */

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, ArrowRight } from 'lucide-react';
import { Button, OptimizedImage } from '../ui';
import { IMAGES } from '../../utils/images';

// Jammu locations only
const locations = [
  {
    id: 'jammu-gandhi-nagar',
    name: 'Gandhi Nagar',
    city: 'Jammu',
    address: 'Main Road, Gandhi Nagar, Jammu - 180004',
    phone: '+91 98765 43210',
    hours: '9 AM - 8 PM',
    image: IMAGES.locations.delhi, // Using placeholder image
    featured: true,
  },
  {
    id: 'jammu-channi-himmat',
    name: 'Channi Himmat',
    city: 'Jammu',
    address: 'Near Channi Himmat Crossing, Jammu - 180015',
    phone: '+91 98765 43211',
    hours: '9 AM - 8 PM',
    image: IMAGES.locations.mumbai, // Using placeholder image
    featured: true,
  },
  {
    id: 'jammu-kachi-chawni',
    name: 'Kachi Chawni',
    city: 'Jammu',
    address: 'Kachi Chawni Main Market, Jammu - 180001',
    phone: '+91 98765 43212',
    hours: '9 AM - 8 PM',
    image: IMAGES.locations.bangalore, // Using placeholder image
  },
];

export const Locations = ({ limit = 3 }) => {
  const displayLocations = locations.slice(0, limit);

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-background-alt">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <span className="text-primary text-sm font-medium tracking-widest uppercase mb-2 block">
            Our Locations in Jammu
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-gray-900">
            Visit Us
          </h2>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {displayLocations.map((location, index) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/locations/${location.id}`} className="group block">
                <div className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow ${
                  location.featured ? 'ring-2 ring-primary' : ''
                }`}>
                  {/* Image */}
                  <div className="relative h-36 sm:h-40 overflow-hidden">
                    <OptimizedImage
                      src={location.image}
                      alt={location.name}
                      aspectRatio="16/9"
                      className="group-hover:scale-105 transition-transform duration-300"
                    />
                    {location.featured && (
                      <span className="absolute top-2 right-2 px-2 py-1 bg-primary text-white text-xs rounded-full">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                          {location.name}
                        </h3>
                        <p className="text-sm text-primary">{location.city}</p>
                      </div>
                      <ArrowRight size={18} className="text-gray-400 group-hover:text-primary transition-colors mt-1" />
                    </div>

                    <p className="text-sm text-gray-600 mb-3">{location.address}</p>

                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Phone size={12} />
                        {location.phone.replace('+91 ', '')}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {location.hours}
                      </span>
                    </div>

                    <button className="w-full mt-4 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors">
                      Book Here
                    </button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-8">
          <Button to="/locations" variant="outline" icon={MapPin}>
            All Locations
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Locations;

/**
 * Services Page
 * All services listing with filtering
 */

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Clock, IndianRupee } from 'lucide-react';
import { Hero, CTA } from '../components/sections';
import { Button, Input } from '../components/ui';
import { SEO } from '../components/common';

const categories = [
  { id: 'all', name: 'All Services' },
  { id: 'massage', name: 'Massage' },
  { id: 'facials', name: 'Facials' },
  { id: 'body', name: 'Body Treatments' },
  { id: 'hair', name: 'Hair & Scalp' },
  { id: 'nails', name: 'Nail Services' },
];

const services = [
  { id: 1, category: 'massage', name: 'Swedish Massage', duration: '60 min', price: 2500, description: 'Classic relaxation massage with gentle strokes' },
  { id: 2, category: 'massage', name: 'Deep Tissue Massage', duration: '75 min', price: 3500, description: 'Intensive massage targeting muscle tension' },
  { id: 3, category: 'massage', name: 'Hot Stone Therapy', duration: '90 min', price: 4000, description: 'Heated stones for deep relaxation' },
  { id: 4, category: 'facials', name: 'Signature Glow Facial', duration: '60 min', price: 3000, description: 'Our signature treatment for radiant skin' },
  { id: 5, category: 'facials', name: 'Anti-Aging Facial', duration: '75 min', price: 4500, description: 'Advanced treatment to reduce fine lines' },
  { id: 6, category: 'body', name: 'Body Scrub & Wrap', duration: '90 min', price: 3500, description: 'Full body exfoliation and hydration' },
  { id: 7, category: 'body', name: 'Detox Treatment', duration: '120 min', price: 5000, description: 'Complete body detoxification therapy' },
  { id: 8, category: 'hair', name: 'Scalp Treatment', duration: '45 min', price: 1500, description: 'Nourishing scalp massage and treatment' },
  { id: 9, category: 'nails', name: 'Luxury Manicure', duration: '60 min', price: 1200, description: 'Complete nail care with massage' },
  { id: 10, category: 'nails', name: 'Spa Pedicure', duration: '75 min', price: 1500, description: 'Relaxing foot care treatment' },
];

const Services = () => {
  const { category: urlCategory } = useParams();
  const [activeCategory, setActiveCategory] = useState(urlCategory || 'all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = services.filter(service => {
    const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <SEO title="Services - Glowlogy" description="Explore our range of spa and wellness services" />
      
      {/* Hero */}
      <section className="pt-8 pb-16 bg-gradient-to-br from-secondary to-background">
        <div className="container-custom">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-heading font-bold text-gray-900 mb-4">Our Services</h1>
            <p className="text-lg text-gray-600">
              Discover our comprehensive range of spa treatments designed to rejuvenate your body and mind.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-4 sm:py-6 md:py-8 bg-white border-b sticky top-16 sm:top-20 z-30">
        <div className="container-custom">
          <div className="flex flex-col gap-4">
            {/* Category Tabs - Horizontal scroll on mobile */}
            <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
              <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                      activeCategory === cat.id
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Search */}
            <div className="relative w-full md:w-64 md:ml-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-8 sm:py-12 md:py-16 bg-background-alt">
        <div className="container-custom">
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
                      {service.name}
                    </h3>
                    <span className="text-[10px] sm:text-xs text-primary font-medium uppercase tracking-wide">
                      {service.category}
                    </span>
                  </div>
                  <span className="text-primary font-bold text-sm sm:text-base">
                    ₹{service.price.toLocaleString()}
                  </span>
                </div>
                
                <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">{service.description}</p>
                
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className="flex items-center gap-1 text-xs sm:text-sm text-gray-500">
                    <Clock size={14} />
                    {service.duration}
                  </span>
                </div>
                
                <Button to="/book" size="small" fullWidth variant="secondary">
                  Book Now
                </Button>
              </motion.div>
            ))}
          </motion.div>

          {filteredServices.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500">No services found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      <CTA />
    </>
  );
};

export default Services;

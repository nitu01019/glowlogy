/**
 * Services Grid - 4 Photo Collage on Mobile, Grid on Desktop
 */

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { Button, OptimizedImage } from '../ui';
import { IMAGES } from '../../utils/images';

const services = [
  {
    id: 'couples-massage',
    title: 'Couples Massage',
    duration: '90 min',
    price: 5999,
    image: IMAGES.massages.couples,
  },
  {
    id: 'couples-massage-60',
    title: 'Couples Massage',
    duration: '60 min',
    price: 4499,
    image: IMAGES.massages.thai,
  },
  {
    id: 'jet-lag-therapy',
    title: 'Jet Lag Therapy',
    duration: '90 min',
    price: 4999,
    image: IMAGES.massages.jetLag,
  },
  {
    id: 'swedish-massage',
    title: 'Swedish Massage',
    duration: '60 min',
    price: 2499,
    image: IMAGES.massages.swedish,
  },
  {
    id: 'abhyanga-massage',
    title: 'Abhyanga Massage',
    duration: '60 min',
    price: 2999,
    image: IMAGES.massages.abhyanga,
  },
  {
    id: 'deep-tissue',
    title: 'Deep Tissue Massage',
    duration: '60 min',
    price: 3499,
    image: IMAGES.massages.deepTissue,
  },
  {
    id: 'hot-stone',
    title: 'Hot Stone Therapy',
    duration: '90 min',
    price: 3999,
    image: IMAGES.massages.hotStone,
  },
  {
    id: 'aromatherapy',
    title: 'Aromatherapy',
    duration: '60 min',
    price: 2799,
    image: IMAGES.massages.aromatherapy,
  },
  {
    id: 'signature-facial',
    title: 'Signature Facial',
    duration: '60 min',
    price: 2999,
    image: IMAGES.services.facial,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

export const ServicesGrid = ({
  title = "Services That Transform",
  subtitle = "WELLNESS TREATMENTS",
  limit = 9,
  showViewAll = true,
}) => {
  const displayServices = services.slice(0, limit);
  // Get first 4 services for mobile collage
  const collageServices = services.slice(0, 4);

  return (
    <section className="py-10 sm:py-14 md:py-16 lg:py-20 bg-background">
      <div className="container-custom">
        {/* Header */}
        <motion.div 
          className="text-center mb-8 sm:mb-10 md:mb-12"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <motion.span
            className="text-primary text-xs sm:text-sm font-medium tracking-widest uppercase mb-2 block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {subtitle}
          </motion.span>
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-gray-900"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {title}
          </motion.h2>
        </motion.div>

        {/* Mobile: 4 Photo Collage (2x2 Grid - NO SCROLL) */}
        <motion.div 
          className="sm:hidden grid grid-cols-2 gap-3 px-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {collageServices.map((service, index) => (
            <motion.div
              key={`collage-${service.id}-${index}`}
              variants={cardVariants}
            >
              <Link to={`/book?service=${service.id}`} className="group block">
                <div className="relative rounded-xl overflow-hidden shadow-md aspect-square">
                  <OptimizedImage
                    src={service.image}
                    alt={service.title}
                    aspectRatio="1/1"
                    className="group-hover:scale-110 transition-transform duration-500 w-full h-full object-cover"
                  />
                  {/* Overlay with title */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-3">
                    <h3 className="text-white text-sm font-semibold leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-white/80 text-xs mt-1">₹{service.price.toLocaleString()}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Desktop/Tablet: Full Grid */}
        <motion.div 
          className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {displayServices.map((service, index) => (
            <motion.div
              key={`${service.id}-${index}`}
              variants={cardVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Link to={`/book?service=${service.id}`} className="group block">
                <motion.div 
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <OptimizedImage
                      src={service.image}
                      alt={service.title}
                      aspectRatio="4/3"
                      className="group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Price overlay */}
                    <motion.div 
                      className="absolute top-3 right-3 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs sm:text-sm font-semibold text-primary"
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                    >
                      ₹{service.price.toLocaleString()}
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-5 text-center">
                    <h3 className="text-base sm:text-lg md:text-xl font-heading font-semibold text-gray-800 mb-2 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    
                    <div className="flex items-center justify-center gap-1 text-gray-500 text-xs sm:text-sm mb-3 sm:mb-4">
                      <Clock size={14} />
                      <span>{service.duration}</span>
                    </div>

                    {/* Book Now Button */}
                    <motion.button 
                      className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-primary text-white text-sm font-medium rounded-md hover:bg-primary-dark transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Book Now
                    </motion.button>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All */}
        {showViewAll && (
          <motion.div 
            className="text-center mt-8 sm:mt-10"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Button to="/services" variant="outline" icon={ArrowRight} iconPosition="right">
                View All Services
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ServicesGrid;

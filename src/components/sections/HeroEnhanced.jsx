/**
 * Enhanced Hero Section
 * Mobile-first, optimized, scalable design with:
 * - Optimized image loading with blur-up effect
 * - WhatsApp & Call buttons properly positioned
 * - Request Callback modal with Firebase integration
 * - Smooth animations with framer-motion
 * - Accessible and SEO-friendly
 */

import { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  ArrowRight, 
  Star, 
  Play, 
  Sparkles
} from 'lucide-react';
import { IMAGES } from '../../utils/images';
import CallbackModal from '../ui/CallbackModal';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }
  })
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay, ease: 'easeOut' }
  })
};

const slideInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.8 } }
};

const slideInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.9 } }
};

// Optimized Hero Image Component with blur-up loading
const HeroImage = memo(({ src, mobileSrc, alt }) => {
  const [loaded, setLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(mobileSrc);

  useEffect(() => {
    // Load appropriate image based on screen size
    const updateImageSrc = () => {
      setCurrentSrc(window.innerWidth > 768 ? src : mobileSrc);
    };
    
    updateImageSrc();
    window.addEventListener('resize', updateImageSrc);
    return () => window.removeEventListener('resize', updateImageSrc);
  }, [src, mobileSrc]);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl sm:rounded-3xl">
      {/* Skeleton/Placeholder */}
      <AnimatePresence>
        {!loaded && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-secondary to-accent/30"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" 
                 style={{ backgroundSize: '200% 100%' }} />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main Image */}
      <motion.img
        src={currentSrc}
        alt={alt}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-700 ${
          loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        }`}
      />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
    </div>
  );
});

HeroImage.displayName = 'HeroImage';

// Stats Item Component
const StatItem = memo(({ value, label, delay }) => (
  <motion.div
    className="text-center"
    variants={fadeInUp}
    custom={delay}
    initial="hidden"
    animate="visible"
    whileHover={{ scale: 1.05, y: -2 }}
  >
    <motion.div 
      className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary"
      animate={{ scale: [1, 1.02, 1] }}
      transition={{ duration: 2, repeat: Infinity, delay }}
    >
      {value}
    </motion.div>
    <div className="text-xs sm:text-sm text-gray-500 mt-1">{label}</div>
  </motion.div>
));

StatItem.displayName = 'StatItem';

// Main Hero Component
export const HeroEnhanced = () => {
  const [showCallbackModal, setShowCallbackModal] = useState(false);

  const stats = [
    { value: '10+', label: 'Years Experience' },
    { value: '50K+', label: 'Happy Clients' },
    { value: '15+', label: 'Locations' },
  ];

  return (
    <>
      <section className="relative min-h-[90vh] sm:min-h-[85vh] bg-gradient-to-br from-secondary via-background to-background-alt overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-32 -right-32 w-64 sm:w-96 h-64 sm:h-96 bg-primary/5 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-32 -left-32 w-72 sm:w-[500px] h-72 sm:h-[500px] bg-accent/10 rounded-full blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          
          {/* Floating particles - hidden on mobile for performance */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/20 rounded-full hidden md:block"
              style={{ left: `${10 + i * 12}%`, top: `${15 + (i % 4) * 20}%` }}
              animate={{ 
                y: [-15, 15, -15], 
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="container-custom relative z-10 pt-8 pb-12 sm:py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh] sm:min-h-0">
            
            {/* Left Content */}
            <motion.div
              className="text-center lg:text-left order-2 lg:order-1"
              initial="hidden"
              animate="visible"
            >
              {/* Badge */}
              <motion.div variants={fadeInUp} custom={0.1} className="mb-5 sm:mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm 
                               rounded-full text-sm font-medium text-primary shadow-sm border border-primary/10">
                  <motion.span
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles size={16} className="text-gold" />
                  </motion.span>
                  Premium Spa & Wellness
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                variants={fadeInUp}
                custom={0.2}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold 
                          text-gray-900 leading-[1.1] mb-5 sm:mb-6"
              >
                Discover the{' '}
                <span className="text-primary relative inline-block">
                  Art
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-1.5 bg-primary/30 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1, duration: 0.6 }}
                  />
                </span>
                <br />
                of <span className="text-primary">Wellness</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={fadeInUp}
                custom={0.3}
                className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 leading-relaxed 
                          max-w-xl mx-auto lg:mx-0"
              >
                Experience tranquility and rejuvenation. Our expert therapists combine 
                ancient healing traditions with modern luxury techniques.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={fadeInUp}
                custom={0.4}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10"
              >
                {/* Book Now Button */}
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    to="/book"
                    className="flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white 
                             font-semibold rounded-xl shadow-lg shadow-primary/25 hover:bg-primary-dark 
                             hover:shadow-xl transition-all duration-300"
                  >
                    Book Appointment
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </motion.div>

                {/* Request Callback Button */}
                <motion.button
                  onClick={() => setShowCallbackModal(true)}
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary 
                           font-semibold rounded-xl border-2 border-primary/20 hover:border-primary 
                           hover:bg-primary/5 transition-all duration-300"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Phone className="w-5 h-5" />
                  Request Callback
                </motion.button>
              </motion.div>

              {/* Stats */}
              <motion.div
                variants={fadeInUp}
                custom={0.5}
                className="flex justify-center lg:justify-start gap-8 sm:gap-12 pt-8 
                          border-t border-gray-200/50"
              >
                {stats.map((stat, i) => (
                  <StatItem key={i} {...stat} delay={0.6 + i * 0.1} />
                ))}
              </motion.div>
            </motion.div>

            {/* Right - Hero Image */}
            <motion.div
              className="relative order-1 lg:order-2"
              variants={scaleIn}
              custom={0.2}
              initial="hidden"
              animate="visible"
            >
              <div className="relative max-w-md mx-auto lg:max-w-none">
                {/* Main Image Container */}
                <motion.div
                  className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] rounded-2xl sm:rounded-3xl 
                            overflow-hidden shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                >
                  <HeroImage
                    src={IMAGES.hero.main}
                    mobileSrc={IMAGES.hero.mobile}
                    alt="Luxurious spa massage experience at Glowlogy"
                  />
                </motion.div>

                {/* Rating Card */}
                <motion.div
                  className="absolute -left-2 sm:-left-6 top-1/4 bg-white rounded-2xl p-3 sm:p-4 
                            shadow-xl flex items-center gap-3 border border-gray-100"
                  variants={slideInLeft}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.05, x: 5 }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-400 to-orange-500 
                                rounded-xl flex items-center justify-center shadow-lg">
                    <Star className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-lg sm:text-xl">4.9</div>
                    <div className="text-xs sm:text-sm text-gray-500">2K+ Reviews</div>
                  </div>
                </motion.div>

                {/* Discount Badge */}
                <motion.div
                  className="absolute -right-2 sm:-right-6 bottom-1/4 bg-gradient-to-br from-primary 
                            to-primary-dark text-white rounded-2xl p-4 sm:p-5 shadow-xl"
                  variants={slideInRight}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.05, rotate: 3 }}
                >
                  <div className="text-center">
                    <motion.div
                      className="text-3xl sm:text-4xl font-bold"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      20%
                    </motion.div>
                    <div className="text-xs sm:text-sm opacity-90 font-medium">First Visit</div>
                  </div>
                </motion.div>

                {/* Video Tour Button */}
                <motion.button
                  className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 flex items-center gap-3 
                            bg-white/95 backdrop-blur-sm px-4 sm:px-5 py-2.5 sm:py-3 rounded-full 
                            shadow-lg hover:shadow-xl transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-full flex items-center 
                              justify-center shadow-md"
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-white ml-0.5" />
                  </motion.div>
                  <span className="text-sm sm:text-base font-semibold text-gray-900">Watch Tour</span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs text-gray-400 font-medium">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-1.5 bg-primary rounded-full"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Callback Modal */}
      <CallbackModal 
        isOpen={showCallbackModal} 
        onClose={() => setShowCallbackModal(false)} 
      />
    </>
  );
};

export default HeroEnhanced;

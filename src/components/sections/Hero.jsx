/**
 * Hero Section
 * Mobile-first beautiful design with animations
 */

import { motion } from 'framer-motion';
import { Button, OptimizedImage } from '../ui';
import { Sparkles, ArrowRight, Star, Play } from 'lucide-react';
import { IMAGES } from '../../utils/images';

export const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-secondary via-background to-background-alt overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -top-20 -right-20 w-40 sm:w-64 md:w-96 h-40 sm:h-64 md:h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div 
          className="absolute -bottom-20 -left-20 w-48 sm:w-72 md:w-[400px] h-48 sm:h-72 md:h-[400px] bg-accent/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-primary/30 rounded-full hidden sm:block"
            style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
            animate={{ y: [-10, 10, -10], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </div>

      <div className="container-custom relative z-10 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          
          {/* Content */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-4 sm:mb-5"
            >
              <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/80 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium text-primary shadow-sm border border-primary/10">
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles size={14} className="text-gold" />
                </motion.span>
                Premium Spa Experience
              </span>
            </motion.div>

            {/* Title - larger on mobile */}
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-900 leading-[1.15] mb-4 sm:mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Discover the{' '}
              <span className="text-primary relative">
                Art
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-1 bg-primary/30 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                />
              </span>{' '}
              of <span className="text-primary">Wellness</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Experience tranquility and rejuvenation. Our expert therapists combine ancient healing traditions with modern techniques.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8 sm:mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  to="/book" 
                  size="large"
                  icon={ArrowRight}
                  iconPosition="right"
                  className="w-full sm:w-auto shadow-lg shadow-primary/20"
                >
                  Book Now
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  to="/services" 
                  variant="outline"
                  size="large"
                  className="w-full sm:w-auto"
                >
                  Explore Services
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="flex justify-center lg:justify-start gap-6 sm:gap-10 pt-6 sm:pt-8 border-t border-gray-200/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {[
                { value: '10+', label: 'Years' },
                { value: '50K+', label: 'Happy Clients' },
                { value: '15+', label: 'Locations' },
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  className="text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            className="relative mt-4 sm:mt-0"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative max-w-sm sm:max-w-md mx-auto lg:max-w-none">
              {/* Main Image */}
              <motion.div 
                className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <OptimizedImage
                  src={IMAGES.hero.main}
                  alt="Relaxing spa massage"
                  aspectRatio="4/5"
                  priority={true}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </motion.div>
              
              {/* Rating Card */}
              <motion.div 
                className="absolute -left-2 sm:-left-4 top-1/4 bg-white rounded-xl p-2.5 sm:p-3 shadow-lg flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-white" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm sm:text-base">4.9</div>
                  <div className="text-[10px] sm:text-xs text-gray-500">2K+ Reviews</div>
                </div>
              </motion.div>
              
              {/* Discount Card */}
              <motion.div 
                className="absolute -right-2 sm:-right-4 bottom-1/4 bg-primary text-white rounded-xl p-3 sm:p-4 shadow-lg"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
              >
                <div className="text-center">
                  <motion.div 
                    className="text-2xl sm:text-3xl font-bold"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    20%
                  </motion.div>
                  <div className="text-[10px] sm:text-xs opacity-90">First Visit</div>
                </div>
              </motion.div>

              {/* Play Button */}
              <motion.button
                className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div 
                  className="w-8 h-8 bg-primary rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Play className="w-3 h-3 text-white fill-white ml-0.5" />
                </motion.div>
                <span className="text-xs sm:text-sm font-medium text-gray-900">Watch Tour</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:block"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-5 h-8 border-2 border-primary/30 rounded-full flex justify-center pt-1.5">
          <motion.div 
            className="w-1 h-1 bg-primary rounded-full"
            animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;

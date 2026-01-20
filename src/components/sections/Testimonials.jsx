/**
 * Testimonials Section
 * Mobile-friendly carousel
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { OptimizedImage } from '../ui';
import { IMAGES } from '../../utils/images';

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Regular Client',
    image: IMAGES.avatars.female1,
    rating: 5,
    text: 'Glowlogy has become my sanctuary. The therapists are incredibly skilled and every visit leaves me feeling rejuvenated.',
  },
  {
    id: 2,
    name: 'Rahul Mehta',
    role: 'Premium Member',
    image: IMAGES.avatars.male1,
    rating: 5,
    text: 'Best spa experience in the city! The deep tissue massage is exceptional and the staff is very professional.',
  },
  {
    id: 3,
    name: 'Ananya Patel',
    role: 'Member since 2022',
    image: IMAGES.avatars.female2,
    rating: 5,
    text: "Their facial treatments have transformed my skin. Highly recommend the signature glow facial!",
  },
];

export const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, isPaused]);

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <span className="text-primary text-sm font-medium tracking-widest uppercase mb-2 block">
            Testimonials
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-gray-900">
            What Our Clients Say
          </h2>
        </div>

        {/* Carousel */}
        <div 
          className="relative max-w-2xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Quote icon */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg z-10">
            <Quote className="w-5 h-5 text-white" />
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 pt-10 min-h-[280px] sm:min-h-[260px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="text-center"
              >
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-base sm:text-lg text-gray-700 italic mb-6 leading-relaxed">
                  "{testimonials[current].text}"
                </p>

                {/* Author */}
                <div className="flex items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/20">
                    <OptimizedImage
                      src={testimonials[current].image}
                      alt={testimonials[current].name}
                      aspectRatio="1/1"
                    />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">{testimonials[current].name}</div>
                    <div className="text-sm text-gray-500">{testimonials[current].role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-primary active:scale-95 transition-all"
              aria-label="Previous"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === current ? 'w-6 bg-primary' : 'w-2 bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-primary active:scale-95 transition-all"
              aria-label="Next"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

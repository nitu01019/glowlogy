/**
 * About Section
 * Mobile-friendly layout
 */

import { motion } from 'framer-motion';
import { Button, OptimizedImage } from '../ui';
import { Award, Users, Leaf, Shield, ArrowRight, CheckCircle } from 'lucide-react';
import { IMAGES } from '../../utils/images';

const features = [
  { icon: Award, title: 'Expert Therapists' },
  { icon: Leaf, title: 'Natural Products' },
  { icon: Users, title: 'Personalized Care' },
  { icon: Shield, title: 'Hygiene First' },
];

export const About = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image - shows below on mobile */}
          <motion.div
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="relative max-w-md mx-auto lg:max-w-none">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <OptimizedImage
                  src={IMAGES.ambiance.room}
                  alt="Spa interior"
                  aspectRatio="4/3"
                />
              </div>
              
              {/* Experience badge */}
              <div className="absolute -bottom-4 -right-4 sm:bottom-4 sm:right-4 bg-primary text-white rounded-xl p-4 shadow-lg">
                <div className="text-3xl font-bold">10+</div>
                <div className="text-sm opacity-90">Years</div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <span className="text-primary text-sm font-medium tracking-widest uppercase mb-2 block">
              About Us
            </span>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              Where <span className="text-primary">Wellness</span> Meets Luxury
            </h2>
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              At Glowlogy, we believe in the transformative power of self-care. Our spa sanctuaries 
              provide a haven of tranquility where you can escape daily stress and reconnect with peace.
            </p>

            {/* Features grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
              {features.map((feature) => (
                <div key={feature.title} className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  <span className="text-sm sm:text-base text-gray-700">{feature.title}</span>
                </div>
              ))}
            </div>

            <Button to="/about" icon={ArrowRight} iconPosition="right">
              Learn More
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

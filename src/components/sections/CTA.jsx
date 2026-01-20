/**
 * CTA Section
 * Mobile-friendly call to action
 */

import { motion } from 'framer-motion';
import { Button } from '../ui';
import { Phone, Calendar, Gift } from 'lucide-react';

export const CTA = ({
  title = "Ready to Begin Your Wellness Journey?",
  subtitle = "Book your appointment today and get 20% off your first visit.",
  primaryButton = { text: "Book Now", to: "/book" },
  secondaryButton = { text: "Call Us", href: "tel:+919876543210" },
}) => {
  return (
    <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-primary" />
      
      {/* Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-white/10 rounded-full blur-2xl" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          {/* Offer badge */}
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/90 text-sm mb-4 sm:mb-6">
            <Gift size={16} />
            20% off first visit
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white mb-4 leading-tight">
            {title}
          </h2>
          
          <p className="text-base sm:text-lg text-white/80 mb-6 sm:mb-8 max-w-lg mx-auto">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button
              to={primaryButton.to}
              variant="white"
              size="large"
              icon={Calendar}
              className="w-full sm:w-auto"
            >
              {primaryButton.text}
            </Button>
            
            <Button
              href={secondaryButton.href}
              variant="outline"
              size="large"
              icon={Phone}
              className="w-full sm:w-auto border-white/30 text-white hover:bg-white hover:text-primary"
            >
              {secondaryButton.text}
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-white/10 grid grid-cols-3 gap-4 sm:gap-8">
            {[
              { value: '50K+', label: 'Clients' },
              { value: '100+', label: 'Therapists' },
              { value: '15+', label: 'Locations' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs sm:text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;

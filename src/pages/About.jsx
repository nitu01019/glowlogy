/**
 * About Page
 * Glowlogy Spa Jammu - Our Story
 * With proper Jammu SEO and responsive design
 */

import { motion } from 'framer-motion';
import { Award, Users, Heart, Leaf, Target, Eye, MapPin, Star, Clock, Phone } from 'lucide-react';
import { CTA } from '../components/sections';
import { SEO } from '../components/common';
import { Button } from '../components/ui';

const values = [
  { icon: Heart, title: 'Passion', description: 'Dedicated to your wellness journey with love and care.' },
  { icon: Leaf, title: 'Natural', description: 'Premium organic products that are gentle on your skin.' },
  { icon: Users, title: 'Personal', description: 'Every treatment customized to your unique needs.' },
  { icon: Award, title: 'Excellence', description: 'Highest standards in service and hygiene.' },
];

const team = [
  { name: 'Expert Therapists', count: '15+', desc: 'Certified professionals' },
  { name: 'Years Experience', count: '5+', desc: 'In wellness industry' },
  { name: 'Happy Clients', count: '10K+', desc: 'In Jammu region' },
  { name: 'Treatments', count: '30+', desc: 'Premium services' },
];

const About = () => {
  return (
    <>
      <SEO 
        title="About Glowlogy Spa Jammu | Premium Wellness & Relaxation" 
        description="Learn about Glowlogy Spa in Jammu - your premier destination for wellness, massage therapy, and relaxation. Expert therapists, organic products, and personalized treatments at Gandhi Nagar, Channi Himmat & Kachi Chawni."
      />
      
      {/* Hero */}
      <section className="pt-6 sm:pt-8 pb-16 sm:pb-20 bg-gradient-to-br from-secondary to-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                <Star size={14} />
                Our Story
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4 sm:mb-6">
                Jammu's Premier Wellness Destination
              </h1>
              <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                Glowlogy was founded with a simple vision: to bring world-class spa and wellness 
                experiences to Jammu. We believe everyone deserves a sanctuary where they can 
                escape, rejuvenate, and reconnect with their inner peace.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Today, with 3 locations across Jammu, we continue to honor that vision while 
                constantly innovating to bring you the finest in spa and wellness experiences.
              </p>
              
              <div className="flex flex-wrap gap-3">
                <Button to="/book" icon={Clock}>
                  Book Appointment
                </Button>
                <Button href="tel:+919876543210" variant="outline" icon={Phone}>
                  Call Us
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl sm:rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-white/80 rounded-full flex items-center justify-center mb-4">
                    <Leaf className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
                  </div>
                  <p className="text-primary font-heading text-xl sm:text-2xl font-semibold">Glowlogy</p>
                  <p className="text-gray-600 text-sm">Spa & Wellness</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl">
                <div className="text-3xl sm:text-4xl font-bold text-primary">3</div>
                <div className="text-gray-600 text-sm sm:text-base">Locations in Jammu</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent border border-primary/10"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                <Target className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
              </div>
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-gray-900 mb-3 sm:mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                To provide transformative wellness experiences to the people of Jammu that nurture 
                the body, calm the mind, and uplift the spirit, making self-care accessible and 
                enjoyable for everyone in our community.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-accent/10 to-transparent border border-accent/20"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent/20 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                <Eye className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
              </div>
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-gray-900 mb-3 sm:mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                To be Jammu's most loved wellness destination, known for exceptional service, 
                innovation in treatments, and a genuine commitment to our guests' well-being, 
                expanding across Jammu & Kashmir.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 sm:py-16 md:py-20 bg-background-alt">
        <div className="container-custom">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-3 sm:mb-4">Our Core Values</h2>
            <p className="text-gray-600 text-base sm:text-lg">The principles that guide everything we do at Glowlogy Jammu</p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-primary/10 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4">
                  <value.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">{value.title}</h4>
                <p className="text-xs sm:text-sm text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 sm:py-16 bg-primary">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {team.map((stat, index) => (
              <motion.div
                key={stat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-1 sm:mb-2">{stat.count}</div>
                <div className="text-white font-medium text-sm sm:text-base">{stat.name}</div>
                <div className="text-white/60 text-xs sm:text-sm">{stat.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container-custom">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-3 sm:mb-4">Visit Us in Jammu</h2>
            <p className="text-gray-600 text-base sm:text-lg">Three convenient locations across the city</p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {[
              { name: 'Gandhi Nagar', address: 'Main Road, Gandhi Nagar, Jammu - 180004', featured: true },
              { name: 'Channi Himmat', address: 'Near Channi Himmat Crossing, Jammu - 180015', featured: true },
              { name: 'Kachi Chawni', address: 'Kachi Chawni Main Market, Jammu - 180001', featured: false },
            ].map((loc, index) => (
              <motion.div
                key={loc.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-xl sm:rounded-2xl p-5 sm:p-6 text-center ${loc.featured ? 'bg-primary/5 border border-primary/20' : 'bg-gray-50'}`}
              >
                <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3 ${loc.featured ? 'bg-primary/10' : 'bg-gray-200'}`}>
                  <MapPin className={`w-6 h-6 ${loc.featured ? 'text-primary' : 'text-gray-500'}`} />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{loc.name}</h4>
                <p className="text-xs sm:text-sm text-gray-500">{loc.address}</p>
                <Button to={`/book?location=jammu-${loc.name.toLowerCase().replace(' ', '-')}`} size="small" variant="outline" className="mt-4">
                  Book Here
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTA 
        title="Ready for a Wellness Experience?" 
        subtitle="Book your appointment today at any Glowlogy location in Jammu"
        primaryButton={{ text: "Book Appointment", to: "/book" }}
        secondaryButton={{ text: "Call Us", href: "tel:+919876543210" }}
      />
    </>
  );
};

export default About;

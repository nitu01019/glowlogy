/**
 * Careers Page
 */

import { motion } from 'framer-motion';
import { MapPin, Clock, Briefcase, ChevronRight, Heart, Users, TrendingUp, Award } from 'lucide-react';
import { Button } from '../components/ui';
import { CTA } from '../components/sections';
import { SEO } from '../components/common';

const benefits = [
  { icon: Heart, title: 'Health & Wellness', description: 'Complimentary spa services and health insurance' },
  { icon: TrendingUp, title: 'Growth', description: 'Career development and training programs' },
  { icon: Users, title: 'Team Culture', description: 'Supportive and inclusive work environment' },
  { icon: Award, title: 'Recognition', description: 'Performance bonuses and awards' },
];

const openings = [
  { id: 1, title: 'Senior Massage Therapist', location: 'Mumbai, Delhi', type: 'Full-time', department: 'Spa Services' },
  { id: 2, title: 'Spa Manager', location: 'Bangalore', type: 'Full-time', department: 'Management' },
  { id: 3, title: 'Esthetician', location: 'All Locations', type: 'Full-time', department: 'Spa Services' },
  { id: 4, title: 'Front Desk Executive', location: 'Delhi NCR', type: 'Full-time', department: 'Operations' },
  { id: 5, title: 'Digital Marketing Manager', location: 'Remote', type: 'Full-time', department: 'Marketing' },
];

const Careers = () => {
  return (
    <>
      <SEO title="Careers - Glowlogy" description="Join the Glowlogy team and build a career in wellness" />
      
      {/* Hero */}
      <section className="pt-8 pb-20 bg-gradient-to-br from-secondary to-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                We're Hiring
              </span>
              <h1 className="font-heading font-bold text-gray-900 mb-6">
                Build Your Career in Wellness
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Join a team that's passionate about making people feel their best. We're always looking for talented individuals who share our commitment to excellence.
              </p>
              <Button href="#openings" size="large">
                View Open Positions
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading font-bold text-gray-900 mb-4">Why Work With Us</h2>
            <p className="text-gray-600 text-lg">We take care of our team as well as we take care of our guests</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-background-alt rounded-2xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                  <benefit.icon className="w-7 h-7 text-primary" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{benefit.title}</h4>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="openings" className="section-padding bg-background-alt">
        <div className="container-custom">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading font-bold text-gray-900 mb-4">Open Positions</h2>
            <p className="text-gray-600 text-lg">Find your perfect role at Glowlogy</p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {openings.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-primary font-medium uppercase tracking-wide">{job.department}</span>
                    <h3 className="text-lg font-semibold text-gray-900 mt-1 group-hover:text-primary transition-colors">
                      {job.title}
                    </h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTA
        title="Don't See Your Role?"
        subtitle="Send us your resume and we'll reach out when a suitable position opens."
        primaryButton={{ text: "Send Resume", to: "/contact" }}
      />
    </>
  );
};

export default Careers;

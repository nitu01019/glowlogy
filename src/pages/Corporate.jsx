/**
 * Corporate Wellness Page
 */

import { motion } from 'framer-motion';
import { Building2, Users, Calendar, Award, Check, ArrowRight } from 'lucide-react';
import { Button, Input, TextArea } from '../components/ui';
import { SEO } from '../components/common';

const benefits = [
  'Customized wellness programs',
  'On-site spa services',
  'Discounted rates for employees',
  'Dedicated account manager',
  'Flexible scheduling',
  'Health & wellness workshops',
];

const stats = [
  { value: '100+', label: 'Corporate Clients' },
  { value: '50K+', label: 'Employees Served' },
  { value: '95%', label: 'Satisfaction Rate' },
];

const Corporate = () => {
  return (
    <>
      <SEO title="Corporate Wellness - Glowlogy" description="Corporate wellness programs for your organization" />
      
      {/* Hero */}
      <section className="pt-8 pb-20 bg-gradient-to-br from-secondary to-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                <Building2 size={16} />
                Corporate Wellness
              </span>
              <h1 className="font-heading font-bold text-gray-900 mb-6">
                Elevate Your Workplace Wellness
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Partner with Glowlogy to create a healthier, happier, and more productive workplace. Our corporate wellness programs are designed to meet your organization's unique needs.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-white rounded-xl px-6 py-4 shadow-sm">
                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>

              <Button href="#contact-form" size="large" icon={ArrowRight} iconPosition="right">
                Get Started
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <Building2 className="w-32 h-32 text-primary/30" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading font-bold text-gray-900 mb-6">
                Why Choose Glowlogy for Corporate Wellness?
              </h2>
              <p className="text-gray-600 mb-8">
                We understand that employee well-being directly impacts productivity and retention. Our corporate programs are designed to deliver measurable results.
              </p>
              
              <ul className="space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { icon: Users, title: 'Team Sessions', desc: 'Group wellness activities' },
                { icon: Calendar, title: 'Flexible Plans', desc: 'Monthly or annual options' },
                { icon: Building2, title: 'On-Site Service', desc: 'We come to you' },
                { icon: Award, title: 'Certified Team', desc: 'Expert therapists' },
              ].map((item, index) => (
                <div key={item.title} className="bg-background-alt rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 mx-auto bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="section-padding bg-background-alt">
        <div className="container-custom max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-heading font-bold text-gray-900 mb-4">Let's Discuss Your Needs</h2>
            <p className="text-gray-600">Fill out the form below and our corporate team will get in touch within 24 hours.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl p-8 shadow-lg"
          >
            <form className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <Input label="Your Name" placeholder="John Doe" required />
                <Input label="Company Name" placeholder="Acme Inc." required />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <Input label="Email" type="email" placeholder="john@company.com" required />
                <Input label="Phone" type="tel" placeholder="+91 98765 43210" />
              </div>
              <Input label="Number of Employees" type="number" placeholder="e.g., 500" />
              <TextArea label="Tell us about your requirements" placeholder="What kind of wellness programs are you looking for?" rows={4} />
              <Button type="submit" fullWidth size="large">
                Submit Inquiry
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Corporate;

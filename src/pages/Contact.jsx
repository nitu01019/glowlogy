/**
 * Contact Page
 * Connected to Firebase for storing contact form submissions
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Button, Input, TextArea } from '../components/ui';
import { SEO } from '../components/common';
import { submitContactForm } from '../services/contactService';

const contactInfo = [
  { icon: Phone, label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210' },
  { icon: Mail, label: 'Email', value: 'hello@glowlogy.com', href: 'mailto:hello@glowlogy.com' },
  { icon: MapPin, label: 'Address', value: 'Gandhi Nagar, Jammu, J&K - 180004' },
  { icon: Clock, label: 'Hours', value: 'Mon-Sun: 9AM - 8PM' },
];

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      await submitContactForm(formState);
      setIsSubmitted(true);
      setFormState({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setError(err.message || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO title="Contact Us - Glowlogy" description="Get in touch with Glowlogy for bookings and inquiries" />
      
      <section className="section-padding bg-gradient-to-br from-secondary to-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="font-heading font-bold text-gray-900 mb-4">Get in Touch</h1>
              <p className="text-lg text-gray-600 mb-8">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">{item.label}</div>
                      {item.href ? (
                        <a href={item.href} className="text-gray-900 font-medium hover:text-primary transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <div className="text-gray-900 font-medium">{item.value}</div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Map Placeholder */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-8 h-64 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center"
              >
                <MapPin className="w-12 h-12 text-primary/30" />
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2">Message Sent!</h3>
                    <p className="text-gray-600 mb-6">We'll get back to you within 24 hours.</p>
                    <Button onClick={() => setIsSubmitted(false)} variant="outline">
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <>
                    <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">Send us a Message</h2>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700"
                      >
                        <AlertCircle size={20} />
                        <span>{error}</span>
                      </motion.div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <Input
                        label="Your Name"
                        placeholder="John Doe"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        required
                      />
                      <div className="grid sm:grid-cols-2 gap-5">
                        <Input
                          label="Email"
                          type="email"
                          placeholder="john@example.com"
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          required
                        />
                        <Input
                          label="Phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formState.phone}
                          onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        />
                      </div>
                      <TextArea
                        label="Message"
                        placeholder="How can we help you?"
                        rows={5}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        required
                      />
                      <Button type="submit" fullWidth loading={isSubmitting} icon={Send}>
                        Send Message
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;

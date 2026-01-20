/**
 * Membership Page
 * Premium membership plans for Glowlogy Spa Jammu
 * With skeleton loading and Firebase integration
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Crown, Sparkles, MapPin, Phone, AlertCircle, CheckCircle } from 'lucide-react';
import { Button, Input } from '../components/ui';
import { CTA } from '../components/sections';
import { SEO } from '../components/common';
import { useAuth } from '../context/AuthContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

const plans = [
  {
    name: 'Essential',
    price: 2999,
    period: 'month',
    description: 'Perfect for occasional pampering',
    icon: Sparkles,
    color: 'primary',
    features: [
      '2 spa sessions per month',
      '10% off all services',
      'Priority booking',
      'Birthday special offer',
      'Valid at all Jammu locations',
    ],
    popular: false,
  },
  {
    name: 'Premium',
    price: 5999,
    period: 'month',
    description: 'Our most popular choice',
    icon: Star,
    color: 'gold',
    features: [
      '4 spa sessions per month',
      '20% off all services',
      'Priority booking',
      'Free upgrades (when available)',
      'Guest passes (2/month)',
      'Exclusive member events',
      'Valid at all Jammu locations',
    ],
    popular: true,
  },
  {
    name: 'Elite',
    price: 9999,
    period: 'month',
    description: 'Ultimate wellness experience',
    icon: Crown,
    color: 'accent',
    features: [
      'Unlimited spa sessions',
      '30% off all services',
      'VIP priority booking',
      'Complimentary upgrades',
      'Unlimited guest passes',
      'Personal wellness consultant',
      'Home service option in Jammu',
      'Exclusive retreat access',
    ],
    popular: false,
  },
];

const benefits = [
  { title: 'Save More', desc: 'Up to 30% off on all services', icon: '💰' },
  { title: 'Priority Access', desc: 'Book your slots before anyone else', icon: '⚡' },
  { title: 'Exclusive Events', desc: 'Member-only wellness workshops', icon: '🎉' },
  { title: 'Flexibility', desc: 'Pause or cancel anytime', icon: '🔄' },
];

// Skeleton component for loading state
const MembershipSkeleton = () => (
  <div className="animate-pulse">
    {/* Hero Skeleton */}
    <section className="pt-8 pb-20 bg-gradient-to-br from-secondary to-background">
      <div className="container-custom text-center">
        <div className="max-w-2xl mx-auto">
          <div className="h-8 w-48 bg-gray-200 rounded-full mx-auto mb-6"></div>
          <div className="h-12 w-3/4 bg-gray-200 rounded-lg mx-auto mb-4"></div>
          <div className="h-6 w-2/3 bg-gray-200 rounded-lg mx-auto"></div>
        </div>
      </div>
    </section>

    {/* Plans Skeleton */}
    <section className="section-padding bg-white -mt-10">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-3xl p-8 bg-gray-100">
              <div className="w-14 h-14 bg-gray-200 rounded-2xl mb-6"></div>
              <div className="h-8 w-24 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-32 bg-gray-200 rounded mb-6"></div>
              <div className="h-10 w-28 bg-gray-200 rounded mb-6"></div>
              <div className="space-y-3 mb-8">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="h-4 w-full bg-gray-200 rounded"></div>
                ))}
              </div>
              <div className="h-12 w-full bg-gray-200 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

const Membership = () => {
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // No artificial loading - page renders immediately
  useEffect(() => {
    setLoading(false);
  }, []);

  // Pre-fill user data
  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData(prev => ({
        ...prev,
        name: prev.name || user.displayName || '',
        email: prev.email || user.email || '',
      }));
    }
  }, [isAuthenticated, user]);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setShowModal(true);
    setError('');
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.name || !formData.email || !formData.phone) {
      setError('Please fill in all fields');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email');
      return;
    }

    if (!/^[+]?[\d\s-]{10,}$/.test(formData.phone)) {
      setError('Please enter a valid phone number');
      return;
    }

    setSubmitting(true);
    
    try {
      await addDoc(collection(db, 'membership_inquiries'), {
        planName: selectedPlan.name,
        planPrice: selectedPlan.price,
        customerName: formData.name,
        email: formData.email,
        phone: formData.phone,
        userId: user?.uid || null,
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '' });
    } catch (err) {
      console.error('Error submitting membership inquiry:', err);
      setError('Failed to submit. Please try again or call us.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <>
        <SEO 
          title="Membership Plans - Glowlogy Spa Jammu" 
          description="Join Glowlogy Spa membership in Jammu. Get exclusive discounts up to 30%, priority booking, and unlimited spa sessions. Plans starting ₹2,999/month."
        />
        <MembershipSkeleton />
      </>
    );
  }

  return (
    <>
      <SEO 
        title="Membership Plans - Glowlogy Spa Jammu | Save up to 30%" 
        description="Join Glowlogy Spa membership in Jammu. Get exclusive discounts up to 30%, priority booking, unlimited spa sessions at Gandhi Nagar, Channi Himmat & Kachi Chawni. Plans starting ₹2,999/month."
      />
      
      {/* Hero */}
      <section className="pt-6 sm:pt-8 pb-16 sm:pb-20 bg-gradient-to-br from-secondary to-background">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gold/20 text-primary rounded-full text-sm font-medium mb-4 sm:mb-6">
              <Crown size={16} />
              Exclusive Membership
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4 sm:mb-6">
              Elevate Your Wellness Journey
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mb-4">
              Join our membership program and enjoy exclusive benefits, priority bookings, and significant savings on all services.
            </p>
            <p className="flex items-center justify-center gap-2 text-sm text-primary font-medium">
              <MapPin size={16} />
              Available at all Glowlogy locations in Jammu
            </p>
          </motion.div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-8 sm:py-12 md:py-16 bg-white -mt-8 sm:-mt-10">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-2xl sm:rounded-3xl p-6 sm:p-8 ${
                  plan.popular
                    ? 'bg-primary text-white shadow-2xl sm:scale-105 z-10'
                    : 'bg-white border border-gray-100 shadow-lg'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 px-3 sm:px-4 py-1 bg-gold text-white text-xs sm:text-sm font-medium rounded-full whitespace-nowrap">
                    Most Popular
                  </div>
                )}

                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 ${
                  plan.popular ? 'bg-white/20' : 'bg-primary/10'
                }`}>
                  <plan.icon className={`w-6 h-6 sm:w-7 sm:h-7 ${plan.popular ? 'text-white' : 'text-primary'}`} />
                </div>

                <h3 className={`text-xl sm:text-2xl font-heading font-bold mb-1 sm:mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                <p className={`text-xs sm:text-sm mb-4 sm:mb-6 ${plan.popular ? 'text-white/80' : 'text-gray-500'}`}>
                  {plan.description}
                </p>

                <div className="mb-4 sm:mb-6">
                  <span className={`text-3xl sm:text-4xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                    ₹{plan.price.toLocaleString()}
                  </span>
                  <span className={`text-sm ${plan.popular ? 'text-white/70' : 'text-gray-500'}`}>/{plan.period}</span>
                </div>

                <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 sm:gap-3">
                      <Check className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5 ${plan.popular ? 'text-white' : 'text-primary'}`} />
                      <span className={`text-sm ${plan.popular ? 'text-white/90' : 'text-gray-600'}`}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handlePlanSelect(plan)}
                  fullWidth
                  variant={plan.popular ? 'white' : 'primary'}
                >
                  Get Started
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 sm:py-16 md:py-20 bg-background-alt">
        <div className="container-custom">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-3 sm:mb-4">Why Become a Member?</h2>
            <p className="text-gray-600 text-base sm:text-lg">Unlock a world of wellness benefits in Jammu</p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-2xl sm:text-3xl mb-2 sm:mb-3 block">{benefit.icon}</span>
                <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">{benefit.title}</h4>
                <p className="text-xs sm:text-sm text-gray-500">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container-custom">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 mb-3">Use Your Membership At</h2>
            <p className="text-gray-600">All our locations in Jammu</p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              { name: 'Gandhi Nagar', address: 'Main Road, Gandhi Nagar' },
              { name: 'Channi Himmat', address: 'Near Channi Himmat Crossing' },
              { name: 'Kachi Chawni', address: 'Kachi Chawni Main Market' },
            ].map((loc, index) => (
              <motion.div
                key={loc.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-4 text-center"
              >
                <MapPin className="w-6 h-6 text-primary mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900">{loc.name}</h4>
                <p className="text-xs text-gray-500">{loc.address}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTA 
        title="Ready to Join?" 
        subtitle="Start your membership today and save on every visit to Glowlogy Jammu"
        primaryButton={{ text: "Call Us Now", href: "tel:+919876543210" }}
        secondaryButton={{ text: "WhatsApp", href: "https://wa.me/919876543210?text=Hi! I'm interested in Glowlogy membership." }}
      />

      {/* Membership Inquiry Modal */}
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => !submitting && setShowModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {success ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">Thank You!</h3>
                <p className="text-gray-600 mb-4">
                  We've received your {selectedPlan?.name} membership inquiry. Our team will contact you within 24 hours.
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  Or call us directly at <a href="tel:+919876543210" className="text-primary font-medium">+91 98765 43210</a>
                </p>
                <Button onClick={() => setShowModal(false)} fullWidth>Close</Button>
              </div>
            ) : (
              <>
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-gray-900 mb-2">
                  {selectedPlan?.name} Membership
                </h3>
                <p className="text-primary font-semibold mb-4">
                  ₹{selectedPlan?.price.toLocaleString()}/month
                </p>

                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700 text-sm">
                    <AlertCircle size={16} />
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    label="Full Name"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                  <Input
                    label="Email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                  <Input
                    label="Phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />

                  <div className="flex gap-3 pt-2">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setShowModal(false)}
                      disabled={submitting}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button type="submit" loading={submitting} disabled={submitting} className="flex-1">
                      {submitting ? 'Submitting...' : 'Submit'}
                    </Button>
                  </div>
                </form>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Our team will contact you to complete your membership activation
                </p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Membership;

/**
 * FAQ Page
 * Frequently Asked Questions - Glowlogy Spa Jammu
 * With proper SEO and responsive design
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, Phone, Mail, MessageCircle, MapPin } from 'lucide-react';
import { Button } from '../components/ui';
import { SEO } from '../components/common';

const faqs = [
  { 
    category: 'Booking', 
    question: 'How do I book an appointment at Glowlogy Jammu?', 
    answer: 'You can book an appointment through our website, by calling any of our Jammu locations (Gandhi Nagar, Channi Himmat, or Kachi Chawni), or via WhatsApp. We recommend booking at least 24 hours in advance for your preferred time slot.' 
  },
  { 
    category: 'Booking', 
    question: 'Can I cancel or reschedule my appointment?', 
    answer: 'Yes, you can cancel or reschedule up to 4 hours before your appointment time without any charges. Cancellations within 4 hours may incur a 50% charge. You can manage bookings through your dashboard or call us directly.' 
  },
  { 
    category: 'Booking', 
    question: 'What are your operating hours in Jammu?', 
    answer: 'All our Jammu locations are open from 9:00 AM to 8:00 PM, seven days a week. We recommend booking in advance, especially on weekends.' 
  },
  { 
    category: 'Services', 
    question: 'What should I wear to my spa appointment?', 
    answer: 'We provide comfortable robes and disposable undergarments at all our Jammu locations. You can wear whatever you\'re comfortable in, as our therapists are trained to ensure your privacy and comfort throughout your session.' 
  },
  { 
    category: 'Services', 
    question: 'Are your products natural and organic?', 
    answer: 'Yes, we use premium organic and natural products that are free from harmful chemicals. All our products are dermatologically tested and suitable for sensitive skin. We source high-quality products for the best results.' 
  },
  { 
    category: 'Services', 
    question: 'Do you offer couples massage in Jammu?', 
    answer: 'Yes! We offer couples massage at all our Jammu locations. It\'s a wonderful experience to share with your partner. We recommend booking in advance as couples slots fill up quickly, especially on weekends.' 
  },
  { 
    category: 'Services', 
    question: 'Can I request a specific therapist?', 
    answer: 'Absolutely! You can request your preferred therapist when booking. If they\'re available, we\'ll assign them to your session. You can also specify your preference for a male or female therapist.' 
  },
  { 
    category: 'Membership', 
    question: 'How does the Glowlogy membership work?', 
    answer: 'Our membership plans offer monthly spa sessions along with discounts on all services. Choose from Essential (₹2,999/month), Premium (₹5,999/month), or Elite (₹9,999/month) plans. Memberships are valid at all our Jammu locations.' 
  },
  { 
    category: 'Membership', 
    question: 'Can I use my membership at any Jammu location?', 
    answer: 'Yes! Your Glowlogy membership is valid at all three of our Jammu locations - Gandhi Nagar, Channi Himmat, and Kachi Chawni. Enjoy the flexibility to book at whichever location is most convenient for you.' 
  },
  { 
    category: 'Membership', 
    question: 'Can I freeze or pause my membership?', 
    answer: 'Yes, Premium and Elite members can freeze their membership for up to 2 months per year. Contact our team at least 7 days before your next billing date to arrange this.' 
  },
  { 
    category: 'Payment', 
    question: 'What payment methods do you accept?', 
    answer: 'We accept cash, all major credit/debit cards, UPI (GPay, PhonePe, Paytm), and digital wallets. For memberships, we also offer EMI options on select banks.' 
  },
  { 
    category: 'Payment', 
    question: 'Do you offer gift cards?', 
    answer: 'Yes! Our gift cards are available in various denominations starting from ₹1,000. They can be purchased online or at any Jammu location and are valid for 1 year from purchase. Perfect for gifting to loved ones!' 
  },
  { 
    category: 'Locations', 
    question: 'Where are Glowlogy spas located in Jammu?', 
    answer: 'We have three locations in Jammu: 1) Gandhi Nagar - Main Road, 2) Channi Himmat - Near Channi Himmat Crossing, 3) Kachi Chawni - Main Market. All locations offer our full range of services.' 
  },
  { 
    category: 'Locations', 
    question: 'Is parking available at your locations?', 
    answer: 'Yes, all our Jammu locations have parking facilities nearby. Gandhi Nagar and Channi Himmat have dedicated parking, while Kachi Chawni has street parking available.' 
  },
];

const categories = ['All', 'Booking', 'Services', 'Membership', 'Payment', 'Locations'];

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <SEO 
        title="FAQ - Glowlogy Spa Jammu | Frequently Asked Questions" 
        description="Find answers to common questions about Glowlogy Spa services in Jammu. Learn about booking, services, membership plans, payment options, and our locations at Gandhi Nagar, Channi Himmat & Kachi Chawni."
      />
      
      {/* Hero */}
      <section className="pt-6 sm:pt-8 pb-12 sm:pb-16 bg-gradient-to-br from-secondary to-background">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-3 sm:mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
              Find answers to common questions about Glowlogy Spa Jammu
            </p>
            
            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-xl sm:rounded-2xl border border-gray-200 focus:outline-none focus:border-primary shadow-sm text-sm sm:text-base"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-4 sm:py-6 bg-white border-b sticky top-16 sm:top-20 z-30">
        <div className="container-custom">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
                className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                  activeCategory === cat
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-8 sm:py-12 md:py-16 bg-background-alt">
        <div className="container-custom max-w-3xl">
          <div className="space-y-3 sm:space-y-4">
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left"
                >
                  <div className="flex-1 pr-4">
                    <span className="text-[10px] sm:text-xs text-primary font-medium uppercase tracking-wide">{faq.category}</span>
                    <h3 className="text-gray-900 font-medium mt-1 text-sm sm:text-base">{faq.question}</h3>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ${openIndex === index ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-4 sm:px-6 pb-4 sm:pb-5 text-gray-600 border-t pt-3 sm:pt-4 text-sm sm:text-base">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No questions found matching your search.</p>
              <button 
                onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                className="text-primary font-medium mt-2 hover:underline"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-gray-900 mb-3 sm:mb-4">Still Have Questions?</h2>
            <p className="text-gray-600 mb-6 sm:mb-8">Our team in Jammu is here to help you</p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button href="tel:+919876543210" variant="outline" icon={Phone}>
                Call Us
              </Button>
              <Button href="https://wa.me/919876543210?text=Hi! I have a question about Glowlogy Spa." variant="outline" icon={MessageCircle}>
                WhatsApp
              </Button>
              <Button to="/contact" icon={Mail}>
                Send Message
              </Button>
            </div>

            {/* Locations quick links */}
            <div className="mt-8 pt-8 border-t">
              <p className="text-sm text-gray-500 mb-4">Or visit us at any of our Jammu locations</p>
              <div className="flex flex-wrap justify-center gap-3">
                {['Gandhi Nagar', 'Channi Himmat', 'Kachi Chawni'].map((loc) => (
                  <a 
                    key={loc}
                    href={`/locations`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-600 hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <MapPin size={14} />
                    {loc}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQ;

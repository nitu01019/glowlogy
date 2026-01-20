/**
 * Gift Cards Page
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Heart, Check } from 'lucide-react';
import { Button, Input, TextArea } from '../components/ui';
import { SEO } from '../components/common';

const amounts = [1000, 2000, 3000, 5000, 10000];

const GiftCards = () => {
  const [selectedAmount, setSelectedAmount] = useState(2000);
  const [customAmount, setCustomAmount] = useState('');
  const [formData, setFormData] = useState({ recipientName: '', recipientEmail: '', senderName: '', message: '' });

  const finalAmount = customAmount ? parseInt(customAmount) : selectedAmount;

  return (
    <>
      <SEO title="Gift Cards - Glowlogy" description="Give the gift of wellness with Glowlogy gift cards" />
      
      {/* Hero */}
      <section className="pt-8 pb-16 bg-gradient-to-br from-secondary to-background">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <Gift className="w-10 h-10 text-primary" />
            </div>
            <h1 className="font-heading font-bold text-gray-900 mb-4">Gift the Joy of Wellness</h1>
            <p className="text-lg text-gray-600">
              Share the Glowlogy experience with someone special. Our gift cards are the perfect present for any occasion.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gift Card Builder */}
      <section className="section-padding bg-white -mt-8">
        <div className="container-custom max-w-4xl">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Preview */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="sticky top-28">
                <div className="bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-8 text-white shadow-2xl aspect-[3/2] flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-white/60 text-sm">Gift Card</span>
                      <h3 className="text-3xl font-heading font-bold">Glowlogy</h3>
                    </div>
                    <Gift className="w-10 h-10 text-white/30" />
                  </div>
                  <div>
                    <div className="text-4xl font-bold mb-2">₹{finalAmount.toLocaleString()}</div>
                    {formData.recipientName && (
                      <p className="text-white/80">For: {formData.recipientName}</p>
                    )}
                  </div>
                </div>
                
                <div className="mt-6 bg-gray-50 rounded-2xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">What's Included</h4>
                  <ul className="space-y-3">
                    {['Valid at all locations', 'Never expires', 'Use for any service', 'Instant email delivery'].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-gray-600">
                        <Check className="w-5 h-5 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">Create Your Gift Card</h2>

                {/* Amount Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Select Amount</label>
                  <div className="grid grid-cols-3 gap-3">
                    {amounts.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => { setSelectedAmount(amount); setCustomAmount(''); }}
                        className={`py-3 rounded-xl font-medium transition-all ${
                          selectedAmount === amount && !customAmount
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        ₹{amount.toLocaleString()}
                      </button>
                    ))}
                  </div>
                  <div className="mt-3">
                    <Input
                      placeholder="Or enter custom amount"
                      type="number"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                    />
                  </div>
                </div>

                {/* Recipient Details */}
                <div className="space-y-5">
                  <Input
                    label="Recipient's Name"
                    placeholder="John Doe"
                    value={formData.recipientName}
                    onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                  />
                  <Input
                    label="Recipient's Email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.recipientEmail}
                    onChange={(e) => setFormData({ ...formData, recipientEmail: e.target.value })}
                  />
                  <Input
                    label="Your Name"
                    placeholder="Your name"
                    value={formData.senderName}
                    onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                  />
                  <TextArea
                    label="Personal Message (Optional)"
                    placeholder="Write a special message..."
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <div className="mt-8 pt-6 border-t">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">Total</span>
                    <span className="text-2xl font-bold text-primary">₹{finalAmount.toLocaleString()}</span>
                  </div>
                  <Button fullWidth size="large" icon={Heart}>
                    Purchase Gift Card
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GiftCards;

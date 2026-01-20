/**
 * Callback Modal Component
 * Beautiful animated modal for requesting callbacks
 * Connected to Firebase for data persistence
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, User, Clock, MessageSquare, CheckCircle, Loader2, Sparkles } from 'lucide-react';
import { submitCallbackRequest, getPreferredTimeOptions, getServiceOptions } from '../../services/callbackService';

// Animation variants
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.9,
    y: 20 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 300,
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.9,
    y: 20,
    transition: { duration: 0.2 }
  }
};

const inputVariants = {
  focus: { scale: 1.02, boxShadow: '0 0 0 3px rgba(139, 90, 43, 0.1)' },
};

export const CallbackModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    preferredTime: 'anytime',
    service: 'general',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const timeOptions = getPreferredTimeOptions();
  const serviceOptions = getServiceOptions();

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setFormData({
          name: '',
          phone: '',
          preferredTime: 'anytime',
          service: 'general',
          message: '',
        });
        setSuccess(false);
        setError('');
      }, 300);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await submitCallbackRequest(formData);
      setSuccess(true);
      
      // Auto close after success
      setTimeout(() => {
        onClose();
      }, 2500);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-primary to-primary-dark px-6 py-5">
              <motion.div
                className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              <div className="relative flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-heading font-bold text-white flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    Request a Callback
                  </h3>
                  <p className="text-white/80 text-sm mt-1">We'll call you back within 30 minutes</p>
                </div>
                
                <motion.button
                  onClick={onClose}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5 text-white" />
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    key="success"
                    className="text-center py-8"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <motion.div
                      className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', damping: 15 }}
                    >
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </motion.div>
                    <h4 className="text-xl font-heading font-bold text-gray-900 mb-2">
                      Request Submitted!
                    </h4>
                    <p className="text-gray-600">
                      Our team will call you back shortly.
                    </p>
                    <motion.div
                      className="mt-4 flex items-center justify-center gap-2 text-primary"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Sparkles className="w-4 h-4" />
                      <span className="text-sm">Thank you for choosing Glowlogy</span>
                      <Sparkles className="w-4 h-4" />
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Name Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Your Name *
                      </label>
                      <motion.div className="relative" whileFocus="focus" variants={inputVariants}>
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your name"
                          required
                          className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                      </motion.div>
                    </div>

                    {/* Phone Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Phone Number *
                      </label>
                      <motion.div className="relative" whileFocus="focus" variants={inputVariants}>
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          required
                          className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                      </motion.div>
                    </div>

                    {/* Two columns for time and service */}
                    <div className="grid grid-cols-2 gap-3">
                      {/* Preferred Time */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Preferred Time
                        </label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                          <select
                            name="preferredTime"
                            value={formData.preferredTime}
                            onChange={handleChange}
                            className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none bg-white text-sm"
                          >
                            {timeOptions.map(opt => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Service Interest */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Interested In
                        </label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full px-3 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none bg-white text-sm"
                        >
                          {serviceOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message (Optional) */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Message <span className="text-gray-400">(Optional)</span>
                      </label>
                      <motion.div className="relative" whileFocus="focus" variants={inputVariants}>
                        <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Any specific requirements..."
                          rows={3}
                          className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                        />
                      </motion.div>
                    </div>

                    {/* Error Message */}
                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm"
                        >
                          {error}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 bg-primary text-white font-semibold rounded-xl shadow-lg shadow-primary/25 hover:bg-primary-dark transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      whileHover={{ scale: loading ? 1 : 1.02 }}
                      whileTap={{ scale: loading ? 1 : 0.98 }}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Phone className="w-5 h-5" />
                          Request Callback
                        </>
                      )}
                    </motion.button>

                    {/* Privacy note */}
                    <p className="text-xs text-gray-500 text-center">
                      By submitting, you agree to our{' '}
                      <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CallbackModal;

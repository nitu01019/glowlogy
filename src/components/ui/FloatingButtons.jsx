/**
 * Floating Action Buttons
 * Animation only on FIRST visit - stays static on page changes
 * Properly centered modal on all devices
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, FileText, X, Folder } from 'lucide-react';
import { db } from '../../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const PHONE_NUMBER = '+919876543210';
const WHATSAPP_MESSAGE = 'Hi! I would like to book an appointment at Glowlogy Spa.';

// Session storage key to track if animation already played
const ANIMATION_PLAYED_KEY = 'glowlogy_fab_animation_played';

// Glass shatter pieces
const GlassShatter = () => {
  const shards = [
    { x: 0, y: -35, rotate: 45, size: 'w-3 h-4', delay: 0 },
    { x: 0, y: 35, rotate: -30, size: 'w-4 h-3', delay: 0.02 },
    { x: -30, y: 0, rotate: 60, size: 'w-3 h-5', delay: 0.04 },
    { x: 30, y: 0, rotate: -45, size: 'w-4 h-3', delay: 0.06 },
    { x: -25, y: -25, rotate: 30, size: 'w-3 h-3', delay: 0.08 },
    { x: 25, y: -25, rotate: -60, size: 'w-4 h-2', delay: 0.1 },
    { x: -25, y: 25, rotate: 75, size: 'w-2 h-4', delay: 0.12 },
    { x: 25, y: 25, rotate: -15, size: 'w-3 h-3', delay: 0.14 },
    { x: -40, y: -15, rotate: 20, size: 'w-2 h-3', delay: 0.05 },
    { x: 40, y: -15, rotate: -40, size: 'w-3 h-2', delay: 0.07 },
    { x: -40, y: 15, rotate: 50, size: 'w-2 h-3', delay: 0.09 },
    { x: 40, y: 15, rotate: -70, size: 'w-2 h-2', delay: 0.11 },
    { x: -15, y: -40, rotate: 10, size: 'w-2 h-2', delay: 0.03 },
    { x: 15, y: -40, rotate: -20, size: 'w-2 h-2', delay: 0.06 },
    { x: -15, y: 40, rotate: 80, size: 'w-2 h-2', delay: 0.09 },
    { x: 15, y: 40, rotate: -80, size: 'w-2 h-2', delay: 0.12 },
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {shards.map((shard, i) => (
        <motion.div
          key={i}
          className={`absolute ${shard.size} bg-gradient-to-br from-primary via-primary-dark to-amber-600 rounded-sm shadow-lg`}
          initial={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }}
          animate={{ 
            x: shard.x * 1.5,
            y: shard.y * 1.5,
            rotate: shard.rotate + (Math.random() > 0.5 ? 180 : -180),
            scale: 0,
            opacity: 0
          }}
          transition={{ duration: 0.7, delay: shard.delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      ))}
      <motion.div
        className="absolute w-16 h-16 rounded-full bg-white"
        initial={{ scale: 0.5, opacity: 0.8 }}
        animate={{ scale: 2, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
    </div>
  );
};

export const FloatingButtons = () => {
  // Check if animation already played this session
  const [animationPlayed, setAnimationPlayed] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(ANIMATION_PLAYED_KEY) === 'true';
    }
    return false;
  });
  
  const [phase, setPhase] = useState(animationPlayed ? 4 : 0);
  const [showCallbackModal, setShowCallbackModal] = useState(false);
  const [callbackForm, setCallbackForm] = useState({ name: '', phone: '' });
  const [submitStatus, setSubmitStatus] = useState('');
  const [hasShownModal, setHasShownModal] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('glowlogy_modal_shown') === 'true';
    }
    return false;
  });
  
  const whatsappUrl = `https://wa.me/${PHONE_NUMBER.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  const callUrl = `tel:${PHONE_NUMBER}`;

  // Animation sequence - ONLY if not played before
  useEffect(() => {
    if (animationPlayed) return;

    const t1 = setTimeout(() => setPhase(1), 500);
    const t2 = setTimeout(() => setPhase(2), 1200);
    const t3 = setTimeout(() => setPhase(3), 2500);
    const t4 = setTimeout(() => {
      setPhase(4);
      sessionStorage.setItem(ANIMATION_PLAYED_KEY, 'true');
      setAnimationPlayed(true);
    }, 3400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [animationPlayed]);

  // Auto show callback modal after 5 seconds - ONLY ONCE per session
  // After shown once (submitted or cancelled), never show again
  useEffect(() => {
    if (!hasShownModal && phase === 4) {
      const modalTimer = setTimeout(() => {
        setShowCallbackModal(true);
      }, 5000);
      return () => clearTimeout(modalTimer);
    }
  }, [hasShownModal, phase]);
  
  // Mark modal as shown when it closes (submit or cancel)
  const closeModal = () => {
    setShowCallbackModal(false);
    setHasShownModal(true);
    sessionStorage.setItem('glowlogy_modal_shown', 'true');
  };

  // Handle callback submission to Firebase
  const handleCallbackSubmit = async (e) => {
    e.preventDefault();
    if (!callbackForm.name || !callbackForm.phone) return;
    
    setSubmitStatus('sending');
    try {
      await addDoc(collection(db, 'callbackRequests'), {
        name: callbackForm.name,
        phone: callbackForm.phone,
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      setSubmitStatus('success');
      setCallbackForm({ name: '', phone: '' });
      setTimeout(() => {
        closeModal();
        setSubmitStatus('');
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(''), 3000);
    }
  };

  return (
    <>
      {/* Animation phases - only show if not played */}
      {!animationPlayed && (
        <div className="fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-[9999]">
          {/* FOLDER - Phase 1 & 2 */}
          <AnimatePresence>
            {(phase === 1 || phase === 2) && (
              <motion.div
                className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center shadow-xl"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: phase === 2 ? [1, 1.1, 1] : 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Folder className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* GLASS SHATTER - Phase 3 */}
          <AnimatePresence>
            {phase === 3 && (
              <motion.div 
                className="w-12 h-12 sm:w-14 sm:h-14 relative"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <GlassShatter />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ICONS popping out - Phase 2 & 3 */}
          <AnimatePresence>
            {(phase === 2 || phase === 3) && (
              <>
                <motion.div
                  className="absolute w-10 h-10 sm:w-11 sm:h-11 bg-[#25D366] rounded-full shadow-lg flex items-center justify-center"
                  style={{ right: 4, bottom: 4 }}
                  initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                  animate={{ scale: 1, opacity: 1, x: -5, y: -55 }}
                  transition={{ duration: 0.4, type: 'spring', stiffness: 200, damping: 15, delay: 0 }}
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </motion.div>

                <motion.div
                  className="absolute w-10 h-10 sm:w-11 sm:h-11 bg-blue-500 rounded-full shadow-lg flex items-center justify-center"
                  style={{ right: 4, bottom: 4 }}
                  initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                  animate={{ scale: 1, opacity: 1, x: -50, y: -5 }}
                  transition={{ duration: 0.4, type: 'spring', stiffness: 200, damping: 15, delay: 0.15 }}
                >
                  <Phone className="w-5 h-5 text-white" />
                </motion.div>

                <motion.div
                  className="absolute w-10 h-10 sm:w-11 sm:h-11 bg-rose-500 rounded-full shadow-lg flex items-center justify-center"
                  style={{ right: 4, bottom: 4 }}
                  initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                  animate={{ scale: 1, opacity: 1, x: -50, y: -55 }}
                  transition={{ duration: 0.4, type: 'spring', stiffness: 200, damping: 15, delay: 0.3 }}
                >
                  <FileText className="w-5 h-5 text-white" />
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* STATIC ICONS - Phase 4 (always visible after animation or if already played) */}
      {(phase === 4 || animationPlayed) && (
        <>
          {/* WhatsApp */}
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed w-11 h-11 sm:w-12 sm:h-12 bg-primary rounded-l-xl shadow-lg flex items-center justify-center cursor-pointer z-[9998]"
            style={{ right: 0, bottom: 170 }}
            initial={animationPlayed ? { opacity: 1 } : { right: 20, bottom: 60, borderRadius: '50%' }}
            animate={{ right: 0, bottom: 170, borderRadius: '12px 0 0 12px', opacity: 1 }}
            transition={{ duration: animationPlayed ? 0 : 0.5, type: 'spring', stiffness: 150, damping: 15 }}
            whileHover={{ x: -5, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-current">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </motion.a>

          {/* Phone */}
          <motion.a
            href={callUrl}
            className="fixed w-11 h-11 sm:w-12 sm:h-12 bg-primary rounded-l-xl shadow-lg flex items-center justify-center cursor-pointer z-[9998]"
            style={{ right: 0, bottom: 115 }}
            initial={animationPlayed ? { opacity: 1 } : { right: 55, bottom: 10, borderRadius: '50%' }}
            animate={{ right: 0, bottom: 115, borderRadius: '12px 0 0 12px', opacity: 1 }}
            transition={{ duration: animationPlayed ? 0 : 0.5, type: 'spring', stiffness: 150, damping: 15, delay: animationPlayed ? 0 : 0.1 }}
            whileHover={{ x: -5, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </motion.a>

          {/* Callback */}
          <motion.button
            onClick={() => setShowCallbackModal(true)}
            className="fixed w-11 h-11 sm:w-12 sm:h-12 bg-primary rounded-l-xl shadow-lg flex items-center justify-center cursor-pointer z-[9998]"
            style={{ right: 0, bottom: 60 }}
            initial={animationPlayed ? { opacity: 1 } : { right: 55, bottom: 60, borderRadius: '50%' }}
            animate={{ right: 0, bottom: 60, borderRadius: '12px 0 0 12px', opacity: 1 }}
            transition={{ duration: animationPlayed ? 0 : 0.5, type: 'spring', stiffness: 150, damping: 15, delay: animationPlayed ? 0 : 0.2 }}
            whileHover={{ x: -5, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </motion.button>
        </>
      )}

      {/* Request Callback Modal - PROPERLY CENTERED */}
      <AnimatePresence>
        {showCallbackModal && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[10000]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            />
            
            {/* Modal - Fixed center positioning */}
            <motion.div
              className="fixed inset-0 z-[10001] flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-primary to-primary-dark p-4 sm:p-5 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold">📞 Request a Callback</h3>
                      <p className="text-white/80 text-xs sm:text-sm mt-1">We'll call you back within 5 minutes!</p>
                    </div>
                    <button 
                      onClick={closeModal}
                      className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                {/* Form */}
                <form onSubmit={handleCallbackSubmit} className="p-4 sm:p-5 space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Your Name</label>
                    <input
                      type="text"
                      value={callbackForm.name}
                      onChange={(e) => setCallbackForm({ ...callbackForm, name: e.target.value })}
                      placeholder="Enter your name"
                      className="w-full px-4 py-2.5 sm:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm sm:text-base"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      value={callbackForm.phone}
                      onChange={(e) => setCallbackForm({ ...callbackForm, phone: e.target.value })}
                      placeholder="Enter your phone number"
                      className="w-full px-4 py-2.5 sm:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm sm:text-base"
                      required
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={submitStatus === 'sending'}
                    className={`w-full py-3 sm:py-3.5 rounded-xl font-semibold text-white transition-all text-sm sm:text-base ${
                      submitStatus === 'success' 
                        ? 'bg-green-500' 
                        : submitStatus === 'error'
                        ? 'bg-red-500'
                        : 'bg-gradient-to-r from-primary to-primary-dark hover:shadow-lg'
                    }`}
                    whileHover={{ scale: submitStatus ? 1 : 1.02 }}
                    whileTap={{ scale: submitStatus ? 1 : 0.98 }}
                  >
                    {submitStatus === 'sending' ? (
                      <span className="flex items-center justify-center gap-2">
                        <motion.span 
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        />
                        Submitting...
                      </span>
                    ) : submitStatus === 'success' ? (
                      '✓ We will call you soon!'
                    ) : submitStatus === 'error' ? (
                      'Failed - Try Again'
                    ) : (
                      'Request Callback'
                    )}
                  </motion.button>
                  
                  <p className="text-center text-xs text-gray-500">
                    By submitting, you agree to receive a call from Glowlogy
                  </p>
                </form>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingButtons;

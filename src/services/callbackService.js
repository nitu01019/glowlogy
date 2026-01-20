/**
 * Callback Service
 * Handle callback requests with Firebase integration
 * Scalable, optimized for millions of users
 */

import { collection, addDoc, serverTimestamp, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '../config/firebase';

const COLLECTION = 'callback_requests';

// Rate limiting configuration
const RATE_LIMIT = {
  maxRequests: 3,        // Max requests per phone number
  windowMs: 24 * 60 * 60 * 1000, // 24 hours window
};

// In-memory rate limit cache (for quick checks)
const rateLimitCache = new Map();

/**
 * Check rate limit for a phone number
 * @param {string} phone - Phone number to check
 * @returns {boolean} - Whether the request is allowed
 */
const checkRateLimit = (phone) => {
  const normalizedPhone = phone.replace(/[^0-9]/g, '');
  const now = Date.now();
  const cached = rateLimitCache.get(normalizedPhone);
  
  if (cached) {
    const validRequests = cached.filter(t => now - t < RATE_LIMIT.windowMs);
    if (validRequests.length >= RATE_LIMIT.maxRequests) {
      return { allowed: false, remainingTime: Math.ceil((cached[0] + RATE_LIMIT.windowMs - now) / (60 * 1000)) };
    }
    validRequests.push(now);
    rateLimitCache.set(normalizedPhone, validRequests);
  } else {
    rateLimitCache.set(normalizedPhone, [now]);
  }
  
  return { allowed: true };
};

/**
 * Submit a callback request
 * @param {Object} data - Callback request data
 * @param {string} data.name - Customer name
 * @param {string} data.phone - Customer phone number
 * @param {string} [data.preferredTime] - Preferred callback time
 * @param {string} [data.service] - Service interested in
 * @param {string} [data.message] - Additional message
 * @returns {Promise<Object>} - Result with request ID
 */
export const submitCallbackRequest = async (data) => {
  const { name, phone, preferredTime, service, message } = data;
  
  // Validate required fields
  if (!name?.trim() || !phone?.trim()) {
    throw new Error('Name and phone number are required');
  }
  
  // Validate phone format (Indian phone)
  const phoneRegex = /^[+]?[0-9]{10,13}$/;
  const cleanPhone = phone.replace(/[\s-]/g, '');
  if (!phoneRegex.test(cleanPhone)) {
    throw new Error('Please enter a valid phone number');
  }
  
  // Check rate limit
  const rateCheck = checkRateLimit(cleanPhone);
  if (!rateCheck.allowed) {
    throw new Error(`Too many requests. Please try again in ${rateCheck.remainingTime} minutes.`);
  }
  
  try {
    const callbackRequest = {
      name: name.trim(),
      phone: cleanPhone,
      preferredTime: preferredTime || 'anytime',
      service: service || 'general',
      message: message?.trim() || '',
      status: 'pending', // pending, contacted, completed, cancelled
      priority: 'normal', // low, normal, high
      source: 'website_hero',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      // Metadata for analytics
      metadata: {
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        referrer: typeof document !== 'undefined' ? document.referrer : '',
        timestamp: new Date().toISOString(),
      }
    };
    
    const docRef = await addDoc(collection(db, COLLECTION), callbackRequest);
    
    console.log('✅ Callback request submitted:', docRef.id);
    
    return { 
      id: docRef.id, 
      success: true,
      message: 'We will call you back shortly!'
    };
  } catch (error) {
    console.error('❌ Error submitting callback request:', error);
    throw new Error('Failed to submit request. Please try again or call us directly.');
  }
};

/**
 * Get callback requests (for admin dashboard)
 * @param {Object} filters - Filter options
 * @param {string} [filters.status] - Filter by status
 * @param {number} [filters.limitCount] - Limit results
 * @returns {Promise<Array>} - Array of callback requests
 */
export const getCallbackRequests = async (filters = {}) => {
  try {
    let q = query(
      collection(db, COLLECTION),
      orderBy('createdAt', 'desc'),
      limit(filters.limitCount || 50)
    );
    
    if (filters.status) {
      q = query(q, where('status', '==', filters.status));
    }
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching callback requests:', error);
    throw new Error('Failed to fetch callback requests');
  }
};

/**
 * Get preferred time options
 * @returns {Array} - Array of time options
 */
export const getPreferredTimeOptions = () => [
  { value: 'anytime', label: 'Anytime' },
  { value: 'morning', label: 'Morning (9 AM - 12 PM)' },
  { value: 'afternoon', label: 'Afternoon (12 PM - 4 PM)' },
  { value: 'evening', label: 'Evening (4 PM - 8 PM)' },
];

/**
 * Get service options for callback
 * @returns {Array} - Array of service options
 */
export const getServiceOptions = () => [
  { value: 'general', label: 'General Inquiry' },
  { value: 'massage', label: 'Massage Therapy' },
  { value: 'facial', label: 'Facial Treatments' },
  { value: 'body', label: 'Body Treatments' },
  { value: 'membership', label: 'Membership Plans' },
  { value: 'corporate', label: 'Corporate Wellness' },
  { value: 'booking', label: 'Book Appointment' },
];

export default {
  submitCallbackRequest,
  getCallbackRequests,
  getPreferredTimeOptions,
  getServiceOptions,
};

/**
 * Contact Service
 * Handle contact form submissions with rate limiting
 */

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

const COLLECTION = 'contacts';

// Rate limiting
const submissions = new Map();
const RATE_LIMIT = 3;
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour

const checkRateLimit = (email) => {
  const now = Date.now();
  const userSubmissions = submissions.get(email) || [];
  const recent = userSubmissions.filter(t => now - t < RATE_WINDOW);
  
  if (recent.length >= RATE_LIMIT) {
    return false;
  }
  
  recent.push(now);
  submissions.set(email, recent);
  return true;
};

// Submit contact form
export const submitContactForm = async (formData) => {
  const { email } = formData;
  
  if (!checkRateLimit(email)) {
    throw new Error('Too many submissions. Please try again later.');
  }
  
  try {
    const contact = {
      ...formData,
      status: 'new',
      createdAt: serverTimestamp(),
    };
    
    const docRef = await addDoc(collection(db, COLLECTION), contact);
    return { id: docRef.id, success: true };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw new Error('Failed to submit. Please try again.');
  }
};

// Subscribe to newsletter
export const subscribeNewsletter = async (email) => {
  if (!checkRateLimit(email)) {
    throw new Error('Already subscribed or too many attempts.');
  }
  
  try {
    await addDoc(collection(db, 'newsletter'), {
      email,
      subscribedAt: serverTimestamp(),
      active: true,
    });
    return { success: true };
  } catch (error) {
    console.error('Error subscribing:', error);
    throw new Error('Failed to subscribe. Please try again.');
  }
};

export default { submitContactForm, subscribeNewsletter };

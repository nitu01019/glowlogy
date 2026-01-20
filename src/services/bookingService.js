/**
 * Booking Service
 * Firestore integration for appointments with rate limiting
 */

import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc,
  doc,
  query, 
  where, 
  orderBy, 
  updateDoc,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { getCached, setCached, invalidateCache } from './cacheService';

const COLLECTION = 'bookings';

// Rate limiting - prevent spam
const rateLimiter = new Map();
const RATE_LIMIT = 5; // max bookings per IP/session per hour
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour

const checkRateLimit = (userId) => {
  const now = Date.now();
  const userRequests = rateLimiter.get(userId) || [];
  
  // Clean old requests
  const recent = userRequests.filter(t => now - t < RATE_WINDOW);
  
  if (recent.length >= RATE_LIMIT) {
    return false;
  }
  
  recent.push(now);
  rateLimiter.set(userId, recent);
  return true;
};

// Generate unique booking ID
const generateBookingId = () => {
  const prefix = 'GLW';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
};

// Create new booking
export const createBooking = async (bookingData) => {
  const sessionId = sessionStorage.getItem('sessionId') || Math.random().toString(36);
  sessionStorage.setItem('sessionId', sessionId);
  
  // Rate limit check
  if (!checkRateLimit(sessionId)) {
    throw new Error('Too many booking requests. Please try again later.');
  }
  
  try {
    const booking = {
      bookingId: generateBookingId(),
      ...bookingData,
      status: 'pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    
    const docRef = await addDoc(collection(db, COLLECTION), booking);
    
    // Invalidate cache
    invalidateCache('bookings');
    
    return { id: docRef.id, ...booking };
  } catch (error) {
    console.error('Error creating booking:', error);
    throw new Error('Failed to create booking. Please try again.');
  }
};

// Get user bookings
export const getUserBookings = async (email, useCache = true) => {
  if (useCache) {
    const cached = getCached('bookings');
    if (cached && cached.data[email]) {
      return cached.data[email];
    }
  }
  
  try {
    const bookingsRef = collection(db, COLLECTION);
    const q = query(
      bookingsRef, 
      where('email', '==', email),
      orderBy('createdAt', 'desc')
    );
    
    const snapshot = await getDocs(q);
    const bookings = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() || new Date(),
    }));
    
    // Cache results
    const cached = getCached('bookings')?.data || {};
    cached[email] = bookings;
    setCached('bookings', cached);
    
    return bookings;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return [];
  }
};

// Get booking by ID
export const getBookingById = async (id) => {
  try {
    const docRef = doc(db, COLLECTION, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error('Error fetching booking:', error);
    return null;
  }
};

// Update booking status
export const updateBookingStatus = async (id, status) => {
  try {
    const docRef = doc(db, COLLECTION, id);
    await updateDoc(docRef, {
      status,
      updatedAt: serverTimestamp(),
    });
    
    invalidateCache('bookings');
    return true;
  } catch (error) {
    console.error('Error updating booking:', error);
    return false;
  }
};

// Cancel booking
export const cancelBooking = async (id, reason = '') => {
  try {
    const docRef = doc(db, COLLECTION, id);
    await updateDoc(docRef, {
      status: 'cancelled',
      cancelReason: reason,
      cancelledAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    
    invalidateCache('bookings');
    return true;
  } catch (error) {
    console.error('Error cancelling booking:', error);
    return false;
  }
};

// Get available time slots
export const getAvailableSlots = async (date, locationId) => {
  const allSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
  ];
  
  try {
    // Get existing bookings for the date
    const bookingsRef = collection(db, COLLECTION);
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    
    const q = query(
      bookingsRef,
      where('locationId', '==', locationId),
      where('date', '>=', Timestamp.fromDate(startOfDay)),
      where('date', '<=', Timestamp.fromDate(endOfDay)),
      where('status', 'in', ['pending', 'confirmed'])
    );
    
    const snapshot = await getDocs(q);
    const bookedSlots = snapshot.docs.map(doc => doc.data().time);
    
    // Filter available slots
    return allSlots.filter(slot => !bookedSlots.includes(slot));
  } catch (error) {
    console.error('Error getting available slots:', error);
    // Return all slots on error
    return allSlots;
  }
};

export default {
  createBooking,
  getUserBookings,
  getBookingById,
  updateBookingStatus,
  cancelBooking,
  getAvailableSlots,
};

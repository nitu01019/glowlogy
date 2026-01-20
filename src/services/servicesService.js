/**
 * Services Service
 * Firestore integration with caching for spa services
 */

import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  query, 
  where, 
  orderBy, 
  limit as firestoreLimit,
  addDoc,
  updateDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { getCached, setCached, dedupeRequest } from './cacheService';
import { IMAGES } from '../utils/images';

const COLLECTION = 'services';

// Default services data (used as fallback and for seeding)
const DEFAULT_SERVICES = [
  {
    id: 'massage-swedish',
    category: 'massage',
    name: 'Swedish Massage',
    description: 'Classic relaxation massage with gentle, flowing strokes to ease tension and promote tranquility.',
    duration: 60,
    price: 2500,
    image: IMAGES.massages.swedish,
    popular: true,
    active: true,
  },
  {
    id: 'massage-deep-tissue',
    category: 'massage',
    name: 'Deep Tissue Massage',
    description: 'Intensive therapeutic massage targeting deep muscle layers to release chronic tension.',
    duration: 75,
    price: 3500,
    image: IMAGES.massages.deepTissue,
    popular: true,
    active: true,
  },
  {
    id: 'massage-hot-stone',
    category: 'massage',
    name: 'Hot Stone Therapy',
    description: 'Heated basalt stones combined with massage for deep relaxation and muscle relief.',
    duration: 90,
    price: 4000,
    image: IMAGES.massages.hotStone,
    popular: false,
    active: true,
  },
  {
    id: 'massage-aromatherapy',
    category: 'massage',
    name: 'Aromatherapy Massage',
    description: 'Essential oil infused massage for holistic healing of body and mind.',
    duration: 60,
    price: 3000,
    image: IMAGES.massages.aromatherapy,
    popular: false,
    active: true,
  },
  {
    id: 'facial-signature',
    category: 'facials',
    name: 'Signature Glow Facial',
    description: 'Our signature treatment combining cleansing, exfoliation, and hydration for radiant skin.',
    duration: 60,
    price: 3000,
    image: IMAGES.services.facial,
    popular: true,
    active: true,
  },
  {
    id: 'facial-anti-aging',
    category: 'facials',
    name: 'Anti-Aging Facial',
    description: 'Advanced treatment with peptides and retinol to reduce fine lines and restore youthfulness.',
    duration: 75,
    price: 4500,
    image: IMAGES.services.facial,
    popular: false,
    active: true,
  },
  {
    id: 'body-scrub',
    category: 'body',
    name: 'Body Scrub & Wrap',
    description: 'Full body exfoliation followed by a nourishing wrap for silky smooth skin.',
    duration: 90,
    price: 3500,
    image: IMAGES.services.body,
    popular: false,
    active: true,
  },
  {
    id: 'body-detox',
    category: 'body',
    name: 'Detox Treatment',
    description: 'Complete body detoxification therapy to eliminate toxins and boost energy.',
    duration: 120,
    price: 5000,
    image: IMAGES.services.body,
    popular: false,
    active: true,
  },
  {
    id: 'hair-scalp',
    category: 'hair',
    name: 'Scalp Treatment',
    description: 'Deep nourishing treatment for scalp health and hair vitality.',
    duration: 45,
    price: 1500,
    image: IMAGES.services.hair,
    popular: false,
    active: true,
  },
  {
    id: 'nails-manicure',
    category: 'nails',
    name: 'Luxury Manicure',
    description: 'Complete nail care with massage, shaping, and polish for beautiful hands.',
    duration: 60,
    price: 1200,
    image: IMAGES.services.nails,
    popular: false,
    active: true,
  },
  {
    id: 'nails-pedicure',
    category: 'nails',
    name: 'Spa Pedicure',
    description: 'Relaxing foot treatment with soak, scrub, massage, and polish.',
    duration: 75,
    price: 1500,
    image: IMAGES.services.nails,
    popular: false,
    active: true,
  },
  {
    id: 'wellness-package',
    category: 'wellness',
    name: 'Wellness Day Package',
    description: 'Full day of pampering including massage, facial, and body treatment.',
    duration: 240,
    price: 8000,
    image: IMAGES.services.wellness,
    popular: true,
    active: true,
  },
];

// Get all services with caching
export const getServices = async (options = {}) => {
  const { category, limit: resultLimit, useCache = true } = options;
  
  // Try cache first
  if (useCache) {
    const cached = getCached('services');
    if (cached) {
      let data = cached.data;
      if (category) data = data.filter(s => s.category === category);
      if (resultLimit) data = data.slice(0, resultLimit);
      return data;
    }
  }
  
  // Dedupe requests
  return dedupeRequest('services', async () => {
    try {
      const servicesRef = collection(db, COLLECTION);
      const q = query(servicesRef, where('active', '==', true), orderBy('popular', 'desc'));
      const snapshot = await getDocs(q);
      
      let services = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      // If no data in Firestore, use defaults
      if (services.length === 0) {
        services = DEFAULT_SERVICES;
      }
      
      // Cache all services
      setCached('services', services);
      
      // Apply filters
      if (category) services = services.filter(s => s.category === category);
      if (resultLimit) services = services.slice(0, resultLimit);
      
      return services;
    } catch (error) {
      console.error('Error fetching services:', error);
      // Return defaults on error
      let services = DEFAULT_SERVICES;
      if (category) services = services.filter(s => s.category === category);
      if (resultLimit) services = services.slice(0, resultLimit);
      return services;
    }
  });
};

// Get single service by ID
export const getServiceById = async (id) => {
  // Check cache first
  const cached = getCached('services');
  if (cached) {
    const service = cached.data.find(s => s.id === id);
    if (service) return service;
  }
  
  try {
    const docRef = doc(db, COLLECTION, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    
    // Fallback to defaults
    return DEFAULT_SERVICES.find(s => s.id === id) || null;
  } catch (error) {
    console.error('Error fetching service:', error);
    return DEFAULT_SERVICES.find(s => s.id === id) || null;
  }
};

// Get services by category
export const getServicesByCategory = async (category) => {
  return getServices({ category });
};

// Get popular services
export const getPopularServices = async (limit = 6) => {
  const services = await getServices();
  return services.filter(s => s.popular).slice(0, limit);
};

// Get service categories
export const getCategories = () => [
  { id: 'all', name: 'All Services' },
  { id: 'massage', name: 'Massage' },
  { id: 'facials', name: 'Facials' },
  { id: 'body', name: 'Body Treatments' },
  { id: 'hair', name: 'Hair & Scalp' },
  { id: 'nails', name: 'Nail Services' },
  { id: 'wellness', name: 'Wellness' },
];

// Seed default services to Firestore (admin function)
export const seedServices = async () => {
  try {
    for (const service of DEFAULT_SERVICES) {
      const { id, ...data } = service;
      await addDoc(collection(db, COLLECTION), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
    console.log('Services seeded successfully');
  } catch (error) {
    console.error('Error seeding services:', error);
  }
};

export default {
  getServices,
  getServiceById,
  getServicesByCategory,
  getPopularServices,
  getCategories,
  DEFAULT_SERVICES,
};

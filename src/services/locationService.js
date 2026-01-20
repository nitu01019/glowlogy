/**
 * Location Service
 * Firestore integration for spa locations with caching
 */

import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  query, 
  where, 
  orderBy 
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { getCached, setCached, dedupeRequest } from './cacheService';
import { IMAGES } from '../utils/images';

const COLLECTION = 'locations';

// Default locations data
const DEFAULT_LOCATIONS = [
  {
    id: 'delhi-cp',
    name: 'Connaught Place',
    city: 'New Delhi',
    state: 'Delhi',
    address: 'N-12, Block N, Connaught Place, New Delhi - 110001',
    phone: '+91 98765 43210',
    email: 'cp@glowlogy.com',
    hours: '9:00 AM - 9:00 PM',
    coordinates: { lat: 28.6315, lng: 77.2167 },
    image: IMAGES.locations.delhi,
    featured: true,
    active: true,
    amenities: ['Parking', 'WiFi', 'Locker', 'Shower', 'Cafe'],
  },
  {
    id: 'delhi-gk',
    name: 'Greater Kailash',
    city: 'New Delhi',
    state: 'Delhi',
    address: 'M-45, Greater Kailash Part 2, New Delhi - 110048',
    phone: '+91 98765 43211',
    email: 'gk@glowlogy.com',
    hours: '9:00 AM - 9:00 PM',
    coordinates: { lat: 28.5355, lng: 77.2410 },
    image: IMAGES.locations.delhi,
    featured: false,
    active: true,
    amenities: ['Parking', 'WiFi', 'Locker'],
  },
  {
    id: 'mumbai-bandra',
    name: 'Bandra West',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: '32, Turner Road, Bandra West, Mumbai - 400050',
    phone: '+91 98765 43212',
    email: 'bandra@glowlogy.com',
    hours: '9:00 AM - 9:00 PM',
    coordinates: { lat: 19.0596, lng: 72.8295 },
    image: IMAGES.locations.mumbai,
    featured: true,
    active: true,
    amenities: ['Valet Parking', 'WiFi', 'Locker', 'Shower', 'Cafe', 'Pool'],
  },
  {
    id: 'mumbai-juhu',
    name: 'Juhu',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: '15, Juhu Tara Road, Juhu, Mumbai - 400049',
    phone: '+91 98765 43213',
    email: 'juhu@glowlogy.com',
    hours: '9:00 AM - 9:00 PM',
    coordinates: { lat: 19.0883, lng: 72.8263 },
    image: IMAGES.locations.mumbai,
    featured: false,
    active: true,
    amenities: ['Parking', 'WiFi', 'Locker', 'Beach View'],
  },
  {
    id: 'bangalore-indiranagar',
    name: 'Indiranagar',
    city: 'Bangalore',
    state: 'Karnataka',
    address: '100 Feet Road, Indiranagar, Bangalore - 560038',
    phone: '+91 98765 43214',
    email: 'indiranagar@glowlogy.com',
    hours: '9:00 AM - 9:00 PM',
    coordinates: { lat: 12.9784, lng: 77.6408 },
    image: IMAGES.locations.bangalore,
    featured: true,
    active: true,
    amenities: ['Parking', 'WiFi', 'Locker', 'Shower', 'Cafe'],
  },
  {
    id: 'bangalore-koramangala',
    name: 'Koramangala',
    city: 'Bangalore',
    state: 'Karnataka',
    address: '5th Block, Koramangala, Bangalore - 560095',
    phone: '+91 98765 43215',
    email: 'koramangala@glowlogy.com',
    hours: '9:00 AM - 9:00 PM',
    coordinates: { lat: 12.9352, lng: 77.6245 },
    image: IMAGES.locations.bangalore,
    featured: false,
    active: true,
    amenities: ['Parking', 'WiFi', 'Locker'],
  },
];

// Get all locations with caching
export const getLocations = async (options = {}) => {
  const { city, featured, useCache = true } = options;
  
  // Try cache first
  if (useCache) {
    const cached = getCached('locations');
    if (cached) {
      let data = cached.data;
      if (city) data = data.filter(l => l.city === city);
      if (featured !== undefined) data = data.filter(l => l.featured === featured);
      return data;
    }
  }
  
  // Dedupe requests
  return dedupeRequest('locations', async () => {
    try {
      const locationsRef = collection(db, COLLECTION);
      const q = query(locationsRef, where('active', '==', true), orderBy('featured', 'desc'));
      const snapshot = await getDocs(q);
      
      let locations = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      // If no data in Firestore, use defaults
      if (locations.length === 0) {
        locations = DEFAULT_LOCATIONS;
      }
      
      // Cache all locations
      setCached('locations', locations);
      
      // Apply filters
      if (city) locations = locations.filter(l => l.city === city);
      if (featured !== undefined) locations = locations.filter(l => l.featured === featured);
      
      return locations;
    } catch (error) {
      console.error('Error fetching locations:', error);
      let locations = DEFAULT_LOCATIONS;
      if (city) locations = locations.filter(l => l.city === city);
      if (featured !== undefined) locations = locations.filter(l => l.featured === featured);
      return locations;
    }
  });
};

// Get location by ID
export const getLocationById = async (id) => {
  // Check cache first
  const cached = getCached('locations');
  if (cached) {
    const location = cached.data.find(l => l.id === id);
    if (location) return location;
  }
  
  try {
    const docRef = doc(db, COLLECTION, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    
    return DEFAULT_LOCATIONS.find(l => l.id === id) || null;
  } catch (error) {
    console.error('Error fetching location:', error);
    return DEFAULT_LOCATIONS.find(l => l.id === id) || null;
  }
};

// Get locations by city
export const getLocationsByCity = async (city) => {
  return getLocations({ city });
};

// Get featured locations
export const getFeaturedLocations = async () => {
  return getLocations({ featured: true });
};

// Get unique cities
export const getCities = async () => {
  const locations = await getLocations();
  const cities = [...new Set(locations.map(l => l.city))];
  return ['All Cities', ...cities];
};

// Search locations
export const searchLocations = async (query) => {
  const locations = await getLocations();
  const lowerQuery = query.toLowerCase();
  return locations.filter(l => 
    l.name.toLowerCase().includes(lowerQuery) ||
    l.city.toLowerCase().includes(lowerQuery) ||
    l.address.toLowerCase().includes(lowerQuery)
  );
};

export default {
  getLocations,
  getLocationById,
  getLocationsByCity,
  getFeaturedLocations,
  getCities,
  searchLocations,
  DEFAULT_LOCATIONS,
};

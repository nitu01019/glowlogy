/**
 * Firebase Configuration
 * Glowlogy - Spa & Wellness Platform
 */

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDw5IastU2g21oWABdNvEi3okxa7-5WetE",
  authDomain: "glowlogy-b1c55.firebaseapp.com",
  projectId: "glowlogy-b1c55",
  storageBucket: "glowlogy-b1c55.firebasestorage.app",
  messagingSenderId: "231119699051",
  appId: "1:231119699051:web:3bf1dfd8cbebb0e34f052e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Log connection status
console.log('🔥 Firebase connected to project:', firebaseConfig.projectId);

export default app;

/**
 * Auth Service
 * Firebase authentication with session management
 */

import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

// Sign up with email
export const signUp = async (email, password, name) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update profile
    await updateProfile(user, { displayName: name });
    
    // Create user document
    await setDoc(doc(db, 'users', user.uid), {
      email,
      name,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    
    return { user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};

// Sign in with email
export const signIn = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return { user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};

// Sign in with Google
export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);
    
    // Check if user exists
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    
    if (!userDoc.exists()) {
      // Create user document
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
    
    return { user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};

// Sign out
export const logOut = async () => {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

// Reset password
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

// Get current user
export const getCurrentUser = () => auth.currentUser;

// Auth state observer
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// Get user profile
export const getUserProfile = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data();
    }
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
};

export default {
  signUp,
  signIn,
  signInWithGoogle,
  logOut,
  resetPassword,
  getCurrentUser,
  onAuthChange,
  getUserProfile,
};

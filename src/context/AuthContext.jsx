/**
 * Authentication Context
 * Provides auth state and methods throughout the app
 * Properly handles Google photo URL
 */

import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthChange, getUserProfile, logOut } from '../services/authService';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChange(async (firebaseUser) => {
      if (firebaseUser) {
        // Create a clean user object with all needed properties
        const userObj = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          emailVerified: firebaseUser.emailVerified,
          providerData: firebaseUser.providerData,
        };
        setUser(userObj);
        
        // Get additional profile data from Firestore
        const profile = await getUserProfile(firebaseUser.uid);
        
        // Merge photoURL from Firebase Auth if not in Firestore
        setUserData({
          ...profile,
          photoURL: profile?.photoURL || firebaseUser.photoURL,
        });
      } else {
        setUser(null);
        setUserData(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    const result = await logOut();
    if (!result.error) {
      setUser(null);
      setUserData(null);
    }
    return result;
  };

  const value = {
    user,
    userData,
    loading,
    isAuthenticated: !!user,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

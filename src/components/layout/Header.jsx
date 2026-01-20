/**
 * Header Component
 * Shows user profile when logged in
 * With swipe gesture support for mobile sidebar
 */

import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, User, ChevronRight, LogOut, Calendar } from 'lucide-react';
import { Button } from '../ui';
import { useAuth } from '../../context/AuthContext';

// Custom hook for swipe detection
const useSwipe = (onSwipeLeft, onSwipeRight, isMenuOpen) => {
  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;
    
    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
    };
    
    const handleTouchEnd = (e) => {
      touchEndX = e.changedTouches[0].clientX;
      const swipeDistance = touchEndX - touchStartX;
      const startedFromLeftEdge = touchStartX < 40;
      
      // Swipe right from left edge to open menu
      if (swipeDistance > 100 && startedFromLeftEdge && !isMenuOpen) {
        onSwipeRight();
      }
      // Swipe left anywhere to close menu (when open)
      else if (swipeDistance < -100 && isMenuOpen) {
        onSwipeLeft();
      }
    };
    
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onSwipeLeft, onSwipeRight, isMenuOpen]);
};

const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/services', label: 'Services' },
  { path: '/membership', label: 'Membership' },
  { path: '/locations', label: 'Locations' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const { user, userData, isAuthenticated, logout } = useAuth();

  // Swipe handlers
  const openMenu = useCallback(() => setIsMenuOpen(true), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  
  // Enable swipe gestures for sidebar
  useSwipe(closeMenu, openMenu, isMenuOpen);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  // Get user initials
  const getInitials = () => {
    const name = userData?.name || user?.displayName || user?.email || '';
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  // Get display name
  const getDisplayName = () => {
    return userData?.name || user?.displayName || 'User';
  };

  // Handle logout
  const handleLogout = async () => {
    await logout();
    setIsProfileOpen(false);
  };

  return (
    <header className="bg-white shadow-sm relative z-50">
      {/* Top bar - hidden on mobile */}
      <div className="hidden md:block bg-primary/5 border-b border-primary/10">
        <div className="container-custom py-2 flex items-center justify-between text-sm">
          <a href="tel:+919876543210" className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors">
            <Phone size={14} />
            <span>+91 98765 43210</span>
          </a>
          <div className="flex items-center gap-4">
            <Link to="/gift-cards" className="text-gray-600 hover:text-primary transition-colors">Gift Cards</Link>
            <Link to="/corporate" className="text-gray-600 hover:text-primary transition-colors">Corporate</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container-custom py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Toggle - LEFT SIDE */}
          <motion.button 
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
            aria-label="Menu"
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Logo - CENTER on mobile, bigger text */}
          <Link to="/" className="absolute left-1/2 transform -translate-x-1/2 lg:relative lg:left-0 lg:transform-none">
            <motion.span 
              className="text-2xl sm:text-3xl lg:text-3xl font-heading font-bold text-primary whitespace-nowrap"
              whileHover={{ scale: 1.02 }}
            >
              Glowlogy
            </motion.span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive(link.path) 
                    ? 'text-primary bg-primary/10' 
                    : 'text-gray-600 hover:text-primary hover:bg-primary/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {isAuthenticated ? (
              /* Logged In - Show Profile */
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="hidden sm:flex items-center gap-2 px-2 py-1.5 rounded-full hover:bg-gray-100 transition-colors"
                >
                  {user?.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt={getDisplayName()} 
                      className="w-8 h-8 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                      onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                    />
                  ) : null}
                  <div 
                    className={`w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full items-center justify-center text-white text-sm font-medium ${user?.photoURL ? 'hidden' : 'flex'}`}
                  >
                    {getInitials()}
                  </div>
                  <span className="text-sm font-medium text-gray-700 max-w-[100px] truncate">
                    {getDisplayName()}
                  </span>
                </button>

                {/* Profile Dropdown */}
                <AnimatePresence>
                  {isProfileOpen && (
                    <>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40"
                        onClick={() => setIsProfileOpen(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50"
                      >
                        {/* User Info */}
                        <div className="p-4 border-b bg-gray-50">
                          <div className="flex items-center gap-3">
                            {user?.photoURL ? (
                              <img 
                                src={user.photoURL} 
                                alt={getDisplayName()} 
                                className="w-10 h-10 rounded-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-medium">
                                {getInitials()}
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-gray-900 truncate">{getDisplayName()}</p>
                              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                            </div>
                          </div>
                        </div>

                        {/* Menu Items */}
                        <div className="py-2">
                          <Link
                            to="/dashboard"
                            className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            <Calendar size={18} />
                            <span>My Bookings</span>
                          </Link>
                          <Link
                            to="/dashboard"
                            className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            <User size={18} />
                            <span>Profile</span>
                          </Link>
                        </div>

                        {/* Logout */}
                        <div className="border-t py-2">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <LogOut size={18} />
                            <span>Logout</span>
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              /* Not Logged In - Show Login Button */
              <Link 
                to="/login" 
                className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full text-gray-600 hover:text-primary hover:bg-primary/5 transition-all"
              >
                <User size={20} />
              </Link>
            )}
            
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button to="/book" size="small" className="hidden sm:flex text-sm px-4 sm:px-5">
                Book Now
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Slides from LEFT */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/30 lg:hidden z-40"
              onClick={() => setIsMenuOpen(false)}
            />
            
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl lg:hidden z-50 overflow-y-auto rounded-r-3xl"
            >
              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xl font-heading font-bold text-primary">Menu</span>
                  <motion.button 
                    onClick={() => setIsMenuOpen(false)} 
                    className="p-2 -mr-2 hover:bg-gray-100 rounded-lg transition-colors"
                    whileTap={{ scale: 0.95 }}
                  >
                    <X size={24} />
                  </motion.button>
                </div>

                {/* User Info in Mobile Menu */}
                {isAuthenticated && (
                  <div className="mb-6 pb-6 border-b">
                    <div className="flex items-center gap-3">
                      {user?.photoURL ? (
                        <img 
                          src={user.photoURL} 
                          alt={getDisplayName()} 
                          className="w-12 h-12 rounded-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-lg font-medium">
                          {getInitials()}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{getDisplayName()}</p>
                        <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                      </div>
                    </div>
                    <Link
                      to="/dashboard"
                      className="mt-3 flex items-center justify-center gap-2 w-full py-2.5 bg-primary/10 text-primary rounded-lg font-medium"
                    >
                      <Calendar size={18} />
                      My Bookings
                    </Link>
                  </div>
                )}
                
                <nav className="space-y-1 mb-6">
                  {NAV_LINKS.map((link, index) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        to={link.path}
                        className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-medium transition-all ${
                          isActive(link.path)
                            ? 'bg-primary/10 text-primary'
                            : 'text-gray-700 hover:bg-gray-50 active:bg-gray-100'
                        }`}
                      >
                        {link.label}
                        <ChevronRight size={18} className="text-gray-400" />
                      </Link>
                    </motion.div>
                  ))}
                </nav>
                
                <div className="border-t pt-4 space-y-2">
                  {isAuthenticated ? (
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-3 text-red-500 hover:text-red-600 transition-colors w-full"
                    >
                      <LogOut size={20} />
                      Logout
                    </button>
                  ) : (
                    <Link to="/login" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-primary transition-colors">
                      <User size={20} />
                      Login / Register
                    </Link>
                  )}
                  <Link to="/gift-cards" className="block px-4 py-2.5 text-gray-600 hover:text-primary transition-colors">Gift Cards</Link>
                  <Link to="/corporate" className="block px-4 py-2.5 text-gray-600 hover:text-primary transition-colors">Corporate</Link>
                </div>
                
                <motion.div 
                  className="mt-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Button to="/book" fullWidth size="large">
                    Book Appointment
                  </Button>
                </motion.div>
                
                {/* Phone */}
                <a href="tel:+919876543210" className="flex items-center justify-center gap-2 mt-4 py-3 text-primary font-medium">
                  <Phone size={18} />
                  +91 98765 43210
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

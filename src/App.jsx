/**
 * App Component
 * Main application with fast routing and smooth transitions
 */

import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/layout';
import { PageLoader, SkeletonHero } from './components/ui';
import { preloadCriticalImages } from './utils/images';

// Eager load critical pages
import Home from './pages/Home';
import Services from './pages/Services';

// Lazy load other pages for faster initial load
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Locations = lazy(() => import('./pages/Locations'));
const Book = lazy(() => import('./pages/Book'));
const Membership = lazy(() => import('./pages/Membership'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Careers = lazy(() => import('./pages/Careers'));
const GiftCards = lazy(() => import('./pages/GiftCards'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Admin = lazy(() => import('./pages/Admin'));
const Login = lazy(() => import('./pages/Login'));
const Corporate = lazy(() => import('./pages/Corporate'));

// Fast page transition variants
const pageVariants = {
  initial: { opacity: 0 },
  enter: { 
    opacity: 1,
    transition: { duration: 0.2, ease: 'easeOut' }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.15, ease: 'easeIn' }
  }
};

// Page wrapper with animation
const PageWrapper = ({ children }) => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="enter"
    exit="exit"
  >
    {children}
  </motion.div>
);

// Minimal loading fallback
const MinimalLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <motion.div
      className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
    />
  </div>
);

// Animated Routes
const AnimatedRoutes = () => {
  const location = useLocation();
  
  // Preload images on route change
  useEffect(() => {
    preloadCriticalImages();
  }, [location.pathname]);
  
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          {/* Critical pages - eager loaded */}
          <Route index element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="services" element={<PageWrapper><Services /></PageWrapper>} />
          <Route path="services/:category" element={<PageWrapper><Services /></PageWrapper>} />
          
          {/* Lazy loaded pages */}
          <Route path="about" element={
            <Suspense fallback={<MinimalLoader />}>
              <PageWrapper><About /></PageWrapper>
            </Suspense>
          } />
          <Route path="contact" element={
            <Suspense fallback={<MinimalLoader />}>
              <PageWrapper><Contact /></PageWrapper>
            </Suspense>
          } />
          <Route path="locations" element={
            <Suspense fallback={<MinimalLoader />}>
              <PageWrapper><Locations /></PageWrapper>
            </Suspense>
          } />
          <Route path="locations/:id" element={
            <Suspense fallback={<MinimalLoader />}>
              <PageWrapper><Locations /></PageWrapper>
            </Suspense>
          } />
          <Route path="book" element={
            <Suspense fallback={<MinimalLoader />}>
              <PageWrapper><Book /></PageWrapper>
            </Suspense>
          } />
          <Route path="membership" element={
            <Suspense fallback={<MinimalLoader />}>
              <PageWrapper><Membership /></PageWrapper>
            </Suspense>
          } />
          <Route path="faq" element={
            <Suspense fallback={<MinimalLoader />}>
              <PageWrapper><FAQ /></PageWrapper>
            </Suspense>
          } />
          <Route path="careers" element={
            <Suspense fallback={<MinimalLoader />}>
              <PageWrapper><Careers /></PageWrapper>
            </Suspense>
          } />
          <Route path="gift-cards" element={
            <Suspense fallback={<MinimalLoader />}>
              <PageWrapper><GiftCards /></PageWrapper>
            </Suspense>
          } />
          <Route path="corporate" element={
            <Suspense fallback={<MinimalLoader />}>
              <PageWrapper><Corporate /></PageWrapper>
            </Suspense>
          } />
          <Route path="login" element={
            <Suspense fallback={<MinimalLoader />}>
              <PageWrapper><Login /></PageWrapper>
            </Suspense>
          } />
          <Route path="dashboard" element={
            <Suspense fallback={<MinimalLoader />}>
              <PageWrapper><Dashboard /></PageWrapper>
            </Suspense>
          } />
          <Route path="admin" element={
            <Suspense fallback={<MinimalLoader />}>
              <PageWrapper><Admin /></PageWrapper>
            </Suspense>
          } />
          
          {/* Legal pages */}
          <Route path="privacy" element={
            <Suspense fallback={<MinimalLoader />}>
              <PageWrapper><About /></PageWrapper>
            </Suspense>
          } />
          <Route path="terms" element={
            <Suspense fallback={<MinimalLoader />}>
              <PageWrapper><About /></PageWrapper>
            </Suspense>
          } />
          <Route path="franchise" element={
            <Suspense fallback={<MinimalLoader />}>
              <PageWrapper><Contact /></PageWrapper>
            </Suspense>
          } />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;

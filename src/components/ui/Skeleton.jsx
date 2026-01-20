/**
 * Enhanced Skeleton Components
 * Beautiful loading placeholders with shimmer animations
 */

import { motion } from 'framer-motion';

// Base skeleton with shimmer
export const Skeleton = ({ className = '', animate = true }) => (
  <div
    className={`bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] rounded ${
      animate ? 'animate-shimmer' : ''
    } ${className}`}
  />
);

// Text skeleton with multiple lines
export const SkeletonText = ({ lines = 3, className = '' }) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton
        key={i}
        className={`h-4 ${i === lines - 1 ? 'w-3/4' : 'w-full'}`}
      />
    ))}
  </div>
);

// Card skeleton
export const SkeletonCard = ({ className = '', showImage = true }) => (
  <div className={`bg-white rounded-2xl overflow-hidden shadow-sm ${className}`}>
    {showImage && <Skeleton className="h-48 w-full rounded-none" />}
    <div className="p-6 space-y-4">
      <Skeleton className="h-6 w-3/4" />
      <SkeletonText lines={2} />
      <Skeleton className="h-10 w-32 rounded-lg" />
    </div>
  </div>
);

// Service card skeleton
export const SkeletonServiceCard = () => (
  <div className="bg-white rounded-2xl p-6 shadow-sm">
    <Skeleton className="w-14 h-14 rounded-xl mb-4" />
    <Skeleton className="h-6 w-3/4 mb-2" />
    <SkeletonText lines={2} />
    <Skeleton className="h-5 w-24 mt-4" />
  </div>
);

// Hero skeleton
export const SkeletonHero = () => (
  <div className="min-h-[90vh] bg-gradient-to-br from-secondary to-background flex items-center">
    <div className="container-custom w-full">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <Skeleton className="h-8 w-48 rounded-full" />
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-14 w-4/5" />
          <SkeletonText lines={3} />
          <div className="flex gap-4 pt-4">
            <Skeleton className="h-14 w-40 rounded-lg" />
            <Skeleton className="h-14 w-40 rounded-lg" />
          </div>
        </div>
        <div className="hidden lg:block">
          <Skeleton className="aspect-[4/5] rounded-3xl" />
        </div>
      </div>
    </div>
  </div>
);

// Testimonial skeleton
export const SkeletonTestimonial = () => (
  <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
    <div className="text-center space-y-6">
      <div className="flex justify-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="w-5 h-5 rounded" />
        ))}
      </div>
      <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
      <Skeleton className="h-6 w-4/5 max-w-xl mx-auto" />
      <div className="flex items-center justify-center gap-4 pt-4">
        <Skeleton className="w-14 h-14 rounded-full" />
        <div className="text-left space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </div>
  </div>
);

// Location card skeleton
export const SkeletonLocationCard = () => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
    <Skeleton className="h-40 w-full rounded-none" />
    <div className="p-6 space-y-4">
      <div className="space-y-1">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <Skeleton className="h-4 w-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-4 w-36" />
      </div>
      <div className="flex gap-3 pt-2">
        <Skeleton className="h-10 flex-1 rounded-lg" />
        <Skeleton className="h-10 w-12 rounded-lg" />
      </div>
    </div>
  </div>
);

// Avatar skeleton
export const SkeletonAvatar = ({ size = 'md' }) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };
  return <Skeleton className={`${sizes[size]} rounded-full`} />;
};

// Grid skeleton
export const SkeletonGrid = ({ count = 6, columns = 3 }) => (
  <div className={`grid md:grid-cols-2 lg:grid-cols-${columns} gap-6`}>
    {Array.from({ length: count }).map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.05 }}
      >
        <SkeletonServiceCard />
      </motion.div>
    ))}
  </div>
);

// Page skeleton wrapper
export const SkeletonPage = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
  >
    {children}
  </motion.div>
);

// Loading spinner
export const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizes = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' };
  return (
    <motion.div
      className={`${sizes[size]} border-2 border-primary/20 border-t-primary rounded-full ${className}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
    />
  );
};

// Full page loader
export const PageLoader = () => (
  <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      <LoadingSpinner size="lg" className="mx-auto mb-4" />
      <motion.p
        className="text-primary font-medium"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Loading...
      </motion.p>
    </motion.div>
  </div>
);

export default Skeleton;

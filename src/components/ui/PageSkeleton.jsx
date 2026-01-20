/**
 * Page Skeleton Components
 * Loading states for all pages
 */

import { motion } from 'framer-motion';

// Shimmer animation
const Shimmer = ({ className = '' }) => (
  <div className={`bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-pulse rounded ${className}`} />
);

// Hero Skeleton
export const HeroSkeleton = () => (
  <div className="bg-gradient-to-br from-secondary to-background py-8 sm:py-12 md:py-16">
    <div className="container-custom">
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <div className="text-center lg:text-left space-y-4">
          <Shimmer className="h-8 w-40 mx-auto lg:mx-0 rounded-full" />
          <Shimmer className="h-12 sm:h-16 w-full max-w-md mx-auto lg:mx-0" />
          <Shimmer className="h-12 sm:h-16 w-3/4 max-w-sm mx-auto lg:mx-0" />
          <Shimmer className="h-5 w-full max-w-lg mx-auto lg:mx-0" />
          <Shimmer className="h-5 w-2/3 max-w-md mx-auto lg:mx-0" />
          <div className="flex gap-4 justify-center lg:justify-start pt-4">
            <Shimmer className="h-12 w-32 rounded-lg" />
            <Shimmer className="h-12 w-32 rounded-lg" />
          </div>
        </div>
        <div className="max-w-sm mx-auto lg:max-w-none">
          <Shimmer className="aspect-[4/5] rounded-2xl" />
        </div>
      </div>
    </div>
  </div>
);

// Service Card Skeleton
export const ServiceCardSkeleton = () => (
  <div className="bg-white rounded-xl overflow-hidden shadow-sm">
    <Shimmer className="aspect-[4/3]" />
    <div className="p-4 sm:p-5 text-center space-y-3">
      <Shimmer className="h-6 w-3/4 mx-auto" />
      <Shimmer className="h-4 w-20 mx-auto" />
      <Shimmer className="h-10 w-32 mx-auto rounded-md" />
    </div>
  </div>
);

// Services Grid Skeleton
export const ServicesGridSkeleton = ({ count = 6 }) => (
  <div className="py-10 sm:py-14 bg-background">
    <div className="container-custom">
      <div className="text-center mb-8 sm:mb-10 space-y-2">
        <Shimmer className="h-4 w-32 mx-auto" />
        <Shimmer className="h-10 w-64 mx-auto" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {[...Array(count)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <ServiceCardSkeleton />
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

// Testimonial Skeleton
export const TestimonialSkeleton = () => (
  <div className="py-12 md:py-16 bg-gradient-to-br from-primary/5 to-accent/5">
    <div className="container-custom">
      <div className="text-center mb-8 space-y-2">
        <Shimmer className="h-4 w-24 mx-auto" />
        <Shimmer className="h-10 w-56 mx-auto" />
      </div>
      <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6 sm:p-8 shadow-lg">
        <div className="text-center space-y-4">
          <div className="flex justify-center gap-1">
            {[...Array(5)].map((_, i) => <Shimmer key={i} className="w-4 h-4" />)}
          </div>
          <Shimmer className="h-5 w-full" />
          <Shimmer className="h-5 w-4/5 mx-auto" />
          <div className="flex items-center justify-center gap-3 pt-4">
            <Shimmer className="w-12 h-12 rounded-full" />
            <div className="space-y-2 text-left">
              <Shimmer className="h-4 w-24" />
              <Shimmer className="h-3 w-20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Location Card Skeleton
export const LocationCardSkeleton = () => (
  <div className="bg-white rounded-xl overflow-hidden shadow-sm">
    <Shimmer className="h-36 sm:h-40" />
    <div className="p-4 space-y-3">
      <Shimmer className="h-5 w-3/4" />
      <Shimmer className="h-4 w-1/2" />
      <Shimmer className="h-4 w-full" />
      <div className="flex gap-4">
        <Shimmer className="h-3 w-24" />
        <Shimmer className="h-3 w-20" />
      </div>
      <Shimmer className="h-10 w-full rounded-lg" />
    </div>
  </div>
);

// Full Page Skeleton
export const PageSkeleton = () => (
  <div className="min-h-screen">
    <HeroSkeleton />
    <ServicesGridSkeleton count={6} />
    <TestimonialSkeleton />
  </div>
);

// About Page Skeleton
export const AboutPageSkeleton = () => (
  <div className="py-12 md:py-16">
    <div className="container-custom">
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <Shimmer className="aspect-[4/3] rounded-2xl" />
        <div className="space-y-4">
          <Shimmer className="h-4 w-24" />
          <Shimmer className="h-10 w-3/4" />
          <Shimmer className="h-5 w-full" />
          <Shimmer className="h-5 w-full" />
          <Shimmer className="h-5 w-2/3" />
          <div className="grid grid-cols-2 gap-4 pt-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Shimmer className="w-10 h-10 rounded-lg" />
                <Shimmer className="h-4 w-20" />
              </div>
            ))}
          </div>
          <Shimmer className="h-12 w-36 rounded-lg mt-4" />
        </div>
      </div>
    </div>
  </div>
);

// Contact Page Skeleton
export const ContactPageSkeleton = () => (
  <div className="py-12 md:py-16 bg-gradient-to-br from-secondary to-background">
    <div className="container-custom">
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Shimmer className="h-10 w-48" />
          <Shimmer className="h-5 w-full max-w-md" />
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-start gap-4">
              <Shimmer className="w-12 h-12 rounded-xl" />
              <div className="space-y-2">
                <Shimmer className="h-3 w-16" />
                <Shimmer className="h-5 w-32" />
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg space-y-5">
          <Shimmer className="h-8 w-48" />
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Shimmer className="h-4 w-20" />
              <Shimmer className="h-12 w-full rounded-lg" />
            </div>
          ))}
          <Shimmer className="h-12 w-full rounded-lg" />
        </div>
      </div>
    </div>
  </div>
);

export default PageSkeleton;

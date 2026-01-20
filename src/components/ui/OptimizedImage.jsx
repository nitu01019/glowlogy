/**
 * OptimizedImage Component
 * Shows skeleton shimmer while image loads, then smooth fade in
 */

import { useState, memo } from 'react';

export const OptimizedImage = memo(({
  src,
  alt,
  className = '',
  wrapperClassName = '',
  aspectRatio = '4/3',
  priority = false,
  rounded = 'rounded-xl',
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div 
        className={`bg-gradient-to-br from-secondary to-accent/30 flex items-center justify-center ${rounded} ${wrapperClassName}`}
        style={{ aspectRatio }}
      >
        <span className="text-primary/40 text-xs">Image</span>
      </div>
    );
  }

  return (
    <div 
      className={`relative overflow-hidden ${rounded} ${wrapperClassName}`}
      style={{ aspectRatio }}
    >
      {/* Skeleton shimmer - shows while loading */}
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"
            style={{
              backgroundSize: '200% 100%',
            }}
          />
        </div>
      )}
      
      {/* Main image with native lazy loading */}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </div>
  );
});

OptimizedImage.displayName = 'OptimizedImage';

// Simple image preloader
export const ImagePreloader = ({ images }) => {
  if (typeof window !== 'undefined') {
    images.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }
  return null;
};

// Image with skeleton for any image element
export const ImageWithSkeleton = memo(({
  src,
  alt,
  className = '',
  imgClassName = '',
  aspectRatio,
  referrerPolicy,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`} style={aspectRatio ? { aspectRatio } : {}}>
      {/* Skeleton shimmer */}
      {!loaded && !error && (
        <div className="absolute inset-0 bg-gray-200 rounded-inherit">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"
            style={{ backgroundSize: '200% 100%' }}
          />
        </div>
      )}
      
      {/* Image */}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'} ${imgClassName}`}
        loading="lazy"
        decoding="async"
        referrerPolicy={referrerPolicy}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
      
      {/* Error fallback */}
      {error && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
          <span className="text-primary/40 text-sm">No Image</span>
        </div>
      )}
    </div>
  );
});

ImageWithSkeleton.displayName = 'ImageWithSkeleton';

export default OptimizedImage;

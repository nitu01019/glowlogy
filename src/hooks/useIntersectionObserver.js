/**
 * useIntersectionObserver Hook
 * Optimized intersection observer for animations
 */

import { useState, useEffect, useRef, useCallback } from 'react';

export const useIntersectionObserver = (options = {}) => {
  const {
    threshold = 0.1,
    root = null,
    rootMargin = '50px',
    triggerOnce = true,
  } = options;

  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    // Skip if already triggered and triggerOnce is true
    if (triggerOnce && hasIntersected) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;
        setIsIntersecting(isVisible);
        
        if (isVisible && triggerOnce) {
          setHasIntersected(true);
          observer.disconnect();
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [threshold, root, rootMargin, triggerOnce, hasIntersected]);

  return { ref: targetRef, isIntersecting, hasIntersected };
};

// Hook for animating elements when they come into view
export const useAnimateOnScroll = (options = {}) => {
  const { ref, isIntersecting, hasIntersected } = useIntersectionObserver(options);
  
  return {
    ref,
    isVisible: options.triggerOnce !== false ? hasIntersected : isIntersecting,
    animationProps: {
      initial: { opacity: 0, y: 20 },
      animate: (options.triggerOnce !== false ? hasIntersected : isIntersecting)
        ? { opacity: 1, y: 0 }
        : { opacity: 0, y: 20 },
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };
};

// Hook for lazy loading images
export const useLazyLoad = (src, options = {}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(options.placeholder || '');
  const { ref, isIntersecting } = useIntersectionObserver({
    ...options,
    rootMargin: '200px',
  });

  useEffect(() => {
    if (!isIntersecting || isLoaded) return;

    const img = new Image();
    img.src = src;
    img.onload = () => {
      setCurrentSrc(src);
      setIsLoaded(true);
    };
  }, [isIntersecting, src, isLoaded]);

  return { ref, src: currentSrc, isLoaded };
};

// Hook for staggered animations
export const useStaggerAnimation = (itemCount, options = {}) => {
  const { delay = 0.05, duration = 0.4 } = options;
  const { ref, isIntersecting } = useIntersectionObserver(options);

  const getItemProps = useCallback((index) => ({
    initial: { opacity: 0, y: 20 },
    animate: isIntersecting
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 20 },
    transition: {
      duration,
      delay: index * delay,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }), [isIntersecting, delay, duration]);

  return { ref, isVisible: isIntersecting, getItemProps };
};

export default useIntersectionObserver;

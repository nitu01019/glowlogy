/**
 * Cache Service
 * In-memory and localStorage caching for high-traffic optimization
 * Supports millions of requests with minimal Firestore reads
 */

// In-memory cache for instant access
const memoryCache = new Map();

// Cache configuration
const CACHE_CONFIG = {
  services: { ttl: 5 * 60 * 1000, key: 'glowlogy_services' }, // 5 minutes
  locations: { ttl: 10 * 60 * 1000, key: 'glowlogy_locations' }, // 10 minutes
  testimonials: { ttl: 15 * 60 * 1000, key: 'glowlogy_testimonials' }, // 15 minutes
  bookings: { ttl: 1 * 60 * 1000, key: 'glowlogy_bookings' }, // 1 minute
  settings: { ttl: 30 * 60 * 1000, key: 'glowlogy_settings' }, // 30 minutes
};

// Get from memory cache (fastest)
export const getFromMemory = (key) => {
  const item = memoryCache.get(key);
  if (!item) return null;
  if (Date.now() > item.expiry) {
    memoryCache.delete(key);
    return null;
  }
  return item.data;
};

// Set to memory cache
export const setToMemory = (key, data, ttl) => {
  memoryCache.set(key, {
    data,
    expiry: Date.now() + ttl,
  });
};

// Get from localStorage (persists across sessions)
export const getFromStorage = (key) => {
  try {
    const item = localStorage.getItem(key);
    if (!item) return null;
    const { data, expiry } = JSON.parse(item);
    if (Date.now() > expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return data;
  } catch {
    return null;
  }
};

// Set to localStorage
export const setToStorage = (key, data, ttl) => {
  try {
    localStorage.setItem(key, JSON.stringify({
      data,
      expiry: Date.now() + ttl,
    }));
  } catch (e) {
    // Storage full - clear old items
    clearOldCache();
  }
};

// Clear old cache items
export const clearOldCache = () => {
  const keys = Object.keys(localStorage).filter(k => k.startsWith('glowlogy_'));
  keys.forEach(key => {
    try {
      const item = JSON.parse(localStorage.getItem(key));
      if (item && Date.now() > item.expiry) {
        localStorage.removeItem(key);
      }
    } catch {
      localStorage.removeItem(key);
    }
  });
};

// Multi-layer cache getter
export const getCached = (cacheKey) => {
  const config = CACHE_CONFIG[cacheKey];
  if (!config) return null;
  
  // Try memory first (fastest)
  let data = getFromMemory(config.key);
  if (data) return { data, source: 'memory' };
  
  // Try localStorage (fast)
  data = getFromStorage(config.key);
  if (data) {
    // Populate memory cache
    setToMemory(config.key, data, config.ttl);
    return { data, source: 'storage' };
  }
  
  return null;
};

// Multi-layer cache setter
export const setCached = (cacheKey, data) => {
  const config = CACHE_CONFIG[cacheKey];
  if (!config) return;
  
  setToMemory(config.key, data, config.ttl);
  setToStorage(config.key, data, config.ttl);
};

// Invalidate specific cache
export const invalidateCache = (cacheKey) => {
  const config = CACHE_CONFIG[cacheKey];
  if (!config) return;
  
  memoryCache.delete(config.key);
  localStorage.removeItem(config.key);
};

// Clear all caches
export const clearAllCache = () => {
  memoryCache.clear();
  Object.values(CACHE_CONFIG).forEach(config => {
    localStorage.removeItem(config.key);
  });
};

// Request deduplication - prevents duplicate requests
const pendingRequests = new Map();

export const dedupeRequest = async (key, fetchFn) => {
  // If request is already pending, return the same promise
  if (pendingRequests.has(key)) {
    return pendingRequests.get(key);
  }
  
  // Create new request
  const promise = fetchFn().finally(() => {
    pendingRequests.delete(key);
  });
  
  pendingRequests.set(key, promise);
  return promise;
};

// Batch requests - combine multiple requests into one
const batchQueue = new Map();
const BATCH_DELAY = 50; // ms

export const batchRequest = (collection, ids, fetchFn) => {
  return new Promise((resolve) => {
    if (!batchQueue.has(collection)) {
      batchQueue.set(collection, { ids: new Set(), resolvers: [] });
      
      // Process batch after delay
      setTimeout(async () => {
        const batch = batchQueue.get(collection);
        batchQueue.delete(collection);
        
        const uniqueIds = Array.from(batch.ids);
        const results = await fetchFn(uniqueIds);
        
        batch.resolvers.forEach(({ ids: requestIds, resolve }) => {
          const filtered = results.filter(r => requestIds.includes(r.id));
          resolve(filtered);
        });
      }, BATCH_DELAY);
    }
    
    const batch = batchQueue.get(collection);
    ids.forEach(id => batch.ids.add(id));
    batch.resolvers.push({ ids, resolve });
  });
};

export default {
  getCached,
  setCached,
  invalidateCache,
  clearAllCache,
  dedupeRequest,
  batchRequest,
};

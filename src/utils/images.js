/**
 * Optimized Image URLs
 * Using smaller, compressed images for fast loading
 * All images are from Unsplash with optimized parameters
 */

// Helper to generate optimized URLs
const img = (id, w = 400, q = 75) => 
  `https://images.unsplash.com/photo-${id}?w=${w}&q=${q}&auto=format&fit=crop`;

// Tiny placeholder (20px width, very low quality)
const tiny = (id) => 
  `https://images.unsplash.com/photo-${id}?w=20&q=10&auto=format&fit=crop`;

export const IMAGES = {
  // Hero - larger for hero section
  hero: {
    main: img('1544161515-4ab6ce6db874', 800, 80),
    mobile: img('1544161515-4ab6ce6db874', 400, 70),
    placeholder: tiny('1544161515-4ab6ce6db874'),
  },

  // Service Categories - Tattva style massage images
  services: {
    massage: img('1600334089648-b0d9d3028eb2', 400, 75),
    facial: img('1570172619644-dfd03ed5d881', 400, 75),
    body: img('1515377905703-c4788e51af15', 400, 75),
    hair: img('1560066984-138dadb4c035', 400, 75),
    nails: img('1604654894610-df63bc536371', 400, 75),
    wellness: img('1545205597-3d9d02c29597', 400, 75),
  },

  // Massage Types - Like Tattva spa images
  massages: {
    swedish: img('1519823551278-64ac92734fb1', 400, 75),
    deepTissue: img('1544161515-4ab6ce6db874', 400, 75),
    hotStone: img('1600334089648-b0d9d3028eb2', 400, 75),
    aromatherapy: img('1507652313519-d4e9174996dd', 400, 75),
    thai: img('1519824145371-296894a0daa9', 400, 75),
    couples: img('1540555700478-4be289fbecef', 400, 75),
    jetLag: img('1591343395082-e120087004b4', 400, 75),
    abhyanga: img('1515377905703-c4788e51af15', 400, 75),
  },

  // Spa Ambiance
  ambiance: {
    reception: img('1560750588-73207b1ef5b8', 400, 75),
    room: img('1596178060671-7a80dc8059ea', 400, 75),
    pool: img('1571019613454-1cb2f99b2d8b', 400, 75),
    lounge: img('1559599101-f09722fb4948', 400, 75),
  },

  // Products
  products: {
    oils: img('1608571423902-eed4a5ad8108', 300, 70),
    candles: img('1602607718679-fe4f4e30cc61', 300, 70),
  },

  // Avatars - small
  avatars: {
    female1: img('1494790108377-be9c29b29330', 100, 70),
    female2: img('1438761681033-6461ffad8d80', 100, 70),
    male1: img('1507003211169-0a1dd7228f2d', 100, 70),
    male2: img('1472099645785-5658abf4ff4e', 100, 70),
  },

  // Locations
  locations: {
    delhi: img('1560750588-73207b1ef5b8', 350, 70),
    mumbai: img('1596178060671-7a80dc8059ea', 350, 70),
    bangalore: img('1571019613454-1cb2f99b2d8b', 350, 70),
  },
};

// Preload critical images immediately
export const preloadCriticalImages = () => {
  const critical = [
    IMAGES.hero.mobile, // Mobile first
    IMAGES.services.massage,
    IMAGES.services.facial,
  ];
  
  critical.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

// Get responsive image URL based on screen width
export const getResponsiveImage = (baseUrl, screenWidth) => {
  if (screenWidth < 480) return baseUrl.replace(/w=\d+/, 'w=300');
  if (screenWidth < 768) return baseUrl.replace(/w=\d+/, 'w=400');
  return baseUrl;
};

export default IMAGES;

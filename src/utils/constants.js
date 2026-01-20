/**
 * Application Constants
 */

export const APP_NAME = 'Glowlogy';
export const APP_TAGLINE = 'Your Journey to Wellness';

export const CONTACT_INFO = {
  phone: '+91 98765 43210',
  email: 'info@glowlogy.com',
  address: 'Gandhi Nagar, Jammu, J&K, India'
};

export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/glowlogy',
  instagram: 'https://instagram.com/glowlogy',
  twitter: 'https://twitter.com/glowlogy',
  youtube: 'https://youtube.com/glowlogy'
};

export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

export const SERVICE_CATEGORIES = [
  { id: 'massage', name: 'Massage Therapy', icon: 'Sparkles' },
  { id: 'facial', name: 'Facial Treatments', icon: 'Heart' },
  { id: 'body', name: 'Body Treatments', icon: 'Leaf' },
  { id: 'ayurveda', name: 'Ayurveda', icon: 'Sun' },
  { id: 'wellness', name: 'Wellness Programs', icon: 'Activity' },
  { id: 'packages', name: 'Spa Packages', icon: 'Gift' }
];

export const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/services', label: 'Services' },
  { path: '/locations', label: 'Locations' },
  { path: '/about', label: 'About Us' },
  { path: '/membership', label: 'Membership' },
  { path: '/contact', label: 'Contact' }
];

export const FOOTER_LINKS = {
  services: [
    { path: '/services/massage', label: 'Massage Therapy' },
    { path: '/services/facial', label: 'Facial Treatments' },
    { path: '/services/body', label: 'Body Treatments' },
    { path: '/services/ayurveda', label: 'Ayurveda' },
    { path: '/services/wellness', label: 'Wellness Programs' }
  ],
  company: [
    { path: '/about', label: 'About Us' },
    { path: '/careers', label: 'Careers' },
    { path: '/franchise', label: 'Franchise' },
    { path: '/corporate', label: 'Corporate Wellness' },
    { path: '/gift-cards', label: 'Gift Cards' }
  ],
  support: [
    { path: '/contact', label: 'Contact Us' },
    { path: '/faq', label: 'FAQ' },
    { path: '/privacy', label: 'Privacy Policy' },
    { path: '/terms', label: 'Terms & Conditions' }
  ]
};

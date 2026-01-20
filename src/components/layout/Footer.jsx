/**
 * Footer Component
 * Mobile-friendly footer
 */

import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const footerLinks = {
  services: [
    { label: 'Massage', to: '/services/massage' },
    { label: 'Facials', to: '/services/facials' },
    { label: 'Body Treatments', to: '/services/body' },
    { label: 'Wellness', to: '/services/wellness' },
  ],
  company: [
    { label: 'About Us', to: '/about' },
    { label: 'Locations', to: '/locations' },
    { label: 'Careers', to: '/careers' },
    { label: 'Contact', to: '/contact' },
  ],
  support: [
    { label: 'FAQs', to: '/faq' },
    { label: 'Gift Cards', to: '/gift-cards' },
    { label: 'Membership', to: '/membership' },
    { label: 'Corporate', to: '/corporate' },
  ],
};

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main footer */}
      <div className="container-custom py-10 sm:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-heading font-bold text-white">Glowlogy</span>
            </Link>
            <p className="text-gray-400 text-sm mb-4 max-w-xs">
              Experience the art of wellness at Glowlogy. Premium spa services in Jammu for your complete rejuvenation.
            </p>
            
            {/* Contact */}
            <div className="space-y-2 text-sm">
              <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-white">
                <Phone size={14} /> +91 98765 43210
              </a>
              <a href="mailto:hello@glowlogy.com" className="flex items-center gap-2 hover:text-white">
                <Mail size={14} /> hello@glowlogy.com
              </a>
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin size={14} /> Gandhi Nagar, Jammu, J&K
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Services</h4>
            <ul className="space-y-2 text-sm">
              {footerLinks.services.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Company</h4>
            <ul className="space-y-2 text-sm">
              {footerLinks.company.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Support</h4>
            <ul className="space-y-2 text-sm">
              {footerLinks.support.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-4 sm:py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500 text-center sm:text-left">
              © {new Date().getFullYear()} Glowlogy. All rights reserved.
            </p>
            
            {/* Social */}
            <div className="flex items-center gap-3">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
            
            {/* Legal */}
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <Link to="/privacy" className="hover:text-white">Privacy</Link>
              <Link to="/terms" className="hover:text-white">Terms</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

/**
 * Locations Page
 */

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Navigation, Search } from 'lucide-react';
import { Button } from '../components/ui';
import { CTA } from '../components/sections';
import { SEO } from '../components/common';

// Jammu locations only
const locations = [
  { 
    id: 'jammu-gandhi-nagar', 
    name: 'Gandhi Nagar', 
    city: 'Jammu', 
    address: 'Main Road, Gandhi Nagar, Jammu - 180004', 
    phone: '+91 98765 43210', 
    hours: '9:00 AM - 8:00 PM', 
    featured: true,
    mapUrl: 'https://maps.google.com/?q=Gandhi+Nagar+Jammu',
    coordinates: { lat: 32.7266, lng: 74.8570 }
  },
  { 
    id: 'jammu-channi-himmat', 
    name: 'Channi Himmat', 
    city: 'Jammu', 
    address: 'Near Channi Himmat Crossing, Jammu - 180015', 
    phone: '+91 98765 43211', 
    hours: '9:00 AM - 8:00 PM', 
    featured: true,
    mapUrl: 'https://maps.google.com/?q=Channi+Himmat+Jammu',
    coordinates: { lat: 32.6942, lng: 74.8722 }
  },
  { 
    id: 'jammu-kachi-chawni', 
    name: 'Kachi Chawni', 
    city: 'Jammu', 
    address: 'Kachi Chawni Main Market, Jammu - 180001', 
    phone: '+91 98765 43212', 
    hours: '9:00 AM - 8:00 PM', 
    featured: false,
    mapUrl: 'https://maps.google.com/?q=Kachi+Chawni+Jammu',
    coordinates: { lat: 32.7357, lng: 74.8691 }
  },
];

const cities = ['All Areas', 'Gandhi Nagar', 'Channi Himmat', 'Kachi Chawni'];

const Locations = () => {
  const { id } = useParams();
  const [selectedArea, setSelectedArea] = useState('All Areas');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLocations = locations.filter(loc => {
    const matchesArea = selectedArea === 'All Areas' || loc.name === selectedArea;
    const matchesSearch = loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          loc.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesArea && matchesSearch;
  });

  const openDirections = (location) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${location.coordinates.lat},${location.coordinates.lng}`;
    window.open(url, '_blank');
  };

  return (
    <>
      <SEO title="Locations - Glowlogy" description="Find a Glowlogy spa near you" />
      
      {/* Hero */}
      <section className="pt-8 pb-16 bg-gradient-to-br from-secondary to-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <h1 className="font-heading font-bold text-gray-900 mb-4">Our Locations in Jammu</h1>
            <p className="text-lg text-gray-600">
              Visit any of our Glowlogy spas across Jammu. Each location offers our full range of premium wellness services in a serene, welcoming environment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 bg-white border-b sticky top-20 z-30">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
              {cities.map((area) => (
                <button
                  key={area}
                  onClick={() => setSelectedArea(area)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedArea === area
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {area}
                </button>
              ))}
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="section-padding bg-background-alt">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLocations.map((location, index) => (
              <motion.div
                key={location.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                  location.featured ? 'ring-2 ring-primary' : ''
                }`}
              >
                {/* Map Preview */}
                <div className="h-40 bg-gradient-to-br from-secondary to-accent/20 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <MapPin className="w-10 h-10 text-primary/50" />
                  </div>
                  {location.featured && (
                    <span className="absolute top-3 right-3 px-3 py-1 bg-primary text-white text-xs font-medium rounded-full">
                      Featured
                    </span>
                  )}
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{location.name}</h3>
                    <p className="text-primary font-medium">{location.city}</p>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">{location.address}</p>

                  <div className="space-y-2 text-sm mb-6">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Phone size={14} />
                      <a href={`tel:${location.phone}`} className="hover:text-primary">{location.phone}</a>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <Clock size={14} />
                      {location.hours}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button to={`/book?location=${location.id}`} size="small" className="flex-1">
                      Book Here
                    </Button>
                    <button 
                      onClick={() => openDirections(location)}
                      className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:border-primary hover:text-primary transition-colors"
                      title="Get Directions"
                    >
                      <Navigation size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredLocations.length === 0 && (
            <div className="text-center py-16">
              <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No locations found in this area.</p>
            </div>
          )}
        </div>
      </section>

      <CTA title="Want Glowlogy in Your Area?" subtitle="We're expanding across Jammu & Kashmir! Leave your details and we'll notify you when we open near you." />
    </>
  );
};

export default Locations;

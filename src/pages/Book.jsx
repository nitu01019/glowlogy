/**
 * Book Page
 * Appointment booking flow with Firebase integration
 * Pre-fills user info when logged in
 */

import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, User, CreditCard, CheckCircle, ArrowLeft, ArrowRight, AlertCircle, Info } from 'lucide-react';
import { Button, Input } from '../components/ui';
import { SEO } from '../components/common';
import { createBooking, getUserBookings } from '../services/bookingService';
import { useAuth } from '../context/AuthContext';

const steps = ['Location', 'Service', 'Date & Time', 'Details', 'Confirm'];

// Jammu locations only
const locations = [
  { id: 'jammu-gandhi-nagar', name: 'Gandhi Nagar', city: 'Jammu', address: 'Main Road, Gandhi Nagar, Jammu - 180004', phone: '+91 98765 43210' },
  { id: 'jammu-channi-himmat', name: 'Channi Himmat', city: 'Jammu', address: 'Near Channi Himmat Crossing, Jammu - 180015', phone: '+91 98765 43211' },
  { id: 'jammu-kachi-chawni', name: 'Kachi Chawni', city: 'Jammu', address: 'Kachi Chawni Main Market, Jammu - 180001', phone: '+91 98765 43212' },
];

const services = [
  { id: 1, name: 'Swedish Massage', duration: '60 min', price: 2500, description: 'Classic relaxation massage' },
  { id: 2, name: 'Deep Tissue Massage', duration: '75 min', price: 3500, description: 'Therapeutic deep muscle relief' },
  { id: 3, name: 'Signature Glow Facial', duration: '60 min', price: 3000, description: 'Premium facial treatment' },
  { id: 4, name: 'Hot Stone Therapy', duration: '90 min', price: 4000, description: 'Heated stone relaxation' },
  { id: 5, name: 'Ayurvedic Abhyanga', duration: '90 min', price: 4500, description: 'Traditional oil massage' },
  { id: 6, name: 'Body Scrub & Wrap', duration: '75 min', price: 3500, description: 'Full body exfoliation' },
];

const timeSlots = ['9:00 AM', '10:30 AM', '12:00 PM', '2:00 PM', '3:30 PM', '5:00 PM', '6:30 PM'];

const Book = () => {
  const [searchParams] = useSearchParams();
  const preselectedLocation = searchParams.get('location');
  const { user, userData, isAuthenticated } = useAuth();
  
  const [currentStep, setCurrentStep] = useState(preselectedLocation ? 1 : 0);
  const [booking, setBooking] = useState({
    location: locations.find(l => l.id === preselectedLocation) || null,
    service: null,
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
  });
  const [isComplete, setIsComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [bookingId, setBookingId] = useState('');
  const [existingBookings, setExistingBookings] = useState([]);

  // Pre-fill user data when logged in
  useEffect(() => {
    if (isAuthenticated && user) {
      setBooking(prev => ({
        ...prev,
        name: prev.name || userData?.name || user.displayName || '',
        email: prev.email || user.email || '',
        phone: prev.phone || userData?.phone || '',
      }));

      // Fetch existing bookings for logged-in user
      const fetchExistingBookings = async () => {
        try {
          const bookings = await getUserBookings(user.email, false);
          const upcomingBookings = bookings.filter(b => 
            ['pending', 'confirmed'].includes(b.status) && new Date(b.date) >= new Date()
          );
          setExistingBookings(upcomingBookings);
        } catch (err) {
          console.error('Error fetching existing bookings:', err);
        }
      };
      fetchExistingBookings();
    }
  }, [isAuthenticated, user, userData]);

  const nextStep = () => {
    setError('');
    // Validation
    if (currentStep === 0 && !booking.location) {
      setError('Please select a location');
      return;
    }
    if (currentStep === 1 && !booking.service) {
      setError('Please select a service');
      return;
    }
    if (currentStep === 2 && (!booking.date || !booking.time)) {
      setError('Please select both date and time');
      return;
    }
    if (currentStep === 3) {
      if (!booking.name || !booking.email || !booking.phone) {
        setError('Please fill in all details');
        return;
      }
      // Basic email validation
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(booking.email)) {
        setError('Please enter a valid email address');
        return;
      }
      // Basic phone validation
      if (!/^[+]?[\d\s-]{10,}$/.test(booking.phone)) {
        setError('Please enter a valid phone number');
        return;
      }
    }
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };
  
  const prevStep = () => {
    setError('');
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const bookingData = {
        locationId: booking.location.id,
        locationName: booking.location.name,
        locationAddress: booking.location.address,
        serviceId: booking.service.id,
        serviceName: booking.service.name,
        serviceDuration: booking.service.duration,
        servicePrice: booking.service.price,
        date: booking.date,
        time: booking.time,
        customerName: booking.name,
        email: booking.email,
        phone: booking.phone,
        // Add user ID if logged in for proper isolation
        userId: user?.uid || null,
      };
      
      const result = await createBooking(bookingData);
      setBookingId(result.bookingId);
      setIsComplete(true);
    } catch (err) {
      console.error('Booking error:', err);
      setError(err.message || 'Failed to create booking. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Format date for display
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  if (isComplete) {
    return (
      <>
        <SEO title="Booking Confirmed - Glowlogy" />
        <section className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-secondary to-background">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md mx-auto p-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6"
            >
              <CheckCircle className="w-12 h-12 text-green-500" />
            </motion.div>
            <h1 className="text-3xl font-heading font-bold text-gray-900 mb-4">Booking Confirmed!</h1>
            {bookingId && (
              <p className="text-primary font-semibold mb-2">Booking ID: {bookingId}</p>
            )}
            <p className="text-gray-600 mb-2">
              We've sent a confirmation to <strong>{booking.email}</strong>
            </p>
            <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
              <p className="text-sm text-gray-500 mb-1">Location</p>
              <p className="font-medium text-gray-900 mb-3">{booking.location?.name}, Jammu</p>
              <p className="text-sm text-gray-500 mb-1">Service</p>
              <p className="font-medium text-gray-900 mb-3">{booking.service?.name}</p>
              <p className="text-sm text-gray-500 mb-1">Date & Time</p>
              <p className="font-medium text-gray-900">{booking.date} at {booking.time}</p>
            </div>
            <p className="text-gray-500 text-sm mb-6">
              See you soon at Glowlogy {booking.location?.name}!
            </p>
            <div className="flex gap-3 justify-center">
              <Button to="/">Back to Home</Button>
              <Button to="/dashboard" variant="outline">View Bookings</Button>
            </div>
          </motion.div>
        </section>
      </>
    );
  }

  return (
    <>
      <SEO title="Book Appointment - Glowlogy" />
      
      <section className="section-padding bg-gradient-to-br from-secondary to-background min-h-screen">
        <div className="container-custom max-w-3xl">
          {/* Login Prompt for non-logged in users */}
          {!isAuthenticated && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 text-blue-700">
                <Info size={20} className="flex-shrink-0" />
                <span className="text-sm">Login to save your bookings and track appointments</span>
              </div>
              <Link to="/login" className="text-sm font-medium text-blue-700 hover:text-blue-800 whitespace-nowrap">
                Login / Sign Up →
              </Link>
            </motion.div>
          )}

          {/* Existing Bookings Banner */}
          {isAuthenticated && existingBookings.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl"
            >
              <div className="flex items-start gap-3">
                <Calendar size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-amber-800">
                    You have {existingBookings.length} upcoming booking{existingBookings.length !== 1 ? 's' : ''}
                  </p>
                  <div className="mt-2 space-y-1">
                    {existingBookings.slice(0, 2).map((b) => (
                      <p key={b.id} className="text-xs text-amber-700">
                        • {b.serviceName} on {formatDate(b.date)} at {b.time}
                      </p>
                    ))}
                    {existingBookings.length > 2 && (
                      <p className="text-xs text-amber-600">+{existingBookings.length - 2} more</p>
                    )}
                  </div>
                  <Link to="/dashboard" className="inline-block mt-2 text-xs font-medium text-amber-700 hover:text-amber-800">
                    View all bookings →
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

          {/* Progress Steps */}
          <div className="mb-10">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step} className="flex items-center">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all
                    ${index <= currentStep ? 'bg-primary text-white' : 'bg-white text-gray-400 border-2 border-gray-200'}
                  `}>
                    {index < currentStep ? <CheckCircle size={20} /> : index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`hidden sm:block w-20 md:w-32 h-1 mx-2 rounded ${
                      index < currentStep ? 'bg-primary' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="hidden sm:flex justify-between mt-2">
              {steps.map((step) => (
                <span key={step} className="text-sm text-gray-500">{step}</span>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <motion.div
            className="bg-white rounded-3xl p-8 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Error Display */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700"
              >
                <AlertCircle size={20} />
                <span>{error}</span>
              </motion.div>
            )}

            <AnimatePresence mode="wait">
              {/* Step 0: Location Selection */}
              {currentStep === 0 && (
                <motion.div key="step0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h2 className="text-2xl font-heading font-bold mb-2">Choose Location</h2>
                  <p className="text-gray-500 mb-6">Select your preferred Glowlogy spa in Jammu</p>
                  <div className="grid gap-4">
                    {locations.map((location) => (
                      <button
                        key={location.id}
                        onClick={() => setBooking({ ...booking, location })}
                        className={`p-5 rounded-xl border-2 text-left transition-all ${
                          booking.location?.id === location.id
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-100 hover:border-primary/30'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <MapPin className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{location.name}</h4>
                            <p className="text-sm text-primary font-medium">{location.city}</p>
                            <p className="text-sm text-gray-500 mt-1">{location.address}</p>
                          </div>
                          {booking.location?.id === location.id && (
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 1: Service Selection */}
              {currentStep === 1 && (
                <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h2 className="text-2xl font-heading font-bold mb-2">Choose a Service</h2>
                  <p className="text-gray-500 mb-6">at {booking.location?.name}, Jammu</p>
                  <div className="grid gap-4">
                    {services.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => setBooking({ ...booking, service })}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          booking.service?.id === service.id
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-100 hover:border-primary/30'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-gray-900">{service.name}</h4>
                            <p className="text-sm text-gray-500">{service.duration} • {service.description}</p>
                          </div>
                          <span className="text-primary font-semibold">₹{service.price.toLocaleString()}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Date & Time */}
              {currentStep === 2 && (
                <motion.div key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h2 className="text-2xl font-heading font-bold mb-6">Select Date & Time</h2>
                  <div className="mb-6">
                    <Input
                      label="Select Date"
                      type="date"
                      value={booking.date}
                      onChange={(e) => setBooking({ ...booking, date: e.target.value })}
                      icon={Calendar}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Available Time Slots</label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setBooking({ ...booking, time })}
                          className={`py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                            booking.time === time
                              ? 'bg-primary text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Customer Details */}
              {currentStep === 3 && (
                <motion.div key="step3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h2 className="text-2xl font-heading font-bold mb-2">Your Details</h2>
                  {isAuthenticated ? (
                    <p className="text-green-600 text-sm mb-6 flex items-center gap-2">
                      <CheckCircle size={16} />
                      Logged in as {user?.email} - Details pre-filled
                    </p>
                  ) : (
                    <p className="text-gray-500 text-sm mb-6">
                      Enter your contact information for booking confirmation
                    </p>
                  )}
                  <div className="space-y-5">
                    <Input
                      label="Full Name"
                      placeholder="Your full name"
                      value={booking.name}
                      onChange={(e) => setBooking({ ...booking, name: e.target.value })}
                      icon={User}
                      required
                    />
                    <Input
                      label="Email"
                      type="email"
                      placeholder="your@email.com"
                      value={booking.email}
                      onChange={(e) => setBooking({ ...booking, email: e.target.value })}
                      required
                      disabled={isAuthenticated}
                    />
                    <Input
                      label="Phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={booking.phone}
                      onChange={(e) => setBooking({ ...booking, phone: e.target.value })}
                      required
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 4: Confirmation */}
              {currentStep === 4 && (
                <motion.div key="step4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h2 className="text-2xl font-heading font-bold mb-6">Confirm Booking</h2>
                  <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Location</span>
                      <span className="font-medium">{booking.location?.name}, Jammu</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Service</span>
                      <span className="font-medium">{booking.service?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Date</span>
                      <span className="font-medium">{booking.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Time</span>
                      <span className="font-medium">{booking.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Name</span>
                      <span className="font-medium">{booking.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Contact</span>
                      <span className="font-medium">{booking.phone}</span>
                    </div>
                    <div className="border-t pt-4 flex justify-between">
                      <span className="text-gray-500">Total</span>
                      <span className="text-xl font-bold text-primary">₹{booking.service?.price.toLocaleString()}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="ghost"
                onClick={prevStep}
                disabled={currentStep === 0 || isLoading}
                icon={ArrowLeft}
              >
                Back
              </Button>
              {currentStep < steps.length - 1 ? (
                <Button onClick={nextStep} icon={ArrowRight} iconPosition="right">
                  Continue
                </Button>
              ) : (
                <Button onClick={handleSubmit} icon={CreditCard} loading={isLoading} disabled={isLoading}>
                  {isLoading ? 'Booking...' : 'Confirm Booking'}
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Book;

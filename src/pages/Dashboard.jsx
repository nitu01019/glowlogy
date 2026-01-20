/**
 * User Dashboard Page
 * Shows user profile, bookings, and account settings
 * Connected to Firebase with proper user isolation
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, User, Settings, CreditCard, Gift, LogOut, ChevronRight, RefreshCw, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '../components/ui';
import { SEO } from '../components/common';
import { useAuth } from '../context/AuthContext';
import { getUserBookings, cancelBooking } from '../services/bookingService';

const tabs = [
  { id: 'bookings', label: 'My Bookings', icon: Calendar },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, userData, isAuthenticated, loading: authLoading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancellingId, setCancellingId] = useState(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [authLoading, isAuthenticated, navigate]);

  // Fetch user's bookings
  useEffect(() => {
    const fetchBookings = async () => {
      if (user?.email) {
        setLoading(true);
        try {
          const userBookings = await getUserBookings(user.email, false);
          setBookings(userBookings);
        } catch (err) {
          console.error('Error fetching bookings:', err);
          setError('Failed to load bookings');
        } finally {
          setLoading(false);
        }
      }
    };

    if (isAuthenticated) {
      fetchBookings();
    }
  }, [user, isAuthenticated]);

  // Handle logout
  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  // Handle booking cancellation
  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    
    setCancellingId(bookingId);
    try {
      await cancelBooking(bookingId, 'Cancelled by user');
      // Update local state
      setBookings(prev => prev.map(b => 
        b.id === bookingId ? { ...b, status: 'cancelled' } : b
      ));
    } catch (err) {
      console.error('Error cancelling booking:', err);
      alert('Failed to cancel booking. Please try again.');
    } finally {
      setCancellingId(null);
    }
  };

  // Get user initials
  const getInitials = () => {
    const name = userData?.name || user?.displayName || user?.email || '';
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  // Get display name
  const getDisplayName = () => {
    return userData?.name || user?.displayName || 'User';
  };

  // Format date
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  // Get booking status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'confirmed': return 'bg-green-100 text-green-700';
      case 'completed': return 'bg-gray-100 text-gray-600';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  // Get booking status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock size={14} />;
      case 'confirmed': return <CheckCircle size={14} />;
      case 'completed': return <CheckCircle size={14} />;
      case 'cancelled': return <XCircle size={14} />;
      default: return <Clock size={14} />;
    }
  };

  // Categorize bookings
  const upcomingBookings = bookings.filter(b => 
    ['pending', 'confirmed'].includes(b.status) && new Date(b.date) >= new Date()
  );
  const pastBookings = bookings.filter(b => 
    b.status === 'completed' || new Date(b.date) < new Date()
  );
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled');

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <RefreshCw className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <SEO title="Dashboard - Glowlogy" />
      
      <section className="min-h-screen bg-background-alt py-6 sm:py-8">
        <div className="container-custom">
          <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm lg:sticky lg:top-28">
                {/* User Info */}
                <div className="text-center mb-6 pb-6 border-b">
                  {user?.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt={getDisplayName()} 
                      className="w-20 h-20 mx-auto rounded-full object-cover mb-4"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                      {getInitials()}
                    </div>
                  )}
                  <h3 className="font-semibold text-gray-900">{getDisplayName()}</h3>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                  <p className="text-xs text-primary mt-1">
                    {bookings.length} booking{bookings.length !== 1 ? 's' : ''}
                  </p>
                </div>

                {/* Navigation */}
                <nav className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                        activeTab === tab.id
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <tab.icon size={20} />
                      {tab.label}
                    </button>
                  ))}
                </nav>

                <div className="mt-6 pt-6 border-t">
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={20} />
                    Logout
                  </button>
                </div>
              </div>
            </motion.aside>

            {/* Main Content */}
            <motion.main
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-3"
            >
              {/* Bookings Tab */}
              {activeTab === 'bookings' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h1 className="text-xl sm:text-2xl font-heading font-bold text-gray-900">My Bookings</h1>
                    <Button to="/book" size="small">New Booking</Button>
                  </div>

                  {loading ? (
                    <div className="bg-white rounded-2xl p-8 text-center">
                      <RefreshCw className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
                      <p className="text-gray-500">Loading your bookings...</p>
                    </div>
                  ) : error ? (
                    <div className="bg-white rounded-2xl p-8 text-center">
                      <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                      <p className="text-gray-700 font-medium mb-2">Error loading bookings</p>
                      <p className="text-gray-500 text-sm">{error}</p>
                    </div>
                  ) : bookings.length === 0 ? (
                    <div className="bg-white rounded-2xl p-8 text-center">
                      <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-700 font-medium mb-2">No bookings yet</p>
                      <p className="text-gray-500 text-sm mb-4">Book your first spa appointment!</p>
                      <Button to="/book">Book Now</Button>
                    </div>
                  ) : (
                    <>
                      {/* Upcoming Bookings */}
                      {upcomingBookings.length > 0 && (
                        <div className="mb-8">
                          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
                            Upcoming ({upcomingBookings.length})
                          </h3>
                          {upcomingBookings.map((booking) => (
                            <div key={booking.id} className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm mb-4">
                              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                                <div className="flex-1">
                                  <h4 className="font-semibold text-gray-900">{booking.serviceName}</h4>
                                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-2 text-sm text-gray-500">
                                    <span className="flex items-center gap-1">
                                      <Calendar size={14} />
                                      {formatDate(booking.date)}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Clock size={14} />
                                      {booking.time}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <MapPin size={14} />
                                      {booking.locationName}
                                    </span>
                                  </div>
                                  {booking.bookingId && (
                                    <p className="text-xs text-gray-400 mt-2">ID: {booking.bookingId}</p>
                                  )}
                                </div>
                                <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                                  {getStatusIcon(booking.status)}
                                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                </span>
                              </div>
                              <div className="mt-4 pt-4 border-t flex flex-wrap gap-3">
                                <Button 
                                  size="small" 
                                  variant="ghost" 
                                  className="text-red-500"
                                  onClick={() => handleCancelBooking(booking.id)}
                                  disabled={cancellingId === booking.id}
                                >
                                  {cancellingId === booking.id ? 'Cancelling...' : 'Cancel Booking'}
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Past Bookings */}
                      {pastBookings.length > 0 && (
                        <div className="mb-8">
                          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
                            Past Bookings ({pastBookings.length})
                          </h3>
                          {pastBookings.map((booking) => (
                            <div key={booking.id} className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm mb-4 opacity-75">
                              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                                <div>
                                  <h4 className="font-semibold text-gray-900">{booking.serviceName}</h4>
                                  <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500">
                                    <span className="flex items-center gap-1">
                                      <Calendar size={14} />
                                      {formatDate(booking.date)}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <MapPin size={14} />
                                      {booking.locationName}
                                    </span>
                                  </div>
                                </div>
                                <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full ${getStatusColor('completed')}`}>
                                  <CheckCircle size={14} />
                                  Completed
                                </span>
                              </div>
                              <div className="mt-4 pt-4 border-t">
                                <Button to="/book" size="small" variant="secondary">Book Again</Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Cancelled Bookings */}
                      {cancelledBookings.length > 0 && (
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
                            Cancelled ({cancelledBookings.length})
                          </h3>
                          {cancelledBookings.map((booking) => (
                            <div key={booking.id} className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm mb-4 opacity-50">
                              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                                <div>
                                  <h4 className="font-semibold text-gray-900 line-through">{booking.serviceName}</h4>
                                  <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500">
                                    <span className="flex items-center gap-1">
                                      <Calendar size={14} />
                                      {formatDate(booking.date)}
                                    </span>
                                  </div>
                                </div>
                                <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full ${getStatusColor('cancelled')}`}>
                                  <XCircle size={14} />
                                  Cancelled
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <h1 className="text-xl sm:text-2xl font-heading font-bold text-gray-900 mb-6">My Profile</h1>
                  <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b">
                      {user?.photoURL ? (
                        <img 
                          src={user.photoURL} 
                          alt={getDisplayName()} 
                          className="w-16 h-16 rounded-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-xl font-bold">
                          {getInitials()}
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{getDisplayName()}</h3>
                        <p className="text-gray-500">{user?.email}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-500">Full Name</label>
                        <p className="text-gray-900 font-medium">{userData?.name || user?.displayName || 'Not set'}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Email</label>
                        <p className="text-gray-900 font-medium">{user?.email}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Phone</label>
                        <p className="text-gray-900 font-medium">{userData?.phone || 'Not set'}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Member Since</label>
                        <p className="text-gray-900 font-medium">
                          {userData?.createdAt ? new Date(userData.createdAt.toDate?.() || userData.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }) : 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div>
                  <h1 className="text-xl sm:text-2xl font-heading font-bold text-gray-900 mb-6">Settings</h1>
                  <div className="bg-white rounded-2xl shadow-sm divide-y">
                    <button className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors">
                      <div className="text-left">
                        <h4 className="font-medium text-gray-900">Change Password</h4>
                        <p className="text-sm text-gray-500">Update your password</p>
                      </div>
                      <ChevronRight className="text-gray-400" />
                    </button>
                    <button className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors">
                      <div className="text-left">
                        <h4 className="font-medium text-gray-900">Notifications</h4>
                        <p className="text-sm text-gray-500">Manage email and SMS notifications</p>
                      </div>
                      <ChevronRight className="text-gray-400" />
                    </button>
                    <button className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors">
                      <div className="text-left">
                        <h4 className="font-medium text-gray-900">Privacy</h4>
                        <p className="text-sm text-gray-500">Manage your data and privacy settings</p>
                      </div>
                      <ChevronRight className="text-gray-400" />
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center justify-between p-5 text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <div className="text-left">
                        <h4 className="font-medium">Logout</h4>
                        <p className="text-sm text-red-400">Sign out of your account</p>
                      </div>
                      <LogOut size={20} />
                    </button>
                  </div>
                </div>
              )}
            </motion.main>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;

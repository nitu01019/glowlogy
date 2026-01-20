/**
 * Admin Panel
 * Manage bookings, membership inquiries, and contacts
 * Protected - requires admin authentication
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, Users, CreditCard, Mail, RefreshCw, 
  CheckCircle, XCircle, Clock, Eye, Trash2,
  ChevronDown, Filter, Download, Phone, MapPin,
  AlertCircle, Crown, MessageSquare
} from 'lucide-react';
import { Button } from '../components/ui';
import { SEO } from '../components/common';
import { useAuth } from '../context/AuthContext';
import { 
  collection, getDocs, query, orderBy, updateDoc, 
  doc, deleteDoc, where, limit 
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Admin emails - add your admin emails here
const ADMIN_EMAILS = ['admin@glowlogy.com', 'nitish@glowlogy.com'];

const tabs = [
  { id: 'bookings', label: 'Bookings', icon: Calendar },
  { id: 'memberships', label: 'Membership Inquiries', icon: Crown },
  { id: 'contacts', label: 'Contact Messages', icon: MessageSquare },
];

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-green-100 text-green-700',
  completed: 'bg-gray-100 text-gray-600',
  cancelled: 'bg-red-100 text-red-700',
  new: 'bg-blue-100 text-blue-700',
};

const Admin = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('bookings');
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [memberships, setMemberships] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    totalMemberships: 0,
    totalContacts: 0,
  });
  const [selectedItem, setSelectedItem] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  // Check if user is admin
  const isAdmin = user && ADMIN_EMAILS.includes(user.email);

  // Redirect non-admins
  useEffect(() => {
    if (!authLoading && (!isAuthenticated || !isAdmin)) {
      navigate('/login');
    }
  }, [authLoading, isAuthenticated, isAdmin, navigate]);

  // Fetch all data
  useEffect(() => {
    if (isAdmin) {
      fetchAllData();
    }
  }, [isAdmin]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchBookings(),
        fetchMemberships(),
        fetchContacts(),
      ]);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    try {
      const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'), limit(100));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || new Date(),
      }));
      setBookings(data);
      setStats(prev => ({
        ...prev,
        totalBookings: data.length,
        pendingBookings: data.filter(b => b.status === 'pending').length,
      }));
    } catch (err) {
      console.error('Error fetching bookings:', err);
    }
  };

  const fetchMemberships = async () => {
    try {
      const q = query(collection(db, 'membership_inquiries'), orderBy('createdAt', 'desc'), limit(100));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || new Date(),
      }));
      setMemberships(data);
      setStats(prev => ({ ...prev, totalMemberships: data.length }));
    } catch (err) {
      console.error('Error fetching memberships:', err);
    }
  };

  const fetchContacts = async () => {
    try {
      const q = query(collection(db, 'contacts'), orderBy('createdAt', 'desc'), limit(100));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || new Date(),
      }));
      setContacts(data);
      setStats(prev => ({ ...prev, totalContacts: data.length }));
    } catch (err) {
      console.error('Error fetching contacts:', err);
    }
  };

  const updateStatus = async (collectionName, docId, newStatus) => {
    try {
      await updateDoc(doc(db, collectionName, docId), { 
        status: newStatus,
        updatedAt: new Date(),
      });
      // Refresh data
      if (collectionName === 'bookings') await fetchBookings();
      if (collectionName === 'membership_inquiries') await fetchMemberships();
      if (collectionName === 'contacts') await fetchContacts();
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update status');
    }
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const filteredBookings = filterStatus === 'all' 
    ? bookings 
    : bookings.filter(b => b.status === filterStatus);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-alt">
        <RefreshCw className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <>
      <SEO title="Admin Panel - Glowlogy" />
      
      <section className="min-h-screen bg-background-alt py-6 sm:py-8">
        <div className="container-custom">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900">Admin Panel</h1>
              <p className="text-gray-500 text-sm">Manage bookings and inquiries</p>
            </div>
            <Button onClick={fetchAllData} icon={RefreshCw} variant="outline" size="small">
              Refresh
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalBookings}</p>
                  <p className="text-xs text-gray-500">Total Bookings</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.pendingBookings}</p>
                  <p className="text-xs text-gray-500">Pending</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Crown className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalMemberships}</p>
                  <p className="text-xs text-gray-500">Membership Inquiries</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalContacts}</p>
                  <p className="text-xs text-gray-500">Contact Messages</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <div>
                {/* Filter */}
                <div className="p-4 border-b flex items-center gap-3">
                  <Filter size={18} className="text-gray-400" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <span className="text-sm text-gray-500">{filteredBookings.length} bookings</span>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 text-left text-xs text-gray-500 uppercase">
                      <tr>
                        <th className="px-4 py-3">Booking ID</th>
                        <th className="px-4 py-3">Customer</th>
                        <th className="px-4 py-3">Service</th>
                        <th className="px-4 py-3">Location</th>
                        <th className="px-4 py-3">Date & Time</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filteredBookings.map((booking) => (
                        <tr key={booking.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm font-mono text-primary">{booking.bookingId || booking.id.slice(0, 8)}</td>
                          <td className="px-4 py-3">
                            <p className="font-medium text-gray-900 text-sm">{booking.customerName}</p>
                            <p className="text-xs text-gray-500">{booking.email}</p>
                            <p className="text-xs text-gray-500">{booking.phone}</p>
                          </td>
                          <td className="px-4 py-3">
                            <p className="text-sm text-gray-900">{booking.serviceName}</p>
                            <p className="text-xs text-gray-500">₹{booking.servicePrice?.toLocaleString()}</p>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">{booking.locationName}</td>
                          <td className="px-4 py-3">
                            <p className="text-sm text-gray-900">{booking.date}</p>
                            <p className="text-xs text-gray-500">{booking.time}</p>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusColors[booking.status] || statusColors.pending}`}>
                              {booking.status || 'pending'}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => updateStatus('bookings', booking.id, 'confirmed')}
                                className="p-1.5 text-green-600 hover:bg-green-50 rounded"
                                title="Confirm"
                              >
                                <CheckCircle size={16} />
                              </button>
                              <button
                                onClick={() => updateStatus('bookings', booking.id, 'cancelled')}
                                className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                                title="Cancel"
                              >
                                <XCircle size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {filteredBookings.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p>No bookings found</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Memberships Tab */}
            {activeTab === 'memberships' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 text-left text-xs text-gray-500 uppercase">
                    <tr>
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3">Customer</th>
                      <th className="px-4 py-3">Plan</th>
                      <th className="px-4 py-3">Contact</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {memberships.map((m) => (
                      <tr key={m.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-600">{formatDate(m.createdAt)}</td>
                        <td className="px-4 py-3">
                          <p className="font-medium text-gray-900 text-sm">{m.customerName}</p>
                          <p className="text-xs text-gray-500">{m.email}</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm font-medium text-primary">{m.planName}</p>
                          <p className="text-xs text-gray-500">₹{m.planPrice?.toLocaleString()}/month</p>
                        </td>
                        <td className="px-4 py-3">
                          <a href={`tel:${m.phone}`} className="text-sm text-gray-600 hover:text-primary flex items-center gap-1">
                            <Phone size={14} />
                            {m.phone}
                          </a>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusColors[m.status] || statusColors.pending}`}>
                            {m.status || 'pending'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => updateStatus('membership_inquiries', m.id, 'confirmed')}
                              className="p-1.5 text-green-600 hover:bg-green-50 rounded"
                              title="Mark as Contacted"
                            >
                              <CheckCircle size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {memberships.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <Crown className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No membership inquiries yet</p>
                  </div>
                )}
              </div>
            )}

            {/* Contacts Tab */}
            {activeTab === 'contacts' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 text-left text-xs text-gray-500 uppercase">
                    <tr>
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3">From</th>
                      <th className="px-4 py-3">Message</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {contacts.map((c) => (
                      <tr key={c.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-600">{formatDate(c.createdAt)}</td>
                        <td className="px-4 py-3">
                          <p className="font-medium text-gray-900 text-sm">{c.name}</p>
                          <p className="text-xs text-gray-500">{c.email}</p>
                          {c.phone && <p className="text-xs text-gray-500">{c.phone}</p>}
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-gray-600 max-w-xs truncate">{c.message}</p>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusColors[c.status] || statusColors.new}`}>
                            {c.status || 'new'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => updateStatus('contacts', c.id, 'replied')}
                              className="p-1.5 text-green-600 hover:bg-green-50 rounded"
                              title="Mark as Replied"
                            >
                              <CheckCircle size={16} />
                            </button>
                            <a
                              href={`mailto:${c.email}`}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                              title="Reply via Email"
                            >
                              <Mail size={16} />
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {contacts.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No contact messages yet</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Admin;

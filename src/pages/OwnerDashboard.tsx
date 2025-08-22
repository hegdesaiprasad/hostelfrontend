import React, { useState } from 'react';
import { Plus, Building2, Users, Star, Eye, Phone, Mail } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';

const OwnerDashboard: React.FC = () => {
  const { user } = useAuth();
  const { hostels, bookings, addHostel } = useData();
  const [activeTab, setActiveTab] = useState<'overview' | 'hostels' | 'bookings' | 'add-hostel'>('overview');
  const [showAddHostel, setShowAddHostel] = useState(false);
  
  const [newHostel, setNewHostel] = useState({
    name: '',
    address: '',
    pricePerMonth: 0,
    totalBeds: 0,
    availableBeds: 0,
    hostelType: 'boys' as 'boys' | 'girls' | 'co-ed',
    description: '',
    amenities: [] as string[],
    images: ['https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg'],
  });

  // Filter hostels and bookings for current owner
  const ownerHostels = hostels.filter(h => h.ownerId === user?.id);
  const ownerBookings = bookings.filter(b => 
    ownerHostels.some(h => h.id === b.hostelId)
  );

  const allAmenities = ['Wi-Fi', 'Food', 'AC', 'Non-AC', 'Laundry', 'Security', 'Study Room', 'Gym', 'Garden', 'Parking'];

  const handleAmenityToggle = (amenity: string) => {
    setNewHostel(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleSubmitHostel = (e: React.FormEvent) => {
    e.preventDefault();
    addHostel({
      ...newHostel,
      coordinates: { lat: 17.5449, lng: 78.6898 }, // Default coordinates
      rating: 0,
      totalReviews: 0,
      ownerId: user?.id || '',
      verified: false,
    });
    
    setShowAddHostel(false);
    setNewHostel({
      name: '',
      address: '',
      pricePerMonth: 0,
      totalBeds: 0,
      availableBeds: 0,
      hostelType: 'boys',
      description: '',
      amenities: [],
      images: ['https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg'],
    });
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Building2 },
    { id: 'hostels', label: 'My Hostels', icon: Building2 },
    { id: 'bookings', label: 'Bookings', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Owner Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.name}</p>
            </div>
            
            <button
              onClick={() => setShowAddHostel(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Hostel</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 rounded-lg p-6">
                    <div className="flex items-center">
                      <Building2 className="w-8 h-8 text-blue-600" />
                      <div className="ml-4">
                        <div className="text-2xl font-bold text-gray-900">{ownerHostels.length}</div>
                        <div className="text-sm text-gray-600">Total Hostels</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-6">
                    <div className="flex items-center">
                      <Users className="w-8 h-8 text-green-600" />
                      <div className="ml-4">
                        <div className="text-2xl font-bold text-gray-900">{ownerBookings.length}</div>
                        <div className="text-sm text-gray-600">Total Bookings</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 rounded-lg p-6">
                    <div className="flex items-center">
                      <Star className="w-8 h-8 text-yellow-600" />
                      <div className="ml-4">
                        <div className="text-2xl font-bold text-gray-900">
                          {ownerHostels.length > 0 
                            ? (ownerHostels.reduce((sum, h) => sum + h.rating, 0) / ownerHostels.length).toFixed(1)
                            : '0.0'
                          }
                        </div>
                        <div className="text-sm text-gray-600">Avg Rating</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Bookings */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Bookings</h3>
                  {ownerBookings.length === 0 ? (
                    <p className="text-gray-600">No bookings yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {ownerBookings.slice(0, 5).map((booking) => (
                        <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-medium text-gray-900">{booking.studentName}</div>
                            <div className="text-sm text-gray-600">{booking.collegeName}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-green-600">₹{booking.tokenAmount}</div>
                            <div className="text-xs text-gray-500">{booking.paymentStatus}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Hostels Tab */}
            {activeTab === 'hostels' && (
              <div className="space-y-4">
                {ownerHostels.length === 0 ? (
                  <div className="text-center py-12">
                    <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No hostels listed</h3>
                    <p className="text-gray-600 mb-4">Start by adding your first hostel property.</p>
                    <button
                      onClick={() => setShowAddHostel(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Add Your First Hostel
                    </button>
                  </div>
                ) : (
                  ownerHostels.map((hostel) => (
                    <div key={hostel.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">{hostel.name}</h3>
                          <p className="text-gray-600 mb-2">{hostel.address}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>₹{hostel.pricePerMonth.toLocaleString()}/month</span>
                            <span>{hostel.availableBeds}/{hostel.totalBeds} beds available</span>
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                              <span>{hostel.rating} ({hostel.totalReviews})</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          {hostel.verified ? (
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                              Verified
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                              Pending
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <div className="space-y-4">
                {ownerBookings.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
                    <p className="text-gray-600">Bookings will appear here once students start booking your hostels.</p>
                  </div>
                ) : (
                  ownerBookings.map((booking) => (
                    <div key={booking.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">{booking.studentName}</h3>
                          <p className="text-gray-600">{booking.collegeName}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <div className="flex items-center text-sm text-gray-600">
                              <Phone className="w-4 h-4 mr-1" />
                              <span>{booking.studentPhone}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600">₹{booking.tokenAmount}</div>
                          <div className={`text-sm px-2 py-1 rounded-full ${
                            booking.paymentStatus === 'completed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {booking.paymentStatus}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {new Date(booking.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Add Hostel Modal */}
        {showAddHostel && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Add New Hostel</h3>
                  <button
                    onClick={() => setShowAddHostel(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={handleSubmitHostel} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hostel Name
                      </label>
                      <input
                        type="text"
                        required
                        value={newHostel.name}
                        onChange={(e) => setNewHostel(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter hostel name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hostel Type
                      </label>
                      <select
                        value={newHostel.hostelType}
                        onChange={(e) => setNewHostel(prev => ({ ...prev, hostelType: e.target.value as any }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="boys">Boys Only</option>
                        <option value="girls">Girls Only</option>
                        <option value="co-ed">Co-Ed</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      required
                      value={newHostel.address}
                      onChange={(e) => setNewHostel(prev => ({ ...prev, address: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter complete address"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price per Month (₹)
                      </label>
                      <input
                        type="number"
                        required
                        value={newHostel.pricePerMonth}
                        onChange={(e) => setNewHostel(prev => ({ ...prev, pricePerMonth: parseInt(e.target.value) }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="8000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Total Beds
                      </label>
                      <input
                        type="number"
                        required
                        value={newHostel.totalBeds}
                        onChange={(e) => setNewHostel(prev => ({ ...prev, totalBeds: parseInt(e.target.value) }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Available Beds
                      </label>
                      <input
                        type="number"
                        required
                        value={newHostel.availableBeds}
                        onChange={(e) => setNewHostel(prev => ({ ...prev, availableBeds: parseInt(e.target.value) }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      value={newHostel.description}
                      onChange={(e) => setNewHostel(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Describe your hostel..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Amenities
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {allAmenities.map((amenity) => (
                        <label key={amenity} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={newHostel.amenities.includes(amenity)}
                            onChange={() => handleAmenityToggle(amenity)}
                            className="text-blue-600 mr-2"
                          />
                          <span className="text-sm">{amenity}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowAddHostel(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Add Hostel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;
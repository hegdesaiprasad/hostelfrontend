import React, { useState } from 'react';
import { Users, Building2, MessageSquare, Shield, Eye, Check, X } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const AdminDashboard: React.FC = () => {
  const { hostels, reviews, colleges } = useData();
  const [activeTab, setActiveTab] = useState<'overview' | 'hostels' | 'reviews' | 'users'>('overview');

  const stats = {
    totalHostels: hostels.length,
    verifiedHostels: hostels.filter(h => h.verified).length,
    totalReviews: reviews.length,
    verifiedReviews: reviews.filter(r => r.verified).length,
    totalColleges: colleges.length,
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Shield },
    { id: 'hostels', label: 'Hostels', icon: Building2 },
    { id: 'reviews', label: 'Reviews', icon: MessageSquare },
    { id: 'users', label: 'Users', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Manage platform content and users</p>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-blue-50 rounded-lg p-6">
                    <div className="flex items-center">
                      <Building2 className="w-8 h-8 text-blue-600" />
                      <div className="ml-4">
                        <div className="text-2xl font-bold text-gray-900">{stats.totalHostels}</div>
                        <div className="text-sm text-gray-600">Total Hostels</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-6">
                    <div className="flex items-center">
                      <Shield className="w-8 h-8 text-green-600" />
                      <div className="ml-4">
                        <div className="text-2xl font-bold text-gray-900">{stats.verifiedHostels}</div>
                        <div className="text-sm text-gray-600">Verified Hostels</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 rounded-lg p-6">
                    <div className="flex items-center">
                      <MessageSquare className="w-8 h-8 text-purple-600" />
                      <div className="ml-4">
                        <div className="text-2xl font-bold text-gray-900">{stats.totalReviews}</div>
                        <div className="text-sm text-gray-600">Total Reviews</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-orange-50 rounded-lg p-6">
                    <div className="flex items-center">
                      <Users className="w-8 h-8 text-orange-600" />
                      <div className="ml-4">
                        <div className="text-2xl font-bold text-gray-900">{stats.totalColleges}</div>
                        <div className="text-sm text-gray-600">Partner Colleges</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">New hostel registration</div>
                        <div className="text-sm text-gray-600">Tech Valley Hostel - Pending verification</div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors">
                          <Check className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">New review submitted</div>
                        <div className="text-sm text-gray-600">Sri Venkateswara Boys Hostel - 4.5 stars</div>
                      </div>
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Hostels Tab */}
            {activeTab === 'hostels' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Manage Hostels</h3>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full">
                      Verified ({stats.verifiedHostels})
                    </button>
                    <button className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-full">
                      Pending ({stats.totalHostels - stats.verifiedHostels})
                    </button>
                  </div>
                </div>

                {hostels.map((hostel) => (
                  <div key={hostel.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900">{hostel.name}</h4>
                        <p className="text-gray-600 mb-2">{hostel.address}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>₹{hostel.pricePerMonth.toLocaleString()}/month</span>
                          <span>{hostel.totalBeds} beds</span>
                          <span className="capitalize">{hostel.hostelType}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {hostel.verified ? (
                          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                            Verified
                          </span>
                        ) : (
                          <div className="flex space-x-2">
                            <button className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors">
                              Approve
                            </button>
                            <button className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors">
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Manage Reviews</h3>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full">
                      Verified ({stats.verifiedReviews})
                    </button>
                    <button className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-full">
                      Pending ({stats.totalReviews - stats.verifiedReviews})
                    </button>
                  </div>
                </div>

                {reviews.map((review) => (
                  <div key={review.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="font-medium text-gray-900">{review.studentName}</div>
                        <div className="text-sm text-gray-600">{review.collegeName}</div>
                        <div className="flex items-center mt-1">
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <div key={star} className="w-4 h-4 mr-1">
                                <div className={`w-full h-full ${star <= review.rating.overall ? 'text-yellow-400' : 'text-gray-300'}`}>
                                  ★
                                </div>
                              </div>
                            ))}
                          </div>
                          <span className="ml-2 text-sm text-gray-600">{review.rating.overall}/5</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {review.verified ? (
                          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                            Verified
                          </span>
                        ) : (
                          <div className="flex space-x-2">
                            <button className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors">
                              Approve
                            </button>
                            <button className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors">
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Manage Users</h3>
                
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">User Management</h4>
                  <p className="text-gray-600">User management features will be available here.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
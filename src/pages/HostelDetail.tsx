import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  MapPin, Star, Users, Wifi, Car, Shield, Clock, Phone, 
  ChevronLeft, ChevronRight, Check, X, ArrowLeft 
} from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';

const HostelDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getHostelById, getReviewsByHostel } = useData();
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAllAmenities, setShowAllAmenities] = useState(false);

  const hostel = getHostelById(id!);
  const reviews = getReviewsByHostel(id!);

  if (!hostel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Hostel not found</h2>
          <button onClick={() => navigate(-1)} className="text-blue-600 hover:text-blue-700">
            Go back
          </button>
        </div>
      </div>
    );
  }

  const handleBookNow = () => {
    if (!user) {
      navigate('/auth', { state: { returnTo: `/book/${hostel.id}` } });
    } else {
      navigate(`/book/${hostel.id}`);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === hostel.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? hostel.images.length - 1 : prev - 1
    );
  };

  const amenityIcons: Record<string, any> = {
    'Wi-Fi': Wifi,
    'Security': Shield,
    'Parking': Car,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{hostel.name}</h1>
              <div className="flex items-center text-gray-600 mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{hostel.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative h-80 sm:h-96">
                <img
                  src={hostel.images[currentImageIndex]}
                  alt={hostel.name}
                  className="w-full h-full object-cover"
                />
                
                {hostel.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {hostel.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {hostel.images.length > 1 && (
                <div className="p-4 border-t">
                  <div className="grid grid-cols-4 gap-2">
                    {hostel.images.slice(0, 4).map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                          index === currentImageIndex ? 'border-blue-500' : 'border-gray-200'
                        }`}
                      >
                        <img src={image} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About this hostel</h2>
              <p className="text-gray-600 leading-relaxed">{hostel.description}</p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{hostel.totalBeds}</div>
                  <div className="text-sm text-gray-600">Total Beds</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{hostel.availableBeds}</div>
                  <div className="text-sm text-gray-600">Available</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600 capitalize">{hostel.hostelType}</div>
                  <div className="text-sm text-gray-600">Type</div>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Amenities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(showAllAmenities ? hostel.amenities : hostel.amenities.slice(0, 6)).map((amenity) => {
                  const IconComponent = amenityIcons[amenity] || Check;
                  return (
                    <div key={amenity} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <IconComponent className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  );
                })}
              </div>
              
              {hostel.amenities.length > 6 && (
                <button
                  onClick={() => setShowAllAmenities(!showAllAmenities)}
                  className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                >
                  {showAllAmenities ? 'Show Less' : `Show ${hostel.amenities.length - 6} More Amenities`}
                </button>
              )}
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Reviews</h2>
                <Link
                  to={`/reviews/${hostel.id}`}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  View All Reviews
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{hostel.rating}</div>
                  <div className="text-sm text-gray-600">Overall</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">4.2</div>
                  <div className="text-sm text-gray-600">Food</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">4.1</div>
                  <div className="text-sm text-gray-600">Cleanliness</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">4.5</div>
                  <div className="text-sm text-gray-600">Safety</div>
                </div>
              </div>

              <div className="space-y-4">
                {reviews.slice(0, 3).map((review) => (
                  <div key={review.id} className="border-b border-gray-200 last:border-b-0 pb-4 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="font-medium text-gray-900">{review.studentName}</div>
                        <div className="text-sm text-gray-600">{review.collegeName}</div>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm font-medium">{review.rating.overall}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-gray-900">
                    ₹{hostel.pricePerMonth.toLocaleString()}
                  </div>
                  <div className="text-gray-600">per month</div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Rating</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 font-medium">{hostel.rating}</span>
                      <span className="text-gray-600 text-sm ml-1">({hostel.totalReviews})</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Distance</span>
                    <span className="font-medium">{hostel.distance?.toFixed(1)} km</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Available Beds</span>
                    <span className="font-medium text-green-600">{hostel.availableBeds}</span>
                  </div>
                </div>

                <button
                  onClick={handleBookNow}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Book Now (₹500 Token)
                </button>

                <div className="mt-4 text-center text-sm text-gray-600">
                  <p>Pay ₹500 token to book your slot</p>
                  <p>Full payment can be made later</p>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>Call for instant booking</span>
                  </div>
                  <div className="text-center mt-2">
                    <a href="tel:+919876543210" className="text-blue-600 font-semibold">
                      +91 98765 43210
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostelDetail;
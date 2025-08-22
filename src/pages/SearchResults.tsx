import React, { useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { MapPin, Star, Wifi, Car, Users, Filter } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const collegeId = searchParams.get('college');
  const [priceRange, setPriceRange] = useState([0, 15000]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [hostelType, setHostelType] = useState<'all' | 'boys' | 'girls' | 'co-ed'>('all');
  const [sortBy, setSortBy] = useState<'distance' | 'price' | 'rating'>('distance');
  const [showFilters, setShowFilters] = useState(false);

  const { colleges, getHostelsByCollege } = useData();
  
  const college = useMemo(() => 
    colleges.find(c => c.id === collegeId), 
    [colleges, collegeId]
  );

  const hostels = useMemo(() => {
    if (!collegeId) return [];
    
    let filtered = getHostelsByCollege(collegeId);
    
    // Filter by price range
    filtered = filtered.filter(h => 
      h.pricePerMonth >= priceRange[0] && h.pricePerMonth <= priceRange[1]
    );
    
    // Filter by hostel type
    if (hostelType !== 'all') {
      filtered = filtered.filter(h => h.hostelType === hostelType);
    }
    
    // Filter by amenities
    if (selectedAmenities.length > 0) {
      filtered = filtered.filter(h => 
        selectedAmenities.every(amenity => h.amenities.includes(amenity))
      );
    }
    
    // Sort results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.pricePerMonth - b.pricePerMonth;
        case 'rating':
          return b.rating - a.rating;
        case 'distance':
        default:
          return (a.distance || 0) - (b.distance || 0);
      }
    });
    
    return filtered;
  }, [collegeId, getHostelsByCollege, priceRange, hostelType, selectedAmenities, sortBy]);

  const allAmenities = ['Wi-Fi', 'Food', 'AC', 'Laundry', 'Security', 'Study Room', 'Gym', 'Garden'];

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  if (!college) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">College not found</h2>
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            Go back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Hostels near {college.name}
              </h1>
              <p className="text-gray-600 mt-1">
                {hostels.length} accommodations found in {college.location}
              </p>
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
              
              {/* Sort */}
              <div className="space-y-3 mb-6">
                <label className="block text-sm font-medium text-gray-700">Sort by</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="distance">Distance</option>
                  <option value="price">Price (Low to High)</option>
                  <option value="rating">Rating (High to Low)</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="space-y-3 mb-6">
                <label className="block text-sm font-medium text-gray-700">
                  Price Range (₹{priceRange[0]} - ₹{priceRange[1]}/month)
                </label>
                <input
                  type="range"
                  min="0"
                  max="15000"
                  step="500"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>

              {/* Hostel Type */}
              <div className="space-y-3 mb-6">
                <label className="block text-sm font-medium text-gray-700">Accommodation Type</label>
                <div className="space-y-2">
                  {['all', 'boys', 'girls', 'co-ed'].map(type => (
                    <label key={type} className="flex items-center">
                      <input
                        type="radio"
                        name="hostelType"
                        value={type}
                        checked={hostelType === type}
                        onChange={(e) => setHostelType(e.target.value as any)}
                        className="text-blue-600"
                      />
                      <span className="ml-2 text-sm capitalize">
                        {type === 'all' ? 'All Types' : type === 'co-ed' ? 'Co-Ed' : `${type} Only`}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">Amenities</label>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {allAmenities.map(amenity => (
                    <label key={amenity} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedAmenities.includes(amenity)}
                        onChange={() => toggleAmenity(amenity)}
                        className="text-blue-600"
                      />
                      <span className="ml-2 text-sm">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            {hostels.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hostels found</h3>
                <p className="text-gray-600">Try adjusting your filters to see more results.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {hostels.map(hostel => (
                  <Link key={hostel.id} to={`/hostel/${hostel.id}`}>
                    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                      <div className="flex flex-col sm:flex-row">
                        {/* Image */}
                        <div className="sm:w-80 h-48 sm:h-auto">
                          <img
                            src={hostel.images[0]}
                            alt={hostel.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                                {hostel.name}
                              </h3>
                              <div className="flex items-center text-gray-600 mb-2">
                                <MapPin className="w-4 h-4 mr-1" />
                                <span className="text-sm">{hostel.address}</span>
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <span>{hostel.distance?.toFixed(1)} km away</span>
                                <span className="capitalize">{hostel.hostelType}</span>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <div className="text-2xl font-bold text-blue-600">
                                ₹{hostel.pricePerMonth.toLocaleString()}
                              </div>
                              <div className="text-sm text-gray-600">per month</div>
                            </div>
                          </div>

                          {/* Amenities */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {hostel.amenities.slice(0, 4).map(amenity => (
                              <span
                                key={amenity}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                              >
                                {amenity}
                              </span>
                            ))}
                            {hostel.amenities.length > 4 && (
                              <span className="text-xs text-gray-500">
                                +{hostel.amenities.length - 4} more
                              </span>
                            )}
                          </div>

                          {/* Rating and availability */}
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="ml-1 text-sm font-medium">{hostel.rating}</span>
                                <span className="text-sm text-gray-600 ml-1">
                                  ({hostel.totalReviews} reviews)
                                </span>
                              </div>
                              
                              <div className="flex items-center text-sm">
                                <Users className="w-4 h-4 text-gray-400 mr-1" />
                                <span className="text-gray-600">
                                  {hostel.availableBeds} beds available
                                </span>
                              </div>
                            </div>

                            {hostel.verified && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Verified
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
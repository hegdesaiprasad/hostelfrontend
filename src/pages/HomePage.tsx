import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, MapPin, Users, Star, Shield } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const HomePage: React.FC = () => {
  const [selectedCollege, setSelectedCollege] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { colleges } = useData();
  const navigate = useNavigate();

  const handleSearch = () => {
    if (selectedCollege) {
      navigate(`/search?college=${selectedCollege}`);
    }
  };

  const features = [
    {
      icon: MapPin,
      title: 'Location-Based Search',
      description: 'Find hostels within 2km of your college with accurate distance calculations.'
    },
    {
      icon: Users,
      title: 'Verified Reviews',
      description: 'Read authentic reviews from verified students with college ID verification.'
    },
    {
      icon: Star,
      title: 'Quality Ratings',
      description: 'Detailed ratings for food, cleanliness, safety, and overall experience.'
    },
    {
      icon: Shield,
      title: 'Secure Booking',
      description: 'Safe and secure booking process with integrated payment gateway.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-8">
            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
                Find Your Perfect
                <span className="text-blue-600 block">Student Accommodation</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Discover verified hostels and PGs near top engineering colleges in Hyderabad. 
                Book with confidence using authentic student reviews.
              </p>
            </div>

            {/* College Selection */}
            <div className="max-w-md mx-auto space-y-4">
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-4 text-left shadow-md hover:shadow-lg transition-shadow flex items-center justify-between"
                >
                  <span className={`${selectedCollege ? 'text-gray-900' : 'text-gray-500'}`}>
                    {selectedCollege 
                      ? colleges.find(c => c.id === selectedCollege)?.name 
                      : 'Select Your College'
                    }
                  </span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-10 mt-1">
                    {colleges.map(college => (
                      <button
                        key={college.id}
                        onClick={() => {
                          setSelectedCollege(college.id);
                          setIsDropdownOpen(false);
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                      >
                        <div>
                          <div className="font-medium text-gray-900 text-sm">{college.name}</div>
                          <div className="text-gray-500 text-xs">{college.location}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={handleSearch}
                disabled={!selectedCollege}
                className={`w-full py-4 px-6 rounded-lg font-semibold transition-all transform hover:scale-105 ${
                  selectedCollege
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Find Hostels Near Me
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">50+</div>
                <div className="text-sm text-gray-600">Verified Hostels</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">1000+</div>
                <div className="text-sm text-gray-600">Happy Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">5</div>
                <div className="text-sm text-gray-600">Top Colleges</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Why Choose HostelConnect?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We make finding and booking student accommodation simple, safe, and reliable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center space-y-4 p-6 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Find Your Perfect Stay?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have found their ideal accommodation through HostelConnect.
          </p>
          <button
            onClick={() => setIsDropdownOpen(true)}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Start Your Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
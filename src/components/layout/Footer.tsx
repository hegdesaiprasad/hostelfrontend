import React from 'react';
import { Building2, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">HostelConnect</span>
            </div>
            <p className="text-gray-400 text-sm">
              Connecting students with the best hostels and PGs near engineering colleges in Hyderabad.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="/search" className="text-gray-400 hover:text-white transition-colors">Find Hostels</a></li>
              <li><a href="/owner-dashboard" className="text-gray-400 hover:text-white transition-colors">List Your Property</a></li>
              <li><a href="/auth" className="text-gray-400 hover:text-white transition-colors">Sign Up</a></li>
            </ul>
          </div>

          {/* Popular Colleges */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Colleges</h3>
            <ul className="space-y-2 text-sm">
              <li><span className="text-gray-400">SNIST, Ghatkesar</span></li>
              <li><span className="text-gray-400">ANURAG Group</span></li>
              <li><span className="text-gray-400">ACE Engineering</span></li>
              <li><span className="text-gray-400">JNTU Hyderabad</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-blue-500" />
                <span className="text-gray-400">support@hostelconnect.in</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-blue-500" />
                <span className="text-gray-400">+91 9876543210</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-blue-500" />
                <span className="text-gray-400">Hyderabad, Telangana</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 HostelConnect. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
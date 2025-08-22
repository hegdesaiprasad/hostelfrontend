export interface College {
  id: string;
  name: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Hostel {
  id: string;
  name: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  distance?: number;
  pricePerMonth: number;
  images: string[];
  amenities: string[];
  rating: number;
  totalReviews: number;
  description: string;
  ownerId: string;
  totalBeds: number;
  availableBeds: number;
  hostelType: 'boys' | 'girls' | 'co-ed';
  verified: boolean;
  createdAt: string;
}

export interface Review {
  id: string;
  hostelId: string;
  studentId: string;
  studentName: string;
  collegeName: string;
  rating: {
    overall: number;
    food: number;
    cleanliness: number;
    safety: number;
  };
  comment: string;
  verified: boolean;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'student' | 'owner' | 'admin';
  college?: string;
  collegeId?: string;
  verified: boolean;
  createdAt: string;
}

export interface Booking {
  id: string;
  hostelId: string;
  studentId: string;
  studentName: string;
  studentPhone: string;
  collegeName: string;
  tokenAmount: number;
  paymentStatus: 'pending' | 'completed' | 'failed';
  paymentId?: string;
  bookingDate: string;
  status: 'active' | 'cancelled' | 'completed';
  createdAt: string;
}
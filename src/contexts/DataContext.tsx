import React, { createContext, useContext, useState } from 'react';
import { College, Hostel, Review, Booking } from '../types';
import { mockColleges, mockHostels, mockReviews } from '../data/mockData';

interface DataContextType {
  colleges: College[];
  hostels: Hostel[];
  reviews: Review[];
  bookings: Booking[];
  getHostelsByCollege: (collegeId: string) => Hostel[];
  getHostelById: (id: string) => Hostel | undefined;
  getReviewsByHostel: (hostelId: string) => Review[];
  addReview: (review: Omit<Review, 'id' | 'createdAt'>) => void;
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => void;
  addHostel: (hostel: Omit<Hostel, 'id' | 'createdAt'>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [colleges] = useState<College[]>(mockColleges);
  const [hostels, setHostels] = useState<Hostel[]>(mockHostels);
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const getHostelsByCollege = (collegeId: string) => {
    const college = colleges.find(c => c.id === collegeId);
    if (!college) return [];

    // Calculate distance and filter hostels within 2km
    return hostels
      .map(hostel => ({
        ...hostel,
        distance: calculateDistance(
          college.coordinates.lat,
          college.coordinates.lng,
          hostel.coordinates.lat,
          hostel.coordinates.lng
        )
      }))
      .filter(hostel => hostel.distance! <= 2)
      .sort((a, b) => a.distance! - b.distance!);
  };

  const getHostelById = (id: string) => {
    return hostels.find(hostel => hostel.id === id);
  };

  const getReviewsByHostel = (hostelId: string) => {
    return reviews.filter(review => review.hostelId === hostelId);
  };

  const addReview = (review: Omit<Review, 'id' | 'createdAt'>) => {
    const newReview: Review = {
      ...review,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setReviews(prev => [...prev, newReview]);
  };

  const addBooking = (booking: Omit<Booking, 'id' | 'createdAt'>) => {
    const newBooking: Booking = {
      ...booking,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setBookings(prev => [...prev, newBooking]);
  };

  const addHostel = (hostel: Omit<Hostel, 'id' | 'createdAt'>) => {
    const newHostel: Hostel = {
      ...hostel,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setHostels(prev => [...prev, newHostel]);
  };

  const value = {
    colleges,
    hostels,
    reviews,
    bookings,
    getHostelsByCollege,
    getHostelById,
    getReviewsByHostel,
    addReview,
    addBooking,
    addHostel,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

// Helper function to calculate distance between two coordinates
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return Math.round(distance * 100) / 100; // Round to 2 decimal places
};
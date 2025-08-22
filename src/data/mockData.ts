import { College, Hostel, Review } from '../types';

export const mockColleges: College[] = [
  {
    id: 'snist',
    name: 'SNIST (Sreenidhi Institute of Science and Technology)',
    location: 'Yamnampet, Ghatkesar',
    coordinates: { lat: 17.5449, lng: 78.6898 }
  },
  {
    id: 'anurag',
    name: 'ANURAG Group of Institutions',
    location: 'Venkatapur, Ghatkesar',
    coordinates: { lat: 17.5234, lng: 78.6789 }
  },
  {
    id: 'ace',
    name: 'ACE Engineering College',
    location: 'Ankushapur, Ghatkesar',
    coordinates: { lat: 17.5567, lng: 78.6456 }
  },
  {
    id: 'jntu',
    name: 'JNTU Hyderabad',
    location: 'Kukatpally',
    coordinates: { lat: 17.4926, lng: 78.3914 }
  },
  {
    id: 'vnr',
    name: 'VNR VJIET',
    location: 'Bachupally',
    coordinates: { lat: 17.5467, lng: 78.3234 }
  }
];

export const mockHostels: Hostel[] = [
  {
    id: '1',
    name: 'Sri Venkateswara Boys Hostel',
    address: 'Near SNIST Gate, Yamnampet, Ghatkesar',
    coordinates: { lat: 17.5439, lng: 78.6888 },
    pricePerMonth: 8500,
    images: [
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
      'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg',
      'https://images.pexels.com/photos/271795/pexels-photo-271795.jpeg'
    ],
    amenities: ['Wi-Fi', 'Food', 'AC', 'Laundry', 'Security', 'Study Room'],
    rating: 4.3,
    totalReviews: 24,
    description: 'Premium boys hostel with AC rooms and excellent food quality. Located just 200m from SNIST main gate.',
    ownerId: 'owner1',
    totalBeds: 50,
    availableBeds: 8,
    hostelType: 'boys',
    verified: true,
    createdAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '2',
    name: 'Comfort Girls PG',
    address: 'Ghatkesar Main Road, Near Bus Stop',
    coordinates: { lat: 17.5423, lng: 78.6823 },
    pricePerMonth: 7000,
    images: [
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
      'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg'
    ],
    amenities: ['Wi-Fi', 'Food', 'Non-AC', 'Laundry', 'Security'],
    rating: 4.1,
    totalReviews: 18,
    description: 'Safe and comfortable girls PG with home-like environment. Excellent food and cleanliness maintained.',
    ownerId: 'owner2',
    totalBeds: 30,
    availableBeds: 5,
    hostelType: 'girls',
    verified: true,
    createdAt: '2024-01-20T00:00:00Z'
  },
  {
    id: '3',
    name: 'Tech Valley Hostel',
    address: 'Venkatapur Village, Near ANURAG College',
    coordinates: { lat: 17.5244, lng: 78.6799 },
    pricePerMonth: 9000,
    images: [
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
      'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg',
      'https://images.pexels.com/photos/271795/pexels-photo-271795.jpeg'
    ],
    amenities: ['Wi-Fi', 'Food', 'AC', 'Laundry', 'Security', 'Gym', 'Study Room'],
    rating: 4.5,
    totalReviews: 32,
    description: 'Modern co-ed hostel with separate floors for boys and girls. Premium amenities and great food.',
    ownerId: 'owner3',
    totalBeds: 80,
    availableBeds: 12,
    hostelType: 'co-ed',
    verified: true,
    createdAt: '2024-02-01T00:00:00Z'
  },
  {
    id: '4',
    name: 'Budget Stay PG',
    address: 'Ghatkesar, Near Railway Station',
    coordinates: { lat: 17.5489, lng: 78.6756 },
    pricePerMonth: 5500,
    images: [
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
      'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg'
    ],
    amenities: ['Wi-Fi', 'Food', 'Non-AC', 'Security'],
    rating: 3.8,
    totalReviews: 15,
    description: 'Affordable PG accommodation for students. Basic amenities with good connectivity.',
    ownerId: 'owner4',
    totalBeds: 25,
    availableBeds: 3,
    hostelType: 'boys',
    verified: true,
    createdAt: '2024-02-15T00:00:00Z'
  },
  {
    id: '5',
    name: 'Green Valley Girls Hostel',
    address: 'Ankushapur, Near ACE Engineering College',
    coordinates: { lat: 17.5577, lng: 78.6466 },
    pricePerMonth: 8000,
    images: [
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
      'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg',
      'https://images.pexels.com/photos/271795/pexels-photo-271795.jpeg'
    ],
    amenities: ['Wi-Fi', 'Food', 'AC', 'Laundry', 'Security', 'Garden'],
    rating: 4.2,
    totalReviews: 21,
    description: 'Beautiful girls hostel surrounded by greenery. Peaceful environment perfect for studies.',
    ownerId: 'owner5',
    totalBeds: 40,
    availableBeds: 6,
    hostelType: 'girls',
    verified: true,
    createdAt: '2024-02-20T00:00:00Z'
  }
];

export const mockReviews: Review[] = [
  {
    id: '1',
    hostelId: '1',
    studentId: 'student1',
    studentName: 'Rahul Kumar',
    collegeName: 'SNIST',
    rating: {
      overall: 4,
      food: 4,
      cleanliness: 4,
      safety: 5
    },
    comment: 'Great hostel with excellent food quality. The location is perfect for SNIST students. Security is top-notch.',
    verified: true,
    createdAt: '2024-03-01T00:00:00Z'
  },
  {
    id: '2',
    hostelId: '1',
    studentId: 'student2',
    studentName: 'Priya Sharma',
    collegeName: 'SNIST',
    rating: {
      overall: 5,
      food: 5,
      cleanliness: 4,
      safety: 5
    },
    comment: 'AC rooms are comfortable and the study room is very helpful during exams. Highly recommended!',
    verified: true,
    createdAt: '2024-03-05T00:00:00Z'
  },
  {
    id: '3',
    hostelId: '2',
    studentId: 'student3',
    studentName: 'Anjali Reddy',
    collegeName: 'SNIST',
    rating: {
      overall: 4,
      food: 4,
      cleanliness: 4,
      safety: 4
    },
    comment: 'Good PG with homely food. The aunty who manages is very caring. Only issue is Wi-Fi speed could be better.',
    verified: true,
    createdAt: '2024-03-10T00:00:00Z'
  }
];
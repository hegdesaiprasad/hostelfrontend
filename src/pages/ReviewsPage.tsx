import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Plus, Filter } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';

const ReviewsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getHostelById, getReviewsByHostel, addReview } = useData();
  
  const [showAddReview, setShowAddReview] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: {
      overall: 5,
      food: 5,
      cleanliness: 5,
      safety: 5,
    },
    comment: '',
  });

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

  const handleRatingChange = (category: string, rating: number) => {
    setNewReview(prev => ({
      ...prev,
      rating: {
        ...prev.rating,
        [category]: rating,
      },
    }));
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/auth');
      return;
    }

    addReview({
      hostelId: hostel.id,
      studentId: user.id,
      studentName: user.name,
      collegeName: user.college || '',
      rating: newReview.rating,
      comment: newReview.comment,
      verified: true,
    });

    setShowAddReview(false);
    setNewReview({
      rating: { overall: 5, food: 5, cleanliness: 5, safety: 5 },
      comment: '',
    });
  };

  const averageRatings = {
    overall: reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating.overall, 0) / reviews.length : 0,
    food: reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating.food, 0) / reviews.length : 0,
    cleanliness: reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating.cleanliness, 0) / reviews.length : 0,
    safety: reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating.safety, 0) / reviews.length : 0,
  };

  const RatingStars: React.FC<{ rating: number; onChange?: (rating: number) => void; readonly?: boolean }> = ({ 
    rating, 
    onChange, 
    readonly = false 
  }) => (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => !readonly && onChange?.(star)}
          disabled={readonly}
          className={`${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} transition-transform`}
        >
          <Star
            className={`w-5 h-5 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Reviews</h1>
                <p className="text-gray-600">{hostel.name}</p>
              </div>
            </div>
            
            {user && (
              <button
                onClick={() => setShowAddReview(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Review</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Rating Summary */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Overall Ratings</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{averageRatings.overall.toFixed(1)}</div>
              <div className="text-sm text-gray-600 mb-2">Overall</div>
              <RatingStars rating={averageRatings.overall} readonly />
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{averageRatings.food.toFixed(1)}</div>
              <div className="text-sm text-gray-600 mb-2">Food</div>
              <RatingStars rating={averageRatings.food} readonly />
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{averageRatings.cleanliness.toFixed(1)}</div>
              <div className="text-sm text-gray-600 mb-2">Cleanliness</div>
              <RatingStars rating={averageRatings.cleanliness} readonly />
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{averageRatings.safety.toFixed(1)}</div>
              <div className="text-sm text-gray-600 mb-2">Safety</div>
              <RatingStars rating={averageRatings.safety} readonly />
            </div>
          </div>
        </div>

        {/* Add Review Modal */}
        {showAddReview && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Add Your Review</h3>
                  <button
                    onClick={() => setShowAddReview(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={handleSubmitReview} className="space-y-6">
                  {/* Rating Categories */}
                  <div className="space-y-4">
                    {Object.entries(newReview.rating).map(([category, rating]) => (
                      <div key={category}>
                        <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                          {category}
                        </label>
                        <RatingStars
                          rating={rating}
                          onChange={(newRating) => handleRatingChange(category, newRating)}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Comment */}
                  <div>
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Review
                    </label>
                    <textarea
                      id="comment"
                      rows={4}
                      value={newReview.comment}
                      onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Share your experience..."
                    />
                  </div>

                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowAddReview(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Submit Review
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Reviews List */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Student Reviews ({reviews.length})
              </h2>
              <button className="flex items-center space-x-2 px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {reviews.length === 0 ? (
              <div className="p-12 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
                <p className="text-gray-600 mb-4">Be the first to review this hostel!</p>
                {user && (
                  <button
                    onClick={() => setShowAddReview(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Write a Review
                  </button>
                )}
              </div>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="font-medium text-gray-900">{review.studentName}</div>
                      <div className="text-sm text-gray-600">{review.collegeName}</div>
                      <div className="text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 font-medium">{review.rating.overall}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-sm text-gray-600">Food</div>
                      <div className="font-medium">{review.rating.food}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600">Cleanliness</div>
                      <div className="font-medium">{review.rating.cleanliness}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600">Safety</div>
                      <div className="font-medium">{review.rating.safety}</div>
                    </div>
                  </div>

                  <p className="text-gray-700">{review.comment}</p>

                  {review.verified && (
                    <div className="mt-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Verified Student
                      </span>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;
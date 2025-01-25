import React, { useState } from 'react';
import { Star, ThumbsUp, Flag } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface Review {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
  user: {
    full_name: string;
  };
  helpful_count: number;
}

interface ProductReviewsProps {
  productId: string;
  averageRating: number;
  totalReviews: number;
}

export default function ProductReviews({ productId, averageRating, totalReviews }: ProductReviewsProps) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'positive' | 'critical'>('all');
  const [sort, setSort] = useState<'recent' | 'helpful'>('recent');

  const fetchReviews = async () => {
    const query = supabase
      .from('reviews')
      .select(`
        id,
        rating,
        comment,
        created_at,
        user:profiles(full_name),
        helpful_count
      `)
      .eq('product_id', productId);

    if (filter === 'positive') {
      query.gte('rating', 4);
    } else if (filter === 'critical') {
      query.lte('rating', 3);
    }

    if (sort === 'recent') {
      query.order('created_at', { ascending: false });
    } else {
      query.order('helpful_count', { ascending: false });
    }

    const { data, error } = await query;
    if (error) {
      toast.error('Failed to load reviews');
      return;
    }
    setReviews(data || []);
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please sign in to leave a review');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from('reviews').insert({
        product_id: productId,
        user_id: user.id,
        rating: userRating,
        comment
      });

      if (error) throw error;

      toast.success('Review submitted successfully');
      setUserRating(0);
      setComment('');
      fetchReviews();
    } catch (error) {
      toast.error('Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  const handleHelpful = async (reviewId: string) => {
    if (!user) {
      toast.error('Please sign in to mark reviews as helpful');
      return;
    }

    try {
      const { error } = await supabase.rpc('increment_helpful_count', {
        review_id: reviewId
      });

      if (error) throw error;
      fetchReviews();
    } catch (error) {
      toast.error('Failed to mark review as helpful');
    }
  };

  const handleReport = async (reviewId: string) => {
    if (!user) {
      toast.error('Please sign in to report reviews');
      return;
    }

    try {
      const { error } = await supabase.from('review_reports').insert({
        review_id: reviewId,
        user_id: user.id
      });

      if (error) throw error;
      toast.success('Review reported successfully');
    } catch (error) {
      toast.error('Failed to report review');
    }
  };

  return (
    <div className="space-y-8">
      {/* Rating Summary */}
      <div className="flex items-center gap-8">
        <div className="text-center">
          <div className="text-5xl font-bold mb-2">{averageRating.toFixed(1)}</div>
          <div className="flex items-center gap-1 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.round(averageRating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <div className="text-sm text-gray-600">{totalReviews} reviews</div>
        </div>

        <div className="flex-1">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = reviews.filter((r) => r.rating === rating).length;
            const percentage = (count / reviews.length) * 100 || 0;
            
            return (
              <div key={rating} className="flex items-center gap-2">
                <div className="text-sm text-gray-600 w-8">{rating}★</div>
                <div className="flex-1 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-yellow-400 rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="text-sm text-gray-600 w-12">{count}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Review Filters */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as typeof filter)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="all">All Reviews</option>
            <option value="positive">Positive (4-5★)</option>
            <option value="critical">Critical (1-3★)</option>
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="recent">Most Recent</option>
            <option value="helpful">Most Helpful</option>
          </select>
        </div>
      </div>

      {/* Write Review Form */}
      {user && (
        <form onSubmit={handleSubmitReview} className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rating
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => setUserRating(rating)}
                  className="p-1"
                >
                  <Star
                    className={`w-6 h-6 ${
                      rating <= userRating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Review
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || userRating === 0}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-6">
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="flex items-center gap-2">
                  <div className="font-medium">{review.user.full_name}</div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  {new Date(review.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>

            <p className="text-gray-700 mb-4">{review.comment}</p>

            <div className="flex items-center gap-4">
              <button
                onClick={() => handleHelpful(review.id)}
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
              >
                <ThumbsUp className="w-4 h-4" />
                Helpful ({review.helpful_count})
              </button>
              <button
                onClick={() => handleReport(review.id)}
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
              >
                <Flag className="w-4 h-4" />
                Report
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
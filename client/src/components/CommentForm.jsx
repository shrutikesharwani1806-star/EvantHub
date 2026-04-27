import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment } from '../features/event/eventSlice';
import { toast } from 'react-toastify';

function CommentForm({ eventId }) {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const dispatch = useDispatch();
  const { eventLoading } = useSelector(state => state.event);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error('Please select a rating', { position: 'top-center', theme: 'dark' });
      return;
    }
    if (!text.trim()) {
      toast.error('Please enter a comment', { position: 'top-center', theme: 'dark' });
      return;
    }
    dispatch(addComment({ eventId, rating, text }));
    setRating(0);
    setText('');
  };

  return (
    <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 mb-6">
      <h3 className="text-lg font-bold text-white mb-4">Leave a Review</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-slate-300 text-sm mb-2">Rating</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="text-2xl focus:outline-none"
              >
                <span className={(hoverRating || rating) >= star ? 'text-amber-400' : 'text-slate-600'}>
                  ★
                </span>
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-slate-300 text-sm mb-2">Comment</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:border-violet-500 resize-none"
            rows="3"
            placeholder="Share your experience..."
          />
        </div>
        <button
          type="submit"
          disabled={eventLoading}
          className="px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors disabled:opacity-50"
        >
          {eventLoading ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
}

export default CommentForm;


import mongoose, { Schema } from 'mongoose';
import { IRating } from '../interfaces/rating.interface';

const ratingSchema = new Schema<IRating>({
  trip: {
    type: Schema.Types.ObjectId,
    ref: 'Trip',
    required: true
  },
  booking: {
    type: Schema.Types.ObjectId,
    ref: 'Booking'
  },
  reviewer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reviewee: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  
  categoryRatings: {
    punctuality: {
      type: Number,
      min: 1,
      max: 5
    },
    cleanliness: {
      type: Number,
      min: 1,
      max: 5
    },
    communication: {
      type: Number,
      min: 1,
      max: 5
    },
    driving: {
      type: Number,
      min: 1,
      max: 5
    },
    behavior: {
      type: Number,
      min: 1,
      max: 5
    }
  },
  
  review: {
    type: String,
    maxlength: 500
  },
  
  tags: [{
    type: String,
    enum: [
      'friendly',
      'punctual',
      'good_conversation',
      'quiet',
      'clean_car',
      'safe_driver',
      'music_lover',
      'flexible',
      'professional',
      'helpful',
      'respectful',
      'comfortable_ride'
    ]
  }],
  
  ratingType: {
    type: String,
    enum: ['driver', 'passenger'],
    required: true
  },
  
  isVisible: {
    type: Boolean,
    default: true
  },
  isReported: {
    type: Boolean,
    default: false
  },
  reportReason: String,
  
  response: {
    text: String,
    createdAt: Date
  }
}, {
  timestamps: true
});

ratingSchema.index({ reviewee: 1, isVisible: 1 });
ratingSchema.index({ reviewer: 1 });
ratingSchema.index({ trip: 1 });
ratingSchema.index({ booking: 1 });
ratingSchema.index({ booking: 1, reviewer: 1 }, { unique: true });

ratingSchema.methods.calculateAverageRating = function() {
  if (!this.categoryRatings) {
    return this.rating;
  }
  
  const categories = this.categoryRatings;
  const validRatings = Object.values(categories).filter((r): r is number => typeof r === 'number' && r > 0);
  
  if (validRatings.length === 0) {
    return this.rating;
  }
  
  const sum = validRatings.reduce((acc, val) => acc + val, 0);
  return Math.round((sum / validRatings.length) * 10) / 10;
};

export default mongoose.model<IRating>('Rating', ratingSchema);

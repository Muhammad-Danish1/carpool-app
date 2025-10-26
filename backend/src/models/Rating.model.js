const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  trip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip',
    required: true
  },
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking'
  },
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reviewee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Rating details
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  
  // Category ratings (optional, for detailed feedback)
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
    driving: { // For drivers only
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
  
  // Review
  review: {
    type: String,
    maxlength: 500
  },
  
  // Tags (pre-defined feedback tags)
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
  
  // Type of rating
  ratingType: {
    type: String,
    enum: ['driver', 'passenger'],
    required: true
  },
  
  // Status
  isVisible: {
    type: Boolean,
    default: true
  },
  isReported: {
    type: Boolean,
    default: false
  },
  reportReason: String,
  
  // Response from reviewee
  response: {
    text: String,
    createdAt: Date
  }
  
}, {
  timestamps: true
});

// Indexes
ratingSchema.index({ reviewee: 1, isVisible: 1 });
ratingSchema.index({ reviewer: 1 });
ratingSchema.index({ trip: 1 });
ratingSchema.index({ booking: 1 });

// Ensure one rating per booking per user
ratingSchema.index({ booking: 1, reviewer: 1 }, { unique: true });

// Calculate average from category ratings
ratingSchema.methods.calculateAverageRating = function() {
  const categories = this.categoryRatings;
  const validRatings = Object.values(categories).filter(r => r && r > 0);
  
  if (validRatings.length === 0) {
    return this.rating;
  }
  
  const sum = validRatings.reduce((acc, val) => acc + val, 0);
  return Math.round((sum / validRatings.length) * 10) / 10; // Round to 1 decimal
};

module.exports = mongoose.model('Rating', ratingSchema);

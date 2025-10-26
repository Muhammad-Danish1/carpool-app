import { Document, Types } from 'mongoose';

export interface ICategoryRatings {
  punctuality?: number;
  cleanliness?: number;
  communication?: number;
  driving?: number;
  behavior?: number;
}

export type RatingTag = 
  | 'friendly'
  | 'punctual'
  | 'good_conversation'
  | 'quiet'
  | 'clean_car'
  | 'safe_driver'
  | 'music_lover'
  | 'flexible'
  | 'professional'
  | 'helpful'
  | 'respectful'
  | 'comfortable_ride';

export interface IRatingResponse {
  text: string;
  createdAt: Date;
}

export interface IRating extends Document {
  trip: Types.ObjectId;
  booking?: Types.ObjectId;
  reviewer: Types.ObjectId;
  reviewee: Types.ObjectId;
  rating: number;
  categoryRatings?: ICategoryRatings;
  review?: string;
  tags?: RatingTag[];
  ratingType: 'driver' | 'passenger';
  isVisible: boolean;
  isReported: boolean;
  reportReason?: string;
  response?: IRatingResponse;
  createdAt: Date;
  updatedAt: Date;
  calculateAverageRating(): number;
}

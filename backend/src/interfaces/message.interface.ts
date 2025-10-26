import { Document, Types } from 'mongoose';

export interface IAttachment {
  type: 'image' | 'file';
  url: string;
  filename: string;
  size: number;
}

export interface IMessageLocation {
  latitude: number;
  longitude: number;
  address: string;
}

export interface IMessage extends Document {
  conversation: Types.ObjectId;
  sender: Types.ObjectId;
  recipient: Types.ObjectId;
  content: string;
  messageType: 'text' | 'image' | 'location' | 'booking' | 'system';
  attachments?: IAttachment[];
  location?: IMessageLocation;
  bookingReference?: Types.ObjectId;
  status: 'sent' | 'delivered' | 'read';
  deliveredAt?: Date;
  readAt?: Date;
  isDeleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

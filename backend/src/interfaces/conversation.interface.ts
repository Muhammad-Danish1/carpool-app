import { Document, Types } from 'mongoose';

export interface ILastMessage {
  content: string;
  sender: Types.ObjectId;
  createdAt: Date;
}

export interface IConversation extends Document {
  participants: Types.ObjectId[];
  trip?: Types.ObjectId;
  booking?: Types.ObjectId;
  lastMessage?: ILastMessage;
  unreadCounts: Map<string, number>;
  isActive: boolean;
  archivedBy: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  incrementUnread(userId: Types.ObjectId): Promise<void>;
  markAsRead(userId: Types.ObjectId): Promise<void>;
}

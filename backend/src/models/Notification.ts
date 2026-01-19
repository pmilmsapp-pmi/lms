
import mongoose, { Schema, Document } from 'mongoose';

export interface INotification extends Document {
  recipient: mongoose.Types.ObjectId;
  sender: mongoose.Types.ObjectId;
  topic?: mongoose.Types.ObjectId;
  // TAMBAHKAN 'course' ke dalam tipe
  type: 'reply' | 'mention' | 'approval' | 'system' | 'blog' | 'course'; 
  message: string;
  targetUrl?: string; 
  isRead: boolean;
  createdAt: Date;
}

const NotificationSchema = new Schema({
  recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  topic: { type: Schema.Types.ObjectId }, 
  
  type: { 
    type: String, 
    // UPDATE ENUM DISINI
    enum: ['reply', 'mention', 'approval', 'system', 'blog', 'course'], 
    required: true 
  },
  
  message: { type: String, required: true },
  targetUrl: { type: String }, 
  isRead: { type: Boolean, default: false }
}, { timestamps: true });

export const Notification = mongoose.model<INotification>('Notification', NotificationSchema);
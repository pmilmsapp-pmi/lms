// // // // import mongoose, { Schema, Document } from 'mongoose';

// // // // export interface INotification extends Document {
// // // //   recipient: mongoose.Types.ObjectId; // Penerima Notif
// // // //   sender: mongoose.Types.ObjectId;    // Pengirim Aksi
// // // //   topic: mongoose.Types.ObjectId;     // Link ke Topik
// // // //   type: 'reply' | 'mention' | 'approval';
// // // //   isRead: boolean;
// // // //   createdAt: Date;
// // // // }

// // // // const NotificationSchema = new Schema({
// // // //   recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
// // // //   sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
// // // //   topic: { type: Schema.Types.ObjectId, ref: 'Forum', required: true },
// // // //   type: { type: String, enum: ['reply', 'mention', 'approval'], required: true },
// // // //   isRead: { type: Boolean, default: false }
// // // // }, { timestamps: true });

// // // // export const Notification = mongoose.model<INotification>('Notification', NotificationSchema);
// // // import mongoose, { Schema, Document } from 'mongoose';

// // // export interface INotification extends Document {
// // //   recipient: mongoose.Types.ObjectId; // Penerima Notif
// // //   sender: mongoose.Types.ObjectId;    // Pengirim Aksi
// // //   topic?: mongoose.Types.ObjectId;    // Link ke Topik/Buku (Opsional)
// // //   type: 'reply' | 'mention' | 'approval' | 'system'; // TAMBAHKAN 'system' DISINI
// // //   message: string; // TAMBAHKAN field message
// // //   isRead: boolean;
// // //   createdAt: Date;
// // // }

// // // const NotificationSchema = new Schema({
// // //   recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
// // //   sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  
// // //   // Hapus 'required: true' agar fleksibel (bisa untuk buku atau forum)
// // //   topic: { type: Schema.Types.ObjectId, ref: 'Forum' }, 
  
// // //   type: { 
// // //     type: String, 
// // //     // TAMBAHKAN 'system' DISINI
// // //     enum: ['reply', 'mention', 'approval', 'system'], 
// // //     required: true 
// // //   },
  
// // //   // TAMBAHKAN field message di schema
// // //   message: { type: String, required: true },
  
// // //   isRead: { type: Boolean, default: false }
// // // }, { timestamps: true });

// // // export const Notification = mongoose.model<INotification>('Notification', NotificationSchema);
// // import mongoose, { Schema, Document } from 'mongoose';

// // export interface INotification extends Document {
// //   recipient: mongoose.Types.ObjectId;
// //   sender: mongoose.Types.ObjectId;
// //   topic?: mongoose.Types.ObjectId;
// //   // Menambahkan 'blog' dan 'system' ke dalam tipe notifikasi
// //   type: 'reply' | 'mention' | 'approval' | 'system' | 'blog';
// //   message: string;
// //   isRead: boolean;
// //   createdAt: Date;
// // }

// // const NotificationSchema = new Schema({
// //   recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
// //   sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  
// //   // Topic tidak required agar fleksibel (bisa null untuk notif umum)
// //   topic: { type: Schema.Types.ObjectId }, 
  
// //   type: { 
// //     type: String, 
// //     // Pastikan enum ini lengkap
// //     enum: ['reply', 'mention', 'approval', 'system', 'blog'], 
// //     required: true 
// //   },
  
// //   message: { type: String, required: true },
// //   isRead: { type: Boolean, default: false }
// // }, { timestamps: true });

// // export const Notification = mongoose.model<INotification>('Notification', NotificationSchema);
// import mongoose, { Schema, Document } from 'mongoose';

// export interface INotification extends Document {
//   recipient: mongoose.Types.ObjectId;
//   sender: mongoose.Types.ObjectId;
//   topic?: mongoose.Types.ObjectId;
//   // TAMBAHKAN 'course' DISINI
//   type: 'reply' | 'mention' | 'approval' | 'system' | 'blog' | 'course'; 
//   message: string;
//   isRead: boolean;
//   createdAt: Date;
// }

// const NotificationSchema = new Schema({
//   recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//   sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//   topic: { type: Schema.Types.ObjectId }, 
  
//   type: { 
//     type: String, 
//     // UPDATE ENUM DISINI
//     enum: ['reply', 'mention', 'approval', 'system', 'blog', 'course'], 
//     required: true 
//   },
  
//   message: { type: String, required: true },
//   isRead: { type: Boolean, default: false }
// }, { timestamps: true });

// export const Notification = mongoose.model<INotification>('Notification', NotificationSchema);
import mongoose, { Schema, Document } from 'mongoose';

export interface INotification extends Document {
  recipient: mongoose.Types.ObjectId;
  sender: mongoose.Types.ObjectId;
  topic?: mongoose.Types.ObjectId;
  // TAMBAHKAN 'course' ke dalam tipe
  type: 'reply' | 'mention' | 'approval' | 'system' | 'blog' | 'course'; 
  message: string;
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
  isRead: { type: Boolean, default: false }
}, { timestamps: true });

export const Notification = mongoose.model<INotification>('Notification', NotificationSchema);
// // // // import mongoose, { Schema, Document } from 'mongoose';

// // // // export interface IMessage extends Document {
// // // //   sender: mongoose.Types.ObjectId;
// // // //   recipient: mongoose.Types.ObjectId;
// // // //   message: string;
// // // //   isRead: boolean;
// // // //   createdAt: Date;
// // // // }

// // // // const MessageSchema: Schema = new Schema({
// // // //   sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
// // // //   recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
// // // //   message: { type: String, required: true },
// // // //   isRead: { type: Boolean, default: false },
// // // // }, { timestamps: true });

// // // // export const Message = mongoose.model<IMessage>('Message', MessageSchema);
// // // import mongoose, { Schema, Document } from 'mongoose';

// // // export interface IMessage extends Document {
// // //   sender: mongoose.Types.ObjectId;
// // //   recipient?: mongoose.Types.ObjectId; // Opsional untuk Global Chat
// // //   message: string;
// // //   isRead: boolean;
// // //   isGlobal: boolean; // Flag Chat Global
// // //   createdAt: Date;
// // // }

// // // const MessageSchema: Schema = new Schema({
// // //   sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
// // //   recipient: { type: Schema.Types.ObjectId, ref: 'User', required: false },
// // //   message: { type: String, required: true },
// // //   isRead: { type: Boolean, default: false },
// // //   isGlobal: { type: Boolean, default: false },
// // // }, { timestamps: true });

// // // // Indexing untuk performa pencarian chat
// // // MessageSchema.index({ createdAt: -1 });
// // // MessageSchema.index({ isGlobal: 1 });


// // // export const Message = mongoose.model<IMessage>('Message', MessageSchema);


// // import mongoose, { Schema, Document } from 'mongoose';

// // export interface IMessage extends Document {
// //   sender: mongoose.Types.ObjectId;
// //   recipient?: mongoose.Types.ObjectId; // Tetap ada (Legacy/Global Chat)
  
// //   // [NEW] Fields untuk Group Chat LMS
// //   course?: mongoose.Types.ObjectId; 
// //   type: 'internal' | 'public'; 
// //   attachment?: {
// //     url: string;
// //     type: 'image' | 'file';
// //     name: string;
// //   };

// //   message: string;
// //   isRead: boolean;
// //   isGlobal: boolean; 
// //   createdAt: Date;
// // }

// // const MessageSchema: Schema = new Schema({
// //   sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
// //   recipient: { type: Schema.Types.ObjectId, ref: 'User', required: false }, // Opsional
  
// //   // [NEW] Field Tambahan
// //   course: { type: Schema.Types.ObjectId, ref: 'Course', required: false }, // Opsional agar tidak merusak chat global lama
// //   type: { type: String, enum: ['internal', 'public'], default: 'public' },
// //   attachment: {
// //     url: { type: String },
// //     type: { type: String, enum: ['image', 'file'] },
// //     name: { type: String }
// //   },

// //   message: { type: String, required: false }, // Ubah required false karena bisa kirim attachment saja
// //   isRead: { type: Boolean, default: false },
// //   isGlobal: { type: Boolean, default: false },
// // }, { timestamps: true });

// // // Indexing
// // MessageSchema.index({ createdAt: -1 });
// // MessageSchema.index({ isGlobal: 1 });
// // MessageSchema.index({ course: 1, type: 1 }); // Index baru untuk performa group chat

// // export const Message = mongoose.model<IMessage>('Message', MessageSchema);
// // export default Message; // Export default juga agar kompatibel dengan import di controller lain
// import mongoose, { Schema, Document } from 'mongoose';

// export interface IMessage extends Document {
//   sender: mongoose.Types.ObjectId;
//   recipient?: mongoose.Types.ObjectId; 
//   course?: mongoose.Types.ObjectId; 
//   type: 'internal' | 'public'; 
//   attachment?: {
//     url: string;
//     type: 'image' | 'file';
//     name: string;
//   };
//   message: string;
//   isRead: boolean;
//   isGlobal: boolean; 
//   mentions: mongoose.Types.ObjectId[]; // [NEW] Array User ID yang di-mention
//   createdAt: Date;
// }

// const MessageSchema: Schema = new Schema({
//   sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//   recipient: { type: Schema.Types.ObjectId, ref: 'User', required: false },
  
//   course: { type: Schema.Types.ObjectId, ref: 'Course', required: false },
//   type: { type: String, enum: ['internal', 'public'], default: 'public' },
  
//   attachment: {
//     url: { type: String },
//     type: { type: String, enum: ['image', 'file'] },
//     name: { type: String }
//   },

//   message: { type: String, required: false },
//   isRead: { type: Boolean, default: false },
//   isGlobal: { type: Boolean, default: false },
  
//   // [NEW] Field Mentions
//   mentions: [{ type: Schema.Types.ObjectId, ref: 'User' }] 
// }, { timestamps: true });

// // Indexing
// MessageSchema.index({ createdAt: -1 });
// MessageSchema.index({ isGlobal: 1 });
// MessageSchema.index({ course: 1, type: 1 });

// export const Message = mongoose.model<IMessage>('Message', MessageSchema);
// export default Message;
import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  sender: mongoose.Types.ObjectId;
  recipient?: mongoose.Types.ObjectId; 
  course?: mongoose.Types.ObjectId; 
  type: 'internal' | 'public'; 
  attachment?: {
    url: string;
    type: 'image' | 'file';
    name: string;
  };
  message: string;
  isRead: boolean;
  isGlobal: boolean; 
  mentions: mongoose.Types.ObjectId[]; // [NEW] Array User ID yang di-mention
  createdAt: Date;
}

const MessageSchema: Schema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  recipient: { type: Schema.Types.ObjectId, ref: 'User', required: false },
  
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: false },
  type: { type: String, enum: ['internal', 'public'], default: 'public' },
  
  attachment: {
    url: { type: String },
    type: { type: String, enum: ['image', 'file'] },
    name: { type: String }
  },

  message: { type: String, required: false },
  isRead: { type: Boolean, default: false },
  isGlobal: { type: Boolean, default: false },
  
  // [NEW] Field Mentions
  mentions: [{ type: Schema.Types.ObjectId, ref: 'User' }] 
}, { timestamps: true });

// Indexing
MessageSchema.index({ createdAt: -1 });
MessageSchema.index({ isGlobal: 1 });
MessageSchema.index({ course: 1, type: 1 });

export const Message = mongoose.model<IMessage>('Message', MessageSchema);
export default Message;
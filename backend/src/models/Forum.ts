
// import mongoose, { Schema, Document } from 'mongoose';

// // Interface untuk Reply (Komentar)
// interface IReply {
//   user: mongoose.Types.ObjectId;
//   content: string;
//   createdAt: Date;
// }

// // Interface Utama Forum
// export interface IForum extends Document {
//   title: string;
//   content: string;
//   category: string;
//   author: mongoose.Types.ObjectId;
//   status: 'pending' | 'approved' | 'rejected';
//   replies: IReply[]; // Array komentar
//   createdAt: Date;
//   updatedAt: Date;
// }

// const ForumSchema = new Schema({
//   title: { type: String, required: true },
//   content: { type: String, required: true },
//   category: { type: String, required: true },
  
//   // Referensi ke User (Penulis Topik)
//   author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  
//   status: { 
//     type: String, 
//     enum: ['pending', 'approved', 'rejected'], 
//     default: 'pending' 
//   },

//   // STRUKTUR REPLIES YANG BENAR (PENTING!)
//   replies: [{
//     user: { type: Schema.Types.ObjectId, ref: 'User' }, // Ini yang dicari oleh populate('replies.user')
//     content: { type: String, required: true },
//     createdAt: { type: Date, default: Date.now }
//   }]
// }, { timestamps: true });

// export const Forum = mongoose.model<IForum>('Forum', ForumSchema);


import mongoose, { Schema, Document } from 'mongoose';

export interface IForum extends Document {
  title: string;
  content: string;
  category: string;
  author: mongoose.Types.ObjectId;
  views: number;
  status: 'pending' | 'approved' | 'rejected';
  isPinned: boolean; // [FIX] Properti ini yang sebelumnya hilang
  createdAt: Date;
  updatedAt: Date;
}

const ForumSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, default: 'Umum' },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  views: { type: Number, default: 0 },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'], 
    default: 'pending' 
  },
  
  // [FIX] Menambahkan field isPinned ke schema database
  isPinned: { type: Boolean, default: false } 

}, { timestamps: true });

export const Forum = mongoose.model<IForum>('Forum', ForumSchema);
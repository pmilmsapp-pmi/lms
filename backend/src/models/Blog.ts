// import mongoose, { Schema, Document } from 'mongoose';

// export interface IBlog extends Document {
//   title: string;
//   slug: string;
//   content: string;
//   author: mongoose.Types.ObjectId;
//   coverUrl?: string;
//   tags: string[];
//   status: 'pending' | 'approved' | 'rejected';
//   source?: string; // Asal cerita (User / PMI)
//   createdAt: Date;
//   updatedAt: Date;
// }

// const BlogSchema = new Schema({
//   title: { type: String, required: true },
//   slug: { type: String, unique: true },
//   content: { type: String, required: true },
//   author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//   coverUrl: { type: String },
//   tags: [{ type: String }],
//   status: { 
//     type: String, 
//     enum: ['pending', 'approved', 'rejected'], 
//     default: 'pending' 
//   },
//   source: { type: String, default: 'User Submission' }
// }, { timestamps: true });

// export const Blog = mongoose.model<IBlog>('Blog', BlogSchema);

import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  content: string;
  coverUrl: string;
  author: mongoose.Types.ObjectId;
  tags: string[];
  status: 'pending' | 'approved' | 'rejected';
  isPublished: boolean;
  views: number; // [PENTING] Field ini harus ada
  allowComments: boolean;
  comments: any[]; // Legacy support
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  coverUrl: { type: String },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  tags: [{ type: String }],
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'], 
    default: 'pending' 
  },
  isPublished: { type: Boolean, default: false },
  
  // [CRITICAL FIX] Menambahkan field views dengan default 0
  views: { type: Number, default: 0 }, 
  
  allowComments: { type: Boolean, default: true },
  comments: [{ // Legacy embedded comments
      author: { type: Schema.Types.ObjectId, ref: 'User' },
      content: String,
      createdAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

export const Blog = mongoose.model<IBlog>('Blog', BlogSchema);
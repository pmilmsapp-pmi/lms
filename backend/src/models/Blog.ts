// // import mongoose, { Schema, Document } from 'mongoose';

// // export interface IBlog extends Document {
// //   title: string;
// //   slug: string;
// //   content: string;
// //   author: mongoose.Types.ObjectId;
// //   coverUrl?: string;
// //   tags: string[];
// //   status: 'pending' | 'approved' | 'rejected';
// //   source?: string; // Untuk menandai jika diambil dari web PMI
// //   createdAt: Date;
// // }

// // const BlogSchema = new Schema({
// //   title: { type: String, required: true },
// //   slug: { type: String, unique: true }, // URL friendly: kisah-relawan-aceh
// //   content: { type: String, required: true },
// //   author: { type: Schema.Types.ObjectId, ref: 'User' },
// //   coverUrl: { type: String },
// //   tags: [{ type: String }],
// //   status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
// //   source: { type: String, default: 'User Submission' }
// // }, { timestamps: true });

// // export const Blog = mongoose.model<IBlog>('Blog', BlogSchema);
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
// }

// const BlogSchema = new Schema({
//   title: { type: String, required: true },
//   slug: { type: String, unique: true },
//   content: { type: String, required: true },
//   author: { type: Schema.Types.ObjectId, ref: 'User' },
//   coverUrl: { type: String },
//   tags: [{ type: String }],
//   status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
//   source: { type: String, default: 'User Submission' }
// }, { timestamps: true });

// export const Blog = mongoose.model<IBlog>('Blog', BlogSchema);
import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  content: string;
  author: mongoose.Types.ObjectId;
  coverUrl?: string;
  tags: string[];
  status: 'pending' | 'approved' | 'rejected';
  source?: string; // Asal cerita (User / PMI)
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  coverUrl: { type: String },
  tags: [{ type: String }],
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'], 
    default: 'pending' 
  },
  source: { type: String, default: 'User Submission' }
}, { timestamps: true });

export const Blog = mongoose.model<IBlog>('Blog', BlogSchema);
// // import mongoose, { Schema, Document } from 'mongoose';

// // export interface IBook extends Document {
// //   title: string;
// //   description?: string;
// //   category: string; // Misal: "SOP", "Panduan Teknis", "Jurnal"
// //   fileUrl: string;  // Link ke file PDF/Doc
// //   coverUrl?: string; // Link ke gambar sampul
// //   uploadedBy: mongoose.Types.ObjectId;
// //   createdAt: Date;
// // }

// // const BookSchema = new Schema({
// //   title: { type: String, required: true },
// //   description: { type: String },
// //   category: { type: String, default: 'Umum' },
// //   fileUrl: { type: String, required: true },
// //   coverUrl: { type: String },
// //   uploadedBy: { type: Schema.Types.ObjectId, ref: 'User' }
// // }, { timestamps: true });

// // export const Book = mongoose.model<IBook>('Book', BookSchema);
// import mongoose, { Schema, Document } from 'mongoose';

// export interface IBook extends Document {
//   title: string;
//   description?: string;
//   category: string;
//   author: string; // Tambahan
//   year: string;   // Tambahan
//   fileUrl: string;
//   coverUrl?: string;
//   uploadedBy: mongoose.Types.ObjectId;
//   createdAt: Date;
// }

// const BookSchema = new Schema({
//   title: { type: String, required: true },
//   description: { type: String },
//   category: { type: String, default: 'Umum' },
//   author: { type: String, default: '-' }, // Default value
//   year: { type: String, default: new Date().getFullYear().toString() }, // Default tahun sekarang
//   fileUrl: { type: String, required: true },
//   coverUrl: { type: String },
//   uploadedBy: { type: Schema.Types.ObjectId, ref: 'User' }
// }, { timestamps: true });

// export const Book = mongoose.model<IBook>('Book', BookSchema);
import mongoose, { Schema, Document } from 'mongoose';

export interface IBook extends Document {
  title: string;
  description?: string;
  category?: string;
  author?: string;
  year?: string;
  fileUrl: string;
  coverUrl?: string;
  uploadedBy: mongoose.Types.ObjectId;
  status: 'draft' | 'published'; // <--- TAMBAHKAN INI
  createdAt: Date;
  updatedAt: Date;
}

const BookSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, default: 'General' },
  author: { type: String },
  year: { type: String },
  fileUrl: { type: String, required: true },
  coverUrl: { type: String },
  uploadedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { 
      type: String, 
      enum: ['draft', 'published'], 
      default: 'draft' // <--- DEFAULT DRAFT
  } 
}, { timestamps: true });

export const Book = mongoose.model<IBook>('Book', BookSchema);
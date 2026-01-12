// // // import mongoose, { Schema, Document } from 'mongoose';

// // // export interface IReply {
// // //   _id: string;
// // //   content: string;
// // //   author: { _id: string; name: string; avatarUrl?: string };
// // //   createdAt: Date;
// // // }

// // // export interface IForum extends Document {
// // //   title: string;
// // //   content: string;
// // //   category: string; // Misal: "Umum", "Q&A", "Teknis"
// // //   author: { _id: string; name: string; avatarUrl?: string };
// // //   replies: IReply[];
// // //   createdAt: Date;
// // // }

// // // const ForumSchema = new Schema({
// // //   title: { type: String, required: true },
// // //   content: { type: String, required: true },
// // //   category: { type: String, default: 'Umum' },
// // //   author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
// // //   replies: [{
// // //     content: { type: String, required: true },
// // //     author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
// // //     createdAt: { type: Date, default: Date.now }
// // //   }]
// // // }, { timestamps: true });

// // // export const Forum = mongoose.model<IForum>('Forum', ForumSchema);
// // import mongoose, { Schema, Document } from 'mongoose';

// // // Interface untuk Balasan (Reply)
// // export interface IReply {
// //   _id: string;
// //   content: string;
// //   author: mongoose.Types.ObjectId; // Referensi ke User ID
// //   createdAt: Date;
// // }

// // // Interface Utama Forum
// // export interface IForum extends Document {
// //   title: string;
// //   content: string;
// //   category: string;
// //   author: mongoose.Types.ObjectId; // Pembuat topik
// //   status: 'pending' | 'approved' | 'rejected'; // Status persetujuan
// //   replies: IReply[];
// //   avatarUrl?: string; // Icon topik (Opsional, dipilih oleh Admin/CMS)
// //   createdAt: Date;
// //   updatedAt: Date;
// // }

// // const ForumSchema: Schema = new Schema({
// //   title: { 
// //     type: String, 
// //     required: true 
// //   },
// //   content: { 
// //     type: String, 
// //     required: true 
// //   },
// //   category: { 
// //     type: String, 
// //     default: 'General' 
// //   },
// //   // Field author merujuk ke collection 'User'
// //   author: { 
// //     type: Schema.Types.ObjectId, 
// //     ref: 'User', 
// //     required: true 
// //   },
// //   // Status Approval
// //   status: { 
// //     type: String, 
// //     enum: ['pending', 'approved', 'rejected'], 
// //     default: 'pending' 
// //   },
// //   // Icon khusus topik (jika ada)
// //   avatarUrl: { 
// //     type: String, 
// //     default: null 
// //   },
// //   // Array Balasan
// //   replies: [{
// //     content: { type: String, required: true },
// //     author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
// //     createdAt: { type: Date, default: Date.now }
// //   }]
// // }, { 
// //   timestamps: true // Otomatis buat createdAt dan updatedAt
// // });

// // export const Forum = mongoose.model<IForum>('Forum', ForumSchema);
// import mongoose, { Schema, Document } from 'mongoose';

// // Interface untuk Balasan
// export interface IReply {
//   _id: string;
//   content: string;
//   author: mongoose.Types.ObjectId;
//   createdAt: Date;
// }

// // Interface Utama Forum
// export interface IForum extends Document {
//   title: string;
//   content: string;
//   category: string;
//   author: mongoose.Types.ObjectId;
//   status: 'pending' | 'approved' | 'rejected';
//   replies: IReply[];
//   avatarUrl?: string;
//   participants: mongoose.Types.ObjectId[]; // <--- TAMBAHAN PENTING
//   createdAt: Date;
//   updatedAt: Date;
// }

// const ForumSchema: Schema = new Schema({
//   title: { type: String, required: true },
//   content: { type: String, required: true },
//   category: { type: String, default: 'General' },
//   author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//   status: { 
//     type: String, 
//     enum: ['pending', 'approved', 'rejected'], 
//     default: 'pending' 
//   },
//   avatarUrl: { type: String, default: null },
//   replies: [{
//     content: { type: String, required: true },
//     author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//     createdAt: { type: Date, default: Date.now }
//   }],
//   // Tambahkan field participants di Schema database juga
//   participants: [{ type: Schema.Types.ObjectId, ref: 'User' }] 
// }, { 
//   timestamps: true 
// });

// export const Forum = mongoose.model<IForum>('Forum', ForumSchema);
import mongoose, { Schema, Document } from 'mongoose';

// Interface untuk Reply (Komentar)
interface IReply {
  user: mongoose.Types.ObjectId;
  content: string;
  createdAt: Date;
}

// Interface Utama Forum
export interface IForum extends Document {
  title: string;
  content: string;
  category: string;
  author: mongoose.Types.ObjectId;
  status: 'pending' | 'approved' | 'rejected';
  replies: IReply[]; // Array komentar
  createdAt: Date;
  updatedAt: Date;
}

const ForumSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  
  // Referensi ke User (Penulis Topik)
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'], 
    default: 'pending' 
  },

  // STRUKTUR REPLIES YANG BENAR (PENTING!)
  replies: [{
    user: { type: Schema.Types.ObjectId, ref: 'User' }, // Ini yang dicari oleh populate('replies.user')
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

export const Forum = mongoose.model<IForum>('Forum', ForumSchema);
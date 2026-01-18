// import mongoose, { Schema, Document } from 'mongoose';

// export interface IComment extends Document {
//   content: string;
//   blogId: mongoose.Types.ObjectId;
//   author: mongoose.Types.ObjectId;
//   parentId?: mongoose.Types.ObjectId; // Untuk Reply
//   createdAt: Date;
// }

// const CommentSchema: Schema = new Schema({
//   content: { type: String, required: true },
//   blogId: { type: Schema.Types.ObjectId, ref: 'Blog', required: true },
//   author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//   parentId: { type: Schema.Types.ObjectId, ref: 'Comment', default: null }, // Jika null berarti komentar utama
// }, { timestamps: true });

// export default mongoose.model<IComment>('Comment', CommentSchema);


import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
  content: string;
  forumId?: mongoose.Types.ObjectId; // Opsional
  blogId?: mongoose.Types.ObjectId;  // Opsional [BARU]
  author: mongoose.Types.ObjectId;
  parent: mongoose.Types.ObjectId | null;
  createdAt: Date;
}

const CommentSchema: Schema = new Schema({
  content: { type: String, required: true },
  
  // Salah satu dari forumId atau blogId harus diisi (validasi di controller)
  forumId: { type: Schema.Types.ObjectId, ref: 'Forum', required: false }, 
  blogId: { type: Schema.Types.ObjectId, ref: 'Blog', required: false }, // [BARU] Tambahkan ini
  
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  parent: { type: Schema.Types.ObjectId, ref: 'Comment', default: null }, 
}, { timestamps: true });

export const Comment = mongoose.model<IComment>('Comment', CommentSchema);
export default Comment;
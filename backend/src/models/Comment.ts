import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
  content: string;
  blogId: mongoose.Types.ObjectId;
  author: mongoose.Types.ObjectId;
  parentId?: mongoose.Types.ObjectId; // Untuk Reply
  createdAt: Date;
}

const CommentSchema: Schema = new Schema({
  content: { type: String, required: true },
  blogId: { type: Schema.Types.ObjectId, ref: 'Blog', required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  parentId: { type: Schema.Types.ObjectId, ref: 'Comment', default: null }, // Jika null berarti komentar utama
}, { timestamps: true });

export default mongoose.model<IComment>('Comment', CommentSchema);
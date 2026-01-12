
import mongoose, { Schema, Document } from 'mongoose';

export interface IAttachment extends Document {
  url: string;
  filename: string;
  mimetype: string;
  size: number;
}

const AttachmentSchema = new Schema<IAttachment>({
  url: String,
  filename: String,
  mimetype: String,
  size: Number
}, { timestamps: true });

export default mongoose.model<IAttachment>('Attachment', AttachmentSchema);

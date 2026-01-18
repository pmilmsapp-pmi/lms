import mongoose, { Schema, Document } from 'mongoose';

export interface IBackupLog extends Document {
  filename: string;
  size: number;
  url: string;
  status: 'success' | 'failed';
  triggeredBy: string;
  createdAt: Date;
}

const BackupLogSchema = new Schema({
  filename: { type: String, required: true },
  size: { type: Number, default: 0 },
  url: { type: String, required: true },
  status: { type: String, enum: ['success', 'failed'], default: 'success' },
  triggeredBy: { type: String, required: true },
}, { timestamps: true });

export const BackupLog = mongoose.model<IBackupLog>('BackupLog', BackupLogSchema);
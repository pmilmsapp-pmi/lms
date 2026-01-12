
import mongoose, { Schema, Document } from 'mongoose';

export interface IAttempt extends Document {
  quiz: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  score: number;
  startedAt: Date;
  submittedAt?: Date;
  status: 'in_progress'|'submitted'|'expired';
}

const AttemptSchema = new Schema<IAttempt>({
  quiz: { type: Schema.Types.ObjectId, ref: 'Quiz', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true },
  startedAt: { type: Date, default: Date.now },
  submittedAt: { type: Date },
  status: { type: String, enum: ['in_progress','submitted','expired'], default: 'in_progress' }
}, { timestamps: true });

AttemptSchema.index({ user: 1, quiz: 1, createdAt: -1 });

export default mongoose.model<IAttempt>('Attempt', AttemptSchema);

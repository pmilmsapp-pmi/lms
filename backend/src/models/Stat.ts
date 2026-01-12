import mongoose, { Schema, Document } from 'mongoose';

export interface IStat extends Document {
  key: string;
  value: number;
}

const StatSchema = new Schema({
  key: { type: String, required: true, unique: true }, // misal: 'visitors'
  value: { type: Number, default: 0 }
});

export const Stat = mongoose.model<IStat>('Stat', StatSchema);
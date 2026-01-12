import mongoose, { Schema, Document } from 'mongoose';

export interface IStudentProgress extends Document {
  studentId: mongoose.Types.ObjectId;
  courseId: mongoose.Types.ObjectId;
  moduleId: mongoose.Types.ObjectId;
  lessonId: mongoose.Types.ObjectId;
  
  // Status Pengerjaan
  isCompleted: boolean;
  completedAt?: Date;

  // Data Spesifik
  quizScore?: number;       // Jika materi adalah Kuis
  submissionUrl?: string;   // Jika materi adalah Upload Tugas
}

const StudentProgressSchema = new Schema({
  studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  moduleId: { type: Schema.Types.ObjectId, required: true },
  lessonId: { type: Schema.Types.ObjectId, required: true },
  
  isCompleted: { type: Boolean, default: false },
  completedAt: Date,

  quizScore: Number,
  submissionUrl: String
}, { timestamps: true });

// Index agar pencarian cepat & mencegah duplikasi progress per lesson
StudentProgressSchema.index({ studentId: 1, lessonId: 1 }, { unique: true });

export const StudentProgress = mongoose.model<IStudentProgress>('StudentProgress', StudentProgressSchema);
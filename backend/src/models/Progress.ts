
// // // // // // // // import mongoose, { Schema, Document } from 'mongoose';

// // // // // // // // export interface IProgress extends Document {
// // // // // // // //   user: mongoose.Types.ObjectId;
// // // // // // // //   course: mongoose.Types.ObjectId;
// // // // // // // //   moduleIndex: number;
// // // // // // // //   lessonIndex: number;
// // // // // // // //   completedAt: Date;
// // // // // // // // }

// // // // // // // // const ProgressSchema = new Schema<IProgress>({
// // // // // // // //   user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
// // // // // // // //   course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
// // // // // // // //   moduleIndex: { type: Number, required: true },
// // // // // // // //   lessonIndex: { type: Number, required: true },
// // // // // // // //   completedAt: { type: Date, default: Date.now }
// // // // // // // // }, { timestamps: true });

// // // // // // // // ProgressSchema.index({ user: 1, course: 1, moduleIndex: 1, lessonIndex: 1 }, { unique: true });

// // // // // // // // export default mongoose.model<IProgress>('Progress', ProgressSchema);
// // // // // // // import mongoose, { Schema, Document } from 'mongoose';

// // // // // // // export interface IProgress extends Document {
// // // // // // //   userId: mongoose.Types.ObjectId;
// // // // // // //   courseId: mongoose.Types.ObjectId;
// // // // // // //   completed: boolean;
// // // // // // //   completedLessons: string[];
// // // // // // //   lastAccessed: Date;
// // // // // // // }

// // // // // // // const ProgressSchema: Schema = new Schema({
// // // // // // //   userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
// // // // // // //   courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
// // // // // // //   completed: { type: Boolean, default: false },
// // // // // // //   completedLessons: [{ type: String }],
// // // // // // //   lastAccessed: { type: Date, default: Date.now }
// // // // // // // }, { timestamps: true });

// // // // // // // // Pastikan baris ini ada: mengekspor model dengan nama Progress
// // // // // // // export const Progress = mongoose.model<IProgress>('Progress', ProgressSchema);

// // // // // // import mongoose, { Schema, Document } from 'mongoose';

// // // // // // export interface IProgress extends Document {
// // // // // //   userId: mongoose.Types.ObjectId;
// // // // // //   courseId: mongoose.Types.ObjectId;
// // // // // //   completed: boolean;
// // // // // //   completedLessons: string[];
// // // // // //   lastAccessed: Date;
// // // // // // }

// // // // // // const ProgressSchema: Schema = new Schema({
// // // // // //   userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
// // // // // //   courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
// // // // // //   completed: { type: Boolean, default: false },
// // // // // //   completedLessons: [{ type: String }],
// // // // // //   lastAccessed: { type: Date, default: Date.now }
// // // // // // }, { timestamps: true });

// // // // // // // PENTING: Gunakan export const agar terbaca oleh file lain
// // // // // // export const Progress = mongoose.model<IProgress>('Progress', ProgressSchema);
// // // // // import mongoose, { Schema, Document } from 'mongoose';

// // // // // export interface IProgress extends Document {
// // // // //   userId: mongoose.Types.ObjectId;
// // // // //   courseId: mongoose.Types.ObjectId;
  
// // // // //   // Status Penyelesaian Keseluruhan
// // // // //   completed: boolean;
// // // // //   completedAt?: Date; // Tanggal selesai kursus

// // // // //   // Daftar Lesson yang sudah selesai (berisi ID Lesson)
// // // // //   // Ini digunakan untuk menghitung persentase progress bar
// // // // //   completedLessons: string[]; 
  
// // // // //   // Tracking Quiz Scores (Opsional, berguna untuk raport)
// // // // //   quizScores: {
// // // // //       lessonId: string;
// // // // //       score: number;
// // // // //       passed: boolean;
// // // // //       attempts: number;
// // // // //   }[];

// // // // //   lastAccessed: Date;
// // // // // }

// // // // // const ProgressSchema: Schema = new Schema({
// // // // //   userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
// // // // //   courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  
// // // // //   completed: { type: Boolean, default: false },
// // // // //   completedAt: { type: Date },

// // // // //   completedLessons: [{ type: String }], // Array of Lesson IDs
  
// // // // //   quizScores: [{
// // // // //       lessonId: { type: String },
// // // // //       score: { type: Number },
// // // // //       passed: { type: Boolean },
// // // // //       attempts: { type: Number, default: 1 }
// // // // //   }],

// // // // //   lastAccessed: { type: Date, default: Date.now }
// // // // // }, { timestamps: true });

// // // // // // Index agar pencarian progress user per kursus cepat
// // // // // ProgressSchema.index({ userId: 1, courseId: 1 }, { unique: true });

// // // // // export const Progress = mongoose.model<IProgress>('Progress', ProgressSchema);
// // // // import mongoose, { Schema, Document } from 'mongoose';

// // // // export interface IProgress extends Document {
// // // //   userId: mongoose.Types.ObjectId;
// // // //   courseId: mongoose.Types.ObjectId;
// // // //   completed: boolean;
// // // //   completedLessons: string[];
  
// // // //   // --- TAMBAHAN BARU ---
// // // //   // Menyimpan status kuis yang SEDANG dikerjakan (belum submit)
// // // //   activeAttempt?: {
// // // //       lessonId: string;
// // // //       startedAt: Date;
// // // //       durationSeconds: number; // Simpan durasi snapshot saat mulai
// // // //   };
// // // //   // ---------------------

// // // //   quizScores: {
// // // //       lessonId: string;
// // // //       score: number;
// // // //       passed: boolean;
// // // //       attempts: number;
// // // //   }[];

// // // //   lastAccessed: Date;
// // // // }

// // // // const ProgressSchema: Schema = new Schema({
// // // //   userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
// // // //   courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
// // // //   completed: { type: Boolean, default: false },
// // // //   completedLessons: [{ type: String }],
  
// // // //   // --- FIELD BARU ---
// // // //   activeAttempt: {
// // // //       lessonId: { type: String },
// // // //       startedAt: { type: Date },
// // // //       durationSeconds: { type: Number }
// // // //   },
  
// // // //   quizScores: [{
// // // //       lessonId: { type: String },
// // // //       score: { type: Number },
// // // //       passed: { type: Boolean },
// // // //       attempts: { type: Number, default: 1 }
// // // //   }],

// // // //   lastAccessed: { type: Date, default: Date.now }
// // // // }, { timestamps: true });

// // // // ProgressSchema.index({ userId: 1, courseId: 1 }, { unique: true });

// // // // export const Progress = mongoose.model<IProgress>('Progress', ProgressSchema);
// // // import mongoose, { Schema, Document } from 'mongoose';

// // // export interface IProgress extends Document {
// // //   userId: mongoose.Types.ObjectId;
// // //   courseId: mongoose.Types.ObjectId;
// // //   completed: boolean;
// // //   completedLessons: string[];
  
// // //   // --- FITUR BARU ---
// // //   completedModules: string[]; // Menyimpan ID Modul yang sudah selesai
// // //   // ------------------

// // //   activeAttempt?: {
// // //       lessonId: string;
// // //       startedAt: Date;
// // //       durationSeconds: number;
// // //   };

// // //   quizScores: {
// // //       lessonId: string;
// // //       score: number;
// // //       passed: boolean;
// // //       attempts: number;
// // //   }[];

// // //   lastAccessed: Date;
// // // }

// // // const ProgressSchema: Schema = new Schema({
// // //   userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
// // //   courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
// // //   completed: { type: Boolean, default: false },
// // //   completedLessons: [{ type: String }],
  
// // //   // --- TAMBAHAN ---
// // //   completedModules: [{ type: String }], 
// // //   // ----------------

// // //   activeAttempt: {
// // //       lessonId: { type: String },
// // //       startedAt: { type: Date },
// // //       durationSeconds: { type: Number }
// // //   },
  
// // //   quizScores: [{
// // //       lessonId: { type: String },
// // //       score: { type: Number },
// // //       passed: { type: Boolean },
// // //       attempts: { type: Number, default: 1 }
// // //   }],

// // //   lastAccessed: { type: Date, default: Date.now }
// // // }, { timestamps: true });

// // // ProgressSchema.index({ userId: 1, courseId: 1 }, { unique: true });

// // // export const Progress = mongoose.model<IProgress>('Progress', ProgressSchema);

// // import mongoose, { Schema, Document } from 'mongoose';

// // export interface IProgress extends Document {
// //   userId: mongoose.Types.ObjectId;
// //   courseId: mongoose.Types.ObjectId;
// //   completedLessons: mongoose.Types.ObjectId[];
// //   lessonDetails: any[];
// //   quizScores: any[];
// //   lastAccessed: Date;
// //   isCompleted: boolean;
// //   certificateUrl?: string;
// // }

// // const ProgressSchema = new Schema({
// //   userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
// //   courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  
// //   completedLessons: [{ type: Schema.Types.ObjectId }], 

// //   // Menyimpan detail jawaban (Esai, Upload, Score Quiz)
// //   lessonDetails: [{
// //     lessonId: { type: Schema.Types.ObjectId },
// //     type: { type: String }, // 'quiz', 'essay', 'upload_doc'
    
// //     // Untuk Quiz
// //     score: { type: Number },
    
// //     // Untuk Esai
// //     essayAnswers: [{
// //       question: String,
// //       answer: String
// //     }],

// //     // Untuk Upload Tugas
// //     uploadedFile: {
// //       url: String,
// //       name: String,
// //       uploadedAt: Date
// //     },
    
// //     submittedAt: { type: Date, default: Date.now }
// //   }],

// //   // Backward compatibility untuk quiz score lama (opsional)
// //   quizScores: [{
// //     lessonId: { type: Schema.Types.ObjectId },
// //     score: Number,
// //     attempts: Number
// //   }],

// //   lastAccessed: { type: Date, default: Date.now },
// //   isCompleted: { type: Boolean, default: false },
// //   certificateUrl: { type: String }
// // }, { timestamps: true });

// // // Prevent duplicate progress records per user/course
// // ProgressSchema.index({ userId: 1, courseId: 1 }, { unique: true });

// // export const Progress = mongoose.model<IProgress>('Progress', ProgressSchema);
// // export default Progress;

// import mongoose, { Schema, Document } from 'mongoose';

// export interface IProgress extends Document {
//   userId: mongoose.Types.ObjectId;
//   courseId: mongoose.Types.ObjectId;
//   completedLessons: mongoose.Types.ObjectId[];
//   lessonDetails: any[];
//   quizScores: any[];
//   lastAccessed: Date;
//   isCompleted: boolean;
//   certificateUrl?: string;
// }

// const ProgressSchema = new Schema({
//   userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//   courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  
//   completedLessons: [{ type: Schema.Types.ObjectId }], 

//   // Menyimpan detail jawaban (Esai, Upload, Score Quiz, Polling)
//   lessonDetails: [{
//     lessonId: { type: Schema.Types.ObjectId },
//     type: { type: String }, // 'quiz', 'essay', 'upload_doc', 'poll'
    
//     // Untuk Quiz
//     score: { type: Number },
    
//     // Untuk Esai (Simpan jawaban sebagai Array String)
//     essayAnswers: [String], 

//     // Untuk Upload Tugas
//     uploadedFile: {
//       url: String,
//       name: String,
//       uploadedAt: Date
//     },
    
//     // Untuk Polling [NEW]
//     pollAnswer: { type: String },

//     submittedAt: { type: Date, default: Date.now }
//   }],

//   // Backward compatibility untuk quiz score lama (opsional)
//   quizScores: [{
//     lessonId: { type: Schema.Types.ObjectId },
//     score: Number,
//     attempts: Number
//   }],

//   lastAccessed: { type: Date, default: Date.now },
//   isCompleted: { type: Boolean, default: false },
//   certificateUrl: { type: String }
// }, { timestamps: true });

// // Prevent duplicate progress records per user/course
// ProgressSchema.index({ userId: 1, courseId: 1 }, { unique: true });

// export const Progress = mongoose.model<IProgress>('Progress', ProgressSchema);
// export default Progress;
import mongoose, { Schema, Document } from 'mongoose';

export interface IProgress extends Document {
  userId: mongoose.Types.ObjectId;
  courseId: mongoose.Types.ObjectId;
  completedLessons: mongoose.Types.ObjectId[];
  lessonDetails: any[];
  quizScores: any[];
  lastAccessed: Date;
  isCompleted: boolean;
  certificateUrl?: string;
}

const ProgressSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  
  completedLessons: [{ type: Schema.Types.ObjectId }], 

  // Menyimpan detail jawaban (Esai, Upload, Score Quiz, Polling)
  lessonDetails: [{
    lessonId: { type: Schema.Types.ObjectId },
    type: { type: String }, // 'quiz', 'essay', 'upload_doc', 'poll'
    
    // Untuk Quiz
    score: { type: Number },
    attempts: { type: Number }, // [FIX] Tambahkan field ini agar jumlah percobaan tersimpan

    // Untuk Esai (Simpan jawaban sebagai Array String)
    essayAnswers: [String], 

    // Untuk Upload Tugas
    uploadedFile: {
      url: String,
      name: String,
      uploadedAt: Date
    },
    
    // Untuk Polling
    pollAnswer: { type: String },

    submittedAt: { type: Date, default: Date.now }
  }],

  // Backward compatibility untuk quiz score lama (opsional)
  quizScores: [{
    lessonId: { type: Schema.Types.ObjectId },
    score: Number,
    attempts: Number
  }],

  lastAccessed: { type: Date, default: Date.now },
  isCompleted: { type: Boolean, default: false },
  certificateUrl: { type: String }
}, { timestamps: true });

// Prevent duplicate progress records per user/course
ProgressSchema.index({ userId: 1, courseId: 1 }, { unique: true });

export const Progress = mongoose.model<IProgress>('Progress', ProgressSchema);
export default Progress;
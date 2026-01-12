
// // // import mongoose, { Schema, Document } from 'mongoose';

// // // export interface IEnrollment extends Document {
// // //   user: mongoose.Types.ObjectId;
// // //   course: mongoose.Types.ObjectId;
// // // }

// // // const EnrollmentSchema = new Schema<IEnrollment>({
// // //   user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
// // //   course: { type: Schema.Types.ObjectId, ref: 'Course', required: true }
// // // }, { timestamps: true });

// // // EnrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

// // // export default mongoose.model<IEnrollment>('Enrollment', EnrollmentSchema);
// // import mongoose, { Schema, Document } from 'mongoose';

// // export interface IEnrollment extends Document {
// //   user: mongoose.Types.ObjectId;
// //   course: mongoose.Types.ObjectId;
// //   // [FIX] Tambahkan definisi ini agar tidak error di routes
// //   registrationData?: {
// //     fullName: string;
// //     address: string;
// //     birthPlace: string;
// //     birthDate: Date;
// //     phoneNumber: string;
// //     email: string;
// //     pmiOrigin: string;
// //     pmiMembershipId: string;
// //   };
// //   progress: number;
// //   isCompleted: boolean;
// //   createdAt: Date;
// // }

// // const EnrollmentSchema = new Schema<IEnrollment>({
// //   user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
// //   course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  
// //   // Data Formulir
// //   registrationData: {
// //     fullName: String,
// //     address: String,
// //     birthPlace: String,
// //     birthDate: Date,
// //     phoneNumber: String,
// //     email: String,
// //     pmiOrigin: String,
// //     pmiMembershipId: String
// //   },

// //   progress: { type: Number, default: 0 },
// //   isCompleted: { type: Boolean, default: false }
// // }, { timestamps: true });

// // EnrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

// // export default mongoose.model<IEnrollment>('Enrollment', EnrollmentSchema);

// import mongoose, { Schema, Document } from 'mongoose';

// export interface IEnrollment extends Document {
//   user: mongoose.Schema.Types.ObjectId;
//   course: mongoose.Schema.Types.ObjectId;
//   enrolledAt: Date;
//   progress: number; // 0 - 100
//   isCompleted: boolean;
//   completedAt?: Date;
//   // [FIX] Tambahkan definisi tipe untuk status
//   status: 'pending' | 'active' | 'rejected'; 
//   registrationData?: any; // Data tambahan dari form registrasi (jika ada)
// }

// const EnrollmentSchema: Schema = new Schema({
//   user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//   course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
//   enrolledAt: { type: Date, default: Date.now },
//   progress: { type: Number, default: 0 },
//   isCompleted: { type: Boolean, default: false },
//   completedAt: { type: Date },
  
//   // [FIX] Tambahkan field status ke Schema Mongoose
//   status: { 
//       type: String, 
//       enum: ['pending', 'active', 'rejected'], 
//       default: 'active' // Default active agar data lama tetap valid/muncul
//   },
  
//   registrationData: { type: Schema.Types.Mixed }
// }, { timestamps: true });

// // Prevent duplicate enrollment (User tidak bisa daftar kursus yang sama 2x)
// EnrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

// export default mongoose.model<IEnrollment>('Enrollment', EnrollmentSchema);
import mongoose, { Schema, Document } from 'mongoose';

export interface IEnrollment extends Document {
  user: mongoose.Schema.Types.ObjectId;
  course: mongoose.Schema.Types.ObjectId;
  enrolledAt: Date;
  progress: number;
  isCompleted: boolean;
  completedAt?: Date;
  status: 'pending' | 'active' | 'rejected';
  registrationData?: any;
}

const EnrollmentSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  enrolledAt: { type: Date, default: Date.now },
  progress: { type: Number, default: 0 },
  isCompleted: { type: Boolean, default: false },
  completedAt: { type: Date },
  
  // [FIX] Default harus 'pending' agar tidak langsung aktif
  status: { 
      type: String, 
      enum: ['pending', 'active', 'rejected'], 
      default: 'pending' 
  },
  
  registrationData: { type: Schema.Types.Mixed }
}, { timestamps: true });

EnrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

export default mongoose.model<IEnrollment>('Enrollment', EnrollmentSchema);

// // // // import mongoose, { Schema, Document } from 'mongoose';

// // // // export interface IEnrollment extends Document {
// // // //   user: mongoose.Types.ObjectId;
// // // //   course: mongoose.Types.ObjectId;
// // // // }

// // // // const EnrollmentSchema = new Schema<IEnrollment>({
// // // //   user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
// // // //   course: { type: Schema.Types.ObjectId, ref: 'Course', required: true }
// // // // }, { timestamps: true });

// // // // EnrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

// // // // export default mongoose.model<IEnrollment>('Enrollment', EnrollmentSchema);
// // // import mongoose, { Schema, Document } from 'mongoose';

// // // export interface IEnrollment extends Document {
// // //   user: mongoose.Types.ObjectId;
// // //   course: mongoose.Types.ObjectId;
// // //   // [FIX] Tambahkan definisi ini agar tidak error di routes
// // //   registrationData?: {
// // //     fullName: string;
// // //     address: string;
// // //     birthPlace: string;
// // //     birthDate: Date;
// // //     phoneNumber: string;
// // //     email: string;
// // //     pmiOrigin: string;
// // //     pmiMembershipId: string;
// // //   };
// // //   progress: number;
// // //   isCompleted: boolean;
// // //   createdAt: Date;
// // // }

// // // const EnrollmentSchema = new Schema<IEnrollment>({
// // //   user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
// // //   course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  
// // //   // Data Formulir
// // //   registrationData: {
// // //     fullName: String,
// // //     address: String,
// // //     birthPlace: String,
// // //     birthDate: Date,
// // //     phoneNumber: String,
// // //     email: String,
// // //     pmiOrigin: String,
// // //     pmiMembershipId: String
// // //   },

// // //   progress: { type: Number, default: 0 },
// // //   isCompleted: { type: Boolean, default: false }
// // // }, { timestamps: true });

// // // EnrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

// // // export default mongoose.model<IEnrollment>('Enrollment', EnrollmentSchema);

// // import mongoose, { Schema, Document } from 'mongoose';

// // export interface IEnrollment extends Document {
// //   user: mongoose.Schema.Types.ObjectId;
// //   course: mongoose.Schema.Types.ObjectId;
// //   enrolledAt: Date;
// //   progress: number; // 0 - 100
// //   isCompleted: boolean;
// //   completedAt?: Date;
// //   // [FIX] Tambahkan definisi tipe untuk status
// //   status: 'pending' | 'active' | 'rejected'; 
// //   registrationData?: any; // Data tambahan dari form registrasi (jika ada)
// // }

// // const EnrollmentSchema: Schema = new Schema({
// //   user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
// //   course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
// //   enrolledAt: { type: Date, default: Date.now },
// //   progress: { type: Number, default: 0 },
// //   isCompleted: { type: Boolean, default: false },
// //   completedAt: { type: Date },
  
// //   // [FIX] Tambahkan field status ke Schema Mongoose
// //   status: { 
// //       type: String, 
// //       enum: ['pending', 'active', 'rejected'], 
// //       default: 'active' // Default active agar data lama tetap valid/muncul
// //   },
  
// //   registrationData: { type: Schema.Types.Mixed }
// // }, { timestamps: true });

// // // Prevent duplicate enrollment (User tidak bisa daftar kursus yang sama 2x)
// // EnrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

// // export default mongoose.model<IEnrollment>('Enrollment', EnrollmentSchema);




// import mongoose, { Schema, Document } from 'mongoose';

// export interface IEnrollment extends Document {
//   user: mongoose.Schema.Types.ObjectId;
//   course: mongoose.Schema.Types.ObjectId;
//   enrolledAt: Date;
//   progress: number;
//   isCompleted: boolean;
//   completedAt?: Date;
//   status: 'pending' | 'active' | 'rejected';
//   registrationData?: any;
// }

// const EnrollmentSchema: Schema = new Schema({
//   user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//   course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
//   enrolledAt: { type: Date, default: Date.now },
//   progress: { type: Number, default: 0 },
//   isCompleted: { type: Boolean, default: false },
//   completedAt: { type: Date },
  
//   // [FIX] Default harus 'pending' agar tidak langsung aktif
//   status: { 
//       type: String, 
//       enum: ['pending', 'active', 'rejected'], 
//       default: 'pending' 
//   },
  
//   registrationData: { type: Schema.Types.Mixed }
// }, { timestamps: true });

// EnrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

// export default mongoose.model<IEnrollment>('Enrollment', EnrollmentSchema);


import mongoose, { Schema, Document } from 'mongoose';

// [FIX] Update Interface agar mencakup semua field yang digunakan di controller
export interface IEnrollment extends Document {
  course: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  type: 'automatic' | 'with_requirements';
  biodata: {
    nik: string;
    fullName: string;
    phone: string;
    agencyName: string;
    position?: string;
  };
  requirementsFile?: string;
  status: 'pending' | 'active' | 'rejected';
  
  // Field tambahan yang menyebabkan error "Property does not exist"
  progress: number; 
  isCompleted: boolean; 
  registrationData?: any; 
  
  enrolledAt: Date;
}

const EnrollmentSchema: Schema = new Schema({
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  
  type: { 
    type: String, 
    enum: ['automatic', 'with_requirements'], 
    default: 'automatic' 
  },
  
  biodata: {
    nik: { type: String },
    fullName: { type: String },
    phone: { type: String },
    agencyName: { type: String },
    position: { type: String }
  },
  
  requirementsFile: { type: String }, 
  
  status: { 
    type: String, 
    enum: ['pending', 'active', 'rejected'], 
    default: 'pending' 
  },
  
  progress: { type: Number, default: 0 },
  isCompleted: { type: Boolean, default: false },
  
  // Field fleksibel untuk menyimpan data pendaftaran dari form
  registrationData: { type: Schema.Types.Mixed },
  
  enrolledAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Mencegah duplikasi
EnrollmentSchema.index({ course: 1, user: 1 }, { unique: true });

// [FIX PENTING] 
// Kita export sebagai Variable (Named Export) DAN Default Export
// Ini agar script lama (courseController) dan script baru (enrollmentController) sama-sama jalan.

export const Enrollment = mongoose.model<IEnrollment>('Enrollment', EnrollmentSchema);
export default Enrollment;
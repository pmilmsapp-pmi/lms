
// // // import mongoose, { Schema, Document } from 'mongoose';

// // // export type Role = 'STUDENT'|'FACILITATOR'|'SUPER_ADMIN';

// // // export interface IUser extends Document {
// // //   email: string;
// // //   passwordHash: string;
// // //   name?: string;
// // //   avatarUrl?: string;
// // //   role: Role;
// // // }

// // // const UserSchema = new Schema<IUser>({
// // //   email: { type: String, required: true, unique: true },
// // //   passwordHash: { type: String, required: true },
// // //   name: { type: String },
// // //   avatarUrl: { type: String },
// // //   role: { type: String, enum: ['STUDENT','FACILITATOR','SUPER_ADMIN'], default: 'STUDENT', required: true }
// // // }, { timestamps: true });

// // // export default mongoose.model<IUser>('User', UserSchema);
// // import mongoose, { Schema, Document } from 'mongoose';

// // /**
// //  * Interface untuk Progress Pelajaran
// //  */
// // interface ICourseProgress {
// //   courseId: mongoose.Types.ObjectId;
// //   completedLessons: string[]; // Menyimpan ID lesson yang sudah dicentang/selesai
// // }

// // /**
// //  * Interface Utama User
// //  */
// // export interface IUser extends Document {
// //   email: string;
// //   name: string;
// //   passwordHash: string;
// //   role: 'STUDENT' | 'FACILITATOR' | 'SUPER_ADMIN';
// //   avatarUrl?: string;
// //   progress: ICourseProgress[];
// //   createdAt: Date;
// //   updatedAt: Date;
// // }

// // const UserSchema = new Schema<IUser>(
// //   {
// //     email: { 
// //       type: String, 
// //       required: true, 
// //       unique: true, 
// //       lowercase: true, 
// //       trim: true 
// //     },
// //     name: { 
// //       type: String, 
// //       required: true 
// //     },
// //     passwordHash: { 
// //       type: String, 
// //       required: true 
// //     },
// //     role: { 
// //       type: String, 
// //       enum: ['STUDENT', 'FACILITATOR', 'SUPER_ADMIN'], 
// //       default: 'STUDENT' 
// //     },
// //     avatarUrl: { 
// //       type: String, 
// //       default: '' 
// //     },
// //     // Field untuk melacak progres belajar siswa
// //     progress: [
// //       {
// //         courseId: { type: Schema.Types.ObjectId, ref: 'Course' },
// //         completedLessons: [{ type: String }] 
// //       }
// //     ],
// //   },
// //   { 
// //     timestamps: true // Otomatis membuat field createdAt dan updatedAt
// //   }
// // );

// // // Pencegahan error jika model di-re-kompilasi (terutama di environment dev)
// // const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

// // export default User;
// import mongoose, { Schema, Document } from 'mongoose';

// // 1. Definisi Tipe Role (Agar bisa di-import di file lain)
// export type Role = 'STUDENT' | 'FACILITATOR' | 'SUPER_ADMIN';

// // 2. Interface untuk Progress (Sub-document)
// export interface IProgress {
//   courseId: mongoose.Types.ObjectId;
//   completedLessons: string[]; // Menyimpan ID lesson sebagai string
// }

// // 3. Interface Utama User
// export interface IUser extends Document {
//   name: string;
//   email: string;
//   passwordHash: string;
//   role: Role;
//   avatarUrl?: string;
//   progress: IProgress[]; // Array object progress
//   createdAt: Date;
//   updatedAt: Date;
// }

// // 4. Schema Mongoose
// const UserSchema = new Schema<IUser>(
//   {
//     name: { 
//       type: String, 
//       required: true 
//     },
//     email: { 
//       type: String, 
//       required: true, 
//       unique: true, 
//       lowercase: true, 
//       trim: true 
//     },
//     passwordHash: { 
//       type: String, 
//       required: true 
//     },
//     role: { 
//       type: String, 
//       enum: ['STUDENT', 'FACILITATOR', 'SUPER_ADMIN'], 
//       default: 'STUDENT' 
//     },
//     avatarUrl: { 
//       type: String, 
//       default: '' 
//     },
//     // Tracking Progress Belajar (Khusus Student)
//     progress: [
//       {
//         courseId: { type: Schema.Types.ObjectId, ref: 'Course' },
//         completedLessons: [{ type: String }] 
//       }
//     ]
//   },
//   { 
//     timestamps: true // Otomatis membuat createdAt & updatedAt
//   }
// );

// // 5. Export Model dengan Named Export (PENTING: Gunakan export const)
// // Menggunakan 'mongoose.models.User' untuk mencegah error overwrite saat hot-reload
// export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['STUDENT', 'FACILITATOR', 'SUPER_ADMIN'], default: 'STUDENT' },
  avatarUrl: { type: String, default: '' }
}, { timestamps: true });

// Hash password sebelum disimpan
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) { // Fix TS error
    next(error);
  }
});

// Method untuk verifikasi password
userSchema.methods.comparePassword = async function(candidatePassword: string) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model('User', userSchema);
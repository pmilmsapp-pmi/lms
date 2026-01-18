
// // // // import mongoose, { Schema } from 'mongoose';
// // // // import bcrypt from 'bcryptjs';

// // // // const userSchema = new Schema({
// // // //   name: { type: String, required: true },
// // // //   email: { type: String, required: true, unique: true },
// // // //   password: { type: String, required: true },
// // // //   role: { type: String, enum: ['STUDENT', 'FACILITATOR', 'SUPER_ADMIN'], default: 'STUDENT' },
// // // //   avatarUrl: { type: String, default: '' }
// // // // }, { timestamps: true });

// // // // // Hash password sebelum disimpan
// // // // userSchema.pre('save', async function(next) {
// // // //   if (!this.isModified('password')) return next();
  
// // // //   try {
// // // //     const salt = await bcrypt.genSalt(10);
// // // //     this.password = await bcrypt.hash(this.password, salt);
// // // //     next();
// // // //   } catch (error: any) { // Fix TS error
// // // //     next(error);
// // // //   }
// // // // });

// // // // // Method untuk verifikasi password
// // // // userSchema.methods.comparePassword = async function(candidatePassword: string) {
// // // //   return await bcrypt.compare(candidatePassword, this.password);
// // // // };

// // // // export const User = mongoose.model('User', userSchema);

// // // import mongoose, { Schema } from 'mongoose';
// // // import bcrypt from 'bcryptjs';

// // // const userSchema = new Schema({
// // //   name: { type: String, required: true },
// // //   email: { type: String, required: true, unique: true },
// // //   password: { type: String, required: true },
  
// // //   // [UPDATED] Menambahkan role 'ADMIN'
// // //   role: { 
// // //     type: String, 
// // //     enum: ['STUDENT', 'FACILITATOR', 'ADMIN', 'SUPER_ADMIN'], 
// // //     default: 'STUDENT' 
// // //   },
  
// // //   avatarUrl: { type: String, default: '' },

// // //   // --- [BARU] RBAC & REGION SCOPE FIELDS ---
// // //   // Array string untuk izin spesifik (misal: 'course.edit', 'user.verify')
// // //   permissions: [{ type: String }],

// // //   // Lingkup wilayah kerja Admin
// // //   regionScope: { 
// // //     type: String, 
// // //     enum: ['national', 'province', 'regency'], 
// // //     default: 'national' 
// // //   },

// // //   // Daftar Kode Wilayah yang dikelola (sesuai JSON pemerintah)
// // //   managedProvinces: [{ type: String }], // Contoh: ["33", "34"]
// // //   managedRegencies: [{ type: String }], // Contoh: ["3301", "3302"]

// // //   // Daftar Kursus spesifik yang boleh dikelola (opsional)
// // //   managedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],

// // //   // Field tambahan untuk profil siswa (opsional, tapi berguna)
// // //   nik: { type: String },
// // //   phone: { type: String },
// // //   agencyName: { type: String },
// // //   position: { type: String }

// // // }, { timestamps: true });

// // // // Hash password sebelum disimpan
// // // userSchema.pre('save', async function(next) {
// // //   if (!this.isModified('password')) return next();
  
// // //   try {
// // //     const salt = await bcrypt.genSalt(10);
// // //     this.password = await bcrypt.hash(this.password, salt);
// // //     next();
// // //   } catch (error: any) {
// // //     next(error);
// // //   }
// // // });

// // // // Method untuk verifikasi password
// // // userSchema.methods.comparePassword = async function(candidatePassword: string) {
// // //   return await bcrypt.compare(candidatePassword, this.password);
// // // };

// // // export const User = mongoose.models.User || mongoose.model('User', userSchema);
// // // export default User;


// // import mongoose, { Schema } from 'mongoose';
// // import bcrypt from 'bcryptjs';

// // const userSchema = new Schema({
// //   name: { type: String, required: true },
// //   email: { type: String, required: true, unique: true },
// //   password: { type: String, required: true },
  
// //   // [UPDATED] Menambahkan role 'ADMIN'
// //   role: { 
// //     type: String, 
// //     enum: ['STUDENT', 'FACILITATOR', 'ADMIN', 'SUPER_ADMIN'], 
// //     default: 'STUDENT' 
// //   },
  
// //   avatarUrl: { type: String, default: '' },

// //   // --- [BARU] RBAC & REGION SCOPE FIELDS ---
// //   // Array string untuk izin spesifik (misal: 'course.edit', 'user.verify')
// //   permissions: [{ type: String }],

// //   // Lingkup wilayah kerja Admin
// //   regionScope: { 
// //     type: String, 
// //     enum: ['national', 'province', 'regency'], 
// //     default: 'national' 
// //   },

// //   // Daftar Kode Wilayah yang dikelola (sesuai JSON pemerintah)
// //   managedProvinces: [{ type: String }], // Contoh: ["33", "34"]
// //   managedRegencies: [{ type: String }], // Contoh: ["3301", "3302"]

// //   // Daftar Kursus spesifik yang boleh dikelola (opsional)
// //   managedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],

// //   // Field tambahan untuk profil siswa (opsional, tapi berguna)
// //   nik: { type: String },
// //   phone: { type: String },
// //   agencyName: { type: String },
// //   position: { type: String }

// // }, { timestamps: true });

// // // Hash password sebelum disimpan
// // userSchema.pre('save', async function(next) {
// //   if (!this.isModified('password')) return next();
  
// //   try {
// //     const salt = await bcrypt.genSalt(10);
// //     this.password = await bcrypt.hash(this.password, salt);
// //     next();
// //   } catch (error: any) {
// //     next(error);
// //   }
// // });

// // // Method untuk verifikasi password
// // userSchema.methods.comparePassword = async function(candidatePassword: string) {
// //   return await bcrypt.compare(candidatePassword, this.password);
// // };

// // export const User = mongoose.models.User || mongoose.model('User', userSchema);
// // export default User;


// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//     // ... field login standar (email, password, role, name, avatarUrl) ...
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     name: { type: String, required: true },
//     role: { 
//         type: String, 
//         enum: ['STUDENT', 'FACILITATOR', 'ADMIN', 'SUPER_ADMIN'], 
//         default: 'STUDENT' 
//     },
//     avatarUrl: String,

//     // --- [BARU] IDENTITAS ANGGOTA PMI ---
//     memberType: { 
//         type: String, 
//         enum: ['PMR', 'KSR', 'TSR', 'PEGAWAI', 'PENGURUS', 'UMUM'], // 5 Jenis + Umum
//         default: 'UMUM' 
//     },
    
//     // Data Detail (Fleksibel untuk kelima jenis)
//     memberData: {
//         nik: { type: String }, // [BARU] Nomor Induk Kependudukan (KTP)
//         nia: { type: String }, // Nomor Induk Anggota PMI
//         unit: { type: String }, // Asal Sekolah / Kampus / Markas
        
//         // Data Pribadi Umum
//         birthPlace: { type: String },
//         birthDate: { type: Date },
//         gender: { type: String, enum: ['L', 'P'] },
//         bloodType: { type: String, enum: ['A', 'B', 'AB', 'O'] },
//         religion: { type: String },
        
//         // Alamat & Kontak
//         address: { type: String },
//         province: { type: String }, 
//         regency: { type: String },  
//         phone: { type: String },
        
//         // Data Tambahan (Spesifik)
//         education: { type: String },
//         occupation: { type: String },
//         joinDate: { type: Date },
//         position: { type: String }, // Jabatan (Khusus Pengurus/Pegawai)
//         skills: [String]
//     },

//     permissions: [String],
//     regionScope: { type: String, default: 'national' },
//     managedProvinces: [String],
    
// }, { timestamps: true });

// export const User = mongoose.models.User || mongoose.model('User', userSchema);
import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'STUDENT' | 'FACILITATOR' | 'ADMIN' | 'SUPER_ADMIN';
  avatarUrl?: string;
  
  // [WAJIB ADA] Array Permission
  permissions: string[]; 
  
  // [WAJIB ADA] Status Keamanan & Verifikasi
  isBanned: boolean;
  bannedReason?: string;
  isVerified: boolean; // <--- INI YANG TADI HILANG
  
  // Wilayah
  regionScope?: string;
  managedProvinces?: string[];
  managedRegencies?: string[];
  
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['STUDENT', 'FACILITATOR', 'ADMIN', 'SUPER_ADMIN'], 
    default: 'STUDENT' 
  },
  avatarUrl: { type: String },
  
  // Permissions & Security
  permissions: { type: [String], default: [] }, 
  isBanned: { type: Boolean, default: false },
  bannedReason: { type: String },
  isVerified: { type: Boolean, default: false }, // <--- KITA KEMBALIKAN
  
  // Wilayah
  regionScope: { type: String, default: 'national' },
  managedProvinces: { type: [String], default: [] },
  managedRegencies: { type: [String], default: [] }
}, {
  timestamps: true
});

// Hash password sebelum save
UserSchema.pre<IUser>('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<IUser>('User', UserSchema);
// // // // // // // import { Request, Response } from 'express';
// // // // // // // import bcrypt from 'bcryptjs';
// // // // // // // import { User } from '../models/User';
// // // // // // // import { signAccessToken } from '../middleware/auth';
// // // // // // // import { STUDENT_DEFAULT_PERMISSIONS } from '../config/permissions'; // Import Config tadi

// // // // // // // // --- REGISTER ---
// // // // // // // export const register = async (req: Request, res: Response) => {
// // // // // // //   try {
// // // // // // //     const { name, email, password, role } = req.body;

// // // // // // //     // 1. Validasi Input Dasar
// // // // // // //     if (!name || !email || !password) {
// // // // // // //       return res.status(400).json({ error: 'Nama, Email, dan Password wajib diisi' });
// // // // // // //     }

// // // // // // //     // 2. Cek Email Duplikat
// // // // // // //     const existingUser = await User.findOne({ email });
// // // // // // //     if (existingUser) {
// // // // // // //       return res.status(400).json({ error: 'Email sudah terdaftar' });
// // // // // // //     }

// // // // // // //     // 3. Tentukan Role & Permission Awal
// // // // // // //     // Default role adalah STUDENT jika tidak dikirim
// // // // // // //     const userRole = role || 'STUDENT'; 
// // // // // // //     let initialPermissions: string[] = [];

// // // // // // //     // [LOGIKA SESUAI GAMBAR] 
// // // // // // //     // Jika Student, berikan hak akses standar (Standard Checkbox)
// // // // // // //     if (userRole === 'STUDENT') {
// // // // // // //         initialPermissions = STUDENT_DEFAULT_PERMISSIONS; 
// // // // // // //     }
// // // // // // //     // Jika Admin/Facilitator, permission dikosongkan dulu (nanti diset oleh Super Admin)

// // // // // // //     // 4. Buat User Baru
// // // // // // //     const newUser = new User({
// // // // // // //       name,
// // // // // // //       email,
// // // // // // //       password, // Password akan di-hash oleh middleware 'pre save' di Model User
// // // // // // //       role: userRole,
// // // // // // //       permissions: initialPermissions, // Simpan permission otomatis
// // // // // // //       isBanned: false,
      
// // // // // // //       // Default scope (aman untuk student)
// // // // // // //       regionScope: 'national', 
// // // // // // //       managedProvinces: [],
// // // // // // //       managedRegencies: []
// // // // // // //     });

// // // // // // //     await newUser.save();

// // // // // // //     // 5. Generate Token (Auto Login setelah register)
// // // // // // //     const token = signAccessToken({ 
// // // // // // //         id: newUser._id.toString(), 
// // // // // // //         email: newUser.email, 
// // // // // // //         role: newUser.role as any 
// // // // // // //     });

// // // // // // //     // 6. Response
// // // // // // //     res.status(201).json({
// // // // // // //       success: true,
// // // // // // //       message: 'Registrasi berhasil',
// // // // // // //       token,
// // // // // // //       user: {
// // // // // // //         id: newUser._id,
// // // // // // //         name: newUser.name,
// // // // // // //         email: newUser.email,
// // // // // // //         role: newUser.role,
// // // // // // //         permissions: newUser.permissions
// // // // // // //       }
// // // // // // //     });

// // // // // // //   } catch (error: any) {
// // // // // // //     console.error("Register Error:", error);
// // // // // // //     res.status(500).json({ error: error.message || 'Terjadi kesalahan server' });
// // // // // // //   }
// // // // // // // };

// // // // // // // // --- LOGIN ---
// // // // // // // export const login = async (req: Request, res: Response) => {
// // // // // // //   try {
// // // // // // //     const { email, password } = req.body;

// // // // // // //     // 1. Cari User
// // // // // // //     const user = await User.findOne({ email });
// // // // // // //     if (!user) {
// // // // // // //       return res.status(401).json({ error: 'Email atau password salah' });
// // // // // // //     }

// // // // // // //     // 2. Cek Password
// // // // // // //     const isMatch = await user.comparePassword(password);
// // // // // // //     if (!isMatch) {
// // // // // // //       return res.status(401).json({ error: 'Email atau password salah' });
// // // // // // //     }

// // // // // // //     // 3. [PENTING] Cek Status Banned (Sesuai Gambar)
// // // // // // //     if (user.isBanned) {
// // // // // // //         return res.status(403).json({ 
// // // // // // //             error: 'Akun Dibekukan', 
// // // // // // //             message: `Akun Anda telah dibekukan. Alasan: ${user.bannedReason || 'Pelanggaran Kebijakan'}. Silakan hubungi Admin.` 
// // // // // // //         });
// // // // // // //     }

// // // // // // //     // 4. Generate Token
// // // // // // //     const token = signAccessToken({ 
// // // // // // //         id: user._id.toString(), 
// // // // // // //         email: user.email, 
// // // // // // //         role: user.role as any 
// // // // // // //     });

// // // // // // //     // 5. Response
// // // // // // //     res.json({
// // // // // // //       success: true,
// // // // // // //       message: 'Login berhasil',
// // // // // // //       token,
// // // // // // //       user: {
// // // // // // //         id: user._id,
// // // // // // //         name: user.name,
// // // // // // //         email: user.email,
// // // // // // //         role: user.role,
// // // // // // //         avatarUrl: user.avatarUrl,
// // // // // // //         permissions: user.permissions, // Kirim permission ke frontend untuk logic UI
// // // // // // //         regionScope: user.regionScope
// // // // // // //       }
// // // // // // //     });

// // // // // // //   } catch (error: any) {
// // // // // // //     console.error("Login Error:", error);
// // // // // // //     res.status(500).json({ error: error.message || 'Terjadi kesalahan server' });
// // // // // // //   }
// // // // // // // };

// // // // // // import { Request, Response } from 'express';
// // // // // // import bcrypt from 'bcryptjs';
// // // // // // import { User } from '../models/User';
// // // // // // import { signAccessToken } from '../middleware/auth';
// // // // // // // Import Konfigurasi Permission
// // // // // // import { STUDENT_DEFAULT_PERMISSIONS, FACILITATOR_DEFAULT_PERMISSIONS } from '../config/permissions';

// // // // // // // --- REGISTER ---
// // // // // // export const register = async (req: Request, res: Response) => {
// // // // // //   try {
// // // // // //     const { name, email, password, role } = req.body;

// // // // // //     // 1. Validasi Input
// // // // // //     if (!name || !email || !password) {
// // // // // //       return res.status(400).json({ error: 'Nama, Email, dan Password wajib diisi' });
// // // // // //     }

// // // // // //     // 2. Cek Email Duplikat
// // // // // //     const existingUser = await User.findOne({ email });
// // // // // //     if (existingUser) {
// // // // // //       return res.status(400).json({ error: 'Email sudah terdaftar' });
// // // // // //     }

// // // // // //     // 3. Tentukan Role & Permission Awal
// // // // // //     const userRole = role || 'STUDENT'; 
// // // // // //     let initialPermissions: string[] = [];

// // // // // //     if (userRole === 'STUDENT') {
// // // // // //         initialPermissions = STUDENT_DEFAULT_PERMISSIONS; 
// // // // // //     } else if (userRole === 'FACILITATOR') {
// // // // // //         initialPermissions = FACILITATOR_DEFAULT_PERMISSIONS;
// // // // // //     }
// // // // // //     // Note: Admin/SuperAdmin biasanya dibuat manual atau lewat seeding, jadi tidak dihandle di public register ini untuk keamanan.

// // // // // //     // 4. Buat User Baru
// // // // // //     const newUser = new User({
// // // // // //       name,
// // // // // //       email,
// // // // // //       password, // Password di-hash di model (pre-save)
// // // // // //       role: userRole,
// // // // // //       permissions: initialPermissions, // Permission otomatis masuk
// // // // // //       isBanned: false,
// // // // // //       regionScope: 'national' // Default aman
// // // // // //     });

// // // // // //     await newUser.save();

// // // // // //     // 5. Generate Token
// // // // // //     const token = signAccessToken({ 
// // // // // //         id: newUser._id.toString(), 
// // // // // //         email: newUser.email, 
// // // // // //         role: newUser.role as any 
// // // // // //     });

// // // // // //     // 6. Response
// // // // // //     res.status(201).json({
// // // // // //       success: true,
// // // // // //       message: 'Registrasi berhasil',
// // // // // //       token,
// // // // // //       user: {
// // // // // //         id: newUser._id,
// // // // // //         name: newUser.name,
// // // // // //         email: newUser.email,
// // // // // //         role: newUser.role,
// // // // // //         permissions: newUser.permissions
// // // // // //       }
// // // // // //     });

// // // // // //   } catch (error: any) {
// // // // // //     console.error("Register Error:", error);
// // // // // //     res.status(500).json({ error: error.message || 'Terjadi kesalahan server' });
// // // // // //   }
// // // // // // };

// // // // // // // --- LOGIN ---
// // // // // // export const login = async (req: Request, res: Response) => {
// // // // // //   try {
// // // // // //     const { email, password } = req.body;

// // // // // //     // 1. Cari User
// // // // // //     const user = await User.findOne({ email });
// // // // // //     if (!user) {
// // // // // //       return res.status(401).json({ error: 'Email atau password salah' });
// // // // // //     }

// // // // // //     // 2. Cek Password
// // // // // //     const isMatch = await user.comparePassword(password);
// // // // // //     if (!isMatch) {
// // // // // //       return res.status(401).json({ error: 'Email atau password salah' });
// // // // // //     }

// // // // // //     // 3. Cek Status Banned
// // // // // //     if (user.isBanned) {
// // // // // //         return res.status(403).json({ 
// // // // // //             error: 'Akun Dibekukan', 
// // // // // //             message: `Akun Anda telah dibekukan. Alasan: ${user.bannedReason || 'Pelanggaran Kebijakan'}. Silakan hubungi Admin.` 
// // // // // //         });
// // // // // //     }

// // // // // //     // 4. Generate Token
// // // // // //     const token = signAccessToken({ 
// // // // // //         id: user._id.toString(), 
// // // // // //         email: user.email, 
// // // // // //         role: user.role as any 
// // // // // //     });

// // // // // //     res.json({
// // // // // //       success: true,
// // // // // //       message: 'Login berhasil',
// // // // // //       token,
// // // // // //       user: {
// // // // // //         id: user._id,
// // // // // //         name: user.name,
// // // // // //         email: user.email,
// // // // // //         role: user.role,
// // // // // //         avatarUrl: user.avatarUrl,
// // // // // //         permissions: user.permissions,
// // // // // //         regionScope: user.regionScope
// // // // // //       }
// // // // // //     });

// // // // // //   } catch (error: any) {
// // // // // //     console.error("Login Error:", error);
// // // // // //     res.status(500).json({ error: error.message || 'Terjadi kesalahan server' });
// // // // // //   }
// // // // // // };


// // // // // import { Request, Response } from 'express';
// // // // // import bcrypt from 'bcryptjs';
// // // // // import { User } from '../models/User';
// // // // // import { signAccessToken } from '../middleware/auth';

// // // // // // --- REGISTER ---
// // // // // export const register = async (req: Request, res: Response) => {
// // // // //   try {
// // // // //     const { name, email, password, role } = req.body;

// // // // //     if (!name || !email || !password) return res.status(400).json({ error: 'Data tidak lengkap' });

// // // // //     const existingUser = await User.findOne({ email });
// // // // //     if (existingUser) return res.status(400).json({ error: 'Email sudah terdaftar' });

// // // // //     // [DEFAULT ROLE & PERMISSION]
// // // // //     const userRole = role || 'STUDENT'; 
// // // // //     let initialPermissions: string[] = [];

// // // // //     if (userRole === 'STUDENT') {
// // // // //         initialPermissions = ['access_course', 'view_content', 'submit_quiz', 'manage_profile']; 
// // // // //     } else if (userRole === 'FACILITATOR') {
// // // // //         initialPermissions = ['manage_courses', 'view_reports'];
// // // // //     }
// // // // //     // Admin tidak dapat permission otomatis CMS, harus diberi manual oleh Super Admin

// // // // //     const newUser = new User({
// // // // //       name,
// // // // //       email,
// // // // //       password, // Password di-hash oleh pre-save hook di Model
// // // // //       role: userRole,
// // // // //       permissions: initialPermissions,
// // // // //       isBanned: false,
// // // // //       regionScope: 'national'
// // // // //     });

// // // // //     await newUser.save();

// // // // //     const token = signAccessToken({ id: newUser._id.toString(), email: newUser.email, role: newUser.role as any });

// // // // //     res.status(201).json({
// // // // //       success: true,
// // // // //       message: 'Registrasi berhasil',
// // // // //       token,
// // // // //       user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role }
// // // // //     });

// // // // //   } catch (error: any) {
// // // // //     console.error("Register Error:", error);
// // // // //     res.status(500).json({ error: error.message });
// // // // //   }
// // // // // };

// // // // // // --- LOGIN ---
// // // // // export const login = async (req: Request, res: Response) => {
// // // // //   try {
// // // // //     const { email, password } = req.body;
// // // // //     const user = await User.findOne({ email });
// // // // //     if (!user) return res.status(401).json({ error: 'Email atau password salah' });

// // // // //     const isMatch = await user.comparePassword(password);
// // // // //     if (!isMatch) return res.status(401).json({ error: 'Email atau password salah' });

// // // // //     if (user.isBanned) return res.status(403).json({ error: 'Akun Dibekukan', message: user.bannedReason });

// // // // //     const token = signAccessToken({ id: user._id.toString(), email: user.email, role: user.role as any });

// // // // //     res.json({
// // // // //       success: true,
// // // // //       message: 'Login berhasil',
// // // // //       token,
// // // // //       user: {
// // // // //         id: user._id,
// // // // //         name: user.name,
// // // // //         email: user.email,
// // // // //         role: user.role,
// // // // //         avatarUrl: user.avatarUrl,
// // // // //         permissions: user.permissions, // Kirim permission ke frontend agar bisa dicek
// // // // //         regionScope: user.regionScope
// // // // //       }
// // // // //     });

// // // // //   } catch (error: any) {
// // // // //     console.error("Login Error:", error);
// // // // //     res.status(500).json({ error: error.message });
// // // // //   }
// // // // // };

// // // // import { Request, Response } from 'express';
// // // // import { User } from '../models/User';
// // // // import { signAccessToken } from '../middleware/auth';

// // // // export const login = async (req: Request, res: Response) => {
// // // //   try {
// // // //     const { email, password } = req.body;
// // // //     console.log("Login Attempt:", email);

// // // //     // [FIX UTAMA] Gunakan .lean()
// // // //     // Ini mengambil data mentah JSON langsung dari database
// // // //     // Mengabaikan filter Schema, Virtuals, dan validasi Mongoose
// // // //     const user: any = await User.findOne({ email }).lean();

// // // //     if (!user) {
// // // //       return res.status(401).json({ error: 'Email tidak terdaftar.' });
// // // //     }

// // // //     // Karena user adalah object mentah, kita tidak bisa pakai method .comparePassword() milik Schema
// // // //     // Kita harus import bcrypt dan cek manual (atau query ulang khusus password jika perlu)
// // // //     // Tapi karena password ada di object user, kita bisa bandingkan manual jika kita import bcrypt
// // // //     // UNTUK KEMUDAHAN: Kita query ulang instance mongoose CUMA untuk cek password
// // // //     const userInstance = await User.findOne({ email });
// // // //     const isMatch = await userInstance?.comparePassword(password);

// // // //     if (!isMatch) {
// // // //       return res.status(401).json({ error: 'Password salah.' });
// // // //     }

// // // //     if (user.isBanned) {
// // // //       return res.status(403).json({ error: 'Akun ini dibekukan.' });
// // // //     }

// // // //     const token = signAccessToken({ 
// // // //       id: user._id.toString(), 
// // // //       email: user.email, 
// // // //       role: user.role 
// // // //     });

// // // //     console.log("▶️ RAW DATA FROM DB:", user); 
// // // //     console.log("▶️ PERMISSIONS CHECK:", user.permissions);

// // // //     res.json({
// // // //       success: true,
// // // //       token,
// // // //       user: {
// // // //         id: user._id,
// // // //         name: user.name,
// // // //         email: user.email,
// // // //         role: user.role,
// // // //         avatarUrl: user.avatarUrl,
// // // //         // Ambil langsung dari object mentah
// // // //         permissions: user.permissions || [], 
// // // //         regionScope: user.regionScope
// // // //       }
// // // //     });

// // // //   } catch (error: any) {
// // // //     console.error("Login Server Error:", error);
// // // //     res.status(500).json({ error: "Terjadi kesalahan server: " + error.message });
// // // //   }
// // // // };

// // // // export const register = async (req: Request, res: Response) => {
// // // //     try {
// // // //         const { name, email, password, role } = req.body;
// // // //         const existing = await User.findOne({ email });
// // // //         if (existing) return res.status(400).json({ error: 'Email sudah dipakai.' });
// // // //         const newUser = new User({ name, email, password, role: role || 'STUDENT', permissions: [], isBanned: false });
// // // //         await newUser.save();
// // // //         const token = signAccessToken({ id: newUser._id, email, role: newUser.role });
// // // //         res.status(201).json({ success: true, token, user: newUser });
// // // //     } catch (error: any) {
// // // //         res.status(500).json({ error: error.message });
// // // //     }
// // // // };


// // // import { Request, Response } from 'express';
// // // import { User } from '../models/User';
// // // import { signAccessToken } from '../middleware/auth';

// // // export const login = async (req: Request, res: Response) => {
// // //   try {
// // //     const { email, password } = req.body;
// // //     console.log("Login Attempt:", email);

// // //     const user: any = await User.findOne({ email }).lean();

// // //     if (!user) {
// // //       return res.status(401).json({ error: 'Email tidak terdaftar.' });
// // //     }

// // //     const userInstance = await User.findOne({ email });
// // //     const isMatch = await userInstance?.comparePassword(password);

// // //     if (!isMatch) {
// // //       return res.status(401).json({ error: 'Password salah.' });
// // //     }

// // //     if (user.isBanned) {
// // //       return res.status(403).json({ error: 'Akun ini dibekukan.' });
// // //     }

// // //     const token = signAccessToken({ 
// // //       id: user._id.toString(), 
// // //       email: user.email, 
// // //       role: user.role 
// // //     });

// // //     console.log("▶️ RAW DATA FROM DB:", user); 
// // //     console.log("▶️ PERMISSIONS CHECK:", user.permissions);

// // //     res.json({
// // //       success: true,
// // //       token,
// // //       user: {
// // //         id: user._id,
// // //         name: user.name,
// // //         email: user.email,
// // //         role: user.role,
// // //         avatarUrl: user.avatarUrl,
// // //         permissions: user.permissions || [], 
// // //         regionScope: user.regionScope
// // //       }
// // //     });

// // //   } catch (error: any) {
// // //     console.error("Login Server Error:", error);
// // //     res.status(500).json({ error: "Terjadi kesalahan server: " + error.message });
// // //   }
// // // };

// // // export const register = async (req: Request, res: Response) => {
// // //     try {
// // //         const { name, email, password, role } = req.body;
// // //         const existing = await User.findOne({ email });
// // //         if (existing) return res.status(400).json({ error: 'Email sudah dipakai.' });
// // //         const newUser = new User({ name, email, password, role: role || 'STUDENT', permissions: [], isBanned: false });
// // //         await newUser.save();
// // //         const token = signAccessToken({ id: newUser._id, email, role: newUser.role });
// // //         res.status(201).json({ success: true, token, user: newUser });
// // //     } catch (error: any) {
// // //         res.status(500).json({ error: error.message });
// // //     }
// // // };

// // // // --- [TAMBAHAN BARU: JANGAN DIHAPUS] ---
// // // // Fungsi ini dipanggil oleh AuthProvider.tsx (refreshUserData)
// // // export const getMe = async (req: any, res: Response) => {
// // //   try {
// // //     // req.user diisi oleh middleware requireAuth
// // //     if (!req.user || !req.user.id) {
// // //       return res.status(401).json({ error: 'Token tidak valid' });
// // //     }

// // //     const user = await User.findById(req.user.id).select('-password').lean();
    
// // //     if (!user) {
// // //       return res.status(404).json({ error: 'User tidak ditemukan' });
// // //     }

// // //     res.json({
// // //       success: true,
// // //       user: {
// // //         id: user._id,
// // //         _id: user._id, // Support dua format ID
// // //         name: user.name,
// // //         email: user.email,
// // //         role: user.role,
// // //         avatarUrl: user.avatarUrl,
// // //         permissions: user.permissions || [],
// // //         regionScope: user.regionScope,
// // //         managedProvinces: (user as any).managedProvinces || [],
// // //         managedRegencies: (user as any).managedRegencies || []
// // //       }
// // //     });
// // //   } catch (error: any) {
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // };


// // import { Request, Response } from 'express';
// // import { User } from '../models/User';
// // import { signAccessToken } from '../middleware/auth';
// // import { prisma } from '../lib/prisma';
// // import bcrypt from 'bcryptjs'; // Library untuk cek Bcrypt
// // import crypto from 'crypto';

// // export const login = async (req: Request, res: Response) => {
// //   try {
// //     const { email, password } = req.body;

// //     // 1. Cek User di MongoDB (LMS Database)
// //     let user: any = await User.findOne({ email }).lean();

// //     // --- [LOGIKA HYBRID: JIKA TIDAK ADA DI MONGO] ---
// //     if (!user) {
// //       console.log(`⚠️ User TIDAK ada di Mongo. Mencari di Postgres (Tabel User)...`);
      
// //       try {
// //         // [LANGKAH 1] Cari di tabel 'user' (Akun Login)
// //         const pgUserAccount = await prisma.user.findUnique({
// //           where: { email: email }
// //         });

// //         if (pgUserAccount) {
// //           console.log(`✅ Akun ditemukan di Postgres! Username: ${pgUserAccount.username}`);
          
// //           // [LANGKAH 2] Verifikasi Password (Bcrypt & Legacy Support)
// //           const dbHash = pgUserAccount.password_hash;
// //           let isMatch = false;

// //           // Cek 1: Bcrypt (Standar Yii2/Laravel/Modern PHP)
// //           if (await bcrypt.compare(password, dbHash)) {
// //              console.log("🔓 Password COCOK (Bcrypt)");
// //              isMatch = true;
// //           } 
// //           // Cek 2: MD5 (Legacy Fallback - jaga-jaga)
// //           else {
// //              const inputMd5 = crypto.createHash('md5').update(password).digest('hex');
// //              if (dbHash === inputMd5) {
// //                 console.log("🔓 Password COCOK (MD5)");
// //                 isMatch = true;
// //              }
// //           }

// //           if (isMatch) {
// //              console.log(`🎉 Login Berhasil! Mengambil biodata dari pmi_anggota...`);

// //              // [LANGKAH 3] Ambil Biodata Anggota berdasarkan ID User
// //              // Asumsi: Di tabel pmi_anggota ada kolom 'id_user' yang merujuk ke tabel user
// //              const pgBiodata = await prisma.pmi_anggota.findFirst({
// //                 where: { id_user: pgUserAccount.id }
// //              });

// //              // Data default jika biodata belum lengkap
// //              const namaUser = pgBiodata?.nama || pgUserAccount.username;
// //             const unitName = 'PMI Pusat';
// //              const niaUser = pgBiodata?.kode_anggota || pgBiodata?.no_identitas || `TEMP-${pgUserAccount.id}`;

// //              // [LANGKAH 4] Auto-Register ke MongoDB
// //              const newUser = new User({
// //                 name: namaUser,
// //                 email: pgUserAccount.email,
// //                 password: password, // Simpan password input user (akan di-hash ulang oleh Mongo Model)
// //                 role: 'STUDENT', // Default Role
// //                 isVerified: true,
// //                 memberData: {
// //                     nia: niaUser,
// //                     unit: unitName,
// //                     phone: pgBiodata?.no_hp || "-",
// //                     address: pgBiodata?.domisili_alamat || "-",
// //                     birthDate: pgBiodata?.tanggal_lahir,
// //                     source: 'AUTO_REGISTER_POSTGRES'
// //                 }
// //              });

// //              await newUser.save();
// //              user = await User.findById(newUser._id).lean();
             
// //              console.log(`💾 User berhasil disalin ke MongoDB: ${user.email}`);

// //           } else {
// //              console.log(`⛔ Password Salah.`);
// //              return res.status(401).json({ error: 'Password salah.' });
// //           }
// //         } else {
// //             console.log(`⛔ Email tidak ditemukan di tabel user Postgres.`);
// //             return res.status(401).json({ error: 'Email tidak terdaftar.' });
// //         }

// //       } catch (err: any) {
// //         console.error("🔥 [HYBRID ERROR] Koneksi Postgres Gagal:", err.message);
// //         return res.status(500).json({ error: 'Koneksi Database Pusat Bermasalah.' });
// //       }
// //     }

// //     // --- [PROSES LOGIN FINAL] ---
// //     if (!user) return res.status(401).json({ error: 'Login Gagal.' });

// //     // Cek password Mongo (User yang sudah ada)
// //     const userInstance = await User.findOne({ email });
// //     const isMatch = await userInstance?.comparePassword(password);

// //     if (!isMatch) return res.status(401).json({ error: 'Password salah.' });
// //     if (user.isBanned) return res.status(403).json({ error: 'Akun dibekukan.' });

// //     const token = signAccessToken({ 
// //       id: user._id.toString(), 
// //       email: user.email, 
// //       role: user.role 
// //     });

// //     console.log("✅ LOGIN SUKSES:", user.email);

// //     res.json({
// //       success: true,
// //       token,
// //       user: {
// //         id: user._id,
// //         name: user.name,
// //         email: user.email,
// //         role: user.role,
// //         avatarUrl: user.avatarUrl,
// //         permissions: user.permissions || [], 
// //         regionScope: user.regionScope,
// //         managedProvinces: user.managedProvinces || [],
// //         managedRegencies: user.managedRegencies || []
// //       }
// //     });

// //   } catch (error: any) {
// //     console.error("Server Error:", error);
// //     res.status(500).json({ error: "Server Error: " + error.message });
// //   }
// // };

// // export const register = async (req: Request, res: Response) => {
// //     try {
// //         const { name, email, password, role } = req.body;
// //         const existing = await User.findOne({ email });
// //         if (existing) return res.status(400).json({ error: 'Email sudah dipakai.' });
// //         const newUser = new User({ name, email, password, role: role || 'STUDENT', permissions: [], isBanned: false });
// //         await newUser.save();
// //         const token = signAccessToken({ id: newUser._id, email, role: newUser.role });
// //         res.status(201).json({ success: true, token, user: newUser });
// //     } catch (error: any) {
// //         res.status(500).json({ error: error.message });
// //     }
// // };

// // export const getMe = async (req: any, res: Response) => {
// //   try {
// //     if (!req.user || !req.user.id) return res.status(401).json({ error: 'Token tidak valid' });
// //     const user = await User.findById(req.user.id).select('-password').lean();
// //     if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });
// //     res.json({ success: true, user: { ...user, id: user._id, _id: user._id } });
// //   } catch (error: any) {
// //     res.status(500).json({ error: error.message });
// //   }
// // };


// import { Request, Response } from 'express';
// import { User } from '../models/User';
// import { signAccessToken } from '../middleware/auth';
// import { prisma } from '../lib/prisma';
// import bcrypt from 'bcryptjs';
// import crypto from 'crypto';

// // --- HELPER FUNCTIONS ---

// // 1. Format Tanggal ke ISO String
// const formatDate = (date: any) => date ? new Date(date).toISOString() : undefined;

// // 2. MAPPING AGAMA (Kode Angka -> Teks)
// // Standar KTP Indonesia: 1=Islam, 2=Kristen, 3=Katolik, 4=Hindu, 5=Buddha, 6=Konghucu
// const mapAgama = (code: string | null | undefined): string => {
//     if (!code) return '-';
//     const cleanCode = code.toString().trim();
//     switch (cleanCode) {
//         case '1': return 'Islam';
//         case '2': return 'Kristen Protestan';
//         case '3': return 'Katolik';
//         case '4': return 'Hindu';
//         case '5': return 'Buddha';
//         case '6': return 'Konghucu';
//         case '7': return 'Kepercayaan Lain';
//         default: return cleanCode; // Jika bukan angka, kembalikan teks aslinya
//     }
// };

// // 3. MAPPING GENDER (Kode -> Teks)
// // Bisa '1'/'2' atau 'L'/'P'
// const mapGender = (code: string | null | undefined): string => {
//     if (!code) return '-';
//     const cleanCode = code.toString().trim().toUpperCase();
    
//     if (cleanCode === '1' || cleanCode === 'L' || cleanCode === 'LAKI-LAKI') return 'Laki-laki';
//     if (cleanCode === '2' || cleanCode === 'P' || cleanCode === 'PEREMPUAN') return 'Perempuan';
    
//     return cleanCode;
// };

// // --- MAIN CONTROLLER ---

// export const login = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;

//     // 1. Cek User di MongoDB (Database LMS Lokal)
//     let user: any = await User.findOne({ email }).lean();

//     // --- [LOGIKA HYBRID: JIKA TIDAK ADA DI MONGO -> TARIK DARI PUSAT] ---
//     if (!user) {
//       console.log(`⚠️ User TIDAK ada di Mongo. Mencari di Postgres (Pusat)...`);
      
//       try {
//         // A. Cari Akun Login di tabel 'user' Postgres
//         const pgUserAccount = await prisma.user.findUnique({
//           where: { email: email }
//         });

//         if (pgUserAccount) {
//           console.log(`✅ Akun ditemukan di Pusat: ${pgUserAccount.username}`);
          
//           // B. Verifikasi Password (Bcrypt & MD5 Support)
//           const dbHash = pgUserAccount.password_hash;
//           let isMatch = false;

//           if (await bcrypt.compare(password, dbHash)) {
//              isMatch = true;
//           } else {
//              const inputMd5 = crypto.createHash('md5').update(password).digest('hex');
//              if (dbHash === inputMd5) isMatch = true;
//           }

//           if (isMatch) {
//              console.log(`🎉 Password Cocok! Mengambil biodata lengkap...`);

//              // C. Ambil Biodata & Wilayah (Gunakan nama relasi panjang dari Prisma)
//              const pgBiodata = await prisma.pmi_anggota.findFirst({
//                 where: { id_user: pgUserAccount.id },
//                 include: {
//                     provinsi_pmi_anggota_domisili_id_provinsiToprovinsi: true,
//                     kabupaten_pmi_anggota_domisili_id_kabupatenTokabupaten: true,
//                     kecamatan_pmi_anggota_domisili_id_kecamatanTokecamatan: true,
//                     desa_pmi_anggota_domisili_id_desaTodesa: true,
//                     pmi_golongan_darah: true
//                 }
//              });

//              // D. Persiapkan Data
//              const provinsiName = pgBiodata?.provinsi_pmi_anggota_domisili_id_provinsiToprovinsi?.nama_provinsi || '';
//              const kabupatenName = pgBiodata?.kabupaten_pmi_anggota_domisili_id_kabupatenTokabupaten?.nama_kabupaten || '';
//              const kecamatanName = pgBiodata?.kecamatan_pmi_anggota_domisili_id_kecamatanTokecamatan?.nama_kecamatan || '';
//              const unitName = 'PMI Pusat'; // Default

//              // [PENTING] Mapping Data & Konversi Kode
//              const newUser = new User({
//                 // 1. Field Utama
//                 name: pgBiodata?.nama || pgUserAccount.username,
//                 email: pgUserAccount.email,
//                 password: password, 
//                 role: 'STUDENT',
//                 isVerified: true, 
                
//                 // 2. Field Root (Agar tidak error saat daftar pelatihan)
//                 province: provinsiName, 
//                 city: kabupatenName,
//                 district: kecamatanName,
//                 phone: pgBiodata?.no_hp || "-", 

//                 // 3. Member Data (Detail Lengkap)
//                 memberData: {
//                     // Identitas
//                     nia: pgBiodata?.kode_anggota || pgBiodata?.kode_anggota_lama || `TEMP-${pgUserAccount.id}`,
//                     no_identitas: pgBiodata?.no_identitas,
                    
//                     // Biodata (SUDAH DIPERBAIKI DENGAN MAPPER)
//                     gender: mapGender(pgBiodata?.kelamin), // <-- Konversi Kode ke Teks
//                     religion: mapAgama(pgBiodata?.agama),  // <-- Konversi Kode ke Teks
                    
//                     birthPlace: pgBiodata?.tempat_lahir,
//                     birthDate: formatDate(pgBiodata?.tanggal_lahir),
//                     bloodType: pgBiodata?.id_golongan_darah?.toString(),

//                     // Kontak & Alamat
//                     phone: pgBiodata?.no_hp,
//                     address: pgBiodata?.domisili_alamat,
//                     unit: unitName,
                    
//                     // Wilayah Detail
//                     provinsi_id: pgBiodata?.domisili_id_provinsi,
//                     kabupaten_id: pgBiodata?.domisili_id_kabupaten,
//                     postalCode: pgBiodata?.domisili_kode_pos,

//                     // Meta
//                     source: 'AUTO_REGISTER_POSTGRES'
//                 }
//              });

//              await newUser.save();
             
//              // Ambil ulang user yang baru dibuat
//              user = await User.findById(newUser._id).lean();
//              console.log(`💾 Sinkronisasi Sukses: ${user.email} | Agama: ${user.memberData.religion}`);

//           } else {
//              return res.status(401).json({ error: 'Password salah (Cek Database Pusat).' });
//           }
//         } else {
//             return res.status(401).json({ error: 'Email tidak terdaftar.' });
//         }

//       } catch (err: any) {
//         console.error("🔥 [HYBRID ERROR]", err.message);
//         return res.status(500).json({ error: 'Gagal sinkronisasi data dari Pusat.' });
//       }
//     }

//     // --- PROSES LOGIN STANDARD (MONGO) ---
//     if (!user) return res.status(401).json({ error: 'Login Gagal.' });

//     const userInstance = await User.findOne({ email });
//     const isMatch = await userInstance?.comparePassword(password);

//     if (!isMatch) return res.status(401).json({ error: 'Password salah.' });
//     if (user.isBanned) return res.status(403).json({ error: 'Akun dibekukan.' });

//     const token = signAccessToken({ 
//       id: user._id.toString(), 
//       email: user.email, 
//       role: user.role 
//     });

//     res.json({
//       success: true,
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         avatarUrl: user.avatarUrl,
//         permissions: user.permissions || [], 
//         regionScope: user.regionScope,
//         province: user.province,
//         city: user.city,
//         memberData: user.memberData || {}
//       }
//     });

//   } catch (error: any) {
//     console.error("Server Error:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// export const register = async (req: Request, res: Response) => {
//     try {
//         const { name, email, password, role } = req.body;
//         const existing = await User.findOne({ email });
//         if (existing) return res.status(400).json({ error: 'Email sudah dipakai.' });
//         const newUser = new User({ name, email, password, role: role || 'STUDENT', permissions: [], isBanned: false });
//         await newUser.save();
//         const token = signAccessToken({ id: newUser._id, email, role: newUser.role });
//         res.status(201).json({ success: true, token, user: newUser });
//     } catch (error: any) {
//         res.status(500).json({ error: error.message });
//     }
// };

// export const getMe = async (req: any, res: Response) => {
//   try {
//     if (!req.user || !req.user.id) return res.status(401).json({ error: 'Token tidak valid' });
//     const user = await User.findById(req.user.id).select('-password').lean();
//     if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });
//     res.json({ success: true, user: { ...user, id: user._id, _id: user._id } });
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };


import { Request, Response } from 'express';
import { User } from '../models/User';
import { signAccessToken } from '../middleware/auth';
import { prisma } from '../lib/prisma';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

// --- KONFIGURASI URL FOTO PUSAT ---
// Base URL folder tempat foto disimpan
const BASE_URL_FOTO_PUSAT = 'https://mis.pmi.or.id/uploads/pmi/anggota/'; 

// --- HELPER FUNCTIONS ---

// 1. Format Tanggal
const formatDate = (date: any) => date ? new Date(date).toISOString() : undefined;

// 2. MAPPING AGAMA
const mapAgama = (code: any): string => {
    if (!code) return '-';
    const c = code.toString().trim();
    switch (c) {
        case '1': return 'Islam';
        case '2': return 'Kristen';
        case '3': return 'Katolik';
        case '4': return 'Hindu';
        case '5': return 'Buddha';
        case '6': return 'Konghucu';
        default: return c;
    }
};

// 3. MAPPING GENDER
const mapGender = (code: any): string => {
    if (!code) return '-';
    const c = code.toString().trim().toUpperCase();
    if (c === '1' || c === 'L' || c === 'LAKI-LAKI') return 'Laki-laki';
    if (c === '2' || c === 'P' || c === 'PEREMPUAN') return 'Perempuan';
    return c; 
};

// 4. GENERATE UNIT NAME
const generateUnitName = (prov: string, kab: string, kec: string) => {
    if (kec) return `PMI Kec. ${kec}`;
    if (kab) return `PMI ${kab}`;
    if (prov) return `PMI Prov. ${prov}`;
    return 'PMI Pusat';
};

// 5. [BARU] GENERATE PHOTO URL BY NIK
// Logic: Base URL + NIK + .jpg
const generatePhotoUrlByNik = (nik: string | null | undefined) => {
    // Jika NIK kosong atau tidak valid, jangan generate URL (pakai default)
    if (!nik || nik === '' || nik === '-' || nik.length < 5) return undefined; 
    
    // Construct URL: https://.../320439...003.jpg
    return `${BASE_URL_FOTO_PUSAT}${nik}.jpg`;
};

// --- MAIN CONTROLLER ---

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // 1. Cek User di MongoDB
    let user: any = await User.findOne({ email }).lean();

    // --- [LOGIKA HYBRID SINKRONISASI] ---
    if (!user) {
      console.log(`⚠️ User TIDAK ada di Mongo. Mencari di Postgres (Pusat)...`);
      
      try {
        const pgUserAccount = await prisma.user.findUnique({
          where: { email: email }
        });

        if (pgUserAccount) {
          console.log(`✅ Akun ditemukan di Pusat: ${pgUserAccount.username}`);
          
          const dbHash = pgUserAccount.password_hash;
          let isMatch = false;

          if (await bcrypt.compare(password, dbHash)) isMatch = true;
          else {
             const inputMd5 = crypto.createHash('md5').update(password).digest('hex');
             if (dbHash === inputMd5) isMatch = true;
          }

          if (isMatch) {
             console.log(`🎉 Password Cocok! Mengambil biodata lengkap...`);

             // C. Ambil Biodata & Wilayah
             const pgBiodata = await prisma.pmi_anggota.findFirst({
                where: { id_user: pgUserAccount.id },
                include: {
                    provinsi_pmi_anggota_domisili_id_provinsiToprovinsi: true,
                    kabupaten_pmi_anggota_domisili_id_kabupatenTokabupaten: true,
                    kecamatan_pmi_anggota_domisili_id_kecamatanTokecamatan: true,
                    pmi_golongan_darah: true
                }
             });

             // D. Extract Data
             const provName = pgBiodata?.provinsi_pmi_anggota_domisili_id_provinsiToprovinsi?.nama_provinsi || '';
             const kabName = pgBiodata?.kabupaten_pmi_anggota_domisili_id_kabupatenTokabupaten?.nama_kabupaten || '';
             const kecName = pgBiodata?.kecamatan_pmi_anggota_domisili_id_kecamatanTokecamatan?.nama_kecamatan || '';
             const dynamicUnit = generateUnitName(provName, kabName, kecName);
             
             // [FIX] Generate URL Foto berdasarkan NIK
             const nikUser = pgBiodata?.no_identitas;
             const finalAvatarUrl = generatePhotoUrlByNik(nikUser);

             // [PENTING] Mapping Data Lengkap
             const newUser = new User({
                name: pgBiodata?.nama || pgUserAccount.username,
                email: pgUserAccount.email,
                password: password, 
                role: 'STUDENT',
                isVerified: true, 
                
                // [FIX] Simpan URL Foto (NIK.jpg)
                avatarUrl: finalAvatarUrl,

                // Field Root
                province: provName, 
                city: kabName,
                district: kecName,
                phone: pgBiodata?.no_hp || "-", 

                // Field Member Data
                memberData: {
                    nia: pgBiodata?.kode_anggota || pgBiodata?.kode_anggota_lama || `TEMP-${pgUserAccount.id}`,
                    no_identitas: nikUser || '-', 
                    nik: nikUser || '-',
                    
                    gender: mapGender(pgBiodata?.kelamin), 
                    kelamin: mapGender(pgBiodata?.kelamin),
                    religion: mapAgama(pgBiodata?.agama),
                    agama: mapAgama(pgBiodata?.agama),
                    
                    birthPlace: pgBiodata?.tempat_lahir || '-',
                    tempat_lahir: pgBiodata?.tempat_lahir || '-',
                    birthDate: formatDate(pgBiodata?.tanggal_lahir),
                    tanggal_lahir: formatDate(pgBiodata?.tanggal_lahir),
                    
                    bloodType: pgBiodata?.id_golongan_darah?.toString(),
                    phone: pgBiodata?.no_hp,
                    address: pgBiodata?.domisili_alamat || '-',
                    unit: dynamicUnit, 
                    
                    source: 'AUTO_REGISTER_POSTGRES'
                }
             });

             await newUser.save();
             user = await User.findById(newUser._id).lean();
             console.log(`💾 Sinkronisasi Sukses. Foto: ${finalAvatarUrl}`);

          } else {
             return res.status(401).json({ error: 'Password salah (Cek Database Pusat).' });
          }
        } else {
            return res.status(401).json({ error: 'Email tidak terdaftar.' });
        }

      } catch (err: any) {
        console.error("🔥 [HYBRID ERROR]", err.message);
        return res.status(500).json({ error: 'Gagal sinkronisasi data dari Pusat.' });
      }
    }

    // --- PROSES LOGIN STANDARD ---
    if (!user) return res.status(401).json({ error: 'Login Gagal.' });

    const userInstance = await User.findOne({ email });
    const isMatch = await userInstance?.comparePassword(password);

    if (!isMatch) return res.status(401).json({ error: 'Password salah.' });
    if (user.isBanned) return res.status(403).json({ error: 'Akun dibekukan.' });

    const token = signAccessToken({ 
      id: user._id.toString(), 
      email: user.email, 
      role: user.role 
    });

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatarUrl: user.avatarUrl,
        permissions: user.permissions || [], 
        regionScope: user.regionScope,
        province: user.province,
        city: user.city,
        memberData: user.memberData || {}
      }
    });

  } catch (error: any) {
    console.error("Server Error:", error);
    res.status(500).json({ error: error.message });
  }
};

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password, role } = req.body;
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ error: 'Email sudah dipakai.' });
        const newUser = new User({ name, email, password, role: role || 'STUDENT', permissions: [], isBanned: false });
        await newUser.save();
        const token = signAccessToken({ id: newUser._id, email, role: newUser.role });
        res.status(201).json({ success: true, token, user: newUser });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getMe = async (req: any, res: Response) => {
  try {
    if (!req.user || !req.user.id) return res.status(401).json({ error: 'Token tidak valid' });
    const user = await User.findById(req.user.id).select('-password').lean();
    if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });
    res.json({ success: true, user: { ...user, id: user._id, _id: user._id } });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
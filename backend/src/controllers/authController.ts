// // // // import { Request, Response } from 'express';
// // // // import bcrypt from 'bcryptjs';
// // // // import { User } from '../models/User';
// // // // import { signAccessToken } from '../middleware/auth';
// // // // import { STUDENT_DEFAULT_PERMISSIONS } from '../config/permissions'; // Import Config tadi

// // // // // --- REGISTER ---
// // // // export const register = async (req: Request, res: Response) => {
// // // //   try {
// // // //     const { name, email, password, role } = req.body;

// // // //     // 1. Validasi Input Dasar
// // // //     if (!name || !email || !password) {
// // // //       return res.status(400).json({ error: 'Nama, Email, dan Password wajib diisi' });
// // // //     }

// // // //     // 2. Cek Email Duplikat
// // // //     const existingUser = await User.findOne({ email });
// // // //     if (existingUser) {
// // // //       return res.status(400).json({ error: 'Email sudah terdaftar' });
// // // //     }

// // // //     // 3. Tentukan Role & Permission Awal
// // // //     // Default role adalah STUDENT jika tidak dikirim
// // // //     const userRole = role || 'STUDENT'; 
// // // //     let initialPermissions: string[] = [];

// // // //     // [LOGIKA SESUAI GAMBAR] 
// // // //     // Jika Student, berikan hak akses standar (Standard Checkbox)
// // // //     if (userRole === 'STUDENT') {
// // // //         initialPermissions = STUDENT_DEFAULT_PERMISSIONS; 
// // // //     }
// // // //     // Jika Admin/Facilitator, permission dikosongkan dulu (nanti diset oleh Super Admin)

// // // //     // 4. Buat User Baru
// // // //     const newUser = new User({
// // // //       name,
// // // //       email,
// // // //       password, // Password akan di-hash oleh middleware 'pre save' di Model User
// // // //       role: userRole,
// // // //       permissions: initialPermissions, // Simpan permission otomatis
// // // //       isBanned: false,
      
// // // //       // Default scope (aman untuk student)
// // // //       regionScope: 'national', 
// // // //       managedProvinces: [],
// // // //       managedRegencies: []
// // // //     });

// // // //     await newUser.save();

// // // //     // 5. Generate Token (Auto Login setelah register)
// // // //     const token = signAccessToken({ 
// // // //         id: newUser._id.toString(), 
// // // //         email: newUser.email, 
// // // //         role: newUser.role as any 
// // // //     });

// // // //     // 6. Response
// // // //     res.status(201).json({
// // // //       success: true,
// // // //       message: 'Registrasi berhasil',
// // // //       token,
// // // //       user: {
// // // //         id: newUser._id,
// // // //         name: newUser.name,
// // // //         email: newUser.email,
// // // //         role: newUser.role,
// // // //         permissions: newUser.permissions
// // // //       }
// // // //     });

// // // //   } catch (error: any) {
// // // //     console.error("Register Error:", error);
// // // //     res.status(500).json({ error: error.message || 'Terjadi kesalahan server' });
// // // //   }
// // // // };

// // // // // --- LOGIN ---
// // // // export const login = async (req: Request, res: Response) => {
// // // //   try {
// // // //     const { email, password } = req.body;

// // // //     // 1. Cari User
// // // //     const user = await User.findOne({ email });
// // // //     if (!user) {
// // // //       return res.status(401).json({ error: 'Email atau password salah' });
// // // //     }

// // // //     // 2. Cek Password
// // // //     const isMatch = await user.comparePassword(password);
// // // //     if (!isMatch) {
// // // //       return res.status(401).json({ error: 'Email atau password salah' });
// // // //     }

// // // //     // 3. [PENTING] Cek Status Banned (Sesuai Gambar)
// // // //     if (user.isBanned) {
// // // //         return res.status(403).json({ 
// // // //             error: 'Akun Dibekukan', 
// // // //             message: `Akun Anda telah dibekukan. Alasan: ${user.bannedReason || 'Pelanggaran Kebijakan'}. Silakan hubungi Admin.` 
// // // //         });
// // // //     }

// // // //     // 4. Generate Token
// // // //     const token = signAccessToken({ 
// // // //         id: user._id.toString(), 
// // // //         email: user.email, 
// // // //         role: user.role as any 
// // // //     });

// // // //     // 5. Response
// // // //     res.json({
// // // //       success: true,
// // // //       message: 'Login berhasil',
// // // //       token,
// // // //       user: {
// // // //         id: user._id,
// // // //         name: user.name,
// // // //         email: user.email,
// // // //         role: user.role,
// // // //         avatarUrl: user.avatarUrl,
// // // //         permissions: user.permissions, // Kirim permission ke frontend untuk logic UI
// // // //         regionScope: user.regionScope
// // // //       }
// // // //     });

// // // //   } catch (error: any) {
// // // //     console.error("Login Error:", error);
// // // //     res.status(500).json({ error: error.message || 'Terjadi kesalahan server' });
// // // //   }
// // // // };

// // // import { Request, Response } from 'express';
// // // import bcrypt from 'bcryptjs';
// // // import { User } from '../models/User';
// // // import { signAccessToken } from '../middleware/auth';
// // // // Import Konfigurasi Permission
// // // import { STUDENT_DEFAULT_PERMISSIONS, FACILITATOR_DEFAULT_PERMISSIONS } from '../config/permissions';

// // // // --- REGISTER ---
// // // export const register = async (req: Request, res: Response) => {
// // //   try {
// // //     const { name, email, password, role } = req.body;

// // //     // 1. Validasi Input
// // //     if (!name || !email || !password) {
// // //       return res.status(400).json({ error: 'Nama, Email, dan Password wajib diisi' });
// // //     }

// // //     // 2. Cek Email Duplikat
// // //     const existingUser = await User.findOne({ email });
// // //     if (existingUser) {
// // //       return res.status(400).json({ error: 'Email sudah terdaftar' });
// // //     }

// // //     // 3. Tentukan Role & Permission Awal
// // //     const userRole = role || 'STUDENT'; 
// // //     let initialPermissions: string[] = [];

// // //     if (userRole === 'STUDENT') {
// // //         initialPermissions = STUDENT_DEFAULT_PERMISSIONS; 
// // //     } else if (userRole === 'FACILITATOR') {
// // //         initialPermissions = FACILITATOR_DEFAULT_PERMISSIONS;
// // //     }
// // //     // Note: Admin/SuperAdmin biasanya dibuat manual atau lewat seeding, jadi tidak dihandle di public register ini untuk keamanan.

// // //     // 4. Buat User Baru
// // //     const newUser = new User({
// // //       name,
// // //       email,
// // //       password, // Password di-hash di model (pre-save)
// // //       role: userRole,
// // //       permissions: initialPermissions, // Permission otomatis masuk
// // //       isBanned: false,
// // //       regionScope: 'national' // Default aman
// // //     });

// // //     await newUser.save();

// // //     // 5. Generate Token
// // //     const token = signAccessToken({ 
// // //         id: newUser._id.toString(), 
// // //         email: newUser.email, 
// // //         role: newUser.role as any 
// // //     });

// // //     // 6. Response
// // //     res.status(201).json({
// // //       success: true,
// // //       message: 'Registrasi berhasil',
// // //       token,
// // //       user: {
// // //         id: newUser._id,
// // //         name: newUser.name,
// // //         email: newUser.email,
// // //         role: newUser.role,
// // //         permissions: newUser.permissions
// // //       }
// // //     });

// // //   } catch (error: any) {
// // //     console.error("Register Error:", error);
// // //     res.status(500).json({ error: error.message || 'Terjadi kesalahan server' });
// // //   }
// // // };

// // // // --- LOGIN ---
// // // export const login = async (req: Request, res: Response) => {
// // //   try {
// // //     const { email, password } = req.body;

// // //     // 1. Cari User
// // //     const user = await User.findOne({ email });
// // //     if (!user) {
// // //       return res.status(401).json({ error: 'Email atau password salah' });
// // //     }

// // //     // 2. Cek Password
// // //     const isMatch = await user.comparePassword(password);
// // //     if (!isMatch) {
// // //       return res.status(401).json({ error: 'Email atau password salah' });
// // //     }

// // //     // 3. Cek Status Banned
// // //     if (user.isBanned) {
// // //         return res.status(403).json({ 
// // //             error: 'Akun Dibekukan', 
// // //             message: `Akun Anda telah dibekukan. Alasan: ${user.bannedReason || 'Pelanggaran Kebijakan'}. Silakan hubungi Admin.` 
// // //         });
// // //     }

// // //     // 4. Generate Token
// // //     const token = signAccessToken({ 
// // //         id: user._id.toString(), 
// // //         email: user.email, 
// // //         role: user.role as any 
// // //     });

// // //     res.json({
// // //       success: true,
// // //       message: 'Login berhasil',
// // //       token,
// // //       user: {
// // //         id: user._id,
// // //         name: user.name,
// // //         email: user.email,
// // //         role: user.role,
// // //         avatarUrl: user.avatarUrl,
// // //         permissions: user.permissions,
// // //         regionScope: user.regionScope
// // //       }
// // //     });

// // //   } catch (error: any) {
// // //     console.error("Login Error:", error);
// // //     res.status(500).json({ error: error.message || 'Terjadi kesalahan server' });
// // //   }
// // // };


// // import { Request, Response } from 'express';
// // import bcrypt from 'bcryptjs';
// // import { User } from '../models/User';
// // import { signAccessToken } from '../middleware/auth';

// // // --- REGISTER ---
// // export const register = async (req: Request, res: Response) => {
// //   try {
// //     const { name, email, password, role } = req.body;

// //     if (!name || !email || !password) return res.status(400).json({ error: 'Data tidak lengkap' });

// //     const existingUser = await User.findOne({ email });
// //     if (existingUser) return res.status(400).json({ error: 'Email sudah terdaftar' });

// //     // [DEFAULT ROLE & PERMISSION]
// //     const userRole = role || 'STUDENT'; 
// //     let initialPermissions: string[] = [];

// //     if (userRole === 'STUDENT') {
// //         initialPermissions = ['access_course', 'view_content', 'submit_quiz', 'manage_profile']; 
// //     } else if (userRole === 'FACILITATOR') {
// //         initialPermissions = ['manage_courses', 'view_reports'];
// //     }
// //     // Admin tidak dapat permission otomatis CMS, harus diberi manual oleh Super Admin

// //     const newUser = new User({
// //       name,
// //       email,
// //       password, // Password di-hash oleh pre-save hook di Model
// //       role: userRole,
// //       permissions: initialPermissions,
// //       isBanned: false,
// //       regionScope: 'national'
// //     });

// //     await newUser.save();

// //     const token = signAccessToken({ id: newUser._id.toString(), email: newUser.email, role: newUser.role as any });

// //     res.status(201).json({
// //       success: true,
// //       message: 'Registrasi berhasil',
// //       token,
// //       user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role }
// //     });

// //   } catch (error: any) {
// //     console.error("Register Error:", error);
// //     res.status(500).json({ error: error.message });
// //   }
// // };

// // // --- LOGIN ---
// // export const login = async (req: Request, res: Response) => {
// //   try {
// //     const { email, password } = req.body;
// //     const user = await User.findOne({ email });
// //     if (!user) return res.status(401).json({ error: 'Email atau password salah' });

// //     const isMatch = await user.comparePassword(password);
// //     if (!isMatch) return res.status(401).json({ error: 'Email atau password salah' });

// //     if (user.isBanned) return res.status(403).json({ error: 'Akun Dibekukan', message: user.bannedReason });

// //     const token = signAccessToken({ id: user._id.toString(), email: user.email, role: user.role as any });

// //     res.json({
// //       success: true,
// //       message: 'Login berhasil',
// //       token,
// //       user: {
// //         id: user._id,
// //         name: user.name,
// //         email: user.email,
// //         role: user.role,
// //         avatarUrl: user.avatarUrl,
// //         permissions: user.permissions, // Kirim permission ke frontend agar bisa dicek
// //         regionScope: user.regionScope
// //       }
// //     });

// //   } catch (error: any) {
// //     console.error("Login Error:", error);
// //     res.status(500).json({ error: error.message });
// //   }
// // };

// import { Request, Response } from 'express';
// import { User } from '../models/User';
// import { signAccessToken } from '../middleware/auth';

// export const login = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;
//     console.log("Login Attempt:", email);

//     // [FIX UTAMA] Gunakan .lean()
//     // Ini mengambil data mentah JSON langsung dari database
//     // Mengabaikan filter Schema, Virtuals, dan validasi Mongoose
//     const user: any = await User.findOne({ email }).lean();

//     if (!user) {
//       return res.status(401).json({ error: 'Email tidak terdaftar.' });
//     }

//     // Karena user adalah object mentah, kita tidak bisa pakai method .comparePassword() milik Schema
//     // Kita harus import bcrypt dan cek manual (atau query ulang khusus password jika perlu)
//     // Tapi karena password ada di object user, kita bisa bandingkan manual jika kita import bcrypt
//     // UNTUK KEMUDAHAN: Kita query ulang instance mongoose CUMA untuk cek password
//     const userInstance = await User.findOne({ email });
//     const isMatch = await userInstance?.comparePassword(password);

//     if (!isMatch) {
//       return res.status(401).json({ error: 'Password salah.' });
//     }

//     if (user.isBanned) {
//       return res.status(403).json({ error: 'Akun ini dibekukan.' });
//     }

//     const token = signAccessToken({ 
//       id: user._id.toString(), 
//       email: user.email, 
//       role: user.role 
//     });

//     console.log("▶️ RAW DATA FROM DB:", user); 
//     console.log("▶️ PERMISSIONS CHECK:", user.permissions);

//     res.json({
//       success: true,
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         avatarUrl: user.avatarUrl,
//         // Ambil langsung dari object mentah
//         permissions: user.permissions || [], 
//         regionScope: user.regionScope
//       }
//     });

//   } catch (error: any) {
//     console.error("Login Server Error:", error);
//     res.status(500).json({ error: "Terjadi kesalahan server: " + error.message });
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


import { Request, Response } from 'express';
import { User } from '../models/User';
import { signAccessToken } from '../middleware/auth';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log("Login Attempt:", email);

    const user: any = await User.findOne({ email }).lean();

    if (!user) {
      return res.status(401).json({ error: 'Email tidak terdaftar.' });
    }

    const userInstance = await User.findOne({ email });
    const isMatch = await userInstance?.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Password salah.' });
    }

    if (user.isBanned) {
      return res.status(403).json({ error: 'Akun ini dibekukan.' });
    }

    const token = signAccessToken({ 
      id: user._id.toString(), 
      email: user.email, 
      role: user.role 
    });

    console.log("▶️ RAW DATA FROM DB:", user); 
    console.log("▶️ PERMISSIONS CHECK:", user.permissions);

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
        regionScope: user.regionScope
      }
    });

  } catch (error: any) {
    console.error("Login Server Error:", error);
    res.status(500).json({ error: "Terjadi kesalahan server: " + error.message });
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

// --- [TAMBAHAN BARU: JANGAN DIHAPUS] ---
// Fungsi ini dipanggil oleh AuthProvider.tsx (refreshUserData)
export const getMe = async (req: any, res: Response) => {
  try {
    // req.user diisi oleh middleware requireAuth
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Token tidak valid' });
    }

    const user = await User.findById(req.user.id).select('-password').lean();
    
    if (!user) {
      return res.status(404).json({ error: 'User tidak ditemukan' });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        _id: user._id, // Support dua format ID
        name: user.name,
        email: user.email,
        role: user.role,
        avatarUrl: user.avatarUrl,
        permissions: user.permissions || [],
        regionScope: user.regionScope,
        managedProvinces: (user as any).managedProvinces || [],
        managedRegencies: (user as any).managedRegencies || []
      }
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
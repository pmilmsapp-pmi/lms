// // // // import { Request, Response } from 'express';
// // // // import { User } from '../models/User'; // Sesuaikan huruf besar/kecil nama file model Anda
// // // // import { Progress } from '../models/Progress';
// // // // import { Course } from '../models/Course';

// // // // // --- 1. GET PUBLIC USER DETAIL (Untuk Header Chat) ---
// // // // export const getUserDetail = async (req: Request, res: Response) => {
// // // //   try {
// // // //     // Ambil ID dari parameter URL
// // // //     const { id } = req.params;
    
// // // //     // Cari user, hanya ambil field yang aman (nama, role, foto)
// // // //     const user = await User.findById(id).select('name role avatarUrl email');
    
// // // //     if (!user) {
// // // //       return res.status(404).json({ error: 'User not found' });
// // // //     }

// // // //     res.json(user);
// // // //   } catch (error: any) {
// // // //     res.status(500).json({ error: error.message });
// // // //   }
// // // // };

// // // // // --- 2. GET MY PROFILE (Untuk Halaman Profil) ---
// // // // export const getMe = async (req: any, res: Response) => {
// // // //   try {
// // // //     const userId = req.user.id;

// // // //     // A. Ambil Data User
// // // //     const user = await User.findById(userId).select('-password');
// // // //     if (!user) return res.status(404).json({ error: 'User not found' });

// // // //     // B. Ambil Progress (Sejarah Pelatihan)
// // // //     // Kita cari semua progress milik user ini dan populate data kursusnya
// // // //     const progresses = await Progress.find({ userId }).populate('courseId', 'title thumbnailUrl');

// // // //     // Format Data History
// // // //     const history = progresses.map((p: any) => {
// // // //        // Hitung persentase kelulusan simpel (jumlah lesson selesai / total lesson di kursus)
// // // //        // Catatan: Ini estimasi kasar jika tidak mau query berat ke Course. 
// // // //        // Idealnya field 'progressPercent' disimpan di model Progress.
// // // //        const isCompleted = p.completed; 
// // // //        return {
// // // //            _id: p._id,
// // // //            courseId: p.courseId, // Berisi title & thumbnail
// // // //            completed: isCompleted,
// // // //            progress: isCompleted ? 100 : (p.completedLessons.length > 0 ? 50 : 0) // Mockup progress
// // // //        };
// // // //     });

// // // //     // C. Ambil Sertifikat (Mockup logic: jika course completed = dapat sertifikat)
// // // //     // Nanti Anda bisa buat Model Certificate terpisah jika butuh nomor seri, tgl terbit, dll.
// // // //     const certificates = progresses
// // // //         .filter((p: any) => p.completed) // Hanya yang selesai
// // // //         .map((p: any, idx: number) => ({
// // // //             _id: `cert-${p._id}`,
// // // //             course: p.courseId,
// // // //             certificateNumber: `PMI-${new Date().getFullYear()}-${idx + 1000}`,
// // // //             issueDate: p.updatedAt,
// // // //             status: 'issued'
// // // //         }));

// // // //     res.json({
// // // //         user,
// // // //         history,
// // // //         certificates
// // // //     });

// // // //   } catch (error: any) {
// // // //     console.error("Get Profile Error:", error);
// // // //     res.status(500).json({ error: error.message });
// // // //   }
// // // // };

// // // // // --- 3. UPDATE PROFILE ---
// // // // export const updateProfile = async (req: any, res: Response) => {
// // // //   try {
// // // //     const userId = req.user.id;
// // // //     const { name, avatarUrl } = req.body;

// // // //     const user = await User.findById(userId);
// // // //     if (!user) return res.status(404).json({ error: 'User not found' });

// // // //     if (name) user.name = name;
// // // //     if (avatarUrl) user.avatarUrl = avatarUrl;

// // // //     await user.save();

// // // //     res.json({ message: 'Profile updated', user });
// // // //   } catch (error: any) {
// // // //     res.status(500).json({ error: error.message });
// // // //   }
// // // // };



// // // import { Request, Response } from 'express';
// // // import { User } from '../models/User'; 
// // // import { Progress } from '../models/Progress';
// // // import { Course } from '../models/Course';

// // // // --- 1. GET PUBLIC USER DETAIL (Untuk Header Chat & Search PIC) ---
// // // export const getUserDetail = async (req: Request, res: Response) => {
// // //   try {
// // //     // Ambil ID dari parameter URL
// // //     const { id } = req.params;
    
// // //     // [UPDATED] Pastikan role & avatarUrl terambil untuk UI PIC
// // //     const user = await User.findById(id).select('name role avatarUrl email');
    
// // //     if (!user) {
// // //       return res.status(404).json({ error: 'User not found' });
// // //     }

// // //     res.json(user);
// // //   } catch (error: any) {
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // };

// // // // --- 2. GET MY PROFILE (Untuk Halaman Profil) ---
// // // export const getMe = async (req: any, res: Response) => {
// // //   try {
// // //     const userId = req.user.id;

// // //     // A. Ambil Data User
// // //     const user = await User.findById(userId).select('-password');
// // //     if (!user) return res.status(404).json({ error: 'User not found' });

// // //     // B. Ambil Progress (Sejarah Pelatihan)
// // //     // Kita cari semua progress milik user ini dan populate data kursusnya
// // //     const progresses = await Progress.find({ userId }).populate('courseId', 'title thumbnailUrl');

// // //     // Format Data History
// // //     const history = progresses.map((p: any) => {
// // //        // Hitung persentase kelulusan simpel (jumlah lesson selesai / total lesson di kursus)
// // //        // Catatan: Ini estimasi kasar jika tidak mau query berat ke Course. 
// // //        // Idealnya field 'progressPercent' disimpan di model Progress.
// // //        const isCompleted = p.completed; 
// // //        return {
// // //            _id: p._id,
// // //            courseId: p.courseId, // Berisi title & thumbnail
// // //            completed: isCompleted,
// // //            progress: isCompleted ? 100 : (p.completedLessons.length > 0 ? 50 : 0) // Mockup progress
// // //        };
// // //     });

// // //     // C. Ambil Sertifikat (Mockup logic: jika course completed = dapat sertifikat)
// // //     // Nanti Anda bisa buat Model Certificate terpisah jika butuh nomor seri, tgl terbit, dll.
// // //     const certificates = progresses
// // //         .filter((p: any) => p.completed) // Hanya yang selesai
// // //         .map((p: any, idx: number) => ({
// // //             _id: `cert-${p._id}`,
// // //             course: p.courseId,
// // //             certificateNumber: `PMI-${new Date().getFullYear()}-${idx + 1000}`,
// // //             issueDate: p.updatedAt,
// // //             status: 'issued'
// // //         }));

// // //     res.json({
// // //         user,
// // //         history,
// // //         certificates
// // //     });

// // //   } catch (error: any) {
// // //     console.error("Get Profile Error:", error);
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // };

// // // // --- 3. UPDATE PROFILE ---
// // // export const updateProfile = async (req: any, res: Response) => {
// // //   try {
// // //     const userId = req.user.id;
// // //     const { name, avatarUrl } = req.body;

// // //     const user = await User.findById(userId);
// // //     if (!user) return res.status(404).json({ error: 'User not found' });

// // //     if (name) user.name = name;
// // //     if (avatarUrl) user.avatarUrl = avatarUrl;

// // //     await user.save();

// // //     res.json({ message: 'Profile updated', user });
// // //   } catch (error: any) {
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // };

// // import { Request, Response } from 'express';
// // import { z } from 'zod';
// // import bcrypt from 'bcryptjs';
// // import { User } from '../models/User';
// // import { Progress } from '../models/Progress';
// // import { Certificate } from '../models/Certificate';
// // import { AuthedRequest } from '../middleware/auth';

// // // --- SCHEMAS ---
// // const patchMeSchema = z.object({
// //   name: z.string().min(2).optional(),
// //   avatarUrl: z.string().optional()
// // });

// // const changePasswordSchema = z.object({
// //   currentPassword: z.string().min(6),
// //   newPassword: z.string().min(6),
// // });

// // // --- CONTROLLERS ---

// // // 1. GET CURRENT USER
// // export const getMe = async (req: AuthedRequest, res: Response) => {
// //   try {
// //     const user = await User.findById(req.user!.id).select('-password');
// //     if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });
// //     res.json({ user });
// //   } catch (err: any) {
// //     res.status(500).json({ error: err.message });
// //   }
// // };

// // // 2. UPDATE PROFILE
// // export const updateMe = async (req: AuthedRequest, res: Response) => {
// //   try {
// //     const data = patchMeSchema.parse(req.body);
// //     const user = await User.findByIdAndUpdate(
// //       req.user!.id, 
// //       { $set: data }, 
// //       { new: true }
// //     ).select('-password');

// //     if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });
// //     res.json({ user });
// //   } catch (err: any) {
// //     if (err.issues) return res.status(400).json({ error: 'Validation error', issues: err.issues });
// //     res.status(500).json({ error: err.message });
// //   }
// // };

// // // 3. CHANGE PASSWORD
// // export const changePassword = async (req: AuthedRequest, res: Response) => {
// //   try {
// //     const { currentPassword, newPassword } = changePasswordSchema.parse(req.body);
// //     const user = await User.findById(req.user!.id);
// //     if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });

// //     const isMatch = await bcrypt.compare(currentPassword, user.password);
// //     if (!isMatch) return res.status(400).json({ error: 'Password lama salah' });

// //     user.password = await bcrypt.hash(newPassword, 10);
// //     await user.save();

// //     res.json({ message: 'Password berhasil diperbarui' });
// //   } catch (err: any) {
// //     if (err.issues) return res.status(400).json({ error: 'Validation error', issues: err.issues });
// //     res.status(500).json({ error: err.message });
// //   }
// // };

// // // 4. GET WORKSPACE (User + History + Certs)
// // export const getWorkspace = async (req: AuthedRequest, res: Response) => {
// //   try {
// //     const userId = req.user!.id;
// //     const [user, history, certificates] = await Promise.all([
// //       User.findById(userId).select('-password'),
// //       Progress.find({ userId }).populate('courseId', 'title thumbnailUrl level category').sort({ updatedAt: -1 }),
// //       Certificate.find({ userId }).populate('courseId', 'title').sort({ issuedAt: -1 })
// //     ]);

// //     res.json({ user, history, certificates });
// //   } catch (err: any) {
// //     res.status(500).json({ error: 'Gagal memuat workspace' });
// //   }
// // };

// // // 5. [ADMIN ACTION] FORCE RESET PASSWORD
// // export const adminResetPassword = async (req: Request, res: Response) => {
// //     try {
// //         const { id } = req.params;
// //         const DEFAULT_PASS = '123456'; 

// //         const salt = await bcrypt.genSalt(10);
// //         const hashedPassword = await bcrypt.hash(DEFAULT_PASS, salt);

// //         const user = await User.findByIdAndUpdate(
// //             id, 
// //             { password: hashedPassword },
// //             { new: true }
// //         );

// //         if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });

// //         res.json({ 
// //             success: true,
// //             message: `Password user ${user.name} direset ke: ${DEFAULT_PASS}` 
// //         });
// //     } catch (error: any) {
// //         res.status(500).json({ error: error.message });
// //     }
// // };



// import { Request, Response } from 'express';
// import { z } from 'zod';
// import bcrypt from 'bcryptjs';
// import { User } from '../models/User';
// import { Progress } from '../models/Progress';
// import { Certificate } from '../models/Certificate';
// import { AuthedRequest } from '../middleware/auth';

// // --- SCHEMAS ---
// const patchMeSchema = z.object({
//   name: z.string().min(2).optional(),
//   avatarUrl: z.string().optional()
// });

// const changePasswordSchema = z.object({
//   currentPassword: z.string().min(6),
//   newPassword: z.string().min(6),
// });

// // --- CONTROLLERS ---

// // 1. GET CURRENT USER
// export const getMe = async (req: AuthedRequest, res: Response) => {
//   try {
//     const user = await User.findById(req.user!.id).select('-password');
//     if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });
//     res.json({ user });
//   } catch (err: any) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // 2. UPDATE PROFILE
// export const updateMe = async (req: AuthedRequest, res: Response) => {
//   try {
//     const data = patchMeSchema.parse(req.body);
//     const user = await User.findByIdAndUpdate(
//       req.user!.id, 
//       { $set: data }, 
//       { new: true }
//     ).select('-password');

//     if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });
//     res.json({ user });
//   } catch (err: any) {
//     if (err.issues) return res.status(400).json({ error: 'Validation error', issues: err.issues });
//     res.status(500).json({ error: err.message });
//   }
// };

// // 3. CHANGE PASSWORD
// export const changePassword = async (req: AuthedRequest, res: Response) => {
//   try {
//     const { currentPassword, newPassword } = changePasswordSchema.parse(req.body);
//     const user = await User.findById(req.user!.id);
//     if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });

//     const isMatch = await bcrypt.compare(currentPassword, user.password);
//     if (!isMatch) return res.status(400).json({ error: 'Password lama salah' });

//     user.password = await bcrypt.hash(newPassword, 10);
//     await user.save();

//     res.json({ message: 'Password berhasil diperbarui' });
//   } catch (err: any) {
//     if (err.issues) return res.status(400).json({ error: 'Validation error', issues: err.issues });
//     res.status(500).json({ error: err.message });
//   }
// };

// // 4. GET WORKSPACE (User + History + Certs)
// export const getWorkspace = async (req: AuthedRequest, res: Response) => {
//   try {
//     const userId = req.user!.id;
//     const [user, history, certificates] = await Promise.all([
//       User.findById(userId).select('-password'),
//       Progress.find({ userId }).populate('courseId', 'title thumbnailUrl level category').sort({ updatedAt: -1 }),
//       Certificate.find({ userId }).populate('courseId', 'title').sort({ issuedAt: -1 })
//     ]);

//     res.json({ user, history, certificates });
//   } catch (err: any) {
//     res.status(500).json({ error: 'Gagal memuat workspace' });
//   }
// };

// // 5. [ADMIN ACTION] FORCE RESET PASSWORD
// export const adminResetPassword = async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;
//         const DEFAULT_PASS = '123456'; 

//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(DEFAULT_PASS, salt);

//         const user = await User.findByIdAndUpdate(
//             id, 
//             { password: hashedPassword },
//             { new: true }
//         );

//         if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });

//         res.json({ 
//             success: true,
//             message: `Password user ${user.name} direset ke: ${DEFAULT_PASS}` 
//         });
//     } catch (error: any) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // 6. [BARU] GET LIST FASILITATOR (Safe for Dropdowns)
// // Ini endpoint ringan untuk mengambil daftar orang yang bisa dijadikan fasilitator
// export const getFacilitatorsList = async (req: Request, res: Response) => {
//   try {
//     // Cari user yang rolenya MEMUNGKINKAN jadi pengajar
//     const users = await User.find({
//         role: { $in: ['FACILITATOR', 'ADMIN', 'SUPER_ADMIN'] },
//         isBanned: false
//     })
//     .select('_id name email role avatarUrl') // Hanya ambil data umum
//     .sort({ name: 1 });

//     res.json({ users });
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };


import { Request, Response } from 'express';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';
import { Progress } from '../models/Progress';
import { Certificate } from '../models/Certificate';
import { AuthedRequest } from '../middleware/auth';

// --- SCHEMAS ---
const patchMeSchema = z.object({
  name: z.string().min(2).optional(),
  avatarUrl: z.string().optional()
});

const changePasswordSchema = z.object({
  currentPassword: z.string().min(6),
  newPassword: z.string().min(6),
});

// --- CONTROLLERS ---

// 1. GET CURRENT USER
export const getMe = async (req: AuthedRequest, res: Response) => {
  try {
    const user = await User.findById(req.user!.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });
    res.json({ user });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// 2. UPDATE PROFILE
export const updateMe = async (req: AuthedRequest, res: Response) => {
  try {
    const data = patchMeSchema.parse(req.body);
    const user = await User.findByIdAndUpdate(
      req.user!.id, 
      { $set: data }, 
      { new: true }
    ).select('-password');

    if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });
    res.json({ user });
  } catch (err: any) {
    if (err.issues) return res.status(400).json({ error: 'Validation error', issues: err.issues });
    res.status(500).json({ error: err.message });
  }
};

// 3. CHANGE PASSWORD
export const changePassword = async (req: AuthedRequest, res: Response) => {
  try {
    const { currentPassword, newPassword } = changePasswordSchema.parse(req.body);
    const user = await User.findById(req.user!.id);
    if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Password lama salah' });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: 'Password berhasil diperbarui' });
  } catch (err: any) {
    if (err.issues) return res.status(400).json({ error: 'Validation error', issues: err.issues });
    res.status(500).json({ error: err.message });
  }
};

// 4. GET WORKSPACE (User + History + Certs)
export const getWorkspace = async (req: AuthedRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const [user, history, certificates] = await Promise.all([
      User.findById(userId).select('-password'),
      Progress.find({ userId }).populate('courseId', 'title thumbnailUrl level category').sort({ updatedAt: -1 }),
      Certificate.find({ userId }).populate('courseId', 'title').sort({ issuedAt: -1 })
    ]);

    res.json({ user, history, certificates });
  } catch (err: any) {
    res.status(500).json({ error: 'Gagal memuat workspace' });
  }
};

// 5. [ADMIN ACTION] FORCE RESET PASSWORD
export const adminResetPassword = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const DEFAULT_PASS = '123456'; 

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(DEFAULT_PASS, salt);

        const user = await User.findByIdAndUpdate(
            id, 
            { password: hashedPassword },
            { new: true }
        );

        if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });

        res.json({ 
            success: true,
            message: `Password user ${user.name} direset ke: ${DEFAULT_PASS}` 
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// 6. [BARU] GET LIST FASILITATOR (Safe for Dropdowns)
export const getFacilitatorsList = async (req: Request, res: Response) => {
  try {
    const users = await User.find({
        role: { $in: ['FACILITATOR', 'ADMIN', 'SUPER_ADMIN'] },
        isBanned: false
    })
    .select('_id name email role avatarUrl') 
    .sort({ name: 1 });

    res.json({ users });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// =========================================================================
// 7. [PENTING] ADMIN: GET ALL USERS (DENGAN LIMIT PERFORMA)
// =========================================================================
// Fungsi ini WAJIB ADA agar halaman Admin Data Pengguna tidak crash
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        // [OPTIMASI] Ambil 3000 user terbaru saja untuk menghindari crash frontend
        const users = await User.find()
            .select('-password') 
            .sort({ createdAt: -1 }) 
            .limit(3000) 
            .lean(); 

        res.json({ users });
    } catch (error: any) {
        console.error("Get All Users Error:", error);
        res.status(500).json({ error: error.message });
    }
};

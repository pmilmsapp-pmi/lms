// // // // // // // // import { Request, Response } from 'express';
// // // // // // // // import { User } from '../models/User'; // Sesuaikan huruf besar/kecil nama file model Anda
// // // // // // // // import { Progress } from '../models/Progress';
// // // // // // // // import { Course } from '../models/Course';

// // // // // // // // // --- 1. GET PUBLIC USER DETAIL (Untuk Header Chat) ---
// // // // // // // // export const getUserDetail = async (req: Request, res: Response) => {
// // // // // // // //   try {
// // // // // // // //     // Ambil ID dari parameter URL
// // // // // // // //     const { id } = req.params;
    
// // // // // // // //     // Cari user, hanya ambil field yang aman (nama, role, foto)
// // // // // // // //     const user = await User.findById(id).select('name role avatarUrl email');
    
// // // // // // // //     if (!user) {
// // // // // // // //       return res.status(404).json({ error: 'User not found' });
// // // // // // // //     }

// // // // // // // //     res.json(user);
// // // // // // // //   } catch (error: any) {
// // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // //   }
// // // // // // // // };

// // // // // // // // // --- 2. GET MY PROFILE (Untuk Halaman Profil) ---
// // // // // // // // export const getMe = async (req: any, res: Response) => {
// // // // // // // //   try {
// // // // // // // //     const userId = req.user.id;

// // // // // // // //     // A. Ambil Data User
// // // // // // // //     const user = await User.findById(userId).select('-password');
// // // // // // // //     if (!user) return res.status(404).json({ error: 'User not found' });

// // // // // // // //     // B. Ambil Progress (Sejarah Pelatihan)
// // // // // // // //     // Kita cari semua progress milik user ini dan populate data kursusnya
// // // // // // // //     const progresses = await Progress.find({ userId }).populate('courseId', 'title thumbnailUrl');

// // // // // // // //     // Format Data History
// // // // // // // //     const history = progresses.map((p: any) => {
// // // // // // // //        // Hitung persentase kelulusan simpel (jumlah lesson selesai / total lesson di kursus)
// // // // // // // //        // Catatan: Ini estimasi kasar jika tidak mau query berat ke Course. 
// // // // // // // //        // Idealnya field 'progressPercent' disimpan di model Progress.
// // // // // // // //        const isCompleted = p.completed; 
// // // // // // // //        return {
// // // // // // // //            _id: p._id,
// // // // // // // //            courseId: p.courseId, // Berisi title & thumbnail
// // // // // // // //            completed: isCompleted,
// // // // // // // //            progress: isCompleted ? 100 : (p.completedLessons.length > 0 ? 50 : 0) // Mockup progress
// // // // // // // //        };
// // // // // // // //     });

// // // // // // // //     // C. Ambil Sertifikat (Mockup logic: jika course completed = dapat sertifikat)
// // // // // // // //     // Nanti Anda bisa buat Model Certificate terpisah jika butuh nomor seri, tgl terbit, dll.
// // // // // // // //     const certificates = progresses
// // // // // // // //         .filter((p: any) => p.completed) // Hanya yang selesai
// // // // // // // //         .map((p: any, idx: number) => ({
// // // // // // // //             _id: `cert-${p._id}`,
// // // // // // // //             course: p.courseId,
// // // // // // // //             certificateNumber: `PMI-${new Date().getFullYear()}-${idx + 1000}`,
// // // // // // // //             issueDate: p.updatedAt,
// // // // // // // //             status: 'issued'
// // // // // // // //         }));

// // // // // // // //     res.json({
// // // // // // // //         user,
// // // // // // // //         history,
// // // // // // // //         certificates
// // // // // // // //     });

// // // // // // // //   } catch (error: any) {
// // // // // // // //     console.error("Get Profile Error:", error);
// // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // //   }
// // // // // // // // };

// // // // // // // // // --- 3. UPDATE PROFILE ---
// // // // // // // // export const updateProfile = async (req: any, res: Response) => {
// // // // // // // //   try {
// // // // // // // //     const userId = req.user.id;
// // // // // // // //     const { name, avatarUrl } = req.body;

// // // // // // // //     const user = await User.findById(userId);
// // // // // // // //     if (!user) return res.status(404).json({ error: 'User not found' });

// // // // // // // //     if (name) user.name = name;
// // // // // // // //     if (avatarUrl) user.avatarUrl = avatarUrl;

// // // // // // // //     await user.save();

// // // // // // // //     res.json({ message: 'Profile updated', user });
// // // // // // // //   } catch (error: any) {
// // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // //   }
// // // // // // // // };



// // // // // // // import { Request, Response } from 'express';
// // // // // // // import { User } from '../models/User'; 
// // // // // // // import { Progress } from '../models/Progress';
// // // // // // // import { Course } from '../models/Course';

// // // // // // // // --- 1. GET PUBLIC USER DETAIL (Untuk Header Chat & Search PIC) ---
// // // // // // // export const getUserDetail = async (req: Request, res: Response) => {
// // // // // // //   try {
// // // // // // //     // Ambil ID dari parameter URL
// // // // // // //     const { id } = req.params;
    
// // // // // // //     // [UPDATED] Pastikan role & avatarUrl terambil untuk UI PIC
// // // // // // //     const user = await User.findById(id).select('name role avatarUrl email');
    
// // // // // // //     if (!user) {
// // // // // // //       return res.status(404).json({ error: 'User not found' });
// // // // // // //     }

// // // // // // //     res.json(user);
// // // // // // //   } catch (error: any) {
// // // // // // //     res.status(500).json({ error: error.message });
// // // // // // //   }
// // // // // // // };

// // // // // // // // --- 2. GET MY PROFILE (Untuk Halaman Profil) ---
// // // // // // // export const getMe = async (req: any, res: Response) => {
// // // // // // //   try {
// // // // // // //     const userId = req.user.id;

// // // // // // //     // A. Ambil Data User
// // // // // // //     const user = await User.findById(userId).select('-password');
// // // // // // //     if (!user) return res.status(404).json({ error: 'User not found' });

// // // // // // //     // B. Ambil Progress (Sejarah Pelatihan)
// // // // // // //     // Kita cari semua progress milik user ini dan populate data kursusnya
// // // // // // //     const progresses = await Progress.find({ userId }).populate('courseId', 'title thumbnailUrl');

// // // // // // //     // Format Data History
// // // // // // //     const history = progresses.map((p: any) => {
// // // // // // //        // Hitung persentase kelulusan simpel (jumlah lesson selesai / total lesson di kursus)
// // // // // // //        // Catatan: Ini estimasi kasar jika tidak mau query berat ke Course. 
// // // // // // //        // Idealnya field 'progressPercent' disimpan di model Progress.
// // // // // // //        const isCompleted = p.completed; 
// // // // // // //        return {
// // // // // // //            _id: p._id,
// // // // // // //            courseId: p.courseId, // Berisi title & thumbnail
// // // // // // //            completed: isCompleted,
// // // // // // //            progress: isCompleted ? 100 : (p.completedLessons.length > 0 ? 50 : 0) // Mockup progress
// // // // // // //        };
// // // // // // //     });

// // // // // // //     // C. Ambil Sertifikat (Mockup logic: jika course completed = dapat sertifikat)
// // // // // // //     // Nanti Anda bisa buat Model Certificate terpisah jika butuh nomor seri, tgl terbit, dll.
// // // // // // //     const certificates = progresses
// // // // // // //         .filter((p: any) => p.completed) // Hanya yang selesai
// // // // // // //         .map((p: any, idx: number) => ({
// // // // // // //             _id: `cert-${p._id}`,
// // // // // // //             course: p.courseId,
// // // // // // //             certificateNumber: `PMI-${new Date().getFullYear()}-${idx + 1000}`,
// // // // // // //             issueDate: p.updatedAt,
// // // // // // //             status: 'issued'
// // // // // // //         }));

// // // // // // //     res.json({
// // // // // // //         user,
// // // // // // //         history,
// // // // // // //         certificates
// // // // // // //     });

// // // // // // //   } catch (error: any) {
// // // // // // //     console.error("Get Profile Error:", error);
// // // // // // //     res.status(500).json({ error: error.message });
// // // // // // //   }
// // // // // // // };

// // // // // // // // --- 3. UPDATE PROFILE ---
// // // // // // // export const updateProfile = async (req: any, res: Response) => {
// // // // // // //   try {
// // // // // // //     const userId = req.user.id;
// // // // // // //     const { name, avatarUrl } = req.body;

// // // // // // //     const user = await User.findById(userId);
// // // // // // //     if (!user) return res.status(404).json({ error: 'User not found' });

// // // // // // //     if (name) user.name = name;
// // // // // // //     if (avatarUrl) user.avatarUrl = avatarUrl;

// // // // // // //     await user.save();

// // // // // // //     res.json({ message: 'Profile updated', user });
// // // // // // //   } catch (error: any) {
// // // // // // //     res.status(500).json({ error: error.message });
// // // // // // //   }
// // // // // // // };

// // // // // // import { Request, Response } from 'express';
// // // // // // import { z } from 'zod';
// // // // // // import bcrypt from 'bcryptjs';
// // // // // // import { User } from '../models/User';
// // // // // // import { Progress } from '../models/Progress';
// // // // // // import { Certificate } from '../models/Certificate';
// // // // // // import { AuthedRequest } from '../middleware/auth';

// // // // // // // --- SCHEMAS ---
// // // // // // const patchMeSchema = z.object({
// // // // // //   name: z.string().min(2).optional(),
// // // // // //   avatarUrl: z.string().optional()
// // // // // // });

// // // // // // const changePasswordSchema = z.object({
// // // // // //   currentPassword: z.string().min(6),
// // // // // //   newPassword: z.string().min(6),
// // // // // // });

// // // // // // // --- CONTROLLERS ---

// // // // // // // 1. GET CURRENT USER
// // // // // // export const getMe = async (req: AuthedRequest, res: Response) => {
// // // // // //   try {
// // // // // //     const user = await User.findById(req.user!.id).select('-password');
// // // // // //     if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });
// // // // // //     res.json({ user });
// // // // // //   } catch (err: any) {
// // // // // //     res.status(500).json({ error: err.message });
// // // // // //   }
// // // // // // };

// // // // // // // 2. UPDATE PROFILE
// // // // // // export const updateMe = async (req: AuthedRequest, res: Response) => {
// // // // // //   try {
// // // // // //     const data = patchMeSchema.parse(req.body);
// // // // // //     const user = await User.findByIdAndUpdate(
// // // // // //       req.user!.id, 
// // // // // //       { $set: data }, 
// // // // // //       { new: true }
// // // // // //     ).select('-password');

// // // // // //     if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });
// // // // // //     res.json({ user });
// // // // // //   } catch (err: any) {
// // // // // //     if (err.issues) return res.status(400).json({ error: 'Validation error', issues: err.issues });
// // // // // //     res.status(500).json({ error: err.message });
// // // // // //   }
// // // // // // };

// // // // // // // 3. CHANGE PASSWORD
// // // // // // export const changePassword = async (req: AuthedRequest, res: Response) => {
// // // // // //   try {
// // // // // //     const { currentPassword, newPassword } = changePasswordSchema.parse(req.body);
// // // // // //     const user = await User.findById(req.user!.id);
// // // // // //     if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });

// // // // // //     const isMatch = await bcrypt.compare(currentPassword, user.password);
// // // // // //     if (!isMatch) return res.status(400).json({ error: 'Password lama salah' });

// // // // // //     user.password = await bcrypt.hash(newPassword, 10);
// // // // // //     await user.save();

// // // // // //     res.json({ message: 'Password berhasil diperbarui' });
// // // // // //   } catch (err: any) {
// // // // // //     if (err.issues) return res.status(400).json({ error: 'Validation error', issues: err.issues });
// // // // // //     res.status(500).json({ error: err.message });
// // // // // //   }
// // // // // // };

// // // // // // // 4. GET WORKSPACE (User + History + Certs)
// // // // // // export const getWorkspace = async (req: AuthedRequest, res: Response) => {
// // // // // //   try {
// // // // // //     const userId = req.user!.id;
// // // // // //     const [user, history, certificates] = await Promise.all([
// // // // // //       User.findById(userId).select('-password'),
// // // // // //       Progress.find({ userId }).populate('courseId', 'title thumbnailUrl level category').sort({ updatedAt: -1 }),
// // // // // //       Certificate.find({ userId }).populate('courseId', 'title').sort({ issuedAt: -1 })
// // // // // //     ]);

// // // // // //     res.json({ user, history, certificates });
// // // // // //   } catch (err: any) {
// // // // // //     res.status(500).json({ error: 'Gagal memuat workspace' });
// // // // // //   }
// // // // // // };

// // // // // // // 5. [ADMIN ACTION] FORCE RESET PASSWORD
// // // // // // export const adminResetPassword = async (req: Request, res: Response) => {
// // // // // //     try {
// // // // // //         const { id } = req.params;
// // // // // //         const DEFAULT_PASS = '123456'; 

// // // // // //         const salt = await bcrypt.genSalt(10);
// // // // // //         const hashedPassword = await bcrypt.hash(DEFAULT_PASS, salt);

// // // // // //         const user = await User.findByIdAndUpdate(
// // // // // //             id, 
// // // // // //             { password: hashedPassword },
// // // // // //             { new: true }
// // // // // //         );

// // // // // //         if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });

// // // // // //         res.json({ 
// // // // // //             success: true,
// // // // // //             message: `Password user ${user.name} direset ke: ${DEFAULT_PASS}` 
// // // // // //         });
// // // // // //     } catch (error: any) {
// // // // // //         res.status(500).json({ error: error.message });
// // // // // //     }
// // // // // // };



// // // // // import { Request, Response } from 'express';
// // // // // import { z } from 'zod';
// // // // // import bcrypt from 'bcryptjs';
// // // // // import { User } from '../models/User';
// // // // // import { Progress } from '../models/Progress';
// // // // // import { Certificate } from '../models/Certificate';
// // // // // import { AuthedRequest } from '../middleware/auth';

// // // // // // --- SCHEMAS ---
// // // // // const patchMeSchema = z.object({
// // // // //   name: z.string().min(2).optional(),
// // // // //   avatarUrl: z.string().optional()
// // // // // });

// // // // // const changePasswordSchema = z.object({
// // // // //   currentPassword: z.string().min(6),
// // // // //   newPassword: z.string().min(6),
// // // // // });

// // // // // // --- CONTROLLERS ---

// // // // // // 1. GET CURRENT USER
// // // // // export const getMe = async (req: AuthedRequest, res: Response) => {
// // // // //   try {
// // // // //     const user = await User.findById(req.user!.id).select('-password');
// // // // //     if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });
// // // // //     res.json({ user });
// // // // //   } catch (err: any) {
// // // // //     res.status(500).json({ error: err.message });
// // // // //   }
// // // // // };

// // // // // // 2. UPDATE PROFILE
// // // // // export const updateMe = async (req: AuthedRequest, res: Response) => {
// // // // //   try {
// // // // //     const data = patchMeSchema.parse(req.body);
// // // // //     const user = await User.findByIdAndUpdate(
// // // // //       req.user!.id, 
// // // // //       { $set: data }, 
// // // // //       { new: true }
// // // // //     ).select('-password');

// // // // //     if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });
// // // // //     res.json({ user });
// // // // //   } catch (err: any) {
// // // // //     if (err.issues) return res.status(400).json({ error: 'Validation error', issues: err.issues });
// // // // //     res.status(500).json({ error: err.message });
// // // // //   }
// // // // // };

// // // // // // 3. CHANGE PASSWORD
// // // // // export const changePassword = async (req: AuthedRequest, res: Response) => {
// // // // //   try {
// // // // //     const { currentPassword, newPassword } = changePasswordSchema.parse(req.body);
// // // // //     const user = await User.findById(req.user!.id);
// // // // //     if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });

// // // // //     const isMatch = await bcrypt.compare(currentPassword, user.password);
// // // // //     if (!isMatch) return res.status(400).json({ error: 'Password lama salah' });

// // // // //     user.password = await bcrypt.hash(newPassword, 10);
// // // // //     await user.save();

// // // // //     res.json({ message: 'Password berhasil diperbarui' });
// // // // //   } catch (err: any) {
// // // // //     if (err.issues) return res.status(400).json({ error: 'Validation error', issues: err.issues });
// // // // //     res.status(500).json({ error: err.message });
// // // // //   }
// // // // // };

// // // // // // 4. GET WORKSPACE (User + History + Certs)
// // // // // export const getWorkspace = async (req: AuthedRequest, res: Response) => {
// // // // //   try {
// // // // //     const userId = req.user!.id;
// // // // //     const [user, history, certificates] = await Promise.all([
// // // // //       User.findById(userId).select('-password'),
// // // // //       Progress.find({ userId }).populate('courseId', 'title thumbnailUrl level category').sort({ updatedAt: -1 }),
// // // // //       Certificate.find({ userId }).populate('courseId', 'title').sort({ issuedAt: -1 })
// // // // //     ]);

// // // // //     res.json({ user, history, certificates });
// // // // //   } catch (err: any) {
// // // // //     res.status(500).json({ error: 'Gagal memuat workspace' });
// // // // //   }
// // // // // };

// // // // // // 5. [ADMIN ACTION] FORCE RESET PASSWORD
// // // // // export const adminResetPassword = async (req: Request, res: Response) => {
// // // // //     try {
// // // // //         const { id } = req.params;
// // // // //         const DEFAULT_PASS = '123456'; 

// // // // //         const salt = await bcrypt.genSalt(10);
// // // // //         const hashedPassword = await bcrypt.hash(DEFAULT_PASS, salt);

// // // // //         const user = await User.findByIdAndUpdate(
// // // // //             id, 
// // // // //             { password: hashedPassword },
// // // // //             { new: true }
// // // // //         );

// // // // //         if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });

// // // // //         res.json({ 
// // // // //             success: true,
// // // // //             message: `Password user ${user.name} direset ke: ${DEFAULT_PASS}` 
// // // // //         });
// // // // //     } catch (error: any) {
// // // // //         res.status(500).json({ error: error.message });
// // // // //     }
// // // // // };

// // // // // // 6. [BARU] GET LIST FASILITATOR (Safe for Dropdowns)
// // // // // // Ini endpoint ringan untuk mengambil daftar orang yang bisa dijadikan fasilitator
// // // // // export const getFacilitatorsList = async (req: Request, res: Response) => {
// // // // //   try {
// // // // //     // Cari user yang rolenya MEMUNGKINKAN jadi pengajar
// // // // //     const users = await User.find({
// // // // //         role: { $in: ['FACILITATOR', 'ADMIN', 'SUPER_ADMIN'] },
// // // // //         isBanned: false
// // // // //     })
// // // // //     .select('_id name email role avatarUrl') // Hanya ambil data umum
// // // // //     .sort({ name: 1 });

// // // // //     res.json({ users });
// // // // //   } catch (error: any) {
// // // // //     res.status(500).json({ error: error.message });
// // // // //   }
// // // // // };


// // // // import { Request, Response } from 'express';
// // // // import { z } from 'zod';
// // // // import bcrypt from 'bcryptjs';
// // // // import { User } from '../models/User';
// // // // import { Progress } from '../models/Progress';
// // // // import { Certificate } from '../models/Certificate';
// // // // import { AuthedRequest } from '../middleware/auth';

// // // // // --- SCHEMAS ---
// // // // const patchMeSchema = z.object({
// // // //   name: z.string().min(2).optional(),
// // // //   avatarUrl: z.string().optional()
// // // // });

// // // // const changePasswordSchema = z.object({
// // // //   currentPassword: z.string().min(6),
// // // //   newPassword: z.string().min(6),
// // // // });

// // // // // --- CONTROLLERS ---

// // // // // 1. GET CURRENT USER
// // // // export const getMe = async (req: AuthedRequest, res: Response) => {
// // // //   try {
// // // //     const user = await User.findById(req.user!.id).select('-password');
// // // //     if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });
// // // //     res.json({ user });
// // // //   } catch (err: any) {
// // // //     res.status(500).json({ error: err.message });
// // // //   }
// // // // };

// // // // // 2. UPDATE PROFILE
// // // // export const updateMe = async (req: AuthedRequest, res: Response) => {
// // // //   try {
// // // //     const data = patchMeSchema.parse(req.body);
// // // //     const user = await User.findByIdAndUpdate(
// // // //       req.user!.id, 
// // // //       { $set: data }, 
// // // //       { new: true }
// // // //     ).select('-password');

// // // //     if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });
// // // //     res.json({ user });
// // // //   } catch (err: any) {
// // // //     if (err.issues) return res.status(400).json({ error: 'Validation error', issues: err.issues });
// // // //     res.status(500).json({ error: err.message });
// // // //   }
// // // // };

// // // // // 3. CHANGE PASSWORD
// // // // export const changePassword = async (req: AuthedRequest, res: Response) => {
// // // //   try {
// // // //     const { currentPassword, newPassword } = changePasswordSchema.parse(req.body);
// // // //     const user = await User.findById(req.user!.id);
// // // //     if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });

// // // //     const isMatch = await bcrypt.compare(currentPassword, user.password);
// // // //     if (!isMatch) return res.status(400).json({ error: 'Password lama salah' });

// // // //     user.password = await bcrypt.hash(newPassword, 10);
// // // //     await user.save();

// // // //     res.json({ message: 'Password berhasil diperbarui' });
// // // //   } catch (err: any) {
// // // //     if (err.issues) return res.status(400).json({ error: 'Validation error', issues: err.issues });
// // // //     res.status(500).json({ error: err.message });
// // // //   }
// // // // };

// // // // // 4. GET WORKSPACE (User + History + Certs)
// // // // export const getWorkspace = async (req: AuthedRequest, res: Response) => {
// // // //   try {
// // // //     const userId = req.user!.id;
// // // //     const [user, history, certificates] = await Promise.all([
// // // //       User.findById(userId).select('-password'),
// // // //       Progress.find({ userId }).populate('courseId', 'title thumbnailUrl level category').sort({ updatedAt: -1 }),
// // // //       Certificate.find({ userId }).populate('courseId', 'title').sort({ issuedAt: -1 })
// // // //     ]);

// // // //     res.json({ user, history, certificates });
// // // //   } catch (err: any) {
// // // //     res.status(500).json({ error: 'Gagal memuat workspace' });
// // // //   }
// // // // };

// // // // // 5. [ADMIN ACTION] FORCE RESET PASSWORD
// // // // export const adminResetPassword = async (req: Request, res: Response) => {
// // // //     try {
// // // //         const { id } = req.params;
// // // //         const DEFAULT_PASS = '123456'; 

// // // //         const salt = await bcrypt.genSalt(10);
// // // //         const hashedPassword = await bcrypt.hash(DEFAULT_PASS, salt);

// // // //         const user = await User.findByIdAndUpdate(
// // // //             id, 
// // // //             { password: hashedPassword },
// // // //             { new: true }
// // // //         );

// // // //         if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });

// // // //         res.json({ 
// // // //             success: true,
// // // //             message: `Password user ${user.name} direset ke: ${DEFAULT_PASS}` 
// // // //         });
// // // //     } catch (error: any) {
// // // //         res.status(500).json({ error: error.message });
// // // //     }
// // // // };

// // // // // 6. GET LIST FASILITATOR (Safe for Dropdowns)
// // // // export const getFacilitatorsList = async (req: Request, res: Response) => {
// // // //   try {
// // // //     const users = await User.find({
// // // //         role: { $in: ['FACILITATOR', 'ADMIN', 'SUPER_ADMIN'] },
// // // //         isBanned: false
// // // //     })
// // // //     .select('_id name email role avatarUrl') 
// // // //     .sort({ name: 1 });

// // // //     res.json({ users });
// // // //   } catch (error: any) {
// // // //     res.status(500).json({ error: error.message });
// // // //   }
// // // // };

// // // // // =========================================================================
// // // // // 7. [BARU] GET DASHBOARD STATS (Total User yang Benar)
// // // // // =========================================================================
// // // // export const getDashboardStats = async (req: Request, res: Response) => {
// // // //     try {
// // // //         // countDocuments menghitung SEMUA data tanpa terpengaruh limit
// // // //         const totalUsers = await User.countDocuments();
        
// // // //         // Contoh stats lain (opsional)
// // // //         const totalAdmins = await User.countDocuments({ role: { $in: ['ADMIN', 'SUPER_ADMIN'] } });
// // // //         const pendingVerify = await User.countDocuments({ isVerified: false });

// // // //         res.json({ 
// // // //             success: true,
// // // //             totalUsers, 
// // // //             totalAdmins,
// // // //             pendingVerify
// // // //         });
// // // //     } catch (error: any) {
// // // //         res.status(500).json({ error: error.message });
// // // //     }
// // // // };

// // // // // =========================================================================
// // // // // 8. [UPDATE] ADMIN: GET ALL USERS (FILTER DROPDOWN + SMART SEARCH)
// // // // // =========================================================================
// // // // export const getAllUsers = async (req: Request, res: Response) => {
// // // //     try {
// // // //         // Ambil parameter dari frontend
// // // //         const { q, role, province, city, position } = req.query; 
        
// // // //         let query: any = {};

// // // //         // 1. Filter Pencarian Teks (q)
// // // //         if (q && typeof q === 'string') {
// // // //             const searchRegex = { $regex: q, $options: 'i' };
// // // //             query.$or = [
// // // //                 { name: searchRegex },
// // // //                 { email: searchRegex },
// // // //                 { 'memberData.nia': searchRegex },
// // // //                 { 'memberData.unit': searchRegex },
// // // //             ];
// // // //             // Jika user mengetik nama kota di search box, tambahkan ke OR
// // // //             if (!city) query.$or.push({ city: searchRegex });
// // // //         }

// // // //         // 2. Filter Dropdown (Strict Match)
// // // //         if (role && role !== 'ALL') query.role = role;
        
// // // //         if (province && province !== 'ALL') {
// // // //             // Gunakan regex agar pencarian "Jawa Timur" cocok dengan " JAWA TIMUR "
// // // //             query.province = { $regex: `^${province.toString().trim()}$`, $options: 'i' };
// // // //         }
        
// // // //         if (city && city !== 'ALL') {
// // // //             // Pencarian kota lebih fleksibel karena input manual user bisa beda dikit
// // // //             query.city = { $regex: city.toString().trim(), $options: 'i' };
// // // //         }

// // // //         if (position && position !== 'ALL') {
// // // //             // Cari di memberType atau memberData.position
// // // //             query.$or = query.$or || [];
// // // //             // Reset $or jika sebelumnya dipakai search box, kita gabung dengan $and di logika kompleks, 
// // // //             // tapi untuk simpelnya kita gunakan regex di field terkait saja:
// // // //             const posRegex = { $regex: position.toString(), $options: 'i' };
            
// // // //             // Karena struktur OR di atas, kita buat query terpisah untuk posisi jika search box kosong
// // // //             // Jika search box ada, ini agak tricky, jadi kita gunakan $and implisit Mongoose
// // // //             if(query.$or && query.$or.length > 0) {
// // // //                  // Jika ada search text, filter posisi harus match juga
// // // //                  query = {
// // // //                      $and: [
// // // //                          query, // Query search text
// // // //                          { 
// // // //                              $or: [ 
// // // //                                  { memberType: posRegex }, 
// // // //                                  { 'memberData.position': posRegex } 
// // // //                              ] 
// // // //                          }
// // // //                      ]
// // // //                  }
// // // //             } else {
// // // //                 // Jika tidak ada search text
// // // //                 query.$or = [
// // // //                     { memberType: posRegex },
// // // //                     { 'memberData.position': posRegex }
// // // //                 ];
// // // //             }
// // // //         }

// // // //         // Strategi Limit
// // // //         // Jika ada filter apapun (search / dropdown), naikkan limit
// // // //         const hasFilter = q || (role && role !== 'ALL') || (province && province !== 'ALL') || (city && city !== 'ALL') || (position && position !== 'ALL');
// // // //         const limit = hasFilter ? 3000 : 50; 

// // // //         const users = await User.find(query)
// // // //             .select('-password') 
// // // //             .sort({ createdAt: -1 }) 
// // // //             .limit(limit) 
// // // //             .lean(); 

// // // //         res.json({ users });
// // // //     } catch (error: any) {
// // // //         console.error("Get All Users Error:", error);
// // // //         res.status(500).json({ error: error.message });
// // // //     }
// // // // };



// // // import { Request, Response } from 'express';
// // // import { z } from 'zod';
// // // import bcrypt from 'bcryptjs';
// // // import { User } from '../models/User';
// // // import { Progress } from '../models/Progress';
// // // import { Certificate } from '../models/Certificate';
// // // import { AuthedRequest } from '../middleware/auth';

// // // // --- SCHEMAS ---
// // // const patchMeSchema = z.object({
// // //   name: z.string().min(2).optional(),
// // //   avatarUrl: z.string().optional()
// // // });

// // // const changePasswordSchema = z.object({
// // //   currentPassword: z.string().min(6),
// // //   newPassword: z.string().min(6),
// // // });

// // // // --- HELPER: CEK AKSES WILAYAH ---
// // // // Fungsi ini memastikan Admin Jatim tidak bisa edit user Jabar
// // // const canManageUser = (admin: any, targetUser: any) => {
// // //     if (admin.role === 'SUPER_ADMIN') return true;
// // //     if (admin.regionScope === 'national') return true;

// // //     // Cek Provinsi
// // //     if (admin.regionScope === 'province') {
// // //         // Normalisasi string agar case insensitive (JAWA TIMUR == Jawa Timur)
// // //         const targetProv = (targetUser.province || '').toUpperCase().trim();
// // //         const adminProvs = (admin.managedProvinces || []).map((p:string) => p.toUpperCase().trim());
        
// // //         return adminProvs.includes(targetProv);
// // //     }

// // //     // Cek Kabupaten/Kota
// // //     if (admin.regionScope === 'regency') {
// // //         const targetCity = (targetUser.city || '').toUpperCase().trim();
// // //         const adminRegs = (admin.managedRegencies || []).map((r:string) => r.toUpperCase().trim());
        
// // //         return adminRegs.includes(targetCity);
// // //     }

// // //     return false;
// // // };

// // // // --- CONTROLLERS ---

// // // // 1. GET CURRENT USER
// // // export const getMe = async (req: AuthedRequest, res: Response) => {
// // //   try {
// // //     const user = await User.findById(req.user!.id).select('-password');
// // //     if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });
// // //     res.json({ user });
// // //   } catch (err: any) {
// // //     res.status(500).json({ error: err.message });
// // //   }
// // // };

// // // // 2. UPDATE PROFILE
// // // export const updateMe = async (req: AuthedRequest, res: Response) => {
// // //   try {
// // //     const data = patchMeSchema.parse(req.body);
// // //     const user = await User.findByIdAndUpdate(
// // //       req.user!.id, 
// // //       { $set: data }, 
// // //       { new: true }
// // //     ).select('-password');

// // //     if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });
// // //     res.json({ user });
// // //   } catch (err: any) {
// // //     if (err.issues) return res.status(400).json({ error: 'Validation error', issues: err.issues });
// // //     res.status(500).json({ error: err.message });
// // //   }
// // // };

// // // // 3. CHANGE PASSWORD
// // // export const changePassword = async (req: AuthedRequest, res: Response) => {
// // //   try {
// // //     const { currentPassword, newPassword } = changePasswordSchema.parse(req.body);
// // //     const user = await User.findById(req.user!.id);
// // //     if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });

// // //     const isMatch = await bcrypt.compare(currentPassword, user.password);
// // //     if (!isMatch) return res.status(400).json({ error: 'Password lama salah' });

// // //     user.password = await bcrypt.hash(newPassword, 10);
// // //     await user.save();

// // //     res.json({ message: 'Password berhasil diperbarui' });
// // //   } catch (err: any) {
// // //     if (err.issues) return res.status(400).json({ error: 'Validation error', issues: err.issues });
// // //     res.status(500).json({ error: err.message });
// // //   }
// // // };

// // // // 4. GET WORKSPACE (User + History + Certs)
// // // export const getWorkspace = async (req: AuthedRequest, res: Response) => {
// // //   try {
// // //     const userId = req.user!.id;
// // //     const [user, history, certificates] = await Promise.all([
// // //       User.findById(userId).select('-password'),
// // //       Progress.find({ userId }).populate('courseId', 'title thumbnailUrl level category').sort({ updatedAt: -1 }),
// // //       Certificate.find({ userId }).populate('courseId', 'title').sort({ issuedAt: -1 })
// // //     ]);

// // //     res.json({ user, history, certificates });
// // //   } catch (err: any) {
// // //     res.status(500).json({ error: 'Gagal memuat workspace' });
// // //   }
// // // };

// // // // 5. [ADMIN ACTION] FORCE RESET PASSWORD (PROTECTED SCOPE)
// // // export const adminResetPassword = async (req: any, res: Response) => {
// // //     try {
// // //         const { id } = req.params;
// // //         const actingUser = req.user; // Admin yang melakukan aksi

// // //         // Ambil data user target dulu untuk cek wilayah
// // //         const targetUser = await User.findById(id);
// // //         if (!targetUser) return res.status(404).json({ error: 'User tidak ditemukan' });

// // //         // [SCOPE GUARD] Cek apakah Admin boleh reset password user ini
// // //         if (!canManageUser(actingUser, targetUser)) {
// // //             return res.status(403).json({ error: 'Akses Ditolak: User ini berada di luar wilayah wewenang Anda.' });
// // //         }

// // //         const DEFAULT_PASS = '123456'; 
// // //         const salt = await bcrypt.genSalt(10);
// // //         const hashedPassword = await bcrypt.hash(DEFAULT_PASS, salt);

// // //         targetUser.password = hashedPassword;
// // //         await targetUser.save();

// // //         res.json({ 
// // //             success: true,
// // //             message: `Password user ${targetUser.name} direset ke: ${DEFAULT_PASS}` 
// // //         });
// // //     } catch (error: any) {
// // //         res.status(500).json({ error: error.message });
// // //     }
// // // };

// // // // 6. GET LIST FASILITATOR (Safe for Dropdowns)
// // // export const getFacilitatorsList = async (req: Request, res: Response) => {
// // //   try {
// // //     const users = await User.find({
// // //         role: { $in: ['FACILITATOR', 'ADMIN', 'SUPER_ADMIN'] },
// // //         isBanned: false
// // //     })
// // //     .select('_id name email role avatarUrl') 
// // //     .sort({ name: 1 });

// // //     res.json({ users });
// // //   } catch (error: any) {
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // };

// // // // =========================================================================
// // // // 7. GET DASHBOARD STATS (Total dengan Filter Wilayah)
// // // // =========================================================================
// // // export const getDashboardStats = async (req: any, res: Response) => {
// // //     try {
// // //         const actingUser = req.user;
// // //         let query: any = {};

// // //         // [SCOPE GUARD] Filter Stats hanya untuk wilayah admin
// // //         if (actingUser.role === 'ADMIN') {
// // //             if (actingUser.regionScope === 'province') {
// // //                 query.province = { $in: actingUser.managedProvinces };
// // //             } else if (actingUser.regionScope === 'regency') {
// // //                 query.city = { $in: actingUser.managedRegencies };
// // //             }
// // //         }

// // //         const totalUsers = await User.countDocuments(query);
// // //         const totalAdmins = await User.countDocuments({ ...query, role: { $in: ['ADMIN', 'SUPER_ADMIN'] } });
// // //         const pendingVerify = await User.countDocuments({ ...query, isVerified: false });

// // //         res.json({ success: true, totalUsers, totalAdmins, pendingVerify });
// // //     } catch (error: any) {
// // //         res.status(500).json({ error: error.message });
// // //     }
// // // };

// // // // =========================================================================
// // // // 8. [UPDATE FINAL] ADMIN: GET ALL USERS (SCOPE PROTECTED)
// // // // =========================================================================
// // // export const getAllUsers = async (req: any, res: Response) => {
// // //     try {
// // //         const { q, role, province, city, position } = req.query; 
// // //         const actingUser = req.user; // Admin yang login

// // //         let query: any = {};

// // //         // ------------------------------------------------------------------
// // //         // [SCOPE GUARD] FILTER OTOMATIS BERDASARKAN WILAYAH ADMIN
// // //         // ------------------------------------------------------------------
// // //         if (actingUser.role !== 'SUPER_ADMIN' && actingUser.regionScope !== 'national') {
            
// // //             if (actingUser.regionScope === 'province') {
// // //                 // Admin Provinsi hanya lihat user di provinsinya
// // //                 // Gunakan Regex agar "Jawa Timur" match dengan "JAWA TIMUR"
// // //                 const provs = actingUser.managedProvinces.map((p: string) => new RegExp(`^${p.trim()}$`, 'i'));
// // //                 query.province = { $in: provs };
// // //             } 
            
// // //             else if (actingUser.regionScope === 'regency') {
// // //                 // Admin Kota hanya lihat user di kotanya
// // //                 const regs = actingUser.managedRegencies.map((r: string) => new RegExp(r.trim(), 'i'));
// // //                 query.city = { $in: regs };
// // //             }
// // //         }
// // //         // ------------------------------------------------------------------

// // //         // 1. Filter Pencarian Teks (q)
// // //         if (q && typeof q === 'string') {
// // //             const searchRegex = { $regex: q, $options: 'i' };
            
// // //             // Bungkus dalam $and agar tidak menimpa filter wilayah di atas
// // //             query = {
// // //                 $and: [
// // //                     query, // Filter wilayah yang sudah diset di atas
// // //                     {
// // //                         $or: [
// // //                             { name: searchRegex },
// // //                             { email: searchRegex },
// // //                             { 'memberData.nia': searchRegex },
// // //                             { 'memberData.unit': searchRegex },
// // //                             { city: searchRegex }
// // //                         ]
// // //                     }
// // //                 ]
// // //             };
// // //         }

// // //         // 2. Filter Dropdown (Strict Match)
// // //         if (role && role !== 'ALL') query.role = role;
        
// // //         // Filter Province Manual (Hanya boleh memilih yg ada di wewenangnya)
// // //         if (province && province !== 'ALL') {
// // //             query.province = { $regex: `^${province.toString().trim()}$`, $options: 'i' };
// // //         }
        
// // //         if (city && city !== 'ALL') {
// // //             query.city = { $regex: city.toString().trim(), $options: 'i' };
// // //         }

// // //         if (position && position !== 'ALL') {
// // //             const posRegex = { $regex: position.toString(), $options: 'i' };
// // //             // Tambahkan logika posisi ke query yang ada
// // //             if (query.$and) {
// // //                 query.$and.push({
// // //                     $or: [ { memberType: posRegex }, { 'memberData.position': posRegex } ]
// // //                 });
// // //             } else {
// // //                 query.$or = [ { memberType: posRegex }, { 'memberData.position': posRegex } ];
// // //             }
// // //         }

// // //         // Strategi Limit
// // //         const hasFilter = q || (role && role !== 'ALL') || (province && province !== 'ALL') || (city && city !== 'ALL') || (position && position !== 'ALL');
// // //         const limit = hasFilter ? 3000 : 50; 

// // //         const users = await User.find(query)
// // //             .select('-password') 
// // //             .sort({ createdAt: -1 }) 
// // //             .limit(limit) 
// // //             .lean(); 

// // //         res.json({ users });
// // //     } catch (error: any) {
// // //         console.error("Get All Users Error:", error);
// // //         res.status(500).json({ error: error.message });
// // //     }
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

// // // --- HELPER: CEK AKSES WILAYAH ---
// // const canManageUser = (admin: any, targetUser: any) => {
// //     if (admin.role === 'SUPER_ADMIN') return true;
// //     if (admin.regionScope === 'national') return true;

// //     if (admin.regionScope === 'province') {
// //         const targetProv = (targetUser.province || '').toUpperCase().trim();
// //         const adminProvs = (admin.managedProvinces || []).map((p:string) => p.toUpperCase().trim());
// //         return adminProvs.includes(targetProv);
// //     }

// //     if (admin.regionScope === 'regency') {
// //         const targetCity = (targetUser.city || '').toUpperCase().trim();
// //         const adminRegs = (admin.managedRegencies || []).map((r:string) => r.toUpperCase().trim());
// //         return adminRegs.includes(targetCity);
// //     }

// //     return false;
// // };

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

// // // 5. [ADMIN ACTION] FORCE RESET PASSWORD (PROTECTED SCOPE)
// // export const adminResetPassword = async (req: any, res: Response) => {
// //     try {
// //         const { id } = req.params;
// //         const actingUser = req.user;

// //         const targetUser = await User.findById(id);
// //         if (!targetUser) return res.status(404).json({ error: 'User tidak ditemukan' });

// //         if (!canManageUser(actingUser, targetUser)) {
// //             return res.status(403).json({ error: 'Akses Ditolak: User ini berada di luar wilayah wewenang Anda.' });
// //         }

// //         const DEFAULT_PASS = '123456'; 
// //         const salt = await bcrypt.genSalt(10);
// //         const hashedPassword = await bcrypt.hash(DEFAULT_PASS, salt);

// //         targetUser.password = hashedPassword;
// //         await targetUser.save();

// //         res.json({ 
// //             success: true,
// //             message: `Password user ${targetUser.name} direset ke: ${DEFAULT_PASS}` 
// //         });
// //     } catch (error: any) {
// //         res.status(500).json({ error: error.message });
// //     }
// // };

// // // 6. GET LIST FASILITATOR (Safe for Dropdowns)
// // export const getFacilitatorsList = async (req: Request, res: Response) => {
// //   try {
// //     const users = await User.find({
// //         role: { $in: ['FACILITATOR', 'ADMIN', 'SUPER_ADMIN'] },
// //         isBanned: false
// //     })
// //     .select('_id name email role avatarUrl') 
// //     .sort({ name: 1 });

// //     res.json({ users });
// //   } catch (error: any) {
// //     res.status(500).json({ error: error.message });
// //   }
// // };

// // // 7. GET DASHBOARD STATS (Total dengan Filter Wilayah)
// // export const getDashboardStats = async (req: any, res: Response) => {
// //     try {
// //         const actingUser = req.user;
// //         let query: any = {};

// //         if (actingUser.role === 'ADMIN') {
// //             if (actingUser.regionScope === 'province') {
// //                 query.province = { $in: actingUser.managedProvinces };
// //             } else if (actingUser.regionScope === 'regency') {
// //                 query.city = { $in: actingUser.managedRegencies };
// //             }
// //         }

// //         const totalUsers = await User.countDocuments(query);
// //         const totalAdmins = await User.countDocuments({ ...query, role: { $in: ['ADMIN', 'SUPER_ADMIN'] } });
// //         const pendingVerify = await User.countDocuments({ ...query, isVerified: false });

// //         res.json({ success: true, totalUsers, totalAdmins, pendingVerify });
// //     } catch (error: any) {
// //         res.status(500).json({ error: error.message });
// //     }
// // };

// // // =========================================================================
// // // 8. [UPDATE FINAL] ADMIN: GET ALL USERS (SCOPE PROTECTED)
// // // =========================================================================
// // export const getAllUsers = async (req: any, res: Response) => {
// //     try {
// //         const { q, role, province, city, position } = req.query; 
// //         const actingUser = req.user; // User yang login (bisa Admin/Fasilitator)

// //         let query: any = {};

// //         // --- IZIN FILTER ---
// //         // Jika Fasilitator yang request, batasi hanya bisa lihat Fasilitator & Admin (bukan student)
// //         if (actingUser.role === 'FACILITATOR') {
// //              query.role = { $in: ['FACILITATOR', 'ADMIN', 'SUPER_ADMIN'] };
// //         } 
// //         // Jika Admin Biasa (Bukan Super Admin), batasi wilayah
// //         else if (actingUser.role === 'ADMIN' && actingUser.regionScope !== 'national') {
// //              if (actingUser.regionScope === 'province') {
// //                 const provs = actingUser.managedProvinces.map((p: string) => new RegExp(`^${p.trim()}$`, 'i'));
// //                 query.province = { $in: provs };
// //              } else if (actingUser.regionScope === 'regency') {
// //                 const regs = actingUser.managedRegencies.map((r: string) => new RegExp(r.trim(), 'i'));
// //                 query.city = { $in: regs };
// //              }
// //         }

// //         // --- QUERY FILTER ---
        
// //         // 1. Pencarian Teks (q)
// //         if (q && typeof q === 'string') {
// //             const searchRegex = { $regex: q, $options: 'i' };
// //             // Gabungkan dengan query izin di atas
// //             query = {
// //                 $and: [
// //                     query, 
// //                     {
// //                         $or: [
// //                             { name: searchRegex },
// //                             { email: searchRegex },
// //                             { 'memberData.nia': searchRegex },
// //                             { 'memberData.unit': searchRegex },
// //                             { city: searchRegex }
// //                         ]
// //                     }
// //                 ]
// //             };
// //         }

// //         // 2. Filter Dropdown (Jika ada request spesifik)
// //         if (role && role !== 'ALL') query.role = role;
        
// //         if (province && province !== 'ALL') {
// //             query.province = { $regex: `^${province.toString().trim()}$`, $options: 'i' };
// //         }
        
// //         if (city && city !== 'ALL') {
// //             query.city = { $regex: city.toString().trim(), $options: 'i' };
// //         }

// //         if (position && position !== 'ALL') {
// //             const posRegex = { $regex: position.toString(), $options: 'i' };
// //             if (query.$and) {
// //                 query.$and.push({ $or: [ { memberType: posRegex }, { 'memberData.position': posRegex } ] });
// //             } else {
// //                 query.$or = [ { memberType: posRegex }, { 'memberData.position': posRegex } ];
// //             }
// //         }

// //         // Limit data agar tidak berat (Fasilitator biasanya butuh semua list untuk dropdown)
// //         const limit = req.query.limit ? Number(req.query.limit) : 3000;

// //         const users = await User.find(query)
// //             .select('-password') 
// //             .sort({ name: 1 }) // Sort by name agar dropdown rapi
// //             .limit(limit) 
// //             .lean(); 

// //         res.json({ users });
// //     } catch (error: any) {
// //         console.error("Get All Users Error:", error);
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
// import { prisma } from '../lib/prisma';

// // --- SCHEMAS ---
// const patchMeSchema = z.object({
//   name: z.string().min(2).optional(),
//   avatarUrl: z.string().optional()
// });

// const changePasswordSchema = z.object({
//   currentPassword: z.string().min(6),
//   newPassword: z.string().min(6),
// });

// // --- HELPER: LOGIKA PENENTUAN JABATAN (PRIORITAS) ---
// const determineMemberType = (pgUser: any): string => {
//     // 1. Cek Tabel Kepengurusan (Prioritas Tertinggi)
//     // Sesuai SQL: WHERE kepengurusan.status = 1
//     const isPengurus = pgUser.pmi_kepengurusan?.some((k: any) => k.status === 1);
//     if (isPengurus) return 'Pengurus';

//     // 2. Cek Tabel Relasi Kategori (Staf, KSR, TSR, PMR)
//     if (pgUser.pmi_anggota_kategori_relasi && pgUser.pmi_anggota_kategori_relasi.length > 0) {
//         // Ambil nama kategori dari relasi
//         const kategoriNames = pgUser.pmi_anggota_kategori_relasi
//             .map((rel: any) => rel.pmi_anggota_kategori?.nama_kategori?.toUpperCase())
//             .filter((n: any) => n); // Hapus null/undefined

//         if (kategoriNames.includes('STAF') || kategoriNames.includes('PEGAWAI')) return 'Pegawai';
//         if (kategoriNames.includes('KSR')) return 'KSR';
//         if (kategoriNames.includes('TSR')) return 'TSR';
//         if (kategoriNames.includes('PMR')) return 'PMR';
//     }

//     // 3. Fallback ke ID Kategori (Jika data relasi kosong)
//     // Sesuai SQL Anda: 1=PMR, 2=KSR, 3=TSR
//     const idKat = Number(pgUser.id_kategori);
//     switch (idKat) {
//         case 1: return 'PMR';
//         case 2: return 'KSR';
//         case 3: return 'TSR';
//         case 4: return 'Pengurus';
//         case 5: return 'Pegawai';
//         default: return 'Umum'; // Atau Anggota Biasa
//     }
// };

// // --- HELPER: CEK AKSES WILAYAH ---
// const canManageUser = (admin: any, targetUser: any) => {
//     if (admin.role === 'SUPER_ADMIN') return true;
//     if (admin.regionScope === 'national') return true;

//     if (admin.regionScope === 'province') {
//         const targetProv = (targetUser.province || '').toUpperCase().trim();
//         const adminProvs = (admin.managedProvinces || []).map((p:string) => p.toUpperCase().trim());
//         return adminProvs.includes(targetProv);
//     }

//     if (admin.regionScope === 'regency') {
//         const targetCity = (targetUser.city || '').toUpperCase().trim();
//         const adminRegs = (admin.managedRegencies || []).map((r:string) => r.toUpperCase().trim());
//         return adminRegs.includes(targetCity);
//     }

//     return false;
// };

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

// // 4. GET WORKSPACE
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

// // 5. ADMIN RESET PASSWORD
// export const adminResetPassword = async (req: any, res: Response) => {
//     try {
//         const { id } = req.params;
//         const actingUser = req.user;

//         // Cek apakah ID dari Postgres (Virtual User)
//         if (id.startsWith('pg_')) {
//              return res.status(400).json({ 
//                  error: 'User ini belum aktif di LMS. User harus login minimal sekali agar akunnya terbentuk di sini.' 
//              });
//         }

//         const targetUser = await User.findById(id);
//         if (!targetUser) return res.status(404).json({ error: 'User tidak ditemukan' });

//         if (!canManageUser(actingUser, targetUser)) {
//             return res.status(403).json({ error: 'Akses Ditolak: User ini berada di luar wilayah wewenang Anda.' });
//         }

//         const DEFAULT_PASS = '123456'; 
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(DEFAULT_PASS, salt);

//         targetUser.password = hashedPassword;
//         await targetUser.save();

//         res.json({ 
//             success: true,
//             message: `Password user ${targetUser.name} direset ke: ${DEFAULT_PASS}` 
//         });
//     } catch (error: any) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // 6. GET LIST FASILITATOR
// export const getFacilitatorsList = async (req: Request, res: Response) => {
//   try {
//     const users = await User.find({
//         role: { $in: ['FACILITATOR', 'ADMIN', 'SUPER_ADMIN'] },
//         isBanned: false
//     })
//     .select('_id name email role avatarUrl') 
//     .sort({ name: 1 });

//     res.json({ users });
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // 7. GET DASHBOARD STATS
// export const getDashboardStats = async (req: any, res: Response) => {
//     try {
//         const actingUser = req.user;
//         let query: any = {};

//         if (actingUser.role === 'ADMIN') {
//             if (actingUser.regionScope === 'province') {
//                 query.province = { $in: actingUser.managedProvinces };
//             } else if (actingUser.regionScope === 'regency') {
//                 query.city = { $in: actingUser.managedRegencies };
//             }
//         }

//         const totalUsers = await User.countDocuments(query);
//         const totalAdmins = await User.countDocuments({ ...query, role: { $in: ['ADMIN', 'SUPER_ADMIN'] } });
//         const pendingVerify = await User.countDocuments({ ...query, isVerified: false });

//         res.json({ success: true, totalUsers, totalAdmins, pendingVerify });
//     } catch (error: any) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // =========================================================================
// // 8. [UPDATE FINAL] ADMIN: GET ALL USERS (HYBRID SEARCH - DEEP RELATION)
// // =========================================================================
// export const getAllUsers = async (req: any, res: Response) => {
//     try {
//         const { q, role, province, city, position } = req.query; 
//         const actingUser = req.user; 

//         // --- 1. BUILD MONGO QUERY ---
//         let query: any = {};

//         if (actingUser.role === 'FACILITATOR') {
//              query.role = { $in: ['FACILITATOR', 'ADMIN', 'SUPER_ADMIN'] };
//         } 
//         else if (actingUser.role === 'ADMIN' && actingUser.regionScope !== 'national') {
//              if (actingUser.regionScope === 'province') {
//                 const provs = actingUser.managedProvinces.map((p: string) => new RegExp(`^${p.trim()}$`, 'i'));
//                 query.province = { $in: provs };
//              } else if (actingUser.regionScope === 'regency') {
//                 const regs = actingUser.managedRegencies.map((r: string) => new RegExp(r.trim(), 'i'));
//                 query.city = { $in: regs };
//              }
//         }

//         if (q && typeof q === 'string') {
//             const searchRegex = { $regex: q, $options: 'i' };
//             query = {
//                 $and: [
//                     query, 
//                     {
//                         $or: [
//                             { name: searchRegex },
//                             { email: searchRegex },
//                             { 'memberData.nia': searchRegex },
//                             { 'memberData.unit': searchRegex },
//                             { city: searchRegex }
//                         ]
//                     }
//                 ]
//             };
//         }

//         if (role && role !== 'ALL') query.role = role;
//         if (province && province !== 'ALL') query.province = { $regex: `^${province.toString().trim()}$`, $options: 'i' };
//         if (city && city !== 'ALL') query.city = { $regex: city.toString().trim(), $options: 'i' };
        
//         if (position && position !== 'ALL') {
//             const posRegex = { $regex: position.toString(), $options: 'i' };
//             if (query.$and) {
//                 query.$and.push({ $or: [ { memberType: posRegex }, { 'memberData.position': posRegex } ] });
//             } else {
//                 query.$or = [ { memberType: posRegex }, { 'memberData.position': posRegex } ];
//             }
//         }

//         const limit = req.query.limit ? Number(req.query.limit) : 50; 
        
//         const mongoUsers = await User.find(query)
//             .select('-password') 
//             .sort({ name: 1 }) 
//             .limit(limit) 
//             .lean(); 

//         // --- 3. HYBRID SEARCH KE POSTGRES (PUSAT) ---
//         let combinedUsers: any[] = [...mongoUsers];

//         if (q && typeof q === 'string' && q.length > 2) {
//             console.log(`🔍 Searching Postgres for: ${q}`);
            
//             try {
//                 // Cari di tabel pmi_anggota
//                 const pgResults = await prisma.pmi_anggota.findMany({
//                     where: {
//                         OR: [
//                             { nama: { contains: q, mode: 'insensitive' } },
//                             { email: { contains: q, mode: 'insensitive' } },
//                             { kode_anggota: { contains: q } }, 
//                             { no_identitas: { contains: q } }  
//                         ]
//                     },
//                     take: 10, 
//                     include: {
//                         provinsi_pmi_anggota_domisili_id_provinsiToprovinsi: true,
//                         kabupaten_pmi_anggota_domisili_id_kabupatenTokabupaten: true,
                        
//                         // [FIX] INCLUDE RELASI JABATAN (KSR/TSR/STAF)
//                         pmi_anggota_kategori_relasi: {
//                             include: {
//                                 pmi_anggota_kategori: true
//                             }
//                         },
                        
//                         // [FIX] INCLUDE RELASI PENGURUS
//                         pmi_kepengurusan: {
//                             where: { status: 1 } // Hanya yang aktif
//                         }
//                     }
//                 });

//                 const existingEmails = new Set(mongoUsers.map((u: any) => u.email));

//                 const pgMapped = pgResults
//                     .filter((p: any) => p.email && !existingEmails.has(p.email)) 
//                     .map((p: any) => ({
//                         _id: `pg_${p.id}`, 
//                         id: `pg_${p.id}`,
//                         name: p.nama,
//                         email: p.email,
//                         role: 'BELUM_AKTIF', 
//                         avatarUrl: p.no_identitas ? `https://mis.pmi.or.id/uploads/pmi/anggota/${p.no_identitas}.jpg` : undefined,
//                         province: p.provinsi_pmi_anggota_domisili_id_provinsiToprovinsi?.nama_provinsi || '',
//                         city: p.kabupaten_pmi_anggota_domisili_id_kabupatenTokabupaten?.nama_kabupaten || '',
                        
//                         // [FIX] LOGIKA PENENTUAN JABATAN AKURAT
//                         memberType: determineMemberType(p), 
                        
//                         memberData: {
//                             nia: p.kode_anggota,
//                             unit: 'PMI Pusat',
//                             source: 'POSTGRES_SEARCH'
//                         },
//                         isVirtual: true,
//                         permissions: [],
//                         isBanned: false,
//                         isVerified: false
//                     }));

//                 combinedUsers = [...mongoUsers, ...pgMapped];

//             } catch (pgError) {
//                 console.error("PG Search Error:", pgError);
//             }
//         }

//         res.json({ users: combinedUsers });
//     } catch (error: any) {
//         console.error("Get All Users Error:", error);
//         res.status(500).json({ error: error.message });
//     }
// };

// // 9. GET USER DETAILS BY ID (SUPPORT HYBRID ID)
// export const getUserDetailsAdmin = async (req: any, res: Response) => {
//     try {
//         const { id } = req.params;

//         // --- KASUS A: ID DARI POSTGRES (Virtual User) ---
//         if (id.startsWith('pg_')) {
//             const realId = parseInt(id.replace('pg_', ''));

//             const pgData = await prisma.pmi_anggota.findUnique({
//                 where: { id: realId },
//                 include: {
//                     provinsi_pmi_anggota_domisili_id_provinsiToprovinsi: true,
//                     kabupaten_pmi_anggota_domisili_id_kabupatenTokabupaten: true,
//                     // [FIX] INCLUDE DEEP RELATION DI DETAIL JUGA
//                     pmi_anggota_kategori_relasi: {
//                         include: { pmi_anggota_kategori: true }
//                     },
//                     pmi_kepengurusan: {
//                         where: { status: 1 }
//                     }
//                 }
//             });

//             if (!pgData) {
//                 return res.status(404).json({ error: 'Data Anggota Pusat tidak ditemukan.' });
//             }

//             const virtualUser = {
//                 _id: id, 
//                 id: id,
//                 name: pgData.nama,
//                 email: pgData.email,
//                 role: 'BELUM_AKTIF', 
//                 avatarUrl: pgData.no_identitas ? `https://mis.pmi.or.id/uploads/pmi/anggota/${pgData.no_identitas}.jpg` : undefined,
                
//                 province: pgData.provinsi_pmi_anggota_domisili_id_provinsiToprovinsi?.nama_provinsi || '',
//                 city: pgData.kabupaten_pmi_anggota_domisili_id_kabupatenTokabupaten?.nama_kabupaten || '',
                
//                 // [FIX] LOGIKA PENENTUAN JABATAN AKURAT
//                 memberType: determineMemberType(pgData),
                
//                 isBanned: false,
//                 permissions: [], 
//                 memberData: {
//                     nia: pgData.kode_anggota,
//                     unit: 'PMI Pusat (Belum Login)',
//                     no_identitas: pgData.no_identitas,
//                     source: 'POSTGRES_VIEW_ONLY'
//                 },
//                 isVirtual: true 
//             };

//             return res.json({ success: true, user: virtualUser });
//         }

//         // --- KASUS B: ID DARI MONGODB (User Biasa) ---
//         if (!id.match(/^[0-9a-fA-F]{24}$/)) {
//              return res.status(400).json({ error: 'Format ID User tidak valid.' });
//         }

//         const user = await User.findById(id).select('-password');
//         if (!user) return res.status(404).json({ error: 'User tidak ditemukan di LMS.' });

//         res.json({ success: true, user });

//     } catch (error: any) {
//         console.error("Get User Detail Error:", error);
//         res.status(500).json({ error: error.message });
//     }
// };



import { Request, Response } from 'express';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';
import { Progress } from '../models/Progress';
import { Certificate } from '../models/Certificate';
import { AuthedRequest } from '../middleware/auth';
import { prisma } from '../lib/prisma';

// --- SCHEMAS ---
const patchMeSchema = z.object({
  name: z.string().min(2).optional(),
  avatarUrl: z.string().optional()
});

const changePasswordSchema = z.object({
  currentPassword: z.string().min(6),
  newPassword: z.string().min(6),
});

// --- HELPER: LOGIKA PENENTUAN JABATAN (PRIORITAS TINGGI) ---
const determineMemberType = (pgUser: any): string => {
    // 1. Cek Pengurus Aktif (Prioritas Tertinggi)
    if (pgUser.pmi_kepengurusan && pgUser.pmi_kepengurusan.length > 0) {
        const isPengurus = pgUser.pmi_kepengurusan.some((k: any) => k.status === 1);
        if (isPengurus) return 'Pengurus';
    }

    // 2. Cek Relasi Kategori (KSR/TSR/STAF/PMR)
    // Data di tabel relasi lebih akurat daripada id_kategori di tabel utama
    if (pgUser.pmi_anggota_kategori_relasi && pgUser.pmi_anggota_kategori_relasi.length > 0) {
        const kategoriNames = pgUser.pmi_anggota_kategori_relasi
            .map((rel: any) => rel.pmi_anggota_kategori?.nama_kategori?.toUpperCase())
            .filter((n: any) => n);

        if (kategoriNames.some((n:string) => n.includes('STAF') || n.includes('PEGAWAI'))) return 'Pegawai';
        if (kategoriNames.some((n:string) => n.includes('KSR'))) return 'KSR';
        if (kategoriNames.some((n:string) => n.includes('TSR'))) return 'TSR';
        if (kategoriNames.some((n:string) => n.includes('PMR'))) return 'PMR';
    }

    // 3. Fallback ke ID Kategori (Jika data relasi kosong)
    const idKat = Number(pgUser.id_kategori);
    switch (idKat) {
        case 1: return 'PMR';
        case 2: return 'KSR';
        case 3: return 'TSR';
        case 4: return 'Pengurus';
        case 5: return 'Pegawai';
        default: return 'Anggota';
    }
};

// --- HELPER: MAPPING GENDER ---
const mapGender = (code: string | null | undefined): string => {
    if (!code) return '-';
    const c = code.toString().trim().toUpperCase();
    if (c === '1' || c === 'L' || c === 'LAKI-LAKI') return 'Laki-laki';
    if (c === '2' || c === 'P' || c === 'PEREMPUAN') return 'Perempuan';
    return c; 
};

// --- HELPER: CEK AKSES WILAYAH ---
const canManageUser = (admin: any, targetUser: any) => {
    if (admin.role === 'SUPER_ADMIN') return true;
    if (admin.regionScope === 'national') return true;

    if (admin.regionScope === 'province') {
        const targetProv = (targetUser.province || '').toUpperCase().trim();
        const adminProvs = (admin.managedProvinces || []).map((p:string) => p.toUpperCase().trim());
        return adminProvs.includes(targetProv);
    }

    if (admin.regionScope === 'regency') {
        const targetCity = (targetUser.city || '').toUpperCase().trim();
        const adminRegs = (admin.managedRegencies || []).map((r:string) => r.toUpperCase().trim());
        return adminRegs.includes(targetCity);
    }

    return false;
};

// --- CONTROLLERS ---

export const getMe = async (req: AuthedRequest, res: Response) => {
  try {
    const user = await User.findById(req.user!.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });
    res.json({ user });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

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

export const adminResetPassword = async (req: any, res: Response) => {
    try {
        const { id } = req.params;
        
        if (id.startsWith('pg_')) {
             return res.status(400).json({ 
                 error: 'User ini belum aktif di LMS. User harus login minimal sekali agar akunnya terbentuk di sini.' 
             });
        }

        const targetUser = await User.findById(id);
        if (!targetUser) return res.status(404).json({ error: 'User tidak ditemukan' });

        if (!canManageUser(req.user, targetUser)) {
            return res.status(403).json({ error: 'Akses Ditolak: User ini berada di luar wilayah wewenang Anda.' });
        }

        const DEFAULT_PASS = '123456'; 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(DEFAULT_PASS, salt);

        targetUser.password = hashedPassword;
        await targetUser.save();

        res.json({ 
            success: true,
            message: `Password user ${targetUser.name} direset ke: ${DEFAULT_PASS}` 
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

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

export const getDashboardStats = async (req: any, res: Response) => {
    try {
        const actingUser = req.user;
        let query: any = {};

        if (actingUser.role === 'ADMIN') {
            if (actingUser.regionScope === 'province') {
                query.province = { $in: actingUser.managedProvinces };
            } else if (actingUser.regionScope === 'regency') {
                query.city = { $in: actingUser.managedRegencies };
            }
        }

        const totalUsers = await User.countDocuments(query);
        const totalAdmins = await User.countDocuments({ ...query, role: { $in: ['ADMIN', 'SUPER_ADMIN'] } });
        const pendingVerify = await User.countDocuments({ ...query, isVerified: false });

        res.json({ success: true, totalUsers, totalAdmins, pendingVerify });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// =========================================================================
// 8. HYBRID SEARCH (Fix Jabatan di Tabel List)
// =========================================================================
export const getAllUsers = async (req: any, res: Response) => {
    try {
        const { q, role, province, city, position } = req.query; 
        const actingUser = req.user; 

        let query: any = {};

        // Filter Role berdasarkan siapa yang login
        if (actingUser.role === 'FACILITATOR') {
             query.role = { $in: ['FACILITATOR', 'ADMIN', 'SUPER_ADMIN'] };
        } 
        else if (actingUser.role === 'ADMIN' && actingUser.regionScope !== 'national') {
             if (actingUser.regionScope === 'province') {
                const provs = actingUser.managedProvinces.map((p: string) => new RegExp(`^${p.trim()}$`, 'i'));
                query.province = { $in: provs };
             } else if (actingUser.regionScope === 'regency') {
                const regs = actingUser.managedRegencies.map((r: string) => new RegExp(r.trim(), 'i'));
                query.city = { $in: regs };
             }
        }

        if (q && typeof q === 'string') {
            const searchRegex = { $regex: q, $options: 'i' };
            query = {
                $and: [
                    query, 
                    {
                        $or: [
                            { name: searchRegex },
                            { email: searchRegex },
                            { 'memberData.nia': searchRegex },
                            { 'memberData.unit': searchRegex },
                            { city: searchRegex }
                        ]
                    }
                ]
            };
        }

        if (role && role !== 'ALL') query.role = role;
        if (province && province !== 'ALL') query.province = { $regex: `^${province.toString().trim()}$`, $options: 'i' };
        if (city && city !== 'ALL') query.city = { $regex: city.toString().trim(), $options: 'i' };
        
        if (position && position !== 'ALL') {
            const posRegex = { $regex: position.toString(), $options: 'i' };
            if (query.$and) {
                query.$and.push({ $or: [ { memberType: posRegex }, { 'memberData.position': posRegex } ] });
            } else {
                query.$or = [ { memberType: posRegex }, { 'memberData.position': posRegex } ];
            }
        }

        const limit = req.query.limit ? Number(req.query.limit) : 50; 
        
        const mongoUsers = await User.find(query)
            .select('-password') 
            .sort({ name: 1 }) 
            .limit(limit) 
            .lean(); 

        // --- HYBRID SEARCH KE POSTGRES ---
        let combinedUsers: any[] = [...mongoUsers];

        if (q && typeof q === 'string' && q.length > 2) {
            console.log(`🔍 Searching Postgres for: ${q}`);
            try {
                const pgResults = await prisma.pmi_anggota.findMany({
                    where: {
                        OR: [
                            { nama: { contains: q, mode: 'insensitive' } },
                            { email: { contains: q, mode: 'insensitive' } },
                            { kode_anggota: { contains: q } }, 
                            { no_identitas: { contains: q } }  
                        ]
                    },
                    take: 10, 
                    include: {
                        provinsi_pmi_anggota_domisili_id_provinsiToprovinsi: true,
                        kabupaten_pmi_anggota_domisili_id_kabupatenTokabupaten: true,
                        // [FIX] Include relasi agar deteksi jabatan di tabel akurat
                        pmi_anggota_kategori_relasi: { include: { pmi_anggota_kategori: true } },
                        pmi_kepengurusan: { where: { status: 1 } }
                    }
                });

                const existingEmails = new Set(mongoUsers.map((u: any) => u.email));

                const pgMapped = pgResults
                    .filter((p: any) => p.email && !existingEmails.has(p.email)) 
                    .map((p: any) => ({
                        _id: `pg_${p.id}`, 
                        id: `pg_${p.id}`,
                        name: p.nama,
                        email: p.email,
                        role: 'BELUM_AKTIF', 
                        avatarUrl: p.no_identitas ? `https://mis.pmi.or.id/uploads/pmi/anggota/${p.no_identitas}.jpg` : undefined,
                        province: p.provinsi_pmi_anggota_domisili_id_provinsiToprovinsi?.nama_provinsi || '',
                        city: p.kabupaten_pmi_anggota_domisili_id_kabupatenTokabupaten?.nama_kabupaten || '',
                        
                        // [FIX] Gunakan logic penentuan jabatan yang pintar
                        memberType: determineMemberType(p), 
                        
                        memberData: {
                            nia: p.kode_anggota,
                            unit: 'PMI Pusat',
                            source: 'POSTGRES_SEARCH'
                        },
                        isVirtual: true,
                        permissions: [],
                        isBanned: false,
                        isVerified: false
                    }));

                combinedUsers = [...mongoUsers, ...pgMapped];
            } catch (pgError) {
                console.error("PG Search Error:", pgError);
            }
        }

        res.json({ users: combinedUsers });
    } catch (error: any) {
        console.error("Get All Users Error:", error);
        res.status(500).json({ error: error.message });
    }
};

// 9. [UPDATE FINAL] GET USER DETAILS BY ID
export const getUserDetailsAdmin = async (req: any, res: Response) => {
    try {
        const { id } = req.params;

        // --- KASUS A: ID DARI POSTGRES (Virtual User) ---
        if (id.startsWith('pg_')) {
            const realId = parseInt(id.replace('pg_', ''));

            const pgData = await prisma.pmi_anggota.findUnique({
                where: { id: realId },
                include: {
                    provinsi_pmi_anggota_domisili_id_provinsiToprovinsi: true,
                    kabupaten_pmi_anggota_domisili_id_kabupatenTokabupaten: true,
                    // [FIX] Include Riwayat untuk nama Unit & Relasi Jabatan
                    pmi_anggota_riwayat: {
                        orderBy: { date_awal: 'desc' }, 
                        take: 1,
                        include: { pmi_unit: true }
                    },
                    pmi_anggota_kategori_relasi: { include: { pmi_anggota_kategori: true } },
                    pmi_kepengurusan: { where: { status: 1 } }
                }
            });

            if (!pgData) {
                return res.status(404).json({ error: 'Data Anggota Pusat tidak ditemukan.' });
            }

            // [FIX] Logic Nama Unit Lengkap
            const unitName = pgData.pmi_anggota_riwayat[0]?.pmi_unit?.nama || 'PMI Pusat';
            const kabName = pgData.kabupaten_pmi_anggota_domisili_id_kabupatenTokabupaten?.nama_kabupaten || '';
            const provName = pgData.provinsi_pmi_anggota_domisili_id_provinsiToprovinsi?.nama_provinsi || '';
            const fullUnitLocation = `${unitName}, ${kabName}, ${provName}`;

            // [FIX] Logic Jabatan Pintar
            const finalMemberType = determineMemberType(pgData);

            const virtualUser = {
                _id: id, 
                id: id,
                name: pgData.nama,
                email: pgData.email,
                role: 'BELUM_AKTIF', 
                avatarUrl: pgData.no_identitas ? `https://mis.pmi.or.id/uploads/pmi/anggota/${pgData.no_identitas}.jpg` : undefined,
                province: provName,
                city: kabName,
                memberType: finalMemberType, // KSR/PMR/dll
                isBanned: false,
                permissions: [], 
                
                // [FIX] Data Lengkap Biodata
                memberData: {
                    nia: pgData.kode_anggota,
                    unit: fullUnitLocation, 
                    nik: pgData.no_identitas,
                    no_identitas: pgData.no_identitas,
                    no_hp: pgData.no_hp || '-',
                    tempat_lahir: pgData.tempat_lahir || '-',
                    tanggal_lahir: pgData.tanggal_lahir,
                    kelamin: mapGender(pgData.kelamin),
                    alamat: pgData.domisili_alamat || '-',
                    source: 'POSTGRES_VIEW_ONLY'
                },
                isVirtual: true 
            };

            return res.json({ success: true, user: virtualUser });
        }

        // --- KASUS B: ID DARI MONGODB (User Biasa) ---
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
             return res.status(400).json({ error: 'Format ID User tidak valid.' });
        }

        const user = await User.findById(id).select('-password');
        if (!user) return res.status(404).json({ error: 'User tidak ditemukan di LMS.' });

        res.json({ success: true, user });

    } catch (error: any) {
        console.error("Get User Detail Error:", error);
        res.status(500).json({ error: error.message });
    }
};
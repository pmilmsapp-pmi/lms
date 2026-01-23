// // // // // import { Request, Response } from 'express';
// // // // // import { User } from '../models/User'; // Sesuaikan huruf besar/kecil nama file model Anda
// // // // // import { Progress } from '../models/Progress';
// // // // // import { Course } from '../models/Course';

// // // // // // --- 1. GET PUBLIC USER DETAIL (Untuk Header Chat) ---
// // // // // export const getUserDetail = async (req: Request, res: Response) => {
// // // // //   try {
// // // // //     // Ambil ID dari parameter URL
// // // // //     const { id } = req.params;
    
// // // // //     // Cari user, hanya ambil field yang aman (nama, role, foto)
// // // // //     const user = await User.findById(id).select('name role avatarUrl email');
    
// // // // //     if (!user) {
// // // // //       return res.status(404).json({ error: 'User not found' });
// // // // //     }

// // // // //     res.json(user);
// // // // //   } catch (error: any) {
// // // // //     res.status(500).json({ error: error.message });
// // // // //   }
// // // // // };

// // // // // // --- 2. GET MY PROFILE (Untuk Halaman Profil) ---
// // // // // export const getMe = async (req: any, res: Response) => {
// // // // //   try {
// // // // //     const userId = req.user.id;

// // // // //     // A. Ambil Data User
// // // // //     const user = await User.findById(userId).select('-password');
// // // // //     if (!user) return res.status(404).json({ error: 'User not found' });

// // // // //     // B. Ambil Progress (Sejarah Pelatihan)
// // // // //     // Kita cari semua progress milik user ini dan populate data kursusnya
// // // // //     const progresses = await Progress.find({ userId }).populate('courseId', 'title thumbnailUrl');

// // // // //     // Format Data History
// // // // //     const history = progresses.map((p: any) => {
// // // // //        // Hitung persentase kelulusan simpel (jumlah lesson selesai / total lesson di kursus)
// // // // //        // Catatan: Ini estimasi kasar jika tidak mau query berat ke Course. 
// // // // //        // Idealnya field 'progressPercent' disimpan di model Progress.
// // // // //        const isCompleted = p.completed; 
// // // // //        return {
// // // // //            _id: p._id,
// // // // //            courseId: p.courseId, // Berisi title & thumbnail
// // // // //            completed: isCompleted,
// // // // //            progress: isCompleted ? 100 : (p.completedLessons.length > 0 ? 50 : 0) // Mockup progress
// // // // //        };
// // // // //     });

// // // // //     // C. Ambil Sertifikat (Mockup logic: jika course completed = dapat sertifikat)
// // // // //     // Nanti Anda bisa buat Model Certificate terpisah jika butuh nomor seri, tgl terbit, dll.
// // // // //     const certificates = progresses
// // // // //         .filter((p: any) => p.completed) // Hanya yang selesai
// // // // //         .map((p: any, idx: number) => ({
// // // // //             _id: `cert-${p._id}`,
// // // // //             course: p.courseId,
// // // // //             certificateNumber: `PMI-${new Date().getFullYear()}-${idx + 1000}`,
// // // // //             issueDate: p.updatedAt,
// // // // //             status: 'issued'
// // // // //         }));

// // // // //     res.json({
// // // // //         user,
// // // // //         history,
// // // // //         certificates
// // // // //     });

// // // // //   } catch (error: any) {
// // // // //     console.error("Get Profile Error:", error);
// // // // //     res.status(500).json({ error: error.message });
// // // // //   }
// // // // // };

// // // // // // --- 3. UPDATE PROFILE ---
// // // // // export const updateProfile = async (req: any, res: Response) => {
// // // // //   try {
// // // // //     const userId = req.user.id;
// // // // //     const { name, avatarUrl } = req.body;

// // // // //     const user = await User.findById(userId);
// // // // //     if (!user) return res.status(404).json({ error: 'User not found' });

// // // // //     if (name) user.name = name;
// // // // //     if (avatarUrl) user.avatarUrl = avatarUrl;

// // // // //     await user.save();

// // // // //     res.json({ message: 'Profile updated', user });
// // // // //   } catch (error: any) {
// // // // //     res.status(500).json({ error: error.message });
// // // // //   }
// // // // // };



// // // // import { Request, Response } from 'express';
// // // // import { User } from '../models/User'; 
// // // // import { Progress } from '../models/Progress';
// // // // import { Course } from '../models/Course';

// // // // // --- 1. GET PUBLIC USER DETAIL (Untuk Header Chat & Search PIC) ---
// // // // export const getUserDetail = async (req: Request, res: Response) => {
// // // //   try {
// // // //     // Ambil ID dari parameter URL
// // // //     const { id } = req.params;
    
// // // //     // [UPDATED] Pastikan role & avatarUrl terambil untuk UI PIC
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

// // // // 5. [ADMIN ACTION] FORCE RESET PASSWORD
// // // export const adminResetPassword = async (req: Request, res: Response) => {
// // //     try {
// // //         const { id } = req.params;
// // //         const DEFAULT_PASS = '123456'; 

// // //         const salt = await bcrypt.genSalt(10);
// // //         const hashedPassword = await bcrypt.hash(DEFAULT_PASS, salt);

// // //         const user = await User.findByIdAndUpdate(
// // //             id, 
// // //             { password: hashedPassword },
// // //             { new: true }
// // //         );

// // //         if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });

// // //         res.json({ 
// // //             success: true,
// // //             message: `Password user ${user.name} direset ke: ${DEFAULT_PASS}` 
// // //         });
// // //     } catch (error: any) {
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

// // // 6. [BARU] GET LIST FASILITATOR (Safe for Dropdowns)
// // // Ini endpoint ringan untuk mengambil daftar orang yang bisa dijadikan fasilitator
// // export const getFacilitatorsList = async (req: Request, res: Response) => {
// //   try {
// //     // Cari user yang rolenya MEMUNGKINKAN jadi pengajar
// //     const users = await User.find({
// //         role: { $in: ['FACILITATOR', 'ADMIN', 'SUPER_ADMIN'] },
// //         isBanned: false
// //     })
// //     .select('_id name email role avatarUrl') // Hanya ambil data umum
// //     .sort({ name: 1 });

// //     res.json({ users });
// //   } catch (error: any) {
// //     res.status(500).json({ error: error.message });
// //   }
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

// // 6. GET LIST FASILITATOR (Safe for Dropdowns)
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

// // =========================================================================
// // 7. [BARU] GET DASHBOARD STATS (Total User yang Benar)
// // =========================================================================
// export const getDashboardStats = async (req: Request, res: Response) => {
//     try {
//         // countDocuments menghitung SEMUA data tanpa terpengaruh limit
//         const totalUsers = await User.countDocuments();
        
//         // Contoh stats lain (opsional)
//         const totalAdmins = await User.countDocuments({ role: { $in: ['ADMIN', 'SUPER_ADMIN'] } });
//         const pendingVerify = await User.countDocuments({ isVerified: false });

//         res.json({ 
//             success: true,
//             totalUsers, 
//             totalAdmins,
//             pendingVerify
//         });
//     } catch (error: any) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // =========================================================================
// // 8. [UPDATE] ADMIN: GET ALL USERS (FILTER DROPDOWN + SMART SEARCH)
// // =========================================================================
// export const getAllUsers = async (req: Request, res: Response) => {
//     try {
//         // Ambil parameter dari frontend
//         const { q, role, province, city, position } = req.query; 
        
//         let query: any = {};

//         // 1. Filter Pencarian Teks (q)
//         if (q && typeof q === 'string') {
//             const searchRegex = { $regex: q, $options: 'i' };
//             query.$or = [
//                 { name: searchRegex },
//                 { email: searchRegex },
//                 { 'memberData.nia': searchRegex },
//                 { 'memberData.unit': searchRegex },
//             ];
//             // Jika user mengetik nama kota di search box, tambahkan ke OR
//             if (!city) query.$or.push({ city: searchRegex });
//         }

//         // 2. Filter Dropdown (Strict Match)
//         if (role && role !== 'ALL') query.role = role;
        
//         if (province && province !== 'ALL') {
//             // Gunakan regex agar pencarian "Jawa Timur" cocok dengan " JAWA TIMUR "
//             query.province = { $regex: `^${province.toString().trim()}$`, $options: 'i' };
//         }
        
//         if (city && city !== 'ALL') {
//             // Pencarian kota lebih fleksibel karena input manual user bisa beda dikit
//             query.city = { $regex: city.toString().trim(), $options: 'i' };
//         }

//         if (position && position !== 'ALL') {
//             // Cari di memberType atau memberData.position
//             query.$or = query.$or || [];
//             // Reset $or jika sebelumnya dipakai search box, kita gabung dengan $and di logika kompleks, 
//             // tapi untuk simpelnya kita gunakan regex di field terkait saja:
//             const posRegex = { $regex: position.toString(), $options: 'i' };
            
//             // Karena struktur OR di atas, kita buat query terpisah untuk posisi jika search box kosong
//             // Jika search box ada, ini agak tricky, jadi kita gunakan $and implisit Mongoose
//             if(query.$or && query.$or.length > 0) {
//                  // Jika ada search text, filter posisi harus match juga
//                  query = {
//                      $and: [
//                          query, // Query search text
//                          { 
//                              $or: [ 
//                                  { memberType: posRegex }, 
//                                  { 'memberData.position': posRegex } 
//                              ] 
//                          }
//                      ]
//                  }
//             } else {
//                 // Jika tidak ada search text
//                 query.$or = [
//                     { memberType: posRegex },
//                     { 'memberData.position': posRegex }
//                 ];
//             }
//         }

//         // Strategi Limit
//         // Jika ada filter apapun (search / dropdown), naikkan limit
//         const hasFilter = q || (role && role !== 'ALL') || (province && province !== 'ALL') || (city && city !== 'ALL') || (position && position !== 'ALL');
//         const limit = hasFilter ? 3000 : 50; 

//         const users = await User.find(query)
//             .select('-password') 
//             .sort({ createdAt: -1 }) 
//             .limit(limit) 
//             .lean(); 

//         res.json({ users });
//     } catch (error: any) {
//         console.error("Get All Users Error:", error);
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

// --- SCHEMAS ---
const patchMeSchema = z.object({
  name: z.string().min(2).optional(),
  avatarUrl: z.string().optional()
});

const changePasswordSchema = z.object({
  currentPassword: z.string().min(6),
  newPassword: z.string().min(6),
});

// --- HELPER: CEK AKSES WILAYAH ---
// Fungsi ini memastikan Admin Jatim tidak bisa edit user Jabar
const canManageUser = (admin: any, targetUser: any) => {
    if (admin.role === 'SUPER_ADMIN') return true;
    if (admin.regionScope === 'national') return true;

    // Cek Provinsi
    if (admin.regionScope === 'province') {
        // Normalisasi string agar case insensitive (JAWA TIMUR == Jawa Timur)
        const targetProv = (targetUser.province || '').toUpperCase().trim();
        const adminProvs = (admin.managedProvinces || []).map((p:string) => p.toUpperCase().trim());
        
        return adminProvs.includes(targetProv);
    }

    // Cek Kabupaten/Kota
    if (admin.regionScope === 'regency') {
        const targetCity = (targetUser.city || '').toUpperCase().trim();
        const adminRegs = (admin.managedRegencies || []).map((r:string) => r.toUpperCase().trim());
        
        return adminRegs.includes(targetCity);
    }

    return false;
};

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

// 5. [ADMIN ACTION] FORCE RESET PASSWORD (PROTECTED SCOPE)
export const adminResetPassword = async (req: any, res: Response) => {
    try {
        const { id } = req.params;
        const actingUser = req.user; // Admin yang melakukan aksi

        // Ambil data user target dulu untuk cek wilayah
        const targetUser = await User.findById(id);
        if (!targetUser) return res.status(404).json({ error: 'User tidak ditemukan' });

        // [SCOPE GUARD] Cek apakah Admin boleh reset password user ini
        if (!canManageUser(actingUser, targetUser)) {
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

// 6. GET LIST FASILITATOR (Safe for Dropdowns)
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
// 7. GET DASHBOARD STATS (Total dengan Filter Wilayah)
// =========================================================================
export const getDashboardStats = async (req: any, res: Response) => {
    try {
        const actingUser = req.user;
        let query: any = {};

        // [SCOPE GUARD] Filter Stats hanya untuk wilayah admin
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
// 8. [UPDATE FINAL] ADMIN: GET ALL USERS (SCOPE PROTECTED)
// =========================================================================
export const getAllUsers = async (req: any, res: Response) => {
    try {
        const { q, role, province, city, position } = req.query; 
        const actingUser = req.user; // Admin yang login

        let query: any = {};

        // ------------------------------------------------------------------
        // [SCOPE GUARD] FILTER OTOMATIS BERDASARKAN WILAYAH ADMIN
        // ------------------------------------------------------------------
        if (actingUser.role !== 'SUPER_ADMIN' && actingUser.regionScope !== 'national') {
            
            if (actingUser.regionScope === 'province') {
                // Admin Provinsi hanya lihat user di provinsinya
                // Gunakan Regex agar "Jawa Timur" match dengan "JAWA TIMUR"
                const provs = actingUser.managedProvinces.map((p: string) => new RegExp(`^${p.trim()}$`, 'i'));
                query.province = { $in: provs };
            } 
            
            else if (actingUser.regionScope === 'regency') {
                // Admin Kota hanya lihat user di kotanya
                const regs = actingUser.managedRegencies.map((r: string) => new RegExp(r.trim(), 'i'));
                query.city = { $in: regs };
            }
        }
        // ------------------------------------------------------------------

        // 1. Filter Pencarian Teks (q)
        if (q && typeof q === 'string') {
            const searchRegex = { $regex: q, $options: 'i' };
            
            // Bungkus dalam $and agar tidak menimpa filter wilayah di atas
            query = {
                $and: [
                    query, // Filter wilayah yang sudah diset di atas
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

        // 2. Filter Dropdown (Strict Match)
        if (role && role !== 'ALL') query.role = role;
        
        // Filter Province Manual (Hanya boleh memilih yg ada di wewenangnya)
        if (province && province !== 'ALL') {
            query.province = { $regex: `^${province.toString().trim()}$`, $options: 'i' };
        }
        
        if (city && city !== 'ALL') {
            query.city = { $regex: city.toString().trim(), $options: 'i' };
        }

        if (position && position !== 'ALL') {
            const posRegex = { $regex: position.toString(), $options: 'i' };
            // Tambahkan logika posisi ke query yang ada
            if (query.$and) {
                query.$and.push({
                    $or: [ { memberType: posRegex }, { 'memberData.position': posRegex } ]
                });
            } else {
                query.$or = [ { memberType: posRegex }, { 'memberData.position': posRegex } ];
            }
        }

        // Strategi Limit
        const hasFilter = q || (role && role !== 'ALL') || (province && province !== 'ALL') || (city && city !== 'ALL') || (position && position !== 'ALL');
        const limit = hasFilter ? 3000 : 50; 

        const users = await User.find(query)
            .select('-password') 
            .sort({ createdAt: -1 }) 
            .limit(limit) 
            .lean(); 

        res.json({ users });
    } catch (error: any) {
        console.error("Get All Users Error:", error);
        res.status(500).json({ error: error.message });
    }
};
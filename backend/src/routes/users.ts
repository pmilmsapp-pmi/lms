
// // // // // import express from 'express';
// // // // // import { User } from '../models/User'; // Pastikan Model User diimport
// // // // // import { requireAuth, requireFacilitator } from '../middleware/auth'; 
// // // // // import { getUserDetail, getMe, updateProfile } from '../controllers/userController'; // Jika menggunakan controller terpisah

// // // // // // Jika tidak menggunakan controller terpisah dan logic ada di file ini, 
// // // // // // silakan ganti logic route di bawah dengan handler langsung.
// // // // // // Berikut adalah versi LENGKAP dengan handler inline jika controller belum ada:

// // // // // const router = express.Router();

// // // // // // 1. GET /api/users/me/detail -> Untuk halaman Profile (Data lengkap user sendiri)
// // // // // router.get('/me/detail', requireAuth, async (req: any, res) => {
// // // // //   try {
// // // // //     const user = await User.findById(req.user.id).select('-password');
// // // // //     if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });
    
// // // // //     // Kirim data lengkap
// // // // //     res.json({ user });
// // // // //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // });

// // // // // // 2. PATCH /api/users/profile -> Untuk update Nama/Avatar
// // // // // router.patch('/profile', requireAuth, async (req: any, res) => {
// // // // //   try {
// // // // //     const { name, avatarUrl } = req.body;
// // // // //     const user = await User.findById(req.user.id);
// // // // //     if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });

// // // // //     if (name) user.name = name;
// // // // //     if (avatarUrl) user.avatarUrl = avatarUrl;

// // // // //     await user.save();
// // // // //     // Return data user terbaru tanpa password
// // // // //     const updatedUser = await User.findById(req.user.id).select('-password');
// // // // //     res.json({ user: updatedUser });
// // // // //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // });

// // // // // // 3. GET ALL USERS (Admin Only - Untuk Manajemen User / Peserta)
// // // // // // Route ini harus ditaruh SEBELUM route dengan parameter :id
// // // // // router.get('/admin/all', requireAuth, requireFacilitator, async (req, res) => {
// // // // //   try {
// // // // //     const users = await User.find().select('-password').sort({ createdAt: -1 });
// // // // //     res.json({ users });
// // // // //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // });

// // // // // // 4. GET /api/users/:id/detail -> Untuk Header Chat (Info lawan bicara)
// // // // // // PENTING: Route dengan parameter :id DITARUH PALING BAWAH
// // // // // router.get('/:id/detail', requireAuth, async (req, res) => {
// // // // //   try {
// // // // //     const user = await User.findById(req.params.id).select('name email avatarUrl role isOnline lastSeen');
// // // // //     if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });
// // // // //     res.json(user);
// // // // //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // });

// // // // // export default router;
// // // // import express from 'express';
// // // // import { User } from '../models/User'; 
// // // // import { requireAuth, requireFacilitator } from '../middleware/auth'; 
// // // // // import { getUserDetail, getMe, updateProfile } from '../controllers/userController'; 

// // // // const router = express.Router();

// // // // // 1. GET /api/users/me/detail -> Untuk halaman Profile
// // // // router.get('/me/detail', requireAuth, async (req: any, res) => {
// // // //   try {
// // // //     const user = await User.findById(req.user.id).select('-password');
// // // //     if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });
// // // //     res.json({ user });
// // // //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // });

// // // // // 2. PATCH /api/users/profile -> Untuk update Nama/Avatar
// // // // router.patch('/profile', requireAuth, async (req: any, res) => {
// // // //   try {
// // // //     const { name, avatarUrl } = req.body;
// // // //     const user = await User.findById(req.user.id);
// // // //     if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });

// // // //     if (name) user.name = name;
// // // //     if (avatarUrl) user.avatarUrl = avatarUrl;

// // // //     await user.save();
// // // //     const updatedUser = await User.findById(req.user.id).select('-password');
// // // //     res.json({ user: updatedUser });
// // // //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // });

// // // // // 3. GET ALL USERS (Admin Only)
// // // // router.get('/admin/all', requireAuth, requireFacilitator, async (req, res) => {
// // // //   try {
// // // //     const users = await User.find().select('-password').sort({ createdAt: -1 });
// // // //     res.json({ users });
// // // //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // });

// // // // // ============================================================
// // // // // [BARU] 4. SEARCH USERS (Untuk Fitur Mention di Forum)
// // // // // ============================================================
// // // // router.get('/search', requireAuth, async (req: any, res) => {
// // // //   try {
// // // //     const { q } = req.query;
// // // //     if (!q || typeof q !== 'string') return res.json([]);

// // // //     // Cari user berdasarkan nama (case insensitive), limit 5 hasil
// // // //     const users = await User.find({
// // // //       name: { $regex: q, $options: 'i' }
// // // //     }).limit(5).select('name avatarUrl role');

// // // //     res.json(users);
// // // //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // });
// // // // // ============================================================

// // // // // 5. GET /api/users/:id/detail -> Info lawan bicara (Header Chat)
// // // // // PENTING: Route dengan parameter :id DITARUH PALING BAWAH
// // // // router.get('/:id/detail', requireAuth, async (req, res) => {
// // // //   try {
// // // //     const user = await User.findById(req.params.id).select('name email avatarUrl role isOnline lastSeen');
// // // //     if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });
// // // //     res.json(user);
// // // //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // });

// // // // export default router;
// // // import { Router } from 'express';
// // // import { z } from 'zod';
// // // import bcrypt from 'bcryptjs';
// // // import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth';
// // // import { User } from '../models/User';
// // // import { Progress } from '../models/Progress';     // Pastikan model ini ada
// // // import { Certificate } from '../models/Certificate'; // Pastikan model ini ada

// // // const router = Router();

// // // // --- ZOD SCHEMAS ---

// // // const patchMeSchema = z.object({
// // //   name: z.string().min(2).optional(),
// // //   avatarUrl: z.string().optional() // Menerima string URL hasil upload
// // // });

// // // const changePasswordSchema = z.object({
// // //   currentPassword: z.string().min(6),
// // //   newPassword: z.string().min(6),
// // // });

// // // // --- ROUTES ---

// // // /**
// // //  * 1. GET CURRENT USER (Basic)
// // //  * Endpoint: GET /api/users/me
// // //  */
// // // router.get('/me', requireAuth, async (req: AuthedRequest, res) => {
// // //   try {
// // //     const user = await User.findById(req.user!.id).select('-password');
// // //     if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });
// // //     res.json({ user });
// // //   } catch (err: any) {
// // //     res.status(500).json({ error: err.message });
// // //   }
// // // });

// // // /**
// // //  * 2. UPDATE PROFILE (Name & Avatar)
// // //  * Endpoint: PATCH /api/users/me
// // //  */
// // // router.patch('/me', requireAuth, async (req: AuthedRequest, res) => {
// // //   try {
// // //     // Validasi input
// // //     const data = patchMeSchema.parse(req.body);
    
// // //     // Update data di database
// // //     const user = await User.findByIdAndUpdate(
// // //       req.user!.id, 
// // //       { $set: data }, 
// // //       { new: true }
// // //     ).select('-password');

// // //     if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });

// // //     res.json({ user });
// // //   } catch (err: any) {
// // //     // Handle error validasi Zod atau error server
// // //     if (err.issues) return res.status(400).json({ error: 'Validation error', issues: err.issues });
// // //     res.status(500).json({ error: err.message });
// // //   }
// // // });

// // // /**
// // //  * 3. CHANGE PASSWORD
// // //  * Endpoint: PUT /api/users/change-password
// // //  */
// // // router.put('/change-password', requireAuth, async (req: AuthedRequest, res) => {
// // //   try {
// // //     const { currentPassword, newPassword } = changePasswordSchema.parse(req.body);
    
// // //     const user = await User.findById(req.user!.id);
// // //     if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });

// // //     // Cek password lama
// // //     const isMatch = await bcrypt.compare(currentPassword, user.password);
// // //     if (!isMatch) {
// // //       return res.status(400).json({ error: 'Password lama salah' });
// // //     }

// // //     // Hash password baru & Simpan
// // //     user.password = await bcrypt.hash(newPassword, 10);
// // //     await user.save();

// // //     res.json({ message: 'Password berhasil diperbarui' });
// // //   } catch (err: any) {
// // //     if (err.issues) return res.status(400).json({ error: 'Validation error', issues: err.issues });
// // //     res.status(500).json({ error: err.message });
// // //   }
// // // });

// // // /**
// // //  * 4. WORKSPACE DATA (High Connectivity) - NEW FEATURE!
// // //  * Endpoint: GET /api/users/me/workspace
// // //  * Deskripsi: Mengambil User + Progress Pelatihan + Sertifikat sekaligus
// // //  */
// // // router.get('/me/workspace', requireAuth, async (req: AuthedRequest, res) => {
// // //   try {
// // //     const userId = req.user!.id;

// // //     // Promise.all agar pengambilan data berjalan paralel (Cepat)
// // //     const [user, history, certificates] = await Promise.all([
// // //       // A. Ambil Data User
// // //       User.findById(userId).select('-password'),
      
// // //       // B. Ambil Progress (Sejarah Pelatihan)
// // //       Progress.find({ userId })
// // //         .populate({
// // //           path: 'courseId',
// // //           select: 'title thumbnailUrl level category' // Ambil info kursus secukupnya
// // //         })
// // //         .sort({ updatedAt: -1 }), // Urutkan dari yang terakhir dibuka

// // //       // C. Ambil Sertifikat
// // //       Certificate.find({ userId })
// // //         .populate('courseId', 'title')
// // //         .sort({ issuedAt: -1 })
// // //     ]);

// // //     res.json({ 
// // //       user, 
// // //       history, 
// // //       certificates 
// // //     });
// // //   } catch (err: any) {
// // //     console.error("Workspace Error:", err);
// // //     res.status(500).json({ error: 'Gagal memuat workspace student' });
// // //   }
// // // });

// // // // --- ADMIN ROUTES (Untuk Menu Admin Users) ---

// // // /**
// // //  * 5. GET ALL USERS (Admin Only)
// // //  */
// // // router.get('/', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
// // //   try {
// // //     const users = await User.find().select('-password').sort({ createdAt: -1 });
// // //     res.json({ users });
// // //   } catch (err: any) {
// // //     res.status(500).json({ error: err.message });
// // //   }
// // // });

// // // /**
// // //  * 6. DELETE USER (Admin Only)
// // //  */
// // // router.delete('/:id', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
// // //   try {
// // //     await User.findByIdAndDelete(req.params.id);
// // //     res.json({ message: 'User deleted' });
// // //   } catch (err: any) {
// // //     res.status(500).json({ error: err.message });
// // //   }
// // // });

// // // export default router;




// // import { Router } from 'express';
// // import { z } from 'zod';
// // import bcrypt from 'bcryptjs';
// // import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth';
// // import { User } from '../models/User';
// // import { Progress } from '../models/Progress';     // Pastikan model ini ada
// // import { Certificate } from '../models/Certificate'; // Pastikan model ini ada

// // const router = Router();

// // // --- ZOD SCHEMAS ---

// // const patchMeSchema = z.object({
// //   name: z.string().min(2).optional(),
// //   avatarUrl: z.string().optional() // Menerima string URL hasil upload
// // });

// // const changePasswordSchema = z.object({
// //   currentPassword: z.string().min(6),
// //   newPassword: z.string().min(6),
// // });

// // // --- ROUTES ---

// // /**
// //  * 1. GET CURRENT USER (Basic)
// //  * Endpoint: GET /api/users/me
// //  */
// // router.get('/me', requireAuth, async (req: AuthedRequest, res) => {
// //   try {
// //     const user = await User.findById(req.user!.id).select('-password');
// //     if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });
// //     res.json({ user });
// //   } catch (err: any) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // /**
// //  * [BARU] GET ALL USERS (Untuk Search PIC di Form Course)
// //  * Endpoint: GET /api/users
// //  * Akses: Authenticated Users (Facilitator/Admin butuh ini untuk assign PIC)
// //  */
// // router.get('/', requireAuth, async (req: AuthedRequest, res) => {
// //     try {
// //       // Ambil field minimal agar ringan
// //       const users = await User.find().select('name email role avatarUrl').sort({ name: 1 });
// //       res.json({ users });
// //     } catch (err: any) {
// //       res.status(500).json({ error: err.message });
// //     }
// // });

// // /**
// //  * 2. UPDATE PROFILE (Name & Avatar)
// //  * Endpoint: PATCH /api/users/me
// //  */
// // router.patch('/me', requireAuth, async (req: AuthedRequest, res) => {
// //   try {
// //     // Validasi input
// //     const data = patchMeSchema.parse(req.body);
    
// //     // Update data di database
// //     const user = await User.findByIdAndUpdate(
// //       req.user!.id, 
// //       { $set: data }, 
// //       { new: true }
// //     ).select('-password');

// //     if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });

// //     res.json({ user });
// //   } catch (err: any) {
// //     // Handle error validasi Zod atau error server
// //     if (err.issues) return res.status(400).json({ error: 'Validation error', issues: err.issues });
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // /**
// //  * 3. CHANGE PASSWORD
// //  * Endpoint: PUT /api/users/change-password
// //  */
// // router.put('/change-password', requireAuth, async (req: AuthedRequest, res) => {
// //   try {
// //     const { currentPassword, newPassword } = changePasswordSchema.parse(req.body);
    
// //     const user = await User.findById(req.user!.id);
// //     if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });

// //     // Cek password lama
// //     const isMatch = await bcrypt.compare(currentPassword, user.password);
// //     if (!isMatch) {
// //       return res.status(400).json({ error: 'Password lama salah' });
// //     }

// //     // Hash password baru & Simpan
// //     user.password = await bcrypt.hash(newPassword, 10);
// //     await user.save();

// //     res.json({ message: 'Password berhasil diperbarui' });
// //   } catch (err: any) {
// //     if (err.issues) return res.status(400).json({ error: 'Validation error', issues: err.issues });
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // /**
// //  * 4. WORKSPACE DATA (High Connectivity) - NEW FEATURE!
// //  * Endpoint: GET /api/users/me/workspace
// //  * Deskripsi: Mengambil User + Progress Pelatihan + Sertifikat sekaligus
// //  */
// // router.get('/me/workspace', requireAuth, async (req: AuthedRequest, res) => {
// //   try {
// //     const userId = req.user!.id;

// //     // Promise.all agar pengambilan data berjalan paralel (Cepat)
// //     const [user, history, certificates] = await Promise.all([
// //       // A. Ambil Data User
// //       User.findById(userId).select('-password'),
      
// //       // B. Ambil Progress (Sejarah Pelatihan)
// //       Progress.find({ userId })
// //         .populate({
// //           path: 'courseId',
// //           select: 'title thumbnailUrl level category' // Ambil info kursus secukupnya
// //         })
// //         .sort({ updatedAt: -1 }), // Urutkan dari yang terakhir dibuka

// //       // C. Ambil Sertifikat
// //       Certificate.find({ userId })
// //         .populate('courseId', 'title')
// //         .sort({ issuedAt: -1 })
// //     ]);

// //     res.json({ 
// //       user, 
// //       history, 
// //       certificates 
// //     });
// //   } catch (err: any) {
// //     console.error("Workspace Error:", err);
// //     res.status(500).json({ error: 'Gagal memuat workspace student' });
// //   }
// // });

// // // --- ADMIN ROUTES (Untuk Menu Admin Users - Deprecated jika pakai route /api/admin/users) ---
// // // Route di bawah ini duplikat dengan admin-user.ts tapi bisa disimpan untuk backward compatibility
// // // jika ada komponen lama yang memanggil /api/users/:id dengan method DELETE

// // /**
// //  * 6. DELETE USER (Admin Only)
// //  */
// // router.delete('/:id', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
// //   try {
// //     await User.findByIdAndDelete(req.params.id);
// //     res.json({ message: 'User deleted' });
// //   } catch (err: any) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // export default router;

// import { Router } from 'express';
// import { requireAuth, requireSuperAdmin } from '../middleware/auth';
// import { 
//     getMe, 
//     updateMe, 
//     changePassword, 
//     getWorkspace,
//     adminResetPassword 
// } from '../controllers/userController';

// const router = Router();

// // User Mandiri
// router.get('/me', requireAuth, getMe);
// router.patch('/me', requireAuth, updateMe);
// router.put('/change-password', requireAuth, changePassword);
// router.get('/me/workspace', requireAuth, getWorkspace);

// // [NEW] Admin Action via User Route (Opsional, jika admin-user.ts belum cover)
// router.patch('/:id/reset-password', requireAuth, requireSuperAdmin, adminResetPassword);

// export default router;


import { Router } from 'express';
import { requireAuth, requireSuperAdmin } from '../middleware/auth';
import { 
    getMe, 
    updateMe, 
    changePassword, 
    getWorkspace,
    adminResetPassword,
    getFacilitatorsList // [WAJIB] Import fungsi baru
} from '../controllers/userController';

const router = Router();

// User Mandiri
router.get('/me', requireAuth, getMe);
router.patch('/me', requireAuth, updateMe);
router.put('/change-password', requireAuth, changePassword);
router.get('/me/workspace', requireAuth, getWorkspace);

// [BARU] Route Dropdown Fasilitator (Akses: Semua user login boleh lihat daftar nama pengajar)
router.get('/facilitators', requireAuth, getFacilitatorsList);

// Admin Action (Hanya Super Admin)
router.patch('/:id/reset-password', requireAuth, requireSuperAdmin, adminResetPassword);

export default router;
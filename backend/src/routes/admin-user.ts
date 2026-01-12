// // // // // // import express from 'express';
// // // // // // import { z } from 'zod';
// // // // // // import { User } from '../models/User';
// // // // // // import { requireAuth, requireSuperAdmin } from '../middleware/auth';

// // // // // // const router = express.Router();

// // // // // // // Schema Validasi
// // // // // // const updateUserSchema = z.object({
// // // // // //   name: z.string().min(1).optional(),
// // // // // //   role: z.enum(["STUDENT", "FACILITATOR", "SUPER_ADMIN"]).optional(),
// // // // // // });

// // // // // // // Endpoint PATCH Update User
// // // // // // router.patch('/:id', requireAuth, requireSuperAdmin, async (req, res) => {
// // // // // //   try {
// // // // // //     const validatedData = updateUserSchema.parse(req.body);
    
// // // // // //     const user = await User.findByIdAndUpdate(
// // // // // //       req.params.id, 
// // // // // //       validatedData, 
// // // // // //       { new: true, runValidators: true } // new: true agar mengembalikan data yang sudah update
// // // // // //     ).select('-passwordHash'); // Jangan kirim password balik

// // // // // //     if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });

// // // // // //     res.json({ user });
// // // // // //   } catch (error) {
// // // // // //     res.status(400).json({ error: 'Gagal update user' });
// // // // // //   }
// // // // // // });

// // // // // // export default router;
// // // // // import express from 'express';
// // // // // import { z } from 'zod';
// // // // // // PERBAIKAN: Gunakan import default (tanpa kurung kurawal)
// // // // // import User from '../models/User'; 
// // // // // import { requireAuth, requireSuperAdmin } from '../middleware/auth';

// // // // // const router = express.Router();

// // // // // const updateUserSchema = z.object({
// // // // //   name: z.string().min(1).optional(),
// // // // //   role: z.enum(["STUDENT", "FACILITATOR", "SUPER_ADMIN"]).optional(),
// // // // // });

// // // // // router.patch('/:id', requireAuth, requireSuperAdmin, async (req, res) => {
// // // // //   try {
// // // // //     const validatedData = updateUserSchema.parse(req.body);
    
// // // // //     // Pastikan req.params.id valid ObjectId mongo jika perlu, 
// // // // //     // tapi findByIdAndUpdate biasanya handle error cast otomatis atau melempar error
// // // // //     const user = await User.findByIdAndUpdate(
// // // // //       req.params.id, 
// // // // //       validatedData, 
// // // // //       { new: true, runValidators: true }
// // // // //     ).select('-passwordHash');

// // // // //     if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });

// // // // //     res.json({ user });
// // // // //   } catch (error: any) {
// // // // //     // Handle error Zod atau Mongoose
// // // // //     console.error(error); 
// // // // //     res.status(400).json({ error: error.message || 'Gagal update user' });
// // // // //   }
// // // // // });

// // // // // export default router;

// // // // import express from 'express';
// // // // import bcrypt from 'bcryptjs'; // Pastikan install: npm i bcryptjs
// // // // import { z } from 'zod';
// // // // import User from '../models/User';
// // // // import { requireAuth, requireSuperAdmin } from '../middleware/auth';

// // // // const router = express.Router();

// // // // // Validasi Zod
// // // // const createUserSchema = z.object({
// // // //   email: z.string().email(),
// // // //   name: z.string().min(1),
// // // //   role: z.enum(['STUDENT', 'FACILITATOR', 'SUPER_ADMIN']),
// // // //   password: z.string().min(6)
// // // // });

// // // // // 1. GET ALL USERS (Hanya Super Admin)
// // // // router.get('/', requireAuth, requireSuperAdmin, async (req, res) => {
// // // //   try {
// // // //     // Ambil semua user, tapi sembunyikan passwordHash
// // // //     const users = await User.find().select('-passwordHash').sort({ createdAt: -1 });
// // // //     res.json({ users });
// // // //   } catch (error) {
// // // //     res.status(500).json({ error: 'Gagal mengambil data user' });
// // // //   }
// // // // });

// // // // // 2. POST CREATE USER (Optional: Admin buat user manual)
// // // // router.post('/', requireAuth, requireSuperAdmin, async (req, res) => {
// // // //   try {
// // // //     const data = createUserSchema.parse(req.body);
    
// // // //     // Cek email duplikat
// // // //     const existing = await User.findOne({ email: data.email });
// // // //     if (existing) return res.status(400).json({ error: 'Email sudah terdaftar' });

// // // //     const passwordHash = await bcrypt.hash(data.password, 10);
    
// // // //     const user = await User.create({
// // // //       email: data.email,
// // // //       name: data.name,
// // // //       role: data.role,
// // // //       passwordHash
// // // //     });

// // // //     res.status(201).json({ message: 'User berhasil dibuat', user: { email: user.email, id: user._id } });
// // // //   } catch (error: any) {
// // // //     res.status(400).json({ error: error.message || 'Gagal membuat user' });
// // // //   }
// // // // });

// // // // // 3. PATCH UPDATE USER ROLE
// // // // router.patch('/:id', requireAuth, requireSuperAdmin, async (req, res) => {
// // // //   try {
// // // //     const { role, name } = req.body;
// // // //     // Validasi sederhana role jika ada
// // // //     if (role && !['STUDENT', 'FACILITATOR', 'SUPER_ADMIN'].includes(role)) {
// // // //       return res.status(400).json({ error: 'Role tidak valid' });
// // // //     }

// // // //     const user = await User.findByIdAndUpdate(
// // // //       req.params.id, 
// // // //       { ...(role && { role }), ...(name && { name }) }, 
// // // //       { new: true }
// // // //     ).select('-passwordHash');

// // // //     if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });

// // // //     res.json({ user });
// // // //   } catch (error) {
// // // //     res.status(500).json({ error: 'Gagal update user' });
// // // //   }
// // // // });

// // // // // 4. DELETE USER
// // // // router.delete('/:id', requireAuth, requireSuperAdmin, async (req, res) => {
// // // //   try {
// // // //     await User.findByIdAndDelete(req.params.id);
// // // //     res.json({ message: 'User berhasil dihapus' });
// // // //   } catch (error) {
// // // //     res.status(500).json({ error: 'Gagal menghapus user' });
// // // //   }
// // // // });

// // // // export default router;

// // // import express from 'express';
// // // import bcrypt from 'bcryptjs';
// // // import { z } from 'zod';
// // // // PERBAIKAN: Import default tanpa kurung kurawal
// // // import { User } from '../models/User'; 
// // // import { Course } from '../models/Course'; 
// // // import { Certificate } from '../models/Certificate';
// // // import { Quiz } from '../models/Quiz';
// // // // Asumsi model Attempt & Progress ada (sesuai arsitektur awal)
// // // // Jika belum ada file-nya, nanti kita buatkan dummy/modelnya
// // // import Attempt from '../models/Attempt'; 
// // // import Enrollment from '../models/Enrollment';

// // // import { requireAuth, requireSuperAdmin } from '../middleware/auth';

// // // const router = express.Router();

// // // const createUserSchema = z.object({
// // //   email: z.string().email(),
// // //   name: z.string().min(1),
// // //   role: z.enum(['STUDENT', 'FACILITATOR', 'SUPER_ADMIN']),
// // //   password: z.string().min(6)
// // // });

// // // // 1. GET ALL USERS
// // // router.get('/', requireAuth, requireSuperAdmin, async (req, res) => {
// // //   try {
// // //     const users = await User.find().select('-passwordHash').sort({ createdAt: -1 });
// // //     res.json({ users });
// // //   } catch (error) {
// // //     res.status(500).json({ error: 'Gagal ambil data user' });
// // //   }
// // // });

// // // // 2. GET USER DETAILS (PROFILE + COURSES + CERTS)
// // // router.get('/:id/details', requireAuth, requireSuperAdmin, async (req, res) => {
// // //   try {
// // //     const { id } = req.params;
    
// // //     // 1. Ambil Data User
// // //     const user = await User.findById(id).select('-passwordHash');
// // //     if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });

// // //     // 2. Ambil Enrollment (Kursus yang diikuti)
// // //     // Note: Pastikan Model Enrollment sudah ada. Jika belum, buat filenya.
// // //     const enrollments = await Enrollment.find({ user: id }).populate('course', 'title thumbnailUrl');
    
// // //     // 3. Ambil Sertifikat
// // //     const certificates = await Certificate.find({ user: id }).populate('course', 'title');

// // //     // 4. Ambil Riwayat Quiz (Attempt)
// // //     const attempts = await Attempt.find({ user: id })
// // //       .populate('quiz', 'title')
// // //       .populate({
// // //         path: 'quiz',
// // //         populate: { path: 'course', select: 'title' } // Nested populate untuk tahu kursus apa
// // //       })
// // //       .sort({ createdAt: -1 });

// // //     res.json({
// // //       user,
// // //       enrollments,
// // //       certificates,
// // //       attempts
// // //     });

// // //   } catch (error: any) {
// // //     console.error(error);
// // //     res.status(500).json({ error: 'Gagal mengambil detail user' });
// // //   }
// // // });

// // // // 3. POST CREATE USER (Tambah User Baru)
// // // router.post('/', requireAuth, requireSuperAdmin, async (req, res) => {
// // //   try {
// // //     const data = createUserSchema.parse(req.body);
    
// // //     const existing = await User.findOne({ email: data.email });
// // //     if (existing) return res.status(400).json({ error: 'Email sudah terdaftar' });

// // //     const passwordHash = await bcrypt.hash(data.password, 10);
    
// // //     const user = await User.create({
// // //       email: data.email,
// // //       name: data.name,
// // //       role: data.role,
// // //       passwordHash
// // //     });

// // //     res.status(201).json({ message: 'User berhasil dibuat', user });
// // //   } catch (error: any) {
// // //     res.status(400).json({ error: error.message || 'Gagal membuat user' });
// // //   }
// // // });

// // // // 4. DELETE USER
// // // router.delete('/:id', requireAuth, requireSuperAdmin, async (req, res) => {
// // //   try {
// // //     await User.findByIdAndDelete(req.params.id);
// // //     // Opsional: Hapus juga Enrollment, Progress, dll yang terkait user ini
// // //     res.json({ message: 'User berhasil dihapus' });
// // //   } catch (error) {
// // //     res.status(500).json({ error: 'Gagal menghapus user' });
// // //   }
// // // });

// // // export default router;
// // // import express, { Response } from 'express';
// // // import bcrypt from 'bcryptjs';
// // // import { z } from 'zod';
// // // import { User } from '../models/User'; 
// // // import { Course } from '../models/Course'; 
// // // import { Certificate } from '../models/Certificate';
// // // import { Progress } from '../models/Progress'; // Menggunakan Progress sesuai logic sebelumnya
// // // import { requireAuth, requireSuperAdmin, AuthedRequest } from '../middleware/auth';

// // // const router = express.Router();

// // // // --- SCHEMA VALIDASI ---

// // // const createUserSchema = z.object({
// // //   email: z.string().email("Format email tidak valid"),
// // //   name: z.string().min(1, "Nama harus diisi"),
// // //   role: z.enum(['STUDENT', 'FACILITATOR', 'SUPER_ADMIN']),
// // //   password: z.string().min(6, "Password minimal 6 karakter")
// // // });

// // // const updateUserSchema = z.object({
// // //   name: z.string().min(1).optional(),
// // //   role: z.enum(['STUDENT', 'FACILITATOR', 'SUPER_ADMIN']).optional(),
// // //   email: z.string().email().optional()
// // // });

// // // // --- ROUTES ---

// // // /**
// // //  * 1. GET ALL USERS
// // //  * Mengambil semua daftar pengguna untuk tabel admin
// // //  */
// // // router.get('/', requireAuth, requireSuperAdmin, async (req, res) => {
// // //   try {
// // //     const users = await User.find().select('-password').sort({ createdAt: -1 });
// // //     res.json({ users });
// // //   } catch (error) {
// // //     res.status(500).json({ error: 'Gagal mengambil data user' });
// // //   }
// // // });

// // // /**
// // //  * 2. GET USER DETAILS
// // //  * Mengambil profil lengkap, riwayat kursus, dan sertifikat user tertentu
// // //  */
// // // router.get('/:id/details', requireAuth, requireSuperAdmin, async (req: AuthedRequest, res: Response) => {
// // //   try {
// // //     const { id } = req.params;
    
// // //     // A. Ambil Data User
// // //     const user = await User.findById(id).select('-password');
// // //     if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });

// // //     // B. Ambil Progress (Kursus yang diikuti)
// // //     // Mencari di koleksi Progress dan menarik data judul kursus
// // //     const history = await Progress.find({ userId: id })
// // //       .populate('courseId', 'title thumbnailUrl');
    
// // //     // C. Ambil Sertifikat
// // //     const certificates = await Certificate.find({ userId: id })
// // //       .populate('courseId', 'title');

// // //     res.json({
// // //       success: true,
// // //       user,
// // //       history: history || [],
// // //       certificates: certificates || []
// // //     });

// // //   } catch (error: any) {
// // //     console.error("🔥 Detail Admin Error:", error);
// // //     res.status(500).json({ error: 'Gagal mengambil detail user', message: error.message });
// // //   }
// // // });

// // // /**
// // //  * 3. POST CREATE USER
// // //  * Admin membuat user baru secara manual
// // //  */
// // // router.post('/', requireAuth, requireSuperAdmin, async (req, res) => {
// // //   try {
// // //     const data = createUserSchema.parse(req.body);
    
// // //     const existing = await User.findOne({ email: data.email });
// // //     if (existing) return res.status(400).json({ error: 'Email sudah terdaftar' });

// // //     // Hash password sebelum simpan
// // //     const hashedPassword = await bcrypt.hash(data.password, 10);
    
// // //     const user = await User.create({
// // //       email: data.email,
// // //       name: data.name,
// // //       role: data.role,
// // //       password: hashedPassword // Pastikan field di Model User adalah 'password' atau 'passwordHash'
// // //     });

// // //     res.status(201).json({ message: 'User berhasil dibuat', userId: user._id });
// // //   } catch (error: any) {
// // //     res.status(400).json({ error: error.errors?.[0]?.message || error.message });
// // //   }
// // // });

// // // /**
// // //  * 4. PATCH UPDATE USER
// // //  * Mengupdate Role atau Nama user
// // //  */
// // // router.patch('/:id', requireAuth, requireSuperAdmin, async (req, res) => {
// // //   try {
// // //     const validatedData = updateUserSchema.parse(req.body);
    
// // //     const user = await User.findByIdAndUpdate(
// // //       req.params.id, 
// // //       { $set: validatedData }, 
// // //       { new: true, runValidators: true }
// // //     ).select('-password');

// // //     if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });

// // //     res.json({ message: 'User berhasil diperbarui', user });
// // //   } catch (error: any) {
// // //     res.status(400).json({ error: error.message || 'Gagal update user' });
// // //   }
// // // });

// // // /**
// // //  * 5. DELETE USER
// // //  * Menghapus user secara permanen
// // //  */
// // // router.delete('/:id', requireAuth, requireSuperAdmin, async (req, res) => {
// // //   try {
// // //     const user = await User.findByIdAndDelete(req.params.id);
// // //     if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });

// // //     // Opsional: Hapus Progress & Sertifikat terkait jika ingin bersih total
// // //     await Progress.deleteMany({ userId: req.params.id });
// // //     await Certificate.deleteMany({ userId: req.params.id });

// // //     res.json({ message: 'User dan semua data terkait berhasil dihapus' });
// // //   } catch (error) {
// // //     res.status(500).json({ error: 'Gagal menghapus user' });
// // //   }
// // // });

// // // export default router;
// // import express, { Response } from 'express';
// // import bcrypt from 'bcryptjs';
// // import { z } from 'zod';
// // // Pastikan import model menggunakan kurung kurawal jika menggunakan Named Export
// // import { User } from '../models/User'; 
// // import { Course } from '../models/Course'; 
// // import { Certificate } from '../models/Certificate';
// // import { Progress } from '../models/Progress'; 
// // import { requireAuth, requireSuperAdmin, AuthedRequest } from '../middleware/auth';

// // const router = express.Router();

// // // --- SCHEMA VALIDASI ---

// // const createUserSchema = z.object({
// //   email: z.string().email("Format email tidak valid"),
// //   name: z.string().min(1, "Nama harus diisi"),
// //   role: z.enum(['STUDENT', 'FACILITATOR', 'SUPER_ADMIN']),
// //   password: z.string().min(6, "Password minimal 6 karakter")
// // });

// // const updateUserSchema = z.object({
// //   name: z.string().min(1).optional(),
// //   role: z.enum(['STUDENT', 'FACILITATOR', 'SUPER_ADMIN']).optional(),
// //   email: z.string().email().optional()
// // });

// // // --- ROUTES ---

// // /**
// //  * 1. GET ALL USERS
// //  */
// // router.get('/', requireAuth, requireSuperAdmin, async (req, res) => {
// //   try {
// //     const users = await User.find().select('-password').sort({ createdAt: -1 });
// //     res.json({ users });
// //   } catch (error) {
// //     res.status(500).json({ error: 'Gagal mengambil data user' });
// //   }
// // });

// // /**
// //  * 2. GET USER DETAILS
// //  * Memperbaiki masalah "Gagal mengambil detail user" (Error 500)
// //  */
// // router.get('/:id/details', requireAuth, requireSuperAdmin, async (req: AuthedRequest, res: Response) => {
// //   try {
// //     const { id } = req.params;
    
// //     // A. Ambil Data User
// //     const user = await User.findById(id).select('-password');
// //     if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });

// //     // B. Ambil Progress (Sejarah Pelatihan)
// //     // Pastikan field di Progress adalah 'userId' (camelCase)
// //     const history = await Progress.find({ userId: id })
// //       .populate('courseId', 'title thumbnailUrl')
// //       .lean(); // Menggunakan lean agar lebih ringan karena hanya read-only
    
// //     // C. Ambil Sertifikat
// //     const certificates = await Certificate.find({ userId: id })
// //       .populate('courseId', 'title')
// //       .lean();

// //     res.json({
// //       success: true,
// //       user,
// //       history: history || [],
// //       certificates: certificates || []
// //     });

// //   } catch (error: any) {
// //     // Logging error di terminal untuk memudahkan debugging
// //     console.error(`🔥 Detail Admin Error [User ID: ${req.params.id}]:`, error.message);
// //     res.status(500).json({ 
// //       error: 'Gagal mengambil detail user dari database', 
// //       message: error.message 
// //     });
// //   }
// // });

// // /**
// //  * 3. POST CREATE USER
// //  */
// // router.post('/', requireAuth, requireSuperAdmin, async (req, res) => {
// //   try {
// //     const data = createUserSchema.parse(req.body);
    
// //     const existing = await User.findOne({ email: data.email });
// //     if (existing) return res.status(400).json({ error: 'Email sudah terdaftar' });

// //     const hashedPassword = await bcrypt.hash(data.password, 10);
    
// //     const user = await User.create({
// //       email: data.email,
// //       name: data.name,
// //       role: data.role,
// //       password: hashedPassword 
// //     });

// //     res.status(201).json({ message: 'User berhasil dibuat', userId: user._id });
// //   } catch (error: any) {
// //     res.status(400).json({ error: error.errors?.[0]?.message || error.message });
// //   }
// // });

// // /**
// //  * 4. PATCH UPDATE USER
// //  */
// // router.patch('/:id', requireAuth, requireSuperAdmin, async (req, res) => {
// //   try {
// //     const validatedData = updateUserSchema.parse(req.body);
    
// //     const user = await User.findByIdAndUpdate(
// //       req.params.id, 
// //       { $set: validatedData }, 
// //       { new: true, runValidators: true }
// //     ).select('-password');

// //     if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });

// //     res.json({ message: 'User berhasil diperbarui', user });
// //   } catch (error: any) {
// //     res.status(400).json({ error: error.message || 'Gagal update user' });
// //   }
// // });

// // /**
// //  * 5. DELETE USER
// //  */
// // router.delete('/:id', requireAuth, requireSuperAdmin, async (req, res) => {
// //   try {
// //     const user = await User.findByIdAndDelete(req.params.id);
// //     if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });

// //     // Hapus data terkait agar database tetap bersih
// //     await Progress.deleteMany({ userId: req.params.id });
// //     await Certificate.deleteMany({ userId: req.params.id });

// //     res.json({ message: 'User dan semua data terkait berhasil dihapus' });
// //   } catch (error) {
// //     res.status(500).json({ error: 'Gagal menghapus user' });
// //   }
// // });

// // export default router;

// import express, { Response } from 'express';
// import bcrypt from 'bcryptjs';
// import { z } from 'zod';
// // Menggunakan Named Import { } untuk memastikan kompatibilitas dengan model
// import { User } from '../models/User'; 
// import { Progress } from '../models/Progress'; 
// import { Certificate } from '../models/Certificate';
// import { requireAuth, requireSuperAdmin, AuthedRequest } from '../middleware/auth';

// const router = express.Router();

// // --- 1. SCHEMA VALIDASI (ZOD) ---

// const createUserSchema = z.object({
//   email: z.string().email("Format email tidak valid"),
//   name: z.string().min(1, "Nama harus diisi"),
//   role: z.enum(['STUDENT', 'FACILITATOR', 'SUPER_ADMIN']),
//   password: z.string().min(6, "Password minimal 6 karakter")
// });

// const updateUserSchema = z.object({
//   name: z.string().min(1).optional(),
//   role: z.enum(['STUDENT', 'FACILITATOR', 'SUPER_ADMIN']).optional(),
//   email: z.string().email().optional()
// });

// // --- 2. ROUTES ---

// /**
//  * GET ALL USERS
//  * Menampilkan daftar semua pengguna di tabel Manajemen Pengguna
//  */
// router.get('/', requireAuth, requireSuperAdmin, async (req, res) => {
//   try {
//     const users = await User.find().select('-password').sort({ createdAt: -1 });
//     res.json({ success: true, users });
//   } catch (error) {
//     console.error("🔥 Error Get All Users:", error);
//     res.status(500).json({ success: false, error: 'Gagal mengambil daftar pengguna' });
//   }
// });

// /**
//  * GET USER DETAILS (Penyebab Utama Stuck Loading Jika Error)
//  * Mengambil profil, riwayat progres kursus, dan sertifikat dalam satu request
//  */
// router.get('/:id/details', requireAuth, requireSuperAdmin, async (req: AuthedRequest, res: Response) => {
//   try {
//     const { id } = req.params;

//     // A. Cari User Dasar
//     const user = await User.findById(id).select('-password');
//     if (!user) {
//       return res.status(404).json({ success: false, error: 'User tidak ditemukan' });
//     }

//     // B. Cari Progres Belajar (Sejarah Pelatihan)
//     // Menggunakan try-catch lokal agar jika satu koleksi bermasalah, sisa data tetap terkirim
//     let history = [];
//     try {
//       history = await Progress.find({ userId: id })
//         .populate('courseId', 'title thumbnailUrl')
//         .lean();
//     } catch (e) {
//       console.error(`⚠️ Gagal populate Progress untuk user ${id}:`, e);
//     }

//     // C. Cari Sertifikat Terbit
//     let certificates = [];
//     try {
//       certificates = await Certificate.find({ userId: id })
//         .populate('courseId', 'title')
//         .lean();
//     } catch (e) {
//       console.error(`⚠️ Gagal populate Certificates untuk user ${id}:`, e);
//     }

//     // Selalu kirim success: true agar frontend berhenti loading
//     return res.json({
//       success: true,
//       user,
//       history: history || [],
//       certificates: certificates || []
//     });

//   } catch (error: any) {
//     console.error("🔥 Critical Admin Detail Error:", error.message);
//     // Pastikan tetap mengirim response agar frontend tidak "gantung"
//     return res.status(500).json({ 
//       success: false, 
//       error: 'Gagal memproses detail pengguna', 
//       message: error.message 
//     });
//   }
// });

// /**
//  * POST CREATE USER
//  * Admin menambahkan user baru secara manual
//  */
// router.post('/', requireAuth, requireSuperAdmin, async (req, res) => {
//   try {
//     const data = createUserSchema.parse(req.body);
    
//     const existing = await User.findOne({ email: data.email });
//     if (existing) return res.status(400).json({ success: false, error: 'Email sudah terdaftar' });

//     const hashedPassword = await bcrypt.hash(data.password, 10);
    
//     const user = await User.create({
//       email: data.email,
//       name: data.name,
//       role: data.role,
//       password: hashedPassword 
//     });

//     res.status(201).json({ success: true, message: 'User berhasil dibuat', userId: user._id });
//   } catch (error: any) {
//     res.status(400).json({ success: false, error: error.errors?.[0]?.message || error.message });
//   }
// });

// /**
//  * PATCH UPDATE USER
//  * Mengubah nama atau peran (role) pengguna
//  */
// router.patch('/:id', requireAuth, requireSuperAdmin, async (req, res) => {
//   try {
//     const validatedData = updateUserSchema.parse(req.body);
    
//     const user = await User.findByIdAndUpdate(
//       req.params.id, 
//       { $set: validatedData }, 
//       { new: true, runValidators: true }
//     ).select('-password');

//     if (!user) return res.status(404).json({ success: false, error: 'User tidak ditemukan' });

//     res.json({ success: true, message: 'User berhasil diperbarui', user });
//   } catch (error: any) {
//     res.status(400).json({ success: false, error: error.message || 'Gagal update user' });
//   }
// });

// /**
//  * DELETE USER
//  * Menghapus user beserta data terkait (Clean Up)
//  */
// router.delete('/:id', requireAuth, requireSuperAdmin, async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);
//     if (!user) return res.status(404).json({ success: false, error: 'User tidak ditemukan' });

//     // Hapus data progres dan sertifikat agar tidak menjadi sampah di DB
//     await Progress.deleteMany({ userId: req.params.id });
//     await Certificate.deleteMany({ userId: req.params.id });

//     res.json({ success: true, message: 'User dan data terkait berhasil dihapus' });
//   } catch (error) {
//     console.error("🔥 Error Delete User:", error);
//     res.status(500).json({ success: false, error: 'Gagal menghapus user' });
//   }
// });

// export default router;
import express, { Response } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
// Import Model dan Interface-nya (IProgress, ICertificate)
import { User } from '../models/User'; 
import { Progress, IProgress } from '../models/Progress'; 
import { Certificate, ICertificate } from '../models/Certificate';
import { requireAuth, requireSuperAdmin, AuthedRequest } from '../middleware/auth';

const router = express.Router();

// --- SCHEMA VALIDASI ---
const createUserSchema = z.object({
  email: z.string().email("Format email tidak valid"),
  name: z.string().min(1, "Nama harus diisi"),
  role: z.enum(['STUDENT', 'FACILITATOR', 'SUPER_ADMIN']),
  password: z.string().min(6, "Password minimal 6 karakter")
});

const updateUserSchema = z.object({
  name: z.string().min(1).optional(),
  role: z.enum(['STUDENT', 'FACILITATOR', 'SUPER_ADMIN']).optional(),
  email: z.string().email().optional()
});

// --- ROUTES ---

// 1. GET ALL USERS
router.get('/', requireAuth, requireSuperAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Gagal mengambil daftar pengguna' });
  }
});

/**
 * 2. GET USER DETAILS
 * PERBAIKAN: Memberikan tipe data eksplisit pada variabel history dan certificates
 */
router.get('/:id/details', requireAuth, requireSuperAdmin, async (req: AuthedRequest, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, error: 'User tidak ditemukan' });
    }

    // SOLUSI ERROR 7034 & 7005: Deklarasikan tipe array secara eksplisit
    let history: any[] = []; 
    let certificates: any[] = [];

    // Ambil Sejarah Pelatihan
    try {
      // Menggunakan .lean<IProgress[]>() untuk memberi tahu TS hasil dari query ini
      history = await Progress.find({ userId: id })
        .populate('courseId', 'title thumbnailUrl')
        .lean();
    } catch (e) {
      console.error(`⚠️ Gagal fetch Progress user ${id}`);
    }

    // Ambil Sertifikat
    try {
      certificates = await Certificate.find({ userId: id })
        .populate('courseId', 'title')
        .lean();
    } catch (e) {
      console.error(`⚠️ Gagal fetch Certificates user ${id}`);
    }

    return res.json({
      success: true,
      user,
      history,
      certificates
    });

  } catch (error: any) {
    console.error("🔥 Critical Admin Detail Error:", error.message);
    return res.status(500).json({ 
      success: false, 
      error: 'Gagal memproses detail pengguna', 
      message: error.message 
    });
  }
});

// 3. POST CREATE USER
router.post('/', requireAuth, requireSuperAdmin, async (req, res) => {
  try {
    const data = createUserSchema.parse(req.body);
    const existing = await User.findOne({ email: data.email });
    if (existing) return res.status(400).json({ success: false, error: 'Email sudah terdaftar' });

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await User.create({
      email: data.email,
      name: data.name,
      role: data.role,
      password: hashedPassword 
    });

    res.status(201).json({ success: true, message: 'User berhasil dibuat', userId: user._id });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.errors?.[0]?.message || error.message });
  }
});

// 4. PATCH UPDATE USER
router.patch('/:id', requireAuth, requireSuperAdmin, async (req, res) => {
  try {
    const validatedData = updateUserSchema.parse(req.body);
    const user = await User.findByIdAndUpdate(
      req.params.id, 
      { $set: validatedData }, 
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) return res.status(404).json({ success: false, error: 'User tidak ditemukan' });
    res.json({ success: true, message: 'User berhasil diperbarui', user });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message || 'Gagal update user' });
  }
});

// 5. DELETE USER
router.delete('/:id', requireAuth, requireSuperAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ success: false, error: 'User tidak ditemukan' });

    await Progress.deleteMany({ userId: req.params.id });
    await Certificate.deleteMany({ userId: req.params.id });

    res.json({ success: true, message: 'User dan data terkait berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Gagal menghapus user' });
  }
});

export default router;
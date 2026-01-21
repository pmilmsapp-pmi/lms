// // // // // // import express, { Response } from 'express';
// // // // // // import bcrypt from 'bcryptjs';
// // // // // // import { z } from 'zod';
// // // // // // // Import Model dan Interface-nya (IProgress, ICertificate)
// // // // // // import { User } from '../models/User'; 
// // // // // // import { Progress, IProgress } from '../models/Progress'; 
// // // // // // import { Certificate, ICertificate } from '../models/Certificate';
// // // // // // import { requireAuth, requireSuperAdmin, AuthedRequest } from '../middleware/auth';

// // // // // // const router = express.Router();

// // // // // // // --- SCHEMA VALIDASI ---
// // // // // // const createUserSchema = z.object({
// // // // // //   email: z.string().email("Format email tidak valid"),
// // // // // //   name: z.string().min(1, "Nama harus diisi"),
// // // // // //   role: z.enum(['STUDENT', 'FACILITATOR', 'SUPER_ADMIN']),
// // // // // //   password: z.string().min(6, "Password minimal 6 karakter")
// // // // // // });

// // // // // // const updateUserSchema = z.object({
// // // // // //   name: z.string().min(1).optional(),
// // // // // //   role: z.enum(['STUDENT', 'FACILITATOR', 'SUPER_ADMIN']).optional(),
// // // // // //   email: z.string().email().optional()
// // // // // // });

// // // // // // // --- ROUTES ---

// // // // // // // 1. GET ALL USERS
// // // // // // router.get('/', requireAuth, requireSuperAdmin, async (req, res) => {
// // // // // //   try {
// // // // // //     const users = await User.find().select('-password').sort({ createdAt: -1 });
// // // // // //     res.json({ success: true, users });
// // // // // //   } catch (error) {
// // // // // //     res.status(500).json({ success: false, error: 'Gagal mengambil daftar pengguna' });
// // // // // //   }
// // // // // // });

// // // // // // /**
// // // // // //  * 2. GET USER DETAILS
// // // // // //  * PERBAIKAN: Memberikan tipe data eksplisit pada variabel history dan certificates
// // // // // //  */
// // // // // // router.get('/:id/details', requireAuth, requireSuperAdmin, async (req: AuthedRequest, res: Response) => {
// // // // // //   try {
// // // // // //     const { id } = req.params;

// // // // // //     const user = await User.findById(id).select('-password');
// // // // // //     if (!user) {
// // // // // //       return res.status(404).json({ success: false, error: 'User tidak ditemukan' });
// // // // // //     }

// // // // // //     // SOLUSI ERROR 7034 & 7005: Deklarasikan tipe array secara eksplisit
// // // // // //     let history: any[] = []; 
// // // // // //     let certificates: any[] = [];

// // // // // //     // Ambil Sejarah Pelatihan
// // // // // //     try {
// // // // // //       // Menggunakan .lean<IProgress[]>() untuk memberi tahu TS hasil dari query ini
// // // // // //       history = await Progress.find({ userId: id })
// // // // // //         .populate('courseId', 'title thumbnailUrl')
// // // // // //         .lean();
// // // // // //     } catch (e) {
// // // // // //       console.error(`⚠️ Gagal fetch Progress user ${id}`);
// // // // // //     }

// // // // // //     // Ambil Sertifikat
// // // // // //     try {
// // // // // //       certificates = await Certificate.find({ userId: id })
// // // // // //         .populate('courseId', 'title')
// // // // // //         .lean();
// // // // // //     } catch (e) {
// // // // // //       console.error(`⚠️ Gagal fetch Certificates user ${id}`);
// // // // // //     }

// // // // // //     return res.json({
// // // // // //       success: true,
// // // // // //       user,
// // // // // //       history,
// // // // // //       certificates
// // // // // //     });

// // // // // //   } catch (error: any) {
// // // // // //     console.error("🔥 Critical Admin Detail Error:", error.message);
// // // // // //     return res.status(500).json({ 
// // // // // //       success: false, 
// // // // // //       error: 'Gagal memproses detail pengguna', 
// // // // // //       message: error.message 
// // // // // //     });
// // // // // //   }
// // // // // // });

// // // // // // // 3. POST CREATE USER
// // // // // // router.post('/', requireAuth, requireSuperAdmin, async (req, res) => {
// // // // // //   try {
// // // // // //     const data = createUserSchema.parse(req.body);
// // // // // //     const existing = await User.findOne({ email: data.email });
// // // // // //     if (existing) return res.status(400).json({ success: false, error: 'Email sudah terdaftar' });

// // // // // //     const hashedPassword = await bcrypt.hash(data.password, 10);
// // // // // //     const user = await User.create({
// // // // // //       email: data.email,
// // // // // //       name: data.name,
// // // // // //       role: data.role,
// // // // // //       password: hashedPassword 
// // // // // //     });

// // // // // //     res.status(201).json({ success: true, message: 'User berhasil dibuat', userId: user._id });
// // // // // //   } catch (error: any) {
// // // // // //     res.status(400).json({ success: false, error: error.errors?.[0]?.message || error.message });
// // // // // //   }
// // // // // // });

// // // // // // // 4. PATCH UPDATE USER
// // // // // // router.patch('/:id', requireAuth, requireSuperAdmin, async (req, res) => {
// // // // // //   try {
// // // // // //     const validatedData = updateUserSchema.parse(req.body);
// // // // // //     const user = await User.findByIdAndUpdate(
// // // // // //       req.params.id, 
// // // // // //       { $set: validatedData }, 
// // // // // //       { new: true, runValidators: true }
// // // // // //     ).select('-password');

// // // // // //     if (!user) return res.status(404).json({ success: false, error: 'User tidak ditemukan' });
// // // // // //     res.json({ success: true, message: 'User berhasil diperbarui', user });
// // // // // //   } catch (error: any) {
// // // // // //     res.status(400).json({ success: false, error: error.message || 'Gagal update user' });
// // // // // //   }
// // // // // // });

// // // // // // // 5. DELETE USER
// // // // // // router.delete('/:id', requireAuth, requireSuperAdmin, async (req, res) => {
// // // // // //   try {
// // // // // //     const user = await User.findByIdAndDelete(req.params.id);
// // // // // //     if (!user) return res.status(404).json({ success: false, error: 'User tidak ditemukan' });

// // // // // //     await Progress.deleteMany({ userId: req.params.id });
// // // // // //     await Certificate.deleteMany({ userId: req.params.id });

// // // // // //     res.json({ success: true, message: 'User dan data terkait berhasil dihapus' });
// // // // // //   } catch (error) {
// // // // // //     res.status(500).json({ success: false, error: 'Gagal menghapus user' });
// // // // // //   }
// // // // // // });

// // // // // // export default router;


// // // // // import express, { Response } from 'express';
// // // // // import bcrypt from 'bcryptjs';
// // // // // import { z } from 'zod';
// // // // // // Import Model dan Interface-nya (IProgress, ICertificate)
// // // // // import { User } from '../models/User'; 
// // // // // import { Progress } from '../models/Progress'; 
// // // // // import { Certificate } from '../models/Certificate';
// // // // // import { requireAuth, requireSuperAdmin, AuthedRequest } from '../middleware/auth';

// // // // // const router = express.Router();

// // // // // // --- SCHEMA VALIDASI ---
// // // // // const createUserSchema = z.object({
// // // // //   email: z.string().email("Format email tidak valid"),
// // // // //   name: z.string().min(1, "Nama harus diisi"),
// // // // //   // [UPDATED] Tambahkan 'ADMIN' ke enum
// // // // //   role: z.enum(['STUDENT', 'FACILITATOR', 'ADMIN', 'SUPER_ADMIN']),
// // // // //   password: z.string().min(6, "Password minimal 6 karakter"),
  
// // // // //   // [BARU] Field tambahan optional untuk Admin Wilayah
// // // // //   regionScope: z.enum(['national', 'province', 'regency']).optional(),
// // // // //   managedProvinces: z.array(z.string()).optional(),
// // // // //   managedRegencies: z.array(z.string()).optional(),
// // // // //   permissions: z.array(z.string()).optional()
// // // // // });

// // // // // const updateUserSchema = z.object({
// // // // //   name: z.string().min(1).optional(),
// // // // //   // [UPDATED] Tambahkan 'ADMIN' ke enum
// // // // //   role: z.enum(['STUDENT', 'FACILITATOR', 'ADMIN', 'SUPER_ADMIN']).optional(),
// // // // //   email: z.string().email().optional(),

// // // // //   // [BARU] Field tambahan optional untuk update
// // // // //   regionScope: z.enum(['national', 'province', 'regency']).optional(),
// // // // //   managedProvinces: z.array(z.string()).optional(),
// // // // //   managedRegencies: z.array(z.string()).optional(),
// // // // //   permissions: z.array(z.string()).optional()
// // // // // });

// // // // // // --- ROUTES ---

// // // // // // 1. GET ALL USERS
// // // // // router.get('/', requireAuth, requireSuperAdmin, async (req, res) => {
// // // // //   try {
// // // // //     const users = await User.find().select('-password').sort({ createdAt: -1 });
// // // // //     res.json({ success: true, users });
// // // // //   } catch (error) {
// // // // //     res.status(500).json({ success: false, error: 'Gagal mengambil daftar pengguna' });
// // // // //   }
// // // // // });

// // // // // /**
// // // // //  * 2. GET USER DETAILS
// // // // //  * PERBAIKAN: Memberikan tipe data eksplisit pada variabel history dan certificates
// // // // //  */
// // // // // router.get('/:id/details', requireAuth, requireSuperAdmin, async (req: AuthedRequest, res: Response) => {
// // // // //   try {
// // // // //     const { id } = req.params;

// // // // //     const user = await User.findById(id).select('-password');
// // // // //     if (!user) {
// // // // //       return res.status(404).json({ success: false, error: 'User tidak ditemukan' });
// // // // //     }

// // // // //     // SOLUSI ERROR 7034 & 7005: Deklarasikan tipe array secara eksplisit
// // // // //     let history: any[] = []; 
// // // // //     let certificates: any[] = [];

// // // // //     // Ambil Sejarah Pelatihan
// // // // //     try {
// // // // //       // Menggunakan .lean() untuk memberi tahu TS hasil dari query ini
// // // // //       history = await Progress.find({ userId: id })
// // // // //         .populate('courseId', 'title thumbnailUrl')
// // // // //         .lean();
// // // // //     } catch (e) {
// // // // //       console.error(`⚠️ Gagal fetch Progress user ${id}`);
// // // // //     }

// // // // //     // Ambil Sertifikat
// // // // //     try {
// // // // //       certificates = await Certificate.find({ userId: id })
// // // // //         .populate('courseId', 'title')
// // // // //         .lean();
// // // // //     } catch (e) {
// // // // //       console.error(`⚠️ Gagal fetch Certificates user ${id}`);
// // // // //     }

// // // // //     return res.json({
// // // // //       success: true,
// // // // //       user,
// // // // //       history,
// // // // //       certificates
// // // // //     });

// // // // //   } catch (error: any) {
// // // // //     console.error("🔥 Critical Admin Detail Error:", error.message);
// // // // //     return res.status(500).json({ 
// // // // //       success: false, 
// // // // //       error: 'Gagal memproses detail pengguna', 
// // // // //       message: error.message 
// // // // //     });
// // // // //   }
// // // // // });

// // // // // // 3. POST CREATE USER
// // // // // router.post('/', requireAuth, requireSuperAdmin, async (req, res) => {
// // // // //   try {
// // // // //     const data = createUserSchema.parse(req.body);
// // // // //     const existing = await User.findOne({ email: data.email });
// // // // //     if (existing) return res.status(400).json({ success: false, error: 'Email sudah terdaftar' });

// // // // //     const hashedPassword = await bcrypt.hash(data.password, 10);
    
// // // // //     // [UPDATED] Create user dengan data tambahan jika ada
// // // // //     const user = await User.create({
// // // // //       email: data.email,
// // // // //       name: data.name,
// // // // //       role: data.role,
// // // // //       password: hashedPassword,
// // // // //       // Field baru optional
// // // // //       regionScope: data.regionScope,
// // // // //       managedProvinces: data.managedProvinces,
// // // // //       managedRegencies: data.managedRegencies,
// // // // //       permissions: data.permissions
// // // // //     });

// // // // //     res.status(201).json({ success: true, message: 'User berhasil dibuat', userId: user._id });
// // // // //   } catch (error: any) {
// // // // //     res.status(400).json({ success: false, error: error.errors?.[0]?.message || error.message });
// // // // //   }
// // // // // });

// // // // // // 4. PATCH UPDATE USER
// // // // // router.patch('/:id', requireAuth, requireSuperAdmin, async (req, res) => {
// // // // //   try {
// // // // //     const validatedData = updateUserSchema.parse(req.body);
    
// // // // //     // [UPDATED] Update dengan $set agar field baru tersimpan
// // // // //     const user = await User.findByIdAndUpdate(
// // // // //       req.params.id, 
// // // // //       { $set: validatedData }, 
// // // // //       { new: true, runValidators: true }
// // // // //     ).select('-password');

// // // // //     if (!user) return res.status(404).json({ success: false, error: 'User tidak ditemukan' });
// // // // //     res.json({ success: true, message: 'User berhasil diperbarui', user });
// // // // //   } catch (error: any) {
// // // // //     res.status(400).json({ success: false, error: error.message || 'Gagal update user' });
// // // // //   }
// // // // // });

// // // // // // 5. DELETE USER
// // // // // router.delete('/:id', requireAuth, requireSuperAdmin, async (req, res) => {
// // // // //   try {
// // // // //     const user = await User.findByIdAndDelete(req.params.id);
// // // // //     if (!user) return res.status(404).json({ success: false, error: 'User tidak ditemukan' });

// // // // //     await Progress.deleteMany({ userId: req.params.id });
// // // // //     await Certificate.deleteMany({ userId: req.params.id });

// // // // //     res.json({ success: true, message: 'User dan data terkait berhasil dihapus' });
// // // // //   } catch (error) {
// // // // //     res.status(500).json({ success: false, error: 'Gagal menghapus user' });
// // // // //   }
// // // // // });

// // // // // export default router;
// // // // import express, { Response } from 'express';
// // // // import bcrypt from 'bcryptjs';
// // // // import { z } from 'zod';
// // // // import { User } from '../models/User'; 
// // // // import { Progress } from '../models/Progress'; 
// // // // import { Certificate } from '../models/Certificate';
// // // // import { requireAuth, requireSuperAdmin, AuthedRequest } from '../middleware/auth';

// // // // const router = express.Router();

// // // // // --- SCHEMA VALIDASI ---
// // // // const createUserSchema = z.object({
// // // //   email: z.string().email("Format email tidak valid"),
// // // //   name: z.string().min(1, "Nama harus diisi"),
// // // //   // [UPDATED] Tambahkan 'ADMIN' ke enum
// // // //   role: z.enum(['STUDENT', 'FACILITATOR', 'ADMIN', 'SUPER_ADMIN']),
// // // //   password: z.string().min(6, "Password minimal 6 karakter"),
  
// // // //   // [BARU] Field tambahan untuk Admin
// // // //   regionScope: z.enum(['national', 'province', 'regency']).optional(),
// // // //   managedProvinces: z.array(z.string()).optional(),
// // // //   managedRegencies: z.array(z.string()).optional(),
// // // //   permissions: z.array(z.string()).optional()
// // // // });

// // // // const updateUserSchema = z.object({
// // // //   name: z.string().min(1).optional(),
// // // //   role: z.enum(['STUDENT', 'FACILITATOR', 'ADMIN', 'SUPER_ADMIN']).optional(),
// // // //   email: z.string().email().optional(),

// // // //   // [BARU] Field Admin & Status
// // // //   regionScope: z.enum(['national', 'province', 'regency']).optional(),
// // // //   managedProvinces: z.array(z.string()).optional(),
// // // //   managedRegencies: z.array(z.string()).optional(),
// // // //   permissions: z.array(z.string()).optional(),
// // // //   isBanned: z.boolean().optional(),
// // // //   bannedReason: z.string().optional()
// // // // });

// // // // // --- ROUTES ---

// // // // // 1. GET ALL USERS
// // // // router.get('/', requireAuth, requireSuperAdmin, async (req, res) => {
// // // //   try {
// // // //     const users = await User.find().select('-password').sort({ createdAt: -1 });
// // // //     res.json({ success: true, users });
// // // //   } catch (error) {
// // // //     res.status(500).json({ success: false, error: 'Gagal mengambil daftar pengguna' });
// // // //   }
// // // // });

// // // // // 2. GET USER DETAILS
// // // // router.get('/:id/details', requireAuth, requireSuperAdmin, async (req: AuthedRequest, res: Response) => {
// // // //   try {
// // // //     const { id } = req.params;

// // // //     const user = await User.findById(id).select('-password');
// // // //     if (!user) {
// // // //       return res.status(404).json({ success: false, error: 'User tidak ditemukan' });
// // // //     }

// // // //     let history: any[] = []; 
// // // //     let certificates: any[] = [];

// // // //     try {
// // // //       history = await Progress.find({ userId: id })
// // // //         .populate('courseId', 'title thumbnailUrl')
// // // //         .lean();
// // // //     } catch (e) {
// // // //       console.error(`⚠️ Gagal fetch Progress user ${id}`);
// // // //     }

// // // //     try {
// // // //       certificates = await Certificate.find({ userId: id })
// // // //         .populate('courseId', 'title')
// // // //         .lean();
// // // //     } catch (e) {
// // // //       console.error(`⚠️ Gagal fetch Certificates user ${id}`);
// // // //     }

// // // //     return res.json({
// // // //       success: true,
// // // //       user,
// // // //       history,
// // // //       certificates
// // // //     });

// // // //   } catch (error: any) {
// // // //     console.error("🔥 Critical Admin Detail Error:", error.message);
// // // //     return res.status(500).json({ 
// // // //       success: false, 
// // // //       error: 'Gagal memproses detail pengguna', 
// // // //       message: error.message 
// // // //     });
// // // //   }
// // // // });

// // // // // 3. POST CREATE USER
// // // // router.post('/', requireAuth, requireSuperAdmin, async (req, res) => {
// // // //   try {
// // // //     const data = createUserSchema.parse(req.body);
// // // //     const existing = await User.findOne({ email: data.email });
// // // //     if (existing) return res.status(400).json({ success: false, error: 'Email sudah terdaftar' });

// // // //     const hashedPassword = await bcrypt.hash(data.password, 10);
    
// // // //     // Create user dengan field lengkap
// // // //     const user = await User.create({
// // // //       email: data.email,
// // // //       name: data.name,
// // // //       role: data.role,
// // // //       password: hashedPassword,
// // // //       regionScope: data.regionScope,
// // // //       managedProvinces: data.managedProvinces,
// // // //       managedRegencies: data.managedRegencies,
// // // //       permissions: data.permissions
// // // //     });

// // // //     res.status(201).json({ success: true, message: 'User berhasil dibuat', userId: user._id });
// // // //   } catch (error: any) {
// // // //     res.status(400).json({ success: false, error: error.errors?.[0]?.message || error.message });
// // // //   }
// // // // });

// // // // // 4. PATCH UPDATE USER
// // // // router.patch('/:id', requireAuth, requireSuperAdmin, async (req, res) => {
// // // //   try {
// // // //     const validatedData = updateUserSchema.parse(req.body);
    
// // // //     // Update data di database
// // // //     const user = await User.findByIdAndUpdate(
// // // //       req.params.id, 
// // // //       { $set: validatedData }, 
// // // //       { new: true, runValidators: true }
// // // //     ).select('-password');

// // // //     if (!user) return res.status(404).json({ success: false, error: 'User tidak ditemukan' });
// // // //     res.json({ success: true, message: 'User berhasil diperbarui', user });
// // // //   } catch (error: any) {
// // // //     res.status(400).json({ success: false, error: error.message || 'Gagal update user' });
// // // //   }
// // // // });

// // // // // 5. DELETE USER
// // // // router.delete('/:id', requireAuth, requireSuperAdmin, async (req, res) => {
// // // //   try {
// // // //     const user = await User.findByIdAndDelete(req.params.id);
// // // //     if (!user) return res.status(404).json({ success: false, error: 'User tidak ditemukan' });

// // // //     await Progress.deleteMany({ userId: req.params.id });
// // // //     await Certificate.deleteMany({ userId: req.params.id });

// // // //     res.json({ success: true, message: 'User dan data terkait berhasil dihapus' });
// // // //   } catch (error) {
// // // //     res.status(500).json({ success: false, error: 'Gagal menghapus user' });
// // // //   }
// // // // });

// // // // export default router;


// // // import express, { Response } from 'express';
// // // import bcrypt from 'bcryptjs';
// // // import { z } from 'zod';
// // // import { User } from '../models/User'; 
// // // import { Progress } from '../models/Progress'; 
// // // import { Certificate } from '../models/Certificate';
// // // import { requireAuth, requireSuperAdmin, AuthedRequest } from '../middleware/auth';

// // // const router = express.Router();

// // // // --- SCHEMA VALIDASI ---
// // // const createUserSchema = z.object({
// // //   email: z.string().email("Format email tidak valid"),
// // //   name: z.string().min(1, "Nama harus diisi"),
// // //   role: z.enum(['STUDENT', 'FACILITATOR', 'ADMIN', 'SUPER_ADMIN']),
// // //   password: z.string().min(6, "Password minimal 6 karakter"),
// // //   regionScope: z.enum(['national', 'province', 'regency']).optional(),
// // //   managedProvinces: z.array(z.string()).optional(),
// // //   managedRegencies: z.array(z.string()).optional(),
// // //   permissions: z.array(z.string()).optional()
// // // });

// // // const updateUserSchema = z.object({
// // //   name: z.string().min(1).optional(),
// // //   role: z.enum(['STUDENT', 'FACILITATOR', 'ADMIN', 'SUPER_ADMIN']).optional(),
// // //   email: z.string().email().optional(),
// // //   regionScope: z.enum(['national', 'province', 'regency']).optional(),
// // //   managedProvinces: z.array(z.string()).optional(),
// // //   managedRegencies: z.array(z.string()).optional(),
// // //   permissions: z.array(z.string()).optional(),
// // //   isBanned: z.boolean().optional(),
// // //   bannedReason: z.string().optional()
// // // });

// // // // --- ROUTES ---

// // // // 1. GET ALL USERS
// // // router.get('/', requireAuth, requireSuperAdmin, async (req, res) => {
// // //   try {
// // //     const users = await User.find().select('-password').sort({ createdAt: -1 });
// // //     res.json({ success: true, users });
// // //   } catch (error) {
// // //     res.status(500).json({ success: false, error: 'Gagal mengambil daftar pengguna' });
// // //   }
// // // });

// // // // 2. GET USER DETAILS
// // // router.get('/:id/details', requireAuth, requireSuperAdmin, async (req: AuthedRequest, res: Response) => {
// // //   try {
// // //     const { id } = req.params;

// // //     const user = await User.findById(id).select('-password');
// // //     if (!user) {
// // //       return res.status(404).json({ success: false, error: 'User tidak ditemukan' });
// // //     }

// // //     let history: any[] = []; 
// // //     let certificates: any[] = [];

// // //     try {
// // //       history = await Progress.find({ userId: id })
// // //         .populate('courseId', 'title thumbnailUrl')
// // //         .lean();
// // //     } catch (e) {
// // //       console.error(`⚠️ Gagal fetch Progress user ${id}`);
// // //     }

// // //     try {
// // //       certificates = await Certificate.find({ userId: id })
// // //         .populate('courseId', 'title')
// // //         .lean();
// // //     } catch (e) {
// // //       console.error(`⚠️ Gagal fetch Certificates user ${id}`);
// // //     }

// // //     return res.json({
// // //       success: true,
// // //       user,
// // //       history,
// // //       certificates
// // //     });

// // //   } catch (error: any) {
// // //     console.error("🔥 Critical Admin Detail Error:", error.message);
// // //     return res.status(500).json({ 
// // //       success: false, 
// // //       error: 'Gagal memproses detail pengguna', 
// // //       message: error.message 
// // //     });
// // //   }
// // // });

// // // // 3. POST CREATE USER
// // // router.post('/', requireAuth, requireSuperAdmin, async (req, res) => {
// // //   try {
// // //     const data = createUserSchema.parse(req.body);
// // //     const existing = await User.findOne({ email: data.email });
// // //     if (existing) return res.status(400).json({ success: false, error: 'Email sudah terdaftar' });

// // //     const hashedPassword = await bcrypt.hash(data.password, 10);
    
// // //     const user = await User.create({
// // //       email: data.email,
// // //       name: data.name,
// // //       role: data.role,
// // //       password: hashedPassword,
// // //       regionScope: data.regionScope,
// // //       managedProvinces: data.managedProvinces,
// // //       managedRegencies: data.managedRegencies,
// // //       permissions: data.permissions
// // //     });

// // //     res.status(201).json({ success: true, message: 'User berhasil dibuat', userId: user._id });
// // //   } catch (error: any) {
// // //     res.status(400).json({ success: false, error: error.errors?.[0]?.message || error.message });
// // //   }
// // // });

// // // // 4. PATCH UPDATE USER
// // // router.patch('/:id', requireAuth, requireSuperAdmin, async (req, res) => {
// // //   try {
// // //     const validatedData = updateUserSchema.parse(req.body);
    
// // //     const user = await User.findByIdAndUpdate(
// // //       req.params.id, 
// // //       { $set: validatedData }, 
// // //       { new: true, runValidators: true }
// // //     ).select('-password');

// // //     if (!user) return res.status(404).json({ success: false, error: 'User tidak ditemukan' });
// // //     res.json({ success: true, message: 'User berhasil diperbarui', user });
// // //   } catch (error: any) {
// // //     res.status(400).json({ success: false, error: error.message || 'Gagal update user' });
// // //   }
// // // });

// // // // 5. DELETE USER (With Super Admin Safety Check)
// // // router.delete('/:id', requireAuth, requireSuperAdmin, async (req: AuthedRequest, res) => {
// // //   try {
// // //     const targetUser = await User.findById(req.params.id);
// // //     if (!targetUser) return res.status(404).json({ success: false, error: 'User tidak ditemukan' });

// // //     // [SAFETY] Jangan biarkan Super Admin menghapus dirinya sendiri
// // //     if (targetUser._id.toString() === req.user!.id) {
// // //         return res.status(400).json({ success: false, error: 'Anda tidak bisa menghapus akun sendiri.' });
// // //     }

// // //     await User.findByIdAndDelete(req.params.id);
// // //     await Progress.deleteMany({ userId: req.params.id });
// // //     await Certificate.deleteMany({ userId: req.params.id });

// // //     res.json({ success: true, message: 'User dan data terkait berhasil dihapus' });
// // //   } catch (error) {
// // //     res.status(500).json({ success: false, error: 'Gagal menghapus user' });
// // //   }
// // // });

// // // export default router;

// // import express, { Response } from 'express';
// // import bcrypt from 'bcryptjs';
// // import { z } from 'zod';
// // import { User } from '../models/User'; 
// // import { Progress } from '../models/Progress'; 
// // import { Certificate } from '../models/Certificate';
// // import { requireAuth, requireSuperAdmin, AuthedRequest } from '../middleware/auth';

// // const router = express.Router();

// // // --- SCHEMA VALIDASI (SAMA PERSIS DENGAN KODE LAMA ANDA) ---
// // const createUserSchema = z.object({
// //   email: z.string().email("Format email tidak valid"),
// //   name: z.string().min(1, "Nama harus diisi"),
// //   role: z.enum(['STUDENT', 'FACILITATOR', 'ADMIN', 'SUPER_ADMIN']),
// //   password: z.string().min(6, "Password minimal 6 karakter"),
// //   regionScope: z.enum(['national', 'province', 'regency']).optional(),
// //   managedProvinces: z.array(z.string()).optional(),
// //   managedRegencies: z.array(z.string()).optional(),
// //   permissions: z.array(z.string()).optional()
// // });

// // const updateUserSchema = z.object({
// //   name: z.string().min(1).optional(),
// //   role: z.enum(['STUDENT', 'FACILITATOR', 'ADMIN', 'SUPER_ADMIN']).optional(),
// //   email: z.string().email().optional(),
// //   regionScope: z.enum(['national', 'province', 'regency']).optional(),
// //   managedProvinces: z.array(z.string()).optional(),
// //   managedRegencies: z.array(z.string()).optional(),
// //   permissions: z.array(z.string()).optional(),
// //   isBanned: z.boolean().optional(),
// //   bannedReason: z.string().optional()
// // });

// // // --- ROUTES ---

// // // 1. GET ALL USERS (ORIGINAL)
// // router.get('/', requireAuth, requireSuperAdmin, async (req, res) => {
// //   try {
// //     const users = await User.find().select('-password').sort({ createdAt: -1 });
// //     res.json({ success: true, users });
// //   } catch (error) {
// //     res.status(500).json({ success: false, error: 'Gagal mengambil daftar pengguna' });
// //   }
// // });

// // // 2. GET USER DETAILS (ORIGINAL + ERROR HANDLING)
// // router.get('/:id/details', requireAuth, requireSuperAdmin, async (req: AuthedRequest, res: Response) => {
// //   try {
// //     const { id } = req.params;

// //     const user = await User.findById(id).select('-password');
// //     if (!user) {
// //       return res.status(404).json({ success: false, error: 'User tidak ditemukan' });
// //     }

// //     let history: any[] = []; 
// //     let certificates: any[] = [];

// //     // Gunakan try-catch per query agar jika Progress/Certificate error, User tetap tampil
// //     try {
// //       if (Progress) {
// //           history = await Progress.find({ userId: id })
// //             .populate('courseId', 'title thumbnailUrl')
// //             .lean();
// //       }
// //     } catch (e) {
// //       console.error(`⚠️ Gagal fetch Progress user ${id}`);
// //     }

// //     try {
// //       if (Certificate) {
// //           certificates = await Certificate.find({ userId: id })
// //             .populate('courseId', 'title')
// //             .lean();
// //       }
// //     } catch (e) {
// //       console.error(`⚠️ Gagal fetch Certificates user ${id}`);
// //     }

// //     return res.json({
// //       success: true,
// //       user,
// //       history,
// //       certificates
// //     });

// //   } catch (error: any) {
// //     console.error("🔥 Critical Admin Detail Error:", error.message);
// //     return res.status(500).json({ 
// //       success: false, 
// //       error: 'Gagal memproses detail pengguna', 
// //       message: error.message 
// //     });
// //   }
// // });

// // // 3. POST CREATE USER (ORIGINAL)
// // router.post('/', requireAuth, requireSuperAdmin, async (req, res) => {
// //   try {
// //     const data = createUserSchema.parse(req.body);
// //     const existing = await User.findOne({ email: data.email });
// //     if (existing) return res.status(400).json({ success: false, error: 'Email sudah terdaftar' });

// //     const hashedPassword = await bcrypt.hash(data.password, 10);
    
// //     const user = await User.create({
// //       email: data.email,
// //       name: data.name,
// //       role: data.role,
// //       password: hashedPassword,
// //       regionScope: data.regionScope,
// //       managedProvinces: data.managedProvinces,
// //       managedRegencies: data.managedRegencies,
// //       permissions: data.permissions
// //     });

// //     res.status(201).json({ success: true, message: 'User berhasil dibuat', userId: user._id });
// //   } catch (error: any) {
// //     res.status(400).json({ success: false, error: error.errors?.[0]?.message || error.message });
// //   }
// // });

// // // 4. PATCH UPDATE USER (ORIGINAL)
// // router.patch('/:id', requireAuth, requireSuperAdmin, async (req, res) => {
// //   try {
// //     const validatedData = updateUserSchema.parse(req.body);
    
// //     const user = await User.findByIdAndUpdate(
// //       req.params.id, 
// //       { $set: validatedData }, 
// //       { new: true, runValidators: true }
// //     ).select('-password');

// //     if (!user) return res.status(404).json({ success: false, error: 'User tidak ditemukan' });
// //     res.json({ success: true, message: 'User berhasil diperbarui', user });
// //   } catch (error: any) {
// //     res.status(400).json({ success: false, error: error.message || 'Gagal update user' });
// //   }
// // });

// // // --- [TAMBAHAN BARU] RESET PASSWORD (MANDIRI) ---
// // // Saya tambahkan ini di sini agar tidak perlu import dari controller luar
// // router.patch('/:id/reset-password', requireAuth, requireSuperAdmin, async (req, res) => {
// //     try {
// //         const { id } = req.params;
// //         const DEFAULT_PASS = '123456'; 

// //         // Hash password
// //         const salt = await bcrypt.genSalt(10);
// //         const hashedPassword = await bcrypt.hash(DEFAULT_PASS, salt);

// //         const user = await User.findByIdAndUpdate(
// //             id, 
// //             { password: hashedPassword },
// //             { new: true }
// //         );

// //         if (!user) return res.status(404).json({ success: false, error: 'User tidak ditemukan' });

// //         res.json({ 
// //             success: true,
// //             message: `Password user ${user.name} berhasil direset ke: ${DEFAULT_PASS}` 
// //         });
// //     } catch (error: any) {
// //         console.error("Reset Pass Error:", error);
// //         res.status(500).json({ success: false, error: error.message });
// //     }
// // });

// // // 5. DELETE USER (ORIGINAL WITH SAFETY)
// // router.delete('/:id', requireAuth, requireSuperAdmin, async (req: AuthedRequest, res) => {
// //   try {
// //     const targetUser = await User.findById(req.params.id);
// //     if (!targetUser) return res.status(404).json({ success: false, error: 'User tidak ditemukan' });

// //     // [SAFETY] Jangan biarkan Super Admin menghapus dirinya sendiri
// //     if (targetUser._id.toString() === req.user!.id) {
// //         return res.status(400).json({ success: false, error: 'Anda tidak bisa menghapus akun sendiri.' });
// //     }

// //     await User.findByIdAndDelete(req.params.id);
// //     try {
// //         if (Progress) await Progress.deleteMany({ userId: req.params.id });
// //         if (Certificate) await Certificate.deleteMany({ userId: req.params.id });
// //     } catch(e) {}

// //     res.json({ success: true, message: 'User dan data terkait berhasil dihapus' });
// //   } catch (error) {
// //     res.status(500).json({ success: false, error: 'Gagal menghapus user' });
// //   }
// // });

// // export default router;


// import express, { Response } from 'express';
// import bcrypt from 'bcryptjs';
// import { z } from 'zod';
// import { User } from '../models/User'; 
// import { Progress } from '../models/Progress'; 
// import { Certificate } from '../models/Certificate';
// import { requireAuth, requireSuperAdmin, AuthedRequest } from '../middleware/auth';

// const router = express.Router();

// // --- SCHEMA VALIDASI ---
// const createUserSchema = z.object({
//   email: z.string().email("Format email tidak valid"),
//   name: z.string().min(1, "Nama harus diisi"),
//   role: z.enum(['STUDENT', 'FACILITATOR', 'ADMIN', 'SUPER_ADMIN']),
//   password: z.string().min(6, "Password minimal 6 karakter"),
//   regionScope: z.enum(['national', 'province', 'regency']).optional(),
//   managedProvinces: z.array(z.string()).optional(),
//   managedRegencies: z.array(z.string()).optional(),
//   permissions: z.array(z.string()).optional() // Permission Wajib Ada
// });

// const updateUserSchema = z.object({
//   name: z.string().min(1).optional(),
//   role: z.enum(['STUDENT', 'FACILITATOR', 'ADMIN', 'SUPER_ADMIN']).optional(),
//   email: z.string().email().optional(),
//   regionScope: z.enum(['national', 'province', 'regency']).optional(),
//   managedProvinces: z.array(z.string()).optional(),
//   managedRegencies: z.array(z.string()).optional(),
//   permissions: z.array(z.string()).optional(), // Permission Wajib Ada
//   isBanned: z.boolean().optional(),
//   bannedReason: z.string().optional()
// });

// // --- ROUTES ---

// // 1. GET ALL USERS
// router.get('/', requireAuth, requireSuperAdmin, async (req, res) => {
//   try {
//     const users = await User.find().select('-password').sort({ createdAt: -1 });
//     res.json({ success: true, users });
//   } catch (error) {
//     res.status(500).json({ success: false, error: 'Gagal mengambil daftar pengguna' });
//   }
// });

// // 2. GET USER DETAILS
// router.get('/:id/details', requireAuth, requireSuperAdmin, async (req: AuthedRequest, res: Response) => {
//   try {
//     const { id } = req.params;
//     // Pastikan permissions tidak di-exclude
//     const user = await User.findById(id).select('-password');
//     if (!user) return res.status(404).json({ success: false, error: 'User tidak ditemukan' });

//     let history: any[] = []; 
//     let certificates: any[] = [];

//     try { if (Progress) history = await Progress.find({ userId: id }).populate('courseId', 'title thumbnailUrl').lean(); } catch (e) {}
//     try { if (Certificate) certificates = await Certificate.find({ userId: id }).populate('courseId', 'title').lean(); } catch (e) {}

//     return res.json({ success: true, user, history, certificates });
//   } catch (error: any) {
//     return res.status(500).json({ success: false, error: error.message });
//   }
// });

// // 3. POST CREATE USER
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
//       password: hashedPassword,
//       regionScope: data.regionScope,
//       managedProvinces: data.managedProvinces,
//       managedRegencies: data.managedRegencies,
//       permissions: data.permissions
//     });

//     res.status(201).json({ success: true, message: 'User berhasil dibuat', userId: user._id });
//   } catch (error: any) {
//     res.status(400).json({ success: false, error: error.errors?.[0]?.message || error.message });
//   }
// });

// // 4. PATCH UPDATE USER (Termasuk Permission)
// router.patch('/:id', requireAuth, requireSuperAdmin, async (req, res) => {
//   try {
//     const validatedData = updateUserSchema.parse(req.body);
//     // $set akan mengupdate field apapun yang dikirim, termasuk 'permissions'
//     const user = await User.findByIdAndUpdate(req.params.id, { $set: validatedData }, { new: true }).select('-password');
//     if (!user) return res.status(404).json({ success: false, error: 'User tidak ditemukan' });
//     res.json({ success: true, message: 'User berhasil diperbarui', user });
//   } catch (error: any) {
//     res.status(400).json({ success: false, error: error.message });
//   }
// });

// // 5. RESET PASSWORD
// router.patch('/:id/reset-password', requireAuth, requireSuperAdmin, async (req, res) => {
//     try {
//         const { id } = req.params;
//         const DEFAULT_PASS = '123456'; 
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(DEFAULT_PASS, salt);
//         const user = await User.findByIdAndUpdate(id, { password: hashedPassword }, { new: true });
//         if (!user) return res.status(404).json({ success: false, error: 'User tidak ditemukan' });
//         res.json({ success: true, message: `Password reset ke: ${DEFAULT_PASS}` });
//     } catch (error: any) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// });

// // 6. DELETE USER
// router.delete('/:id', requireAuth, requireSuperAdmin, async (req: AuthedRequest, res) => {
//   try {
//     const targetUser = await User.findById(req.params.id);
//     if (!targetUser) return res.status(404).json({ success: false, error: 'User tidak ditemukan' });
//     if (targetUser._id.toString() === req.user!.id) return res.status(400).json({ success: false, error: 'Tidak bisa hapus akun sendiri.' });

//     await User.findByIdAndDelete(req.params.id);
//     try {
//         if (Progress) await Progress.deleteMany({ userId: req.params.id });
//         if (Certificate) await Certificate.deleteMany({ userId: req.params.id });
//     } catch(e) {}

//     res.json({ success: true, message: 'User dihapus' });
//   } catch (error) {
//     res.status(500).json({ success: false, error: 'Gagal hapus' });
//   }
// });

// export default router;


import express, { Response } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { User } from '../models/User'; 
import { Progress } from '../models/Progress'; 
import { Certificate } from '../models/Certificate';
import { requireAuth, requireSuperAdmin, AuthedRequest } from '../middleware/auth';
// [PENTING] Import controller yang sudah ada limit-nya
import { getAllUsers } from '../controllers/userController';

const router = express.Router();

// --- SCHEMA VALIDASI ---
const createUserSchema = z.object({
  email: z.string().email("Format email tidak valid"),
  name: z.string().min(1, "Nama harus diisi"),
  role: z.enum(['STUDENT', 'FACILITATOR', 'ADMIN', 'SUPER_ADMIN']),
  password: z.string().min(6, "Password minimal 6 karakter"),
  regionScope: z.enum(['national', 'province', 'regency']).optional(),
  managedProvinces: z.array(z.string()).optional(),
  managedRegencies: z.array(z.string()).optional(),
  permissions: z.array(z.string()).optional() // Permission Wajib Ada
});

const updateUserSchema = z.object({
  name: z.string().min(1).optional(),
  role: z.enum(['STUDENT', 'FACILITATOR', 'ADMIN', 'SUPER_ADMIN']).optional(),
  email: z.string().email().optional(),
  regionScope: z.enum(['national', 'province', 'regency']).optional(),
  managedProvinces: z.array(z.string()).optional(),
  managedRegencies: z.array(z.string()).optional(),
  permissions: z.array(z.string()).optional(), // Permission Wajib Ada
  isBanned: z.boolean().optional(),
  bannedReason: z.string().optional()
});

// --- ROUTES ---

// 1. GET ALL USERS (UPDATED)
// Menggunakan controller 'getAllUsers' agar performa aman (ada limit 3000)
router.get('/', requireAuth, requireSuperAdmin, getAllUsers);

// 2. GET USER DETAILS
router.get('/:id/details', requireAuth, requireSuperAdmin, async (req: AuthedRequest, res: Response) => {
  try {
    const { id } = req.params;
    // Pastikan permissions tidak di-exclude
    const user = await User.findById(id).select('-password');
    if (!user) return res.status(404).json({ success: false, error: 'User tidak ditemukan' });

    let history: any[] = []; 
    let certificates: any[] = [];

    try { if (Progress) history = await Progress.find({ userId: id }).populate('courseId', 'title thumbnailUrl').lean(); } catch (e) {}
    try { if (Certificate) certificates = await Certificate.find({ userId: id }).populate('courseId', 'title').lean(); } catch (e) {}

    return res.json({ success: true, user, history, certificates });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
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
      password: hashedPassword,
      regionScope: data.regionScope,
      managedProvinces: data.managedProvinces,
      managedRegencies: data.managedRegencies,
      permissions: data.permissions
    });

    res.status(201).json({ success: true, message: 'User berhasil dibuat', userId: user._id });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.errors?.[0]?.message || error.message });
  }
});

// 4. PATCH UPDATE USER (Termasuk Permission)
router.patch('/:id', requireAuth, requireSuperAdmin, async (req, res) => {
  try {
    const validatedData = updateUserSchema.parse(req.body);
    // $set akan mengupdate field apapun yang dikirim, termasuk 'permissions'
    const user = await User.findByIdAndUpdate(req.params.id, { $set: validatedData }, { new: true }).select('-password');
    if (!user) return res.status(404).json({ success: false, error: 'User tidak ditemukan' });
    res.json({ success: true, message: 'User berhasil diperbarui', user });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// 5. RESET PASSWORD
router.patch('/:id/reset-password', requireAuth, requireSuperAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const DEFAULT_PASS = '123456'; 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(DEFAULT_PASS, salt);
    const user = await User.findByIdAndUpdate(id, { password: hashedPassword }, { new: true });
    if (!user) return res.status(404).json({ success: false, error: 'User tidak ditemukan' });
    res.json({ success: true, message: `Password reset ke: ${DEFAULT_PASS}` });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 6. DELETE USER
router.delete('/:id', requireAuth, requireSuperAdmin, async (req: AuthedRequest, res) => {
  try {
    const targetUser = await User.findById(req.params.id);
    if (!targetUser) return res.status(404).json({ success: false, error: 'User tidak ditemukan' });
    if (targetUser._id.toString() === req.user!.id) return res.status(400).json({ success: false, error: 'Tidak bisa hapus akun sendiri.' });

    await User.findByIdAndDelete(req.params.id);
    try {
        if (Progress) await Progress.deleteMany({ userId: req.params.id });
        if (Certificate) await Certificate.deleteMany({ userId: req.params.id });
    } catch(e) {}

    res.json({ success: true, message: 'User dihapus' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Gagal hapus' });
  }
});

export default router;
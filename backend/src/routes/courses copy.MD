// // // // // // // // import express, { Response } from 'express';
// // // // // // // // import { Course } from '../models/Course'; 
// // // // // // // // import { Progress } from '../models/Progress'; 
// // // // // // // // import { User } from '../models/User'; 
// // // // // // // // import { Notification } from '../models/Notification';
// // // // // // // // import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth';

// // // // // // // // const router = express.Router();

// // // // // // // // const checkAccess = (course: any, user: any) => {
// // // // // // // //     if (user.role === 'SUPER_ADMIN') return true;
// // // // // // // //     return course.facilitatorIds && course.facilitatorIds.some((id: any) => id.toString() === user.id);
// // // // // // // // };

// // // // // // // // // 1. GET PUBLIC
// // // // // // // // router.get('/', async (req, res) => {
// // // // // // // //   try {
// // // // // // // //     const courses = await Course.find({ isPublished: true }).populate('facilitatorIds', 'name').sort({ createdAt: -1 });
// // // // // // // //     res.json({ courses });
// // // // // // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // });

// // // // // // // // // 2. GET ADMIN ALL
// // // // // // // // router.get('/admin/all', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
// // // // // // // //   try {
// // // // // // // //     const query = req.user!.role === 'SUPER_ADMIN' ? {} : { facilitatorIds: req.user!.id };
// // // // // // // //     const courses = await Course.find(query).populate('facilitatorIds', 'name email role').sort({ createdAt: -1 });
// // // // // // // //     res.json({ courses });
// // // // // // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // });

// // // // // // // // // 3. GET SINGLE
// // // // // // // // router.get('/:id', async (req, res) => {
// // // // // // // //   try {
// // // // // // // //     const course = await Course.findById(req.params.id)
// // // // // // // //       .populate('facilitatorIds', 'name email role')
// // // // // // // //       .populate({ path: 'modules.facilitatorId', model: 'User', select: 'name' });
// // // // // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // // // // // // //     res.json({ course });
// // // // // // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // });

// // // // // // // // // 4. PUBLISH & BLAST NOTIFICATION (FITUR BARU)
// // // // // // // // router.patch('/:id/publish', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // //     try {
// // // // // // // //         const courseId = req.params.id;
        
// // // // // // // //         // Update Status Menjadi Published
// // // // // // // //         const course = await Course.findByIdAndUpdate(courseId, { isPublished: true }, { new: true });
        
// // // // // // // //         if (!course) return res.status(404).json({ error: 'Pelatihan tidak ditemukan' });

// // // // // // // //         // BLASTING KE SEMUA USER (Kecuali Admin yg nge-klik)
// // // // // // // //         const allUsers = await User.find({ _id: { $ne: req.user!.id } }).select('_id');
        
// // // // // // // //         if (allUsers.length > 0) {
// // // // // // // //             const notifs = allUsers.map(u => ({
// // // // // // // //                 recipient: u._id,
// // // // // // // //                 sender: req.user!.id,
// // // // // // // //                 type: 'course', // Tipe Course
// // // // // // // //                 topic: course._id,
// // // // // // // //                 message: `Pelatihan Baru Dibuka: "${course.title}". Daftar Sekarang!`,
// // // // // // // //                 isRead: false,
// // // // // // // //                 createdAt: new Date()
// // // // // // // //             }));

// // // // // // // //             await Notification.insertMany(notifs);
// // // // // // // //         }

// // // // // // // //         res.json({ message: 'Pelatihan dipublikasikan dan notifikasi dikirim.', course });
// // // // // // // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // // // // });

// // // // // // // // // ... (Sisa Route CRUD Lainnya sama seperti sebelumnya) ...
// // // // // // // // // Create
// // // // // // // // router.post('/', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
// // // // // // // //   try {
// // // // // // // //     const { title, description, price, category, programType, thumbnailUrl } = req.body;
// // // // // // // //     const course = await Course.create({
// // // // // // // //       title, description: description || 'Deskripsi belum diisi.', price: price || 0,
// // // // // // // //       category: category || 'General', programType: programType || 'course', thumbnailUrl: thumbnailUrl || '',
// // // // // // // //       facilitatorIds: [req.user!.id], modules: [], isPublished: false 
// // // // // // // //     });
// // // // // // // //     res.status(201).json({ message: 'Berhasil dibuat', course });
// // // // // // // //   } catch (error: any) { res.status(400).json({ error: error.message }); }
// // // // // // // // });

// // // // // // // // // Update
// // // // // // // // router.put('/:id', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
// // // // // // // //   try {
// // // // // // // //     const course = await Course.findById(req.params.id);
// // // // // // // //     if (!course) return res.status(404).json({ error: 'Tidak ditemukan' });
// // // // // // // //     if (!checkAccess(course, req.user)) return res.status(403).json({ error: 'Akses ditolak' });
    
// // // // // // // //     // Update logic sederhana (bisa disesuaikan kebutuhan)
// // // // // // // //     Object.assign(course, req.body);
// // // // // // // //     await course.save();
// // // // // // // //     res.json({ message: 'Berhasil diperbarui', course });
// // // // // // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // });

// // // // // // // // // Delete
// // // // // // // // router.delete('/:id', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
// // // // // // // //   try {
// // // // // // // //     const course = await Course.findById(req.params.id);
// // // // // // // //     if (!course) return res.status(404).json({ error: 'Tidak ditemukan' });
// // // // // // // //     if (!checkAccess(course, req.user)) return res.status(403).json({ error: 'Akses ditolak' });
// // // // // // // //     await Course.findByIdAndDelete(req.params.id);
// // // // // // // //     await Progress.deleteMany({ courseId: req.params.id });
// // // // // // // //     res.json({ message: 'Berhasil dihapus' });
// // // // // // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // });

// // // // // // // // export default router;
// // // // // // // import express, { Response } from 'express';
// // // // // // // import { Course } from '../models/Course'; 
// // // // // // // import { Progress } from '../models/Progress'; 
// // // // // // // import { User } from '../models/User'; 
// // // // // // // import { Notification } from '../models/Notification';
// // // // // // // import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth';

// // // // // // // const router = express.Router();

// // // // // // // const checkAccess = (course: any, user: any) => {
// // // // // // //     if (user.role === 'SUPER_ADMIN') return true;
// // // // // // //     return course.facilitatorIds && course.facilitatorIds.some((id: any) => id.toString() === user.id);
// // // // // // // };

// // // // // // // // 1. GET PUBLIC
// // // // // // // router.get('/', async (req, res) => {
// // // // // // //   try {
// // // // // // //     const courses = await Course.find({ isPublished: true }).populate('facilitatorIds', 'name').sort({ createdAt: -1 });
// // // // // // //     res.json({ courses });
// // // // // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // });

// // // // // // // // 2. GET ADMIN ALL
// // // // // // // router.get('/admin/all', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
// // // // // // //   try {
// // // // // // //     const query = req.user!.role === 'SUPER_ADMIN' ? {} : { facilitatorIds: req.user!.id };
// // // // // // //     const courses = await Course.find(query).populate('facilitatorIds', 'name email role').sort({ createdAt: -1 });
// // // // // // //     res.json({ courses });
// // // // // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // });

// // // // // // // // 3. GET SINGLE
// // // // // // // router.get('/:id', async (req, res) => {
// // // // // // //   try {
// // // // // // //     const course = await Course.findById(req.params.id)
// // // // // // //       .populate('facilitatorIds', 'name email role')
// // // // // // //       .populate({ path: 'modules.facilitatorId', model: 'User', select: 'name' });
// // // // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // // // // // //     res.json({ course });
// // // // // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // });

// // // // // // // // 4. PUBLISH & BLAST NOTIFICATION
// // // // // // // router.patch('/:id/publish', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // //     try {
// // // // // // //         const courseId = req.params.id;
// // // // // // //         const course = await Course.findByIdAndUpdate(courseId, { isPublished: true }, { new: true });
        
// // // // // // //         if (!course) return res.status(404).json({ error: 'Pelatihan tidak ditemukan' });

// // // // // // //         const allUsers = await User.find({ _id: { $ne: req.user!.id } }).select('_id');
        
// // // // // // //         if (allUsers.length > 0) {
// // // // // // //             const notifs = allUsers.map(u => ({
// // // // // // //                 recipient: u._id,
// // // // // // //                 sender: req.user!.id,
// // // // // // //                 type: 'course', 
// // // // // // //                 topic: course._id,
// // // // // // //                 message: `Pelatihan Baru Dibuka: "${course.title}". Daftar Sekarang!`,
// // // // // // //                 isRead: false,
// // // // // // //                 createdAt: new Date()
// // // // // // //             }));
// // // // // // //             await Notification.insertMany(notifs);
// // // // // // //         }
// // // // // // //         res.json({ message: 'Pelatihan dipublikasikan dan notifikasi dikirim.', course });
// // // // // // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // // // });

// // // // // // // // --- COURSE MANAGEMENT ---

// // // // // // // // Create
// // // // // // // router.post('/', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
// // // // // // //   try {
// // // // // // //     const { title, description, price, category, programType, thumbnailUrl, organizer } = req.body;
    
// // // // // // //     const course = await Course.create({
// // // // // // //       title, description: description || 'Deskripsi belum diisi.', price: price || 0,
// // // // // // //       category: category || 'General', programType: programType || 'course', thumbnailUrl: thumbnailUrl || '',
// // // // // // //       organizer: organizer || 'PMI Pusat', // Default
// // // // // // //       facilitatorIds: [req.user!.id], modules: [], isPublished: false 
// // // // // // //     });
// // // // // // //     res.status(201).json({ message: 'Berhasil dibuat', course });
// // // // // // //   } catch (error: any) { res.status(400).json({ error: error.message }); }
// // // // // // // });

// // // // // // // // Update
// // // // // // // router.put('/:id', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
// // // // // // //   try {
// // // // // // //     const { 
// // // // // // //         title, description, price, category, isPublished, thumbnailUrl, 
// // // // // // //         competencies, certificateConfig, facilitatorIds, programType, 
// // // // // // //         includeCompetenciesInCertificate, organizer 
// // // // // // //     } = req.body;

// // // // // // //     const course = await Course.findById(req.params.id);
// // // // // // //     if (!course) return res.status(404).json({ error: 'Tidak ditemukan' });
// // // // // // //     if (!checkAccess(course, req.user)) return res.status(403).json({ error: 'Akses ditolak' });

// // // // // // //     if (title) course.title = title;
// // // // // // //     if (description) course.description = description;
// // // // // // //     if (price !== undefined) course.price = price;
// // // // // // //     if (category) course.category = category;
// // // // // // //     if (thumbnailUrl) course.thumbnailUrl = thumbnailUrl;
// // // // // // //     if (isPublished !== undefined) course.isPublished = isPublished;
// // // // // // //     if (programType) course.programType = programType;
// // // // // // //     if (competencies) course.competencies = competencies;
    
// // // // // // //     // [BARU] Update Organizer
// // // // // // //     if (organizer) course.organizer = organizer;

// // // // // // //     if (includeCompetenciesInCertificate !== undefined) course.includeCompetenciesInCertificate = includeCompetenciesInCertificate;
// // // // // // //     if (certificateConfig) course.certificateConfig = { ...course.certificateConfig, ...certificateConfig };
// // // // // // //     if (req.user!.role === 'SUPER_ADMIN' && facilitatorIds) course.facilitatorIds = facilitatorIds;

// // // // // // //     await course.save();
// // // // // // //     res.json({ message: 'Berhasil diperbarui', course });
// // // // // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // });

// // // // // // // // Delete
// // // // // // // router.delete('/:id', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
// // // // // // //   try {
// // // // // // //     const course = await Course.findById(req.params.id);
// // // // // // //     if (!course) return res.status(404).json({ error: 'Tidak ditemukan' });
// // // // // // //     if (!checkAccess(course, req.user)) return res.status(403).json({ error: 'Akses ditolak' });
// // // // // // //     await Course.findByIdAndDelete(req.params.id);
// // // // // // //     await Progress.deleteMany({ courseId: req.params.id });
// // // // // // //     res.json({ message: 'Berhasil dihapus' });
// // // // // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // });

// // // // // // // // --- MODULE MANAGEMENT --- (Kode modul & lesson tetap sama, hanya scheduleDate yang baru ditambahkan di model sebelumnya)
// // // // // // // router.post('/:id/modules', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
// // // // // // //     try {
// // // // // // //         const course = await Course.findById(req.params.id);
// // // // // // //         if(!course) return res.status(404).json({error: 'Not found'});
// // // // // // //         course.modules.push({ 
// // // // // // //             title: req.body.title, lessons: [], order: course.modules.length, 
// // // // // // //             isActive: true, isMandatory: true, jp: req.body.jp || 0,
// // // // // // //             scheduleDate: req.body.scheduleDate || null // Tanggal Modul
// // // // // // //         } as any);
// // // // // // //         await course.save(); res.json(course);
// // // // // // //     } catch(e:any){ res.status(500).json({error:e.message})}
// // // // // // // });

// // // // // // // router.put('/:id/modules/:moduleId', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
// // // // // // //     try {
// // // // // // //         const course = await Course.findById(req.params.id);
// // // // // // //         if(!course) return res.status(404).json({error: 'Not found'});
// // // // // // //         const mod = course.modules.find((m: any) => m._id.toString() === req.params.moduleId);
// // // // // // //         if(mod) {
// // // // // // //             if(req.body.title) mod.title = req.body.title;
// // // // // // //             if(req.body.isActive !== undefined) mod.isActive = req.body.isActive;
// // // // // // //             if(req.body.jp !== undefined) mod.jp = req.body.jp;
// // // // // // //             if(req.body.scheduleDate !== undefined) mod.scheduleDate = req.body.scheduleDate; // Update Tanggal
// // // // // // //             await course.save();
// // // // // // //         }
// // // // // // //         res.json(course);
// // // // // // //     } catch(e:any){ res.status(500).json({error:e.message})}
// // // // // // // });

// // // // // // // // ... (Sisa Route Lesson & Utils tidak berubah logicnya, cukup pastikan scheduleDate bisa masuk jika dikirim frontend)

// // // // // // // export default router;
// // // // // // import express, { Response } from 'express';
// // // // // // import { Course } from '../models/Course'; 
// // // // // // import { Progress } from '../models/Progress'; 
// // // // // // import { User } from '../models/User'; 
// // // // // // import { Notification } from '../models/Notification';
// // // // // // import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth';

// // // // // // const router = express.Router();

// // // // // // // HELPER: CEK AKSES
// // // // // // // Memastikan user adalah Super Admin atau Fasilitator yang terdaftar di kursus ini
// // // // // // const checkAccess = (course: any, user: any) => {
// // // // // //     if (user.role === 'SUPER_ADMIN') return true;
// // // // // //     return course.facilitatorIds && course.facilitatorIds.some((id: any) => id.toString() === user.id);
// // // // // // };

// // // // // // // --- GET ROUTES ---

// // // // // // // 1. Get All Public Courses (Untuk Katalog Siswa)
// // // // // // router.get('/', async (req, res) => {
// // // // // //   try {
// // // // // //     const courses = await Course.find({ isPublished: true })
// // // // // //         .populate('facilitatorIds', 'name')
// // // // // //         .sort({ createdAt: -1 });
// // // // // //     res.json({ courses });
// // // // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // });

// // // // // // // 2. Get All Admin Courses (Untuk Dashboard Admin/Fasilitator)
// // // // // // router.get('/admin/all', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
// // // // // //   try {
// // // // // //     // Super Admin lihat semua, Fasilitator hanya lihat yang dia ajar
// // // // // //     const query = req.user!.role === 'SUPER_ADMIN' ? {} : { facilitatorIds: req.user!.id };
    
// // // // // //     const courses = await Course.find(query)
// // // // // //         .populate('facilitatorIds', 'name email role')
// // // // // //         .sort({ createdAt: -1 });
// // // // // //     res.json({ courses });
// // // // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // });

// // // // // // // 3. Get Single Course Detail
// // // // // // router.get('/:id', async (req, res) => {
// // // // // //   try {
// // // // // //     const course = await Course.findById(req.params.id)
// // // // // //       .populate('facilitatorIds', 'name email role')
// // // // // //       // Populate facilitator spesifik per modul
// // // // // //       .populate({
// // // // // //           path: 'modules.facilitatorId',
// // // // // //           model: 'User',
// // // // // //           select: 'name'
// // // // // //       });
      
// // // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // // // // //     res.json({ course });
// // // // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // });

// // // // // // // 4. Get Course Participants with REAL PROGRESS
// // // // // // router.get('/:id/participants', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // //   try {
// // // // // //     const courseId = req.params.id;

// // // // // //     // A. Hitung Total Lesson Aktif
// // // // // //     const course = await Course.findById(courseId);
// // // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });

// // // // // //     let totalLessons = 0;
// // // // // //     course.modules.forEach((m: any) => {
// // // // // //         if(m.isActive) {
// // // // // //             m.lessons.forEach((l: any) => {
// // // // // //                 if(l.isActive) totalLessons++;
// // // // // //             });
// // // // // //         }
// // // // // //     });

// // // // // //     // B. Ambil Semua Student
// // // // // //     const students = await User.find({ role: 'STUDENT' }).select('name email avatarUrl createdAt');

// // // // // //     // C. Ambil Progress
// // // // // //     const progresses = await Progress.find({ courseId: courseId });

// // // // // //     // D. Gabungkan Data
// // // // // //     const participants = students.map(student => {
// // // // // //         const studentProgress = progresses.find(p => p.userId.toString() === student._id.toString());
// // // // // //         let progressPercent = 0;
// // // // // //         let isCompleted = false;

// // // // // //         if (studentProgress) {
// // // // // //             const completedCount = studentProgress.completedLessons.length;
// // // // // //             if (totalLessons > 0) {
// // // // // //                 progressPercent = Math.round((completedCount / totalLessons) * 100);
// // // // // //             }
// // // // // //             if (progressPercent > 100) progressPercent = 100;
// // // // // //             isCompleted = studentProgress.completed || progressPercent === 100;
// // // // // //         }

// // // // // //         return {
// // // // // //             _id: student._id,
// // // // // //             name: student.name,
// // // // // //             email: student.email,
// // // // // //             avatarUrl: student.avatarUrl,
// // // // // //             joinDate: student.createdAt,
// // // // // //             progress: progressPercent,
// // // // // //             isCertified: isCompleted
// // // // // //         };
// // // // // //     });

// // // // // //     res.json({ participants });
// // // // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // });

// // // // // // // --- FITUR BLASTING / PUBLISH ---

// // // // // // router.patch('/:id/publish', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // //     try {
// // // // // //         const courseId = req.params.id;
        
// // // // // //         // Update Status Menjadi Published
// // // // // //         const course = await Course.findByIdAndUpdate(courseId, { isPublished: true }, { new: true });
        
// // // // // //         if (!course) return res.status(404).json({ error: 'Pelatihan tidak ditemukan' });

// // // // // //         // BLASTING KE SEMUA USER (Kecuali Admin yg nge-klik)
// // // // // //         const allUsers = await User.find({ _id: { $ne: req.user!.id } }).select('_id');
        
// // // // // //         if (allUsers.length > 0) {
// // // // // //             const notifs = allUsers.map(u => ({
// // // // // //                 recipient: u._id,
// // // // // //                 sender: req.user!.id,
// // // // // //                 type: 'course', // Tipe Course
// // // // // //                 topic: course._id,
// // // // // //                 message: `Pelatihan Baru Dibuka: "${course.title}". Daftar Sekarang!`,
// // // // // //                 isRead: false,
// // // // // //                 createdAt: new Date()
// // // // // //             }));

// // // // // //             await Notification.insertMany(notifs);
// // // // // //         }

// // // // // //         res.json({ message: 'Pelatihan dipublikasikan dan notifikasi dikirim.', course });
// // // // // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // // });

// // // // // // // --- COURSE MANAGEMENT (CREATE, UPDATE, DELETE) ---

// // // // // // router.post('/', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // //   try {
// // // // // //     // [UPDATE] Menerima field organizer
// // // // // //     const { title, description, price, category, programType, thumbnailUrl, organizer } = req.body;
    
// // // // // //     const course = await Course.create({
// // // // // //       title, 
// // // // // //       description: description || 'Deskripsi belum diisi.', 
// // // // // //       price: price || 0,
// // // // // //       category: category || 'General', 
// // // // // //       programType: programType || 'course', 
// // // // // //       thumbnailUrl: thumbnailUrl || '',
// // // // // //       organizer: organizer || 'PMI Pusat', // Default Value
// // // // // //       facilitatorIds: [req.user!.id], 
// // // // // //       modules: [], 
// // // // // //       isPublished: false 
// // // // // //     });

// // // // // //     res.status(201).json({ message: 'Berhasil dibuat', course });
// // // // // //   } catch (error: any) { res.status(400).json({ error: error.message }); }
// // // // // // });

// // // // // // router.put('/:id', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // //   try {
// // // // // //     const { 
// // // // // //         title, description, price, category, isPublished, thumbnailUrl, 
// // // // // //         competencies, certificateConfig, facilitatorIds, programType, 
// // // // // //         includeCompetenciesInCertificate, organizer // [UPDATE] Menerima organizer
// // // // // //     } = req.body;

// // // // // //     const course = await Course.findById(req.params.id);
// // // // // //     if (!course) return res.status(404).json({ error: 'Tidak ditemukan' });
// // // // // //     if (!checkAccess(course, req.user)) return res.status(403).json({ error: 'Akses ditolak' });

// // // // // //     // Update Fields
// // // // // //     if (title) course.title = title;
// // // // // //     if (description) course.description = description;
// // // // // //     if (price !== undefined) course.price = price;
// // // // // //     if (category) course.category = category;
// // // // // //     if (thumbnailUrl) course.thumbnailUrl = thumbnailUrl;
// // // // // //     if (isPublished !== undefined) course.isPublished = isPublished;
// // // // // //     if (programType) course.programType = programType;
// // // // // //     if (competencies) course.competencies = competencies;
    
// // // // // //     // [UPDATE] Simpan Organizer
// // // // // //     if (organizer) course.organizer = organizer;

// // // // // //     if (includeCompetenciesInCertificate !== undefined) {
// // // // // //         course.includeCompetenciesInCertificate = includeCompetenciesInCertificate;
// // // // // //     }
    
// // // // // //     if (certificateConfig) {
// // // // // //       if (!course.certificateConfig) {
// // // // // //           course.certificateConfig = { 
// // // // // //               certificateNumber: '', executionDate: new Date(), city: '', signatoryName: '', signatoryPosition: '' 
// // // // // //           };
// // // // // //       }
// // // // // //       course.certificateConfig = { ...course.certificateConfig, ...certificateConfig };
// // // // // //     }

// // // // // //     if (req.user!.role === 'SUPER_ADMIN' && facilitatorIds && Array.isArray(facilitatorIds)) {
// // // // // //        course.facilitatorIds = facilitatorIds;
// // // // // //     }

// // // // // //     await course.save();
// // // // // //     res.json({ message: 'Berhasil diperbarui', course });
// // // // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // });

// // // // // // router.delete('/:id', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // //   try {
// // // // // //     const course = await Course.findById(req.params.id);
// // // // // //     if (!course) return res.status(404).json({ error: 'Tidak ditemukan' });
// // // // // //     if (!checkAccess(course, req.user)) return res.status(403).json({ error: 'Akses ditolak' });
    
// // // // // //     await Course.findByIdAndDelete(req.params.id);
// // // // // //     await Progress.deleteMany({ courseId: req.params.id }); // Clean up

// // // // // //     res.json({ message: 'Berhasil dihapus' });
// // // // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // });

// // // // // // // --- MODULE MANAGEMENT ---

// // // // // // router.post('/:id/modules', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // //   try {
// // // // // //     const course = await Course.findById(req.params.id);
// // // // // //     if (!course) return res.status(404).json({ error: 'Tidak ditemukan' });
// // // // // //     if (!checkAccess(course, req.user)) return res.status(403).json({ error: 'Akses ditolak' });

// // // // // //     course.modules.push({ 
// // // // // //         title: req.body.title, 
// // // // // //         lessons: [], 
// // // // // //         order: course.modules.length, 
// // // // // //         isActive: req.body.isActive === true,
// // // // // //         isMandatory: req.body.isMandatory !== false,
// // // // // //         facilitatorId: req.body.facilitatorId || undefined,
// // // // // //         jp: req.body.jp || 0,
// // // // // //         scheduleDate: req.body.scheduleDate || null // [UPDATE] Simpan Tanggal
// // // // // //     } as any);
    
// // // // // //     await course.save();
// // // // // //     res.json(course);
// // // // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // });

// // // // // // router.put('/:id/modules/:moduleId', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // //   try {
// // // // // //     const course = await Course.findById(req.params.id);
// // // // // //     if (!course) return res.status(404).json({ error: 'Tidak ditemukan' });
// // // // // //     if (!checkAccess(course, req.user)) return res.status(403).json({ error: 'Akses ditolak' });

// // // // // //     const mod = course.modules.find((m: any) => m._id.toString() === req.params.moduleId);
// // // // // //     if (!mod) return res.status(404).json({ error: 'Modul tidak ditemukan' });

// // // // // //     if (req.body.title) mod.title = req.body.title;
// // // // // //     if (req.body.isActive !== undefined) mod.isActive = req.body.isActive;
// // // // // //     if (req.body.isMandatory !== undefined) mod.isMandatory = req.body.isMandatory;
// // // // // //     if (req.body.jp !== undefined) mod.jp = req.body.jp;
    
// // // // // //     // [UPDATE] Update Tanggal Modul
// // // // // //     if (req.body.scheduleDate !== undefined) mod.scheduleDate = req.body.scheduleDate;

// // // // // //     if (req.body.facilitatorId !== undefined) {
// // // // // //         mod.facilitatorId = req.body.facilitatorId || undefined;
// // // // // //     }
    
// // // // // //     await course.save();
// // // // // //     res.json(course);
// // // // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // });

// // // // // // // --- LESSON MANAGEMENT ---

// // // // // // router.post('/:id/modules/:moduleId/lessons', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // //   try {
// // // // // //     const { 
// // // // // //         title, type, content, fileUrl, videoUrl, meetingLink, 
// // // // // //         questions, quizDuration, pollQuestion, pollOptions, 
// // // // // //         isActive, isMandatory, jp, scheduleDate // [UPDATE] Menerima scheduleDate
// // // // // //     } = req.body;

// // // // // //     const course = await Course.findById(req.params.id);
// // // // // //     if (!course) return res.status(404).json({ error: 'Tidak ditemukan' });
// // // // // //     if (!checkAccess(course, req.user)) return res.status(403).json({ error: 'Akses ditolak' });

// // // // // //     const mod = course.modules.find((m: any) => m._id.toString() === req.params.moduleId);
// // // // // //     if (!mod) return res.status(404).json({ error: 'Modul tidak ditemukan' });

// // // // // //     const newLesson: any = { 
// // // // // //         title, 
// // // // // //         type: type || 'lesson', 
// // // // // //         isActive: isActive === true, 
// // // // // //         isMandatory: isMandatory !== false, 
// // // // // //         order: mod.lessons.length, 
// // // // // //         content: content || '', 
// // // // // //         fileUrl: fileUrl || '', 
// // // // // //         videoUrl: videoUrl || '', 
// // // // // //         meetingLink: meetingLink || '',
// // // // // //         jp: jp || 0,
// // // // // //         scheduleDate: scheduleDate || null // [UPDATE] Simpan Tanggal
// // // // // //     };

// // // // // //     if (type === 'quiz') { 
// // // // // //         newLesson.questions = questions || []; 
// // // // // //         newLesson.quizDuration = quizDuration || 10; 
// // // // // //     }
// // // // // //     if (type === 'poll') { 
// // // // // //         newLesson.pollQuestion = pollQuestion || ''; 
// // // // // //         newLesson.pollOptions = pollOptions || []; 
// // // // // //     }

// // // // // //     mod.lessons.push(newLesson); 
// // // // // //     await course.save(); 
// // // // // //     res.json(course);
// // // // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // });

// // // // // // router.put('/:id/modules/:moduleId/lessons/:lessonId', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // //   try {
// // // // // //     const { 
// // // // // //         title, type, content, fileUrl, videoUrl, meetingLink, 
// // // // // //         questions, quizDuration, pollQuestion, pollOptions, 
// // // // // //         isActive, isMandatory, jp, scheduleDate // [UPDATE] Menerima scheduleDate
// // // // // //     } = req.body;

// // // // // //     const course = await Course.findById(req.params.id);
// // // // // //     if (!course) return res.status(404).json({ error: 'Tidak ditemukan' });
// // // // // //     if (!checkAccess(course, req.user)) return res.status(403).json({ error: 'Akses ditolak' });

// // // // // //     const mod = course.modules.find((m: any) => m._id.toString() === req.params.moduleId);
// // // // // //     if (!mod) return res.status(404).json({ error: 'Modul tidak ditemukan' });
    
// // // // // //     const les = mod.lessons.find((l: any) => l._id.toString() === req.params.lessonId);
// // // // // //     if (!les) return res.status(404).json({ error: 'Lesson tidak ditemukan' });
    
// // // // // //     // Update Fields
// // // // // //     if (title) les.title = title; 
// // // // // //     if (type) les.type = type; 
// // // // // //     if (isActive !== undefined) les.isActive = isActive; 
// // // // // //     if (isMandatory !== undefined) les.isMandatory = isMandatory;
// // // // // //     if (content !== undefined) les.content = content; 
// // // // // //     if (fileUrl !== undefined) les.fileUrl = fileUrl; 
// // // // // //     if (videoUrl !== undefined) les.videoUrl = videoUrl; 
// // // // // //     if (meetingLink !== undefined) les.meetingLink = meetingLink;
// // // // // //     if (jp !== undefined) les.jp = jp;
    
// // // // // //     // [UPDATE] Update Tanggal Lesson
// // // // // //     if (scheduleDate !== undefined) les.scheduleDate = scheduleDate;

// // // // // //     if (type === 'quiz') { 
// // // // // //         if (questions) les.questions = questions; 
// // // // // //         if (quizDuration) les.quizDuration = quizDuration; 
// // // // // //     }
// // // // // //     if (type === 'poll') { 
// // // // // //         if (pollQuestion !== undefined) les.pollQuestion = pollQuestion; 
// // // // // //         if (pollOptions !== undefined) les.pollOptions = pollOptions; 
// // // // // //     }

// // // // // //     await course.save(); 
// // // // // //     res.json(course);
// // // // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // });

// // // // // // router.delete('/:id/modules/:moduleId/lessons/:lessonId', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // //   try {
// // // // // //     const course = await Course.findById(req.params.id);
// // // // // //     if (!course) return res.status(404).json({ error: 'Tidak ditemukan' });
// // // // // //     if (!checkAccess(course, req.user)) return res.status(403).json({ error: 'Akses ditolak' });

// // // // // //     const mod = course.modules.find((m: any) => m._id.toString() === req.params.moduleId);
// // // // // //     if (mod) {
// // // // // //         const idx = mod.lessons.findIndex((l: any) => l._id.toString() === req.params.lessonId);
// // // // // //         if (idx > -1) {
// // // // // //             mod.lessons.splice(idx, 1);
// // // // // //             await course.save(); 
// // // // // //             res.json(course);
// // // // // //         } else {
// // // // // //             res.status(404).json({ error: 'Lesson tidak ditemukan' });    
// // // // // //         }
// // // // // //     } else { 
// // // // // //         res.status(404).json({ error: 'Modul tidak ditemukan' }); 
// // // // // //     }
// // // // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // });

// // // // // // // --- UTILS (TOGGLE & REORDER) ---

// // // // // // router.patch('/:id/toggle-status', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // //   try {
// // // // // //     const { moduleId, lessonId } = req.body;
// // // // // //     const course = await Course.findById(req.params.id);
// // // // // //     if (!course) return res.status(404).json({ error: 'Tidak ditemukan' });
// // // // // //     if (!checkAccess(course, req.user)) return res.status(403).json({ error: 'Akses ditolak' });

// // // // // //     if (moduleId && lessonId) { 
// // // // // //         const mod = course.modules.find((m: any) => m._id.toString() === moduleId); 
// // // // // //         const les = mod?.lessons.find((l: any) => l._id.toString() === lessonId); 
// // // // // //         if (les) les.isActive = !les.isActive; 
// // // // // //     } 
// // // // // //     else if (moduleId) { 
// // // // // //         const mod = course.modules.find((m: any) => m._id.toString() === moduleId); 
// // // // // //         if (mod) mod.isActive = !mod.isActive; 
// // // // // //     } 
// // // // // //     else { 
// // // // // //         course.isPublished = !course.isPublished; 
// // // // // //     }
    
// // // // // //     await course.save(); 
// // // // // //     res.json(course);
// // // // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // });

// // // // // // router.patch('/:id/reorder', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // //   try {
// // // // // //     const { modules } = req.body; 
// // // // // //     const course = await Course.findById(req.params.id);
// // // // // //     if (!course) return res.status(404).json({ error: 'Tidak ditemukan' });
// // // // // //     if (!checkAccess(course, req.user)) return res.status(403).json({ error: 'Akses ditolak' });
    
// // // // // //     if (modules && Array.isArray(modules)) { 
// // // // // //         course.modules = modules as any; 
// // // // // //     }
    
// // // // // //     await course.save(); 
// // // // // //     res.json({ message: 'Urutan disimpan', modules: course.modules });
// // // // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // });

// // // // // // export default router;
// // // // // import express, { Response } from 'express';
// // // // // import { Course } from '../models/Course'; 
// // // // // import { Progress } from '../models/Progress'; 
// // // // // import { User } from '../models/User'; 
// // // // // import { Notification } from '../models/Notification';
// // // // // import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth';

// // // // // const router = express.Router();

// // // // // // HELPER: CEK AKSES
// // // // // // Memastikan user adalah Super Admin atau Fasilitator yang terdaftar di kursus ini
// // // // // const checkAccess = (course: any, user: any) => {
// // // // //     if (user.role === 'SUPER_ADMIN') return true;
// // // // //     // Cek apakah user ada di list facilitatorIds
// // // // //     return course.facilitatorIds && course.facilitatorIds.some((id: any) => id.toString() === user.id);
// // // // // };

// // // // // // --- GET ROUTES ---

// // // // // // 1. Get All Public Courses (Untuk Katalog Siswa - Tanpa Auth)
// // // // // router.get('/', async (req, res) => {
// // // // //   try {
// // // // //     const courses = await Course.find({ isPublished: true })
// // // // //         .populate('facilitatorIds', 'name')
// // // // //         .sort({ createdAt: -1 });
// // // // //     res.json({ courses });
// // // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // });

// // // // // // 2. Get All Admin Courses (Untuk Dashboard Admin/Fasilitator)
// // // // // router.get('/admin/all', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
// // // // //   try {
// // // // //     let query = {};
    
// // // // //     // --- OPSI B (DEFAULT) ---
// // // // //     // Jika bukan SUPER_ADMIN, hanya ambil kursus milik user tersebut
// // // // //     if (req.user!.role !== 'SUPER_ADMIN') {
// // // // //         query = { facilitatorIds: req.user!.id }; 
// // // // //     }
// // // // //     // Jika SUPER_ADMIN, query tetap kosong {} (Ambil semua data)

// // // // //     const courses = await Course.find(query)
// // // // //         .populate('facilitatorIds', 'name email role')
// // // // //         .sort({ createdAt: -1 });
        
// // // // //     res.json({ courses });
// // // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // });

// // // // // // 3. Get Single Course Detail
// // // // // router.get('/:id', async (req, res) => {
// // // // //   try {
// // // // //     const course = await Course.findById(req.params.id)
// // // // //       .populate('facilitatorIds', 'name email role')
// // // // //       // Populate facilitator spesifik per modul
// // // // //       .populate({
// // // // //           path: 'modules.facilitatorId',
// // // // //           model: 'User',
// // // // //           select: 'name'
// // // // //       });
      
// // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // // // //     res.json({ course });
// // // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // });

// // // // // // 4. Get Course Participants with REAL PROGRESS
// // // // // router.get('/:id/participants', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // //   try {
// // // // //     const courseId = req.params.id;

// // // // //     // A. Cek Akses & Course
// // // // //     const course = await Course.findById(courseId);
// // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // // // //     if (!checkAccess(course, req.user)) return res.status(403).json({ error: 'Akses ditolak' });

// // // // //     // B. Hitung Total Lesson Aktif
// // // // //     let totalLessons = 0;
// // // // //     course.modules.forEach((m: any) => {
// // // // //         if(m.isActive) {
// // // // //             m.lessons.forEach((l: any) => {
// // // // //                 if(l.isActive) totalLessons++;
// // // // //             });
// // // // //         }
// // // // //     });

// // // // //     // C. Ambil Semua Student & Progress
// // // // //     const students = await User.find({ role: 'STUDENT' }).select('name email avatarUrl createdAt');
// // // // //     const progresses = await Progress.find({ courseId: courseId });

// // // // //     // D. Gabungkan Data
// // // // //     const participants = students.map(student => {
// // // // //         const studentProgress = progresses.find(p => p.userId.toString() === student._id.toString());
// // // // //         let progressPercent = 0;
// // // // //         let isCompleted = false;

// // // // //         if (studentProgress) {
// // // // //             const completedCount = studentProgress.completedLessons.length;
// // // // //             if (totalLessons > 0) {
// // // // //                 progressPercent = Math.round((completedCount / totalLessons) * 100);
// // // // //             }
// // // // //             if (progressPercent > 100) progressPercent = 100;
// // // // //             isCompleted = studentProgress.completed || progressPercent === 100;
// // // // //         }

// // // // //         return {
// // // // //             _id: student._id,
// // // // //             name: student.name,
// // // // //             email: student.email,
// // // // //             avatarUrl: student.avatarUrl,
// // // // //             joinDate: student.createdAt,
// // // // //             progress: progressPercent,
// // // // //             isCertified: isCompleted
// // // // //         };
// // // // //     });

// // // // //     res.json({ participants });
// // // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // });

// // // // // // --- FITUR BLASTING / PUBLISH ---

// // // // // router.patch('/:id/publish', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // //     try {
// // // // //         const courseId = req.params.id;
        
// // // // //         // Update Status Menjadi Published
// // // // //         const course = await Course.findByIdAndUpdate(courseId, { isPublished: true }, { new: true });
        
// // // // //         if (!course) return res.status(404).json({ error: 'Pelatihan tidak ditemukan' });

// // // // //         // BLASTING KE SEMUA USER (Kecuali Admin yg nge-klik)
// // // // //         const allUsers = await User.find({ _id: { $ne: req.user!.id } }).select('_id');
        
// // // // //         if (allUsers.length > 0) {
// // // // //             const notifs = allUsers.map(u => ({
// // // // //                 recipient: u._id,
// // // // //                 sender: req.user!.id,
// // // // //                 type: 'course', // Tipe Course
// // // // //                 topic: course._id,
// // // // //                 message: `Pelatihan Baru Dibuka: "${course.title}". Daftar Sekarang!`,
// // // // //                 isRead: false,
// // // // //                 createdAt: new Date()
// // // // //             }));

// // // // //             await Notification.insertMany(notifs);
// // // // //         }

// // // // //         res.json({ message: 'Pelatihan dipublikasikan dan notifikasi dikirim.', course });
// // // // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // });

// // // // // // --- COURSE MANAGEMENT (CREATE, UPDATE, DELETE) ---

// // // // // router.post('/', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // //   try {
// // // // //     const { title, description, price, category, programType, thumbnailUrl, organizer } = req.body;
    
// // // // //     const course = await Course.create({
// // // // //       title, 
// // // // //       description: description || 'Deskripsi belum diisi.', 
// // // // //       price: price || 0,
// // // // //       category: category || 'General', 
// // // // //       programType: programType || 'course', 
// // // // //       thumbnailUrl: thumbnailUrl || '',
// // // // //       organizer: organizer || 'PMI Pusat', // Default Value
// // // // //       facilitatorIds: [req.user!.id], // Pembuat otomatis masuk list facilitator
// // // // //       modules: [], 
// // // // //       isPublished: false 
// // // // //     });

// // // // //     res.status(201).json({ message: 'Berhasil dibuat', course });
// // // // //   } catch (error: any) { res.status(400).json({ error: error.message }); }
// // // // // });

// // // // // router.put('/:id', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // //   try {
// // // // //     const { 
// // // // //         title, description, price, category, isPublished, thumbnailUrl, 
// // // // //         competencies, certificateConfig, facilitatorIds, programType, 
// // // // //         includeCompetenciesInCertificate, organizer 
// // // // //     } = req.body;

// // // // //     const course = await Course.findById(req.params.id);
// // // // //     if (!course) return res.status(404).json({ error: 'Tidak ditemukan' });
// // // // //     if (!checkAccess(course, req.user)) return res.status(403).json({ error: 'Akses ditolak' });

// // // // //     // Update Fields
// // // // //     if (title) course.title = title;
// // // // //     if (description) course.description = description;
// // // // //     if (price !== undefined) course.price = price;
// // // // //     if (category) course.category = category;
// // // // //     if (thumbnailUrl) course.thumbnailUrl = thumbnailUrl;
// // // // //     if (isPublished !== undefined) course.isPublished = isPublished;
// // // // //     if (programType) course.programType = programType;
// // // // //     if (competencies) course.competencies = competencies;
    
// // // // //     // Update Organizer
// // // // //     if (organizer) course.organizer = organizer;

// // // // //     if (includeCompetenciesInCertificate !== undefined) {
// // // // //         course.includeCompetenciesInCertificate = includeCompetenciesInCertificate;
// // // // //     }
    
// // // // //     if (certificateConfig) {
// // // // //       if (!course.certificateConfig) {
// // // // //           course.certificateConfig = { 
// // // // //               certificateNumber: '', executionDate: new Date(), city: '', signatoryName: '', signatoryPosition: '' 
// // // // //           };
// // // // //       }
// // // // //       course.certificateConfig = { ...course.certificateConfig, ...certificateConfig };
// // // // //     }

// // // // //     // Hanya Super Admin yang bisa ubah list facilitator utama
// // // // //     if (req.user!.role === 'SUPER_ADMIN' && facilitatorIds && Array.isArray(facilitatorIds)) {
// // // // //        course.facilitatorIds = facilitatorIds;
// // // // //     }

// // // // //     await course.save();
// // // // //     res.json({ message: 'Berhasil diperbarui', course });
// // // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // });

// // // // // router.delete('/:id', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // //   try {
// // // // //     const course = await Course.findById(req.params.id);
// // // // //     if (!course) return res.status(404).json({ error: 'Tidak ditemukan' });
// // // // //     if (!checkAccess(course, req.user)) return res.status(403).json({ error: 'Akses ditolak' });
    
// // // // //     await Course.findByIdAndDelete(req.params.id);
// // // // //     await Progress.deleteMany({ courseId: req.params.id }); // Clean up

// // // // //     res.json({ message: 'Berhasil dihapus' });
// // // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // });

// // // // // // --- MODULE MANAGEMENT ---

// // // // // router.post('/:id/modules', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // //   try {
// // // // //     const course = await Course.findById(req.params.id);
// // // // //     if (!course) return res.status(404).json({ error: 'Tidak ditemukan' });
// // // // //     if (!checkAccess(course, req.user)) return res.status(403).json({ error: 'Akses ditolak' });

// // // // //     course.modules.push({ 
// // // // //         title: req.body.title, 
// // // // //         lessons: [], 
// // // // //         order: course.modules.length, 
// // // // //         isActive: req.body.isActive === true,
// // // // //         isMandatory: req.body.isMandatory !== false,
// // // // //         facilitatorId: req.body.facilitatorId || undefined,
// // // // //         jp: req.body.jp || 0,
// // // // //         scheduleDate: req.body.scheduleDate || null 
// // // // //     } as any);
    
// // // // //     await course.save();
// // // // //     res.json(course);
// // // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // });

// // // // // router.put('/:id/modules/:moduleId', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // //   try {
// // // // //     const course = await Course.findById(req.params.id);
// // // // //     if (!course) return res.status(404).json({ error: 'Tidak ditemukan' });
// // // // //     if (!checkAccess(course, req.user)) return res.status(403).json({ error: 'Akses ditolak' });

// // // // //     const mod = course.modules.find((m: any) => m._id.toString() === req.params.moduleId);
// // // // //     if (!mod) return res.status(404).json({ error: 'Modul tidak ditemukan' });

// // // // //     if (req.body.title) mod.title = req.body.title;
// // // // //     if (req.body.isActive !== undefined) mod.isActive = req.body.isActive;
// // // // //     if (req.body.isMandatory !== undefined) mod.isMandatory = req.body.isMandatory;
// // // // //     if (req.body.jp !== undefined) mod.jp = req.body.jp;
    
// // // // //     // Update Tanggal Modul
// // // // //     if (req.body.scheduleDate !== undefined) mod.scheduleDate = req.body.scheduleDate;

// // // // //     if (req.body.facilitatorId !== undefined) {
// // // // //         mod.facilitatorId = req.body.facilitatorId || undefined;
// // // // //     }
    
// // // // //     await course.save();
// // // // //     res.json(course);
// // // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // });

// // // // // // --- LESSON MANAGEMENT ---

// // // // // router.post('/:id/modules/:moduleId/lessons', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // //   try {
// // // // //     const { 
// // // // //         title, type, content, fileUrl, videoUrl, meetingLink, 
// // // // //         questions, quizDuration, pollQuestion, pollOptions, 
// // // // //         isActive, isMandatory, jp, scheduleDate
// // // // //     } = req.body;

// // // // //     const course = await Course.findById(req.params.id);
// // // // //     if (!course) return res.status(404).json({ error: 'Tidak ditemukan' });
// // // // //     if (!checkAccess(course, req.user)) return res.status(403).json({ error: 'Akses ditolak' });

// // // // //     const mod = course.modules.find((m: any) => m._id.toString() === req.params.moduleId);
// // // // //     if (!mod) return res.status(404).json({ error: 'Modul tidak ditemukan' });

// // // // //     const newLesson: any = { 
// // // // //         title, 
// // // // //         type: type || 'lesson', 
// // // // //         isActive: isActive === true, 
// // // // //         isMandatory: isMandatory !== false, 
// // // // //         order: mod.lessons.length, 
// // // // //         content: content || '', 
// // // // //         fileUrl: fileUrl || '', 
// // // // //         videoUrl: videoUrl || '', 
// // // // //         meetingLink: meetingLink || '',
// // // // //         jp: jp || 0,
// // // // //         scheduleDate: scheduleDate || null 
// // // // //     };

// // // // //     if (type === 'quiz') { 
// // // // //         newLesson.questions = questions || []; 
// // // // //         newLesson.quizDuration = quizDuration || 10; 
// // // // //     }
// // // // //     if (type === 'poll') { 
// // // // //         newLesson.pollQuestion = pollQuestion || ''; 
// // // // //         newLesson.pollOptions = pollOptions || []; 
// // // // //     }

// // // // //     mod.lessons.push(newLesson); 
// // // // //     await course.save(); 
// // // // //     res.json(course);
// // // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // });

// // // // // router.put('/:id/modules/:moduleId/lessons/:lessonId', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // //   try {
// // // // //     const { 
// // // // //         title, type, content, fileUrl, videoUrl, meetingLink, 
// // // // //         questions, quizDuration, pollQuestion, pollOptions, 
// // // // //         isActive, isMandatory, jp, scheduleDate 
// // // // //     } = req.body;

// // // // //     const course = await Course.findById(req.params.id);
// // // // //     if (!course) return res.status(404).json({ error: 'Tidak ditemukan' });
// // // // //     if (!checkAccess(course, req.user)) return res.status(403).json({ error: 'Akses ditolak' });

// // // // //     const mod = course.modules.find((m: any) => m._id.toString() === req.params.moduleId);
// // // // //     if (!mod) return res.status(404).json({ error: 'Modul tidak ditemukan' });
    
// // // // //     const les = mod.lessons.find((l: any) => l._id.toString() === req.params.lessonId);
// // // // //     if (!les) return res.status(404).json({ error: 'Lesson tidak ditemukan' });
    
// // // // //     // Update Fields
// // // // //     if (title) les.title = title; 
// // // // //     if (type) les.type = type; 
// // // // //     if (isActive !== undefined) les.isActive = isActive; 
// // // // //     if (isMandatory !== undefined) les.isMandatory = isMandatory;
// // // // //     if (content !== undefined) les.content = content; 
// // // // //     if (fileUrl !== undefined) les.fileUrl = fileUrl; 
// // // // //     if (videoUrl !== undefined) les.videoUrl = videoUrl; 
// // // // //     if (meetingLink !== undefined) les.meetingLink = meetingLink;
// // // // //     if (jp !== undefined) les.jp = jp;
    
// // // // //     // Update Tanggal Lesson
// // // // //     if (scheduleDate !== undefined) les.scheduleDate = scheduleDate;

// // // // //     if (type === 'quiz') { 
// // // // //         if (questions) les.questions = questions; 
// // // // //         if (quizDuration) les.quizDuration = quizDuration; 
// // // // //     }
// // // // //     if (type === 'poll') { 
// // // // //         if (pollQuestion !== undefined) les.pollQuestion = pollQuestion; 
// // // // //         if (pollOptions !== undefined) les.pollOptions = pollOptions; 
// // // // //     }

// // // // //     await course.save(); 
// // // // //     res.json(course);
// // // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // });

// // // // // router.delete('/:id/modules/:moduleId/lessons/:lessonId', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // //   try {
// // // // //     const course = await Course.findById(req.params.id);
// // // // //     if (!course) return res.status(404).json({ error: 'Tidak ditemukan' });
// // // // //     if (!checkAccess(course, req.user)) return res.status(403).json({ error: 'Akses ditolak' });

// // // // //     const mod = course.modules.find((m: any) => m._id.toString() === req.params.moduleId);
// // // // //     if (mod) {
// // // // //         const idx = mod.lessons.findIndex((l: any) => l._id.toString() === req.params.lessonId);
// // // // //         if (idx > -1) {
// // // // //             mod.lessons.splice(idx, 1);
// // // // //             await course.save(); 
// // // // //             res.json(course);
// // // // //         } else {
// // // // //             res.status(404).json({ error: 'Lesson tidak ditemukan' });    
// // // // //         }
// // // // //     } else { 
// // // // //         res.status(404).json({ error: 'Modul tidak ditemukan' }); 
// // // // //     }
// // // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // });

// // // // // // --- UTILS (TOGGLE & REORDER) ---

// // // // // router.patch('/:id/toggle-status', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // //   try {
// // // // //     const { moduleId, lessonId } = req.body;
// // // // //     const course = await Course.findById(req.params.id);
// // // // //     if (!course) return res.status(404).json({ error: 'Tidak ditemukan' });
// // // // //     if (!checkAccess(course, req.user)) return res.status(403).json({ error: 'Akses ditolak' });

// // // // //     if (moduleId && lessonId) { 
// // // // //         const mod = course.modules.find((m: any) => m._id.toString() === moduleId); 
// // // // //         const les = mod?.lessons.find((l: any) => l._id.toString() === lessonId); 
// // // // //         if (les) les.isActive = !les.isActive; 
// // // // //     } 
// // // // //     else if (moduleId) { 
// // // // //         const mod = course.modules.find((m: any) => m._id.toString() === moduleId); 
// // // // //         if (mod) mod.isActive = !mod.isActive; 
// // // // //     } 
// // // // //     else { 
// // // // //         course.isPublished = !course.isPublished; 
// // // // //     }
    
// // // // //     await course.save(); 
// // // // //     res.json(course);
// // // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // });

// // // // // router.patch('/:id/reorder', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // //   try {
// // // // //     const { modules } = req.body; 
// // // // //     const course = await Course.findById(req.params.id);
// // // // //     if (!course) return res.status(404).json({ error: 'Tidak ditemukan' });
// // // // //     if (!checkAccess(course, req.user)) return res.status(403).json({ error: 'Akses ditolak' });
    
// // // // //     if (modules && Array.isArray(modules)) { 
// // // // //         course.modules = modules as any; 
// // // // //     }
    
// // // // //     await course.save(); 
// // // // //     res.json({ message: 'Urutan disimpan', modules: course.modules });
// // // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // });

// // // // // export default router;
// // // // import express, { Response } from 'express';
// // // // import { Course } from '../models/Course'; 
// // // // import { Progress } from '../models/Progress'; 
// // // // import { User } from '../models/User'; 
// // // // import { Notification } from '../models/Notification';
// // // // import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth';

// // // // const router = express.Router();

// // // // const checkAccess = (course: any, user: any) => {
// // // //     if (user.role === 'SUPER_ADMIN') return true;
// // // //     return course.facilitatorIds && course.facilitatorIds.some((id: any) => id.toString() === user.id);
// // // // };

// // // // // 1. GET PUBLIC (Katalog Siswa)
// // // // router.get('/', async (req, res) => {
// // // //   try {
// // // //     const courses = await Course.find({ isPublished: true })
// // // //         .populate('facilitatorIds', 'name')
// // // //         .sort({ createdAt: -1 });
// // // //     res.json({ courses });
// // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // });

// // // // // 2. GET ADMIN ALL
// // // // router.get('/admin/all', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
// // // //   try {
// // // //     let query = {};
// // // //     if (req.user!.role !== 'SUPER_ADMIN') {
// // // //         query = { facilitatorIds: req.user!.id }; 
// // // //     }
// // // //     const courses = await Course.find(query)
// // // //         .populate('facilitatorIds', 'name email role')
// // // //         .sort({ createdAt: -1 });
// // // //     res.json({ courses });
// // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // });

// // // // // 3. GET SINGLE (UPDATE DISINI: Tambah 'avatarUrl')
// // // // router.get('/:id', async (req, res) => {
// // // //   try {
// // // //     const course = await Course.findById(req.params.id)
// // // //       // Perbaikan: Ambil avatarUrl agar foto muncul di "Hubungi Pengajar"
// // // //       .populate('facilitatorIds', 'name email role avatarUrl') 
// // // //       .populate({ path: 'modules.facilitatorId', model: 'User', select: 'name avatarUrl' });
      
// // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // // //     res.json({ course });
// // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // });

// // // // // ... (Sisa Route sama seperti sebelumnya) ...
// // // // // (Untuk menghemat ruang, sisa kode di bawah ini sama persis dengan versi sebelumnya)

// // // // // 4. PUBLISH
// // // // router.patch('/:id/publish', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // //     try {
// // // //         const courseId = req.params.id;
// // // //         const course = await Course.findByIdAndUpdate(courseId, { isPublished: true }, { new: true });
// // // //         if (!course) return res.status(404).json({ error: 'Not found' });
// // // //         const allUsers = await User.find({ _id: { $ne: req.user!.id } }).select('_id');
// // // //         if (allUsers.length > 0) {
// // // //             const notifs = allUsers.map(u => ({
// // // //                 recipient: u._id, sender: req.user!.id, type: 'course', topic: course._id,
// // // //                 message: `Pelatihan Baru Dibuka: "${course.title}". Daftar Sekarang!`, isRead: false, createdAt: new Date()
// // // //             }));
// // // //             await Notification.insertMany(notifs);
// // // //         }
// // // //         res.json({ message: 'Published', course });
// // // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // });

// // // // router.post('/', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
// // // //   try {
// // // //     const { title, description, price, category, programType, thumbnailUrl, organizer } = req.body;
// // // //     const course = await Course.create({
// // // //       title, description: description || '', price: price || 0,
// // // //       category: category || 'General', programType: programType || 'course', thumbnailUrl: thumbnailUrl || '',
// // // //       organizer: organizer || 'PMI Pusat', facilitatorIds: [req.user!.id], modules: [], isPublished: false 
// // // //     });
// // // //     res.status(201).json({ message: 'Created', course });
// // // //   } catch (error: any) { res.status(400).json({ error: error.message }); }
// // // // });

// // // // router.put('/:id', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
// // // //   try {
// // // //     const course = await Course.findById(req.params.id);
// // // //     if (!course) return res.status(404).json({ error: 'Not found' });
// // // //     if (!checkAccess(course, req.user)) return res.status(403).json({ error: 'Access denied' });
// // // //     Object.assign(course, req.body);
// // // //     await course.save();
// // // //     res.json({ message: 'Updated', course });
// // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // });

// // // // router.delete('/:id', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
// // // //   try {
// // // //     const course = await Course.findById(req.params.id);
// // // //     if (!course) return res.status(404).json({ error: 'Not found' });
// // // //     if (!checkAccess(course, req.user)) return res.status(403).json({ error: 'Access denied' });
// // // //     await Course.findByIdAndDelete(req.params.id);
// // // //     await Progress.deleteMany({ courseId: req.params.id });
// // // //     res.json({ message: 'Deleted' });
// // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // });

// // // // // Module & Lesson Routes (Sama)
// // // // router.post('/:id/modules', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
// // // //     try {
// // // //         const course = await Course.findById(req.params.id);
// // // //         if(!course) return res.status(404).json({error: 'Not found'});
// // // //         course.modules.push({ title: req.body.title, lessons: [], order: course.modules.length, isActive: true, isMandatory: true, jp: req.body.jp||0, scheduleDate: req.body.scheduleDate||null } as any);
// // // //         await course.save(); res.json(course);
// // // //     } catch(e:any){res.status(500).json({error:e.message})}
// // // // });

// // // // router.put('/:id/modules/:moduleId', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
// // // //     try {
// // // //         const course = await Course.findById(req.params.id);
// // // //         if(!course) return res.status(404).json({error: 'Not found'});
// // // //         const mod = course.modules.find((m:any)=>m._id.toString()===req.params.moduleId);
// // // //         if(mod) { Object.assign(mod, req.body); await course.save(); }
// // // //         res.json(course);
// // // //     } catch(e:any){res.status(500).json({error:e.message})}
// // // // });

// // // // router.post('/:id/modules/:moduleId/lessons', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
// // // //   try {
// // // //     const { title, type, content, fileUrl, videoUrl, meetingLink, questions, quizDuration, pollQuestion, pollOptions, isActive, isMandatory, jp, scheduleDate } = req.body;
// // // //     const course = await Course.findById(req.params.id);
// // // //     if (!course) return res.status(404).json({ error: 'Not found' });
// // // //     const mod = course.modules.find((m: any) => m._id.toString() === req.params.moduleId);
// // // //     if (!mod) return res.status(404).json({ error: 'Modul not found' });
// // // //     const newLesson: any = { title, type: type||'lesson', isActive: isActive===true, isMandatory: isMandatory!==false, order: mod.lessons.length, content: content||'', fileUrl: fileUrl||'', videoUrl: videoUrl||'', meetingLink: meetingLink||'', jp: jp||0, scheduleDate: scheduleDate||null };
// // // //     if (type === 'quiz') { newLesson.questions = questions||[]; newLesson.quizDuration = quizDuration||10; }
// // // //     if (type === 'poll') { newLesson.pollQuestion = pollQuestion||''; newLesson.pollOptions = pollOptions||[]; }
// // // //     mod.lessons.push(newLesson); 
// // // //     await course.save(); 
// // // //     res.json(course);
// // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // });

// // // // router.put('/:id/modules/:moduleId/lessons/:lessonId', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
// // // //   try {
// // // //     const { title, type, content, fileUrl, videoUrl, meetingLink, questions, quizDuration, pollQuestion, pollOptions, isActive, isMandatory, jp, scheduleDate } = req.body;
// // // //     const course = await Course.findById(req.params.id);
// // // //     if (!course) return res.status(404).json({ error: 'Not found' });
// // // //     const mod = course.modules.find((m: any) => m._id.toString() === req.params.moduleId);
// // // //     if (!mod) return res.status(404).json({ error: 'Modul not found' });
// // // //     const les = mod.lessons.find((l: any) => l._id.toString() === req.params.lessonId);
// // // //     if (!les) return res.status(404).json({ error: 'Lesson not found' });
    
// // // //     // Update simple fields
// // // //     if(title) les.title = title; if(type) les.type = type; if(isActive!==undefined) les.isActive=isActive; if(isMandatory!==undefined) les.isMandatory=isMandatory;
// // // //     if(content!==undefined) les.content=content; if(fileUrl!==undefined) les.fileUrl=fileUrl; if(videoUrl!==undefined) les.videoUrl=videoUrl; if(meetingLink!==undefined) les.meetingLink=meetingLink;
// // // //     if(jp!==undefined) les.jp=jp; if(scheduleDate!==undefined) les.scheduleDate=scheduleDate;
// // // //     if (type === 'quiz') { if(questions) les.questions=questions; if(quizDuration) les.quizDuration=quizDuration; }
// // // //     if (type === 'poll') { if(pollQuestion!==undefined) les.pollQuestion=pollQuestion; if(pollOptions!==undefined) les.pollOptions=pollOptions; }

// // // //     await course.save(); 
// // // //     res.json(course);
// // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // });

// // // // router.delete('/:id/modules/:moduleId/lessons/:lessonId', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
// // // //   try {
// // // //     const course = await Course.findById(req.params.id);
// // // //     if (!course) return res.status(404).json({ error: 'Not found' });
// // // //     const mod = course.modules.find((m: any) => m._id.toString() === req.params.moduleId);
// // // //     if (mod) {
// // // //         const idx = mod.lessons.findIndex((l: any) => l._id.toString() === req.params.lessonId);
// // // //         if (idx > -1) { mod.lessons.splice(idx, 1); await course.save(); res.json(course); } 
// // // //         else { res.status(404).json({ error: 'Lesson not found' }); }
// // // //     } else { res.status(404).json({ error: 'Modul not found' }); }
// // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // });

// // // // router.patch('/:id/toggle-status', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => { /* logic sama */ });
// // // // router.patch('/:id/reorder', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => { /* logic sama */ });
// // // // // Get Participants
// // // // router.get('/:id/participants', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { /* logic sama */ });

// // // // export default router;
// // // import express, { Response } from 'express';
// // // import { Course } from '../models/Course'; 
// // // import { Progress } from '../models/Progress'; 
// // // import { User } from '../models/User'; 
// // // import { Notification } from '../models/Notification';
// // // import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth';

// // // const router = express.Router();

// // // const checkAccess = (course: any, user: any) => {
// // //     if (user.role === 'SUPER_ADMIN') return true;
// // //     return course.facilitatorIds && course.facilitatorIds.some((id: any) => id.toString() === user.id);
// // // };

// // // // --- GET ROUTES ---

// // // // 1. GET PUBLIC
// // // router.get('/', async (req, res) => {
// // //   try {
// // //     const courses = await Course.find({ isPublished: true }).populate('facilitatorIds', 'name').sort({ createdAt: -1 });
// // //     res.json({ courses });
// // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // });

// // // // 2. GET ADMIN ALL
// // // router.get('/admin/all', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
// // //   try {
// // //     let query = {};
// // //     if (req.user!.role !== 'SUPER_ADMIN') {
// // //         query = { facilitatorIds: req.user!.id }; 
// // //     }
// // //     const courses = await Course.find(query).populate('facilitatorIds', 'name email role').sort({ createdAt: -1 });
// // //     res.json({ courses });
// // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // });

// // // // 3. GET SINGLE
// // // router.get('/:id', async (req, res) => {
// // //   try {
// // //     const course = await Course.findById(req.params.id)
// // //       .populate('facilitatorIds', 'name email role avatarUrl')
// // //       .populate({ path: 'modules.facilitatorId', model: 'User', select: 'name avatarUrl' });
// // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // //     res.json({ course });
// // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // });

// // // // 4. GET PARTICIPANTS & PROGRESS
// // // router.get('/:id/participants', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // //   try {
// // //     const courseId = req.params.id;
// // //     const course = await Course.findById(courseId);
// // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });

// // //     let totalLessons = 0;
// // //     course.modules.forEach((m: any) => { if(m.isActive) m.lessons.forEach((l: any) => { if(l.isActive) totalLessons++; }); });

// // //     const students = await User.find({ role: 'STUDENT' }).select('name email avatarUrl createdAt');
// // //     const progresses = await Progress.find({ courseId: courseId });

// // //     const participants = students.map(student => {
// // //         const studentProgress = progresses.find(p => p.userId.toString() === student._id.toString());
// // //         let progressPercent = 0;
// // //         let isCompleted = false;

// // //         if (studentProgress) {
// // //             const completedCount = studentProgress.completedLessons.length;
// // //             if (totalLessons > 0) progressPercent = Math.round((completedCount / totalLessons) * 100);
// // //             if (progressPercent > 100) progressPercent = 100;
// // //             isCompleted = studentProgress.completed || progressPercent === 100;
// // //         }

// // //         return {
// // //             _id: student._id,
// // //             name: student.name,
// // //             email: student.email,
// // //             avatarUrl: student.avatarUrl,
// // //             joinDate: student.createdAt,
// // //             progress: progressPercent,
// // //             isCertified: isCompleted,
// // //             // [BARU] Kirim daftar ID modul/lesson yang sudah selesai (untuk frontend cek status)
// // //             completedLessons: studentProgress ? studentProgress.completedLessons : [] 
// // //         };
// // //     });

// // //     res.json({ participants });
// // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // });

// // // // --- ACTIONS ---

// // // router.patch('/:id/publish', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // //     try {
// // //         const courseId = req.params.id;
// // //         const course = await Course.findByIdAndUpdate(courseId, { isPublished: true }, { new: true });
// // //         if (!course) return res.status(404).json({ error: 'Not found' });
// // //         const allUsers = await User.find({ _id: { $ne: req.user!.id } }).select('_id');
// // //         if (allUsers.length > 0) {
// // //             const notifs = allUsers.map(u => ({ recipient: u._id, sender: req.user!.id, type: 'course', topic: course._id, message: `Pelatihan Baru: "${course.title}"`, isRead: false, createdAt: new Date() }));
// // //             await Notification.insertMany(notifs);
// // //         }
// // //         res.json({ message: 'Published', course });
// // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // });

// // // // --- CRUD ---

// // // router.post('/', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
// // //   try {
// // //     const { title, description, price, category, programType, thumbnailUrl, organizer } = req.body;
// // //     const course = await Course.create({ title, description: description||'', price: price||0, category: category||'General', programType: programType||'course', thumbnailUrl: thumbnailUrl||'', organizer: organizer||'PMI Pusat', facilitatorIds: [req.user!.id], modules: [], isPublished: false });
// // //     res.status(201).json({ message: 'Created', course });
// // //   } catch (error: any) { res.status(400).json({ error: error.message }); }
// // // });

// // // router.put('/:id', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
// // //   try {
// // //     const course = await Course.findById(req.params.id);
// // //     if (!course) return res.status(404).json({ error: 'Not found' });
// // //     if (!checkAccess(course, req.user)) return res.status(403).json({ error: 'Access denied' });
// // //     Object.assign(course, req.body);
// // //     await course.save();
// // //     res.json({ message: 'Updated', course });
// // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // });

// // // router.delete('/:id', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
// // //   try {
// // //     const course = await Course.findById(req.params.id);
// // //     if (!course) return res.status(404).json({ error: 'Not found' });
// // //     if (!checkAccess(course, req.user)) return res.status(403).json({ error: 'Access denied' });
// // //     await Course.findByIdAndDelete(req.params.id);
// // //     await Progress.deleteMany({ courseId: req.params.id });
// // //     res.json({ message: 'Deleted' });
// // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // });

// // // // --- MODULES & LESSONS ---

// // // router.post('/:id/modules', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
// // //     try {
// // //         const course = await Course.findById(req.params.id);
// // //         if(!course) return res.status(404).json({error: 'Not found'});
// // //         course.modules.push({ title: req.body.title, lessons: [], order: course.modules.length, isActive: true, isMandatory: true, jp: req.body.jp||0, scheduleDate: req.body.scheduleDate||null } as any);
// // //         await course.save(); res.json(course);
// // //     } catch(e:any){res.status(500).json({error:e.message})}
// // // });

// // // router.put('/:id/modules/:moduleId', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
// // //     try {
// // //         const course = await Course.findById(req.params.id);
// // //         if(!course) return res.status(404).json({error: 'Not found'});
// // //         const mod = course.modules.find((m:any)=>m._id.toString()===req.params.moduleId);
// // //         if(mod) { Object.assign(mod, req.body); await course.save(); }
// // //         res.json(course);
// // //     } catch(e:any){res.status(500).json({error:e.message})}
// // // });

// // // router.post('/:id/modules/:moduleId/lessons', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
// // //   try {
// // //     const { title, type, content, fileUrl, videoUrl, meetingLink, questions, quizDuration, pollQuestion, pollOptions, isActive, isMandatory, jp, scheduleDate } = req.body;
// // //     const course = await Course.findById(req.params.id);
// // //     if (!course) return res.status(404).json({ error: 'Not found' });
// // //     const mod = course.modules.find((m: any) => m._id.toString() === req.params.moduleId);
// // //     if (!mod) return res.status(404).json({ error: 'Modul not found' });
// // //     const newLesson: any = { title, type: type||'lesson', isActive: isActive===true, isMandatory: isMandatory!==false, order: mod.lessons.length, content: content||'', fileUrl: fileUrl||'', videoUrl: videoUrl||'', meetingLink: meetingLink||'', jp: jp||0, scheduleDate: scheduleDate||null };
// // //     if (type === 'quiz') { newLesson.questions = questions||[]; newLesson.quizDuration = quizDuration||10; }
// // //     if (type === 'poll') { newLesson.pollQuestion = pollQuestion||''; newLesson.pollOptions = pollOptions||[]; }
// // //     mod.lessons.push(newLesson); await course.save(); res.json(course);
// // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // });

// // // router.put('/:id/modules/:moduleId/lessons/:lessonId', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
// // //   try {
// // //     const course = await Course.findById(req.params.id);
// // //     if (!course) return res.status(404).json({ error: 'Not found' });
// // //     const mod = course.modules.find((m: any) => m._id.toString() === req.params.moduleId);
// // //     if (!mod) return res.status(404).json({ error: 'Modul not found' });
// // //     const les = mod.lessons.find((l: any) => l._id.toString() === req.params.lessonId);
// // //     if (!les) return res.status(404).json({ error: 'Lesson not found' });
// // //     Object.assign(les, req.body); await course.save(); res.json(course);
// // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // });

// // // router.delete('/:id/modules/:moduleId/lessons/:lessonId', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
// // //   try {
// // //     const course = await Course.findById(req.params.id);
// // //     if (!course) return res.status(404).json({ error: 'Not found' });
// // //     const mod = course.modules.find((m: any) => m._id.toString() === req.params.moduleId);
// // //     if (mod) { const idx = mod.lessons.findIndex((l: any) => l._id.toString() === req.params.lessonId); if (idx > -1) { mod.lessons.splice(idx, 1); await course.save(); res.json(course); } else { res.status(404).json({ error: 'Lesson not found' }); } } else { res.status(404).json({ error: 'Modul not found' }); }
// // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // });

// // // router.patch('/:id/toggle-status', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => { /* logic sama */ });
// // // router.patch('/:id/reorder', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => { /* logic sama */ });

// // // // --- [BARU] PARTICIPANT MANAGEMENT (RESET QUIZ & MANUAL COMPLETION) ---

// // // // 1. Reset Quiz (Hapus Score & Completion)
// // // router.post('/reset-quiz', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // //     try {
// // //         const { studentId, quizId } = req.body;
// // //         const progress = await Progress.findOne({ userId: studentId, completedLessons: quizId }); // Cari yg sudah selesai
        
// // //         if (progress) {
// // //             // Hapus dari completedLessons
// // //             progress.completedLessons = progress.completedLessons.filter((lid: string) => lid !== quizId);
            
// // //             // Hapus Skor Kuis (jika ada)
// // //             if(progress.quizScores) {
// // //                 progress.quizScores = progress.quizScores.filter((qs: any) => qs.lessonId !== quizId);
// // //             }
            
// // //             await progress.save();
// // //             res.json({ message: 'Timer & status kuis di-reset.' });
// // //         } else {
// // //             res.json({ message: 'User belum mengerjakan kuis ini.' });
// // //         }
// // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // });

// // // // 2. Mark Complete (Manual Override)
// // // router.post('/mark-complete-lesson', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // //     try {
// // //         const { studentId, lessonId, courseId } = req.body;
        
// // //         let progress = await Progress.findOne({ userId: studentId, courseId });
// // //         if (!progress) {
// // //             progress = await Progress.create({ userId: studentId, courseId, completedLessons: [] });
// // //         }

// // //         if (!progress.completedLessons.includes(lessonId)) {
// // //             progress.completedLessons.push(lessonId);
// // //             await progress.save();
// // //         }
// // //         res.json({ message: 'Ditandai selesai.', completedLessons: progress.completedLessons });
// // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // });

// // // export default router;
// // import express, { Response } from 'express';
// // import { Course } from '../models/Course'; 
// // import { Progress } from '../models/Progress'; 
// // import { User } from '../models/User'; 
// // import { Notification } from '../models/Notification';
// // import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth';

// // const router = express.Router();

// // // Helper Cek Akses
// // const checkAccess = (course: any, user: any) => {
// //     if (user.role === 'SUPER_ADMIN') return true;
// //     return course.facilitatorIds && course.facilitatorIds.some((id: any) => id.toString() === user.id);
// // };

// // // --- GET ROUTES ---

// // // 1. Get Public (Katalog)
// // router.get('/', async (req, res) => {
// //   try {
// //     const courses = await Course.find({ isPublished: true }).populate('facilitatorIds', 'name').sort({ createdAt: -1 });
// //     res.json({ courses });
// //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // });

// // // 2. Get Admin All
// // router.get('/admin/all', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
// //   try {
// //     const query = req.user!.role === 'SUPER_ADMIN' ? {} : { facilitatorIds: req.user!.id };
// //     const courses = await Course.find(query).populate('facilitatorIds', 'name email role').sort({ createdAt: -1 });
// //     res.json({ courses });
// //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // });

// // // 3. Get Single Detail
// // router.get('/:id', async (req, res) => {
// //   try {
// //     const course = await Course.findById(req.params.id)
// //       .populate('facilitatorIds', 'name email role avatarUrl')
// //       .populate({ path: 'modules.facilitatorId', model: 'User', select: 'name avatarUrl' });
// //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// //     res.json({ course });
// //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // });

// // // 4. Get Participants & Real Progress
// // router.get('/:id/participants', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// //   try {
// //     const courseId = req.params.id;
// //     const course = await Course.findById(courseId);
// //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });

// //     // Hitung Total Lesson Aktif
// //     let totalLessons = 0;
// //     course.modules.forEach((m: any) => { 
// //         if(m.isActive) m.lessons.forEach((l: any) => { if(l.isActive) totalLessons++; }); 
// //     });

// //     const students = await User.find({ role: 'STUDENT' }).select('name email avatarUrl createdAt');
// //     const progresses = await Progress.find({ courseId: courseId });

// //     const participants = students.map(student => {
// //         const studentProgress = progresses.find(p => p.userId.toString() === student._id.toString());
// //         let progressPercent = 0;
// //         let isCompleted = false;
// //         let completedLessons: string[] = [];

// //         if (studentProgress) {
// //             completedLessons = studentProgress.completedLessons.map((id: any) => id.toString());
// //             const completedCount = completedLessons.length;
            
// //             if (totalLessons > 0) progressPercent = Math.round((completedCount / totalLessons) * 100);
// //             if (progressPercent > 100) progressPercent = 100;
            
// //             isCompleted = studentProgress.completed || progressPercent === 100;
// //         }

// //         return {
// //             _id: student._id,
// //             name: student.name,
// //             email: student.email,
// //             avatarUrl: student.avatarUrl,
// //             joinDate: student.createdAt,
// //             progress: progressPercent,
// //             isCertified: isCompleted,
// //             completedLessons // Kirim data detail lesson yg selesai
// //         };
// //     });

// //     res.json({ participants });
// //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // });

// // // --- ACTIONS (PUBLISH, RESET, MARK COMPLETE) ---

// // router.patch('/:id/publish', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// //     try {
// //         const course = await Course.findByIdAndUpdate(req.params.id, { isPublished: true }, { new: true });
// //         if (!course) return res.status(404).json({ error: 'Not found' });
        
// //         const allUsers = await User.find({ _id: { $ne: req.user!.id } }).select('_id');
// //         if (allUsers.length > 0) {
// //             const notifs = allUsers.map(u => ({ 
// //                 recipient: u._id, sender: req.user!.id, type: 'course', topic: course._id, 
// //                 message: `Pelatihan Baru: "${course.title}"`, isRead: false, createdAt: new Date() 
// //             }));
// //             await Notification.insertMany(notifs);
// //         }
// //         res.json({ message: 'Published', course });
// //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // });

// // // [BARU] Reset Kuis (Hapus Score & Completion)
// // router.post('/reset-quiz', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// //     try {
// //         const { studentId, quizId } = req.body;
// //         // Cari progress user yang mengandung quizId ini
// //         const progress = await Progress.findOne({ userId: studentId, completedLessons: quizId });
        
// //         if (progress) {
// //             // Hapus dari daftar completedLessons
// //             progress.completedLessons = progress.completedLessons.filter((lid: any) => lid.toString() !== quizId);
            
// //             // Hapus skor kuis dari array quizScores (jika ada)
// //             if(progress.quizScores && progress.quizScores.length > 0) {
// //                 progress.quizScores = progress.quizScores.filter((qs: any) => qs.lessonId.toString() !== quizId);
// //             }
            
// //             // Reset status completed kursus jika progress berkurang
// //             progress.completed = false;
            
// //             await progress.save();
// //             res.json({ message: 'Timer & status kuis berhasil di-reset.' });
// //         } else {
// //             // Jika tidak ditemukan di completed, mungkin user belum lulus kuisnya, tapi kita cek skor
// //             const progCheck = await Progress.findOne({ userId: studentId });
// //             if(progCheck && progCheck.quizScores) {
// //                  progCheck.quizScores = progCheck.quizScores.filter((qs: any) => qs.lessonId.toString() !== quizId);
// //                  await progCheck.save();
// //                  return res.json({ message: 'Score kuis di-reset (user belum lulus materi ini).' });
// //             }
// //             res.json({ message: 'User belum mengerjakan kuis ini.' });
// //         }
// //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // });

// // // [BARU] Mark Lesson Complete (Manual Override)
// // router.post('/mark-complete-lesson', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// //     try {
// //         const { studentId, lessonId, courseId } = req.body;
        
// //         let progress = await Progress.findOne({ userId: studentId, courseId });
// //         if (!progress) {
// //             progress = await Progress.create({ userId: studentId, courseId, completedLessons: [] });
// //         }

// //         // Cek jika belum ada, masukkan
// //         const exists = progress.completedLessons.some((id: any) => id.toString() === lessonId);
// //         if (!exists) {
// //             progress.completedLessons.push(lessonId);
// //             await progress.save();
// //         }
// //         res.json({ message: 'Ditandai selesai.', completedLessons: progress.completedLessons });
// //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // });

// // // --- BASIC CRUD --- (Dipadatkan)
// // router.post('/', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
// //   try {
// //     const { title, description, price, category, programType, thumbnailUrl, organizer } = req.body;
// //     const course = await Course.create({ title, description: description||'', price: price||0, category: category||'General', programType: programType||'course', thumbnailUrl: thumbnailUrl||'', organizer: organizer||'PMI Pusat', facilitatorIds: [req.user!.id], modules: [], isPublished: false });
// //     res.status(201).json({ message: 'Created', course });
// //   } catch (error: any) { res.status(400).json({ error: error.message }); }
// // });

// // router.put('/:id', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
// //   try {
// //     const course = await Course.findById(req.params.id);
// //     if (!course) return res.status(404).json({ error: 'Not found' });
// //     if (!checkAccess(course, req.user)) return res.status(403).json({ error: 'Access denied' });
// //     Object.assign(course, req.body);
// //     await course.save();
// //     res.json({ message: 'Updated', course });
// //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // });

// // router.delete('/:id', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
// //   try {
// //     const course = await Course.findById(req.params.id);
// //     if (!course) return res.status(404).json({ error: 'Not found' });
// //     if (!checkAccess(course, req.user)) return res.status(403).json({ error: 'Access denied' });
// //     await Course.findByIdAndDelete(req.params.id);
// //     await Progress.deleteMany({ courseId: req.params.id });
// //     res.json({ message: 'Deleted' });
// //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // });

// // // --- MODULES & LESSONS CRUD --- (Dipadatkan)
// // router.post('/:id/modules', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
// //     try {
// //         const course = await Course.findById(req.params.id);
// //         if(!course) return res.status(404).json({error:'Not found'});
// //         course.modules.push({ title: req.body.title, lessons: [], order: course.modules.length, isActive: true, isMandatory: true, jp: req.body.jp||0, scheduleDate: req.body.scheduleDate||null } as any);
// //         await course.save(); res.json(course);
// //     } catch(e:any){res.status(500).json({error:e.message})}
// // });
// // router.put('/:id/modules/:moduleId', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
// //     try {
// //         const course = await Course.findById(req.params.id);
// //         if(!course) return res.status(404).json({error:'Not found'});
// //         const mod = course.modules.find((m:any)=>m._id.toString()===req.params.moduleId);
// //         if(mod) { Object.assign(mod, req.body); await course.save(); } res.json(course);
// //     } catch(e:any){res.status(500).json({error:e.message})}
// // });
// // router.post('/:id/modules/:moduleId/lessons', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
// //   try {
// //     const { title, type, content, fileUrl, videoUrl, meetingLink, questions, quizDuration, pollQuestion, pollOptions, isActive, isMandatory, jp, scheduleDate } = req.body;
// //     const course = await Course.findById(req.params.id);
// //     if(!course) return res.status(404).json({error:'Not found'});
// //     const mod = course.modules.find((m:any)=>m._id.toString()===req.params.moduleId);
// //     if(!mod) return res.status(404).json({error:'Mod not found'});
// //     const newLesson: any = { title, type: type||'lesson', isActive: isActive===true, isMandatory: isMandatory!==false, order: mod.lessons.length, content: content||'', fileUrl: fileUrl||'', videoUrl: videoUrl||'', meetingLink: meetingLink||'', jp: jp||0, scheduleDate: scheduleDate||null };
// //     if (type === 'quiz') { newLesson.questions = questions||[]; newLesson.quizDuration = quizDuration||10; }
// //     if (type === 'poll') { newLesson.pollQuestion = pollQuestion||''; newLesson.pollOptions = pollOptions||[]; }
// //     mod.lessons.push(newLesson); await course.save(); res.json(course);
// //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // });
// // router.put('/:id/modules/:moduleId/lessons/:lessonId', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
// //   try {
// //     const course = await Course.findById(req.params.id);
// //     if(!course) return res.status(404).json({error:'Not found'});
// //     const mod = course.modules.find((m:any)=>m._id.toString()===req.params.moduleId);
// //     if(!mod) return res.status(404).json({error:'Mod not found'});
// //     const les = mod.lessons.find((l:any)=>l._id.toString()===req.params.lessonId);
// //     if(!les) return res.status(404).json({error:'Les not found'});
// //     Object.assign(les, req.body); await course.save(); res.json(course);
// //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // });
// // router.delete('/:id/modules/:moduleId/lessons/:lessonId', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
// //   try {
// //     const course = await Course.findById(req.params.id);
// //     if(!course) return res.status(404).json({error:'Not found'});
// //     const mod = course.modules.find((m:any)=>m._id.toString()===req.params.moduleId);
// //     if(mod) { const idx = mod.lessons.findIndex((l:any)=>l._id.toString()===req.params.lessonId); if(idx>-1) { mod.lessons.splice(idx,1); await course.save(); res.json(course); } else { res.status(404).json({error:'Les not found'}); } } else { res.status(404).json({error:'Mod not found'}); }
// //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // });
// // router.patch('/:id/toggle-status', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => { /* logic sama */ });
// // router.patch('/:id/reorder', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => { /* logic sama */ });

// // export default router;







// import express, { Response } from 'express';
// import { Course } from '../models/Course'; 
// import { Progress } from '../models/Progress'; 
// import { User } from '../models/User'; 
// import { Notification } from '../models/Notification';
// import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth';

// const router = express.Router();

// // Helper Cek Akses
// const checkAccess = (course: any, user: any) => {
//     if (user.role === 'SUPER_ADMIN') return true;
//     return course.facilitatorIds && course.facilitatorIds.some((id: any) => id.toString() === user.id);
// };

// // --- GET ROUTES ---

// // 1. Get Public (Katalog)
// router.get('/', async (req, res) => {
//   try {
//     const courses = await Course.find({ isPublished: true }).populate('facilitatorIds', 'name').sort({ createdAt: -1 });
//     res.json({ courses });
//   } catch (error: any) { res.status(500).json({ error: error.message }); }
// });

// // 2. Get Admin All
// router.get('/admin/all', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
//   try {
//     const query = req.user!.role === 'SUPER_ADMIN' ? {} : { facilitatorIds: req.user!.id };
//     const courses = await Course.find(query).populate('facilitatorIds', 'name email role').sort({ createdAt: -1 });
//     res.json({ courses });
//   } catch (error: any) { res.status(500).json({ error: error.message }); }
// });

// // 3. Get Single Detail
// router.get('/:id', async (req, res) => {
//   try {
//     const course = await Course.findById(req.params.id)
//       .populate('facilitatorIds', 'name email role avatarUrl')
//       .populate({ path: 'modules.facilitatorId', model: 'User', select: 'name avatarUrl' });
//     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
//     res.json({ course });
//   } catch (error: any) { res.status(500).json({ error: error.message }); }
// });

// // 4. Get Participants & Real Progress
// router.get('/:id/participants', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
//   try {
//     const courseId = req.params.id;
//     const course = await Course.findById(courseId);
//     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });

//     // Hitung Total Lesson Aktif
//     let totalLessons = 0;
//     course.modules.forEach((m: any) => { 
//         if(m.isActive) m.lessons.forEach((l: any) => { if(l.isActive) totalLessons++; }); 
//     });

//     const students = await User.find({ role: 'STUDENT' }).select('name email avatarUrl createdAt');
//     const progresses = await Progress.find({ courseId: courseId });

//     const participants = students.map(student => {
//         const studentProgress = progresses.find(p => p.userId.toString() === student._id.toString());
//         let progressPercent = 0;
//         let isCompleted = false;
//         let completedLessons: string[] = [];

//         if (studentProgress) {
//             completedLessons = studentProgress.completedLessons.map((id: any) => id.toString());
//             const completedCount = completedLessons.length;
            
//             if (totalLessons > 0) progressPercent = Math.round((completedCount / totalLessons) * 100);
//             if (progressPercent > 100) progressPercent = 100;
            
//             // [FIX ERROR DISINI] Menggunakan isCompleted (bukan completed)
//             isCompleted = studentProgress.isCompleted || progressPercent === 100;
//         }

//         return {
//             user: { 
//                 _id: student._id,
//                 name: student.name,
//                 email: student.email,
//                 avatarUrl: student.avatarUrl,
//                 joinedAt: student.createdAt 
//             },
//             name: student.name, 
//             email: student.email,
//             joinDate: student.createdAt,
//             progress: progressPercent,
//             isCertified: isCompleted,
//             completedLessons 
//         };
//     });

//     res.json({ participants });
//   } catch (error: any) { res.status(500).json({ error: error.message }); }
// });

// // --- ACTIONS ---

// router.patch('/:id/publish', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
//     try {
//         const course = await Course.findByIdAndUpdate(req.params.id, { isPublished: true }, { new: true });
//         if (!course) return res.status(404).json({ error: 'Not found' });
        
//         const allUsers = await User.find({ _id: { $ne: req.user!.id } }).select('_id');
//         if (allUsers.length > 0) {
//             const notifs = allUsers.map(u => ({ 
//                 recipient: u._id, sender: req.user!.id, type: 'course', topic: course._id, 
//                 message: `Pelatihan Baru: "${course.title}"`, isRead: false, createdAt: new Date() 
//             }));
//             await Notification.insertMany(notifs);
//         }
//         res.json({ message: 'Published', course });
//     } catch (e: any) { res.status(500).json({ error: e.message }); }
// });

// // Reset Kuis
// router.post('/reset-quiz', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
//     try {
//         const { studentId, quizId } = req.body;
//         const progress = await Progress.findOne({ userId: studentId, completedLessons: quizId });
        
//         if (progress) {
//             progress.completedLessons = progress.completedLessons.filter((lid: any) => lid.toString() !== quizId);
//             if((progress as any).quizScores) (progress as any).quizScores = (progress as any).quizScores.filter((qs: any) => qs.lessonId.toString() !== quizId);
//             if((progress as any).lessonDetails) (progress as any).lessonDetails = (progress as any).lessonDetails.filter((ld: any) => ld.lessonId.toString() !== quizId);
            
//             progress.isCompleted = false; // Fix property name
            
//             await progress.save();
//             res.json({ message: 'Reset berhasil.' });
//         } else {
//              const progCheck = await Progress.findOne({ userId: studentId });
//              if(progCheck && (progCheck as any).quizScores) {
//                   (progCheck as any).quizScores = (progCheck as any).quizScores.filter((qs: any) => qs.lessonId.toString() !== quizId);
//                   await progCheck.save();
//                   return res.json({ message: 'Score reset.' });
//              }
//              res.json({ message: 'User belum mengerjakan.' });
//         }
//     } catch (e: any) { res.status(500).json({ error: e.message }); }
// });

// // Mark Complete
// router.post('/mark-complete-lesson', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
//     try {
//         const { studentId, lessonId, courseId } = req.body;
//         let progress = await Progress.findOne({ userId: studentId, courseId });
//         if (!progress) progress = await Progress.create({ userId: studentId, courseId, completedLessons: [] });

//         const exists = progress.completedLessons.some((id: any) => id.toString() === lessonId);
//         if (!exists) {
//             progress.completedLessons.push(lessonId);
//             await progress.save();
//         }
//         res.json({ message: 'Ditandai selesai.', completedLessons: progress.completedLessons });
//     } catch (e: any) { res.status(500).json({ error: e.message }); }
// });

// // --- BASIC CRUD ---
// router.post('/', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
//   try {
//     const { title, description, price, category, programType, thumbnailUrl, organizer } = req.body;
//     const course = await Course.create({ title, description: description||'', price: price||0, category: category||'General', programType: programType||'course', thumbnailUrl: thumbnailUrl||'', organizer: organizer||'PMI Pusat', facilitatorIds: [req.user!.id], modules: [], isPublished: false });
//     res.status(201).json({ message: 'Created', course });
//   } catch (error: any) { res.status(400).json({ error: error.message }); }
// });

// router.put('/:id', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
//   try {
//     const course = await Course.findById(req.params.id);
//     if (!course) return res.status(404).json({ error: 'Not found' });
//     if (!checkAccess(course, req.user)) return res.status(403).json({ error: 'Access denied' });
//     Object.assign(course, req.body);
//     await course.save();
//     res.json({ message: 'Updated', course });
//   } catch (error: any) { res.status(500).json({ error: error.message }); }
// });

// router.delete('/:id', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
//   try {
//     const course = await Course.findById(req.params.id);
//     if (!course) return res.status(404).json({ error: 'Not found' });
//     if (!checkAccess(course, req.user)) return res.status(403).json({ error: 'Access denied' });
//     await Course.findByIdAndDelete(req.params.id);
//     await Progress.deleteMany({ courseId: req.params.id });
//     res.json({ message: 'Deleted' });
//   } catch (error: any) { res.status(500).json({ error: error.message }); }
// });

// // --- MODULES & LESSONS ---
// router.post('/:id/modules', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
//     try {
//         const course = await Course.findById(req.params.id);
//         if(!course) return res.status(404).json({error:'Not found'});
//         course.modules.push({ title: req.body.title, lessons: [], order: course.modules.length, isActive: true, isMandatory: req.body.isMandatory !== false, jp: req.body.jp||0, scheduleDate: req.body.scheduleDate||null, facilitatorId: req.body.facilitatorId || req.user!.id } as any);
//         await course.save(); res.json(course);
//     } catch(e:any){res.status(500).json({error:e.message})}
// });

// router.put('/:id/modules/:moduleId', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
//     try {
//         const course = await Course.findById(req.params.id);
//         if(!course) return res.status(404).json({error:'Not found'});
//         const mod = course.modules.find((m:any)=>m._id.toString()===req.params.moduleId);
//         if(mod) { Object.assign(mod, req.body); await course.save(); } res.json(course);
//     } catch(e:any){res.status(500).json({error:e.message})}
// });

// router.post('/:id/modules/:moduleId/lessons', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
//   try {
//     const { title, type, content, fileUrl, videoUrl, meetingLink, questions, quizDuration, pollQuestion, pollOptions, isActive, isMandatory, jp, scheduleDate, classroomData, facilitatorId } = req.body;
//     const course = await Course.findById(req.params.id);
//     if(!course) return res.status(404).json({error:'Not found'});
//     const mod = course.modules.find((m:any)=>m._id.toString()===req.params.moduleId);
//     if(!mod) return res.status(404).json({error:'Mod not found'});
    
//     const newLesson: any = { title, type: type||'lesson', isActive: isActive!==false, isMandatory: isMandatory!==false, order: mod.lessons.length, content: content||'', fileUrl: fileUrl||'', videoUrl: videoUrl||'', meetingLink: meetingLink||'', jp: jp||0, scheduleDate: scheduleDate||null, facilitatorId: facilitatorId || mod.facilitatorId };
//     if (type === 'quiz' || type === 'essay') { newLesson.questions = questions||[]; newLesson.quizDuration = quizDuration||10; }
//     if (type === 'poll') { newLesson.pollQuestion = pollQuestion||''; newLesson.pollOptions = pollOptions||[]; }
//     if (type === 'google_classroom') { newLesson.classroomData = classroomData; }
    
//     mod.lessons.push(newLesson); await course.save(); res.json(course);
//   } catch (e: any) { res.status(500).json({ error: e.message }); }
// });

// router.put('/:id/modules/:moduleId/lessons/:lessonId', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
//   try {
//     const course = await Course.findById(req.params.id);
//     if(!course) return res.status(404).json({error:'Not found'});
//     const mod = course.modules.find((m:any)=>m._id.toString()===req.params.moduleId);
//     if(!mod) return res.status(404).json({error:'Mod not found'});
//     const les = mod.lessons.find((l:any)=>l._id.toString()===req.params.lessonId);
//     if(!les) return res.status(404).json({error:'Les not found'});
//     Object.assign(les, req.body); await course.save(); res.json(course);
//   } catch (e: any) { res.status(500).json({ error: e.message }); }
// });

// router.delete('/:id/modules/:moduleId/lessons/:lessonId', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
//   try {
//     const course = await Course.findById(req.params.id);
//     if(!course) return res.status(404).json({error:'Not found'});
//     const mod = course.modules.find((m:any)=>m._id.toString()===req.params.moduleId);
//     if(mod) { 
//         const idx = mod.lessons.findIndex((l:any)=>l._id.toString()===req.params.lessonId); 
//         if(idx>-1) { mod.lessons.splice(idx,1); await course.save(); res.json(course); } else { res.status(404).json({error:'Lesson not found'}); } 
//     } else { res.status(404).json({error:'Module not found'}); }
//   } catch (e: any) { res.status(500).json({ error: e.message }); }
// });

// router.patch('/:id/toggle-status', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
//     try {
//         const { moduleId, lessonId } = req.body;
//         const course = await Course.findById(req.params.id);
//         if(!course) return res.status(404).json({error:'Not found'});
//         const mod = course.modules.find((m:any)=>m._id.toString()===moduleId);
//         if(mod) {
//             if(lessonId) { const les = mod.lessons.find((l:any)=>l._id.toString()===lessonId); if(les) les.isActive = !les.isActive; } 
//             else { mod.isActive = !mod.isActive; }
//             await course.save(); res.json(course);
//         } else { res.status(404).json({error:'Module not found'}); }
//     } catch(e:any) { res.status(500).json({error:e.message}); }
// });

// router.patch('/:id/reorder', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
//     try {
//         const { modules } = req.body;
//         const course = await Course.findById(req.params.id);
//         if(!course) return res.status(404).json({error:'Not found'});
//         course.modules = modules; 
//         await course.save(); res.json(course);
//     } catch(e:any) { res.status(500).json({error:e.message}); }
// });

// export default router;







import { Router } from 'express';
import { Course } from '../models/Course'; 
import { User } from '../models/User'; // Import User jika perlu validasi author
import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth'; 
import { z } from 'zod';

const router = Router();

// --- ZOD SCHEMAS (Untuk Validasi Input) ---
const lessonSchema = z.object({
  title: z.string().min(1),
  type: z.enum(['video_url', 'upload_doc', 'quiz', 'essay', 'google_classroom']),
  videoUrl: z.string().optional(),
  content: z.string().optional(),
  fileUrl: z.string().optional(),
  jp: z.number().default(0),
  scheduleDate: z.string().optional(),
  facilitator: z.string().optional(), // ID Facilitator
});

const moduleSchema = z.object({
  title: z.string().min(1),
  lessons: z.array(lessonSchema),
});

const courseSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  category: z.string().optional(),
  level: z.string().optional(),
  price: z.number().default(0),
  thumbnailUrl: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  credits: z.number().default(0), // JP Total
  facilitator: z.string().optional(), // ID Fasilitator Utama
  modules: z.array(moduleSchema).default([]),
  published: z.boolean().default(false),
});

// --- ROUTES ---

// 1. GET ALL COURSES (Public/Filtered)
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query: any = { published: true };

    if (category) query.category = category;
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    const courses = await Course.find(query)
      .populate('facilitator', 'name avatarUrl')
      .sort({ createdAt: -1 });
      
    res.json({ courses });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 2. GET SINGLE COURSE BY ID (Endpoint yang dipanggil Learning Room)
router.get('/:id', requireAuth, async (req: AuthedRequest, res: any) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('facilitator', 'name email avatarUrl') // Populate data Fasilitator utama
      .populate({
        path: 'participants.user',
        select: 'name avatarUrl'
      });

    if (!course) {
      return res.status(404).json({ error: 'Kursus tidak ditemukan' });
    }

    res.json(course);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 3. CREATE COURSE (Admin/Facilitator Only)
router.post('/', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
  try {
    const data = courseSchema.parse(req.body);
    
    // Set default facilitator to current user if not provided
    if (!data.facilitator) {
      data.facilitator = req.user!.id;
    }

    const course = await Course.create({
      ...data,
      author: req.user!.id, // Creator
    });

    res.status(201).json(course);
  } catch (err: any) {
    if (err.name === 'ZodError') return res.status(400).json({ error: err.issues });
    res.status(500).json({ error: err.message });
  }
});

// 4. UPDATE COURSE
router.put('/:id', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
  try {
    // Validasi input sebagian (Partial)
    const data = courseSchema.partial().parse(req.body);

    const course = await Course.findOneAndUpdate(
      { _id: req.params.id }, // Bisa ditambah cek author jika perlu
      { $set: data },
      { new: true }
    );

    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json(course);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 5. DELETE COURSE
router.delete('/:id', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
  try {
    const course = await Course.findOneAndDelete({ _id: req.params.id });
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json({ message: 'Course deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;











import { Router, Request, Response } from 'express';
import { Course } from '../models/Course'; 
import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth'; 
import { z } from 'zod';

const router = Router();

// ==========================================
// 1. ZOD SCHEMAS (UPDATED)
// ==========================================
const lessonSchema = z.object({
  title: z.string().min(1),
  type: z.enum(['video_url', 'upload_doc', 'quiz', 'essay', 'google_classroom', 'lesson', 'pdf', 'download_doc', 'image', 'slide']).optional(),
  videoUrl: z.string().optional(),
  content: z.string().optional(),
  fileUrl: z.string().optional(),
  jp: z.number().default(0),
  scheduleDate: z.string().optional(),
  facilitator: z.string().optional(),
  classroomData: z.any().optional(),
  questions: z.array(z.any()).optional(),
  quizDuration: z.number().optional(),
  isActive: z.boolean().default(true),
  isMandatory: z.boolean().default(false)
});

const moduleSchema = z.object({
  title: z.string().min(1),
  lessons: z.array(lessonSchema).optional(),
  isActive: z.boolean().default(true),
  isMandatory: z.boolean().default(false)
});

const courseSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  category: z.string().optional(), 
  level: z.string().optional(),
  price: z.number().default(0),
  thumbnailUrl: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  credits: z.number().default(0),
  
  // [UPDATE] Mendukung single facilitator (string) ATAU multiple (array string)
  facilitator: z.string().optional(), 
  facilitatorIds: z.array(z.string()).optional(), // <-- INI KUNCI PERBAIKANNYA

  modules: z.array(moduleSchema).default([]),
  published: z.boolean().default(false), 
  organizer: z.string().default('PMI Pusat'),
  programType: z.string().default('training'),
  competencies: z.array(z.string()).optional(),
});

// ==========================================
// 2. COURSE ROUTES
// ==========================================

// GET PUBLISHED
router.get('/published', async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    let query: any = { isPublished: true };

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    const courses = await Course.find(query)
      .select('title thumbnailUrl level category price organizer programType facilitatorIds modules isPublished')
      .populate('facilitatorIds', 'name avatarUrl') 
      .populate('categoryId', 'name')
      .sort({ createdAt: -1 });
      
    res.json({ courses });
  } catch (err: any) {
    console.error("Error fetching published:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET ALL
router.get('/', requireAuth, async (req: Request, res: Response) => {
  try {
    const courses = await Course.find()
      .select('title isPublished modules updatedAt facilitatorIds price category organizer programType thumbnailUrl')
      .populate('facilitatorIds', 'name avatarUrl')
      .sort({ createdAt: -1 });
    res.json({ courses });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET SINGLE
router.get('/:id', requireAuth, async (req: AuthedRequest, res: Response) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('facilitatorIds', 'name email avatarUrl')
      .populate('modules.facilitatorId', 'name')
      .populate('modules.lessons.facilitatorId', 'name');

    if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
    res.json(course); 
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE COURSE
router.post('/', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
  try {
    const data = courseSchema.parse(req.body);
    
    // Logika Fasilitator: Prioritaskan Array IDs, jika tidak ada pakai Single, jika tidak ada pakai user login
    let finalFacilitatorIds: string[] = [];
    
    if (data.facilitatorIds && data.facilitatorIds.length > 0) {
        finalFacilitatorIds = data.facilitatorIds;
    } else if (data.facilitator) {
        finalFacilitatorIds = [data.facilitator];
    } else {
        finalFacilitatorIds = [req.user!.id];
    }

    const course = await Course.create({
      ...data,
      isPublished: data.published, 
      facilitatorIds: finalFacilitatorIds,
      organizer: data.organizer,
      programType: data.programType
    });

    res.status(201).json(course);
  } catch (err: any) {
    if (err.name === 'ZodError') return res.status(400).json({ error: err.issues });
    res.status(500).json({ error: err.message });
  }
});

// UPDATE COURSE (General Info & Fasilitator Team)
router.put('/:id', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
  try {
    // Validasi input parsial (hanya field yang dikirim)
    const data = courseSchema.partial().parse(req.body);
    const updateData: any = { ...data };
    
    // 1. Handle Publish Status
    if (data.published !== undefined) {
        updateData.isPublished = data.published;
        delete updateData.published;
    }

    // 2. Handle Fasilitator (PENTING UNTUK TIM FASILITATOR)
    if (data.facilitatorIds) {
        // Jika frontend kirim array ID (Tim Fasilitator)
        updateData.facilitatorIds = data.facilitatorIds;
    } else if (data.facilitator) {
        // Jika frontend kirim single ID (Cara lama)
        updateData.facilitatorIds = [data.facilitator];
        delete updateData.facilitator; // Hapus field lama biar gak error di mongo
    }

    const course = await Course.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updateData },
      { new: true }
    );

    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json(course);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH PUBLISH
router.patch('/:id/publish', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
  try {
      const course = await Course.findById(req.params.id);
      if(!course) return res.status(404).json({error: 'Not found'});
      course.isPublished = !course.isPublished;
      await course.save();
      res.json(course);
  } catch(err: any) {
      res.status(500).json({error: err.message});
  }
});

// DELETE COURSE
router.delete('/:id', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
  try {
    const course = await Course.findOneAndDelete({ _id: req.params.id });
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json({ message: 'Course deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 3. MODULE & LESSON ROUTES
// ==========================================

// Tambah Modul
router.post('/:id/modules', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    course.modules.push(req.body); 
    await course.save();
    res.json(course);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Edit Modul
router.put('/:id/modules/:moduleId', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    const module = course.modules.find((m: any) => m._id.toString() === req.params.moduleId);
    if (!module) return res.status(404).json({ error: 'Module not found' });
    Object.assign(module, req.body); 
    await course.save();
    res.json(course);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Hapus Modul
router.delete('/:id/modules/:moduleId', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    course.modules = course.modules.filter((m: any) => m._id.toString() !== req.params.moduleId);
    await course.save();
    res.json(course);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Tambah Materi
router.post('/:id/modules/:moduleId/lessons', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    const module = course.modules.find((m: any) => m._id.toString() === req.params.moduleId);
    if (!module) return res.status(404).json({ error: 'Module not found' });
    module.lessons.push(req.body);
    await course.save();
    res.json(course);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Edit Materi
router.put('/:id/modules/:moduleId/lessons/:lessonId', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    const module = course.modules.find((m: any) => m._id.toString() === req.params.moduleId);
    if (!module) return res.status(404).json({ error: 'Module not found' });
    const lesson = module.lessons.find((l: any) => l._id.toString() === req.params.lessonId);
    if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
    Object.assign(lesson, req.body);
    await course.save();
    res.json(course);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Hapus Materi
router.delete('/:id/modules/:moduleId/lessons/:lessonId', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    const module = course.modules.find((m: any) => m._id.toString() === req.params.moduleId);
    if (!module) return res.status(404).json({ error: 'Module not found' });
    module.lessons = module.lessons.filter((l: any) => l._id.toString() !== req.params.lessonId);
    await course.save();
    res.json(course);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Toggle Status & Reorder
router.patch('/:id/toggle-status', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
  try {
    const { moduleId, lessonId } = req.body;
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    if (moduleId && lessonId) {
       const mod = course.modules.find((m: any) => m._id.toString() === moduleId);
       if (mod) {
           const les = mod.lessons.find((l: any) => l._id.toString() === lessonId);
           if (les) les.isActive = !les.isActive;
       }
    } else if (moduleId) {
       const mod = course.modules.find((m: any) => m._id.toString() === moduleId);
       if (mod) mod.isActive = !mod.isActive;
    }
    await course.save();
    res.json(course);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.patch('/:id/reorder', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
  try {
    const { modules } = req.body;
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    course.modules = modules; 
    await course.save();
    res.json(course);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

// // // // // // // import { Router } from 'express';
// // // // // // // import { z } from 'zod';
// // // // // // // import { requireAuth, AuthedRequest } from '../middleware/auth';
// // // // // // // import { Course } from '../models/Course';
// // // // // // // import Progress from '../models/Progress';

// // // // // // // const router = Router();

// // // // // // // router.get('/:courseId/me', requireAuth, async (req: AuthedRequest, res) => {
// // // // // // //   const { courseId } = req.params;
// // // // // // //   const course = await Course.findById(courseId).lean();
// // // // // // //   if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // //   const total = course.modules.reduce((acc: number, m: any) => acc + (m.lessons?.length || 0), 0);
// // // // // // //   const completed = await Progress.countDocuments({ user: req.user!.id, course: courseId });
// // // // // // //   const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
// // // // // // //   const items = await Progress.find({ user: req.user!.id, course: courseId }).lean();
// // // // // // //   res.json({ total, completed, percent, items });
// // // // // // // });

// // // // // // // router.post('/complete', requireAuth, async (req: AuthedRequest, res) => {
// // // // // // //   const schema = z.object({ courseId: z.string(), moduleIndex: z.number().min(0), lessonIndex: z.number().min(0) });
// // // // // // //   try {
// // // // // // //     const { courseId, moduleIndex, lessonIndex } = schema.parse(req.body);
// // // // // // //     const course = await Course.findById(courseId).lean();
// // // // // // //     if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // //     if (moduleIndex < 0 || moduleIndex >= course.modules.length) return res.status(400).json({ error: 'Invalid moduleIndex' });
// // // // // // //     const lessons = course.modules[moduleIndex].lessons || [];
// // // // // // //     if (lessonIndex < 0 || lessonIndex >= lessons.length) return res.status(400).json({ error: 'Invalid lessonIndex' });
// // // // // // //     const doc = await Progress.findOneAndUpdate(
// // // // // // //       { user: req.user!.id, course: courseId, moduleIndex, lessonIndex },
// // // // // // //       { $setOnInsert: { completedAt: new Date() } },
// // // // // // //       { upsert: true, new: true }
// // // // // // //     );
// // // // // // //     res.json({ progress: doc });
// // // // // // //   } catch (err: any) {
// // // // // // //     res.status(400).json({ error: 'Validation error', issues: err.issues });
// // // // // // //   }
// // // // // // // });

// // // // // // // export default router;
// // // // // // import express from 'express';
// // // // // // import { z } from 'zod';
// // // // // // import { requireAuth } from '../middleware/auth';
// // // // // // // PERBAIKAN IMPORT DI SINI 👇
// // // // // // import { Course } from '../models/Course'; 
// // // // // // import { User } from '../models/User'; 

// // // // // // const router = express.Router();

// // // // // // // Schema Validasi Body
// // // // // // const progressSchema = z.object({
// // // // // //   courseId: z.string(),
// // // // // //   moduleId: z.string(),
// // // // // //   lessonId: z.string(),
// // // // // // });

// // // // // // /**
// // // // // //  * POST /api/progress
// // // // // //  * Menandai lesson sebagai "Selesai" (Completed)
// // // // // //  */
// // // // // // router.post('/', requireAuth, async (req, res) => {
// // // // // //   try {
// // // // // //     // 1. Validasi Input
// // // // // //     const { courseId, moduleId, lessonId } = progressSchema.parse(req.body);
// // // // // //     const userId = req.user!.id;

// // // // // //     // 2. Pastikan Kursus & Modul Valid
// // // // // //     const course = await Course.findById(courseId);
// // // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });

// // // // // //     // 3. Ambil User
// // // // // //     const user = await User.findById(userId);
// // // // // //     if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });

// // // // // //     // 4. Update Progress di User (Asumsi User punya field 'progress')
// // // // // //     // Struktur progress biasanya: [{ courseId, completedLessons: [lessonId, lessonId] }]
    
// // // // // //     // Cek apakah user sudah punya progress untuk course ini
// // // // // //     let courseProgress = user.progress?.find((p: any) => p.courseId.toString() === courseId);

// // // // // //     if (!courseProgress) {
// // // // // //       // Jika belum ada, buat baru
// // // // // //       if (!user.progress) user.progress = [];
// // // // // //       user.progress.push({
// // // // // //         courseId,
// // // // // //         completedLessons: [lessonId]
// // // // // //       });
// // // // // //     } else {
// // // // // //       // Jika sudah ada, tambahkan lessonId jika belum ada (hindari duplikat)
// // // // // //       const alreadyCompleted = courseProgress.completedLessons.includes(lessonId);
// // // // // //       if (!alreadyCompleted) {
// // // // // //         courseProgress.completedLessons.push(lessonId);
// // // // // //       }
// // // // // //     }

// // // // // //     // 5. Simpan Perubahan
// // // // // //     await user.save();

// // // // // //     res.json({ 
// // // // // //       message: 'Progress updated', 
// // // // // //       progress: user.progress 
// // // // // //     });

// // // // // //   } catch (error: any) {
// // // // // //     console.error(error);
// // // // // //     res.status(400).json({ error: error.message || 'Gagal update progress' });
// // // // // //   }
// // // // // // });

// // // // // // /**
// // // // // //  * GET /api/progress/:courseId
// // // // // //  * Mengambil list lesson yang sudah selesai untuk kursus tertentu
// // // // // //  */
// // // // // // router.get('/:courseId', requireAuth, async (req, res) => {
// // // // // //   try {
// // // // // //     const { courseId } = req.params;
// // // // // //     const user = await User.findById(req.user!.id);
    
// // // // // //     if (!user) return res.status(404).json({ error: 'User not found' });

// // // // // //     const courseProgress = user.progress?.find((p: any) => p.courseId.toString() === courseId);
    
// // // // // //     res.json({
// // // // // //       completedLessons: courseProgress ? courseProgress.completedLessons : []
// // // // // //     });

// // // // // //   } catch (error) {
// // // // // //     res.status(500).json({ error: 'Gagal mengambil progress' });
// // // // // //   }
// // // // // // });

// // // // // // export default router;
// // // // // import express, { Response } from 'express';
// // // // // import { StudentProgress } from '../models/StudentProgress';
// // // // // import { requireAuth, AuthedRequest } from '../middleware/auth';

// // // // // const router = express.Router();

// // // // // /**
// // // // //  * UPDATE / SAVE PROGRESS
// // // // //  * Dipanggil saat siswa selesai baca materi, submit kuis, atau upload tugas
// // // // //  */
// // // // // router.post('/', requireAuth, async (req: AuthedRequest, res: Response) => {
// // // // //   try {
// // // // //     const { courseId, moduleId, lessonId, isCompleted, quizScore, submissionUrl } = req.body;
// // // // //     const studentId = req.user!.id;

// // // // //     // Cari progress lama atau buat baru (Upsert)
// // // // //     let progress = await StudentProgress.findOne({ studentId, lessonId });

// // // // //     if (!progress) {
// // // // //       progress = new StudentProgress({
// // // // //         studentId,
// // // // //         courseId,
// // // // //         moduleId,
// // // // //         lessonId
// // // // //       });
// // // // //     }

// // // // //     // Update field yang dikirim
// // // // //     if (isCompleted !== undefined) {
// // // // //       progress.isCompleted = isCompleted;
// // // // //       if (isCompleted) progress.completedAt = new Date();
// // // // //     }
// // // // //     if (quizScore !== undefined) progress.quizScore = quizScore;
// // // // //     if (submissionUrl !== undefined) progress.submissionUrl = submissionUrl;

// // // // //     await progress.save();
// // // // //     res.json(progress);
// // // // //   } catch (e: any) {
// // // // //     res.status(500).json({ error: e.message });
// // // // //   }
// // // // // });

// // // // // /**
// // // // //  * GET PROGRESS BY COURSE
// // // // //  * Dipanggil saat siswa membuka halaman materi untuk tahu mana yang sudah selesai
// // // // //  */
// // // // // router.get('/:courseId', requireAuth, async (req: AuthedRequest, res: Response) => {
// // // // //   try {
// // // // //     const progress = await StudentProgress.find({
// // // // //       studentId: req.user!.id,
// // // // //       courseId: req.params.courseId
// // // // //     });
// // // // //     res.json({ progress });
// // // // //   } catch (e: any) {
// // // // //     res.status(500).json({ error: e.message });
// // // // //   }
// // // // // });

// // // // // export default router;
// // // // import express from 'express';
// // // // import { requireAuth } from '../middleware/auth';
// // // // import { getProgress, updateProgress } from '../controllers/progressController';

// // // // const router = express.Router();

// // // // // GET /api/progress/:courseId -> Ambil progress saat ini
// // // // router.get('/:courseId', requireAuth, getProgress);

// // // // // POST /api/progress/:courseId/complete -> Simpan progress materi
// // // // router.post('/:courseId/complete', requireAuth, updateProgress);

// // // // export default router;
// // // import express from 'express';
// // // import { requireAuth, requireFacilitator } from '../middleware/auth';
// // // import { getProgress, updateProgress, markModuleComplete } from '../controllers/progressController';

// // // const router = express.Router();

// // // // --- ROUTE UNTUK SISWA ---

// // // // GET /api/progress/:courseId
// // // // Mengambil data progress user saat ini
// // // router.get('/:courseId', requireAuth, getProgress);

// // // // POST /api/progress/:courseId/complete
// // // // Menandai satu materi (lesson) sebagai selesai
// // // router.post('/:courseId/complete', requireAuth, updateProgress);


// // // // --- ROUTE UNTUK ADMIN / FASILITATOR ---

// // // // POST /api/progress/mark-complete
// // // // Meluluskan modul secara manual (Bulk complete lessons inside module)
// // // // Wajib role FACILITATOR atau SUPER_ADMIN
// // // router.post('/mark-complete', requireAuth, requireFacilitator, markModuleComplete);

// // // export default router;
// // import express from 'express';
// // // [FIX ERROR] Gunakan nama export yang benar dari middleware auth Anda
// // import { requireAuth } from '../middleware/auth'; 
// // import { 
// //     getProgress, 
// //     markLessonComplete, 
// //     submitEssay, 
// //     submitTask   
// // } from '../controllers/progressController';

// // const router = express.Router();

// // // Gunakan requireAuth, bukan authenticate
// // router.get('/:courseId', requireAuth, getProgress);
// // router.post('/:courseId/complete', requireAuth, markLessonComplete);

// // router.post('/:courseId/submit-essay', requireAuth, submitEssay);
// // router.post('/:courseId/submit-task', requireAuth, submitTask);

// // export default router;

// import express from 'express';
// import { requireAuth } from '../middleware/auth'; 
// import { 
//     getProgress, 
//     markLessonComplete, 
//     submitEssay, 
//     submitTask   
// } from '../controllers/progressController';

// const router = express.Router();

// // [FIX] Route Khusus untuk aksi via Body (Frontend modern mengirim courseId di body)
// // Letakkan INI PALING ATAS agar tidak tertangkap oleh /:courseId
// router.post('/complete', requireAuth, markLessonComplete);
// router.post('/submit-essay', requireAuth, submitEssay);
// router.post('/submit-task', requireAuth, submitTask);

// // Route Lama (Legacy / Parameter based)
// router.get('/:courseId', requireAuth, getProgress);
// router.post('/:courseId/complete', requireAuth, markLessonComplete);
// router.post('/:courseId/submit-essay', requireAuth, submitEssay);
// router.post('/:courseId/submit-task', requireAuth, submitTask);

// export default router;

import express from 'express';
import { requireAuth } from '../middleware/auth'; 
import { 
    getProgress, 
    markLessonComplete, 
    submitEssay, 
    submitTask,
    submitQuiz // [NEW] Tambahkan import ini
} from '../controllers/progressController';

const router = express.Router();

// --- ROUTE BARU (Body-based) ---
// Frontend mengirim courseId di dalam body request.
// Letakkan INI PALING ATAS agar tidak tertangkap oleh parameter /:courseId

router.post('/complete', requireAuth, markLessonComplete);
router.post('/submit-essay', requireAuth, submitEssay);
router.post('/submit-task', requireAuth, submitTask);
router.post('/submit-quiz', requireAuth, submitQuiz); // [NEW] Endpoint untuk submit kuis pilihan ganda

// --- ROUTE LAMA (Legacy / Parameter-based) ---
// Tetap dipertahankan agar fitur lama tidak error

router.get('/:courseId', requireAuth, getProgress);
router.post('/:courseId/complete', requireAuth, markLessonComplete);
router.post('/:courseId/submit-essay', requireAuth, submitEssay);
router.post('/:courseId/submit-task', requireAuth, submitTask);

export default router;
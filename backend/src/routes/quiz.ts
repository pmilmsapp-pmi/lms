
// // // // // // import { Router } from 'express';
// // // // // // import { z } from 'zod';
// // // // // // import { requireAuth, requireFacilitator } from '../middleware/auth';
// // // // // // import Quiz from '../models/Quiz';
// // // // // // import Attempt from '../models/Attempt';



// // // // // // const router = Router();

// // // // // // // Create quiz (optional durationSeconds)
// // // // // // router.post('/', requireAuth, requireFacilitator, async (req, res) => {
// // // // // //   const schema = z.object({
// // // // // //     course: z.string(),
// // // // // //     title: z.string(),
// // // // // //     durationSeconds: z.number().int().positive().optional(),
// // // // // //     questions: z.array(z.object({ q: z.string(), choices: z.array(z.string()).min(2), answerIndex: z.number() }))
// // // // // //   });
// // // // // //   try {
// // // // // //     const data = schema.parse(req.body);
// // // // // //     const quiz = await Quiz.create(data);
// // // // // //     res.json({ quiz });
// // // // // //   } catch (err: any) {
// // // // // //     res.status(400).json({ error: 'Validation error', issues: err.issues });
// // // // // //   }
// // // // // // });

// // // // // // // List quizzes by optional course
// // // // // // router.get('/', requireAuth, async (req, res) => {
// // // // // //   const courseId = req.query.course as string | undefined;
// // // // // //   const filter: any = {};
// // // // // //   if (courseId) filter.course = courseId;
// // // // // //   const quizzes = await Quiz.find(filter).select('title durationSeconds course').lean();
// // // // // //   res.json({ quizzes });
// // // // // // });

// // // // // // // Get quiz (without answers)
// // // // // // router.get('/:id', requireAuth, async (req, res) => {
// // // // // //   const quiz = await Quiz.findById(req.params.id).lean();
// // // // // //   if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
// // // // // //   const { questions, ...rest } = quiz as any;
// // // // // //   res.json({ quiz: { ...rest, questions: questions.map((q: any) => ({ q: q.q, choices: q.choices })) } });
// // // // // // });


// // // // // // // Hapus quiz (FACILITATOR/SUPER_ADMIN)
// // // // // // router.delete('/:id', requireAuth, requireFacilitator, async (req, res) => {
// // // // // //   const del = await Quiz.findByIdAndDelete(req.params.id);
// // // // // //   if (!del) return res.status(404).json({ error: 'Quiz not found' });
// // // // // //   res.json({ ok: true });
// // // // // // });


// // // // // // // Start attempt
// // // // // // router.post('/:id/start', requireAuth, async (req, res) => {
// // // // // //   const quiz = await Quiz.findById(req.params.id).lean();
// // // // // //   if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
// // // // // //   const attempt = await Attempt.create({ quiz: quiz._id, user: (req as any).user.id, score: 0, status: 'in_progress' });
// // // // // //   res.json({ attempt: { id: attempt._id, startedAt: attempt.startedAt, durationSeconds: quiz.durationSeconds || null } });
// // // // // // });

// // // // // // // Submit attempt with timer enforcement
// // // // // // router.post('/:id/submit', requireAuth, async (req, res) => {
// // // // // //   const schema = z.object({ attemptId: z.string(), answers: z.array(z.number()) });
// // // // // //   try {
// // // // // //     const { attemptId, answers } = schema.parse(req.body);
// // // // // //     const quiz = await Quiz.findById(req.params.id).lean();
// // // // // //     if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
// // // // // //     const attempt = await Attempt.findById(attemptId);
// // // // // //     if (!attempt) return res.status(404).json({ error: 'Attempt not found' });
// // // // // //     if (String(attempt.quiz) !== String(quiz._id)) return res.status(400).json({ error: 'Attempt mismatch' });
// // // // // //     if (attempt.status !== 'in_progress') return res.status(400).json({ error: 'Attempt already submitted/expired' });
// // // // // //     const now = new Date();
// // // // // //     if (quiz.durationSeconds && (now.getTime() - attempt.startedAt.getTime()) / 1000 > quiz.durationSeconds) {
// // // // // //       attempt.status = 'expired';
// // // // // //       await attempt.save();
// // // // // //       return res.status(400).json({ error: 'Time expired' });
// // // // // //     }
// // // // // //     let score = 0;
// // // // // //     quiz.questions.forEach((q: any, idx: number) => { if (answers[idx] === q.answerIndex) score++; });
// // // // // //     attempt.score = score;
// // // // // //     attempt.status = 'submitted';
// // // // // //     attempt.submittedAt = now as any;
// // // // // //     await attempt.save();
// // // // // //     res.json({ attempt });
// // // // // //   } catch (err: any) {
// // // // // //     res.status(400).json({ error: 'Validation error', issues: err.issues });
// // // // // //   }
// // // // // // });

// // // // // // export default router;
// // // // // import express from 'express';
// // // // // import { z } from 'zod';
// // // // // import { Quiz } from '../models/Quiz'; // Pastikan Model Quiz sudah ada
// // // // // import { requireAuth, requireFacilitator } from '../middleware/auth';

// // // // // const router = express.Router();

// // // // // // 1. GET ALL QUIZZES (Untuk halaman admin list)
// // // // // router.get('/', requireAuth, async (req, res) => {
// // // // //   try {
// // // // //     // Populate 'course' agar kita bisa menampilkan nama kursus di tabel
// // // // //     const quizzes = await Quiz.find()
// // // // //       .populate('course', 'title') 
// // // // //       .sort({ createdAt: -1 });
      
// // // // //     res.json({ quizzes });
// // // // //   } catch (error) {
// // // // //     console.error(error);
// // // // //     res.status(500).json({ error: 'Gagal mengambil data kuis' });
// // // // //   }
// // // // // });

// // // // // // 2. GET SINGLE QUIZ
// // // // // router.get('/:id', requireAuth, async (req, res) => {
// // // // //   try {
// // // // //     const quiz = await Quiz.findById(req.params.id);
// // // // //     if (!quiz) return res.status(404).json({ error: 'Kuis tidak ditemukan' });
// // // // //     res.json({ quiz });
// // // // //   } catch (error) {
// // // // //     res.status(500).json({ error: 'Error server' });
// // // // //   }
// // // // // });

// // // // // // 3. POST CREATE QUIZ (Biasanya dipanggil dari halaman Admin Course)
// // // // // router.post('/', requireAuth, requireFacilitator, async (req, res) => {
// // // // //   try {
// // // // //     // Validasi sederhana (bisa diperketat dengan Zod)
// // // // //     const { courseId, title, durationSeconds, questions } = req.body;
    
// // // // //     const quiz = await Quiz.create({
// // // // //       course: courseId,
// // // // //       title,
// // // // //       durationSeconds: Number(durationSeconds),
// // // // //       questions: questions || []
// // // // //     });

// // // // //     res.status(201).json({ quiz });
// // // // //   } catch (error: any) {
// // // // //     res.status(400).json({ error: error.message });
// // // // //   }
// // // // // });

// // // // // // 4. DELETE QUIZ
// // // // // router.delete('/:id', requireAuth, requireFacilitator, async (req, res) => {
// // // // //   try {
// // // // //     await Quiz.findByIdAndDelete(req.params.id);
// // // // //     res.json({ message: 'Kuis dihapus' });
// // // // //   } catch (error) {
// // // // //     res.status(500).json({ error: 'Gagal menghapus kuis' });
// // // // //   }
// // // // // });

// // // // // export default router;

// // // // import express from 'express';
// // // // import { requireAuth } from '../middleware/auth';
// // // // import { getQuizById, submitQuiz } from '../controllers/quizController';

// // // // const router = express.Router();

// // // // // GET /api/quiz/:id
// // // // // Mengambil detail kuis (soal, durasi) berdasarkan ID Lesson
// // // // router.get('/:id', requireAuth, getQuizById);

// // // // // POST /api/quiz/:id/submit
// // // // // Mengirim jawaban kuis dan menghitung nilai
// // // // router.post('/:id/submit', requireAuth, submitQuiz);

// // // // export default router;
// // // import express from 'express';
// // // import { requireAuth } from '../middleware/auth';
// // // import { getQuizById, submitQuiz, startQuiz } from '../controllers/quizController';

// // // const router = express.Router();

// // // router.get('/:id', requireAuth, getQuizById);
// // // router.post('/:id/start', requireAuth, startQuiz); // <--- WAJIB ADA
// // // router.post('/:id/submit', requireAuth, submitQuiz);

// // // export default router;
// // import express from 'express';
// // import { requireAuth, requireFacilitator } from '../middleware/auth'; // Pastikan requireFacilitator diimport
// // import { getQuizById, submitQuiz, startQuiz, resetQuizAttempt } from '../controllers/quizController';

// // const router = express.Router();

// // router.get('/:id', requireAuth, getQuizById);
// // router.post('/:id/start', requireAuth, startQuiz);
// // router.post('/:id/submit', requireAuth, submitQuiz);

// // // --- RUTE BARU: RESET TIMER ---
// // // Hanya bisa diakses oleh Fasilitator atau Super Admin
// // router.post('/:id/reset', requireAuth, requireFacilitator, resetQuizAttempt);

// // export default router;
// import express from 'express';
// import { requireAuth, requireFacilitator } from '../middleware/auth'; // Pastikan requireFacilitator ada
// import { getQuizById, submitQuiz, startQuiz, resetQuizAttempt } from '../controllers/quizController';

// const router = express.Router();

// // Public / Student Routes
// router.get('/:id', requireAuth, getQuizById);
// router.post('/:id/start', requireAuth, startQuiz);
// router.post('/:id/submit', requireAuth, submitQuiz);

// // --- ADMIN / FACILITATOR ROUTES ---
// // Endpoint untuk mereset timer siswa
// router.post('/:id/reset', requireAuth, requireFacilitator, resetQuizAttempt);

// export default router;

import express from 'express';
import { requireAuth, requireFacilitator } from '../middleware/auth';
import { 
    getQuizById, 
    submitQuiz, 
    startQuiz, 
    resetQuizAttempt,
    getAllQuizzes, // [NEW]
    deleteQuiz     // [NEW]
} from '../controllers/quizController';

const router = express.Router();

// --- ADMIN / FACILITATOR ROUTES ---
router.get('/', requireAuth, requireFacilitator, getAllQuizzes); // List semua kuis
router.delete('/:id', requireAuth, requireFacilitator, deleteQuiz); // Hapus kuis
router.post('/:id/reset', requireAuth, requireFacilitator, resetQuizAttempt);

// --- PUBLIC / STUDENT ROUTES ---
router.get('/:id', requireAuth, getQuizById);
router.post('/:id/start', requireAuth, startQuiz);
router.post('/:id/submit', requireAuth, submitQuiz);

export default router;
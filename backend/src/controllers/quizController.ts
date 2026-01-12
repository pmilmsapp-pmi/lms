// // // // // import { Request, Response } from 'express';
// // // // // import { Course } from '../models/Course';

// // // // // // GET QUIZ BY ID
// // // // // // Endpoint: GET /api/quiz/:id
// // // // // export const getQuizById = async (req: Request, res: Response) => {
// // // // //   try {
// // // // //     const { id } = req.params;

// // // // //     // 1. Cari Kursus yang memiliki Lesson dengan ID tersebut
// // // // //     // Menggunakan dot notation 'modules.lessons._id' untuk mencari di dalam array nested
// // // // //     const course = await Course.findOne(
// // // // //         { "modules.lessons._id": id },
// // // // //         { "modules.$": 1, title: 1 } // Projection: Ambil modul yang cocok saja
// // // // //     );

// // // // //     if (!course) {
// // // // //       return res.status(404).json({ error: 'Kuis tidak ditemukan' });
// // // // //     }

// // // // //     // 2. Ekstrak Lesson/Quiz dari Modules
// // // // //     // Karena struktur data nested, kita harus loop manual untuk menemukan lesson yang tepat
// // // // //     let foundQuiz: any = null;
    
// // // // //     // Loop modules (biasanya hanya 1 karena projection, tapi untuk aman kita loop)
// // // // //     for (const module of course.modules) {
// // // // //         const lesson = module.lessons.find((l: any) => l._id.toString() === id);
// // // // //         if (lesson) {
// // // // //             foundQuiz = lesson;
// // // // //             break;
// // // // //         }
// // // // //     }

// // // // //     if (!foundQuiz) {
// // // // //         return res.status(404).json({ error: 'Data kuis detail tidak ditemukan' });
// // // // //     }

// // // // //     // 3. Return data kuis
// // // // //     // Kita sertakan title kursus juga untuk keperluan UI
// // // // //     res.json({
// // // // //         ...foundQuiz.toObject(),
// // // // //         courseTitle: course.title,
// // // // //         courseId: course._id
// // // // //     });

// // // // //   } catch (error: any) {
// // // // //     console.error("Get Quiz Error:", error);
// // // // //     res.status(500).json({ error: error.message });
// // // // //   }
// // // // // };
// // // // import { Request, Response } from 'express';
// // // // import { Course } from '../models/Course';
// // // // import { Progress } from '../models/Progress';

// // // // // --- GET QUIZ DETAIL ---
// // // // export const getQuizById = async (req: Request, res: Response) => {
// // // //   try {
// // // //     const { id } = req.params;

// // // //     // 1. Cari Kursus yang memiliki Lesson dengan ID tersebut
// // // //     // Teknik: Mencari di dalam array nested 'modules.lessons'
// // // //     const course = await Course.findOne(
// // // //         { "modules.lessons._id": id },
// // // //         { "title": 1, "modules.$": 1 } // Projection: Ambil modul yang cocok saja
// // // //     );

// // // //     if (!course) {
// // // //       return res.status(404).json({ error: 'Kuis tidak ditemukan' });
// // // //     }

// // // //     // 2. Ekstrak Lesson Kuis dari Modul yang ditemukan
// // // //     let foundQuiz: any = null;
// // // //     let moduleId: string = "";

// // // //     // Loop modules (biasanya cuma 1 karena projection $)
// // // //     for (const module of course.modules) {
// // // //         const lesson = module.lessons.find((l: any) => l._id.toString() === id);
// // // //         if (lesson) {
// // // //             foundQuiz = lesson;
// // // //             moduleId = module._id as string;
// // // //             break;
// // // //         }
// // // //     }

// // // //     if (!foundQuiz) {
// // // //         return res.status(404).json({ error: 'Data kuis detail tidak ditemukan' });
// // // //     }

// // // //     // 3. Return data kuis yang bersih (tanpa jawaban kunci jika perlu, tapi untuk simple logic kirim saja)
// // // //     res.json({
// // // //         ...foundQuiz.toObject(),
// // // //         courseTitle: course.title,
// // // //         courseId: course._id,
// // // //         moduleId: moduleId
// // // //     });

// // // //   } catch (error: any) {
// // // //     console.error("Get Quiz Error:", error);
// // // //     res.status(500).json({ error: error.message });
// // // //   }
// // // // };

// // // // // --- SUBMIT QUIZ ---
// // // // export const submitQuiz = async (req: any, res: Response) => {
// // // //     try {
// // // //         const { id } = req.params; // Lesson ID (Quiz ID)
// // // //         const { answers } = req.body; // Array of answers (index pilihan user)
// // // //         const userId = req.user.id;

// // // //         // 1. Cari Kuis (Sama seperti getQuizById)
// // // //         const course = await Course.findOne({ "modules.lessons._id": id });
// // // //         if (!course) return res.status(404).json({ error: 'Kuis tidak valid' });

// // // //         // 2. Temukan Kuis Spesifik
// // // //         let quizLesson: any = null;
// // // //         for (const mod of course.modules) {
// // // //             const l = mod.lessons.find((x: any) => x._id.toString() === id);
// // // //             if (l) { quizLesson = l; break; }
// // // //         }

// // // //         if (!quizLesson) return res.status(404).json({ error: 'Data kuis hilang' });

// // // //         // 3. Hitung Nilai
// // // //         let correctCount = 0;
// // // //         const totalQuestions = quizLesson.questions.length;

// // // //         quizLesson.questions.forEach((q: any, idx: number) => {
// // // //             // Bandingkan jawaban user dengan kunci jawaban (correctIndex)
// // // //             if (answers[idx] === q.correctIndex) {
// // // //                 correctCount++;
// // // //             }
// // // //         });

// // // //         const score = Math.round((correctCount / totalQuestions) * 100);
// // // //         const passed = score >= (quizLesson.passingScore || 70);

// // // //         // 4. Update Progress User
// // // //         // Kita simpan skor di model Progress
// // // //         let progress = await Progress.findOne({ userId, courseId: course._id });
        
// // // //         if (!progress) {
// // // //             progress = new Progress({ userId, courseId: course._id, completedLessons: [] });
// // // //         }

// // // //         // Cek apakah skor ini lebih baik dari sebelumnya? (Optional)
// // // //         // Disini kita push saja riwayatnya
// // // //         progress.quizScores = progress.quizScores || [];
// // // //         progress.quizScores.push({
// // // //             lessonId: id,
// // // //             score: score,
// // // //             passed: passed,
// // // //             attempts: 1 // TODO: Handle logic attempt counter
// // // //         });

// // // //         // Jika lulus, tandai lesson sebagai selesai
// // // //         if (passed) {
// // // //             if (!progress.completedLessons.includes(id)) {
// // // //                 progress.completedLessons.push(id);
// // // //             }
// // // //         }

// // // //         await progress.save();

// // // //         res.json({
// // // //             score,
// // // //             totalQuestions,
// // // //             correctCount,
// // // //             passed,
// // // //             message: passed ? "Selamat! Anda lulus kuis ini." : "Maaf, nilai Anda belum mencukupi."
// // // //         });

// // // //     } catch (error: any) {
// // // //         console.error("Submit Quiz Error:", error);
// // // //         res.status(500).json({ error: error.message });
// // // //     }
// // // // };
// // // import { Request, Response } from 'express';
// // // import { Course } from '../models/Course';
// // // import { Progress } from '../models/Progress';

// // // // --- 1. START QUIZ (BARU) ---
// // // export const startQuiz = async (req: any, res: Response) => {
// // //     try {
// // //         const { id } = req.params; // Lesson ID
// // //         const userId = req.user.id;

// // //         // Cari Course & Kuis
// // //         const course = await Course.findOne({ "modules.lessons._id": id });
// // //         if (!course) return res.status(404).json({ error: 'Kuis tidak ditemukan' });

// // //         // Cari detail lesson kuis untuk ambil durasi
// // //         let quizLesson: any = null;
// // //         for (const mod of course.modules) {
// // //             const l = mod.lessons.find((x: any) => x._id.toString() === id);
// // //             if (l) { quizLesson = l; break; }
// // //         }

// // //         if (!quizLesson) return res.status(404).json({ error: 'Data kuis error' });

// // //         // Cari/Buat Progress
// // //         let progress = await Progress.findOne({ userId, courseId: course._id });
// // //         if (!progress) {
// // //             progress = new Progress({ userId, courseId: course._id, completedLessons: [] });
// // //         }

// // //         // Cek jika sudah ada active attempt untuk kuis ini, jangan overwrite (biar timer ga reset)
// // //         if (progress.activeAttempt && progress.activeAttempt.lessonId === id) {
// // //              return res.json({ 
// // //                  message: "Resuming quiz", 
// // //                  startedAt: progress.activeAttempt.startedAt,
// // //                  durationSeconds: progress.activeAttempt.durationSeconds
// // //              });
// // //         }

// // //         // Mulai Baru: Simpan waktu sekarang
// // //         progress.activeAttempt = {
// // //             lessonId: id,
// // //             startedAt: new Date(),
// // //             // Konversi menit ke detik, default 600 detik (10 menit)
// // //             durationSeconds: (quizLesson.quizDuration || 10) * 60 
// // //         };

// // //         await progress.save();

// // //         res.json({ 
// // //             message: "Quiz started", 
// // //             startedAt: progress.activeAttempt.startedAt,
// // //             durationSeconds: progress.activeAttempt.durationSeconds
// // //         });

// // //     } catch (error: any) {
// // //         res.status(500).json({ error: error.message });
// // //     }
// // // };

// // // // --- 2. GET QUIZ DETAIL (UPDATE) ---
// // // export const getQuizById = async (req: any, res: Response) => {
// // //   try {
// // //     const { id } = req.params;
// // //     const userId = req.user.id; // Butuh userId untuk cek progress

// // //     const course = await Course.findOne(
// // //         { "modules.lessons._id": id },
// // //         { "title": 1, "modules.$": 1 } 
// // //     );

// // //     if (!course) return res.status(404).json({ error: 'Kuis tidak ditemukan' });

// // //     let foundQuiz: any = null;
// // //     for (const module of course.modules) {
// // //         const lesson = module.lessons.find((l: any) => l._id.toString() === id);
// // //         if (lesson) { foundQuiz = lesson; break; }
// // //     }

// // //     if (!foundQuiz) return res.status(404).json({ error: 'Data kuis detail tidak ditemukan' });

// // //     // --- LOGIKA TIMER PERSISTENT ---
// // //     let remainingSeconds = null;
// // //     let isResuming = false;

// // //     // Cek Progress user
// // //     const progress = await Progress.findOne({ userId, courseId: course._id });
    
// // //     // Jika user punya data 'activeAttempt' untuk kuis ini, hitung sisa waktunya
// // //     if (progress && progress.activeAttempt && progress.activeAttempt.lessonId === id) {
// // //         const now = new Date().getTime();
// // //         const start = new Date(progress.activeAttempt.startedAt).getTime();
// // //         const durationMs = progress.activeAttempt.durationSeconds * 1000;
        
// // //         const elapsedSeconds = Math.floor((now - start) / 1000);
// // //         remainingSeconds = progress.activeAttempt.durationSeconds - elapsedSeconds;
// // //         isResuming = true;

// // //         // Jika waktu sudah habis di server, paksa 0
// // //         if (remainingSeconds < 0) remainingSeconds = 0;
// // //     }
// // //     // -------------------------------

// // //     res.json({
// // //         ...foundQuiz.toObject(),
// // //         courseTitle: course.title,
// // //         courseId: course._id,
// // //         // Kirim data tambahan ke frontend
// // //         serverTimeLeft: remainingSeconds, 
// // //         isResuming: isResuming
// // //     });

// // //   } catch (error: any) {
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // };

// // // // --- 3. SUBMIT QUIZ (UPDATE) ---
// // // export const submitQuiz = async (req: any, res: Response) => {
// // //     try {
// // //         const { id } = req.params; 
// // //         const { answers } = req.body; 
// // //         const userId = req.user.id;

// // //         const course = await Course.findOne({ "modules.lessons._id": id });
// // //         if (!course) return res.status(404).json({ error: 'Kuis tidak valid' });

// // //         let quizLesson: any = null;
// // //         for (const mod of course.modules) {
// // //             const l = mod.lessons.find((x: any) => x._id.toString() === id);
// // //             if (l) { quizLesson = l; break; }
// // //         }

// // //         // ... (Logika penilaian sama seperti sebelumnya) ...
// // //         let correctCount = 0;
// // //         const totalQuestions = quizLesson.questions.length;
// // //         quizLesson.questions.forEach((q: any, idx: number) => {
// // //             if (answers[idx] === q.correctIndex) correctCount++;
// // //         });
// // //         const score = Math.round((correctCount / totalQuestions) * 100);
// // //         const passed = score >= (quizLesson.passingScore || 70);

// // //         let progress = await Progress.findOne({ userId, courseId: course._id });
// // //         if (!progress) progress = new Progress({ userId, courseId: course._id, completedLessons: [] });

// // //         progress.quizScores = progress.quizScores || [];
// // //         progress.quizScores.push({
// // //             lessonId: id,
// // //             score: score,
// // //             passed: passed,
// // //             attempts: 1
// // //         });

// // //         if (passed) {
// // //             if (!progress.completedLessons.includes(id)) progress.completedLessons.push(id);
// // //         }

// // //         // --- UPDATE PENTING: HAPUS ACTIVE ATTEMPT ---
// // //         // Karena sudah submit, timer tidak perlu jalan lagi
// // //         progress.activeAttempt = undefined;
// // //         // --------------------------------------------

// // //         await progress.save();

// // //         res.json({
// // //             score,
// // //             totalQuestions,
// // //             correctCount,
// // //             passed,
// // //             message: passed ? "Selamat! Anda lulus kuis ini." : "Maaf, nilai Anda belum mencukupi."
// // //         });
        
// // //         // --- 4. RESET QUIZ TIMER (ADMIN/FACILITATOR ONLY) ---
// // // export const resetQuizAttempt = async (req: any, res: Response) => {
// // //     try {
// // //         const { id } = req.params; // Lesson ID (Quiz ID)
// // //         const { studentId } = req.body; // ID Siswa yang mau di-reset

// // //         if (!studentId) {
// // //             return res.status(400).json({ error: "Student ID is required" });
// // //         }

// // //         // 1. Cari Course yang memiliki kuis ini (untuk mendapatkan courseId)
// // //         const course = await Course.findOne({ "modules.lessons._id": id });
// // //         if (!course) return res.status(404).json({ error: 'Kuis tidak ditemukan dalam kursus manapun' });

// // //         // 2. Cari Progress milik siswa tersebut
// // //         const progress = await Progress.findOne({ userId: studentId, courseId: course._id });

// // //         if (!progress) {
// // //             return res.status(404).json({ error: 'Data progress siswa tidak ditemukan' });
// // //         }

// // //         // 3. Hapus activeAttempt (Reset Timer)
// // //         // Kita set ke undefined agar hilang dari database
// // //         progress.activeAttempt = undefined;
        
// // //         // Opsional: Jika ingin menghapus nilai sebelumnya juga agar bersih total:
// // //         // progress.quizScores = progress.quizScores.filter(s => s.lessonId !== id);
// // //         // progress.completedLessons = progress.completedLessons.filter(lid => lid !== id);

// // //         await progress.save();

// // //         res.json({ 
// // //             message: `Timer kuis berhasil di-reset untuk siswa ID: ${studentId}`,
// // //             studentId 
// // //         });

// // //     } catch (error: any) {
// // //         console.error("Reset Quiz Error:", error);
// // //         res.status(500).json({ error: error.message });
// // //     }
// // // };

// // //     } catch (error: any) {
// // //         res.status(500).json({ error: error.message });
// // //     }
// // // };
// // import { Request, Response } from 'express';
// // import { Course } from '../models/Course';
// // import { Progress } from '../models/Progress';

// // // ... (kode fungsi startQuiz, getQuizById, submitQuiz biarkan seperti sebelumnya) ...

// // // --- 4. RESET QUIZ TIMER (ADMIN/FACILITATOR ONLY) ---
// // // Fungsi ini menghapus sesi kuis yang sedang berjalan agar siswa bisa mulai dari awal
// // export const resetQuizAttempt = async (req: any, res: Response) => {
// //     try {
// //         const { id } = req.params; // Ini adalah Lesson ID (Quiz ID)
// //         const { studentId } = req.body; // ID Siswa yang mau di-reset

// //         if (!studentId) {
// //             return res.status(400).json({ error: "Student ID is required" });
// //         }

// //         // 1. Cari Course yang memiliki kuis ini (untuk mendapatkan courseId)
// //         const course = await Course.findOne({ "modules.lessons._id": id });
// //         if (!course) return res.status(404).json({ error: 'Kuis tidak ditemukan dalam kursus manapun' });

// //         // 2. Cari Progress milik siswa tersebut
// //         const progress = await Progress.findOne({ userId: studentId, courseId: course._id });

// //         if (!progress) {
// //             return res.status(404).json({ error: 'Data progress siswa tidak ditemukan (Siswa belum pernah membuka kursus ini)' });
// //         }

// //         // 3. Hapus activeAttempt (Ini yang bikin timer reset)
// //         // Kita set ke undefined agar field tersebut hilang dari database
// //         progress.activeAttempt = undefined;
        
// //         // (Opsional) Jika Anda ingin menghapus riwayat nilai sebelumnya juga (Hard Reset), uncomment baris di bawah:
// //         // progress.quizScores = progress.quizScores.filter(s => s.lessonId !== id);
// //         // progress.completedLessons = progress.completedLessons.filter(lid => lid !== id);

// //         await progress.save();

// //         res.json({ 
// //             message: `Timer kuis berhasil di-reset untuk siswa ID: ${studentId}. Siswa dapat memulai ulang kuis sekarang.`,
// //             studentId 
// //         });

// //     } catch (error: any) {
// //         console.error("Reset Quiz Error:", error);
// //         res.status(500).json({ error: error.message });
// //     }
// // };
// import { Request, Response } from 'express';
// import { Course } from '../models/Course';
// import { Progress } from '../models/Progress';

// // --- 1. GET QUIZ BY ID ---
// export const getQuizById = async (req: any, res: Response) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user.id; 

//     // Cari Course yang punya lesson ID ini
//     const course = await Course.findOne(
//         { "modules.lessons._id": id },
//         { "title": 1, "modules.$": 1 } 
//     );

//     if (!course) return res.status(404).json({ error: 'Kuis tidak ditemukan' });

//     // Cari lesson spesifik
//     let foundQuiz: any = null;
//     for (const module of course.modules) {
//         const lesson = module.lessons.find((l: any) => l._id.toString() === id);
//         if (lesson) { foundQuiz = lesson; break; }
//     }

//     if (!foundQuiz) return res.status(404).json({ error: 'Data kuis detail tidak ditemukan' });

//     // Cek Sisa Waktu (Timer)
//     let remainingSeconds = null;
//     let isResuming = false;

//     const progress = await Progress.findOne({ userId, courseId: course._id });
    
//     if (progress && progress.activeAttempt && progress.activeAttempt.lessonId === id) {
//         const now = new Date().getTime();
//         const start = new Date(progress.activeAttempt.startedAt).getTime();
//         const elapsedSeconds = Math.floor((now - start) / 1000);
//         remainingSeconds = progress.activeAttempt.durationSeconds - elapsedSeconds;
//         isResuming = true;
//         if (remainingSeconds < 0) remainingSeconds = 0;
//     }

//     res.json({
//         ...foundQuiz.toObject(),
//         courseTitle: course.title,
//         courseId: course._id,
//         serverTimeLeft: remainingSeconds, 
//         isResuming: isResuming
//     });

//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // --- 2. START QUIZ ---
// export const startQuiz = async (req: any, res: Response) => {
//     try {
//         const { id } = req.params; 
//         const userId = req.user.id;

//         const course = await Course.findOne({ "modules.lessons._id": id });
//         if (!course) return res.status(404).json({ error: 'Kuis tidak ditemukan' });

//         let quizLesson: any = null;
//         for (const mod of course.modules) {
//             const l = mod.lessons.find((x: any) => x._id.toString() === id);
//             if (l) { quizLesson = l; break; }
//         }

//         let progress = await Progress.findOne({ userId, courseId: course._id });
//         if (!progress) {
//             progress = new Progress({ userId, courseId: course._id, completedLessons: [] });
//         }

//         if (progress.activeAttempt && progress.activeAttempt.lessonId === id) {
//              return res.json({ 
//                  message: "Resuming", 
//                  startedAt: progress.activeAttempt.startedAt,
//                  durationSeconds: progress.activeAttempt.durationSeconds
//              });
//         }

//         progress.activeAttempt = {
//             lessonId: id,
//             startedAt: new Date(),
//             durationSeconds: (quizLesson.quizDuration || 10) * 60 
//         };

//         await progress.save();

//         res.json({ 
//             message: "Started", 
//             startedAt: progress.activeAttempt.startedAt,
//             durationSeconds: progress.activeAttempt.durationSeconds
//         });

//     } catch (error: any) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // --- 3. SUBMIT QUIZ ---
// export const submitQuiz = async (req: any, res: Response) => {
//     try {
//         const { id } = req.params; 
//         const { answers } = req.body; 
//         const userId = req.user.id;

//         const course = await Course.findOne({ "modules.lessons._id": id });
//         if (!course) return res.status(404).json({ error: 'Not found' });

//         let quizLesson: any = null;
//         for (const mod of course.modules) {
//             const l = mod.lessons.find((x: any) => x._id.toString() === id);
//             if (l) { quizLesson = l; break; }
//         }

//         let correctCount = 0;
//         const totalQuestions = quizLesson.questions.length;
//         quizLesson.questions.forEach((q: any, idx: number) => {
//             if (answers[idx] === q.correctIndex) correctCount++;
//         });
//         const score = Math.round((correctCount / totalQuestions) * 100);
//         const passed = score >= (quizLesson.passingScore || 70);

//         let progress = await Progress.findOne({ userId, courseId: course._id });
//         if (!progress) progress = new Progress({ userId, courseId: course._id, completedLessons: [] });

//         progress.quizScores = progress.quizScores || [];
//         progress.quizScores.push({ lessonId: id, score, passed, attempts: 1 });

//         if (passed && !progress.completedLessons.includes(id)) {
//             progress.completedLessons.push(id);
//         }

//         progress.activeAttempt = undefined; // Clear timer
//         await progress.save();

//         res.json({ score, totalQuestions, correctCount, passed });

//     } catch (error: any) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // --- 4. RESET QUIZ (ADMIN) ---
// export const resetQuizAttempt = async (req: any, res: Response) => {
//     try {
//         const { id } = req.params; // Lesson ID
//         const { studentId } = req.body; 

//         if (!studentId) return res.status(400).json({ error: "Student ID required" });

//         const course = await Course.findOne({ "modules.lessons._id": id });
//         if (!course) return res.status(404).json({ error: 'Course not found' });

//         const progress = await Progress.findOne({ userId: studentId, courseId: course._id });
//         if (!progress) return res.status(404).json({ error: 'Progress not found' });

//         progress.activeAttempt = undefined;
//         await progress.save();

//         res.json({ message: "Timer reset successfully" });

//     } catch (error: any) {
//         res.status(500).json({ error: error.message });
//     }
// };
import { Request, Response } from 'express';
import { Quiz } from '../models/Quiz'; // Pastikan path model sesuai
import { Course } from '../models/Course';

// --- PUBLIC / STUDENT CONTROLLERS ---

export const getQuizById = async (req: Request, res: Response) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate('course', 'title');
    if (!quiz) return res.status(404).json({ error: 'Kuis tidak ditemukan' });
    res.json({ quiz });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const startQuiz = async (req: Request, res: Response) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ error: 'Kuis tidak ditemukan' });
    
    // Di sini bisa ditambahkan logika mencatat waktu mulai di DB jika perlu
    // Untuk sekarang kita return durasi saja
    res.json({ 
      message: 'Quiz started', 
      durationSeconds: quiz.durationSeconds 
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const submitQuiz = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { answers } = req.body; // Array of number (index jawaban user)

    const quiz = await Quiz.findById(id);
    if (!quiz) return res.status(404).json({ error: 'Kuis tidak ditemukan' });

    let correctCount = 0;
    quiz.questions.forEach((q: any, index: number) => {
      if (answers[index] === q.answerIndex) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / quiz.questions.length) * 100);

    // Return score agar frontend bisa menyimpan ke progress lesson
    res.json({ 
      message: 'Quiz submitted', 
      score: score,
      correctCount,
      totalQuestions: quiz.questions.length
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// --- ADMIN / FACILITATOR CONTROLLERS ---

export const getAllQuizzes = async (req: Request, res: Response) => {
  try {
    const quizzes = await Quiz.find()
      .populate('course', 'title') // Menampilkan judul kursus terkait
      .sort({ createdAt: -1 });
    res.json({ quizzes });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteQuiz = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Quiz.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Kuis tidak ditemukan' });
    res.json({ message: 'Kuis berhasil dihapus' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const resetQuizAttempt = async (req: Request, res: Response) => {
    // Logika reset attempt spesifik untuk model Quiz mandiri (jika ada collection quiz_attempts)
    // Jika logic reset ada di UserProgress (Course), gunakan controller di courseController.
    // Ini hanya placeholder jika Anda punya tabel attempt terpisah.
    res.json({ message: "Fitur reset via Quiz ID belum diimplementasikan, gunakan reset via Course." });
};
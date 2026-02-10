// // // // // // // // // // import { Request, Response } from 'express';
// // // // // // // // // // import { Progress } from '../models/Progress'; // Pastikan path model benar

// // // // // // // // // // // --- GET PROGRESS ---
// // // // // // // // // // export const getProgress = async (req: any, res: Response) => {
// // // // // // // // // //   try {
// // // // // // // // // //     const userId = req.user.id; // Dari middleware auth
// // // // // // // // // //     const { courseId } = req.params;

// // // // // // // // // //     const progress = await Progress.findOne({ userId, courseId });

// // // // // // // // // //     if (!progress) {
// // // // // // // // // //       return res.json({ completedLessons: [], completed: false });
// // // // // // // // // //     }

// // // // // // // // // //     res.json(progress);
// // // // // // // // // //   } catch (error: any) {
// // // // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // // // //   }
// // // // // // // // // // };

// // // // // // // // // // // --- MARK LESSON AS COMPLETE ---
// // // // // // // // // // // Ini yang dipanggil saat klik "Selesai & Lanjut"
// // // // // // // // // // export const updateProgress = async (req: any, res: Response) => {
// // // // // // // // // //   try {
// // // // // // // // // //     const userId = req.user.id;
// // // // // // // // // //     const { courseId } = req.params;
// // // // // // // // // //     const { lessonId } = req.body;

// // // // // // // // // //     if (!lessonId) {
// // // // // // // // // //       return res.status(400).json({ error: "Lesson ID required" });
// // // // // // // // // //     }

// // // // // // // // // //     // Cari progress user untuk course ini
// // // // // // // // // //     let progress = await Progress.findOne({ userId, courseId });

// // // // // // // // // //     if (!progress) {
// // // // // // // // // //       // Jika belum ada, buat baru
// // // // // // // // // //       progress = new Progress({
// // // // // // // // // //         userId,
// // // // // // // // // //         courseId,
// // // // // // // // // //         completedLessons: [lessonId],
// // // // // // // // // //         completed: false
// // // // // // // // // //       });
// // // // // // // // // //     } else {
// // // // // // // // // //       // Jika sudah ada, tambahkan lessonId jika belum ada di array
// // // // // // // // // //       if (!progress.completedLessons.includes(lessonId)) {
// // // // // // // // // //         progress.completedLessons.push(lessonId);
// // // // // // // // // //       }
// // // // // // // // // //     }

// // // // // // // // // //     progress.lastAccessed = new Date();
// // // // // // // // // //     await progress.save();

// // // // // // // // // //     res.json({ message: "Progress saved", progress });
// // // // // // // // // //   } catch (error: any) {
// // // // // // // // // //     console.error("Progress Error:", error);
// // // // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // // // //   }
// // // // // // // // // // };
// // // // // // // // // import { Request, Response } from 'express';
// // // // // // // // // import { Progress } from '../models/Progress';
// // // // // // // // // import { Course } from '../models/Course';

// // // // // // // // // // --- 1. GET PROGRESS (Untuk Siswa) ---
// // // // // // // // // // Mengambil data progress user saat ini di kursus tertentu
// // // // // // // // // export const getProgress = async (req: any, res: Response) => {
// // // // // // // // //   try {
// // // // // // // // //     const userId = req.user.id;
// // // // // // // // //     const { courseId } = req.params;

// // // // // // // // //     const progress = await Progress.findOne({ userId, courseId });

// // // // // // // // //     if (!progress) {
// // // // // // // // //       return res.json({ 
// // // // // // // // //         completedLessons: [], 
// // // // // // // // //         completedModules: [],
// // // // // // // // //         completed: false 
// // // // // // // // //       });
// // // // // // // // //     }

// // // // // // // // //     res.json(progress);
// // // // // // // // //   } catch (error: any) {
// // // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // // //   }
// // // // // // // // // };

// // // // // // // // // // --- 2. UPDATE PROGRESS (Untuk Siswa) ---
// // // // // // // // // // Dipanggil saat siswa klik "Selesai & Lanjut" pada materi/lesson
// // // // // // // // // export const updateProgress = async (req: any, res: Response) => {
// // // // // // // // //   try {
// // // // // // // // //     const userId = req.user.id;
// // // // // // // // //     const { courseId } = req.params;
// // // // // // // // //     const { lessonId } = req.body;

// // // // // // // // //     if (!lessonId) {
// // // // // // // // //       return res.status(400).json({ error: "Lesson ID required" });
// // // // // // // // //     }

// // // // // // // // //     let progress = await Progress.findOne({ userId, courseId });

// // // // // // // // //     if (!progress) {
// // // // // // // // //       // Jika belum ada data progress, buat baru
// // // // // // // // //       progress = new Progress({
// // // // // // // // //         userId,
// // // // // // // // //         courseId,
// // // // // // // // //         completedLessons: [lessonId],
// // // // // // // // //         completed: false
// // // // // // // // //       });
// // // // // // // // //     } else {
// // // // // // // // //       // Jika sudah ada, tambahkan lessonId jika belum tercatat
// // // // // // // // //       if (!progress.completedLessons.includes(lessonId)) {
// // // // // // // // //         progress.completedLessons.push(lessonId);
// // // // // // // // //       }
// // // // // // // // //     }

// // // // // // // // //     progress.lastAccessed = new Date();
// // // // // // // // //     await progress.save();

// // // // // // // // //     res.json({ message: "Progress saved", progress });
// // // // // // // // //   } catch (error: any) {
// // // // // // // // //     console.error("Progress Error:", error);
// // // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // // //   }
// // // // // // // // // };

// // // // // // // // // // --- 3. MARK MODULE COMPLETE (Untuk Admin/Fasilitator) ---
// // // // // // // // // // Meluluskan satu modul secara manual (dan otomatis meluluskan semua isinya)
// // // // // // // // // export const markModuleComplete = async (req: any, res: Response) => {
// // // // // // // // //   try {
// // // // // // // // //     const { studentId, moduleId } = req.body; 

// // // // // // // // //     if (!studentId || !moduleId) {
// // // // // // // // //         return res.status(400).json({ error: "Student ID and Module ID are required" });
// // // // // // // // //     }

// // // // // // // // //     // 1. Cari Course yang memiliki Module ID tersebut untuk memastikan validitas
// // // // // // // // //     // Menggunakan query nested untuk mencari modul di dalam array modules
// // // // // // // // //     const course = await Course.findOne({ "modules._id": moduleId });
// // // // // // // // //     if (!course) return res.status(404).json({ error: 'Modul tidak ditemukan di database' });

// // // // // // // // //     // 2. Cari Progress Siswa (atau buat baru jika belum ada)
// // // // // // // // //     let progress = await Progress.findOne({ userId: studentId, courseId: course._id });
    
// // // // // // // // //     if (!progress) {
// // // // // // // // //         progress = new Progress({ 
// // // // // // // // //             userId: studentId, 
// // // // // // // // //             courseId: course._id, 
// // // // // // // // //             completedLessons: [], 
// // // // // // // // //             completedModules: [] 
// // // // // // // // //         });
// // // // // // // // //     }

// // // // // // // // //     // 3. Tandai Modul sebagai Selesai
// // // // // // // // //     progress.completedModules = progress.completedModules || [];
// // // // // // // // //     if (!progress.completedModules.includes(moduleId)) {
// // // // // // // // //         progress.completedModules.push(moduleId);
// // // // // // // // //     }

// // // // // // // // //     // 4. LOGIKA PENTING: Otomatis Luluskan SEMUA Lesson di dalam modul tersebut
// // // // // // // // //     // Tujuannya agar progress bar siswa langsung naik (misal jadi 100% untuk modul itu)
// // // // // // // // //     const targetModule = course.modules.find((m: any) => m._id.toString() === moduleId);
    
// // // // // // // // //     if (targetModule && targetModule.lessons) {
// // // // // // // // //         targetModule.lessons.forEach((lesson: any) => {
// // // // // // // // //             const lessonIdStr = lesson._id.toString();
// // // // // // // // //             // Masukkan ke array completedLessons jika belum ada
// // // // // // // // //             if (!progress!.completedLessons.includes(lessonIdStr)) {
// // // // // // // // //                 progress!.completedLessons.push(lessonIdStr);
// // // // // // // // //             }
// // // // // // // // //         });
// // // // // // // // //     }

// // // // // // // // //     await progress.save();

// // // // // // // // //     res.json({ 
// // // // // // // // //         message: 'Modul berhasil diluluskan secara manual', 
// // // // // // // // //         updatedProgress: progress 
// // // // // // // // //     });

// // // // // // // // //   } catch (error: any) {
// // // // // // // // //     console.error("Mark Complete Error:", error);
// // // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // // //   }
// // // // // // // // // };
// // // // // // // // import { Request, Response } from 'express';
// // // // // // // // import { Progress } from '../models/Progress';
// // // // // // // // import { Course } from '../models/Course';

// // // // // // // // // Get Progress
// // // // // // // // export const getProgress = async (req: any, res: Response) => {
// // // // // // // //   try {
// // // // // // // //     const { courseId } = req.params;
// // // // // // // //     const userId = req.user?.userId;

// // // // // // // //     const progress = await Progress.findOne({ userId, courseId });
// // // // // // // //     if (!progress) {
// // // // // // // //         return res.json({ completedLessons: [], lessonDetails: [] });
// // // // // // // //     }
// // // // // // // //     res.json(progress);
// // // // // // // //   } catch (error: any) {
// // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // //   }
// // // // // // // // };

// // // // // // // // // Mark Lesson Complete (General)
// // // // // // // // export const markLessonComplete = async (req: any, res: Response) => {
// // // // // // // //   try {
// // // // // // // //     const { courseId } = req.params;
// // // // // // // //     const { lessonId } = req.body;
// // // // // // // //     const userId = req.user?.userId;

// // // // // // // //     let progress = await Progress.findOne({ userId, courseId });
// // // // // // // //     if (!progress) {
// // // // // // // //       progress = new Progress({ userId, courseId, completedLessons: [], lessonDetails: [] });
// // // // // // // //     }

// // // // // // // //     if (!progress.completedLessons.includes(lessonId)) {
// // // // // // // //       progress.completedLessons.push(lessonId);
// // // // // // // //     }

// // // // // // // //     progress.lastAccessed = new Date();
// // // // // // // //     await progress.save();
// // // // // // // //     res.json({ message: 'Lesson completed', progress });
// // // // // // // //   } catch (error: any) {
// // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // //   }
// // // // // // // // };

// // // // // // // // // --- [BARU] Submit Jawaban Esai ---
// // // // // // // // export const submitEssay = async (req: any, res: Response) => {
// // // // // // // //   try {
// // // // // // // //     const { courseId } = req.params;
// // // // // // // //     const { lessonId, answers } = req.body; // answers: [{question: string, answer: string}]
// // // // // // // //     const userId = req.user?.userId;

// // // // // // // //     let progress = await Progress.findOne({ userId, courseId });
// // // // // // // //     if (!progress) {
// // // // // // // //       progress = new Progress({ userId, courseId, completedLessons: [], lessonDetails: [] });
// // // // // // // //     }

// // // // // // // //     // Update atau Tambah Detail
// // // // // // // //     const existingIdx = progress.lessonDetails.findIndex((d: any) => d.lessonId.toString() === lessonId);
// // // // // // // //     const detailData = {
// // // // // // // //         lessonId,
// // // // // // // //         type: 'essay',
// // // // // // // //         essayAnswers: answers,
// // // // // // // //         submittedAt: new Date()
// // // // // // // //     };

// // // // // // // //     if (existingIdx > -1) {
// // // // // // // //         progress.lessonDetails[existingIdx] = detailData;
// // // // // // // //     } else {
// // // // // // // //         progress.lessonDetails.push(detailData);
// // // // // // // //     }

// // // // // // // //     // Tandai selesai otomatis (atau bisa manual nanti oleh fasilitator)
// // // // // // // //     // Disini kita tandai selesai agar peserta bisa lanjut
// // // // // // // //     if (!progress.completedLessons.includes(lessonId)) {
// // // // // // // //         progress.completedLessons.push(lessonId);
// // // // // // // //     }

// // // // // // // //     await progress.save();
// // // // // // // //     res.json({ message: 'Jawaban esai tersimpan', progress });
// // // // // // // //   } catch (error: any) {
// // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // //   }
// // // // // // // // };

// // // // // // // // // --- [BARU] Submit Tugas Upload ---
// // // // // // // // export const submitTask = async (req: any, res: Response) => {
// // // // // // // //   try {
// // // // // // // //     const { courseId } = req.params;
// // // // // // // //     const { lessonId, fileUrl, fileName } = req.body;
// // // // // // // //     const userId = req.user?.userId;

// // // // // // // //     let progress = await Progress.findOne({ userId, courseId });
// // // // // // // //     if (!progress) {
// // // // // // // //       progress = new Progress({ userId, courseId, completedLessons: [], lessonDetails: [] });
// // // // // // // //     }

// // // // // // // //     const existingIdx = progress.lessonDetails.findIndex((d: any) => d.lessonId.toString() === lessonId);
// // // // // // // //     const detailData = {
// // // // // // // //         lessonId,
// // // // // // // //         type: 'upload_doc',
// // // // // // // //         uploadedFile: {
// // // // // // // //             url: fileUrl,
// // // // // // // //             name: fileName,
// // // // // // // //             uploadedAt: new Date()
// // // // // // // //         },
// // // // // // // //         submittedAt: new Date()
// // // // // // // //     };

// // // // // // // //     if (existingIdx > -1) {
// // // // // // // //         progress.lessonDetails[existingIdx] = detailData;
// // // // // // // //     } else {
// // // // // // // //         progress.lessonDetails.push(detailData);
// // // // // // // //     }

// // // // // // // //     if (!progress.completedLessons.includes(lessonId)) {
// // // // // // // //         progress.completedLessons.push(lessonId);
// // // // // // // //     }

// // // // // // // //     await progress.save();
// // // // // // // //     res.json({ message: 'Tugas berhasil diupload', progress });
// // // // // // // //   } catch (error: any) {
// // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // //   }
// // // // // // // // };
// // // // // // // import { Request, Response } from 'express';
// // // // // // // import Progress from '../models/Progress';
// // // // // // // import { Course } from '../models/Course';
// // // // // // // import { AuthedRequest } from '../middleware/auth'; // Pastikan import ini ada

// // // // // // // // Get Progress
// // // // // // // export const getProgress = async (req: AuthedRequest, res: Response) => {
// // // // // // //   try {
// // // // // // //     const { courseId } = req.params;
// // // // // // //     const userId = req.user?.id; // Gunakan req.user.id bukan userId

// // // // // // //     if (!userId) return res.status(401).json({ error: "Unauthorized" });

// // // // // // //     const progress = await Progress.findOne({ userId, courseId });
// // // // // // //     if (!progress) {
// // // // // // //         return res.json({ completedLessons: [], lessonDetails: [] });
// // // // // // //     }
// // // // // // //     res.json(progress);
// // // // // // //   } catch (error: any) {
// // // // // // //     res.status(500).json({ error: error.message });
// // // // // // //   }
// // // // // // // };

// // // // // // // // Mark Lesson Complete
// // // // // // // export const markLessonComplete = async (req: AuthedRequest, res: Response) => {
// // // // // // //   try {
// // // // // // //     const { courseId } = req.params;
// // // // // // //     const { lessonId } = req.body;
// // // // // // //     const userId = req.user?.id; // FIX: Pastikan ambil dari req.user.id

// // // // // // //     if (!userId) return res.status(401).json({ error: "Unauthorized: User ID missing" });

// // // // // // //     let progress = await Progress.findOne({ userId, courseId });
// // // // // // //     if (!progress) {
// // // // // // //       progress = new Progress({ userId, courseId, completedLessons: [], lessonDetails: [] });
// // // // // // //     }

// // // // // // //     if (!progress.completedLessons.includes(lessonId)) {
// // // // // // //       progress.completedLessons.push(lessonId);
// // // // // // //     }

// // // // // // //     progress.lastAccessed = new Date();
// // // // // // //     await progress.save();
    
// // // // // // //     // Return updated progress untuk frontend
// // // // // // //     res.json({ message: 'Lesson completed', completedLessons: progress.completedLessons });
// // // // // // //   } catch (error: any) {
// // // // // // //     res.status(500).json({ error: error.message });
// // // // // // //   }
// // // // // // // };

// // // // // // // // Submit Essay
// // // // // // // export const submitEssay = async (req: AuthedRequest, res: Response) => {
// // // // // // //   try {
// // // // // // //     const { courseId } = req.params;
// // // // // // //     const { lessonId, answers } = req.body;
// // // // // // //     const userId = req.user?.id; // FIX

// // // // // // //     if (!userId) return res.status(401).json({ error: "Unauthorized: User ID missing" });

// // // // // // //     let progress = await Progress.findOne({ userId, courseId });
// // // // // // //     if (!progress) {
// // // // // // //       progress = new Progress({ userId, courseId, completedLessons: [], lessonDetails: [] });
// // // // // // //     }

// // // // // // //     const existingIdx = progress.lessonDetails.findIndex((d: any) => d.lessonId.toString() === lessonId);
// // // // // // //     const detailData = {
// // // // // // //         lessonId,
// // // // // // //         type: 'essay',
// // // // // // //         essayAnswers: answers,
// // // // // // //         submittedAt: new Date()
// // // // // // //     };

// // // // // // //     if (existingIdx > -1) {
// // // // // // //         progress.lessonDetails[existingIdx] = detailData;
// // // // // // //     } else {
// // // // // // //         progress.lessonDetails.push(detailData);
// // // // // // //     }

// // // // // // //     if (!progress.completedLessons.includes(lessonId)) {
// // // // // // //         progress.completedLessons.push(lessonId);
// // // // // // //     }

// // // // // // //     await progress.save();
// // // // // // //     res.json({ message: 'Jawaban esai tersimpan', completedLessons: progress.completedLessons });
// // // // // // //   } catch (error: any) {
// // // // // // //     res.status(500).json({ error: error.message });
// // // // // // //   }
// // // // // // // };

// // // // // // // // Submit Task
// // // // // // // export const submitTask = async (req: AuthedRequest, res: Response) => {
// // // // // // //   try {
// // // // // // //     const { courseId } = req.params;
// // // // // // //     const { lessonId, fileUrl, fileName } = req.body;
// // // // // // //     const userId = req.user?.id; // FIX

// // // // // // //     if (!userId) return res.status(401).json({ error: "Unauthorized: User ID missing" });

// // // // // // //     let progress = await Progress.findOne({ userId, courseId });
// // // // // // //     if (!progress) {
// // // // // // //       progress = new Progress({ userId, courseId, completedLessons: [], lessonDetails: [] });
// // // // // // //     }

// // // // // // //     const existingIdx = progress.lessonDetails.findIndex((d: any) => d.lessonId.toString() === lessonId);
// // // // // // //     const detailData = {
// // // // // // //         lessonId,
// // // // // // //         type: 'upload_doc',
// // // // // // //         uploadedFile: {
// // // // // // //             url: fileUrl,
// // // // // // //             name: fileName,
// // // // // // //             uploadedAt: new Date()
// // // // // // //         },
// // // // // // //         submittedAt: new Date()
// // // // // // //     };

// // // // // // //     if (existingIdx > -1) {
// // // // // // //         progress.lessonDetails[existingIdx] = detailData;
// // // // // // //     } else {
// // // // // // //         progress.lessonDetails.push(detailData);
// // // // // // //     }

// // // // // // //     if (!progress.completedLessons.includes(lessonId)) {
// // // // // // //         progress.completedLessons.push(lessonId);
// // // // // // //     }

// // // // // // //     await progress.save();
// // // // // // //     res.json({ message: 'Tugas berhasil diupload', completedLessons: progress.completedLessons });
// // // // // // //   } catch (error: any) {
// // // // // // //     res.status(500).json({ error: error.message });
// // // // // // //   }
// // // // // // // };
// // // // // // import { Request, Response } from 'express';
// // // // // // import { Progress } from '../models/Progress';
// // // // // // import { AuthedRequest } from '../middleware/auth'; 

// // // // // // // Get Progress
// // // // // // export const getProgress = async (req: AuthedRequest, res: Response) => {
// // // // // //   try {
// // // // // //     const { courseId } = req.params;
// // // // // //     const userId = req.user?.id; // Pastikan req.user.id ada

// // // // // //     if (!userId) return res.status(401).json({ error: "Unauthorized" });

// // // // // //     const progress = await Progress.findOne({ userId, courseId });
// // // // // //     if (!progress) {
// // // // // //         return res.json({ completedLessons: [], lessonDetails: [] });
// // // // // //     }
// // // // // //     res.json(progress);
// // // // // //   } catch (error: any) {
// // // // // //     res.status(500).json({ error: error.message });
// // // // // //   }
// // // // // // };

// // // // // // // Mark Lesson Complete
// // // // // // export const markLessonComplete = async (req: AuthedRequest, res: Response) => {
// // // // // //   try {
// // // // // //     const { courseId } = req.params;
// // // // // //     const { lessonId } = req.body;
// // // // // //     const userId = req.user?.id; // FIX: Ambil dari token

// // // // // //     if (!userId) return res.status(401).json({ error: "Unauthorized" });

// // // // // //     let progress = await Progress.findOne({ userId, courseId });
// // // // // //     if (!progress) {
// // // // // //       progress = new Progress({ userId, courseId, completedLessons: [], lessonDetails: [] });
// // // // // //     }

// // // // // //     if (!progress.completedLessons.includes(lessonId)) {
// // // // // //       progress.completedLessons.push(lessonId);
// // // // // //     }

// // // // // //     progress.lastAccessed = new Date();
// // // // // //     await progress.save();
    
// // // // // //     // Return updated completedLessons agar frontend sinkron
// // // // // //     res.json({ message: 'Lesson completed', completedLessons: progress.completedLessons });
// // // // // //   } catch (error: any) {
// // // // // //     res.status(500).json({ error: error.message });
// // // // // //   }
// // // // // // };

// // // // // // // Submit Essay
// // // // // // export const submitEssay = async (req: AuthedRequest, res: Response) => {
// // // // // //   try {
// // // // // //     const { courseId } = req.params;
// // // // // //     const { lessonId, answers } = req.body;
// // // // // //     const userId = req.user?.id; // FIX: Ambil dari token

// // // // // //     if (!userId) return res.status(401).json({ error: "Unauthorized: User ID missing" });

// // // // // //     let progress = await Progress.findOne({ userId, courseId });
// // // // // //     if (!progress) {
// // // // // //       progress = new Progress({ userId, courseId, completedLessons: [], lessonDetails: [] });
// // // // // //     }

// // // // // //     const existingIdx = progress.lessonDetails.findIndex((d: any) => d.lessonId.toString() === lessonId);
// // // // // //     const detailData = {
// // // // // //         lessonId,
// // // // // //         type: 'essay',
// // // // // //         essayAnswers: answers,
// // // // // //         submittedAt: new Date()
// // // // // //     };

// // // // // //     if (existingIdx > -1) {
// // // // // //         progress.lessonDetails[existingIdx] = detailData;
// // // // // //     } else {
// // // // // //         progress.lessonDetails.push(detailData);
// // // // // //     }

// // // // // //     if (!progress.completedLessons.includes(lessonId)) {
// // // // // //         progress.completedLessons.push(lessonId);
// // // // // //     }

// // // // // //     await progress.save();
// // // // // //     res.json({ message: 'Jawaban esai tersimpan', completedLessons: progress.completedLessons });
// // // // // //   } catch (error: any) {
// // // // // //     res.status(500).json({ error: error.message });
// // // // // //   }
// // // // // // };

// // // // // // // Submit Task
// // // // // // export const submitTask = async (req: AuthedRequest, res: Response) => {
// // // // // //   try {
// // // // // //     const { courseId } = req.params;
// // // // // //     const { lessonId, fileUrl, fileName } = req.body;
// // // // // //     const userId = req.user?.id; // FIX: Ambil dari token

// // // // // //     if (!userId) return res.status(401).json({ error: "Unauthorized: User ID missing" });

// // // // // //     let progress = await Progress.findOne({ userId, courseId });
// // // // // //     if (!progress) {
// // // // // //       progress = new Progress({ userId, courseId, completedLessons: [], lessonDetails: [] });
// // // // // //     }

// // // // // //     const existingIdx = progress.lessonDetails.findIndex((d: any) => d.lessonId.toString() === lessonId);
// // // // // //     const detailData = {
// // // // // //         lessonId,
// // // // // //         type: 'upload_doc',
// // // // // //         uploadedFile: {
// // // // // //             url: fileUrl,
// // // // // //             name: fileName,
// // // // // //             uploadedAt: new Date()
// // // // // //         },
// // // // // //         submittedAt: new Date()
// // // // // //     };

// // // // // //     if (existingIdx > -1) {
// // // // // //         progress.lessonDetails[existingIdx] = detailData;
// // // // // //     } else {
// // // // // //         progress.lessonDetails.push(detailData);
// // // // // //     }

// // // // // //     if (!progress.completedLessons.includes(lessonId)) {
// // // // // //         progress.completedLessons.push(lessonId);
// // // // // //     }

// // // // // //     await progress.save();
// // // // // //     res.json({ message: 'Tugas berhasil diupload', completedLessons: progress.completedLessons });
// // // // // //   } catch (error: any) {
// // // // // //     res.status(500).json({ error: error.message });
// // // // // //   }
// // // // // // };
// // // // // import { Request, Response } from 'express';
// // // // // import { Progress } from '../models/Progress';
// // // // // import Enrollment from '../models/Enrollment'; // [PENTING] Import Enrollment
// // // // // import { Course } from '../models/Course';     // [PENTING] Import Course
// // // // // import { AuthedRequest } from '../middleware/auth'; 

// // // // // // --- HELPER: UPDATE ENROLLMENT PROGRESS ---
// // // // // // Fungsi ini dipanggil setiap kali ada perubahan progress
// // // // // const updateEnrollmentProgress = async (userId: string, courseId: string) => {
// // // // //     try {
// // // // //         // 1. Ambil Progress User
// // // // //         const progress = await Progress.findOne({ userId, courseId });
// // // // //         if (!progress) return;

// // // // //         // 2. Ambil Total Lesson di Kursus (Hitung yang aktif saja agar akurat)
// // // // //         const course: any = await Course.findById(courseId).select('modules');
// // // // //         if (!course) return;

// // // // //         let totalLessons = 0;
// // // // //         course.modules.forEach((m: any) => {
// // // // //             if (m.isActive) {
// // // // //                 m.lessons.forEach((l: any) => { if (l.isActive) totalLessons++; });
// // // // //             }
// // // // //         });

// // // // //         // 3. Hitung Persentase
// // // // //         const completedCount = progress.completedLessons.length;
// // // // //         let percentage = 0;
// // // // //         if (totalLessons > 0) {
// // // // //             percentage = Math.round((completedCount / totalLessons) * 100);
// // // // //         }
// // // // //         if (percentage > 100) percentage = 100;

// // // // //         // 4. Update Enrollment (Data yang dilihat Admin)
// // // // //         await Enrollment.findOneAndUpdate(
// // // // //             { user: userId, course: courseId },
// // // // //             { 
// // // // //                 progress: percentage,
// // // // //                 isCompleted: percentage === 100
// // // // //             }
// // // // //         );
// // // // //     } catch (err) {
// // // // //         console.error("Gagal sinkronisasi enrollment:", err);
// // // // //     }
// // // // // };

// // // // // // --- CONTROLLERS ---

// // // // // // Get Progress
// // // // // export const getProgress = async (req: AuthedRequest, res: Response) => {
// // // // //   try {
// // // // //     const { courseId } = req.params;
// // // // //     const userId = req.user?.id; 

// // // // //     if (!userId) return res.status(401).json({ error: "Unauthorized" });

// // // // //     const progress = await Progress.findOne({ userId, courseId });
// // // // //     if (!progress) {
// // // // //         return res.json({ completedLessons: [], lessonDetails: [] });
// // // // //     }
// // // // //     res.json(progress);
// // // // //   } catch (error: any) {
// // // // //     res.status(500).json({ error: error.message });
// // // // //   }
// // // // // };

// // // // // // Mark Lesson Complete
// // // // // export const markLessonComplete = async (req: AuthedRequest, res: Response) => {
// // // // //   try {
// // // // //     const { courseId } = req.params;
// // // // //     const { lessonId } = req.body;
// // // // //     const userId = req.user?.id; 

// // // // //     if (!userId) return res.status(401).json({ error: "Unauthorized" });

// // // // //     let progress = await Progress.findOne({ userId, courseId });
// // // // //     if (!progress) {
// // // // //       progress = new Progress({ userId, courseId, completedLessons: [], lessonDetails: [] });
// // // // //     }

// // // // //     // Cek duplikasi string ID agar aman
// // // // //     const strLessonId = lessonId.toString();
// // // // //     const exists = progress.completedLessons.some((id: any) => id.toString() === strLessonId);

// // // // //     if (!exists) {
// // // // //       progress.completedLessons.push(lessonId);
// // // // //       progress.lastAccessed = new Date();
// // // // //       await progress.save();
      
// // // // //       // [FIX] Trigger Sinkronisasi ke Admin
// // // // //       await updateEnrollmentProgress(userId, courseId);
// // // // //     }

// // // // //     res.json({ message: 'Lesson completed', completedLessons: progress.completedLessons });
// // // // //   } catch (error: any) {
// // // // //     res.status(500).json({ error: error.message });
// // // // //   }
// // // // // };

// // // // // // Submit Essay
// // // // // export const submitEssay = async (req: AuthedRequest, res: Response) => {
// // // // //   try {
// // // // //     const { courseId } = req.params;
// // // // //     const { lessonId, answers } = req.body;
// // // // //     const userId = req.user?.id; 

// // // // //     if (!userId) return res.status(401).json({ error: "Unauthorized" });

// // // // //     let progress = await Progress.findOne({ userId, courseId });
// // // // //     if (!progress) {
// // // // //       progress = new Progress({ userId, courseId, completedLessons: [], lessonDetails: [] });
// // // // //     }

// // // // //     const strLessonId = lessonId.toString();
// // // // //     const existingIdx = progress.lessonDetails.findIndex((d: any) => d.lessonId.toString() === strLessonId);
    
// // // // //     const detailData = {
// // // // //         lessonId,
// // // // //         type: 'essay',
// // // // //         essayAnswers: answers, // Pastikan format array string/objek sesuai
// // // // //         submittedAt: new Date()
// // // // //     };

// // // // //     if (existingIdx > -1) {
// // // // //         progress.lessonDetails[existingIdx] = detailData;
// // // // //     } else {
// // // // //         progress.lessonDetails.push(detailData);
// // // // //     }

// // // // //     // Tandai selesai jika belum
// // // // //     const isCompleted = progress.completedLessons.some((id: any) => id.toString() === strLessonId);
// // // // //     if (!isCompleted) {
// // // // //         progress.completedLessons.push(lessonId);
// // // // //     }

// // // // //     await progress.save();
    
// // // // //     // [FIX] Trigger Sinkronisasi ke Admin
// // // // //     await updateEnrollmentProgress(userId, courseId);

// // // // //     res.json({ message: 'Jawaban esai tersimpan', completedLessons: progress.completedLessons });
// // // // //   } catch (error: any) {
// // // // //     res.status(500).json({ error: error.message });
// // // // //   }
// // // // // };

// // // // // // Submit Task (Upload)
// // // // // export const submitTask = async (req: AuthedRequest, res: Response) => {
// // // // //   try {
// // // // //     const { courseId } = req.params;
// // // // //     const { lessonId, fileUrl, fileName } = req.body;
// // // // //     const userId = req.user?.id; 

// // // // //     if (!userId) return res.status(401).json({ error: "Unauthorized" });

// // // // //     let progress = await Progress.findOne({ userId, courseId });
// // // // //     if (!progress) {
// // // // //       progress = new Progress({ userId, courseId, completedLessons: [], lessonDetails: [] });
// // // // //     }

// // // // //     const strLessonId = lessonId.toString();
// // // // //     const existingIdx = progress.lessonDetails.findIndex((d: any) => d.lessonId.toString() === strLessonId);
    
// // // // //     const detailData = {
// // // // //         lessonId,
// // // // //         type: 'upload_doc',
// // // // //         uploadedFile: {
// // // // //             url: fileUrl,
// // // // //             name: fileName,
// // // // //             uploadedAt: new Date()
// // // // //         },
// // // // //         submittedAt: new Date()
// // // // //     };

// // // // //     if (existingIdx > -1) {
// // // // //         progress.lessonDetails[existingIdx] = detailData;
// // // // //     } else {
// // // // //         progress.lessonDetails.push(detailData);
// // // // //     }

// // // // //     const isCompleted = progress.completedLessons.some((id: any) => id.toString() === strLessonId);
// // // // //     if (!isCompleted) {
// // // // //         progress.completedLessons.push(lessonId);
// // // // //     }

// // // // //     await progress.save();

// // // // //     // [FIX] Trigger Sinkronisasi ke Admin
// // // // //     await updateEnrollmentProgress(userId, courseId);

// // // // //     res.json({ message: 'Tugas berhasil diupload', completedLessons: progress.completedLessons });
// // // // //   } catch (error: any) {
// // // // //     res.status(500).json({ error: error.message });
// // // // //   }
// // // // // };
// // // // import { Request, Response } from 'express';
// // // // import { Progress } from '../models/Progress';
// // // // import Enrollment from '../models/Enrollment';
// // // // import { Course } from '../models/Course';
// // // // import { AuthedRequest } from '../middleware/auth'; 

// // // // // --- HELPER: UPDATE ENROLLMENT PROGRESS (DENGAN LOGGING) ---
// // // // const updateEnrollmentProgress = async (userId: string, courseId: string) => {
// // // //     console.log(`[SYNC START] Mencoba sinkronisasi user: ${userId} di course: ${courseId}`);
// // // //     try {
// // // //         // 1. Ambil Progress User
// // // //         const progress = await Progress.findOne({ userId, courseId });
// // // //         if (!progress) {
// // // //             console.log("[SYNC FAIL] Progress document tidak ditemukan.");
// // // //             return;
// // // //         }

// // // //         // 2. Ambil Total Lesson di Kursus
// // // //         const course: any = await Course.findById(courseId).select('modules');
// // // //         if (!course) {
// // // //             console.log("[SYNC FAIL] Course tidak ditemukan.");
// // // //             return;
// // // //         }

// // // //         let totalLessons = 0;
// // // //         course.modules.forEach((m: any) => {
// // // //             if (m.isActive) {
// // // //                 m.lessons.forEach((l: any) => { 
// // // //                     if (l.isActive) totalLessons++; 
// // // //                 });
// // // //             }
// // // //         });

// // // //         // 3. Hitung Persentase
// // // //         const completedCount = progress.completedLessons.length;
// // // //         let percentage = 0;
// // // //         if (totalLessons > 0) {
// // // //             percentage = Math.round((completedCount / totalLessons) * 100);
// // // //         }
// // // //         if (percentage > 100) percentage = 100;

// // // //         console.log(`[SYNC CALC] Selesai: ${completedCount} / Total: ${totalLessons} = ${percentage}%`);

// // // //         // 4. Update Enrollment
// // // //         const updated = await Enrollment.findOneAndUpdate(
// // // //             { user: userId, course: courseId },
// // // //             { 
// // // //                 $set: { 
// // // //                     progress: percentage,
// // // //                     isCompleted: percentage === 100
// // // //                 }
// // // //             },
// // // //             { new: true } // Return updated doc
// // // //         );

// // // //         if(updated) {
// // // //             console.log(`[SYNC SUCCESS] Enrollment updated menjadi ${updated.progress}%`);
// // // //         } else {
// // // //             console.log(`[SYNC FAIL] Enrollment document tidak ditemukan untuk user ini.`);
// // // //         }

// // // //     } catch (err) {
// // // //         console.error("[SYNC ERROR]", err);
// // // //     }
// // // // };

// // // // // --- CONTROLLERS ---

// // // // export const getProgress = async (req: AuthedRequest, res: Response) => {
// // // //   try {
// // // //     const { courseId } = req.params;
// // // //     const userId = req.user?.id; 
// // // //     if (!userId) return res.status(401).json({ error: "Unauthorized" });

// // // //     const progress = await Progress.findOne({ userId, courseId });
// // // //     if (!progress) {
// // // //         return res.json({ completedLessons: [], lessonDetails: [] });
// // // //     }
// // // //     res.json(progress);
// // // //   } catch (error: any) {
// // // //     res.status(500).json({ error: error.message });
// // // //   }
// // // // };

// // // // export const markLessonComplete = async (req: AuthedRequest, res: Response) => {
// // // //   try {
// // // //     const { courseId } = req.params;
// // // //     const { lessonId } = req.body;
// // // //     const userId = req.user?.id; 

// // // //     if (!userId) return res.status(401).json({ error: "Unauthorized" });

// // // //     let progress = await Progress.findOne({ userId, courseId });
// // // //     if (!progress) {
// // // //       progress = new Progress({ userId, courseId, completedLessons: [], lessonDetails: [] });
// // // //     }

// // // //     const strLessonId = lessonId.toString();
// // // //     // Cek apakah lessonId sudah ada (stringify untuk keamanan tipe data)
// // // //     const exists = progress.completedLessons.some((id: any) => id.toString() === strLessonId);

// // // //     if (!exists) {
// // // //       progress.completedLessons.push(lessonId);
// // // //       progress.lastAccessed = new Date();
// // // //       await progress.save();
      
// // // //       // TRIGGER SINKRONISASI
// // // //       await updateEnrollmentProgress(userId, courseId);
// // // //     } else {
// // // //         console.log(`[INFO] Lesson ${lessonId} sudah selesai sebelumnya.`);
// // // //         // Tetap trigger sync jaga-jaga kalau sebelumnya gagal
// // // //         await updateEnrollmentProgress(userId, courseId);
// // // //     }

// // // //     res.json({ message: 'Lesson completed', completedLessons: progress.completedLessons });
// // // //   } catch (error: any) {
// // // //     console.error(error);
// // // //     res.status(500).json({ error: error.message });
// // // //   }
// // // // };

// // // // export const submitEssay = async (req: AuthedRequest, res: Response) => {
// // // //   try {
// // // //     const { courseId } = req.params;
// // // //     const { lessonId, answers } = req.body;
// // // //     const userId = req.user?.id; 

// // // //     if (!userId) return res.status(401).json({ error: "Unauthorized" });

// // // //     let progress = await Progress.findOne({ userId, courseId });
// // // //     if (!progress) {
// // // //       progress = new Progress({ userId, courseId, completedLessons: [], lessonDetails: [] });
// // // //     }

// // // //     const strLessonId = lessonId.toString();
// // // //     const existingIdx = progress.lessonDetails.findIndex((d: any) => d.lessonId.toString() === strLessonId);
    
// // // //     const detailData = { lessonId, type: 'essay', essayAnswers: answers, submittedAt: new Date() };

// // // //     if (existingIdx > -1) progress.lessonDetails[existingIdx] = detailData;
// // // //     else progress.lessonDetails.push(detailData);

// // // //     const isCompleted = progress.completedLessons.some((id: any) => id.toString() === strLessonId);
// // // //     if (!isCompleted) progress.completedLessons.push(lessonId);

// // // //     await progress.save();
    
// // // //     // TRIGGER SINKRONISASI
// // // //     await updateEnrollmentProgress(userId, courseId);

// // // //     res.json({ message: 'Jawaban esai tersimpan', completedLessons: progress.completedLessons });
// // // //   } catch (error: any) {
// // // //     res.status(500).json({ error: error.message });
// // // //   }
// // // // };

// // // // export const submitTask = async (req: AuthedRequest, res: Response) => {
// // // //   try {
// // // //     const { courseId } = req.params;
// // // //     const { lessonId, fileUrl, fileName } = req.body;
// // // //     const userId = req.user?.id; 

// // // //     if (!userId) return res.status(401).json({ error: "Unauthorized" });

// // // //     let progress = await Progress.findOne({ userId, courseId });
// // // //     if (!progress) {
// // // //       progress = new Progress({ userId, courseId, completedLessons: [], lessonDetails: [] });
// // // //     }

// // // //     const strLessonId = lessonId.toString();
// // // //     const existingIdx = progress.lessonDetails.findIndex((d: any) => d.lessonId.toString() === strLessonId);
    
// // // //     const detailData = { lessonId, type: 'upload_doc', uploadedFile: { url: fileUrl, name: fileName, uploadedAt: new Date() }, submittedAt: new Date() };

// // // //     if (existingIdx > -1) progress.lessonDetails[existingIdx] = detailData;
// // // //     else progress.lessonDetails.push(detailData);

// // // //     const isCompleted = progress.completedLessons.some((id: any) => id.toString() === strLessonId);
// // // //     if (!isCompleted) progress.completedLessons.push(lessonId);

// // // //     await progress.save();

// // // //     // TRIGGER SINKRONISASI
// // // //     await updateEnrollmentProgress(userId, courseId);

// // // //     res.json({ message: 'Tugas berhasil diupload', completedLessons: progress.completedLessons });
// // // //   } catch (error: any) {
// // // //     res.status(500).json({ error: error.message });
// // // //   }
// // // // };
// // // import { Request, Response } from 'express';
// // // import { Progress } from '../models/Progress';
// // // import Enrollment from '../models/Enrollment';
// // // import { Course } from '../models/Course';
// // // import { AuthedRequest } from '../middleware/auth'; 

// // // // --- HELPER: UPDATE ENROLLMENT PROGRESS ---
// // // const updateEnrollmentProgress = async (userId: string, courseId: string) => {
// // //     try {
// // //         const progress = await Progress.findOne({ userId, courseId });
// // //         if (!progress) return;

// // //         const course: any = await Course.findById(courseId).select('modules');
// // //         if (!course) return;

// // //         let totalLessons = 0;
// // //         course.modules.forEach((m: any) => {
// // //             if (m.isActive) {
// // //                 m.lessons.forEach((l: any) => { if (l.isActive) totalLessons++; });
// // //             }
// // //         });

// // //         const completedCount = progress.completedLessons.length;
// // //         let percentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
// // //         if (percentage > 100) percentage = 100;

// // //         await Enrollment.findOneAndUpdate(
// // //             { user: userId, course: courseId },
// // //             { 
// // //                 $set: { 
// // //                     progress: percentage,
// // //                     isCompleted: percentage === 100,
// // //                     completedAt: percentage === 100 ? new Date() : null
// // //                 }
// // //             }
// // //         );
// // //     } catch (err) { console.error("[SYNC ERROR]", err); }
// // // };

// // // // --- CONTROLLERS ---

// // // export const getProgress = async (req: AuthedRequest, res: Response) => {
// // //   try {
// // //     const { courseId } = req.params;
// // //     const userId = req.user?.id; 
// // //     if (!userId) return res.status(401).json({ error: "Unauthorized" });

// // //     const progress = await Progress.findOne({ userId, courseId });
// // //     // Kembalikan objek kosong jika belum ada progress agar FE tidak error
// // //     if (!progress) {
// // //         return res.json({ completedLessons: [], lessonDetails: [], quizScores: [] });
// // //     }
// // //     res.json(progress);
// // //   } catch (error: any) {
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // };

// // // export const markLessonComplete = async (req: AuthedRequest, res: Response) => {
// // //   try {
// // //     const { courseId } = req.params;
// // //     const { lessonId, pollAnswer } = req.body; // Terima pollAnswer jika ada
// // //     const userId = req.user?.id; 

// // //     if (!userId) return res.status(401).json({ error: "Unauthorized" });

// // //     let progress = await Progress.findOne({ userId, courseId });
// // //     if (!progress) progress = new Progress({ userId, courseId, completedLessons: [], lessonDetails: [] });

// // //     // 1. Tambahkan ke Completed Lessons
// // //     const strLessonId = lessonId.toString();
// // //     if (!progress.completedLessons.some((id: any) => id.toString() === strLessonId)) {
// // //       progress.completedLessons.push(lessonId);
// // //     }

// // //     // 2. Simpan Detail (Polling / Virtual Class Log)
// // //     // Hapus detail lama untuk lesson ini agar update
// // //     progress.lessonDetails = progress.lessonDetails.filter((d: any) => d.lessonId.toString() !== strLessonId);
    
// // //     const detailData: any = { lessonId, type: 'lesson', submittedAt: new Date() };
    
// // //     // Jika ada jawaban polling
// // //     if (pollAnswer) {
// // //         detailData.type = 'poll';
// // //         detailData.pollAnswer = pollAnswer;
// // //     }

// // //     progress.lessonDetails.push(detailData);
    
// // //     progress.lastAccessed = new Date();
// // //     await progress.save();
    
// // //     await updateEnrollmentProgress(userId, courseId);

// // //     res.json({ message: 'Lesson completed', completedLessons: progress.completedLessons });
// // //   } catch (error: any) {
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // };

// // // export const submitEssay = async (req: AuthedRequest, res: Response) => {
// // //   try {
// // //     const { courseId } = req.params;
// // //     const { lessonId, answers } = req.body; // answers = array of strings (html)
// // //     const userId = req.user?.id; 

// // //     if (!userId) return res.status(401).json({ error: "Unauthorized" });

// // //     let progress = await Progress.findOne({ userId, courseId });
// // //     if (!progress) progress = new Progress({ userId, courseId, completedLessons: [], lessonDetails: [] });

// // //     const strLessonId = lessonId.toString();
    
// // //     // Hapus detail lama
// // //     progress.lessonDetails = progress.lessonDetails.filter((d: any) => d.lessonId.toString() !== strLessonId);

// // //     // Simpan detail baru
// // //     progress.lessonDetails.push({
// // //         lessonId,
// // //         type: 'essay',
// // //         essayAnswers: answers, // Pastikan Schema Progress mendukung array string ini
// // //         submittedAt: new Date()
// // //     });

// // //     // Tandai selesai
// // //     if (!progress.completedLessons.some((id: any) => id.toString() === strLessonId)) {
// // //         progress.completedLessons.push(lessonId);
// // //     }

// // //     await progress.save();
// // //     await updateEnrollmentProgress(userId, courseId);

// // //     res.json({ message: 'Jawaban esai tersimpan', completedLessons: progress.completedLessons });
// // //   } catch (error: any) {
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // };

// // // export const submitTask = async (req: AuthedRequest, res: Response) => {
// // //   try {
// // //     const { courseId } = req.params;
// // //     const { lessonId, fileUrl, fileName } = req.body;
// // //     const userId = req.user?.id; 

// // //     if (!userId) return res.status(401).json({ error: "Unauthorized" });

// // //     let progress = await Progress.findOne({ userId, courseId });
// // //     if (!progress) progress = new Progress({ userId, courseId, completedLessons: [], lessonDetails: [] });

// // //     const strLessonId = lessonId.toString();

// // //     // Hapus detail lama
// // //     progress.lessonDetails = progress.lessonDetails.filter((d: any) => d.lessonId.toString() !== strLessonId);

// // //     // Simpan detail baru
// // //     progress.lessonDetails.push({
// // //         lessonId,
// // //         type: 'upload_doc',
// // //         uploadedFile: { url: fileUrl, name: fileName, uploadedAt: new Date() },
// // //         submittedAt: new Date()
// // //     });

// // //     // Tandai selesai
// // //     if (!progress.completedLessons.some((id: any) => id.toString() === strLessonId)) {
// // //         progress.completedLessons.push(lessonId);
// // //     }

// // //     await progress.save();
// // //     await updateEnrollmentProgress(userId, courseId);

// // //     res.json({ message: 'Tugas berhasil diupload', completedLessons: progress.completedLessons });
// // //   } catch (error: any) {
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // };
// // import { Request, Response } from 'express';
// // import { Progress } from '../models/Progress';
// // import Enrollment from '../models/Enrollment';
// // import { Course } from '../models/Course';
// // import { AuthedRequest } from '../middleware/auth'; 

// // // --- HELPER: UPDATE ENROLLMENT PROGRESS ---
// // const updateEnrollmentProgress = async (userId: string, courseId: string) => {
// //     try {
// //         const progress = await Progress.findOne({ userId, courseId });
// //         if (!progress) return;

// //         const course: any = await Course.findById(courseId).select('modules');
// //         if (!course) return;

// //         let totalLessons = 0;
// //         course.modules.forEach((m: any) => {
// //             if (m.isActive) {
// //                 m.lessons.forEach((l: any) => { if (l.isActive) totalLessons++; });
// //             }
// //         });

// //         const completedCount = progress.completedLessons.length;
// //         let percentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
// //         if (percentage > 100) percentage = 100;

// //         await Enrollment.findOneAndUpdate(
// //             { user: userId, course: courseId },
// //             { 
// //                 $set: { 
// //                     progress: percentage,
// //                     isCompleted: percentage === 100,
// //                     completedAt: percentage === 100 ? new Date() : null
// //                 }
// //             }
// //         );
// //     } catch (err) { console.error("[SYNC ERROR]", err); }
// // };

// // // --- CONTROLLERS ---

// // export const getProgress = async (req: AuthedRequest, res: Response) => {
// //   try {
// //     const { courseId } = req.params;
// //     const userId = req.user?.id; 
// //     if (!userId) return res.status(401).json({ error: "Unauthorized" });

// //     const progress = await Progress.findOne({ userId, courseId });
// //     if (!progress) {
// //         return res.json({ completedLessons: [], lessonDetails: [], quizScores: [] });
// //     }
// //     res.json(progress);
// //   } catch (error: any) {
// //     res.status(500).json({ error: error.message });
// //   }
// // };

// // export const markLessonComplete = async (req: AuthedRequest, res: Response) => {
// //   try {
// //     const { courseId } = req.params;
// //     // Ambil data pollAnswer dan score, attempts (untuk kuis) dari body
// //     const { lessonId, pollAnswer, score, attempts } = req.body; 
// //     const userId = req.user?.id; 

// //     if (!userId) return res.status(401).json({ error: "Unauthorized" });

// //     let progress = await Progress.findOne({ userId, courseId });
// //     if (!progress) progress = new Progress({ userId, courseId, completedLessons: [], lessonDetails: [] });

// //     const strLessonId = lessonId.toString();

// //     // 1. Update Detail (Polling, Quiz Score, Log Akses)
// //     // Hapus detail lama untuk lesson ini agar data terupdate (terutama score terbaru)
// //     if (progress.lessonDetails) {
// //         progress.lessonDetails = progress.lessonDetails.filter((d: any) => d.lessonId.toString() !== strLessonId);
// //     } else {
// //         progress.lessonDetails = [];
// //     }
    
// //     const detailData: any = { lessonId, type: 'lesson', submittedAt: new Date() };
    
// //     if (pollAnswer) {
// //         detailData.type = 'poll';
// //         detailData.pollAnswer = pollAnswer;
// //     }

// //     if (score !== undefined) {
// //         detailData.type = 'quiz';
// //         detailData.score = score;
// //         detailData.attempts = attempts || 1;
// //     }

// //     progress.lessonDetails.push(detailData);

// //     // 2. Tandai Selesai (Completed)
// //     if (!progress.completedLessons.some((id: any) => id.toString() === strLessonId)) {
// //       progress.completedLessons.push(lessonId);
// //     }
    
// //     progress.lastAccessed = new Date();
// //     await progress.save();
    
// //     await updateEnrollmentProgress(userId, courseId);

// //     res.json({ message: 'Lesson completed', completedLessons: progress.completedLessons });
// //   } catch (error: any) {
// //     res.status(500).json({ error: error.message });
// //   }
// // };

// // export const submitEssay = async (req: AuthedRequest, res: Response) => {
// //   try {
// //     const { courseId } = req.params;
// //     const { lessonId, answers } = req.body; 
// //     const userId = req.user?.id; 

// //     if (!userId) return res.status(401).json({ error: "Unauthorized" });

// //     let progress = await Progress.findOne({ userId, courseId });
// //     if (!progress) progress = new Progress({ userId, courseId, completedLessons: [], lessonDetails: [] });

// //     const strLessonId = lessonId.toString();
    
// //     if (progress.lessonDetails) {
// //         progress.lessonDetails = progress.lessonDetails.filter((d: any) => d.lessonId.toString() !== strLessonId);
// //     } else {
// //         progress.lessonDetails = [];
// //     }

// //     progress.lessonDetails.push({
// //         lessonId,
// //         type: 'essay',
// //         essayAnswers: answers, 
// //         submittedAt: new Date()
// //     });

// //     if (!progress.completedLessons.some((id: any) => id.toString() === strLessonId)) {
// //         progress.completedLessons.push(lessonId);
// //     }

// //     await progress.save();
// //     await updateEnrollmentProgress(userId, courseId);

// //     res.json({ message: 'Jawaban esai tersimpan', completedLessons: progress.completedLessons });
// //   } catch (error: any) {
// //     res.status(500).json({ error: error.message });
// //   }
// // };

// // export const submitTask = async (req: AuthedRequest, res: Response) => {
// //   try {
// //     const { courseId } = req.params;
// //     const { lessonId, fileUrl, fileName } = req.body;
// //     const userId = req.user?.id; 

// //     if (!userId) return res.status(401).json({ error: "Unauthorized" });

// //     let progress = await Progress.findOne({ userId, courseId });
// //     if (!progress) progress = new Progress({ userId, courseId, completedLessons: [], lessonDetails: [] });

// //     const strLessonId = lessonId.toString();

// //     if (progress.lessonDetails) {
// //         progress.lessonDetails = progress.lessonDetails.filter((d: any) => d.lessonId.toString() !== strLessonId);
// //     } else {
// //         progress.lessonDetails = [];
// //     }

// //     progress.lessonDetails.push({
// //         lessonId,
// //         type: 'upload_doc',
// //         uploadedFile: { url: fileUrl, name: fileName, uploadedAt: new Date() },
// //         submittedAt: new Date()
// //     });

// //     if (!progress.completedLessons.some((id: any) => id.toString() === strLessonId)) {
// //         progress.completedLessons.push(lessonId);
// //     }

// //     await progress.save();
// //     await updateEnrollmentProgress(userId, courseId);

// //     res.json({ message: 'Tugas berhasil diupload', completedLessons: progress.completedLessons });
// //   } catch (error: any) {
// //     res.status(500).json({ error: error.message });
// //   }
// // };
// import { Request, Response } from 'express';
// import { Progress } from '../models/Progress';
// import Enrollment from '../models/Enrollment';
// import { Course } from '../models/Course';
// import { AuthedRequest } from '../middleware/auth'; 

// // --- HELPER: HITUNG & UPDATE PROGRESS KURSUS ---
// const updateEnrollmentProgress = async (userId: string, courseId: string) => {
//     try {
//         const progress = await Progress.findOne({ userId, courseId });
//         if (!progress) return;

//         const course: any = await Course.findById(courseId).select('modules');
//         if (!course) return;

//         let totalLessons = 0;
//         course.modules.forEach((m: any) => {
//             if (m.isActive) {
//                 m.lessons.forEach((l: any) => { if (l.isActive) totalLessons++; });
//             }
//         });

//         const completedCount = progress.completedLessons.length;
//         let percentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
//         if (percentage > 100) percentage = 100;

//         await Enrollment.findOneAndUpdate(
//             { user: userId, course: courseId },
//             { 
//                 $set: { 
//                     progress: percentage,
//                     isCompleted: percentage === 100,
//                     completedAt: percentage === 100 ? new Date() : null
//                 }
//             }
//         );
//     } catch (err) { console.error("[SYNC ERROR]", err); }
// };

// // --- CONTROLLERS ---

// export const getProgress = async (req: AuthedRequest, res: Response) => {
//   try {
//     const { courseId } = req.params;
//     const userId = req.user?.id; 
//     if (!userId) return res.status(401).json({ error: "Unauthorized" });

//     const progress = await Progress.findOne({ userId, courseId });
//     if (!progress) {
//         return res.json({ completedLessons: [], lessonDetails: [], quizScores: [] });
//     }
//     res.json(progress);
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const markLessonComplete = async (req: AuthedRequest, res: Response) => {
//   try {
//     const { courseId } = req.params;
//     const { lessonId, pollAnswer, score, attempts } = req.body; 
//     const userId = req.user?.id; 

//     if (!userId) return res.status(401).json({ error: "Unauthorized" });

//     let progress = await Progress.findOne({ userId, courseId });
//     if (!progress) progress = new Progress({ userId, courseId, completedLessons: [], lessonDetails: [] });

//     const strLessonId = lessonId.toString();

//     // [FIX 1] LOGIKA UPDATE / REPLACE DETAIL
//     // Cari index detail yang sudah ada untuk lesson ini
//     const existingIdx = progress.lessonDetails.findIndex((d: any) => d.lessonId.toString() === strLessonId);

//     const detailData: any = { 
//         lessonId, 
//         type: 'lesson', 
//         submittedAt: new Date() 
//     };
    
//     // Masukkan data spesifik
//     if (pollAnswer) {
//         detailData.type = 'poll';
//         detailData.pollAnswer = pollAnswer;
//     }

//     if (score !== undefined) {
//         detailData.type = 'quiz';
//         detailData.score = score;
//         // [FIX 2] Pastikan attempts tersimpan. Jika tidak dikirim, default ke 1.
//         detailData.attempts = attempts || 1; 
//     }

//     // Jika sudah ada, kita UPDATE data tersebut (agar attempts terupdate di record yang sama)
//     if (existingIdx > -1) {
//         // Merge data lama dengan baru (tapi override score & attempts)
//         const oldData = progress.lessonDetails[existingIdx];
//         progress.lessonDetails[existingIdx] = { ...oldData, ...detailData };
//     } else {
//         // Jika belum ada, push baru
//         progress.lessonDetails.push(detailData);
//     }

//     // 2. Tandai Selesai di completedLessons (Array ID unik)
//     if (!progress.completedLessons.some((id: any) => id.toString() === strLessonId)) {
//       progress.completedLessons.push(lessonId);
//     }
    
//     progress.lastAccessed = new Date();
//     await progress.save();
    
//     await updateEnrollmentProgress(userId, courseId);

//     res.json({ message: 'Lesson completed', completedLessons: progress.completedLessons });
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const submitEssay = async (req: AuthedRequest, res: Response) => {
//   try {
//     const { courseId } = req.params;
//     const { lessonId, answers } = req.body; 
//     const userId = req.user?.id; 

//     if (!userId) return res.status(401).json({ error: "Unauthorized" });

//     let progress = await Progress.findOne({ userId, courseId });
//     if (!progress) progress = new Progress({ userId, courseId, completedLessons: [], lessonDetails: [] });

//     const strLessonId = lessonId.toString();
    
//     // Hapus detail lama (Essay ditimpa jika submit ulang)
//     if (progress.lessonDetails) {
//         progress.lessonDetails = progress.lessonDetails.filter((d: any) => d.lessonId.toString() !== strLessonId);
//     } else {
//         progress.lessonDetails = [];
//     }

//     progress.lessonDetails.push({
//         lessonId,
//         type: 'essay',
//         essayAnswers: answers, 
//         submittedAt: new Date()
//     });

//     if (!progress.completedLessons.some((id: any) => id.toString() === strLessonId)) {
//         progress.completedLessons.push(lessonId);
//     }

//     await progress.save();
//     await updateEnrollmentProgress(userId, courseId);

//     res.json({ message: 'Jawaban esai tersimpan', completedLessons: progress.completedLessons });
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const submitTask = async (req: AuthedRequest, res: Response) => {
//   try {
//     const { courseId } = req.params;
//     const { lessonId, fileUrl, fileName } = req.body;
//     const userId = req.user?.id; 

//     if (!userId) return res.status(401).json({ error: "Unauthorized" });

//     let progress = await Progress.findOne({ userId, courseId });
//     if (!progress) progress = new Progress({ userId, courseId, completedLessons: [], lessonDetails: [] });

//     const strLessonId = lessonId.toString();

//     // Hapus detail lama (Upload ulang menimpa file lama)
//     if (progress.lessonDetails) {
//         progress.lessonDetails = progress.lessonDetails.filter((d: any) => d.lessonId.toString() !== strLessonId);
//     } else {
//         progress.lessonDetails = [];
//     }

//     progress.lessonDetails.push({
//         lessonId,
//         type: 'upload_doc',
//         uploadedFile: { url: fileUrl, name: fileName, uploadedAt: new Date() },
//         submittedAt: new Date()
//     });

//     if (!progress.completedLessons.some((id: any) => id.toString() === strLessonId)) {
//         progress.completedLessons.push(lessonId);
//     }

//     await progress.save();
//     await updateEnrollmentProgress(userId, courseId);

//     res.json({ message: 'Tugas berhasil diupload', completedLessons: progress.completedLessons });
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };

import { Request, Response } from 'express';
import { Progress } from '../models/Progress';
import Enrollment from '../models/Enrollment';
import { Course } from '../models/Course';
import { AuthedRequest } from '../middleware/auth'; 

// --- HELPER: HITUNG & UPDATE PROGRESS KURSUS ---
const updateEnrollmentProgress = async (userId: string, courseId: string) => {
    try {
        const progress = await Progress.findOne({ userId, courseId });
        if (!progress) return;

        const course: any = await Course.findById(courseId).select('modules');
        if (!course) return;

        let totalLessons = 0;
        course.modules.forEach((m: any) => {
            if (m.isActive) {
                m.lessons.forEach((l: any) => { if (l.isActive) totalLessons++; });
            }
        });

        const completedCount = progress.completedLessons.length;
        let percentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
        if (percentage > 100) percentage = 100;

        await Enrollment.findOneAndUpdate(
            { user: userId, course: courseId },
            { 
                $set: { 
                    progress: percentage,
                    isCompleted: percentage === 100,
                    completedAt: percentage === 100 ? new Date() : null
                }
            }
        );
    } catch (err) { console.error("[SYNC ERROR]", err); }
};

// --- CONTROLLERS ---

export const getProgress = async (req: AuthedRequest, res: Response) => {
  try {
    const { courseId } = req.params;
    const userId = req.user?.id; 
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const progress = await Progress.findOne({ userId, courseId });
    if (!progress) {
        return res.json({ completedLessons: [], lessonDetails: [], quizScores: [] });
    }
    res.json(progress);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const markLessonComplete = async (req: AuthedRequest, res: Response) => {
  try {
    // [FIX] Ambil courseId dari body jika tidak ada di params
    const courseId = req.params.courseId || req.body.courseId;
    const { lessonId, pollAnswer, score, attempts } = req.body; 
    const userId = req.user?.id; 

    if (!userId) return res.status(401).json({ error: "Unauthorized" });
    if (!courseId) return res.status(400).json({ error: "Course ID required" });

    let progress = await Progress.findOne({ userId, courseId });
    if (!progress) progress = new Progress({ userId, courseId, completedLessons: [], lessonDetails: [] });

    const strLessonId = lessonId.toString();

    // LOGIKA UPDATE / REPLACE DETAIL
    const existingIdx = progress.lessonDetails.findIndex((d: any) => d.lessonId.toString() === strLessonId);

    const detailData: any = { 
        lessonId, 
        type: 'lesson', 
        submittedAt: new Date() 
    };
    
    if (pollAnswer) {
        detailData.type = 'poll';
        detailData.pollAnswer = pollAnswer;
    }

    if (score !== undefined) {
        detailData.type = 'quiz';
        detailData.score = score;
        detailData.attempts = attempts || 1; 
    }

    if (existingIdx > -1) {
        const oldData = progress.lessonDetails[existingIdx];
        progress.lessonDetails[existingIdx] = { ...oldData, ...detailData };
    } else {
        progress.lessonDetails.push(detailData);
    }

    // Tandai Selesai di completedLessons
    if (!progress.completedLessons.some((id: any) => id.toString() === strLessonId)) {
      progress.completedLessons.push(lessonId);
    }
    
    progress.lastAccessed = new Date();
    await progress.save();
    
    await updateEnrollmentProgress(userId, courseId);

    res.json({ message: 'Lesson completed', completedLessons: progress.completedLessons });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const submitEssay = async (req: AuthedRequest, res: Response) => {
  try {
    const courseId = req.params.courseId || req.body.courseId; // [FIX] Support Body
    const { lessonId, answers } = req.body; 
    const userId = req.user?.id; 

    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    let progress = await Progress.findOne({ userId, courseId });
    if (!progress) progress = new Progress({ userId, courseId, completedLessons: [], lessonDetails: [] });

    const strLessonId = lessonId.toString();
    
    if (progress.lessonDetails) {
        progress.lessonDetails = progress.lessonDetails.filter((d: any) => d.lessonId.toString() !== strLessonId);
    } else {
        progress.lessonDetails = [];
    }

    progress.lessonDetails.push({
        lessonId,
        type: 'essay',
        essayAnswers: answers, 
        submittedAt: new Date()
    });

    if (!progress.completedLessons.some((id: any) => id.toString() === strLessonId)) {
        progress.completedLessons.push(lessonId);
    }

    await progress.save();
    await updateEnrollmentProgress(userId, courseId);

    res.json({ message: 'Jawaban esai tersimpan', completedLessons: progress.completedLessons });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const submitTask = async (req: AuthedRequest, res: Response) => {
  try {
    const courseId = req.params.courseId || req.body.courseId; // [FIX] Support Body
    const { lessonId, fileUrl, fileName } = req.body;
    const userId = req.user?.id; 

    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    let progress = await Progress.findOne({ userId, courseId });
    if (!progress) progress = new Progress({ userId, courseId, completedLessons: [], lessonDetails: [] });

    const strLessonId = lessonId.toString();

    if (progress.lessonDetails) {
        progress.lessonDetails = progress.lessonDetails.filter((d: any) => d.lessonId.toString() !== strLessonId);
    } else {
        progress.lessonDetails = [];
    }

    progress.lessonDetails.push({
        lessonId,
        type: 'upload_doc',
        uploadedFile: { url: fileUrl, name: fileName, uploadedAt: new Date() },
        submittedAt: new Date()
    });

    if (!progress.completedLessons.some((id: any) => id.toString() === strLessonId)) {
        progress.completedLessons.push(lessonId);
    }

    await progress.save();
    await updateEnrollmentProgress(userId, courseId);

    res.json({ message: 'Tugas berhasil diupload', completedLessons: progress.completedLessons });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
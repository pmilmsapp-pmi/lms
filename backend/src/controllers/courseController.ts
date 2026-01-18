// // // // // // import { Request, Response } from 'express';
// // // // // // import { Course } from '../models/Course';
// // // // // // import Enrollment from '../models/Enrollment';
// // // // // // import { Progress } from '../models/Progress';
// // // // // // import { Message } from '../models/Message'; 
// // // // // // import { AuthedRequest } from '../middleware/auth'; 
// // // // // // import mongoose from 'mongoose';

// // // // // // // ==========================================
// // // // // // // 1. STANDARD CRUD COURSE
// // // // // // // ==========================================

// // // // // // export const createCourse = async (req: Request, res: Response) => {
// // // // // //   try {
// // // // // //     const course = new Course(req.body);
// // // // // //     await course.save();
// // // // // //     res.status(201).json(course);
// // // // // //   } catch (error: any) {
// // // // // //     res.status(400).json({ error: error.message });
// // // // // //   }
// // // // // // };

// // // // // // export const getCourses = async (req: Request, res: Response) => {
// // // // // //   try {
// // // // // //     const courses = await Course.find()
// // // // // //       .populate('facilitatorIds', 'name email avatarUrl')
// // // // // //       .sort({ createdAt: -1 });
// // // // // //     res.json({ courses }); 
// // // // // //   } catch (error: any) {
// // // // // //     res.status(500).json({ error: error.message });
// // // // // //   }
// // // // // // };

// // // // // // export const getCourseById = async (req: Request, res: Response) => {
// // // // // //   try {
// // // // // //     const course = await Course.findById(req.params.id)
// // // // // //       .populate('facilitatorIds', 'name email avatarUrl');
// // // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // // // // //     res.json(course);
// // // // // //   } catch (error: any) {
// // // // // //     res.status(500).json({ error: error.message });
// // // // // //   }
// // // // // // };

// // // // // // export const updateCourse = async (req: Request, res: Response) => {
// // // // // //   try {
// // // // // //     const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
// // // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // // // // //     res.json(course);
// // // // // //   } catch (error: any) {
// // // // // //     res.status(400).json({ error: error.message });
// // // // // //   }
// // // // // // };

// // // // // // export const deleteCourse = async (req: Request, res: Response) => {
// // // // // //   try {
// // // // // //     const course = await Course.findByIdAndDelete(req.params.id);
// // // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
    
// // // // // //     await Enrollment.deleteMany({ course: req.params.id });
// // // // // //     await Progress.deleteMany({ courseId: req.params.id });
    
// // // // // //     res.json({ message: 'Kursus berhasil dihapus' });
// // // // // //   } catch (error: any) {
// // // // // //     res.status(500).json({ error: error.message });
// // // // // //   }
// // // // // // };

// // // // // // // ==========================================
// // // // // // // 2. MODULE & LESSON MANAGEMENT
// // // // // // // ==========================================

// // // // // // export const addModule = async (req: Request, res: Response) => {
// // // // // //     try {
// // // // // //         const { id } = req.params;
// // // // // //         const course = await Course.findById(id);
// // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // //         course.modules.push(req.body);
// // // // // //         await course.save();
// // // // // //         res.json(course);
// // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // };

// // // // // // export const updateModule = async (req: Request, res: Response) => {
// // // // // //     try {
// // // // // //         const { courseId, moduleId } = req.params;
// // // // // //         const course = await Course.findById(courseId);
// // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // //         const module = course.modules.id(moduleId);
// // // // // //         if (!module) return res.status(404).json({ error: 'Module not found' });
// // // // // //         module.set(req.body);
// // // // // //         await course.save();
// // // // // //         res.json(course);
// // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // };

// // // // // // export const addLesson = async (req: Request, res: Response) => {
// // // // // //     try {
// // // // // //         const { courseId, moduleId } = req.params;
// // // // // //         const course = await Course.findById(courseId);
// // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // //         const module = course.modules.id(moduleId);
// // // // // //         if (!module) return res.status(404).json({ error: 'Module not found' });
        
// // // // // //         module.lessons.push(req.body);
        
// // // // // //         await course.save();
// // // // // //         res.json(course);
// // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // };

// // // // // // export const updateLesson = async (req: Request, res: Response) => {
// // // // // //     try {
// // // // // //         const { courseId, moduleId, lessonId } = req.params;
// // // // // //         const course = await Course.findById(courseId);
// // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // //         const module = course.modules.id(moduleId);
// // // // // //         if (!module) return res.status(404).json({ error: 'Module not found' });
// // // // // //         const lesson = module.lessons.id(lessonId);
// // // // // //         if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
        
// // // // // //         lesson.set(req.body);
        
// // // // // //         await course.save();
// // // // // //         res.json(course);
// // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // };

// // // // // // export const deleteLesson = async (req: Request, res: Response) => {
// // // // // //     try {
// // // // // //         const { courseId, moduleId, lessonId } = req.params;
// // // // // //         const course = await Course.findById(courseId);
// // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // //         const module = course.modules.id(moduleId);
// // // // // //         if (module) {
// // // // // //             module.lessons.pull({ _id: lessonId }); 
// // // // // //             await course.save();
// // // // // //         }
// // // // // //         res.json(course);
// // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // };

// // // // // // export const toggleStatus = async (req: Request, res: Response) => {
// // // // // //     try {
// // // // // //         const { id } = req.params;
// // // // // //         const { moduleId, lessonId } = req.body;
// // // // // //         const course = await Course.findById(id);
// // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });

// // // // // //         if (moduleId && lessonId) {
// // // // // //             const mod = course.modules.id(moduleId);
// // // // // //             const les = mod?.lessons.id(lessonId);
// // // // // //             if (les) les.isActive = !les.isActive;
// // // // // //         } else if (moduleId) {
// // // // // //             const mod = course.modules.id(moduleId);
// // // // // //             if (mod) mod.isActive = !mod.isActive;
// // // // // //         } else {
// // // // // //             course.isPublished = !course.isPublished;
// // // // // //         }
// // // // // //         await course.save();
// // // // // //         res.json(course);
// // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // };

// // // // // // export const reorderModules = async (req: Request, res: Response) => {
// // // // // //     try {
// // // // // //         const { id } = req.params;
// // // // // //         const { modules } = req.body;
// // // // // //         await Course.findByIdAndUpdate(id, { modules });
// // // // // //         res.json({ message: 'Urutan disimpan' });
// // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // };

// // // // // // // [NEW] FUNGSI UPDATE GRADING SCHEME
// // // // // // export const updateGradingScheme = async (req: Request, res: Response) => {
// // // // // //     try {
// // // // // //         const { id } = req.params;
// // // // // //         const { modules } = req.body; 

// // // // // //         if (!modules) return res.status(400).json({ error: "Data modul diperlukan" });

// // // // // //         const course = await Course.findByIdAndUpdate(id, { modules }, { new: true });
// // // // // //         if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
        
// // // // // //         res.json({ message: 'Skema penilaian berhasil disimpan', course });
// // // // // //     } catch (error: any) {
// // // // // //         res.status(500).json({ error: error.message });
// // // // // //     }
// // // // // // };

// // // // // // // ==========================================
// // // // // // // 3. ENROLLMENT & VERIFICATION
// // // // // // // ==========================================

// // // // // // export const enrollCourse = async (req: AuthedRequest, res: Response) => {
// // // // // //     try {
// // // // // //         const { courseId } = req.params; 
// // // // // //         const userId = req.user?.id;
// // // // // //         const { registrationData } = req.body; // Ambil data pendaftaran (termasuk file url)
        
// // // // // //         if (!userId) return res.status(401).json({ error: 'Unauthorized' });

// // // // // //         const existing = await Enrollment.findOne({ user: userId, course: courseId });
// // // // // //         if (existing) return res.status(400).json({ error: 'Anda sudah mendaftar.' });

// // // // // //         const newEnrollment = new Enrollment({
// // // // // //             user: userId,
// // // // // //             course: courseId,
// // // // // //             status: 'pending', 
// // // // // //             progress: 0,
// // // // // //             isCompleted: false,
// // // // // //             enrolledAt: new Date(),
// // // // // //             registrationData: registrationData || {} 
// // // // // //         });

// // // // // //         await newEnrollment.save();
// // // // // //         res.status(201).json({ message: 'Pendaftaran berhasil. Menunggu verifikasi.', enrollment: newEnrollment });
// // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // };

// // // // // // export const verifyEnrollment = async (req: Request, res: Response) => {
// // // // // //     try {
// // // // // //         const { enrollmentId, action } = req.body; 

// // // // // //         if (!enrollmentId || !action) return res.status(400).json({ error: "Data tidak lengkap" });

// // // // // //         if (action === 'reject') {
// // // // // //             await Enrollment.findByIdAndDelete(enrollmentId);
// // // // // //             return res.json({ message: "Pendaftaran ditolak." });
// // // // // //         }
// // // // // //         if (action === 'approve') {
// // // // // //             await Enrollment.findByIdAndUpdate(enrollmentId, { status: 'active', joinedAt: new Date() });
// // // // // //             return res.json({ message: "Pendaftaran disetujui." });
// // // // // //         }
// // // // // //         res.status(400).json({ error: "Aksi tidak valid" });
// // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // };

// // // // // // export const checkEnrollmentStatus = async (req: AuthedRequest, res: Response) => {
// // // // // //     try {
// // // // // //         const { courseId } = req.params;
// // // // // //         const userId = req.user?.id;
        
// // // // // //         if (!userId) return res.status(401).json({ error: 'Unauthorized' });

// // // // // //         const enrollment = await Enrollment.findOne({ user: userId, course: courseId });
// // // // // //         if (!enrollment) return res.json({ isEnrolled: false, status: null });

// // // // // //         res.json({ isEnrolled: true, status: enrollment.status, progress: enrollment.progress });
// // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // };

// // // // // // // ==========================================
// // // // // // // 4. PARTICIPANT MANAGEMENT (REALTIME LOGIC)
// // // // // // // ==========================================

// // // // // // export const getCourseParticipants = async (req: Request, res: Response) => {
// // // // // //   try {
// // // // // //     res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
// // // // // //     const { id } = req.params; 

// // // // // //     // A. Ambil Data Enrollment
// // // // // //     const enrollments = await Enrollment.find({ course: id })
// // // // // //       .populate('user', 'name email avatarUrl role')
// // // // // //       .sort({ createdAt: -1 })
// // // // // //       .lean();

// // // // // //     if (!enrollments.length) return res.json({ participants: [] });

// // // // // //     // B. Ambil Progress User
// // // // // //     const userIds = enrollments.map((e: any) => e.user?._id);
// // // // // //     const progressRecords = await Progress.find({ courseId: id, userId: { $in: userIds } }).lean();

// // // // // //     // C. Peta Struktur Course
// // // // // //     const course: any = await Course.findById(id).select('modules').lean();
// // // // // //     let totalLessons = 0;
// // // // // //     const validLessonIds = new Set<string>();
// // // // // //     const lessonMap = new Map();
// // // // // //     const orderedLessonIds: string[] = [];

// // // // // //     if (course && course.modules) {
// // // // // //         course.modules.forEach((m: any) => {
// // // // // //             if (m.isActive) {
// // // // // //                 m.lessons.forEach((l: any) => { 
// // // // // //                     if (l.isActive) {
// // // // // //                         totalLessons++; 
// // // // // //                         const lId = l._id.toString();
// // // // // //                         validLessonIds.add(lId);
// // // // // //                         orderedLessonIds.push(lId);
// // // // // //                         lessonMap.set(lId, { lessonTitle: l.title, moduleTitle: m.title });
// // // // // //                     }
// // // // // //                 });
// // // // // //             }
// // // // // //         });
// // // // // //     }

// // // // // //     // D. Merge Data
// // // // // //     const participants = await Promise.all(enrollments.map(async (enroll: any) => {
// // // // // //         const userObj = enroll.user || {};
// // // // // //         const detail = progressRecords.find((p: any) => p.userId.toString() === userObj._id?.toString());
        
// // // // // //         let completedIds: string[] = [];
// // // // // //         let calculatedProgress = 0;
// // // // // //         let currentPosition = "Belum Memulai"; 

// // // // // //         if ((enroll.status === 'active' || enroll.status === 'approved') && detail) {
// // // // // //             const rawCompleted = detail.completedLessons.map((id: any) => id.toString());
// // // // // //             completedIds = rawCompleted.filter((id) => validLessonIds.has(id));
            
// // // // // //             if (totalLessons > 0) {
// // // // // //                 calculatedProgress = Math.round((completedIds.length / totalLessons) * 100);
// // // // // //             }
// // // // // //             if (calculatedProgress > 100) calculatedProgress = 100;

// // // // // //             const nextLessonId = orderedLessonIds.find(id => !completedIds.includes(id));
// // // // // //             if (calculatedProgress === 100) {
// // // // // //                 currentPosition = "✅ Selesai";
// // // // // //             } else if (nextLessonId) {
// // // // // //                 const info = lessonMap.get(nextLessonId);
// // // // // //                 if (info) currentPosition = `Sedang: ${info.lessonTitle}`; 
// // // // // //             }
// // // // // //         }

// // // // // //         if ((enroll.status === 'active' || enroll.status === 'approved') && enroll.progress !== calculatedProgress) {
// // // // // //             await Enrollment.updateOne(
// // // // // //                 { _id: enroll._id }, 
// // // // // //                 { $set: { progress: calculatedProgress, isCompleted: calculatedProgress === 100 } }
// // // // // //             );
// // // // // //         }

// // // // // //         return {
// // // // // //             _id: enroll._id, 
// // // // // //             user: {
// // // // // //                 _id: userObj._id,
// // // // // //                 name: userObj.name || enroll.registrationData?.fullName || 'Tanpa Nama',
// // // // // //                 email: userObj.email || enroll.registrationData?.email || '-',
// // // // // //                 avatarUrl: userObj.avatarUrl,
// // // // // //                 role: userObj.role
// // // // // //             },
// // // // // //             // [NEW] Kirim data formulir pendaftaran (termasuk uploadedFormUrl)
// // // // // //             registrationData: enroll.registrationData || {},
            
// // // // // //             status: enroll.status || 'pending', 
// // // // // //             joinedAt: enroll.createdAt,
// // // // // //             progress: calculatedProgress, 
// // // // // //             isCompleted: calculatedProgress === 100 || enroll.isCompleted,
// // // // // //             completedLessons: completedIds, 
// // // // // //             currentPosition: currentPosition, 
// // // // // //             lessonDetails: detail ? detail.lessonDetails : []
// // // // // //         };
// // // // // //     }));

// // // // // //     res.json({ participants });
// // // // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // };

// // // // // // // ==========================================
// // // // // // // 5. ADMIN ACTIONS
// // // // // // // ==========================================

// // // // // // export const markCompleteLessonByAdmin = async (req: Request, res: Response) => {
// // // // // //     try {
// // // // // //         const { studentId, lessonId, courseId } = req.body;
// // // // // //         let progress = await Progress.findOne({ userId: studentId, courseId });
// // // // // //         if (!progress) progress = new Progress({ userId: studentId, courseId, completedLessons: [], lessonDetails: [] });

// // // // // //         const strLessonId = lessonId.toString();
// // // // // //         if (!progress.completedLessons.some((id: any) => id.toString() === strLessonId)) {
// // // // // //             progress.completedLessons.push(lessonId);
// // // // // //             await progress.save();
// // // // // //         }

// // // // // //         const course: any = await Course.findById(courseId).select('modules');
// // // // // //         let totalLessons = 0;
// // // // // //         if(course) course.modules.forEach((m:any) => { if(m.isActive) m.lessons.forEach((l:any) => { if(l.isActive) totalLessons++; }); });
        
// // // // // //         let newProgress = 0;
// // // // // //         if (totalLessons > 0) newProgress = Math.round((progress.completedLessons.length / totalLessons) * 100);
// // // // // //         if (newProgress > 100) newProgress = 100;

// // // // // //         await Enrollment.findOneAndUpdate(
// // // // // //             { user: studentId, course: courseId }, 
// // // // // //             { $set: { progress: newProgress, isCompleted: newProgress === 100, completedAt: newProgress === 100 ? new Date() : null } }
// // // // // //         );

// // // // // //         res.json({ message: 'Berhasil diluluskan', progress: newProgress });
// // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // };

// // // // // // export const resetQuizByAdmin = async (req: Request, res: Response) => {
// // // // // //     try {
// // // // // //         const { studentId, quizId } = req.body; 
// // // // // //         if (!studentId || !quizId) return res.status(400).json({ error: "Data incomplete" });

// // // // // //         let progressDoc = await Progress.findOne({ userId: studentId, completedLessons: new mongoose.Types.ObjectId(quizId) });

// // // // // //         if (progressDoc) {
// // // // // //             progressDoc.completedLessons = progressDoc.completedLessons.filter((id: any) => id.toString() !== quizId);
// // // // // //             if (progressDoc.lessonDetails) {
// // // // // //                 progressDoc.lessonDetails = progressDoc.lessonDetails.filter((d: any) => d.lessonId && d.lessonId.toString() !== quizId);
// // // // // //             }
// // // // // //             if (progressDoc.quizScores) {
// // // // // //                 progressDoc.quizScores = progressDoc.quizScores.filter((s: any) => s.lessonId && s.lessonId.toString() !== quizId);
// // // // // //             }
// // // // // //             progressDoc.isCompleted = false; 
// // // // // //             await progressDoc.save();

// // // // // //             const courseId = progressDoc.courseId;
// // // // // //             const courseData: any = await Course.findById(courseId).select('modules');
// // // // // //             let totalLessons = 0;
// // // // // //             if (courseData) {
// // // // // //                 courseData.modules.forEach((m: any) => {
// // // // // //                     if (m.isActive) m.lessons.forEach((l: any) => { if (l.isActive) totalLessons++; });
// // // // // //                 });
// // // // // //             }
// // // // // //             let newProgress = 0;
// // // // // //             if (totalLessons > 0) newProgress = Math.round((progressDoc.completedLessons.length / totalLessons) * 100);
// // // // // //             if (newProgress > 100) newProgress = 100;

// // // // // //             await Enrollment.findOneAndUpdate(
// // // // // //                 { user: studentId, course: courseId },
// // // // // //                 { $set: { progress: newProgress, isCompleted: newProgress === 100, completedAt: newProgress === 100 ? new Date() : null } }
// // // // // //             );
// // // // // //         }
// // // // // //         res.json({ message: 'Reset berhasil & Progress dihitung ulang' });
// // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // };

// // // // // // // ==========================================
// // // // // // // 6. GROUP CHAT FEATURES
// // // // // // // ==========================================

// // // // // // export const getGroupMessages = async (req: AuthedRequest, res: Response) => {
// // // // // //     try {
// // // // // //         const { id } = req.params; 
// // // // // //         const { type } = req.query; 
// // // // // //         const userId = req.user?.id;

// // // // // //         const course = await Course.findById(id);
// // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });

// // // // // //         const isFacilitator = course.facilitatorIds.map((f: any) => f.toString()).includes(userId) || req.user?.role === 'SUPER_ADMIN';
// // // // // //         const enrollment = await Enrollment.findOne({ course: id, user: userId, status: { $in: ['active', 'approved'] } });
// // // // // //         const isStudent = !!enrollment;

// // // // // //         if (type === 'internal' && !isFacilitator) return res.status(403).json({ error: 'Akses ditolak.' });
// // // // // //         if (type === 'public' && !isFacilitator && !isStudent) return res.status(403).json({ error: 'Akses ditolak.' });

// // // // // //         const query: any = { course: id, type: type || 'public' };
// // // // // //         const messages = await Message.find(query)
// // // // // //             .populate('sender', 'name avatarUrl role')
// // // // // //             .sort({ createdAt: 1 });

// // // // // //         res.json(messages);
// // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // };

// // // // // // export const sendGroupMessage = async (req: AuthedRequest, res: Response) => {
// // // // // //     try {
// // // // // //         const { id } = req.params; 
// // // // // //         const { text, type, attachment } = req.body; 
// // // // // //         const userId = req.user?.id;

// // // // // //         const course = await Course.findById(id);
// // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });

// // // // // //         const isFacilitator = course.facilitatorIds.map((f: any) => f.toString()).includes(userId) || req.user?.role === 'SUPER_ADMIN';
        
// // // // // //         if (type === 'internal' && !isFacilitator) return res.status(403).json({ error: 'Hanya Tim Fasilitator.' });

// // // // // //         if (type === 'public') {
// // // // // //             const enrollment = await Enrollment.findOne({ course: id, user: userId, status: { $in: ['active', 'approved'] } });
// // // // // //             if (!isFacilitator && !enrollment) return res.status(403).json({ error: 'Akses dilarang.' });
// // // // // //         }

// // // // // //         const newMessage = new Message({
// // // // // //             course: id,
// // // // // //             sender: userId,
// // // // // //             message: text || '', 
// // // // // //             type: type || 'public',
// // // // // //             isRead: false,
// // // // // //             isGlobal: false,
// // // // // //             attachment: attachment || null 
// // // // // //         });

// // // // // //         await newMessage.save();
// // // // // //         const populatedMsg = await newMessage.populate('sender', 'name avatarUrl role');
        
// // // // // //         res.status(201).json(populatedMsg);
// // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // };
// // // // // import { Request, Response } from 'express';
// // // // // import { Course } from '../models/Course';
// // // // // import Enrollment from '../models/Enrollment';
// // // // // import { Progress } from '../models/Progress';
// // // // // import { Message } from '../models/Message'; 
// // // // // import { AuthedRequest } from '../middleware/auth'; 
// // // // // import mongoose from 'mongoose';

// // // // // // ==========================================
// // // // // // 1. STANDARD CRUD COURSE
// // // // // // ==========================================

// // // // // export const createCourse = async (req: Request, res: Response) => {
// // // // //   try {
// // // // //     const course = new Course(req.body);
// // // // //     await course.save();
// // // // //     res.status(201).json(course);
// // // // //   } catch (error: any) {
// // // // //     res.status(400).json({ error: error.message });
// // // // //   }
// // // // // };

// // // // // export const getCourses = async (req: Request, res: Response) => {
// // // // //   try {
// // // // //     const courses = await Course.find()
// // // // //       .populate('facilitatorIds', 'name email avatarUrl')
// // // // //       .sort({ createdAt: -1 });
// // // // //     res.json({ courses }); 
// // // // //   } catch (error: any) {
// // // // //     res.status(500).json({ error: error.message });
// // // // //   }
// // // // // };

// // // // // export const getCourseById = async (req: Request, res: Response) => {
// // // // //   try {
// // // // //     const course = await Course.findById(req.params.id)
// // // // //       .populate('facilitatorIds', 'name email avatarUrl');
// // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // // // //     res.json(course);
// // // // //   } catch (error: any) {
// // // // //     res.status(500).json({ error: error.message });
// // // // //   }
// // // // // };

// // // // // export const updateCourse = async (req: Request, res: Response) => {
// // // // //   try {
// // // // //     const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
// // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // // // //     res.json(course);
// // // // //   } catch (error: any) {
// // // // //     res.status(400).json({ error: error.message });
// // // // //   }
// // // // // };

// // // // // export const deleteCourse = async (req: Request, res: Response) => {
// // // // //   try {
// // // // //     const course = await Course.findByIdAndDelete(req.params.id);
// // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
    
// // // // //     await Enrollment.deleteMany({ course: req.params.id });
// // // // //     await Progress.deleteMany({ courseId: req.params.id });
    
// // // // //     res.json({ message: 'Kursus berhasil dihapus' });
// // // // //   } catch (error: any) {
// // // // //     res.status(500).json({ error: error.message });
// // // // //   }
// // // // // };

// // // // // // ==========================================
// // // // // // 2. MODULE & LESSON MANAGEMENT
// // // // // // ==========================================

// // // // // export const addModule = async (req: Request, res: Response) => {
// // // // //     try {
// // // // //         const { id } = req.params;
// // // // //         const course = await Course.findById(id);
// // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // //         course.modules.push(req.body);
// // // // //         await course.save();
// // // // //         res.json(course);
// // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // };

// // // // // export const updateModule = async (req: Request, res: Response) => {
// // // // //     try {
// // // // //         const { courseId, moduleId } = req.params;
// // // // //         const course = await Course.findById(courseId);
// // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // //         const module = course.modules.id(moduleId);
// // // // //         if (!module) return res.status(404).json({ error: 'Module not found' });
// // // // //         module.set(req.body);
// // // // //         await course.save();
// // // // //         res.json(course);
// // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // };

// // // // // export const addLesson = async (req: Request, res: Response) => {
// // // // //     try {
// // // // //         const { courseId, moduleId } = req.params;
// // // // //         const course = await Course.findById(courseId);
// // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // //         const module = course.modules.id(moduleId);
// // // // //         if (!module) return res.status(404).json({ error: 'Module not found' });
        
// // // // //         // Push req.body langsung agar semua field (termasuk meetingLink, points) tersimpan
// // // // //         module.lessons.push(req.body);
        
// // // // //         await course.save();
// // // // //         res.json(course);
// // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // };

// // // // // export const updateLesson = async (req: Request, res: Response) => {
// // // // //     try {
// // // // //         const { courseId, moduleId, lessonId } = req.params;
// // // // //         const course = await Course.findById(courseId);
// // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // //         const module = course.modules.id(moduleId);
// // // // //         if (!module) return res.status(404).json({ error: 'Module not found' });
// // // // //         const lesson = module.lessons.id(lessonId);
// // // // //         if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
        
// // // // //         // Update lesson set req.body agar field baru (meetingLink, points) terupdate
// // // // //         lesson.set(req.body);
        
// // // // //         await course.save();
// // // // //         res.json(course);
// // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // };

// // // // // export const deleteLesson = async (req: Request, res: Response) => {
// // // // //     try {
// // // // //         const { courseId, moduleId, lessonId } = req.params;
// // // // //         const course = await Course.findById(courseId);
// // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // //         const module = course.modules.id(moduleId);
// // // // //         if (module) {
// // // // //             module.lessons.pull({ _id: lessonId }); 
// // // // //             await course.save();
// // // // //         }
// // // // //         res.json(course);
// // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // };

// // // // // export const toggleStatus = async (req: Request, res: Response) => {
// // // // //     try {
// // // // //         const { id } = req.params;
// // // // //         const { moduleId, lessonId } = req.body;
// // // // //         const course = await Course.findById(id);
// // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });

// // // // //         if (moduleId && lessonId) {
// // // // //             const mod = course.modules.id(moduleId);
// // // // //             const les = mod?.lessons.id(lessonId);
// // // // //             if (les) les.isActive = !les.isActive;
// // // // //         } else if (moduleId) {
// // // // //             const mod = course.modules.id(moduleId);
// // // // //             if (mod) mod.isActive = !mod.isActive;
// // // // //         } else {
// // // // //             course.isPublished = !course.isPublished;
// // // // //         }
// // // // //         await course.save();
// // // // //         res.json(course);
// // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // };

// // // // // export const reorderModules = async (req: Request, res: Response) => {
// // // // //     try {
// // // // //         const { id } = req.params;
// // // // //         const { modules } = req.body;
// // // // //         await Course.findByIdAndUpdate(id, { modules });
// // // // //         res.json({ message: 'Urutan disimpan' });
// // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // };

// // // // // // [NEW] FUNGSI UPDATE GRADING SCHEME (BOBOT NILAI)
// // // // // export const updateGradingScheme = async (req: Request, res: Response) => {
// // // // //     try {
// // // // //         const { id } = req.params;
// // // // //         const { modules } = req.body; 

// // // // //         if (!modules) return res.status(400).json({ error: "Data modul diperlukan" });

// // // // //         const course = await Course.findByIdAndUpdate(id, { modules }, { new: true });
// // // // //         if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
        
// // // // //         res.json({ message: 'Skema penilaian berhasil disimpan', course });
// // // // //     } catch (error: any) {
// // // // //         res.status(500).json({ error: error.message });
// // // // //     }
// // // // // };

// // // // // // ==========================================
// // // // // // 3. ENROLLMENT & VERIFICATION (LOGIKA OTOMATIS vs MANUAL)
// // // // // // ==========================================

// // // // // export const enrollCourse = async (req: AuthedRequest, res: Response) => {
// // // // //     try {
// // // // //         const { courseId } = req.params; 
// // // // //         const userId = req.user?.id;
// // // // //         const { registrationData } = req.body; // Ambil data pendaftaran (termasuk file url)
        
// // // // //         if (!userId) return res.status(401).json({ error: 'Unauthorized' });

// // // // //         // 1. Cek Kursus & Mode Pendaftaran
// // // // //         const course = await Course.findById(courseId);
// // // // //         if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });

// // // // //         const existing = await Enrollment.findOne({ user: userId, course: courseId });
// // // // //         if (existing) return res.status(400).json({ error: 'Anda sudah mendaftar.' });

// // // // //         // 2. Tentukan Status Awal
// // // // //         // Jika mode 'automatic' -> status 'active' (langsung masuk)
// // // // //         // Jika mode 'manual' -> status 'pending' (tunggu admin)
// // // // //         let initialStatus = 'pending';
// // // // //         let joinedAtDate = undefined;

// // // // //         if (course.registrationMode === 'automatic') {
// // // // //             initialStatus = 'active';
// // // // //             joinedAtDate = new Date(); // Set tanggal join sekarang jika otomatis
// // // // //         }

// // // // //         const newEnrollment = new Enrollment({
// // // // //             user: userId,
// // // // //             course: courseId,
// // // // //             status: initialStatus, 
// // // // //             progress: 0,
// // // // //             isCompleted: false,
// // // // //             enrolledAt: new Date(),
// // // // //             joinedAt: joinedAtDate,
// // // // //             registrationData: registrationData || {} 
// // // // //         });

// // // // //         await newEnrollment.save();

// // // // //         const msg = course.registrationMode === 'automatic' 
// // // // //             ? 'Pendaftaran berhasil! Anda bisa langsung mulai belajar.' 
// // // // //             : 'Pendaftaran berhasil. Mohon tunggu verifikasi admin.';

// // // // //         res.status(201).json({ message: msg, enrollment: newEnrollment });
// // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // };

// // // // // export const verifyEnrollment = async (req: Request, res: Response) => {
// // // // //     try {
// // // // //         const { enrollmentId, action } = req.body; 

// // // // //         if (!enrollmentId || !action) return res.status(400).json({ error: "Data tidak lengkap" });

// // // // //         if (action === 'reject') {
// // // // //             await Enrollment.findByIdAndDelete(enrollmentId);
// // // // //             return res.json({ message: "Pendaftaran ditolak." });
// // // // //         }
// // // // //         if (action === 'approve') {
// // // // //             await Enrollment.findByIdAndUpdate(enrollmentId, { status: 'active', joinedAt: new Date() });
// // // // //             return res.json({ message: "Pendaftaran disetujui." });
// // // // //         }
// // // // //         res.status(400).json({ error: "Aksi tidak valid" });
// // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // };

// // // // // export const checkEnrollmentStatus = async (req: AuthedRequest, res: Response) => {
// // // // //     try {
// // // // //         const { courseId } = req.params;
// // // // //         const userId = req.user?.id;
        
// // // // //         if (!userId) return res.status(401).json({ error: 'Unauthorized' });

// // // // //         const enrollment = await Enrollment.findOne({ user: userId, course: courseId });
// // // // //         if (!enrollment) return res.json({ isEnrolled: false, status: null });

// // // // //         res.json({ isEnrolled: true, status: enrollment.status, progress: enrollment.progress });
// // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // };

// // // // // // ==========================================
// // // // // // 4. PARTICIPANT MANAGEMENT (REALTIME LOGIC)
// // // // // // ==========================================

// // // // // export const getCourseParticipants = async (req: Request, res: Response) => {
// // // // //   try {
// // // // //     res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
// // // // //     const { id } = req.params; 

// // // // //     // A. Ambil Data Enrollment (Termasuk status 'pending' & 'registrationData')
// // // // //     const enrollments = await Enrollment.find({ course: id })
// // // // //       .populate('user', 'name email avatarUrl role')
// // // // //       .sort({ createdAt: -1 })
// // // // //       .lean();

// // // // //     if (!enrollments.length) return res.json({ participants: [] });

// // // // //     // B. Ambil Progress User
// // // // //     const userIds = enrollments.map((e: any) => e.user?._id);
// // // // //     const progressRecords = await Progress.find({ courseId: id, userId: { $in: userIds } }).lean();

// // // // //     // C. Peta Struktur Course
// // // // //     const course: any = await Course.findById(id).select('modules').lean();
// // // // //     let totalLessons = 0;
// // // // //     const validLessonIds = new Set<string>();
// // // // //     const lessonMap = new Map();
// // // // //     const orderedLessonIds: string[] = [];

// // // // //     if (course && course.modules) {
// // // // //         course.modules.forEach((m: any) => {
// // // // //             if (m.isActive) {
// // // // //                 m.lessons.forEach((l: any) => { 
// // // // //                     if (l.isActive) {
// // // // //                         totalLessons++; 
// // // // //                         const lId = l._id.toString();
// // // // //                         validLessonIds.add(lId);
// // // // //                         orderedLessonIds.push(lId);
// // // // //                         lessonMap.set(lId, { lessonTitle: l.title, moduleTitle: m.title });
// // // // //                     }
// // // // //                 });
// // // // //             }
// // // // //         });
// // // // //     }

// // // // //     // D. Merge Data
// // // // //     const participants = await Promise.all(enrollments.map(async (enroll: any) => {
// // // // //         const userObj = enroll.user || {};
// // // // //         const detail = progressRecords.find((p: any) => p.userId.toString() === userObj._id?.toString());
        
// // // // //         let completedIds: string[] = [];
// // // // //         let calculatedProgress = 0;
// // // // //         let currentPosition = "Belum Memulai"; 

// // // // //         if ((enroll.status === 'active' || enroll.status === 'approved') && detail) {
// // // // //             const rawCompleted = detail.completedLessons.map((id: any) => id.toString());
// // // // //             completedIds = rawCompleted.filter((id) => validLessonIds.has(id));
            
// // // // //             if (totalLessons > 0) {
// // // // //                 calculatedProgress = Math.round((completedIds.length / totalLessons) * 100);
// // // // //             }
// // // // //             if (calculatedProgress > 100) calculatedProgress = 100;

// // // // //             const nextLessonId = orderedLessonIds.find(id => !completedIds.includes(id));
// // // // //             if (calculatedProgress === 100) {
// // // // //                 currentPosition = "✅ Selesai";
// // // // //             } else if (nextLessonId) {
// // // // //                 const info = lessonMap.get(nextLessonId);
// // // // //                 if (info) currentPosition = `Sedang: ${info.lessonTitle}`; 
// // // // //             }
// // // // //         }

// // // // //         if ((enroll.status === 'active' || enroll.status === 'approved') && enroll.progress !== calculatedProgress) {
// // // // //             await Enrollment.updateOne(
// // // // //                 { _id: enroll._id }, 
// // // // //                 { $set: { progress: calculatedProgress, isCompleted: calculatedProgress === 100 } }
// // // // //             );
// // // // //         }

// // // // //         return {
// // // // //             _id: enroll._id, 
// // // // //             user: {
// // // // //                 _id: userObj._id,
// // // // //                 name: userObj.name || enroll.registrationData?.fullName || 'Tanpa Nama',
// // // // //                 email: userObj.email || enroll.registrationData?.email || '-',
// // // // //                 avatarUrl: userObj.avatarUrl,
// // // // //                 role: userObj.role
// // // // //             },
// // // // //             // [IMPORTANT] Kirim data formulir pendaftaran ke frontend
// // // // //             registrationData: enroll.registrationData || {},
            
// // // // //             status: enroll.status || 'pending', 
// // // // //             joinedAt: enroll.createdAt,
// // // // //             progress: calculatedProgress, 
// // // // //             isCompleted: calculatedProgress === 100 || enroll.isCompleted,
// // // // //             completedLessons: completedIds, 
// // // // //             currentPosition: currentPosition, 
// // // // //             lessonDetails: detail ? detail.lessonDetails : []
// // // // //         };
// // // // //     }));

// // // // //     res.json({ participants });
// // // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // };

// // // // // // ==========================================
// // // // // // 5. ADMIN ACTIONS
// // // // // // ==========================================

// // // // // export const markCompleteLessonByAdmin = async (req: Request, res: Response) => {
// // // // //     try {
// // // // //         const { studentId, lessonId, courseId } = req.body;
// // // // //         let progress = await Progress.findOne({ userId: studentId, courseId });
// // // // //         if (!progress) progress = new Progress({ userId: studentId, courseId, completedLessons: [], lessonDetails: [] });

// // // // //         const strLessonId = lessonId.toString();
// // // // //         if (!progress.completedLessons.some((id: any) => id.toString() === strLessonId)) {
// // // // //             progress.completedLessons.push(lessonId);
// // // // //             await progress.save();
// // // // //         }

// // // // //         const course: any = await Course.findById(courseId).select('modules');
// // // // //         let totalLessons = 0;
// // // // //         if(course) course.modules.forEach((m:any) => { if(m.isActive) m.lessons.forEach((l:any) => { if(l.isActive) totalLessons++; }); });
        
// // // // //         let newProgress = 0;
// // // // //         if (totalLessons > 0) newProgress = Math.round((progress.completedLessons.length / totalLessons) * 100);
// // // // //         if (newProgress > 100) newProgress = 100;

// // // // //         await Enrollment.findOneAndUpdate(
// // // // //             { user: studentId, course: courseId }, 
// // // // //             { $set: { progress: newProgress, isCompleted: newProgress === 100, completedAt: newProgress === 100 ? new Date() : null } }
// // // // //         );

// // // // //         res.json({ message: 'Berhasil diluluskan', progress: newProgress });
// // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // };

// // // // // export const resetQuizByAdmin = async (req: Request, res: Response) => {
// // // // //     try {
// // // // //         const { studentId, quizId } = req.body; 
// // // // //         if (!studentId || !quizId) return res.status(400).json({ error: "Data incomplete" });

// // // // //         let progressDoc = await Progress.findOne({ userId: studentId, completedLessons: new mongoose.Types.ObjectId(quizId) });

// // // // //         if (progressDoc) {
// // // // //             progressDoc.completedLessons = progressDoc.completedLessons.filter((id: any) => id.toString() !== quizId);
// // // // //             if (progressDoc.lessonDetails) {
// // // // //                 progressDoc.lessonDetails = progressDoc.lessonDetails.filter((d: any) => d.lessonId && d.lessonId.toString() !== quizId);
// // // // //             }
// // // // //             if (progressDoc.quizScores) {
// // // // //                 progressDoc.quizScores = progressDoc.quizScores.filter((s: any) => s.lessonId && s.lessonId.toString() !== quizId);
// // // // //             }
// // // // //             progressDoc.isCompleted = false; 
// // // // //             await progressDoc.save();

// // // // //             const courseId = progressDoc.courseId;
// // // // //             const courseData: any = await Course.findById(courseId).select('modules');
// // // // //             let totalLessons = 0;
// // // // //             if (courseData) {
// // // // //                 courseData.modules.forEach((m: any) => {
// // // // //                     if (m.isActive) m.lessons.forEach((l: any) => { if (l.isActive) totalLessons++; });
// // // // //                 });
// // // // //             }
// // // // //             let newProgress = 0;
// // // // //             if (totalLessons > 0) newProgress = Math.round((progressDoc.completedLessons.length / totalLessons) * 100);
// // // // //             if (newProgress > 100) newProgress = 100;

// // // // //             await Enrollment.findOneAndUpdate(
// // // // //                 { user: studentId, course: courseId },
// // // // //                 { $set: { progress: newProgress, isCompleted: newProgress === 100, completedAt: newProgress === 100 ? new Date() : null } }
// // // // //             );
// // // // //         }
// // // // //         res.json({ message: 'Reset berhasil & Progress dihitung ulang' });
// // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // };

// // // // // // ==========================================
// // // // // // 6. GROUP CHAT FEATURES
// // // // // // ==========================================

// // // // // export const getGroupMessages = async (req: AuthedRequest, res: Response) => {
// // // // //     try {
// // // // //         const { id } = req.params; 
// // // // //         const { type } = req.query; 
// // // // //         const userId = req.user?.id;

// // // // //         const course = await Course.findById(id);
// // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });

// // // // //         const isFacilitator = course.facilitatorIds.map((f: any) => f.toString()).includes(userId) || req.user?.role === 'SUPER_ADMIN';
// // // // //         const enrollment = await Enrollment.findOne({ course: id, user: userId, status: { $in: ['active', 'approved'] } });
// // // // //         const isStudent = !!enrollment;

// // // // //         if (type === 'internal' && !isFacilitator) return res.status(403).json({ error: 'Akses ditolak.' });
// // // // //         if (type === 'public' && !isFacilitator && !isStudent) return res.status(403).json({ error: 'Akses ditolak.' });

// // // // //         const query: any = { course: id, type: type || 'public' };
// // // // //         const messages = await Message.find(query)
// // // // //             .populate('sender', 'name avatarUrl role')
// // // // //             .sort({ createdAt: 1 });

// // // // //         res.json(messages);
// // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // };

// // // // // export const sendGroupMessage = async (req: AuthedRequest, res: Response) => {
// // // // //     try {
// // // // //         const { id } = req.params; 
// // // // //         const { text, type, attachment } = req.body; 
// // // // //         const userId = req.user?.id;

// // // // //         const course = await Course.findById(id);
// // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });

// // // // //         const isFacilitator = course.facilitatorIds.map((f: any) => f.toString()).includes(userId) || req.user?.role === 'SUPER_ADMIN';
        
// // // // //         if (type === 'internal' && !isFacilitator) return res.status(403).json({ error: 'Hanya Tim Fasilitator.' });

// // // // //         if (type === 'public') {
// // // // //             const enrollment = await Enrollment.findOne({ course: id, user: userId, status: { $in: ['active', 'approved'] } });
// // // // //             if (!isFacilitator && !enrollment) return res.status(403).json({ error: 'Akses dilarang.' });
// // // // //         }

// // // // //         const newMessage = new Message({
// // // // //             course: id,
// // // // //             sender: userId,
// // // // //             message: text || '', 
// // // // //             type: type || 'public',
// // // // //             isRead: false,
// // // // //             isGlobal: false,
// // // // //             attachment: attachment || null 
// // // // //         });

// // // // //         await newMessage.save();
// // // // //         const populatedMsg = await newMessage.populate('sender', 'name avatarUrl role');
        
// // // // //         res.status(201).json(populatedMsg);
// // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // };

// // // // import { Request, Response } from 'express';
// // // // import { Course } from '../models/Course';
// // // // import Enrollment from '../models/Enrollment';
// // // // import { Progress } from '../models/Progress';
// // // // import { Message } from '../models/Message'; 
// // // // import { AuthedRequest } from '../middleware/auth'; 
// // // // import mongoose from 'mongoose';

// // // // // ==========================================
// // // // // 1. STANDARD CRUD COURSE
// // // // // ==========================================

// // // // export const createCourse = async (req: Request, res: Response) => {
// // // //   try {
// // // //     const course = new Course(req.body);
// // // //     await course.save();
// // // //     res.status(201).json(course);
// // // //   } catch (error: any) {
// // // //     res.status(400).json({ error: error.message });
// // // //   }
// // // // };

// // // // export const getCourses = async (req: Request, res: Response) => {
// // // //   try {
// // // //     // [RESTORED] Menggunakan facilitatorIds (bukan facilitator singular)
// // // //     const courses = await Course.find()
// // // //       .populate('facilitatorIds', 'name email avatarUrl role') 
// // // //       .sort({ createdAt: -1 });
// // // //     res.json({ courses }); 
// // // //   } catch (error: any) {
// // // //     res.status(500).json({ error: error.message });
// // // //   }
// // // // };

// // // // // [CRITICAL RESTORE] Logic Detail Pelatihan yang Hilang
// // // // export const getCourseById = async (req: Request, res: Response) => {
// // // //   try {
// // // //     const course = await Course.findById(req.params.id)
// // // //       .populate('facilitatorIds', 'name email avatarUrl role bio') // Populate Facilitator
// // // //       // [FIX] Tambahkan populate modules jika schema Anda memisahkan modules
// // // //       // Jika modules embedded (menyatu), baris ini aman dan tidak error
// // // //       .populate({
// // // //           path: 'modules',
// // // //           populate: { path: 'lessons' }
// // // //       });

// // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // // //     res.json(course);
// // // //   } catch (error: any) {
// // // //     res.status(500).json({ error: error.message });
// // // //   }
// // // // };

// // // // export const updateCourse = async (req: Request, res: Response) => {
// // // //   try {
// // // //     const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
// // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // // //     res.json(course);
// // // //   } catch (error: any) {
// // // //     res.status(400).json({ error: error.message });
// // // //   }
// // // // };

// // // // export const deleteCourse = async (req: Request, res: Response) => {
// // // //   try {
// // // //     const course = await Course.findByIdAndDelete(req.params.id);
// // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
    
// // // //     await Enrollment.deleteMany({ course: req.params.id });
// // // //     await Progress.deleteMany({ courseId: req.params.id });
    
// // // //     res.json({ message: 'Kursus berhasil dihapus' });
// // // //   } catch (error: any) {
// // // //     res.status(500).json({ error: error.message });
// // // //   }
// // // // };

// // // // // ==========================================
// // // // // 2. MODULE & LESSON MANAGEMENT (RESTORED)
// // // // // ==========================================

// // // // export const addModule = async (req: Request, res: Response) => {
// // // //     try {
// // // //         const { id } = req.params;
// // // //         const course = await Course.findById(id);
// // // //         if (!course) return res.status(404).json({ error: 'Course not found' });
// // // //         course.modules.push(req.body);
// // // //         await course.save();
// // // //         res.json(course);
// // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // };

// // // // export const updateModule = async (req: Request, res: Response) => {
// // // //     try {
// // // //         const { courseId, moduleId } = req.params;
// // // //         const cId = courseId || req.params.id; // Handle variasi parameter route
// // // //         const course = await Course.findById(cId);
// // // //         if (!course) return res.status(404).json({ error: 'Course not found' });
        
// // // //         const module = course.modules.id(moduleId);
// // // //         if (!module) return res.status(404).json({ error: 'Module not found' });
// // // //         module.set(req.body);
// // // //         await course.save();
// // // //         res.json(course);
// // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // };

// // // // export const addLesson = async (req: Request, res: Response) => {
// // // //     try {
// // // //         const { courseId, moduleId } = req.params;
// // // //         const course = await Course.findById(courseId);
// // // //         if (!course) return res.status(404).json({ error: 'Course not found' });
        
// // // //         const module = course.modules.id(moduleId);
// // // //         if (!module) return res.status(404).json({ error: 'Module not found' });
        
// // // //         module.lessons.push(req.body);
// // // //         await course.save();
// // // //         res.json(course);
// // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // };

// // // // export const updateLesson = async (req: Request, res: Response) => {
// // // //     try {
// // // //         const { courseId, moduleId, lessonId } = req.params;
// // // //         const course = await Course.findById(courseId);
// // // //         if (!course) return res.status(404).json({ error: 'Course not found' });
        
// // // //         const module = course.modules.id(moduleId);
// // // //         if (!module) return res.status(404).json({ error: 'Module not found' });
        
// // // //         const lesson = module.lessons.id(lessonId);
// // // //         if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
        
// // // //         lesson.set(req.body);
// // // //         await course.save();
// // // //         res.json(course);
// // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // };

// // // // export const deleteLesson = async (req: Request, res: Response) => {
// // // //     try {
// // // //         const { courseId, moduleId, lessonId } = req.params;
// // // //         const course = await Course.findById(courseId);
// // // //         if (!course) return res.status(404).json({ error: 'Course not found' });
        
// // // //         const module = course.modules.id(moduleId);
// // // //         if (module) {
// // // //             module.lessons.pull({ _id: lessonId }); 
// // // //             await course.save();
// // // //         }
// // // //         res.json(course);
// // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // };

// // // // export const toggleStatus = async (req: Request, res: Response) => {
// // // //     try {
// // // //         const { id } = req.params;
// // // //         const { moduleId, lessonId } = req.body;
// // // //         const course = await Course.findById(id);
// // // //         if (!course) return res.status(404).json({ error: 'Course not found' });

// // // //         if (moduleId && lessonId) {
// // // //             const mod = course.modules.id(moduleId);
// // // //             const les = mod?.lessons.id(lessonId);
// // // //             if (les) les.isActive = !les.isActive;
// // // //         } else if (moduleId) {
// // // //             const mod = course.modules.id(moduleId);
// // // //             if (mod) mod.isActive = !mod.isActive;
// // // //         } else {
// // // //             course.isPublished = !course.isPublished;
// // // //         }
// // // //         await course.save();
// // // //         res.json(course);
// // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // };

// // // // export const reorderModules = async (req: Request, res: Response) => {
// // // //     try {
// // // //         const { id } = req.params;
// // // //         const { modules } = req.body;
// // // //         await Course.findByIdAndUpdate(id, { modules });
// // // //         res.json({ message: 'Urutan disimpan' });
// // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // };

// // // // // [NEW] FUNGSI UPDATE GRADING SCHEME
// // // // export const updateGradingScheme = async (req: Request, res: Response) => {
// // // //     try {
// // // //         const { id } = req.params;
// // // //         const { modules } = req.body; 
// // // //         if (!modules) return res.status(400).json({ error: "Data modul diperlukan" });

// // // //         const course = await Course.findByIdAndUpdate(id, { modules }, { new: true });
// // // //         if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
        
// // // //         res.json({ message: 'Skema penilaian berhasil disimpan', course });
// // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // };

// // // // // ==========================================
// // // // // 3. ENROLLMENT & VERIFICATION
// // // // // ==========================================

// // // // export const enrollCourse = async (req: AuthedRequest, res: Response) => {
// // // //     try {
// // // //         const { courseId } = req.params; 
// // // //         const userId = req.user?.id;
// // // //         const { registrationData } = req.body;
        
// // // //         if (!userId) return res.status(401).json({ error: 'Unauthorized' });

// // // //         const course = await Course.findById(courseId);
// // // //         if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });

// // // //         const existing = await Enrollment.findOne({ user: userId, course: courseId });
// // // //         if (existing) return res.status(400).json({ error: 'Anda sudah mendaftar.' });

// // // //         let initialStatus = 'pending';
// // // //         let joinedAtDate = undefined;

// // // //         if (course.registrationMode === 'automatic') {
// // // //             initialStatus = 'active';
// // // //             joinedAtDate = new Date();
// // // //         }

// // // //         const newEnrollment = new Enrollment({
// // // //             user: userId,
// // // //             course: courseId,
// // // //             status: initialStatus, 
// // // //             progress: 0,
// // // //             isCompleted: false,
// // // //             enrolledAt: new Date(),
// // // //             joinedAt: joinedAtDate,
// // // //             registrationData: registrationData || {} 
// // // //         });

// // // //         await newEnrollment.save();
// // // //         const msg = course.registrationMode === 'automatic' ? 'Pendaftaran berhasil! Mulai belajar.' : 'Pendaftaran berhasil. Tunggu verifikasi.';
// // // //         res.status(201).json({ message: msg, enrollment: newEnrollment });
// // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // };

// // // // export const verifyEnrollment = async (req: Request, res: Response) => {
// // // //     try {
// // // //         const { enrollmentId, action } = req.body; 
// // // //         if (action === 'reject') {
// // // //             await Enrollment.findByIdAndDelete(enrollmentId);
// // // //             return res.json({ message: "Pendaftaran ditolak." });
// // // //         }
// // // //         if (action === 'approve') {
// // // //             await Enrollment.findByIdAndUpdate(enrollmentId, { status: 'active', joinedAt: new Date() });
// // // //             return res.json({ message: "Pendaftaran disetujui." });
// // // //         }
// // // //         res.status(400).json({ error: "Aksi tidak valid" });
// // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // };

// // // // export const checkEnrollmentStatus = async (req: AuthedRequest, res: Response) => {
// // // //     try {
// // // //         const { courseId } = req.params;
// // // //         const userId = req.user?.id;
// // // //         if (!userId) return res.status(401).json({ error: 'Unauthorized' });
// // // //         const enrollment = await Enrollment.findOne({ user: userId, course: courseId });
// // // //         if (!enrollment) return res.json({ isEnrolled: false, status: null });
// // // //         res.json({ isEnrolled: true, status: enrollment.status, progress: enrollment.progress });
// // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // };

// // // // // ==========================================
// // // // // 4. PARTICIPANT MANAGEMENT (RESTORED LOGIC)
// // // // // ==========================================

// // // // export const getCourseParticipants = async (req: Request, res: Response) => {
// // // //   try {
// // // //     res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
// // // //     const { id } = req.params; 

// // // //     // A. Ambil Data Enrollment
// // // //     const enrollments = await Enrollment.find({ course: id })
// // // //       .populate('user', 'name email avatarUrl role')
// // // //       .sort({ createdAt: -1 })
// // // //       .lean();

// // // //     if (!enrollments.length) return res.json({ participants: [] });

// // // //     // B. Ambil Progress User
// // // //     const userIds = enrollments.map((e: any) => e.user?._id);
// // // //     const progressRecords = await Progress.find({ courseId: id, userId: { $in: userIds } }).lean();

// // // //     // C. Peta Struktur Course
// // // //     const course: any = await Course.findById(id).select('modules').lean();
// // // //     let totalLessons = 0;
// // // //     const validLessonIds = new Set<string>();
// // // //     const orderedLessonIds: string[] = [];

// // // //     if (course && course.modules) {
// // // //         course.modules.forEach((m: any) => {
// // // //             if (m.isActive) {
// // // //                 m.lessons.forEach((l: any) => { 
// // // //                     if (l.isActive) {
// // // //                         totalLessons++; 
// // // //                         const lId = l._id.toString();
// // // //                         validLessonIds.add(lId);
// // // //                         orderedLessonIds.push(lId);
// // // //                     }
// // // //                 });
// // // //             }
// // // //         });
// // // //     }

// // // //     // D. Merge Data
// // // //     const participants = await Promise.all(enrollments.map(async (enroll: any) => {
// // // //         const userObj = enroll.user || {};
// // // //         const detail = progressRecords.find((p: any) => p.userId.toString() === userObj._id?.toString());
        
// // // //         let completedIds: string[] = [];
// // // //         let calculatedProgress = 0;

// // // //         if ((enroll.status === 'active' || enroll.status === 'approved') && detail) {
// // // //             const rawCompleted = detail.completedLessons.map((id: any) => id.toString());
// // // //             completedIds = rawCompleted.filter((id) => validLessonIds.has(id));
// // // //             if (totalLessons > 0) calculatedProgress = Math.round((completedIds.length / totalLessons) * 100);
// // // //             if (calculatedProgress > 100) calculatedProgress = 100;
// // // //         }

// // // //         return {
// // // //             _id: enroll._id, 
// // // //             user: { _id: userObj._id, name: userObj.name, email: userObj.email, avatarUrl: userObj.avatarUrl, role: userObj.role },
// // // //             registrationData: enroll.registrationData || {},
// // // //             status: enroll.status || 'pending', 
// // // //             progress: calculatedProgress, 
// // // //             completedLessons: completedIds, 
// // // //             lessonDetails: detail ? detail.lessonDetails : []
// // // //         };
// // // //     }));

// // // //     res.json({ participants });
// // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // };

// // // // // ==========================================
// // // // // 5. ADMIN & CHAT
// // // // // ==========================================

// // // // export const markCompleteLessonByAdmin = async (req: Request, res: Response) => {
// // // //     try {
// // // //         const { studentId, lessonId, courseId } = req.body;
// // // //         let progress = await Progress.findOne({ userId: studentId, courseId });
// // // //         if (!progress) progress = new Progress({ userId: studentId, courseId, completedLessons: [] });

// // // //         const strLessonId = lessonId.toString();
// // // //         if (!progress.completedLessons.some((id: any) => id.toString() === strLessonId)) {
// // // //             progress.completedLessons.push(lessonId);
// // // //             await progress.save();
// // // //         }
// // // //         res.json({ message: 'Berhasil diluluskan' });
// // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // };

// // // // export const resetQuizByAdmin = async (req: Request, res: Response) => {
// // // //     try {
// // // //         const { studentId, quizId } = req.body; 
// // // //         if (!studentId || !quizId) return res.status(400).json({ error: "Data incomplete" });
// // // //         await Progress.findOneAndUpdate({ userId: studentId }, { $pull: { completedLessons: quizId } });
// // // //         res.json({ message: 'Reset berhasil' });
// // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // };

// // // // export const getGroupMessages = async (req: AuthedRequest, res: Response) => {
// // // //     try {
// // // //         const { id } = req.params; 
// // // //         const { type } = req.query; 
// // // //         const query: any = { course: id, type: type || 'public' };
// // // //         const messages = await Message.find(query).populate('sender', 'name avatarUrl role').sort({ createdAt: 1 });
// // // //         res.json(messages);
// // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // };

// // // // export const sendGroupMessage = async (req: AuthedRequest, res: Response) => {
// // // //     try {
// // // //         const { id } = req.params; 
// // // //         const { text, type, attachment } = req.body; 
// // // //         const userId = req.user?.id;
// // // //         const newMessage = new Message({
// // // //             course: id, sender: userId, message: text || '', type: type || 'public',
// // // //             isRead: false, isGlobal: false, attachment: attachment || null 
// // // //         });
// // // //         await newMessage.save();
// // // //         await newMessage.populate('sender', 'name avatarUrl role');
// // // //         res.status(201).json(newMessage);
// // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // };

// // // import { Request, Response } from 'express';
// // // import { Course } from '../models/Course';
// // // import { Enrollment } from '../models/Enrollment'; // Pastikan path import benar
// // // import { Progress } from '../models/Progress';
// // // import { Message } from '../models/Message'; 
// // // import { AuthedRequest } from '../middleware/auth'; 
// // // import mongoose from 'mongoose';

// // // // ==========================================
// // // // 1. STANDARD CRUD COURSE
// // // // ==========================================

// // // export const createCourse = async (req: Request, res: Response) => {
// // //   try {
// // //     const course = new Course(req.body);
// // //     await course.save();
// // //     res.status(201).json(course);
// // //   } catch (error: any) {
// // //     res.status(400).json({ error: error.message });
// // //   }
// // // };

// // // export const getCourses = async (req: Request, res: Response) => {
// // //   try {
// // //     const courses = await Course.find()
// // //       .populate('facilitatorIds', 'name email avatarUrl role') 
// // //       .sort({ createdAt: -1 });
// // //     res.json({ courses }); 
// // //   } catch (error: any) {
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // };

// // // // [CRITICAL] Mengambil Detail Course Termasuk Template
// // // export const getCourseById = async (req: Request, res: Response) => {
// // //   try {
// // //     const course = await Course.findById(req.params.id)
// // //       .populate('facilitatorIds', 'name email avatarUrl role bio') 
// // //       .populate({
// // //           path: 'modules',
// // //           populate: { path: 'lessons' }
// // //       });
// // //       // CATATAN: Saya tidak menggunakan .lean() agar virtuals tetap jalan jika ada.
// // //       // registrationTemplates ada di root object, jadi otomatis terambil oleh Mongoose.

// // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // //     res.json(course);
// // //   } catch (error: any) {
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // };

// // // export const updateCourse = async (req: Request, res: Response) => {
// // //   try {
// // //     // { new: true } memastikan data yang dikembalikan adalah yang terbaru setelah edit
// // //     const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
// // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // //     res.json(course);
// // //   } catch (error: any) {
// // //     res.status(400).json({ error: error.message });
// // //   }
// // // };

// // // export const deleteCourse = async (req: Request, res: Response) => {
// // //   try {
// // //     const course = await Course.findByIdAndDelete(req.params.id);
// // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
    
// // //     // Hapus data terkait agar database bersih
// // //     await Enrollment.deleteMany({ course: req.params.id });
// // //     await Progress.deleteMany({ courseId: req.params.id });
    
// // //     res.json({ message: 'Kursus berhasil dihapus' });
// // //   } catch (error: any) {
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // };

// // // // ==========================================
// // // // 2. MODULE & LESSON MANAGEMENT
// // // // ==========================================

// // // export const addModule = async (req: Request, res: Response) => {
// // //     try {
// // //         const { id } = req.params;
// // //         const course = await Course.findById(id);
// // //         if (!course) return res.status(404).json({ error: 'Course not found' });
// // //         course.modules.push(req.body);
// // //         await course.save();
// // //         res.json(course);
// // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // };

// // // export const updateModule = async (req: Request, res: Response) => {
// // //     try {
// // //         const { courseId, moduleId } = req.params;
// // //         const cId = courseId || req.params.id; 
// // //         const course = await Course.findById(cId);
// // //         if (!course) return res.status(404).json({ error: 'Course not found' });
        
// // //         const module = course.modules.id(moduleId);
// // //         if (!module) return res.status(404).json({ error: 'Module not found' });
// // //         module.set(req.body);
// // //         await course.save();
// // //         res.json(course);
// // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // };

// // // export const addLesson = async (req: Request, res: Response) => {
// // //     try {
// // //         const { courseId, moduleId } = req.params;
// // //         const course = await Course.findById(courseId);
// // //         if (!course) return res.status(404).json({ error: 'Course not found' });
        
// // //         const module = course.modules.id(moduleId);
// // //         if (!module) return res.status(404).json({ error: 'Module not found' });
        
// // //         module.lessons.push(req.body);
// // //         await course.save();
// // //         res.json(course);
// // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // };

// // // export const updateLesson = async (req: Request, res: Response) => {
// // //     try {
// // //         const { courseId, moduleId, lessonId } = req.params;
// // //         const course = await Course.findById(courseId);
// // //         if (!course) return res.status(404).json({ error: 'Course not found' });
        
// // //         const module = course.modules.id(moduleId);
// // //         if (!module) return res.status(404).json({ error: 'Module not found' });
        
// // //         const lesson = module.lessons.id(lessonId);
// // //         if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
        
// // //         lesson.set(req.body);
// // //         await course.save();
// // //         res.json(course);
// // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // };

// // // export const deleteLesson = async (req: Request, res: Response) => {
// // //     try {
// // //         const { courseId, moduleId, lessonId } = req.params;
// // //         const course = await Course.findById(courseId);
// // //         if (!course) return res.status(404).json({ error: 'Course not found' });
        
// // //         const module = course.modules.id(moduleId);
// // //         if (module) {
// // //             module.lessons.pull({ _id: lessonId }); 
// // //             await course.save();
// // //         }
// // //         res.json(course);
// // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // };

// // // export const toggleStatus = async (req: Request, res: Response) => {
// // //     try {
// // //         const { id } = req.params;
// // //         const { moduleId, lessonId } = req.body;
// // //         const course = await Course.findById(id);
// // //         if (!course) return res.status(404).json({ error: 'Course not found' });

// // //         if (moduleId && lessonId) {
// // //             const mod = course.modules.id(moduleId);
// // //             const les = mod?.lessons.id(lessonId);
// // //             if (les) les.isActive = !les.isActive;
// // //         } else if (moduleId) {
// // //             const mod = course.modules.id(moduleId);
// // //             if (mod) mod.isActive = !mod.isActive;
// // //         } else {
// // //             course.isPublished = !course.isPublished;
// // //         }
// // //         await course.save();
// // //         res.json(course);
// // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // };

// // // export const reorderModules = async (req: Request, res: Response) => {
// // //     try {
// // //         const { id } = req.params;
// // //         const { modules } = req.body;
// // //         await Course.findByIdAndUpdate(id, { modules });
// // //         res.json({ message: 'Urutan disimpan' });
// // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // };

// // // export const updateGradingScheme = async (req: Request, res: Response) => {
// // //     try {
// // //         const { id } = req.params;
// // //         const { modules } = req.body; 
// // //         if (!modules) return res.status(400).json({ error: "Data modul diperlukan" });

// // //         const course = await Course.findByIdAndUpdate(id, { modules }, { new: true });
// // //         if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
        
// // //         res.json({ message: 'Skema penilaian berhasil disimpan', course });
// // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // };

// // // // ==========================================
// // // // 3. ENROLLMENT & VERIFICATION
// // // // ==========================================

// // // export const enrollCourse = async (req: AuthedRequest, res: Response) => {
// // //     try {
// // //         const { courseId } = req.params; 
// // //         const userId = req.user?.id;
// // //         const { registrationData } = req.body; // Data dari Form Modal Frontend
        
// // //         if (!userId) return res.status(401).json({ error: 'Unauthorized' });

// // //         const course = await Course.findById(courseId);
// // //         if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });

// // //         const existing = await Enrollment.findOne({ user: userId, course: courseId });
// // //         if (existing) return res.status(400).json({ error: 'Anda sudah mendaftar.' });

// // //         let initialStatus = 'pending';
// // //         let joinedAtDate = undefined;

// // //         // Logika Mode Pendaftaran
// // //         if (course.registrationMode === 'automatic') {
// // //             initialStatus = 'active';
// // //             joinedAtDate = new Date();
// // //         }

// // //         const newEnrollment = new Enrollment({
// // //             user: userId,
// // //             course: courseId,
// // //             status: initialStatus, 
// // //             progress: 0,
// // //             isCompleted: false,
// // //             enrolledAt: new Date(),
// // //             joinedAt: joinedAtDate,
// // //             registrationData: registrationData || {} 
// // //         });

// // //         await newEnrollment.save();
        
// // //         const msg = course.registrationMode === 'automatic' 
// // //             ? 'Pendaftaran berhasil! Mulai belajar.' 
// // //             : 'Pendaftaran berhasil. Tunggu verifikasi.';
            
// // //         res.status(201).json({ message: msg, enrollment: newEnrollment });
// // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // };

// // // export const verifyEnrollment = async (req: Request, res: Response) => {
// // //     try {
// // //         const { enrollmentId, action } = req.body; 
// // //         if (action === 'reject') {
// // //             await Enrollment.findByIdAndDelete(enrollmentId);
// // //             return res.json({ message: "Pendaftaran ditolak." });
// // //         }
// // //         if (action === 'approve') {
// // //             await Enrollment.findByIdAndUpdate(enrollmentId, { status: 'active', joinedAt: new Date() });
// // //             return res.json({ message: "Pendaftaran disetujui." });
// // //         }
// // //         res.status(400).json({ error: "Aksi tidak valid" });
// // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // };

// // // export const checkEnrollmentStatus = async (req: AuthedRequest, res: Response) => {
// // //     try {
// // //         const { courseId } = req.params;
// // //         const userId = req.user?.id;
// // //         if (!userId) return res.status(401).json({ error: 'Unauthorized' });
// // //         const enrollment = await Enrollment.findOne({ user: userId, course: courseId });
// // //         if (!enrollment) return res.json({ isEnrolled: false, status: null });
// // //         res.json({ isEnrolled: true, status: enrollment.status, progress: enrollment.progress });
// // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // };

// // // // ==========================================
// // // // 4. PARTICIPANT MANAGEMENT
// // // // ==========================================

// // // export const getCourseParticipants = async (req: Request, res: Response) => {
// // //   try {
// // //     res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
// // //     const { id } = req.params; 

// // //     // A. Ambil Data Enrollment
// // //     const enrollments = await Enrollment.find({ course: id })
// // //       .populate('user', 'name email avatarUrl role')
// // //       .sort({ createdAt: -1 })
// // //       .lean();

// // //     if (!enrollments.length) return res.json({ participants: [] });

// // //     // B. Ambil Progress User
// // //     const userIds = enrollments.map((e: any) => e.user?._id);
// // //     const progressRecords = await Progress.find({ courseId: id, userId: { $in: userIds } }).lean();

// // //     // C. Peta Struktur Course untuk hitung progress
// // //     const course: any = await Course.findById(id).select('modules').lean();
// // //     let totalLessons = 0;
// // //     const validLessonIds = new Set<string>();

// // //     if (course && course.modules) {
// // //         course.modules.forEach((m: any) => {
// // //             if (m.isActive) {
// // //                 m.lessons.forEach((l: any) => { 
// // //                     if (l.isActive) {
// // //                         totalLessons++; 
// // //                         validLessonIds.add(l._id.toString());
// // //                     }
// // //                 });
// // //             }
// // //         });
// // //     }

// // //     // D. Merge Data
// // //     const participants = await Promise.all(enrollments.map(async (enroll: any) => {
// // //         const userObj = enroll.user || {};
// // //         const detail = progressRecords.find((p: any) => p.userId.toString() === userObj._id?.toString());
        
// // //         let calculatedProgress = 0;
// // //         let completedIds: string[] = [];

// // //         if ((enroll.status === 'active' || enroll.status === 'approved') && detail) {
// // //             const rawCompleted = detail.completedLessons.map((id: any) => id.toString());
// // //             completedIds = rawCompleted.filter((id) => validLessonIds.has(id));
// // //             if (totalLessons > 0) calculatedProgress = Math.round((completedIds.length / totalLessons) * 100);
// // //             if (calculatedProgress > 100) calculatedProgress = 100;
// // //         }

// // //         return {
// // //             _id: enroll._id, 
// // //             user: { _id: userObj._id, name: userObj.name, email: userObj.email, avatarUrl: userObj.avatarUrl, role: userObj.role },
// // //             registrationData: enroll.registrationData || {},
// // //             status: enroll.status || 'pending', 
// // //             progress: calculatedProgress, 
// // //             completedLessons: completedIds, 
// // //             lessonDetails: detail ? detail.lessonDetails : []
// // //         };
// // //     }));

// // //     res.json({ participants });
// // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // };

// // // // ==========================================
// // // // 5. ADMIN & CHAT
// // // // ==========================================

// // // export const markCompleteLessonByAdmin = async (req: Request, res: Response) => {
// // //     try {
// // //         const { studentId, lessonId, courseId } = req.body;
// // //         let progress = await Progress.findOne({ userId: studentId, courseId });
// // //         if (!progress) progress = new Progress({ userId: studentId, courseId, completedLessons: [] });

// // //         const strLessonId = lessonId.toString();
// // //         if (!progress.completedLessons.some((id: any) => id.toString() === strLessonId)) {
// // //             progress.completedLessons.push(lessonId);
// // //             await progress.save();
// // //         }
// // //         res.json({ message: 'Berhasil diluluskan' });
// // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // };

// // // export const resetQuizByAdmin = async (req: Request, res: Response) => {
// // //     try {
// // //         const { studentId, quizId } = req.body; 
// // //         if (!studentId || !quizId) return res.status(400).json({ error: "Data incomplete" });
// // //         await Progress.findOneAndUpdate({ userId: studentId }, { $pull: { completedLessons: quizId } });
// // //         res.json({ message: 'Reset berhasil' });
// // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // };

// // // export const getGroupMessages = async (req: AuthedRequest, res: Response) => {
// // //     try {
// // //         const { id } = req.params; 
// // //         const { type } = req.query; 
// // //         const query: any = { course: id, type: type || 'public' };
// // //         const messages = await Message.find(query).populate('sender', 'name avatarUrl role').sort({ createdAt: 1 });
// // //         res.json(messages);
// // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // };

// // // export const sendGroupMessage = async (req: AuthedRequest, res: Response) => {
// // //     try {
// // //         const { id } = req.params; 
// // //         const { text, type, attachment } = req.body; 
// // //         const userId = req.user?.id;
// // //         const newMessage = new Message({
// // //             course: id, sender: userId, message: text || '', type: type || 'public',
// // //             isRead: false, isGlobal: false, attachment: attachment || null 
// // //         });
// // //         await newMessage.save();
// // //         await newMessage.populate('sender', 'name avatarUrl role');
// // //         res.status(201).json(newMessage);
// // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // };

// // import { Request, Response } from 'express';
// // import { Course } from '../models/Course';
// // import { Enrollment } from '../models/Enrollment';

// // // --- 1. PUBLIC / GENERAL ---

// // // Get All Courses (Dengan Filter)
// // export const getCourses = async (req: Request, res: Response) => {
// //     try {
// //         const { search, category, level } = req.query;
// //         const filter: any = {};

// //         // Default: Admin bisa lihat semua, tapi untuk endpoint public biasanya difilter isPublished=true
// //         // Jika ingin membedakan view admin vs public, bisa cek req.user (jika ada)
// //         // filter.isPublished = true; 

// //         if (search) {
// //             filter.title = { $regex: search, $options: 'i' };
// //         }
// //         if (category && category !== 'Semua') {
// //             filter.category = category;
// //         }
// //         if (level && level !== 'Semua') {
// //             filter.level = level;
// //         }

// //         const courses = await Course.find(filter)
// //             .select('title slug thumbnailUrl category level price rating reviewsCount totalJp isPublished facilitatorIds')
// //             .populate('facilitatorIds', 'name') // Optional: tampilkan nama fasilitator
// //             .sort({ createdAt: -1 });
            
// //         res.json({ courses });
// //     } catch (error: any) {
// //         res.status(500).json({ error: error.message });
// //     }
// // };

// // // Get Single Course Detail
// // export const getCourseById = async (req: Request, res: Response) => {
// //     try {
// //         const { id } = req.params;
// //         const course = await Course.findById(id)
// //             .populate('facilitatorIds', 'name avatarUrl role')
// //             .populate('modules.facilitatorId', 'name');

// //         if (!course) {
// //             return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// //         }
// //         res.json({ course });
// //     } catch (error: any) {
// //         res.status(500).json({ error: error.message });
// //     }
// // };

// // // --- 2. COURSE MANAGEMENT (Admin / Facilitator) ---

// // // Create Course
// // export const createCourse = async (req: any, res: Response) => {
// //     try {
// //         // Otomatis jadikan pembuat sebagai fasilitator pertama
// //         const newCourse = await Course.create({
// //             ...req.body,
// //             facilitatorIds: [req.user.id],
// //             creatorInfo: {
// //                 name: req.user.name,
// //                 email: req.user.email,
// //                 contact: req.user.phone || '-'
// //             }
// //         });
// //         res.status(201).json(newCourse);
// //     } catch (error: any) {
// //         res.status(500).json({ error: error.message });
// //     }
// // };

// // // Update General Info Course
// // export const updateCourse = async (req: Request, res: Response) => {
// //     try {
// //         const updated = await Course.findByIdAndUpdate(
// //             req.params.id, 
// //             req.body, 
// //             { new: true }
// //         );
        
// //         if (!updated) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
        
// //         res.json(updated);
// //     } catch (error: any) {
// //         res.status(500).json({ error: error.message });
// //     }
// // };

// // // Delete Course
// // export const deleteCourse = async (req: Request, res: Response) => {
// //     try {
// //         const deleted = await Course.findByIdAndDelete(req.params.id);
// //         if (!deleted) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
        
// //         // Opsional: Hapus enrollment terkait
// //         await Enrollment.deleteMany({ courseId: req.params.id });

// //         res.json({ message: 'Kursus berhasil dihapus' });
// //     } catch (error: any) {
// //         res.status(500).json({ error: error.message });
// //     }
// // };

// // // Toggle Publish Status (Publish/Unpublish)
// // export const togglePublishCourse = async (req: Request, res: Response) => {
// //     try {
// //         const course = await Course.findById(req.params.id);
// //         if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });

// //         course.isPublished = !course.isPublished;
// //         await course.save();

// //         res.json({ 
// //             message: `Kursus berhasil ${course.isPublished ? 'dipublikasikan' : 'disembunyikan'}`, 
// //             isPublished: course.isPublished 
// //         });
// //     } catch (error: any) {
// //         res.status(500).json({ error: error.message });
// //     }
// // };

// // // --- 3. MODULE MANAGEMENT ---

// // export const addModule = async (req: Request, res: Response) => {
// //     try {
// //         const course = await Course.findById(req.params.id);
// //         if(!course) return res.status(404).json({error: "Course not found"});
        
// //         course.modules.push(req.body);
// //         await course.save();
// //         res.json(course);
// //     } catch (error: any) {
// //         res.status(500).json({ error: error.message });
// //     }
// // };

// // export const updateModule = async (req: Request, res: Response) => {
// //     try {
// //         const { id, moduleId } = req.params;
// //         const course = await Course.findOneAndUpdate(
// //             { "_id": id, "modules._id": moduleId },
// //             { 
// //                 "$set": {
// //                     "modules.$.title": req.body.title,
// //                     "modules.$.description": req.body.description,
// //                     // Tambahkan field lain jika perlu
// //                 }
// //             },
// //             { new: true }
// //         );
// //         if (!course) return res.status(404).json({ error: 'Modul tidak ditemukan' });
// //         res.json(course);
// //     } catch (error: any) {
// //         res.status(500).json({ error: error.message });
// //     }
// // };

// // export const deleteModule = async (req: Request, res: Response) => {
// //     try {
// //         const { id, moduleId } = req.params;
// //         const course = await Course.findByIdAndUpdate(
// //             id,
// //             { $pull: { modules: { _id: moduleId } } },
// //             { new: true }
// //         );
        
// //         if (!course) return res.status(404).json({ error: 'Kursus atau Modul tidak ditemukan' });
// //         res.json(course);
// //     } catch (error: any) {
// //         res.status(500).json({ error: error.message });
// //     }
// // };

// // // --- 4. LESSON MANAGEMENT ---

// // export const addLesson = async (req: Request, res: Response) => {
// //     try {
// //         const { id, moduleId } = req.params;
// //         const course = await Course.findById(id);
// //         if(!course) return res.status(404).json({error:"Not found"});

// //         const module = course.modules.id(moduleId);
// //         if(module) {
// //             module.lessons.push(req.body);
// //             await course.save();
// //             res.json(course);
// //         } else {
// //             res.status(404).json({ error: 'Modul tidak ditemukan' });
// //         }
// //     } catch (error: any) {
// //         res.status(500).json({ error: error.message });
// //     }
// // };

// // export const updateLesson = async (req: Request, res: Response) => {
// //     try {
// //         const { id, moduleId, lessonId } = req.params;
// //         const course = await Course.findById(id);
// //         if(!course) return res.status(404).json({error:"Course Not found"});

// //         const module = course.modules.id(moduleId);
// //         const lesson = module?.lessons.id(lessonId);
        
// //         if(lesson) {
// //             // Update fields
// //             Object.assign(lesson, req.body);
// //             await course.save();
// //             res.json(course);
// //         } else {
// //             res.status(404).json({ error: 'Lesson tidak ditemukan' });
// //         }
// //     } catch (error: any) {
// //         res.status(500).json({ error: error.message });
// //     }
// // };

// // export const deleteLesson = async (req: Request, res: Response) => {
// //     try {
// //         const { id, moduleId, lessonId } = req.params;
// //         const course = await Course.findById(id);
// //         if(!course) return res.status(404).json({error:"Course Not found"});

// //         const module = course.modules.id(moduleId);
        
// //         if(module) {
// //             module.lessons.pull({ _id: lessonId });
// //             await course.save();
// //             res.json(course);
// //         } else {
// //             res.status(404).json({ error: 'Modul tidak ditemukan' });
// //         }
// //     } catch (error: any) {
// //         res.status(500).json({ error: error.message });
// //     }
// // };

// // // --- 5. PARTICIPANTS ---

// // export const getCourseParticipants = async (req: Request, res: Response) => {
// //     try {
// //         const participants = await Enrollment.find({ courseId: req.params.id })
// //             .populate('userId', 'name email avatarUrl role');
// //         res.json({ participants });
// //     } catch (error: any) {
// //         res.status(500).json({ error: error.message });
// //     }
// // };


// import { Request, Response } from 'express';
// import { Course } from '../models/Course';
// import { Enrollment } from '../models/Enrollment';

// // --- 1. GET COURSES (DENGAN FILTER ROLE) ---
// export const getCourses = async (req: Request, res: Response) => {
//     try {
//         const { search, category, level } = req.query;
        
//         // Ambil user dari request (dipasang oleh middleware requireAuth)
//         // Jika endpoint public, req.user mungkin undefined
//         const user = (req as any).user; 
        
//         const filter: any = {};

//         // --- [LOGIKA FILTER BERDASARKAN ROLE] ---
        
//         if (user) {
//             // A. FASILITATOR: HANYA lihat kursus miliknya
//             if (user.role === 'FACILITATOR') {
//                 filter.facilitatorIds = user.id; 
//             }
//             // B. ADMIN WILAYAH (Provinsi)
//             else if (user.role === 'ADMIN' && user.regionScope === 'province') {
//                 // Opsional: Jika Anda punya field targetProvince di Course
//                 // filter.targetProvince = { $in: user.managedProvinces };
//             }
//             // C. SUPER ADMIN / ADMIN NASIONAL: Lihat Semua (Tidak ada filter tambahan)
//         } 
//         else {
//             // D. PUBLIC / STUDENT: Hanya lihat yang sudah Rilis
//              filter.isPublished = true; 
//         }

//         // --- FILTER PENCARIAN STANDAR ---
//         if (search) {
//             filter.title = { $regex: search, $options: 'i' };
//         }
//         if (category && category !== 'Semua') {
//             filter.category = category;
//         }
//         if (level && level !== 'Semua') {
//             filter.level = level;
//         }

//         const courses = await Course.find(filter)
//             .select('title slug thumbnailUrl category level price rating reviewsCount totalJp isPublished facilitatorIds modules')
//             .populate('facilitatorIds', 'name')
//             .sort({ createdAt: -1 });
            
//         res.json({ courses });
//     } catch (error: any) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // --- 2. GET DETAIL ---
// export const getCourseById = async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;
//         const course = await Course.findById(id)
//             .populate('facilitatorIds', 'name avatarUrl role')
//             .populate('modules.facilitatorId', 'name');

//         if (!course) {
//             return res.status(404).json({ error: 'Kursus tidak ditemukan' });
//         }
//         res.json({ course });
//     } catch (error: any) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // --- 3. CREATE COURSE ---
// export const createCourse = async (req: any, res: Response) => {
//     try {
//         // Otomatis jadikan pembuat sebagai fasilitator pertama
//         const newCourse = await Course.create({
//             ...req.body,
//             facilitatorIds: [req.user.id],
//             creatorInfo: {
//                 name: req.user.name,
//                 email: req.user.email
//             }
//         });
//         res.status(201).json(newCourse);
//     } catch (error: any) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // --- 4. UPDATE COURSE ---
// export const updateCourse = async (req: Request, res: Response) => {
//     try {
//         const updated = await Course.findByIdAndUpdate(
//             req.params.id, 
//             req.body, 
//             { new: true }
//         );
//         if (!updated) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
//         res.json(updated);
//     } catch (error: any) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // --- 5. DELETE COURSE ---
// export const deleteCourse = async (req: Request, res: Response) => {
//     try {
//         const deleted = await Course.findByIdAndDelete(req.params.id);
//         if (!deleted) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
        
//         await Enrollment.deleteMany({ courseId: req.params.id }); // Hapus data siswa terkait
//         res.json({ message: 'Kursus berhasil dihapus' });
//     } catch (error: any) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // --- 6. TOGGLE PUBLISH ---
// export const togglePublishCourse = async (req: Request, res: Response) => {
//     try {
//         const course = await Course.findById(req.params.id);
//         if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });

//         course.isPublished = !course.isPublished;
//         await course.save();

//         res.json({ 
//             message: `Kursus berhasil ${course.isPublished ? 'dipublikasikan' : 'disembunyikan'}`, 
//             isPublished: course.isPublished 
//         });
//     } catch (error: any) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // --- 7. MODULE MANAGEMENT ---
// export const addModule = async (req: Request, res: Response) => {
//     try {
//         const course = await Course.findById(req.params.id);
//         if(!course) return res.status(404).json({error: "Course not found"});
        
//         course.modules.push(req.body);
//         await course.save();
//         res.json(course);
//     } catch (error: any) {
//         res.status(500).json({ error: error.message });
//     }
// };

// export const updateModule = async (req: Request, res: Response) => {
//     try {
//         const { id, moduleId } = req.params;
//         const course = await Course.findOneAndUpdate(
//             { "_id": id, "modules._id": moduleId },
//             { 
//                 "$set": {
//                     "modules.$.title": req.body.title,
//                     "modules.$.description": req.body.description,
//                 }
//             },
//             { new: true }
//         );
//         res.json(course);
//     } catch (error: any) {
//         res.status(500).json({ error: error.message });
//     }
// };

// export const deleteModule = async (req: Request, res: Response) => {
//     try {
//         const { id, moduleId } = req.params;
//         const course = await Course.findByIdAndUpdate(
//             id,
//             { $pull: { modules: { _id: moduleId } } },
//             { new: true }
//         );
//         res.json(course);
//     } catch (error: any) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // --- 8. LESSON MANAGEMENT ---
// export const addLesson = async (req: Request, res: Response) => {
//     try {
//         const { id, moduleId } = req.params;
//         const course = await Course.findById(id);
//         if(!course) return res.status(404).json({error:"Not found"});

//         const module = course.modules.id(moduleId);
//         if(module) {
//             module.lessons.push(req.body);
//             await course.save();
//             res.json(course);
//         } else {
//             res.status(404).json({error: "Module not found"});
//         }
//     } catch (error: any) {
//         res.status(500).json({ error: error.message });
//     }
// };

// export const updateLesson = async (req: Request, res: Response) => {
//     try {
//         const { id, moduleId, lessonId } = req.params;
//         const course = await Course.findById(id);
//         const module = course?.modules.id(moduleId);
//         const lesson = module?.lessons.id(lessonId);
        
//         if(lesson) {
//             Object.assign(lesson, req.body);
//             await course?.save();
//             res.json(course);
//         } else {
//             res.status(404).json({error: "Lesson not found"});
//         }
//     } catch (error: any) {
//         res.status(500).json({ error: error.message });
//     }
// };

// export const deleteLesson = async (req: Request, res: Response) => {
//     try {
//         const { id, moduleId, lessonId } = req.params;
//         const course = await Course.findById(id);
//         const module = course?.modules.id(moduleId);
        
//         if(module) {
//             module.lessons.pull({ _id: lessonId });
//             await course?.save();
//             res.json(course);
//         } else {
//             res.status(404).json({error: "Module not found"});
//         }
//     } catch (error: any) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // --- 9. PARTICIPANTS ---
// export const getCourseParticipants = async (req: Request, res: Response) => {
//     try {
//         const participants = await Enrollment.find({ courseId: req.params.id })
//             .populate('userId', 'name email avatarUrl role');
//         res.json({ participants });
//     } catch (error: any) {
//         res.status(500).json({ error: error.message });
//     }
// };


import { Request, Response } from 'express';
import { Course } from '../models/Course';
import { Enrollment } from '../models/Enrollment';

// Helper: Generate Slug Unik dari Title
const generateSlug = (title: string) => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-') // Ganti karakter aneh dengan dash
        .replace(/^-+|-+$/g, '')     // Hapus dash di awal/akhir
        + '-' + Date.now();          // Tambah timestamp agar pasti unik
};

// --- 1. GET COURSES (DENGAN FILTER ROLE, STATUS, & PAGINATION) ---
export const getCourses = async (req: Request, res: Response) => {
    try {
        // [LENGKAPI] Tambahkan status, page, limit, dan sort
        const { search, category, level, status, page = 1, limit = 10, sort } = req.query;
        
        const user = (req as any).user; 
        const filter: any = {};

        // --- [LOGIKA FILTER BERDASARKAN ROLE] ---
        if (user) {
            // A. FASILITATOR: HANYA lihat kursus miliknya
            if (user.role === 'FACILITATOR') {
                filter.facilitatorIds = user.id; 
            }
            // B. ADMIN WILAYAH (Provinsi)
            else if (user.role === 'ADMIN' && user.regionScope === 'province') {
                // Opsional: Filter provinsi jika ada
                // filter.targetProvince = { $in: user.managedProvinces };
                
                // [TAMBAHAN] Admin juga perlu filter status jika diminta frontend
                if (status) {
                    filter.status = { $in: (status as string).split(',') };
                }
            }
            // C. SUPER ADMIN / ADMIN NASIONAL
            else if (['SUPER_ADMIN', 'ADMIN'].includes(user.role)) {
                // [TAMBAHAN] Allow filter by status (untuk Tab Pengajuan vs Manajemen)
                if (status) {
                    filter.status = { $in: (status as string).split(',') };
                }
            }
        } 
        else {
            // D. PUBLIC / STUDENT: Hanya lihat yang sudah Rilis
             filter.isPublished = true; 
        }

        // --- FILTER PENCARIAN STANDAR ---
        if (search) {
            filter.title = { $regex: search, $options: 'i' };
        }
        if (category && category !== 'Semua') {
            filter.category = category;
        }
        if (level && level !== 'Semua') {
            filter.level = level;
        }

        // --- SORTING CONFIG ---
        let sortConfig: any = { createdAt: -1 }; // Default terbaru
        if (sort === 'oldest') sortConfig = { createdAt: 1 };
        if (sort === 'a-z') sortConfig = { title: 1 };

        // --- QUERY DATABASE DENGAN PAGINATION ---
        const courses = await Course.find(filter)
            .select('title slug thumbnailUrl category level price rating reviewsCount totalJp isPublished status facilitatorIds modules creatorInfo createdAt') // Select field lengkap
            .populate('facilitatorIds', 'name')
            .populate('creatorInfo', 'name email') // [PENTING] Untuk info pengaju
            .sort(sortConfig)
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit));
            
        // Hitung total untuk pagination frontend
        const total = await Course.countDocuments(filter);
            
        res.json({ 
            courses,
            totalPages: Math.ceil(total / Number(limit)),
            currentPage: Number(page),
            totalItems: total
        });

    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// --- 2. GET DETAIL ---
export const getCourseById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const course = await Course.findById(id)
            .populate('facilitatorIds', 'name avatarUrl role')
            .populate('modules.facilitatorId', 'name')
            .populate('creatorInfo', 'name email'); // Tambahan populate

        if (!course) {
            return res.status(404).json({ error: 'Kursus tidak ditemukan' });
        }
        res.json({ course });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// --- 3. CREATE COURSE (HANDLING PROPOSAL) ---
export const createCourse = async (req: any, res: Response) => {
    try {
        const data = req.body;

        // [FIX UTAMA] Auto-Generate Slug jika Frontend gagal mengirim
        // Ini mencegah error "slug: null" (E11000)
        if (!data.slug) {
            data.slug = generateSlug(data.title || 'untitled');
        }

        // [LENGKAPI] Pastikan status ada (default draft jika bukan proposal)
        if (!data.status) {
            data.status = 'draft';
        }

        // Siapkan Creator Info
        const creatorData = {
            name: req.user.name,
            email: req.user.email,
            id: req.user.id, // atau req.user.userId
            role: req.user.role
        };

        // Otomatis jadikan pembuat sebagai fasilitator pertama
        const newCourse = await Course.create({
            ...data,
            facilitatorIds: [req.user.id],
            creatorInfo: creatorData
        });

        res.status(201).json(newCourse);
    } catch (error: any) {
        // [FIX] Handle Duplicate Key Error (Slug Bentrok) secara spesifik
        if (error.code === 11000) {
            // Retry sederhana dengan slug baru
            try {
                const retryData = { ...req.body };
                retryData.slug = generateSlug(retryData.title) + '-' + Math.floor(Math.random() * 1000);
                retryData.facilitatorIds = [req.user.id];
                
                if (!retryData.creatorInfo) {
                    retryData.creatorInfo = { name: req.user.name, email: req.user.email };
                }

                const retryCourse = await Course.create(retryData);
                return res.status(201).json(retryCourse);
            } catch (retryError) {
                return res.status(400).json({ error: 'Gagal membuat pelatihan: Judul/Slug duplikat.' });
            }
        }
        res.status(500).json({ error: error.message });
    }
};

// --- 4. UPDATE COURSE ---
export const updateCourse = async (req: Request, res: Response) => {
    try {
        // Gunakan $set untuk keamanan update parsial
        const updated = await Course.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body }, 
            { new: true, runValidators: true }
        );
        
        if (!updated) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
        
        res.json(updated);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// --- 5. DELETE COURSE ---
export const deleteCourse = async (req: Request, res: Response) => {
    try {
        const deleted = await Course.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
        
        // Hapus enrollment terkait agar bersih
        await Enrollment.deleteMany({ courseId: req.params.id });

        res.json({ message: 'Kursus berhasil dihapus' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// --- 6. TOGGLE PUBLISH ---
export const togglePublishCourse = async (req: Request, res: Response) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });

        course.isPublished = !course.isPublished;
        // [LENGKAPI] Sinkronisasi status string juga agar konsisten
        course.status = course.isPublished ? 'published' : 'draft';
        
        await course.save();

        res.json({ 
            message: `Kursus berhasil ${course.isPublished ? 'dipublikasikan' : 'disembunyikan'}`, 
            isPublished: course.isPublished,
            status: course.status
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// --- 7. MODULE MANAGEMENT (TETAP SAMA) ---
export const addModule = async (req: Request, res: Response) => {
    try {
        const course = await Course.findById(req.params.id);
        if(!course) return res.status(404).json({error: "Course not found"});
        
        course.modules.push(req.body);
        await course.save();
        res.json(course);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateModule = async (req: Request, res: Response) => {
    try {
        const { id, moduleId } = req.params;
        const course = await Course.findOneAndUpdate(
            { "_id": id, "modules._id": moduleId },
            { 
                "$set": {
                    "modules.$.title": req.body.title,
                    "modules.$.description": req.body.description,
                }
            },
            { new: true }
        );
        if (!course) return res.status(404).json({ error: 'Modul tidak ditemukan' });
        res.json(course);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteModule = async (req: Request, res: Response) => {
    try {
        const { id, moduleId } = req.params;
        const course = await Course.findByIdAndUpdate(
            id,
            { $pull: { modules: { _id: moduleId } } },
            { new: true }
        );
        
        if (!course) return res.status(404).json({ error: 'Kursus atau Modul tidak ditemukan' });
        res.json(course);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// --- 8. LESSON MANAGEMENT (TETAP SAMA) ---
export const addLesson = async (req: Request, res: Response) => {
    try {
        const { id, moduleId } = req.params;
        const course = await Course.findById(id);
        if(!course) return res.status(404).json({error:"Not found"});

        const module = course.modules.id(moduleId);
        if(module) {
            module.lessons.push(req.body);
            await course.save();
            res.json(course);
        } else {
            res.status(404).json({ error: 'Modul tidak ditemukan' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateLesson = async (req: Request, res: Response) => {
    try {
        const { id, moduleId, lessonId } = req.params;
        const course = await Course.findById(id);
        if(!course) return res.status(404).json({error:"Course Not found"});

        const module = course.modules.id(moduleId);
        const lesson = module?.lessons.id(lessonId);
        
        if(lesson) {
            Object.assign(lesson, req.body);
            await course.save();
            res.json(course);
        } else {
            res.status(404).json({ error: 'Lesson tidak ditemukan' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteLesson = async (req: Request, res: Response) => {
    try {
        const { id, moduleId, lessonId } = req.params;
        const course = await Course.findById(id);
        if(!course) return res.status(404).json({error:"Course Not found"});

        const module = course.modules.id(moduleId);
        
        if(module) {
            module.lessons.pull({ _id: lessonId });
            await course.save();
            res.json(course);
        } else {
            res.status(404).json({ error: 'Modul tidak ditemukan' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// --- 9. PARTICIPANTS (TETAP SAMA) ---
export const getCourseParticipants = async (req: Request, res: Response) => {
    try {
        const participants = await Enrollment.find({ courseId: req.params.id })
            .populate('userId', 'name email avatarUrl role');
        res.json({ participants });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
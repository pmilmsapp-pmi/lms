// import { Request, Response } from 'express';
// import { Course } from '../models/Course';
// import Enrollment from '../models/Enrollment';
// import { Progress } from '../models/Progress';
// import { Message } from '../models/Message'; 
// import { AuthedRequest } from '../middleware/auth'; 
// import mongoose from 'mongoose';

// // ==========================================
// // 1. STANDARD CRUD COURSE
// // ==========================================

// export const createCourse = async (req: Request, res: Response) => {
//   try {
//     const course = new Course(req.body);
//     await course.save();
//     res.status(201).json(course);
//   } catch (error: any) {
//     res.status(400).json({ error: error.message });
//   }
// };

// export const getCourses = async (req: Request, res: Response) => {
//   try {
//     const courses = await Course.find()
//       .populate('facilitatorIds', 'name email avatarUrl')
//       .sort({ createdAt: -1 });
//     res.json({ courses }); 
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const getCourseById = async (req: Request, res: Response) => {
//   try {
//     const course = await Course.findById(req.params.id)
//       .populate('facilitatorIds', 'name email avatarUrl');
//     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
//     res.json(course);
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const updateCourse = async (req: Request, res: Response) => {
//   try {
//     const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
//     res.json(course);
//   } catch (error: any) {
//     res.status(400).json({ error: error.message });
//   }
// };

// export const deleteCourse = async (req: Request, res: Response) => {
//   try {
//     const course = await Course.findByIdAndDelete(req.params.id);
//     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
    
//     await Enrollment.deleteMany({ course: req.params.id });
//     await Progress.deleteMany({ courseId: req.params.id });
    
//     res.json({ message: 'Kursus berhasil dihapus' });
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // ==========================================
// // 2. MODULE & LESSON MANAGEMENT
// // ==========================================

// export const addModule = async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;
//         const course = await Course.findById(id);
//         if (!course) return res.status(404).json({ error: 'Course not found' });
//         course.modules.push(req.body);
//         await course.save();
//         res.json(course);
//     } catch (error: any) { res.status(500).json({ error: error.message }); }
// };

// export const updateModule = async (req: Request, res: Response) => {
//     try {
//         const { courseId, moduleId } = req.params;
//         const course = await Course.findById(courseId);
//         if (!course) return res.status(404).json({ error: 'Course not found' });
//         const module = course.modules.id(moduleId);
//         if (!module) return res.status(404).json({ error: 'Module not found' });
//         module.set(req.body);
//         await course.save();
//         res.json(course);
//     } catch (error: any) { res.status(500).json({ error: error.message }); }
// };

// export const addLesson = async (req: Request, res: Response) => {
//     try {
//         const { courseId, moduleId } = req.params;
//         const course = await Course.findById(courseId);
//         if (!course) return res.status(404).json({ error: 'Course not found' });
//         const module = course.modules.id(moduleId);
//         if (!module) return res.status(404).json({ error: 'Module not found' });
        
//         module.lessons.push(req.body);
        
//         await course.save();
//         res.json(course);
//     } catch (error: any) { res.status(500).json({ error: error.message }); }
// };

// export const updateLesson = async (req: Request, res: Response) => {
//     try {
//         const { courseId, moduleId, lessonId } = req.params;
//         const course = await Course.findById(courseId);
//         if (!course) return res.status(404).json({ error: 'Course not found' });
//         const module = course.modules.id(moduleId);
//         if (!module) return res.status(404).json({ error: 'Module not found' });
//         const lesson = module.lessons.id(lessonId);
//         if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
        
//         lesson.set(req.body);
        
//         await course.save();
//         res.json(course);
//     } catch (error: any) { res.status(500).json({ error: error.message }); }
// };

// export const deleteLesson = async (req: Request, res: Response) => {
//     try {
//         const { courseId, moduleId, lessonId } = req.params;
//         const course = await Course.findById(courseId);
//         if (!course) return res.status(404).json({ error: 'Course not found' });
//         const module = course.modules.id(moduleId);
//         if (module) {
//             module.lessons.pull({ _id: lessonId }); 
//             await course.save();
//         }
//         res.json(course);
//     } catch (error: any) { res.status(500).json({ error: error.message }); }
// };

// export const toggleStatus = async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;
//         const { moduleId, lessonId } = req.body;
//         const course = await Course.findById(id);
//         if (!course) return res.status(404).json({ error: 'Course not found' });

//         if (moduleId && lessonId) {
//             const mod = course.modules.id(moduleId);
//             const les = mod?.lessons.id(lessonId);
//             if (les) les.isActive = !les.isActive;
//         } else if (moduleId) {
//             const mod = course.modules.id(moduleId);
//             if (mod) mod.isActive = !mod.isActive;
//         } else {
//             course.isPublished = !course.isPublished;
//         }
//         await course.save();
//         res.json(course);
//     } catch (error: any) { res.status(500).json({ error: error.message }); }
// };

// export const reorderModules = async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;
//         const { modules } = req.body;
//         await Course.findByIdAndUpdate(id, { modules });
//         res.json({ message: 'Urutan disimpan' });
//     } catch (error: any) { res.status(500).json({ error: error.message }); }
// };

// // [NEW] FUNGSI UPDATE GRADING SCHEME
// export const updateGradingScheme = async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;
//         const { modules } = req.body; 

//         if (!modules) return res.status(400).json({ error: "Data modul diperlukan" });

//         const course = await Course.findByIdAndUpdate(id, { modules }, { new: true });
//         if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
        
//         res.json({ message: 'Skema penilaian berhasil disimpan', course });
//     } catch (error: any) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // ==========================================
// // 3. ENROLLMENT & VERIFICATION
// // ==========================================

// export const enrollCourse = async (req: AuthedRequest, res: Response) => {
//     try {
//         const { courseId } = req.params; 
//         const userId = req.user?.id;
//         const { registrationData } = req.body; // Ambil data pendaftaran (termasuk file url)
        
//         if (!userId) return res.status(401).json({ error: 'Unauthorized' });

//         const existing = await Enrollment.findOne({ user: userId, course: courseId });
//         if (existing) return res.status(400).json({ error: 'Anda sudah mendaftar.' });

//         const newEnrollment = new Enrollment({
//             user: userId,
//             course: courseId,
//             status: 'pending', 
//             progress: 0,
//             isCompleted: false,
//             enrolledAt: new Date(),
//             registrationData: registrationData || {} 
//         });

//         await newEnrollment.save();
//         res.status(201).json({ message: 'Pendaftaran berhasil. Menunggu verifikasi.', enrollment: newEnrollment });
//     } catch (error: any) { res.status(500).json({ error: error.message }); }
// };

// export const verifyEnrollment = async (req: Request, res: Response) => {
//     try {
//         const { enrollmentId, action } = req.body; 

//         if (!enrollmentId || !action) return res.status(400).json({ error: "Data tidak lengkap" });

//         if (action === 'reject') {
//             await Enrollment.findByIdAndDelete(enrollmentId);
//             return res.json({ message: "Pendaftaran ditolak." });
//         }
//         if (action === 'approve') {
//             await Enrollment.findByIdAndUpdate(enrollmentId, { status: 'active', joinedAt: new Date() });
//             return res.json({ message: "Pendaftaran disetujui." });
//         }
//         res.status(400).json({ error: "Aksi tidak valid" });
//     } catch (error: any) { res.status(500).json({ error: error.message }); }
// };

// export const checkEnrollmentStatus = async (req: AuthedRequest, res: Response) => {
//     try {
//         const { courseId } = req.params;
//         const userId = req.user?.id;
        
//         if (!userId) return res.status(401).json({ error: 'Unauthorized' });

//         const enrollment = await Enrollment.findOne({ user: userId, course: courseId });
//         if (!enrollment) return res.json({ isEnrolled: false, status: null });

//         res.json({ isEnrolled: true, status: enrollment.status, progress: enrollment.progress });
//     } catch (error: any) { res.status(500).json({ error: error.message }); }
// };

// // ==========================================
// // 4. PARTICIPANT MANAGEMENT (REALTIME LOGIC)
// // ==========================================

// export const getCourseParticipants = async (req: Request, res: Response) => {
//   try {
//     res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
//     const { id } = req.params; 

//     // A. Ambil Data Enrollment
//     const enrollments = await Enrollment.find({ course: id })
//       .populate('user', 'name email avatarUrl role')
//       .sort({ createdAt: -1 })
//       .lean();

//     if (!enrollments.length) return res.json({ participants: [] });

//     // B. Ambil Progress User
//     const userIds = enrollments.map((e: any) => e.user?._id);
//     const progressRecords = await Progress.find({ courseId: id, userId: { $in: userIds } }).lean();

//     // C. Peta Struktur Course
//     const course: any = await Course.findById(id).select('modules').lean();
//     let totalLessons = 0;
//     const validLessonIds = new Set<string>();
//     const lessonMap = new Map();
//     const orderedLessonIds: string[] = [];

//     if (course && course.modules) {
//         course.modules.forEach((m: any) => {
//             if (m.isActive) {
//                 m.lessons.forEach((l: any) => { 
//                     if (l.isActive) {
//                         totalLessons++; 
//                         const lId = l._id.toString();
//                         validLessonIds.add(lId);
//                         orderedLessonIds.push(lId);
//                         lessonMap.set(lId, { lessonTitle: l.title, moduleTitle: m.title });
//                     }
//                 });
//             }
//         });
//     }

//     // D. Merge Data
//     const participants = await Promise.all(enrollments.map(async (enroll: any) => {
//         const userObj = enroll.user || {};
//         const detail = progressRecords.find((p: any) => p.userId.toString() === userObj._id?.toString());
        
//         let completedIds: string[] = [];
//         let calculatedProgress = 0;
//         let currentPosition = "Belum Memulai"; 

//         if ((enroll.status === 'active' || enroll.status === 'approved') && detail) {
//             const rawCompleted = detail.completedLessons.map((id: any) => id.toString());
//             completedIds = rawCompleted.filter((id) => validLessonIds.has(id));
            
//             if (totalLessons > 0) {
//                 calculatedProgress = Math.round((completedIds.length / totalLessons) * 100);
//             }
//             if (calculatedProgress > 100) calculatedProgress = 100;

//             const nextLessonId = orderedLessonIds.find(id => !completedIds.includes(id));
//             if (calculatedProgress === 100) {
//                 currentPosition = "✅ Selesai";
//             } else if (nextLessonId) {
//                 const info = lessonMap.get(nextLessonId);
//                 if (info) currentPosition = `Sedang: ${info.lessonTitle}`; 
//             }
//         }

//         if ((enroll.status === 'active' || enroll.status === 'approved') && enroll.progress !== calculatedProgress) {
//             await Enrollment.updateOne(
//                 { _id: enroll._id }, 
//                 { $set: { progress: calculatedProgress, isCompleted: calculatedProgress === 100 } }
//             );
//         }

//         return {
//             _id: enroll._id, 
//             user: {
//                 _id: userObj._id,
//                 name: userObj.name || enroll.registrationData?.fullName || 'Tanpa Nama',
//                 email: userObj.email || enroll.registrationData?.email || '-',
//                 avatarUrl: userObj.avatarUrl,
//                 role: userObj.role
//             },
//             // [NEW] Kirim data formulir pendaftaran (termasuk uploadedFormUrl)
//             registrationData: enroll.registrationData || {},
            
//             status: enroll.status || 'pending', 
//             joinedAt: enroll.createdAt,
//             progress: calculatedProgress, 
//             isCompleted: calculatedProgress === 100 || enroll.isCompleted,
//             completedLessons: completedIds, 
//             currentPosition: currentPosition, 
//             lessonDetails: detail ? detail.lessonDetails : []
//         };
//     }));

//     res.json({ participants });
//   } catch (error: any) { res.status(500).json({ error: error.message }); }
// };

// // ==========================================
// // 5. ADMIN ACTIONS
// // ==========================================

// export const markCompleteLessonByAdmin = async (req: Request, res: Response) => {
//     try {
//         const { studentId, lessonId, courseId } = req.body;
//         let progress = await Progress.findOne({ userId: studentId, courseId });
//         if (!progress) progress = new Progress({ userId: studentId, courseId, completedLessons: [], lessonDetails: [] });

//         const strLessonId = lessonId.toString();
//         if (!progress.completedLessons.some((id: any) => id.toString() === strLessonId)) {
//             progress.completedLessons.push(lessonId);
//             await progress.save();
//         }

//         const course: any = await Course.findById(courseId).select('modules');
//         let totalLessons = 0;
//         if(course) course.modules.forEach((m:any) => { if(m.isActive) m.lessons.forEach((l:any) => { if(l.isActive) totalLessons++; }); });
        
//         let newProgress = 0;
//         if (totalLessons > 0) newProgress = Math.round((progress.completedLessons.length / totalLessons) * 100);
//         if (newProgress > 100) newProgress = 100;

//         await Enrollment.findOneAndUpdate(
//             { user: studentId, course: courseId }, 
//             { $set: { progress: newProgress, isCompleted: newProgress === 100, completedAt: newProgress === 100 ? new Date() : null } }
//         );

//         res.json({ message: 'Berhasil diluluskan', progress: newProgress });
//     } catch (error: any) { res.status(500).json({ error: error.message }); }
// };

// export const resetQuizByAdmin = async (req: Request, res: Response) => {
//     try {
//         const { studentId, quizId } = req.body; 
//         if (!studentId || !quizId) return res.status(400).json({ error: "Data incomplete" });

//         let progressDoc = await Progress.findOne({ userId: studentId, completedLessons: new mongoose.Types.ObjectId(quizId) });

//         if (progressDoc) {
//             progressDoc.completedLessons = progressDoc.completedLessons.filter((id: any) => id.toString() !== quizId);
//             if (progressDoc.lessonDetails) {
//                 progressDoc.lessonDetails = progressDoc.lessonDetails.filter((d: any) => d.lessonId && d.lessonId.toString() !== quizId);
//             }
//             if (progressDoc.quizScores) {
//                 progressDoc.quizScores = progressDoc.quizScores.filter((s: any) => s.lessonId && s.lessonId.toString() !== quizId);
//             }
//             progressDoc.isCompleted = false; 
//             await progressDoc.save();

//             const courseId = progressDoc.courseId;
//             const courseData: any = await Course.findById(courseId).select('modules');
//             let totalLessons = 0;
//             if (courseData) {
//                 courseData.modules.forEach((m: any) => {
//                     if (m.isActive) m.lessons.forEach((l: any) => { if (l.isActive) totalLessons++; });
//                 });
//             }
//             let newProgress = 0;
//             if (totalLessons > 0) newProgress = Math.round((progressDoc.completedLessons.length / totalLessons) * 100);
//             if (newProgress > 100) newProgress = 100;

//             await Enrollment.findOneAndUpdate(
//                 { user: studentId, course: courseId },
//                 { $set: { progress: newProgress, isCompleted: newProgress === 100, completedAt: newProgress === 100 ? new Date() : null } }
//             );
//         }
//         res.json({ message: 'Reset berhasil & Progress dihitung ulang' });
//     } catch (error: any) { res.status(500).json({ error: error.message }); }
// };

// // ==========================================
// // 6. GROUP CHAT FEATURES
// // ==========================================

// export const getGroupMessages = async (req: AuthedRequest, res: Response) => {
//     try {
//         const { id } = req.params; 
//         const { type } = req.query; 
//         const userId = req.user?.id;

//         const course = await Course.findById(id);
//         if (!course) return res.status(404).json({ error: 'Course not found' });

//         const isFacilitator = course.facilitatorIds.map((f: any) => f.toString()).includes(userId) || req.user?.role === 'SUPER_ADMIN';
//         const enrollment = await Enrollment.findOne({ course: id, user: userId, status: { $in: ['active', 'approved'] } });
//         const isStudent = !!enrollment;

//         if (type === 'internal' && !isFacilitator) return res.status(403).json({ error: 'Akses ditolak.' });
//         if (type === 'public' && !isFacilitator && !isStudent) return res.status(403).json({ error: 'Akses ditolak.' });

//         const query: any = { course: id, type: type || 'public' };
//         const messages = await Message.find(query)
//             .populate('sender', 'name avatarUrl role')
//             .sort({ createdAt: 1 });

//         res.json(messages);
//     } catch (error: any) { res.status(500).json({ error: error.message }); }
// };

// export const sendGroupMessage = async (req: AuthedRequest, res: Response) => {
//     try {
//         const { id } = req.params; 
//         const { text, type, attachment } = req.body; 
//         const userId = req.user?.id;

//         const course = await Course.findById(id);
//         if (!course) return res.status(404).json({ error: 'Course not found' });

//         const isFacilitator = course.facilitatorIds.map((f: any) => f.toString()).includes(userId) || req.user?.role === 'SUPER_ADMIN';
        
//         if (type === 'internal' && !isFacilitator) return res.status(403).json({ error: 'Hanya Tim Fasilitator.' });

//         if (type === 'public') {
//             const enrollment = await Enrollment.findOne({ course: id, user: userId, status: { $in: ['active', 'approved'] } });
//             if (!isFacilitator && !enrollment) return res.status(403).json({ error: 'Akses dilarang.' });
//         }

//         const newMessage = new Message({
//             course: id,
//             sender: userId,
//             message: text || '', 
//             type: type || 'public',
//             isRead: false,
//             isGlobal: false,
//             attachment: attachment || null 
//         });

//         await newMessage.save();
//         const populatedMsg = await newMessage.populate('sender', 'name avatarUrl role');
        
//         res.status(201).json(populatedMsg);
//     } catch (error: any) { res.status(500).json({ error: error.message }); }
// };
import { Request, Response } from 'express';
import { Course } from '../models/Course';
import Enrollment from '../models/Enrollment';
import { Progress } from '../models/Progress';
import { Message } from '../models/Message'; 
import { AuthedRequest } from '../middleware/auth'; 
import mongoose from 'mongoose';

// ==========================================
// 1. STANDARD CRUD COURSE
// ==========================================

export const createCourse = async (req: Request, res: Response) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getCourses = async (req: Request, res: Response) => {
  try {
    const courses = await Course.find()
      .populate('facilitatorIds', 'name email avatarUrl')
      .sort({ createdAt: -1 });
    res.json({ courses }); 
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getCourseById = async (req: Request, res: Response) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('facilitatorIds', 'name email avatarUrl');
    if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
    res.json(course);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCourse = async (req: Request, res: Response) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
    res.json(course);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
    
    await Enrollment.deleteMany({ course: req.params.id });
    await Progress.deleteMany({ courseId: req.params.id });
    
    res.json({ message: 'Kursus berhasil dihapus' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// ==========================================
// 2. MODULE & LESSON MANAGEMENT
// ==========================================

export const addModule = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const course = await Course.findById(id);
        if (!course) return res.status(404).json({ error: 'Course not found' });
        course.modules.push(req.body);
        await course.save();
        res.json(course);
    } catch (error: any) { res.status(500).json({ error: error.message }); }
};

export const updateModule = async (req: Request, res: Response) => {
    try {
        const { courseId, moduleId } = req.params;
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ error: 'Course not found' });
        const module = course.modules.id(moduleId);
        if (!module) return res.status(404).json({ error: 'Module not found' });
        module.set(req.body);
        await course.save();
        res.json(course);
    } catch (error: any) { res.status(500).json({ error: error.message }); }
};

export const addLesson = async (req: Request, res: Response) => {
    try {
        const { courseId, moduleId } = req.params;
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ error: 'Course not found' });
        const module = course.modules.id(moduleId);
        if (!module) return res.status(404).json({ error: 'Module not found' });
        
        // Push req.body langsung agar semua field (termasuk meetingLink, points) tersimpan
        module.lessons.push(req.body);
        
        await course.save();
        res.json(course);
    } catch (error: any) { res.status(500).json({ error: error.message }); }
};

export const updateLesson = async (req: Request, res: Response) => {
    try {
        const { courseId, moduleId, lessonId } = req.params;
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ error: 'Course not found' });
        const module = course.modules.id(moduleId);
        if (!module) return res.status(404).json({ error: 'Module not found' });
        const lesson = module.lessons.id(lessonId);
        if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
        
        // Update lesson set req.body agar field baru (meetingLink, points) terupdate
        lesson.set(req.body);
        
        await course.save();
        res.json(course);
    } catch (error: any) { res.status(500).json({ error: error.message }); }
};

export const deleteLesson = async (req: Request, res: Response) => {
    try {
        const { courseId, moduleId, lessonId } = req.params;
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ error: 'Course not found' });
        const module = course.modules.id(moduleId);
        if (module) {
            module.lessons.pull({ _id: lessonId }); 
            await course.save();
        }
        res.json(course);
    } catch (error: any) { res.status(500).json({ error: error.message }); }
};

export const toggleStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { moduleId, lessonId } = req.body;
        const course = await Course.findById(id);
        if (!course) return res.status(404).json({ error: 'Course not found' });

        if (moduleId && lessonId) {
            const mod = course.modules.id(moduleId);
            const les = mod?.lessons.id(lessonId);
            if (les) les.isActive = !les.isActive;
        } else if (moduleId) {
            const mod = course.modules.id(moduleId);
            if (mod) mod.isActive = !mod.isActive;
        } else {
            course.isPublished = !course.isPublished;
        }
        await course.save();
        res.json(course);
    } catch (error: any) { res.status(500).json({ error: error.message }); }
};

export const reorderModules = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { modules } = req.body;
        await Course.findByIdAndUpdate(id, { modules });
        res.json({ message: 'Urutan disimpan' });
    } catch (error: any) { res.status(500).json({ error: error.message }); }
};

// [NEW] FUNGSI UPDATE GRADING SCHEME (BOBOT NILAI)
export const updateGradingScheme = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { modules } = req.body; 

        if (!modules) return res.status(400).json({ error: "Data modul diperlukan" });

        const course = await Course.findByIdAndUpdate(id, { modules }, { new: true });
        if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
        
        res.json({ message: 'Skema penilaian berhasil disimpan', course });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// ==========================================
// 3. ENROLLMENT & VERIFICATION (LOGIKA OTOMATIS vs MANUAL)
// ==========================================

export const enrollCourse = async (req: AuthedRequest, res: Response) => {
    try {
        const { courseId } = req.params; 
        const userId = req.user?.id;
        const { registrationData } = req.body; // Ambil data pendaftaran (termasuk file url)
        
        if (!userId) return res.status(401).json({ error: 'Unauthorized' });

        // 1. Cek Kursus & Mode Pendaftaran
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });

        const existing = await Enrollment.findOne({ user: userId, course: courseId });
        if (existing) return res.status(400).json({ error: 'Anda sudah mendaftar.' });

        // 2. Tentukan Status Awal
        // Jika mode 'automatic' -> status 'active' (langsung masuk)
        // Jika mode 'manual' -> status 'pending' (tunggu admin)
        let initialStatus = 'pending';
        let joinedAtDate = undefined;

        if (course.registrationMode === 'automatic') {
            initialStatus = 'active';
            joinedAtDate = new Date(); // Set tanggal join sekarang jika otomatis
        }

        const newEnrollment = new Enrollment({
            user: userId,
            course: courseId,
            status: initialStatus, 
            progress: 0,
            isCompleted: false,
            enrolledAt: new Date(),
            joinedAt: joinedAtDate,
            registrationData: registrationData || {} 
        });

        await newEnrollment.save();

        const msg = course.registrationMode === 'automatic' 
            ? 'Pendaftaran berhasil! Anda bisa langsung mulai belajar.' 
            : 'Pendaftaran berhasil. Mohon tunggu verifikasi admin.';

        res.status(201).json({ message: msg, enrollment: newEnrollment });
    } catch (error: any) { res.status(500).json({ error: error.message }); }
};

export const verifyEnrollment = async (req: Request, res: Response) => {
    try {
        const { enrollmentId, action } = req.body; 

        if (!enrollmentId || !action) return res.status(400).json({ error: "Data tidak lengkap" });

        if (action === 'reject') {
            await Enrollment.findByIdAndDelete(enrollmentId);
            return res.json({ message: "Pendaftaran ditolak." });
        }
        if (action === 'approve') {
            await Enrollment.findByIdAndUpdate(enrollmentId, { status: 'active', joinedAt: new Date() });
            return res.json({ message: "Pendaftaran disetujui." });
        }
        res.status(400).json({ error: "Aksi tidak valid" });
    } catch (error: any) { res.status(500).json({ error: error.message }); }
};

export const checkEnrollmentStatus = async (req: AuthedRequest, res: Response) => {
    try {
        const { courseId } = req.params;
        const userId = req.user?.id;
        
        if (!userId) return res.status(401).json({ error: 'Unauthorized' });

        const enrollment = await Enrollment.findOne({ user: userId, course: courseId });
        if (!enrollment) return res.json({ isEnrolled: false, status: null });

        res.json({ isEnrolled: true, status: enrollment.status, progress: enrollment.progress });
    } catch (error: any) { res.status(500).json({ error: error.message }); }
};

// ==========================================
// 4. PARTICIPANT MANAGEMENT (REALTIME LOGIC)
// ==========================================

export const getCourseParticipants = async (req: Request, res: Response) => {
  try {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    const { id } = req.params; 

    // A. Ambil Data Enrollment (Termasuk status 'pending' & 'registrationData')
    const enrollments = await Enrollment.find({ course: id })
      .populate('user', 'name email avatarUrl role')
      .sort({ createdAt: -1 })
      .lean();

    if (!enrollments.length) return res.json({ participants: [] });

    // B. Ambil Progress User
    const userIds = enrollments.map((e: any) => e.user?._id);
    const progressRecords = await Progress.find({ courseId: id, userId: { $in: userIds } }).lean();

    // C. Peta Struktur Course
    const course: any = await Course.findById(id).select('modules').lean();
    let totalLessons = 0;
    const validLessonIds = new Set<string>();
    const lessonMap = new Map();
    const orderedLessonIds: string[] = [];

    if (course && course.modules) {
        course.modules.forEach((m: any) => {
            if (m.isActive) {
                m.lessons.forEach((l: any) => { 
                    if (l.isActive) {
                        totalLessons++; 
                        const lId = l._id.toString();
                        validLessonIds.add(lId);
                        orderedLessonIds.push(lId);
                        lessonMap.set(lId, { lessonTitle: l.title, moduleTitle: m.title });
                    }
                });
            }
        });
    }

    // D. Merge Data
    const participants = await Promise.all(enrollments.map(async (enroll: any) => {
        const userObj = enroll.user || {};
        const detail = progressRecords.find((p: any) => p.userId.toString() === userObj._id?.toString());
        
        let completedIds: string[] = [];
        let calculatedProgress = 0;
        let currentPosition = "Belum Memulai"; 

        if ((enroll.status === 'active' || enroll.status === 'approved') && detail) {
            const rawCompleted = detail.completedLessons.map((id: any) => id.toString());
            completedIds = rawCompleted.filter((id) => validLessonIds.has(id));
            
            if (totalLessons > 0) {
                calculatedProgress = Math.round((completedIds.length / totalLessons) * 100);
            }
            if (calculatedProgress > 100) calculatedProgress = 100;

            const nextLessonId = orderedLessonIds.find(id => !completedIds.includes(id));
            if (calculatedProgress === 100) {
                currentPosition = "✅ Selesai";
            } else if (nextLessonId) {
                const info = lessonMap.get(nextLessonId);
                if (info) currentPosition = `Sedang: ${info.lessonTitle}`; 
            }
        }

        if ((enroll.status === 'active' || enroll.status === 'approved') && enroll.progress !== calculatedProgress) {
            await Enrollment.updateOne(
                { _id: enroll._id }, 
                { $set: { progress: calculatedProgress, isCompleted: calculatedProgress === 100 } }
            );
        }

        return {
            _id: enroll._id, 
            user: {
                _id: userObj._id,
                name: userObj.name || enroll.registrationData?.fullName || 'Tanpa Nama',
                email: userObj.email || enroll.registrationData?.email || '-',
                avatarUrl: userObj.avatarUrl,
                role: userObj.role
            },
            // [IMPORTANT] Kirim data formulir pendaftaran ke frontend
            registrationData: enroll.registrationData || {},
            
            status: enroll.status || 'pending', 
            joinedAt: enroll.createdAt,
            progress: calculatedProgress, 
            isCompleted: calculatedProgress === 100 || enroll.isCompleted,
            completedLessons: completedIds, 
            currentPosition: currentPosition, 
            lessonDetails: detail ? detail.lessonDetails : []
        };
    }));

    res.json({ participants });
  } catch (error: any) { res.status(500).json({ error: error.message }); }
};

// ==========================================
// 5. ADMIN ACTIONS
// ==========================================

export const markCompleteLessonByAdmin = async (req: Request, res: Response) => {
    try {
        const { studentId, lessonId, courseId } = req.body;
        let progress = await Progress.findOne({ userId: studentId, courseId });
        if (!progress) progress = new Progress({ userId: studentId, courseId, completedLessons: [], lessonDetails: [] });

        const strLessonId = lessonId.toString();
        if (!progress.completedLessons.some((id: any) => id.toString() === strLessonId)) {
            progress.completedLessons.push(lessonId);
            await progress.save();
        }

        const course: any = await Course.findById(courseId).select('modules');
        let totalLessons = 0;
        if(course) course.modules.forEach((m:any) => { if(m.isActive) m.lessons.forEach((l:any) => { if(l.isActive) totalLessons++; }); });
        
        let newProgress = 0;
        if (totalLessons > 0) newProgress = Math.round((progress.completedLessons.length / totalLessons) * 100);
        if (newProgress > 100) newProgress = 100;

        await Enrollment.findOneAndUpdate(
            { user: studentId, course: courseId }, 
            { $set: { progress: newProgress, isCompleted: newProgress === 100, completedAt: newProgress === 100 ? new Date() : null } }
        );

        res.json({ message: 'Berhasil diluluskan', progress: newProgress });
    } catch (error: any) { res.status(500).json({ error: error.message }); }
};

export const resetQuizByAdmin = async (req: Request, res: Response) => {
    try {
        const { studentId, quizId } = req.body; 
        if (!studentId || !quizId) return res.status(400).json({ error: "Data incomplete" });

        let progressDoc = await Progress.findOne({ userId: studentId, completedLessons: new mongoose.Types.ObjectId(quizId) });

        if (progressDoc) {
            progressDoc.completedLessons = progressDoc.completedLessons.filter((id: any) => id.toString() !== quizId);
            if (progressDoc.lessonDetails) {
                progressDoc.lessonDetails = progressDoc.lessonDetails.filter((d: any) => d.lessonId && d.lessonId.toString() !== quizId);
            }
            if (progressDoc.quizScores) {
                progressDoc.quizScores = progressDoc.quizScores.filter((s: any) => s.lessonId && s.lessonId.toString() !== quizId);
            }
            progressDoc.isCompleted = false; 
            await progressDoc.save();

            const courseId = progressDoc.courseId;
            const courseData: any = await Course.findById(courseId).select('modules');
            let totalLessons = 0;
            if (courseData) {
                courseData.modules.forEach((m: any) => {
                    if (m.isActive) m.lessons.forEach((l: any) => { if (l.isActive) totalLessons++; });
                });
            }
            let newProgress = 0;
            if (totalLessons > 0) newProgress = Math.round((progressDoc.completedLessons.length / totalLessons) * 100);
            if (newProgress > 100) newProgress = 100;

            await Enrollment.findOneAndUpdate(
                { user: studentId, course: courseId },
                { $set: { progress: newProgress, isCompleted: newProgress === 100, completedAt: newProgress === 100 ? new Date() : null } }
            );
        }
        res.json({ message: 'Reset berhasil & Progress dihitung ulang' });
    } catch (error: any) { res.status(500).json({ error: error.message }); }
};

// ==========================================
// 6. GROUP CHAT FEATURES
// ==========================================

export const getGroupMessages = async (req: AuthedRequest, res: Response) => {
    try {
        const { id } = req.params; 
        const { type } = req.query; 
        const userId = req.user?.id;

        const course = await Course.findById(id);
        if (!course) return res.status(404).json({ error: 'Course not found' });

        const isFacilitator = course.facilitatorIds.map((f: any) => f.toString()).includes(userId) || req.user?.role === 'SUPER_ADMIN';
        const enrollment = await Enrollment.findOne({ course: id, user: userId, status: { $in: ['active', 'approved'] } });
        const isStudent = !!enrollment;

        if (type === 'internal' && !isFacilitator) return res.status(403).json({ error: 'Akses ditolak.' });
        if (type === 'public' && !isFacilitator && !isStudent) return res.status(403).json({ error: 'Akses ditolak.' });

        const query: any = { course: id, type: type || 'public' };
        const messages = await Message.find(query)
            .populate('sender', 'name avatarUrl role')
            .sort({ createdAt: 1 });

        res.json(messages);
    } catch (error: any) { res.status(500).json({ error: error.message }); }
};

export const sendGroupMessage = async (req: AuthedRequest, res: Response) => {
    try {
        const { id } = req.params; 
        const { text, type, attachment } = req.body; 
        const userId = req.user?.id;

        const course = await Course.findById(id);
        if (!course) return res.status(404).json({ error: 'Course not found' });

        const isFacilitator = course.facilitatorIds.map((f: any) => f.toString()).includes(userId) || req.user?.role === 'SUPER_ADMIN';
        
        if (type === 'internal' && !isFacilitator) return res.status(403).json({ error: 'Hanya Tim Fasilitator.' });

        if (type === 'public') {
            const enrollment = await Enrollment.findOne({ course: id, user: userId, status: { $in: ['active', 'approved'] } });
            if (!isFacilitator && !enrollment) return res.status(403).json({ error: 'Akses dilarang.' });
        }

        const newMessage = new Message({
            course: id,
            sender: userId,
            message: text || '', 
            type: type || 'public',
            isRead: false,
            isGlobal: false,
            attachment: attachment || null 
        });

        await newMessage.save();
        const populatedMsg = await newMessage.populate('sender', 'name avatarUrl role');
        
        res.status(201).json(populatedMsg);
    } catch (error: any) { res.status(500).json({ error: error.message }); }
};
// // // // // // import { Router, Request, Response } from 'express';
// // // // // // import { Course } from '../models/Course'; 
// // // // // // import Enrollment from '../models/Enrollment';
// // // // // // import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth'; 
// // // // // // import { z } from 'zod';
// // // // // // import PDFDocument from 'pdfkit';
// // // // // // import fs from 'fs';
// // // // // // import path from 'path';
// // // // // // // [FIX] HAPUS import fileURLToPath karena tidak dipakai di CommonJS
// // // // // // // import { fileURLToPath } from 'url';

// // // // // // // IMPORT CONTROLLER LENGKAP
// // // // // // import {
// // // // // //     getCourses, getCourseById, createCourse, updateCourse, deleteCourse,
// // // // // //     addModule, updateModule, addLesson, updateLesson, deleteLesson,
// // // // // //     toggleStatus, reorderModules,
// // // // // //     enrollCourse, verifyEnrollment, checkEnrollmentStatus, getCourseParticipants,
// // // // // //     markCompleteLessonByAdmin, resetQuizByAdmin,
// // // // // //     getGroupMessages, sendGroupMessage, updateGradingScheme
// // // // // // } from '../controllers/courseController';

// // // // // // const router = Router();

// // // // // // // [FIX] HAPUS DEFINISI MANUAL INI
// // // // // // // Di mode CommonJS, __filename dan __dirname sudah otomatis ada.
// // // // // // // const __filename = fileURLToPath(import.meta.url);
// // // // // // // const __dirname = path.dirname(__filename);

// // // // // // // ==========================================
// // // // // // // 1. ZOD SCHEMAS
// // // // // // // ==========================================
// // // // // // const lessonSchema = z.object({
// // // // // //   title: z.string().min(1),
// // // // // //   type: z.enum(['video_url', 'upload_doc', 'quiz', 'essay', 'google_classroom', 'lesson', 'pdf', 'download_doc', 'image', 'slide', 'poll', 'virtual_class']).optional(),
// // // // // //   videoUrl: z.string().optional(),
// // // // // //   content: z.string().optional(),
// // // // // //   fileUrl: z.string().optional(),
// // // // // //   jp: z.number().default(0),
// // // // // //   scheduleDate: z.string().optional(),
// // // // // //   facilitator: z.string().optional(),
// // // // // //   facilitatorId: z.string().nullable().optional(), 
// // // // // //   classroomData: z.any().optional(),
// // // // // //   questions: z.array(z.any()).optional(),
// // // // // //   quizDuration: z.number().optional(),
// // // // // //   pollQuestion: z.string().optional(),
// // // // // //   pollOptions: z.array(z.string()).optional(),
// // // // // //   isActive: z.boolean().default(true),
// // // // // //   isMandatory: z.boolean().default(false)
// // // // // // });

// // // // // // const moduleSchema = z.object({
// // // // // //   title: z.string().min(1),
// // // // // //   lessons: z.array(lessonSchema).optional(),
// // // // // //   isActive: z.boolean().default(true),
// // // // // //   isMandatory: z.boolean().default(false),
// // // // // //   facilitatorId: z.string().nullable().optional(),
// // // // // //   jp: z.number().optional(),
// // // // // //   scheduleDate: z.string().optional()
// // // // // // });

// // // // // // const courseSchema = z.object({
// // // // // //   title: z.string().min(3),
// // // // // //   description: z.string().optional(),
// // // // // //   category: z.string().optional(), 
// // // // // //   level: z.string().optional(),
// // // // // //   price: z.number().default(0),
// // // // // //   thumbnailUrl: z.string().optional(),
// // // // // //   startDate: z.string().optional(),
// // // // // //   endDate: z.string().optional(),
// // // // // //   credits: z.number().default(0),
// // // // // //   facilitator: z.string().optional(), 
// // // // // //   facilitatorIds: z.array(z.string()).optional(),
// // // // // //   modules: z.array(moduleSchema).default([]),
// // // // // //   published: z.boolean().default(false), 
// // // // // //   organizer: z.string().default('PMI Pusat'),
// // // // // //   programType: z.string().default('training'),
// // // // // //   competencies: z.array(z.object({ code: z.string(), title: z.string() })).optional(),
// // // // // //   includeCompetenciesInCertificate: z.boolean().optional(),
// // // // // //   certificateConfig: z.object({
// // // // // //       certificateNumber: z.string().optional(),
// // // // // //       startNumber: z.coerce.number().optional().default(1), 
// // // // // //       executionDate: z.string().optional().or(z.date()),
// // // // // //       city: z.string().optional(),
// // // // // //       signatoryName: z.string().optional(),
// // // // // //       signatoryPosition: z.string().optional()
// // // // // //   }).optional(),
// // // // // // });

// // // // // // // ==========================================
// // // // // // // 2. COURSE ROUTES (CRUD)
// // // // // // // ==========================================

// // // // // // router.get('/published', async (req: Request, res: Response) => {
// // // // // //   try {
// // // // // //     const { search } = req.query;
// // // // // //     let query: any = { isPublished: true };
// // // // // //     if (search) query.title = { $regex: search, $options: 'i' };
    
// // // // // //     const courses = await Course.find(query)
// // // // // //         .select('title thumbnailUrl level category price organizer programType facilitatorIds modules isPublished')
// // // // // //         .populate('facilitatorIds', 'name avatarUrl') 
// // // // // //         .sort({ createdAt: -1 });
// // // // // //     res.json({ courses });
// // // // // //   } catch (err: any) { res.status(500).json({ error: err.message }); }
// // // // // // });

// // // // // // router.get('/', requireAuth, getCourses);
// // // // // // router.get('/:id', requireAuth, getCourseById);
// // // // // // router.post('/', requireAuth, requireFacilitator, createCourse);
// // // // // // router.put('/:id', requireAuth, requireFacilitator, updateCourse);
// // // // // // router.delete('/:id', requireAuth, requireFacilitator, deleteCourse);
// // // // // // router.patch('/:id/publish', requireAuth, requireFacilitator, toggleStatus);

// // // // // // // MODULE & LESSON ROUTES
// // // // // // router.post('/:id/modules', requireAuth, requireFacilitator, addModule);
// // // // // // router.put('/:id/modules/:moduleId', requireAuth, requireFacilitator, updateModule); 
// // // // // // router.post('/:courseId/modules/:moduleId/lessons', requireAuth, requireFacilitator, addLesson);
// // // // // // router.put('/:courseId/modules/:moduleId/lessons/:lessonId', requireAuth, requireFacilitator, updateLesson);
// // // // // // router.delete('/:courseId/modules/:moduleId/lessons/:lessonId', requireAuth, requireFacilitator, deleteLesson);

// // // // // // router.patch('/:id/toggle-status', requireAuth, requireFacilitator, toggleStatus);
// // // // // // router.patch('/:id/reorder', requireAuth, requireFacilitator, reorderModules);

// // // // // // // ==========================================
// // // // // // // 3. PARTICIPANT & ENROLLMENT
// // // // // // // ==========================================

// // // // // // router.post('/:courseId/enroll', requireAuth, enrollCourse);
// // // // // // router.get('/:courseId/check-enrollment', requireAuth, checkEnrollmentStatus);
// // // // // // router.get('/:courseId/enrollment', requireAuth, checkEnrollmentStatus); // Alias for consistency
// // // // // // router.get('/enrollments/check/:courseId', requireAuth, checkEnrollmentStatus); // Additional alias

// // // // // // router.get('/:id/participants', requireAuth, getCourseParticipants);
// // // // // // router.post('/verify-enrollment', requireAuth, requireFacilitator, verifyEnrollment);
// // // // // // router.post('/mark-complete-lesson', requireAuth, requireFacilitator, markCompleteLessonByAdmin);
// // // // // // router.post('/reset-quiz', requireAuth, requireFacilitator, resetQuizByAdmin);

// // // // // // // ==========================================
// // // // // // // 4. GROUP CHAT ROUTES
// // // // // // // ==========================================
// // // // // // router.get('/:id/groups/messages', requireAuth, getGroupMessages);
// // // // // // router.post('/:id/groups/send', requireAuth, sendGroupMessage);

// // // // // // // ==========================================
// // // // // // // 5. PREVIEW CERTIFICATE & GRADING
// // // // // // // ==========================================
// // // // // // router.post('/certificate/preview', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // //     try {
// // // // // //         let { certificateConfig, competencies, courseId, includeCompetenciesInCertificate } = req.body;
// // // // // //         if ((!competencies || competencies.length === 0) && courseId) {
// // // // // //             try {
// // // // // //                 const course = await Course.findById(courseId);
// // // // // //                 if (course && course.competencies && course.competencies.length > 0) {
// // // // // //                     competencies = course.competencies;
// // // // // //                 }
// // // // // //             } catch (err) { console.warn("Fetch DB fail:", err); }
// // // // // //         }

// // // // // //         const doc = new PDFDocument({ size: 'A4', layout: 'portrait', margin: 0 });
// // // // // //         res.setHeader('Content-Type', 'application/pdf');
// // // // // //         res.setHeader('Content-Disposition', 'inline; filename=draft-sertifikat.pdf');
// // // // // //         doc.pipe(res);

// // // // // //         // --- HALAMAN 1: DEPAN ---
// // // // // //         const totalWidth = 595; const headerHeight = 50; const segmentWidth = totalWidth / 4;
// // // // // //         doc.rect(0, 0, segmentWidth, headerHeight).fill('#D50000');
// // // // // //         doc.rect(segmentWidth, 0, segmentWidth, headerHeight).fill('#E65100');
// // // // // //         doc.rect(segmentWidth * 2, 0, segmentWidth, headerHeight).fill('#FF8A65');
// // // // // //         doc.rect(segmentWidth * 3, 0, segmentWidth, headerHeight).fill('#FFCCBC');
        
// // // // // //         // [FIX] Menggunakan __dirname secara langsung (bawaan CommonJS)
// // // // // //         const logoPath = path.join(__dirname, '../../assets/logo-pmi.png');
// // // // // //         if (fs.existsSync(logoPath)) { doc.image(logoPath, (totalWidth / 2) - 40, 70, { width: 80 }); } 
// // // // // //         else { doc.fillColor('#D50000').fontSize(12).text('[LOGO PMI]', 0, 90, { align: 'center' }); }

// // // // // //         doc.moveDown(5); 
// // // // // //         const startY = 160;
// // // // // //         doc.fillColor('black');
// // // // // //         doc.font('Helvetica-Bold').fontSize(32).text('SERTIFIKAT', 0, startY + 30, { align: 'center', characterSpacing: 2 });
// // // // // //         doc.font('Helvetica-Oblique').fontSize(14).text('Certificate', 0, startY + 65, { align: 'center' });

// // // // // //         doc.end();
// // // // // //     } catch (error: any) {
// // // // // //         console.error("PDF Preview Error:", error);
// // // // // //         res.status(500).send("Gagal membuat preview sertifikat: " + error.message);
// // // // // //     }
// // // // // // });

// // // // // // // Route untuk update Grading Scheme
// // // // // // router.put('/:id/grading', requireAuth, requireFacilitator, updateGradingScheme);

// // // // // // export default router;

// // // // // import { Router, Request, Response } from 'express';
// // // // // import { Course } from '../models/Course'; 
// // // // // import Enrollment from '../models/Enrollment';
// // // // // import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth'; 
// // // // // import { z } from 'zod';
// // // // // import PDFDocument from 'pdfkit';
// // // // // import fs from 'fs';
// // // // // import path from 'path';

// // // // // // IMPORT CONTROLLER LENGKAP (Sesuai Controller Anda)
// // // // // import {
// // // // //     getCourses, getCourseById, createCourse, updateCourse, deleteCourse,
// // // // //     addModule, updateModule, addLesson, updateLesson, deleteLesson,
// // // // //     toggleStatus, reorderModules,
// // // // //     enrollCourse, verifyEnrollment, checkEnrollmentStatus, getCourseParticipants,
// // // // //     markCompleteLessonByAdmin, resetQuizByAdmin,
// // // // //     getGroupMessages, sendGroupMessage, updateGradingScheme
// // // // // } from '../controllers/courseController';

// // // // // const router = Router();

// // // // // // ==========================================
// // // // // // 1. ZOD SCHEMAS (Dikembalikan)
// // // // // // ==========================================
// // // // // const lessonSchema = z.object({
// // // // //   title: z.string().min(1),
// // // // //   type: z.enum(['video_url', 'upload_doc', 'quiz', 'essay', 'google_classroom', 'lesson', 'pdf', 'download_doc', 'image', 'slide', 'poll', 'virtual_class']).optional(),
// // // // //   videoUrl: z.string().optional(),
// // // // //   content: z.string().optional(),
// // // // //   fileUrl: z.string().optional(),
// // // // //   jp: z.number().default(0),
// // // // //   scheduleDate: z.string().optional(),
// // // // //   facilitator: z.string().optional(),
// // // // //   facilitatorId: z.string().nullable().optional(), 
// // // // //   classroomData: z.any().optional(),
// // // // //   questions: z.array(z.any()).optional(),
// // // // //   quizDuration: z.number().optional(),
// // // // //   pollQuestion: z.string().optional(),
// // // // //   pollOptions: z.array(z.string()).optional(),
// // // // //   isActive: z.boolean().default(true),
// // // // //   isMandatory: z.boolean().default(false)
// // // // // });

// // // // // const moduleSchema = z.object({
// // // // //   title: z.string().min(1),
// // // // //   lessons: z.array(lessonSchema).optional(),
// // // // //   isActive: z.boolean().default(true),
// // // // //   isMandatory: z.boolean().default(false),
// // // // //   facilitatorId: z.string().nullable().optional(),
// // // // //   jp: z.number().optional(),
// // // // //   scheduleDate: z.string().optional()
// // // // // });

// // // // // const courseSchema = z.object({
// // // // //   title: z.string().min(3),
// // // // //   description: z.string().optional(),
// // // // //   category: z.string().optional(), 
// // // // //   level: z.string().optional(),
// // // // //   price: z.number().default(0),
// // // // //   thumbnailUrl: z.string().optional(),
// // // // //   startDate: z.string().optional(),
// // // // //   endDate: z.string().optional(),
// // // // //   credits: z.number().default(0),
// // // // //   facilitator: z.string().optional(), 
// // // // //   facilitatorIds: z.array(z.string()).optional(),
// // // // //   modules: z.array(moduleSchema).default([]),
// // // // //   published: z.boolean().default(false), 
// // // // //   organizer: z.string().default('PMI Pusat'),
// // // // //   programType: z.string().default('training'),
// // // // //   competencies: z.array(z.object({ code: z.string(), title: z.string() })).optional(),
// // // // //   includeCompetenciesInCertificate: z.boolean().optional(),
// // // // //   certificateConfig: z.object({
// // // // //       certificateNumber: z.string().optional(),
// // // // //       startNumber: z.coerce.number().optional().default(1), 
// // // // //       executionDate: z.string().optional().or(z.date()),
// // // // //       city: z.string().optional(),
// // // // //       signatoryName: z.string().optional(),
// // // // //       signatoryPosition: z.string().optional()
// // // // //   }).optional(),
// // // // // });

// // // // // // ==========================================
// // // // // // 2. COURSE ROUTES (CRUD)
// // // // // // ==========================================

// // // // // router.get('/published', async (req: Request, res: Response) => {
// // // // //   try {
// // // // //     const { search } = req.query;
// // // // //     let query: any = { isPublished: true };
// // // // //     if (search) query.title = { $regex: search, $options: 'i' };
    
// // // // //     const courses = await Course.find(query)
// // // // //         .select('title thumbnailUrl level category price organizer programType facilitatorIds modules isPublished')
// // // // //         .populate('facilitatorIds', 'name avatarUrl') 
// // // // //         .sort({ createdAt: -1 });
// // // // //     res.json({ courses });
// // // // //   } catch (err: any) { res.status(500).json({ error: err.message }); }
// // // // // });

// // // // // router.get('/', requireAuth, getCourses);
// // // // // router.get('/:id', requireAuth, getCourseById);
// // // // // router.post('/', requireAuth, requireFacilitator, createCourse);
// // // // // router.put('/:id', requireAuth, requireFacilitator, updateCourse);
// // // // // router.delete('/:id', requireAuth, requireFacilitator, deleteCourse);
// // // // // router.patch('/:id/publish', requireAuth, requireFacilitator, toggleStatus);

// // // // // // MODULE & LESSON ROUTES
// // // // // router.post('/:id/modules', requireAuth, requireFacilitator, addModule);
// // // // // router.put('/:id/modules/:moduleId', requireAuth, requireFacilitator, updateModule); 
// // // // // router.post('/:courseId/modules/:moduleId/lessons', requireAuth, requireFacilitator, addLesson);
// // // // // router.put('/:courseId/modules/:moduleId/lessons/:lessonId', requireAuth, requireFacilitator, updateLesson);
// // // // // router.delete('/:courseId/modules/:moduleId/lessons/:lessonId', requireAuth, requireFacilitator, deleteLesson);

// // // // // router.patch('/:id/toggle-status', requireAuth, requireFacilitator, toggleStatus);
// // // // // router.patch('/:id/reorder', requireAuth, requireFacilitator, reorderModules);

// // // // // // ==========================================
// // // // // // 3. PARTICIPANT & ENROLLMENT
// // // // // // ==========================================

// // // // // router.post('/:courseId/enroll', requireAuth, enrollCourse);
// // // // // router.get('/:courseId/check-enrollment', requireAuth, checkEnrollmentStatus);
// // // // // router.get('/:courseId/enrollment', requireAuth, checkEnrollmentStatus);
// // // // // router.get('/enrollments/check/:courseId', requireAuth, checkEnrollmentStatus); 

// // // // // router.get('/:id/participants', requireAuth, getCourseParticipants);
// // // // // router.post('/verify-enrollment', requireAuth, requireFacilitator, verifyEnrollment);
// // // // // router.post('/mark-complete-lesson', requireAuth, requireFacilitator, markCompleteLessonByAdmin);
// // // // // router.post('/reset-quiz', requireAuth, requireFacilitator, resetQuizByAdmin);

// // // // // // ==========================================
// // // // // // 4. GROUP CHAT ROUTES
// // // // // // ==========================================
// // // // // router.get('/:id/groups/messages', requireAuth, getGroupMessages);
// // // // // router.post('/:id/groups/send', requireAuth, sendGroupMessage);

// // // // // // ==========================================
// // // // // // 5. PREVIEW CERTIFICATE & GRADING
// // // // // // ==========================================
// // // // // router.post('/certificate/preview', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // //     try {
// // // // //         let { certificateConfig, competencies, courseId, includeCompetenciesInCertificate } = req.body;
// // // // //         if ((!competencies || competencies.length === 0) && courseId) {
// // // // //             try {
// // // // //                 const course = await Course.findById(courseId);
// // // // //                 if (course && course.competencies && course.competencies.length > 0) {
// // // // //                     competencies = course.competencies;
// // // // //                 }
// // // // //             } catch (err) { console.warn("Fetch DB fail:", err); }
// // // // //         }

// // // // //         const doc = new PDFDocument({ size: 'A4', layout: 'portrait', margin: 0 });
// // // // //         res.setHeader('Content-Type', 'application/pdf');
// // // // //         res.setHeader('Content-Disposition', 'inline; filename=draft-sertifikat.pdf');
// // // // //         doc.pipe(res);

// // // // //         // --- HALAMAN 1: DEPAN ---
// // // // //         const totalWidth = 595; const headerHeight = 50; const segmentWidth = totalWidth / 4;
// // // // //         doc.rect(0, 0, segmentWidth, headerHeight).fill('#D50000');
// // // // //         doc.rect(segmentWidth, 0, segmentWidth, headerHeight).fill('#E65100');
// // // // //         doc.rect(segmentWidth * 2, 0, segmentWidth, headerHeight).fill('#FF8A65');
// // // // //         doc.rect(segmentWidth * 3, 0, segmentWidth, headerHeight).fill('#FFCCBC');
        
// // // // //         // FIX: Path Logo
// // // // //         const logoPath = path.join(__dirname, '../../assets/logo-pmi.png');
// // // // //         if (fs.existsSync(logoPath)) { doc.image(logoPath, (totalWidth / 2) - 40, 70, { width: 80 }); } 
// // // // //         else { doc.fillColor('#D50000').fontSize(12).text('[LOGO PMI]', 0, 90, { align: 'center' }); }

// // // // //         doc.moveDown(5); 
// // // // //         const startY = 160;
// // // // //         doc.fillColor('black');
// // // // //         doc.font('Helvetica-Bold').fontSize(32).text('SERTIFIKAT', 0, startY + 30, { align: 'center', characterSpacing: 2 });
// // // // //         doc.font('Helvetica-Oblique').fontSize(14).text('Certificate', 0, startY + 65, { align: 'center' });

// // // // //         doc.end();
// // // // //     } catch (error: any) {
// // // // //         console.error("PDF Preview Error:", error);
// // // // //         res.status(500).send("Gagal membuat preview sertifikat: " + error.message);
// // // // //     }
// // // // // });

// // // // // // Route untuk update Grading Scheme
// // // // // router.put('/:id/grading', requireAuth, requireFacilitator, updateGradingScheme);

// // // // // export default router;

// // // // import { Router, Request, Response } from 'express';
// // // // import { Course } from '../models/Course'; 
// // // // import Enrollment from '../models/Enrollment';
// // // // import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth'; 
// // // // import { z } from 'zod';
// // // // import PDFDocument from 'pdfkit';
// // // // import fs from 'fs';
// // // // import path from 'path';

// // // // // IMPORT CONTROLLER LENGKAP (Sesuai Controller Anda)
// // // // import {
// // // //     getCourses, getCourseById, createCourse, updateCourse, deleteCourse,
// // // //     addModule, updateModule, addLesson, updateLesson, deleteLesson,
// // // //     toggleStatus, reorderModules,
// // // //     enrollCourse, verifyEnrollment, checkEnrollmentStatus, getCourseParticipants,
// // // //     markCompleteLessonByAdmin, resetQuizByAdmin,
// // // //     getGroupMessages, sendGroupMessage, updateGradingScheme
// // // // } from '../controllers/courseController';

// // // // const router = Router();

// // // // // ==========================================
// // // // // 1. ZOD SCHEMAS (UPDATED)
// // // // // ==========================================
// // // // const lessonSchema = z.object({
// // // //   title: z.string().min(1),
// // // //   type: z.enum(['video_url', 'upload_doc', 'quiz', 'essay', 'google_classroom', 'lesson', 'pdf', 'download_doc', 'image', 'slide', 'poll', 'virtual_class']).optional(),
// // // //   videoUrl: z.string().optional(),
// // // //   content: z.string().optional(),
// // // //   fileUrl: z.string().optional(),
// // // //   jp: z.number().default(0),
// // // //   scheduleDate: z.string().optional(),
// // // //   facilitator: z.string().optional(),
// // // //   facilitatorId: z.string().nullable().optional(), 
// // // //   classroomData: z.any().optional(),
// // // //   questions: z.array(z.any()).optional(),
// // // //   quizDuration: z.number().optional(),
// // // //   pollQuestion: z.string().optional(),
// // // //   pollOptions: z.array(z.string()).optional(),
// // // //   isActive: z.boolean().default(true),
// // // //   isMandatory: z.boolean().default(false)
// // // // });

// // // // const moduleSchema = z.object({
// // // //   title: z.string().min(1),
// // // //   lessons: z.array(lessonSchema).optional(),
// // // //   isActive: z.boolean().default(true),
// // // //   isMandatory: z.boolean().default(false),
// // // //   facilitatorId: z.string().nullable().optional(),
// // // //   jp: z.number().optional(),
// // // //   scheduleDate: z.string().optional()
// // // // });

// // // // // [CRITICAL UPDATE] Menambahkan field baru ke Course Schema Zod
// // // // const courseSchema = z.object({
// // // //   title: z.string().min(3),
// // // //   description: z.string().optional(),
// // // //   category: z.string().optional(), 
// // // //   level: z.string().optional(),
  
// // // //   // Update: Field baru dari Frontend
// // // //   price: z.number().default(0),
// // // //   estimatedDuration: z.number().default(0),
// // // //   totalJp: z.number().default(0),
  
// // // //   thumbnailUrl: z.string().optional(),
// // // //   promoVideoUrl: z.string().optional(), // Baru
  
// // // //   startDate: z.string().optional(), // Legacy
// // // //   endDate: z.string().optional(),   // Legacy
// // // //   credits: z.number().default(0),
  
// // // //   facilitator: z.string().optional(), 
// // // //   facilitatorIds: z.array(z.string()).optional(),
  
// // // //   modules: z.array(moduleSchema).default([]),
// // // //   published: z.boolean().default(false), 
// // // //   organizer: z.string().default('PMI Pusat'),
// // // //   programType: z.string().default('training'),
// // // //   hasCertificate: z.boolean().default(true), // Baru

// // // //   // Baru: Periode
// // // //   registrationPeriod: z.object({
// // // //       isForever: z.boolean().default(true),
// // // //       startDate: z.string().nullable().optional(),
// // // //       endDate: z.string().nullable().optional()
// // // //   }).optional(),

// // // //   executionPeriod: z.object({
// // // //       isForever: z.boolean().default(true),
// // // //       startDate: z.string().nullable().optional(),
// // // //       endDate: z.string().nullable().optional()
// // // //   }).optional(),

// // // //   // Baru: Config Pendaftaran
// // // //   registrationMethod: z.string().default('auto'),
// // // //   registrationConfig: z.object({
// // // //       requireDocs: z.boolean().default(true),
// // // //       templates: z.array(z.object({
// // // //           title: z.string(),
// // // //           url: z.string()
// // // //       })).default([])
// // // //   }).optional(),

// // // //   // Baru: Fasilitas & PIC
// // // //   facilities: z.array(z.string()).default([]),
// // // //   pics: z.array(z.object({
// // // //       name: z.string().optional(),
// // // //       pmiStatus: z.string().optional(),
// // // //       email: z.string().optional()
// // // //   })).default([]),
  
// // // //   creatorInfo: z.object({
// // // //       name: z.string().optional(),
// // // //       email: z.string().optional(),
// // // //       contact: z.string().optional()
// // // //   }).optional(),

// // // //   competencies: z.array(z.object({ code: z.string(), title: z.string() })).optional(),
// // // //   includeCompetenciesInCertificate: z.boolean().optional(),
  
// // // //   certificateConfig: z.object({
// // // //       certificateNumber: z.string().optional(),
// // // //       startNumber: z.coerce.number().optional().default(1), 
// // // //       executionDate: z.string().optional().or(z.date()),
// // // //       city: z.string().optional(),
// // // //       signatoryName: z.string().optional(),
// // // //       signatoryPosition: z.string().optional()
// // // //   }).optional(),
// // // // });

// // // // // ==========================================
// // // // // 2. COURSE ROUTES (CRUD)
// // // // // ==========================================

// // // // router.get('/published', async (req: Request, res: Response) => {
// // // //   try {
// // // //     const { search } = req.query;
// // // //     let query: any = { isPublished: true };
// // // //     if (search) query.title = { $regex: search, $options: 'i' };
    
// // // //     const courses = await Course.find(query)
// // // //         .select('title thumbnailUrl level category price organizer programType facilitatorIds modules isPublished')
// // // //         .populate('facilitatorIds', 'name avatarUrl') 
// // // //         .sort({ createdAt: -1 });
// // // //     res.json({ courses });
// // // //   } catch (err: any) { res.status(500).json({ error: err.message }); }
// // // // });

// // // // router.get('/', requireAuth, getCourses);
// // // // router.get('/:id', requireAuth, getCourseById);

// // // // // [FIX] Middleware Zod Validation bisa ditambahkan di sini jika Anda menggunakannya
// // // // // Tapi karena Anda meng-handle validasi di controller biasanya, pastikan controller menerima semua body
// // // // router.post('/', requireAuth, requireFacilitator, createCourse);
// // // // router.put('/:id', requireAuth, requireFacilitator, updateCourse);

// // // // router.delete('/:id', requireAuth, requireFacilitator, deleteCourse);
// // // // router.patch('/:id/publish', requireAuth, requireFacilitator, toggleStatus);

// // // // // MODULE & LESSON ROUTES
// // // // router.post('/:id/modules', requireAuth, requireFacilitator, addModule);
// // // // router.put('/:id/modules/:moduleId', requireAuth, requireFacilitator, updateModule); 
// // // // router.post('/:courseId/modules/:moduleId/lessons', requireAuth, requireFacilitator, addLesson);
// // // // router.put('/:courseId/modules/:moduleId/lessons/:lessonId', requireAuth, requireFacilitator, updateLesson);
// // // // router.delete('/:courseId/modules/:moduleId/lessons/:lessonId', requireAuth, requireFacilitator, deleteLesson);

// // // // router.patch('/:id/toggle-status', requireAuth, requireFacilitator, toggleStatus);
// // // // router.patch('/:id/reorder', requireAuth, requireFacilitator, reorderModules);

// // // // // ==========================================
// // // // // 3. PARTICIPANT & ENROLLMENT
// // // // // ==========================================

// // // // router.post('/:courseId/enroll', requireAuth, enrollCourse);
// // // // router.get('/:courseId/check-enrollment', requireAuth, checkEnrollmentStatus);
// // // // router.get('/:courseId/enrollment', requireAuth, checkEnrollmentStatus);
// // // // router.get('/enrollments/check/:courseId', requireAuth, checkEnrollmentStatus); 

// // // // router.get('/:id/participants', requireAuth, getCourseParticipants);
// // // // router.post('/verify-enrollment', requireAuth, requireFacilitator, verifyEnrollment);
// // // // router.post('/mark-complete-lesson', requireAuth, requireFacilitator, markCompleteLessonByAdmin);
// // // // router.post('/reset-quiz', requireAuth, requireFacilitator, resetQuizByAdmin);

// // // // // ==========================================
// // // // // 4. GROUP CHAT ROUTES
// // // // // ==========================================
// // // // router.get('/:id/groups/messages', requireAuth, getGroupMessages);
// // // // router.post('/:id/groups/send', requireAuth, sendGroupMessage);

// // // // // ==========================================
// // // // // 5. PREVIEW CERTIFICATE & GRADING
// // // // // ==========================================
// // // // router.post('/certificate/preview', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // //     try {
// // // //         let { certificateConfig, competencies, courseId, includeCompetenciesInCertificate } = req.body;
// // // //         if ((!competencies || competencies.length === 0) && courseId) {
// // // //             try {
// // // //                 const course = await Course.findById(courseId);
// // // //                 if (course && course.competencies && course.competencies.length > 0) {
// // // //                     competencies = course.competencies;
// // // //                 }
// // // //             } catch (err) { console.warn("Fetch DB fail:", err); }
// // // //         }

// // // //         const doc = new PDFDocument({ size: 'A4', layout: 'portrait', margin: 0 });
// // // //         res.setHeader('Content-Type', 'application/pdf');
// // // //         res.setHeader('Content-Disposition', 'inline; filename=draft-sertifikat.pdf');
// // // //         doc.pipe(res);

// // // //         // --- HALAMAN 1: DEPAN ---
// // // //         const totalWidth = 595; const headerHeight = 50; const segmentWidth = totalWidth / 4;
// // // //         doc.rect(0, 0, segmentWidth, headerHeight).fill('#D50000');
// // // //         doc.rect(segmentWidth, 0, segmentWidth, headerHeight).fill('#E65100');
// // // //         doc.rect(segmentWidth * 2, 0, segmentWidth, headerHeight).fill('#FF8A65');
// // // //         doc.rect(segmentWidth * 3, 0, segmentWidth, headerHeight).fill('#FFCCBC');
        
// // // //         const logoPath = path.join(__dirname, '../../assets/logo-pmi.png');
// // // //         if (fs.existsSync(logoPath)) { doc.image(logoPath, (totalWidth / 2) - 40, 70, { width: 80 }); } 
// // // //         else { doc.fillColor('#D50000').fontSize(12).text('[LOGO PMI]', 0, 90, { align: 'center' }); }

// // // //         doc.moveDown(5); 
// // // //         const startY = 160;
// // // //         doc.fillColor('black');
// // // //         doc.font('Helvetica-Bold').fontSize(32).text('SERTIFIKAT', 0, startY + 30, { align: 'center', characterSpacing: 2 });
// // // //         doc.font('Helvetica-Oblique').fontSize(14).text('Certificate', 0, startY + 65, { align: 'center' });

// // // //         doc.end();
// // // //     } catch (error: any) {
// // // //         console.error("PDF Preview Error:", error);
// // // //         res.status(500).send("Gagal membuat preview sertifikat: " + error.message);
// // // //     }
// // // // });

// // // // // Route untuk update Grading Scheme
// // // // router.put('/:id/grading', requireAuth, requireFacilitator, updateGradingScheme);

// // // // export default router;



// // // import { Router } from 'express';
// // // import { requireAuth, requireFacilitator, requirePermission, requireCourseOwnership, AuthedRequest } from '../middleware/auth';
// // // import { 
// // //     getCourses, // [FIX] Diubah dari getAllCourses
// // //     getCourseById, 
// // //     createCourse, 
// // //     updateCourse, 
// // //     deleteCourse, 
// // //     addModule, 
// // //     addLesson,
// // //     togglePublishCourse, // Pastikan ini ada di controller
// // //     deleteModule,        // Pastikan ini ada di controller
// // //     updateModule,
// // //     deleteLesson,
// // //     updateLesson,
// // //     getCourseParticipants
// // // } from '../controllers/courseController';

// // // const router = Router();

// // // // --- PUBLIC ROUTES ---
// // // router.get('/', getCourses); // [FIX] Menggunakan getCourses
// // // router.get('/:id', getCourseById); 

// // // // --- PROTECTED ROUTES (COURSE MANAGEMENT) ---

// // // // 1. CREATE COURSE
// // // router.post('/', requireAuth, requirePermission('course.create'), createCourse);

// // // // 2. UPDATE COURSE 
// // // router.patch('/:id', 
// // //     requireAuth, 
// // //     requirePermission('course.update_own'), 
// // //     requireCourseOwnership, 
// // //     updateCourse
// // // );

// // // // 3. PUBLISH / UNPUBLISH
// // // router.patch('/:id/publish', 
// // //     requireAuth, 
// // //     requirePermission('course.update_own'), 
// // //     requireCourseOwnership, 
// // //     togglePublishCourse
// // // );

// // // // 4. DELETE COURSE
// // // router.delete('/:id', 
// // //     requireAuth, 
// // //     requirePermission('course.delete'), 
// // //     requireCourseOwnership, 
// // //     deleteCourse
// // // );

// // // // --- MODULE MANAGEMENT ---

// // // // Add Module
// // // router.post('/:id/modules', 
// // //     requireAuth, 
// // //     requirePermission('course.manage_content'), 
// // //     requireCourseOwnership, 
// // //     addModule
// // // );

// // // // Update Module
// // // router.patch('/:id/modules/:moduleId', 
// // //     requireAuth, 
// // //     requirePermission('course.manage_content'), 
// // //     requireCourseOwnership, 
// // //     updateModule
// // // );

// // // // Delete Module
// // // router.delete('/:id/modules/:moduleId', 
// // //     requireAuth, 
// // //     requirePermission('course.manage_content'), 
// // //     requireCourseOwnership, 
// // //     deleteModule
// // // );

// // // // --- LESSON MANAGEMENT ---

// // // // Add Lesson
// // // router.post('/:id/modules/:moduleId/lessons', 
// // //     requireAuth, 
// // //     requirePermission('course.manage_content'), 
// // //     requireCourseOwnership, 
// // //     addLesson
// // // );

// // // // Update Lesson
// // // router.patch('/:id/modules/:moduleId/lessons/:lessonId', 
// // //     requireAuth, 
// // //     requirePermission('course.manage_content'), 
// // //     requireCourseOwnership, 
// // //     updateLesson
// // // );

// // // // Delete Lesson
// // // router.delete('/:id/modules/:moduleId/lessons/:lessonId', 
// // //     requireAuth, 
// // //     requirePermission('course.manage_content'), 
// // //     requireCourseOwnership, 
// // //     deleteLesson
// // // );

// // // // --- PARTICIPANTS ---
// // // router.get('/:id/participants', 
// // //     requireAuth, 
// // //     requirePermission('course.access'),
// // //     getCourseParticipants
// // // );

// // // export default router;






// // import { Router } from 'express';
// // import { requireAuth, requirePermission, requireCourseOwnership } from '../middleware/auth';
// // import { applyCourseScope } from '../middleware/scope'; // Middleware Scope Baru
// // import { 
// //     getCourses, 
// //     getCourseById, 
// //     createCourse, 
// //     updateCourse, 
// //     deleteCourse, 
// //     addModule, 
// //     addLesson,
// //     togglePublishCourse, 
// //     deleteModule, 
// //     updateModule,
// //     deleteLesson,
// //     updateLesson,
// //     getCourseParticipants
// // } from '../controllers/courseController';

// // const router = Router();

// // // --- PUBLIC ROUTES (FILTERED BY SCOPE) ---
// // // Middleware applyCourseScope akan menyuntikkan filter berdasarkan wilayah admin
// // router.get('/', requireAuth, applyCourseScope, getCourses); 
// // router.get('/:id', requireAuth, getCourseById); 

// // // --- PROTECTED ROUTES (COURSE MANAGEMENT) ---

// // // 1. CREATE COURSE
// // router.post('/', requireAuth, requirePermission('course.create'), createCourse);

// // // 2. UPDATE COURSE 
// // router.patch('/:id', 
// //     requireAuth, 
// //     requirePermission('course.update_own'), 
// //     requireCourseOwnership, 
// //     updateCourse
// // );

// // // 3. PUBLISH / UNPUBLISH
// // router.patch('/:id/publish', 
// //     requireAuth, 
// //     requirePermission('course.update_own'), 
// //     requireCourseOwnership, 
// //     togglePublishCourse
// // );

// // // 4. DELETE COURSE
// // router.delete('/:id', 
// //     requireAuth, 
// //     requirePermission('course.delete'), 
// //     requireCourseOwnership, 
// //     deleteCourse
// // );

// // // --- MODULE MANAGEMENT ---

// // // Add Module
// // router.post('/:id/modules', 
// //     requireAuth, 
// //     requirePermission('course.manage_content'), 
// //     requireCourseOwnership, 
// //     addModule
// // );

// // // Update Module
// // router.patch('/:id/modules/:moduleId', 
// //     requireAuth, 
// //     requirePermission('course.manage_content'), 
// //     requireCourseOwnership, 
// //     updateModule
// // );

// // // Delete Module
// // router.delete('/:id/modules/:moduleId', 
// //     requireAuth, 
// //     requirePermission('course.manage_content'), 
// //     requireCourseOwnership, 
// //     deleteModule
// // );

// // // --- LESSON MANAGEMENT ---

// // // Add Lesson
// // router.post('/:id/modules/:moduleId/lessons', 
// //     requireAuth, 
// //     requirePermission('course.manage_content'), 
// //     requireCourseOwnership, 
// //     addLesson
// // );

// // // Update Lesson
// // router.patch('/:id/modules/:moduleId/lessons/:lessonId', 
// //     requireAuth, 
// //     requirePermission('course.manage_content'), 
// //     requireCourseOwnership, 
// //     updateLesson
// // );

// // // Delete Lesson
// // router.delete('/:id/modules/:moduleId/lessons/:lessonId', 
// //     requireAuth, 
// //     requirePermission('course.manage_content'), 
// //     requireCourseOwnership, 
// //     deleteLesson
// // );

// // // --- PARTICIPANTS ---
// // router.get('/:id/participants', 
// //     requireAuth, 
// //     requirePermission('course.access'),
// //     getCourseParticipants
// // );

// // export default router;





// import { Router } from 'express';
// import { requireAuth, requirePermission, requireCourseOwnership } from '../middleware/auth';
// import { applyCourseScope } from '../middleware/scope';
// import { 
//     getCourses, 
//     getCourseById, 
//     createCourse, 
//     updateCourse, 
//     deleteCourse, 
//     addModule, 
//     addLesson,
//     togglePublishCourse, 
//     deleteModule, 
//     updateModule,
//     deleteLesson,
//     updateLesson,
//     getCourseParticipants,
//     updateCourseStatus // [IMPORT FUNGSI BARU]
// } from '../controllers/courseController';

// const router = Router();

// // --- PUBLIC/READ ---
// router.get('/', requireAuth, applyCourseScope, getCourses); 
// router.get('/:id', requireAuth, getCourseById); 

// // --- PROTECTED ROUTES ---

// // Create
// router.post('/', requireAuth, requirePermission('course.create'), createCourse);

// // [FIX] ROUTE APPROVAL (STATUS)
// // Menggunakan permission 'verify_course_submission' (biasanya untuk admin)
// router.patch('/:id/status', requireAuth, requirePermission('verify_course_submission'), updateCourseStatus);

// // Update (Content)
// router.patch('/:id', 
//     requireAuth, 
//     requirePermission('course.update_own'), 
//     requireCourseOwnership, 
//     updateCourse
// );

// // Publish
// router.patch('/:id/publish', 
//     requireAuth, 
//     requirePermission('course.update_own'), 
//     requireCourseOwnership, 
//     togglePublishCourse
// );

// // Delete
// router.delete('/:id', 
//     requireAuth, 
//     requirePermission('course.delete'), 
//     requireCourseOwnership, 
//     deleteCourse
// );

// // --- MODULES ---
// router.post('/:id/modules', requireAuth, requirePermission('course.manage_content'), requireCourseOwnership, addModule);
// router.patch('/:id/modules/:moduleId', requireAuth, requirePermission('course.manage_content'), requireCourseOwnership, updateModule);
// router.delete('/:id/modules/:moduleId', requireAuth, requirePermission('course.manage_content'), requireCourseOwnership, deleteModule);

// // --- LESSONS ---
// router.post('/:id/modules/:moduleId/lessons', requireAuth, requirePermission('course.manage_content'), requireCourseOwnership, addLesson);
// router.patch('/:id/modules/:moduleId/lessons/:lessonId', requireAuth, requirePermission('course.manage_content'), requireCourseOwnership, updateLesson);
// router.delete('/:id/modules/:moduleId/lessons/:lessonId', requireAuth, requirePermission('course.manage_content'), requireCourseOwnership, deleteLesson);

// // --- OTHER ---
// router.get('/:id/participants', requireAuth, requirePermission('course.access'), getCourseParticipants);

// export default router;


import { Router } from 'express';
import { requireAuth, requirePermission, requireCourseOwnership } from '../middleware/auth';
import { applyCourseScope } from '../middleware/scope';
import { 
    getCourses, 
    getCourseById, 
    createCourse, 
    updateCourse, 
    deleteCourse, 
    addModule, 
    addLesson,
    togglePublishCourse, 
    deleteModule, 
    updateModule, 
    deleteLesson, 
    updateLesson, 
    getCourseParticipants,
    updateCourseStatus,
    enrollCourse, 
    checkEnrollmentStatus,
    getGroupMessages,   // [BARU] Pastikan ini terimport
    sendGroupMessage    // [BARU] Pastikan ini terimport
} from '../controllers/courseController';

const router = Router();

// --- PUBLIC/READ ---
router.get('/', requireAuth, applyCourseScope, getCourses); 
router.get('/:id', requireAuth, getCourseById); 

// --- ENROLLMENT ROUTES ---
router.post('/:courseId/enroll', requireAuth, enrollCourse);
router.get('/:courseId/enrollment-status', requireAuth, checkEnrollmentStatus);

// --- PROTECTED ROUTES ---

// Create
router.post('/', requireAuth, requirePermission('course.create'), createCourse);

// Status Approval
router.patch('/:id/status', requireAuth, requirePermission('verify_course_submission'), updateCourseStatus);

// Update (Content)
router.patch('/:id', 
    requireAuth, 
    requirePermission('course.update_own'), 
    requireCourseOwnership, 
    updateCourse
);

// Publish
router.patch('/:id/publish', 
    requireAuth, 
    requirePermission('course.update_own'), 
    requireCourseOwnership, 
    togglePublishCourse
);

// Delete
router.delete('/:id', 
    requireAuth, 
    requirePermission('course.delete'), 
    requireCourseOwnership, 
    deleteCourse
);

// --- MODULES ---
router.post('/:id/modules', requireAuth, requirePermission('course.manage_content'), requireCourseOwnership, addModule);
router.patch('/:id/modules/:moduleId', requireAuth, requirePermission('course.manage_content'), requireCourseOwnership, updateModule);
router.delete('/:id/modules/:moduleId', requireAuth, requirePermission('course.manage_content'), requireCourseOwnership, deleteModule);

// --- LESSONS ---
router.post('/:id/modules/:moduleId/lessons', requireAuth, requirePermission('course.manage_content'), requireCourseOwnership, addLesson);
router.patch('/:id/modules/:moduleId/lessons/:lessonId', requireAuth, requirePermission('course.manage_content'), requireCourseOwnership, updateLesson);
router.delete('/:id/modules/:moduleId/lessons/:lessonId', requireAuth, requirePermission('course.manage_content'), requireCourseOwnership, deleteLesson);

// --- MESSAGES / CHAT (SOLUSI ERROR 404) ---
router.get('/:id/messages', requireAuth, getGroupMessages);
router.post('/:id/messages', requireAuth, sendGroupMessage);

// --- OTHER ---
router.get('/:id/participants', requireAuth, requirePermission('course.access'), getCourseParticipants);

export default router;
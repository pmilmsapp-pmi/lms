// // // // // // // // // // // // // // // // // // // backend/src/controllers/courseController.ts

// // // // // // // // // // // // // // // // // // export const getCourseById = async (req: Request, res: Response) => {
// // // // // // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // // // // // //     const course = await Course.findById(req.params.id)
// // // // // // // // // // // // // // // // // //       .populate('facilitatorIds', 'name avatarUrl') // Fasilitator Kursus Utama
// // // // // // // // // // // // // // // // // //       // POPULATE BARU UNTUK MODUL & LESSON
// // // // // // // // // // // // // // // // // //       .populate({
// // // // // // // // // // // // // // // // // //         path: 'modules.facilitatorId',
// // // // // // // // // // // // // // // // // //         select: 'name avatarUrl'
// // // // // // // // // // // // // // // // // //       })
// // // // // // // // // // // // // // // // // //       .populate({
// // // // // // // // // // // // // // // // // //         path: 'modules.lessons.facilitatorId',
// // // // // // // // // // // // // // // // // //         select: 'name avatarUrl'
// // // // // // // // // // // // // // // // // //       });

// // // // // // // // // // // // // // // // // //     if (!course) {
// // // // // // // // // // // // // // // // // //       return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // // // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // // //     res.json({ course });
// // // // // // // // // // // // // // // // // //   } catch (error) {
// // // // // // // // // // // // // // // // // //     res.status(500).json({ error: 'Gagal mengambil data kursus' });
// // // // // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // // // // };
// // // // // // // // // // // // // // // // // import { Request, Response } from 'express'; // Import dari express wajib!
// // // // // // // // // // // // // // // // // import { Course } from '../models/Course';   // Import Model Course wajib!

// // // // // // // // // // // // // // // // // // --- 1. GET ALL COURSES (PUBLIC / ADMIN) ---
// // // // // // // // // // // // // // // // // export const getAllCourses = async (req: Request, res: Response) => {
// // // // // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // // // // //     const { type, role } = req.query;
    
// // // // // // // // // // // // // // // // //     let query: any = {};

// // // // // // // // // // // // // // // // //     // Filter by Program Type (training/course)
// // // // // // // // // // // // // // // // //     if (type && type !== 'all') {
// // // // // // // // // // // // // // // // //       query.programType = type;
// // // // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // // // //     // Jika bukan admin (public/student), hanya tampilkan yang published
// // // // // // // // // // // // // // // // //     // (Anda bisa sesuaikan logic ini jika ada middleware auth sebelumnya)
// // // // // // // // // // // // // // // // //     if (req.url.includes('/public')) {
// // // // // // // // // // // // // // // // //         query.isPublished = true;
// // // // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // // // //     const courses = await Course.find(query)
// // // // // // // // // // // // // // // // //       .populate('facilitatorIds', 'name email avatarUrl') // Populate Fasilitator Utama
// // // // // // // // // // // // // // // // //       .sort({ createdAt: -1 }); // Terbaru diatas

// // // // // // // // // // // // // // // // //     res.json({ courses });
// // // // // // // // // // // // // // // // //   } catch (error: any) {
// // // // // // // // // // // // // // // // //     console.error(error);
// // // // // // // // // // // // // // // // //     res.status(500).json({ error: 'Gagal mengambil data kursus' });
// // // // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // // // --- 2. GET COURSE BY ID (DETAIL) ---
// // // // // // // // // // // // // // // // // export const getCourseById = async (req: Request, res: Response) => {
// // // // // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // // // // //     // Populate bertingkat untuk mengambil nama fasilitator di level Modul & Lesson
// // // // // // // // // // // // // // // // //     const course = await Course.findById(req.params.id)
// // // // // // // // // // // // // // // // //       .populate('facilitatorIds', 'name avatarUrl') // Level Kursus
// // // // // // // // // // // // // // // // //       .populate({
// // // // // // // // // // // // // // // // //         path: 'modules.facilitatorId', // Level Modul
// // // // // // // // // // // // // // // // //         select: 'name avatarUrl'
// // // // // // // // // // // // // // // // //       })
// // // // // // // // // // // // // // // // //       .populate({
// // // // // // // // // // // // // // // // //         path: 'modules.lessons.facilitatorId', // Level Lesson
// // // // // // // // // // // // // // // // //         select: 'name avatarUrl'
// // // // // // // // // // // // // // // // //       });

// // // // // // // // // // // // // // // // //     if (!course) {
// // // // // // // // // // // // // // // // //       return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // // // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // // // //     res.json({ course });
// // // // // // // // // // // // // // // // //   } catch (error: any) {
// // // // // // // // // // // // // // // // //     console.error(error);
// // // // // // // // // // // // // // // // //     res.status(500).json({ error: 'Gagal mengambil detail kursus' });
// // // // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // // // --- 3. CREATE COURSE ---
// // // // // // // // // // // // // // // // // export const createCourse = async (req: Request, res: Response) => {
// // // // // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // // // // //     const { title, description, price, programType, thumbnailUrl } = req.body;

// // // // // // // // // // // // // // // // //     // Validasi sederhana
// // // // // // // // // // // // // // // // //     if (!title) return res.status(400).json({ error: 'Judul wajib diisi' });

// // // // // // // // // // // // // // // // //     const newCourse = new Course({
// // // // // // // // // // // // // // // // //       title,
// // // // // // // // // // // // // // // // //       description,
// // // // // // // // // // // // // // // // //       price,
// // // // // // // // // // // // // // // // //       programType,
// // // // // // // // // // // // // // // // //       thumbnailUrl,
// // // // // // // // // // // // // // // // //       isPublished: false, // Default draft
// // // // // // // // // // // // // // // // //       modules: []
// // // // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // // // //     await newCourse.save();
// // // // // // // // // // // // // // // // //     res.status(201).json({ message: 'Kursus berhasil dibuat', course: newCourse });
// // // // // // // // // // // // // // // // //   } catch (error: any) {
// // // // // // // // // // // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // // // --- 4. UPDATE COURSE (GENERAL INFO) ---
// // // // // // // // // // // // // // // // // export const updateCourse = async (req: Request, res: Response) => {
// // // // // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // // // // //     const { id } = req.params;
// // // // // // // // // // // // // // // // //     const updates = req.body;

// // // // // // // // // // // // // // // // //     const course = await Course.findByIdAndUpdate(id, updates, { new: true });

// // // // // // // // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });

// // // // // // // // // // // // // // // // //     res.json({ message: 'Update berhasil', course });
// // // // // // // // // // // // // // // // //   } catch (error: any) {
// // // // // // // // // // // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // // // --- 5. DELETE COURSE ---
// // // // // // // // // // // // // // // // // export const deleteCourse = async (req: Request, res: Response) => {
// // // // // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // // // // //     const { id } = req.params;
// // // // // // // // // // // // // // // // //     await Course.findByIdAndDelete(id);
// // // // // // // // // // // // // // // // //     res.json({ message: 'Kursus berhasil dihapus' });
// // // // // // // // // // // // // // // // //   } catch (error: any) {
// // // // // // // // // // // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // // // --- 6. MANAGE MODULES (ADD/EDIT) ---
// // // // // // // // // // // // // // // // // // Menambahkan atau mengedit modul dalam kursus
// // // // // // // // // // // // // // // // // export const manageModule = async (req: Request, res: Response) => {
// // // // // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // // // // //     const { courseId, moduleId } = req.params;
// // // // // // // // // // // // // // // // //     const { title, isMandatory, isActive, facilitatorId, jp } = req.body;

// // // // // // // // // // // // // // // // //     const course = await Course.findById(courseId);
// // // // // // // // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });

// // // // // // // // // // // // // // // // //     if (moduleId) {
// // // // // // // // // // // // // // // // //       // EDIT EXISTING MODULE
// // // // // // // // // // // // // // // // //       const module: any = course.modules.id(moduleId); // Mongoose subdocument method
// // // // // // // // // // // // // // // // //       if (!module) return res.status(404).json({ error: 'Modul tidak ditemukan' });
      
// // // // // // // // // // // // // // // // //       if (title) module.title = title;
// // // // // // // // // // // // // // // // //       if (typeof isMandatory !== 'undefined') module.isMandatory = isMandatory;
// // // // // // // // // // // // // // // // //       if (typeof isActive !== 'undefined') module.isActive = isActive;
// // // // // // // // // // // // // // // // //       if (facilitatorId) module.facilitatorId = facilitatorId;
// // // // // // // // // // // // // // // // //       if (typeof jp !== 'undefined') module.jp = jp;

// // // // // // // // // // // // // // // // //     } else {
// // // // // // // // // // // // // // // // //       // ADD NEW MODULE
// // // // // // // // // // // // // // // // //       course.modules.push({
// // // // // // // // // // // // // // // // //         title,
// // // // // // // // // // // // // // // // //         isMandatory: isMandatory !== false,
// // // // // // // // // // // // // // // // //         isActive: true,
// // // // // // // // // // // // // // // // //         lessons: [],
// // // // // // // // // // // // // // // // //         facilitatorId,
// // // // // // // // // // // // // // // // //         jp: jp || 0
// // // // // // // // // // // // // // // // //       } as any);
// // // // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // // // //     await course.save();
// // // // // // // // // // // // // // // // //     res.json({ message: 'Modul disimpan', course });
// // // // // // // // // // // // // // // // //   } catch (error: any) {
// // // // // // // // // // // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // // // --- 7. MANAGE LESSONS (ADD/EDIT) ---
// // // // // // // // // // // // // // // // // export const manageLesson = async (req: Request, res: Response) => {
// // // // // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // // // // //     const { courseId, moduleId, lessonId } = req.params;
// // // // // // // // // // // // // // // // //     // Ambil semua field yang mungkin dikirim frontend
// // // // // // // // // // // // // // // // //     const { 
// // // // // // // // // // // // // // // // //         title, type, content, videoUrl, fileUrl, meetingLink, 
// // // // // // // // // // // // // // // // //         isActive, isMandatory, questions, quizDuration, 
// // // // // // // // // // // // // // // // //         pollQuestion, pollOptions, jp, facilitatorId 
// // // // // // // // // // // // // // // // //     } = req.body;

// // // // // // // // // // // // // // // // //     const course = await Course.findById(courseId);
// // // // // // // // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });

// // // // // // // // // // // // // // // // //     const module: any = course.modules.id(moduleId);
// // // // // // // // // // // // // // // // //     if (!module) return res.status(404).json({ error: 'Modul tidak ditemukan' });

// // // // // // // // // // // // // // // // //     if (lessonId) {
// // // // // // // // // // // // // // // // //       // EDIT LESSON
// // // // // // // // // // // // // // // // //       const lesson = module.lessons.id(lessonId);
// // // // // // // // // // // // // // // // //       if (!lesson) return res.status(404).json({ error: 'Materi tidak ditemukan' });

// // // // // // // // // // // // // // // // //       // Update fields
// // // // // // // // // // // // // // // // //       if (title) lesson.title = title;
// // // // // // // // // // // // // // // // //       if (type) lesson.type = type;
// // // // // // // // // // // // // // // // //       if (typeof content !== 'undefined') lesson.content = content;
// // // // // // // // // // // // // // // // //       if (typeof videoUrl !== 'undefined') lesson.videoUrl = videoUrl;
// // // // // // // // // // // // // // // // //       if (typeof fileUrl !== 'undefined') lesson.fileUrl = fileUrl;
// // // // // // // // // // // // // // // // //       if (typeof meetingLink !== 'undefined') lesson.meetingLink = meetingLink;
// // // // // // // // // // // // // // // // //       if (typeof isActive !== 'undefined') lesson.isActive = isActive;
// // // // // // // // // // // // // // // // //       if (typeof isMandatory !== 'undefined') lesson.isMandatory = isMandatory;
      
// // // // // // // // // // // // // // // // //       // Update Fitur Baru
// // // // // // // // // // // // // // // // //       if (questions) lesson.questions = questions;
// // // // // // // // // // // // // // // // //       if (typeof quizDuration !== 'undefined') lesson.quizDuration = quizDuration;
// // // // // // // // // // // // // // // // //       if (pollQuestion) lesson.pollQuestion = pollQuestion;
// // // // // // // // // // // // // // // // //       if (pollOptions) lesson.pollOptions = pollOptions;
// // // // // // // // // // // // // // // // //       if (typeof jp !== 'undefined') lesson.jp = jp;
// // // // // // // // // // // // // // // // //       if (facilitatorId) lesson.facilitatorId = facilitatorId;

// // // // // // // // // // // // // // // // //     } else {
// // // // // // // // // // // // // // // // //       // ADD NEW LESSON
// // // // // // // // // // // // // // // // //       module.lessons.push({
// // // // // // // // // // // // // // // // //         title, type, content, videoUrl, fileUrl, meetingLink,
// // // // // // // // // // // // // // // // //         isActive: isActive !== false,
// // // // // // // // // // // // // // // // //         isMandatory: isMandatory !== false,
// // // // // // // // // // // // // // // // //         questions, quizDuration, pollQuestion, pollOptions,
// // // // // // // // // // // // // // // // //         jp: jp || 0,
// // // // // // // // // // // // // // // // //         facilitatorId
// // // // // // // // // // // // // // // // //       });
// // // // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // // // //     await course.save();
// // // // // // // // // // // // // // // // //     res.json({ message: 'Materi berhasil disimpan', course });
// // // // // // // // // // // // // // // // //   } catch (error: any) {
// // // // // // // // // // // // // // // // //     console.error(error);
// // // // // // // // // // // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // // // --- 8. DELETE LESSON ---
// // // // // // // // // // // // // // // // // export const deleteLesson = async (req: Request, res: Response) => {
// // // // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // // // //         const { courseId, moduleId, lessonId } = req.params;
// // // // // // // // // // // // // // // // //         const course = await Course.findById(courseId);
// // // // // // // // // // // // // // // // //         if(!course) return res.status(404).json({ error: 'Not found' });

// // // // // // // // // // // // // // // // //         const module: any = course.modules.id(moduleId);
// // // // // // // // // // // // // // // // //         if(module) {
// // // // // // // // // // // // // // // // //             module.lessons.pull(lessonId); // Cara hapus subdoc di Mongoose
// // // // // // // // // // // // // // // // //             await course.save();
// // // // // // // // // // // // // // // // //         }
// // // // // // // // // // // // // // // // //         res.json({ message: 'Deleted', course });
// // // // // // // // // // // // // // // // //     } catch (error: any) {
// // // // // // // // // // // // // // // // //         res.status(500).json({ error: error.message });
// // // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // // // --- 9. REORDER MODULES/LESSONS ---
// // // // // // // // // // // // // // // // // export const reorderContent = async (req: Request, res: Response) => {
// // // // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // // // //         const { id } = req.params;
// // // // // // // // // // // // // // // // //         const { modules } = req.body; // Frontend mengirim struktur modules lengkap yang sudah diurutkan
        
// // // // // // // // // // // // // // // // //         if (!modules) return res.status(400).json({ error: 'Modules data required' });

// // // // // // // // // // // // // // // // //         // Update langsung array modules dengan urutan baru
// // // // // // // // // // // // // // // // //         // Pastikan validasi bahwa ID modul valid jika perlu, tapi untuk admin internal biasanya aman
// // // // // // // // // // // // // // // // //         const course = await Course.findByIdAndUpdate(id, { modules }, { new: true });
        
// // // // // // // // // // // // // // // // //         res.json({ message: 'Urutan diperbarui', course });
// // // // // // // // // // // // // // // // //     } catch (error: any) {
// // // // // // // // // // // // // // // // //         res.status(500).json({ error: error.message });
// // // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // // // --- 10. TOGGLE STATUS (PUBLISH/DRAFT) ---
// // // // // // // // // // // // // // // // // export const toggleStatus = async (req: Request, res: Response) => {
// // // // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // // // //         const { id } = req.params;
// // // // // // // // // // // // // // // // //         const { moduleId, lessonId } = req.body; // Opsional

// // // // // // // // // // // // // // // // //         const course = await Course.findById(id);
// // // // // // // // // // // // // // // // //         if(!course) return res.status(404).json({ error: 'Not found' });

// // // // // // // // // // // // // // // // //         if (moduleId && lessonId) {
// // // // // // // // // // // // // // // // //             // Toggle Lesson
// // // // // // // // // // // // // // // // //             const mod: any = course.modules.id(moduleId);
// // // // // // // // // // // // // // // // //             const les = mod?.lessons.id(lessonId);
// // // // // // // // // // // // // // // // //             if(les) les.isActive = !les.isActive;
// // // // // // // // // // // // // // // // //         } else if (moduleId) {
// // // // // // // // // // // // // // // // //             // Toggle Module
// // // // // // // // // // // // // // // // //             const mod: any = course.modules.id(moduleId);
// // // // // // // // // // // // // // // // //             if(mod) mod.isActive = !mod.isActive;
// // // // // // // // // // // // // // // // //         } else {
// // // // // // // // // // // // // // // // //             // Toggle Course Publish
// // // // // // // // // // // // // // // // //             course.isPublished = !course.isPublished;
// // // // // // // // // // // // // // // // //         }

// // // // // // // // // // // // // // // // //         await course.save();
// // // // // // // // // // // // // // // // //         res.json({ message: 'Status updated', course });
// // // // // // // // // // // // // // // // //     } catch (error: any) {
// // // // // // // // // // // // // // // // //         res.status(500).json({ error: error.message });
// // // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // // };
// // // // // // // // // // // // // // // // import { Request, Response } from 'express';
// // // // // // // // // // // // // // // // import { Course } from '../models/Course';

// // // // // // // // // // // // // // // // // --- 1. GET ALL COURSES (PUBLIC / ADMIN) ---
// // // // // // // // // // // // // // // // export const getAllCourses = async (req: Request, res: Response) => {
// // // // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // // // //     const { type, role } = req.query;
    
// // // // // // // // // // // // // // // //     let query: any = {};

// // // // // // // // // // // // // // // //     // Filter by Program Type
// // // // // // // // // // // // // // // //     if (type && type !== 'all') {
// // // // // // // // // // // // // // // //       query.programType = type;
// // // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // // //     // Jika public endpoint, hanya tampilkan yang published
// // // // // // // // // // // // // // // //     if (req.url.includes('/public')) {
// // // // // // // // // // // // // // // //         query.isPublished = true;
// // // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // // //     const courses = await Course.find(query)
// // // // // // // // // // // // // // // //       .populate('facilitatorIds', 'name email avatarUrl')
// // // // // // // // // // // // // // // //       .sort({ createdAt: -1 });

// // // // // // // // // // // // // // // //     res.json({ courses });
// // // // // // // // // // // // // // // //   } catch (error: any) {
// // // // // // // // // // // // // // // //     console.error(error);
// // // // // // // // // // // // // // // //     res.status(500).json({ error: 'Gagal mengambil data kursus' });
// // // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // // --- 2. GET COURSE BY ID ---
// // // // // // // // // // // // // // // // export const getCourseById = async (req: Request, res: Response) => {
// // // // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // // // //     const course = await Course.findById(req.params.id)
// // // // // // // // // // // // // // // //       .populate('facilitatorIds', 'name avatarUrl')
// // // // // // // // // // // // // // // //       .populate({
// // // // // // // // // // // // // // // //         path: 'modules.facilitatorId',
// // // // // // // // // // // // // // // //         select: 'name avatarUrl'
// // // // // // // // // // // // // // // //       })
// // // // // // // // // // // // // // // //       .populate({
// // // // // // // // // // // // // // // //         path: 'modules.lessons.facilitatorId',
// // // // // // // // // // // // // // // //         select: 'name avatarUrl'
// // // // // // // // // // // // // // // //       });

// // // // // // // // // // // // // // // //     if (!course) {
// // // // // // // // // // // // // // // //       return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // // //     res.json({ course });
// // // // // // // // // // // // // // // //   } catch (error: any) {
// // // // // // // // // // // // // // // //     console.error(error);
// // // // // // // // // // // // // // // //     res.status(500).json({ error: 'Gagal mengambil detail kursus' });
// // // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // // --- 3. CREATE COURSE ---
// // // // // // // // // // // // // // // // export const createCourse = async (req: Request, res: Response) => {
// // // // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // // // //     const { title, description, price, programType, thumbnailUrl } = req.body;

// // // // // // // // // // // // // // // //     if (!title) return res.status(400).json({ error: 'Judul wajib diisi' });

// // // // // // // // // // // // // // // //     const newCourse = new Course({
// // // // // // // // // // // // // // // //       title,
// // // // // // // // // // // // // // // //       description,
// // // // // // // // // // // // // // // //       price,
// // // // // // // // // // // // // // // //       programType,
// // // // // // // // // // // // // // // //       thumbnailUrl,
// // // // // // // // // // // // // // // //       isPublished: false,
// // // // // // // // // // // // // // // //       modules: []
// // // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // // //     await newCourse.save();
// // // // // // // // // // // // // // // //     res.status(201).json({ message: 'Kursus berhasil dibuat', course: newCourse });
// // // // // // // // // // // // // // // //   } catch (error: any) {
// // // // // // // // // // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // // --- 4. UPDATE COURSE ---
// // // // // // // // // // // // // // // // export const updateCourse = async (req: Request, res: Response) => {
// // // // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // // // //     const { id } = req.params;
// // // // // // // // // // // // // // // //     const updates = req.body;

// // // // // // // // // // // // // // // //     const course = await Course.findByIdAndUpdate(id, updates, { new: true });

// // // // // // // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });

// // // // // // // // // // // // // // // //     res.json({ message: 'Update berhasil', course });
// // // // // // // // // // // // // // // //   } catch (error: any) {
// // // // // // // // // // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // // --- 5. DELETE COURSE ---
// // // // // // // // // // // // // // // // export const deleteCourse = async (req: Request, res: Response) => {
// // // // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // // // //     const { id } = req.params;
// // // // // // // // // // // // // // // //     await Course.findByIdAndDelete(id);
// // // // // // // // // // // // // // // //     res.json({ message: 'Kursus berhasil dihapus' });
// // // // // // // // // // // // // // // //   } catch (error: any) {
// // // // // // // // // // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // // --- 6. MANAGE MODULES ---
// // // // // // // // // // // // // // // // export const manageModule = async (req: Request, res: Response) => {
// // // // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // // // //     const { courseId, moduleId } = req.params;
// // // // // // // // // // // // // // // //     const { title, isMandatory, isActive, facilitatorId, jp } = req.body;

// // // // // // // // // // // // // // // //     const course = await Course.findById(courseId);
// // // // // // // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });

// // // // // // // // // // // // // // // //     if (moduleId) {
// // // // // // // // // // // // // // // //       // PERBAIKAN: Gunakan casting (as any) agar TS mengenali method .id()
// // // // // // // // // // // // // // // //       const module: any = (course.modules as any).id(moduleId);
      
// // // // // // // // // // // // // // // //       if (!module) return res.status(404).json({ error: 'Modul tidak ditemukan' });
      
// // // // // // // // // // // // // // // //       if (title) module.title = title;
// // // // // // // // // // // // // // // //       if (typeof isMandatory !== 'undefined') module.isMandatory = isMandatory;
// // // // // // // // // // // // // // // //       if (typeof isActive !== 'undefined') module.isActive = isActive;
// // // // // // // // // // // // // // // //       if (facilitatorId) module.facilitatorId = facilitatorId;
// // // // // // // // // // // // // // // //       if (typeof jp !== 'undefined') module.jp = jp;

// // // // // // // // // // // // // // // //     } else {
// // // // // // // // // // // // // // // //       course.modules.push({
// // // // // // // // // // // // // // // //         title,
// // // // // // // // // // // // // // // //         isMandatory: isMandatory !== false,
// // // // // // // // // // // // // // // //         isActive: true,
// // // // // // // // // // // // // // // //         lessons: [],
// // // // // // // // // // // // // // // //         facilitatorId,
// // // // // // // // // // // // // // // //         jp: jp || 0
// // // // // // // // // // // // // // // //       } as any);
// // // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // // //     await course.save();
// // // // // // // // // // // // // // // //     res.json({ message: 'Modul disimpan', course });
// // // // // // // // // // // // // // // //   } catch (error: any) {
// // // // // // // // // // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // // --- 7. MANAGE LESSONS ---
// // // // // // // // // // // // // // // // export const manageLesson = async (req: Request, res: Response) => {
// // // // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // // // //     const { courseId, moduleId, lessonId } = req.params;
// // // // // // // // // // // // // // // //     const { 
// // // // // // // // // // // // // // // //         title, type, content, videoUrl, fileUrl, meetingLink, 
// // // // // // // // // // // // // // // //         isActive, isMandatory, questions, quizDuration, 
// // // // // // // // // // // // // // // //         pollQuestion, pollOptions, jp, facilitatorId 
// // // // // // // // // // // // // // // //     } = req.body;

// // // // // // // // // // // // // // // //     const course = await Course.findById(courseId);
// // // // // // // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });

// // // // // // // // // // // // // // // //     // PERBAIKAN: Casting (as any)
// // // // // // // // // // // // // // // //     const module: any = (course.modules as any).id(moduleId);
// // // // // // // // // // // // // // // //     if (!module) return res.status(404).json({ error: 'Modul tidak ditemukan' });

// // // // // // // // // // // // // // // //     if (lessonId) {
// // // // // // // // // // // // // // // //       // EDIT LESSON
// // // // // // // // // // // // // // // //       const lesson = module.lessons.id(lessonId);
// // // // // // // // // // // // // // // //       if (!lesson) return res.status(404).json({ error: 'Materi tidak ditemukan' });

// // // // // // // // // // // // // // // //       // Update fields
// // // // // // // // // // // // // // // //       if (title) lesson.title = title;
// // // // // // // // // // // // // // // //       if (type) lesson.type = type;
// // // // // // // // // // // // // // // //       if (typeof content !== 'undefined') lesson.content = content;
// // // // // // // // // // // // // // // //       if (typeof videoUrl !== 'undefined') lesson.videoUrl = videoUrl;
// // // // // // // // // // // // // // // //       if (typeof fileUrl !== 'undefined') lesson.fileUrl = fileUrl;
// // // // // // // // // // // // // // // //       if (typeof meetingLink !== 'undefined') lesson.meetingLink = meetingLink;
// // // // // // // // // // // // // // // //       if (typeof isActive !== 'undefined') lesson.isActive = isActive;
// // // // // // // // // // // // // // // //       if (typeof isMandatory !== 'undefined') lesson.isMandatory = isMandatory;
      
// // // // // // // // // // // // // // // //       // Update Fitur Baru
// // // // // // // // // // // // // // // //       if (questions) lesson.questions = questions;
// // // // // // // // // // // // // // // //       if (typeof quizDuration !== 'undefined') lesson.quizDuration = quizDuration;
// // // // // // // // // // // // // // // //       if (pollQuestion) lesson.pollQuestion = pollQuestion;
// // // // // // // // // // // // // // // //       if (pollOptions) lesson.pollOptions = pollOptions;
// // // // // // // // // // // // // // // //       if (typeof jp !== 'undefined') lesson.jp = jp;
// // // // // // // // // // // // // // // //       if (facilitatorId) lesson.facilitatorId = facilitatorId;

// // // // // // // // // // // // // // // //     } else {
// // // // // // // // // // // // // // // //       // ADD NEW LESSON
// // // // // // // // // // // // // // // //       module.lessons.push({
// // // // // // // // // // // // // // // //         title, type, content, videoUrl, fileUrl, meetingLink,
// // // // // // // // // // // // // // // //         isActive: isActive !== false,
// // // // // // // // // // // // // // // //         isMandatory: isMandatory !== false,
// // // // // // // // // // // // // // // //         questions, quizDuration, pollQuestion, pollOptions,
// // // // // // // // // // // // // // // //         jp: jp || 0,
// // // // // // // // // // // // // // // //         facilitatorId
// // // // // // // // // // // // // // // //       });
// // // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // // //     await course.save();
// // // // // // // // // // // // // // // //     res.json({ message: 'Materi berhasil disimpan', course });
// // // // // // // // // // // // // // // //   } catch (error: any) {
// // // // // // // // // // // // // // // //     console.error(error);
// // // // // // // // // // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // // --- 8. DELETE LESSON ---
// // // // // // // // // // // // // // // // export const deleteLesson = async (req: Request, res: Response) => {
// // // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // // //         const { courseId, moduleId, lessonId } = req.params;
// // // // // // // // // // // // // // // //         const course = await Course.findById(courseId);
// // // // // // // // // // // // // // // //         if(!course) return res.status(404).json({ error: 'Not found' });

// // // // // // // // // // // // // // // //         // PERBAIKAN: Casting
// // // // // // // // // // // // // // // //         const module: any = (course.modules as any).id(moduleId);
// // // // // // // // // // // // // // // //         if(module) {
// // // // // // // // // // // // // // // //             module.lessons.pull(lessonId);
// // // // // // // // // // // // // // // //             await course.save();
// // // // // // // // // // // // // // // //         }
// // // // // // // // // // // // // // // //         res.json({ message: 'Deleted', course });
// // // // // // // // // // // // // // // //     } catch (error: any) {
// // // // // // // // // // // // // // // //         res.status(500).json({ error: error.message });
// // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // // --- 9. REORDER ---
// // // // // // // // // // // // // // // // export const reorderContent = async (req: Request, res: Response) => {
// // // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // // //         const { id } = req.params;
// // // // // // // // // // // // // // // //         const { modules } = req.body;
        
// // // // // // // // // // // // // // // //         if (!modules) return res.status(400).json({ error: 'Modules required' });

// // // // // // // // // // // // // // // //         const course = await Course.findByIdAndUpdate(id, { modules }, { new: true });
// // // // // // // // // // // // // // // //         res.json({ message: 'Urutan diperbarui', course });
// // // // // // // // // // // // // // // //     } catch (error: any) {
// // // // // // // // // // // // // // // //         res.status(500).json({ error: error.message });
// // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // // --- 10. TOGGLE STATUS ---
// // // // // // // // // // // // // // // // export const toggleStatus = async (req: Request, res: Response) => {
// // // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // // //         const { id } = req.params;
// // // // // // // // // // // // // // // //         const { moduleId, lessonId } = req.body;

// // // // // // // // // // // // // // // //         const course = await Course.findById(id);
// // // // // // // // // // // // // // // //         if(!course) return res.status(404).json({ error: 'Not found' });

// // // // // // // // // // // // // // // //         if (moduleId && lessonId) {
// // // // // // // // // // // // // // // //             // PERBAIKAN: Casting
// // // // // // // // // // // // // // // //             const mod: any = (course.modules as any).id(moduleId);
// // // // // // // // // // // // // // // //             const les = mod?.lessons.id(lessonId);
// // // // // // // // // // // // // // // //             if(les) les.isActive = !les.isActive;
// // // // // // // // // // // // // // // //         } else if (moduleId) {
// // // // // // // // // // // // // // // //             // PERBAIKAN: Casting
// // // // // // // // // // // // // // // //             const mod: any = (course.modules as any).id(moduleId);
// // // // // // // // // // // // // // // //             if(mod) mod.isActive = !mod.isActive;
// // // // // // // // // // // // // // // //         } else {
// // // // // // // // // // // // // // // //             course.isPublished = !course.isPublished;
// // // // // // // // // // // // // // // //         }

// // // // // // // // // // // // // // // //         await course.save();
// // // // // // // // // // // // // // // //         res.json({ message: 'Status updated', course });
// // // // // // // // // // // // // // // //     } catch (error: any) {
// // // // // // // // // // // // // // // //         res.status(500).json({ error: error.message });
// // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // };
// // // // // // // // // // // // // // // import { Request, Response } from 'express';
// // // // // // // // // // // // // // // import { Course } from '../models/Course';

// // // // // // // // // // // // // // // // --- 1. GET ALL COURSES ---
// // // // // // // // // // // // // // // export const getAllCourses = async (req: Request, res: Response) => {
// // // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // // //     const { type } = req.query;
// // // // // // // // // // // // // // //     let query: any = {};
// // // // // // // // // // // // // // //     if (type && type !== 'all') query.programType = type;
// // // // // // // // // // // // // // //     if (req.url.includes('/public')) query.isPublished = true;

// // // // // // // // // // // // // // //     const courses = await Course.find(query)
// // // // // // // // // // // // // // //       .populate('facilitatorIds', 'name email avatarUrl')
// // // // // // // // // // // // // // //       .sort({ createdAt: -1 });

// // // // // // // // // // // // // // //     res.json({ courses });
// // // // // // // // // // // // // // //   } catch (error: any) {
// // // // // // // // // // // // // // //     res.status(500).json({ error: 'Gagal mengambil data kursus' });
// // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // --- 2. GET COURSE BY ID ---
// // // // // // // // // // // // // // // export const getCourseById = async (req: Request, res: Response) => {
// // // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // // //     const course = await Course.findById(req.params.id)
// // // // // // // // // // // // // // //       .populate('facilitatorIds', 'name avatarUrl')
// // // // // // // // // // // // // // //       .populate({ path: 'modules.facilitatorId', select: 'name avatarUrl' })
// // // // // // // // // // // // // // //       .populate({ path: 'modules.lessons.facilitatorId', select: 'name avatarUrl' });

// // // // // // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // // // // // // // // // // // // // //     res.json({ course });
// // // // // // // // // // // // // // //   } catch (error: any) {
// // // // // // // // // // // // // // //     res.status(500).json({ error: 'Gagal mengambil detail kursus' });
// // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // --- 3. CREATE COURSE ---
// // // // // // // // // // // // // // // export const createCourse = async (req: Request, res: Response) => {
// // // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // // //     const { title, description, price, programType, thumbnailUrl } = req.body;
// // // // // // // // // // // // // // //     if (!title) return res.status(400).json({ error: 'Judul wajib diisi' });

// // // // // // // // // // // // // // //     const newCourse = new Course({
// // // // // // // // // // // // // // //       title, description, price, programType, thumbnailUrl,
// // // // // // // // // // // // // // //       isPublished: false, modules: []
// // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // //     await newCourse.save();
// // // // // // // // // // // // // // //     res.status(201).json({ message: 'Kursus berhasil dibuat', course: newCourse });
// // // // // // // // // // // // // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // --- 4. UPDATE COURSE ---
// // // // // // // // // // // // // // // export const updateCourse = async (req: Request, res: Response) => {
// // // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // // //     const { id } = req.params;
// // // // // // // // // // // // // // //     const updates = req.body;
// // // // // // // // // // // // // // //     const course = await Course.findByIdAndUpdate(id, updates, { new: true });
// // // // // // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Not found' });
// // // // // // // // // // // // // // //     res.json({ message: 'Update berhasil', course });
// // // // // // // // // // // // // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // --- 5. DELETE COURSE ---
// // // // // // // // // // // // // // // export const deleteCourse = async (req: Request, res: Response) => {
// // // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // // //     const { id } = req.params;
// // // // // // // // // // // // // // //     await Course.findByIdAndDelete(id);
// // // // // // // // // // // // // // //     res.json({ message: 'Kursus berhasil dihapus' });
// // // // // // // // // // // // // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // --- 6. MANAGE MODULES (ADD/EDIT) ---
// // // // // // // // // // // // // // // export const manageModule = async (req: Request, res: Response) => {
// // // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // // //     const { courseId, moduleId } = req.params;
// // // // // // // // // // // // // // //     const { title, isMandatory, isActive, facilitatorId, jp } = req.body;

// // // // // // // // // // // // // // //     const course = await Course.findById(courseId);
// // // // // // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });

// // // // // // // // // // // // // // //     if (moduleId) {
// // // // // // // // // // // // // // //       const module: any = (course.modules as any).id(moduleId);
// // // // // // // // // // // // // // //       if (!module) return res.status(404).json({ error: 'Modul tidak ditemukan' });
      
// // // // // // // // // // // // // // //       if (title) module.title = title;
// // // // // // // // // // // // // // //       if (typeof isMandatory !== 'undefined') module.isMandatory = isMandatory;
// // // // // // // // // // // // // // //       if (typeof isActive !== 'undefined') module.isActive = isActive;
      
// // // // // // // // // // // // // // //       // FIX 2: Simpan JP & Fasilitator
// // // // // // // // // // // // // // //       if (typeof jp !== 'undefined') module.jp = jp;
// // // // // // // // // // // // // // //       if (facilitatorId) module.facilitatorId = facilitatorId;

// // // // // // // // // // // // // // //     } else {
// // // // // // // // // // // // // // //       course.modules.push({
// // // // // // // // // // // // // // //         title,
// // // // // // // // // // // // // // //         isMandatory: isMandatory !== false,
// // // // // // // // // // // // // // //         isActive: true,
// // // // // // // // // // // // // // //         lessons: [],
// // // // // // // // // // // // // // //         facilitatorId,
// // // // // // // // // // // // // // //         jp: jp || 0 // FIX 2
// // // // // // // // // // // // // // //       } as any);
// // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // //     await course.save();
// // // // // // // // // // // // // // //     res.json({ message: 'Modul disimpan', course });
// // // // // // // // // // // // // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // --- 7. MANAGE LESSONS (ADD/EDIT) ---
// // // // // // // // // // // // // // // export const manageLesson = async (req: Request, res: Response) => {
// // // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // // //     const { courseId, moduleId, lessonId } = req.params;
// // // // // // // // // // // // // // //     const { 
// // // // // // // // // // // // // // //         title, type, content, videoUrl, fileUrl, meetingLink, 
// // // // // // // // // // // // // // //         isActive, isMandatory, questions, quizDuration, 
// // // // // // // // // // // // // // //         pollQuestion, pollOptions, jp, facilitatorId 
// // // // // // // // // // // // // // //     } = req.body;

// // // // // // // // // // // // // // //     const course = await Course.findById(courseId);
// // // // // // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Not found' });

// // // // // // // // // // // // // // //     const module: any = (course.modules as any).id(moduleId);
// // // // // // // // // // // // // // //     if (!module) return res.status(404).json({ error: 'Modul not found' });

// // // // // // // // // // // // // // //     if (lessonId) {
// // // // // // // // // // // // // // //       const lesson = module.lessons.id(lessonId);
// // // // // // // // // // // // // // //       if (!lesson) return res.status(404).json({ error: 'Materi not found' });

// // // // // // // // // // // // // // //       if (title) lesson.title = title;
// // // // // // // // // // // // // // //       if (type) lesson.type = type;
// // // // // // // // // // // // // // //       if (typeof content !== 'undefined') lesson.content = content;
// // // // // // // // // // // // // // //       if (typeof videoUrl !== 'undefined') lesson.videoUrl = videoUrl;
// // // // // // // // // // // // // // //       if (typeof fileUrl !== 'undefined') lesson.fileUrl = fileUrl;
// // // // // // // // // // // // // // //       if (typeof meetingLink !== 'undefined') lesson.meetingLink = meetingLink;
// // // // // // // // // // // // // // //       if (typeof isActive !== 'undefined') lesson.isActive = isActive;
// // // // // // // // // // // // // // //       if (typeof isMandatory !== 'undefined') lesson.isMandatory = isMandatory;
      
// // // // // // // // // // // // // // //       if (questions) lesson.questions = questions;
// // // // // // // // // // // // // // //       if (typeof quizDuration !== 'undefined') lesson.quizDuration = quizDuration;
// // // // // // // // // // // // // // //       if (pollQuestion) lesson.pollQuestion = pollQuestion;
// // // // // // // // // // // // // // //       if (pollOptions) lesson.pollOptions = pollOptions;
      
// // // // // // // // // // // // // // //       // FIX 2: Simpan JP & Fasilitator
// // // // // // // // // // // // // // //       if (typeof jp !== 'undefined') lesson.jp = jp;
// // // // // // // // // // // // // // //       if (facilitatorId) lesson.facilitatorId = facilitatorId;

// // // // // // // // // // // // // // //     } else {
// // // // // // // // // // // // // // //       module.lessons.push({
// // // // // // // // // // // // // // //         title, type, content, videoUrl, fileUrl, meetingLink,
// // // // // // // // // // // // // // //         isActive: isActive !== false,
// // // // // // // // // // // // // // //         isMandatory: isMandatory !== false,
// // // // // // // // // // // // // // //         questions, quizDuration, pollQuestion, pollOptions,
// // // // // // // // // // // // // // //         jp: jp || 0, // FIX 2
// // // // // // // // // // // // // // //         facilitatorId
// // // // // // // // // // // // // // //       });
// // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // //     await course.save();
// // // // // // // // // // // // // // //     res.json({ message: 'Materi disimpan', course });
// // // // // // // // // // // // // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // --- 8. DELETE LESSON ---
// // // // // // // // // // // // // // // export const deleteLesson = async (req: Request, res: Response) => {
// // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // //         const { courseId, moduleId, lessonId } = req.params;
// // // // // // // // // // // // // // //         const course = await Course.findById(courseId);
// // // // // // // // // // // // // // //         if(!course) return res.status(404).json({ error: 'Not found' });

// // // // // // // // // // // // // // //         const module: any = (course.modules as any).id(moduleId);
// // // // // // // // // // // // // // //         if(module) {
// // // // // // // // // // // // // // //             module.lessons.pull(lessonId);
// // // // // // // // // // // // // // //             await course.save();
// // // // // // // // // // // // // // //         }
// // // // // // // // // // // // // // //         res.json({ message: 'Deleted', course });
// // // // // // // // // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // --- 9. REORDER ---
// // // // // // // // // // // // // // // export const reorderContent = async (req: Request, res: Response) => {
// // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // //         const { id } = req.params;
// // // // // // // // // // // // // // //         const { modules } = req.body;
// // // // // // // // // // // // // // //         if (!modules) return res.status(400).json({ error: 'Modules required' });
// // // // // // // // // // // // // // //         const course = await Course.findByIdAndUpdate(id, { modules }, { new: true });
// // // // // // // // // // // // // // //         res.json({ message: 'Urutan diperbarui', course });
// // // // // // // // // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // --- 10. TOGGLE STATUS ---
// // // // // // // // // // // // // // // export const toggleStatus = async (req: Request, res: Response) => {
// // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // //         const { id } = req.params;
// // // // // // // // // // // // // // //         const { moduleId, lessonId } = req.body;
// // // // // // // // // // // // // // //         const course = await Course.findById(id);
// // // // // // // // // // // // // // //         if(!course) return res.status(404).json({ error: 'Not found' });

// // // // // // // // // // // // // // //         if (moduleId && lessonId) {
// // // // // // // // // // // // // // //             const mod: any = (course.modules as any).id(moduleId);
// // // // // // // // // // // // // // //             const les = mod?.lessons.id(lessonId);
// // // // // // // // // // // // // // //             if(les) les.isActive = !les.isActive;
// // // // // // // // // // // // // // //         } else if (moduleId) {
// // // // // // // // // // // // // // //             const mod: any = (course.modules as any).id(moduleId);
// // // // // // // // // // // // // // //             if(mod) mod.isActive = !mod.isActive;
// // // // // // // // // // // // // // // //         } else {
// // // // // // // // // // // // // // // //             course.isPublished = !course.isPublished;
// // // // // // // // // // // // // // // //         }
// // // // // // // // // // // // // // // //         await course.save();
// // // // // // // // // // // // // // // //         res.json({ message: 'Status updated', course });
// // // // // // // // // // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // // // // // // // // // };
// // // // // // // // // // // // // // // import { Request, Response } from 'express';
// // // // // // // // // // // // // // // import { Course } from '../models/Course';
// // // // // // // // // // // // // // // import { User } from '../models/User'; // Pastikan path import User benar
// // // // // // // // // // // // // // // import { Progress } from '../models/Progress'; // Pastikan path import Progress benar

// // // // // // // // // // // // // // // // ... (Kode controller yang lain biarkan saja) ...

// // // // // // // // // // // // // // // // --- TAMBAHAN BARU: GET PARTICIPANTS WITH PROGRESS ---
// // // // // // // // // // // // // // // export const getCourseParticipants = async (req: Request, res: Response) => {
// // // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // // //     const { id } = req.params; // Course ID

// // // // // // // // // // // // // // //     // 1. Ambil Data Kursus untuk menghitung Total Lesson
// // // // // // // // // // // // // // //     const course = await Course.findById(id);
// // // // // // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });

// // // // // // // // // // // // // // //     let totalLessons = 0;
// // // // // // // // // // // // // // //     course.modules.forEach(m => {
// // // // // // // // // // // // // // //         if(m.isActive) {
// // // // // // // // // // // // // // //             m.lessons.forEach(l => {
// // // // // // // // // // // // // // //                 if(l.isActive) totalLessons++;
// // // // // // // // // // // // // // //             });
// // // // // // // // // // // // // // //         }
// // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // //     // 2. Ambil Semua User dengan role STUDENT
// // // // // // // // // // // // // // //     // (Idealnya nanti difilter hanya yang enroll, tapi untuk sekarang semua student)
// // // // // // // // // // // // // // //     const students = await User.find({ role: 'STUDENT' }).select('name email avatarUrl createdAt');

// // // // // // // // // // // // // // //     // 3. Ambil Progress untuk kursus ini
// // // // // // // // // // // // // // //     const progresses = await Progress.find({ courseId: id });

// // // // // // // // // // // // // // //     // 4. Gabungkan Data (Map Students + Progress Calculation)
// // // // // // // // // // // // // // //     const participants = students.map(student => {
// // // // // // // // // // // // // // //         // Cari progress milik student ini
// // // // // // // // // // // // // // //         const studentProgress = progresses.find(p => p.userId.toString() === student._id.toString());
        
// // // // // // // // // // // // // // //         let progressPercent = 0;
// // // // // // // // // // // // // // //         let isCompleted = false;

// // // // // // // // // // // // // // //         if (studentProgress) {
// // // // // // // // // // // // // // //             // Hitung persentase berdasarkan completedLessons vs totalLessons
// // // // // // // // // // // // // // //             const completedCount = studentProgress.completedLessons.length;
// // // // // // // // // // // // // // //             if (totalLessons > 0) {
// // // // // // // // // // // // // // //                 progressPercent = Math.round((completedCount / totalLessons) * 100);
// // // // // // // // // // // // // // //             }
// // // // // // // // // // // // // // //             // Pastikan tidak lebih dari 100%
// // // // // // // // // // // // // // //             if (progressPercent > 100) progressPercent = 100;
            
// // // // // // // // // // // // // // //             isCompleted = studentProgress.completed;
// // // // // // // // // // // // // // //         }

// // // // // // // // // // // // // // //         return {
// // // // // // // // // // // // // // //             _id: student._id,
// // // // // // // // // // // // // // //             name: student.name,
// // // // // // // // // // // // // // //             email: student.email,
// // // // // // // // // // // // // // //             avatarUrl: student.avatarUrl,
// // // // // // // // // // // // // // //             joinDate: student.createdAt, // Tanggal gabung ke sistem (bisa diganti tgl enroll jika ada)
// // // // // // // // // // // // // // //             progress: progressPercent, // <--- INI YANG AKAN DITAMPILKAN
// // // // // // // // // // // // // // //             isCompleted: isCompleted
// // // // // // // // // // // // // // //         };
// // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // //     res.json({ participants });

// // // // // // // // // // // // // // //   } catch (error: any) {
// // // // // // // // // // // // // // //     console.error("Get Participants Error:", error);
// // // // // // // // // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // };
// // // // // // // // // // // // // // import { Request, Response } from 'express';
// // // // // // // // // // // // // // import { Course } from '../models/Course';
// // // // // // // // // // // // // // import { User } from '../models/User';
// // // // // // // // // // // // // // import Enrollment from '../models/Enrollment'; 
// // // // // // // // // // // // // // import { Progress } from '../models/Progress'; 

// // // // // // // // // // // // // // // --- STANDARD CRUD COURSE ---
// // // // // // // // // // // // // // export const createCourse = async (req: Request, res: Response) => {
// // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // //     const course = new Course(req.body);
// // // // // // // // // // // // // //     await course.save();
// // // // // // // // // // // // // //     res.status(201).json(course);
// // // // // // // // // // // // // //   } catch (error: any) {
// // // // // // // // // // // // // //     res.status(400).json({ error: error.message });
// // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // };

// // // // // // // // // // // // // // export const getCourses = async (req: Request, res: Response) => {
// // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // //     const courses = await Course.find()
// // // // // // // // // // // // // //       .populate('facilitatorIds', 'name email avatarUrl')
// // // // // // // // // // // // // //       .sort({ createdAt: -1 });
// // // // // // // // // // // // // //     res.json(courses);
// // // // // // // // // // // // // //   } catch (error: any) {
// // // // // // // // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // };

// // // // // // // // // // // // // // export const getCourseById = async (req: Request, res: Response) => {
// // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // //     const course = await Course.findById(req.params.id)
// // // // // // // // // // // // // //       .populate('facilitatorIds', 'name email avatarUrl');
// // // // // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // // // // // // // // // // // // //     res.json(course);
// // // // // // // // // // // // // //   } catch (error: any) {
// // // // // // // // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // };

// // // // // // // // // // // // // // export const updateCourse = async (req: Request, res: Response) => {
// // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // //     const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
// // // // // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // // // // // // // // // // // // //     res.json(course);
// // // // // // // // // // // // // //   } catch (error: any) {
// // // // // // // // // // // // // //     res.status(400).json({ error: error.message });
// // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // };

// // // // // // // // // // // // // // export const deleteCourse = async (req: Request, res: Response) => {
// // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // //     const course = await Course.findByIdAndDelete(req.params.id);
// // // // // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // // // // // // // // // // // // //     await Enrollment.deleteMany({ course: req.params.id });
// // // // // // // // // // // // // //     await Progress.deleteMany({ courseId: req.params.id });
// // // // // // // // // // // // // //     res.json({ message: 'Kursus berhasil dihapus' });
// // // // // // // // // // // // // //   } catch (error: any) {
// // // // // // // // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // --- MODULE & LESSON MANAGEMENT (Tidak berubah) ---
// // // // // // // // // // // // // // export const addModule = async (req: Request, res: Response) => { try { const { id } = req.params; const course = await Course.findById(id); if (!course) return res.status(404).json({ error: 'Course not found' }); course.modules.push(req.body); await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // // // // // // // // // // // export const updateModule = async (req: Request, res: Response) => { try { const { courseId, moduleId } = req.params; const course = await Course.findById(courseId); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.id(moduleId); if (!module) return res.status(404).json({ error: 'Module not found' }); module.set(req.body); await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // // // // // // // // // // // export const addLesson = async (req: Request, res: Response) => { try { const { courseId, moduleId } = req.params; const course = await Course.findById(courseId); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.id(moduleId); if (!module) return res.status(404).json({ error: 'Module not found' }); module.lessons.push(req.body); await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // // // // // // // // // // // export const updateLesson = async (req: Request, res: Response) => { try { const { courseId, moduleId, lessonId } = req.params; const course = await Course.findById(courseId); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.id(moduleId); if (!module) return res.status(404).json({ error: 'Module not found' }); const lesson = module.lessons.id(lessonId); if (!lesson) return res.status(404).json({ error: 'Lesson not found' }); lesson.set(req.body); await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // // // // // // // // // // // export const deleteLesson = async (req: Request, res: Response) => { try { const { courseId, moduleId, lessonId } = req.params; const course = await Course.findById(courseId); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.id(moduleId); if (module) { module.lessons.pull({ _id: lessonId }); await course.save(); } res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // // // // // // // // // // // export const toggleStatus = async (req: Request, res: Response) => { try { const { id } = req.params; const { moduleId, lessonId } = req.body; const course = await Course.findById(id); if (!course) return res.status(404).json({ error: 'Course not found' }); if (moduleId && lessonId) { const mod = course.modules.id(moduleId); const les = mod?.lessons.id(lessonId); if (les) les.isActive = !les.isActive; } else if (moduleId) { const mod = course.modules.id(moduleId); if (mod) mod.isActive = !mod.isActive; } else { course.isPublished = !course.isPublished; } await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // // // // // // // // // // // export const reorderModules = async (req: Request, res: Response) => { try { const { id } = req.params; const { modules } = req.body; await Course.findByIdAndUpdate(id, { modules }); res.json({ message: 'Urutan disimpan' }); } catch (error: any) { res.status(500).json({ error: error.message }); } };

// // // // // // // // // // // // // // // --- [FIXED & FORCED SYNC] PARTICIPANT MANAGEMENT ---

// // // // // // // // // // // // // // // 1. Get Participants (DENGAN AUTO-SYNC PROGRESS)
// // // // // // // // // // // // // // export const getCourseParticipants = async (req: Request, res: Response) => {
// // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // //     const { id } = req.params; // Course ID

// // // // // // // // // // // // // //     // A. Ambil Data Enrollment (Daftar Siswa Resmi)
// // // // // // // // // // // // // //     const enrollments = await Enrollment.find({ course: id })
// // // // // // // // // // // // // //       .populate('user', 'name email avatarUrl role')
// // // // // // // // // // // // // //       .sort({ createdAt: -1 });

// // // // // // // // // // // // // //     if (!enrollments.length) {
// // // // // // // // // // // // // //         return res.json({ participants: [] });
// // // // // // // // // // // // // //     }

// // // // // // // // // // // // // //     // B. Ambil Total Lesson Kursus (Hanya yang Aktif)
// // // // // // // // // // // // // //     // Gunakan 'any' untuk menghindari error TypeScript pada .modules
// // // // // // // // // // // // // //     const course: any = await Course.findById(id).select('modules').lean();
// // // // // // // // // // // // // //     let totalLessons = 0;
// // // // // // // // // // // // // //     const validLessonIds = new Set<string>();

// // // // // // // // // // // // // //     if (course && course.modules) {
// // // // // // // // // // // // // //         course.modules.forEach((m: any) => {
// // // // // // // // // // // // // //             if (m.isActive) {
// // // // // // // // // // // // // //                 m.lessons.forEach((l: any) => { 
// // // // // // // // // // // // // //                     if (l.isActive) {
// // // // // // // // // // // // // //                         totalLessons++; 
// // // // // // // // // // // // // //                         validLessonIds.add(l._id.toString());
// // // // // // // // // // // // // //                     }
// // // // // // // // // // // // // //                 });
// // // // // // // // // // // // // //             }
// // // // // // // // // // // // // //         });
// // // // // // // // // // // // // //     }

// // // // // // // // // // // // // //     // C. Ambil Progress Record dari semua user yang terdaftar
// // // // // // // // // // // // // //     const userIds = enrollments.map((e: any) => e.user?._id);
// // // // // // // // // // // // // //     const progressRecords = await Progress.find({ 
// // // // // // // // // // // // // //         courseId: id, 
// // // // // // // // // // // // // //         userId: { $in: userIds } 
// // // // // // // // // // // // // //     }).lean();

// // // // // // // // // // // // // //     // D. Gabungkan Data, Hitung Ulang, dan Update Enrollment jika perlu
// // // // // // // // // // // // // //     const participants = await Promise.all(enrollments.map(async (enroll: any) => {
// // // // // // // // // // // // // //         const userObj = enroll.user || {};
        
// // // // // // // // // // // // // //         // Cari progress detail yang cocok
// // // // // // // // // // // // // //         const detail = progressRecords.find((p: any) => p.userId.toString() === userObj._id?.toString());
        
// // // // // // // // // // // // // //         let completedIds: string[] = [];
// // // // // // // // // // // // // //         let finalProgress = 0;

// // // // // // // // // // // // // //         if (detail) {
// // // // // // // // // // // // // //             // Ambil completedLessons dari Progress
// // // // // // // // // // // // // //             const rawCompleted = detail.completedLessons.map((id: any) => id.toString());
            
// // // // // // // // // // // // // //             // Filter hanya lesson yang masih valid/aktif di kursus
// // // // // // // // // // // // // //             completedIds = rawCompleted.filter((id) => validLessonIds.has(id));
            
// // // // // // // // // // // // // //             const realCount = completedIds.length;
            
// // // // // // // // // // // // // //             // Hitung ulang progress agar akurat 100%
// // // // // // // // // // // // // //             if (totalLessons > 0) {
// // // // // // // // // // // // // //                 finalProgress = Math.round((realCount / totalLessons) * 100);
// // // // // // // // // // // // // //             }
// // // // // // // // // // // // // //         }

// // // // // // // // // // // // // //         // [AUTO-SYNC] Jika data di enrollment berbeda dengan hitungan real-time, update enrollment!
// // // // // // // // // // // // // //         // Ini memastikan data sinkron permanen di database
// // // // // // // // // // // // // //         if (enroll.progress !== finalProgress) {
// // // // // // // // // // // // // //             enroll.progress = finalProgress;
// // // // // // // // // // // // // //             // Jangan lupa update status completed juga
// // // // // // // // // // // // // //             if (finalProgress === 100) enroll.isCompleted = true;
// // // // // // // // // // // // // //             await enroll.save(); 
// // // // // // // // // // // // // //         }

// // // // // // // // // // // // // //         return {
// // // // // // // // // // // // // //             _id: enroll._id, 
// // // // // // // // // // // // // //             user: {
// // // // // // // // // // // // // //                 _id: userObj._id,
// // // // // // // // // // // // // //                 name: userObj.name || enroll.registrationData?.fullName || 'Tanpa Nama',
// // // // // // // // // // // // // //                 email: userObj.email || enroll.registrationData?.email || '-',
// // // // // // // // // // // // // //                 avatarUrl: userObj.avatarUrl
// // // // // // // // // // // // // //             },
// // // // // // // // // // // // // //             registrationData: enroll.registrationData,
// // // // // // // // // // // // // //             joinedAt: enroll.createdAt,
            
// // // // // // // // // // // // // //             // Kirim data yang sudah dihitung ulang (pasti sinkron)
// // // // // // // // // // // // // //             progress: finalProgress, 
// // // // // // // // // // // // // //             isCompleted: finalProgress === 100 || enroll.isCompleted,
// // // // // // // // // // // // // //             completedLessons: completedIds, 
            
// // // // // // // // // // // // // //             lessonDetails: detail ? detail.lessonDetails : []
// // // // // // // // // // // // // //         };
// // // // // // // // // // // // // //     }));

// // // // // // // // // // // // // //     res.json({ participants });

// // // // // // // // // // // // // //   } catch (error: any) {
// // // // // // // // // // // // // //     console.error("Get Participants Error:", error);
// // // // // // // // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // 2. Mark Complete by Admin (SINKRONISASI DUA ARAH)
// // // // // // // // // // // // // // export const markCompleteLessonByAdmin = async (req: Request, res: Response) => {
// // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // //         const { studentId, lessonId, courseId } = req.body;

// // // // // // // // // // // // // //         if (!studentId || !lessonId || !courseId) {
// // // // // // // // // // // // // //             return res.status(400).json({ error: 'Data tidak lengkap' });
// // // // // // // // // // // // // //         }

// // // // // // // // // // // // // //         // A. UPDATE PROGRESS (Sisi Siswa)
// // // // // // // // // // // // // //         let progress = await Progress.findOne({ userId: studentId, courseId });

// // // // // // // // // // // // // //         if (!progress) {
// // // // // // // // // // // // // //             progress = new Progress({
// // // // // // // // // // // // // //                 userId: studentId,
// // // // // // // // // // // // // //                 courseId,
// // // // // // // // // // // // // //                 completedLessons: [],
// // // // // // // // // // // // // //                 lessonDetails: []
// // // // // // // // // // // // // //             });
// // // // // // // // // // // // // //         }

// // // // // // // // // // // // // //         const isAlreadyDone = progress.completedLessons.some(
// // // // // // // // // // // // // //             (id: any) => id.toString() === lessonId
// // // // // // // // // // // // // //         );

// // // // // // // // // // // // // //         if (!isAlreadyDone) {
// // // // // // // // // // // // // //             progress.completedLessons.push(lessonId);
            
// // // // // // // // // // // // // //             progress.lessonDetails.push({
// // // // // // // // // // // // // //                 lessonId: lessonId,
// // // // // // // // // // // // // //                 type: 'manual_pass_by_admin',
// // // // // // // // // // // // // //                 submittedAt: new Date()
// // // // // // // // // // // // // //             });

// // // // // // // // // // // // // //             progress.lastAccessed = new Date();
// // // // // // // // // // // // // //             await progress.save();
// // // // // // // // // // // // // //         }

// // // // // // // // // // // // // //         // B. UPDATE ENROLLMENT (Sisi Admin) - Hitung ulang total progress
// // // // // // // // // // // // // //         const enrollment = await Enrollment.findOne({ user: studentId, course: courseId });
// // // // // // // // // // // // // //         if (enrollment) {
// // // // // // // // // // // // // //              const course: any = await Course.findById(courseId).select('modules');
// // // // // // // // // // // // // //              let totalLessons = 0;
// // // // // // // // // // // // // //              if (course && course.modules) {
// // // // // // // // // // // // // //                  course.modules.forEach((m: any) => {
// // // // // // // // // // // // // //                      if(m.isActive) m.lessons.forEach((l: any) => { if(l.isActive) totalLessons++; });
// // // // // // // // // // // // // //                  });
// // // // // // // // // // // // // //              }
             
// // // // // // // // // // // // // //              // Gunakan data terbaru dari progress
// // // // // // // // // // // // // //              const completedCount = progress.completedLessons.length;
// // // // // // // // // // // // // //              const newProgress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
             
// // // // // // // // // // // // // //              enrollment.progress = newProgress;
// // // // // // // // // // // // // //              if (newProgress === 100) enrollment.isCompleted = true;
             
// // // // // // // // // // // // // //              await enrollment.save();
// // // // // // // // // // // // // //         }

// // // // // // // // // // // // // //         res.json({ message: 'Berhasil diluluskan secara manual', progress });

// // // // // // // // // // // // // //     } catch (error: any) {
// // // // // // // // // // // // // //         console.error("Error Admin Manual Pass:", error);
// // // // // // // // // // // // // //         res.status(500).json({ error: error.message });
// // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // 3. Reset Quiz by Admin
// // // // // // // // // // // // // // export const resetQuizByAdmin = async (req: Request, res: Response) => {
// // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // //         const { studentId, quizId } = req.body; 

// // // // // // // // // // // // // //         // Hapus dari Progress
// // // // // // // // // // // // // //         const progress = await Progress.findOne({ userId: studentId });
// // // // // // // // // // // // // //         if (progress) {
// // // // // // // // // // // // // //             progress.completedLessons = progress.completedLessons.filter(
// // // // // // // // // // // // // //                 (id: any) => id.toString() !== quizId
// // // // // // // // // // // // // //             );
            
// // // // // // // // // // // // // //             progress.lessonDetails = progress.lessonDetails.filter(
// // // // // // // // // // // // // //                 (d: any) => d.lessonId.toString() !== quizId
// // // // // // // // // // // // // //             );
            
// // // // // // // // // // // // // //             await progress.save();
// // // // // // // // // // // // // //         }

// // // // // // // // // // // // // //         // Trigger hitung ulang di enrollment next time page load
// // // // // // // // // // // // // //         // Atau update manual disini (opsional)

// // // // // // // // // // // // // //         res.json({ message: 'Reset berhasil' });
// // // // // // // // // // // // // //     } catch (error: any) {
// // // // // // // // // // // // // //         res.status(500).json({ error: error.message });
// // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // };
// // // // // // // // // // // // // import { Request, Response } from 'express';
// // // // // // // // // // // // // import { Course } from '../models/Course';
// // // // // // // // // // // // // import { User } from '../models/User';
// // // // // // // // // // // // // import Enrollment from '../models/Enrollment';
// // // // // // // // // // // // // import { Progress } from '../models/Progress';

// // // // // // // // // // // // // // ==========================================
// // // // // // // // // // // // // // 1. STANDARD CRUD COURSE
// // // // // // // // // // // // // // ==========================================

// // // // // // // // // // // // // export const createCourse = async (req: Request, res: Response) => {
// // // // // // // // // // // // //   try {
// // // // // // // // // // // // //     const course = new Course(req.body);
// // // // // // // // // // // // //     await course.save();
// // // // // // // // // // // // //     res.status(201).json(course);
// // // // // // // // // // // // //   } catch (error: any) {
// // // // // // // // // // // // //     res.status(400).json({ error: error.message });
// // // // // // // // // // // // //   }
// // // // // // // // // // // // // };

// // // // // // // // // // // // // export const getCourses = async (req: Request, res: Response) => {
// // // // // // // // // // // // //   try {
// // // // // // // // // // // // //     const courses = await Course.find()
// // // // // // // // // // // // //       .populate('facilitatorIds', 'name email avatarUrl')
// // // // // // // // // // // // //       .sort({ createdAt: -1 });
// // // // // // // // // // // // //     res.json(courses);
// // // // // // // // // // // // //   } catch (error: any) {
// // // // // // // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // // // // // // //   }
// // // // // // // // // // // // // };

// // // // // // // // // // // // // export const getCourseById = async (req: Request, res: Response) => {
// // // // // // // // // // // // //   try {
// // // // // // // // // // // // //     const course = await Course.findById(req.params.id)
// // // // // // // // // // // // //       .populate('facilitatorIds', 'name email avatarUrl');
    
// // // // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
    
// // // // // // // // // // // // //     res.json(course);
// // // // // // // // // // // // //   } catch (error: any) {
// // // // // // // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // // // // // // //   }
// // // // // // // // // // // // // };

// // // // // // // // // // // // // export const updateCourse = async (req: Request, res: Response) => {
// // // // // // // // // // // // //   try {
// // // // // // // // // // // // //     const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
// // // // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // // // // // // // // // // // //     res.json(course);
// // // // // // // // // // // // //   } catch (error: any) {
// // // // // // // // // // // // //     res.status(400).json({ error: error.message });
// // // // // // // // // // // // //   }
// // // // // // // // // // // // // };

// // // // // // // // // // // // // export const deleteCourse = async (req: Request, res: Response) => {
// // // // // // // // // // // // //   try {
// // // // // // // // // // // // //     const course = await Course.findByIdAndDelete(req.params.id);
// // // // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
    
// // // // // // // // // // // // //     // Hapus data terkait agar database bersih
// // // // // // // // // // // // //     await Enrollment.deleteMany({ course: req.params.id });
// // // // // // // // // // // // //     await Progress.deleteMany({ courseId: req.params.id });

// // // // // // // // // // // // //     res.json({ message: 'Kursus berhasil dihapus' });
// // // // // // // // // // // // //   } catch (error: any) {
// // // // // // // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // // // // // // //   }
// // // // // // // // // // // // // };

// // // // // // // // // // // // // // ==========================================
// // // // // // // // // // // // // // 2. MODULE & LESSON MANAGEMENT
// // // // // // // // // // // // // // ==========================================

// // // // // // // // // // // // // export const addModule = async (req: Request, res: Response) => {
// // // // // // // // // // // // //     try {
// // // // // // // // // // // // //         const { id } = req.params;
// // // // // // // // // // // // //         const course = await Course.findById(id);
// // // // // // // // // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });

// // // // // // // // // // // // //         course.modules.push(req.body);
// // // // // // // // // // // // //         await course.save();
// // // // // // // // // // // // //         res.json(course);
// // // // // // // // // // // // //     } catch (error: any) {
// // // // // // // // // // // // //         res.status(500).json({ error: error.message });
// // // // // // // // // // // // //     }
// // // // // // // // // // // // // };

// // // // // // // // // // // // // export const updateModule = async (req: Request, res: Response) => {
// // // // // // // // // // // // //     try {
// // // // // // // // // // // // //         const { courseId, moduleId } = req.params;
// // // // // // // // // // // // //         const course = await Course.findById(courseId);
// // // // // // // // // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });

// // // // // // // // // // // // //         const module = course.modules.id(moduleId);
// // // // // // // // // // // // //         if (!module) return res.status(404).json({ error: 'Module not found' });

// // // // // // // // // // // // //         module.set(req.body);
// // // // // // // // // // // // //         await course.save();
// // // // // // // // // // // // //         res.json(course);
// // // // // // // // // // // // //     } catch (error: any) {
// // // // // // // // // // // // //         res.status(500).json({ error: error.message });
// // // // // // // // // // // // //     }
// // // // // // // // // // // // // };

// // // // // // // // // // // // // export const addLesson = async (req: Request, res: Response) => {
// // // // // // // // // // // // //     try {
// // // // // // // // // // // // //         const { courseId, moduleId } = req.params;
// // // // // // // // // // // // //         const course = await Course.findById(courseId);
// // // // // // // // // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });

// // // // // // // // // // // // //         const module = course.modules.id(moduleId);
// // // // // // // // // // // // //         if (!module) return res.status(404).json({ error: 'Module not found' });

// // // // // // // // // // // // //         module.lessons.push(req.body);
// // // // // // // // // // // // //         await course.save();
// // // // // // // // // // // // //         res.json(course);
// // // // // // // // // // // // //     } catch (error: any) {
// // // // // // // // // // // // //         res.status(500).json({ error: error.message });
// // // // // // // // // // // // //     }
// // // // // // // // // // // // // };

// // // // // // // // // // // // // export const updateLesson = async (req: Request, res: Response) => {
// // // // // // // // // // // // //     try {
// // // // // // // // // // // // //         const { courseId, moduleId, lessonId } = req.params;
// // // // // // // // // // // // //         const course = await Course.findById(courseId);
// // // // // // // // // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });

// // // // // // // // // // // // //         const module = course.modules.id(moduleId);
// // // // // // // // // // // // //         if (!module) return res.status(404).json({ error: 'Module not found' });

// // // // // // // // // // // // //         const lesson = module.lessons.id(lessonId);
// // // // // // // // // // // // //         if (!lesson) return res.status(404).json({ error: 'Lesson not found' });

// // // // // // // // // // // // //         lesson.set(req.body);
// // // // // // // // // // // // //         await course.save();
// // // // // // // // // // // // //         res.json(course);
// // // // // // // // // // // // //     } catch (error: any) {
// // // // // // // // // // // // //         res.status(500).json({ error: error.message });
// // // // // // // // // // // // //     }
// // // // // // // // // // // // // };

// // // // // // // // // // // // // export const deleteLesson = async (req: Request, res: Response) => {
// // // // // // // // // // // // //     try {
// // // // // // // // // // // // //         const { courseId, moduleId, lessonId } = req.params;
// // // // // // // // // // // // //         const course = await Course.findById(courseId);
// // // // // // // // // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });

// // // // // // // // // // // // //         const module = course.modules.id(moduleId);
// // // // // // // // // // // // //         if (module) {
// // // // // // // // // // // // //             module.lessons.pull({ _id: lessonId }); 
// // // // // // // // // // // // //             await course.save();
// // // // // // // // // // // // //         }
// // // // // // // // // // // // //         res.json(course);
// // // // // // // // // // // // //     } catch (error: any) {
// // // // // // // // // // // // //         res.status(500).json({ error: error.message });
// // // // // // // // // // // // //     }
// // // // // // // // // // // // // };

// // // // // // // // // // // // // export const toggleStatus = async (req: Request, res: Response) => {
// // // // // // // // // // // // //     try {
// // // // // // // // // // // // //         const { id } = req.params;
// // // // // // // // // // // // //         const { moduleId, lessonId } = req.body;
// // // // // // // // // // // // //         const course = await Course.findById(id);
        
// // // // // // // // // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });

// // // // // // // // // // // // //         if (moduleId && lessonId) {
// // // // // // // // // // // // //             const mod = course.modules.id(moduleId);
// // // // // // // // // // // // //             const les = mod?.lessons.id(lessonId);
// // // // // // // // // // // // //             if (les) les.isActive = !les.isActive;
// // // // // // // // // // // // //         } else if (moduleId) {
// // // // // // // // // // // // //             const mod = course.modules.id(moduleId);
// // // // // // // // // // // // //             if (mod) mod.isActive = !mod.isActive;
// // // // // // // // // // // // //         } else {
// // // // // // // // // // // // //             // Toggle course publish status
// // // // // // // // // // // // //             course.isPublished = !course.isPublished;
// // // // // // // // // // // // //         }

// // // // // // // // // // // // //         await course.save();
// // // // // // // // // // // // //         res.json(course);
// // // // // // // // // // // // //     } catch (error: any) {
// // // // // // // // // // // // //         res.status(500).json({ error: error.message });
// // // // // // // // // // // // //     }
// // // // // // // // // // // // // };

// // // // // // // // // // // // // export const reorderModules = async (req: Request, res: Response) => {
// // // // // // // // // // // // //     try {
// // // // // // // // // // // // //         const { id } = req.params;
// // // // // // // // // // // // //         const { modules } = req.body;
// // // // // // // // // // // // //         await Course.findByIdAndUpdate(id, { modules });
// // // // // // // // // // // // //         res.json({ message: 'Urutan disimpan' });
// // // // // // // // // // // // //     } catch (error: any) {
// // // // // // // // // // // // //         res.status(500).json({ error: error.message });
// // // // // // // // // // // // //     }
// // // // // // // // // // // // // };

// // // // // // // // // // // // // // ==========================================
// // // // // // // // // // // // // // 3. PARTICIPANT MANAGEMENT & SYNC (FIXED)
// // // // // // // // // // // // // // ==========================================

// // // // // // // // // // // // // // GET PARTICIPANTS (AUTO-CALCULATE PROGRESS & SYNC)
// // // // // // // // // // // // // export const getCourseParticipants = async (req: Request, res: Response) => {
// // // // // // // // // // // // //   try {
// // // // // // // // // // // // //     const { id } = req.params; // Course ID

// // // // // // // // // // // // //     // A. Ambil Data Enrollment (Daftar Siswa Resmi)
// // // // // // // // // // // // //     const enrollments = await Enrollment.find({ course: id })
// // // // // // // // // // // // //       .populate('user', 'name email avatarUrl role')
// // // // // // // // // // // // //       .sort({ createdAt: -1 })
// // // // // // // // // // // // //       .lean();

// // // // // // // // // // // // //     if (!enrollments.length) {
// // // // // // // // // // // // //         return res.json({ participants: [] });
// // // // // // // // // // // // //     }

// // // // // // // // // // // // //     // B. Ambil Data Progress Detail (Untuk Icon Mata / Jawaban Esai)
// // // // // // // // // // // // //     const userIds = enrollments.map((e: any) => e.user?._id);
// // // // // // // // // // // // //     const progressRecords = await Progress.find({ 
// // // // // // // // // // // // //         courseId: id, 
// // // // // // // // // // // // //         userId: { $in: userIds } 
// // // // // // // // // // // // //     }).lean();

// // // // // // // // // // // // //     // C. Ambil Total Lesson Kursus (Hanya yang Aktif)
// // // // // // // // // // // // //     const course: any = await Course.findById(id).select('modules').lean();
// // // // // // // // // // // // //     let totalLessons = 0;
// // // // // // // // // // // // //     const validLessonIds = new Set<string>();

// // // // // // // // // // // // //     if (course && course.modules) {
// // // // // // // // // // // // //         course.modules.forEach((m: any) => {
// // // // // // // // // // // // //             if (m.isActive) {
// // // // // // // // // // // // //                 m.lessons.forEach((l: any) => { 
// // // // // // // // // // // // //                     if (l.isActive) {
// // // // // // // // // // // // //                         totalLessons++; 
// // // // // // // // // // // // //                         validLessonIds.add(l._id.toString());
// // // // // // // // // // // // //                     }
// // // // // // // // // // // // //                 });
// // // // // // // // // // // // //             }
// // // // // // // // // // // // //         });
// // // // // // // // // // // // //     }

// // // // // // // // // // // // //     // D. Gabungkan Data (Merge) & Hitung Ulang Progress
// // // // // // // // // // // // //     const participants = await Promise.all(enrollments.map(async (enroll: any) => {
// // // // // // // // // // // // //         const userObj = enroll.user || {};
        
// // // // // // // // // // // // //         // Cari progress detail yang cocok di tabel Progress
// // // // // // // // // // // // //         const detail = progressRecords.find((p: any) => p.userId.toString() === userObj._id?.toString());
        
// // // // // // // // // // // // //         let completedIds: string[] = [];
// // // // // // // // // // // // //         let finalProgress = 0;

// // // // // // // // // // // // //         if (detail) {
// // // // // // // // // // // // //             // Ambil completedLessons dari Progress
// // // // // // // // // // // // //             const rawCompleted = detail.completedLessons.map((id: any) => id.toString());
            
// // // // // // // // // // // // //             // Filter: hanya hitung lesson yang VALID (masih ada dan aktif di kursus)
// // // // // // // // // // // // //             completedIds = rawCompleted.filter((id) => validLessonIds.has(id));
            
// // // // // // // // // // // // //             const realCount = completedIds.length;
            
// // // // // // // // // // // // //             // Hitung persentase
// // // // // // // // // // // // //             if (totalLessons > 0) {
// // // // // // // // // // // // //                 finalProgress = Math.round((realCount / totalLessons) * 100);
// // // // // // // // // // // // //             }
// // // // // // // // // // // // //             // Cap at 100
// // // // // // // // // // // // //             if (finalProgress > 100) finalProgress = 100;
// // // // // // // // // // // // //         }

// // // // // // // // // // // // //         // [AUTO-SYNC] Jika data di enrollment berbeda dengan hitungan real-time, update enrollment!
// // // // // // // // // // // // //         // Ini memastikan admin selalu melihat data terbaru yang sinkron dengan siswa
// // // // // // // // // // // // //         if (enroll.progress !== finalProgress) {
// // // // // // // // // // // // //             await Enrollment.updateOne(
// // // // // // // // // // // // //                 { _id: enroll._id }, 
// // // // // // // // // // // // //                 { 
// // // // // // // // // // // // //                     $set: { 
// // // // // // // // // // // // //                         progress: finalProgress, 
// // // // // // // // // // // // //                         isCompleted: finalProgress === 100 
// // // // // // // // // // // // //                     } 
// // // // // // // // // // // // //                 }
// // // // // // // // // // // // //             );
// // // // // // // // // // // // //         }

// // // // // // // // // // // // //         // Status lulus
// // // // // // // // // // // // //         const isCompleted = finalProgress === 100 || enroll.isCompleted;

// // // // // // // // // // // // //         return {
// // // // // // // // // // // // //             _id: enroll._id, // ID Enrollment
// // // // // // // // // // // // //             user: {
// // // // // // // // // // // // //                 _id: userObj._id,
// // // // // // // // // // // // //                 name: userObj.name || enroll.registrationData?.fullName || 'Tanpa Nama',
// // // // // // // // // // // // //                 email: userObj.email || enroll.registrationData?.email || '-',
// // // // // // // // // // // // //                 avatarUrl: userObj.avatarUrl
// // // // // // // // // // // // //             },
// // // // // // // // // // // // //             registrationData: enroll.registrationData,
// // // // // // // // // // // // //             joinedAt: enroll.createdAt,
            
// // // // // // // // // // // // //             // Data untuk UI Admin (Realtime Calculation)
// // // // // // // // // // // // //             progress: finalProgress, 
// // // // // // // // // // // // //             isCompleted: isCompleted,
// // // // // // // // // // // // //             completedLessons: completedIds, // List ID materi selesai (untuk ceklis hijau di modal detail)
            
// // // // // // // // // // // // //             // Detail Jawaban untuk Icon Mata
// // // // // // // // // // // // //             lessonDetails: detail ? detail.lessonDetails : []
// // // // // // // // // // // // //         };
// // // // // // // // // // // // //     }));

// // // // // // // // // // // // //     res.json({ participants });

// // // // // // // // // // // // //   } catch (error: any) {
// // // // // // // // // // // // //     console.error("Get Participants Error:", error);
// // // // // // // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // // // // // // //   }
// // // // // // // // // // // // // };

// // // // // // // // // // // // // // MARK COMPLETE BY ADMIN (SINKRONISASI UPDATE DUA ARAH)
// // // // // // // // // // // // // export const markCompleteLessonByAdmin = async (req: Request, res: Response) => {
// // // // // // // // // // // // //     try {
// // // // // // // // // // // // //         const { studentId, lessonId, courseId } = req.body;

// // // // // // // // // // // // //         if (!studentId || !lessonId || !courseId) {
// // // // // // // // // // // // //             return res.status(400).json({ error: 'Data tidak lengkap' });
// // // // // // // // // // // // //         }

// // // // // // // // // // // // //         // 1. UPDATE PROGRESS (Sisi Siswa)
// // // // // // // // // // // // //         let progress = await Progress.findOne({ userId: studentId, courseId });

// // // // // // // // // // // // //         if (!progress) {
// // // // // // // // // // // // //             progress = new Progress({
// // // // // // // // // // // // //                 userId: studentId,
// // // // // // // // // // // // //                 courseId,
// // // // // // // // // // // // //                 completedLessons: [],
// // // // // // // // // // // // //                 lessonDetails: []
// // // // // // // // // // // // //             });
// // // // // // // // // // // // //         }

// // // // // // // // // // // // //         const strLessonId = lessonId.toString();
// // // // // // // // // // // // //         const isAlreadyDone = progress.completedLessons.some(
// // // // // // // // // // // // //             (id: any) => id.toString() === strLessonId
// // // // // // // // // // // // //         );

// // // // // // // // // // // // //         if (!isAlreadyDone) {
// // // // // // // // // // // // //             progress.completedLessons.push(lessonId);
            
// // // // // // // // // // // // //             // Catat log manual admin
// // // // // // // // // // // // //             progress.lessonDetails.push({
// // // // // // // // // // // // //                 lessonId: lessonId,
// // // // // // // // // // // // //                 type: 'manual_pass_by_admin',
// // // // // // // // // // // // //                 submittedAt: new Date()
// // // // // // // // // // // // //             });

// // // // // // // // // // // // //             progress.lastAccessed = new Date();
// // // // // // // // // // // // //             await progress.save();
// // // // // // // // // // // // //         }

// // // // // // // // // // // // //         // 2. UPDATE ENROLLMENT (Sisi Admin) - Hitung ulang total progress
// // // // // // // // // // // // //         const enrollment = await Enrollment.findOne({ user: studentId, course: courseId });
        
// // // // // // // // // // // // //         if (enrollment) {
// // // // // // // // // // // // //              // Hitung ulang progress secara akurat
// // // // // // // // // // // // //              const course: any = await Course.findById(courseId).select('modules');
// // // // // // // // // // // // //              let totalLessons = 0;
// // // // // // // // // // // // //              if (course && course.modules) {
// // // // // // // // // // // // //                  course.modules.forEach((m: any) => {
// // // // // // // // // // // // //                      if(m.isActive) {
// // // // // // // // // // // // //                         m.lessons.forEach((l: any) => { if(l.isActive) totalLessons++; });
// // // // // // // // // // // // //                      }
// // // // // // // // // // // // //                  });
// // // // // // // // // // // // //              }
             
// // // // // // // // // // // // //              // Gunakan jumlah completedLessons yang baru dari progress
// // // // // // // // // // // // //              const completedCount = progress.completedLessons.length;
// // // // // // // // // // // // //              let newProgress = 0;
// // // // // // // // // // // // //              if (totalLessons > 0) {
// // // // // // // // // // // // //                 newProgress = Math.round((completedCount / totalLessons) * 100);
// // // // // // // // // // // // //              }
// // // // // // // // // // // // //              if (newProgress > 100) newProgress = 100;
             
// // // // // // // // // // // // //              enrollment.progress = newProgress;
// // // // // // // // // // // // //              if (newProgress === 100) enrollment.isCompleted = true;
             
// // // // // // // // // // // // //              await enrollment.save();
// // // // // // // // // // // // //         }

// // // // // // // // // // // // //         res.json({ message: 'Berhasil diluluskan secara manual', progress });

// // // // // // // // // // // // //     } catch (error: any) {
// // // // // // // // // // // // //         console.error("Error Admin Manual Pass:", error);
// // // // // // // // // // // // //         res.status(500).json({ error: error.message });
// // // // // // // // // // // // //     }
// // // // // // // // // // // // // };

// // // // // // // // // // // // // // RESET QUIZ BY ADMIN
// // // // // // // // // // // // // export const resetQuizByAdmin = async (req: Request, res: Response) => {
// // // // // // // // // // // // //     try {
// // // // // // // // // // // // //         const { studentId, quizId } = req.body; // quizId = lessonId

// // // // // // // // // // // // //         // Hapus dari Progress
// // // // // // // // // // // // //         const progress = await Progress.findOne({ userId: studentId });
// // // // // // // // // // // // //         if (progress) {
// // // // // // // // // // // // //             // Remove from completedLessons
// // // // // // // // // // // // //             progress.completedLessons = progress.completedLessons.filter(
// // // // // // // // // // // // //                 (id: any) => id.toString() !== quizId
// // // // // // // // // // // // //             );
            
// // // // // // // // // // // // //             // Remove specific details
// // // // // // // // // // // // //             progress.lessonDetails = progress.lessonDetails.filter(
// // // // // // // // // // // // //                 (d: any) => d.lessonId.toString() !== quizId
// // // // // // // // // // // // //             );
            
// // // // // // // // // // // // //             await progress.save();
// // // // // // // // // // // // //         }

// // // // // // // // // // // // //         // Pemicu hitung ulang di enrollment akan terjadi saat Admin refresh halaman (getCourseParticipants dipanggil)
// // // // // // // // // // // // //         // Atau kita bisa update manual di sini seperti markCompleteLessonByAdmin (minus logic)

// // // // // // // // // // // // //         res.json({ message: 'Reset berhasil' });
// // // // // // // // // // // // //     } catch (error: any) {
// // // // // // // // // // // // //         res.status(500).json({ error: error.message });
// // // // // // // // // // // // //     }
// // // // // // // // // // // // // };
// // // // // // // // // // // // import { Request, Response } from 'express';
// // // // // // // // // // // // import { Course } from '../models/Course';
// // // // // // // // // // // // import { User } from '../models/User';
// // // // // // // // // // // // import Enrollment from '../models/Enrollment';
// // // // // // // // // // // // import { Progress } from '../models/Progress';

// // // // // // // // // // // // // --- STANDARD CRUD COURSE ---
// // // // // // // // // // // // export const createCourse = async (req: Request, res: Response) => { try { const course = new Course(req.body); await course.save(); res.status(201).json(course); } catch (error: any) { res.status(400).json({ error: error.message }); } };
// // // // // // // // // // // // export const getCourses = async (req: Request, res: Response) => { try { const courses = await Course.find().populate('facilitatorIds', 'name email avatarUrl').sort({ createdAt: -1 }); res.json(courses); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // // // // // // // // // export const getCourseById = async (req: Request, res: Response) => { try { const course = await Course.findById(req.params.id).populate('facilitatorIds', 'name email avatarUrl'); if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' }); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // // // // // // // // // export const updateCourse = async (req: Request, res: Response) => { try { const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true }); if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' }); res.json(course); } catch (error: any) { res.status(400).json({ error: error.message }); } };
// // // // // // // // // // // // export const deleteCourse = async (req: Request, res: Response) => { try { const course = await Course.findByIdAndDelete(req.params.id); if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' }); await Enrollment.deleteMany({ course: req.params.id }); await Progress.deleteMany({ courseId: req.params.id }); res.json({ message: 'Kursus berhasil dihapus' }); } catch (error: any) { res.status(500).json({ error: error.message }); } };

// // // // // // // // // // // // // --- MODULE & LESSON MANAGEMENT ---
// // // // // // // // // // // // export const addModule = async (req: Request, res: Response) => { try { const { id } = req.params; const course = await Course.findById(id); if (!course) return res.status(404).json({ error: 'Course not found' }); course.modules.push(req.body); await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // // // // // // // // // export const updateModule = async (req: Request, res: Response) => { try { const { courseId, moduleId } = req.params; const course = await Course.findById(courseId); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.id(moduleId); if (!module) return res.status(404).json({ error: 'Module not found' }); module.set(req.body); await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // // // // // // // // // export const addLesson = async (req: Request, res: Response) => { try { const { courseId, moduleId } = req.params; const course = await Course.findById(courseId); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.id(moduleId); if (!module) return res.status(404).json({ error: 'Module not found' }); module.lessons.push(req.body); await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // // // // // // // // // export const updateLesson = async (req: Request, res: Response) => { try { const { courseId, moduleId, lessonId } = req.params; const course = await Course.findById(courseId); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.id(moduleId); if (!module) return res.status(404).json({ error: 'Module not found' }); const lesson = module.lessons.id(lessonId); if (!lesson) return res.status(404).json({ error: 'Lesson not found' }); lesson.set(req.body); await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // // // // // // // // // export const deleteLesson = async (req: Request, res: Response) => { try { const { courseId, moduleId, lessonId } = req.params; const course = await Course.findById(courseId); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.id(moduleId); if (module) { module.lessons.pull({ _id: lessonId }); await course.save(); } res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // // // // // // // // // export const toggleStatus = async (req: Request, res: Response) => { try { const { id } = req.params; const { moduleId, lessonId } = req.body; const course = await Course.findById(id); if (!course) return res.status(404).json({ error: 'Course not found' }); if (moduleId && lessonId) { const mod = course.modules.id(moduleId); const les = mod?.lessons.id(lessonId); if (les) les.isActive = !les.isActive; } else if (moduleId) { const mod = course.modules.id(moduleId); if (mod) mod.isActive = !mod.isActive; } else { course.isPublished = !course.isPublished; } await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // // // // // // // // // export const reorderModules = async (req: Request, res: Response) => { try { const { id } = req.params; const { modules } = req.body; await Course.findByIdAndUpdate(id, { modules }); res.json({ message: 'Urutan disimpan' }); } catch (error: any) { res.status(500).json({ error: error.message }); } };

// // // // // // // // // // // // // --- [FIXED SECTION] PARTICIPANT MANAGEMENT & SYNC ---

// // // // // // // // // // // // // 1. Get Participants (AUTO-SYNC DENGAN LOGGING)
// // // // // // // // // // // // export const getCourseParticipants = async (req: Request, res: Response) => {
// // // // // // // // // // // //   try {
// // // // // // // // // // // //     const { id } = req.params; 
// // // // // // // // // // // //     console.log(`[ADMIN LOAD] Memuat peserta untuk course: ${id}`);

// // // // // // // // // // // //     // A. Ambil Data Enrollment
// // // // // // // // // // // //     const enrollments = await Enrollment.find({ course: id })
// // // // // // // // // // // //       .populate('user', 'name email avatarUrl role')
// // // // // // // // // // // //       .sort({ createdAt: -1 })
// // // // // // // // // // // //       .lean();

// // // // // // // // // // // //     if (!enrollments.length) return res.json({ participants: [] });

// // // // // // // // // // // //     // B. Ambil Data Progress Asli
// // // // // // // // // // // //     const userIds = enrollments.map((e: any) => e.user?._id);
// // // // // // // // // // // //     const progressRecords = await Progress.find({ courseId: id, userId: { $in: userIds } }).lean();

// // // // // // // // // // // //     // C. Hitung Total Lesson Aktif
// // // // // // // // // // // //     const course: any = await Course.findById(id).select('modules').lean();
// // // // // // // // // // // //     let totalLessons = 0;
// // // // // // // // // // // //     const validLessonIds = new Set<string>();

// // // // // // // // // // // //     if (course && course.modules) {
// // // // // // // // // // // //         course.modules.forEach((m: any) => {
// // // // // // // // // // // //             if (m.isActive) {
// // // // // // // // // // // //                 m.lessons.forEach((l: any) => { 
// // // // // // // // // // // //                     if (l.isActive) {
// // // // // // // // // // // //                         totalLessons++; 
// // // // // // // // // // // //                         validLessonIds.add(l._id.toString());
// // // // // // // // // // // //                     }
// // // // // // // // // // // //                 });
// // // // // // // // // // // //             }
// // // // // // // // // // // //         });
// // // // // // // // // // // //     }
// // // // // // // // // // // //     console.log(`[ADMIN LOAD] Total Lesson Aktif: ${totalLessons}`);

// // // // // // // // // // // //     // D. Gabungkan & Hitung Ulang
// // // // // // // // // // // //     const participants = await Promise.all(enrollments.map(async (enroll: any) => {
// // // // // // // // // // // //         const userObj = enroll.user || {};
// // // // // // // // // // // //         const detail = progressRecords.find((p: any) => p.userId.toString() === userObj._id?.toString());
        
// // // // // // // // // // // //         let completedIds: string[] = [];
// // // // // // // // // // // //         let finalProgress = 0;

// // // // // // // // // // // //         if (detail) {
// // // // // // // // // // // //             const rawCompleted = detail.completedLessons.map((id: any) => id.toString());
// // // // // // // // // // // //             // Hanya hitung lesson yang VALID (ada di validLessonIds)
// // // // // // // // // // // //             completedIds = rawCompleted.filter((id) => validLessonIds.has(id));
            
// // // // // // // // // // // //             const realCount = completedIds.length;
// // // // // // // // // // // //             if (totalLessons > 0) {
// // // // // // // // // // // //                 finalProgress = Math.round((realCount / totalLessons) * 100);
// // // // // // // // // // // //             }
// // // // // // // // // // // //             if (finalProgress > 100) finalProgress = 100;
// // // // // // // // // // // //         }

// // // // // // // // // // // //         // AUTO-SYNC ke Database jika data admin beda dengan realita
// // // // // // // // // // // //         if (enroll.progress !== finalProgress) {
// // // // // // // // // // // //             console.log(`[ADMIN SYNC] Updating User ${userObj.name}: ${enroll.progress}% -> ${finalProgress}%`);
// // // // // // // // // // // //             await Enrollment.updateOne(
// // // // // // // // // // // //                 { _id: enroll._id }, 
// // // // // // // // // // // //                 { $set: { progress: finalProgress, isCompleted: finalProgress === 100 } }
// // // // // // // // // // // //             );
// // // // // // // // // // // //         }

// // // // // // // // // // // //         return {
// // // // // // // // // // // //             _id: enroll._id, 
// // // // // // // // // // // //             user: {
// // // // // // // // // // // //                 _id: userObj._id,
// // // // // // // // // // // //                 name: userObj.name || enroll.registrationData?.fullName || 'Tanpa Nama',
// // // // // // // // // // // //                 email: userObj.email || enroll.registrationData?.email || '-',
// // // // // // // // // // // //                 avatarUrl: userObj.avatarUrl
// // // // // // // // // // // //             },
// // // // // // // // // // // //             registrationData: enroll.registrationData,
// // // // // // // // // // // //             joinedAt: enroll.createdAt,
            
// // // // // // // // // // // //             // Kirim data fresh
// // // // // // // // // // // //             progress: finalProgress, 
// // // // // // // // // // // //             isCompleted: finalProgress === 100 || enroll.isCompleted,
// // // // // // // // // // // //             completedLessons: completedIds, 
// // // // // // // // // // // //             lessonDetails: detail ? detail.lessonDetails : []
// // // // // // // // // // // //         };
// // // // // // // // // // // //     }));

// // // // // // // // // // // //     res.json({ participants });

// // // // // // // // // // // //   } catch (error: any) {
// // // // // // // // // // // //     console.error("Get Participants Error:", error);
// // // // // // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // // // // // //   }
// // // // // // // // // // // // };

// // // // // // // // // // // // // 2. Mark Complete by Admin (SINKRONISASI UPDATE)
// // // // // // // // // // // // export const markCompleteLessonByAdmin = async (req: Request, res: Response) => {
// // // // // // // // // // // //     try {
// // // // // // // // // // // //         const { studentId, lessonId, courseId } = req.body;
// // // // // // // // // // // //         console.log(`[ADMIN ACTION] Luluskan User ${studentId} di Lesson ${lessonId}`);

// // // // // // // // // // // //         if (!studentId || !lessonId || !courseId) return res.status(400).json({ error: 'Data tidak lengkap' });

// // // // // // // // // // // //         // A. UPDATE PROGRESS (Sisi Siswa)
// // // // // // // // // // // //         let progress = await Progress.findOne({ userId: studentId, courseId });
// // // // // // // // // // // //         if (!progress) {
// // // // // // // // // // // //             progress = new Progress({ userId: studentId, courseId, completedLessons: [], lessonDetails: [] });
// // // // // // // // // // // //         }

// // // // // // // // // // // //         const strLessonId = lessonId.toString();
// // // // // // // // // // // //         if (!progress.completedLessons.some((id: any) => id.toString() === strLessonId)) {
// // // // // // // // // // // //             progress.completedLessons.push(lessonId);
// // // // // // // // // // // //             progress.lessonDetails.push({ lessonId: lessonId, type: 'manual_pass_by_admin', submittedAt: new Date() });
// // // // // // // // // // // //             progress.lastAccessed = new Date();
// // // // // // // // // // // //             await progress.save();
// // // // // // // // // // // //         }

// // // // // // // // // // // //         // B. UPDATE ENROLLMENT (Sisi Admin)
// // // // // // // // // // // //         const course: any = await Course.findById(courseId).select('modules');
// // // // // // // // // // // //         let totalLessons = 0;
// // // // // // // // // // // //         if (course) {
// // // // // // // // // // // //              course.modules.forEach((m: any) => {
// // // // // // // // // // // //                  if(m.isActive) m.lessons.forEach((l: any) => { if(l.isActive) totalLessons++; });
// // // // // // // // // // // //              });
// // // // // // // // // // // //         }
        
// // // // // // // // // // // //         const completedCount = progress.completedLessons.length;
// // // // // // // // // // // //         let newProgress = 0;
// // // // // // // // // // // //         if (totalLessons > 0) newProgress = Math.round((completedCount / totalLessons) * 100);
// // // // // // // // // // // //         if (newProgress > 100) newProgress = 100;
        
// // // // // // // // // // // //         await Enrollment.findOneAndUpdate(
// // // // // // // // // // // //             { user: studentId, course: courseId },
// // // // // // // // // // // //             { progress: newProgress, isCompleted: newProgress === 100 }
// // // // // // // // // // // //         );

// // // // // // // // // // // //         res.json({ message: 'Berhasil diluluskan secara manual', progress });

// // // // // // // // // // // //     } catch (error: any) {
// // // // // // // // // // // //         console.error("Error Admin Manual Pass:", error);
// // // // // // // // // // // //         res.status(500).json({ error: error.message });
// // // // // // // // // // // //     }
// // // // // // // // // // // // };

// // // // // // // // // // // // // 3. Reset Quiz by Admin
// // // // // // // // // // // // export const resetQuizByAdmin = async (req: Request, res: Response) => {
// // // // // // // // // // // //     try {
// // // // // // // // // // // //         const { studentId, quizId } = req.body; 
// // // // // // // // // // // //         const progress = await Progress.findOne({ userId: studentId });
// // // // // // // // // // // //         if (progress) {
// // // // // // // // // // // //             progress.completedLessons = progress.completedLessons.filter((id: any) => id.toString() !== quizId);
// // // // // // // // // // // //             progress.lessonDetails = progress.lessonDetails.filter((d: any) => d.lessonId.toString() !== quizId);
// // // // // // // // // // // //             await progress.save();
// // // // // // // // // // // //         }
// // // // // // // // // // // //         res.json({ message: 'Reset berhasil' });
// // // // // // // // // // // //     } catch (error: any) {
// // // // // // // // // // // //         res.status(500).json({ error: error.message });
// // // // // // // // // // // //     }
// // // // // // // // // // // // };
// // // // // // // // // // // import { Request, Response } from 'express';
// // // // // // // // // // // import { Course } from '../models/Course';
// // // // // // // // // // // import { User } from '../models/User';
// // // // // // // // // // // import Enrollment from '../models/Enrollment';
// // // // // // // // // // // import { Progress } from '../models/Progress';

// // // // // // // // // // // // --- STANDARD CRUD COURSE ---
// // // // // // // // // // // export const createCourse = async (req: Request, res: Response) => { try { const course = new Course(req.body); await course.save(); res.status(201).json(course); } catch (error: any) { res.status(400).json({ error: error.message }); } };
// // // // // // // // // // // export const getCourses = async (req: Request, res: Response) => { try { const courses = await Course.find().populate('facilitatorIds', 'name email avatarUrl').sort({ createdAt: -1 }); res.json(courses); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // // // // // // // // export const getCourseById = async (req: Request, res: Response) => { try { const course = await Course.findById(req.params.id).populate('facilitatorIds', 'name email avatarUrl'); if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' }); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // // // // // // // // export const updateCourse = async (req: Request, res: Response) => { try { const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true }); if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' }); res.json(course); } catch (error: any) { res.status(400).json({ error: error.message }); } };
// // // // // // // // // // // export const deleteCourse = async (req: Request, res: Response) => { try { const course = await Course.findByIdAndDelete(req.params.id); if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' }); await Enrollment.deleteMany({ course: req.params.id }); await Progress.deleteMany({ courseId: req.params.id }); res.json({ message: 'Kursus berhasil dihapus' }); } catch (error: any) { res.status(500).json({ error: error.message }); } };

// // // // // // // // // // // // --- MODULE & LESSON MANAGEMENT ---
// // // // // // // // // // // export const addModule = async (req: Request, res: Response) => { try { const { id } = req.params; const course = await Course.findById(id); if (!course) return res.status(404).json({ error: 'Course not found' }); course.modules.push(req.body); await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // // // // // // // // export const updateModule = async (req: Request, res: Response) => { try { const { courseId, moduleId } = req.params; const course = await Course.findById(courseId); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.id(moduleId); if (!module) return res.status(404).json({ error: 'Module not found' }); module.set(req.body); await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // // // // // // // // export const addLesson = async (req: Request, res: Response) => { try { const { courseId, moduleId } = req.params; const course = await Course.findById(courseId); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.id(moduleId); if (!module) return res.status(404).json({ error: 'Module not found' }); module.lessons.push(req.body); await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // // // // // // // // export const updateLesson = async (req: Request, res: Response) => { try { const { courseId, moduleId, lessonId } = req.params; const course = await Course.findById(courseId); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.id(moduleId); if (!module) return res.status(404).json({ error: 'Module not found' }); const lesson = module.lessons.id(lessonId); if (!lesson) return res.status(404).json({ error: 'Lesson not found' }); lesson.set(req.body); await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // // // // // // // // export const deleteLesson = async (req: Request, res: Response) => { try { const { courseId, moduleId, lessonId } = req.params; const course = await Course.findById(courseId); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.id(moduleId); if (module) { module.lessons.pull({ _id: lessonId }); await course.save(); } res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // // // // // // // // export const toggleStatus = async (req: Request, res: Response) => { try { const { id } = req.params; const { moduleId, lessonId } = req.body; const course = await Course.findById(id); if (!course) return res.status(404).json({ error: 'Course not found' }); if (moduleId && lessonId) { const mod = course.modules.id(moduleId); const les = mod?.lessons.id(lessonId); if (les) les.isActive = !les.isActive; } else if (moduleId) { const mod = course.modules.id(moduleId); if (mod) mod.isActive = !mod.isActive; } else { course.isPublished = !course.isPublished; } await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // // // // // // // // export const reorderModules = async (req: Request, res: Response) => { try { const { id } = req.params; const { modules } = req.body; await Course.findByIdAndUpdate(id, { modules }); res.json({ message: 'Urutan disimpan' }); } catch (error: any) { res.status(500).json({ error: error.message }); } };

// // // // // // // // // // // // --- PARTICIPANT MANAGEMENT & SYNC ---

// // // // // // // // // // // // 1. Get Participants (Include Status)
// // // // // // // // // // // export const getCourseParticipants = async (req: Request, res: Response) => {
// // // // // // // // // // //   try {
// // // // // // // // // // //     // Anti-Cache Headers
// // // // // // // // // // //     res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
// // // // // // // // // // //     res.setHeader('Pragma', 'no-cache');
// // // // // // // // // // //     res.setHeader('Expires', '0');

// // // // // // // // // // //     const { id } = req.params; 

// // // // // // // // // // //     // A. Ambil Data Enrollment
// // // // // // // // // // //     const enrollments = await Enrollment.find({ course: id })
// // // // // // // // // // //       .populate('user', 'name email avatarUrl role')
// // // // // // // // // // //       .sort({ createdAt: -1 })
// // // // // // // // // // //       .lean();

// // // // // // // // // // //     if (!enrollments.length) return res.json({ participants: [] });

// // // // // // // // // // //     // B. Ambil Progress
// // // // // // // // // // //     const userIds = enrollments.map((e: any) => e.user?._id);
// // // // // // // // // // //     const progressRecords = await Progress.find({ courseId: id, userId: { $in: userIds } }).lean();

// // // // // // // // // // //     // C. Hitung Total Lesson Aktif
// // // // // // // // // // //     const course: any = await Course.findById(id).select('modules').lean();
// // // // // // // // // // //     let totalLessons = 0;
// // // // // // // // // // //     const validLessonIds = new Set<string>();

// // // // // // // // // // //     if (course && course.modules) {
// // // // // // // // // // //         course.modules.forEach((m: any) => {
// // // // // // // // // // //             if (m.isActive) {
// // // // // // // // // // //                 m.lessons.forEach((l: any) => { 
// // // // // // // // // // //                     if (l.isActive) {
// // // // // // // // // // //                         totalLessons++; 
// // // // // // // // // // //                         validLessonIds.add(l._id.toString());
// // // // // // // // // // //                     }
// // // // // // // // // // //                 });
// // // // // // // // // // //             }
// // // // // // // // // // //         });
// // // // // // // // // // //     }

// // // // // // // // // // //     // D. Merge Data
// // // // // // // // // // //     const participants = await Promise.all(enrollments.map(async (enroll: any) => {
// // // // // // // // // // //         const userObj = enroll.user || {};
// // // // // // // // // // //         const detail = progressRecords.find((p: any) => p.userId.toString() === userObj._id?.toString());
        
// // // // // // // // // // //         let completedIds: string[] = [];
// // // // // // // // // // //         let calculatedProgress = 0;

// // // // // // // // // // //         // Hanya hitung progress jika status ACTIVE
// // // // // // // // // // //         if (enroll.status === 'active' && detail) {
// // // // // // // // // // //             completedIds = detail.completedLessons.map((id: any) => id.toString());
// // // // // // // // // // //             const realCount = completedIds.filter((id) => validLessonIds.has(id)).length;
// // // // // // // // // // //             if (totalLessons > 0) calculatedProgress = Math.round((realCount / totalLessons) * 100);
// // // // // // // // // // //             if (calculatedProgress > 100) calculatedProgress = 100;
// // // // // // // // // // //         }

// // // // // // // // // // //         // Auto-Sync
// // // // // // // // // // //         if (enroll.status === 'active' && enroll.progress !== calculatedProgress) {
// // // // // // // // // // //             await Enrollment.updateOne({ _id: enroll._id }, { $set: { progress: calculatedProgress, isCompleted: calculatedProgress === 100 } });
// // // // // // // // // // //         }

// // // // // // // // // // //         return {
// // // // // // // // // // //             _id: enroll._id, 
// // // // // // // // // // //             user: {
// // // // // // // // // // //                 _id: userObj._id,
// // // // // // // // // // //                 name: userObj.name || enroll.registrationData?.fullName || 'Tanpa Nama',
// // // // // // // // // // //                 email: userObj.email || enroll.registrationData?.email || '-',
// // // // // // // // // // //                 avatarUrl: userObj.avatarUrl
// // // // // // // // // // //             },
// // // // // // // // // // //             registrationData: enroll.registrationData,
// // // // // // // // // // //             joinedAt: enroll.createdAt,
// // // // // // // // // // //             status: enroll.status || 'active', // Default active for backward compatibility
// // // // // // // // // // //             progress: calculatedProgress, 
// // // // // // // // // // //             isCompleted: calculatedProgress === 100 || enroll.isCompleted,
// // // // // // // // // // //             completedLessons: completedIds, 
// // // // // // // // // // //             lessonDetails: detail ? detail.lessonDetails : []
// // // // // // // // // // //         };
// // // // // // // // // // //     }));

// // // // // // // // // // //     res.json({ participants });

// // // // // // // // // // //   } catch (error: any) {
// // // // // // // // // // //     console.error("Get Participants Error:", error);
// // // // // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // // // // //   }
// // // // // // // // // // // };

// // // // // // // // // // // // 2. Verify Enrollment (Approve/Reject)
// // // // // // // // // // // export const verifyEnrollment = async (req: Request, res: Response) => {
// // // // // // // // // // //     try {
// // // // // // // // // // //         const { enrollmentId, action } = req.body; // action: 'approve' | 'reject'

// // // // // // // // // // //         if (!enrollmentId || !action) return res.status(400).json({ error: "Data tidak lengkap" });

// // // // // // // // // // //         if (action === 'reject') {
// // // // // // // // // // //             await Enrollment.findByIdAndDelete(enrollmentId);
// // // // // // // // // // //             return res.json({ message: "Pendaftaran ditolak dan dihapus." });
// // // // // // // // // // //         }

// // // // // // // // // // //         if (action === 'approve') {
// // // // // // // // // // //             const enroll = await Enrollment.findByIdAndUpdate(enrollmentId, { status: 'active', joinedAt: new Date() }, { new: true });
// // // // // // // // // // //             return res.json({ message: "Pendaftaran disetujui.", enrollment: enroll });
// // // // // // // // // // //         }

// // // // // // // // // // //         res.status(400).json({ error: "Aksi tidak valid" });
// // // // // // // // // // //     } catch (error: any) {
// // // // // // // // // // //         res.status(500).json({ error: error.message });
// // // // // // // // // // //     }
// // // // // // // // // // // };

// // // // // // // // // // // // 3. Mark Complete by Admin
// // // // // // // // // // // export const markCompleteLessonByAdmin = async (req: Request, res: Response) => {
// // // // // // // // // // //     try {
// // // // // // // // // // //         const { studentId, lessonId, courseId } = req.body;
// // // // // // // // // // //         if (!studentId || !lessonId || !courseId) return res.status(400).json({ error: 'Data tidak lengkap' });

// // // // // // // // // // //         let progress = await Progress.findOne({ userId: studentId, courseId });
// // // // // // // // // // //         if (!progress) progress = new Progress({ userId: studentId, courseId, completedLessons: [], lessonDetails: [] });

// // // // // // // // // // //         const strLessonId = lessonId.toString();
// // // // // // // // // // //         if (!progress.completedLessons.some((id: any) => id.toString() === strLessonId)) {
// // // // // // // // // // //             progress.completedLessons.push(lessonId);
// // // // // // // // // // //             progress.lessonDetails.push({ lessonId: lessonId, type: 'manual_pass_by_admin', submittedAt: new Date() });
// // // // // // // // // // //             progress.lastAccessed = new Date();
// // // // // // // // // // //             await progress.save();
// // // // // // // // // // //         }

// // // // // // // // // // //         const course: any = await Course.findById(courseId).select('modules');
// // // // // // // // // // //         let totalLessons = 0;
// // // // // // // // // // //         if (course) { course.modules.forEach((m: any) => { if(m.isActive) m.lessons.forEach((l: any) => { if(l.isActive) totalLessons++; }); }); }
        
// // // // // // // // // // //         const completedCount = progress.completedLessons.length;
// // // // // // // // // // //         let newProgress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
// // // // // // // // // // //         if (newProgress > 100) newProgress = 100;
        
// // // // // // // // // // //         await Enrollment.findOneAndUpdate({ user: studentId, course: courseId }, { progress: newProgress, isCompleted: newProgress === 100 });
// // // // // // // // // // //         res.json({ message: 'Berhasil diluluskan secara manual', progress });
// // // // // // // // // // //     } catch (error: any) {
// // // // // // // // // // //         res.status(500).json({ error: error.message });
// // // // // // // // // // //     }
// // // // // // // // // // // };

// // // // // // // // // // // // 4. Reset Quiz
// // // // // // // // // // // export const resetQuizByAdmin = async (req: Request, res: Response) => {
// // // // // // // // // // //     try {
// // // // // // // // // // //         const { studentId, quizId } = req.body; 
// // // // // // // // // // //         const progress = await Progress.findOne({ userId: studentId });
// // // // // // // // // // //         if (progress) {
// // // // // // // // // // //             progress.completedLessons = progress.completedLessons.filter((id: any) => id.toString() !== quizId);
// // // // // // // // // // //             progress.lessonDetails = progress.lessonDetails.filter((d: any) => d.lessonId.toString() !== quizId);
// // // // // // // // // // //             await progress.save();
// // // // // // // // // // //         }
// // // // // // // // // // //         res.json({ message: 'Reset berhasil' });
// // // // // // // // // // //     } catch (error: any) {
// // // // // // // // // // //         res.status(500).json({ error: error.message });
// // // // // // // // // // //     }
// // // // // // // // // // // };
// // // // // // // // // import { Request, Response } from 'express';
// // // // // // // // // import { Course } from '../models/Course';
// // // // // // // // // import { User } from '../models/User';
// // // // // // // // // import Enrollment from '../models/Enrollment';
// // // // // // // // // import { Progress } from '../models/Progress';
// // // // // // // // // import { AuthedRequest } from '../middleware/auth'; // Pastikan path ini benar

// // // // // // // // // // ==========================================
// // // // // // // // // // 1. STANDARD CRUD COURSE
// // // // // // // // // // ==========================================

// // // // // // // // // export const createCourse = async (req: Request, res: Response) => {
// // // // // // // // //   try {
// // // // // // // // //     const course = new Course(req.body);
// // // // // // // // //     await course.save();
// // // // // // // // //     res.status(201).json(course);
// // // // // // // // //   } catch (error: any) {
// // // // // // // // //     res.status(400).json({ error: error.message });
// // // // // // // // //   }
// // // // // // // // // };

// // // // // // // // // export const getCourses = async (req: Request, res: Response) => {
// // // // // // // // //   try {
// // // // // // // // //     const courses = await Course.find()
// // // // // // // // //       .populate('facilitatorIds', 'name email avatarUrl')
// // // // // // // // //       .sort({ createdAt: -1 });
// // // // // // // // //     res.json(courses);
// // // // // // // // //   } catch (error: any) {
// // // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // // //   }
// // // // // // // // // };

// // // // // // // // // export const getCourseById = async (req: Request, res: Response) => {
// // // // // // // // //   try {
// // // // // // // // //     const course = await Course.findById(req.params.id)
// // // // // // // // //       .populate('facilitatorIds', 'name email avatarUrl');
// // // // // // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // // // // // // // //     res.json(course);
// // // // // // // // //   } catch (error: any) {
// // // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // // //   }
// // // // // // // // // };

// // // // // // // // // export const updateCourse = async (req: Request, res: Response) => {
// // // // // // // // //   try {
// // // // // // // // //     const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
// // // // // // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // // // // // // // //     res.json(course);
// // // // // // // // //   } catch (error: any) {
// // // // // // // // //     res.status(400).json({ error: error.message });
// // // // // // // // //   }
// // // // // // // // // };

// // // // // // // // // export const deleteCourse = async (req: Request, res: Response) => {
// // // // // // // // //   try {
// // // // // // // // //     const course = await Course.findByIdAndDelete(req.params.id);
// // // // // // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
    
// // // // // // // // //     await Enrollment.deleteMany({ course: req.params.id });
// // // // // // // // //     await Progress.deleteMany({ courseId: req.params.id });
// // // // // // // // //     res.json({ message: 'Kursus berhasil dihapus' });
// // // // // // // // //   } catch (error: any) {
// // // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // // //   }
// // // // // // // // // };

// // // // // // // // // // ==========================================
// // // // // // // // // // 2. MODULE & LESSON MANAGEMENT
// // // // // // // // // // ==========================================

// // // // // // // // // export const addModule = async (req: Request, res: Response) => {
// // // // // // // // //     try {
// // // // // // // // //         const { id } = req.params;
// // // // // // // // //         const course = await Course.findById(id);
// // // // // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // // //         course.modules.push(req.body);
// // // // // // // // //         await course.save();
// // // // // // // // //         res.json(course);
// // // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // // };

// // // // // // // // // export const updateModule = async (req: Request, res: Response) => {
// // // // // // // // //     try {
// // // // // // // // //         const { courseId, moduleId } = req.params;
// // // // // // // // //         const course = await Course.findById(courseId);
// // // // // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // // //         const module = course.modules.id(moduleId);
// // // // // // // // //         if (!module) return res.status(404).json({ error: 'Module not found' });
// // // // // // // // //         module.set(req.body);
// // // // // // // // //         await course.save();
// // // // // // // // //         res.json(course);
// // // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // // };

// // // // // // // // // export const addLesson = async (req: Request, res: Response) => {
// // // // // // // // //     try {
// // // // // // // // //         const { courseId, moduleId } = req.params;
// // // // // // // // //         const course = await Course.findById(courseId);
// // // // // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // // //         const module = course.modules.id(moduleId);
// // // // // // // // //         if (!module) return res.status(404).json({ error: 'Module not found' });
// // // // // // // // //         module.lessons.push(req.body);
// // // // // // // // //         await course.save();
// // // // // // // // //         res.json(course);
// // // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // // };

// // // // // // // // // export const updateLesson = async (req: Request, res: Response) => {
// // // // // // // // //     try {
// // // // // // // // //         const { courseId, moduleId, lessonId } = req.params;
// // // // // // // // //         const course = await Course.findById(courseId);
// // // // // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // // //         const module = course.modules.id(moduleId);
// // // // // // // // //         if (!module) return res.status(404).json({ error: 'Module not found' });
// // // // // // // // //         const lesson = module.lessons.id(lessonId);
// // // // // // // // //         if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
// // // // // // // // //         lesson.set(req.body);
// // // // // // // // //         await course.save();
// // // // // // // // //         res.json(course);
// // // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // // };

// // // // // // // // // export const deleteLesson = async (req: Request, res: Response) => {
// // // // // // // // //     try {
// // // // // // // // //         const { courseId, moduleId, lessonId } = req.params;
// // // // // // // // //         const course = await Course.findById(courseId);
// // // // // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // // //         const module = course.modules.id(moduleId);
// // // // // // // // //         if (module) {
// // // // // // // // //             module.lessons.pull({ _id: lessonId }); 
// // // // // // // // //             await course.save();
// // // // // // // // //         }
// // // // // // // // //         res.json(course);
// // // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // // };

// // // // // // // // // export const toggleStatus = async (req: Request, res: Response) => {
// // // // // // // // //     try {
// // // // // // // // //         const { id } = req.params;
// // // // // // // // //         const { moduleId, lessonId } = req.body;
// // // // // // // // //         const course = await Course.findById(id);
// // // // // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });

// // // // // // // // //         if (moduleId && lessonId) {
// // // // // // // // //             const mod = course.modules.id(moduleId);
// // // // // // // // //             const les = mod?.lessons.id(lessonId);
// // // // // // // // //             if (les) les.isActive = !les.isActive;
// // // // // // // // //         } else if (moduleId) {
// // // // // // // // //             const mod = course.modules.id(moduleId);
// // // // // // // // //             if (mod) mod.isActive = !mod.isActive;
// // // // // // // // //         } else {
// // // // // // // // //             course.isPublished = !course.isPublished;
// // // // // // // // //         }
// // // // // // // // //         await course.save();
// // // // // // // // //         res.json(course);
// // // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // // };

// // // // // // // // // export const reorderModules = async (req: Request, res: Response) => {
// // // // // // // // //     try {
// // // // // // // // //         const { id } = req.params;
// // // // // // // // //         const { modules } = req.body;
// // // // // // // // //         await Course.findByIdAndUpdate(id, { modules });
// // // // // // // // //         res.json({ message: 'Urutan disimpan' });
// // // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // // };

// // // // // // // // // // ==========================================
// // // // // // // // // // 3. ENROLLMENT & VERIFICATION (FIXED)
// // // // // // // // // // ==========================================

// // // // // // // // // // [FIX] Daftar Kursus -> Status PENDING
// // // // // // // // // export const enrollCourse = async (req: AuthedRequest, res: Response) => {
// // // // // // // // //     try {
// // // // // // // // //         const { courseId } = req.body;
// // // // // // // // //         const userId = req.user?.id;
// // // // // // // // //         if (!userId) return res.status(401).json({ error: 'Unauthorized' });

// // // // // // // // //         const existing = await Enrollment.findOne({ user: userId, course: courseId });
// // // // // // // // //         if (existing) return res.status(400).json({ error: 'Anda sudah mendaftar.' });

// // // // // // // // //         const newEnrollment = new Enrollment({
// // // // // // // // //             user: userId,
// // // // // // // // //             course: courseId,
// // // // // // // // //             status: 'pending', // <--- AGAR MASUK TABEL VERIFIKASI
// // // // // // // // //             progress: 0,
// // // // // // // // //             isCompleted: false,
// // // // // // // // //             enrolledAt: new Date()
// // // // // // // // //         });

// // // // // // // // //         await newEnrollment.save();
// // // // // // // // //         res.status(201).json({ message: 'Pendaftaran berhasil. Menunggu verifikasi.', enrollment: newEnrollment });
// // // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // // };

// // // // // // // // // // [FIX] Verifikasi Peserta (Terima/Tolak)
// // // // // // // // // export const verifyEnrollment = async (req: Request, res: Response) => {
// // // // // // // // //     try {
// // // // // // // // //         const { enrollmentId, action } = req.body; // action: 'approve' | 'reject'

// // // // // // // // //         if (!enrollmentId || !action) return res.status(400).json({ error: "Data tidak lengkap" });

// // // // // // // // //         if (action === 'reject') {
// // // // // // // // //             await Enrollment.findByIdAndDelete(enrollmentId);
// // // // // // // // //             return res.json({ message: "Pendaftaran ditolak." });
// // // // // // // // //         }
// // // // // // // // //         if (action === 'approve') {
// // // // // // // // //             await Enrollment.findByIdAndUpdate(enrollmentId, { status: 'active', joinedAt: new Date() });
// // // // // // // // //             return res.json({ message: "Pendaftaran disetujui." });
// // // // // // // // //         }
// // // // // // // // //         res.status(400).json({ error: "Aksi tidak valid" });
// // // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // // };

// // // // // // // // // // Cek Status (Untuk Tombol di Halaman User)
// // // // // // // // // export const checkEnrollmentStatus = async (req: AuthedRequest, res: Response) => {
// // // // // // // // //     try {
// // // // // // // // //         const { courseId } = req.params;
// // // // // // // // //         const userId = req.user?.id;
// // // // // // // // //         if (!userId) return res.status(401).json({ error: 'Unauthorized' });

// // // // // // // // //         const enrollment = await Enrollment.findOne({ user: userId, course: courseId });
// // // // // // // // //         if (!enrollment) return res.json({ isEnrolled: false, status: null });

// // // // // // // // //         res.json({ isEnrolled: true, status: enrollment.status, progress: enrollment.progress });
// // // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // // };

// // // // // // // // // // ==========================================
// // // // // // // // // // 4. PARTICIPANT MANAGEMENT & SYNC
// // // // // // // // // // ==========================================

// // // // // // // // // export const getCourseParticipants = async (req: Request, res: Response) => {
// // // // // // // // //   try {
// // // // // // // // //     // Header Anti-Cache
// // // // // // // // //     res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
// // // // // // // // //     const { id } = req.params; 

// // // // // // // // //     // A. Ambil Data Enrollment (Termasuk yang Pending)
// // // // // // // // //     const enrollments = await Enrollment.find({ course: id })
// // // // // // // // //       .populate('user', 'name email avatarUrl role')
// // // // // // // // //       .sort({ createdAt: -1 })
// // // // // // // // //       .lean();

// // // // // // // // //     if (!enrollments.length) return res.json({ participants: [] });

// // // // // // // // //     // B. Ambil Progress
// // // // // // // // //     const userIds = enrollments.map((e: any) => e.user?._id);
// // // // // // // // //     const progressRecords = await Progress.find({ courseId: id, userId: { $in: userIds } }).lean();

// // // // // // // // //     // C. Hitung Total Lesson Aktif
// // // // // // // // //     const course: any = await Course.findById(id).select('modules').lean();
// // // // // // // // //     let totalLessons = 0;
// // // // // // // // //     const validLessonIds = new Set<string>();

// // // // // // // // //     if (course && course.modules) {
// // // // // // // // //         course.modules.forEach((m: any) => {
// // // // // // // // //             if (m.isActive) {
// // // // // // // // //                 m.lessons.forEach((l: any) => { 
// // // // // // // // //                     if (l.isActive) {
// // // // // // // // //                         totalLessons++; 
// // // // // // // // //                         validLessonIds.add(l._id.toString());
// // // // // // // // //                     }
// // // // // // // // //                 });
// // // // // // // // //             }
// // // // // // // // //         });
// // // // // // // // //     }

// // // // // // // // //     // D. Merge Data
// // // // // // // // //     const participants = await Promise.all(enrollments.map(async (enroll: any) => {
// // // // // // // // //         const userObj = enroll.user || {};
// // // // // // // // //         const detail = progressRecords.find((p: any) => p.userId.toString() === userObj._id?.toString());
        
// // // // // // // // //         let completedIds: string[] = [];
// // // // // // // // //         let calculatedProgress = 0;

// // // // // // // // //         // Hitung progress hanya jika status 'active'
// // // // // // // // //         if (enroll.status === 'active' && detail) {
// // // // // // // // //             const rawCompleted = detail.completedLessons.map((id: any) => id.toString());
// // // // // // // // //             completedIds = rawCompleted.filter((id) => validLessonIds.has(id));
// // // // // // // // //             if (totalLessons > 0) calculatedProgress = Math.round((completedIds.length / totalLessons) * 100);
// // // // // // // // //             if (calculatedProgress > 100) calculatedProgress = 100;
// // // // // // // // //         }

// // // // // // // // //         // Auto-Sync
// // // // // // // // //         if (enroll.status === 'active' && enroll.progress !== calculatedProgress) {
// // // // // // // // //             await Enrollment.updateOne(
// // // // // // // // //                 { _id: enroll._id }, 
// // // // // // // // //                 { $set: { progress: calculatedProgress, isCompleted: calculatedProgress === 100 } }
// // // // // // // // //             );
// // // // // // // // //         }

// // // // // // // // //         return {
// // // // // // // // //             _id: enroll._id, 
// // // // // // // // //             user: {
// // // // // // // // //                 _id: userObj._id,
// // // // // // // // //                 name: userObj.name || enroll.registrationData?.fullName || 'Tanpa Nama',
// // // // // // // // //                 email: userObj.email || enroll.registrationData?.email || '-',
// // // // // // // // //                 avatarUrl: userObj.avatarUrl
// // // // // // // // //             },
// // // // // // // // //             status: enroll.status || 'active', // Default fallback
// // // // // // // // //             joinedAt: enroll.createdAt,
// // // // // // // // //             progress: calculatedProgress, 
// // // // // // // // //             isCompleted: calculatedProgress === 100 || enroll.isCompleted,
// // // // // // // // //             completedLessons: completedIds, 
// // // // // // // // //             lessonDetails: detail ? detail.lessonDetails : []
// // // // // // // // //         };
// // // // // // // // //     }));

// // // // // // // // //     res.json({ participants });
// // // // // // // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // // };

// // // // // // // // // export const markCompleteLessonByAdmin = async (req: Request, res: Response) => {
// // // // // // // // //     try {
// // // // // // // // //         const { studentId, lessonId, courseId } = req.body;
// // // // // // // // //         let progress = await Progress.findOne({ userId: studentId, courseId });
// // // // // // // // //         if (!progress) progress = new Progress({ userId: studentId, courseId, completedLessons: [], lessonDetails: [] });

// // // // // // // // //         const strLessonId = lessonId.toString();
// // // // // // // // //         if (!progress.completedLessons.some((id: any) => id.toString() === strLessonId)) {
// // // // // // // // //             progress.completedLessons.push(lessonId);
// // // // // // // // //             await progress.save();
// // // // // // // // //         }
// // // // // // // // //         // Recalculate enrollment progress
// // // // // // // // //         const course: any = await Course.findById(courseId).select('modules');
// // // // // // // // //         let totalLessons = 0;
// // // // // // // // //         if(course) course.modules.forEach((m:any) => { if(m.isActive) m.lessons.forEach((l:any) => { if(l.isActive) totalLessons++; }); });
// // // // // // // // //         let newProgress = totalLessons > 0 ? Math.round((progress.completedLessons.length / totalLessons) * 100) : 0;
// // // // // // // // //         await Enrollment.findOneAndUpdate({ user: studentId, course: courseId }, { progress: newProgress, isCompleted: newProgress === 100 });
// // // // // // // // //         res.json({ message: 'Berhasil diluluskan', progress });
// // // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // // };

// // // // // // // // // export const resetQuizByAdmin = async (req: Request, res: Response) => {
// // // // // // // // //     try {
// // // // // // // // //         const { studentId, quizId } = req.body; 
// // // // // // // // //         const progress = await Progress.findOne({ userId: studentId });
// // // // // // // // //         if (progress) {
// // // // // // // // //             progress.completedLessons = progress.completedLessons.filter((id: any) => id.toString() !== quizId);
// // // // // // // // //             await progress.save();
// // // // // // // // //         }
// // // // // // // // //         res.json({ message: 'Reset berhasil' });
// // // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // // };
// // // // // // // // import { Request, Response } from 'express';
// // // // // // // // import { Course } from '../models/Course';
// // // // // // // // import { User } from '../models/User';
// // // // // // // // import Enrollment from '../models/Enrollment';
// // // // // // // // import { Progress } from '../models/Progress';
// // // // // // // // import { AuthedRequest } from '../middleware/auth'; 

// // // // // // // // // ==========================================
// // // // // // // // // 1. STANDARD CRUD COURSE
// // // // // // // // // ==========================================

// // // // // // // // export const createCourse = async (req: Request, res: Response) => {
// // // // // // // //   try {
// // // // // // // //     const course = new Course(req.body);
// // // // // // // //     await course.save();
// // // // // // // //     res.status(201).json(course);
// // // // // // // //   } catch (error: any) {
// // // // // // // //     res.status(400).json({ error: error.message });
// // // // // // // //   }
// // // // // // // // };

// // // // // // // // // [FIX] Mengembalikan object { courses } agar terbaca di Frontend Admin
// // // // // // // // export const getCourses = async (req: Request, res: Response) => {
// // // // // // // //   try {
// // // // // // // //     const courses = await Course.find()
// // // // // // // //       .populate('facilitatorIds', 'name email avatarUrl')
// // // // // // // //       .sort({ createdAt: -1 });
    
// // // // // // // //     res.json({ courses }); 
// // // // // // // //   } catch (error: any) {
// // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // //   }
// // // // // // // // };

// // // // // // // // export const getCourseById = async (req: Request, res: Response) => {
// // // // // // // //   try {
// // // // // // // //     const course = await Course.findById(req.params.id)
// // // // // // // //       .populate('facilitatorIds', 'name email avatarUrl');
// // // // // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // // // // // // //     res.json(course);
// // // // // // // //   } catch (error: any) {
// // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // //   }
// // // // // // // // };

// // // // // // // // export const updateCourse = async (req: Request, res: Response) => {
// // // // // // // //   try {
// // // // // // // //     const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
// // // // // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // // // // // // //     res.json(course);
// // // // // // // //   } catch (error: any) {
// // // // // // // //     res.status(400).json({ error: error.message });
// // // // // // // //   }
// // // // // // // // };

// // // // // // // // export const deleteCourse = async (req: Request, res: Response) => {
// // // // // // // //   try {
// // // // // // // //     const course = await Course.findByIdAndDelete(req.params.id);
// // // // // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
    
// // // // // // // //     await Enrollment.deleteMany({ course: req.params.id });
// // // // // // // //     await Progress.deleteMany({ courseId: req.params.id });
    
// // // // // // // //     res.json({ message: 'Kursus berhasil dihapus' });
// // // // // // // //   } catch (error: any) {
// // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // //   }
// // // // // // // // };

// // // // // // // // // ==========================================
// // // // // // // // // 2. MODULE & LESSON MANAGEMENT
// // // // // // // // // ==========================================

// // // // // // // // export const addModule = async (req: Request, res: Response) => {
// // // // // // // //     try {
// // // // // // // //         const { id } = req.params;
// // // // // // // //         const course = await Course.findById(id);
// // // // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // //         course.modules.push(req.body);
// // // // // // // //         await course.save();
// // // // // // // //         res.json(course);
// // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // };

// // // // // // // // export const updateModule = async (req: Request, res: Response) => {
// // // // // // // //     try {
// // // // // // // //         const { courseId, moduleId } = req.params;
// // // // // // // //         const course = await Course.findById(courseId);
// // // // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // //         const module = course.modules.id(moduleId);
// // // // // // // //         if (!module) return res.status(404).json({ error: 'Module not found' });
// // // // // // // //         module.set(req.body);
// // // // // // // //         await course.save();
// // // // // // // //         res.json(course);
// // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // };

// // // // // // // // export const addLesson = async (req: Request, res: Response) => {
// // // // // // // //     try {
// // // // // // // //         const { courseId, moduleId } = req.params;
// // // // // // // //         const course = await Course.findById(courseId);
// // // // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // //         const module = course.modules.id(moduleId);
// // // // // // // //         if (!module) return res.status(404).json({ error: 'Module not found' });
// // // // // // // //         module.lessons.push(req.body);
// // // // // // // //         await course.save();
// // // // // // // //         res.json(course);
// // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // };

// // // // // // // // export const updateLesson = async (req: Request, res: Response) => {
// // // // // // // //     try {
// // // // // // // //         const { courseId, moduleId, lessonId } = req.params;
// // // // // // // //         const course = await Course.findById(courseId);
// // // // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // //         const module = course.modules.id(moduleId);
// // // // // // // //         if (!module) return res.status(404).json({ error: 'Module not found' });
// // // // // // // //         const lesson = module.lessons.id(lessonId);
// // // // // // // //         if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
// // // // // // // //         lesson.set(req.body);
// // // // // // // //         await course.save();
// // // // // // // //         res.json(course);
// // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // };

// // // // // // // // export const deleteLesson = async (req: Request, res: Response) => {
// // // // // // // //     try {
// // // // // // // //         const { courseId, moduleId, lessonId } = req.params;
// // // // // // // //         const course = await Course.findById(courseId);
// // // // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // //         const module = course.modules.id(moduleId);
// // // // // // // //         if (module) {
// // // // // // // //             module.lessons.pull({ _id: lessonId }); 
// // // // // // // //             await course.save();
// // // // // // // //         }
// // // // // // // //         res.json(course);
// // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // };

// // // // // // // // export const toggleStatus = async (req: Request, res: Response) => {
// // // // // // // //     try {
// // // // // // // //         const { id } = req.params;
// // // // // // // //         const { moduleId, lessonId } = req.body;
// // // // // // // //         const course = await Course.findById(id);
// // // // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });

// // // // // // // //         if (moduleId && lessonId) {
// // // // // // // //             const mod = course.modules.id(moduleId);
// // // // // // // //             const les = mod?.lessons.id(lessonId);
// // // // // // // //             if (les) les.isActive = !les.isActive;
// // // // // // // //         } else if (moduleId) {
// // // // // // // //             const mod = course.modules.id(moduleId);
// // // // // // // //             if (mod) mod.isActive = !mod.isActive;
// // // // // // // //         } else {
// // // // // // // //             course.isPublished = !course.isPublished;
// // // // // // // //         }
// // // // // // // //         await course.save();
// // // // // // // //         res.json(course);
// // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // };

// // // // // // // // export const reorderModules = async (req: Request, res: Response) => {
// // // // // // // //     try {
// // // // // // // //         const { id } = req.params;
// // // // // // // //         const { modules } = req.body;
// // // // // // // //         await Course.findByIdAndUpdate(id, { modules });
// // // // // // // //         res.json({ message: 'Urutan disimpan' });
// // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // };

// // // // // // // // // ==========================================
// // // // // // // // // 3. ENROLLMENT & VERIFICATION
// // // // // // // // // ==========================================

// // // // // // // // // [FIX] Menggunakan req.user?.id (bukan userId) sesuai Type Definition
// // // // // // // // export const enrollCourse = async (req: AuthedRequest, res: Response) => {
// // // // // // // //     try {
// // // // // // // //         const { courseId } = req.params; 
// // // // // // // //         // [FIX TS Error] Menggunakan .id karena interface user Anda { id: string ... }
// // // // // // // //         const userId = req.user?.id; 
        
// // // // // // // //         if (!userId) return res.status(401).json({ error: 'Unauthorized' });

// // // // // // // //         const existing = await Enrollment.findOne({ user: userId, course: courseId });
// // // // // // // //         if (existing) return res.status(400).json({ error: 'Anda sudah mendaftar.' });

// // // // // // // //         const newEnrollment = new Enrollment({
// // // // // // // //             user: userId,
// // // // // // // //             course: courseId,
// // // // // // // //             status: 'pending', 
// // // // // // // //             progress: 0,
// // // // // // // //             isCompleted: false,
// // // // // // // //             enrolledAt: new Date()
// // // // // // // //         });

// // // // // // // //         await newEnrollment.save();
// // // // // // // //         res.status(201).json({ message: 'Pendaftaran berhasil. Menunggu verifikasi.', enrollment: newEnrollment });
// // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // };

// // // // // // // // export const verifyEnrollment = async (req: Request, res: Response) => {
// // // // // // // //     try {
// // // // // // // //         const { enrollmentId, action } = req.body; 

// // // // // // // //         if (!enrollmentId || !action) return res.status(400).json({ error: "Data tidak lengkap" });

// // // // // // // //         if (action === 'reject') {
// // // // // // // //             await Enrollment.findByIdAndDelete(enrollmentId);
// // // // // // // //             return res.json({ message: "Pendaftaran ditolak." });
// // // // // // // //         }
// // // // // // // //         if (action === 'approve') {
// // // // // // // //             await Enrollment.findByIdAndUpdate(enrollmentId, { status: 'active', joinedAt: new Date() });
// // // // // // // //             return res.json({ message: "Pendaftaran disetujui." });
// // // // // // // //         }
// // // // // // // //         res.status(400).json({ error: "Aksi tidak valid" });
// // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // };

// // // // // // // // // [FIX] Menggunakan req.user?.id
// // // // // // // // export const checkEnrollmentStatus = async (req: AuthedRequest, res: Response) => {
// // // // // // // //     try {
// // // // // // // //         const { courseId } = req.params;
// // // // // // // //         // [FIX TS Error]
// // // // // // // //         const userId = req.user?.id;
        
// // // // // // // //         if (!userId) return res.status(401).json({ error: 'Unauthorized' });

// // // // // // // //         const enrollment = await Enrollment.findOne({ user: userId, course: courseId });
// // // // // // // //         if (!enrollment) return res.json({ isEnrolled: false, status: null });

// // // // // // // //         res.json({ isEnrolled: true, status: enrollment.status, progress: enrollment.progress });
// // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // };

// // // // // // // // // ==========================================
// // // // // // // // // 4. PARTICIPANT MANAGEMENT & SYNC
// // // // // // // // // ==========================================

// // // // // // // // export const getCourseParticipants = async (req: Request, res: Response) => {
// // // // // // // //   try {
// // // // // // // //     res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
// // // // // // // //     const { id } = req.params; 

// // // // // // // //     // A. Ambil Data Enrollment
// // // // // // // //     const enrollments = await Enrollment.find({ course: id })
// // // // // // // //       .populate('user', 'name email avatarUrl role')
// // // // // // // //       .sort({ createdAt: -1 })
// // // // // // // //       .lean();

// // // // // // // //     if (!enrollments.length) return res.json({ participants: [] });

// // // // // // // //     // B. Ambil Progress User
// // // // // // // //     const userIds = enrollments.map((e: any) => e.user?._id);
// // // // // // // //     const progressRecords = await Progress.find({ courseId: id, userId: { $in: userIds } }).lean();

// // // // // // // //     // C. Hitung Total Lesson Aktif
// // // // // // // //     const course: any = await Course.findById(id).select('modules').lean();
// // // // // // // //     let totalLessons = 0;
// // // // // // // //     const validLessonIds = new Set<string>();

// // // // // // // //     if (course && course.modules) {
// // // // // // // //         course.modules.forEach((m: any) => {
// // // // // // // //             if (m.isActive) {
// // // // // // // //                 m.lessons.forEach((l: any) => { 
// // // // // // // //                     if (l.isActive) {
// // // // // // // //                         totalLessons++; 
// // // // // // // //                         validLessonIds.add(l._id.toString());
// // // // // // // //                     }
// // // // // // // //                 });
// // // // // // // //             }
// // // // // // // //         });
// // // // // // // //     }

// // // // // // // //     // D. Merge Data
// // // // // // // //     const participants = await Promise.all(enrollments.map(async (enroll: any) => {
// // // // // // // //         const userObj = enroll.user || {};
// // // // // // // //         const detail = progressRecords.find((p: any) => p.userId.toString() === userObj._id?.toString());
        
// // // // // // // //         let completedIds: string[] = [];
// // // // // // // //         let calculatedProgress = 0;

// // // // // // // //         if ((enroll.status === 'active' || enroll.status === 'approved') && detail) {
// // // // // // // //             const rawCompleted = detail.completedLessons.map((id: any) => id.toString());
// // // // // // // //             completedIds = rawCompleted.filter((id) => validLessonIds.has(id));
            
// // // // // // // //             if (totalLessons > 0) {
// // // // // // // //                 calculatedProgress = Math.round((completedIds.length / totalLessons) * 100);
// // // // // // // //             }
// // // // // // // //             if (calculatedProgress > 100) calculatedProgress = 100;
// // // // // // // //         }

// // // // // // // //         if ((enroll.status === 'active' || enroll.status === 'approved') && enroll.progress !== calculatedProgress) {
// // // // // // // //             await Enrollment.updateOne(
// // // // // // // //                 { _id: enroll._id }, 
// // // // // // // //                 { $set: { progress: calculatedProgress, isCompleted: calculatedProgress === 100 } }
// // // // // // // //             );
// // // // // // // //         }

// // // // // // // //         return {
// // // // // // // //             _id: enroll._id, 
// // // // // // // //             user: {
// // // // // // // //                 _id: userObj._id,
// // // // // // // //                 name: userObj.name || enroll.registrationData?.fullName || 'Tanpa Nama',
// // // // // // // //                 email: userObj.email || enroll.registrationData?.email || '-',
// // // // // // // //                 avatarUrl: userObj.avatarUrl
// // // // // // // //             },
// // // // // // // //             status: enroll.status || 'pending', 
// // // // // // // //             joinedAt: enroll.createdAt,
// // // // // // // //             progress: calculatedProgress, 
// // // // // // // //             isCompleted: calculatedProgress === 100 || enroll.isCompleted,
// // // // // // // //             completedLessons: completedIds, 
// // // // // // // //             lessonDetails: detail ? detail.lessonDetails : []
// // // // // // // //         };
// // // // // // // //     }));

// // // // // // // //     res.json({ participants });
// // // // // // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // };

// // // // // // // // export const markCompleteLessonByAdmin = async (req: Request, res: Response) => {
// // // // // // // //     try {
// // // // // // // //         const { studentId, lessonId, courseId } = req.body;
        
// // // // // // // //         let progress = await Progress.findOne({ userId: studentId, courseId });
// // // // // // // //         if (!progress) progress = new Progress({ userId: studentId, courseId, completedLessons: [], lessonDetails: [] });

// // // // // // // //         const strLessonId = lessonId.toString();
// // // // // // // //         if (!progress.completedLessons.some((id: any) => id.toString() === strLessonId)) {
// // // // // // // //             progress.completedLessons.push(lessonId);
// // // // // // // //             await progress.save();
// // // // // // // //         }

// // // // // // // //         const course: any = await Course.findById(courseId).select('modules');
// // // // // // // //         let totalLessons = 0;
// // // // // // // //         if(course) course.modules.forEach((m:any) => { if(m.isActive) m.lessons.forEach((l:any) => { if(l.isActive) totalLessons++; }); });
        
// // // // // // // //         let newProgress = totalLessons > 0 ? Math.round((progress.completedLessons.length / totalLessons) * 100) : 0;
// // // // // // // //         if (newProgress > 100) newProgress = 100;

// // // // // // // //         await Enrollment.findOneAndUpdate(
// // // // // // // //             { user: studentId, course: courseId }, 
// // // // // // // //             { progress: newProgress, isCompleted: newProgress === 100 }
// // // // // // // //         );

// // // // // // // //         res.json({ message: 'Berhasil diluluskan', progress: newProgress });
// // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // };

// // // // // // // // export const resetQuizByAdmin = async (req: Request, res: Response) => {
// // // // // // // //     try {
// // // // // // // //         const { studentId, quizId } = req.body; 
// // // // // // // //         const progress = await Progress.findOne({ userId: studentId });
// // // // // // // //         if (progress) {
// // // // // // // //             progress.completedLessons = progress.completedLessons.filter((id: any) => id.toString() !== quizId);
// // // // // // // //             await progress.save();
// // // // // // // //         }
// // // // // // // //         res.json({ message: 'Reset berhasil' });
// // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // };
// // // // // // // import { Request, Response } from 'express';
// // // // // // // import { Course } from '../models/Course';
// // // // // // // import { User } from '../models/User';
// // // // // // // import Enrollment from '../models/Enrollment';
// // // // // // // import { Progress } from '../models/Progress';
// // // // // // // import { Message } from '../models/Message'; // Pastikan path model Message benar
// // // // // // // import { AuthedRequest } from '../middleware/auth'; 

// // // // // // // // ==========================================
// // // // // // // // 1. STANDARD CRUD COURSE
// // // // // // // // ==========================================

// // // // // // // export const createCourse = async (req: Request, res: Response) => {
// // // // // // //   try {
// // // // // // //     const course = new Course(req.body);
// // // // // // //     await course.save();
// // // // // // //     res.status(201).json(course);
// // // // // // //   } catch (error: any) {
// // // // // // //     res.status(400).json({ error: error.message });
// // // // // // //   }
// // // // // // // };

// // // // // // // export const getCourses = async (req: Request, res: Response) => {
// // // // // // //   try {
// // // // // // //     const courses = await Course.find()
// // // // // // //       .populate('facilitatorIds', 'name email avatarUrl')
// // // // // // //       .sort({ createdAt: -1 });
    
// // // // // // //     res.json({ courses }); 
// // // // // // //   } catch (error: any) {
// // // // // // //     res.status(500).json({ error: error.message });
// // // // // // //   }
// // // // // // // };

// // // // // // // export const getCourseById = async (req: Request, res: Response) => {
// // // // // // //   try {
// // // // // // //     const course = await Course.findById(req.params.id)
// // // // // // //       .populate('facilitatorIds', 'name email avatarUrl');
// // // // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // // // // // //     res.json(course);
// // // // // // //   } catch (error: any) {
// // // // // // //     res.status(500).json({ error: error.message });
// // // // // // //   }
// // // // // // // };

// // // // // // // export const updateCourse = async (req: Request, res: Response) => {
// // // // // // //   try {
// // // // // // //     const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
// // // // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // // // // // //     res.json(course);
// // // // // // //   } catch (error: any) {
// // // // // // //     res.status(400).json({ error: error.message });
// // // // // // //   }
// // // // // // // };

// // // // // // // export const deleteCourse = async (req: Request, res: Response) => {
// // // // // // //   try {
// // // // // // //     const course = await Course.findByIdAndDelete(req.params.id);
// // // // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
    
// // // // // // //     await Enrollment.deleteMany({ course: req.params.id });
// // // // // // //     await Progress.deleteMany({ courseId: req.params.id });
    
// // // // // // //     res.json({ message: 'Kursus berhasil dihapus' });
// // // // // // //   } catch (error: any) {
// // // // // // //     res.status(500).json({ error: error.message });
// // // // // // //   }
// // // // // // // };

// // // // // // // // ==========================================
// // // // // // // // 2. MODULE & LESSON MANAGEMENT
// // // // // // // // ==========================================

// // // // // // // export const addModule = async (req: Request, res: Response) => {
// // // // // // //     try {
// // // // // // //         const { id } = req.params;
// // // // // // //         const course = await Course.findById(id);
// // // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // //         course.modules.push(req.body);
// // // // // // //         await course.save();
// // // // // // //         res.json(course);
// // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // };

// // // // // // // export const updateModule = async (req: Request, res: Response) => {
// // // // // // //     try {
// // // // // // //         const { courseId, moduleId } = req.params;
// // // // // // //         const course = await Course.findById(courseId);
// // // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // //         const module = course.modules.id(moduleId);
// // // // // // //         if (!module) return res.status(404).json({ error: 'Module not found' });
// // // // // // //         module.set(req.body);
// // // // // // //         await course.save();
// // // // // // //         res.json(course);
// // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // };

// // // // // // // export const addLesson = async (req: Request, res: Response) => {
// // // // // // //     try {
// // // // // // //         const { courseId, moduleId } = req.params;
// // // // // // //         const course = await Course.findById(courseId);
// // // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // //         const module = course.modules.id(moduleId);
// // // // // // //         if (!module) return res.status(404).json({ error: 'Module not found' });
// // // // // // //         module.lessons.push(req.body);
// // // // // // //         await course.save();
// // // // // // //         res.json(course);
// // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // };

// // // // // // // export const updateLesson = async (req: Request, res: Response) => {
// // // // // // //     try {
// // // // // // //         const { courseId, moduleId, lessonId } = req.params;
// // // // // // //         const course = await Course.findById(courseId);
// // // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // //         const module = course.modules.id(moduleId);
// // // // // // //         if (!module) return res.status(404).json({ error: 'Module not found' });
// // // // // // //         const lesson = module.lessons.id(lessonId);
// // // // // // //         if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
// // // // // // //         lesson.set(req.body);
// // // // // // //         await course.save();
// // // // // // //         res.json(course);
// // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // };

// // // // // // // export const deleteLesson = async (req: Request, res: Response) => {
// // // // // // //     try {
// // // // // // //         const { courseId, moduleId, lessonId } = req.params;
// // // // // // //         const course = await Course.findById(courseId);
// // // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // //         const module = course.modules.id(moduleId);
// // // // // // //         if (module) {
// // // // // // //             module.lessons.pull({ _id: lessonId }); 
// // // // // // //             await course.save();
// // // // // // //         }
// // // // // // //         res.json(course);
// // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // };

// // // // // // // export const toggleStatus = async (req: Request, res: Response) => {
// // // // // // //     try {
// // // // // // //         const { id } = req.params;
// // // // // // //         const { moduleId, lessonId } = req.body;
// // // // // // //         const course = await Course.findById(id);
// // // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });

// // // // // // //         if (moduleId && lessonId) {
// // // // // // //             const mod = course.modules.id(moduleId);
// // // // // // //             const les = mod?.lessons.id(lessonId);
// // // // // // //             if (les) les.isActive = !les.isActive;
// // // // // // //         } else if (moduleId) {
// // // // // // //             const mod = course.modules.id(moduleId);
// // // // // // //             if (mod) mod.isActive = !mod.isActive;
// // // // // // //         } else {
// // // // // // //             course.isPublished = !course.isPublished;
// // // // // // //         }
// // // // // // //         await course.save();
// // // // // // //         res.json(course);
// // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // };

// // // // // // // export const reorderModules = async (req: Request, res: Response) => {
// // // // // // //     try {
// // // // // // //         const { id } = req.params;
// // // // // // //         const { modules } = req.body;
// // // // // // //         await Course.findByIdAndUpdate(id, { modules });
// // // // // // //         res.json({ message: 'Urutan disimpan' });
// // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // };

// // // // // // // // ==========================================
// // // // // // // // 3. ENROLLMENT & VERIFICATION
// // // // // // // // ==========================================

// // // // // // // export const enrollCourse = async (req: AuthedRequest, res: Response) => {
// // // // // // //     try {
// // // // // // //         const { courseId } = req.params; 
// // // // // // //         const userId = req.user?.id;
        
// // // // // // //         if (!userId) return res.status(401).json({ error: 'Unauthorized' });

// // // // // // //         const existing = await Enrollment.findOne({ user: userId, course: courseId });
// // // // // // //         if (existing) return res.status(400).json({ error: 'Anda sudah mendaftar.' });

// // // // // // //         const newEnrollment = new Enrollment({
// // // // // // //             user: userId,
// // // // // // //             course: courseId,
// // // // // // //             status: 'pending', 
// // // // // // //             progress: 0,
// // // // // // //             isCompleted: false,
// // // // // // //             enrolledAt: new Date()
// // // // // // //         });

// // // // // // //         await newEnrollment.save();
// // // // // // //         res.status(201).json({ message: 'Pendaftaran berhasil. Menunggu verifikasi.', enrollment: newEnrollment });
// // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // };

// // // // // // // export const verifyEnrollment = async (req: Request, res: Response) => {
// // // // // // //     try {
// // // // // // //         const { enrollmentId, action } = req.body; 

// // // // // // //         if (!enrollmentId || !action) return res.status(400).json({ error: "Data tidak lengkap" });

// // // // // // //         if (action === 'reject') {
// // // // // // //             await Enrollment.findByIdAndDelete(enrollmentId);
// // // // // // //             return res.json({ message: "Pendaftaran ditolak." });
// // // // // // //         }
// // // // // // //         if (action === 'approve') {
// // // // // // //             await Enrollment.findByIdAndUpdate(enrollmentId, { status: 'active', joinedAt: new Date() });
// // // // // // //             return res.json({ message: "Pendaftaran disetujui." });
// // // // // // //         }
// // // // // // //         res.status(400).json({ error: "Aksi tidak valid" });
// // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // };

// // // // // // // export const checkEnrollmentStatus = async (req: AuthedRequest, res: Response) => {
// // // // // // //     try {
// // // // // // //         const { courseId } = req.params;
// // // // // // //         const userId = req.user?.id;
        
// // // // // // //         if (!userId) return res.status(401).json({ error: 'Unauthorized' });

// // // // // // //         const enrollment = await Enrollment.findOne({ user: userId, course: courseId });
// // // // // // //         if (!enrollment) return res.json({ isEnrolled: false, status: null });

// // // // // // //         res.json({ isEnrolled: true, status: enrollment.status, progress: enrollment.progress });
// // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // };

// // // // // // // // ==========================================
// // // // // // // // 4. PARTICIPANT MANAGEMENT (REALTIME REPORT)
// // // // // // // // ==========================================

// // // // // // // export const getCourseParticipants = async (req: Request, res: Response) => {
// // // // // // //   try {
// // // // // // //     res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
// // // // // // //     const { id } = req.params; 

// // // // // // //     // A. Ambil Data Enrollment
// // // // // // //     const enrollments = await Enrollment.find({ course: id })
// // // // // // //       .populate('user', 'name email avatarUrl role')
// // // // // // //       .sort({ createdAt: -1 })
// // // // // // //       .lean();

// // // // // // //     if (!enrollments.length) return res.json({ participants: [] });

// // // // // // //     // B. Ambil Progress User
// // // // // // //     const userIds = enrollments.map((e: any) => e.user?._id);
// // // // // // //     const progressRecords = await Progress.find({ courseId: id, userId: { $in: userIds } }).lean();

// // // // // // //     // C. Peta Struktur Course (Untuk Realtime Position)
// // // // // // //     const course: any = await Course.findById(id).select('modules').lean();
// // // // // // //     let totalLessons = 0;
// // // // // // //     const validLessonIds = new Set<string>();
    
// // // // // // //     // [NEW] Peta untuk mengetahui judul lesson & modul berdasarkan ID
// // // // // // //     const lessonMap = new Map();
// // // // // // //     // [NEW] Array urutan lesson ID untuk menentukan "Posisi Terakhir"
// // // // // // //     const orderedLessonIds: string[] = [];

// // // // // // //     if (course && course.modules) {
// // // // // // //         course.modules.forEach((m: any) => {
// // // // // // //             if (m.isActive) {
// // // // // // //                 m.lessons.forEach((l: any) => { 
// // // // // // //                     if (l.isActive) {
// // // // // // //                         totalLessons++; 
// // // // // // //                         const lId = l._id.toString();
// // // // // // //                         validLessonIds.add(lId);
// // // // // // //                         orderedLessonIds.push(lId);
                        
// // // // // // //                         // Simpan Info Judul untuk Report
// // // // // // //                         lessonMap.set(lId, { 
// // // // // // //                             lessonTitle: l.title, 
// // // // // // //                             moduleTitle: m.title,
// // // // // // //                             type: l.type
// // // // // // //                         });
// // // // // // //                     }
// // // // // // //                 });
// // // // // // //             }
// // // // // // //         });
// // // // // // //     }

// // // // // // //     // D. Merge Data & Hitung Realtime Position
// // // // // // //     const participants = await Promise.all(enrollments.map(async (enroll: any) => {
// // // // // // //         const userObj = enroll.user || {};
// // // // // // //         const detail = progressRecords.find((p: any) => p.userId.toString() === userObj._id?.toString());
        
// // // // // // //         let completedIds: string[] = [];
// // // // // // //         let calculatedProgress = 0;
        
// // // // // // //         // [NEW] Variable Posisi
// // // // // // //         let currentPosition = "Belum Memulai"; 

// // // // // // //         if ((enroll.status === 'active' || enroll.status === 'approved') && detail) {
// // // // // // //             const rawCompleted = detail.completedLessons.map((id: any) => id.toString());
// // // // // // //             completedIds = rawCompleted.filter((id) => validLessonIds.has(id));
            
// // // // // // //             // Hitung Persentase
// // // // // // //             if (totalLessons > 0) {
// // // // // // //                 calculatedProgress = Math.round((completedIds.length / totalLessons) * 100);
// // // // // // //             }
// // // // // // //             if (calculatedProgress > 100) calculatedProgress = 100;

// // // // // // //             // [NEW] Tentukan Sedang Mengerjakan Apa?
// // // // // // //             // Cari Lesson PERTAMA di urutan course yang BELUM ada di completedIds
// // // // // // //             const nextLessonId = orderedLessonIds.find(id => !completedIds.includes(id));
            
// // // // // // //             if (calculatedProgress === 100) {
// // // // // // //                 currentPosition = "✅ Selesai";
// // // // // // //             } else if (nextLessonId) {
// // // // // // //                 const info = lessonMap.get(nextLessonId);
// // // // // // //                 // Format: "Modul 1: Judul Materi"
// // // // // // //                 if (info) {
// // // // // // //                     currentPosition = `${info.moduleTitle} - ${info.lessonTitle}`;
// // // // // // //                 }
// // // // // // //             }
// // // // // // //         }

// // // // // // //         // Sync DB jika beda
// // // // // // //         if ((enroll.status === 'active' || enroll.status === 'approved') && enroll.progress !== calculatedProgress) {
// // // // // // //             await Enrollment.updateOne(
// // // // // // //                 { _id: enroll._id }, 
// // // // // // //                 { $set: { progress: calculatedProgress, isCompleted: calculatedProgress === 100 } }
// // // // // // //             );
// // // // // // //         }

// // // // // // //         return {
// // // // // // //             _id: enroll._id, 
// // // // // // //             user: {
// // // // // // //                 _id: userObj._id,
// // // // // // //                 name: userObj.name || enroll.registrationData?.fullName || 'Tanpa Nama',
// // // // // // //                 email: userObj.email || enroll.registrationData?.email || '-',
// // // // // // //                 avatarUrl: userObj.avatarUrl
// // // // // // //             },
// // // // // // //             status: enroll.status || 'pending', 
// // // // // // //             joinedAt: enroll.createdAt,
// // // // // // //             progress: calculatedProgress, 
// // // // // // //             isCompleted: calculatedProgress === 100 || enroll.isCompleted,
// // // // // // //             completedLessons: completedIds, 
// // // // // // //             // [NEW] Kirim data posisi ke frontend
// // // // // // //             currentPosition: currentPosition,
// // // // // // //             lessonDetails: detail ? detail.lessonDetails : []
// // // // // // //         };
// // // // // // //     }));

// // // // // // //     res.json({ participants });
// // // // // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // };

// // // // // // // export const markCompleteLessonByAdmin = async (req: Request, res: Response) => {
// // // // // // //     try {
// // // // // // //         const { studentId, lessonId, courseId } = req.body;
        
// // // // // // //         let progress = await Progress.findOne({ userId: studentId, courseId });
// // // // // // //         if (!progress) progress = new Progress({ userId: studentId, courseId, completedLessons: [], lessonDetails: [] });

// // // // // // //         const strLessonId = lessonId.toString();
// // // // // // //         if (!progress.completedLessons.some((id: any) => id.toString() === strLessonId)) {
// // // // // // //             progress.completedLessons.push(lessonId);
// // // // // // //             await progress.save();
// // // // // // //         }

// // // // // // //         const course: any = await Course.findById(courseId).select('modules');
// // // // // // //         let totalLessons = 0;
// // // // // // //         if(course) course.modules.forEach((m:any) => { if(m.isActive) m.lessons.forEach((l:any) => { if(l.isActive) totalLessons++; }); });
        
// // // // // // //         let newProgress = totalLessons > 0 ? Math.round((progress.completedLessons.length / totalLessons) * 100) : 0;
// // // // // // //         if (newProgress > 100) newProgress = 100;

// // // // // // //         await Enrollment.findOneAndUpdate(
// // // // // // //             { user: studentId, course: courseId }, 
// // // // // // //             { progress: newProgress, isCompleted: newProgress === 100 }
// // // // // // //         );

// // // // // // //         res.json({ message: 'Berhasil diluluskan', progress: newProgress });
// // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // };

// // // // // // // export const resetQuizByAdmin = async (req: Request, res: Response) => {
// // // // // // //     try {
// // // // // // //         const { studentId, quizId } = req.body; 
// // // // // // //         const progress = await Progress.findOne({ userId: studentId });
// // // // // // //         if (progress) {
// // // // // // //             progress.completedLessons = progress.completedLessons.filter((id: any) => id.toString() !== quizId);
// // // // // // //             await progress.save();
// // // // // // //         }
// // // // // // //         res.json({ message: 'Reset berhasil' });
// // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // };

// // // // // // // // ==========================================
// // // // // // // // 5. GROUP CHAT FEATURES
// // // // // // // // ==========================================

// // // // // // // // Get Group Messages (Internal / Public)
// // // // // // // export const getGroupMessages = async (req: Request, res: Response) => {
// // // // // // //     try {
// // // // // // //         const { id } = req.params; // Course ID
// // // // // // //         const { type } = req.query; // 'internal' | 'public'

// // // // // // //         // Menggunakan Model Message (Casting as any untuk bypass TS check pada field baru)
// // // // // // //         const query: any = { 
// // // // // // //             course: id, // Field ini diasumsikan ada (Schemaless/Mixed)
// // // // // // //             type: type || 'public' 
// // // // // // //         };

// // // // // // //         // Jika Anda ingin memastikan data konsisten, pastikan di MongoDB field ini terisi
// // // // // // //         const messages = await Message.find(query)
// // // // // // //             .populate('sender', 'name avatarUrl role')
// // // // // // //             .sort({ createdAt: 1 }); // Urutkan terlama ke terbaru (Chat flow)

// // // // // // //         res.json(messages);
// // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // };

// // // // // // // // Send Group Message
// // // // // // // export const sendGroupMessage = async (req: AuthedRequest, res: Response) => {
// // // // // // //     try {
// // // // // // //         const { id } = req.params; // Course ID
// // // // // // //         const { text, type } = req.body; // text: isi pesan, type: 'internal' | 'public'
// // // // // // //         const userId = req.user?.id;

// // // // // // //         // Kita gunakan Model Message yang Anda punya.
// // // // // // //         // Karena model Anda belum punya 'course' dan 'type' di definisinya,
// // // // // // //         // kita "paksa" simpan field ini. MongoDB akan menerimanya.
// // // // // // //         const newMessage = new Message({
// // // // // // //             course: id, // Tambahan
// // // // // // //             sender: userId,
// // // // // // //             message: text, // Sesuai model Anda 'message' (bukan text)
// // // // // // //             type: type || 'public', // Tambahan
// // // // // // //             isRead: false,
// // // // // // //             isGlobal: false
// // // // // // //         });

// // // // // // //         await newMessage.save();
        
// // // // // // //         const populatedMsg = await newMessage.populate('sender', 'name avatarUrl role');
// // // // // // //         res.status(201).json(populatedMsg);
// // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // };
// // // // // // import { Request, Response } from 'express';
// // // // // // import { Course } from '../models/Course';
// // // // // // import { User } from '../models/User';
// // // // // // import Enrollment from '../models/Enrollment';
// // // // // // import { Progress } from '../models/Progress';
// // // // // // import { Message } from '../models/Message'; 
// // // // // // import { AuthedRequest } from '../middleware/auth'; 

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

// // // // // // // ==========================================
// // // // // // // 3. ENROLLMENT & VERIFICATION
// // // // // // // ==========================================

// // // // // // export const enrollCourse = async (req: AuthedRequest, res: Response) => {
// // // // // //     try {
// // // // // //         const { courseId } = req.params; 
// // // // // //         const userId = req.user?.id;
        
// // // // // //         if (!userId) return res.status(401).json({ error: 'Unauthorized' });

// // // // // //         const existing = await Enrollment.findOne({ user: userId, course: courseId });
// // // // // //         if (existing) return res.status(400).json({ error: 'Anda sudah mendaftar.' });

// // // // // //         const newEnrollment = new Enrollment({
// // // // // //             user: userId,
// // // // // //             course: courseId,
// // // // // //             status: 'pending', 
// // // // // //             progress: 0,
// // // // // //             isCompleted: false,
// // // // // //             enrolledAt: new Date()
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
// // // // // // // 4. PARTICIPANT MANAGEMENT (REALTIME)
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
                        
// // // // // //                         lessonMap.set(lId, { 
// // // // // //                             lessonTitle: l.title, 
// // // // // //                             moduleTitle: m.title
// // // // // //                         });
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
// // // // // //                 if (info) currentPosition = `${info.moduleTitle} - ${info.lessonTitle}`;
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
// // // // // //                 avatarUrl: userObj.avatarUrl
// // // // // //             },
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
        
// // // // // //         let newProgress = totalLessons > 0 ? Math.round((progress.completedLessons.length / totalLessons) * 100) : 0;
// // // // // //         if (newProgress > 100) newProgress = 100;

// // // // // //         await Enrollment.findOneAndUpdate(
// // // // // //             { user: studentId, course: courseId }, 
// // // // // //             { progress: newProgress, isCompleted: newProgress === 100 }
// // // // // //         );

// // // // // //         res.json({ message: 'Berhasil diluluskan', progress: newProgress });
// // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // };

// // // // // // export const resetQuizByAdmin = async (req: Request, res: Response) => {
// // // // // //     try {
// // // // // //         const { studentId, quizId } = req.body; 
// // // // // //         const progress = await Progress.findOne({ userId: studentId });
// // // // // //         if (progress) {
// // // // // //             progress.completedLessons = progress.completedLessons.filter((id: any) => id.toString() !== quizId);
// // // // // //             await progress.save();
// // // // // //         }
// // // // // //         res.json({ message: 'Reset berhasil' });
// // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // };

// // // // // // // ==========================================
// // // // // // // 5. GROUP CHAT FEATURES (WITH ATTACHMENT)
// // // // // // // ==========================================

// // // // // // export const getGroupMessages = async (req: AuthedRequest, res: Response) => {
// // // // // //     try {
// // // // // //         const { id } = req.params; 
// // // // // //         const { type } = req.query; 
// // // // // //         const userId = req.user?.id;

// // // // // //         const course = await Course.findById(id);
// // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });

// // // // // //         // [FIX TYPESCRIPT] Tambahkan (f: any) untuk menghindari error 'implicitly has any'
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

// // // // // //         // [FIX TYPESCRIPT] Tambahkan (f: any)
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
// // // // // import { User } from '../models/User';
// // // // // import Enrollment from '../models/Enrollment';
// // // // // import { Progress } from '../models/Progress';
// // // // // import { Message } from '../models/Message'; 
// // // // // import { AuthedRequest } from '../middleware/auth'; 

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

// // // // // // ==========================================
// // // // // // 3. ENROLLMENT & VERIFICATION
// // // // // // ==========================================

// // // // // export const enrollCourse = async (req: AuthedRequest, res: Response) => {
// // // // //     try {
// // // // //         const { courseId } = req.params; 
// // // // //         const userId = req.user?.id;
        
// // // // //         if (!userId) return res.status(401).json({ error: 'Unauthorized' });

// // // // //         const existing = await Enrollment.findOne({ user: userId, course: courseId });
// // // // //         if (existing) return res.status(400).json({ error: 'Anda sudah mendaftar.' });

// // // // //         const newEnrollment = new Enrollment({
// // // // //             user: userId,
// // // // //             course: courseId,
// // // // //             status: 'pending', 
// // // // //             progress: 0,
// // // // //             isCompleted: false,
// // // // //             enrolledAt: new Date()
// // // // //         });

// // // // //         await newEnrollment.save();
// // // // //         res.status(201).json({ message: 'Pendaftaran berhasil. Menunggu verifikasi.', enrollment: newEnrollment });
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
// // // // // // 4. PARTICIPANT MANAGEMENT (REALTIME)
// // // // // // ==========================================

// // // // // export const getCourseParticipants = async (req: Request, res: Response) => {
// // // // //   try {
// // // // //     res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
// // // // //     const { id } = req.params; 

// // // // //     // A. Ambil Data Enrollment
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
                        
// // // // //                         lessonMap.set(lId, { 
// // // // //                             lessonTitle: l.title, 
// // // // //                             moduleTitle: m.title
// // // // //                         });
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
// // // // //                 if (info) currentPosition = `${info.moduleTitle} - ${info.lessonTitle}`;
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
// // // // //                 avatarUrl: userObj.avatarUrl
// // // // //             },
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
        
// // // // //         let newProgress = totalLessons > 0 ? Math.round((progress.completedLessons.length / totalLessons) * 100) : 0;
// // // // //         if (newProgress > 100) newProgress = 100;

// // // // //         await Enrollment.findOneAndUpdate(
// // // // //             { user: studentId, course: courseId }, 
// // // // //             { progress: newProgress, isCompleted: newProgress === 100 }
// // // // //         );

// // // // //         res.json({ message: 'Berhasil diluluskan', progress: newProgress });
// // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // };

// // // // // export const resetQuizByAdmin = async (req: Request, res: Response) => {
// // // // //     try {
// // // // //         const { studentId, quizId } = req.body; 
// // // // //         const progress = await Progress.findOne({ userId: studentId });
// // // // //         if (progress) {
// // // // //             progress.completedLessons = progress.completedLessons.filter((id: any) => id.toString() !== quizId);
// // // // //             await progress.save();
// // // // //         }
// // // // //         res.json({ message: 'Reset berhasil' });
// // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // };

// // // // // // ==========================================
// // // // // // 5. GROUP CHAT FEATURES (WITH ATTACHMENT)
// // // // // // ==========================================

// // // // // export const getGroupMessages = async (req: AuthedRequest, res: Response) => {
// // // // //     try {
// // // // //         const { id } = req.params; 
// // // // //         const { type } = req.query; 
// // // // //         const userId = req.user?.id;

// // // // //         const course = await Course.findById(id);
// // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });

// // // // //         // [FIX TYPESCRIPT] Tambahkan (f: any)
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

// // // // //         // [FIX TYPESCRIPT] Tambahkan (f: any)
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
// // // //     const courses = await Course.find()
// // // //       .populate('facilitatorIds', 'name email avatarUrl')
// // // //       .sort({ createdAt: -1 });
// // // //     res.json({ courses }); 
// // // //   } catch (error: any) {
// // // //     res.status(500).json({ error: error.message });
// // // //   }
// // // // };

// // // // export const getCourseById = async (req: Request, res: Response) => {
// // // //   try {
// // // //     const course = await Course.findById(req.params.id)
// // // //       .populate('facilitatorIds', 'name email avatarUrl');
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
// // // // // 2. MODULE & LESSON MANAGEMENT
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
// // // //         const course = await Course.findById(courseId);
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

// // // // // ==========================================
// // // // // 3. ENROLLMENT & VERIFICATION
// // // // // ==========================================

// // // // export const enrollCourse = async (req: AuthedRequest, res: Response) => {
// // // //     try {
// // // //         const { courseId } = req.params; 
// // // //         const userId = req.user?.id;
        
// // // //         if (!userId) return res.status(401).json({ error: 'Unauthorized' });

// // // //         const existing = await Enrollment.findOne({ user: userId, course: courseId });
// // // //         if (existing) return res.status(400).json({ error: 'Anda sudah mendaftar.' });

// // // //         const newEnrollment = new Enrollment({
// // // //             user: userId,
// // // //             course: courseId,
// // // //             status: 'pending', 
// // // //             progress: 0,
// // // //             isCompleted: false,
// // // //             enrolledAt: new Date()
// // // //         });

// // // //         await newEnrollment.save();
// // // //         res.status(201).json({ message: 'Pendaftaran berhasil. Menunggu verifikasi.', enrollment: newEnrollment });
// // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // };

// // // // export const verifyEnrollment = async (req: Request, res: Response) => {
// // // //     try {
// // // //         const { enrollmentId, action } = req.body; 

// // // //         if (!enrollmentId || !action) return res.status(400).json({ error: "Data tidak lengkap" });

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
// // // // // 4. PARTICIPANT MANAGEMENT (REALTIME LOGIC)
// // // // // ==========================================

// // // // export const getCourseParticipants = async (req: Request, res: Response) => {
// // // //   try {
// // // //     // Disable Cache for Realtime updates
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

// // // //     // C. Peta Struktur Course untuk Menghitung Progress
// // // //     const course: any = await Course.findById(id).select('modules').lean();
// // // //     let totalLessons = 0;
// // // //     const validLessonIds = new Set<string>();
    
// // // //     // Map untuk lookup judul lesson (untuk fitur "Sedang mengerjakan X")
// // // //     const lessonMap = new Map();
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
                        
// // // //                         lessonMap.set(lId, { 
// // // //                             lessonTitle: l.title, 
// // // //                             moduleTitle: m.title
// // // //                         });
// // // //                     }
// // // //                 });
// // // //             }
// // // //         });
// // // //     }

// // // //     // D. Merge Data & Kalkulasi Status Realtime
// // // //     const participants = await Promise.all(enrollments.map(async (enroll: any) => {
// // // //         const userObj = enroll.user || {};
// // // //         const detail = progressRecords.find((p: any) => p.userId.toString() === userObj._id?.toString());
        
// // // //         let completedIds: string[] = [];
// // // //         let calculatedProgress = 0;
// // // //         let currentPosition = "Belum Memulai"; // Default status

// // // //         if ((enroll.status === 'active' || enroll.status === 'approved') && detail) {
// // // //             const rawCompleted = detail.completedLessons.map((id: any) => id.toString());
// // // //             // Filter hanya lesson yang aktif di course
// // // //             completedIds = rawCompleted.filter((id) => validLessonIds.has(id));
            
// // // //             if (totalLessons > 0) {
// // // //                 calculatedProgress = Math.round((completedIds.length / totalLessons) * 100);
// // // //             }
// // // //             if (calculatedProgress > 100) calculatedProgress = 100;

// // // //             // [LOGIKA REALTIME] Cari lesson pertama yang BELUM selesai
// // // //             const nextLessonId = orderedLessonIds.find(id => !completedIds.includes(id));
            
// // // //             if (calculatedProgress === 100) {
// // // //                 currentPosition = "✅ Selesai";
// // // //             } else if (nextLessonId) {
// // // //                 const info = lessonMap.get(nextLessonId);
// // // //                 if (info) {
// // // //                     // String inilah yang akan muncul di kolom "Status/Aksi" dashboard
// // // //                     currentPosition = `Sedang: ${info.lessonTitle}`; 
// // // //                 }
// // // //             } else if (calculatedProgress > 0 && !nextLessonId) {
// // // //                 // Kasus aneh: Progress < 100 tapi semua materi di list sudah selesai (mungkin ada materi baru?)
// // // //                 currentPosition = "Menunggu Materi Lain";
// // // //             }
// // // //         }

// // // //         // [AUTO SYNC] Update DB jika hitungan realtime beda dengan yang tersimpan
// // // //         if ((enroll.status === 'active' || enroll.status === 'approved') && enroll.progress !== calculatedProgress) {
// // // //             await Enrollment.updateOne(
// // // //                 { _id: enroll._id }, 
// // // //                 { $set: { progress: calculatedProgress, isCompleted: calculatedProgress === 100 } }
// // // //             );
// // // //         }

// // // //         return {
// // // //             _id: enroll._id, 
// // // //             user: {
// // // //                 _id: userObj._id,
// // // //                 name: userObj.name || enroll.registrationData?.fullName || 'Tanpa Nama',
// // // //                 email: userObj.email || enroll.registrationData?.email || '-',
// // // //                 avatarUrl: userObj.avatarUrl
// // // //             },
// // // //             status: enroll.status || 'pending', 
// // // //             joinedAt: enroll.createdAt,
// // // //             progress: calculatedProgress, 
// // // //             isCompleted: calculatedProgress === 100 || enroll.isCompleted,
// // // //             completedLessons: completedIds, 
// // // //             currentPosition: currentPosition, // Data ini yang dipakai Dashboard Operator
// // // //             lessonDetails: detail ? detail.lessonDetails : []
// // // //         };
// // // //     }));

// // // //     res.json({ participants });
// // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // };

// // // // // ==========================================
// // // // // 5. ADMIN ACTIONS (LULUSKAN / RESET)
// // // // // ==========================================

// // // // export const markCompleteLessonByAdmin = async (req: Request, res: Response) => {
// // // //     try {
// // // //         const { studentId, lessonId, courseId } = req.body;
        
// // // //         let progress = await Progress.findOne({ userId: studentId, courseId });
// // // //         if (!progress) progress = new Progress({ userId: studentId, courseId, completedLessons: [], lessonDetails: [] });

// // // //         const strLessonId = lessonId.toString();
// // // //         // Cek apakah sudah selesai
// // // //         if (!progress.completedLessons.some((id: any) => id.toString() === strLessonId)) {
// // // //             progress.completedLessons.push(lessonId);
// // // //             await progress.save();
// // // //         }

// // // //         // RECALCULATE PROGRESS
// // // //         const course: any = await Course.findById(courseId).select('modules');
// // // //         let totalLessons = 0;
// // // //         if(course) course.modules.forEach((m:any) => { if(m.isActive) m.lessons.forEach((l:any) => { if(l.isActive) totalLessons++; }); });
        
// // // //         let newProgress = 0;
// // // //         if (totalLessons > 0) {
// // // //             newProgress = Math.round((progress.completedLessons.length / totalLessons) * 100);
// // // //         }
// // // //         if (newProgress > 100) newProgress = 100;

// // // //         // Update Enrollment
// // // //         await Enrollment.findOneAndUpdate(
// // // //             { user: studentId, course: courseId }, 
// // // //             { 
// // // //                 $set: { 
// // // //                     progress: newProgress, 
// // // //                     isCompleted: newProgress === 100,
// // // //                     completedAt: newProgress === 100 ? new Date() : null 
// // // //                 } 
// // // //             }
// // // //         );

// // // //         res.json({ message: 'Berhasil diluluskan', progress: newProgress });
// // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // };

// // // // // [FIX] RESET YANG BENAR (Hapus Progress & Recalculate Enrollment)
// // // // export const resetQuizByAdmin = async (req: Request, res: Response) => {
// // // //     try {
// // // //         const { studentId, quizId } = req.body; 

// // // //         if (!studentId || !quizId) return res.status(400).json({ error: "Data incomplete" });

// // // //         // 1. Cari Progress User yang mengandung lessonId tsb
// // // //         let progressDoc = await Progress.findOne({ 
// // // //             userId: studentId, 
// // // //             completedLessons: new mongoose.Types.ObjectId(quizId) 
// // // //         });

// // // //         if (progressDoc) {
// // // //             // 2. Hapus LessonId dari Array
// // // //             progressDoc.completedLessons = progressDoc.completedLessons.filter((id: any) => id.toString() !== quizId);
            
// // // //             // 3. Hapus Detail Jawaban (Reset jawaban essay/quiz)
// // // //             if (progressDoc.lessonDetails) {
// // // //                 progressDoc.lessonDetails = progressDoc.lessonDetails.filter((d: any) => d.lessonId && d.lessonId.toString() !== quizId);
// // // //             }
            
// // // //             // 4. Hapus Score
// // // //             if (progressDoc.quizScores) {
// // // //                 progressDoc.quizScores = progressDoc.quizScores.filter((s: any) => s.lessonId && s.lessonId.toString() !== quizId);
// // // //             }

// // // //             // Flag Completed di progress doc juga di-reset
// // // //             progressDoc.isCompleted = false; 
// // // //             await progressDoc.save();

// // // //             // 5. [CRUCIAL] HITUNG ULANG PROGRESS COURSE & UPDATE ENROLLMENT
// // // //             const courseId = progressDoc.courseId;
// // // //             const courseData: any = await Course.findById(courseId).select('modules');
// // // //             let totalLessons = 0;
// // // //             if (courseData) {
// // // //                 courseData.modules.forEach((m: any) => {
// // // //                     if (m.isActive) m.lessons.forEach((l: any) => { if (l.isActive) totalLessons++; });
// // // //                 });
// // // //             }

// // // //             let newProgress = 0;
// // // //             if (totalLessons > 0) {
// // // //                 newProgress = Math.round((progressDoc.completedLessons.length / totalLessons) * 100);
// // // //             }
// // // //             if (newProgress > 100) newProgress = 100;

// // // //             // 6. Force Update Enrollment (Cabut status Lulus jika < 100%)
// // // //             await Enrollment.findOneAndUpdate(
// // // //                 { user: studentId, course: courseId },
// // // //                 {
// // // //                     $set: {
// // // //                         progress: newProgress,
// // // //                         isCompleted: newProgress === 100, // True HANYA jika 100%
// // // //                         completedAt: newProgress === 100 ? new Date() : null // Hapus tanggal lulus jika reset
// // // //                     }
// // // //                 }
// // // //             );
// // // //         }

// // // //         res.json({ message: 'Reset berhasil & Progress dihitung ulang' });
// // // //     } catch (error: any) { 
// // // //         console.error(error);
// // // //         res.status(500).json({ error: error.message }); 
// // // //     }
// // // // };

// // // // // ==========================================
// // // // // 6. GROUP CHAT FEATURES
// // // // // ==========================================

// // // // export const getGroupMessages = async (req: AuthedRequest, res: Response) => {
// // // //     try {
// // // //         const { id } = req.params; 
// // // //         const { type } = req.query; 
// // // //         const userId = req.user?.id;

// // // //         const course = await Course.findById(id);
// // // //         if (!course) return res.status(404).json({ error: 'Course not found' });

// // // //         const isFacilitator = course.facilitatorIds.map((f: any) => f.toString()).includes(userId) || req.user?.role === 'SUPER_ADMIN';
// // // //         const enrollment = await Enrollment.findOne({ course: id, user: userId, status: { $in: ['active', 'approved'] } });
// // // //         const isStudent = !!enrollment;

// // // //         if (type === 'internal' && !isFacilitator) return res.status(403).json({ error: 'Akses ditolak.' });
// // // //         if (type === 'public' && !isFacilitator && !isStudent) return res.status(403).json({ error: 'Akses ditolak.' });

// // // //         const query: any = { course: id, type: type || 'public' };

// // // //         const messages = await Message.find(query)
// // // //             .populate('sender', 'name avatarUrl role')
// // // //             .sort({ createdAt: 1 });

// // // //         res.json(messages);
// // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // };

// // // // export const sendGroupMessage = async (req: AuthedRequest, res: Response) => {
// // // //     try {
// // // //         const { id } = req.params; 
// // // //         const { text, type, attachment } = req.body; 
// // // //         const userId = req.user?.id;

// // // //         const course = await Course.findById(id);
// // // //         if (!course) return res.status(404).json({ error: 'Course not found' });

// // // //         const isFacilitator = course.facilitatorIds.map((f: any) => f.toString()).includes(userId) || req.user?.role === 'SUPER_ADMIN';
        
// // // //         if (type === 'internal' && !isFacilitator) return res.status(403).json({ error: 'Hanya Tim Fasilitator.' });

// // // //         if (type === 'public') {
// // // //             const enrollment = await Enrollment.findOne({ course: id, user: userId, status: { $in: ['active', 'approved'] } });
// // // //             if (!isFacilitator && !enrollment) return res.status(403).json({ error: 'Akses dilarang.' });
// // // //         }

// // // //         const newMessage = new Message({
// // // //             course: id,
// // // //             sender: userId,
// // // //             message: text || '', 
// // // //             type: type || 'public',
// // // //             isRead: false,
// // // //             isGlobal: false,
// // // //             attachment: attachment || null 
// // // //         });

// // // //         await newMessage.save();
// // // //         const populatedMsg = await newMessage.populate('sender', 'name avatarUrl role');
        
// // // //         res.status(201).json(populatedMsg);
// // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // };
// // // import { Request, Response } from 'express';
// // // import { Course } from '../models/Course';
// // // import { User } from '../models/User';
// // // import Enrollment from '../models/Enrollment';
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
// // //       .populate('facilitatorIds', 'name email avatarUrl')
// // //       .sort({ createdAt: -1 });
// // //     res.json({ courses }); 
// // //   } catch (error: any) {
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // };

// // // export const getCourseById = async (req: Request, res: Response) => {
// // //   try {
// // //     const course = await Course.findById(req.params.id)
// // //       .populate('facilitatorIds', 'name email avatarUrl');
// // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // //     res.json(course);
// // //   } catch (error: any) {
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // };

// // // export const updateCourse = async (req: Request, res: Response) => {
// // //   try {
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
// // //         const course = await Course.findById(courseId);
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
        
// // //         // [FIX] Push req.body langsung agar semua field (termasuk meetingLink) tersimpan
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
        
// // //         // [FIX] Update lesson set req.body agar field baru (meetingLink) terupdate
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

// // // // ==========================================
// // // // 3. ENROLLMENT & VERIFICATION
// // // // ==========================================

// // // export const enrollCourse = async (req: AuthedRequest, res: Response) => {
// // //     try {
// // //         const { courseId } = req.params; 
// // //         const userId = req.user?.id;
        
// // //         if (!userId) return res.status(401).json({ error: 'Unauthorized' });

// // //         const existing = await Enrollment.findOne({ user: userId, course: courseId });
// // //         if (existing) return res.status(400).json({ error: 'Anda sudah mendaftar.' });

// // //         const newEnrollment = new Enrollment({
// // //             user: userId,
// // //             course: courseId,
// // //             status: 'pending', 
// // //             progress: 0,
// // //             isCompleted: false,
// // //             enrolledAt: new Date()
// // //         });

// // //         await newEnrollment.save();
// // //         res.status(201).json({ message: 'Pendaftaran berhasil. Menunggu verifikasi.', enrollment: newEnrollment });
// // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // };

// // // export const verifyEnrollment = async (req: Request, res: Response) => {
// // //     try {
// // //         const { enrollmentId, action } = req.body; 

// // //         if (!enrollmentId || !action) return res.status(400).json({ error: "Data tidak lengkap" });

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
// // // // 4. PARTICIPANT MANAGEMENT (REALTIME LOGIC)
// // // // ==========================================

// // // export const getCourseParticipants = async (req: Request, res: Response) => {
// // //   try {
// // //     // Disable Cache for Realtime updates
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

// // //     // C. Peta Struktur Course untuk Menghitung Progress
// // //     const course: any = await Course.findById(id).select('modules').lean();
// // //     let totalLessons = 0;
// // //     const validLessonIds = new Set<string>();
    
// // //     // Map untuk lookup judul lesson (untuk fitur "Sedang mengerjakan X")
// // //     const lessonMap = new Map();
// // //     const orderedLessonIds: string[] = [];

// // //     if (course && course.modules) {
// // //         course.modules.forEach((m: any) => {
// // //             if (m.isActive) {
// // //                 m.lessons.forEach((l: any) => { 
// // //                     if (l.isActive) {
// // //                         totalLessons++; 
// // //                         const lId = l._id.toString();
// // //                         validLessonIds.add(lId);
// // //                         orderedLessonIds.push(lId);
                        
// // //                         lessonMap.set(lId, { 
// // //                             lessonTitle: l.title, 
// // //                             moduleTitle: m.title
// // //                         });
// // //                     }
// // //                 });
// // //             }
// // //         });
// // //     }

// // //     // D. Merge Data & Kalkulasi Status Realtime
// // //     const participants = await Promise.all(enrollments.map(async (enroll: any) => {
// // //         const userObj = enroll.user || {};
// // //         const detail = progressRecords.find((p: any) => p.userId.toString() === userObj._id?.toString());
        
// // //         let completedIds: string[] = [];
// // //         let calculatedProgress = 0;
// // //         let currentPosition = "Belum Memulai"; // Default status

// // //         if ((enroll.status === 'active' || enroll.status === 'approved') && detail) {
// // //             const rawCompleted = detail.completedLessons.map((id: any) => id.toString());
// // //             // Filter hanya lesson yang aktif di course
// // //             completedIds = rawCompleted.filter((id) => validLessonIds.has(id));
            
// // //             if (totalLessons > 0) {
// // //                 calculatedProgress = Math.round((completedIds.length / totalLessons) * 100);
// // //             }
// // //             if (calculatedProgress > 100) calculatedProgress = 100;

// // //             // [LOGIKA REALTIME] Cari lesson pertama yang BELUM selesai
// // //             const nextLessonId = orderedLessonIds.find(id => !completedIds.includes(id));
            
// // //             if (calculatedProgress === 100) {
// // //                 currentPosition = "✅ Selesai";
// // //             } else if (nextLessonId) {
// // //                 const info = lessonMap.get(nextLessonId);
// // //                 if (info) {
// // //                     // String inilah yang akan muncul di kolom "Status/Aksi" dashboard
// // //                     currentPosition = `Sedang: ${info.lessonTitle}`; 
// // //                 }
// // //             } else if (calculatedProgress > 0 && !nextLessonId) {
// // //                 // Kasus aneh: Progress < 100 tapi semua materi di list sudah selesai (mungkin ada materi baru?)
// // //                 currentPosition = "Menunggu Materi Lain";
// // //             }
// // //         }

// // //         // [AUTO SYNC] Update DB jika hitungan realtime beda dengan yang tersimpan
// // //         if ((enroll.status === 'active' || enroll.status === 'approved') && enroll.progress !== calculatedProgress) {
// // //             await Enrollment.updateOne(
// // //                 { _id: enroll._id }, 
// // //                 { $set: { progress: calculatedProgress, isCompleted: calculatedProgress === 100 } }
// // //             );
// // //         }

// // //         return {
// // //             _id: enroll._id, 
// // //             user: {
// // //                 _id: userObj._id,
// // //                 name: userObj.name || enroll.registrationData?.fullName || 'Tanpa Nama',
// // //                 email: userObj.email || enroll.registrationData?.email || '-',
// // //                 avatarUrl: userObj.avatarUrl
// // //             },
// // //             status: enroll.status || 'pending', 
// // //             joinedAt: enroll.createdAt,
// // //             progress: calculatedProgress, 
// // //             isCompleted: calculatedProgress === 100 || enroll.isCompleted,
// // //             completedLessons: completedIds, 
// // //             currentPosition: currentPosition, // Data ini yang dipakai Dashboard Operator
// // //             lessonDetails: detail ? detail.lessonDetails : []
// // //         };
// // //     }));

// // //     res.json({ participants });
// // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // };

// // // // ==========================================
// // // // 5. ADMIN ACTIONS (LULUSKAN / RESET)
// // // // ==========================================

// // // export const markCompleteLessonByAdmin = async (req: Request, res: Response) => {
// // //     try {
// // //         const { studentId, lessonId, courseId } = req.body;
        
// // //         let progress = await Progress.findOne({ userId: studentId, courseId });
// // //         if (!progress) progress = new Progress({ userId: studentId, courseId, completedLessons: [], lessonDetails: [] });

// // //         const strLessonId = lessonId.toString();
// // //         // Cek apakah sudah selesai
// // //         if (!progress.completedLessons.some((id: any) => id.toString() === strLessonId)) {
// // //             progress.completedLessons.push(lessonId);
// // //             await progress.save();
// // //         }

// // //         // RECALCULATE PROGRESS
// // //         const course: any = await Course.findById(courseId).select('modules');
// // //         let totalLessons = 0;
// // //         if(course) course.modules.forEach((m:any) => { if(m.isActive) m.lessons.forEach((l:any) => { if(l.isActive) totalLessons++; }); });
        
// // //         let newProgress = 0;
// // //         if (totalLessons > 0) {
// // //             newProgress = Math.round((progress.completedLessons.length / totalLessons) * 100);
// // //         }
// // //         if (newProgress > 100) newProgress = 100;

// // //         // Update Enrollment
// // //         await Enrollment.findOneAndUpdate(
// // //             { user: studentId, course: courseId }, 
// // //             { 
// // //                 $set: { 
// // //                     progress: newProgress, 
// // //                     isCompleted: newProgress === 100,
// // //                     completedAt: newProgress === 100 ? new Date() : null 
// // //                 } 
// // //             }
// // //         );

// // //         res.json({ message: 'Berhasil diluluskan', progress: newProgress });
// // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // };

// // // // [FIX] RESET YANG BENAR (Hapus Progress & Recalculate Enrollment)
// // // export const resetQuizByAdmin = async (req: Request, res: Response) => {
// // //     try {
// // //         const { studentId, quizId } = req.body; 

// // //         if (!studentId || !quizId) return res.status(400).json({ error: "Data incomplete" });

// // //         // 1. Cari Progress User yang mengandung lessonId tsb
// // //         let progressDoc = await Progress.findOne({ 
// // //             userId: studentId, 
// // //             completedLessons: new mongoose.Types.ObjectId(quizId) 
// // //         });

// // //         if (progressDoc) {
// // //             // 2. Hapus LessonId dari Array
// // //             progressDoc.completedLessons = progressDoc.completedLessons.filter((id: any) => id.toString() !== quizId);
            
// // //             // 3. Hapus Detail Jawaban (Reset jawaban essay/quiz)
// // //             if (progressDoc.lessonDetails) {
// // //                 progressDoc.lessonDetails = progressDoc.lessonDetails.filter((d: any) => d.lessonId && d.lessonId.toString() !== quizId);
// // //             }
            
// // //             // 4. Hapus Score
// // //             if (progressDoc.quizScores) {
// // //                 progressDoc.quizScores = progressDoc.quizScores.filter((s: any) => s.lessonId && s.lessonId.toString() !== quizId);
// // //             }

// // //             // Flag Completed di progress doc juga di-reset
// // //             progressDoc.isCompleted = false; 
// // //             await progressDoc.save();

// // //             // 5. [CRUCIAL] HITUNG ULANG PROGRESS COURSE & UPDATE ENROLLMENT
// // //             const courseId = progressDoc.courseId;
// // //             const courseData: any = await Course.findById(courseId).select('modules');
// // //             let totalLessons = 0;
// // //             if (courseData) {
// // //                 courseData.modules.forEach((m: any) => {
// // //                     if (m.isActive) m.lessons.forEach((l: any) => { if (l.isActive) totalLessons++; });
// // //                 });
// // //             }

// // //             let newProgress = 0;
// // //             if (totalLessons > 0) {
// // //                 newProgress = Math.round((progressDoc.completedLessons.length / totalLessons) * 100);
// // //             }
// // //             if (newProgress > 100) newProgress = 100;

// // //             // 6. Force Update Enrollment (Cabut status Lulus jika < 100%)
// // //             await Enrollment.findOneAndUpdate(
// // //                 { user: studentId, course: courseId },
// // //                 {
// // //                     $set: {
// // //                         progress: newProgress,
// // //                         isCompleted: newProgress === 100, // True HANYA jika 100%
// // //                         completedAt: newProgress === 100 ? new Date() : null // Hapus tanggal lulus jika reset
// // //                     }
// // //                 }
// // //             );
// // //         }

// // //         res.json({ message: 'Reset berhasil & Progress dihitung ulang' });
// // //     } catch (error: any) { 
// // //         console.error(error);
// // //         res.status(500).json({ error: error.message }); 
// // //     }
// // // };

// // // // ==========================================
// // // // 6. GROUP CHAT FEATURES
// // // // ==========================================

// // // export const getGroupMessages = async (req: AuthedRequest, res: Response) => {
// // //     try {
// // //         const { id } = req.params; 
// // //         const { type } = req.query; 
// // //         const userId = req.user?.id;

// // //         const course = await Course.findById(id);
// // //         if (!course) return res.status(404).json({ error: 'Course not found' });

// // //         const isFacilitator = course.facilitatorIds.map((f: any) => f.toString()).includes(userId) || req.user?.role === 'SUPER_ADMIN';
// // //         const enrollment = await Enrollment.findOne({ course: id, user: userId, status: { $in: ['active', 'approved'] } });
// // //         const isStudent = !!enrollment;

// // //         if (type === 'internal' && !isFacilitator) return res.status(403).json({ error: 'Akses ditolak.' });
// // //         if (type === 'public' && !isFacilitator && !isStudent) return res.status(403).json({ error: 'Akses ditolak.' });

// // //         const query: any = { course: id, type: type || 'public' };

// // //         const messages = await Message.find(query)
// // //             .populate('sender', 'name avatarUrl role')
// // //             .sort({ createdAt: 1 });

// // //         res.json(messages);
// // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // };

// // // export const sendGroupMessage = async (req: AuthedRequest, res: Response) => {
// // //     try {
// // //         const { id } = req.params; 
// // //         const { text, type, attachment } = req.body; 
// // //         const userId = req.user?.id;

// // //         const course = await Course.findById(id);
// // //         if (!course) return res.status(404).json({ error: 'Course not found' });

// // //         const isFacilitator = course.facilitatorIds.map((f: any) => f.toString()).includes(userId) || req.user?.role === 'SUPER_ADMIN';
        
// // //         if (type === 'internal' && !isFacilitator) return res.status(403).json({ error: 'Hanya Tim Fasilitator.' });

// // //         if (type === 'public') {
// // //             const enrollment = await Enrollment.findOne({ course: id, user: userId, status: { $in: ['active', 'approved'] } });
// // //             if (!isFacilitator && !enrollment) return res.status(403).json({ error: 'Akses dilarang.' });
// // //         }

// // //         const newMessage = new Message({
// // //             course: id,
// // //             sender: userId,
// // //             message: text || '', 
// // //             type: type || 'public',
// // //             isRead: false,
// // //             isGlobal: false,
// // //             attachment: attachment || null 
// // //         });

// // //         await newMessage.save();
// // //         const populatedMsg = await newMessage.populate('sender', 'name avatarUrl role');
        
// // //         res.status(201).json(populatedMsg);
// // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // };







// // import { Request, Response } from 'express';
// // import { Course } from '../models/Course';
// // import Enrollment from '../models/Enrollment';
// // import { Progress } from '../models/Progress';
// // import { Message } from '../models/Message'; 
// // import { AuthedRequest } from '../middleware/auth'; 
// // import mongoose from 'mongoose';

// // // ==========================================
// // // 1. STANDARD CRUD COURSE
// // // ==========================================

// // export const createCourse = async (req: Request, res: Response) => {
// //   try {
// //     const course = new Course(req.body);
// //     await course.save();
// //     res.status(201).json(course);
// //   } catch (error: any) {
// //     res.status(400).json({ error: error.message });
// //   }
// // };

// // export const getCourses = async (req: Request, res: Response) => {
// //   try {
// //     const courses = await Course.find()
// //       .populate('facilitatorIds', 'name email avatarUrl')
// //       .sort({ createdAt: -1 });
// //     res.json({ courses }); 
// //   } catch (error: any) {
// //     res.status(500).json({ error: error.message });
// //   }
// // };

// // export const getCourseById = async (req: Request, res: Response) => {
// //   try {
// //     const course = await Course.findById(req.params.id)
// //       .populate('facilitatorIds', 'name email avatarUrl');
// //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// //     res.json(course);
// //   } catch (error: any) {
// //     res.status(500).json({ error: error.message });
// //   }
// // };

// // export const updateCourse = async (req: Request, res: Response) => {
// //   try {
// //     const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
// //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// //     res.json(course);
// //   } catch (error: any) {
// //     res.status(400).json({ error: error.message });
// //   }
// // };

// // export const deleteCourse = async (req: Request, res: Response) => {
// //   try {
// //     const course = await Course.findByIdAndDelete(req.params.id);
// //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
    
// //     await Enrollment.deleteMany({ course: req.params.id });
// //     await Progress.deleteMany({ courseId: req.params.id });
    
// //     res.json({ message: 'Kursus berhasil dihapus' });
// //   } catch (error: any) {
// //     res.status(500).json({ error: error.message });
// //   }
// // };

// // // ==========================================
// // // 2. MODULE & LESSON MANAGEMENT
// // // ==========================================

// // export const addModule = async (req: Request, res: Response) => {
// //     try {
// //         const { id } = req.params;
// //         const course = await Course.findById(id);
// //         if (!course) return res.status(404).json({ error: 'Course not found' });
// //         course.modules.push(req.body);
// //         await course.save();
// //         res.json(course);
// //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // };

// // export const updateModule = async (req: Request, res: Response) => {
// //     try {
// //         const { courseId, moduleId } = req.params;
// //         const course = await Course.findById(courseId);
// //         if (!course) return res.status(404).json({ error: 'Course not found' });
// //         const module = course.modules.id(moduleId);
// //         if (!module) return res.status(404).json({ error: 'Module not found' });
// //         module.set(req.body);
// //         await course.save();
// //         res.json(course);
// //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // };

// // export const addLesson = async (req: Request, res: Response) => {
// //     try {
// //         const { courseId, moduleId } = req.params;
// //         const course = await Course.findById(courseId);
// //         if (!course) return res.status(404).json({ error: 'Course not found' });
// //         const module = course.modules.id(moduleId);
// //         if (!module) return res.status(404).json({ error: 'Module not found' });
        
// //         // [FIX] Push req.body langsung agar semua field (termasuk meetingLink) tersimpan
// //         module.lessons.push(req.body);
        
// //         await course.save();
// //         res.json(course);
// //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // };

// // export const updateLesson = async (req: Request, res: Response) => {
// //     try {
// //         const { courseId, moduleId, lessonId } = req.params;
// //         const course = await Course.findById(courseId);
// //         if (!course) return res.status(404).json({ error: 'Course not found' });
// //         const module = course.modules.id(moduleId);
// //         if (!module) return res.status(404).json({ error: 'Module not found' });
// //         const lesson = module.lessons.id(lessonId);
// //         if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
        
// //         // [FIX] Update lesson set req.body agar field baru (meetingLink) terupdate
// //         lesson.set(req.body);
        
// //         await course.save();
// //         res.json(course);
// //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // };

// // export const deleteLesson = async (req: Request, res: Response) => {
// //     try {
// //         const { courseId, moduleId, lessonId } = req.params;
// //         const course = await Course.findById(courseId);
// //         if (!course) return res.status(404).json({ error: 'Course not found' });
// //         const module = course.modules.id(moduleId);
// //         if (module) {
// //             module.lessons.pull({ _id: lessonId }); 
// //             await course.save();
// //         }
// //         res.json(course);
// //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // };

// // export const toggleStatus = async (req: Request, res: Response) => {
// //     try {
// //         const { id } = req.params;
// //         const { moduleId, lessonId } = req.body;
// //         const course = await Course.findById(id);
// //         if (!course) return res.status(404).json({ error: 'Course not found' });

// //         if (moduleId && lessonId) {
// //             const mod = course.modules.id(moduleId);
// //             const les = mod?.lessons.id(lessonId);
// //             if (les) les.isActive = !les.isActive;
// //         } else if (moduleId) {
// //             const mod = course.modules.id(moduleId);
// //             if (mod) mod.isActive = !mod.isActive;
// //         } else {
// //             course.isPublished = !course.isPublished;
// //         }
// //         await course.save();
// //         res.json(course);
// //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // };

// // export const reorderModules = async (req: Request, res: Response) => {
// //     try {
// //         const { id } = req.params;
// //         const { modules } = req.body;
// //         await Course.findByIdAndUpdate(id, { modules });
// //         res.json({ message: 'Urutan disimpan' });
// //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // };

// // // ==========================================
// // // 3. ENROLLMENT & VERIFICATION
// // // ==========================================

// // export const enrollCourse = async (req: AuthedRequest, res: Response) => {
// //     try {
// //         const { courseId } = req.params; 
// //         const userId = req.user?.id;
        
// //         if (!userId) return res.status(401).json({ error: 'Unauthorized' });

// //         const existing = await Enrollment.findOne({ user: userId, course: courseId });
// //         if (existing) return res.status(400).json({ error: 'Anda sudah mendaftar.' });

// //         const newEnrollment = new Enrollment({
// //             user: userId,
// //             course: courseId,
// //             status: 'pending', 
// //             progress: 0,
// //             isCompleted: false,
// //             enrolledAt: new Date()
// //         });

// //         await newEnrollment.save();
// //         res.status(201).json({ message: 'Pendaftaran berhasil. Menunggu verifikasi.', enrollment: newEnrollment });
// //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // };

// // export const verifyEnrollment = async (req: Request, res: Response) => {
// //     try {
// //         const { enrollmentId, action } = req.body; 

// //         if (!enrollmentId || !action) return res.status(400).json({ error: "Data tidak lengkap" });

// //         if (action === 'reject') {
// //             await Enrollment.findByIdAndDelete(enrollmentId);
// //             return res.json({ message: "Pendaftaran ditolak." });
// //         }
// //         if (action === 'approve') {
// //             await Enrollment.findByIdAndUpdate(enrollmentId, { status: 'active', joinedAt: new Date() });
// //             return res.json({ message: "Pendaftaran disetujui." });
// //         }
// //         res.status(400).json({ error: "Aksi tidak valid" });
// //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // };

// // export const checkEnrollmentStatus = async (req: AuthedRequest, res: Response) => {
// //     try {
// //         const { courseId } = req.params;
// //         const userId = req.user?.id;
        
// //         if (!userId) return res.status(401).json({ error: 'Unauthorized' });

// //         const enrollment = await Enrollment.findOne({ user: userId, course: courseId });
// //         if (!enrollment) return res.json({ isEnrolled: false, status: null });

// //         res.json({ isEnrolled: true, status: enrollment.status, progress: enrollment.progress });
// //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // };

// // // ==========================================
// // // 4. PARTICIPANT MANAGEMENT (REALTIME LOGIC)
// // // ==========================================

// // export const getCourseParticipants = async (req: Request, res: Response) => {
// //   try {
// //     // Disable Cache for Realtime updates
// //     res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
// //     const { id } = req.params; 

// //     // A. Ambil Data Enrollment
// //     const enrollments = await Enrollment.find({ course: id })
// //       .populate('user', 'name email avatarUrl role')
// //       .sort({ createdAt: -1 })
// //       .lean();

// //     if (!enrollments.length) return res.json({ participants: [] });

// //     // B. Ambil Progress User
// //     const userIds = enrollments.map((e: any) => e.user?._id);
// //     const progressRecords = await Progress.find({ courseId: id, userId: { $in: userIds } }).lean();

// //     // C. Peta Struktur Course untuk Menghitung Progress
// //     const course: any = await Course.findById(id).select('modules').lean();
// //     let totalLessons = 0;
// //     const validLessonIds = new Set<string>();
    
// //     // Map untuk lookup judul lesson (untuk fitur "Sedang mengerjakan X")
// //     const lessonMap = new Map();
// //     const orderedLessonIds: string[] = [];

// //     if (course && course.modules) {
// //         course.modules.forEach((m: any) => {
// //             if (m.isActive) {
// //                 m.lessons.forEach((l: any) => { 
// //                     if (l.isActive) {
// //                         totalLessons++; 
// //                         const lId = l._id.toString();
// //                         validLessonIds.add(lId);
// //                         orderedLessonIds.push(lId);
                        
// //                         lessonMap.set(lId, { 
// //                             lessonTitle: l.title, 
// //                             moduleTitle: m.title
// //                         });
// //                     }
// //                 });
// //             }
// //         });
// //     }

// //     // D. Merge Data & Kalkulasi Status Realtime
// //     const participants = await Promise.all(enrollments.map(async (enroll: any) => {
// //         const userObj = enroll.user || {};
// //         const detail = progressRecords.find((p: any) => p.userId.toString() === userObj._id?.toString());
        
// //         let completedIds: string[] = [];
// //         let calculatedProgress = 0;
// //         let currentPosition = "Belum Memulai"; // Default status

// //         if ((enroll.status === 'active' || enroll.status === 'approved') && detail) {
// //             const rawCompleted = detail.completedLessons.map((id: any) => id.toString());
// //             // Filter hanya lesson yang aktif di course
// //             completedIds = rawCompleted.filter((id) => validLessonIds.has(id));
            
// //             if (totalLessons > 0) {
// //                 calculatedProgress = Math.round((completedIds.length / totalLessons) * 100);
// //             }
// //             if (calculatedProgress > 100) calculatedProgress = 100;

// //             // [LOGIKA REALTIME] Cari lesson pertama yang BELUM selesai
// //             const nextLessonId = orderedLessonIds.find(id => !completedIds.includes(id));
            
// //             if (calculatedProgress === 100) {
// //                 currentPosition = "✅ Selesai";
// //             } else if (nextLessonId) {
// //                 const info = lessonMap.get(nextLessonId);
// //                 if (info) {
// //                     // String inilah yang akan muncul di kolom "Status/Aksi" dashboard
// //                     currentPosition = `Sedang: ${info.lessonTitle}`; 
// //                 }
// //             } else if (calculatedProgress > 0 && !nextLessonId) {
// //                 // Kasus aneh: Progress < 100 tapi semua materi di list sudah selesai (mungkin ada materi baru?)
// //                 currentPosition = "Menunggu Materi Lain";
// //             }
// //         }

// //         // [AUTO SYNC] Update DB jika hitungan realtime beda dengan yang tersimpan
// //         if ((enroll.status === 'active' || enroll.status === 'approved') && enroll.progress !== calculatedProgress) {
// //             await Enrollment.updateOne(
// //                 { _id: enroll._id }, 
// //                 { $set: { progress: calculatedProgress, isCompleted: calculatedProgress === 100 } }
// //             );
// //         }

// //         return {
// //             _id: enroll._id, 
// //             user: {
// //                 _id: userObj._id,
// //                 name: userObj.name || enroll.registrationData?.fullName || 'Tanpa Nama',
// //                 email: userObj.email || enroll.registrationData?.email || '-',
// //                 avatarUrl: userObj.avatarUrl
// //             },
// //             status: enroll.status || 'pending', 
// //             joinedAt: enroll.createdAt,
// //             progress: calculatedProgress, 
// //             isCompleted: calculatedProgress === 100 || enroll.isCompleted,
// //             completedLessons: completedIds, 
// //             currentPosition: currentPosition, // Data ini yang dipakai Dashboard Operator
// //             lessonDetails: detail ? detail.lessonDetails : []
// //         };
// //     }));

// //     res.json({ participants });
// //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // };

// // // ==========================================
// // // 5. ADMIN ACTIONS (LULUSKAN / RESET)
// // // ==========================================

// // export const markCompleteLessonByAdmin = async (req: Request, res: Response) => {
// //     try {
// //         const { studentId, lessonId, courseId } = req.body;
        
// //         let progress = await Progress.findOne({ userId: studentId, courseId });
// //         if (!progress) progress = new Progress({ userId: studentId, courseId, completedLessons: [], lessonDetails: [] });

// //         const strLessonId = lessonId.toString();
// //         // Cek apakah sudah selesai
// //         if (!progress.completedLessons.some((id: any) => id.toString() === strLessonId)) {
// //             progress.completedLessons.push(lessonId);
// //             await progress.save();
// //         }

// //         // RECALCULATE PROGRESS
// //         const course: any = await Course.findById(courseId).select('modules');
// //         let totalLessons = 0;
// //         if(course) course.modules.forEach((m:any) => { if(m.isActive) m.lessons.forEach((l:any) => { if(l.isActive) totalLessons++; }); });
        
// //         let newProgress = 0;
// //         if (totalLessons > 0) {
// //             newProgress = Math.round((progress.completedLessons.length / totalLessons) * 100);
// //         }
// //         if (newProgress > 100) newProgress = 100;

// //         // Update Enrollment
// //         await Enrollment.findOneAndUpdate(
// //             { user: studentId, course: courseId }, 
// //             { 
// //                 $set: { 
// //                     progress: newProgress, 
// //                     isCompleted: newProgress === 100,
// //                     completedAt: newProgress === 100 ? new Date() : null 
// //                 } 
// //             }
// //         );

// //         res.json({ message: 'Berhasil diluluskan', progress: newProgress });
// //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // };

// // // [FIX] RESET YANG BENAR (Hapus Progress & Recalculate Enrollment)
// // export const resetQuizByAdmin = async (req: Request, res: Response) => {
// //     try {
// //         const { studentId, quizId } = req.body; 

// //         if (!studentId || !quizId) return res.status(400).json({ error: "Data incomplete" });

// //         // 1. Cari Progress User yang mengandung lessonId tsb
// //         let progressDoc = await Progress.findOne({ 
// //             userId: studentId, 
// //             completedLessons: new mongoose.Types.ObjectId(quizId) 
// //         });

// //         if (progressDoc) {
// //             // 2. Hapus LessonId dari Array
// //             progressDoc.completedLessons = progressDoc.completedLessons.filter((id: any) => id.toString() !== quizId);
            
// //             // 3. Hapus Detail Jawaban (Reset jawaban essay/quiz)
// //             if (progressDoc.lessonDetails) {
// //                 progressDoc.lessonDetails = progressDoc.lessonDetails.filter((d: any) => d.lessonId && d.lessonId.toString() !== quizId);
// //             }
            
// //             // 4. Hapus Score
// //             if (progressDoc.quizScores) {
// //                 progressDoc.quizScores = progressDoc.quizScores.filter((s: any) => s.lessonId && s.lessonId.toString() !== quizId);
// //             }

// //             // Flag Completed di progress doc juga di-reset
// //             progressDoc.isCompleted = false; 
// //             await progressDoc.save();

// //             // 5. [CRUCIAL] HITUNG ULANG PROGRESS COURSE & UPDATE ENROLLMENT
// //             const courseId = progressDoc.courseId;
// //             const courseData: any = await Course.findById(courseId).select('modules');
// //             let totalLessons = 0;
// //             if (courseData) {
// //                 courseData.modules.forEach((m: any) => {
// //                     if (m.isActive) m.lessons.forEach((l: any) => { if (l.isActive) totalLessons++; });
// //                 });
// //             }

// //             let newProgress = 0;
// //             if (totalLessons > 0) {
// //                 newProgress = Math.round((progressDoc.completedLessons.length / totalLessons) * 100);
// //             }
// //             if (newProgress > 100) newProgress = 100;

// //             // 6. Force Update Enrollment (Cabut status Lulus jika < 100%)
// //             await Enrollment.findOneAndUpdate(
// //                 { user: studentId, course: courseId },
// //                 {
// //                     $set: {
// //                         progress: newProgress,
// //                         isCompleted: newProgress === 100, // True HANYA jika 100%
// //                         completedAt: newProgress === 100 ? new Date() : null // Hapus tanggal lulus jika reset
// //                     }
// //                 }
// //             );
// //         }

// //         res.json({ message: 'Reset berhasil & Progress dihitung ulang' });
// //     } catch (error: any) { 
// //         console.error(error);
// //         res.status(500).json({ error: error.message }); 
// //     }
// // };

// // // ==========================================
// // // 6. GROUP CHAT FEATURES
// // // ==========================================

// // export const getGroupMessages = async (req: AuthedRequest, res: Response) => {
// //     try {
// //         const { id } = req.params; 
// //         const { type } = req.query; 
// //         const userId = req.user?.id;

// //         const course = await Course.findById(id);
// //         if (!course) return res.status(404).json({ error: 'Course not found' });

// //         const isFacilitator = course.facilitatorIds.map((f: any) => f.toString()).includes(userId) || req.user?.role === 'SUPER_ADMIN';
// //         const enrollment = await Enrollment.findOne({ course: id, user: userId, status: { $in: ['active', 'approved'] } });
// //         const isStudent = !!enrollment;

// //         if (type === 'internal' && !isFacilitator) return res.status(403).json({ error: 'Akses ditolak.' });
// //         if (type === 'public' && !isFacilitator && !isStudent) return res.status(403).json({ error: 'Akses ditolak.' });

// //         const query: any = { course: id, type: type || 'public' };

// //         const messages = await Message.find(query)
// //             .populate('sender', 'name avatarUrl role')
// //             .sort({ createdAt: 1 });

// //         res.json(messages);
// //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // };

// // export const sendGroupMessage = async (req: AuthedRequest, res: Response) => {
// //     try {
// //         const { id } = req.params; 
// //         const { text, type, attachment } = req.body; 
// //         const userId = req.user?.id;

// //         const course = await Course.findById(id);
// //         if (!course) return res.status(404).json({ error: 'Course not found' });

// //         const isFacilitator = course.facilitatorIds.map((f: any) => f.toString()).includes(userId) || req.user?.role === 'SUPER_ADMIN';
        
// //         if (type === 'internal' && !isFacilitator) return res.status(403).json({ error: 'Hanya Tim Fasilitator.' });

// //         if (type === 'public') {
// //             const enrollment = await Enrollment.findOne({ course: id, user: userId, status: { $in: ['active', 'approved'] } });
// //             if (!isFacilitator && !enrollment) return res.status(403).json({ error: 'Akses dilarang.' });
// //         }

// //         const newMessage = new Message({
// //             course: id,
// //             sender: userId,
// //             message: text || '', 
// //             type: type || 'public',
// //             isRead: false,
// //             isGlobal: false,
// //             attachment: attachment || null 
// //         });

// //         await newMessage.save();
// //         const populatedMsg = await newMessage.populate('sender', 'name avatarUrl role');
        
// //         res.status(201).json(populatedMsg);
// //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // };







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
        
//         // Push req.body langsung agar semua field (termasuk meetingLink, points) tersimpan
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
        
//         // Update lesson set req.body agar field baru (meetingLink, points) terupdate
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

// // [NEW] FUNGSI UPDATE GRADING SCHEME (BOBOT NILAI)
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
        
//         if (!userId) return res.status(401).json({ error: 'Unauthorized' });

//         const existing = await Enrollment.findOne({ user: userId, course: courseId });
//         if (existing) return res.status(400).json({ error: 'Anda sudah mendaftar.' });

//         const newEnrollment = new Enrollment({
//             user: userId,
//             course: courseId,
//             status: 'pending', 
//             progress: 0,
//             isCompleted: false,
//             enrolledAt: new Date()
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

//     // A. Ambil Data Enrollment (Termasuk status 'pending')
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

//         // Auto Sync Progress
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
//             // [UPDATE] Kirim data formulir pendaftaran
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

//         // Recalculate
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

//             // Recalculate
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

// [NEW] FUNGSI UPDATE GRADING SCHEME
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
// 3. ENROLLMENT & VERIFICATION
// ==========================================

export const enrollCourse = async (req: AuthedRequest, res: Response) => {
    try {
        const { courseId } = req.params; 
        const userId = req.user?.id;
        const { registrationData } = req.body; // [NEW] Ambil data pendaftaran
        
        if (!userId) return res.status(401).json({ error: 'Unauthorized' });

        const existing = await Enrollment.findOne({ user: userId, course: courseId });
        if (existing) return res.status(400).json({ error: 'Anda sudah mendaftar.' });

        const newEnrollment = new Enrollment({
            user: userId,
            course: courseId,
            status: 'pending', 
            progress: 0,
            isCompleted: false,
            enrolledAt: new Date(),
            registrationData: registrationData || {} // [NEW] Simpan data formulir
        });

        await newEnrollment.save();
        res.status(201).json({ message: 'Pendaftaran berhasil. Menunggu verifikasi.', enrollment: newEnrollment });
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

    // A. Ambil Data Enrollment
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
            // [NEW] Kirim data formulir pendaftaran ke frontend
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

// // // // // // // // // // import { Request, Response } from 'express';
// // // // // // // // // // import { Course } from '../models/Course';
// // // // // // // // // // import Enrollment from '../models/Enrollment';
// // // // // // // // // // import { Progress } from '../models/Progress';
// // // // // // // // // // import { Message } from '../models/Message'; 
// // // // // // // // // // import { AuthedRequest } from '../middleware/auth'; 
// // // // // // // // // // import mongoose from 'mongoose';

// // // // // // // // // // // ==========================================
// // // // // // // // // // // 1. STANDARD CRUD COURSE
// // // // // // // // // // // ==========================================

// // // // // // // // // // export const createCourse = async (req: Request, res: Response) => {
// // // // // // // // // //   try {
// // // // // // // // // //     const course = new Course(req.body);
// // // // // // // // // //     await course.save();
// // // // // // // // // //     res.status(201).json(course);
// // // // // // // // // //   } catch (error: any) {
// // // // // // // // // //     res.status(400).json({ error: error.message });
// // // // // // // // // //   }
// // // // // // // // // // };

// // // // // // // // // // export const getCourses = async (req: Request, res: Response) => {
// // // // // // // // // //   try {
// // // // // // // // // //     const courses = await Course.find()
// // // // // // // // // //       .populate('facilitatorIds', 'name email avatarUrl')
// // // // // // // // // //       .sort({ createdAt: -1 });
// // // // // // // // // //     res.json({ courses }); 
// // // // // // // // // //   } catch (error: any) {
// // // // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // // // //   }
// // // // // // // // // // };

// // // // // // // // // // export const getCourseById = async (req: Request, res: Response) => {
// // // // // // // // // //   try {
// // // // // // // // // //     const course = await Course.findById(req.params.id)
// // // // // // // // // //       .populate('facilitatorIds', 'name email avatarUrl');
// // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // // // // // // // // //     res.json(course);
// // // // // // // // // //   } catch (error: any) {
// // // // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // // // //   }
// // // // // // // // // // };

// // // // // // // // // // export const updateCourse = async (req: Request, res: Response) => {
// // // // // // // // // //   try {
// // // // // // // // // //     const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
// // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // // // // // // // // //     res.json(course);
// // // // // // // // // //   } catch (error: any) {
// // // // // // // // // //     res.status(400).json({ error: error.message });
// // // // // // // // // //   }
// // // // // // // // // // };

// // // // // // // // // // export const deleteCourse = async (req: Request, res: Response) => {
// // // // // // // // // //   try {
// // // // // // // // // //     const course = await Course.findByIdAndDelete(req.params.id);
// // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
    
// // // // // // // // // //     await Enrollment.deleteMany({ course: req.params.id });
// // // // // // // // // //     await Progress.deleteMany({ courseId: req.params.id });
    
// // // // // // // // // //     res.json({ message: 'Kursus berhasil dihapus' });
// // // // // // // // // //   } catch (error: any) {
// // // // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // // // //   }
// // // // // // // // // // };

// // // // // // // // // // // ==========================================
// // // // // // // // // // // 2. MODULE & LESSON MANAGEMENT
// // // // // // // // // // // ==========================================

// // // // // // // // // // export const addModule = async (req: Request, res: Response) => {
// // // // // // // // // //     try {
// // // // // // // // // //         const { id } = req.params;
// // // // // // // // // //         const course = await Course.findById(id);
// // // // // // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // // // //         course.modules.push(req.body);
// // // // // // // // // //         await course.save();
// // // // // // // // // //         res.json(course);
// // // // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // // // };

// // // // // // // // // // export const updateModule = async (req: Request, res: Response) => {
// // // // // // // // // //     try {
// // // // // // // // // //         const { courseId, moduleId } = req.params;
// // // // // // // // // //         const course = await Course.findById(courseId);
// // // // // // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // // // //         const module = course.modules.id(moduleId);
// // // // // // // // // //         if (!module) return res.status(404).json({ error: 'Module not found' });
// // // // // // // // // //         module.set(req.body);
// // // // // // // // // //         await course.save();
// // // // // // // // // //         res.json(course);
// // // // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // // // };

// // // // // // // // // // export const addLesson = async (req: Request, res: Response) => {
// // // // // // // // // //     try {
// // // // // // // // // //         const { courseId, moduleId } = req.params;
// // // // // // // // // //         const course = await Course.findById(courseId);
// // // // // // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // // // //         const module = course.modules.id(moduleId);
// // // // // // // // // //         if (!module) return res.status(404).json({ error: 'Module not found' });
        
// // // // // // // // // //         module.lessons.push(req.body);
        
// // // // // // // // // //         await course.save();
// // // // // // // // // //         res.json(course);
// // // // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // // // };

// // // // // // // // // // export const updateLesson = async (req: Request, res: Response) => {
// // // // // // // // // //     try {
// // // // // // // // // //         const { courseId, moduleId, lessonId } = req.params;
// // // // // // // // // //         const course = await Course.findById(courseId);
// // // // // // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // // // //         const module = course.modules.id(moduleId);
// // // // // // // // // //         if (!module) return res.status(404).json({ error: 'Module not found' });
// // // // // // // // // //         const lesson = module.lessons.id(lessonId);
// // // // // // // // // //         if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
        
// // // // // // // // // //         lesson.set(req.body);
        
// // // // // // // // // //         await course.save();
// // // // // // // // // //         res.json(course);
// // // // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // // // };

// // // // // // // // // // export const deleteLesson = async (req: Request, res: Response) => {
// // // // // // // // // //     try {
// // // // // // // // // //         const { courseId, moduleId, lessonId } = req.params;
// // // // // // // // // //         const course = await Course.findById(courseId);
// // // // // // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // // // //         const module = course.modules.id(moduleId);
// // // // // // // // // //         if (module) {
// // // // // // // // // //             module.lessons.pull({ _id: lessonId }); 
// // // // // // // // // //             await course.save();
// // // // // // // // // //         }
// // // // // // // // // //         res.json(course);
// // // // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // // // };

// // // // // // // // // // export const toggleStatus = async (req: Request, res: Response) => {
// // // // // // // // // //     try {
// // // // // // // // // //         const { id } = req.params;
// // // // // // // // // //         const { moduleId, lessonId } = req.body;
// // // // // // // // // //         const course = await Course.findById(id);
// // // // // // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });

// // // // // // // // // //         if (moduleId && lessonId) {
// // // // // // // // // //             const mod = course.modules.id(moduleId);
// // // // // // // // // //             const les = mod?.lessons.id(lessonId);
// // // // // // // // // //             if (les) les.isActive = !les.isActive;
// // // // // // // // // //         } else if (moduleId) {
// // // // // // // // // //             const mod = course.modules.id(moduleId);
// // // // // // // // // //             if (mod) mod.isActive = !mod.isActive;
// // // // // // // // // //         } else {
// // // // // // // // // //             course.isPublished = !course.isPublished;
// // // // // // // // // //         }
// // // // // // // // // //         await course.save();
// // // // // // // // // //         res.json(course);
// // // // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // // // };

// // // // // // // // // // export const reorderModules = async (req: Request, res: Response) => {
// // // // // // // // // //     try {
// // // // // // // // // //         const { id } = req.params;
// // // // // // // // // //         const { modules } = req.body;
// // // // // // // // // //         await Course.findByIdAndUpdate(id, { modules });
// // // // // // // // // //         res.json({ message: 'Urutan disimpan' });
// // // // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // // // };

// // // // // // // // // // // [NEW] FUNGSI UPDATE GRADING SCHEME
// // // // // // // // // // export const updateGradingScheme = async (req: Request, res: Response) => {
// // // // // // // // // //     try {
// // // // // // // // // //         const { id } = req.params;
// // // // // // // // // //         const { modules } = req.body; 

// // // // // // // // // //         if (!modules) return res.status(400).json({ error: "Data modul diperlukan" });

// // // // // // // // // //         const course = await Course.findByIdAndUpdate(id, { modules }, { new: true });
// // // // // // // // // //         if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
        
// // // // // // // // // //         res.json({ message: 'Skema penilaian berhasil disimpan', course });
// // // // // // // // // //     } catch (error: any) {
// // // // // // // // // //         res.status(500).json({ error: error.message });
// // // // // // // // // //     }
// // // // // // // // // // };

// // // // // // // // // // // ==========================================
// // // // // // // // // // // 3. ENROLLMENT & VERIFICATION
// // // // // // // // // // // ==========================================

// // // // // // // // // // export const enrollCourse = async (req: AuthedRequest, res: Response) => {
// // // // // // // // // //     try {
// // // // // // // // // //         const { courseId } = req.params; 
// // // // // // // // // //         const userId = req.user?.id;
// // // // // // // // // //         const { registrationData } = req.body; // Ambil data pendaftaran (termasuk file url)
        
// // // // // // // // // //         if (!userId) return res.status(401).json({ error: 'Unauthorized' });

// // // // // // // // // //         const existing = await Enrollment.findOne({ user: userId, course: courseId });
// // // // // // // // // //         if (existing) return res.status(400).json({ error: 'Anda sudah mendaftar.' });

// // // // // // // // // //         const newEnrollment = new Enrollment({
// // // // // // // // // //             user: userId,
// // // // // // // // // //             course: courseId,
// // // // // // // // // //             status: 'pending', 
// // // // // // // // // //             progress: 0,
// // // // // // // // // //             isCompleted: false,
// // // // // // // // // //             enrolledAt: new Date(),
// // // // // // // // // //             registrationData: registrationData || {} 
// // // // // // // // // //         });

// // // // // // // // // //         await newEnrollment.save();
// // // // // // // // // //         res.status(201).json({ message: 'Pendaftaran berhasil. Menunggu verifikasi.', enrollment: newEnrollment });
// // // // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // // // };

// // // // // // // // // // export const verifyEnrollment = async (req: Request, res: Response) => {
// // // // // // // // // //     try {
// // // // // // // // // //         const { enrollmentId, action } = req.body; 

// // // // // // // // // //         if (!enrollmentId || !action) return res.status(400).json({ error: "Data tidak lengkap" });

// // // // // // // // // //         if (action === 'reject') {
// // // // // // // // // //             await Enrollment.findByIdAndDelete(enrollmentId);
// // // // // // // // // //             return res.json({ message: "Pendaftaran ditolak." });
// // // // // // // // // //         }
// // // // // // // // // //         if (action === 'approve') {
// // // // // // // // // //             await Enrollment.findByIdAndUpdate(enrollmentId, { status: 'active', joinedAt: new Date() });
// // // // // // // // // //             return res.json({ message: "Pendaftaran disetujui." });
// // // // // // // // // //         }
// // // // // // // // // //         res.status(400).json({ error: "Aksi tidak valid" });
// // // // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // // // };

// // // // // // // // // // export const checkEnrollmentStatus = async (req: AuthedRequest, res: Response) => {
// // // // // // // // // //     try {
// // // // // // // // // //         const { courseId } = req.params;
// // // // // // // // // //         const userId = req.user?.id;
        
// // // // // // // // // //         if (!userId) return res.status(401).json({ error: 'Unauthorized' });

// // // // // // // // // //         const enrollment = await Enrollment.findOne({ user: userId, course: courseId });
// // // // // // // // // //         if (!enrollment) return res.json({ isEnrolled: false, status: null });

// // // // // // // // // //         res.json({ isEnrolled: true, status: enrollment.status, progress: enrollment.progress });
// // // // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // // // };

// // // // // // // // // // // ==========================================
// // // // // // // // // // // 4. PARTICIPANT MANAGEMENT (REALTIME LOGIC)
// // // // // // // // // // // ==========================================

// // // // // // // // // // export const getCourseParticipants = async (req: Request, res: Response) => {
// // // // // // // // // //   try {
// // // // // // // // // //     res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
// // // // // // // // // //     const { id } = req.params; 

// // // // // // // // // //     // A. Ambil Data Enrollment
// // // // // // // // // //     const enrollments = await Enrollment.find({ course: id })
// // // // // // // // // //       .populate('user', 'name email avatarUrl role')
// // // // // // // // // //       .sort({ createdAt: -1 })
// // // // // // // // // //       .lean();

// // // // // // // // // //     if (!enrollments.length) return res.json({ participants: [] });

// // // // // // // // // //     // B. Ambil Progress User
// // // // // // // // // //     const userIds = enrollments.map((e: any) => e.user?._id);
// // // // // // // // // //     const progressRecords = await Progress.find({ courseId: id, userId: { $in: userIds } }).lean();

// // // // // // // // // //     // C. Peta Struktur Course
// // // // // // // // // //     const course: any = await Course.findById(id).select('modules').lean();
// // // // // // // // // //     let totalLessons = 0;
// // // // // // // // // //     const validLessonIds = new Set<string>();
// // // // // // // // // //     const lessonMap = new Map();
// // // // // // // // // //     const orderedLessonIds: string[] = [];

// // // // // // // // // //     if (course && course.modules) {
// // // // // // // // // //         course.modules.forEach((m: any) => {
// // // // // // // // // //             if (m.isActive) {
// // // // // // // // // //                 m.lessons.forEach((l: any) => { 
// // // // // // // // // //                     if (l.isActive) {
// // // // // // // // // //                         totalLessons++; 
// // // // // // // // // //                         const lId = l._id.toString();
// // // // // // // // // //                         validLessonIds.add(lId);
// // // // // // // // // //                         orderedLessonIds.push(lId);
// // // // // // // // // //                         lessonMap.set(lId, { lessonTitle: l.title, moduleTitle: m.title });
// // // // // // // // // //                     }
// // // // // // // // // //                 });
// // // // // // // // // //             }
// // // // // // // // // //         });
// // // // // // // // // //     }

// // // // // // // // // //     // D. Merge Data
// // // // // // // // // //     const participants = await Promise.all(enrollments.map(async (enroll: any) => {
// // // // // // // // // //         const userObj = enroll.user || {};
// // // // // // // // // //         const detail = progressRecords.find((p: any) => p.userId.toString() === userObj._id?.toString());
        
// // // // // // // // // //         let completedIds: string[] = [];
// // // // // // // // // //         let calculatedProgress = 0;
// // // // // // // // // //         let currentPosition = "Belum Memulai"; 

// // // // // // // // // //         if ((enroll.status === 'active' || enroll.status === 'approved') && detail) {
// // // // // // // // // //             const rawCompleted = detail.completedLessons.map((id: any) => id.toString());
// // // // // // // // // //             completedIds = rawCompleted.filter((id) => validLessonIds.has(id));
            
// // // // // // // // // //             if (totalLessons > 0) {
// // // // // // // // // //                 calculatedProgress = Math.round((completedIds.length / totalLessons) * 100);
// // // // // // // // // //             }
// // // // // // // // // //             if (calculatedProgress > 100) calculatedProgress = 100;

// // // // // // // // // //             const nextLessonId = orderedLessonIds.find(id => !completedIds.includes(id));
// // // // // // // // // //             if (calculatedProgress === 100) {
// // // // // // // // // //                 currentPosition = "✅ Selesai";
// // // // // // // // // //             } else if (nextLessonId) {
// // // // // // // // // //                 const info = lessonMap.get(nextLessonId);
// // // // // // // // // //                 if (info) currentPosition = `Sedang: ${info.lessonTitle}`; 
// // // // // // // // // //             }
// // // // // // // // // //         }

// // // // // // // // // //         if ((enroll.status === 'active' || enroll.status === 'approved') && enroll.progress !== calculatedProgress) {
// // // // // // // // // //             await Enrollment.updateOne(
// // // // // // // // // //                 { _id: enroll._id }, 
// // // // // // // // // //                 { $set: { progress: calculatedProgress, isCompleted: calculatedProgress === 100 } }
// // // // // // // // // //             );
// // // // // // // // // //         }

// // // // // // // // // //         return {
// // // // // // // // // //             _id: enroll._id, 
// // // // // // // // // //             user: {
// // // // // // // // // //                 _id: userObj._id,
// // // // // // // // // //                 name: userObj.name || enroll.registrationData?.fullName || 'Tanpa Nama',
// // // // // // // // // //                 email: userObj.email || enroll.registrationData?.email || '-',
// // // // // // // // // //                 avatarUrl: userObj.avatarUrl,
// // // // // // // // // //                 role: userObj.role
// // // // // // // // // //             },
// // // // // // // // // //             // [NEW] Kirim data formulir pendaftaran (termasuk uploadedFormUrl)
// // // // // // // // // //             registrationData: enroll.registrationData || {},
            
// // // // // // // // // //             status: enroll.status || 'pending', 
// // // // // // // // // //             joinedAt: enroll.createdAt,
// // // // // // // // // //             progress: calculatedProgress, 
// // // // // // // // // //             isCompleted: calculatedProgress === 100 || enroll.isCompleted,
// // // // // // // // // //             completedLessons: completedIds, 
// // // // // // // // // //             currentPosition: currentPosition, 
// // // // // // // // // //             lessonDetails: detail ? detail.lessonDetails : []
// // // // // // // // // //         };
// // // // // // // // // //     }));

// // // // // // // // // //     res.json({ participants });
// // // // // // // // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // // // };

// // // // // // // // // // // ==========================================
// // // // // // // // // // // 5. ADMIN ACTIONS
// // // // // // // // // // // ==========================================

// // // // // // // // // // export const markCompleteLessonByAdmin = async (req: Request, res: Response) => {
// // // // // // // // // //     try {
// // // // // // // // // //         const { studentId, lessonId, courseId } = req.body;
// // // // // // // // // //         let progress = await Progress.findOne({ userId: studentId, courseId });
// // // // // // // // // //         if (!progress) progress = new Progress({ userId: studentId, courseId, completedLessons: [], lessonDetails: [] });

// // // // // // // // // //         const strLessonId = lessonId.toString();
// // // // // // // // // //         if (!progress.completedLessons.some((id: any) => id.toString() === strLessonId)) {
// // // // // // // // // //             progress.completedLessons.push(lessonId);
// // // // // // // // // //             await progress.save();
// // // // // // // // // //         }

// // // // // // // // // //         const course: any = await Course.findById(courseId).select('modules');
// // // // // // // // // //         let totalLessons = 0;
// // // // // // // // // //         if(course) course.modules.forEach((m:any) => { if(m.isActive) m.lessons.forEach((l:any) => { if(l.isActive) totalLessons++; }); });
        
// // // // // // // // // //         let newProgress = 0;
// // // // // // // // // //         if (totalLessons > 0) newProgress = Math.round((progress.completedLessons.length / totalLessons) * 100);
// // // // // // // // // //         if (newProgress > 100) newProgress = 100;

// // // // // // // // // //         await Enrollment.findOneAndUpdate(
// // // // // // // // // //             { user: studentId, course: courseId }, 
// // // // // // // // // //             { $set: { progress: newProgress, isCompleted: newProgress === 100, completedAt: newProgress === 100 ? new Date() : null } }
// // // // // // // // // //         );

// // // // // // // // // //         res.json({ message: 'Berhasil diluluskan', progress: newProgress });
// // // // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // // // };

// // // // // // // // // // export const resetQuizByAdmin = async (req: Request, res: Response) => {
// // // // // // // // // //     try {
// // // // // // // // // //         const { studentId, quizId } = req.body; 
// // // // // // // // // //         if (!studentId || !quizId) return res.status(400).json({ error: "Data incomplete" });

// // // // // // // // // //         let progressDoc = await Progress.findOne({ userId: studentId, completedLessons: new mongoose.Types.ObjectId(quizId) });

// // // // // // // // // //         if (progressDoc) {
// // // // // // // // // //             progressDoc.completedLessons = progressDoc.completedLessons.filter((id: any) => id.toString() !== quizId);
// // // // // // // // // //             if (progressDoc.lessonDetails) {
// // // // // // // // // //                 progressDoc.lessonDetails = progressDoc.lessonDetails.filter((d: any) => d.lessonId && d.lessonId.toString() !== quizId);
// // // // // // // // // //             }
// // // // // // // // // //             if (progressDoc.quizScores) {
// // // // // // // // // //                 progressDoc.quizScores = progressDoc.quizScores.filter((s: any) => s.lessonId && s.lessonId.toString() !== quizId);
// // // // // // // // // //             }
// // // // // // // // // //             progressDoc.isCompleted = false; 
// // // // // // // // // //             await progressDoc.save();

// // // // // // // // // //             const courseId = progressDoc.courseId;
// // // // // // // // // //             const courseData: any = await Course.findById(courseId).select('modules');
// // // // // // // // // //             let totalLessons = 0;
// // // // // // // // // //             if (courseData) {
// // // // // // // // // //                 courseData.modules.forEach((m: any) => {
// // // // // // // // // //                     if (m.isActive) m.lessons.forEach((l: any) => { if (l.isActive) totalLessons++; });
// // // // // // // // // //                 });
// // // // // // // // // //             }
// // // // // // // // // //             let newProgress = 0;
// // // // // // // // // //             if (totalLessons > 0) newProgress = Math.round((progressDoc.completedLessons.length / totalLessons) * 100);
// // // // // // // // // //             if (newProgress > 100) newProgress = 100;

// // // // // // // // // //             await Enrollment.findOneAndUpdate(
// // // // // // // // // //                 { user: studentId, course: courseId },
// // // // // // // // // //                 { $set: { progress: newProgress, isCompleted: newProgress === 100, completedAt: newProgress === 100 ? new Date() : null } }
// // // // // // // // // //             );
// // // // // // // // // //         }
// // // // // // // // // //         res.json({ message: 'Reset berhasil & Progress dihitung ulang' });
// // // // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // // // };

// // // // // // // // // // // ==========================================
// // // // // // // // // // // 6. GROUP CHAT FEATURES
// // // // // // // // // // // ==========================================

// // // // // // // // // // export const getGroupMessages = async (req: AuthedRequest, res: Response) => {
// // // // // // // // // //     try {
// // // // // // // // // //         const { id } = req.params; 
// // // // // // // // // //         const { type } = req.query; 
// // // // // // // // // //         const userId = req.user?.id;

// // // // // // // // // //         const course = await Course.findById(id);
// // // // // // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });

// // // // // // // // // //         const isFacilitator = course.facilitatorIds.map((f: any) => f.toString()).includes(userId) || req.user?.role === 'SUPER_ADMIN';
// // // // // // // // // //         const enrollment = await Enrollment.findOne({ course: id, user: userId, status: { $in: ['active', 'approved'] } });
// // // // // // // // // //         const isStudent = !!enrollment;

// // // // // // // // // //         if (type === 'internal' && !isFacilitator) return res.status(403).json({ error: 'Akses ditolak.' });
// // // // // // // // // //         if (type === 'public' && !isFacilitator && !isStudent) return res.status(403).json({ error: 'Akses ditolak.' });

// // // // // // // // // //         const query: any = { course: id, type: type || 'public' };
// // // // // // // // // //         const messages = await Message.find(query)
// // // // // // // // // //             .populate('sender', 'name avatarUrl role')
// // // // // // // // // //             .sort({ createdAt: 1 });

// // // // // // // // // //         res.json(messages);
// // // // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // // // };

// // // // // // // // // // export const sendGroupMessage = async (req: AuthedRequest, res: Response) => {
// // // // // // // // // //     try {
// // // // // // // // // //         const { id } = req.params; 
// // // // // // // // // //         const { text, type, attachment } = req.body; 
// // // // // // // // // //         const userId = req.user?.id;

// // // // // // // // // //         const course = await Course.findById(id);
// // // // // // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });

// // // // // // // // // //         const isFacilitator = course.facilitatorIds.map((f: any) => f.toString()).includes(userId) || req.user?.role === 'SUPER_ADMIN';
        
// // // // // // // // // //         if (type === 'internal' && !isFacilitator) return res.status(403).json({ error: 'Hanya Tim Fasilitator.' });

// // // // // // // // // //         if (type === 'public') {
// // // // // // // // // //             const enrollment = await Enrollment.findOne({ course: id, user: userId, status: { $in: ['active', 'approved'] } });
// // // // // // // // // //             if (!isFacilitator && !enrollment) return res.status(403).json({ error: 'Akses dilarang.' });
// // // // // // // // // //         }

// // // // // // // // // //         const newMessage = new Message({
// // // // // // // // // //             course: id,
// // // // // // // // // //             sender: userId,
// // // // // // // // // //             message: text || '', 
// // // // // // // // // //             type: type || 'public',
// // // // // // // // // //             isRead: false,
// // // // // // // // // //             isGlobal: false,
// // // // // // // // // //             attachment: attachment || null 
// // // // // // // // // //         });

// // // // // // // // // //         await newMessage.save();
// // // // // // // // // //         const populatedMsg = await newMessage.populate('sender', 'name avatarUrl role');
        
// // // // // // // // // //         res.status(201).json(populatedMsg);
// // // // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // // // };
// // // // // // // // // import { Request, Response } from 'express';
// // // // // // // // // import { Course } from '../models/Course';
// // // // // // // // // import Enrollment from '../models/Enrollment';
// // // // // // // // // import { Progress } from '../models/Progress';
// // // // // // // // // import { Message } from '../models/Message'; 
// // // // // // // // // import { AuthedRequest } from '../middleware/auth'; 
// // // // // // // // // import mongoose from 'mongoose';

// // // // // // // // // // ==========================================
// // // // // // // // // // 1. STANDARD CRUD COURSE
// // // // // // // // // // ==========================================

// // // // // // // // // export const createCourse = async (req: Request, res: Response) => {
// // // // // // // // //   try {
// // // // // // // // //     const course = new Course(req.body);
// // // // // // // // //     await course.save();
// // // // // // // // //     res.status(201).json(course);
// // // // // // // // //   } catch (error: any) {
// // // // // // // // //     res.status(400).json({ error: error.message });
// // // // // // // // //   }
// // // // // // // // // };

// // // // // // // // // export const getCourses = async (req: Request, res: Response) => {
// // // // // // // // //   try {
// // // // // // // // //     const courses = await Course.find()
// // // // // // // // //       .populate('facilitatorIds', 'name email avatarUrl')
// // // // // // // // //       .sort({ createdAt: -1 });
// // // // // // // // //     res.json({ courses }); 
// // // // // // // // //   } catch (error: any) {
// // // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // // //   }
// // // // // // // // // };

// // // // // // // // // export const getCourseById = async (req: Request, res: Response) => {
// // // // // // // // //   try {
// // // // // // // // //     const course = await Course.findById(req.params.id)
// // // // // // // // //       .populate('facilitatorIds', 'name email avatarUrl');
// // // // // // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // // // // // // // //     res.json(course);
// // // // // // // // //   } catch (error: any) {
// // // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // // //   }
// // // // // // // // // };

// // // // // // // // // export const updateCourse = async (req: Request, res: Response) => {
// // // // // // // // //   try {
// // // // // // // // //     const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
// // // // // // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // // // // // // // //     res.json(course);
// // // // // // // // //   } catch (error: any) {
// // // // // // // // //     res.status(400).json({ error: error.message });
// // // // // // // // //   }
// // // // // // // // // };

// // // // // // // // // export const deleteCourse = async (req: Request, res: Response) => {
// // // // // // // // //   try {
// // // // // // // // //     const course = await Course.findByIdAndDelete(req.params.id);
// // // // // // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
    
// // // // // // // // //     await Enrollment.deleteMany({ course: req.params.id });
// // // // // // // // //     await Progress.deleteMany({ courseId: req.params.id });
    
// // // // // // // // //     res.json({ message: 'Kursus berhasil dihapus' });
// // // // // // // // //   } catch (error: any) {
// // // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // // //   }
// // // // // // // // // };

// // // // // // // // // // ==========================================
// // // // // // // // // // 2. MODULE & LESSON MANAGEMENT
// // // // // // // // // // ==========================================

// // // // // // // // // export const addModule = async (req: Request, res: Response) => {
// // // // // // // // //     try {
// // // // // // // // //         const { id } = req.params;
// // // // // // // // //         const course = await Course.findById(id);
// // // // // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // // //         course.modules.push(req.body);
// // // // // // // // //         await course.save();
// // // // // // // // //         res.json(course);
// // // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // // };

// // // // // // // // // export const updateModule = async (req: Request, res: Response) => {
// // // // // // // // //     try {
// // // // // // // // //         const { courseId, moduleId } = req.params;
// // // // // // // // //         const course = await Course.findById(courseId);
// // // // // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // // //         const module = course.modules.id(moduleId);
// // // // // // // // //         if (!module) return res.status(404).json({ error: 'Module not found' });
// // // // // // // // //         module.set(req.body);
// // // // // // // // //         await course.save();
// // // // // // // // //         res.json(course);
// // // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // // };

// // // // // // // // // export const addLesson = async (req: Request, res: Response) => {
// // // // // // // // //     try {
// // // // // // // // //         const { courseId, moduleId } = req.params;
// // // // // // // // //         const course = await Course.findById(courseId);
// // // // // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // // //         const module = course.modules.id(moduleId);
// // // // // // // // //         if (!module) return res.status(404).json({ error: 'Module not found' });
        
// // // // // // // // //         // Push req.body langsung agar semua field (termasuk meetingLink, points) tersimpan
// // // // // // // // //         module.lessons.push(req.body);
        
// // // // // // // // //         await course.save();
// // // // // // // // //         res.json(course);
// // // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // // };

// // // // // // // // // export const updateLesson = async (req: Request, res: Response) => {
// // // // // // // // //     try {
// // // // // // // // //         const { courseId, moduleId, lessonId } = req.params;
// // // // // // // // //         const course = await Course.findById(courseId);
// // // // // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // // //         const module = course.modules.id(moduleId);
// // // // // // // // //         if (!module) return res.status(404).json({ error: 'Module not found' });
// // // // // // // // //         const lesson = module.lessons.id(lessonId);
// // // // // // // // //         if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
        
// // // // // // // // //         // Update lesson set req.body agar field baru (meetingLink, points) terupdate
// // // // // // // // //         lesson.set(req.body);
        
// // // // // // // // //         await course.save();
// // // // // // // // //         res.json(course);
// // // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // // };

// // // // // // // // // export const deleteLesson = async (req: Request, res: Response) => {
// // // // // // // // //     try {
// // // // // // // // //         const { courseId, moduleId, lessonId } = req.params;
// // // // // // // // //         const course = await Course.findById(courseId);
// // // // // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // // //         const module = course.modules.id(moduleId);
// // // // // // // // //         if (module) {
// // // // // // // // //             module.lessons.pull({ _id: lessonId }); 
// // // // // // // // //             await course.save();
// // // // // // // // //         }
// // // // // // // // //         res.json(course);
// // // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // // };

// // // // // // // // // export const toggleStatus = async (req: Request, res: Response) => {
// // // // // // // // //     try {
// // // // // // // // //         const { id } = req.params;
// // // // // // // // //         const { moduleId, lessonId } = req.body;
// // // // // // // // //         const course = await Course.findById(id);
// // // // // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });

// // // // // // // // //         if (moduleId && lessonId) {
// // // // // // // // //             const mod = course.modules.id(moduleId);
// // // // // // // // //             const les = mod?.lessons.id(lessonId);
// // // // // // // // //             if (les) les.isActive = !les.isActive;
// // // // // // // // //         } else if (moduleId) {
// // // // // // // // //             const mod = course.modules.id(moduleId);
// // // // // // // // //             if (mod) mod.isActive = !mod.isActive;
// // // // // // // // //         } else {
// // // // // // // // //             course.isPublished = !course.isPublished;
// // // // // // // // //         }
// // // // // // // // //         await course.save();
// // // // // // // // //         res.json(course);
// // // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // // };

// // // // // // // // // export const reorderModules = async (req: Request, res: Response) => {
// // // // // // // // //     try {
// // // // // // // // //         const { id } = req.params;
// // // // // // // // //         const { modules } = req.body;
// // // // // // // // //         await Course.findByIdAndUpdate(id, { modules });
// // // // // // // // //         res.json({ message: 'Urutan disimpan' });
// // // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // // };

// // // // // // // // // // [NEW] FUNGSI UPDATE GRADING SCHEME (BOBOT NILAI)
// // // // // // // // // export const updateGradingScheme = async (req: Request, res: Response) => {
// // // // // // // // //     try {
// // // // // // // // //         const { id } = req.params;
// // // // // // // // //         const { modules } = req.body; 

// // // // // // // // //         if (!modules) return res.status(400).json({ error: "Data modul diperlukan" });

// // // // // // // // //         const course = await Course.findByIdAndUpdate(id, { modules }, { new: true });
// // // // // // // // //         if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
        
// // // // // // // // //         res.json({ message: 'Skema penilaian berhasil disimpan', course });
// // // // // // // // //     } catch (error: any) {
// // // // // // // // //         res.status(500).json({ error: error.message });
// // // // // // // // //     }
// // // // // // // // // };

// // // // // // // // // // ==========================================
// // // // // // // // // // 3. ENROLLMENT & VERIFICATION (LOGIKA OTOMATIS vs MANUAL)
// // // // // // // // // // ==========================================

// // // // // // // // // export const enrollCourse = async (req: AuthedRequest, res: Response) => {
// // // // // // // // //     try {
// // // // // // // // //         const { courseId } = req.params; 
// // // // // // // // //         const userId = req.user?.id;
// // // // // // // // //         const { registrationData } = req.body; // Ambil data pendaftaran (termasuk file url)
        
// // // // // // // // //         if (!userId) return res.status(401).json({ error: 'Unauthorized' });

// // // // // // // // //         // 1. Cek Kursus & Mode Pendaftaran
// // // // // // // // //         const course = await Course.findById(courseId);
// // // // // // // // //         if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });

// // // // // // // // //         const existing = await Enrollment.findOne({ user: userId, course: courseId });
// // // // // // // // //         if (existing) return res.status(400).json({ error: 'Anda sudah mendaftar.' });

// // // // // // // // //         // 2. Tentukan Status Awal
// // // // // // // // //         // Jika mode 'automatic' -> status 'active' (langsung masuk)
// // // // // // // // //         // Jika mode 'manual' -> status 'pending' (tunggu admin)
// // // // // // // // //         let initialStatus = 'pending';
// // // // // // // // //         let joinedAtDate = undefined;

// // // // // // // // //         if (course.registrationMode === 'automatic') {
// // // // // // // // //             initialStatus = 'active';
// // // // // // // // //             joinedAtDate = new Date(); // Set tanggal join sekarang jika otomatis
// // // // // // // // //         }

// // // // // // // // //         const newEnrollment = new Enrollment({
// // // // // // // // //             user: userId,
// // // // // // // // //             course: courseId,
// // // // // // // // //             status: initialStatus, 
// // // // // // // // //             progress: 0,
// // // // // // // // //             isCompleted: false,
// // // // // // // // //             enrolledAt: new Date(),
// // // // // // // // //             joinedAt: joinedAtDate,
// // // // // // // // //             registrationData: registrationData || {} 
// // // // // // // // //         });

// // // // // // // // //         await newEnrollment.save();

// // // // // // // // //         const msg = course.registrationMode === 'automatic' 
// // // // // // // // //             ? 'Pendaftaran berhasil! Anda bisa langsung mulai belajar.' 
// // // // // // // // //             : 'Pendaftaran berhasil. Mohon tunggu verifikasi admin.';

// // // // // // // // //         res.status(201).json({ message: msg, enrollment: newEnrollment });
// // // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // // };

// // // // // // // // // export const verifyEnrollment = async (req: Request, res: Response) => {
// // // // // // // // //     try {
// // // // // // // // //         const { enrollmentId, action } = req.body; 

// // // // // // // // //         if (!enrollmentId || !action) return res.status(400).json({ error: "Data tidak lengkap" });

// // // // // // // // //         if (action === 'reject') {
// // // // // // // // //             await Enrollment.findByIdAndDelete(enrollmentId);
// // // // // // // // //             return res.json({ message: "Pendaftaran ditolak." });
// // // // // // // // //         }
// // // // // // // // //         if (action === 'approve') {
// // // // // // // // //             await Enrollment.findByIdAndUpdate(enrollmentId, { status: 'active', joinedAt: new Date() });
// // // // // // // // //             return res.json({ message: "Pendaftaran disetujui." });
// // // // // // // // //         }
// // // // // // // // //         res.status(400).json({ error: "Aksi tidak valid" });
// // // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // // };

// // // // // // // // // export const checkEnrollmentStatus = async (req: AuthedRequest, res: Response) => {
// // // // // // // // //     try {
// // // // // // // // //         const { courseId } = req.params;
// // // // // // // // //         const userId = req.user?.id;
        
// // // // // // // // //         if (!userId) return res.status(401).json({ error: 'Unauthorized' });

// // // // // // // // //         const enrollment = await Enrollment.findOne({ user: userId, course: courseId });
// // // // // // // // //         if (!enrollment) return res.json({ isEnrolled: false, status: null });

// // // // // // // // //         res.json({ isEnrolled: true, status: enrollment.status, progress: enrollment.progress });
// // // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // // };

// // // // // // // // // // ==========================================
// // // // // // // // // // 4. PARTICIPANT MANAGEMENT (REALTIME LOGIC)
// // // // // // // // // // ==========================================

// // // // // // // // // export const getCourseParticipants = async (req: Request, res: Response) => {
// // // // // // // // //   try {
// // // // // // // // //     res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
// // // // // // // // //     const { id } = req.params; 

// // // // // // // // //     // A. Ambil Data Enrollment (Termasuk status 'pending' & 'registrationData')
// // // // // // // // //     const enrollments = await Enrollment.find({ course: id })
// // // // // // // // //       .populate('user', 'name email avatarUrl role')
// // // // // // // // //       .sort({ createdAt: -1 })
// // // // // // // // //       .lean();

// // // // // // // // //     if (!enrollments.length) return res.json({ participants: [] });

// // // // // // // // //     // B. Ambil Progress User
// // // // // // // // //     const userIds = enrollments.map((e: any) => e.user?._id);
// // // // // // // // //     const progressRecords = await Progress.find({ courseId: id, userId: { $in: userIds } }).lean();

// // // // // // // // //     // C. Peta Struktur Course
// // // // // // // // //     const course: any = await Course.findById(id).select('modules').lean();
// // // // // // // // //     let totalLessons = 0;
// // // // // // // // //     const validLessonIds = new Set<string>();
// // // // // // // // //     const lessonMap = new Map();
// // // // // // // // //     const orderedLessonIds: string[] = [];

// // // // // // // // //     if (course && course.modules) {
// // // // // // // // //         course.modules.forEach((m: any) => {
// // // // // // // // //             if (m.isActive) {
// // // // // // // // //                 m.lessons.forEach((l: any) => { 
// // // // // // // // //                     if (l.isActive) {
// // // // // // // // //                         totalLessons++; 
// // // // // // // // //                         const lId = l._id.toString();
// // // // // // // // //                         validLessonIds.add(lId);
// // // // // // // // //                         orderedLessonIds.push(lId);
// // // // // // // // //                         lessonMap.set(lId, { lessonTitle: l.title, moduleTitle: m.title });
// // // // // // // // //                     }
// // // // // // // // //                 });
// // // // // // // // //             }
// // // // // // // // //         });
// // // // // // // // //     }

// // // // // // // // //     // D. Merge Data
// // // // // // // // //     const participants = await Promise.all(enrollments.map(async (enroll: any) => {
// // // // // // // // //         const userObj = enroll.user || {};
// // // // // // // // //         const detail = progressRecords.find((p: any) => p.userId.toString() === userObj._id?.toString());
        
// // // // // // // // //         let completedIds: string[] = [];
// // // // // // // // //         let calculatedProgress = 0;
// // // // // // // // //         let currentPosition = "Belum Memulai"; 

// // // // // // // // //         if ((enroll.status === 'active' || enroll.status === 'approved') && detail) {
// // // // // // // // //             const rawCompleted = detail.completedLessons.map((id: any) => id.toString());
// // // // // // // // //             completedIds = rawCompleted.filter((id) => validLessonIds.has(id));
            
// // // // // // // // //             if (totalLessons > 0) {
// // // // // // // // //                 calculatedProgress = Math.round((completedIds.length / totalLessons) * 100);
// // // // // // // // //             }
// // // // // // // // //             if (calculatedProgress > 100) calculatedProgress = 100;

// // // // // // // // //             const nextLessonId = orderedLessonIds.find(id => !completedIds.includes(id));
// // // // // // // // //             if (calculatedProgress === 100) {
// // // // // // // // //                 currentPosition = "✅ Selesai";
// // // // // // // // //             } else if (nextLessonId) {
// // // // // // // // //                 const info = lessonMap.get(nextLessonId);
// // // // // // // // //                 if (info) currentPosition = `Sedang: ${info.lessonTitle}`; 
// // // // // // // // //             }
// // // // // // // // //         }

// // // // // // // // //         if ((enroll.status === 'active' || enroll.status === 'approved') && enroll.progress !== calculatedProgress) {
// // // // // // // // //             await Enrollment.updateOne(
// // // // // // // // //                 { _id: enroll._id }, 
// // // // // // // // //                 { $set: { progress: calculatedProgress, isCompleted: calculatedProgress === 100 } }
// // // // // // // // //             );
// // // // // // // // //         }

// // // // // // // // //         return {
// // // // // // // // //             _id: enroll._id, 
// // // // // // // // //             user: {
// // // // // // // // //                 _id: userObj._id,
// // // // // // // // //                 name: userObj.name || enroll.registrationData?.fullName || 'Tanpa Nama',
// // // // // // // // //                 email: userObj.email || enroll.registrationData?.email || '-',
// // // // // // // // //                 avatarUrl: userObj.avatarUrl,
// // // // // // // // //                 role: userObj.role
// // // // // // // // //             },
// // // // // // // // //             // [IMPORTANT] Kirim data formulir pendaftaran ke frontend
// // // // // // // // //             registrationData: enroll.registrationData || {},
            
// // // // // // // // //             status: enroll.status || 'pending', 
// // // // // // // // //             joinedAt: enroll.createdAt,
// // // // // // // // //             progress: calculatedProgress, 
// // // // // // // // //             isCompleted: calculatedProgress === 100 || enroll.isCompleted,
// // // // // // // // //             completedLessons: completedIds, 
// // // // // // // // //             currentPosition: currentPosition, 
// // // // // // // // //             lessonDetails: detail ? detail.lessonDetails : []
// // // // // // // // //         };
// // // // // // // // //     }));

// // // // // // // // //     res.json({ participants });
// // // // // // // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // // };

// // // // // // // // // // ==========================================
// // // // // // // // // // 5. ADMIN ACTIONS
// // // // // // // // // // ==========================================

// // // // // // // // // export const markCompleteLessonByAdmin = async (req: Request, res: Response) => {
// // // // // // // // //     try {
// // // // // // // // //         const { studentId, lessonId, courseId } = req.body;
// // // // // // // // //         let progress = await Progress.findOne({ userId: studentId, courseId });
// // // // // // // // //         if (!progress) progress = new Progress({ userId: studentId, courseId, completedLessons: [], lessonDetails: [] });

// // // // // // // // //         const strLessonId = lessonId.toString();
// // // // // // // // //         if (!progress.completedLessons.some((id: any) => id.toString() === strLessonId)) {
// // // // // // // // //             progress.completedLessons.push(lessonId);
// // // // // // // // //             await progress.save();
// // // // // // // // //         }

// // // // // // // // //         const course: any = await Course.findById(courseId).select('modules');
// // // // // // // // //         let totalLessons = 0;
// // // // // // // // //         if(course) course.modules.forEach((m:any) => { if(m.isActive) m.lessons.forEach((l:any) => { if(l.isActive) totalLessons++; }); });
        
// // // // // // // // //         let newProgress = 0;
// // // // // // // // //         if (totalLessons > 0) newProgress = Math.round((progress.completedLessons.length / totalLessons) * 100);
// // // // // // // // //         if (newProgress > 100) newProgress = 100;

// // // // // // // // //         await Enrollment.findOneAndUpdate(
// // // // // // // // //             { user: studentId, course: courseId }, 
// // // // // // // // //             { $set: { progress: newProgress, isCompleted: newProgress === 100, completedAt: newProgress === 100 ? new Date() : null } }
// // // // // // // // //         );

// // // // // // // // //         res.json({ message: 'Berhasil diluluskan', progress: newProgress });
// // // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // // };

// // // // // // // // // export const resetQuizByAdmin = async (req: Request, res: Response) => {
// // // // // // // // //     try {
// // // // // // // // //         const { studentId, quizId } = req.body; 
// // // // // // // // //         if (!studentId || !quizId) return res.status(400).json({ error: "Data incomplete" });

// // // // // // // // //         let progressDoc = await Progress.findOne({ userId: studentId, completedLessons: new mongoose.Types.ObjectId(quizId) });

// // // // // // // // //         if (progressDoc) {
// // // // // // // // //             progressDoc.completedLessons = progressDoc.completedLessons.filter((id: any) => id.toString() !== quizId);
// // // // // // // // //             if (progressDoc.lessonDetails) {
// // // // // // // // //                 progressDoc.lessonDetails = progressDoc.lessonDetails.filter((d: any) => d.lessonId && d.lessonId.toString() !== quizId);
// // // // // // // // //             }
// // // // // // // // //             if (progressDoc.quizScores) {
// // // // // // // // //                 progressDoc.quizScores = progressDoc.quizScores.filter((s: any) => s.lessonId && s.lessonId.toString() !== quizId);
// // // // // // // // //             }
// // // // // // // // //             progressDoc.isCompleted = false; 
// // // // // // // // //             await progressDoc.save();

// // // // // // // // //             const courseId = progressDoc.courseId;
// // // // // // // // //             const courseData: any = await Course.findById(courseId).select('modules');
// // // // // // // // //             let totalLessons = 0;
// // // // // // // // //             if (courseData) {
// // // // // // // // //                 courseData.modules.forEach((m: any) => {
// // // // // // // // //                     if (m.isActive) m.lessons.forEach((l: any) => { if (l.isActive) totalLessons++; });
// // // // // // // // //                 });
// // // // // // // // //             }
// // // // // // // // //             let newProgress = 0;
// // // // // // // // //             if (totalLessons > 0) newProgress = Math.round((progressDoc.completedLessons.length / totalLessons) * 100);
// // // // // // // // //             if (newProgress > 100) newProgress = 100;

// // // // // // // // //             await Enrollment.findOneAndUpdate(
// // // // // // // // //                 { user: studentId, course: courseId },
// // // // // // // // //                 { $set: { progress: newProgress, isCompleted: newProgress === 100, completedAt: newProgress === 100 ? new Date() : null } }
// // // // // // // // //             );
// // // // // // // // //         }
// // // // // // // // //         res.json({ message: 'Reset berhasil & Progress dihitung ulang' });
// // // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // // };

// // // // // // // // // // ==========================================
// // // // // // // // // // 6. GROUP CHAT FEATURES
// // // // // // // // // // ==========================================

// // // // // // // // // export const getGroupMessages = async (req: AuthedRequest, res: Response) => {
// // // // // // // // //     try {
// // // // // // // // //         const { id } = req.params; 
// // // // // // // // //         const { type } = req.query; 
// // // // // // // // //         const userId = req.user?.id;

// // // // // // // // //         const course = await Course.findById(id);
// // // // // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });

// // // // // // // // //         const isFacilitator = course.facilitatorIds.map((f: any) => f.toString()).includes(userId) || req.user?.role === 'SUPER_ADMIN';
// // // // // // // // //         const enrollment = await Enrollment.findOne({ course: id, user: userId, status: { $in: ['active', 'approved'] } });
// // // // // // // // //         const isStudent = !!enrollment;

// // // // // // // // //         if (type === 'internal' && !isFacilitator) return res.status(403).json({ error: 'Akses ditolak.' });
// // // // // // // // //         if (type === 'public' && !isFacilitator && !isStudent) return res.status(403).json({ error: 'Akses ditolak.' });

// // // // // // // // //         const query: any = { course: id, type: type || 'public' };
// // // // // // // // //         const messages = await Message.find(query)
// // // // // // // // //             .populate('sender', 'name avatarUrl role')
// // // // // // // // //             .sort({ createdAt: 1 });

// // // // // // // // //         res.json(messages);
// // // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // // };

// // // // // // // // // export const sendGroupMessage = async (req: AuthedRequest, res: Response) => {
// // // // // // // // //     try {
// // // // // // // // //         const { id } = req.params; 
// // // // // // // // //         const { text, type, attachment } = req.body; 
// // // // // // // // //         const userId = req.user?.id;

// // // // // // // // //         const course = await Course.findById(id);
// // // // // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });

// // // // // // // // //         const isFacilitator = course.facilitatorIds.map((f: any) => f.toString()).includes(userId) || req.user?.role === 'SUPER_ADMIN';
        
// // // // // // // // //         if (type === 'internal' && !isFacilitator) return res.status(403).json({ error: 'Hanya Tim Fasilitator.' });

// // // // // // // // //         if (type === 'public') {
// // // // // // // // //             const enrollment = await Enrollment.findOne({ course: id, user: userId, status: { $in: ['active', 'approved'] } });
// // // // // // // // //             if (!isFacilitator && !enrollment) return res.status(403).json({ error: 'Akses dilarang.' });
// // // // // // // // //         }

// // // // // // // // //         const newMessage = new Message({
// // // // // // // // //             course: id,
// // // // // // // // //             sender: userId,
// // // // // // // // //             message: text || '', 
// // // // // // // // //             type: type || 'public',
// // // // // // // // //             isRead: false,
// // // // // // // // //             isGlobal: false,
// // // // // // // // //             attachment: attachment || null 
// // // // // // // // //         });

// // // // // // // // //         await newMessage.save();
// // // // // // // // //         const populatedMsg = await newMessage.populate('sender', 'name avatarUrl role');
        
// // // // // // // // //         res.status(201).json(populatedMsg);
// // // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // // };

// // // // // // // // import { Request, Response } from 'express';
// // // // // // // // import { Course } from '../models/Course';
// // // // // // // // import Enrollment from '../models/Enrollment';
// // // // // // // // import { Progress } from '../models/Progress';
// // // // // // // // import { Message } from '../models/Message'; 
// // // // // // // // import { AuthedRequest } from '../middleware/auth'; 
// // // // // // // // import mongoose from 'mongoose';

// // // // // // // // // ==========================================
// // // // // // // // // 1. STANDARD CRUD COURSE
// // // // // // // // // ==========================================

// // // // // // // // export const createCourse = async (req: Request, res: Response) => {
// // // // // // // //   try {
// // // // // // // //     const course = new Course(req.body);
// // // // // // // //     await course.save();
// // // // // // // //     res.status(201).json(course);
// // // // // // // //   } catch (error: any) {
// // // // // // // //     res.status(400).json({ error: error.message });
// // // // // // // //   }
// // // // // // // // };

// // // // // // // // export const getCourses = async (req: Request, res: Response) => {
// // // // // // // //   try {
// // // // // // // //     // [RESTORED] Menggunakan facilitatorIds (bukan facilitator singular)
// // // // // // // //     const courses = await Course.find()
// // // // // // // //       .populate('facilitatorIds', 'name email avatarUrl role') 
// // // // // // // //       .sort({ createdAt: -1 });
// // // // // // // //     res.json({ courses }); 
// // // // // // // //   } catch (error: any) {
// // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // //   }
// // // // // // // // };

// // // // // // // // // [CRITICAL RESTORE] Logic Detail Pelatihan yang Hilang
// // // // // // // // export const getCourseById = async (req: Request, res: Response) => {
// // // // // // // //   try {
// // // // // // // //     const course = await Course.findById(req.params.id)
// // // // // // // //       .populate('facilitatorIds', 'name email avatarUrl role bio') // Populate Facilitator
// // // // // // // //       // [FIX] Tambahkan populate modules jika schema Anda memisahkan modules
// // // // // // // //       // Jika modules embedded (menyatu), baris ini aman dan tidak error
// // // // // // // //       .populate({
// // // // // // // //           path: 'modules',
// // // // // // // //           populate: { path: 'lessons' }
// // // // // // // //       });

// // // // // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // // // // // // //     res.json(course);
// // // // // // // //   } catch (error: any) {
// // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // //   }
// // // // // // // // };

// // // // // // // // export const updateCourse = async (req: Request, res: Response) => {
// // // // // // // //   try {
// // // // // // // //     const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
// // // // // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // // // // // // //     res.json(course);
// // // // // // // //   } catch (error: any) {
// // // // // // // //     res.status(400).json({ error: error.message });
// // // // // // // //   }
// // // // // // // // };

// // // // // // // // export const deleteCourse = async (req: Request, res: Response) => {
// // // // // // // //   try {
// // // // // // // //     const course = await Course.findByIdAndDelete(req.params.id);
// // // // // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
    
// // // // // // // //     await Enrollment.deleteMany({ course: req.params.id });
// // // // // // // //     await Progress.deleteMany({ courseId: req.params.id });
    
// // // // // // // //     res.json({ message: 'Kursus berhasil dihapus' });
// // // // // // // //   } catch (error: any) {
// // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // //   }
// // // // // // // // };

// // // // // // // // // ==========================================
// // // // // // // // // 2. MODULE & LESSON MANAGEMENT (RESTORED)
// // // // // // // // // ==========================================

// // // // // // // // export const addModule = async (req: Request, res: Response) => {
// // // // // // // //     try {
// // // // // // // //         const { id } = req.params;
// // // // // // // //         const course = await Course.findById(id);
// // // // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // //         course.modules.push(req.body);
// // // // // // // //         await course.save();
// // // // // // // //         res.json(course);
// // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // };

// // // // // // // // export const updateModule = async (req: Request, res: Response) => {
// // // // // // // //     try {
// // // // // // // //         const { courseId, moduleId } = req.params;
// // // // // // // //         const cId = courseId || req.params.id; // Handle variasi parameter route
// // // // // // // //         const course = await Course.findById(cId);
// // // // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });
        
// // // // // // // //         const module = course.modules.id(moduleId);
// // // // // // // //         if (!module) return res.status(404).json({ error: 'Module not found' });
// // // // // // // //         module.set(req.body);
// // // // // // // //         await course.save();
// // // // // // // //         res.json(course);
// // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // };

// // // // // // // // export const addLesson = async (req: Request, res: Response) => {
// // // // // // // //     try {
// // // // // // // //         const { courseId, moduleId } = req.params;
// // // // // // // //         const course = await Course.findById(courseId);
// // // // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });
        
// // // // // // // //         const module = course.modules.id(moduleId);
// // // // // // // //         if (!module) return res.status(404).json({ error: 'Module not found' });
        
// // // // // // // //         module.lessons.push(req.body);
// // // // // // // //         await course.save();
// // // // // // // //         res.json(course);
// // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // };

// // // // // // // // export const updateLesson = async (req: Request, res: Response) => {
// // // // // // // //     try {
// // // // // // // //         const { courseId, moduleId, lessonId } = req.params;
// // // // // // // //         const course = await Course.findById(courseId);
// // // // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });
        
// // // // // // // //         const module = course.modules.id(moduleId);
// // // // // // // //         if (!module) return res.status(404).json({ error: 'Module not found' });
        
// // // // // // // //         const lesson = module.lessons.id(lessonId);
// // // // // // // //         if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
        
// // // // // // // //         lesson.set(req.body);
// // // // // // // //         await course.save();
// // // // // // // //         res.json(course);
// // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // };

// // // // // // // // export const deleteLesson = async (req: Request, res: Response) => {
// // // // // // // //     try {
// // // // // // // //         const { courseId, moduleId, lessonId } = req.params;
// // // // // // // //         const course = await Course.findById(courseId);
// // // // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });
        
// // // // // // // //         const module = course.modules.id(moduleId);
// // // // // // // //         if (module) {
// // // // // // // //             module.lessons.pull({ _id: lessonId }); 
// // // // // // // //             await course.save();
// // // // // // // //         }
// // // // // // // //         res.json(course);
// // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // };

// // // // // // // // export const toggleStatus = async (req: Request, res: Response) => {
// // // // // // // //     try {
// // // // // // // //         const { id } = req.params;
// // // // // // // //         const { moduleId, lessonId } = req.body;
// // // // // // // //         const course = await Course.findById(id);
// // // // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });

// // // // // // // //         if (moduleId && lessonId) {
// // // // // // // //             const mod = course.modules.id(moduleId);
// // // // // // // //             const les = mod?.lessons.id(lessonId);
// // // // // // // //             if (les) les.isActive = !les.isActive;
// // // // // // // //         } else if (moduleId) {
// // // // // // // //             const mod = course.modules.id(moduleId);
// // // // // // // //             if (mod) mod.isActive = !mod.isActive;
// // // // // // // //         } else {
// // // // // // // //             course.isPublished = !course.isPublished;
// // // // // // // //         }
// // // // // // // //         await course.save();
// // // // // // // //         res.json(course);
// // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // };

// // // // // // // // export const reorderModules = async (req: Request, res: Response) => {
// // // // // // // //     try {
// // // // // // // //         const { id } = req.params;
// // // // // // // //         const { modules } = req.body;
// // // // // // // //         await Course.findByIdAndUpdate(id, { modules });
// // // // // // // //         res.json({ message: 'Urutan disimpan' });
// // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // };

// // // // // // // // // [NEW] FUNGSI UPDATE GRADING SCHEME
// // // // // // // // export const updateGradingScheme = async (req: Request, res: Response) => {
// // // // // // // //     try {
// // // // // // // //         const { id } = req.params;
// // // // // // // //         const { modules } = req.body; 
// // // // // // // //         if (!modules) return res.status(400).json({ error: "Data modul diperlukan" });

// // // // // // // //         const course = await Course.findByIdAndUpdate(id, { modules }, { new: true });
// // // // // // // //         if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
        
// // // // // // // //         res.json({ message: 'Skema penilaian berhasil disimpan', course });
// // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // };

// // // // // // // // // ==========================================
// // // // // // // // // 3. ENROLLMENT & VERIFICATION
// // // // // // // // // ==========================================

// // // // // // // // export const enrollCourse = async (req: AuthedRequest, res: Response) => {
// // // // // // // //     try {
// // // // // // // //         const { courseId } = req.params; 
// // // // // // // //         const userId = req.user?.id;
// // // // // // // //         const { registrationData } = req.body;
        
// // // // // // // //         if (!userId) return res.status(401).json({ error: 'Unauthorized' });

// // // // // // // //         const course = await Course.findById(courseId);
// // // // // // // //         if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });

// // // // // // // //         const existing = await Enrollment.findOne({ user: userId, course: courseId });
// // // // // // // //         if (existing) return res.status(400).json({ error: 'Anda sudah mendaftar.' });

// // // // // // // //         let initialStatus = 'pending';
// // // // // // // //         let joinedAtDate = undefined;

// // // // // // // //         if (course.registrationMode === 'automatic') {
// // // // // // // //             initialStatus = 'active';
// // // // // // // //             joinedAtDate = new Date();
// // // // // // // //         }

// // // // // // // //         const newEnrollment = new Enrollment({
// // // // // // // //             user: userId,
// // // // // // // //             course: courseId,
// // // // // // // //             status: initialStatus, 
// // // // // // // //             progress: 0,
// // // // // // // //             isCompleted: false,
// // // // // // // //             enrolledAt: new Date(),
// // // // // // // //             joinedAt: joinedAtDate,
// // // // // // // //             registrationData: registrationData || {} 
// // // // // // // //         });

// // // // // // // //         await newEnrollment.save();
// // // // // // // //         const msg = course.registrationMode === 'automatic' ? 'Pendaftaran berhasil! Mulai belajar.' : 'Pendaftaran berhasil. Tunggu verifikasi.';
// // // // // // // //         res.status(201).json({ message: msg, enrollment: newEnrollment });
// // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // };

// // // // // // // // export const verifyEnrollment = async (req: Request, res: Response) => {
// // // // // // // //     try {
// // // // // // // //         const { enrollmentId, action } = req.body; 
// // // // // // // //         if (action === 'reject') {
// // // // // // // //             await Enrollment.findByIdAndDelete(enrollmentId);
// // // // // // // //             return res.json({ message: "Pendaftaran ditolak." });
// // // // // // // //         }
// // // // // // // //         if (action === 'approve') {
// // // // // // // //             await Enrollment.findByIdAndUpdate(enrollmentId, { status: 'active', joinedAt: new Date() });
// // // // // // // //             return res.json({ message: "Pendaftaran disetujui." });
// // // // // // // //         }
// // // // // // // //         res.status(400).json({ error: "Aksi tidak valid" });
// // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // };

// // // // // // // // export const checkEnrollmentStatus = async (req: AuthedRequest, res: Response) => {
// // // // // // // //     try {
// // // // // // // //         const { courseId } = req.params;
// // // // // // // //         const userId = req.user?.id;
// // // // // // // //         if (!userId) return res.status(401).json({ error: 'Unauthorized' });
// // // // // // // //         const enrollment = await Enrollment.findOne({ user: userId, course: courseId });
// // // // // // // //         if (!enrollment) return res.json({ isEnrolled: false, status: null });
// // // // // // // //         res.json({ isEnrolled: true, status: enrollment.status, progress: enrollment.progress });
// // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // };

// // // // // // // // // ==========================================
// // // // // // // // // 4. PARTICIPANT MANAGEMENT (RESTORED LOGIC)
// // // // // // // // // ==========================================

// // // // // // // // export const getCourseParticipants = async (req: Request, res: Response) => {
// // // // // // // //   try {
// // // // // // // //     res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
// // // // // // // //     const { id } = req.params; 

// // // // // // // //     // A. Ambil Data Enrollment
// // // // // // // //     const enrollments = await Enrollment.find({ course: id })
// // // // // // // //       .populate('user', 'name email avatarUrl role')
// // // // // // // //       .sort({ createdAt: -1 })
// // // // // // // //       .lean();

// // // // // // // //     if (!enrollments.length) return res.json({ participants: [] });

// // // // // // // //     // B. Ambil Progress User
// // // // // // // //     const userIds = enrollments.map((e: any) => e.user?._id);
// // // // // // // //     const progressRecords = await Progress.find({ courseId: id, userId: { $in: userIds } }).lean();

// // // // // // // //     // C. Peta Struktur Course
// // // // // // // //     const course: any = await Course.findById(id).select('modules').lean();
// // // // // // // //     let totalLessons = 0;
// // // // // // // //     const validLessonIds = new Set<string>();
// // // // // // // //     const orderedLessonIds: string[] = [];

// // // // // // // //     if (course && course.modules) {
// // // // // // // //         course.modules.forEach((m: any) => {
// // // // // // // //             if (m.isActive) {
// // // // // // // //                 m.lessons.forEach((l: any) => { 
// // // // // // // //                     if (l.isActive) {
// // // // // // // //                         totalLessons++; 
// // // // // // // //                         const lId = l._id.toString();
// // // // // // // //                         validLessonIds.add(lId);
// // // // // // // //                         orderedLessonIds.push(lId);
// // // // // // // //                     }
// // // // // // // //                 });
// // // // // // // //             }
// // // // // // // //         });
// // // // // // // //     }

// // // // // // // //     // D. Merge Data
// // // // // // // //     const participants = await Promise.all(enrollments.map(async (enroll: any) => {
// // // // // // // //         const userObj = enroll.user || {};
// // // // // // // //         const detail = progressRecords.find((p: any) => p.userId.toString() === userObj._id?.toString());
        
// // // // // // // //         let completedIds: string[] = [];
// // // // // // // //         let calculatedProgress = 0;

// // // // // // // //         if ((enroll.status === 'active' || enroll.status === 'approved') && detail) {
// // // // // // // //             const rawCompleted = detail.completedLessons.map((id: any) => id.toString());
// // // // // // // //             completedIds = rawCompleted.filter((id) => validLessonIds.has(id));
// // // // // // // //             if (totalLessons > 0) calculatedProgress = Math.round((completedIds.length / totalLessons) * 100);
// // // // // // // //             if (calculatedProgress > 100) calculatedProgress = 100;
// // // // // // // //         }

// // // // // // // //         return {
// // // // // // // //             _id: enroll._id, 
// // // // // // // //             user: { _id: userObj._id, name: userObj.name, email: userObj.email, avatarUrl: userObj.avatarUrl, role: userObj.role },
// // // // // // // //             registrationData: enroll.registrationData || {},
// // // // // // // //             status: enroll.status || 'pending', 
// // // // // // // //             progress: calculatedProgress, 
// // // // // // // //             completedLessons: completedIds, 
// // // // // // // //             lessonDetails: detail ? detail.lessonDetails : []
// // // // // // // //         };
// // // // // // // //     }));

// // // // // // // //     res.json({ participants });
// // // // // // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // };

// // // // // // // // // ==========================================
// // // // // // // // // 5. ADMIN & CHAT
// // // // // // // // // ==========================================

// // // // // // // // export const markCompleteLessonByAdmin = async (req: Request, res: Response) => {
// // // // // // // //     try {
// // // // // // // //         const { studentId, lessonId, courseId } = req.body;
// // // // // // // //         let progress = await Progress.findOne({ userId: studentId, courseId });
// // // // // // // //         if (!progress) progress = new Progress({ userId: studentId, courseId, completedLessons: [] });

// // // // // // // //         const strLessonId = lessonId.toString();
// // // // // // // //         if (!progress.completedLessons.some((id: any) => id.toString() === strLessonId)) {
// // // // // // // //             progress.completedLessons.push(lessonId);
// // // // // // // //             await progress.save();
// // // // // // // //         }
// // // // // // // //         res.json({ message: 'Berhasil diluluskan' });
// // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // };

// // // // // // // // export const resetQuizByAdmin = async (req: Request, res: Response) => {
// // // // // // // //     try {
// // // // // // // //         const { studentId, quizId } = req.body; 
// // // // // // // //         if (!studentId || !quizId) return res.status(400).json({ error: "Data incomplete" });
// // // // // // // //         await Progress.findOneAndUpdate({ userId: studentId }, { $pull: { completedLessons: quizId } });
// // // // // // // //         res.json({ message: 'Reset berhasil' });
// // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // };

// // // // // // // // export const getGroupMessages = async (req: AuthedRequest, res: Response) => {
// // // // // // // //     try {
// // // // // // // //         const { id } = req.params; 
// // // // // // // //         const { type } = req.query; 
// // // // // // // //         const query: any = { course: id, type: type || 'public' };
// // // // // // // //         const messages = await Message.find(query).populate('sender', 'name avatarUrl role').sort({ createdAt: 1 });
// // // // // // // //         res.json(messages);
// // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // };

// // // // // // // // export const sendGroupMessage = async (req: AuthedRequest, res: Response) => {
// // // // // // // //     try {
// // // // // // // //         const { id } = req.params; 
// // // // // // // //         const { text, type, attachment } = req.body; 
// // // // // // // //         const userId = req.user?.id;
// // // // // // // //         const newMessage = new Message({
// // // // // // // //             course: id, sender: userId, message: text || '', type: type || 'public',
// // // // // // // //             isRead: false, isGlobal: false, attachment: attachment || null 
// // // // // // // //         });
// // // // // // // //         await newMessage.save();
// // // // // // // //         await newMessage.populate('sender', 'name avatarUrl role');
// // // // // // // //         res.status(201).json(newMessage);
// // // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // // };

// // // // // // // import { Request, Response } from 'express';
// // // // // // // import { Course } from '../models/Course';
// // // // // // // import { Enrollment } from '../models/Enrollment'; // Pastikan path import benar
// // // // // // // import { Progress } from '../models/Progress';
// // // // // // // import { Message } from '../models/Message'; 
// // // // // // // import { AuthedRequest } from '../middleware/auth'; 
// // // // // // // import mongoose from 'mongoose';

// // // // // // // // ==========================================
// // // // // // // // 1. STANDARD CRUD COURSE
// // // // // // // // ==========================================

// // // // // // // export const createCourse = async (req: Request, res: Response) => {
// // // // // // //   try {
// // // // // // //     const course = new Course(req.body);
// // // // // // //     await course.save();
// // // // // // //     res.status(201).json(course);
// // // // // // //   } catch (error: any) {
// // // // // // //     res.status(400).json({ error: error.message });
// // // // // // //   }
// // // // // // // };

// // // // // // // export const getCourses = async (req: Request, res: Response) => {
// // // // // // //   try {
// // // // // // //     const courses = await Course.find()
// // // // // // //       .populate('facilitatorIds', 'name email avatarUrl role') 
// // // // // // //       .sort({ createdAt: -1 });
// // // // // // //     res.json({ courses }); 
// // // // // // //   } catch (error: any) {
// // // // // // //     res.status(500).json({ error: error.message });
// // // // // // //   }
// // // // // // // };

// // // // // // // // [CRITICAL] Mengambil Detail Course Termasuk Template
// // // // // // // export const getCourseById = async (req: Request, res: Response) => {
// // // // // // //   try {
// // // // // // //     const course = await Course.findById(req.params.id)
// // // // // // //       .populate('facilitatorIds', 'name email avatarUrl role bio') 
// // // // // // //       .populate({
// // // // // // //           path: 'modules',
// // // // // // //           populate: { path: 'lessons' }
// // // // // // //       });
// // // // // // //       // CATATAN: Saya tidak menggunakan .lean() agar virtuals tetap jalan jika ada.
// // // // // // //       // registrationTemplates ada di root object, jadi otomatis terambil oleh Mongoose.

// // // // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // // // // // //     res.json(course);
// // // // // // //   } catch (error: any) {
// // // // // // //     res.status(500).json({ error: error.message });
// // // // // // //   }
// // // // // // // };

// // // // // // // export const updateCourse = async (req: Request, res: Response) => {
// // // // // // //   try {
// // // // // // //     // { new: true } memastikan data yang dikembalikan adalah yang terbaru setelah edit
// // // // // // //     const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
// // // // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // // // // // //     res.json(course);
// // // // // // //   } catch (error: any) {
// // // // // // //     res.status(400).json({ error: error.message });
// // // // // // //   }
// // // // // // // };

// // // // // // // export const deleteCourse = async (req: Request, res: Response) => {
// // // // // // //   try {
// // // // // // //     const course = await Course.findByIdAndDelete(req.params.id);
// // // // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
    
// // // // // // //     // Hapus data terkait agar database bersih
// // // // // // //     await Enrollment.deleteMany({ course: req.params.id });
// // // // // // //     await Progress.deleteMany({ courseId: req.params.id });
    
// // // // // // //     res.json({ message: 'Kursus berhasil dihapus' });
// // // // // // //   } catch (error: any) {
// // // // // // //     res.status(500).json({ error: error.message });
// // // // // // //   }
// // // // // // // };

// // // // // // // // ==========================================
// // // // // // // // 2. MODULE & LESSON MANAGEMENT
// // // // // // // // ==========================================

// // // // // // // export const addModule = async (req: Request, res: Response) => {
// // // // // // //     try {
// // // // // // //         const { id } = req.params;
// // // // // // //         const course = await Course.findById(id);
// // // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // //         course.modules.push(req.body);
// // // // // // //         await course.save();
// // // // // // //         res.json(course);
// // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // };

// // // // // // // export const updateModule = async (req: Request, res: Response) => {
// // // // // // //     try {
// // // // // // //         const { courseId, moduleId } = req.params;
// // // // // // //         const cId = courseId || req.params.id; 
// // // // // // //         const course = await Course.findById(cId);
// // // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });
        
// // // // // // //         const module = course.modules.id(moduleId);
// // // // // // //         if (!module) return res.status(404).json({ error: 'Module not found' });
// // // // // // //         module.set(req.body);
// // // // // // //         await course.save();
// // // // // // //         res.json(course);
// // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // };

// // // // // // // export const addLesson = async (req: Request, res: Response) => {
// // // // // // //     try {
// // // // // // //         const { courseId, moduleId } = req.params;
// // // // // // //         const course = await Course.findById(courseId);
// // // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });
        
// // // // // // //         const module = course.modules.id(moduleId);
// // // // // // //         if (!module) return res.status(404).json({ error: 'Module not found' });
        
// // // // // // //         module.lessons.push(req.body);
// // // // // // //         await course.save();
// // // // // // //         res.json(course);
// // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // };

// // // // // // // export const updateLesson = async (req: Request, res: Response) => {
// // // // // // //     try {
// // // // // // //         const { courseId, moduleId, lessonId } = req.params;
// // // // // // //         const course = await Course.findById(courseId);
// // // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });
        
// // // // // // //         const module = course.modules.id(moduleId);
// // // // // // //         if (!module) return res.status(404).json({ error: 'Module not found' });
        
// // // // // // //         const lesson = module.lessons.id(lessonId);
// // // // // // //         if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
        
// // // // // // //         lesson.set(req.body);
// // // // // // //         await course.save();
// // // // // // //         res.json(course);
// // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // };

// // // // // // // export const deleteLesson = async (req: Request, res: Response) => {
// // // // // // //     try {
// // // // // // //         const { courseId, moduleId, lessonId } = req.params;
// // // // // // //         const course = await Course.findById(courseId);
// // // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });
        
// // // // // // //         const module = course.modules.id(moduleId);
// // // // // // //         if (module) {
// // // // // // //             module.lessons.pull({ _id: lessonId }); 
// // // // // // //             await course.save();
// // // // // // //         }
// // // // // // //         res.json(course);
// // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // };

// // // // // // // export const toggleStatus = async (req: Request, res: Response) => {
// // // // // // //     try {
// // // // // // //         const { id } = req.params;
// // // // // // //         const { moduleId, lessonId } = req.body;
// // // // // // //         const course = await Course.findById(id);
// // // // // // //         if (!course) return res.status(404).json({ error: 'Course not found' });

// // // // // // //         if (moduleId && lessonId) {
// // // // // // //             const mod = course.modules.id(moduleId);
// // // // // // //             const les = mod?.lessons.id(lessonId);
// // // // // // //             if (les) les.isActive = !les.isActive;
// // // // // // //         } else if (moduleId) {
// // // // // // //             const mod = course.modules.id(moduleId);
// // // // // // //             if (mod) mod.isActive = !mod.isActive;
// // // // // // //         } else {
// // // // // // //             course.isPublished = !course.isPublished;
// // // // // // //         }
// // // // // // //         await course.save();
// // // // // // //         res.json(course);
// // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // };

// // // // // // // export const reorderModules = async (req: Request, res: Response) => {
// // // // // // //     try {
// // // // // // //         const { id } = req.params;
// // // // // // //         const { modules } = req.body;
// // // // // // //         await Course.findByIdAndUpdate(id, { modules });
// // // // // // //         res.json({ message: 'Urutan disimpan' });
// // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // };

// // // // // // // export const updateGradingScheme = async (req: Request, res: Response) => {
// // // // // // //     try {
// // // // // // //         const { id } = req.params;
// // // // // // //         const { modules } = req.body; 
// // // // // // //         if (!modules) return res.status(400).json({ error: "Data modul diperlukan" });

// // // // // // //         const course = await Course.findByIdAndUpdate(id, { modules }, { new: true });
// // // // // // //         if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
        
// // // // // // //         res.json({ message: 'Skema penilaian berhasil disimpan', course });
// // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // };

// // // // // // // // ==========================================
// // // // // // // // 3. ENROLLMENT & VERIFICATION
// // // // // // // // ==========================================

// // // // // // // export const enrollCourse = async (req: AuthedRequest, res: Response) => {
// // // // // // //     try {
// // // // // // //         const { courseId } = req.params; 
// // // // // // //         const userId = req.user?.id;
// // // // // // //         const { registrationData } = req.body; // Data dari Form Modal Frontend
        
// // // // // // //         if (!userId) return res.status(401).json({ error: 'Unauthorized' });

// // // // // // //         const course = await Course.findById(courseId);
// // // // // // //         if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });

// // // // // // //         const existing = await Enrollment.findOne({ user: userId, course: courseId });
// // // // // // //         if (existing) return res.status(400).json({ error: 'Anda sudah mendaftar.' });

// // // // // // //         let initialStatus = 'pending';
// // // // // // //         let joinedAtDate = undefined;

// // // // // // //         // Logika Mode Pendaftaran
// // // // // // //         if (course.registrationMode === 'automatic') {
// // // // // // //             initialStatus = 'active';
// // // // // // //             joinedAtDate = new Date();
// // // // // // //         }

// // // // // // //         const newEnrollment = new Enrollment({
// // // // // // //             user: userId,
// // // // // // //             course: courseId,
// // // // // // //             status: initialStatus, 
// // // // // // //             progress: 0,
// // // // // // //             isCompleted: false,
// // // // // // //             enrolledAt: new Date(),
// // // // // // //             joinedAt: joinedAtDate,
// // // // // // //             registrationData: registrationData || {} 
// // // // // // //         });

// // // // // // //         await newEnrollment.save();
        
// // // // // // //         const msg = course.registrationMode === 'automatic' 
// // // // // // //             ? 'Pendaftaran berhasil! Mulai belajar.' 
// // // // // // //             : 'Pendaftaran berhasil. Tunggu verifikasi.';
            
// // // // // // //         res.status(201).json({ message: msg, enrollment: newEnrollment });
// // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // };

// // // // // // // export const verifyEnrollment = async (req: Request, res: Response) => {
// // // // // // //     try {
// // // // // // //         const { enrollmentId, action } = req.body; 
// // // // // // //         if (action === 'reject') {
// // // // // // //             await Enrollment.findByIdAndDelete(enrollmentId);
// // // // // // //             return res.json({ message: "Pendaftaran ditolak." });
// // // // // // //         }
// // // // // // //         if (action === 'approve') {
// // // // // // //             await Enrollment.findByIdAndUpdate(enrollmentId, { status: 'active', joinedAt: new Date() });
// // // // // // //             return res.json({ message: "Pendaftaran disetujui." });
// // // // // // //         }
// // // // // // //         res.status(400).json({ error: "Aksi tidak valid" });
// // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // };

// // // // // // // export const checkEnrollmentStatus = async (req: AuthedRequest, res: Response) => {
// // // // // // //     try {
// // // // // // //         const { courseId } = req.params;
// // // // // // //         const userId = req.user?.id;
// // // // // // //         if (!userId) return res.status(401).json({ error: 'Unauthorized' });
// // // // // // //         const enrollment = await Enrollment.findOne({ user: userId, course: courseId });
// // // // // // //         if (!enrollment) return res.json({ isEnrolled: false, status: null });
// // // // // // //         res.json({ isEnrolled: true, status: enrollment.status, progress: enrollment.progress });
// // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // };

// // // // // // // // ==========================================
// // // // // // // // 4. PARTICIPANT MANAGEMENT
// // // // // // // // ==========================================

// // // // // // // export const getCourseParticipants = async (req: Request, res: Response) => {
// // // // // // //   try {
// // // // // // //     res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
// // // // // // //     const { id } = req.params; 

// // // // // // //     // A. Ambil Data Enrollment
// // // // // // //     const enrollments = await Enrollment.find({ course: id })
// // // // // // //       .populate('user', 'name email avatarUrl role')
// // // // // // //       .sort({ createdAt: -1 })
// // // // // // //       .lean();

// // // // // // //     if (!enrollments.length) return res.json({ participants: [] });

// // // // // // //     // B. Ambil Progress User
// // // // // // //     const userIds = enrollments.map((e: any) => e.user?._id);
// // // // // // //     const progressRecords = await Progress.find({ courseId: id, userId: { $in: userIds } }).lean();

// // // // // // //     // C. Peta Struktur Course untuk hitung progress
// // // // // // //     const course: any = await Course.findById(id).select('modules').lean();
// // // // // // //     let totalLessons = 0;
// // // // // // //     const validLessonIds = new Set<string>();

// // // // // // //     if (course && course.modules) {
// // // // // // //         course.modules.forEach((m: any) => {
// // // // // // //             if (m.isActive) {
// // // // // // //                 m.lessons.forEach((l: any) => { 
// // // // // // //                     if (l.isActive) {
// // // // // // //                         totalLessons++; 
// // // // // // //                         validLessonIds.add(l._id.toString());
// // // // // // //                     }
// // // // // // //                 });
// // // // // // //             }
// // // // // // //         });
// // // // // // //     }

// // // // // // //     // D. Merge Data
// // // // // // //     const participants = await Promise.all(enrollments.map(async (enroll: any) => {
// // // // // // //         const userObj = enroll.user || {};
// // // // // // //         const detail = progressRecords.find((p: any) => p.userId.toString() === userObj._id?.toString());
        
// // // // // // //         let calculatedProgress = 0;
// // // // // // //         let completedIds: string[] = [];

// // // // // // //         if ((enroll.status === 'active' || enroll.status === 'approved') && detail) {
// // // // // // //             const rawCompleted = detail.completedLessons.map((id: any) => id.toString());
// // // // // // //             completedIds = rawCompleted.filter((id) => validLessonIds.has(id));
// // // // // // //             if (totalLessons > 0) calculatedProgress = Math.round((completedIds.length / totalLessons) * 100);
// // // // // // //             if (calculatedProgress > 100) calculatedProgress = 100;
// // // // // // //         }

// // // // // // //         return {
// // // // // // //             _id: enroll._id, 
// // // // // // //             user: { _id: userObj._id, name: userObj.name, email: userObj.email, avatarUrl: userObj.avatarUrl, role: userObj.role },
// // // // // // //             registrationData: enroll.registrationData || {},
// // // // // // //             status: enroll.status || 'pending', 
// // // // // // //             progress: calculatedProgress, 
// // // // // // //             completedLessons: completedIds, 
// // // // // // //             lessonDetails: detail ? detail.lessonDetails : []
// // // // // // //         };
// // // // // // //     }));

// // // // // // //     res.json({ participants });
// // // // // // //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // };

// // // // // // // // ==========================================
// // // // // // // // 5. ADMIN & CHAT
// // // // // // // // ==========================================

// // // // // // // export const markCompleteLessonByAdmin = async (req: Request, res: Response) => {
// // // // // // //     try {
// // // // // // //         const { studentId, lessonId, courseId } = req.body;
// // // // // // //         let progress = await Progress.findOne({ userId: studentId, courseId });
// // // // // // //         if (!progress) progress = new Progress({ userId: studentId, courseId, completedLessons: [] });

// // // // // // //         const strLessonId = lessonId.toString();
// // // // // // //         if (!progress.completedLessons.some((id: any) => id.toString() === strLessonId)) {
// // // // // // //             progress.completedLessons.push(lessonId);
// // // // // // //             await progress.save();
// // // // // // //         }
// // // // // // //         res.json({ message: 'Berhasil diluluskan' });
// // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // };

// // // // // // // export const resetQuizByAdmin = async (req: Request, res: Response) => {
// // // // // // //     try {
// // // // // // //         const { studentId, quizId } = req.body; 
// // // // // // //         if (!studentId || !quizId) return res.status(400).json({ error: "Data incomplete" });
// // // // // // //         await Progress.findOneAndUpdate({ userId: studentId }, { $pull: { completedLessons: quizId } });
// // // // // // //         res.json({ message: 'Reset berhasil' });
// // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // };

// // // // // // // export const getGroupMessages = async (req: AuthedRequest, res: Response) => {
// // // // // // //     try {
// // // // // // //         const { id } = req.params; 
// // // // // // //         const { type } = req.query; 
// // // // // // //         const query: any = { course: id, type: type || 'public' };
// // // // // // //         const messages = await Message.find(query).populate('sender', 'name avatarUrl role').sort({ createdAt: 1 });
// // // // // // //         res.json(messages);
// // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // };

// // // // // // // export const sendGroupMessage = async (req: AuthedRequest, res: Response) => {
// // // // // // //     try {
// // // // // // //         const { id } = req.params; 
// // // // // // //         const { text, type, attachment } = req.body; 
// // // // // // //         const userId = req.user?.id;
// // // // // // //         const newMessage = new Message({
// // // // // // //             course: id, sender: userId, message: text || '', type: type || 'public',
// // // // // // //             isRead: false, isGlobal: false, attachment: attachment || null 
// // // // // // //         });
// // // // // // //         await newMessage.save();
// // // // // // //         await newMessage.populate('sender', 'name avatarUrl role');
// // // // // // //         res.status(201).json(newMessage);
// // // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // // };

// // // // // // import { Request, Response } from 'express';
// // // // // // import { Course } from '../models/Course';
// // // // // // import { Enrollment } from '../models/Enrollment';

// // // // // // // --- 1. PUBLIC / GENERAL ---

// // // // // // // Get All Courses (Dengan Filter)
// // // // // // export const getCourses = async (req: Request, res: Response) => {
// // // // // //     try {
// // // // // //         const { search, category, level } = req.query;
// // // // // //         const filter: any = {};

// // // // // //         // Default: Admin bisa lihat semua, tapi untuk endpoint public biasanya difilter isPublished=true
// // // // // //         // Jika ingin membedakan view admin vs public, bisa cek req.user (jika ada)
// // // // // //         // filter.isPublished = true; 

// // // // // //         if (search) {
// // // // // //             filter.title = { $regex: search, $options: 'i' };
// // // // // //         }
// // // // // //         if (category && category !== 'Semua') {
// // // // // //             filter.category = category;
// // // // // //         }
// // // // // //         if (level && level !== 'Semua') {
// // // // // //             filter.level = level;
// // // // // //         }

// // // // // //         const courses = await Course.find(filter)
// // // // // //             .select('title slug thumbnailUrl category level price rating reviewsCount totalJp isPublished facilitatorIds')
// // // // // //             .populate('facilitatorIds', 'name') // Optional: tampilkan nama fasilitator
// // // // // //             .sort({ createdAt: -1 });
            
// // // // // //         res.json({ courses });
// // // // // //     } catch (error: any) {
// // // // // //         res.status(500).json({ error: error.message });
// // // // // //     }
// // // // // // };

// // // // // // // Get Single Course Detail
// // // // // // export const getCourseById = async (req: Request, res: Response) => {
// // // // // //     try {
// // // // // //         const { id } = req.params;
// // // // // //         const course = await Course.findById(id)
// // // // // //             .populate('facilitatorIds', 'name avatarUrl role')
// // // // // //             .populate('modules.facilitatorId', 'name');

// // // // // //         if (!course) {
// // // // // //             return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // // // // //         }
// // // // // //         res.json({ course });
// // // // // //     } catch (error: any) {
// // // // // //         res.status(500).json({ error: error.message });
// // // // // //     }
// // // // // // };

// // // // // // // --- 2. COURSE MANAGEMENT (Admin / Facilitator) ---

// // // // // // // Create Course
// // // // // // export const createCourse = async (req: any, res: Response) => {
// // // // // //     try {
// // // // // //         // Otomatis jadikan pembuat sebagai fasilitator pertama
// // // // // //         const newCourse = await Course.create({
// // // // // //             ...req.body,
// // // // // //             facilitatorIds: [req.user.id],
// // // // // //             creatorInfo: {
// // // // // //                 name: req.user.name,
// // // // // //                 email: req.user.email,
// // // // // //                 contact: req.user.phone || '-'
// // // // // //             }
// // // // // //         });
// // // // // //         res.status(201).json(newCourse);
// // // // // //     } catch (error: any) {
// // // // // //         res.status(500).json({ error: error.message });
// // // // // //     }
// // // // // // };

// // // // // // // Update General Info Course
// // // // // // export const updateCourse = async (req: Request, res: Response) => {
// // // // // //     try {
// // // // // //         const updated = await Course.findByIdAndUpdate(
// // // // // //             req.params.id, 
// // // // // //             req.body, 
// // // // // //             { new: true }
// // // // // //         );
        
// // // // // //         if (!updated) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
        
// // // // // //         res.json(updated);
// // // // // //     } catch (error: any) {
// // // // // //         res.status(500).json({ error: error.message });
// // // // // //     }
// // // // // // };

// // // // // // // Delete Course
// // // // // // export const deleteCourse = async (req: Request, res: Response) => {
// // // // // //     try {
// // // // // //         const deleted = await Course.findByIdAndDelete(req.params.id);
// // // // // //         if (!deleted) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
        
// // // // // //         // Opsional: Hapus enrollment terkait
// // // // // //         await Enrollment.deleteMany({ courseId: req.params.id });

// // // // // //         res.json({ message: 'Kursus berhasil dihapus' });
// // // // // //     } catch (error: any) {
// // // // // //         res.status(500).json({ error: error.message });
// // // // // //     }
// // // // // // };

// // // // // // // Toggle Publish Status (Publish/Unpublish)
// // // // // // export const togglePublishCourse = async (req: Request, res: Response) => {
// // // // // //     try {
// // // // // //         const course = await Course.findById(req.params.id);
// // // // // //         if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });

// // // // // //         course.isPublished = !course.isPublished;
// // // // // //         await course.save();

// // // // // //         res.json({ 
// // // // // //             message: `Kursus berhasil ${course.isPublished ? 'dipublikasikan' : 'disembunyikan'}`, 
// // // // // //             isPublished: course.isPublished 
// // // // // //         });
// // // // // //     } catch (error: any) {
// // // // // //         res.status(500).json({ error: error.message });
// // // // // //     }
// // // // // // };

// // // // // // // --- 3. MODULE MANAGEMENT ---

// // // // // // export const addModule = async (req: Request, res: Response) => {
// // // // // //     try {
// // // // // //         const course = await Course.findById(req.params.id);
// // // // // //         if(!course) return res.status(404).json({error: "Course not found"});
        
// // // // // //         course.modules.push(req.body);
// // // // // //         await course.save();
// // // // // //         res.json(course);
// // // // // //     } catch (error: any) {
// // // // // //         res.status(500).json({ error: error.message });
// // // // // //     }
// // // // // // };

// // // // // // export const updateModule = async (req: Request, res: Response) => {
// // // // // //     try {
// // // // // //         const { id, moduleId } = req.params;
// // // // // //         const course = await Course.findOneAndUpdate(
// // // // // //             { "_id": id, "modules._id": moduleId },
// // // // // //             { 
// // // // // //                 "$set": {
// // // // // //                     "modules.$.title": req.body.title,
// // // // // //                     "modules.$.description": req.body.description,
// // // // // //                     // Tambahkan field lain jika perlu
// // // // // //                 }
// // // // // //             },
// // // // // //             { new: true }
// // // // // //         );
// // // // // //         if (!course) return res.status(404).json({ error: 'Modul tidak ditemukan' });
// // // // // //         res.json(course);
// // // // // //     } catch (error: any) {
// // // // // //         res.status(500).json({ error: error.message });
// // // // // //     }
// // // // // // };

// // // // // // export const deleteModule = async (req: Request, res: Response) => {
// // // // // //     try {
// // // // // //         const { id, moduleId } = req.params;
// // // // // //         const course = await Course.findByIdAndUpdate(
// // // // // //             id,
// // // // // //             { $pull: { modules: { _id: moduleId } } },
// // // // // //             { new: true }
// // // // // //         );
        
// // // // // //         if (!course) return res.status(404).json({ error: 'Kursus atau Modul tidak ditemukan' });
// // // // // //         res.json(course);
// // // // // //     } catch (error: any) {
// // // // // //         res.status(500).json({ error: error.message });
// // // // // //     }
// // // // // // };

// // // // // // // --- 4. LESSON MANAGEMENT ---

// // // // // // export const addLesson = async (req: Request, res: Response) => {
// // // // // //     try {
// // // // // //         const { id, moduleId } = req.params;
// // // // // //         const course = await Course.findById(id);
// // // // // //         if(!course) return res.status(404).json({error:"Not found"});

// // // // // //         const module = course.modules.id(moduleId);
// // // // // //         if(module) {
// // // // // //             module.lessons.push(req.body);
// // // // // //             await course.save();
// // // // // //             res.json(course);
// // // // // //         } else {
// // // // // //             res.status(404).json({ error: 'Modul tidak ditemukan' });
// // // // // //         }
// // // // // //     } catch (error: any) {
// // // // // //         res.status(500).json({ error: error.message });
// // // // // //     }
// // // // // // };

// // // // // // export const updateLesson = async (req: Request, res: Response) => {
// // // // // //     try {
// // // // // //         const { id, moduleId, lessonId } = req.params;
// // // // // //         const course = await Course.findById(id);
// // // // // //         if(!course) return res.status(404).json({error:"Course Not found"});

// // // // // //         const module = course.modules.id(moduleId);
// // // // // //         const lesson = module?.lessons.id(lessonId);
        
// // // // // //         if(lesson) {
// // // // // //             // Update fields
// // // // // //             Object.assign(lesson, req.body);
// // // // // //             await course.save();
// // // // // //             res.json(course);
// // // // // //         } else {
// // // // // //             res.status(404).json({ error: 'Lesson tidak ditemukan' });
// // // // // //         }
// // // // // //     } catch (error: any) {
// // // // // //         res.status(500).json({ error: error.message });
// // // // // //     }
// // // // // // };

// // // // // // export const deleteLesson = async (req: Request, res: Response) => {
// // // // // //     try {
// // // // // //         const { id, moduleId, lessonId } = req.params;
// // // // // //         const course = await Course.findById(id);
// // // // // //         if(!course) return res.status(404).json({error:"Course Not found"});

// // // // // //         const module = course.modules.id(moduleId);
        
// // // // // //         if(module) {
// // // // // //             module.lessons.pull({ _id: lessonId });
// // // // // //             await course.save();
// // // // // //             res.json(course);
// // // // // //         } else {
// // // // // //             res.status(404).json({ error: 'Modul tidak ditemukan' });
// // // // // //         }
// // // // // //     } catch (error: any) {
// // // // // //         res.status(500).json({ error: error.message });
// // // // // //     }
// // // // // // };

// // // // // // // --- 5. PARTICIPANTS ---

// // // // // // export const getCourseParticipants = async (req: Request, res: Response) => {
// // // // // //     try {
// // // // // //         const participants = await Enrollment.find({ courseId: req.params.id })
// // // // // //             .populate('userId', 'name email avatarUrl role');
// // // // // //         res.json({ participants });
// // // // // //     } catch (error: any) {
// // // // // //         res.status(500).json({ error: error.message });
// // // // // //     }
// // // // // // };


// // // // // import { Request, Response } from 'express';
// // // // // import { Course } from '../models/Course';
// // // // // import { Enrollment } from '../models/Enrollment';

// // // // // // --- 1. GET COURSES (DENGAN FILTER ROLE) ---
// // // // // export const getCourses = async (req: Request, res: Response) => {
// // // // //     try {
// // // // //         const { search, category, level } = req.query;
        
// // // // //         // Ambil user dari request (dipasang oleh middleware requireAuth)
// // // // //         // Jika endpoint public, req.user mungkin undefined
// // // // //         const user = (req as any).user; 
        
// // // // //         const filter: any = {};

// // // // //         // --- [LOGIKA FILTER BERDASARKAN ROLE] ---
        
// // // // //         if (user) {
// // // // //             // A. FASILITATOR: HANYA lihat kursus miliknya
// // // // //             if (user.role === 'FACILITATOR') {
// // // // //                 filter.facilitatorIds = user.id; 
// // // // //             }
// // // // //             // B. ADMIN WILAYAH (Provinsi)
// // // // //             else if (user.role === 'ADMIN' && user.regionScope === 'province') {
// // // // //                 // Opsional: Jika Anda punya field targetProvince di Course
// // // // //                 // filter.targetProvince = { $in: user.managedProvinces };
// // // // //             }
// // // // //             // C. SUPER ADMIN / ADMIN NASIONAL: Lihat Semua (Tidak ada filter tambahan)
// // // // //         } 
// // // // //         else {
// // // // //             // D. PUBLIC / STUDENT: Hanya lihat yang sudah Rilis
// // // // //              filter.isPublished = true; 
// // // // //         }

// // // // //         // --- FILTER PENCARIAN STANDAR ---
// // // // //         if (search) {
// // // // //             filter.title = { $regex: search, $options: 'i' };
// // // // //         }
// // // // //         if (category && category !== 'Semua') {
// // // // //             filter.category = category;
// // // // //         }
// // // // //         if (level && level !== 'Semua') {
// // // // //             filter.level = level;
// // // // //         }

// // // // //         const courses = await Course.find(filter)
// // // // //             .select('title slug thumbnailUrl category level price rating reviewsCount totalJp isPublished facilitatorIds modules')
// // // // //             .populate('facilitatorIds', 'name')
// // // // //             .sort({ createdAt: -1 });
            
// // // // //         res.json({ courses });
// // // // //     } catch (error: any) {
// // // // //         res.status(500).json({ error: error.message });
// // // // //     }
// // // // // };

// // // // // // --- 2. GET DETAIL ---
// // // // // export const getCourseById = async (req: Request, res: Response) => {
// // // // //     try {
// // // // //         const { id } = req.params;
// // // // //         const course = await Course.findById(id)
// // // // //             .populate('facilitatorIds', 'name avatarUrl role')
// // // // //             .populate('modules.facilitatorId', 'name');

// // // // //         if (!course) {
// // // // //             return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // // // //         }
// // // // //         res.json({ course });
// // // // //     } catch (error: any) {
// // // // //         res.status(500).json({ error: error.message });
// // // // //     }
// // // // // };

// // // // // // --- 3. CREATE COURSE ---
// // // // // export const createCourse = async (req: any, res: Response) => {
// // // // //     try {
// // // // //         // Otomatis jadikan pembuat sebagai fasilitator pertama
// // // // //         const newCourse = await Course.create({
// // // // //             ...req.body,
// // // // //             facilitatorIds: [req.user.id],
// // // // //             creatorInfo: {
// // // // //                 name: req.user.name,
// // // // //                 email: req.user.email
// // // // //             }
// // // // //         });
// // // // //         res.status(201).json(newCourse);
// // // // //     } catch (error: any) {
// // // // //         res.status(500).json({ error: error.message });
// // // // //     }
// // // // // };

// // // // // // --- 4. UPDATE COURSE ---
// // // // // export const updateCourse = async (req: Request, res: Response) => {
// // // // //     try {
// // // // //         const updated = await Course.findByIdAndUpdate(
// // // // //             req.params.id, 
// // // // //             req.body, 
// // // // //             { new: true }
// // // // //         );
// // // // //         if (!updated) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // // // //         res.json(updated);
// // // // //     } catch (error: any) {
// // // // //         res.status(500).json({ error: error.message });
// // // // //     }
// // // // // };

// // // // // // --- 5. DELETE COURSE ---
// // // // // export const deleteCourse = async (req: Request, res: Response) => {
// // // // //     try {
// // // // //         const deleted = await Course.findByIdAndDelete(req.params.id);
// // // // //         if (!deleted) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
        
// // // // //         await Enrollment.deleteMany({ courseId: req.params.id }); // Hapus data siswa terkait
// // // // //         res.json({ message: 'Kursus berhasil dihapus' });
// // // // //     } catch (error: any) {
// // // // //         res.status(500).json({ error: error.message });
// // // // //     }
// // // // // };

// // // // // // --- 6. TOGGLE PUBLISH ---
// // // // // export const togglePublishCourse = async (req: Request, res: Response) => {
// // // // //     try {
// // // // //         const course = await Course.findById(req.params.id);
// // // // //         if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });

// // // // //         course.isPublished = !course.isPublished;
// // // // //         await course.save();

// // // // //         res.json({ 
// // // // //             message: `Kursus berhasil ${course.isPublished ? 'dipublikasikan' : 'disembunyikan'}`, 
// // // // //             isPublished: course.isPublished 
// // // // //         });
// // // // //     } catch (error: any) {
// // // // //         res.status(500).json({ error: error.message });
// // // // //     }
// // // // // };

// // // // // // --- 7. MODULE MANAGEMENT ---
// // // // // export const addModule = async (req: Request, res: Response) => {
// // // // //     try {
// // // // //         const course = await Course.findById(req.params.id);
// // // // //         if(!course) return res.status(404).json({error: "Course not found"});
        
// // // // //         course.modules.push(req.body);
// // // // //         await course.save();
// // // // //         res.json(course);
// // // // //     } catch (error: any) {
// // // // //         res.status(500).json({ error: error.message });
// // // // //     }
// // // // // };

// // // // // export const updateModule = async (req: Request, res: Response) => {
// // // // //     try {
// // // // //         const { id, moduleId } = req.params;
// // // // //         const course = await Course.findOneAndUpdate(
// // // // //             { "_id": id, "modules._id": moduleId },
// // // // //             { 
// // // // //                 "$set": {
// // // // //                     "modules.$.title": req.body.title,
// // // // //                     "modules.$.description": req.body.description,
// // // // //                 }
// // // // //             },
// // // // //             { new: true }
// // // // //         );
// // // // //         res.json(course);
// // // // //     } catch (error: any) {
// // // // //         res.status(500).json({ error: error.message });
// // // // //     }
// // // // // };

// // // // // export const deleteModule = async (req: Request, res: Response) => {
// // // // //     try {
// // // // //         const { id, moduleId } = req.params;
// // // // //         const course = await Course.findByIdAndUpdate(
// // // // //             id,
// // // // //             { $pull: { modules: { _id: moduleId } } },
// // // // //             { new: true }
// // // // //         );
// // // // //         res.json(course);
// // // // //     } catch (error: any) {
// // // // //         res.status(500).json({ error: error.message });
// // // // //     }
// // // // // };

// // // // // // --- 8. LESSON MANAGEMENT ---
// // // // // export const addLesson = async (req: Request, res: Response) => {
// // // // //     try {
// // // // //         const { id, moduleId } = req.params;
// // // // //         const course = await Course.findById(id);
// // // // //         if(!course) return res.status(404).json({error:"Not found"});

// // // // //         const module = course.modules.id(moduleId);
// // // // //         if(module) {
// // // // //             module.lessons.push(req.body);
// // // // //             await course.save();
// // // // //             res.json(course);
// // // // //         } else {
// // // // //             res.status(404).json({error: "Module not found"});
// // // // //         }
// // // // //     } catch (error: any) {
// // // // //         res.status(500).json({ error: error.message });
// // // // //     }
// // // // // };

// // // // // export const updateLesson = async (req: Request, res: Response) => {
// // // // //     try {
// // // // //         const { id, moduleId, lessonId } = req.params;
// // // // //         const course = await Course.findById(id);
// // // // //         const module = course?.modules.id(moduleId);
// // // // //         const lesson = module?.lessons.id(lessonId);
        
// // // // //         if(lesson) {
// // // // //             Object.assign(lesson, req.body);
// // // // //             await course?.save();
// // // // //             res.json(course);
// // // // //         } else {
// // // // //             res.status(404).json({error: "Lesson not found"});
// // // // //         }
// // // // //     } catch (error: any) {
// // // // //         res.status(500).json({ error: error.message });
// // // // //     }
// // // // // };

// // // // // export const deleteLesson = async (req: Request, res: Response) => {
// // // // //     try {
// // // // //         const { id, moduleId, lessonId } = req.params;
// // // // //         const course = await Course.findById(id);
// // // // //         const module = course?.modules.id(moduleId);
        
// // // // //         if(module) {
// // // // //             module.lessons.pull({ _id: lessonId });
// // // // //             await course?.save();
// // // // //             res.json(course);
// // // // //         } else {
// // // // //             res.status(404).json({error: "Module not found"});
// // // // //         }
// // // // //     } catch (error: any) {
// // // // //         res.status(500).json({ error: error.message });
// // // // //     }
// // // // // };

// // // // // // --- 9. PARTICIPANTS ---
// // // // // export const getCourseParticipants = async (req: Request, res: Response) => {
// // // // //     try {
// // // // //         const participants = await Enrollment.find({ courseId: req.params.id })
// // // // //             .populate('userId', 'name email avatarUrl role');
// // // // //         res.json({ participants });
// // // // //     } catch (error: any) {
// // // // //         res.status(500).json({ error: error.message });
// // // // //     }
// // // // // };


// // // // import { Request, Response } from 'express';
// // // // import { Course } from '../models/Course';
// // // // import { Enrollment } from '../models/Enrollment';
// // // // import { Progress } from '../models/Progress'; 
// // // // import { Message } from '../models/Message';   

// // // // // [AMAN] Helper ini hanya dipakai jika slug KOSONG (data baru). Data lama tidak tersentuh.
// // // // const generateSlug = (title: string) => {
// // // //     return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') + '-' + Date.now();
// // // // };

// // // // // ==========================================
// // // // // 1. STANDARD CRUD COURSE
// // // // // ==========================================

// // // // export const createCourse = async (req: Request, res: Response) => {
// // // //   try {
// // // //     // [PENGAMAN] Hanya isi slug jika kosong. Data lama aman.
// // // //     if (!req.body.slug && req.body.title) {
// // // //         req.body.slug = generateSlug(req.body.title);
// // // //     }
// // // //     // [PENGAMAN] Jika status kosong (bukan dari pengajuan), set draft.
// // // //     if (!req.body.status) {
// // // //         req.body.status = 'draft'; 
// // // //     }

// // // //     const course = new Course(req.body);
// // // //     await course.save();
// // // //     res.status(201).json(course);
// // // //   } catch (error: any) {
// // // //     if (error.code === 11000) {
// // // //         return res.status(400).json({ error: 'Judul pelatihan sudah ada.' });
// // // //     }
// // // //     res.status(400).json({ error: error.message });
// // // //   }
// // // // };

// // // // export const getCourses = async (req: Request, res: Response) => {
// // // //   try {
// // // //     const { status, search } = req.query; 
// // // //     const filter: any = {};

// // // //     // [PENTING] Ini logika agar Tab Pengajuan bisa memfilter data baru
// // // //     if (status) {
// // // //         filter.status = { $in: (status as string).split(',') };
// // // //     }
    
// // // //     // Logika pencarian standar (Sesuai kode lama)
// // // //     if (search) {
// // // //         filter.title = { $regex: search, $options: 'i' };
// // // //     }

// // // //     // [RESTORED] Kembali ke logika lama: populate lengkap, tanpa .select()
// // // //     // Ini memperbaiki masalah data hilang/editor rusak
// // // //     const courses = await Course.find(filter)
// // // //       .populate('facilitatorIds', 'name email avatarUrl role') 
// // // //       .populate('creatorInfo', 'name email') 
// // // //       .sort({ createdAt: -1 });
      
// // // //     res.json({ courses }); 
// // // //   } catch (error: any) {
// // // //     res.status(500).json({ error: error.message });
// // // //   }
// // // // };

// // // // // [RESTORED TOTAL] Ini fungsi vital untuk Editor Materi
// // // // // Kembali menggunakan nested populate agar modul tidak null
// // // // export const getCourseById = async (req: Request, res: Response) => {
// // // //   try {
// // // //     const course = await Course.findById(req.params.id)
// // // //       .populate('facilitatorIds', 'name email avatarUrl role bio') 
// // // //       .populate({
// // // //           path: 'modules',
// // // //           populate: { path: 'lessons' }
// // // //       });

// // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // // //     res.json({ course }); 
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
// // // // // 2. MODULE & LESSON MANAGEMENT (KEMBALI KE ASLI)
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
// // // //         const cId = courseId || req.params.id;
// // // //         const course = await Course.findById(cId);
// // // //         if (!course) return res.status(404).json({ error: 'Course not found' });
        
// // // //         const module = course.modules.id(moduleId);
// // // //         if (!module) return res.status(404).json({ error: 'Module not found' });
// // // //         module.set(req.body);
// // // //         await course.save();
// // // //         res.json(course);
// // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // };

// // // // export const deleteModule = async (req: Request, res: Response) => {
// // // //     try {
// // // //         const { id, moduleId } = req.params;
// // // //         const course = await Course.findByIdAndUpdate(
// // // //             id,
// // // //             { $pull: { modules: { _id: moduleId } } },
// // // //             { new: true }
// // // //         );
// // // //         if (!course) return res.status(404).json({ error: 'Not found' });
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

// // // // // [PENTING] Fungsi ini menangani Toggle Publish (Mata) DAN Toggle Status Modul
// // // // // Ini sesuai dengan routes lama Anda.
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
// // // //             // Ini untuk Kursus (Publish/Unpublish)
// // // //             course.isPublished = !course.isPublished;
// // // //             // Sinkronisasi status agar muncul di tab yang benar
// // // //             course.status = course.isPublished ? 'published' : 'draft';
// // // //         }
// // // //         await course.save();
// // // //         res.json(course);
// // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // };

// // // // // Alias untuk menghindari error import di routes
// // // // export const togglePublishCourse = toggleStatus;

// // // // export const reorderModules = async (req: Request, res: Response) => {
// // // //     try {
// // // //         const { id } = req.params;
// // // //         const { modules } = req.body;
// // // //         await Course.findByIdAndUpdate(id, { modules });
// // // //         res.json({ message: 'Urutan disimpan' });
// // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // };

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
// // // // // 3. ENROLLMENT & VERIFICATION (KODE ASLI)
// // // // // ==========================================
// // // // export const enrollCourse = async (req: any, res: Response) => {
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
        
// // // //         const msg = course.registrationMode === 'automatic' 
// // // //             ? 'Pendaftaran berhasil! Mulai belajar.' 
// // // //             : 'Pendaftaran berhasil. Tunggu verifikasi.';
            
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

// // // // export const checkEnrollmentStatus = async (req: any, res: Response) => {
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
// // // // // 4. PARTICIPANT MANAGEMENT
// // // // // ==========================================
// // // // export const getCourseParticipants = async (req: Request, res: Response) => {
// // // //   try {
// // // //     res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
// // // //     const { id } = req.params; 

// // // //     const enrollments = await Enrollment.find({ course: id })
// // // //       .populate('user', 'name email avatarUrl role')
// // // //       .sort({ createdAt: -1 })
// // // //       .lean();

// // // //     if (!enrollments.length) return res.json({ participants: [] });

// // // //     const userIds = enrollments.map((e: any) => e.user?._id);
// // // //     const progressRecords = await Progress.find({ courseId: id, userId: { $in: userIds } }).lean();

// // // //     const course: any = await Course.findById(id).select('modules').lean();
// // // //     let totalLessons = 0;
// // // //     const validLessonIds = new Set<string>();

// // // //     if (course && course.modules) {
// // // //         course.modules.forEach((m: any) => {
// // // //             if (m.isActive) {
// // // //                 m.lessons.forEach((l: any) => { 
// // // //                     if (l.isActive) {
// // // //                         totalLessons++; 
// // // //                         validLessonIds.add(l._id.toString());
// // // //                     }
// // // //                 });
// // // //             }
// // // //         });
// // // //     }

// // // //     const participants = await Promise.all(enrollments.map(async (enroll: any) => {
// // // //         const userObj = enroll.user || {};
// // // //         const detail = progressRecords.find((p: any) => p.userId.toString() === userObj._id?.toString());
        
// // // //         let calculatedProgress = 0;
// // // //         let completedIds: string[] = [];

// // // //         if ((enroll.status === 'active' || enroll.status === 'approved') && detail) {
// // // //             const rawCompleted = detail.completedLessons.map((id: any) => id.toString());
// // // //             completedIds = rawCompleted.filter((id: any) => validLessonIds.has(id));
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

// // // // export const getGroupMessages = async (req: any, res: Response) => {
// // // //     try {
// // // //         const { id } = req.params; 
// // // //         const { type } = req.query; 
// // // //         const query: any = { course: id, type: type || 'public' };
// // // //         const messages = await Message.find(query).populate('sender', 'name avatarUrl role').sort({ createdAt: 1 });
// // // //         res.json(messages);
// // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // };

// // // // export const sendGroupMessage = async (req: any, res: Response) => {
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
// // // import { Enrollment } from '../models/Enrollment';
// // // import { Progress } from '../models/Progress'; 
// // // import { Message } from '../models/Message';   
// // // import { AuthedRequest } from '../middleware/auth';

// // // // Helper Slug
// // // const generateSlug = (title: string) => {
// // //     return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') + '-' + Date.now();
// // // };

// // // // ==========================================
// // // // 1. STANDARD CRUD COURSE
// // // // ==========================================

// // // export const createCourse = async (req: AuthedRequest, res: Response) => {
// // //   try {
// // //     const data = req.body;

// // //     // [AUTO SCOPE] Simpan Kode Wilayah Pembuat (Untuk Admin Wilayah)
// // //     let regionCode = 'national';
// // //     if (req.user?.role === 'ADMIN') {
// // //         if (req.user.regionScope === 'province') regionCode = req.user.managedProvinces?.[0] || 'national';
// // //         if (req.user.regionScope === 'regency') regionCode = req.user.managedRegencies?.[0] || 'national';
// // //     }

// // //     // Auto-generate slug & status
// // //     if (!data.slug && data.title) {
// // //         data.slug = generateSlug(data.title);
// // //     }
// // //     if (!data.status) {
// // //         data.status = 'draft'; 
// // //     }

// // //     const course = new Course({
// // //         ...data,
// // //         regionCode, // Simpan wilayah
// // //         // Jika belum ada facilitatorIds, masukkan pembuatnya
// // //         facilitatorIds: data.facilitatorIds || [req.user?.id],
// // //         creatorInfo: {
// // //             id: req.user?.id,
// // //             name: req.user?.name,
// // //             email: req.user?.email,
// // //             role: req.user?.role
// // //         }
// // //     });

// // //     await course.save();
// // //     res.status(201).json(course);
// // //   } catch (error: any) {
// // //     if (error.code === 11000) return res.status(400).json({ error: 'Judul pelatihan sudah ada.' });
// // //     res.status(400).json({ error: error.message });
// // //   }
// // // };

// // // export const getCourses = async (req: any, res: Response) => {
// // //   try {
// // //     const { status, search } = req.query; 
    
// // //     // [INTEGRASI SCOPE] Ambil filter dari middleware
// // //     const scopeFilter = req.filterQuery || {};
// // //     const filter: any = { ...scopeFilter };

// // //     if (status) {
// // //         filter.status = { $in: (status as string).split(',') };
// // //     }
// // //     if (search) {
// // //         filter.title = { $regex: search, $options: 'i' };
// // //     }

// // //     const courses = await Course.find(filter)
// // //       .populate('facilitatorIds', 'name email avatarUrl role') 
// // //       .populate('creatorInfo', 'name email') 
// // //       .sort({ createdAt: -1 });
      
// // //     res.json({ courses }); 
// // //   } catch (error: any) {
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // };

// // // export const getCourseById = async (req: Request, res: Response) => {
// // //   try {
// // //     const course = await Course.findById(req.params.id)
// // //       .populate('facilitatorIds', 'name email avatarUrl role bio') 
// // //       .populate({
// // //           path: 'modules',
// // //           populate: { path: 'lessons' }
// // //       });

// // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // //     res.json({ course }); 
// // //   } catch (error: any) {
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // };

// // // export const updateCourse = async (req: Request, res: Response) => {
// // //   try {
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

// // // export const deleteModule = async (req: Request, res: Response) => {
// // //     try {
// // //         const { id, moduleId } = req.params;
// // //         const course = await Course.findByIdAndUpdate(
// // //             id,
// // //             { $pull: { modules: { _id: moduleId } } },
// // //             { new: true }
// // //         );
// // //         if (!course) return res.status(404).json({ error: 'Not found' });
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

// // // // [FIX] PUBLISH TOGGLE
// // // export const togglePublishCourse = async (req: Request, res: Response) => {
// // //     try {
// // //         const { id } = req.params;
// // //         const course = await Course.findById(id);
// // //         if (!course) return res.status(404).json({ error: 'Course not found' });

// // //         // Update status sesuai isPublished baru
// // //         const newPublishedState = !course.isPublished;
// // //         const newStatus = newPublishedState ? 'published' : 'draft';

// // //         course.isPublished = newPublishedState;
// // //         course.status = newStatus;
        
// // //         await course.save();
// // //         res.json(course);
// // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // };

// // // export const toggleStatus = togglePublishCourse; // Alias jika routes lama pakai nama ini

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
// // // export const enrollCourse = async (req: any, res: Response) => {
// // //     try {
// // //         const { courseId } = req.params; 
// // //         const userId = req.user?.id;
// // //         const { registrationData } = req.body;
        
// // //         if (!userId) return res.status(401).json({ error: 'Unauthorized' });

// // //         const course = await Course.findById(courseId);
// // //         if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });

// // //         const existing = await Enrollment.findOne({ user: userId, course: courseId });
// // //         if (existing) return res.status(400).json({ error: 'Anda sudah mendaftar.' });

// // //         let initialStatus = 'pending';
// // //         let joinedAtDate = undefined;

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

// // // export const checkEnrollmentStatus = async (req: any, res: Response) => {
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

// // //     const enrollments = await Enrollment.find({ course: id })
// // //       .populate('user', 'name email avatarUrl role')
// // //       .sort({ createdAt: -1 })
// // //       .lean();

// // //     if (!enrollments.length) return res.json({ participants: [] });

// // //     const userIds = enrollments.map((e: any) => e.user?._id);
// // //     const progressRecords = await Progress.find({ courseId: id, userId: { $in: userIds } }).lean();

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

// // //     const participants = await Promise.all(enrollments.map(async (enroll: any) => {
// // //         const userObj = enroll.user || {};
// // //         const detail = progressRecords.find((p: any) => p.userId.toString() === userObj._id?.toString());
        
// // //         let calculatedProgress = 0;
// // //         let completedIds: string[] = [];

// // //         if ((enroll.status === 'active' || enroll.status === 'approved') && detail) {
// // //             const rawCompleted = detail.completedLessons.map((id: any) => id.toString());
// // //             completedIds = rawCompleted.filter((id: any) => validLessonIds.has(id));
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

// // // export const getGroupMessages = async (req: any, res: Response) => {
// // //     try {
// // //         const { id } = req.params; 
// // //         const { type } = req.query; 
// // //         const query: any = { course: id, type: type || 'public' };
// // //         const messages = await Message.find(query).populate('sender', 'name avatarUrl role').sort({ createdAt: 1 });
// // //         res.json(messages);
// // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // };

// // // export const sendGroupMessage = async (req: any, res: Response) => {
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
// // import { Progress } from '../models/Progress'; 
// // import { Message } from '../models/Message';   
// // import { AuthedRequest } from '../middleware/auth';
// // import slugify from 'slugify'; // Pastikan install: npm install slugify

// // // Helper Slug
// // const generateSlug = async (title: string) => {
// //     let slug = slugify(title, { lower: true, strict: true });
// //     // Cek duplikat slug
// //     const exists = await Course.findOne({ slug });
// //     if (exists) slug = `${slug}-${Date.now()}`;
// //     return slug;
// // };

// // // ==========================================
// // // 1. STANDARD CRUD COURSE
// // // ==========================================

// // export const createCourse = async (req: AuthedRequest, res: Response) => {
// //   try {
// //     const data = req.body;

// //     // [AUTO SCOPE] Simpan Kode Wilayah Pembuat
// //     let regionCode = 'national';
// //     if (req.user?.role === 'ADMIN') {
// //         if (req.user.regionScope === 'province') regionCode = req.user.managedProvinces?.[0] || 'national';
// //         if (req.user.regionScope === 'regency') regionCode = req.user.managedRegencies?.[0] || 'national';
// //     }

// //     // Auto-generate slug 
// //     if (!data.slug && data.title) {
// //         data.slug = await generateSlug(data.title);
// //     }
    
// //     // Default status
// //     if (!data.status) {
// //         data.status = 'draft'; 
// //     }

// //     // [PENTING] Pastikan picIds diambil dari body
// //     const facilitatorIds = data.facilitatorIds || [req.user?.id];
// //     const picIds = data.picIds || []; 

// //     const course = new Course({
// //         ...data,
// //         regionCode, 
// //         facilitatorIds,
// //         picIds, // Simpan PIC ID ke database (agar permission jalan)
// //         creatorInfo: {
// //             id: req.user?.id,
// //             name: req.user?.name,
// //             email: req.user?.email,
// //             role: req.user?.role
// //         }
// //     });

// //     await course.save();
// //     res.status(201).json(course);
// //   } catch (error: any) {
// //     if (error.code === 11000) return res.status(400).json({ error: 'Judul pelatihan sudah ada.' });
// //     res.status(400).json({ error: error.message });
// //   }
// // };

// // export const getCourses = async (req: any, res: Response) => {
// //   try {
// //     const { status, search, type, limit = 50, page = 1, sort = '-createdAt' } = req.query; 
    
// //     // [INTEGRASI SCOPE] Ambil filter dari middleware
// //     const scopeFilter = req.filterQuery || {};
// //     const filter: any = { ...scopeFilter };

// //     if (status) {
// //         filter.status = { $in: (status as string).split(',') };
// //     }
// //     if (search) {
// //         filter.title = { $regex: search, $options: 'i' };
// //     }
// //     if (type) {
// //         filter.programType = type;
// //     }

// //     const courses = await Course.find(filter)
// //       .populate('facilitatorIds', 'name email avatarUrl role') 
// //       .populate('picIds', 'name email avatarUrl role') // [LENGKAP] Populate PIC agar nama muncul
// //       .populate('creatorInfo', 'name email') 
// //       .sort(sort as string)
// //       .limit(Number(limit))
// //       .skip((Number(page) - 1) * Number(limit));
      
// //     const total = await Course.countDocuments(filter);

// //     res.json({ 
// //         courses,
// //         totalPages: Math.ceil(total / Number(limit)),
// //         currentPage: Number(page)
// //     }); 
// //   } catch (error: any) {
// //     res.status(500).json({ error: error.message });
// //   }
// // };

// // export const getCourseById = async (req: Request, res: Response) => {
// //   try {
// //     const course = await Course.findById(req.params.id)
// //       .populate('facilitatorIds', 'name email avatarUrl role bio') 
// //       .populate('picIds', 'name email avatarUrl role') // [LENGKAP] Populate PIC
// //       .populate({
// //           path: 'modules',
// //           populate: { path: 'lessons' }
// //       });

// //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// //     res.json({ course }); 
// //   } catch (error: any) {
// //     res.status(500).json({ error: error.message });
// //   }
// // };

// // export const updateCourse = async (req: Request, res: Response) => {
// //   try {
// //     const updateData = { ...req.body };
    
// //     // Pastikan picIds tidak hilang saat update
// //     if (updateData.picIds && !Array.isArray(updateData.picIds)) {
// //         delete updateData.picIds; // Hindari error jika data korup
// //     }

// //     const course = await Course.findByIdAndUpdate(req.params.id, updateData, { new: true });
// //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// //     res.json(course);
// //   } catch (error: any) {
// //     res.status(400).json({ error: error.message });
// //   }
// // };

// // export const deleteCourse = async (req: Request, res: Response) => {
// //   try {
// //     const course = await Course.findByIdAndDelete(req.params.id);
// //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
    
// //     await Enrollment.deleteMany({ course: req.params.id });
// //     await Progress.deleteMany({ courseId: req.params.id });
    
// //     res.json({ message: 'Kursus berhasil dihapus' });
// //   } catch (error: any) {
// //     res.status(500).json({ error: error.message });
// //   }
// // };

// // // ==========================================
// // // 2. MODULE & LESSON MANAGEMENT
// // // ==========================================

// // export const addModule = async (req: Request, res: Response) => {
// //     try {
// //         const { id } = req.params;
// //         const course = await Course.findById(id);
// //         if (!course) return res.status(404).json({ error: 'Course not found' });
// //         course.modules.push(req.body);
// //         await course.save();
// //         res.json(course);
// //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // };

// // export const updateModule = async (req: Request, res: Response) => {
// //     try {
// //         const { courseId, moduleId } = req.params;
// //         const cId = courseId || req.params.id;
// //         const course = await Course.findById(cId);
// //         if (!course) return res.status(404).json({ error: 'Course not found' });
        
// //         const module = course.modules.id(moduleId);
// //         if (!module) return res.status(404).json({ error: 'Module not found' });
// //         module.set(req.body);
// //         await course.save();
// //         res.json(course);
// //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // };

// // export const deleteModule = async (req: Request, res: Response) => {
// //     try {
// //         const { id, moduleId } = req.params;
// //         const course = await Course.findByIdAndUpdate(
// //             id,
// //             { $pull: { modules: { _id: moduleId } } },
// //             { new: true }
// //         );
// //         if (!course) return res.status(404).json({ error: 'Not found' });
// //         res.json(course);
// //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // };

// // export const addLesson = async (req: Request, res: Response) => {
// //     try {
// //         const { courseId, moduleId } = req.params;
// //         const course = await Course.findById(courseId);
// //         if (!course) return res.status(404).json({ error: 'Course not found' });
        
// //         const module = course.modules.id(moduleId);
// //         if (!module) return res.status(404).json({ error: 'Module not found' });
        
// //         module.lessons.push(req.body);
// //         await course.save();
// //         res.json(course);
// //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // };

// // export const updateLesson = async (req: Request, res: Response) => {
// //     try {
// //         const { courseId, moduleId, lessonId } = req.params;
// //         const course = await Course.findById(courseId);
// //         if (!course) return res.status(404).json({ error: 'Course not found' });
        
// //         const module = course.modules.id(moduleId);
// //         if (!module) return res.status(404).json({ error: 'Module not found' });
        
// //         const lesson = module.lessons.id(lessonId);
// //         if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
        
// //         lesson.set(req.body);
// //         await course.save();
// //         res.json(course);
// //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // };

// // export const deleteLesson = async (req: Request, res: Response) => {
// //     try {
// //         const { courseId, moduleId, lessonId } = req.params;
// //         const course = await Course.findById(courseId);
// //         if (!course) return res.status(404).json({ error: 'Course not found' });
        
// //         const module = course.modules.id(moduleId);
// //         if (module) {
// //             module.lessons.pull({ _id: lessonId }); 
// //             await course.save();
// //         }
// //         res.json(course);
// //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // };

// // // [FIX] PUBLISH TOGGLE
// // export const togglePublishCourse = async (req: Request, res: Response) => {
// //     try {
// //         const { id } = req.params;
// //         const course = await Course.findById(id);
// //         if (!course) return res.status(404).json({ error: 'Course not found' });

// //         // Update status sesuai isPublished baru
// //         const newPublishedState = !course.isPublished;
// //         const newStatus = newPublishedState ? 'published' : 'draft';

// //         course.isPublished = newPublishedState;
// //         course.status = newStatus;
        
// //         await course.save();
// //         res.json(course);
// //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // };

// // export const toggleStatus = togglePublishCourse; 

// // export const reorderModules = async (req: Request, res: Response) => {
// //     try {
// //         const { id } = req.params;
// //         const { modules } = req.body;
// //         await Course.findByIdAndUpdate(id, { modules });
// //         res.json({ message: 'Urutan disimpan' });
// //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // };

// // export const updateGradingScheme = async (req: Request, res: Response) => {
// //     try {
// //         const { id } = req.params;
// //         const { modules } = req.body; 
// //         if (!modules) return res.status(400).json({ error: "Data modul diperlukan" });

// //         const course = await Course.findByIdAndUpdate(id, { modules }, { new: true });
// //         if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
        
// //         res.json({ message: 'Skema penilaian berhasil disimpan', course });
// //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // };

// // // ==========================================
// // // 3. ENROLLMENT & VERIFICATION
// // // ==========================================
// // export const enrollCourse = async (req: any, res: Response) => {
// //     try {
// //         const { courseId } = req.params; 
// //         const userId = req.user?.id;
// //         const { registrationData } = req.body;
        
// //         if (!userId) return res.status(401).json({ error: 'Unauthorized' });

// //         const course = await Course.findById(courseId);
// //         if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });

// //         const existing = await Enrollment.findOne({ user: userId, course: courseId });
// //         if (existing) return res.status(400).json({ error: 'Anda sudah mendaftar.' });

// //         let initialStatus = 'pending';
// //         let joinedAtDate = undefined;

// //         if (course.registrationMode === 'automatic') { 
// //             initialStatus = 'active';
// //             joinedAtDate = new Date();
// //         }

// //         const newEnrollment = new Enrollment({
// //             user: userId,
// //             course: courseId,
// //             status: initialStatus, 
// //             progress: 0,
// //             isCompleted: false,
// //             enrolledAt: new Date(),
// //             joinedAt: joinedAtDate,
// //             registrationData: registrationData || {} 
// //         });

// //         await newEnrollment.save();
        
// //         const msg = course.registrationMode === 'automatic' 
// //             ? 'Pendaftaran berhasil! Mulai belajar.' 
// //             : 'Pendaftaran berhasil. Tunggu verifikasi.';
            
// //         res.status(201).json({ message: msg, enrollment: newEnrollment });
// //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // };

// // export const verifyEnrollment = async (req: Request, res: Response) => {
// //     try {
// //         const { enrollmentId, action } = req.body; 
// //         if (action === 'reject') {
// //             await Enrollment.findByIdAndDelete(enrollmentId);
// //             return res.json({ message: "Pendaftaran ditolak." });
// //         }
// //         if (action === 'approve') {
// //             await Enrollment.findByIdAndUpdate(enrollmentId, { status: 'active', joinedAt: new Date() });
// //             return res.json({ message: "Pendaftaran disetujui." });
// //         }
// //         res.status(400).json({ error: "Aksi tidak valid" });
// //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // };

// // export const checkEnrollmentStatus = async (req: any, res: Response) => {
// //     try {
// //         const { courseId } = req.params;
// //         const userId = req.user?.id;
// //         if (!userId) return res.status(401).json({ error: 'Unauthorized' });
// //         const enrollment = await Enrollment.findOne({ user: userId, course: courseId });
// //         if (!enrollment) return res.json({ isEnrolled: false, status: null });
// //         res.json({ isEnrolled: true, status: enrollment.status, progress: enrollment.progress });
// //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // };

// // // ==========================================
// // // 4. PARTICIPANT MANAGEMENT
// // // ==========================================
// // export const getCourseParticipants = async (req: Request, res: Response) => {
// //   try {
// //     res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
// //     const { id } = req.params; 

// //     const enrollments = await Enrollment.find({ course: id })
// //       .populate('user', 'name email avatarUrl role')
// //       .sort({ createdAt: -1 })
// //       .lean();

// //     if (!enrollments.length) return res.json({ participants: [] });

// //     const userIds = enrollments.map((e: any) => e.user?._id);
// //     const progressRecords = await Progress.find({ courseId: id, userId: { $in: userIds } }).lean();

// //     const course: any = await Course.findById(id).select('modules').lean();
// //     let totalLessons = 0;
// //     const validLessonIds = new Set<string>();

// //     if (course && course.modules) {
// //         course.modules.forEach((m: any) => {
// //             if (m.isActive) {
// //                 m.lessons.forEach((l: any) => { 
// //                     if (l.isActive) {
// //                         totalLessons++; 
// //                         validLessonIds.add(l._id.toString());
// //                     }
// //                 });
// //             }
// //         });
// //     }

// //     const participants = await Promise.all(enrollments.map(async (enroll: any) => {
// //         const userObj = enroll.user || {};
// //         const detail = progressRecords.find((p: any) => p.userId.toString() === userObj._id?.toString());
        
// //         let calculatedProgress = 0;
// //         let completedIds: string[] = [];

// //         if ((enroll.status === 'active' || enroll.status === 'approved') && detail) {
// //             const rawCompleted = detail.completedLessons.map((id: any) => id.toString());
// //             completedIds = rawCompleted.filter((id: any) => validLessonIds.has(id));
// //             if (totalLessons > 0) calculatedProgress = Math.round((completedIds.length / totalLessons) * 100);
// //             if (calculatedProgress > 100) calculatedProgress = 100;
// //         }

// //         return {
// //             _id: enroll._id, 
// //             user: { _id: userObj._id, name: userObj.name, email: userObj.email, avatarUrl: userObj.avatarUrl, role: userObj.role },
// //             registrationData: enroll.registrationData || {},
// //             status: enroll.status || 'pending', 
// //             progress: calculatedProgress, 
// //             completedLessons: completedIds, 
// //             lessonDetails: detail ? detail.lessonDetails : []
// //         };
// //     }));

// //     res.json({ participants });
// //   } catch (error: any) { res.status(500).json({ error: error.message }); }
// // };

// // // ==========================================
// // // 5. ADMIN & CHAT
// // // ==========================================
// // export const markCompleteLessonByAdmin = async (req: Request, res: Response) => {
// //     try {
// //         const { studentId, lessonId, courseId } = req.body;
// //         let progress = await Progress.findOne({ userId: studentId, courseId });
// //         if (!progress) progress = new Progress({ userId: studentId, courseId, completedLessons: [] });

// //         const strLessonId = lessonId.toString();
// //         if (!progress.completedLessons.some((id: any) => id.toString() === strLessonId)) {
// //             progress.completedLessons.push(lessonId);
// //             await progress.save();
// //         }
// //         res.json({ message: 'Berhasil diluluskan' });
// //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // };

// // export const resetQuizByAdmin = async (req: Request, res: Response) => {
// //     try {
// //         const { studentId, quizId } = req.body; 
// //         if (!studentId || !quizId) return res.status(400).json({ error: "Data incomplete" });
// //         await Progress.findOneAndUpdate({ userId: studentId }, { $pull: { completedLessons: quizId } });
// //         res.json({ message: 'Reset berhasil' });
// //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // };

// // export const getGroupMessages = async (req: any, res: Response) => {
// //     try {
// //         const { id } = req.params; 
// //         const { type } = req.query; 
// //         const query: any = { course: id, type: type || 'public' };
// //         const messages = await Message.find(query).populate('sender', 'name avatarUrl role').sort({ createdAt: 1 });
// //         res.json(messages);
// //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // };

// // export const sendGroupMessage = async (req: any, res: Response) => {
// //     try {
// //         const { id } = req.params; 
// //         const { text, type, attachment } = req.body; 
// //         const userId = req.user?.id;
// //         const newMessage = new Message({
// //             course: id, sender: userId, message: text || '', type: type || 'public',
// //             isRead: false, isGlobal: false, attachment: attachment || null 
// //         });
// //         await newMessage.save();
// //         await newMessage.populate('sender', 'name avatarUrl role');
// //         res.status(201).json(newMessage);
// //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // };



// import { Request, Response } from 'express';
// import { Course } from '../models/Course';
// import { Enrollment } from '../models/Enrollment';
// import { Progress } from '../models/Progress';
// import { Message } from '../models/Message';
// import { AuthedRequest } from '../middleware/auth';
// import slugify from 'slugify';

// // Helper Slug
// const generateSlug = async (title: string) => {
//     let slug = slugify(title, { lower: true, strict: true });
//     const exists = await Course.findOne({ slug });
//     if (exists) slug = `${slug}-${Date.now()}`;
//     return slug;
// };

// // ==========================================
// // 1. STANDARD CRUD COURSE
// // ==========================================

// export const createCourse = async (req: AuthedRequest, res: Response) => {
//   try {
//     const data = req.body;
//     let regionCode = 'national';
//     if (req.user?.role === 'ADMIN') {
//         if (req.user.regionScope === 'province') regionCode = req.user.managedProvinces?.[0] || 'national';
//         if (req.user.regionScope === 'regency') regionCode = req.user.managedRegencies?.[0] || 'national';
//     }

//     if (!data.slug && data.title) {
//         data.slug = await generateSlug(data.title);
//     }
    
//     if (!data.status) {
//         data.status = 'draft'; 
//     }

//     const facilitatorIds = data.facilitatorIds || [req.user?.id];
//     const picIds = data.picIds || []; 

//     const course = new Course({
//         ...data,
//         regionCode, 
//         facilitatorIds,
//         picIds, 
//         creatorInfo: {
//             id: req.user?.id,
//             name: req.user?.name,
//             email: req.user?.email,
//             role: req.user?.role
//         }
//     });

//     await course.save();
//     res.status(201).json(course);
//   } catch (error: any) {
//     if (error.code === 11000) return res.status(400).json({ error: 'Judul pelatihan sudah ada.' });
//     res.status(400).json({ error: error.message });
//   }
// };

// export const getCourses = async (req: any, res: Response) => {
//   try {
//     const { status, search, type, limit = 50, page = 1, sort = '-createdAt', isPublished } = req.query; 
    
//     const scopeFilter = req.filterQuery || {};
//     const filter: any = { ...scopeFilter };

//     // --- LOGIKA BARU: KATALOG VS DASHBOARD ---
//     // Indikator Katalog: User secara eksplisit minta data publik
//     const isCatalogRequest = isPublished === 'true' || status === 'published' || status === 'ready';

//     if (isCatalogRequest) {
//         // [KATALOG MODE]
//         // Tampilkan semua kursus yang statusnya published/ready TANPA memfilter creator.
//         if (!status) {
//              filter.status = { $in: ['published', 'ready'] };
//         } else {
//              filter.status = { $in: (status as string).split(',') };
//         }
//         // Hapus filter creator jika ada, agar katalog full
//         delete filter['creatorInfo.id'];
//     } else {
//         // [DASHBOARD MODE]
//         if (status) {
//             filter.status = { $in: (status as string).split(',') };
//         }
//         // Khusus Fasilitator di Dashboard: Hanya lihat miliknya sendiri
//         if (req.user?.role === 'FACILITATOR') {
//              filter['creatorInfo.id'] = req.user.id; 
//         }
//     }

//     if (search) {
//         filter.title = { $regex: search, $options: 'i' };
//     }
//     if (type) {
//         filter.programType = type;
//     }

//     const courses = await Course.find(filter)
//       .populate('facilitatorIds', 'name email avatarUrl role') 
//       .populate('picIds', 'name email avatarUrl role') 
//       .populate('creatorInfo', 'name email') 
//       .sort(sort as string)
//       .limit(Number(limit))
//       .skip((Number(page) - 1) * Number(limit));
      
//     const total = await Course.countDocuments(filter);

//     res.json({ 
//         courses,
//         totalPages: Math.ceil(total / Number(limit)),
//         currentPage: Number(page)
//     }); 
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const getCourseById = async (req: Request, res: Response) => {
//   try {
//     const course = await Course.findById(req.params.id)
//       .populate('facilitatorIds', 'name email avatarUrl role bio') 
//       .populate('picIds', 'name email avatarUrl role') 
//       .populate({
//           path: 'modules',
//           populate: { path: 'lessons' }
//       });

//     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
//     res.json({ course }); 
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const updateCourse = async (req: Request, res: Response) => {
//   try {
//     const updateData = { ...req.body };
//     if (updateData.picIds && !Array.isArray(updateData.picIds)) {
//         delete updateData.picIds; 
//     }

//     const course = await Course.findByIdAndUpdate(req.params.id, updateData, { new: true });
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
//         const cId = courseId || req.params.id;
//         const course = await Course.findById(cId);
//         if (!course) return res.status(404).json({ error: 'Course not found' });
        
//         const module = course.modules.id(moduleId);
//         if (!module) return res.status(404).json({ error: 'Module not found' });
//         module.set(req.body);
//         await course.save();
//         res.json(course);
//     } catch (error: any) { res.status(500).json({ error: error.message }); }
// };

// export const deleteModule = async (req: Request, res: Response) => {
//     try {
//         const { id, moduleId } = req.params;
//         const course = await Course.findByIdAndUpdate(
//             id,
//             { $pull: { modules: { _id: moduleId } } },
//             { new: true }
//         );
//         if (!course) return res.status(404).json({ error: 'Not found' });
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

// // [FIX] PUBLISH TOGGLE
// export const togglePublishCourse = async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;
//         const course = await Course.findById(id);
//         if (!course) return res.status(404).json({ error: 'Course not found' });

//         const newPublishedState = !course.isPublished;
//         const newStatus = newPublishedState ? 'published' : 'draft';

//         course.isPublished = newPublishedState;
//         course.status = newStatus;
        
//         await course.save();
//         res.json(course);
//     } catch (error: any) { res.status(500).json({ error: error.message }); }
// };

// export const toggleStatus = togglePublishCourse; 

// export const reorderModules = async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;
//         const { modules } = req.body;
//         await Course.findByIdAndUpdate(id, { modules });
//         res.json({ message: 'Urutan disimpan' });
//     } catch (error: any) { res.status(500).json({ error: error.message }); }
// };

// export const updateGradingScheme = async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;
//         const { modules } = req.body; 
//         if (!modules) return res.status(400).json({ error: "Data modul diperlukan" });

//         const course = await Course.findByIdAndUpdate(id, { modules }, { new: true });
//         if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
        
//         res.json({ message: 'Skema penilaian berhasil disimpan', course });
//     } catch (error: any) { res.status(500).json({ error: error.message }); }
// };

// // ==========================================
// // 3. ENROLLMENT & VERIFICATION
// // ==========================================
// export const enrollCourse = async (req: any, res: Response) => {
//     try {
//         const { courseId } = req.params; 
//         const userId = req.user?.id;
//         const { registrationData } = req.body;
        
//         if (!userId) return res.status(401).json({ error: 'Unauthorized' });

//         const course = await Course.findById(courseId);
//         if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });

//         const existing = await Enrollment.findOne({ user: userId, course: courseId });
//         if (existing) return res.status(400).json({ error: 'Anda sudah mendaftar.' });

//         let initialStatus = 'pending';
//         let joinedAtDate = undefined;

//         if (course.registrationMode === 'automatic') { 
//             initialStatus = 'active';
//             joinedAtDate = new Date();
//         }

//         const newEnrollment = new Enrollment({
//             user: userId,
//             course: courseId,
//             status: initialStatus, 
//             progress: 0,
//             isCompleted: false,
//             enrolledAt: new Date(),
//             joinedAt: joinedAtDate,
//             registrationData: registrationData || {} 
//         });

//         await newEnrollment.save();
        
//         const msg = course.registrationMode === 'automatic' 
//             ? 'Pendaftaran berhasil! Mulai belajar.' 
//             : 'Pendaftaran berhasil. Tunggu verifikasi.';
            
//         res.status(201).json({ message: msg, enrollment: newEnrollment });
//     } catch (error: any) { res.status(500).json({ error: error.message }); }
// };

// export const verifyEnrollment = async (req: Request, res: Response) => {
//     try {
//         const { enrollmentId, action } = req.body; 
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

// export const checkEnrollmentStatus = async (req: any, res: Response) => {
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
// // 4. PARTICIPANT MANAGEMENT
// // ==========================================
// export const getCourseParticipants = async (req: Request, res: Response) => {
//   try {
//     res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
//     const { id } = req.params; 

//     const enrollments = await Enrollment.find({ course: id })
//       .populate('user', 'name email avatarUrl role')
//       .sort({ createdAt: -1 })
//       .lean();

//     if (!enrollments.length) return res.json({ participants: [] });

//     const userIds = enrollments.map((e: any) => e.user?._id);
//     const progressRecords = await Progress.find({ courseId: id, userId: { $in: userIds } }).lean();

//     const course: any = await Course.findById(id).select('modules').lean();
//     let totalLessons = 0;
//     const validLessonIds = new Set<string>();

//     if (course && course.modules) {
//         course.modules.forEach((m: any) => {
//             if (m.isActive) {
//                 m.lessons.forEach((l: any) => { 
//                     if (l.isActive) {
//                         totalLessons++; 
//                         validLessonIds.add(l._id.toString());
//                     }
//                 });
//             }
//         });
//     }

//     const participants = await Promise.all(enrollments.map(async (enroll: any) => {
//         const userObj = enroll.user || {};
//         const detail = progressRecords.find((p: any) => p.userId.toString() === userObj._id?.toString());
        
//         let calculatedProgress = 0;
//         let completedIds: string[] = [];

//         if ((enroll.status === 'active' || enroll.status === 'approved') && detail) {
//             const rawCompleted = detail.completedLessons.map((id: any) => id.toString());
//             completedIds = rawCompleted.filter((id: any) => validLessonIds.has(id));
//             if (totalLessons > 0) calculatedProgress = Math.round((completedIds.length / totalLessons) * 100);
//             if (calculatedProgress > 100) calculatedProgress = 100;
//         }

//         return {
//             _id: enroll._id, 
//             user: { _id: userObj._id, name: userObj.name, email: userObj.email, avatarUrl: userObj.avatarUrl, role: userObj.role },
//             registrationData: enroll.registrationData || {},
//             status: enroll.status || 'pending', 
//             progress: calculatedProgress, 
//             completedLessons: completedIds, 
//             lessonDetails: detail ? detail.lessonDetails : []
//         };
//     }));

//     res.json({ participants });
//   } catch (error: any) { res.status(500).json({ error: error.message }); }
// };

// // ==========================================
// // 5. ADMIN & CHAT
// // ==========================================
// export const markCompleteLessonByAdmin = async (req: Request, res: Response) => {
//     try {
//         const { studentId, lessonId, courseId } = req.body;
//         let progress = await Progress.findOne({ userId: studentId, courseId });
//         if (!progress) progress = new Progress({ userId: studentId, courseId, completedLessons: [] });

//         const strLessonId = lessonId.toString();
//         if (!progress.completedLessons.some((id: any) => id.toString() === strLessonId)) {
//             progress.completedLessons.push(lessonId);
//             await progress.save();
//         }
//         res.json({ message: 'Berhasil diluluskan' });
//     } catch (error: any) { res.status(500).json({ error: error.message }); }
// };

// export const resetQuizByAdmin = async (req: Request, res: Response) => {
//     try {
//         const { studentId, quizId } = req.body; 
//         if (!studentId || !quizId) return res.status(400).json({ error: "Data incomplete" });
//         await Progress.findOneAndUpdate({ userId: studentId }, { $pull: { completedLessons: quizId } });
//         res.json({ message: 'Reset berhasil' });
//     } catch (error: any) { res.status(500).json({ error: error.message }); }
// };

// export const getGroupMessages = async (req: any, res: Response) => {
//     try {
//         const { id } = req.params; 
//         const { type } = req.query; 
//         const query: any = { course: id, type: type || 'public' };
//         const messages = await Message.find(query).populate('sender', 'name avatarUrl role').sort({ createdAt: 1 });
//         res.json(messages);
//     } catch (error: any) { res.status(500).json({ error: error.message }); }
// };

// export const sendGroupMessage = async (req: any, res: Response) => {
//     try {
//         const { id } = req.params; 
//         const { text, type, attachment } = req.body; 
//         const userId = req.user?.id;
//         const newMessage = new Message({
//             course: id, sender: userId, message: text || '', type: type || 'public',
//             isRead: false, isGlobal: false, attachment: attachment || null 
//         });
//         await newMessage.save();
//         await newMessage.populate('sender', 'name avatarUrl role');
//         res.status(201).json(newMessage);
//     } catch (error: any) { res.status(500).json({ error: error.message }); }
// };



import { Request, Response } from 'express';
import { Course } from '../models/Course';
import { Enrollment } from '../models/Enrollment';
import { Progress } from '../models/Progress';
import { Message } from '../models/Message';
import { AuthedRequest } from '../middleware/auth';
import slugify from 'slugify';

const generateSlug = async (title: string) => {
    let slug = slugify(title, { lower: true, strict: true });
    const exists = await Course.findOne({ slug });
    if (exists) slug = `${slug}-${Date.now()}`;
    return slug;
};

// ==========================================
// 1. STANDARD CRUD COURSE
// ==========================================

export const createCourse = async (req: AuthedRequest, res: Response) => {
  try {
    const data = req.body;
    let regionCode = 'national';
    if (req.user?.role === 'ADMIN') {
        if (req.user.regionScope === 'province') regionCode = req.user.managedProvinces?.[0] || 'national';
        if (req.user.regionScope === 'regency') regionCode = req.user.managedRegencies?.[0] || 'national';
    }

    if (!data.slug && data.title) data.slug = await generateSlug(data.title);
    if (!data.status) data.status = 'draft';

    const facilitatorIds = data.facilitatorIds || [req.user?.id];
    const picIds = data.picIds || []; 

    const course = new Course({
        ...data,
        regionCode, 
        facilitatorIds,
        picIds, 
        creatorInfo: {
            id: req.user?.id,
            name: req.user?.name,
            email: req.user?.email,
            role: req.user?.role
        }
    });

    await course.save();
    res.status(201).json(course);
  } catch (error: any) {
    if (error.code === 11000) return res.status(400).json({ error: 'Judul pelatihan sudah ada.' });
    res.status(400).json({ error: error.message });
  }
};

export const getCourses = async (req: any, res: Response) => {
  try {
    const { status, search, type, limit = 50, page = 1, sort = '-createdAt', isPublished } = req.query; 
    
    const scopeFilter = req.filterQuery || {};
    const filter: any = { ...scopeFilter };

    // --- SMART FILTER LOGIC ---
    // Tentukan apakah ini view "Dashboard Management" atau "Katalog Publik"
    // Management View = User meminta status draft/revision/proposed
    const privateStatuses = ['draft', 'revision', 'proposed', 'pending'];
    const requestedStatuses = status ? (status as string).split(',') : [];
    
    const isManagementView = requestedStatuses.some((s: string) => privateStatuses.includes(s));

    // 1. Filter Status
    if (status) {
        filter.status = { $in: requestedStatuses };
    }

    // 2. Filter Creator (Hanya jika Fasilitator sedang di Dashboard Management)
    // Jika di Katalog (isManagementView = false), Fasilitator bisa melihat semua kursus published.
    if (req.user?.role === 'FACILITATOR') {
        if (isManagementView) {
             filter['creatorInfo.id'] = req.user.id; 
        }
    }

    // 3. Filter Search & Type
    if (search) filter.title = { $regex: search, $options: 'i' };
    if (type) filter.programType = type;
    if (isPublished === 'true') filter.isPublished = true;

    const courses = await Course.find(filter)
      .populate('facilitatorIds', 'name email avatarUrl role') 
      .populate('picIds', 'name email avatarUrl role') 
      .populate('creatorInfo', 'name email') 
      .sort(sort as string)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));
      
    const total = await Course.countDocuments(filter);

    res.json({ 
        courses,
        totalPages: Math.ceil(total / Number(limit)),
        currentPage: Number(page)
    }); 
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getCourseById = async (req: Request, res: Response) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('facilitatorIds', 'name email avatarUrl role bio') 
      .populate('picIds', 'name email avatarUrl role') 
      .populate({ path: 'modules', populate: { path: 'lessons' } });

    if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
    res.json({ course }); 
  } catch (error: any) { res.status(500).json({ error: error.message }); }
};

export const updateCourse = async (req: Request, res: Response) => {
  try {
    const updateData = { ...req.body };
    if (updateData.picIds && !Array.isArray(updateData.picIds)) delete updateData.picIds; 
    const course = await Course.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
    res.json(course);
  } catch (error: any) { res.status(400).json({ error: error.message }); }
};

export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
    await Enrollment.deleteMany({ course: req.params.id });
    await Progress.deleteMany({ courseId: req.params.id });
    res.json({ message: 'Kursus berhasil dihapus' });
  } catch (error: any) { res.status(500).json({ error: error.message }); }
};

// ==========================================
// 2. MODULE & LESSON
// ==========================================
export const addModule = async (req: Request, res: Response) => { try { const { id } = req.params; const course = await Course.findById(id); if (!course) return res.status(404).json({ error: 'Course not found' }); course.modules.push(req.body); await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
export const updateModule = async (req: Request, res: Response) => { try { const { courseId, moduleId } = req.params; const cId = courseId || req.params.id; const course = await Course.findById(cId); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.id(moduleId); if (!module) return res.status(404).json({ error: 'Module not found' }); module.set(req.body); await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
export const deleteModule = async (req: Request, res: Response) => { try { const { id, moduleId } = req.params; const course = await Course.findByIdAndUpdate( id, { $pull: { modules: { _id: moduleId } } }, { new: true } ); if (!course) return res.status(404).json({ error: 'Not found' }); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
export const addLesson = async (req: Request, res: Response) => { try { const { courseId, moduleId } = req.params; const course = await Course.findById(courseId); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.id(moduleId); if (!module) return res.status(404).json({ error: 'Module not found' }); module.lessons.push(req.body); await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
export const updateLesson = async (req: Request, res: Response) => { try { const { courseId, moduleId, lessonId } = req.params; const course = await Course.findById(courseId); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.id(moduleId); if (!module) return res.status(404).json({ error: 'Module not found' }); const lesson = module.lessons.id(lessonId); if (!lesson) return res.status(404).json({ error: 'Lesson not found' }); lesson.set(req.body); await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
export const deleteLesson = async (req: Request, res: Response) => { try { const { courseId, moduleId, lessonId } = req.params; const course = await Course.findById(courseId); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.id(moduleId); if (module) { module.lessons.pull({ _id: lessonId }); await course.save(); } res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
export const togglePublishCourse = async (req: Request, res: Response) => { try { const { id } = req.params; const course = await Course.findById(id); if (!course) return res.status(404).json({ error: 'Course not found' }); const newPublishedState = !course.isPublished; const newStatus = newPublishedState ? 'published' : 'draft'; course.isPublished = newPublishedState; course.status = newStatus; await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
export const toggleStatus = togglePublishCourse; 
export const reorderModules = async (req: Request, res: Response) => { try { const { id } = req.params; const { modules } = req.body; await Course.findByIdAndUpdate(id, { modules }); res.json({ message: 'Urutan disimpan' }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
export const updateGradingScheme = async (req: Request, res: Response) => { try { const { id } = req.params; const { modules } = req.body; if (!modules) return res.status(400).json({ error: "Data modul diperlukan" }); const course = await Course.findByIdAndUpdate(id, { modules }, { new: true }); if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' }); res.json({ message: 'Skema penilaian berhasil disimpan', course }); } catch (error: any) { res.status(500).json({ error: error.message }); } };

// ==========================================
// 3. ENROLLMENT & PARTICIPANT
// ==========================================
export const enrollCourse = async (req: any, res: Response) => { try { const { courseId } = req.params; const userId = req.user?.id; const { registrationData } = req.body; if (!userId) return res.status(401).json({ error: 'Unauthorized' }); const course = await Course.findById(courseId); if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' }); const existing = await Enrollment.findOne({ user: userId, course: courseId }); if (existing) return res.status(400).json({ error: 'Anda sudah mendaftar.' }); let initialStatus = 'pending'; let joinedAtDate = undefined; if (course.registrationMode === 'automatic') { initialStatus = 'active'; joinedAtDate = new Date(); } const newEnrollment = new Enrollment({ user: userId, course: courseId, status: initialStatus, progress: 0, isCompleted: false, enrolledAt: new Date(), joinedAt: joinedAtDate, registrationData: registrationData || {} }); await newEnrollment.save(); const msg = course.registrationMode === 'automatic' ? 'Pendaftaran berhasil! Mulai belajar.' : 'Pendaftaran berhasil. Tunggu verifikasi.'; res.status(201).json({ message: msg, enrollment: newEnrollment }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
export const verifyEnrollment = async (req: Request, res: Response) => { try { const { enrollmentId, action } = req.body; if (action === 'reject') { await Enrollment.findByIdAndDelete(enrollmentId); return res.json({ message: "Pendaftaran ditolak." }); } if (action === 'approve') { await Enrollment.findByIdAndUpdate(enrollmentId, { status: 'active', joinedAt: new Date() }); return res.json({ message: "Pendaftaran disetujui." }); } res.status(400).json({ error: "Aksi tidak valid" }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
export const checkEnrollmentStatus = async (req: any, res: Response) => { try { const { courseId } = req.params; const userId = req.user?.id; if (!userId) return res.status(401).json({ error: 'Unauthorized' }); const enrollment = await Enrollment.findOne({ user: userId, course: courseId }); if (!enrollment) return res.json({ isEnrolled: false, status: null }); res.json({ isEnrolled: true, status: enrollment.status, progress: enrollment.progress }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
export const getCourseParticipants = async (req: Request, res: Response) => { try { res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate'); const { id } = req.params; const enrollments = await Enrollment.find({ course: id }).populate('user', 'name email avatarUrl role').sort({ createdAt: -1 }).lean(); if (!enrollments.length) return res.json({ participants: [] }); const userIds = enrollments.map((e: any) => e.user?._id); const progressRecords = await Progress.find({ courseId: id, userId: { $in: userIds } }).lean(); const course: any = await Course.findById(id).select('modules').lean(); let totalLessons = 0; const validLessonIds = new Set<string>(); if (course && course.modules) { course.modules.forEach((m: any) => { if (m.isActive) { m.lessons.forEach((l: any) => { if (l.isActive) { totalLessons++; validLessonIds.add(l._id.toString()); } }); } }); } const participants = await Promise.all(enrollments.map(async (enroll: any) => { const userObj = enroll.user || {}; const detail = progressRecords.find((p: any) => p.userId.toString() === userObj._id?.toString()); let calculatedProgress = 0; let completedIds: string[] = []; if ((enroll.status === 'active' || enroll.status === 'approved') && detail) { const rawCompleted = detail.completedLessons.map((id: any) => id.toString()); completedIds = rawCompleted.filter((id: any) => validLessonIds.has(id)); if (totalLessons > 0) calculatedProgress = Math.round((completedIds.length / totalLessons) * 100); if (calculatedProgress > 100) calculatedProgress = 100; } return { _id: enroll._id, user: { _id: userObj._id, name: userObj.name, email: userObj.email, avatarUrl: userObj.avatarUrl, role: userObj.role }, registrationData: enroll.registrationData || {}, status: enroll.status || 'pending', progress: calculatedProgress, completedLessons: completedIds, lessonDetails: detail ? detail.lessonDetails : [] }; })); res.json({ participants }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
export const markCompleteLessonByAdmin = async (req: Request, res: Response) => { try { const { studentId, lessonId, courseId } = req.body; let progress = await Progress.findOne({ userId: studentId, courseId }); if (!progress) progress = new Progress({ userId: studentId, courseId, completedLessons: [] }); const strLessonId = lessonId.toString(); if (!progress.completedLessons.some((id: any) => id.toString() === strLessonId)) { progress.completedLessons.push(lessonId); await progress.save(); } res.json({ message: 'Berhasil diluluskan' }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
export const resetQuizByAdmin = async (req: Request, res: Response) => { try { const { studentId, quizId } = req.body; if (!studentId || !quizId) return res.status(400).json({ error: "Data incomplete" }); await Progress.findOneAndUpdate({ userId: studentId }, { $pull: { completedLessons: quizId } }); res.json({ message: 'Reset berhasil' }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
export const getGroupMessages = async (req: any, res: Response) => { try { const { id } = req.params; const { type } = req.query; const query: any = { course: id, type: type || 'public' }; const messages = await Message.find(query).populate('sender', 'name avatarUrl role').sort({ createdAt: 1 }); res.json(messages); } catch (error: any) { res.status(500).json({ error: error.message }); } };
export const sendGroupMessage = async (req: any, res: Response) => { try { const { id } = req.params; const { text, type, attachment } = req.body; const userId = req.user?.id; const newMessage = new Message({ course: id, sender: userId, message: text || '', type: type || 'public', isRead: false, isGlobal: false, attachment: attachment || null }); await newMessage.save(); await newMessage.populate('sender', 'name avatarUrl role'); res.status(201).json(newMessage); } catch (error: any) { res.status(500).json({ error: error.message }); } };
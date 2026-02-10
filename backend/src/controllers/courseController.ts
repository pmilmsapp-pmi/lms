// // // // // // import { Request, Response } from 'express';
// // // // // // import { Course } from '../models/Course';
// // // // // // import { Enrollment } from '../models/Enrollment';
// // // // // // import { Progress } from '../models/Progress';
// // // // // // import { Message } from '../models/Message';
// // // // // // import { AuthedRequest } from '../middleware/auth';
// // // // // // import slugify from 'slugify';

// // // // // // const generateSlug = async (title: string) => {
// // // // // //     let slug = slugify(title, { lower: true, strict: true });
// // // // // //     const exists = await Course.findOne({ slug });
// // // // // //     if (exists) slug = `${slug}-${Date.now()}`;
// // // // // //     return slug;
// // // // // // };

// // // // // // // ==========================================
// // // // // // // 1. STANDARD CRUD COURSE
// // // // // // // ==========================================

// // // // // // export const createCourse = async (req: AuthedRequest, res: Response) => {
// // // // // //     try {
// // // // // //         const data = req.body;
// // // // // //         let regionCode = 'national';
// // // // // //         if (req.user?.role === 'ADMIN') {
// // // // // //             if (req.user.regionScope === 'province') regionCode = req.user.managedProvinces?.[0] || 'national';
// // // // // //             if (req.user.regionScope === 'regency') regionCode = req.user.managedRegencies?.[0] || 'national';
// // // // // //         }

// // // // // //         if (!data.slug && data.title) data.slug = await generateSlug(data.title);
// // // // // //         if (!data.status) data.status = 'draft';

// // // // // //         const facilitatorIds = data.facilitatorIds || [req.user?.id];
// // // // // //         const picIds = data.picIds || [];

// // // // // //         const course = new Course({
// // // // // //             ...data,
// // // // // //             regionCode,
// // // // // //             facilitatorIds,
// // // // // //             picIds,
// // // // // //             creatorInfo: {
// // // // // //                 id: req.user?.id,
// // // // // //                 name: req.user?.name,
// // // // // //                 email: req.user?.email,
// // // // // //                 role: req.user?.role
// // // // // //             }
// // // // // //         });

// // // // // //         await course.save();
// // // // // //         res.status(201).json(course);
// // // // // //     } catch (error: any) {
// // // // // //         if (error.code === 11000) return res.status(400).json({ error: 'Judul pelatihan sudah ada.' });
// // // // // //         res.status(400).json({ error: error.message });
// // // // // //     }
// // // // // // };

// // // // // // export const getCourses = async (req: any, res: Response) => {
// // // // // //     try {
// // // // // //         const { status, search, type, limit = 50, page = 1, sort = '-createdAt', isPublished } = req.query;

// // // // // //         const scopeFilter = req.filterQuery || {};
// // // // // //         const filter: any = { ...scopeFilter };

// // // // // //         // --- SMART FILTER LOGIC (FIXED) ---
// // // // // //         // Logika: Jika user meminta isPublished=true (Katalog), maka kita abaikan filter 'creator'
// // // // // //         // Fasilitator harus bisa melihat semua kursus published orang lain di halaman katalog.

// // // // // //         const isCatalogRequest = isPublished === 'true';

// // // // // //         if (isCatalogRequest) {
// // // // // //             // [MODE KATALOG PUBLIK]
// // // // // //             // Paksa filter hanya yang published/ready
// // // // // //             // (Override status query params lain jika ada konflik)
// // // // // //             if (!status) {
// // // // // //                 filter.status = { $in: ['published', 'ready'] };
// // // // // //             }
// // // // // //             filter.isPublished = true;

// // // // // //             // PENTING: Hapus filter kepemilikan. Katalog itu bebas akses lihat.
// // // // // //             delete filter['creatorInfo.id'];
// // // // // //             delete filter.facilitatorIds;
// // // // // //             delete filter.$or;
// // // // // //         } else {
// // // // // //             // [MODE DASHBOARD PENGELOLAAN]
// // // // // //             // Ini dijalankan jika request datang dari Admin Dashboard (tanpa isPublished=true)
// // // // // //             if (status) {
// // // // // //                 filter.status = { $in: (status as string).split(',') };
// // // // // //             }

// // // // // //             // Khusus Fasilitator di Dashboard: Hanya lihat miliknya sendiri
// // // // // //             if (req.user?.role === 'FACILITATOR') {
// // // // // //                 filter.$or = [
// // // // // //                     { 'creatorInfo.id': req.user.id },
// // // // // //                     { facilitatorIds: req.user.id }
// // // // // //                 ];
// // // // // //             }
// // // // // //         }

// // // // // //         // Filter Umum
// // // // // //         if (search) filter.title = { $regex: search, $options: 'i' };
// // // // // //         if (type) filter.programType = type;

// // // // // //         const courses = await Course.find(filter)
// // // // // //             .populate('facilitatorIds', 'name email avatarUrl role')
// // // // // //             .populate('picIds', 'name email avatarUrl role')
// // // // // //             .populate('creatorInfo', 'name email')
// // // // // //             .sort(sort as string)
// // // // // //             .limit(Number(limit))
// // // // // //             .skip((Number(page) - 1) * Number(limit));

// // // // // //         const total = await Course.countDocuments(filter);

// // // // // //         res.json({
// // // // // //             courses,
// // // // // //             totalPages: Math.ceil(total / Number(limit)),
// // // // // //             currentPage: Number(page)
// // // // // //         });
// // // // // //     } catch (error: any) {
// // // // // //         res.status(500).json({ error: error.message });
// // // // // //     }
// // // // // // };

// // // // // // export const getCourseById = async (req: Request, res: Response) => {
// // // // // //     try {
// // // // // //         const course = await Course.findById(req.params.id)
// // // // // //             .populate('facilitatorIds', 'name email avatarUrl role bio')
// // // // // //             .populate('picIds', 'name email avatarUrl role')
// // // // // //             .populate({ path: 'modules', populate: { path: 'lessons' } });

// // // // // //         if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // // // // //         res.json({ course });
// // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // };

// // // // // // export const updateCourse = async (req: Request, res: Response) => {
// // // // // //     try {
// // // // // //         const updateData = { ...req.body };
// // // // // //         if (updateData.picIds && !Array.isArray(updateData.picIds)) delete updateData.picIds;
// // // // // //         const course = await Course.findByIdAndUpdate(req.params.id, updateData, { new: true });
// // // // // //         if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // // // // //         res.json(course);
// // // // // //     } catch (error: any) { res.status(400).json({ error: error.message }); }
// // // // // // };

// // // // // // export const deleteCourse = async (req: Request, res: Response) => {
// // // // // //     try {
// // // // // //         const course = await Course.findByIdAndDelete(req.params.id);
// // // // // //         if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // // // // //         await Enrollment.deleteMany({ course: req.params.id });
// // // // // //         await Progress.deleteMany({ courseId: req.params.id });
// // // // // //         res.json({ message: 'Kursus berhasil dihapus' });
// // // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // // };

// // // // // // // ... (MODULE, LESSON, ENROLLMENT handlers remain unchanged)
// // // // // // export const addModule = async (req: Request, res: Response) => { try { const { id } = req.params; const course = await Course.findById(id); if (!course) return res.status(404).json({ error: 'Course not found' }); course.modules.push(req.body); await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // // // export const updateModule = async (req: Request, res: Response) => { try { const { courseId, moduleId } = req.params; const cId = courseId || req.params.id; const course = await Course.findById(cId); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.id(moduleId); if (!module) return res.status(404).json({ error: 'Module not found' }); module.set(req.body); await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // // // export const deleteModule = async (req: Request, res: Response) => { try { const { id, moduleId } = req.params; const course = await Course.findByIdAndUpdate(id, { $pull: { modules: { _id: moduleId } } }, { new: true }); if (!course) return res.status(404).json({ error: 'Not found' }); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // // // export const addLesson = async (req: Request, res: Response) => { try { const { courseId, moduleId } = req.params; const course = await Course.findById(courseId); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.id(moduleId); if (!module) return res.status(404).json({ error: 'Module not found' }); module.lessons.push(req.body); await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // // // export const updateLesson = async (req: Request, res: Response) => { try { const { courseId, moduleId, lessonId } = req.params; const course = await Course.findById(courseId); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.id(moduleId); if (!module) return res.status(404).json({ error: 'Module not found' }); const lesson = module.lessons.id(lessonId); if (!lesson) return res.status(404).json({ error: 'Lesson not found' }); lesson.set(req.body); await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // // // export const deleteLesson = async (req: Request, res: Response) => { try { const { courseId, moduleId, lessonId } = req.params; const course = await Course.findById(courseId); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.id(moduleId); if (module) { module.lessons.pull({ _id: lessonId }); await course.save(); } res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // // // export const togglePublishCourse = async (req: Request, res: Response) => { try { const { id } = req.params; const course = await Course.findById(id); if (!course) return res.status(404).json({ error: 'Course not found' }); const newPublishedState = !course.isPublished; const newStatus = newPublishedState ? 'published' : 'draft'; course.isPublished = newPublishedState; course.status = newStatus; await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // // // export const toggleStatus = togglePublishCourse;
// // // // // // export const reorderModules = async (req: Request, res: Response) => { try { const { id } = req.params; const { modules } = req.body; await Course.findByIdAndUpdate(id, { modules }); res.json({ message: 'Urutan disimpan' }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // // // export const updateGradingScheme = async (req: Request, res: Response) => { try { const { id } = req.params; const { modules } = req.body; if (!modules) return res.status(400).json({ error: "Data modul diperlukan" }); const course = await Course.findByIdAndUpdate(id, { modules }, { new: true }); if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' }); res.json({ message: 'Skema penilaian berhasil disimpan', course }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // // // export const enrollCourse = async (req: any, res: Response) => { try { const { courseId } = req.params; const userId = req.user?.id; const { registrationData } = req.body; if (!userId) return res.status(401).json({ error: 'Unauthorized' }); const course = await Course.findById(courseId); if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' }); const existing = await Enrollment.findOne({ user: userId, course: courseId }); if (existing) return res.status(400).json({ error: 'Anda sudah mendaftar.' }); let initialStatus = 'pending'; let joinedAtDate = undefined; if (course.registrationMode === 'automatic') { initialStatus = 'active'; joinedAtDate = new Date(); } const newEnrollment = new Enrollment({ user: userId, course: courseId, status: initialStatus, progress: 0, isCompleted: false, enrolledAt: new Date(), joinedAt: joinedAtDate, registrationData: registrationData || {} }); await newEnrollment.save(); const msg = course.registrationMode === 'automatic' ? 'Pendaftaran berhasil! Mulai belajar.' : 'Pendaftaran berhasil. Tunggu verifikasi.'; res.status(201).json({ message: msg, enrollment: newEnrollment }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // // // export const verifyEnrollment = async (req: Request, res: Response) => { try { const { enrollmentId, action } = req.body; if (action === 'reject') { await Enrollment.findByIdAndDelete(enrollmentId); return res.json({ message: "Pendaftaran ditolak." }); } if (action === 'approve') { await Enrollment.findByIdAndUpdate(enrollmentId, { status: 'active', joinedAt: new Date() }); return res.json({ message: "Pendaftaran disetujui." }); } res.status(400).json({ error: "Aksi tidak valid" }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // // // export const checkEnrollmentStatus = async (req: any, res: Response) => { try { const { courseId } = req.params; const userId = req.user?.id; if (!userId) return res.status(401).json({ error: 'Unauthorized' }); const enrollment = await Enrollment.findOne({ user: userId, course: courseId }); if (!enrollment) return res.json({ isEnrolled: false, status: null }); res.json({ isEnrolled: true, status: enrollment.status, progress: enrollment.progress }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // // // export const getCourseParticipants = async (req: Request, res: Response) => { try { res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate'); const { id } = req.params; const enrollments = await Enrollment.find({ course: id }).populate('user', 'name email avatarUrl role').sort({ createdAt: -1 }).lean(); if (!enrollments.length) return res.json({ participants: [] }); const userIds = enrollments.map((e: any) => e.user?._id); const progressRecords = await Progress.find({ courseId: id, userId: { $in: userIds } }).lean(); const course: any = await Course.findById(id).select('modules').lean(); let totalLessons = 0; const validLessonIds = new Set<string>(); if (course && course.modules) { course.modules.forEach((m: any) => { if (m.isActive) { m.lessons.forEach((l: any) => { if (l.isActive) { totalLessons++; validLessonIds.add(l._id.toString()); } }); } }); } const participants = await Promise.all(enrollments.map(async (enroll: any) => { const userObj = enroll.user || {}; const detail = progressRecords.find((p: any) => p.userId.toString() === userObj._id?.toString()); let calculatedProgress = 0; let completedIds: string[] = []; if ((enroll.status === 'active' || enroll.status === 'approved') && detail) { const rawCompleted = detail.completedLessons.map((id: any) => id.toString()); completedIds = rawCompleted.filter((id: any) => validLessonIds.has(id)); if (totalLessons > 0) calculatedProgress = Math.round((completedIds.length / totalLessons) * 100); if (calculatedProgress > 100) calculatedProgress = 100; } return { _id: enroll._id, user: { _id: userObj._id, name: userObj.name, email: userObj.email, avatarUrl: userObj.avatarUrl, role: userObj.role }, registrationData: enroll.registrationData || {}, status: enroll.status || 'pending', progress: calculatedProgress, completedLessons: completedIds, lessonDetails: detail ? detail.lessonDetails : [] }; })); res.json({ participants }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // // // export const markCompleteLessonByAdmin = async (req: Request, res: Response) => { try { const { studentId, lessonId, courseId } = req.body; let progress = await Progress.findOne({ userId: studentId, courseId }); if (!progress) progress = new Progress({ userId: studentId, courseId, completedLessons: [] }); const strLessonId = lessonId.toString(); if (!progress.completedLessons.some((id: any) => id.toString() === strLessonId)) { progress.completedLessons.push(lessonId); await progress.save(); } res.json({ message: 'Berhasil diluluskan' }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // // // export const resetQuizByAdmin = async (req: Request, res: Response) => { try { const { studentId, quizId } = req.body; if (!studentId || !quizId) return res.status(400).json({ error: "Data incomplete" }); await Progress.findOneAndUpdate({ userId: studentId }, { $pull: { completedLessons: quizId } }); res.json({ message: 'Reset berhasil' }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // // // export const getGroupMessages = async (req: any, res: Response) => { try { const { id } = req.params; const { type } = req.query; const query: any = { course: id, type: type || 'public' }; const messages = await Message.find(query).populate('sender', 'name avatarUrl role').sort({ createdAt: 1 }); res.json(messages); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // // // export const sendGroupMessage = async (req: any, res: Response) => { try { const { id } = req.params; const { text, type, attachment } = req.body; const userId = req.user?.id; const newMessage = new Message({ course: id, sender: userId, message: text || '', type: type || 'public', isRead: false, isGlobal: false, attachment: attachment || null }); await newMessage.save(); await newMessage.populate('sender', 'name avatarUrl role'); res.status(201).json(newMessage); } catch (error: any) { res.status(500).json({ error: error.message }); } };





// // // // // import { Request, Response } from 'express';
// // // // // import { Course } from '../models/Course';
// // // // // import { Enrollment } from '../models/Enrollment';
// // // // // import { Progress } from '../models/Progress';
// // // // // import { Message } from '../models/Message';
// // // // // import { AuthedRequest } from '../middleware/auth';
// // // // // import slugify from 'slugify';

// // // // // const generateSlug = async (title: string) => {
// // // // //     let slug = slugify(title, { lower: true, strict: true });
// // // // //     const exists = await Course.findOne({ slug });
// // // // //     if (exists) slug = `${slug}-${Date.now()}`;
// // // // //     return slug;
// // // // // };

// // // // // // ==========================================
// // // // // // 1. STANDARD CRUD COURSE
// // // // // // ==========================================

// // // // // export const createCourse = async (req: AuthedRequest, res: Response) => {
// // // // //     try {
// // // // //         const data = req.body;
// // // // //         let regionCode = 'national';
// // // // //         if (req.user?.role === 'ADMIN') {
// // // // //             if (req.user.regionScope === 'province') regionCode = req.user.managedProvinces?.[0] || 'national';
// // // // //             if (req.user.regionScope === 'regency') regionCode = req.user.managedRegencies?.[0] || 'national';
// // // // //         }

// // // // //         if (!data.slug && data.title) data.slug = await generateSlug(data.title);
// // // // //         if (!data.status) data.status = 'draft';

// // // // //         const facilitatorIds = data.facilitatorIds || [req.user?.id];
// // // // //         const picIds = data.picIds || [];

// // // // //         const course = new Course({
// // // // //             ...data,
// // // // //             regionCode,
// // // // //             facilitatorIds,
// // // // //             picIds,
// // // // //             creatorInfo: {
// // // // //                 id: req.user?.id,
// // // // //                 name: req.user?.name,
// // // // //                 email: req.user?.email,
// // // // //                 role: req.user?.role
// // // // //             }
// // // // //         });

// // // // //         await course.save();
// // // // //         res.status(201).json(course);
// // // // //     } catch (error: any) {
// // // // //         if (error.code === 11000) return res.status(400).json({ error: 'Judul pelatihan sudah ada.' });
// // // // //         res.status(400).json({ error: error.message });
// // // // //     }
// // // // // };

// // // // // export const getCourses = async (req: any, res: Response) => {
// // // // //     try {
// // // // //         const { status, search, type, limit = 50, page = 1, sort = '-createdAt', isPublished } = req.query;

// // // // //         const scopeFilter = req.filterQuery || {};
// // // // //         const filter: any = { ...scopeFilter };

// // // // //         // --- SMART FILTER LOGIC (FIXED) ---
// // // // //         const isCatalogRequest = isPublished === 'true';

// // // // //         if (isCatalogRequest) {
// // // // //             // [MODE KATALOG PUBLIK]
// // // // //             if (!status) {
// // // // //                 filter.status = { $in: ['published', 'ready'] };
// // // // //             }
// // // // //             filter.isPublished = true;

// // // // //             delete filter['creatorInfo.id'];
// // // // //             delete filter.facilitatorIds;
// // // // //             delete filter.$or;
// // // // //         } else {
// // // // //             // [MODE DASHBOARD PENGELOLAAN]
// // // // //             if (status) {
// // // // //                 filter.status = { $in: (status as string).split(',') };
// // // // //             }

// // // // //             // Khusus Fasilitator di Dashboard: Hanya lihat miliknya sendiri
// // // // //             if (req.user?.role === 'FACILITATOR') {
// // // // //                 filter.$or = [
// // // // //                     { 'creatorInfo.id': req.user.id },
// // // // //                     { facilitatorIds: req.user.id }
// // // // //                 ];
// // // // //             }
// // // // //         }

// // // // //         // Filter Umum
// // // // //         if (search) filter.title = { $regex: search, $options: 'i' };
// // // // //         if (type) filter.programType = type;

// // // // //         const courses = await Course.find(filter)
// // // // //             .populate('facilitatorIds', 'name email avatarUrl role')
// // // // //             .populate('picIds', 'name email avatarUrl role')
// // // // //             .populate('creatorInfo', 'name email')
// // // // //             .sort(sort as string)
// // // // //             .limit(Number(limit))
// // // // //             .skip((Number(page) - 1) * Number(limit));

// // // // //         const total = await Course.countDocuments(filter);

// // // // //         res.json({
// // // // //             courses,
// // // // //             totalPages: Math.ceil(total / Number(limit)),
// // // // //             currentPage: Number(page)
// // // // //         });
// // // // //     } catch (error: any) {
// // // // //         res.status(500).json({ error: error.message });
// // // // //     }
// // // // // };

// // // // // export const getCourseById = async (req: Request, res: Response) => {
// // // // //     try {
// // // // //         const course = await Course.findById(req.params.id)
// // // // //             .populate('facilitatorIds', 'name email avatarUrl role bio')
// // // // //             .populate('picIds', 'name email avatarUrl role')
// // // // //             .populate({ path: 'modules', populate: { path: 'lessons' } });

// // // // //         if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // // // //         res.json({ course });
// // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // };

// // // // // export const updateCourse = async (req: Request, res: Response) => {
// // // // //     try {
// // // // //         const updateData = { ...req.body };
// // // // //         if (updateData.picIds && !Array.isArray(updateData.picIds)) delete updateData.picIds;
// // // // //         const course = await Course.findByIdAndUpdate(req.params.id, updateData, { new: true });
// // // // //         if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // // // //         res.json(course);
// // // // //     } catch (error: any) { res.status(400).json({ error: error.message }); }
// // // // // };

// // // // // export const deleteCourse = async (req: Request, res: Response) => {
// // // // //     try {
// // // // //         const course = await Course.findByIdAndDelete(req.params.id);
// // // // //         if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // // // //         await Enrollment.deleteMany({ course: req.params.id });
// // // // //         await Progress.deleteMany({ courseId: req.params.id });
// // // // //         res.json({ message: 'Kursus berhasil dihapus' });
// // // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // // };

// // // // // // ... (MODULE, LESSON, ENROLLMENT handlers remain unchanged)
// // // // // export const addModule = async (req: Request, res: Response) => { try { const { id } = req.params; const course = await Course.findById(id); if (!course) return res.status(404).json({ error: 'Course not found' }); course.modules.push(req.body); await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // // export const updateModule = async (req: Request, res: Response) => { try { const { courseId, moduleId } = req.params; const cId = courseId || req.params.id; const course = await Course.findById(cId); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.id(moduleId); if (!module) return res.status(404).json({ error: 'Module not found' }); module.set(req.body); await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // // export const deleteModule = async (req: Request, res: Response) => { try { const { id, moduleId } = req.params; const course = await Course.findByIdAndUpdate( id, { $pull: { modules: { _id: moduleId } } }, { new: true } ); if (!course) return res.status(404).json({ error: 'Not found' }); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // // export const addLesson = async (req: Request, res: Response) => { try { const { courseId, moduleId } = req.params; const course = await Course.findById(courseId); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.id(moduleId); if (!module) return res.status(404).json({ error: 'Module not found' }); module.lessons.push(req.body); await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // // export const updateLesson = async (req: Request, res: Response) => { try { const { courseId, moduleId, lessonId } = req.params; const course = await Course.findById(courseId); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.id(moduleId); if (!module) return res.status(404).json({ error: 'Module not found' }); const lesson = module.lessons.id(lessonId); if (!lesson) return res.status(404).json({ error: 'Lesson not found' }); lesson.set(req.body); await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // // export const deleteLesson = async (req: Request, res: Response) => { try { const { courseId, moduleId, lessonId } = req.params; const course = await Course.findById(courseId); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.id(moduleId); if (module) { module.lessons.pull({ _id: lessonId }); await course.save(); } res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // // export const togglePublishCourse = async (req: Request, res: Response) => { try { const { id } = req.params; const course = await Course.findById(id); if (!course) return res.status(404).json({ error: 'Course not found' }); const newPublishedState = !course.isPublished; const newStatus = newPublishedState ? 'published' : 'draft'; course.isPublished = newPublishedState; course.status = newStatus; await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // // export const toggleStatus = togglePublishCourse;
// // // // // export const reorderModules = async (req: Request, res: Response) => { try { const { id } = req.params; const { modules } = req.body; await Course.findByIdAndUpdate(id, { modules }); res.json({ message: 'Urutan disimpan' }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // // export const updateGradingScheme = async (req: Request, res: Response) => { try { const { id } = req.params; const { modules } = req.body; if (!modules) return res.status(400).json({ error: "Data modul diperlukan" }); const course = await Course.findByIdAndUpdate(id, { modules }, { new: true }); if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' }); res.json({ message: 'Skema penilaian berhasil disimpan', course }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // // export const enrollCourse = async (req: any, res: Response) => { try { const { courseId } = req.params; const userId = req.user?.id; const { registrationData } = req.body; if (!userId) return res.status(401).json({ error: 'Unauthorized' }); const course = await Course.findById(courseId); if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' }); const existing = await Enrollment.findOne({ user: userId, course: courseId }); if (existing) return res.status(400).json({ error: 'Anda sudah mendaftar.' }); let initialStatus = 'pending'; let joinedAtDate = undefined; if (course.registrationMode === 'automatic') { initialStatus = 'active'; joinedAtDate = new Date(); } const newEnrollment = new Enrollment({ user: userId, course: courseId, status: initialStatus, progress: 0, isCompleted: false, enrolledAt: new Date(), joinedAt: joinedAtDate, registrationData: registrationData || {} }); await newEnrollment.save(); const msg = course.registrationMode === 'automatic' ? 'Pendaftaran berhasil! Mulai belajar.' : 'Pendaftaran berhasil. Tunggu verifikasi.'; res.status(201).json({ message: msg, enrollment: newEnrollment }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // // export const verifyEnrollment = async (req: Request, res: Response) => { try { const { enrollmentId, action } = req.body; if (action === 'reject') { await Enrollment.findByIdAndDelete(enrollmentId); return res.json({ message: "Pendaftaran ditolak." }); } if (action === 'approve') { await Enrollment.findByIdAndUpdate(enrollmentId, { status: 'active', joinedAt: new Date() }); return res.json({ message: "Pendaftaran disetujui." }); } res.status(400).json({ error: "Aksi tidak valid" }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // // export const checkEnrollmentStatus = async (req: any, res: Response) => { try { const { courseId } = req.params; const userId = req.user?.id; if (!userId) return res.status(401).json({ error: 'Unauthorized' }); const enrollment = await Enrollment.findOne({ user: userId, course: courseId }); if (!enrollment) return res.json({ isEnrolled: false, status: null }); res.json({ isEnrolled: true, status: enrollment.status, progress: enrollment.progress }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // // export const getCourseParticipants = async (req: Request, res: Response) => { try { res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate'); const { id } = req.params; const enrollments = await Enrollment.find({ course: id }).populate('user', 'name email avatarUrl role').sort({ createdAt: -1 }).lean(); if (!enrollments.length) return res.json({ participants: [] }); const userIds = enrollments.map((e: any) => e.user?._id); const progressRecords = await Progress.find({ courseId: id, userId: { $in: userIds } }).lean(); const course: any = await Course.findById(id).select('modules').lean(); let totalLessons = 0; const validLessonIds = new Set<string>(); if (course && course.modules) { course.modules.forEach((m: any) => { if (m.isActive) { m.lessons.forEach((l: any) => { if (l.isActive) { totalLessons++; validLessonIds.add(l._id.toString()); } }); } }); } const participants = await Promise.all(enrollments.map(async (enroll: any) => { const userObj = enroll.user || {}; const detail = progressRecords.find((p: any) => p.userId.toString() === userObj._id?.toString()); let calculatedProgress = 0; let completedIds: string[] = []; if ((enroll.status === 'active' || enroll.status === 'approved') && detail) { const rawCompleted = detail.completedLessons.map((id: any) => id.toString()); completedIds = rawCompleted.filter((id: any) => validLessonIds.has(id)); if (totalLessons > 0) calculatedProgress = Math.round((completedIds.length / totalLessons) * 100); if (calculatedProgress > 100) calculatedProgress = 100; } return { _id: enroll._id, user: { _id: userObj._id, name: userObj.name, email: userObj.email, avatarUrl: userObj.avatarUrl, role: userObj.role }, registrationData: enroll.registrationData || {}, status: enroll.status || 'pending', progress: calculatedProgress, completedLessons: completedIds, lessonDetails: detail ? detail.lessonDetails : [] }; })); res.json({ participants }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // // export const markCompleteLessonByAdmin = async (req: Request, res: Response) => { try { const { studentId, lessonId, courseId } = req.body; let progress = await Progress.findOne({ userId: studentId, courseId }); if (!progress) progress = new Progress({ userId: studentId, courseId, completedLessons: [] }); const strLessonId = lessonId.toString(); if (!progress.completedLessons.some((id: any) => id.toString() === strLessonId)) { progress.completedLessons.push(lessonId); await progress.save(); } res.json({ message: 'Berhasil diluluskan' }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // // export const resetQuizByAdmin = async (req: Request, res: Response) => { try { const { studentId, quizId } = req.body; if (!studentId || !quizId) return res.status(400).json({ error: "Data incomplete" }); await Progress.findOneAndUpdate({ userId: studentId }, { $pull: { completedLessons: quizId } }); res.json({ message: 'Reset berhasil' }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // // export const getGroupMessages = async (req: any, res: Response) => { try { const { id } = req.params; const { type } = req.query; const query: any = { course: id, type: type || 'public' }; const messages = await Message.find(query).populate('sender', 'name avatarUrl role').sort({ createdAt: 1 }); res.json(messages); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // // export const sendGroupMessage = async (req: any, res: Response) => { try { const { id } = req.params; const { text, type, attachment } = req.body; const userId = req.user?.id; const newMessage = new Message({ course: id, sender: userId, message: text || '', type: type || 'public', isRead: false, isGlobal: false, attachment: attachment || null }); await newMessage.save(); await newMessage.populate('sender', 'name avatarUrl role'); res.status(201).json(newMessage); } catch (error: any) { res.status(500).json({ error: error.message }); } };






// // // // import { Request, Response } from 'express';
// // // // import { Course } from '../models/Course';
// // // // import { Enrollment } from '../models/Enrollment';
// // // // import { Progress } from '../models/Progress';
// // // // import { Message } from '../models/Message';
// // // // import { AuthedRequest } from '../middleware/auth';
// // // // import slugify from 'slugify';

// // // // const generateSlug = async (title: string) => {
// // // //     let slug = slugify(title, { lower: true, strict: true });
// // // //     const exists = await Course.findOne({ slug });
// // // //     if (exists) slug = `${slug}-${Date.now()}`;
// // // //     return slug;
// // // // };

// // // // // ==========================================
// // // // // 1. STANDARD CRUD COURSE
// // // // // ==========================================

// // // // export const createCourse = async (req: AuthedRequest, res: Response) => {
// // // //     try {
// // // //         const data = req.body;
// // // //         let regionCode = 'national';
// // // //         if (req.user?.role === 'ADMIN') {
// // // //             if (req.user.regionScope === 'province') regionCode = req.user.managedProvinces?.[0] || 'national';
// // // //             if (req.user.regionScope === 'regency') regionCode = req.user.managedRegencies?.[0] || 'national';
// // // //         }

// // // //         if (!data.slug && data.title) data.slug = await generateSlug(data.title);
// // // //         if (!data.status) data.status = 'draft';

// // // //         const facilitatorIds = data.facilitatorIds || [req.user?.id];
// // // //         const picIds = data.picIds || [];

// // // //         const course = new Course({
// // // //             ...data,
// // // //             regionCode,
// // // //             facilitatorIds,
// // // //             picIds,
// // // //             creatorInfo: {
// // // //                 id: req.user?.id,
// // // //                 name: req.user?.name,
// // // //                 email: req.user?.email,
// // // //                 role: req.user?.role
// // // //             }
// // // //         });

// // // //         await course.save();
// // // //         res.status(201).json(course);
// // // //     } catch (error: any) {
// // // //         if (error.code === 11000) return res.status(400).json({ error: 'Judul pelatihan sudah ada.' });
// // // //         res.status(400).json({ error: error.message });
// // // //     }
// // // // };

// // // // export const getCourses = async (req: any, res: Response) => {
// // // //     try {
// // // //         const { status, search, type, limit = 50, page = 1, sort = '-createdAt', isPublished } = req.query;

// // // //         const scopeFilter = req.filterQuery || {};
// // // //         const filter: any = { ...scopeFilter };

// // // //         // --- SMART FILTER LOGIC (FIXED) ---
// // // //         const isCatalogRequest = isPublished === 'true';

// // // //         if (isCatalogRequest) {
// // // //             // [MODE KATALOG PUBLIK]
// // // //             if (!status) {
// // // //                 filter.status = { $in: ['published', 'ready'] };
// // // //             }
// // // //             filter.isPublished = true;

// // // //             delete filter['creatorInfo.id'];
// // // //             delete filter.facilitatorIds;
// // // //             delete filter.$or;
// // // //         } else {
// // // //             // [MODE DASHBOARD PENGELOLAAN]
// // // //             if (status) {
// // // //                 filter.status = { $in: (status as string).split(',') };
// // // //             }

// // // //             // Khusus Fasilitator di Dashboard: Hanya lihat miliknya sendiri
// // // //             if (req.user?.role === 'FACILITATOR') {
// // // //                 filter.$or = [
// // // //                     { 'creatorInfo.id': req.user.id },
// // // //                     { facilitatorIds: req.user.id }
// // // //                 ];
// // // //             }
// // // //         }

// // // //         // Filter Umum
// // // //         if (search) filter.title = { $regex: search, $options: 'i' };
// // // //         if (type) filter.programType = type;

// // // //         const courses = await Course.find(filter)
// // // //             .populate('facilitatorIds', 'name email avatarUrl role')
// // // //             .populate('picIds', 'name email avatarUrl role')
// // // //             .populate('creatorInfo', 'name email')
// // // //             .sort(sort as string)
// // // //             .limit(Number(limit))
// // // //             .skip((Number(page) - 1) * Number(limit));

// // // //         const total = await Course.countDocuments(filter);

// // // //         res.json({
// // // //             courses,
// // // //             totalPages: Math.ceil(total / Number(limit)),
// // // //             currentPage: Number(page)
// // // //         });
// // // //     } catch (error: any) {
// // // //         res.status(500).json({ error: error.message });
// // // //     }
// // // // };

// // // // export const getCourseById = async (req: Request, res: Response) => {
// // // //     try {
// // // //         const course = await Course.findById(req.params.id)
// // // //             .populate('facilitatorIds', 'name email avatarUrl role bio')
// // // //             .populate('picIds', 'name email avatarUrl role')
// // // //             .populate({ path: 'modules', populate: { path: 'lessons' } });

// // // //         if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // // //         res.json({ course });
// // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // };

// // // // export const updateCourse = async (req: Request, res: Response) => {
// // // //     try {
// // // //         const updateData = { ...req.body };
// // // //         if (updateData.picIds && !Array.isArray(updateData.picIds)) delete updateData.picIds;
// // // //         const course = await Course.findByIdAndUpdate(req.params.id, updateData, { new: true });
// // // //         if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // // //         res.json(course);
// // // //     } catch (error: any) { res.status(400).json({ error: error.message }); }
// // // // };

// // // // export const deleteCourse = async (req: Request, res: Response) => {
// // // //     try {
// // // //         const course = await Course.findByIdAndDelete(req.params.id);
// // // //         if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // // //         await Enrollment.deleteMany({ course: req.params.id });
// // // //         await Progress.deleteMany({ courseId: req.params.id });
// // // //         res.json({ message: 'Kursus berhasil dihapus' });
// // // //     } catch (error: any) { res.status(500).json({ error: error.message }); }
// // // // };

// // // // // ... (MODULE, LESSON, ENROLLMENT handlers remain unchanged)
// // // // export const addModule = async (req: Request, res: Response) => { try { const { id } = req.params; const course = await Course.findById(id); if (!course) return res.status(404).json({ error: 'Course not found' }); course.modules.push(req.body); await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // export const updateModule = async (req: Request, res: Response) => { try { const { courseId, moduleId } = req.params; const cId = courseId || req.params.id; const course = await Course.findById(cId); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.id(moduleId); if (!module) return res.status(404).json({ error: 'Module not found' }); module.set(req.body); await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // export const deleteModule = async (req: Request, res: Response) => { try { const { id, moduleId } = req.params; const course = await Course.findByIdAndUpdate( id, { $pull: { modules: { _id: moduleId } } }, { new: true } ); if (!course) return res.status(404).json({ error: 'Not found' }); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // export const addLesson = async (req: Request, res: Response) => { try { const { courseId, moduleId } = req.params; const course = await Course.findById(courseId); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.id(moduleId); if (!module) return res.status(404).json({ error: 'Module not found' }); module.lessons.push(req.body); await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // export const updateLesson = async (req: Request, res: Response) => { try { const { courseId, moduleId, lessonId } = req.params; const course = await Course.findById(courseId); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.id(moduleId); if (!module) return res.status(404).json({ error: 'Module not found' }); const lesson = module.lessons.id(lessonId); if (!lesson) return res.status(404).json({ error: 'Lesson not found' }); lesson.set(req.body); await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // export const deleteLesson = async (req: Request, res: Response) => { try { const { courseId, moduleId, lessonId } = req.params; const course = await Course.findById(courseId); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.id(moduleId); if (module) { module.lessons.pull({ _id: lessonId }); await course.save(); } res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // export const togglePublishCourse = async (req: Request, res: Response) => { try { const { id } = req.params; const course = await Course.findById(id); if (!course) return res.status(404).json({ error: 'Course not found' }); const newPublishedState = !course.isPublished; const newStatus = newPublishedState ? 'published' : 'draft'; course.isPublished = newPublishedState; course.status = newStatus; await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // export const toggleStatus = togglePublishCourse;
// // // // export const reorderModules = async (req: Request, res: Response) => { try { const { id } = req.params; const { modules } = req.body; await Course.findByIdAndUpdate(id, { modules }); res.json({ message: 'Urutan disimpan' }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // export const updateGradingScheme = async (req: Request, res: Response) => { try { const { id } = req.params; const { modules } = req.body; if (!modules) return res.status(400).json({ error: "Data modul diperlukan" }); const course = await Course.findByIdAndUpdate(id, { modules }, { new: true }); if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' }); res.json({ message: 'Skema penilaian berhasil disimpan', course }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // export const enrollCourse = async (req: any, res: Response) => { try { const { courseId } = req.params; const userId = req.user?.id; const { registrationData } = req.body; if (!userId) return res.status(401).json({ error: 'Unauthorized' }); const course = await Course.findById(courseId); if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' }); const existing = await Enrollment.findOne({ user: userId, course: courseId }); if (existing) return res.status(400).json({ error: 'Anda sudah mendaftar.' }); let initialStatus = 'pending'; let joinedAtDate = undefined; if (course.registrationMode === 'automatic') { initialStatus = 'active'; joinedAtDate = new Date(); } const newEnrollment = new Enrollment({ user: userId, course: courseId, status: initialStatus, progress: 0, isCompleted: false, enrolledAt: new Date(), joinedAt: joinedAtDate, registrationData: registrationData || {} }); await newEnrollment.save(); const msg = course.registrationMode === 'automatic' ? 'Pendaftaran berhasil! Mulai belajar.' : 'Pendaftaran berhasil. Tunggu verifikasi.'; res.status(201).json({ message: msg, enrollment: newEnrollment }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // export const verifyEnrollment = async (req: Request, res: Response) => { try { const { enrollmentId, action } = req.body; if (action === 'reject') { await Enrollment.findByIdAndDelete(enrollmentId); return res.json({ message: "Pendaftaran ditolak." }); } if (action === 'approve') { await Enrollment.findByIdAndUpdate(enrollmentId, { status: 'active', joinedAt: new Date() }); return res.json({ message: "Pendaftaran disetujui." }); } res.status(400).json({ error: "Aksi tidak valid" }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // export const checkEnrollmentStatus = async (req: any, res: Response) => { try { const { courseId } = req.params; const userId = req.user?.id; if (!userId) return res.status(401).json({ error: 'Unauthorized' }); const enrollment = await Enrollment.findOne({ user: userId, course: courseId }); if (!enrollment) return res.json({ isEnrolled: false, status: null }); res.json({ isEnrolled: true, status: enrollment.status, progress: enrollment.progress }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // export const getCourseParticipants = async (req: Request, res: Response) => { try { res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate'); const { id } = req.params; const enrollments = await Enrollment.find({ course: id }).populate('user', 'name email avatarUrl role').sort({ createdAt: -1 }).lean(); if (!enrollments.length) return res.json({ participants: [] }); const userIds = enrollments.map((e: any) => e.user?._id); const progressRecords = await Progress.find({ courseId: id, userId: { $in: userIds } }).lean(); const course: any = await Course.findById(id).select('modules').lean(); let totalLessons = 0; const validLessonIds = new Set<string>(); if (course && course.modules) { course.modules.forEach((m: any) => { if (m.isActive) { m.lessons.forEach((l: any) => { if (l.isActive) { totalLessons++; validLessonIds.add(l._id.toString()); } }); } }); } const participants = await Promise.all(enrollments.map(async (enroll: any) => { const userObj = enroll.user || {}; const detail = progressRecords.find((p: any) => p.userId.toString() === userObj._id?.toString()); let calculatedProgress = 0; let completedIds: string[] = []; if ((enroll.status === 'active' || enroll.status === 'approved') && detail) { const rawCompleted = detail.completedLessons.map((id: any) => id.toString()); completedIds = rawCompleted.filter((id: any) => validLessonIds.has(id)); if (totalLessons > 0) calculatedProgress = Math.round((completedIds.length / totalLessons) * 100); if (calculatedProgress > 100) calculatedProgress = 100; } return { _id: enroll._id, user: { _id: userObj._id, name: userObj.name, email: userObj.email, avatarUrl: userObj.avatarUrl, role: userObj.role }, registrationData: enroll.registrationData || {}, status: enroll.status || 'pending', progress: calculatedProgress, completedLessons: completedIds, lessonDetails: detail ? detail.lessonDetails : [] }; })); res.json({ participants }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // export const markCompleteLessonByAdmin = async (req: Request, res: Response) => { try { const { studentId, lessonId, courseId } = req.body; let progress = await Progress.findOne({ userId: studentId, courseId }); if (!progress) progress = new Progress({ userId: studentId, courseId, completedLessons: [] }); const strLessonId = lessonId.toString(); if (!progress.completedLessons.some((id: any) => id.toString() === strLessonId)) { progress.completedLessons.push(lessonId); await progress.save(); } res.json({ message: 'Berhasil diluluskan' }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // export const resetQuizByAdmin = async (req: Request, res: Response) => { try { const { studentId, quizId } = req.body; if (!studentId || !quizId) return res.status(400).json({ error: "Data incomplete" }); await Progress.findOneAndUpdate({ userId: studentId }, { $pull: { completedLessons: quizId } }); res.json({ message: 'Reset berhasil' }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // export const getGroupMessages = async (req: any, res: Response) => { try { const { id } = req.params; const { type } = req.query; const query: any = { course: id, type: type || 'public' }; const messages = await Message.find(query).populate('sender', 'name avatarUrl role').sort({ createdAt: 1 }); res.json(messages); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // // export const sendGroupMessage = async (req: any, res: Response) => { try { const { id } = req.params; const { text, type, attachment } = req.body; const userId = req.user?.id; const newMessage = new Message({ course: id, sender: userId, message: text || '', type: type || 'public', isRead: false, isGlobal: false, attachment: attachment || null }); await newMessage.save(); await newMessage.populate('sender', 'name avatarUrl role'); res.status(201).json(newMessage); } catch (error: any) { res.status(500).json({ error: error.message }); } };



// // // import { Request, Response } from 'express';
// // // import { Course } from '../models/Course';
// // // import { Enrollment } from '../models/Enrollment';
// // // import { Progress } from '../models/Progress';
// // // import { Message } from '../models/Message';
// // // import { User } from '../models/User'; 
// // // import { AuthedRequest } from '../middleware/auth';
// // // import slugify from 'slugify';

// // // const generateSlug = async (title: string) => {
// // //     let slug = slugify(title, { lower: true, strict: true });
// // //     const exists = await Course.findOne({ slug });
// // //     if (exists) slug = `${slug}-${Date.now()}`;
// // //     return slug;
// // // };

// // // // ==========================================
// // // // 1. CREATE COURSE (LOGIKA WILAYAH CERDAS)
// // // // ==========================================
// // // export const createCourse = async (req: AuthedRequest, res: Response) => {
// // //     try {
// // //         const data = req.body;
        
// // //         // [FIX LOGIKA REGION]
// // //         // Default ke 'national' HANYA JIKA tidak ada input dari frontend
// // //         let regionCode = data.regionCode || 'national'; 

// // //         // Override Keamanan untuk Admin:
// // //         // Jika Admin Jatim iseng kirim regionCode "Jawa Barat", kita paksa balik ke "Jawa Timur"
// // //         if (req.user?.role === 'ADMIN') {
// // //             const userScope = (req.user.regionScope || 'national').toLowerCase();
            
// // //             if (userScope === 'province') {
// // //                 // Ambil provinsi pertama yang dia kelola
// // //                 regionCode = req.user.managedProvinces?.[0] || regionCode;
// // //             } else if (userScope === 'regency') {
// // //                 regionCode = req.user.managedRegencies?.[0] || regionCode;
// // //             }
// // //         }

// // //         // Generate Slug & Default Status
// // //         if (!data.slug && data.title) data.slug = await generateSlug(data.title);
// // //         if (!data.status) data.status = 'draft';
// // //         if (!data.programType) data.programType = 'course'; 

// // //         const facilitatorIds = data.facilitatorIds || [req.user?.id];
// // //         const picIds = data.picIds || [];

// // //         const course = new Course({
// // //             ...data,
// // //             regionCode, // <-- Sekarang akan mengikuti input frontend (Jatim/DKI) atau scope admin
// // //             facilitatorIds,
// // //             picIds,
// // //             // instructor: req.user?.id, // HAPUS INI (Penyebab Error 500 StrictPopulate)
// // //             creatorInfo: {
// // //                 id: req.user?.id,
// // //                 name: req.user?.name,
// // //                 email: req.user?.email,
// // //                 role: req.user?.role
// // //             }
// // //         });

// // //         await course.save();
// // //         res.status(201).json(course);
// // //     } catch (error: any) {
// // //         if (error.code === 11000) return res.status(400).json({ error: 'Judul pelatihan sudah ada.' });
// // //         res.status(400).json({ error: error.message });
// // //     }
// // // };

// // // // ==========================================
// // // // 2. GET COURSES (SAFE MODE - PASTI MUNCUL)
// // // // ==========================================
// // // export const getCourses = async (req: any, res: Response) => {
// // //     try {
// // //         const { status, search, type, limit = 50, page = 1, sort = '-createdAt', isPublished } = req.query;

// // //         // [INIT] Filter Kosong
// // //         const filter: any = {}; 
// // //         const isCatalogRequest = isPublished === 'true';

// // //         // --- A. MODE KATALOG PUBLIK ---
// // //         if (isCatalogRequest) {
// // //             filter.isPublished = true;
// // //             if (!status) {
// // //                 filter.status = { $in: ['published', 'ready'] };
// // //             } else {
// // //                 const sArr = (status as string).split(',').map(s => s.trim());
// // //                 filter.status = { $in: sArr };
// // //             }
// // //         } 
        
// // //         // --- B. MODE DASHBOARD ADMIN / FASILITATOR ---
// // //         else {
// // //             // 1. Filter Tipe (Gabungkan Training & Course)
// // //             if (type) {
// // //                 if (type === 'training' || type === 'course') {
// // //                     filter.programType = { $in: ['training', 'course'] };
// // //                 } else {
// // //                     filter.programType = type;
// // //                 }
// // //             }

// // //             // 2. Filter Status
// // //             if (status && status !== 'ALL') {
// // //                 const sArr = (status as string).split(',').map(s => s.trim());
// // //                 filter.status = { $in: sArr };
// // //             }

// // //             // 3. Hak Akses (GLOBAL VIEW untuk Admin)
// // //             const currentUser = req.user;
            
// // //             // Fasilitator: Hanya lihat miliknya
// // //             if (currentUser?.role === 'FACILITATOR') {
// // //                 filter.$or = [
// // //                     { 'creatorInfo.id': currentUser.id },
// // //                     { facilitatorIds: currentUser.id }
// // //                 ];
// // //             }
// // //             // ADMIN (Semua Level) & SUPER ADMIN:
// // //             // TIDAK ADA FILTER DI SINI. Mereka melihat SEMUA data.
// // //             // Pembatasan "Siapa boleh Edit" diatur di FRONTEND (permissionUtils).
// // //         }

// // //         // Search
// // //         if (search) filter.title = { $regex: search, $options: 'i' };

// // //         // Debug (Cek Terminal Backend Anda)
// // //         console.log(`[DEBUG] User: ${req.user?.name} | Filter: ${JSON.stringify(filter)}`);

// // //         const courses = await Course.find(filter)
// // //             // [PENTING] HANYA POPULATE FIELD YANG BENAR-BENAR REFERENCE (OBJECT ID)
// // //             .populate('facilitatorIds', 'name email avatarUrl role')
// // //             .populate('picIds', 'name email avatarUrl role')
// // //             // JANGAN populate 'instructor' atau 'creatorInfo' karena itu Object, bukan Link.
// // //             .sort(sort as string)
// // //             .limit(Number(limit))
// // //             .skip((Number(page) - 1) * Number(limit));

// // //         const total = await Course.countDocuments(filter);

// // //         res.json({
// // //             courses,
// // //             totalPages: Math.ceil(total / Number(limit)),
// // //             currentPage: Number(page)
// // //         });
// // //     } catch (error: any) {
// // //         console.error("Get Courses Error:", error);
// // //         res.status(500).json({ error: error.message });
// // //     }
// // // };

// // // // ... (SISA FUNGSI SEPERTI getCourseById, updateCourse DLL - COPY DARI FILE LAMA)
// // // // ... (Pastikan Anda menyertakan fungsi-fungsi CRUD lainnya agar tidak error)
// // // export const getCourseById = async (req: Request, res: Response) => { try { const course = await Course.findById(req.params.id).populate('facilitatorIds', 'name email avatarUrl role bio').populate('picIds', 'name email avatarUrl role').populate({ path: 'modules', populate: { path: 'lessons' } }); if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' }); res.json({ course }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // export const updateCourse = async (req: Request, res: Response) => { try { const updateData = { ...req.body }; if (updateData.picIds && !Array.isArray(updateData.picIds)) delete updateData.picIds; const course = await Course.findByIdAndUpdate(req.params.id, updateData, { new: true }); if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' }); res.json(course); } catch (error: any) { res.status(400).json({ error: error.message }); } };
// // // export const deleteCourse = async (req: Request, res: Response) => { try { const course = await Course.findByIdAndDelete(req.params.id); if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' }); await Enrollment.deleteMany({ course: req.params.id }); await Progress.deleteMany({ courseId: req.params.id }); res.json({ message: 'Kursus berhasil dihapus' }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // export const addModule = async (req: Request, res: Response) => { try { const { id } = req.params; const course = await Course.findById(id); if (!course) return res.status(404).json({ error: 'Course not found' }); course.modules.push(req.body); await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // export const updateModule = async (req: Request, res: Response) => { try { const { courseId, moduleId } = req.params; const cId = courseId || req.params.id; const course = await Course.findById(cId); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.id(moduleId); if (!module) return res.status(404).json({ error: 'Module not found' }); module.set(req.body); await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // export const deleteModule = async (req: Request, res: Response) => { try { const { id, moduleId } = req.params; const course = await Course.findByIdAndUpdate( id, { $pull: { modules: { _id: moduleId } } }, { new: true } ); if (!course) return res.status(404).json({ error: 'Not found' }); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // export const addLesson = async (req: Request, res: Response) => { try { const { courseId, moduleId } = req.params; const course = await Course.findById(courseId); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.id(moduleId); if (!module) return res.status(404).json({ error: 'Module not found' }); module.lessons.push(req.body); await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // export const updateLesson = async (req: Request, res: Response) => { try { const { courseId, moduleId, lessonId } = req.params; const course = await Course.findById(courseId); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.id(moduleId); if (!module) return res.status(404).json({ error: 'Module not found' }); const lesson = module.lessons.id(lessonId); if (!lesson) return res.status(404).json({ error: 'Lesson not found' }); lesson.set(req.body); await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // export const deleteLesson = async (req: Request, res: Response) => { try { const { courseId, moduleId, lessonId } = req.params; const course = await Course.findById(courseId); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.id(moduleId); if (module) { module.lessons.pull({ _id: lessonId }); await course.save(); } res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // export const togglePublishCourse = async (req: Request, res: Response) => { try { const { id } = req.params; const course = await Course.findById(id); if (!course) return res.status(404).json({ error: 'Course not found' }); const newPublishedState = !course.isPublished; const newStatus = newPublishedState ? 'published' : 'draft'; course.isPublished = newPublishedState; course.status = newStatus; await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // export const toggleStatus = togglePublishCourse;
// // // export const reorderModules = async (req: Request, res: Response) => { try { const { id } = req.params; const { modules } = req.body; await Course.findByIdAndUpdate(id, { modules }); res.json({ message: 'Urutan disimpan' }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // export const updateGradingScheme = async (req: Request, res: Response) => { try { const { id } = req.params; const { modules } = req.body; if (!modules) return res.status(400).json({ error: "Data modul diperlukan" }); const course = await Course.findByIdAndUpdate(id, { modules }, { new: true }); if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' }); res.json({ message: 'Skema penilaian berhasil disimpan', course }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // export const enrollCourse = async (req: any, res: Response) => { try { const { courseId } = req.params; const userId = req.user?.id; const { registrationData } = req.body; if (!userId) return res.status(401).json({ error: 'Unauthorized' }); const course = await Course.findById(courseId); if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' }); const existing = await Enrollment.findOne({ user: userId, course: courseId }); if (existing) return res.status(400).json({ error: 'Anda sudah mendaftar.' }); let initialStatus = 'pending'; let joinedAtDate = undefined; if (course.registrationMode === 'automatic') { initialStatus = 'active'; joinedAtDate = new Date(); } const newEnrollment = new Enrollment({ user: userId, course: courseId, status: initialStatus, progress: 0, isCompleted: false, enrolledAt: new Date(), joinedAt: joinedAtDate, registrationData: registrationData || {} }); await newEnrollment.save(); const msg = course.registrationMode === 'automatic' ? 'Pendaftaran berhasil! Mulai belajar.' : 'Pendaftaran berhasil. Tunggu verifikasi.'; res.status(201).json({ message: msg, enrollment: newEnrollment }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // export const verifyEnrollment = async (req: Request, res: Response) => { try { const { enrollmentId, action } = req.body; if (action === 'reject') { await Enrollment.findByIdAndDelete(enrollmentId); return res.json({ message: "Pendaftaran ditolak." }); } if (action === 'approve') { await Enrollment.findByIdAndUpdate(enrollmentId, { status: 'active', joinedAt: new Date() }); return res.json({ message: "Pendaftaran disetujui." }); } res.status(400).json({ error: "Aksi tidak valid" }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // export const checkEnrollmentStatus = async (req: any, res: Response) => { try { const { courseId } = req.params; const userId = req.user?.id; if (!userId) return res.status(401).json({ error: 'Unauthorized' }); const enrollment = await Enrollment.findOne({ user: userId, course: courseId }); if (!enrollment) return res.json({ isEnrolled: false, status: null }); res.json({ isEnrolled: true, status: enrollment.status, progress: enrollment.progress }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // export const getCourseParticipants = async (req: Request, res: Response) => { try { res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate'); const { id } = req.params; const enrollments = await Enrollment.find({ course: id }).populate('user', 'name email avatarUrl role').sort({ createdAt: -1 }).lean(); if (!enrollments.length) return res.json({ participants: [] }); const userIds = enrollments.map((e: any) => e.user?._id); const progressRecords = await Progress.find({ courseId: id, userId: { $in: userIds } }).lean(); const course: any = await Course.findById(id).select('modules').lean(); let totalLessons = 0; const validLessonIds = new Set<string>(); if (course && course.modules) { course.modules.forEach((m: any) => { if (m.isActive) { m.lessons.forEach((l: any) => { if (l.isActive) { totalLessons++; validLessonIds.add(l._id.toString()); } }); } }); } const participants = await Promise.all(enrollments.map(async (enroll: any) => { const userObj = enroll.user || {}; const detail = progressRecords.find((p: any) => p.userId.toString() === userObj._id?.toString()); let calculatedProgress = 0; let completedIds: string[] = []; if ((enroll.status === 'active' || enroll.status === 'approved') && detail) { const rawCompleted = detail.completedLessons.map((id: any) => id.toString()); completedIds = rawCompleted.filter((id: any) => validLessonIds.has(id)); if (totalLessons > 0) calculatedProgress = Math.round((completedIds.length / totalLessons) * 100); if (calculatedProgress > 100) calculatedProgress = 100; } return { _id: enroll._id, user: { _id: userObj._id, name: userObj.name, email: userObj.email, avatarUrl: userObj.avatarUrl, role: userObj.role }, registrationData: enroll.registrationData || {}, status: enroll.status || 'pending', progress: calculatedProgress, completedLessons: completedIds, lessonDetails: detail ? detail.lessonDetails : [] }; })); res.json({ participants }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // export const markCompleteLessonByAdmin = async (req: Request, res: Response) => { try { const { studentId, lessonId, courseId } = req.body; let progress = await Progress.findOne({ userId: studentId, courseId }); if (!progress) progress = new Progress({ userId: studentId, courseId, completedLessons: [] }); const strLessonId = lessonId.toString(); if (!progress.completedLessons.some((id: any) => id.toString() === strLessonId)) { progress.completedLessons.push(lessonId); await progress.save(); } res.json({ message: 'Berhasil diluluskan' }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // export const resetQuizByAdmin = async (req: Request, res: Response) => { try { const { studentId, quizId } = req.body; if (!studentId || !quizId) return res.status(400).json({ error: "Data incomplete" }); await Progress.findOneAndUpdate({ userId: studentId }, { $pull: { completedLessons: quizId } }); res.json({ message: 'Reset berhasil' }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // export const getGroupMessages = async (req: any, res: Response) => { try { const { id } = req.params; const { type } = req.query; const query: any = { course: id, type: type || 'public' }; const messages = await Message.find(query).populate('sender', 'name avatarUrl role').sort({ createdAt: 1 }); res.json(messages); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // // export const sendGroupMessage = async (req: any, res: Response) => { try { const { id } = req.params; const { text, type, attachment } = req.body; const userId = req.user?.id; const newMessage = new Message({ course: id, sender: userId, message: text || '', type: type || 'public', isRead: false, isGlobal: false, attachment: attachment || null }); await newMessage.save(); await newMessage.populate('sender', 'name avatarUrl role'); res.status(201).json(newMessage); } catch (error: any) { res.status(500).json({ error: error.message }); } };






// // import { Request, Response } from 'express';
// // import { Course } from '../models/Course';
// // import { Enrollment } from '../models/Enrollment';
// // import { Progress } from '../models/Progress';
// // import { Message } from '../models/Message';
// // import { User } from '../models/User'; 
// // import { AuthedRequest } from '../middleware/auth';
// // import slugify from 'slugify';

// // const generateSlug = async (title: string) => {
// //     let slug = slugify(title, { lower: true, strict: true });
// //     const exists = await Course.findOne({ slug });
// //     if (exists) slug = `${slug}-${Date.now()}`;
// //     return slug;
// // };

// // // ==========================================
// // // 1. CREATE COURSE
// // // ==========================================
// // export const createCourse = async (req: AuthedRequest, res: Response) => {
// //     try {
// //         const data = req.body;
// //         let regionCode = data.regionCode || 'national'; 

// //         if (req.user?.role === 'ADMIN') {
// //             const userScope = (req.user.regionScope || 'national').toLowerCase();
// //             if (userScope === 'province') {
// //                 regionCode = req.user.managedProvinces?.[0] || regionCode;
// //             } else if (userScope === 'regency') {
// //                 regionCode = req.user.managedRegencies?.[0] || regionCode;
// //             }
// //         }

// //         if (!data.slug && data.title) data.slug = await generateSlug(data.title);
// //         if (!data.status) data.status = 'draft';
// //         if (!data.programType) data.programType = 'course'; 

// //         const facilitatorIds = data.facilitatorIds || [req.user?.id];
// //         const picIds = data.picIds || [];

// //         const course = new Course({
// //             ...data,
// //             regionCode, 
// //             facilitatorIds,
// //             picIds,
// //             creatorInfo: {
// //                 id: req.user?.id,
// //                 name: req.user?.name,
// //                 email: req.user?.email,
// //                 role: req.user?.role
// //             }
// //         });

// //         await course.save();
// //         res.status(201).json(course);
// //     } catch (error: any) {
// //         if (error.code === 11000) return res.status(400).json({ error: 'Judul pelatihan sudah ada.' });
// //         res.status(400).json({ error: error.message });
// //     }
// // };

// // // ==========================================
// // // 2. GET COURSES
// // // ==========================================
// // export const getCourses = async (req: any, res: Response) => {
// //     try {
// //         const { status, search, type, limit = 50, page = 1, sort = '-createdAt', isPublished } = req.query;
// //         const filter: any = {}; 
// //         const isCatalogRequest = isPublished === 'true';

// //         if (isCatalogRequest) {
// //             filter.isPublished = true;
// //             if (!status) {
// //                 filter.status = { $in: ['published', 'ready'] };
// //             } else {
// //                 const sArr = (status as string).split(',').map(s => s.trim());
// //                 filter.status = { $in: sArr };
// //             }
// //         } else {
// //             if (type) {
// //                 if (type === 'training' || type === 'course') {
// //                     filter.programType = { $in: ['training', 'course'] };
// //                 } else {
// //                     filter.programType = type;
// //                 }
// //             }
// //             if (status && status !== 'ALL') {
// //                 const sArr = (status as string).split(',').map(s => s.trim());
// //                 filter.status = { $in: sArr };
// //             }

// //             const currentUser = req.user;
// //             if (currentUser?.role === 'FACILITATOR') {
// //                 filter.$or = [
// //                     { 'creatorInfo.id': currentUser.id },
// //                     { facilitatorIds: currentUser.id }
// //                 ];
// //             }
// //         }

// //         if (search) filter.title = { $regex: search, $options: 'i' };

// //         console.log(`[DEBUG] User: ${req.user?.name} | Filter: ${JSON.stringify(filter)}`);

// //         const courses = await Course.find(filter)
// //             .populate('facilitatorIds', 'name email avatarUrl role')
// //             .populate('picIds', 'name email avatarUrl role')
// //             .sort(sort as string)
// //             .limit(Number(limit))
// //             .skip((Number(page) - 1) * Number(limit));

// //         const total = await Course.countDocuments(filter);

// //         res.json({
// //             courses,
// //             totalPages: Math.ceil(total / Number(limit)),
// //             currentPage: Number(page)
// //         });
// //     } catch (error: any) {
// //         console.error("Get Courses Error:", error);
// //         res.status(500).json({ error: error.message });
// //     }
// // };

// // export const getCourseById = async (req: Request, res: Response) => { try { const course = await Course.findById(req.params.id).populate('facilitatorIds', 'name email avatarUrl role bio').populate('picIds', 'name email avatarUrl role').populate({ path: 'modules', populate: { path: 'lessons' } }); if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' }); res.json({ course }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // export const updateCourse = async (req: Request, res: Response) => { try { const updateData = { ...req.body }; if (updateData.picIds && !Array.isArray(updateData.picIds)) delete updateData.picIds; const course = await Course.findByIdAndUpdate(req.params.id, updateData, { new: true }); if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' }); res.json(course); } catch (error: any) { res.status(400).json({ error: error.message }); } };
// // export const deleteCourse = async (req: Request, res: Response) => { try { const course = await Course.findByIdAndDelete(req.params.id); if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' }); await Enrollment.deleteMany({ course: req.params.id }); await Progress.deleteMany({ courseId: req.params.id }); res.json({ message: 'Kursus berhasil dihapus' }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // export const addModule = async (req: Request, res: Response) => { try { const { id } = req.params; const course = await Course.findById(id); if (!course) return res.status(404).json({ error: 'Course not found' }); course.modules.push(req.body); await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // export const updateModule = async (req: Request, res: Response) => { try { const { courseId, moduleId } = req.params; const cId = courseId || req.params.id; const course = await Course.findById(cId); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.id(moduleId); if (!module) return res.status(404).json({ error: 'Module not found' }); module.set(req.body); await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // export const deleteModule = async (req: Request, res: Response) => { try { const { id, moduleId } = req.params; const course = await Course.findByIdAndUpdate( id, { $pull: { modules: { _id: moduleId } } }, { new: true } ); if (!course) return res.status(404).json({ error: 'Not found' }); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // export const addLesson = async (req: Request, res: Response) => { try { const { courseId, moduleId } = req.params; const course = await Course.findById(courseId); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.id(moduleId); if (!module) return res.status(404).json({ error: 'Module not found' }); module.lessons.push(req.body); await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // export const updateLesson = async (req: Request, res: Response) => { try { const { courseId, moduleId, lessonId } = req.params; const course = await Course.findById(courseId); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.id(moduleId); if (!module) return res.status(404).json({ error: 'Module not found' }); const lesson = module.lessons.id(lessonId); if (!lesson) return res.status(404).json({ error: 'Lesson not found' }); lesson.set(req.body); await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // export const deleteLesson = async (req: Request, res: Response) => { try { const { courseId, moduleId, lessonId } = req.params; const course = await Course.findById(courseId); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.id(moduleId); if (module) { module.lessons.pull({ _id: lessonId }); await course.save(); } res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // export const togglePublishCourse = async (req: Request, res: Response) => { try { const { id } = req.params; const course = await Course.findById(id); if (!course) return res.status(404).json({ error: 'Course not found' }); const newPublishedState = !course.isPublished; const newStatus = newPublishedState ? 'published' : 'draft'; course.isPublished = newPublishedState; course.status = newStatus; await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // export const toggleStatus = togglePublishCourse;
// // export const reorderModules = async (req: Request, res: Response) => { try { const { id } = req.params; const { modules } = req.body; await Course.findByIdAndUpdate(id, { modules }); res.json({ message: 'Urutan disimpan' }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // export const updateGradingScheme = async (req: Request, res: Response) => { try { const { id } = req.params; const { modules } = req.body; if (!modules) return res.status(400).json({ error: "Data modul diperlukan" }); const course = await Course.findByIdAndUpdate(id, { modules }, { new: true }); if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' }); res.json({ message: 'Skema penilaian berhasil disimpan', course }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // export const enrollCourse = async (req: any, res: Response) => { try { const { courseId } = req.params; const userId = req.user?.id; const { registrationData } = req.body; if (!userId) return res.status(401).json({ error: 'Unauthorized' }); const course = await Course.findById(courseId); if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' }); const existing = await Enrollment.findOne({ user: userId, course: courseId }); if (existing) return res.status(400).json({ error: 'Anda sudah mendaftar.' }); let initialStatus = 'pending'; let joinedAtDate = undefined; if (course.registrationMode === 'automatic') { initialStatus = 'active'; joinedAtDate = new Date(); } const newEnrollment = new Enrollment({ user: userId, course: courseId, status: initialStatus, progress: 0, isCompleted: false, enrolledAt: new Date(), joinedAt: joinedAtDate, registrationData: registrationData || {} }); await newEnrollment.save(); const msg = course.registrationMode === 'automatic' ? 'Pendaftaran berhasil! Mulai belajar.' : 'Pendaftaran berhasil. Tunggu verifikasi.'; res.status(201).json({ message: msg, enrollment: newEnrollment }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // export const verifyEnrollment = async (req: Request, res: Response) => { try { const { enrollmentId, action } = req.body; if (action === 'reject') { await Enrollment.findByIdAndDelete(enrollmentId); return res.json({ message: "Pendaftaran ditolak." }); } if (action === 'approve') { await Enrollment.findByIdAndUpdate(enrollmentId, { status: 'active', joinedAt: new Date() }); return res.json({ message: "Pendaftaran disetujui." }); } res.status(400).json({ error: "Aksi tidak valid" }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // export const checkEnrollmentStatus = async (req: any, res: Response) => { try { const { courseId } = req.params; const userId = req.user?.id; if (!userId) return res.status(401).json({ error: 'Unauthorized' }); const enrollment = await Enrollment.findOne({ user: userId, course: courseId }); if (!enrollment) return res.json({ isEnrolled: false, status: null }); res.json({ isEnrolled: true, status: enrollment.status, progress: enrollment.progress }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // export const getCourseParticipants = async (req: Request, res: Response) => { try { res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate'); const { id } = req.params; const enrollments = await Enrollment.find({ course: id }).populate('user', 'name email avatarUrl role').sort({ createdAt: -1 }).lean(); if (!enrollments.length) return res.json({ participants: [] }); const userIds = enrollments.map((e: any) => e.user?._id); const progressRecords = await Progress.find({ courseId: id, userId: { $in: userIds } }).lean(); const course: any = await Course.findById(id).select('modules').lean(); let totalLessons = 0; const validLessonIds = new Set<string>(); if (course && course.modules) { course.modules.forEach((m: any) => { if (m.isActive) { m.lessons.forEach((l: any) => { if (l.isActive) { totalLessons++; validLessonIds.add(l._id.toString()); } }); } }); } const participants = await Promise.all(enrollments.map(async (enroll: any) => { const userObj = enroll.user || {}; const detail = progressRecords.find((p: any) => p.userId.toString() === userObj._id?.toString()); let calculatedProgress = 0; let completedIds: string[] = []; if ((enroll.status === 'active' || enroll.status === 'approved') && detail) { const rawCompleted = detail.completedLessons.map((id: any) => id.toString()); completedIds = rawCompleted.filter((id: any) => validLessonIds.has(id)); if (totalLessons > 0) calculatedProgress = Math.round((completedIds.length / totalLessons) * 100); if (calculatedProgress > 100) calculatedProgress = 100; } return { _id: enroll._id, user: { _id: userObj._id, name: userObj.name, email: userObj.email, avatarUrl: userObj.avatarUrl, role: userObj.role }, registrationData: enroll.registrationData || {}, status: enroll.status || 'pending', progress: calculatedProgress, completedLessons: completedIds, lessonDetails: detail ? detail.lessonDetails : [] }; })); res.json({ participants }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // export const markCompleteLessonByAdmin = async (req: Request, res: Response) => { try { const { studentId, lessonId, courseId } = req.body; let progress = await Progress.findOne({ userId: studentId, courseId }); if (!progress) progress = new Progress({ userId: studentId, courseId, completedLessons: [] }); const strLessonId = lessonId.toString(); if (!progress.completedLessons.some((id: any) => id.toString() === strLessonId)) { progress.completedLessons.push(lessonId); await progress.save(); } res.json({ message: 'Berhasil diluluskan' }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // export const resetQuizByAdmin = async (req: Request, res: Response) => { try { const { studentId, quizId } = req.body; if (!studentId || !quizId) return res.status(400).json({ error: "Data incomplete" }); await Progress.findOneAndUpdate({ userId: studentId }, { $pull: { completedLessons: quizId } }); res.json({ message: 'Reset berhasil' }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // export const getGroupMessages = async (req: any, res: Response) => { try { const { id } = req.params; const { type } = req.query; const query: any = { course: id, type: type || 'public' }; const messages = await Message.find(query).populate('sender', 'name avatarUrl role').sort({ createdAt: 1 }); res.json(messages); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // export const sendGroupMessage = async (req: any, res: Response) => { try { const { id } = req.params; const { text, type, attachment } = req.body; const userId = req.user?.id; const newMessage = new Message({ course: id, sender: userId, message: text || '', type: type || 'public', isRead: false, isGlobal: false, attachment: attachment || null }); await newMessage.save(); await newMessage.populate('sender', 'name avatarUrl role'); res.status(201).json(newMessage); } catch (error: any) { res.status(500).json({ error: error.message }); } };

// // // =======================================================
// // // [TAMBAHAN] UPDATE COURSE STATUS (DENGAN HIERARKI WILAYAH)
// // // =======================================================
// // export const updateCourseStatus = async (req: any, res: Response) => {
// //     try {
// //         const { id } = req.params;
// //         const { status } = req.body; // 'draft', 'revision', 'proposed'
// //         const user = req.user;

// //         if (!user) return res.status(401).json({ error: 'Unauthorized' });

// //         const course = await Course.findById(id);
// //         if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });

// //         // Logic Akses
// //         let hasAccess = false;
// //         if (user.role === 'SUPER_ADMIN') hasAccess = true;
// //         else if (user.role === 'ADMIN') {
// //             if (user.regionScope === 'national') {
// //                 hasAccess = true;
// //             } else {
// //                 const courseRegion = String(course.regionCode || ''); 
// //                 if (user.regionScope === 'province') {
// //                     // Admin Provinsi Boleh Akses Kursus di Provinsinya DAN Kabupaten di bawahnya
// //                     const myProvs = user.managedProvinces || []; 
// //                     hasAccess = myProvs.some((p: string) => courseRegion.startsWith(p));
// //                 } else if (user.regionScope === 'regency') {
// //                     // Admin Kabupaten hanya boleh akses wilayahnya sendiri
// //                     const myRegs = user.managedRegencies || [];
// //                     hasAccess = myRegs.includes(courseRegion);
// //                 }
// //             }
// //         }

// //         if (!hasAccess) return res.status(403).json({ error: 'Akses Ditolak: Di luar wilayah wewenang.' });

// //         course.status = status;
        
// //         // [FIX ERROR TYPESCRIPT 2339]
// //         // Gunakan type assertion (as any) untuk bypass pengecekan field yang mungkin belum ada di Interface Model
// //         if (status === 'draft' || status === 'ready') {
// //             (course as any).approvedBy = user.id;
// //             (course as any).approvedAt = new Date();
// //         }

// //         await course.save();
// //         res.json(course);
// //     } catch (error: any) {
// //         res.status(500).json({ error: error.message });
// //     }
// // };



// // import { Request, Response } from 'express';
// // import { Course } from '../models/Course';
// // import { Enrollment } from '../models/Enrollment';
// // import { Progress } from '../models/Progress';
// // import { Message } from '../models/Message';
// // import { User } from '../models/User'; 
// // import { AuthedRequest } from '../middleware/auth';
// // import slugify from 'slugify';

// // const generateSlug = async (title: string) => {
// //     let slug = slugify(title, { lower: true, strict: true });
// //     const exists = await Course.findOne({ slug });
// //     if (exists) slug = `${slug}-${Date.now()}`;
// //     return slug;
// // };

// // // ==========================================
// // // 1. CREATE COURSE
// // // ==========================================
// // export const createCourse = async (req: AuthedRequest, res: Response) => {
// //     try {
// //         const data = req.body;
// //         let regionCode = data.regionCode || 'national'; 

// //         if (req.user?.role === 'ADMIN') {
// //             const userScope = (req.user.regionScope || 'national').toLowerCase();
// //             if (userScope === 'province') {
// //                 regionCode = req.user.managedProvinces?.[0] || regionCode;
// //             } else if (userScope === 'regency') {
// //                 regionCode = req.user.managedRegencies?.[0] || regionCode;
// //             }
// //         }

// //         if (!data.slug && data.title) data.slug = await generateSlug(data.title);
// //         if (!data.status) data.status = 'draft';
// //         if (!data.programType) data.programType = 'course'; 

// //         const facilitatorIds = data.facilitatorIds || [req.user?.id];
// //         const picIds = data.picIds || [];

// //         const course = new Course({
// //             ...data,
// //             regionCode, 
// //             facilitatorIds,
// //             picIds,
// //             creatorInfo: {
// //                 id: req.user?.id,
// //                 name: req.user?.name,
// //                 email: req.user?.email,
// //                 role: req.user?.role
// //             }
// //         });

// //         await course.save();
// //         res.status(201).json(course);
// //     } catch (error: any) {
// //         if (error.code === 11000) return res.status(400).json({ error: 'Judul pelatihan sudah ada.' });
// //         res.status(400).json({ error: error.message });
// //     }
// // };

// // // ==========================================
// // // 2. GET COURSES
// // // ==========================================
// // export const getCourses = async (req: any, res: Response) => {
// //     try {
// //         const { status, search, type, limit = 50, page = 1, sort = '-createdAt', isPublished } = req.query;
// //         const filter: any = {}; 
// //         const isCatalogRequest = isPublished === 'true';

// //         if (isCatalogRequest) {
// //             filter.isPublished = true;
// //             if (!status) {
// //                 filter.status = { $in: ['published', 'ready'] };
// //             } else {
// //                 const sArr = (status as string).split(',').map(s => s.trim());
// //                 filter.status = { $in: sArr };
// //             }
// //         } else {
// //             if (type) {
// //                 if (type === 'training' || type === 'course') {
// //                     filter.programType = { $in: ['training', 'course'] };
// //                 } else {
// //                     filter.programType = type;
// //                 }
// //             }
// //             if (status && status !== 'ALL') {
// //                 const sArr = (status as string).split(',').map(s => s.trim());
// //                 filter.status = { $in: sArr };
// //             }

// //             const currentUser = req.user;
// //             if (currentUser?.role === 'FACILITATOR') {
// //                 filter.$or = [
// //                     { 'creatorInfo.id': currentUser.id },
// //                     { facilitatorIds: currentUser.id }
// //                 ];
// //             }
// //         }

// //         if (search) filter.title = { $regex: search, $options: 'i' };

// //         console.log(`[DEBUG] User: ${req.user?.name} | Filter: ${JSON.stringify(filter)}`);

// //         const courses = await Course.find(filter)
// //             .populate('facilitatorIds', 'name email avatarUrl role')
// //             .populate('picIds', 'name email avatarUrl role')
// //             .sort(sort as string)
// //             .limit(Number(limit))
// //             .skip((Number(page) - 1) * Number(limit));

// //         const total = await Course.countDocuments(filter);

// //         res.json({
// //             courses,
// //             totalPages: Math.ceil(total / Number(limit)),
// //             currentPage: Number(page)
// //         });
// //     } catch (error: any) {
// //         console.error("Get Courses Error:", error);
// //         res.status(500).json({ error: error.message });
// //     }
// // };

// // export const getCourseById = async (req: Request, res: Response) => { try { const course = await Course.findById(req.params.id).populate('facilitatorIds', 'name email avatarUrl role bio').populate('picIds', 'name email avatarUrl role').populate({ path: 'modules', populate: { path: 'lessons' } }); if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' }); res.json({ course }); } catch (error: any) { res.status(500).json({ error: error.message }); } };

// // // [PENTING] Fungsi ini yang dipanggil saat Edit Info / Setujui Info
// // export const updateCourse = async (req: Request, res: Response) => { 
// //     try { 
// //         const updateData = { ...req.body }; 
        
// //         // Safety: picIds harus array jika ada
// //         if (updateData.picIds && !Array.isArray(updateData.picIds)) delete updateData.picIds; 
        
// //         // Update dengan {new: true} agar mengembalikan data terbaru
// //         const course = await Course.findByIdAndUpdate(req.params.id, updateData, { new: true }); 
        
// //         if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' }); 
// //         res.json(course); 
// //     } catch (error: any) { 
// //         res.status(400).json({ error: error.message }); 
// //     } 
// // };

// // export const deleteCourse = async (req: Request, res: Response) => { try { const course = await Course.findByIdAndDelete(req.params.id); if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' }); await Enrollment.deleteMany({ course: req.params.id }); await Progress.deleteMany({ courseId: req.params.id }); res.json({ message: 'Kursus berhasil dihapus' }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // export const addModule = async (req: Request, res: Response) => { try { const { id } = req.params; const course = await Course.findById(id); if (!course) return res.status(404).json({ error: 'Course not found' }); course.modules.push(req.body); await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // export const updateModule = async (req: Request, res: Response) => { try { const { courseId, moduleId } = req.params; const cId = courseId || req.params.id; const course = await Course.findById(cId); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.id(moduleId); if (!module) return res.status(404).json({ error: 'Module not found' }); module.set(req.body); await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // export const deleteModule = async (req: Request, res: Response) => { try { const { id, moduleId } = req.params; const course = await Course.findByIdAndUpdate( id, { $pull: { modules: { _id: moduleId } } }, { new: true } ); if (!course) return res.status(404).json({ error: 'Not found' }); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // export const addLesson = async (req: Request, res: Response) => { try { const { courseId, moduleId } = req.params; const course = await Course.findById(courseId); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.id(moduleId); if (!module) return res.status(404).json({ error: 'Module not found' }); module.lessons.push(req.body); await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // export const updateLesson = async (req: Request, res: Response) => { try { const { courseId, moduleId, lessonId } = req.params; const course = await Course.findById(courseId); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.id(moduleId); if (!module) return res.status(404).json({ error: 'Module not found' }); const lesson = module.lessons.id(lessonId); if (!lesson) return res.status(404).json({ error: 'Lesson not found' }); lesson.set(req.body); await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // export const deleteLesson = async (req: Request, res: Response) => { try { const { courseId, moduleId, lessonId } = req.params; const course = await Course.findById(courseId); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.id(moduleId); if (module) { module.lessons.pull({ _id: lessonId }); await course.save(); } res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // export const togglePublishCourse = async (req: Request, res: Response) => { try { const { id } = req.params; const course = await Course.findById(id); if (!course) return res.status(404).json({ error: 'Course not found' }); const newPublishedState = !course.isPublished; const newStatus = newPublishedState ? 'published' : 'draft'; course.isPublished = newPublishedState; course.status = newStatus; await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // export const toggleStatus = togglePublishCourse;
// // export const reorderModules = async (req: Request, res: Response) => { try { const { id } = req.params; const { modules } = req.body; await Course.findByIdAndUpdate(id, { modules }); res.json({ message: 'Urutan disimpan' }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // export const updateGradingScheme = async (req: Request, res: Response) => { try { const { id } = req.params; const { modules } = req.body; if (!modules) return res.status(400).json({ error: "Data modul diperlukan" }); const course = await Course.findByIdAndUpdate(id, { modules }, { new: true }); if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' }); res.json({ message: 'Skema penilaian berhasil disimpan', course }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // export const enrollCourse = async (req: any, res: Response) => { try { const { courseId } = req.params; const userId = req.user?.id; const { registrationData } = req.body; if (!userId) return res.status(401).json({ error: 'Unauthorized' }); const course = await Course.findById(courseId); if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' }); const existing = await Enrollment.findOne({ user: userId, course: courseId }); if (existing) return res.status(400).json({ error: 'Anda sudah mendaftar.' }); let initialStatus = 'pending'; let joinedAtDate = undefined; if (course.registrationMode === 'automatic') { initialStatus = 'active'; joinedAtDate = new Date(); } const newEnrollment = new Enrollment({ user: userId, course: courseId, status: initialStatus, progress: 0, isCompleted: false, enrolledAt: new Date(), joinedAt: joinedAtDate, registrationData: registrationData || {} }); await newEnrollment.save(); const msg = course.registrationMode === 'automatic' ? 'Pendaftaran berhasil! Mulai belajar.' : 'Pendaftaran berhasil. Tunggu verifikasi.'; res.status(201).json({ message: msg, enrollment: newEnrollment }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // export const verifyEnrollment = async (req: Request, res: Response) => { try { const { enrollmentId, action } = req.body; if (action === 'reject') { await Enrollment.findByIdAndDelete(enrollmentId); return res.json({ message: "Pendaftaran ditolak." }); } if (action === 'approve') { await Enrollment.findByIdAndUpdate(enrollmentId, { status: 'active', joinedAt: new Date() }); return res.json({ message: "Pendaftaran disetujui." }); } res.status(400).json({ error: "Aksi tidak valid" }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // export const checkEnrollmentStatus = async (req: any, res: Response) => { try { const { courseId } = req.params; const userId = req.user?.id; if (!userId) return res.status(401).json({ error: 'Unauthorized' }); const enrollment = await Enrollment.findOne({ user: userId, course: courseId }); if (!enrollment) return res.json({ isEnrolled: false, status: null }); res.json({ isEnrolled: true, status: enrollment.status, progress: enrollment.progress }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // export const getCourseParticipants = async (req: Request, res: Response) => { try { res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate'); const { id } = req.params; const enrollments = await Enrollment.find({ course: id }).populate('user', 'name email avatarUrl role').sort({ createdAt: -1 }).lean(); if (!enrollments.length) return res.json({ participants: [] }); const userIds = enrollments.map((e: any) => e.user?._id); const progressRecords = await Progress.find({ courseId: id, userId: { $in: userIds } }).lean(); const course: any = await Course.findById(id).select('modules').lean(); let totalLessons = 0; const validLessonIds = new Set<string>(); if (course && course.modules) { course.modules.forEach((m: any) => { if (m.isActive) { m.lessons.forEach((l: any) => { if (l.isActive) { totalLessons++; validLessonIds.add(l._id.toString()); } }); } }); } const participants = await Promise.all(enrollments.map(async (enroll: any) => { const userObj = enroll.user || {}; const detail = progressRecords.find((p: any) => p.userId.toString() === userObj._id?.toString()); let calculatedProgress = 0; let completedIds: string[] = []; if ((enroll.status === 'active' || enroll.status === 'approved') && detail) { const rawCompleted = detail.completedLessons.map((id: any) => id.toString()); completedIds = rawCompleted.filter((id: any) => validLessonIds.has(id)); if (totalLessons > 0) calculatedProgress = Math.round((completedIds.length / totalLessons) * 100); if (calculatedProgress > 100) calculatedProgress = 100; } return { _id: enroll._id, user: { _id: userObj._id, name: userObj.name, email: userObj.email, avatarUrl: userObj.avatarUrl, role: userObj.role }, registrationData: enroll.registrationData || {}, status: enroll.status || 'pending', progress: calculatedProgress, completedLessons: completedIds, lessonDetails: detail ? detail.lessonDetails : [] }; })); res.json({ participants }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // export const markCompleteLessonByAdmin = async (req: Request, res: Response) => { try { const { studentId, lessonId, courseId } = req.body; let progress = await Progress.findOne({ userId: studentId, courseId }); if (!progress) progress = new Progress({ userId: studentId, courseId, completedLessons: [] }); const strLessonId = lessonId.toString(); if (!progress.completedLessons.some((id: any) => id.toString() === strLessonId)) { progress.completedLessons.push(lessonId); await progress.save(); } res.json({ message: 'Berhasil diluluskan' }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // export const resetQuizByAdmin = async (req: Request, res: Response) => { try { const { studentId, quizId } = req.body; if (!studentId || !quizId) return res.status(400).json({ error: "Data incomplete" }); await Progress.findOneAndUpdate({ userId: studentId }, { $pull: { completedLessons: quizId } }); res.json({ message: 'Reset berhasil' }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // export const getGroupMessages = async (req: any, res: Response) => { try { const { id } = req.params; const { type } = req.query; const query: any = { course: id, type: type || 'public' }; const messages = await Message.find(query).populate('sender', 'name avatarUrl role').sort({ createdAt: 1 }); res.json(messages); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// // export const sendGroupMessage = async (req: any, res: Response) => { try { const { id } = req.params; const { text, type, attachment } = req.body; const userId = req.user?.id; const newMessage = new Message({ course: id, sender: userId, message: text || '', type: type || 'public', isRead: false, isGlobal: false, attachment: attachment || null }); await newMessage.save(); await newMessage.populate('sender', 'name avatarUrl role'); res.status(201).json(newMessage); } catch (error: any) { res.status(500).json({ error: error.message }); } };

// // // =======================================================
// // // [TAMBAHAN] UPDATE COURSE STATUS (DENGAN HIERARKI WILAYAH)
// // // =======================================================
// // export const updateCourseStatus = async (req: any, res: Response) => {
// //     try {
// //         const { id } = req.params;
// //         const { status } = req.body; 
// //         const user = req.user;

// //         if (!user) return res.status(401).json({ error: 'Unauthorized' });

// //         const course = await Course.findById(id);
// //         if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });

// //         // Logic Akses
// //         let hasAccess = false;
// //         if (user.role === 'SUPER_ADMIN') hasAccess = true;
// //         else if (user.role === 'ADMIN') {
// //             if (user.regionScope === 'national') {
// //                 hasAccess = true;
// //             } else {
// //                 const courseRegion = String(course.regionCode || ''); 
// //                 if (user.regionScope === 'province') {
// //                     const myProvs = user.managedProvinces || []; 
// //                     hasAccess = myProvs.some((p: string) => courseRegion.startsWith(p));
// //                 } else if (user.regionScope === 'regency') {
// //                     const myRegs = user.managedRegencies || [];
// //                     hasAccess = myRegs.includes(courseRegion);
// //                 }
// //             }
// //         }

// //         if (!hasAccess) return res.status(403).json({ error: 'Akses Ditolak: Di luar wilayah wewenang.' });

// //         course.status = status;
        
// //         // [FIX] Handle Approval
// //         if (status === 'draft' || status === 'ready') {
// //             (course as any).approvedBy = user.id;
// //             (course as any).approvedAt = new Date();
// //         }

// //         await course.save();
// //         res.json(course);
// //     } catch (error: any) {
// //         res.status(500).json({ error: error.message });
// //     }
// // };


// import { Request, Response } from 'express';
// import { Course } from '../models/Course';
// import { Enrollment } from '../models/Enrollment';
// import { Progress } from '../models/Progress';
// import { Message } from '../models/Message';
// import { User } from '../models/User'; 
// import { AuthedRequest } from '../middleware/auth';
// import slugify from 'slugify';

// const generateSlug = async (title: string) => {
//     let slug = slugify(title, { lower: true, strict: true });
//     const exists = await Course.findOne({ slug });
//     if (exists) slug = `${slug}-${Date.now()}`;
//     return slug;
// };

// // ==========================================
// // 1. CREATE COURSE
// // ==========================================
// export const createCourse = async (req: AuthedRequest, res: Response) => {
//     try {
//         const data = req.body;
//         let regionCode = data.regionCode || 'national'; 

//         if (req.user?.role === 'ADMIN') {
//             const userScope = (req.user.regionScope || 'national').toLowerCase();
//             if (userScope === 'province') {
//                 regionCode = req.user.managedProvinces?.[0] || regionCode;
//             } else if (userScope === 'regency') {
//                 regionCode = req.user.managedRegencies?.[0] || regionCode;
//             }
//         }

//         if (!data.slug && data.title) data.slug = await generateSlug(data.title);
//         if (!data.status) data.status = 'draft';
//         if (!data.programType) data.programType = 'course'; 

//         const facilitatorIds = data.facilitatorIds || [req.user?.id];
//         const picIds = data.picIds || [];

//         const course = new Course({
//             ...data,
//             regionCode, 
//             facilitatorIds,
//             picIds,
//             creatorInfo: {
//                 id: req.user?.id,
//                 name: req.user?.name,
//                 email: req.user?.email,
//                 role: req.user?.role
//             }
//         });

//         await course.save();
//         res.status(201).json(course);
//     } catch (error: any) {
//         if (error.code === 11000) return res.status(400).json({ error: 'Judul pelatihan sudah ada.' });
//         res.status(400).json({ error: error.message });
//     }
// };

// // ==========================================
// // 2. GET COURSES
// // ==========================================
// export const getCourses = async (req: any, res: Response) => {
//     try {
//         const { status, search, type, limit = 50, page = 1, sort = '-createdAt', isPublished } = req.query;
//         const filter: any = {}; 
//         const isCatalogRequest = isPublished === 'true';

//         // --- A. MODE KATALOG PUBLIK ---
//         if (isCatalogRequest) {
//             filter.isPublished = true;
//             if (!status) {
//                 // Di katalog, tampilkan Published dan Ready
//                 filter.status = { $in: ['published', 'ready'] };
//             } else {
//                 const sArr = (status as string).split(',').map(s => s.trim());
//                 filter.status = { $in: sArr };
//             }
//         } 
        
//         // --- B. MODE DASHBOARD ADMIN / FASILITATOR ---
//         else {
//             const currentUser = req.user;

//             // 1. Filter Tipe Program
//             if (type) {
//                 if (type === 'training' || type === 'course') {
//                     filter.programType = { $in: ['training', 'course'] };
//                 } else {
//                     filter.programType = type;
//                 }
//             }

//             // 2. Filter Status (Jika ada request spesifik)
//             if (status && status !== 'ALL') {
//                 const sArr = (status as string).split(',').map(s => s.trim());
//                 filter.status = { $in: sArr };
//             }

//             // 3. Hak Akses (Scope Visibility)
//             // [FIX] Super Admin melihat semua. Fasilitator dibatasi.
//             if (currentUser?.role === 'FACILITATOR') {
//                 filter.$or = [
//                     { 'creatorInfo.id': currentUser.id },
//                     { facilitatorIds: currentUser.id }
//                 ];
//             }
//         }

//         if (search) filter.title = { $regex: search, $options: 'i' };

//         console.log(`[DEBUG] User: ${req.user?.name} | Filter: ${JSON.stringify(filter)}`);

//         const courses = await Course.find(filter)
//             .populate('facilitatorIds', 'name email avatarUrl role')
//             .populate('picIds', 'name email avatarUrl role')
//             .sort(sort as string)
//             .limit(Number(limit))
//             .skip((Number(page) - 1) * Number(limit));

//         const total = await Course.countDocuments(filter);

//         res.json({
//             courses,
//             totalPages: Math.ceil(total / Number(limit)),
//             currentPage: Number(page)
//         });
//     } catch (error: any) {
//         console.error("Get Courses Error:", error);
//         res.status(500).json({ error: error.message });
//     }
// };

// export const getCourseById = async (req: Request, res: Response) => { try { const course = await Course.findById(req.params.id).populate('facilitatorIds', 'name email avatarUrl role bio').populate('picIds', 'name email avatarUrl role').populate({ path: 'modules', populate: { path: 'lessons' } }); if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' }); res.json({ course }); } catch (error: any) { res.status(500).json({ error: error.message }); } };

// export const updateCourse = async (req: Request, res: Response) => { 
//     try { 
//         const updateData = { ...req.body }; 
//         if (updateData.picIds && !Array.isArray(updateData.picIds)) delete updateData.picIds; 
//         const course = await Course.findByIdAndUpdate(req.params.id, updateData, { new: true }); 
//         if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' }); 
//         res.json(course); 
//     } catch (error: any) { 
//         res.status(400).json({ error: error.message }); 
//     } 
// };

// export const deleteCourse = async (req: Request, res: Response) => { try { const course = await Course.findByIdAndDelete(req.params.id); if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' }); await Enrollment.deleteMany({ course: req.params.id }); await Progress.deleteMany({ courseId: req.params.id }); res.json({ message: 'Kursus berhasil dihapus' }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// export const addModule = async (req: Request, res: Response) => { try { const { id } = req.params; const course = await Course.findById(id); if (!course) return res.status(404).json({ error: 'Course not found' }); course.modules.push(req.body); await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// export const updateModule = async (req: Request, res: Response) => { try { const { courseId, moduleId } = req.params; const cId = courseId || req.params.id; const course = await Course.findById(cId); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.id(moduleId); if (!module) return res.status(404).json({ error: 'Module not found' }); module.set(req.body); await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// export const deleteModule = async (req: Request, res: Response) => { try { const { id, moduleId } = req.params; const course = await Course.findByIdAndUpdate( id, { $pull: { modules: { _id: moduleId } } }, { new: true } ); if (!course) return res.status(404).json({ error: 'Not found' }); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };

// // ==========================================
// // [FIX] LESSON CONTROLLERS (Handle courseId or id)
// // ==========================================

// export const addLesson = async (req: Request, res: Response) => { 
//     try { 
//         const { moduleId } = req.params;
//         // [FIX] Ambil ID dari 'courseId' (Routes) atau 'id' (Controller Logic lain)
//         const courseId = req.params.courseId || req.params.id; 

//         const course = await Course.findById(courseId); 
//         if (!course) return res.status(404).json({ error: 'Course not found' }); 
        
//         const module = course.modules.id(moduleId); 
//         if (!module) return res.status(404).json({ error: 'Module not found' }); 
        
//         module.lessons.push(req.body); 
//         await course.save(); 
//         res.json(course); 
//     } catch (error: any) { 
//         res.status(500).json({ error: error.message }); 
//     } 
// };

// export const updateLesson = async (req: Request, res: Response) => { 
//     try { 
//         const { moduleId, lessonId } = req.params; 
//         const courseId = req.params.courseId || req.params.id; 

//         const course = await Course.findById(courseId); 
//         if (!course) return res.status(404).json({ error: 'Course not found' }); 
        
//         const module = course.modules.id(moduleId); 
//         if (!module) return res.status(404).json({ error: 'Module not found' }); 
        
//         const lesson = module.lessons.id(lessonId); 
//         if (!lesson) return res.status(404).json({ error: 'Lesson not found' }); 
        
//         lesson.set(req.body); 
//         await course.save(); 
//         res.json(course); 
//     } catch (error: any) { 
//         res.status(500).json({ error: error.message }); 
//     } 
// };

// export const deleteLesson = async (req: Request, res: Response) => { 
//     try { 
//         const { moduleId, lessonId } = req.params; 
//         const courseId = req.params.courseId || req.params.id; 

//         const course = await Course.findById(courseId); 
//         if (!course) return res.status(404).json({ error: 'Course not found' }); 
        
//         const module = course.modules.id(moduleId); 
//         if (module) { 
//             module.lessons.pull({ _id: lessonId }); 
//             await course.save(); 
//         } 
//         res.json(course); 
//     } catch (error: any) { 
//         res.status(500).json({ error: error.message }); 
//     } 
// };

// export const togglePublishCourse = async (req: Request, res: Response) => { try { const { id } = req.params; const course = await Course.findById(id); if (!course) return res.status(404).json({ error: 'Course not found' }); const newPublishedState = !course.isPublished; const newStatus = newPublishedState ? 'published' : 'draft'; course.isPublished = newPublishedState; course.status = newStatus; await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// export const toggleStatus = togglePublishCourse;
// export const reorderModules = async (req: Request, res: Response) => { try { const { id } = req.params; const { modules } = req.body; await Course.findByIdAndUpdate(id, { modules }); res.json({ message: 'Urutan disimpan' }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// export const updateGradingScheme = async (req: Request, res: Response) => { try { const { id } = req.params; const { modules } = req.body; if (!modules) return res.status(400).json({ error: "Data modul diperlukan" }); const course = await Course.findByIdAndUpdate(id, { modules }, { new: true }); if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' }); res.json({ message: 'Skema penilaian berhasil disimpan', course }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// export const enrollCourse = async (req: any, res: Response) => { try { const { courseId } = req.params; const userId = req.user?.id; const { registrationData } = req.body; if (!userId) return res.status(401).json({ error: 'Unauthorized' }); const course = await Course.findById(courseId); if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' }); const existing = await Enrollment.findOne({ user: userId, course: courseId }); if (existing) return res.status(400).json({ error: 'Anda sudah mendaftar.' }); let initialStatus = 'pending'; let joinedAtDate = undefined; if (course.registrationMode === 'automatic') { initialStatus = 'active'; joinedAtDate = new Date(); } const newEnrollment = new Enrollment({ user: userId, course: courseId, status: initialStatus, progress: 0, isCompleted: false, enrolledAt: new Date(), joinedAt: joinedAtDate, registrationData: registrationData || {} }); await newEnrollment.save(); const msg = course.registrationMode === 'automatic' ? 'Pendaftaran berhasil! Mulai belajar.' : 'Pendaftaran berhasil. Tunggu verifikasi.'; res.status(201).json({ message: msg, enrollment: newEnrollment }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// export const verifyEnrollment = async (req: Request, res: Response) => { try { const { enrollmentId, action } = req.body; if (action === 'reject') { await Enrollment.findByIdAndDelete(enrollmentId); return res.json({ message: "Pendaftaran ditolak." }); } if (action === 'approve') { await Enrollment.findByIdAndUpdate(enrollmentId, { status: 'active', joinedAt: new Date() }); return res.json({ message: "Pendaftaran disetujui." }); } res.status(400).json({ error: "Aksi tidak valid" }); } catch (error: any) { res.status(500).json({ error: error.message }); } };

// // [FIX] CHECK ENROLLMENT STATUS (BYPASS SUPER ADMIN)
// export const checkEnrollmentStatus = async (req: any, res: Response) => { 
//     try { 
//         const { courseId } = req.params; 
//         const userId = req.user?.id; 
//         if (!userId) return res.status(401).json({ error: 'Unauthorized' }); 

//         // [BYPASS] Jika Super Admin atau Fasilitator, dianggap sudah enroll
//         if (req.user?.role === 'SUPER_ADMIN' || req.user?.role === 'FACILITATOR') {
//             return res.json({ isEnrolled: true, status: 'active', progress: 0 });
//         }

//         const enrollment = await Enrollment.findOne({ user: userId, course: courseId }); 
//         if (!enrollment) return res.json({ isEnrolled: false, status: null }); 
//         res.json({ isEnrolled: true, status: enrollment.status, progress: enrollment.progress }); 
//     } catch (error: any) { 
//         res.status(500).json({ error: error.message }); 
//     } 
// };

// export const getCourseParticipants = async (req: Request, res: Response) => { try { res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate'); const { id } = req.params; const enrollments = await Enrollment.find({ course: id }).populate('user', 'name email avatarUrl role').sort({ createdAt: -1 }).lean(); if (!enrollments.length) return res.json({ participants: [] }); const userIds = enrollments.map((e: any) => e.user?._id); const progressRecords = await Progress.find({ courseId: id, userId: { $in: userIds } }).lean(); const course: any = await Course.findById(id).select('modules').lean(); let totalLessons = 0; const validLessonIds = new Set<string>(); if (course && course.modules) { course.modules.forEach((m: any) => { if (m.isActive) { m.lessons.forEach((l: any) => { if (l.isActive) { totalLessons++; validLessonIds.add(l._id.toString()); } }); } }); } const participants = await Promise.all(enrollments.map(async (enroll: any) => { const userObj = enroll.user || {}; const detail = progressRecords.find((p: any) => p.userId.toString() === userObj._id?.toString()); let calculatedProgress = 0; let completedIds: string[] = []; if ((enroll.status === 'active' || enroll.status === 'approved') && detail) { const rawCompleted = detail.completedLessons.map((id: any) => id.toString()); completedIds = rawCompleted.filter((id: any) => validLessonIds.has(id)); if (totalLessons > 0) calculatedProgress = Math.round((completedIds.length / totalLessons) * 100); if (calculatedProgress > 100) calculatedProgress = 100; } return { _id: enroll._id, user: { _id: userObj._id, name: userObj.name, email: userObj.email, avatarUrl: userObj.avatarUrl, role: userObj.role }, registrationData: enroll.registrationData || {}, status: enroll.status || 'pending', progress: calculatedProgress, completedLessons: completedIds, lessonDetails: detail ? detail.lessonDetails : [] }; })); res.json({ participants }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// export const markCompleteLessonByAdmin = async (req: Request, res: Response) => { try { const { studentId, lessonId, courseId } = req.body; let progress = await Progress.findOne({ userId: studentId, courseId }); if (!progress) progress = new Progress({ userId: studentId, courseId, completedLessons: [] }); const strLessonId = lessonId.toString(); if (!progress.completedLessons.some((id: any) => id.toString() === strLessonId)) { progress.completedLessons.push(lessonId); await progress.save(); } res.json({ message: 'Berhasil diluluskan' }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// export const resetQuizByAdmin = async (req: Request, res: Response) => { try { const { studentId, quizId } = req.body; if (!studentId || !quizId) return res.status(400).json({ error: "Data incomplete" }); await Progress.findOneAndUpdate({ userId: studentId }, { $pull: { completedLessons: quizId } }); res.json({ message: 'Reset berhasil' }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// export const getGroupMessages = async (req: any, res: Response) => { try { const { id } = req.params; const { type } = req.query; const query: any = { course: id, type: type || 'public' }; const messages = await Message.find(query).populate('sender', 'name avatarUrl role').sort({ createdAt: 1 }); res.json(messages); } catch (error: any) { res.status(500).json({ error: error.message }); } };
// export const sendGroupMessage = async (req: any, res: Response) => { try { const { id } = req.params; const { text, type, attachment } = req.body; const userId = req.user?.id; const newMessage = new Message({ course: id, sender: userId, message: text || '', type: type || 'public', isRead: false, isGlobal: false, attachment: attachment || null }); await newMessage.save(); await newMessage.populate('sender', 'name avatarUrl role'); res.status(201).json(newMessage); } catch (error: any) { res.status(500).json({ error: error.message }); } };

// // =======================================================
// // UPDATE COURSE STATUS (DENGAN HIERARKI WILAYAH)
// // =======================================================
// export const updateCourseStatus = async (req: any, res: Response) => {
//     try {
//         const { id } = req.params;
//         const { status } = req.body; 
//         const user = req.user;

//         if (!user) return res.status(401).json({ error: 'Unauthorized' });

//         const course = await Course.findById(id);
//         if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });

//         // Logic Akses
//         let hasAccess = false;
//         if (user.role === 'SUPER_ADMIN') hasAccess = true;
//         else if (user.role === 'ADMIN') {
//             if (user.regionScope === 'national') {
//                 hasAccess = true;
//             } else {
//                 const courseRegion = String(course.regionCode || ''); 
//                 if (user.regionScope === 'province') {
//                     const myProvs = user.managedProvinces || []; 
//                     hasAccess = myProvs.some((p: string) => courseRegion.startsWith(p));
//                 } else if (user.regionScope === 'regency') {
//                     const myRegs = user.managedRegencies || [];
//                     hasAccess = myRegs.includes(courseRegion);
//                 }
//             }
//         }

//         if (!hasAccess) return res.status(403).json({ error: 'Akses Ditolak: Di luar wilayah wewenang.' });

//         course.status = status;
        
//         if (status === 'draft' || status === 'ready') {
//             (course as any).approvedBy = user.id;
//             (course as any).approvedAt = new Date();
//         }

//         await course.save();
//         res.json(course);
//     } catch (error: any) {
//         res.status(500).json({ error: error.message });
//     }
// };

import { Request, Response } from 'express';
import { Course } from '../models/Course';
import { Enrollment } from '../models/Enrollment';
import { Progress } from '../models/Progress';
import { Message } from '../models/Message';
import { User } from '../models/User'; 
import { AuthedRequest } from '../middleware/auth';
import slugify from 'slugify';
import mongoose from 'mongoose';

// --- HELPER: GENERATE SLUG ---
const generateSlug = async (title: string) => {
    let slug = slugify(title, { lower: true, strict: true });
    const exists = await Course.findOne({ slug });
    if (exists) slug = `${slug}-${Date.now()}`;
    return slug;
};

// --- HELPER: SYNC MANUAL DARI MEMORI (ANTI RACE CONDITION) ---
// [FIX] Terima parameter 'cleanCompletedList' sebagai string[] untuk menghindari error TS
const syncEnrollmentFromMemory = async (userId: string, courseId: string, cleanCompletedList: string[]) => {
    try {
        const course: any = await Course.findById(courseId).select('modules');
        if (!course) return;

        let totalLessons = 0;
        const validLessonIds = new Set<string>();

        if (course.modules) {
            course.modules.forEach((m: any) => {
                if (m.isActive) {
                    m.lessons.forEach((l: any) => {
                        if (l.isActive) {
                            totalLessons++;
                            validLessonIds.add(l._id.toString());
                        }
                    });
                }
            });
        }

        // Hitung jumlah selesai berdasarkan LIST MEMORI
        const validCompletedCount = cleanCompletedList.filter(id => validLessonIds.has(id)).length;
        
        let percentage = totalLessons > 0 ? Math.round((validCompletedCount / totalLessons) * 100) : 0;
        if (percentage > 100) percentage = 100;

        console.log(`[SYNC MEMORY] User: ${userId} | Count: ${validCompletedCount}/${totalLessons} | New %: ${percentage}`);

        // Paksa Update Enrollment
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
    } catch (e) {
        console.error("[SYNC ERROR]", e);
    }
};

// ==========================================
// 1. STANDARD CRUD COURSE
// ==========================================

export const createCourse = async (req: AuthedRequest, res: Response) => {
    try {
        const data = req.body;
        let regionCode = data.regionCode || 'national'; 

        if (req.user?.role === 'ADMIN') {
            const userScope = (req.user.regionScope || 'national').toLowerCase();
            if (userScope === 'province') regionCode = req.user.managedProvinces?.[0] || 'national';
            else if (userScope === 'regency') regionCode = req.user.managedRegencies?.[0] || 'national';
        }

        if (!data.slug && data.title) data.slug = await generateSlug(data.title);
        if (!data.status) data.status = 'draft';
        if (!data.programType) data.programType = 'course'; 

        const facilitatorIds = data.facilitatorIds || [req.user?.id];
        const picIds = data.picIds || [];

        const course = new Course({
            ...data, regionCode, facilitatorIds, picIds,
            creatorInfo: { id: req.user?.id, name: req.user?.name, email: req.user?.email, role: req.user?.role }
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
        const filter: any = {}; 
        
        const isCatalogRequest = isPublished === 'true';

        if (isCatalogRequest) {
            filter.isPublished = true;
            if (!status) filter.status = { $in: ['published', 'ready'] };
            else filter.status = { $in: (status as string).split(',') };
        } else {
            const currentUser = req.user;
            if (type) {
                if (type === 'training' || type === 'course') filter.programType = { $in: ['training', 'course'] };
                else filter.programType = type;
            }
            if (status && status !== 'ALL') filter.status = { $in: (status as string).split(',') };
            if (currentUser?.role === 'FACILITATOR') {
                filter.$or = [{ 'creatorInfo.id': currentUser.id }, { facilitatorIds: currentUser.id }];
            }
        }

        if (search) filter.title = { $regex: search, $options: 'i' };

        const courses = await Course.find(filter)
            .populate('facilitatorIds', 'name email avatarUrl role')
            .populate('picIds', 'name email avatarUrl role')
            .sort(sort as string)
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit));

        const total = await Course.countDocuments(filter);
        res.json({ courses, totalPages: Math.ceil(total / Number(limit)), currentPage: Number(page) });
    } catch (error: any) { res.status(500).json({ error: error.message }); }
};

export const getCourseById = async (req: Request, res: Response) => { try { const course = await Course.findById(req.params.id).populate('facilitatorIds', 'name email avatarUrl role bio').populate('picIds', 'name email avatarUrl role').populate({ path: 'modules', populate: { path: 'lessons' } }); if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' }); res.json({ course }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
export const updateCourse = async (req: Request, res: Response) => { try { const updateData = { ...req.body }; if (updateData.picIds && !Array.isArray(updateData.picIds)) delete updateData.picIds; const course = await Course.findByIdAndUpdate(req.params.id, updateData, { new: true }); if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' }); res.json(course); } catch (error: any) { res.status(400).json({ error: error.message }); } };
export const deleteCourse = async (req: Request, res: Response) => { try { const course = await Course.findByIdAndDelete(req.params.id); if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' }); await Enrollment.deleteMany({ course: req.params.id }); await Progress.deleteMany({ courseId: req.params.id }); res.json({ message: 'Kursus berhasil dihapus' }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
export const addModule = async (req: Request, res: Response) => { try { const { id } = req.params; const course = await Course.findById(id); if (!course) return res.status(404).json({ error: 'Course not found' }); course.modules.push(req.body); await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
export const updateModule = async (req: Request, res: Response) => { try { const { courseId, moduleId } = req.params; const cId = courseId || req.params.id; const course = await Course.findById(cId); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.id(moduleId); if (!module) return res.status(404).json({ error: 'Module not found' }); module.set(req.body); await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
export const deleteModule = async (req: Request, res: Response) => { try { const { id, moduleId } = req.params; const course = await Course.findByIdAndUpdate( id, { $pull: { modules: { _id: moduleId } } }, { new: true } ); if (!course) return res.status(404).json({ error: 'Not found' }); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
export const addLesson = async (req: Request, res: Response) => { try { const { moduleId } = req.params; const courseId = req.params.courseId || req.params.id; const course = await Course.findById(courseId); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.id(moduleId); if (!module) return res.status(404).json({ error: 'Module not found' }); module.lessons.push(req.body); await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
export const updateLesson = async (req: Request, res: Response) => { try { const { moduleId, lessonId } = req.params; const courseId = req.params.courseId || req.params.id; const course = await Course.findById(courseId); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.id(moduleId); if (!module) return res.status(404).json({ error: 'Module not found' }); const lesson = module.lessons.id(lessonId); if (!lesson) return res.status(404).json({ error: 'Lesson not found' }); lesson.set(req.body); await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
export const deleteLesson = async (req: Request, res: Response) => { try { const { moduleId, lessonId } = req.params; const courseId = req.params.courseId || req.params.id; const course = await Course.findById(courseId); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.id(moduleId); if (module) { module.lessons.pull({ _id: lessonId }); await course.save(); } res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
export const togglePublishCourse = async (req: Request, res: Response) => { try { const { id } = req.params; const course = await Course.findById(id); if (!course) return res.status(404).json({ error: 'Course not found' }); const newPublishedState = !course.isPublished; const newStatus = newPublishedState ? 'published' : 'draft'; course.isPublished = newPublishedState; course.status = newStatus; await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };
export const toggleStatus = togglePublishCourse;
export const reorderModules = async (req: Request, res: Response) => { try { const { id } = req.params; const { modules } = req.body; await Course.findByIdAndUpdate(id, { modules }); res.json({ message: 'Urutan disimpan' }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
export const updateGradingScheme = async (req: Request, res: Response) => { try { const { id } = req.params; const { modules } = req.body; if (!modules) return res.status(400).json({ error: "Data modul diperlukan" }); const course = await Course.findByIdAndUpdate(id, { modules }, { new: true }); if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' }); res.json({ message: 'Skema penilaian berhasil disimpan', course }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
export const enrollCourse = async (req: any, res: Response) => { try { const { courseId } = req.params; const userId = req.user?.id; const { registrationData } = req.body; if (!userId) return res.status(401).json({ error: 'Unauthorized' }); const course = await Course.findById(courseId); if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' }); const existing = await Enrollment.findOne({ user: userId, course: courseId }); if (existing) return res.status(400).json({ error: 'Anda sudah mendaftar.' }); let initialStatus = 'pending'; let joinedAtDate = undefined; if (course.registrationMode === 'automatic') { initialStatus = 'active'; joinedAtDate = new Date(); } const newEnrollment = new Enrollment({ user: userId, course: courseId, status: initialStatus, progress: 0, isCompleted: false, enrolledAt: new Date(), joinedAt: joinedAtDate, registrationData: registrationData || {} }); await newEnrollment.save(); const msg = course.registrationMode === 'automatic' ? 'Pendaftaran berhasil! Mulai belajar.' : 'Pendaftaran berhasil. Tunggu verifikasi.'; res.status(201).json({ message: msg, enrollment: newEnrollment }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
export const verifyEnrollment = async (req: Request, res: Response) => { try { const { enrollmentId, action } = req.body; if (action === 'reject') { await Enrollment.findByIdAndDelete(enrollmentId); return res.json({ message: "Pendaftaran ditolak." }); } if (action === 'approve') { await Enrollment.findByIdAndUpdate(enrollmentId, { status: 'active', joinedAt: new Date() }); return res.json({ message: "Pendaftaran disetujui." }); } res.status(400).json({ error: "Aksi tidak valid" }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
export const checkEnrollmentStatus = async (req: any, res: Response) => { try { const { courseId } = req.params; const userId = req.user?.id; if (!userId) return res.status(401).json({ error: 'Unauthorized' }); if (req.user?.role === 'SUPER_ADMIN' || req.user?.role === 'FACILITATOR') { return res.json({ isEnrolled: true, status: 'active', progress: 0 }); } const enrollment = await Enrollment.findOne({ user: userId, course: courseId }); if (!enrollment) return res.json({ isEnrolled: false, status: null }); res.json({ isEnrolled: true, status: enrollment.status, progress: enrollment.progress }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
export const getCourseParticipants = async (req: Request, res: Response) => { try { res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate'); const { id } = req.params; const enrollments = await Enrollment.find({ course: id }).populate('user', 'name email avatarUrl role').sort({ createdAt: -1 }).lean(); if (!enrollments.length) return res.json({ participants: [] }); const userIds = enrollments.map((e: any) => e.user?._id); const progressRecords = await Progress.find({ courseId: id, userId: { $in: userIds } }).lean(); const course: any = await Course.findById(id).select('modules').lean(); let totalLessons = 0; const validLessonIds = new Set<string>(); if (course && course.modules) { course.modules.forEach((m: any) => { if (m.isActive) { m.lessons.forEach((l: any) => { if (l.isActive) { totalLessons++; validLessonIds.add(l._id.toString()); } }); } }); } const participants = await Promise.all(enrollments.map(async (enroll: any) => { const userObj = enroll.user || {}; const detail = progressRecords.find((p: any) => p.userId.toString() === userObj._id?.toString()); let calculatedProgress = 0; let completedIds: string[] = []; if ((enroll.status === 'active' || enroll.status === 'approved') && detail) { const rawCompleted = detail.completedLessons.map((id: any) => id.toString()); completedIds = rawCompleted.filter((id: any) => validLessonIds.has(id)); if (totalLessons > 0) calculatedProgress = Math.round((completedIds.length / totalLessons) * 100); if (calculatedProgress > 100) calculatedProgress = 100; } return { _id: enroll._id, user: { _id: userObj._id, name: userObj.name, email: userObj.email, avatarUrl: userObj.avatarUrl, role: userObj.role }, registrationData: enroll.registrationData || {}, status: enroll.status || 'pending', progress: calculatedProgress, completedLessons: completedIds, lessonDetails: detail ? detail.lessonDetails : [] }; })); res.json({ participants }); } catch (error: any) { res.status(500).json({ error: error.message }); } };
export const getGroupMessages = async (req: any, res: Response) => { try { const { id } = req.params; const { type } = req.query; const query: any = { course: id, type: type || 'public' }; const messages = await Message.find(query).populate('sender', 'name avatarUrl role').sort({ createdAt: 1 }); res.json(messages); } catch (error: any) { res.status(500).json({ error: error.message }); } };
export const sendGroupMessage = async (req: any, res: Response) => { try { const { id } = req.params; const { text, type, attachment } = req.body; const userId = req.user?.id; const newMessage = new Message({ course: id, sender: userId, message: text || '', type: type || 'public', isRead: false, isGlobal: false, attachment: attachment || null }); await newMessage.save(); await newMessage.populate('sender', 'name avatarUrl role'); res.status(201).json(newMessage); } catch (error: any) { res.status(500).json({ error: error.message }); } };
export const updateCourseStatus = async (req: any, res: Response) => { try { const { id } = req.params; const { status } = req.body; const user = req.user; if (!user) return res.status(401).json({ error: 'Unauthorized' }); const course = await Course.findById(id); if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' }); let hasAccess = false; if (user.role === 'SUPER_ADMIN') hasAccess = true; else if (user.role === 'ADMIN') { if (user.regionScope === 'national') { hasAccess = true; } else { const courseRegion = String(course.regionCode || ''); if (user.regionScope === 'province') { const myProvs = user.managedProvinces || []; hasAccess = myProvs.some((p: string) => courseRegion.startsWith(p)); } else if (user.regionScope === 'regency') { const myRegs = user.managedRegencies || []; hasAccess = myRegs.includes(courseRegion); } } } if (!hasAccess) return res.status(403).json({ error: 'Akses Ditolak: Di luar wilayah wewenang.' }); course.status = status; if (status === 'draft' || status === 'ready') { (course as any).approvedBy = user.id; (course as any).approvedAt = new Date(); } await course.save(); res.json(course); } catch (error: any) { res.status(500).json({ error: error.message }); } };

// [FIX 404] DUMMY ROUTE COUNT
export const getMessageCount = async (req: any, res: Response) => { res.json({ count: 0 }); };

// =========================================================================
// [FIXED] ADMIN TOOLS (MARK COMPLETE & RESET)
// =========================================================================

// 1. Mark Complete Manual
export const markCompleteLessonByAdmin = async (req: Request, res: Response) => {
    try {
        const { studentId, lessonId, courseId } = req.body;
        const strLessonId = lessonId.toString();

        let progress = await Progress.findOne({ userId: studentId, courseId });
        if (!progress) {
            progress = new Progress({ userId: studentId, courseId, completedLessons: [] });
        }
        
        if (!progress.completedLessons.some((id: any) => id.toString() === strLessonId)) {
            progress.completedLessons.push(lessonId);
            await progress.save();
            
            // [FIX TS] Convert ObjectId[] -> string[]
            const completedListStr = progress.completedLessons.map((id: any) => id.toString());
            
            await syncEnrollmentFromMemory(studentId, courseId, completedListStr);
        }

        res.json({ message: 'Berhasil diluluskan manual' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// 2. Reset Progress (HARD RESET - MEMORY FIRST)
export const resetQuizByAdmin = async (req: Request, res: Response) => {
    try {
        const { studentId, quizId } = req.body; 

        if (!studentId || !quizId) return res.status(400).json({ error: "Data incomplete" });

        const progress = await Progress.findOne({ userId: studentId });

        if (progress) {
            const targetIdStr = String(quizId);

            console.log(`[RESET] Removing ${targetIdStr} from user ${studentId}`);

            // A. FILTER MANUAL (di Memory)
            const newCompletedList = progress.completedLessons.filter(
                (id: any) => String(id) !== targetIdStr
            );
            
            // Assign array baru ke object
            progress.completedLessons = newCompletedList as any;

            // Hapus juga detail jawaban
            if (progress.lessonDetails && progress.lessonDetails.length > 0) {
                progress.lessonDetails = progress.lessonDetails.filter(
                    (d: any) => String(d.lessonId) !== targetIdStr
                );
            }

            // B. SIMPAN KE DB (Semoga koneksi tidak timeout)
            progress.markModified('completedLessons');
            await progress.save();

            // C. SYNC ENROLLMENT DARI MEMORI
            // [FIX TS] Convert ObjectId[] -> string[] sebelum dikirim
            const completedListStr = newCompletedList.map((id: any) => id.toString());
            
            await syncEnrollmentFromMemory(studentId, progress.courseId.toString(), completedListStr);

            res.json({ message: 'Reset berhasil.', remaining: newCompletedList.length });
        } else {
            res.json({ message: 'Data progress tidak ditemukan.' });
        }
    } catch (error: any) {
        console.error("Reset Error:", error);
        res.status(500).json({ error: error.message });
    }
};
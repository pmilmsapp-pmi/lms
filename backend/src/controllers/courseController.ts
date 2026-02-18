import { Request, Response } from 'express';
import { Course } from '../models/Course';
import { Enrollment } from '../models/Enrollment';
import { Progress } from '../models/Progress';
import { Message } from '../models/Message';
import { User } from '../models/User'; 
import { AuthedRequest } from '../middleware/auth';
import slugify from 'slugify';
import mongoose from 'mongoose';

const generateSlug = async (title: string) => {
    let slug = slugify(title, { lower: true, strict: true });
    const exists = await Course.findOne({ slug });
    if (exists) slug = `${slug}-${Date.now()}`;
    return slug;
};

// --- HELPER CRITICAL: HITUNG & UPDATE ENROLLMENT DARI MEMORY ---
const syncEnrollmentForce = async (userId: string, courseId: string, finalCompletedCount: number) => {
    try {
        const course: any = await Course.findById(courseId).select('modules');
        
        let totalLessons = 0;
        // Hitung total materi AKTIF saja
        if (course?.modules) {
            course.modules.forEach((m: any) => {
                if (m.isActive) {
                    m.lessons.forEach((l: any) => {
                        if (l.isActive) totalLessons++;
                    });
                }
            });
        }

        // Kalkulasi Persen
        let percentage = totalLessons > 0 ? Math.round((finalCompletedCount / totalLessons) * 100) : 0;
        if (percentage > 100) percentage = 100;

        console.log(`[SYNC FORCE] User: ${userId} | Count: ${finalCompletedCount}/${totalLessons} | New %: ${percentage}`);

        // Update Enrollment secara paksa
        await Enrollment.findOneAndUpdate(
            { user: userId, course: courseId },
            { 
                $set: {
                    progress: percentage,
                    isCompleted: percentage === 100,
                    completedAt: percentage === 100 ? new Date() : null
                }
            },
            { new: true }
        );
    } catch (e) {
        console.error("[SYNC ERROR]", e);
    }
};

// =========================================================================
// FITUR RESET & LULUSKAN (ADMIN TOOLS)
// =========================================================================

// 1. Reset Progress
export const resetQuizByAdmin = async (req: Request, res: Response) => {
    try {
        const { studentId, quizId, courseId } = req.body; 

        if (!studentId || !quizId || !courseId) {
            return res.status(400).json({ error: "Data incomplete (Missing courseId)" });
        }

        console.log(`[RESET START] User: ${studentId} | Target: ${quizId}`);

        const progress = await Progress.findOne({ userId: studentId, courseId: courseId });

        if (!progress) {
            await syncEnrollmentForce(studentId, courseId, 0);
            return res.json({ message: 'Data progress tidak ditemukan, enrollment dipaksa 0%.' });
        }

        const targetIdStr = String(quizId);
        const initialCount = progress.completedLessons.length;

        const newCompleted = progress.completedLessons.filter(
            (id: any) => String(id) !== targetIdStr
        );
        
        const newDetails = progress.lessonDetails.filter(
            (d: any) => String(d.lessonId) !== targetIdStr
        );

        progress.completedLessons = newCompleted as any;
        progress.lessonDetails = newDetails;
        
        if (progress.isCompleted) progress.isCompleted = false;

        console.log(`[RESET DEBUG] Count: ${initialCount} -> ${newCompleted.length}`);

        progress.markModified('completedLessons');
        progress.markModified('lessonDetails');
        await progress.save();

        await syncEnrollmentForce(studentId, courseId, newCompleted.length);

        res.json({ message: 'Reset berhasil.', remaining: newCompleted.length });

    } catch (error: any) {
        console.error("Reset Error:", error);
        res.status(500).json({ error: error.message });
    }
};

// 2. Mark Complete Manual
export const markCompleteLessonByAdmin = async (req: Request, res: Response) => {
    try {
        const { studentId, lessonId, courseId } = req.body;
        const strId = String(lessonId);

        let progress = await Progress.findOne({ userId: studentId, courseId });
        if (!progress) {
            progress = new Progress({ userId: studentId, courseId, completedLessons: [] });
        }
        
        const exists = progress.completedLessons.some((id: any) => String(id) === strId);

        if (!exists) {
            progress.completedLessons.push(lessonId);
            progress.lessonDetails.push({
                lessonId: lessonId,
                type: 'manual_pass_by_admin',
                submittedAt: new Date()
            });

            await progress.save();
            await syncEnrollmentForce(studentId, courseId, progress.completedLessons.length);
        }

        res.json({ message: 'Berhasil diluluskan manual' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// 3. Debug Tool
export const checkStudentProgress = async (req: Request, res: Response) => {
    try {
        const { studentId, courseId } = req.params;
        const progress = await Progress.findOne({ userId: studentId, courseId });
        const enrollment = await Enrollment.findOne({ user: studentId, course: courseId });
        res.json({
            studentId,
            progressData: progress ? {
                completedCount: progress.completedLessons.length,
                completedIDs: progress.completedLessons,
                details: progress.lessonDetails,
                quizScores: (progress as any).quizScores // Support legacy
            } : 'No Progress',
            enrollmentData: enrollment ? {
                percent: enrollment.progress,
                isCompleted: enrollment.isCompleted
            } : 'No Enrollment'
        });
    } catch (e: any) { res.status(500).json({error: e.message}); }
};

export const getMessageCount = async (req: any, res: Response) => {
    res.json({ count: 0 });
};

// ==========================================
// CRUD BASIC (Create, Get, Update, Delete)
// ==========================================
export const createCourse = async (req: AuthedRequest, res: Response) => {
    try {
        const data = req.body;
        let regionCode = data.regionCode || 'national'; 
        
        // Auto-set Region Code based on Admin
        if (req.user?.role === 'ADMIN') {
            const userScope = (req.user.regionScope || 'national').toLowerCase();
            if (userScope === 'province') regionCode = req.user.managedProvinces?.[0] || 'national';
            else if (userScope === 'regency') regionCode = req.user.managedRegencies?.[0] || 'national';
        } 
        // [FIX] Auto-set Region for Facilitator (Cast to any to access memberData)
        else if (req.user?.role === 'FACILITATOR') {
             const u = req.user as any; // Type Assertion to bypass TS Error
             if (u.memberData?.regencyCode) {
                regionCode = u.memberData.regencyCode;
             }
        }

        if (!data.slug && data.title) data.slug = await generateSlug(data.title);
        if (!data.status) data.status = 'draft';
        
        const course = new Course({ 
            ...data, 
            regionCode, 
            facilitatorIds: data.facilitatorIds || [req.user?.id], 
            picIds: data.picIds || [], 
            targetParticipants: data.targetParticipants || [], 
            creatorInfo: { 
                id: req.user?.id, 
                name: req.user?.name, 
                email: req.user?.email, 
                role: req.user?.role 
            } 
        });
        await course.save();
        res.status(201).json(course);
    } catch (error: any) { res.status(400).json({ error: error.message }); }
};

export const getCourses = async (req: any, res: Response) => {
    try {
        const { status, search, type, limit = 50, page = 1, sort = '-createdAt', isPublished } = req.query;
        const filter: any = {};
        const isCatalog = isPublished === 'true';
        
        if (isCatalog) {
            filter.isPublished = true;
            if (!status) filter.status = { $in: ['published', 'ready'] };
            else filter.status = { $in: (status as string).split(',') };
        } else {
            if (status) filter.status = { $in: (status as string).split(',') };
            const user = req.user;

            if (user) {
                if (user.role === 'FACILITATOR') {
                    filter.$or = [
                        { 'creatorInfo.id': user.id }, 
                        { facilitatorIds: user.id }
                    ];
                }
                else if (user.role === 'ADMIN') {
                    if (user.regionScope !== 'national') {
                        const regionQueries: any[] = [];
                        
                        if (user.regionScope === 'province' && user.managedProvinces?.length > 0) {
                            user.managedProvinces.forEach((code: string) => {
                                regionQueries.push({ regionCode: { $regex: `^${code.trim()}` } });
                            });
                        }

                        if (user.regionScope === 'regency' && user.managedRegencies?.length > 0) {
                            regionQueries.push({ regionCode: { $in: user.managedRegencies } });
                        }

                        if (regionQueries.length > 0) {
                            filter.$or = regionQueries;
                        } else {
                            return res.json({ courses: [], totalPages: 0, currentPage: 1 });
                        }
                    }
                }
            }
        }
        
        if (search) filter.title = { $regex: search, $options: 'i' };
        if (type && type !== 'all') filter.programType = type;

        const courses = await Course.find(filter)
            .populate('facilitatorIds', 'name email avatarUrl role')
            .populate('picIds', 'name email avatarUrl role')
            .sort(sort as string)
            .limit(Number(limit))
            .skip((Number(page)-1)*Number(limit));
            
        const total = await Course.countDocuments(filter);
        res.json({ courses, totalPages: Math.ceil(total/Number(limit)), currentPage: Number(page) });

    } catch (e: any) { 
        res.status(500).json({error: e.message}); 
    }
};

export const getCourseById = async (req: Request, res: Response) => { try { const course = await Course.findById(req.params.id).populate('facilitatorIds', 'name email avatarUrl role bio').populate('picIds', 'name email avatarUrl role').populate({ path: 'modules', populate: { path: 'lessons' } }); if (!course) return res.status(404).json({ error: 'Not found' }); res.json({ course }); } catch (e: any) { res.status(500).json({error: e.message}); } };
export const updateCourse = async (req: Request, res: Response) => { try { const c = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.json(c); } catch (e: any) { res.status(400).json({error: e.message}); } };
export const deleteCourse = async (req: Request, res: Response) => { try { await Course.findByIdAndDelete(req.params.id); await Enrollment.deleteMany({ course: req.params.id }); await Progress.deleteMany({ courseId: req.params.id }); res.json({ message: 'Deleted' }); } catch (e: any) { res.status(500).json({error: e.message}); } };

// --- MODULES & LESSONS ---
export const addModule = async (req: Request, res: Response) => { try { const c = await Course.findById(req.params.id); c?.modules.push(req.body); await c?.save(); res.json(c); } catch (e: any) { res.status(500).json({error: e.message}); } };
export const updateModule = async (req: Request, res: Response) => { try { const c = await Course.findById(req.params.courseId); c?.modules.id(req.params.moduleId)?.set(req.body); await c?.save(); res.json(c); } catch (e: any) { res.status(500).json({error: e.message}); } };
export const deleteModule = async (req: Request, res: Response) => { try { const c = await Course.findByIdAndUpdate(req.params.id, { $pull: { modules: { _id: req.params.moduleId } } }, { new: true }); res.json(c); } catch (e: any) { res.status(500).json({error: e.message}); } };
export const addLesson = async (req: Request, res: Response) => { try { const c = await Course.findById(req.params.courseId); c?.modules.id(req.params.moduleId)?.lessons.push(req.body); await c?.save(); res.json(c); } catch (e: any) { res.status(500).json({error: e.message}); } };
export const updateLesson = async (req: Request, res: Response) => { try { const c = await Course.findById(req.params.courseId); c?.modules.id(req.params.moduleId)?.lessons.id(req.params.lessonId)?.set(req.body); await c?.save(); res.json(c); } catch (e: any) { res.status(500).json({error: e.message}); } };
export const deleteLesson = async (req: Request, res: Response) => { try { const c = await Course.findById(req.params.courseId); c?.modules.id(req.params.moduleId)?.lessons.pull(req.params.lessonId); await c?.save(); res.json(c); } catch (e: any) { res.status(500).json({error: e.message}); } };
export const togglePublishCourse = async (req: Request, res: Response) => { try { const c = await Course.findById(req.params.id); if(c) { c.isPublished = !c.isPublished; c.status = c.isPublished ? 'published' : 'draft'; await c.save(); res.json(c); } } catch (e: any) { res.status(500).json({error: e.message}); } };
export const toggleStatus = togglePublishCourse;
export const reorderModules = async (req: Request, res: Response) => { try { await Course.findByIdAndUpdate(req.params.id, { modules: req.body.modules }); res.json({ message: 'Saved' }); } catch (e: any) { res.status(500).json({error: e.message}); } };
export const updateGradingScheme = async (req: Request, res: Response) => { try { await Course.findByIdAndUpdate(req.params.id, { modules: req.body.modules }); res.json({ message: 'Saved' }); } catch (e: any) { res.status(500).json({error: e.message}); } };
export const enrollCourse = async (req: any, res: Response) => { try { const { courseId } = req.params; const userId = req.user?.id; if(!userId) return res.status(401).json({error:'Unauthorized'}); const ex = await Enrollment.findOne({user:userId, course:courseId}); if(ex) return res.status(400).json({error:'Enrolled'}); const en = new Enrollment({ user:userId, course:courseId, status:'pending', progress:0, isCompleted:false, enrolledAt:new Date(), registrationData:req.body.registrationData||{} }); await en.save(); res.status(201).json({message:'Success', enrollment:en}); } catch (e: any) { res.status(500).json({error: e.message}); } };
export const verifyEnrollment = async (req: Request, res: Response) => { try { const { enrollmentId, action } = req.body; if(action==='reject') await Enrollment.findByIdAndDelete(enrollmentId); else await Enrollment.findByIdAndUpdate(enrollmentId, {status:'active', joinedAt:new Date()}); res.json({message:'Success'}); } catch (e: any) { res.status(500).json({error: e.message}); } };
export const checkEnrollmentStatus = async (req: any, res: Response) => { try { const userId = req.user?.id; if(!userId) return res.status(401).json({error:'Unauthorized'}); if(req.user.role === 'SUPER_ADMIN' || req.user.role === 'FACILITATOR') return res.json({isEnrolled:true, status:'active'}); const en = await Enrollment.findOne({user:userId, course:req.params.courseId}); if(!en) return res.json({isEnrolled:false}); res.json({isEnrolled:true, status:en.status, progress:en.progress}); } catch (e: any) { res.status(500).json({error: e.message}); } };
export const getCourseParticipants = async (req: Request, res: Response) => { try { res.setHeader('Cache-Control', 'no-store'); const enrollments = await Enrollment.find({ course: req.params.id }).populate('user', 'name email avatarUrl role').sort({ createdAt: -1 }); res.json({ participants: enrollments }); } catch (e: any) { res.status(500).json({error: e.message}); } };
export const getGroupMessages = async (req: any, res: Response) => { try { const m = await Message.find({ course: req.params.id }).populate('sender', 'name avatarUrl role'); res.json(m); } catch (e: any) { res.status(500).json({error: e.message}); } };
export const sendGroupMessage = async (req: any, res: Response) => { try { const m = new Message({ course: req.params.id, sender: req.user.id, message: req.body.text }); await m.save(); res.status(201).json(m); } catch (e: any) { res.status(500).json({error: e.message}); } };
export const updateCourseStatus = async (req: Request, res: Response) => { try { const c = await Course.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true }); res.json(c); } catch (e: any) { res.status(500).json({error: e.message}); } };
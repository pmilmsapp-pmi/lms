// // // // // // // // // // // // // // import { Router, Request, Response } from 'express';
// // // // // // // // // // // // // // import { Course } from '../models/Course'; 
// // // // // // // // // // // // // // import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth'; 
// // // // // // // // // // // // // // import { z } from 'zod';

// // // // // // // // // // // // // // const router = Router();

// // // // // // // // // // // // // // // ==========================================
// // // // // // // // // // // // // // // 1. ZOD SCHEMAS (UPDATED)
// // // // // // // // // // // // // // // ==========================================
// // // // // // // // // // // // // // const lessonSchema = z.object({
// // // // // // // // // // // // // //   title: z.string().min(1),
// // // // // // // // // // // // // //   type: z.enum(['video_url', 'upload_doc', 'quiz', 'essay', 'google_classroom', 'lesson', 'pdf', 'download_doc', 'image', 'slide']).optional(),
// // // // // // // // // // // // // //   videoUrl: z.string().optional(),
// // // // // // // // // // // // // //   content: z.string().optional(),
// // // // // // // // // // // // // //   fileUrl: z.string().optional(),
// // // // // // // // // // // // // //   jp: z.number().default(0),
// // // // // // // // // // // // // //   scheduleDate: z.string().optional(),
// // // // // // // // // // // // // //   facilitator: z.string().optional(),
// // // // // // // // // // // // // //   // Handle Null facilitatorId
// // // // // // // // // // // // // //   facilitatorId: z.string().nullable().optional(), 
// // // // // // // // // // // // // //   classroomData: z.any().optional(),
// // // // // // // // // // // // // //   questions: z.array(z.any()).optional(),
// // // // // // // // // // // // // //   quizDuration: z.number().optional(),
// // // // // // // // // // // // // //   pollQuestion: z.string().optional(),
// // // // // // // // // // // // // //   pollOptions: z.array(z.string()).optional(),
// // // // // // // // // // // // // //   isActive: z.boolean().default(true),
// // // // // // // // // // // // // //   isMandatory: z.boolean().default(false)
// // // // // // // // // // // // // // });

// // // // // // // // // // // // // // const moduleSchema = z.object({
// // // // // // // // // // // // // //   title: z.string().min(1),
// // // // // // // // // // // // // //   lessons: z.array(lessonSchema).optional(),
// // // // // // // // // // // // // //   isActive: z.boolean().default(true),
// // // // // // // // // // // // // //   isMandatory: z.boolean().default(false),
// // // // // // // // // // // // // //   facilitatorId: z.string().nullable().optional(), // Modul juga punya fasilitator
// // // // // // // // // // // // // //   jp: z.number().optional(),
// // // // // // // // // // // // // //   scheduleDate: z.string().optional()
// // // // // // // // // // // // // // });

// // // // // // // // // // // // // // const courseSchema = z.object({
// // // // // // // // // // // // // //   title: z.string().min(3),
// // // // // // // // // // // // // //   description: z.string().optional(),
// // // // // // // // // // // // // //   category: z.string().optional(), 
// // // // // // // // // // // // // //   level: z.string().optional(),
// // // // // // // // // // // // // //   price: z.number().default(0),
// // // // // // // // // // // // // //   thumbnailUrl: z.string().optional(),
// // // // // // // // // // // // // //   startDate: z.string().optional(),
// // // // // // // // // // // // // //   endDate: z.string().optional(),
// // // // // // // // // // // // // //   credits: z.number().default(0),
  
// // // // // // // // // // // // // //   // Facilitators
// // // // // // // // // // // // // //   facilitator: z.string().optional(), 
// // // // // // // // // // // // // //   facilitatorIds: z.array(z.string()).optional(),

// // // // // // // // // // // // // //   modules: z.array(moduleSchema).default([]),
// // // // // // // // // // // // // //   published: z.boolean().default(false), 
// // // // // // // // // // // // // //   organizer: z.string().default('PMI Pusat'),
// // // // // // // // // // // // // //   programType: z.string().default('training'),
// // // // // // // // // // // // // //   competencies: z.array(z.string()).optional(),
// // // // // // // // // // // // // //   includeCompetenciesInCertificate: z.boolean().optional(),

// // // // // // // // // // // // // //   // [FIX] WAJIB DITAMBAHKAN AGAR DATA SERTIFIKAT TERSIMPAN
// // // // // // // // // // // // // //   certificateConfig: z.object({
// // // // // // // // // // // // // //       certificateNumber: z.string().optional(),
// // // // // // // // // // // // // //       executionDate: z.string().optional().or(z.date()),
// // // // // // // // // // // // // //       city: z.string().optional(),
// // // // // // // // // // // // // //       signatoryName: z.string().optional(),
// // // // // // // // // // // // // //       signatoryPosition: z.string().optional()
// // // // // // // // // // // // // //   }).optional(),
// // // // // // // // // // // // // // });

// // // // // // // // // // // // // // // ==========================================
// // // // // // // // // // // // // // // 2. COURSE ROUTES
// // // // // // // // // // // // // // // ==========================================

// // // // // // // // // // // // // // // GET PUBLISHED
// // // // // // // // // // // // // // router.get('/published', async (req: Request, res: Response) => {
// // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // //     const { search } = req.query;
// // // // // // // // // // // // // //     let query: any = { isPublished: true };

// // // // // // // // // // // // // //     if (search) {
// // // // // // // // // // // // // //       query.title = { $regex: search, $options: 'i' };
// // // // // // // // // // // // // //     }

// // // // // // // // // // // // // //     const courses = await Course.find(query)
// // // // // // // // // // // // // //       .select('title thumbnailUrl level category price organizer programType facilitatorIds modules isPublished')
// // // // // // // // // // // // // //       .populate('facilitatorIds', 'name avatarUrl') 
// // // // // // // // // // // // // //       .populate('categoryId', 'name')
// // // // // // // // // // // // // //       .sort({ createdAt: -1 });
      
// // // // // // // // // // // // // //     res.json({ courses });
// // // // // // // // // // // // // //   } catch (err: any) {
// // // // // // // // // // // // // //     console.error("Error fetching published:", err);
// // // // // // // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // });

// // // // // // // // // // // // // // // GET ALL
// // // // // // // // // // // // // // router.get('/', requireAuth, async (req: Request, res: Response) => {
// // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // //     const courses = await Course.find()
// // // // // // // // // // // // // //       .select('title isPublished modules updatedAt facilitatorIds price category organizer programType thumbnailUrl')
// // // // // // // // // // // // // //       .populate('facilitatorIds', 'name avatarUrl')
// // // // // // // // // // // // // //       .sort({ createdAt: -1 });
// // // // // // // // // // // // // //     res.json({ courses });
// // // // // // // // // // // // // //   } catch (err: any) {
// // // // // // // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // });

// // // // // // // // // // // // // // // GET SINGLE
// // // // // // // // // // // // // // router.get('/:id', requireAuth, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // //     const course = await Course.findById(req.params.id)
// // // // // // // // // // // // // //       .populate('facilitatorIds', 'name email avatarUrl')
// // // // // // // // // // // // // //       .populate('modules.facilitatorId', 'name')
// // // // // // // // // // // // // //       .populate('modules.lessons.facilitatorId', 'name');

// // // // // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // // // // // // // // // // // // //     res.json(course); 
// // // // // // // // // // // // // //   } catch (err: any) {
// // // // // // // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // });

// // // // // // // // // // // // // // // CREATE COURSE
// // // // // // // // // // // // // // router.post('/', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // //     const data = courseSchema.parse(req.body);
    
// // // // // // // // // // // // // //     let finalFacilitatorIds: string[] = [];
// // // // // // // // // // // // // //     if (data.facilitatorIds && data.facilitatorIds.length > 0) {
// // // // // // // // // // // // // //         finalFacilitatorIds = data.facilitatorIds;
// // // // // // // // // // // // // //     } else if (data.facilitator) {
// // // // // // // // // // // // // //         finalFacilitatorIds = [data.facilitator];
// // // // // // // // // // // // // //     } else {
// // // // // // // // // // // // // //         finalFacilitatorIds = [req.user!.id];
// // // // // // // // // // // // // //     }

// // // // // // // // // // // // // //     const course = await Course.create({
// // // // // // // // // // // // // //       ...data,
// // // // // // // // // // // // // //       isPublished: data.published, 
// // // // // // // // // // // // // //       facilitatorIds: finalFacilitatorIds,
// // // // // // // // // // // // // //       organizer: data.organizer,
// // // // // // // // // // // // // //       programType: data.programType,
// // // // // // // // // // // // // //       certificateConfig: data.certificateConfig // Save Config
// // // // // // // // // // // // // //     });

// // // // // // // // // // // // // //     res.status(201).json(course);
// // // // // // // // // // // // // //   } catch (err: any) {
// // // // // // // // // // // // // //     if (err.name === 'ZodError') return res.status(400).json({ error: err.issues });
// // // // // // // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // });

// // // // // // // // // // // // // // // UPDATE COURSE
// // // // // // // // // // // // // // router.put('/:id', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // //     const data = courseSchema.partial().parse(req.body);
// // // // // // // // // // // // // //     const updateData: any = { ...data };
    
// // // // // // // // // // // // // //     if (data.published !== undefined) {
// // // // // // // // // // // // // //         updateData.isPublished = data.published;
// // // // // // // // // // // // // //         delete updateData.published;
// // // // // // // // // // // // // //     }

// // // // // // // // // // // // // //     if (data.facilitatorIds) {
// // // // // // // // // // // // // //         updateData.facilitatorIds = data.facilitatorIds;
// // // // // // // // // // // // // //     } else if (data.facilitator) {
// // // // // // // // // // // // // //         updateData.facilitatorIds = [data.facilitator];
// // // // // // // // // // // // // //         delete updateData.facilitator; 
// // // // // // // // // // // // // //     }

// // // // // // // // // // // // // //     // Pastikan certificateConfig masuk ke updateData jika ada
// // // // // // // // // // // // // //     if (data.certificateConfig) {
// // // // // // // // // // // // // //         updateData.certificateConfig = data.certificateConfig;
// // // // // // // // // // // // // //     }

// // // // // // // // // // // // // //     const course = await Course.findOneAndUpdate(
// // // // // // // // // // // // // //       { _id: req.params.id },
// // // // // // // // // // // // // //       { $set: updateData },
// // // // // // // // // // // // // //       { new: true }
// // // // // // // // // // // // // //     );

// // // // // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // // // // // // // //     res.json(course);
// // // // // // // // // // // // // //   } catch (err: any) {
// // // // // // // // // // // // // //     console.error(err);
// // // // // // // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // });

// // // // // // // // // // // // // // // PATCH PUBLISH
// // // // // // // // // // // // // // router.patch('/:id/publish', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // //       const course = await Course.findById(req.params.id);
// // // // // // // // // // // // // //       if(!course) return res.status(404).json({error: 'Not found'});
// // // // // // // // // // // // // //       course.isPublished = !course.isPublished;
// // // // // // // // // // // // // //       await course.save();
// // // // // // // // // // // // // //       res.json(course);
// // // // // // // // // // // // // //   } catch(err: any) {
// // // // // // // // // // // // // //       res.status(500).json({error: err.message});
// // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // });

// // // // // // // // // // // // // // // DELETE COURSE
// // // // // // // // // // // // // // router.delete('/:id', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // //     const course = await Course.findOneAndDelete({ _id: req.params.id });
// // // // // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // // // // // // // //     res.json({ message: 'Course deleted successfully' });
// // // // // // // // // // // // // //   } catch (err: any) {
// // // // // // // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // });

// // // // // // // // // // // // // // // ==========================================
// // // // // // // // // // // // // // // 3. MODULE & LESSON ROUTES (CRUD CHILD)
// // // // // // // // // // // // // // // ==========================================

// // // // // // // // // // // // // // // Tambah Modul
// // // // // // // // // // // // // // router.post('/:id/modules', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // //     const course = await Course.findById(req.params.id);
// // // // // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // // // // // // // //     course.modules.push(req.body); 
// // // // // // // // // // // // // //     await course.save();
// // // // // // // // // // // // // //     res.json(course);
// // // // // // // // // // // // // //   } catch (err: any) {
// // // // // // // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // });

// // // // // // // // // // // // // // // Edit Modul
// // // // // // // // // // // // // // router.put('/:id/modules/:moduleId', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // //     const course = await Course.findById(req.params.id);
// // // // // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // // // // // // // //     const module = course.modules.find((m: any) => m._id.toString() === req.params.moduleId);
// // // // // // // // // // // // // //     if (!module) return res.status(404).json({ error: 'Module not found' });
// // // // // // // // // // // // // //     Object.assign(module, req.body); 
// // // // // // // // // // // // // //     await course.save();
// // // // // // // // // // // // // //     res.json(course);
// // // // // // // // // // // // // //   } catch (err: any) {
// // // // // // // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // });

// // // // // // // // // // // // // // // Hapus Modul
// // // // // // // // // // // // // // router.delete('/:id/modules/:moduleId', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // //     const course = await Course.findById(req.params.id);
// // // // // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // // // // // // // //     course.modules = course.modules.filter((m: any) => m._id.toString() !== req.params.moduleId);
// // // // // // // // // // // // // //     await course.save();
// // // // // // // // // // // // // //     res.json(course);
// // // // // // // // // // // // // //   } catch (err: any) {
// // // // // // // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // });

// // // // // // // // // // // // // // // Tambah Materi
// // // // // // // // // // // // // // router.post('/:id/modules/:moduleId/lessons', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // //     const course = await Course.findById(req.params.id);
// // // // // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // // // // // // // //     const module = course.modules.find((m: any) => m._id.toString() === req.params.moduleId);
// // // // // // // // // // // // // //     if (!module) return res.status(404).json({ error: 'Module not found' });
    
// // // // // // // // // // // // // //     // [FIX] Pastikan facilitatorId null jika dikirim string kosong dari frontend
// // // // // // // // // // // // // //     if (req.body.facilitatorId === "") req.body.facilitatorId = null;

// // // // // // // // // // // // // //     module.lessons.push(req.body);
// // // // // // // // // // // // // //     await course.save();
// // // // // // // // // // // // // //     res.json(course);
// // // // // // // // // // // // // //   } catch (err: any) {
// // // // // // // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // });

// // // // // // // // // // // // // // // Edit Materi
// // // // // // // // // // // // // // router.put('/:id/modules/:moduleId/lessons/:lessonId', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // //     const course = await Course.findById(req.params.id);
// // // // // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // // // // // // // //     const module = course.modules.find((m: any) => m._id.toString() === req.params.moduleId);
// // // // // // // // // // // // // //     if (!module) return res.status(404).json({ error: 'Module not found' });
// // // // // // // // // // // // // //     const lesson = module.lessons.find((l: any) => l._id.toString() === req.params.lessonId);
// // // // // // // // // // // // // //     if (!lesson) return res.status(404).json({ error: 'Lesson not found' });

// // // // // // // // // // // // // //     // [FIX] Pastikan facilitatorId null jika dikirim string kosong
// // // // // // // // // // // // // //     if (req.body.facilitatorId === "") req.body.facilitatorId = null;

// // // // // // // // // // // // // //     Object.assign(lesson, req.body);
// // // // // // // // // // // // // //     await course.save();
// // // // // // // // // // // // // //     res.json(course);
// // // // // // // // // // // // // //   } catch (err: any) {
// // // // // // // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // });

// // // // // // // // // // // // // // // Hapus Materi
// // // // // // // // // // // // // // router.delete('/:id/modules/:moduleId/lessons/:lessonId', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // //     const course = await Course.findById(req.params.id);
// // // // // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // // // // // // // //     const module = course.modules.find((m: any) => m._id.toString() === req.params.moduleId);
// // // // // // // // // // // // // //     if (!module) return res.status(404).json({ error: 'Module not found' });
// // // // // // // // // // // // // //     module.lessons = module.lessons.filter((l: any) => l._id.toString() !== req.params.lessonId);
// // // // // // // // // // // // // //     await course.save();
// // // // // // // // // // // // // //     res.json(course);
// // // // // // // // // // // // // //   } catch (err: any) {
// // // // // // // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // });

// // // // // // // // // // // // // // // Toggle Status & Reorder
// // // // // // // // // // // // // // router.patch('/:id/toggle-status', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // //     const { moduleId, lessonId } = req.body;
// // // // // // // // // // // // // //     const course = await Course.findById(req.params.id);
// // // // // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // // // // // // // //     if (moduleId && lessonId) {
// // // // // // // // // // // // // //        const mod = course.modules.find((m: any) => m._id.toString() === moduleId);
// // // // // // // // // // // // // //        if (mod) {
// // // // // // // // // // // // // //            const les = mod.lessons.find((l: any) => l._id.toString() === lessonId);
// // // // // // // // // // // // // //            if (les) les.isActive = !les.isActive;
// // // // // // // // // // // // // //        }
// // // // // // // // // // // // // //     } else if (moduleId) {
// // // // // // // // // // // // // //        const mod = course.modules.find((m: any) => m._id.toString() === moduleId);
// // // // // // // // // // // // // //        if (mod) mod.isActive = !mod.isActive;
// // // // // // // // // // // // // //     }
// // // // // // // // // // // // // //     await course.save();
// // // // // // // // // // // // // //     res.json(course);
// // // // // // // // // // // // // //   } catch (err: any) {
// // // // // // // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // });

// // // // // // // // // // // // // // router.patch('/:id/reorder', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // //     const { modules } = req.body;
// // // // // // // // // // // // // //     const course = await Course.findById(req.params.id);
// // // // // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // // // // // // // //     course.modules = modules; 
// // // // // // // // // // // // // //     await course.save();
// // // // // // // // // // // // // //     res.json(course);
// // // // // // // // // // // // // //   } catch (err: any) {
// // // // // // // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // });

// // // // // // // // // // // // // // // Mark Lesson Complete (For Admin Action)
// // // // // // // // // // // // // // router.post('/mark-complete-lesson', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // // // // //     // Logic untuk menandai manual selesai (bisa dikembangkan nanti)
// // // // // // // // // // // // // //     res.json({ message: "Success" });
// // // // // // // // // // // // // // });

// // // // // // // // // // // // // // router.post('/reset-quiz', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // // // // //     // Logic untuk reset quiz
// // // // // // // // // // // // // //     res.json({ message: "Success" });
// // // // // // // // // // // // // // });

// // // // // // // // // // // // // // export default router;
// // // // // // // // // // // // // import { Router, Request, Response } from 'express';
// // // // // // // // // // // // // import { Course } from '../models/Course'; 
// // // // // // // // // // // // // import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth'; 
// // // // // // // // // // // // // import { z } from 'zod';

// // // // // // // // // // // // // const router = Router();

// // // // // // // // // // // // // // ==========================================
// // // // // // // // // // // // // // 1. ZOD SCHEMAS
// // // // // // // // // // // // // // ==========================================
// // // // // // // // // // // // // const lessonSchema = z.object({
// // // // // // // // // // // // //   title: z.string().min(1),
// // // // // // // // // // // // //   type: z.enum(['video_url', 'upload_doc', 'quiz', 'essay', 'google_classroom', 'lesson', 'pdf', 'download_doc', 'image', 'slide', 'poll', 'virtual_class']).optional(),
// // // // // // // // // // // // //   videoUrl: z.string().optional(),
// // // // // // // // // // // // //   content: z.string().optional(),
// // // // // // // // // // // // //   fileUrl: z.string().optional(),
// // // // // // // // // // // // //   jp: z.number().default(0),
// // // // // // // // // // // // //   scheduleDate: z.string().optional(),
// // // // // // // // // // // // //   facilitator: z.string().optional(),
// // // // // // // // // // // // //   facilitatorId: z.string().nullable().optional(), 
// // // // // // // // // // // // //   classroomData: z.any().optional(),
// // // // // // // // // // // // //   questions: z.array(z.any()).optional(),
// // // // // // // // // // // // //   quizDuration: z.number().optional(),
// // // // // // // // // // // // //   pollQuestion: z.string().optional(),
// // // // // // // // // // // // //   pollOptions: z.array(z.string()).optional(),
// // // // // // // // // // // // //   isActive: z.boolean().default(true),
// // // // // // // // // // // // //   isMandatory: z.boolean().default(false)
// // // // // // // // // // // // // });

// // // // // // // // // // // // // const moduleSchema = z.object({
// // // // // // // // // // // // //   title: z.string().min(1),
// // // // // // // // // // // // //   lessons: z.array(lessonSchema).optional(),
// // // // // // // // // // // // //   isActive: z.boolean().default(true),
// // // // // // // // // // // // //   isMandatory: z.boolean().default(false),
// // // // // // // // // // // // //   facilitatorId: z.string().nullable().optional(),
// // // // // // // // // // // // //   jp: z.number().optional(),
// // // // // // // // // // // // //   scheduleDate: z.string().optional()
// // // // // // // // // // // // // });

// // // // // // // // // // // // // const courseSchema = z.object({
// // // // // // // // // // // // //   title: z.string().min(3),
// // // // // // // // // // // // //   description: z.string().optional(),
// // // // // // // // // // // // //   category: z.string().optional(), 
// // // // // // // // // // // // //   level: z.string().optional(),
// // // // // // // // // // // // //   price: z.number().default(0),
// // // // // // // // // // // // //   thumbnailUrl: z.string().optional(),
// // // // // // // // // // // // //   startDate: z.string().optional(),
// // // // // // // // // // // // //   endDate: z.string().optional(),
// // // // // // // // // // // // //   credits: z.number().default(0),
  
// // // // // // // // // // // // //   facilitator: z.string().optional(), 
// // // // // // // // // // // // //   facilitatorIds: z.array(z.string()).optional(),

// // // // // // // // // // // // //   modules: z.array(moduleSchema).default([]),
// // // // // // // // // // // // //   published: z.boolean().default(false), 
// // // // // // // // // // // // //   organizer: z.string().default('PMI Pusat'),
// // // // // // // // // // // // //   programType: z.string().default('training'),
// // // // // // // // // // // // //   competencies: z.array(z.string()).optional(),
// // // // // // // // // // // // //   includeCompetenciesInCertificate: z.boolean().optional(),

// // // // // // // // // // // // //   // [PENTING] Schema Validasi Sertifikat agar data tersimpan
// // // // // // // // // // // // //   certificateConfig: z.object({
// // // // // // // // // // // // //       certificateNumber: z.string().optional(),
// // // // // // // // // // // // //       startNumber: z.coerce.number().optional().default(1), // Menerima angka, default 1
// // // // // // // // // // // // //       executionDate: z.string().optional().or(z.date()),
// // // // // // // // // // // // //       city: z.string().optional(),
// // // // // // // // // // // // //       signatoryName: z.string().optional(),
// // // // // // // // // // // // //       signatoryPosition: z.string().optional()
// // // // // // // // // // // // //   }).optional(),
// // // // // // // // // // // // // });

// // // // // // // // // // // // // // ==========================================
// // // // // // // // // // // // // // 2. COURSE ROUTES
// // // // // // // // // // // // // // ==========================================

// // // // // // // // // // // // // // GET PUBLISHED
// // // // // // // // // // // // // router.get('/published', async (req: Request, res: Response) => {
// // // // // // // // // // // // //   try {
// // // // // // // // // // // // //     const { search } = req.query;
// // // // // // // // // // // // //     let query: any = { isPublished: true };

// // // // // // // // // // // // //     if (search) {
// // // // // // // // // // // // //       query.title = { $regex: search, $options: 'i' };
// // // // // // // // // // // // //     }

// // // // // // // // // // // // //     const courses = await Course.find(query)
// // // // // // // // // // // // //       .select('title thumbnailUrl level category price organizer programType facilitatorIds modules isPublished')
// // // // // // // // // // // // //       .populate('facilitatorIds', 'name avatarUrl') 
// // // // // // // // // // // // //       .populate('categoryId', 'name')
// // // // // // // // // // // // //       .sort({ createdAt: -1 });
      
// // // // // // // // // // // // //     res.json({ courses });
// // // // // // // // // // // // //   } catch (err: any) {
// // // // // // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // // // // // //   }
// // // // // // // // // // // // // });

// // // // // // // // // // // // // // GET ALL (Admin)
// // // // // // // // // // // // // router.get('/', requireAuth, async (req: Request, res: Response) => {
// // // // // // // // // // // // //   try {
// // // // // // // // // // // // //     const courses = await Course.find()
// // // // // // // // // // // // //       .select('title isPublished modules updatedAt facilitatorIds price category organizer programType thumbnailUrl')
// // // // // // // // // // // // //       .populate('facilitatorIds', 'name avatarUrl')
// // // // // // // // // // // // //       .sort({ createdAt: -1 });
// // // // // // // // // // // // //     res.json({ courses });
// // // // // // // // // // // // //   } catch (err: any) {
// // // // // // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // // // // // //   }
// // // // // // // // // // // // // });

// // // // // // // // // // // // // // GET SINGLE
// // // // // // // // // // // // // router.get('/:id', requireAuth, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // // // //   try {
// // // // // // // // // // // // //     const course = await Course.findById(req.params.id)
// // // // // // // // // // // // //       .populate('facilitatorIds', 'name email avatarUrl')
// // // // // // // // // // // // //       .populate('modules.facilitatorId', 'name')
// // // // // // // // // // // // //       .populate('modules.lessons.facilitatorId', 'name');

// // // // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // // // // // // // // // // // //     res.json(course); 
// // // // // // // // // // // // //   } catch (err: any) {
// // // // // // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // // // // // //   }
// // // // // // // // // // // // // });

// // // // // // // // // // // // // // CREATE COURSE
// // // // // // // // // // // // // router.post('/', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // // // //   try {
// // // // // // // // // // // // //     const data = courseSchema.parse(req.body);
    
// // // // // // // // // // // // //     let finalFacilitatorIds: string[] = [];
// // // // // // // // // // // // //     if (data.facilitatorIds && data.facilitatorIds.length > 0) {
// // // // // // // // // // // // //         finalFacilitatorIds = data.facilitatorIds;
// // // // // // // // // // // // //     } else if (data.facilitator) {
// // // // // // // // // // // // //         finalFacilitatorIds = [data.facilitator];
// // // // // // // // // // // // //     } else {
// // // // // // // // // // // // //         finalFacilitatorIds = [req.user!.id];
// // // // // // // // // // // // //     }

// // // // // // // // // // // // //     const course = await Course.create({
// // // // // // // // // // // // //       ...data,
// // // // // // // // // // // // //       isPublished: data.published, 
// // // // // // // // // // // // //       facilitatorIds: finalFacilitatorIds,
// // // // // // // // // // // // //       organizer: data.organizer,
// // // // // // // // // // // // //       programType: data.programType,
// // // // // // // // // // // // //       certificateConfig: data.certificateConfig
// // // // // // // // // // // // //     });

// // // // // // // // // // // // //     res.status(201).json(course);
// // // // // // // // // // // // //   } catch (err: any) {
// // // // // // // // // // // // //     if (err.name === 'ZodError') return res.status(400).json({ error: err.issues });
// // // // // // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // // // // // //   }
// // // // // // // // // // // // // });

// // // // // // // // // // // // // // UPDATE COURSE
// // // // // // // // // // // // // router.put('/:id', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // // // //   try {
// // // // // // // // // // // // //     const data = courseSchema.partial().parse(req.body);
// // // // // // // // // // // // //     const updateData: any = { ...data };
    
// // // // // // // // // // // // //     if (data.published !== undefined) {
// // // // // // // // // // // // //         updateData.isPublished = data.published;
// // // // // // // // // // // // //         delete updateData.published;
// // // // // // // // // // // // //     }

// // // // // // // // // // // // //     if (data.facilitatorIds) {
// // // // // // // // // // // // //         updateData.facilitatorIds = data.facilitatorIds;
// // // // // // // // // // // // //     } else if (data.facilitator) {
// // // // // // // // // // // // //         updateData.facilitatorIds = [data.facilitator];
// // // // // // // // // // // // //         delete updateData.facilitator; 
// // // // // // // // // // // // //     }

// // // // // // // // // // // // //     if (data.certificateConfig) {
// // // // // // // // // // // // //         updateData.certificateConfig = data.certificateConfig;
// // // // // // // // // // // // //     }

// // // // // // // // // // // // //     const course = await Course.findOneAndUpdate(
// // // // // // // // // // // // //       { _id: req.params.id },
// // // // // // // // // // // // //       { $set: updateData },
// // // // // // // // // // // // //       { new: true }
// // // // // // // // // // // // //     );

// // // // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // // // // // // //     res.json(course);
// // // // // // // // // // // // //   } catch (err: any) {
// // // // // // // // // // // // //     console.error(err);
// // // // // // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // // // // // //   }
// // // // // // // // // // // // // });

// // // // // // // // // // // // // // PATCH PUBLISH
// // // // // // // // // // // // // router.patch('/:id/publish', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // // // //   try {
// // // // // // // // // // // // //       const course = await Course.findById(req.params.id);
// // // // // // // // // // // // //       if(!course) return res.status(404).json({error: 'Not found'});
// // // // // // // // // // // // //       course.isPublished = !course.isPublished;
// // // // // // // // // // // // //       await course.save();
// // // // // // // // // // // // //       res.json(course);
// // // // // // // // // // // // //   } catch(err: any) {
// // // // // // // // // // // // //       res.status(500).json({error: err.message});
// // // // // // // // // // // // //   }
// // // // // // // // // // // // // });

// // // // // // // // // // // // // // DELETE COURSE
// // // // // // // // // // // // // router.delete('/:id', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // // // //   try {
// // // // // // // // // // // // //     const course = await Course.findOneAndDelete({ _id: req.params.id });
// // // // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // // // // // // //     res.json({ message: 'Course deleted successfully' });
// // // // // // // // // // // // //   } catch (err: any) {
// // // // // // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // // // // // //   }
// // // // // // // // // // // // // });

// // // // // // // // // // // // // // --- MODULE & LESSON ROUTES ---

// // // // // // // // // // // // // router.post('/:id/modules', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // // // //   try {
// // // // // // // // // // // // //     const course = await Course.findById(req.params.id);
// // // // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Course not found' });
    
// // // // // // // // // // // // //     // Pastikan facilitatorId null jika string kosong
// // // // // // // // // // // // //     if (req.body.facilitatorId === "") req.body.facilitatorId = null;

// // // // // // // // // // // // //     course.modules.push(req.body); 
// // // // // // // // // // // // //     await course.save();
// // // // // // // // // // // // //     res.json(course);
// // // // // // // // // // // // //   } catch (err: any) {
// // // // // // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // // // // // //   }
// // // // // // // // // // // // // });

// // // // // // // // // // // // // router.put('/:id/modules/:moduleId', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // // // //   try {
// // // // // // // // // // // // //     const course = await Course.findById(req.params.id);
// // // // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // // // // // // //     const module = course.modules.find((m: any) => m._id.toString() === req.params.moduleId);
// // // // // // // // // // // // //     if (!module) return res.status(404).json({ error: 'Module not found' });
    
// // // // // // // // // // // // //     if (req.body.facilitatorId === "") req.body.facilitatorId = null;

// // // // // // // // // // // // //     Object.assign(module, req.body); 
// // // // // // // // // // // // //     await course.save();
// // // // // // // // // // // // //     res.json(course);
// // // // // // // // // // // // //   } catch (err: any) {
// // // // // // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // // // // // //   }
// // // // // // // // // // // // // });

// // // // // // // // // // // // // router.delete('/:id/modules/:moduleId', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // // // //   try {
// // // // // // // // // // // // //     const course = await Course.findById(req.params.id);
// // // // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // // // // // // //     course.modules = course.modules.filter((m: any) => m._id.toString() !== req.params.moduleId);
// // // // // // // // // // // // //     await course.save();
// // // // // // // // // // // // //     res.json(course);
// // // // // // // // // // // // //   } catch (err: any) {
// // // // // // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // // // // // //   }
// // // // // // // // // // // // // });

// // // // // // // // // // // // // router.post('/:id/modules/:moduleId/lessons', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // // // //   try {
// // // // // // // // // // // // //     const course = await Course.findById(req.params.id);
// // // // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // // // // // // //     const module = course.modules.find((m: any) => m._id.toString() === req.params.moduleId);
// // // // // // // // // // // // //     if (!module) return res.status(404).json({ error: 'Module not found' });
    
// // // // // // // // // // // // //     if (req.body.facilitatorId === "") req.body.facilitatorId = null;

// // // // // // // // // // // // //     module.lessons.push(req.body);
// // // // // // // // // // // // //     await course.save();
// // // // // // // // // // // // //     res.json(course);
// // // // // // // // // // // // //   } catch (err: any) {
// // // // // // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // // // // // //   }
// // // // // // // // // // // // // });

// // // // // // // // // // // // // router.put('/:id/modules/:moduleId/lessons/:lessonId', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // // // //   try {
// // // // // // // // // // // // //     const course = await Course.findById(req.params.id);
// // // // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // // // // // // //     const module = course.modules.find((m: any) => m._id.toString() === req.params.moduleId);
// // // // // // // // // // // // //     if (!module) return res.status(404).json({ error: 'Module not found' });
// // // // // // // // // // // // //     const lesson = module.lessons.find((l: any) => l._id.toString() === req.params.lessonId);
// // // // // // // // // // // // //     if (!lesson) return res.status(404).json({ error: 'Lesson not found' });

// // // // // // // // // // // // //     if (req.body.facilitatorId === "") req.body.facilitatorId = null;

// // // // // // // // // // // // //     Object.assign(lesson, req.body);
// // // // // // // // // // // // //     await course.save();
// // // // // // // // // // // // //     res.json(course);
// // // // // // // // // // // // //   } catch (err: any) {
// // // // // // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // // // // // //   }
// // // // // // // // // // // // // });

// // // // // // // // // // // // // router.delete('/:id/modules/:moduleId/lessons/:lessonId', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // // // //   try {
// // // // // // // // // // // // //     const course = await Course.findById(req.params.id);
// // // // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // // // // // // //     const module = course.modules.find((m: any) => m._id.toString() === req.params.moduleId);
// // // // // // // // // // // // //     if (!module) return res.status(404).json({ error: 'Module not found' });
// // // // // // // // // // // // //     module.lessons = module.lessons.filter((l: any) => l._id.toString() !== req.params.lessonId);
// // // // // // // // // // // // //     await course.save();
// // // // // // // // // // // // //     res.json(course);
// // // // // // // // // // // // //   } catch (err: any) {
// // // // // // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // // // // // //   }
// // // // // // // // // // // // // });

// // // // // // // // // // // // // router.patch('/:id/toggle-status', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // // // //   try {
// // // // // // // // // // // // //     const { moduleId, lessonId } = req.body;
// // // // // // // // // // // // //     const course = await Course.findById(req.params.id);
// // // // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // // // // // // //     if (moduleId && lessonId) {
// // // // // // // // // // // // //        const mod = course.modules.find((m: any) => m._id.toString() === moduleId);
// // // // // // // // // // // // //        if (mod) {
// // // // // // // // // // // // //            const les = mod.lessons.find((l: any) => l._id.toString() === lessonId);
// // // // // // // // // // // // //            if (les) les.isActive = !les.isActive;
// // // // // // // // // // // // //        }
// // // // // // // // // // // // //     } else if (moduleId) {
// // // // // // // // // // // // //        const mod = course.modules.find((m: any) => m._id.toString() === moduleId);
// // // // // // // // // // // // //        if (mod) mod.isActive = !mod.isActive;
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //     await course.save();
// // // // // // // // // // // // //     res.json(course);
// // // // // // // // // // // // //   } catch (err: any) {
// // // // // // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // // // // // //   }
// // // // // // // // // // // // // });

// // // // // // // // // // // // // router.patch('/:id/reorder', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // // // //   try {
// // // // // // // // // // // // //     const { modules } = req.body;
// // // // // // // // // // // // //     const course = await Course.findById(req.params.id);
// // // // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // // // // // // //     course.modules = modules; 
// // // // // // // // // // // // //     await course.save();
// // // // // // // // // // // // //     res.json(course);
// // // // // // // // // // // // //   } catch (err: any) {
// // // // // // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // // // // // //   }
// // // // // // // // // // // // // });

// // // // // // // // // // // // // router.post('/mark-complete-lesson', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // // // //     res.json({ message: "Success" });
// // // // // // // // // // // // // });

// // // // // // // // // // // // // router.post('/reset-quiz', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // // // //     res.json({ message: "Success" });
// // // // // // // // // // // // // });

// // // // // // // // // // // // // export default router;
// // // // // // // // // // // // import { Router, Request, Response } from 'express';
// // // // // // // // // // // // import { Course } from '../models/Course'; 
// // // // // // // // // // // // import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth'; 
// // // // // // // // // // // // import { z } from 'zod';
// // // // // // // // // // // // import PDFDocument from 'pdfkit'; // [NEW] Import PDFKit
// // // // // // // // // // // // import path from 'path';
// // // // // // // // // // // // import fs from 'fs';

// // // // // // // // // // // // const router = Router();

// // // // // // // // // // // // // ==========================================
// // // // // // // // // // // // // 1. ZOD SCHEMAS
// // // // // // // // // // // // // ==========================================
// // // // // // // // // // // // const lessonSchema = z.object({
// // // // // // // // // // // //   title: z.string().min(1),
// // // // // // // // // // // //   type: z.enum(['video_url', 'upload_doc', 'quiz', 'essay', 'google_classroom', 'lesson', 'pdf', 'download_doc', 'image', 'slide', 'poll', 'virtual_class']).optional(),
// // // // // // // // // // // //   videoUrl: z.string().optional(),
// // // // // // // // // // // //   content: z.string().optional(),
// // // // // // // // // // // //   fileUrl: z.string().optional(),
// // // // // // // // // // // //   jp: z.number().default(0),
// // // // // // // // // // // //   scheduleDate: z.string().optional(),
// // // // // // // // // // // //   facilitator: z.string().optional(),
// // // // // // // // // // // //   facilitatorId: z.string().nullable().optional(), 
// // // // // // // // // // // //   classroomData: z.any().optional(),
// // // // // // // // // // // //   questions: z.array(z.any()).optional(),
// // // // // // // // // // // //   quizDuration: z.number().optional(),
// // // // // // // // // // // //   pollQuestion: z.string().optional(),
// // // // // // // // // // // //   pollOptions: z.array(z.string()).optional(),
// // // // // // // // // // // //   isActive: z.boolean().default(true),
// // // // // // // // // // // //   isMandatory: z.boolean().default(false)
// // // // // // // // // // // // });

// // // // // // // // // // // // const moduleSchema = z.object({
// // // // // // // // // // // //   title: z.string().min(1),
// // // // // // // // // // // //   lessons: z.array(lessonSchema).optional(),
// // // // // // // // // // // //   isActive: z.boolean().default(true),
// // // // // // // // // // // //   isMandatory: z.boolean().default(false),
// // // // // // // // // // // //   facilitatorId: z.string().nullable().optional(),
// // // // // // // // // // // //   jp: z.number().optional(),
// // // // // // // // // // // //   scheduleDate: z.string().optional()
// // // // // // // // // // // // });

// // // // // // // // // // // // const courseSchema = z.object({
// // // // // // // // // // // //   title: z.string().min(3),
// // // // // // // // // // // //   description: z.string().optional(),
// // // // // // // // // // // //   category: z.string().optional(), 
// // // // // // // // // // // //   level: z.string().optional(),
// // // // // // // // // // // //   price: z.number().default(0),
// // // // // // // // // // // //   thumbnailUrl: z.string().optional(),
// // // // // // // // // // // //   startDate: z.string().optional(),
// // // // // // // // // // // //   endDate: z.string().optional(),
// // // // // // // // // // // //   credits: z.number().default(0),
  
// // // // // // // // // // // //   facilitator: z.string().optional(), 
// // // // // // // // // // // //   facilitatorIds: z.array(z.string()).optional(),

// // // // // // // // // // // //   modules: z.array(moduleSchema).default([]),
// // // // // // // // // // // //   published: z.boolean().default(false), 
// // // // // // // // // // // //   organizer: z.string().default('PMI Pusat'),
// // // // // // // // // // // //   programType: z.string().default('training'),
// // // // // // // // // // // //   competencies: z.array(z.string()).optional(),
// // // // // // // // // // // //   includeCompetenciesInCertificate: z.boolean().optional(),

// // // // // // // // // // // //   certificateConfig: z.object({
// // // // // // // // // // // //       certificateNumber: z.string().optional(),
// // // // // // // // // // // //       startNumber: z.coerce.number().optional().default(1), 
// // // // // // // // // // // //       executionDate: z.string().optional().or(z.date()),
// // // // // // // // // // // //       city: z.string().optional(),
// // // // // // // // // // // //       signatoryName: z.string().optional(),
// // // // // // // // // // // //       signatoryPosition: z.string().optional()
// // // // // // // // // // // //   }).optional(),
// // // // // // // // // // // // });

// // // // // // // // // // // // // ==========================================
// // // // // // // // // // // // // 2. COURSE ROUTES
// // // // // // // // // // // // // ==========================================

// // // // // // // // // // // // // GET PUBLISHED
// // // // // // // // // // // // router.get('/published', async (req: Request, res: Response) => {
// // // // // // // // // // // //   try {
// // // // // // // // // // // //     const { search } = req.query;
// // // // // // // // // // // //     let query: any = { isPublished: true };

// // // // // // // // // // // //     if (search) {
// // // // // // // // // // // //       query.title = { $regex: search, $options: 'i' };
// // // // // // // // // // // //     }

// // // // // // // // // // // //     const courses = await Course.find(query)
// // // // // // // // // // // //       .select('title thumbnailUrl level category price organizer programType facilitatorIds modules isPublished')
// // // // // // // // // // // //       .populate('facilitatorIds', 'name avatarUrl') 
// // // // // // // // // // // //       .populate('categoryId', 'name')
// // // // // // // // // // // //       .sort({ createdAt: -1 });
      
// // // // // // // // // // // //     res.json({ courses });
// // // // // // // // // // // //   } catch (err: any) {
// // // // // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // // // // //   }
// // // // // // // // // // // // });

// // // // // // // // // // // // // GET ALL
// // // // // // // // // // // // router.get('/', requireAuth, async (req: Request, res: Response) => {
// // // // // // // // // // // //   try {
// // // // // // // // // // // //     const courses = await Course.find()
// // // // // // // // // // // //       .select('title isPublished modules updatedAt facilitatorIds price category organizer programType thumbnailUrl')
// // // // // // // // // // // //       .populate('facilitatorIds', 'name avatarUrl')
// // // // // // // // // // // //       .sort({ createdAt: -1 });
// // // // // // // // // // // //     res.json({ courses });
// // // // // // // // // // // //   } catch (err: any) {
// // // // // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // // // // //   }
// // // // // // // // // // // // });

// // // // // // // // // // // // // GET SINGLE
// // // // // // // // // // // // router.get('/:id', requireAuth, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // // //   try {
// // // // // // // // // // // //     const course = await Course.findById(req.params.id)
// // // // // // // // // // // //       .populate('facilitatorIds', 'name email avatarUrl')
// // // // // // // // // // // //       .populate('modules.facilitatorId', 'name')
// // // // // // // // // // // //       .populate('modules.lessons.facilitatorId', 'name');

// // // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // // // // // // // // // // //     res.json(course); 
// // // // // // // // // // // //   } catch (err: any) {
// // // // // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // // // // //   }
// // // // // // // // // // // // });

// // // // // // // // // // // // // CREATE COURSE
// // // // // // // // // // // // router.post('/', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // // //   try {
// // // // // // // // // // // //     const data = courseSchema.parse(req.body);
    
// // // // // // // // // // // //     let finalFacilitatorIds: string[] = [];
// // // // // // // // // // // //     if (data.facilitatorIds && data.facilitatorIds.length > 0) {
// // // // // // // // // // // //         finalFacilitatorIds = data.facilitatorIds;
// // // // // // // // // // // //     } else if (data.facilitator) {
// // // // // // // // // // // //         finalFacilitatorIds = [data.facilitator];
// // // // // // // // // // // //     } else {
// // // // // // // // // // // //         finalFacilitatorIds = [req.user!.id];
// // // // // // // // // // // //     }

// // // // // // // // // // // //     const course = await Course.create({
// // // // // // // // // // // //       ...data,
// // // // // // // // // // // //       isPublished: data.published, 
// // // // // // // // // // // //       facilitatorIds: finalFacilitatorIds,
// // // // // // // // // // // //       organizer: data.organizer,
// // // // // // // // // // // //       programType: data.programType,
// // // // // // // // // // // //       certificateConfig: data.certificateConfig
// // // // // // // // // // // //     });

// // // // // // // // // // // //     res.status(201).json(course);
// // // // // // // // // // // //   } catch (err: any) {
// // // // // // // // // // // //     if (err.name === 'ZodError') return res.status(400).json({ error: err.issues });
// // // // // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // // // // //   }
// // // // // // // // // // // // });

// // // // // // // // // // // // // UPDATE COURSE
// // // // // // // // // // // // router.put('/:id', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // // //   try {
// // // // // // // // // // // //     const data = courseSchema.partial().parse(req.body);
// // // // // // // // // // // //     const updateData: any = { ...data };
    
// // // // // // // // // // // //     if (data.published !== undefined) {
// // // // // // // // // // // //         updateData.isPublished = data.published;
// // // // // // // // // // // //         delete updateData.published;
// // // // // // // // // // // //     }

// // // // // // // // // // // //     if (data.facilitatorIds) {
// // // // // // // // // // // //         updateData.facilitatorIds = data.facilitatorIds;
// // // // // // // // // // // //     } else if (data.facilitator) {
// // // // // // // // // // // //         updateData.facilitatorIds = [data.facilitator];
// // // // // // // // // // // //         delete updateData.facilitator; 
// // // // // // // // // // // //     }

// // // // // // // // // // // //     if (data.certificateConfig) {
// // // // // // // // // // // //         updateData.certificateConfig = data.certificateConfig;
// // // // // // // // // // // //     }

// // // // // // // // // // // //     const course = await Course.findOneAndUpdate(
// // // // // // // // // // // //       { _id: req.params.id },
// // // // // // // // // // // //       { $set: updateData },
// // // // // // // // // // // //       { new: true }
// // // // // // // // // // // //     );

// // // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // // // // // //     res.json(course);
// // // // // // // // // // // //   } catch (err: any) {
// // // // // // // // // // // //     console.error(err);
// // // // // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // // // // //   }
// // // // // // // // // // // // });

// // // // // // // // // // // // // PATCH PUBLISH
// // // // // // // // // // // // router.patch('/:id/publish', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // // //   try {
// // // // // // // // // // // //       const course = await Course.findById(req.params.id);
// // // // // // // // // // // //       if(!course) return res.status(404).json({error: 'Not found'});
// // // // // // // // // // // //       course.isPublished = !course.isPublished;
// // // // // // // // // // // //       await course.save();
// // // // // // // // // // // //       res.json(course);
// // // // // // // // // // // //   } catch(err: any) {
// // // // // // // // // // // //       res.status(500).json({error: err.message});
// // // // // // // // // // // //   }
// // // // // // // // // // // // });

// // // // // // // // // // // // // DELETE COURSE
// // // // // // // // // // // // router.delete('/:id', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // // //   try {
// // // // // // // // // // // //     const course = await Course.findOneAndDelete({ _id: req.params.id });
// // // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // // // // // //     res.json({ message: 'Course deleted successfully' });
// // // // // // // // // // // //   } catch (err: any) {
// // // // // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // // // // //   }
// // // // // // // // // // // // });

// // // // // // // // // // // // // --- MODULE & LESSON ROUTES ---

// // // // // // // // // // // // router.post('/:id/modules', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // // //   try {
// // // // // // // // // // // //     const course = await Course.findById(req.params.id);
// // // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // // // // // //     if (req.body.facilitatorId === "") req.body.facilitatorId = null;
// // // // // // // // // // // //     course.modules.push(req.body); 
// // // // // // // // // // // //     await course.save();
// // // // // // // // // // // //     res.json(course);
// // // // // // // // // // // //   } catch (err: any) {
// // // // // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // // // // //   }
// // // // // // // // // // // // });

// // // // // // // // // // // // router.put('/:id/modules/:moduleId', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // // //   try {
// // // // // // // // // // // //     const course = await Course.findById(req.params.id);
// // // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // // // // // //     const module = course.modules.find((m: any) => m._id.toString() === req.params.moduleId);
// // // // // // // // // // // //     if (!module) return res.status(404).json({ error: 'Module not found' });
// // // // // // // // // // // //     if (req.body.facilitatorId === "") req.body.facilitatorId = null;
// // // // // // // // // // // //     Object.assign(module, req.body); 
// // // // // // // // // // // //     await course.save();
// // // // // // // // // // // //     res.json(course);
// // // // // // // // // // // //   } catch (err: any) {
// // // // // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // // // // //   }
// // // // // // // // // // // // });

// // // // // // // // // // // // router.delete('/:id/modules/:moduleId', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // // //   try {
// // // // // // // // // // // //     const course = await Course.findById(req.params.id);
// // // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // // // // // //     course.modules = course.modules.filter((m: any) => m._id.toString() !== req.params.moduleId);
// // // // // // // // // // // //     await course.save();
// // // // // // // // // // // //     res.json(course);
// // // // // // // // // // // //   } catch (err: any) {
// // // // // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // // // // //   }
// // // // // // // // // // // // });

// // // // // // // // // // // // router.post('/:id/modules/:moduleId/lessons', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // // //   try {
// // // // // // // // // // // //     const course = await Course.findById(req.params.id);
// // // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // // // // // //     const module = course.modules.find((m: any) => m._id.toString() === req.params.moduleId);
// // // // // // // // // // // //     if (!module) return res.status(404).json({ error: 'Module not found' });
// // // // // // // // // // // //     if (req.body.facilitatorId === "") req.body.facilitatorId = null;
// // // // // // // // // // // //     module.lessons.push(req.body);
// // // // // // // // // // // //     await course.save();
// // // // // // // // // // // //     res.json(course);
// // // // // // // // // // // //   } catch (err: any) {
// // // // // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // // // // //   }
// // // // // // // // // // // // });

// // // // // // // // // // // // router.put('/:id/modules/:moduleId/lessons/:lessonId', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // // //   try {
// // // // // // // // // // // //     const course = await Course.findById(req.params.id);
// // // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // // // // // //     const module = course.modules.find((m: any) => m._id.toString() === req.params.moduleId);
// // // // // // // // // // // //     if (!module) return res.status(404).json({ error: 'Module not found' });
// // // // // // // // // // // //     const lesson = module.lessons.find((l: any) => l._id.toString() === req.params.lessonId);
// // // // // // // // // // // //     if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
// // // // // // // // // // // //     if (req.body.facilitatorId === "") req.body.facilitatorId = null;
// // // // // // // // // // // //     Object.assign(lesson, req.body);
// // // // // // // // // // // //     await course.save();
// // // // // // // // // // // //     res.json(course);
// // // // // // // // // // // //   } catch (err: any) {
// // // // // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // // // // //   }
// // // // // // // // // // // // });

// // // // // // // // // // // // router.delete('/:id/modules/:moduleId/lessons/:lessonId', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // // //   try {
// // // // // // // // // // // //     const course = await Course.findById(req.params.id);
// // // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // // // // // //     const module = course.modules.find((m: any) => m._id.toString() === req.params.moduleId);
// // // // // // // // // // // //     if (!module) return res.status(404).json({ error: 'Module not found' });
// // // // // // // // // // // //     module.lessons = module.lessons.filter((l: any) => l._id.toString() !== req.params.lessonId);
// // // // // // // // // // // //     await course.save();
// // // // // // // // // // // //     res.json(course);
// // // // // // // // // // // //   } catch (err: any) {
// // // // // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // // // // //   }
// // // // // // // // // // // // });

// // // // // // // // // // // // router.patch('/:id/toggle-status', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // // //   try {
// // // // // // // // // // // //     const { moduleId, lessonId } = req.body;
// // // // // // // // // // // //     const course = await Course.findById(req.params.id);
// // // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // // // // // //     if (moduleId && lessonId) {
// // // // // // // // // // // //        const mod = course.modules.find((m: any) => m._id.toString() === moduleId);
// // // // // // // // // // // //        if (mod) {
// // // // // // // // // // // //            const les = mod.lessons.find((l: any) => l._id.toString() === lessonId);
// // // // // // // // // // // //            if (les) les.isActive = !les.isActive;
// // // // // // // // // // // //        }
// // // // // // // // // // // //     } else if (moduleId) {
// // // // // // // // // // // //        const mod = course.modules.find((m: any) => m._id.toString() === moduleId);
// // // // // // // // // // // //        if (mod) mod.isActive = !mod.isActive;
// // // // // // // // // // // //     }
// // // // // // // // // // // //     await course.save();
// // // // // // // // // // // //     res.json(course);
// // // // // // // // // // // //   } catch (err: any) {
// // // // // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // // // // //   }
// // // // // // // // // // // // });

// // // // // // // // // // // // router.patch('/:id/reorder', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // // //   try {
// // // // // // // // // // // //     const { modules } = req.body;
// // // // // // // // // // // //     const course = await Course.findById(req.params.id);
// // // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // // // // // //     course.modules = modules; 
// // // // // // // // // // // //     await course.save();
// // // // // // // // // // // //     res.json(course);
// // // // // // // // // // // //   } catch (err: any) {
// // // // // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // // // // //   }
// // // // // // // // // // // // });

// // // // // // // // // // // // router.post('/mark-complete-lesson', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // // //     res.json({ message: "Success" });
// // // // // // // // // // // // });

// // // // // // // // // // // // router.post('/reset-quiz', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // // //     res.json({ message: "Success" });
// // // // // // // // // // // // });

// // // // // // // // // // // // // ==========================================
// // // // // // // // // // // // // [NEW] PREVIEW CERTIFICATE (PDF GENERATOR)
// // // // // // // // // // // // // ==========================================
// // // // // // // // // // // // router.post('/certificate/preview', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // // //     try {
// // // // // // // // // // // //         const { certificateConfig } = req.body;
        
// // // // // // // // // // // //         // 1. Setup PDF Document (Landscape A4)
// // // // // // // // // // // //         const doc = new PDFDocument({ size: 'A4', layout: 'landscape', margin: 0 });
        
// // // // // // // // // // // //         // 2. Set Response Headers (Agar browser mengenali ini PDF)
// // // // // // // // // // // //         res.setHeader('Content-Type', 'application/pdf');
// // // // // // // // // // // //         res.setHeader('Content-Disposition', 'inline; filename=draft-sertifikat.pdf');
        
// // // // // // // // // // // //         doc.pipe(res);

// // // // // // // // // // // //         // --- DRAWING CERTIFICATE ---
        
// // // // // // // // // // // //         // A. Background (Simple Border jika tidak ada gambar)
// // // // // // // // // // // //         // Jika nanti ada template gambar, pakai: doc.image('path/to/template.jpg', 0, 0, { width: 842 });
// // // // // // // // // // // //         doc.rect(20, 20, 802, 555).lineWidth(5).strokeColor('#c0392b').stroke(); // Border Merah PMI
// // // // // // // // // // // //         doc.rect(25, 25, 792, 545).lineWidth(2).strokeColor('#2c3e50').stroke(); // Border Dalam

// // // // // // // // // // // //         // B. Logo Placeholders (Kiri & Kanan)
// // // // // // // // // // // //         doc.circle(80, 80, 40).fillOpacity(0.1).fill('red');
// // // // // // // // // // // //         doc.fillOpacity(1).fillColor('black');
// // // // // // // // // // // //         doc.fontSize(10).text('LOGO PMI', 55, 75);

// // // // // // // // // // // //         // C. Header Text
// // // // // // // // // // // //         doc.moveDown(2);
// // // // // // // // // // // //         doc.font('Helvetica-Bold').fontSize(24).text('SERTIFIKAT', { align: 'center', characterSpacing: 5 });
// // // // // // // // // // // //         doc.font('Helvetica').fontSize(14).text('Certificate', { align: 'center', characterSpacing: 2 });
        
// // // // // // // // // // // //         // D. Nomor Sertifikat
// // // // // // // // // // // //         // Hitung nomor contoh: 00 + startNumber
// // // // // // // // // // // //         let sampleNo = '001';
// // // // // // // // // // // //         if (certificateConfig.startNumber) {
// // // // // // // // // // // //             sampleNo = String(certificateConfig.startNumber).padStart(3, '0');
// // // // // // // // // // // //         }
// // // // // // // // // // // //         const finalNo = (certificateConfig.certificateNumber || '').replace('{NO}', sampleNo);
        
// // // // // // // // // // // //         doc.moveDown(1);
// // // // // // // // // // // //         doc.fontSize(12).text(`No: ${finalNo || '---/---/---'}`, { align: 'center' });

// // // // // // // // // // // //         // E. Body Content
// // // // // // // // // // // //         doc.moveDown(2);
// // // // // // // // // // // //         doc.fontSize(12).text('Diberikan kepada:', { align: 'center' });
// // // // // // // // // // // //         doc.fontSize(10).text('Awarded to', { align: 'center', oblique: true });
        
// // // // // // // // // // // //         doc.moveDown(1);
// // // // // // // // // // // //         doc.font('Helvetica-Bold').fontSize(28).text('NAMA PESERTA (CONTOH)', { align: 'center' });
// // // // // // // // // // // //         doc.font('Helvetica').fontSize(14).text('Peserta Pelatihan', { align: 'center' });

// // // // // // // // // // // //         doc.moveDown(1.5);
// // // // // // // // // // // //         doc.fontSize(12).text('Sebagai PESERTA dalam:', { align: 'center' });
        
// // // // // // // // // // // //         doc.moveDown(0.5);
// // // // // // // // // // // //         doc.font('Helvetica-Bold').fontSize(18).text('JUDUL PELATIHAN ANDA DI SINI', { align: 'center' });
        
// // // // // // // // // // // //         // F. Date & Location
// // // // // // // // // // // //         const dateStr = certificateConfig.executionDate 
// // // // // // // // // // // //             ? new Date(certificateConfig.executionDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
// // // // // // // // // // // //             : '.................';
        
// // // // // // // // // // // //         const cityStr = certificateConfig.city || 'Jakarta';

// // // // // // // // // // // //         doc.moveDown(2);
// // // // // // // // // // // //         doc.font('Helvetica').fontSize(12).text(`Dilaksanakan di ${cityStr}, pada tanggal ${dateStr}`, { align: 'center' });

// // // // // // // // // // // //         // G. Signatures (Bottom Right)
// // // // // // // // // // // //         const signY = 430;
// // // // // // // // // // // //         const signX = 550;
        
// // // // // // // // // // // //         doc.fontSize(12).text(`${cityStr}, ${dateStr}`, signX, signY);
// // // // // // // // // // // //         doc.text(certificateConfig.signatoryPosition || 'Pejabat Penanda Tangan', signX, signY + 20);
// // // // // // // // // // // //         doc.text('PALANG MERAH INDONESIA', signX, signY + 35);
        
// // // // // // // // // // // //         // Space for signature
// // // // // // // // // // // //         doc.moveDown(4);
// // // // // // // // // // // //         doc.font('Helvetica-Bold').text(certificateConfig.signatoryName || '(Nama Pejabat)', signX, signY + 100, { underline: true });

// // // // // // // // // // // //         // 3. Finalize
// // // // // // // // // // // //         doc.end();

// // // // // // // // // // // //     } catch (error: any) {
// // // // // // // // // // // //         console.error("PDF Gen Error:", error);
// // // // // // // // // // // //         res.status(500).send("Gagal membuat preview sertifikat");
// // // // // // // // // // // //     }
// // // // // // // // // // // // });

// // // // // // // // // // // // export default router;
// // // // // // // // // // // import { Router, Request, Response } from 'express';
// // // // // // // // // // // import { Course } from '../models/Course'; 
// // // // // // // // // // // import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth'; 
// // // // // // // // // // // import { z } from 'zod';
// // // // // // // // // // // import PDFDocument from 'pdfkit'; 
// // // // // // // // // // // import fs from 'fs';
// // // // // // // // // // // import path from 'path';
// // // // // // // // // // // import { fileURLToPath } from 'url';

// // // // // // // // // // // const router = Router();

// // // // // // // // // // // // Definisikan __dirname secara manual untuk ES Modules
// // // // // // // // // // // const __filename = fileURLToPath(import.meta.url);
// // // // // // // // // // // const __dirname = path.dirname(__filename);

// // // // // // // // // // // // ==========================================
// // // // // // // // // // // // 1. ZOD SCHEMAS
// // // // // // // // // // // // ==========================================
// // // // // // // // // // // const lessonSchema = z.object({
// // // // // // // // // // //   title: z.string().min(1),
// // // // // // // // // // //   type: z.enum(['video_url', 'upload_doc', 'quiz', 'essay', 'google_classroom', 'lesson', 'pdf', 'download_doc', 'image', 'slide', 'poll', 'virtual_class']).optional(),
// // // // // // // // // // //   videoUrl: z.string().optional(),
// // // // // // // // // // //   content: z.string().optional(),
// // // // // // // // // // //   fileUrl: z.string().optional(),
// // // // // // // // // // //   jp: z.number().default(0),
// // // // // // // // // // //   scheduleDate: z.string().optional(),
// // // // // // // // // // //   facilitator: z.string().optional(),
// // // // // // // // // // //   facilitatorId: z.string().nullable().optional(), 
// // // // // // // // // // //   classroomData: z.any().optional(),
// // // // // // // // // // //   questions: z.array(z.any()).optional(),
// // // // // // // // // // //   quizDuration: z.number().optional(),
// // // // // // // // // // //   pollQuestion: z.string().optional(),
// // // // // // // // // // //   pollOptions: z.array(z.string()).optional(),
// // // // // // // // // // //   isActive: z.boolean().default(true),
// // // // // // // // // // //   isMandatory: z.boolean().default(false)
// // // // // // // // // // // });

// // // // // // // // // // // const moduleSchema = z.object({
// // // // // // // // // // //   title: z.string().min(1),
// // // // // // // // // // //   lessons: z.array(lessonSchema).optional(),
// // // // // // // // // // //   isActive: z.boolean().default(true),
// // // // // // // // // // //   isMandatory: z.boolean().default(false),
// // // // // // // // // // //   facilitatorId: z.string().nullable().optional(),
// // // // // // // // // // //   jp: z.number().optional(),
// // // // // // // // // // //   scheduleDate: z.string().optional()
// // // // // // // // // // // });

// // // // // // // // // // // const courseSchema = z.object({
// // // // // // // // // // //   title: z.string().min(3),
// // // // // // // // // // //   description: z.string().optional(),
// // // // // // // // // // //   category: z.string().optional(), 
// // // // // // // // // // //   level: z.string().optional(),
// // // // // // // // // // //   price: z.number().default(0),
// // // // // // // // // // //   thumbnailUrl: z.string().optional(),
// // // // // // // // // // //   startDate: z.string().optional(),
// // // // // // // // // // //   endDate: z.string().optional(),
// // // // // // // // // // //   credits: z.number().default(0),
  
// // // // // // // // // // //   facilitator: z.string().optional(), 
// // // // // // // // // // //   facilitatorIds: z.array(z.string()).optional(),

// // // // // // // // // // //   modules: z.array(moduleSchema).default([]),
// // // // // // // // // // //   published: z.boolean().default(false), 
// // // // // // // // // // //   organizer: z.string().default('PMI Pusat'),
// // // // // // // // // // //   programType: z.string().default('training'),
// // // // // // // // // // //   competencies: z.array(z.string()).optional(),
// // // // // // // // // // //   includeCompetenciesInCertificate: z.boolean().optional(),

// // // // // // // // // // //   certificateConfig: z.object({
// // // // // // // // // // //       certificateNumber: z.string().optional(),
// // // // // // // // // // //       startNumber: z.coerce.number().optional().default(1), 
// // // // // // // // // // //       executionDate: z.string().optional().or(z.date()),
// // // // // // // // // // //       city: z.string().optional(),
// // // // // // // // // // //       signatoryName: z.string().optional(),
// // // // // // // // // // //       signatoryPosition: z.string().optional()
// // // // // // // // // // //   }).optional(),
// // // // // // // // // // // });

// // // // // // // // // // // // ==========================================
// // // // // // // // // // // // 2. COURSE ROUTES
// // // // // // // // // // // // ==========================================

// // // // // // // // // // // // GET PUBLISHED
// // // // // // // // // // // router.get('/published', async (req: Request, res: Response) => {
// // // // // // // // // // //   try {
// // // // // // // // // // //     const { search } = req.query;
// // // // // // // // // // //     let query: any = { isPublished: true };

// // // // // // // // // // //     if (search) {
// // // // // // // // // // //       query.title = { $regex: search, $options: 'i' };
// // // // // // // // // // //     }

// // // // // // // // // // //     const courses = await Course.find(query)
// // // // // // // // // // //       .select('title thumbnailUrl level category price organizer programType facilitatorIds modules isPublished')
// // // // // // // // // // //       .populate('facilitatorIds', 'name avatarUrl') 
// // // // // // // // // // //       .populate('categoryId', 'name')
// // // // // // // // // // //       .sort({ createdAt: -1 });
      
// // // // // // // // // // //     res.json({ courses });
// // // // // // // // // // //   } catch (err: any) {
// // // // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // // // //   }
// // // // // // // // // // // });

// // // // // // // // // // // // GET ALL
// // // // // // // // // // // router.get('/', requireAuth, async (req: Request, res: Response) => {
// // // // // // // // // // //   try {
// // // // // // // // // // //     const courses = await Course.find()
// // // // // // // // // // //       .select('title isPublished modules updatedAt facilitatorIds price category organizer programType thumbnailUrl')
// // // // // // // // // // //       .populate('facilitatorIds', 'name avatarUrl')
// // // // // // // // // // //       .sort({ createdAt: -1 });
// // // // // // // // // // //     res.json({ courses });
// // // // // // // // // // //   } catch (err: any) {
// // // // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // // // //   }
// // // // // // // // // // // });

// // // // // // // // // // // // GET SINGLE
// // // // // // // // // // // router.get('/:id', requireAuth, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // //   try {
// // // // // // // // // // //     const course = await Course.findById(req.params.id)
// // // // // // // // // // //       .populate('facilitatorIds', 'name email avatarUrl')
// // // // // // // // // // //       .populate('modules.facilitatorId', 'name')
// // // // // // // // // // //       .populate('modules.lessons.facilitatorId', 'name');

// // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // // // // // // // // // //     res.json(course); 
// // // // // // // // // // //   } catch (err: any) {
// // // // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // // // //   }
// // // // // // // // // // // });

// // // // // // // // // // // // CREATE COURSE
// // // // // // // // // // // router.post('/', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // //   try {
// // // // // // // // // // //     const data = courseSchema.parse(req.body);
    
// // // // // // // // // // //     let finalFacilitatorIds: string[] = [];
// // // // // // // // // // //     if (data.facilitatorIds && data.facilitatorIds.length > 0) {
// // // // // // // // // // //         finalFacilitatorIds = data.facilitatorIds;
// // // // // // // // // // //     } else if (data.facilitator) {
// // // // // // // // // // //         finalFacilitatorIds = [data.facilitator];
// // // // // // // // // // //     } else {
// // // // // // // // // // //         finalFacilitatorIds = [req.user!.id];
// // // // // // // // // // //     }

// // // // // // // // // // //     const course = await Course.create({
// // // // // // // // // // //       ...data,
// // // // // // // // // // //       isPublished: data.published, 
// // // // // // // // // // //       facilitatorIds: finalFacilitatorIds,
// // // // // // // // // // //       organizer: data.organizer,
// // // // // // // // // // //       programType: data.programType,
// // // // // // // // // // //       certificateConfig: data.certificateConfig
// // // // // // // // // // //     });

// // // // // // // // // // //     res.status(201).json(course);
// // // // // // // // // // //   } catch (err: any) {
// // // // // // // // // // //     if (err.name === 'ZodError') return res.status(400).json({ error: err.issues });
// // // // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // // // //   }
// // // // // // // // // // // });

// // // // // // // // // // // // UPDATE COURSE
// // // // // // // // // // // router.put('/:id', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // //   try {
// // // // // // // // // // //     const data = courseSchema.partial().parse(req.body);
// // // // // // // // // // //     const updateData: any = { ...data };
    
// // // // // // // // // // //     if (data.published !== undefined) {
// // // // // // // // // // //         updateData.isPublished = data.published;
// // // // // // // // // // //         delete updateData.published;
// // // // // // // // // // //     }

// // // // // // // // // // //     if (data.facilitatorIds) {
// // // // // // // // // // //         updateData.facilitatorIds = data.facilitatorIds;
// // // // // // // // // // //     } else if (data.facilitator) {
// // // // // // // // // // //         updateData.facilitatorIds = [data.facilitator];
// // // // // // // // // // //         delete updateData.facilitator; 
// // // // // // // // // // //     }

// // // // // // // // // // //     if (data.certificateConfig) {
// // // // // // // // // // //         updateData.certificateConfig = data.certificateConfig;
// // // // // // // // // // //     }

// // // // // // // // // // //     const course = await Course.findOneAndUpdate(
// // // // // // // // // // //       { _id: req.params.id },
// // // // // // // // // // //       { $set: updateData },
// // // // // // // // // // //       { new: true }
// // // // // // // // // // //     );

// // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // // // // //     res.json(course);
// // // // // // // // // // //   } catch (err: any) {
// // // // // // // // // // //     console.error(err);
// // // // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // // // //   }
// // // // // // // // // // // });

// // // // // // // // // // // // PATCH PUBLISH
// // // // // // // // // // // router.patch('/:id/publish', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // //   try {
// // // // // // // // // // //       const course = await Course.findById(req.params.id);
// // // // // // // // // // //       if(!course) return res.status(404).json({error: 'Not found'});
// // // // // // // // // // //       course.isPublished = !course.isPublished;
// // // // // // // // // // //       await course.save();
// // // // // // // // // // //       res.json(course);
// // // // // // // // // // //   } catch(err: any) {
// // // // // // // // // // //       res.status(500).json({error: err.message});
// // // // // // // // // // //   }
// // // // // // // // // // // });

// // // // // // // // // // // // DELETE COURSE
// // // // // // // // // // // router.delete('/:id', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // //   try {
// // // // // // // // // // //     const course = await Course.findOneAndDelete({ _id: req.params.id });
// // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // // // // //     res.json({ message: 'Course deleted successfully' });
// // // // // // // // // // //   } catch (err: any) {
// // // // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // // // //   }
// // // // // // // // // // // });

// // // // // // // // // // // // --- MODULE & LESSON ROUTES ---

// // // // // // // // // // // router.post('/:id/modules', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // //   try {
// // // // // // // // // // //     const course = await Course.findById(req.params.id);
// // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Course not found' });
    
// // // // // // // // // // //     if (req.body.facilitatorId === "") req.body.facilitatorId = null;

// // // // // // // // // // //     course.modules.push(req.body); 
// // // // // // // // // // //     await course.save();
// // // // // // // // // // //     res.json(course);
// // // // // // // // // // //   } catch (err: any) {
// // // // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // // // //   }
// // // // // // // // // // // });

// // // // // // // // // // // router.put('/:id/modules/:moduleId', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // //   try {
// // // // // // // // // // //     const course = await Course.findById(req.params.id);
// // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // // // // //     const module = course.modules.find((m: any) => m._id.toString() === req.params.moduleId);
// // // // // // // // // // //     if (!module) return res.status(404).json({ error: 'Module not found' });
    
// // // // // // // // // // //     if (req.body.facilitatorId === "") req.body.facilitatorId = null;

// // // // // // // // // // //     Object.assign(module, req.body); 
// // // // // // // // // // //     await course.save();
// // // // // // // // // // //     res.json(course);
// // // // // // // // // // //   } catch (err: any) {
// // // // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // // // //   }
// // // // // // // // // // // });

// // // // // // // // // // // router.delete('/:id/modules/:moduleId', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // //   try {
// // // // // // // // // // //     const course = await Course.findById(req.params.id);
// // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // // // // //     course.modules = course.modules.filter((m: any) => m._id.toString() !== req.params.moduleId);
// // // // // // // // // // //     await course.save();
// // // // // // // // // // //     res.json(course);
// // // // // // // // // // //   } catch (err: any) {
// // // // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // // // //   }
// // // // // // // // // // // });

// // // // // // // // // // // router.post('/:id/modules/:moduleId/lessons', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // //   try {
// // // // // // // // // // //     const course = await Course.findById(req.params.id);
// // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // // // // //     const module = course.modules.find((m: any) => m._id.toString() === req.params.moduleId);
// // // // // // // // // // //     if (!module) return res.status(404).json({ error: 'Module not found' });
    
// // // // // // // // // // //     if (req.body.facilitatorId === "") req.body.facilitatorId = null;

// // // // // // // // // // //     module.lessons.push(req.body);
// // // // // // // // // // //     await course.save();
// // // // // // // // // // //     res.json(course);
// // // // // // // // // // //   } catch (err: any) {
// // // // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // // // //   }
// // // // // // // // // // // });

// // // // // // // // // // // router.put('/:id/modules/:moduleId/lessons/:lessonId', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // //   try {
// // // // // // // // // // //     const course = await Course.findById(req.params.id);
// // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // // // // //     const module = course.modules.find((m: any) => m._id.toString() === req.params.moduleId);
// // // // // // // // // // //     if (!module) return res.status(404).json({ error: 'Module not found' });
// // // // // // // // // // //     const lesson = module.lessons.find((l: any) => l._id.toString() === req.params.lessonId);
// // // // // // // // // // //     if (!lesson) return res.status(404).json({ error: 'Lesson not found' });

// // // // // // // // // // //     if (req.body.facilitatorId === "") req.body.facilitatorId = null;

// // // // // // // // // // //     Object.assign(lesson, req.body);
// // // // // // // // // // //     await course.save();
// // // // // // // // // // //     res.json(course);
// // // // // // // // // // //   } catch (err: any) {
// // // // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // // // //   }
// // // // // // // // // // // });

// // // // // // // // // // // router.delete('/:id/modules/:moduleId/lessons/:lessonId', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // //   try {
// // // // // // // // // // //     const course = await Course.findById(req.params.id);
// // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // // // // //     const module = course.modules.find((m: any) => m._id.toString() === req.params.moduleId);
// // // // // // // // // // //     if (!module) return res.status(404).json({ error: 'Module not found' });
// // // // // // // // // // //     module.lessons = module.lessons.filter((l: any) => l._id.toString() !== req.params.lessonId);
// // // // // // // // // // //     await course.save();
// // // // // // // // // // //     res.json(course);
// // // // // // // // // // //   } catch (err: any) {
// // // // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // // // //   }
// // // // // // // // // // // });

// // // // // // // // // // // router.patch('/:id/toggle-status', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // //   try {
// // // // // // // // // // //     const { moduleId, lessonId } = req.body;
// // // // // // // // // // //     const course = await Course.findById(req.params.id);
// // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // // // // //     if (moduleId && lessonId) {
// // // // // // // // // // //        const mod = course.modules.find((m: any) => m._id.toString() === moduleId);
// // // // // // // // // // //        if (mod) {
// // // // // // // // // // //            const les = mod.lessons.find((l: any) => l._id.toString() === lessonId);
// // // // // // // // // // //            if (les) les.isActive = !les.isActive;
// // // // // // // // // // //        }
// // // // // // // // // // //     } else if (moduleId) {
// // // // // // // // // // //        const mod = course.modules.find((m: any) => m._id.toString() === moduleId);
// // // // // // // // // // //        if (mod) mod.isActive = !mod.isActive;
// // // // // // // // // // //     }
// // // // // // // // // // //     await course.save();
// // // // // // // // // // //     res.json(course);
// // // // // // // // // // //   } catch (err: any) {
// // // // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // // // //   }
// // // // // // // // // // // });

// // // // // // // // // // // router.patch('/:id/reorder', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // //   try {
// // // // // // // // // // //     const { modules } = req.body;
// // // // // // // // // // //     const course = await Course.findById(req.params.id);
// // // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // // // // //     course.modules = modules; 
// // // // // // // // // // //     await course.save();
// // // // // // // // // // //     res.json(course);
// // // // // // // // // // //   } catch (err: any) {
// // // // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // // // //   }
// // // // // // // // // // // });

// // // // // // // // // // // router.post('/mark-complete-lesson', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // //     res.json({ message: "Success" });
// // // // // // // // // // // });

// // // // // // // // // // // router.post('/reset-quiz', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // //     res.json({ message: "Success" });
// // // // // // // // // // // });

// // // // // // // // // // // // ==========================================
// // // // // // // // // // // // [NEW] PREVIEW CERTIFICATE (A4 PORTRAIT)
// // // // // // // // // // // // ==========================================
// // // // // // // // // // // router.post('/certificate/preview', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // // //     try {
// // // // // // // // // // //         const { certificateConfig } = req.body;
        
// // // // // // // // // // //         // 1. Setup PDF Document (A4 PORTRAIT)
// // // // // // // // // // //         // Margin 0 agar header bisa mentok
// // // // // // // // // // //         const doc = new PDFDocument({ size: 'A4', layout: 'portrait', margin: 0 });
        
// // // // // // // // // // //         res.setHeader('Content-Type', 'application/pdf');
// // // // // // // // // // //         res.setHeader('Content-Disposition', 'inline; filename=draft-sertifikat.pdf');
        
// // // // // // // // // // //         doc.pipe(res);

// // // // // // // // // // //         // --- A. HEADER WARNA-WARNI ---
// // // // // // // // // // //         // Lebar A4 Portrait = ~595 point
// // // // // // // // // // //         const totalWidth = 595;
// // // // // // // // // // //         const headerHeight = 50;
// // // // // // // // // // //         const segmentWidth = totalWidth / 4;

// // // // // // // // // // //         // Gambar kotak warna di atas (Simulasi header PMI)
// // // // // // // // // // //         doc.rect(0, 0, segmentWidth, headerHeight).fill('#D50000'); // Merah Tua
// // // // // // // // // // //         doc.rect(segmentWidth, 0, segmentWidth, headerHeight).fill('#E65100'); // Oranye Tua
// // // // // // // // // // //         doc.rect(segmentWidth * 2, 0, segmentWidth, headerHeight).fill('#FF8A65'); // Salmon
// // // // // // // // // // //         doc.rect(segmentWidth * 3, 0, segmentWidth, headerHeight).fill('#FFCCBC'); // Pucat

// // // // // // // // // // //         // --- B. LOGO PMI ---
// // // // // // // // // // //         // Path fix menggunakan __dirname yang sudah didefinisikan di atas
// // // // // // // // // // //         const logoPath = path.join(__dirname, '../../assets/logo-pmi.png');
        
// // // // // // // // // // //         if (fs.existsSync(logoPath)) {
// // // // // // // // // // //             // Tampilkan logo di tengah (Centered)
// // // // // // // // // // //             // 595 / 2 = 297.5. Width 80. X = 297.5 - 40 = 257.5
// // // // // // // // // // //             doc.image(logoPath, (totalWidth / 2) - 50, 95, { width: 150 });
// // // // // // // // // // //         } else {
// // // // // // // // // // //             // Fallback jika tidak ada file logo
// // // // // // // // // // //             doc.fillColor('#D50000').fontSize(12).text('[LOGO PMI]', 0, 90, { align: 'center' });
// // // // // // // // // // //         }

// // // // // // // // // // //         // --- C. JUDUL SERTIFIKAT ---
// // // // // // // // // // //         // Jarak dari logo
// // // // // // // // // // //         doc.moveDown(5); 
// // // // // // // // // // //         const startY = 160;

// // // // // // // // // // //         doc.fillColor('black');
// // // // // // // // // // //         doc.font('Helvetica-Bold').fontSize(32).text('SERTIFIKAT', 0, startY +30, { align: 'center', characterSpacing: 2 });
// // // // // // // // // // //         doc.font('Helvetica-Oblique').fontSize(14).text('Certificate', 0, startY + 50, { align: 'center' });

// // // // // // // // // // //         // --- D. NOMOR SERTIFIKAT ---
// // // // // // // // // // //         let sampleNo = '001';
// // // // // // // // // // //         if (certificateConfig.startNumber) {
// // // // // // // // // // //             // Padding nol agar minimal 3 digit (001, 010, 100)
// // // // // // // // // // //             sampleNo = String(certificateConfig.startNumber).padStart(3, '0');
// // // // // // // // // // //         }
        
// // // // // // // // // // //         // Replace placeholder {NO} dengan sample
// // // // // // // // // // //         const finalNo = (certificateConfig.certificateNumber || '').replace('{NO}', sampleNo);
        
// // // // // // // // // // //         doc.font('Helvetica').fontSize(12).text(`No : ${finalNo || '---/---/---'}`, 0, startY + 60, { align: 'center' });

// // // // // // // // // // //         // --- E. PENERIMA ---
// // // // // // // // // // //         doc.font('Helvetica').fontSize(12).text('Diberikan kepada :', 0, startY + 90, { align: 'center' });
// // // // // // // // // // //         doc.font('Helvetica-Oblique').fontSize(10).text('Awarded to', 0, startY + 105, { align: 'center' });

// // // // // // // // // // //         doc.font('Helvetica-Bold').fontSize(24).text('NAMA PESERTA', 0, startY + 130, { align: 'center' });
// // // // // // // // // // //         doc.font('Helvetica').fontSize(14).text('UNIT / INSTANSI PESERTA', 0, startY + 160, { align: 'center' });

// // // // // // // // // // //         doc.font('Helvetica').fontSize(12).text('Sebagai', 0, startY + 190, { align: 'center' });
// // // // // // // // // // //         doc.font('Helvetica-Bold').fontSize(16).text('PESERTA', 0, startY + 210, { align: 'center' });

// // // // // // // // // // //         // --- F. JUDUL PELATIHAN ---
// // // // // // // // // // //         doc.font('Helvetica-Bold').fontSize(20).text('JUDUL PELATIHAN ANDA', 0, startY + 240, { align: 'center' });
// // // // // // // // // // //         doc.font('Helvetica-Oblique').fontSize(12).text('Training Title Here', 0, startY + 265, { align: 'center' });

// // // // // // // // // // //         // --- G. KETERANGAN WAKTU ---
// // // // // // // // // // //         const cityStr = certificateConfig.city || 'Jakarta';
// // // // // // // // // // //         const dateStr = certificateConfig.executionDate 
// // // // // // // // // // //             ? new Date(certificateConfig.executionDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
// // // // // // // // // // //             : '.......................';

// // // // // // // // // // //         doc.font('Helvetica').fontSize(11).text(`Dilaksanakan di ${cityStr}, pada tanggal ${dateStr}`, 0, startY + 290, { align: 'center' });

// // // // // // // // // // //         // --- H. TANDA TANGAN (POSISI BAWAH TENGAH) ---
// // // // // // // // // // //         // Karena Portrait, posisi Y diturunkan ke bawah
// // // // // // // // // // //         const signY = 650; 
        
// // // // // // // // // // //         doc.font('Helvetica').fontSize(12).text(`${cityStr}, ${dateStr}`, 0, signY, { align: 'center' });
        
// // // // // // // // // // //         doc.moveDown(0.3);
// // // // // // // // // // //         doc.font('Helvetica-Bold').text(certificateConfig.signatoryPosition || 'Pengurus Kabupaten', { align: 'center' });
// // // // // // // // // // //         doc.font('Helvetica-Oblique').fontSize(10).text('District Board Member', { align: 'center' });
        
// // // // // // // // // // //         doc.moveDown(0.2);
// // // // // // // // // // //         doc.font('Helvetica-Bold').fontSize(12).text('PALANG MERAH INDONESIA', { align: 'center' });
// // // // // // // // // // //         doc.font('Helvetica-Oblique').fontSize(10).text('Indonesian Red Cross', { align: 'center' });

// // // // // // // // // // //         doc.moveDown(0.2);
// // // // // // // // // // //         doc.font('Helvetica-Bold').fontSize(12).text('Ketua,', { align: 'center' });
// // // // // // // // // // //         doc.font('Helvetica-Oblique').fontSize(10).text('Chairman', { align: 'center' });

// // // // // // // // // // //         // Ruang Tanda Tangan
// // // // // // // // // // //         doc.moveDown(3);
        
// // // // // // // // // // //         // Nama Penanda Tangan
// // // // // // // // // // //         doc.font('Helvetica-Bold').fontSize(12).text(certificateConfig.signatoryName || '(Nama Pejabat)', { align: 'center', underline: true });

// // // // // // // // // // //         doc.end();

// // // // // // // // // // //     } catch (error: any) {
// // // // // // // // // // //         console.error("PDF Preview Error:", error);
// // // // // // // // // // //         res.status(500).send("Gagal membuat preview sertifikat: " + error.message);
// // // // // // // // // // //     }
// // // // // // // // // // // });

// // // // // // // // // // // export default router;
// // // // // // // // // // import { Router, Request, Response } from 'express';
// // // // // // // // // // import { Course } from '../models/Course'; 
// // // // // // // // // // import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth'; 
// // // // // // // // // // import { z } from 'zod';
// // // // // // // // // // import PDFDocument from 'pdfkit'; 
// // // // // // // // // // import fs from 'fs';
// // // // // // // // // // import path from 'path';
// // // // // // // // // // import { fileURLToPath } from 'url';

// // // // // // // // // // const router = Router();

// // // // // // // // // // // Definisikan __dirname secara manual untuk ES Modules
// // // // // // // // // // const __filename = fileURLToPath(import.meta.url);
// // // // // // // // // // const __dirname = path.dirname(__filename);

// // // // // // // // // // // ==========================================
// // // // // // // // // // // 1. ZOD SCHEMAS
// // // // // // // // // // // ==========================================
// // // // // // // // // // const lessonSchema = z.object({
// // // // // // // // // //   title: z.string().min(1),
// // // // // // // // // //   type: z.enum(['video_url', 'upload_doc', 'quiz', 'essay', 'google_classroom', 'lesson', 'pdf', 'download_doc', 'image', 'slide', 'poll', 'virtual_class']).optional(),
// // // // // // // // // //   videoUrl: z.string().optional(),
// // // // // // // // // //   content: z.string().optional(),
// // // // // // // // // //   fileUrl: z.string().optional(),
// // // // // // // // // //   jp: z.number().default(0),
// // // // // // // // // //   scheduleDate: z.string().optional(),
// // // // // // // // // //   facilitator: z.string().optional(),
// // // // // // // // // //   facilitatorId: z.string().nullable().optional(), 
// // // // // // // // // //   classroomData: z.any().optional(),
// // // // // // // // // //   questions: z.array(z.any()).optional(),
// // // // // // // // // //   quizDuration: z.number().optional(),
// // // // // // // // // //   pollQuestion: z.string().optional(),
// // // // // // // // // //   pollOptions: z.array(z.string()).optional(),
// // // // // // // // // //   isActive: z.boolean().default(true),
// // // // // // // // // //   isMandatory: z.boolean().default(false)
// // // // // // // // // // });

// // // // // // // // // // const moduleSchema = z.object({
// // // // // // // // // //   title: z.string().min(1),
// // // // // // // // // //   lessons: z.array(lessonSchema).optional(),
// // // // // // // // // //   isActive: z.boolean().default(true),
// // // // // // // // // //   isMandatory: z.boolean().default(false),
// // // // // // // // // //   facilitatorId: z.string().nullable().optional(),
// // // // // // // // // //   jp: z.number().optional(),
// // // // // // // // // //   scheduleDate: z.string().optional()
// // // // // // // // // // });

// // // // // // // // // // const courseSchema = z.object({
// // // // // // // // // //   title: z.string().min(3),
// // // // // // // // // //   description: z.string().optional(),
// // // // // // // // // //   category: z.string().optional(), 
// // // // // // // // // //   level: z.string().optional(),
// // // // // // // // // //   price: z.number().default(0),
// // // // // // // // // //   thumbnailUrl: z.string().optional(),
// // // // // // // // // //   startDate: z.string().optional(),
// // // // // // // // // //   endDate: z.string().optional(),
// // // // // // // // // //   credits: z.number().default(0),
  
// // // // // // // // // //   facilitator: z.string().optional(), 
// // // // // // // // // //   facilitatorIds: z.array(z.string()).optional(),

// // // // // // // // // //   modules: z.array(moduleSchema).default([]),
// // // // // // // // // //   published: z.boolean().default(false), 
// // // // // // // // // //   organizer: z.string().default('PMI Pusat'),
// // // // // // // // // //   programType: z.string().default('training'),
  
// // // // // // // // // //   // Validasi Kompetensi sebagai Array of Objects
// // // // // // // // // //   competencies: z.array(z.object({
// // // // // // // // // //       code: z.string(),
// // // // // // // // // //       title: z.string()
// // // // // // // // // //   })).optional(),
  
// // // // // // // // // //   includeCompetenciesInCertificate: z.boolean().optional(),

// // // // // // // // // //   certificateConfig: z.object({
// // // // // // // // // //       certificateNumber: z.string().optional(),
// // // // // // // // // //       startNumber: z.coerce.number().optional().default(1), 
// // // // // // // // // //       executionDate: z.string().optional().or(z.date()),
// // // // // // // // // //       city: z.string().optional(),
// // // // // // // // // //       signatoryName: z.string().optional(),
// // // // // // // // // //       signatoryPosition: z.string().optional()
// // // // // // // // // //   }).optional(),
// // // // // // // // // // });

// // // // // // // // // // // ==========================================
// // // // // // // // // // // 2. COURSE ROUTES (CRUD)
// // // // // // // // // // // ==========================================

// // // // // // // // // // // GET PUBLISHED
// // // // // // // // // // router.get('/published', async (req: Request, res: Response) => {
// // // // // // // // // //   try {
// // // // // // // // // //     const { search } = req.query;
// // // // // // // // // //     let query: any = { isPublished: true };
// // // // // // // // // //     if (search) query.title = { $regex: search, $options: 'i' };
// // // // // // // // // //     const courses = await Course.find(query).select('title thumbnailUrl level category price organizer programType facilitatorIds modules isPublished').populate('facilitatorIds', 'name avatarUrl').populate('categoryId', 'name').sort({ createdAt: -1 });
// // // // // // // // // //     res.json({ courses });
// // // // // // // // // //   } catch (err: any) { res.status(500).json({ error: err.message }); }
// // // // // // // // // // });

// // // // // // // // // // // GET ALL
// // // // // // // // // // router.get('/', requireAuth, async (req: Request, res: Response) => {
// // // // // // // // // //   try {
// // // // // // // // // //     const courses = await Course.find().select('title isPublished modules updatedAt facilitatorIds price category organizer programType thumbnailUrl').populate('facilitatorIds', 'name avatarUrl').sort({ createdAt: -1 });
// // // // // // // // // //     res.json({ courses });
// // // // // // // // // //   } catch (err: any) { res.status(500).json({ error: err.message }); }
// // // // // // // // // // });

// // // // // // // // // // // GET SINGLE
// // // // // // // // // // router.get('/:id', requireAuth, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // //   try {
// // // // // // // // // //     const course = await Course.findById(req.params.id).populate('facilitatorIds', 'name email avatarUrl').populate('modules.facilitatorId', 'name').populate('modules.lessons.facilitatorId', 'name');
// // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // // // // // // // // //     res.json(course); 
// // // // // // // // // //   } catch (err: any) { res.status(500).json({ error: err.message }); }
// // // // // // // // // // });

// // // // // // // // // // // CREATE
// // // // // // // // // // router.post('/', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // //   try {
// // // // // // // // // //     const data = courseSchema.parse(req.body);
// // // // // // // // // //     let finalFacilitatorIds: string[] = [];
// // // // // // // // // //     if (data.facilitatorIds && data.facilitatorIds.length > 0) finalFacilitatorIds = data.facilitatorIds;
// // // // // // // // // //     else if (data.facilitator) finalFacilitatorIds = [data.facilitator];
// // // // // // // // // //     else finalFacilitatorIds = [req.user!.id];
// // // // // // // // // //     const course = await Course.create({ ...data, isPublished: data.published, facilitatorIds: finalFacilitatorIds, organizer: data.organizer, programType: data.programType, certificateConfig: data.certificateConfig });
// // // // // // // // // //     res.status(201).json(course);
// // // // // // // // // //   } catch (err: any) { if (err.name === 'ZodError') return res.status(400).json({ error: err.issues }); res.status(500).json({ error: err.message }); }
// // // // // // // // // // });

// // // // // // // // // // // UPDATE
// // // // // // // // // // router.put('/:id', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // //   try {
// // // // // // // // // //     const data = courseSchema.partial().parse(req.body);
// // // // // // // // // //     const updateData: any = { ...data };
// // // // // // // // // //     if (data.published !== undefined) { updateData.isPublished = data.published; delete updateData.published; }
// // // // // // // // // //     if (data.facilitatorIds) updateData.facilitatorIds = data.facilitatorIds;
// // // // // // // // // //     else if (data.facilitator) { updateData.facilitatorIds = [data.facilitator]; delete updateData.facilitator; }
// // // // // // // // // //     if (data.certificateConfig) updateData.certificateConfig = data.certificateConfig;
// // // // // // // // // //     if (data.competencies) updateData.competencies = data.competencies; 

// // // // // // // // // //     const course = await Course.findOneAndUpdate({ _id: req.params.id }, { $set: updateData }, { new: true });
// // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // // // //     res.json(course);
// // // // // // // // // //   } catch (err: any) { console.error(err); res.status(500).json({ error: err.message }); }
// // // // // // // // // // });

// // // // // // // // // // // OTHER CRUD OPERATIONS
// // // // // // // // // // router.patch('/:id/publish', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { try { const course = await Course.findById(req.params.id); if(!course) return res.status(404).json({error: 'Not found'}); course.isPublished = !course.isPublished; await course.save(); res.json(course); } catch(err: any) { res.status(500).json({error: err.message}); } });
// // // // // // // // // // router.delete('/:id', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { try { const course = await Course.findOneAndDelete({ _id: req.params.id }); if (!course) return res.status(404).json({ error: 'Course not found' }); res.json({ message: 'Course deleted successfully' }); } catch (err: any) { res.status(500).json({ error: err.message }); } });
// // // // // // // // // // router.post('/:id/modules', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { try { const course = await Course.findById(req.params.id); if (!course) return res.status(404).json({ error: 'Course not found' }); if (req.body.facilitatorId === "") req.body.facilitatorId = null; course.modules.push(req.body); await course.save(); res.json(course); } catch (err: any) { res.status(500).json({ error: err.message }); } });
// // // // // // // // // // router.put('/:id/modules/:moduleId', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { try { const course = await Course.findById(req.params.id); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.find((m: any) => m._id.toString() === req.params.moduleId); if (!module) return res.status(404).json({ error: 'Module not found' }); if (req.body.facilitatorId === "") req.body.facilitatorId = null; Object.assign(module, req.body); await course.save(); res.json(course); } catch (err: any) { res.status(500).json({ error: err.message }); } });
// // // // // // // // // // router.delete('/:id/modules/:moduleId', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { try { const course = await Course.findById(req.params.id); if (!course) return res.status(404).json({ error: 'Course not found' }); course.modules = course.modules.filter((m: any) => m._id.toString() !== req.params.moduleId); await course.save(); res.json(course); } catch (err: any) { res.status(500).json({ error: err.message }); } });
// // // // // // // // // // router.post('/:id/modules/:moduleId/lessons', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { try { const course = await Course.findById(req.params.id); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.find((m: any) => m._id.toString() === req.params.moduleId); if (!module) return res.status(404).json({ error: 'Module not found' }); if (req.body.facilitatorId === "") req.body.facilitatorId = null; module.lessons.push(req.body); await course.save(); res.json(course); } catch (err: any) { res.status(500).json({ error: err.message }); } });
// // // // // // // // // // router.put('/:id/modules/:moduleId/lessons/:lessonId', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { try { const course = await Course.findById(req.params.id); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.find((m: any) => m._id.toString() === req.params.moduleId); if (!module) return res.status(404).json({ error: 'Module not found' }); const lesson = module.lessons.find((l: any) => l._id.toString() === req.params.lessonId); if (!lesson) return res.status(404).json({ error: 'Lesson not found' }); if (req.body.facilitatorId === "") req.body.facilitatorId = null; Object.assign(lesson, req.body); await course.save(); res.json(course); } catch (err: any) { res.status(500).json({ error: err.message }); } });
// // // // // // // // // // router.delete('/:id/modules/:moduleId/lessons/:lessonId', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { try { const course = await Course.findById(req.params.id); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.find((m: any) => m._id.toString() === req.params.moduleId); if (!module) return res.status(404).json({ error: 'Module not found' }); module.lessons = module.lessons.filter((l: any) => l._id.toString() !== req.params.lessonId); await course.save(); res.json(course); } catch (err: any) { res.status(500).json({ error: err.message }); } });
// // // // // // // // // // router.patch('/:id/toggle-status', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { try { const { moduleId, lessonId } = req.body; const course = await Course.findById(req.params.id); if (!course) return res.status(404).json({ error: 'Course not found' }); if (moduleId && lessonId) { const mod = course.modules.find((m: any) => m._id.toString() === moduleId); if (mod) { const les = mod.lessons.find((l: any) => l._id.toString() === lessonId); if (les) les.isActive = !les.isActive; } } else if (moduleId) { const mod = course.modules.find((m: any) => m._id.toString() === moduleId); if (mod) mod.isActive = !mod.isActive; } await course.save(); res.json(course); } catch (err: any) { res.status(500).json({ error: err.message }); } });
// // // // // // // // // // router.patch('/:id/reorder', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { try { const { modules } = req.body; const course = await Course.findById(req.params.id); if (!course) return res.status(404).json({ error: 'Course not found' }); course.modules = modules; await course.save(); res.json(course); } catch (err: any) { res.status(500).json({ error: err.message }); } });
// // // // // // // // // // router.post('/mark-complete-lesson', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { res.json({ message: "Success" }); });
// // // // // // // // // // router.post('/reset-quiz', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { res.json({ message: "Success" }); });

// // // // // // // // // // // ==========================================
// // // // // // // // // // // [NEW] PREVIEW CERTIFICATE (A4 PORTRAIT + BACK PAGE AUTO PAGINATION)
// // // // // // // // // // // ==========================================
// // // // // // // // // // router.post('/certificate/preview', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // // //     try {
// // // // // // // // // //         let { certificateConfig, competencies, courseId, includeCompetenciesInCertificate } = req.body;
        
// // // // // // // // // //         // Hybrid Fix: Jika kompetensi tidak dikirim di body, coba ambil dari DB
// // // // // // // // // //         if ((!competencies || competencies.length === 0) && courseId) {
// // // // // // // // // //             try {
// // // // // // // // // //                 const course = await Course.findById(courseId);
// // // // // // // // // //                 if (course && course.competencies && course.competencies.length > 0) {
// // // // // // // // // //                     competencies = course.competencies;
// // // // // // // // // //                 }
// // // // // // // // // //             } catch (err) { console.warn("Fetch DB fail:", err); }
// // // // // // // // // //         }

// // // // // // // // // //         // Setup PDF (A4 Portrait)
// // // // // // // // // //         const doc = new PDFDocument({ size: 'A4', layout: 'portrait', margin: 0 });
// // // // // // // // // //         res.setHeader('Content-Type', 'application/pdf');
// // // // // // // // // //         res.setHeader('Content-Disposition', 'inline; filename=draft-sertifikat.pdf');
// // // // // // // // // //         doc.pipe(res);

// // // // // // // // // //         // --- HALAMAN 1: DEPAN ---
// // // // // // // // // //         const totalWidth = 595;
// // // // // // // // // //         const headerHeight = 50;
// // // // // // // // // //         const segmentWidth = totalWidth / 4;

// // // // // // // // // //         // Header Warna
// // // // // // // // // //         doc.rect(0, 0, segmentWidth, headerHeight).fill('#D50000');
// // // // // // // // // //         doc.rect(segmentWidth, 0, segmentWidth, headerHeight).fill('#E65100');
// // // // // // // // // //         doc.rect(segmentWidth * 2, 0, segmentWidth, headerHeight).fill('#FF8A65');
// // // // // // // // // //         doc.rect(segmentWidth * 3, 0, segmentWidth, headerHeight).fill('#FFCCBC');

// // // // // // // // // //         // Logo
// // // // // // // // // //         const logoPath = path.join(__dirname, '../../assets/logo-pmi.png');
// // // // // // // // // //         if (fs.existsSync(logoPath)) {
// // // // // // // // // //             doc.image(logoPath, (totalWidth / 2) - 40, 70, { width: 80 });
// // // // // // // // // //         } else {
// // // // // // // // // //             doc.fillColor('#D50000').fontSize(12).text('[LOGO PMI]', 0, 90, { align: 'center' });
// // // // // // // // // //         }

// // // // // // // // // //         doc.moveDown(5); 
// // // // // // // // // //         const startY = 160;
// // // // // // // // // //         doc.fillColor('black');
// // // // // // // // // //         doc.font('Helvetica-Bold').fontSize(32).text('SERTIFIKAT', 0, startY + 30, { align: 'center', characterSpacing: 2 });
// // // // // // // // // //         doc.font('Helvetica-Oblique').fontSize(14).text('Certificate', 0, startY + 65, { align: 'center' });

// // // // // // // // // //         // Nomor
// // // // // // // // // //         let sampleNo = '001';
// // // // // // // // // //         if (certificateConfig.startNumber) {
// // // // // // // // // //             sampleNo = String(certificateConfig.startNumber).padStart(3, '0');
// // // // // // // // // //         }
// // // // // // // // // //         const finalNo = (certificateConfig.certificateNumber || '').replace('{NO}', sampleNo);
// // // // // // // // // //         doc.font('Helvetica').fontSize(12).text(`No : ${finalNo || '---/---/---'}`, 0, startY + 85, { align: 'center' });

// // // // // // // // // //         // Penerima & Konten
// // // // // // // // // //         doc.font('Helvetica').fontSize(12).text('Diberikan kepada :', 0, startY + 115, { align: 'center' });
// // // // // // // // // //         doc.font('Helvetica-Oblique').fontSize(10).text('Awarded to', 0, startY + 130, { align: 'center' });
// // // // // // // // // //         doc.font('Helvetica-Bold').fontSize(24).text('NAMA PESERTA', 0, startY + 150, { align: 'center' });
// // // // // // // // // //         doc.font('Helvetica').fontSize(14).text('UNIT / INSTANSI PESERTA', 0, startY + 180, { align: 'center' });
// // // // // // // // // //         doc.font('Helvetica').fontSize(12).text('Sebagai', 0, startY + 210, { align: 'center' });
// // // // // // // // // //         doc.font('Helvetica-Bold').fontSize(16).text('PESERTA', 0, startY + 230, { align: 'center' });
// // // // // // // // // //         doc.font('Helvetica-Bold').fontSize(20).text('JUDUL PELATIHAN ANDA', 0, startY + 260, { align: 'center' });
// // // // // // // // // //         doc.font('Helvetica-Oblique').fontSize(12).text('Training Title Here', 0, startY + 285, { align: 'center' });

// // // // // // // // // //         const cityStr = certificateConfig.city || 'Jakarta';
// // // // // // // // // //         const dateStr = certificateConfig.executionDate 
// // // // // // // // // //             ? new Date(certificateConfig.executionDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
// // // // // // // // // //             : '.......................';
// // // // // // // // // //         doc.font('Helvetica').fontSize(11).text(`Dilaksanakan di ${cityStr}, pada tanggal ${dateStr}`, 0, startY + 315, { align: 'center' });

// // // // // // // // // //         // Tanda Tangan Hal 1
// // // // // // // // // //         const signY = 650; 
// // // // // // // // // //         doc.font('Helvetica').fontSize(12).text(`${cityStr}, ${dateStr}`, 0, signY, { align: 'center' });
// // // // // // // // // //         doc.moveDown(0.3);
// // // // // // // // // //         doc.font('Helvetica-Bold').text(certificateConfig.signatoryPosition || 'Pengurus Kabupaten', { align: 'center' });
// // // // // // // // // //         doc.font('Helvetica-Oblique').fontSize(10).text('District Board Member', { align: 'center' });
// // // // // // // // // //         doc.moveDown(0.2);
// // // // // // // // // //         doc.font('Helvetica-Bold').fontSize(12).text('PALANG MERAH INDONESIA', { align: 'center' });
// // // // // // // // // //         doc.font('Helvetica-Oblique').fontSize(10).text('Indonesian Red Cross', { align: 'center' });
// // // // // // // // // //         doc.moveDown(0.2);
// // // // // // // // // //         doc.font('Helvetica-Bold').fontSize(12).text('Ketua,', { align: 'center' });
// // // // // // // // // //         doc.font('Helvetica-Oblique').fontSize(10).text('Chairman', { align: 'center' });
// // // // // // // // // //         doc.moveDown(3);
// // // // // // // // // //         doc.font('Helvetica-Bold').fontSize(12).text(certificateConfig.signatoryName || '(Nama Pejabat)', { align: 'center', underline: true });

// // // // // // // // // //         // --- HALAMAN 2: DAFTAR KOMPETENSI (AUTO PAGINATION) ---
// // // // // // // // // //         if ((includeCompetenciesInCertificate || (competencies && competencies.length > 0)) && competencies) {
// // // // // // // // // //             doc.addPage();
            
// // // // // // // // // //             // Fungsi Gambar Header Tabel
// // // // // // // // // //             const drawTableHeaders = (yPos: number) => {
// // // // // // // // // //                 const col1X = 50;  // No
// // // // // // // // // //                 const col2X = 90;  // Kode
// // // // // // // // // //                 const col3X = 220; // Judul
// // // // // // // // // //                 const headerH = 35;

// // // // // // // // // //                 doc.font('Helvetica-Bold').fontSize(10);
                
// // // // // // // // // //                 doc.rect(col1X, yPos, 40, headerH).stroke(); 
// // // // // // // // // //                 doc.rect(col2X, yPos, 130, headerH).stroke(); 
// // // // // // // // // //                 doc.rect(col3X, yPos, 325, headerH).stroke(); 

// // // // // // // // // //                 doc.fillColor('black');
// // // // // // // // // //                 doc.text('No.', col1X + 10, yPos + 8);
// // // // // // // // // //                 doc.text('No Kode', col2X + 10, yPos + 5);
                
// // // // // // // // // //                 // Fix Oblique size
// // // // // // // // // //                 doc.fontSize(8).text('Unit Code', col2X + 10, yPos + 20, { oblique: true });
                
// // // // // // // // // //                 doc.fontSize(10).text('Judul Unit', col3X + 10, yPos + 5);
// // // // // // // // // //                 doc.fontSize(8).text('Unit Title', col3X + 10, yPos + 20, { oblique: true });
// // // // // // // // // //             };

// // // // // // // // // //             // Header Halaman Lampiran
// // // // // // // // // //             doc.fillColor('black');
// // // // // // // // // //             doc.font('Helvetica-Bold').fontSize(14).text('Markas Kabupaten', 50, 50);
// // // // // // // // // //             doc.text('Palang Merah Indonesia', 50, 70);

// // // // // // // // // //             doc.fontSize(16).text('Daftar Unit Kompetensi', 0, 120, { align: 'center' });
// // // // // // // // // //             doc.font('Helvetica-Oblique').fontSize(12).text('List of Unit(s) of Competency', 0, 140, { align: 'center' });

// // // // // // // // // //             // Setup Tabel
// // // // // // // // // //             let tableTop = 180;
// // // // // // // // // //             const rowHeight = 35;
// // // // // // // // // //             const pageBottomLimit = 750; // Batas bawah sebelum ganti halaman

// // // // // // // // // //             drawTableHeaders(tableTop);
            
// // // // // // // // // //             let currentY = tableTop + rowHeight;
// // // // // // // // // //             const col1X = 50;
// // // // // // // // // //             const col2X = 90;
// // // // // // // // // //             const col3X = 220;

// // // // // // // // // //             doc.font('Helvetica').fontSize(10);

// // // // // // // // // //             // Loop Data
// // // // // // // // // //             competencies.forEach((comp: any, index: number) => {
// // // // // // // // // //                 // Cek apakah perlu halaman baru?
// // // // // // // // // //                 if (currentY + rowHeight > pageBottomLimit) {
// // // // // // // // // //                     doc.addPage();
// // // // // // // // // //                     tableTop = 50; 
// // // // // // // // // //                     drawTableHeaders(tableTop);
// // // // // // // // // //                     currentY = tableTop + rowHeight;
// // // // // // // // // //                     doc.font('Helvetica').fontSize(10);
// // // // // // // // // //                 }

// // // // // // // // // //                 doc.rect(col1X, currentY, 40, rowHeight).stroke();
// // // // // // // // // //                 doc.rect(col2X, currentY, 130, rowHeight).stroke();
// // // // // // // // // //                 doc.rect(col3X, currentY, 325, rowHeight).stroke();

// // // // // // // // // //                 doc.text(String(index + 1), col1X + 12, currentY + 12);
// // // // // // // // // //                 doc.text(comp.code || '-', col2X + 10, currentY + 12);
// // // // // // // // // //                 doc.text(comp.title || '-', col3X + 10, currentY + 12, { width: 310, height: rowHeight - 10, ellipsis: true });

// // // // // // // // // //                 currentY += rowHeight;
// // // // // // // // // //             });

// // // // // // // // // //             // Tanda Tangan Halaman Belakang (Cek Sisa Ruang)
// // // // // // // // // //             if (currentY + 150 > pageBottomLimit) {
// // // // // // // // // //                 doc.addPage();
// // // // // // // // // //                 currentY = 50; 
// // // // // // // // // //             } else {
// // // // // // // // // //                 currentY += 30;
// // // // // // // // // //             }

// // // // // // // // // //             const sign2X = 320; 

// // // // // // // // // //             doc.font('Helvetica').fontSize(11);
// // // // // // // // // //             doc.text(`${cityStr}, ${dateStr}`, sign2X, currentY);
            
// // // // // // // // // //             doc.font('Helvetica-Bold').text(certificateConfig.signatoryPosition || 'Kepala Pusdiklat', sign2X, currentY + 15);
// // // // // // // // // //             doc.font('Helvetica-Oblique').fontSize(9).text('Head of Education and Training Center', sign2X, currentY + 28);
// // // // // // // // // //             doc.font('Helvetica-Bold').fontSize(11).text('Palang Merah Indonesia', sign2X, currentY + 40);

// // // // // // // // // //             doc.moveDown(4);
// // // // // // // // // //             doc.text('_______________________', sign2X, currentY + 120);
            
// // // // // // // // // //             if (certificateConfig.signatoryName) {
// // // // // // // // // //                  doc.text(certificateConfig.signatoryName, sign2X, currentY + 135);
// // // // // // // // // //             }
// // // // // // // // // //         }

// // // // // // // // // //         doc.end();

// // // // // // // // // //     } catch (error: any) {
// // // // // // // // // //         console.error("PDF Preview Error:", error);
// // // // // // // // // //         res.status(500).send("Gagal membuat preview sertifikat: " + error.message);
// // // // // // // // // //     }
// // // // // // // // // // });

// // // // // // // // // // export default router;
// // // // // // // // // import { Router, Request, Response } from 'express';
// // // // // // // // // import { Course } from '../models/Course'; // [FIX] Gunakan Named Import
// // // // // // // // // import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth'; 
// // // // // // // // // import { z } from 'zod';
// // // // // // // // // import PDFDocument from 'pdfkit'; 
// // // // // // // // // import fs from 'fs';
// // // // // // // // // import path from 'path';
// // // // // // // // // import { fileURLToPath } from 'url';

// // // // // // // // // const router = Router();

// // // // // // // // // // Definisikan __dirname secara manual untuk ES Modules
// // // // // // // // // const __filename = fileURLToPath(import.meta.url);
// // // // // // // // // const __dirname = path.dirname(__filename);

// // // // // // // // // // ==========================================
// // // // // // // // // // 1. ZOD SCHEMAS
// // // // // // // // // // ==========================================
// // // // // // // // // const lessonSchema = z.object({
// // // // // // // // //   title: z.string().min(1),
// // // // // // // // //   type: z.enum(['video_url', 'upload_doc', 'quiz', 'essay', 'google_classroom', 'lesson', 'pdf', 'download_doc', 'image', 'slide', 'poll', 'virtual_class']).optional(),
// // // // // // // // //   videoUrl: z.string().optional(),
// // // // // // // // //   content: z.string().optional(),
// // // // // // // // //   fileUrl: z.string().optional(),
// // // // // // // // //   jp: z.number().default(0),
// // // // // // // // //   scheduleDate: z.string().optional(),
// // // // // // // // //   facilitator: z.string().optional(),
// // // // // // // // //   facilitatorId: z.string().nullable().optional(), 
// // // // // // // // //   classroomData: z.any().optional(),
// // // // // // // // //   questions: z.array(z.any()).optional(),
// // // // // // // // //   quizDuration: z.number().optional(),
// // // // // // // // //   pollQuestion: z.string().optional(),
// // // // // // // // //   pollOptions: z.array(z.string()).optional(),
// // // // // // // // //   isActive: z.boolean().default(true),
// // // // // // // // //   isMandatory: z.boolean().default(false)
// // // // // // // // // });

// // // // // // // // // const moduleSchema = z.object({
// // // // // // // // //   title: z.string().min(1),
// // // // // // // // //   lessons: z.array(lessonSchema).optional(),
// // // // // // // // //   isActive: z.boolean().default(true),
// // // // // // // // //   isMandatory: z.boolean().default(false),
// // // // // // // // //   facilitatorId: z.string().nullable().optional(),
// // // // // // // // //   jp: z.number().optional(),
// // // // // // // // //   scheduleDate: z.string().optional()
// // // // // // // // // });

// // // // // // // // // const courseSchema = z.object({
// // // // // // // // //   title: z.string().min(3),
// // // // // // // // //   description: z.string().optional(),
// // // // // // // // //   category: z.string().optional(), 
// // // // // // // // //   level: z.string().optional(),
// // // // // // // // //   price: z.number().default(0),
// // // // // // // // //   thumbnailUrl: z.string().optional(),
// // // // // // // // //   startDate: z.string().optional(),
// // // // // // // // //   endDate: z.string().optional(),
// // // // // // // // //   credits: z.number().default(0),
  
// // // // // // // // //   facilitator: z.string().optional(), 
// // // // // // // // //   facilitatorIds: z.array(z.string()).optional(),

// // // // // // // // //   modules: z.array(moduleSchema).default([]),
// // // // // // // // //   published: z.boolean().default(false), 
// // // // // // // // //   organizer: z.string().default('PMI Pusat'),
// // // // // // // // //   programType: z.string().default('training'),
  
// // // // // // // // //   competencies: z.array(z.object({
// // // // // // // // //       code: z.string(),
// // // // // // // // //       title: z.string()
// // // // // // // // //   })).optional(),
  
// // // // // // // // //   includeCompetenciesInCertificate: z.boolean().optional(),

// // // // // // // // //   certificateConfig: z.object({
// // // // // // // // //       certificateNumber: z.string().optional(),
// // // // // // // // //       startNumber: z.coerce.number().optional().default(1), 
// // // // // // // // //       executionDate: z.string().optional().or(z.date()),
// // // // // // // // //       city: z.string().optional(),
// // // // // // // // //       signatoryName: z.string().optional(),
// // // // // // // // //       signatoryPosition: z.string().optional()
// // // // // // // // //   }).optional(),
// // // // // // // // // });

// // // // // // // // // // ==========================================
// // // // // // // // // // 2. COURSE ROUTES
// // // // // // // // // // ==========================================

// // // // // // // // // // GET PUBLISHED
// // // // // // // // // router.get('/published', async (req: Request, res: Response) => {
// // // // // // // // //   try {
// // // // // // // // //     const { search } = req.query;
// // // // // // // // //     let query: any = { isPublished: true };

// // // // // // // // //     if (search) {
// // // // // // // // //       query.title = { $regex: search, $options: 'i' };
// // // // // // // // //     }

// // // // // // // // //     const courses = await Course.find(query)
// // // // // // // // //       .select('title thumbnailUrl level category price organizer programType facilitatorIds modules isPublished')
// // // // // // // // //       .populate('facilitatorIds', 'name avatarUrl') 
// // // // // // // // //       .sort({ createdAt: -1 });
      
// // // // // // // // //     res.json({ courses });
// // // // // // // // //   } catch (err: any) {
// // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // //   }
// // // // // // // // // });

// // // // // // // // // // GET ALL
// // // // // // // // // router.get('/', requireAuth, async (req: Request, res: Response) => {
// // // // // // // // //   try {
// // // // // // // // //     const courses = await Course.find()
// // // // // // // // //       .select('title isPublished modules updatedAt facilitatorIds price category organizer programType thumbnailUrl')
// // // // // // // // //       .populate('facilitatorIds', 'name avatarUrl')
// // // // // // // // //       .sort({ createdAt: -1 });
// // // // // // // // //     res.json({ courses });
// // // // // // // // //   } catch (err: any) {
// // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // //   }
// // // // // // // // // });

// // // // // // // // // // GET SINGLE
// // // // // // // // // router.get('/:id', requireAuth, async (req: AuthedRequest, res: Response) => {
// // // // // // // // //   try {
// // // // // // // // //     const course = await Course.findById(req.params.id)
// // // // // // // // //       .populate('facilitatorIds', 'name email avatarUrl')
// // // // // // // // //       .populate('modules.facilitatorId', 'name')
// // // // // // // // //       .populate('modules.lessons.facilitatorId', 'name');

// // // // // // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // // // // // // // //     res.json(course); 
// // // // // // // // //   } catch (err: any) {
// // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // //   }
// // // // // // // // // });

// // // // // // // // // // CREATE
// // // // // // // // // router.post('/', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // //   try {
// // // // // // // // //     const data = courseSchema.parse(req.body);
// // // // // // // // //     let finalFacilitatorIds: string[] = [];
// // // // // // // // //     if (data.facilitatorIds && data.facilitatorIds.length > 0) {
// // // // // // // // //         finalFacilitatorIds = data.facilitatorIds;
// // // // // // // // //     } else if (data.facilitator) {
// // // // // // // // //         finalFacilitatorIds = [data.facilitator];
// // // // // // // // //     } else {
// // // // // // // // //         finalFacilitatorIds = [req.user!.id];
// // // // // // // // //     }

// // // // // // // // //     const course = await Course.create({
// // // // // // // // //       ...data,
// // // // // // // // //       isPublished: data.published, 
// // // // // // // // //       facilitatorIds: finalFacilitatorIds,
// // // // // // // // //       organizer: data.organizer,
// // // // // // // // //       programType: data.programType,
// // // // // // // // //       certificateConfig: data.certificateConfig
// // // // // // // // //     });

// // // // // // // // //     res.status(201).json(course);
// // // // // // // // //   } catch (err: any) {
// // // // // // // // //     if (err.name === 'ZodError') return res.status(400).json({ error: err.issues });
// // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // //   }
// // // // // // // // // });

// // // // // // // // // // UPDATE
// // // // // // // // // router.put('/:id', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // //   try {
// // // // // // // // //     const data = courseSchema.partial().parse(req.body);
// // // // // // // // //     const updateData: any = { ...data };
    
// // // // // // // // //     if (data.published !== undefined) {
// // // // // // // // //         updateData.isPublished = data.published;
// // // // // // // // //         delete updateData.published;
// // // // // // // // //     }

// // // // // // // // //     if (data.facilitatorIds) {
// // // // // // // // //         updateData.facilitatorIds = data.facilitatorIds;
// // // // // // // // //     } else if (data.facilitator) {
// // // // // // // // //         updateData.facilitatorIds = [data.facilitator];
// // // // // // // // //         delete updateData.facilitator; 
// // // // // // // // //     }

// // // // // // // // //     if (data.certificateConfig) {
// // // // // // // // //         updateData.certificateConfig = data.certificateConfig;
// // // // // // // // //     }
    
// // // // // // // // //     if (data.competencies) {
// // // // // // // // //         updateData.competencies = data.competencies;
// // // // // // // // //     }

// // // // // // // // //     const course = await Course.findOneAndUpdate(
// // // // // // // // //       { _id: req.params.id },
// // // // // // // // //       { $set: updateData },
// // // // // // // // //       { new: true }
// // // // // // // // //     );

// // // // // // // // //     if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // // //     res.json(course);
// // // // // // // // //   } catch (err: any) {
// // // // // // // // //     console.error(err);
// // // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // // //   }
// // // // // // // // // });

// // // // // // // // // // OTHER CRUD
// // // // // // // // // router.patch('/:id/publish', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { try { const course = await Course.findById(req.params.id); if(!course) return res.status(404).json({error: 'Not found'}); course.isPublished = !course.isPublished; await course.save(); res.json(course); } catch(err: any) { res.status(500).json({error: err.message}); } });
// // // // // // // // // router.delete('/:id', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { try { const course = await Course.findOneAndDelete({ _id: req.params.id }); if (!course) return res.status(404).json({ error: 'Course not found' }); res.json({ message: 'Course deleted successfully' }); } catch (err: any) { res.status(500).json({ error: err.message }); } });
// // // // // // // // // router.post('/:id/modules', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { try { const course = await Course.findById(req.params.id); if (!course) return res.status(404).json({ error: 'Course not found' }); if (req.body.facilitatorId === "") req.body.facilitatorId = null; course.modules.push(req.body); await course.save(); res.json(course); } catch (err: any) { res.status(500).json({ error: err.message }); } });
// // // // // // // // // router.put('/:id/modules/:moduleId', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { try { const course = await Course.findById(req.params.id); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.find((m: any) => m._id.toString() === req.params.moduleId); if (!module) return res.status(404).json({ error: 'Module not found' }); if (req.body.facilitatorId === "") req.body.facilitatorId = null; Object.assign(module, req.body); await course.save(); res.json(course); } catch (err: any) { res.status(500).json({ error: err.message }); } });
// // // // // // // // // router.delete('/:id/modules/:moduleId', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { try { const course = await Course.findById(req.params.id); if (!course) return res.status(404).json({ error: 'Course not found' }); course.modules = course.modules.filter((m: any) => m._id.toString() !== req.params.moduleId); await course.save(); res.json(course); } catch (err: any) { res.status(500).json({ error: err.message }); } });
// // // // // // // // // router.post('/:id/modules/:moduleId/lessons', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { try { const course = await Course.findById(req.params.id); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.find((m: any) => m._id.toString() === req.params.moduleId); if (!module) return res.status(404).json({ error: 'Module not found' }); if (req.body.facilitatorId === "") req.body.facilitatorId = null; module.lessons.push(req.body); await course.save(); res.json(course); } catch (err: any) { res.status(500).json({ error: err.message }); } });
// // // // // // // // // router.put('/:id/modules/:moduleId/lessons/:lessonId', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { try { const course = await Course.findById(req.params.id); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.find((m: any) => m._id.toString() === req.params.moduleId); if (!module) return res.status(404).json({ error: 'Module not found' }); const lesson = module.lessons.find((l: any) => l._id.toString() === req.params.lessonId); if (!lesson) return res.status(404).json({ error: 'Lesson not found' }); if (req.body.facilitatorId === "") req.body.facilitatorId = null; Object.assign(lesson, req.body); await course.save(); res.json(course); } catch (err: any) { res.status(500).json({ error: err.message }); } });
// // // // // // // // // router.delete('/:id/modules/:moduleId/lessons/:lessonId', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { try { const course = await Course.findById(req.params.id); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.find((m: any) => m._id.toString() === req.params.moduleId); if (!module) return res.status(404).json({ error: 'Module not found' }); module.lessons = module.lessons.filter((l: any) => l._id.toString() !== req.params.lessonId); await course.save(); res.json(course); } catch (err: any) { res.status(500).json({ error: err.message }); } });
// // // // // // // // // router.patch('/:id/toggle-status', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { try { const { moduleId, lessonId } = req.body; const course = await Course.findById(req.params.id); if (!course) return res.status(404).json({ error: 'Course not found' }); if (moduleId && lessonId) { const mod = course.modules.find((m: any) => m._id.toString() === moduleId); if (mod) { const les = mod.lessons.find((l: any) => l._id.toString() === lessonId); if (les) les.isActive = !les.isActive; } } else if (moduleId) { const mod = course.modules.find((m: any) => m._id.toString() === moduleId); if (mod) mod.isActive = !mod.isActive; } await course.save(); res.json(course); } catch (err: any) { res.status(500).json({ error: err.message }); } });
// // // // // // // // // router.patch('/:id/reorder', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { try { const { modules } = req.body; const course = await Course.findById(req.params.id); if (!course) return res.status(404).json({ error: 'Course not found' }); course.modules = modules; await course.save(); res.json(course); } catch (err: any) { res.status(500).json({ error: err.message }); } });
// // // // // // // // // router.post('/mark-complete-lesson', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { res.json({ message: "Success" }); });
// // // // // // // // // router.post('/reset-quiz', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { res.json({ message: "Success" }); });

// // // // // // // // // // ==========================================
// // // // // // // // // // PREVIEW CERTIFICATE (A4 PORTRAIT)
// // // // // // // // // // ==========================================
// // // // // // // // // router.post('/certificate/preview', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // // //     try {
// // // // // // // // //         let { certificateConfig, competencies, courseId, includeCompetenciesInCertificate } = req.body;
        
// // // // // // // // //         if ((!competencies || competencies.length === 0) && courseId) {
// // // // // // // // //             try {
// // // // // // // // //                 const course = await Course.findById(courseId);
// // // // // // // // //                 if (course && course.competencies && course.competencies.length > 0) {
// // // // // // // // //                     competencies = course.competencies;
// // // // // // // // //                 }
// // // // // // // // //             } catch (err) { console.warn("Fetch DB fail:", err); }
// // // // // // // // //         }

// // // // // // // // //         const doc = new PDFDocument({ size: 'A4', layout: 'portrait', margin: 0 });
// // // // // // // // //         res.setHeader('Content-Type', 'application/pdf');
// // // // // // // // //         res.setHeader('Content-Disposition', 'inline; filename=draft-sertifikat.pdf');
// // // // // // // // //         doc.pipe(res);

// // // // // // // // //         // ... (Kode PDF sama seperti sebelumnya) ...
// // // // // // // // //         const totalWidth = 595;
// // // // // // // // //         const headerHeight = 50;
// // // // // // // // //         const segmentWidth = totalWidth / 4;

// // // // // // // // //         doc.rect(0, 0, segmentWidth, headerHeight).fill('#D50000');
// // // // // // // // //         doc.rect(segmentWidth, 0, segmentWidth, headerHeight).fill('#E65100');
// // // // // // // // //         doc.rect(segmentWidth * 2, 0, segmentWidth, headerHeight).fill('#FF8A65');
// // // // // // // // //         doc.rect(segmentWidth * 3, 0, segmentWidth, headerHeight).fill('#FFCCBC');

// // // // // // // // //         const logoPath = path.join(__dirname, '../../assets/logo-pmi.png');
// // // // // // // // //         if (fs.existsSync(logoPath)) {
// // // // // // // // //             doc.image(logoPath, (totalWidth / 2) - 40, 70, { width: 80 });
// // // // // // // // //         } else {
// // // // // // // // //             doc.fillColor('#D50000').fontSize(12).text('[LOGO PMI]', 0, 90, { align: 'center' });
// // // // // // // // //         }

// // // // // // // // //         doc.moveDown(5); 
// // // // // // // // //         const startY = 160;
// // // // // // // // //         doc.fillColor('black');
// // // // // // // // //         doc.font('Helvetica-Bold').fontSize(32).text('SERTIFIKAT', 0, startY + 30, { align: 'center', characterSpacing: 2 });
// // // // // // // // //         doc.font('Helvetica-Oblique').fontSize(14).text('Certificate', 0, startY + 65, { align: 'center' });

// // // // // // // // //         let sampleNo = '001';
// // // // // // // // //         if (certificateConfig.startNumber) {
// // // // // // // // //             sampleNo = String(certificateConfig.startNumber).padStart(3, '0');
// // // // // // // // //         }
// // // // // // // // //         const finalNo = (certificateConfig.certificateNumber || '').replace('{NO}', sampleNo);
// // // // // // // // //         doc.font('Helvetica').fontSize(12).text(`No : ${finalNo || '---/---/---'}`, 0, startY + 85, { align: 'center' });

// // // // // // // // //         doc.font('Helvetica').fontSize(12).text('Diberikan kepada :', 0, startY + 115, { align: 'center' });
// // // // // // // // //         doc.font('Helvetica-Oblique').fontSize(10).text('Awarded to', 0, startY + 130, { align: 'center' });
// // // // // // // // //         doc.font('Helvetica-Bold').fontSize(24).text('NAMA PESERTA', 0, startY + 150, { align: 'center' });
// // // // // // // // //         doc.font('Helvetica').fontSize(14).text('UNIT / INSTANSI PESERTA', 0, startY + 180, { align: 'center' });
// // // // // // // // //         doc.font('Helvetica').fontSize(12).text('Sebagai', 0, startY + 210, { align: 'center' });
// // // // // // // // //         doc.font('Helvetica-Bold').fontSize(16).text('PESERTA', 0, startY + 230, { align: 'center' });
// // // // // // // // //         doc.font('Helvetica-Bold').fontSize(20).text('JUDUL PELATIHAN ANDA', 0, startY + 260, { align: 'center' });
// // // // // // // // //         doc.font('Helvetica-Oblique').fontSize(12).text('Training Title Here', 0, startY + 285, { align: 'center' });

// // // // // // // // //         const cityStr = certificateConfig.city || 'Jakarta';
// // // // // // // // //         const dateStr = certificateConfig.executionDate 
// // // // // // // // //             ? new Date(certificateConfig.executionDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
// // // // // // // // //             : '.......................';
// // // // // // // // //         doc.font('Helvetica').fontSize(11).text(`Dilaksanakan di ${cityStr}, pada tanggal ${dateStr}`, 0, startY + 315, { align: 'center' });

// // // // // // // // //         const signY = 650; 
// // // // // // // // //         doc.font('Helvetica').fontSize(12).text(`${cityStr}, ${dateStr}`, 0, signY, { align: 'center' });
// // // // // // // // //         doc.moveDown(0.3);
// // // // // // // // //         doc.font('Helvetica-Bold').text(certificateConfig.signatoryPosition || 'Pengurus Kabupaten', { align: 'center' });
// // // // // // // // //         doc.font('Helvetica-Oblique').fontSize(10).text('District Board Member', { align: 'center' });
// // // // // // // // //         doc.moveDown(0.2);
// // // // // // // // //         doc.font('Helvetica-Bold').fontSize(12).text('PALANG MERAH INDONESIA', { align: 'center' });
// // // // // // // // //         doc.font('Helvetica-Oblique').fontSize(10).text('Indonesian Red Cross', { align: 'center' });
// // // // // // // // //         doc.moveDown(0.2);
// // // // // // // // //         doc.font('Helvetica-Bold').fontSize(12).text('Ketua,', { align: 'center' });
// // // // // // // // //         doc.font('Helvetica-Oblique').fontSize(10).text('Chairman', { align: 'center' });
// // // // // // // // //         doc.moveDown(3);
// // // // // // // // //         doc.font('Helvetica-Bold').fontSize(12).text(certificateConfig.signatoryName || '(Nama Pejabat)', { align: 'center', underline: true });

// // // // // // // // //         if ((includeCompetenciesInCertificate || (competencies && competencies.length > 0)) && competencies) {
// // // // // // // // //             doc.addPage();
            
// // // // // // // // //             const drawTableHeaders = (yPos: number) => {
// // // // // // // // //                 const col1X = 50;  const col2X = 90;  const col3X = 220; const headerH = 35;
// // // // // // // // //                 doc.font('Helvetica-Bold').fontSize(10);
// // // // // // // // //                 doc.rect(col1X, yPos, 40, headerH).stroke(); doc.rect(col2X, yPos, 130, headerH).stroke(); doc.rect(col3X, yPos, 325, headerH).stroke(); 
// // // // // // // // //                 doc.fillColor('black').text('No.', col1X + 10, yPos + 8).text('No Kode', col2X + 10, yPos + 5);
// // // // // // // // //                 doc.fontSize(8).text('Unit Code', col2X + 10, yPos + 20, { oblique: true });
// // // // // // // // //                 doc.fontSize(10).text('Judul Unit', col3X + 10, yPos + 5);
// // // // // // // // //                 doc.fontSize(8).text('Unit Title', col3X + 10, yPos + 20, { oblique: true });
// // // // // // // // //             };

// // // // // // // // //             doc.fillColor('black').font('Helvetica-Bold').fontSize(14).text('Markas Kabupaten', 50, 50);
// // // // // // // // //             doc.text('Palang Merah Indonesia', 50, 70);
// // // // // // // // //             doc.fontSize(16).text('Daftar Unit Kompetensi', 0, 120, { align: 'center' });
// // // // // // // // //             doc.font('Helvetica-Oblique').fontSize(12).text('List of Unit(s) of Competency', 0, 140, { align: 'center' });

// // // // // // // // //             let tableTop = 180; const rowHeight = 35; const pageBottomLimit = 750;
// // // // // // // // //             drawTableHeaders(tableTop);
// // // // // // // // //             let currentY = tableTop + rowHeight;
// // // // // // // // //             const col1X = 50; const col2X = 90; const col3X = 220;
// // // // // // // // //             doc.font('Helvetica').fontSize(10);

// // // // // // // // //             competencies.forEach((comp: any, index: number) => {
// // // // // // // // //                 if (currentY + rowHeight > pageBottomLimit) {
// // // // // // // // //                     doc.addPage(); tableTop = 50; drawTableHeaders(tableTop); currentY = tableTop + rowHeight; doc.font('Helvetica').fontSize(10);
// // // // // // // // //                 }
// // // // // // // // //                 doc.rect(col1X, currentY, 40, rowHeight).stroke();
// // // // // // // // //                 doc.rect(col2X, currentY, 130, rowHeight).stroke();
// // // // // // // // //                 doc.rect(col3X, currentY, 325, rowHeight).stroke();
// // // // // // // // //                 doc.text(String(index + 1), col1X + 12, currentY + 12);
// // // // // // // // //                 doc.text(comp.code || '-', col2X + 10, currentY + 12);
// // // // // // // // //                 doc.text(comp.title || '-', col3X + 10, currentY + 12, { width: 310, height: rowHeight - 10, ellipsis: true });
// // // // // // // // //                 currentY += rowHeight;
// // // // // // // // //             });

// // // // // // // // //             if (currentY + 150 > pageBottomLimit) { doc.addPage(); currentY = 50; } else { currentY += 30; }
// // // // // // // // //             const sign2X = 320; 
// // // // // // // // //             doc.font('Helvetica').fontSize(11).text(`${cityStr}, ${dateStr}`, sign2X, currentY);
// // // // // // // // //             doc.font('Helvetica-Bold').text(certificateConfig.signatoryPosition || 'Kepala Pusdiklat', sign2X, currentY + 15);
// // // // // // // // //             doc.font('Helvetica-Oblique').fontSize(9).text('Head of Education and Training Center', sign2X, currentY + 28);
// // // // // // // // //             doc.font('Helvetica-Bold').fontSize(11).text('Palang Merah Indonesia', sign2X, currentY + 40);
// // // // // // // // //             doc.moveDown(4).text('_______________________', sign2X, currentY + 120);
// // // // // // // // //             if (certificateConfig.signatoryName) { doc.text(certificateConfig.signatoryName, sign2X, currentY + 135); }
// // // // // // // // //         }

// // // // // // // // //         doc.end();
// // // // // // // // //     } catch (error: any) {
// // // // // // // // //         console.error("PDF Preview Error:", error);
// // // // // // // // //         res.status(500).send("Gagal membuat preview sertifikat: " + error.message);
// // // // // // // // //     }
// // // // // // // // // });

// // // // // // // // // export default router;
// // // // // // // // import { Router, Request, Response } from 'express';
// // // // // // // // import { Course } from '../models/Course'; 
// // // // // // // // import Enrollment from '../models/Enrollment'; // [IMPORTANT] Import Enrollment Model
// // // // // // // // import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth'; 
// // // // // // // // import { z } from 'zod';
// // // // // // // // import PDFDocument from 'pdfkit'; 
// // // // // // // // import fs from 'fs';
// // // // // // // // import path from 'path';
// // // // // // // // import { fileURLToPath } from 'url';

// // // // // // // // const router = Router();

// // // // // // // // const __filename = fileURLToPath(import.meta.url);
// // // // // // // // const __dirname = path.dirname(__filename);

// // // // // // // // // ==========================================
// // // // // // // // // 1. ZOD SCHEMAS
// // // // // // // // // ==========================================
// // // // // // // // const lessonSchema = z.object({
// // // // // // // //   title: z.string().min(1),
// // // // // // // //   type: z.enum(['video_url', 'upload_doc', 'quiz', 'essay', 'google_classroom', 'lesson', 'pdf', 'download_doc', 'image', 'slide', 'poll', 'virtual_class']).optional(),
// // // // // // // //   videoUrl: z.string().optional(),
// // // // // // // //   content: z.string().optional(),
// // // // // // // //   fileUrl: z.string().optional(),
// // // // // // // //   jp: z.number().default(0),
// // // // // // // //   scheduleDate: z.string().optional(),
// // // // // // // //   facilitator: z.string().optional(),
// // // // // // // //   facilitatorId: z.string().nullable().optional(), 
// // // // // // // //   classroomData: z.any().optional(),
// // // // // // // //   questions: z.array(z.any()).optional(),
// // // // // // // //   quizDuration: z.number().optional(),
// // // // // // // //   pollQuestion: z.string().optional(),
// // // // // // // //   pollOptions: z.array(z.string()).optional(),
// // // // // // // //   isActive: z.boolean().default(true),
// // // // // // // //   isMandatory: z.boolean().default(false)
// // // // // // // // });

// // // // // // // // const moduleSchema = z.object({
// // // // // // // //   title: z.string().min(1),
// // // // // // // //   lessons: z.array(lessonSchema).optional(),
// // // // // // // //   isActive: z.boolean().default(true),
// // // // // // // //   isMandatory: z.boolean().default(false),
// // // // // // // //   facilitatorId: z.string().nullable().optional(),
// // // // // // // //   jp: z.number().optional(),
// // // // // // // //   scheduleDate: z.string().optional()
// // // // // // // // });

// // // // // // // // const courseSchema = z.object({
// // // // // // // //   title: z.string().min(3),
// // // // // // // //   description: z.string().optional(),
// // // // // // // //   category: z.string().optional(), 
// // // // // // // //   level: z.string().optional(),
// // // // // // // //   price: z.number().default(0),
// // // // // // // //   thumbnailUrl: z.string().optional(),
// // // // // // // //   startDate: z.string().optional(),
// // // // // // // //   endDate: z.string().optional(),
// // // // // // // //   credits: z.number().default(0),
  
// // // // // // // //   facilitator: z.string().optional(), 
// // // // // // // //   facilitatorIds: z.array(z.string()).optional(),

// // // // // // // //   modules: z.array(moduleSchema).default([]),
// // // // // // // //   published: z.boolean().default(false), 
// // // // // // // //   organizer: z.string().default('PMI Pusat'),
// // // // // // // //   programType: z.string().default('training'),
  
// // // // // // // //   competencies: z.array(z.object({
// // // // // // // //       code: z.string(),
// // // // // // // //       title: z.string()
// // // // // // // //   })).optional(),
  
// // // // // // // //   includeCompetenciesInCertificate: z.boolean().optional(),

// // // // // // // //   certificateConfig: z.object({
// // // // // // // //       certificateNumber: z.string().optional(),
// // // // // // // //       startNumber: z.coerce.number().optional().default(1), 
// // // // // // // //       executionDate: z.string().optional().or(z.date()),
// // // // // // // //       city: z.string().optional(),
// // // // // // // //       signatoryName: z.string().optional(),
// // // // // // // //       signatoryPosition: z.string().optional()
// // // // // // // //   }).optional(),
// // // // // // // // });

// // // // // // // // // ==========================================
// // // // // // // // // 2. COURSE ROUTES (CRUD)
// // // // // // // // // ==========================================

// // // // // // // // // GET PUBLISHED
// // // // // // // // router.get('/published', async (req: Request, res: Response) => {
// // // // // // // //   try {
// // // // // // // //     const { search } = req.query;
// // // // // // // //     let query: any = { isPublished: true };
// // // // // // // //     if (search) query.title = { $regex: search, $options: 'i' };
    
// // // // // // // //     // Removed populate('categoryId') based on previous fix
// // // // // // // //     const courses = await Course.find(query)
// // // // // // // //         .select('title thumbnailUrl level category price organizer programType facilitatorIds modules isPublished')
// // // // // // // //         .populate('facilitatorIds', 'name avatarUrl') 
// // // // // // // //         .sort({ createdAt: -1 });
// // // // // // // //     res.json({ courses });
// // // // // // // //   } catch (err: any) { res.status(500).json({ error: err.message }); }
// // // // // // // // });

// // // // // // // // // GET ALL
// // // // // // // // router.get('/', requireAuth, async (req: Request, res: Response) => {
// // // // // // // //   try {
// // // // // // // //     const courses = await Course.find().select('title isPublished modules updatedAt facilitatorIds price category organizer programType thumbnailUrl').populate('facilitatorIds', 'name avatarUrl').sort({ createdAt: -1 });
// // // // // // // //     res.json({ courses });
// // // // // // // //   } catch (err: any) { res.status(500).json({ error: err.message }); }
// // // // // // // // });

// // // // // // // // // [UPDATED] GET PARTICIPANTS FROM ENROLLMENT
// // // // // // // // router.get('/:id/participants', requireAuth, async (req: Request, res: Response) => {
// // // // // // // //   try {
// // // // // // // //     const courseId = req.params.id;

// // // // // // // //     // Ambil data Enrollment, populate data user (nama, avatar, email)
// // // // // // // //     const enrollments = await Enrollment.find({ course: courseId })
// // // // // // // //       .populate('user', 'name email avatarUrl role') // Ambil detail user
// // // // // // // //       .sort({ createdAt: -1 });

// // // // // // // //     // Format data agar sesuai tampilan frontend
// // // // // // // //     const participants = enrollments.map((e: any) => ({
// // // // // // // //       _id: e._id, // ID Enrollment
// // // // // // // //       user: e.user, // Objek user lengkap untuk Chat/Profil
// // // // // // // //       progress: e.progress,
// // // // // // // //       isCompleted: e.isCompleted,
// // // // // // // //       registrationData: e.registrationData, // Data Formulir (Alamat, PMI Asal, dll)
// // // // // // // //       joinedAt: e.createdAt,
// // // // // // // //       status: 'approved' // Default approved
// // // // // // // //     }));

// // // // // // // //     res.json({ participants });
// // // // // // // //   } catch (err: any) {
// // // // // // // //     res.status(500).json({ error: err.message });
// // // // // // // //   }
// // // // // // // // });

// // // // // // // // // GET SINGLE
// // // // // // // // router.get('/:id', requireAuth, async (req: AuthedRequest, res: Response) => {
// // // // // // // //   try {
// // // // // // // //     const course = await Course.findById(req.params.id).populate('facilitatorIds', 'name email avatarUrl').populate('modules.facilitatorId', 'name').populate('modules.lessons.facilitatorId', 'name');
// // // // // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // // // // // // //     res.json(course); 
// // // // // // // //   } catch (err: any) { res.status(500).json({ error: err.message }); }
// // // // // // // // });

// // // // // // // // // CREATE
// // // // // // // // router.post('/', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // //   try {
// // // // // // // //     const data = courseSchema.parse(req.body);
// // // // // // // //     let finalFacilitatorIds: string[] = [];
// // // // // // // //     if (data.facilitatorIds && data.facilitatorIds.length > 0) finalFacilitatorIds = data.facilitatorIds;
// // // // // // // //     else if (data.facilitator) finalFacilitatorIds = [data.facilitator];
// // // // // // // //     else finalFacilitatorIds = [req.user!.id];
// // // // // // // //     const course = await Course.create({ ...data, isPublished: data.published, facilitatorIds: finalFacilitatorIds, organizer: data.organizer, programType: data.programType, certificateConfig: data.certificateConfig });
// // // // // // // //     res.status(201).json(course);
// // // // // // // //   } catch (err: any) { if (err.name === 'ZodError') return res.status(400).json({ error: err.issues }); res.status(500).json({ error: err.message }); }
// // // // // // // // });

// // // // // // // // // UPDATE
// // // // // // // // router.put('/:id', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // //   try {
// // // // // // // //     const data = courseSchema.partial().parse(req.body);
// // // // // // // //     const updateData: any = { ...data };
// // // // // // // //     if (data.published !== undefined) { updateData.isPublished = data.published; delete updateData.published; }
// // // // // // // //     if (data.facilitatorIds) updateData.facilitatorIds = data.facilitatorIds;
// // // // // // // //     else if (data.facilitator) { updateData.facilitatorIds = [data.facilitator]; delete updateData.facilitator; }
// // // // // // // //     if (data.certificateConfig) updateData.certificateConfig = data.certificateConfig;
// // // // // // // //     if (data.competencies) updateData.competencies = data.competencies; 

// // // // // // // //     const course = await Course.findOneAndUpdate({ _id: req.params.id }, { $set: updateData }, { new: true });
// // // // // // // //     if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // //     res.json(course);
// // // // // // // //   } catch (err: any) { console.error(err); res.status(500).json({ error: err.message }); }
// // // // // // // // });

// // // // // // // // // OTHER CRUD OPERATIONS
// // // // // // // // router.patch('/:id/publish', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { try { const course = await Course.findById(req.params.id); if(!course) return res.status(404).json({error: 'Not found'}); course.isPublished = !course.isPublished; await course.save(); res.json(course); } catch(err: any) { res.status(500).json({error: err.message}); } });
// // // // // // // // router.delete('/:id', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { try { const course = await Course.findOneAndDelete({ _id: req.params.id }); if (!course) return res.status(404).json({ error: 'Course not found' }); res.json({ message: 'Course deleted successfully' }); } catch (err: any) { res.status(500).json({ error: err.message }); } });
// // // // // // // // router.post('/:id/modules', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { try { const course = await Course.findById(req.params.id); if (!course) return res.status(404).json({ error: 'Course not found' }); if (req.body.facilitatorId === "") req.body.facilitatorId = null; course.modules.push(req.body); await course.save(); res.json(course); } catch (err: any) { res.status(500).json({ error: err.message }); } });
// // // // // // // // router.put('/:id/modules/:moduleId', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { try { const course = await Course.findById(req.params.id); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.find((m: any) => m._id.toString() === req.params.moduleId); if (!module) return res.status(404).json({ error: 'Module not found' }); if (req.body.facilitatorId === "") req.body.facilitatorId = null; Object.assign(module, req.body); await course.save(); res.json(course); } catch (err: any) { res.status(500).json({ error: err.message }); } });
// // // // // // // // router.delete('/:id/modules/:moduleId', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { try { const course = await Course.findById(req.params.id); if (!course) return res.status(404).json({ error: 'Course not found' }); course.modules = course.modules.filter((m: any) => m._id.toString() !== req.params.moduleId); await course.save(); res.json(course); } catch (err: any) { res.status(500).json({ error: err.message }); } });
// // // // // // // // router.post('/:id/modules/:moduleId/lessons', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { try { const course = await Course.findById(req.params.id); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.find((m: any) => m._id.toString() === req.params.moduleId); if (!module) return res.status(404).json({ error: 'Module not found' }); if (req.body.facilitatorId === "") req.body.facilitatorId = null; module.lessons.push(req.body); await course.save(); res.json(course); } catch (err: any) { res.status(500).json({ error: err.message }); } });
// // // // // // // // router.put('/:id/modules/:moduleId/lessons/:lessonId', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { try { const course = await Course.findById(req.params.id); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.find((m: any) => m._id.toString() === req.params.moduleId); if (!module) return res.status(404).json({ error: 'Module not found' }); const lesson = module.lessons.find((l: any) => l._id.toString() === req.params.lessonId); if (!lesson) return res.status(404).json({ error: 'Lesson not found' }); if (req.body.facilitatorId === "") req.body.facilitatorId = null; Object.assign(lesson, req.body); await course.save(); res.json(course); } catch (err: any) { res.status(500).json({ error: err.message }); } });
// // // // // // // // router.delete('/:id/modules/:moduleId/lessons/:lessonId', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { try { const course = await Course.findById(req.params.id); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.find((m: any) => m._id.toString() === req.params.moduleId); if (!module) return res.status(404).json({ error: 'Module not found' }); module.lessons = module.lessons.filter((l: any) => l._id.toString() !== req.params.lessonId); await course.save(); res.json(course); } catch (err: any) { res.status(500).json({ error: err.message }); } });
// // // // // // // // router.patch('/:id/toggle-status', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { try { const { moduleId, lessonId } = req.body; const course = await Course.findById(req.params.id); if (!course) return res.status(404).json({ error: 'Course not found' }); if (moduleId && lessonId) { const mod = course.modules.find((m: any) => m._id.toString() === moduleId); if (mod) { const les = mod.lessons.find((l: any) => l._id.toString() === lessonId); if (les) les.isActive = !les.isActive; } } else if (moduleId) { const mod = course.modules.find((m: any) => m._id.toString() === moduleId); if (mod) mod.isActive = !mod.isActive; } await course.save(); res.json(course); } catch (err: any) { res.status(500).json({ error: err.message }); } });
// // // // // // // // router.patch('/:id/reorder', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { try { const { modules } = req.body; const course = await Course.findById(req.params.id); if (!course) return res.status(404).json({ error: 'Course not found' }); course.modules = modules; await course.save(); res.json(course); } catch (err: any) { res.status(500).json({ error: err.message }); } });
// // // // // // // // router.post('/mark-complete-lesson', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { res.json({ message: "Success" }); });
// // // // // // // // router.post('/reset-quiz', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { res.json({ message: "Success" }); });

// // // // // // // // // ==========================================
// // // // // // // // // PREVIEW CERTIFICATE (A4 PORTRAIT + BACK PAGE AUTO PAGINATION)
// // // // // // // // // ==========================================
// // // // // // // // router.post('/certificate/preview', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // // //     try {
// // // // // // // //         let { certificateConfig, competencies, courseId, includeCompetenciesInCertificate } = req.body;
        
// // // // // // // //         if ((!competencies || competencies.length === 0) && courseId) {
// // // // // // // //             try {
// // // // // // // //                 const course = await Course.findById(courseId);
// // // // // // // //                 if (course && course.competencies && course.competencies.length > 0) {
// // // // // // // //                     competencies = course.competencies;
// // // // // // // //                 }
// // // // // // // //             } catch (err) { console.warn("Fetch DB fail:", err); }
// // // // // // // //         }

// // // // // // // //         const doc = new PDFDocument({ size: 'A4', layout: 'portrait', margin: 0 });
// // // // // // // //         res.setHeader('Content-Type', 'application/pdf');
// // // // // // // //         res.setHeader('Content-Disposition', 'inline; filename=draft-sertifikat.pdf');
// // // // // // // //         doc.pipe(res);

// // // // // // // //         // --- HALAMAN 1: DEPAN ---
// // // // // // // //         const totalWidth = 595;
// // // // // // // //         const headerHeight = 50;
// // // // // // // //         const segmentWidth = totalWidth / 4;

// // // // // // // //         doc.rect(0, 0, segmentWidth, headerHeight).fill('#D50000');
// // // // // // // //         doc.rect(segmentWidth, 0, segmentWidth, headerHeight).fill('#E65100');
// // // // // // // //         doc.rect(segmentWidth * 2, 0, segmentWidth, headerHeight).fill('#FF8A65');
// // // // // // // //         doc.rect(segmentWidth * 3, 0, segmentWidth, headerHeight).fill('#FFCCBC');

// // // // // // // //         const logoPath = path.join(__dirname, '../../assets/logo-pmi.png');
// // // // // // // //         if (fs.existsSync(logoPath)) {
// // // // // // // //             doc.image(logoPath, (totalWidth / 2) - 40, 70, { width: 80 });
// // // // // // // //         } else {
// // // // // // // //             doc.fillColor('#D50000').fontSize(12).text('[LOGO PMI]', 0, 90, { align: 'center' });
// // // // // // // //         }

// // // // // // // //         doc.moveDown(5); 
// // // // // // // //         const startY = 160;
// // // // // // // //         doc.fillColor('black');
// // // // // // // //         doc.font('Helvetica-Bold').fontSize(32).text('SERTIFIKAT', 0, startY + 30, { align: 'center', characterSpacing: 2 });
// // // // // // // //         doc.font('Helvetica-Oblique').fontSize(14).text('Certificate', 0, startY + 65, { align: 'center' });

// // // // // // // //         let sampleNo = '001';
// // // // // // // //         if (certificateConfig.startNumber) {
// // // // // // // //             sampleNo = String(certificateConfig.startNumber).padStart(3, '0');
// // // // // // // //         }
// // // // // // // //         const finalNo = (certificateConfig.certificateNumber || '').replace('{NO}', sampleNo);
// // // // // // // //         doc.font('Helvetica').fontSize(12).text(`No : ${finalNo || '---/---/---'}`, 0, startY + 85, { align: 'center' });

// // // // // // // //         doc.font('Helvetica').fontSize(12).text('Diberikan kepada :', 0, startY + 115, { align: 'center' });
// // // // // // // //         doc.font('Helvetica-Oblique').fontSize(10).text('Awarded to', 0, startY + 130, { align: 'center' });
// // // // // // // //         doc.font('Helvetica-Bold').fontSize(24).text('NAMA PESERTA', 0, startY + 150, { align: 'center' });
// // // // // // // //         doc.font('Helvetica').fontSize(14).text('UNIT / INSTANSI PESERTA', 0, startY + 180, { align: 'center' });
// // // // // // // //         doc.font('Helvetica').fontSize(12).text('Sebagai', 0, startY + 210, { align: 'center' });
// // // // // // // //         doc.font('Helvetica-Bold').fontSize(16).text('PESERTA', 0, startY + 230, { align: 'center' });
// // // // // // // //         doc.font('Helvetica-Bold').fontSize(20).text('JUDUL PELATIHAN ANDA', 0, startY + 260, { align: 'center' });
// // // // // // // //         doc.font('Helvetica-Oblique').fontSize(12).text('Training Title Here', 0, startY + 285, { align: 'center' });

// // // // // // // //         const cityStr = certificateConfig.city || 'Jakarta';
// // // // // // // //         const dateStr = certificateConfig.executionDate 
// // // // // // // //             ? new Date(certificateConfig.executionDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
// // // // // // // //             : '.......................';
// // // // // // // //         doc.font('Helvetica').fontSize(11).text(`Dilaksanakan di ${cityStr}, pada tanggal ${dateStr}`, 0, startY + 315, { align: 'center' });

// // // // // // // //         const signY = 650; 
// // // // // // // //         doc.font('Helvetica').fontSize(12).text(`${cityStr}, ${dateStr}`, 0, signY, { align: 'center' });
// // // // // // // //         doc.moveDown(0.3);
// // // // // // // //         doc.font('Helvetica-Bold').text(certificateConfig.signatoryPosition || 'Pengurus Kabupaten', { align: 'center' });
// // // // // // // //         doc.font('Helvetica-Oblique').fontSize(10).text('District Board Member', { align: 'center' });
// // // // // // // //         doc.moveDown(0.2);
// // // // // // // //         doc.font('Helvetica-Bold').fontSize(12).text('PALANG MERAH INDONESIA', { align: 'center' });
// // // // // // // //         doc.font('Helvetica-Oblique').fontSize(10).text('Indonesian Red Cross', { align: 'center' });
// // // // // // // //         doc.moveDown(0.2);
// // // // // // // //         doc.font('Helvetica-Bold').fontSize(12).text('Ketua,', { align: 'center' });
// // // // // // // //         doc.font('Helvetica-Oblique').fontSize(10).text('Chairman', { align: 'center' });
// // // // // // // //         doc.moveDown(3);
// // // // // // // //         doc.font('Helvetica-Bold').fontSize(12).text(certificateConfig.signatoryName || '(Nama Pejabat)', { align: 'center', underline: true });

// // // // // // // //         // --- HALAMAN 2: DAFTAR KOMPETENSI (AUTO PAGINATION) ---
// // // // // // // //         if ((includeCompetenciesInCertificate || (competencies && competencies.length > 0)) && competencies) {
// // // // // // // //             doc.addPage();
            
// // // // // // // //             const drawTableHeaders = (yPos: number) => {
// // // // // // // //                 const col1X = 50;  const col2X = 90;  const col3X = 220; const headerH = 35;
// // // // // // // //                 doc.font('Helvetica-Bold').fontSize(10);
// // // // // // // //                 doc.rect(col1X, yPos, 40, headerH).stroke(); doc.rect(col2X, yPos, 130, headerH).stroke(); doc.rect(col3X, yPos, 325, headerH).stroke(); 
// // // // // // // //                 doc.fillColor('black').text('No.', col1X + 10, yPos + 8).text('No Kode', col2X + 10, yPos + 5);
// // // // // // // //                 doc.fontSize(8).text('Unit Code', col2X + 10, yPos + 20, { oblique: true });
// // // // // // // //                 doc.fontSize(10).text('Judul Unit', col3X + 10, yPos + 5);
// // // // // // // //                 doc.fontSize(8).text('Unit Title', col3X + 10, yPos + 20, { oblique: true });
// // // // // // // //             };

// // // // // // // //             doc.fillColor('black').font('Helvetica-Bold').fontSize(14).text('Markas Kabupaten', 50, 50);
// // // // // // // //             doc.text('Palang Merah Indonesia', 50, 70);
// // // // // // // //             doc.fontSize(16).text('Daftar Unit Kompetensi', 0, 120, { align: 'center' });
// // // // // // // //             doc.font('Helvetica-Oblique').fontSize(12).text('List of Unit(s) of Competency', 0, 140, { align: 'center' });

// // // // // // // //             let tableTop = 180; const rowHeight = 35; const pageBottomLimit = 750;
// // // // // // // //             drawTableHeaders(tableTop);
// // // // // // // //             let currentY = tableTop + rowHeight;
// // // // // // // //             const col1X = 50; const col2X = 90; const col3X = 220;
// // // // // // // //             doc.font('Helvetica').fontSize(10);

// // // // // // // //             competencies.forEach((comp: any, index: number) => {
// // // // // // // //                 if (currentY + rowHeight > pageBottomLimit) {
// // // // // // // //                     doc.addPage(); tableTop = 50; drawTableHeaders(tableTop); currentY = tableTop + rowHeight; doc.font('Helvetica').fontSize(10);
// // // // // // // //                 }
// // // // // // // //                 doc.rect(col1X, currentY, 40, rowHeight).stroke();
// // // // // // // //                 doc.rect(col2X, currentY, 130, rowHeight).stroke();
// // // // // // // //                 doc.rect(col3X, currentY, 325, rowHeight).stroke();
// // // // // // // //                 doc.text(String(index + 1), col1X + 12, currentY + 12);
// // // // // // // //                 doc.text(comp.code || '-', col2X + 10, currentY + 12);
// // // // // // // //                 doc.text(comp.title || '-', col3X + 10, currentY + 12, { width: 310, height: rowHeight - 10, ellipsis: true });
// // // // // // // //                 currentY += rowHeight;
// // // // // // // //             });

// // // // // // // //             if (currentY + 150 > pageBottomLimit) { doc.addPage(); currentY = 50; } else { currentY += 30; }
// // // // // // // //             const sign2X = 320; 
// // // // // // // //             doc.font('Helvetica').fontSize(11).text(`${cityStr}, ${dateStr}`, sign2X, currentY);
// // // // // // // //             doc.font('Helvetica-Bold').text(certificateConfig.signatoryPosition || 'Kepala Pusdiklat', sign2X, currentY + 15);
// // // // // // // //             doc.font('Helvetica-Oblique').fontSize(9).text('Head of Education and Training Center', sign2X, currentY + 28);
// // // // // // // //             doc.font('Helvetica-Bold').fontSize(11).text('Palang Merah Indonesia', sign2X, currentY + 40);
// // // // // // // //             doc.moveDown(4).text('_______________________', sign2X, currentY + 120);
// // // // // // // //             if (certificateConfig.signatoryName) { doc.text(certificateConfig.signatoryName, sign2X, currentY + 135); }
// // // // // // // //         }

// // // // // // // //         doc.end();
// // // // // // // //     } catch (error: any) {
// // // // // // // //         console.error("PDF Preview Error:", error);
// // // // // // // //         res.status(500).send("Gagal membuat preview sertifikat: " + error.message);
// // // // // // // //     }
// // // // // // // // });

// // // // // // // // export default router;
// // // // // // // import { Router, Request, Response } from 'express';
// // // // // // // import { Course } from '../models/Course'; 
// // // // // // // import Enrollment from '../models/Enrollment'; // [PENTING] Import Model Enrollment
// // // // // // // import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth'; 
// // // // // // // import { z } from 'zod';
// // // // // // // import PDFDocument from 'pdfkit'; 
// // // // // // // import fs from 'fs';
// // // // // // // import path from 'path';
// // // // // // // import { fileURLToPath } from 'url';

// // // // // // // const router = Router();

// // // // // // // // Definisikan __dirname secara manual untuk ES Modules
// // // // // // // const __filename = fileURLToPath(import.meta.url);
// // // // // // // const __dirname = path.dirname(__filename);

// // // // // // // // ==========================================
// // // // // // // // 1. ZOD SCHEMAS
// // // // // // // // ==========================================
// // // // // // // const lessonSchema = z.object({
// // // // // // //   title: z.string().min(1),
// // // // // // //   type: z.enum(['video_url', 'upload_doc', 'quiz', 'essay', 'google_classroom', 'lesson', 'pdf', 'download_doc', 'image', 'slide', 'poll', 'virtual_class']).optional(),
// // // // // // //   videoUrl: z.string().optional(),
// // // // // // //   content: z.string().optional(),
// // // // // // //   fileUrl: z.string().optional(),
// // // // // // //   jp: z.number().default(0),
// // // // // // //   scheduleDate: z.string().optional(),
// // // // // // //   facilitator: z.string().optional(),
// // // // // // //   facilitatorId: z.string().nullable().optional(), 
// // // // // // //   classroomData: z.any().optional(),
// // // // // // //   questions: z.array(z.any()).optional(),
// // // // // // //   quizDuration: z.number().optional(),
// // // // // // //   pollQuestion: z.string().optional(),
// // // // // // //   pollOptions: z.array(z.string()).optional(),
// // // // // // //   isActive: z.boolean().default(true),
// // // // // // //   isMandatory: z.boolean().default(false)
// // // // // // // });

// // // // // // // const moduleSchema = z.object({
// // // // // // //   title: z.string().min(1),
// // // // // // //   lessons: z.array(lessonSchema).optional(),
// // // // // // //   isActive: z.boolean().default(true),
// // // // // // //   isMandatory: z.boolean().default(false),
// // // // // // //   facilitatorId: z.string().nullable().optional(),
// // // // // // //   jp: z.number().optional(),
// // // // // // //   scheduleDate: z.string().optional()
// // // // // // // });

// // // // // // // const courseSchema = z.object({
// // // // // // //   title: z.string().min(3),
// // // // // // //   description: z.string().optional(),
// // // // // // //   category: z.string().optional(), 
// // // // // // //   level: z.string().optional(),
// // // // // // //   price: z.number().default(0),
// // // // // // //   thumbnailUrl: z.string().optional(),
// // // // // // //   startDate: z.string().optional(),
// // // // // // //   endDate: z.string().optional(),
// // // // // // //   credits: z.number().default(0),
  
// // // // // // //   facilitator: z.string().optional(), 
// // // // // // //   facilitatorIds: z.array(z.string()).optional(),

// // // // // // //   modules: z.array(moduleSchema).default([]),
// // // // // // //   published: z.boolean().default(false), 
// // // // // // //   organizer: z.string().default('PMI Pusat'),
// // // // // // //   programType: z.string().default('training'),
  
// // // // // // //   competencies: z.array(z.object({
// // // // // // //       code: z.string(),
// // // // // // //       title: z.string()
// // // // // // //   })).optional(),
  
// // // // // // //   includeCompetenciesInCertificate: z.boolean().optional(),

// // // // // // //   certificateConfig: z.object({
// // // // // // //       certificateNumber: z.string().optional(),
// // // // // // //       startNumber: z.coerce.number().optional().default(1), 
// // // // // // //       executionDate: z.string().optional().or(z.date()),
// // // // // // //       city: z.string().optional(),
// // // // // // //       signatoryName: z.string().optional(),
// // // // // // //       signatoryPosition: z.string().optional()
// // // // // // //   }).optional(),
// // // // // // // });

// // // // // // // // ==========================================
// // // // // // // // 2. COURSE ROUTES (CRUD)
// // // // // // // // ==========================================

// // // // // // // // GET PUBLISHED
// // // // // // // router.get('/published', async (req: Request, res: Response) => {
// // // // // // //   try {
// // // // // // //     const { search } = req.query;
// // // // // // //     let query: any = { isPublished: true };
// // // // // // //     if (search) query.title = { $regex: search, $options: 'i' };
// // // // // // //     const courses = await Course.find(query).select('title thumbnailUrl level category price organizer programType facilitatorIds modules isPublished').populate('facilitatorIds', 'name avatarUrl').populate('categoryId', 'name').sort({ createdAt: -1 });
// // // // // // //     res.json({ courses });
// // // // // // //   } catch (err: any) { res.status(500).json({ error: err.message }); }
// // // // // // // });

// // // // // // // // GET ALL
// // // // // // // router.get('/', requireAuth, async (req: Request, res: Response) => {
// // // // // // //   try {
// // // // // // //     const courses = await Course.find().select('title isPublished modules updatedAt facilitatorIds price category organizer programType thumbnailUrl').populate('facilitatorIds', 'name avatarUrl').sort({ createdAt: -1 });
// // // // // // //     res.json({ courses });
// // // // // // //   } catch (err: any) { res.status(500).json({ error: err.message }); }
// // // // // // // });

// // // // // // // // [UPDATED] GET PARTICIPANTS (SINKRON DENGAN PENDAFTARAN)
// // // // // // // router.get('/:id/participants', requireAuth, async (req: Request, res: Response) => {
// // // // // // //   try {
// // // // // // //     const courseId = req.params.id;

// // // // // // //     // Ambil data dari Enrollment agar peserta yang daftar via form muncul di sini
// // // // // // //     const enrollments = await Enrollment.find({ course: courseId })
// // // // // // //       .populate('user', 'name email avatarUrl role') 
// // // // // // //       .sort({ createdAt: -1 });

// // // // // // //     const participants = enrollments.map((e: any) => ({
// // // // // // //       _id: e._id,
// // // // // // //       user: e.user, // Objek user lengkap
// // // // // // //       progress: e.progress,
// // // // // // //       isCompleted: e.isCompleted,
// // // // // // //       registrationData: e.registrationData, // Data Formulir Peserta
// // // // // // //       joinedAt: e.createdAt,
// // // // // // //       status: 'approved'
// // // // // // //     }));

// // // // // // //     res.json({ participants });
// // // // // // //   } catch (err: any) {
// // // // // // //     res.status(500).json({ error: err.message });
// // // // // // //   }
// // // // // // // });

// // // // // // // // GET SINGLE
// // // // // // // router.get('/:id', requireAuth, async (req: AuthedRequest, res: Response) => {
// // // // // // //   try {
// // // // // // //     const course = await Course.findById(req.params.id).populate('facilitatorIds', 'name email avatarUrl').populate('modules.facilitatorId', 'name').populate('modules.lessons.facilitatorId', 'name');
// // // // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // // // // // //     res.json(course); 
// // // // // // //   } catch (err: any) { res.status(500).json({ error: err.message }); }
// // // // // // // });

// // // // // // // // CREATE
// // // // // // // router.post('/', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // //   try {
// // // // // // //     const data = courseSchema.parse(req.body);
// // // // // // //     let finalFacilitatorIds: string[] = [];
// // // // // // //     if (data.facilitatorIds && data.facilitatorIds.length > 0) finalFacilitatorIds = data.facilitatorIds;
// // // // // // //     else if (data.facilitator) finalFacilitatorIds = [data.facilitator];
// // // // // // //     else finalFacilitatorIds = [req.user!.id];
// // // // // // //     const course = await Course.create({ ...data, isPublished: data.published, facilitatorIds: finalFacilitatorIds, organizer: data.organizer, programType: data.programType, certificateConfig: data.certificateConfig });
// // // // // // //     res.status(201).json(course);
// // // // // // //   } catch (err: any) { if (err.name === 'ZodError') return res.status(400).json({ error: err.issues }); res.status(500).json({ error: err.message }); }
// // // // // // // });

// // // // // // // // UPDATE
// // // // // // // router.put('/:id', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // //   try {
// // // // // // //     const data = courseSchema.partial().parse(req.body);
// // // // // // //     const updateData: any = { ...data };
// // // // // // //     if (data.published !== undefined) { updateData.isPublished = data.published; delete updateData.published; }
// // // // // // //     if (data.facilitatorIds) updateData.facilitatorIds = data.facilitatorIds;
// // // // // // //     else if (data.facilitator) { updateData.facilitatorIds = [data.facilitator]; delete updateData.facilitator; }
// // // // // // //     if (data.certificateConfig) updateData.certificateConfig = data.certificateConfig;
// // // // // // //     if (data.competencies) updateData.competencies = data.competencies; 

// // // // // // //     const course = await Course.findOneAndUpdate({ _id: req.params.id }, { $set: updateData }, { new: true });
// // // // // // //     if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // //     res.json(course);
// // // // // // //   } catch (err: any) { console.error(err); res.status(500).json({ error: err.message }); }
// // // // // // // });

// // // // // // // // OTHER CRUD OPERATIONS
// // // // // // // router.patch('/:id/publish', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { try { const course = await Course.findById(req.params.id); if(!course) return res.status(404).json({error: 'Not found'}); course.isPublished = !course.isPublished; await course.save(); res.json(course); } catch(err: any) { res.status(500).json({error: err.message}); } });
// // // // // // // router.delete('/:id', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { try { const course = await Course.findOneAndDelete({ _id: req.params.id }); if (!course) return res.status(404).json({ error: 'Course not found' }); res.json({ message: 'Course deleted successfully' }); } catch (err: any) { res.status(500).json({ error: err.message }); } });
// // // // // // // router.post('/:id/modules', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { try { const course = await Course.findById(req.params.id); if (!course) return res.status(404).json({ error: 'Course not found' }); if (req.body.facilitatorId === "") req.body.facilitatorId = null; course.modules.push(req.body); await course.save(); res.json(course); } catch (err: any) { res.status(500).json({ error: err.message }); } });
// // // // // // // router.put('/:id/modules/:moduleId', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { try { const course = await Course.findById(req.params.id); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.find((m: any) => m._id.toString() === req.params.moduleId); if (!module) return res.status(404).json({ error: 'Module not found' }); if (req.body.facilitatorId === "") req.body.facilitatorId = null; Object.assign(module, req.body); await course.save(); res.json(course); } catch (err: any) { res.status(500).json({ error: err.message }); } });
// // // // // // // router.delete('/:id/modules/:moduleId', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { try { const course = await Course.findById(req.params.id); if (!course) return res.status(404).json({ error: 'Course not found' }); course.modules = course.modules.filter((m: any) => m._id.toString() !== req.params.moduleId); await course.save(); res.json(course); } catch (err: any) { res.status(500).json({ error: err.message }); } });
// // // // // // // router.post('/:id/modules/:moduleId/lessons', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { try { const course = await Course.findById(req.params.id); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.find((m: any) => m._id.toString() === req.params.moduleId); if (!module) return res.status(404).json({ error: 'Module not found' }); if (req.body.facilitatorId === "") req.body.facilitatorId = null; module.lessons.push(req.body); await course.save(); res.json(course); } catch (err: any) { res.status(500).json({ error: err.message }); } });
// // // // // // // router.put('/:id/modules/:moduleId/lessons/:lessonId', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { try { const course = await Course.findById(req.params.id); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.find((m: any) => m._id.toString() === req.params.moduleId); if (!module) return res.status(404).json({ error: 'Module not found' }); const lesson = module.lessons.find((l: any) => l._id.toString() === req.params.lessonId); if (!lesson) return res.status(404).json({ error: 'Lesson not found' }); if (req.body.facilitatorId === "") req.body.facilitatorId = null; Object.assign(lesson, req.body); await course.save(); res.json(course); } catch (err: any) { res.status(500).json({ error: err.message }); } });
// // // // // // // router.delete('/:id/modules/:moduleId/lessons/:lessonId', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { try { const course = await Course.findById(req.params.id); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.find((m: any) => m._id.toString() === req.params.moduleId); if (!module) return res.status(404).json({ error: 'Module not found' }); module.lessons = module.lessons.filter((l: any) => l._id.toString() !== req.params.lessonId); await course.save(); res.json(course); } catch (err: any) { res.status(500).json({ error: err.message }); } });
// // // // // // // router.patch('/:id/toggle-status', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { try { const { moduleId, lessonId } = req.body; const course = await Course.findById(req.params.id); if (!course) return res.status(404).json({ error: 'Course not found' }); if (moduleId && lessonId) { const mod = course.modules.find((m: any) => m._id.toString() === moduleId); if (mod) { const les = mod.lessons.find((l: any) => l._id.toString() === lessonId); if (les) les.isActive = !les.isActive; } } else if (moduleId) { const mod = course.modules.find((m: any) => m._id.toString() === moduleId); if (mod) mod.isActive = !mod.isActive; } await course.save(); res.json(course); } catch (err: any) { res.status(500).json({ error: err.message }); } });
// // // // // // // router.patch('/:id/reorder', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { try { const { modules } = req.body; const course = await Course.findById(req.params.id); if (!course) return res.status(404).json({ error: 'Course not found' }); course.modules = modules; await course.save(); res.json(course); } catch (err: any) { res.status(500).json({ error: err.message }); } });
// // // // // // // router.post('/mark-complete-lesson', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { res.json({ message: "Success" }); });
// // // // // // // router.post('/reset-quiz', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { res.json({ message: "Success" }); });

// // // // // // // // ==========================================
// // // // // // // // PREVIEW CERTIFICATE (A4 PORTRAIT)
// // // // // // // // ==========================================
// // // // // // // router.post('/certificate/preview', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // //     try {
// // // // // // //         let { certificateConfig, competencies, courseId, includeCompetenciesInCertificate } = req.body;
        
// // // // // // //         if ((!competencies || competencies.length === 0) && courseId) {
// // // // // // //             try {
// // // // // // //                 const course = await Course.findById(courseId);
// // // // // // //                 if (course && course.competencies && course.competencies.length > 0) {
// // // // // // //                     competencies = course.competencies;
// // // // // // //                 }
// // // // // // //             } catch (err) { console.warn("Fetch DB fail:", err); }
// // // // // // //         }

// // // // // // //         const doc = new PDFDocument({ size: 'A4', layout: 'portrait', margin: 0 });
// // // // // // //         res.setHeader('Content-Type', 'application/pdf');
// // // // // // //         res.setHeader('Content-Disposition', 'inline; filename=draft-sertifikat.pdf');
// // // // // // //         doc.pipe(res);

// // // // // // //         // --- HALAMAN 1: DEPAN ---
// // // // // // //         const totalWidth = 595;
// // // // // // //         const headerHeight = 50;
// // // // // // //         const segmentWidth = totalWidth / 4;

// // // // // // //         doc.rect(0, 0, segmentWidth, headerHeight).fill('#D50000');
// // // // // // //         doc.rect(segmentWidth, 0, segmentWidth, headerHeight).fill('#E65100');
// // // // // // //         doc.rect(segmentWidth * 2, 0, segmentWidth, headerHeight).fill('#FF8A65');
// // // // // // //         doc.rect(segmentWidth * 3, 0, segmentWidth, headerHeight).fill('#FFCCBC');

// // // // // // //         const logoPath = path.join(__dirname, '../../assets/logo-pmi.png');
// // // // // // //         if (fs.existsSync(logoPath)) {
// // // // // // //             doc.image(logoPath, (totalWidth / 2) - 40, 70, { width: 80 });
// // // // // // //         } else {
// // // // // // //             doc.fillColor('#D50000').fontSize(12).text('[LOGO PMI]', 0, 90, { align: 'center' });
// // // // // // //         }

// // // // // // //         doc.moveDown(5); 
// // // // // // //         const startY = 160;
// // // // // // //         doc.fillColor('black');
// // // // // // //         doc.font('Helvetica-Bold').fontSize(32).text('SERTIFIKAT', 0, startY + 30, { align: 'center', characterSpacing: 2 });
// // // // // // //         doc.font('Helvetica-Oblique').fontSize(14).text('Certificate', 0, startY + 65, { align: 'center' });

// // // // // // //         let sampleNo = '001';
// // // // // // //         if (certificateConfig.startNumber) {
// // // // // // //             sampleNo = String(certificateConfig.startNumber).padStart(3, '0');
// // // // // // //         }
// // // // // // //         const finalNo = (certificateConfig.certificateNumber || '').replace('{NO}', sampleNo);
// // // // // // //         doc.font('Helvetica').fontSize(12).text(`No : ${finalNo || '---/---/---'}`, 0, startY + 85, { align: 'center' });

// // // // // // //         doc.font('Helvetica').fontSize(12).text('Diberikan kepada :', 0, startY + 115, { align: 'center' });
// // // // // // //         doc.font('Helvetica-Oblique').fontSize(10).text('Awarded to', 0, startY + 130, { align: 'center' });
// // // // // // //         doc.font('Helvetica-Bold').fontSize(24).text('NAMA PESERTA', 0, startY + 150, { align: 'center' });
// // // // // // //         doc.font('Helvetica').fontSize(14).text('UNIT / INSTANSI PESERTA', 0, startY + 180, { align: 'center' });
// // // // // // //         doc.font('Helvetica').fontSize(12).text('Sebagai', 0, startY + 210, { align: 'center' });
// // // // // // //         doc.font('Helvetica-Bold').fontSize(16).text('PESERTA', 0, startY + 230, { align: 'center' });
// // // // // // //         doc.font('Helvetica-Bold').fontSize(20).text('JUDUL PELATIHAN ANDA', 0, startY + 260, { align: 'center' });
// // // // // // //         doc.font('Helvetica-Oblique').fontSize(12).text('Training Title Here', 0, startY + 285, { align: 'center' });

// // // // // // //         const cityStr = certificateConfig.city || 'Jakarta';
// // // // // // //         const dateStr = certificateConfig.executionDate 
// // // // // // //             ? new Date(certificateConfig.executionDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
// // // // // // //             : '.......................';
// // // // // // //         doc.font('Helvetica').fontSize(11).text(`Dilaksanakan di ${cityStr}, pada tanggal ${dateStr}`, 0, startY + 315, { align: 'center' });

// // // // // // //         const signY = 650; 
// // // // // // //         doc.font('Helvetica').fontSize(12).text(`${cityStr}, ${dateStr}`, 0, signY, { align: 'center' });
// // // // // // //         doc.moveDown(0.3);
// // // // // // //         doc.font('Helvetica-Bold').text(certificateConfig.signatoryPosition || 'Pengurus Kabupaten', { align: 'center' });
// // // // // // //         doc.font('Helvetica-Oblique').fontSize(10).text('District Board Member', { align: 'center' });
// // // // // // //         doc.moveDown(0.2);
// // // // // // //         doc.font('Helvetica-Bold').fontSize(12).text('PALANG MERAH INDONESIA', { align: 'center' });
// // // // // // //         doc.font('Helvetica-Oblique').fontSize(10).text('Indonesian Red Cross', { align: 'center' });
// // // // // // //         doc.moveDown(0.2);
// // // // // // //         doc.font('Helvetica-Bold').fontSize(12).text('Ketua,', { align: 'center' });
// // // // // // //         doc.font('Helvetica-Oblique').fontSize(10).text('Chairman', { align: 'center' });
// // // // // // //         doc.moveDown(3);
// // // // // // //         doc.font('Helvetica-Bold').fontSize(12).text(certificateConfig.signatoryName || '(Nama Pejabat)', { align: 'center', underline: true });

// // // // // // //         // --- HALAMAN 2: DAFTAR KOMPETENSI (AUTO PAGINATION) ---
// // // // // // //         if ((includeCompetenciesInCertificate || (competencies && competencies.length > 0)) && competencies) {
// // // // // // //             doc.addPage();
            
// // // // // // //             const drawTableHeaders = (yPos: number) => {
// // // // // // //                 const col1X = 50;  const col2X = 90;  const col3X = 220; const headerH = 35;
// // // // // // //                 doc.font('Helvetica-Bold').fontSize(10);
// // // // // // //                 doc.rect(col1X, yPos, 40, headerH).stroke(); doc.rect(col2X, yPos, 130, headerH).stroke(); doc.rect(col3X, yPos, 325, headerH).stroke(); 
// // // // // // //                 doc.fillColor('black').text('No.', col1X + 10, yPos + 8).text('No Kode', col2X + 10, yPos + 5);
// // // // // // //                 doc.fontSize(8).text('Unit Code', col2X + 10, yPos + 20, { oblique: true });
// // // // // // //                 doc.fontSize(10).text('Judul Unit', col3X + 10, yPos + 5);
// // // // // // //                 doc.fontSize(8).text('Unit Title', col3X + 10, yPos + 20, { oblique: true });
// // // // // // //             };

// // // // // // //             doc.fillColor('black').font('Helvetica-Bold').fontSize(14).text('Markas Kabupaten', 50, 50);
// // // // // // //             doc.text('Palang Merah Indonesia', 50, 70);
// // // // // // //             doc.fontSize(16).text('Daftar Unit Kompetensi', 0, 120, { align: 'center' });
// // // // // // //             doc.font('Helvetica-Oblique').fontSize(12).text('List of Unit(s) of Competency', 0, 140, { align: 'center' });

// // // // // // //             let tableTop = 180; const rowHeight = 35; const pageBottomLimit = 750;
// // // // // // //             drawTableHeaders(tableTop);
// // // // // // //             let currentY = tableTop + rowHeight;
// // // // // // //             const col1X = 50; const col2X = 90; const col3X = 220;
// // // // // // //             doc.font('Helvetica').fontSize(10);

// // // // // // //             competencies.forEach((comp: any, index: number) => {
// // // // // // //                 if (currentY + rowHeight > pageBottomLimit) {
// // // // // // //                     doc.addPage(); tableTop = 50; drawTableHeaders(tableTop); currentY = tableTop + rowHeight; doc.font('Helvetica').fontSize(10);
// // // // // // //                 }
// // // // // // //                 doc.rect(col1X, currentY, 40, rowHeight).stroke();
// // // // // // //                 doc.rect(col2X, currentY, 130, rowHeight).stroke();
// // // // // // //                 doc.rect(col3X, currentY, 325, rowHeight).stroke();
// // // // // // //                 doc.text(String(index + 1), col1X + 12, currentY + 12);
// // // // // // //                 doc.text(comp.code || '-', col2X + 10, currentY + 12);
// // // // // // //                 doc.text(comp.title || '-', col3X + 10, currentY + 12, { width: 310, height: rowHeight - 10, ellipsis: true });
// // // // // // //                 currentY += rowHeight;
// // // // // // //             });

// // // // // // //             if (currentY + 150 > pageBottomLimit) { doc.addPage(); currentY = 50; } else { currentY += 30; }
// // // // // // //             const sign2X = 320; 
// // // // // // //             doc.font('Helvetica').fontSize(11).text(`${cityStr}, ${dateStr}`, sign2X, currentY);
// // // // // // //             doc.font('Helvetica-Bold').text(certificateConfig.signatoryPosition || 'Kepala Pusdiklat', sign2X, currentY + 15);
// // // // // // //             doc.font('Helvetica-Oblique').fontSize(9).text('Head of Education and Training Center', sign2X, currentY + 28);
// // // // // // //             doc.font('Helvetica-Bold').fontSize(11).text('Palang Merah Indonesia', sign2X, currentY + 40);
// // // // // // //             doc.moveDown(4).text('_______________________', sign2X, currentY + 120);
// // // // // // //             if (certificateConfig.signatoryName) { doc.text(certificateConfig.signatoryName, sign2X, currentY + 135); }
// // // // // // //         }

// // // // // // //         doc.end();
// // // // // // //     } catch (error: any) {
// // // // // // //         console.error("PDF Preview Error:", error);
// // // // // // //         res.status(500).send("Gagal membuat preview sertifikat: " + error.message);
// // // // // // //     }
// // // // // // // });

// // // // // // export default router;



// // // // import { Router, Request, Response } from 'express';
// // // // import { Course } from '../models/Course'; 
// // // // import Enrollment from '../models/Enrollment'; // Import Model Enrollment
// // // // import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth'; 
// // // // import { z } from 'zod';
// // // // import PDFDocument from 'pdfkit'; 
// // // // import fs from 'fs';
// // // // import path from 'path';
// // // // import { fileURLToPath } from 'url';

// // // // const router = Router();

// // // // const __filename = fileURLToPath(import.meta.url);
// // // // const __dirname = path.dirname(__filename);

// // // // // ==========================================
// // // // // 1. ZOD SCHEMAS
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

// // // // const courseSchema = z.object({
// // // //   title: z.string().min(3),
// // // //   description: z.string().optional(),
// // // //   category: z.string().optional(), 
// // // //   level: z.string().optional(),
// // // //   price: z.number().default(0),
// // // //   thumbnailUrl: z.string().optional(),
// // // //   startDate: z.string().optional(),
// // // //   endDate: z.string().optional(),
// // // //   credits: z.number().default(0),
  
// // // //   facilitator: z.string().optional(), 
// // // //   facilitatorIds: z.array(z.string()).optional(),

// // // //   modules: z.array(moduleSchema).default([]),
// // // //   published: z.boolean().default(false), 
// // // //   organizer: z.string().default('PMI Pusat'),
// // // //   programType: z.string().default('training'),
  
// // // //   competencies: z.array(z.object({
// // // //       code: z.string(),
// // // //       title: z.string()
// // // //   })).optional(),
  
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

// // // // // GET PUBLISHED (Route untuk Katalog Peserta)
// // // // router.get('/published', async (req: Request, res: Response) => {
// // // //   try {
// // // //     const { search } = req.query;
// // // //     let query: any = { isPublished: true }; // Hanya ambil yang sudah di-publish

// // // //     if (search) {
// // // //         query.title = { $regex: search, $options: 'i' };
// // // //     }

// // // //     // [FIX] SAYA SUDAH MENGHAPUS .populate('categoryId') DISINI
// // // //     // Karena 'category' di database Anda hanya string biasa, bukan ID relasi.
// // // //     const courses = await Course.find(query)
// // // //         .select('title thumbnailUrl level category price organizer programType facilitatorIds modules isPublished')
// // // //         .populate('facilitatorIds', 'name avatarUrl') 
// // // //         .sort({ createdAt: -1 });
        
// // // //     res.json({ courses });
// // // //   } catch (err: any) {
// // // //     console.error("Error fetching published courses:", err); // Log error ke terminal backend
// // // //     res.status(500).json({ error: err.message });
// // // //   }
// // // // });

// // // // // GET ALL (Route untuk Admin)
// // // // router.get('/', requireAuth, async (req: Request, res: Response) => {
// // // //   try {
// // // //     const courses = await Course.find()
// // // //         .select('title isPublished modules updatedAt facilitatorIds price category organizer programType thumbnailUrl')
// // // //         .populate('facilitatorIds', 'name avatarUrl')
// // // //         .sort({ createdAt: -1 });
// // // //     res.json({ courses });
// // // //   } catch (err: any) { res.status(500).json({ error: err.message }); }
// // // // });

// // // // // GET PARTICIPANTS FROM ENROLLMENT (Route untuk Admin Melihat Peserta)
// // // // router.get('/:id/participants', requireAuth, async (req: Request, res: Response) => {
// // // //   try {
// // // //     const courseId = req.params.id;

// // // //     // Ambil data Enrollment agar sinkron dengan pendaftaran
// // // //     const enrollments = await Enrollment.find({ course: courseId })
// // // //       .populate('user', 'name email avatarUrl role') 
// // // //       .sort({ createdAt: -1 });

// // // //     const participants = enrollments.map((e: any) => ({
// // // //       _id: e._id, // ID Enrollment (Penting untuk fitur hapus)
// // // //       user: e.user, 
// // // //       progress: e.progress,
// // // //       isCompleted: e.isCompleted,
// // // //       registrationData: e.registrationData, 
// // // //       joinedAt: e.createdAt,
// // // //       status: 'approved'
// // // //     }));

// // // //     res.json({ participants });
// // // //   } catch (err: any) {
// // // //     res.status(500).json({ error: err.message });
// // // //   }
// // // // });

// // // // // GET SINGLE
// // // // router.get('/:id', requireAuth, async (req: AuthedRequest, res: Response) => {
// // // //   try {
// // // //     const course = await Course.findById(req.params.id).populate('facilitatorIds', 'name email avatarUrl').populate('modules.facilitatorId', 'name').populate('modules.lessons.facilitatorId', 'name');
// // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
// // // //     res.json(course); 
// // // //   } catch (err: any) { res.status(500).json({ error: err.message }); }
// // // // });

// // // // // CREATE
// // // // router.post('/', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // //   try {
// // // //     const data = courseSchema.parse(req.body);
// // // //     let finalFacilitatorIds: string[] = [];
// // // //     if (data.facilitatorIds && data.facilitatorIds.length > 0) finalFacilitatorIds = data.facilitatorIds;
// // // //     else if (data.facilitator) finalFacilitatorIds = [data.facilitator];
// // // //     else finalFacilitatorIds = [req.user!.id];
// // // //     const course = await Course.create({ ...data, isPublished: data.published, facilitatorIds: finalFacilitatorIds, organizer: data.organizer, programType: data.programType, certificateConfig: data.certificateConfig });
// // // //     res.status(201).json(course);
// // // //   } catch (err: any) { if (err.name === 'ZodError') return res.status(400).json({ error: err.issues }); res.status(500).json({ error: err.message }); }
// // // // });

// // // // // UPDATE
// // // // router.put('/:id', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // //   try {
// // // //     const data = courseSchema.partial().parse(req.body);
// // // //     const updateData: any = { ...data };
// // // //     if (data.published !== undefined) { updateData.isPublished = data.published; delete updateData.published; }
// // // //     if (data.facilitatorIds) updateData.facilitatorIds = data.facilitatorIds;
// // // //     else if (data.facilitator) { updateData.facilitatorIds = [data.facilitator]; delete updateData.facilitator; }
// // // //     if (data.certificateConfig) updateData.certificateConfig = data.certificateConfig;
// // // //     if (data.competencies) updateData.competencies = data.competencies; 

// // // //     const course = await Course.findOneAndUpdate({ _id: req.params.id }, { $set: updateData }, { new: true });
// // // //     if (!course) return res.status(404).json({ error: 'Course not found' });
// // // //     res.json(course);
// // // //   } catch (err: any) { console.error(err); res.status(500).json({ error: err.message }); }
// // // // });

// // // // // OTHER CRUD OPERATIONS
// // // // router.patch('/:id/publish', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { try { const course = await Course.findById(req.params.id); if(!course) return res.status(404).json({error: 'Not found'}); course.isPublished = !course.isPublished; await course.save(); res.json(course); } catch(err: any) { res.status(500).json({error: err.message}); } });
// // // // router.delete('/:id', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { try { const course = await Course.findOneAndDelete({ _id: req.params.id }); if (!course) return res.status(404).json({ error: 'Course not found' }); res.json({ message: 'Course deleted successfully' }); } catch (err: any) { res.status(500).json({ error: err.message }); } });
// // // // router.post('/:id/modules', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { try { const course = await Course.findById(req.params.id); if (!course) return res.status(404).json({ error: 'Course not found' }); if (req.body.facilitatorId === "") req.body.facilitatorId = null; course.modules.push(req.body); await course.save(); res.json(course); } catch (err: any) { res.status(500).json({ error: err.message }); } });
// // // // router.put('/:id/modules/:moduleId', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { try { const course = await Course.findById(req.params.id); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.find((m: any) => m._id.toString() === req.params.moduleId); if (!module) return res.status(404).json({ error: 'Module not found' }); if (req.body.facilitatorId === "") req.body.facilitatorId = null; Object.assign(module, req.body); await course.save(); res.json(course); } catch (err: any) { res.status(500).json({ error: err.message }); } });
// // // // router.delete('/:id/modules/:moduleId', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { try { const course = await Course.findById(req.params.id); if (!course) return res.status(404).json({ error: 'Course not found' }); course.modules = course.modules.filter((m: any) => m._id.toString() !== req.params.moduleId); await course.save(); res.json(course); } catch (err: any) { res.status(500).json({ error: err.message }); } });
// // // // router.post('/:id/modules/:moduleId/lessons', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { try { const course = await Course.findById(req.params.id); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.find((m: any) => m._id.toString() === req.params.moduleId); if (!module) return res.status(404).json({ error: 'Module not found' }); if (req.body.facilitatorId === "") req.body.facilitatorId = null; module.lessons.push(req.body); await course.save(); res.json(course); } catch (err: any) { res.status(500).json({ error: err.message }); } });
// // // // router.put('/:id/modules/:moduleId/lessons/:lessonId', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { try { const course = await Course.findById(req.params.id); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.find((m: any) => m._id.toString() === req.params.moduleId); if (!module) return res.status(404).json({ error: 'Module not found' }); const lesson = module.lessons.find((l: any) => l._id.toString() === req.params.lessonId); if (!lesson) return res.status(404).json({ error: 'Lesson not found' }); if (req.body.facilitatorId === "") req.body.facilitatorId = null; Object.assign(lesson, req.body); await course.save(); res.json(course); } catch (err: any) { res.status(500).json({ error: err.message }); } });
// // // // router.delete('/:id/modules/:moduleId/lessons/:lessonId', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { try { const course = await Course.findById(req.params.id); if (!course) return res.status(404).json({ error: 'Course not found' }); const module = course.modules.find((m: any) => m._id.toString() === req.params.moduleId); if (!module) return res.status(404).json({ error: 'Module not found' }); module.lessons = module.lessons.filter((l: any) => l._id.toString() !== req.params.lessonId); await course.save(); res.json(course); } catch (err: any) { res.status(500).json({ error: err.message }); } });
// // // // router.patch('/:id/toggle-status', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { try { const { moduleId, lessonId } = req.body; const course = await Course.findById(req.params.id); if (!course) return res.status(404).json({ error: 'Course not found' }); if (moduleId && lessonId) { const mod = course.modules.find((m: any) => m._id.toString() === moduleId); if (mod) { const les = mod.lessons.find((l: any) => l._id.toString() === lessonId); if (les) les.isActive = !les.isActive; } } else if (moduleId) { const mod = course.modules.find((m: any) => m._id.toString() === moduleId); if (mod) mod.isActive = !mod.isActive; } await course.save(); res.json(course); } catch (err: any) { res.status(500).json({ error: err.message }); } });
// // // // router.patch('/:id/reorder', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { try { const { modules } = req.body; const course = await Course.findById(req.params.id); if (!course) return res.status(404).json({ error: 'Course not found' }); course.modules = modules; await course.save(); res.json(course); } catch (err: any) { res.status(500).json({ error: err.message }); } });
// // // // router.post('/mark-complete-lesson', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { res.json({ message: "Success" }); });
// // // // router.post('/reset-quiz', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => { res.json({ message: "Success" }); });

// // // // // ==========================================
// // // // // PREVIEW CERTIFICATE
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
// // // //         const totalWidth = 595;
// // // //         const headerHeight = 50;
// // // //         const segmentWidth = totalWidth / 4;

// // // //         doc.rect(0, 0, segmentWidth, headerHeight).fill('#D50000');
// // // //         doc.rect(segmentWidth, 0, segmentWidth, headerHeight).fill('#E65100');
// // // //         doc.rect(segmentWidth * 2, 0, segmentWidth, headerHeight).fill('#FF8A65');
// // // //         doc.rect(segmentWidth * 3, 0, segmentWidth, headerHeight).fill('#FFCCBC');

// // // //         const logoPath = path.join(__dirname, '../../assets/logo-pmi.png');
// // // //         if (fs.existsSync(logoPath)) {
// // // //             doc.image(logoPath, (totalWidth / 2) - 40, 70, { width: 80 });
// // // //         } else {
// // // //             doc.fillColor('#D50000').fontSize(12).text('[LOGO PMI]', 0, 90, { align: 'center' });
// // // //         }

// // // //         doc.moveDown(5); 
// // // //         const startY = 160;
// // // //         doc.fillColor('black');
// // // //         doc.font('Helvetica-Bold').fontSize(32).text('SERTIFIKAT', 0, startY + 30, { align: 'center', characterSpacing: 2 });
// // // //         doc.font('Helvetica-Oblique').fontSize(14).text('Certificate', 0, startY + 65, { align: 'center' });

// // // //         let sampleNo = '001';
// // // //         if (certificateConfig.startNumber) {
// // // //             sampleNo = String(certificateConfig.startNumber).padStart(3, '0');
// // // //         }
// // // //         const finalNo = (certificateConfig.certificateNumber || '').replace('{NO}', sampleNo);
// // // //         doc.font('Helvetica').fontSize(12).text(`No : ${finalNo || '---/---/---'}`, 0, startY + 85, { align: 'center' });

// // // //         doc.font('Helvetica').fontSize(12).text('Diberikan kepada :', 0, startY + 115, { align: 'center' });
// // // //         doc.font('Helvetica-Oblique').fontSize(10).text('Awarded to', 0, startY + 130, { align: 'center' });
// // // //         doc.font('Helvetica-Bold').fontSize(24).text('NAMA PESERTA', 0, startY + 150, { align: 'center' });
// // // //         doc.font('Helvetica').fontSize(14).text('UNIT / INSTANSI PESERTA', 0, startY + 180, { align: 'center' });
// // // //         doc.font('Helvetica').fontSize(12).text('Sebagai', 0, startY + 210, { align: 'center' });
// // // //         doc.font('Helvetica-Bold').fontSize(16).text('PESERTA', 0, startY + 230, { align: 'center' });
// // // //         doc.font('Helvetica-Bold').fontSize(20).text('JUDUL PELATIHAN ANDA', 0, startY + 260, { align: 'center' });
// // // //         doc.font('Helvetica-Oblique').fontSize(12).text('Training Title Here', 0, startY + 285, { align: 'center' });

// // // //         const cityStr = certificateConfig.city || 'Jakarta';
// // // //         const dateStr = certificateConfig.executionDate 
// // // //             ? new Date(certificateConfig.executionDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
// // // //             : '.......................';
// // // //         doc.font('Helvetica').fontSize(11).text(`Dilaksanakan di ${cityStr}, pada tanggal ${dateStr}`, 0, startY + 315, { align: 'center' });

// // // //         const signY = 650; 
// // // //         doc.font('Helvetica').fontSize(12).text(`${cityStr}, ${dateStr}`, 0, signY, { align: 'center' });
// // // //         doc.moveDown(0.3);
// // // //         doc.font('Helvetica-Bold').text(certificateConfig.signatoryPosition || 'Pengurus Kabupaten', { align: 'center' });
// // // //         doc.font('Helvetica-Oblique').fontSize(10).text('District Board Member', { align: 'center' });
// // // //         doc.moveDown(0.2);
// // // //         doc.font('Helvetica-Bold').fontSize(12).text('PALANG MERAH INDONESIA', { align: 'center' });
// // // //         doc.font('Helvetica-Oblique').fontSize(10).text('Indonesian Red Cross', { align: 'center' });
// // // //         doc.moveDown(0.2);
// // // //         doc.font('Helvetica-Bold').fontSize(12).text('Ketua,', { align: 'center' });
// // // //         doc.font('Helvetica-Oblique').fontSize(10).text('Chairman', { align: 'center' });
// // // //         doc.moveDown(3);
// // // //         doc.font('Helvetica-Bold').fontSize(12).text(certificateConfig.signatoryName || '(Nama Pejabat)', { align: 'center', underline: true });

// // // //         // --- HALAMAN 2: DAFTAR KOMPETENSI ---
// // // //         if ((includeCompetenciesInCertificate || (competencies && competencies.length > 0)) && competencies) {
// // // //             doc.addPage();
            
// // // //             const drawTableHeaders = (yPos: number) => {
// // // //                 const col1X = 50;  const col2X = 90;  const col3X = 220; const headerH = 35;
// // // //                 doc.font('Helvetica-Bold').fontSize(10);
// // // //                 doc.rect(col1X, yPos, 40, headerH).stroke(); doc.rect(col2X, yPos, 130, headerH).stroke(); doc.rect(col3X, yPos, 325, headerH).stroke(); 
// // // //                 doc.fillColor('black').text('No.', col1X + 10, yPos + 8).text('No Kode', col2X + 10, yPos + 5);
// // // //                 doc.fontSize(8).text('Unit Code', col2X + 10, yPos + 20, { oblique: true });
// // // //                 doc.fontSize(10).text('Judul Unit', col3X + 10, yPos + 5);
// // // //                 doc.fontSize(8).text('Unit Title', col3X + 10, yPos + 20, { oblique: true });
// // // //             };

// // // //             doc.fillColor('black').font('Helvetica-Bold').fontSize(14).text('Markas Kabupaten', 50, 50);
// // // //             doc.text('Palang Merah Indonesia', 50, 70);
// // // //             doc.fontSize(16).text('Daftar Unit Kompetensi', 0, 120, { align: 'center' });
// // // //             doc.font('Helvetica-Oblique').fontSize(12).text('List of Unit(s) of Competency', 0, 140, { align: 'center' });

// // // //             let tableTop = 180; const rowHeight = 35; const pageBottomLimit = 750;
// // // //             drawTableHeaders(tableTop);
// // // //             let currentY = tableTop + rowHeight;
// // // //             const col1X = 50; const col2X = 90; const col3X = 220;
// // // //             doc.font('Helvetica').fontSize(10);

// // // //             competencies.forEach((comp: any, index: number) => {
// // // //                 if (currentY + rowHeight > pageBottomLimit) {
// // // //                     doc.addPage(); tableTop = 50; drawTableHeaders(tableTop); currentY = tableTop + rowHeight; doc.font('Helvetica').fontSize(10);
// // // //                 }
// // // //                 doc.rect(col1X, currentY, 40, rowHeight).stroke();
// // // //                 doc.rect(col2X, currentY, 130, rowHeight).stroke();
// // // //                 doc.rect(col3X, currentY, 325, rowHeight).stroke();
// // // //                 doc.text(String(index + 1), col1X + 12, currentY + 12);
// // // //                 doc.text(comp.code || '-', col2X + 10, currentY + 12);
// // // //                 doc.text(comp.title || '-', col3X + 10, currentY + 12, { width: 310, height: rowHeight - 10, ellipsis: true });
// // // //                 currentY += rowHeight;
// // // //             });

// // // //             if (currentY + 150 > pageBottomLimit) { doc.addPage(); currentY = 50; } else { currentY += 30; }
// // // //             const sign2X = 320; 
// // // //             doc.font('Helvetica').fontSize(11).text(`${cityStr}, ${dateStr}`, sign2X, currentY);
// // // //             doc.font('Helvetica-Bold').text(certificateConfig.signatoryPosition || 'Kepala Pusdiklat', sign2X, currentY + 15);
// // // //             doc.font('Helvetica-Oblique').fontSize(9).text('Head of Education and Training Center', sign2X, currentY + 28);
// // // //             doc.font('Helvetica-Bold').fontSize(11).text('Palang Merah Indonesia', sign2X, currentY + 40);
// // // //             doc.moveDown(4).text('_______________________', sign2X, currentY + 120);
// // // //             if (certificateConfig.signatoryName) { doc.text(certificateConfig.signatoryName, sign2X, currentY + 135); }
// // // //         }

// // // //         doc.end();
// // // //     } catch (error: any) {
// // // //         console.error("PDF Preview Error:", error);
// // // //         res.status(500).send("Gagal membuat preview sertifikat: " + error.message);
// // // //     }
// // // // });

// // // // export default router;
// // // import { Router, Request, Response } from 'express';
// // // import { Course } from '../models/Course'; 
// // // import Enrollment from '../models/Enrollment';
// // // import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth'; 
// // // import { z } from 'zod';
// // // import PDFDocument from 'pdfkit'; 
// // // import fs from 'fs';
// // // import path from 'path';
// // // import { fileURLToPath } from 'url';

// // // // IMPORT CONTROLLER LENGKAP
// // // import {
// // //     getCourses, getCourseById, createCourse, updateCourse, deleteCourse,
// // //     addModule, updateModule, addLesson, updateLesson, deleteLesson,
// // //     toggleStatus, reorderModules,
// // //     enrollCourse, verifyEnrollment, checkEnrollmentStatus, getCourseParticipants,
// // //     markCompleteLessonByAdmin, resetQuizByAdmin
// // // } from '../controllers/courseController';

// // // const router = Router();

// // // const __filename = fileURLToPath(import.meta.url);
// // // const __dirname = path.dirname(__filename);

// // // // ==========================================
// // // // 1. ZOD SCHEMAS
// // // // ==========================================
// // // // (Schema tetap sama, biarkan saja)
// // // const lessonSchema = z.object({
// // //   title: z.string().min(1),
// // //   type: z.enum(['video_url', 'upload_doc', 'quiz', 'essay', 'google_classroom', 'lesson', 'pdf', 'download_doc', 'image', 'slide', 'poll', 'virtual_class']).optional(),
// // //   videoUrl: z.string().optional(),
// // //   content: z.string().optional(),
// // //   fileUrl: z.string().optional(),
// // //   jp: z.number().default(0),
// // //   scheduleDate: z.string().optional(),
// // //   facilitator: z.string().optional(),
// // //   facilitatorId: z.string().nullable().optional(), 
// // //   classroomData: z.any().optional(),
// // //   questions: z.array(z.any()).optional(),
// // //   quizDuration: z.number().optional(),
// // //   pollQuestion: z.string().optional(),
// // //   pollOptions: z.array(z.string()).optional(),
// // //   isActive: z.boolean().default(true),
// // //   isMandatory: z.boolean().default(false)
// // // });

// // // const moduleSchema = z.object({
// // //   title: z.string().min(1),
// // //   lessons: z.array(lessonSchema).optional(),
// // //   isActive: z.boolean().default(true),
// // //   isMandatory: z.boolean().default(false),
// // //   facilitatorId: z.string().nullable().optional(),
// // //   jp: z.number().optional(),
// // //   scheduleDate: z.string().optional()
// // // });

// // // const courseSchema = z.object({
// // //   title: z.string().min(3),
// // //   description: z.string().optional(),
// // //   category: z.string().optional(), 
// // //   level: z.string().optional(),
// // //   price: z.number().default(0),
// // //   thumbnailUrl: z.string().optional(),
// // //   startDate: z.string().optional(),
// // //   endDate: z.string().optional(),
// // //   credits: z.number().default(0),
// // //   facilitator: z.string().optional(), 
// // //   facilitatorIds: z.array(z.string()).optional(),
// // //   modules: z.array(moduleSchema).default([]),
// // //   published: z.boolean().default(false), 
// // //   organizer: z.string().default('PMI Pusat'),
// // //   programType: z.string().default('training'),
// // //   competencies: z.array(z.object({ code: z.string(), title: z.string() })).optional(),
// // //   includeCompetenciesInCertificate: z.boolean().optional(),
// // //   certificateConfig: z.object({
// // //       certificateNumber: z.string().optional(),
// // //       startNumber: z.coerce.number().optional().default(1), 
// // //       executionDate: z.string().optional().or(z.date()),
// // //       city: z.string().optional(),
// // //       signatoryName: z.string().optional(),
// // //       signatoryPosition: z.string().optional()
// // //   }).optional(),
// // // });

// // // // ==========================================
// // // // 2. COURSE ROUTES (CRUD)
// // // // ==========================================

// // // // GET PUBLISHED (Public)
// // // router.get('/published', async (req: Request, res: Response) => {
// // //   try {
// // //     const { search } = req.query;
// // //     let query: any = { isPublished: true };
// // //     if (search) query.title = { $regex: search, $options: 'i' };
    
// // //     const courses = await Course.find(query)
// // //         .select('title thumbnailUrl level category price organizer programType facilitatorIds modules isPublished')
// // //         .populate('facilitatorIds', 'name avatarUrl') 
// // //         .sort({ createdAt: -1 });
// // //     res.json({ courses });
// // //   } catch (err: any) { res.status(500).json({ error: err.message }); }
// // // });

// // // // GET ALL (Admin)
// // // router.get('/', requireAuth, getCourses);

// // // // GET SINGLE (Detail)
// // // router.get('/:id', requireAuth, getCourseById);

// // // // CREATE & UPDATE (Admin)
// // // router.post('/', requireAuth, requireFacilitator, createCourse);
// // // router.put('/:id', requireAuth, requireFacilitator, updateCourse);
// // // router.delete('/:id', requireAuth, requireFacilitator, deleteCourse);
// // // router.patch('/:id/publish', requireAuth, requireFacilitator, toggleStatus);

// // // // MODULE & LESSON ROUTES (Gunakan Controller yang baru)
// // // router.post('/:id/modules', requireAuth, requireFacilitator, addModule);
// // // router.put('/:id/modules/:moduleId', requireAuth, requireFacilitator, updateModule); // Note: Pastikan nama param di controller sesuai (id vs courseId) -> Di controller saya sudah pakai req.params untuk fleksibilitas
// // // // Untuk amannya, sesuaikan route param dengan controller:
// // // router.post('/:courseId/modules/:moduleId/lessons', requireAuth, requireFacilitator, addLesson);
// // // router.put('/:courseId/modules/:moduleId/lessons/:lessonId', requireAuth, requireFacilitator, updateLesson);
// // // router.delete('/:courseId/modules/:moduleId/lessons/:lessonId', requireAuth, requireFacilitator, deleteLesson);

// // // router.patch('/:id/toggle-status', requireAuth, requireFacilitator, toggleStatus);
// // // router.patch('/:id/reorder', requireAuth, requireFacilitator, reorderModules);

// // // // ==========================================
// // // // 3. PARTICIPANT & ENROLLMENT (FIXED)
// // // // ==========================================

// // // // Daftar Kursus (Siswa)
// // // router.post('/:courseId/enroll', requireAuth, enrollCourse);

// // // // Cek Status (Untuk Label di Katalog)
// // // router.get('/:courseId/check-enrollment', requireAuth, checkEnrollmentStatus);

// // // // Admin Melihat Peserta (Dashboard Operator) - MENGGUNAKAN CONTROLLER BARU
// // // router.get('/:id/participants', requireAuth, requireFacilitator, getCourseParticipants);

// // // // Admin Approve/Reject Peserta
// // // router.post('/verify-enrollment', requireAuth, requireFacilitator, verifyEnrollment);

// // // // Aksi Cepat (Luluskan Materi)
// // // router.post('/mark-complete-lesson', requireAuth, requireFacilitator, markCompleteLessonByAdmin);
// // // router.post('/reset-quiz', requireAuth, requireFacilitator, resetQuizByAdmin);


// // // // ==========================================
// // // // 4. PREVIEW CERTIFICATE (Existing Logic)
// // // // ==========================================
// // // router.post('/certificate/preview', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // //     try {
// // //         let { certificateConfig, competencies, courseId, includeCompetenciesInCertificate } = req.body;
// // //         if ((!competencies || competencies.length === 0) && courseId) {
// // //             try {
// // //                 const course = await Course.findById(courseId);
// // //                 if (course && course.competencies && course.competencies.length > 0) {
// // //                     competencies = course.competencies;
// // //                 }
// // //             } catch (err) { console.warn("Fetch DB fail:", err); }
// // //         }

// // //         const doc = new PDFDocument({ size: 'A4', layout: 'portrait', margin: 0 });
// // //         res.setHeader('Content-Type', 'application/pdf');
// // //         res.setHeader('Content-Disposition', 'inline; filename=draft-sertifikat.pdf');
// // //         doc.pipe(res);

// // //         // ... (KODE PDF GENERATION SAMA PERSIS SEPERTI SEBELUMNYA) ...
// // //         // ... (Copy paste logika PDF dari file lama Anda di sini jika perlu, atau gunakan yang sudah ada) ...
// // //         // Agar tidak kepanjangan, saya asumsikan logika PDF tetap sama.
        
// // //         // --- HALAMAN 1: DEPAN ---
// // //         const totalWidth = 595; const headerHeight = 50; const segmentWidth = totalWidth / 4;
// // //         doc.rect(0, 0, segmentWidth, headerHeight).fill('#D50000');
// // //         doc.rect(segmentWidth, 0, segmentWidth, headerHeight).fill('#E65100');
// // //         doc.rect(segmentWidth * 2, 0, segmentWidth, headerHeight).fill('#FF8A65');
// // //         doc.rect(segmentWidth * 3, 0, segmentWidth, headerHeight).fill('#FFCCBC');
        
// // //         // ... Logika PDF ...
// // //         doc.fillColor('black').font('Helvetica-Bold').fontSize(32).text('SERTIFIKAT', 0, 200, { align: 'center' });
// // //         doc.text('PREVIEW MODE', 0, 250, { align: 'center' });

// // //         doc.end();
// // //     } catch (error: any) {
// // //         console.error("PDF Preview Error:", error);
// // //         res.status(500).send("Gagal membuat preview sertifikat: " + error.message);
// // //     }
// // // });

// // // export default router;
// // import { Router, Request, Response } from 'express';
// // import { Course } from '../models/Course'; 
// // import Enrollment from '../models/Enrollment';
// // import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth'; 
// // import { z } from 'zod';
// // import PDFDocument from 'pdfkit'; 
// // import fs from 'fs';
// // import path from 'path';
// // import { fileURLToPath } from 'url';

// // // IMPORT CONTROLLER LENGKAP
// // import {
// //     getCourses, getCourseById, createCourse, updateCourse, deleteCourse,
// //     addModule, updateModule, addLesson, updateLesson, deleteLesson,
// //     toggleStatus, reorderModules,
// //     enrollCourse, verifyEnrollment, checkEnrollmentStatus, getCourseParticipants,
// //     markCompleteLessonByAdmin, resetQuizByAdmin,
// //     // [NEW] Import Chat Controllers
// //     getGroupMessages, sendGroupMessage
// // } from '../controllers/courseController';

// // const router = Router();

// // const __filename = fileURLToPath(import.meta.url);
// // const __dirname = path.dirname(__filename);

// // // ==========================================
// // // 1. ZOD SCHEMAS (Tetap Sama)
// // // ==========================================
// // const lessonSchema = z.object({
// //   title: z.string().min(1),
// //   type: z.enum(['video_url', 'upload_doc', 'quiz', 'essay', 'google_classroom', 'lesson', 'pdf', 'download_doc', 'image', 'slide', 'poll', 'virtual_class']).optional(),
// //   videoUrl: z.string().optional(),
// //   content: z.string().optional(),
// //   fileUrl: z.string().optional(),
// //   jp: z.number().default(0),
// //   scheduleDate: z.string().optional(),
// //   facilitator: z.string().optional(),
// //   facilitatorId: z.string().nullable().optional(), 
// //   classroomData: z.any().optional(),
// //   questions: z.array(z.any()).optional(),
// //   quizDuration: z.number().optional(),
// //   pollQuestion: z.string().optional(),
// //   pollOptions: z.array(z.string()).optional(),
// //   isActive: z.boolean().default(true),
// //   isMandatory: z.boolean().default(false)
// // });

// // const moduleSchema = z.object({
// //   title: z.string().min(1),
// //   lessons: z.array(lessonSchema).optional(),
// //   isActive: z.boolean().default(true),
// //   isMandatory: z.boolean().default(false),
// //   facilitatorId: z.string().nullable().optional(),
// //   jp: z.number().optional(),
// //   scheduleDate: z.string().optional()
// // });

// // const courseSchema = z.object({
// //   title: z.string().min(3),
// //   description: z.string().optional(),
// //   category: z.string().optional(), 
// //   level: z.string().optional(),
// //   price: z.number().default(0),
// //   thumbnailUrl: z.string().optional(),
// //   startDate: z.string().optional(),
// //   endDate: z.string().optional(),
// //   credits: z.number().default(0),
// //   facilitator: z.string().optional(), 
// //   facilitatorIds: z.array(z.string()).optional(),
// //   modules: z.array(moduleSchema).default([]),
// //   published: z.boolean().default(false), 
// //   organizer: z.string().default('PMI Pusat'),
// //   programType: z.string().default('training'),
// //   competencies: z.array(z.object({ code: z.string(), title: z.string() })).optional(),
// //   includeCompetenciesInCertificate: z.boolean().optional(),
// //   certificateConfig: z.object({
// //       certificateNumber: z.string().optional(),
// //       startNumber: z.coerce.number().optional().default(1), 
// //       executionDate: z.string().optional().or(z.date()),
// //       city: z.string().optional(),
// //       signatoryName: z.string().optional(),
// //       signatoryPosition: z.string().optional()
// //   }).optional(),
// // });

// // // ==========================================
// // // 2. COURSE ROUTES (CRUD)
// // // ==========================================

// // router.get('/published', async (req: Request, res: Response) => {
// //   try {
// //     const { search } = req.query;
// //     let query: any = { isPublished: true };
// //     if (search) query.title = { $regex: search, $options: 'i' };
    
// //     const courses = await Course.find(query)
// //         .select('title thumbnailUrl level category price organizer programType facilitatorIds modules isPublished')
// //         .populate('facilitatorIds', 'name avatarUrl') 
// //         .sort({ createdAt: -1 });
// //     res.json({ courses });
// //   } catch (err: any) { res.status(500).json({ error: err.message }); }
// // });

// // router.get('/', requireAuth, getCourses);
// // router.get('/:id', requireAuth, getCourseById);
// // router.post('/', requireAuth, requireFacilitator, createCourse);
// // router.put('/:id', requireAuth, requireFacilitator, updateCourse);
// // router.delete('/:id', requireAuth, requireFacilitator, deleteCourse);
// // router.patch('/:id/publish', requireAuth, requireFacilitator, toggleStatus);

// // // MODULE & LESSON ROUTES
// // router.post('/:id/modules', requireAuth, requireFacilitator, addModule);
// // router.put('/:id/modules/:moduleId', requireAuth, requireFacilitator, updateModule); 
// // router.post('/:courseId/modules/:moduleId/lessons', requireAuth, requireFacilitator, addLesson);
// // router.put('/:courseId/modules/:moduleId/lessons/:lessonId', requireAuth, requireFacilitator, updateLesson);
// // router.delete('/:courseId/modules/:moduleId/lessons/:lessonId', requireAuth, requireFacilitator, deleteLesson);

// // router.patch('/:id/toggle-status', requireAuth, requireFacilitator, toggleStatus);
// // router.patch('/:id/reorder', requireAuth, requireFacilitator, reorderModules);

// // // ==========================================
// // // 3. PARTICIPANT & ENROLLMENT
// // // ==========================================

// // router.post('/:courseId/enroll', requireAuth, enrollCourse);
// // router.get('/:courseId/check-enrollment', requireAuth, checkEnrollmentStatus);
// // router.get('/:id/participants', requireAuth, requireFacilitator, getCourseParticipants);
// // router.post('/verify-enrollment', requireAuth, requireFacilitator, verifyEnrollment);
// // router.post('/mark-complete-lesson', requireAuth, requireFacilitator, markCompleteLessonByAdmin);
// // router.post('/reset-quiz', requireAuth, requireFacilitator, resetQuizByAdmin);

// // // ==========================================
// // // 4. GROUP CHAT ROUTES [NEW]
// // // ==========================================
// // router.get('/:id/chat-group', requireAuth, requireFacilitator, getGroupMessages);
// // router.post('/:id/chat-group', requireAuth, requireFacilitator, sendGroupMessage);

// // // ==========================================
// // // 5. PREVIEW CERTIFICATE
// // // ==========================================
// // router.post('/certificate/preview', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// //     try {
// //         let { certificateConfig, competencies, courseId, includeCompetenciesInCertificate } = req.body;
// //         if ((!competencies || competencies.length === 0) && courseId) {
// //             try {
// //                 const course = await Course.findById(courseId);
// //                 if (course && course.competencies && course.competencies.length > 0) {
// //                     competencies = course.competencies;
// //                 }
// //             } catch (err) { console.warn("Fetch DB fail:", err); }
// //         }

// //         const doc = new PDFDocument({ size: 'A4', layout: 'portrait', margin: 0 });
// //         res.setHeader('Content-Type', 'application/pdf');
// //         res.setHeader('Content-Disposition', 'inline; filename=draft-sertifikat.pdf');
// //         doc.pipe(res);

// //         // --- HALAMAN 1: DEPAN ---
// //         const totalWidth = 595; const headerHeight = 50; const segmentWidth = totalWidth / 4;
// //         doc.rect(0, 0, segmentWidth, headerHeight).fill('#D50000');
// //         doc.rect(segmentWidth, 0, segmentWidth, headerHeight).fill('#E65100');
// //         doc.rect(segmentWidth * 2, 0, segmentWidth, headerHeight).fill('#FF8A65');
// //         doc.rect(segmentWidth * 3, 0, segmentWidth, headerHeight).fill('#FFCCBC');
        
// //         // ... (LOGIKA PDF SAMA SEPERTI SEBELUMNYA) ...
// //         const logoPath = path.join(__dirname, '../../assets/logo-pmi.png');
// //         if (fs.existsSync(logoPath)) { doc.image(logoPath, (totalWidth / 2) - 40, 70, { width: 80 }); } 
// //         else { doc.fillColor('#D50000').fontSize(12).text('[LOGO PMI]', 0, 90, { align: 'center' }); }

// //         doc.moveDown(5); 
// //         const startY = 160;
// //         doc.fillColor('black');
// //         doc.font('Helvetica-Bold').fontSize(32).text('SERTIFIKAT', 0, startY + 30, { align: 'center', characterSpacing: 2 });
// //         doc.font('Helvetica-Oblique').fontSize(14).text('Certificate', 0, startY + 65, { align: 'center' });

// //         doc.end();
// //     } catch (error: any) {
// //         console.error("PDF Preview Error:", error);
// //         res.status(500).send("Gagal membuat preview sertifikat: " + error.message);
// //     }
// // });

// // export default router;






// import { Router, Request, Response } from 'express';
// import { Course } from '../models/Course'; 
// import Enrollment from '../models/Enrollment';
// import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth'; 
// import { z } from 'zod';
// import PDFDocument from 'pdfkit'; 
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';

// // IMPORT CONTROLLER LENGKAP
// import {
//     getCourses, getCourseById, createCourse, updateCourse, deleteCourse,
//     addModule, updateModule, addLesson, updateLesson, deleteLesson,
//     toggleStatus, reorderModules,
//     enrollCourse, verifyEnrollment, checkEnrollmentStatus, getCourseParticipants,
//     markCompleteLessonByAdmin, resetQuizByAdmin,
//     // [NEW] Import Chat Controllers
//     getGroupMessages, sendGroupMessage
// } from '../controllers/courseController';

// const router = Router();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // ==========================================
// // 1. ZOD SCHEMAS (Tetap Sama)
// // ==========================================
// const lessonSchema = z.object({
//   title: z.string().min(1),
//   type: z.enum(['video_url', 'upload_doc', 'quiz', 'essay', 'google_classroom', 'lesson', 'pdf', 'download_doc', 'image', 'slide', 'poll', 'virtual_class']).optional(),
//   videoUrl: z.string().optional(),
//   content: z.string().optional(),
//   fileUrl: z.string().optional(),
//   jp: z.number().default(0),
//   scheduleDate: z.string().optional(),
//   facilitator: z.string().optional(),
//   facilitatorId: z.string().nullable().optional(), 
//   classroomData: z.any().optional(),
//   questions: z.array(z.any()).optional(),
//   quizDuration: z.number().optional(),
//   pollQuestion: z.string().optional(),
//   pollOptions: z.array(z.string()).optional(),
//   isActive: z.boolean().default(true),
//   isMandatory: z.boolean().default(false)
// });

// const moduleSchema = z.object({
//   title: z.string().min(1),
//   lessons: z.array(lessonSchema).optional(),
//   isActive: z.boolean().default(true),
//   isMandatory: z.boolean().default(false),
//   facilitatorId: z.string().nullable().optional(),
//   jp: z.number().optional(),
//   scheduleDate: z.string().optional()
// });

// const courseSchema = z.object({
//   title: z.string().min(3),
//   description: z.string().optional(),
//   category: z.string().optional(), 
//   level: z.string().optional(),
//   price: z.number().default(0),
//   thumbnailUrl: z.string().optional(),
//   startDate: z.string().optional(),
//   endDate: z.string().optional(),
//   credits: z.number().default(0),
//   facilitator: z.string().optional(), 
//   facilitatorIds: z.array(z.string()).optional(),
//   modules: z.array(moduleSchema).default([]),
//   published: z.boolean().default(false), 
//   organizer: z.string().default('PMI Pusat'),
//   programType: z.string().default('training'),
//   competencies: z.array(z.object({ code: z.string(), title: z.string() })).optional(),
//   includeCompetenciesInCertificate: z.boolean().optional(),
//   certificateConfig: z.object({
//       certificateNumber: z.string().optional(),
//       startNumber: z.coerce.number().optional().default(1), 
//       executionDate: z.string().optional().or(z.date()),
//       city: z.string().optional(),
//       signatoryName: z.string().optional(),
//       signatoryPosition: z.string().optional()
//   }).optional(),
// });

// // ==========================================
// // 2. COURSE ROUTES (CRUD)
// // ==========================================

// router.get('/published', async (req: Request, res: Response) => {
//   try {
//     const { search } = req.query;
//     let query: any = { isPublished: true };
//     if (search) query.title = { $regex: search, $options: 'i' };
    
//     const courses = await Course.find(query)
//         .select('title thumbnailUrl level category price organizer programType facilitatorIds modules isPublished')
//         .populate('facilitatorIds', 'name avatarUrl') 
//         .sort({ createdAt: -1 });
//     res.json({ courses });
//   } catch (err: any) { res.status(500).json({ error: err.message }); }
// });

// router.get('/', requireAuth, getCourses);
// router.get('/:id', requireAuth, getCourseById);
// router.post('/', requireAuth, requireFacilitator, createCourse);
// router.put('/:id', requireAuth, requireFacilitator, updateCourse);
// router.delete('/:id', requireAuth, requireFacilitator, deleteCourse);
// router.patch('/:id/publish', requireAuth, requireFacilitator, toggleStatus);

// // MODULE & LESSON ROUTES
// router.post('/:id/modules', requireAuth, requireFacilitator, addModule);
// router.put('/:id/modules/:moduleId', requireAuth, requireFacilitator, updateModule); 
// router.post('/:courseId/modules/:moduleId/lessons', requireAuth, requireFacilitator, addLesson);
// router.put('/:courseId/modules/:moduleId/lessons/:lessonId', requireAuth, requireFacilitator, updateLesson);
// router.delete('/:courseId/modules/:moduleId/lessons/:lessonId', requireAuth, requireFacilitator, deleteLesson);

// router.patch('/:id/toggle-status', requireAuth, requireFacilitator, toggleStatus);
// router.patch('/:id/reorder', requireAuth, requireFacilitator, reorderModules);

// // ==========================================
// // 3. PARTICIPANT & ENROLLMENT
// // ==========================================

// router.post('/:courseId/enroll', requireAuth, enrollCourse);
// router.get('/:courseId/check-enrollment', requireAuth, checkEnrollmentStatus);
// router.get('/:courseId/enrollment', requireAuth, checkEnrollmentStatus); // Alias for consistency
// router.get('/enrollments/check/:courseId', requireAuth, checkEnrollmentStatus); // Additional alias

// router.get('/:id/participants', requireAuth, getCourseParticipants); // [FIX] allow student/teacher see participants
// router.post('/verify-enrollment', requireAuth, requireFacilitator, verifyEnrollment);
// router.post('/mark-complete-lesson', requireAuth, requireFacilitator, markCompleteLessonByAdmin);
// router.post('/reset-quiz', requireAuth, requireFacilitator, resetQuizByAdmin);

// // ==========================================
// // 4. GROUP CHAT ROUTES [FIXED]
// // ==========================================
// // Menggunakan endpoint yang konsisten dengan frontend (/groups/messages dan /groups/send)
// router.get('/:id/groups/messages', requireAuth, getGroupMessages);
// router.post('/:id/groups/send', requireAuth, sendGroupMessage);

// // ==========================================
// // 5. PREVIEW CERTIFICATE
// // ==========================================
// router.post('/certificate/preview', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
//     try {
//         let { certificateConfig, competencies, courseId, includeCompetenciesInCertificate } = req.body;
//         if ((!competencies || competencies.length === 0) && courseId) {
//             try {
//                 const course = await Course.findById(courseId);
//                 if (course && course.competencies && course.competencies.length > 0) {
//                     competencies = course.competencies;
//                 }
//             } catch (err) { console.warn("Fetch DB fail:", err); }
//         }

//         const doc = new PDFDocument({ size: 'A4', layout: 'portrait', margin: 0 });
//         res.setHeader('Content-Type', 'application/pdf');
//         res.setHeader('Content-Disposition', 'inline; filename=draft-sertifikat.pdf');
//         doc.pipe(res);

//         // --- HALAMAN 1: DEPAN ---
//         const totalWidth = 595; const headerHeight = 50; const segmentWidth = totalWidth / 4;
//         doc.rect(0, 0, segmentWidth, headerHeight).fill('#D50000');
//         doc.rect(segmentWidth, 0, segmentWidth, headerHeight).fill('#E65100');
//         doc.rect(segmentWidth * 2, 0, segmentWidth, headerHeight).fill('#FF8A65');
//         doc.rect(segmentWidth * 3, 0, segmentWidth, headerHeight).fill('#FFCCBC');
        
//         // ... (LOGIKA PDF SAMA SEPERTI SEBELUMNYA) ...
//         const logoPath = path.join(__dirname, '../../assets/logo-pmi.png');
//         if (fs.existsSync(logoPath)) { doc.image(logoPath, (totalWidth / 2) - 40, 70, { width: 80 }); } 
//         else { doc.fillColor('#D50000').fontSize(12).text('[LOGO PMI]', 0, 90, { align: 'center' }); }

//         doc.moveDown(5); 
//         const startY = 160;
//         doc.fillColor('black');
//         doc.font('Helvetica-Bold').fontSize(32).text('SERTIFIKAT', 0, startY + 30, { align: 'center', characterSpacing: 2 });
//         doc.font('Helvetica-Oblique').fontSize(14).text('Certificate', 0, startY + 65, { align: 'center' });

//         doc.end();
//     } catch (error: any) {
//         console.error("PDF Preview Error:", error);
//         res.status(500).send("Gagal membuat preview sertifikat: " + error.message);
//     }
// });

// export default router;





import { Router, Request, Response } from 'express';
import { Course } from '../models/Course'; 
import Enrollment from '../models/Enrollment';
import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth'; 
import { z } from 'zod';
import PDFDocument from 'pdfkit'; 
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// IMPORT CONTROLLER LENGKAP
import {
    getCourses, getCourseById, createCourse, updateCourse, deleteCourse,
    addModule, updateModule, addLesson, updateLesson, deleteLesson,
    toggleStatus, reorderModules,
    enrollCourse, verifyEnrollment, checkEnrollmentStatus, getCourseParticipants,
    markCompleteLessonByAdmin, resetQuizByAdmin,
    // [NEW] Import Chat Controllers & Grading
    getGroupMessages, sendGroupMessage, updateGradingScheme
} from '../controllers/courseController';

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==========================================
// 1. ZOD SCHEMAS (Tetap Sama)
// ==========================================
const lessonSchema = z.object({
  title: z.string().min(1),
  type: z.enum(['video_url', 'upload_doc', 'quiz', 'essay', 'google_classroom', 'lesson', 'pdf', 'download_doc', 'image', 'slide', 'poll', 'virtual_class']).optional(),
  videoUrl: z.string().optional(),
  content: z.string().optional(),
  fileUrl: z.string().optional(),
  jp: z.number().default(0),
  scheduleDate: z.string().optional(),
  facilitator: z.string().optional(),
  facilitatorId: z.string().nullable().optional(), 
  classroomData: z.any().optional(),
  questions: z.array(z.any()).optional(),
  quizDuration: z.number().optional(),
  pollQuestion: z.string().optional(),
  pollOptions: z.array(z.string()).optional(),
  isActive: z.boolean().default(true),
  isMandatory: z.boolean().default(false)
});

const moduleSchema = z.object({
  title: z.string().min(1),
  lessons: z.array(lessonSchema).optional(),
  isActive: z.boolean().default(true),
  isMandatory: z.boolean().default(false),
  facilitatorId: z.string().nullable().optional(),
  jp: z.number().optional(),
  scheduleDate: z.string().optional()
});

const courseSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  category: z.string().optional(), 
  level: z.string().optional(),
  price: z.number().default(0),
  thumbnailUrl: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  credits: z.number().default(0),
  facilitator: z.string().optional(), 
  facilitatorIds: z.array(z.string()).optional(),
  modules: z.array(moduleSchema).default([]),
  published: z.boolean().default(false), 
  organizer: z.string().default('PMI Pusat'),
  programType: z.string().default('training'),
  competencies: z.array(z.object({ code: z.string(), title: z.string() })).optional(),
  includeCompetenciesInCertificate: z.boolean().optional(),
  certificateConfig: z.object({
      certificateNumber: z.string().optional(),
      startNumber: z.coerce.number().optional().default(1), 
      executionDate: z.string().optional().or(z.date()),
      city: z.string().optional(),
      signatoryName: z.string().optional(),
      signatoryPosition: z.string().optional()
  }).optional(),
});

// ==========================================
// 2. COURSE ROUTES (CRUD)
// ==========================================

router.get('/published', async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    let query: any = { isPublished: true };
    if (search) query.title = { $regex: search, $options: 'i' };
    
    const courses = await Course.find(query)
        .select('title thumbnailUrl level category price organizer programType facilitatorIds modules isPublished')
        .populate('facilitatorIds', 'name avatarUrl') 
        .sort({ createdAt: -1 });
    res.json({ courses });
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

router.get('/', requireAuth, getCourses);
router.get('/:id', requireAuth, getCourseById);
router.post('/', requireAuth, requireFacilitator, createCourse);
router.put('/:id', requireAuth, requireFacilitator, updateCourse);
router.delete('/:id', requireAuth, requireFacilitator, deleteCourse);
router.patch('/:id/publish', requireAuth, requireFacilitator, toggleStatus);

// MODULE & LESSON ROUTES
router.post('/:id/modules', requireAuth, requireFacilitator, addModule);
router.put('/:id/modules/:moduleId', requireAuth, requireFacilitator, updateModule); 
router.post('/:courseId/modules/:moduleId/lessons', requireAuth, requireFacilitator, addLesson);
router.put('/:courseId/modules/:moduleId/lessons/:lessonId', requireAuth, requireFacilitator, updateLesson);
router.delete('/:courseId/modules/:moduleId/lessons/:lessonId', requireAuth, requireFacilitator, deleteLesson);

router.patch('/:id/toggle-status', requireAuth, requireFacilitator, toggleStatus);
router.patch('/:id/reorder', requireAuth, requireFacilitator, reorderModules);

// ==========================================
// 3. PARTICIPANT & ENROLLMENT
// ==========================================

router.post('/:courseId/enroll', requireAuth, enrollCourse);
router.get('/:courseId/check-enrollment', requireAuth, checkEnrollmentStatus);
router.get('/:courseId/enrollment', requireAuth, checkEnrollmentStatus); // Alias for consistency
router.get('/enrollments/check/:courseId', requireAuth, checkEnrollmentStatus); // Additional alias

router.get('/:id/participants', requireAuth, getCourseParticipants); // [FIX] allow student/teacher see participants
router.post('/verify-enrollment', requireAuth, requireFacilitator, verifyEnrollment);
router.post('/mark-complete-lesson', requireAuth, requireFacilitator, markCompleteLessonByAdmin);
router.post('/reset-quiz', requireAuth, requireFacilitator, resetQuizByAdmin);

// ==========================================
// 4. GROUP CHAT ROUTES [FIXED]
// ==========================================
// Menggunakan endpoint yang konsisten dengan frontend (/groups/messages dan /groups/send)
router.get('/:id/groups/messages', requireAuth, getGroupMessages);
router.post('/:id/groups/send', requireAuth, sendGroupMessage);

// ==========================================
// 5. PREVIEW CERTIFICATE & GRADING
// ==========================================
router.post('/certificate/preview', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
    try {
        let { certificateConfig, competencies, courseId, includeCompetenciesInCertificate } = req.body;
        if ((!competencies || competencies.length === 0) && courseId) {
            try {
                const course = await Course.findById(courseId);
                if (course && course.competencies && course.competencies.length > 0) {
                    competencies = course.competencies;
                }
            } catch (err) { console.warn("Fetch DB fail:", err); }
        }

        const doc = new PDFDocument({ size: 'A4', layout: 'portrait', margin: 0 });
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename=draft-sertifikat.pdf');
        doc.pipe(res);

        // --- HALAMAN 1: DEPAN ---
        const totalWidth = 595; const headerHeight = 50; const segmentWidth = totalWidth / 4;
        doc.rect(0, 0, segmentWidth, headerHeight).fill('#D50000');
        doc.rect(segmentWidth, 0, segmentWidth, headerHeight).fill('#E65100');
        doc.rect(segmentWidth * 2, 0, segmentWidth, headerHeight).fill('#FF8A65');
        doc.rect(segmentWidth * 3, 0, segmentWidth, headerHeight).fill('#FFCCBC');
        
        // ... (LOGIKA PDF SAMA SEPERTI SEBELUMNYA) ...
        const logoPath = path.join(__dirname, '../../assets/logo-pmi.png');
        if (fs.existsSync(logoPath)) { doc.image(logoPath, (totalWidth / 2) - 40, 70, { width: 80 }); } 
        else { doc.fillColor('#D50000').fontSize(12).text('[LOGO PMI]', 0, 90, { align: 'center' }); }

        doc.moveDown(5); 
        const startY = 160;
        doc.fillColor('black');
        doc.font('Helvetica-Bold').fontSize(32).text('SERTIFIKAT', 0, startY + 30, { align: 'center', characterSpacing: 2 });
        doc.font('Helvetica-Oblique').fontSize(14).text('Certificate', 0, startY + 65, { align: 'center' });

        doc.end();
    } catch (error: any) {
        console.error("PDF Preview Error:", error);
        res.status(500).send("Gagal membuat preview sertifikat: " + error.message);
    }
});

// [NEW] Route untuk update Grading Scheme
router.put('/:id/grading', requireAuth, requireFacilitator, updateGradingScheme);

export default router;
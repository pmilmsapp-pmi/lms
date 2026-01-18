// // // // // // import { Router, Response } from 'express';
// // // // // // import Enrollment from '../models/Enrollment'; // Pastikan path import model benar
// // // // // // import Course from '../models/Course';
// // // // // // import { requireAuth, AuthedRequest } from '../middleware/auth';

// // // // // // const router = Router();

// // // // // // // 1. CEK STATUS: Apakah user sudah terdaftar di kursus ini?
// // // // // // router.get('/check/:courseId', requireAuth, async (req: AuthedRequest, res: Response) => {
// // // // // //     try {
// // // // // //         const userId = req.user?.id; // Sesuaikan dengan middleware auth Anda (id atau _id)
        
// // // // // //         const enrollment = await Enrollment.findOne({
// // // // // //             course: req.params.courseId,
// // // // // //             user: userId
// // // // // //         });

// // // // // //         res.json({ 
// // // // // //             isEnrolled: !!enrollment, // True jika ada, False jika belum
// // // // // //             enrollmentId: enrollment?._id 
// // // // // //         });
// // // // // //     } catch (error: any) {
// // // // // //         res.status(500).json({ error: error.message });
// // // // // //     }
// // // // // // });

// // // // // // // 2. SUBMIT PENDAFTARAN (Simpan Formulir)
// // // // // // router.post('/:courseId', requireAuth, async (req: AuthedRequest, res: Response) => {
// // // // // //     try {
// // // // // //         const { registrationData } = req.body;
// // // // // //         const userId = req.user?.id;
// // // // // //         const courseId = req.params.courseId;

// // // // // //         // Validasi Kursus
// // // // // //         const course = await Course.findById(courseId);
// // // // // //         if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });

// // // // // //         // Cek Duplikasi (Double Enroll)
// // // // // //         const existing = await Enrollment.findOne({ course: courseId, user: userId });
// // // // // //         if (existing) return res.status(400).json({ error: 'Anda sudah terdaftar di pelatihan ini.' });

// // // // // //         // Simpan Data
// // // // // //         const newEnrollment = await Enrollment.create({
// // // // // //             course: courseId,
// // // // // //             user: userId,
// // // // // //             registrationData: registrationData, // Data dari form frontend
// // // // // //             progress: 0
// // // // // //         });

// // // // // //         res.status(201).json({ message: 'Pendaftaran berhasil', data: newEnrollment });
// // // // // //     } catch (error: any) {
// // // // // //         console.error("Enrollment Error:", error);
// // // // // //         res.status(500).json({ error: error.message });
// // // // // //     }
// // // // // // });

// // // // // // export default router;
// // // // // import { Router, Response } from 'express';
// // // // // import Enrollment from '../models/Enrollment'; 
// // // // // import { Course } from '../models/Course'; // [FIX] Gunakan Named Import
// // // // // import { requireAuth, AuthedRequest } from '../middleware/auth';

// // // // // const router = Router();

// // // // // // CEK STATUS PENDAFTARAN
// // // // // router.get('/check/:courseId', requireAuth, async (req: AuthedRequest, res: Response) => {
// // // // //     try {
// // // // //         const userId = req.user?.id;
// // // // //         const enrollment = await Enrollment.findOne({ course: req.params.courseId, user: userId });
// // // // //         res.json({ isEnrolled: !!enrollment, enrollmentId: enrollment?._id });
// // // // //     } catch (error: any) {
// // // // //         res.status(500).json({ error: error.message });
// // // // //     }
// // // // // });

// // // // // // SUBMIT PENDAFTARAN
// // // // // router.post('/:courseId', requireAuth, async (req: AuthedRequest, res: Response) => {
// // // // //     try {
// // // // //         const { registrationData } = req.body;
// // // // //         const userId = req.user?.id;
// // // // //         const courseId = req.params.courseId;

// // // // //         const course = await Course.findById(courseId);
// // // // //         if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });

// // // // //         const existing = await Enrollment.findOne({ course: courseId, user: userId });
// // // // //         if (existing) return res.status(400).json({ error: 'Anda sudah terdaftar di pelatihan ini.' });

// // // // //         const newEnrollment = await Enrollment.create({
// // // // //             course: courseId,
// // // // //             user: userId,
// // // // //             registrationData: registrationData,
// // // // //             progress: 0
// // // // //         });

// // // // //         res.status(201).json({ message: 'Pendaftaran berhasil', data: newEnrollment });
// // // // //     } catch (error: any) {
// // // // //         res.status(500).json({ error: error.message });
// // // // //     }
// // // // // });

// // // // // export default router;
// // // // import { Router, Response } from 'express';
// // // // import Enrollment from '../models/Enrollment'; 
// // // // import { Course } from '../models/Course'; 
// // // // import { requireAuth, AuthedRequest } from '../middleware/auth';

// // // // const router = Router();

// // // // // [NEW] AMBIL DATA PENDAFTARAN TERAKHIR USER (AUTO-FILL)
// // // // router.get('/last-data', requireAuth, async (req: AuthedRequest, res: Response) => {
// // // //     try {
// // // //         const userId = req.user?.id;
// // // //         // Cari pendaftaran paling baru berdasarkan createdAt descending
// // // //         const lastEnrollment = await Enrollment.findOne({ user: userId })
// // // //             .sort({ createdAt: -1 })
// // // //             .select('registrationData');

// // // //         if (lastEnrollment && lastEnrollment.registrationData) {
// // // //             res.json(lastEnrollment.registrationData);
// // // //         } else {
// // // //             res.json(null); // Belum pernah mendaftar
// // // //         }
// // // //     } catch (error: any) {
// // // //         res.status(500).json({ error: error.message });
// // // //     }
// // // // });

// // // // // CEK STATUS PENDAFTARAN
// // // // router.get('/check/:courseId', requireAuth, async (req: AuthedRequest, res: Response) => {
// // // //     try {
// // // //         const userId = req.user?.id;
// // // //         const enrollment = await Enrollment.findOne({ course: req.params.courseId, user: userId });
// // // //         res.json({ isEnrolled: !!enrollment, enrollmentId: enrollment?._id });
// // // //     } catch (error: any) {
// // // //         res.status(500).json({ error: error.message });
// // // //     }
// // // // });

// // // // // SUBMIT PENDAFTARAN
// // // // router.post('/:courseId', requireAuth, async (req: AuthedRequest, res: Response) => {
// // // //     try {
// // // //         const { registrationData } = req.body;
// // // //         const userId = req.user?.id;
// // // //         const courseId = req.params.courseId;

// // // //         const course = await Course.findById(courseId);
// // // //         if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });

// // // //         const existing = await Enrollment.findOne({ course: courseId, user: userId });
// // // //         if (existing) return res.status(400).json({ error: 'Anda sudah terdaftar di pelatihan ini.' });

// // // //         const newEnrollment = await Enrollment.create({
// // // //             course: courseId,
// // // //             user: userId,
// // // //             registrationData: registrationData,
// // // //             progress: 0
// // // //         });

// // // //         res.status(201).json({ message: 'Pendaftaran berhasil', data: newEnrollment });
// // // //     } catch (error: any) {
// // // //         res.status(500).json({ error: error.message });
// // // //     }
// // // // });

// // // // export default router;
// // // import { Router, Response } from 'express';
// // // import Enrollment from '../models/Enrollment'; 
// // // import { Course } from '../models/Course'; 
// // // import { requireAuth, AuthedRequest } from '../middleware/auth';

// // // const router = Router();

// // // // ============================================================================
// // // // [NEW] 1. ENDPOINT AUTO-FILL DATA
// // // // Mengambil data pendaftaran terakhir user untuk mengisi formulir secara otomatis
// // // // ============================================================================
// // // router.get('/last-data', requireAuth, async (req: AuthedRequest, res: Response) => {
// // //     try {
// // //         const userId = req.user?.id;
        
// // //         // Cari data pendaftaran paling baru (berdasarkan waktu dibuat)
// // //         const lastEnrollment = await Enrollment.findOne({ user: userId })
// // //             .sort({ createdAt: -1 }) // Sort Descending (Terbaru di atas)
// // //             .select('registrationData'); // Hanya ambil field registrationData

// // //         if (lastEnrollment && lastEnrollment.registrationData) {
// // //             res.json(lastEnrollment.registrationData);
// // //         } else {
// // //             res.json(null); // Return null jika user belum pernah mendaftar sebelumnya
// // //         }
// // //     } catch (error: any) {
// // //         res.status(500).json({ error: error.message });
// // //     }
// // // });

// // // // ============================================================================
// // // // 2. CEK STATUS PENDAFTARAN
// // // // Digunakan oleh frontend untuk menentukan apakah tombol "Daftar" atau "Lanjut" yang muncul
// // // // ============================================================================
// // // router.get('/check/:courseId', requireAuth, async (req: AuthedRequest, res: Response) => {
// // //     try {
// // //         const userId = req.user?.id;
// // //         const enrollment = await Enrollment.findOne({ 
// // //             course: req.params.courseId, 
// // //             user: userId 
// // //         });
        
// // //         res.json({ 
// // //             isEnrolled: !!enrollment, // True jika sudah daftar, False jika belum
// // //             enrollmentId: enrollment?._id 
// // //         });
// // //     } catch (error: any) {
// // //         res.status(500).json({ error: error.message });
// // //     }
// // // });

// // // // ============================================================================
// // // // 3. SUBMIT PENDAFTARAN BARU
// // // // Menyimpan data formulir dan mendaftarkan user ke kursus
// // // // ============================================================================
// // // router.post('/:courseId', requireAuth, async (req: AuthedRequest, res: Response) => {
// // //     try {
// // //         const { registrationData } = req.body;
// // //         const userId = req.user?.id;
// // //         const courseId = req.params.courseId;

// // //         // Validasi: Pastikan kursus ada
// // //         const course = await Course.findById(courseId);
// // //         if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });

// // //         // Validasi: Pastikan user belum terdaftar (Mencegah duplikasi)
// // //         const existing = await Enrollment.findOne({ course: courseId, user: userId });
// // //         if (existing) return res.status(400).json({ error: 'Anda sudah terdaftar di pelatihan ini.' });

// // //         // Simpan Pendaftaran
// // //         const newEnrollment = await Enrollment.create({
// // //             course: courseId,
// // //             user: userId,
// // //             registrationData: registrationData, // Data ini disimpan untuk riwayat
// // //             progress: 0
// // //         });

// // //         res.status(201).json({ message: 'Pendaftaran berhasil', data: newEnrollment });
// // //     } catch (error: any) {
// // //         res.status(500).json({ error: error.message });
// // //     }
// // // });

// // // export default router;
// // import { Router, Response } from 'express';
// // import Enrollment from '../models/Enrollment'; 
// // import { Course } from '../models/Course'; 
// // import { requireAuth, AuthedRequest } from '../middleware/auth';

// // const router = Router();

// // // ============================================================================
// // // 1. [AUTO-FILL] AMBIL DATA PENDAFTARAN TERAKHIR
// // // Digunakan frontend untuk mengisi otomatis formulir pendaftaran berikutnya
// // // ============================================================================
// // router.get('/last-data', requireAuth, async (req: AuthedRequest, res: Response) => {
// //     try {
// //         const userId = req.user?.id;
        
// //         // Cari data pendaftaran paling baru (berdasarkan waktu dibuat)
// //         const lastEnrollment = await Enrollment.findOne({ user: userId })
// //             .sort({ createdAt: -1 }) // Sort Descending (Terbaru di atas)
// //             .select('registrationData'); // Hanya ambil field registrationData

// //         if (lastEnrollment && lastEnrollment.registrationData) {
// //             res.json(lastEnrollment.registrationData);
// //         } else {
// //             res.json(null); // Return null jika user belum pernah mendaftar sebelumnya
// //         }
// //     } catch (error: any) {
// //         res.status(500).json({ error: error.message });
// //     }
// // });

// // // ============================================================================
// // // 2. CEK STATUS PENDAFTARAN
// // // Digunakan oleh frontend untuk menentukan tampilan (Tombol Daftar vs Lanjut Belajar)
// // // ============================================================================
// // router.get('/check/:courseId', requireAuth, async (req: AuthedRequest, res: Response) => {
// //     try {
// //         const userId = req.user?.id;
// //         const enrollment = await Enrollment.findOne({ 
// //             course: req.params.courseId, 
// //             user: userId 
// //         });
        
// //         res.json({ 
// //             isEnrolled: !!enrollment, // True jika sudah daftar, False jika belum
// //             enrollmentId: enrollment?._id 
// //         });
// //     } catch (error: any) {
// //         res.status(500).json({ error: error.message });
// //     }
// // });

// // // ============================================================================
// // // 3. SUBMIT PENDAFTARAN BARU
// // // Menyimpan data formulir dan mendaftarkan user ke kursus
// // // ============================================================================
// // router.post('/:courseId', requireAuth, async (req: AuthedRequest, res: Response) => {
// //     try {
// //         const { registrationData } = req.body;
// //         const userId = req.user?.id;
// //         const courseId = req.params.courseId;

// //         // Validasi: Pastikan kursus ada
// //         const course = await Course.findById(courseId);
// //         if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });

// //         // Validasi: Pastikan user belum terdaftar (Mencegah duplikasi)
// //         const existing = await Enrollment.findOne({ course: courseId, user: userId });
// //         if (existing) return res.status(400).json({ error: 'Anda sudah terdaftar di pelatihan ini.' });

// //         // Simpan Pendaftaran
// //         const newEnrollment = await Enrollment.create({
// //             course: courseId,
// //             user: userId,
// //             registrationData: registrationData, // Data ini disimpan untuk riwayat auto-fill
// //             progress: 0
// //         });

// //         res.status(201).json({ message: 'Pendaftaran berhasil', data: newEnrollment });
// //     } catch (error: any) {
// //         res.status(500).json({ error: error.message });
// //     }
// // });

// // // ============================================================================
// // // 4. [ADMIN] HAPUS / TOLAK PESERTA
// // // Menghapus data pendaftaran agar user bisa mendaftar ulang (Reset)
// // // ============================================================================
// // router.delete('/:id', requireAuth, async (req: AuthedRequest, res: Response) => {
// //     try {
// //         // Hapus data enrollment berdasarkan ID Enrollment
// //         const deleted = await Enrollment.findByIdAndDelete(req.params.id);
        
// //         if (!deleted) {
// //             return res.status(404).json({ error: 'Data peserta tidak ditemukan' });
// //         }

// //         res.json({ message: 'Peserta berhasil dihapus/ditolak. User dapat mendaftar ulang.' });
// //     } catch (error: any) {
// //         res.status(500).json({ error: error.message });
// //     }
// // });

// // export default router;
// import { Router, Response } from 'express';
// import Enrollment from '../models/Enrollment'; 
// import { Course } from '../models/Course'; 
// import { requireAuth, AuthedRequest } from '../middleware/auth';

// const router = Router();

// // ============================================================================
// // 1. [BARU] AMBIL SEMUA PENDAFTARAN SAYA (MY ENROLLMENTS)
// // Digunakan oleh Katalog untuk menampilkan label "Menunggu" / "Terdaftar"
// // ============================================================================
// router.get('/my-enrollments', requireAuth, async (req: AuthedRequest, res: Response) => {
//     try {
//         // [FIX] Gunakan req.user?.id
//         const userId = req.user?.id;
        
//         if (!userId) {
//             return res.status(401).json({ error: 'Unauthorized' });
//         }

//         const enrollments = await Enrollment.find({ user: userId })
//             .populate('course', 'title thumbnailUrl programType') 
//             .sort({ updatedAt: -1 });

//         res.json({ enrollments });
//     } catch (error: any) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // ============================================================================
// // 2. [AUTO-FILL] AMBIL DATA PENDAFTARAN TERAKHIR
// // ============================================================================
// router.get('/last-data', requireAuth, async (req: AuthedRequest, res: Response) => {
//     try {
//         // [FIX] Gunakan req.user?.id
//         const userId = req.user?.id;
        
//         const lastEnrollment = await Enrollment.findOne({ user: userId })
//             .sort({ createdAt: -1 }) 
//             .select('registrationData'); 

//         if (lastEnrollment && lastEnrollment.registrationData) {
//             res.json(lastEnrollment.registrationData);
//         } else {
//             res.json(null); 
//         }
//     } catch (error: any) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // ============================================================================
// // 3. CEK STATUS PENDAFTARAN (Detail Page)
// // ============================================================================
// router.get('/check/:courseId', requireAuth, async (req: AuthedRequest, res: Response) => {
//     try {
//         // [FIX] Gunakan req.user?.id
//         const userId = req.user?.id;
        
//         const enrollment = await Enrollment.findOne({ 
//             course: req.params.courseId, 
//             user: userId 
//         });
        
//         if (!enrollment) {
//             return res.json({ isEnrolled: false, status: null, enrollmentId: null });
//         }

//         res.json({ 
//             isEnrolled: true, 
//             enrollmentId: enrollment._id,
//             status: enrollment.status || 'pending', 
//             progress: enrollment.progress || 0
//         });
//     } catch (error: any) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // ============================================================================
// // 4. SUBMIT PENDAFTARAN BARU
// // ============================================================================
// router.post('/:courseId', requireAuth, async (req: AuthedRequest, res: Response) => {
//     try {
//         const { registrationData } = req.body;
//         // [FIX] Gunakan req.user?.id
//         const userId = req.user?.id;
//         const courseId = req.params.courseId;

//         const course = await Course.findById(courseId);
//         if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });

//         const existing = await Enrollment.findOne({ course: courseId, user: userId });
//         if (existing) return res.status(400).json({ error: 'Anda sudah terdaftar di pelatihan ini.' });

//         const newEnrollment = await Enrollment.create({
//             course: courseId,
//             user: userId,
//             status: 'pending', 
//             registrationData: registrationData, 
//             progress: 0
//         });

//         res.status(201).json({ message: 'Pendaftaran berhasil', data: newEnrollment });
//     } catch (error: any) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // ============================================================================
// // 5. [ADMIN] HAPUS / TOLAK PESERTA
// // ============================================================================
// router.delete('/:id', requireAuth, async (req: AuthedRequest, res: Response) => {
//     try {
//         const deleted = await Enrollment.findByIdAndDelete(req.params.id);
        
//         if (!deleted) {
//             return res.status(404).json({ error: 'Data peserta tidak ditemukan' });
//         }

//         res.json({ message: 'Peserta berhasil dihapus/ditolak.' });
//     } catch (error: any) {
//         res.status(500).json({ error: error.message });
//     }
// });

// export default router;


import { Router, Response } from 'express';
// [FIX] Gunakan { Enrollment }
import { Enrollment } from '../models/Enrollment'; 
import { Course } from '../models/Course'; 
import { requireAuth, AuthedRequest } from '../middleware/auth';
import { 
    enrollCourse, 
    getMyEnrollments, 
    checkEnrollmentStatus 
} from '../controllers/enrollmentController';

const router = Router();

// ============================================================================
// 1. MY ENROLLMENTS
// ============================================================================
router.get('/my-enrollments', requireAuth, getMyEnrollments); // Menggunakan controller agar lebih bersih, atau tetap pakai inline function di bawah jika preferensi Anda

// Jika Anda menggunakan inline function di file ini sebelumnya, pastikan importnya benar:
/* router.get('/my-enrollments', requireAuth, async (req: AuthedRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ error: 'Unauthorized' });
        const enrollments = await Enrollment.find({ user: userId })
            .populate('course', 'title thumbnailUrl programType') 
            .sort({ updatedAt: -1 });
        res.json({ enrollments });
    } catch (error: any) { res.status(500).json({ error: error.message }); }
});
*/

// ============================================================================
// 2. LAST DATA (AUTO FILL)
// ============================================================================
router.get('/last-data', requireAuth, async (req: AuthedRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        const lastEnrollment = await Enrollment.findOne({ user: userId })
            .sort({ createdAt: -1 }) 
            .select('registrationData'); 

        if (lastEnrollment && lastEnrollment.registrationData) {
            res.json(lastEnrollment.registrationData);
        } else {
            res.json(null); 
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// ============================================================================
// 3. CHECK STATUS & SUBMIT (Menggunakan Controller yang sudah diperbaiki)
// ============================================================================
router.post('/', requireAuth, enrollCourse);
router.get('/check/:courseId', requireAuth, checkEnrollmentStatus);

// ============================================================================
// 4. [ADMIN] HAPUS
// ============================================================================
router.delete('/:id', requireAuth, async (req: AuthedRequest, res: Response) => {
    try {
        const deleted = await Enrollment.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Data peserta tidak ditemukan' });
        res.json({ message: 'Peserta berhasil dihapus/ditolak.' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
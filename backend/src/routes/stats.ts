// // // // import express from 'express';
// // // // import Counter from '../models/Counter'; // Import Model Counter Anda
// // // // import { User } from '../models/User';
// // // // import { Forum } from '../models/Forum'; // Kita hitung Forum/Kursus sebagai "Kursus"
// // // // // Jika ada Model Course, import juga: import { Course } from '../models/Course';

// // // // const router = express.Router();

// // // // // GET /api/stats (Ambil Data Statistik)
// // // // router.get('/', async (req, res) => {
// // // //   try {
// // // //     // 1. Hitung Total User (Realtime)
// // // //     const usersCount = await User.countDocuments({});

// // // //     // 2. Hitung Total Kursus/Materi (Realtime)
// // // //     // Jika Anda punya model Course, ganti Forum dengan Course
// // // //     const coursesCount = await Forum.countDocuments({}); 

// // // //     // 3. Ambil Counter Visitor dari model Counter Anda
// // // //     let visitorData = await Counter.findOne({ key: 'visitors' });
    
// // // //     // Jika belum ada data visitor, inisialisasi dengan 0
// // // //     const visitorsCount = visitorData ? visitorData.seq : 0;

// // // //     res.json({
// // // //       visitors: visitorsCount,
// // // //       users: usersCount,
// // // //       courses: coursesCount,
// // // //       startYear: 2025 // Hardcode atau logika lain
// // // //     });
// // // //   } catch (error: any) {
// // // //     res.status(500).json({ error: error.message });
// // // //   }
// // // // });

// // // // // POST /api/stats/visit (Tambah Visitor)
// // // // router.post('/visit', async (req, res) => {
// // // //     try {
// // // //         // Increment 'seq' pada key 'visitors'
// // // //         await Counter.findOneAndUpdate(
// // // //             { key: 'visitors' },
// // // //             { $inc: { seq: 1 } }, // seq + 1
// // // //             { upsert: true, new: true } // Buat jika belum ada
// // // //         );
// // // //         res.status(200).json({ success: true });
// // // //     } catch (e) {
// // // //         res.status(500).json({ error: 'Failed to track visit' });
// // // //     }
// // // // });

// // // // export default router;
// // // import express from 'express';
// // // import Counter from '../models/Counter';
// // // import { User } from '../models/User';
// // // import { Forum } from '../models/Forum';
// // // // Pastikan path Model Course benar. Jika belum ada file Course.ts, hapus baris ini & logika course.
// // // // import { Course } from '../models/Course'; 

// // // const router = express.Router();

// // // // GET /api/stats (Ambil Data Statistik Realtime)
// // // router.get('/', async (req, res) => {
// // //   try {
// // //     // 1. Hitung Total User
// // //     const usersCount = await User.countDocuments({});

// // //     // 2. Hitung Total Materi (Gabungan Forum + Course jika ada)
// // //     // Jika Anda punya Model Course, uncomment baris bawah:
// // //     // const realCourses = await Course.countDocuments({});
// // //     const forumsCount = await Forum.countDocuments({});
    
// // //     // Total "Kursus/Materi" = Forum + Course (Sesuaikan logika ini)
// // //     const totalCourses = forumsCount; // + (realCourses || 0);

// // //     // 3. Ambil Counter Visitor
// // //     let visitorData = await Counter.findOne({ key: 'visitors' });
    
// // //     // Jika data visitor tidak ditemukan, buat baru dengan nilai awal 0
// // //     if (!visitorData) {
// // //         visitorData = await Counter.create({ key: 'visitors', seq: 0 });
// // //     }

// // //     res.json({
// // //       visitors: visitorData.seq,
// // //       users: usersCount,
// // //       courses: totalCourses,
// // //       startYear: 2025
// // //     });
// // //   } catch (error: any) {
// // //     console.error("Error fetching stats:", error);
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // });

// // // // POST /api/stats/visit (Tambah Visitor)
// // // router.post('/visit', async (req, res) => {
// // //     try {
// // //         await Counter.findOneAndUpdate(
// // //             { key: 'visitors' },
// // //             { $inc: { seq: 1 } }, 
// // //             { upsert: true, new: true }
// // //         );
// // //         res.status(200).json({ success: true });
// // //     } catch (e) {
// // //         res.status(500).json({ error: 'Failed to track visit' });
// // //     }
// // // });

// // // export default router;


// // import express from 'express';
// // import Counter from '../models/Counter'; // Untuk Visitor Count
// // import { User } from '../models/User';
// // import Course from '../models/Course'; // Menggunakan Model Course
// // import Enrollment from '../models/Enrollment'; // [FIX] Menggunakan Enrollment, bukan UserCourse
// // import { Blog } from '../models/Blog'; // Untuk menghitung kontribusi artikel

// // const router = express.Router();

// // // ==========================================
// // // 1. GET PUBLIC STATS (Untuk Dashboard Counter)
// // // ==========================================
// // router.get('/public', async (req, res) => {
// //     try {
// //         // Hitung User (Hanya role STUDENT)
// //         const users = await User.countDocuments({ role: 'STUDENT' });
        
// //         // Hitung Kursus (Hanya yang dipublish)
// //         const courses = await Course.countDocuments({ isPublished: true });
        
// //         // Hitung Visitor (Dari Counter Model)
// //         let visitorData = await Counter.findOne({ key: 'visitors' });
        
// //         // Jika belum ada data visitor, inisialisasi dengan 0 (opsional, atau biarkan 0)
// //         const visitors = visitorData ? visitorData.seq : 0;

// //         res.json({ 
// //             users, 
// //             courses, 
// //             visitors, 
// //             startYear: 2025 
// //         });
// //     } catch (e: any) {
// //         console.error("Stats Error:", e);
// //         res.status(500).json({ error: e.message });
// //     }
// // });

// // // ==========================================
// // // 2. POST TRACK VISITOR
// // // ==========================================
// // router.post('/visit', async (req, res) => {
// //     try {
// //         await Counter.findOneAndUpdate(
// //             { key: 'visitors' },
// //             { $inc: { seq: 1 } },
// //             { upsert: true, new: true }
// //         );
// //         res.json({ success: true });
// //     } catch (e) { 
// //         res.status(500).json({ error: 'Failed to track visit' }); 
// //     }
// // });

// // // ==========================================
// // // 3. GET WALL OF FAME (TOP TERAKTIF)
// // // Gabungan: Lulusan Kursus + Penulis Blog
// // // ==========================================
// // router.get('/wall-of-fame', async (req, res) => {
// //     try {
// //         // A. Ambil Data Kelulusan dari Enrollment
// //         // Cari Enrollment dimana isCompleted = true
// //         const completedCourses = await Enrollment.aggregate([
// //             { $match: { isCompleted: true } },
// //             { $group: { _id: "$user", count: { $sum: 1 } } }
// //         ]);

// //         // B. Ambil Data Penulis Blog (Approved Blogs)
// //         const approvedBlogs = await Blog.aggregate([
// //             { $match: { status: 'approved' } },
// //             { $group: { _id: "$author", count: { $sum: 1 } } }
// //         ]);

// //         // C. Gabungkan Skor (Score Map)
// //         // Struktur: { userId: { courseCount, blogCount, totalScore } }
// //         const userScores: Record<string, { courseCount: number, blogCount: number, totalScore: number }> = {};

// //         // - Masukkan Skor Kursus (Bobot: 10 poin per kursus)
// //         completedCourses.forEach((item: any) => {
// //             const uid = item._id ? item._id.toString() : null;
// //             if (uid) {
// //                 if (!userScores[uid]) userScores[uid] = { courseCount: 0, blogCount: 0, totalScore: 0 };
// //                 userScores[uid].courseCount = item.count;
// //                 userScores[uid].totalScore += (item.count * 10);
// //             }
// //         });

// //         // - Masukkan Skor Blog (Bobot: 15 poin per artikel)
// //         approvedBlogs.forEach((item: any) => {
// //             const uid = item._id ? item._id.toString() : null;
// //             if (uid) {
// //                 if (!userScores[uid]) userScores[uid] = { courseCount: 0, blogCount: 0, totalScore: 0 };
// //                 userScores[uid].blogCount = item.count;
// //                 userScores[uid].totalScore += (item.count * 15);
// //             }
// //         });

// //         // D. Konversi ke Array & Sortir Top 3 Score Tertinggi
// //         const sortedUsers = Object.keys(userScores)
// //             .map(uid => ({
// //                 userId: uid,
// //                 ...userScores[uid]
// //             }))
// //             .sort((a, b) => b.totalScore - a.totalScore) 
// //             .slice(0, 3); // Ambil 3 Teratas

// //         // E. Populate Data User (Nama & Avatar)
// //         const results = [];
// //         for (const item of sortedUsers) {
// //             const user = await User.findById(item.userId).select('name avatarUrl role');
// //             if (user) {
// //                 // Buat Label Prestasi Dinamis untuk ditampilkan di Frontend
// //                 let label = "";
// //                 if (item.courseCount > 0 && item.blogCount > 0) {
// //                     label = `${item.courseCount} Kursus & ${item.blogCount} Artikel`;
// //                 } else if (item.blogCount > 0) {
// //                     label = `Penulis Aktif (${item.blogCount} Artikel)`;
// //                 } else {
// //                     label = `Lulusan Teladan (${item.courseCount} Kursus)`;
// //                 }

// //                 results.push({
// //                     name: user.name,
// //                     avatar: user.avatarUrl,
// //                     // Field 'course' ini digunakan frontend untuk menampilkan label prestasi
// //                     course: label 
// //                 });
// //             }
// //         }

// //         res.json(results);

// //     } catch (e: any) {
// //         console.error("WoF Error:", e);
// //         res.status(500).json({ error: e.message });
// //     }
// // });

// // export default router;

// import express from 'express';
// import Counter from '../models/Counter';
// import { User } from '../models/User';
// import Course from '../models/Course'; 
// import Enrollment from '../models/Enrollment'; 
// import { Blog } from '../models/Blog'; 

// const router = express.Router();

// router.get('/public', async (req, res) => {
//     try {
//         const users = await User.countDocuments({ role: 'STUDENT' });
//         const courses = await Course.countDocuments({ isPublished: true });
//         let visitorData = await Counter.findOne({ key: 'visitors' });
//         res.json({ users, courses, visitors: visitorData ? visitorData.seq : 0, startYear: 2025 });
//     } catch (e: any) { res.status(500).json({ error: e.message }); }
// });

// router.post('/visit', async (req, res) => {
//     try {
//         await Counter.findOneAndUpdate({ key: 'visitors' }, { $inc: { seq: 1 } }, { upsert: true, new: true });
//         res.json({ success: true });
//     } catch (e) { res.status(500).json({ error: 'Failed' }); }
// });

// // GET WALL OF FAME (VERSI: FETCH ALL & FILTER JS)
// router.get('/wall-of-fame', async (req, res) => {
//     try {
//         // 1. TOP PESERTA
//         // Fetch semua, populate user
//         const allEnrollments = await Enrollment.find().populate('user', 'name avatarUrl role').lean();
        
//         const learnerCounts: any = {};
//         allEnrollments.forEach((enr: any) => {
//             if (!enr.user) return; // Skip user null

//             // Logika longgar: Completed true ATAU progress 100 (int/string)
//             const isFinished = enr.isCompleted === true || enr.progress == 100;

//             if (isFinished) {
//                 const id = enr.user._id.toString();
//                 if (!learnerCounts[id]) {
//                     learnerCounts[id] = { user: enr.user, count: 0 };
//                 }
//                 learnerCounts[id].count++;
//             }
//         });

//         const learners = Object.values(learnerCounts)
//             .sort((a: any, b: any) => b.count - a.count)
//             .slice(0, 3)
//             .map((item: any) => ({
//                 name: item.user.name,
//                 avatar: item.user.avatarUrl,
//                 desc: `${item.count} Pelatihan`,
//                 role: item.user.role
//             }));


//         // 2. TOP PENULIS
//         const allBlogs = await Blog.find().populate('author', 'name avatarUrl role').lean();
        
//         const contributorCounts: any = {};
//         allBlogs.forEach((blog: any) => {
//             if (!blog.author) return;
            
//             // Cek status apapun yang mengandung 'publish' atau 'approv'
//             const st = blog.status ? blog.status.toLowerCase() : '';
//             if (st.includes('published') || st.includes('approved')) {
//                 const id = blog.author._id.toString();
//                 if (!contributorCounts[id]) {
//                     contributorCounts[id] = { user: blog.author, count: 0 };
//                 }
//                 contributorCounts[id].count++;
//             }
//         });

//         const contributors = Object.values(contributorCounts)
//             .sort((a: any, b: any) => b.count - a.count)
//             .slice(0, 3)
//             .map((item: any) => ({
//                 name: item.user.name,
//                 avatar: item.user.avatarUrl,
//                 desc: `${item.count} Cerita`,
//                 role: item.user.role
//             }));


//         // 3. TOP FASILITATOR
//         const allCourses = await Course.find().populate('facilitatorIds', 'name avatarUrl role').lean();

//         const facilitatorCounts: any = {};
//         allCourses.forEach((course: any) => {
//             if (course.facilitatorIds && Array.isArray(course.facilitatorIds)) {
//                 course.facilitatorIds.forEach((fac: any) => {
//                     if(!fac) return;
//                     const id = fac._id.toString();
//                     if (!facilitatorCounts[id]) {
//                         facilitatorCounts[id] = { user: fac, count: 0 };
//                     }
//                     facilitatorCounts[id].count++;
//                 });
//             }
//         });

//         const facilitators = Object.values(facilitatorCounts)
//             .sort((a: any, b: any) => b.count - a.count)
//             .slice(0, 3)
//             .map((item: any) => ({
//                 name: item.user.name,
//                 avatar: item.user.avatarUrl,
//                 desc: `${item.count} Kelas`,
//                 role: item.user.role
//             }));

//         res.json({ learners, contributors, facilitators });

//     } catch (e: any) {
//         console.error("WoF Error:", e);
//         res.status(500).json({ error: e.message });
//     }
// });

// export default router;

import express from 'express';
import Counter from '../models/Counter';
import { User } from '../models/User';
import Course from '../models/Course'; 
import Enrollment from '../models/Enrollment'; 
import { Blog } from '../models/Blog'; 
import { Forum } from '../models/Forum'; // [NEW] Import Forum

const router = express.Router();

router.get('/public', async (req, res) => {
    try {
        // [UPDATE] Tambahkan penghitungan Blog dan Forum
        const users = await User.countDocuments({ role: 'STUDENT' });
        const courses = await Course.countDocuments({ isPublished: true });
        
        // Hitung blog yang sudah terbit
        const blogs = await Blog.countDocuments({ 
            $or: [
                { status: { $regex: /^published$/i } },
                { status: { $regex: /^approved$/i } }
            ]
        });

        // Hitung semua topik forum
        const forums = await Forum.countDocuments({}); 

        let visitorData = await Counter.findOne({ key: 'visitors' });
        
        res.json({ 
            users, 
            courses, 
            blogs,   // [NEW]
            forums,  // [NEW]
            visitors: visitorData ? visitorData.seq : 0, 
            startYear: 2025 
        });
    } catch (e: any) { res.status(500).json({ error: e.message }); }
});

router.post('/visit', async (req, res) => {
    try {
        await Counter.findOneAndUpdate({ key: 'visitors' }, { $inc: { seq: 1 } }, { upsert: true, new: true });
        res.json({ success: true });
    } catch (e) { res.status(500).json({ error: 'Failed' }); }
});

// GET WALL OF FAME (VERSI: FETCH ALL & FILTER JS)
router.get('/wall-of-fame', async (req, res) => {
    try {
        // 1. TOP PESERTA
        const allEnrollments = await Enrollment.find().populate('user', 'name avatarUrl role').lean();
        const learnerCounts: any = {};
        allEnrollments.forEach((enr: any) => {
            if (!enr.user) return; 
            const isFinished = enr.isCompleted === true || enr.progress == 100;
            if (isFinished) {
                const id = enr.user._id.toString();
                if (!learnerCounts[id]) learnerCounts[id] = { user: enr.user, count: 0 };
                learnerCounts[id].count++;
            }
        });
        const learners = Object.values(learnerCounts)
            .sort((a: any, b: any) => b.count - a.count).slice(0, 3)
            .map((item: any) => ({
                name: item.user.name,
                avatar: item.user.avatarUrl,
                desc: `${item.count} Pelatihan`,
                role: item.user.role
            }));

        // 2. TOP PENULIS
        const allBlogs = await Blog.find().populate('author', 'name avatarUrl role').lean();
        const contributorCounts: any = {};
        allBlogs.forEach((blog: any) => {
            if (!blog.author) return;
            const st = blog.status ? blog.status.toLowerCase() : '';
            if (st.includes('published') || st.includes('approved')) {
                const id = blog.author._id.toString();
                if (!contributorCounts[id]) contributorCounts[id] = { user: blog.author, count: 0 };
                contributorCounts[id].count++;
            }
        });
        const contributors = Object.values(contributorCounts)
            .sort((a: any, b: any) => b.count - a.count).slice(0, 3)
            .map((item: any) => ({
                name: item.user.name,
                avatar: item.user.avatarUrl,
                desc: `${item.count} Cerita`,
                role: item.user.role
            }));

        // 3. TOP FASILITATOR
        const allCourses = await Course.find().populate('facilitatorIds', 'name avatarUrl role').lean();
        const facilitatorCounts: any = {};
        allCourses.forEach((course: any) => {
            if (course.facilitatorIds && Array.isArray(course.facilitatorIds)) {
                course.facilitatorIds.forEach((fac: any) => {
                    if(!fac) return;
                    const id = fac._id.toString();
                    if (!facilitatorCounts[id]) facilitatorCounts[id] = { user: fac, count: 0 };
                    facilitatorCounts[id].count++;
                });
            }
        });
        const facilitators = Object.values(facilitatorCounts)
            .sort((a: any, b: any) => b.count - a.count).slice(0, 3)
            .map((item: any) => ({
                name: item.user.name,
                avatar: item.user.avatarUrl,
                desc: `${item.count} Kelas`,
                role: item.user.role
            }));

        res.json({ learners, contributors, facilitators });

    } catch (e: any) {
        console.error("WoF Error:", e);
        res.status(500).json({ error: e.message });
    }
});

export default router;
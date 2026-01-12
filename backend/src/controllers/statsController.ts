// // // // import { Request, Response } from 'express';
// // // // import { User } from '../models/User';
// // // // import { Course } from '../models/Course';

// // // // export const getPublicStats = async (req: Request, res: Response) => {
// // // //   try {
// // // //     // 1. Menghitung jumlah pengguna terdaftar
// // // //     const totalUsers = await User.countDocuments();

// // // //     // 2. Menghitung jumlah kursus yang sudah dipublikasikan
// // // //     const totalCourses = await Course.countDocuments({ isActive: true });

// // // //     // 3. Simulasi atau Log Visitor 
// // // //     // Jika Anda belum memiliki tabel khusus visitor, kita bisa menggunakan 
// // // //     // angka basis yang dikalikan atau mengambil dari total users sebagai minimal.
// // // //     const totalVisitors = totalUsers * 12; // Contoh logika sederhana

// // // //     res.json({
// // // //       success: true,
// // // //       totalUsers,
// // // //       totalCourses,
// // // //       totalVisitors
// // // //     });
// // // //   } catch (error) {
// // // //     console.error('Error fetching stats:', error);
// // // //     res.status(500).json({
// // // //       success: false,
// // // //       message: 'Gagal mengambil data statistik'
// // // //     });
// // // //   }
// // // // };
// // // import { Request, Response } from 'express';
// // // import { User } from '../models/User';
// // // import { Forum } from '../models/Forum'; // Gunakan Forum sebagai data "Kursus/Materi"
// // // import Counter from '../models/Counter'; // Import Model Counter untuk Visitor Real

// // // // --- 1. GET Stats (Untuk ditampilkan di Footer) ---
// // // export const getPublicStats = async (req: Request, res: Response) => {
// // //   try {
// // //     // A. Hitung Pengguna Asli
// // //     const usersCount = await User.countDocuments();

// // //     // B. Hitung Materi/Kursus Asli
// // //     // Jika nanti sudah ada Model Course, ganti Forum dengan Course
// // //     const coursesCount = await Forum.countDocuments(); 

// // //     // C. Ambil Data Visitor Realtime dari Counter
// // //     let visitorData = await Counter.findOne({ key: 'visitors' });
    
// // //     // Jika belum ada data visitor di DB, anggap 0
// // //     const visitorsCount = visitorData ? visitorData.seq : 0;

// // //     // D. Kirim Response (Nama field HARUS SAMA dengan Frontend Footer.tsx)
// // //     res.json({
// // //       success: true,
// // //       users: usersCount,        // Frontend baca: stats.users
// // //       courses: coursesCount,    // Frontend baca: stats.courses
// // //       visitors: visitorsCount,  // Frontend baca: stats.visitors
// // //       startYear: 2025
// // //     });

// // //   } catch (error) {
// // //     console.error('Error fetching stats:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Gagal mengambil data statistik'
// // //     });
// // //   }
// // // };

// // // // --- 2. POST Track Visit (Untuk menambah counter saat website dibuka) ---
// // // export const trackVisit = async (req: Request, res: Response) => {
// // //     try {
// // //         await Counter.findOneAndUpdate(
// // //             { key: 'visitors' },
// // //             { $inc: { seq: 1 } }, // Tambah 1
// // //             { upsert: true, new: true } // Buat jika belum ada
// // //         );
// // //         res.status(200).json({ success: true });
// // //     } catch (error) {
// // //         console.error('Error tracking visit:', error);
// // //         res.status(500).json({ success: false });
// // //     }
// // // };
// // import { Request, Response } from 'express';
// // import { User } from '../models/User';
// // import { Course } from '../models/Course'; // Pastikan path ini benar sesuai struktur folder Anda
// // import Counter from '../models/Counter'; 

// // // --- 1. GET Stats (Untuk ditampilkan di Footer) ---
// // export const getPublicStats = async (req: Request, res: Response) => {
// //   try {
// //     // A. Hitung Total Pengguna Real
// //     // (Menghitung semua dokumen di koleksi 'users')
// //     const usersCount = await User.countDocuments({});

// //     // B. Hitung Total Kursus Real
// //     // (Menghitung semua dokumen di koleksi 'courses')
// //     // Jika Anda menggunakan soft delete (isDeleted), tambahkan filter { isDeleted: false }
// //     const coursesCount = await Course.countDocuments({}); 

// //     // C. Ambil Data Visitor Realtime dari Counter
// //     // Jika tidak ada, kita buat default 0
// //     let visitorData = await Counter.findOne({ key: 'visitors' });
// //     const visitorsCount = visitorData ? visitorData.seq : 0;

// //     console.log("STATS DEBUG:", { usersCount, coursesCount, visitorsCount }); // Cek terminal backend

// //     // D. Kirim Response JSON
// //     // PENTING: Nama field ini harus sama persis dengan yang dibaca Frontend
// //     res.json({
// //       users: usersCount,
// //       courses: coursesCount,
// //       visitors: visitorsCount,
// //       startYear: 2025
// //     });

// //   } catch (error) {
// //     console.error('Error fetching stats:', error);
// //     // Jika error (misal tabel Course belum ada), kirim nilai 0 agar frontend tidak crash
// //     res.status(200).json({
// //       users: 0,
// //       courses: 0,
// //       visitors: 0,
// //       startYear: 2025
// //     });
// //   }
// // };

// // // --- 2. POST Track Visit ---
// // export const trackVisit = async (req: Request, res: Response) => {
// //     try {
// //         await Counter.findOneAndUpdate(
// //             { key: 'visitors' },
// //             { $inc: { seq: 1 } }, 
// //             { upsert: true, new: true } 
// //         );
// //         res.status(200).json({ success: true });
// //     } catch (error) {
// //         console.error('Error tracking visit:', error);
// //         res.status(500).json({ success: false });
// //     }
// // };
// import { Request, Response } from 'express';
// import { User } from '../models/User';
// import { Course } from '../models/Course'; 
// import Enrollment from '../models/Enrollment'; // Pastikan model Enrollment diimport
// import Counter from '../models/Counter'; 

// // --- 1. GET Stats (Visitor, Users, Courses) ---
// export const getPublicStats = async (req: Request, res: Response) => {
//   try {
//     const usersCount = await User.countDocuments({});
//     const coursesCount = await Course.countDocuments({}); 

//     let visitorData = await Counter.findOne({ key: 'visitors' });
//     const visitorsCount = visitorData ? visitorData.seq : 0;

//     res.json({
//       users: usersCount,
//       courses: coursesCount,
//       visitors: visitorsCount,
//       startYear: 2025
//     });

//   } catch (error) {
//     console.error('Error fetching stats:', error);
//     res.status(200).json({ users: 0, courses: 0, visitors: 0, startYear: 2025 });
//   }
// };

// // --- 2. POST Track Visit ---
// export const trackVisit = async (req: Request, res: Response) => {
//     try {
//         await Counter.findOneAndUpdate(
//             { key: 'visitors' },
//             { $inc: { seq: 1 } }, 
//             { upsert: true, new: true } 
//         );
//         res.status(200).json({ success: true });
//     } catch (error) {
//         console.error('Error tracking visit:', error);
//         res.status(500).json({ success: false });
//     }
// };

// // --- 3. GET Wall of Fame (Lulusan Terbaru Realtime) ---
// export const getWallOfFame = async (req: Request, res: Response) => {
//     try {
//         // Ambil 4 lulusan terbaru
//         const graduates = await Enrollment.find({ isCompleted: true })
//             .sort({ completedAt: -1 })
//             .limit(4)
//             .populate('user', 'name avatarUrl')
//             .populate('course', 'title category');

//         const data = graduates.map((g: any) => ({
//             name: g.user?.name || 'Peserta',
//             avatar: g.user?.avatarUrl,
//             course: g.course?.title || 'Pelatihan',
//             category: g.course?.category || 'General'
//         }));

//         res.json(data);
//     } catch (error: any) {
//         res.status(500).json({ error: error.message });
//     }
// };
import { Request, Response } from 'express';
import { User } from '../models/User';
import { Course } from '../models/Course'; 
import Enrollment from '../models/Enrollment'; 
import Counter from '../models/Counter'; 

// --- 1. GET Stats (Visitor, Users, Courses) ---
export const getPublicStats = async (req: Request, res: Response) => {
  try {
    const usersCount = await User.countDocuments({});
    const coursesCount = await Course.countDocuments({}); 
    let visitorData = await Counter.findOne({ key: 'visitors' });
    const visitorsCount = visitorData ? visitorData.seq : 0;

    res.json({
      users: usersCount,
      courses: coursesCount,
      visitors: visitorsCount,
      startYear: 2025
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(200).json({ users: 0, courses: 0, visitors: 0, startYear: 2025 });
  }
};

// --- 2. POST Track Visit ---
export const trackVisit = async (req: Request, res: Response) => {
    try {
        await Counter.findOneAndUpdate({ key: 'visitors' }, { $inc: { seq: 1 } }, { upsert: true });
        res.status(200).json({ success: true });
    } catch (error) { res.status(500).json({ success: false }); }
};

// --- 3. GET Wall of Fame (LOGIC PERBAIKAN) ---
export const getWallOfFame = async (req: Request, res: Response) => {
    try {
        // Cari enrollment yang progress 100% ATAU isCompleted true
        const graduates = await Enrollment.find({ 
            $or: [
                { isCompleted: true },
                { progress: 100 }
            ]
        })
        .sort({ updatedAt: -1 }) // Urutkan dari yang terbaru update (baru lulus)
        .limit(4)
        .populate('user', 'name avatarUrl')
        .populate('course', 'title category');

        const data = graduates.map((g: any) => ({
            name: g.user?.name || 'Peserta',
            avatar: g.user?.avatarUrl,
            course: g.course?.title || 'Pelatihan',
            category: g.course?.category || 'General'
        }));

        res.json(data);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
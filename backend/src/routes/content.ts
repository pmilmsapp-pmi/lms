// // // // import express, { Request, Response } from 'express';
// // // // import { Content } from '../models/Content';
// // // // import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth'; 

// // // // const router = express.Router();

// // // // // =======================================================
// // // // // 1. GET Content (Public / Protected)
// // // // // =======================================================
// // // // // Bisa diakses publik agar Halaman Depan (Landing Page) bisa membacanya
// // // // router.get('/', async (req: Request, res: Response) => {
// // // //   try {
// // // //     // Cari dokumen dengan ID 'site_content'
// // // //     let content = await Content.findById('site_content');

// // // //     // Jika belum ada (pertama kali run), buat dokumen default kosong
// // // //     if (!content) {
// // // //       content = await Content.create({ 
// // // //         _id: 'site_content',
// // // //         heroTitle: 'Selamat Datang di LMS',
// // // //         heroDescription: 'Platform pembelajaran digital terbaik.',
// // // //         features: [
// // // //             { title: 'Fitur 1', description: 'Deskripsi fitur 1' },
// // // //             { title: 'Fitur 2', description: 'Deskripsi fitur 2' },
// // // //             { title: 'Fitur 3', description: 'Deskripsi fitur 3' }
// // // //         ]
// // // //       });
// // // //     }

// // // //     res.json(content);
// // // //   } catch (e: any) {
// // // //     res.status(500).json({ error: e.message });
// // // //   }
// // // // });

// // // // // =======================================================
// // // // // 2. UPDATE Content (Admin / Facilitator Only)
// // // // // =======================================================
// // // // // Menggunakan method PUT untuk menimpa pengaturan lama dengan yang baru
// // // // router.put('/', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // //   try {
// // // //     const updates = req.body;

// // // //     // Update dokumen 'site_content' dengan data dari frontend
// // // //     // { new: true } = mengembalikan data setelah diupdate
// // // //     // { upsert: true } = buat baru jika entah bagaimana dokumen terhapus
// // // //     const updatedContent = await Content.findByIdAndUpdate(
// // // //       'site_content',
// // // //       updates,
// // // //       { new: true, upsert: true, runValidators: true }
// // // //     );

// // // //     res.json(updatedContent);
// // // //   } catch (e: any) {
// // // //     res.status(500).json({ error: e.message });
// // // //   }
// // // // });

// // // // export default router;
// // // import express, { Request, Response } from 'express';
// // // import { Content } from '../models/Content';
// // // import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth'; 

// // // const router = express.Router();

// // // // =======================================================
// // // // 1. GET Content (Public / Protected)
// // // // =======================================================
// // // router.get('/', async (req: Request, res: Response) => {
// // //   try {
// // //     // Cari dokumen dengan ID 'site_content'
// // //     let content = await Content.findById('site_content');

// // //     // Jika belum ada (pertama kali run), buat dokumen default lengkap
// // //     if (!content) {
// // //       content = await Content.create({ 
// // //         _id: 'site_content',
        
// // //         // Default Home
// // //         heroTitle: 'Selamat Datang di LMS',
// // //         heroDescription: 'Platform pembelajaran digital terbaik.',
// // //         features: [
// // //             { title: 'Fitur 1', description: 'Deskripsi fitur 1' },
// // //             { title: 'Fitur 2', description: 'Deskripsi fitur 2' },
// // //             { title: 'Fitur 3', description: 'Deskripsi fitur 3' }
// // //         ],

// // //         // Default Courses
// // //         coursesPage: {
// // //             title: 'Katalog Pelatihan & Kursus',
// // //             description: 'Tingkatkan kompetensi Anda dengan materi berkualitas dari PMI.',
// // //             slides: []
// // //         },

// // //         // Default Blog
// // //         blogPage: {
// // //             title: 'Cerita Relawan',
// // //             description: 'Berita terbaru, kisah inspiratif, dan wawasan dari lapangan.',
// // //             slides: []
// // //         }
// // //       });
// // //     }

// // //     res.json(content);
// // //   } catch (e: any) {
// // //     res.status(500).json({ error: e.message });
// // //   }
// // // });

// // // // =======================================================
// // // // 2. UPDATE Content (Admin / Facilitator Only)
// // // // =======================================================
// // // router.put('/', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // //   try {
// // //     const updates = req.body;

// // //     // Update dokumen 'site_content' dengan data dari frontend
// // //     // { new: true } = mengembalikan data setelah diupdate
// // //     // { upsert: true } = buat baru jika entah bagaimana dokumen terhapus
// // //     // { runValidators: true } = pastikan tipe data sesuai schema
// // //     const updatedContent = await Content.findByIdAndUpdate(
// // //       'site_content',
// // //       updates,
// // //       { new: true, upsert: true, runValidators: true }
// // //     );

// // //     res.json(updatedContent);
// // //   } catch (e: any) {
// // //     res.status(500).json({ error: e.message });
// // //   }
// // // });

// // // export default router;

// // import express, { Request, Response } from 'express';
// // import { Content } from '../models/Content';
// // import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth'; 

// // const router = express.Router();

// // // =======================================================
// // // 1. GET Content (Public / Protected)
// // // =======================================================
// // router.get('/', async (req: Request, res: Response) => {
// //   try {
// //     // Cari dokumen dengan ID 'site_content'
// //     let content = await Content.findById('site_content');

// //     // Jika belum ada (pertama kali run), buat dokumen default lengkap
// //     if (!content) {
// //       content = await Content.create({ 
// //         _id: 'site_content',
        
// //         // Default Home
// //         heroTitle: 'Selamat Datang di LMS',
// //         heroDescription: 'Platform pembelajaran digital terbaik.',
// //         features: [
// //             { title: 'Fitur 1', description: 'Deskripsi fitur 1' },
// //             { title: 'Fitur 2', description: 'Deskripsi fitur 2' },
// //             { title: 'Fitur 3', description: 'Deskripsi fitur 3' }
// //         ],

// //         // Default Pages
// //         coursesPage: {
// //             title: 'Katalog Pelatihan & Kursus',
// //             description: 'Tingkatkan kompetensi Anda dengan materi berkualitas dari PMI.',
// //             slides: []
// //         },
// //         blogPage: {
// //             title: 'Cerita Relawan',
// //             description: 'Berita terbaru, kisah inspiratif, dan wawasan dari lapangan.',
// //             slides: []
// //         },
// //         forumPage: {
// //             title: 'Forum Diskusi Komunitas',
// //             description: 'Tempat berbagi ilmu, bertanya, dan berkolaborasi dengan relawan PMI lainnya.',
// //             slides: []
// //         },
// //         // [BARU] Default Library
// //         libraryPage: {
// //             title: 'Perpustakaan Digital',
// //             description: 'Kumpulan modul dan referensi resmi PMI.',
// //             slides: []
// //         }
// //       });
// //     }

// //     res.json(content);
// //   } catch (e: any) {
// //     res.status(500).json({ error: e.message });
// //   }
// // });

// // // =======================================================
// // // 2. UPDATE Content (Admin / Facilitator Only)
// // // =======================================================
// // router.put('/', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// //   try {
// //     const updates = req.body;

// //     const updatedContent = await Content.findByIdAndUpdate(
// //       'site_content',
// //       updates,
// //       { new: true, upsert: true, runValidators: true }
// //     );

// //     res.json(updatedContent);
// //   } catch (e: any) {
// //     res.status(500).json({ error: e.message });
// //   }
// // });

// // export default router;

// import express, { Request, Response } from 'express';
// import { Content } from '../models/Content';
// import { requireAuth, requirePermission, AuthedRequest } from '../middleware/auth'; // Import requirePermission

// const router = express.Router();

// // =======================================================
// // 1. GET Content (Public / Protected)
// // =======================================================
// router.get('/', async (req: Request, res: Response) => {
//   try {
//     let content = await Content.findById('site_content');

//     if (!content) {
//       content = await Content.create({ 
//         _id: 'site_content',
//         heroTitle: 'Selamat Datang di LMS',
//         heroDescription: 'Platform pembelajaran digital terbaik.',
//         features: [
//             { title: 'Fitur 1', description: 'Deskripsi fitur 1' },
//             { title: 'Fitur 2', description: 'Deskripsi fitur 2' },
//             { title: 'Fitur 3', description: 'Deskripsi fitur 3' }
//         ],
//         coursesPage: { title: 'Katalog Pelatihan & Kursus', description: '', slides: [] },
//         blogPage: { title: 'Cerita Relawan', description: '', slides: [] },
//         forumPage: { title: 'Forum Diskusi Komunitas', description: '', slides: [] },
//         libraryPage: { title: 'Perpustakaan Digital', description: '', slides: [] }
//       });
//     }
//     res.json(content);
//   } catch (e: any) {
//     res.status(500).json({ error: e.message });
//   }
// });

// // =======================================================
// // 2. UPDATE Content (SECURED BY PERMISSION)
// // =======================================================
// // Dulu: requireFacilitator (terlalu longgar)
// // Sekarang: requirePermission('manage_cms_info') (lebih aman & spesifik)
// router.put('/', 
//     requireAuth, 
//     requirePermission('manage_cms_info'), 
//     async (req: AuthedRequest, res: Response) => {
//       try {
//         const updates = req.body;
//         const updatedContent = await Content.findByIdAndUpdate(
//           'site_content',
//           updates,
//           { new: true, upsert: true, runValidators: true }
//         );
//         res.json(updatedContent);
//       } catch (e: any) {
//         res.status(500).json({ error: e.message });
//       }
//     }
// );

// export default router;


// PENAMBAHN ROUTE PENGAJUAN PELAIHAN

import express, { Request, Response } from 'express';
import { Content } from '../models/Content';
import { requireAuth, requirePermission, AuthedRequest } from '../middleware/auth'; 

const router = express.Router();

// =======================================================
// 1. GET Content (Public / Protected)
// =======================================================
router.get('/', async (req: Request, res: Response) => {
  try {
    let content = await Content.findById('site_content');

    // Jika database kosong, buat default baru
    if (!content) {
      content = await Content.create({ 
        _id: 'site_content',
        heroTitle: 'Selamat Datang di LMS',
        heroDescription: 'Platform pembelajaran digital terbaik.',
        features: [
            { title: 'Fitur 1', description: 'Deskripsi fitur 1' },
            { title: 'Fitur 2', description: 'Deskripsi fitur 2' },
            { title: 'Fitur 3', description: 'Deskripsi fitur 3' }
        ],
        coursesPage: { title: 'Katalog Pelatihan & Kursus', description: '', slides: [] },
        blogPage: { title: 'Cerita Relawan', description: '', slides: [] },
        forumPage: { title: 'Forum Diskusi Komunitas', description: '', slides: [] },
        libraryPage: { title: 'Perpustakaan Digital', description: '', slides: [] },
        
        // [BARU] Default Data untuk Pelaksana & Syarat
        organizerCategories: ['PMI Pusat', 'PMI Provinsi', 'PMI Kabupaten/Kota'],
        trainingRequirements: ['Kerangka Acuan Kerja (KAK)', 'Rencana Anggaran Biaya (RAB)', 'Jadwal Kegiatan']
      });
    }
    res.json(content);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// =======================================================
// 2. UPDATE Content (PUT - Full Update)
// =======================================================
router.put('/', 
    requireAuth, 
    requirePermission('manage_cms_info'), 
    async (req: AuthedRequest, res: Response) => {
      try {
        const updates = req.body;
        const updatedContent = await Content.findByIdAndUpdate(
          'site_content',
          updates,
          { new: true, upsert: true, runValidators: true }
        );
        res.json(updatedContent);
      } catch (e: any) {
        res.status(500).json({ error: e.message });
      }
    }
);

// =======================================================
// 3. UPDATE Partial (PATCH - Untuk TrainingConfig) [BARU]
// =======================================================
router.patch('/', 
    requireAuth, 
    requirePermission('manage_cms_info'), 
    async (req: AuthedRequest, res: Response) => {
      try {
        const updates = req.body; // Menerima trainingRequirements dsb
        const updatedContent = await Content.findByIdAndUpdate(
          'site_content',
          { $set: updates }, // Menggunakan $set untuk update parsial aman
          { new: true, upsert: true, runValidators: true }
        );
        res.json(updatedContent);
      } catch (e: any) {
        res.status(500).json({ error: e.message });
      }
    }
);

export default router;
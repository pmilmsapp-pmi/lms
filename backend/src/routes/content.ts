// // // // // // // // import express from 'express';
// // // // // // // // import { Content } from '../models/Content';
// // // // // // // // import { requireAuth, requireFacilitator } from '../middleware/auth';

// // // // // // // // const router = express.Router();

// // // // // // // // // GET Public Content
// // // // // // // // router.get('/', async (req, res) => {
// // // // // // // //   try {
// // // // // // // //     let content = await Content.findOne();
    
// // // // // // // //     // Jika data tidak ditemukan, buat data default agar slide tidak kosong
// // // // // // // //     if (!content) {
// // // // // // // //       content = await Content.create({
// // // // // // // //         heroTitle: "LMS Manajemen - Palang Merah Indonesia",
// // // // // // // //         heroDescription: "Platform pembelajaran dengan pengalaman UI/UX yang ringkas, cepat, dan aman.",
// // // // // // // //         slides: [], // Inisialisasi array kosong
// // // // // // // //         features: [
// // // // // // // //           { title: "Progres Pembelajaran", description: "Pantau progress per kursus." },
// // // // // // // //           { title: "Sertifikat Berurutan + QR", description: "Terbitkan sertifikat otomatis." },
// // // // // // // //           { title: "Upload Cover & Avatar", description: "Personalisasi profil Anda." }
// // // // // // // //         ]
// // // // // // // //       });
// // // // // // // //     }
// // // // // // // //     res.json(content);
// // // // // // // //   } catch (e: any) {
// // // // // // // //     res.status(500).json({ error: e.message });
// // // // // // // //   }
// // // // // // // // });

// // // // // // // // // UPDATE Content (Admin Only)
// // // // // // // // router.put('/', requireAuth, requireFacilitator, async (req, res) => {
// // // // // // // //   try {
// // // // // // // //     const { heroTitle, heroDescription, features } = req.body;
// // // // // // // //     let content = await Content.findOne();
// // // // // // // //     if (!content) {
// // // // // // // //       content = new Content({ heroTitle, heroDescription, features });
// // // // // // // //     } else {
// // // // // // // //       content.heroTitle = heroTitle;
// // // // // // // //       content.heroDescription = heroDescription;
// // // // // // // //       content.features = features;
// // // // // // // //     }
// // // // // // // //     await content.save();
// // // // // // // //     res.json(content);
// // // // // // // //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // // // // });

// // // // // // // // export default router;
// // // // // // // import express from 'express';
// // // // // // // import { Content } from '../models/Content';
// // // // // // // import { requireAuth, requireFacilitator } from '../middleware/auth';

// // // // // // // const router = express.Router();

// // // // // // // // GET Public Content
// // // // // // // router.get('/', async (req, res) => {
// // // // // // //   try {
// // // // // // //     let content = await Content.findOne();
    
// // // // // // //     // Jika data tidak ditemukan, buat data default agar slide tidak null
// // // // // // //     if (!content) {
// // // // // // //       content = await Content.create({
// // // // // // //         heroTitle: "LMS Manajemen - Palang Merah Indonesia",
// // // // // // //         heroDescription: "Platform pembelajaran dengan pengalaman UI/UX yang ringkas, cepat, dan aman.",
// // // // // // //         slides: [], // Inisialisasi array kosong
// // // // // // //         features: [
// // // // // // //           { title: "Progres Pembelajaran", description: "Pantau progress per kursus." },
// // // // // // //           { title: "Sertifikat Berurutan + QR", description: "Terbitkan sertifikat otomatis." },
// // // // // // //           { title: "Upload Cover & Avatar", description: "Personalisasi profil Anda." }
// // // // // // //         ]
// // // // // // //       });
// // // // // // //     }
// // // // // // //     res.json(content);
// // // // // // //   } catch (e: any) {
// // // // // // //     res.status(500).json({ error: e.message });
// // // // // // //   }
// // // // // // // });

// // // // // // // // UPDATE Content (Admin Only)
// // // // // // // router.put('/', requireAuth, requireFacilitator, async (req, res) => {
// // // // // // //   try {
// // // // // // //     // Tangkap field 'slides' juga dari body request
// // // // // // //     const { heroTitle, heroDescription, features, slides } = req.body;
    
// // // // // // //     let content = await Content.findOne();
// // // // // // //     if (!content) {
// // // // // // //       content = new Content({ heroTitle, heroDescription, features, slides });
// // // // // // //     } else {
// // // // // // //       content.heroTitle = heroTitle;
// // // // // // //       content.heroDescription = heroDescription;
// // // // // // //       content.features = features;
// // // // // // //       // Update slides jika dikirim, jika tidak biarkan yang lama atau array kosong
// // // // // // //       if (slides !== undefined) {
// // // // // // //           content.slides = slides;
// // // // // // //       }
// // // // // // //     }
// // // // // // //     await content.save();
// // // // // // //     res.json(content);
// // // // // // //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // // // });

// // // // // // // export default router;
// // // // // // import express from 'express';
// // // // // // import { requireAuth, requireFacilitator } from '../middleware/auth';
// // // // // // import { getContent, updateContent } from '../controllers/contentController';

// // // // // // const router = express.Router();

// // // // // // // GET Public Content
// // // // // // router.get('/', getContent);

// // // // // // // UPDATE Content (Hanya Fasilitator/Admin)
// // // // // // router.put('/', requireAuth, requireFacilitator, updateContent);

// // // // // // // (Opsional) Route POST untuk kompatibilitas jika frontend lama mengirim POST
// // // // // // // Tapi idealnya update data menggunakan PUT
// // // // // // router.post('/', requireAuth, requireFacilitator, updateContent);

// // // // // // export default router;
// // // // // import express from 'express';
// // // // // import { Content } from '../models/Content';
// // // // // import { requireAuth, requireFacilitator } from '../middleware/auth';

// // // // // const router = express.Router();

// // // // // // GET Public Content
// // // // // router.get('/', async (req, res) => {
// // // // //   try {
// // // // //     let content = await Content.findOne();
    
// // // // //     // Jika data tidak ditemukan, buat data default
// // // // //     if (!content) {
// // // // //       content = await Content.create({
// // // // //         heroTitle: "LMS Manajemen - Palang Merah Indonesia",
// // // // //         heroDescription: "Platform pembelajaran dengan pengalaman UI/UX yang ringkas, cepat, dan aman.",
// // // // //         slides: [], 
// // // // //         features: [
// // // // //           { title: "Progres Pembelajaran", description: "Pantau progress per kursus." },
// // // // //           { title: "Sertifikat Berurutan + QR", description: "Terbitkan sertifikat otomatis." },
// // // // //           { title: "Upload Cover & Avatar", description: "Personalisasi profil Anda." }
// // // // //         ]
// // // // //       });
// // // // //     }
// // // // //     res.json(content);
// // // // //   } catch (e: any) {
// // // // //     res.status(500).json({ error: e.message });
// // // // //   }
// // // // // });

// // // // // // UPDATE Content (Admin Only) -> Menggunakan PUT
// // // // // router.put('/', requireAuth, requireFacilitator, async (req, res) => {
// // // // //   try {
// // // // //     // Tangkap semua field dari body request
// // // // //     const { heroTitle, heroDescription, features, slides } = req.body;
    
// // // // //     let content = await Content.findOne();
// // // // //     if (!content) {
// // // // //       content = new Content({ heroTitle, heroDescription, features, slides });
// // // // //     } else {
// // // // //       content.heroTitle = heroTitle;
// // // // //       content.heroDescription = heroDescription;
// // // // //       content.features = features;
      
// // // // //       // Update slides jika ada (jika tidak dikirim, jangan diubah/kosongkan sesuai kebutuhan)
// // // // //       if (slides !== undefined) {
// // // // //           content.slides = slides;
// // // // //       }
// // // // //     }
// // // // //     await content.save();
// // // // //     res.json(content);
// // // // //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // });

// // // // // export default router;
// // // // import express from 'express';
// // // // import { Content } from '../models/Content';
// // // // import { requireAuth, requireFacilitator } from '../middleware/auth';

// // // // const router = express.Router();

// // // // // GET Public Content
// // // // router.get('/', async (req, res) => {
// // // //   try {
// // // //     let content = await Content.findOne();
    
// // // //     // Data Default jika database kosong
// // // //     if (!content) {
// // // //       content = await Content.create({
// // // //         heroTitle: "LMS Manajemen - Palang Merah Indonesia",
// // // //         heroDescription: "Platform pembelajaran dengan pengalaman UI/UX yang ringkas, cepat, dan aman.",
// // // //         heroBgUrl: "", // Default kosong
// // // //         slides: [], 
// // // //         features: [
// // // //           { title: "Progres Pembelajaran", description: "Pantau progress per kursus." },
// // // //           { title: "Sertifikat Berurutan + QR", description: "Terbitkan sertifikat otomatis." },
// // // //           { title: "Upload Cover & Avatar", description: "Personalisasi profil Anda." }
// // // //         ]
// // // //       });
// // // //     }
// // // //     res.json(content);
// // // //   } catch (e: any) {
// // // //     res.status(500).json({ error: e.message });
// // // //   }
// // // // });

// // // // // UPDATE Content (Simpan Perubahan)
// // // // router.put('/', requireAuth, requireFacilitator, async (req, res) => {
// // // //   try {
// // // //     // Tangkap semua data dari frontend
// // // //     const { heroTitle, heroDescription, features, slides } = req.body;
    
// // // //     let content = await Content.findOne();
    
// // // //     if (!content) {
// // // //       // Buat baru jika belum ada
// // // //       content = new Content({ heroTitle, heroDescription, features, slides });
// // // //     } else {
// // // //       // Update data yang ada
// // // //       content.heroTitle = heroTitle;
// // // //       content.heroDescription = heroDescription;
// // // //       content.features = features;
      
// // // //       // Update slides jika dikirim dari frontend
// // // //       if (slides !== undefined) {
// // // //           content.slides = slides;
// // // //       }
// // // //     }
    
// // // //     await content.save();
// // // //     res.json(content);
// // // //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // });

// // // // export default router;
// // // import express from 'express';
// // // import { Content } from '../models/Content';
// // // import { requireAuth, requireFacilitator } from '../middleware/auth';

// // // const router = express.Router();

// // // // GET Public Content
// // // router.get('/', async (req, res) => {
// // //   try {
// // //     let content = await Content.findOne();
// // //     // Jika kosong, buat default
// // //     if (!content) {
// // //       content = await Content.create({
// // //         heroTitle: "LMS Manajemen - Palang Merah Indonesia",
// // //         heroDescription: "Platform pembelajaran dengan pengalaman UI/UX yang ringkas, cepat, dan aman.",
// // //         heroBgUrl: "",
// // //         slides: [], 
// // //         features: [
// // //           { title: "Progres Pembelajaran", description: "Pantau progress per kursus." },
// // //           { title: "Sertifikat Berurutan + QR", description: "Terbitkan sertifikat otomatis." },
// // //           { title: "Upload Cover & Avatar", description: "Personalisasi profil Anda." }
// // //         ]
// // //       });
// // //     }
// // //     res.json(content);
// // //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // });

// // // // UPDATE Content (Simpan Perubahan)
// // // router.put('/', requireAuth, requireFacilitator, async (req, res) => {
// // //   try {
// // //     // Tangkap semua field termasuk heroBgUrl
// // //     const { heroTitle, heroDescription, features, slides, heroBgUrl } = req.body;
    
// // //     let content = await Content.findOne();
// // //     if (!content) {
// // //       content = new Content({ heroTitle, heroDescription, features, slides, heroBgUrl });
// // //     } else {
// // //       content.heroTitle = heroTitle;
// // //       content.heroDescription = heroDescription;
// // //       content.features = features;
// // //       if (slides !== undefined) content.slides = slides;
// // //       if (heroBgUrl !== undefined) content.heroBgUrl = heroBgUrl;
// // //     }
// // //     await content.save();
// // //     res.json(content);
// // //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // });

// // // export default router;
// // import express from 'express';
// // import { Content } from '../models/Content';
// // import { requireAuth, requireFacilitator } from '../middleware/auth';

// // const router = express.Router();

// // // GET Public Content
// // router.get('/', async (req, res) => {
// //   try {
// //     let content = await Content.findOne();
    
// //     // Jika belum ada data sama sekali, buat baru
// //     if (!content) {
// //       content = await Content.create({
// //         heroTitle: "LMS Manajemen - Palang Merah Indonesia",
// //         heroDescription: "Platform pembelajaran dengan pengalaman UI/UX yang ringkas, cepat, dan aman.",
// //         heroBgUrl: "",
// //         slides: [], 
// //         features: [
// //           { title: "Progres Pembelajaran", description: "Pantau progress per kursus." },
// //           { title: "Sertifikat Berurutan + QR", description: "Terbitkan sertifikat otomatis." },
// //           { title: "Upload Cover & Avatar", description: "Personalisasi profil Anda." }
// //         ]
// //       });
// //     }

// //     // Inject Default Footer jika di database masih kosong (untuk backward compatibility)
// //     if (!content.footer) {
// //         content.footer = {
// //             about: "Humanis adalah platform pembelajaran digital resmi Palang Merah Indonesia.",
// //             address: "Jl. Jendral Gatot Subroto Kav. 96, Jakarta Selatan 12790",
// //             phone: "(021) 7992325",
// //             email: "pmi@pmi.or.id",
// //             copyright: "© 2025 Palang Merah Indonesia. All rights reserved.",
// //             socials: { facebook: "", instagram: "", twitter: "", youtube: "" }
// //         };
// //     }

// //     res.json(content);
// //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // });

// // // UPDATE Content (Termasuk Footer)
// // router.put('/', requireAuth, requireFacilitator, async (req, res) => {
// //   try {
// //     const { heroTitle, heroDescription, features, slides, heroBgUrl, footer } = req.body;
    
// //     let content = await Content.findOne();
// //     if (!content) {
// //       content = new Content({ heroTitle, heroDescription, features, slides, heroBgUrl, footer });
// //     } else {
// //       content.heroTitle = heroTitle;
// //       content.heroDescription = heroDescription;
// //       content.features = features;
// //       if (slides !== undefined) content.slides = slides;
// //       if (heroBgUrl !== undefined) content.heroBgUrl = heroBgUrl;
// //       // Update Footer
// //       if (footer) content.footer = footer;
// //     }
    
// //     await content.save();
// //     res.json(content);
// //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // });

// // export default router;
// import express from 'express';
// import { Content } from '../models/Content';
// import { requireAuth, requireFacilitator } from '../middleware/auth';

// const router = express.Router();

// // GET Public Content
// router.get('/', async (req, res) => {
//   try {
//     let content = await Content.findOne();
    
//     // Inisialisasi jika data kosong
//     if (!content) {
//       content = await Content.create({
//         heroTitle: "LMS Manajemen - Palang Merah Indonesia",
//         heroDescription: "Platform pembelajaran...",
//         heroBgUrl: "",
//         slides: [], 
//         features: [
//           { title: "Progres Pembelajaran", description: "Pantau progress." },
//           { title: "Sertifikat Berurutan + QR", description: "Sertifikat otomatis." },
//           { title: "Upload Cover & Avatar", description: "Personalisasi profil." }
//         ]
//       });
//     }

//     // Inject Default Values jika field baru belum ada di database
//     if (!content.footer) {
//         content.footer = {
//             about: "Humanis adalah platform pembelajaran digital resmi PMI.",
//             address: "Jl. Jendral Gatot Subroto Kav. 96, Jakarta",
//             phone: "(021) 7992325", email: "pmi@pmi.or.id",
//             copyright: "© 2025 Palang Merah Indonesia.",
//             socials: { facebook: "", instagram: "", twitter: "", youtube: "" }
//         };
//     }
    
//     // Default Categories
//     if (!content.courseCategories || content.courseCategories.length === 0) {
//         content.courseCategories = ["Health", "Safety", "Disaster Management", "General"];
//     }
//     if (!content.libraryCategories || content.libraryCategories.length === 0) {
//         content.libraryCategories = ["Flyer", "Booklet", "Kebijakan", "Panduan Pelatihan", "Modul"];
//     }
//     if (!content.forumCategories || content.forumCategories.length === 0) {
//         content.forumCategories = [
//             { name: "Diskusi Umum", iconUrl: "" },
//             { name: "Tanya Fasilitator", iconUrl: "" }
//         ];
//     }

//     res.json(content);
//   } catch (e: any) { res.status(500).json({ error: e.message }); }
// });

// // UPDATE Content
// router.put('/', requireAuth, requireFacilitator, async (req, res) => {
//   try {
//     const { 
//         heroTitle, heroDescription, features, slides, heroBgUrl, footer,
//         forumCategories, courseCategories, libraryCategories 
//     } = req.body;
    
//     let content = await Content.findOne();
//     if (!content) {
//       content = new Content({ 
//           heroTitle, heroDescription, features, slides, heroBgUrl, footer,
//           forumCategories, courseCategories, libraryCategories 
//       });
//     } else {
//       content.heroTitle = heroTitle;
//       content.heroDescription = heroDescription;
//       content.features = features;
//       if (slides !== undefined) content.slides = slides;
//       if (heroBgUrl !== undefined) content.heroBgUrl = heroBgUrl;
//       if (footer) content.footer = footer;
      
//       // Update Categories
//       if (forumCategories) content.forumCategories = forumCategories;
//       if (courseCategories) content.courseCategories = courseCategories;
//       if (libraryCategories) content.libraryCategories = libraryCategories;
//     }
    
//     await content.save();
//     res.json(content);
//   } catch (e: any) { res.status(500).json({ error: e.message }); }
// });

// export default router;
import express, { Request, Response } from 'express';
import { Content } from '../models/Content';
import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth'; 

const router = express.Router();

// =======================================================
// 1. GET Content (Public / Protected)
// =======================================================
// Bisa diakses publik agar Halaman Depan (Landing Page) bisa membacanya
router.get('/', async (req: Request, res: Response) => {
  try {
    // Cari dokumen dengan ID 'site_content'
    let content = await Content.findById('site_content');

    // Jika belum ada (pertama kali run), buat dokumen default kosong
    if (!content) {
      content = await Content.create({ 
        _id: 'site_content',
        heroTitle: 'Selamat Datang di LMS',
        heroDescription: 'Platform pembelajaran digital terbaik.',
        features: [
            { title: 'Fitur 1', description: 'Deskripsi fitur 1' },
            { title: 'Fitur 2', description: 'Deskripsi fitur 2' },
            { title: 'Fitur 3', description: 'Deskripsi fitur 3' }
        ]
      });
    }

    res.json(content);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// =======================================================
// 2. UPDATE Content (Admin / Facilitator Only)
// =======================================================
// Menggunakan method PUT untuk menimpa pengaturan lama dengan yang baru
router.put('/', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
  try {
    const updates = req.body;

    // Update dokumen 'site_content' dengan data dari frontend
    // { new: true } = mengembalikan data setelah diupdate
    // { upsert: true } = buat baru jika entah bagaimana dokumen terhapus
    const updatedContent = await Content.findByIdAndUpdate(
      'site_content',
      updates,
      { new: true, upsert: true, runValidators: true }
    );

    res.json(updatedContent);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
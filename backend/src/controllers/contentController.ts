// // // import { Request, Response } from 'express';
// // // import { Content } from '../models/Content';

// // // // GET Content by Key
// // // export const getContent = async (req: Request, res: Response) => {
// // //   try {
// // //     const { key } = req.params;
// // //     const content = await Content.findOne({ key });
// // //     // Jika belum ada, return default array kosong
// // //     res.json(content ? content.value : []);
// // //   } catch (error: any) {
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // };

// // // // SAVE Content
// // // export const saveContent = async (req: Request, res: Response) => {
// // //   try {
// // //     const { key, value } = req.body;
    
// // //     // Update jika ada, Create jika belum ada (upsert)
// // //     const content = await Content.findOneAndUpdate(
// // //       { key },
// // //       { value },
// // //       { new: true, upsert: true }
// // //     );

// // //     res.json({ message: 'Konten disimpan', content });
// // //   } catch (error: any) {
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // };
// // import { Request, Response } from 'express';
// // import { Content } from '../models/Content';

// // // GET Content (Halaman Depan)
// // export const getContent = async (req: Request, res: Response) => {
// //   try {
// //     // Kita hanya butuh satu dokumen konten untuk halaman depan
// //     let content = await Content.findOne();

// //     // Jika data belum ada, buat data default (Seeding otomatis)
// //     if (!content) {
// //       content = await Content.create({
// //         heroTitle: "LMS Manajemen - Palang Merah Indonesia",
// //         heroDescription: "Platform pembelajaran dengan pengalaman UI/UX yang ringkas, cepat, dan aman.",
// //         slides: [], // Default array kosong
// //         features: [
// //           { title: "Progres Pembelajaran", description: "Pantau progress per kursus." },
// //           { title: "Sertifikat Berurutan + QR", description: "Terbitkan sertifikat otomatis." },
// //           { title: "Upload Cover & Avatar", description: "Personalisasi profil Anda." }
// //         ]
// //       });
// //     }
// //     res.json(content);
// //   } catch (error: any) {
// //     res.status(500).json({ error: error.message });
// //   }
// // };

// // // UPDATE Content (Admin Only)
// // export const updateContent = async (req: Request, res: Response) => {
// //   try {
// //     // Tangkap data dari body request
// //     const { heroTitle, heroDescription, features, slides } = req.body;
    
// //     let content = await Content.findOne();
    
// //     if (!content) {
// //       // Jika belum ada, buat baru
// //       content = new Content({ heroTitle, heroDescription, features, slides });
// //     } else {
// //       // Jika sudah ada, update field-nya
// //       if (heroTitle) content.heroTitle = heroTitle;
// //       if (heroDescription) content.heroDescription = heroDescription;
// //       if (features) content.features = features;
      
// //       // Update slides jika dikirim (array kosong valid untuk menghapus semua slide)
// //       if (slides !== undefined) {
// //           content.slides = slides;
// //       }
// //     }
    
// //     await content.save();
// //     res.json(content);
// //   } catch (error: any) {
// //     res.status(500).json({ error: error.message });
// //   }
// // };


// import { Request, Response } from 'express';
// import { Content } from '../models/Content';
// import { AuthedRequest } from '../middleware/auth'; // Sesuaikan path middleware auth Anda

// // GET Content by Page Name
// export const getContent = async (req: Request, res: Response) => {
//   try {
//     // Ambil nama halaman dari URL (misal: /api/content/blog)
//     // Jika tidak ada parameter, default ke 'home'
//     const pageName = req.params.page || 'home';

//     let content = await Content.findOne({ page: pageName });

//     // Jika data belum ada, buat data default sesuai halaman
//     if (!content) {
//       let defaultData: any = {
//         page: pageName,
//         heroTitle: '',
//         heroDescription: '',
//         slides: []
//       };

//       // Default khusus Home
//       if (pageName === 'home') {
//         defaultData.heroTitle = "LMS Manajemen - Palang Merah Indonesia";
//         defaultData.heroDescription = "Platform pembelajaran dengan pengalaman UI/UX yang ringkas.";
//         defaultData.features = [
//           { title: "Progres Pembelajaran", description: "Pantau progress per kursus." },
//           { title: "Sertifikat Berurutan + QR", description: "Terbitkan sertifikat otomatis." },
//           { title: "Upload Cover & Avatar", description: "Personalisasi profil Anda." }
//         ];
//       }
//       // Default khusus Blog
//       else if (pageName === 'blog') {
//         defaultData.heroTitle = "Cerita Relawan";
//         defaultData.heroDescription = "Berita terbaru dan kisah inspiratif dari lapangan.";
//       }
//       // Default khusus Courses (Katalog)
//       else if (pageName === 'courses') {
//         defaultData.heroTitle = "Katalog Pelatihan & Kursus";
//         defaultData.heroDescription = "Tingkatkan kompetensi Anda dengan materi berkualitas.";
//       }

//       content = await Content.create(defaultData);
//     }
    
//     res.json(content);
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // UPDATE Content (Admin Only)
// export const updateContent = async (req: AuthedRequest, res: Response) => {
//   try {
//     const pageName = req.params.page || 'home'; // Tangkap parameter page
//     const { heroTitle, heroDescription, features, slides, courseCategories } = req.body;
    
//     // Gunakan findOneAndUpdate dengan upsert agar aman
//     const updatedContent = await Content.findOneAndUpdate(
//       { page: pageName },
//       {
//         heroTitle,
//         heroDescription,
//         features, // Opsional (biasanya cuma home yang punya)
//         slides,   // Array URL gambar
//         courseCategories,
//         updatedBy: req.user?.id
//       },
//       { new: true, upsert: true, setDefaultsOnInsert: true }
//     );
    
//     res.json(updatedContent);
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };






import { Request, Response } from 'express';
import { Content } from '../models/Content';
import { AuthedRequest } from '../middleware/auth'; 

// GET Content
export const getContent = async (req: Request, res: Response) => {
  try {
    const pageName = req.params.page || 'home';
    let content = await Content.findOne({ page: pageName });

    if (!content) {
      let defaultData: any = { page: pageName, heroTitle: '', heroDescription: '', slides: [] };
      if (pageName === 'home') {
        defaultData.heroTitle = "LMS Manajemen - Palang Merah Indonesia";
        defaultData.heroDescription = "Platform pembelajaran digital.";
        defaultData.features = [{ title: "Fitur 1", description: "Desc" }];
        // [BARU] Tambahkan default courseRequirements
        defaultData.organizerCategories = ['PMI Pusat', 'PMI Provinsi', 'PMI Kabupaten/Kota'];
        defaultData.trainingRequirements = ['Kerangka Acuan Kerja (KAK)', 'Rencana Anggaran Biaya (RAB)'];
        defaultData.courseRequirements = ['Outline Materi', 'Profil Pengajar']; 
      }
      // ... logic page lain tetap sama ...
      content = await Content.create(defaultData);
    }
    
    res.json(content);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE Content
export const updateContent = async (req: AuthedRequest, res: Response) => {
  try {
    const pageName = req.params.page || 'home'; 
    
    // [LENGKAPI] Tambahkan courseRequirements di destructuring
    const { 
        heroTitle, heroDescription, features, slides, 
        courseCategories, organizerCategories, 
        trainingRequirements, courseRequirements // [BARU]
    } = req.body;
    
    const updatedContent = await Content.findOneAndUpdate(
      { page: pageName },
      {
        heroTitle, heroDescription, features, slides, courseCategories,
        organizerCategories,
        trainingRequirements,
        courseRequirements, // [BARU]
        updatedBy: req.user?.id
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    
    res.json(updatedContent);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
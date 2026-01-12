// import { Request, Response } from 'express';
// import { Content } from '../models/Content';

// // GET Content by Key
// export const getContent = async (req: Request, res: Response) => {
//   try {
//     const { key } = req.params;
//     const content = await Content.findOne({ key });
//     // Jika belum ada, return default array kosong
//     res.json(content ? content.value : []);
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // SAVE Content
// export const saveContent = async (req: Request, res: Response) => {
//   try {
//     const { key, value } = req.body;
    
//     // Update jika ada, Create jika belum ada (upsert)
//     const content = await Content.findOneAndUpdate(
//       { key },
//       { value },
//       { new: true, upsert: true }
//     );

//     res.json({ message: 'Konten disimpan', content });
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };
import { Request, Response } from 'express';
import { Content } from '../models/Content';

// GET Content (Halaman Depan)
export const getContent = async (req: Request, res: Response) => {
  try {
    // Kita hanya butuh satu dokumen konten untuk halaman depan
    let content = await Content.findOne();

    // Jika data belum ada, buat data default (Seeding otomatis)
    if (!content) {
      content = await Content.create({
        heroTitle: "LMS Manajemen - Palang Merah Indonesia",
        heroDescription: "Platform pembelajaran dengan pengalaman UI/UX yang ringkas, cepat, dan aman.",
        slides: [], // Default array kosong
        features: [
          { title: "Progres Pembelajaran", description: "Pantau progress per kursus." },
          { title: "Sertifikat Berurutan + QR", description: "Terbitkan sertifikat otomatis." },
          { title: "Upload Cover & Avatar", description: "Personalisasi profil Anda." }
        ]
      });
    }
    res.json(content);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE Content (Admin Only)
export const updateContent = async (req: Request, res: Response) => {
  try {
    // Tangkap data dari body request
    const { heroTitle, heroDescription, features, slides } = req.body;
    
    let content = await Content.findOne();
    
    if (!content) {
      // Jika belum ada, buat baru
      content = new Content({ heroTitle, heroDescription, features, slides });
    } else {
      // Jika sudah ada, update field-nya
      if (heroTitle) content.heroTitle = heroTitle;
      if (heroDescription) content.heroDescription = heroDescription;
      if (features) content.features = features;
      
      // Update slides jika dikirim (array kosong valid untuk menghapus semua slide)
      if (slides !== undefined) {
          content.slides = slides;
      }
    }
    
    await content.save();
    res.json(content);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
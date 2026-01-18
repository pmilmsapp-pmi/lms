// import { Router } from 'express';
// import multer from 'multer';
// import { createClient } from '@supabase/supabase-js';
// import { requireAuth, requireFacilitator } from '../middleware/auth';
// import { Course } from '../models/Course'; 

// const router = Router();

// // ==========================================
// // 1. SETUP SUPABASE & MULTER
// // ==========================================

// // Inisialisasi Client Supabase
// // Pastikan variabel ini ada di Vercel Environment Variables
// const supabaseUrl = process.env.SUPABASE_URL;
// const supabaseKey = process.env.SUPABASE_SERVICE_KEY; // Pakai SERVICE ROLE key

// if (!supabaseUrl || !supabaseKey) {
//   console.error("❌ SUPABASE_URL atau SUPABASE_SERVICE_KEY belum disetting!");
// }

// const supabase = createClient(supabaseUrl!, supabaseKey!);

// // Gunakan MemoryStorage (File disimpan di RAM sementara, bukan di Disk)
// // Ini solusi Anti-Error "Read-only file system" di Vercel
// const storage = multer.memoryStorage();

// const upload = multer({ 
//   storage,
//   limits: { fileSize: 10 * 1024 * 1024 } // Limit 10MB
// });

// // Helper Function: Upload ke Supabase
// async function uploadToSupabase(file: Express.Multer.File, folder: string = '') {
//   // Buat nama file unik
//   const safeName = file.originalname.replace(/[^a-zA-Z0-9.]/g, '-');
//   const fileName = `${Date.now()}-${Math.round(Math.random() * 1E9)}-${safeName}`;
//   const filePath = folder ? `${folder}/${fileName}` : fileName;

//   // Upload Buffer ke Bucket 'uploads'
//   const { data, error } = await supabase.storage
//     .from('uploads') // Pastikan nama bucket di Supabase adalah 'uploads'
//     .upload(filePath, file.buffer, {
//       contentType: file.mimetype,
//       upsert: false
//     });

//   if (error) throw error;

//   // Ambil Public URL
//   const { data: publicData } = supabase.storage
//     .from('uploads')
//     .getPublicUrl(filePath);

//   return publicData.publicUrl;
// }

// // ==========================================
// // 2. ENDPOINTS
// // ==========================================

// // A. Upload Generic
// router.post('/', requireAuth, upload.single('file'), async (req: any, res: any) => {
//   try {
//     if (!req.file) return res.status(400).json({ error: 'Tidak ada file.' });
    
//     const publicUrl = await uploadToSupabase(req.file, 'general');
    
//     return res.status(200).json({ success: true, url: publicUrl, file: req.file });
//   } catch (error: any) {
//     console.error("Upload Error:", error);
//     return res.status(500).json({ error: "Gagal upload ke Storage: " + error.message });
//   }
// });

// // B. Upload Cover Course
// router.post('/course/:courseId/cover', requireAuth, requireFacilitator, upload.single('file'), async (req: any, res: any) => {
//   try {
//     if (!req.file) return res.status(400).json({ error: 'Tidak ada file.' });
//     const { courseId } = req.params;
    
//     const publicUrl = await uploadToSupabase(req.file, 'covers');

//     const course = await Course.findByIdAndUpdate(courseId, { thumbnailUrl: publicUrl }, { new: true });
//     if (!course) return res.status(404).json({ error: 'Course not found' });
    
//     return res.status(200).json({ success: true, imageUrl: publicUrl, course });
//   } catch (error: any) {
//     return res.status(500).json({ error: error.message });
//   }
// });

// // C. Upload Signature
// router.post('/signature', requireAuth, upload.single('file'), async (req: any, res: any) => {
//   try {
//     if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    
//     const publicUrl = await uploadToSupabase(req.file, 'signatures');
    
//     res.json({ url: publicUrl });
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Helper lama (file/:filename) bisa dihapus atau dibiarkan return 404
// // karena sekarang Frontend langsung akses URL Supabase.

// export default router;




import { Router } from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { requireAuth, requireFacilitator } from '../middleware/auth';
import { Course } from '../models/Course'; 

const router = Router();

// ==========================================
// 1. SETUP CLOUDINARY
// ==========================================

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folderName = 'humanis-lms';
    
    // Logika Folder sesuai struktur Anda
    if (req.originalUrl.includes('cover')) {
        folderName = 'humanis-lms/covers';
    } else if (req.originalUrl.includes('signature')) {
        folderName = 'humanis-lms/signatures';
    } else if (file.mimetype === 'application/pdf') {
        // [FIX] Folder khusus PDF sesuai screenshot
        folderName = 'humanis-lms/documents'; 
    }

    const isPdf = file.mimetype === 'application/pdf';

    return {
      folder: folderName,
      // [FIX KRUSIAL] 'auto' wajib agar PDF dideteksi sebagai dokumen raw (bukan gambar)
      resource_type: 'auto', 
      
      // [FIX KRUSIAL] Paksa PUBLIC agar tidak "Blocked for delivery"
      access_mode: 'public', 
      
      allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'pdf', 'mp4', 'doc', 'docx'],
      
      // Jangan ubah format jika PDF
      format: undefined, 
      
      public_id: `${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9]/g, "_")}`,
      
      // Jangan kompres PDF (biarkan array kosong), hanya kompres gambar
      transformation: isPdf ? [] : [{ quality: 'auto', fetch_format: 'auto' }] 
    };
  },
});

// Limit tetap besar di backend agar tidak menolak file
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 } 
});

// ==========================================
// 2. ENDPOINTS
// ==========================================

// A. Upload Generic
router.post('/', requireAuth, upload.single('file'), (req: any, res: any) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Tidak ada file.' });
    
    // Ambil URL yang aman (HTTPS)
    let fileUrl = req.file.secure_url || req.file.path;
    
    // Pastikan URL PDF benar
    if (req.file.mimetype === 'application/pdf') {
        // Gunakan secure_url yang biasanya lebih stabil untuk akses public
        fileUrl = req.file.secure_url;
    }

    return res.status(200).json({ success: true, url: fileUrl, file: req.file });
  } catch (error: any) {
    console.error("Upload Error:", error);
    return res.status(500).json({ error: "Cloudinary Error: " + error.message });
  }
});

// B. Upload Cover Course
router.post('/course/:courseId/cover', requireAuth, requireFacilitator, upload.single('file'), async (req: any, res: any) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Tidak ada file.' });
    const { courseId } = req.params;
    
    const publicUrl = req.file.path || req.file.secure_url;

    const course = await Course.findByIdAndUpdate(courseId, { thumbnailUrl: publicUrl }, { new: true });
    if (!course) return res.status(404).json({ error: 'Course not found' });
    
    return res.status(200).json({ success: true, imageUrl: publicUrl, course });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// C. Upload Signature
router.post('/signature', requireAuth, upload.single('file'), async (req: any, res: any) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const publicUrl = req.file.secure_url || req.file.path;
    res.json({ url: publicUrl });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
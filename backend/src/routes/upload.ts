import { Router } from 'express';
import multer from 'multer';
import { createClient } from '@supabase/supabase-js';
import { requireAuth, requireFacilitator } from '../middleware/auth';
import { Course } from '../models/Course'; 

const router = Router();

// ==========================================
// 1. SETUP SUPABASE & MULTER
// ==========================================

// Inisialisasi Client Supabase
// Pastikan variabel ini ada di Vercel Environment Variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY; // Pakai SERVICE ROLE key

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ SUPABASE_URL atau SUPABASE_SERVICE_KEY belum disetting!");
}

const supabase = createClient(supabaseUrl!, supabaseKey!);

// Gunakan MemoryStorage (File disimpan di RAM sementara, bukan di Disk)
// Ini solusi Anti-Error "Read-only file system" di Vercel
const storage = multer.memoryStorage();

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // Limit 10MB
});

// Helper Function: Upload ke Supabase
async function uploadToSupabase(file: Express.Multer.File, folder: string = '') {
  // Buat nama file unik
  const safeName = file.originalname.replace(/[^a-zA-Z0-9.]/g, '-');
  const fileName = `${Date.now()}-${Math.round(Math.random() * 1E9)}-${safeName}`;
  const filePath = folder ? `${folder}/${fileName}` : fileName;

  // Upload Buffer ke Bucket 'uploads'
  const { data, error } = await supabase.storage
    .from('uploads') // Pastikan nama bucket di Supabase adalah 'uploads'
    .upload(filePath, file.buffer, {
      contentType: file.mimetype,
      upsert: false
    });

  if (error) throw error;

  // Ambil Public URL
  const { data: publicData } = supabase.storage
    .from('uploads')
    .getPublicUrl(filePath);

  return publicData.publicUrl;
}

// ==========================================
// 2. ENDPOINTS
// ==========================================

// A. Upload Generic
router.post('/', requireAuth, upload.single('file'), async (req: any, res: any) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Tidak ada file.' });
    
    const publicUrl = await uploadToSupabase(req.file, 'general');
    
    return res.status(200).json({ success: true, url: publicUrl, file: req.file });
  } catch (error: any) {
    console.error("Upload Error:", error);
    return res.status(500).json({ error: "Gagal upload ke Storage: " + error.message });
  }
});

// B. Upload Cover Course
router.post('/course/:courseId/cover', requireAuth, requireFacilitator, upload.single('file'), async (req: any, res: any) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Tidak ada file.' });
    const { courseId } = req.params;
    
    const publicUrl = await uploadToSupabase(req.file, 'covers');

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
    
    const publicUrl = await uploadToSupabase(req.file, 'signatures');
    
    res.json({ url: publicUrl });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Helper lama (file/:filename) bisa dihapus atau dibiarkan return 404
// karena sekarang Frontend langsung akses URL Supabase.

export default router;

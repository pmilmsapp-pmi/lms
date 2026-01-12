import { Router } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { requireAuth, requireFacilitator } from '../middleware/auth';
import { Course } from '../models/Course'; 

const router = Router();

// ==========================================
// 1. KONFIGURASI FOLDER PENYIMPANAN (FIX VERCEL)
// ==========================================

// Cek apakah kita sedang di Vercel (Production) atau Local
const isProduction = process.env.NODE_ENV === 'production';

// Di Vercel wajib pakai /tmp. Di Local pakai public/uploads.
const UPLOAD_PATH = isProduction 
  ? '/tmp' 
  : path.resolve(process.cwd(), 'public', 'uploads');

// Buat folder jika belum ada (Hanya berhasil di Local atau di dalam /tmp)
if (!fs.existsSync(UPLOAD_PATH)) {
  try {
    fs.mkdirSync(UPLOAD_PATH, { recursive: true });
  } catch (err) {
    console.warn('⚠️ Gagal membuat folder uploads (abaikan jika di Vercel read-only):', err);
  }
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOAD_PATH);
  },
  filename: (_req, file, cb) => {
    // Sanitasi nama file agar aman
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.]/g, '-');
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${uniqueSuffix}-${safeName}`);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // Limit 10MB
});

// ==========================================
// 2. ENDPOINTS
// ==========================================

// A. Upload Generic
router.post('/', requireAuth, upload.single('file'), (req: any, res: any) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Tidak ada file.' });
    
    // Perhatikan: Di Vercel, file di /tmp tidak bisa diakses via URL statis biasa
    // Jadi kita kembalikan nama filenya saja atau URL simulasi
    const relUrl = isProduction 
      ? `/api/upload/file/${req.file.filename}` // URL Proxy (opsional) atau biarkan temporary
      : `/uploads/${req.file.filename}`;
      
    return res.status(200).json({ success: true, url: relUrl, file: req.file });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// B. Upload Cover Course
router.post('/course/:courseId/cover', requireAuth, requireFacilitator, upload.single('file'), async (req: any, res: any) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Tidak ada file.' });
    const { courseId } = req.params;
    
    const relUrl = isProduction 
      ? `/tmp/${req.file.filename}` 
      : `/uploads/${req.file.filename}`;

    const course = await Course.findByIdAndUpdate(courseId, { thumbnailUrl: relUrl }, { new: true });
    if (!course) return res.status(404).json({ error: 'Course not found' });
    return res.status(200).json({ success: true, imageUrl: relUrl, course });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// C. Upload Signature
router.post('/signature', requireAuth, upload.single('file'), (req: any, res: any) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    
    const fileUrl = isProduction 
      ? `/tmp/${req.file.filename}`
      : `/uploads/${req.file.filename}`;
      
    res.json({ url: fileUrl });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// [NEW] Helper Route untuk membaca file dari /tmp di Vercel (Opsional)
// Ini diperlukan karena folder /tmp tidak otomatis terekspos ke publik
router.get('/file/:filename', (req: any, res: any) => {
    if (!isProduction) return res.status(404).send("Gunakan static folder di local");
    
    const filePath = path.join('/tmp', req.params.filename);
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send("File not found or expired");
    }
});

export default router;

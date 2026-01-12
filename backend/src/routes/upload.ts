import { Router } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { requireAuth, requireFacilitator } from '../middleware/auth';
import { Course } from '../models/Course'; 

const router = Router();

// ==========================================
// 1. KONFIGURASI FOLDER PENYIMPANAN
// ==========================================
// Menggunakan process.cwd() aman di CommonJS
const UPLOAD_PATH = path.resolve(process.cwd(), 'public', 'uploads');

if (!fs.existsSync(UPLOAD_PATH)) {
    // Try-catch ditambahkan untuk keamanan di lingkungan serverless yang read-only
    try {
        fs.mkdirSync(UPLOAD_PATH, { recursive: true });
    } catch (err) {
        console.warn('⚠️ Gagal membuat folder uploads (mungkin read-only env):', err);
    }
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    // Di Vercel (Production), kita arahkan ke /tmp jika penyimpanan permanen gagal
    // Namun untuk setup dasar, kita biarkan UPLOAD_PATH
    cb(null, UPLOAD_PATH);
  },
  filename: (_req, file, cb) => {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.]/g, '-');
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${uniqueSuffix}-${safeName}`);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

// ==========================================
// 2. ENDPOINTS
// ==========================================

// A. Upload Generic
router.post('/', requireAuth, upload.single('file'), (req: any, res: any) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Tidak ada file.' });
    const relUrl = `/uploads/${req.file.filename}`; 
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
    const relUrl = `/uploads/${req.file.filename}`;
    const course = await Course.findByIdAndUpdate(courseId, { thumbnailUrl: relUrl }, { new: true });
    if (!course) return res.status(404).json({ error: 'Course not found' });
    return res.status(200).json({ success: true, imageUrl: relUrl, course });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// C. Upload Signature (Tanda Tangan)
router.post('/signature', requireAuth, upload.single('file'), (req: any, res: any) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

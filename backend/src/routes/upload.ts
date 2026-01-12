import { Router } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { requireAuth, requireFacilitator } from '../middleware/auth';
import { Course } from '../models/Course'; 

const router = Router();

// ==========================================
// 1. KONFIGURASI FOLDER PENYIMPANAN (UPDATED)
// ==========================================

// Logika Baru: Default ke '/tmp' untuk keamanan maksimal di serverless.
// Kita hanya pakai folder lokal jika JELAS-JELAS tidak ada variabel lingkungan Vercel.
let UPLOAD_PATH = '/tmp'; 

// Jika TIDAK ada variabel 'VERCEL', berarti kita sedang di Localhost
if (!process.env.VERCEL) {
    UPLOAD_PATH = path.resolve(process.cwd(), 'public', 'uploads');
}

// Pastikan folder ada (Dibungkus Try-Catch agar server TIDAK CRASH jika gagal)
if (!fs.existsSync(UPLOAD_PATH)) {
  try {
    fs.mkdirSync(UPLOAD_PATH, { recursive: true });
  } catch (err) {
    console.error(`⚠️ Gagal membuat folder di ${UPLOAD_PATH}. Fallback ke /tmp`);
    // Jika gagal buat folder lokal, paksa fallback ke /tmp agar server tetap jalan
    UPLOAD_PATH = '/tmp'; 
  }
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
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
  limits: { fileSize: 10 * 1024 * 1024 } 
});

// ==========================================
// 2. ENDPOINTS
// ==========================================

router.post('/', requireAuth, upload.single('file'), (req: any, res: any) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Tidak ada file.' });
    
    // URL Response
    const relUrl = process.env.VERCEL 
      ? `/api/upload/file/${req.file.filename}` 
      : `/uploads/${req.file.filename}`;
      
    return res.status(200).json({ success: true, url: relUrl, file: req.file });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

router.post('/course/:courseId/cover', requireAuth, requireFacilitator, upload.single('file'), async (req: any, res: any) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Tidak ada file.' });
    const { courseId } = req.params;
    
    const relUrl = process.env.VERCEL 
      ? `/api/upload/file/${req.file.filename}` 
      : `/uploads/${req.file.filename}`;

    const course = await Course.findByIdAndUpdate(courseId, { thumbnailUrl: relUrl }, { new: true });
    if (!course) return res.status(404).json({ error: 'Course not found' });
    return res.status(200).json({ success: true, imageUrl: relUrl, course });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

router.post('/signature', requireAuth, upload.single('file'), (req: any, res: any) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    
    const fileUrl = process.env.VERCEL 
      ? `/api/upload/file/${req.file.filename}`
      : `/uploads/${req.file.filename}`;
      
    res.json({ url: fileUrl });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Helper Route untuk Vercel
router.get('/file/:filename', (req: any, res: any) => {
    // Hanya aktifkan di Vercel
    if (!process.env.VERCEL) return res.status(404).send("Gunakan static folder di local");
    
    const filePath = path.join('/tmp', req.params.filename);
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send("File not found (Temporary file expired)");
    }
});

export default router;

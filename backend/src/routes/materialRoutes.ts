import express from 'express';
import multer from 'multer';
import { uploadMaterial } from '../controllers/uploadController';

const router = express.Router();

// Gunakan Memory Storage (RAM) agar fleksibel untuk ke 3 skema
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 } // Limit 50MB (sesuaikan kebutuhan LMS)
});

// Endpoint
router.post('/upload', upload.single('file'), uploadMaterial);

export default router;
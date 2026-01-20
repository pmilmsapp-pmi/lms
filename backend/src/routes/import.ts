import { Router } from 'express';
import multer from 'multer';
import fs from 'fs';
import { importMembersFromCSV } from '../controllers/importController';
import { requireAuth, requireSuperAdmin } from '../middleware/auth';

const router = Router();

// Konfigurasi Multer (Simpan di folder uploads/temp)
const uploadDir = 'uploads/temp/';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({ 
    dest: uploadDir,
    limits: { fileSize: 5 * 1024 * 1024 } // Limit 5MB
});

// POST /api/import/members
// Menggunakan middleware auth & superadmin untuk keamanan
router.post('/members', requireAuth, requireSuperAdmin, upload.single('file'), importMembersFromCSV);

export default router;
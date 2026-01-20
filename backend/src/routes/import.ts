// import { Router } from 'express';
// import multer from 'multer';
// import fs from 'fs';
// import { importMembersFromCSV } from '../controllers/importController';
// import { requireAuth, requireSuperAdmin } from '../middleware/auth';

// const router = Router();

// // Konfigurasi Multer (Simpan di folder uploads/temp)
// const uploadDir = 'uploads/temp/';
// if (!fs.existsSync(uploadDir)){
//     fs.mkdirSync(uploadDir, { recursive: true });
// }

// const upload = multer({ 
//     dest: uploadDir,
//     limits: { fileSize: 5 * 1024 * 1024 } // Limit 5MB
// });

// // POST /api/import/members
// // Menggunakan middleware auth & superadmin untuk keamanan
// router.post('/members', requireAuth, requireSuperAdmin, upload.single('file'), importMembersFromCSV);

// export default router;


import { Router } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import os from 'os'; // [PENTING] Import OS untuk akses folder temp sistem
import { importMembersFromCSV } from '../controllers/importController';
import { requireAuth, requireSuperAdmin } from '../middleware/auth';

const router = Router();

// =========================================================================
// [FIX VERCEL] Gunakan os.tmpdir() karena Vercel Read-Only
// =========================================================================
// Di Vercel, kita hanya boleh tulis file di folder /tmp
const tempDir = os.tmpdir(); 
const uploadPath = path.join(tempDir, 'humanis-uploads'); // Buat subfolder di dalam /tmp

// Buat folder temp jika belum ada (aman dilakukan di /tmp)
if (!fs.existsSync(uploadPath)){
    try {
        fs.mkdirSync(uploadPath, { recursive: true });
    } catch (err) {
        console.error("Gagal buat folder temp:", err);
    }
}

const upload = multer({ 
    dest: uploadPath, // Simpan file CSV di /tmp/humanis-uploads (bukan di root project)
    limits: { fileSize: 10 * 1024 * 1024 } // Limit 10MB
});

// POST /api/import/members
// Wajib Login & Super Admin
router.post('/members', requireAuth, requireSuperAdmin, upload.single('file'), importMembersFromCSV);

export default router;
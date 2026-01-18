import { Router } from 'express';
import { requireAuth, requireSuperAdmin } from '../middleware/auth';

// Controller Backup (Arsip ZIP)
import { 
    triggerBackup, 
    getBackupHistory 
} from '../controllers/backupController';

// Controller Sync (Dual Database: Supabase & Postgres Pribadi)
import { 
    triggerSupabaseSync, 
    triggerPostgresSync, 
    getSyncHistory 
} from '../controllers/syncController';

const router = Router();

/**
 * SYSTEM ADMINISTRATION ROUTES
 * Akses khusus Super Admin untuk maintenance database
 */

// 1. REPLIKASI / SINKRONISASI DATA
// Sinkronisasi ke Cloud Supabase (PostgreSQL)
router.post('/sync/supabase', requireAuth, requireSuperAdmin, triggerSupabaseSync);

// Sinkronisasi ke Server PostgreSQL Pribadi (Self-Hosted)
router.post('/sync/postgres', requireAuth, requireSuperAdmin, triggerPostgresSync);

// Ambil Riwayat Sinkronisasi (Log)
router.get('/sync/history', requireAuth, requireSuperAdmin, getSyncHistory);


// 2. BACKUP ARSIP (.ZIP)
// Membuat file ZIP dari MongoDB dan upload ke Supabase Storage
router.post('/backup/trigger', requireAuth, requireSuperAdmin, triggerBackup);

// Ambil Riwayat & Link Download File ZIP
router.get('/backup/history', requireAuth, requireSuperAdmin, getBackupHistory);

export default router;
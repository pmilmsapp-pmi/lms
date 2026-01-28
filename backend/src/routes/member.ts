import { Router } from 'express';
import { checkMemberStatus } from '../controllers/memberController';
// import { requireAuth } from '../middleware/auth'; // Uncomment jika endpoint ini butuh login

const router = Router();

// Endpoint cek status (Public atau Protected terserah Anda)
// POST /api/member/check -> Body: { "nia": "12345" }
router.post('/check', checkMemberStatus);

export default router;
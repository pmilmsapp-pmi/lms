
// backend/src/routes/dev.ts
import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';

const router = Router();

router.post('/create-admin', async (_req, res) => {
  const hash = await bcrypt.hash('password123', 10);
  const user = await User.findOneAndUpdate(
    { email: 'admin@example.com' },
    { email: 'admin@example.com', passwordHash: hash, role: 'SUPER_ADMIN', name: 'Super Admin' },
    { upsert: true, new: true }
  );
  res.json({ ok: true, user: { email: user.email, role: user.role } });
});

export default router;

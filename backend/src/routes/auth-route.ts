import express from 'express';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';
import { requireAuth } from '../middleware/auth'; // Pastikan path ini sesuai

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret_kanvas_pmi_2025';

// --- 1. LOGIN ---
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Cari user + password
    const user: any = await User.findOne({ email }).select('+password');
    if (!user) return res.status(401).json({ error: 'Email atau password salah' });

    // Cek password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ error: 'Email atau password salah' });

    // Buat Token
    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      JWT_SECRET, 
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatarUrl: user.avatarUrl
      }
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// --- 2. ENDPOINT /me (INI YANG HILANG) ---
// Frontend memanggil ini via /api/auth/me untuk cek status login
router.get('/me', requireAuth, async (req: any, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatarUrl: user.avatarUrl
    });
  } catch (error: any) {
    res.status(500).json({ error: "Gagal memverifikasi sesi" });
  }
});

export default router;

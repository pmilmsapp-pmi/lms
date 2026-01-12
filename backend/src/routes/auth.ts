
// // // // // // // // // // import { Router } from 'express';
// // // // // // // // // // import { z } from 'zod';
// // // // // // // // // // import bcrypt from 'bcryptjs';
// // // // // // // // // // import User from '../models/User';
// // // // // // // // // // import { signAccessToken, signRefreshToken } from '../middleware/auth';

// // // // // // // // // // const router = Router();

// // // // // // // // // // const loginSchema = z.object({ email: z.string().email(), password: z.string().min(6) });

// // // // // // // // // // router.post('/login', async (req, res) => {
// // // // // // // // // //   try {
// // // // // // // // // //     const { email, password } = loginSchema.parse(req.body);
// // // // // // // // // //     const user = await User.findOne({ email });
// // // // // // // // // //     if (!user) return res.status(400).json({ error: 'Invalid email or password' });
// // // // // // // // // //     const ok = await bcrypt.compare(password, user.passwordHash);
// // // // // // // // // //     if (!ok) return res.status(400).json({ error: 'Invalid email or password' });
// // // // // // // // // //     const accessToken = signAccessToken({ id: user.id, email: user.email, role: user.role as any });
// // // // // // // // // //     const refreshToken = signRefreshToken({ id: user.id });
// // // // // // // // // //     return res.json({ accessToken, refreshToken });
// // // // // // // // // //   } catch (err: any) {
// // // // // // // // // //     return res.status(400).json({ error: 'Validation error', issues: err.issues });
// // // // // // // // // //   }
// // // // // // // // // // });

// // // // // // // // // // const refreshSchema = z.object({ refreshToken: z.string() });
// // // // // // // // // // router.post('/refresh', async (req, res) => {
// // // // // // // // // //   try {
// // // // // // // // // //     const { refreshToken } = refreshSchema.parse(req.body);
// // // // // // // // // //     // Basic verification: decode and ensure payload contains id & t='refresh'
// // // // // // // // // //     const jwt = await import('jsonwebtoken');
// // // // // // // // // //     let payload: any;
// // // // // // // // // //     try {
// // // // // // // // // //       payload = jwt.verify(refreshToken, process.env.JWT_SECRET || 'supersecret');
// // // // // // // // // //     } catch {
// // // // // // // // // //       return res.status(401).json({ error: 'Invalid refresh token' });
// // // // // // // // // //     }
// // // // // // // // // //     if (!payload || payload.t !== 'refresh' || !payload.id) return res.status(401).json({ error: 'Invalid refresh token' });
// // // // // // // // // //     const user = await User.findById(payload.id);
// // // // // // // // // //     if (!user) return res.status(401).json({ error: 'Invalid refresh token' });
// // // // // // // // // //     const accessToken = signAccessToken({ id: user.id, email: user.email, role: user.role as any });
// // // // // // // // // //     return res.json({ accessToken });
// // // // // // // // // //   } catch (err: any) {
// // // // // // // // // //     return res.status(400).json({ error: 'Validation error', issues: err.issues });
// // // // // // // // // //   }
// // // // // // // // // // });

// // // // // // // // // // export default router;
// // // // // // // // // // backend/src/routes/auth.ts
// // // // // // // // // import express from 'express';
// // // // // // // // // import bcrypt from 'bcryptjs';
// // // // // // // // // import User from '../models/User';
// // // // // // // // // import { signAccessToken } from '../middleware/auth'; // Import fungsi yang baru kita buat

// // // // // // // // // const router = express.Router();

// // // // // // // // // router.post('/login', async (req, res) => {
// // // // // // // // //   try {
// // // // // // // // //     const { email, password } = req.body;

// // // // // // // // //     // 1. Cari user
// // // // // // // // //     const user = await User.findOne({ email });
// // // // // // // // //     if (!user) return res.status(401).json({ error: 'Email atau password salah' });

// // // // // // // // //     // 2. Cek password
// // // // // // // // //     const isMatch = await bcrypt.compare(password, user.passwordHash);
// // // // // // // // //     if (!isMatch) return res.status(401).json({ error: 'Email atau password salah' });

// // // // // // // // //     // 3. Buat Token menggunakan fungsi dari middleware
// // // // // // // // //     // Pastikan field-nya sesuai dengan JwtPayloadSchema (id, email, role)
// // // // // // // // //     const token = signAccessToken({
// // // // // // // // //       id: user._id.toString(),
// // // // // // // // //       email: user.email,
// // // // // // // // //       role: user.role as any
// // // // // // // // //     });

// // // // // // // // //     // 4. Kirim response
// // // // // // // // //     res.json({
// // // // // // // // //       token,
// // // // // // // // //       user: {
// // // // // // // // //         id: user._id,
// // // // // // // // //         name: user.name,
// // // // // // // // //         email: user.email,
// // // // // // // // //         role: user.role,
// // // // // // // // //         avatarUrl: user.avatarUrl
// // // // // // // // //       }
// // // // // // // // //     });
// // // // // // // // //   } catch (error: any) {
// // // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // // //   }
// // // // // // // // // });

// // // // // // // // // export default router;

// // // // // // // // import express from 'express';
// // // // // // // // import bcrypt from 'bcryptjs';
// // // // // // // // import User from '../models/User';
// // // // // // // // import { signAccessToken } from '../middleware/auth'; // Ambil fungsi sign dari middleware

// // // // // // // // const router = express.Router();

// // // // // // // // router.post('/login', async (req, res) => {
// // // // // // // //   try {
// // // // // // // //     const { email, password } = req.body;

// // // // // // // //     // 1. Cari user berdasarkan email
// // // // // // // //     const user = await User.findOne({ email });
// // // // // // // //     if (!user) {
// // // // // // // //       return res.status(401).json({ error: 'Email atau password salah' });
// // // // // // // //     }

// // // // // // // //     // 2. Bandingkan password
// // // // // // // //     const isMatch = await bcrypt.compare(password, user.passwordHash);
// // // // // // // //     if (!isMatch) {
// // // // // // // //       return res.status(401).json({ error: 'Email atau password salah' });
// // // // // // // //     }

// // // // // // // //     // 3. Buat Payload yang sesuai dengan Zod Schema di middleware
// // // // // // // //     const payload = {
// // // // // // // //       id: user._id.toString(), // Wajib String
// // // // // // // //       email: user.email,
// // // // // // // //       role: user.role as any // STUDENT | FACILITATOR | SUPER_ADMIN
// // // // // // // //     };

// // // // // // // //     // 4. Generate Token
// // // // // // // //     const token = signAccessToken(payload);

// // // // // // // //     console.log(`✅ User ${user.email} berhasil login.`);

// // // // // // // //     // 5. Kirim Response
// // // // // // // //     res.json({
// // // // // // // //       token,
// // // // // // // //       user: {
// // // // // // // //         id: user._id,
// // // // // // // //         name: user.name,
// // // // // // // //         email: user.email,
// // // // // // // //         role: user.role
// // // // // // // //       }
// // // // // // // //     });
// // // // // // // //   } catch (error: any) {
// // // // // // // //     console.error("Login Error:", error);
// // // // // // // //     res.status(500).json({ error: 'Terjadi kesalahan pada server' });
// // // // // // // //   }
// // // // // // // // });

// // // // // // // // // Endpoint untuk cek sesi (GET /api/auth/me)
// // // // // // // // router.get('/me', async (req: any, res) => {
// // // // // // // //     // req.user diisi oleh middleware requireAuth
// // // // // // // //     res.json({ user: req.user });
// // // // // // // // });

// // // // // // // // export default router;
// // // // // // // import express, { Response } from 'express';
// // // // // // // import bcrypt from 'bcryptjs';
// // // // // // // import User from '../models/User';
// // // // // // // import { signAccessToken, requireAuth, AuthedRequest } from '../middleware/auth';

// // // // // // // const router = express.Router();

// // // // // // // // --- POST: LOGIN ---
// // // // // // // router.post('/login', async (req: express.Request, res: Response) => {
// // // // // // //   try {
// // // // // // //     const { email, password } = req.body;

// // // // // // //     // 1. Cari user
// // // // // // //     const user = await User.findOne({ email });
// // // // // // //     if (!user) {
// // // // // // //       return res.status(401).json({ error: 'Email atau password salah' });
// // // // // // //     }

// // // // // // //     // 2. Verifikasi password
// // // // // // //     const isMatch = await bcrypt.compare(password, user.passwordHash);
// // // // // // //     if (!isMatch) {
// // // // // // //       return res.status(401).json({ error: 'Email atau password salah' });
// // // // // // //     }

// // // // // // //     // 3. Buat Payload & Token (Sinkron dengan Zod Schema di middleware)
// // // // // // //     const token = signAccessToken({
// // // // // // //       id: user._id.toString(),
// // // // // // //       email: user.email,
// // // // // // //       role: user.role as any
// // // // // // //     });

// // // // // // //     console.log(`✅ User ${user.email} berhasil login.`);

// // // // // // //     // 4. Kirim Response
// // // // // // //     res.json({
// // // // // // //       token,
// // // // // // //       user: {
// // // // // // //         id: user._id,
// // // // // // //         name: user.name,
// // // // // // //         email: user.email,
// // // // // // //         role: user.role,
// // // // // // //         avatarUrl: user.avatarUrl
// // // // // // //       }
// // // // // // //     });
// // // // // // //   } catch (error: any) {
// // // // // // //     console.error("Login Error:", error);
// // // // // // //     res.status(500).json({ error: 'Internal Server Error' });
// // // // // // //   }
// // // // // // // });

// // // // // // // // --- GET: PROFILE (ME) ---
// // // // // // // router.get('/me', requireAuth, async (req: AuthedRequest, res: Response) => {
// // // // // // //   try {
// // // // // // //     // req.user sudah diisi oleh middleware requireAuth
// // // // // // //     res.json({ user: req.user });
// // // // // // //   } catch (error: any) {
// // // // // // //     res.status(500).json({ error: error.message });
// // // // // // //   }
// // // // // // // });

// // // // // // // export default router;
// // // // // // import express, { Response } from 'express';
// // // // // // import bcrypt from 'bcryptjs';
// // // // // // import { User } from '../models/User';
// // // // // // import { signAccessToken, requireAuth, AuthedRequest } from '../middleware/auth';

// // // // // // const router = express.Router();

// // // // // // // --- POST: LOGIN ---
// // // // // // router.post('/login', async (req: express.Request, res: Response) => {
// // // // // //   try {
// // // // // //     const { email, password } = req.body;

// // // // // //     // 1. Cari user
// // // // // //     const user = await User.findOne({ email });
// // // // // //     if (!user) {
// // // // // //       return res.status(401).json({ error: 'Email atau password salah' });
// // // // // //     }

// // // // // //     // 2. Verifikasi password
// // // // // //     const isMatch = await bcrypt.compare(password, user.passwordHash);
// // // // // //     if (!isMatch) {
// // // // // //       return res.status(401).json({ error: 'Email atau password salah' });
// // // // // //     }

// // // // // //     // 3. Buat Payload & Token (Sinkron dengan Zod Schema di middleware)
// // // // // //     const token = signAccessToken({
// // // // // //       id: user._id.toString(),
// // // // // //       email: user.email,
// // // // // //       role: user.role as any
// // // // // //     });

// // // // // //     console.log(`✅ User ${user.email} berhasil login.`);

// // // // // //     // 4. Kirim Response
// // // // // //     res.json({
// // // // // //       token,
// // // // // //       user: {
// // // // // //         id: user._id,
// // // // // //         name: user.name,
// // // // // //         email: user.email,
// // // // // //         role: user.role,
// // // // // //         avatarUrl: user.avatarUrl
// // // // // //       }
// // // // // //     });
// // // // // //   } catch (error: any) {
// // // // // //     console.error("Login Error:", error);
// // // // // //     res.status(500).json({ error: 'Internal Server Error' });
// // // // // //   }
// // // // // // });

// // // // // // // --- GET: PROFILE (ME) ---
// // // // // // router.get('/me', requireAuth, async (req: AuthedRequest, res: Response) => {
// // // // // //   try {
// // // // // //     // req.user sudah diisi oleh middleware requireAuth
// // // // // //     res.json({ user: req.user });
// // // // // //   } catch (error: any) {
// // // // // //     res.status(500).json({ error: error.message });
// // // // // //   }
// // // // // // });

// // // // // // export default router;
// // // // // import express, { Response } from 'express';
// // // // // import bcrypt from 'bcryptjs';
// // // // // // PERBAIKAN PENTING: Gunakan { User } (Named Import)
// // // // // import { User } from '../models/User'; 
// // // // // import { signAccessToken, requireAuth, AuthedRequest } from '../middleware/auth';

// // // // // const router = express.Router();

// // // // // // --- LOGIN ---
// // // // // router.post('/login', async (req: express.Request, res: Response) => {
// // // // //   try {
// // // // //     const { email, password } = req.body;
    
// // // // //     // Cari user berdasarkan email
// // // // //     const user = await User.findOne({ email });
// // // // //     if (!user) {
// // // // //       return res.status(401).json({ error: 'Email atau password salah' });
// // // // //     }

// // // // //     // Cek password
// // // // //     const isMatch = await bcrypt.compare(password, user.passwordHash);
// // // // //     if (!isMatch) {
// // // // //       return res.status(401).json({ error: 'Email atau password salah' });
// // // // //     }

// // // // //     // Buat Token
// // // // //     const token = signAccessToken({
// // // // //       id: user._id.toString(),
// // // // //       email: user.email,
// // // // //       role: user.role
// // // // //     });

// // // // //     res.json({
// // // // //       token,
// // // // //       user: {
// // // // //         id: user._id,
// // // // //         name: user.name,
// // // // //         email: user.email,
// // // // //         role: user.role,
// // // // //         avatarUrl: user.avatarUrl
// // // // //       }
// // // // //     });
// // // // //   } catch (error: any) {
// // // // //     console.error("Login Error:", error);
// // // // //     res.status(500).json({ error: 'Internal Server Error' });
// // // // //   }
// // // // // });

// // // // // // --- GET ME ---
// // // // // router.get('/me', requireAuth, async (req: AuthedRequest, res: Response) => {
// // // // //   try {
// // // // //     res.json({ user: req.user });
// // // // //   } catch (error: any) {
// // // // //     res.status(500).json({ error: error.message });
// // // // //   }
// // // // // });

// // // // // export default router;
// // // // import express from 'express';
// // // // import { User } from '../models/User';
// // // // import jwt from 'jsonwebtoken';

// // // // const router = express.Router();

// // // // router.post('/login', async (req, res) => {
// // // //   try {
// // // //     const { email, password } = req.body;

// // // //     // 1. Cari User
// // // //     // PENTING: Gunakan 'any' sementara untuk fix TS error pada method comparePassword
// // // //     const user: any = await User.findOne({ email });
    
// // // //     if (!user) {
// // // //       return res.status(401).json({ error: 'Email atau password salah' });
// // // //     }

// // // //     // 2. Cek Password
// // // //     const isMatch = await user.comparePassword(password);
// // // //     if (!isMatch) {
// // // //       return res.status(401).json({ error: 'Email atau password salah' });
// // // //     }

// // // //     // 3. Generate Token
// // // //     const token = jwt.sign(
// // // //       { id: user._id, role: user.role },
// // // //       process.env.JWT_SECRET || 'pmi-secret', // Pastikan secret key konsisten
// // // //       { expiresIn: '1d' }
// // // //     );

// // // //     res.json({
// // // //       token,
// // // //       user: {
// // // //         id: user._id,
// // // //         name: user.name,
// // // //         email: user.email,
// // // //         role: user.role,
// // // //         avatarUrl: user.avatarUrl
// // // //       }
// // // //     });

// // // //   } catch (error: any) {
// // // //     res.status(500).json({ error: error.message });
// // // //   }
// // // // });

// // // // export default router;
// // // import express from 'express';
// // // import { User } from '../models/User';
// // // import jwt from 'jsonwebtoken';
// // // import bcrypt from 'bcryptjs'; // Pastikan import ini ada jika manual compare

// // // const router = express.Router();

// // // router.post('/login', async (req, res) => {
// // //   try {
// // //     const { email, password } = req.body;

// // //     // 1. Cari User
// // //     const user: any = await User.findOne({ email });
    
// // //     if (!user) {
// // //       return res.status(401).json({ error: 'Email atau password salah' });
// // //     }

// // //     // 2. Cek Password
// // //     const isMatch = await user.comparePassword(password);
// // //     if (!isMatch) {
// // //       return res.status(401).json({ error: 'Email atau password salah' });
// // //     }

// // //     // 3. Generate Token (PERBAIKAN DISINI)
// // //     const token = jwt.sign(
// // //       { 
// // //         id: user._id, 
// // //         role: user.role,
// // //         email: user.email // <--- WAJIB DITAMBAHKAN AGAR MIDDLEWARE TIDAK ERROR
// // //       },
// // //       process.env.JWT_SECRET || 'pmi-secret', 
// // //       { expiresIn: '1d' }
// // //     );

// // //     res.json({
// // //       token,
// // //       user: {
// // //         id: user._id,
// // //         name: user.name,
// // //         email: user.email,
// // //         role: user.role,
// // //         avatarUrl: user.avatarUrl
// // //       }
// // //     });

// // //   } catch (error: any) {
// // //     console.error("Login Error:", error);
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // });

// // // // Endpoint Register (Opsional, sesuaikan jika Anda punya)
// // // router.post('/register', async (req, res) => {
// // //     try {
// // //         const { name, email, password, role } = req.body;
// // //         const user = await User.create({ name, email, password, role });
        
// // //         // Generate token juga disini jika auto-login
// // //         const token = jwt.sign(
// // //             { id: user._id, role: user.role, email: user.email }, // Tambahkan email
// // //             process.env.JWT_SECRET || 'pmi-secret',
// // //             { expiresIn: '1d' }
// // //         );

// // //         res.status(201).json({ token, user });
// // //     } catch (e: any) {
// // //         res.status(400).json({ error: e.message });
// // //     }
// // // });

// // // export default router;
// // import express from 'express';
// // import { User } from '../models/User';
// // import jwt from 'jsonwebtoken';

// // const router = express.Router();

// // // KONFIGURASI SECRET (SINKRON DENGAN .ENV)
// // const JWT_SECRET = process.env.JWT_SECRET || 'supersecret_kanvas_pmi_2025';

// // router.post('/login', async (req, res) => {
// //   try {
// //     const { email, password } = req.body;

// //     // 1. Cari User
// //     const user: any = await User.findOne({ email });
    
// //     if (!user) {
// //       return res.status(401).json({ error: 'Email atau password salah' });
// //     }

// //     // 2. Cek Password
// //     const isMatch = await user.comparePassword(password);
// //     if (!isMatch) {
// //       return res.status(401).json({ error: 'Email atau password salah' });
// //     }

// //     // 3. Generate Token (Menggunakan Secret yang Benar & Payload Lengkap)
// //     const token = jwt.sign(
// //       { 
// //         id: user._id, 
// //         role: user.role,
// //         email: user.email // Penting!
// //       },
// //       JWT_SECRET, 
// //       { expiresIn: '1d' }
// //     );

// //     res.json({
// //       token,
// //       user: {
// //         id: user._id,
// //         name: user.name,
// //         email: user.email,
// //         role: user.role,
// //         avatarUrl: user.avatarUrl
// //       }
// //     });

// //   } catch (error: any) {
// //     console.error("Login Error:", error);
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // export default router;
// import express from 'express';
// import { User } from '../models/User';
// import jwt from 'jsonwebtoken';
// import { requireAuth } from '../middleware/auth'; // Pastikan path ini benar

// const router = express.Router();

// // KONFIGURASI SECRET
// const JWT_SECRET = process.env.JWT_SECRET || 'supersecret_kanvas_pmi_2025';

// // --- 1. LOGIN ROUTE ---
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // A. Cari User (+password karena select:false di model)
//     const user: any = await User.findOne({ email }).select('+password');
    
//     if (!user) {
//       return res.status(401).json({ error: 'Email atau password salah' });
//     }

//     // B. Cek Password
//     // Pastikan method comparePassword ada di model User, atau gunakan bcrypt.compare manual
//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) {
//       return res.status(401).json({ error: 'Email atau password salah' });
//     }

//     // C. Generate Token
//     const token = jwt.sign(
//       { 
//         id: user._id, 
//         role: user.role,
//         email: user.email 
//       },
//       JWT_SECRET, 
//       { expiresIn: '1d' }
//     );

//     // D. Return Data
//     res.json({
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         avatarUrl: user.avatarUrl
//       }
//     });

//   } catch (error: any) {
//     console.error("Login Error:", error);
//     res.status(500).json({ error: error.message });
//   }
// });

// // --- 2. GET CURRENT USER (Endpoint /me) ---
// // INI YANG HILANG SEBELUMNYA
// router.get('/me', requireAuth, async (req: any, res) => {
//   try {
//     // req.user.id didapat dari middleware requireAuth decoding token
//     const user = await User.findById(req.user.id).select('-password');

//     if (!user) {
//       return res.status(404).json({ error: 'User tidak ditemukan' });
//     }

//     res.json({
//       id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       avatarUrl: user.avatarUrl
//     });
//   } catch (error: any) {
//     console.error("Me Error:", error);
//     res.status(500).json({ error: "Gagal memverifikasi sesi" });
//   }
// });

// export default router;
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
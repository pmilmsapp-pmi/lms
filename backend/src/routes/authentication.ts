// // import express from 'express';
// // import { User } from '../models/User';
// // import jwt from 'jsonwebtoken';
// // import { requireAuth } from '../middleware/auth'; // Pastikan path ini sesuai

// // const router = express.Router();
// // const JWT_SECRET = process.env.JWT_SECRET || 'supersecret_kanvas_pmi_2025';

// // // --- 1. LOGIN ---
// // router.post('/login', async (req, res) => {
// //   try {
// //     const { email, password } = req.body;
    
// //     // Cari user + password
// //     const user: any = await User.findOne({ email }).select('+password');
// //     if (!user) return res.status(401).json({ error: 'Email atau password salah' });

// //     // Cek password
// //     const isMatch = await user.comparePassword(password);
// //     if (!isMatch) return res.status(401).json({ error: 'Email atau password salah' });

// //     // Buat Token
// //     const token = jwt.sign(
// //       { id: user._id, role: user.role, email: user.email },
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
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // // --- 2. ENDPOINT /me (INI YANG HILANG) ---
// // // Frontend memanggil ini via /api/auth/me untuk cek status login
// // router.get('/me', requireAuth, async (req: any, res) => {
// //   try {
// //     const user = await User.findById(req.user.id).select('-password');
// //     if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });

// //     res.json({
// //       id: user._id,
// //       name: user.name,
// //       email: user.email,
// //       role: user.role,
// //       avatarUrl: user.avatarUrl
// //     });
// //   } catch (error: any) {
// //     res.status(500).json({ error: "Gagal memverifikasi sesi" });
// //   }
// // });

// // export default router;

// import express from 'express';
// import { User } from '../models/User';
// import jwt from 'jsonwebtoken';
// import { requireAuth } from '../middleware/auth'; 

// const router = express.Router();
// // Pastikan secret key ini SAMA PERSIS dengan yang ada di middleware/auth.ts
// const JWT_SECRET = process.env.JWT_SECRET || 'supersecret_kanvas_pmi_2025';

// // --- 1. LOGIN ---
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
    
//     // Gunakan .lean() agar data mentah (termasuk permissions) terbawa
//     const user: any = await User.findOne({ email }).select('+password').lean();
    
//     if (!user) return res.status(401).json({ error: 'Email atau password salah' });

//     // Karena user adalah object plain (lean), kita cek password manual atau query ulang
//     // Untuk simplifikasi dan keamanan type, kita query instance khusus password
//     const userInstance = await User.findOne({ email }).select('+password');
//     if (!userInstance) return res.status(401).json({ error: 'User tidak valid' });

//     const isMatch = await userInstance.comparePassword(password);
//     if (!isMatch) return res.status(401).json({ error: 'Email atau password salah' });

//     // Buat Token
//     const token = jwt.sign(
//       { id: user._id, role: user.role, email: user.email },
//       JWT_SECRET, 
//       { expiresIn: '7d' }
//     );

//     console.log("LOGIN SUCCESS (Route):", user.email);
//     console.log("PERMISSIONS:", user.permissions);

//     res.json({
//       success: true,
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         avatarUrl: user.avatarUrl,
//         // Pastikan array permission terkirim
//         permissions: user.permissions || [],
//         regionScope: user.regionScope
//       }
//     });
//   } catch (error: any) {
//     console.error("Login Error:", error);
//     res.status(500).json({ error: error.message });
//   }
// });

// // --- 2. REGISTER (Opsional, jika diperlukan) ---
// router.post('/register', async (req, res) => {
//     try {
//         const { name, email, password, role } = req.body;
//         const existing = await User.findOne({ email });
//         if (existing) return res.status(400).json({ error: 'Email sudah dipakai.' });
        
//         const newUser = new User({ 
//             name, 
//             email, 
//             password, 
//             role: role || 'STUDENT', 
//             permissions: [], 
//             isBanned: false,
//             isVerified: false 
//         });
        
//         await newUser.save();
//         const token = jwt.sign({ id: newUser._id, email, role: newUser.role }, JWT_SECRET, { expiresIn: '7d' });
        
//         res.status(201).json({ success: true, token, user: newUser });
//     } catch (error: any) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // --- 3. ENDPOINT /me (SELF HEALING) ---
// // Frontend akan memanggil ini setiap kali refresh halaman
// router.get('/me', requireAuth, async (req: any, res) => {
//   try {
//     // Gunakan .lean() lagi untuk memastikan permissions terbaca
//     const user: any = await User.findById(req.user.id).select('-password').lean();
    
//     if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });

//     console.log("FETCH /me:", user.name, "| Permissions:", user.permissions);

//     res.json({
//       success: true, // Format response disamakan dengan login
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         avatarUrl: user.avatarUrl,
//         permissions: user.permissions || [],
//         regionScope: user.regionScope
//       }
//     });
//   } catch (error: any) {
//     console.error("Fetch Me Error:", error);
//     res.status(500).json({ error: "Gagal memverifikasi sesi" });
//   }
// });

// export default router;



import express from 'express';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';
import { requireAuth } from '../middleware/auth'; 

const router = express.Router();
// Pastikan secret key ini SAMA PERSIS dengan yang ada di middleware/auth.ts
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret_kanvas_pmi_2025';

// --- 1. LOGIN ---
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log("Login Attempt:", email);

    // Gunakan .lean() agar data mentah (termasuk permissions) terbawa
    const user: any = await User.findOne({ email }).select('+password').lean();
    
    if (!user) return res.status(401).json({ error: 'Email atau password salah' });

    // Karena user adalah object plain (lean), kita cek password manual atau query ulang
    // Untuk simplifikasi dan keamanan type, kita query instance khusus password
    const userInstance = await User.findOne({ email }).select('+password');
    if (!userInstance) return res.status(401).json({ error: 'User tidak valid' });

    const isMatch = await userInstance.comparePassword(password);
    if (!isMatch) return res.status(401).json({ error: 'Email atau password salah' });

    // Cek apakah user dibanned
    if (user.isBanned) {
      return res.status(403).json({ error: 'Akun ini telah dibekukan.' });
    }

    // Buat Token
    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      JWT_SECRET, 
      { expiresIn: '7d' }
    );

    console.log("LOGIN SUCCESS (Route):", user.email);
    console.log("PERMISSIONS:", user.permissions);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        _id: user._id, // Support dua format ID untuk frontend
        name: user.name,
        email: user.email,
        role: user.role,
        avatarUrl: user.avatarUrl,
        // Pastikan array permission terkirim
        permissions: user.permissions || [],
        regionScope: user.regionScope,
        // Lengkapi data wilayah untuk Admin/SuperAdmin
        managedProvinces: user.managedProvinces || [],
        managedRegencies: user.managedRegencies || []
      }
    });
  } catch (error: any) {
    console.error("Login Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// --- 2. REGISTER ---
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ error: 'Email sudah dipakai.' });
        
        const newUser = new User({ 
            name, 
            email, 
            password, 
            role: role || 'STUDENT', 
            permissions: [], 
            isBanned: false,
            isVerified: false,
            regionScope: 'national' // Default scope
        });
        
        await newUser.save();
        const token = jwt.sign({ id: newUser._id, email, role: newUser.role }, JWT_SECRET, { expiresIn: '7d' });
        
        res.status(201).json({ 
            success: true, 
            token, 
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            } 
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// --- 3. ENDPOINT /me (SELF HEALING) ---
// Frontend akan memanggil ini setiap kali refresh halaman melalui AuthProvider.tsx
router.get('/me', requireAuth, async (req: any, res) => {
  try {
    // Gunakan .lean() lagi untuk memastikan permissions terbaca
    const user: any = await User.findById(req.user.id).select('-password').lean();
    
    if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });

    console.log("FETCH /me:", user.name, "| Permissions:", user.permissions);

    res.json({
      success: true, // Sesuai dengan pengecekan 'if (res && res.success)' atau 'if (res && res.user)' di frontend
      user: {
        id: user._id,
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatarUrl: user.avatarUrl,
        permissions: user.permissions || [],
        regionScope: user.regionScope,
        // Penting untuk dashboard agar tidak 'mental' saat cek akses wilayah
        managedProvinces: user.managedProvinces || [],
        managedRegencies: user.managedRegencies || []
      }
    });
  } catch (error: any) {
    console.error("Fetch Me Error:", error);
    res.status(500).json({ error: "Gagal memverifikasi sesi" });
  }
});

export default router;
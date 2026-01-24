
// // // // // // // // // // import { Request, Response, NextFunction } from 'express';
// // // // // // // // // // import jwt from 'jsonwebtoken';
// // // // // // // // // // import { z } from 'zod';
// // // // // // // // // // import { User } from '../models/User';

// // // // // // // // // // // 1. Definisikan Secret di satu tempat (Single Source of Truth)
// // // // // // // // // // const JWT_SECRET = process.env.JWT_SECRET || 'supersecret_kanvas_pmi_2025';

// // // // // // // // // // // 2. Skema Zod untuk validasi isi Token
// // // // // // // // // // // .passthrough() penting agar Zod tidak menolak field 'iat' dan 'exp' bawaan JWT
// // // // // // // // // // const JwtPayloadSchema = z.object({
// // // // // // // // // //   id: z.string(),
// // // // // // // // // //   email: z.string().email(),
// // // // // // // // // //   role: z.enum(['STUDENT', 'FACILITATOR', 'SUPER_ADMIN'])
// // // // // // // // // // }).passthrough();

// // // // // // // // // // export type Role = 'STUDENT' | 'FACILITATOR' | 'SUPER_ADMIN';

// // // // // // // // // // export interface AuthedRequest extends Request {
// // // // // // // // // //   user?: { id: string; email: string; role: Role; name?: string; avatarUrl?: string };
// // // // // // // // // // }

// // // // // // // // // // // 3. Helper Functions
// // // // // // // // // // export const signAccessToken = (user: { id: string; email: string; role: Role }) => {
// // // // // // // // // //   return jwt.sign(user, JWT_SECRET, { expiresIn: '1d' });
// // // // // // // // // // };

// // // // // // // // // // export const verifyToken = (token: string) => {
// // // // // // // // // //   try {
// // // // // // // // // //     const decoded = jwt.verify(token, JWT_SECRET);
// // // // // // // // // //     // Validasi struktur data menggunakan Zod
// // // // // // // // // //     return JwtPayloadSchema.parse(decoded);
// // // // // // // // // //   } catch (error: any) {
// // // // // // // // // //     // Log ini akan muncul di terminal backend untuk debugging
// // // // // // // // // //     console.error("❌ JWT/Zod Error Details:", error.message);
// // // // // // // // // //     throw error;
// // // // // // // // // //   }
// // // // // // // // // // };

// // // // // // // // // // // 4. Middleware Utama: requireAuth
// // // // // // // // // // export const requireAuth = async (req: AuthedRequest, res: Response, next: NextFunction) => {
// // // // // // // // // //   try {
// // // // // // // // // //     const authHeader = req.headers['authorization'];
// // // // // // // // // //     let token: string | undefined;

// // // // // // // // // //     if (authHeader && authHeader.startsWith('Bearer ')) {
// // // // // // // // // //       token = authHeader.slice(7);
// // // // // // // // // //     }

// // // // // // // // // //     if (!token) {
// // // // // // // // // //       return res.status(401).json({ error: 'Unauthorized', message: 'Token tidak ditemukan' });
// // // // // // // // // //     }

// // // // // // // // // //     const payload = verifyToken(token);
// // // // // // // // // //     const user = await User.findById(payload.id);

// // // // // // // // // //     if (!user) {
// // // // // // // // // //       return res.status(401).json({ error: 'Unauthorized', message: 'User tidak ditemukan' });
// // // // // // // // // //     }

// // // // // // // // // //     // Set data user ke request object
// // // // // // // // // //     req.user = { 
// // // // // // // // // //       id: user._id.toString(), 
// // // // // // // // // //       email: user.email, 
// // // // // // // // // //       role: user.role as Role, 
// // // // // // // // // //       name: user.name, 
// // // // // // // // // //       avatarUrl: user.avatarUrl 
// // // // // // // // // //     };

// // // // // // // // // //     next();
// // // // // // // // // //   } catch (e: any) {
// // // // // // // // // //     console.error("Auth Middleware Error:", e.message);
// // // // // // // // // //     return res.status(401).json({ error: 'Unauthorized', message: 'Token tidak valid atau expired' });
// // // // // // // // // //   }
// // // // // // // // // // };

// // // // // // // // // // // 5. Middleware Role-Based Access Control
// // // // // // // // // // export const requireRole = (roles: Role[]) => {
// // // // // // // // // //   return (req: AuthedRequest, res: Response, next: NextFunction) => {
// // // // // // // // // //     if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
// // // // // // // // // //     if (!roles.includes(req.user.role)) {
// // // // // // // // // //       return res.status(403).json({ error: 'Forbidden', message: 'Akses ditolak untuk peran Anda' });
// // // // // // // // // //     }
// // // // // // // // // //     next();
// // // // // // // // // //   };
// // // // // // // // // // };

// // // // // // // // // // export const requireFacilitator = requireRole(['FACILITATOR', 'SUPER_ADMIN']);
// // // // // // // // // // export const requireSuperAdmin = requireRole(['SUPER_ADMIN']);
// // // // // // // // // import { Request, Response, NextFunction } from 'express';
// // // // // // // // // import jwt from 'jsonwebtoken';
// // // // // // // // // import { z } from 'zod';
// // // // // // // // // import { User } from '../models/User';

// // // // // // // // // // 1. KONFIGURASI SECRET
// // // // // // // // // // PENTING: String fallback ini HARUS SAMA PERSIS dengan yang ada di routes/auth.ts
// // // // // // // // // // Jika di auth.ts pakai 'pmi-secret', di sini juga harus 'pmi-secret'.
// // // // // // // // // const JWT_SECRET = process.env.JWT_SECRET || 'pmi-secret'; 

// // // // // // // // // // 2. SKEMA VALIDASI TOKEN (ZOD)
// // // // // // // // // // Kita wajibkan 'email' ada untuk mencegah error di frontend/backend selanjutnya.
// // // // // // // // // // .passthrough() mengizinkan field tambahan JWT seperti 'iat' dan 'exp' lewat.
// // // // // // // // // const JwtPayloadSchema = z.object({
// // // // // // // // //   id: z.string(),
// // // // // // // // //   email: z.string().email(),
// // // // // // // // //   role: z.enum(['STUDENT', 'FACILITATOR', 'SUPER_ADMIN'])
// // // // // // // // // }).passthrough();

// // // // // // // // // // 3. DEFINISI TIPE DATA
// // // // // // // // // export type Role = 'STUDENT' | 'FACILITATOR' | 'SUPER_ADMIN';

// // // // // // // // // // Extend Request Express agar property .user dikenali TypeScript
// // // // // // // // // export interface AuthedRequest extends Request {
// // // // // // // // //   user?: {
// // // // // // // // //     id: string;
// // // // // // // // //     email: string;
// // // // // // // // //     role: Role;
// // // // // // // // //     name?: string;
// // // // // // // // //     avatarUrl?: string;
// // // // // // // // //   };
// // // // // // // // // }

// // // // // // // // // // 4. HELPER FUNCTIONS

// // // // // // // // // // Membuat Token (Digunakan saat Login/Register)
// // // // // // // // // export const signAccessToken = (user: { id: string; email: string; role: Role }) => {
// // // // // // // // //   return jwt.sign(user, JWT_SECRET, { expiresIn: '1d' });
// // // // // // // // // };

// // // // // // // // // // Verifikasi & Validasi Token
// // // // // // // // // export const verifyToken = (token: string) => {
// // // // // // // // //   try {
// // // // // // // // //     const decoded = jwt.verify(token, JWT_SECRET);
// // // // // // // // //     // Validasi struktur data menggunakan Zod
// // // // // // // // //     // Jika token lama (tanpa email) masuk, ini akan throw error (ZodError)
// // // // // // // // //     // yang memaksa user login ulang.
// // // // // // // // //     return JwtPayloadSchema.parse(decoded);
// // // // // // // // //   } catch (error: any) {
// // // // // // // // //     // Log error detail hanya di terminal backend untuk debugging
// // // // // // // // //     if (error instanceof z.ZodError) {
// // // // // // // // //       console.error("❌ JWT Structure Error (Zod):", error.issues);
// // // // // // // // //     } else {
// // // // // // // // //       console.error("❌ JWT Verify Error:", error.message);
// // // // // // // // //     }
// // // // // // // // //     throw error;
// // // // // // // // //   }
// // // // // // // // // };

// // // // // // // // // // 5. MIDDLEWARE UTAMA: requireAuth
// // // // // // // // // export const requireAuth = async (req: AuthedRequest, res: Response, next: NextFunction) => {
// // // // // // // // //   try {
// // // // // // // // //     const authHeader = req.headers['authorization'];
// // // // // // // // //     let token: string | undefined;

// // // // // // // // //     // Ambil token dari header "Authorization: Bearer <token>"
// // // // // // // // //     if (authHeader && authHeader.startsWith('Bearer ')) {
// // // // // // // // //       token = authHeader.slice(7);
// // // // // // // // //     }

// // // // // // // // //     if (!token) {
// // // // // // // // //       return res.status(401).json({ error: 'Unauthorized', message: 'Token tidak ditemukan' });
// // // // // // // // //     }

// // // // // // // // //     // A. Verifikasi Token (CPU heavy)
// // // // // // // // //     const payload = verifyToken(token);

// // // // // // // // //     // B. Verifikasi User di Database (IO heavy)
// // // // // // // // //     // Ini penting untuk memastikan user belum dihapus dari database
// // // // // // // // //     // dan untuk mendapatkan data terbaru (nama/avatar).
// // // // // // // // //     const user = await User.findById(payload.id);

// // // // // // // // //     if (!user) {
// // // // // // // // //       return res.status(401).json({ error: 'Unauthorized', message: 'User tidak ditemukan di database' });
// // // // // // // // //     }

// // // // // // // // //     // C. Attach User ke Request
// // // // // // // // //     req.user = { 
// // // // // // // // //       id: user._id.toString(), 
// // // // // // // // //       email: user.email, 
// // // // // // // // //       role: user.role as Role, 
// // // // // // // // //       name: user.name, 
// // // // // // // // //       avatarUrl: user.avatarUrl 
// // // // // // // // //     };

// // // // // // // // //     next();
// // // // // // // // //   } catch (e: any) {
// // // // // // // // //     // Jika token expired atau format salah
// // // // // // // // //     console.error("Auth Middleware Error:", e.message);
// // // // // // // // //     return res.status(401).json({ error: 'Unauthorized', message: 'Sesi berakhir, silakan login kembali.' });
// // // // // // // // //   }
// // // // // // // // // };

// // // // // // // // // // 6. MIDDLEWARE ROLE-BASED ACCESS CONTROL (RBAC)
// // // // // // // // // export const requireRole = (roles: Role[]) => {
// // // // // // // // //   return (req: AuthedRequest, res: Response, next: NextFunction) => {
// // // // // // // // //     if (!req.user) {
// // // // // // // // //         return res.status(401).json({ error: 'Unauthorized', message: 'User belum login' });
// // // // // // // // //     }
    
// // // // // // // // //     if (!roles.includes(req.user.role)) {
// // // // // // // // //       return res.status(403).json({ 
// // // // // // // // //           error: 'Forbidden', 
// // // // // // // // //           message: `Akses ditolak. Halaman ini khusus untuk: ${roles.join(', ')}` 
// // // // // // // // //       });
// // // // // // // // //     }
    
// // // // // // // // //     next();
// // // // // // // // //   };
// // // // // // // // // };

// // // // // // // // // // Shortcut Middleware
// // // // // // // // // export const requireFacilitator = requireRole(['FACILITATOR', 'SUPER_ADMIN']);
// // // // // // // // // export const requireSuperAdmin = requireRole(['SUPER_ADMIN']);
// // // // // // // import { Request, Response, NextFunction } from 'express';
// // // // // // // import jwt from 'jsonwebtoken';
// // // // // // // import { z } from 'zod';
// // // // // // // import { User } from '../models/User';

// // // // // // // // 1. KONFIGURASI SECRET (SINKRON DENGAN .ENV)
// // // // // // // const JWT_SECRET = process.env.JWT_SECRET || 'supersecret_kanvas_pmi_2025';

// // // // // // // // 2. SKEMA VALIDASI TOKEN
// // // // // // // const JwtPayloadSchema = z.object({
// // // // // // //   id: z.string(),
// // // // // // //   email: z.string().email(),
// // // // // // //   role: z.enum(['STUDENT', 'FACILITATOR', 'SUPER_ADMIN'])
// // // // // // // }).passthrough();

// // // // // // // export type Role = 'STUDENT' | 'FACILITATOR' | 'SUPER_ADMIN';

// // // // // // // export interface AuthedRequest extends Request {
// // // // // // //   user?: {
// // // // // // //     id: string;
// // // // // // //     email: string;
// // // // // // //     role: Role;
// // // // // // //     name?: string;
// // // // // // //     avatarUrl?: string;
// // // // // // //   };
// // // // // // // }

// // // // // // // // 3. HELPER FUNCTIONS
// // // // // // // export const signAccessToken = (user: { id: string; email: string; role: Role }) => {
// // // // // // //   return jwt.sign(user, JWT_SECRET, { expiresIn: '1d' });
// // // // // // // };

// // // // // // // export const verifyToken = (token: string) => {
// // // // // // //   try {
// // // // // // //     const decoded = jwt.verify(token, JWT_SECRET);
// // // // // // //     return JwtPayloadSchema.parse(decoded);
// // // // // // //   } catch (error: any) {
// // // // // // //     if (error instanceof z.ZodError) {
// // // // // // //       console.error("❌ JWT Structure Error (Zod):", error.issues);
// // // // // // //     } else {
// // // // // // //       console.error("❌ JWT Verify Error:", error.message);
// // // // // // //     }
// // // // // // //     throw error;
// // // // // // //   }
// // // // // // // };

// // // // // // // // 4. MIDDLEWARE UTAMA: requireAuth
// // // // // // // export const requireAuth = async (req: AuthedRequest, res: Response, next: NextFunction) => {
// // // // // // //   try {
// // // // // // //     const authHeader = req.headers['authorization'];
// // // // // // //     let token: string | undefined;

// // // // // // //     if (authHeader && authHeader.startsWith('Bearer ')) {
// // // // // // //       token = authHeader.slice(7);
// // // // // // //     }

// // // // // // //     if (!token) {
// // // // // // //       return res.status(401).json({ error: 'Unauthorized', message: 'Token tidak ditemukan' });
// // // // // // //     }

// // // // // // //     const payload = verifyToken(token);
// // // // // // //     const user = await User.findById(payload.id);

// // // // // // //     if (!user) {
// // // // // // //       return res.status(401).json({ error: 'Unauthorized', message: 'User tidak ditemukan' });
// // // // // // //     }

// // // // // // //     req.user = { 
// // // // // // //       id: user._id.toString(), 
// // // // // // //       email: user.email, 
// // // // // // //       role: user.role as Role, 
// // // // // // //       name: user.name, 
// // // // // // //       avatarUrl: user.avatarUrl 
// // // // // // //     };

// // // // // // //     next();
// // // // // // //   } catch (e: any) {
// // // // // // //     console.error("Auth Middleware Error:", e.message);
// // // // // // //     return res.status(401).json({ error: 'Unauthorized', message: 'Sesi berakhir, silakan login kembali.' });
// // // // // // //   }
// // // // // // // };

// // // // // // // // 5. RBAC
// // // // // // // export const requireRole = (roles: Role[]) => {
// // // // // // //   return (req: AuthedRequest, res: Response, next: NextFunction) => {
// // // // // // //     if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
// // // // // // //     if (!roles.includes(req.user.role)) {
// // // // // // //       return res.status(403).json({ error: 'Forbidden', message: 'Akses ditolak.' });
// // // // // // //     }
// // // // // // //     next();
// // // // // // //   };
// // // // // // // };

// // // // // // // export const requireFacilitator = requireRole(['FACILITATOR', 'SUPER_ADMIN']);
// // // // // // // export const requireSuperAdmin = requireRole(['SUPER_ADMIN']);

// // // // // // import { Request, Response, NextFunction } from 'express';
// // // // // // import jwt from 'jsonwebtoken';
// // // // // // import { z } from 'zod';
// // // // // // import { User } from '../models/User';

// // // // // // // 1. KONFIGURASI SECRET (SINKRON DENGAN .ENV)
// // // // // // const JWT_SECRET = process.env.JWT_SECRET || 'supersecret_kanvas_pmi_2025';

// // // // // // // 2. SKEMA VALIDASI TOKEN
// // // // // // // [UPDATED] Tambahkan 'ADMIN' ke enum Zod
// // // // // // const JwtPayloadSchema = z.object({
// // // // // //   id: z.string(),
// // // // // //   email: z.string().email(),
// // // // // //   role: z.enum(['STUDENT', 'FACILITATOR', 'ADMIN', 'SUPER_ADMIN'])
// // // // // // }).passthrough();

// // // // // // // [UPDATED] Tambahkan 'ADMIN' ke type Role
// // // // // // export type Role = 'STUDENT' | 'FACILITATOR' | 'ADMIN' | 'SUPER_ADMIN';

// // // // // // export interface AuthedRequest extends Request {
// // // // // //   user?: {
// // // // // //     id: string;
// // // // // //     email: string;
// // // // // //     role: Role;
// // // // // //     name?: string;
// // // // // //     avatarUrl?: string;
// // // // // //     permissions?: string[]; // [BARU] Simpan permissions di request user
// // // // // //     regionScope?: string;   // [BARU]
// // // // // //     managedProvinces?: string[]; // [BARU]
// // // // // //     managedRegencies?: string[]; // [BARU]
// // // // // //   };
// // // // // // }

// // // // // // // 3. HELPER FUNCTIONS
// // // // // // export const signAccessToken = (user: { id: string; email: string; role: Role }) => {
// // // // // //   return jwt.sign(user, JWT_SECRET, { expiresIn: '1d' });
// // // // // // };

// // // // // // export const verifyToken = (token: string) => {
// // // // // //   try {
// // // // // //     const decoded = jwt.verify(token, JWT_SECRET);
// // // // // //     return JwtPayloadSchema.parse(decoded);
// // // // // //   } catch (error: any) {
// // // // // //     if (error instanceof z.ZodError) {
// // // // // //       console.error("❌ JWT Structure Error (Zod):", error.issues);
// // // // // //     } else {
// // // // // //       console.error("❌ JWT Verify Error:", error.message);
// // // // // //     }
// // // // // //     throw error;
// // // // // //   }
// // // // // // };

// // // // // // // 4. MIDDLEWARE UTAMA: requireAuth
// // // // // // export const requireAuth = async (req: AuthedRequest, res: Response, next: NextFunction) => {
// // // // // //   try {
// // // // // //     const authHeader = req.headers['authorization'];
// // // // // //     let token: string | undefined;

// // // // // //     if (authHeader && authHeader.startsWith('Bearer ')) {
// // // // // //       token = authHeader.slice(7);
// // // // // //     }

// // // // // //     if (!token) {
// // // // // //       return res.status(401).json({ error: 'Unauthorized', message: 'Token tidak ditemukan' });
// // // // // //     }

// // // // // //     const payload = verifyToken(token);
// // // // // //     const user = await User.findById(payload.id);

// // // // // //     if (!user) {
// // // // // //       return res.status(401).json({ error: 'Unauthorized', message: 'User tidak ditemukan' });
// // // // // //     }

// // // // // //     // [BARU] Cek Status Banned
// // // // // //     if (user.isBanned) {
// // // // // //         return res.status(403).json({ 
// // // // // //             error: 'Forbidden', 
// // // // // //             message: `Akun Anda dibekukan. Alasan: ${user.bannedReason || 'Pelanggaran kebijakan'}. Silakan hubungi Admin.` 
// // // // // //         });
// // // // // //     }

// // // // // //     req.user = { 
// // // // // //       id: user._id.toString(), 
// // // // // //       email: user.email, 
// // // // // //       role: user.role as Role, 
// // // // // //       name: user.name, 
// // // // // //       avatarUrl: user.avatarUrl,
// // // // // //       // [BARU] Load permissions & region data
// // // // // //       permissions: user.permissions || [],
// // // // // //       regionScope: user.regionScope,
// // // // // //       managedProvinces: user.managedProvinces,
// // // // // //       managedRegencies: user.managedRegencies
// // // // // //     };

// // // // // //     next();
// // // // // //   } catch (e: any) {
// // // // // //     console.error("Auth Middleware Error:", e.message);
// // // // // //     return res.status(401).json({ error: 'Unauthorized', message: 'Sesi berakhir, silakan login kembali.' });
// // // // // //   }
// // // // // // };

// // // // // // // 5. RBAC (Role Based Access Control)
// // // // // // export const requireRole = (roles: Role[]) => {
// // // // // //   return (req: AuthedRequest, res: Response, next: NextFunction) => {
// // // // // //     if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
// // // // // //     if (!roles.includes(req.user.role)) {
// // // // // //       return res.status(403).json({ error: 'Forbidden', message: 'Akses ditolak.' });
// // // // // //     }
// // // // // //     next();
// // // // // //   };
// // // // // // };

// // // // // // // [BARU] Middleware Cek Permission Spesifik (Checkbox)
// // // // // // // Digunakan bersamaan dengan requireAuth
// // // // // // export const requirePermission = (requiredPerm: string) => {
// // // // // //     return (req: AuthedRequest, res: Response, next: NextFunction) => {
// // // // // //         const user = req.user;
// // // // // //         if (!user) return res.status(401).json({ error: 'Unauthorized' });

// // // // // //         // Superadmin selalu lolos
// // // // // //         if (user.role === 'SUPER_ADMIN') return next();

// // // // // //         // Cek permission array
// // // // // //         if (user.permissions && user.permissions.includes(requiredPerm)) {
// // // // // //             return next();
// // // // // //         }

// // // // // //         return res.status(403).json({ error: 'Forbidden', message: 'Anda tidak memiliki izin untuk fitur ini.' });
// // // // // //     };
// // // // // // };

// // // // // // export const requireFacilitator = requireRole(['FACILITATOR', 'ADMIN', 'SUPER_ADMIN']); // Admin juga bisa akses area fasilitator (jika punya permission)
// // // // // // export const requireSuperAdmin = requireRole(['SUPER_ADMIN']);

// // // // // import { Request, Response, NextFunction } from 'express';
// // // // // import jwt from 'jsonwebtoken';
// // // // // import { z } from 'zod';
// // // // // import { User } from '../models/User';
// // // // // import { Course } from '../models/Course'; // Diperlukan untuk cek ownership

// // // // // // 1. KONFIGURASI SECRET
// // // // // const JWT_SECRET = process.env.JWT_SECRET || 'supersecret_kanvas_pmi_2025';

// // // // // // 2. SKEMA VALIDASI TOKEN
// // // // // const JwtPayloadSchema = z.object({
// // // // //   id: z.string(),
// // // // //   email: z.string().email(),
// // // // //   role: z.enum(['STUDENT', 'FACILITATOR', 'ADMIN', 'SUPER_ADMIN'])
// // // // // }).passthrough();

// // // // // export type Role = 'STUDENT' | 'FACILITATOR' | 'ADMIN' | 'SUPER_ADMIN';

// // // // // export interface AuthedRequest extends Request {
// // // // //   user?: {
// // // // //     id: string;
// // // // //     email: string;
// // // // //     role: Role;
// // // // //     name?: string;
// // // // //     avatarUrl?: string;
// // // // //     permissions?: string[];
// // // // //     isBanned?: boolean;
// // // // //     regionScope?: string;
// // // // //     managedProvinces?: string[];
// // // // //     managedRegencies?: string[];
// // // // //   };
// // // // // }

// // // // // // 3. HELPER FUNCTIONS
// // // // // export const signAccessToken = (user: { id: string; email: string; role: Role }) => {
// // // // //   return jwt.sign(user, JWT_SECRET, { expiresIn: '1d' });
// // // // // };

// // // // // export const verifyToken = (token: string) => {
// // // // //   try {
// // // // //     const decoded = jwt.verify(token, JWT_SECRET);
// // // // //     return JwtPayloadSchema.parse(decoded);
// // // // //   } catch (error: any) {
// // // // //     if (error instanceof z.ZodError) {
// // // // //       console.error("❌ JWT Structure Error:", error.issues);
// // // // //     }
// // // // //     throw error;
// // // // //   }
// // // // // };

// // // // // // 4. MIDDLEWARE UTAMA: requireAuth
// // // // // export const requireAuth = async (req: AuthedRequest, res: Response, next: NextFunction) => {
// // // // //   try {
// // // // //     const authHeader = req.headers['authorization'];
// // // // //     let token: string | undefined;

// // // // //     if (authHeader && authHeader.startsWith('Bearer ')) {
// // // // //       token = authHeader.slice(7);
// // // // //     }

// // // // //     if (!token) return res.status(401).json({ error: 'Unauthorized', message: 'Token tidak ditemukan' });

// // // // //     const payload = verifyToken(token);
// // // // //     const user = await User.findById(payload.id);

// // // // //     if (!user) return res.status(401).json({ error: 'Unauthorized', message: 'User tidak ditemukan' });

// // // // //     // Cek Banned
// // // // //     if (user.isBanned) {
// // // // //         return res.status(403).json({ 
// // // // //             error: 'Forbidden', 
// // // // //             message: `Akun dibekukan. Alasan: ${user.bannedReason || 'Pelanggaran'}.` 
// // // // //         });
// // // // //     }

// // // // //     req.user = { 
// // // // //       id: user._id.toString(), 
// // // // //       email: user.email, 
// // // // //       role: user.role as Role, 
// // // // //       name: user.name, 
// // // // //       avatarUrl: user.avatarUrl,
// // // // //       permissions: user.permissions || [],
// // // // //       isBanned: user.isBanned,
// // // // //       regionScope: user.regionScope,
// // // // //       managedProvinces: user.managedProvinces,
// // // // //       managedRegencies: user.managedRegencies
// // // // //     };

// // // // //     next();
// // // // //   } catch (e: any) {
// // // // //     return res.status(401).json({ error: 'Unauthorized', message: 'Sesi berakhir.' });
// // // // //   }
// // // // // };

// // // // // // 5. HELPER CEK PERMISSION (Checkbox)
// // // // // export const requirePermission = (requiredPerm: string) => {
// // // // //     return (req: AuthedRequest, res: Response, next: NextFunction) => {
// // // // //         const user = req.user;
// // // // //         if (!user) return res.status(401).json({ error: 'Unauthorized' });

// // // // //         // Superadmin bypass
// // // // //         if (user.role === 'SUPER_ADMIN') return next();

// // // // //         // Cek Array Permissions
// // // // //         if (user.permissions && user.permissions.includes(requiredPerm)) {
// // // // //             return next();
// // // // //         }

// // // // //         return res.status(403).json({ error: 'Forbidden', message: `Izin ditolak: ${requiredPerm}` });
// // // // //     };
// // // // // };

// // // // // // 6. HELPER CEK ROLE
// // // // // export const requireRole = (roles: Role[]) => {
// // // // //   return (req: AuthedRequest, res: Response, next: NextFunction) => {
// // // // //     if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
// // // // //     if (!roles.includes(req.user.role)) {
// // // // //       return res.status(403).json({ error: 'Forbidden', message: 'Role tidak sesuai.' });
// // // // //     }
// // // // //     next();
// // // // //   };
// // // // // };

// // // // // export const requireFacilitator = requireRole(['FACILITATOR', 'ADMIN', 'SUPER_ADMIN']);
// // // // // export const requireSuperAdmin = requireRole(['SUPER_ADMIN']);

// // // // // // 7. [PENTING] MIDDLEWARE SCOPE KEPEMILIKAN KURSUS
// // // // // // Memastikan Fasilitator hanya bisa edit kursus miliknya
// // // // // export const requireCourseOwnership = async (req: any, res: Response, next: NextFunction) => {
// // // // //     const user = req.user;
// // // // //     // Ambil ID dari params atau body
// // // // //     const courseId = req.params.id || req.params.courseId || req.body.courseId;

// // // // //     if (!user) return res.status(401).json({ error: 'Unauthorized' });

// // // // //     // A. Superadmin & Admin bypass (Asumsi Admin punya izin via checkbox)
// // // // //     if (user.role === 'SUPER_ADMIN' || user.role === 'ADMIN') return next();

// // // // //     // B. Logic FACILITATOR
// // // // //     if (user.role === 'FACILITATOR') {
// // // // //         try {
// // // // //             if (!courseId) return res.status(400).json({ error: 'Course ID tidak ditemukan' });

// // // // //             const course = await Course.findById(courseId);
// // // // //             if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });

// // // // //             // Cek apakah ID User ada di list facilitatorIds
// // // // //             const isOwner = course.facilitatorIds.some((id: any) => id.toString() === user.id);
            
// // // // //             // Cek juga field creatorInfo (opsional, jika creator dianggap owner)
// // // // //             // const isCreator = course.creatorInfo?.email === user.email;

// // // // //             if (isOwner) {
// // // // //                 return next(); // Lanjut, dia pemiliknya
// // // // //             } else {
// // // // //                 return res.status(403).json({ error: 'Akses Ditolak: Anda bukan fasilitator untuk pelatihan ini.' });
// // // // //             }
// // // // //         } catch (error) {
// // // // //             return res.status(500).json({ error: 'Gagal memverifikasi kepemilikan kursus' });
// // // // //         }
// // // // //     }

// // // // //     // Default reject untuk role lain (Student)
// // // // //     return res.status(403).json({ error: 'Akses ditolak.' });
// // // // // };

// // // // import { Request, Response, NextFunction } from 'express';
// // // // import jwt from 'jsonwebtoken';
// // // // import { User } from '../models/User';

// // // // // HARCODE SECRET AGAR KONSISTEN
// // // // const JWT_SECRET = 'supersecret_kanvas_pmi_2025';

// // // // export interface AuthedRequest extends Request {
// // // //   user?: {
// // // //     id: string;
// // // //     email: string;
// // // //     role: string;
// // // //     name?: string;
// // // //     avatarUrl?: string;
// // // //     permissions?: string[];
// // // //     isBanned?: boolean;
// // // //     regionScope?: string;
// // // //     managedProvinces?: string[];
// // // //     managedRegencies?: string[];
// // // //   };
// // // // }

// // // // export const signAccessToken = (payload: any) => {
// // // //   return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
// // // // };

// // // // export const requireAuth = async (req: AuthedRequest, res: Response, next: NextFunction) => {
// // // //   try {
// // // //     const authHeader = req.headers['authorization'];
// // // //     const token = authHeader && authHeader.split(' ')[1];

// // // //     if (!token) return res.status(401).json({ error: 'Token missing' });

// // // //     const decoded: any = jwt.verify(token, JWT_SECRET);
    
// // // //     // Bypass DB check for speed if needed, but safer to check
// // // //     const user = await User.findById(decoded.id);
// // // //     if (!user) return res.status(401).json({ error: 'User invalid' });

// // // //     if (user.isBanned) return res.status(403).json({ error: 'Banned' });

// // // //     req.user = {
// // // //       id: user._id.toString(),
// // // //       email: user.email,
// // // //       role: user.role,
// // // //       permissions: user.permissions || [],
// // // //       name: user.name,
// // // //       avatarUrl: user.avatarUrl,
// // // //       isBanned: user.isBanned,
// // // //       regionScope: user.regionScope,
// // // //       managedProvinces: user.managedProvinces,
// // // //       managedRegencies: user.managedRegencies
// // // //     };

// // // //     next();
// // // //   } catch (error) {
// // // //     return res.status(403).json({ error: 'Invalid token' });
// // // //   }
// // // // };

// // // // // Helper Role & Permission (Wajib ada agar tidak error import)
// // // // export const requireRole = (roles: string[]) => (req: any, res: any, next: any) => {
// // // //     if (roles.includes(req.user.role)) next();
// // // //     else res.status(403).json({ error: 'Forbidden' });
// // // // };
// // // // export const requireFacilitator = requireRole(['FACILITATOR', 'ADMIN', 'SUPER_ADMIN']);
// // // // export const requireSuperAdmin = requireRole(['SUPER_ADMIN']);
// // // // export const requirePermission = (perm: string) => (req: any, res: any, next: any) => {
// // // //     if (req.user.role === 'SUPER_ADMIN' || (req.user.permissions && req.user.permissions.includes(perm))) next();
// // // //     else res.status(403).json({ error: 'Forbidden' });
// // // // };
// // // // export const requireCourseOwnership = (req: any, res: any, next: any) => next();


// // // // backend/src/middleware/auth.ts
// // // import { Request, Response, NextFunction } from 'express';
// // // import jwt from 'jsonwebtoken';
// // // import { User } from '../models/User';

// // // const JWT_SECRET = process.env.JWT_SECRET || 'supersecret_kanvas_pmi_2025';

// // // export interface AuthedRequest extends Request {
// // //   user?: {
// // //     id: string;
// // //     email: string;
// // //     role: string;
// // //     name?: string;
// // //     avatarUrl?: string;
// // //     permissions?: string[]; // Array permission
// // //     isBanned?: boolean;
// // //     regionScope?: string;
// // //     managedProvinces?: string[];
// // //     managedRegencies?: string[];
// // //   };
// // // }

// // // export const signAccessToken = (payload: any) => {
// // //   return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
// // // };

// // // // Middleware Cek Login
// // // export const requireAuth = async (req: AuthedRequest, res: Response, next: NextFunction) => {
// // //   try {
// // //     const authHeader = req.headers['authorization'];
// // //     const token = authHeader && authHeader.split(' ')[1];

// // //     if (!token) return res.status(401).json({ error: 'Token missing' });

// // //     const decoded: any = jwt.verify(token, JWT_SECRET);
    
// // //     // [SAFETY] Selalu ambil permission terbaru dari DB
// // //     const user = await User.findById(decoded.id).select('+password'); // select field standar
    
// // //     if (!user) return res.status(401).json({ error: 'User invalid' });
// // //     if (user.isBanned) return res.status(403).json({ error: 'Banned' });

// // //     req.user = {
// // //       id: user._id.toString(),
// // //       email: user.email,
// // //       role: user.role,
// // //       permissions: user.permissions || [], // Pastikan array permission terload
// // //       name: user.name,
// // //       avatarUrl: user.avatarUrl,
// // //       isBanned: user.isBanned,
// // //       regionScope: user.regionScope,
// // //       managedProvinces: user.managedProvinces,
// // //       managedRegencies: user.managedRegencies
// // //     };

// // //     next();
// // //   } catch (error) {
// // //     return res.status(403).json({ error: 'Invalid token' });
// // //   }
// // // };

// // // // Helper Role Check
// // // export const requireRole = (roles: string[]) => (req: any, res: any, next: any) => {
// // //     if (roles.includes(req.user.role)) next();
// // //     else res.status(403).json({ error: 'Forbidden: Role tidak sesuai' });
// // // };

// // // // Alias untuk kode lama (agar tidak error)
// // // export const requireFacilitator = requireRole(['FACILITATOR', 'ADMIN', 'SUPER_ADMIN']);
// // // export const requireSuperAdmin = requireRole(['SUPER_ADMIN']);

// // // // [FIX] Middleware Permission Check yang lebih pintar
// // // // Mengecek apakah user punya string permission TERTENTU atau dia Super Admin
// // // export const requirePermission = (perm: string) => (req: any, res: any, next: any) => {
// // //     const user = req.user;
// // //     if (!user) return res.status(401).json({ error: 'Unauthorized' });

// // //     // 1. Super Admin bypass semua
// // //     if (user.role === 'SUPER_ADMIN') return next();

// // //     // 2. Cek Array Permissions
// // //     if (user.permissions && user.permissions.includes(perm)) {
// // //         return next();
// // //     }

// // //     // 3. Fallback Khusus Fasilitator (jika permission belum diset di DB)
// // //     // Agar kode lama tetap jalan tanpa migrasi DB
// // //     if (user.role === 'FACILITATOR') {
// // //         if (perm.startsWith('course.') || perm === 'manage_courses') return next();
// // //     }

// // //     // Jika Admin tapi gak punya permission
// // //     if (user.role === 'ADMIN' && perm === 'manage_courses') {
// // //         // Cek manual (sementara)
// // //         if (user.permissions.includes('manage_courses')) return next();
// // //     }

// // //     return res.status(403).json({ error: `Forbidden: Missing permission '${perm}'` });
// // // };

// // // // Cek Kepemilikan (Untuk Fasilitator)
// // // export const requireCourseOwnership = async (req: any, res: any, next: any) => {
// // //     // Jika Super Admin atau Admin Operasional -> Skip check
// // //     if (req.user.role === 'SUPER_ADMIN' || req.user.permissions?.includes('manage_courses')) return next();

// // //     // Jika Fasilitator -> Cek ID
// // //     // (Logic detail ada di Controller updateCourse, di sini pass saja dulu)
// // //     // Idealnya kita query DB di sini, tapi demi performa kita serahkan ke controller
// // //     next();
// // // };



// // import { Request, Response, NextFunction } from 'express';
// // import jwt from 'jsonwebtoken';
// // import { User } from '../models/User';
// // import { Course } from '../models/Course'; // Pastikan import Model Course ada

// // const JWT_SECRET = process.env.JWT_SECRET || 'supersecret_kanvas_pmi_2025';

// // export interface AuthedRequest extends Request {
// //   user?: {
// //     id: string;
// //     email: string;
// //     role: string;
// //     name?: string;
// //     avatarUrl?: string;
// //     permissions?: string[];
// //     isBanned?: boolean;
// //     regionScope?: string;
// //     managedProvinces?: string[];
// //     managedRegencies?: string[];
// //   };
// // }

// // export const signAccessToken = (payload: any) => {
// //   return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
// // };

// // // --- MIDDLEWARE UTAMA: CEK LOGIN ---
// // export const requireAuth = async (req: AuthedRequest, res: Response, next: NextFunction) => {
// //   try {
// //     const authHeader = req.headers['authorization'];
// //     const token = authHeader && authHeader.split(' ')[1];

// //     if (!token) return res.status(401).json({ error: 'Token missing' });

// //     const decoded: any = jwt.verify(token, JWT_SECRET);
    
// //     const user = await User.findById(decoded.id).select('+password');
// //     if (!user) return res.status(401).json({ error: 'User invalid' });
// //     if (user.isBanned) return res.status(403).json({ error: 'Akun dibekukan' });

// //     req.user = {
// //       id: user._id.toString(),
// //       email: user.email,
// //       role: user.role,
// //       permissions: user.permissions || [],
// //       name: user.name,
// //       avatarUrl: user.avatarUrl,
// //       isBanned: user.isBanned,
// //       regionScope: user.regionScope,
// //       managedProvinces: user.managedProvinces,
// //       managedRegencies: user.managedRegencies
// //     };

// //     next();
// //   } catch (error) {
// //     return res.status(403).json({ error: 'Invalid token' });
// //   }
// // };

// // // --- MIDDLEWARE CEK PERMISSION (DENGAN HIERARKI) ---
// // export const requirePermission = (requiredPerm: string) => (req: any, res: any, next: any) => {
// //     const user = req.user;
// //     if (!user) return res.status(401).json({ error: 'Unauthorized' });

// //     // 1. SUPER ADMIN: Dewa (Bypass Semua)
// //     if (user.role === 'SUPER_ADMIN') return next();

// //     const userPerms = user.permissions || [];

// //     // 2. Cek Izin Eksplisit (Punya izin yang diminta persis)
// //     if (userPerms.includes(requiredPerm)) return next();

// //     // 3. [FIX] LOGIKA HIERARKI (Admin Operasional > Fasilitator)
// //     // Jika route butuh izin Fasilitator ('course.update_own'), tapi user punya 'manage_courses', IZINKAN.
// //     if (requiredPerm.startsWith('course.') && userPerms.includes('manage_courses')) {
// //         return next();
// //     }

// //     // 4. Fallback Default Fasilitator (Untuk kompatibilitas lama)
// //     if (user.role === 'FACILITATOR') {
// //         const implicitPerms = ['course.create', 'course.update_own', 'course.manage_content', 'course.access'];
// //         if (implicitPerms.includes(requiredPerm)) return next();
// //     }

// //     return res.status(403).json({ 
// //         error: `Forbidden: Missing permission '${requiredPerm}'. Anda butuh izin ini atau 'manage_courses'.` 
// //     });
// // };

// // // --- MIDDLEWARE CEK KEPEMILIKAN (OWNERSHIP) ---
// // export const requireCourseOwnership = async (req: any, res: any, next: any) => {
// //     const user = req.user;
// //     const { id } = req.params; // ID Course

// //     // 1. [FIX] BYPASS UNTUK ADMIN & SUPER ADMIN
// //     // Admin Nasional/Wilayah BOLEH mengedit kursus milik orang lain (untuk moderasi/perbaikan)
// //     if (user.role === 'SUPER_ADMIN' || user.permissions?.includes('manage_courses')) {
// //         return next();
// //     }

// //     // 2. Logic Cek Pemilik (Khusus Fasilitator Biasa)
// //     try {
// //         const course = await Course.findById(id).select('facilitatorIds creatorInfo');
// //         if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });

// //         // Cek apakah user adalah salah satu fasilitator atau pembuat
// //         const isFacilitator = course.facilitatorIds.some((fid: any) => fid.toString() === user.id);
// //         const isCreator = course.creatorInfo?.id === user.id;

// //         if (isFacilitator || isCreator) {
// //             return next();
// //         } else {
// //             return res.status(403).json({ error: 'Anda bukan pemilik kursus ini.' });
// //         }
// //     } catch (error) {
// //         return res.status(500).json({ error: 'Gagal memverifikasi kepemilikan.' });
// //     }
// // };

// // // Alias Helper (Untuk kompatibilitas)
// // export const requireRole = (roles: string[]) => (req: any, res: any, next: any) => {
// //     if (roles.includes(req.user.role)) next();
// //     else res.status(403).json({ error: 'Role tidak sesuai' });
// // };
// // export const requireFacilitator = requireRole(['FACILITATOR', 'ADMIN', 'SUPER_ADMIN']);
// // export const requireSuperAdmin = requireRole(['SUPER_ADMIN']);

// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// import { User } from '../models/User';
// import { Course } from '../models/Course'; // [PENTING] Pastikan path model Course benar

// const JWT_SECRET = process.env.JWT_SECRET || 'supersecret_kanvas_pmi_2025';

// export interface AuthedRequest extends Request {
//   user?: {
//     id: string;
//     email: string;
//     role: string;
//     name?: string;
//     avatarUrl?: string;
//     permissions?: string[];
//     isBanned?: boolean;
//     regionScope?: string;
//     managedProvinces?: string[];
//     managedRegencies?: string[];
//   };
// }

// export const signAccessToken = (payload: any) => {
//   return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
// };

// // ==========================================
// // 1. MIDDLEWARE UTAMA: CEK LOGIN (JWT)
// // ==========================================
// export const requireAuth = async (req: AuthedRequest, res: Response, next: NextFunction) => {
//   try {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];

//     if (!token) return res.status(401).json({ error: 'Token missing' });

//     const decoded: any = jwt.verify(token, JWT_SECRET);
    
//     // Ambil data user + permissions
//     const user = await User.findById(decoded.id).select('+password');
    
//     if (!user) return res.status(401).json({ error: 'User invalid' });
//     if (user.isBanned) return res.status(403).json({ error: 'Akun dibekukan' });

//     // Attach user ke request
//     req.user = {
//       id: user._id.toString(),
//       email: user.email,
//       role: user.role,
//       permissions: user.permissions || [],
//       name: user.name,
//       avatarUrl: user.avatarUrl,
//       isBanned: user.isBanned,
//       regionScope: user.regionScope,
//       managedProvinces: user.managedProvinces,
//       managedRegencies: user.managedRegencies
//     };

//     next();
//   } catch (error) {
//     return res.status(403).json({ error: 'Invalid token' });
//   }
// };

// // ==========================================
// // 2. MIDDLEWARE CEK PERMISSION (SMART HIERARCHY)
// // ==========================================
// export const requirePermission = (requiredPerm: string) => (req: any, res: any, next: any) => {
//     const user = req.user;
//     if (!user) return res.status(401).json({ error: 'Unauthorized' });

//     // A. SUPER ADMIN: Dewa (Bypass Semua)
//     if (user.role === 'SUPER_ADMIN') return next();

//     const userPerms = user.permissions || [];

//     // B. Cek Izin Eksplisit (Punya izin yang diminta persis)
//     if (userPerms.includes(requiredPerm)) return next();

//     // C. [FIX UTAMA] LOGIKA HIERARKI (Admin Operasional > Fasilitator)
//     // Jika route meminta izin level Fasilitator ('course.update_own' atau 'course.create'),
//     // TAPI user punya izin level Admin ('manage_courses'), maka IZINKAN.
//     if (requiredPerm.startsWith('course.') && userPerms.includes('manage_courses')) {
//         return next();
//     }

//     // D. Fallback Default Fasilitator (Untuk kompatibilitas kode lama)
//     // Jika user adalah Fasilitator tapi permission di DB kosong, beri izin standar
//     if (user.role === 'FACILITATOR') {
//         const implicitPerms = [
//             'course.create', 
//             'course.update_own', 
//             'course.manage_content', 
//             'course.access',
//             'certificate.manage_own'
//         ];
//         if (implicitPerms.includes(requiredPerm)) return next();
//     }

//     // E. Gagal
//     return res.status(403).json({ 
//         error: `Forbidden: Missing permission '${requiredPerm}'. Anda membutuhkan izin ini atau 'manage_courses'.` 
//     });
// };

// // ==========================================
// // 3. MIDDLEWARE CEK KEPEMILIKAN (OWNERSHIP BYPASS)
// // ==========================================
// export const requireCourseOwnership = async (req: any, res: any, next: any) => {
//     const user = req.user;
//     const { id } = req.params; // ID Course dari URL

//     // A. [FIX UTAMA] BYPASS UNTUK ADMIN & SUPER ADMIN
//     // Admin (yang punya manage_courses) dan Super Admin BOLEH mengedit kursus milik orang lain.
//     // Ini penting untuk Admin Nasional/Wilayah agar bisa moderasi/edit info dasar.
//     if (user.role === 'SUPER_ADMIN' || user.permissions?.includes('manage_courses')) {
//         return next();
//     }

//     // B. Logic Cek Pemilik (Khusus Fasilitator Biasa)
//     try {
//         const course = await Course.findById(id).select('facilitatorIds creatorInfo');
//         if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });

//         // Cek apakah user terdaftar sebagai fasilitator atau pembuat
//         const isFacilitator = course.facilitatorIds && course.facilitatorIds.some((fid: any) => fid.toString() === user.id);
//         const isCreator = course.creatorInfo?.id === user.id;

//         if (isFacilitator || isCreator) {
//             return next();
//         } else {
//             return res.status(403).json({ error: 'Akses Ditolak: Anda bukan pemilik atau pengajar di kursus ini.' });
//         }
//     } catch (error) {
//         return res.status(500).json({ error: 'Gagal memverifikasi kepemilikan.' });
//     }
// };

// // ==========================================
// // 4. HELPER ROLE (Kompatibilitas)
// // ==========================================
// export const requireRole = (roles: string[]) => (req: any, res: any, next: any) => {
//     if (roles.includes(req.user.role)) next();
//     else res.status(403).json({ error: 'Role tidak sesuai' });
// };

// export const requireFacilitator = requireRole(['FACILITATOR', 'ADMIN', 'SUPER_ADMIN']);
// export const requireSuperAdmin = requireRole(['SUPER_ADMIN']);




import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { Course } from '../models/Course'; // [PENTING] Pastikan path model Course benar

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret_kanvas_pmi_2025';

export interface AuthedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
    name?: string;
    avatarUrl?: string;
    permissions?: string[];
    isBanned?: boolean;
    regionScope?: string;
    managedProvinces?: string[];
    managedRegencies?: string[];
  };
}

export const signAccessToken = (payload: any) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
};

// ==========================================
// 1. MIDDLEWARE UTAMA: CEK LOGIN (JWT)
// ==========================================
export const requireAuth = async (req: AuthedRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Token missing' });

    const decoded: any = jwt.verify(token, JWT_SECRET);
    
    // Ambil data user + permissions
    const user = await User.findById(decoded.id).select('+password');
    
    if (!user) return res.status(401).json({ error: 'User invalid' });
    if (user.isBanned) return res.status(403).json({ error: 'Akun dibekukan' });

    // Attach user ke request
    req.user = {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
      permissions: user.permissions || [],
      name: user.name,
      avatarUrl: user.avatarUrl,
      isBanned: user.isBanned,
      regionScope: user.regionScope,
      managedProvinces: user.managedProvinces,
      managedRegencies: user.managedRegencies
    };

    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

// ==========================================
// 2. MIDDLEWARE CEK PERMISSION (SMART HIERARCHY)
// ==========================================
export const requirePermission = (requiredPerm: string) => (req: any, res: any, next: any) => {
    const user = req.user;
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    // A. SUPER ADMIN: Dewa (Bypass Semua)
    if (user.role === 'SUPER_ADMIN') return next();

    const userPerms = user.permissions || [];

    // B. Cek Izin Eksplisit (Punya izin yang diminta persis)
    if (userPerms.includes(requiredPerm)) return next();

    // C. [FIX UTAMA] LOGIKA HIERARKI (Admin Operasional > Fasilitator)
    // Jika route meminta izin level Fasilitator ('course.update_own' atau 'course.create'),
    // TAPI user punya izin level Admin ('manage_courses'), maka IZINKAN.
    if (requiredPerm.startsWith('course.') && userPerms.includes('manage_courses')) {
        return next();
    }

    // D. Fallback Default Fasilitator (Untuk kompatibilitas kode lama)
    // Jika user adalah Fasilitator tapi permission di DB kosong, beri izin standar
    if (user.role === 'FACILITATOR') {
        const implicitPerms = [
            'course.create', 
            'course.update_own', 
            'course.manage_content', 
            'course.access',
            'certificate.manage_own'
        ];
        if (implicitPerms.includes(requiredPerm)) return next();
    }

    // E. Gagal
    return res.status(403).json({ 
        error: `Forbidden: Missing permission '${requiredPerm}'. Anda membutuhkan izin ini atau 'manage_courses'.` 
    });
};

// ==========================================
// 3. MIDDLEWARE CEK KEPEMILIKAN (OWNERSHIP BYPASS)
// ==========================================
export const requireCourseOwnership = async (req: any, res: any, next: any) => {
    const user = req.user;
    const { id } = req.params; // ID Course dari URL

    // A. [FIX UTAMA] BYPASS UNTUK ADMIN & SUPER ADMIN
    // Admin (yang punya manage_courses) dan Super Admin BOLEH mengedit kursus milik orang lain.
    // Ini penting untuk Admin Nasional/Wilayah agar bisa moderasi/edit info dasar.
    if (user.role === 'SUPER_ADMIN' || user.permissions?.includes('manage_courses')) {
        return next();
    }

    // B. Logic Cek Pemilik (Khusus Fasilitator Biasa)
    try {
        const course = await Course.findById(id).select('facilitatorIds creatorInfo');
        if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });

        // Cek apakah user terdaftar sebagai fasilitator atau pembuat
        const isFacilitator = course.facilitatorIds && course.facilitatorIds.some((fid: any) => fid.toString() === user.id);
        const isCreator = course.creatorInfo?.id === user.id;

        if (isFacilitator || isCreator) {
            return next();
        } else {
            return res.status(403).json({ error: 'Akses Ditolak: Anda bukan pemilik atau pengajar di kursus ini.' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Gagal memverifikasi kepemilikan.' });
    }
};

// ==========================================
// 4. HELPER ROLE (Kompatibilitas)
// ==========================================
export const requireRole = (roles: string[]) => (req: any, res: any, next: any) => {
    if (roles.includes(req.user.role)) next();
    else res.status(403).json({ error: 'Role tidak sesuai' });
};

// ROLE EXPORTS
export const requireFacilitator = requireRole(['FACILITATOR', 'ADMIN', 'SUPER_ADMIN']);
export const requireSuperAdmin = requireRole(['SUPER_ADMIN']);

// [DITAMBAHKAN] requireAdmin agar backend tidak error saat dipanggil di routes/admin-user.ts
export const requireAdmin = requireRole(['ADMIN', 'SUPER_ADMIN']);
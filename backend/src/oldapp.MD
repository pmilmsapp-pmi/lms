
// // import 'dotenv/config'; 

// // import express from 'express';
// // import cors from 'cors';
// // import helmet from 'helmet';
// // import compression from 'compression';
// // import morgan from 'morgan';
// // import cookieParser from 'cookie-parser';
// // import path from 'path';
// // import fs from 'fs';
// // import mongoose from 'mongoose';
// // import { fileURLToPath } from 'url';

// // // Import Routes
// // import authRoutes from './routes/auth';
// // import courseRoutes from './routes/courses';
// // import userRoutes from './routes/users';
// // import progressRoutes from './routes/progress';
// // import certificateRoutes from './routes/certificates';
// // import uploadRoutes from './routes/upload';
// // import adminUserRoutes from './routes/admin-user';
// // import statsRoutes from './routes/statsRoutes';
// // import forumRoutes from './routes/forum';
// // import libraryRoutes from './routes/library';
// // import contentRoutes from './routes/content';
// // import quizRoutes from './routes/quiz';
// // import chatRoutes from './routes/chat';
// // import notificationRoutes from './routes/notification';
// // import blogRoutes from './routes/blog';
// // import classroomRoutes from './routes/classroom';

// // const app = express();

// // // --- 2. DATABASE CONNECTION ---
// // const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lms_db';

// // mongoose.set('strictQuery', true);
// // mongoose
// //   .connect(MONGO_URI)
// //   .then(() => console.log(`[Database] Connected to MongoDB at: ${MONGO_URI}`))
// //   .catch((err) => console.error('[Database] Connection Error:', err));

// // // --- 3. CORS CONFIGURATION ---
// // const isDev = (process.env.NODE_ENV || 'development') === 'development';
// // const origins = (process.env.CORS_ORIGINS || 'https://humanis-r16s.vercel.app
').split(',').map(s => s.trim()).filter(Boolean);

// // const corsConfig: cors.CorsOptions = {
// //   origin: (origin, callback) => {
// //     if (!origin || origins.includes(origin) || isDev) return callback(null, true);
// //     return callback(new Error('Not allowed by CORS'));
// //   },
// //   credentials: true,
// //   allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With', 'Origin'],
// //   methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
// // };

// // app.use(cors(corsConfig));
// // app.options('*', cors(corsConfig)); 

// // // --- 4. MIDDLEWARE ---
// // // PENTING: crossOriginResourcePolicy: false wajib agar gambar muncul di frontend
// // app.use(helmet({ crossOriginResourcePolicy: false })); 
// // app.use(compression());
// // app.use(morgan('dev'));
// // app.use(express.json({ limit: '10mb' })); 
// // app.use(express.urlencoded({ extended: true, limit: '10mb' }));
// // app.use(cookieParser(process.env.COOKIE_SECRET || 'pmi-secret'));

// // // --- 5. STATIC FILES CONFIGURATION (DIPERBAIKI) ---

// // // PERBAIKAN: Arahkan ke 'public/uploads' karena di situlah file lama Anda berada
// // const UPLOADS_PATH = path.join(process.cwd(), 'public', 'uploads'); 

// // // Buat folder jika belum ada (safety check)
// // if (!fs.existsSync(UPLOADS_PATH)) {
// //     console.log(`[Server] Creating uploads directory at: ${UPLOADS_PATH}`);
// //     fs.mkdirSync(UPLOADS_PATH, { recursive: true });
// // }

// // console.log(`[Server] Serving static files from: ${UPLOADS_PATH}`);

// // // Mount folder tersebut ke URL /uploads
// // // Artinya: URL http://localhost:4000/uploads/... akan mengambil file dari folder backend/public/uploads/...
// // app.use('/uploads', express.static(UPLOADS_PATH));

// // // --- 6. ROUTES REGISTRATION ---
// // app.get('/api/health', (_req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

// // app.use('/api/auth', authRoutes);
// // app.use('/api/users', userRoutes);
// // app.use('/api/admin/users', adminUserRoutes);
// // app.use('/api/courses', courseRoutes);
// // app.use('/api/content', contentRoutes);
// // app.use('/api/progress', progressRoutes);
// // app.use('/api/certificates', certificateRoutes);
// // app.use('/api/quiz', quizRoutes);
// // app.use('/api/classroom', classroomRoutes);
// // app.use('/api/forum', forumRoutes);
// // app.use('/api/chat', chatRoutes);
// // app.use('/api/notifications', notificationRoutes);
// // app.use('/api/blog', blogRoutes);
// // app.use('/api/library', libraryRoutes);
// // app.use('/api/stats', statsRoutes);
// // app.use('/api/upload', uploadRoutes); 
// // app.use('/upload', uploadRoutes);     

// // // Global Error Handler
// // app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
// //   console.error("❌ Global Error:", err.message);
// //   if (err.name === 'ZodError') {
// //     return res.status(400).json({ error: 'Validation error', issues: err.issues });
// //   }
// //   res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
// // });

// // export default app;
// // --- 1. WAJIB DI BARIS PERTAMA: Load Environment Variables ---
// import 'dotenv/config'; 

// import express from 'express';
// import cors from 'cors';
// import helmet from 'helmet';
// import compression from 'compression';
// import morgan from 'morgan';
// import cookieParser from 'cookie-parser';
// import path from 'path';
// import fs from 'fs';
// import mongoose from 'mongoose';
// import { fileURLToPath } from 'url';

// // Import Routes
// import authRoutes from './routes/auth';
// import courseRoutes from './routes/courses';
// import userRoutes from './routes/users';
// import progressRoutes from './routes/progress';
// import certificateRoutes from './routes/certificates';
// import uploadRoutes from './routes/upload';
// import adminUserRoutes from './routes/admin-user';
// import statsRoutes from './routes/statsRoutes';
// import forumRoutes from './routes/forum';
// import libraryRoutes from './routes/library';
// import contentRoutes from './routes/content';
// import quizRoutes from './routes/quiz';
// import chatRoutes from './routes/chat';
// import notificationRoutes from './routes/notification';
// import blogRoutes from './routes/blog';
// import classroomRoutes from './routes/classroom';
// import enrollmentRoutes from './routes/enrollments';

// const app = express();

// // --- 2. DATABASE CONNECTION ---
// const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://misdbpmi:misdbpmi@cluster0.l4lq1.mongodb.net/lms_db';

// mongoose.set('strictQuery', true);
// mongoose
//   .connect(MONGO_URI)
//   .then(() => console.log(`[Database] Connected to MongoDB at: ${MONGO_URI}`))
//   .catch((err) => console.error('[Database] Connection Error:', err));

// // --- 3. CORS CONFIGURATION (UPDATED) ---
// const isDev = (process.env.NODE_ENV || 'development') === 'development';
// const origins = (process.env.CORS_ORIGINS || 'http://localhost:3000').split(',').map(s => s.trim()).filter(Boolean);

// const corsConfig: cors.CorsOptions = {
//   origin: true, // Izinkan semua origin saat dev agar popup tidak terblokir
//   credentials: true,
//   // [PENTING] Tambahkan 'x-google-token' agar frontend bisa kirim token manual
//   allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With', 'Origin', 'x-google-token'],
//   methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
// };

// app.use(cors(corsConfig));
// app.options('*', cors(corsConfig)); 

// // --- 4. MIDDLEWARE (UPDATED) ---
// // [PENTING] contentSecurityPolicy: false agar script inline di popup bisa jalan
// app.use(helmet({ 
//   crossOriginResourcePolicy: false,
//   contentSecurityPolicy: false 
// })); 
// app.use(compression());
// app.use(morgan('dev'));
// app.use(express.json({ limit: '10mb' })); 
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));
// app.use(cookieParser(process.env.COOKIE_SECRET || 'pmi-secret'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // --- 5. STATIC FILES CONFIGURATION ---
// const UPLOADS_PATH = path.join(process.cwd(), 'public', 'uploads'); 

// if (!fs.existsSync(UPLOADS_PATH)) {
//     console.log(`[Server] Creating uploads directory at: ${UPLOADS_PATH}`);
//     fs.mkdirSync(UPLOADS_PATH, { recursive: true });
// }

// console.log(`[Server] Serving static files from: ${UPLOADS_PATH}`);
// app.use('/uploads', express.static(UPLOADS_PATH));

// // --- 6. ROUTES REGISTRATION ---
// app.get('/api/health', (_req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/admin/users', adminUserRoutes);
// app.use('/api/courses', courseRoutes);
// app.use('/api/content', contentRoutes);
// app.use('/api/progress', progressRoutes);
// app.use('/api/certificates', certificateRoutes);
// app.use('/api/quiz', quizRoutes);
// app.use('/api/classroom', classroomRoutes);
// app.use('/api/forum', forumRoutes);
// app.use('/api/chat', chatRoutes);
// app.use('/api/notifications', notificationRoutes);
// app.use('/api/blog', blogRoutes);
// app.use('/api/library', libraryRoutes);
// app.use('/api/stats', statsRoutes);
// app.use('/api/upload', uploadRoutes); 
// app.use('/upload', uploadRoutes);
// app.use('/api/courses/published', courseRoutes);
// app.use('/api/enrollments', enrollmentRoutes);
// app.use('/api/enrollments', enrollmentRoutes); // <--- Pastikan baris ini ada



// // Global Error Handler
// app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
//   console.error("❌ Global Error:", err.message);
//   if (err.name === 'ZodError') {
//     return res.status(400).json({ error: 'Validation error', issues: err.issues });
//   }
//   res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
// });

// export default app;
import 'dotenv/config'; 

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';
import fs from 'fs';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';

// Import Routes
import authRoutes from './routes/auth';
import courseRoutes from './routes/courses';
import userRoutes from './routes/users';
import progressRoutes from './routes/progress';
import certificateRoutes from './routes/certificates';
import uploadRoutes from './routes/upload';
import adminUserRoutes from './routes/admin-user';
// import statsRoutes from './routes/statsRoutes';
import forumRoutes from './routes/forum';
import libraryRoutes from './routes/library';
import contentRoutes from './routes/content';
import quizRoutes from './routes/quiz';
import chatRoutes from './routes/chat';
import notificationRoutes from './routes/notification';
import blogRoutes from './routes/blog';
import classroomRoutes from './routes/classroom';
import enrollmentRoutes from './routes/enrollments';
import statsRoutes from './routes/stats';
import commentRoutes from './routes/comment'; 


const app = express();

// --- 2. DATABASE CONNECTION ---
const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://misdbpmi:misdbpmi@cluster0.l4lq1.mongodb.net/lms_db';

mongoose.set('strictQuery', true);
mongoose
  .connect(MONGO_URI)
  .then(() => console.log(`[Database] Connected to MongoDB at: ${MONGO_URI}`))
  .catch((err) => console.error('[Database] Connection Error:', err));

// --- 3. CORS CONFIGURATION (UPDATED) ---
const isDev = (process.env.NODE_ENV || 'development') === 'development';
const origins = (process.env.CORS_ORIGINS || 'http://localhost:3000').split(',').map(s => s.trim()).filter(Boolean);

const corsConfig: cors.CorsOptions = {
  origin: true, // Izinkan semua origin saat dev agar popup tidak terblokir
  credentials: true,
  // [PENTING] Tambahkan 'x-google-token' agar frontend bisa kirim token manual
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With', 'Origin', 'x-google-token'],
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
};

app.use(cors(corsConfig));
app.options('*', cors(corsConfig)); 

// --- 4. MIDDLEWARE (UPDATED) ---
// [PENTING] contentSecurityPolicy: false agar script inline di popup bisa jalan
app.use(helmet({ 
  crossOriginResourcePolicy: false,
  contentSecurityPolicy: false 
})); 
app.use(compression());
app.use(morgan('dev'));

// [PARSING BODY] Urutan ini penting agar JSON terbaca sebelum Masuk Route
app.use(express.json({ limit: '50mb' })); // Limit diperbesar untuk antisipasi upload base64/json besar
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser(process.env.COOKIE_SECRET || 'pmi-secret'));

// (Duplicate baris lama Anda tetap saya biarkan sesuai request)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- 5. STATIC FILES CONFIGURATION ---
const UPLOADS_PATH = path.join(process.cwd(), 'public', 'uploads'); 

if (!fs.existsSync(UPLOADS_PATH)) {
    console.log(`[Server] Creating uploads directory at: ${UPLOADS_PATH}`);
    fs.mkdirSync(UPLOADS_PATH, { recursive: true });
}

console.log(`[Server] Serving static files from: ${UPLOADS_PATH}`);
app.use('/uploads', express.static(UPLOADS_PATH));

// --- 6. ROUTES REGISTRATION ---
app.get('/api/health', (_req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

// [FIX UTAMA UNTUK PDF KOSONG]
// Kita mapping URL Frontend (/api/courses/certificate/...) ke file certificates.ts
// Ini memastikan request preview masuk ke file yang benar, bukan ke courseRoutes
app.use('/api/courses/certificate', certificateRoutes);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin/users', adminUserRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/certificates', certificateRoutes); // Route standar
app.use('/api/quiz', quizRoutes);
app.use('/api/classroom', classroomRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/library', libraryRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/upload', uploadRoutes); 
app.use('/upload', uploadRoutes);
app.use('/api/courses/published', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/comment', commentRoutes);

// [TAMBAHAN] 404 Handler untuk API yang tidak ditemukan
app.use((req, res, next) => {
    // Abaikan jika request adalah static file yang tidak ketemu (browser default)
    if (req.url.includes('/uploads/')) return next();
    
    res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
});

// Global Error Handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("❌ Global Error:", err.message);
  if (err.name === 'ZodError') {
    return res.status(400).json({ error: 'Validation error', issues: err.issues });
  }
  // Menangani error JSON parsing jika payload rusak
  if (err instanceof SyntaxError && 'body' in err) {
      return res.status(400).json({ error: 'Invalid JSON payload' });
  }
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

export default app;

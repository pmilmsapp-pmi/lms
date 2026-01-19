// // // // // // // // import 'dotenv/config'; 
// // // // // // // // import express from 'express';
// // // // // // // // import cors from 'cors';
// // // // // // // // import helmet from 'helmet';
// // // // // // // // import compression from 'compression';
// // // // // // // // import morgan from 'morgan';
// // // // // // // // import cookieParser from 'cookie-parser';
// // // // // // // // import path from 'path';
// // // // // // // // import fs from 'fs';
// // // // // // // // import mongoose from 'mongoose';

// // // // // // // // // --- IMPORT ROUTES ---
// // // // // // // // // [FIX] Now pointing to the FRESH file 'authentication.ts'
// // // // // // // // import authRoutes from './routes/authentication'; 
// // // // // // // // import courseRoutes from './routes/courses';
// // // // // // // // import userRoutes from './routes/users';
// // // // // // // // import progressRoutes from './routes/progress';
// // // // // // // // import certificateRoutes from './routes/certificates';
// // // // // // // // import uploadRoutes from './routes/upload';
// // // // // // // // import adminUserRoutes from './routes/admin-user'; 
// // // // // // // // import forumRoutes from './routes/forum';
// // // // // // // // import libraryRoutes from './routes/library';
// // // // // // // // import contentRoutes from './routes/content';
// // // // // // // // import quizRoutes from './routes/quiz';
// // // // // // // // import chatRoutes from './routes/chat';
// // // // // // // // import notificationRoutes from './routes/notification';
// // // // // // // // import blogRoutes from './routes/blog';
// // // // // // // // import classroomRoutes from './routes/classroom';
// // // // // // // // import enrollmentRoutes from './routes/enrollments';
// // // // // // // // import statsRoutes from './routes/stats';
// // // // // // // // import commentRoutes from './routes/comment'; 

// // // // // // // // const app = express();

// // // // // // // // // --- DATABASE CONNECTION ---
// // // // // // // // const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://misdbpmi:misdbpmi@cluster0.l4lq1.mongodb.net/lms_db';

// // // // // // // // mongoose.set('strictQuery', true);

// // // // // // // // const connectDB = async () => {
// // // // // // // //   try {
// // // // // // // //     if (mongoose.connection.readyState === 0) {
// // // // // // // //       await mongoose.connect(MONGO_URI);
// // // // // // // //       console.log(`✅ [db] Connected to MongoDB`);
// // // // // // // //     }
// // // // // // // //   } catch (err) {
// // // // // // // //     console.error('❌ [db] Connection error:', err);
// // // // // // // //   }
// // // // // // // // };
// // // // // // // // connectDB();

// // // // // // // // // --- CORS CONFIGURATION ---
// // // // // // // // const corsConfig: cors.CorsOptions = {
// // // // // // // //   origin: true, 
// // // // // // // //   credentials: true,
// // // // // // // //   allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With', 'Origin', 'x-google-token'],
// // // // // // // //   methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
// // // // // // // // };

// // // // // // // // app.use(cors(corsConfig));
// // // // // // // // app.options('*', cors(corsConfig)); 

// // // // // // // // // --- MIDDLEWARE ---
// // // // // // // // app.use(helmet({ 
// // // // // // // //   crossOriginResourcePolicy: false,
// // // // // // // //   contentSecurityPolicy: false 
// // // // // // // // })); 
// // // // // // // // app.use(compression());
// // // // // // // // app.use(morgan('dev'));

// // // // // // // // app.use(express.json({ limit: '50mb' }));
// // // // // // // // app.use(express.urlencoded({ extended: true, limit: '50mb' }));
// // // // // // // // app.use(cookieParser(process.env.COOKIE_SECRET || 'pmi-secret'));

// // // // // // // // // --- STATIC FILES ---
// // // // // // // // const UPLOADS_PATH = path.join(process.cwd(), 'public', 'uploads'); 
// // // // // // // // if (!fs.existsSync(UPLOADS_PATH)) {
// // // // // // // //     try { fs.mkdirSync(UPLOADS_PATH, { recursive: true }); } catch(e) {} 
// // // // // // // // }
// // // // // // // // app.use('/uploads', express.static(UPLOADS_PATH));

// // // // // // // // // --- ROUTES REGISTRATION ---
// // // // // // // // app.get('/', (req, res) => res.send('LMS PMI Backend is Running!'));
// // // // // // // // app.get('/api/health', (_req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

// // // // // // // // app.use('/api/courses/certificate', certificateRoutes);
// // // // // // // // // [FIX] Using the new route import
// // // // // // // // app.use('/api/auth', authRoutes);
// // // // // // // // app.use('/api/users', userRoutes);
// // // // // // // // app.use('/api/admin/users', adminUserRoutes);
// // // // // // // // app.use('/api/courses', courseRoutes);
// // // // // // // // app.use('/api/content', contentRoutes);
// // // // // // // // app.use('/api/progress', progressRoutes);
// // // // // // // // app.use('/api/certificates', certificateRoutes);
// // // // // // // // app.use('/api/quiz', quizRoutes);
// // // // // // // // app.use('/api/classroom', classroomRoutes);
// // // // // // // // app.use('/api/forum', forumRoutes);
// // // // // // // // app.use('/api/chat', chatRoutes);
// // // // // // // // app.use('/api/notifications', notificationRoutes);
// // // // // // // // app.use('/api/blog', blogRoutes);
// // // // // // // // app.use('/api/library', libraryRoutes);
// // // // // // // // app.use('/api/stats', statsRoutes);
// // // // // // // // app.use('/api/upload', uploadRoutes); 
// // // // // // // // app.use('/upload', uploadRoutes);
// // // // // // // // app.use('/api/enrollments', enrollmentRoutes);
// // // // // // // // app.use('/api/comment', commentRoutes);

// // // // // // // // // --- ERROR HANDLERS ---
// // // // // // // // app.use((req, res, next) => {
// // // // // // // //     if (req.url.includes('/uploads/')) return next();
// // // // // // // //     res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
// // // // // // // // });

// // // // // // // // app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
// // // // // // // //   console.error("❌ Global Error:", err.message);
// // // // // // // //   if (err.name === 'ZodError') {
// // // // // // // //     return res.status(400).json({ error: 'Validation error', issues: err.issues });
// // // // // // // //   }
// // // // // // // //   if (err instanceof SyntaxError && 'body' in err) {
// // // // // // // //       return res.status(400).json({ error: 'Invalid JSON payload' });
// // // // // // // //   }
// // // // // // // //   res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
// // // // // // // // });

// // // // // // // // // --- SERVER LISTEN ---
// // // // // // // // const PORT = process.env.PORT || 4000;
// // // // // // // // if (process.env.NODE_ENV !== 'production') {
// // // // // // // //   app.listen(PORT, () => {
// // // // // // // //     console.log(`🚀 [server] Server running on port ${PORT}`);
// // // // // // // //   });
// // // // // // // // }

// // // // // // // // export default app;

// // // // // // // import 'dotenv/config'; 
// // // // // // // import express from 'express';
// // // // // // // import cors from 'cors';
// // // // // // // import helmet from 'helmet';
// // // // // // // import compression from 'compression';
// // // // // // // import morgan from 'morgan';
// // // // // // // import cookieParser from 'cookie-parser';
// // // // // // // import path from 'path';
// // // // // // // import fs from 'fs';
// // // // // // // import mongoose from 'mongoose';

// // // // // // // // Import Library untuk cek koneksi
// // // // // // // import { v2 as cloudinary } from 'cloudinary';
// // // // // // // import { createClient } from '@supabase/supabase-js';

// // // // // // // // --- IMPORT ROUTES ---
// // // // // // // import authRoutes from './routes/authentication'; 
// // // // // // // import courseRoutes from './routes/courses';
// // // // // // // import userRoutes from './routes/users';
// // // // // // // import progressRoutes from './routes/progress';
// // // // // // // import certificateRoutes from './routes/certificates';
// // // // // // // import uploadRoutes from './routes/upload';
// // // // // // // import adminUserRoutes from './routes/admin-user'; 
// // // // // // // import forumRoutes from './routes/forum';
// // // // // // // import libraryRoutes from './routes/library';
// // // // // // // import contentRoutes from './routes/content';
// // // // // // // import quizRoutes from './routes/quiz';
// // // // // // // import chatRoutes from './routes/chat';
// // // // // // // import notificationRoutes from './routes/notification';
// // // // // // // import blogRoutes from './routes/blog';
// // // // // // // import classroomRoutes from './routes/classroom';
// // // // // // // import enrollmentRoutes from './routes/enrollments';
// // // // // // // import statsRoutes from './routes/stats';
// // // // // // // import commentRoutes from './routes/comment'; 


// // // // // // // const app = express();


// // // // // // // // --- 1. DATABASE CONNECTION (MONGODB) ---
// // // // // // // const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://misdbpmi:misdbpmi@cluster0.l4lq1.mongodb.net/lms_db';

// // // // // // // mongoose.set('strictQuery', true);

// // // // // // // const connectDB = async () => {
// // // // // // //   try {
// // // // // // //     if (mongoose.connection.readyState === 0) {
// // // // // // //       await mongoose.connect(MONGO_URI);
// // // // // // //       console.log(`✅ [db]         Connected to MongoDB`);
// // // // // // //     }
// // // // // // //   } catch (err) {
// // // // // // //     console.error('❌ [db]         Connection error:', err);
// // // // // // //   }
// // // // // // // };
// // // // // // // connectDB();

// // // // // // // // --- 2. INTEGRATION CHECK (SUPABASE & CLOUDINARY) ---
// // // // // // // const checkIntegrations = async () => {
// // // // // // //   // A. Cek Supabase
// // // // // // //   if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY) {
// // // // // // //     try {
// // // // // // //       const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
// // // // // // //       const { data, error } = await supabase.storage.listBuckets();
// // // // // // //       if (!error) {
// // // // // // //         console.log(`✅ [supabase]   Connected`);
// // // // // // //       } else {
// // // // // // //         console.log(`❌ [supabase]   Error: ${error.message}`);
// // // // // // //       }
// // // // // // //     } catch (err) {
// // // // // // //       console.log(`❌ [supabase]   Connection Failed`);
// // // // // // //     }
// // // // // // //   } else {
// // // // // // //     console.log(`⚠️ [supabase]   Skipped (Missing .env variables)`);
// // // // // // //   }

// // // // // // //   // B. Cek Cloudinary (Logika Lebih Detail)
// // // // // // //   const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
// // // // // // //   const apiKey = process.env.CLOUDINARY_API_KEY;
// // // // // // //   const apiSecret = process.env.CLOUDINARY_API_SECRET;

// // // // // // //   if (cloudName && apiKey && apiSecret) {
// // // // // // //     try {
// // // // // // //       cloudinary.config({
// // // // // // //         cloud_name: cloudName,
// // // // // // //         api_key: apiKey,
// // // // // // //         api_secret: apiSecret,
// // // // // // //       });
// // // // // // //       // Ping server Cloudinary untuk memastikan kunci benar
// // // // // // //       await cloudinary.api.ping();
// // // // // // //       console.log(`✅ [cloudinary] Connected (Cloud: ${cloudName})`);
// // // // // // //     } catch (err: any) {
// // // // // // //       console.log(`❌ [cloudinary] Connection Failed: ${err.message}`);
// // // // // // //     }
// // // // // // //   } else {
// // // // // // //     // Beritahu user variabel mana yang belum terbaca
// // // // // // //     console.log(`⚠️ [cloudinary] Skipped. Variabel .env belum lengkap:`);
// // // // // // //     if (!cloudName) console.log(`   - CLOUDINARY_CLOUD_NAME tidak terbaca`);
// // // // // // //     if (!apiKey) console.log(`   - CLOUDINARY_API_KEY tidak terbaca`);
// // // // // // //     if (!apiSecret) console.log(`   - CLOUDINARY_API_SECRET tidak terbaca`);
// // // // // // //   }
// // // // // // // };

// // // // // // // // --- CORS CONFIGURATION ---
// // // // // // // const corsConfig: cors.CorsOptions = {
// // // // // // //   origin: true, 
// // // // // // //   credentials: true,
// // // // // // //   allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With', 'Origin', 'x-google-token'],
// // // // // // //   methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
// // // // // // // };

// // // // // // // app.use(cors(corsConfig));
// // // // // // // app.options('*', cors(corsConfig)); 

// // // // // // // // --- MIDDLEWARE ---
// // // // // // // app.use(helmet({ 
// // // // // // //   crossOriginResourcePolicy: false,
// // // // // // //   contentSecurityPolicy: false 
// // // // // // // })); 
// // // // // // // app.use(compression());
// // // // // // // app.use(morgan('dev'));

// // // // // // // app.use(express.json({ limit: '50mb' }));
// // // // // // // app.use(express.urlencoded({ extended: true, limit: '50mb' }));
// // // // // // // app.use(cookieParser(process.env.COOKIE_SECRET || 'pmi-secret'));

// // // // // // // // --- STATIC FILES ---
// // // // // // // const UPLOADS_PATH = path.join(process.cwd(), 'public', 'uploads'); 
// // // // // // // if (!fs.existsSync(UPLOADS_PATH)) {
// // // // // // //     try { fs.mkdirSync(UPLOADS_PATH, { recursive: true }); } catch(e) {} 
// // // // // // // }
// // // // // // // app.use('/uploads', express.static(UPLOADS_PATH));

// // // // // // // // --- ROUTES REGISTRATION ---
// // // // // // // app.get('/', (req, res) => res.send('LMS PMI Backend is Running!'));
// // // // // // // app.get('/api/health', (_req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

// // // // // // // app.use('/api/courses/certificate', certificateRoutes);
// // // // // // // app.use('/api/auth', authRoutes);
// // // // // // // app.use('/api/users', userRoutes);
// // // // // // // app.use('/api/admin/users', adminUserRoutes);
// // // // // // // app.use('/api/courses', courseRoutes);
// // // // // // // app.use('/api/content', contentRoutes);
// // // // // // // app.use('/api/progress', progressRoutes);
// // // // // // // app.use('/api/certificates', certificateRoutes);
// // // // // // // app.use('/api/quiz', quizRoutes);
// // // // // // // app.use('/api/classroom', classroomRoutes);
// // // // // // // app.use('/api/forum', forumRoutes);
// // // // // // // app.use('/api/chat', chatRoutes);
// // // // // // // app.use('/api/notifications', notificationRoutes);
// // // // // // // app.use('/api/blog', blogRoutes);
// // // // // // // app.use('/api/library', libraryRoutes);
// // // // // // // app.use('/api/stats', statsRoutes);
// // // // // // // app.use('/api/upload', uploadRoutes); 
// // // // // // // app.use('/upload', uploadRoutes);
// // // // // // // app.use('/api/enrollments', enrollmentRoutes);
// // // // // // // app.use('/api/comment', commentRoutes);

// // // // // // // // --- ERROR HANDLERS ---
// // // // // // // app.use((req, res, next) => {
// // // // // // //     if (req.url.includes('/uploads/')) return next();
// // // // // // //     res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
// // // // // // // });

// // // // // // // app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
// // // // // // //   console.error("❌ Global Error:", err.message);
// // // // // // //   if (err.name === 'ZodError') {
// // // // // // //     return res.status(400).json({ error: 'Validation error', issues: err.issues });
// // // // // // //   }
// // // // // // //   res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
// // // // // // // });

// // // // // // // // --- SERVER LISTEN ---
// // // // // // // const PORT = process.env.PORT || 4000;

// // // // // // // app.listen(PORT, async () => {
// // // // // // //   console.log(`🚀 [server]     Server running on port ${PORT}`);
// // // // // // //   // Jalankan cek integrasi
// // // // // // //   await checkIntegrations();
// // // // // // // });

// // // // // // // export default app;


// // // // // // import 'dotenv/config'; 
// // // // // // import express from 'express';
// // // // // // import cors from 'cors';
// // // // // // import helmet from 'helmet';
// // // // // // import compression from 'compression';
// // // // // // import morgan from 'morgan';
// // // // // // import cookieParser from 'cookie-parser';
// // // // // // import path from 'path';
// // // // // // import fs from 'fs';
// // // // // // import mongoose from 'mongoose';

// // // // // // // Import Library untuk cek koneksi
// // // // // // import { v2 as cloudinary } from 'cloudinary';
// // // // // // import { createClient } from '@supabase/supabase-js';

// // // // // // // --- IMPORT ROUTES ---
// // // // // // import authRoutes from './routes/authentication'; 
// // // // // // import courseRoutes from './routes/courses';
// // // // // // import userRoutes from './routes/users';
// // // // // // import progressRoutes from './routes/progress';
// // // // // // import certificateRoutes from './routes/certificates';
// // // // // // import uploadRoutes from './routes/upload';
// // // // // // import adminUserRoutes from './routes/admin-user'; 
// // // // // // import forumRoutes from './routes/forum';
// // // // // // import libraryRoutes from './routes/library';
// // // // // // import contentRoutes from './routes/content';
// // // // // // import quizRoutes from './routes/quiz';
// // // // // // import chatRoutes from './routes/chat';
// // // // // // import notificationRoutes from './routes/notification';
// // // // // // import blogRoutes from './routes/blog';
// // // // // // import classroomRoutes from './routes/classroom';
// // // // // // import enrollmentRoutes from './routes/enrollments';
// // // // // // import statsRoutes from './routes/stats';
// // // // // // import commentRoutes from './routes/comment';
// // // // // // // --- TAMBAHAN BARU (Import route material) ---
// // // // // // import materialRoutes from './routes/materialRoutes'; 


// // // // // // const app = express();


// // // // // // // --- 1. DATABASE CONNECTION (MONGODB) ---
// // // // // // const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://misdbpmi:misdbpmi@cluster0.l4lq1.mongodb.net/lms_db';

// // // // // // mongoose.set('strictQuery', true);

// // // // // // const connectDB = async () => {
// // // // // //   try {
// // // // // //     if (mongoose.connection.readyState === 0) {
// // // // // //       await mongoose.connect(MONGO_URI);
// // // // // //       console.log(`✅ [db]         Connected to MongoDB`);
// // // // // //     }
// // // // // //   } catch (err) {
// // // // // //     console.error('❌ [db]         Connection error:', err);
// // // // // //   }
// // // // // // };
// // // // // // connectDB();

// // // // // // // --- 2. INTEGRATION CHECK (SUPABASE & CLOUDINARY) ---
// // // // // // const checkIntegrations = async () => {
// // // // // //   // A. Cek Supabase
// // // // // //   if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY) {
// // // // // //     try {
// // // // // //       const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
// // // // // //       const { data, error } = await supabase.storage.listBuckets();
// // // // // //       if (!error) {
// // // // // //         console.log(`✅ [supabase]   Connected`);
// // // // // //       } else {
// // // // // //         console.log(`❌ [supabase]   Error: ${error.message}`);
// // // // // //       }
// // // // // //     } catch (err) {
// // // // // //       console.log(`❌ [supabase]   Connection Failed`);
// // // // // //     }
// // // // // //   } else {
// // // // // //     console.log(`⚠️ [supabase]   Skipped (Missing .env variables)`);
// // // // // //   }

// // // // // //   // B. Cek Cloudinary (Logika Lebih Detail)
// // // // // //   const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
// // // // // //   const apiKey = process.env.CLOUDINARY_API_KEY;
// // // // // //   const apiSecret = process.env.CLOUDINARY_API_SECRET;

// // // // // //   if (cloudName && apiKey && apiSecret) {
// // // // // //     try {
// // // // // //       cloudinary.config({
// // // // // //         cloud_name: cloudName,
// // // // // //         api_key: apiKey,
// // // // // //         api_secret: apiSecret,
// // // // // //       });
// // // // // //       // Ping server Cloudinary untuk memastikan kunci benar
// // // // // //       await cloudinary.api.ping();
// // // // // //       console.log(`✅ [cloudinary] Connected (Cloud: ${cloudName})`);
// // // // // //     } catch (err: any) {
// // // // // //       console.log(`❌ [cloudinary] Connection Failed: ${err.message}`);
// // // // // //     }
// // // // // //   } else {
// // // // // //     // Beritahu user variabel mana yang belum terbaca
// // // // // //     console.log(`⚠️ [cloudinary] Skipped. Variabel .env belum lengkap:`);
// // // // // //     if (!cloudName) console.log(`   - CLOUDINARY_CLOUD_NAME tidak terbaca`);
// // // // // //     if (!apiKey) console.log(`   - CLOUDINARY_API_KEY tidak terbaca`);
// // // // // //     if (!apiSecret) console.log(`   - CLOUDINARY_API_SECRET tidak terbaca`);
// // // // // //   }
// // // // // // };

// // // // // // // --- CORS CONFIGURATION ---
// // // // // // const corsConfig: cors.CorsOptions = {
// // // // // //   origin: true, 
// // // // // //   credentials: true,
// // // // // //   allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With', 'Origin', 'x-google-token'],
// // // // // //   methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
// // // // // // };

// // // // // // app.use(cors(corsConfig));
// // // // // // app.options('*', cors(corsConfig)); 

// // // // // // // --- MIDDLEWARE ---
// // // // // // app.use(helmet({ 
// // // // // //   crossOriginResourcePolicy: false,
// // // // // //   contentSecurityPolicy: false 
// // // // // // })); 
// // // // // // app.use(compression());
// // // // // // app.use(morgan('dev'));

// // // // // // app.use(express.json({ limit: '50mb' }));
// // // // // // app.use(express.urlencoded({ extended: true, limit: '50mb' }));
// // // // // // app.use(cookieParser(process.env.COOKIE_SECRET || 'pmi-secret'));

// // // // // // // --- STATIC FILES ---
// // // // // // const UPLOADS_PATH = path.join(process.cwd(), 'public', 'uploads'); 
// // // // // // if (!fs.existsSync(UPLOADS_PATH)) {
// // // // // //     try { fs.mkdirSync(UPLOADS_PATH, { recursive: true }); } catch(e) {} 
// // // // // // }
// // // // // // app.use('/uploads', express.static(UPLOADS_PATH));

// // // // // // // --- ROUTES REGISTRATION ---
// // // // // // app.get('/', (req, res) => res.send('LMS PMI Backend is Running!'));
// // // // // // app.get('/api/health', (_req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

// // // // // // app.use('/api/courses/certificate', certificateRoutes);
// // // // // // app.use('/api/auth', authRoutes);
// // // // // // app.use('/api/users', userRoutes);
// // // // // // app.use('/api/admin/users', adminUserRoutes);
// // // // // // app.use('/api/courses', courseRoutes);
// // // // // // app.use('/api/content', contentRoutes);
// // // // // // app.use('/api/progress', progressRoutes);
// // // // // // app.use('/api/certificates', certificateRoutes);
// // // // // // app.use('/api/quiz', quizRoutes);
// // // // // // app.use('/api/classroom', classroomRoutes);
// // // // // // app.use('/api/forum', forumRoutes);
// // // // // // app.use('/api/chat', chatRoutes);
// // // // // // app.use('/api/notifications', notificationRoutes);
// // // // // // app.use('/api/blog', blogRoutes);
// // // // // // app.use('/api/library', libraryRoutes);
// // // // // // app.use('/api/stats', statsRoutes);
// // // // // // app.use('/api/upload', uploadRoutes); 
// // // // // // app.use('/upload', uploadRoutes);
// // // // // // app.use('/api/enrollments', enrollmentRoutes);
// // // // // // app.use('/api/comment', commentRoutes);

// // // // // // // --- TAMBAHAN BARU (Registrasi route material) ---
// // // // // // app.use('/api/materials', materialRoutes);

// // // // // // // --- ERROR HANDLERS ---
// // // // // // app.use((req, res, next) => {
// // // // // //     if (req.url.includes('/uploads/')) return next();
// // // // // //     res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
// // // // // // });

// // // // // // app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
// // // // // //   console.error("❌ Global Error:", err.message);
// // // // // //   if (err.name === 'ZodError') {
// // // // // //     return res.status(400).json({ error: 'Validation error', issues: err.issues });
// // // // // //   }
// // // // // //   res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
// // // // // // });

// // // // // // // --- SERVER LISTEN ---
// // // // // // const PORT = process.env.PORT || 4000;

// // // // // // app.listen(PORT, async () => {
// // // // // //   console.log(`🚀 [server]     Server running on port ${PORT}`);
// // // // // //   // Jalankan cek integrasi
// // // // // //   await checkIntegrations();
// // // // // // });

// // // // // // export default app;


// // // // // import 'dotenv/config'; 
// // // // // import express from 'express';
// // // // // import cors from 'cors';
// // // // // import helmet from 'helmet';
// // // // // import compression from 'compression';
// // // // // import morgan from 'morgan';
// // // // // import cookieParser from 'cookie-parser';
// // // // // import path from 'path';
// // // // // import fs from 'fs';
// // // // // import mongoose from 'mongoose';

// // // // // // Import Library untuk cek koneksi
// // // // // import { v2 as cloudinary } from 'cloudinary';
// // // // // import { createClient } from '@supabase/supabase-js';

// // // // // // --- IMPORT ROUTES ---
// // // // // import authRoutes from './routes/authentication'; 
// // // // // import courseRoutes from './routes/courses';
// // // // // import userRoutes from './routes/users';
// // // // // import progressRoutes from './routes/progress';
// // // // // import certificateRoutes from './routes/certificates';
// // // // // import uploadRoutes from './routes/upload';
// // // // // import adminUserRoutes from './routes/admin-user'; 
// // // // // import forumRoutes from './routes/forum';
// // // // // import libraryRoutes from './routes/library';
// // // // // import contentRoutes from './routes/content';
// // // // // import quizRoutes from './routes/quiz';
// // // // // import chatRoutes from './routes/chat';
// // // // // import notificationRoutes from './routes/notification';
// // // // // import blogRoutes from './routes/blog';
// // // // // import classroomRoutes from './routes/classroom';
// // // // // import enrollmentRoutes from './routes/enrollments';
// // // // // import statsRoutes from './routes/stats';
// // // // // import commentRoutes from './routes/comment';
// // // // // import materialRoutes from './routes/materialRoutes'; 




// // // // // const app = express();


// // // // // // --- 1. DATABASE CONNECTION (MONGODB) ---
// // // // // const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://misdbpmi:misdbpmi@cluster0.l4lq1.mongodb.net/lms_db';

// // // // // mongoose.set('strictQuery', true);

// // // // // const connectDB = async () => {
// // // // //   try {
// // // // //     if (mongoose.connection.readyState === 0) {
// // // // //       await mongoose.connect(MONGO_URI);
// // // // //       console.log(`✅ [db]         Connected to MongoDB`);
// // // // //     }
// // // // //   } catch (err) {
// // // // //     console.error('❌ [db]         Connection error:', err);
// // // // //   }
// // // // // };
// // // // // connectDB();

// // // // // // --- 2. INTEGRATION CHECK (SUPABASE & CLOUDINARY) ---
// // // // // const checkIntegrations = async () => {
// // // // //   // A. Cek Supabase
// // // // //   if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY) {
// // // // //     try {
// // // // //       const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
// // // // //       const { data, error } = await supabase.storage.listBuckets();
// // // // //       if (!error) {
// // // // //         console.log(`✅ [supabase]   Connected`);
// // // // //       } else {
// // // // //         console.log(`❌ [supabase]   Error: ${error.message}`);
// // // // //       }
// // // // //     } catch (err) {
// // // // //       console.log(`❌ [supabase]   Connection Failed`);
// // // // //     }
// // // // //   } else {
// // // // //     console.log(`⚠️ [supabase]   Skipped (Missing .env variables)`);
// // // // //   }

// // // // //   // B. Cek Cloudinary
// // // // //   const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
// // // // //   const apiKey = process.env.CLOUDINARY_API_KEY;
// // // // //   const apiSecret = process.env.CLOUDINARY_API_SECRET;

// // // // //   if (cloudName && apiKey && apiSecret) {
// // // // //     try {
// // // // //       cloudinary.config({
// // // // //         cloud_name: cloudName,
// // // // //         api_key: apiKey,
// // // // //         api_secret: apiSecret,
// // // // //       });
// // // // //       await cloudinary.api.ping();
// // // // //       console.log(`✅ [cloudinary] Connected (Cloud: ${cloudName})`);
// // // // //     } catch (err: any) {
// // // // //       console.log(`❌ [cloudinary] Connection Failed: ${err.message}`);
// // // // //     }
// // // // //   } else {
// // // // //     console.log(`⚠️ [cloudinary] Skipped. Variabel .env belum lengkap`);
// // // // //   }
// // // // // };

// // // // // // --- CORS CONFIGURATION ---
// // // // // const corsConfig: cors.CorsOptions = {
// // // // //   origin: true, 
// // // // //   credentials: true,
// // // // //   allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With', 'Origin', 'x-google-token'],
// // // // //   methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
// // // // // };

// // // // // app.use(cors(corsConfig));
// // // // // app.options('*', cors(corsConfig)); 

// // // // // // --- MIDDLEWARE ---
// // // // // app.use(helmet({ 
// // // // //   crossOriginResourcePolicy: false,
// // // // //   contentSecurityPolicy: false 
// // // // // })); 
// // // // // app.use(compression());
// // // // // app.use(morgan('dev'));

// // // // // app.use(express.json({ limit: '50mb' }));
// // // // // app.use(express.urlencoded({ extended: true, limit: '50mb' }));
// // // // // app.use(cookieParser(process.env.COOKIE_SECRET || 'pmi-secret'));

// // // // // // --- 3. STATIC FILES (PERBAIKAN) ---
// // // // // // Gunakan path absolut untuk folder public dan uploads
// // // // // const PUBLIC_PATH = path.join(process.cwd(), 'public');
// // // // // const UPLOADS_PATH = path.join(PUBLIC_PATH, 'uploads');

// // // // // // Buat folder uploads secara otomatis jika belum ada
// // // // // if (!fs.existsSync(UPLOADS_PATH)) {
// // // // //   try { 
// // // // //     fs.mkdirSync(UPLOADS_PATH, { recursive: true }); 
// // // // //     console.log(`📁 [fs]         Folder uploads created at ${UPLOADS_PATH}`);
// // // // //   } catch(e) {
// // // // //     console.error(`❌ [fs]         Failed to create folder:`, e);
// // // // //   } 
// // // // // }

// // // // // // Melayani folder uploads pada route /uploads
// // // // // // PENTING: Tambahkan setHeaders untuk mengatasi masalah karakter khusus/spasi
// // // // // app.use('/uploads', express.static(UPLOADS_PATH, {
// // // // //   setHeaders: (res) => {
// // // // //     res.set('Access-Control-Allow-Origin', '*');
// // // // //     res.set('Cross-Origin-Resource-Policy', 'cross-origin');
// // // // //   }
// // // // // }));

// // // // // // Melayani folder public secara umum
// // // // // app.use(express.static(PUBLIC_PATH));


// // // // // // --- ROUTES REGISTRATION ---
// // // // // app.get('/', (req, res) => res.send('LMS PMI Backend is Running!'));
// // // // // app.get('/api/health', (_req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

// // // // // app.use('/api/courses/certificate', certificateRoutes);
// // // // // app.use('/api/auth', authRoutes);
// // // // // app.use('/api/users', userRoutes);
// // // // // app.use('/api/admin/users', adminUserRoutes);
// // // // // app.use('/api/courses', courseRoutes);
// // // // // app.use('/api/content', contentRoutes);
// // // // // app.use('/api/progress', progressRoutes);
// // // // // app.use('/api/certificates', certificateRoutes);
// // // // // app.use('/api/quiz', quizRoutes);
// // // // // app.use('/api/classroom', classroomRoutes);
// // // // // app.use('/api/forum', forumRoutes);
// // // // // app.use('/api/chat', chatRoutes);
// // // // // app.use('/api/notifications', notificationRoutes);
// // // // // app.use('/api/blog', blogRoutes);
// // // // // app.use('/api/library', libraryRoutes);
// // // // // app.use('/api/stats', statsRoutes);
// // // // // app.use('/api/upload', uploadRoutes); 
// // // // // app.use('/upload', uploadRoutes);
// // // // // app.use('/api/enrollments', enrollmentRoutes);
// // // // // app.use('/api/comment', commentRoutes);
// // // // // app.use('/api/materials', materialRoutes);

// // // // // // --- 4. ERROR HANDLERS (PERBAIKAN) ---
// // // // // // Handler 404 - Pastikan tidak memotong request file yang valid
// // // // // app.use((req, res, next) => {
// // // // //     // Jika request mengarah ke /uploads tapi sampai ke sini, berarti file memang tidak ada
// // // // //     if (req.url.startsWith('/uploads/')) {
// // // // //         return res.status(404).json({ error: 'File not found' });
// // // // //     }
// // // // //     res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
// // // // // });

// // // // // // Global Error Handler
// // // // // app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
// // // // //   console.error("❌ Global Error:", err.message);
// // // // //   if (err.name === 'ZodError') {
// // // // //     return res.status(400).json({ error: 'Validation error', issues: err.issues });
// // // // //   }
// // // // //   res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
// // // // // });

// // // // // // --- SERVER LISTEN ---
// // // // // const PORT = process.env.PORT || 4000;

// // // // // app.listen(PORT, async () => {
// // // // //   console.log(`🚀 [server]     Server running on port ${PORT}`);
// // // // //   await checkIntegrations();
// // // // // });

// // // // // export default app;



// // // // import 'dotenv/config'; 
// // // // import express from 'express';
// // // // import cors from 'cors';
// // // // import helmet from 'helmet';
// // // // import compression from 'compression';
// // // // import morgan from 'morgan';
// // // // import cookieParser from 'cookie-parser';
// // // // import path from 'path';
// // // // import fs from 'fs';
// // // // import mongoose from 'mongoose';

// // // // // Import Library untuk cek koneksi
// // // // import { v2 as cloudinary } from 'cloudinary';
// // // // import { createClient } from '@supabase/supabase-js';

// // // // // --- IMPORT ROUTES ---
// // // // // [PENTING] Ini memuat file authentication.ts yang berisi perbaikan Login & endpoint /me
// // // // import authRoutes from './routes/authentication'; 
// // // // import courseRoutes from './routes/courses';
// // // // import userRoutes from './routes/users';
// // // // import progressRoutes from './routes/progress';
// // // // import certificateRoutes from './routes/certificates';
// // // // import uploadRoutes from './routes/upload';
// // // // import adminUserRoutes from './routes/admin-user'; 
// // // // import forumRoutes from './routes/forum';
// // // // import libraryRoutes from './routes/library';
// // // // import contentRoutes from './routes/content';
// // // // import quizRoutes from './routes/quiz';
// // // // import chatRoutes from './routes/chat';
// // // // import notificationRoutes from './routes/notification';
// // // // import blogRoutes from './routes/blog';
// // // // import classroomRoutes from './routes/classroom';
// // // // import enrollmentRoutes from './routes/enrollments';
// // // // import statsRoutes from './routes/stats';
// // // // import commentRoutes from './routes/comment';
// // // // import materialRoutes from './routes/materialRoutes'; 
// // // // import systemRoutes from './routes/system'; // <--- Import file system.ts yang baru


// // // // const app = express();

// // // // // --- 1. DATABASE CONNECTION (MONGODB) ---
// // // // const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://misdbpmi:misdbpmi@cluster0.l4lq1.mongodb.net/lms_db';

// // // // mongoose.set('strictQuery', true);

// // // // const connectDB = async () => {
// // // //   try {
// // // //     if (mongoose.connection.readyState === 0) {
// // // //       await mongoose.connect(MONGO_URI);
// // // //       console.log(`✅ [db]         Connected to MongoDB`);
// // // //     }
// // // //   } catch (err) {
// // // //     console.error('❌ [db]         Connection error:', err);
// // // //   }
// // // // };
// // // // connectDB();

// // // // // --- 2. INTEGRATION CHECK (SUPABASE & CLOUDINARY) ---
// // // // const checkIntegrations = async () => {
// // // //   // A. Cek Supabase
// // // //   if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY) {
// // // //     try {
// // // //       const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
// // // //       const { data, error } = await supabase.storage.listBuckets();
// // // //       if (!error) {
// // // //         console.log(`✅ [supabase]   Connected`);
// // // //       } else {
// // // //         console.log(`❌ [supabase]   Error: ${error.message}`);
// // // //       }
// // // //     } catch (err) {
// // // //       console.log(`❌ [supabase]   Connection Failed`);
// // // //     }
// // // //   } else {
// // // //     console.log(`⚠️ [supabase]   Skipped (Missing .env variables)`);
// // // //   }

// // // //   // B. Cek Cloudinary
// // // //   const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
// // // //   const apiKey = process.env.CLOUDINARY_API_KEY;
// // // //   const apiSecret = process.env.CLOUDINARY_API_SECRET;

// // // //   if (cloudName && apiKey && apiSecret) {
// // // //     try {
// // // //       cloudinary.config({
// // // //         cloud_name: cloudName,
// // // //         api_key: apiKey,
// // // //         api_secret: apiSecret,
// // // //       });
// // // //       await cloudinary.api.ping();
// // // //       console.log(`✅ [cloudinary] Connected (Cloud: ${cloudName})`);
// // // //     } catch (err: any) {
// // // //       console.log(`❌ [cloudinary] Connection Failed: ${err.message}`);
// // // //     }
// // // //   } else {
// // // //     console.log(`⚠️ [cloudinary] Skipped. Variabel .env belum lengkap`);
// // // //   }
// // // // };

// // // // // --- CORS CONFIGURATION ---
// // // // const corsConfig: cors.CorsOptions = {
// // // //   origin: true, 
// // // //   credentials: true,
// // // //   allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With', 'Origin', 'x-google-token'],
// // // //   methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
// // // // };

// // // // app.use(cors(corsConfig));
// // // // app.options('*', cors(corsConfig)); 

// // // // // --- MIDDLEWARE ---
// // // // app.use(helmet({ 
// // // //   crossOriginResourcePolicy: false,
// // // //   contentSecurityPolicy: false 
// // // // })); 
// // // // app.use(compression());
// // // // app.use(morgan('dev'));

// // // // app.use(express.json({ limit: '50mb' }));
// // // // app.use(express.urlencoded({ extended: true, limit: '50mb' }));
// // // // app.use(cookieParser(process.env.COOKIE_SECRET || 'pmi-secret'));

// // // // // --- 3. STATIC FILES ---
// // // // const PUBLIC_PATH = path.join(process.cwd(), 'public');
// // // // const UPLOADS_PATH = path.join(PUBLIC_PATH, 'uploads');

// // // // if (!fs.existsSync(UPLOADS_PATH)) {
// // // //   try { 
// // // //     fs.mkdirSync(UPLOADS_PATH, { recursive: true }); 
// // // //     console.log(`📁 [fs]         Folder uploads created at ${UPLOADS_PATH}`);
// // // //   } catch(e) {
// // // //     console.error(`❌ [fs]         Failed to create folder:`, e);
// // // //   } 
// // // // }

// // // // app.use('/uploads', express.static(UPLOADS_PATH, {
// // // //   setHeaders: (res) => {
// // // //     res.set('Access-Control-Allow-Origin', '*');
// // // //     res.set('Cross-Origin-Resource-Policy', 'cross-origin');
// // // //   }
// // // // }));

// // // // app.use(express.static(PUBLIC_PATH));

// // // // // --- ROUTES REGISTRATION ---
// // // // app.get('/', (req, res) => res.send('LMS PMI Backend is Running!'));
// // // // app.get('/api/health', (_req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

// // // // // [ROUTE AUTHENTICATION] - Kunci perbaikan login
// // // // app.use('/api/auth', authRoutes);

// // // // app.use('/api/courses/certificate', certificateRoutes);
// // // // app.use('/api/users', userRoutes);
// // // // app.use('/api/admin/users', adminUserRoutes);
// // // // app.use('/api/courses', courseRoutes);
// // // // app.use('/api/content', contentRoutes);
// // // // app.use('/api/progress', progressRoutes);
// // // // app.use('/api/certificates', certificateRoutes);
// // // // app.use('/api/quiz', quizRoutes);
// // // // app.use('/api/classroom', classroomRoutes);
// // // // app.use('/api/forum', forumRoutes);
// // // // app.use('/api/chat', chatRoutes);
// // // // app.use('/api/notifications', notificationRoutes);
// // // // app.use('/api/blog', blogRoutes);
// // // // app.use('/api/library', libraryRoutes);
// // // // app.use('/api/stats', statsRoutes);
// // // // app.use('/api/upload', uploadRoutes); 
// // // // app.use('/upload', uploadRoutes);
// // // // app.use('/api/enrollments', enrollmentRoutes);
// // // // app.use('/api/comment', commentRoutes);
// // // // app.use('/api/materials', materialRoutes);
// // // // // app.use('/api/admin', systemRoutes);

// // // // // --- 4. ERROR HANDLERS ---
// // // // app.use((req, res, next) => {
// // // //     if (req.url.startsWith('/uploads/')) {
// // // //         return res.status(404).json({ error: 'File not found' });
// // // //     }
// // // //     res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
// // // // });

// // // // app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
// // // //   console.error("❌ Global Error:", err.message);
// // // //   if (err.name === 'ZodError') {
// // // //     return res.status(400).json({ error: 'Validation error', issues: err.issues });
// // // //   }
// // // //   res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
// // // // });

// // // // // --- SERVER LISTEN ---
// // // // const PORT = process.env.PORT || 4000;

// // // // app.listen(PORT, async () => {
// // // //   console.log(`🚀 [server]     Server running on port ${PORT}`);
// // // //   await checkIntegrations();
// // // // });

// // // // export default app;


// // // import 'dotenv/config'; 
// // // import express from 'express';
// // // import cors from 'cors';
// // // import helmet from 'helmet';
// // // import compression from 'compression';
// // // import morgan from 'morgan';
// // // import cookieParser from 'cookie-parser';
// // // import path from 'path';
// // // import fs from 'fs';
// // // import mongoose from 'mongoose';

// // // // Import Library untuk cek koneksi
// // // import { v2 as cloudinary } from 'cloudinary';
// // // import { createClient } from '@supabase/supabase-js';

// // // // --- IMPORT ROUTES ---
// // // // [PENTING] Ini memuat file authentication.ts yang berisi perbaikan Login & endpoint /me
// // // import authRoutes from './routes/authentication'; 
// // // import courseRoutes from './routes/courses';
// // // import userRoutes from './routes/users';
// // // import progressRoutes from './routes/progress';
// // // import certificateRoutes from './routes/certificates';
// // // import uploadRoutes from './routes/upload';
// // // import adminUserRoutes from './routes/admin-user'; 
// // // import forumRoutes from './routes/forum';
// // // import libraryRoutes from './routes/library';
// // // import contentRoutes from './routes/content';
// // // import quizRoutes from './routes/quiz';
// // // import chatRoutes from './routes/chat';
// // // import notificationRoutes from './routes/notification';
// // // import blogRoutes from './routes/blog';
// // // import classroomRoutes from './routes/classroom';
// // // import enrollmentRoutes from './routes/enrollments';
// // // import statsRoutes from './routes/stats';
// // // import commentRoutes from './routes/comment';
// // // import materialRoutes from './routes/materialRoutes'; 
// // // import systemRoutes from './routes/system'; // <--- Import file system.ts yang baru
// // // import { pgPool } from './config/pgClient'; // [TAMBAHKAN INI]


// // // const app = express();

// // // // --- 1. DATABASE CONNECTION (MONGODB) ---
// // // const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://misdbpmi:misdbpmi@cluster0.l4lq1.mongodb.net/lms_db';

// // // mongoose.set('strictQuery', true);

// // // const connectDB = async () => {
// // //   try {
// // //     if (mongoose.connection.readyState === 0) {
// // //       await mongoose.connect(MONGO_URI);
// // //       console.log(`✅ [db]         Connected to MongoDB`);
// // //     }
// // //   } catch (err) {
// // //     console.error('❌ [db]         Connection error:', err);
// // //   }
// // // };
// // // connectDB();

// // // // --- 2. INTEGRATION CHECK (SUPABASE & CLOUDINARY) ---
// // // const checkIntegrations = async () => {
// // //   // A. Cek Supabase
// // //   if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY) {
// // //     try {
// // //       const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
// // //       const { data, error } = await supabase.storage.listBuckets();
// // //       if (!error) {
// // //         console.log(`✅ [supabase]   Connected`);
// // //       } else {
// // //         console.log(`❌ [supabase]   Error: ${error.message}`);
// // //       }
// // //     } catch (err) {
// // //       console.log(`❌ [supabase]   Connection Failed`);
// // //     }
// // //   } else {
// // //     console.log(`⚠️ [supabase]   Skipped (Missing .env variables)`);
// // //   }

// // //   // B. Cek Cloudinary
// // //   const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
// // //   const apiKey = process.env.CLOUDINARY_API_KEY;
// // //   const apiSecret = process.env.CLOUDINARY_API_SECRET;

// // //   if (cloudName && apiKey && apiSecret) {
// // //     try {
// // //       cloudinary.config({
// // //         cloud_name: cloudName,
// // //         api_key: apiKey,
// // //         api_secret: apiSecret,
// // //       });
// // //       await cloudinary.api.ping();
// // //       console.log(`✅ [cloudinary] Connected (Cloud: ${cloudName})`);
// // //     } catch (err: any) {
// // //       console.log(`❌ [cloudinary] Connection Failed: ${err.message}`);
// // //     }
// // //   } else {
// // //     console.log(`⚠️ [cloudinary] Skipped. Variabel .env belum lengkap`);
// // //   }
// // // };

// // // // --- CORS CONFIGURATION ---
// // // const corsConfig: cors.CorsOptions = {
// // //   origin: true, 
// // //   credentials: true,
// // //   allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With', 'Origin', 'x-google-token'],
// // //   methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
// // // };

// // // app.use(cors(corsConfig));
// // // app.options('*', cors(corsConfig)); 

// // // // --- MIDDLEWARE ---
// // // app.use(helmet({ 
// // //   crossOriginResourcePolicy: false,
// // //   contentSecurityPolicy: false 
// // // })); 
// // // app.use(compression());
// // // app.use(morgan('dev'));

// // // app.use(express.json({ limit: '50mb' }));
// // // app.use(express.urlencoded({ extended: true, limit: '50mb' }));
// // // app.use(cookieParser(process.env.COOKIE_SECRET || 'pmi-secret'));

// // // // --- 3. STATIC FILES ---
// // // const PUBLIC_PATH = path.join(process.cwd(), 'public');
// // // const UPLOADS_PATH = path.join(PUBLIC_PATH, 'uploads');

// // // if (!fs.existsSync(UPLOADS_PATH)) {
// // //   try { 
// // //     fs.mkdirSync(UPLOADS_PATH, { recursive: true }); 
// // //     console.log(`📁 [fs]         Folder uploads created at ${UPLOADS_PATH}`);
// // //   } catch(e) {
// // //     console.error(`❌ [fs]         Failed to create folder:`, e);
// // //   } 
// // // }

// // // app.use('/uploads', express.static(UPLOADS_PATH, {
// // //   setHeaders: (res) => {
// // //     res.set('Access-Control-Allow-Origin', '*');
// // //     res.set('Cross-Origin-Resource-Policy', 'cross-origin');
// // //   }
// // // }));

// // // app.use(express.static(PUBLIC_PATH));

// // // // --- ROUTES REGISTRATION ---
// // // app.get('/', (req, res) => res.send('LMS PMI Backend is Running!'));
// // // app.get('/api/health', (_req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

// // // // [ROUTE AUTHENTICATION] - Kunci perbaikan login
// // // app.use('/api/auth', authRoutes);

// // // app.use('/api/courses/certificate', certificateRoutes);
// // // app.use('/api/users', userRoutes);

// // // // [ROUTE ADMIN]
// // // // Route spesifik user admin (agar tidak bentrok dengan route admin umum)
// // // app.use('/api/admin/users', adminUserRoutes); 

// // // // Route umum admin (untuk backup & sync system)
// // // // Ditaruh setelah admin/users agar routing spesifik diproses duluan
// // // app.use('/api/admin', systemRoutes); 

// // // app.use('/api/courses', courseRoutes);
// // // app.use('/api/content', contentRoutes);
// // // app.use('/api/progress', progressRoutes);
// // // app.use('/api/certificates', certificateRoutes);
// // // app.use('/api/quiz', quizRoutes);
// // // app.use('/api/classroom', classroomRoutes);
// // // app.use('/api/forum', forumRoutes);
// // // app.use('/api/chat', chatRoutes);
// // // app.use('/api/notifications', notificationRoutes);
// // // app.use('/api/blog', blogRoutes);
// // // app.use('/api/library', libraryRoutes);
// // // app.use('/api/stats', statsRoutes);
// // // app.use('/api/upload', uploadRoutes); 
// // // app.use('/upload', uploadRoutes);
// // // app.use('/api/enrollments', enrollmentRoutes);
// // // app.use('/api/comment', commentRoutes);
// // // app.use('/api/materials', materialRoutes);


// // // // --- 4. ERROR HANDLERS ---
// // // app.use((req, res, next) => {
// // //     if (req.url.startsWith('/uploads/')) {
// // //         return res.status(404).json({ error: 'File not found' });
// // //     }
// // //     res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
// // // });

// // // app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
// // //   console.error("❌ Global Error:", err.message);
// // //   if (err.name === 'ZodError') {
// // //     return res.status(400).json({ error: 'Validation error', issues: err.issues });
// // //   }
// // //   res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
// // // });

// // // // --- SERVER LISTEN ---
// // // const PORT = process.env.PORT || 4000;

// // // app.listen(PORT, async () => {
// // //   console.log(`🚀 [server]     Server running on port ${PORT}`);
// // //   await checkIntegrations();
// // // });

// // // export default app;

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

// // // Import Library untuk cek koneksi
// // import { v2 as cloudinary } from 'cloudinary';
// // import { createClient } from '@supabase/supabase-js';

// // // --- IMPORT ROUTES ---
// // // [PENTING] Ini memuat file authentication.ts yang berisi perbaikan Login & endpoint /me
// // import authRoutes from './routes/authentication'; 
// // import courseRoutes from './routes/courses';
// // import userRoutes from './routes/users';
// // import progressRoutes from './routes/progress';
// // import certificateRoutes from './routes/certificates';
// // import uploadRoutes from './routes/upload';
// // import adminUserRoutes from './routes/admin-user'; 
// // import forumRoutes from './routes/forum';
// // import libraryRoutes from './routes/library';
// // import contentRoutes from './routes/content';
// // import quizRoutes from './routes/quiz';
// // import chatRoutes from './routes/chat';
// // import notificationRoutes from './routes/notification';
// // import blogRoutes from './routes/blog';
// // import classroomRoutes from './routes/classroom';
// // import enrollmentRoutes from './routes/enrollments';
// // import statsRoutes from './routes/stats';
// // import commentRoutes from './routes/comment';
// // import materialRoutes from './routes/materialRoutes'; 
// // import systemRoutes from './routes/system'; // <--- Import file system.ts yang baru
// // import { pgPool } from './config/pgClient'; // [TAMBAHKAN INI]


// // const app = express();

// // // --- 1. DATABASE CONNECTION (MONGODB) ---
// // const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://misdbpmi:misdbpmi@cluster0.l4lq1.mongodb.net/lms_db';

// // mongoose.set('strictQuery', true);

// // const connectDB = async () => {
// //   try {
// //     if (mongoose.connection.readyState === 0) {
// //       await mongoose.connect(MONGO_URI);
// //       console.log(`✅ [db]         Connected to MongoDB`);
// //     }
// //   } catch (err) {
// //     console.error('❌ [db]         Connection error:', err);
// //   }
// // };
// // connectDB();

// // // --- 2. INTEGRATION CHECK (SUPABASE & CLOUDINARY) ---
// // const checkIntegrations = async () => {
// //   // A. Cek Postgres Private Server [LENGKAPI DI SINI]
// //   try {
// //     const client = await pgPool.connect();
// //     if (client) {
// //       console.log(`✅ [postgres]   Connected to Private Server`);
// //       client.release();
// //     }
// //   } catch (err: any) {
// //     console.log(`❌ [postgres]   Connection Failed: ${err.message}`);
// //   }

// //   // B. Cek Supabase
// //   if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY) {
// //     try {
// //       const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
// //       const { data, error } = await supabase.storage.listBuckets();
// //       if (!error) {
// //         console.log(`✅ [supabase]   Connected`);
// //       } else {
// //         console.log(`❌ [supabase]   Error: ${error.message}`);
// //       }
// //     } catch (err) {
// //       console.log(`❌ [supabase]   Connection Failed`);
// //     }
// //   } else {
// //     console.log(`⚠️ [supabase]   Skipped (Missing .env variables)`);
// //   }

// //   // C. Cek Cloudinary
// //   const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
// //   const apiKey = process.env.CLOUDINARY_API_KEY;
// //   const apiSecret = process.env.CLOUDINARY_API_SECRET;

// //   if (cloudName && apiKey && apiSecret) {
// //     try {
// //       cloudinary.config({
// //         cloud_name: cloudName,
// //         api_key: apiKey,
// //         api_secret: apiSecret,
// //       });
// //       await cloudinary.api.ping();
// //       console.log(`✅ [cloudinary] Connected (Cloud: ${cloudName})`);
// //     } catch (err: any) {
// //       console.log(`❌ [cloudinary] Connection Failed: ${err.message}`);
// //     }
// //   } else {
// //     console.log(`⚠️ [cloudinary] Skipped. Variabel .env belum lengkap`);
// //   }
// // };

// // // --- CORS CONFIGURATION ---
// // const corsConfig: cors.CorsOptions = {
// //   origin: true, 
// //   credentials: true,
// //   allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With', 'Origin', 'x-google-token'],
// //   methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
// // };

// // app.use(cors(corsConfig));
// // app.options('*', cors(corsConfig)); 

// // // --- MIDDLEWARE ---
// // app.use(helmet({ 
// //   crossOriginResourcePolicy: false,
// //   contentSecurityPolicy: false 
// // })); 
// // app.use(compression());
// // app.use(morgan('dev'));

// // app.use(express.json({ limit: '50mb' }));
// // app.use(express.urlencoded({ extended: true, limit: '50mb' }));
// // app.use(cookieParser(process.env.COOKIE_SECRET || 'pmi-secret'));

// // // --- 3. STATIC FILES ---
// // const PUBLIC_PATH = path.join(process.cwd(), 'public');
// // const UPLOADS_PATH = path.join(PUBLIC_PATH, 'uploads');

// // if (!fs.existsSync(UPLOADS_PATH)) {
// //   try { 
// //     fs.mkdirSync(UPLOADS_PATH, { recursive: true }); 
// //     console.log(`📁 [fs]         Folder uploads created at ${UPLOADS_PATH}`);
// //   } catch(e) {
// //     console.error(`❌ [fs]         Failed to create folder:`, e);
// //   } 
// // }

// // app.use('/uploads', express.static(UPLOADS_PATH, {
// //   setHeaders: (res) => {
// //     res.set('Access-Control-Allow-Origin', '*');
// //     res.set('Cross-Origin-Resource-Policy', 'cross-origin');
// //   }
// // }));

// // app.use(express.static(PUBLIC_PATH));

// // // --- ROUTES REGISTRATION ---
// // app.get('/', (req, res) => res.send('LMS PMI Backend is Running!'));
// // app.get('/api/health', (_req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

// // // [ROUTE AUTHENTICATION] - Kunci perbaikan login
// // app.use('/api/auth', authRoutes);

// // app.use('/api/courses/certificate', certificateRoutes);
// // app.use('/api/users', userRoutes);

// // // [ROUTE ADMIN]
// // // Route spesifik user admin (agar tidak bentrok dengan route admin umum)
// // app.use('/api/admin/users', adminUserRoutes); 

// // // Route umum admin (untuk backup & sync system)
// // // Ditaruh setelah admin/users agar routing spesifik diproses duluan
// // app.use('/api/admin', systemRoutes); 

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
// // app.use('/api/enrollments', enrollmentRoutes);
// // app.use('/api/comment', commentRoutes);
// // app.use('/api/materials', materialRoutes);


// // // --- 4. ERROR HANDLERS ---
// // app.use((req, res, next) => {
// //     if (req.url.startsWith('/uploads/')) {
// //         return res.status(404).json({ error: 'File not found' });
// //     }
// //     res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
// // });

// // app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
// //   console.error("❌ Global Error:", err.message);
// //   if (err.name === 'ZodError') {
// //     return res.status(400).json({ error: 'Validation error', issues: err.issues });
// //   }
// //   res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
// // });

// // // --- SERVER LISTEN ---
// // const PORT = process.env.PORT || 4000;

// // app.listen(PORT, async () => {
// //   console.log(`🚀 [server]     Server running on port ${PORT}`);
// //   await checkIntegrations();
// // });

// // export default app;





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
// import cron from 'node-cron'; // Penjadwalan otomatis

// // --- 1. INTEGRASI & DB CLIENTS ---
// import { v2 as cloudinary } from 'cloudinary';
// import { createClient } from '@supabase/supabase-js';
// import { pgPool } from './config/pgClient'; 
// import { triggerPostgresSync } from './controllers/syncController'; 

// // --- 2. IMPORT ROUTES ---
// import authRoutes from './routes/authentication'; 
// import courseRoutes from './routes/courses';
// import userRoutes from './routes/users';
// import progressRoutes from './routes/progress';
// import certificateRoutes from './routes/certificates';
// import uploadRoutes from './routes/upload';
// import adminUserRoutes from './routes/admin-user'; 
// import forumRoutes from './routes/forum';
// import libraryRoutes from './routes/library';
// import contentRoutes from './routes/content';
// import quizRoutes from './routes/quiz';
// import chatRoutes from './routes/chat';
// import notificationRoutes from './routes/notification';
// import blogRoutes from './routes/blog';
// import classroomRoutes from './routes/classroom';
// import enrollmentRoutes from './routes/enrollments';
// import statsRoutes from './routes/stats';
// import commentRoutes from './routes/comment';
// import materialRoutes from './routes/materialRoutes'; 
// import systemRoutes from './routes/system'; 

// const app = express();

// // --- 3. DATABASE CONNECTION (MONGODB) ---
// const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://misdbpmi:misdbpmi@cluster0.l4lq1.mongodb.net/lms_db';

// // Singleton Connection untuk Vercel
// let isConnected = false; // Cache status koneksi

// const connectDB = async () => {
//   // Jika sudah konek, jangan buat koneksi baru
//   if (isConnected && mongoose.connection.readyState === 1) {
//     return;
//   }

//   try {
//     // Matikan buffering. Jika koneksi gagal, sistem langsung lapor (fail fast)
//     // daripada membuat user menunggu loading selamanya.
//     mongoose.set('bufferCommands', false);

//     const db = await mongoose.connect(process.env.MONGODB_URI!, {
//       serverSelectionTimeoutMS: 5000, // Tunggu maksimal 5 detik untuk konek
//       socketTimeoutMS: 45000,         // Biarkan koneksi aktif selama 45 detik
//       maxPoolSize: 10,                // Batasi jumlah koneksi agar Atlas tidak overload
//     });

//     isConnected = !!db.connections[0].readyState;
//     console.log("✅ [db] Re-connected to MongoDB Atlas");
//   } catch (err: any) {
//     console.error("❌ [db] Connection error:", err.message);
//     isConnected = false;
//   }
// };

// // PENTING: Gunakan middleware ini agar setiap request memastikan DB aktif
// app.use(async (req, res, next) => {
//   await connectDB();
//   next();
// });

// // --- 4. INTEGRATION CHECK ---
// const checkIntegrations = async () => {
//   // A. Postgres Private Server
//   try {
//     const client = await pgPool.connect();
//     if (client) {
//       console.log(`✅ [postgres]   Connected to Private Server`);
//       client.release();
//     }
//   } catch (err: any) {
//     console.log(`❌ [postgres]   Connection Failed: ${err.message}`);
//   }

//   // B. Supabase
//   if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY) {
//     try {
//       const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
//       const { error } = await supabase.storage.listBuckets();
//       if (!error) console.log(`✅ [supabase]   Connected`);
//       else console.log(`❌ [supabase]   Error: ${error.message}`);
//     } catch (err) { console.log(`❌ [supabase]   Connection Failed`); }
//   }

//   // C. Cloudinary
//   if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY) {
//     try {
//       cloudinary.config({
//         cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//         api_key: process.env.CLOUDINARY_API_KEY,
//         api_secret: process.env.CLOUDINARY_API_SECRET,
//       });
//       await cloudinary.api.ping();
//       console.log(`✅ [cloudinary] Connected`);
//     } catch (err: any) { console.log(`❌ [cloudinary] Connection Failed: ${err.message}`); }
//   }
// };

// // --- 5. MIDDLEWARE CONFIG ---
// const corsConfig: cors.CorsOptions = {
//   origin: true, 
//   credentials: true,
//   allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With', 'Origin', 'x-google-token'],
//   methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
// };

// app.use(cors(corsConfig));
// app.options('*', cors(corsConfig)); 
// app.use(helmet({ crossOriginResourcePolicy: false, contentSecurityPolicy: false })); 
// app.use(compression());
// app.use(morgan('dev'));
// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ extended: true, limit: '50mb' }));
// app.use(cookieParser(process.env.COOKIE_SECRET || 'pmi-secret'));

// // --- 6. STATIC FILES & STORAGE ---
// const PUBLIC_PATH = path.join(process.cwd(), 'public');
// const UPLOADS_PATH = path.join(PUBLIC_PATH, 'uploads');

// if (!fs.existsSync(UPLOADS_PATH)) {
//   fs.mkdirSync(UPLOADS_PATH, { recursive: true }); 
// }

// app.use('/uploads', express.static(UPLOADS_PATH, {
//   setHeaders: (res) => {
//     res.set('Access-Control-Allow-Origin', '*');
//     res.set('Cross-Origin-Resource-Policy', 'cross-origin');
//   }
// }));
// app.use(express.static(PUBLIC_PATH));

// // --- 7. ROUTES REGISTRATION ---
// app.get('/', (req, res) => res.send('LMS PMI Backend is Running!'));
// app.get('/api/health', (_req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/admin/users', adminUserRoutes); 
// app.use('/api/admin', systemRoutes); 
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
// app.use('/api/enrollments', enrollmentRoutes);
// app.use('/api/comment', commentRoutes);
// app.use('/api/materials', materialRoutes);

// // --- 8. CRON JOB (AUTO SYNC JAM 12 MALAM) ---
// cron.schedule('0 0 * * *', async () => {
//   console.log('⏰ [cron] Memulai sinkronisasi harian...');
//   try {
//     const mockRes = { 
//       json: (d: any) => console.log('✅ [cron] Success:', d.message),
//       status: () => ({ json: (e: any) => console.error('❌ [cron] Failed:', e.error) })
//     };
//     await triggerPostgresSync({ user: { id: 'SYSTEM' } } as any, mockRes as any);
//   } catch (err) { console.error('❌ [cron] Error:', err); }
// });

// // --- 9. ERROR HANDLERS ---
// app.use((req, res) => res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` }));

// app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
//   console.error("❌ Global Error:", err.message);
//   if (err.name === 'ZodError') return res.status(400).json({ error: 'Validation error', issues: err.issues });
//   res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
// });

// // --- SERVER LISTEN ---
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, async () => {
//   console.log(`🚀 [server]     Server running on port ${PORT}`);
//   await checkIntegrations();
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
import cron from 'node-cron'; // Penjadwalan otomatis

// --- 1. INTEGRASI & DB CLIENTS ---
import { v2 as cloudinary } from 'cloudinary';
import { createClient } from '@supabase/supabase-js';
import { pgPool } from './config/pgClient'; 
import { triggerPostgresSync } from './controllers/syncController'; 

// --- 2. IMPORT ROUTES ---
import authRoutes from './routes/authentication'; 
import courseRoutes from './routes/courses';
import userRoutes from './routes/users';
import progressRoutes from './routes/progress';
import certificateRoutes from './routes/certificates';
import uploadRoutes from './routes/upload';
import adminUserRoutes from './routes/admin-user'; 
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
import materialRoutes from './routes/materialRoutes'; 
import systemRoutes from './routes/system'; 

const app = express();

// --- 3. DATABASE CONNECTION (MONGODB) ---
const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://misdbpmi:misdbpmi@cluster0.l4lq1.mongodb.net/lms_db';

// Singleton Connection untuk Vercel (Mencegah putus-nyambung)
let isConnected = false;
mongoose.set('strictQuery', true);
mongoose.set('bufferCommands', false); // Matikan buffering agar fail-fast di Vercel

const connectDB = async () => {
  // Jika sudah konek dan ready, gunakan koneksi lama
  if (isConnected && mongoose.connection.readyState === 1) return;
  
  try {
    const db = await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10
    });
    isConnected = !!db.connections[0].readyState;
    console.log(`✅ [db]         Connected to MongoDB Atlas`);
  } catch (err: any) {
    console.error('❌ [db]         Connection error:', err.message);
  }
};

// Middleware: Pastikan koneksi DB aktif di setiap request
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// --- 4. INTEGRATION CHECK ---
const checkIntegrations = async () => {
  // A. Postgres Private Server
  try {
    const client = await pgPool.connect();
    if (client) {
      console.log(`✅ [postgres]   Connected to Private Server`);
      client.release();
    }
  } catch (err: any) {
    console.log(`❌ [postgres]   Connection Failed: ${err.message}`);
  }

  // B. Supabase
  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY) {
    try {
      const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
      const { error } = await supabase.storage.listBuckets();
      if (!error) console.log(`✅ [supabase]   Connected`);
      else console.log(`❌ [supabase]   Error: ${error.message}`);
    } catch (err) { console.log(`❌ [supabase]   Connection Failed`); }
  }

  // C. Cloudinary
  if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY) {
    try {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });
      await cloudinary.api.ping();
      console.log(`✅ [cloudinary] Connected`);
    } catch (err: any) { console.log(`❌ [cloudinary] Connection Failed: ${err.message}`); }
  }
};

// --- 5. MIDDLEWARE CONFIG ---
const corsConfig: cors.CorsOptions = {
  origin: true, 
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With', 'Origin', 'x-google-token'],
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
};

app.use(cors(corsConfig));
app.options('*', cors(corsConfig)); 
app.use(helmet({ crossOriginResourcePolicy: false, contentSecurityPolicy: false })); 
app.use(compression());
app.use(morgan('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser(process.env.COOKIE_SECRET || 'pmi-secret'));

// --- 6. STATIC FILES & STORAGE (FIX VERCEL READ-ONLY ERROR) ---
const PUBLIC_PATH = path.join(process.cwd(), 'public');
const UPLOADS_PATH = path.join(PUBLIC_PATH, 'uploads');

// Cek apakah lingkungan adalah Vercel (Environment Variable bawaan Vercel)
const isVercel = process.env.VERCEL === '1';

// [PERBAIKAN UTAMA] Hanya buat folder jika BUKAN Vercel
if (!isVercel) {
  try { 
    if (!fs.existsSync(UPLOADS_PATH)) {
      fs.mkdirSync(UPLOADS_PATH, { recursive: true }); 
      console.log(`📁 [fs]         Folder uploads created at ${UPLOADS_PATH}`);
    }
  } catch(e) {
    console.error(`⚠️ [fs]         Skipped folder creation (Read-Only FS):`, e);
  } 
}

// Di Vercel, gunakan folder sementara (/tmp) jika terpaksa, atau folder uploads jika di lokal
app.use('/uploads', express.static(isVercel ? '/tmp' : UPLOADS_PATH, {
  setHeaders: (res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Cross-Origin-Resource-Policy', 'cross-origin');
  }
}));

app.use(express.static(PUBLIC_PATH));

// --- 7. ROUTES REGISTRATION ---
app.get('/', (req, res) => res.send('LMS PMI Backend is Running!'));
app.get('/api/health', (_req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin/users', adminUserRoutes); 
app.use('/api/admin', systemRoutes); 
app.use('/api/courses', courseRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/classroom', classroomRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/library', libraryRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/upload', uploadRoutes); 
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/materials', materialRoutes);

// --- 8. CRON JOB (AUTO SYNC JAM 12 MALAM) ---
cron.schedule('0 0 * * *', async () => {
  console.log('⏰ [cron] Memulai sinkronisasi harian...');
  try {
    const mockRes = { 
      json: (d: any) => console.log('✅ [cron] Success:', d.message),
      status: () => ({ json: (e: any) => console.error('❌ [cron] Failed:', e.error) })
    };
    await triggerPostgresSync({ user: { id: 'SYSTEM' } } as any, mockRes as any);
  } catch (err) { console.error('❌ [cron] Error:', err); }
});

// --- 9. ERROR HANDLERS ---
app.use((req, res) => res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` }));

app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("❌ Global Error:", err.message);
  if (err.name === 'ZodError') return res.status(400).json({ error: 'Validation error', issues: err.issues });
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// --- SERVER LISTEN ---
const PORT = process.env.PORT || 4000;
app.listen(PORT, async () => {
  console.log(`🚀 [server]     Server running on port ${PORT}`);
  // Cek integrasi saat startup
  await checkIntegrations();
});

export default app;
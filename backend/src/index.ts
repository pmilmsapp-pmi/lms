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

// // --- IMPORT ROUTES (SESUAI SCREENSHOT FOLDER ANDA) ---
// // Semua menggunakan huruf kecil
// import authRoutes from './routes/auth'; 
// import courseRoutes from './routes/courses'; // Pastikan ada courses.ts
// import userRoutes from './routes/users';     // Pastikan ada users.ts
// import progressRoutes from './routes/progress'; // Pastikan ada progress.ts
// import certificateRoutes from './routes/certificates';
// import uploadRoutes from './routes/upload'; // Pastikan ada upload.ts
// import adminUserRoutes from './routes/admin-user'; // [PENTING] Sesuai nama file admin-user.ts
// import forumRoutes from './routes/forum'; // Pastikan ada forum.ts
// import libraryRoutes from './routes/library';
// import contentRoutes from './routes/content';
// import quizRoutes from './routes/quiz';
// import chatRoutes from './routes/chat';
// import notificationRoutes from './routes/notification'; // Pastikan ada notification.ts
// import blogRoutes from './routes/blog';
// import classroomRoutes from './routes/classroom';
// import enrollmentRoutes from './routes/enrollments'; // Pastikan ada enrollments.ts
// import statsRoutes from './routes/stats'; // Pastikan ada stats.ts
// import commentRoutes from './routes/comment'; 

// const app = express();

// // --- DATABASE CONNECTION ---
// const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://misdbpmi:misdbpmi@cluster0.l4lq1.mongodb.net/lms_db';

// mongoose.set('strictQuery', true);

// const connectDB = async () => {
//   try {
//     if (mongoose.connection.readyState === 0) {
//       await mongoose.connect(MONGO_URI);
//       console.log(`✅ [db] Connected to MongoDB`);
//     }
//   } catch (err) {
//     console.error('❌ [db] Connection error:', err);
//   }
// };
// connectDB();

// // --- CORS CONFIGURATION ---
// const corsConfig: cors.CorsOptions = {
//   origin: true, 
//   credentials: true,
//   allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With', 'Origin', 'x-google-token'],
//   methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
// };

// app.use(cors(corsConfig));
// app.options('*', cors(corsConfig)); 

// // --- MIDDLEWARE ---
// app.use(helmet({ 
//   crossOriginResourcePolicy: false,
//   contentSecurityPolicy: false 
// })); 
// app.use(compression());
// app.use(morgan('dev'));

// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ extended: true, limit: '50mb' }));
// app.use(cookieParser(process.env.COOKIE_SECRET || 'pmi-secret'));

// // --- STATIC FILES ---
// const UPLOADS_PATH = path.join(process.cwd(), 'public', 'uploads'); 
// if (!fs.existsSync(UPLOADS_PATH)) {
//     try { fs.mkdirSync(UPLOADS_PATH, { recursive: true }); } catch(e) {} 
// }
// app.use('/uploads', express.static(UPLOADS_PATH));

// // --- ROUTES REGISTRATION ---
// app.get('/', (req, res) => res.send('LMS PMI Backend is Running!'));
// app.get('/api/health', (_req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

// // Register Routes
// app.use('/api/courses/certificate', certificateRoutes);
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
// app.use('/api/enrollments', enrollmentRoutes);
// app.use('/api/comment', commentRoutes);

// // --- ERROR HANDLERS ---
// app.use((req, res, next) => {
//     if (req.url.includes('/uploads/')) return next();
//     res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
// });

// app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
//   console.error("❌ Global Error:", err.message);
//   if (err.name === 'ZodError') {
//     return res.status(400).json({ error: 'Validation error', issues: err.issues });
//   }
//   if (err instanceof SyntaxError && 'body' in err) {
//       return res.status(400).json({ error: 'Invalid JSON payload' });
//   }
//   res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
// });

// // --- SERVER LISTEN ---
// const PORT = process.env.PORT || 4000;
// if (process.env.NODE_ENV !== 'production') {
//   app.listen(PORT, () => {
//     console.log(`🚀 [server] Server running on port ${PORT}`);
//   });
// }

// // Export App untuk Vercel
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

// --- IMPORT ROUTES ---
// [FIX] Menggunakan nama file baru 'auth-route' untuk mengatasi bug case-sensitive
import authRoutes from './routes/auth-route'; 
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

const app = express();

// --- DATABASE CONNECTION ---
const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://misdbpmi:misdbpmi@cluster0.l4lq1.mongodb.net/lms_db';

mongoose.set('strictQuery', true);

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGO_URI);
      console.log(`✅ [db] Connected to MongoDB`);
    }
  } catch (err) {
    console.error('❌ [db] Connection error:', err);
  }
};
connectDB();

// --- CORS CONFIGURATION ---
const corsConfig: cors.CorsOptions = {
  origin: true, 
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With', 'Origin', 'x-google-token'],
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
};

app.use(cors(corsConfig));
app.options('*', cors(corsConfig)); 

// --- MIDDLEWARE ---
app.use(helmet({ 
  crossOriginResourcePolicy: false,
  contentSecurityPolicy: false 
})); 
app.use(compression());
app.use(morgan('dev'));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser(process.env.COOKIE_SECRET || 'pmi-secret'));

// --- STATIC FILES ---
const UPLOADS_PATH = path.join(process.cwd(), 'public', 'uploads'); 
if (!fs.existsSync(UPLOADS_PATH)) {
    try { fs.mkdirSync(UPLOADS_PATH, { recursive: true }); } catch(e) {} 
}
app.use('/uploads', express.static(UPLOADS_PATH));

// --- ROUTES REGISTRATION ---
app.get('/', (req, res) => res.send('LMS PMI Backend is Running!'));
app.get('/api/health', (_req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

// Register Routes
app.use('/api/courses/certificate', certificateRoutes);
// [FIX] Menggunakan variabel authRoutes yang mengarah ke file baru
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin/users', adminUserRoutes);
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
app.use('/upload', uploadRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/comment', commentRoutes);

// --- ERROR HANDLERS ---
app.use((req, res, next) => {
    if (req.url.includes('/uploads/')) return next();
    res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
});

app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("❌ Global Error:", err.message);
  if (err.name === 'ZodError') {
    return res.status(400).json({ error: 'Validation error', issues: err.issues });
  }
  if (err instanceof SyntaxError && 'body' in err) {
      return res.status(400).json({ error: 'Invalid JSON payload' });
  }
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// --- SERVER LISTEN ---
const PORT = process.env.PORT || 4000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 [server] Server running on port ${PORT}`);
  });
}

export default app;

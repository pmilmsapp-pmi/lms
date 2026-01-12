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

// Import Routes
import authRoutes from './routes/auth';
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

// Fungsi Koneksi Database (Serverless Friendly)
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

// Eksekusi koneksi
connectDB();

// --- CORS CONFIGURATION ---
const isDev = (process.env.NODE_ENV || 'development') === 'development';
// Izinkan semua origin agar tidak ada masalah blocked request di Vercel
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

// Parsing Body (Limit Besar untuk Upload)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser(process.env.COOKIE_SECRET || 'pmi-secret'));

// --- STATIC FILES (Hanya Efektif di Local / VPS, Vercel butuh config vercel.json untuk static) ---
// Namun tetap kita biarkan agar kode konsisten
const UPLOADS_PATH = path.join(process.cwd(), 'public', 'uploads'); 
if (!fs.existsSync(UPLOADS_PATH)) {
    // Di Vercel, filesystem read-only, jadi ini mungkin error/ignored tapi aman karena try-catch/silent fail
    try { fs.mkdirSync(UPLOADS_PATH, { recursive: true }); } catch(e) {} 
}
app.use('/uploads', express.static(UPLOADS_PATH));

// --- ROUTES REGISTRATION ---
app.get('/', (req, res) => res.send('LMS PMI Backend is Running!'));
app.get('/api/health', (_req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

// Register semua route dari app.ts sebelumnya
app.use('/api/courses/certificate', certificateRoutes); // Prioritas certificate
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
app.use('/upload', uploadRoutes); // Alias
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/comment', commentRoutes);

// --- ERROR HANDLERS ---

// 404 Handler
app.use((req, res, next) => {
    if (req.url.includes('/uploads/')) return next();
    res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
});

// Global Error Handler
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

// --- SERVER STARTUP ---
const PORT = process.env.PORT || 4000;

// Listen hanya dijalankan di local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 [server] Server running on port ${PORT}`);
  });
}

// Export App untuk Vercel
export default app;

// // // // // import mongoose from 'mongoose';
// // // // // import dotenv from 'dotenv';
// // // // // import app from './app';

// // // // // dotenv.config();

// // // // // const PORT = process.env.PORT || 4000;
// // // // // // Gunakan lms_db sesuai env terakhir Anda
// // // // // const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lms_db';

// // // // // mongoose.set('strictQuery', true);

// // // // // // 1. Koneksi Database
// // // // // mongoose
// // // // //   .connect(MONGO_URI)
// // // // //   .then(() => {
// // // // //     console.log(`[db] Connected to MongoDB at: ${MONGO_URI}`);
    
// // // // //     // 2. Jalankan Server HANYA setelah DB terkoneksi
// // // // //     app.listen(PORT, () => {
// // // // //       console.log(`[server] Server running on port ${PORT}`);
// // // // //       console.log(`[server] Ready to accept requests! 🚀`);
// // // // //     });
// // // // //   })
// // // // //   .catch((err) => {
// // // // //     console.error('[db] Connection error:', err);
// // // // //     process.exit(1); 
// // // // //   });
// // // // import mongoose from 'mongoose';
// // // // import dotenv from 'dotenv';
// // // // import express from 'express'; // Tambahkan ini
// // // // import path from 'path';       // Tambahkan ini
// // // // import { fileURLToPath } from 'url'; // Tambahkan ini
// // // // import app from './app';

// // // // // Konfigurasi __dirname untuk ES Module
// // // // const __filename = fileURLToPath(import.meta.url);
// // // // const __dirname = path.dirname(__filename);

// // // // dotenv.config();

// // // // const PORT = process.env.PORT || 4000;
// // // // const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lms_db';

// // // // // --- PENTING: Buka Akses Folder Uploads ---
// // // // // Ini membuat folder 'uploads' (yang sejajar dengan folder src) bisa diakses publik
// // // // // URL akses: http://localhost:4000/uploads/namafile.png
// // // // app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// // // // mongoose.set('strictQuery', true);

// // // // // 1. Koneksi Database
// // // // mongoose
// // // //   .connect(MONGO_URI)
// // // //   .then(() => {
// // // //     console.log(`[db] Connected to MongoDB at: ${MONGO_URI}`);
    
// // // //     // 2. Jalankan Server HANYA setelah DB terkoneksi
// // // //     app.listen(PORT, () => {
// // // //       console.log(`[server] Server running on port ${PORT}`);
// // // //       console.log(`[server] Ready to accept requests! 🚀`);
// // // //       console.log(`[server] Static files served at /uploads`);
// // // //     });
// // // //   })
// // // //   .catch((err) => {
// // // //     console.error('[db] Connection error:', err);
// // // //     process.exit(1); 
// // // //   });
// // // import mongoose from 'mongoose';
// // // import dotenv from 'dotenv';
// // // import app from './app'; // Import konfigurasi app

// // // dotenv.config();

// // // const PORT = process.env.PORT || 4000;
// // // const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lms_db';

// // // mongoose.set('strictQuery', true);

// // // // 1. Koneksi Database
// // // mongoose
// // //   .connect(MONGO_URI)
// // //   .then(() => {
// // //     console.log(`✅ [db] Connected to MongoDB at: ${MONGO_URI}`);
    
// // //     // 2. Jalankan Server HANYA setelah DB terkoneksi
// // //     app.listen(PORT, () => {
// // //       console.log(`🚀 [server] Server running on port ${PORT}`);
// // //       console.log(`📡 [server] Ready to accept requests!`);
// // //       console.log(`📂 [server] Static files served at http://localhost:${PORT}/uploads`);
// // //     });
// // //   })
// // //   .catch((err) => {
// // //     console.error('❌ [db] Connection error:', err);
// // //     process.exit(1); 
// // //   });
// // import mongoose from 'mongoose';
// // import dotenv from 'dotenv';
// // import app from './app'; // Import app yang sudah dikonfigurasi

// // dotenv.config();

// // const PORT = process.env.PORT || 4000;
// // const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lms_db';

// // mongoose.set('strictQuery', true);

// // // 1. Koneksi Database
// // mongoose
// //   .connect(MONGO_URI)
// //   .then(() => {
// //     console.log(`✅ [db] Connected to MongoDB`);
    
// //     // 2. Jalankan Server
// //     app.listen(PORT, () => {
// //       console.log(`🚀 [server] Server running on port ${PORT}`);
// //       console.log(`📡 [server] Ready to accept requests!`);
// //     });
// //   })
// //   .catch((err) => {
// //     console.error('❌ [db] Connection error:', err);
// //     process.exit(1); 
// //   });
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import app from './app'; 

// dotenv.config();

// const PORT = process.env.PORT || 4000;
// const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://misdbpmi:misdbpmi@cluster0.l4lq1.mongodb.net/lms_db';

// mongoose.set('strictQuery', true);

// // 1. Koneksi Database
// mongoose
//   .connect(MONGO_URI)
//   .then(() => {
//     console.log(`✅ [db] Connected to MongoDB`);
    
//     // 2. Jalankan Server
//     app.listen(PORT, () => {
//       console.log(`🚀 [server] Server running on port ${PORT}`);
//       console.log(`📡 [server] Ready to accept requests!`);
//     });
//   })
//   .catch((err) => {
//     console.error('❌ [db] Connection error:', err);
//     process.exit(1); 
//   });

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app'; 

dotenv.config();

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://misdbpmi:misdbpmi@cluster0.l4lq1.mongodb.net/lms_db';

mongoose.set('strictQuery', true);

// [FIX VERCEL] Fungsi Koneksi Database yang aman untuk Serverless
const connectDB = async () => {
  try {
    // Cek apakah sudah terkoneksi (readyState: 1 = connected)
    // Ini mencegah koneksi ganda (re-connecting) di Vercel saat hot-reload
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGO_URI);
      console.log(`✅ [db] Connected to MongoDB`);
    }
  } catch (err) {
    console.error('❌ [db] Connection error:', err);
    // Jangan process.exit(1) di serverless, biarkan throw error agar Vercel tau/restart function
  }
};

// Eksekusi koneksi database
connectDB();

// [FIX VERCEL] Conditional Listen
// app.listen HANYA dijalankan jika TIDAK sedang di production (Vercel)
// Vercel akan menangani listening port secara otomatis lewat export default
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 [server] Server running on port ${PORT}`);
    console.log(`📡 [server] Ready to accept requests!`);
  });
}

// [WAJIB] Export app agar Vercel bisa menjadikannya Serverless Function
export default app;

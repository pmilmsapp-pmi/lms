// // // // import mongoose from 'mongoose';
// // // // import dotenv from 'dotenv';
// // // // import app from './app';

// // // // dotenv.config();

// // // // const PORT = process.env.PORT || 4000;
// // // // // Gunakan lms_db sesuai env terakhir Anda
// // // // const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lms_db';

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
// // // //     });
// // // //   })
// // // //   .catch((err) => {
// // // //     console.error('[db] Connection error:', err);
// // // //     process.exit(1); 
// // // //   });
// // // import mongoose from 'mongoose';
// // // import dotenv from 'dotenv';
// // // import express from 'express'; // Tambahkan ini
// // // import path from 'path';       // Tambahkan ini
// // // import { fileURLToPath } from 'url'; // Tambahkan ini
// // // import app from './app';

// // // // Konfigurasi __dirname untuk ES Module
// // // const __filename = fileURLToPath(import.meta.url);
// // // const __dirname = path.dirname(__filename);

// // // dotenv.config();

// // // const PORT = process.env.PORT || 4000;
// // // const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lms_db';

// // // // --- PENTING: Buka Akses Folder Uploads ---
// // // // Ini membuat folder 'uploads' (yang sejajar dengan folder src) bisa diakses publik
// // // // URL akses: http://localhost:4000/uploads/namafile.png
// // // app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// // // mongoose.set('strictQuery', true);

// // // // 1. Koneksi Database
// // // mongoose
// // //   .connect(MONGO_URI)
// // //   .then(() => {
// // //     console.log(`[db] Connected to MongoDB at: ${MONGO_URI}`);
    
// // //     // 2. Jalankan Server HANYA setelah DB terkoneksi
// // //     app.listen(PORT, () => {
// // //       console.log(`[server] Server running on port ${PORT}`);
// // //       console.log(`[server] Ready to accept requests! 🚀`);
// // //       console.log(`[server] Static files served at /uploads`);
// // //     });
// // //   })
// // //   .catch((err) => {
// // //     console.error('[db] Connection error:', err);
// // //     process.exit(1); 
// // //   });
// // import mongoose from 'mongoose';
// // import dotenv from 'dotenv';
// // import app from './app'; // Import konfigurasi app

// // dotenv.config();

// // const PORT = process.env.PORT || 4000;
// // const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lms_db';

// // mongoose.set('strictQuery', true);

// // // 1. Koneksi Database
// // mongoose
// //   .connect(MONGO_URI)
// //   .then(() => {
// //     console.log(`✅ [db] Connected to MongoDB at: ${MONGO_URI}`);
    
// //     // 2. Jalankan Server HANYA setelah DB terkoneksi
// //     app.listen(PORT, () => {
// //       console.log(`🚀 [server] Server running on port ${PORT}`);
// //       console.log(`📡 [server] Ready to accept requests!`);
// //       console.log(`📂 [server] Static files served at http://localhost:${PORT}/uploads`);
// //     });
// //   })
// //   .catch((err) => {
// //     console.error('❌ [db] Connection error:', err);
// //     process.exit(1); 
// //   });
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import app from './app'; // Import app yang sudah dikonfigurasi

// dotenv.config();

// const PORT = process.env.PORT || 4000;
// const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lms_db';

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

// 1. Koneksi Database
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(`✅ [db] Connected to MongoDB`);
    
    // 2. Jalankan Server
    app.listen(PORT, () => {
      console.log(`🚀 [server] Server running on port ${PORT}`);
      console.log(`📡 [server] Ready to accept requests!`);
    });
  })
  .catch((err) => {
    console.error('❌ [db] Connection error:', err);
    process.exit(1); 
  });
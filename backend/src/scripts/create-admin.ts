// // // import mongoose from 'mongoose';
// // // import dotenv from 'dotenv';
// // // import bcrypt from 'bcryptjs';
// // // import path from 'path';
// // // import { fileURLToPath } from 'url';
// // // import { User } from '../models/User'; // Pastikan path ini benar ke model User Anda

// // // // --- 1. SETUP ENVIRONMENT (ESM Compatible) ---
// // // const __filename = fileURLToPath(import.meta.url);
// // // const __dirname = path.dirname(__filename);

// // // // Arahkan ke file .env di root backend
// // // const envPath = path.resolve(__dirname, '../../.env'); 
// // // dotenv.config({ path: envPath });

// // // const createAdmin = async () => {
// // //   try {
// // //     console.log('📂 Loading config from:', envPath);

// // //     // --- 2. KONEKSI DATABASE ---
// // //     const dbUri = process.env.MONGODB_URI;
// // //     if (!dbUri) throw new Error("MONGODB_URI tidak ditemukan di .env");

// // //     await mongoose.connect(dbUri);
// // //     console.log('✅ Connected to MongoDB');

// // //     // --- 3. DATA ADMIN BARU ---
// // //     const adminData = {
// // //         name: 'Super Admin',
// // //         email: 'admin@humanis.com', // Email yang ingin dibuat
// // //         password: '123456',          // Password mentah
// // //         role: 'SUPER_ADMIN',
// // //         avatarUrl: 'https://ui-avatars.com/api/?name=Super+Admin&background=ef4444&color=fff'
// // //     };

// // //     // --- 4. CEK APAKAH SUDAH ADA ---
// // //     const existingUser = await User.findOne({ email: adminData.email });
// // //     if (existingUser) {
// // //         console.log(`⚠️  Admin dengan email ${adminData.email} sudah ada.`);
// // //         process.exit(0);
// // //     }

// // //     // --- 5. HASH PASSWORD & SIMPAN ---
// // //     // Penting: Hash password agar bisa login lewat auth.ts
// // //     const hashedPassword = await bcrypt.hash(adminData.password, 10);

// // //     const newAdmin = new User({
// // //         ...adminData,
// // //         password: hashedPassword 
// // //     });

// // //     await newAdmin.save();

// // //     console.log('🎉 Super Admin berhasil dibuat!');
// // //     console.log(`📧 Email: ${adminData.email}`);
// // //     console.log(`🔑 Pass: ${adminData.password}`);

// // //   } catch (error) {
// // //     console.error('❌ Gagal membuat admin:', error);
// // //   } finally {
// // //     await mongoose.disconnect();
// // //     process.exit();
// // //   }
// // // };

// // // createAdmin();

// // import mongoose from 'mongoose';
// // import dotenv from 'dotenv';
// // import bcrypt from 'bcryptjs';
// // import path from 'path';
// // import { fileURLToPath } from 'url';

// // // --- PERBAIKAN: TAMBAHKAN .js PADA IMPORT ---
// // import { User } from '../models/User.js'; 

// // // --- SETUP ENVIRONMENT (ESM Compatible) ---
// // const __filename = fileURLToPath(import.meta.url);
// // const __dirname = path.dirname(__filename);

// // // Arahkan ke file .env di root backend (naik 2 level dari src/scripts)
// // const envPath = path.resolve(__dirname, '../../.env'); 
// // dotenv.config({ path: envPath });

// // const createAdmin = async () => {
// //   try {
// //     console.log('📂 Loading config from:', envPath);

// //     // --- KONEKSI DATABASE ---
// //     // Pastikan membaca MONGODB_URI (sesuai env Anda), bukan MONGO_URI
// //     const dbUri = process.env.MONGODB_URI; 
    
// //     if (!dbUri) throw new Error("MONGODB_URI tidak ditemukan di .env");

// //     await mongoose.connect(dbUri);
// //     console.log('✅ Connected to MongoDB');

// //     // --- DATA ADMIN BARU ---
// //     const adminData = {
// //         name: 'Super Admin',
// //         email: 'admin@humanis.com', 
// //         password: '123456',          
// //         role: 'SUPER_ADMIN',
// //         avatarUrl: 'https://ui-avatars.com/api/?name=Super+Admin&background=ef4444&color=fff'
// //     };

// //     // --- CEK APAKAH SUDAH ADA ---
// //     const existingUser = await User.findOne({ email: adminData.email });
// //     if (existingUser) {
// //         console.log(`⚠️  Admin dengan email ${adminData.email} sudah ada.`);
// //         process.exit(0);
// //     }

// //     // --- HASH PASSWORD & SIMPAN ---
// //     const hashedPassword = await bcrypt.hash(adminData.password, 10);

// //     const newAdmin = new User({
// //         ...adminData,
// //         password: hashedPassword 
// //     });

// //     await newAdmin.save();

// //     console.log('🎉 Super Admin berhasil dibuat!');
// //     console.log(`📧 Email: ${adminData.email}`);
// //     console.log(`🔑 Pass: ${adminData.password}`);

// //   } catch (error) {
// //     console.error('❌ Gagal membuat admin:', error);
// //   } finally {
// //     await mongoose.disconnect();
// //     process.exit();
// //   }
// // };

// // createAdmin();
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import bcrypt from 'bcryptjs';
// import path from 'path';
// import { fileURLToPath } from 'url';

// // --- HAPUS .js DI SINI (KEMBALIKAN KE BERSIH) ---
// import { User } from '../models/User'; 

// // --- SETUP ENVIRONMENT ---
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const envPath = path.resolve(__dirname, '../../.env'); 
// dotenv.config({ path: envPath });

// const createAdmin = async () => {
//   try {
//     console.log('📂 Loading config from:', envPath);

//     const dbUri = process.env.MONGODB_URI; 
    
//     if (!dbUri) throw new Error("MONGODB_URI tidak ditemukan di .env");

//     await mongoose.connect(dbUri);
//     console.log('✅ Connected to MongoDB');

//     const adminData = {
//         name: 'Super Admin',
//         email: 'admin@humanis.com', 
//         password: '123456',          
//         role: 'SUPER_ADMIN',
//         avatarUrl: 'https://ui-avatars.com/api/?name=Super+Admin&background=ef4444&color=fff'
//     };

//     const existingUser = await User.findOne({ email: adminData.email });
//     if (existingUser) {
//         console.log(`⚠️  Admin dengan email ${adminData.email} sudah ada.`);
//         process.exit(0);
//     }

//     const hashedPassword = await bcrypt.hash(adminData.password, 10);

//     const newAdmin = new User({
//         ...adminData,
//         password: hashedPassword 
//     });

//     await newAdmin.save();

//     console.log('🎉 Super Admin berhasil dibuat!');
//     console.log(`📧 Email: ${adminData.email}`);
//     console.log(`🔑 Pass: ${adminData.password}`);

//   } catch (error) {
//     console.error('❌ Gagal membuat admin:', error);
//   } finally {
//     await mongoose.disconnect();
//     process.exit();
//   }
// };

// createAdmin();
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { User } from '../models/User'; // Pastikan path benar

// --- CONFIG ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../../.env'); 
dotenv.config({ path: envPath });

const createAdmin = async () => {
  try {
    const dbUri = process.env.MONGODB_URI;
    if (!dbUri) throw new Error("MONGODB_URI missing");
    await mongoose.connect(dbUri);
    console.log('✅ Connected');

    // Hapus admin lama agar bersih
    await User.deleteOne({ email: 'admin@humanis.com' });

    // --- PERBAIKAN: JANGAN HASH PASSWORD DISINI ---
    // Kirim password mentah "123456"
    // Biarkan User Model yang melakukan hashing di pre('save')
    const newAdmin = new User({
        name: 'Super Admin',
        email: 'admin@humanis.com',
        password: '123456', // <--- PASSWORD MENTAH
        role: 'SUPER_ADMIN',
        avatarUrl: 'https://ui-avatars.com/api/?name=Super+Admin'
    });

    await newAdmin.save(); // Model akan otomatis meng-hash ini

    console.log('🎉 Admin dibuat ulang (Tanpa Double Hash)!');
    console.log('📧 admin@humanis.com / 123456');

  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
};

createAdmin();
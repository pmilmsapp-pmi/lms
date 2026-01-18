import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/User';

dotenv.config();

const fixRina = async () => {
  try {
    // 1. Connect Database
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/lms_db';
    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB');

    // 2. Cari User Rina
    const email = 'rina@fasilitator.com'; // Pastikan email ini benar
    const user = await User.findOne({ email });

    if (!user) {
      console.log('❌ User Rina tidak ditemukan!');
      return;
    }

    console.log('🔍 User Ditemukan:', user.name);
    
    // 3. PAKSA Update Permission (Hardcode)
    // Kita berikan izin lengkap CMS
    user.permissions = [
        'manage_cms_design', 
        'manage_cms_info',
        'manage_courses',
        'verify_enrollments',
        'manage_users'
    ];
    
    // Pastikan role ADMIN
    user.role = 'ADMIN';
    
    // Pastikan akun aktif
    user.isBanned = false;

    // Simpan
    await user.save();

    console.log('✅ SUKSES! Data Rina di-update paksa.');
    console.log('📋 Permissions saat ini:', user.permissions);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
  }
};

fixRina();
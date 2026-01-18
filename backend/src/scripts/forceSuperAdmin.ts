import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';

dotenv.config();
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://misdbpmi:misdbpmi@cluster0.l4lq1.mongodb.net/lms_db';

const forceSuperAdmin = async () => {
    try {
        console.log('⏳ Menghubungkan ke DB...');
        await mongoose.connect(MONGO_URI);

        const targetEmail = 'ilhamputraterakhir77@gmail.com'; // Email dari CSV Anda
        
        console.log(`🔍 Mencari user: ${targetEmail}`);
        const user = await User.findOne({ email: targetEmail });

        if (!user) {
            console.log('❌ User tidak ditemukan!');
            process.exit(1);
        }

        console.log('⚙️ Mengupdate hak akses...');
        
        // 1. Ubah Role jadi SUPER_ADMIN (God Mode)
        user.role = 'SUPER_ADMIN';
        
        // 2. Pastikan Verified & Tidak Banned
        user.isVerified = true;
        user.isBanned = false;
        
        // 3. Reset Password Manual (Untuk Kepastian 100%)
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash('123456', salt);

        // 4. Permission Kosongkan (Super Admin tidak butuh list permission)
        user.permissions = []; 
        user.regionScope = 'national'; // Akses seluruh wilayah

        await user.save();

        console.log('✅ SUKSES!');
        console.log(`👉 Akun ${user.name} sekarang adalah SUPER ADMIN.`);
        console.log('👉 Password di-reset ulang ke: 123456');
        console.log('👉 Silakan login sekarang.');

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

forceSuperAdmin();
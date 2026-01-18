import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';

dotenv.config();

// Gunakan URI Atlas Anda
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://misdbpmi:misdbpmi@cluster0.l4lq1.mongodb.net/lms_db';

const testLogin = async () => {
    try {
        console.log('⏳ Menghubungkan ke DB...');
        await mongoose.connect(MONGO_URI);
        
        // GANTI EMAIL INI DENGAN EMAIL YANG GAGAL LOGIN
        const targetEmail = 'ilhamputraterakhir77@gmail.com'; 
        const targetPass = '123456';

        console.log(`\n🔍 Mencari user: "${targetEmail}"`);
        
        // 1. Cek User Exist
        const user = await User.findOne({ email: targetEmail });
        
        if (!user) {
            console.error('❌ User TIDAK DITEMUKAN di database!');
            
            // Cek apakah ada masalah spasi (Regex search)
            const regexUser = await User.findOne({ email: { $regex: new RegExp(targetEmail.trim(), 'i') } });
            if (regexUser) {
                console.log('⚠️ TAPI... Ditemukan user yang MIRIP:');
                console.log(`   Email di DB: "${regexUser.email}"`);
                console.log(`   (Perhatikan apakah ada spasi di awal/akhir)`);
            }
            process.exit();
        }

        console.log('✅ User Ditemukan!');
        console.log('   ID:', user._id);
        console.log('   Role:', user.role);
        console.log('   Status Verified:', user.isVerified); // <--- Cek ini
        console.log('   Password Hash di DB:', user.password.substring(0, 10) + '...');

        // 2. Cek Password
        console.log(`\n🔑 Mencoba compare password "${targetPass}"...`);
        const isMatch = await bcrypt.compare(targetPass, user.password);

        if (isMatch) {
            console.log('✅ PASSWORD BENAR! Login harusnya sukses.');
            console.log('👉 Jika di web gagal, cek apakah authController memblokir user yang isVerified=false?');
        } else {
            console.error('❌ PASSWORD SALAH!');
            console.log('👉 Hash di database tidak cocok dengan "123456".');
            console.log('👉 Coba reset password lagi via Admin Panel, lalu jalankan script ini lagi.');
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        process.exit();
    }
};

testLogin();
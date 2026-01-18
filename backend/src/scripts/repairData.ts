import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/User';

dotenv.config();

// Gunakan URI Atlas Anda
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://misdbpmi:misdbpmi@cluster0.l4lq1.mongodb.net/lms_db';

// Permission standar untuk Student/KSR (Samakan dengan config permission Anda)
const DEFAULT_PERMISSIONS = [
    'access_course',
    'view_content',
    'submit_quiz',
    'manage_profile'
];

const repairData = async () => {
    try {
        console.log('⏳ Menghubungkan ke Database...');
        await mongoose.connect(MONGO_URI);
        
        console.log('🔍 Memulai perbaikan data user...');

        // 1. Ambil semua user
        const users = await User.find({});
        let fixedCount = 0;

        for (const user of users) {
            let isDirty = false; // Penanda apakah ada yang diubah

            // FIX 1: Set isVerified = true jika belum ada
            if (user.isVerified === undefined || user.isVerified === false) {
                user.isVerified = true;
                isDirty = true;
            }

            // FIX 2: Set Permission jika kosong
            if (!user.permissions || user.permissions.length === 0) {
                user.permissions = DEFAULT_PERMISSIONS;
                isDirty = true;
            }

            // FIX 3: Pastikan regionScope ada (minimal 'national')
            if (!user.regionScope) {
                user.regionScope = 'national';
                isDirty = true;
            }

            // Simpan perubahan jika ada
            if (isDirty) {
                await user.save();
                process.stdout.write('+'); // Indikator user diperbaiki
                fixedCount++;
            } else {
                process.stdout.write('.'); // Indikator user sudah sehat
            }
        }

        console.log(`\n\n✅ Perbaikan Selesai!`);
        console.log(`✨ Total User Diperbaiki: ${fixedCount}`);
        console.log(`👍 User lainnya sudah sehat.`);

        process.exit();

    } catch (error) {
        console.error('\n❌ Error:', error);
        process.exit(1);
    }
};

repairData();
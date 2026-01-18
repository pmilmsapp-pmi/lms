// import { Request, Response } from 'express';
// import { User } from '../models/User';
// import { Course } from '../models/Course';
// import { Enrollment } from '../models/Enrollment';
// import { Progress } from '../models/Progress';
// import { BackupLog } from '../models/BackupLog';
// import { supabase, BACKUP_BUCKET } from '../config/supabase';
// import archiver from 'archiver';
// import moment from 'moment';
// import { PassThrough } from 'stream';

// export const triggerBackup = async (req: any, res: Response) => {
//   try {
//     const adminId = req.user.id;
//     const timestamp = moment().format('YYYY-MM-DD_HH-mm-ss');
//     const filename = `backup_lms_${timestamp}.zip`;

//     // 1. Siapkan Stream
//     const stream = new PassThrough();
//     const archive = archiver('zip', { zlib: { level: 9 } });

//     archive.pipe(stream);

//     // 2. Ambil Data MongoDB
//     const users = await User.find().lean();
//     const courses = await Course.find().lean();
//     const enrollments = await Enrollment.find().lean();
//     const progress = await Progress.find().lean();

//     // Masukkan ke ZIP
//     archive.append(JSON.stringify(users, null, 2), { name: 'users.json' });
//     archive.append(JSON.stringify(courses, null, 2), { name: 'courses.json' });
//     archive.append(JSON.stringify(enrollments, null, 2), { name: 'enrollments.json' });
//     archive.append(JSON.stringify(progress, null, 2), { name: 'progress.json' });

//     archive.finalize();

//     // 3. Upload ke Supabase
//     const chunks: any[] = [];
//     stream.on('data', (chunk) => chunks.push(chunk));
    
//     stream.on('end', async () => {
//         const buffer = Buffer.concat(chunks);
        
//         const { error } = await supabase.storage
//             .from(BACKUP_BUCKET)
//             .upload(filename, buffer, { contentType: 'application/zip', upsert: false });

//         if (error) throw error;

//         const { data: urlData } = supabase.storage.from(BACKUP_BUCKET).getPublicUrl(filename);
        
//         // 4. Log
//         const log = new BackupLog({
//             filename,
//             size: buffer.length,
//             url: urlData.publicUrl,
//             status: 'success',
//             triggeredBy: adminId
//         });
//         await log.save();

//         res.json({ message: 'Backup ZIP berhasil!', log });
//     });

//     archive.on('error', (err) => { throw err; });

//   } catch (error: any) {
//     console.error("Backup Failed:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// export const getBackupHistory = async (req: Request, res: Response) => {
//     try {
//         const logs = await BackupLog.find().sort({ createdAt: -1 }).limit(20);
//         res.json({ logs });
//     } catch (error: any) {
//         res.status(500).json({ error: error.message });
//     }
// };

import { Request, Response } from 'express';
import { User } from '../models/User';
import { Course } from '../models/Course';
import { Enrollment } from '../models/Enrollment';
import { supabase, BACKUP_BUCKET } from '../config/supabase';
import archiver from 'archiver';
import moment from 'moment';

export const triggerBackup = async (req: any, res: Response) => {
    try {
        const adminId = req.user.id;
        const timestamp = moment().format('YYYY-MM-DD_HH-mm-ss');
        const filename = `backup_lms_${timestamp}.zip`;

        // 1. Inisialisasi Archiver
        const archive = archiver('zip', { zlib: { level: 9 } });
        const chunks: Buffer[] = [];

        // 2. Kumpulkan data ke dalam Stream
        archive.on('data', (chunk) => chunks.push(chunk));
        
        // Buat Promise untuk menunggu proses zipping selesai
        const zipFinished = new Promise((resolve, reject) => {
            archive.on('end', resolve);
            archive.on('error', reject);
        });

        // 3. Ambil data dari MongoDB
        const [users, courses, enrollments] = await Promise.all([
            User.find().lean(),
            Course.find().lean(),
            Enrollment.find().lean()
        ]);

        // Masukkan file JSON ke dalam ZIP
        archive.append(JSON.stringify(users, null, 2), { name: 'users.json' });
        archive.append(JSON.stringify(courses, null, 2), { name: 'courses.json' });
        archive.append(JSON.stringify(enrollments, null, 2), { name: 'enrollments.json' });

        // Selesaikan proses zipping
        archive.finalize();
        await zipFinished;

        // 4. Gabungkan chunks menjadi satu Buffer
        const finalBuffer = Buffer.concat(chunks);

        // 5. Upload langsung ke Supabase Storage Bucket
        const { data, error: uploadError } = await supabase.storage
            .from(BACKUP_BUCKET) // Pastikan bucket ini sudah dibuat di dashboard Supabase
            .upload(filename, finalBuffer, {
                contentType: 'application/zip',
                upsert: false
            });

        if (uploadError) throw uploadError;

        // Dapatkan Public URL (Opsional, jika bucket public)
        const { data: urlData } = supabase.storage.from(BACKUP_BUCKET).getPublicUrl(filename);

        // 6. Catat riwayat backup ke Tabel Supabase (backup_logs)
        const { error: logError } = await supabase.from('backup_logs').insert({
            filename,
            size: finalBuffer.length,
            url: urlData.publicUrl,
            status: 'success',
            triggered_by: adminId
        });

        if (logError) console.error("Log Error:", logError.message);

        res.json({ 
            success: true, 
            message: 'Backup ZIP berhasil diunggah ke Supabase Storage!',
            filename 
        });

    } catch (error: any) {
        console.error("Backup Failed:", error);
        
        // Catat kegagalan ke tabel log
        await supabase.from('backup_logs').insert({
            filename: `FAILED_${moment().format('YYYY-MM-DD')}.zip`,
            status: 'failed',
            triggered_by: req.user.id
        });

        res.status(500).json({ error: error.message });
    }
};

export const getBackupHistory = async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabase
            .from('backup_logs')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(20);

        if (error) throw error;
        res.json({ logs: data });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
// // import { Request, Response } from 'express';
// // import { User } from '../models/User';
// // import { Course } from '../models/Course';
// // import { Enrollment } from '../models/Enrollment';
// // import { supabase } from "../config/supabase";

// // // Helper untuk format data Mongo ke format Tabel Supabase
// // const formatForSupabase = (doc: any, extractFields: string[] = []) => {
// //     const plain = doc.toObject ? doc.toObject() : doc;
// //     // Ubah _id menjadi string agar bisa jadi Primary Key di Postgres
// //     const mongo_id = plain._id.toString();
    
// //     // Hapus _id dari data jsonb agar tidak duplikat (opsional, tapi lebih bersih)
// //     const { _id, ...restData } = plain;

// //     // Base object
// //     const result: any = {
// //         mongo_id,
// //         data: JSON.stringify(restData), // Simpan full object di kolom JSONB
// //         synced_at: new Date()
// //     };

// //     // Ekstrak field penting ke kolom biasa (untuk memudahkan sorting/filtering di Supabase)
// //     if (extractFields.includes('email') && plain.email) result.email = plain.email;
// //     if (extractFields.includes('role') && plain.role) result.role = plain.role;
// //     if (extractFields.includes('title') && plain.title) result.title = plain.title;
// //     if (extractFields.includes('user') && plain.user) result.user_id = plain.user.toString();
// //     if (extractFields.includes('course') && plain.course) result.course_id = plain.course.toString();

// //     return result;
// // };

// // export const triggerLiveSync = async (req: any, res: Response) => {
// //     const adminId = req.user.id;
// //     const logEntry = { status: 'running', message: 'Sync started...', admin_id: adminId };
    
// //     try {
// //         // 1. SYNC USERS
// //         const users = await User.find();
// //         if (users.length > 0) {
// //             const payload = users.map(u => formatForSupabase(u, ['email', 'role']));
// //             const { error } = await supabase.from('sync_users').upsert(payload, { onConflict: 'mongo_id' });
// //             if (error) throw new Error(`Users Sync Error: ${error.message}`);
// //         }

// //         // 2. SYNC COURSES
// //         const courses = await Course.find();
// //         if (courses.length > 0) {
// //             const payload = courses.map(c => formatForSupabase(c, ['title']));
// //             const { error } = await supabase.from('sync_courses').upsert(payload, { onConflict: 'mongo_id' });
// //             if (error) throw new Error(`Courses Sync Error: ${error.message}`);
// //         }

// //         // 3. SYNC ENROLLMENTS
// //         const enrollments = await Enrollment.find();
// //         if (enrollments.length > 0) {
// //             const payload = enrollments.map(e => formatForSupabase(e, ['user', 'course']));
// //             const { error } = await supabase.from('sync_enrollments').upsert(payload, { onConflict: 'mongo_id' });
// //             if (error) throw new Error(`Enrollments Sync Error: ${error.message}`);
// //         }

// //         // 4. CATAT LOG SUKSES
// //         await supabase.from('sync_logs').insert({
// //             status: 'success',
// //             message: `Berhasil sinkronisasi: ${users.length} Users, ${courses.length} Courses, ${enrollments.length} Enrollments.`,
// //             admin_id: adminId
// //         });

// //         res.json({ success: true, message: 'Sinkronisasi Database Selesai!' });

// //     } catch (error: any) {
// //         console.error("Sync Failed:", error);
        
// //         // CATAT LOG GAGAL
// //         await supabase.from('sync_logs').insert({
// //             status: 'failed',
// //             message: error.message || 'Unknown error',
// //             admin_id: adminId
// //         });

// //         res.status(500).json({ error: error.message });
// //     }
// // };

// // export const getSyncHistory = async (req: Request, res: Response) => {
// //     try {
// //         // Ambil log langsung dari Supabase
// //         const { data, error } = await supabase
// //             .from('sync_logs')
// //             .select('*')
// //             .order('created_at', { ascending: false })
// //             .limit(20);

// //         if (error) throw error;
// //         res.json({ logs: data });
// //     } catch (error: any) {
// //         res.status(500).json({ error: error.message });
// //     }
// // };

// import { Request, Response } from 'express';
// import { User } from '../models/User';
// import { Course } from '../models/Course';
// import { Enrollment } from '../models/Enrollment';
// import { supabase } from "../config/supabase";

// // Helper untuk format data Mongo ke format Tabel Supabase
// const formatForSupabase = (doc: any, extractFields: string[] = []) => {
//     const plain = doc.toObject ? doc.toObject() : doc;
//     const mongo_id = plain._id.toString();
//     const { _id, password, __v, ...restData } = plain; // Hapus password & version key demi keamanan

//     const result: any = {
//         mongo_id,
//         data: JSON.stringify(restData), 
//         synced_at: new Date()
//     };

//     if (extractFields.includes('email') && plain.email) result.email = plain.email;
//     if (extractFields.includes('role') && plain.role) result.role = plain.role;
//     if (extractFields.includes('title') && plain.title) result.title = plain.title;
//     if (extractFields.includes('user') && plain.user) result.user_id = plain.user.toString();
//     if (extractFields.includes('course') && plain.course) result.course_id = plain.course.toString();

//     return result;
// };

// export const triggerLiveSync = async (req: any, res: Response) => {
//     const adminId = req.user.id;
    
//     try {
//         // 1. SYNC USERS
//         const users = await User.find().lean();
//         if (users.length > 0) {
//             const payload = users.map(u => formatForSupabase(u, ['email', 'role']));
//             const { error } = await supabase.from('sync_users').upsert(payload, { onConflict: 'mongo_id' });
//             if (error) throw new Error(`Users Sync Error: ${error.message}`);
//         }

//         // 2. SYNC COURSES
//         const courses = await Course.find().lean();
//         if (courses.length > 0) {
//             const payload = courses.map(c => formatForSupabase(c, ['title']));
//             const { error } = await supabase.from('sync_courses').upsert(payload, { onConflict: 'mongo_id' });
//             if (error) throw new Error(`Courses Sync Error: ${error.message}`);
//         }

//         // 3. SYNC ENROLLMENTS
//         const enrollments = await Enrollment.find().lean();
//         if (enrollments.length > 0) {
//             const payload = enrollments.map(e => formatForSupabase(e, ['user', 'course']));
//             const { error } = await supabase.from('sync_enrollments').upsert(payload, { onConflict: 'mongo_id' });
//             if (error) throw new Error(`Enrollments Sync Error: ${error.message}`);
//         }

//         // 4. CATAT LOG SUKSES
//         await supabase.from('sync_logs').insert({
//             status: 'success',
//             message: `Berhasil sinkronisasi: ${users.length} Users, ${courses.length} Courses, ${enrollments.length} Enrollments.`,
//             admin_id: adminId
//         });

//         res.json({ success: true, message: 'Sinkronisasi Database Selesai!' });

//     } catch (error: any) {
//         console.error("Sync Failed:", error);
//         await supabase.from('sync_logs').insert({
//             status: 'failed',
//             message: error.message || 'Unknown error',
//             admin_id: adminId
//         });
//         res.status(500).json({ error: error.message });
//     }
// };

// export const getSyncHistory = async (req: Request, res: Response) => {
//     try {
//         const { data, error } = await supabase
//             .from('sync_logs')
//             .select('*')
//             .order('created_at', { ascending: false })
//             .limit(20);

//         if (error) throw error;
//         res.json({ logs: data });
//     } catch (error: any) {
//         res.status(500).json({ error: error.message });
//     }
// };

import { Request, Response } from 'express';
import { User } from '../models/User';
import { Course } from '../models/Course';
import { Enrollment } from '../models/Enrollment';
import { supabase } from "../config/supabase";
import { pgPool } from '../config/pgClient';

// Helper format data (Bisa digunakan untuk keduanya)
const formatData = (doc: any, extractFields: string[] = []) => {
    const plain = doc.toObject ? doc.toObject() : doc;
    const mongo_id = plain._id.toString();
    const { _id, password, __v, ...restData } = plain;

    const result: any = {
        mongo_id,
        data: JSON.stringify(restData), 
        synced_at: new Date()
    };

    if (extractFields.includes('email') && plain.email) result.email = plain.email;
    if (extractFields.includes('role') && plain.role) result.role = plain.role;
    if (extractFields.includes('title') && plain.title) result.title = plain.title;
    
    return result;
};

// --- A. SINKRONISASI SUPABASE ---
export const triggerSupabaseSync = async (req: any, res: Response) => {
    const adminId = req.user.id;
    try {
        const [users, courses, enrollments] = await Promise.all([
            User.find().lean(), Course.find().lean(), Enrollment.find().lean()
        ]);

        if (users.length > 0) await supabase.from('sync_users').upsert(users.map(u => formatData(u, ['email', 'role'])));
        if (courses.length > 0) await supabase.from('sync_courses').upsert(courses.map(c => formatData(c, ['title'])));
        
        await supabase.from('sync_logs').insert({
            status: 'success', message: `Sync Supabase: ${users.length} Data`, admin_id: adminId
        });

        res.json({ success: true, message: 'Sinkronisasi Supabase Selesai!' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// --- B. SINKRONISASI POSTGRES PRIBADI ---
export const triggerPostgresSync = async (req: any, res: Response) => {
    const adminId = req.user.id;
    const client = await pgPool.connect();
    try {
        await client.query('BEGIN');
        const [users, courses] = await Promise.all([User.find().lean(), Course.find().lean()]);

        for (const u of users) {
            const f = formatData(u, ['email', 'role']);
            await client.query(`INSERT INTO sync_users (mongo_id, email, role, data) VALUES ($1, $2, $3, $4) ON CONFLICT (mongo_id) DO UPDATE SET data = $4`, [f.mongo_id, f.email, f.role, f.data]);
        }

        await client.query('INSERT INTO sync_logs (status, message, admin_id) VALUES ($1, $2, $3)', ['success', `Sync Postgres: ${users.length} Data`, adminId]);
        await client.query('COMMIT');
        res.json({ success: true, message: 'Sinkronisasi Postgres Pribadi Selesai!' });
    } catch (error: any) {
        await client.query('ROLLBACK');
        res.status(500).json({ error: error.message });
    } finally { client.release(); }
};

// Ambil history dari kedua DB (Opsional: Kita ambil dari Postgres saja sebagai log utama)
export const getSyncHistory = async (req: Request, res: Response) => {
    try {
        const { rows } = await pgPool.query('SELECT * FROM sync_logs ORDER BY created_at DESC LIMIT 20');
        res.json({ logs: rows });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
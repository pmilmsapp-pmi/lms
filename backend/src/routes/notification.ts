

// // import express, { Response } from 'express';
// // import { Notification } from '../models/Notification';
// // import { requireAuth, AuthedRequest } from '../middleware/auth';

// // const router = express.Router();

// // // 1. GET UNREAD COUNT (PERBAIKAN LOGIKA TOTAL)
// // router.get('/unread-count', requireAuth, async (req: AuthedRequest, res: Response) => {
// //     try {
// //         const userId = req.user!.id;

// //         // 1. Hitung TOTAL semua notifikasi unread (Apapun tipenya)
// //         // Ini perbaikan utamanya: menghitung secara global agar badge lonceng selalu akurat
// //         const total = await Notification.countDocuments({ 
// //             recipient: userId, 
// //             isRead: false 
// //         });

// //         // 2. Hitung Parsial untuk Sub-menu (Opsional)
// //         // Hitung Notifikasi Forum
// //         const forumCount = await Notification.countDocuments({ 
// //             recipient: userId, 
// //             isRead: false,
// //             type: { $in: ['reply', 'mention', 'approval'] } 
// //         });

// //         // Hitung Notifikasi Perpustakaan (System/Buku)
// //         const libraryCount = await Notification.countDocuments({ 
// //             recipient: userId, 
// //             isRead: false,
// //             type: 'system' 
// //         });
        
// //         // Hitung Notifikasi Blog (Jaga-jaga jika nanti butuh badge khusus di menu blog)
// //         const blogCount = await Notification.countDocuments({ 
// //             recipient: userId, 
// //             isRead: false,
// //             type: 'blog' 
// //         });

// //         res.json({ 
// //             count: total,       // Dipakai untuk Badge Lonceng Header
// //             forumCount,         // Dipakai untuk Badge Menu Forum
// //             libraryCount,       // Dipakai untuk Badge Menu Perpustakaan
// //             blogCount
// //         });
// //     } catch (e: any) {
// //         res.status(500).json({ error: e.message });
// //     }
// // });

// // // 2. GET ALL NOTIFICATIONS
// // router.get('/', requireAuth, async (req: AuthedRequest, res: Response) => {
// //     try {
// //         const notifs = await Notification.find({ recipient: req.user!.id })
// //             .populate('sender', 'name avatarUrl')
// //             .sort({ createdAt: -1 })
// //             .limit(20);
// //         res.json(notifs);
// //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // });

// // // 3. MARK ALL AS READ
// // router.patch('/mark-read', requireAuth, async (req: AuthedRequest, res: Response) => {
// //     try {
// //         await Notification.updateMany(
// //             { recipient: req.user!.id, isRead: false },
// //             { isRead: true }
// //         );
// //         res.json({ message: 'Marked as read' });
// //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // });

// // // 4. MARK READ BY TOPIC
// // router.patch('/mark-read/topic/:topicId', requireAuth, async (req: AuthedRequest, res: Response) => {
// //     try {
// //         await Notification.updateMany(
// //             { 
// //                 recipient: req.user!.id, 
// //                 topic: req.params.topicId,
// //                 isRead: false 
// //             },
// //             { isRead: true }
// //         );
// //         res.json({ message: 'Topic notifications marked as read' });
// //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // });

// // export default router;

// import express, { Response } from 'express';
// import { Notification } from '../models/Notification';
// import { User } from '../models/User'; 
// import { requireAuth, AuthedRequest } from '../middleware/auth';

// const router = express.Router();

// // 1. GET UNREAD COUNT
// router.get('/unread-count', requireAuth, async (req: AuthedRequest, res: Response) => {
//     try {
//         const userId = req.user!.id;
//         const total = await Notification.countDocuments({ recipient: userId, isRead: false });
//         const forumCount = await Notification.countDocuments({ recipient: userId, isRead: false, type: { $in: ['reply', 'mention', 'approval'] } });
//         const libraryCount = await Notification.countDocuments({ recipient: userId, isRead: false, type: 'system' });
//         const blogCount = await Notification.countDocuments({ recipient: userId, isRead: false, type: 'blog' });

//         res.json({ count: total, forumCount, libraryCount, blogCount });
//     } catch (e: any) { res.status(500).json({ error: e.message }); }
// });

// // 2. GET ALL NOTIFICATIONS (FIXED EMPTY LIST)
// router.get('/', requireAuth, async (req: AuthedRequest, res: Response) => {
//     try {
//         const { limit } = req.query; 
        
//         const query = Notification.find({ recipient: req.user!.id })
//             .populate('sender', 'name avatarUrl role') // Populate lengkap
//             .sort({ createdAt: -1 });

//         if (limit) query.limit(parseInt(limit as string));
//         else query.limit(20);

//         // [FIX 1] Gunakan .lean() agar jadi object JS biasa
//         const notifs = await query.lean().exec();

//         // [FIX 2] Safe Mapping (Cegah error jika sender terhapus)
//         const safeNotifs = notifs.map((n: any) => ({
//             ...n,
//             sender: n.sender || { name: 'Sistem', role: 'SYSTEM', avatarUrl: null }
//         }));

//         // [FIX 3] Bungkus dalam object 'notifications' agar sesuai dengan frontend
//         res.json({ notifications: safeNotifs }); 
//     } catch (e: any) { 
//         res.status(500).json({ error: e.message }); 
//     }
// });

// // 3. CREATE NOTIFICATION (BROADCAST ADMIN FIXED)
// router.post('/', requireAuth, async (req: AuthedRequest, res: Response) => {
//     try {
//         const { recipient, type, message, targetUrl, roleTarget, topic } = req.body;
//         const sender = req.user!.id;

//         // SKENARIO A: Broadcast ke Semua Admin
//         if (roleTarget === 'ADMIN') {
//             const admins = await User.find({ role: { $regex: /admin/i } }); // Regex Case Insensitive
            
//             if (!admins.length) return res.status(404).json({ message: 'No admins found' });

//             const notifications = admins.map(admin => ({
//                 recipient: admin._id,
//                 sender: sender,
//                 type: type || 'system',
//                 message: message,
//                 targetUrl: targetUrl,
//                 topic: topic,
//                 isRead: false
//             }));

//             await Notification.insertMany(notifications);
//             return res.status(201).json({ message: 'Broadcast sent to Admins' });
//         }

//         // SKENARIO B: Personal
//         const newNotification = new Notification({
//             recipient, sender, type, message, targetUrl, topic
//         });

//         await newNotification.save();
//         res.status(201).json(newNotification);

//     } catch (e: any) { res.status(500).json({ error: e.message }); }
// });

// // 4. MARK SINGLE READ
// router.patch('/:id/read', requireAuth, async (req: AuthedRequest, res: Response) => {
//     try {
//         const notification = await Notification.findOneAndUpdate(
//             { _id: req.params.id, recipient: req.user!.id },
//             { isRead: true },
//             { new: true }
//         );
//         if (!notification) return res.status(404).json({ message: 'Not found' });
//         res.json(notification);
//     } catch (e: any) { res.status(500).json({ error: e.message }); }
// });

// // 5. MARK ALL READ
// router.patch('/mark-read', requireAuth, async (req: AuthedRequest, res: Response) => {
//     try {
//         await Notification.updateMany({ recipient: req.user!.id, isRead: false }, { isRead: true });
//         res.json({ message: 'Marked all as read' });
//     } catch (e: any) { res.status(500).json({ error: e.message }); }
// });

// // 6. [BARU] GET UNREAD TOPICS (Untuk Badge Mata)
// router.get('/unread-topics', requireAuth, async (req: AuthedRequest, res: Response) => {
//     try {
//         const unreadNotifs = await Notification.find(
//             { recipient: req.user!.id, isRead: false, topic: { $exists: true, $ne: null } },
//             { topic: 1 }
//         ).lean();
        
//         const topics = [...new Set(unreadNotifs.map((n: any) => n.topic?.toString()).filter((t: any) => !!t))];
//         res.json({ topics });
//     } catch (e: any) { res.status(500).json({ error: e.message }); }
// });

// // 7. [BARU] HAPUS SEMUA NOTIFIKASI (BUG FIXING)
// // Panggil ini untuk membersihkan notif nyangkut
// router.delete('/clear-all', requireAuth, async (req: AuthedRequest, res: Response) => {
//     try {
//         await Notification.deleteMany({ recipient: req.user!.id });
//         res.json({ message: 'Riwayat notifikasi berhasil dibersihkan' });
//     } catch (e: any) { res.status(500).json({ error: e.message }); }
// });

// export default router;

import express, { Response } from 'express';
import { Notification } from '../models/Notification';
import { User } from '../models/User'; 
import { requireAuth, AuthedRequest } from '../middleware/auth';

const router = express.Router();

// 1. GET UNREAD COUNT
router.get('/unread-count', requireAuth, async (req: AuthedRequest, res: Response) => {
    try {
        const userId = req.user!.id;
        const total = await Notification.countDocuments({ recipient: userId, isRead: false });
        const forumCount = await Notification.countDocuments({ recipient: userId, isRead: false, type: { $in: ['reply', 'mention', 'approval'] } });
        const libraryCount = await Notification.countDocuments({ recipient: userId, isRead: false, type: 'system' });
        const blogCount = await Notification.countDocuments({ recipient: userId, isRead: false, type: 'blog' });

        res.json({ count: total, forumCount, libraryCount, blogCount });
    } catch (e: any) { res.status(500).json({ error: e.message }); }
});

// 2. GET ALL NOTIFICATIONS (FIXED: ANTI BLANK)
router.get('/', requireAuth, async (req: AuthedRequest, res: Response) => {
    try {
        const { limit } = req.query; 
        
        const query = Notification.find({ recipient: req.user!.id })
            .populate('sender', 'name avatarUrl role') 
            .sort({ createdAt: -1 });

        if (limit) query.limit(parseInt(limit as string));
        else query.limit(20);

        // [PENTING] Gunakan .lean() agar jadi object JS murni
        const notifs = await query.lean().exec();

        // [PENTING] Safe Mapping: Jika sender terhapus (null), ganti dengan Sistem
        const safeNotifs = notifs.map((n: any) => ({
            ...n,
            sender: n.sender || { name: 'Sistem', role: 'SYSTEM', avatarUrl: null }
        }));

        res.json({ notifications: safeNotifs }); 
    } catch (e: any) { 
        console.error("Notif Error:", e);
        res.status(500).json({ error: e.message }); 
    }
});

// 3. CREATE NOTIFICATION (BROADCAST ADMIN)
router.post('/', requireAuth, async (req: AuthedRequest, res: Response) => {
    try {
        const { recipient, type, message, targetUrl, roleTarget, topic } = req.body;
        const sender = req.user!.id;

        // [FIX URL] Paksa link agar selalu benar
        let fixedUrl = targetUrl;
        if (topic && (type === 'reply' || type === 'course')) {
            fixedUrl = `/admin/courses?highlight=${topic}`;
        }

        // SKENARIO A: Broadcast ke Semua Admin
        if (roleTarget === 'ADMIN') {
            const admins = await User.find({ role: { $regex: /admin/i } });
            if (!admins.length) return res.status(404).json({ message: 'No admins found' });

            const notifications = admins.map(admin => ({
                recipient: admin._id,
                sender: sender,
                type: type || 'system',
                message: message,
                targetUrl: fixedUrl, // Pakai URL yg sudah dibenerin
                topic: topic,
                isRead: false
            }));

            await Notification.insertMany(notifications);
            return res.status(201).json({ message: 'Broadcast sent to Admins' });
        }

        // SKENARIO B: Personal
        const newNotification = new Notification({
            recipient, sender, type, message, 
            targetUrl: fixedUrl, // Pakai URL yg sudah dibenerin
            topic
        });

        await newNotification.save();
        res.status(201).json(newNotification);

    } catch (e: any) { res.status(500).json({ error: e.message }); }
});

// 4. MARK SINGLE READ
router.patch('/:id/read', requireAuth, async (req: AuthedRequest, res: Response) => {
    try {
        const notification = await Notification.findOneAndUpdate(
            { _id: req.params.id, recipient: req.user!.id },
            { isRead: true },
            { new: true }
        );
        res.json(notification);
    } catch (e: any) { res.status(500).json({ error: e.message }); }
});

// 5. MARK ALL READ
router.patch('/mark-read', requireAuth, async (req: AuthedRequest, res: Response) => {
    try {
        await Notification.updateMany({ recipient: req.user!.id, isRead: false }, { isRead: true });
        res.json({ message: 'Marked all as read' });
    } catch (e: any) { res.status(500).json({ error: e.message }); }
});

// 6. GET UNREAD TOPICS (Badge Mata)
router.get('/unread-topics', requireAuth, async (req: AuthedRequest, res: Response) => {
    try {
        const unreadNotifs = await Notification.find(
            { recipient: req.user!.id, isRead: false, topic: { $exists: true, $ne: null } },
            { topic: 1 }
        ).lean();
        const topics = [...new Set(unreadNotifs.map((n: any) => n.topic?.toString()).filter((t: any) => !!t))];
        res.json({ topics });
    } catch (e: any) { res.status(500).json({ error: e.message }); }
});

// 7. [FITUR BARU] RESET TOTAL (Hapus Semua Notifikasi System-Wide)
// Gunakan ini untuk menghilangkan notifikasi "nyangkut"
router.delete('/nuke', requireAuth, async (req: AuthedRequest, res: Response) => {
    try {
        if (!['SUPER_ADMIN', 'ADMIN'].includes(req.user!.role)) {
            return res.status(403).json({ error: "Hanya Admin yang bisa reset data" });
        }
        await Notification.deleteMany({}); // Hapus SEMUA data di koleksi notification
        res.json({ message: '⚠️ SYSTEM RESET: Semua notifikasi berhasil dihapus bersih.' });
    } catch (e: any) { res.status(500).json({ error: e.message }); }
});

export default router;
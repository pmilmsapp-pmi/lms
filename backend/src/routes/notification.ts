// // // // // import express from 'express';
// // // // // import { Notification } from '../models/Notification';
// // // // // import { requireAuth, AuthedRequest } from '../middleware/auth';

// // // // // const router = express.Router();

// // // // // // GET UNREAD COUNT
// // // // // router.get('/unread-count', requireAuth, async (req: AuthedRequest, res) => {
// // // // //     try {
// // // // //         const count = await Notification.countDocuments({ 
// // // // //             recipient: req.user!.id, 
// // // // //             isRead: false 
// // // // //         });
// // // // //         res.json({ count });
// // // // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // });

// // // // // export default router;
// // // // import express from 'express';
// // // // import { Notification } from '../models/Notification';
// // // // import { requireAuth, AuthedRequest } from '../middleware/auth';

// // // // const router = express.Router();

// // // // // GET UNREAD COUNT
// // // // router.get('/unread-count', requireAuth, async (req: AuthedRequest, res) => {
// // // //     try {
// // // //         const count = await Notification.countDocuments({ 
// // // //             recipient: req.user!.id, 
// // // //             isRead: false 
// // // //         });
// // // //         res.json({ count });
// // // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // });

// // // // export default router;
// // // import express, { Response } from 'express';
// // // import { Notification } from '../models/Notification';
// // // import { requireAuth, AuthedRequest } from '../middleware/auth';

// // // const router = express.Router();

// // // // 1. GET UNREAD COUNT (Untuk Badge Merah)
// // // router.get('/unread-count', requireAuth, async (req: AuthedRequest, res: Response) => {
// // //     try {
// // //         const count = await Notification.countDocuments({ 
// // //             recipient: req.user!.id, 
// // //             isRead: false 
// // //         });
// // //         res.json({ count });
// // //     } catch (e: any) {
// // //         res.status(500).json({ error: e.message });
// // //     }
// // // });

// // // // 2. GET ALL NOTIFICATIONS (Untuk Halaman List Notif)
// // // router.get('/', requireAuth, async (req: AuthedRequest, res: Response) => {
// // //     try {
// // //         const notifs = await Notification.find({ recipient: req.user!.id })
// // //             .populate('sender', 'name avatarUrl')
// // //             .populate('topic', 'title') // Opsional: jika ingin menampilkan judul topik
// // //             .sort({ createdAt: -1 })
// // //             .limit(20);
// // //         res.json(notifs);
// // //     } catch (e: any) {
// // //         res.status(500).json({ error: e.message });
// // //     }
// // // });

// // // // 3. MARK AS READ (Saat diklik)
// // // router.patch('/mark-read', requireAuth, async (req: AuthedRequest, res: Response) => {
// // //     try {
// // //         await Notification.updateMany(
// // //             { recipient: req.user!.id, isRead: false },
// // //             { isRead: true }
// // //         );
// // //         res.json({ message: 'Marked as read' });
// // //     } catch (e: any) {
// // //         res.status(500).json({ error: e.message });
// // //     }
// // // });

// // // export default router;
// // import express, { Response } from 'express';
// // import { Notification } from '../models/Notification';
// // import { requireAuth, AuthedRequest } from '../middleware/auth';

// // const router = express.Router();

// // // 1. GET UNREAD COUNT (Untuk Badge Merah)
// // router.get('/unread-count', requireAuth, async (req: AuthedRequest, res: Response) => {
// //     try {
// //         const count = await Notification.countDocuments({ 
// //             recipient: req.user!.id, 
// //             isRead: false 
// //         });
// //         res.json({ count });
// //     } catch (e: any) {
// //         res.status(500).json({ error: e.message });
// //     }
// // });

// // // 2. GET ALL NOTIFICATIONS (Untuk Halaman List Notif)
// // router.get('/', requireAuth, async (req: AuthedRequest, res: Response) => {
// //     try {
// //         const notifs = await Notification.find({ recipient: req.user!.id })
// //             .populate('sender', 'name avatarUrl')
// //             .populate('topic', 'title') // Opsional: tampilkan judul topik
// //             .sort({ createdAt: -1 })
// //             .limit(20);
// //         res.json(notifs);
// //     } catch (e: any) {
// //         res.status(500).json({ error: e.message });
// //     }
// // });

// // // 3. MARK ALL AS READ (Opsional: Tombol "Tandai Semua Dibaca")
// // router.patch('/mark-read', requireAuth, async (req: AuthedRequest, res: Response) => {
// //     try {
// //         await Notification.updateMany(
// //             { recipient: req.user!.id, isRead: false },
// //             { isRead: true }
// //         );
// //         res.json({ message: 'All marked as read' });
// //     } catch (e: any) {
// //         res.status(500).json({ error: e.message });
// //     }
// // });

// // // 4. MARK AS READ BY TOPIC (PENTING: Dipanggil saat buka halaman detail)
// // router.patch('/mark-read/topic/:topicId', requireAuth, async (req: AuthedRequest, res: Response) => {
// //     try {
// //         // Update semua notifikasi milik user ini yang terkait topik ID tersebut
// //         await Notification.updateMany(
// //             { 
// //                 recipient: req.user!.id, 
// //                 topic: req.params.topicId,
// //                 isRead: false 
// //             },
// //             { isRead: true }
// //         );
// //         res.json({ message: 'Topic notifications marked as read' });
// //     } catch (e: any) {
// //         res.status(500).json({ error: e.message });
// //     }
// // });

// // export default router;
// import express, { Response } from 'express';
// import { Notification } from '../models/Notification';
// import { requireAuth, AuthedRequest } from '../middleware/auth';

// const router = express.Router();

// // 1. GET UNREAD COUNT (DIPISAH PER KATEGORI)
// router.get('/unread-count', requireAuth, async (req: AuthedRequest, res: Response) => {
//     try {
//         const userId = req.user!.id;

//         // A. Hitung Notifikasi Forum (Reply, Mention, Approval)
//         const forumCount = await Notification.countDocuments({ 
//             recipient: userId, 
//             isRead: false,
//             type: { $in: ['reply', 'mention', 'approval'] } 
//         });

//         // B. Hitung Notifikasi Perpustakaan/Sistem (System)
//         // Pastikan saat publish buku, type notifikasinya adalah 'system'
//         const libraryCount = await Notification.countDocuments({ 
//             recipient: userId, 
//             isRead: false,
//             type: 'system' 
//         });

//         // C. Total untuk Badge Global (misal di icon lonceng/profil jika ada)
//         const total = forumCount + libraryCount;

//         res.json({ 
//             count: total, 
//             forumCount, 
//             libraryCount 
//         });
//     } catch (e: any) {
//         res.status(500).json({ error: e.message });
//     }
// });

// // 2. GET ALL NOTIFICATIONS
// router.get('/', requireAuth, async (req: AuthedRequest, res: Response) => {
//     try {
//         const notifs = await Notification.find({ recipient: req.user!.id })
//             .populate('sender', 'name avatarUrl')
//             // .populate('topic') // Opsional
//             .sort({ createdAt: -1 })
//             .limit(20);
//         res.json(notifs);
//     } catch (e: any) { res.status(500).json({ error: e.message }); }
// });

// // 3. MARK ALL AS READ
// router.patch('/mark-read', requireAuth, async (req: AuthedRequest, res: Response) => {
//     try {
//         await Notification.updateMany(
//             { recipient: req.user!.id, isRead: false },
//             { isRead: true }
//         );
//         res.json({ message: 'Marked as read' });
//     } catch (e: any) { res.status(500).json({ error: e.message }); }
// });

// // 4. MARK READ BY TOPIC (Dipanggil saat buka halaman detail)
// router.patch('/mark-read/topic/:topicId', requireAuth, async (req: AuthedRequest, res: Response) => {
//     try {
//         await Notification.updateMany(
//             { 
//                 recipient: req.user!.id, 
//                 topic: req.params.topicId,
//                 isRead: false 
//             },
//             { isRead: true }
//         );
//         res.json({ message: 'Topic notifications marked as read' });
//     } catch (e: any) { res.status(500).json({ error: e.message }); }
// });

// export default router;

import express, { Response } from 'express';
import { Notification } from '../models/Notification';
import { requireAuth, AuthedRequest } from '../middleware/auth';

const router = express.Router();

// 1. GET UNREAD COUNT (PERBAIKAN LOGIKA TOTAL)
router.get('/unread-count', requireAuth, async (req: AuthedRequest, res: Response) => {
    try {
        const userId = req.user!.id;

        // 1. Hitung TOTAL semua notifikasi unread (Apapun tipenya)
        // Ini perbaikan utamanya: menghitung secara global agar badge lonceng selalu akurat
        const total = await Notification.countDocuments({ 
            recipient: userId, 
            isRead: false 
        });

        // 2. Hitung Parsial untuk Sub-menu (Opsional)
        // Hitung Notifikasi Forum
        const forumCount = await Notification.countDocuments({ 
            recipient: userId, 
            isRead: false,
            type: { $in: ['reply', 'mention', 'approval'] } 
        });

        // Hitung Notifikasi Perpustakaan (System/Buku)
        const libraryCount = await Notification.countDocuments({ 
            recipient: userId, 
            isRead: false,
            type: 'system' 
        });
        
        // Hitung Notifikasi Blog (Jaga-jaga jika nanti butuh badge khusus di menu blog)
        const blogCount = await Notification.countDocuments({ 
            recipient: userId, 
            isRead: false,
            type: 'blog' 
        });

        res.json({ 
            count: total,       // Dipakai untuk Badge Lonceng Header
            forumCount,         // Dipakai untuk Badge Menu Forum
            libraryCount,       // Dipakai untuk Badge Menu Perpustakaan
            blogCount
        });
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

// 2. GET ALL NOTIFICATIONS
router.get('/', requireAuth, async (req: AuthedRequest, res: Response) => {
    try {
        const notifs = await Notification.find({ recipient: req.user!.id })
            .populate('sender', 'name avatarUrl')
            .sort({ createdAt: -1 })
            .limit(20);
        res.json(notifs);
    } catch (e: any) { res.status(500).json({ error: e.message }); }
});

// 3. MARK ALL AS READ
router.patch('/mark-read', requireAuth, async (req: AuthedRequest, res: Response) => {
    try {
        await Notification.updateMany(
            { recipient: req.user!.id, isRead: false },
            { isRead: true }
        );
        res.json({ message: 'Marked as read' });
    } catch (e: any) { res.status(500).json({ error: e.message }); }
});

// 4. MARK READ BY TOPIC
router.patch('/mark-read/topic/:topicId', requireAuth, async (req: AuthedRequest, res: Response) => {
    try {
        await Notification.updateMany(
            { 
                recipient: req.user!.id, 
                topic: req.params.topicId,
                isRead: false 
            },
            { isRead: true }
        );
        res.json({ message: 'Topic notifications marked as read' });
    } catch (e: any) { res.status(500).json({ error: e.message }); }
});

export default router;
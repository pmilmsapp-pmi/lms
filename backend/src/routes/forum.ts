
// // // // // // // import express, { Response } from 'express';
// // // // // // // import { Forum } from '../models/Forum';
// // // // // // // import { User } from '../models/User';
// // // // // // // import { Notification } from '../models/Notification';
// // // // // // // import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth';

// // // // // // // const router = express.Router();

// // // // // // // // 1. GET ALL TOPICS (LIST)
// // // // // // // router.get('/', requireAuth, async (req: AuthedRequest, res: Response) => {
// // // // // // //   try {
// // // // // // //     const { category, status, author } = req.query;
// // // // // // //     const filter: any = {};
    
// // // // // // //     // Cek Role (Case Insensitive Check)
// // // // // // //     const userRole = req.user!.role.toUpperCase();
// // // // // // //     const isAdmin = userRole === 'SUPER_ADMIN' || userRole === 'FACILITATOR';

// // // // // // //     if (status === 'pending') {
// // // // // // //         // Admin lihat semua pending, User lihat pending sendiri
// // // // // // //         if (!isAdmin) {
// // // // // // //             filter.author = req.user!.id;
// // // // // // //         }
// // // // // // //         filter.status = 'pending';
// // // // // // //     } else {
// // // // // // //         filter.status = 'approved';
// // // // // // //         if (author === 'me') {
// // // // // // //             filter.author = req.user!.id;
// // // // // // //             delete filter.status; 
// // // // // // //         }
// // // // // // //     }

// // // // // // //     if (category && category !== 'Semua') filter.category = category;

// // // // // // //     const topics = await Forum.find(filter)
// // // // // // //       .populate('author', 'name avatarUrl role')
// // // // // // //       .sort({ createdAt: -1 })
// // // // // // //       .lean();

// // // // // // //     res.json({ topics });
// // // // // // //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // // // });

// // // // // // // // 2. GET SINGLE TOPIC (DETAIL) - *** PERBAIKAN UTAMA DISINI ***
// // // // // // // router.get('/:id', requireAuth, async (req: AuthedRequest, res: Response) => {
// // // // // // //   try {
// // // // // // //     const topic = await Forum.findById(req.params.id)
// // // // // // //         .populate('author', 'name avatarUrl role')
// // // // // // //         .populate('replies.user', 'name avatarUrl role');

// // // // // // //     if (!topic) return res.status(404).json({ error: 'Topik tidak ditemukan di database' });

// // // // // // //     // --- DEBUGGING LOG (Cek Terminal Backend Anda saat error ini muncul) ---
// // // // // // //     console.log(`[DEBUG FORUM] User: ${req.user!.name}, Role: ${req.user!.role}, Topic Status: ${topic.status}`);

// // // // // // //     const userRole = req.user!.role.toUpperCase(); // Paksa Uppercase biar aman
// // // // // // //     const isOwner = topic.author._id.toString() === req.user!.id;
// // // // // // //     const isAdmin = userRole === 'SUPER_ADMIN' || userRole === 'FACILITATOR';

// // // // // // //     // Logika Izin: Boleh akses jika (Approved) ATAU (Milik Sendiri) ATAU (Admin)
// // // // // // //     if (topic.status !== 'approved' && !isOwner && !isAdmin) {
// // // // // // //         console.log("[DEBUG FORUM] Access Denied.");
// // // // // // //         return res.status(403).json({ error: 'Akses ditolak. Topik masih menunggu moderasi.' });
// // // // // // //     }

// // // // // // //     res.json(topic);
// // // // // // //   } catch (e: any) { 
// // // // // // //     console.error(e);
// // // // // // //     res.status(500).json({ error: e.message }); 
// // // // // // //   }
// // // // // // // });

// // // // // // // // ... (SISA KODE POST/PATCH/DELETE TETAP SAMA SEPERTI SEBELUMNYA) ...
// // // // // // // // Pastikan route PATCH /:id/status (Approve) dan DELETE ada di file Anda
// // // // // // // // ----------------------------------------------------------------------

// // // // // // // // 3. CREATE TOPIC
// // // // // // // router.post('/', requireAuth, async (req: AuthedRequest, res: Response) => {
// // // // // // //   try {
// // // // // // //     const { title, content, category } = req.body;
// // // // // // //     const userRole = req.user!.role.toUpperCase();
// // // // // // //     const isAdmin = userRole === 'SUPER_ADMIN' || userRole === 'FACILITATOR';
// // // // // // //     const status = isAdmin ? 'approved' : 'pending';

// // // // // // //     const newTopic = await Forum.create({
// // // // // // //       title, content, category,
// // // // // // //       author: req.user!.id,
// // // // // // //       status
// // // // // // //     });

// // // // // // //     if (!isAdmin) {
// // // // // // //         const facilitators = await User.find({ role: { $in: ['SUPER_ADMIN', 'FACILITATOR'] } });
// // // // // // //         if (facilitators.length > 0) {
// // // // // // //             const notifs = facilitators.map(f => ({
// // // // // // //                 recipient: f._id, sender: req.user!.id, type: 'system', topic: newTopic._id,
// // // // // // //                 message: `Topik baru menunggu persetujuan: "${title}"`, isRead: false, createdAt: new Date()
// // // // // // //             }));
// // // // // // //             await Notification.insertMany(notifs);
// // // // // // //         }
// // // // // // //     }
// // // // // // //     res.status(201).json(newTopic);
// // // // // // //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // // // });

// // // // // // // // 4. REPLY TOPIC
// // // // // // // router.post('/:id/reply', requireAuth, async (req: AuthedRequest, res: Response) => {
// // // // // // //   try {
// // // // // // //     const { content } = req.body;
// // // // // // //     const topic = await Forum.findById(req.params.id);
// // // // // // //     if (!topic) return res.status(404).json({ error: 'Topik tidak ditemukan' });

// // // // // // //     topic.replies.push({ user: req.user!.id, content, createdAt: new Date() } as any);
// // // // // // //     await topic.save();
    
// // // // // // //     if (topic.author.toString() !== req.user!.id) {
// // // // // // //         await Notification.create({
// // // // // // //             recipient: topic.author, sender: req.user!.id, type: 'reply', topic: topic._id,
// // // // // // //             message: `mengomentari topik Anda: "${topic.title}"`, isRead: false
// // // // // // //         });
// // // // // // //     }
// // // // // // //     res.json(topic);
// // // // // // //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // // // });

// // // // // // // // 5. UPDATE STATUS (ADMIN ONLY)
// // // // // // // router.patch('/:id/status', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // //     try {
// // // // // // //         const { status } = req.body;
// // // // // // //         const topic = await Forum.findByIdAndUpdate(req.params.id, { status }, { new: true });
// // // // // // //         if (!topic) return res.status(404).json({ error: 'Not found' });
        
// // // // // // //         await Notification.create({
// // // // // // //             recipient: topic.author, sender: req.user!.id, type: 'system', topic: topic._id,
// // // // // // //             message: `Topik Anda "${topic.title}" telah ${status === 'approved' ? 'DISETUJUI' : 'DITOLAK'}.`, isRead: false
// // // // // // //         });
// // // // // // //         res.json(topic);
// // // // // // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // // // });

// // // // // // // // 6. DELETE TOPIC
// // // // // // // router.delete('/:id', requireAuth, async (req: AuthedRequest, res: Response) => {
// // // // // // //     try {
// // // // // // //         const topic = await Forum.findById(req.params.id);
// // // // // // //         if (!topic) return res.status(404).json({ error: 'Not found' });

// // // // // // //         const userRole = req.user!.role.toUpperCase();
// // // // // // //         const isAdmin = userRole === 'SUPER_ADMIN' || userRole === 'FACILITATOR';
// // // // // // //         const isOwner = topic.author.toString() === req.user!.id;

// // // // // // //         if (!isAdmin && !isOwner) return res.status(403).json({ error: 'Forbidden' });

// // // // // // //         await Forum.findByIdAndDelete(req.params.id);
// // // // // // //         res.json({ message: 'Deleted' });
// // // // // // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // // // });

// // // // // // // export default router;
// // // // // // import express, { Response } from 'express';
// // // // // // import { Forum } from '../models/Forum';
// // // // // // import { User } from '../models/User';
// // // // // // import { Notification } from '../models/Notification';
// // // // // // import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth';

// // // // // // const router = express.Router();

// // // // // // // --- HELPER FUNCTION: Kirim Notifikasi ---
// // // // // // // Menggunakan tipe string untuk ID agar tidak error TypeScript
// // // // // // const sendNotif = async (recipientId: string, senderId: string, message: string, topicId: string, type: string = 'system') => {
// // // // // //     try {
// // // // // //         await Notification.create({
// // // // // //             recipient: recipientId,
// // // // // //             sender: senderId,
// // // // // //             type: type,
// // // // // //             topic: topicId,
// // // // // //             message: message,
// // // // // //             isRead: false
// // // // // //         });
// // // // // //     } catch (err) {
// // // // // //         console.error("Gagal mengirim notifikasi:", err);
// // // // // //     }
// // // // // // };

// // // // // // // 0. GET PENDING COUNT (WAJIB DITARUH SEBELUM GET /:id)
// // // // // // // Endpoint ini digunakan oleh ForumNotificationBadge di frontend
// // // // // // router.get('/pending-count', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // //     try {
// // // // // //         const count = await Forum.countDocuments({ status: 'pending' });
// // // // // //         res.json({ count });
// // // // // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // // });

// // // // // // // 1. GET ALL TOPICS (LIST)
// // // // // // router.get('/', requireAuth, async (req: AuthedRequest, res: Response) => {
// // // // // //   try {
// // // // // //     const { category, status, author } = req.query;
// // // // // //     const filter: any = {};
    
// // // // // //     const userRole = req.user!.role.toUpperCase();
// // // // // //     const isAdmin = userRole === 'SUPER_ADMIN' || userRole === 'FACILITATOR';

// // // // // //     if (status === 'pending') {
// // // // // //         if (!isAdmin) {
// // // // // //             filter.author = req.user!.id;
// // // // // //         }
// // // // // //         filter.status = 'pending';
// // // // // //     } else {
// // // // // //         filter.status = 'approved';
// // // // // //         if (author === 'me') {
// // // // // //             filter.author = req.user!.id;
// // // // // //             delete filter.status; 
// // // // // //         }
// // // // // //     }

// // // // // //     if (category && category !== 'Semua') filter.category = category;

// // // // // //     const topics = await Forum.find(filter)
// // // // // //       .populate('author', 'name avatarUrl role')
// // // // // //       .sort({ createdAt: -1 })
// // // // // //       .lean();

// // // // // //     res.json({ topics });
// // // // // //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // // });

// // // // // // // 2. GET SINGLE TOPIC (DETAIL)
// // // // // // router.get('/:id', requireAuth, async (req: AuthedRequest, res: Response) => {
// // // // // //   try {
// // // // // //     const topic = await Forum.findById(req.params.id)
// // // // // //         .populate('author', 'name avatarUrl role')
// // // // // //         .populate('replies.user', 'name avatarUrl role');

// // // // // //     if (!topic) return res.status(404).json({ error: 'Topik tidak ditemukan di database' });

// // // // // //     const userRole = req.user!.role.toUpperCase();
// // // // // //     const isOwner = topic.author._id.toString() === req.user!.id;
// // // // // //     const isAdmin = userRole === 'SUPER_ADMIN' || userRole === 'FACILITATOR';

// // // // // //     if (topic.status !== 'approved' && !isOwner && !isAdmin) {
// // // // // //         return res.status(403).json({ error: 'Akses ditolak. Topik masih menunggu moderasi.' });
// // // // // //     }

// // // // // //     res.json(topic);
// // // // // //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // // });

// // // // // // // 3. CREATE TOPIC (Dengan Notifikasi ke Admin)
// // // // // // router.post('/', requireAuth, async (req: AuthedRequest, res: Response) => {
// // // // // //   try {
// // // // // //     const { title, content, category } = req.body;
// // // // // //     const userRole = req.user!.role.toUpperCase();
// // // // // //     const isAdmin = userRole === 'SUPER_ADMIN' || userRole === 'FACILITATOR';
// // // // // //     const status = isAdmin ? 'approved' : 'pending';

// // // // // //     const newTopic = await Forum.create({
// // // // // //       title, content, category,
// // // // // //       author: req.user!.id,
// // // // // //       status
// // // // // //     });

// // // // // //     // Notifikasi Konfirmasi ke Penulis
// // // // // //     await sendNotif(req.user!.id, req.user!.id, `Topik "${title}" berhasil diajukan.`, newTopic._id.toString());

// // // // // //     // Jika User Biasa -> Notifikasi ke Semua Admin
// // // // // //     if (!isAdmin) {
// // // // // //         const facilitators = await User.find({ role: { $in: ['SUPER_ADMIN', 'FACILITATOR'] } });
// // // // // //         for (const f of facilitators) {
// // // // // //             await sendNotif(
// // // // // //                 f._id.toString(), 
// // // // // //                 req.user!.id, 
// // // // // //                 `Moderasi Baru: "${title}"`, 
// // // // // //                 newTopic._id.toString(), 
// // // // // //                 'system'
// // // // // //             );
// // // // // //         }
// // // // // //     }
// // // // // //     res.status(201).json(newTopic);
// // // // // //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // // });

// // // // // // // 4. REPLY TOPIC (Dengan Deteksi Mention @)
// // // // // // router.post('/:id/reply', requireAuth, async (req: AuthedRequest, res: Response) => {
// // // // // //   try {
// // // // // //     const { content } = req.body;
// // // // // //     const topic = await Forum.findById(req.params.id);
// // // // // //     if (!topic) return res.status(404).json({ error: 'Topik tidak ditemukan' });

// // // // // //     topic.replies.push({ user: req.user!.id, content, createdAt: new Date() } as any);
// // // // // //     await topic.save();
    
// // // // // //     // 1. Notifikasi ke Pemilik Topik (jika yang balas orang lain)
// // // // // //     if (topic.author.toString() !== req.user!.id) {
// // // // // //         await sendNotif(
// // // // // //             topic.author.toString(), 
// // // // // //             req.user!.id, 
// // // // // //             `mengomentari topik Anda: "${topic.title}"`, 
// // // // // //             topic._id.toString(), 
// // // // // //             'reply'
// // // // // //         );
// // // // // //     }

// // // // // //     // 2. Deteksi Mention (@Nama)
// // // // // //     const mentions = content.match(/@\[?([^\]\s]+)\]?/g); // Regex cari @Nama
// // // // // //     if (mentions) {
// // // // // //         for (const m of mentions) {
// // // // // //             const nameToFind = m.replace('@', '').trim();
// // // // // //             const mentionedUser = await User.findOne({ name: new RegExp(`^${nameToFind}$`, 'i') });
            
// // // // // //             // Kirim notif jika user ditemukan dan bukan diri sendiri
// // // // // //             if (mentionedUser && mentionedUser._id.toString() !== req.user!.id) {
// // // // // //                 await sendNotif(
// // // // // //                     mentionedUser._id.toString(),
// // // // // //                     req.user!.id,
// // // // // //                     `menyebut Anda di diskusi "${topic.title}"`,
// // // // // //                     topic._id.toString(),
// // // // // //                     'mention'
// // // // // //                 );
// // // // // //             }
// // // // // //         }
// // // // // //     }

// // // // // //     res.json(topic);
// // // // // //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // // });

// // // // // // // 5. UPDATE STATUS (ADMIN ONLY)
// // // // // // router.patch('/:id/status', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // //     try {
// // // // // //         const { status } = req.body;
// // // // // //         const topic = await Forum.findByIdAndUpdate(req.params.id, { status }, { new: true });
// // // // // //         if (!topic) return res.status(404).json({ error: 'Not found' });
        
// // // // // //         // Notif ke Penulis tentang status baru
// // // // // //         await sendNotif(
// // // // // //             topic.author.toString(),
// // // // // //             req.user!.id,
// // // // // //             `Topik Anda "${topic.title}" telah ${status === 'approved' ? 'DISETUJUI' : 'DITOLAK'}.`,
// // // // // //             topic._id.toString(),
// // // // // //             'system'
// // // // // //         );

// // // // // //         res.json(topic);
// // // // // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // // });

// // // // // // // 6. DELETE SPECIFIC REPLY (MODERATION)
// // // // // // router.delete('/:id/reply/:replyId', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // //     try {
// // // // // //         const topic = await Forum.findById(req.params.id);
// // // // // //         if (!topic) return res.status(404).json({ error: 'Topik tidak ditemukan' });

// // // // // //         // Filter out balasan yang ID-nya cocok
// // // // // //         topic.replies = topic.replies.filter((r: any) => r._id.toString() !== req.params.replyId);
// // // // // //         await topic.save();

// // // // // //         res.json({ message: 'Komentar berhasil dihapus' });
// // // // // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // // });

// // // // // // // 7. DELETE TOPIC
// // // // // // router.delete('/:id', requireAuth, async (req: AuthedRequest, res: Response) => {
// // // // // //     try {
// // // // // //         const topic = await Forum.findById(req.params.id);
// // // // // //         if (!topic) return res.status(404).json({ error: 'Not found' });

// // // // // //         const userRole = req.user!.role.toUpperCase();
// // // // // //         const isAdmin = userRole === 'SUPER_ADMIN' || userRole === 'FACILITATOR';
// // // // // //         const isOwner = topic.author.toString() === req.user!.id;

// // // // // //         if (!isAdmin && !isOwner) return res.status(403).json({ error: 'Forbidden' });

// // // // // //         await Forum.findByIdAndDelete(req.params.id);
// // // // // //         res.json({ message: 'Deleted' });
// // // // // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // // });

// // // // // // export default router;
// // // // // import express, { Response } from 'express';
// // // // // import { Forum } from '../models/Forum';
// // // // // import { User } from '../models/User';
// // // // // import { Notification } from '../models/Notification';
// // // // // import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth';

// // // // // const router = express.Router();

// // // // // // Helper Notifikasi
// // // // // const sendNotif = async (recipientId: string, senderId: string, message: string, topicId: string, type: string = 'system') => {
// // // // //     try {
// // // // //         await Notification.create({
// // // // //             recipient: recipientId,
// // // // //             sender: senderId,
// // // // //             type: type,
// // // // //             topic: topicId,
// // // // //             message: message,
// // // // //             isRead: false
// // // // //         });
// // // // //     } catch (err) {
// // // // //         console.error("Gagal mengirim notifikasi:", err);
// // // // //     }
// // // // // };

// // // // // // 0. GET PENDING COUNT (Untuk Badge Admin)
// // // // // router.get('/pending-count', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // //     try {
// // // // //         const count = await Forum.countDocuments({ status: 'pending' });
// // // // //         res.json({ count });
// // // // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // });

// // // // // // 1. GET ALL TOPICS (LIST) - *** UPDATE PENTING DISINI ***
// // // // // router.get('/', requireAuth, async (req: AuthedRequest, res: Response) => {
// // // // //   try {
// // // // //     const { category, status, author } = req.query;
// // // // //     const filter: any = {};
// // // // //     const userRole = req.user!.role.toUpperCase();
// // // // //     const isAdmin = userRole === 'SUPER_ADMIN' || userRole === 'FACILITATOR';

// // // // //     if (status === 'pending') {
// // // // //         if (!isAdmin) filter.author = req.user!.id;
// // // // //         filter.status = 'pending';
// // // // //     } else {
// // // // //         filter.status = 'approved';
// // // // //         if (author === 'me') {
// // // // //             filter.author = req.user!.id;
// // // // //             delete filter.status; 
// // // // //         }
// // // // //     }

// // // // //     if (category && category !== 'Semua') filter.category = category;

// // // // //     // 1. Ambil data mentah (lean)
// // // // //     const topicsRaw = await Forum.find(filter)
// // // // //       .populate('author', 'name avatarUrl role')
// // // // //       .sort({ createdAt: -1 })
// // // // //       .lean();

// // // // //     // 2. Cek notifikasi unread untuk setiap topik bagi user yg login
// // // // //     const topics = await Promise.all(topicsRaw.map(async (topic) => {
// // // // //         const unreadCount = await Notification.countDocuments({
// // // // //             recipient: req.user!.id,
// // // // //             topic: topic._id,
// // // // //             isRead: false
// // // // //         });
// // // // //         // Tambahkan properti hasUnread: true/false
// // // // //         return { ...topic, hasUnread: unreadCount > 0 };
// // // // //     }));

// // // // //     res.json({ topics });
// // // // //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // });

// // // // // // 2. GET SINGLE TOPIC
// // // // // router.get('/:id', requireAuth, async (req: AuthedRequest, res: Response) => {
// // // // //   try {
// // // // //     const topic = await Forum.findById(req.params.id)
// // // // //         .populate('author', 'name avatarUrl role')
// // // // //         .populate('replies.user', 'name avatarUrl role');

// // // // //     if (!topic) return res.status(404).json({ error: 'Topik tidak ditemukan' });

// // // // //     const userRole = req.user!.role.toUpperCase();
// // // // //     const isOwner = topic.author._id.toString() === req.user!.id;
// // // // //     const isAdmin = userRole === 'SUPER_ADMIN' || userRole === 'FACILITATOR';

// // // // //     if (topic.status !== 'approved' && !isOwner && !isAdmin) {
// // // // //         return res.status(403).json({ error: 'Akses ditolak.' });
// // // // //     }
// // // // //     res.json(topic);
// // // // //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // });

// // // // // // 3. CREATE TOPIC
// // // // // router.post('/', requireAuth, async (req: AuthedRequest, res: Response) => {
// // // // //   try {
// // // // //     const { title, content, category } = req.body;
// // // // //     const userRole = req.user!.role.toUpperCase();
// // // // //     const isAdmin = userRole === 'SUPER_ADMIN' || userRole === 'FACILITATOR';
// // // // //     const status = isAdmin ? 'approved' : 'pending';

// // // // //     const newTopic = await Forum.create({
// // // // //       title, content, category,
// // // // //       author: req.user!.id,
// // // // //       status
// // // // //     });

// // // // //     await sendNotif(req.user!.id, req.user!.id, `Topik "${title}" berhasil diajukan.`, newTopic._id.toString());

// // // // //     if (!isAdmin) {
// // // // //         const admins = await User.find({ role: { $in: ['SUPER_ADMIN', 'FACILITATOR'] } });
// // // // //         for (const admin of admins) {
// // // // //             await sendNotif(admin._id.toString(), req.user!.id, `Menunggu moderasi: "${title}"`, newTopic._id.toString(), 'system');
// // // // //         }
// // // // //     }
// // // // //     res.status(201).json(newTopic);
// // // // //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // });

// // // // // // 4. REPLY TOPIC
// // // // // router.post('/:id/reply', requireAuth, async (req: AuthedRequest, res: Response) => {
// // // // //   try {
// // // // //     const { content } = req.body;
// // // // //     const topic = await Forum.findById(req.params.id);
// // // // //     if (!topic) return res.status(404).json({ error: 'Topik tidak ditemukan' });

// // // // //     topic.replies.push({ user: req.user!.id, content, createdAt: new Date() } as any);
// // // // //     await topic.save();

// // // // //     if (topic.author.toString() !== req.user!.id) {
// // // // //         await sendNotif(topic.author.toString(), req.user!.id, `mengomentari topik Anda: "${topic.title}"`, topic._id.toString(), 'reply');
// // // // //     }

// // // // //     const mentions = content.match(/@\[?([^\]\s]+)\]?/g);
// // // // //     if (mentions) {
// // // // //         for (const m of mentions) {
// // // // //             const nameToFind = m.replace('@', '').trim();
// // // // //             const mentionedUser = await User.findOne({ name: new RegExp(`^${nameToFind}$`, 'i') });
// // // // //             if (mentionedUser && mentionedUser._id.toString() !== req.user!.id) {
// // // // //                 await sendNotif(mentionedUser._id.toString(), req.user!.id, `menyebut Anda di diskusi "${topic.title}"`, topic._id.toString(), 'mention');
// // // // //             }
// // // // //         }
// // // // //     }
// // // // //     res.json(topic);
// // // // //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // });

// // // // // // 5. UPDATE STATUS
// // // // // router.patch('/:id/status', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // //     try {
// // // // //         const { status } = req.body;
// // // // //         const topic = await Forum.findByIdAndUpdate(req.params.id, { status }, { new: true });
// // // // //         if (topic) {
// // // // //             await sendNotif(topic.author.toString(), req.user!.id, `Topik "${topic.title}" telah ${status}.`, topic._id.toString());
// // // // //         }
// // // // //         res.json(topic);
// // // // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // });

// // // // // // 6. DELETE REPLY
// // // // // router.delete('/:id/reply/:replyId', requireAuth, requireFacilitator, async (req, res) => {
// // // // //     try {
// // // // //         const topic = await Forum.findById(req.params.id);
// // // // //         if (!topic) return res.status(404).json({ error: 'Topik tidak ditemukan' });
// // // // //         topic.replies = topic.replies.filter((r: any) => r._id.toString() !== req.params.replyId);
// // // // //         await topic.save();
// // // // //         res.json({ message: 'Balasan dihapus' });
// // // // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // });

// // // // // // 7. DELETE TOPIC
// // // // // router.delete('/:id', requireAuth, async (req: AuthedRequest, res: Response) => {
// // // // //     try {
// // // // //         const topic = await Forum.findById(req.params.id);
// // // // //         if (!topic) return res.status(404).json({ error: 'Not found' });
// // // // //         const isOwner = topic.author.toString() === req.user!.id;
// // // // //         const isAdmin = req.user!.role === 'SUPER_ADMIN' || req.user!.role === 'FACILITATOR';
        
// // // // //         if (!isAdmin && !isOwner) return res.status(403).json({ error: 'Forbidden' });
        
// // // // //         await Forum.findByIdAndDelete(req.params.id);
// // // // //         res.json({ message: 'Deleted' });
// // // // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // });

// // // // // export default router;
// // // // import express, { Response } from 'express';
// // // // import { Forum } from '../models/Forum';
// // // // import { User } from '../models/User';
// // // // import { Notification } from '../models/Notification';
// // // // import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth';

// // // // const router = express.Router();

// // // // // Helper Notifikasi
// // // // const sendNotif = async (recipientId: string, senderId: string, message: string, topicId: string, type: string = 'system') => {
// // // //     try {
// // // //         await Notification.create({
// // // //             recipient: recipientId,
// // // //             sender: senderId,
// // // //             type: type,
// // // //             topic: topicId,
// // // //             message: message,
// // // //             isRead: false
// // // //         });
// // // //     } catch (err) {
// // // //         console.error("Gagal mengirim notifikasi:", err);
// // // //     }
// // // // };

// // // // // 0. GET PENDING COUNT (Untuk Badge Admin)
// // // // router.get('/pending-count', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // //     try {
// // // //         const count = await Forum.countDocuments({ status: 'pending' });
// // // //         res.json({ count });
// // // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // });

// // // // // 1. GET ALL TOPICS (LIST)
// // // // router.get('/', requireAuth, async (req: AuthedRequest, res: Response) => {
// // // //   try {
// // // //     const { category, status, author } = req.query;
// // // //     const filter: any = {};
// // // //     const userRole = req.user!.role.toUpperCase();
// // // //     const isAdmin = userRole === 'SUPER_ADMIN' || userRole === 'FACILITATOR';

// // // //     if (status === 'pending') {
// // // //         if (!isAdmin) filter.author = req.user!.id;
// // // //         filter.status = 'pending';
// // // //     } else {
// // // //         filter.status = 'approved';
// // // //         if (author === 'me') {
// // // //             filter.author = req.user!.id;
// // // //             delete filter.status; 
// // // //         }
// // // //     }

// // // //     if (category && category !== 'Semua') filter.category = category;

// // // //     // 1. Ambil data mentah (lean)
// // // //     const topicsRaw = await Forum.find(filter)
// // // //       .populate('author', 'name avatarUrl role')
// // // //       .sort({ createdAt: -1 })
// // // //       .lean();

// // // //     // 2. Cek notifikasi unread untuk setiap topik bagi user yg login
// // // //     const topics = await Promise.all(topicsRaw.map(async (topic) => {
// // // //         const unreadCount = await Notification.countDocuments({
// // // //             recipient: req.user!.id,
// // // //             topic: topic._id,
// // // //             isRead: false
// // // //         });
// // // //         // Tambahkan properti hasUnread: true/false
// // // //         return { ...topic, hasUnread: unreadCount > 0 };
// // // //     }));

// // // //     res.json({ topics });
// // // //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // });

// // // // // 2. GET SINGLE TOPIC
// // // // router.get('/:id', requireAuth, async (req: AuthedRequest, res: Response) => {
// // // //   try {
// // // //     const topic = await Forum.findById(req.params.id)
// // // //         .populate('author', 'name avatarUrl role')
// // // //         .populate('replies.user', 'name avatarUrl role');

// // // //     if (!topic) return res.status(404).json({ error: 'Topik tidak ditemukan' });

// // // //     const userRole = req.user!.role.toUpperCase();
// // // //     const isOwner = topic.author._id.toString() === req.user!.id;
// // // //     const isAdmin = userRole === 'SUPER_ADMIN' || userRole === 'FACILITATOR';

// // // //     if (topic.status !== 'approved' && !isOwner && !isAdmin) {
// // // //         return res.status(403).json({ error: 'Akses ditolak.' });
// // // //     }
// // // //     res.json(topic);
// // // //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // });

// // // // // 3. CREATE TOPIC
// // // // router.post('/', requireAuth, async (req: AuthedRequest, res: Response) => {
// // // //   try {
// // // //     const { title, content, category } = req.body;
// // // //     const userRole = req.user!.role.toUpperCase();
// // // //     const isAdmin = userRole === 'SUPER_ADMIN' || userRole === 'FACILITATOR';
// // // //     const status = isAdmin ? 'approved' : 'pending';

// // // //     const newTopic = await Forum.create({
// // // //       title, content, category,
// // // //       author: req.user!.id,
// // // //       status
// // // //     });

// // // //     await sendNotif(req.user!.id, req.user!.id, `Topik "${title}" berhasil diajukan.`, newTopic._id.toString());

// // // //     if (!isAdmin) {
// // // //         const admins = await User.find({ role: { $in: ['SUPER_ADMIN', 'FACILITATOR'] } });
// // // //         for (const admin of admins) {
// // // //             await sendNotif(admin._id.toString(), req.user!.id, `Menunggu moderasi: "${title}"`, newTopic._id.toString(), 'system');
// // // //         }
// // // //     }
// // // //     res.status(201).json(newTopic);
// // // //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // });

// // // // // 4. REPLY TOPIC
// // // // router.post('/:id/reply', requireAuth, async (req: AuthedRequest, res: Response) => {
// // // //   try {
// // // //     const { content } = req.body;
// // // //     const topic = await Forum.findById(req.params.id);
// // // //     if (!topic) return res.status(404).json({ error: 'Topik tidak ditemukan' });

// // // //     topic.replies.push({ user: req.user!.id, content, createdAt: new Date() } as any);
// // // //     await topic.save();

// // // //     if (topic.author.toString() !== req.user!.id) {
// // // //         await sendNotif(topic.author.toString(), req.user!.id, `mengomentari topik Anda: "${topic.title}"`, topic._id.toString(), 'reply');
// // // //     }

// // // //     const mentions = content.match(/@\[?([^\]\s]+)\]?/g);
// // // //     if (mentions) {
// // // //         for (const m of mentions) {
// // // //             const nameToFind = m.replace('@', '').trim();
// // // //             const mentionedUser = await User.findOne({ name: new RegExp(`^${nameToFind}$`, 'i') });
// // // //             if (mentionedUser && mentionedUser._id.toString() !== req.user!.id) {
// // // //                 await sendNotif(mentionedUser._id.toString(), req.user!.id, `menyebut Anda di diskusi "${topic.title}"`, topic._id.toString(), 'mention');
// // // //             }
// // // //         }
// // // //     }
// // // //     res.json(topic);
// // // //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // });

// // // // // 5. UPDATE STATUS
// // // // router.patch('/:id/status', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // //     try {
// // // //         const { status } = req.body;
// // // //         const topic = await Forum.findByIdAndUpdate(req.params.id, { status }, { new: true });
// // // //         if (topic) {
// // // //             await sendNotif(topic.author.toString(), req.user!.id, `Topik "${topic.title}" telah ${status}.`, topic._id.toString());
// // // //         }
// // // //         res.json(topic);
// // // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // });

// // // // // 6. DELETE REPLY
// // // // router.delete('/:id/reply/:replyId', requireAuth, requireFacilitator, async (req, res) => {
// // // //     try {
// // // //         const topic = await Forum.findById(req.params.id);
// // // //         if (!topic) return res.status(404).json({ error: 'Topik tidak ditemukan' });
// // // //         topic.replies = topic.replies.filter((r: any) => r._id.toString() !== req.params.replyId);
// // // //         await topic.save();
// // // //         res.json({ message: 'Balasan dihapus' });
// // // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // });

// // // // // 7. DELETE TOPIC
// // // // router.delete('/:id', requireAuth, async (req: AuthedRequest, res: Response) => {
// // // //     try {
// // // //         const topic = await Forum.findById(req.params.id);
// // // //         if (!topic) return res.status(404).json({ error: 'Not found' });
// // // //         const isOwner = topic.author.toString() === req.user!.id;
// // // //         const isAdmin = req.user!.role === 'SUPER_ADMIN' || req.user!.role === 'FACILITATOR';
        
// // // //         if (!isAdmin && !isOwner) return res.status(403).json({ error: 'Forbidden' });
        
// // // //         await Forum.findByIdAndDelete(req.params.id);
// // // //         res.json({ message: 'Deleted' });
// // // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // });

// // // // export default router;

// // // import express, { Response } from 'express';
// // // import { Forum } from '../models/Forum';
// // // import { User } from '../models/User';
// // // import { Notification } from '../models/Notification';
// // // import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth';
// // // import { 
// // //     addComment, 
// // //     getComments, 
// // //     deleteComment,
// // //     createForum,
// // //     getForums,
// // //     getForumById
// // // } from '../controllers/forumController';

// // // const router = express.Router();

// // // // Helper Notifikasi
// // // const sendNotif = async (recipientId: string, senderId: string, message: string, topicId: string, type: string = 'system') => {
// // //     try {
// // //         await Notification.create({
// // //             recipient: recipientId, sender: senderId, type: type, topic: topicId, message: message, isRead: false
// // //         });
// // //     } catch (err) { console.error("Gagal notif:", err); }
// // // };

// // // // 1. Pending Count
// // // router.get('/pending-count', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // //     try {
// // //         const count = await Forum.countDocuments({ status: 'pending' });
// // //         res.json({ count });
// // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // });

// // // // --- [FIX] ROUTE KOMENTAR HARUS DIATAS ROUTE /:id ---
// // // // Agar express tidak mengira "comments" adalah sebuah ID forum
// // // router.get('/:forumId/comments', getComments);
// // // router.post('/:forumId/comments', requireAuth, addComment);
// // // router.delete('/:forumId/comments/:commentId', requireAuth, deleteComment);

// // // // 2. List Forum
// // // router.get('/', requireAuth, getForums);

// // // // 3. Create Forum
// // // router.post('/', requireAuth, createForum);

// // // // 4. Update Status
// // // router.patch('/:id/status', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // //     try {
// // //         const { status } = req.body;
// // //         const topic = await Forum.findByIdAndUpdate(req.params.id, { status }, { new: true });
// // //         if (topic) {
// // //             await sendNotif(topic.author.toString(), req.user!.id, `Topik "${topic.title}" telah ${status}.`, topic._id.toString());
// // //         }
// // //         res.json(topic);
// // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // });

// // // // 5. Delete Forum
// // // router.delete('/:id', requireAuth, async (req: AuthedRequest, res: Response) => {
// // //     try {
// // //         const topic = await Forum.findById(req.params.id);
// // //         if (!topic) return res.status(404).json({ error: 'Not found' });
// // //         const isOwner = topic.author.toString() === req.user!.id;
// // //         const isAdmin = req.user!.role === 'SUPER_ADMIN' || req.user!.role === 'FACILITATOR';
        
// // //         if (!isAdmin && !isOwner) return res.status(403).json({ error: 'Forbidden' });
        
// // //         await Forum.findByIdAndDelete(req.params.id);
// // //         res.json({ message: 'Deleted' });
// // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // });

// // // // 6. Get Single Forum (Ini menangkap semua request /:id, makanya ditaruh paling bawah)
// // // router.get('/:id', requireAuth, getForumById);

// // // export default router;


// // import express, { Response } from 'express';
// // import { Forum } from '../models/Forum';
// // import { User } from '../models/User';
// // import { Notification } from '../models/Notification';
// // import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth';
// // import { 
// //     addComment, 
// //     getComments, 
// //     deleteComment,
// //     createForum,
// //     getForums,
// //     getForumById
// // } from '../controllers/forumController';

// // const router = express.Router();

// // // Helper Notifikasi
// // const sendNotif = async (recipientId: string, senderId: string, message: string, topicId: string, type: string = 'system') => {
// //     try {
// //         await Notification.create({
// //             recipient: recipientId, sender: senderId, type: type, topic: topicId, message: message, isRead: false
// //         });
// //     } catch (err) { console.error("Gagal notif:", err); }
// // };

// // // 1. Pending Count (Static Route)
// // router.get('/pending-count', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// //     try {
// //         const count = await Forum.countDocuments({ status: 'pending' });
// //         res.json({ count });
// //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // });

// // // --- [CRITICAL FIX] ROUTE KOMENTAR HARUS SEBELUM ROUTE /:id ---
// // // Jika ditaruh di bawah, 'comments' akan dianggap sebagai ID forum
// // router.get('/:forumId/comments', getComments);
// // router.post('/:forumId/comments', requireAuth, addComment);
// // router.delete('/:forumId/comments/:commentId', requireAuth, deleteComment);

// // // 2. Main Forum Routes
// // router.get('/', requireAuth, getForums);
// // router.post('/', requireAuth, createForum);

// // // 3. Update Status
// // router.patch('/:id/status', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// //     try {
// //         const { status } = req.body;
// //         const topic = await Forum.findByIdAndUpdate(req.params.id, { status }, { new: true });
// //         if (topic) {
// //             await sendNotif(topic.author.toString(), req.user!.id, `Topik "${topic.title}" telah ${status}.`, topic._id.toString());
// //         }
// //         res.json(topic);
// //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // });

// // // 4. Delete Forum
// // router.delete('/:id', requireAuth, async (req: AuthedRequest, res: Response) => {
// //     try {
// //         const topic = await Forum.findById(req.params.id);
// //         if (!topic) return res.status(404).json({ error: 'Not found' });
// //         const isOwner = topic.author.toString() === req.user!.id;
// //         const isAdmin = req.user!.role === 'SUPER_ADMIN' || req.user!.role === 'FACILITATOR';
        
// //         if (!isAdmin && !isOwner) return res.status(403).json({ error: 'Forbidden' });
        
// //         await Forum.findByIdAndDelete(req.params.id);
// //         res.json({ message: 'Deleted' });
// //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // });

// // // 5. Get Single Forum (Route Wildcard /:id Paling Bawah)
// // router.get('/:id', requireAuth, getForumById);

// // export default router;


// import { Router } from 'express';
// import { requireAuth, requireFacilitator } from '../middleware/auth';
// import { 
//     getForums, 
//     getForumById, 
//     createForum, 
//     updateForumStatus, 
//     deleteForum, 
//     togglePinForum,
//     getForumComments,
//     addForumComment
// } from '../controllers/forumController';

// const router = Router();

// // --- PUBLIC / LIST ---
// router.get('/', getForums);

// // --- CREATE (HARUS DI ATAS :id) ---
// router.post('/', requireAuth, createForum);

// // --- ADMIN ACTIONS ---
// router.patch('/:id/status', requireAuth, requireFacilitator, updateForumStatus);
// router.patch('/:id/pin', requireAuth, requireFacilitator, togglePinForum);
// router.delete('/:id', requireAuth, requireFacilitator, deleteForum);

// // --- COMMENTS ---
// router.get('/:id/comments', getForumComments);
// router.post('/:id/comments', requireAuth, addForumComment);

// // --- DETAIL (WILDCARD PALING BAWAH) ---
// // Ini yang sebelumnya menangkap "create" dan bikin error
// router.get('/:id', getForumById);

// export default router;



import { Router } from 'express';
// [UPDATED] Import requirePermission
import { requireAuth, requireFacilitator, requirePermission } from '../middleware/auth';
import { 
    getForums, 
    getForumById, 
    createForum, 
    updateForumStatus, 
    deleteForum, 
    togglePinForum,
    getForumComments,
    addForumComment
} from '../controllers/forumController';

const router = Router();

// --- PUBLIC / LIST ---
router.get('/', getForums);

// --- CREATE ---
// [UPDATED] Student butuh izin 'forum.create_topic'
router.post('/', requireAuth, requirePermission('forum.create_topic'), createForum);

// --- ADMIN ACTIONS ---
// [UPDATED] Admin butuh izin 'manage_forum'
router.patch('/:id/status', requireAuth, requirePermission('manage_forum'), updateForumStatus);
router.patch('/:id/pin', requireAuth, requirePermission('manage_forum'), togglePinForum);
router.delete('/:id', requireAuth, requirePermission('manage_forum'), deleteForum);

// --- COMMENTS ---
router.get('/:id/comments', getForumComments);
// [UPDATED] Student butuh izin 'forum.reply'
router.post('/:id/comments', requireAuth, requirePermission('forum.reply'), addForumComment);

// --- DETAIL (WILDCARD) ---
router.get('/:id', getForumById);

export default router;
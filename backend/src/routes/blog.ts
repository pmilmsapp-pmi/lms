
// // // // // // // // import express from 'express';
// // // // // // // // import { Blog } from '../models/Blog';
// // // // // // // // import { User } from '../models/User'; 
// // // // // // // // import { Notification } from '../models/Notification';
// // // // // // // // import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth';
// // // // // // // // import slugify from 'slugify';

// // // // // // // // const router = express.Router();

// // // // // // // // // =========================================================================
// // // // // // // // // PENTING: Route statis (/public, /admin, /seed) HARUS DI ATAS route dinamis (/:id)
// // // // // // // // // =========================================================================

// // // // // // // // // 1. GET PUBLIC (Approved Only)
// // // // // // // // router.get('/public', async (req, res) => {
// // // // // // // //   try {
// // // // // // // //     const blogs = await Blog.find({ status: 'approved' })
// // // // // // // //       .populate('author', 'name avatarUrl role')
// // // // // // // //       .sort({ createdAt: -1 });
// // // // // // // //     res.json(blogs);
// // // // // // // //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // // // // });

// // // // // // // // // 2. GET ADMIN ALL (Approved, Pending, Rejected)
// // // // // // // // router.get('/admin', requireAuth, requireFacilitator, async (req, res) => {
// // // // // // // //   try {
// // // // // // // //     const blogs = await Blog.find()
// // // // // // // //       .populate('author', 'name avatarUrl role')
// // // // // // // //       .sort({ createdAt: -1 });
// // // // // // // //     res.json(blogs);
// // // // // // // //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // // // // });

// // // // // // // // // 3. SEED DATA PMI (Import)
// // // // // // // // router.post('/seed-pmi', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
// // // // // // // //     try {
// // // // // // // //         const realStories = [
// // // // // // // //              {
// // // // // // // //                 title: "Dari Korporasi ke Komunitas: Kisah Rindu",
// // // // // // // //                 content: "Rindu belajar bagaimana menggabungkan keahlian profesionalnya...",
// // // // // // // //                 coverUrl: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80", 
// // // // // // // //                 tags: ["Inspirasi", "Profesional"],
// // // // // // // //                 source: "PMI Official"
// // // // // // // //             },
// // // // // // // //             {
// // // // // // // //                 title: "Kenangan Tsunami Aceh: Pertemuan di Tenda PMI",
// // // // // // // //                 content: "Saat bingung itulah kulihat seorang abang leting...",
// // // // // // // //                 coverUrl: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=800&q=80",
// // // // // // // //                 tags: ["Sejarah", "Tsunami Aceh"],
// // // // // // // //                 source: "PMI Official"
// // // // // // // //             },
// // // // // // // //             {
// // // // // // // //                 title: "Aksi Heroik Budi di Tengah Banjir Bandang",
// // // // // // // //                 content: "Pada hari Kamis, 17 April, air bah datang tiba-tiba...",
// // // // // // // //                 coverUrl: "https://images.unsplash.com/photo-1541696230303-31d516279932?auto=format&fit=crop&w=800&q=80",
// // // // // // // //                 tags: ["Bencana", "Evakuasi"],
// // // // // // // //                 source: "PMI Official"
// // // // // // // //             }
// // // // // // // //         ];

// // // // // // // //         for (const story of realStories) {
// // // // // // // //             const slug = slugify(story.title, { lower: true, strict: true }) + '-' + Date.now();
// // // // // // // //             await Blog.create({
// // // // // // // //                 ...story,
// // // // // // // //                 slug: slug,
// // // // // // // //                 status: 'approved',
// // // // // // // //                 author: req.user!.id 
// // // // // // // //             });
// // // // // // // //         }
// // // // // // // //         res.json({ message: 'Data berhasil diimport!' });
// // // // // // // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // // // // });

// // // // // // // // // =========================================================================
// // // // // // // // // ROUTE DENGAN PARAMETER :ID (TARUH DI BAWAH)
// // // // // // // // // =========================================================================

// // // // // // // // // 4. GET SINGLE BLOG
// // // // // // // // router.get('/:id', async (req, res) => {
// // // // // // // //   try {
// // // // // // // //     const blog = await Blog.findById(req.params.id).populate('author', 'name avatarUrl role');
// // // // // // // //     if (!blog) return res.status(404).json({ error: 'Blog tidak ditemukan' });
// // // // // // // //     res.json(blog);
// // // // // // // //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // // // // });

// // // // // // // // // 5. UPDATE STATUS (Approve/Reject)
// // // // // // // // router.patch('/:id/status', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
// // // // // // // //   try {
// // // // // // // //     const { status } = req.body;
// // // // // // // //     const blog = await Blog.findByIdAndUpdate(req.params.id, { status }, { new: true });
    
// // // // // // // //     // Notifikasi ke Penulis
// // // // // // // //     if (blog?.author) {
// // // // // // // //         await Notification.create({
// // // // // // // //             recipient: blog.author,
// // // // // // // //             sender: req.user!.id,
// // // // // // // //             type: 'reply',
// // // // // // // //             topic: blog._id,
// // // // // // // //             message: `Cerita Anda "${blog.title}" telah ${status === 'approved' ? 'DISETUJUI' : 'DITOLAK'}.`,
// // // // // // // //             isRead: false
// // // // // // // //         });
// // // // // // // //     }
// // // // // // // //     res.json(blog);
// // // // // // // //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // // // // });

// // // // // // // // // 6. UPDATE CONTENT (Edit Blog) - FITUR BARU
// // // // // // // // router.patch('/:id', requireAuth, requireFacilitator, async (req, res) => {
// // // // // // // //     try {
// // // // // // // //         const { title, content, coverUrl, tags } = req.body;
// // // // // // // //         const blog = await Blog.findByIdAndUpdate(req.params.id, { 
// // // // // // // //             title, content, coverUrl, tags 
// // // // // // // //         }, { new: true });
// // // // // // // //         res.json(blog);
// // // // // // // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // // // // });

// // // // // // // // // 7. DELETE BLOG
// // // // // // // // router.delete('/:id', requireAuth, requireFacilitator, async (req, res) => {
// // // // // // // //   try {
// // // // // // // //     await Blog.findByIdAndDelete(req.params.id);
// // // // // // // //     res.json({ message: 'Deleted' });
// // // // // // // //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // // // // });

// // // // // // // // // 8. CREATE BLOG
// // // // // // // // router.post('/', requireAuth, async (req: AuthedRequest, res) => {
// // // // // // // //   try {
// // // // // // // //     const { title, content, coverUrl, tags } = req.body;
// // // // // // // //     const isAdmin = req.user!.role === 'SUPER_ADMIN' || req.user!.role === 'FACILITATOR';
// // // // // // // //     const status = isAdmin ? 'approved' : 'pending';
// // // // // // // //     const slug = slugify(title, { lower: true, strict: true }) + '-' + Date.now();

// // // // // // // //     const newBlog = await Blog.create({
// // // // // // // //       title, slug, content, coverUrl, tags, status, author: req.user!.id
// // // // // // // //     });

// // // // // // // //     // Notifikasi ke Admin
// // // // // // // //     if (!isAdmin) {
// // // // // // // //         const facilitators = await User.find({ role: { $in: ['SUPER_ADMIN', 'FACILITATOR'] } });
// // // // // // // //         const notifs = facilitators.map(f => ({
// // // // // // // //             recipient: f._id, sender: req.user!.id, type: 'mention', topic: newBlog._id,
// // // // // // // //             message: `Mengajukan cerita baru: "${title}"`, isRead: false, createdAt: new Date()
// // // // // // // //         }));
// // // // // // // //         if(notifs.length > 0) await Notification.insertMany(notifs);
// // // // // // // //     }
// // // // // // // //     res.status(201).json(newBlog);
// // // // // // // //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // // // // });

// // // // // // // // export default router;
// // // // // // // import express, { Response } from 'express';
// // // // // // // import { Blog } from '../models/Blog';
// // // // // // // import { User } from '../models/User'; 
// // // // // // // import { Notification } from '../models/Notification';
// // // // // // // import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth';
// // // // // // // import slugify from 'slugify';

// // // // // // // const router = express.Router();

// // // // // // // // Helper untuk kirim notifikasi single
// // // // // // // const sendNotif = async (recipientId: string, senderId: string, message: string, topicId: string, type: string) => {
// // // // // // //     try {
// // // // // // //         await Notification.create({
// // // // // // //             recipient: recipientId,
// // // // // // //             sender: senderId,
// // // // // // //             message: message,
// // // // // // //             topic: topicId,
// // // // // // //             type: type,
// // // // // // //             isRead: false
// // // // // // //         });
// // // // // // //     } catch (e) {
// // // // // // //         console.error("Gagal kirim notif:", e);
// // // // // // //     }
// // // // // // // };

// // // // // // // // =========================================================================
// // // // // // // // ROUTE STATIS
// // // // // // // // =========================================================================

// // // // // // // // 1. GET PUBLIC (Approved Only)
// // // // // // // router.get('/public', async (req, res) => {
// // // // // // //   try {
// // // // // // //     const blogs = await Blog.find({ status: 'approved' }) // Perbaiki 'published' jadi 'approved' sesuai schema Anda
// // // // // // //       .populate('author', 'name avatarUrl role')
// // // // // // //       .sort({ createdAt: -1 });
// // // // // // //     res.json(blogs);
// // // // // // //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // // // });

// // // // // // // // 2. GET ADMIN ALL (Approved, Pending, Rejected)
// // // // // // // router.get('/admin', requireAuth, requireFacilitator, async (req, res) => {
// // // // // // //   try {
// // // // // // //     const blogs = await Blog.find()
// // // // // // //       .populate('author', 'name avatarUrl role')
// // // // // // //       .sort({ createdAt: -1 });
// // // // // // //     res.json(blogs);
// // // // // // //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // // // });

// // // // // // // // 3. SEED DATA PMI
// // // // // // // router.post('/seed-pmi', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
// // // // // // //     try {
// // // // // // //         const realStories = [
// // // // // // //              {
// // // // // // //                 title: "Dari Korporasi ke Komunitas: Kisah Rindu",
// // // // // // //                 content: "Rindu belajar bagaimana menggabungkan keahlian profesionalnya...",
// // // // // // //                 coverUrl: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80", 
// // // // // // //                 tags: ["Inspirasi", "Profesional"],
// // // // // // //                 source: "PMI Official"
// // // // // // //             },
// // // // // // //             // ... (sisa data seed sama)
// // // // // // //         ];

// // // // // // //         for (const story of realStories) {
// // // // // // //             const slug = slugify(story.title, { lower: true, strict: true }) + '-' + Date.now();
// // // // // // //             await Blog.create({
// // // // // // //                 ...story,
// // // // // // //                 slug: slug,
// // // // // // //                 status: 'approved',
// // // // // // //                 author: req.user!.id 
// // // // // // //             });
// // // // // // //         }
// // // // // // //         res.json({ message: 'Data berhasil diimport!' });
// // // // // // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // // // });

// // // // // // // // =========================================================================
// // // // // // // // ROUTE DINAMIS (CREATE, UPDATE, DELETE)
// // // // // // // // =========================================================================

// // // // // // // // 8. CREATE BLOG (Pindah ke atas agar tidak tertukar dengan /:id)
// // // // // // // router.post('/', requireAuth, async (req: AuthedRequest, res: Response) => {
// // // // // // //   try {
// // // // // // //     const { title, content, coverUrl, tags } = req.body;
// // // // // // //     const userRole = req.user!.role.toUpperCase();
// // // // // // //     const isAdmin = userRole === 'SUPER_ADMIN' || userRole === 'FACILITATOR';
    
// // // // // // //     // Admin langsung approved, User pending
// // // // // // //     const status = isAdmin ? 'approved' : 'pending';
// // // // // // //     const slug = slugify(title, { lower: true, strict: true }) + '-' + Date.now();

// // // // // // //     const newBlog = await Blog.create({
// // // // // // //       title, slug, content, coverUrl, tags, status, author: req.user!.id
// // // // // // //     });

// // // // // // //     if (isAdmin) {
// // // // // // //         // SKENARIO A: Admin Posting -> Blast ke Semua User
// // // // // // //         const allUsers = await User.find({ _id: { $ne: req.user!.id } }).select('_id');
// // // // // // //         if (allUsers.length > 0) {
// // // // // // //             const notifs = allUsers.map(u => ({
// // // // // // //                 recipient: u._id,
// // // // // // //                 sender: req.user!.id,
// // // // // // //                 type: 'blog', // Tipe Blog
// // // // // // //                 topic: newBlog._id,
// // // // // // //                 message: `Berita Terbaru: "${title}"`,
// // // // // // //                 isRead: false,
// // // // // // //                 createdAt: new Date()
// // // // // // //             }));
// // // // // // //             await Notification.insertMany(notifs);
// // // // // // //         }
// // // // // // //     } else {
// // // // // // //         // SKENARIO B: User Posting -> Notif ke Admin
// // // // // // //         const admins = await User.find({ role: { $in: ['SUPER_ADMIN', 'FACILITATOR'] } });
// // // // // // //         for (const admin of admins) {
// // // // // // //             await sendNotif(
// // // // // // //                 admin._id.toString(), 
// // // // // // //                 req.user!.id, 
// // // // // // //                 `Pengajuan Cerita Baru: "${title}"`, 
// // // // // // //                 newBlog._id.toString(), 
// // // // // // //                 'approval' // Tipe Approval
// // // // // // //             );
// // // // // // //         }
// // // // // // //     }
// // // // // // //     res.status(201).json(newBlog);
// // // // // // //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // // // });

// // // // // // // // 4. GET SINGLE BLOG
// // // // // // // router.get('/:id', async (req, res) => {
// // // // // // //   try {
// // // // // // //     const blog = await Blog.findById(req.params.id).populate('author', 'name avatarUrl role');
// // // // // // //     if (!blog) return res.status(404).json({ error: 'Blog tidak ditemukan' });
// // // // // // //     res.json(blog);
// // // // // // //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // // // });

// // // // // // // // 5. UPDATE STATUS (Approve/Reject) & NOTIFIKASI
// // // // // // // router.patch('/:id/status', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // // //   try {
// // // // // // //     const { status } = req.body;
// // // // // // //     const blog = await Blog.findByIdAndUpdate(req.params.id, { status }, { new: true });
    
// // // // // // //     if (!blog) return res.status(404).json({ error: 'Not found' });

// // // // // // //     // SKENARIO C: Notifikasi Balik ke Penulis
// // // // // // //     if (blog.author.toString() !== req.user!.id) {
// // // // // // //         const msg = status === 'approved' 
// // // // // // //             ? `Cerita Anda "${blog.title}" telah TERBIT!` 
// // // // // // //             : `Maaf, cerita "${blog.title}" belum dapat ditayangkan.`;
        
// // // // // // //         await sendNotif(
// // // // // // //             blog.author.toString(),
// // // // // // //             req.user!.id,
// // // // // // //             msg,
// // // // // // //             blog._id.toString(),
// // // // // // //             'blog' // Arahkan user melihat blognya
// // // // // // //         );
// // // // // // //     }
// // // // // // //     res.json(blog);
// // // // // // //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // // // });

// // // // // // // // 6. UPDATE CONTENT
// // // // // // // router.patch('/:id', requireAuth, requireFacilitator, async (req, res) => {
// // // // // // //     try {
// // // // // // //         const { title, content, coverUrl, tags } = req.body;
// // // // // // //         const blog = await Blog.findByIdAndUpdate(req.params.id, { 
// // // // // // //             title, content, coverUrl, tags 
// // // // // // //         }, { new: true });
// // // // // // //         res.json(blog);
// // // // // // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // // // });

// // // // // // // // 7. DELETE BLOG
// // // // // // // router.delete('/:id', requireAuth, requireFacilitator, async (req, res) => {
// // // // // // //   try {
// // // // // // //     await Blog.findByIdAndDelete(req.params.id);
// // // // // // //     res.json({ message: 'Deleted' });
// // // // // // //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // // // });

// // // // // // // export default router;
// // // // // // import express, { Response } from 'express';
// // // // // // import { Blog } from '../models/Blog';
// // // // // // import { User } from '../models/User'; 
// // // // // // import { Notification } from '../models/Notification';
// // // // // // import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth';
// // // // // // import slugify from 'slugify';

// // // // // // const router = express.Router();

// // // // // // // Helper untuk kirim notifikasi single
// // // // // // const sendNotif = async (recipientId: string, senderId: string, message: string, topicId: string, type: string) => {
// // // // // //     try {
// // // // // //         await Notification.create({
// // // // // //             recipient: recipientId, sender: senderId, message, topic: topicId, type, isRead: false
// // // // // //         });
// // // // // //     } catch (e) { console.error("Notif Error:", e); }
// // // // // // };

// // // // // // // =========================================================================
// // // // // // // ROUTE STATIS
// // // // // // // =========================================================================

// // // // // // // 1. GET PUBLIC (Approved Only)
// // // // // // router.get('/public', async (req, res) => {
// // // // // //   try {
// // // // // //     const blogs = await Blog.find({ status: 'approved' }) 
// // // // // //       .populate('author', 'name avatarUrl role')
// // // // // //       .sort({ createdAt: -1 });
// // // // // //     res.json(blogs);
// // // // // //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // // });

// // // // // // // 2. GET ADMIN ALL (Approved, Pending, Rejected)
// // // // // // router.get('/admin', requireAuth, requireFacilitator, async (req, res) => {
// // // // // //   try {
// // // // // //     const blogs = await Blog.find()
// // // // // //       .populate('author', 'name avatarUrl role')
// // // // // //       .sort({ createdAt: -1 });
// // // // // //     res.json(blogs);
// // // // // //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // // });

// // // // // // // 3. SEED DATA PMI
// // // // // // router.post('/seed-pmi', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
// // // // // //     try {
// // // // // //         const realStories = [
// // // // // //              {
// // // // // //                 title: "Dari Korporasi ke Komunitas: Kisah Rindu",
// // // // // //                 content: "Rindu belajar bagaimana menggabungkan keahlian profesionalnya...",
// // // // // //                 coverUrl: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80", 
// // // // // //                 tags: ["Inspirasi", "Profesional"],
// // // // // //                 source: "PMI Official"
// // // // // //             },
// // // // // //             {
// // // // // //                 title: "Kenangan Tsunami Aceh: Pertemuan di Tenda PMI",
// // // // // //                 content: "Saat bingung itulah kulihat seorang abang leting...",
// // // // // //                 coverUrl: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=800&q=80",
// // // // // //                 tags: ["Sejarah", "Tsunami Aceh"],
// // // // // //                 source: "PMI Official"
// // // // // //             },
// // // // // //             {
// // // // // //                 title: "Aksi Heroik Budi di Tengah Banjir Bandang",
// // // // // //                 content: "Pada hari Kamis, 17 April, air bah datang tiba-tiba...",
// // // // // //                 coverUrl: "https://images.unsplash.com/photo-1541696230303-31d516279932?auto=format&fit=crop&w=800&q=80",
// // // // // //                 tags: ["Bencana", "Evakuasi"],
// // // // // //                 source: "PMI Official"
// // // // // //             }
// // // // // //         ];

// // // // // //         for (const story of realStories) {
// // // // // //             const slug = slugify(story.title, { lower: true, strict: true }) + '-' + Date.now();
// // // // // //             await Blog.create({
// // // // // //                 ...story,
// // // // // //                 slug: slug,
// // // // // //                 status: 'approved',
// // // // // //                 author: req.user!.id 
// // // // // //             });
// // // // // //         }
// // // // // //         res.json({ message: 'Data berhasil diimport!' });
// // // // // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // // });

// // // // // // // =========================================================================
// // // // // // // ROUTE DINAMIS (CREATE, UPDATE, DELETE)
// // // // // // // =========================================================================

// // // // // // // 4. CREATE BLOG
// // // // // // router.post('/', requireAuth, async (req: AuthedRequest, res: Response) => {
// // // // // //   try {
// // // // // //     const { title, content, coverUrl, tags } = req.body;
// // // // // //     const userRole = req.user!.role.toUpperCase();
// // // // // //     const isAdmin = userRole === 'SUPER_ADMIN' || userRole === 'FACILITATOR';
    
// // // // // //     const status = isAdmin ? 'approved' : 'pending';
// // // // // //     const slug = slugify(title, { lower: true, strict: true }) + '-' + Date.now();

// // // // // //     const newBlog = await Blog.create({
// // // // // //       title, slug, content, coverUrl, tags, status, author: req.user!.id
// // // // // //     });

// // // // // //     if (isAdmin) {
// // // // // //         // SKENARIO A: Admin Posting -> Blast ke Semua User
// // // // // //         const allUsers = await User.find({ _id: { $ne: req.user!.id } }).select('_id');
// // // // // //         if (allUsers.length > 0) {
// // // // // //             const notifs = allUsers.map(u => ({
// // // // // //                 recipient: u._id,
// // // // // //                 sender: req.user!.id,
// // // // // //                 type: 'blog', 
// // // // // //                 topic: newBlog._id,
// // // // // //                 message: `Berita Terbaru: "${title}"`,
// // // // // //                 isRead: false,
// // // // // //                 createdAt: new Date()
// // // // // //             }));
// // // // // //             await Notification.insertMany(notifs);
// // // // // //         }
// // // // // //     } else {
// // // // // //         // SKENARIO B: User Posting -> Notif ke Admin
// // // // // //         const admins = await User.find({ role: { $in: ['SUPER_ADMIN', 'FACILITATOR'] } });
// // // // // //         for (const admin of admins) {
// // // // // //             await sendNotif(admin._id.toString(), req.user!.id, `Pengajuan Cerita Baru: "${title}"`, newBlog._id.toString(), 'approval');
// // // // // //         }
// // // // // //     }
// // // // // //     res.status(201).json(newBlog);
// // // // // //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // // });

// // // // // // // 5. GET SINGLE BLOG
// // // // // // router.get('/:id', async (req, res) => {
// // // // // //   try {
// // // // // //     const blog = await Blog.findById(req.params.id).populate('author', 'name avatarUrl role');
// // // // // //     if (!blog) return res.status(404).json({ error: 'Blog tidak ditemukan' });
// // // // // //     res.json(blog);
// // // // // //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // // });

// // // // // // // 6. UPDATE STATUS (Approve/Reject) & NOTIFIKASI CERDAS
// // // // // // router.patch('/:id/status', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // //   try {
// // // // // //     const { status } = req.body;
    
// // // // // //     // UPDATE STATUS & AMBIL DATA PENULIS LENGKAP
// // // // // //     const blog = await Blog.findByIdAndUpdate(req.params.id, { status }, { new: true })
// // // // // //         .populate('author'); // Populate penting untuk cek role penulis
    
// // // // // //     if (!blog) return res.status(404).json({ error: 'Not found' });

// // // // // //     // --- LOGIKA NOTIFIKASI ---
// // // // // //     if (status === 'approved' || status === 'published') {
        
// // // // // //         // Ambil role penulis
// // // // // //         // Karena sudah dipopulate, author adalah object user
// // // // // //         const authorRole = (blog.author as any).role; 
// // // // // //         const isOfficialPost = authorRole === 'SUPER_ADMIN' || authorRole === 'FACILITATOR';

// // // // // //         if (isOfficialPost) {
// // // // // //             // SKENARIO 1: ADMIN POSTING -> BLAST KE SEMUA USER
// // // // // //             const allUsers = await User.find({ _id: { $ne: req.user!.id } }).select('_id'); 
// // // // // //             if (allUsers.length > 0) {
// // // // // //                 const notifs = allUsers.map(u => ({
// // // // // //                     recipient: u._id,
// // // // // //                     sender: req.user!.id, 
// // // // // //                     type: 'blog',
// // // // // //                     topic: blog._id,
// // // // // //                     message: `Berita Terbaru: "${blog.title}"`,
// // // // // //                     isRead: false,
// // // // // //                     createdAt: new Date()
// // // // // //                 }));
// // // // // //                 await Notification.insertMany(notifs);
// // // // // //             }
// // // // // //         } else {
// // // // // //             // SKENARIO 2: USER POSTING -> NOTIF KE PENULIS SAJA
// // // // // //             // Kirim notif hanya jika admin bukan penulisnya sendiri (untuk menghindari spam diri sendiri jika admin edit punya sendiri)
// // // // // //             if ((blog.author as any)._id.toString() !== req.user!.id) {
// // // // // //                 await sendNotif(
// // // // // //                     (blog.author as any)._id.toString(),
// // // // // //                     req.user!.id,
// // // // // //                     `Selamat! Cerita Anda "${blog.title}" telah TERBIT!`,
// // // // // //                     blog._id.toString(),
// // // // // //                     'blog'
// // // // // //                 );
// // // // // //             }
// // // // // //         }

// // // // // //     } else if (status === 'rejected') {
// // // // // //         // SKENARIO 3: REJECT -> NOTIF KE PENULIS
// // // // // //         if ((blog.author as any)._id.toString() !== req.user!.id) {
// // // // // //             await sendNotif(
// // // // // //                 (blog.author as any)._id.toString(),
// // // // // //                 req.user!.id,
// // // // // //                 `Maaf, cerita "${blog.title}" belum dapat ditayangkan.`,
// // // // // //                 blog._id.toString(),
// // // // // //                 'blog' 
// // // // // //             );
// // // // // //         }
// // // // // //     }

// // // // // //     res.json(blog);
// // // // // //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // // });

// // // // // // // 7. UPDATE CONTENT
// // // // // // router.patch('/:id', requireAuth, requireFacilitator, async (req, res) => {
// // // // // //     try {
// // // // // //         const { title, content, coverUrl, tags } = req.body;
// // // // // //         const blog = await Blog.findByIdAndUpdate(req.params.id, { 
// // // // // //             title, content, coverUrl, tags 
// // // // // //         }, { new: true });
// // // // // //         res.json(blog);
// // // // // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // // });

// // // // // // // 8. DELETE BLOG
// // // // // // router.delete('/:id', requireAuth, requireFacilitator, async (req, res) => {
// // // // // //   try {
// // // // // //     await Blog.findByIdAndDelete(req.params.id);
// // // // // //     res.json({ message: 'Deleted' });
// // // // // //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // // });

// // // // // // export default router;
// // // // // import express, { Response } from 'express';
// // // // // import { Blog } from '../models/Blog';
// // // // // import { User } from '../models/User'; 
// // // // // import { Notification } from '../models/Notification';
// // // // // import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth';
// // // // // import slugify from 'slugify';

// // // // // const router = express.Router();

// // // // // // Helper untuk kirim notifikasi single
// // // // // const sendNotif = async (recipientId: string, senderId: string, message: string, topicId: string, type: string) => {
// // // // //     try {
// // // // //         await Notification.create({
// // // // //             recipient: recipientId, sender: senderId, message, topic: topicId, type, isRead: false
// // // // //         });
// // // // //     } catch (e) { console.error("Notif Error:", e); }
// // // // // };

// // // // // // 1. GET PUBLIC
// // // // // router.get('/public', async (req, res) => {
// // // // //   try {
// // // // //     const blogs = await Blog.find({ status: 'approved' }).populate('author', 'name avatarUrl role').sort({ createdAt: -1 });
// // // // //     res.json(blogs);
// // // // //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // });

// // // // // // 2. GET ADMIN ALL
// // // // // router.get('/admin', requireAuth, requireFacilitator, async (req, res) => {
// // // // //   try {
// // // // //     const blogs = await Blog.find().populate('author', 'name avatarUrl role').sort({ createdAt: -1 });
// // // // //     res.json(blogs);
// // // // //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // });

// // // // // // 3. CREATE BLOG
// // // // // router.post('/', requireAuth, async (req: AuthedRequest, res: Response) => {
// // // // //   try {
// // // // //     const { title, content, coverUrl, tags } = req.body;
// // // // //     const userRole = req.user!.role.toUpperCase();
// // // // //     const isAdmin = userRole === 'SUPER_ADMIN' || userRole === 'FACILITATOR';
// // // // //     const status = isAdmin ? 'approved' : 'pending';
// // // // //     const slug = slugify(title, { lower: true, strict: true }) + '-' + Date.now();

// // // // //     const newBlog = await Blog.create({ title, slug, content, coverUrl, tags, status, author: req.user!.id });

// // // // //     if (isAdmin) {
// // // // //         // BLAST KE SEMUA (Jika Admin Posting)
// // // // //         const allUsers = await User.find({ _id: { $ne: req.user!.id } }).select('_id');
// // // // //         if(allUsers.length > 0) {
// // // // //             const notifs = allUsers.map(u => ({
// // // // //                 recipient: u._id, sender: req.user!.id, type: 'blog', topic: newBlog._id,
// // // // //                 message: `Berita Terbaru: "${title}"`, isRead: false, createdAt: new Date()
// // // // //             }));
// // // // //             await Notification.insertMany(notifs);
// // // // //         }
// // // // //     } else {
// // // // //         // NOTIF KE ADMIN (Jika User Posting)
// // // // //         const admins = await User.find({ role: { $in: ['SUPER_ADMIN', 'FACILITATOR'] } });
// // // // //         for (const admin of admins) {
// // // // //             await sendNotif(admin._id.toString(), req.user!.id, `Pengajuan Cerita Baru: "${title}"`, newBlog._id.toString(), 'approval');
// // // // //         }
// // // // //     }
// // // // //     res.status(201).json(newBlog);
// // // // //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // });

// // // // // // 4. GET SINGLE
// // // // // router.get('/:id', async (req, res) => {
// // // // //   try {
// // // // //     const blog = await Blog.findById(req.params.id).populate('author', 'name avatarUrl role');
// // // // //     if (!blog) return res.status(404).json({ error: 'Blog tidak ditemukan' });
// // // // //     res.json(blog);
// // // // //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // });

// // // // // // 5. UPDATE STATUS & TRIGGER NOTIFIKASI
// // // // // // (Logic diperbaiki agar bisa re-blast)
// // // // // router.patch('/:id/status', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // //   try {
// // // // //     const { status } = req.body;
    
// // // // //     // Update status
// // // // //     const blog = await Blog.findByIdAndUpdate(req.params.id, { status }, { new: true }).populate('author');
// // // // //     if (!blog) return res.status(404).json({ error: 'Not found' });

// // // // //     // --- LOGIKA NOTIFIKASI ---
// // // // //     if (status === 'approved') {
// // // // //         const authorRole = (blog.author as any).role;
// // // // //         const isOfficialPost = authorRole === 'SUPER_ADMIN' || authorRole === 'FACILITATOR';

// // // // //         if (isOfficialPost) {
// // // // //             // BLAST KE SEMUA USER (Official Post)
// // // // //             const allUsers = await User.find({ _id: { $ne: req.user!.id } }).select('_id');
// // // // //             if (allUsers.length > 0) {
// // // // //                 const notifs = allUsers.map(u => ({
// // // // //                     recipient: u._id,
// // // // //                     sender: req.user!.id, 
// // // // //                     type: 'blog',
// // // // //                     topic: blog._id,
// // // // //                     message: `Berita Terbaru: "${blog.title}"`,
// // // // //                     isRead: false,
// // // // //                     createdAt: new Date()
// // // // //                 }));
// // // // //                 await Notification.insertMany(notifs);
// // // // //             }
// // // // //         } else {
// // // // //             // NOTIF KE PENULIS (User Post)
// // // // //             if ((blog.author as any)._id.toString() !== req.user!.id) {
// // // // //                 await sendNotif(
// // // // //                     (blog.author as any)._id.toString(),
// // // // //                     req.user!.id,
// // // // //                     `Selamat! Cerita Anda "${blog.title}" telah TERBIT!`,
// // // // //                     blog._id.toString(),
// // // // //                     'blog'
// // // // //                 );
// // // // //             }
// // // // //         }
// // // // //     } else if (status === 'rejected') {
// // // // //         if ((blog.author as any)._id.toString() !== req.user!.id) {
// // // // //             await sendNotif(
// // // // //                 (blog.author as any)._id.toString(),
// // // // //                 req.user!.id,
// // // // //                 `Maaf, cerita "${blog.title}" belum dapat ditayangkan.`,
// // // // //                 blog._id.toString(),
// // // // //                 'blog'
// // // // //             );
// // // // //         }
// // // // //     }
// // // // //     res.json(blog);
// // // // //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // });

// // // // // // ... (Sisa route sama) ...
// // // // // router.patch('/:id', requireAuth, requireFacilitator, async (req, res) => {
// // // // //     try { const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.json(blog); } 
// // // // //     catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // });
// // // // // router.delete('/:id', requireAuth, requireFacilitator, async (req, res) => {
// // // // //   try { await Blog.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); } 
// // // // //   catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // });
// // // // // router.post('/seed-pmi', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
// // // // //     try { /* ...logic seed... */ res.json({message:'ok'}); } catch(e:any){res.status(500).json({error:e.message})}
// // // // // });

// // // // // export default router;





// // // // import express, { Response } from 'express';
// // // // import { Blog } from '../models/Blog';
// // // // import { User } from '../models/User'; 
// // // // import { Notification } from '../models/Notification';
// // // // import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth';
// // // // import slugify from 'slugify';

// // // // const router = express.Router();

// // // // // Helper untuk kirim notifikasi single
// // // // const sendNotif = async (recipientId: string, senderId: string, message: string, topicId: string, type: string) => {
// // // //     try {
// // // //         await Notification.create({
// // // //             recipient: recipientId, sender: senderId, message, topic: topicId, type, isRead: false
// // // //         });
// // // //     } catch (e) { console.error("Notif Error:", e); }
// // // // };

// // // // // 1. GET PUBLIC (DENGAN SEARCH & PAGINATION)
// // // // router.get('/public', async (req, res) => {
// // // //   try {
// // // //     const { search, page = 1, limit = 9 } = req.query;
    
// // // //     // Filter: Hanya yang approved
// // // //     const query: any = { status: 'approved' };

// // // //     // Jika ada search param
// // // //     if (search) {
// // // //         query.title = { $regex: search, $options: 'i' };
// // // //     }

// // // //     const blogs = await Blog.find(query)
// // // //         .populate('author', 'name avatarUrl role')
// // // //         .sort({ createdAt: -1 })
// // // //         .skip((Number(page) - 1) * Number(limit))
// // // //         .limit(Number(limit));
    
// // // //     const total = await Blog.countDocuments(query);

// // // //     // Format return disamakan agar frontend mudah membaca
// // // //     res.json({
// // // //         data: blogs,
// // // //         pagination: {
// // // //             total,
// // // //             page: Number(page),
// // // //             pages: Math.ceil(total / Number(limit))
// // // //         }
// // // //     });
// // // //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // });

// // // // // 2. GET ADMIN ALL (DENGAN SEARCH)
// // // // router.get('/admin', requireAuth, requireFacilitator, async (req, res) => {
// // // //   try {
// // // //     const { search } = req.query;
// // // //     const query: any = {};

// // // //     if (search) {
// // // //         query.title = { $regex: search, $options: 'i' };
// // // //     }

// // // //     const blogs = await Blog.find(query)
// // // //         .populate('author', 'name avatarUrl role')
// // // //         .sort({ createdAt: -1 });
// // // //     res.json(blogs);
// // // //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // });

// // // // // 3. CREATE BLOG (LOGIKA ANDA TETAP SAMA)
// // // // router.post('/', requireAuth, async (req: AuthedRequest, res: Response) => {
// // // //   try {
// // // //     const { title, content, coverUrl, tags } = req.body;
// // // //     const userRole = req.user!.role.toUpperCase();
// // // //     const isAdmin = userRole === 'SUPER_ADMIN' || userRole === 'FACILITATOR';
// // // //     const status = isAdmin ? 'approved' : 'pending';
// // // //     const slug = slugify(title, { lower: true, strict: true }) + '-' + Date.now();

// // // //     const newBlog = await Blog.create({ title, slug, content, coverUrl, tags, status, author: req.user!.id });

// // // //     if (isAdmin) {
// // // //         // BLAST KE SEMUA (Jika Admin Posting)
// // // //         const allUsers = await User.find({ _id: { $ne: req.user!.id } }).select('_id');
// // // //         if(allUsers.length > 0) {
// // // //             const notifs = allUsers.map(u => ({
// // // //                 recipient: u._id, sender: req.user!.id, type: 'blog', topic: newBlog._id,
// // // //                 message: `Berita Terbaru: "${title}"`, isRead: false, createdAt: new Date()
// // // //             }));
// // // //             await Notification.insertMany(notifs);
// // // //         }
// // // //     } else {
// // // //         // NOTIF KE ADMIN (Jika User Posting)
// // // //         const admins = await User.find({ role: { $in: ['SUPER_ADMIN', 'FACILITATOR'] } });
// // // //         for (const admin of admins) {
// // // //             await sendNotif(admin._id.toString(), req.user!.id, `Pengajuan Cerita Baru: "${title}"`, newBlog._id.toString(), 'approval');
// // // //         }
// // // //     }
// // // //     res.status(201).json(newBlog);
// // // //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // });

// // // // // 4. GET SINGLE
// // // // router.get('/:id', async (req, res) => {
// // // //   try {
// // // //     const blog = await Blog.findById(req.params.id).populate('author', 'name avatarUrl role');
// // // //     if (!blog) return res.status(404).json({ error: 'Blog tidak ditemukan' });
// // // //     res.json(blog);
// // // //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // });

// // // // // 5. UPDATE STATUS & TRIGGER NOTIFIKASI
// // // // router.patch('/:id/status', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // //   try {
// // // //     const { status } = req.body;
    
// // // //     // Update status
// // // //     const blog = await Blog.findByIdAndUpdate(req.params.id, { status }, { new: true }).populate('author');
// // // //     if (!blog) return res.status(404).json({ error: 'Not found' });

// // // //     // --- LOGIKA NOTIFIKASI ---
// // // //     if (status === 'approved') {
// // // //         const authorRole = (blog.author as any).role;
// // // //         const isOfficialPost = authorRole === 'SUPER_ADMIN' || authorRole === 'FACILITATOR';

// // // //         if (isOfficialPost) {
// // // //             // BLAST KE SEMUA USER (Official Post)
// // // //             const allUsers = await User.find({ _id: { $ne: req.user!.id } }).select('_id');
// // // //             if (allUsers.length > 0) {
// // // //                 const notifs = allUsers.map(u => ({
// // // //                     recipient: u._id, sender: req.user!.id, type: 'blog', topic: blog._id,
// // // //                     message: `Berita Terbaru: "${blog.title}"`, isRead: false, createdAt: new Date()
// // // //                 }));
// // // //                 await Notification.insertMany(notifs);
// // // //             }
// // // //         } else {
// // // //             // NOTIF KE PENULIS (User Post)
// // // //             if ((blog.author as any)._id.toString() !== req.user!.id) {
// // // //                 await sendNotif(
// // // //                     (blog.author as any)._id.toString(), req.user!.id,
// // // //                     `Selamat! Cerita Anda "${blog.title}" telah TERBIT!`, blog._id.toString(), 'blog'
// // // //                 );
// // // //             }
// // // //         }
// // // //     } else if (status === 'rejected') {
// // // //         if ((blog.author as any)._id.toString() !== req.user!.id) {
// // // //             await sendNotif(
// // // //                 (blog.author as any)._id.toString(), req.user!.id,
// // // //                 `Maaf, cerita "${blog.title}" belum dapat ditayangkan.`, blog._id.toString(), 'blog'
// // // //             );
// // // //         }
// // // //     }
// // // //     res.json(blog);
// // // //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // });

// // // // // 6. UPDATE CONTENT (EDIT)
// // // // router.patch('/:id', requireAuth, requireFacilitator, async (req, res) => {
// // // //     try { 
// // // //         if(req.body.title) {
// // // //              req.body.slug = slugify(req.body.title, { lower: true, strict: true }) + '-' + Date.now();
// // // //         }
// // // //         const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true }); 
// // // //         res.json(blog); 
// // // //     } 
// // // //     catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // });

// // // // // 7. DELETE
// // // // router.delete('/:id', requireAuth, requireFacilitator, async (req, res) => {
// // // //   try { await Blog.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); } 
// // // //   catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // });

// // // // // 8. SEED (Opsional)
// // // // router.post('/seed-pmi', requireAuth, requireFacilitator, async (req: AuthedRequest, res) => {
// // // //     try { res.json({message:'ok'}); } catch(e:any){res.status(500).json({error:e.message})}
// // // // });

// // // // export default router;





// // // import express, { Response } from 'express';
// // // import { Blog } from '../models/Blog';
// // // import { User } from '../models/User';
// // // import { Notification } from '../models/Notification';
// // // import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth';
// // // import slugify from 'slugify';
// // // import axios from 'axios';
// // // import * as cheerio from 'cheerio';

// // // const router = express.Router();

// // // // Helper Notifikasi
// // // const sendNotif = async (recipientId: string, senderId: string, message: string, topicId: string, type: string) => {
// // //     try {
// // //         await Notification.create({
// // //             recipient: recipientId, sender: senderId, message, topic: topicId, type, isRead: false
// // //         });
// // //     } catch (e) { console.error("Notif Error:", e); }
// // // };

// // // // ==========================================
// // // // 1. GET PUBLIC
// // // // ==========================================
// // // router.get('/public', async (req, res) => {
// // //     try {
// // //         const { search, page = 1, limit = 9 } = req.query;
// // //         const query: any = { status: 'approved' };

// // //         if (search) query.title = { $regex: search, $options: 'i' };

// // //         const blogs = await Blog.find(query)
// // //             .populate('author', 'name avatarUrl role')
// // //             .sort({ createdAt: -1 })
// // //             .skip((Number(page) - 1) * Number(limit))
// // //             .limit(Number(limit));

// // //         const total = await Blog.countDocuments(query);

// // //         res.json({
// // //             data: blogs,
// // //             pagination: { total, page: Number(page), pages: Math.ceil(total / Number(limit)) }
// // //         });
// // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // });

// // // // ==========================================
// // // // 2. GET ADMIN ALL
// // // // ==========================================
// // // router.get('/admin', requireAuth, requireFacilitator, async (req, res) => {
// // //     try {
// // //         const { search } = req.query;
// // //         const query: any = {};
// // //         if (search) query.title = { $regex: search, $options: 'i' };

// // //         const blogs = await Blog.find(query)
// // //             .populate('author', 'name avatarUrl role')
// // //             .sort({ createdAt: -1 });
// // //         res.json(blogs);
// // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // });

// // // // ==========================================
// // // // 3. IMPORT DARI PMI PUSAT (SCRAPING V4 - ULTRA WIDE)
// // // // ==========================================
// // // router.post('/import-pmi', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // //     try {
// // //         const targetUrl = 'https://pmi.or.id/volunteer/volunteer-stories';
        
// // //         console.log(`[SCRAPER V4] Mengakses URL: ${targetUrl}`);

// // //         const { data } = await axios.get(targetUrl, {
// // //             headers: {
// // //                 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
// // //                 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
// // //                 'Referer': 'https://google.com'
// // //             }
// // //         });
        
// // //         const $ = cheerio.load(data);
        
// // //         // DEBUG: Cek Title Halaman untuk memastikan tidak diblokir
// // //         const pageTitle = $('title').text().trim();
// // //         console.log(`[SCRAPER V4] Page Title: "${pageTitle}"`);

// // //         const importedItems: any[] = [];
// // //         const savedBlogs: any[] = [];
// // //         const seenTitles = new Set(); 

// // //         // STRATEGI KOMBINASI:
// // //         // Cari elemen apapun yang mungkin adalah container artikel
// // //         const potentialContainers = $('.elementor-post, article, .post, .card, .entry, .et_pb_post');

// // //         if (potentialContainers.length > 0) {
// // //             console.log(`[SCRAPER V4] Menemukan ${potentialContainers.length} container potensial.`);
            
// // //             potentialContainers.each((i, el) => {
// // //                 if (importedItems.length >= 5) return false;

// // //                 // Cari Judul & Link
// // //                 const titleEl = $(el).find('h2 a, h3 a, h4 a, .entry-title a, .post-title a').first();
// // //                 let title = titleEl.text().trim();
// // //                 let link = titleEl.attr('href');

// // //                 // Fallback: Cari link apa saja di dalam container ini
// // //                 if (!link) {
// // //                     const anyLink = $(el).find('a').first();
// // //                     link = anyLink.attr('href');
// // //                     title = anyLink.text().trim();
// // //                 }

// // //                 // Cari Gambar
// // //                 let img = $(el).find('img').first();
// // //                 let coverUrl = img.attr('src') || img.attr('data-src') || '';

// // //                 // Cari Ringkasan
// // //                 let summary = $(el).find('p').not(':empty').first().text().trim();

// // //                 // VALIDASI DATA
// // //                 if (title && link && title.length > 10 && !seenTitles.has(title)) {
// // //                     if (!link.includes('#') && !link.includes('javascript')) {
// // //                         importedItems.push({ title, link, coverUrl, summary: summary || "Klik link untuk baca selengkapnya." });
// // //                         seenTitles.add(title);
// // //                     }
// // //                 }
// // //             });
// // //         }

// // //         // STRATEGI CADANGAN (FALLBACK): Cari Link di Main Content
// // //         if (importedItems.length === 0) {
// // //             console.log(`[SCRAPER V4] Strategi Container Gagal. Mencoba cari semua link di body...`);
            
// // //             $('main a, #content a, .entry-content a').each((i, el) => {
// // //                 if (importedItems.length >= 5) return false;

// // //                 const link = $(el).attr('href');
// // //                 const title = $(el).text().trim();

// // //                 // Syarat: Judul panjang (>20 chars) dan link bukan ke halaman admin/category
// // //                 if (link && title.length > 25 && link.startsWith('http')) {
// // //                     if (!link.includes('category') && !link.includes('tag') && !link.includes('author')) {
// // //                         if (!seenTitles.has(title)) {
// // //                             importedItems.push({ 
// // //                                 title, 
// // //                                 link, 
// // //                                 coverUrl: '', 
// // //                                 summary: 'Artikel diimpor otomatis.' 
// // //                             });
// // //                             seenTitles.add(title);
// // //                         }
// // //                     }
// // //                 }
// // //             });
// // //         }

// // //         console.log(`[SCRAPER V4] Total Kandidat: ${importedItems.length}`);

// // //         // Simpan ke Database
// // //         for (const item of importedItems) {
// // //             const exists = await Blog.findOne({ title: item.title });
            
// // //             if (!exists) {
// // //                 const slug = slugify(item.title, { lower: true, strict: true }) + '-' + Date.now();
                
// // //                 const newBlog = await Blog.create({
// // //                     title: item.title,
// // //                     slug: slug,
// // //                     content: `
// // //                         <p><strong>Ringkasan:</strong> ${item.summary}</p>
// // //                         <br/><hr/>
// // //                         <p><em>Artikel ini diimpor dari Website PMI Pusat. 
// // //                         <a href="${item.link}" target="_blank" style="color:#990000; text-decoration:underline; font-weight:bold;">
// // //                             Baca selengkapnya di sumber asli &raquo;
// // //                         </a></em></p>
// // //                     `,
// // //                     coverUrl: item.coverUrl,
// // //                     tags: ['PMI Pusat', 'Impor'],
// // //                     status: 'pending', 
// // //                     author: req.user!.id
// // //                 });
// // //                 savedBlogs.push(newBlog);
// // //             }
// // //         }

// // //         res.json({ 
// // //             message: 'Import selesai', 
// // //             totalFound: importedItems.length,
// // //             savedCount: savedBlogs.length,
// // //             results: savedBlogs 
// // //         });

// // //     } catch (e: any) {
// // //         console.error("Scraping Error:", e.message);
// // //         res.status(200).json({ 
// // //             message: 'Gagal akses ke server target.', 
// // //             totalFound: 0, 
// // //             savedCount: 0, 
// // //             results: [] 
// // //         });
// // //     }
// // // });

// // // // ==========================================
// // // // 4. CREATE BLOG (MANUAL)
// // // // ==========================================
// // // router.post('/', requireAuth, async (req: AuthedRequest, res: Response) => {
// // //     try {
// // //         const { title, content, coverUrl, tags } = req.body;
// // //         const userRole = req.user!.role.toUpperCase();
// // //         const isAdmin = userRole === 'SUPER_ADMIN' || userRole === 'FACILITATOR';
// // //         const status = isAdmin ? 'approved' : 'pending';
// // //         const slug = slugify(title, { lower: true, strict: true }) + '-' + Date.now();

// // //         const newBlog = await Blog.create({ title, slug, content, coverUrl, tags, status, author: req.user!.id });

// // //         if (isAdmin) {
// // //             const allUsers = await User.find({ _id: { $ne: req.user!.id } }).select('_id');
// // //             if(allUsers.length > 0) {
// // //                 const notifs = allUsers.map(u => ({
// // //                     recipient: u._id, sender: req.user!.id, type: 'blog', topic: newBlog._id,
// // //                     message: `Berita Terbaru: "${title}"`, isRead: false, createdAt: new Date()
// // //                 }));
// // //                 await Notification.insertMany(notifs);
// // //             }
// // //         } else {
// // //             const admins = await User.find({ role: { $in: ['SUPER_ADMIN', 'FACILITATOR'] } });
// // //             for (const admin of admins) {
// // //                 await sendNotif(admin._id.toString(), req.user!.id, `Pengajuan Cerita Baru: "${title}"`, newBlog._id.toString(), 'approval');
// // //             }
// // //         }
// // //         res.status(201).json(newBlog);
// // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // });

// // // // ==========================================
// // // // 5. GET SINGLE
// // // // ==========================================
// // // router.get('/:id', async (req, res) => {
// // //     try {
// // //         const blog = await Blog.findById(req.params.id).populate('author', 'name avatarUrl role');
// // //         if (!blog) return res.status(404).json({ error: 'Blog tidak ditemukan' });
// // //         res.json(blog);
// // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // });

// // // // ==========================================
// // // // 6. UPDATE STATUS
// // // // ==========================================
// // // router.patch('/:id/status', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // //     try {
// // //         const { status } = req.body;
// // //         const blog = await Blog.findByIdAndUpdate(req.params.id, { status }, { new: true }).populate('author');
// // //         if (!blog) return res.status(404).json({ error: 'Not found' });

// // //         if (status === 'approved') {
// // //             const authorRole = (blog.author as any).role;
// // //             const isOfficialPost = authorRole === 'SUPER_ADMIN' || authorRole === 'FACILITATOR';

// // //             if (isOfficialPost) {
// // //                 const allUsers = await User.find({ _id: { $ne: req.user!.id } }).select('_id');
// // //                 if (allUsers.length > 0) {
// // //                     const notifs = allUsers.map(u => ({
// // //                         recipient: u._id, sender: req.user!.id, type: 'blog', topic: blog._id,
// // //                         message: `Berita Terbaru: "${blog.title}"`, isRead: false, createdAt: new Date()
// // //                     }));
// // //                     await Notification.insertMany(notifs);
// // //                 }
// // //             } else {
// // //                 if ((blog.author as any)._id.toString() !== req.user!.id) {
// // //                     await sendNotif((blog.author as any)._id.toString(), req.user!.id, `Selamat! Cerita Anda "${blog.title}" telah TERBIT!`, blog._id.toString(), 'blog');
// // //                 }
// // //             }
// // //         } else if (status === 'rejected') {
// // //             if ((blog.author as any)._id.toString() !== req.user!.id) {
// // //                 await sendNotif((blog.author as any)._id.toString(), req.user!.id, `Maaf, cerita "${blog.title}" belum dapat ditayangkan.`, blog._id.toString(), 'blog');
// // //             }
// // //         }
// // //         res.json(blog);
// // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // });

// // // // ==========================================
// // // // 7. EDIT CONTENT
// // // // ==========================================
// // // router.patch('/:id', requireAuth, requireFacilitator, async (req, res) => {
// // //     try { 
// // //         if(req.body.title) req.body.slug = slugify(req.body.title, { lower: true, strict: true }) + '-' + Date.now();
// // //         const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true }); 
// // //         res.json(blog); 
// // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // });

// // // // ==========================================
// // // // 8. DELETE
// // // // ==========================================
// // // router.delete('/:id', requireAuth, requireFacilitator, async (req, res) => {
// // //     try { await Blog.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); } 
// // //     catch (e: any) { res.status(500).json({ error: e.message }); }
// // // });

// // // export default router;

// // import express, { Response } from 'express';
// // import { Blog } from '../models/Blog';
// // import { User } from '../models/User';
// // import { Notification } from '../models/Notification';
// // import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth';
// // import slugify from 'slugify';
// // import axios from 'axios';
// // import * as cheerio from 'cheerio';
// // import https from 'https';

// // const router = express.Router();

// // // Helper Notifikasi
// // const sendNotif = async (recipientId: string, senderId: string, message: string, topicId: string, type: string) => {
// //     try {
// //         await Notification.create({
// //             recipient: recipientId, sender: senderId, message, topic: topicId, type, isRead: false
// //         });
// //     } catch (e) { console.error("Notif Error:", e); }
// // };

// // // ==========================================
// // // 1. GET PUBLIC
// // // ==========================================
// // router.get('/public', async (req, res) => {
// //     try {
// //         const { search, page = 1, limit = 9 } = req.query;
// //         const query: any = { status: 'approved' };
// //         if (search) query.title = { $regex: search, $options: 'i' };

// //         const blogs = await Blog.find(query)
// //             .populate('author', 'name avatarUrl role')
// //             .sort({ createdAt: -1 })
// //             .skip((Number(page) - 1) * Number(limit))
// //             .limit(Number(limit));

// //         const total = await Blog.countDocuments(query);
// //         res.json({
// //             data: blogs,
// //             pagination: { total, page: Number(page), pages: Math.ceil(total / Number(limit)) }
// //         });
// //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // });

// // // ==========================================
// // // 2. GET ADMIN ALL
// // // ==========================================
// // router.get('/admin', requireAuth, requireFacilitator, async (req, res) => {
// //     try {
// //         const { search } = req.query;
// //         const query: any = {};
// //         if (search) query.title = { $regex: search, $options: 'i' };

// //         const blogs = await Blog.find(query)
// //             .populate('author', 'name avatarUrl role')
// //             .sort({ createdAt: -1 });
// //         res.json(blogs);
// //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // });

// // // ==========================================
// // // 3. IMPORT DARI PMI PUSAT (V8 - WP API & GOOGLE NEWS)
// // // ==========================================
// // router.post('/import-pmi', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// //     const importedItems: any[] = [];
// //     const savedBlogs: any[] = [];
    
// //     // Header browser untuk menyamar
// //     const browserHeaders = {
// //         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
// //         'Accept': 'application/json, text/html, application/xml',
// //         'Referer': 'https://www.google.com/'
// //     };

// //     try {
// //         // --- LAYER 1: WORDPRESS JSON API (Kualitas Data Terbaik) ---
// //         console.log(`[IMPORT] Layer 1: Mencoba WP JSON API...`);
// //         try {
// //             // Mengambil 5 post terbaru langsung dari API WordPress PMI
// //             const wpApiUrl = 'https://pmi.or.id/wp-json/wp/v2/posts?per_page=5&_embed';
// //             const { data } = await axios.get(wpApiUrl, { 
// //                 headers: browserHeaders,
// //                 timeout: 8000
// //             });

// //             if (Array.isArray(data)) {
// //                 console.log(`[IMPORT] WP API Berhasil! Ditemukan ${data.length} post.`);
// //                 data.forEach((post: any) => {
// //                     const title = post.title?.rendered;
// //                     const link = post.link;
// //                     const summary = post.excerpt?.rendered?.replace(/<[^>]+>/g, '') || "Baca selengkapnya...";
                    
// //                     // Ambil gambar dari embedded media
// //                     let coverUrl = "";
// //                     if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
// //                         coverUrl = post._embedded['wp:featuredmedia'][0].source_url;
// //                     }

// //                     if (title && link) {
// //                         importedItems.push({ title, link, coverUrl, summary });
// //                     }
// //                 });
// //             }
// //         } catch (wpError: any) {
// //             console.log(`[IMPORT] Layer 1 Gagal (WP API Blocked): ${wpError.message}`);
// //         }

// //         // --- LAYER 2: GOOGLE NEWS RSS (Jalur Belakang - Anti Blokir) ---
// //         // Jika Layer 1 gagal/kosong, kita minta Google yang ambilkan datanya
// //         if (importedItems.length === 0) {
// //             console.log(`[IMPORT] Layer 2: Mencoba Google News RSS (site:pmi.or.id)...`);
// //             try {
// //                 // Query: site:pmi.or.id language:ID
// //                 const googleFeed = 'https://news.google.com/rss/search?q=site:pmi.or.id&hl=id-ID&gl=ID&ceid=ID:id';
// //                 const { data } = await axios.get(googleFeed, { 
// //                     headers: browserHeaders,
// //                     timeout: 8000
// //                 });

// //                 const $ = cheerio.load(data, { xmlMode: true });
                
// //                 $('item').each((i, el) => {
// //                     if (importedItems.length >= 5) return false;

// //                     const title = $(el).find('title').text().trim();
// //                     const link = $(el).find('link').text().trim(); // Ini link redirect google
                    
// //                     // Bersihkan HTML dari deskripsi
// //                     const rawDesc = $(el).find('description').text();
// //                     const summary = rawDesc.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...';

// //                     // Google RSS jarang kasih gambar, pakai Placeholder Logo PMI
// //                     // Atau bisa cari dari tag media:content jika google kasih
// //                     const coverUrl = "https://pmi.or.id/wp-content/uploads/2020/07/logo-pmi-2.png"; 

// //                     if (title && link) {
// //                         importedItems.push({ title, link, coverUrl, summary });
// //                     }
// //                 });
// //                 console.log(`[IMPORT] Google News Berhasil! Ditemukan ${importedItems.length} item.`);
// //             } catch (googleError: any) {
// //                 console.log(`[IMPORT] Layer 2 Gagal: ${googleError.message}`);
// //             }
// //         }

// //         // --- LAYER 3: FALLBACK MANUAL (Agar tidak error kosong) ---
// //         if (importedItems.length === 0) {
// //              console.log("[IMPORT] Layer 3: Fallback Link Manual.");
// //              importedItems.push({
// //                  title: "Kunjungi Website Resmi PMI",
// //                  link: "https://pmi.or.id/category/berita/",
// //                  coverUrl: "https://pmi.or.id/wp-content/uploads/2020/07/logo-pmi-2.png",
// //                  summary: "Sistem tidak dapat mengambil berita otomatis saat ini karena proteksi keamanan server PMI."
// //              });
// //         }

// //         // --- SIMPAN KE DATABASE ---
// //         const savedBlogs: any[] = [];
// //         for (const item of importedItems) {
// //             const exists = await Blog.findOne({ title: item.title });
            
// //             if (!exists) {
// //                 const slug = slugify(item.title, { lower: true, strict: true }) + '-' + Date.now();
                
// //                 const newBlog = await Blog.create({
// //                     title: item.title,
// //                     slug: slug,
// //                     content: `
// //                         <p><strong>Ringkasan:</strong> ${item.summary}</p>
// //                         <br/><hr/>
// //                         <p><em>Artikel ini diimpor dari PMI Pusat. 
// //                         <a href="${item.link}" target="_blank" style="color:#990000; text-decoration:underline; font-weight:bold;">
// //                             Baca selengkapnya di sumber asli &raquo;
// //                         </a></em></p>
// //                     `,
// //                     coverUrl: item.coverUrl, 
// //                     tags: ['PMI Pusat', 'Impor'],
// //                     status: 'pending', 
// //                     author: req.user!.id
// //                 });
// //                 savedBlogs.push(newBlog);
// //             }
// //         }

// //         res.json({ 
// //             message: 'Import selesai', 
// //             totalFound: importedItems.length,
// //             savedCount: savedBlogs.length,
// //             results: savedBlogs 
// //         });

// //     } catch (e: any) {
// //         console.error("Critical Import Error:", e.message);
// //         res.status(200).json({ 
// //             message: 'Terjadi kesalahan sistem.', 
// //             totalFound: 0, 
// //             savedCount: 0, 
// //             results: [] 
// //         });
// //     }
// // });

// // // ==========================================
// // // 4. CREATE BLOG (MANUAL)
// // // ==========================================
// // router.post('/', requireAuth, async (req: AuthedRequest, res: Response) => {
// //     try {
// //         const { title, content, coverUrl, tags } = req.body;
// //         const userRole = req.user!.role.toUpperCase();
// //         const isAdmin = userRole === 'SUPER_ADMIN' || userRole === 'FACILITATOR';
// //         const status = isAdmin ? 'approved' : 'pending';
// //         const slug = slugify(title, { lower: true, strict: true }) + '-' + Date.now();

// //         const newBlog = await Blog.create({ title, slug, content, coverUrl, tags, status, author: req.user!.id });

// //         if (isAdmin) {
// //             const allUsers = await User.find({ _id: { $ne: req.user!.id } }).select('_id');
// //             if(allUsers.length > 0) {
// //                 const notifs = allUsers.map(u => ({
// //                     recipient: u._id, sender: req.user!.id, type: 'blog', topic: newBlog._id,
// //                     message: `Berita Terbaru: "${title}"`, isRead: false, createdAt: new Date()
// //                 }));
// //                 await Notification.insertMany(notifs);
// //             }
// //         } else {
// //             const admins = await User.find({ role: { $in: ['SUPER_ADMIN', 'FACILITATOR'] } });
// //             for (const admin of admins) {
// //                 await sendNotif(admin._id.toString(), req.user!.id, `Pengajuan Cerita Baru: "${title}"`, newBlog._id.toString(), 'approval');
// //             }
// //         }
// //         res.status(201).json(newBlog);
// //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // });

// // // ==========================================
// // // 5. GET SINGLE
// // // ==========================================
// // router.get('/:id', async (req, res) => {
// //     try {
// //         const blog = await Blog.findById(req.params.id).populate('author', 'name avatarUrl role');
// //         if (!blog) return res.status(404).json({ error: 'Blog tidak ditemukan' });
// //         res.json(blog);
// //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // });

// // // ==========================================
// // // 6. UPDATE STATUS
// // // ==========================================
// // router.patch('/:id/status', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// //     try {
// //         const { status } = req.body;
// //         const blog = await Blog.findByIdAndUpdate(req.params.id, { status }, { new: true }).populate('author');
// //         if (!blog) return res.status(404).json({ error: 'Not found' });

// //         if (status === 'approved') {
// //             const authorRole = (blog.author as any).role;
// //             const isOfficialPost = authorRole === 'SUPER_ADMIN' || authorRole === 'FACILITATOR';

// //             if (isOfficialPost) {
// //                 const allUsers = await User.find({ _id: { $ne: req.user!.id } }).select('_id');
// //                 if (allUsers.length > 0) {
// //                     const notifs = allUsers.map(u => ({
// //                         recipient: u._id, sender: req.user!.id, type: 'blog', topic: blog._id,
// //                         message: `Berita Terbaru: "${blog.title}"`, isRead: false, createdAt: new Date()
// //                     }));
// //                     await Notification.insertMany(notifs);
// //                 }
// //             } else {
// //                 if ((blog.author as any)._id.toString() !== req.user!.id) {
// //                     await sendNotif((blog.author as any)._id.toString(), req.user!.id, `Selamat! Cerita Anda "${blog.title}" telah TERBIT!`, blog._id.toString(), 'blog');
// //                 }
// //             }
// //         } else if (status === 'rejected') {
// //             if ((blog.author as any)._id.toString() !== req.user!.id) {
// //                 await sendNotif((blog.author as any)._id.toString(), req.user!.id, `Maaf, cerita "${blog.title}" belum dapat ditayangkan.`, blog._id.toString(), 'blog');
// //             }
// //         }
// //         res.json(blog);
// //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // });

// // // ==========================================
// // // 7. EDIT CONTENT
// // // ==========================================
// // router.patch('/:id', requireAuth, requireFacilitator, async (req, res) => {
// //     try { 
// //         if(req.body.title) req.body.slug = slugify(req.body.title, { lower: true, strict: true }) + '-' + Date.now();
// //         const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true }); 
// //         res.json(blog); 
// //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // });

// // // ==========================================
// // // 8. DELETE
// // // ==========================================
// // router.delete('/:id', requireAuth, requireFacilitator, async (req, res) => {
// //     try { await Blog.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); } 
// //     catch (e: any) { res.status(500).json({ error: e.message }); }
// // });

// // export default router;

// import express, { Response } from 'express';
// import { Blog } from '../models/Blog';
// import { User } from '../models/User';
// import { Notification } from '../models/Notification';
// import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth';
// import slugify from 'slugify';
// import axios from 'axios';
// import * as cheerio from 'cheerio';

// const router = express.Router();

// // Helper Notifikasi
// const sendNotif = async (recipientId: string, senderId: string, message: string, topicId: string, type: string) => {
//     try {
//         await Notification.create({
//             recipient: recipientId, 
//             sender: senderId, 
//             message, 
//             topic: topicId, 
//             type, 
//             isRead: false
//         });
//     } catch (e) { 
//         console.error("Notif Error:", e); 
//     }
// };

// // ==========================================
// // 1. GET PUBLIC (Daftar Blog Approved)
// // ==========================================
// router.get('/public', async (req, res) => {
//     try {
//         const { search, page = 1, limit = 9 } = req.query;
//         const query: any = { status: 'approved' };
//         if (search) query.title = { $regex: search, $options: 'i' };

//         const blogs = await Blog.find(query)
//             .populate('author', 'name avatarUrl role')
//             .sort({ createdAt: -1 })
//             .skip((Number(page) - 1) * Number(limit))
//             .limit(Number(limit));

//         const total = await Blog.countDocuments(query);
//         res.json({
//             data: blogs,
//             pagination: { 
//                 total, 
//                 page: Number(page), 
//                 pages: Math.ceil(total / Number(limit)) 
//             }
//         });
//     } catch (e: any) { 
//         res.status(500).json({ error: e.message }); 
//     }
// });

// // ==========================================
// // 2. GET ADMIN ALL (Daftar Semua Blog)
// // ==========================================
// router.get('/admin', requireAuth, requireFacilitator, async (req, res) => {
//     try {
//         const { search } = req.query;
//         const query: any = {};
//         if (search) query.title = { $regex: search, $options: 'i' };

//         const blogs = await Blog.find(query)
//             .populate('author', 'name avatarUrl role')
//             .sort({ createdAt: -1 });
//         res.json(blogs);
//     } catch (e: any) { 
//         res.status(500).json({ error: e.message }); 
//     }
// });

// // ==========================================
// // 3. IMPORT DARI PMI PUSAT
// // ==========================================
// router.post('/import-pmi', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
//     const importedItems: any[] = [];
//     const browserHeaders = {
//         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
//         'Accept': 'application/json, text/html, application/xml',
//         'Referer': 'https://www.google.com/'
//     };

//     try {
//         console.log(`[IMPORT] Layer 1: Mencoba WP JSON API...`);
//         try {
//             const wpApiUrl = 'https://pmi.or.id/wp-json/wp/v2/posts?per_page=5&_embed';
//             const { data } = await axios.get(wpApiUrl, { headers: browserHeaders, timeout: 8000 });

//             if (Array.isArray(data)) {
//                 data.forEach((post: any) => {
//                     const title = post.title?.rendered;
//                     const link = post.link;
//                     const summary = post.excerpt?.rendered?.replace(/<[^>]+>/g, '') || "Baca selengkapnya...";
//                     let coverUrl = "https://pmi.or.id/wp-content/uploads/2020/07/logo-pmi-2.png";
                    
//                     if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
//                         coverUrl = post._embedded['wp:featuredmedia'][0].source_url;
//                     }
//                     if (title && link) importedItems.push({ title, link, coverUrl, summary });
//                 });
//             }
//         } catch (wpError: any) {
//             console.log(`[IMPORT] Layer 1 Gagal: ${wpError.message}`);
//         }

//         if (importedItems.length === 0) {
//             console.log(`[IMPORT] Layer 2: Mencoba Google News RSS...`);
//             try {
//                 const googleFeed = 'https://news.google.com/rss/search?q=site:pmi.or.id&hl=id-ID&gl=ID&ceid=ID:id';
//                 const { data } = await axios.get(googleFeed, { headers: browserHeaders, timeout: 8000 });
//                 const $ = cheerio.load(data, { xmlMode: true });
                
//                 $('item').each((i, el) => {
//                     if (importedItems.length >= 5) return false;
//                     const title = $(el).find('title').text().trim();
//                     const link = $(el).find('link').text().trim();
//                     const rawDesc = $(el).find('description').text();
//                     const summary = rawDesc.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...';
//                     const coverUrl = "https://pmi.or.id/wp-content/uploads/2020/07/logo-pmi-2.png"; 
//                     if (title && link) importedItems.push({ title, link, coverUrl, summary });
//                 });
//             } catch (googleError: any) {
//                 console.log(`[IMPORT] Layer 2 Gagal: ${googleError.message}`);
//             }
//         }

//         const savedBlogs: any[] = [];
//         for (const item of importedItems) {
//             const exists = await Blog.findOne({ title: item.title });
//             if (!exists) {
//                 const slug = slugify(item.title, { lower: true, strict: true }) + '-' + Date.now();
//                 const newBlog = await Blog.create({
//                     title: item.title,
//                     slug: slug,
//                     content: `<p><strong>Ringkasan:</strong> ${item.summary}</p><br/><hr/><p><em>Artikel ini diimpor dari PMI Pusat. <a href="${item.link}" target="_blank">Baca selengkapnya &raquo;</a></em></p>`,
//                     coverUrl: item.coverUrl,
//                     tags: ['PMI Pusat', 'Impor'],
//                     status: 'pending',
//                     source: 'PMI Pusat',
//                     author: req.user!.id
//                 });
//                 savedBlogs.push(newBlog);
//             }
//         }

//         res.json({ 
//             message: 'Import selesai', 
//             totalFound: importedItems.length, 
//             savedCount: savedBlogs.length, 
//             results: savedBlogs 
//         });
//     } catch (e: any) {
//         res.status(500).json({ error: e.message });
//     }
// });

// // ==========================================
// // 4. CREATE BLOG (MANUAL)
// // ==========================================
// router.post('/', requireAuth, async (req: AuthedRequest, res: Response) => {
//     try {
//         const { title, content, coverUrl, tags } = req.body;
//         const userRole = req.user!.role.toUpperCase();
//         const isAdmin = userRole === 'SUPER_ADMIN' || userRole === 'FACILITATOR';
//         const status = isAdmin ? 'approved' : 'pending';
//         const slug = slugify(title, { lower: true, strict: true }) + '-' + Date.now();

//         const newBlog = await Blog.create({ 
//             title, 
//             slug, 
//             content, 
//             coverUrl, 
//             tags, 
//             status, 
//             author: req.user!.id,
//             source: 'User Submission'
//         });

//         if (isAdmin) {
//             const allUsers = await User.find({ _id: { $ne: req.user!.id } }).select('_id');
//             if(allUsers.length > 0) {
//                 const notifs = allUsers.map(u => ({
//                     recipient: u._id, 
//                     sender: req.user!.id, 
//                     type: 'blog', 
//                     topic: newBlog._id,
//                     message: `Berita Terbaru: "${title}"`, 
//                     isRead: false, 
//                     createdAt: new Date()
//                 }));
//                 await Notification.insertMany(notifs);
//             }
//         } else {
//             const admins = await User.find({ role: { $in: ['SUPER_ADMIN', 'FACILITATOR'] } });
//             for (const admin of admins) {
//                 await sendNotif(admin._id.toString(), req.user!.id, `Pengajuan Cerita Baru: "${title}"`, newBlog._id.toString(), 'approval');
//             }
//         }
//         res.status(201).json(newBlog);
//     } catch (e: any) { 
//         res.status(500).json({ error: e.message }); 
//     }
// });

// // ==========================================
// // 5. GET SINGLE (By ID)
// // ==========================================
// // router.get('/:id', async (req, res) => {
// //     try {
// //         const blog = await Blog.findById(req.params.id).populate('author', 'name avatarUrl role');
// //         if (!blog) return res.status(404).json({ error: 'Blog tidak ditemukan' });
// //         res.json(blog);
// //     } catch (e: any) { 
// //         res.status(500).json({ error: e.message }); 
// //     }
// // });

// router.get('/:id', async (req, res) => {
//     try {
//         // [KUNCI PERBAIKAN]: Gunakan findByIdAndUpdate dengan $inc views
//         const blog = await Blog.findByIdAndUpdate(
//             req.params.id,
//             { $inc: { views: 1 } }, // Menambah jumlah tayangan (+1) di database
//             { new: true }           // Mengambil data versi terbaru setelah diupdate
//         ).populate('author', 'name avatarUrl role');

//         if (!blog) return res.status(404).json({ error: 'Blog tidak ditemukan' });
        
//         res.json(blog);
//     } catch (e: any) { 
//         res.status(500).json({ error: e.message }); 
//     }
// });

// // ==========================================
// // 6. UPDATE STATUS (Approval)
// // ==========================================
// router.patch('/:id/status', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
//     try {
//         const { status } = req.body;
//         const blog = await Blog.findByIdAndUpdate(req.params.id, { status }, { new: true }).populate('author');
//         if (!blog) return res.status(404).json({ error: 'Not found' });

//         if (status === 'approved') {
//             const author: any = blog.author;
//             if (author._id.toString() !== req.user!.id) {
//                 await sendNotif(author._id.toString(), req.user!.id, `Selamat! Cerita Anda "${blog.title}" telah TERBIT!`, blog._id.toString(), 'blog');
//             }
//             // Notif ke semua user jika approved
//             const allUsers = await User.find({ _id: { $ne: author._id } }).select('_id');
//             const notifs = allUsers.map(u => ({
//                 recipient: u._id, sender: req.user!.id, type: 'blog', topic: blog._id,
//                 message: `Berita Terbaru: "${blog.title}"`, isRead: false, createdAt: new Date()
//             }));
//             await Notification.insertMany(notifs);

//         } else if (status === 'rejected') {
//             const author: any = blog.author;
//             if (author._id.toString() !== req.user!.id) {
//                 await sendNotif(author._id.toString(), req.user!.id, `Maaf, cerita "${blog.title}" belum dapat ditayangkan.`, blog._id.toString(), 'blog');
//             }
//         }
//         res.json(blog);
//     } catch (e: any) { 
//         res.status(500).json({ error: e.message }); 
//     }
// });

// // ==========================================
// // 7. EDIT CONTENT
// // ==========================================
// router.patch('/:id', requireAuth, requireFacilitator, async (req, res) => {
//     try { 
//         if(req.body.title) req.body.slug = slugify(req.body.title, { lower: true, strict: true }) + '-' + Date.now();
//         const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true }); 
//         res.json(blog); 
//     } catch (e: any) { 
//         res.status(500).json({ error: e.message }); 
//     }
// });

// // ==========================================
// // 8. DELETE
// // ==========================================
// router.delete('/:id', requireAuth, requireFacilitator, async (req, res) => {
//     try { 
//         await Blog.findByIdAndDelete(req.params.id); 
//         res.json({ message: 'Deleted' }); 
//     } catch (e: any) { 
//         res.status(500).json({ error: e.message }); 
//     }
// });

// export default router;

import express, { Response } from 'express';
import { Blog } from '../models/Blog';
import { User } from '../models/User';
import { Notification } from '../models/Notification';
import Comment from '../models/Comment'; // Pastikan Comment diimport untuk menghitung statistik
import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth';
import slugify from 'slugify';
import axios from 'axios';
import * as cheerio from 'cheerio';

const router = express.Router();

// Helper Notifikasi
const sendNotif = async (recipientId: string, senderId: string, message: string, topicId: string, type: string) => {
    try {
        await Notification.create({
            recipient: recipientId, 
            sender: senderId, 
            message, 
            topic: topicId, 
            type, 
            isRead: false
        });
    } catch (e) { 
        console.error("Notif Error:", e); 
    }
};

// ==========================================
// 1. GET PUBLIC (Daftar Blog Approved dengan Statistik)
// ==========================================
router.get('/public', async (req, res) => {
    try {
        const { search, page = 1, limit = 9 } = req.query;
        const query: any = { status: 'approved' };
        if (search) query.title = { $regex: search, $options: 'i' };

        // Ambil data blog menggunakan .lean() agar bisa memodifikasi objek secara dinamis
        const blogs = await Blog.find(query)
            .populate('author', 'name avatarUrl role')
            .sort({ createdAt: -1 })
            .skip((Number(page) - 1) * Number(limit))
            .limit(Number(limit))
            .lean(); 

        // [FIX] Hitung jumlah komentar untuk setiap blog secara real-time
        const blogsWithStats = await Promise.all(blogs.map(async (blog) => {
            const commentCount = await Comment.countDocuments({ blogId: blog._id });
            return {
                ...blog,
                commentCount: commentCount // Ini akan dibaca oleh frontend
            };
        }));

        const total = await Blog.countDocuments(query);
        res.json({
            data: blogsWithStats,
            pagination: { 
                total, 
                page: Number(page), 
                pages: Math.ceil(total / Number(limit)) 
            }
        });
    } catch (e: any) { 
        res.status(500).json({ error: e.message }); 
    }
});

// ==========================================
// 2. GET ADMIN ALL
// ==========================================
router.get('/admin', requireAuth, requireFacilitator, async (req, res) => {
    try {
        const { search } = req.query;
        const query: any = {};
        if (search) query.title = { $regex: search, $options: 'i' };

        const blogs = await Blog.find(query)
            .populate('author', 'name avatarUrl role')
            .sort({ createdAt: -1 });
        res.json(blogs);
    } catch (e: any) { 
        res.status(500).json({ error: e.message }); 
    }
});

// ==========================================
// 3. IMPORT DARI PMI PUSAT
// ==========================================
router.post('/import-pmi', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
    const importedItems: any[] = [];
    const browserHeaders = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/html, application/xml',
        'Referer': 'https://www.google.com/'
    };

    try {
        try {
            const wpApiUrl = 'https://pmi.or.id/wp-json/wp/v2/posts?per_page=5&_embed';
            const { data } = await axios.get(wpApiUrl, { headers: browserHeaders, timeout: 8000 });

            if (Array.isArray(data)) {
                data.forEach((post: any) => {
                    const title = post.title?.rendered;
                    const link = post.link;
                    const summary = post.excerpt?.rendered?.replace(/<[^>]+>/g, '') || "Baca selengkapnya...";
                    let coverUrl = "https://pmi.or.id/wp-content/uploads/2020/07/logo-pmi-2.png";
                    
                    if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
                        coverUrl = post._embedded['wp:featuredmedia'][0].source_url;
                    }
                    if (title && link) importedItems.push({ title, link, coverUrl, summary });
                });
            }
        } catch (wpError: any) {
            console.log(`[IMPORT] WP API Error: ${wpError.message}`);
        }

        if (importedItems.length === 0) {
            try {
                const googleFeed = 'https://news.google.com/rss/search?q=site:pmi.or.id&hl=id-ID&gl=ID&ceid=ID:id';
                const { data } = await axios.get(googleFeed, { headers: browserHeaders, timeout: 8000 });
                const $ = cheerio.load(data, { xmlMode: true });
                
                $('item').each((i, el) => {
                    if (importedItems.length >= 5) return false;
                    const title = $(el).find('title').text().trim();
                    const link = $(el).find('link').text().trim();
                    const summary = $(el).find('description').text().replace(/<[^>]*>?/gm, '').substring(0, 150) + '...';
                    const coverUrl = "https://pmi.or.id/wp-content/uploads/2020/07/logo-pmi-2.png"; 
                    if (title && link) importedItems.push({ title, link, coverUrl, summary });
                });
            } catch (googleError: any) {
                console.log(`[IMPORT] Google RSS Error: ${googleError.message}`);
            }
        }

        const savedBlogs: any[] = [];
        for (const item of importedItems) {
            const exists = await Blog.findOne({ title: item.title });
            if (!exists) {
                const slug = slugify(item.title, { lower: true, strict: true }) + '-' + Date.now();
                const newBlog = await Blog.create({
                    title: item.title,
                    slug: slug,
                    content: `<p><strong>Ringkasan:</strong> ${item.summary}</p><br/><hr/><p><em>Artikel ini diimpor dari PMI Pusat. <a href="${item.link}" target="_blank">Baca selengkapnya &raquo;</a></em></p>`,
                    coverUrl: item.coverUrl,
                    tags: ['PMI Pusat', 'Impor'],
                    status: 'pending',
                    source: 'PMI Pusat',
                    author: req.user!.id
                });
                savedBlogs.push(newBlog);
            }
        }

        res.json({ message: 'Import selesai', totalFound: importedItems.length, savedCount: savedBlogs.length, results: savedBlogs });
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

// ==========================================
// 4. CREATE BLOG (MANUAL)
// ==========================================
router.post('/', requireAuth, async (req: AuthedRequest, res: Response) => {
    try {
        const { title, content, coverUrl, tags } = req.body;
        const userRole = req.user!.role.toUpperCase();
        const isAdmin = userRole === 'SUPER_ADMIN' || userRole === 'FACILITATOR';
        const status = isAdmin ? 'approved' : 'pending';
        const slug = slugify(title, { lower: true, strict: true }) + '-' + Date.now();

        const newBlog = await Blog.create({ 
            title, slug, content, coverUrl, tags, status, 
            author: req.user!.id, source: 'User Submission' 
        });

        if (isAdmin) {
            const allUsers = await User.find({ _id: { $ne: req.user!.id } }).select('_id');
            if(allUsers.length > 0) {
                const notifs = allUsers.map(u => ({
                    recipient: u._id, sender: req.user!.id, type: 'blog', topic: newBlog._id,
                    message: `Berita Terbaru: "${title}"`, isRead: false, createdAt: new Date()
                }));
                await Notification.insertMany(notifs);
            }
        } else {
            const admins = await User.find({ role: { $in: ['SUPER_ADMIN', 'FACILITATOR'] } });
            for (const admin of admins) {
                await sendNotif(admin._id.toString(), req.user!.id, `Pengajuan Cerita Baru: "${title}"`, newBlog._id.toString(), 'approval');
            }
        }
        res.status(201).json(newBlog);
    } catch (e: any) { res.status(500).json({ error: e.message }); }
});

// ==========================================
// 5. GET SINGLE (DENGAN AUTO-INCREMENT VIEWS)
// ==========================================
router.get('/:id', async (req, res) => {
    try {
        // [FIX VIEWS] Gunakan findByIdAndUpdate untuk menambah views secara atomik
        const blog = await Blog.findByIdAndUpdate(
            req.params.id,
            { $inc: { views: 1 } }, // Tambah 1 ke field views
            { new: true }           // Ambil data terbaru
        ).populate('author', 'name avatarUrl role');

        if (!blog) return res.status(404).json({ error: 'Blog tidak ditemukan' });
        
        // Hitung komentar untuk halaman detail
        const commentCount = await Comment.countDocuments({ blogId: blog._id });
        
        res.json({
            ...blog.toObject(),
            commentCount
        });
    } catch (e: any) { 
        res.status(500).json({ error: e.message }); 
    }
});

// ==========================================
// 6. UPDATE STATUS (Approval)
// ==========================================
router.patch('/:id/status', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
    try {
        const { status } = req.body;
        const blog = await Blog.findByIdAndUpdate(req.params.id, { status }, { new: true }).populate('author');
        if (!blog) return res.status(404).json({ error: 'Not found' });

        if (status === 'approved') {
            const author: any = blog.author;
            if (author._id.toString() !== req.user!.id) {
                await sendNotif(author._id.toString(), req.user!.id, `Selamat! Cerita Anda "${blog.title}" telah TERBIT!`, blog._id.toString(), 'blog');
            }
            const allUsers = await User.find({ _id: { $ne: author._id } }).select('_id');
            const notifs = allUsers.map(u => ({
                recipient: u._id, sender: req.user!.id, type: 'blog', topic: blog._id,
                message: `Berita Terbaru: "${blog.title}"`, isRead: false, createdAt: new Date()
            }));
            await Notification.insertMany(notifs);
        } else if (status === 'rejected') {
            const author: any = blog.author;
            if (author._id.toString() !== req.user!.id) {
                await sendNotif(author._id.toString(), req.user!.id, `Maaf, cerita "${blog.title}" belum dapat ditayangkan.`, blog._id.toString(), 'blog');
            }
        }
        res.json(blog);
    } catch (e: any) { res.status(500).json({ error: e.message }); }
});

// ==========================================
// 7. EDIT CONTENT
// ==========================================
router.patch('/:id', requireAuth, requireFacilitator, async (req, res) => {
    try { 
        if(req.body.title) req.body.slug = slugify(req.body.title, { lower: true, strict: true }) + '-' + Date.now();
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true }); 
        res.json(blog); 
    } catch (e: any) { res.status(500).json({ error: e.message }); }
});

// ==========================================
// 8. DELETE
// ==========================================
router.delete('/:id', requireAuth, requireFacilitator, async (req, res) => {
    try { 
        await Blog.findByIdAndDelete(req.params.id); 
        res.json({ message: 'Deleted' }); 
    } catch (e: any) { res.status(500).json({ error: e.message }); }
});

export default router;
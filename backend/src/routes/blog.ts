// // // // // // import express, { Response } from 'express';
// // // // // // import { Blog } from '../models/Blog';
// // // // // // import { User } from '../models/User';
// // // // // // import { Notification } from '../models/Notification';
// // // // // // import Comment from '../models/Comment'; // Pastikan Comment diimport untuk menghitung statistik
// // // // // // import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth';
// // // // // // import slugify from 'slugify';
// // // // // // import axios from 'axios';
// // // // // // import * as cheerio from 'cheerio';

// // // // // // const router = express.Router();

// // // // // // // Helper Notifikasi
// // // // // // const sendNotif = async (recipientId: string, senderId: string, message: string, topicId: string, type: string) => {
// // // // // //     try {
// // // // // //         await Notification.create({
// // // // // //             recipient: recipientId, 
// // // // // //             sender: senderId, 
// // // // // //             message, 
// // // // // //             topic: topicId, 
// // // // // //             type, 
// // // // // //             isRead: false
// // // // // //         });
// // // // // //     } catch (e) { 
// // // // // //         console.error("Notif Error:", e); 
// // // // // //     }
// // // // // // };

// // // // // // // ==========================================
// // // // // // // 1. GET PUBLIC (Daftar Blog Approved dengan Statistik)
// // // // // // // ==========================================
// // // // // // router.get('/public', async (req, res) => {
// // // // // //     try {
// // // // // //         const { search, page = 1, limit = 9 } = req.query;
// // // // // //         const query: any = { status: 'approved' };
// // // // // //         if (search) query.title = { $regex: search, $options: 'i' };

// // // // // //         // Ambil data blog menggunakan .lean() agar bisa memodifikasi objek secara dinamis
// // // // // //         const blogs = await Blog.find(query)
// // // // // //             .populate('author', 'name avatarUrl role')
// // // // // //             .sort({ createdAt: -1 })
// // // // // //             .skip((Number(page) - 1) * Number(limit))
// // // // // //             .limit(Number(limit))
// // // // // //             .lean(); 

// // // // // //         // [FIX] Hitung jumlah komentar untuk setiap blog secara real-time
// // // // // //         const blogsWithStats = await Promise.all(blogs.map(async (blog) => {
// // // // // //             const commentCount = await Comment.countDocuments({ blogId: blog._id });
// // // // // //             return {
// // // // // //                 ...blog,
// // // // // //                 commentCount: commentCount // Ini akan dibaca oleh frontend
// // // // // //             };
// // // // // //         }));

// // // // // //         const total = await Blog.countDocuments(query);
// // // // // //         res.json({
// // // // // //             data: blogsWithStats,
// // // // // //             pagination: { 
// // // // // //                 total, 
// // // // // //                 page: Number(page), 
// // // // // //                 pages: Math.ceil(total / Number(limit)) 
// // // // // //             }
// // // // // //         });
// // // // // //     } catch (e: any) { 
// // // // // //         res.status(500).json({ error: e.message }); 
// // // // // //     }
// // // // // // });

// // // // // // // ==========================================
// // // // // // // 2. GET ADMIN ALL
// // // // // // // ==========================================
// // // // // // router.get('/admin', requireAuth, requireFacilitator, async (req, res) => {
// // // // // //     try {
// // // // // //         const { search } = req.query;
// // // // // //         const query: any = {};
// // // // // //         if (search) query.title = { $regex: search, $options: 'i' };

// // // // // //         const blogs = await Blog.find(query)
// // // // // //             .populate('author', 'name avatarUrl role')
// // // // // //             .sort({ createdAt: -1 });
// // // // // //         res.json(blogs);
// // // // // //     } catch (e: any) { 
// // // // // //         res.status(500).json({ error: e.message }); 
// // // // // //     }
// // // // // // });

// // // // // // // ==========================================
// // // // // // // 3. IMPORT DARI PMI PUSAT
// // // // // // // ==========================================
// // // // // // router.post('/import-pmi', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // //     const importedItems: any[] = [];
// // // // // //     const browserHeaders = {
// // // // // //         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
// // // // // //         'Accept': 'application/json, text/html, application/xml',
// // // // // //         'Referer': 'https://www.google.com/'
// // // // // //     };

// // // // // //     try {
// // // // // //         try {
// // // // // //             const wpApiUrl = 'https://pmi.or.id/wp-json/wp/v2/posts?per_page=5&_embed';
// // // // // //             const { data } = await axios.get(wpApiUrl, { headers: browserHeaders, timeout: 8000 });

// // // // // //             if (Array.isArray(data)) {
// // // // // //                 data.forEach((post: any) => {
// // // // // //                     const title = post.title?.rendered;
// // // // // //                     const link = post.link;
// // // // // //                     const summary = post.excerpt?.rendered?.replace(/<[^>]+>/g, '') || "Baca selengkapnya...";
// // // // // //                     let coverUrl = "https://pmi.or.id/wp-content/uploads/2020/07/logo-pmi-2.png";
                    
// // // // // //                     if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
// // // // // //                         coverUrl = post._embedded['wp:featuredmedia'][0].source_url;
// // // // // //                     }
// // // // // //                     if (title && link) importedItems.push({ title, link, coverUrl, summary });
// // // // // //                 });
// // // // // //             }
// // // // // //         } catch (wpError: any) {
// // // // // //             console.log(`[IMPORT] WP API Error: ${wpError.message}`);
// // // // // //         }

// // // // // //         if (importedItems.length === 0) {
// // // // // //             try {
// // // // // //                 const googleFeed = 'https://news.google.com/rss/search?q=site:pmi.or.id&hl=id-ID&gl=ID&ceid=ID:id';
// // // // // //                 const { data } = await axios.get(googleFeed, { headers: browserHeaders, timeout: 8000 });
// // // // // //                 const $ = cheerio.load(data, { xmlMode: true });
                
// // // // // //                 $('item').each((i, el) => {
// // // // // //                     if (importedItems.length >= 5) return false;
// // // // // //                     const title = $(el).find('title').text().trim();
// // // // // //                     const link = $(el).find('link').text().trim();
// // // // // //                     const summary = $(el).find('description').text().replace(/<[^>]*>?/gm, '').substring(0, 150) + '...';
// // // // // //                     const coverUrl = "https://pmi.or.id/wp-content/uploads/2020/07/logo-pmi-2.png"; 
// // // // // //                     if (title && link) importedItems.push({ title, link, coverUrl, summary });
// // // // // //                 });
// // // // // //             } catch (googleError: any) {
// // // // // //                 console.log(`[IMPORT] Google RSS Error: ${googleError.message}`);
// // // // // //             }
// // // // // //         }

// // // // // //         const savedBlogs: any[] = [];
// // // // // //         for (const item of importedItems) {
// // // // // //             const exists = await Blog.findOne({ title: item.title });
// // // // // //             if (!exists) {
// // // // // //                 const slug = slugify(item.title, { lower: true, strict: true }) + '-' + Date.now();
// // // // // //                 const newBlog = await Blog.create({
// // // // // //                     title: item.title,
// // // // // //                     slug: slug,
// // // // // //                     content: `<p><strong>Ringkasan:</strong> ${item.summary}</p><br/><hr/><p><em>Artikel ini diimpor dari PMI Pusat. <a href="${item.link}" target="_blank">Baca selengkapnya &raquo;</a></em></p>`,
// // // // // //                     coverUrl: item.coverUrl,
// // // // // //                     tags: ['PMI Pusat', 'Impor'],
// // // // // //                     status: 'pending',
// // // // // //                     source: 'PMI Pusat',
// // // // // //                     author: req.user!.id
// // // // // //                 });
// // // // // //                 savedBlogs.push(newBlog);
// // // // // //             }
// // // // // //         }

// // // // // //         res.json({ message: 'Import selesai', totalFound: importedItems.length, savedCount: savedBlogs.length, results: savedBlogs });
// // // // // //     } catch (e: any) {
// // // // // //         res.status(500).json({ error: e.message });
// // // // // //     }
// // // // // // });

// // // // // // // ==========================================
// // // // // // // 4. CREATE BLOG (MANUAL)
// // // // // // // ==========================================
// // // // // // router.post('/', requireAuth, async (req: AuthedRequest, res: Response) => {
// // // // // //     try {
// // // // // //         const { title, content, coverUrl, tags } = req.body;
// // // // // //         const userRole = req.user!.role.toUpperCase();
// // // // // //         const isAdmin = userRole === 'SUPER_ADMIN' || userRole === 'FACILITATOR';
// // // // // //         const status = isAdmin ? 'approved' : 'pending';
// // // // // //         const slug = slugify(title, { lower: true, strict: true }) + '-' + Date.now();

// // // // // //         const newBlog = await Blog.create({ 
// // // // // //             title, slug, content, coverUrl, tags, status, 
// // // // // //             author: req.user!.id, source: 'User Submission' 
// // // // // //         });

// // // // // //         if (isAdmin) {
// // // // // //             const allUsers = await User.find({ _id: { $ne: req.user!.id } }).select('_id');
// // // // // //             if(allUsers.length > 0) {
// // // // // //                 const notifs = allUsers.map(u => ({
// // // // // //                     recipient: u._id, sender: req.user!.id, type: 'blog', topic: newBlog._id,
// // // // // //                     message: `Berita Terbaru: "${title}"`, isRead: false, createdAt: new Date()
// // // // // //                 }));
// // // // // //                 await Notification.insertMany(notifs);
// // // // // //             }
// // // // // //         } else {
// // // // // //             const admins = await User.find({ role: { $in: ['SUPER_ADMIN', 'FACILITATOR'] } });
// // // // // //             for (const admin of admins) {
// // // // // //                 await sendNotif(admin._id.toString(), req.user!.id, `Pengajuan Cerita Baru: "${title}"`, newBlog._id.toString(), 'approval');
// // // // // //             }
// // // // // //         }
// // // // // //         res.status(201).json(newBlog);
// // // // // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // // });

// // // // // // // ==========================================
// // // // // // // 5. GET SINGLE (DENGAN AUTO-INCREMENT VIEWS)
// // // // // // // ==========================================
// // // // // // router.get('/:id', async (req, res) => {
// // // // // //     try {
// // // // // //         // [FIX VIEWS] Gunakan findByIdAndUpdate untuk menambah views secara atomik
// // // // // //         const blog = await Blog.findByIdAndUpdate(
// // // // // //             req.params.id,
// // // // // //             { $inc: { views: 1 } }, // Tambah 1 ke field views
// // // // // //             { new: true }           // Ambil data terbaru
// // // // // //         ).populate('author', 'name avatarUrl role');

// // // // // //         if (!blog) return res.status(404).json({ error: 'Blog tidak ditemukan' });
        
// // // // // //         // Hitung komentar untuk halaman detail
// // // // // //         const commentCount = await Comment.countDocuments({ blogId: blog._id });
        
// // // // // //         res.json({
// // // // // //             ...blog.toObject(),
// // // // // //             commentCount
// // // // // //         });
// // // // // //     } catch (e: any) { 
// // // // // //         res.status(500).json({ error: e.message }); 
// // // // // //     }
// // // // // // });

// // // // // // // ==========================================
// // // // // // // 6. UPDATE STATUS (Approval)
// // // // // // // ==========================================
// // // // // // router.patch('/:id/status', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// // // // // //     try {
// // // // // //         const { status } = req.body;
// // // // // //         const blog = await Blog.findByIdAndUpdate(req.params.id, { status }, { new: true }).populate('author');
// // // // // //         if (!blog) return res.status(404).json({ error: 'Not found' });

// // // // // //         if (status === 'approved') {
// // // // // //             const author: any = blog.author;
// // // // // //             if (author._id.toString() !== req.user!.id) {
// // // // // //                 await sendNotif(author._id.toString(), req.user!.id, `Selamat! Cerita Anda "${blog.title}" telah TERBIT!`, blog._id.toString(), 'blog');
// // // // // //             }
// // // // // //             const allUsers = await User.find({ _id: { $ne: author._id } }).select('_id');
// // // // // //             const notifs = allUsers.map(u => ({
// // // // // //                 recipient: u._id, sender: req.user!.id, type: 'blog', topic: blog._id,
// // // // // //                 message: `Berita Terbaru: "${blog.title}"`, isRead: false, createdAt: new Date()
// // // // // //             }));
// // // // // //             await Notification.insertMany(notifs);
// // // // // //         } else if (status === 'rejected') {
// // // // // //             const author: any = blog.author;
// // // // // //             if (author._id.toString() !== req.user!.id) {
// // // // // //                 await sendNotif(author._id.toString(), req.user!.id, `Maaf, cerita "${blog.title}" belum dapat ditayangkan.`, blog._id.toString(), 'blog');
// // // // // //             }
// // // // // //         }
// // // // // //         res.json(blog);
// // // // // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // // });

// // // // // // // ==========================================
// // // // // // // 7. EDIT CONTENT
// // // // // // // ==========================================
// // // // // // router.patch('/:id', requireAuth, requireFacilitator, async (req, res) => {
// // // // // //     try { 
// // // // // //         if(req.body.title) req.body.slug = slugify(req.body.title, { lower: true, strict: true }) + '-' + Date.now();
// // // // // //         const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true }); 
// // // // // //         res.json(blog); 
// // // // // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // // });

// // // // // // // ==========================================
// // // // // // // 8. DELETE
// // // // // // // ==========================================
// // // // // // router.delete('/:id', requireAuth, requireFacilitator, async (req, res) => {
// // // // // //     try { 
// // // // // //         await Blog.findByIdAndDelete(req.params.id); 
// // // // // //         res.json({ message: 'Deleted' }); 
// // // // // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // // });

// // // // // // export default router;
// // // // // import { Router } from 'express';
// // // // // import { requireAuth, requireFacilitator } from '../middleware/auth';
// // // // // import { 
// // // // //     getPublicBlogs, 
// // // // //     getPublicBlogById, 
// // // // //     getAdminBlogs, 
// // // // //     createBlog, 
// // // // //     updateBlog, 
// // // // //     deleteBlog, 
// // // // //     updateBlogStatus, 
// // // // //     importPmiBlogs 
// // // // // } from '../controllers/blogController';

// // // // // const router = Router();

// // // // // // --- PUBLIC ROUTES (Tanpa Login) ---
// // // // // // Mengambil daftar blog untuk halaman depan (sudah termasuk statistik views & comments)
// // // // // router.get('/public', getPublicBlogs);

// // // // // // Mengambil detail blog & otomatis menambah views +1
// // // // // router.get('/:id', getPublicBlogById);

// // // // // // --- PROTECTED ROUTES (Butuh Login) ---
// // // // // // Create Blog (User biasa bisa create, tapi status pending)
// // // // // router.post('/', requireAuth, createBlog);

// // // // // // --- ADMIN / FACILITATOR ROUTES ---
// // // // // // Mengambil semua blog (pending/approved/rejected) untuk dashboard admin
// // // // // router.get('/admin', requireAuth, requireFacilitator, getAdminBlogs);

// // // // // // Import berita dari PMI Pusat
// // // // // router.post('/import-pmi', requireAuth, requireFacilitator, importPmiBlogs);

// // // // // // Update Konten Blog
// // // // // router.patch('/:id', requireAuth, requireFacilitator, updateBlog);

// // // // // // Update Status (Approve/Reject)
// // // // // router.patch('/:id/status', requireAuth, requireFacilitator, updateBlogStatus);

// // // // // // Delete Blog
// // // // // router.delete('/:id', requireAuth, requireFacilitator, deleteBlog);

// // // // // export default router;


// // // // import { Router } from 'express';
// // // // import { requireAuth, requireFacilitator } from '../middleware/auth';
// // // // import { 
// // // //     getPublicBlogs, 
// // // //     getPublicBlogById, 
// // // //     getAdminBlogs, 
// // // //     createBlog, 
// // // //     updateBlogContent, // Menggunakan nama fungsi yang benar dari controller
// // // //     deleteBlog, 
// // // //     updateBlogStatus, 
// // // //     importBlogsFromPMI,
// // // //     getBlogComments,   // [FIX] Tambahkan fitur komentar
// // // //     addBlogComment     // [FIX] Tambahkan fitur komentar
// // // // } from '../controllers/blogController';

// // // // const router = Router();

// // // // // --- PUBLIC ROUTES ---
// // // // router.get('/public', getPublicBlogs); // Route lama: /public
// // // // router.get('/', getPublicBlogs);       // Route alternatif: / (biar aman)

// // // // // [FIX] Route Komentar (Harus sebelum /:id)
// // // // router.get('/:blogId/comments', getBlogComments);
// // // // router.post('/:blogId/comments', requireAuth, addBlogComment);

// // // // router.get('/:id', getPublicBlogById);

// // // // // --- PROTECTED ROUTES ---
// // // // router.post('/', requireAuth, createBlog);

// // // // // --- ADMIN ROUTES ---
// // // // router.get('/admin', requireAuth, requireFacilitator, getAdminBlogs);
// // // // router.post('/import-pmi', requireAuth, requireFacilitator, importBlogsFromPMI);
// // // // router.patch('/:id', requireAuth, requireFacilitator, updateBlogContent); // Pakai updateBlogContent
// // // // router.patch('/:id/status', requireAuth, requireFacilitator, updateBlogStatus);
// // // // router.delete('/:id', requireAuth, requireFacilitator, deleteBlog);

// // // // export default router;


// // // import { Router } from 'express';
// // // import { requireAuth, requireFacilitator } from '../middleware/auth';
// // // import { 
// // //     getPublicBlogs, 
// // //     getPublicBlogById, 
// // //     getAdminBlogs, 
// // //     createBlog, 
// // //     updateBlog, 
// // //     deleteBlog, 
// // //     updateBlogStatus, 
// // //     importBlogsFromPMI,
// // //     addBlogComment,   
// // //     getBlogComments,
// // //     deleteBlogComment,
// // //     toggleBlogComments, // [PENTING] Untuk fitur tutup komentar
// // //     updateBlogContent
// // // } from '../controllers/blogController';

// // // const router = Router();

// // // // --- PUBLIC ROUTES ---
// // // router.get('/public', getPublicBlogs);
// // // router.get('/', getPublicBlogs); 

// // // // --- KOMENTAR (HARUS DI ATAS route /:id) ---
// // // router.get('/:blogId/comments', getBlogComments);
// // // router.post('/:blogId/comments', requireAuth, addBlogComment);
// // // router.delete('/comments/:commentId', requireAuth, deleteBlogComment);

// // // // --- ADMIN / PROTECTED ROUTES ---
// // // router.post('/', requireAuth, createBlog);
// // // router.get('/admin', requireAuth, requireFacilitator, getAdminBlogs); // Ini yang menampilkan list admin
// // // router.post('/import-pmi', requireAuth, requireFacilitator, importBlogsFromPMI);

// // // // Actions Admin
// // // router.patch('/:id/status', requireAuth, requireFacilitator, updateBlogStatus); // Approve/Reject
// // // router.patch('/:id/content', requireAuth, requireFacilitator, updateBlogContent); // Edit Konten
// // // router.patch('/:id/comments-toggle', requireAuth, requireFacilitator, toggleBlogComments); // Tutup/Buka Komentar
// // // router.delete('/:id', requireAuth, requireFacilitator, deleteBlog); // Hapus Blog

// // // // --- DETAIL BLOG (Wildcard ID - taruh paling bawah) ---
// // // router.get('/:id', getPublicBlogById);

// // // export default router;
// // import { Router } from 'express';
// // // [UPDATED] Import requirePermission
// // import { requireAuth, requireFacilitator, requirePermission } from '../middleware/auth';
// // import { 
// //     getPublicBlogs, 
// //     getPublicBlogById, 
// //     getAdminBlogs, 
// //     createBlog, 
// //     updateBlog, 
// //     deleteBlog, 
// //     updateBlogStatus, 
// //     importBlogsFromPMI,
// //     addBlogComment,   
// //     getBlogComments,
// //     deleteBlogComment,
// //     toggleBlogComments,
// //     updateBlogContent
// // } from '../controllers/blogController';

// // const router = Router();

// // // --- PUBLIC ROUTES ---
// // router.get('/public', getPublicBlogs);
// // router.get('/', getPublicBlogs); 

// // // --- KOMENTAR ---
// // router.get('/:blogId/comments', getBlogComments);
// // // [UPDATED] Student butuh izin 'blog.comment' untuk komen
// // router.post('/:blogId/comments', requireAuth, requirePermission('blog.comment'), addBlogComment);
// // router.delete('/comments/:commentId', requireAuth, deleteBlogComment);

// // // --- ADMIN / PROTECTED ROUTES ---
// // // [UPDATED] Gunakan permission check
// // router.post('/', requireAuth, requirePermission('blog.create'), createBlog);
// // router.get('/admin', requireAuth, requirePermission('blog.view'), getAdminBlogs);
// // router.post('/import-pmi', requireAuth, requirePermission('blog.create'), importBlogsFromPMI);

// // // Actions Admin (Bisa Superadmin atau Admin dengan permission)
// // router.patch('/:id/status', requireAuth, requirePermission('manage_blog'), updateBlogStatus); 
// // router.patch('/:id/content', requireAuth, requirePermission('manage_blog'), updateBlogContent); 
// // router.patch('/:id/comments-toggle', requireAuth, requirePermission('manage_blog'), toggleBlogComments); 
// // router.delete('/:id', requireAuth, requirePermission('manage_blog'), deleteBlog); 

// // // --- DETAIL BLOG (Wildcard ID - taruh paling bawah) ---
// // router.get('/:id', getPublicBlogById);

// // export default router;


// import { Router } from 'express';
// import { requireAuth, requirePermission, AuthedRequest } from '../middleware/auth';
// import { 
//     getPublicBlogs, 
//     getPublicBlogById, 
//     getAdminBlogs, 
//     createBlog, 
//     updateBlog, 
//     deleteBlog, 
//     updateBlogStatus, 
//     importBlogsFromPMI,
//     addBlogComment,   
//     getBlogComments,
//     deleteBlogComment,
//     toggleBlogComments,
//     updateBlogContent
// } from '../controllers/blogController';

// const router = Router();

// // --- PUBLIC ROUTES ---
// router.get('/public', getPublicBlogs);
// router.get('/', getPublicBlogs); 

// // --- KOMENTAR ---
// router.get('/:blogId/comments', getBlogComments);

// // User butuh izin 'blog.comment' (Student/Fasilitator punya ini)
// router.post('/:blogId/comments', requireAuth, requirePermission('blog.comment'), addBlogComment);

// // Hapus komentar (Bisa pemilik komentar atau Admin dengan izin manage_blog)
// router.delete('/comments/:commentId', requireAuth, deleteBlogComment);

// // --- CREATE BLOG ---
// // Student & Fasilitator punya izin 'blog.create' (Status default: Pending)
// router.post('/', requireAuth, requirePermission('blog.create'), createBlog);

// // --- ADMIN / MODERATION ROUTES ---
// // Hanya User dengan izin 'manage_blog' (Biasanya Admin/Superadmin) yang bisa akses ini

// // 1. Lihat daftar semua blog (termasuk pending)
// router.get('/admin', requireAuth, requirePermission('manage_blog'), getAdminBlogs);

// // 2. Import dari PMI Pusat
// router.post('/import-pmi', requireAuth, requirePermission('manage_blog'), importBlogsFromPMI);

// // 3. Approve / Reject Blog
// router.patch('/:id/status', requireAuth, requirePermission('manage_blog'), updateBlogStatus); 

// // 4. Edit Konten Orang Lain (Moderasi)
// router.patch('/:id/content', requireAuth, requirePermission('manage_blog'), updateBlogContent); 

// // 5. Tutup/Buka Komentar
// router.patch('/:id/comments-toggle', requireAuth, requirePermission('manage_blog'), toggleBlogComments); 

// // 6. Hapus Blog
// router.delete('/:id', requireAuth, requirePermission('manage_blog'), deleteBlog); 

// // --- DETAIL BLOG (Wildcard ID - taruh paling bawah) ---
// router.get('/:id', getPublicBlogById);

// export default router;

import { Router } from 'express';
import { requireAuth, requirePermission } from '../middleware/auth';
import { 
    getPublicBlogs, 
    getPublicBlogById, 
    getAdminBlogs, 
    createBlog, 
    updateBlog, 
    deleteBlog, 
    updateBlogStatus, 
    importBlogsFromPMI,
    addBlogComment,   
    getBlogComments,
    deleteBlogComment,
    toggleBlogComments,
    updateBlogContent
} from '../controllers/blogController';

const router = Router();

// --- 1. PUBLIC ROUTES ---
// Mengambil daftar blog untuk pengunjung umum
router.get('/public', getPublicBlogs);
router.get('/', getPublicBlogs); 

// --- 2. KOMENTAR ---
// Mengambil komentar berdasarkan ID Blog
router.get('/:blogId/comments', getBlogComments);

// Menambah komentar (Butuh login & izin blog.comment)
router.post('/:blogId/comments', requireAuth, requirePermission('blog.comment'), addBlogComment);

// Hapus komentar (Pemilik atau Admin)
router.delete('/comments/:commentId', requireAuth, deleteBlogComment);

// --- 3. CREATE BLOG ---
// Membuat blog baru (Pending status secara default)
router.post('/', requireAuth, requirePermission('blog.create'), createBlog);

// --- 4. ADMIN / MODERATION ROUTES ---
// Semua rute di bawah ini memerlukan izin 'manage_blog'

// A. Lihat daftar semua blog (termasuk status pending/draft)
router.get('/admin', requireAuth, requirePermission('manage_blog'), getAdminBlogs);

// B. Import data blog dari PMI Pusat
router.post('/import-pmi', requireAuth, requirePermission('manage_blog'), importBlogsFromPMI);

/** * [PENTING] PERBAIKAN DI SINI:
 * Rute di bawah ini adalah rute utama untuk menyimpan perubahan blog (PATCH /api/blog/:id).
 * Sebelumnya rute ini belum terdaftar sehingga muncul error "Route not found".
 */
router.patch('/:id', requireAuth, requirePermission('manage_blog'), updateBlog); 

// C. Perbarui status blog (Approve / Reject)
router.patch('/:id/status', requireAuth, requirePermission('manage_blog'), updateBlogStatus); 

// D. Perbarui konten spesifik blog
router.patch('/:id/content', requireAuth, requirePermission('manage_blog'), updateBlogContent); 

// E. Tutup atau buka kolom komentar pada blog tertentu
router.patch('/:id/comments-toggle', requireAuth, requirePermission('manage_blog'), toggleBlogComments); 

// F. Hapus blog secara permanen
router.delete('/:id', requireAuth, requirePermission('manage_blog'), deleteBlog); 

// --- 5. DETAIL BLOG (Wildcard ID) ---
/**
 * Rute ini diletakkan paling bawah agar tidak memotong rute /admin atau /public.
 * Digunakan untuk mengambil detail blog berdasarkan ID.
 */
router.get('/:id', getPublicBlogById);

export default router;
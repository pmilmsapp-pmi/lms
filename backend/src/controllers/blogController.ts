// // // // import { Request, Response } from 'express';
// // // // import { Blog } from '../models/Blog';
// // // // import { User } from '../models/User';
// // // // import { Notification } from '../models/Notification';
// // // // import Comment from '../models/Comment';
// // // // import slugify from 'slugify';
// // // // import axios from 'axios';
// // // // import * as cheerio from 'cheerio';
// // // // import { AuthedRequest } from '../middleware/auth'; // Pastikan path ini benar

// // // // // --- HELPER: Kirim Notifikasi ---
// // // // const sendNotif = async (recipientId: string, senderId: string, message: string, topicId: string, type: string) => {
// // // //     try {
// // // //         await Notification.create({
// // // //             recipient: recipientId,
// // // //             sender: senderId,
// // // //             message,
// // // //             topic: topicId,
// // // //             type,
// // // //             isRead: false
// // // //         });
// // // //     } catch (e) {
// // // //         console.error("Notif Error:", e);
// // // //     }
// // // // };

// // // // // --- 1. GET PUBLIC BLOGS (Halaman Depan) ---
// // // // export const getPublicBlogs = async (req: Request, res: Response) => {
// // // //     try {
// // // //         const { search, page = 1, limit = 9 } = req.query;
// // // //         // Gunakan status 'approved' sesuai logika route sebelumnya
// // // //         const query: any = { status: 'approved' }; 

// // // //         if (search) {
// // // //             query.title = { $regex: search, $options: 'i' };
// // // //         }

// // // //         // Ambil data dengan lean() agar ringan
// // // //         const blogs = await Blog.find(query)
// // // //             .populate('author', 'name avatarUrl role')
// // // //             .sort({ createdAt: -1 }) // Terbaru di atas
// // // //             .skip((Number(page) - 1) * Number(limit))
// // // //             .limit(Number(limit))
// // // //             .lean();

// // // //         // Hitung jumlah komentar per blog (Real-time)
// // // //         const blogsWithStats = await Promise.all(blogs.map(async (blog) => {
// // // //             const commentCount = await Comment.countDocuments({ blogId: blog._id });
// // // //             return {
// // // //                 ...blog,
// // // //                 commentCount // Field ini dibutuhkan frontend
// // // //             };
// // // //         }));

// // // //         const total = await Blog.countDocuments(query);

// // // //         res.json({
// // // //             data: blogsWithStats,
// // // //             pagination: {
// // // //                 total,
// // // //                 page: Number(page),
// // // //                 pages: Math.ceil(total / Number(limit))
// // // //             }
// // // //         });
// // // //     } catch (error: any) {
// // // //         res.status(500).json({ message: error.message });
// // // //     }
// // // // };

// // // // // --- 2. GET PUBLIC BLOG BY ID (Detail + Auto Increment View) ---
// // // // export const getPublicBlogById = async (req: Request, res: Response) => {
// // // //     try {
// // // //         // Auto-increment views saat detail dibuka
// // // //         const blog = await Blog.findOneAndUpdate(
// // // //             { _id: req.params.id, status: 'approved' }, // Filter hanya yang approved
// // // //             { $inc: { views: 1 } },
// // // //             { new: true }
// // // //         ).populate('author', 'name avatarUrl role');

// // // //         if (!blog) return res.status(404).json({ message: "Cerita tidak ditemukan" });

// // // //         // Hitung total komentar untuk blog ini
// // // //         const commentCount = await Comment.countDocuments({ blogId: blog._id });

// // // //         res.json({
// // // //             ...blog.toObject(),
// // // //             commentCount
// // // //         });
// // // //     } catch (error: any) {
// // // //         res.status(500).json({ message: error.message });
// // // //     }
// // // // };

// // // // // --- 3. GET ADMIN BLOGS (Dashboard Admin) ---
// // // // export const getAdminBlogs = async (req: Request, res: Response) => {
// // // //     try {
// // // //         const { search } = req.query;
// // // //         const query: any = {};
// // // //         if (search) query.title = { $regex: search, $options: 'i' };

// // // //         const blogs = await Blog.find(query)
// // // //             .populate('author', 'name avatarUrl role')
// // // //             .sort({ createdAt: -1 });
            
// // // //         res.json(blogs);
// // // //     } catch (e: any) {
// // // //         res.status(500).json({ error: e.message });
// // // //     }
// // // // };

// // // // // --- 4. IMPORT DARI PMI PUSAT ---
// // // // export const importBlogsFromPMI = async (req: AuthedRequest, res: Response) => {
// // // //     const importedItems: any[] = [];
// // // //     const browserHeaders = {
// // // //         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
// // // //         'Accept': 'application/json, text/html, application/xml',
// // // //         'Referer': 'https://www.google.com/'
// // // //     };

// // // //     try {
// // // //         // A. Coba WordPress API
// // // //         try {
// // // //             const wpApiUrl = 'https://pmi.or.id/wp-json/wp/v2/posts?per_page=5&_embed';
// // // //             const { data } = await axios.get(wpApiUrl, { headers: browserHeaders, timeout: 8000 });

// // // //             if (Array.isArray(data)) {
// // // //                 data.forEach((post: any) => {
// // // //                     const title = post.title?.rendered;
// // // //                     const link = post.link;
// // // //                     const summary = post.excerpt?.rendered?.replace(/<[^>]+>/g, '') || "Baca selengkapnya...";
// // // //                     let coverUrl = "https://pmi.or.id/wp-content/uploads/2020/07/logo-pmi-2.png";
                    
// // // //                     if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
// // // //                         coverUrl = post._embedded['wp:featuredmedia'][0].source_url;
// // // //                     }
// // // //                     if (title && link) importedItems.push({ title, link, coverUrl, summary });
// // // //                 });
// // // //             }
// // // //         } catch (wpError: any) {
// // // //             console.log(`[IMPORT] WP API Error: ${wpError.message}`);
// // // //         }

// // // //         // B. Fallback ke Google RSS jika API gagal/kosong
// // // //         if (importedItems.length === 0) {
// // // //             try {
// // // //                 const googleFeed = 'https://news.google.com/rss/search?q=site:pmi.or.id&hl=id-ID&gl=ID&ceid=ID:id';
// // // //                 const { data } = await axios.get(googleFeed, { headers: browserHeaders, timeout: 8000 });
// // // //                 const $ = cheerio.load(data, { xmlMode: true });
                
// // // //                 $('item').each((i, el) => {
// // // //                     if (importedItems.length >= 5) return false;
// // // //                     const title = $(el).find('title').text().trim();
// // // //                     const link = $(el).find('link').text().trim();
// // // //                     const summary = $(el).find('description').text().replace(/<[^>]*>?/gm, '').substring(0, 150) + '...';
// // // //                     const coverUrl = "https://pmi.or.id/wp-content/uploads/2020/07/logo-pmi-2.png"; 
// // // //                     if (title && link) importedItems.push({ title, link, coverUrl, summary });
// // // //                 });
// // // //             } catch (googleError: any) {
// // // //                 console.log(`[IMPORT] Google RSS Error: ${googleError.message}`);
// // // //             }
// // // //         }

// // // //         // C. Simpan ke Database (Cek duplikat)
// // // //         const savedBlogs: any[] = [];
// // // //         for (const item of importedItems) {
// // // //             const exists = await Blog.findOne({ title: item.title });
// // // //             if (!exists) {
// // // //                 const slug = slugify(item.title, { lower: true, strict: true }) + '-' + Date.now();
// // // //                 const newBlog = await Blog.create({
// // // //                     title: item.title,
// // // //                     slug: slug,
// // // //                     content: `<p><strong>Ringkasan:</strong> ${item.summary}</p><br/><hr/><p><em>Artikel ini diimpor dari PMI Pusat. <a href="${item.link}" target="_blank">Baca selengkapnya &raquo;</a></em></p>`,
// // // //                     coverUrl: item.coverUrl,
// // // //                     tags: ['PMI Pusat', 'Impor'],
// // // //                     status: 'pending',
// // // //                     source: 'PMI Pusat',
// // // //                     author: req.user!.id
// // // //                 });
// // // //                 savedBlogs.push(newBlog);
// // // //             }
// // // //         }

// // // //         res.json({ message: 'Import selesai', totalFound: importedItems.length, savedCount: savedBlogs.length, results: savedBlogs });
// // // //     } catch (e: any) {
// // // //         res.status(500).json({ error: e.message });
// // // //     }
// // // // };

// // // // // --- 5. CREATE BLOG (User Submission) ---
// // // // export const createBlog = async (req: AuthedRequest, res: Response) => {
// // // //     try {
// // // //         const { title, content, coverUrl, tags } = req.body;
// // // //         const userRole = req.user!.role.toUpperCase();
// // // //         const isAdmin = userRole === 'SUPER_ADMIN' || userRole === 'FACILITATOR';
        
// // // //         // Admin langsung Approved, User biasa Pending
// // // //         const status = isAdmin ? 'approved' : 'pending';
// // // //         const slug = slugify(title, { lower: true, strict: true }) + '-' + Date.now();

// // // //         const newBlog = await Blog.create({ 
// // // //             title, slug, content, coverUrl, tags, status, 
// // // //             author: req.user!.id, source: 'User Submission' 
// // // //         });

// // // //         // Kirim Notifikasi
// // // //         if (isAdmin) {
// // // //             // Jika admin yang buat, notif ke semua user lain
// // // //             const allUsers = await User.find({ _id: { $ne: req.user!.id } }).select('_id');
// // // //             if(allUsers.length > 0) {
// // // //                 const notifs = allUsers.map(u => ({
// // // //                     recipient: u._id, sender: req.user!.id, type: 'blog', topic: newBlog._id,
// // // //                     message: `Berita Terbaru: "${title}"`, isRead: false, createdAt: new Date()
// // // //                 }));
// // // //                 await Notification.insertMany(notifs);
// // // //             }
// // // //         } else {
// // // //             // Jika user yang buat, notif ke admin untuk approval
// // // //             const admins = await User.find({ role: { $in: ['SUPER_ADMIN', 'FACILITATOR'] } });
// // // //             for (const admin of admins) {
// // // //                 await sendNotif(admin._id.toString(), req.user!.id, `Pengajuan Cerita Baru: "${title}"`, newBlog._id.toString(), 'approval');
// // // //             }
// // // //         }
// // // //         res.status(201).json(newBlog);
// // // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // };

// // // // // --- 6. UPDATE STATUS (Approve/Reject) ---
// // // // export const updateBlogStatus = async (req: AuthedRequest, res: Response) => {
// // // //     try {
// // // //         const { status } = req.body;
// // // //         const blog = await Blog.findByIdAndUpdate(req.params.id, { status }, { new: true }).populate('author');
// // // //         if (!blog) return res.status(404).json({ error: 'Not found' });

// // // //         if (status === 'approved') {
// // // //             const author: any = blog.author;
// // // //             // Notif ke Penulis jika bukan dia sendiri yang approve
// // // //             if (author._id.toString() !== req.user!.id) {
// // // //                 await sendNotif(author._id.toString(), req.user!.id, `Selamat! Cerita Anda "${blog.title}" telah TERBIT!`, blog._id.toString(), 'blog');
// // // //             }
// // // //             // Notif Broadcast ke semua user
// // // //             const allUsers = await User.find({ _id: { $ne: author._id } }).select('_id');
// // // //             const notifs = allUsers.map(u => ({
// // // //                 recipient: u._id, sender: req.user!.id, type: 'blog', topic: blog._id,
// // // //                 message: `Berita Terbaru: "${blog.title}"`, isRead: false, createdAt: new Date()
// // // //             }));
// // // //             await Notification.insertMany(notifs);
// // // //         } else if (status === 'rejected') {
// // // //             const author: any = blog.author;
// // // //             if (author._id.toString() !== req.user!.id) {
// // // //                 await sendNotif(author._id.toString(), req.user!.id, `Maaf, cerita "${blog.title}" belum dapat ditayangkan.`, blog._id.toString(), 'blog');
// // // //             }
// // // //         }
// // // //         res.json(blog);
// // // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // };

// // // // // --- 7. UPDATE CONTENT ---
// // // // export const updateBlog = async (req: Request, res: Response) => {
// // // //     try { 
// // // //         if(req.body.title) {
// // // //             req.body.slug = slugify(req.body.title, { lower: true, strict: true }) + '-' + Date.now();
// // // //         }
// // // //         const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true }); 
// // // //         res.json(blog); 
// // // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // };

// // // // // --- 8. DELETE ---
// // // // export const deleteBlog = async (req: Request, res: Response) => {
// // // //     try { 
// // // //         await Blog.findByIdAndDelete(req.params.id); 
// // // //         res.json({ message: 'Deleted' }); 
// // // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // // };






// // // // import { Request, Response } from 'express';
// // // // import { Blog } from '../models/Blog';
// // // // import { User } from '../models/User';
// // // // import { Notification } from '../models/Notification';
// // // // import Comment from '../models/Comment';
// // // // import slugify from 'slugify';
// // // // import axios from 'axios';
// // // // import { AuthedRequest } from '../middleware/auth';

// // // // // Helper Notifikasi
// // // // const sendNotif = async (recipientId: string, senderId: string, message: string, topicId: string, type: string) => {
// // // //     try {
// // // //         await Notification.create({
// // // //             recipient: recipientId, sender: senderId, message, topic: topicId, type, isRead: false
// // // //         });
// // // //     } catch (e) { console.error("Notif Error:", e); }
// // // // };

// // // // // --- GET PUBLIC BLOGS ---
// // // // export const getPublicBlogs = async (req: Request, res: Response) => {
// // // //     try {
// // // //         const { search, page = 1, limit = 9 } = req.query;
// // // //         // Logic: Ambil yang status 'approved' ATAU data lama yang 'isPublished: true'
// // // //         const query: any = { 
// // // //             $or: [
// // // //                 { status: 'approved' },
// // // //                 { isPublished: true }
// // // //             ]
// // // //         };
// // // //         if (search) query.title = { $regex: search, $options: 'i' };

// // // //         const blogs = await Blog.find(query)
// // // //             .populate('author', 'name avatarUrl role')
// // // //             .sort({ createdAt: -1 })
// // // //             .skip((Number(page) - 1) * Number(limit))
// // // //             .limit(Number(limit))
// // // //             .lean();

// // // //         const blogsWithStats = await Promise.all(blogs.map(async (blog) => {
// // // //             const commentCount = await Comment.countDocuments({ blogId: blog._id });
// // // //             return { ...blog, commentCount };
// // // //         }));

// // // //         const total = await Blog.countDocuments(query);
// // // //         res.json({ data: blogsWithStats, pagination: { total, page: Number(page), pages: Math.ceil(total / Number(limit)) } });
// // // //     } catch (error: any) { res.status(500).json({ message: error.message }); }
// // // // };

// // // // // --- GET DETAIL ---
// // // // export const getPublicBlogById = async (req: Request, res: Response) => {
// // // //     try {
// // // //         const blog = await Blog.findOneAndUpdate(
// // // //             { _id: req.params.id },
// // // //             { $inc: { views: 1 } },
// // // //             { new: true }
// // // //         ).populate('author', 'name avatarUrl role');

// // // //         if (!blog) return res.status(404).json({ message: "Cerita tidak ditemukan" });
// // // //         const commentCount = await Comment.countDocuments({ blogId: blog._id });
// // // //         res.json({ ...blog.toObject(), commentCount });
// // // //     } catch (error: any) { res.status(500).json({ message: error.message }); }
// // // // };

// // // // // --- [FIX] GET ADMIN BLOGS (Pastikan Data Lama Muncul) ---
// // // // export const getAdminBlogs = async (req: Request, res: Response) => {
// // // //     try {
// // // //         const { search } = req.query;
// // // //         const query: any = {};
// // // //         if (search) query.title = { $regex: search, $options: 'i' };

// // // //         // Kita tidak filter status di query DB agar semua data muncul
// // // //         // Filter status dilakukan di Frontend Admin
// // // //         const blogs = await Blog.find(query)
// // // //             .populate('author', 'name avatarUrl role')
// // // //             .sort({ createdAt: -1 });
            
// // // //         res.json(blogs);
// // // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // };

// // // // // --- TOGGLE COMMENTS ---
// // // // export const toggleBlogComments = async (req: AuthedRequest, res: Response) => {
// // // //     try {
// // // //         const blog = await Blog.findById(req.params.id);
// // // //         if (!blog) return res.status(404).json({ error: 'Not found' });
// // // //         // Toggle logic
// // // //         blog.allowComments = !blog.allowComments;
// // // //         await blog.save();
// // // //         res.json({ success: true, allowComments: blog.allowComments });
// // // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // };

// // // // // --- CREATE BLOG ---
// // // // export const createBlog = async (req: AuthedRequest, res: Response) => {
// // // //     try {
// // // //         const { title, content, coverUrl, tags } = req.body;
// // // //         const userRole = req.user!.role.toUpperCase();
// // // //         const isAdmin = userRole === 'SUPER_ADMIN' || userRole === 'FACILITATOR';
// // // //         const status = isAdmin ? 'approved' : 'pending';
// // // //         const slug = slugify(title, { lower: true, strict: true }) + '-' + Date.now();

// // // //         const newBlog = await Blog.create({ 
// // // //             title, slug, content, coverUrl, tags, status, 
// // // //             author: req.user!.id, source: 'User Submission',
// // // //             isPublished: status === 'approved', // Sinkronisasi field lama
// // // //             allowComments: true
// // // //         });

// // // //         // Notif Logic
// // // //         if (isAdmin) {
// // // //             const allUsers = await User.find({ _id: { $ne: req.user!.id } }).select('_id');
// // // //             if(allUsers.length > 0) {
// // // //                 const notifs = allUsers.map(u => ({
// // // //                     recipient: u._id, sender: req.user!.id, type: 'blog', topic: newBlog._id,
// // // //                     message: `Berita Terbaru: "${title}"`, isRead: false
// // // //                 }));
// // // //                 await Notification.insertMany(notifs);
// // // //             }
// // // //         } else {
// // // //             const admins = await User.find({ role: { $in: ['SUPER_ADMIN', 'FACILITATOR'] } });
// // // //             for (const admin of admins) {
// // // //                 await sendNotif(admin._id.toString(), req.user!.id, `Draft Baru: "${title}"`, newBlog._id.toString(), 'approval');
// // // //             }
// // // //         }
// // // //         res.status(201).json(newBlog);
// // // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // };

// // // // // --- IMPORT PMI ---
// // // // export const importBlogsFromPMI = async (req: AuthedRequest, res: Response) => {
// // // //     const importedItems: any[] = [];
// // // //     const browserHeaders = { 'User-Agent': 'Mozilla/5.0' };
// // // //     try {
// // // //         try {
// // // //             const { data } = await axios.get('https://pmi.or.id/wp-json/wp/v2/posts?per_page=5&_embed', { headers: browserHeaders, timeout: 8000 });
// // // //             if (Array.isArray(data)) {
// // // //                 data.forEach((post: any) => {
// // // //                     const title = post.title?.rendered;
// // // //                     const link = post.link;
// // // //                     const summary = post.excerpt?.rendered?.replace(/<[^>]+>/g, '') || "...";
// // // //                     let coverUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || "https://pmi.or.id/wp-content/uploads/2020/07/logo-pmi-2.png";
// // // //                     if (title && link) importedItems.push({ title, link, coverUrl, summary });
// // // //                 });
// // // //             }
// // // //         } catch (e) {}

// // // //         const savedBlogs: any[] = [];
// // // //         for (const item of importedItems) {
// // // //             const exists = await Blog.findOne({ title: item.title });
// // // //             if (!exists) {
// // // //                 const slug = slugify(item.title, { lower: true, strict: true }) + '-' + Date.now();
// // // //                 await Blog.create({
// // // //                     title: item.title, slug, 
// // // //                     content: `<p>${item.summary}</p><p><a href="${item.link}">Baca selengkapnya</a></p>`,
// // // //                     coverUrl: item.coverUrl, tags: ['PMI Pusat', 'Impor'], 
// // // //                     status: 'pending', isPublished: false, source: 'PMI Pusat', author: req.user!.id
// // // //                 });
// // // //                 savedBlogs.push(item);
// // // //             }
// // // //         }
// // // //         res.json({ message: 'Import selesai', totalFound: importedItems.length, savedCount: savedBlogs.length, results: savedBlogs });
// // // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // };

// // // // // --- UPDATE STATUS ---
// // // // export const updateBlogStatus = async (req: AuthedRequest, res: Response) => {
// // // //     try {
// // // //         const { status } = req.body;
// // // //         // Update status DAN isPublished agar sinkron
// // // //         const blog = await Blog.findByIdAndUpdate(req.params.id, { 
// // // //             status, 
// // // //             isPublished: status === 'approved' 
// // // //         }, { new: true }).populate('author');
        
// // // //         if (!blog) return res.status(404).json({ error: 'Not found' });

// // // //         if (status === 'approved') {
// // // //             const author: any = blog.author;
// // // //             if (author._id.toString() !== req.user!.id) {
// // // //                 await sendNotif(author._id.toString(), req.user!.id, `Cerita "${blog.title}" TERBIT!`, blog._id.toString(), 'blog');
// // // //             }
// // // //         }
// // // //         res.json(blog);
// // // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // };

// // // // // --- DELETE & UPDATE CONTENT ---
// // // // export const deleteBlog = async (req: Request, res: Response) => {
// // // //     try { await Blog.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); } 
// // // //     catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // };
// // // // export const updateBlogContent = async (req: Request, res: Response) => {
// // // //     try {
// // // //         if(req.body.title) req.body.slug = slugify(req.body.title, { lower: true, strict: true }) + '-' + Date.now();
// // // //         const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
// // // //         res.json(blog);
// // // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // // };




// // // import { Request, Response } from 'express';
// // // import { Blog } from '../models/Blog';
// // // import { User } from '../models/User';
// // // import { Notification } from '../models/Notification';
// // // import { Comment } from '../models/Comment'; // Pastikan model Comment sudah support blogId
// // // import slugify from 'slugify';
// // // import axios from 'axios';
// // // import { AuthedRequest } from '../middleware/auth';

// // // // Helper Notifikasi
// // // const sendNotif = async (recipientId: string, senderId: string, message: string, topicId: string, type: string) => {
// // //     try {
// // //         await Notification.create({
// // //             recipient: recipientId, sender: senderId, message, topic: topicId, type, isRead: false
// // //         });
// // //     } catch (e) { console.error("Notif Error:", e); }
// // // };

// // // // --- GET PUBLIC BLOGS (DIPERBAIKI: SINKRONISASI TOTAL KOMENTAR) ---
// // // export const getPublicBlogs = async (req: Request, res: Response) => {
// // //     try {
// // //         const { search, page = 1, limit = 9 } = req.query;
// // //         // Logic: Ambil yang status 'approved' ATAU data lama yang 'isPublished: true'
// // //         const query: any = { 
// // //             $or: [
// // //                 { status: 'approved' },
// // //                 { isPublished: true }
// // //             ]
// // //         };
// // //         if (search) query.title = { $regex: search, $options: 'i' };

// // //         const blogs = await Blog.find(query)
// // //             .populate('author', 'name avatarUrl role')
// // //             .sort({ createdAt: -1 })
// // //             .skip((Number(page) - 1) * Number(limit))
// // //             .limit(Number(limit))
// // //             .lean();

// // //         // [FIX] Hitung jumlah komentar real-time dari collection Comment
// // //         const blogsWithStats = await Promise.all(blogs.map(async (blog) => {
// // //             const commentCount = await Comment.countDocuments({ blogId: blog._id });
// // //             return { ...blog, commentCount };
// // //         }));

// // //         const total = await Blog.countDocuments(query);
// // //         res.json({ data: blogsWithStats, pagination: { total, page: Number(page), pages: Math.ceil(total / Number(limit)) } });
// // //     } catch (error: any) { res.status(500).json({ message: error.message }); }
// // // };

// // // // --- GET DETAIL (DIPERBAIKI: VIEW COUNT & COMMENT COUNT) ---
// // // export const getPublicBlogById = async (req: Request, res: Response) => {
// // //     try {
// // //         const blog = await Blog.findOneAndUpdate(
// // //             { _id: req.params.id },
// // //             { $inc: { views: 1 } },
// // //             { new: true }
// // //         ).populate('author', 'name avatarUrl role');

// // //         if (!blog) return res.status(404).json({ message: "Cerita tidak ditemukan" });
        
// // //         // [FIX] Hitung komentar real-time
// // //         const commentCount = await Comment.countDocuments({ blogId: blog._id });
        
// // //         // Return object blog + commentCount
// // //         res.json({ ...blog.toObject(), commentCount });
// // //     } catch (error: any) { res.status(500).json({ message: error.message }); }
// // // };

// // // // --- GET ADMIN BLOGS ---
// // // export const getAdminBlogs = async (req: Request, res: Response) => {
// // //     try {
// // //         const { search } = req.query;
// // //         const query: any = {};
// // //         if (search) query.title = { $regex: search, $options: 'i' };

// // //         const blogs = await Blog.find(query)
// // //             .populate('author', 'name avatarUrl role')
// // //             .sort({ createdAt: -1 });
            
// // //         res.json(blogs);
// // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // };

// // // // --- TOGGLE COMMENTS ---
// // // export const toggleBlogComments = async (req: AuthedRequest, res: Response) => {
// // //     try {
// // //         const blog = await Blog.findById(req.params.id);
// // //         if (!blog) return res.status(404).json({ error: 'Not found' });
// // //         // Toggle logic
// // //         blog.allowComments = !blog.allowComments;
// // //         await blog.save();
// // //         res.json({ success: true, allowComments: blog.allowComments });
// // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // };

// // // // --- CREATE BLOG ---
// // // export const createBlog = async (req: AuthedRequest, res: Response) => {
// // //     try {
// // //         const { title, content, coverUrl, tags } = req.body;
// // //         const userRole = req.user!.role.toUpperCase();
// // //         const isAdmin = userRole === 'SUPER_ADMIN' || userRole === 'FACILITATOR';
// // //         const status = isAdmin ? 'approved' : 'pending';
// // //         const slug = slugify(title, { lower: true, strict: true }) + '-' + Date.now();

// // //         const newBlog = await Blog.create({ 
// // //             title, slug, content, coverUrl, tags, status, 
// // //             author: req.user!.id, source: 'User Submission',
// // //             isPublished: status === 'approved', // Sinkronisasi field lama
// // //             allowComments: true
// // //         });

// // //         // Notif Logic
// // //         if (isAdmin) {
// // //             const allUsers = await User.find({ _id: { $ne: req.user!.id } }).select('_id');
// // //             if(allUsers.length > 0) {
// // //                 const notifs = allUsers.map(u => ({
// // //                     recipient: u._id, sender: req.user!.id, type: 'blog', topic: newBlog._id,
// // //                     message: `Berita Terbaru: "${title}"`, isRead: false
// // //                 }));
// // //                 await Notification.insertMany(notifs);
// // //             }
// // //         } else {
// // //             const admins = await User.find({ role: { $in: ['SUPER_ADMIN', 'FACILITATOR'] } });
// // //             for (const admin of admins) {
// // //                 await sendNotif(admin._id.toString(), req.user!.id, `Draft Baru: "${title}"`, newBlog._id.toString(), 'approval');
// // //             }
// // //         }
// // //         res.status(201).json(newBlog);
// // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // };

// // // // --- IMPORT PMI ---
// // // export const importBlogsFromPMI = async (req: AuthedRequest, res: Response) => {
// // //     const importedItems: any[] = [];
// // //     const browserHeaders = { 'User-Agent': 'Mozilla/5.0' };
// // //     try {
// // //         try {
// // //             const { data } = await axios.get('https://pmi.or.id/wp-json/wp/v2/posts?per_page=5&_embed', { headers: browserHeaders, timeout: 8000 });
// // //             if (Array.isArray(data)) {
// // //                 data.forEach((post: any) => {
// // //                     const title = post.title?.rendered;
// // //                     const link = post.link;
// // //                     const summary = post.excerpt?.rendered?.replace(/<[^>]+>/g, '') || "...";
// // //                     let coverUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || "https://pmi.or.id/wp-content/uploads/2020/07/logo-pmi-2.png";
// // //                     if (title && link) importedItems.push({ title, link, coverUrl, summary });
// // //                 });
// // //             }
// // //         } catch (e) {}

// // //         const savedBlogs: any[] = [];
// // //         for (const item of importedItems) {
// // //             const exists = await Blog.findOne({ title: item.title });
// // //             if (!exists) {
// // //                 const slug = slugify(item.title, { lower: true, strict: true }) + '-' + Date.now();
// // //                 await Blog.create({
// // //                     title: item.title, slug, 
// // //                     content: `<p>${item.summary}</p><p><a href="${item.link}">Baca selengkapnya</a></p>`,
// // //                     coverUrl: item.coverUrl, tags: ['PMI Pusat', 'Impor'], 
// // //                     status: 'pending', isPublished: false, source: 'PMI Pusat', author: req.user!.id
// // //                 });
// // //                 savedBlogs.push(item);
// // //             }
// // //         }
// // //         res.json({ message: 'Import selesai', totalFound: importedItems.length, savedCount: savedBlogs.length, results: savedBlogs });
// // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // };

// // // // --- UPDATE STATUS ---
// // // export const updateBlogStatus = async (req: AuthedRequest, res: Response) => {
// // //     try {
// // //         const { status } = req.body;
// // //         // Update status DAN isPublished agar sinkron
// // //         const blog = await Blog.findByIdAndUpdate(req.params.id, { 
// // //             status, 
// // //             isPublished: status === 'approved' 
// // //         }, { new: true }).populate('author');
        
// // //         if (!blog) return res.status(404).json({ error: 'Not found' });

// // //         if (status === 'approved') {
// // //             const author: any = blog.author;
// // //             if (author._id.toString() !== req.user!.id) {
// // //                 await sendNotif(author._id.toString(), req.user!.id, `Cerita "${blog.title}" TERBIT!`, blog._id.toString(), 'blog');
// // //             }
// // //         }
// // //         res.json(blog);
// // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // };

// // // // --- DELETE & UPDATE CONTENT ---
// // // export const deleteBlog = async (req: Request, res: Response) => {
// // //     try { await Blog.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); } 
// // //     catch (e: any) { res.status(500).json({ error: e.message }); }
// // // };
// // // export const updateBlogContent = async (req: Request, res: Response) => {
// // //     try {
// // //         if(req.body.title) req.body.slug = slugify(req.body.title, { lower: true, strict: true }) + '-' + Date.now();
// // //         const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
// // //         res.json(blog);
// // //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // // };

// // // // --- [BARU] ADD BLOG COMMENT ---
// // // export const addBlogComment = async (req: AuthedRequest, res: Response) => {
// // //     try {
// // //         const { blogId } = req.params;
// // //         const { content } = req.body;
// // //         const userId = req.user!.id;

// // //         if (!content) return res.status(400).json({ error: "Komentar kosong" });

// // //         const newComment = new Comment({
// // //             author: userId,
// // //             blogId: blogId, // Menyimpan ID Blog
// // //             content,
// // //             // parentId: null (Jika belum support reply di blog, default null)
// // //         });

// // //         await newComment.save();
// // //         await newComment.populate('author', 'name avatarUrl role');

// // //         // Buat Notifikasi untuk Penulis Blog
// // //         try {
// // //             const blog = await Blog.findById(blogId);
// // //             // Jika yang komen bukan penulis blog, kirim notif
// // //             if (blog && blog.author.toString() !== userId) {
// // //                 await Notification.create({
// // //                     recipient: blog.author,
// // //                     sender: userId,
// // //                     type: 'blog', // Tipe blog agar badge menyala
// // //                     topic: blogId,
// // //                     message: `mengomentari cerita Anda "${blog.title}"`,
// // //                     isRead: false
// // //                 });
// // //             }
// // //         } catch (notifError) {
// // //             console.error("Gagal kirim notif blog", notifError);
// // //         }

// // //         res.status(201).json(newComment);
// // //     } catch (e: any) {
// // //         res.status(500).json({ error: e.message });
// // //     }
// // // };

// // // // --- [BARU] GET BLOG COMMENTS ---
// // // export const getBlogComments = async (req: Request, res: Response) => {
// // //     try {
// // //         const { blogId } = req.params;
// // //         const comments = await Comment.find({ blogId })
// // //             .sort({ createdAt: -1 })
// // //             .populate('author', 'name avatarUrl role');
// // //         res.json(comments);
// // //     } catch (e: any) {
// // //         res.status(500).json({ error: e.message });
// // //     }
// // // };


// // import { Request, Response } from 'express';
// // import { Blog } from '../models/Blog';
// // import { User } from '../models/User';
// // import { Notification } from '../models/Notification';
// // import { Comment } from '../models/Comment';
// // import slugify from 'slugify';
// // import axios from 'axios';
// // import { AuthedRequest } from '../middleware/auth';

// // const getUserId = (req: any) => req.user?.id || req.user?._id;

// // // --- 1. GET PUBLIC BLOGS (Hanya yang Approved/Published) ---
// // export const getPublicBlogs = async (req: Request, res: Response) => {
// //     try {
// //         const { search, page = 1, limit = 9 } = req.query;
// //         // Filter: Hanya tampilkan yang statusnya approved ATAU isPublished true
// //         const query: any = { 
// //             $or: [{ status: 'approved' }, { isPublished: true }] 
// //         };
        
// //         if (search) query.title = { $regex: search, $options: 'i' };

// //         const blogs = await Blog.find(query)
// //             .populate('author', 'name avatarUrl role')
// //             .sort({ createdAt: -1 })
// //             .skip((Number(page) - 1) * Number(limit))
// //             .limit(Number(limit))
// //             .lean();

// //         // Hitung Komentar (Support data lama & baru)
// //         const blogsWithStats = await Promise.all(blogs.map(async (blog) => {
// //             try {
// //                 let commentCount = await Comment.countDocuments({ blogId: blog._id });
// //                 if (commentCount === 0 && (blog as any).comments?.length > 0) {
// //                     commentCount = (blog as any).comments.length;
// //                 }
// //                 return { ...blog, commentCount };
// //             } catch (e) { return { ...blog, commentCount: 0 }; }
// //         }));

// //         const total = await Blog.countDocuments(query);
// //         res.json({ 
// //             data: blogsWithStats, 
// //             pagination: { total, page: Number(page), pages: Math.ceil(total / Number(limit)) } 
// //         });
// //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // };

// // // --- 2. GET DETAIL BLOG ---
// // export const getPublicBlogById = async (req: Request, res: Response) => {
// //     try {
// //         // FindOneAndUpdate untuk increment views
// //         // Hapus filter {status: approved} disini agar Admin bisa preview blog via link ID meski status pending
// //         const blog = await Blog.findByIdAndUpdate(
// //             req.params.id,
// //             { $inc: { views: 1 } },
// //             { new: true }
// //         ).populate('author', 'name avatarUrl role');

// //         if (!blog) return res.status(404).json({ message: "Cerita tidak ditemukan" });
        
// //         let commentCount = await Comment.countDocuments({ blogId: blog._id });
// //         if (commentCount === 0 && (blog as any).comments?.length > 0) {
// //             commentCount = (blog as any).comments.length;
// //         }

// //         const blogObj = blog.toObject();
// //         (blogObj as any).user = blogObj.author; // Map author ke user untuk frontend

// //         res.json({ ...blogObj, commentCount });
// //     } catch (e: any) { res.status(500).json({ message: e.message }); }
// // };

// // // --- 3. GET ADMIN BLOGS (SEMUA DATA) ---
// // export const getAdminBlogs = async (req: Request, res: Response) => {
// //     try {
// //         const { search } = req.query;
// //         // [CRITICAL FIX] Query kosong artinya ambil SEMUA data tanpa filter status
// //         const query: any = {}; 
        
// //         if (search) query.title = { $regex: search, $options: 'i' };

// //         const blogs = await Blog.find(query)
// //             .populate('author', 'name avatarUrl role')
// //             .sort({ createdAt: -1 });
            
// //         res.json(blogs);
// //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // };

// // // --- 4. CRUD UTILS (Create, Update, Delete) ---
// // export const createBlog = async (req: AuthedRequest, res: Response) => {
// //     try {
// //         const { title, content, coverUrl, tags } = req.body;
// //         const userRole = req.user!.role.toUpperCase();
// //         // Admin langsung approved, User biasa pending
// //         const status = ['SUPER_ADMIN','FACILITATOR'].includes(userRole) ? 'approved' : 'pending';
// //         const slug = slugify(title, { lower: true, strict: true }) + '-' + Date.now();

// //         const newBlog = await Blog.create({ 
// //             title, slug, content, coverUrl, tags, status, 
// //             author: req.user!.id, source: 'User Submission',
// //             isPublished: status === 'approved',
// //             allowComments: true 
// //         });
// //         res.status(201).json(newBlog);
// //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // };

// // export const updateBlog = async (req: Request, res: Response) => {
// //     try {
// //         if(req.body.title) req.body.slug = slugify(req.body.title, { lower: true, strict: true }) + '-' + Date.now();
// //         const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
// //         res.json(blog);
// //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // };

// // export const deleteBlog = async (req: Request, res: Response) => {
// //     try { 
// //         await Blog.findByIdAndDelete(req.params.id); 
// //         // Opsional: Hapus komentar terkait juga
// //         await Comment.deleteMany({ blogId: req.params.id });
// //         res.json({ message: 'Deleted' }); 
// //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // };

// // // --- 5. ADMIN ACTIONS (Approve, Toggle Comments) ---
// // export const updateBlogStatus = async (req: AuthedRequest, res: Response) => {
// //     try {
// //         const { status } = req.body;
// //         // Update status DAN isPublished agar sinkron
// //         const blog = await Blog.findByIdAndUpdate(req.params.id, { 
// //             status, 
// //             isPublished: status === 'approved' 
// //         }, { new: true });
        
// //         // Kirim notifikasi jika approved (Opsional)
// //         if (blog && status === 'approved' && blog.author.toString() !== req.user!.id) {
// //              await Notification.create({
// //                  recipient: blog.author, sender: req.user!.id, type: 'blog', topic: blog._id,
// //                  message: `Cerita Anda "${blog.title}" telah TERBIT!`, isRead: false
// //              });
// //         }

// //         res.json(blog);
// //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // };

// // export const toggleBlogComments = async (req: AuthedRequest, res: Response) => {
// //     try { 
// //         const blog = await Blog.findById(req.params.id); 
// //         if(blog){ 
// //             blog.allowComments = !blog.allowComments; 
// //             await blog.save(); 
// //             res.json({ success: true, allowComments: blog.allowComments }); 
// //         } else {
// //             res.status(404).json({error: "Blog not found"});
// //         }
// //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // };

// // // --- 6. KOMENTAR ---
// // export const getBlogComments = async (req: Request, res: Response) => {
// //     try {
// //         const { blogId } = req.params;
// //         const page = parseInt(req.query.page as string) || 1;
// //         const limit = 10;
// //         const skip = (page - 1) * limit;

// //         const totalComments = await Comment.countDocuments({ blogId, parent: null });
        
// //         if (totalComments > 0) {
// //             const comments = await Comment.find({ blogId, parent: null }).sort({ createdAt: -1 }).skip(skip).limit(limit).populate('author', 'name avatarUrl role').lean();
// //             const replies = await Comment.find({ blogId, parent: { $ne: null } }).sort({ createdAt: 1 }).populate('author', 'name avatarUrl role').lean();
// //             const mapUser = (items: any[]) => items.map(c => ({ ...c, user: c.author }));
// //             return res.json({ 
// //                 comments: mapUser(comments), 
// //                 replies: mapUser(replies), 
// //                 pagination: { currentPage: page, totalPages: Math.ceil(totalComments/limit), totalComments } 
// //             });
// //         }

// //         // Fallback Legacy
// //         const blog = await Blog.findById(blogId).populate('comments.author', 'name avatarUrl role').lean();
// //         const legacyComments = (blog as any)?.comments || [];
// //         legacyComments.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
// //         const mappedLegacy = legacyComments.slice(skip, skip + limit).map((c: any) => ({
// //             _id: c._id, content: c.content, createdAt: c.createdAt, user: c.author, parent: null
// //         }));

// //         res.json({ comments: mappedLegacy, replies: [], pagination: { currentPage: page, totalPages: Math.ceil(legacyComments.length/limit) || 1, totalComments: legacyComments.length } });
// //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // };

// // export const addBlogComment = async (req: AuthedRequest, res: Response) => {
// //     try {
// //         const { blogId } = req.params;
// //         const { content, parentId } = req.body;
// //         const userId = getUserId(req);

// //         if (!content) return res.status(400).json({ error: "Kosong" });

// //         const newComment = new Comment({ author: userId, blogId, content, parent: parentId || null });
// //         await newComment.save();
// //         await newComment.populate('author', 'name avatarUrl role');

// //         // Backup Legacy
// //         await Blog.findByIdAndUpdate(blogId, { $push: { comments: { author: userId, content, createdAt: new Date() } } });

// //         res.status(201).json({ ...newComment.toObject(), user: (newComment as any).author });
// //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // };

// // export const deleteBlogComment = async (req: AuthedRequest, res: Response) => {
// //     try { await Comment.findByIdAndDelete(req.params.commentId); res.json({message: "Deleted"}); } catch(e:any){ res.status(500).json({error:e.message}); }
// // };

// // // Alias export
// // export const updateBlogContent = updateBlog;
// // export const importPmiBlogs = async (req: AuthedRequest, res: Response) => { res.json({ message: 'Import ready' }); }; 
// // export const importBlogsFromPMI = importPmiBlogs;


// import { Request, Response } from 'express';
// import { Blog } from '../models/Blog';
// import { User } from '../models/User';
// import { Notification } from '../models/Notification';
// import { Comment } from '../models/Comment';
// import slugify from 'slugify';
// import axios from 'axios';
// import { AuthedRequest } from '../middleware/auth';

// const getUserId = (req: any) => req.user?.id || req.user?._id;

// // --- 1. GET PUBLIC BLOGS (Halaman Depan) ---
// export const getPublicBlogs = async (req: Request, res: Response) => {
//     try {
//         const { search, page = 1, limit = 9 } = req.query;
//         // Filter: Tampilkan yang Approved ATAU Published
//         const query: any = { 
//             $or: [{ status: 'approved' }, { isPublished: true }] 
//         };

//         if (search) query.title = { $regex: search, $options: 'i' };

//         const blogs = await Blog.find(query)
//             .populate('author', 'name avatarUrl role')
//             .sort({ createdAt: -1 })
//             .skip((Number(page) - 1) * Number(limit))
//             .limit(Number(limit))
//             .lean();

//         // Hitung Komentar (Safe Mode: Cek Collection Baru & Legacy)
//         const blogsWithStats = await Promise.all(blogs.map(async (blog) => {
//             try {
//                 let commentCount = await Comment.countDocuments({ blogId: blog._id });
//                 // Fallback ke data lama jika di collection baru 0
//                 if(commentCount === 0 && (blog as any).comments?.length > 0) {
//                     commentCount = (blog as any).comments.length;
//                 }
//                 return { ...blog, commentCount };
//             } catch (e) { return { ...blog, commentCount: 0 }; }
//         }));

//         const total = await Blog.countDocuments(query);
//         res.json({ 
//             data: blogsWithStats, 
//             pagination: { total, page: Number(page), pages: Math.ceil(total / Number(limit)) } 
//         });
//     } catch (e: any) { res.status(500).json({ error: e.message }); }
// };

// // --- 2. GET DETAIL BLOG (AUTO INCREMENT VIEW) ---
// export const getPublicBlogById = async (req: Request, res: Response) => {
//     try {
//         // [CRITICAL FIX] Menggunakan findOneAndUpdate untuk menambah views
//         // Kita hapus filter status disini agar Admin bisa preview draft via link ID
//         const blog = await Blog.findOneAndUpdate(
//             { _id: req.params.id }, 
//             { $inc: { views: 1 } }, // Increment views +1
//             { new: true } // Return data terbaru yang sudah di-update
//         ).populate('author', 'name avatarUrl role');

//         if (!blog) return res.status(404).json({ message: "Cerita tidak ditemukan" });
        
//         // Hitung total komentar
//         let commentCount = await Comment.countDocuments({ blogId: blog._id });
//         if(commentCount === 0 && (blog as any).comments?.length > 0) {
//             commentCount = (blog as any).comments.length;
//         }

//         const blogObj = blog.toObject();
//         (blogObj as any).user = blogObj.author; // Mapping author -> user untuk frontend

//         res.json({ ...blogObj, commentCount });
//     } catch (e: any) { res.status(500).json({ message: e.message }); }
// };

// // --- 3. GET ADMIN BLOGS (VIEW ALL) ---
// export const getAdminBlogs = async (req: Request, res: Response) => {
//     try {
//         const { search } = req.query;
//         // [PENTING] Query kosong artinya ambil SEMUA data (Pending, Approved, Rejected)
//         const query: any = {}; 
        
//         if (search) query.title = { $regex: search, $options: 'i' };

//         const blogs = await Blog.find(query)
//             .populate('author', 'name avatarUrl role')
//             .sort({ createdAt: -1 });
            
//         res.json(blogs);
//     } catch (e: any) { res.status(500).json({ error: e.message }); }
// };

// // --- 4. KOMENTAR (PAGINATION + REPLY) ---
// export const getBlogComments = async (req: Request, res: Response) => {
//     try {
//         const { blogId } = req.params;
//         const page = parseInt(req.query.page as string) || 1;
//         const limit = 10;
//         const skip = (page - 1) * limit;

//         // Cek Collection Baru
//         const totalComments = await Comment.countDocuments({ blogId, parent: null });
        
//         if (totalComments > 0) {
//             const comments = await Comment.find({ blogId, parent: null })
//                 .sort({ createdAt: -1 })
//                 .skip(skip)
//                 .limit(limit)
//                 .populate('author', 'name avatarUrl role')
//                 .lean();
            
//             const replies = await Comment.find({ blogId, parent: { $ne: null } })
//                 .sort({ createdAt: 1 })
//                 .populate('author', 'name avatarUrl role')
//                 .lean();

//             const mapUser = (items: any[]) => items.map(c => ({ ...c, user: c.author }));
            
//             return res.json({ 
//                 comments: mapUser(comments), 
//                 replies: mapUser(replies), 
//                 pagination: { currentPage: page, totalPages: Math.ceil(totalComments/limit), totalComments } 
//             });
//         }

//         // Fallback Legacy (Data Lama)
//         const blog = await Blog.findById(blogId).populate('comments.author', 'name avatarUrl role').lean();
//         const legacyComments = (blog as any)?.comments || [];
        
//         // Sort & Pagination Manual untuk Array
//         legacyComments.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
//         const paginatedLegacy = legacyComments.slice(skip, skip + limit);
        
//         const mappedLegacy = paginatedLegacy.map((c: any) => ({
//             _id: c._id, content: c.content, createdAt: c.createdAt, user: c.author, parent: null
//         }));

//         res.json({ 
//             comments: mappedLegacy, 
//             replies: [], 
//             pagination: { currentPage: page, totalPages: Math.ceil(legacyComments.length/limit) || 1, totalComments: legacyComments.length } 
//         });

//     } catch (e: any) { res.status(500).json({ error: e.message }); }
// };

// export const addBlogComment = async (req: AuthedRequest, res: Response) => {
//     try {
//         const { blogId } = req.params;
//         const { content, parentId } = req.body;
//         const userId = getUserId(req);

//         if (!content) return res.status(400).json({ error: "Kosong" });

//         // Simpan ke Collection Baru
//         const newComment = new Comment({ 
//             author: userId, blogId, content, parent: parentId || null 
//         });
//         await newComment.save();
//         await newComment.populate('author', 'name avatarUrl role');

//         // Backup ke Legacy Array (Agar aman)
//         await Blog.findByIdAndUpdate(blogId, { 
//             $push: { comments: { author: userId, content, createdAt: new Date() } } 
//         });

//         // Notifikasi
//         try {
//             const blog = await Blog.findById(blogId);
//             // Notif ke pemilik blog
//             if(blog && blog.author.toString() !== userId && !parentId) {
//                 await Notification.create({ 
//                     recipient: blog.author, sender: userId, type: 'blog', topic: blogId, 
//                     message: 'mengomentari cerita Anda', isRead: false 
//                 });
//             }
//             // Notif ke pemilik komentar (Reply)
//             if (parentId) {
//                 const parentComment = await Comment.findById(parentId);
//                 if (parentComment && parentComment.author.toString() !== userId) {
//                     await Notification.create({ 
//                         recipient: parentComment.author, sender: userId, type: 'blog', topic: blogId, 
//                         message: 'membalas komentar Anda', isRead: false 
//                     });
//                 }
//             }
//         } catch(e) {}

//         const resData = newComment.toObject();
//         (resData as any).user = resData.author;
//         res.status(201).json(resData);
//     } catch (e: any) { res.status(500).json({ error: e.message }); }
// };

// export const deleteBlogComment = async (req: AuthedRequest, res: Response) => {
//     try {
//         const { commentId } = req.params;
//         const userId = getUserId(req);
        
//         const comment = await Comment.findById(commentId);
//         if(!comment) return res.status(404).json({error: "Komentar tidak ditemukan"});

//         // Cek permission: Pemilik Komentar ATAU Admin
//         const isAdmin = ['SUPER_ADMIN', 'FACILITATOR'].includes(req.user!.role.toUpperCase());
//         if (comment.author.toString() !== userId && !isAdmin) {
//             return res.status(403).json({ error: "Tidak ada akses" });
//         }

//         // Hapus komentar dan balasannya
//         await Comment.deleteMany({ $or: [{ _id: commentId }, { parent: commentId }] });
//         res.json({ message: "Komentar dihapus" });
//     } catch (e: any) { res.status(500).json({ error: e.message }); }
// };

// // --- 5. CRUD UTILS (Create, Update, Delete) ---
// export const createBlog = async (req: AuthedRequest, res: Response) => {
//     try {
//         const { title, content, coverUrl, tags } = req.body;
//         const userRole = req.user!.role.toUpperCase();
//         // Admin otomatis Approved
//         const status = ['SUPER_ADMIN','FACILITATOR'].includes(userRole) ? 'approved' : 'pending';
//         const slug = slugify(title, { lower: true, strict: true }) + '-' + Date.now();

//         const newBlog = await Blog.create({ 
//             title, slug, content, coverUrl, tags, status, 
//             author: req.user!.id, source: 'User Submission',
//             isPublished: status === 'approved', // Sinkron
//             allowComments: true 
//         });
//         res.status(201).json(newBlog);
//     } catch (e: any) { res.status(500).json({ error: e.message }); }
// };

// export const updateBlog = async (req: Request, res: Response) => {
//     try {
//         if(req.body.title) req.body.slug = slugify(req.body.title, { lower: true, strict: true }) + '-' + Date.now();
//         const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         res.json(blog);
//     } catch (e: any) { res.status(500).json({ error: e.message }); }
// };

// export const updateBlogStatus = async (req: AuthedRequest, res: Response) => {
//     try {
//         const { status } = req.body;
//         const blog = await Blog.findByIdAndUpdate(req.params.id, { 
//             status, 
//             isPublished: status === 'approved' 
//         }, { new: true });
        
//         // Notif jika approved
//         if (blog && status === 'approved' && blog.author.toString() !== req.user!.id) {
//              try {
//                  await Notification.create({
//                      recipient: blog.author, sender: req.user!.id, type: 'blog', topic: blog._id,
//                      message: `Cerita Anda "${blog.title}" telah TERBIT!`, isRead: false
//                  });
//              } catch(e) {}
//         }
//         res.json(blog);
//     } catch (e: any) { res.status(500).json({ error: e.message }); }
// };

// export const deleteBlog = async (req: Request, res: Response) => {
//     try { 
//         await Blog.findByIdAndDelete(req.params.id); 
//         await Comment.deleteMany({ blogId: req.params.id }); // Hapus komentar terkait
//         res.json({ message: 'Deleted' }); 
//     } catch (e: any) { res.status(500).json({ error: e.message }); }
// };

// export const toggleBlogComments = async (req: AuthedRequest, res: Response) => {
//     try { 
//         const blog = await Blog.findById(req.params.id); 
//         if(blog){ 
//             blog.allowComments = !blog.allowComments; 
//             await blog.save(); 
//             res.json({ success: true, allowComments: blog.allowComments }); 
//         } else {
//             res.status(404).json({error: "Blog not found"});
//         }
//     } catch (e: any) { res.status(500).json({ error: e.message }); }
// };

// // Alias Exports
// export const updateBlogContent = updateBlog;
// export const importPmiBlogs = async (req: AuthedRequest, res: Response) => { res.json({ message: 'Import ready' }); }; 
// export const importBlogsFromPMI = importPmiBlogs;

import { Request, Response } from 'express';
import { Blog } from '../models/Blog';
import { User } from '../models/User';
import { Notification } from '../models/Notification';
import { Comment } from '../models/Comment';
import slugify from 'slugify';
import axios from 'axios';
import { AuthedRequest } from '../middleware/auth';

const getUserId = (req: any) => req.user?.id || req.user?._id;

// --- 1. GET PUBLIC BLOGS ---
export const getPublicBlogs = async (req: Request, res: Response) => {
    try {
        const { search, page = 1, limit = 9 } = req.query;
        // Filter: Approved ATAU Published
        const query: any = { 
            $or: [{ status: 'approved' }, { isPublished: true }] 
        };

        if (search) query.title = { $regex: search, $options: 'i' };

        const blogs = await Blog.find(query)
            .populate('author', 'name avatarUrl role')
            .sort({ createdAt: -1 })
            .skip((Number(page) - 1) * Number(limit))
            .limit(Number(limit))
            .lean();

        const blogsWithStats = await Promise.all(blogs.map(async (blog) => {
            try {
                let commentCount = await Comment.countDocuments({ blogId: blog._id });
                if(commentCount === 0 && (blog as any).comments?.length > 0) {
                    commentCount = (blog as any).comments.length;
                }
                return { ...blog, commentCount };
            } catch (e) { return { ...blog, commentCount: 0 }; }
        }));

        const total = await Blog.countDocuments(query);
        res.json({ 
            data: blogsWithStats, 
            pagination: { total, page: Number(page), pages: Math.ceil(total / Number(limit)) } 
        });
    } catch (e: any) { res.status(500).json({ error: e.message }); }
};

// --- 2. GET DETAIL BLOG ---
export const getPublicBlogById = async (req: Request, res: Response) => {
    try {
        const blog = await Blog.findOneAndUpdate(
            { _id: req.params.id }, 
            { $inc: { views: 1 } }, 
            { new: true } 
        ).populate('author', 'name avatarUrl role');

        if (!blog) return res.status(404).json({ message: "Cerita tidak ditemukan" });
        
        let commentCount = await Comment.countDocuments({ blogId: blog._id });
        if(commentCount === 0 && (blog as any).comments?.length > 0) {
            commentCount = (blog as any).comments.length;
        }

        const blogObj = blog.toObject();
        (blogObj as any).user = blogObj.author; 

        res.json({ ...blogObj, commentCount });
    } catch (e: any) { res.status(500).json({ message: e.message }); }
};

// --- 3. GET ADMIN BLOGS ---
export const getAdminBlogs = async (req: Request, res: Response) => {
    try {
        const { search } = req.query;
        const query: any = {}; 
        
        if (search) query.title = { $regex: search, $options: 'i' };

        const blogs = await Blog.find(query)
            .populate('author', 'name avatarUrl role')
            .sort({ createdAt: -1 });
            
        res.json(blogs);
    } catch (e: any) { res.status(500).json({ error: e.message }); }
};

// --- 4. CREATE BLOG (User Submission) ---
export const createBlog = async (req: AuthedRequest, res: Response) => {
    try {
        const { title, content, coverUrl, tags, allowComments } = req.body; // [UPDATE] Terima allowComments
        const userRole = req.user!.role.toUpperCase();
        
        // Admin langsung Approved, User biasa Pending
        const status = ['SUPER_ADMIN','FACILITATOR'].includes(userRole) ? 'approved' : 'pending';
        const slug = slugify(title, { lower: true, strict: true }) + '-' + Date.now();

        const newBlog = await Blog.create({ 
            title, slug, content, coverUrl, tags, status, 
            author: req.user!.id, source: 'User Submission',
            isPublished: status === 'approved',
            // [UPDATE] Gunakan input user, default true jika tidak ada
            allowComments: allowComments !== undefined ? allowComments : true 
        });
        res.status(201).json(newBlog);
    } catch (e: any) { res.status(500).json({ error: e.message }); }
};

// --- 5. ADMIN EDIT & UPDATE ---
export const updateBlog = async (req: Request, res: Response) => {
    try {
        // Admin bisa edit judul, konten, dan juga setting komentar
        if(req.body.title) req.body.slug = slugify(req.body.title, { lower: true, strict: true }) + '-' + Date.now();
        
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(blog);
    } catch (e: any) { res.status(500).json({ error: e.message }); }
};

export const updateBlogStatus = async (req: AuthedRequest, res: Response) => {
    try {
        const { status } = req.body;
        // Approve = Publish otomatis
        const blog = await Blog.findByIdAndUpdate(req.params.id, { 
            status, 
            isPublished: status === 'approved' 
        }, { new: true });
        
        // Notif
        if (blog && status === 'approved' && blog.author.toString() !== req.user!.id) {
             try {
                 await Notification.create({
                     recipient: blog.author, sender: req.user!.id, type: 'blog', topic: blog._id,
                     message: `Cerita Anda "${blog.title}" telah TERBIT!`, isRead: false
                 });
             } catch(e) {}
        }
        res.json(blog);
    } catch (e: any) { res.status(500).json({ error: e.message }); }
};

export const toggleBlogComments = async (req: AuthedRequest, res: Response) => {
    try { 
        const blog = await Blog.findById(req.params.id); 
        if(blog){ 
            blog.allowComments = !blog.allowComments; 
            await blog.save(); 
            res.json({ success: true, allowComments: blog.allowComments }); 
        } else {
            res.status(404).json({error: "Blog not found"});
        }
    } catch (e: any) { res.status(500).json({ error: e.message }); }
};

export const deleteBlog = async (req: Request, res: Response) => {
    try { 
        await Blog.findByIdAndDelete(req.params.id); 
        await Comment.deleteMany({ blogId: req.params.id }); 
        res.json({ message: 'Deleted' }); 
    } catch (e: any) { res.status(500).json({ error: e.message }); }
};

// --- 6. COMMENTS ---
export const getBlogComments = async (req: Request, res: Response) => {
    try {
        const { blogId } = req.params;
        const page = parseInt(req.query.page as string) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;

        const totalComments = await Comment.countDocuments({ blogId, parent: null });
        
        if (totalComments > 0) {
            const comments = await Comment.find({ blogId, parent: null })
                .sort({ createdAt: -1 }).skip(skip).limit(limit)
                .populate('author', 'name avatarUrl role').lean();
            
            const replies = await Comment.find({ blogId, parent: { $ne: null } })
                .sort({ createdAt: 1 }).populate('author', 'name avatarUrl role').lean();

            const mapUser = (items: any[]) => items.map(c => ({ ...c, user: c.author }));
            
            return res.json({ 
                comments: mapUser(comments), 
                replies: mapUser(replies), 
                pagination: { currentPage: page, totalPages: Math.ceil(totalComments/limit), totalComments } 
            });
        }

        // Fallback Legacy
        const blog = await Blog.findById(blogId).populate('comments.author', 'name avatarUrl role').lean();
        const legacyComments = (blog as any)?.comments || [];
        legacyComments.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        const mappedLegacy = legacyComments.slice(skip, skip + limit).map((c: any) => ({
            _id: c._id, content: c.content, createdAt: c.createdAt, user: c.author, parent: null
        }));

        res.json({ comments: mappedLegacy, replies: [], pagination: { currentPage: page, totalPages: Math.ceil(legacyComments.length/limit) || 1, totalComments: legacyComments.length } });

    } catch (e: any) { res.status(500).json({ error: e.message }); }
};

export const addBlogComment = async (req: AuthedRequest, res: Response) => {
    try {
        const { blogId } = req.params;
        const { content, parentId } = req.body;
        const userId = getUserId(req);

        if (!content) return res.status(400).json({ error: "Kosong" });

        const newComment = new Comment({ 
            author: userId, blogId, content, parent: parentId || null 
        });
        await newComment.save();
        await newComment.populate('author', 'name avatarUrl role');

        await Blog.findByIdAndUpdate(blogId, { 
            $push: { comments: { author: userId, content, createdAt: new Date() } } 
        });

        // Notif logic (simplified)
        try {
            const blog = await Blog.findById(blogId);
            if(blog && blog.author.toString() !== userId && !parentId) {
                await Notification.create({ recipient: blog.author, sender: userId, type: 'blog', topic: blogId, message: 'mengomentari cerita Anda', isRead: false });
            }
        } catch(e) {}

        const resData = newComment.toObject();
        (resData as any).user = resData.author;
        res.status(201).json(resData);
    } catch (e: any) { res.status(500).json({ error: e.message }); }
};

export const deleteBlogComment = async (req: AuthedRequest, res: Response) => {
    try {
        const { commentId } = req.params;
        await Comment.deleteMany({ $or: [{ _id: commentId }, { parent: commentId }] });
        res.json({ message: "Komentar dihapus" });
    } catch (e: any) { res.status(500).json({ error: e.message }); }
};

// Alias Exports
export const updateBlogContent = updateBlog;
export const importPmiBlogs = async (req: AuthedRequest, res: Response) => { res.json({ message: 'Import ready' }); }; 
export const importBlogsFromPMI = importPmiBlogs;
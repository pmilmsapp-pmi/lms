// // // // // import { Request, Response } from 'express';
// // // // // import { Forum } from '../models/Forum';

// // // // // // 1. BUAT TOPIK (Create)
// // // // // export const createTopic = async (req: any, res: Response) => {
// // // // //   try {
// // // // //     const { title, content, category } = req.body;
// // // // //     const userRole = req.user.role;

// // // // //     // LOGIKA UTAMA:
// // // // //     // Jika Facilitator/Admin -> Langsung Approved
// // // // //     // Jika Student -> Pending
// // // // //     const initialStatus = (userRole === 'FACILITATOR' || userRole === 'SUPER_ADMIN') 
// // // // //                           ? 'approved' 
// // // // //                           : 'pending';

// // // // //     const topic = await Forum.create({
// // // // //       title,
// // // // //       content,
// // // // //       category,
// // // // //       creator: req.user.id,
// // // // //       status: initialStatus
// // // // //     });

// // // // //     res.status(201).json({ message: 'Topik dibuat', topic });
// // // // //   } catch (error: any) {
// // // // //     res.status(500).json({ error: error.message });
// // // // //   }
// // // // // };

// // // // // // 2. AMBIL TOPIK (Get All)
// // // // // export const getTopics = async (req: any, res: Response) => {
// // // // //   try {
// // // // //     const { status, category } = req.query;
// // // // //     const filter: any = {};

// // // // //     // Filter status (default: approved)
// // // // //     if (status) {
// // // // //         filter.status = status;
// // // // //     } else {
// // // // //         // Jika user biasa hanya lihat approved, Admin bisa request pending via query
// // // // //         filter.status = 'approved'; 
// // // // //     }

// // // // //     if (category && category !== 'Semua') {
// // // // //         filter.category = category;
// // // // //     }

// // // // //     const topics = await Forum.find(filter)
// // // // //       .populate('creator', 'name role avatarUrl')
// // // // //       .sort({ createdAt: -1 });

// // // // //     res.json({ topics });
// // // // //   } catch (error: any) {
// // // // //     res.status(500).json({ error: error.message });
// // // // //   }
// // // // // };

// // // // // // 3. APPROVE / REJECT TOPIK (Admin Only)
// // // // // export const updateTopicStatus = async (req: any, res: Response) => {
// // // // //   try {
// // // // //     const { id } = req.params;
// // // // //     const { status } = req.body; // 'approved' or 'rejected'

// // // // //     const topic = await Forum.findByIdAndUpdate(id, { status }, { new: true });
// // // // //     res.json({ message: `Topik berhasil di-${status}`, topic });
// // // // //   } catch (error: any) {
// // // // //     res.status(500).json({ error: error.message });
// // // // //   }
// // // // // };

// // // // // // 4. HITUNG PENDING (Untuk Notifikasi)
// // // // // export const getPendingCount = async (req: any, res: Response) => {
// // // // //   try {
// // // // //     const count = await Forum.countDocuments({ status: 'pending' });
// // // // //     res.json({ count });
// // // // //   } catch (error: any) {
// // // // //     res.status(500).json({ error: error.message });
// // // // //   }
// // // // // };

// // // // import { Request, Response } from 'express';
// // // // import { Forum } from '../models/Forum'; // Pastikan Anda punya model Forum
// // // // import { Comment } from '../models/Comment'; // Import model Comment yang baru diupdate
// // // // import { User } from '../models/User';

// // // // // --- CREATE FORUM (Untuk membuat topik baru) ---
// // // // export const createForum = async (req: Request, res: Response) => {
// // // //   try {
// // // //     const { title, content, category } = req.body;
// // // //     const userId = (req as any).user._id;

// // // //     if (!title || !content) {
// // // //       return res.status(400).json({ error: 'Judul dan konten wajib diisi' });
// // // //     }

// // // //     const newForum = new Forum({
// // // //       title,
// // // //       content,
// // // //       category: category || 'General',
// // // //       author: userId,
// // // //     });

// // // //     await newForum.save();
// // // //     res.status(201).json(newForum);
// // // //   } catch (error) {
// // // //     res.status(500).json({ error: 'Gagal membuat forum' });
// // // //   }
// // // // };

// // // // // --- GET ALL FORUMS (List Diskusi) ---
// // // // export const getForums = async (req: Request, res: Response) => {
// // // //   try {
// // // //     const forums = await Forum.find()
// // // //       .populate('author', 'name avatarUrl')
// // // //       .sort({ createdAt: -1 }); // Terbaru diatas
// // // //     res.status(200).json(forums);
// // // //   } catch (error) {
// // // //     res.status(500).json({ error: 'Gagal memuat daftar forum' });
// // // //   }
// // // // };

// // // // // --- GET SINGLE FORUM DETAIL ---
// // // // export const getForumById = async (req: Request, res: Response) => {
// // // //   try {
// // // //     const { id } = req.params;
// // // //     const forum = await Forum.findById(id).populate('author', 'name avatarUrl role');
    
// // // //     if (!forum) {
// // // //       return res.status(404).json({ error: 'Forum tidak ditemukan' });
// // // //     }
    
// // // //     res.status(200).json(forum);
// // // //   } catch (error) {
// // // //     res.status(500).json({ error: 'Terjadi kesalahan server' });
// // // //   }
// // // // };

// // // // // --- [INTI] GET COMMENTS (SUPPORT PAGINATION & NESTED) ---
// // // // export const getComments = async (req: Request, res: Response) => {
// // // //   try {
// // // //     const { forumId } = req.params;
    
// // // //     // Logika Pagination
// // // //     const page = parseInt(req.query.page as string) || 1;
// // // //     const limit = 5; // Batasi 5 komentar induk per halaman agar tidak scrolling terlalu jauh
// // // //     const skip = (page - 1) * limit;

// // // //     // 1. Hitung Total Komentar INDUK (Parent Only)
// // // //     // Kita hanya mem-paginate komentar utama, balasan (reply) akan dimuat sekaligus agar struktur obrolan nyambung
// // // //     const totalParentComments = await Comment.countDocuments({ forumId, parent: null });
// // // //     const totalPages = Math.ceil(totalParentComments / limit);

// // // //     // 2. Ambil Komentar INDUK untuk halaman ini
// // // //     const parentComments = await Comment.find({ forumId, parent: null })
// // // //       .sort({ createdAt: -1 }) // Terbaru di atas
// // // //       .skip(skip)
// // // //       .limit(limit)
// // // //       .populate('author', 'name avatarUrl role')
// // // //       .lean();

// // // //     // 3. Ambil SEMUA Balasan (Replies) untuk forum ini
// // // //     // Kita ambil semua reply agar frontend bisa mencocokkan ID parent-nya dengan mudah
// // // //     const replies = await Comment.find({ forumId, parent: { $ne: null } })
// // // //       .sort({ createdAt: 1 }) // Balasan urut dari lama ke baru (kronologis)
// // // //       .populate('author', 'name avatarUrl role')
// // // //       .lean();

// // // //     // Mapping agar frontend menerima field 'user' (sesuai komponen frontend yang sudah ada)
// // // //     // Jika frontend pakai 'author', mapping ini bisa dihapus, tapi untuk aman kita samakan.
// // // //     const mapUserField = (items: any[]) => items.map(c => ({
// // // //         ...c,
// // // //         user: c.author // Alias author ke user
// // // //     }));

// // // //     res.status(200).json({
// // // //       comments: mapUserField(parentComments),
// // // //       replies: mapUserField(replies),
// // // //       pagination: {
// // // //         currentPage: page,
// // // //         totalPages,
// // // //         totalComments: totalParentComments,
// // // //         hasNextPage: page < totalPages,
// // // //         hasPrevPage: page > 1
// // // //       }
// // // //     });

// // // //   } catch (error) {
// // // //     console.error("Error fetching comments:", error);
// // // //     res.status(500).json({ error: 'Gagal memuat komentar' });
// // // //   }
// // // // };

// // // // // --- [INTI] ADD COMMENT (SUPPORT REPLY) ---
// // // // export const addComment = async (req: Request, res: Response) => {
// // // //   try {
// // // //     const { forumId } = req.params;
// // // //     // Ambil content dan parentId (jika ini adalah reply)
// // // //     const { content, parentId } = req.body; 
// // // //     const userId = (req as any).user._id;

// // // //     if (!content) return res.status(400).json({ error: "Komentar tidak boleh kosong" });

// // // //     const newComment = new Comment({
// // // //       author: userId,
// // // //       forumId,
// // // //       content,
// // // //       // Jika parentId dikirim, simpan sebagai referensi reply. Jika tidak, null.
// // // //       parent: parentId || null 
// // // //     });

// // // //     await newComment.save();
    
// // // //     // Populate data author agar frontend bisa langsung menampilkan tanpa refresh
// // // //     await newComment.populate('author', 'name avatarUrl role');

// // // //     // Return format yang konsisten (aliasing author -> user untuk frontend)
// // // //     const responseData = newComment.toObject();
// // // //     (responseData as any).user = responseData.author;

// // // //     res.status(201).json(responseData);
// // // //   } catch (error) {
// // // //     console.error("Error adding comment:", error);
// // // //     res.status(500).json({ error: 'Gagal mengirim komentar' });
// // // //   }
// // // // };

// // // // // --- DELETE COMMENT ---
// // // // export const deleteComment = async (req: Request, res: Response) => {
// // // //     try {
// // // //         const { commentId } = req.params;
// // // //         const userId = (req as any).user._id;
// // // //         const userRole = (req as any).user.role;

// // // //         const comment = await Comment.findById(commentId);
// // // //         if (!comment) return res.status(404).json({ error: "Komentar tidak ditemukan" });

// // // //         // Cek hak akses (hanya pemilik atau admin)
// // // //         if (comment.author.toString() !== userId && userRole !== 'SUPER_ADMIN') {
// // // //             return res.status(403).json({ error: "Tidak ada izin menghapus" });
// // // //         }

// // // //         // Hapus komentar ini DAN semua balasannya (Cascade delete logic sederhana)
// // // //         await Comment.deleteMany({ $or: [{ _id: commentId }, { parent: commentId }] });

// // // //         res.json({ message: "Komentar dihapus" });
// // // //     } catch (error) {
// // // //         res.status(500).json({ error: "Gagal menghapus komentar" });
// // // //     }
// // // // };

// // // import { Request, Response } from 'express';
// // // import { Forum } from '../models/Forum';
// // // import { Comment } from '../models/Comment';
// // // import { Notification } from '../models/Notification';

// // // // --- CREATE FORUM ---
// // // export const createForum = async (req: Request, res: Response) => {
// // //   try {
// // //     const { title, content, category } = req.body;
// // //     const userId = (req as any).user._id;

// // //     const newForum = new Forum({
// // //       title, content, category: category || 'General', author: userId,
// // //     });

// // //     await newForum.save();
// // //     await newForum.populate('author', 'name avatarUrl role'); 
// // //     res.status(201).json(newForum);
// // //   } catch (error) { res.status(500).json({ error: 'Gagal membuat forum' }); }
// // // };

// // // // --- GET ALL FORUMS ---
// // // export const getForums = async (req: Request, res: Response) => {
// // //   try {
// // //     const forums = await Forum.find()
// // //       .populate('author', 'name avatarUrl role')
// // //       .sort({ createdAt: -1 });
// // //     res.status(200).json(forums);
// // //   } catch (error) { res.status(500).json({ error: 'Gagal memuat forum' }); }
// // // };

// // // // --- GET SINGLE FORUM ---
// // // export const getForumById = async (req: Request, res: Response) => {
// // //   try {
// // //     const { id } = req.params;
// // //     const forum = await Forum.findById(id).populate('author', 'name avatarUrl role');
// // //     if (!forum) return res.status(404).json({ error: 'Forum tidak ditemukan' });
// // //     res.status(200).json(forum);
// // //   } catch (error) { res.status(500).json({ error: 'Error server' }); }
// // // };

// // // // --- GET COMMENTS (FIXED TS ERROR) ---
// // // export const getComments = async (req: Request, res: Response) => {
// // //   try {
// // //     const { forumId } = req.params;
// // //     const page = parseInt(req.query.page as string) || 1;
// // //     const limit = 5;
// // //     const skip = (page - 1) * limit;

// // //     // 1. Coba ambil dari Collection Comment (Model Baru)
// // //     const totalNewComments = await Comment.countDocuments({ forumId, parent: null });
    
// // //     // [FIX] Tambahkan tipe eksplisit 'any[]' agar TS tidak bingung
// // //     let comments: any[] = [];
// // //     let replies: any[] = [];
// // //     let totalComments = 0;

// // //     // Jika ada data di model baru, gunakan itu
// // //     if (totalNewComments > 0) {
// // //         comments = await Comment.find({ forumId, parent: null })
// // //             .sort({ createdAt: -1 })
// // //             .skip(skip).limit(limit)
// // //             .populate('author', 'name avatarUrl role') 
// // //             .lean();
            
// // //         replies = await Comment.find({ forumId, parent: { $ne: null } })
// // //             .sort({ createdAt: 1 })
// // //             .populate('author', 'name avatarUrl role')
// // //             .lean();
            
// // //         totalComments = totalNewComments;
// // //     } 
// // //     // [FALLBACK] Jika kosong, coba ambil dari Model Forum lama (field replies)
// // //     else {
// // //         const forum = await Forum.findById(forumId).populate('replies.user', 'name avatarUrl role').lean();
// // //         if (forum && forum.replies && forum.replies.length > 0) {
// // //             const allOldComments = forum.replies.map((r: any) => ({
// // //                 _id: r._id,
// // //                 content: r.content,
// // //                 createdAt: r.createdAt,
// // //                 author: r.user,
// // //                 parent: null
// // //             }));
            
// // //             allOldComments.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
// // //             comments = allOldComments.slice(skip, skip + limit);
// // //             totalComments = allOldComments.length;
// // //         }
// // //     }

// // //     const mapUserField = (items: any[]) => items.map(i => ({
// // //         ...i,
// // //         user: i.author || i.user 
// // //     }));

// // //     res.status(200).json({
// // //       comments: mapUserField(comments),
// // //       replies: mapUserField(replies),
// // //       pagination: {
// // //         currentPage: page,
// // //         totalPages: Math.ceil(totalComments / limit) || 1,
// // //         totalComments: totalComments
// // //       }
// // //     });

// // //   } catch (error) {
// // //     console.error("Error get comments:", error);
// // //     res.status(500).json({ error: 'Gagal memuat komentar' });
// // //   }
// // // };

// // // // --- ADD COMMENT ---
// // // export const addComment = async (req: Request, res: Response) => {
// // //   try {
// // //     const { forumId } = req.params;
// // //     const { content, parentId } = req.body;
// // //     const userId = (req as any).user._id;

// // //     if (!content) return res.status(400).json({ error: "Komentar kosong" });

// // //     // Simpan ke Collection Comment (Model Baru)
// // //     const newComment = new Comment({
// // //       author: userId,
// // //       forumId,
// // //       content,
// // //       parent: parentId || null
// // //     });

// // //     await newComment.save();
    
// // //     // Backup ke Model Forum lama
// // //     await Forum.findByIdAndUpdate(forumId, {
// // //         $push: { replies: { user: userId, content, createdAt: new Date() } }
// // //     });

// // //     await newComment.populate('author', 'name avatarUrl role');

// // //     // Notifikasi
// // //     try {
// // //         const forum = await Forum.findById(forumId);
// // //         if (parentId) {
// // //             const parent = await Comment.findById(parentId);
// // //             if (parent && parent.author.toString() !== userId) {
// // //                 await Notification.create({
// // //                     recipient: parent.author, sender: userId, type: 'reply', topic: forumId,
// // //                     message: `membalas komentar Anda di "${forum?.title}"`, isRead: false
// // //                 });
// // //             }
// // //         } else if (forum && forum.author.toString() !== userId) {
// // //              await Notification.create({
// // //                 recipient: forum.author, sender: userId, type: 'mention', topic: forumId,
// // //                 message: `mengomentari diskusi "${forum.title}"`, isRead: false
// // //              });
// // //         }
// // //     } catch (e) { console.error("Notif error", e); }

// // //     const responseData = newComment.toObject();
// // //     (responseData as any).user = responseData.author;

// // //     res.status(201).json(responseData);
// // //   } catch (error) {
// // //     console.error("Add comment error:", error);
// // //     res.status(500).json({ error: 'Gagal komentar' });
// // //   }
// // // };

// // // // --- DELETE COMMENT ---
// // // export const deleteComment = async (req: Request, res: Response) => {
// // //     try {
// // //         const { commentId } = req.params;
// // //         await Comment.deleteMany({ $or: [{ _id: commentId }, { parent: commentId }] });
// // //         res.json({ message: "Terhapus" });
// // //     } catch (e) { res.status(500).json({ error: "Gagal hapus" }); }
// // // };
// // import { Request, Response } from 'express';
// // import { Forum } from '../models/Forum';
// // import { Comment } from '../models/Comment';
// // import { Notification } from '../models/Notification';

// // // Helper untuk mengambil User ID dengan aman
// // const getUserId = (req: any) => {
// //     return req.user?.id || req.user?._id;
// // };

// // // --- CREATE FORUM ---
// // export const createForum = async (req: Request, res: Response) => {
// //   try {
// //     const { title, content, category } = req.body;
// //     const userId = getUserId(req); // [FIX] Gunakan helper aman

// //     if (!userId) return res.status(401).json({ error: "Unauthorized: User ID missing" });

// //     const newForum = new Forum({
// //       title, content, category: category || 'General', author: userId,
// //     });

// //     await newForum.save();
// //     await newForum.populate('author', 'name avatarUrl role');
// //     res.status(201).json(newForum);
// //   } catch (error) { 
// //       console.error("Create forum error:", error);
// //       res.status(500).json({ error: 'Gagal membuat forum' }); 
// //   }
// // };

// // // --- GET ALL FORUMS ---
// // export const getForums = async (req: Request, res: Response) => {
// //   try {
// //     const forums = await Forum.find()
// //       .populate('author', 'name avatarUrl role') // Pastikan ini ada agar tidak Anonim
// //       .sort({ createdAt: -1 });
// //     res.status(200).json(forums);
// //   } catch (error) { res.status(500).json({ error: 'Gagal memuat forum' }); }
// // };

// // // --- GET SINGLE FORUM ---
// // export const getForumById = async (req: Request, res: Response) => {
// //   try {
// //     const { id } = req.params;
// //     const forum = await Forum.findById(id).populate('author', 'name avatarUrl role');
// //     if (!forum) return res.status(404).json({ error: 'Forum tidak ditemukan' });
// //     res.status(200).json(forum);
// //   } catch (error) { res.status(500).json({ error: 'Error server' }); }
// // };

// // // --- GET COMMENTS ---
// // export const getComments = async (req: Request, res: Response) => {
// //   try {
// //     const { forumId } = req.params;
// //     const page = parseInt(req.query.page as string) || 1;
// //     const limit = 5;
// //     const skip = (page - 1) * limit;

// //     const totalNewComments = await Comment.countDocuments({ forumId, parent: null });
    
// //     let comments: any[] = [];
// //     let replies: any[] = [];
// //     let totalComments = 0;

// //     if (totalNewComments > 0) {
// //         comments = await Comment.find({ forumId, parent: null })
// //             .sort({ createdAt: -1 })
// //             .skip(skip).limit(limit)
// //             .populate('author', 'name avatarUrl role')
// //             .lean();
            
// //         replies = await Comment.find({ forumId, parent: { $ne: null } })
// //             .sort({ createdAt: 1 })
// //             .populate('author', 'name avatarUrl role')
// //             .lean();
            
// //         totalComments = totalNewComments;
// //     } else {
// //         // Fallback ke data lama (replies di Forum)
// //         const forum = await Forum.findById(forumId).populate('replies.user', 'name avatarUrl role').lean();
// //         if (forum && forum.replies && forum.replies.length > 0) {
// //             const allOldComments = forum.replies.map((r: any) => ({
// //                 _id: r._id,
// //                 content: r.content,
// //                 createdAt: r.createdAt,
// //                 author: r.user, 
// //                 parent: null
// //             }));
            
// //             allOldComments.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
// //             comments = allOldComments.slice(skip, skip + limit);
// //             totalComments = allOldComments.length;
// //         }
// //     }

// //     const mapUserField = (items: any[]) => items.map(i => ({ ...i, user: i.author || i.user }));

// //     res.status(200).json({
// //       comments: mapUserField(comments),
// //       replies: mapUserField(replies),
// //       pagination: {
// //         currentPage: page,
// //         totalPages: Math.ceil(totalComments / limit) || 1,
// //         totalComments: totalComments
// //       }
// //     });

// //   } catch (error) { res.status(500).json({ error: 'Gagal memuat komentar' }); }
// // };

// // // --- [FIX] ADD COMMENT ---
// // export const addComment = async (req: Request, res: Response) => {
// //   try {
// //     const { forumId } = req.params;
// //     const { content, parentId } = req.body;
// //     const userId = getUserId(req); // [FIX] Gunakan helper aman

// //     if (!userId) return res.status(401).json({ error: "Sesi kadaluarsa, silakan login ulang." });
// //     if (!content) return res.status(400).json({ error: "Komentar kosong" });

// //     // Validasi Parent ID
// //     const validParentId = (parentId && typeof parentId === 'string' && parentId.length === 24) ? parentId : null;

// //     const newComment = new Comment({
// //       author: userId,
// //       forumId,
// //       content,
// //       parent: validParentId
// //     });

// //     await newComment.save();
    
// //     // Backup ke Model Forum (Legacy)
// //     await Forum.findByIdAndUpdate(forumId, {
// //         $push: { replies: { user: userId, content, createdAt: new Date() } }
// //     });

// //     await newComment.populate('author', 'name avatarUrl role');

// //     // Notifikasi
// //     try {
// //         const forum = await Forum.findById(forumId);
// //         if (validParentId) {
// //             const parent = await Comment.findById(validParentId);
// //             if (parent && parent.author.toString() !== userId) {
// //                 await Notification.create({
// //                     recipient: parent.author, sender: userId, type: 'reply', topic: forumId,
// //                     message: `membalas komentar Anda di "${forum?.title}"`, isRead: false
// //                 });
// //             }
// //         } else if (forum && forum.author.toString() !== userId) {
// //              await Notification.create({
// //                 recipient: forum.author, sender: userId, type: 'mention', topic: forumId,
// //                 message: `mengomentari diskusi "${forum.title}"`, isRead: false
// //              });
// //         }
// //     } catch (e) { console.error("Notif Error", e); }

// //     const responseData = newComment.toObject();
// //     (responseData as any).user = responseData.author;

// //     res.status(201).json(responseData);
// //   } catch (error: any) {
// //     console.error("Add Comment Error:", error); // Cek terminal untuk error detail
// //     res.status(500).json({ error: 'Gagal kirim komentar: ' + error.message });
// //   }
// // };

// // // --- DELETE COMMENT ---
// // export const deleteComment = async (req: Request, res: Response) => {
// //     try {
// //         const { commentId } = req.params;
// //         await Comment.deleteMany({ $or: [{ _id: commentId }, { parent: commentId }] });
// //         res.json({ message: "Terhapus" });
// //     } catch (e) { res.status(500).json({ error: "Gagal hapus" }); }
// // };

// import { Request, Response } from 'express';
// import { Forum } from '../models/Forum';
// import { Comment } from '../models/Comment';
// import { User } from '../models/User';
// import { Notification } from '../models/Notification';
// import { AuthedRequest } from '../middleware/auth';
// import mongoose from 'mongoose';

// // --- 1. GET ALL FORUMS ---
// export const getForums = async (req: Request, res: Response) => {
//     try {
//         const { search, category, status } = req.query;
//         const query: any = {};

//         if (search) query.title = { $regex: search, $options: 'i' };
//         if (category && category !== 'Semua') query.category = category;
//         // Jika status ada, filter. Jika tidak, ambil yang disetujui (kecuali admin)
//         if (status) query.status = status; 
//         else query.status = 'approved'; 

//         const forums = await Forum.find(query)
//             .populate('author', 'name avatarUrl role')
//             .sort({ isPinned: -1, createdAt: -1 }); // Pinned duluan

//         // Hitung balasan
//         const forumsWithStats = await Promise.all(forums.map(async (f) => {
//             const repliesCount = await Comment.countDocuments({ forumId: f._id });
//             return { ...f.toObject(), repliesCount };
//         }));

//         res.json(forumsWithStats);
//     } catch (e: any) { res.status(500).json({ error: e.message }); }
// };

// // --- 2. GET DETAIL ---
// export const getForumById = async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;
        
//         // [CRITICAL FIX] Cegah string "create" atau "stats" dianggap sebagai ID
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(404).json({ error: "Diskusi tidak ditemukan (Invalid ID)" });
//         }

//         const forum = await Forum.findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true })
//             .populate('author', 'name avatarUrl role');

//         if (!forum) return res.status(404).json({ error: "Diskusi tidak ditemukan" });

//         res.json(forum);
//     } catch (e: any) { res.status(500).json({ error: e.message }); }
// };

// // --- 3. CREATE FORUM (PENGAJUAN TOPIK) ---
// export const createForum = async (req: AuthedRequest, res: Response) => {
//     try {
//         const { title, content, category } = req.body;
//         const userId = req.user?._id;

//         if (!title || !content) return res.status(400).json({ error: "Judul dan konten wajib diisi" });

//         // User biasa -> Pending, Admin -> Approved
//         const isAdmin = ['SUPER_ADMIN', 'FACILITATOR'].includes(req.user!.role.toUpperCase());
//         const status = isAdmin ? 'approved' : 'pending';

//         const newForum = await Forum.create({
//             title,
//             content,
//             category: category || 'Diskusi Umum',
//             author: userId,
//             status,
//             views: 0,
//             isPinned: false
//         });

//         // Notif ke Admin jika user biasa yang buat
//         if (!isAdmin) {
//             const admins = await User.find({ role: { $in: ['SUPER_ADMIN', 'FACILITATOR'] } });
//             for (const admin of admins) {
//                 await Notification.create({
//                     recipient: admin._id,
//                     sender: userId,
//                     type: 'approval',
//                     topic: newForum._id,
//                     message: `Pengajuan Topik Baru: "${title}"`,
//                     isRead: false
//                 });
//             }
//         }

//         res.status(201).json(newForum);
//     } catch (e: any) { res.status(500).json({ error: e.message }); }
// };

// // --- 4. ADMIN ACTIONS (Approve, Delete, Pin) ---
// export const updateForumStatus = async (req: Request, res: Response) => {
//     try {
//         const { status } = req.body; // 'approved' | 'rejected'
//         const forum = await Forum.findByIdAndUpdate(req.params.id, { status }, { new: true });
//         res.json(forum);
//     } catch (e: any) { res.status(500).json({ error: e.message }); }
// };

// export const deleteForum = async (req: Request, res: Response) => {
//     try {
//         await Forum.findByIdAndDelete(req.params.id);
//         await Comment.deleteMany({ forumId: req.params.id }); // Hapus komentar terkait
//         res.json({ message: 'Deleted' });
//     } catch (e: any) { res.status(500).json({ error: e.message }); }
// };

// export const togglePinForum = async (req: Request, res: Response) => {
//     try {
//         const forum = await Forum.findById(req.params.id);
//         if(forum) {
//             forum.isPinned = !forum.isPinned;
//             await forum.save();
//             res.json(forum);
//         } else {
//             res.status(404).json({error:"Not found"});
//         }
//     } catch (e: any) { res.status(500).json({ error: e.message }); }
// };

// // --- 5. KOMENTAR FORUM ---
// export const getForumComments = async (req: Request, res: Response) => {
//     try {
//         const comments = await Comment.find({ forumId: req.params.id })
//             .populate('author', 'name avatarUrl role')
//             .sort({ createdAt: 1 });
//         res.json(comments);
//     } catch (e: any) { res.status(500).json({ error: e.message }); }
// };

// export const addForumComment = async (req: AuthedRequest, res: Response) => {
//     try {
//         const { content } = req.body;
//         const comment = await Comment.create({
//             forumId: req.params.id,
//             author: req.user?._id,
//             content
//         });
//         await comment.populate('author', 'name avatarUrl role');
        
//         // Notif ke pembuat topik (jika bukan dia sendiri)
//         const forum = await Forum.findById(req.params.id);
//         if(forum && forum.author.toString() !== req.user?._id.toString()) {
//              await Notification.create({
//                 recipient: forum.author,
//                 sender: req.user?._id,
//                 type: 'reply',
//                 topic: forum._id,
//                 message: `membalas topik Anda: "${forum.title}"`,
//                 isRead: false
//             });
//         }

//         res.status(201).json(comment);
//     } catch (e: any) { res.status(500).json({ error: e.message }); }
// };
import { Request, Response } from 'express';
import { Forum } from '../models/Forum';
import { Comment } from '../models/Comment';
import { User } from '../models/User';
import { Notification } from '../models/Notification';
import { AuthedRequest } from '../middleware/auth';
import mongoose from 'mongoose';

// [HELPER] Ambil User ID dengan aman
const getUserId = (req: any) => {
    if (!req.user) return null;
    return req.user._id || req.user.id;
};

// --- 1. GET ALL FORUMS ---
export const getForums = async (req: Request, res: Response) => {
    try {
        const { search, category, status } = req.query;
        const query: any = {};

        if (search) query.title = { $regex: search, $options: 'i' };
        if (category && category !== 'Semua') query.category = category;
        
        // Filter status (Default: approved, kecuali Admin minta pending)
        if (status) query.status = status; 
        else query.status = 'approved'; 

        const forums = await Forum.find(query)
            .populate('author', 'name avatarUrl role')
            .sort({ isPinned: -1, createdAt: -1 });

        // Hitung jumlah balasan
        const forumsWithStats = await Promise.all(forums.map(async (f) => {
            const repliesCount = await Comment.countDocuments({ forumId: f._id });
            return { ...f.toObject(), repliesCount };
        }));

        res.json(forumsWithStats);
    } catch (e: any) { res.status(500).json({ error: e.message }); }
};

// --- 2. GET DETAIL ---
export const getForumById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        // Validasi ID agar tidak error jika URL aneh masuk (misal: /forum/create masuk sini)
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "Diskusi tidak ditemukan (Invalid ID)" });
        }

        const forum = await Forum.findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true })
            .populate('author', 'name avatarUrl role');

        if (!forum) return res.status(404).json({ error: "Diskusi tidak ditemukan" });

        res.json(forum);
    } catch (e: any) { res.status(500).json({ error: e.message }); }
};

// --- 3. CREATE FORUM (FIXED) ---
export const createForum = async (req: AuthedRequest, res: Response) => {
    try {
        const { title, content, category } = req.body;
        
        // [FIX] Gunakan helper untuk memastikan ID terambil
        const userId = getUserId(req);

        // Cek Login
        if (!userId) return res.status(401).json({ error: "Unauthorized: Mohon login ulang." });
        
        // Cek Input
        if (!title || !content) return res.status(400).json({ error: "Judul dan konten wajib diisi" });

        // Cek Role untuk Status
        const userRole = req.user?.role ? req.user.role.toUpperCase() : 'USER';
        const isAdmin = ['SUPER_ADMIN', 'FACILITATOR'].includes(userRole);
        const status = isAdmin ? 'approved' : 'pending';

        const newForum = await Forum.create({
            title,
            content,
            category: category || 'Diskusi Umum',
            author: userId, // Pastikan field ini terisi
            status,
            views: 0,
            isPinned: false
        });

        // Notif ke Admin jika user biasa yang buat
        if (!isAdmin) {
            try {
                const admins = await User.find({ role: { $in: ['SUPER_ADMIN', 'FACILITATOR'] } });
                const notifs = admins.map(admin => ({
                    recipient: admin._id,
                    sender: userId,
                    type: 'approval', // pastikan type ini di-handle di frontend
                    topic: newForum._id,
                    message: `Pengajuan Topik Baru: "${title}"`,
                    isRead: false
                }));
                if(notifs.length > 0) await Notification.insertMany(notifs);
            } catch (notifError) {
                console.error("Gagal kirim notif admin:", notifError);
            }
        }

        res.status(201).json(newForum);
    } catch (e: any) { 
        console.error("Create Forum Error:", e);
        res.status(500).json({ error: e.message }); 
    }
};

// --- 4. ADMIN ACTIONS ---
export const updateForumStatus = async (req: Request, res: Response) => {
    try {
        const { status } = req.body; // 'approved' | 'rejected'
        const forum = await Forum.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json(forum);
    } catch (e: any) { res.status(500).json({ error: e.message }); }
};

export const deleteForum = async (req: Request, res: Response) => {
    try {
        await Forum.findByIdAndDelete(req.params.id);
        await Comment.deleteMany({ forumId: req.params.id });
        res.json({ message: 'Deleted' });
    } catch (e: any) { res.status(500).json({ error: e.message }); }
};

export const togglePinForum = async (req: Request, res: Response) => {
    try {
        const forum = await Forum.findById(req.params.id);
        if(forum) {
            forum.isPinned = !forum.isPinned;
            await forum.save();
            res.json(forum);
        } else {
            res.status(404).json({error:"Not found"});
        }
    } catch (e: any) { res.status(500).json({ error: e.message }); }
};

// --- 5. KOMENTAR FORUM ---
export const getForumComments = async (req: Request, res: Response) => {
    try {
        const comments = await Comment.find({ forumId: req.params.id })
            .populate('author', 'name avatarUrl role')
            .sort({ createdAt: 1 });
        res.json(comments);
    } catch (e: any) { res.status(500).json({ error: e.message }); }
};

export const addForumComment = async (req: AuthedRequest, res: Response) => {
    try {
        const { content } = req.body;
        const userId = getUserId(req);
        
        if (!userId) return res.status(401).json({ error: "Unauthorized" });

        const comment = await Comment.create({
            forumId: req.params.id,
            author: userId,
            content
        });
        await comment.populate('author', 'name avatarUrl role');
        
        // Notif ke pembuat topik
        try {
            const forum = await Forum.findById(req.params.id);
            if(forum && forum.author.toString() !== userId) {
                 await Notification.create({
                    recipient: forum.author,
                    sender: userId,
                    type: 'reply',
                    topic: forum._id,
                    message: `membalas topik Anda: "${forum.title}"`,
                    isRead: false
                });
            }
        } catch (e) {}

        res.status(201).json(comment);
    } catch (e: any) { res.status(500).json({ error: e.message }); }
};
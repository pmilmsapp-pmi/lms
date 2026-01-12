
// // import express, { Response } from 'express';
// // import { Book } from '../models/Book'; // Import dari Book
// // import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth';

// // const router = express.Router();

// // // 1. GET ALL BOOKS (Public)
// // router.get('/', async (req, res) => {
// //   try {
// //     const { search, category } = req.query;
// //     const filter: any = {};
    
// //     // Filter by Category
// //     if (category && category !== 'Semua') {
// //         filter.category = category;
// //     }

// //     // Filter by Search (Title or Author)
// //     if (search) {
// //       filter.$or = [
// //         { title: { $regex: search, $options: 'i' } },
// //         { author: { $regex: search, $options: 'i' } }
// //       ];
// //     }

// //     const books = await Book.find(filter).sort({ createdAt: -1 });
    
// //     // Kirim langsung array books (agar frontend tidak perlu parsing .books lagi)
// //     res.json(books);
// //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // });

// // // 2. UPLOAD NEW BOOK (Admin/Facilitator Only)
// // router.post('/', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// //   try {
// //     // Ambil field baru (author, year)
// //     const { title, description, category, author, year, fileUrl, coverUrl } = req.body;
    
// //     const newBook = await Book.create({
// //       title,
// //       description,
// //       category,
// //       author, // Simpan author
// //       year,   // Simpan tahun
// //       fileUrl,
// //       coverUrl,
// //       uploadedBy: req.user!.id
// //     });

// //     res.status(201).json(newBook);
// //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // });

// // // 3. UPDATE BOOK (PATCH) - Tambahan Fitur Edit
// // router.patch('/:id', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// //     try {
// //       const updated = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
// //       res.json(updated);
// //     } catch (e: any) { res.status(500).json({ error: e.message }); }
// // });

// // // 4. DELETE BOOK
// // router.delete('/:id', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
// //   try {
// //     await Book.findByIdAndDelete(req.params.id);
// //     res.json({ message: 'Buku berhasil dihapus' });
// //   } catch (e: any) { res.status(500).json({ error: e.message }); }
// // });

// // export default router;
// import express, { Response } from 'express';
// import { Book } from '../models/Book'; 
// import { User } from '../models/User';
// import { Notification } from '../models/Notification';
// import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth';

// const router = express.Router();

// // 1. GET ALL BOOKS (Public & Admin)
// router.get('/', async (req, res) => {
//   try {
//     const { search, category, status } = req.query;
//     const filter: any = {};
    
//     // Filter by Status (Default: published only for public)
//     if (status) {
//         filter.status = status; 
//     } else {
//         // Jika tidak ada parameter status, tampilkan hanya yang published (untuk user biasa)
//         filter.status = 'published';
//     }

//     // Filter by Category
//     if (category && category !== 'Semua') {
//         filter.category = category;
//     }

//     // Filter by Search (Title or Author)
//     if (search) {
//       filter.$or = [
//         { title: { $regex: search, $options: 'i' } },
//         { author: { $regex: search, $options: 'i' } }
//       ];
//     }

//     const books = await Book.find(filter).sort({ createdAt: -1 });
//     res.json(books);
//   } catch (e: any) { res.status(500).json({ error: e.message }); }
// });

// // 2. UPLOAD NEW BOOK (Draft by default)
// router.post('/', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
//   try {
//     const { title, description, category, author, year, fileUrl, coverUrl } = req.body;
    
//     const newBook = await Book.create({
//       title,
//       description,
//       category,
//       author,
//       year,
//       fileUrl,
//       coverUrl,
//       status: 'draft', // Default status
//       uploadedBy: req.user!.id
//     });

//     res.status(201).json(newBook);
//   } catch (e: any) { res.status(500).json({ error: e.message }); }
// });

// // 3. PUBLISH & BLAST NOTIFICATION
// router.patch('/:id/publish', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
//     try {
//         const book = await Book.findById(req.params.id);
//         if (!book) return res.status(404).json({ error: 'Buku tidak ditemukan' });

//         // 1. Update Status
//         book.status = 'published';
//         await book.save();

//         // 2. BLASTING NOTIFIKASI KE SEMUA USER (Kecuali yang nge-upload)
//         const allUsers = await User.find({ _id: { $ne: req.user!.id } }).select('_id');
        
//         if (allUsers.length > 0) {
//             const notifications = allUsers.map(u => ({
//                 recipient: u._id,
//                 sender: req.user!.id,
//                 type: 'system', // Tipe notifikasi sistem
//                 topic: book._id, // Link ke ID buku (bisa diarahkan ke detail buku jika ada)
//                 message: `Buku Baru Rilis: "${book.title}". Cek Perpustakaan Digital sekarang!`,
//                 isRead: false,
//                 createdAt: new Date()
//             }));

//             // Insert massal
//             await Notification.insertMany(notifications);
//         }

//         res.json({ message: 'Buku dipublikasikan dan notifikasi dikirim ke semua user', book });
//     } catch (e: any) { res.status(500).json({ error: e.message }); }
// });

// // 4. UPDATE BOOK (PATCH)
// router.patch('/:id', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
//     try {
//       const updated = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
//       res.json(updated);
//     } catch (e: any) { res.status(500).json({ error: e.message }); }
// });

// // 5. DELETE BOOK
// router.delete('/:id', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
//   try {
//     await Book.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Buku berhasil dihapus' });
//   } catch (e: any) { res.status(500).json({ error: e.message }); }
// });

// export default router;
import express, { Response } from 'express';
import { Book } from '../models/Book'; 
import { User } from '../models/User';
import { Notification } from '../models/Notification';
import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth';

const router = express.Router();

// 1. GET ALL BOOKS (Public & Admin)
router.get('/', async (req, res) => {
  try {
    const { search, category, status } = req.query;
    const filter: any = {};
    
    // Filter by Status (Default: published only for public)
    if (status) {
        // Admin bisa kirim ?status=all atau ?status=draft
        if (status !== 'all') filter.status = status;
    } else {
        // Default publik hanya melihat published
        filter.status = 'published';
    }

    if (category && category !== 'Semua') {
        filter.category = category;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } }
      ];
    }

    const books = await Book.find(filter).sort({ createdAt: -1 });
    res.json(books);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

// 2. UPLOAD NEW BOOK (Draft by default)
router.post('/', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
  try {
    const { title, description, category, author, year, fileUrl, coverUrl } = req.body;
    
    const newBook = await Book.create({
      title,
      description,
      category,
      author,
      year,
      fileUrl,
      coverUrl,
      status: 'draft', // Default status
      uploadedBy: req.user!.id
    });

    res.status(201).json(newBook);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

// 3. PUBLISH & BLAST NOTIFICATION
router.patch('/:id/publish', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ error: 'Buku tidak ditemukan' });

        // Update Status
        book.status = 'published';
        await book.save();

        // BLASTING NOTIFIKASI
        const allUsers = await User.find({ _id: { $ne: req.user!.id } }).select('_id');
        
        if (allUsers.length > 0) {
            const notifications = allUsers.map(u => ({
                recipient: u._id,
                sender: req.user!.id,
                type: 'system',
                topic: book._id.toString(), // Konversi ke string agar aman
                message: `Buku Baru Rilis: "${book.title}". Cek Perpustakaan Digital sekarang!`,
                isRead: false,
                createdAt: new Date()
            }));

            await Notification.insertMany(notifications);
        }

        res.json({ message: 'Buku dipublikasikan', book });
    } catch (e: any) { res.status(500).json({ error: e.message }); }
});

// 4. UPDATE BOOK (PATCH)
router.patch('/:id', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
    try {
      const updated = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updated);
    } catch (e: any) { res.status(500).json({ error: e.message }); }
});

// 5. DELETE BOOK
router.delete('/:id', requireAuth, requireFacilitator, async (req: AuthedRequest, res: Response) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Buku berhasil dihapus' });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

export default router;
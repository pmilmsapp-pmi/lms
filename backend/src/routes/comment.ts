// import express from 'express';
// import Comment from '../models/Comment';
// import { auth } from '../middleware/auth';
// import { User } from '../models/User';

// const router = express.Router();

// // GET Comments by Blog ID
// router.get('/:blogId', async (req, res) => {
//   try {
//     const comments = await Comment.find({ blogId: req.params.blogId })
//       .populate('author', 'name avatarUrl role')
//       .sort({ createdAt: -1 }); // Terbaru diatas
//     res.json(comments);
//   } catch (e: any) {
//     res.status(500).json({ error: e.message });
//   }
// });

// // POST Comment
// router.post('/', auth, async (req: any, res) => {
//   try {
//     const { content, blogId, parentId } = req.body;
//     const newComment = await Comment.create({
//       content,
//       blogId,
//       parentId: parentId || null,
//       author: req.user.userId
//     });
    
//     // Populate author agar langsung tampil di frontend setelah submit
//     await newComment.populate('author', 'name avatarUrl role');
    
//     res.json(newComment);
//   } catch (e: any) {
//     res.status(500).json({ error: e.message });
//   }
// });

// // DELETE Comment (Hanya Pembuat, Admin, atau Fasilitator)
// router.delete('/:id', auth, async (req: any, res) => {
//   try {
//     const comment = await Comment.findById(req.params.id);
//     if (!comment) return res.status(404).json({ error: 'Komentar tidak ditemukan' });

//     const user = await User.findById(req.user.userId);
//     const isAdminOrFacil = user && ['SUPER_ADMIN', 'FACILITATOR', 'ADMIN'].includes(user.role);
//     const isOwner = comment.author.toString() === req.user.userId;

//     if (!isOwner && !isAdminOrFacil) {
//         return res.status(403).json({ error: 'Tidak ada izin' });
//     }

//     await comment.deleteOne();
//     res.json({ success: true });
//   } catch (e: any) {
//     res.status(500).json({ error: e.message });
//   }
// });

// export default router;
import express from 'express';
import Comment from '../models/Comment';
// [FIX] Menggunakan requireAuth sesuai dengan middleware yang Anda miliki
import { requireAuth } from '../middleware/auth';
import { User } from '../models/User';

const router = express.Router();

// GET Comments by Blog ID
router.get('/:blogId', async (req, res) => {
  try {
    const comments = await Comment.find({ blogId: req.params.blogId })
      .populate('author', 'name avatarUrl role')
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// POST Comment
router.post('/', requireAuth, async (req: any, res) => {
  try {
    const { content, blogId, parentId } = req.body;
    const newComment = await Comment.create({
      content,
      blogId,
      parentId: parentId || null,
      author: req.user.id // Pastikan menggunakan req.user.id
    });
    
    await newComment.populate('author', 'name avatarUrl role');
    res.json(newComment);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// DELETE Comment
router.delete('/:id', requireAuth, async (req: any, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ error: 'Komentar tidak ditemukan' });

    const user = await User.findById(req.user.id);
    const isAdminOrFacil = user && ['SUPER_ADMIN', 'FACILITATOR'].includes(user.role);
    const isOwner = comment.author.toString() === req.user.id;

    if (!isOwner && !isAdminOrFacil) {
        return res.status(403).json({ error: 'Tidak ada izin' });
    }

    await comment.deleteOne();
    res.json({ success: true });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
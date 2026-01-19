// // // // import express from 'express';
// // // // import { requireAuth } from '../middleware/auth';
// // // // import { sendMessage, getMyMessages } from '../controllers/chatController';

// // // // const router = express.Router();

// // // // router.post('/send', requireAuth, sendMessage);
// // // // router.get('/', requireAuth, getMyMessages);

// // // // export default router;
// // // import express from 'express';
// // // import { requireAuth } from '../middleware/auth';
// // // import { 
// // //   sendMessage, 
// // //   getMessagesWithUser, 
// // //   getConversations, 
// // //   getUnreadCount,
// // //   markAsRead 
// // // } from '../controllers/chatController';

// // // const router = express.Router();

// // // router.post('/send', requireAuth, sendMessage);
// // // router.get('/conversations', requireAuth, getConversations); // Daftar Chat
// // // router.get('/unread-count', requireAuth, getUnreadCount);    // Notifikasi
// // // router.get('/:otherUserId', requireAuth, getMessagesWithUser); // History Detail
// // // router.put('/read', requireAuth, markAsRead);                // Mark Read

// // // export default router;
// // import express from 'express';
// // import { requireAuth } from '../middleware/auth';
// // import { 
// //   sendMessage, 
// //   getMessagesWithUser, 
// //   getConversations, 
// //   getUnreadCount,
// //   markAsRead,
// //   getGlobalMessages ,
// //   getChatUsers
// // } from '../controllers/chatController';

// // const router = express.Router();

// // // Kirim Pesan (Pribadi / Global)
// // router.post('/send', requireAuth, sendMessage);

// // // Global Chat
// // router.get('/global', requireAuth, getGlobalMessages);
// // router.get('/users', requireAuth, getChatUsers); // Tambahkan baris ini

// // // Inbox & Notifikasi
// // router.get('/conversations', requireAuth, getConversations);
// // router.get('/unread-count', requireAuth, getUnreadCount);
// // router.put('/read', requireAuth, markAsRead);

// // // Detail Chat dengan User Tertentu (Taruh paling bawah karena parameter dinamis :id)
// // router.get('/:otherUserId', requireAuth, getMessagesWithUser);

// // export default router;

// import express from 'express';
// import { requireAuth } from '../middleware/auth';
// import { 
//     sendMessage, 
//     getGlobalMessages, 
//     getConversations, 
//     getMessagesWithUser, 
//     getChatUsers,
//     getUnreadCount,
//     markAsRead,
//     getGroupMessageCount // [FIX] Pastikan ini di-import
// } from '../controllers/chatController';

// const router = express.Router();

// // Main Chat Routes
// router.post('/send', requireAuth, sendMessage);
// router.get('/global', requireAuth, getGlobalMessages);
// router.get('/conversations', requireAuth, getConversations);
// router.get('/users', requireAuth, getChatUsers);
// router.get('/unread-count', requireAuth, getUnreadCount);
// router.patch('/read-all', requireAuth, markAsRead);

// // Group/Course Chat Count
// router.get('/group/:courseId/count', requireAuth, getGroupMessageCount);

// // Specific User Chat (Taruh paling bawah karena param wildcard)
// router.get('/:otherUserId', requireAuth, getMessagesWithUser);

// export default router;




import express, { Response } from 'express';
import { requireAuth, AuthedRequest } from '../middleware/auth';
import { Message } from '../models/Message'; // Import Model Message langsung untuk fitur Nuke
import { 
    sendMessage, 
    getGlobalMessages, 
    getConversations, 
    getMessagesWithUser, 
    getChatUsers,
    getUnreadCount,
    markAsRead,
    getGroupMessageCount
} from '../controllers/chatController';

const router = express.Router();

// Main Chat Routes
router.post('/send', requireAuth, sendMessage);
router.get('/global', requireAuth, getGlobalMessages);
router.get('/conversations', requireAuth, getConversations);
router.get('/users', requireAuth, getChatUsers);
router.get('/unread-count', requireAuth, getUnreadCount);
router.patch('/read-all', requireAuth, markAsRead);

// Group/Course Chat Count
router.get('/group/:courseId/count', requireAuth, getGroupMessageCount);

// [FITUR BARU] RESET CHAT (Hapus Semua Pesan System-Wide)
router.delete('/nuke', requireAuth, async (req: AuthedRequest, res: Response) => {
    try {
        if (!['SUPER_ADMIN', 'ADMIN'].includes(req.user!.role)) {
            return res.status(403).json({ error: "Hanya Admin yang bisa reset chat" });
        }
        await Message.deleteMany({}); // Hapus SEMUA data di koleksi messages
        res.json({ message: '⚠️ SYSTEM RESET: Semua chat berhasil dihapus bersih.' });
    } catch (e: any) { 
        res.status(500).json({ error: e.message }); 
    }
});

// Specific User Chat (Taruh paling bawah karena param wildcard)
router.get('/:otherUserId', requireAuth, getMessagesWithUser);

export default router;
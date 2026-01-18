// // // import express from 'express';
// // // import { requireAuth } from '../middleware/auth';
// // // import { sendMessage, getMyMessages } from '../controllers/chatController';

// // // const router = express.Router();

// // // router.post('/send', requireAuth, sendMessage);
// // // router.get('/', requireAuth, getMyMessages);

// // // export default router;
// // import express from 'express';
// // import { requireAuth } from '../middleware/auth';
// // import { 
// //   sendMessage, 
// //   getMessagesWithUser, 
// //   getConversations, 
// //   getUnreadCount,
// //   markAsRead 
// // } from '../controllers/chatController';

// // const router = express.Router();

// // router.post('/send', requireAuth, sendMessage);
// // router.get('/conversations', requireAuth, getConversations); // Daftar Chat
// // router.get('/unread-count', requireAuth, getUnreadCount);    // Notifikasi
// // router.get('/:otherUserId', requireAuth, getMessagesWithUser); // History Detail
// // router.put('/read', requireAuth, markAsRead);                // Mark Read

// // export default router;
// import express from 'express';
// import { requireAuth } from '../middleware/auth';
// import { 
//   sendMessage, 
//   getMessagesWithUser, 
//   getConversations, 
//   getUnreadCount,
//   markAsRead,
//   getGlobalMessages ,
//   getChatUsers
// } from '../controllers/chatController';

// const router = express.Router();

// // Kirim Pesan (Pribadi / Global)
// router.post('/send', requireAuth, sendMessage);

// // Global Chat
// router.get('/global', requireAuth, getGlobalMessages);
// router.get('/users', requireAuth, getChatUsers); // Tambahkan baris ini

// // Inbox & Notifikasi
// router.get('/conversations', requireAuth, getConversations);
// router.get('/unread-count', requireAuth, getUnreadCount);
// router.put('/read', requireAuth, markAsRead);

// // Detail Chat dengan User Tertentu (Taruh paling bawah karena parameter dinamis :id)
// router.get('/:otherUserId', requireAuth, getMessagesWithUser);

// export default router;

import express from 'express';
import { requireAuth } from '../middleware/auth';
import { 
    sendMessage, 
    getGlobalMessages, 
    getConversations, 
    getMessagesWithUser, 
    getChatUsers,
    getUnreadCount,
    markAsRead,
    getGroupMessageCount // [FIX] Pastikan ini di-import
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

// Specific User Chat (Taruh paling bawah karena param wildcard)
router.get('/:otherUserId', requireAuth, getMessagesWithUser);

export default router;
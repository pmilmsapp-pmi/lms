// // // // // // // // // import { Request, Response } from 'express';
// // // // // // // // // import { Message } from '../models/Message';
// // // // // // // // // import { User } from '../models/User';

// // // // // // // // // // --- SEND MESSAGE ---
// // // // // // // // // export const sendMessage = async (req: any, res: Response) => {
// // // // // // // // //   try {
// // // // // // // // //     const senderId = req.user.id;
// // // // // // // // //     const { recipientId, message } = req.body;

// // // // // // // // //     if (!recipientId || !message) {
// // // // // // // // //       return res.status(400).json({ error: "Recipient and message are required" });
// // // // // // // // //     }

// // // // // // // // //     const recipient = await User.findById(recipientId);
// // // // // // // // //     if (!recipient) {
// // // // // // // // //       return res.status(404).json({ error: "Recipient user not found" });
// // // // // // // // //     }

// // // // // // // // //     const newMessage = await Message.create({
// // // // // // // // //       sender: senderId,
// // // // // // // // //       recipient: recipientId,
// // // // // // // // //       message
// // // // // // // // //     });

// // // // // // // // //     res.status(201).json({ message: "Sent", data: newMessage });
// // // // // // // // //   } catch (error: any) {
// // // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // // //   }
// // // // // // // // // };

// // // // // // // // // // --- GET MY MESSAGES (Optional: Untuk fitur Inbox nanti) ---
// // // // // // // // // export const getMyMessages = async (req: any, res: Response) => {
// // // // // // // // //   try {
// // // // // // // // //     const userId = req.user.id;
// // // // // // // // //     const messages = await Message.find({
// // // // // // // // //       $or: [{ recipient: userId }, { sender: userId }]
// // // // // // // // //     })
// // // // // // // // //     .populate('sender', 'name avatarUrl')
// // // // // // // // //     .populate('recipient', 'name avatarUrl')
// // // // // // // // //     .sort({ createdAt: -1 });

// // // // // // // // //     res.json({ messages });
// // // // // // // // //   } catch (error: any) {
// // // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // // //   }
// // // // // // // // // };
// // // // // // // // import { Request, Response } from 'express';
// // // // // // // // import { Message } from '../models/Message';
// // // // // // // // import { User } from '../models/User';

// // // // // // // // // --- KIRIM PESAN ---
// // // // // // // // export const sendMessage = async (req: any, res: Response) => {
// // // // // // // //   try {
// // // // // // // //     const senderId = req.user.id;
// // // // // // // //     const { recipientId, message } = req.body;

// // // // // // // //     if (!recipientId || !message) return res.status(400).json({ error: "Data tidak lengkap" });

// // // // // // // //     const newMessage = await Message.create({
// // // // // // // //       sender: senderId,
// // // // // // // //       recipient: recipientId,
// // // // // // // //       message,
// // // // // // // //       isRead: false
// // // // // // // //     });

// // // // // // // //     res.status(201).json({ message: "Terkirim", data: newMessage });
// // // // // // // //   } catch (error: any) {
// // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // //   }
// // // // // // // // };

// // // // // // // // // --- AMBIL HISTORY CHAT DENGAN USER TERTENTU ---
// // // // // // // // export const getMessagesWithUser = async (req: any, res: Response) => {
// // // // // // // //   try {
// // // // // // // //     const myId = req.user.id;
// // // // // // // //     const { otherUserId } = req.params;

// // // // // // // //     // Ambil pesan bolak-balik (Saya -> Dia ATAU Dia -> Saya)
// // // // // // // //     const messages = await Message.find({
// // // // // // // //       $or: [
// // // // // // // //         { sender: myId, recipient: otherUserId },
// // // // // // // //         { sender: otherUserId, recipient: myId }
// // // // // // // //       ]
// // // // // // // //     }).sort({ createdAt: 1 }); // Urutkan dari yang terlama ke terbaru

// // // // // // // //     res.json({ messages });
// // // // // // // //   } catch (error: any) {
// // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // //   }
// // // // // // // // };

// // // // // // // // // --- AMBIL DAFTAR PERCAKAPAN (INBOX) ---
// // // // // // // // export const getConversations = async (req: any, res: Response) => {
// // // // // // // //   try {
// // // // // // // //     const myId = req.user.id;

// // // // // // // //     // Ambil semua pesan yang melibatkan saya
// // // // // // // //     const messages = await Message.find({
// // // // // // // //       $or: [{ sender: myId }, { recipient: myId }]
// // // // // // // //     })
// // // // // // // //     .sort({ createdAt: -1 })
// // // // // // // //     .populate('sender', 'name avatarUrl role')
// // // // // // // //     .populate('recipient', 'name avatarUrl role');

// // // // // // // //     // Grouping berdasarkan lawan bicara
// // // // // // // //     const conversationMap = new Map();

// // // // // // // //     messages.forEach((msg: any) => {
// // // // // // // //       const isMeSender = msg.sender._id.toString() === myId;
// // // // // // // //       const otherUser = isMeSender ? msg.recipient : msg.sender;
      
// // // // // // // //       if (!otherUser) return; // Skip jika user terhapus

// // // // // // // //       const otherId = otherUser._id.toString();

// // // // // // // //       if (!conversationMap.has(otherId)) {
// // // // // // // //         conversationMap.set(otherId, {
// // // // // // // //           user: otherUser,
// // // // // // // //           lastMessage: msg.message,
// // // // // // // //           timestamp: msg.createdAt,
// // // // // // // //           unreadCount: 0
// // // // // // // //         });
// // // // // // // //       }

// // // // // // // //       // Hitung unread (Jika saya penerima dan belum baca)
// // // // // // // //       if (!isMeSender && !msg.isRead) {
// // // // // // // //         conversationMap.get(otherId).unreadCount++;
// // // // // // // //       }
// // // // // // // //     });

// // // // // // // //     const conversations = Array.from(conversationMap.values());
// // // // // // // //     res.json({ conversations });

// // // // // // // //   } catch (error: any) {
// // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // //   }
// // // // // // // // };

// // // // // // // // // --- HITUNG TOTAL NOTIFIKASI BELUM DIBACA ---
// // // // // // // // export const getUnreadCount = async (req: any, res: Response) => {
// // // // // // // //   try {
// // // // // // // //     const myId = req.user.id;
// // // // // // // //     const count = await Message.countDocuments({ recipient: myId, isRead: false });
// // // // // // // //     res.json({ count });
// // // // // // // //   } catch (error: any) {
// // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // //   }
// // // // // // // // };

// // // // // // // // // --- TANDAI SUDAH DIBACA ---
// // // // // // // // export const markAsRead = async (req: any, res: Response) => {
// // // // // // // //   try {
// // // // // // // //     const myId = req.user.id;
// // // // // // // //     const { senderId } = req.body;

// // // // // // // //     await Message.updateMany(
// // // // // // // //       { sender: senderId, recipient: myId, isRead: false },
// // // // // // // //       { isRead: true }
// // // // // // // //     );

// // // // // // // //     res.json({ success: true });
// // // // // // // //   } catch (error: any) {
// // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // //   }
// // // // // // // // };
// // // // // // // import { Request, Response } from 'express';
// // // // // // // import { Message } from '../models/Message';
// // // // // // // import { User } from '../models/User';

// // // // // // // // --- 1. KIRIM PESAN (PRIBADI & GLOBAL) ---
// // // // // // // export const sendMessage = async (req: any, res: Response) => {
// // // // // // //   try {
// // // // // // //     const senderId = req.user.id;
// // // // // // //     // Ambil isGlobal dari body
// // // // // // //     const { recipientId, message, isGlobal } = req.body;

// // // // // // //     // Validasi: Jika BUKAN global, recipientId wajib ada
// // // // // // //     if (!isGlobal && !recipientId) {
// // // // // // //         return res.status(400).json({ error: "Penerima harus diisi untuk pesan pribadi" });
// // // // // // //     }
// // // // // // //     if (!message) {
// // // // // // //         return res.status(400).json({ error: "Pesan tidak boleh kosong" });
// // // // // // //     }

// // // // // // //     const newMessage = await Message.create({
// // // // // // //       sender: senderId,
// // // // // // //       // Jika global, recipient null. Jika pribadi, recipient sesuai input
// // // // // // //       recipient: isGlobal ? undefined : recipientId, 
// // // // // // //       message,
// // // // // // //       isRead: false,
// // // // // // //       isGlobal: !!isGlobal // Pastikan boolean
// // // // // // //     });

// // // // // // //     // Populate data pengirim agar bisa langsung ditampilkan di frontend
// // // // // // //     const populatedMessage = await newMessage.populate('sender', 'name avatarUrl role');

// // // // // // //     res.status(201).json(populatedMessage);
// // // // // // //   } catch (error: any) {
// // // // // // //     res.status(500).json({ error: error.message });
// // // // // // //   }
// // // // // // // };

// // // // // // // // --- 2. AMBIL HISTORY GLOBAL CHAT (BARU) ---
// // // // // // // export const getGlobalMessages = async (req: any, res: Response) => {
// // // // // // //   try {
// // // // // // //     const messages = await Message.find({ isGlobal: true })
// // // // // // //       .populate('sender', 'name avatarUrl role')
// // // // // // //       .sort({ createdAt: -1 }) // Ambil dari yang terbaru
// // // // // // //       .limit(50); // Batasi 50 pesan terakhir agar ringan
    
// // // // // // //     // Reverse agar di frontend urutannya benar (lama -> baru)
// // // // // // //     res.json({ messages: messages.reverse() });
// // // // // // //   } catch (error: any) {
// // // // // // //     res.status(500).json({ error: error.message });
// // // // // // //   }
// // // // // // // };

// // // // // // // // --- 3. AMBIL HISTORY CHAT DENGAN USER TERTENTU (PRIBADI) ---
// // // // // // // export const getMessagesWithUser = async (req: any, res: Response) => {
// // // // // // //   try {
// // // // // // //     const myId = req.user.id;
// // // // // // //     const { otherUserId } = req.params;

// // // // // // //     const messages = await Message.find({
// // // // // // //       isGlobal: false, // HANYA pesan pribadi
// // // // // // //       $or: [
// // // // // // //         { sender: myId, recipient: otherUserId },
// // // // // // //         { sender: otherUserId, recipient: myId }
// // // // // // //       ]
// // // // // // //     })
// // // // // // //     .populate('sender', 'name avatarUrl')
// // // // // // //     .sort({ createdAt: 1 }); // Urutkan dari yang terlama ke terbaru

// // // // // // //     res.json({ messages });
// // // // // // //   } catch (error: any) {
// // // // // // //     res.status(500).json({ error: error.message });
// // // // // // //   }
// // // // // // // };

// // // // // // // // --- 4. AMBIL DAFTAR PERCAKAPAN / INBOX (OPTIMALISASI) ---
// // // // // // // export const getConversations = async (req: any, res: Response) => {
// // // // // // //   try {
// // // // // // //     // Menggunakan MongoDB Aggregation agar performa jauh lebih cepat
// // // // // // //     // daripada melakukan .find() semua pesan lalu filtering di Javascript
// // // // // // //     const conversations = await Message.aggregate([
// // // // // // //       {
// // // // // // //         $match: {
// // // // // // //           isGlobal: false, // Jangan masukkan chat global ke inbox
// // // // // // //           $or: [
// // // // // // //             { sender: req.user._id }, 
// // // // // // //             { recipient: req.user._id }
// // // // // // //           ]
// // // // // // //         }
// // // // // // //       },
// // // // // // //       {
// // // // // // //         $sort: { createdAt: -1 } // Urutkan pesan terbaru dulu
// // // // // // //       },
// // // // // // //       {
// // // // // // //         $group: {
// // // // // // //           _id: {
// // // // // // //             $cond: [
// // // // // // //               { $eq: ["$sender", req.user._id] },
// // // // // // //               "$recipient",
// // // // // // //               "$sender"
// // // // // // //             ]
// // // // // // //           },
// // // // // // //           lastMessage: { $first: "$$ROOT" } // Ambil pesan paling atas (terbaru)
// // // // // // //         }
// // // // // // //       },
// // // // // // //       {
// // // // // // //         $lookup: { // Join dengan tabel User untuk ambil nama/avatar
// // // // // // //           from: 'users',
// // // // // // //           localField: '_id',
// // // // // // //           foreignField: '_id',
// // // // // // //           as: 'userDetails'
// // // // // // //         }
// // // // // // //       },
// // // // // // //       {
// // // // // // //         $unwind: "$userDetails"
// // // // // // //       },
// // // // // // //       {
// // // // // // //         $project: { // Format output json
// // // // // // //           user: {
// // // // // // //             _id: "$userDetails._id",
// // // // // // //             name: "$userDetails.name",
// // // // // // //             avatarUrl: "$userDetails.avatarUrl",
// // // // // // //             role: "$userDetails.role"
// // // // // // //           },
// // // // // // //           lastMessage: {
// // // // // // //             message: "$lastMessage.message",
// // // // // // //             createdAt: "$lastMessage.createdAt",
// // // // // // //             sender: "$lastMessage.sender",
// // // // // // //             isRead: "$lastMessage.isRead"
// // // // // // //           }
// // // // // // //         }
// // // // // // //       },
// // // // // // //       { $sort: { "lastMessage.createdAt": -1 } } // Urutkan kontak berdasarkan pesan terakhir
// // // // // // //     ]);

// // // // // // //     res.json({ conversations });

// // // // // // //   } catch (error: any) {
// // // // // // //     console.error("Error getConversations:", error);
// // // // // // //     res.status(500).json({ error: error.message });
// // // // // // //   }
// // // // // // // };

// // // // // // // // --- 5. HITUNG TOTAL NOTIFIKASI BELUM DIBACA ---
// // // // // // // export const getUnreadCount = async (req: any, res: Response) => {
// // // // // // //   try {
// // // // // // //     const myId = req.user.id;
// // // // // // //     // Hanya hitung pesan pribadi yang belum dibaca
// // // // // // //     const count = await Message.countDocuments({ 
// // // // // // //         recipient: myId, 
// // // // // // //         isRead: false,
// // // // // // //         isGlobal: false 
// // // // // // //     });
// // // // // // //     res.json({ count });
// // // // // // //   } catch (error: any) {
// // // // // // //     res.status(500).json({ error: error.message });
// // // // // // //   }
// // // // // // // };

// // // // // // // // --- 6. TANDAI SUDAH DIBACA ---
// // // // // // // export const markAsRead = async (req: any, res: Response) => {
// // // // // // //   try {
// // // // // // //     const myId = req.user.id;
// // // // // // //     const { senderId } = req.body;

// // // // // // //     await Message.updateMany(
// // // // // // //       { 
// // // // // // //         sender: senderId, 
// // // // // // //         recipient: myId, 
// // // // // // //         isRead: false,
// // // // // // //         isGlobal: false 
// // // // // // //       },
// // // // // // //       { $set: { isRead: true } }
// // // // // // //     );

// // // // // // //     res.json({ success: true });
// // // // // // //   } catch (error: any) {
// // // // // // //     res.status(500).json({ error: error.message });
// // // // // // //   }
// // // // // // // };
// // // // // // import { Response } from 'express';
// // // // // // import { Message } from '../models/Message';
// // // // // // import { AuthedRequest } from '../middleware/auth';
// // // // // // import mongoose from 'mongoose'; // Pastikan import mongoose ada

// // // // // // // --- 1. KIRIM PESAN (PRIBADI & GLOBAL) ---
// // // // // // export const sendMessage = async (req: AuthedRequest, res: Response) => {
// // // // // //   try {
// // // // // //     const senderId = req.user!.id;
// // // // // //     const { recipientId, message, isGlobal } = req.body;

// // // // // //     // Validasi input
// // // // // //     if (!isGlobal && !recipientId) {
// // // // // //         return res.status(400).json({ error: "Penerima harus diisi untuk pesan pribadi" });
// // // // // //     }
// // // // // //     if (!message) {
// // // // // //         return res.status(400).json({ error: "Pesan tidak boleh kosong" });
// // // // // //     }

// // // // // //     const newMsg = await Message.create({
// // // // // //       sender: senderId,
// // // // // //       recipient: isGlobal ? undefined : recipientId,
// // // // // //       message,
// // // // // //       isRead: false,
// // // // // //       isGlobal: !!isGlobal
// // // // // //     });

// // // // // //     const populated = await newMsg.populate('sender', 'name avatarUrl role');
// // // // // //     res.status(201).json(populated);
// // // // // //   } catch (err: any) {
// // // // // //     res.status(500).json({ error: err.message });
// // // // // //   }
// // // // // // };

// // // // // // // --- 2. AMBIL PESAN GLOBAL ---
// // // // // // export const getGlobalMessages = async (req: AuthedRequest, res: Response) => {
// // // // // //   try {
// // // // // //     const messages = await Message.find({ isGlobal: true })
// // // // // //       .populate('sender', 'name avatarUrl role')
// // // // // //       .sort({ createdAt: -1 })
// // // // // //       .limit(50);
    
// // // // // //     res.json({ messages: messages.reverse() });
// // // // // //   } catch (err: any) {
// // // // // //     res.status(500).json({ error: err.message });
// // // // // //   }
// // // // // // };

// // // // // // // --- 3. AMBIL DAFTAR PERCAKAPAN (INBOX) - PERBAIKAN UTAMA ---
// // // // // // export const getConversations = async (req: AuthedRequest, res: Response) => {
// // // // // //   try {
// // // // // //     // FIX: Konversi String ID dari token menjadi ObjectId agar Aggregation bekerja
// // // // // //     const userId = new mongoose.Types.ObjectId(req.user!.id);

// // // // // //     const conversations = await Message.aggregate([
// // // // // //       {
// // // // // //         $match: {
// // // // // //           isGlobal: false,
// // // // // //           $or: [
// // // // // //             { sender: userId }, 
// // // // // //             { recipient: userId }
// // // // // //           ]
// // // // // //         }
// // // // // //       },
// // // // // //       {
// // // // // //         $sort: { createdAt: -1 }
// // // // // //       },
// // // // // //       {
// // // // // //         $group: {
// // // // // //           _id: {
// // // // // //             $cond: [
// // // // // //               { $eq: ["$sender", userId] }, // Bandingkan dengan ObjectId
// // // // // //               "$recipient",
// // // // // //               "$sender"
// // // // // //             ]
// // // // // //           },
// // // // // //           lastMessage: { $first: "$$ROOT" }
// // // // // //         }
// // // // // //       },
// // // // // //       {
// // // // // //         $lookup: {
// // // // // //           from: 'users',
// // // // // //           localField: '_id',
// // // // // //           foreignField: '_id',
// // // // // //           as: 'userDetails'
// // // // // //         }
// // // // // //       },
// // // // // //       {
// // // // // //         $unwind: "$userDetails"
// // // // // //       },
// // // // // //       {
// // // // // //         $project: {
// // // // // //           user: {
// // // // // //             _id: "$userDetails._id",
// // // // // //             name: "$userDetails.name",
// // // // // //             avatarUrl: "$userDetails.avatarUrl",
// // // // // //             role: "$userDetails.role"
// // // // // //           },
// // // // // //           lastMessage: {
// // // // // //             message: "$lastMessage.message",
// // // // // //             createdAt: "$lastMessage.createdAt",
// // // // // //             sender: "$lastMessage.sender",
// // // // // //             isRead: "$lastMessage.isRead"
// // // // // //           }
// // // // // //         }
// // // // // //       },
// // // // // //       { $sort: { "lastMessage.createdAt": -1 } }
// // // // // //     ]);

// // // // // //     res.json({ conversations });
// // // // // //   } catch (err: any) {
// // // // // //     console.error("Get Conversations Error:", err);
// // // // // //     res.status(500).json({ error: err.message });
// // // // // //   }
// // // // // // };

// // // // // // // --- 4. AMBIL DETAIL CHAT DENGAN USER TERTENTU ---
// // // // // // export const getMessagesWithUser = async (req: AuthedRequest, res: Response) => {
// // // // // //   try {
// // // // // //     const myId = req.user!.id;
// // // // // //     const { otherUserId } = req.params;

// // // // // //     const messages = await Message.find({
// // // // // //       isGlobal: false,
// // // // // //       $or: [
// // // // // //         { sender: myId, recipient: otherUserId },
// // // // // //         { sender: otherUserId, recipient: myId }
// // // // // //       ]
// // // // // //     })
// // // // // //     .populate('sender', 'name avatarUrl')
// // // // // //     .sort({ createdAt: 1 });

// // // // // //     res.json({ messages });
// // // // // //   } catch (err: any) {
// // // // // //     res.status(500).json({ error: err.message });
// // // // // //   }
// // // // // // };

// // // // // // // --- 5. HITUNG PESAN BELUM DIBACA ---
// // // // // // export const getUnreadCount = async (req: AuthedRequest, res: Response) => {
// // // // // //   try {
// // // // // //     // countDocuments otomatis handle casting string ke ObjectId
// // // // // //     const count = await Message.countDocuments({
// // // // // //       recipient: req.user!.id,
// // // // // //       isRead: false,
// // // // // //       isGlobal: false
// // // // // //     });
// // // // // //     res.json({ count });
// // // // // //   } catch (err: any) {
// // // // // //     res.status(500).json({ error: err.message });
// // // // // //   }
// // // // // // };

// // // // // // // --- 6. TANDAI PESAN SUDAH DIBACA ---
// // // // // // export const markAsRead = async (req: AuthedRequest, res: Response) => {
// // // // // //   try {
// // // // // //     const { senderId } = req.body; 
    
// // // // // //     await Message.updateMany(
// // // // // //       { sender: senderId, recipient: req.user!.id, isRead: false },
// // // // // //       { $set: { isRead: true } }
// // // // // //     );
    
// // // // // //     res.json({ success: true });
// // // // // //   } catch (err: any) {
// // // // // //     res.status(500).json({ error: err.message });
// // // // // //   }
// // // // // // };
// // // // // // ... (import user model di atas)
// // // // // import { User } from '../models/User';

// // // // // // ... (fungsi-fungsi lain tetap sama) ...

// // // // // // --- 7. AMBIL DAFTAR USER UNTUK CHAT ---
// // // // // export const getChatUsers = async (req: any, res: Response) => {
// // // // //   try {
// // // // //     // Ambil user selain diri sendiri, ambil field nama, avatar, role
// // // // //     const users = await User.find({ _id: { $ne: req.user.id } })
// // // // //       .select('name avatarUrl role')
// // // // //       .sort({ name: 1 }) // Urutkan nama A-Z
// // // // //       .limit(100); // Batasi agar tidak terlalu berat

// // // // //     res.json({ users });
// // // // //   } catch (error: any) {
// // // // //     res.status(500).json({ error: error.message });
// // // // //   }
// // // // // };
// // // // import { Response } from 'express';
// // // // import mongoose from 'mongoose';
// // // // import { Message } from '../models/Message';
// // // // import { User } from '../models/User';
// // // // import { AuthedRequest } from '../middleware/auth';

// // // // // --- 1. KIRIM PESAN ---
// // // // export const sendMessage = async (req: AuthedRequest, res: Response) => {
// // // //   try {
// // // //     const senderId = req.user!.id;
// // // //     const { recipientId, message, isGlobal } = req.body;

// // // //     if (!isGlobal && !recipientId) {
// // // //         return res.status(400).json({ error: "Penerima harus diisi untuk pesan pribadi" });
// // // //     }
// // // //     if (!message) {
// // // //         return res.status(400).json({ error: "Pesan tidak boleh kosong" });
// // // //     }

// // // //     const newMsg = await Message.create({
// // // //       sender: senderId,
// // // //       recipient: isGlobal ? undefined : recipientId,
// // // //       message,
// // // //       isRead: false,
// // // //       isGlobal: !!isGlobal
// // // //     });

// // // //     const populated = await newMsg.populate('sender', 'name avatarUrl role');
// // // //     res.status(201).json(populated);
// // // //   } catch (err: any) {
// // // //     res.status(500).json({ error: err.message });
// // // //   }
// // // // };

// // // // // --- 2. AMBIL PESAN GLOBAL ---
// // // // export const getGlobalMessages = async (req: AuthedRequest, res: Response) => {
// // // //   try {
// // // //     const messages = await Message.find({ isGlobal: true })
// // // //       .populate('sender', 'name avatarUrl role')
// // // //       .sort({ createdAt: -1 })
// // // //       .limit(50);
    
// // // //     res.json({ messages: messages.reverse() });
// // // //   } catch (err: any) {
// // // //     res.status(500).json({ error: err.message });
// // // //   }
// // // // };

// // // // // --- 3. AMBIL DAFTAR USER (DIRECTORY) ---
// // // // export const getChatUsers = async (req: AuthedRequest, res: Response) => {
// // // //   try {
// // // //     // Ambil semua user kecuali diri sendiri
// // // //     // Select hanya field yang dibutuhkan agar ringan
// // // //     const users = await User.find({ _id: { $ne: req.user!.id } })
// // // //       .select('name avatarUrl role email')
// // // //       .sort({ name: 1 }) // Urut A-Z
// // // //       .limit(100);

// // // //     res.json({ users });
// // // //   } catch (err: any) {
// // // //     res.status(500).json({ error: err.message });
// // // //   }
// // // // };

// // // // // --- 4. AMBIL DAFTAR PERCAKAPAN (INBOX) ---
// // // // export const getConversations = async (req: AuthedRequest, res: Response) => {
// // // //   try {
// // // //     const userId = new mongoose.Types.ObjectId(req.user!.id);

// // // //     const conversations = await Message.aggregate([
// // // //       {
// // // //         $match: {
// // // //           isGlobal: false,
// // // //           $or: [
// // // //             { sender: userId }, 
// // // //             { recipient: userId }
// // // //           ]
// // // //         }
// // // //       },
// // // //       {
// // // //         $sort: { createdAt: -1 }
// // // //       },
// // // //       {
// // // //         $group: {
// // // //           _id: {
// // // //             $cond: [
// // // //               { $eq: ["$sender", userId] },
// // // //               "$recipient",
// // // //               "$sender"
// // // //             ]
// // // //           },
// // // //           lastMessage: { $first: "$$ROOT" }
// // // //         }
// // // //       },
// // // //       {
// // // //         $lookup: {
// // // //           from: 'users',
// // // //           localField: '_id',
// // // //           foreignField: '_id',
// // // //           as: 'userDetails'
// // // //         }
// // // //       },
// // // //       {
// // // //         $unwind: "$userDetails"
// // // //       },
// // // //       {
// // // //         $project: {
// // // //           user: {
// // // //             _id: "$userDetails._id",
// // // //             name: "$userDetails.name",
// // // //             avatarUrl: "$userDetails.avatarUrl",
// // // //             role: "$userDetails.role"
// // // //           },
// // // //           lastMessage: {
// // // //             message: "$lastMessage.message",
// // // //             createdAt: "$lastMessage.createdAt",
// // // //             sender: "$lastMessage.sender",
// // // //             isRead: "$lastMessage.isRead"
// // // //           }
// // // //         }
// // // //       },
// // // //       { $sort: { "lastMessage.createdAt": -1 } }
// // // //     ]);

// // // //     res.json({ conversations });
// // // //   } catch (err: any) {
// // // //     console.error("Get Conversations Error:", err);
// // // //     res.status(500).json({ error: err.message });
// // // //   }
// // // // };

// // // // // --- 5. AMBIL DETAIL CHAT DENGAN USER TERTENTU ---
// // // // export const getMessagesWithUser = async (req: AuthedRequest, res: Response) => {
// // // //   try {
// // // //     const myId = req.user!.id;
// // // //     const { otherUserId } = req.params;

// // // //     const messages = await Message.find({
// // // //       isGlobal: false,
// // // //       $or: [
// // // //         { sender: myId, recipient: otherUserId },
// // // //         { sender: otherUserId, recipient: myId }
// // // //       ]
// // // //     })
// // // //     .populate('sender', 'name avatarUrl')
// // // //     .sort({ createdAt: 1 });

// // // //     res.json({ messages });
// // // //   } catch (err: any) {
// // // //     res.status(500).json({ error: err.message });
// // // //   }
// // // // };

// // // // // --- 6. HITUNG PESAN BELUM DIBACA ---
// // // // export const getUnreadCount = async (req: AuthedRequest, res: Response) => {
// // // //   try {
// // // //     const count = await Message.countDocuments({
// // // //       recipient: req.user!.id,
// // // //       isRead: false,
// // // //       isGlobal: false
// // // //     });
// // // //     res.json({ count });
// // // //   } catch (err: any) {
// // // //     res.status(500).json({ error: err.message });
// // // //   }
// // // // };

// // // // // --- 7. TANDAI PESAN SUDAH DIBACA ---
// // // // export const markAsRead = async (req: AuthedRequest, res: Response) => {
// // // //   try {
// // // //     const { senderId } = req.body; 
    
// // // //     await Message.updateMany(
// // // //       { sender: senderId, recipient: req.user!.id, isRead: false },
// // // //       { $set: { isRead: true } }
// // // //     );
    
// // // //     res.json({ success: true });
// // // //   } catch (err: any) {
// // // //     res.status(500).json({ error: err.message });
// // // //   }
// // // // };
// // // import { Response } from 'express';
// // // import mongoose from 'mongoose';
// // // import { Message } from '../models/Message';
// // // import { User } from '../models/User';
// // // import { Notification } from '../models/Notification'; // Pastikan Model Notification sudah ada
// // // import { AuthedRequest } from '../middleware/auth';

// // // // --- 1. KIRIM PESAN (UPDATED WITH MENTION) ---
// // // export const sendMessage = async (req: AuthedRequest, res: Response) => {
// // //   try {
// // //     const senderId = req.user!.id;
// // //     const { recipientId, message, isGlobal, attachment, type, courseId } = req.body;

// // //     if (!isGlobal && !recipientId && !courseId && !type) {
// // //         return res.status(400).json({ error: "Target penerima tidak valid" });
// // //     }

// // //     // 1. Deteksi Mention (@Nama)
// // //     let mentionedUserIds: string[] = [];
// // //     if (message && message.includes('@')) {
// // //         const words = message.split(' ');
// // //         const mentionNames = words
// // //             .filter((w: string) => w.startsWith('@'))
// // //             .map((w: string) => w.substring(1)); // Hapus @

// // //         if (mentionNames.length > 0) {
// // //             // Cari user berdasarkan nama (Case insensitive partial match)
// // //             const mentionedUsers = await User.find({
// // //                 name: { $in: mentionNames.map((n: string) => new RegExp(n, 'i')) }
// // //             }).select('_id');
            
// // //             mentionedUserIds = mentionedUsers.map(u => u._id.toString());
// // //         }
// // //     }

// // //     // 2. Buat Pesan
// // //     const newMsg = await Message.create({
// // //       sender: senderId,
// // //       recipient: isGlobal ? undefined : recipientId,
// // //       course: courseId, // Simpan ID Course jika ada (untuk group chat)
// // //       type: type || 'public',
// // //       message,
// // //       attachment,
// // //       isRead: false,
// // //       isGlobal: !!isGlobal,
// // //       mentions: mentionedUserIds
// // //     });

// // //     // 3. Buat Notifikasi untuk User yang di-mention
// // //     if (mentionedUserIds.length > 0) {
// // //         const notifs = mentionedUserIds
// // //             .filter(id => id !== senderId) // Jangan notif diri sendiri
// // //             .map(id => ({
// // //                 user: id,
// // //                 title: 'Anda disebut dalam percakapan',
// // //                 message: `${req.user?.name || 'Seseorang'} menyebut anda: "${message.substring(0, 30)}..."`,
// // //                 type: 'info',
// // //                 isRead: false
// // //             }));
        
// // //         if(notifs.length > 0) {
// // //             await Notification.insertMany(notifs);
// // //         }
// // //     }

// // //     // Populate sender data untuk return ke frontend
// // //     const populated = await newMsg.populate('sender', 'name avatarUrl role');
// // //     res.status(201).json(populated);

// // //   } catch (err: any) {
// // //     console.error("Send Msg Error:", err);
// // //     res.status(500).json({ error: err.message });
// // //   }
// // // };

// // // // --- 2. AMBIL PESAN GLOBAL ---
// // // export const getGlobalMessages = async (req: AuthedRequest, res: Response) => {
// // //   try {
// // //     const messages = await Message.find({ isGlobal: true })
// // //       .populate('sender', 'name avatarUrl role')
// // //       .sort({ createdAt: -1 })
// // //       .limit(50);
    
// // //     res.json({ messages: messages.reverse() });
// // //   } catch (err: any) {
// // //     res.status(500).json({ error: err.message });
// // //   }
// // // };

// // // // --- 3. AMBIL DAFTAR USER (DIRECTORY) ---
// // // export const getChatUsers = async (req: AuthedRequest, res: Response) => {
// // //   try {
// // //     const users = await User.find({ _id: { $ne: req.user!.id } })
// // //       .select('name avatarUrl role email')
// // //       .sort({ name: 1 })
// // //       .limit(100);

// // //     res.json({ users });
// // //   } catch (err: any) {
// // //     res.status(500).json({ error: err.message });
// // //   }
// // // };

// // // // --- 4. AMBIL DAFTAR PERCAKAPAN (INBOX) ---
// // // export const getConversations = async (req: AuthedRequest, res: Response) => {
// // //   try {
// // //     const userId = new mongoose.Types.ObjectId(req.user!.id);

// // //     const conversations = await Message.aggregate([
// // //       {
// // //         $match: {
// // //           isGlobal: false,
// // //           course: { $exists: false }, // Hanya chat personal, bukan group course
// // //           $or: [
// // //             { sender: userId }, 
// // //             { recipient: userId }
// // //           ]
// // //         }
// // //       },
// // //       { $sort: { createdAt: -1 } },
// // //       {
// // //         $group: {
// // //           _id: {
// // //             $cond: [
// // //               { $eq: ["$sender", userId] },
// // //               "$recipient",
// // //               "$sender"
// // //             ]
// // //           },
// // //           lastMessage: { $first: "$$ROOT" }
// // //         }
// // //       },
// // //       {
// // //         $lookup: {
// // //           from: 'users',
// // //           localField: '_id',
// // //           foreignField: '_id',
// // //           as: 'userDetails'
// // //         }
// // //       },
// // //       { $unwind: "$userDetails" },
// // //       {
// // //         $project: {
// // //           user: {
// // //             _id: "$userDetails._id",
// // //             name: "$userDetails.name",
// // //             avatarUrl: "$userDetails.avatarUrl",
// // //             role: "$userDetails.role"
// // //           },
// // //           lastMessage: {
// // //             message: "$lastMessage.message",
// // //             createdAt: "$lastMessage.createdAt",
// // //             sender: "$lastMessage.sender",
// // //             isRead: "$lastMessage.isRead"
// // //           }
// // //         }
// // //       },
// // //       { $sort: { "lastMessage.createdAt": -1 } }
// // //     ]);

// // //     res.json({ conversations });
// // //   } catch (err: any) {
// // //     console.error("Get Conversations Error:", err);
// // //     res.status(500).json({ error: err.message });
// // //   }
// // // };

// // // // --- 5. AMBIL DETAIL CHAT DENGAN USER TERTENTU ---
// // // export const getMessagesWithUser = async (req: AuthedRequest, res: Response) => {
// // //   try {
// // //     const myId = req.user!.id;
// // //     const { otherUserId } = req.params;

// // //     const messages = await Message.find({
// // //       isGlobal: false,
// // //       course: { $exists: false },
// // //       $or: [
// // //         { sender: myId, recipient: otherUserId },
// // //         { sender: otherUserId, recipient: myId }
// // //       ]
// // //     })
// // //     .populate('sender', 'name avatarUrl')
// // //     .sort({ createdAt: 1 });

// // //     res.json({ messages });
// // //   } catch (err: any) {
// // //     res.status(500).json({ error: err.message });
// // //   }
// // // };

// // // // --- 6. HITUNG PESAN BELUM DIBACA ---
// // // export const getUnreadCount = async (req: AuthedRequest, res: Response) => {
// // //   try {
// // //     const count = await Message.countDocuments({
// // //       recipient: req.user!.id,
// // //       isRead: false,
// // //       isGlobal: false
// // //     });
// // //     res.json({ count });
// // //   } catch (err: any) {
// // //     res.status(500).json({ error: err.message });
// // //   }
// // // };

// // // // --- 7. TANDAI PESAN SUDAH DIBACA ---
// // // export const markAsRead = async (req: AuthedRequest, res: Response) => {
// // //   try {
// // //     const { senderId } = req.body; 
    
// // //     await Message.updateMany(
// // //       { sender: senderId, recipient: req.user!.id, isRead: false },
// // //       { $set: { isRead: true } }
// // //     );
    
// // //     res.json({ success: true });
// // //   } catch (err: any) {
// // //     res.status(500).json({ error: err.message });
// // //   }
// // // };
// // import { Response } from 'express';
// // import mongoose from 'mongoose';
// // import { Message } from '../models/Message';
// // import { User } from '../models/User';
// // import { Notification } from '../models/Notification'; 
// // import { AuthedRequest } from '../middleware/auth';

// // // --- 1. KIRIM PESAN (UPDATED WITH MENTION) ---
// // export const sendMessage = async (req: AuthedRequest, res: Response) => {
// //   try {
// //     const senderId = req.user!.id;
// //     const { recipientId, message, isGlobal, attachment, type, courseId } = req.body;

// //     if (!isGlobal && !recipientId && !courseId && !type) {
// //         return res.status(400).json({ error: "Target penerima tidak valid" });
// //     }

// //     // 1. Deteksi Mention (@Nama)
// //     let mentionedUserIds: string[] = [];
// //     if (message && message.includes('@')) {
// //         const words = message.split(' ');
// //         const mentionNames = words
// //             .filter((w: string) => w.startsWith('@'))
// //             .map((w: string) => w.substring(1)); // Hapus @

// //         if (mentionNames.length > 0) {
// //             // Cari user berdasarkan nama (Case insensitive partial match)
// //             // Limit 5 agar tidak spam query
// //             const mentionedUsers = await User.find({
// //                 name: { $in: mentionNames.map((n: string) => new RegExp(n, 'i')) }
// //             }).select('_id');
            
// //             mentionedUserIds = mentionedUsers.map(u => u._id.toString());
// //         }
// //     }

// //     // 2. Buat Pesan
// //     const newMsg = await Message.create({
// //       sender: senderId,
// //       recipient: isGlobal ? undefined : recipientId,
// //       course: courseId, // Simpan ID Course
// //       type: type || 'public',
// //       message,
// //       attachment,
// //       isRead: false,
// //       isGlobal: !!isGlobal,
// //       mentions: mentionedUserIds
// //     });

// //     // 3. Buat Notifikasi untuk User yang di-mention
// //     if (mentionedUserIds.length > 0) {
// //         const notifs = mentionedUserIds
// //             .filter(id => id !== senderId) // Jangan notif diri sendiri
// //             .map(id => ({
// //                 user: id,
// //                 title: 'Mention di Ruang Diskusi',
// //                 message: `${req.user?.name || 'Seseorang'} menyebut anda: "${message.substring(0, 30)}..."`,
// //                 type: 'info',
// //                 isRead: false,
// //                 link: courseId ? `/dashboard/course/${courseId}` : '/dashboard'
// //             }));
        
// //         if(notifs.length > 0) {
// //             try { await Notification.insertMany(notifs); } catch(e) {}
// //         }
// //     }

// //     const populated = await newMsg.populate('sender', 'name avatarUrl role');
// //     res.status(201).json(populated);

// //   } catch (err: any) {
// //     console.error("Send Msg Error:", err);
// //     res.status(500).json({ error: err.message });
// //   }
// // };

// // // --- (Fungsi Lain Tetap Sama - Dicopy untuk kelengkapan file) ---

// // export const getGlobalMessages = async (req: AuthedRequest, res: Response) => {
// //   try {
// //     const messages = await Message.find({ isGlobal: true })
// //       .populate('sender', 'name avatarUrl role')
// //       .sort({ createdAt: -1 })
// //       .limit(50);
// //     res.json({ messages: messages.reverse() });
// //   } catch (err: any) { res.status(500).json({ error: err.message }); }
// // };

// // export const getChatUsers = async (req: AuthedRequest, res: Response) => {
// //   try {
// //     const users = await User.find({ _id: { $ne: req.user!.id } })
// //       .select('name avatarUrl role email')
// //       .sort({ name: 1 })
// //       .limit(100);
// //     res.json({ users });
// //   } catch (err: any) { res.status(500).json({ error: err.message }); }
// // };

// // export const getConversations = async (req: AuthedRequest, res: Response) => {
// //   try {
// //     const userId = new mongoose.Types.ObjectId(req.user!.id);
// //     const conversations = await Message.aggregate([
// //       {
// //         $match: {
// //           isGlobal: false,
// //           course: { $exists: false },
// //           $or: [ { sender: userId }, { recipient: userId } ]
// //         }
// //       },
// //       { $sort: { createdAt: -1 } },
// //       {
// //         $group: {
// //           _id: { $cond: [ { $eq: ["$sender", userId] }, "$recipient", "$sender" ] },
// //           lastMessage: { $first: "$$ROOT" }
// //         }
// //       },
// //       { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'userDetails' } },
// //       { $unwind: "$userDetails" },
// //       {
// //         $project: {
// //           user: { _id: "$userDetails._id", name: "$userDetails.name", avatarUrl: "$userDetails.avatarUrl", role: "$userDetails.role" },
// //           lastMessage: { message: "$lastMessage.message", createdAt: "$lastMessage.createdAt", sender: "$lastMessage.sender", isRead: "$lastMessage.isRead" }
// //         }
// //       },
// //       { $sort: { "lastMessage.createdAt": -1 } }
// //     ]);
// //     res.json({ conversations });
// //   } catch (err: any) { res.status(500).json({ error: err.message }); }
// // };

// // export const getMessagesWithUser = async (req: AuthedRequest, res: Response) => {
// //   try {
// //     const myId = req.user!.id;
// //     const { otherUserId } = req.params;
// //     const messages = await Message.find({
// //       isGlobal: false,
// //       course: { $exists: false },
// //       $or: [ { sender: myId, recipient: otherUserId }, { sender: otherUserId, recipient: myId } ]
// //     })
// //     .populate('sender', 'name avatarUrl')
// //     .sort({ createdAt: 1 });
// //     res.json({ messages });
// //   } catch (err: any) { res.status(500).json({ error: err.message }); }
// // };

// // export const getUnreadCount = async (req: AuthedRequest, res: Response) => {
// //   try {
// //     const count = await Message.countDocuments({ recipient: req.user!.id, isRead: false, isGlobal: false });
// //     res.json({ count });
// //   } catch (err: any) { res.status(500).json({ error: err.message }); }
// // };

// // export const markAsRead = async (req: AuthedRequest, res: Response) => {
// //   try {
// //     const { senderId } = req.body; 
// //     await Message.updateMany({ sender: senderId, recipient: req.user!.id, isRead: false }, { $set: { isRead: true } });
// //     res.json({ success: true });
// //   } catch (err: any) { res.status(500).json({ error: err.message }); }
// // };

// import { Request, Response } from 'express';
// import { Message } from '../models/Message';
// import { User } from '../models/User';

// // Kirim Pesan
// export const sendMessage = async (req: Request, res: Response) => {
//     try {
//         const { recipientId, message, type, topic, attachment } = req.body;
//         const senderId = (req as any).user._id;

//         const newMessage = new Message({
//             sender: senderId,
//             recipient: recipientId || null,
//             message,
//             type: type || 'personal',
//             topic: topic || null, // Bisa berupa courseId atau blogId
//             attachment: attachment || null,
//             isRead: false
//         });

//         await newMessage.save();
//         await newMessage.populate('sender', 'name avatarUrl role');

//         res.status(201).json(newMessage);
//     } catch (error) {
//         res.status(500).json({ error: 'Gagal mengirim pesan' });
//     }
// };

// // Ambil Pesan Global (FIXED: Sekarang mengambil data dari DB)
// export const getGlobalMessages = async (req: Request, res: Response) => {
//     try {
//         const messages = await Message.find({ type: 'global' })
//             .sort({ createdAt: 1 }) // Urut dari lama ke baru
//             .limit(100) // Batasi 100 pesan terakhir
//             .populate('sender', 'name avatarUrl role')
//             .lean();
        
//         res.status(200).json(messages);
//     } catch (error) {
//         console.error("Global chat error:", error);
//         res.status(500).json({ error: 'Gagal memuat pesan global' });
//     }
// };

// // Ambil User untuk Chat
// export const getChatUsers = async (req: Request, res: Response) => {
//     try {
//         const users = await User.find({}, 'name avatarUrl role email');
//         res.status(200).json(users);
//     } catch (error) {
//         res.status(500).json({ error: 'Gagal ambil user' });
//     }
// };

// // Hitung Unread Personal
// export const getUnreadCount = async (req: Request, res: Response) => {
//     try {
//         const userId = (req as any).user._id;
//         const count = await Message.countDocuments({ recipient: userId, isRead: false });
//         res.status(200).json({ count });
//     } catch (error) {
//         res.status(500).json({ error: 'Error' });
//     }
// };

// // Hitung Pesan Grup (Course)
// export const getGroupMessageCount = async (req: Request, res: Response) => {
//     try {
//         const { courseId } = req.params;
//         const count = await Message.countDocuments({ topic: courseId });
//         res.status(200).json({ count });
//     } catch (error) {
//         res.status(500).json({ error: 'Gagal menghitung pesan grup' });
//     }
// };

// // Ambil Pesan Personal
// export const getMessagesWithUser = async (req: Request, res: Response) => {
//     try {
//         const { otherUserId } = req.params;
//         const myId = (req as any).user._id;
//         const messages = await Message.find({
//             $or: [
//                 { sender: myId, recipient: otherUserId },
//                 { sender: otherUserId, recipient: myId }
//             ]
//         }).sort({ createdAt: 1 }).populate('sender', 'name avatarUrl');
//         res.status(200).json({ messages });
//     } catch (error) {
//         res.status(500).json({ error: 'Error fetching messages' });
//     }
// };

// // Get Conversations List
// export const getConversations = async (req: Request, res: Response) => {
//     try {
//         // Implementasi sederhana: list user
//         const users = await User.find({}, 'name avatarUrl role');
//         res.status(200).json(users); 
//     } catch (error) {
//         res.status(500).json({ error: 'Error' });
//     }
// };

// // Mark as Read
// export const markAsRead = async (req: Request, res: Response) => {
//     try {
//         const userId = (req as any).user._id;
//         await Message.updateMany({ recipient: userId, isRead: false }, { isRead: true });
//         res.status(200).json({ success: true });
//     } catch (error) {
//         res.status(500).json({ error: 'Gagal update status baca' });
//     }
// };

import { Request, Response } from 'express';
import { Message } from '../models/Message';
import { User } from '../models/User';

const getUserId = (req: any) => req.user?.id || req.user?._id;

// --- SEND MESSAGE (CRITICAL FIX: Handle Recipient Null) ---
export const sendMessage = async (req: Request, res: Response) => {
    try {
        const { recipientId, message, type, topic, attachment } = req.body;
        const senderId = getUserId(req);

        if (!senderId) return res.status(401).json({ error: "Unauthorized" });

        // Validasi agar tidak mengirim pesan kosong
        if ((!message || !message.trim()) && !attachment) {
            return res.status(400).json({ error: 'Pesan tidak boleh kosong' });
        }

        // [FIX] Pastikan recipient undefined jika Global/Group Chat
        // Mongoose akan error jika kita memaksa string kosong "" menjadi ObjectId
        let finalRecipient = undefined;
        if (type === 'personal' && recipientId && recipientId.length === 24) {
            finalRecipient = recipientId;
        }

        const newMessage = new Message({
            sender: senderId,
            recipient: finalRecipient, 
            message: message || '',
            type: type || 'personal',
            topic: topic || null, // Course ID atau Forum ID
            attachment: attachment || null,
            isRead: false
        });

        await newMessage.save();
        await newMessage.populate('sender', 'name avatarUrl role');

        res.status(201).json(newMessage);
    } catch (error: any) {
        console.error("Chat Send Error:", error);
        res.status(500).json({ error: 'Gagal mengirim pesan' });
    }
};

// --- GET GLOBAL MESSAGES ---
export const getGlobalMessages = async (req: Request, res: Response) => {
    try {
        const messages = await Message.find({ type: 'global' })
            .sort({ createdAt: 1 })
            .limit(100)
            .populate('sender', 'name avatarUrl role')
            .lean();
        res.status(200).json(messages);
    } catch (error) { res.status(500).json({ error: 'Gagal load chat' }); }
};

// --- GET CONVERSATIONS (PERSONAL) ---
export const getConversations = async (req: Request, res: Response) => {
    try {
        const myId = getUserId(req);
        const messages = await Message.find({
            $or: [{ sender: myId }, { recipient: myId }],
            type: 'personal'
        }).sort({ createdAt: -1 });

        const interactors = new Set<string>();
        messages.forEach(msg => {
            if (msg.sender.toString() !== myId.toString()) interactors.add(msg.sender.toString());
            if (msg.recipient && msg.recipient.toString() !== myId.toString()) interactors.add(msg.recipient.toString());
        });

        const users = await User.find({ _id: { $in: Array.from(interactors) } }).select('name avatarUrl role email');
        res.status(200).json(users); 
    } catch (error) { res.status(500).json({ error: 'Error' }); }
};

// --- GET MESSAGES WITH USER ---
export const getMessagesWithUser = async (req: Request, res: Response) => {
    try {
        const { otherUserId } = req.params;
        const myId = getUserId(req);
        const messages = await Message.find({
            $or: [
                { sender: myId, recipient: otherUserId },
                { sender: otherUserId, recipient: myId }
            ]
        }).sort({ createdAt: 1 }).populate('sender', 'name avatarUrl');
        res.status(200).json({ messages });
    } catch (error) { res.status(500).json({ error: 'Error' }); }
};

// --- UTILS & COUNTS ---
export const getChatUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find({}, 'name avatarUrl role email');
        res.status(200).json(users);
    } catch (error) { res.status(500).json({ error: 'Error' }); }
};

export const getUnreadCount = async (req: Request, res: Response) => {
    try {
        const userId = getUserId(req);
        const count = await Message.countDocuments({ recipient: userId, isRead: false });
        res.status(200).json({ count });
    } catch (error) { res.status(500).json({ error: 'Error' }); }
};

// [RESTORED] Fungsi untuk menghitung pesan grup (Course Chat)
export const getGroupMessageCount = async (req: Request, res: Response) => {
    try {
        const { courseId } = req.params;
        const count = await Message.countDocuments({ topic: courseId });
        res.status(200).json({ count });
    } catch (error) { res.status(500).json({ error: 'Error' }); }
};

export const markAsRead = async (req: Request, res: Response) => {
    try {
        const userId = getUserId(req);
        await Message.updateMany({ recipient: userId, isRead: false }, { isRead: true });
        res.status(200).json({ success: true });
    } catch (error) { res.status(500).json({ error: 'Error' }); }
};
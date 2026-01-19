import { Request, Response } from 'express';
import { Notification } from '../models/Notification';
import { User } from '../models/User';

// 1. CREATE NOTIFICATION (Termasuk Broadcast)
export const createNotification = async (req: Request, res: Response) => {
  try {
    const { recipient, type, message, targetUrl, roleTarget, topic } = req.body;
    
    // Ambil ID pengirim dari token (jika ada), jika tidak ada anggap System (null)
    const sender = (req as any).user ? (req as any).user._id : null; 

    // [FIX URL] Paksa URL agar selalu ke admin courses jika tipe reply/course
    // Ini mencegah link lari ke /forum yang menyebabkan error 404
    let fixedTargetUrl = targetUrl;
    if (topic && (type === 'reply' || type === 'course')) {
        // Format link yang benar untuk membuka Modal di halaman Admin/Fasilitator
        fixedTargetUrl = `/admin/courses?highlight=${topic}`;
    }

    // SKENARIO A: BROADCAST KE SEMUA ADMIN (Case Insensitive Regex)
    if (roleTarget === 'ADMIN') {
      // Cari user dengan role yang mengandung kata "admin" (Admin, Super Admin, SUPER_ADMIN)
      const admins = await User.find({ role: { $regex: /admin/i } });
      
      if (!admins.length) {
        return res.status(404).json({ message: 'No admins found' });
      }

      const notifications = admins.map((admin: any) => ({
        recipient: admin._id,
        sender: sender,
        type: type || 'system',
        message: message,
        targetUrl: fixedTargetUrl, // Gunakan URL yang sudah diperbaiki
        topic: topic,
        isRead: false,
        createdAt: new Date()
      }));

      await Notification.insertMany(notifications);
      return res.status(201).json({ message: 'Broadcast sent to Admins' });
    }

    // SKENARIO B: PERSONAL (Single User)
    if (!recipient) {
        return res.status(400).json({ message: 'Recipient ID is required' });
    }

    const newNotification = new Notification({
      recipient, 
      sender, 
      type, 
      message, 
      targetUrl: fixedTargetUrl, // Gunakan URL yang sudah diperbaiki
      topic
    });

    await newNotification.save();
    res.status(201).json(newNotification);

  } catch (error: any) {
    console.error("Create Notif Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// 2. GET USER NOTIFICATIONS (FIXED: Safe Mapping untuk Bell)
export const getNotifications = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user._id;
        const { limit } = req.query;

        // Gunakan .lean() agar return Object JS biasa (bukan Mongoose Document)
        // Ini penting agar kita bisa memodifikasi properti 'sender' di bawah
        const notifs = await Notification.find({ recipient: userId })
            .populate('sender', 'name avatarUrl role') 
            .sort({ createdAt: -1 })
            .limit(limit ? parseInt(limit as string) : 20)
            .lean();

        // [SAFE MAPPING]
        // Jika sender null (karena user dihapus atau notifikasi sistem), 
        // ganti dengan object default 'Sistem'.
        // Ini mengatasi masalah "Bell ada angka tapi list kosong/error".
        const safeNotifs = notifs.map((n: any) => ({
            ...n,
            sender: n.sender || { name: 'Sistem', role: 'SYSTEM', avatarUrl: null }
        }));

        res.json({ notifications: safeNotifs });
    } catch (error: any) {
        console.error("Get Notif Error:", error);
        res.status(500).json({ message: error.message });
    }
};

// 3. GET UNREAD COUNT
export const getUnreadCount = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user._id;
        const count = await Notification.countDocuments({ recipient: userId, isRead: false });
        res.json({ count });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// 4. GET UNREAD TOPICS (Untuk Badge Icon Mata)
export const getUnreadTopics = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user._id;
        
        // Cari notifikasi unread milik user ini yang punya field topic
        const unreadNotifs = await Notification.find(
            { recipient: userId, isRead: false, topic: { $exists: true, $ne: null } }, 
            { topic: 1 } 
        ).lean();
        
        // Ambil unique topics ID dan filter yang valid
        const topics = [...new Set(
            unreadNotifs
                .map((n: any) => n.topic?.toString()) 
                .filter((t: any) => !!t) 
        )];
        
        res.json({ topics });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// 5. MARK AS READ
export const markAsRead = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user._id;
        const { id } = req.params;

        if (id) {
            await Notification.findOneAndUpdate({ _id: id, recipient: userId }, { isRead: true });
        } else {
            await Notification.updateMany({ recipient: userId, isRead: false }, { isRead: true });
        }
        res.json({ message: 'Read' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// 6. DELETE ALL NOTIFICATIONS (Untuk Membersihkan Bug)
export const deleteAllNotifications = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user._id;
        await Notification.deleteMany({ recipient: userId });
        res.json({ message: 'Semua notifikasi berhasil dihapus.' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
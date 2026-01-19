import { Request, Response } from 'express';
import { Notification } from '../models/Notification';
import { User } from '../models/User';

// 1. CREATE NOTIFICATION
export const createNotification = async (req: Request, res: Response) => {
  try {
    const { recipient, type, message, targetUrl, roleTarget, topic } = req.body;
    const sender = (req as any).user ? (req as any).user._id : null; 

    // BROADCAST KE SEMUA ADMIN (Case Insensitive)
    if (roleTarget === 'ADMIN') {
      const admins = await User.find({ role: { $regex: /admin/i } });
      if (!admins.length) return res.status(404).json({ message: 'No admins found' });

      const notifications = admins.map((admin: any) => ({
        recipient: admin._id,
        sender: sender,
        type: type || 'system',
        message: message,
        targetUrl: targetUrl,
        topic: topic,
        isRead: false,
        createdAt: new Date()
      }));

      await Notification.insertMany(notifications);
      return res.status(201).json({ message: 'Broadcast sent' });
    }

    // PERSONAL
    if (!recipient) return res.status(400).json({ message: 'Recipient required' });

    const newNotification = new Notification({
      recipient, sender, type, message, targetUrl, topic
    });

    await newNotification.save();
    res.status(201).json(newNotification);

  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// 2. GET USER NOTIFICATIONS (FIXED BELL KOSONG)
export const getNotifications = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user._id;
        const { limit } = req.query;

        // Gunakan .lean() agar return Object JS biasa (bukan Mongoose Document)
        const notifs = await Notification.find({ recipient: userId })
            .populate('sender', 'name avatarUrl role') 
            .sort({ createdAt: -1 })
            .limit(limit ? parseInt(limit as string) : 20)
            .lean();

        // Safe Mapping: Handle jika sender null (user dihapus atau sistem)
        const safeNotifs = notifs.map((n: any) => ({
            ...n,
            sender: n.sender || { name: 'Sistem', role: 'SYSTEM', avatarUrl: null }
        }));

        res.json({ notifications: safeNotifs });
    } catch (error: any) {
        console.error("Notif Error:", error);
        res.status(500).json({ message: error.message });
    }
};

// 3. GET UNREAD COUNT
export const getUnreadCount = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user._id;
        const count = await Notification.countDocuments({ recipient: userId, isRead: false });
        res.json({ count });
    } catch (error: any) { res.status(500).json({ message: error.message }); }
};

// 4. GET UNREAD TOPICS
export const getUnreadTopics = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user._id;
        const unreadNotifs = await Notification.find(
            { recipient: userId, isRead: false, topic: { $exists: true, $ne: null } }, 
            { topic: 1 } 
        ).lean();
        
        const topics = [...new Set(
            unreadNotifs
                .map((n: any) => n.topic?.toString()) 
                .filter((t: any) => !!t) 
        )];
        
        res.json({ topics });
    } catch (error: any) { res.status(500).json({ message: error.message }); }
};

// 5. MARK READ
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
    } catch (error: any) { res.status(500).json({ message: error.message }); }
};
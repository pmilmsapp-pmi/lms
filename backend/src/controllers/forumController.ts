import { Request, Response } from 'express';
import { Forum } from '../models/Forum';

// 1. BUAT TOPIK (Create)
export const createTopic = async (req: any, res: Response) => {
  try {
    const { title, content, category } = req.body;
    const userRole = req.user.role;

    // LOGIKA UTAMA:
    // Jika Facilitator/Admin -> Langsung Approved
    // Jika Student -> Pending
    const initialStatus = (userRole === 'FACILITATOR' || userRole === 'SUPER_ADMIN') 
                          ? 'approved' 
                          : 'pending';

    const topic = await Forum.create({
      title,
      content,
      category,
      creator: req.user.id,
      status: initialStatus
    });

    res.status(201).json({ message: 'Topik dibuat', topic });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// 2. AMBIL TOPIK (Get All)
export const getTopics = async (req: any, res: Response) => {
  try {
    const { status, category } = req.query;
    const filter: any = {};

    // Filter status (default: approved)
    if (status) {
        filter.status = status;
    } else {
        // Jika user biasa hanya lihat approved, Admin bisa request pending via query
        filter.status = 'approved'; 
    }

    if (category && category !== 'Semua') {
        filter.category = category;
    }

    const topics = await Forum.find(filter)
      .populate('creator', 'name role avatarUrl')
      .sort({ createdAt: -1 });

    res.json({ topics });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// 3. APPROVE / REJECT TOPIK (Admin Only)
export const updateTopicStatus = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'approved' or 'rejected'

    const topic = await Forum.findByIdAndUpdate(id, { status }, { new: true });
    res.json({ message: `Topik berhasil di-${status}`, topic });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// 4. HITUNG PENDING (Untuk Notifikasi)
export const getPendingCount = async (req: any, res: Response) => {
  try {
    const count = await Forum.countDocuments({ status: 'pending' });
    res.json({ count });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
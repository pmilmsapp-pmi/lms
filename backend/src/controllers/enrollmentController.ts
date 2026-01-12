import { Response } from 'express';
import Enrollment from '../models/Enrollment';
import { AuthedRequest } from '../middleware/auth';

// --- GET MY ENROLLMENTS (Untuk Katalog & Dashboard Siswa) ---
export const getMyEnrollments = async (req: AuthedRequest, res: Response) => {
  try {
    // [FIX] Hapus .userId, gunakan .id saja sesuai definisi Type
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Ambil data Enrollment agar status PENDING terlihat
    const enrollments = await Enrollment.find({ user: userId })
      .populate('course', 'title thumbnailUrl programType price') 
      .sort({ updatedAt: -1 });

    res.json({ enrollments });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// --- CHECK STATUS (Untuk Halaman Player/Detail) ---
export const checkEnrollmentStatus = async (req: AuthedRequest, res: Response) => {
    try {
        const { courseId } = req.params;
        // [FIX] Hapus .userId, gunakan .id saja
        const userId = req.user?.id;
        
        const enrollment = await Enrollment.findOne({ user: userId, course: courseId });
        
        if (!enrollment) {
            return res.json({ isEnrolled: false, status: null });
        }

        res.json({ 
            isEnrolled: true, 
            status: enrollment.status, 
            progress: enrollment.progress 
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
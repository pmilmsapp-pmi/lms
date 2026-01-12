import { Request, Response } from 'express';
import { User } from '../models/User'; // Sesuaikan huruf besar/kecil nama file model Anda
import { Progress } from '../models/Progress';
import { Course } from '../models/Course';

// --- 1. GET PUBLIC USER DETAIL (Untuk Header Chat) ---
export const getUserDetail = async (req: Request, res: Response) => {
  try {
    // Ambil ID dari parameter URL
    const { id } = req.params;
    
    // Cari user, hanya ambil field yang aman (nama, role, foto)
    const user = await User.findById(id).select('name role avatarUrl email');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// --- 2. GET MY PROFILE (Untuk Halaman Profil) ---
export const getMe = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;

    // A. Ambil Data User
    const user = await User.findById(userId).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });

    // B. Ambil Progress (Sejarah Pelatihan)
    // Kita cari semua progress milik user ini dan populate data kursusnya
    const progresses = await Progress.find({ userId }).populate('courseId', 'title thumbnailUrl');

    // Format Data History
    const history = progresses.map((p: any) => {
       // Hitung persentase kelulusan simpel (jumlah lesson selesai / total lesson di kursus)
       // Catatan: Ini estimasi kasar jika tidak mau query berat ke Course. 
       // Idealnya field 'progressPercent' disimpan di model Progress.
       const isCompleted = p.completed; 
       return {
           _id: p._id,
           courseId: p.courseId, // Berisi title & thumbnail
           completed: isCompleted,
           progress: isCompleted ? 100 : (p.completedLessons.length > 0 ? 50 : 0) // Mockup progress
       };
    });

    // C. Ambil Sertifikat (Mockup logic: jika course completed = dapat sertifikat)
    // Nanti Anda bisa buat Model Certificate terpisah jika butuh nomor seri, tgl terbit, dll.
    const certificates = progresses
        .filter((p: any) => p.completed) // Hanya yang selesai
        .map((p: any, idx: number) => ({
            _id: `cert-${p._id}`,
            course: p.courseId,
            certificateNumber: `PMI-${new Date().getFullYear()}-${idx + 1000}`,
            issueDate: p.updatedAt,
            status: 'issued'
        }));

    res.json({
        user,
        history,
        certificates
    });

  } catch (error: any) {
    console.error("Get Profile Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// --- 3. UPDATE PROFILE ---
export const updateProfile = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    const { name, avatarUrl } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (name) user.name = name;
    if (avatarUrl) user.avatarUrl = avatarUrl;

    await user.save();

    res.json({ message: 'Profile updated', user });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
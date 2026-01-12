import { Request, Response } from 'express';
import { Blog } from '../models/Blog'; // Pastikan path model benar

// --- GET PUBLIC BLOGS (Untuk Halaman Depan & Dashboard) ---
export const getPublicBlogs = async (req: Request, res: Response) => {
    try {
        const { search, page = 1, limit = 9 } = req.query;
        const query: any = { isPublished: true }; // Hanya ambil yang sudah publish

        // Fitur Search Judul
        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }

        const blogs = await Blog.find(query)
            .sort({ createdAt: -1 }) // Terbaru di atas
            .skip((Number(page) - 1) * Number(limit))
            .limit(Number(limit))
            .populate('author', 'name avatarUrl');

        const total = await Blog.countDocuments(query);

        res.json({
            data: blogs,
            pagination: {
                total,
                page: Number(page),
                pages: Math.ceil(total / Number(limit))
            }
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// --- GET PUBLIC BLOG BY ID (Untuk Halaman Detail) ---
export const getPublicBlogById = async (req: Request, res: Response) => {
    try {
        const blog = await Blog.findOne({ _id: req.params.id, isPublished: true })
            .populate('author', 'name avatarUrl');
        
        if (!blog) return res.status(404).json({ message: "Cerita tidak ditemukan" });
        
        res.json(blog);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// ... (Kode CRUD Admin lainnya tetap di bawah sini: createBlog, updateBlog, deleteBlog, dll)
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { ArrowLeft, Send, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

// Import ReactQuill secara dynamic agar tidak error saat build
const ReactQuill = dynamic(() => import('react-quill'), { 
    ssr: false,
    loading: () => <div className="h-64 bg-gray-50 animate-pulse border rounded-lg"></div>
});

const QUILL_MODULES = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['clean']
    ]
};

export default function CreateForumTopic() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Diskusi Umum');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    // Kategori statis (bisa disesuaikan dengan database jika perlu)
    const categories = ['Diskusi Umum', 'Tanya Jawab', 'Berbagi Pengalaman', 'Materi Pelatihan', 'Info Kegiatan'];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!title.trim() || !content.trim()) {
            return alert("Judul dan isi topik wajib diisi!");
        }

        setLoading(true);
        try {
            await api('/api/forum', {
                method: 'POST',
                body: { title, content, category }
            });
            alert('Topik berhasil diajukan!');
            router.push('/forum'); // Kembali ke list forum
        } catch (e: any) {
            console.error(e);
            alert('Gagal membuat topik: ' + (e.message || "Terjadi kesalahan"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20 font-sans">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
                <div className="max-w-3xl mx-auto px-4 h-16 flex items-center gap-4">
                    <Link href="/forum" className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
                        <ArrowLeft size={20}/>
                    </Link>
                    <h1 className="text-lg font-bold text-gray-800">Buat Topik Baru</h1>
                </div>
            </div>

            {/* Form Container */}
            <div className="max-w-3xl mx-auto px-4 mt-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
                    
                    {/* Info Box */}
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6 flex gap-3 text-blue-800 text-sm">
                        <AlertCircle size={20} className="shrink-0 mt-0.5"/>
                        <p>Pastikan topik diskusi Anda sopan, jelas, dan relevan dengan kegiatan komunitas. Topik baru mungkin memerlukan persetujuan admin sebelum tampil.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        {/* Judul */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Judul Diskusi <span className="text-red-500">*</span></label>
                            <input 
                                type="text" 
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-400"
                                placeholder="Contoh: Bagaimana cara menangani luka bakar ringan saat bertugas?"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                disabled={loading}
                            />
                        </div>

                        {/* Kategori */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Kategori</label>
                            <div className="flex flex-wrap gap-2">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        type="button"
                                        onClick={() => setCategory(cat)}
                                        className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                                            category === cat 
                                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' 
                                            : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                                        }`}
                                        disabled={loading}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Konten Rich Text */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Isi Diskusi <span className="text-red-500">*</span></label>
                            <div className="bg-white rounded-lg border border-gray-300 overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
                                <ReactQuill 
                                    theme="snow" 
                                    value={content} 
                                    onChange={setContent} 
                                    className="h-64 mb-12"
                                    placeholder="Jelaskan pertanyaan atau topik Anda secara detail..."
                                    modules={QUILL_MODULES}
                                    readOnly={loading}
                                />
                            </div>
                        </div>

                        {/* Tombol Submit */}
                        <div className="flex justify-end pt-4 border-t border-gray-100">
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform active:scale-95"
                            >
                                {loading ? (
                                    <>Memproses...</>
                                ) : (
                                    <><Send size={18}/> Terbitkan Topik</>
                                )}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}
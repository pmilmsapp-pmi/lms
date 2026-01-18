// // 'use client';

// // import { useState } from 'react';
// // import { useRouter } from 'next/navigation';
// // import { api } from '@/lib/api'; 
// // import { useAuth } from '@/lib/AuthProvider';
// // import Swal from 'sweetalert2';
// // import { UploadCloud, X, ArrowLeft, Loader2 } from 'lucide-react';

// // export default function CreateBlogPage() {
// //     const router = useRouter();
// //     const { user } = useAuth();
    
// //     const [title, setTitle] = useState('');
// //     const [content, setContent] = useState('');
// //     const [tags, setTags] = useState('');
// //     const [coverFile, setCoverFile] = useState<File | null>(null);
// //     const [coverPreview, setCoverPreview] = useState<string | null>(null);
// //     const [loading, setLoading] = useState(false);

// //     // Handle Image Preview
// //     const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //         if (e.target.files && e.target.files[0]) {
// //             const file = e.target.files[0];
// //             setCoverFile(file);
// //             setCoverPreview(URL.createObjectURL(file));
// //         }
// //     };

// //     // Handle Submit
// //     const handleSubmit = async (e: React.FormEvent) => {
// //         e.preventDefault();
        
// //         if (!title || !content) {
// //             Swal.fire('Error', 'Judul dan Konten wajib diisi!', 'warning');
// //             return;
// //         }

// //         try {
// //             setLoading(true);
// //             let coverUrl = '';

// //             // 1. Upload Gambar Dulu (Jika ada)
// //             if (coverFile) {
// //                 const formData = new FormData();
// //                 formData.append('file', coverFile);
                
// //                 // [FIX 1] Menghapus argumen ke-3 ('true') yang menyebabkan error TypeScript
// //                 // Browser otomatis mengatur Content-Type untuk FormData
// //                 const uploadRes = await api('/api/upload', {
// //                     method: 'POST',
// //                     body: formData, 
// //                 }); 
                
// //                 coverUrl = uploadRes.path || uploadRes.url || uploadRes; 
// //             }

// //             // 2. Submit Blog Data
// //             const payload = {
// //                 title,
// //                 content,
// //                 coverUrl,
// //                 tags: tags.split(',').map(t => t.trim()).filter(t => t),
// //                 status: 'pending' 
// //             };

// //             await api('/api/blog', {
// //                 method: 'POST',
// //                 body: JSON.stringify(payload)
// //             });

// //             await Swal.fire({
// //                 icon: 'success',
// //                 title: 'Berhasil Diajukan!',
// //                 text: 'Cerita Anda telah dikirim dan menunggu persetujuan moderator.',
// //                 confirmButtonColor: '#990000'
// //             });

// //             router.push('/blog'); 

// //         } catch (error: any) {
// //             console.error(error);
// //             Swal.fire('Gagal', error.message || 'Terjadi kesalahan saat mengirim cerita.', 'error');
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     if (!user) return null;

// //     return (
// //         <div className="min-h-screen bg-gray-50 py-12 px-6 font-sans">
// //             <div className="max-w-3xl mx-auto">
                
// //                 {/* Header */}
// //                 <button 
// //                     onClick={() => router.back()} 
// //                     className="flex items-center text-gray-500 hover:text-[#990000] mb-6 transition-colors"
// //                     type="button"
// //                 >
// //                     <ArrowLeft size={20} className="mr-2"/> Kembali
// //                 </button>
                
// //                 <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
// //                     <div className="bg-[#990000] text-white p-8">
// //                         <h1 className="text-3xl font-bold mb-2">Tulis Cerita Relawan</h1>
// //                         <p className="text-red-100">Bagikan pengalaman inspiratif Anda di lapangan kepada dunia.</p>
// //                     </div>

// //                     <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        
// //                         {/* 1. Upload Cover */}
// //                         <div>
// //                             <label className="block text-sm font-bold text-gray-700 mb-2">Foto Sampul</label>
// //                             <div className="relative group">
// //                                 <div className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all ${coverPreview ? 'border-[#990000] bg-red-50' : 'border-gray-300 hover:border-gray-400 bg-gray-50'}`}>
                                    
// //                                     {/* [FIX 2] Menambahkan aria-label dan title untuk aksesibilitas form */}
// //                                     <input 
// //                                         type="file" 
// //                                         accept="image/*" 
// //                                         onChange={handleImageChange}
// //                                         className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
// //                                         aria-label="Upload Foto Sampul"
// //                                         title="Upload Foto Sampul"
// //                                     />
                                    
// //                                     {coverPreview ? (
// //                                         <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-sm">
// //                                             <img src={coverPreview} alt="Preview" className="w-full h-full object-cover" />
// //                                             {/* [FIX 3] Menambahkan aria-label dan title pada tombol icon */}
// //                                             <button 
// //                                                 type="button"
// //                                                 onClick={(e) => {
// //                                                     e.preventDefault(); 
// //                                                     setCoverFile(null); 
// //                                                     setCoverPreview(null);
// //                                                 }}
// //                                                 className="absolute top-2 right-2 bg-white/90 p-2 rounded-full text-red-600 hover:bg-white shadow-md z-10"
// //                                                 aria-label="Hapus gambar"
// //                                                 title="Hapus gambar"
// //                                             >
// //                                                 <X size={18}/>
// //                                             </button>
// //                                         </div>
// //                                     ) : (
// //                                         <div className="text-center py-8">
// //                                             <div className="bg-white p-3 rounded-full shadow-sm inline-block mb-3">
// //                                                 <UploadCloud size={32} className="text-[#990000]"/>
// //                                             </div>
// //                                             <p className="text-sm font-medium text-gray-600">Klik untuk upload foto</p>
// //                                             <p className="text-xs text-gray-400 mt-1">Format: JPG, PNG (Max 5MB)</p>
// //                                         </div>
// //                                     )}
// //                                 </div>
// //                             </div>
// //                         </div>

// //                         {/* 2. Judul */}
// //                         <div>
// //                             <label className="block text-sm font-bold text-gray-700 mb-2">Judul Cerita <span className="text-red-500">*</span></label>
// //                             <input 
// //                                 type="text" 
// //                                 value={title}
// //                                 onChange={(e) => setTitle(e.target.value)}
// //                                 placeholder="Contoh: Pengalaman Mendirikan Tenda di Cianjur"
// //                                 className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-[#990000] transition-all"
// //                                 required
// //                             />
// //                         </div>

// //                         {/* 3. Tags */}
// //                         <div>
// //                             <label className="block text-sm font-bold text-gray-700 mb-2">Tags / Kategori (Pisahkan dengan koma)</label>
// //                             <input 
// //                                 type="text" 
// //                                 value={tags}
// //                                 onChange={(e) => setTags(e.target.value)}
// //                                 placeholder="Bencana, Sosial, Donor Darah..."
// //                                 className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-[#990000] transition-all"
// //                             />
// //                         </div>

// //                         {/* 4. Konten Utama */}
// //                         <div>
// //                             <label className="block text-sm font-bold text-gray-700 mb-2">Isi Cerita <span className="text-red-500">*</span></label>
// //                             <textarea 
// //                                 value={content}
// //                                 onChange={(e) => setContent(e.target.value)}
// //                                 placeholder="Tuliskan pengalaman lengkap Anda di sini..."
// //                                 className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-[#990000] transition-all min-h-[300px]"
// //                                 required
// //                             />
// //                             <p className="text-xs text-gray-400 mt-2 text-right">Anda bisa menggunakan format HTML sederhana jika perlu.</p>
// //                         </div>

// //                         {/* Submit Button */}
// //                         <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-4">
// //                             <button 
// //                                 type="button" 
// //                                 onClick={() => router.back()}
// //                                 className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors"
// //                             >
// //                                 Batal
// //                             </button>
// //                             <button 
// //                                 type="submit" 
// //                                 disabled={loading}
// //                                 className="bg-[#990000] text-white px-8 py-3 rounded-xl font-bold hover:bg-red-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-70 flex items-center gap-2"
// //                             >
// //                                 {loading ? <><Loader2 className="animate-spin" size={20}/> Mengirim...</> : 'Ajukan Cerita'}
// //                             </button>
// //                         </div>

// //                     </form>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }
// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { api } from '@/lib/api'; 
// import { useAuth } from '@/lib/AuthProvider';
// import Swal from 'sweetalert2';
// import { UploadCloud, X, ArrowLeft, Loader2 } from 'lucide-react';
// import RichEditor from '@/components/RichEditor'; // Pastikan path ini benar

// export default function CreateBlogPage() {
//     const router = useRouter();
//     const { user } = useAuth();
    
//     const [title, setTitle] = useState('');
//     const [content, setContent] = useState('');
//     const [tags, setTags] = useState('');
//     const [coverFile, setCoverFile] = useState<File | null>(null);
//     const [coverPreview, setCoverPreview] = useState<string | null>(null);
//     const [loading, setLoading] = useState(false);

//     const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files && e.target.files[0]) {
//             const file = e.target.files[0];
//             setCoverFile(file);
//             setCoverPreview(URL.createObjectURL(file));
//         }
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
        
//         const strippedContent = content.replace(/<(.|\n)*?>/g, '').trim();

//         if (!title || strippedContent.length === 0) {
//             Swal.fire('Error', 'Judul dan Konten wajib diisi!', 'warning');
//             return;
//         }

//         try {
//             setLoading(true);
//             let coverUrl = '';

//             if (coverFile) {
//                 const formData = new FormData();
//                 formData.append('file', coverFile);
//                 const uploadRes = await api('/api/upload', {
//                     method: 'POST',
//                     body: formData, 
//                 }); 
//                 coverUrl = uploadRes.path || uploadRes.url || uploadRes; 
//             }

//             const payload = {
//                 title,
//                 content, 
//                 coverUrl,
//                 tags: tags.split(',').map(t => t.trim()).filter(t => t),
//                 status: 'pending' 
//             };

//             await api('/api/blog', {
//                 method: 'POST',
//                 body: JSON.stringify(payload)
//             });

//             await Swal.fire({
//                 icon: 'success',
//                 title: 'Berhasil Diajukan!',
//                 text: 'Cerita Anda telah dikirim dan menunggu persetujuan moderator.',
//                 confirmButtonColor: '#990000'
//             });

//             router.push('/blog'); 

//         } catch (error: any) {
//             console.error(error);
//             Swal.fire('Gagal', error.message || 'Terjadi kesalahan.', 'error');
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (!user) return null;

//     return (
//         <div className="min-h-screen bg-gray-50 py-12 px-6 font-sans">
//             <div className="max-w-3xl mx-auto">
//                 <button 
//                     onClick={() => router.back()} 
//                     className="flex items-center text-gray-500 hover:text-[#990000] mb-6 transition-colors"
//                     type="button"
//                 >
//                     <ArrowLeft size={20} className="mr-2"/> Kembali
//                 </button>
                
//                 <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
//                     <div className="bg-[#990000] text-white p-8">
//                         <h1 className="text-3xl font-bold mb-2">Tulis Cerita Relawan</h1>
//                         <p className="text-red-100">Bagikan pengalaman inspiratif Anda di lapangan kepada dunia.</p>
//                     </div>

//                     <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        
//                         {/* 1. Upload Cover */}
//                         <div>
//                             <label className="block text-sm font-bold text-gray-700 mb-2">Foto Sampul</label>
//                             <div className="relative group">
//                                 <div className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all ${coverPreview ? 'border-[#990000] bg-red-50' : 'border-gray-300 hover:border-gray-400 bg-gray-50'}`}>
                                    
//                                     {/* [FIX] Tambahkan aria-label dan title */}
//                                     <input 
//                                         type="file" 
//                                         accept="image/*" 
//                                         onChange={handleImageChange}
//                                         className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                                         aria-label="Upload Foto Sampul"
//                                         title="Upload Foto Sampul"
//                                     />
                                    
//                                     {coverPreview ? (
//                                         <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-sm">
//                                             <img src={coverPreview} alt="Preview" className="w-full h-full object-cover" />
//                                             {/* [FIX] Tambahkan aria-label dan title */}
//                                             <button 
//                                                 type="button"
//                                                 onClick={(e) => {
//                                                     e.preventDefault(); 
//                                                     setCoverFile(null); 
//                                                     setCoverPreview(null);
//                                                 }}
//                                                 className="absolute top-2 right-2 bg-white/90 p-2 rounded-full text-red-600 hover:bg-white shadow-md z-10"
//                                                 aria-label="Hapus gambar"
//                                                 title="Hapus gambar"
//                                             >
//                                                 <X size={18}/>
//                                             </button>
//                                         </div>
//                                     ) : (
//                                         <div className="text-center py-8">
//                                             <div className="bg-white p-3 rounded-full shadow-sm inline-block mb-3">
//                                                 <UploadCloud size={32} className="text-[#990000]"/>
//                                             </div>
//                                             <p className="text-sm font-medium text-gray-600">Klik untuk upload foto</p>
//                                             <p className="text-xs text-gray-400 mt-1">Format: JPG, PNG (Max 5MB)</p>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>

//                         {/* 2. Judul & Tags */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div>
//                                 <label className="block text-sm font-bold text-gray-700 mb-2">Judul Cerita <span className="text-red-500">*</span></label>
//                                 <input 
//                                     type="text" 
//                                     value={title}
//                                     onChange={(e) => setTitle(e.target.value)}
//                                     placeholder="Contoh: Pengalaman Mendirikan Tenda"
//                                     className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500/20"
//                                     required
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-bold text-gray-700 mb-2">Tags / Kategori</label>
//                                 <input 
//                                     type="text" 
//                                     value={tags}
//                                     onChange={(e) => setTags(e.target.value)}
//                                     placeholder="Bencana, Sosial..."
//                                     className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500/20"
//                                 />
//                             </div>
//                         </div>

//                         {/* 3. Konten Utama (Rich Editor) */}
//                         <div>
//                             <label className="block text-sm font-bold text-gray-700 mb-2">Isi Cerita <span className="text-red-500">*</span></label>
//                             <RichEditor 
//                                 value={content}
//                                 onChange={setContent}
//                                 placeholder="Tuliskan pengalaman lengkap Anda di sini..."
//                             />
//                         </div>

//                         {/* Submit Button */}
//                         <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-4">
//                             <button 
//                                 type="button" 
//                                 onClick={() => router.back()}
//                                 className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors"
//                             >
//                                 Batal
//                             </button>
//                             <button 
//                                 type="submit" 
//                                 disabled={loading}
//                                 className="bg-[#990000] text-white px-8 py-3 rounded-xl font-bold hover:bg-red-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-70 flex items-center gap-2"
//                             >
//                                 {loading ? <><Loader2 className="animate-spin" size={20}/> Mengirim...</> : 'Ajukan Cerita'}
//                             </button>
//                         </div>

//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }


'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api, apiUpload } from '@/lib/api';
import { ArrowLeft, Send, UploadCloud, X, Video, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

// Rich Text Editor (Dynamic Import)
const ReactQuill = dynamic(() => import('react-quill'), { 
    ssr: false,
    loading: () => <div className="h-80 bg-gray-50 animate-pulse border rounded-lg">Loading Editor...</div>
});

// [FITUR BARU] Konfigurasi Toolbar Lengkap (Gambar & Video)
const QUILL_MODULES = {
    toolbar: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'align': [] }],
        ['link', 'image', 'video'], // Tombol Image & Video ada disini
        ['clean']
    ]
};

export default function CreateUserBlogPage() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const [tags, setTags] = useState('');
    
    // [FITUR BARU] Checkbox Komentar (Default: Aktif)
    const [allowComments, setAllowComments] = useState(true);
    
    const [loading, setLoading] = useState(false);

    // Handle Gambar Sampul
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setCoverImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return alert("Judul dan isi cerita wajib diisi!");

        setLoading(true);
        try {
            let coverUrl = '';
            
            // 1. Upload Sampul jika ada
            if (coverImage) {
                const formData = new FormData();
                formData.append('file', coverImage);
                const uploadRes: any = await apiUpload('/api/upload', formData);
                coverUrl = uploadRes.url || uploadRes.file?.path;
            }

            // 2. Submit Data Blog
            await api('/api/blog', {
                method: 'POST',
                body: { 
                    title, 
                    content, 
                    coverUrl, 
                    tags: tags.split(',').map(t => t.trim()).filter(Boolean),
                    allowComments // Kirim status checkbox ke backend
                }
            });

            alert('Cerita berhasil dikirim! Menunggu persetujuan admin.');
            router.push('/blog'); 
        } catch (e: any) {
            alert('Gagal mengirim cerita: ' + e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20 font-sans">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
                <div className="max-w-4xl mx-auto px-4 h-16 flex items-center gap-4">
                    <Link href="/blog" className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
                        <ArrowLeft size={20}/>
                    </Link>
                    <h1 className="text-lg font-bold text-gray-800">Tulis Cerita Relawan</h1>
                </div>
            </div>

            {/* Form */}
            <div className="max-w-4xl mx-auto px-4 mt-8">
                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 space-y-6">
                    
                    {/* Judul */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Judul Cerita <span className="text-red-500">*</span></label>
                        <input 
                            type="text" 
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-red-500 outline-none transition-all placeholder:text-gray-400"
                            placeholder="Berikan judul yang menarik..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>

                    {/* Foto Sampul */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Foto Sampul</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:bg-gray-50 transition-colors relative">
                            {previewUrl ? (
                                <div className="relative h-48 w-full">
                                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover rounded-lg"/>
                                    <button 
                                        type="button"
                                        onClick={() => { setCoverImage(null); setPreviewUrl(''); }}
                                        className="absolute top-2 right-2 bg-white/80 p-1 rounded-full text-red-600 hover:bg-white"
                                        title="Hapus Foto"
                                    >
                                        <X size={18}/>
                                    </button>
                                </div>
                            ) : (
                                <label className="cursor-pointer flex flex-col items-center justify-center h-32">
                                    <UploadCloud size={32} className="text-gray-400 mb-2"/>
                                    <span className="text-sm text-gray-500">Klik untuk upload foto sampul</span>
                                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} disabled={loading}/>
                                </label>
                            )}
                        </div>
                    </div>

                    {/* Konten Editor (Gambar & Video Enabled) */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Isi Cerita <span className="text-red-500">*</span></label>
                        <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
                            <ReactQuill 
                                theme="snow" 
                                value={content} 
                                onChange={setContent} 
                                className="h-96 mb-12"
                                placeholder="Tuliskan pengalaman Anda. Anda bisa menyisipkan gambar atau link video YouTube disini..."
                                modules={QUILL_MODULES} // [PENTING] Modul aktif
                                readOnly={loading}
                            />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            Tip: Gunakan tombol <ImageIcon size={12} className="inline"/> untuk upload gambar di dalam artikel, dan <Video size={12} className="inline"/> untuk link video YouTube.
                        </p>
                    </div>

                    {/* Tags & Pengaturan */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Tags (Pisahkan koma)</label>
                            <input 
                                type="text" 
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-red-500 outline-none"
                                placeholder="Contoh: Kemanusiaan, PMR, Donor"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                disabled={loading}
                            />
                        </div>

                        {/* [FITUR BARU] Checkbox Komentar */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Pengaturan</label>
                            <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-3 h-[50px]">
                                <input 
                                    id="allowComments"
                                    type="checkbox" 
                                    className="w-5 h-5 text-red-600 rounded focus:ring-red-500 border-gray-300 cursor-pointer"
                                    checked={allowComments}
                                    onChange={(e) => setAllowComments(e.target.checked)}
                                    disabled={loading}
                                />
                                <label htmlFor="allowComments" className="text-sm text-gray-700 cursor-pointer select-none">
                                    Izinkan orang lain berkomentar
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="flex justify-end pt-6 border-t border-gray-100">
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="bg-red-600 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-red-700 transition-all disabled:opacity-50 shadow-lg"
                        >
                            {loading ? 'Mengirim...' : <><Send size={18}/> Kirim Cerita</>}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
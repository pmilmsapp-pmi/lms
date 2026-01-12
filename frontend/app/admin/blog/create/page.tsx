// // 'use client';

// // import { useState } from 'react';
// // import { useRouter } from 'next/navigation';
// // import { api } from '@/lib/api';
// // import Swal from 'sweetalert2';
// // import { UploadCloud, X, ArrowLeft, Loader2 } from 'lucide-react';

// // export default function AdminCreateBlogPage() {
// //     const router = useRouter();
// //     const [title, setTitle] = useState('');
// //     const [content, setContent] = useState('');
// //     const [tags, setTags] = useState('');
// //     const [coverFile, setCoverFile] = useState<File | null>(null);
// //     const [coverPreview, setCoverPreview] = useState<string | null>(null);
// //     const [loading, setLoading] = useState(false);

// //     const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //         if (e.target.files && e.target.files[0]) {
// //             const file = e.target.files[0];
// //             setCoverFile(file);
// //             setCoverPreview(URL.createObjectURL(file));
// //         }
// //     };

// //     const handleSubmit = async (e: React.FormEvent) => {
// //         e.preventDefault();
        
// //         if (!title || !content) {
// //             Swal.fire('Error', 'Judul dan Konten wajib diisi!', 'warning');
// //             return;
// //         }

// //         try {
// //             setLoading(true);
// //             let coverUrl = '';

// //             if (coverFile) {
// //                 const formData = new FormData();
// //                 formData.append('file', coverFile);
// //                 const uploadRes = await api('/api/upload', {
// //                     method: 'POST',
// //                     body: formData, 
// //                 }); 
// //                 coverUrl = uploadRes.path || uploadRes.url || uploadRes; 
// //             }

// //             const payload = {
// //                 title,
// //                 content,
// //                 coverUrl,
// //                 tags: tags.split(',').map(t => t.trim()).filter(t => t),
// //                 status: 'approved' // KHUSUS ADMIN: LANGSUNG APPROVED
// //             };

// //             await api('/api/blog', {
// //                 method: 'POST',
// //                 body: JSON.stringify(payload)
// //             });

// //             await Swal.fire({
// //                 icon: 'success',
// //                 title: 'Berhasil!',
// //                 text: 'Berita baru telah diterbitkan.',
// //                 confirmButtonColor: '#990000'
// //             });

// //             router.push('/admin/blog'); // Kembali ke Admin Panel

// //         } catch (error: any) {
// //             console.error(error);
// //             Swal.fire('Gagal', error.message || 'Terjadi kesalahan.', 'error');
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     return (
// //         <div className="min-h-screen bg-gray-50 p-6 font-sans">
// //             <div className="max-w-4xl mx-auto">
// //                 <div className="flex items-center justify-between mb-6">
// //                     <button 
// //                         onClick={() => router.back()} 
// //                         className="flex items-center text-gray-500 hover:text-[#990000] transition-colors"
// //                         type="button"
// //                     >
// //                         <ArrowLeft size={20} className="mr-2"/> Kembali
// //                     </button>
// //                     <h1 className="text-2xl font-bold text-gray-800">Tulis Berita Baru (Admin)</h1>
// //                 </div>
                
// //                 <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-8">
// //                     <form onSubmit={handleSubmit} className="space-y-6">
                        
// //                         {/* Upload Cover */}
// //                         <div>
// //                             <label className="block text-sm font-bold text-gray-700 mb-2">Foto Sampul</label>
// //                             <div className="relative group">
// //                                 <div className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all ${coverPreview ? 'border-[#990000] bg-red-50' : 'border-gray-300 hover:border-gray-400 bg-gray-50'}`}>
// //                                     <input 
// //                                         type="file" 
// //                                         accept="image/*" 
// //                                         onChange={handleImageChange}
// //                                         className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
// //                                         aria-label="Upload Foto Sampul"
// //                                         title="Upload Foto Sampul"
// //                                     />
// //                                     {coverPreview ? (
// //                                         <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-sm">
// //                                             <img src={coverPreview} alt="Preview" className="w-full h-full object-cover" />
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

// //                         {/* Form Inputs */}
// //                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                             <div>
// //                                 <label className="block text-sm font-bold text-gray-700 mb-2">Judul Berita <span className="text-red-500">*</span></label>
// //                                 <input 
// //                                     type="text" 
// //                                     value={title}
// //                                     onChange={(e) => setTitle(e.target.value)}
// //                                     placeholder="Masukkan judul berita..."
// //                                     className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-[#990000] transition-all"
// //                                     required
// //                                 />
// //                             </div>
// //                             <div>
// //                                 <label className="block text-sm font-bold text-gray-700 mb-2">Tags (Pisahkan koma)</label>
// //                                 <input 
// //                                     type="text" 
// //                                     value={tags}
// //                                     onChange={(e) => setTags(e.target.value)}
// //                                     placeholder="Contoh: Kegiatan, Pelatihan, Donor"
// //                                     className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-[#990000] transition-all"
// //                                 />
// //                             </div>
// //                         </div>

// //                         <div>
// //                             <label className="block text-sm font-bold text-gray-700 mb-2">Konten Berita <span className="text-red-500">*</span></label>
// //                             <textarea 
// //                                 value={content}
// //                                 onChange={(e) => setContent(e.target.value)}
// //                                 placeholder="Tuliskan isi berita di sini..."
// //                                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-[#990000] transition-all min-h-[400px]"
// //                                 required
// //                             />
// //                         </div>

// //                         <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-4">
// //                             <button 
// //                                 type="button" 
// //                                 onClick={() => router.back()}
// //                                 className="px-6 py-2.5 rounded-lg font-bold text-gray-500 hover:bg-gray-100 transition-colors"
// //                             >
// //                                 Batal
// //                             </button>
// //                             <button 
// //                                 type="submit" 
// //                                 disabled={loading}
// //                                 className="bg-[#990000] text-white px-8 py-2.5 rounded-lg font-bold hover:bg-red-800 transition-all shadow-md hover:shadow-lg disabled:opacity-70 flex items-center gap-2"
// //                             >
// //                                 {loading ? <><Loader2 className="animate-spin" size={20}/> Menyimpan...</> : 'Terbitkan Sekarang'}
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
// import Swal from 'sweetalert2';
// import { UploadCloud, X, ArrowLeft, Loader2 } from 'lucide-react';
// import RichEditor from '@/components/RichEditor'; // Pastikan path import benar

// export default function AdminCreateBlogPage() {
//     const router = useRouter();
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
        
//         // Strip HTML tags untuk cek validasi kosong
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
//                 content, // HTML String dari RichEditor
//                 coverUrl,
//                 tags: tags.split(',').map(t => t.trim()).filter(t => t),
//                 status: 'approved'
//             };

//             await api('/api/blog', {
//                 method: 'POST',
//                 body: JSON.stringify(payload)
//             });

//             await Swal.fire({
//                 icon: 'success',
//                 title: 'Berhasil!',
//                 text: 'Berita baru telah diterbitkan.',
//                 confirmButtonColor: '#990000'
//             });

//             router.push('/admin/blog'); 

//         } catch (error: any) {
//             console.error(error);
//             Swal.fire('Gagal', error.message || 'Terjadi kesalahan.', 'error');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-50 p-6 font-sans">
//             <div className="max-w-4xl mx-auto">
//                 <div className="flex items-center justify-between mb-6">
//                     <button 
//                         onClick={() => router.back()} 
//                         className="flex items-center text-gray-500 hover:text-[#990000] transition-colors"
//                         type="button"
//                     >
//                         <ArrowLeft size={20} className="mr-2"/> Kembali
//                     </button>
//                     <h1 className="text-2xl font-bold text-gray-800">Tulis Berita Baru (Admin)</h1>
//                 </div>
                
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-8">
//                     <form onSubmit={handleSubmit} className="space-y-6">
                        
//                         {/* Upload Cover */}
//                         <div>
//                             <label className="block text-sm font-bold text-gray-700 mb-2">Foto Sampul</label>
//                             <div className="relative group">
//                                 <div className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all ${coverPreview ? 'border-[#990000] bg-red-50' : 'border-gray-300 hover:border-gray-400 bg-gray-50'}`}>
//                                     <input 
//                                         type="file" 
//                                         accept="image/*" 
//                                         onChange={handleImageChange}
//                                         className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                                         aria-label="Upload Foto Sampul"
//                                         title="Upload Foto Sampul"
//                                     />
//                                     {coverPreview ? (
//                                         <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-sm">
//                                             <img src={coverPreview} alt="Preview" className="w-full h-full object-cover" />
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

//                         {/* Judul & Tags */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div>
//                                 <label className="block text-sm font-bold text-gray-700 mb-2">Judul Berita <span className="text-red-500">*</span></label>
//                                 <input 
//                                     type="text" 
//                                     value={title}
//                                     onChange={(e) => setTitle(e.target.value)}
//                                     placeholder="Masukkan judul berita..."
//                                     className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-[#990000] transition-all"
//                                     required
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-bold text-gray-700 mb-2">Tags (Pisahkan koma)</label>
//                                 <input 
//                                     type="text" 
//                                     value={tags}
//                                     onChange={(e) => setTags(e.target.value)}
//                                     placeholder="Contoh: Kegiatan, Pelatihan, Donor"
//                                     className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-[#990000] transition-all"
//                                 />
//                             </div>
//                         </div>

//                         {/* Rich Editor */}
//                         <div>
//                             <label className="block text-sm font-bold text-gray-700 mb-2">Konten Berita <span className="text-red-500">*</span></label>
//                             <RichEditor 
//                                 value={content} 
//                                 onChange={setContent} 
//                                 placeholder="Tuliskan berita lengkap di sini..." 
//                             />
//                         </div>

//                         <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-4">
//                             <button 
//                                 type="button" 
//                                 onClick={() => router.back()}
//                                 className="px-6 py-2.5 rounded-lg font-bold text-gray-500 hover:bg-gray-100 transition-colors"
//                             >
//                                 Batal
//                             </button>
//                             <button 
//                                 type="submit" 
//                                 disabled={loading}
//                                 className="bg-[#990000] text-white px-8 py-2.5 rounded-lg font-bold hover:bg-red-800 transition-all shadow-md hover:shadow-lg disabled:opacity-70 flex items-center gap-2"
//                             >
//                                 {loading ? <><Loader2 className="animate-spin" size={20}/> Menyimpan...</> : 'Terbitkan Sekarang'}
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
import { api, getImageUrl } from '@/lib/api';
import Protected from '@/components/Protected'; // [NEW] Added Protected
import { ArrowLeft, UploadCloud, Loader2, Save } from 'lucide-react';
import Link from 'next/link';
import Swal from 'sweetalert2';

export default function CreateBlogPage() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [coverUrl, setCoverUrl] = useState('');
    
    const [uploading, setUploading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const handleUploadCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;
        setUploading(true);
        try {
            const fd = new FormData();
            fd.append('file', e.target.files[0]);
            const res = await api('/api/upload', {
                method: 'POST',
                body: fd,
                headers: {} 
            });
            if (res.url) setCoverUrl(res.url);
        } catch (error) {
            Swal.fire('Error', 'Gagal upload gambar', 'error');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !content) {
            return Swal.fire('Peringatan', 'Judul dan Konten wajib diisi!', 'warning');
        }

        setSubmitting(true);
        try {
            await api('/api/blog', {
                method: 'POST',
                body: JSON.stringify({
                    title,
                    content,
                    coverUrl,
                    tags: tags.split(',').map(t => t.trim()).filter(Boolean)
                })
            });
            
            await Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: 'Cerita Anda berhasil dikirim dan menunggu persetujuan admin.',
                timer: 2000,
                showConfirmButton: false
            });
            
            router.push('/blog'); // Redirect ke halaman list blog
        } catch (error: any) {
            Swal.fire('Gagal', error.message || 'Terjadi kesalahan saat menyimpan', 'error');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        // [FIX] Role 'ADMIN' dihapus dari sini
        <Protected roles={['STUDENT', 'FACILITATOR', 'SUPER_ADMIN']}>
            <div className="min-h-screen bg-gray-50 py-12 px-6 font-sans">
                <div className="max-w-4xl mx-auto">
                    
                    <Link href="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#990000] mb-6 transition-colors font-medium">
                        <ArrowLeft size={20}/> Kembali ke Daftar Cerita
                    </Link>

                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                        <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Tulis Cerita Relawan Baru</h1>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            
                            {/* Judul */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Judul Cerita <span className="text-red-500">*</span></label>
                                <input 
                                    type="text" 
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                                    placeholder="Berikan judul yang menarik..."
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Cover Image Upload */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Foto Sampul</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors relative group min-h-[200px]">
                                    {coverUrl ? (
                                        <img src={getImageUrl(coverUrl)} alt="Cover" className="h-48 w-full object-cover rounded-lg shadow-sm" />
                                    ) : (
                                        <div className="text-center text-gray-400">
                                            <UploadCloud size={48} className="mx-auto mb-2"/>
                                            <p className="text-sm">Klik untuk upload foto</p>
                                        </div>
                                    )}
                                    
                                    <label className="absolute inset-0 cursor-pointer flex items-center justify-center">
                                        <input type="file" className="hidden" accept="image/*" onChange={handleUploadCover} disabled={uploading} />
                                        {uploading && <div className="bg-white/80 p-3 rounded-full shadow"><Loader2 className="animate-spin text-[#990000]"/></div>}
                                    </label>
                                    
                                    {coverUrl && !uploading && (
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl pointer-events-none">
                                            <span className="bg-white text-gray-800 px-4 py-2 rounded-full text-sm font-bold shadow-lg">Ganti Foto</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Konten (Simple Textarea / Rich Editor Placeholder) */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Isi Cerita <span className="text-red-500">*</span></label>
                                <textarea 
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 h-64 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all resize-none"
                                    placeholder="Tuliskan pengalaman atau cerita Anda di sini..."
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    required
                                />
                                <p className="text-xs text-gray-400 mt-2 text-right">Anda dapat menggunakan tag HTML dasar jika diperlukan.</p>
                            </div>

                            {/* Tags */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Tags / Kata Kunci</label>
                                <input 
                                    type="text" 
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                                    placeholder="Contoh: Bencana, Kemanusiaan, Donor Darah (pisahkan dengan koma)"
                                    value={tags}
                                    onChange={(e) => setTags(e.target.value)}
                                />
                            </div>

                            {/* Tombol Aksi */}
                            <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
                                <Link href="/blog" className="px-6 py-3 rounded-xl text-gray-600 font-bold hover:bg-gray-100 transition-colors">
                                    Batal
                                </Link>
                                <button 
                                    type="submit" 
                                    disabled={submitting || uploading}
                                    className="bg-[#990000] text-white px-8 py-3 rounded-xl font-bold hover:bg-red-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {submitting ? <Loader2 className="animate-spin" size={20}/> : <Save size={20}/>}
                                    {submitting ? 'Menyimpan...' : 'Kirim Cerita'}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </Protected>
    );
}
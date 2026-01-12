// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter, useParams } from 'next/navigation';
// import { api, getImageUrl } from '@/lib/api';
// import Swal from 'sweetalert2';
// import { UploadCloud, X, ArrowLeft, Loader2, Save } from 'lucide-react';

// export default function AdminEditBlogPage() {
//     const router = useRouter();
//     const params = useParams(); // Mengambil ID dari URL
//     const id = params.id as string;

//     const [title, setTitle] = useState('');
//     const [content, setContent] = useState('');
//     const [tags, setTags] = useState('');
//     const [coverFile, setCoverFile] = useState<File | null>(null);
//     const [coverPreview, setCoverPreview] = useState<string | null>(null);
    
//     // State untuk data lama (agar tahu jika gambar tidak diganti)
//     const [existingCoverUrl, setExistingCoverUrl] = useState('');
    
//     const [loading, setLoading] = useState(false);
//     const [fetching, setFetching] = useState(true);

//     // 1. Fetch Data Blog saat halaman dibuka
//     useEffect(() => {
//         const fetchBlog = async () => {
//             try {
//                 const data = await api(`/api/blog/${id}`);
//                 setTitle(data.title);
//                 setContent(data.content);
//                 setTags(data.tags ? data.tags.join(', ') : '');
                
//                 if (data.coverUrl) {
//                     setExistingCoverUrl(data.coverUrl);
//                     setCoverPreview(getImageUrl(data.coverUrl));
//                 }
//             } catch (error) {
//                 console.error(error);
//                 Swal.fire('Error', 'Gagal memuat data cerita.', 'error');
//                 router.push('/admin/blog');
//             } finally {
//                 setFetching(false);
//             }
//         };

//         if (id) fetchBlog();
//     }, [id, router]);

//     // Handle Ganti Gambar
//     const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files && e.target.files[0]) {
//             const file = e.target.files[0];
//             setCoverFile(file);
//             setCoverPreview(URL.createObjectURL(file));
//         }
//     };

//     // Handle Submit Update
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
        
//         if (!title || !content) {
//             Swal.fire('Error', 'Judul dan Konten wajib diisi!', 'warning');
//             return;
//         }

//         try {
//             setLoading(true);
//             let coverUrl = existingCoverUrl; // Default pakai gambar lama

//             // Jika ada file baru, upload dulu
//             if (coverFile) {
//                 const formData = new FormData();
//                 formData.append('file', coverFile);
//                 const uploadRes = await api('/api/upload', {
//                     method: 'POST',
//                     body: formData, 
//                 }); 
//                 coverUrl = uploadRes.path || uploadRes.url || uploadRes; 
//             } else if (!coverPreview && !existingCoverUrl) {
//                 // Jika gambar dihapus manual (tombol X) dan tidak upload baru
//                 coverUrl = '';
//             }

//             const payload = {
//                 title,
//                 content,
//                 coverUrl,
//                 tags: tags.split(',').map(t => t.trim()).filter(t => t),
//                 // Kita tidak mengubah status di sini, biarkan status sesuai aslinya
//                 // atau set ke 'approved' jika ingin auto-approve setiap edit.
//             };

//             await api(`/api/blog/${id}`, {
//                 method: 'PATCH',
//                 body: JSON.stringify(payload)
//             });

//             await Swal.fire({
//                 icon: 'success',
//                 title: 'Berhasil Diperbarui!',
//                 text: 'Perubahan telah disimpan.',
//                 confirmButtonColor: '#990000',
//                 timer: 1500
//             });

//             router.push('/admin/blog'); 

//         } catch (error: any) {
//             console.error(error);
//             Swal.fire('Gagal', error.message || 'Terjadi kesalahan saat menyimpan.', 'error');
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (fetching) {
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-gray-50">
//                 <Loader2 className="animate-spin text-[#990000]" size={40} />
//             </div>
//         );
//     }

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
//                     <h1 className="text-2xl font-bold text-gray-800">Edit Berita / Cerita</h1>
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
//                                         aria-label="Ganti Foto Sampul"
//                                         title="Ganti Foto Sampul"
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
//                                                     setExistingCoverUrl(''); // Tandai gambar dihapus
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
//                                             <p className="text-sm font-medium text-gray-600">Klik untuk ganti foto</p>
//                                             <p className="text-xs text-gray-400 mt-1">Biarkan kosong jika tidak ingin mengubah</p>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Form Inputs */}
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

//                         <div>
//                             <label className="block text-sm font-bold text-gray-700 mb-2">Konten Berita <span className="text-red-500">*</span></label>
//                             <textarea 
//                                 value={content}
//                                 onChange={(e) => setContent(e.target.value)}
//                                 placeholder="Tuliskan isi berita di sini..."
//                                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-[#990000] transition-all min-h-[400px]"
//                                 required
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
//                                 {loading ? <><Loader2 className="animate-spin" size={20}/> Menyimpan...</> : <><Save size={20}/> Simpan Perubahan</>}
//                             </button>
//                         </div>

//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { api, getImageUrl } from '@/lib/api';
import Swal from 'sweetalert2';
import { UploadCloud, X, ArrowLeft, Loader2, Save } from 'lucide-react';
import RichEditor from '@/components/RichEditor'; // Pastikan path import benar

export default function AdminEditBlogPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [coverFile, setCoverFile] = useState<File | null>(null);
    const [coverPreview, setCoverPreview] = useState<string | null>(null);
    
    // State untuk data lama (agar tahu jika gambar tidak diganti)
    const [existingCoverUrl, setExistingCoverUrl] = useState('');
    
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    // Fetch Data Blog
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const data = await api(`/api/blog/${id}`);
                setTitle(data.title);
                setContent(data.content); // Quill otomatis membaca HTML string
                setTags(data.tags ? data.tags.join(', ') : '');
                
                if (data.coverUrl) {
                    setExistingCoverUrl(data.coverUrl);
                    setCoverPreview(getImageUrl(data.coverUrl));
                }
            } catch (error) {
                console.error(error);
                Swal.fire('Error', 'Gagal memuat data cerita.', 'error');
                router.push('/admin/blog');
            } finally {
                setFetching(false);
            }
        };

        if (id) fetchBlog();
    }, [id, router]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setCoverFile(file);
            setCoverPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const strippedContent = content.replace(/<(.|\n)*?>/g, '').trim();

        if (!title || strippedContent.length === 0) {
            Swal.fire('Error', 'Judul dan Konten wajib diisi!', 'warning');
            return;
        }

        try {
            setLoading(true);
            let coverUrl = existingCoverUrl; 

            if (coverFile) {
                const formData = new FormData();
                formData.append('file', coverFile);
                const uploadRes = await api('/api/upload', {
                    method: 'POST',
                    body: formData, 
                }); 
                coverUrl = uploadRes.path || uploadRes.url || uploadRes; 
            } else if (!coverPreview && !existingCoverUrl) {
                coverUrl = '';
            }

            const payload = {
                title,
                content,
                coverUrl,
                tags: tags.split(',').map(t => t.trim()).filter(t => t),
            };

            await api(`/api/blog/${id}`, {
                method: 'PATCH',
                body: JSON.stringify(payload)
            });

            await Swal.fire({
                icon: 'success',
                title: 'Berhasil Diperbarui!',
                text: 'Perubahan telah disimpan.',
                confirmButtonColor: '#990000',
                timer: 1500
            });

            router.push('/admin/blog'); 

        } catch (error: any) {
            console.error(error);
            Swal.fire('Gagal', error.message || 'Terjadi kesalahan saat menyimpan.', 'error');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="animate-spin text-[#990000]" size={40} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6 font-sans">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <button 
                        onClick={() => router.back()} 
                        className="flex items-center text-gray-500 hover:text-[#990000] transition-colors"
                        type="button"
                    >
                        <ArrowLeft size={20} className="mr-2"/> Kembali
                    </button>
                    <h1 className="text-2xl font-bold text-gray-800">Edit Berita / Cerita</h1>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        {/* Upload Cover */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Foto Sampul</label>
                            <div className="relative group">
                                <div className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all ${coverPreview ? 'border-[#990000] bg-red-50' : 'border-gray-300 hover:border-gray-400 bg-gray-50'}`}>
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        onChange={handleImageChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        aria-label="Ganti Foto Sampul"
                                        title="Ganti Foto Sampul"
                                    />
                                    {coverPreview ? (
                                        <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-sm">
                                            <img src={coverPreview} alt="Preview" className="w-full h-full object-cover" />
                                            <button 
                                                type="button"
                                                onClick={(e) => {
                                                    e.preventDefault(); 
                                                    setCoverFile(null); 
                                                    setCoverPreview(null);
                                                    setExistingCoverUrl('');
                                                }}
                                                className="absolute top-2 right-2 bg-white/90 p-2 rounded-full text-red-600 hover:bg-white shadow-md z-10"
                                                aria-label="Hapus gambar"
                                                title="Hapus gambar"
                                            >
                                                <X size={18}/>
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <div className="bg-white p-3 rounded-full shadow-sm inline-block mb-3">
                                                <UploadCloud size={32} className="text-[#990000]"/>
                                            </div>
                                            <p className="text-sm font-medium text-gray-600">Klik untuk ganti foto</p>
                                            <p className="text-xs text-gray-400 mt-1">Biarkan kosong jika tidak ingin mengubah</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Input Judul & Tags */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Judul Berita <span className="text-red-500">*</span></label>
                                <input 
                                    type="text" 
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Masukkan judul berita..."
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-[#990000] transition-all"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Tags (Pisahkan koma)</label>
                                <input 
                                    type="text" 
                                    value={tags}
                                    onChange={(e) => setTags(e.target.value)}
                                    placeholder="Contoh: Kegiatan, Pelatihan, Donor"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-[#990000] transition-all"
                                />
                            </div>
                        </div>

                        {/* Rich Editor */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Konten Berita <span className="text-red-500">*</span></label>
                            
                            <RichEditor 
                                value={content} 
                                onChange={setContent} 
                                placeholder="Edit konten berita di sini..."
                            />
                        </div>

                        <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-4">
                            <button 
                                type="button" 
                                onClick={() => router.back()}
                                className="px-6 py-2.5 rounded-lg font-bold text-gray-500 hover:bg-gray-100 transition-colors"
                            >
                                Batal
                            </button>
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="bg-[#990000] text-white px-8 py-2.5 rounded-lg font-bold hover:bg-red-800 transition-all shadow-md hover:shadow-lg disabled:opacity-70 flex items-center gap-2"
                            >
                                {loading ? <><Loader2 className="animate-spin" size={20}/> Menyimpan...</> : <><Save size={20}/> Simpan Perubahan</>}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}
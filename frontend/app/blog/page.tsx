// // // // // // // 'use client';

// // // // // // // import { useState, useEffect } from 'react';
// // // // // // // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // // // // // // import Protected from '@/components/Protected';
// // // // // // // import { Plus, X, UploadCloud, BookOpen, Calendar, User, Search } from 'lucide-react';
// // // // // // // import Link from 'next/link';

// // // // // // // export default function BlogPage() {
// // // // // // //   const [blogs, setBlogs] = useState<any[]>([]);
// // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // //   const [isModalOpen, setIsModalOpen] = useState(false);
// // // // // // //   const [uploading, setUploading] = useState(false);
  
// // // // // // //   // Form State
// // // // // // //   const [form, setForm] = useState({ title: '', content: '', coverUrl: '', tags: '' });

// // // // // // //   useEffect(() => { loadBlogs(); }, []);

// // // // // // //   const loadBlogs = async () => {
// // // // // // //     try {
// // // // // // //         const res = await api('/api/blog/public');
// // // // // // //         setBlogs(res || []);
// // // // // // //     } catch (e) { console.error(e); } finally { setLoading(false); }
// // // // // // //   };

// // // // // // //   const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // //       if (!e.target.files?.[0]) return;
// // // // // // //       setUploading(true);
// // // // // // //       try {
// // // // // // //           const fd = new FormData(); fd.append('file', e.target.files[0]);
// // // // // // //           const res = await apiUpload('/api/upload', fd);
// // // // // // //           setForm(p => ({ ...p, coverUrl: res.url || res.file?.url }));
// // // // // // //       } catch (e) { alert("Upload gagal"); } finally { setUploading(false); }
// // // // // // //   };

// // // // // // //   const handleSubmit = async (e: React.FormEvent) => {
// // // // // // //       e.preventDefault();
// // // // // // //       try {
// // // // // // //           const payload = { ...form, tags: form.tags.split(',').map(t => t.trim()) };
// // // // // // //           await api('/api/blog', { method: 'POST', body: payload });
// // // // // // //           alert("Cerita berhasil dikirim! Menunggu persetujuan admin.");
// // // // // // //           setIsModalOpen(false);
// // // // // // //           setForm({ title: '', content: '', coverUrl: '', tags: '' });
// // // // // // //       } catch (e: any) { alert("Gagal: " + e.message); }
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <Protected>
// // // // // // //       <div className="max-w-7xl mx-auto p-6 font-sans min-h-screen">
        
// // // // // // //         {/* HEADER HERO */}
// // // // // // //         <div className="bg-gradient-to-r from-red-800 to-red-600 rounded-3xl p-10 text-white mb-10 relative overflow-hidden shadow-xl">
// // // // // // //             <div className="relative z-10 max-w-2xl">
// // // // // // //                 <h1 className="text-4xl font-bold mb-4">Blog & Kisah Relawan</h1>
// // // // // // //                 <p className="text-red-100 text-lg mb-8">
// // // // // // //                     Bagikan pengalaman inspiratifmu selama menjadi relawan atau pelajari kisah hebat dari rekan lainnya.
// // // // // // //                 </p>
// // // // // // //                 <button 
// // // // // // //                     onClick={() => setIsModalOpen(true)}
// // // // // // //                     className="bg-white text-red-700 px-6 py-3 rounded-xl font-bold hover:bg-red-50 transition shadow-lg flex items-center gap-2"
// // // // // // //                 >
// // // // // // //                     <Plus size={20}/> Tulis Ceritamu
// // // // // // //                 </button>
// // // // // // //             </div>
// // // // // // //             {/* Pattern Decoration */}
// // // // // // //             <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-y-10 translate-x-10"></div>
// // // // // // //         </div>

// // // // // // //         {/* LIST BLOGS */}
// // // // // // //         {loading ? <div className="text-center py-20">Memuat cerita...</div> : 
// // // // // // //          blogs.length === 0 ? <div className="text-center py-20 text-gray-400">Belum ada cerita. Jadilah yang pertama menulis!</div> : 
// // // // // // //          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// // // // // // //             {blogs.map((blog) => (
// // // // // // //                 <Link href={`/blog/${blog._id}`} key={blog._id} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition border border-gray-100 overflow-hidden flex flex-col h-full">
// // // // // // //                     <div className="h-48 bg-gray-200 relative overflow-hidden">
// // // // // // //                         {blog.coverUrl ? (
// // // // // // //                             // FIX: Added alt attribute
// // // // // // //                             <img src={getImageUrl(blog.coverUrl)} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt={blog.title}/>
// // // // // // //                         ) : (
// // // // // // //                             <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100"><BookOpen size={48} opacity={0.2}/></div>
// // // // // // //                         )}
// // // // // // //                         <div className="absolute top-3 left-3 flex flex-wrap gap-2">
// // // // // // //                             {blog.tags.slice(0, 2).map((t:string, i:number) => (
// // // // // // //                                 <span key={i} className="bg-black/60 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded font-bold uppercase">{t}</span>
// // // // // // //                             ))}
// // // // // // //                         </div>
// // // // // // //                     </div>
// // // // // // //                     <div className="p-6 flex-1 flex flex-col">
// // // // // // //                         <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
// // // // // // //                             <Calendar size={12}/> {new Date(blog.createdAt).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}
// // // // // // //                         </div>
// // // // // // //                         <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-red-700 transition">{blog.title}</h3>
// // // // // // //                         <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-1">{blog.content}</p>
                        
// // // // // // //                         <div className="flex items-center gap-3 pt-4 border-t border-gray-50 mt-auto">
// // // // // // //                             <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden border border-gray-200">
// // // // // // //                                 {/* FIX: Added alt attribute */}
// // // // // // //                                 <img src={blog.author?.avatarUrl ? getImageUrl(blog.author.avatarUrl) : `https://ui-avatars.com/api/?name=${blog.author?.name || 'User'}`} className="w-full h-full object-cover" alt="Avatar Penulis"/>
// // // // // // //                             </div>
// // // // // // //                             <div>
// // // // // // //                                 <p className="text-xs font-bold text-gray-700">{blog.author?.name || 'Relawan'}</p>
// // // // // // //                                 <p className="text-[10px] text-gray-400">{blog.source === 'PMI Official' ? 'Official PMI' : 'Kontributor'}</p>
// // // // // // //                             </div>
// // // // // // //                         </div>
// // // // // // //                     </div>
// // // // // // //                 </Link>
// // // // // // //             ))}
// // // // // // //          </div>
// // // // // // //         }

// // // // // // //         {/* MODAL CREATE */}
// // // // // // //         {isModalOpen && (
// // // // // // //             <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
// // // // // // //                 <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
// // // // // // //                     <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center sticky top-0 z-10">
// // // // // // //                         <h2 className="text-lg font-bold">Tulis Cerita Relawan</h2>
// // // // // // //                         {/* FIX: Added aria-label */}
// // // // // // //                         <button onClick={() => setIsModalOpen(false)} aria-label="Tutup Modal"><X className="text-gray-400 hover:text-red-600"/></button>
// // // // // // //                     </div>
// // // // // // //                     <form onSubmit={handleSubmit} className="p-6 space-y-4">
// // // // // // //                         <div>
// // // // // // //                             <label className="block text-xs font-bold text-gray-500 mb-1">Judul Cerita</label>
// // // // // // //                             <input required className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none" value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="Contoh: Pengalaman di Posko Bencana"/>
// // // // // // //                         </div>
                        
// // // // // // //                         {/* Upload Cover */}
// // // // // // //                         <div className="border-2 border-dashed border-gray-200 bg-gray-50 p-4 rounded-xl text-center">
// // // // // // //                             {form.coverUrl ? (
// // // // // // //                                 <div className="relative h-40 w-full rounded-lg overflow-hidden">
// // // // // // //                                     {/* FIX: Added alt attribute */}
// // // // // // //                                     <img src={getImageUrl(form.coverUrl)} className="w-full h-full object-cover" alt="Preview Cover"/>
// // // // // // //                                     {/* FIX: Added aria-label */}
// // // // // // //                                     <button type="button" onClick={() => setForm({...form, coverUrl: ''})} className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full" aria-label="Hapus Cover"><X size={14}/></button>
// // // // // // //                                 </div>
// // // // // // //                             ) : (
// // // // // // //                                 <label className="cursor-pointer flex flex-col items-center justify-center gap-2 py-4">
// // // // // // //                                     <UploadCloud className="text-gray-400" size={32}/>
// // // // // // //                                     <span className="text-xs font-bold text-gray-500">{uploading ? 'Mengupload...' : 'Upload Foto Sampul'}</span>
// // // // // // //                                     <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading}/>
// // // // // // //                                 </label>
// // // // // // //                             )}
// // // // // // //                         </div>

// // // // // // //                         <div>
// // // // // // //                             <label className="block text-xs font-bold text-gray-500 mb-1">Isi Cerita</label>
// // // // // // //                             <textarea required rows={8} className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none" value={form.content} onChange={e => setForm({...form, content: e.target.value})} placeholder="Ceritakan pengalamanmu..."/>
// // // // // // //                         </div>
// // // // // // //                         <div>
// // // // // // //                             <label className="block text-xs font-bold text-gray-500 mb-1">Tags (Pisahkan dengan koma)</label>
// // // // // // //                             <input className="w-full border rounded-lg px-3 py-2 text-sm" value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} placeholder="Relawan, Inspirasi, Lapangan"/>
// // // // // // //                         </div>
                        
// // // // // // //                         <div className="pt-4 flex justify-end gap-3 border-t">
// // // // // // //                             <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-gray-600 font-bold hover:bg-gray-100 rounded-xl">Batal</button>
// // // // // // //                             <button type="submit" disabled={uploading} className="px-6 py-2.5 bg-red-700 text-white font-bold hover:bg-red-800 rounded-xl disabled:opacity-50">Kirim Cerita</button>
// // // // // // //                         </div>
// // // // // // //                     </form>
// // // // // // //                 </div>
// // // // // // //             </div>
// // // // // // //         )}
// // // // // // //       </div>
// // // // // // //     </Protected>
// // // // // // //   );
// // // // // // // }
// // // // // // 'use client';

// // // // // // import { useState, useEffect, useMemo } from 'react';
// // // // // // import dynamic from 'next/dynamic'; // Import Dynamic
// // // // // // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // // // // // import Protected from '@/components/Protected';
// // // // // // import { Plus, X, UploadCloud, BookOpen, Calendar } from 'lucide-react';
// // // // // // import Link from 'next/link';

// // // // // // // Import React Quill secara Dynamic (SSR False)
// // // // // // const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
// // // // // // import 'react-quill/dist/quill.snow.css'; // Import CSS Quill

// // // // // // export default function BlogPage() {
// // // // // //   const [blogs, setBlogs] = useState<any[]>([]);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [isModalOpen, setIsModalOpen] = useState(false);
// // // // // //   const [uploading, setUploading] = useState(false);
  
// // // // // //   const [form, setForm] = useState({ title: '', content: '', coverUrl: '', tags: '' });

// // // // // //   useEffect(() => { loadBlogs(); }, []);

// // // // // //   const loadBlogs = async () => {
// // // // // //     try {
// // // // // //         const res = await api('/api/blog/public');
// // // // // //         setBlogs(res || []);
// // // // // //     } catch (e) { console.error(e); } finally { setLoading(false); }
// // // // // //   };

// // // // // //   const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // //       if (!e.target.files?.[0]) return;
// // // // // //       setUploading(true);
// // // // // //       try {
// // // // // //           const fd = new FormData(); fd.append('file', e.target.files[0]);
// // // // // //           const res = await apiUpload('/api/upload', fd);
// // // // // //           setForm(p => ({ ...p, coverUrl: res.url || res.file?.url }));
// // // // // //       } catch (e) { alert("Upload gagal"); } finally { setUploading(false); }
// // // // // //   };

// // // // // //   const handleSubmit = async (e: React.FormEvent) => {
// // // // // //       e.preventDefault();
// // // // // //       try {
// // // // // //           const payload = { ...form, tags: form.tags.split(',').map(t => t.trim()) };
// // // // // //           await api('/api/blog', { method: 'POST', body: payload });
// // // // // //           alert("Cerita berhasil dikirim! Fasilitator akan mendapatkan notifikasi untuk persetujuan.");
// // // // // //           setIsModalOpen(false);
// // // // // //           setForm({ title: '', content: '', coverUrl: '', tags: '' });
// // // // // //       } catch (e: any) { alert("Gagal: " + e.message); }
// // // // // //   };

// // // // // //   return (
// // // // // //     <Protected>
// // // // // //       <div className="max-w-7xl mx-auto p-6 font-sans min-h-screen">
        
// // // // // //         {/* HEADER HERO */}
// // // // // //         <div className="bg-gradient-to-r from-red-800 to-red-600 rounded-3xl p-10 text-white mb-10 relative overflow-hidden shadow-xl">
// // // // // //             <div className="relative z-10 max-w-2xl">
// // // // // //                 <h1 className="text-4xl font-bold mb-4">Blog & Kisah Relawan</h1>
// // // // // //                 <p className="text-red-100 text-lg mb-8">Bagikan pengalaman inspiratifmu selama menjadi relawan.</p>
// // // // // //                 <button 
// // // // // //                     onClick={() => setIsModalOpen(true)}
// // // // // //                     className="bg-white text-red-700 px-6 py-3 rounded-xl font-bold hover:bg-red-50 transition shadow-lg flex items-center gap-2"
// // // // // //                 >
// // // // // //                     <Plus size={20}/> Tulis Ceritamu
// // // // // //                 </button>
// // // // // //             </div>
// // // // // //             <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-y-10 translate-x-10"></div>
// // // // // //         </div>

// // // // // //         {/* LIST BLOGS */}
// // // // // //         {loading ? <div className="text-center py-20">Memuat cerita...</div> : 
// // // // // //          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// // // // // //             {blogs.map((blog) => (
// // // // // //                 <Link href={`/blog/${blog._id}`} key={blog._id} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition border border-gray-100 overflow-hidden flex flex-col h-full">
// // // // // //                     <div className="h-48 bg-gray-200 relative overflow-hidden">
// // // // // //                         {blog.coverUrl ? (
// // // // // //                             <img src={getImageUrl(blog.coverUrl)} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt={blog.title}/>
// // // // // //                         ) : (
// // // // // //                             <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100"><BookOpen size={48} opacity={0.2}/></div>
// // // // // //                         )}
// // // // // //                         <div className="absolute top-3 left-3 flex flex-wrap gap-2">
// // // // // //                             {blog.tags.slice(0, 2).map((t:string, i:number) => (
// // // // // //                                 <span key={i} className="bg-black/60 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded font-bold uppercase">{t}</span>
// // // // // //                             ))}
// // // // // //                         </div>
// // // // // //                     </div>
// // // // // //                     <div className="p-6 flex-1 flex flex-col">
// // // // // //                         <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
// // // // // //                             <Calendar size={12}/> {new Date(blog.createdAt).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}
// // // // // //                         </div>
// // // // // //                         <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-red-700 transition">{blog.title}</h3>
// // // // // //                         {/* Render HTML content (stripped) preview is hard without lib, so we just hide content or use snippet */}
// // // // // //                         <div className="text-gray-500 text-sm line-clamp-3 mb-4 flex-1" dangerouslySetInnerHTML={{ __html: blog.content }}></div>
                        
// // // // // //                         <div className="flex items-center gap-3 pt-4 border-t border-gray-50 mt-auto">
// // // // // //                             <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden border border-gray-200">
// // // // // //                                 <img src={blog.author?.avatarUrl ? getImageUrl(blog.author.avatarUrl) : `https://ui-avatars.com/api/?name=${blog.author?.name || 'User'}`} className="w-full h-full object-cover" alt="Avatar"/>
// // // // // //                             </div>
// // // // // //                             <span className="text-xs font-bold text-gray-600">{blog.author?.name || 'Relawan'}</span>
// // // // // //                         </div>
// // // // // //                     </div>
// // // // // //                 </Link>
// // // // // //             ))}
// // // // // //          </div>
// // // // // //         }

// // // // // //         {/* MODAL CREATE WITH WYSIWYG */}
// // // // // //         {isModalOpen && (
// // // // // //             <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
// // // // // //                 <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
// // // // // //                     <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center flex-shrink-0">
// // // // // //                         <h2 className="text-lg font-bold">Tulis Cerita Relawan</h2>
// // // // // //                         <button onClick={() => setIsModalOpen(false)} aria-label="Tutup"><X className="text-gray-400 hover:text-red-600"/></button>
// // // // // //                     </div>
                    
// // // // // //                     <div className="p-6 overflow-y-auto custom-scrollbar">
// // // // // //                         <form onSubmit={handleSubmit} className="space-y-6">
// // // // // //                             <div>
// // // // // //                                 <label className="block text-xs font-bold text-gray-500 mb-1">Judul Cerita</label>
// // // // // //                                 <input required className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none" value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="Contoh: Pengalaman di Posko Bencana"/>
// // // // // //                             </div>
                            
// // // // // //                             {/* Upload Cover */}
// // // // // //                             <div className="border-2 border-dashed border-gray-200 bg-gray-50 p-4 rounded-xl text-center">
// // // // // //                                 {form.coverUrl ? (
// // // // // //                                     <div className="relative h-40 w-full rounded-lg overflow-hidden">
// // // // // //                                         <img src={getImageUrl(form.coverUrl)} className="w-full h-full object-cover" alt="Cover"/>
// // // // // //                                         <button type="button" onClick={() => setForm({...form, coverUrl: ''})} className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full"><X size={14}/></button>
// // // // // //                                     </div>
// // // // // //                                 ) : (
// // // // // //                                     <label className="cursor-pointer flex flex-col items-center justify-center gap-2 py-4">
// // // // // //                                         <UploadCloud className="text-gray-400" size={32}/>
// // // // // //                                         <span className="text-xs font-bold text-gray-500">{uploading ? 'Mengupload...' : 'Upload Foto Sampul'}</span>
// // // // // //                                         <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading}/>
// // // // // //                                     </label>
// // // // // //                                 )}
// // // // // //                             </div>

// // // // // //                             {/* TEXT EDITOR (WYSIWYG) */}
// // // // // //                             <div>
// // // // // //                                 <label className="block text-xs font-bold text-gray-500 mb-1">Isi Cerita</label>
// // // // // //                                 <div className="h-64 mb-12"> {/* Height container for Quill */}
// // // // // //                                     <ReactQuill 
// // // // // //                                         theme="snow" 
// // // // // //                                         value={form.content} 
// // // // // //                                         onChange={(val) => setForm({...form, content: val})} 
// // // // // //                                         className="h-full"
// // // // // //                                         placeholder="Tuliskan pengalaman inspiratifmu di sini..."
// // // // // //                                     />
// // // // // //                                 </div>
// // // // // //                             </div>

// // // // // //                             <div>
// // // // // //                                 <label className="block text-xs font-bold text-gray-500 mb-1">Tags (Pisahkan koma)</label>
// // // // // //                                 <input className="w-full border rounded-lg px-3 py-2 text-sm" value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} placeholder="Relawan, Inspirasi, Lapangan"/>
// // // // // //                             </div>
                            
// // // // // //                             <div className="pt-4 flex justify-end gap-3 border-t">
// // // // // //                                 <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-gray-600 font-bold hover:bg-gray-100 rounded-xl">Batal</button>
// // // // // //                                 <button type="submit" disabled={uploading} className="px-6 py-2.5 bg-red-700 text-white font-bold hover:bg-red-800 rounded-xl disabled:opacity-50">Kirim Cerita</button>
// // // // // //                             </div>
// // // // // //                         </form>
// // // // // //                     </div>
// // // // // //                 </div>
// // // // // //             </div>
// // // // // //         )}
// // // // // //       </div>
// // // // // //     </Protected>
// // // // // //   );
// // // // // // }
// // // // // 'use client';

// // // // // import { useState, useEffect, useMemo } from 'react';
// // // // // import dynamic from 'next/dynamic'; 
// // // // // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // // // // import Protected from '@/components/Protected';
// // // // // import { Plus, X, UploadCloud, BookOpen, Calendar } from 'lucide-react';
// // // // // import Link from 'next/link';

// // // // // // Import React Quill secara Dynamic (SSR False)
// // // // // const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
// // // // // import 'react-quill/dist/quill.snow.css'; 

// // // // // export default function BlogPage() {
// // // // //   const [blogs, setBlogs] = useState<any[]>([]);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [isModalOpen, setIsModalOpen] = useState(false);
// // // // //   const [uploading, setUploading] = useState(false);
  
// // // // //   const [form, setForm] = useState({ title: '', content: '', coverUrl: '', tags: '' });

// // // // //   useEffect(() => { loadBlogs(); }, []);

// // // // // const loadBlogs = async () => {
// // // // //     try {
// // // // //         // Tambahkan ?t=...
// // // // //         const res = await api(`/api/blog/public?t=${new Date().getTime()}`);
// // // // //         setBlogs(res || []);
// // // // //     } catch (e) { console.error(e); } finally { setLoading(false); }
// // // // //   };

// // // // //   const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // //       if (!e.target.files?.[0]) return;
// // // // //       setUploading(true);
// // // // //       try {
// // // // //           const fd = new FormData(); fd.append('file', e.target.files[0]);
// // // // //           const res = await apiUpload('/api/upload', fd);
// // // // //           setForm(p => ({ ...p, coverUrl: res.url || res.file?.url }));
// // // // //       } catch (e) { alert("Upload gagal"); } finally { setUploading(false); }
// // // // //   };

// // // // //   const handleSubmit = async (e: React.FormEvent) => {
// // // // //       e.preventDefault();
// // // // //       try {
// // // // //           const payload = { ...form, tags: form.tags.split(',').map(t => t.trim()) };
// // // // //           await api('/api/blog', { method: 'POST', body: payload });
// // // // //           alert("Cerita berhasil dikirim! Fasilitator akan mendapatkan notifikasi untuk persetujuan.");
// // // // //           setIsModalOpen(false);
// // // // //           setForm({ title: '', content: '', coverUrl: '', tags: '' });
// // // // //       } catch (e: any) { alert("Gagal: " + e.message); }
// // // // //   };

// // // // //   return (
// // // // //     <Protected>
// // // // //       <div className="max-w-7xl mx-auto p-6 font-sans min-h-screen">
        
// // // // //         {/* HEADER HERO */}
// // // // //         <div className="bg-gradient-to-r from-red-800 to-red-600 rounded-3xl p-10 text-white mb-10 relative overflow-hidden shadow-xl">
// // // // //             <div className="relative z-10 max-w-2xl">
// // // // //                 <h1 className="text-4xl font-bold mb-4">Blog & Kisah Relawan</h1>
// // // // //                 <p className="text-red-100 text-lg mb-8">Bagikan pengalaman inspiratifmu selama menjadi relawan.</p>
// // // // //                 <button 
// // // // //                     onClick={() => setIsModalOpen(true)}
// // // // //                     className="bg-white text-red-700 px-6 py-3 rounded-xl font-bold hover:bg-red-50 transition shadow-lg flex items-center gap-2"
// // // // //                 >
// // // // //                     <Plus size={20}/> Tulis Ceritamu
// // // // //                 </button>
// // // // //             </div>
// // // // //             <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-y-10 translate-x-10"></div>
// // // // //         </div>

// // // // //         {/* LIST BLOGS */}
// // // // //         {loading ? <div className="text-center py-20">Memuat cerita...</div> : 
// // // // //          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// // // // //             {blogs.map((blog) => (
// // // // //                 <Link href={`/blog/${blog._id}`} key={blog._id} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition border border-gray-100 overflow-hidden flex flex-col h-full">
// // // // //                     <div className="h-48 bg-gray-200 relative overflow-hidden">
// // // // //                         {blog.coverUrl ? (
// // // // //                             <img src={getImageUrl(blog.coverUrl)} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt={blog.title}/>
// // // // //                         ) : (
// // // // //                             <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100"><BookOpen size={48} opacity={0.2}/></div>
// // // // //                         )}
// // // // //                         <div className="absolute top-3 left-3 flex flex-wrap gap-2">
// // // // //                             {blog.tags.slice(0, 2).map((t:string, i:number) => (
// // // // //                                 <span key={i} className="bg-black/60 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded font-bold uppercase">{t}</span>
// // // // //                             ))}
// // // // //                         </div>
// // // // //                     </div>
// // // // //                     <div className="p-6 flex-1 flex flex-col">
// // // // //                         <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
// // // // //                             <Calendar size={12}/> {new Date(blog.createdAt).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}
// // // // //                         </div>
// // // // //                         <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-red-700 transition">{blog.title}</h3>
// // // // //                         <div className="text-gray-500 text-sm line-clamp-3 mb-4 flex-1" dangerouslySetInnerHTML={{ __html: blog.content }}></div>
                        
// // // // //                         <div className="flex items-center gap-3 pt-4 border-t border-gray-50 mt-auto">
// // // // //                             <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden border border-gray-200">
// // // // //                                 <img src={blog.author?.avatarUrl ? getImageUrl(blog.author.avatarUrl) : `https://ui-avatars.com/api/?name=${blog.author?.name || 'User'}`} className="w-full h-full object-cover" alt="Avatar"/>
// // // // //                             </div>
// // // // //                             <span className="text-xs font-bold text-gray-600">{blog.author?.name || 'Relawan'}</span>
// // // // //                         </div>
// // // // //                     </div>
// // // // //                 </Link>
// // // // //             ))}
// // // // //          </div>
// // // // //         }

// // // // //         {/* MODAL CREATE WITH WYSIWYG */}
// // // // //         {isModalOpen && (
// // // // //             <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
// // // // //                 <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
// // // // //                     <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center flex-shrink-0">
// // // // //                         <h2 className="text-lg font-bold">Tulis Cerita Relawan</h2>
// // // // //                         {/* FIX: Added aria-label */}
// // // // //                         <button onClick={() => setIsModalOpen(false)} aria-label="Tutup Modal"><X className="text-gray-400 hover:text-red-600"/></button>
// // // // //                     </div>
                    
// // // // //                     <div className="p-6 overflow-y-auto custom-scrollbar">
// // // // //                         <form onSubmit={handleSubmit} className="space-y-6">
// // // // //                             <div>
// // // // //                                 <label className="block text-xs font-bold text-gray-500 mb-1">Judul Cerita</label>
// // // // //                                 <input required className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none" value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="Contoh: Pengalaman di Posko Bencana"/>
// // // // //                             </div>
                            
// // // // //                             {/* Upload Cover */}
// // // // //                             <div className="border-2 border-dashed border-gray-200 bg-gray-50 p-4 rounded-xl text-center">
// // // // //                                 {form.coverUrl ? (
// // // // //                                     <div className="relative h-40 w-full rounded-lg overflow-hidden">
// // // // //                                         <img src={getImageUrl(form.coverUrl)} className="w-full h-full object-cover" alt="Cover"/>
// // // // //                                         {/* FIX: Added aria-label */}
// // // // //                                         <button type="button" onClick={() => setForm({...form, coverUrl: ''})} className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full" aria-label="Hapus Cover"><X size={14}/></button>
// // // // //                                     </div>
// // // // //                                 ) : (
// // // // //                                     <label className="cursor-pointer flex flex-col items-center justify-center gap-2 py-4">
// // // // //                                         <UploadCloud className="text-gray-400" size={32}/>
// // // // //                                         <span className="text-xs font-bold text-gray-500">{uploading ? 'Mengupload...' : 'Upload Foto Sampul'}</span>
// // // // //                                         <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading}/>
// // // // //                                     </label>
// // // // //                                 )}
// // // // //                             </div>

// // // // //                             {/* TEXT EDITOR (WYSIWYG) */}
// // // // //                             <div>
// // // // //                                 <label className="block text-xs font-bold text-gray-500 mb-1">Isi Cerita</label>
// // // // //                                 <div className="h-64 mb-12"> 
// // // // //                                     <ReactQuill 
// // // // //                                         theme="snow" 
// // // // //                                         value={form.content} 
// // // // //                                         onChange={(val) => setForm({...form, content: val})} 
// // // // //                                         className="h-full"
// // // // //                                         placeholder="Tuliskan pengalaman inspiratifmu di sini..."
// // // // //                                     />
// // // // //                                 </div>
// // // // //                             </div>

// // // // //                             <div>
// // // // //                                 <label className="block text-xs font-bold text-gray-500 mb-1">Tags (Pisahkan koma)</label>
// // // // //                                 <input className="w-full border rounded-lg px-3 py-2 text-sm" value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} placeholder="Relawan, Inspirasi, Lapangan"/>
// // // // //                             </div>
                            
// // // // //                             <div className="pt-4 flex justify-end gap-3 border-t">
// // // // //                                 <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-gray-600 font-bold hover:bg-gray-100 rounded-xl">Batal</button>
// // // // //                                 <button type="submit" disabled={uploading} className="px-6 py-2.5 bg-red-700 text-white font-bold hover:bg-red-800 rounded-xl disabled:opacity-50">Kirim Cerita</button>
// // // // //                             </div>
// // // // //                         </form>
// // // // //                     </div>
// // // // //                 </div>
// // // // //             </div>
// // // // //         )}
// // // // //       </div>
// // // // //     </Protected>
// // // // //   );
// // // // // }
// // // // 'use client';

// // // // import { useState, useEffect, useRef, useMemo } from 'react';
// // // // import dynamic from 'next/dynamic'; 
// // // // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // // // import Protected from '@/components/Protected';
// // // // import { Plus, X, UploadCloud, BookOpen, Calendar } from 'lucide-react';
// // // // import Link from 'next/link';

// // // // const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
// // // // import 'react-quill/dist/quill.snow.css'; 

// // // // export default function BlogPage() {
// // // //   const [blogs, setBlogs] = useState<any[]>([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [isModalOpen, setIsModalOpen] = useState(false);
// // // //   const [uploading, setUploading] = useState(false);
  
// // // //   const [form, setForm] = useState({ title: '', content: '', coverUrl: '', tags: '' });
  
// // // //   // REF UNTUK UPLOAD GAMBAR DI EDITOR
// // // //   const quillRef = useRef<any>(null);

// // // //   useEffect(() => { loadBlogs(); }, []);

// // // //   // --- EDITOR CONFIGURATION ---
// // // //   const imageHandler = () => {
// // // //     const input = document.createElement('input');
// // // //     input.setAttribute('type', 'file');
// // // //     input.setAttribute('accept', 'image/*');
// // // //     input.click();

// // // //     input.onchange = async () => {
// // // //       const file = input.files ? input.files[0] : null;
// // // //       if (!file) return;
// // // //       try {
// // // //         const fd = new FormData(); fd.append('file', file);
// // // //         const res = await apiUpload('/api/upload', fd);
// // // //         const url = getImageUrl(res.url || res.file?.url);
// // // //         const quill = quillRef.current.getEditor();
// // // //         const range = quill.getSelection();
// // // //         quill.insertEmbed(range.index, 'image', url);
// // // //       } catch (err) { alert('Gagal upload gambar'); }
// // // //     };
// // // //   };

// // // //   const modules = useMemo(() => ({
// // // //     toolbar: {
// // // //       container: [
// // // //         [{ 'header': [1, 2, false] }],
// // // //         ['bold', 'italic', 'underline', 'blockquote'],
// // // //         [{ 'list': 'ordered'}, { 'list': 'bullet' }],
// // // //         ['link', 'image'],
// // // //         ['clean']
// // // //       ],
// // // //       handlers: { image: imageHandler }
// // // //     }
// // // //   }), []);
// // // //   // -----------------------------

// // // //   const loadBlogs = async () => {
// // // //     try {
// // // //         const res = await api(`/api/blog/public?t=${new Date().getTime()}`);
// // // //         setBlogs(res || []);
// // // //     } catch (e) { console.error(e); } finally { setLoading(false); }
// // // //   };

// // // //   const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // //       if (!e.target.files?.[0]) return;
// // // //       setUploading(true);
// // // //       try {
// // // //           const fd = new FormData(); fd.append('file', e.target.files[0]);
// // // //           const res = await apiUpload('/api/upload', fd);
// // // //           setForm(p => ({ ...p, coverUrl: res.url || res.file?.url }));
// // // //       } catch (e) { alert("Upload gagal"); } finally { setUploading(false); }
// // // //   };

// // // //   const handleSubmit = async (e: React.FormEvent) => {
// // // //       e.preventDefault();
// // // //       try {
// // // //           const payload = { ...form, tags: form.tags.split(',').map(t => t.trim()) };
// // // //           await api('/api/blog', { method: 'POST', body: payload });
// // // //           alert("Cerita berhasil dikirim! Fasilitator akan mendapatkan notifikasi untuk persetujuan.");
// // // //           setIsModalOpen(false);
// // // //           setForm({ title: '', content: '', coverUrl: '', tags: '' });
// // // //       } catch (e: any) { alert("Gagal: " + e.message); }
// // // //   };

// // // //   return (
// // // //     <Protected>
// // // //       <div className="max-w-7xl mx-auto p-6 font-sans min-h-screen">
        
// // // //         {/* HEADER HERO */}
// // // //         <div className="bg-gradient-to-r from-red-800 to-red-600 rounded-3xl p-10 text-white mb-10 relative overflow-hidden shadow-xl">
// // // //             <div className="relative z-10 max-w-2xl">
// // // //                 <h1 className="text-4xl font-bold mb-4">Blog & Kisah Relawan</h1>
// // // //                 <p className="text-red-100 text-lg mb-8">Bagikan pengalaman inspiratifmu selama menjadi relawan.</p>
// // // //                 <button onClick={() => setIsModalOpen(true)} className="bg-white text-red-700 px-6 py-3 rounded-xl font-bold hover:bg-red-50 transition shadow-lg flex items-center gap-2">
// // // //                     <Plus size={20}/> Tulis Ceritamu
// // // //                 </button>
// // // //             </div>
// // // //             <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-y-10 translate-x-10"></div>
// // // //         </div>

// // // //         {/* LIST BLOGS */}
// // // //         {loading ? <div className="text-center py-20">Memuat cerita...</div> : 
// // // //          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// // // //             {blogs.map((blog) => (
// // // //                 <Link href={`/blog/${blog._id}`} key={blog._id} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition border border-gray-100 overflow-hidden flex flex-col h-full">
// // // //                     <div className="h-48 bg-gray-200 relative overflow-hidden">
// // // //                         {blog.coverUrl ? (
// // // //                             <img src={getImageUrl(blog.coverUrl)} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt={blog.title}/>
// // // //                         ) : (
// // // //                             <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100"><BookOpen size={48} opacity={0.2}/></div>
// // // //                         )}
// // // //                         <div className="absolute top-3 left-3 flex flex-wrap gap-2">
// // // //                             {blog.tags.slice(0, 2).map((t:string, i:number) => (
// // // //                                 <span key={i} className="bg-black/60 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded font-bold uppercase">{t}</span>
// // // //                             ))}
// // // //                         </div>
// // // //                     </div>
// // // //                     <div className="p-6 flex-1 flex flex-col">
// // // //                         <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
// // // //                             <Calendar size={12}/> {new Date(blog.createdAt).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}
// // // //                         </div>
// // // //                         <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-red-700 transition">{blog.title}</h3>
// // // //                         <div className="text-gray-500 text-sm line-clamp-3 mb-4 flex-1" dangerouslySetInnerHTML={{ __html: blog.content }}></div>
// // // //                         <div className="flex items-center gap-3 pt-4 border-t border-gray-50 mt-auto">
// // // //                             <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden border border-gray-200">
// // // //                                 <img src={blog.author?.avatarUrl ? getImageUrl(blog.author.avatarUrl) : `https://ui-avatars.com/api/?name=${blog.author?.name || 'User'}`} className="w-full h-full object-cover" alt="Avatar"/>
// // // //                             </div>
// // // //                             <span className="text-xs font-bold text-gray-600">{blog.author?.name || 'Relawan'}</span>
// // // //                         </div>
// // // //                     </div>
// // // //                 </Link>
// // // //             ))}
// // // //          </div>
// // // //         }

// // // //         {/* MODAL CREATE WITH WYSIWYG & IMAGE UPLOAD */}
// // // //         {isModalOpen && (
// // // //             <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
// // // //                 <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
// // // //                     <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center flex-shrink-0">
// // // //                         <h2 className="text-lg font-bold">Tulis Cerita Relawan</h2>
// // // //                         <button onClick={() => setIsModalOpen(false)} aria-label="Tutup Modal"><X className="text-gray-400 hover:text-red-600"/></button>
// // // //                     </div>
                    
// // // //                     <div className="p-6 overflow-y-auto custom-scrollbar">
// // // //                         <form onSubmit={handleSubmit} className="space-y-6">
// // // //                             <div>
// // // //                                 <label className="block text-xs font-bold text-gray-500 mb-1">Judul Cerita</label>
// // // //                                 <input required className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none" value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="Contoh: Pengalaman di Posko Bencana"/>
// // // //                             </div>
                            
// // // //                             <div className="border-2 border-dashed border-gray-200 bg-gray-50 p-4 rounded-xl text-center">
// // // //                                 {form.coverUrl ? (
// // // //                                     <div className="relative h-40 w-full rounded-lg overflow-hidden">
// // // //                                         <img src={getImageUrl(form.coverUrl)} className="w-full h-full object-cover" alt="Cover"/>
// // // //                                         <button type="button" onClick={() => setForm({...form, coverUrl: ''})} className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full" aria-label="Hapus Cover"><X size={14}/></button>
// // // //                                     </div>
// // // //                                 ) : (
// // // //                                     <label className="cursor-pointer flex flex-col items-center justify-center gap-2 py-4">
// // // //                                         <UploadCloud className="text-gray-400" size={32}/>
// // // //                                         <span className="text-xs font-bold text-gray-500">{uploading ? 'Mengupload...' : 'Upload Foto Sampul'}</span>
// // // //                                         <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading}/>
// // // //                                     </label>
// // // //                                 )}
// // // //                             </div>

// // // //                             {/* TEXT EDITOR (WYSIWYG) */}
// // // //                             <div>
// // // //                                 <label className="block text-xs font-bold text-gray-500 mb-1">Isi Cerita (Bisa masukkan gambar)</label>
// // // //                                 <div className="h-64 mb-12"> 
// // // //                                     <ReactQuill 
// // // //                                         ref={quillRef}
// // // //                                         theme="snow" 
// // // //                                         value={form.content} 
// // // //                                         onChange={(val) => setForm({...form, content: val})} 
// // // //                                         modules={modules}
// // // //                                         className="h-full"
// // // //                                         placeholder="Tuliskan pengalaman inspiratifmu di sini..."
// // // //                                     />
// // // //                                 </div>
// // // //                             </div>

// // // //                             <div>
// // // //                                 <label className="block text-xs font-bold text-gray-500 mb-1">Tags (Pisahkan koma)</label>
// // // //                                 <input className="w-full border rounded-lg px-3 py-2 text-sm" value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} placeholder="Relawan, Inspirasi, Lapangan"/>
// // // //                             </div>
                            
// // // //                             <div className="pt-4 flex justify-end gap-3 border-t">
// // // //                                 <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-gray-600 font-bold hover:bg-gray-100 rounded-xl">Batal</button>
// // // //                                 <button type="submit" disabled={uploading} className="px-6 py-2.5 bg-red-700 text-white font-bold hover:bg-red-800 rounded-xl disabled:opacity-50">Kirim Cerita</button>
// // // //                             </div>
// // // //                         </form>
// // // //                     </div>
// // // //                 </div>
// // // //             </div>
// // // //         )}
// // // //       </div>
// // // //     </Protected>
// // // //   );
// // // // }
// // // 'use client';

// // // import { useState, useEffect, useRef, useMemo } from 'react';
// // // import dynamic from 'next/dynamic'; 
// // // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // // import Protected from '@/components/Protected';
// // // import { Plus, X, UploadCloud, BookOpen, Calendar } from 'lucide-react';
// // // import Link from 'next/link';

// // // // FIX TYPESCRIPT ERROR: Tambahkan 'as any' di sini
// // // const ReactQuill = dynamic(() => import('react-quill'), { ssr: false }) as any;
// // // import 'react-quill/dist/quill.snow.css'; 

// // // export default function BlogPage() {
// // //   const [blogs, setBlogs] = useState<any[]>([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [isModalOpen, setIsModalOpen] = useState(false);
// // //   const [uploading, setUploading] = useState(false);
  
// // //   const [form, setForm] = useState({ title: '', content: '', coverUrl: '', tags: '' });
  
// // //   // REF UNTUK UPLOAD GAMBAR DI EDITOR
// // //   const quillRef = useRef<any>(null);

// // //   useEffect(() => { loadBlogs(); }, []);

// // //   // --- EDITOR CONFIGURATION ---
// // //   const imageHandler = () => {
// // //     const input = document.createElement('input');
// // //     input.setAttribute('type', 'file');
// // //     input.setAttribute('accept', 'image/*');
// // //     input.click();

// // //     input.onchange = async () => {
// // //       const file = input.files ? input.files[0] : null;
// // //       if (!file) return;
// // //       try {
// // //         const fd = new FormData(); fd.append('file', file);
// // //         const res = await apiUpload('/api/upload', fd);
// // //         const url = getImageUrl(res.url || res.file?.url);
// // //         const quill = quillRef.current.getEditor();
// // //         const range = quill.getSelection();
// // //         quill.insertEmbed(range.index, 'image', url);
// // //       } catch (err) { alert('Gagal upload gambar'); }
// // //     };
// // //   };

// // //   const modules = useMemo(() => ({
// // //     toolbar: {
// // //       container: [
// // //         [{ 'header': [1, 2, false] }],
// // //         ['bold', 'italic', 'underline', 'blockquote'],
// // //         [{ 'list': 'ordered'}, { 'list': 'bullet' }],
// // //         ['link', 'image'],
// // //         ['clean']
// // //       ],
// // //       handlers: { image: imageHandler }
// // //     }
// // //   }), []);
// // //   // -----------------------------

// // //   const loadBlogs = async () => {
// // //     try {
// // //         const res = await api(`/api/blog/public?t=${new Date().getTime()}`);
// // //         setBlogs(res || []);
// // //     } catch (e) { console.error(e); } finally { setLoading(false); }
// // //   };

// // //   const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // //       if (!e.target.files?.[0]) return;
// // //       setUploading(true);
// // //       try {
// // //           const fd = new FormData(); fd.append('file', e.target.files[0]);
// // //           const res = await apiUpload('/api/upload', fd);
// // //           setForm(p => ({ ...p, coverUrl: res.url || res.file?.url }));
// // //       } catch (e) { alert("Upload gagal"); } finally { setUploading(false); }
// // //   };

// // //   const handleSubmit = async (e: React.FormEvent) => {
// // //       e.preventDefault();
// // //       try {
// // //           const payload = { ...form, tags: form.tags.split(',').map(t => t.trim()) };
// // //           await api('/api/blog', { method: 'POST', body: payload });
// // //           alert("Cerita berhasil dikirim! Fasilitator akan mendapatkan notifikasi untuk persetujuan.");
// // //           setIsModalOpen(false);
// // //           setForm({ title: '', content: '', coverUrl: '', tags: '' });
// // //       } catch (e: any) { alert("Gagal: " + e.message); }
// // //   };

// // //   return (
// // //     <Protected>
// // //       <div className="max-w-7xl mx-auto p-6 font-sans min-h-screen">
        
// // //         {/* HEADER HERO */}
// // //         <div className="bg-gradient-to-r from-red-800 to-red-600 rounded-3xl p-10 text-white mb-10 relative overflow-hidden shadow-xl">
// // //             <div className="relative z-10 max-w-2xl">
// // //                 <h1 className="text-4xl font-bold mb-4">Blog & Kisah Relawan</h1>
// // //                 <p className="text-red-100 text-lg mb-8">Bagikan pengalaman inspiratifmu selama menjadi relawan.</p>
// // //                 <button onClick={() => setIsModalOpen(true)} className="bg-white text-red-700 px-6 py-3 rounded-xl font-bold hover:bg-red-50 transition shadow-lg flex items-center gap-2">
// // //                     <Plus size={20}/> Tulis Ceritamu
// // //                 </button>
// // //             </div>
// // //             <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-y-10 translate-x-10"></div>
// // //         </div>

// // //         {/* LIST BLOGS */}
// // //         {loading ? <div className="text-center py-20">Memuat cerita...</div> : 
// // //          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// // //             {blogs.map((blog) => (
// // //                 <Link href={`/blog/${blog._id}`} key={blog._id} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition border border-gray-100 overflow-hidden flex flex-col h-full">
// // //                     <div className="h-48 bg-gray-200 relative overflow-hidden">
// // //                         {blog.coverUrl ? (
// // //                             <img src={getImageUrl(blog.coverUrl)} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt={blog.title}/>
// // //                         ) : (
// // //                             <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100"><BookOpen size={48} opacity={0.2}/></div>
// // //                         )}
// // //                         <div className="absolute top-3 left-3 flex flex-wrap gap-2">
// // //                             {blog.tags.slice(0, 2).map((t:string, i:number) => (
// // //                                 <span key={i} className="bg-black/60 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded font-bold uppercase">{t}</span>
// // //                             ))}
// // //                         </div>
// // //                     </div>
// // //                     <div className="p-6 flex-1 flex flex-col">
// // //                         <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
// // //                             <Calendar size={12}/> {new Date(blog.createdAt).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}
// // //                         </div>
// // //                         <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-red-700 transition">{blog.title}</h3>
// // //                         <div className="text-gray-500 text-sm line-clamp-3 mb-4 flex-1" dangerouslySetInnerHTML={{ __html: blog.content }}></div>
// // //                         <div className="flex items-center gap-3 pt-4 border-t border-gray-50 mt-auto">
// // //                             <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden border border-gray-200">
// // //                                 <img src={blog.author?.avatarUrl ? getImageUrl(blog.author.avatarUrl) : `https://ui-avatars.com/api/?name=${blog.author?.name || 'User'}`} className="w-full h-full object-cover" alt="Avatar"/>
// // //                             </div>
// // //                             <span className="text-xs font-bold text-gray-600">{blog.author?.name || 'Relawan'}</span>
// // //                         </div>
// // //                     </div>
// // //                 </Link>
// // //             ))}
// // //          </div>
// // //         }

// // //         {/* MODAL CREATE WITH WYSIWYG & IMAGE UPLOAD */}
// // //         {isModalOpen && (
// // //             <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
// // //                 <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
// // //                     <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center flex-shrink-0">
// // //                         <h2 className="text-lg font-bold">Tulis Cerita Relawan</h2>
// // //                         <button onClick={() => setIsModalOpen(false)} aria-label="Tutup Modal"><X className="text-gray-400 hover:text-red-600"/></button>
// // //                     </div>
                    
// // //                     <div className="p-6 overflow-y-auto custom-scrollbar">
// // //                         <form onSubmit={handleSubmit} className="space-y-6">
// // //                             <div>
// // //                                 <label className="block text-xs font-bold text-gray-500 mb-1">Judul Cerita</label>
// // //                                 <input required className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none" value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="Contoh: Pengalaman di Posko Bencana"/>
// // //                             </div>
                            
// // //                             <div className="border-2 border-dashed border-gray-200 bg-gray-50 p-4 rounded-xl text-center">
// // //                                 {form.coverUrl ? (
// // //                                     <div className="relative h-40 w-full rounded-lg overflow-hidden">
// // //                                         <img src={getImageUrl(form.coverUrl)} className="w-full h-full object-cover" alt="Cover"/>
// // //                                         <button type="button" onClick={() => setForm({...form, coverUrl: ''})} className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full" aria-label="Hapus Cover"><X size={14}/></button>
// // //                                     </div>
// // //                                 ) : (
// // //                                     <label className="cursor-pointer flex flex-col items-center justify-center gap-2 py-4">
// // //                                         <UploadCloud className="text-gray-400" size={32}/>
// // //                                         <span className="text-xs font-bold text-gray-500">{uploading ? 'Mengupload...' : 'Upload Foto Sampul'}</span>
// // //                                         <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading}/>
// // //                                     </label>
// // //                                 )}
// // //                             </div>

// // //                             {/* TEXT EDITOR (WYSIWYG) */}
// // //                             <div>
// // //                                 <label className="block text-xs font-bold text-gray-500 mb-1">Isi Cerita (Bisa masukkan gambar)</label>
// // //                                 <div className="h-64 mb-12"> 
// // //                                     <ReactQuill 
// // //                                         ref={quillRef}
// // //                                         theme="snow" 
// // //                                         value={form.content} 
// // //                                         onChange={(val: string) => setForm({...form, content: val})} 
// // //                                         modules={modules}
// // //                                         className="h-full"
// // //                                         placeholder="Tuliskan pengalaman inspiratifmu di sini..."
// // //                                     />
// // //                                 </div>
// // //                             </div>

// // //                             <div>
// // //                                 <label className="block text-xs font-bold text-gray-500 mb-1">Tags (Pisahkan koma)</label>
// // //                                 <input className="w-full border rounded-lg px-3 py-2 text-sm" value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} placeholder="Relawan, Inspirasi, Lapangan"/>
// // //                             </div>
                            
// // //                             <div className="pt-4 flex justify-end gap-3 border-t">
// // //                                 <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-gray-600 font-bold hover:bg-gray-100 rounded-xl">Batal</button>
// // //                                 <button type="submit" disabled={uploading} className="px-6 py-2.5 bg-red-700 text-white font-bold hover:bg-red-800 rounded-xl disabled:opacity-50">Kirim Cerita</button>
// // //                             </div>
// // //                         </form>
// // //                     </div>
// // //                 </div>
// // //             </div>
// // //         )}
// // //       </div>
// // //     </Protected>
// // //   );
// // // }


// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { api, getImageUrl } from '@/lib/api';
// import { useAuth } from '@/lib/AuthProvider';
// import { Search, Calendar, User, ArrowRight, BookOpen, Loader2, PenTool } from 'lucide-react';

// export default function BlogPage() {
//   const { user } = useAuth();
//   const [blogs, setBlogs] = useState<any[]>([]); // Pastikan init array
//   const [content, setContent] = useState<any>(null);
//   const [currentSlide, setCurrentSlide] = useState(0);
  
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState('');
  
//   // Fetch Data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
        
//         // Panggil API
//         const [contentData, blogsRes] = await Promise.all([
//             api('/api/content').catch(() => null), 
//             api(`/api/blog/public?search=${search}`)
//         ]);

//         setContent(contentData);

//         // [FIX LOGIC] Cek struktur response
//         if (blogsRes && blogsRes.data && Array.isArray(blogsRes.data)) {
//             // Format baru: { data: [...], pagination: ... }
//             setBlogs(blogsRes.data);
//         } else if (Array.isArray(blogsRes)) {
//             // Format lama (fallback): [...]
//             setBlogs(blogsRes);
//         } else {
//             setBlogs([]); // Default kosong jika error/format salah
//         }
        
//       } catch (err) {
//         console.error("Gagal memuat data:", err);
//         setBlogs([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const timer = setTimeout(() => {
//         fetchData();
//     }, 500);

//     return () => clearTimeout(timer);
//   }, [search]);

//   // Timer Slide
//   useEffect(() => {
//     if (content?.slides?.length > 1) {
//       const timer = setInterval(() => {
//         setCurrentSlide((prev) => (prev + 1) % content.slides.length);
//       }, 5000);
//       return () => clearInterval(timer);
//     }
//   }, [content]);

//   return (
//     <div className="min-h-screen bg-gray-50 font-sans">
      
//       {/* 1. HERO HEADER (Background Slideshow) */}
//       <div className="relative text-white py-24 md:py-32 px-6 overflow-hidden shadow-xl transition-all duration-500 bg-[#990000]">
//         <div className="absolute inset-0 z-0 pointer-events-none">
//             {content?.slides && content.slides.length > 0 ? (
//                 content.slides.map((slide: string, index: number) => (
//                     <div 
//                         key={index} 
//                         className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
//                     >
//                         <img 
//                             src={getImageUrl(slide)} 
//                             alt={`Hero Slide ${index}`} 
//                             className="w-full h-full object-cover object-center" 
//                         />
//                     </div>
//                 ))
//             ) : (
//                 <img 
//                     src={content?.heroBgUrl ? getImageUrl(content.heroBgUrl) : "/pmi-logo.png"} 
//                     alt="Hero Default" 
//                     className="w-full h-full object-cover object-center opacity-50" 
//                 />
//             )}
//             <div className="absolute inset-0 bg-gradient-to-r from-[#990000]/95 via-[#990000]/85 to-[#7a0000]/70 z-10 mix-blend-multiply"></div>
//             <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
//         </div>

//         <div className="max-w-7xl mx-auto relative z-20 text-center">
//             <h1 className="text-3xl md:text-4xl font-extrabold mb-3 drop-shadow-md">Cerita Relawan</h1>
//             <p className="text-red-100 text-base md:text-lg max-w-2xl mx-auto drop-shadow-sm mb-6 font-light">
//                 Berita terbaru, kisah inspiratif, dan wawasan dari lapangan.
//             </p>

//             {user && (
//                 <div className="flex justify-center mb-6 animate-in fade-in slide-in-from-bottom-3 duration-700">
//                     <Link href="/blog/create" className="bg-white/95 backdrop-blur-sm text-[#990000] px-6 py-2.5 rounded-full font-bold hover:bg-white transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2 group border-2 border-transparent hover:border-red-100 text-sm">
//                         <PenTool size={16} className="group-hover:-rotate-12 transition-transform"/> 
//                         Tulis Cerita Saya
//                     </Link>
//                 </div>
//             )}

//             <div className="max-w-lg mx-auto relative">
//                 <input 
//                     type="text" 
//                     placeholder="Cari artikel atau berita..." 
//                     className="w-full pl-10 pr-4 py-3 rounded-full text-gray-800 shadow-lg focus:outline-none focus:ring-4 focus:ring-red-500/20 transition-all border-2 border-white/80 focus:border-red-300 placeholder:text-gray-400 text-sm bg-white/95 backdrop-blur-md"
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                 />
//                 <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18}/>
//             </div>
//         </div>
//       </div>

//       {/* 2. BLOG GRID */}
//       <div className="max-w-7xl mx-auto px-6 -mt-16 pb-24 relative z-20">
//         {loading ? (
//             <div className="flex flex-col items-center justify-center py-24 bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-gray-100 min-h-[400px]">
//                 <Loader2 className="animate-spin text-[#990000] mb-4" size={48}/>
//                 <p className="text-gray-500 font-medium">Sedang memuat cerita...</p>
//             </div>
//         ) : blogs.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {blogs.map((blog, idx) => (
//                     <Link href={`/blog/${blog._id}`} key={blog._id || idx} className="group bg-white rounded-3xl border border-gray-100 shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full relative">
//                         <div className="h-56 bg-gray-200 relative overflow-hidden">
//                             {blog.coverUrl ? (
//                                 <img 
//                                     src={getImageUrl(blog.coverUrl)} 
//                                     alt={blog.title} 
//                                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                                 />
//                             ) : (
//                                 <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100">
//                                     <BookOpen size={48} opacity={0.2}/>
//                                 </div>
//                             )}
//                             <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
//                             <div className="absolute top-4 left-4 flex gap-1 flex-wrap">
//                                 {blog.tags && Array.isArray(blog.tags) && blog.tags.slice(0, 2).map((tag: string, i: number) => (
//                                     <span key={i} className="bg-[#990000]/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
//                                         {tag}
//                                     </span>
//                                 ))}
//                                 {(!blog.tags || blog.tags.length === 0) && (
//                                      <span className="bg-[#990000]/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">Umum</span>
//                                 )}
//                             </div>
//                         </div>

//                         <div className="p-8 flex-1 flex flex-col">
//                             <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 font-medium border-b border-gray-100 pb-4">
//                                 <span className="flex items-center gap-1.5">
//                                     <Calendar size={14} className="text-[#990000]"/> 
//                                     {new Date(blog.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
//                                 </span>
//                                 <span className="flex items-center gap-1.5">
//                                     <User size={14} className="text-[#990000]"/> 
//                                     <span className="truncate max-w-[100px]">{blog.author?.name || 'Admin'}</span>
//                                 </span>
//                             </div>
                            
//                             <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#990000] transition-colors leading-tight line-clamp-2">
//                                 {blog.title}
//                             </h3>
                            
//                             <div 
//                                 className="text-gray-500 text-sm line-clamp-3 mb-6 leading-relaxed flex-1"
//                                 dangerouslySetInnerHTML={{ 
//                                     __html: blog.content ? blog.content.replace(/<[^>]+>/g, '').substring(0, 150) + "..." : "Tidak ada deskripsi singkat." 
//                                 }}
//                             ></div>

//                             <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
//                                 <span className="text-[#990000] font-bold text-sm group-hover:underline flex items-center gap-1">
//                                     Baca Selengkapnya <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
//                                 </span>
//                             </div>
//                         </div>
//                     </Link>
//                 ))}
//             </div>
//         ) : (
//             <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-gray-100">
//                 <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-100">
//                     <BookOpen className="text-gray-300" size={40}/>
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-2">Belum ada cerita ditemukan</h3>
//                 <p className="text-gray-500 text-sm max-w-md mx-auto">
//                     {search ? `Tidak ada hasil untuk kata kunci "${search}".` : "Belum ada konten yang dipublikasikan saat ini."}
//                 </p>
//                 {search && (
//                     <button onClick={() => setSearch('')} className="mt-6 text-[#990000] font-bold hover:underline text-sm">Hapus pencarian</button>
//                 )}
//             </div>
//         )}
//       </div>
//     </div>
//   );
// }



'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { api, getImageUrl } from '@/lib/api';
import { useAuth } from '@/lib/AuthProvider';
import { Search, Calendar, User, ArrowRight, BookOpen, Loader2, PenTool, Eye, MessageCircle } from 'lucide-react';

export default function BlogPage() {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState<any[]>([]); // Pastikan init array
  const [content, setContent] = useState<any>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Panggil API
        const [contentData, blogsRes] = await Promise.all([
            api('/api/content').catch(() => null), 
            api(`/api/blog/public?search=${search}`)
        ]);

        setContent(contentData);

        // [FIX LOGIC] Cek struktur response
        if (blogsRes && blogsRes.data && Array.isArray(blogsRes.data)) {
            // Format baru: { data: [...], pagination: ... }
            setBlogs(blogsRes.data);
        } else if (Array.isArray(blogsRes)) {
            // Format lama (fallback): [...]
            setBlogs(blogsRes);
        } else {
            setBlogs([]); // Default kosong jika error/format salah
        }
        
      } catch (err) {
        console.error("Gagal memuat data:", err);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
        fetchData();
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // Timer Slide
  useEffect(() => {
    if (content?.slides?.length > 1) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % content.slides.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [content]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* 1. HERO HEADER (Background Slideshow) */}
      <div className="relative text-white py-24 md:py-32 px-6 overflow-hidden shadow-xl transition-all duration-500 bg-[#990000]">
        <div className="absolute inset-0 z-0 pointer-events-none">
            {content?.slides && content.slides.length > 0 ? (
                content.slides.map((slide: string, index: number) => (
                    <div 
                        key={index} 
                        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <img 
                            src={getImageUrl(slide)} 
                            alt={`Hero Slide ${index}`} 
                            className="w-full h-full object-cover object-center" 
                        />
                    </div>
                ))
            ) : (
                <img 
                    src={content?.heroBgUrl ? getImageUrl(content.heroBgUrl) : "/pmi-logo.png"} 
                    alt="Hero Default" 
                    className="w-full h-full object-cover object-center opacity-50" 
                />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-[#990000]/95 via-[#990000]/85 to-[#7a0000]/70 z-10 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-20 text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-3 drop-shadow-md">Cerita Relawan</h1>
            <p className="text-red-100 text-base md:text-lg max-w-2xl mx-auto drop-shadow-sm mb-6 font-light">
                Berita terbaru, kisah inspiratif, dan wawasan dari lapangan.
            </p>

            {user && (
                <div className="flex justify-center mb-6 animate-in fade-in slide-in-from-bottom-3 duration-700">
                    <Link href="/blog/create" className="bg-white/95 backdrop-blur-sm text-[#990000] px-6 py-2.5 rounded-full font-bold hover:bg-white transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2 group border-2 border-transparent hover:border-red-100 text-sm">
                        <PenTool size={16} className="group-hover:-rotate-12 transition-transform"/> 
                        Tulis Cerita Saya
                    </Link>
                </div>
            )}

            <div className="max-w-lg mx-auto relative">
                <input 
                    type="text" 
                    placeholder="Cari artikel atau berita..." 
                    className="w-full pl-10 pr-4 py-3 rounded-full text-gray-800 shadow-lg focus:outline-none focus:ring-4 focus:ring-red-500/20 transition-all border-2 border-white/80 focus:border-red-300 placeholder:text-gray-400 text-sm bg-white/95 backdrop-blur-md"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18}/>
            </div>
        </div>
      </div>

      {/* 2. BLOG GRID */}
      <div className="max-w-7xl mx-auto px-6 -mt-16 pb-24 relative z-20">
        {loading ? (
            <div className="flex flex-col items-center justify-center py-24 bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-gray-100 min-h-[400px]">
                <Loader2 className="animate-spin text-[#990000] mb-4" size={48}/>
                <p className="text-gray-500 font-medium">Sedang memuat cerita...</p>
            </div>
        ) : blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog, idx) => (
                    <Link href={`/blog/${blog._id}`} key={blog._id || idx} className="group bg-white rounded-3xl border border-gray-100 shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full relative">
                        <div className="h-56 bg-gray-200 relative overflow-hidden">
                            {blog.coverUrl ? (
                                <img 
                                    src={getImageUrl(blog.coverUrl)} 
                                    alt={blog.title} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100">
                                    <BookOpen size={48} opacity={0.2}/>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                            <div className="absolute top-4 left-4 flex gap-1 flex-wrap">
                                {blog.tags && Array.isArray(blog.tags) && blog.tags.slice(0, 2).map((tag: string, i: number) => (
                                    <span key={i} className="bg-[#990000]/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                                        {tag}
                                    </span>
                                ))}
                                {(!blog.tags || blog.tags.length === 0) && (
                                     <span className="bg-[#990000]/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">Umum</span>
                                )}
                            </div>
                        </div>

                        <div className="p-8 flex-1 flex flex-col">
                            <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 font-medium border-b border-gray-100 pb-4">
                                <span className="flex items-center gap-1.5">
                                    <Calendar size={14} className="text-[#990000]"/> 
                                    {new Date(blog.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </span>
                                {/* STATISTIK: Dilihat */}
                                <span className="flex items-center gap-1.5" title="Dilihat">
                                    <Eye size={14} className="text-[#990000]"/> 
                                    {blog.views || 0}
                                </span>
                                {/* STATISTIK: Komentar */}
                                <span className="flex items-center gap-1.5" title="Komentar">
                                    <MessageCircle size={14} className="text-[#990000]"/> 
                                    {blog.commentCount || 0}
                                </span>
                            </div>
                            
                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#990000] transition-colors leading-tight line-clamp-2">
                                {blog.title}
                            </h3>
                            
                            <div 
                                className="text-gray-500 text-sm line-clamp-3 mb-6 leading-relaxed flex-1"
                                dangerouslySetInnerHTML={{ 
                                    __html: blog.content ? blog.content.replace(/<[^>]+>/g, '').substring(0, 150) + "..." : "Tidak ada deskripsi singkat." 
                                }}
                            ></div>

                            <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
                                <span className="text-[#990000] font-bold text-sm group-hover:underline flex items-center gap-1">
                                    Baca Selengkapnya <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
                                </span>
                                <span className="flex items-center gap-1.5 text-xs text-gray-400">
                                    <User size={14} className="text-gray-400"/> 
                                    <span className="truncate max-w-[100px]">{blog.author?.name || 'Admin'}</span>
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        ) : (
            <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-gray-100">
                <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-100">
                    <BookOpen className="text-gray-300" size={40}/>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Belum ada cerita ditemukan</h3>
                <p className="text-gray-500 text-sm max-w-md mx-auto">
                    {search ? `Tidak ada hasil untuk kata kunci "${search}".` : "Belum ada konten yang dipublikasikan saat ini."}
                </p>
                {search && (
                    <button onClick={() => setSearch('')} className="mt-6 text-[#990000] font-bold hover:underline text-sm">Hapus pencarian</button>
                )}
            </div>
        )}
      </div>
    </div>
  );
}
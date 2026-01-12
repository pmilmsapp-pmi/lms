
// // // // // // // 'use client';

// // // // // // // import { useState, useEffect, useMemo, useRef } from 'react';
// // // // // // // import dynamic from 'next/dynamic'; 
// // // // // // // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // // // // // // import Protected from '@/components/Protected';
// // // // // // // import { Check, X, Trash2, DownloadCloud, FileText, Pencil, UploadCloud, Save } from 'lucide-react';

// // // // // // // // FIX TYPESCRIPT ERROR: Tambahkan 'as any' di sini
// // // // // // // const ReactQuill = dynamic(() => import('react-quill'), { ssr: false }) as any;
// // // // // // // import 'react-quill/dist/quill.snow.css';

// // // // // // // export default function AdminBlogPage() {
// // // // // // //   const [blogs, setBlogs] = useState<any[]>([]);
// // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // //   const [importing, setImporting] = useState(false);

// // // // // // //   // EDIT STATE
// // // // // // //   const [editingBlog, setEditingBlog] = useState<any>(null);
// // // // // // //   const [editForm, setEditForm] = useState({ title: '', content: '', coverUrl: '', tags: '' });
// // // // // // //   const [isEditModalOpen, setIsEditModalOpen] = useState(false);

// // // // // // //   // REF UNTUK QUILL
// // // // // // //   const quillRef = useRef<any>(null);

// // // // // // //   useEffect(() => { loadData(); }, []);

// // // // // // //   // --- CONFIGURASI EDITOR ---
// // // // // // //   const imageHandler = () => {
// // // // // // //     const input = document.createElement('input');
// // // // // // //     input.setAttribute('type', 'file');
// // // // // // //     input.setAttribute('accept', 'image/*');
// // // // // // //     input.click();

// // // // // // //     input.onchange = async () => {
// // // // // // //       const file = input.files ? input.files[0] : null;
// // // // // // //       if (!file) return;

// // // // // // //       try {
// // // // // // //         const fd = new FormData();
// // // // // // //         fd.append('file', file);
// // // // // // //         const res = await apiUpload('/api/upload', fd);
// // // // // // //         const url = getImageUrl(res.url || res.file?.url);

// // // // // // //         // Akses editor via Ref
// // // // // // //         const quill = quillRef.current.getEditor();
// // // // // // //         const range = quill.getSelection();
// // // // // // //         quill.insertEmbed(range.index, 'image', url);
// // // // // // //       } catch (err) {
// // // // // // //         alert('Gagal upload gambar ke editor');
// // // // // // //         console.error(err);
// // // // // // //       }
// // // // // // //     };
// // // // // // //   };

// // // // // // //   const modules = useMemo(() => ({
// // // // // // //     toolbar: {
// // // // // // //       container: [
// // // // // // //         [{ 'header': [1, 2, 3, false] }],
// // // // // // //         ['bold', 'italic', 'underline', 'strike', 'blockquote'],
// // // // // // //         [{ 'list': 'ordered'}, { 'list': 'bullet' }],
// // // // // // //         ['link', 'image'], 
// // // // // // //         ['clean']
// // // // // // //       ],
// // // // // // //       handlers: {
// // // // // // //         image: imageHandler 
// // // // // // //       }
// // // // // // //     }
// // // // // // //   }), []);

// // // // // // //   const loadData = async () => {
// // // // // // //     try {
// // // // // // //         setLoading(true);
// // // // // // //         const res = await api(`/api/blog/admin?t=${new Date().getTime()}`);
// // // // // // //         setBlogs(res || []);
// // // // // // //     } catch (e) { console.error(e); } finally { setLoading(false); }
// // // // // // //   };

// // // // // // //   const handleStatus = async (id: string, status: string) => {
// // // // // // //       if(!confirm(`Ubah status menjadi ${status}?`)) return;
// // // // // // //       try {
// // // // // // //           await api(`/api/blog/${id}/status`, { method: 'PATCH', body: { status } });
// // // // // // //           loadData();
// // // // // // //       } catch (e: any) { alert(e.message); }
// // // // // // //   };

// // // // // // //   const handleDelete = async (id: string) => {
// // // // // // //       if(!confirm("Hapus blog ini permanen?")) return;
// // // // // // //       try {
// // // // // // //           await api(`/api/blog/${id}`, { method: 'DELETE' });
// // // // // // //           loadData();
// // // // // // //       } catch (e: any) { alert(e.message); }
// // // // // // //   };

// // // // // // //   const handleImportPMI = async () => {
// // // // // // //       if(!confirm("Import 3 Kisah Relawan Nyata?")) return;
// // // // // // //       setImporting(true);
// // // // // // //       try {
// // // // // // //           await api('/api/blog/seed-pmi', { method: 'POST' });
// // // // // // //           alert("Berhasil import data!");
// // // // // // //           loadData();
// // // // // // //       } catch (e: any) { alert("Gagal import: " + e.message); } 
// // // // // // //       finally { setImporting(false); }
// // // // // // //   };

// // // // // // //   const openEditModal = (blog: any) => {
// // // // // // //       setEditingBlog(blog);
// // // // // // //       setEditForm({
// // // // // // //           title: blog.title,
// // // // // // //           content: blog.content,
// // // // // // //           coverUrl: blog.coverUrl || '',
// // // // // // //           tags: blog.tags.join(', ')
// // // // // // //       });
// // // // // // //       setIsEditModalOpen(true);
// // // // // // //   };

// // // // // // //   const handleUploadCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // //       if (!e.target.files?.[0]) return;
// // // // // // //       try {
// // // // // // //           const fd = new FormData(); fd.append('file', e.target.files[0]);
// // // // // // //           const res = await apiUpload('/api/upload', fd);
// // // // // // //           setEditForm(p => ({ ...p, coverUrl: res.url || res.file?.url }));
// // // // // // //       } catch (e) { alert("Upload gagal"); }
// // // // // // //   };

// // // // // // //   const handleSaveEdit = async (e: React.FormEvent) => {
// // // // // // //       e.preventDefault();
// // // // // // //       try {
// // // // // // //           const payload = {
// // // // // // //               ...editForm,
// // // // // // //               tags: editForm.tags.split(',').map(t => t.trim())
// // // // // // //           };
// // // // // // //           await api(`/api/blog/${editingBlog._id}`, { method: 'PATCH', body: payload });
// // // // // // //           alert("Blog berhasil diperbarui!");
// // // // // // //           setIsEditModalOpen(false);
// // // // // // //           loadData();
// // // // // // //       } catch (e: any) { alert("Gagal update: " + e.message); }
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <Protected roles={['SUPER_ADMIN', 'FACILITATOR']}>
// // // // // // //       <div className="max-w-7xl mx-auto p-6 font-sans">
// // // // // // //         <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
// // // // // // //             <div>
// // // // // // //                 <h1 className="text-2xl font-bold text-gray-800">Manajemen Blog & Cerita</h1>
// // // // // // //                 <p className="text-gray-500 text-sm">Moderasi cerita yang dikirim oleh peserta.</p>
// // // // // // //             </div>
// // // // // // //             <button 
// // // // // // //                 onClick={handleImportPMI} 
// // // // // // //                 disabled={importing}
// // // // // // //                 className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl font-bold hover:bg-blue-100 transition flex items-center gap-2 border border-blue-200"
// // // // // // //                 aria-label="Import Data PMI"
// // // // // // //             >
// // // // // // //                 <DownloadCloud size={18}/> {importing ? 'Mengambil Data...' : 'Import Data PMI'}
// // // // // // //             </button>
// // // // // // //         </div>

// // // // // // //         {loading ? <div className="text-center py-10">Memuat data...</div> : 
// // // // // // //          blogs.length === 0 ? <div className="text-center py-20 border-2 border-dashed rounded-xl bg-gray-50">Data Kosong. Klik Import untuk data dummy.</div> :
// // // // // // //          <div className="grid gap-4">
// // // // // // //             {blogs.map((blog) => (
// // // // // // //                 <div key={blog._id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 items-center">
// // // // // // //                     <div className="w-full md:w-32 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative group">
// // // // // // //                         {blog.coverUrl ? (
// // // // // // //                             <img src={getImageUrl(blog.coverUrl)} className="w-full h-full object-cover" alt={blog.title}/>
// // // // // // //                         ) : (
// // // // // // //                             <div className="flex items-center justify-center h-full text-gray-400"><FileText/></div>
// // // // // // //                         )}
// // // // // // //                     </div>
// // // // // // //                     <div className="flex-1">
// // // // // // //                         <div className="flex items-center gap-2 mb-1">
// // // // // // //                             <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${blog.status === 'approved' ? 'bg-green-100 text-green-700' : blog.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
// // // // // // //                                 {blog.status}
// // // // // // //                             </span>
// // // // // // //                             <span className="text-xs text-gray-400">• {new Date(blog.createdAt).toLocaleDateString()}</span>
// // // // // // //                             {blog.source === 'PMI Official' && <span className="text-[10px] bg-blue-100 text-blue-700 px-2 rounded-full font-bold">OFFICIAL</span>}
// // // // // // //                         </div>
// // // // // // //                         <h3 className="font-bold text-gray-800 text-lg mb-1">{blog.title}</h3>
// // // // // // //                         <div className="text-sm text-gray-500 line-clamp-1" dangerouslySetInnerHTML={{ __html: blog.content }}></div>
// // // // // // //                         <p className="text-xs text-gray-400 mt-2">Penulis: <span className="font-bold text-gray-600">{blog.author?.name || 'Anonim'}</span></p>
// // // // // // //                     </div>
                    
// // // // // // //                     <div className="flex gap-2">
// // // // // // //                         {blog.status === 'pending' && (
// // // // // // //                             <>
// // // // // // //                                 <button onClick={() => handleStatus(blog._id, 'approved')} className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100" title="Setujui" aria-label="Setujui"><Check size={18}/></button>
// // // // // // //                                 <button onClick={() => handleStatus(blog._id, 'rejected')} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100" title="Tolak" aria-label="Tolak"><X size={18}/></button>
// // // // // // //                             </>
// // // // // // //                         )}
// // // // // // //                         <button onClick={() => openEditModal(blog)} className="p-2 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100" title="Edit" aria-label="Edit Blog"><Pencil size={18}/></button>
// // // // // // //                         <button onClick={() => handleDelete(blog._id)} className="p-2 bg-gray-100 text-gray-500 rounded-lg hover:bg-gray-200 hover:text-red-600" title="Hapus" aria-label="Hapus Blog"><Trash2 size={18}/></button>
// // // // // // //                     </div>
// // // // // // //                 </div>
// // // // // // //             ))}
// // // // // // //          </div>
// // // // // // //         }

// // // // // // //         {/* MODAL EDIT DENGAN WYSIWYG */}
// // // // // // //         {isEditModalOpen && (
// // // // // // //             <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
// // // // // // //                 <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
// // // // // // //                     <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center sticky top-0 flex-shrink-0">
// // // // // // //                         <h2 className="text-lg font-bold">Edit Blog</h2>
// // // // // // //                         <button onClick={() => setIsEditModalOpen(false)} aria-label="Tutup"><X className="text-gray-400 hover:text-red-600"/></button>
// // // // // // //                     </div>
                    
// // // // // // //                     <div className="p-6 overflow-y-auto custom-scrollbar">
// // // // // // //                         <form onSubmit={handleSaveEdit} className="space-y-4">
// // // // // // //                             <div>
// // // // // // //                                 <label className="block text-xs font-bold text-gray-500 mb-1">Judul</label>
// // // // // // //                                 <input className="w-full border rounded-lg px-3 py-2" value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} aria-label="Judul Blog"/>
// // // // // // //                             </div>
                            
// // // // // // //                             <div className="border border-dashed p-4 rounded-lg text-center">
// // // // // // //                                 {editForm.coverUrl && <img src={getImageUrl(editForm.coverUrl)} className="h-32 mx-auto object-cover rounded mb-2" alt="Cover"/>}
// // // // // // //                                 <label className="cursor-pointer bg-gray-100 px-4 py-2 rounded text-xs font-bold flex items-center justify-center gap-2">
// // // // // // //                                     <UploadCloud size={14}/> Ganti Cover
// // // // // // //                                     <input type="file" className="hidden" onChange={handleUploadCover} accept="image/*" aria-label="Upload Cover"/>
// // // // // // //                                 </label>
// // // // // // //                             </div>

// // // // // // //                             {/* TEXT EDITOR QUILL */}
// // // // // // //                             <div>
// // // // // // //                                 <label className="block text-xs font-bold text-gray-500 mb-1">Konten Cerita</label>
// // // // // // //                                 <div className="h-64 mb-12">
// // // // // // //                                     <ReactQuill 
// // // // // // //                                         ref={quillRef}
// // // // // // //                                         theme="snow"
// // // // // // //                                         value={editForm.content}
// // // // // // //                                         onChange={(val: string) => setEditForm({...editForm, content: val})}
// // // // // // //                                         modules={modules}
// // // // // // //                                         className="h-full"
// // // // // // //                                         placeholder="Tulis cerita di sini..."
// // // // // // //                                     />
// // // // // // //                                 </div>
// // // // // // //                             </div>
                            
// // // // // // //                             <div>
// // // // // // //                                 <label className="block text-xs font-bold text-gray-500 mb-1">Tags</label>
// // // // // // //                                 <input className="w-full border rounded-lg px-3 py-2" value={editForm.tags} onChange={e => setEditForm({...editForm, tags: e.target.value})} aria-label="Tags Blog"/>
// // // // // // //                             </div>

// // // // // // //                             <div className="pt-4 border-t flex justify-end gap-2">
// // // // // // //                                 <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-gray-600" aria-label="Batal">Batal</button>
// // // // // // //                                 <button type="submit" className="px-6 py-2 bg-amber-500 text-white rounded-lg font-bold hover:bg-amber-600 flex items-center gap-2" aria-label="Simpan"><Save size={16}/> Simpan</button>
// // // // // // //                             </div>
// // // // // // //                         </form>
// // // // // // //                     </div>
// // // // // // //                 </div>
// // // // // // //             </div>
// // // // // // //         )}
// // // // // // //       </div>
// // // // // // //     </Protected>
// // // // // // //   );
// // // // // // // }'use client';

// // // // // // import { useState, useEffect, useMemo, useRef } from 'react';
// // // // // // import dynamic from 'next/dynamic'; 
// // // // // // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // // // // // import Protected from '@/components/Protected';
// // // // // // import { Check, X, Trash2, DownloadCloud, FileText, Pencil, UploadCloud, Save, Send, CheckCircle, Clock } from 'lucide-react';

// // // // // // // FIX TYPESCRIPT ERROR: Tambahkan 'as any' di sini
// // // // // // const ReactQuill = dynamic(() => import('react-quill'), { ssr: false }) as any;
// // // // // // import 'react-quill/dist/quill.snow.css';

// // // // // // export default function AdminBlogPage() {
// // // // // //   const [blogs, setBlogs] = useState<any[]>([]);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [importing, setImporting] = useState(false);
// // // // // //   const [publishingId, setPublishingId] = useState<string | null>(null);

// // // // // //   // EDIT STATE
// // // // // //   const [editingBlog, setEditingBlog] = useState<any>(null);
// // // // // //   const [editForm, setEditForm] = useState({ title: '', content: '', coverUrl: '', tags: '' });
// // // // // //   const [isEditModalOpen, setIsEditModalOpen] = useState(false);

// // // // // //   // REF UNTUK QUILL
// // // // // //   const quillRef = useRef<any>(null);

// // // // // //   useEffect(() => { loadData(); }, []);

// // // // // //   // --- CONFIGURASI EDITOR ---
// // // // // //   const imageHandler = () => {
// // // // // //     const input = document.createElement('input');
// // // // // //     input.setAttribute('type', 'file');
// // // // // //     input.setAttribute('accept', 'image/*');
// // // // // //     input.click();

// // // // // //     input.onchange = async () => {
// // // // // //       const file = input.files ? input.files[0] : null;
// // // // // //       if (!file) return;

// // // // // //       try {
// // // // // //         const fd = new FormData();
// // // // // //         fd.append('file', file);
// // // // // //         const res = await apiUpload('/api/upload', fd);
// // // // // //         const url = getImageUrl(res.url || res.file?.url);

// // // // // //         // Akses editor via Ref
// // // // // //         const quill = quillRef.current.getEditor();
// // // // // //         const range = quill.getSelection();
// // // // // //         quill.insertEmbed(range.index, 'image', url);
// // // // // //       } catch (err) {
// // // // // //         alert('Gagal upload gambar ke editor');
// // // // // //         console.error(err);
// // // // // //       }
// // // // // //     };
// // // // // //   };

// // // // // //   const modules = useMemo(() => ({
// // // // // //     toolbar: {
// // // // // //       container: [
// // // // // //         [{ 'header': [1, 2, 3, false] }],
// // // // // //         ['bold', 'italic', 'underline', 'strike', 'blockquote'],
// // // // // //         [{ 'list': 'ordered'}, { 'list': 'bullet' }],
// // // // // //         ['link', 'image'], 
// // // // // //         ['clean']
// // // // // //       ],
// // // // // //       handlers: {
// // // // // //         image: imageHandler 
// // // // // //       }
// // // // // //     }
// // // // // //   }), []);

// // // // // //   const loadData = async () => {
// // // // // //     try {
// // // // // //         setLoading(true);
// // // // // //         const res = await api(`/api/blog/admin?t=${new Date().getTime()}`);
// // // // // //         setBlogs(res || []);
// // // // // //     } catch (e) { console.error(e); } finally { setLoading(false); }
// // // // // //   };

// // // // // //   const handleStatus = async (id: string, status: string) => {
// // // // // //       if(!confirm(`Ubah status menjadi ${status}?`)) return;
// // // // // //       try {
// // // // // //           await api(`/api/blog/${id}/status`, { method: 'PATCH', body: { status } });
// // // // // //           loadData();
// // // // // //       } catch (e: any) { alert(e.message); }
// // // // // //   };

// // // // // //   // --- FITUR BARU: PUBLIKASI & BLASTING NOTIF ---
// // // // // //   const handlePublish = async (blog: any) => {
// // // // // //       // Cek apakah ini blog Official (Admin) atau User
// // // // // //       const isOfficial = blog.author?.role === 'SUPER_ADMIN' || blog.author?.role === 'FACILITATOR';
// // // // // //       const confirmMsg = isOfficial 
// // // // // //         ? `Publikasikan "${blog.title}"? \n\nIni akan mengirim notifikasi ke SELURUH USER.`
// // // // // //         : `Setujui cerita "${blog.title}"? \n\nPenulis akan menerima notifikasi.`;

// // // // // //       if(!confirm(confirmMsg)) return;

// // // // // //       try {
// // // // // //           setPublishingId(blog._id);
// // // // // //           // Panggil endpoint update status (Backend akan handle notifikasi)
// // // // // //           await api(`/api/blog/${blog._id}/status`, { 
// // // // // //               method: 'PATCH', 
// // // // // //               body: { status: 'approved' } // atau 'published' sesuai schema
// // // // // //           });
          
// // // // // //           alert("Berhasil dipublikasikan!");
// // // // // //           loadData();
// // // // // //       } catch (e: any) {
// // // // // //           alert("Gagal publish: " + e.message);
// // // // // //       } finally {
// // // // // //           setPublishingId(null);
// // // // // //       }
// // // // // //   };

// // // // // //   const handleDelete = async (id: string) => {
// // // // // //       if(!confirm("Hapus blog ini permanen?")) return;
// // // // // //       try {
// // // // // //           await api(`/api/blog/${id}`, { method: 'DELETE' });
// // // // // //           loadData();
// // // // // //       } catch (e: any) { alert(e.message); }
// // // // // //   };

// // // // // //   const handleImportPMI = async () => {
// // // // // //       if(!confirm("Import 3 Kisah Relawan Nyata?")) return;
// // // // // //       setImporting(true);
// // // // // //       try {
// // // // // //           await api('/api/blog/seed-pmi', { method: 'POST' });
// // // // // //           alert("Berhasil import data!");
// // // // // //           loadData();
// // // // // //       } catch (e: any) { alert("Gagal import: " + e.message); } 
// // // // // //       finally { setImporting(false); }
// // // // // //   };

// // // // // //   const openEditModal = (blog: any) => {
// // // // // //       setEditingBlog(blog);
// // // // // //       setEditForm({
// // // // // //           title: blog.title,
// // // // // //           content: blog.content,
// // // // // //           coverUrl: blog.coverUrl || '',
// // // // // //           tags: blog.tags ? blog.tags.join(', ') : ''
// // // // // //       });
// // // // // //       setIsEditModalOpen(true);
// // // // // //   };

// // // // // //   const handleUploadCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // //       if (!e.target.files?.[0]) return;
// // // // // //       try {
// // // // // //           const fd = new FormData(); fd.append('file', e.target.files[0]);
// // // // // //           const res = await apiUpload('/api/upload', fd);
// // // // // //           setEditForm(p => ({ ...p, coverUrl: res.url || res.file?.url }));
// // // // // //       } catch (e) { alert("Upload gagal"); }
// // // // // //   };

// // // // // //   const handleSaveEdit = async (e: React.FormEvent) => {
// // // // // //       e.preventDefault();
// // // // // //       try {
// // // // // //           const payload = {
// // // // // //               ...editForm,
// // // // // //               tags: editForm.tags.split(',').map(t => t.trim())
// // // // // //           };
// // // // // //           await api(`/api/blog/${editingBlog._id}`, { method: 'PATCH', body: payload });
// // // // // //           alert("Blog berhasil diperbarui!");
// // // // // //           setIsEditModalOpen(false);
// // // // // //           loadData();
// // // // // //       } catch (e: any) { alert("Gagal update: " + e.message); }
// // // // // //   };

// // // // // //   return (
// // // // // //     <Protected roles={['SUPER_ADMIN', 'FACILITATOR']}>
// // // // // //       <div className="max-w-7xl mx-auto p-6 font-sans">
// // // // // //         <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
// // // // // //             <div>
// // // // // //                 <h1 className="text-2xl font-bold text-gray-800">Manajemen Blog & Cerita</h1>
// // // // // //                 <p className="text-gray-500 text-sm">Moderasi cerita yang dikirim oleh peserta.</p>
// // // // // //             </div>
// // // // // //             <button 
// // // // // //                 onClick={handleImportPMI} 
// // // // // //                 disabled={importing}
// // // // // //                 className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl font-bold hover:bg-blue-100 transition flex items-center gap-2 border border-blue-200"
// // // // // //                 aria-label="Import Data PMI"
// // // // // //             >
// // // // // //                 <DownloadCloud size={18}/> {importing ? 'Mengambil Data...' : 'Import Data PMI'}
// // // // // //             </button>
// // // // // //         </div>

// // // // // //         {loading ? <div className="text-center py-10">Memuat data...</div> : 
// // // // // //          blogs.length === 0 ? <div className="text-center py-20 border-2 border-dashed rounded-xl bg-gray-50">Data Kosong. Klik Import untuk data dummy.</div> :
// // // // // //          <div className="grid gap-4">
// // // // // //             {blogs.map((blog) => (
// // // // // //                 <div key={blog._id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 items-center hover:shadow-md transition-shadow">
// // // // // //                     <div className="w-full md:w-32 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative group">
// // // // // //                         {blog.coverUrl ? (
// // // // // //                             <img src={getImageUrl(blog.coverUrl)} className="w-full h-full object-cover" alt={blog.title}/>
// // // // // //                         ) : (
// // // // // //                             <div className="flex items-center justify-center h-full text-gray-400"><FileText/></div>
// // // // // //                         )}
// // // // // //                     </div>
// // // // // //                     <div className="flex-1">
// // // // // //                         <div className="flex items-center gap-2 mb-1">
// // // // // //                             <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase flex items-center gap-1 ${blog.status === 'approved' ? 'bg-green-100 text-green-700' : blog.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
// // // // // //                                 {blog.status === 'approved' && <CheckCircle size={10}/>}
// // // // // //                                 {blog.status === 'pending' && <Clock size={10}/>}
// // // // // //                                 {blog.status}
// // // // // //                             </span>
// // // // // //                             <span className="text-xs text-gray-400">• {new Date(blog.createdAt).toLocaleDateString()}</span>
// // // // // //                             {(blog.author?.role === 'SUPER_ADMIN' || blog.author?.role === 'FACILITATOR') && (
// // // // // //                                 <span className="text-[10px] bg-blue-100 text-blue-700 px-2 rounded-full font-bold border border-blue-200">OFFICIAL</span>
// // // // // //                             )}
// // // // // //                         </div>
// // // // // //                         <h3 className="font-bold text-gray-800 text-lg mb-1">{blog.title}</h3>
// // // // // //                         <div className="text-sm text-gray-500 line-clamp-1" dangerouslySetInnerHTML={{ __html: blog.content }}></div>
// // // // // //                         <p className="text-xs text-gray-400 mt-2">Penulis: <span className="font-bold text-gray-600">{blog.author?.name || 'Anonim'}</span></p>
// // // // // //                     </div>
                    
// // // // // //                     <div className="flex gap-2">
// // // // // //                         {/* TOMBOL PUBLISH (Hanya muncul jika belum approved) */}
// // // // // //                         {blog.status !== 'approved' && (
// // // // // //                             <button 
// // // // // //                                 onClick={() => handlePublish(blog)}
// // // // // //                                 disabled={publishingId === blog._id}
// // // // // //                                 className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-xs font-bold px-3 disabled:opacity-50"
// // // // // //                                 title="Publikasikan"
// // // // // //                                 aria-label="Publikasikan"
// // // // // //                             >
// // // // // //                                 {publishingId === blog._id ? '...' : <><Send size={14}/> Publish</>}
// // // // // //                             </button>
// // // // // //                         )}

// // // // // //                         <button onClick={() => openEditModal(blog)} className="p-2 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100" title="Edit" aria-label="Edit Blog"><Pencil size={18}/></button>
// // // // // //                         <button onClick={() => handleDelete(blog._id)} className="p-2 bg-gray-100 text-gray-500 rounded-lg hover:bg-gray-200 hover:text-red-600" title="Hapus" aria-label="Hapus Blog"><Trash2 size={18}/></button>
// // // // // //                     </div>
// // // // // //                 </div>
// // // // // //             ))}
// // // // // //          </div>
// // // // // //         }

// // // // // //         {/* MODAL EDIT DENGAN WYSIWYG */}
// // // // // //         {isEditModalOpen && (
// // // // // //             <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
// // // // // //                 <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
// // // // // //                     <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center sticky top-0 flex-shrink-0">
// // // // // //                         <h2 className="text-lg font-bold">Edit Blog</h2>
// // // // // //                         <button onClick={() => setIsEditModalOpen(false)} aria-label="Tutup"><X className="text-gray-400 hover:text-red-600"/></button>
// // // // // //                     </div>
                    
// // // // // //                     <div className="p-6 overflow-y-auto custom-scrollbar">
// // // // // //                         <form onSubmit={handleSaveEdit} className="space-y-4">
// // // // // //                             <div>
// // // // // //                                 <label className="block text-xs font-bold text-gray-500 mb-1">Judul</label>
// // // // // //                                 <input className="w-full border rounded-lg px-3 py-2" value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} aria-label="Judul Blog"/>
// // // // // //                             </div>
                            
// // // // // //                             <div className="border border-dashed p-4 rounded-lg text-center">
// // // // // //                                 {editForm.coverUrl && <img src={getImageUrl(editForm.coverUrl)} className="h-32 mx-auto object-cover rounded mb-2" alt="Cover"/>}
// // // // // //                                 <label className="cursor-pointer bg-gray-100 px-4 py-2 rounded text-xs font-bold flex items-center justify-center gap-2">
// // // // // //                                     <UploadCloud size={14}/> Ganti Cover
// // // // // //                                     <input type="file" className="hidden" onChange={handleUploadCover} accept="image/*" aria-label="Upload Cover"/>
// // // // // //                                 </label>
// // // // // //                             </div>

// // // // // //                             {/* TEXT EDITOR QUILL */}
// // // // // //                             <div>
// // // // // //                                 <label className="block text-xs font-bold text-gray-500 mb-1">Konten Cerita</label>
// // // // // //                                 <div className="h-64 mb-12">
// // // // // //                                     <ReactQuill 
// // // // // //                                         ref={quillRef}
// // // // // //                                         theme="snow"
// // // // // //                                         value={editForm.content}
// // // // // //                                         onChange={(val: string) => setEditForm({...editForm, content: val})}
// // // // // //                                         modules={modules}
// // // // // //                                         className="h-full"
// // // // // //                                         placeholder="Tulis cerita di sini..."
// // // // // //                                     />
// // // // // //                                 </div>
// // // // // //                             </div>
                            
// // // // // //                             <div>
// // // // // //                                 <label className="block text-xs font-bold text-gray-500 mb-1">Tags</label>
// // // // // //                                 <input className="w-full border rounded-lg px-3 py-2" value={editForm.tags} onChange={e => setEditForm({...editForm, tags: e.target.value})} aria-label="Tags Blog"/>
// // // // // //                             </div>

// // // // // //                             <div className="pt-4 border-t flex justify-end gap-2">
// // // // // //                                 <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-gray-600" aria-label="Batal">Batal</button>
// // // // // //                                 <button type="submit" className="px-6 py-2 bg-amber-500 text-white rounded-lg font-bold hover:bg-amber-600 flex items-center gap-2" aria-label="Simpan"><Save size={16}/> Simpan</button>
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

// // // // // import { useState, useEffect, useMemo, useRef } from 'react';
// // // // // import dynamic from 'next/dynamic'; 
// // // // // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // // // // import Protected from '@/components/Protected';
// // // // // import { Check, X, Trash2, DownloadCloud, FileText, Pencil, UploadCloud, Save, Send, CheckCircle, Clock } from 'lucide-react';

// // // // // // FIX TYPESCRIPT ERROR: Tambahkan 'as any' di sini
// // // // // const ReactQuill = dynamic(() => import('react-quill'), { ssr: false }) as any;
// // // // // import 'react-quill/dist/quill.snow.css';

// // // // // export default function AdminBlogPage() {
// // // // //   const [blogs, setBlogs] = useState<any[]>([]);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [importing, setImporting] = useState(false);
// // // // //   const [publishingId, setPublishingId] = useState<string | null>(null);

// // // // //   // EDIT STATE
// // // // //   const [editingBlog, setEditingBlog] = useState<any>(null);
// // // // //   const [editForm, setEditForm] = useState({ title: '', content: '', coverUrl: '', tags: '' });
// // // // //   const [isEditModalOpen, setIsEditModalOpen] = useState(false);

// // // // //   // REF UNTUK QUILL
// // // // //   const quillRef = useRef<any>(null);

// // // // //   useEffect(() => { loadData(); }, []);

// // // // //   // --- CONFIGURASI EDITOR ---
// // // // //   const imageHandler = () => {
// // // // //     const input = document.createElement('input');
// // // // //     input.setAttribute('type', 'file');
// // // // //     input.setAttribute('accept', 'image/*');
// // // // //     input.click();

// // // // //     input.onchange = async () => {
// // // // //       const file = input.files ? input.files[0] : null;
// // // // //       if (!file) return;

// // // // //       try {
// // // // //         const fd = new FormData();
// // // // //         fd.append('file', file);
// // // // //         const res = await apiUpload('/api/upload', fd);
// // // // //         const url = getImageUrl(res.url || res.file?.url);

// // // // //         // Akses editor via Ref
// // // // //         const quill = quillRef.current.getEditor();
// // // // //         const range = quill.getSelection();
// // // // //         quill.insertEmbed(range.index, 'image', url);
// // // // //       } catch (err) {
// // // // //         alert('Gagal upload gambar ke editor');
// // // // //         console.error(err);
// // // // //       }
// // // // //     };
// // // // //   };

// // // // //   const modules = useMemo(() => ({
// // // // //     toolbar: {
// // // // //       container: [
// // // // //         [{ 'header': [1, 2, 3, false] }],
// // // // //         ['bold', 'italic', 'underline', 'strike', 'blockquote'],
// // // // //         [{ 'list': 'ordered'}, { 'list': 'bullet' }],
// // // // //         ['link', 'image'], 
// // // // //         ['clean']
// // // // //       ],
// // // // //       handlers: {
// // // // //         image: imageHandler 
// // // // //       }
// // // // //     }
// // // // //   }), []);

// // // // //   const loadData = async () => {
// // // // //     try {
// // // // //         setLoading(true);
// // // // //         const res = await api(`/api/blog/admin?t=${new Date().getTime()}`);
// // // // //         setBlogs(res || []);
// // // // //     } catch (e) { console.error(e); } finally { setLoading(false); }
// // // // //   };

// // // // //   const handleStatus = async (id: string, status: string) => {
// // // // //       if(!confirm(`Ubah status menjadi ${status}?`)) return;
// // // // //       try {
// // // // //           await api(`/api/blog/${id}/status`, { method: 'PATCH', body: { status } });
// // // // //           loadData();
// // // // //       } catch (e: any) { alert(e.message); }
// // // // //   };

// // // // //   // --- FITUR BARU: PUBLIKASI & BLASTING NOTIF ---
// // // // //   const handlePublish = async (blog: any) => {
// // // // //       // Cek apakah ini blog Official (Admin) atau User
// // // // //       const isOfficial = blog.author?.role === 'SUPER_ADMIN' || blog.author?.role === 'FACILITATOR';
// // // // //       const confirmMsg = isOfficial 
// // // // //         ? `Publikasikan "${blog.title}"? \n\nIni akan mengirim notifikasi ke SELURUH USER.`
// // // // //         : `Setujui cerita "${blog.title}"? \n\nPenulis akan menerima notifikasi.`;

// // // // //       if(!confirm(confirmMsg)) return;

// // // // //       try {
// // // // //           setPublishingId(blog._id);
// // // // //           // Panggil endpoint update status (Backend akan handle notifikasi)
// // // // //           await api(`/api/blog/${blog._id}/status`, { 
// // // // //               method: 'PATCH', 
// // // // //               body: { status: 'approved' } // atau 'published' sesuai schema
// // // // //           });
          
// // // // //           alert("Berhasil dipublikasikan!");
// // // // //           loadData();
// // // // //       } catch (e: any) {
// // // // //           alert("Gagal publish: " + e.message);
// // // // //       } finally {
// // // // //           setPublishingId(null);
// // // // //       }
// // // // //   };

// // // // //   const handleDelete = async (id: string) => {
// // // // //       if(!confirm("Hapus blog ini permanen?")) return;
// // // // //       try {
// // // // //           await api(`/api/blog/${id}`, { method: 'DELETE' });
// // // // //           loadData();
// // // // //       } catch (e: any) { alert(e.message); }
// // // // //   };

// // // // //   const handleImportPMI = async () => {
// // // // //       if(!confirm("Import 3 Kisah Relawan Nyata?")) return;
// // // // //       setImporting(true);
// // // // //       try {
// // // // //           await api('/api/blog/seed-pmi', { method: 'POST' });
// // // // //           alert("Berhasil import data!");
// // // // //           loadData();
// // // // //       } catch (e: any) { alert("Gagal import: " + e.message); } 
// // // // //       finally { setImporting(false); }
// // // // //   };

// // // // //   const openEditModal = (blog: any) => {
// // // // //       setEditingBlog(blog);
// // // // //       setEditForm({
// // // // //           title: blog.title,
// // // // //           content: blog.content,
// // // // //           coverUrl: blog.coverUrl || '',
// // // // //           tags: blog.tags ? blog.tags.join(', ') : ''
// // // // //       });
// // // // //       setIsEditModalOpen(true);
// // // // //   };

// // // // //   const handleUploadCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // //       if (!e.target.files?.[0]) return;
// // // // //       try {
// // // // //           const fd = new FormData(); fd.append('file', e.target.files[0]);
// // // // //           const res = await apiUpload('/api/upload', fd);
// // // // //           setEditForm(p => ({ ...p, coverUrl: res.url || res.file?.url }));
// // // // //       } catch (e) { alert("Upload gagal"); }
// // // // //   };

// // // // //   const handleSaveEdit = async (e: React.FormEvent) => {
// // // // //       e.preventDefault();
// // // // //       try {
// // // // //           const payload = {
// // // // //               ...editForm,
// // // // //               tags: editForm.tags.split(',').map(t => t.trim())
// // // // //           };
// // // // //           await api(`/api/blog/${editingBlog._id}`, { method: 'PATCH', body: payload });
// // // // //           alert("Blog berhasil diperbarui!");
// // // // //           setIsEditModalOpen(false);
// // // // //           loadData();
// // // // //       } catch (e: any) { alert("Gagal update: " + e.message); }
// // // // //   };

// // // // //   return (
// // // // //     <Protected roles={['SUPER_ADMIN', 'FACILITATOR']}>
// // // // //       <div className="max-w-7xl mx-auto p-6 font-sans">
// // // // //         <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
// // // // //             <div>
// // // // //                 <h1 className="text-2xl font-bold text-gray-800">Manajemen Blog & Cerita</h1>
// // // // //                 <p className="text-gray-500 text-sm">Moderasi cerita yang dikirim oleh peserta.</p>
// // // // //             </div>
// // // // //             <button 
// // // // //                 onClick={handleImportPMI} 
// // // // //                 disabled={importing}
// // // // //                 className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl font-bold hover:bg-blue-100 transition flex items-center gap-2 border border-blue-200"
// // // // //                 aria-label="Import Data PMI"
// // // // //             >
// // // // //                 <DownloadCloud size={18}/> {importing ? 'Mengambil Data...' : 'Import Data PMI'}
// // // // //             </button>
// // // // //         </div>

// // // // //         {loading ? <div className="text-center py-10">Memuat data...</div> : 
// // // // //          blogs.length === 0 ? <div className="text-center py-20 border-2 border-dashed rounded-xl bg-gray-50">Data Kosong. Klik Import untuk data dummy.</div> :
// // // // //          <div className="grid gap-4">
// // // // //             {blogs.map((blog) => (
// // // // //                 <div key={blog._id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 items-center hover:shadow-md transition-shadow">
// // // // //                     <div className="w-full md:w-32 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative group">
// // // // //                         {blog.coverUrl ? (
// // // // //                             <img src={getImageUrl(blog.coverUrl)} className="w-full h-full object-cover" alt={blog.title}/>
// // // // //                         ) : (
// // // // //                             <div className="flex items-center justify-center h-full text-gray-400"><FileText/></div>
// // // // //                         )}
// // // // //                     </div>
// // // // //                     <div className="flex-1">
// // // // //                         <div className="flex items-center gap-2 mb-1">
// // // // //                             <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase flex items-center gap-1 ${blog.status === 'approved' ? 'bg-green-100 text-green-700' : blog.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
// // // // //                                 {blog.status === 'approved' && <CheckCircle size={10}/>}
// // // // //                                 {blog.status === 'pending' && <Clock size={10}/>}
// // // // //                                 {blog.status}
// // // // //                             </span>
// // // // //                             <span className="text-xs text-gray-400">• {new Date(blog.createdAt).toLocaleDateString()}</span>
// // // // //                             {(blog.author?.role === 'SUPER_ADMIN' || blog.author?.role === 'FACILITATOR') && (
// // // // //                                 <span className="text-[10px] bg-blue-100 text-blue-700 px-2 rounded-full font-bold border border-blue-200">OFFICIAL</span>
// // // // //                             )}
// // // // //                         </div>
// // // // //                         <h3 className="font-bold text-gray-800 text-lg mb-1">{blog.title}</h3>
// // // // //                         <div className="text-sm text-gray-500 line-clamp-1" dangerouslySetInnerHTML={{ __html: blog.content }}></div>
// // // // //                         <p className="text-xs text-gray-400 mt-2">Penulis: <span className="font-bold text-gray-600">{blog.author?.name || 'Anonim'}</span></p>
// // // // //                     </div>
                    
// // // // //                     <div className="flex gap-2">
// // // // //                         {/* TOMBOL PUBLISH (Hanya muncul jika belum approved) */}
// // // // //                         {blog.status !== 'approved' && (
// // // // //                             <button 
// // // // //                                 onClick={() => handlePublish(blog)}
// // // // //                                 disabled={publishingId === blog._id}
// // // // //                                 className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-xs font-bold px-3 disabled:opacity-50"
// // // // //                                 title="Publikasikan"
// // // // //                                 aria-label="Publikasikan"
// // // // //                             >
// // // // //                                 {publishingId === blog._id ? '...' : <><Send size={14}/> Publish</>}
// // // // //                             </button>
// // // // //                         )}

// // // // //                         <button onClick={() => openEditModal(blog)} className="p-2 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100" title="Edit" aria-label="Edit Blog"><Pencil size={18}/></button>
// // // // //                         <button onClick={() => handleDelete(blog._id)} className="p-2 bg-gray-100 text-gray-500 rounded-lg hover:bg-gray-200 hover:text-red-600" title="Hapus" aria-label="Hapus Blog"><Trash2 size={18}/></button>
// // // // //                     </div>
// // // // //                 </div>
// // // // //             ))}
// // // // //          </div>
// // // // //         }

// // // // //         {/* MODAL EDIT DENGAN WYSIWYG */}
// // // // //         {isEditModalOpen && (
// // // // //             <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
// // // // //                 <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
// // // // //                     <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center sticky top-0 flex-shrink-0">
// // // // //                         <h2 className="text-lg font-bold">Edit Blog</h2>
// // // // //                         <button onClick={() => setIsEditModalOpen(false)} aria-label="Tutup"><X className="text-gray-400 hover:text-red-600"/></button>
// // // // //                     </div>
                    
// // // // //                     <div className="p-6 overflow-y-auto custom-scrollbar">
// // // // //                         <form onSubmit={handleSaveEdit} className="space-y-4">
// // // // //                             <div>
// // // // //                                 <label className="block text-xs font-bold text-gray-500 mb-1">Judul</label>
// // // // //                                 <input className="w-full border rounded-lg px-3 py-2" value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} aria-label="Judul Blog"/>
// // // // //                             </div>
                            
// // // // //                             <div className="border border-dashed p-4 rounded-lg text-center">
// // // // //                                 {editForm.coverUrl && <img src={getImageUrl(editForm.coverUrl)} className="h-32 mx-auto object-cover rounded mb-2" alt="Cover"/>}
// // // // //                                 <label className="cursor-pointer bg-gray-100 px-4 py-2 rounded text-xs font-bold flex items-center justify-center gap-2">
// // // // //                                     <UploadCloud size={14}/> Ganti Cover
// // // // //                                     <input type="file" className="hidden" onChange={handleUploadCover} accept="image/*" aria-label="Upload Cover"/>
// // // // //                                 </label>
// // // // //                             </div>

// // // // //                             {/* TEXT EDITOR QUILL */}
// // // // //                             <div>
// // // // //                                 <label className="block text-xs font-bold text-gray-500 mb-1">Konten Cerita</label>
// // // // //                                 <div className="h-64 mb-12">
// // // // //                                     <ReactQuill 
// // // // //                                         ref={quillRef}
// // // // //                                         theme="snow"
// // // // //                                         value={editForm.content}
// // // // //                                         onChange={(val: string) => setEditForm({...editForm, content: val})}
// // // // //                                         modules={modules}
// // // // //                                         className="h-full"
// // // // //                                         placeholder="Tulis cerita di sini..."
// // // // //                                     />
// // // // //                                 </div>
// // // // //                             </div>
                            
// // // // //                             <div>
// // // // //                                 <label className="block text-xs font-bold text-gray-500 mb-1">Tags</label>
// // // // //                                 <input className="w-full border rounded-lg px-3 py-2" value={editForm.tags} onChange={e => setEditForm({...editForm, tags: e.target.value})} aria-label="Tags Blog"/>
// // // // //                             </div>

// // // // //                             <div className="pt-4 border-t flex justify-end gap-2">
// // // // //                                 <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-gray-600" aria-label="Batal">Batal</button>
// // // // //                                 <button type="submit" className="px-6 py-2 bg-amber-500 text-white rounded-lg font-bold hover:bg-amber-600 flex items-center gap-2" aria-label="Simpan"><Save size={16}/> Simpan</button>
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

// // // // import { useState, useEffect, useMemo, useRef } from 'react';
// // // // import dynamic from 'next/dynamic'; 
// // // // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // // // import Protected from '@/components/Protected';
// // // // import { Check, X, Trash2, DownloadCloud, FileText, Pencil, UploadCloud, Save, Send, CheckCircle, Clock, BellRing } from 'lucide-react';

// // // // // FIX TYPESCRIPT ERROR: Tambahkan 'as any'
// // // // const ReactQuill = dynamic(() => import('react-quill'), { ssr: false }) as any;
// // // // import 'react-quill/dist/quill.snow.css';

// // // // export default function AdminBlogPage() {
// // // //   const [blogs, setBlogs] = useState<any[]>([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [importing, setImporting] = useState(false);
// // // //   const [publishingId, setPublishingId] = useState<string | null>(null);

// // // //   // EDIT STATE
// // // //   const [editingBlog, setEditingBlog] = useState<any>(null);
// // // //   const [editForm, setEditForm] = useState({ title: '', content: '', coverUrl: '', tags: '' });
// // // //   const [isEditModalOpen, setIsEditModalOpen] = useState(false);

// // // //   // REF UNTUK QUILL
// // // //   const quillRef = useRef<any>(null);

// // // //   useEffect(() => { loadData(); }, []);

// // // //   // --- CONFIG EDITOR ---
// // // //   const imageHandler = () => {
// // // //     const input = document.createElement('input');
// // // //     input.setAttribute('type', 'file');
// // // //     input.setAttribute('accept', 'image/*');
// // // //     input.click();

// // // //     input.onchange = async () => {
// // // //       const file = input.files ? input.files[0] : null;
// // // //       if (!file) return;
// // // //       try {
// // // //         const fd = new FormData();
// // // //         fd.append('file', file);
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
// // // //         [{ 'header': [1, 2, 3, false] }],
// // // //         ['bold', 'italic', 'underline', 'strike', 'blockquote'],
// // // //         [{ 'list': 'ordered'}, { 'list': 'bullet' }],
// // // //         ['link', 'image'], ['clean']
// // // //       ],
// // // //       handlers: { image: imageHandler }
// // // //     }
// // // //   }), []);

// // // //   const loadData = async () => {
// // // //     try {
// // // //         setLoading(true);
// // // //         const res = await api(`/api/blog/admin?t=${new Date().getTime()}`);
// // // //         setBlogs(res || []);
// // // //     } catch (e) { console.error(e); } finally { setLoading(false); }
// // // //   };

// // // //   // --- FITUR UTAMA: PUBLIKASI ULANG / BLASTING ---
// // // //   const handlePublish = async (blog: any) => {
// // // //       const isPending = blog.status === 'pending';
// // // //       const isOfficial = blog.author?.role === 'SUPER_ADMIN' || blog.author?.role === 'FACILITATOR';
      
// // // //       // Pesan Konfirmasi Beda-beda tergantung kondisi
// // // //       let confirmMsg = "";
// // // //       if (isPending) {
// // // //           confirmMsg = `Setujui & Publikasikan "${blog.title}"? \n\n(Notifikasi akan dikirim).`;
// // // //       } else {
// // // //           // KONDISI PUBLIKASI ULANG
// // // //           confirmMsg = isOfficial 
// // // //             ? `Kirim ULANG Notifikasi (Blast) untuk "${blog.title}" ke SEMUA USER?`
// // // //             : `Kirim ULANG Notifikasi ke PENULIS bahwa blog ini sudah terbit?`;
// // // //       }

// // // //       if(!confirm(confirmMsg)) return;

// // // //       try {
// // // //           setPublishingId(blog._id);
          
// // // //           // Panggil endpoint update status.
// // // //           // Walaupun status sudah 'approved', backend tetap akan mengirim notifikasi lagi.
// // // //           await api(`/api/blog/${blog._id}/status`, { 
// // // //               method: 'PATCH', 
// // // //               body: { status: 'approved' } 
// // // //           });
          
// // // //           alert(isPending ? "Blog Berhasil Dipublikasikan!" : "Notifikasi Berhasil Dikirim Ulang!");
// // // //           loadData();
// // // //       } catch (e: any) {
// // // //           alert("Gagal: " + e.message);
// // // //       } finally {
// // // //           setPublishingId(null);
// // // //       }
// // // //   };

// // // //   const handleReject = async (id: string) => {
// // // //       if(!confirm("Tolak blog ini?")) return;
// // // //       try {
// // // //           await api(`/api/blog/${id}/status`, { method: 'PATCH', body: { status: 'rejected' } });
// // // //           loadData();
// // // //       } catch (e: any) { alert(e.message); }
// // // //   };

// // // //   const handleDelete = async (id: string) => {
// // // //       if(!confirm("Hapus blog ini permanen?")) return;
// // // //       try {
// // // //           await api(`/api/blog/${id}`, { method: 'DELETE' });
// // // //           loadData();
// // // //       } catch (e: any) { alert(e.message); }
// // // //   };

// // // //   const handleImportPMI = async () => {
// // // //       if(!confirm("Import data dummy?")) return;
// // // //       setImporting(true);
// // // //       try { await api('/api/blog/seed-pmi', { method: 'POST' }); loadData(); } 
// // // //       catch (e: any) { alert(e.message); } finally { setImporting(false); }
// // // //   };

// // // //   const openEditModal = (blog: any) => {
// // // //       setEditingBlog(blog);
// // // //       setEditForm({ title: blog.title, content: blog.content, coverUrl: blog.coverUrl || '', tags: blog.tags ? blog.tags.join(', ') : '' });
// // // //       setIsEditModalOpen(true);
// // // //   };
// // // //   const handleUploadCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // //       if (!e.target.files?.[0]) return;
// // // //       try {
// // // //           const fd = new FormData(); fd.append('file', e.target.files[0]);
// // // //           const res = await apiUpload('/api/upload', fd);
// // // //           setEditForm(p => ({ ...p, coverUrl: res.url || res.file?.url }));
// // // //       } catch (e) { alert("Upload gagal"); }
// // // //   };
// // // //   const handleSaveEdit = async (e: React.FormEvent) => {
// // // //       e.preventDefault();
// // // //       try {
// // // //           const payload = { ...editForm, tags: editForm.tags.split(',').map(t => t.trim()) };
// // // //           await api(`/api/blog/${editingBlog._id}`, { method: 'PATCH', body: payload });
// // // //           alert("Tersimpan!"); setIsEditModalOpen(false); loadData();
// // // //       } catch (e: any) { alert("Gagal: " + e.message); }
// // // //   };

// // // //   return (
// // // //     <Protected roles={['SUPER_ADMIN', 'FACILITATOR']}>
// // // //       <div className="max-w-7xl mx-auto p-6 font-sans">
// // // //         <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
// // // //             <div>
// // // //                 <h1 className="text-2xl font-bold text-gray-800">Manajemen Blog & Cerita</h1>
// // // //                 <p className="text-gray-500 text-sm">Moderasi cerita relawan & berita resmi.</p>
// // // //             </div>
// // // //             <button onClick={handleImportPMI} disabled={importing} className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl font-bold hover:bg-blue-100 transition flex items-center gap-2 border border-blue-200">
// // // //                 <DownloadCloud size={18}/> {importing ? '...' : 'Import Data PMI'}
// // // //             </button>
// // // //         </div>

// // // //         {loading ? <div className="text-center py-10">Memuat data...</div> : 
// // // //          <div className="grid gap-4">
// // // //             {blogs.map((blog) => (
// // // //                 <div key={blog._id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 items-center hover:shadow-md transition-shadow">
                    
// // // //                     {/* THUMBNAIL */}
// // // //                     <div className="w-full md:w-32 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative">
// // // //                         {blog.coverUrl ? ( <img src={getImageUrl(blog.coverUrl)} className="w-full h-full object-cover" alt="cover"/> ) : ( <div className="flex items-center justify-center h-full text-gray-400"><FileText/></div> )}
// // // //                     </div>

// // // //                     {/* INFO */}
// // // //                     <div className="flex-1">
// // // //                         <div className="flex items-center gap-2 mb-1">
// // // //                             <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase flex items-center gap-1 ${blog.status === 'approved' ? 'bg-green-100 text-green-700' : blog.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
// // // //                                 {blog.status === 'approved' ? <CheckCircle size={10}/> : <Clock size={10}/>} {blog.status}
// // // //                             </span>
// // // //                             <span className="text-xs text-gray-400">• {new Date(blog.createdAt).toLocaleDateString()}</span>
// // // //                             {(blog.author?.role === 'SUPER_ADMIN' || blog.author?.role === 'FACILITATOR') && (
// // // //                                 <span className="text-[10px] bg-blue-100 text-blue-700 px-2 rounded-full font-bold border border-blue-200">OFFICIAL</span>
// // // //                             )}
// // // //                         </div>
// // // //                         <h3 className="font-bold text-gray-800 text-lg mb-1">{blog.title}</h3>
// // // //                         <div className="text-sm text-gray-500 line-clamp-1" dangerouslySetInnerHTML={{ __html: blog.content }}></div>
// // // //                         <p className="text-xs text-gray-400 mt-2">Penulis: <span className="font-bold text-gray-600">{blog.author?.name || 'Anonim'}</span></p>
// // // //                     </div>
                    
// // // //                     {/* --- TOMBOL AKSI UTAMA --- */}
// // // //                     <div className="flex gap-2">
                        
// // // //                         {/* 1. TOMBOL PUBLIKASI / RE-PUBLISH (Selalu Muncul kecuali Rejected) */}
// // // //                         {blog.status !== 'rejected' && (
// // // //                             <button 
// // // //                                 onClick={() => handlePublish(blog)}
// // // //                                 disabled={publishingId === blog._id}
// // // //                                 className={`p-2 rounded-lg flex items-center gap-2 text-xs font-bold px-3 transition disabled:opacity-50
// // // //                                     ${blog.status === 'pending' 
// // // //                                         ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200' 
// // // //                                         : 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200' 
// // // //                                     }`}
// // // //                                 title={blog.status === 'pending' ? "Setujui & Publikasi" : "Kirim Ulang Notifikasi (Blast)"}
// // // //                             >
// // // //                                 {publishingId === blog._id ? '...' : (
// // // //                                     <>
// // // //                                         {/* Ikon Berbeda: Check jika Pending, Lonceng jika Approved */}
// // // //                                         {blog.status === 'pending' ? <Check size={14}/> : <BellRing size={14}/>}
// // // //                                         {blog.status === 'pending' ? 'Publikasi' : 'Blast Ulang'}
// // // //                                     </>
// // // //                                 )}
// // // //                             </button>
// // // //                         )}

// // // //                         {/* 2. TOMBOL TOLAK (Hanya jika Pending) */}
// // // //                         {blog.status === 'pending' && (
// // // //                             <button onClick={() => handleReject(blog._id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100" title="Tolak">
// // // //                                 <X size={18}/>
// // // //                             </button>
// // // //                         )}

// // // //                         <button onClick={() => openEditModal(blog)} className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-amber-100 hover:text-amber-600"><Pencil size={18}/></button>
// // // //                         <button onClick={() => handleDelete(blog._id)} className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-red-100 hover:text-red-600"><Trash2 size={18}/></button>
// // // //                     </div>
// // // //                 </div>
// // // //             ))}
// // // //          </div>
// // // //         }

// // // //         {/* MODAL EDIT SAMA SEPERTI SEBELUMNYA... */}
// // // //         {isEditModalOpen && (
// // // //             <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
// // // //                 <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
// // // //                     <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center sticky top-0 flex-shrink-0">
// // // //                         <h2 className="text-lg font-bold">Edit Blog</h2>
// // // //                         <button onClick={() => setIsEditModalOpen(false)} aria-label="Tutup"><X className="text-gray-400 hover:text-red-600"/></button>
// // // //                     </div>
// // // //                     <div className="p-6 overflow-y-auto custom-scrollbar">
// // // //                         <form onSubmit={handleSaveEdit} className="space-y-4">
// // // //                             <div><label className="block text-xs font-bold text-gray-500 mb-1">Judul</label><input className="w-full border rounded-lg px-3 py-2" value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})}/></div>
// // // //                             <div className="h-64 mb-12"><ReactQuill ref={quillRef} theme="snow" value={editForm.content} onChange={(val: string) => setEditForm({...editForm, content: val})} modules={modules} className="h-full"/></div>
// // // //                             <div><label className="block text-xs font-bold text-gray-500 mb-1">Tags</label><input className="w-full border rounded-lg px-3 py-2" value={editForm.tags} onChange={e => setEditForm({...editForm, tags: e.target.value})}/></div>
// // // //                             <div className="pt-4 border-t flex justify-end gap-2"><button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-gray-600">Batal</button><button type="submit" className="px-6 py-2 bg-amber-500 text-white rounded-lg font-bold">Simpan</button></div>
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

// // // import { useState, useEffect, useMemo, useRef } from 'react';
// // // import dynamic from 'next/dynamic'; 
// // // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // // import Protected from '@/components/Protected';
// // // import { Check, X, Trash2, DownloadCloud, FileText, Pencil, UploadCloud, Save, Send, CheckCircle, Clock, BellRing } from 'lucide-react';

// // // // FIX TYPESCRIPT ERROR
// // // const ReactQuill = dynamic(() => import('react-quill'), { ssr: false }) as any;
// // // import 'react-quill/dist/quill.snow.css';

// // // export default function AdminBlogPage() {
// // //   const [blogs, setBlogs] = useState<any[]>([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [importing, setImporting] = useState(false);
// // //   const [publishingId, setPublishingId] = useState<string | null>(null);

// // //   // EDIT STATE
// // //   const [editingBlog, setEditingBlog] = useState<any>(null);
// // //   const [editForm, setEditForm] = useState({ title: '', content: '', coverUrl: '', tags: '' });
// // //   const [isEditModalOpen, setIsEditModalOpen] = useState(false);

// // //   const quillRef = useRef<any>(null);

// // //   useEffect(() => { loadData(); }, []);

// // //   // --- CONFIG EDITOR ---
// // //   const imageHandler = () => {
// // //     const input = document.createElement('input');
// // //     input.setAttribute('type', 'file');
// // //     input.setAttribute('accept', 'image/*');
// // //     input.click();

// // //     input.onchange = async () => {
// // //       const file = input.files ? input.files[0] : null;
// // //       if (!file) return;
// // //       try {
// // //         const fd = new FormData();
// // //         fd.append('file', file);
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
// // //         [{ 'header': [1, 2, 3, false] }],
// // //         ['bold', 'italic', 'underline', 'strike', 'blockquote'],
// // //         [{ 'list': 'ordered'}, { 'list': 'bullet' }],
// // //         ['link', 'image'], ['clean']
// // //       ],
// // //       handlers: { image: imageHandler }
// // //     }
// // //   }), []);

// // //   const loadData = async () => {
// // //     try {
// // //         setLoading(true);
// // //         const res = await api(`/api/blog/admin?t=${new Date().getTime()}`);
// // //         setBlogs(res || []);
// // //     } catch (e) { console.error(e); } finally { setLoading(false); }
// // //   };

// // //   // --- LOGIKA UTAMA ---
// // //   const handlePublish = async (blog: any) => {
// // //       const isPending = blog.status === 'pending';
// // //       const isOfficial = blog.author?.role === 'SUPER_ADMIN' || blog.author?.role === 'FACILITATOR';
      
// // //       const confirmMsg = isPending
// // //         ? `Setujui & Publikasikan "${blog.title}"? \n\n(Notifikasi akan dikirim).`
// // //         : `Kirim ULANG Notifikasi (Blast) untuk "${blog.title}"?`;

// // //       if(!confirm(confirmMsg)) return;

// // //       try {
// // //           setPublishingId(blog._id);
// // //           await api(`/api/blog/${blog._id}/status`, { 
// // //               method: 'PATCH', 
// // //               body: { status: 'approved' } 
// // //           });
// // //           alert(isPending ? "Blog Berhasil Dipublikasikan!" : "Notifikasi Berhasil Dikirim Ulang!");
// // //           loadData();
// // //       } catch (e: any) { alert("Gagal: " + e.message); } 
// // //       finally { setPublishingId(null); }
// // //   };

// // //   const handleReject = async (id: string) => {
// // //       if(!confirm("Tolak blog ini?")) return;
// // //       try {
// // //           await api(`/api/blog/${id}/status`, { method: 'PATCH', body: { status: 'rejected' } });
// // //           loadData();
// // //       } catch (e: any) { alert(e.message); }
// // //   };

// // //   const handleDelete = async (id: string) => {
// // //       if(!confirm("Hapus blog ini permanen?")) return;
// // //       try {
// // //           await api(`/api/blog/${id}`, { method: 'DELETE' });
// // //           loadData();
// // //       } catch (e: any) { alert(e.message); }
// // //   };

// // //   const handleImportPMI = async () => {
// // //       if(!confirm("Import data dummy?")) return;
// // //       setImporting(true);
// // //       try { await api('/api/blog/seed-pmi', { method: 'POST' }); loadData(); } 
// // //       catch (e: any) { alert(e.message); } finally { setImporting(false); }
// // //   };

// // //   const openEditModal = (blog: any) => {
// // //       setEditingBlog(blog);
// // //       setEditForm({ title: blog.title, content: blog.content, coverUrl: blog.coverUrl || '', tags: blog.tags ? blog.tags.join(', ') : '' });
// // //       setIsEditModalOpen(true);
// // //   };

// // //   const handleUploadCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // //       if (!e.target.files?.[0]) return;
// // //       try {
// // //           const fd = new FormData(); fd.append('file', e.target.files[0]);
// // //           const res = await apiUpload('/api/upload', fd);
// // //           setEditForm(p => ({ ...p, coverUrl: res.url || res.file?.url }));
// // //       } catch (e) { alert("Upload gagal"); }
// // //   };

// // //   const handleSaveEdit = async (e: React.FormEvent) => {
// // //       e.preventDefault();
// // //       try {
// // //           const payload = { ...editForm, tags: editForm.tags.split(',').map(t => t.trim()) };
// // //           await api(`/api/blog/${editingBlog._id}`, { method: 'PATCH', body: payload });
// // //           alert("Tersimpan!"); setIsEditModalOpen(false); loadData();
// // //       } catch (e: any) { alert("Gagal: " + e.message); }
// // //   };

// // //   return (
// // //     <Protected roles={['SUPER_ADMIN', 'FACILITATOR']}>
// // //       <div className="max-w-7xl mx-auto p-6 font-sans">
        
// // //         {/* HEADER */}
// // //         <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
// // //             <div>
// // //                 <h1 className="text-2xl font-bold text-gray-800">Manajemen Blog & Cerita</h1>
// // //                 <p className="text-gray-500 text-sm">Moderasi cerita relawan & berita resmi.</p>
// // //             </div>
// // //             <button 
// // //                 onClick={handleImportPMI} 
// // //                 disabled={importing}
// // //                 className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl font-bold hover:bg-blue-100 transition flex items-center gap-2 border border-blue-200"
// // //                 aria-label="Import Data PMI" // A11Y FIX
// // //             >
// // //                 <DownloadCloud size={18}/> {importing ? '...' : 'Import Data PMI'}
// // //             </button>
// // //         </div>

// // //         {/* LIST BLOG */}
// // //         {loading ? <div className="text-center py-10">Memuat data...</div> : 
// // //          <div className="grid gap-4">
// // //             {blogs.map((blog) => (
// // //                 <div key={blog._id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 items-center hover:shadow-md transition-shadow">
                    
// // //                     <div className="w-full md:w-32 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative">
// // //                         {blog.coverUrl ? ( <img src={getImageUrl(blog.coverUrl)} className="w-full h-full object-cover" alt="cover"/> ) : ( <div className="flex items-center justify-center h-full text-gray-400"><FileText/></div> )}
// // //                     </div>

// // //                     <div className="flex-1">
// // //                         <div className="flex items-center gap-2 mb-1">
// // //                             <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase flex items-center gap-1 ${blog.status === 'approved' ? 'bg-green-100 text-green-700' : blog.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
// // //                                 {blog.status === 'approved' ? <CheckCircle size={10}/> : <Clock size={10}/>} {blog.status}
// // //                             </span>
// // //                             <span className="text-xs text-gray-400">• {new Date(blog.createdAt).toLocaleDateString()}</span>
// // //                             {(blog.author?.role === 'SUPER_ADMIN' || blog.author?.role === 'FACILITATOR') && (
// // //                                 <span className="text-[10px] bg-blue-100 text-blue-700 px-2 rounded-full font-bold border border-blue-200">OFFICIAL</span>
// // //                             )}
// // //                         </div>
// // //                         <h3 className="font-bold text-gray-800 text-lg mb-1">{blog.title}</h3>
// // //                         <div className="text-sm text-gray-500 line-clamp-1" dangerouslySetInnerHTML={{ __html: blog.content }}></div>
// // //                         <p className="text-xs text-gray-400 mt-2">Penulis: <span className="font-bold text-gray-600">{blog.author?.name || 'Anonim'}</span></p>
// // //                     </div>
                    
// // //                     <div className="flex gap-2">
// // //                         {/* TOMBOL PUBLISH / REBLAST */}
// // //                         {blog.status !== 'rejected' && (
// // //                             <button 
// // //                                 onClick={() => handlePublish(blog)}
// // //                                 disabled={publishingId === blog._id}
// // //                                 className={`p-2 rounded-lg flex items-center gap-2 text-xs font-bold px-3 transition disabled:opacity-50
// // //                                     ${blog.status === 'pending' 
// // //                                         ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200' 
// // //                                         : 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200' 
// // //                                     }`}
// // //                                 title={blog.status === 'pending' ? "Setujui & Publikasi" : "Kirim Ulang Notifikasi"}
// // //                                 aria-label={blog.status === 'pending' ? "Publikasi Blog" : "Kirim Ulang Notifikasi"} // A11Y FIX
// // //                             >
// // //                                 {publishingId === blog._id ? '...' : (
// // //                                     <>
// // //                                         {blog.status === 'pending' ? <Check size={14}/> : <BellRing size={14}/>}
// // //                                         {blog.status === 'pending' ? 'Publikasi' : 'Blast Ulang'}
// // //                                     </>
// // //                                 )}
// // //                             </button>
// // //                         )}

// // //                         {/* TOMBOL REJECT */}
// // //                         {blog.status === 'pending' && (
// // //                             <button 
// // //                                 onClick={() => handleReject(blog._id)} 
// // //                                 className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100" 
// // //                                 title="Tolak"
// // //                                 aria-label="Tolak Blog" // A11Y FIX
// // //                             >
// // //                                 <X size={18}/>
// // //                             </button>
// // //                         )}

// // //                         {/* TOMBOL EDIT */}
// // //                         <button 
// // //                             onClick={() => openEditModal(blog)} 
// // //                             className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-amber-100 hover:text-amber-600"
// // //                             title="Edit"
// // //                             aria-label="Edit Blog" // A11Y FIX
// // //                         >
// // //                             <Pencil size={18}/>
// // //                         </button>

// // //                         {/* TOMBOL HAPUS */}
// // //                         <button 
// // //                             onClick={() => handleDelete(blog._id)} 
// // //                             className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-red-100 hover:text-red-600"
// // //                             title="Hapus"
// // //                             aria-label="Hapus Blog" // A11Y FIX
// // //                         >
// // //                             <Trash2 size={18}/>
// // //                         </button>
// // //                     </div>
// // //                 </div>
// // //             ))}
// // //          </div>
// // //         }

// // //         {/* MODAL EDIT */}
// // //         {isEditModalOpen && (
// // //             <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
// // //                 <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
// // //                     <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center sticky top-0 flex-shrink-0">
// // //                         <h2 className="text-lg font-bold">Edit Blog</h2>
// // //                         <button 
// // //                             onClick={() => setIsEditModalOpen(false)} 
// // //                             aria-label="Tutup Editor" // A11Y FIX
// // //                         >
// // //                             <X className="text-gray-400 hover:text-red-600"/>
// // //                         </button>
// // //                     </div>
// // //                     <div className="p-6 overflow-y-auto custom-scrollbar">
// // //                         <form onSubmit={handleSaveEdit} className="space-y-4">
// // //                             <div>
// // //                                 <label className="block text-xs font-bold text-gray-500 mb-1">Judul</label>
// // //                                 <input 
// // //                                     className="w-full border rounded-lg px-3 py-2" 
// // //                                     value={editForm.title} 
// // //                                     onChange={e => setEditForm({...editForm, title: e.target.value})}
// // //                                     aria-label="Judul Blog" // A11Y FIX
// // //                                 />
// // //                             </div>
                            
// // //                             <div className="h-64 mb-12">
// // //                                 <ReactQuill 
// // //                                     ref={quillRef}
// // //                                     theme="snow"
// // //                                     value={editForm.content}
// // //                                     onChange={(val: string) => setEditForm({...editForm, content: val})}
// // //                                     modules={modules}
// // //                                     className="h-full"
// // //                                     placeholder="Tulis cerita di sini..."
// // //                                 />
// // //                             </div>
                            
// // //                             <div className="border border-dashed p-4 rounded-lg text-center">
// // //                                 {editForm.coverUrl && <img src={getImageUrl(editForm.coverUrl)} className="h-32 mx-auto object-cover rounded mb-2" alt="Cover"/>}
// // //                                 <label className="cursor-pointer bg-gray-100 px-4 py-2 rounded text-xs font-bold flex items-center justify-center gap-2">
// // //                                     <UploadCloud size={14}/> Ganti Cover
// // //                                     <input 
// // //                                         type="file" 
// // //                                         className="hidden" 
// // //                                         onChange={handleUploadCover} 
// // //                                         accept="image/*"
// // //                                         aria-label="Upload Gambar Cover" // A11Y FIX
// // //                                     />
// // //                                 </label>
// // //                             </div>

// // //                             <div>
// // //                                 <label className="block text-xs font-bold text-gray-500 mb-1">Tags</label>
// // //                                 <input 
// // //                                     className="w-full border rounded-lg px-3 py-2" 
// // //                                     value={editForm.tags} 
// // //                                     onChange={e => setEditForm({...editForm, tags: e.target.value})}
// // //                                     aria-label="Tags Blog" // A11Y FIX
// // //                                 />
// // //                             </div>

// // //                             <div className="pt-4 border-t flex justify-end gap-2">
// // //                                 <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-gray-600" aria-label="Batal Edit">Batal</button>
// // //                                 <button type="submit" className="px-6 py-2 bg-amber-500 text-white rounded-lg font-bold hover:bg-amber-600 flex items-center gap-2" aria-label="Simpan Perubahan">
// // //                                     <Save size={16}/> Simpan
// // //                                 </button>
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





// // 'use client';

// // import { useEffect, useState } from 'react';
// // import Link from 'next/link';
// // import { api } from '@/lib/api';
// // import { 
// //     Plus, Search, Edit, Trash2, CheckCircle, XCircle, Clock, Eye 
// // } from 'lucide-react';
// // import Swal from 'sweetalert2';

// // export default function AdminBlogPage() {
// //     const [blogs, setBlogs] = useState<any[]>([]);
// //     const [loading, setLoading] = useState(true);
// //     const [search, setSearch] = useState('');
// //     const [filterStatus, setFilterStatus] = useState('all');

// //     const loadBlogs = async () => {
// //         try {
// //             setLoading(true);
// //             const query = search ? `?search=${search}` : '';
// //             const res = await api(`/api/blog/admin${query}`);
// //             setBlogs(res);
// //         } catch (error) {
// //             console.error("Gagal memuat blog:", error);
// //             Swal.fire('Error', 'Gagal memuat data blog', 'error');
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     useEffect(() => {
// //         const timer = setTimeout(() => {
// //             loadBlogs();
// //         }, 500);
// //         return () => clearTimeout(timer);
// //     }, [search]);

// //     const handleStatusChange = async (id: string, newStatus: string) => {
// //         try {
// //             await api(`/api/blog/${id}/status`, {
// //                 method: 'PATCH',
// //                 body: JSON.stringify({ status: newStatus })
// //             });
// //             setBlogs(prev => prev.map(b => b._id === id ? { ...b, status: newStatus } : b));
// //             Swal.fire({
// //                 icon: 'success',
// //                 title: 'Status Diperbarui',
// //                 text: `Blog berhasil diubah menjadi ${newStatus}`,
// //                 timer: 1500,
// //                 showConfirmButton: false
// //             });
// //         } catch (error) {
// //             console.error(error);
// //             Swal.fire('Error', 'Gagal mengubah status', 'error');
// //         }
// //     };

// //     const handleDelete = async (id: string) => {
// //         const result = await Swal.fire({
// //             title: 'Hapus Cerita?',
// //             text: "Data yang dihapus tidak dapat dikembalikan!",
// //             icon: 'warning',
// //             showCancelButton: true,
// //             confirmButtonColor: '#d33',
// //             cancelButtonColor: '#3085d6',
// //             confirmButtonText: 'Ya, Hapus!',
// //             cancelButtonText: 'Batal'
// //         });

// //         if (result.isConfirmed) {
// //             try {
// //                 await api(`/api/blog/${id}`, { method: 'DELETE' });
// //                 setBlogs(prev => prev.filter(b => b._id !== id));
// //                 Swal.fire('Terhapus!', 'Cerita relawan telah dihapus.', 'success');
// //             } catch (error) {
// //                 console.error(error);
// //                 Swal.fire('Error', 'Gagal menghapus data', 'error');
// //             }
// //         }
// //     };

// //     const filteredBlogs = blogs.filter(blog => {
// //         if (filterStatus === 'all') return true;
// //         return blog.status === filterStatus;
// //     });

// //     return (
// //         <div className="p-6 bg-gray-50 min-h-screen">
// //             <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
// //                 <div>
// //                     <h1 className="text-2xl font-bold text-gray-800">Kelola Cerita Relawan</h1>
// //                     <p className="text-gray-500 text-sm">Manajemen artikel, berita, dan kisah inspiratif.</p>
// //                 </div>
// //                 <Link href="/admin/blog/create" className="bg-[#990000] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-800 transition-colors shadow-md">
// //                     <Plus size={18} /> Tulis Cerita Baru
// //                 </Link>
// //             </div>

// //             <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
// //                 <div className="relative w-full md:w-1/3">
// //                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
// //                     <input 
// //                         type="text" 
// //                         placeholder="Cari judul cerita..." 
// //                         className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20"
// //                         value={search}
// //                         onChange={(e) => setSearch(e.target.value)}
// //                     />
// //                 </div>
                
// //                 <div className="flex gap-2 w-full md:w-auto overflow-x-auto">
// //                     {['all', 'approved', 'pending', 'rejected'].map((status) => (
// //                         <button
// //                             key={status}
// //                             onClick={() => setFilterStatus(status)}
// //                             className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors whitespace-nowrap ${
// //                                 filterStatus === status 
// //                                 ? 'bg-red-50 text-[#990000] border border-red-200' 
// //                                 : 'bg-gray-50 text-gray-600 border border-transparent hover:bg-gray-100'
// //                             }`}
// //                         >
// //                             {status === 'all' ? 'Semua Status' : status}
// //                         </button>
// //                     ))}
// //                 </div>
// //             </div>

// //             <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
// //                 <div className="overflow-x-auto">
// //                     <table className="w-full text-left border-collapse">
// //                         <thead className="bg-gray-50 border-b border-gray-100">
// //                             <tr>
// //                                 <th className="p-4 text-sm font-semibold text-gray-600">Judul & Penulis</th>
// //                                 <th className="p-4 text-sm font-semibold text-gray-600">Tanggal</th>
// //                                 <th className="p-4 text-sm font-semibold text-gray-600 text-center">Status</th>
// //                                 <th className="p-4 text-sm font-semibold text-gray-600 text-right">Aksi</th>
// //                             </tr>
// //                         </thead>
// //                         <tbody className="divide-y divide-gray-50">
// //                             {loading ? (
// //                                 <tr><td colSpan={4} className="p-8 text-center text-gray-500">Memuat data...</td></tr>
// //                             ) : filteredBlogs.length === 0 ? (
// //                                 <tr><td colSpan={4} className="p-8 text-center text-gray-500">Tidak ada cerita ditemukan.</td></tr>
// //                             ) : (
// //                                 filteredBlogs.map((blog) => (
// //                                     <tr key={blog._id} className="hover:bg-gray-50 transition-colors group">
// //                                         <td className="p-4">
// //                                             <div className="font-bold text-gray-800 mb-1 line-clamp-1">{blog.title}</div>
// //                                             <div className="text-xs text-gray-500 flex items-center gap-1">
// //                                                 By: <span className="font-medium text-gray-700">{blog.author?.name || 'Unknown'}</span>
// //                                             </div>
// //                                         </td>
// //                                         <td className="p-4 text-sm text-gray-600 whitespace-nowrap">
// //                                             {new Date(blog.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
// //                                         </td>
// //                                         <td className="p-4 text-center">
// //                                             <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
// //                                                 blog.status === 'approved' ? 'bg-green-100 text-green-700' :
// //                                                 blog.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
// //                                                 'bg-red-100 text-red-700'
// //                                             }`}>
// //                                                 {blog.status === 'approved' && <CheckCircle size={10}/>}
// //                                                 {blog.status === 'pending' && <Clock size={10}/>}
// //                                                 {blog.status === 'rejected' && <XCircle size={10}/>}
// //                                                 {blog.status}
// //                                             </span>
// //                                         </td>
// //                                         <td className="p-4">
// //                                             <div className="flex justify-end items-center gap-2">
// //                                                 {/* Action Buttons dengan aria-label */}
// //                                                 <div className="flex bg-gray-100 rounded-lg p-1 opacity-0 group-hover:opacity-100 transition-opacity">
// //                                                     {blog.status !== 'approved' && (
// //                                                         <button 
// //                                                             onClick={() => handleStatusChange(blog._id, 'approved')}
// //                                                             className="p-1.5 hover:bg-green-200 text-green-600 rounded transition-colors"
// //                                                             title="Setujui"
// //                                                             aria-label="Setujui Cerita"
// //                                                         >
// //                                                             <CheckCircle size={16}/>
// //                                                         </button>
// //                                                     )}
// //                                                     {blog.status !== 'rejected' && (
// //                                                         <button 
// //                                                             onClick={() => handleStatusChange(blog._id, 'rejected')}
// //                                                             className="p-1.5 hover:bg-red-200 text-red-600 rounded transition-colors"
// //                                                             title="Tolak"
// //                                                             aria-label="Tolak Cerita"
// //                                                         >
// //                                                             <XCircle size={16}/>
// //                                                         </button>
// //                                                     )}
// //                                                     {blog.status !== 'pending' && (
// //                                                         <button 
// //                                                             onClick={() => handleStatusChange(blog._id, 'pending')}
// //                                                             className="p-1.5 hover:bg-yellow-200 text-yellow-600 rounded transition-colors"
// //                                                             title="Kembalikan ke Pending"
// //                                                             aria-label="Kembalikan ke Pending"
// //                                                         >
// //                                                             <Clock size={16}/>
// //                                                         </button>
// //                                                     )}
// //                                                 </div>

// //                                                 <div className="w-px h-6 bg-gray-200 mx-1"></div>

// //                                                 <Link 
// //                                                     href={`/blog/${blog._id}`} 
// //                                                     target="_blank" 
// //                                                     className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
// //                                                     title="Lihat"
// //                                                     aria-label="Lihat Detail Cerita"
// //                                                 >
// //                                                     <Eye size={18}/>
// //                                                 </Link>
// //                                                 <Link 
// //                                                     href={`/admin/blog/edit/${blog._id}`} 
// //                                                     className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
// //                                                     title="Edit"
// //                                                     aria-label="Edit Cerita"
// //                                                 >
// //                                                     <Edit size={18}/>
// //                                                 </Link>
// //                                                 <button 
// //                                                     onClick={() => handleDelete(blog._id)}
// //                                                     className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
// //                                                     title="Hapus"
// //                                                     aria-label="Hapus Cerita"
// //                                                 >
// //                                                     <Trash2 size={18}/>
// //                                                 </button>
// //                                             </div>
// //                                         </td>
// //                                     </tr>
// //                                 ))
// //                             )}
// //                         </tbody>
// //                     </table>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }



// 'use client';

// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { api } from '@/lib/api';
// import { 
//     Plus, Search, Edit, Trash2, CheckCircle, XCircle, Clock, Eye, 
//     Settings, DownloadCloud, ExternalLink, X, Loader2
// } from 'lucide-react';
// import Swal from 'sweetalert2';

// export default function AdminBlogPage() {
//     const [blogs, setBlogs] = useState<any[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [search, setSearch] = useState('');
//     const [filterStatus, setFilterStatus] = useState('all');
    
//     // State untuk Modal Import
//     const [showImportModal, setShowImportModal] = useState(false);
//     const [importing, setImporting] = useState(false);
//     const [importResults, setImportResults] = useState<any[]>([]);

//     const loadBlogs = async () => {
//         try {
//             setLoading(true);
//             const query = search ? `?search=${search}` : '';
//             const res = await api(`/api/blog/admin${query}`);
//             setBlogs(res);
//         } catch (error) {
//             console.error("Gagal memuat blog:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         const timer = setTimeout(() => {
//             loadBlogs();
//         }, 500);
//         return () => clearTimeout(timer);
//     }, [search]);

//     const handleStatusChange = async (id: string, newStatus: string) => {
//         try {
//             await api(`/api/blog/${id}/status`, {
//                 method: 'PATCH',
//                 body: JSON.stringify({ status: newStatus })
//             });
//             setBlogs(prev => prev.map(b => b._id === id ? { ...b, status: newStatus } : b));
//             Swal.fire({
//                 icon: 'success',
//                 title: 'Status Diperbarui',
//                 text: `Blog berhasil diubah menjadi ${newStatus}`,
//                 timer: 1500,
//                 showConfirmButton: false
//             });
//         } catch (error) {
//             Swal.fire('Error', 'Gagal mengubah status', 'error');
//         }
//     };

//     const handleDelete = async (id: string) => {
//         const result = await Swal.fire({
//             title: 'Hapus Cerita?',
//             text: "Data yang dihapus tidak dapat dikembalikan!",
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#d33',
//             confirmButtonText: 'Ya, Hapus!',
//             cancelButtonText: 'Batal'
//         });

//         if (result.isConfirmed) {
//             try {
//                 await api(`/api/blog/${id}`, { method: 'DELETE' });
//                 setBlogs(prev => prev.filter(b => b._id !== id));
//                 Swal.fire('Terhapus!', 'Cerita relawan telah dihapus.', 'success');
//             } catch (error) {
//                 Swal.fire('Error', 'Gagal menghapus data', 'error');
//             }
//         }
//     };

//     // --- LOGIC IMPORT PMI ---
//     const handleImportPmi = async () => {
//         setImporting(true);
//         setImportResults([]); // Reset hasil sebelumnya
//         try {
//             const res: any = await api('/api/blog/import-pmi', { method: 'POST' });
            
//             if (res.savedCount > 0) {
//                 setImportResults(res.results); // Simpan hasil untuk preview
//                 loadBlogs(); // Refresh tabel utama di background
//                 Swal.fire({
//                     icon: 'success',
//                     title: 'Import Berhasil!',
//                     text: `${res.savedCount} cerita baru berhasil disimpan dari ${res.totalFound} yang ditemukan.`,
//                 });
//             } else {
//                 Swal.fire('Info', 'Tidak ada cerita baru yang ditemukan (mungkin sudah ada di database).', 'info');
//             }
//         } catch (error) {
//             console.error(error);
//             Swal.fire('Gagal', 'Terjadi kesalahan koneksi ke PMI Pusat.', 'error');
//         } finally {
//             setImporting(false);
//         }
//     };

//     const filteredBlogs = blogs.filter(blog => {
//         if (filterStatus === 'all') return true;
//         return blog.status === filterStatus;
//     });

//     return (
//         <div className="p-6 bg-gray-50 min-h-screen relative">
            
//             {/* Header & Tools */}
//             <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
//                 <div>
//                     <h1 className="text-2xl font-bold text-gray-800">Kelola Cerita Relawan</h1>
//                     <p className="text-gray-500 text-sm">Manajemen artikel, berita, dan kisah inspiratif.</p>
//                 </div>
                
//                 <div className="flex gap-3">
//                     {/* TOMBOL GEAR (IMPORT) */}
//                     <button 
//                         onClick={() => setShowImportModal(true)}
//                         className="bg-white text-gray-600 border border-gray-300 p-2.5 rounded-lg hover:bg-gray-100 transition-all shadow-sm"
//                         title="Import & Pengaturan"
//                         aria-label="Pengaturan Import"
//                     >
//                         <Settings size={20} />
//                     </button>

//                     <Link href="/admin/blog/create" className="bg-[#990000] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-800 transition-colors shadow-md">
//                         <Plus size={18} /> Tulis Cerita Baru
//                     </Link>
//                 </div>
//             </div>

//             {/* Filter Bar */}
//             <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
//                 <div className="relative w-full md:w-1/3">
//                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//                     <input 
//                         type="text" 
//                         placeholder="Cari judul cerita..." 
//                         className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20"
//                         value={search}
//                         onChange={(e) => setSearch(e.target.value)}
//                     />
//                 </div>
//                 <div className="flex gap-2 w-full md:w-auto overflow-x-auto">
//                     {['all', 'approved', 'pending', 'rejected'].map((status) => (
//                         <button
//                             key={status}
//                             onClick={() => setFilterStatus(status)}
//                             className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors whitespace-nowrap ${
//                                 filterStatus === status 
//                                 ? 'bg-red-50 text-[#990000] border border-red-200' 
//                                 : 'bg-gray-50 text-gray-600 border border-transparent hover:bg-gray-100'
//                             }`}
//                         >
//                             {status === 'all' ? 'Semua Status' : status}
//                         </button>
//                     ))}
//                 </div>
//             </div>

//             {/* Main Table */}
//             <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//                 <div className="overflow-x-auto">
//                     <table className="w-full text-left border-collapse">
//                         <thead className="bg-gray-50 border-b border-gray-100">
//                             <tr>
//                                 <th className="p-4 text-sm font-semibold text-gray-600">Judul & Penulis</th>
//                                 <th className="p-4 text-sm font-semibold text-gray-600">Tanggal</th>
//                                 <th className="p-4 text-sm font-semibold text-gray-600 text-center">Status</th>
//                                 <th className="p-4 text-sm font-semibold text-gray-600 text-right">Aksi</th>
//                             </tr>
//                         </thead>
//                         <tbody className="divide-y divide-gray-50">
//                             {loading ? (
//                                 <tr><td colSpan={4} className="p-8 text-center text-gray-500">Memuat data...</td></tr>
//                             ) : filteredBlogs.length === 0 ? (
//                                 <tr><td colSpan={4} className="p-8 text-center text-gray-500">Tidak ada cerita ditemukan.</td></tr>
//                             ) : (
//                                 filteredBlogs.map((blog) => (
//                                     <tr key={blog._id} className="hover:bg-gray-50 transition-colors group">
//                                         <td className="p-4">
//                                             <div className="font-bold text-gray-800 mb-1 line-clamp-1">{blog.title}</div>
//                                             <div className="text-xs text-gray-500 flex items-center gap-1">
//                                                 By: <span className="font-medium text-gray-700">{blog.author?.name || 'Unknown'}</span>
//                                             </div>
//                                         </td>
//                                         <td className="p-4 text-sm text-gray-600 whitespace-nowrap">
//                                             {new Date(blog.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
//                                         </td>
//                                         <td className="p-4 text-center">
//                                             <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
//                                                 blog.status === 'approved' ? 'bg-green-100 text-green-700' :
//                                                 blog.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
//                                                 'bg-red-100 text-red-700'
//                                             }`}>
//                                                 {blog.status === 'approved' && <CheckCircle size={10}/>}
//                                                 {blog.status === 'pending' && <Clock size={10}/>}
//                                                 {blog.status === 'rejected' && <XCircle size={10}/>}
//                                                 {blog.status}
//                                             </span>
//                                         </td>
//                                         <td className="p-4">
//                                             <div className="flex justify-end items-center gap-2">
//                                                 <div className="flex bg-gray-100 rounded-lg p-1 opacity-0 group-hover:opacity-100 transition-opacity">
//                                                     {blog.status !== 'approved' && (
//                                                         <button 
//                                                             onClick={() => handleStatusChange(blog._id, 'approved')}
//                                                             className="p-1.5 hover:bg-green-200 text-green-600 rounded transition-colors"
//                                                             title="Setujui"
//                                                             aria-label="Setujui"
//                                                         >
//                                                             <CheckCircle size={16}/>
//                                                         </button>
//                                                     )}
//                                                     {blog.status !== 'rejected' && (
//                                                         <button 
//                                                             onClick={() => handleStatusChange(blog._id, 'rejected')}
//                                                             className="p-1.5 hover:bg-red-200 text-red-600 rounded transition-colors"
//                                                             title="Tolak"
//                                                             aria-label="Tolak"
//                                                         >
//                                                             <XCircle size={16}/>
//                                                         </button>
//                                                     )}
//                                                 </div>
//                                                 <div className="w-px h-6 bg-gray-200 mx-1"></div>
//                                                 <Link href={`/blog/${blog._id}`} target="_blank" className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg" aria-label="Lihat" title="Lihat">
//                                                     <Eye size={18}/>
//                                                 </Link>
//                                                 <Link href={`/admin/blog/edit/${blog._id}`} className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg" aria-label="Edit" title="Edit">
//                                                     <Edit size={18}/>
//                                                 </Link>
//                                                 <button onClick={() => handleDelete(blog._id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg" aria-label="Hapus" title="Hapus">
//                                                     <Trash2 size={18}/>
//                                                 </button>
//                                             </div>
//                                         </td>
//                                     </tr>
//                                 ))
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>

//             {/* === MODAL IMPORT PMI === */}
//             {showImportModal && (
//                 <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
//                     <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[80vh]">
//                         {/* Modal Header */}
//                         <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
//                             <div className="flex items-center gap-3">
//                                 <div className="bg-red-100 p-2 rounded-full text-[#990000]">
//                                     <DownloadCloud size={24}/>
//                                 </div>
//                                 <div>
//                                     <h3 className="font-bold text-gray-900 text-lg">Import Cerita Relawan</h3>
//                                     <p className="text-xs text-gray-500">Sinkronisasi data dari pmi.or.id</p>
//                                 </div>
//                             </div>
//                             <button onClick={() => setShowImportModal(false)} className="text-gray-400 hover:text-gray-600" aria-label="Tutup" title="Tutup">
//                                 <X size={24}/>
//                             </button>
//                         </div>

//                         {/* Modal Body */}
//                         <div className="p-6 overflow-y-auto flex-1">
//                             {!importResults.length && !importing && (
//                                 <div className="text-center py-10">
//                                     <p className="text-gray-600 mb-6 max-w-sm mx-auto">
//                                         Fitur ini akan mengambil 5 artikel terbaru dari website PMI Pusat dan menyimpannya sebagai draft (Pending).
//                                     </p>
//                                     <button 
//                                         onClick={handleImportPmi}
//                                         className="bg-[#990000] text-white px-6 py-3 rounded-full font-bold hover:bg-red-800 transition-all shadow-lg flex items-center gap-2 mx-auto"
//                                     >
//                                         Mulai Sinkronisasi
//                                     </button>
//                                 </div>
//                             )}

//                             {importing && (
//                                 <div className="text-center py-12">
//                                     <Loader2 className="animate-spin text-[#990000] mx-auto mb-4" size={40}/>
//                                     <p className="text-gray-600 font-medium">Sedang mengambil data...</p>
//                                     <p className="text-xs text-gray-400 mt-1">Mohon tunggu sebentar.</p>
//                                 </div>
//                             )}

//                             {/* PREVIEW HASIL IMPORT */}
//                             {importResults.length > 0 && !importing && (
//                                 <div>
//                                     <div className="flex justify-between items-center mb-4">
//                                         <h4 className="font-bold text-gray-800">Hasil Import ({importResults.length})</h4>
//                                         <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-bold">Berhasil Disimpan</span>
//                                     </div>
//                                     <div className="space-y-3">
//                                         {importResults.map((item: any, idx: number) => (
//                                             <div key={idx} className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex gap-4 items-start group hover:border-red-200 transition-colors">
//                                                 <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
//                                                     {item.coverUrl && <img src={item.coverUrl} className="w-full h-full object-cover" alt="Cover"/>}
//                                                 </div>
//                                                 <div className="flex-1 min-w-0">
//                                                     <h5 className="font-bold text-gray-900 text-sm line-clamp-1 mb-1">{item.title}</h5>
//                                                     <div className="flex gap-2">
//                                                         <span className="text-[10px] bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded font-bold uppercase">Pending</span>
//                                                     </div>
//                                                 </div>
//                                                 <Link 
//                                                     href={`/admin/blog/edit/${item._id}`}
//                                                     className="self-center bg-white border border-gray-300 text-gray-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-[#990000] hover:text-white hover:border-[#990000] transition-all flex items-center gap-1"
//                                                 >
//                                                     <Edit size={14}/> Review & Edit
//                                                 </Link>
//                                             </div>
//                                         ))}
//                                     </div>
//                                     <div className="mt-6 text-center">
//                                         <button 
//                                             onClick={() => {
//                                                 setShowImportModal(false);
//                                                 setImportResults([]);
//                                                 setFilterStatus('pending'); // Auto switch ke tab pending
//                                             }}
//                                             className="text-gray-500 hover:text-gray-800 text-sm font-medium underline"
//                                         >
//                                             Tutup & Lihat di Tabel
//                                         </button>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             )}

//         </div>
//     );
// }
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import Protected from '@/components/Protected'; 
import { 
    Plus, Search, Edit, Trash2, CheckCircle, XCircle, Clock, Eye, 
    Settings, DownloadCloud, X, Loader2
} from 'lucide-react';
import Swal from 'sweetalert2';

export default function AdminBlogPage() {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    
    // State untuk Modal Import
    const [showImportModal, setShowImportModal] = useState(false);
    const [importing, setImporting] = useState(false);
    const [importResults, setImportResults] = useState<any[]>([]);

    const loadBlogs = async () => {
        try {
            setLoading(true);
            const query = search ? `?search=${search}` : '';
            const res = await api(`/api/blog/admin${query}`);
            setBlogs(res);
        } catch (error) {
            console.error("Gagal memuat blog:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            loadBlogs();
        }, 500);
        return () => clearTimeout(timer);
    }, [search]);

    const handleStatusChange = async (id: string, newStatus: string) => {
        try {
            await api(`/api/blog/${id}/status`, {
                method: 'PATCH',
                body: JSON.stringify({ status: newStatus })
            });
            setBlogs(prev => prev.map(b => b._id === id ? { ...b, status: newStatus } : b));
            Swal.fire({
                icon: 'success',
                title: 'Status Diperbarui',
                text: `Blog berhasil diubah menjadi ${newStatus}`,
                timer: 1500,
                showConfirmButton: false
            });
        } catch (error) {
            Swal.fire('Error', 'Gagal mengubah status', 'error');
        }
    };

    const handleDelete = async (id: string) => {
        const result = await Swal.fire({
            title: 'Hapus Cerita?',
            text: "Data yang dihapus tidak dapat dikembalikan!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal'
        });

        if (result.isConfirmed) {
            try {
                await api(`/api/blog/${id}`, { method: 'DELETE' });
                setBlogs(prev => prev.filter(b => b._id !== id));
                Swal.fire('Terhapus!', 'Cerita relawan telah dihapus.', 'success');
            } catch (error) {
                Swal.fire('Error', 'Gagal menghapus data', 'error');
            }
        }
    };

    // --- LOGIC IMPORT PMI ---
    const handleImportPmi = async () => {
        setImporting(true);
        setImportResults([]); 
        try {
            const res: any = await api('/api/blog/import-pmi', { method: 'POST' });
            
            if (res.savedCount > 0) {
                setImportResults(res.results); 
                loadBlogs(); 
                Swal.fire({
                    icon: 'success',
                    title: 'Import Berhasil!',
                    text: `${res.savedCount} cerita baru berhasil disimpan dari ${res.totalFound} yang ditemukan.`,
                });
            } else {
                Swal.fire('Info', 'Tidak ada cerita baru yang ditemukan (mungkin sudah ada di database).', 'info');
            }
        } catch (error) {
            console.error(error);
            Swal.fire('Gagal', 'Terjadi kesalahan koneksi ke PMI Pusat.', 'error');
        } finally {
            setImporting(false);
        }
    };

    const filteredBlogs = blogs.filter(blog => {
        if (filterStatus === 'all') return true;
        return blog.status === filterStatus;
    });

    return (
        // [FIX] Role 'ADMIN' dihapus dari sini
        <Protected roles={['SUPER_ADMIN', 'FACILITATOR']}>
            <div className="p-6 bg-gray-50 min-h-screen relative">
                
                {/* Header & Tools */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Kelola Cerita Relawan</h1>
                        <p className="text-gray-500 text-sm">Manajemen artikel, berita, dan kisah inspiratif.</p>
                    </div>
                    
                    <div className="flex gap-3">
                        {/* TOMBOL GEAR (IMPORT) */}
                        <button 
                            onClick={() => setShowImportModal(true)}
                            className="bg-white text-gray-600 border border-gray-300 p-2.5 rounded-lg hover:bg-gray-100 transition-all shadow-sm"
                            title="Import & Pengaturan"
                            aria-label="Pengaturan Import"
                        >
                            <Settings size={20} />
                        </button>

                        <Link href="/admin/blog/create" className="bg-[#990000] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-800 transition-colors shadow-md">
                            <Plus size={18} /> Tulis Cerita Baru
                        </Link>
                    </div>
                </div>

                {/* Filter Bar */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full md:w-1/3">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Cari judul cerita..." 
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 w-full md:w-auto overflow-x-auto">
                        {['all', 'approved', 'pending', 'rejected'].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors whitespace-nowrap ${
                                    filterStatus === status 
                                    ? 'bg-red-50 text-[#990000] border border-red-200' 
                                    : 'bg-gray-50 text-gray-600 border border-transparent hover:bg-gray-100'
                                }`}
                            >
                                {status === 'all' ? 'Semua Status' : status}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="p-4 text-sm font-semibold text-gray-600">Judul & Penulis</th>
                                    <th className="p-4 text-sm font-semibold text-gray-600">Tanggal</th>
                                    <th className="p-4 text-sm font-semibold text-gray-600 text-center">Status</th>
                                    <th className="p-4 text-sm font-semibold text-gray-600 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {loading ? (
                                    <tr><td colSpan={4} className="p-8 text-center text-gray-500">Memuat data...</td></tr>
                                ) : filteredBlogs.length === 0 ? (
                                    <tr><td colSpan={4} className="p-8 text-center text-gray-500">Tidak ada cerita ditemukan.</td></tr>
                                ) : (
                                    filteredBlogs.map((blog) => (
                                        <tr key={blog._id} className="hover:bg-gray-50 transition-colors group">
                                            <td className="p-4">
                                                <div className="font-bold text-gray-800 mb-1 line-clamp-1">{blog.title}</div>
                                                <div className="text-xs text-gray-500 flex items-center gap-1">
                                                    By: <span className="font-medium text-gray-700">{blog.author?.name || 'Unknown'}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 text-sm text-gray-600 whitespace-nowrap">
                                                {new Date(blog.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </td>
                                            <td className="p-4 text-center">
                                                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                                                    blog.status === 'approved' ? 'bg-green-100 text-green-700' :
                                                    blog.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-red-100 text-red-700'
                                                }`}>
                                                    {blog.status === 'approved' && <CheckCircle size={10}/>}
                                                    {blog.status === 'pending' && <Clock size={10}/>}
                                                    {blog.status === 'rejected' && <XCircle size={10}/>}
                                                    {blog.status}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex justify-end items-center gap-2">
                                                    <div className="flex bg-gray-100 rounded-lg p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        {blog.status !== 'approved' && (
                                                            <button 
                                                                onClick={() => handleStatusChange(blog._id, 'approved')}
                                                                className="p-1.5 hover:bg-green-200 text-green-600 rounded transition-colors"
                                                                title="Setujui"
                                                                aria-label="Setujui"
                                                            >
                                                                <CheckCircle size={16}/>
                                                            </button>
                                                        )}
                                                        {blog.status !== 'rejected' && (
                                                            <button 
                                                                onClick={() => handleStatusChange(blog._id, 'rejected')}
                                                                className="p-1.5 hover:bg-red-200 text-red-600 rounded transition-colors"
                                                                title="Tolak"
                                                                aria-label="Tolak"
                                                            >
                                                                <XCircle size={16}/>
                                                            </button>
                                                        )}
                                                    </div>
                                                    <div className="w-px h-6 bg-gray-200 mx-1"></div>
                                                    <Link href={`/blog/${blog._id}`} target="_blank" className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg" aria-label="Lihat" title="Lihat">
                                                        <Eye size={18}/>
                                                    </Link>
                                                    <Link href={`/admin/blog/edit/${blog._id}`} className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg" aria-label="Edit" title="Edit">
                                                        <Edit size={18}/>
                                                    </Link>
                                                    <button onClick={() => handleDelete(blog._id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg" aria-label="Hapus" title="Hapus">
                                                        <Trash2 size={18}/>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* === MODAL IMPORT PMI === */}
                {showImportModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                        <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[80vh]">
                            {/* Modal Header */}
                            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="bg-red-100 p-2 rounded-full text-[#990000]">
                                        <DownloadCloud size={24}/>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-lg">Import Cerita Relawan</h3>
                                        <p className="text-xs text-gray-500">Sinkronisasi data dari pmi.or.id</p>
                                    </div>
                                </div>
                                <button onClick={() => setShowImportModal(false)} className="text-gray-400 hover:text-gray-600" aria-label="Tutup" title="Tutup">
                                    <X size={24}/>
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-6 overflow-y-auto flex-1">
                                {!importResults.length && !importing && (
                                    <div className="text-center py-10">
                                        <p className="text-gray-600 mb-6 max-w-sm mx-auto">
                                            Fitur ini akan mengambil 5 artikel terbaru dari website PMI Pusat dan menyimpannya sebagai draft (Pending).
                                        </p>
                                        <button 
                                            onClick={handleImportPmi}
                                            className="bg-[#990000] text-white px-6 py-3 rounded-full font-bold hover:bg-red-800 transition-all shadow-lg flex items-center gap-2 mx-auto"
                                        >
                                            Mulai Sinkronisasi
                                        </button>
                                    </div>
                                )}

                                {importing && (
                                    <div className="text-center py-12">
                                        <Loader2 className="animate-spin text-[#990000] mx-auto mb-4" size={40}/>
                                        <p className="text-gray-600 font-medium">Sedang mengambil data...</p>
                                        <p className="text-xs text-gray-400 mt-1">Mohon tunggu sebentar.</p>
                                    </div>
                                )}

                                {/* PREVIEW HASIL IMPORT */}
                                {importResults.length > 0 && !importing && (
                                    <div>
                                        <div className="flex justify-between items-center mb-4">
                                            <h4 className="font-bold text-gray-800">Hasil Import ({importResults.length})</h4>
                                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-bold">Berhasil Disimpan</span>
                                        </div>
                                        <div className="space-y-3">
                                            {importResults.map((item: any, idx: number) => (
                                                <div key={idx} className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex gap-4 items-start group hover:border-red-200 transition-colors">
                                                    <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                                                        {item.coverUrl && <img src={item.coverUrl} className="w-full h-full object-cover" alt="Cover"/>}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h5 className="font-bold text-gray-900 text-sm line-clamp-1 mb-1">{item.title}</h5>
                                                        <div className="flex gap-2">
                                                            <span className="text-[10px] bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded font-bold uppercase">Pending</span>
                                                        </div>
                                                    </div>
                                                    <Link 
                                                        href={`/admin/blog/edit/${item._id}`}
                                                        className="self-center bg-white border border-gray-300 text-gray-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-[#990000] hover:text-white hover:border-[#990000] transition-all flex items-center gap-1"
                                                    >
                                                        <Edit size={14}/> Review & Edit
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-6 text-center">
                                            <button 
                                                onClick={() => {
                                                    setShowImportModal(false);
                                                    setImportResults([]);
                                                    setFilterStatus('pending'); 
                                                }}
                                                className="text-gray-500 hover:text-gray-800 text-sm font-medium underline"
                                            >
                                                Tutup & Lihat di Tabel
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </Protected>
    );
}
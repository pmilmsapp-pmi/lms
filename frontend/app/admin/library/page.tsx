// // 'use client';

// // import { useState, useEffect } from 'react';
// // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // import Protected from '@/components/Protected';
// // import { Plus, Pencil, Trash2, FileText, X, UploadCloud, Book as BookIcon } from 'lucide-react';

// // export default function AdminLibraryPage() {
// //   const [books, setBooks] = useState<any[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [cmsCategories, setCmsCategories] = useState<string[]>(['General']);
  
// //   // MODAL STATE
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [editId, setEditId] = useState('');
  
// //   // FORM STATE
// //   const [formData, setFormData] = useState({
// //       title: '', description: '', category: '', 
// //       author: '', year: '', 
// //       fileUrl: '', coverUrl: ''
// //   });
  
// //   // UPLOAD LOADING STATE
// //   const [uploadingFile, setUploadingFile] = useState(false);
// //   const [uploadingCover, setUploadingCover] = useState(false);

// //   useEffect(() => {
// //     loadData();
// //   }, []);

// //   const loadData = async () => {
// //     try {
// //         setLoading(true);
// //         // 1. Load Kategori
// //         const content = await api('/api/content');
// //         if (content?.libraryCategories?.length > 0) {
// //             setCmsCategories(content.libraryCategories);
// //             setFormData(p => ({...p, category: content.libraryCategories[0]}));
// //         }

// //         // 2. Load Buku
// //         const bookData = await api('/api/library');
// //         setBooks(bookData || []);
// //     } catch (e) { console.error(e); } finally { setLoading(false); }
// //   };

// //   const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'fileUrl' | 'coverUrl') => {
// //       if (!e.target.files?.[0]) return;
      
// //       const isFile = field === 'fileUrl';
// //       if(isFile) setUploadingFile(true); else setUploadingCover(true);

// //       try {
// //           const fd = new FormData();
// //           fd.append('file', e.target.files[0]);
// //           const res = await apiUpload('/api/upload', fd);
// //           const url = res.url || res.file?.url;
// //           setFormData(prev => ({ ...prev, [field]: url }));
// //       } catch (e: any) { alert("Upload Gagal: " + e.message); } 
// //       finally { if(isFile) setUploadingFile(false); else setUploadingCover(false); }
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //       e.preventDefault();
// //       if(!formData.fileUrl) return alert("Wajib upload file dokumen/PDF!");

// //       try {
// //           if (isEditing) {
// //               await api(`/api/library/${editId}`, { method: 'PATCH', body: formData });
// //               alert("Buku diperbarui!");
// //           } else {
// //               await api('/api/library', { method: 'POST', body: formData });
// //               alert("Buku ditambahkan!");
// //           }
// //           closeModal();
// //           loadData();
// //       } catch (e: any) { alert("Gagal: " + e.message); }
// //   };

// //   const handleDelete = async (id: string) => {
// //       if(!confirm("Hapus buku ini?")) return;
// //       try {
// //           await api(`/api/library/${id}`, { method: 'DELETE' });
// //           loadData();
// //       } catch (e: any) { alert(e.message); }
// //   };

// //   const openEdit = (book: any) => {
// //       setFormData({
// //           title: book.title, description: book.description, category: book.category,
// //           author: book.author, year: book.year, fileUrl: book.fileUrl, coverUrl: book.coverUrl
// //       });
// //       setEditId(book._id);
// //       setIsEditing(true);
// //       setIsModalOpen(true);
// //   };

// //   const closeModal = () => {
// //       setIsModalOpen(false);
// //       setIsEditing(false);
// //       setFormData({ title: '', description: '', category: cmsCategories[0] || 'General', author: '', year: '', fileUrl: '', coverUrl: '' });
// //   };

// //   return (
// //     <Protected roles={['SUPER_ADMIN', 'FACILITATOR']}>
// //       <div className="max-w-7xl mx-auto p-6 font-sans">
        
// //         {/* HEADER */}
// //         <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
// //             <div>
// //                 <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
// //                     <BookIcon className="text-red-700"/> Manajemen Perpustakaan
// //                 </h1>
// //                 <p className="text-gray-500 text-sm mt-1">Kelola buku, modul, dan referensi digital.</p>
// //             </div>
// //             {/* BUTTON ADD */}
// //             <button 
// //                 onClick={() => setIsModalOpen(true)} 
// //                 className="bg-red-700 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-red-800 transition flex items-center gap-2 shadow-lg shadow-red-100"
// //                 aria-label="Tambah Buku Baru"
// //             >
// //                 <Plus size={20}/> Tambah Buku
// //             </button>
// //         </div>

// //         {/* LIST BUKU */}
// //         {loading ? <div className="text-center py-20">Memuat...</div> : 
// //          books.length === 0 ? <div className="text-center py-20 bg-gray-50 rounded-xl border-dashed border-2">Belum ada buku.</div> : 
// //          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //             {books.map((book) => (
// //                 <div key={book._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col hover:shadow-md transition">
// //                     <div className="h-40 bg-gray-100 relative group">
// //                         {book.coverUrl ? (
// //                             <img src={getImageUrl(book.coverUrl)} className="w-full h-full object-cover" alt="cover"/>
// //                         ) : (
// //                             <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-200"><FileText size={48} opacity={0.2}/></div>
// //                         )}
// //                         <span className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-gray-600 shadow-sm">{book.category}</span>
// //                     </div>
// //                     <div className="p-5 flex-1 flex flex-col">
// //                         <h3 className="font-bold text-gray-800 mb-1 line-clamp-2" title={book.title}>{book.title}</h3>
// //                         <p className="text-xs text-gray-500 mb-4">{book.author || 'No Author'} • {book.year || '-'}</p>
// //                         <div className="mt-auto flex gap-2 pt-4 border-t border-gray-100">
// //                             <a href={getImageUrl(book.fileUrl)} target="_blank" className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-lg text-xs font-bold text-center hover:bg-blue-100">Lihat File</a>
                            
// //                             {/* FIX BUTTON NAME: Added aria-label */}
// //                             <button 
// //                                 onClick={() => openEdit(book)} 
// //                                 className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-amber-100 hover:text-amber-600"
// //                                 aria-label={`Edit buku ${book.title}`}
// //                             >
// //                                 <Pencil size={16}/>
// //                             </button>
                            
// //                             {/* FIX BUTTON NAME: Added aria-label */}
// //                             <button 
// //                                 onClick={() => handleDelete(book._id)} 
// //                                 className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-red-100 hover:text-red-600"
// //                                 aria-label={`Hapus buku ${book.title}`}
// //                             >
// //                                 <Trash2 size={16}/>
// //                             </button>
// //                         </div>
// //                     </div>
// //                 </div>
// //             ))}
// //          </div>
// //         }

// //         {/* MODAL FORM */}
// //         {isModalOpen && (
// //             <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
// //                 <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
// //                     <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center sticky top-0">
// //                         <h2 className="text-lg font-bold">{isEditing ? 'Edit Buku' : 'Tambah Buku Baru'}</h2>
                        
// //                         {/* FIX BUTTON NAME: Added aria-label */}
// //                         <button onClick={closeModal} aria-label="Tutup Modal">
// //                             <X className="text-gray-400 hover:text-red-600"/>
// //                         </button>
// //                     </div>
// //                     <form onSubmit={handleSubmit} className="p-6 space-y-4">
// //                         <div className="grid md:grid-cols-2 gap-4">
// //                             <div className="col-span-2">
// //                                 <label className="block text-xs font-bold text-gray-500 mb-1">Judul Buku</label>
// //                                 <input required className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 outline-none" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Contoh: Pedoman PPGD" aria-label="Judul Buku"/>
// //                             </div>
// //                             <div>
// //                                 <label className="block text-xs font-bold text-gray-500 mb-1">Kategori</label>
                                
// //                                 {/* FIX SELECT NAME: Added aria-label */}
// //                                 <select 
// //                                     className="w-full border rounded-lg px-3 py-2 text-sm bg-white" 
// //                                     value={formData.category} 
// //                                     onChange={e => setFormData({...formData, category: e.target.value})}
// //                                     aria-label="Pilih Kategori Buku"
// //                                 >
// //                                     {cmsCategories.map(c => <option key={c} value={c}>{c}</option>)}
// //                                 </select>
// //                             </div>
// //                             <div>
// //                                 <label className="block text-xs font-bold text-gray-500 mb-1">Tahun Terbit</label>
// //                                 <input className="w-full border rounded-lg px-3 py-2 text-sm" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} placeholder="2025" aria-label="Tahun Terbit"/>
// //                             </div>
// //                             <div className="col-span-2">
// //                                 <label className="block text-xs font-bold text-gray-500 mb-1">Penulis / Penerbit</label>
// //                                 <input className="w-full border rounded-lg px-3 py-2 text-sm" value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} placeholder="Nama Penulis" aria-label="Nama Penulis"/>
// //                             </div>
// //                             <div className="col-span-2">
// //                                 <label className="block text-xs font-bold text-gray-500 mb-1">Deskripsi Singkat</label>
// //                                 <textarea rows={2} className="w-full border rounded-lg px-3 py-2 text-sm" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Deskripsi isi buku..." aria-label="Deskripsi Buku"/>
// //                             </div>

// //                             {/* UPLOAD FILE */}
// //                             <div className="border-2 border-dashed border-blue-200 bg-blue-50 p-4 rounded-xl text-center">
// //                                 <label className="block text-xs font-bold text-blue-800 mb-2">File Dokumen (PDF)</label>
// //                                 {formData.fileUrl ? (
// //                                     <div className="text-xs text-green-600 font-bold flex items-center justify-center gap-1">
// //                                         ✓ File Terupload 
// //                                         <button type="button" onClick={() => setFormData({...formData, fileUrl: ''})} className="text-red-500 ml-2 hover:underline" aria-label="Hapus File Terupload">Hapus</button>
// //                                     </div>
// //                                 ) : (
// //                                     <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-700 inline-flex items-center gap-2">
// //                                         <UploadCloud size={14}/> {uploadingFile ? 'Mengupload...' : 'Pilih File PDF'}
// //                                         <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={(e) => handleUpload(e, 'fileUrl')} disabled={uploadingFile} aria-label="Upload File PDF"/>
// //                                     </label>
// //                                 )}
// //                             </div>

// //                             {/* UPLOAD COVER */}
// //                             <div className="border-2 border-dashed border-gray-200 bg-gray-50 p-4 rounded-xl text-center flex flex-col items-center justify-center relative">
// //                                 <label className="block text-xs font-bold text-gray-500 mb-2">Cover Buku (Gambar)</label>
// //                                 {formData.coverUrl ? (
// //                                     <div className="relative group">
// //                                         <img src={getImageUrl(formData.coverUrl)} className="h-20 w-auto rounded shadow-sm" alt="preview"/>
// //                                         {/* FIX BUTTON NAME: Added aria-label */}
// //                                         <button 
// //                                             type="button" 
// //                                             onClick={() => setFormData({...formData, coverUrl: ''})} 
// //                                             className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition"
// //                                             aria-label="Hapus Cover Buku"
// //                                         >
// //                                             <X size={12}/>
// //                                         </button>
// //                                     </div>
// //                                 ) : (
// //                                     <label className="cursor-pointer bg-white border border-gray-300 text-gray-600 px-4 py-2 rounded-lg text-xs font-bold hover:bg-gray-100 inline-flex items-center gap-2">
// //                                         <UploadCloud size={14}/> {uploadingCover ? '...' : 'Upload Cover'}
// //                                         <input type="file" accept="image/*" className="hidden" onChange={(e) => handleUpload(e, 'coverUrl')} disabled={uploadingCover} aria-label="Upload Gambar Cover"/>
// //                                     </label>
// //                                 )}
// //                             </div>
// //                         </div>
                        
// //                         <div className="pt-4 border-t flex justify-end gap-3">
// //                             <button type="button" onClick={closeModal} className="px-5 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl font-bold text-sm" aria-label="Batal">Batal</button>
// //                             <button type="submit" disabled={uploadingFile} className="px-6 py-2.5 bg-red-700 text-white hover:bg-red-800 rounded-xl font-bold text-sm disabled:opacity-50" aria-label="Simpan Data Buku">
// //                                 {isEditing ? 'Simpan Perubahan' : 'Terbitkan Buku'}
// //                             </button>
// //                         </div>
// //                     </form>
// //                 </div>
// //             </div>
// //         )}

// //       </div>
// //     </Protected>
// //   );
// // }
// 'use client';

// import { useState, useEffect } from 'react';
// import { api, apiUpload, getImageUrl } from '@/lib/api';
// import Protected from '@/components/Protected';
// import { Plus, Pencil, Trash2, FileText, X, UploadCloud, Book as BookIcon, Send, CheckCircle } from 'lucide-react';

// export default function AdminLibraryPage() {
//   const [books, setBooks] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [cmsCategories, setCmsCategories] = useState<string[]>(['General']);
  
//   // MODAL STATE
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editId, setEditId] = useState('');
  
//   // FORM STATE
//   const [formData, setFormData] = useState({
//       title: '', description: '', category: '', 
//       author: '', year: '', 
//       fileUrl: '', coverUrl: ''
//   });
  
//   // UPLOAD LOADING STATE
//   const [uploadingFile, setUploadingFile] = useState(false);
//   const [uploadingCover, setUploadingCover] = useState(false);
//   // PUBLISH LOADING STATE
//   const [publishingId, setPublishingId] = useState<string | null>(null);

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     try {
//         setLoading(true);
//         // 1. Load Kategori
//         const content = await api('/api/content');
//         if (content?.libraryCategories?.length > 0) {
//             setCmsCategories(content.libraryCategories);
//             setFormData(p => ({...p, category: content.libraryCategories[0]}));
//         }

//         // 2. Load Buku (Status 'all' handled by backend logic or just fetch all for admin)
//         // Kita bisa tambahkan query param ?status=all jika backend mendukung filter khusus admin
//         // Di backend script yang saya buat, jika tidak ada status, dia return published. 
//         // Admin perlu melihat semua (draft & published).
//         // Jadi di backend library.ts perlu diupdate sedikit di bagian GET / atau admin panggil dengan ?status=all
//         // Asumsi backend script di atas sudah kita sesuaikan:
//         // -> const { status } = req.query; if(status) filter.status = status;
//         // Maka admin fetch dua kali atau fetch 'all' jika backend support.
//         // Solusi simpel: Fetch semua buku tanpa filter status di backend untuk admin, atau buat endpoint khusus admin.
//         // Untuk script ini, kita panggil endpoint utama, backend perlu diupdate agar admin bisa lihat semua.
//         // UPDATE BACKEND LOGIC: Jika user adalah admin, abaikan filter status default 'published'.
        
//         // Versi sederhana: Admin melihat semua buku
//         // Kita panggil dengan param ?status=all (pastikan backend handle logic 'all' -> hapus filter status)
//         const bookData = await api('/api/library?status=all'); 
//         setBooks(Array.isArray(bookData) ? bookData : bookData.books || []);
//     } catch (e) { console.error(e); } finally { setLoading(false); }
//   };

//   const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'fileUrl' | 'coverUrl') => {
//       if (!e.target.files?.[0]) return;
      
//       const isFile = field === 'fileUrl';
//       if(isFile) setUploadingFile(true); else setUploadingCover(true);

//       try {
//           const fd = new FormData();
//           fd.append('file', e.target.files[0]);
//           const res = await apiUpload('/api/upload', fd);
//           const url = res.url || res.file?.url;
//           setFormData(prev => ({ ...prev, [field]: url }));
//       } catch (e: any) { alert("Upload Gagal: " + e.message); } 
//       finally { if(isFile) setUploadingFile(false); else setUploadingCover(false); }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//       e.preventDefault();
//       if(!formData.fileUrl) return alert("Wajib upload file dokumen/PDF!");

//       try {
//           if (isEditing) {
//               await api(`/api/library/${editId}`, { method: 'PATCH', body: formData });
//               alert("Buku diperbarui!");
//           } else {
//               await api('/api/library', { method: 'POST', body: formData });
//               alert("Buku ditambahkan sebagai Draft!");
//           }
//           closeModal();
//           loadData();
//       } catch (e: any) { alert("Gagal: " + e.message); }
//   };

//   // --- FITUR UTAMA: PUBLISH & BLAST ---
//   const handlePublish = async (bookId: string, bookTitle: string) => {
//       if(!confirm(`Publikasikan "${bookTitle}"? \n\nIni akan mengirim notifikasi ke SELURUH USER.`)) return;
      
//       try {
//           setPublishingId(bookId);
//           await api(`/api/library/${bookId}/publish`, { method: 'PATCH' });
//           alert("Berhasil! Buku Live & Notifikasi dikirim.");
//           loadData(); // Refresh list
//       } catch (e: any) {
//           alert("Gagal publish: " + e.message);
//       } finally {
//           setPublishingId(null);
//       }
//   };

//   const handleDelete = async (id: string) => {
//       if(!confirm("Hapus buku ini?")) return;
//       try {
//           await api(`/api/library/${id}`, { method: 'DELETE' });
//           loadData();
//       } catch (e: any) { alert(e.message); }
//   };

//   const openEdit = (book: any) => {
//       setFormData({
//           title: book.title, description: book.description, category: book.category,
//           author: book.author, year: book.year, fileUrl: book.fileUrl, coverUrl: book.coverUrl
//       });
//       setEditId(book._id);
//       setIsEditing(true);
//       setIsModalOpen(true);
//   };

//   const closeModal = () => {
//       setIsModalOpen(false);
//       setIsEditing(false);
//       setFormData({ title: '', description: '', category: cmsCategories[0] || 'General', author: '', year: '', fileUrl: '', coverUrl: '' });
//   };

//   return (
//     <Protected roles={['SUPER_ADMIN', 'FACILITATOR']}>
//       <div className="max-w-7xl mx-auto p-6 font-sans">
        
//         {/* HEADER */}
//         <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
//             <div>
//                 <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
//                     <BookIcon className="text-red-700"/> Manajemen Perpustakaan
//                 </h1>
//                 <p className="text-gray-500 text-sm mt-1">Kelola buku, modul, dan referensi digital.</p>
//             </div>
//             <button 
//                 onClick={() => setIsModalOpen(true)} 
//                 className="bg-red-700 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-red-800 transition flex items-center gap-2 shadow-lg shadow-red-100"
//                 aria-label="Tambah Buku Baru"
//             >
//                 <Plus size={20}/> Tambah Buku
//             </button>
//         </div>

//         {/* LIST BUKU ADMIN (Landscape agar detail status terlihat) */}
//         {loading ? <div className="text-center py-20">Memuat...</div> : 
//          books.length === 0 ? <div className="text-center py-20 bg-gray-50 rounded-xl border-dashed border-2">Belum ada buku.</div> : 
//          <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
//             <table className="w-full text-left">
//                 <thead className="bg-gray-50 border-b">
//                     <tr>
//                         <th className="p-4 text-xs font-bold text-gray-500 uppercase">Cover</th>
//                         <th className="p-4 text-xs font-bold text-gray-500 uppercase">Info Buku</th>
//                         <th className="p-4 text-xs font-bold text-gray-500 uppercase">Status</th>
//                         <th className="p-4 text-xs font-bold text-gray-500 uppercase text-right">Aksi</th>
//                     </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-100">
//                     {books.map(book => (
//                         <tr key={book._id} className="hover:bg-gray-50 transition-colors">
//                             <td className="p-4 w-20 align-top">
//                                 <div className="w-12 h-16 bg-gray-200 rounded overflow-hidden shadow-sm">
//                                     {book.coverUrl ? (
//                                         <img src={getImageUrl(book.coverUrl)} className="w-full h-full object-cover" alt="cover"/>
//                                     ) : (
//                                         <div className="flex items-center justify-center h-full text-gray-400"><FileText size={16}/></div>
//                                     )}
//                                 </div>
//                             </td>
//                             <td className="p-4 align-top">
//                                 <div className="font-bold text-gray-800 text-sm mb-1">{book.title}</div>
//                                 <div className="text-xs text-gray-500 mb-1">{book.author} • {book.year}</div>
//                                 <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase">{book.category}</span>
//                             </td>
//                             <td className="p-4 align-top">
//                                 <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1 ${book.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
//                                     {book.status === 'published' ? <CheckCircle size={10}/> : null}
//                                     {book.status || 'Draft'}
//                                 </span>
//                             </td>
//                             <td className="p-4 text-right align-top">
//                                 <div className="flex justify-end gap-2">
//                                     {/* TOMBOL PUBLISH */}
//                                     {book.status !== 'published' && (
//                                         <button 
//                                             onClick={() => handlePublish(book._id, book.title)}
//                                             disabled={publishingId === book._id}
//                                             className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg text-xs font-bold flex items-center gap-2 transition disabled:opacity-50"
//                                             title="Publish & Blast Notif"
//                                             aria-label={`Publish buku ${book.title}`}
//                                         >
//                                             {publishingId === book._id ? 'Sending...' : <><Send size={14}/> Publish</>}
//                                         </button>
//                                     )}

//                                     <button 
//                                         onClick={() => openEdit(book)} 
//                                         className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-amber-100 hover:text-amber-600 transition"
//                                         aria-label={`Edit buku ${book.title}`}
//                                     >
//                                         <Pencil size={16}/>
//                                     </button>
                                    
//                                     <button 
//                                         onClick={() => handleDelete(book._id)} 
//                                         className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-red-100 hover:text-red-600 transition"
//                                         aria-label={`Hapus buku ${book.title}`}
//                                     >
//                                         <Trash2 size={16}/>
//                                     </button>
//                                 </div>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//          </div>
//         }

//         {/* MODAL FORM */}
//         {isModalOpen && (
//             <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
//                 <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
//                     <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center sticky top-0 z-10">
//                         <h2 className="text-lg font-bold">{isEditing ? 'Edit Buku' : 'Tambah Buku Baru'}</h2>
//                         <button onClick={closeModal} aria-label="Tutup Modal">
//                             <X className="text-gray-400 hover:text-red-600"/>
//                         </button>
//                     </div>
//                     <form onSubmit={handleSubmit} className="p-6 space-y-4">
//                         <div className="grid md:grid-cols-2 gap-4">
//                             <div className="col-span-2">
//                                 <label className="block text-xs font-bold text-gray-500 mb-1">Judul Buku</label>
//                                 <input required className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 outline-none" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Contoh: Pedoman PPGD" aria-label="Judul Buku"/>
//                             </div>
//                             {/* ... (Sisa form sama seperti script Anda sebelumnya, pastikan pakai aria-label) ... */}
//                             {/* Saya sertakan bagian Upload agar lengkap */}
//                             <div>
//                                 <label className="block text-xs font-bold text-gray-500 mb-1">Kategori</label>
//                                 <select className="w-full border rounded-lg px-3 py-2 text-sm bg-white" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} aria-label="Kategori">
//                                     {cmsCategories.map(c => <option key={c} value={c}>{c}</option>)}
//                                 </select>
//                             </div>
//                             <div>
//                                 <label className="block text-xs font-bold text-gray-500 mb-1">Tahun</label>
//                                 <input className="w-full border rounded-lg px-3 py-2 text-sm" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} placeholder="2025" aria-label="Tahun"/>
//                             </div>
//                             <div className="col-span-2">
//                                 <label className="block text-xs font-bold text-gray-500 mb-1">Penulis</label>
//                                 <input className="w-full border rounded-lg px-3 py-2 text-sm" value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} placeholder="Nama Penulis" aria-label="Penulis"/>
//                             </div>
//                             <div className="col-span-2">
//                                 <label className="block text-xs font-bold text-gray-500 mb-1">Deskripsi</label>
//                                 <textarea rows={2} className="w-full border rounded-lg px-3 py-2 text-sm" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Deskripsi isi buku..." aria-label="Deskripsi"/>
//                             </div>

//                             {/* UPLOAD FILE */}
//                             <div className="border-2 border-dashed border-blue-200 bg-blue-50 p-4 rounded-xl text-center">
//                                 <label className="block text-xs font-bold text-blue-800 mb-2">File PDF</label>
//                                 {formData.fileUrl ? (
//                                     <div className="text-xs text-green-600 font-bold flex items-center justify-center gap-1">
//                                         ✓ File Siap <button type="button" onClick={() => setFormData({...formData, fileUrl: ''})} className="text-red-500 ml-2 hover:underline">Hapus</button>
//                                     </div>
//                                 ) : (
//                                     <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-700 inline-flex items-center gap-2">
//                                         <UploadCloud size={14}/> {uploadingFile ? '...' : 'Upload PDF'}
//                                         <input type="file" accept=".pdf" className="hidden" onChange={(e) => handleUpload(e, 'fileUrl')} disabled={uploadingFile}/>
//                                     </label>
//                                 )}
//                             </div>

//                             {/* UPLOAD COVER */}
//                             <div className="border-2 border-dashed border-gray-200 bg-gray-50 p-4 rounded-xl text-center flex flex-col items-center justify-center relative">
//                                 <label className="block text-xs font-bold text-gray-500 mb-2">Cover</label>
//                                 {formData.coverUrl ? (
//                                     <div className="relative group">
//                                         <img src={getImageUrl(formData.coverUrl)} className="h-20 w-auto rounded shadow-sm" alt="preview"/>
//                                         <button type="button" onClick={() => setFormData({...formData, coverUrl: ''})} className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition"><X size={12}/></button>
//                                     </div>
//                                 ) : (
//                                     <label className="cursor-pointer bg-white border border-gray-300 text-gray-600 px-4 py-2 rounded-lg text-xs font-bold hover:bg-gray-100 inline-flex items-center gap-2">
//                                         <UploadCloud size={14}/> {uploadingCover ? '...' : 'Upload Img'}
//                                         <input type="file" accept="image/*" className="hidden" onChange={(e) => handleUpload(e, 'coverUrl')} disabled={uploadingCover}/>
//                                     </label>
//                                 )}
//                             </div>
//                         </div>
                        
//                         <div className="pt-4 border-t flex justify-end gap-3">
//                             <button type="button" onClick={closeModal} className="px-5 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl font-bold text-sm">Batal</button>
//                             <button type="submit" disabled={uploadingFile} className="px-6 py-2.5 bg-red-700 text-white hover:bg-red-800 rounded-xl font-bold text-sm disabled:opacity-50">
//                                 {isEditing ? 'Simpan' : 'Simpan Draft'}
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         )}

//       </div>
//     </Protected>
//   );
// }
'use client';

import { useState, useEffect } from 'react';
import { api, apiUpload, getImageUrl } from '@/lib/api';
import Protected from '@/components/Protected';
import { Plus, Pencil, Trash2, FileText, X, UploadCloud, Book as BookIcon, Send, CheckCircle } from 'lucide-react';

export default function AdminLibraryPage() {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [cmsCategories, setCmsCategories] = useState<string[]>(['General']);
  
  // MODAL STATE
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState('');
  
  // FORM STATE
  const [formData, setFormData] = useState({
      title: '', description: '', category: '', 
      author: '', year: '', 
      fileUrl: '', coverUrl: ''
  });
  
  const [uploadingFile, setUploadingFile] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [publishingId, setPublishingId] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
        setLoading(true);
        // 1. Load Kategori
        const content = await api('/api/content');
        if (content?.libraryCategories?.length > 0) {
            setCmsCategories(content.libraryCategories);
            setFormData(p => ({...p, category: content.libraryCategories[0]}));
        }

        // 2. Load Buku (Status All untuk Admin)
        const bookData = await api('/api/library?status=all'); 
        setBooks(Array.isArray(bookData) ? bookData : bookData.books || []);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'fileUrl' | 'coverUrl') => {
      if (!e.target.files?.[0]) return;
      const isFile = field === 'fileUrl';
      if(isFile) setUploadingFile(true); else setUploadingCover(true);

      try {
          const fd = new FormData();
          fd.append('file', e.target.files[0]);
          const res = await apiUpload('/api/upload', fd);
          const url = res.url || res.file?.url;
          setFormData(prev => ({ ...prev, [field]: url }));
      } catch (e: any) { alert("Upload Gagal: " + e.message); } 
      finally { if(isFile) setUploadingFile(false); else setUploadingCover(false); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if(!formData.fileUrl) return alert("Wajib upload file dokumen/PDF!");

      try {
          if (isEditing) {
              await api(`/api/library/${editId}`, { method: 'PATCH', body: formData });
              alert("Buku diperbarui!");
          } else {
              await api('/api/library', { method: 'POST', body: formData });
              alert("Buku ditambahkan sebagai Draft!");
          }
          closeModal();
          loadData();
      } catch (e: any) { alert("Gagal: " + e.message); }
  };

  const handlePublish = async (bookId: string, bookTitle: string) => {
      if(!confirm(`Publikasikan "${bookTitle}"? \n\nIni akan mengirim notifikasi ke SELURUH USER.`)) return;
      try {
          setPublishingId(bookId);
          await api(`/api/library/${bookId}/publish`, { method: 'PATCH' });
          alert("Berhasil! Buku Live & Notifikasi dikirim.");
          loadData(); 
      } catch (e: any) { alert("Gagal publish: " + e.message); } 
      finally { setPublishingId(null); }
  };

  const handleDelete = async (id: string) => {
      if(!confirm("Hapus buku ini?")) return;
      try {
          await api(`/api/library/${id}`, { method: 'DELETE' });
          loadData();
      } catch (e: any) { alert(e.message); }
  };

  const openEdit = (book: any) => {
      setFormData({
          title: book.title, description: book.description, category: book.category,
          author: book.author, year: book.year, fileUrl: book.fileUrl, coverUrl: book.coverUrl
      });
      setEditId(book._id);
      setIsEditing(true);
      setIsModalOpen(true);
  };

  const closeModal = () => {
      setIsModalOpen(false);
      setIsEditing(false);
      setFormData({ title: '', description: '', category: cmsCategories[0] || 'General', author: '', year: '', fileUrl: '', coverUrl: '' });
  };

  return (
    <Protected roles={['SUPER_ADMIN', 'FACILITATOR']}>
      <div className="max-w-7xl mx-auto p-6 font-sans">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div>
                <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <BookIcon className="text-red-700"/> Manajemen Perpustakaan
                </h1>
                <p className="text-gray-500 text-sm mt-1">Kelola buku, modul, dan referensi digital.</p>
            </div>
            <button 
                onClick={() => setIsModalOpen(true)} 
                className="bg-red-700 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-red-800 transition flex items-center gap-2 shadow-lg shadow-red-100"
                aria-label="Tambah Buku Baru"
            >
                <Plus size={20}/> Tambah Buku
            </button>
        </div>

        {/* LIST BUKU ADMIN */}
        {loading ? <div className="text-center py-20">Memuat...</div> : 
         books.length === 0 ? <div className="text-center py-20 bg-gray-50 rounded-xl border-dashed border-2">Belum ada buku.</div> : 
         <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
            <table className="w-full text-left">
                <thead className="bg-gray-50 border-b">
                    <tr>
                        <th className="p-4 text-xs font-bold text-gray-500 uppercase">Cover</th>
                        <th className="p-4 text-xs font-bold text-gray-500 uppercase">Info Buku</th>
                        <th className="p-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                        <th className="p-4 text-xs font-bold text-gray-500 uppercase text-right">Aksi</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {books.map(book => (
                        <tr key={book._id} className="hover:bg-gray-50 transition-colors">
                            <td className="p-4 w-20 align-top">
                                <div className="w-12 h-16 bg-gray-200 rounded overflow-hidden shadow-sm">
                                    {book.coverUrl ? (
                                        <img src={getImageUrl(book.coverUrl)} className="w-full h-full object-cover" alt="cover"/>
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-gray-400"><FileText size={16}/></div>
                                    )}
                                </div>
                            </td>
                            <td className="p-4 align-top">
                                <div className="font-bold text-gray-800 text-sm mb-1">{book.title}</div>
                                <div className="text-xs text-gray-500 mb-1">{book.author} • {book.year}</div>
                                <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase">{book.category}</span>
                            </td>
                            <td className="p-4 align-top">
                                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1 ${book.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                    {book.status === 'published' ? <CheckCircle size={10}/> : null}
                                    {book.status || 'Draft'}
                                </span>
                            </td>
                            <td className="p-4 text-right align-top">
                                <div className="flex justify-end gap-2">
                                    {book.status !== 'published' && (
                                        <button 
                                            onClick={() => handlePublish(book._id, book.title)}
                                            disabled={publishingId === book._id}
                                            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg text-xs font-bold flex items-center gap-2 transition disabled:opacity-50"
                                            title="Publish & Blast Notif"
                                            aria-label={`Publikasikan buku ${book.title}`}
                                        >
                                            {publishingId === book._id ? '...' : <><Send size={14}/> Publish</>}
                                        </button>
                                    )}

                                    <button 
                                        onClick={() => openEdit(book)} 
                                        className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-amber-100 hover:text-amber-600 transition"
                                        aria-label={`Edit buku ${book.title}`}
                                    >
                                        <Pencil size={16}/>
                                    </button>
                                    
                                    <button 
                                        onClick={() => handleDelete(book._id)} 
                                        className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-red-100 hover:text-red-600 transition"
                                        aria-label={`Hapus buku ${book.title}`}
                                    >
                                        <Trash2 size={16}/>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
         </div>
        }

        {/* MODAL FORM */}
        {isModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
                    <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center sticky top-0 z-10">
                        <h2 className="text-lg font-bold">{isEditing ? 'Edit Buku' : 'Tambah Buku Baru'}</h2>
                        <button onClick={closeModal} aria-label="Tutup Modal">
                            <X className="text-gray-400 hover:text-red-600"/>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <label className="block text-xs font-bold text-gray-500 mb-1">Judul Buku</label>
                                <input required className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 outline-none" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Contoh: Pedoman PPGD" aria-label="Judul Buku"/>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1">Kategori</label>
                                <select className="w-full border rounded-lg px-3 py-2 text-sm bg-white" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} aria-label="Pilih Kategori">
                                    {cmsCategories.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1">Tahun</label>
                                <input className="w-full border rounded-lg px-3 py-2 text-sm" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} placeholder="2025" aria-label="Tahun Terbit"/>
                            </div>
                            <div className="col-span-2">
                                <label className="block text-xs font-bold text-gray-500 mb-1">Penulis</label>
                                <input className="w-full border rounded-lg px-3 py-2 text-sm" value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} placeholder="Nama Penulis" aria-label="Nama Penulis"/>
                            </div>
                            <div className="col-span-2">
                                <label className="block text-xs font-bold text-gray-500 mb-1">Deskripsi</label>
                                <textarea rows={2} className="w-full border rounded-lg px-3 py-2 text-sm" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Deskripsi isi buku..." aria-label="Deskripsi Buku"/>
                            </div>

                            {/* UPLOAD FILE */}
                            <div className="border-2 border-dashed border-blue-200 bg-blue-50 p-4 rounded-xl text-center">
                                <label className="block text-xs font-bold text-blue-800 mb-2">File PDF</label>
                                {formData.fileUrl ? (
                                    <div className="text-xs text-green-600 font-bold flex items-center justify-center gap-1">
                                        ✓ File Siap <button type="button" onClick={() => setFormData({...formData, fileUrl: ''})} className="text-red-500 ml-2 hover:underline" aria-label="Hapus File">Hapus</button>
                                    </div>
                                ) : (
                                    <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-700 inline-flex items-center gap-2">
                                        <UploadCloud size={14}/> {uploadingFile ? '...' : 'Upload PDF'}
                                        <input type="file" accept=".pdf" className="hidden" onChange={(e) => handleUpload(e, 'fileUrl')} disabled={uploadingFile} aria-label="Upload File PDF"/>
                                    </label>
                                )}
                            </div>

                            {/* UPLOAD COVER */}
                            <div className="border-2 border-dashed border-gray-200 bg-gray-50 p-4 rounded-xl text-center flex flex-col items-center justify-center relative">
                                <label className="block text-xs font-bold text-gray-500 mb-2">Cover</label>
                                {formData.coverUrl ? (
                                    <div className="relative group">
                                        <img src={getImageUrl(formData.coverUrl)} className="h-20 w-auto rounded shadow-sm" alt="preview"/>
                                        <button type="button" onClick={() => setFormData({...formData, coverUrl: ''})} className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition" aria-label="Hapus Cover"><X size={12}/></button>
                                    </div>
                                ) : (
                                    <label className="cursor-pointer bg-white border border-gray-300 text-gray-600 px-4 py-2 rounded-lg text-xs font-bold hover:bg-gray-100 inline-flex items-center gap-2">
                                        <UploadCloud size={14}/> {uploadingCover ? '...' : 'Upload Img'}
                                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleUpload(e, 'coverUrl')} disabled={uploadingCover} aria-label="Upload Gambar Cover"/>
                                    </label>
                                )}
                            </div>
                        </div>
                        
                        <div className="pt-4 border-t flex justify-end gap-3">
                            <button type="button" onClick={closeModal} className="px-5 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl font-bold text-sm" aria-label="Batal">Batal</button>
                            <button type="submit" disabled={uploadingFile} className="px-6 py-2.5 bg-red-700 text-white hover:bg-red-800 rounded-xl font-bold text-sm disabled:opacity-50" aria-label="Simpan">
                                {isEditing ? 'Simpan' : 'Simpan Draft'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}

      </div>
    </Protected>
  );
}
// // // // // // 'use client';

// // // // // // import { useState, useEffect } from 'react';
// // // // // // import { api, getImageUrl, apiUpload } from '@/lib/api';
// // // // // // import Protected from '@/components/Protected';
// // // // // // import Link from 'next/link';
// // // // // // import { Plus, Pencil, Trash2, Settings, Send, CheckCircle, BellRing, FileText } from 'lucide-react';

// // // // // // export default function CourseManagementPage() {
// // // // // //   const [courses, setCourses] = useState<any[]>([]);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [publishingId, setPublishingId] = useState<string | null>(null);
  
// // // // // //   // State Modal & Form
// // // // // //   const [isModalOpen, setIsModalOpen] = useState(false);
// // // // // //   const [isEditing, setIsEditing] = useState(false);
// // // // // //   const [currentId, setCurrentId] = useState('');
// // // // // //   const [formData, setFormData] = useState({
// // // // // //     title: '', description: '', category: 'Health', programType: 'training',
// // // // // //     price: 0, thumbnailUrl: '', isPublished: false
// // // // // //   });
// // // // // //   const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

// // // // // //   useEffect(() => { loadCourses(); }, []);

// // // // // //   const loadCourses = async () => {
// // // // // //     try {
// // // // // //       setLoading(true);
// // // // // //       const res = await api('/api/courses/admin/all'); 
// // // // // //       setCourses(res.courses || []);
// // // // // //     } catch (e) { console.error(e); } finally { setLoading(false); }
// // // // // //   };

// // // // // //   // --- LOGIKA BLASTING ---
// // // // // //   const handlePublish = async (course: any) => {
// // // // // //       const isDraft = !course.isPublished;
// // // // // //       const msg = isDraft 
// // // // // //         ? `Publikasikan "${course.title}"? \n\nNotifikasi akan dikirim ke SELURUH USER.`
// // // // // //         : `Kirim ULANG Notifikasi untuk "${course.title}"?`;

// // // // // //       if(!confirm(msg)) return;

// // // // // //       try {
// // // // // //           setPublishingId(course._id);
// // // // // //           await api(`/api/courses/${course._id}/publish`, { method: 'PATCH' });
// // // // // //           alert("Berhasil! Notifikasi terkirim.");
// // // // // //           loadCourses();
// // // // // //       } catch (e: any) { alert("Gagal: " + e.message); } 
// // // // // //       finally { setPublishingId(null); }
// // // // // //   };

// // // // // //   const handleOpenModal = (course?: any) => {
// // // // // //     if (course) {
// // // // // //       setIsEditing(true); setCurrentId(course._id);
// // // // // //       setFormData({
// // // // // //         title: course.title, description: course.description, category: course.category,
// // // // // //         programType: course.programType || 'training', price: course.price || 0,
// // // // // //         thumbnailUrl: course.thumbnailUrl, isPublished: course.isPublished
// // // // // //       });
// // // // // //     } else {
// // // // // //       setIsEditing(false);
// // // // // //       setFormData({ title: '', description: '', category: 'Health', programType: 'training', price: 0, thumbnailUrl: '', isPublished: false });
// // // // // //     }
// // // // // //     setThumbnailFile(null); setIsModalOpen(true);
// // // // // //   };

// // // // // //   const handleSubmit = async (e: React.FormEvent) => {
// // // // // //     e.preventDefault();
// // // // // //     try {
// // // // // //       let finalThumbnailUrl = formData.thumbnailUrl;
// // // // // //       if (thumbnailFile) {
// // // // // //         const uploadData = new FormData(); uploadData.append('file', thumbnailFile);
// // // // // //         const uploadRes = await apiUpload('/api/upload', uploadData);
// // // // // //         finalThumbnailUrl = uploadRes.url || uploadRes.file.url;
// // // // // //       }
// // // // // //       const payload = { ...formData, thumbnailUrl: finalThumbnailUrl };
// // // // // //       if (isEditing) await api(`/api/courses/${currentId}`, { method: 'PUT', body: payload });
// // // // // //       else await api('/api/courses', { method: 'POST', body: payload });

// // // // // //       setIsModalOpen(false); loadCourses();
// // // // // //       alert(`Kursus berhasil ${isEditing ? 'diperbarui' : 'dibuat'}!`);
// // // // // //     } catch (error: any) { alert("Gagal menyimpan: " + error.message); }
// // // // // //   };

// // // // // //   const handleDelete = async (id: string) => {
// // // // // //     if(!confirm("Yakin hapus?")) return;
// // // // // //     try { await api(`/api/courses/${id}`, { method: 'DELETE' }); loadCourses(); } catch(e: any) { alert(e.message); }
// // // // // //   };

// // // // // //   const formatRupiah = (num: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);

// // // // // //   if (loading) return <div className="p-20 text-center">Memuat...</div>;

// // // // // //   return (
// // // // // //     <Protected roles={['FACILITATOR', 'SUPER_ADMIN']}>
// // // // // //       <div className="max-w-7xl mx-auto p-6 min-h-screen pb-20">
// // // // // //         <div className="flex justify-between items-center mb-8 border-b pb-4">
// // // // // //           <div><h1 className="text-2xl font-bold text-gray-800">Manajemen Pelatihan</h1><p className="text-gray-500 text-sm">Kelola kursus atau pelatihan.</p></div>
// // // // // //           <button onClick={() => handleOpenModal()} className="bg-red-700 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-red-800 flex items-center gap-2"><span>+</span> Buat Baru</button>
// // // // // //         </div>

// // // // // //         <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
// // // // // //           <table className="w-full text-left text-sm">
// // // // // //             <thead className="bg-gray-50 border-b text-gray-700 uppercase text-xs tracking-wider">
// // // // // //               <tr><th className="p-4 w-24">Cover</th><th className="p-4">Judul & Info</th><th className="p-4">Kategori</th><th className="p-4">Biaya</th><th className="p-4 text-center">Status</th><th className="p-4 text-center">Aksi</th></tr>
// // // // // //             </thead>
// // // // // //             <tbody className="divide-y divide-gray-100">
// // // // // //               {courses.length === 0 ? <tr><td colSpan={6} className="p-10 text-center text-gray-400">Belum ada data.</td></tr> :
// // // // // //                   courses.map(course => (
// // // // // //                     <tr key={course._id} className="hover:bg-gray-50 transition-colors">
// // // // // //                       <td className="p-4"><img src={getImageUrl(course.thumbnailUrl)} className="w-16 h-10 object-cover rounded bg-gray-200 border" alt="Cover"/></td>
// // // // // //                       <td className="p-4"><p className="font-bold text-gray-800 line-clamp-1">{course.title}</p><span className="text-[10px] px-2 py-0.5 rounded font-bold uppercase bg-blue-100 text-blue-700">{course.programType}</span></td>
// // // // // //                       <td className="p-4 text-gray-600">{course.category}</td>
// // // // // //                       <td className="p-4 font-bold text-gray-700">{course.price === 0 ? <span className="text-green-600">Gratis</span> : formatRupiah(course.price)}</td>
// // // // // //                       <td className="p-4 text-center"><span className={`px-2 py-1 rounded-full text-xs font-bold ${course.isPublished ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{course.isPublished ? 'Published' : 'Draft'}</span></td>
                      
// // // // // //                       <td className="p-4 flex justify-center gap-2">
// // // // // //                         {/* TOMBOL KELOLA MODUL */}
// // // // // //                         <Link href={`/admin/courses/${course._id}`} className="p-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 text-xs font-bold border border-gray-300 flex items-center gap-1" title="Kelola Modul"><Settings size={14}/> Kelola Modul</Link>
                        
// // // // // //                         {/* TOMBOL PUBLISH / BLAST */}
// // // // // //                         <button 
// // // // // //                             onClick={() => handlePublish(course)}
// // // // // //                             disabled={publishingId === course._id}
// // // // // //                             className={`p-2 rounded flex items-center gap-2 text-white transition disabled:opacity-50
// // // // // //                                 ${course.isPublished ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
// // // // // //                             title={course.isPublished ? "Kirim Ulang Notifikasi" : "Publikasi & Kirim Notifikasi"}
// // // // // //                             aria-label={course.isPublished ? "Kirim Ulang Notifikasi" : "Publikasi"}
// // // // // //                         >
// // // // // //                             {publishingId === course._id ? '...' : (
// // // // // //                                 <>{course.isPublished ? <BellRing size={16}/> : <Send size={16}/>}</>
// // // // // //                             )}
// // // // // //                         </button>

// // // // // //                         <button onClick={() => handleOpenModal(course)} className="p-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 border border-blue-200" title="Edit" aria-label="Edit Pelatihan"><Pencil size={16}/></button>
// // // // // //                         <button onClick={() => handleDelete(course._id)} className="p-2 bg-red-50 text-red-600 rounded hover:bg-red-100 border border-red-200" title="Hapus" aria-label="Hapus Pelatihan"><Trash2 size={16}/></button>
// // // // // //                       </td>
// // // // // //                     </tr>
// // // // // //                   ))
// // // // // //               }
// // // // // //             </tbody>
// // // // // //           </table>
// // // // // //         </div>

// // // // // //         {/* MODAL FORM */}
// // // // // //         {isModalOpen && (
// // // // // //           <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
// // // // // //             <div className="bg-white p-6 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
// // // // // //               <div className="flex justify-between items-center mb-6 border-b pb-4">
// // // // // //                   <h2 className="text-xl font-bold text-gray-800">{isEditing ? 'Edit Pelatihan' : 'Buat Pelatihan Baru'}</h2>
// // // // // //                   <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold" aria-label="Tutup Modal">✕</button>
// // // // // //               </div>
// // // // // //               <form onSubmit={handleSubmit} className="space-y-5">
                
// // // // // //                 {/* 1. INPUT JUDUL - FIX A11Y: Added aria-label */}
// // // // // //                 <div>
// // // // // //                     <label className="block text-sm font-bold text-gray-700 mb-1">Judul</label>
// // // // // //                     <input 
// // // // // //                         required 
// // // // // //                         className="w-full border rounded-lg px-3 py-2" 
// // // // // //                         value={formData.title} 
// // // // // //                         onChange={e => setFormData({...formData, title: e.target.value})} 
// // // // // //                         aria-label="Judul Pelatihan"
// // // // // //                     />
// // // // // //                 </div>

// // // // // //                 {/* 2. TEXTAREA DESKRIPSI - FIX A11Y: Added aria-label */}
// // // // // //                 <div>
// // // // // //                     <label className="block text-sm font-bold text-gray-700 mb-1">Deskripsi</label>
// // // // // //                     <textarea 
// // // // // //                         className="w-full border rounded-lg px-3 py-2" 
// // // // // //                         rows={3} 
// // // // // //                         value={formData.description} 
// // // // // //                         onChange={e => setFormData({...formData, description: e.target.value})} 
// // // // // //                         aria-label="Deskripsi Singkat"
// // // // // //                     />
// // // // // //                 </div>
                
// // // // // //                 <div className="grid grid-cols-2 gap-4">
// // // // // //                     {/* 3. SELECT KATEGORI - FIX A11Y: Added aria-label */}
// // // // // //                     <div>
// // // // // //                         <label className="block text-sm font-bold text-gray-700 mb-1">Kategori</label>
// // // // // //                         <select 
// // // // // //                             className="w-full border rounded-lg px-3 py-2" 
// // // // // //                             value={formData.category} 
// // // // // //                             onChange={e => setFormData({...formData, category: e.target.value})}
// // // // // //                             aria-label="Pilih Kategori"
// // // // // //                         >
// // // // // //                             <option value="Health">Health</option>
// // // // // //                             <option value="Safety">Safety</option>
// // // // // //                             <option value="General">General</option>
// // // // // //                             <option value="Disaster">Disaster</option>
// // // // // //                         </select>
// // // // // //                     </div>

// // // // // //                     {/* 4. SELECT TIPE - FIX A11Y: Added aria-label */}
// // // // // //                     <div>
// // // // // //                         <label className="block text-sm font-bold text-gray-700 mb-1">Tipe</label>
// // // // // //                         <select 
// // // // // //                             className="w-full border rounded-lg px-3 py-2" 
// // // // // //                             value={formData.programType} 
// // // // // //                             onChange={e => setFormData({...formData, programType: e.target.value})}
// // // // // //                             aria-label="Pilih Tipe Program"
// // // // // //                         >
// // // // // //                             <option value="training">Training</option>
// // // // // //                             <option value="course">Course</option>
// // // // // //                         </select>
// // // // // //                     </div>
// // // // // //                 </div>

// // // // // //                 {/* 5. INPUT BIAYA - FIX A11Y: Added aria-label */}
// // // // // //                 <div>
// // // // // //                     <label className="block text-sm font-bold text-gray-700 mb-1">Biaya (Rp)</label>
// // // // // //                     <input 
// // // // // //                         type="number" 
// // // // // //                         min="0" 
// // // // // //                         className="w-full border rounded-lg px-3 py-2" 
// // // // // //                         value={formData.price} 
// // // // // //                         onChange={e => setFormData({...formData, price: Number(e.target.value)})} 
// // // // // //                         aria-label="Biaya Investasi"
// // // // // //                     />
// // // // // //                 </div>
                
// // // // // //                 <div>
// // // // // //                     <label className="block text-sm font-bold text-gray-700 mb-1">Cover Image</label>
                    
// // // // // //                     {/* 6. IMG PREVIEW - FIX A11Y: Added alt */}
// // // // // //                     {formData.thumbnailUrl && (
// // // // // //                         <img 
// // // // // //                             src={getImageUrl(formData.thumbnailUrl)} 
// // // // // //                             className="h-32 w-full object-cover mb-2 rounded-lg border" 
// // // // // //                             alt="Preview Cover" 
// // // // // //                         />
// // // // // //                     )}
                    
// // // // // //                     {/* 7. INPUT FILE - FIX A11Y: Added aria-label */}
// // // // // //                     <input 
// // // // // //                         type="file" 
// // // // // //                         accept="image/*" 
// // // // // //                         onChange={e => setThumbnailFile(e.target.files?.[0] || null)} 
// // // // // //                         className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 cursor-pointer" 
// // // // // //                         aria-label="Upload Cover Image"
// // // // // //                     />
// // // // // //                 </div>

// // // // // //                 <div className="flex justify-end gap-3 pt-4 border-t">
// // // // // //                   <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg font-bold" aria-label="Batal">Batal</button>
// // // // // //                   <button type="submit" className="px-5 py-2.5 bg-red-700 text-white rounded-lg font-bold hover:bg-red-800" aria-label="Simpan">Simpan</button>
// // // // // //                 </div>
// // // // // //               </form>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         )}
// // // // // //       </div>
// // // // // //     </Protected>
// // // // // //   );
// // // // }
// // // 'use client';

// // // import { useState, useEffect } from 'react';
// // // import { api, getImageUrl, apiUpload } from '@/lib/api';
// // // import Protected from '@/components/Protected';
// // // import Link from 'next/link';
// // // import { Plus, Pencil, Trash2, Settings, Send, CheckCircle, BellRing, Building2 } from 'lucide-react';

// // // export default function CourseManagementPage() {
// // //   const [courses, setCourses] = useState<any[]>([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [publishingId, setPublishingId] = useState<string | null>(null);
  
// // //   const [isModalOpen, setIsModalOpen] = useState(false);
// // //   const [isEditing, setIsEditing] = useState(false);
// // //   const [currentId, setCurrentId] = useState('');
  
// // //   // FORM DATA
// // //   const [formData, setFormData] = useState({
// // //     title: '', description: '', category: 'Health', programType: 'training',
// // //     price: 0, thumbnailUrl: '', isPublished: false,
// // //     organizer: 'PMI Pusat' // [FITUR 1] Field Pelaksana
// // //   });
// // //   const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

// // //   useEffect(() => { loadCourses(); }, []);

// // //   const loadCourses = async () => {
// // //     try {
// // //       setLoading(true);
// // //       const res = await api('/api/courses/admin/all'); 
// // //       setCourses(res.courses || []);
// // //     } catch (e) { console.error(e); } finally { setLoading(false); }
// // //   };

// // //   const handlePublish = async (course: any) => {
// // //       const isDraft = !course.isPublished;
// // //       const msg = isDraft ? `Publikasikan "${course.title}"?` : `Kirim ULANG Notifikasi?`;
// // //       if(!confirm(msg)) return;
// // //       try {
// // //           setPublishingId(course._id);
// // //           await api(`/api/courses/${course._id}/publish`, { method: 'PATCH' });
// // //           alert("Berhasil! Notifikasi terkirim.");
// // //           loadCourses();
// // //       } catch (e: any) { alert("Gagal: " + e.message); } 
// // //       finally { setPublishingId(null); }
// // //   };

// // //   const handleOpenModal = (course?: any) => {
// // //     if (course) {
// // //       setIsEditing(true); setCurrentId(course._id);
// // //       setFormData({
// // //         title: course.title, description: course.description, category: course.category,
// // //         programType: course.programType || 'training', price: course.price || 0,
// // //         thumbnailUrl: course.thumbnailUrl, isPublished: course.isPublished,
// // //         organizer: course.organizer || 'PMI Pusat' // Load organizer
// // //       });
// // //     } else {
// // //       setIsEditing(false);
// // //       setFormData({ title: '', description: '', category: 'Health', programType: 'training', price: 0, thumbnailUrl: '', isPublished: false, organizer: 'PMI Pusat' });
// // //     }
// // //     setThumbnailFile(null); setIsModalOpen(true);
// // //   };

// // //   const handleSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     try {
// // //       let finalThumbnailUrl = formData.thumbnailUrl;
// // //       if (thumbnailFile) {
// // //         const uploadData = new FormData(); uploadData.append('file', thumbnailFile);
// // //         const uploadRes = await apiUpload('/api/upload', uploadData);
// // //         finalThumbnailUrl = uploadRes.url || uploadRes.file.url;
// // //       }
// // //       const payload = { ...formData, thumbnailUrl: finalThumbnailUrl };
// // //       if (isEditing) await api(`/api/courses/${currentId}`, { method: 'PUT', body: payload });
// // //       else await api('/api/courses', { method: 'POST', body: payload });

// // //       setIsModalOpen(false); loadCourses();
// // //       alert(`Kursus berhasil ${isEditing ? 'diperbarui' : 'dibuat'}!`);
// // //     } catch (error: any) { alert("Gagal menyimpan: " + error.message); }
// // //   };

// // //   const handleDelete = async (id: string) => {
// // //     if(!confirm("Yakin hapus?")) return;
// // //     try { await api(`/api/courses/${id}`, { method: 'DELETE' }); loadCourses(); } catch(e: any) { alert(e.message); }
// // //   };

// // //   const formatRupiah = (num: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);

// // //   if (loading) return <div className="p-20 text-center">Memuat...</div>;

// // //   return (
// // //     <Protected roles={['FACILITATOR', 'SUPER_ADMIN']}>
// // //       <div className="max-w-7xl mx-auto p-6 min-h-screen pb-20">
// // //         <div className="flex justify-between items-center mb-8 border-b pb-4">
// // //           <div><h1 className="text-2xl font-bold text-gray-800">Manajemen Pelatihan</h1><p className="text-gray-500 text-sm">Kelola kursus atau pelatihan.</p></div>
// // //           <button onClick={() => handleOpenModal()} className="bg-red-700 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-red-800 flex items-center gap-2"><span>+</span> Buat Baru</button>
// // //         </div>

// // //         <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
// // //           <table className="w-full text-left text-sm">
// // //             <thead className="bg-gray-50 border-b text-gray-700 uppercase text-xs tracking-wider">
// // //               <tr><th className="p-4 w-24">Cover</th><th className="p-4">Info Pelatihan</th><th className="p-4">Pelaksana</th><th className="p-4">Biaya</th><th className="p-4 text-center">Status</th><th className="p-4 text-center">Aksi</th></tr>
// // //             </thead>
// // //             <tbody className="divide-y divide-gray-100">
// // //               {courses.length === 0 ? <tr><td colSpan={6} className="p-10 text-center text-gray-400">Belum ada data.</td></tr> :
// // //                   courses.map(course => (
// // //                     <tr key={course._id} className="hover:bg-gray-50 transition-colors">
// // //                       <td className="p-4"><img src={getImageUrl(course.thumbnailUrl)} className="w-16 h-10 object-cover rounded bg-gray-200 border" alt="Cover"/></td>
// // //                       <td className="p-4"><p className="font-bold text-gray-800 line-clamp-1">{course.title}</p><span className="text-[10px] px-2 py-0.5 rounded font-bold uppercase bg-blue-100 text-blue-700">{course.programType}</span></td>
                      
// // //                       {/* [TAMPILAN] Pelaksana */}
// // //                       <td className="p-4 text-gray-600"><div className="flex items-center gap-1"><Building2 size={12}/> {course.organizer || 'PMI Pusat'}</div></td>
                      
// // //                       <td className="p-4 font-bold text-gray-700">{course.price === 0 ? <span className="text-green-600">Gratis</span> : formatRupiah(course.price)}</td>
// // //                       <td className="p-4 text-center"><span className={`px-2 py-1 rounded-full text-xs font-bold ${course.isPublished ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{course.isPublished ? 'Published' : 'Draft'}</span></td>
// // //                       <td className="p-4 flex justify-center gap-2">
// // //                         <Link href={`/admin/courses/${course._id}`} className="p-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 flex items-center gap-1" title="Kelola Modul"><Settings size={16}/></Link>
// // //                         <button onClick={() => handlePublish(course)} disabled={publishingId === course._id} className={`p-2 rounded flex items-center gap-2 text-white transition disabled:opacity-50 ${course.isPublished ? 'bg-green-600' : 'bg-blue-600'}`} title="Publish">{publishingId === course._id ? '...' : <>{course.isPublished ? <BellRing size={16}/> : <Send size={16}/>}</>}</button>
// // //                         <button onClick={() => handleOpenModal(course)} className="p-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 border border-blue-200" title="Edit"><Pencil size={16}/></button>
// // //                         <button onClick={() => handleDelete(course._id)} className="p-2 bg-red-50 text-red-600 rounded hover:bg-red-100 border border-red-200" title="Hapus"><Trash2 size={16}/></button>
// // //                       </td>
// // //                     </tr>
// // //                   ))
// // //               }
// // //             </tbody>
// // //           </table>
// // //         </div>

// // //         {/* MODAL FORM */}
// // //         {isModalOpen && (
// // //           <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
// // //             <div className="bg-white p-6 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
// // //               <div className="flex justify-between items-center mb-6 border-b pb-4">
// // //                   <h2 className="text-xl font-bold text-gray-800">{isEditing ? 'Edit Pelatihan' : 'Buat Pelatihan Baru'}</h2>
// // //                   <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>
// // //               </div>
// // //               <form onSubmit={handleSubmit} className="space-y-5">
                
// // //                 {/* [FITUR 1] INPUT PELAKSANA PELATIHAN */}
// // //                 <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
// // //                     <label className="block text-sm font-bold text-blue-800 mb-1">Pelaksana Pelatihan</label>
// // //                     <select 
// // //                         className="w-full border rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none font-medium" 
// // //                         value={formData.organizer} 
// // //                         onChange={e => setFormData({...formData, organizer: e.target.value})}
// // //                         aria-label="Pilih Pelaksana"
// // //                     >
// // //                         <option value="PMI Pusat">PMI Pusat</option>
// // //                         <option value="PMI Provinsi">PMI Provinsi</option>
// // //                         <option value="PMI Kabupaten/Kota">PMI Kabupaten/Kota</option>
// // //                         <option value="PMI Kecamatan">PMI Kecamatan</option>
// // //                         <option value="Unit PMR/KSR">Unit PMR/KSR</option>
// // //                         <option value="Umum/Mitra">Umum/Mitra</option>
// // //                     </select>
// // //                     <p className="text-xs text-blue-600 mt-1">Info ini digunakan untuk data Sertifikat.</p>
// // //                 </div>

// // //                 {/* Field Lainnya */}
// // //                 <div><label className="block text-sm font-bold text-gray-700 mb-1">Judul</label><input required className="w-full border rounded-lg px-3 py-2" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} /></div>
// // //                 <div><label className="block text-sm font-bold text-gray-700 mb-1">Deskripsi</label><textarea className="w-full border rounded-lg px-3 py-2" rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} /></div>
// // //                 <div className="grid grid-cols-2 gap-4">
// // //                     <div><label className="block text-sm font-bold text-gray-700 mb-1">Kategori</label><select className="w-full border rounded-lg px-3 py-2" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}><option value="Health">Health</option><option value="Safety">Safety</option><option value="General">General</option><option value="Disaster">Disaster</option></select></div>
// // //                     <div><label className="block text-sm font-bold text-gray-700 mb-1">Tipe</label><select className="w-full border rounded-lg px-3 py-2" value={formData.programType} onChange={e => setFormData({...formData, programType: e.target.value})}><option value="training">Training</option><option value="course">Course</option></select></div>
// // //                 </div>
// // //                 <div><label className="block text-sm font-bold text-gray-700 mb-1">Biaya (Rp)</label><input type="number" min="0" className="w-full border rounded-lg px-3 py-2" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} /></div>
// // //                 <div>
// // //                     <label className="block text-sm font-bold text-gray-700 mb-1">Cover Image</label>
// // //                     {formData.thumbnailUrl && <img src={getImageUrl(formData.thumbnailUrl)} className="h-32 w-full object-cover mb-2 rounded-lg border" />}
// // //                     <input type="file" accept="image/*" onChange={e => setThumbnailFile(e.target.files?.[0] || null)} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 cursor-pointer" />
// // //                 </div>
// // //                 <div className="flex justify-end gap-3 pt-4 border-t">
// // //                   <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg font-bold">Batal</button>
// // //                   <button type="submit" className="px-5 py-2.5 bg-red-700 text-white rounded-lg font-bold hover:bg-red-800">Simpan</button>
// // //                 </div>
// // //               </form>
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </Protected>
// // //   );
// // // }




// // // // // 'use client';

// // // // // import { useState, useEffect } from 'react';
// // // // // import { api, getImageUrl, apiUpload } from '@/lib/api';
// // // // // import Protected from '@/components/Protected';
// // // // // import Link from 'next/link';
// // // // // import { Plus, Pencil, Trash2, Settings, Send, CheckCircle, BellRing, Building2 } from 'lucide-react';

// // // // // export default function CourseManagementPage() {
// // // // //   const [courses, setCourses] = useState<any[]>([]);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [publishingId, setPublishingId] = useState<string | null>(null);
  
// // // // //   // State Modal & Form
// // // // //   const [isModalOpen, setIsModalOpen] = useState(false);
// // // // //   const [isEditing, setIsEditing] = useState(false);
// // // // //   const [currentId, setCurrentId] = useState('');
  
// // // // //   // FORM DATA
// // // // //   const [formData, setFormData] = useState({
// // // // //     title: '', description: '', category: 'Health', programType: 'training',
// // // // //     price: 0, thumbnailUrl: '', isPublished: false,
// // // // //     organizer: 'PMI Pusat' // Field Pelaksana
// // // // //   });
// // // // //   const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

// // // // //   useEffect(() => { loadCourses(); }, []);

// // // // //   const loadCourses = async () => {
// // // // //     try {
// // // // //       setLoading(true);
// // // // //       const res = await api('/api/courses/admin/all'); 
// // // // //       setCourses(res.courses || []);
// // // // //     } catch (e) { console.error(e); } finally { setLoading(false); }
// // // // //   };

// // // // //   const handlePublish = async (course: any) => {
// // // // //       const isDraft = !course.isPublished;
// // // // //       const msg = isDraft ? `Publikasikan "${course.title}"?` : `Kirim ULANG Notifikasi?`;
// // // // //       if(!confirm(msg)) return;
// // // // //       try {
// // // // //           setPublishingId(course._id);
// // // // //           await api(`/api/courses/${course._id}/publish`, { method: 'PATCH' });
// // // // //           alert("Berhasil! Notifikasi terkirim.");
// // // // //           loadCourses();
// // // // //       } catch (e: any) { alert("Gagal: " + e.message); } 
// // // // //       finally { setPublishingId(null); }
// // // // //   };

// // // // //   const handleOpenModal = (course?: any) => {
// // // // //     if (course) {
// // // // //       setIsEditing(true); setCurrentId(course._id);
// // // // //       setFormData({
// // // // //         title: course.title, description: course.description, category: course.category,
// // // // //         programType: course.programType || 'training', price: course.price || 0,
// // // // //         thumbnailUrl: course.thumbnailUrl, isPublished: course.isPublished,
// // // // //         organizer: course.organizer || 'PMI Pusat'
// // // // //       });
// // // // //     } else {
// // // // //       setIsEditing(false);
// // // // //       setFormData({ title: '', description: '', category: 'Health', programType: 'training', price: 0, thumbnailUrl: '', isPublished: false, organizer: 'PMI Pusat' });
// // // // //     }
// // // // //     setThumbnailFile(null); setIsModalOpen(true);
// // // // //   };

// // // // //   const handleSubmit = async (e: React.FormEvent) => {
// // // // //     e.preventDefault();
// // // // //     try {
// // // // //       let finalThumbnailUrl = formData.thumbnailUrl;
// // // // //       if (thumbnailFile) {
// // // // //         const uploadData = new FormData(); uploadData.append('file', thumbnailFile);
// // // // //         const uploadRes = await apiUpload('/api/upload', uploadData);
// // // // //         finalThumbnailUrl = uploadRes.url || uploadRes.file.url;
// // // // //       }
// // // // //       const payload = { ...formData, thumbnailUrl: finalThumbnailUrl };
// // // // //       if (isEditing) await api(`/api/courses/${currentId}`, { method: 'PUT', body: payload });
// // // // //       else await api('/api/courses', { method: 'POST', body: payload });

// // // // //       setIsModalOpen(false); loadCourses();
// // // // //       alert(`Kursus berhasil ${isEditing ? 'diperbarui' : 'dibuat'}!`);
// // // // //     } catch (error: any) { alert("Gagal menyimpan: " + error.message); }
// // // // //   };

// // // // //   const handleDelete = async (id: string) => {
// // // // //     if(!confirm("Yakin hapus?")) return;
// // // // //     try { await api(`/api/courses/${id}`, { method: 'DELETE' }); loadCourses(); } catch(e: any) { alert(e.message); }
// // // // //   };

// // // // //   const formatRupiah = (num: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);

// // // // //   if (loading) return <div className="p-20 text-center">Memuat...</div>;

// // // // //   return (
// // // // //     <Protected roles={['FACILITATOR', 'SUPER_ADMIN']}>
// // // // //       <div className="max-w-7xl mx-auto p-6 min-h-screen pb-20">
// // // // //         <div className="flex justify-between items-center mb-8 border-b pb-4">
// // // // //           <div><h1 className="text-2xl font-bold text-gray-800">Manajemen Pelatihan</h1><p className="text-gray-500 text-sm">Kelola kursus atau pelatihan.</p></div>
// // // // //           <button onClick={() => handleOpenModal()} className="bg-red-700 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-red-800 flex items-center gap-2"><span>+</span> Buat Baru</button>
// // // // //         </div>

// // // // //         <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
// // // // //           <table className="w-full text-left text-sm">
// // // // //             <thead className="bg-gray-50 border-b text-gray-700 uppercase text-xs tracking-wider">
// // // // //               <tr><th className="p-4 w-24">Cover</th><th className="p-4">Info Pelatihan</th><th className="p-4">Pelaksana</th><th className="p-4">Biaya</th><th className="p-4 text-center">Status</th><th className="p-4 text-center">Aksi</th></tr>
// // // // //             </thead>
// // // // //             <tbody className="divide-y divide-gray-100">
// // // // //               {courses.length === 0 ? <tr><td colSpan={6} className="p-10 text-center text-gray-400">Belum ada data.</td></tr> :
// // // // //                   courses.map(course => (
// // // // //                     <tr key={course._id} className="hover:bg-gray-50 transition-colors">
// // // // //                       <td className="p-4"><img src={getImageUrl(course.thumbnailUrl)} className="w-16 h-10 object-cover rounded bg-gray-200 border" alt="Cover"/></td>
// // // // //                       <td className="p-4"><p className="font-bold text-gray-800 line-clamp-1">{course.title}</p><span className="text-[10px] px-2 py-0.5 rounded font-bold uppercase bg-blue-100 text-blue-700">{course.programType}</span></td>
                      
// // // // //                       {/* Pelaksana */}
// // // // //                       <td className="p-4 text-gray-600"><div className="flex items-center gap-1"><Building2 size={12}/> {course.organizer || 'PMI Pusat'}</div></td>
                      
// // // // //                       <td className="p-4 font-bold text-gray-700">{course.price === 0 ? <span className="text-green-600">Gratis</span> : formatRupiah(course.price)}</td>
// // // // //                       <td className="p-4 text-center"><span className={`px-2 py-1 rounded-full text-xs font-bold ${course.isPublished ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{course.isPublished ? 'Published' : 'Draft'}</span></td>
// // // // //                       <td className="p-4 flex justify-center gap-2">
// // // // //                         <Link href={`/admin/courses/${course._id}`} className="p-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 flex items-center gap-1" title="Kelola Modul"><Settings size={16}/></Link>
// // // // //                         <button onClick={() => handlePublish(course)} disabled={publishingId === course._id} className={`p-2 rounded flex items-center gap-2 text-white transition disabled:opacity-50 ${course.isPublished ? 'bg-green-600' : 'bg-blue-600'}`} title="Publish" aria-label="Publikasikan">{publishingId === course._id ? '...' : <>{course.isPublished ? <BellRing size={16}/> : <Send size={16}/>}</>}</button>
// // // // //                         <button onClick={() => handleOpenModal(course)} className="p-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 border border-blue-200" title="Edit" aria-label="Edit"><Pencil size={16}/></button>
// // // // //                         <button onClick={() => handleDelete(course._id)} className="p-2 bg-red-50 text-red-600 rounded hover:bg-red-100 border border-red-200" title="Hapus" aria-label="Hapus"><Trash2 size={16}/></button>
// // // // //                       </td>
// // // // //                     </tr>
// // // // //                   ))
// // // // //               }
// // // // //             </tbody>
// // // // //           </table>
// // // // //         </div>

// // // // //         {/* MODAL FORM */}
// // // // //         {isModalOpen && (
// // // // //           <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
// // // // //             <div className="bg-white p-6 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
// // // // //               <div className="flex justify-between items-center mb-6 border-b pb-4">
// // // // //                   <h2 className="text-xl font-bold text-gray-800">{isEditing ? 'Edit Pelatihan' : 'Buat Pelatihan Baru'}</h2>
// // // // //                   <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold" aria-label="Tutup">✕</button>
// // // // //               </div>
// // // // //               <form onSubmit={handleSubmit} className="space-y-5">
                
// // // // //                 {/* INPUT PELAKSANA PELATIHAN */}
// // // // //                 <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
// // // // //                     <label className="block text-sm font-bold text-blue-800 mb-1">Pelaksana Pelatihan</label>
// // // // //                     <select 
// // // // //                         className="w-full border rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none font-medium" 
// // // // //                         value={formData.organizer} 
// // // // //                         onChange={e => setFormData({...formData, organizer: e.target.value})}
// // // // //                         aria-label="Pilih Pelaksana"
// // // // //                     >
// // // // //                         <option value="PMI Pusat">PMI Pusat</option>
// // // // //                         <option value="PMI Provinsi">PMI Provinsi</option>
// // // // //                         <option value="PMI Kabupaten/Kota">PMI Kabupaten/Kota</option>
// // // // //                         <option value="PMI Kecamatan">PMI Kecamatan</option>
// // // // //                         <option value="Unit PMR/KSR">Unit PMR/KSR</option>
// // // // //                         <option value="Umum/Mitra">Umum/Mitra</option>
// // // // //                     </select>
// // // // //                     <p className="text-xs text-blue-600 mt-1">Info ini digunakan untuk data Sertifikat.</p>
// // // // //                 </div>

// // // // //                 {/* Field Lainnya dengan ARIA LABEL */}
// // // // //                 <div>
// // // // //                     <label className="block text-sm font-bold text-gray-700 mb-1">Judul</label>
// // // // //                     <input required className="w-full border rounded-lg px-3 py-2" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} aria-label="Judul Pelatihan" />
// // // // //                 </div>
// // // // //                 <div>
// // // // //                     <label className="block text-sm font-bold text-gray-700 mb-1">Deskripsi</label>
// // // // //                     <textarea className="w-full border rounded-lg px-3 py-2" rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} aria-label="Deskripsi Pelatihan" />
// // // // //                 </div>
// // // // //                 <div className="grid grid-cols-2 gap-4">
// // // // //                     <div>
// // // // //                         <label className="block text-sm font-bold text-gray-700 mb-1">Kategori</label>
// // // // //                         <select className="w-full border rounded-lg px-3 py-2" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} aria-label="Kategori">
// // // // //                             <option value="Health">Health</option>
// // // // //                             <option value="Safety">Safety</option>
// // // // //                             <option value="General">General</option>
// // // // //                             <option value="Disaster">Disaster</option>
// // // // //                         </select>
// // // // //                     </div>
// // // // //                     <div>
// // // // //                         <label className="block text-sm font-bold text-gray-700 mb-1">Tipe</label>
// // // // //                         <select className="w-full border rounded-lg px-3 py-2" value={formData.programType} onChange={e => setFormData({...formData, programType: e.target.value})} aria-label="Tipe Program">
// // // // //                             <option value="training">Training</option>
// // // // //                             <option value="course">Course</option>
// // // // //                         </select>
// // // // //                     </div>
// // // // //                 </div>
// // // // //                 <div>
// // // // //                     <label className="block text-sm font-bold text-gray-700 mb-1">Biaya (Rp)</label>
// // // // //                     <input type="number" min="0" className="w-full border rounded-lg px-3 py-2" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} aria-label="Biaya" />
// // // // //                 </div>
// // // // //                 <div>
// // // // //                     <label className="block text-sm font-bold text-gray-700 mb-1">Cover Image</label>
// // // // //                     {formData.thumbnailUrl && <img src={getImageUrl(formData.thumbnailUrl)} className="h-32 w-full object-cover mb-2 rounded-lg border" alt="Cover Preview" />}
// // // // //                     <input type="file" accept="image/*" onChange={e => setThumbnailFile(e.target.files?.[0] || null)} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 cursor-pointer" aria-label="Upload Cover" />
// // // // //                 </div>
// // // // //                 <div className="flex justify-end gap-3 pt-4 border-t">
// // // // //                   <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg font-bold">Batal</button>
// // // // //                   <button type="submit" className="px-5 py-2.5 bg-red-700 text-white rounded-lg font-bold hover:bg-red-800">Simpan</button>
// // // // //                 </div>
// // // // //               </form>
// // // // //             </div>
// // // // //           </div>
// // // // //         )}
// // // // //       </div>
// // // // //     </Protected>
// // // // //   );
// // // // // }
// // // // 'use client';

// // // // import { useState, useEffect } from 'react';
// // // // import Link from 'next/link';
// // // // import { useRouter } from 'next/navigation';
// // // // import { api, getImageUrl } from '@/lib/api';
// // // // import Protected from '@/components/Protected'; // Wajib ada untuk halaman Admin
// // // // import { 
// // // //   Plus, Search, BookOpen, Edit, Trash2, Eye, 
// // // //   MoreHorizontal, Building2, User 
// // // // } from 'lucide-react';

// // // // export default function AdminCourseListPage() {
// // // //   const router = useRouter();
// // // //   const [courses, setCourses] = useState<any[]>([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [search, setSearch] = useState('');

// // // //   useEffect(() => {
// // // //     loadCourses();
// // // //   }, []);

// // // //   const loadCourses = async () => {
// // // //     try {
// // // //       setLoading(true);
// // // //       // Panggil endpoint Admin (mengambil semua data: Draft & Published)
// // // //       const res = await api('/api/courses');
      
// // // //       // [PENTING] Backend mengirim { courses: [...] }, jadi ambil properti .courses
// // // //       // Jika res.courses undefined, gunakan array kosong []
// // // //       setCourses(res.courses || []);
      
// // // //     } catch (error: any) {
// // // //       console.error("Gagal memuat data admin:", error);
// // // //       // Redirect login jika token invalid/expired
// // // //       if (error.message?.includes('token') || error.message?.includes('auth')) {
// // // //         router.push('/login');
// // // //       }
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const handleDelete = async (id: string) => {
// // // //     if (!confirm('Apakah Anda yakin ingin menghapus pelatihan ini secara permanen?')) return;
// // // //     try {
// // // //       await api(`/api/courses/${id}`, { method: 'DELETE' });
// // // //       // Update state lokal tanpa reload halaman
// // // //       setCourses(prev => prev.filter(c => c._id !== id));
// // // //     } catch (e: any) {
// // // //       alert("Gagal menghapus: " + e.message);
// // // //     }
// // // //   };

// // // //   // Filter di sisi Client (Sama seperti katalog publik Anda)
// // // //   const filteredCourses = courses.filter(c => 
// // // //     c.title?.toLowerCase().includes(search.toLowerCase()) ||
// // // //     c.category?.toLowerCase().includes(search.toLowerCase())
// // // //   );

// // // //   return (
// // // //     <Protected roles={["FACILITATOR", "SUPER_ADMIN", "ADMIN"]}>
// // // //       <div className="max-w-7xl mx-auto p-6 min-h-screen bg-gray-50/50">
        
// // // //         {/* HEADER */}
// // // //         <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
// // // //           <div>
// // // //             <h1 className="text-2xl font-bold text-gray-800">Manajemen Pelatihan</h1>
// // // //             <p className="text-gray-500 text-sm">Kelola daftar kursus, materi, dan status publikasi.</p>
// // // //           </div>
          
// // // //           <Link href="/admin/courses/create">
// // // //             <button className="bg-red-700 text-white px-5 py-2.5 rounded-full font-bold shadow-lg hover:bg-red-800 transition-all active:scale-95 flex items-center gap-2">
// // // //               <Plus size={18} /> Buat Pelatihan Baru
// // // //             </button>
// // // //           </Link>
// // // //         </div>

// // // //         {/* SEARCH & FILTER BAR */}
// // // //         <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center">
// // // //           <div className="relative flex-1 w-full">
// // // //             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
// // // //             <input 
// // // //               type="text" 
// // // //               placeholder="Cari judul pelatihan atau kategori..." 
// // // //               className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-100 focus:border-red-500 outline-none transition-all text-sm"
// // // //               value={search}
// // // //               onChange={(e) => setSearch(e.target.value)}
// // // //             />
// // // //           </div>
// // // //           <div className="text-sm text-gray-500 font-medium">
// // // //             Total: <span className="text-gray-900 font-bold">{filteredCourses.length}</span> Data
// // // //           </div>
// // // //         </div>

// // // //         {/* TABEL DATA */}
// // // //         <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
// // // //           <div className="overflow-x-auto">
// // // //             <table className="w-full text-left text-sm whitespace-nowrap">
// // // //               <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 text-xs uppercase tracking-wider">
// // // //                 <tr>
// // // //                   <th className="p-5 font-bold">Informasi Pelatihan</th>
// // // //                   <th className="p-5 font-bold text-center">Fasilitator</th>
// // // //                   <th className="p-5 font-bold text-center">Status</th>
// // // //                   <th className="p-5 font-bold text-center">Modul</th>
// // // //                   <th className="p-5 font-bold text-right">Aksi</th>
// // // //                 </tr>
// // // //               </thead>
// // // //               <tbody className="divide-y divide-gray-100">
// // // //                 {loading ? (
// // // //                   <tr><td colSpan={5} className="p-10 text-center text-gray-400 animate-pulse">Memuat data pelatihan...</td></tr>
// // // //                 ) : filteredCourses.length === 0 ? (
// // // //                   <tr>
// // // //                     <td colSpan={5} className="p-12 text-center">
// // // //                       <div className="flex flex-col items-center justify-center text-gray-400 gap-2">
// // // //                         <BookOpen size={48} opacity={0.2}/>
// // // //                         <p className="font-medium">Belum ada data pelatihan.</p>
// // // //                         <Link href="/admin/courses/create" className="text-red-600 text-xs font-bold hover:underline">Buat Baru Sekarang</Link>
// // // //                       </div>
// // // //                     </td>
// // // //                   </tr>
// // // //                 ) : (
// // // //                   filteredCourses.map((course) => (
// // // //                     <tr key={course._id} className="hover:bg-blue-50/30 transition-colors group">
                      
// // // //                       {/* KOLOM 1: INFO PELATIHAN */}
// // // //                       <td className="p-5">
// // // //                         <div className="flex gap-4 items-start">
// // // //                           <div className="w-16 h-12 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100 relative">
// // // //                             {course.thumbnailUrl ? (
// // // //                               <img src={getImageUrl(course.thumbnailUrl)} className="w-full h-full object-cover" alt="Cover" />
// // // //                             ) : (
// // // //                               <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100"><BookOpen size={20}/></div>
// // // //                             )}
// // // //                           </div>
// // // //                           <div>
// // // //                             <h3 className="font-bold text-gray-800 text-base line-clamp-1 mb-1">{course.title}</h3>
// // // //                             <div className="flex items-center gap-2 text-xs text-gray-500">
// // // //                               <span className="bg-gray-100 px-2 py-0.5 rounded border">{course.category || 'Umum'}</span>
// // // //                               <span>•</span>
// // // //                               <span className="capitalize">{course.level || 'Beginner'}</span>
// // // //                             </div>
// // // //                           </div>
// // // //                         </div>
// // // //                       </td>

// // // //                       {/* KOLOM 2: FASILITATOR */}
// // // //                       <td className="p-5 text-center">
// // // //                         {course.facilitatorIds && course.facilitatorIds.length > 0 ? (
// // // //                            <div className="flex justify-center items-center gap-2">
// // // //                               <img 
// // // //                                 src={getImageUrl(course.facilitatorIds[0]?.avatarUrl)} 
// // // //                                 className="w-8 h-8 rounded-full border border-gray-200 object-cover" 
// // // //                                 alt="Facilitator"
// // // //                                 onError={(e) => (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${course.facilitatorIds[0]?.name || 'F'}&background=random`}
// // // //                               />
// // // //                               <div className="text-left hidden md:block">
// // // //                                 <p className="text-xs font-bold text-gray-700 max-w-[100px] truncate">{course.facilitatorIds[0]?.name}</p>
// // // //                               </div>
// // // //                            </div>
// // // //                         ) : (
// // // //                           <span className="text-xs text-gray-400 italic">Belum diset</span>
// // // //                         )}
// // // //                       </td>

// // // //                       {/* KOLOM 3: STATUS PUBLIKASI */}
// // // //                       <td className="p-5 text-center">
// // // //                         <span className={`px-3 py-1 rounded-full text-[10px] font-bold border tracking-wide ${
// // // //                           course.isPublished 
// // // //                             ? 'bg-green-100 text-green-700 border-green-200' 
// // // //                             : 'bg-yellow-50 text-yellow-700 border-yellow-200'
// // // //                         }`}>
// // // //                           {course.isPublished ? 'PUBLISHED' : 'DRAFT'}
// // // //                         </span>
// // // //                       </td>

// // // //                       {/* KOLOM 4: JUMLAH MODUL */}
// // // //                       <td className="p-5 text-center">
// // // //                         <span className="text-sm font-bold text-gray-600 bg-gray-100 px-3 py-1 rounded-lg">
// // // //                           {course.modules?.length || 0}
// // // //                         </span>
// // // //                       </td>

// // // //                       {/* KOLOM 5: AKSI */}
// // // //                       <td className="p-5 text-right">
// // // //                         <div className="flex justify-end gap-2 opacity-100 sm:opacity-60 sm:group-hover:opacity-100 transition-opacity">
// // // //                           {/* Tombol Preview (Hanya jika published atau ingin test) */}
// // // //                           <Link href={`/courses/${course._id}`} target="_blank" title="Lihat Tampilan Siswa">
// // // //                              <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
// // // //                                 <Eye size={18}/>
// // // //                              </button>
// // // //                           </Link>
                          
// // // //                           {/* Tombol Edit */}
// // // //                           <Link href={`/admin/courses/${course._id}`} title="Edit Konten">
// // // //                              <button className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
// // // //                                 <Edit size={18}/>
// // // //                              </button>
// // // //                           </Link>
                          
// // // //                           {/* Tombol Hapus */}
// // // //                           <button 
// // // //                             onClick={() => handleDelete(course._id)} 
// // // //                             className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
// // // //                             title="Hapus Pelatihan"
// // // //                           >
// // // //                              <Trash2 size={18}/>
// // // //                           </button>
// // // //                         </div>
// // // //                       </td>

// // // //                     </tr>
// // // //                   ))
// // // //                 )}
// // // //               </tbody>
// // // //             </table>
// // // //           </div>
          
// // // //           {/* FOOTER TABEL */}
// // // //           <div className="p-4 border-t border-gray-100 bg-gray-50 text-xs text-gray-500 text-center">
// // // //             Menampilkan {filteredCourses.length} data pelatihan.
// // // //           </div>
// // // //         </div>

// // // //       </div>
// // // //     </Protected>
// // // //   );
// // // // }

// 'use client';

// import { useState, useEffect } from 'react';
// import { api, getImageUrl, apiUpload } from '@/lib/api';
// import Protected from '@/components/Protected';
// import Link from 'next/link';
// import { Plus, Pencil, Trash2, Settings, Send, CheckCircle, BellRing, Building2 } from 'lucide-react';

// export default function CourseManagementPage() {
//   const [courses, setCourses] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [publishingId, setPublishingId] = useState<string | null>(null);
  
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentId, setCurrentId] = useState('');
  
//   const [formData, setFormData] = useState({
//     title: '', description: '', category: 'Health', programType: 'training',
//     price: 0, thumbnailUrl: '', isPublished: false,
//     organizer: 'PMI Pusat'
//   });
//   const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

//   useEffect(() => { loadCourses(); }, []);

//   const loadCourses = async () => {
//     try {
//       setLoading(true);
//       const res = await api('/api/courses'); // Standard endpoint
//       setCourses(res.courses || []);
//     } catch (e) { console.error(e); } finally { setLoading(false); }
//   };

//   const handlePublish = async (course: any) => {
//       const isDraft = !course.isPublished;
//       const msg = isDraft ? `Publikasikan "${course.title}"?` : `Kirim ULANG Notifikasi?`;
//       if(!confirm(msg)) return;
//       try {
//           setPublishingId(course._id);
//           await api(`/api/courses/${course._id}/publish`, { method: 'PATCH' });
//           alert("Berhasil! Status diperbarui.");
//           loadCourses();
//       } catch (e: any) { alert("Gagal: " + e.message); } 
//       finally { setPublishingId(null); }
//   };

//   const handleOpenModal = (course?: any) => {
//     if (course) {
//       setIsEditing(true); setCurrentId(course._id);
//       setFormData({
//         title: course.title, description: course.description, category: course.category,
//         programType: course.programType || 'training', price: course.price || 0,
//         thumbnailUrl: course.thumbnailUrl, isPublished: course.isPublished,
//         organizer: course.organizer || 'PMI Pusat'
//       });
//     } else {
//       setIsEditing(false);
//       setFormData({ title: '', description: '', category: 'Health', programType: 'training', price: 0, thumbnailUrl: '', isPublished: false, organizer: 'PMI Pusat' });
//     }
//     setThumbnailFile(null); setIsModalOpen(true);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       let finalThumbnailUrl = formData.thumbnailUrl;
//       if (thumbnailFile) {
//         const uploadData = new FormData(); uploadData.append('file', thumbnailFile);
//         const uploadRes = await apiUpload('/api/upload', uploadData);
//         finalThumbnailUrl = uploadRes.url || uploadRes.file.url;
//       }
//       const payload = { ...formData, thumbnailUrl: finalThumbnailUrl };
//       if (isEditing) await api(`/api/courses/${currentId}`, { method: 'PUT', body: payload });
//       else await api('/api/courses', { method: 'POST', body: payload });

//       setIsModalOpen(false); loadCourses();
//       alert(`Kursus berhasil ${isEditing ? 'diperbarui' : 'dibuat'}!`);
//     } catch (error: any) { alert("Gagal menyimpan: " + error.message); }
//   };

//   const handleDelete = async (id: string) => {
//     if(!confirm("Yakin hapus?")) return;
//     try { await api(`/api/courses/${id}`, { method: 'DELETE' }); loadCourses(); } catch(e: any) { alert(e.message); }
//   };

//   const formatRupiah = (num: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);

//   if (loading) return <div className="p-20 text-center">Memuat...</div>;

//   return (
//     <Protected roles={['FACILITATOR', 'SUPER_ADMIN']}>
//       <div className="max-w-7xl mx-auto p-6 min-h-screen pb-20">
//         <div className="flex justify-between items-center mb-8 border-b pb-4">
//           <div><h1 className="text-2xl font-bold text-gray-800">Manajemen Pelatihan</h1><p className="text-gray-500 text-sm">Kelola kursus atau pelatihan.</p></div>
//           <button onClick={() => handleOpenModal()} className="bg-red-700 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-red-800 flex items-center gap-2"><span>+</span> Buat Baru</button>
//         </div>

//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//           <table className="w-full text-left text-sm">
//             <thead className="bg-gray-50 border-b text-gray-700 uppercase text-xs tracking-wider">
//               <tr><th className="p-4 w-24">Cover</th><th className="p-4">Info Pelatihan</th><th className="p-4">Pelaksana</th><th className="p-4">Biaya</th><th className="p-4 text-center">Status</th><th className="p-4 text-center">Aksi</th></tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//               {courses.length === 0 ? <tr><td colSpan={6} className="p-10 text-center text-gray-400">Belum ada data.</td></tr> :
//                   courses.map(course => (
//                     <tr key={course._id} className="hover:bg-gray-50 transition-colors">
//                       <td className="p-4"><img src={getImageUrl(course.thumbnailUrl)} className="w-16 h-10 object-cover rounded bg-gray-200 border" alt="Cover"/></td>
//                       <td className="p-4"><p className="font-bold text-gray-800 line-clamp-1">{course.title}</p><span className="text-[10px] px-2 py-0.5 rounded font-bold uppercase bg-blue-100 text-blue-700">{course.programType}</span></td>
//                       <td className="p-4 text-gray-600"><div className="flex items-center gap-1"><Building2 size={12}/> {course.organizer || 'PMI Pusat'}</div></td>
//                       <td className="p-4 font-bold text-gray-700">{course.price === 0 ? <span className="text-green-600">Gratis</span> : formatRupiah(course.price)}</td>
//                       <td className="p-4 text-center"><span className={`px-2 py-1 rounded-full text-xs font-bold ${course.isPublished ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{course.isPublished ? 'Published' : 'Draft'}</span></td>
//                       <td className="p-4 flex justify-center gap-2">
//                         <Link href={`/admin/courses/${course._id}`} aria-label="Kelola Modul" className="p-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 flex items-center gap-1" title="Kelola Modul"><Settings size={16}/></Link>
//                         <button aria-label="Publikasikan Kursus" onClick={() => handlePublish(course)} disabled={publishingId === course._id} className={`p-2 rounded flex items-center gap-2 text-white transition disabled:opacity-50 ${course.isPublished ? 'bg-green-600' : 'bg-blue-600'}`} title="Publish">{publishingId === course._id ? '...' : <>{course.isPublished ? <BellRing size={16}/> : <Send size={16}/>}</>}</button>
//                         <button aria-label="Edit Kursus" onClick={() => handleOpenModal(course)} className="p-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 border border-blue-200" title="Edit"><Pencil size={16}/></button>
//                         <button aria-label="Hapus Kursus" onClick={() => handleDelete(course._id)} className="p-2 bg-red-50 text-red-600 rounded hover:bg-red-100 border border-red-200" title="Hapus"><Trash2 size={16}/></button>
//                       </td>
//                     </tr>
//                   ))
//               }
//             </tbody>
//           </table>
//         </div>

//         {/* MODAL FORM */}
//         {isModalOpen && (
//           <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white p-6 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
//               <div className="flex justify-between items-center mb-6 border-b pb-4">
//                   <h2 className="text-xl font-bold text-gray-800">{isEditing ? 'Edit Pelatihan' : 'Buat Pelatihan Baru'}</h2>
//                   <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>
//               </div>
//               <form onSubmit={handleSubmit} className="space-y-5">
                
//                 <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
//                     <label className="block text-sm font-bold text-blue-800 mb-1" htmlFor="organizer">Pelaksana Pelatihan</label>
//                     <select 
//                         id="organizer"
//                         className="w-full border rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none font-medium" 
//                         value={formData.organizer} 
//                         onChange={e => setFormData({...formData, organizer: e.target.value})}
//                     >
//                         <option value="PMI Pusat">PMI Pusat</option>
//                         <option value="PMI Provinsi">PMI Provinsi</option>
//                         <option value="PMI Kabupaten/Kota">PMI Kabupaten/Kota</option>
//                         <option value="PMI Kecamatan">PMI Kecamatan</option>
//                         <option value="Unit PMR/KSR">Unit PMR/KSR</option>
//                         <option value="Umum/Mitra">Umum/Mitra</option>
//                     </select>
//                     <p className="text-xs text-blue-600 mt-1">Info ini digunakan untuk data Sertifikat.</p>
//                 </div>

//                 {/* Field Lainnya */}
//                 <div>
//                     <label className="block text-sm font-bold text-gray-700 mb-1" htmlFor="title">Judul</label>
//                     <input id="title" required className="w-full border rounded-lg px-3 py-2" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-bold text-gray-700 mb-1" htmlFor="description">Deskripsi</label>
//                     <textarea id="description" className="w-full border rounded-lg px-3 py-2" rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                     <div>
//                         <label className="block text-sm font-bold text-gray-700 mb-1" htmlFor="category">Kategori</label>
//                         <select id="category" className="w-full border rounded-lg px-3 py-2" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}><option value="Health">Health</option><option value="Safety">Safety</option><option value="General">General</option><option value="Disaster">Disaster</option></select>
//                     </div>
//                     <div>
//                         <label className="block text-sm font-bold text-gray-700 mb-1" htmlFor="type">Tipe</label>
//                         <select id="type" className="w-full border rounded-lg px-3 py-2" value={formData.programType} onChange={e => setFormData({...formData, programType: e.target.value})}><option value="training">Training</option><option value="course">Course</option></select>
//                     </div>
//                 </div>
//                 <div>
//                     <label className="block text-sm font-bold text-gray-700 mb-1" htmlFor="price">Biaya (Rp)</label>
//                     <input id="price" type="number" min="0" className="w-full border rounded-lg px-3 py-2" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-bold text-gray-700 mb-1" htmlFor="cover">Cover Image</label>
//                     {formData.thumbnailUrl && <img src={getImageUrl(formData.thumbnailUrl)} alt="Preview" className="h-32 w-full object-cover mb-2 rounded-lg border" />}
//                     <input id="cover" type="file" accept="image/*" onChange={e => setThumbnailFile(e.target.files?.[0] || null)} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 cursor-pointer" />
//                 </div>
//                 <div className="flex justify-end gap-3 pt-4 border-t">
//                   <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg font-bold">Batal</button>
//                   <button type="submit" className="px-5 py-2.5 bg-red-700 text-white rounded-lg font-bold hover:bg-red-800">Simpan</button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </Protected>
//   );
// }

'use client';

import { useState, useEffect, useRef } from 'react';
import { api, getImageUrl, apiUpload } from '@/lib/api';
import Protected from '@/components/Protected';
import Link from 'next/link';
import { 
    Plus, Pencil, Trash2, Settings, Send, CheckCircle, BellRing, Building2, 
    FileText, UploadCloud, X, Download 
} from 'lucide-react';

export default function CourseManagementPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [publishingId, setPublishingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState('');
  
  // --- FORM STATE ---
  const [formData, setFormData] = useState({
    title: '', description: '', category: 'Health', programType: 'training',
    price: 0, thumbnailUrl: '', isPublished: false,
    organizer: 'PMI Pusat',
    registrationMode: 'manual',
  });
  
  const [regTemplates, setRegTemplates] = useState<{ title: string, url: string }[]>([]);
  const [isUploadingTemplate, setIsUploadingTemplate] = useState(false);
  const templateInputRef = useRef<HTMLInputElement>(null);

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  useEffect(() => { loadCourses(); }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const res = await api('/api/courses'); 
      setCourses(res.courses || []);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const handlePublish = async (course: any) => {
      const isDraft = !course.isPublished;
      const msg = isDraft ? `Publikasikan "${course.title}"?` : `Kirim ULANG Notifikasi?`;
      if(!confirm(msg)) return;
      try {
          setPublishingId(course._id);
          await api(`/api/courses/${course._id}/publish`, { method: 'PATCH' });
          alert("Berhasil! Status diperbarui.");
          loadCourses();
      } catch (e: any) { alert("Gagal: " + e.message); } 
      finally { setPublishingId(null); }
  };

  const handleOpenModal = (course?: any) => {
    if (course) {
      setIsEditing(true); setCurrentId(course._id);
      setFormData({
        title: course.title, description: course.description, category: course.category,
        programType: course.programType || 'training', price: course.price || 0,
        thumbnailUrl: course.thumbnailUrl, isPublished: course.isPublished,
        organizer: course.organizer || 'PMI Pusat',
        registrationMode: course.registrationMode || 'manual'
      });
      setRegTemplates(course.registrationTemplates || []); 
    } else {
      setIsEditing(false);
      setFormData({ 
          title: '', description: '', category: 'Health', programType: 'training', 
          price: 0, thumbnailUrl: '', isPublished: false, organizer: 'PMI Pusat',
          registrationMode: 'manual' 
      });
      setRegTemplates([]);
    }
    setThumbnailFile(null); setIsModalOpen(true);
  };

  const handleTemplateUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files || files.length === 0) return;

      setIsUploadingTemplate(true);
      try {
          const file = files[0];
          const fd = new FormData();
          fd.append('file', file);
          
          const res = await apiUpload('/api/upload', fd);
          const url = res.url || res.file?.url;
          
          setRegTemplates(prev => [...prev, { title: file.name, url }]);
      } catch (err: any) {
          alert("Gagal upload template: " + err.message);
      } finally {
          setIsUploadingTemplate(false);
          if (templateInputRef.current) templateInputRef.current.value = '';
      }
  };

  const removeTemplate = (idx: number) => {
      setRegTemplates(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let finalThumbnailUrl = formData.thumbnailUrl;
      if (thumbnailFile) {
        const uploadData = new FormData(); uploadData.append('file', thumbnailFile);
        const uploadRes = await apiUpload('/api/upload', uploadData);
        finalThumbnailUrl = uploadRes.url || uploadRes.file.url;
      }
      
      const payload = { 
          ...formData, 
          thumbnailUrl: finalThumbnailUrl,
          registrationTemplates: regTemplates
      };

      if (isEditing) await api(`/api/courses/${currentId}`, { method: 'PUT', body: payload });
      else await api('/api/courses', { method: 'POST', body: payload });

      setIsModalOpen(false); loadCourses();
      alert(`Kursus berhasil ${isEditing ? 'diperbarui' : 'dibuat'}!`);
    } catch (error: any) { alert("Gagal menyimpan: " + error.message); }
  };

  const handleDelete = async (id: string) => {
    if(!confirm("Yakin hapus?")) return;
    try { await api(`/api/courses/${id}`, { method: 'DELETE' }); loadCourses(); } catch(e: any) { alert(e.message); }
  };

  const formatRupiah = (num: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);

  // Filter
  const filteredCourses = courses.filter(c => c.title.toLowerCase().includes(searchTerm.toLowerCase()));

  if (loading) return <div className="p-20 text-center">Memuat...</div>;

  return (
    <Protected roles={['FACILITATOR', 'SUPER_ADMIN']}>
      <div className="max-w-7xl mx-auto p-6 min-h-screen pb-20">
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <div><h1 className="text-2xl font-bold text-gray-800">Manajemen Pelatihan</h1><p className="text-gray-500 text-sm">Kelola kursus atau pelatihan.</p></div>
          <button onClick={() => handleOpenModal()} className="bg-red-700 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-red-800 flex items-center gap-2"><span>+</span> Buat Baru</button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b bg-gray-50">
             <input 
                className="w-full max-w-sm px-4 py-2 border rounded-lg text-sm" 
                placeholder="Cari judul..." 
                value={searchTerm} 
                onChange={e=>setSearchTerm(e.target.value)}
                aria-label="Cari Pelatihan"
             />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 border-b text-gray-700 uppercase text-xs tracking-wider">
                <tr><th className="p-4 w-24">Cover</th><th className="p-4">Info Pelatihan</th><th className="p-4">Pelaksana</th><th className="p-4">Biaya</th><th className="p-4 text-center">Status</th><th className="p-4 text-center">Aksi</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredCourses.length === 0 ? <tr><td colSpan={6} className="p-10 text-center text-gray-400">Belum ada data.</td></tr> :
                    filteredCourses.map(course => (
                      <tr key={course._id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4"><img src={getImageUrl(course.thumbnailUrl)} className="w-16 h-10 object-cover rounded bg-gray-200 border" alt="Cover"/></td>
                        <td className="p-4">
                            <p className="font-bold text-gray-800 line-clamp-1">{course.title}</p>
                            <div className="flex gap-2 mt-1">
                                <span className="text-[10px] px-2 py-0.5 rounded font-bold uppercase bg-blue-100 text-blue-700">{course.programType}</span>
                                {course.registrationMode === 'automatic' ? (
                                    <span className="text-[10px] px-2 py-0.5 rounded font-bold uppercase bg-green-100 text-green-700 flex items-center gap-1"><CheckCircle size={10}/> Auto</span>
                                ) : (
                                    <span className="text-[10px] px-2 py-0.5 rounded font-bold uppercase bg-orange-100 text-orange-700 flex items-center gap-1"><FileText size={10}/> Syarat</span>
                                )}
                            </div>
                        </td>
                        <td className="p-4 text-gray-600"><div className="flex items-center gap-1"><Building2 size={12}/> {course.organizer || 'PMI Pusat'}</div></td>
                        <td className="p-4 font-bold text-gray-700">{course.price === 0 ? <span className="text-green-600">Gratis</span> : formatRupiah(course.price)}</td>
                        <td className="p-4 text-center"><span className={`px-2 py-1 rounded-full text-xs font-bold ${course.isPublished ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{course.isPublished ? 'Published' : 'Draft'}</span></td>
                        <td className="p-4 flex justify-center gap-2">
                          <Link href={`/admin/courses/${course._id}`} aria-label="Kelola Modul" className="p-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 flex items-center gap-1" title="Kelola Modul"><Settings size={16}/></Link>
                          <button aria-label="Publikasikan Kursus" onClick={() => handlePublish(course)} disabled={publishingId === course._id} className={`p-2 rounded flex items-center gap-2 text-white transition disabled:opacity-50 ${course.isPublished ? 'bg-green-600' : 'bg-blue-600'}`} title="Publish">{publishingId === course._id ? '...' : <>{course.isPublished ? <BellRing size={16}/> : <Send size={16}/>}</>}</button>
                          <button aria-label="Edit Kursus" onClick={() => handleOpenModal(course)} className="p-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 border border-blue-200" title="Edit"><Pencil size={16}/></button>
                          <button aria-label="Hapus Kursus" onClick={() => handleDelete(course._id)} className="p-2 bg-red-50 text-red-600 rounded hover:bg-red-100 border border-red-200" title="Hapus"><Trash2 size={16}/></button>
                        </td>
                      </tr>
                    ))
                }
              </tbody>
            </table>
          </div>
        </div>

        {/* MODAL FORM */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white p-0 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95">
              <div className="p-5 border-b flex justify-between items-center bg-gray-50">
                  <h2 className="text-xl font-bold text-gray-800">{isEditing ? 'Edit Pelatihan' : 'Buat Pelatihan Baru'}</h2>
                  {/* [FIX] Button Name Error */}
                  <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-200" title="Tutup Modal" aria-label="Tutup Modal"><X size={20}/></button>
              </div>
              
              <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
                  <form id="courseForm" onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Info */}
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                        <label className="block text-xs font-bold text-blue-800 mb-1" htmlFor="organizer">Pelaksana Pelatihan</label>
                        {/* [FIX] Select Name Error */}
                        <select 
                            id="organizer"
                            className="w-full p-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none" 
                            value={formData.organizer} 
                            onChange={e => setFormData({...formData, organizer: e.target.value})}
                            title="Pilih Pelaksana Pelatihan"
                            aria-label="Pilih Pelaksana Pelatihan"
                        >
                            <option value="PMI Pusat">PMI Pusat</option>
                            <option value="PMI Provinsi">PMI Provinsi</option>
                            <option value="PMI Kabupaten/Kota">PMI Kabupaten/Kota</option>
                            <option value="PMI Kecamatan">PMI Kecamatan</option>
                            <option value="Unit PMR/KSR">Unit PMR/KSR</option>
                            <option value="Umum/Mitra">Umum/Mitra</option>
                        </select>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-600 mb-1" htmlFor="title">Judul Pelatihan</label>
                            <input id="title" required className="w-full p-3 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-red-500" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Contoh: Orientasi Kepalangmerahan"/>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-600 mb-1" htmlFor="description">Deskripsi Singkat</label>
                            <textarea id="description" className="w-full p-3 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-red-500 h-24" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Jelaskan tentang pelatihan ini..."/>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-600 mb-1" htmlFor="category">Kategori</label>
                                {/* [FIX] Select Name Error */}
                                <select 
                                    id="category" 
                                    className="w-full p-3 border rounded-xl text-sm bg-white" 
                                    value={formData.category} 
                                    onChange={e => setFormData({...formData, category: e.target.value})}
                                    title="Pilih Kategori"
                                    aria-label="Pilih Kategori"
                                >
                                    <option value="Health">Health</option>
                                    <option value="Safety">Safety</option>
                                    <option value="General">General</option>
                                    <option value="Disaster">Disaster</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-600 mb-1" htmlFor="type">Tipe Program</label>
                                {/* [FIX] Select Name Error */}
                                <select 
                                    id="type" 
                                    className="w-full p-3 border rounded-xl text-sm bg-white" 
                                    value={formData.programType} 
                                    onChange={e => setFormData({...formData, programType: e.target.value})}
                                    title="Pilih Tipe Program"
                                    aria-label="Pilih Tipe Program"
                                >
                                    <option value="training">Training (Pelatihan)</option>
                                    <option value="course">Course (Kursus)</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-600 mb-1" htmlFor="price">Biaya Pendaftaran (Rp)</label>
                            <input id="price" type="number" min="0" className="w-full p-3 border rounded-xl text-sm" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} placeholder="0 untuk Gratis"/>
                        </div>
                    </div>

                    {/* METODE PENDAFTARAN */}
                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                        <label className="block text-sm font-bold text-slate-800 mb-3 flex items-center gap-2"><Settings size={16}/> Metode Pendaftaran</label>
                        
                        <div className="space-y-3">
                            {/* [FIX] CSS Conflict: Hapus 'block' jika ada di level flex parent */}
                            <label className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${formData.registrationMode === 'automatic' ? 'bg-green-50 border-green-300 shadow-sm' : 'bg-white hover:bg-gray-50'}`}>
                                <div className="pt-0.5">
                                    <input 
                                        type="radio" 
                                        name="regMode" 
                                        value="automatic" 
                                        checked={formData.registrationMode === 'automatic'} 
                                        onChange={() => setFormData({...formData, registrationMode: 'automatic'})}
                                        className="w-4 h-4 text-green-600 focus:ring-green-500"
                                    />
                                </div>
                                <div>
                                    <span className="block text-sm font-bold text-gray-900">1. Penerimaan Otomatis (Langsung Aktif)</span>
                                    <span className="text-xs text-gray-500 leading-relaxed">Peserta mendaftar dengan biodata dan langsung bisa akses materi. Tidak perlu verifikasi admin.</span>
                                </div>
                            </label>

                            <label className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${formData.registrationMode === 'manual' ? 'bg-orange-50 border-orange-300 shadow-sm' : 'bg-white hover:bg-gray-50'}`}>
                                <div className="pt-0.5">
                                    <input 
                                        type="radio" 
                                        name="regMode" 
                                        value="manual" 
                                        checked={formData.registrationMode === 'manual'} 
                                        onChange={() => setFormData({...formData, registrationMode: 'manual'})}
                                        className="w-4 h-4 text-orange-600 focus:ring-orange-500"
                                    />
                                </div>
                                <div>
                                    <span className="block text-sm font-bold text-gray-900">2. Dengan Persyaratan (Butuh Verifikasi)</span>
                                    <span className="text-xs text-gray-500 leading-relaxed">Peserta harus mendownload & mengupload formulir. Admin wajib memverifikasi peserta di dashboard operator sebelum akses dibuka.</span>
                                </div>
                            </label>
                        </div>

                        {/* UPLOAD TEMPLATE FORMULIR */}
                        {formData.registrationMode === 'manual' && (
                            <div className="mt-4 pl-4 ml-2 border-l-2 border-orange-200 animate-in fade-in slide-in-from-top-2">
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-xs font-bold text-gray-700">Upload Template Formulir (Opsional)</label>
                                </div>
                                <p className="text-[10px] text-gray-500 mb-3 bg-white p-2 rounded border border-gray-200">
                                    <span className="font-bold">Info:</span> Upload file (Word/PDF) yang harus didownload, diisi, dan diupload kembali oleh peserta saat mendaftar.
                                </p>
                                
                                {regTemplates.length > 0 && (
                                    <div className="space-y-2 mb-3">
                                        {regTemplates.map((tpl, idx) => (
                                            <div key={idx} className="flex items-center justify-between bg-white p-2 rounded border border-gray-200 text-xs shadow-sm">
                                                <div className="flex items-center gap-2 text-blue-600 overflow-hidden">
                                                    <FileText size={14} className="shrink-0"/>
                                                    <a href={getImageUrl(tpl.url)} target="_blank" className="truncate hover:underline font-medium">{tpl.title}</a>
                                                </div>
                                                <button type="button" onClick={() => removeTemplate(idx)} className="text-red-500 hover:bg-red-50 p-1 rounded transition-colors" title="Hapus Template" aria-label="Hapus Template"><X size={14}/></button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="flex gap-2">
                                    {/* [FIX] Form elements must have labels */}
                                    <input 
                                        type="file" 
                                        ref={templateInputRef}
                                        className="hidden" 
                                        onChange={handleTemplateUpload}
                                        accept=".doc,.docx,.pdf"
                                        title="Upload Template Formulir"
                                        aria-label="Upload Template Formulir"
                                    />
                                    <button type="button" onClick={() => templateInputRef.current?.click()} disabled={isUploadingTemplate} className="bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-lg text-xs font-bold hover:bg-gray-50 flex items-center gap-2 shadow-sm w-full justify-center transition-colors">
                                        {isUploadingTemplate ? 'Mengupload...' : <><UploadCloud size={14}/> Tambah File Template</>}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1" htmlFor="cover">Cover Image</label>
                        {formData.thumbnailUrl && <img src={getImageUrl(formData.thumbnailUrl)} alt="Preview" className="h-32 w-full object-cover mb-2 rounded-lg border" />}
                        {/* [FIX] Form elements must have labels */}
                        <input 
                            id="cover"
                            type="file" 
                            accept="image/*" 
                            onChange={e => setThumbnailFile(e.target.files?.[0] || null)} 
                            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 cursor-pointer" 
                            title="Upload Cover Image"
                            aria-label="Upload Cover Image"
                        />
                    </div>
                  </form>
              </div>

              <div className="p-5 border-t bg-gray-50 flex justify-end gap-2 rounded-b-2xl">
                  <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl font-bold text-gray-500 hover:bg-gray-200 text-sm">Batal</button>
                  <button form="courseForm" type="submit" className="bg-red-700 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-red-800 text-sm flex items-center gap-2 shadow-lg">
                      {isEditing ? 'Simpan Perubahan' : 'Buat Pelatihan'}
                  </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Protected>
  );
}
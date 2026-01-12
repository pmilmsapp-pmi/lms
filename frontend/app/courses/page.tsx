
// // // // // // // // // // 'use client';
// // // // // // // // // // import { useEffect, useState } from 'react';
// // // // // // // // // // import { api } from '@/lib/api';

// // // // // // // // // // export default function CoursesPage() {
// // // // // // // // // //   const [courses, setCourses] = useState<any[]>([]);
// // // // // // // // // //   useEffect(() => { api('/api/courses').then(res => setCourses(res.courses)).catch(console.error); }, []);

// // // // // // // // // //   return (
// // // // // // // // // //     <div className="space-y-4">
// // // // // // // // // //       <h1 className="text-2xl font-bold">Kursus</h1>
// // // // // // // // // //       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // // // // // // // // //         {courses.map(c => (
// // // // // // // // // //           <a key={c._id} href={`/courses/${c._id}`} className="card block card-hover">
// // // // // // // // // //             <img src={c.thumbnailUrl || '/default-cover.png'} alt={c.title} className="w-full h-40 object-cover rounded-md mb-2" />
// // // // // // // // // //             <h2 className="text-lg font-semibold">{c.title}</h2>
// // // // // // // // // //             <p className="text-sm text-gray-600">{c.description}</p>
// // // // // // // // // //           </a>
// // // // // // // // // //         ))}
// // // // // // // // // //       </div>
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // }

// // // // // // // // // 'use client';

// // // // // // // // // import { useEffect, useState } from 'react';
// // // // // // // // // import Link from 'next/link';
// // // // // // // // // import { api } from '@/lib/api';

// // // // // // // // // // Interface Data Kursus
// // // // // // // // // interface Course {
// // // // // // // // //   _id: string;
// // // // // // // // //   title: string;
// // // // // // // // //   description: string;
// // // // // // // // //   thumbnailUrl?: string;
// // // // // // // // //   price: number;
// // // // // // // // //   category: string;
// // // // // // // // //   facilitatorId: {
// // // // // // // // //     _id: string;
// // // // // // // // //     name: string;
// // // // // // // // //     avatarUrl?: string;
// // // // // // // // //   };
// // // // // // // // //   modules: any[];
// // // // // // // // // }

// // // // // // // // // export default function CourseCatalogPage() {
// // // // // // // // //   const [courses, setCourses] = useState<Course[]>([]);
// // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // //   const [search, setSearch] = useState('');

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     loadCourses();
// // // // // // // // //   }, []);

// // // // // // // // //   const loadCourses = async () => {
// // // // // // // // //     try {
// // // // // // // // //       setLoading(true);
// // // // // // // // //       // Mengambil data dari endpoint publik yang baru kita perbaiki
// // // // // // // // //       const data = await api('/api/courses');
// // // // // // // // //       setCourses(data.courses || []);
// // // // // // // // //     } catch (err) {
// // // // // // // // //       console.error("Gagal memuat kursus:", err);
// // // // // // // // //     } finally {
// // // // // // // // //       setLoading(false);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   // Filter pencarian
// // // // // // // // //   const filteredCourses = courses.filter((c) =>
// // // // // // // // //     c.title.toLowerCase().includes(search.toLowerCase()) ||
// // // // // // // // //     c.category.toLowerCase().includes(search.toLowerCase())
// // // // // // // // //   );

// // // // // // // // //   // Formatter Rupiah
// // // // // // // // //   const formatRupiah = (amount: number) => {
// // // // // // // // //     return new Intl.NumberFormat('id-ID', {
// // // // // // // // //       style: 'currency',
// // // // // // // // //       currency: 'IDR',
// // // // // // // // //       minimumFractionDigits: 0,
// // // // // // // // //     }).format(amount);
// // // // // // // // //   };

// // // // // // // // //   return (
// // // // // // // // //     <div className="min-h-screen bg-gray-50 pb-20">
// // // // // // // // //       {/* HEADER SECTION */}
// // // // // // // // //       <div className="bg-white border-b sticky top-0 z-10">
// // // // // // // // //         <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
// // // // // // // // //           <div>
// // // // // // // // //             <h1 className="text-2xl font-bold text-gray-900">Katalog Kelas</h1>
// // // // // // // // //             <p className="text-sm text-gray-500">Temukan keahlian baru hari ini</p>
// // // // // // // // //           </div>
          
// // // // // // // // //           {/* Search Bar */}
// // // // // // // // //           <div className="relative w-full md:w-96">
// // // // // // // // //             <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
// // // // // // // // //             <input 
// // // // // // // // //               type="text"
// // // // // // // // //               placeholder="Cari kelas atau kategori..."
// // // // // // // // //               className="w-full pl-10 pr-4 py-2 border rounded-full bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
// // // // // // // // //               value={search}
// // // // // // // // //               onChange={(e) => setSearch(e.target.value)}
// // // // // // // // //               aria-label="Cari kursus"
// // // // // // // // //             />
// // // // // // // // //           </div>
// // // // // // // // //         </div>
// // // // // // // // //       </div>

// // // // // // // // //       {/* CONTENT SECTION */}
// // // // // // // // //       <div className="max-w-7xl mx-auto px-6 py-8">
        
// // // // // // // // //         {loading ? (
// // // // // // // // //           // SKELETON LOADING
// // // // // // // // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // // // // // // //             {[1, 2, 3, 4, 5, 6].map((i) => (
// // // // // // // // //               <div key={i} className="bg-white rounded-2xl shadow-sm border p-4 h-80 animate-pulse">
// // // // // // // // //                 <div className="bg-gray-200 h-40 rounded-xl mb-4"></div>
// // // // // // // // //                 <div className="bg-gray-200 h-4 w-3/4 rounded mb-2"></div>
// // // // // // // // //                 <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
// // // // // // // // //               </div>
// // // // // // // // //             ))}
// // // // // // // // //           </div>
// // // // // // // // //         ) : filteredCourses.length === 0 ? (
// // // // // // // // //           // EMPTY STATE
// // // // // // // // //           <div className="text-center py-20">
// // // // // // // // //             <div className="text-6xl mb-4">🕵️‍♀️</div>
// // // // // // // // //             <h2 className="text-xl font-bold text-gray-800">Kelas tidak ditemukan</h2>
// // // // // // // // //             <p className="text-gray-500">Coba kata kunci lain atau kembali lagi nanti.</p>
// // // // // // // // //             <button 
// // // // // // // // //               onClick={() => setSearch('')}
// // // // // // // // //               className="mt-4 text-blue-600 font-bold hover:underline"
// // // // // // // // //             >
// // // // // // // // //               Reset Pencarian
// // // // // // // // //             </button>
// // // // // // // // //           </div>
// // // // // // // // //         ) : (
// // // // // // // // //           // COURSE GRID
// // // // // // // // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// // // // // // // // //             {filteredCourses.map((course) => (
// // // // // // // // //               <Link href={`/courses/${course._id}`} key={course._id} className="group">
// // // // // // // // //                 <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
                  
// // // // // // // // //                   {/* Thumbnail Image */}
// // // // // // // // //                   <div className="relative h-48 bg-gray-200 overflow-hidden">
// // // // // // // // //                     {/* eslint-disable-next-line @next/next/no-img-element */}
// // // // // // // // //                     <img 
// // // // // // // // //                       src={course.thumbnailUrl || 'https://via.placeholder.com/400x250?text=No+Cover'} 
// // // // // // // // //                       alt={course.title}
// // // // // // // // //                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
// // // // // // // // //                     />
// // // // // // // // //                     <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-700 shadow-sm uppercase tracking-wider">
// // // // // // // // //                       {course.category}
// // // // // // // // //                     </div>
// // // // // // // // //                   </div>

// // // // // // // // //                   {/* Card Body */}
// // // // // // // // //                   <div className="p-5 flex flex-col flex-1">
// // // // // // // // //                     <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
// // // // // // // // //                       {course.title}
// // // // // // // // //                     </h3>
                    
// // // // // // // // //                     {/* Facilitator Info */}
// // // // // // // // //                     <div className="flex items-center gap-2 mb-4">
// // // // // // // // //                       <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden">
// // // // // // // // //                          {/* eslint-disable-next-line @next/next/no-img-element */}
// // // // // // // // //                         <img 
// // // // // // // // //                           src={course.facilitatorId?.avatarUrl || `https://ui-avatars.com/api/?name=${course.facilitatorId?.name || 'F'}`} 
// // // // // // // // //                           alt="Avatar"
// // // // // // // // //                         />
// // // // // // // // //                       </div>
// // // // // // // // //                       <span className="text-xs text-gray-500 font-medium truncate">
// // // // // // // // //                         {course.facilitatorId?.name || 'Instruktur'}
// // // // // // // // //                       </span>
// // // // // // // // //                     </div>

// // // // // // // // //                     {/* Footer: Price & Modules */}
// // // // // // // // //                     <div className="mt-auto flex justify-between items-end border-t pt-4">
// // // // // // // // //                       <div>
// // // // // // // // //                         <p className="text-xs text-gray-400 font-medium">Harga</p>
// // // // // // // // //                         <p className="text-lg font-bold text-green-700">
// // // // // // // // //                           {course.price === 0 ? 'GRATIS' : formatRupiah(course.price)}
// // // // // // // // //                         </p>
// // // // // // // // //                       </div>
// // // // // // // // //                       <div className="text-right">
// // // // // // // // //                          <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-lg font-bold">
// // // // // // // // //                            Akses Kelas →
// // // // // // // // //                          </span>
// // // // // // // // //                       </div>
// // // // // // // // //                     </div>
// // // // // // // // //                   </div>
// // // // // // // // //                 </div>
// // // // // // // // //               </Link>
// // // // // // // // //             ))}
// // // // // // // // //           </div>
// // // // // // // // //         )}
// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }
// // // // // // // // 'use client';

// // // // // // // // import { useEffect, useState } from 'react';
// // // // // // // // import { api } from '@/lib/api';
// // // // // // // // import CourseCard from '@/components/CourseCard'; // Import komponen baru

// // // // // // // // export default function CoursesPage() {
// // // // // // // //   const [courses, setCourses] = useState<any[]>([]);
// // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // //   const [search, setSearch] = useState('');

// // // // // // // //   useEffect(() => {
// // // // // // // //     loadCourses();
// // // // // // // //   }, []);

// // // // // // // //   const loadCourses = async () => {
// // // // // // // //     try {
// // // // // // // //       setLoading(true);
// // // // // // // //       // Ambil semua kursus yang published
// // // // // // // //       const res = await api('/api/courses'); 
// // // // // // // //       setCourses(res.courses || []);
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error(error);
// // // // // // // //     } finally {
// // // // // // // //       setLoading(false);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   // Filter Search Client-side
// // // // // // // //   const filteredCourses = courses.filter(c => 
// // // // // // // //     c.title.toLowerCase().includes(search.toLowerCase())
// // // // // // // //   );

// // // // // // // //   return (
// // // // // // // //     <div className="min-h-screen bg-gray-50 pb-20">
// // // // // // // //       {/* Header */}
// // // // // // // //       <div className="bg-white border-b py-12 px-6">
// // // // // // // //         <div className="max-w-6xl mx-auto">
// // // // // // // //           <h1 className="text-3xl font-bold text-gray-900 mb-4">Katalog Kelas & Pelatihan</h1>
// // // // // // // //           <input 
// // // // // // // //             type="text" 
// // // // // // // //             placeholder="🔍 Cari topik pelatihan..." 
// // // // // // // //             className="w-full max-w-md p-3 border rounded-xl bg-gray-50 focus:bg-white transition-all outline-none focus:ring-2 focus:ring-blue-100"
// // // // // // // //             value={search}
// // // // // // // //             onChange={(e) => setSearch(e.target.value)}
// // // // // // // //           />
// // // // // // // //         </div>
// // // // // // // //       </div>

// // // // // // // //       {/* Grid Content */}
// // // // // // // //       <div className="max-w-6xl mx-auto px-6 py-10">
// // // // // // // //         {loading ? (
// // // // // // // //           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // // // // // // //             {[1,2,3].map(i => (
// // // // // // // //               <div key={i} className="h-80 bg-gray-200 rounded-xl animate-pulse"></div>
// // // // // // // //             ))}
// // // // // // // //           </div>
// // // // // // // //         ) : filteredCourses.length > 0 ? (
// // // // // // // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// // // // // // // //             {filteredCourses.map((course) => (
// // // // // // // //               <CourseCard key={course._id} course={course} />
// // // // // // // //             ))}
// // // // // // // //           </div>
// // // // // // // //         ) : (
// // // // // // // //           <div className="text-center py-20 text-gray-400">
// // // // // // // //             <p className="text-xl">Belum ada kelas yang tersedia.</p>
// // // // // // // //           </div>
// // // // // // // //         )}
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // }
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
// // // // // //     price: 0, thumbnailUrl: '', isPublished: false,
// // // // // //     organizer: 'PMI Pusat' // Organizer
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

// // // // // //   const handlePublish = async (course: any) => {
// // // // // //       const isDraft = !course.isPublished;
// // // // // //       const msg = isDraft ? `Publikasikan "${course.title}"?` : `Kirim ULANG Notifikasi?`;
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
// // // // // //         thumbnailUrl: course.thumbnailUrl, isPublished: course.isPublished,
// // // // // //         organizer: course.organizer || 'PMI Pusat'
// // // // // //       });
// // // // // //     } else {
// // // // // //       setIsEditing(false);
// // // // // //       setFormData({ 
// // // // // //           title: '', description: '', category: 'Health', programType: 'training', 
// // // // // //           price: 0, thumbnailUrl: '', isPublished: false, organizer: 'PMI Pusat'
// // // // // //       });
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
// // // // // //               <tr><th className="p-4 w-24">Cover</th><th className="p-4">Info Pelatihan</th><th className="p-4">Pelaksana</th><th className="p-4">Biaya</th><th className="p-4 text-center">Status</th><th className="p-4 text-center">Aksi</th></tr>
// // // // // //             </thead>
// // // // // //             <tbody className="divide-y divide-gray-100">
// // // // // //               {courses.length === 0 ? <tr><td colSpan={6} className="p-10 text-center text-gray-400">Belum ada data.</td></tr> :
// // // // // //                   courses.map(course => (
// // // // // //                     <tr key={course._id} className="hover:bg-gray-50 transition-colors">
// // // // // //                       <td className="p-4"><img src={getImageUrl(course.thumbnailUrl)} className="w-16 h-10 object-cover rounded bg-gray-200 border" alt="Cover"/></td>
// // // // // //                       <td className="p-4"><p className="font-bold text-gray-800 line-clamp-1">{course.title}</p><span className="text-[10px] px-2 py-0.5 rounded font-bold uppercase bg-blue-100 text-blue-700">{course.programType}</span> <span className="text-xs text-gray-500">• {course.category}</span></td>
// // // // // //                       <td className="p-4 text-gray-600 text-xs">{course.organizer || 'PMI Pusat'}</td>
// // // // // //                       <td className="p-4 font-bold text-gray-700">{course.price === 0 ? <span className="text-green-600">Gratis</span> : formatRupiah(course.price)}</td>
// // // // // //                       <td className="p-4 text-center"><span className={`px-2 py-1 rounded-full text-xs font-bold ${course.isPublished ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{course.isPublished ? 'Published' : 'Draft'}</span></td>
                      
// // // // // //                       <td className="p-4 flex justify-center gap-2">
// // // // // //                         <Link href={`/admin/courses/${course._id}`} className="p-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 text-xs font-bold border border-gray-300 flex items-center gap-1" title="Kelola Modul"><Settings size={14}/> Kelola Modul</Link>
// // // // // //                         <button onClick={() => handlePublish(course)} disabled={publishingId === course._id} className={`p-2 rounded flex items-center gap-2 text-white transition disabled:opacity-50 ${course.isPublished ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`} title="Publish/Blast" aria-label="Publikasikan">{publishingId === course._id ? '...' : <>{course.isPublished ? <BellRing size={16}/> : <Send size={16}/>}</>}</button>
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
                
// // // // // //                 {/* 1. PELAKSANA PELATIHAN - FIX A11Y */}
// // // // // //                 <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
// // // // // //                     <label className="block text-sm font-bold text-blue-800 mb-1">Pelaksana Pelatihan</label>
// // // // // //                     <select 
// // // // // //                         className="w-full border rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none font-medium" 
// // // // // //                         value={formData.organizer} 
// // // // // //                         onChange={e => setFormData({...formData, organizer: e.target.value})}
// // // // // //                         aria-label="Pilih Pelaksana Pelatihan" // FIX
// // // // // //                     >
// // // // // //                         <option value="PMI Pusat">PMI Pusat</option>
// // // // // //                         <option value="PMI Provinsi">PMI Provinsi</option>
// // // // // //                         <option value="PMI Kabupaten/Kota">PMI Kabupaten/Kota</option>
// // // // // //                         <option value="PMI Kecamatan">PMI Kecamatan</option>
// // // // // //                         <option value="Unit PMR/KSR">Unit PMR/KSR</option>
// // // // // //                         <option value="Umum/Mitra">Umum/Mitra</option>
// // // // // //                     </select>
// // // // // //                     <p className="text-xs text-blue-600 mt-1">Info ini akan digunakan untuk kop/tanda tangan sertifikat.</p>
// // // // // //                 </div>

// // // // // //                 {/* 2. JUDUL - FIX A11Y */}
// // // // // //                 <div>
// // // // // //                     <label className="block text-sm font-bold text-gray-700 mb-1">Judul</label>
// // // // // //                     <input 
// // // // // //                         required 
// // // // // //                         className="w-full border rounded-lg px-3 py-2" 
// // // // // //                         value={formData.title} 
// // // // // //                         onChange={e => setFormData({...formData, title: e.target.value})} 
// // // // // //                         aria-label="Judul Pelatihan" 
// // // // // //                         placeholder="Contoh: Pelatihan Dasar"
// // // // // //                     />
// // // // // //                 </div>

// // // // // //                 {/* 3. DESKRIPSI - FIX A11Y */}
// // // // // //                 <div>
// // // // // //                     <label className="block text-sm font-bold text-gray-700 mb-1">Deskripsi</label>
// // // // // //                     <textarea 
// // // // // //                         className="w-full border rounded-lg px-3 py-2" 
// // // // // //                         rows={3} 
// // // // // //                         value={formData.description} 
// // // // // //                         onChange={e => setFormData({...formData, description: e.target.value})} 
// // // // // //                         aria-label="Deskripsi Pelatihan" 
// // // // // //                         placeholder="Deskripsi singkat..."
// // // // // //                     />
// // // // // //                 </div>
                
// // // // // //                 <div className="grid grid-cols-2 gap-4">
// // // // // //                     {/* 4. KATEGORI - FIX A11Y */}
// // // // // //                     <div>
// // // // // //                         <label className="block text-sm font-bold text-gray-700 mb-1">Kategori</label>
// // // // // //                         <select 
// // // // // //                             className="w-full border rounded-lg px-3 py-2" 
// // // // // //                             value={formData.category} 
// // // // // //                             onChange={e => setFormData({...formData, category: e.target.value})} 
// // // // // //                             aria-label="Pilih Kategori Pelatihan"
// // // // // //                         >
// // // // // //                             <option value="Health">Health</option>
// // // // // //                             <option value="Safety">Safety</option>
// // // // // //                             <option value="General">General</option>
// // // // // //                             <option value="Disaster">Disaster</option>
// // // // // //                         </select>
// // // // // //                     </div>

// // // // // //                     {/* 5. TIPE - FIX A11Y */}
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

// // // // // //                 {/* 6. BIAYA - FIX A11Y */}
// // // // // //                 <div>
// // // // // //                     <label className="block text-sm font-bold text-gray-700 mb-1">Biaya (Rp)</label>
// // // // // //                     <input 
// // // // // //                         type="number" 
// // // // // //                         min="0" 
// // // // // //                         className="w-full border rounded-lg px-3 py-2" 
// // // // // //                         value={formData.price} 
// // // // // //                         onChange={e => setFormData({...formData, price: Number(e.target.value)})} 
// // // // // //                         aria-label="Biaya Investasi" 
// // // // // //                         placeholder="0"
// // // // // //                     />
// // // // // //                 </div>
                
// // // // // //                 {/* 7. COVER - FIX A11Y */}
// // // // // //                 <div>
// // // // // //                     <label className="block text-sm font-bold text-gray-700 mb-1">Cover Image</label>
// // // // // //                     {formData.thumbnailUrl && <img src={getImageUrl(formData.thumbnailUrl)} className="h-32 w-full object-cover mb-2 rounded-lg border" alt="Preview"/>}
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
// // // // // // }




// // // // // 'use client';

// // // // // import { useState, useEffect } from 'react';
// // // // // import { api, getImageUrl } from '@/lib/api';
// // // // // import Link from 'next/link';
// // // // // import { Search, Building2, BookOpen, GraduationCap, Clock } from 'lucide-react';

// // // // // export default function PublicCourseCatalog() {
// // // // //   const [courses, setCourses] = useState<any[]>([]);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [search, setSearch] = useState('');
// // // // //   const [filterType, setFilterType] = useState('all'); // all, training, course

// // // // //   useEffect(() => {
// // // // //     loadCourses();
// // // // //   }, []);

// // // // //   const loadCourses = async () => {
// // // // //     try {
// // // // //       setLoading(true);
// // // // //       // Panggil endpoint publik (tanpa auth khusus)
// // // // //       const res = await api('/api/courses');
// // // // //       setCourses(res.courses || []);
// // // // //     } catch (e) {
// // // // //       console.error("Gagal memuat katalog:", e);
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   // Filter Client-Side
// // // // //   const filteredCourses = courses.filter(c => {
// // // // //     const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || 
// // // // //                         c.category.toLowerCase().includes(search.toLowerCase());
// // // // //     const matchType = filterType === 'all' ? true : c.programType === filterType;
// // // // //     return matchSearch && matchType;
// // // // //   });

// // // // //   const formatRupiah = (num: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);

// // // // //   return (
// // // // //     <div className="max-w-7xl mx-auto p-6 min-h-screen font-sans">
      
// // // // //       {/* HERO / HEADER */}
// // // // //       <div className="mb-10 text-center space-y-4">
// // // // //         <h1 className="text-4xl font-bold text-gray-800">Katalog Kelas & Pelatihan</h1>
// // // // //         <p className="text-gray-500 text-lg">Tingkatkan kompetensi Anda bersama PMI Humanis</p>
        
// // // // //         {/* SEARCH BAR */}
// // // // //         <div className="relative max-w-xl mx-auto mt-6">
// // // // //             <Search className="absolute left-4 top-3.5 text-gray-400" size={20}/>
// // // // //             <input 
// // // // //                 className="w-full pl-12 pr-6 py-3 border border-gray-300 rounded-full focus:ring-4 focus:ring-red-100 focus:border-red-500 outline-none shadow-sm text-gray-700" 
// // // // //                 placeholder="Cari topik pelatihan, kategori, atau judul..."
// // // // //                 value={search}
// // // // //                 onChange={(e) => setSearch(e.target.value)}
// // // // //             />
// // // // //         </div>

// // // // //         {/* FILTER BUTTONS */}
// // // // //         <div className="flex justify-center gap-3 mt-4">
// // // // //             <button onClick={() => setFilterType('all')} className={`px-4 py-1.5 rounded-full text-sm font-bold border ${filterType === 'all' ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'}`}>Semua</button>
// // // // //             <button onClick={() => setFilterType('training')} className={`px-4 py-1.5 rounded-full text-sm font-bold border ${filterType === 'training' ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-600 border-gray-300 hover:bg-purple-50'}`}>Diklat/Pelatihan</button>
// // // // //             <button onClick={() => setFilterType('course')} className={`px-4 py-1.5 rounded-full text-sm font-bold border ${filterType === 'course' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-300 hover:bg-blue-50'}`}>Kursus Online</button>
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* COURSE GRID */}
// // // // //       {loading ? (
// // // // //         <div className="text-center py-20 text-gray-400 animate-pulse">Memuat katalog...</div>
// // // // //       ) : filteredCourses.length === 0 ? (
// // // // //         <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
// // // // //             <p className="text-gray-500 font-bold">Tidak ada pelatihan yang ditemukan.</p>
// // // // //             <p className="text-sm text-gray-400 mt-1">Coba kata kunci lain atau ubah filter.</p>
// // // // //         </div>
// // // // //       ) : (
// // // // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// // // // //             {filteredCourses.map((course) => (
// // // // //                 <Link href={`/courses/${course._id}`} key={course._id} className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 block">
// // // // //                     {/* THUMBNAIL */}
// // // // //                     <div className="relative h-48 bg-gray-200 overflow-hidden">
// // // // //                         <img 
// // // // //                             src={getImageUrl(course.thumbnailUrl)} 
// // // // //                             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
// // // // //                             alt={course.title} 
// // // // //                             onError={(e) => (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=No+Image'}
// // // // //                         />
// // // // //                         <div className="absolute top-3 left-3">
// // // // //                             <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm text-white ${course.programType === 'training' ? 'bg-purple-600' : 'bg-blue-600'}`}>
// // // // //                                 {course.programType || 'COURSE'}
// // // // //                             </span>
// // // // //                         </div>
// // // // //                         {/* HARGA BADGE */}
// // // // //                         <div className="absolute bottom-3 right-3">
// // // // //                             <span className="bg-white/95 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold text-gray-800 shadow-sm border border-gray-100">
// // // // //                                 {course.price === 0 ? 'GRATIS' : formatRupiah(course.price)}
// // // // //                             </span>
// // // // //                         </div>
// // // // //                     </div>

// // // // //                     {/* INFO */}
// // // // //                     <div className="p-5">
// // // // //                         <div className="flex items-center gap-2 mb-2 text-xs text-gray-500 font-medium">
// // // // //                             <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600 border border-gray-200">{course.category || 'Umum'}</span>
// // // // //                             <span>•</span>
// // // // //                             {/* PELAKSANA */}
// // // // //                             <span className="flex items-center gap-1 text-red-600"><Building2 size={12}/> {course.organizer || 'PMI Pusat'}</span>
// // // // //                         </div>

// // // // //                         <h3 className="text-lg font-bold text-gray-800 leading-snug mb-2 group-hover:text-red-700 transition-colors line-clamp-2" title={course.title}>
// // // // //                             {course.title}
// // // // //                         </h3>
                        
// // // // //                         <p className="text-sm text-gray-500 line-clamp-2 mb-4 h-10">
// // // // //                             {course.description || 'Tidak ada deskripsi singkat.'}
// // // // //                         </p>

// // // // //                         <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
// // // // //                             <div className="flex items-center gap-1">
// // // // //                                 <BookOpen size={14}/> <span>{course.modules?.length || 0} Modul</span>
// // // // //                             </div>
// // // // //                             <div className="flex items-center gap-1">
// // // // //                                 <GraduationCap size={14}/> <span>Sertifikat</span>
// // // // //                             </div>
// // // // //                         </div>
// // // // //                     </div>
// // // // //                 </Link>
// // // // //             ))}
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // }
// // // // 'use client';

// // // // import { useState, useEffect } from 'react';
// // // // import { api, getImageUrl } from '@/lib/api';
// // // // import Link from 'next/link';
// // // // import { Search, Building2, BookOpen, GraduationCap } from 'lucide-react';

// // // // export default function PublicCourseCatalog() {
// // // //   const [courses, setCourses] = useState<any[]>([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [search, setSearch] = useState('');
// // // //   const [filterType, setFilterType] = useState('all'); // all, training, course

// // // //   useEffect(() => {
// // // //     loadCourses();
// // // //   }, []);

// // // //   const loadCourses = async () => {
// // // //     try {
// // // //       setLoading(true);
// // // //       // [FIX] Panggil endpoint /published, BUKAN /api/courses biasa
// // // //       // Endpoint ini tidak butuh token login, jadi aman untuk publik
// // // //       const res = await api('/api/courses/published');
      
// // // //       console.log("Data Katalog:", res); // Cek console browser (F12)
// // // //       setCourses(res.courses || []);
// // // //     } catch (e) {
// // // //       console.error("Gagal memuat katalog:", e);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   // Filter Client-Side
// // // //   const filteredCourses = courses.filter(c => {
// // // //     const matchSearch = c.title?.toLowerCase().includes(search.toLowerCase()) || 
// // // //                         c.category?.toLowerCase().includes(search.toLowerCase());
// // // //     const matchType = filterType === 'all' ? true : c.programType === filterType;
// // // //     return matchSearch && matchType;
// // // //   });

// // // //   const formatRupiah = (num: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);

// // // //   return (
// // // //     <div className="max-w-7xl mx-auto p-6 min-h-screen font-sans">
      
// // // //       {/* HEADER */}
// // // //       <div className="mb-10 text-center space-y-4 pt-10">
// // // //         <h1 className="text-4xl font-bold text-gray-800">Katalog Kelas & Pelatihan</h1>
// // // //         <p className="text-gray-500 text-lg">Tingkatkan kompetensi Anda bersama PMI Humanis</p>
        
// // // //         {/* SEARCH BAR */}
// // // //         <div className="relative max-w-xl mx-auto mt-6">
// // // //             <Search className="absolute left-4 top-3.5 text-gray-400" size={20}/>
// // // //             <input 
// // // //                 className="w-full pl-12 pr-6 py-3 border border-gray-300 rounded-full focus:ring-4 focus:ring-red-100 focus:border-red-500 outline-none shadow-sm text-gray-700" 
// // // //                 placeholder="Cari topik pelatihan, kategori, atau judul..."
// // // //                 value={search}
// // // //                 onChange={(e) => setSearch(e.target.value)}
// // // //             />
// // // //         </div>

// // // //         {/* FILTER BUTTONS */}
// // // //         <div className="flex justify-center gap-3 mt-4">
// // // //             <button onClick={() => setFilterType('all')} className={`px-4 py-1.5 rounded-full text-sm font-bold border ${filterType === 'all' ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'}`}>Semua</button>
// // // //             <button onClick={() => setFilterType('training')} className={`px-4 py-1.5 rounded-full text-sm font-bold border ${filterType === 'training' ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-600 border-gray-300 hover:bg-purple-50'}`}>Diklat/Pelatihan</button>
// // // //             <button onClick={() => setFilterType('course')} className={`px-4 py-1.5 rounded-full text-sm font-bold border ${filterType === 'course' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-300 hover:bg-blue-50'}`}>Kursus Online</button>
// // // //         </div>
// // // //       </div>

// // // //       {/* COURSE GRID */}
// // // //       {loading ? (
// // // //         <div className="text-center py-20 text-gray-400 animate-pulse">Memuat katalog...</div>
// // // //       ) : filteredCourses.length === 0 ? (
// // // //         <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
// // // //             <p className="text-gray-500 font-bold">Tidak ada pelatihan yang ditemukan.</p>
// // // //             <p className="text-sm text-gray-400 mt-1">Coba kata kunci lain atau ubah filter.</p>
// // // //         </div>
// // // //       ) : (
// // // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
// // // //             {filteredCourses.map((course) => (
// // // //                 <Link href={`/courses/${course._id}`} key={course._id} className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 block">
// // // //                     {/* THUMBNAIL */}
// // // //                     <div className="relative h-48 bg-gray-200 overflow-hidden">
// // // //                         <img 
// // // //                             src={getImageUrl(course.thumbnailUrl)} 
// // // //                             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
// // // //                             alt={course.title} 
// // // //                             onError={(e) => (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=No+Image'}
// // // //                         />
// // // //                         <div className="absolute top-3 left-3">
// // // //                             <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm text-white ${course.programType === 'training' ? 'bg-purple-600' : 'bg-blue-600'}`}>
// // // //                                 {course.programType || 'COURSE'}
// // // //                             </span>
// // // //                         </div>
// // // //                         {/* HARGA BADGE */}
// // // //                         <div className="absolute bottom-3 right-3">
// // // //                             <span className="bg-white/95 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold text-gray-800 shadow-sm border border-gray-100">
// // // //                                 {course.price === 0 ? 'GRATIS' : formatRupiah(course.price)}
// // // //                             </span>
// // // //                         </div>
// // // //                     </div>

// // // //                     {/* INFO */}
// // // //                     <div className="p-5">
// // // //                         <div className="flex items-center gap-2 mb-2 text-xs text-gray-500 font-medium">
// // // //                             <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600 border border-gray-200">{course.category || 'Umum'}</span>
// // // //                             <span>•</span>
// // // //                             <span className="flex items-center gap-1 text-red-600"><Building2 size={12}/> {course.organizer || 'PMI Pusat'}</span>
// // // //                         </div>

// // // //                         <h3 className="text-lg font-bold text-gray-800 leading-snug mb-2 group-hover:text-red-700 transition-colors line-clamp-2" title={course.title}>
// // // //                             {course.title}
// // // //                         </h3>
                        
// // // //                         <p className="text-sm text-gray-500 line-clamp-2 mb-4 h-10">
// // // //                             {course.description || 'Tidak ada deskripsi singkat.'}
// // // //                         </p>

// // // //                         <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
// // // //                             <div className="flex items-center gap-1">
// // // //                                 <BookOpen size={14}/> <span>{course.modules?.length || 0} Modul</span>
// // // //                             </div>
// // // //                             <div className="flex items-center gap-2">
// // // //                                 {/* Tampilkan Avatar Fasilitator jika ada */}
// // // //                                 {course.facilitatorIds && course.facilitatorIds.length > 0 && (
// // // //                                     <div className="flex -space-x-2">
// // // //                                         {course.facilitatorIds.slice(0,3).map((fac: any, idx: number) => (
// // // //                                             <img key={idx} src={getImageUrl(fac.avatarUrl)} className="w-6 h-6 rounded-full border border-white" title={fac.name} />
// // // //                                         ))}
// // // //                                     </div>
// // // //                                 )}
// // // //                             </div>
// // // //                         </div>
// // // //                     </div>
// // // //                 </Link>
// // // //             ))}
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }
// // // 'use client';

// // // import { useState, useEffect } from 'react';
// // // import { Search, BookOpen, Clock, Users, Tag } from 'lucide-react';
// // // import Link from 'next/link';
// // // import { getImageUrl } from '@/lib/api'; // Pastikan helper ini ada

// // // export default function CoursesPage() {
// // //   const [courses, setCourses] = useState<any[]>([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [searchTerm, setSearchTerm] = useState('');
// // //   const [filterType, setFilterType] = useState('all'); // all, training, course

// // //   useEffect(() => {
// // //     fetchPublishedCourses();
// // //   }, []);

// // //   const fetchPublishedCourses = async () => {
// // //     try {
// // //       setLoading(true);
// // //       // [PENTING] Mengambil data dari endpoint PUBLIK (hanya yang isPublished: true)
// // //       const res = await fetch('http://localhost:4000/api/courses/published');
// // //       const data = await res.json();
      
// // //       if (data.courses) {
// // //         setCourses(data.courses);
// // //       }
// // //     } catch (error) {
// // //       console.error("Gagal memuat katalog:", error);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // Logika Filter Frontend
// // //   const filteredCourses = courses.filter(course => {
// // //     const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
// // //                           (course.category && course.category.toLowerCase().includes(searchTerm.toLowerCase()));
// // //     const matchesType = filterType === 'all' || course.programType === filterType;
    
// // //     return matchesSearch && matchesType;
// // //   });

// // //   return (
// // //     <div className="min-h-screen bg-gray-50 pb-20">
// // //       {/* HEADER */}
// // //       <div className="bg-white border-b border-gray-200 pt-24 pb-12 px-6 text-center">
// // //         <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Katalog Kelas & Pelatihan</h1>
// // //         <p className="text-gray-500 mb-8 max-w-2xl mx-auto">Tingkatkan kompetensi Anda bersama PMI Humanis. Temukan berbagai pelatihan dan kursus yang sesuai dengan kebutuhan Anda.</p>
        
// // //         {/* SEARCH BAR */}
// // //         <div className="max-w-xl mx-auto relative">
// // //           <input 
// // //             type="text" 
// // //             placeholder="Cari topik pelatihan, kategori, atau judul..." 
// // //             className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none shadow-sm transition-all"
// // //             value={searchTerm}
// // //             onChange={(e) => setSearchTerm(e.target.value)}
// // //           />
// // //           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
// // //         </div>

// // //         {/* FILTER BUTTONS */}
// // //         <div className="flex justify-center gap-3 mt-6">
// // //           <button 
// // //             onClick={() => setFilterType('all')}
// // //             className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${filterType === 'all' ? 'bg-gray-900 text-white' : 'bg-white border hover:bg-gray-50 text-gray-600'}`}
// // //           >
// // //             Semua
// // //           </button>
// // //           <button 
// // //             onClick={() => setFilterType('training')}
// // //             className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${filterType === 'training' ? 'bg-red-600 text-white' : 'bg-white border hover:bg-red-50 text-gray-600'}`}
// // //           >
// // //             Diklat/Pelatihan
// // //           </button>
// // //           <button 
// // //             onClick={() => setFilterType('course')}
// // //             className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${filterType === 'course' ? 'bg-blue-600 text-white' : 'bg-white border hover:bg-blue-50 text-gray-600'}`}
// // //           >
// // //             Kursus Online
// // //           </button>
// // //         </div>
// // //       </div>

// // //       {/* COURSE LIST */}
// // //       <div className="max-w-7xl mx-auto px-6 mt-12">
// // //         {loading ? (
// // //           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// // //             {[1,2,3].map(i => (
// // //               <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm h-80 animate-pulse">
// // //                 <div className="h-40 bg-gray-200"></div>
// // //                 <div className="p-6 space-y-3">
// // //                   <div className="h-4 bg-gray-200 rounded w-3/4"></div>
// // //                   <div className="h-4 bg-gray-200 rounded w-1/2"></div>
// // //                 </div>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         ) : filteredCourses.length > 0 ? (
// // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// // //             {filteredCourses.map((course) => (
// // //               <Link href={`/courses/${course._id}`} key={course._id} className="group">
// // //                 <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
// // //                   {/* Thumbnail */}
// // //                   <div className="relative h-48 overflow-hidden bg-gray-100">
// // //                     {course.thumbnailUrl ? (
// // //                       <img 
// // //                         src={getImageUrl(course.thumbnailUrl)} 
// // //                         alt={course.title} 
// // //                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
// // //                       />
// // //                     ) : (
// // //                       <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-100">
// // //                         <BookOpen size={48} />
// // //                       </div>
// // //                     )}
// // //                     <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-gray-700 shadow-sm border border-white/50">
// // //                       {course.category || 'Umum'}
// // //                     </div>
// // //                     {course.programType === 'training' && (
// // //                       <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
// // //                         DIKLAT
// // //                       </div>
// // //                     )}
// // //                   </div>

// // //                   {/* Content */}
// // //                   <div className="p-6 flex-1 flex flex-col">
// // //                     <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-700 transition-colors line-clamp-2 mb-2">
// // //                       {course.title}
// // //                     </h3>
                    
// // //                     <div className="flex items-center gap-4 text-xs text-gray-500 mb-6">
// // //                       <div className="flex items-center gap-1">
// // //                         <Users size={14} />
// // //                         <span>{course.facilitatorIds?.length || 1} Fasilitator</span>
// // //                       </div>
// // //                       <div className="flex items-center gap-1">
// // //                         <Tag size={14} />
// // //                         <span>{course.level || 'Semua Level'}</span>
// // //                       </div>
// // //                     </div>

// // //                     <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
// // //                       <div className="flex items-center gap-2">
// // //                          {course.price > 0 ? (
// // //                              <span className="text-lg font-bold text-green-700">Rp {course.price.toLocaleString('id-ID')}</span>
// // //                          ) : (
// // //                              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">GRATIS</span>
// // //                          )}
// // //                       </div>
// // //                       <span className="text-sm font-bold text-red-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
// // //                         Detail <span className="text-lg">→</span>
// // //                       </span>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               </Link>
// // //             ))}
// // //           </div>
// // //         ) : (
// // //           <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
// // //             <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
// // //               <Search className="text-gray-400" size={32} />
// // //             </div>
// // //             <h3 className="text-lg font-bold text-gray-800">Tidak ada pelatihan yang ditemukan.</h3>
// // //             <p className="text-gray-500 text-sm mt-1">Coba kata kunci lain atau ubah filter.</p>
            
// // //             {/* HINT KHUSUS ADMIN (Hanya muncul jika di localhost untuk debugging) */}
// // //             <div className="mt-8 p-4 bg-yellow-50 text-yellow-800 text-xs rounded-lg inline-block max-w-md mx-auto text-left">
// // //                <strong>🔍 Tips Debugging:</strong> Jika Anda admin, pastikan status kursus di halaman admin sudah 
// // //                <span className="font-bold bg-green-200 px-1 mx-1 rounded">PUBLISHED</span> 
// // //                (bukan Draft).
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // 'use client';

// // import { useState, useEffect } from 'react';
// // import { Search, BookOpen, Users, Tag, CheckCircle2, AlertCircle } from 'lucide-react';
// // import Link from 'next/link';
// // import { getImageUrl, api } from '@/lib/api'; 

// // export default function CoursesPage() {
// //   const [courses, setCourses] = useState<any[]>([]);
// //   const [myEnrollments, setMyEnrollments] = useState<any[]>([]); 
// //   const [loading, setLoading] = useState(true);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [filterType, setFilterType] = useState('all');

// //   useEffect(() => {
// //     const fetchData = async () => {
// //         setLoading(true);
// //         try {
// //             // 1. Fetch Katalog
// //             const resCourses = await fetch('http://localhost:4000/api/courses/published');
// //             const dataCourses = await resCourses.json();
// //             if (dataCourses.courses) setCourses(dataCourses.courses);

// //             // 2. Fetch Status Pendaftaran User (Agar tahu mana yang Pending)
// //             const token = localStorage.getItem('token');
// //             if (token) {
// //                 // Cek status enrollment. 
// //                 // Jika API khusus tidak ada, gunakan /api/users/profile atau sejenisnya yg me-return data enrollments
// //                 try {
// //                     const resEnroll = await api('/api/enrollments/my-enrollments').catch(() => ({ enrollments: [] }));
// //                     if (resEnroll.enrollments) setMyEnrollments(resEnroll.enrollments);
// //                 } catch (e) { console.error("Gagal load enrollment info", e); }
// //             }
// //         } catch (error) {
// //             console.error("Gagal memuat data:", error);
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     fetchData();
// //   }, []);

// //   const filteredCourses = courses.filter(course => {
// //     const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
// //                           (course.category && course.category.toLowerCase().includes(searchTerm.toLowerCase()));
// //     const matchesType = filterType === 'all' || course.programType === filterType;
// //     return matchesSearch && matchesType;
// //   });

// //   // [HELPER] Cek Status Enrollment per Course
// //   const getEnrollmentStatus = (courseId: string) => {
// //       const enroll = myEnrollments.find((e: any) => (e.course?._id || e.course) === courseId);
// //       if (!enroll) return null;
// //       return enroll.status || 'pending'; // Default pending jika ada data tapi status kosong
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50 pb-20">
// //       <div className="bg-white border-b border-gray-200 pt-24 pb-12 px-6 text-center">
// //         <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Katalog Kelas & Pelatihan</h1>
// //         <p className="text-gray-500 mb-8 max-w-2xl mx-auto">Tingkatkan kompetensi Anda bersama PMI Humanis. Temukan berbagai pelatihan dan kursus yang sesuai dengan kebutuhan Anda.</p>
        
// //         <div className="max-w-xl mx-auto relative">
// //           <input 
// //             type="text" 
// //             placeholder="Cari topik pelatihan, kategori, atau judul..." 
// //             className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none shadow-sm transition-all"
// //             value={searchTerm}
// //             onChange={(e) => setSearchTerm(e.target.value)}
// //           />
// //           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
// //         </div>

// //         <div className="flex justify-center gap-3 mt-6">
// //           <button onClick={() => setFilterType('all')} className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${filterType === 'all' ? 'bg-gray-900 text-white' : 'bg-white border hover:bg-gray-50 text-gray-600'}`}>Semua</button>
// //           <button onClick={() => setFilterType('training')} className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${filterType === 'training' ? 'bg-red-600 text-white' : 'bg-white border hover:bg-red-50 text-gray-600'}`}>Diklat/Pelatihan</button>
// //           <button onClick={() => setFilterType('course')} className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${filterType === 'course' ? 'bg-blue-600 text-white' : 'bg-white border hover:bg-blue-50 text-gray-600'}`}>Kursus Online</button>
// //         </div>
// //       </div>

// //       <div className="max-w-7xl mx-auto px-6 mt-12">
// //         {loading ? (
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// //             {[1,2,3].map(i => (<div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm h-80 animate-pulse"><div className="h-40 bg-gray-200"></div><div className="p-6 space-y-3"><div className="h-4 bg-gray-200 rounded w-3/4"></div><div className="h-4 bg-gray-200 rounded w-1/2"></div></div></div>))}
// //           </div>
// //         ) : filteredCourses.length > 0 ? (
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// //             {filteredCourses.map((course) => {
// //                 // [FIX STATUS] Ambil status untuk UI
// //                 const status = getEnrollmentStatus(course._id);
// //                 const isPending = status === 'pending' || status === 'waiting';
// //                 const isActive = status === 'active' || status === 'approved';

// //                 return (
// //                   <Link href={`/courses/${course._id}`} key={course._id} className="group relative block h-full">
// //                     <div className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full ${isPending ? 'ring-2 ring-amber-300' : ''}`}>
                      
// //                       {/* LABEL STATUS DI POJOK ATAS */}
// //                       {isPending && (
// //                           <div className="absolute top-0 left-0 right-0 bg-amber-100 text-amber-800 text-[10px] font-bold px-3 py-1.5 flex items-center justify-center gap-1 z-20 border-b border-amber-200">
// //                               <AlertCircle size={12}/> MENUNGGU PERSETUJUAN
// //                           </div>
// //                       )}
// //                       {isActive && (
// //                           <div className="absolute top-0 left-0 right-0 bg-green-100 text-green-800 text-[10px] font-bold px-3 py-1.5 flex items-center justify-center gap-1 z-20 border-b border-green-200">
// //                               <CheckCircle2 size={12}/> TERDAFTAR
// //                           </div>
// //                       )}

// //                       <div className={`relative h-48 overflow-hidden bg-gray-100 ${isPending || isActive ? 'mt-8' : ''}`}>
// //                         {course.thumbnailUrl ? (
// //                           <img src={getImageUrl(course.thumbnailUrl)} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
// //                         ) : (<div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-100"><BookOpen size={48} /></div>)}
                        
// //                         {!isPending && !isActive && (
// //                             <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-gray-700 shadow-sm border border-white/50">
// //                             {course.category || 'Umum'}
// //                             </div>
// //                         )}
                        
// //                         {course.programType === 'training' && (
// //                           <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">DIKLAT</div>
// //                         )}
// //                       </div>

// //                       <div className="p-6 flex-1 flex flex-col">
// //                         <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-700 transition-colors line-clamp-2 mb-2">
// //                           {course.title}
// //                         </h3>
// //                         <div className="flex items-center gap-4 text-xs text-gray-500 mb-6">
// //                           <div className="flex items-center gap-1"><Users size={14} /><span>{course.facilitatorIds?.length || 1} Fasilitator</span></div>
// //                           <div className="flex items-center gap-1"><Tag size={14} /><span>{course.level || 'Semua Level'}</span></div>
// //                         </div>
// //                         <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
// //                           <div className="flex items-center gap-2">
// //                               {course.price > 0 ? (<span className="text-lg font-bold text-green-700">Rp {course.price.toLocaleString('id-ID')}</span>) : (<span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">GRATIS</span>)}
// //                           </div>
                          
// //                           {/* TOMBOL BERUBAH SESUAI STATUS */}
// //                           <span className={`text-sm font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform ${isPending ? 'text-amber-600' : isActive ? 'text-green-600' : 'text-red-600'}`}>
// //                             {isActive ? 'Lanjut Belajar' : isPending ? 'Lihat Status' : 'Detail'} <span className="text-lg">→</span>
// //                           </span>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </Link>
// //                 );
// //             })}
// //           </div>
// //         ) : (
// //           <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
// //             <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"><Search className="text-gray-400" size={32} /></div>
// //             <h3 className="text-lg font-bold text-gray-800">Tidak ada pelatihan yang ditemukan.</h3>
// //             <p className="text-gray-500 text-sm mt-1">Coba kata kunci lain atau ubah filter.</p>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }
// 'use client';

// import { useState, useEffect } from 'react';
// import { Search, BookOpen, Users, Tag, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
// import Link from 'next/link';
// import { getImageUrl, api } from '@/lib/api'; 

// export default function CoursesPage() {
//   const [courses, setCourses] = useState<any[]>([]);
//   const [myEnrollments, setMyEnrollments] = useState<any[]>([]); 
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterType, setFilterType] = useState('all');

//   useEffect(() => {
//     const fetchData = async () => {
//         setLoading(true);
//         try {
//             // 1. Fetch Katalog Publik
//             const resCourses = await api('/api/courses/published'); // Gunakan helper api agar base URL otomatis
//             const dataCourses = resCourses.courses || resCourses;
//             if (Array.isArray(dataCourses)) setCourses(dataCourses);

//             // 2. Fetch Status Pendaftaran User Terbaru
//             const token = localStorage.getItem('token');
//             if (token) {
//                 try {
//                     // Panggil endpoint yang baru diperbaiki di backend
//                     const resEnroll = await api('/api/enrollments/my-enrollments');
//                     console.log("My Enrollments Data:", resEnroll); // Debugging
//                     if (resEnroll.enrollments) setMyEnrollments(resEnroll.enrollments);
//                 } catch (e) { console.error("Gagal load enrollment info", e); }
//             }
//         } catch (error) {
//             console.error("Gagal memuat data:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     fetchData();
//   }, []);

//   const filteredCourses = courses.filter(course => {
//     const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
//                           (course.category && course.category.toLowerCase().includes(searchTerm.toLowerCase()));
//     const matchesType = filterType === 'all' || course.programType === filterType;
//     return matchesSearch && matchesType;
//   });

//   // [HELPER PENTING] Cek Status Enrollment per Course
//   const getEnrollmentStatus = (courseId: string) => {
//       // Cari enrollment yang course ID-nya cocok
//       const enroll = myEnrollments.find((e: any) => {
//           const eCourseId = typeof e.course === 'string' ? e.course : e.course?._id;
//           return eCourseId === courseId;
//       });
      
//       // Return status jika ada, jika tidak null
//       return enroll ? (enroll.status || 'pending') : null;
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 pb-20">
//       <div className="bg-white border-b border-gray-200 pt-24 pb-12 px-6 text-center">
//         <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Katalog Kelas & Pelatihan</h1>
//         <p className="text-gray-500 mb-8 max-w-2xl mx-auto">Tingkatkan kompetensi Anda bersama PMI Humanis.</p>
        
//         {/* Search Bar */}
//         <div className="max-w-xl mx-auto relative">
//           <input 
//             type="text" 
//             placeholder="Cari topik pelatihan..." 
//             className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none shadow-sm"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
//         </div>

//         {/* Filters */}
//         <div className="flex justify-center gap-3 mt-6">
//           <button onClick={() => setFilterType('all')} className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${filterType === 'all' ? 'bg-gray-900 text-white' : 'bg-white border text-gray-600'}`}>Semua</button>
//           <button onClick={() => setFilterType('training')} className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${filterType === 'training' ? 'bg-red-600 text-white' : 'bg-white border text-gray-600'}`}>Diklat</button>
//           <button onClick={() => setFilterType('course')} className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${filterType === 'course' ? 'bg-blue-600 text-white' : 'bg-white border text-gray-600'}`}>Kursus</button>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-6 mt-12">
//         {loading ? (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">{[1,2,3].map(i => (<div key={i} className="bg-white rounded-2xl h-80 animate-pulse bg-gray-200"></div>))}</div>
//         ) : filteredCourses.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {filteredCourses.map((course) => {
//                 // [LOGIC STATUS]
//                 const status = getEnrollmentStatus(course._id);
                
//                 // Definisi Status
//                 const isPending = status === 'pending' || status === 'waiting';
//                 const isActive = status === 'active' || status === 'approved' || status === 'completed';
//                 const isRejected = status === 'rejected';

//                 return (
//                   <Link href={`/courses/${course._id}`} key={course._id} className="group relative block h-full">
//                     <div className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full ${isPending ? 'ring-2 ring-amber-300' : isActive ? 'ring-2 ring-green-500' : ''}`}>
                      
//                       {/* LABEL STATUS DI ATAS GAMBAR */}
//                       {isPending && (
//                           <div className="absolute top-0 left-0 right-0 bg-amber-100 text-amber-800 text-[10px] font-bold px-3 py-1.5 flex items-center justify-center gap-1 z-20 border-b border-amber-200">
//                               <AlertCircle size={12}/> MENUNGGU PERSETUJUAN
//                           </div>
//                       )}
//                       {isActive && (
//                           <div className="absolute top-0 left-0 right-0 bg-green-100 text-green-800 text-[10px] font-bold px-3 py-1.5 flex items-center justify-center gap-1 z-20 border-b border-green-200">
//                               <CheckCircle2 size={12}/> TERDAFTAR - AKTIF
//                           </div>
//                       )}
//                       {isRejected && (
//                           <div className="absolute top-0 left-0 right-0 bg-red-100 text-red-800 text-[10px] font-bold px-3 py-1.5 flex items-center justify-center gap-1 z-20 border-b border-red-200">
//                               <AlertCircle size={12}/> PENDAFTARAN DITOLAK
//                           </div>
//                       )}

//                       <div className={`relative h-48 overflow-hidden bg-gray-100 ${(isPending || isActive || isRejected) ? 'mt-8' : ''}`}>
//                         {course.thumbnailUrl ? (
//                           <img src={getImageUrl(course.thumbnailUrl)} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
//                         ) : (<div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-100"><BookOpen size={48} /></div>)}
                        
//                         {/* Kategori Badge (Jika belum daftar) */}
//                         {!status && (
//                             <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-gray-700 shadow-sm">
//                             {course.category || 'Umum'}
//                             </div>
//                         )}
                        
//                         {course.programType === 'training' && (
//                           <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">DIKLAT</div>
//                         )}
//                       </div>

//                       <div className="p-6 flex-1 flex flex-col">
//                         <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-700 transition-colors line-clamp-2 mb-2">
//                           {course.title}
//                         </h3>
//                         <div className="flex items-center gap-4 text-xs text-gray-500 mb-6">
//                           <div className="flex items-center gap-1"><Users size={14} /><span>{course.facilitatorIds?.length || 1} Fasilitator</span></div>
//                           <div className="flex items-center gap-1"><Tag size={14} /><span>{course.level || 'Semua Level'}</span></div>
//                         </div>
//                         <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
//                           <div className="flex items-center gap-2">
//                               {course.price > 0 ? (<span className="text-lg font-bold text-green-700">Rp {course.price.toLocaleString('id-ID')}</span>) : (<span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">GRATIS</span>)}
//                           </div>
                          
//                           {/* TOMBOL DINAMIS */}
//                           <span className={`text-sm font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform ${isPending ? 'text-amber-600' : isActive ? 'text-green-600' : 'text-red-600'}`}>
//                             {isActive ? 'Lanjut Belajar' : isPending ? 'Lihat Status' : isRejected ? 'Daftar Ulang' : 'Detail'} <span className="text-lg">→</span>
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </Link>
//                 );
//             })}
//           </div>
//         ) : (
//           <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
//             <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"><Search className="text-gray-400" size={32} /></div>
//             <h3 className="text-lg font-bold text-gray-800">Tidak ada pelatihan yang ditemukan.</h3>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



'use client';

import { useState, useEffect } from 'react';
import { api, getImageUrl } from '@/lib/api';
import Link from 'next/link';
import { 
    Search, Filter, BookOpen, Clock, Users, ChevronRight, 
    FileText, CheckCircle, AlertCircle 
} from 'lucide-react';

export default function CoursesPage() {
    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [categories, setCategories] = useState<string[]>(['All']);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Load Courses
                const res = await api('/api/courses/published');
                setCourses(res.courses || []);

                // Load Categories from CMS Content
                const contentRes = await api('/api/content');
                if (contentRes?.courseCategories?.length > 0) {
                    setCategories(['All', ...contentRes.courseCategories]);
                } else {
                    setCategories(['All', 'Health', 'Safety', 'General', 'Disaster']);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // --- HELPER: HITUNG TOTAL JP ---
    const getTotalJP = (modules: any[]) => {
        if (!modules) return 0;
        let total = 0;
        modules.forEach(m => {
            if (m.isActive) {
                m.lessons?.forEach((l: any) => {
                    if (l.isActive) total += (l.jp || 0);
                });
            }
        });
        return total;
    };

    const filteredCourses = courses.filter(c => {
        const matchSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchCat = selectedCategory === 'All' || c.category === selectedCategory;
        return matchSearch && matchCat;
    });

    if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div></div>;

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-red-900 text-white py-12 px-6 shadow-xl">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">Katalog Pelatihan & Kursus</h1>
                    <p className="text-red-100 max-w-2xl mx-auto">Tingkatkan kompetensi Anda dengan materi berkualitas dari PMI.</p>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="max-w-6xl mx-auto px-6 -mt-8 relative z-10">
                <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
                        <input 
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-red-500" 
                            placeholder="Cari judul pelatihan..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                        <Filter size={20} className="text-gray-500 shrink-0"/>
                        {categories.map(cat => (
                            <button 
                                key={cat} 
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${selectedCategory === cat ? 'bg-red-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Course Grid */}
            <div className="max-w-6xl mx-auto px-6 py-12">
                {filteredCourses.length === 0 ? (
                    <div className="text-center py-20 text-gray-400">
                        <p className="text-xl font-bold">Tidak ada pelatihan ditemukan.</p>
                        <p className="text-sm">Coba kata kunci atau kategori lain.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCourses.map((course) => {
                            const totalJP = getTotalJP(course.modules);
                            const moduleCount = course.modules?.length || 0;
                            const isAuto = course.registrationMode === 'automatic';

                            return (
                                <div key={course._id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group flex flex-col h-full">
                                    {/* Image */}
                                    <div className="relative h-48 bg-gray-200 overflow-hidden">
                                        {course.thumbnailUrl ? (
                                            <img src={getImageUrl(course.thumbnailUrl)} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt={course.title} />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">No Image</div>
                                        )}
                                        <div className="absolute top-3 left-3 flex gap-2">
                                            <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-[10px] font-bold px-2 py-1 rounded uppercase shadow-sm border border-gray-200">
                                                {course.category}
                                            </span>
                                        </div>
                                        <div className="absolute top-3 right-3">
                                            <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase shadow-sm border text-white ${course.programType === 'training' ? 'bg-red-600 border-red-700' : 'bg-blue-600 border-blue-700'}`}>
                                                {course.programType === 'training' ? 'DIKLAT' : 'KURSUS'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex-1 flex flex-col">
                                        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-red-700 transition-colors">
                                            {course.title}
                                        </h3>
                                        
                                        <div className="flex flex-wrap gap-y-2 gap-x-4 text-xs text-gray-500 mb-4 mt-1">
                                            <div className="flex items-center gap-1">
                                                <Users size={14} className="text-gray-400"/> {course.facilitatorIds?.length || 0} Fasilitator
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <BookOpen size={14} className="text-gray-400"/> {moduleCount} Modul
                                            </div>
                                        </div>

                                        {/* INFO DETAIL: JP & PENDAFTARAN */}
                                        <div className="grid grid-cols-2 gap-2 mb-6">
                                            <div className="bg-gray-50 rounded-lg p-2 text-center border border-gray-100">
                                                <p className="text-[10px] text-gray-400 uppercase font-bold mb-0.5 flex items-center justify-center gap-1">
                                                    <Clock size={10}/> Total JP
                                                </p>
                                                <p className="text-sm font-black text-gray-700">{totalJP} JP</p>
                                            </div>
                                            <div className={`rounded-lg p-2 text-center border ${isAuto ? 'bg-green-50 border-green-100' : 'bg-orange-50 border-orange-100'}`}>
                                                <p className={`text-[10px] uppercase font-bold mb-0.5 flex items-center justify-center gap-1 ${isAuto ? 'text-green-600' : 'text-orange-600'}`}>
                                                    {isAuto ? <CheckCircle size={10}/> : <AlertCircle size={10}/>} Pendaftaran
                                                </p>
                                                <p className={`text-xs font-bold ${isAuto ? 'text-green-700' : 'text-orange-700'}`}>
                                                    {isAuto ? 'Langsung Aktif' : 'Dengan Syarat'}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                                            <div>
                                                <p className="text-[10px] text-gray-400 uppercase font-bold">Investasi</p>
                                                <p className={`font-bold ${course.price === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                                                    {course.price === 0 ? 'GRATIS' : `Rp ${course.price.toLocaleString()}`}
                                                </p>
                                            </div>
                                            <Link href={`/courses/${course._id}`} className="text-red-600 text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                                                Detail <ChevronRight size={16}/>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
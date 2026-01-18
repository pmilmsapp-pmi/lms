// // // // // // // // // // 'use client';

// // // // // // // // // // import { useState, useEffect } from 'react';
// // // // // // // // // // // [FIX] Pastikan getImageUrl diimport
// // // // // // // // // // import { api, getImageUrl } from '@/lib/api'; 
// // // // // // // // // // import Protected from '@/components/Protected';
// // // // // // // // // // import { 
// // // // // // // // // //     Plus, Search, Edit2, Trash2, BookOpen, Settings, 
// // // // // // // // // //     MoreHorizontal, Loader2, PlayCircle, Eye, Bell,
// // // // // // // // // //     Image as ImageIcon, FileText, CheckCircle 
// // // // // // // // // // } from 'lucide-react';
// // // // // // // // // // import Link from 'next/link';
// // // // // // // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // // // // // // import CourseFormModal from '@/components/admin/courses/CourseFormModal';

// // // // // // // // // // export default function AdminCoursesPage() {
// // // // // // // // // //     const { user } = useAuth();
// // // // // // // // // //     const [courses, setCourses] = useState<any[]>([]); // Default array kosong
// // // // // // // // // //     const [loading, setLoading] = useState(true);
// // // // // // // // // //     const [search, setSearch] = useState('');
    
// // // // // // // // // //     // State untuk Modal Edit/Buat
// // // // // // // // // //     const [showModal, setShowModal] = useState(false);
// // // // // // // // // //     const [selectedCourse, setSelectedCourse] = useState<any>(null);
// // // // // // // // // //     const [facilitators, setFacilitators] = useState<any[]>([]);

// // // // // // // // // //     useEffect(() => {
// // // // // // // // // //         loadData();
// // // // // // // // // //     }, []);

// // // // // // // // // //     const loadData = async () => {
// // // // // // // // // //         try {
// // // // // // // // // //             setLoading(true);
// // // // // // // // // //             const [resCourses, resUsers] = await Promise.all([
// // // // // // // // // //                 api('/api/courses'),
// // // // // // // // // //                 api('/api/admin/users')
// // // // // // // // // //             ]);
            
// // // // // // // // // //             // [FIX] Handling jika API return object { courses: [...] } atau array langsung
// // // // // // // // // //             const coursesData = Array.isArray(resCourses) 
// // // // // // // // // //                 ? resCourses 
// // // // // // // // // //                 : (resCourses.courses || resCourses.data || []);
            
// // // // // // // // // //             setCourses(coursesData);
            
// // // // // // // // // //             // Filter user yang bisa jadi fasilitator (Admin / Facilitator)
// // // // // // // // // //             if (resUsers.users) {
// // // // // // // // // //                 const facs = resUsers.users.filter((u: any) => 
// // // // // // // // // //                     u.role === 'FACILITATOR' || u.role === 'SUPER_ADMIN'
// // // // // // // // // //                 );
// // // // // // // // // //                 setFacilitators(facs);
// // // // // // // // // //             }
// // // // // // // // // //         } catch (e) {
// // // // // // // // // //             console.error("Gagal load data:", e);
// // // // // // // // // //             setCourses([]); // Fallback ke array kosong jika error
// // // // // // // // // //         } finally {
// // // // // // // // // //             setLoading(false);
// // // // // // // // // //         }
// // // // // // // // // //     };

// // // // // // // // // //     const handleDelete = async (id: string) => {
// // // // // // // // // //         if (!confirm('Yakin ingin menghapus pelatihan ini? Data peserta & progres akan hilang!')) return;
// // // // // // // // // //         try {
// // // // // // // // // //             await api(`/api/courses/${id}`, { method: 'DELETE' });
// // // // // // // // // //             loadData();
// // // // // // // // // //         } catch (e: any) {
// // // // // // // // // //             alert(e.message);
// // // // // // // // // //         }
// // // // // // // // // //     };

// // // // // // // // // //     // Handler Buka Modal Buat Baru
// // // // // // // // // //     const handleCreate = () => {
// // // // // // // // // //         setSelectedCourse(null); 
// // // // // // // // // //         setShowModal(true);
// // // // // // // // // //     };

// // // // // // // // // //     // Handler Buka Modal Edit
// // // // // // // // // //     const handleEdit = (course: any) => {
// // // // // // // // // //         setSelectedCourse(course); 
// // // // // // // // // //         setShowModal(true);
// // // // // // // // // //     };

// // // // // // // // // //     const handleSuccess = () => {
// // // // // // // // // //         setShowModal(false);
// // // // // // // // // //         loadData(); 
// // // // // // // // // //     };

// // // // // // // // // //     // [FIX] Pastikan courses adalah array sebelum di-filter
// // // // // // // // // //     const safeCourses = Array.isArray(courses) ? courses : [];
    
// // // // // // // // // //     const filteredCourses = safeCourses.filter(c => 
// // // // // // // // // //         (c.title || '').toLowerCase().includes(search.toLowerCase())
// // // // // // // // // //     );

// // // // // // // // // //     return (
// // // // // // // // // //         <Protected roles={['SUPER_ADMIN', 'FACILITATOR']}>
// // // // // // // // // //             <div className="p-8 pb-32 max-w-7xl mx-auto">
                
// // // // // // // // // //                 {/* Header */}
// // // // // // // // // //                 <div className="flex justify-between items-end mb-8">
// // // // // // // // // //                     <div>
// // // // // // // // // //                         <h1 className="text-3xl font-bold text-gray-900">Manajemen Pelatihan</h1>
// // // // // // // // // //                         <p className="text-gray-500 mt-1">Kelola kursus atau pelatihan.</p>
// // // // // // // // // //                     </div>
// // // // // // // // // //                     <button 
// // // // // // // // // //                         onClick={handleCreate} 
// // // // // // // // // //                         className="bg-[#B91C1C] hover:bg-[#991B1B] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg transition-transform active:scale-95"
// // // // // // // // // //                     >
// // // // // // // // // //                         <Plus size={20}/> Buat Baru
// // // // // // // // // //                     </button>
// // // // // // // // // //                 </div>

// // // // // // // // // //                 {/* Filter */}
// // // // // // // // // //                 <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm mb-6">
// // // // // // // // // //                     <div className="relative">
// // // // // // // // // //                         <Search className="absolute left-3 top-3 text-gray-400" size={20}/>
// // // // // // // // // //                         <input 
// // // // // // // // // //                             className="w-full pl-10 p-2.5 border rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-red-500" 
// // // // // // // // // //                             placeholder="Cari judul..." 
// // // // // // // // // //                             value={search}
// // // // // // // // // //                             onChange={e => setSearch(e.target.value)}
// // // // // // // // // //                         />
// // // // // // // // // //                     </div>
// // // // // // // // // //                 </div>

// // // // // // // // // //                 {/* Table List */}
// // // // // // // // // //                 <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
// // // // // // // // // //                     <table className="w-full text-left">
// // // // // // // // // //                         <thead className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
// // // // // // // // // //                             <tr>
// // // // // // // // // //                                 <th className="p-4 w-20">Cover</th>
// // // // // // // // // //                                 <th className="p-4">Info Pelatihan</th>
// // // // // // // // // //                                 <th className="p-4">Pelaksana</th>
// // // // // // // // // //                                 <th className="p-4">Biaya</th>
// // // // // // // // // //                                 <th className="p-4 text-center">Status</th>
// // // // // // // // // //                                 <th className="p-4 text-center">Aksi</th>
// // // // // // // // // //                             </tr>
// // // // // // // // // //                         </thead>
// // // // // // // // // //                         <tbody className="divide-y divide-gray-100">
// // // // // // // // // //                             {loading ? (
// // // // // // // // // //                                 <tr><td colSpan={6} className="p-10 text-center"><Loader2 className="animate-spin mx-auto text-gray-400"/></td></tr>
// // // // // // // // // //                             ) : filteredCourses.length === 0 ? (
// // // // // // // // // //                                 <tr><td colSpan={6} className="p-10 text-center text-gray-400 italic">Belum ada pelatihan.</td></tr>
// // // // // // // // // //                             ) : (
// // // // // // // // // //                                 filteredCourses.map((course) => (
// // // // // // // // // //                                     <tr key={course._id} className="hover:bg-gray-50 transition-colors group">
// // // // // // // // // //                                         <td className="p-4">
// // // // // // // // // //                                             <div className="w-16 h-10 bg-gray-200 rounded-lg overflow-hidden border border-gray-300">
// // // // // // // // // //                                                 {course.thumbnailUrl ? (
// // // // // // // // // //                                                     <img src={getImageUrl(course.thumbnailUrl)} alt="" className="w-full h-full object-cover"/>
// // // // // // // // // //                                                 ) : (
// // // // // // // // // //                                                     <div className="flex items-center justify-center h-full text-gray-400"><ImageIcon size={16}/></div>
// // // // // // // // // //                                                 )}
// // // // // // // // // //                                             </div>
// // // // // // // // // //                                         </td>
// // // // // // // // // //                                         <td className="p-4">
// // // // // // // // // //                                             <div className="font-bold text-gray-900">{course.title}</div>
// // // // // // // // // //                                             <div className="flex gap-2 mt-1">
// // // // // // // // // //                                                 <span className={`text-[10px] px-2 py-0.5 rounded border uppercase font-bold ${course.programType === 'training' ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-purple-50 text-purple-700 border-purple-100'}`}>
// // // // // // // // // //                                                     {course.programType}
// // // // // // // // // //                                                 </span>
// // // // // // // // // //                                                 {course.registrationMethod === 'manual' ? (
// // // // // // // // // //                                                     <span className="text-[10px] px-2 py-0.5 rounded border bg-orange-50 text-orange-700 border-orange-100 font-bold flex items-center gap-1"><FileText size={10}/> Syarat</span>
// // // // // // // // // //                                                 ) : (
// // // // // // // // // //                                                     <span className="text-[10px] px-2 py-0.5 rounded border bg-green-50 text-green-700 border-green-100 font-bold flex items-center gap-1"><CheckCircle size={10}/> Auto</span>
// // // // // // // // // //                                                 )}
// // // // // // // // // //                                             </div>
// // // // // // // // // //                                         </td>
// // // // // // // // // //                                         <td className="p-4 text-sm text-gray-600 flex items-center gap-1">
// // // // // // // // // //                                            <div className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center"><BookOpen size={10} /></div> PMI Pusat
// // // // // // // // // //                                         </td>
// // // // // // // // // //                                         <td className="p-4 text-sm font-bold text-green-600">
// // // // // // // // // //                                             {course.price === 0 ? 'Gratis' : `Rp ${course.price.toLocaleString('id-ID')}`}
// // // // // // // // // //                                         </td>
// // // // // // // // // //                                         <td className="p-4 text-center">
// // // // // // // // // //                                             <span className={`text-xs px-3 py-1 rounded-full font-bold border ${course.isPublished ? 'bg-green-100 text-green-700 border-green-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
// // // // // // // // // //                                                 {course.isPublished ? 'Published' : 'Draft'}
// // // // // // // // // //                                             </span>
// // // // // // // // // //                                         </td>
// // // // // // // // // //                                         <td className="p-4 text-center">
// // // // // // // // // //                                             <div className="flex justify-center gap-2">
// // // // // // // // // //                                                 {/* Tombol Manage Detail */}
// // // // // // // // // //                                                 <Link href={`/admin/courses/${course._id}`} className="p-2 border rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors" title="Kelola Materi & Peserta">
// // // // // // // // // //                                                     <Settings size={18}/>
// // // // // // // // // //                                                 </Link>
                                                
// // // // // // // // // //                                                 {/* Tombol Notifikasi */}
// // // // // // // // // //                                                 <button className="p-2 border rounded-lg text-white bg-green-500 hover:bg-green-600 transition-colors" title="Kirim Notifikasi">
// // // // // // // // // //                                                     <Bell size={18}/>
// // // // // // // // // //                                                 </button>

// // // // // // // // // //                                                 {/* Tombol Edit Info (Memanggil Modal Baru) */}
// // // // // // // // // //                                                 <button onClick={() => handleEdit(course)} className="p-2 border rounded-lg text-blue-600 hover:bg-blue-50 border-blue-100 transition-colors" title="Edit Info">
// // // // // // // // // //                                                     <Edit2 size={18}/>
// // // // // // // // // //                                                 </button>
                                                
// // // // // // // // // //                                                 {/* Tombol Hapus */}
// // // // // // // // // //                                                 <button onClick={() => handleDelete(course._id)} className="p-2 border rounded-lg text-red-600 hover:bg-red-50 border-red-100 transition-colors" title="Hapus">
// // // // // // // // // //                                                     <Trash2 size={18}/>
// // // // // // // // // //                                                 </button>
// // // // // // // // // //                                             </div>
// // // // // // // // // //                                         </td>
// // // // // // // // // //                                     </tr>
// // // // // // // // // //                                 ))
// // // // // // // // // //                             )}
// // // // // // // // // //                         </tbody>
// // // // // // // // // //                     </table>
// // // // // // // // // //                 </div>

// // // // // // // // // //                 {/* MODAL BARU DIPASANG DISINI */}
// // // // // // // // // //                 {showModal && (
// // // // // // // // // //                     <CourseFormModal 
// // // // // // // // // //                         course={selectedCourse}
// // // // // // // // // //                         facilitators={facilitators}
// // // // // // // // // //                         currentUser={user}
// // // // // // // // // //                         onClose={() => setShowModal(false)}
// // // // // // // // // //                         onSuccess={handleSuccess}
// // // // // // // // // //                     />
// // // // // // // // // //                 )}

// // // // // // // // // //             </div>
// // // // // // // // // //         </Protected>
// // // // // // // // // //     );
// // // // // // // // // // }


// // // // // // // // // 'use client';

// // // // // // // // // import { useEffect, useState } from 'react';
// // // // // // // // // import { useRouter, useSearchParams } from 'next/navigation';
// // // // // // // // // import { api, getImageUrl } from '@/lib/api';
// // // // // // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // // // // // import { Plus, Search, Edit, Trash, Eye, EyeOff, BookOpen, AlertCircle } from 'lucide-react';

// // // // // // // // // export default function CourseManagement() {
// // // // // // // // //     const { user } = useAuth();
// // // // // // // // //     const router = useRouter();
// // // // // // // // //     const searchParams = useSearchParams();
    
// // // // // // // // // const [courses, setCourses] = useState<any[]>([]);
// // // // // // // // //     const [loading, setLoading] = useState(true);
// // // // // // // // //     const [searchTerm, setSearchTerm] = useState('');

// // // // // // // // //     const isFacilitator = user?.role === 'FACILITATOR';

// // // // // // // // //     useEffect(() => {
// // // // // // // // //         const fetchCourses = async () => {
// // // // // // // // //             try {
// // // // // // // // //                 // Backend sudah memfilter data (Fasilitator hanya dapat miliknya)
// // // // // // // // //                 const res = await api('/api/courses?limit=100'); 
// // // // // // // // //                 setCourses(res.courses || []);
// // // // // // // // //             } catch (error) {
// // // // // // // // //                 console.error(error);
// // // // // // // // //             } finally {
// // // // // // // // //                 setLoading(false);
// // // // // // // // //             }
// // // // // // // // //         };
// // // // // // // // //         if(user) fetchCourses();
// // // // // // // // //     }, [user]);

// // // // // // // // //     // --- FUNCTION ACTIONS ---
// // // // // // // // //     const handleDelete = async (id: string) => {
// // // // // // // // //         if(!confirm('Yakin ingin menghapus kelas ini?')) return;
// // // // // // // // //         try {
// // // // // // // // //             await api(`/api/courses/${id}`, { method: 'DELETE' });
// // // // // // // // //             setCourses(prev => prev.filter((c: any) => c._id !== id));
// // // // // // // // //         } catch(e) { alert('Gagal menghapus'); }
// // // // // // // // //     };

// // // // // // // // //     const handleTogglePublish = async (id: string, currentStatus: boolean) => {
// // // // // // // // //         try {
// // // // // // // // //             // Fasilitator biasanya TIDAK BOLEH publish langsung (tapi request approval)
// // // // // // // // //             // Tapi jika logic bisnis Anda membolehkan, biarkan saja.
// // // // // // // // //             // Disini kita batasi jika mau:
// // // // // // // // //             /* if(isFacilitator && !currentStatus) {
// // // // // // // // //                 alert("Silakan hubungi Admin untuk menerbitkan kelas.");
// // // // // // // // //                 return;
// // // // // // // // //             } 
// // // // // // // // //             */
            
// // // // // // // // //             await api(`/api/courses/${id}/publish`, { method: 'PATCH' });
// // // // // // // // //             // Refresh local state
// // // // // // // // //             setCourses(prev => prev.map((c: any) => c._id === id ? { ...c, isPublished: !currentStatus } : c));
// // // // // // // // //         } catch(e) { alert('Gagal update status'); }
// // // // // // // // //     };

// // // // // // // // //     if (loading) return <div className="p-10 text-center">Loading data...</div>;

// // // // // // // // //     return (
// // // // // // // // //         <div className="min-h-screen bg-gray-50 pb-20">
// // // // // // // // //             {/* HEADER KHUSUS */}
// // // // // // // // //             <div className={`px-8 py-6 border-b ${isFacilitator ? 'bg-blue-600 border-blue-700' : 'bg-white border-gray-200'}`}>
// // // // // // // // //                 <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
// // // // // // // // //                     <div>
// // // // // // // // //                         <h1 className={`text-2xl font-bold ${isFacilitator ? 'text-white' : 'text-gray-900'}`}>
// // // // // // // // //                             {isFacilitator ? 'Kelola Kelas Saya' : 'Manajemen Pelatihan (Admin)'}
// // // // // // // // //                         </h1>
// // // // // // // // //                         <p className={`text-sm mt-1 ${isFacilitator ? 'text-blue-100' : 'text-gray-500'}`}>
// // // // // // // // //                             {isFacilitator 
// // // // // // // // //                                 ? 'Buat dan update materi pelatihan Anda di sini.' 
// // // // // // // // //                                 : 'Pantau seluruh pelatihan nasional/regional.'}
// // // // // // // // //                         </p>
// // // // // // // // //                     </div>
// // // // // // // // //                     <button 
// // // // // // // // //                         onClick={() => router.push('/admin/courses/create')} // Pastikan halaman create juga aman
// // // // // // // // //                         className={`px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg transition-all ${
// // // // // // // // //                             isFacilitator 
// // // // // // // // //                             ? 'bg-white text-blue-600 hover:bg-blue-50' 
// // // // // // // // //                             : 'bg-red-700 text-white hover:bg-red-800'
// // // // // // // // //                         }`}
// // // // // // // // //                     >
// // // // // // // // //                         <Plus size={18}/> Buat Kelas Baru
// // // // // // // // //                     </button>
// // // // // // // // //                 </div>
// // // // // // // // //             </div>

// // // // // // // // //             {/* CONTENT */}
// // // // // // // // //             <div className="max-w-7xl mx-auto px-8 py-8">
// // // // // // // // //                 {/* SEARCH BAR & FILTER */}
// // // // // // // // //                 <div className="mb-6 flex gap-4">
// // // // // // // // //                     <div className="relative flex-1">
// // // // // // // // //                         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20}/>
// // // // // // // // //                         <input 
// // // // // // // // //                             type="text" 
// // // // // // // // //                             placeholder="Cari judul pelatihan..." 
// // // // // // // // //                             className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
// // // // // // // // //                             value={searchTerm}
// // // // // // // // //                             onChange={(e) => setSearchTerm(e.target.value)}
// // // // // // // // //                         />
// // // // // // // // //                     </div>
// // // // // // // // //                 </div>

// // // // // // // // //                 {/* TABLE LIST */}
// // // // // // // // //                 <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
// // // // // // // // //                     {courses.length === 0 ? (
// // // // // // // // //                         <div className="p-10 text-center text-gray-400">
// // // // // // // // //                             <BookOpen className="mx-auto mb-2 opacity-50" size={40}/>
// // // // // // // // //                             <p>Belum ada kelas yang dibuat.</p>
// // // // // // // // //                         </div>
// // // // // // // // //                     ) : (
// // // // // // // // //                         <div className="overflow-x-auto">
// // // // // // // // //                             <table className="w-full text-left text-sm">
// // // // // // // // //                                 <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase tracking-wider text-xs">
// // // // // // // // //                                     <tr>
// // // // // // // // //                                         <th className="px-6 py-4 font-bold">Judul Kelas</th>
// // // // // // // // //                                         <th className="px-6 py-4 font-bold">Status</th>
// // // // // // // // //                                         <th className="px-6 py-4 font-bold text-center">Modul</th>
// // // // // // // // //                                         {/* Kolom Fasilitator hanya muncul untuk Admin */}
// // // // // // // // //                                         {!isFacilitator && <th className="px-6 py-4 font-bold">Fasilitator</th>}
// // // // // // // // //                                         <th className="px-6 py-4 font-bold text-right">Aksi</th>
// // // // // // // // //                                     </tr>
// // // // // // // // //                                 </thead>
// // // // // // // // //                                 <tbody className="divide-y divide-gray-50">
// // // // // // // // //                                     {courses.filter((c:any) => c.title.toLowerCase().includes(searchTerm.toLowerCase())).map((course: any) => (
// // // // // // // // //                                         <tr key={course._id} className="hover:bg-gray-50/50 transition-colors">
// // // // // // // // //                                             <td className="px-6 py-4">
// // // // // // // // //                                                 <div className="flex items-center gap-3">
// // // // // // // // //                                                     <img src={getImageUrl(course.thumbnailUrl)} className="w-10 h-10 rounded-lg object-cover bg-gray-200" alt=""/>
// // // // // // // // //                                                     <div>
// // // // // // // // //                                                         <p className="font-bold text-gray-900 line-clamp-1">{course.title}</p>
// // // // // // // // //                                                         <p className="text-xs text-gray-400">{course.category || 'Umum'}</p>
// // // // // // // // //                                                     </div>
// // // // // // // // //                                                 </div>
// // // // // // // // //                                             </td>
// // // // // // // // //                                             <td className="px-6 py-4">
// // // // // // // // //                                                 <button 
// // // // // // // // //                                                     onClick={() => handleTogglePublish(course._id, course.isPublished)}
// // // // // // // // //                                                     className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide flex items-center gap-1 w-fit ${
// // // // // // // // //                                                         course.isPublished ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
// // // // // // // // //                                                     }`}
// // // // // // // // //                                                 >
// // // // // // // // //                                                     {course.isPublished ? <><Eye size={10}/> Terbit</> : <><EyeOff size={10}/> Draft</>}
// // // // // // // // //                                                 </button>
// // // // // // // // //                                             </td>
// // // // // // // // //                                             <td className="px-6 py-4 text-center font-mono text-gray-500">
// // // // // // // // //                                                 {course.modules?.length || 0}
// // // // // // // // //                                             </td>
                                            
// // // // // // // // //                                             {!isFacilitator && (
// // // // // // // // //                                                 <td className="px-6 py-4">
// // // // // // // // //                                                     <div className="flex items-center gap-2">
// // // // // // // // //                                                         <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden">
// // // // // // // // //                                                             {/* Render Avatar Fasilitator Pertama */}
// // // // // // // // //                                                             {/* Logika render avatar sederhana */}
// // // // // // // // //                                                         </div>
// // // // // // // // //                                                         <span className="text-xs text-gray-600 truncate max-w-[100px]">
// // // // // // // // //                                                             {course.facilitatorIds?.[0]?.name || 'Admin'}
// // // // // // // // //                                                         </span>
// // // // // // // // //                                                     </div>
// // // // // // // // //                                                 </td>
// // // // // // // // //                                             )}

// // // // // // // // //                                             <td className="px-6 py-4 text-right">
// // // // // // // // //                                                 <div className="flex items-center justify-end gap-2">
// // // // // // // // //                                                     <button 
// // // // // // // // //                                                         onClick={() => router.push(`/admin/courses/${course._id}/edit`)}
// // // // // // // // //                                                         className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
// // // // // // // // //                                                         title="Edit Materi"
// // // // // // // // //                                                     >
// // // // // // // // //                                                         <Edit size={16}/>
// // // // // // // // //                                                     </button>
// // // // // // // // //                                                     <button 
// // // // // // // // //                                                         onClick={() => handleDelete(course._id)}
// // // // // // // // //                                                         className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
// // // // // // // // //                                                         title="Hapus Kelas"
// // // // // // // // //                                                     >
// // // // // // // // //                                                         <Trash size={16}/>
// // // // // // // // //                                                     </button>
// // // // // // // // //                                                 </div>
// // // // // // // // //                                             </td>
// // // // // // // // //                                         </tr>
// // // // // // // // //                                     ))}
// // // // // // // // //                                 </tbody>
// // // // // // // // //                             </table>
// // // // // // // // //                         </div>
// // // // // // // // //                     )}
// // // // // // // // //                 </div>
// // // // // // // // //             </div>
// // // // // // // // //         </div>
// // // // // // // // //     );
// // // // // // // // // }


// // // // // // // // 'use client';

// // // // // // // // import { useState, useEffect } from 'react';
// // // // // // // // import { useRouter } from 'next/navigation';
// // // // // // // // import Link from 'next/link';
// // // // // // // // import { api, getImageUrl } from '@/lib/api';
// // // // // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // // // // import Protected from '@/components/Protected';
// // // // // // // // import { 
// // // // // // // //     Plus, Search, Edit2, Trash2, BookOpen, Settings, 
// // // // // // // //     MoreHorizontal, Loader2, Eye, EyeOff, Bell,
// // // // // // // //     Image as ImageIcon, FileText, CheckCircle 
// // // // // // // // } from 'lucide-react';

// // // // // // // // // [PENTING] Import Modal Form yang Anda inginkan
// // // // // // // // import CourseFormModal from '@/components/admin/courses/CourseFormModal';

// // // // // // // // export default function AdminCoursesPage() {
// // // // // // // //     const { user } = useAuth();
// // // // // // // //     const router = useRouter();
    
// // // // // // // //     // Data State
// // // // // // // //     const [courses, setCourses] = useState<any[]>([]); 
// // // // // // // //     const [loading, setLoading] = useState(true);
// // // // // // // //     const [search, setSearch] = useState('');
    
// // // // // // // //     // State Modal (Pop-up)
// // // // // // // //     const [showModal, setShowModal] = useState(false);
// // // // // // // //     const [selectedCourse, setSelectedCourse] = useState<any>(null);
// // // // // // // //     const [facilitators, setFacilitators] = useState<any[]>([]);

// // // // // // // //     const isFacilitator = user?.role === 'FACILITATOR';

// // // // // // // //     useEffect(() => {
// // // // // // // //         loadData();
// // // // // // // //     }, []);

// // // // // // // //     const loadData = async () => {
// // // // // // // //         try {
// // // // // // // //             setLoading(true);
            
// // // // // // // //             // 1. Ambil Data Kursus & User sekaligus
// // // // // // // //             const [resCourses, resUsers] = await Promise.all([
// // // // // // // //                 api('/api/courses?limit=100'), // Ambil semua
// // // // // // // //                 api('/api/admin/users')
// // // // // // // //             ]);
            
// // // // // // // //             // Handle variasi respon backend
// // // // // // // //             const list = Array.isArray(resCourses) ? resCourses : (resCourses.courses || []);
// // // // // // // //             setCourses(list);
            
// // // // // // // //             // Filter user untuk dropdown fasilitator
// // // // // // // //             if (resUsers.users) {
// // // // // // // //                 const facs = resUsers.users.filter((u: any) => 
// // // // // // // //                     u.role === 'FACILITATOR' || u.role === 'SUPER_ADMIN'
// // // // // // // //                 );
// // // // // // // //                 setFacilitators(facs);
// // // // // // // //             }
// // // // // // // //         } catch (e) {
// // // // // // // //             console.error("Gagal load data:", e);
// // // // // // // //         } finally {
// // // // // // // //             setLoading(false);
// // // // // // // //         }
// // // // // // // //     };

// // // // // // // //     // --- ACTIONS ---

// // // // // // // //     const handleDelete = async (id: string) => {
// // // // // // // //         if (!confirm('Yakin ingin menghapus pelatihan ini? Data peserta & progres akan hilang!')) return;
// // // // // // // //         try {
// // // // // // // //             await api(`/api/courses/${id}`, { method: 'DELETE' });
// // // // // // // //             setCourses(prev => prev.filter(c => c._id !== id));
// // // // // // // //         } catch (e: any) {
// // // // // // // //             alert(e.message);
// // // // // // // //         }
// // // // // // // //     };

// // // // // // // //     const handleTogglePublish = async (id: string, currentStatus: boolean) => {
// // // // // // // //         try {
// // // // // // // //             await api(`/api/courses/${id}/publish`, { method: 'PATCH' });
// // // // // // // //             // Update state lokal agar UI berubah instan
// // // // // // // //             setCourses(prev => prev.map(c => c._id === id ? { ...c, isPublished: !currentStatus } : c));
// // // // // // // //         } catch(e) { alert('Gagal update status'); }
// // // // // // // //     };

// // // // // // // //     // Buka Modal Buat Baru
// // // // // // // //     const handleCreate = () => {
// // // // // // // //         setSelectedCourse(null); 
// // // // // // // //         setShowModal(true);
// // // // // // // //     };

// // // // // // // //     // Buka Modal Edit
// // // // // // // //     const handleEdit = (course: any) => {
// // // // // // // //         setSelectedCourse(course); 
// // // // // // // //         setShowModal(true);
// // // // // // // //     };

// // // // // // // //     const handleSuccess = () => {
// // // // // // // //         setShowModal(false);
// // // // // // // //         loadData(); // Reload data setelah simpan
// // // // // // // //     };

// // // // // // // //     // Filter Pencarian
// // // // // // // //     const filteredCourses = courses.filter(c => 
// // // // // // // //         (c.title || '').toLowerCase().includes(search.toLowerCase())
// // // // // // // //     );

// // // // // // // //     if (loading) return <div className="p-20 text-center flex justify-center"><Loader2 className="animate-spin text-red-700"/></div>;

// // // // // // // //     return (
// // // // // // // //         <Protected roles={['SUPER_ADMIN', 'FACILITATOR', 'ADMIN']}>
// // // // // // // //             <div className="p-6 md:p-10 pb-32 max-w-7xl mx-auto min-h-screen bg-gray-50">
                
// // // // // // // //                 {/* HEADER */}
// // // // // // // //                 <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
// // // // // // // //                     <div>
// // // // // // // //                         <h1 className="text-3xl font-extrabold text-gray-900">Manajemen Pelatihan</h1>
// // // // // // // //                         <p className="text-gray-500 mt-1">Kelola daftar kursus, materi, dan peserta.</p>
// // // // // // // //                     </div>
// // // // // // // //                     <button 
// // // // // // // //                         onClick={handleCreate} 
// // // // // // // //                         className="bg-[#B91C1C] hover:bg-[#991B1B] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg transition-transform active:scale-95"
// // // // // // // //                     >
// // // // // // // //                         <Plus size={20}/> Buat Kelas Baru
// // // // // // // //                     </button>
// // // // // // // //                 </div>

// // // // // // // //                 {/* SEARCH & FILTER */}
// // // // // // // //                 <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm mb-6">
// // // // // // // //                     <div className="relative">
// // // // // // // //                         <Search className="absolute left-3 top-3 text-gray-400" size={20}/>
// // // // // // // //                         <input 
// // // // // // // //                             className="w-full pl-10 p-2.5 border rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-red-500 transition-all" 
// // // // // // // //                             placeholder="Cari judul pelatihan..." 
// // // // // // // //                             value={search}
// // // // // // // //                             onChange={e => setSearch(e.target.value)}
// // // // // // // //                         />
// // // // // // // //                     </div>
// // // // // // // //                 </div>

// // // // // // // //                 {/* TABLE LIST */}
// // // // // // // //                 <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
// // // // // // // //                     <table className="w-full text-left">
// // // // // // // //                         <thead className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
// // // // // // // //                             <tr>
// // // // // // // //                                 <th className="p-4 w-20">Cover</th>
// // // // // // // //                                 <th className="p-4">Info Pelatihan</th>
// // // // // // // //                                 <th className="p-4 hidden md:table-cell">Tipe & Harga</th>
// // // // // // // //                                 <th className="p-4 text-center">Status</th>
// // // // // // // //                                 <th className="p-4 text-center">Aksi</th>
// // // // // // // //                             </tr>
// // // // // // // //                         </thead>
// // // // // // // //                         <tbody className="divide-y divide-gray-100">
// // // // // // // //                             {filteredCourses.length === 0 ? (
// // // // // // // //                                 <tr><td colSpan={5} className="p-10 text-center text-gray-400 italic">Belum ada pelatihan ditemukan.</td></tr>
// // // // // // // //                             ) : (
// // // // // // // //                                 filteredCourses.map((course) => (
// // // // // // // //                                     <tr key={course._id} className="hover:bg-gray-50 transition-colors group">
                                        
// // // // // // // //                                         {/* 1. COVER */}
// // // // // // // //                                         <td className="p-4 align-top">
// // // // // // // //                                             <div className="w-20 h-14 bg-gray-200 rounded-lg overflow-hidden border border-gray-300 relative">
// // // // // // // //                                                 {course.thumbnailUrl ? (
// // // // // // // //                                                     <img src={getImageUrl(course.thumbnailUrl)} alt="" className="w-full h-full object-cover"/>
// // // // // // // //                                                 ) : (
// // // // // // // //                                                     <div className="flex items-center justify-center h-full text-gray-400"><ImageIcon size={20}/></div>
// // // // // // // //                                                 )}
// // // // // // // //                                             </div>
// // // // // // // //                                         </td>

// // // // // // // //                                         {/* 2. INFO UTAMA */}
// // // // // // // //                                         <td className="p-4 align-top">
// // // // // // // //                                             <div className="font-bold text-gray-900 text-base">{course.title}</div>
// // // // // // // //                                             <div className="text-xs text-gray-500 mt-1 line-clamp-1">{course.description || 'Tidak ada deskripsi'}</div>
// // // // // // // //                                             <div className="flex gap-2 mt-2">
// // // // // // // //                                                 <span className="text-[10px] px-2 py-0.5 rounded border bg-gray-100 text-gray-600 border-gray-200 flex items-center gap-1">
// // // // // // // //                                                     <BookOpen size={10}/> {course.modules?.length || 0} Modul
// // // // // // // //                                                 </span>
// // // // // // // //                                                 {!isFacilitator && (
// // // // // // // //                                                     <span className="text-[10px] px-2 py-0.5 rounded border bg-gray-100 text-gray-600 border-gray-200">
// // // // // // // //                                                         Fasilitator: {course.facilitatorIds?.[0]?.name?.split(' ')[0] || 'Admin'}
// // // // // // // //                                                     </span>
// // // // // // // //                                                 )}
// // // // // // // //                                             </div>
// // // // // // // //                                         </td>

// // // // // // // //                                         {/* 3. TIPE & HARGA */}
// // // // // // // //                                         <td className="p-4 align-top hidden md:table-cell">
// // // // // // // //                                             <div className={`text-[10px] px-2 py-0.5 rounded border uppercase font-bold w-fit mb-1 ${course.programType === 'training' ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-purple-50 text-purple-700 border-purple-100'}`}>
// // // // // // // //                                                 {course.programType === 'training' ? 'Diklat' : 'Kursus'}
// // // // // // // //                                             </div>
// // // // // // // //                                             <div className="font-bold text-green-700 text-sm">
// // // // // // // //                                                 {course.price === 0 ? 'Gratis' : `Rp ${course.price.toLocaleString('id-ID')}`}
// // // // // // // //                                             </div>
// // // // // // // //                                         </td>

// // // // // // // //                                         {/* 4. STATUS (TOGGLE) */}
// // // // // // // //                                         <td className="p-4 align-top text-center">
// // // // // // // //                                             <button 
// // // // // // // //                                                 onClick={() => handleTogglePublish(course._id, course.isPublished)}
// // // // // // // //                                                 className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide flex items-center justify-center gap-1 w-24 mx-auto transition-all ${
// // // // // // // //                                                     course.isPublished 
// // // // // // // //                                                     ? 'bg-green-100 text-green-700 hover:bg-green-200' 
// // // // // // // //                                                     : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
// // // // // // // //                                                 }`}
// // // // // // // //                                                 title={course.isPublished ? "Klik untuk sembunyikan (Draft)" : "Klik untuk terbitkan (Publish)"}
// // // // // // // //                                             >
// // // // // // // //                                                 {course.isPublished ? <><Eye size={12}/> Terbit</> : <><EyeOff size={12}/> Draft</>}
// // // // // // // //                                             </button>
// // // // // // // //                                         </td>

// // // // // // // //                                         {/* 5. AKSI */}
// // // // // // // //                                         <td className="p-4 align-top text-center">
// // // // // // // //                                             <div className="flex justify-center gap-2">
// // // // // // // //                                                 {/* Edit Detail (Modal) */}
// // // // // // // //                                                 <button onClick={() => handleEdit(course)} className="p-2 border rounded-lg text-blue-600 hover:bg-blue-50 border-blue-100 transition-colors" title="Edit Info">
// // // // // // // //                                                     <Edit2 size={18}/>
// // // // // // // //                                                 </button>

// // // // // // // //                                                 {/* Kelola Materi (Pindah Halaman) */}
// // // // // // // //                                                 <Link href={`/admin/courses/${course._id}`} className="p-2 border rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors" title="Kelola Materi & Peserta">
// // // // // // // //                                                     <Settings size={18}/>
// // // // // // // //                                                 </Link>
                                                
// // // // // // // //                                                 {/* Hapus */}
// // // // // // // //                                                 <button onClick={() => handleDelete(course._id)} className="p-2 border rounded-lg text-red-600 hover:bg-red-50 border-red-100 transition-colors" title="Hapus">
// // // // // // // //                                                     <Trash2 size={18}/>
// // // // // // // //                                                 </button>
// // // // // // // //                                             </div>
// // // // // // // //                                         </td>
// // // // // // // //                                     </tr>
// // // // // // // //                                 ))
// // // // // // // //                             )}
// // // // // // // //                         </tbody>
// // // // // // // //                     </table>
// // // // // // // //                 </div>

// // // // // // // //                 {/* MODAL FORM (Dipasang kembali) */}
// // // // // // // //                 {showModal && (
// // // // // // // //                     <CourseFormModal 
// // // // // // // //                         course={selectedCourse}
// // // // // // // //                         facilitators={facilitators}
// // // // // // // //                         currentUser={user}
// // // // // // // //                         onClose={() => setShowModal(false)}
// // // // // // // //                         onSuccess={handleSuccess}
// // // // // // // //                     />
// // // // // // // //                 )}

// // // // // // // //             </div>
// // // // // // // //         </Protected>
// // // // // // // //     );
// // // // // // // // }

// // // // // // 'use client';

// // // // // // import { useState, useEffect } from 'react';
// // // // // // import { useRouter } from 'next/navigation';
// // // // // // import Link from 'next/link';
// // // // // // import { api, getImageUrl } from '@/lib/api';
// // // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // // import Protected from '@/components/Protected';
// // // // // // import { 
// // // // // //     Plus, Search, Edit2, Trash2, BookOpen, Settings, 
// // // // // //     Loader2, Eye, EyeOff, Image as ImageIcon
// // // // // // } from 'lucide-react';
// // // // // // import CourseFormModal from '@/components/admin/courses/CourseFormModal';

// // // // // // export default function AdminCoursesPage() {
// // // // // //     const { user } = useAuth();
// // // // // //     const router = useRouter();
    
// // // // // //     const [courses, setCourses] = useState<any[]>([]); 
// // // // // //     const [loading, setLoading] = useState(true);
// // // // // //     const [search, setSearch] = useState('');
    
// // // // // //     const [showModal, setShowModal] = useState(false);
// // // // // //     const [selectedCourse, setSelectedCourse] = useState<any>(null);
// // // // // //     const [facilitators, setFacilitators] = useState<any[]>([]);

// // // // // //     const isFacilitator = user?.role === 'FACILITATOR';

// // // // // //     useEffect(() => { loadData(); }, []);

// // // // // //     const loadData = async () => {
// // // // // //         try {
// // // // // //             setLoading(true);
// // // // // //             const [resCourses, resUsers] = await Promise.all([
// // // // // //                 api('/api/courses?limit=100'),
// // // // // //                 api('/api/admin/users')
// // // // // //             ]);
            
// // // // // //             const list = Array.isArray(resCourses) ? resCourses : (resCourses.courses || []);
// // // // // //             setCourses(list);
            
// // // // // //             if (resUsers.users) {
// // // // // //                 const facs = resUsers.users.filter((u: any) => 
// // // // // //                     u.role === 'FACILITATOR' || u.role === 'SUPER_ADMIN' || u.role === 'ADMIN'
// // // // // //                 );
// // // // // //                 setFacilitators(facs);
// // // // // //             }
// // // // // //         } catch (e) { console.error(e); } finally { setLoading(false); }
// // // // // //     };

// // // // // //     const handleDelete = async (id: string) => {
// // // // // //         if (!confirm('Hapus pelatihan ini?')) return;
// // // // // //         try {
// // // // // //             await api(`/api/courses/${id}`, { method: 'DELETE' });
// // // // // //             setCourses(prev => prev.filter(c => c._id !== id));
// // // // // //         } catch (e: any) { alert(e.message); }
// // // // // //     };

// // // // // //     const handleTogglePublish = async (id: string, currentStatus: boolean) => {
// // // // // //         try {
// // // // // //             await api(`/api/courses/${id}/publish`, { method: 'PATCH' });
// // // // // //             setCourses(prev => prev.map(c => c._id === id ? { ...c, isPublished: !currentStatus } : c));
// // // // // //         } catch(e) { alert('Gagal update status'); }
// // // // // //     };

// // // // // //     const handleCreate = () => { setSelectedCourse(null); setShowModal(true); };
// // // // // //     const handleEdit = (course: any) => { setSelectedCourse(course); setShowModal(true); };
// // // // // //     const handleSuccess = () => { setShowModal(false); loadData(); };

// // // // // //     const filteredCourses = courses.filter(c => (c.title || '').toLowerCase().includes(search.toLowerCase()));

// // // // // //     if (loading) return <div className="p-20 text-center flex justify-center"><Loader2 className="animate-spin text-red-700"/></div>;

// // // // // //     return (
// // // // // //         <Protected roles={['SUPER_ADMIN', 'FACILITATOR', 'ADMIN']}>
// // // // // //             <div className="p-6 md:p-10 pb-32 max-w-7xl mx-auto min-h-screen bg-gray-50">
// // // // // //                 <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
// // // // // //                     <div>
// // // // // //                         <h1 className="text-3xl font-extrabold text-gray-900">Manajemen Pelatihan</h1>
// // // // // //                         <p className="text-gray-500 mt-1">Kelola daftar kursus, materi, dan peserta.</p>
// // // // // //                     </div>
// // // // // //                     <button onClick={handleCreate} className="bg-[#B91C1C] hover:bg-[#991B1B] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg active:scale-95 transition-transform">
// // // // // //                         <Plus size={20}/> Buat Kelas Baru
// // // // // //                     </button>
// // // // // //                 </div>

// // // // // //                 <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm mb-6">
// // // // // //                     <div className="relative">
// // // // // //                         <Search className="absolute left-3 top-3 text-gray-400" size={20}/>
// // // // // //                         <input className="w-full pl-10 p-2.5 border rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-red-500 transition-all" placeholder="Cari judul pelatihan..." value={search} onChange={e => setSearch(e.target.value)}/>
// // // // // //                     </div>
// // // // // //                 </div>

// // // // // //                 <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
// // // // // //                     <table className="w-full text-left">
// // // // // //                         <thead className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
// // // // // //                             <tr>
// // // // // //                                 <th className="p-4 w-20">Cover</th>
// // // // // //                                 <th className="p-4">Info Pelatihan</th>
// // // // // //                                 {/* [FIX 1] Kolom Tipe & Harga DIPISAH */}
// // // // // //                                 <th className="p-4">Tipe Program</th>
// // // // // //                                 <th className="p-4">Harga</th>
// // // // // //                                 <th className="p-4 text-center">Status</th>
// // // // // //                                 <th className="p-4 text-center">Aksi</th>
// // // // // //                             </tr>
// // // // // //                         </thead>
// // // // // //                         <tbody className="divide-y divide-gray-100">
// // // // // //                             {filteredCourses.length === 0 ? (
// // // // // //                                 <tr><td colSpan={6} className="p-10 text-center text-gray-400 italic">Belum ada pelatihan.</td></tr>
// // // // // //                             ) : (
// // // // // //                                 filteredCourses.map((course) => (
// // // // // //                                     <tr key={course._id} className="hover:bg-gray-50 transition-colors group">
// // // // // //                                         <td className="p-4 align-top">
// // // // // //                                             <div className="w-20 h-14 bg-gray-200 rounded-lg overflow-hidden border border-gray-300 relative">
// // // // // //                                                 {course.thumbnailUrl ? <img src={getImageUrl(course.thumbnailUrl)} alt="" className="w-full h-full object-cover"/> : <div className="flex items-center justify-center h-full text-gray-400"><ImageIcon size={20}/></div>}
// // // // // //                                             </div>
// // // // // //                                         </td>
// // // // // //                                         <td className="p-4 align-top">
// // // // // //                                             <div className="font-bold text-gray-900 text-base line-clamp-2">{course.title}</div>
// // // // // //                                             <div className="flex gap-2 mt-1">
// // // // // //                                                 <span className="text-[10px] px-2 py-0.5 rounded border bg-gray-100 text-gray-600 border-gray-200 flex items-center gap-1"><BookOpen size={10}/> {course.modules?.length || 0} Modul</span>
// // // // // //                                             </div>
// // // // // //                                         </td>
// // // // // //                                         {/* [FIX 1] Kolom Tipe Terpisah */}
// // // // // //                                         <td className="p-4 align-top">
// // // // // //                                              <span className={`text-[10px] px-2 py-1 rounded border uppercase font-bold ${course.programType === 'training' ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-purple-50 text-purple-700 border-purple-100'}`}>
// // // // // //                                                 {course.programType === 'training' ? 'Diklat' : 'Kursus'}
// // // // // //                                             </span>
// // // // // //                                         </td>
// // // // // //                                         {/* [FIX 1] Kolom Harga Terpisah */}
// // // // // //                                         <td className="p-4 align-top font-bold text-green-700 text-sm">
// // // // // //                                             {course.price === 0 ? 'Gratis' : `Rp ${course.price.toLocaleString('id-ID')}`}
// // // // // //                                         </td>
// // // // // //                                         <td className="p-4 align-top text-center">
// // // // // //                                             <button onClick={() => handleTogglePublish(course._id, course.isPublished)} className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide flex items-center justify-center gap-1 w-24 mx-auto transition-all ${course.isPublished ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
// // // // // //                                                 {course.isPublished ? <><Eye size={12}/> Terbit</> : <><EyeOff size={12}/> Draft</>}
// // // // // //                                             </button>
// // // // // //                                         </td>
// // // // // //                                         <td className="p-4 align-top text-center">
// // // // // //                                             <div className="flex justify-center gap-2">
// // // // // //                                                 <button onClick={() => handleEdit(course)} className="p-2 border rounded-lg text-blue-600 hover:bg-blue-50 transition-colors" title="Edit Info"><Edit2 size={18}/></button>
// // // // // //                                                 <Link href={`/admin/courses/${course._id}`} className="p-2 border rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors" title="Kelola Materi"><Settings size={18}/></Link>
// // // // // //                                                 <button onClick={() => handleDelete(course._id)} className="p-2 border rounded-lg text-red-600 hover:bg-red-50 transition-colors" title="Hapus"><Trash2 size={18}/></button>
// // // // // //                                             </div>
// // // // // //                                         </td>
// // // // // //                                     </tr>
// // // // // //                                 ))
// // // // // //                             )}
// // // // // //                         </tbody>
// // // // // //                     </table>
// // // // // //                 </div>
                
// // // // // //                 {showModal && <CourseFormModal course={selectedCourse} facilitators={facilitators} currentUser={user} onClose={() => setShowModal(false)} onSuccess={handleSuccess} />}
// // // // // //             </div>
// // // // // //         </Protected>
// // // // // //     );
// // // // // // }


// // // // // 'use client';

// // // // // import { useState, useEffect, useRef } from 'react';
// // // // // import { api, getImageUrl } from '@/lib/api';
// // // // // import Protected from '@/components/Protected';
// // // // // import { 
// // // // //     Plus, Search, BookOpen, FileText, Loader2, ChevronLeft, ChevronRight, User
// // // // // } from 'lucide-react';
// // // // // import CourseFormModal from '@/components/admin/courses/CourseFormModal';
// // // // // import CourseProposalModal from '@/components/admin/courses/CourseProposalModal'; 
// // // // // import ProposalTable from '@/components/admin/courses/ProposalTable'; 
// // // // // import ManagementTable from '@/components/admin/courses/ManagementTable'; 

// // // // // export default function AdminCoursesPage() {
// // // // //   const [courses, setCourses] = useState<any[]>([]);
// // // // //   const [facilitators, setFacilitators] = useState<any[]>([]);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [search, setSearch] = useState('');
// // // // //   const [page, setPage] = useState(1);
// // // // //   const [totalPages, setTotalPages] = useState(1);
  
// // // // //   // [UBAH] Default Tab sekarang 'proposal' (Pengajuan Masuk)
// // // // //   const [activeMainTab, setActiveMainTab] = useState<'proposal' | 'management'>('proposal');

// // // // //   // Modal State
// // // // //   const [isProposalOpen, setIsProposalOpen] = useState(false); 
// // // // //   const [isEditModalOpen, setIsEditModalOpen] = useState(false); 
// // // // //   const [editingCourse, setEditingCourse] = useState<any>(null);

// // // // //   // Mock User
// // // // //   const currentUser = { name: 'Admin', email: 'admin@humanis.com', role: 'SUPER_ADMIN', phoneNumber: '-' }; 

// // // // //   useEffect(() => {
// // // // //     fetchCourses();
// // // // //     fetchFacilitators();
// // // // //   }, [page, search, activeMainTab]);

// // // // //   const fetchCourses = async () => {
// // // // //     setLoading(true);
// // // // //     try {
// // // // //         const query = new URLSearchParams({ page: page.toString(), limit: '10', search });
// // // // //         const res = await api(`/api/courses?${query}`);
        
// // // // //         let data = res.courses || [];
        
// // // // //         // Filter Client Side
// // // // //         if (activeMainTab === 'proposal') {
// // // // //             data = data.filter((c:any) => c.status === 'proposed');
// // // // //         } else {
// // // // //             // Tab Manajemen: Ambil yang TIDAK proposed (Draft, Published, Archived)
// // // // //             data = data.filter((c:any) => c.status !== 'proposed');
// // // // //         }
// // // // //         setCourses(data);
// // // // //         setTotalPages(res.totalPages || 1);
// // // // //     } catch (error) { console.error("Gagal load courses", error); } finally { setLoading(false); }
// // // // //   };

// // // // //   const fetchFacilitators = async () => {
// // // // //       try {
// // // // //           const res = await api('/api/users').catch(() => ({ users: [] }));
// // // // //           setFacilitators(res.users || []);
// // // // //       } catch (e) { console.error(e); }
// // // // //   };

// // // // //   // --- ACTIONS ---
// // // // //   const handleDelete = async (id: string) => {
// // // // //       if(!confirm("Yakin ingin menghapus pelatihan ini secara permanen?")) return;
// // // // //       try { await api(`/api/courses/${id}`, { method: 'DELETE' }); fetchCourses(); } catch (e: any) { alert(e.message); }
// // // // //   };
  
// // // // //   const handleApprove = async (course: any) => {
// // // // //       if(!confirm(`Setujui pengajuan "${course.title}"?`)) return;
// // // // //       try { await api(`/api/courses/${course._id}`, { method: 'PATCH', body: { status: 'draft' } }); alert("✅ Disetujui! Pindah ke tab Manajemen."); fetchCourses(); } catch (e: any) { alert(e.message); }
// // // // //   };

// // // // //   const handlePublish = async (course: any) => {
// // // // //       const newStatus = course.status === 'published' ? 'draft' : 'published';
// // // // //       if(!confirm(`${newStatus === 'published' ? 'Terbitkan' : 'Tarik'} pelatihan ini?`)) return;
// // // // //       try { await api(`/api/courses/${course._id}`, { method: 'PATCH', body: { status: newStatus } }); fetchCourses(); } catch (e: any) { alert(e.message); }
// // // // //   };

// // // // //   // [BARU] Handler Broadcast
// // // // //   const handleBroadcast = (course: any) => {
// // // // //       const msg = prompt(`Kirim Broadcast Notifikasi untuk "${course.title}"?\n\nMasukkan pesan tambahan (opsional):`);
// // // // //       if (msg !== null) {
// // // // //           // Logic API broadcast disini
// // // // //           alert(`Broadcast terkirim ke semua peserta!\nPesan: "${msg}"`);
// // // // //       }
// // // // //   };

// // // // //   return (
// // // // //     <Protected roles={['SUPER_ADMIN', 'ADMIN', 'FACILITATOR']}>
// // // // //       <div className="p-6 md:p-8 min-h-screen bg-gray-50">
        
// // // // //         {/* Header */}
// // // // //         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
// // // // //             <div><h1 className="text-2xl font-bold text-gray-900">Pusat Pelatihan</h1><p className="text-gray-500 text-sm mt-1">Kelola pengajuan dan kurikulum pelatihan.</p></div>
// // // // //             <button onClick={() => setIsProposalOpen(true)} className="bg-[#990000] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-[#7f0000] transition-colors shadow-lg shadow-red-100" aria-label="Buat Pengajuan Baru"><Plus size={18}/> Buat Pengajuan Baru</button>
// // // // //         </div>

// // // // //         {/* Tab Navigasi (DITUKAR URUTANNYA) */}
// // // // //         <div className="flex gap-1 bg-white p-1 rounded-xl shadow-sm border border-gray-200 mb-6 w-fit">
// // // // //             <button onClick={() => { setActiveMainTab('proposal'); setPage(1); }} className={`px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeMainTab === 'proposal' ? 'bg-[#990000] text-white shadow' : 'text-gray-500 hover:bg-gray-50'}`} aria-label="Tab Pengajuan Masuk"><FileText size={16}/> Pengajuan Masuk</button>
// // // // //             <button onClick={() => { setActiveMainTab('management'); setPage(1); }} className={`px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeMainTab === 'management' ? 'bg-[#990000] text-white shadow' : 'text-gray-500 hover:bg-gray-50'}`} aria-label="Tab Manajemen Pelatihan"><BookOpen size={16}/> Manajemen Pelatihan</button>
// // // // //         </div>

// // // // //         {/* Search */}
// // // // //         <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6"><div className="relative w-full"><Search className="absolute left-3 top-2.5 text-gray-400" size={18}/><input type="text" placeholder={activeMainTab === 'proposal' ? "Cari pengajuan..." : "Cari pelatihan..."} className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-100 outline-none text-sm transition-all" value={search} onChange={(e) => setSearch(e.target.value)} aria-label="Search Input"/></div></div>

// // // // //         {/* Tabel Konten */}
// // // // //         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden min-h-[400px]">
// // // // //             {loading ? <div className="p-12 flex justify-center"><Loader2 className="animate-spin text-gray-400"/></div> : (
// // // // //                 <>
// // // // //                     {activeMainTab === 'proposal' ? (
// // // // //                         <ProposalTable courses={courses} onApprove={handleApprove} onReject={(id) => handleDelete(id)}/>
// // // // //                     ) : (
// // // // //                         <ManagementTable 
// // // // //                             courses={courses} 
// // // // //                             onEdit={(c) => { setEditingCourse(c); setIsEditModalOpen(true); }} 
// // // // //                             onDelete={handleDelete} 
// // // // //                             onPublish={handlePublish} 
// // // // //                             onBroadcast={handleBroadcast} // Pass fungsi broadcast
// // // // //                             currentUser={currentUser}
// // // // //                         />
// // // // //                     )}
// // // // //                 </>
// // // // //             )}
// // // // //             <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-gray-50">
// // // // //                 <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="p-2 hover:bg-white rounded-lg disabled:opacity-30 border border-transparent hover:border-gray-200" aria-label="Halaman Sebelumnya"><ChevronLeft size={16}/></button>
// // // // //                 <span className="text-xs font-bold text-gray-500">Halaman {page} dari {totalPages}</span>
// // // // //                 <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="p-2 hover:bg-white rounded-lg disabled:opacity-30 border border-transparent hover:border-gray-200" aria-label="Halaman Selanjutnya"><ChevronRight size={16}/></button>
// // // // //             </div>
// // // // //         </div>

// // // // //         {/* Modals */}
// // // // //         {isProposalOpen && <CourseProposalModal onClose={() => setIsProposalOpen(false)} onSuccess={() => { setIsProposalOpen(false); fetchCourses(); }} currentUser={currentUser} />}
// // // // //         {isEditModalOpen && <CourseFormModal course={editingCourse} onClose={() => setIsEditModalOpen(false)} onSuccess={() => { setIsEditModalOpen(false); fetchCourses(); }} facilitators={facilitators} currentUser={currentUser} />}
// // // // //       </div>
// // // // //     </Protected>
// // // // //   );
// // // // // }
// // // // 'use client';

// // // // import { useState, useEffect, useRef } from 'react';
// // // // import { api, getImageUrl } from '@/lib/api';
// // // // import Protected from '@/components/Protected';
// // // // import { 
// // // //     Plus, Search, BookOpen, FileText, Loader2, ChevronLeft, ChevronRight, RefreshCw
// // // // } from 'lucide-react';
// // // // import CourseFormModal from '@/components/admin/courses/CourseFormModal';
// // // // import CourseProposalModal from '@/components/admin/courses/CourseProposalModal'; 
// // // // import ProposalTable from '@/components/admin/courses/ProposalTable'; 
// // // // import ManagementTable from '@/components/admin/courses/ManagementTable'; 

// // // // export default function AdminCoursesPage() {
// // // //   const [courses, setCourses] = useState<any[]>([]);
// // // //   const [facilitators, setFacilitators] = useState<any[]>([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [search, setSearch] = useState('');
// // // //   const [page, setPage] = useState(1);
// // // //   const [totalPages, setTotalPages] = useState(1);
  
// // // //   // Tab Default: Proposal
// // // //   const [activeMainTab, setActiveMainTab] = useState<'proposal' | 'management'>('proposal');

// // // //   const [isProposalOpen, setIsProposalOpen] = useState(false); 
// // // //   const [isEditModalOpen, setIsEditModalOpen] = useState(false); 
// // // //   const [editingCourse, setEditingCourse] = useState<any>(null);

// // // //   const currentUser = { name: 'Admin', email: 'admin@humanis.com', role: 'SUPER_ADMIN', phoneNumber: '-' }; 

// // // //   useEffect(() => {
// // // //     fetchCourses();
// // // //     fetchFacilitators();
// // // //   }, [page, search, activeMainTab]);

// // // //   const fetchCourses = async () => {
// // // //     setLoading(true);
// // // //     try {
// // // //         // [FIX LOGIC] 
// // // //         // Jika Tab Proposal, kita minta data lebih banyak (limit 50) dan urutkan dari yang terbaru (sort=-createdAt).
// // // //         // Ini untuk mengatasi jika backend melakukan pagination default (misal 10 data lama).
        
// // // //         const isProposalTab = activeMainTab === 'proposal';
// // // //         const limit = isProposalTab ? '50' : '10'; 
        
// // // //         // Status yang diminta ke backend
// // // //         const statusReq = isProposalTab ? 'proposed' : 'draft,published,archived';

// // // //         const query = new URLSearchParams({ 
// // // //             page: page.toString(), 
// // // //             limit: limit, 
// // // //             search, 
// // // //             sort: '-createdAt', // [PENTING] Minta data terbaru
// // // //             status: statusReq 
// // // //         });

// // // //         const res = await api(`/api/courses?${query}`);
        
// // // //         // Debugging: Cek di Console Browser apa yang dikirim backend
// // // //         console.log(`Fetch [${activeMainTab}] Result:`, res);

// // // //         let data = res.courses || [];
        
// // // //         // [CLIENT FILTERING]
// // // //         // Filter ulang di sisi client untuk memastikan data yang tampil benar-benar sesuai tab
// // // //         if (isProposalTab) {
// // // //             data = data.filter((c:any) => c.status === 'proposed');
// // // //         } else {
// // // //             // Tab Manajemen: Tampilkan semua KECUALI yang proposed
// // // //             data = data.filter((c:any) => c.status !== 'proposed');
// // // //         }

// // // //         setCourses(data);
// // // //         setTotalPages(res.totalPages || 1);
// // // //     } catch (error) { 
// // // //         console.error("Gagal load courses", error); 
// // // //     } finally { 
// // // //         setLoading(false); 
// // // //     }
// // // //   };

// // // //   const fetchFacilitators = async () => {
// // // //       try {
// // // //           const res = await api('/api/users').catch(() => ({ users: [] }));
// // // //           setFacilitators(res.users || []);
// // // //       } catch (e) { console.error(e); }
// // // //   };

// // // //   // --- ACTIONS ---
// // // //   const handleDelete = async (id: string) => {
// // // //       if(!confirm("Yakin ingin menghapus data ini secara permanen?")) return;
// // // //       try { await api(`/api/courses/${id}`, { method: 'DELETE' }); fetchCourses(); } catch (e: any) { alert(e.message); }
// // // //   };
  
// // // //   const handleApprove = async (course: any) => {
// // // //       if(!confirm(`Setujui pengajuan "${course.title}"?`)) return;
// // // //       try { await api(`/api/courses/${course._id}`, { method: 'PATCH', body: { status: 'draft' } }); alert("✅ Disetujui! Pindah ke tab Manajemen."); fetchCourses(); } catch (e: any) { alert(e.message); }
// // // //   };

// // // //   const handlePublish = async (course: any) => {
// // // //       const newStatus = course.status === 'published' ? 'draft' : 'published';
// // // //       if(!confirm(`${newStatus === 'published' ? 'Terbitkan' : 'Tarik'} pelatihan ini?`)) return;
// // // //       try { await api(`/api/courses/${course._id}`, { method: 'PATCH', body: { status: newStatus } }); fetchCourses(); } catch (e: any) { alert(e.message); }
// // // //   };

// // // //   const handleBroadcast = (course: any) => {
// // // //       const msg = prompt(`Kirim Broadcast untuk "${course.title}"?`);
// // // //       if (msg) alert(`Broadcast terkirim: ${msg}`);
// // // //   };

// // // //   return (
// // // //     <Protected roles={['SUPER_ADMIN', 'ADMIN', 'FACILITATOR']}>
// // // //       <div className="p-6 md:p-8 min-h-screen bg-gray-50">
        
// // // //         {/* Header */}
// // // //         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
// // // //             <div>
// // // //                 <div className="flex items-center gap-3">
// // // //                     <h1 className="text-2xl font-bold text-gray-900">Pusat Pelatihan</h1>
// // // //                     <button onClick={fetchCourses} className="p-1.5 rounded-full hover:bg-gray-200 text-gray-500 transition-colors" title="Refresh Data" aria-label="Refresh Data">
// // // //                         <RefreshCw size={16} className={loading ? "animate-spin" : ""}/>
// // // //                     </button>
// // // //                 </div>
// // // //                 <p className="text-gray-500 text-sm mt-1">Kelola pengajuan dan kurikulum pelatihan.</p>
// // // //             </div>
// // // //             <button 
// // // //                 onClick={() => setIsProposalOpen(true)} 
// // // //                 className="bg-[#990000] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-[#7f0000] transition-colors shadow-lg shadow-red-100" 
// // // //                 aria-label="Buat Pengajuan Baru"
// // // //             >
// // // //                 <Plus size={18}/> Buat Pengajuan Baru
// // // //             </button>
// // // //         </div>

// // // //         {/* Tab Navigasi */}
// // // //         <div className="flex gap-1 bg-white p-1 rounded-xl shadow-sm border border-gray-200 mb-6 w-fit">
// // // //             <button onClick={() => { setActiveMainTab('proposal'); setPage(1); }} className={`px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeMainTab === 'proposal' ? 'bg-[#990000] text-white shadow' : 'text-gray-500 hover:bg-gray-50'}`} aria-label="Tab Pengajuan Masuk"><FileText size={16}/> Pengajuan Masuk</button>
// // // //             <button onClick={() => { setActiveMainTab('management'); setPage(1); }} className={`px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeMainTab === 'management' ? 'bg-[#990000] text-white shadow' : 'text-gray-500 hover:bg-gray-50'}`} aria-label="Tab Manajemen Pelatihan"><BookOpen size={16}/> Manajemen Pelatihan</button>
// // // //         </div>

// // // //         {/* Search */}
// // // //         <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6">
// // // //             <div className="relative w-full">
// // // //                 <Search className="absolute left-3 top-2.5 text-gray-400" size={18}/>
// // // //                 <input 
// // // //                     type="text" 
// // // //                     placeholder={activeMainTab === 'proposal' ? "Cari pengajuan..." : "Cari pelatihan aktif..."} 
// // // //                     className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-100 outline-none text-sm transition-all" 
// // // //                     value={search} 
// // // //                     onChange={(e) => setSearch(e.target.value)} 
// // // //                     aria-label="Cari Data"
// // // //                 />
// // // //             </div>
// // // //         </div>

// // // //         {/* Tabel Konten */}
// // // //         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden min-h-[400px]">
// // // //             {loading ? <div className="p-12 flex justify-center"><Loader2 className="animate-spin text-gray-400"/></div> : (
// // // //                 <>
// // // //                     {activeMainTab === 'proposal' ? (
// // // //                         <ProposalTable courses={courses} onApprove={handleApprove} onReject={(id) => handleDelete(id)}/>
// // // //                     ) : (
// // // //                         <ManagementTable 
// // // //                             courses={courses} 
// // // //                             onEdit={(c) => { setEditingCourse(c); setIsEditModalOpen(true); }} 
// // // //                             onDelete={handleDelete} 
// // // //                             onPublish={handlePublish} 
// // // //                             onBroadcast={handleBroadcast} 
// // // //                             currentUser={currentUser}
// // // //                         />
// // // //                     )}
// // // //                 </>
// // // //             )}
// // // //             <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-gray-50">
// // // //                 <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="p-2 hover:bg-white rounded-lg disabled:opacity-30 border border-transparent hover:border-gray-200" aria-label="Halaman Sebelumnya"><ChevronLeft size={16}/></button>
// // // //                 <span className="text-xs font-bold text-gray-500">Halaman {page} dari {totalPages}</span>
// // // //                 <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="p-2 hover:bg-white rounded-lg disabled:opacity-30 border border-transparent hover:border-gray-200" aria-label="Halaman Selanjutnya"><ChevronRight size={16}/></button>
// // // //             </div>
// // // //         </div>

// // // //         {/* Modals */}
// // // //         {isProposalOpen && <CourseProposalModal onClose={() => setIsProposalOpen(false)} onSuccess={() => { setIsProposalOpen(false); fetchCourses(); }} currentUser={currentUser} />}
// // // //         {isEditModalOpen && <CourseFormModal course={editingCourse} onClose={() => setIsEditModalOpen(false)} onSuccess={() => { setIsEditModalOpen(false); fetchCourses(); }} facilitators={facilitators} currentUser={currentUser} />}
// // // //       </div>
// // // //     </Protected>
// // // //   );
// // // // }

// // // 'use client';

// // // import { useState, useEffect } from 'react';
// // // import { api } from '@/lib/api';
// // // import Protected from '@/components/Protected';
// // // import { 
// // //     Plus, Search, BookOpen, FileText, Loader2, ChevronLeft, ChevronRight, RefreshCw
// // // } from 'lucide-react';
// // // import CourseFormModal from '@/components/admin/courses/CourseFormModal';
// // // import CourseProposalModal from '@/components/admin/courses/CourseProposalModal'; 
// // // import ProposalTable from '@/components/admin/courses/ProposalTable'; 
// // // import ManagementTable from '@/components/admin/courses/ManagementTable'; 
// // // import CourseProposalDetailModal from '@/components/admin/courses/CourseProposalDetailModal';

// // // export default function AdminCoursesPage() {
// // //   const [courses, setCourses] = useState<any[]>([]);
// // //   const [facilitators, setFacilitators] = useState<any[]>([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [search, setSearch] = useState('');
// // //   const [page, setPage] = useState(1);
// // //   const [totalPages, setTotalPages] = useState(1);
  
// // //   const [activeMainTab, setActiveMainTab] = useState<'proposal' | 'management'>('proposal');

// // //   const [isProposalOpen, setIsProposalOpen] = useState(false); 
// // //   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
// // //   const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
// // //   const [isReadOnlyModal, setIsReadOnlyModal] = useState(false); // [STATE BARU]
// // //   const [editingCourse, setEditingCourse] = useState<any>(null);

// // //   const currentUser = { name: 'Admin', email: 'admin@humanis.com', role: 'SUPER_ADMIN', phoneNumber: '-' }; 

// // //   useEffect(() => { fetchCourses(); fetchFacilitators(); }, [page, search, activeMainTab]);

// // //   const fetchCourses = async () => {
// // //     setLoading(true);
// // //     try {
// // //         const isProposalTab = activeMainTab === 'proposal';
// // //         const limit = '50'; 
// // //         const query = new URLSearchParams({ page: page.toString(), limit: limit, search, sort: '-createdAt' });
// // //         const res = await api(`/api/courses?${query}`);
// // //         let allData = res.courses || [];
// // //         let filteredData = [];
// // //         if (activeMainTab === 'proposal') {
// // //             filteredData = allData.filter((c:any) => c.status === 'proposed');
// // //         } else {
// // //             filteredData = allData.filter((c:any) => c.status !== 'proposed');
// // //         }
// // //         setCourses(filteredData);
// // //         setTotalPages(res.totalPages || 1); 
// // //     } catch (error) { console.error("Gagal load courses", error); } finally { setLoading(false); }
// // //   };

// // //   const fetchFacilitators = async () => {
// // //       try {
// // //           const res = await api('/api/users').catch(() => null); 
// // //           if (res?.users) setFacilitators(res.users);
// // //       } catch (e) { /* Silent */ }
// // //   };

// // //   const handleDelete = async (id: string) => {
// // //       if(!confirm("Yakin ingin menghapus data ini secara permanen?")) return;
// // //       try { await api(`/api/courses/${id}`, { method: 'DELETE' }); fetchCourses(); } catch (e: any) { alert(e.message); }
// // //   };
  
// // //   const handleApprove = async (course: any) => {
// // //       if(!confirm(`Setujui pengajuan "${course.title}"?`)) return;
// // //       try { 
// // //           await api(`/api/courses/${course._id}`, { method: 'PATCH', body: { status: 'draft' } }); 
// // //           alert("✅ Disetujui! Data dipindahkan ke tab Manajemen Pelatihan."); 
// // //           setIsDetailModalOpen(false); 
// // //           fetchCourses(); 
// // //       } catch (e: any) { alert(e.message); }
// // //   };

// // //   const handleReturn = async (course: any) => {
// // //       const note = prompt("Masukkan catatan perbaikan untuk pengaju:");
// // //       if (note === null) return; 
// // //       try {
// // //           const newDesc = course.description + `<br/><br/><div style="background:#fff3cd;padding:10px;border:1px solid #ffeeba;"><strong>⚠️ Catatan Admin:</strong> ${note}</div>`;
// // //           await api(`/api/courses/${course._id}`, { 
// // //               method: 'PATCH', 
// // //               body: { status: 'revision', description: newDesc } 
// // //           });
// // //           alert("↩️ Pengajuan dikembalikan ke user untuk revisi.");
// // //           setIsDetailModalOpen(false);
// // //           fetchCourses();
// // //       } catch (e: any) { alert(e.message); }
// // //   };

// // //   const handlePublish = async (course: any) => {
// // //       const isCurrentlyActive = course.isPublished === true || course.status === 'published';
// // //       const newPublishedState = !isCurrentlyActive;
// // //       const newStatusString = newPublishedState ? 'published' : 'draft';
// // //       const actionText = newPublishedState ? 'Menerbitkan' : 'Menarik kembali';

// // //       if(!confirm(`Apakah Anda yakin ingin ${actionText} pelatihan ini?`)) return;
      
// // //       try { 
// // //           await api(`/api/courses/${course._id}`, { 
// // //               method: 'PATCH', 
// // //               body: { isPublished: newPublishedState, status: newStatusString } 
// // //           }); 
// // //           fetchCourses(); 
// // //       } catch (e: any) { alert(e.message); }
// // //   };

// // //   const handleBroadcast = (course: any) => {
// // //       const msg = prompt(`Kirim Broadcast untuk "${course.title}"?`);
// // //       if (msg) alert(`Broadcast terkirim: ${msg}`);
// // //   };

// // //   const openDetailProposal = (course: any) => {
// // //       setEditingCourse(course);
// // //       setIsReadOnlyModal(false); // Mode Aksi (Approve/Reject)
// // //       setIsDetailModalOpen(true);
// // //   };

// // //   const openHistory = (course: any) => {
// // //       setEditingCourse(course);
// // //       setIsReadOnlyModal(true); // Mode Baca Saja
// // //       setIsDetailModalOpen(true);
// // //   };

// // //   return (
// // //     <Protected roles={['SUPER_ADMIN', 'ADMIN', 'FACILITATOR']}>
// // //       <div className="p-6 md:p-8 min-h-screen bg-gray-50">
        
// // //         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
// // //             <div>
// // //                 <div className="flex items-center gap-3">
// // //                     <h1 className="text-2xl font-bold text-gray-900">Pusat Pelatihan</h1>
// // //                     <button onClick={fetchCourses} className="p-1.5 rounded-full hover:bg-gray-200 text-gray-500 transition-colors" title="Refresh Data" aria-label="Refresh">
// // //                         <RefreshCw size={16} className={loading ? "animate-spin" : ""}/>
// // //                     </button>
// // //                 </div>
// // //                 <p className="text-gray-500 text-sm mt-1">Kelola pengajuan dan kurikulum pelatihan.</p>
// // //             </div>
// // //             <button onClick={() => setIsProposalOpen(true)} className="bg-[#990000] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-[#7f0000] transition-colors shadow-lg shadow-red-100" aria-label="Buat Pengajuan Baru" title="Buat Pengajuan Baru">
// // //                 <Plus size={18}/> Buat Pengajuan Baru
// // //             </button>
// // //         </div>

// // //         <div className="flex gap-1 bg-white p-1 rounded-xl shadow-sm border border-gray-200 mb-6 w-fit">
// // //             <button onClick={() => { setActiveMainTab('proposal'); setPage(1); }} className={`px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeMainTab === 'proposal' ? 'bg-[#990000] text-white shadow' : 'text-gray-500 hover:bg-gray-50'}`} aria-label="Tab Pengajuan" title="Tab Pengajuan"><FileText size={16}/> Pengajuan Masuk</button>
// // //             <button onClick={() => { setActiveMainTab('management'); setPage(1); }} className={`px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeMainTab === 'management' ? 'bg-[#990000] text-white shadow' : 'text-gray-500 hover:bg-gray-50'}`} aria-label="Tab Manajemen" title="Tab Manajemen"><BookOpen size={16}/> Manajemen Pelatihan</button>
// // //         </div>

// // //         <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6">
// // //             <div className="relative w-full">
// // //                 <Search className="absolute left-3 top-2.5 text-gray-400" size={18}/>
// // //                 <input type="text" placeholder={activeMainTab === 'proposal' ? "Cari pengajuan..." : "Cari pelatihan aktif..."} className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-100 outline-none text-sm transition-all" value={search} onChange={(e) => setSearch(e.target.value)} aria-label="Cari Data" title="Cari Data"/>
// // //             </div>
// // //         </div>

// // //         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden min-h-[400px]">
// // //             {loading ? <div className="p-12 flex justify-center"><Loader2 className="animate-spin text-gray-400"/></div> : (
// // //                 <>
// // //                     {activeMainTab === 'proposal' ? (
// // //                         <ProposalTable 
// // //                             courses={courses} 
// // //                             onApprove={handleApprove} 
// // //                             onReject={handleReturn} 
// // //                             onViewDetail={openDetailProposal}
// // //                         />
// // //                     ) : (
// // //                         <ManagementTable 
// // //                             courses={courses} 
// // //                             onEdit={(c) => { setEditingCourse(c); setIsEditModalOpen(true); }} 
// // //                             onDelete={handleDelete} 
// // //                             onPublish={handlePublish} 
// // //                             onBroadcast={handleBroadcast} 
// // //                             onViewHistory={openHistory} // Handler Histori
// // //                             currentUser={currentUser}
// // //                         />
// // //                     )}
// // //                 </>
// // //             )}
// // //             <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-gray-50">
// // //                 <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="p-2 hover:bg-white rounded-lg disabled:opacity-30 border border-transparent hover:border-gray-200" aria-label="Prev" title="Halaman Sebelumnya"><ChevronLeft size={16}/></button>
// // //                 <span className="text-xs font-bold text-gray-500">Halaman {page} dari {totalPages}</span>
// // //                 <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="p-2 hover:bg-white rounded-lg disabled:opacity-30 border border-transparent hover:border-gray-200" aria-label="Next" title="Halaman Selanjutnya"><ChevronRight size={16}/></button>
// // //             </div>
// // //         </div>

// // //         {isProposalOpen && <CourseProposalModal onClose={() => setIsProposalOpen(false)} onSuccess={() => { setIsProposalOpen(false); fetchCourses(); }} currentUser={currentUser} />}
// // //         {isEditModalOpen && <CourseFormModal course={editingCourse} onClose={() => setIsEditModalOpen(false)} onSuccess={() => { setIsEditModalOpen(false); fetchCourses(); }} facilitators={facilitators} currentUser={currentUser} />}
// // //         {isDetailModalOpen && (
// // //             <CourseProposalDetailModal 
// // //                 course={editingCourse} 
// // //                 onClose={() => setIsDetailModalOpen(false)} 
// // //                 onApprove={handleApprove} 
// // //                 onReject={handleReturn} 
// // //                 isReadOnly={isReadOnlyModal} // Prop Mode
// // //             />
// // //         )}
// // //       </div>
// // //     </Protected>
// // //   );
// // // }


// // 'use client';

// // import { useState, useEffect } from 'react';
// // import { api } from '@/lib/api';
// // import Protected from '@/components/Protected';
// // import { 
// //     Plus, Search, BookOpen, FileText, Loader2, ChevronLeft, ChevronRight, RefreshCw
// // } from 'lucide-react';
// // import CourseFormModal from '@/components/admin/courses/CourseFormModal';
// // import CourseProposalModal from '@/components/admin/courses/CourseProposalModal'; 
// // import ProposalTable from '@/components/admin/courses/ProposalTable'; 
// // import ManagementTable from '@/components/admin/courses/ManagementTable'; 
// // import CourseProposalDetailModal from '@/components/admin/courses/CourseProposalDetailModal';

// // export default function AdminCoursesPage() {
// //   const [courses, setCourses] = useState<any[]>([]);
// //   const [facilitators, setFacilitators] = useState<any[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [search, setSearch] = useState('');
// //   const [page, setPage] = useState(1);
// //   const [totalPages, setTotalPages] = useState(1);
  
// //   const [activeMainTab, setActiveMainTab] = useState<'proposal' | 'management'>('proposal');

// //   const [isProposalOpen, setIsProposalOpen] = useState(false); 
// //   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
// //   const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
// //   const [isReadOnlyModal, setIsReadOnlyModal] = useState(false);
// //   const [editingCourse, setEditingCourse] = useState<any>(null);

// //   const currentUser = { name: 'Admin', email: 'admin@humanis.com', role: 'SUPER_ADMIN', phoneNumber: '-' }; 

// //   useEffect(() => { fetchCourses(); fetchFacilitators(); }, [page, search, activeMainTab]);

// //   const fetchCourses = async () => {
// //     setLoading(true);
// //     try {
// //         const isProposalTab = activeMainTab === 'proposal';
// //         const limit = '50'; 
// //         const query = new URLSearchParams({ page: page.toString(), limit: limit, search, sort: '-createdAt' });
// //         const res = await api(`/api/courses?${query}`);
// //         let allData = res.courses || [];
// //         let filteredData = [];
// //         if (activeMainTab === 'proposal') {
// //             filteredData = allData.filter((c:any) => c.status === 'proposed' || c.status === 'revision');
// //         } else {
// //             filteredData = allData.filter((c:any) => c.status !== 'proposed' && c.status !== 'revision');
// //         }
// //         setCourses(filteredData);
// //         setTotalPages(res.totalPages || 1); 
// //     } catch (error) { console.error("Gagal load courses", error); } finally { setLoading(false); }
// //   };

// //   const fetchFacilitators = async () => {
// //       try {
// //           const res = await api('/api/users').catch(() => null); 
// //           if (res?.users) setFacilitators(res.users);
// //       } catch (e) { /* Silent */ }
// //   };

// //   const handleDelete = async (id: string) => {
// //       if(!confirm("Yakin ingin menghapus data ini secara permanen?")) return;
// //       try { await api(`/api/courses/${id}`, { method: 'DELETE' }); fetchCourses(); } catch (e: any) { alert(e.message); }
// //   };
  
// //   const handleApprove = async (course: any) => {
// //       if(!confirm(`Setujui pengajuan "${course.title}"?`)) return;
// //       try { 
// //           await api(`/api/courses/${course._id}`, { method: 'PATCH', body: { status: 'draft' } }); 
// //           alert("✅ Disetujui! Data dipindahkan ke tab Manajemen Pelatihan."); 
// //           setIsDetailModalOpen(false); 
// //           fetchCourses(); 
// //       } catch (e: any) { alert(e.message); }
// //   };

// //   const handleReturn = async (course: any) => {
// //       const note = prompt("Masukkan catatan perbaikan untuk pengaju:");
// //       if (note === null) return; 
// //       try {
// //           const newDesc = course.description + `<br/><br/><div style="background:#fff3cd;padding:10px;border:1px solid #ffeeba;"><strong>⚠️ Catatan Admin:</strong> ${note}</div>`;
// //           await api(`/api/courses/${course._id}`, { 
// //               method: 'PATCH', 
// //               body: { status: 'revision', description: newDesc } 
// //           });
// //           alert("↩️ Pengajuan dikembalikan ke user untuk revisi.");
// //           setIsDetailModalOpen(false);
// //           fetchCourses();
// //       } catch (e: any) { alert(e.message); }
// //   };

// //   const handlePublish = async (course: any) => {
// //       const isCurrentlyActive = course.isPublished === true || course.status === 'published';
// //       const newStatusString = !isCurrentlyActive ? 'published' : 'draft';
// //       if(!confirm(`Ubah status publikasi?`)) return;
// //       try { 
// //           await api(`/api/courses/${course._id}`, { method: 'PATCH', body: { isPublished: !isCurrentlyActive, status: newStatusString } }); 
// //           fetchCourses(); 
// //       } catch (e: any) { alert(e.message); }
// //   };

// //   const handleBroadcast = (course: any) => {
// //       const msg = prompt(`Kirim Broadcast untuk "${course.title}"?`);
// //       if (msg) alert(`Broadcast terkirim: ${msg}`);
// //   };

// //   const openDetailProposal = (course: any) => {
// //       setEditingCourse(course);
// //       setIsReadOnlyModal(false);
// //       setIsDetailModalOpen(true);
// //   };

// //   const openHistory = (course: any) => {
// //       setEditingCourse(course);
// //       setIsReadOnlyModal(true);
// //       setIsDetailModalOpen(true);
// //   };

// //   return (
// //     <Protected roles={['SUPER_ADMIN', 'ADMIN', 'FACILITATOR']}>
// //       <div className="p-6 md:p-8 min-h-screen bg-gray-50">
        
// //         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
// //             <div>
// //                 <div className="flex items-center gap-3">
// //                     <h1 className="text-2xl font-bold text-gray-900">Pusat Pelatihan</h1>
// //                     {/* [FIX] A11y */}
// //                     <button 
// //                         onClick={fetchCourses} 
// //                         className="p-1.5 rounded-full hover:bg-gray-200 text-gray-500 transition-colors"
// //                         title="Refresh Data"
// //                         aria-label="Refresh Data"
// //                     >
// //                         <RefreshCw size={16} className={loading ? "animate-spin" : ""}/>
// //                     </button>
// //                 </div>
// //                 <p className="text-gray-500 text-sm mt-1">Kelola pengajuan dan kurikulum pelatihan.</p>
// //             </div>
// //             <button onClick={() => setIsProposalOpen(true)} className="bg-[#990000] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-[#7f0000]"><Plus size={18}/> Buat Pengajuan Baru</button>
// //         </div>

// //         <div className="flex gap-1 bg-white p-1 rounded-xl shadow-sm border border-gray-200 mb-6 w-fit">
// //             <button onClick={() => { setActiveMainTab('proposal'); setPage(1); }} className={`px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 ${activeMainTab === 'proposal' ? 'bg-[#990000] text-white' : 'text-gray-500'}`}><FileText size={16}/> Pengajuan Masuk</button>
// //             <button onClick={() => { setActiveMainTab('management'); setPage(1); }} className={`px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 ${activeMainTab === 'management' ? 'bg-[#990000] text-white' : 'text-gray-500'}`}><BookOpen size={16}/> Manajemen Pelatihan</button>
// //         </div>

// //         <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6">
// //             <div className="relative w-full">
// //                 <Search className="absolute left-3 top-2.5 text-gray-400" size={18}/>
// //                 <input type="text" placeholder={activeMainTab === 'proposal' ? "Cari pengajuan..." : "Cari pelatihan aktif..."} className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-100 outline-none text-sm" value={search} onChange={(e) => setSearch(e.target.value)} />
// //             </div>
// //         </div>

// //         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden min-h-[400px]">
// //             {loading ? <div className="p-12 flex justify-center"><Loader2 className="animate-spin text-gray-400"/></div> : (
// //                 <>
// //                     {activeMainTab === 'proposal' ? (
// //                         <ProposalTable 
// //                             courses={courses} 
// //                             onApprove={handleApprove} 
// //                             onReject={handleReturn} 
// //                             onViewDetail={openDetailProposal}
// //                         />
// //                     ) : (
// //                         <ManagementTable 
// //                             courses={courses} 
// //                             onEdit={(c) => { setEditingCourse(c); setIsEditModalOpen(true); }} 
// //                             onDelete={handleDelete} 
// //                             onPublish={handlePublish} 
// //                             onBroadcast={handleBroadcast} 
// //                             onViewHistory={openHistory}
// //                             currentUser={currentUser}
// //                         />
// //                     )}
// //                 </>
// //             )}
// //             <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-gray-50">
// //                 {/* [FIX] A11y */}
// //                 <button 
// //                     disabled={page === 1} 
// //                     onClick={() => setPage(p => p - 1)} 
// //                     className="p-2 hover:bg-white rounded-lg disabled:opacity-30 border border-transparent hover:border-gray-200"
// //                     title="Halaman Sebelumnya"
// //                     aria-label="Halaman Sebelumnya"
// //                 >
// //                     <ChevronLeft size={16}/>
// //                 </button>
// //                 <span className="text-xs font-bold text-gray-500">Halaman {page} dari {totalPages}</span>
// //                 {/* [FIX] A11y */}
// //                 <button 
// //                     disabled={page === totalPages} 
// //                     onClick={() => setPage(p => p + 1)} 
// //                     className="p-2 hover:bg-white rounded-lg disabled:opacity-30 border border-transparent hover:border-gray-200"
// //                     title="Halaman Selanjutnya"
// //                     aria-label="Halaman Selanjutnya"
// //                 >
// //                     <ChevronRight size={16}/>
// //                 </button>
// //             </div>
// //         </div>

// //         {isProposalOpen && <CourseProposalModal onClose={() => setIsProposalOpen(false)} onSuccess={() => { setIsProposalOpen(false); fetchCourses(); }} currentUser={currentUser} />}
// //         {isEditModalOpen && <CourseFormModal course={editingCourse} onClose={() => setIsEditModalOpen(false)} onSuccess={() => { setIsEditModalOpen(false); fetchCourses(); }} facilitators={facilitators} currentUser={currentUser} />}
        
// //         {isDetailModalOpen && (
// //             <CourseProposalDetailModal 
// //                 course={editingCourse} 
// //                 onClose={() => setIsDetailModalOpen(false)} 
// //                 onApprove={handleApprove} 
// //                 onReject={handleReturn} 
// //                 currentUser={currentUser} 
// //                 refreshData={fetchCourses}
// //                 isReadOnly={isReadOnlyModal}
// //             />
// //         )}
// //       </div>
// //     </Protected>
// //   );
// // }

// 'use client';

// import { useState, useEffect } from 'react';
// import { api } from '@/lib/api';
// import Protected from '@/components/Protected';
// import { useAuth } from '@/lib/AuthProvider'; // [WAJIB] Gunakan AuthProvider
// import { 
//     Plus, Search, BookOpen, FileText, Loader2, ChevronLeft, ChevronRight, RefreshCw
// } from 'lucide-react';
// import CourseFormModal from '@/components/admin/courses/CourseFormModal';
// import CourseProposalModal from '@/components/admin/courses/CourseProposalModal'; 
// import ProposalTable from '@/components/admin/courses/ProposalTable'; 
// import ManagementTable from '@/components/admin/courses/ManagementTable'; 
// import CourseProposalDetailModal from '@/components/admin/courses/CourseProposalDetailModal';

// export default function AdminCoursesPage() {
//   const { user } = useAuth(); // Ambil user dari context agar permission terbaca
//   const [courses, setCourses] = useState<any[]>([]);
//   const [facilitators, setFacilitators] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState('');
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
  
//   const [activeMainTab, setActiveMainTab] = useState<'proposal' | 'management'>('proposal');

//   const [isProposalOpen, setIsProposalOpen] = useState(false); 
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
//   const [isReadOnlyModal, setIsReadOnlyModal] = useState(false);
//   const [editingCourse, setEditingCourse] = useState<any>(null);

//   // Helper Permission Check
//   const hasPermission = (perm: string) => {
//       if (!user) return false;
//       if (user.role === 'SUPER_ADMIN') return true;
//       return user.permissions?.includes(perm);
//   };

//   const canCreate = user?.role === 'FACILITATOR' || hasPermission('manage_courses');
//   const canVerify = hasPermission('verify_enrollments');

//   useEffect(() => { fetchCourses(); fetchFacilitators(); }, [page, search, activeMainTab]);

//   const fetchCourses = async () => {
//     setLoading(true);
//     try {
//         const limit = '50'; 
//         const query = new URLSearchParams({ page: page.toString(), limit: limit, search, sort: '-createdAt' });
//         const res = await api(`/api/courses?${query}`);
//         let allData = res.courses || [];
//         let filteredData = [];
        
//         if (activeMainTab === 'proposal') {
//             filteredData = allData.filter((c:any) => c.status === 'proposed' || c.status === 'revision');
//         } else {
//             filteredData = allData.filter((c:any) => c.status !== 'proposed' && c.status !== 'revision');
//         }
//         setCourses(filteredData);
//         setTotalPages(res.totalPages || 1); 
//     } catch (error) { console.error("Gagal load courses", error); } finally { setLoading(false); }
//   };

//   const fetchFacilitators = async () => {
//       try {
//           const res = await api('/api/users').catch(() => null); 
//           if (res?.users) setFacilitators(res.users);
//       } catch (e) { /* Silent */ }
//   };

//   const handleDelete = async (id: string) => {
//       if(!hasPermission('manage_courses') && user?.role !== 'FACILITATOR') return alert("Akses Ditolak");
//       if(!confirm("Yakin ingin menghapus data ini secara permanen?")) return;
//       try { await api(`/api/courses/${id}`, { method: 'DELETE' }); fetchCourses(); } catch (e: any) { alert(e.message); }
//   };
  
//   const handleApprove = async (course: any) => {
//       if(!canVerify) return alert("Anda tidak memiliki izin verifikasi.");
//       if(!confirm(`Setujui pengajuan "${course.title}"?`)) return;
//       try { 
//           await api(`/api/courses/${course._id}`, { method: 'PATCH', body: { status: 'draft' } }); 
//           alert("✅ Disetujui! Data dipindahkan ke tab Manajemen Pelatihan."); 
//           setIsDetailModalOpen(false); 
//           fetchCourses(); 
//       } catch (e: any) { alert(e.message); }
//   };

//   const handleReturn = async (course: any) => {
//       if(!canVerify) return alert("Anda tidak memiliki izin verifikasi.");
//       const note = prompt("Masukkan catatan perbaikan untuk pengaju:");
//       if (note === null) return; 
//       try {
//           const newDesc = course.description + `<br/><br/><div style="background:#fff3cd;padding:10px;border:1px solid #ffeeba;"><strong>⚠️ Catatan Admin:</strong> ${note}</div>`;
//           await api(`/api/courses/${course._id}`, { 
//               method: 'PATCH', 
//               body: { status: 'revision', description: newDesc } 
//           });
//           alert("↩️ Pengajuan dikembalikan ke user untuk revisi.");
//           setIsDetailModalOpen(false);
//           fetchCourses();
//       } catch (e: any) { alert(e.message); }
//   };

//   const handlePublish = async (course: any) => {
//       // Cek Izin Publish (Khusus Admin/Super)
//       if(!hasPermission('publish_courses') && user?.role !== 'SUPER_ADMIN') return alert("Anda tidak memiliki izin publish.");
      
//       const isCurrentlyActive = course.isPublished === true || course.status === 'published';
//       const newStatusString = !isCurrentlyActive ? 'published' : 'draft';
//       if(!confirm(`Ubah status publikasi?`)) return;
//       try { 
//           await api(`/api/courses/${course._id}`, { method: 'PATCH', body: { isPublished: !isCurrentlyActive, status: newStatusString } }); 
//           fetchCourses(); 
//       } catch (e: any) { alert(e.message); }
//   };

//   const handleBroadcast = (course: any) => {
//       const msg = prompt(`Kirim Broadcast untuk "${course.title}"?`);
//       if (msg) alert(`Broadcast terkirim: ${msg}`);
//   };

//   const openDetailProposal = (course: any) => {
//       setEditingCourse(course);
//       setIsReadOnlyModal(false);
//       setIsDetailModalOpen(true);
//   };

//   const openHistory = (course: any) => {
//       setEditingCourse(course);
//       setIsReadOnlyModal(true);
//       setIsDetailModalOpen(true);
//   };

//   return (
//     <Protected roles={['SUPER_ADMIN', 'ADMIN', 'FACILITATOR']}>
//       <div className="p-6 md:p-8 min-h-screen bg-gray-50">
        
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
//             <div>
//                 <div className="flex items-center gap-3">
//                     <h1 className="text-2xl font-bold text-gray-900">Pusat Pelatihan</h1>
//                     <button 
//                         onClick={fetchCourses} 
//                         className="p-1.5 rounded-full hover:bg-gray-200 text-gray-500 transition-colors"
//                         title="Refresh Data"
//                         aria-label="Refresh Data"
//                     >
//                         <RefreshCw size={16} className={loading ? "animate-spin" : ""}/>
//                     </button>
//                 </div>
//                 <p className="text-gray-500 text-sm mt-1">Kelola pengajuan dan kurikulum pelatihan.</p>
//             </div>
            
//             {/* [PERMISSION] Tombol Buat Pengajuan */}
//             {canCreate && (
//                 <button onClick={() => setIsProposalOpen(true)} className="bg-[#990000] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-[#7f0000]">
//                     <Plus size={18}/> Buat Pengajuan Baru
//                 </button>
//             )}
//         </div>

//         <div className="flex gap-1 bg-white p-1 rounded-xl shadow-sm border border-gray-200 mb-6 w-fit">
//             <button onClick={() => { setActiveMainTab('proposal'); setPage(1); }} className={`px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 ${activeMainTab === 'proposal' ? 'bg-[#990000] text-white' : 'text-gray-500'}`}><FileText size={16}/> Pengajuan Masuk</button>
//             <button onClick={() => { setActiveMainTab('management'); setPage(1); }} className={`px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 ${activeMainTab === 'management' ? 'bg-[#990000] text-white' : 'text-gray-500'}`}><BookOpen size={16}/> Manajemen Pelatihan</button>
//         </div>

//         <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6">
//             <div className="relative w-full">
//                 <Search className="absolute left-3 top-2.5 text-gray-400" size={18}/>
//                 <input type="text" placeholder={activeMainTab === 'proposal' ? "Cari pengajuan..." : "Cari pelatihan aktif..."} className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-100 outline-none text-sm" value={search} onChange={(e) => setSearch(e.target.value)} />
//             </div>
//         </div>

//         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden min-h-[400px]">
//             {loading ? <div className="p-12 flex justify-center"><Loader2 className="animate-spin text-gray-400"/></div> : (
//                 <>
//                     {activeMainTab === 'proposal' ? (
//                         <ProposalTable 
//                             courses={courses} 
//                             onApprove={handleApprove} 
//                             onReject={handleReturn} 
//                             onViewDetail={openDetailProposal}
//                         />
//                     ) : (
//                         <ManagementTable 
//                             courses={courses} 
//                             onEdit={(c) => { setEditingCourse(c); setIsEditModalOpen(true); }} 
//                             onDelete={handleDelete} 
//                             onPublish={handlePublish} 
//                             onBroadcast={handleBroadcast} 
//                             onViewHistory={openHistory}
//                             currentUser={user} // Pass user dari auth
//                         />
//                     )}
//                 </>
//             )}
//             <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-gray-50">
//                 <button 
//                     disabled={page === 1} 
//                     onClick={() => setPage(p => p - 1)} 
//                     className="p-2 hover:bg-white rounded-lg disabled:opacity-30 border border-transparent hover:border-gray-200"
//                     title="Halaman Sebelumnya"
//                     aria-label="Halaman Sebelumnya"
//                 >
//                     <ChevronLeft size={16}/>
//                 </button>
//                 <span className="text-xs font-bold text-gray-500">Halaman {page} dari {totalPages}</span>
//                 <button 
//                     disabled={page === totalPages} 
//                     onClick={() => setPage(p => p + 1)} 
//                     className="p-2 hover:bg-white rounded-lg disabled:opacity-30 border border-transparent hover:border-gray-200"
//                     title="Halaman Selanjutnya"
//                     aria-label="Halaman Selanjutnya"
//                 >
//                     <ChevronRight size={16}/>
//                 </button>
//             </div>
//         </div>

//         {isProposalOpen && <CourseProposalModal onClose={() => setIsProposalOpen(false)} onSuccess={() => { setIsProposalOpen(false); fetchCourses(); }} currentUser={user} />}
//         {isEditModalOpen && <CourseFormModal course={editingCourse} onClose={() => setIsEditModalOpen(false)} onSuccess={() => { setIsEditModalOpen(false); fetchCourses(); }} facilitators={facilitators} currentUser={user} />}
        
//         {isDetailModalOpen && (
//             <CourseProposalDetailModal 
//                 course={editingCourse} 
//                 onClose={() => setIsDetailModalOpen(false)} 
//                 onApprove={handleApprove} 
//                 onReject={handleReturn} 
//                 currentUser={user} 
//                 refreshData={fetchCourses}
//                 isReadOnly={isReadOnlyModal}
//             />
//         )}
//       </div>
//     </Protected>
//   );
// }


'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import Protected from '@/components/Protected';
import { useAuth } from '@/lib/AuthProvider'; 
import { 
    Plus, Search, BookOpen, FileText, Loader2, ChevronLeft, ChevronRight, RefreshCw
} from 'lucide-react';
import CourseFormModal from '@/components/admin/courses/CourseFormModal';
import CourseProposalModal from '@/components/admin/courses/CourseProposalModal'; 
import ProposalTable from '@/components/admin/courses/ProposalTable'; 
import ManagementTable from '@/components/admin/courses/ManagementTable'; 
import CourseProposalDetailModal from '@/components/admin/courses/CourseProposalDetailModal';

export default function AdminCoursesPage() {
  const { user } = useAuth(); 
  const [courses, setCourses] = useState<any[]>([]);
  const [facilitators, setFacilitators] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const [activeMainTab, setActiveMainTab] = useState<'proposal' | 'management'>('proposal');

  const [isProposalOpen, setIsProposalOpen] = useState(false); 
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isReadOnlyModal, setIsReadOnlyModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any>(null);

  // Helper Permission Check
  const hasPermission = (perm: string) => {
      if (!user) return false;
      if (user.role === 'SUPER_ADMIN') return true;
      return user.permissions?.includes(perm);
  };

  const canCreate = user?.role === 'FACILITATOR' || hasPermission('manage_courses');
  const canVerify = hasPermission('verify_enrollments');
  const canPublish = hasPermission('publish_courses');

  useEffect(() => { fetchCourses(); fetchFacilitators(); }, [page, search, activeMainTab]);

  const fetchCourses = async () => {
    setLoading(true);
    try {
        const limit = '50'; 
        const query = new URLSearchParams({ page: page.toString(), limit: limit, search, sort: '-createdAt' });
        const res = await api(`/api/courses?${query}`);
        let allData = res.courses || [];
        let filteredData = [];
        
        if (activeMainTab === 'proposal') {
            filteredData = allData.filter((c:any) => c.status === 'proposed' || c.status === 'revision');
        } else {
            filteredData = allData.filter((c:any) => c.status !== 'proposed' && c.status !== 'revision');
        }
        setCourses(filteredData);
        setTotalPages(res.totalPages || 1); 
    } catch (error) { console.error("Gagal load courses", error); } finally { setLoading(false); }
  };

  // [FIX] Mengambil List Fasilitator dari endpoint KHUSUS agar tidak error 403
  const fetchFacilitators = async () => {
      try {
          const res = await api('/api/users/facilitators').catch(() => null); 
          if (res?.users) setFacilitators(res.users);
      } catch (e) { console.error("Gagal load facilitators", e); }
  };

  const handleDelete = async (id: string) => {
      if(!hasPermission('manage_courses') && user?.role !== 'FACILITATOR') return alert("Akses Ditolak");
      if(!confirm("Yakin ingin menghapus data ini secara permanen?")) return;
      try { await api(`/api/courses/${id}`, { method: 'DELETE' }); fetchCourses(); } catch (e: any) { alert(e.message); }
  };
  
  const handleApprove = async (course: any) => {
      if(!canVerify) return alert("Anda tidak memiliki izin verifikasi.");
      if(!confirm(`Setujui pengajuan "${course.title}"?`)) return;
      try { 
          await api(`/api/courses/${course._id}`, { method: 'PATCH', body: { status: 'draft' } }); 
          alert("✅ Disetujui! Data dipindahkan ke tab Manajemen Pelatihan."); 
          setIsDetailModalOpen(false); 
          fetchCourses(); 
      } catch (e: any) { alert(e.message); }
  };

  const handleReturn = async (course: any) => {
      if(!canVerify) return alert("Anda tidak memiliki izin verifikasi.");
      const note = prompt("Masukkan catatan perbaikan untuk pengaju:");
      if (note === null) return; 
      try {
          const newDesc = course.description + `<br/><br/><div style="background:#fff3cd;padding:10px;border:1px solid #ffeeba;"><strong>⚠️ Catatan Admin:</strong> ${note}</div>`;
          await api(`/api/courses/${course._id}`, { 
              method: 'PATCH', 
              body: { status: 'revision', description: newDesc } 
          });
          alert("↩️ Pengajuan dikembalikan ke user untuk revisi.");
          setIsDetailModalOpen(false);
          fetchCourses();
      } catch (e: any) { alert(e.message); }
  };

  const handlePublish = async (course: any) => {
      if(!canPublish && user?.role !== 'SUPER_ADMIN') return alert("Anda tidak memiliki izin publish.");
      
      const isCurrentlyActive = course.isPublished === true || course.status === 'published';
      const newStatusString = !isCurrentlyActive ? 'published' : 'draft';
      if(!confirm(`Ubah status publikasi?`)) return;
      try { 
          await api(`/api/courses/${course._id}`, { method: 'PATCH', body: { isPublished: !isCurrentlyActive, status: newStatusString } }); 
          fetchCourses(); 
      } catch (e: any) { alert(e.message); }
  };

  const handleBroadcast = (course: any) => {
      const msg = prompt(`Kirim Broadcast untuk "${course.title}"?`);
      if (msg) alert(`Broadcast terkirim: ${msg}`);
  };

  const openDetailProposal = (course: any) => {
      setEditingCourse(course);
      setIsReadOnlyModal(false);
      setIsDetailModalOpen(true);
  };

  const openHistory = (course: any) => {
      setEditingCourse(course);
      setIsReadOnlyModal(true);
      setIsDetailModalOpen(true);
  };

  return (
    <Protected roles={['SUPER_ADMIN', 'ADMIN', 'FACILITATOR']}>
      <div className="p-6 md:p-8 min-h-screen bg-gray-50">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold text-gray-900">Pusat Pelatihan</h1>
                    {/* [FIX] Accessibility: Added title & aria-label */}
                    <button 
                        onClick={fetchCourses} 
                        className="p-1.5 rounded-full hover:bg-gray-200 text-gray-500 transition-colors"
                        title="Refresh Data"
                        aria-label="Refresh Data"
                    >
                        <RefreshCw size={16} className={loading ? "animate-spin" : ""}/>
                    </button>
                </div>
                <p className="text-gray-500 text-sm mt-1">Kelola pengajuan dan kurikulum pelatihan.</p>
            </div>
            
            {canCreate && (
                <button onClick={() => setIsProposalOpen(true)} className="bg-[#990000] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-[#7f0000]">
                    <Plus size={18}/> Buat Pengajuan Baru
                </button>
            )}
        </div>

        <div className="flex gap-1 bg-white p-1 rounded-xl shadow-sm border border-gray-200 mb-6 w-fit">
            <button onClick={() => { setActiveMainTab('proposal'); setPage(1); }} className={`px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 ${activeMainTab === 'proposal' ? 'bg-[#990000] text-white' : 'text-gray-500'}`}><FileText size={16}/> Pengajuan Masuk</button>
            <button onClick={() => { setActiveMainTab('management'); setPage(1); }} className={`px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 ${activeMainTab === 'management' ? 'bg-[#990000] text-white' : 'text-gray-500'}`}><BookOpen size={16}/> Manajemen Pelatihan</button>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6">
            <div className="relative w-full">
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18}/>
                <input type="text" placeholder={activeMainTab === 'proposal' ? "Cari pengajuan..." : "Cari pelatihan aktif..."} className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-100 outline-none text-sm" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden min-h-[400px]">
            {loading ? <div className="p-12 flex justify-center"><Loader2 className="animate-spin text-gray-400"/></div> : (
                <>
                    {activeMainTab === 'proposal' ? (
                        <ProposalTable 
                            courses={courses} 
                            onApprove={handleApprove} 
                            onReject={handleReturn} 
                            onViewDetail={openDetailProposal}
                        />
                    ) : (
                        <ManagementTable 
                            courses={courses} 
                            onEdit={(c) => { setEditingCourse(c); setIsEditModalOpen(true); }} 
                            onDelete={handleDelete} 
                            onPublish={handlePublish} 
                            onBroadcast={handleBroadcast} 
                            onViewHistory={openHistory}
                            currentUser={user} 
                        />
                    )}
                </>
            )}
            <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-gray-50">
                {/* [FIX] Accessibility: Added title & aria-label */}
                <button 
                    disabled={page === 1} 
                    onClick={() => setPage(p => p - 1)} 
                    className="p-2 hover:bg-white rounded-lg disabled:opacity-30 border border-transparent hover:border-gray-200"
                    title="Halaman Sebelumnya"
                    aria-label="Halaman Sebelumnya"
                >
                    <ChevronLeft size={16}/>
                </button>
                <span className="text-xs font-bold text-gray-500">Halaman {page} dari {totalPages}</span>
                {/* [FIX] Accessibility: Added title & aria-label */}
                <button 
                    disabled={page === totalPages} 
                    onClick={() => setPage(p => p + 1)} 
                    className="p-2 hover:bg-white rounded-lg disabled:opacity-30 border border-transparent hover:border-gray-200"
                    title="Halaman Selanjutnya"
                    aria-label="Halaman Selanjutnya"
                >
                    <ChevronRight size={16}/>
                </button>
            </div>
        </div>

        {isProposalOpen && <CourseProposalModal onClose={() => setIsProposalOpen(false)} onSuccess={() => { setIsProposalOpen(false); fetchCourses(); }} currentUser={user} />}
        {isEditModalOpen && <CourseFormModal course={editingCourse} onClose={() => setIsEditModalOpen(false)} onSuccess={() => { setIsEditModalOpen(false); fetchCourses(); }} facilitators={facilitators} currentUser={user} />}
        
        {isDetailModalOpen && (
            <CourseProposalDetailModal 
                course={editingCourse} 
                onClose={() => setIsDetailModalOpen(false)} 
                onApprove={handleApprove} 
                onReject={handleReturn} 
                currentUser={user} 
                refreshData={fetchCourses}
                isReadOnly={isReadOnlyModal}
            />
        )}
      </div>
    </Protected>
  );
}
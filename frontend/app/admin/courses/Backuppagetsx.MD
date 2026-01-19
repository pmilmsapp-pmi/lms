// // // // // // // // // // // 'use client';

// // // // // // // // // // // import { useState, useEffect } from 'react';
// // // // // // // // // // // // [FIX] Pastikan getImageUrl diimport
// // // // // // // // // // // import { api, getImageUrl } from '@/lib/api'; 
// // // // // // // // // // // import Protected from '@/components/Protected';
// // // // // // // // // // // import { 
// // // // // // // // // // //     Plus, Search, Edit2, Trash2, BookOpen, Settings, 
// // // // // // // // // // //     MoreHorizontal, Loader2, PlayCircle, Eye, Bell,
// // // // // // // // // // //     Image as ImageIcon, FileText, CheckCircle 
// // // // // // // // // // // } from 'lucide-react';
// // // // // // // // // // // import Link from 'next/link';
// // // // // // // // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // // // // // // // import CourseFormModal from '@/components/admin/courses/CourseFormModal';

// // // // // // // // // // // export default function AdminCoursesPage() {
// // // // // // // // // // //     const { user } = useAuth();
// // // // // // // // // // //     const [courses, setCourses] = useState<any[]>([]); // Default array kosong
// // // // // // // // // // //     const [loading, setLoading] = useState(true);
// // // // // // // // // // //     const [search, setSearch] = useState('');
    
// // // // // // // // // // //     // State untuk Modal Edit/Buat
// // // // // // // // // // //     const [showModal, setShowModal] = useState(false);
// // // // // // // // // // //     const [selectedCourse, setSelectedCourse] = useState<any>(null);
// // // // // // // // // // //     const [facilitators, setFacilitators] = useState<any[]>([]);

// // // // // // // // // // //     useEffect(() => {
// // // // // // // // // // //         loadData();
// // // // // // // // // // //     }, []);

// // // // // // // // // // //     const loadData = async () => {
// // // // // // // // // // //         try {
// // // // // // // // // // //             setLoading(true);
// // // // // // // // // // //             const [resCourses, resUsers] = await Promise.all([
// // // // // // // // // // //                 api('/api/courses'),
// // // // // // // // // // //                 api('/api/admin/users')
// // // // // // // // // // //             ]);
            
// // // // // // // // // // //             // [FIX] Handling jika API return object { courses: [...] } atau array langsung
// // // // // // // // // // //             const coursesData = Array.isArray(resCourses) 
// // // // // // // // // // //                 ? resCourses 
// // // // // // // // // // //                 : (resCourses.courses || resCourses.data || []);
            
// // // // // // // // // // //             setCourses(coursesData);
            
// // // // // // // // // // //             // Filter user yang bisa jadi fasilitator (Admin / Facilitator)
// // // // // // // // // // //             if (resUsers.users) {
// // // // // // // // // // //                 const facs = resUsers.users.filter((u: any) => 
// // // // // // // // // // //                     u.role === 'FACILITATOR' || u.role === 'SUPER_ADMIN'
// // // // // // // // // // //                 );
// // // // // // // // // // //                 setFacilitators(facs);
// // // // // // // // // // //             }
// // // // // // // // // // //         } catch (e) {
// // // // // // // // // // //             console.error("Gagal load data:", e);
// // // // // // // // // // //             setCourses([]); // Fallback ke array kosong jika error
// // // // // // // // // // //         } finally {
// // // // // // // // // // //             setLoading(false);
// // // // // // // // // // //         }
// // // // // // // // // // //     };

// // // // // // // // // // //     const handleDelete = async (id: string) => {
// // // // // // // // // // //         if (!confirm('Yakin ingin menghapus pelatihan ini? Data peserta & progres akan hilang!')) return;
// // // // // // // // // // //         try {
// // // // // // // // // // //             await api(`/api/courses/${id}`, { method: 'DELETE' });
// // // // // // // // // // //             loadData();
// // // // // // // // // // //         } catch (e: any) {
// // // // // // // // // // //             alert(e.message);
// // // // // // // // // // //         }
// // // // // // // // // // //     };

// // // // // // // // // // //     // Handler Buka Modal Buat Baru
// // // // // // // // // // //     const handleCreate = () => {
// // // // // // // // // // //         setSelectedCourse(null); 
// // // // // // // // // // //         setShowModal(true);
// // // // // // // // // // //     };

// // // // // // // // // // //     // Handler Buka Modal Edit
// // // // // // // // // // //     const handleEdit = (course: any) => {
// // // // // // // // // // //         setSelectedCourse(course); 
// // // // // // // // // // //         setShowModal(true);
// // // // // // // // // // //     };

// // // // // // // // // // //     const handleSuccess = () => {
// // // // // // // // // // //         setShowModal(false);
// // // // // // // // // // //         loadData(); 
// // // // // // // // // // //     };

// // // // // // // // // // //     // [FIX] Pastikan courses adalah array sebelum di-filter
// // // // // // // // // // //     const safeCourses = Array.isArray(courses) ? courses : [];
    
// // // // // // // // // // //     const filteredCourses = safeCourses.filter(c => 
// // // // // // // // // // //         (c.title || '').toLowerCase().includes(search.toLowerCase())
// // // // // // // // // // //     );

// // // // // // // // // // //     return (
// // // // // // // // // // //         <Protected roles={['SUPER_ADMIN', 'FACILITATOR']}>
// // // // // // // // // // //             <div className="p-8 pb-32 max-w-7xl mx-auto">
                
// // // // // // // // // // //                 {/* Header */}
// // // // // // // // // // //                 <div className="flex justify-between items-end mb-8">
// // // // // // // // // // //                     <div>
// // // // // // // // // // //                         <h1 className="text-3xl font-bold text-gray-900">Manajemen Pelatihan</h1>
// // // // // // // // // // //                         <p className="text-gray-500 mt-1">Kelola kursus atau pelatihan.</p>
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                     <button 
// // // // // // // // // // //                         onClick={handleCreate} 
// // // // // // // // // // //                         className="bg-[#B91C1C] hover:bg-[#991B1B] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg transition-transform active:scale-95"
// // // // // // // // // // //                     >
// // // // // // // // // // //                         <Plus size={20}/> Buat Baru
// // // // // // // // // // //                     </button>
// // // // // // // // // // //                 </div>

// // // // // // // // // // //                 {/* Filter */}
// // // // // // // // // // //                 <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm mb-6">
// // // // // // // // // // //                     <div className="relative">
// // // // // // // // // // //                         <Search className="absolute left-3 top-3 text-gray-400" size={20}/>
// // // // // // // // // // //                         <input 
// // // // // // // // // // //                             className="w-full pl-10 p-2.5 border rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-red-500" 
// // // // // // // // // // //                             placeholder="Cari judul..." 
// // // // // // // // // // //                             value={search}
// // // // // // // // // // //                             onChange={e => setSearch(e.target.value)}
// // // // // // // // // // //                         />
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                 </div>

// // // // // // // // // // //                 {/* Table List */}
// // // // // // // // // // //                 <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
// // // // // // // // // // //                     <table className="w-full text-left">
// // // // // // // // // // //                         <thead className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
// // // // // // // // // // //                             <tr>
// // // // // // // // // // //                                 <th className="p-4 w-20">Cover</th>
// // // // // // // // // // //                                 <th className="p-4">Info Pelatihan</th>
// // // // // // // // // // //                                 <th className="p-4">Pelaksana</th>
// // // // // // // // // // //                                 <th className="p-4">Biaya</th>
// // // // // // // // // // //                                 <th className="p-4 text-center">Status</th>
// // // // // // // // // // //                                 <th className="p-4 text-center">Aksi</th>
// // // // // // // // // // //                             </tr>
// // // // // // // // // // //                         </thead>
// // // // // // // // // // //                         <tbody className="divide-y divide-gray-100">
// // // // // // // // // // //                             {loading ? (
// // // // // // // // // // //                                 <tr><td colSpan={6} className="p-10 text-center"><Loader2 className="animate-spin mx-auto text-gray-400"/></td></tr>
// // // // // // // // // // //                             ) : filteredCourses.length === 0 ? (
// // // // // // // // // // //                                 <tr><td colSpan={6} className="p-10 text-center text-gray-400 italic">Belum ada pelatihan.</td></tr>
// // // // // // // // // // //                             ) : (
// // // // // // // // // // //                                 filteredCourses.map((course) => (
// // // // // // // // // // //                                     <tr key={course._id} className="hover:bg-gray-50 transition-colors group">
// // // // // // // // // // //                                         <td className="p-4">
// // // // // // // // // // //                                             <div className="w-16 h-10 bg-gray-200 rounded-lg overflow-hidden border border-gray-300">
// // // // // // // // // // //                                                 {course.thumbnailUrl ? (
// // // // // // // // // // //                                                     <img src={getImageUrl(course.thumbnailUrl)} alt="" className="w-full h-full object-cover"/>
// // // // // // // // // // //                                                 ) : (
// // // // // // // // // // //                                                     <div className="flex items-center justify-center h-full text-gray-400"><ImageIcon size={16}/></div>
// // // // // // // // // // //                                                 )}
// // // // // // // // // // //                                             </div>
// // // // // // // // // // //                                         </td>
// // // // // // // // // // //                                         <td className="p-4">
// // // // // // // // // // //                                             <div className="font-bold text-gray-900">{course.title}</div>
// // // // // // // // // // //                                             <div className="flex gap-2 mt-1">
// // // // // // // // // // //                                                 <span className={`text-[10px] px-2 py-0.5 rounded border uppercase font-bold ${course.programType === 'training' ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-purple-50 text-purple-700 border-purple-100'}`}>
// // // // // // // // // // //                                                     {course.programType}
// // // // // // // // // // //                                                 </span>
// // // // // // // // // // //                                                 {course.registrationMethod === 'manual' ? (
// // // // // // // // // // //                                                     <span className="text-[10px] px-2 py-0.5 rounded border bg-orange-50 text-orange-700 border-orange-100 font-bold flex items-center gap-1"><FileText size={10}/> Syarat</span>
// // // // // // // // // // //                                                 ) : (
// // // // // // // // // // //                                                     <span className="text-[10px] px-2 py-0.5 rounded border bg-green-50 text-green-700 border-green-100 font-bold flex items-center gap-1"><CheckCircle size={10}/> Auto</span>
// // // // // // // // // // //                                                 )}
// // // // // // // // // // //                                             </div>
// // // // // // // // // // //                                         </td>
// // // // // // // // // // //                                         <td className="p-4 text-sm text-gray-600 flex items-center gap-1">
// // // // // // // // // // //                                            <div className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center"><BookOpen size={10} /></div> PMI Pusat
// // // // // // // // // // //                                         </td>
// // // // // // // // // // //                                         <td className="p-4 text-sm font-bold text-green-600">
// // // // // // // // // // //                                             {course.price === 0 ? 'Gratis' : `Rp ${course.price.toLocaleString('id-ID')}`}
// // // // // // // // // // //                                         </td>
// // // // // // // // // // //                                         <td className="p-4 text-center">
// // // // // // // // // // //                                             <span className={`text-xs px-3 py-1 rounded-full font-bold border ${course.isPublished ? 'bg-green-100 text-green-700 border-green-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
// // // // // // // // // // //                                                 {course.isPublished ? 'Published' : 'Draft'}
// // // // // // // // // // //                                             </span>
// // // // // // // // // // //                                         </td>
// // // // // // // // // // //                                         <td className="p-4 text-center">
// // // // // // // // // // //                                             <div className="flex justify-center gap-2">
// // // // // // // // // // //                                                 {/* Tombol Manage Detail */}
// // // // // // // // // // //                                                 <Link href={`/admin/courses/${course._id}`} className="p-2 border rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors" title="Kelola Materi & Peserta">
// // // // // // // // // // //                                                     <Settings size={18}/>
// // // // // // // // // // //                                                 </Link>
                                                
// // // // // // // // // // //                                                 {/* Tombol Notifikasi */}
// // // // // // // // // // //                                                 <button className="p-2 border rounded-lg text-white bg-green-500 hover:bg-green-600 transition-colors" title="Kirim Notifikasi">
// // // // // // // // // // //                                                     <Bell size={18}/>
// // // // // // // // // // //                                                 </button>

// // // // // // // // // // //                                                 {/* Tombol Edit Info (Memanggil Modal Baru) */}
// // // // // // // // // // //                                                 <button onClick={() => handleEdit(course)} className="p-2 border rounded-lg text-blue-600 hover:bg-blue-50 border-blue-100 transition-colors" title="Edit Info">
// // // // // // // // // // //                                                     <Edit2 size={18}/>
// // // // // // // // // // //                                                 </button>
                                                
// // // // // // // // // // //                                                 {/* Tombol Hapus */}
// // // // // // // // // // //                                                 <button onClick={() => handleDelete(course._id)} className="p-2 border rounded-lg text-red-600 hover:bg-red-50 border-red-100 transition-colors" title="Hapus">
// // // // // // // // // // //                                                     <Trash2 size={18}/>
// // // // // // // // // // //                                                 </button>
// // // // // // // // // // //                                             </div>
// // // // // // // // // // //                                         </td>
// // // // // // // // // // //                                     </tr>
// // // // // // // // // // //                                 ))
// // // // // // // // // // //                             )}
// // // // // // // // // // //                         </tbody>
// // // // // // // // // // //                     </table>
// // // // // // // // // // //                 </div>

// // // // // // // // // // //                 {/* MODAL BARU DIPASANG DISINI */}
// // // // // // // // // // //                 {showModal && (
// // // // // // // // // // //                     <CourseFormModal 
// // // // // // // // // // //                         course={selectedCourse}
// // // // // // // // // // //                         facilitators={facilitators}
// // // // // // // // // // //                         currentUser={user}
// // // // // // // // // // //                         onClose={() => setShowModal(false)}
// // // // // // // // // // //                         onSuccess={handleSuccess}
// // // // // // // // // // //                     />
// // // // // // // // // // //                 )}

// // // // // // // // // // //             </div>
// // // // // // // // // // //         </Protected>
// // // // // // // // // // //     );
// // // // // // // // // // // }


// // // // // // // // // // 'use client';

// // // // // // // // // // import { useEffect, useState } from 'react';
// // // // // // // // // // import { useRouter, useSearchParams } from 'next/navigation';
// // // // // // // // // // import { api, getImageUrl } from '@/lib/api';
// // // // // // // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // // // // // // import { Plus, Search, Edit, Trash, Eye, EyeOff, BookOpen, AlertCircle } from 'lucide-react';

// // // // // // // // // // export default function CourseManagement() {
// // // // // // // // // //     const { user } = useAuth();
// // // // // // // // // //     const router = useRouter();
// // // // // // // // // //     const searchParams = useSearchParams();
    
// // // // // // // // // // const [courses, setCourses] = useState<any[]>([]);
// // // // // // // // // //     const [loading, setLoading] = useState(true);
// // // // // // // // // //     const [searchTerm, setSearchTerm] = useState('');

// // // // // // // // // //     const isFacilitator = user?.role === 'FACILITATOR';

// // // // // // // // // //     useEffect(() => {
// // // // // // // // // //         const fetchCourses = async () => {
// // // // // // // // // //             try {
// // // // // // // // // //                 // Backend sudah memfilter data (Fasilitator hanya dapat miliknya)
// // // // // // // // // //                 const res = await api('/api/courses?limit=100'); 
// // // // // // // // // //                 setCourses(res.courses || []);
// // // // // // // // // //             } catch (error) {
// // // // // // // // // //                 console.error(error);
// // // // // // // // // //             } finally {
// // // // // // // // // //                 setLoading(false);
// // // // // // // // // //             }
// // // // // // // // // //         };
// // // // // // // // // //         if(user) fetchCourses();
// // // // // // // // // //     }, [user]);

// // // // // // // // // //     // --- FUNCTION ACTIONS ---
// // // // // // // // // //     const handleDelete = async (id: string) => {
// // // // // // // // // //         if(!confirm('Yakin ingin menghapus kelas ini?')) return;
// // // // // // // // // //         try {
// // // // // // // // // //             await api(`/api/courses/${id}`, { method: 'DELETE' });
// // // // // // // // // //             setCourses(prev => prev.filter((c: any) => c._id !== id));
// // // // // // // // // //         } catch(e) { alert('Gagal menghapus'); }
// // // // // // // // // //     };

// // // // // // // // // //     const handleTogglePublish = async (id: string, currentStatus: boolean) => {
// // // // // // // // // //         try {
// // // // // // // // // //             // Fasilitator biasanya TIDAK BOLEH publish langsung (tapi request approval)
// // // // // // // // // //             // Tapi jika logic bisnis Anda membolehkan, biarkan saja.
// // // // // // // // // //             // Disini kita batasi jika mau:
// // // // // // // // // //             /* if(isFacilitator && !currentStatus) {
// // // // // // // // // //                 alert("Silakan hubungi Admin untuk menerbitkan kelas.");
// // // // // // // // // //                 return;
// // // // // // // // // //             } 
// // // // // // // // // //             */
            
// // // // // // // // // //             await api(`/api/courses/${id}/publish`, { method: 'PATCH' });
// // // // // // // // // //             // Refresh local state
// // // // // // // // // //             setCourses(prev => prev.map((c: any) => c._id === id ? { ...c, isPublished: !currentStatus } : c));
// // // // // // // // // //         } catch(e) { alert('Gagal update status'); }
// // // // // // // // // //     };

// // // // // // // // // //     if (loading) return <div className="p-10 text-center">Loading data...</div>;

// // // // // // // // // //     return (
// // // // // // // // // //         <div className="min-h-screen bg-gray-50 pb-20">
// // // // // // // // // //             {/* HEADER KHUSUS */}
// // // // // // // // // //             <div className={`px-8 py-6 border-b ${isFacilitator ? 'bg-blue-600 border-blue-700' : 'bg-white border-gray-200'}`}>
// // // // // // // // // //                 <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
// // // // // // // // // //                     <div>
// // // // // // // // // //                         <h1 className={`text-2xl font-bold ${isFacilitator ? 'text-white' : 'text-gray-900'}`}>
// // // // // // // // // //                             {isFacilitator ? 'Kelola Kelas Saya' : 'Manajemen Pelatihan (Admin)'}
// // // // // // // // // //                         </h1>
// // // // // // // // // //                         <p className={`text-sm mt-1 ${isFacilitator ? 'text-blue-100' : 'text-gray-500'}`}>
// // // // // // // // // //                             {isFacilitator 
// // // // // // // // // //                                 ? 'Buat dan update materi pelatihan Anda di sini.' 
// // // // // // // // // //                                 : 'Pantau seluruh pelatihan nasional/regional.'}
// // // // // // // // // //                         </p>
// // // // // // // // // //                     </div>
// // // // // // // // // //                     <button 
// // // // // // // // // //                         onClick={() => router.push('/admin/courses/create')} // Pastikan halaman create juga aman
// // // // // // // // // //                         className={`px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg transition-all ${
// // // // // // // // // //                             isFacilitator 
// // // // // // // // // //                             ? 'bg-white text-blue-600 hover:bg-blue-50' 
// // // // // // // // // //                             : 'bg-red-700 text-white hover:bg-red-800'
// // // // // // // // // //                         }`}
// // // // // // // // // //                     >
// // // // // // // // // //                         <Plus size={18}/> Buat Kelas Baru
// // // // // // // // // //                     </button>
// // // // // // // // // //                 </div>
// // // // // // // // // //             </div>

// // // // // // // // // //             {/* CONTENT */}
// // // // // // // // // //             <div className="max-w-7xl mx-auto px-8 py-8">
// // // // // // // // // //                 {/* SEARCH BAR & FILTER */}
// // // // // // // // // //                 <div className="mb-6 flex gap-4">
// // // // // // // // // //                     <div className="relative flex-1">
// // // // // // // // // //                         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20}/>
// // // // // // // // // //                         <input 
// // // // // // // // // //                             type="text" 
// // // // // // // // // //                             placeholder="Cari judul pelatihan..." 
// // // // // // // // // //                             className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
// // // // // // // // // //                             value={searchTerm}
// // // // // // // // // //                             onChange={(e) => setSearchTerm(e.target.value)}
// // // // // // // // // //                         />
// // // // // // // // // //                     </div>
// // // // // // // // // //                 </div>

// // // // // // // // // //                 {/* TABLE LIST */}
// // // // // // // // // //                 <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
// // // // // // // // // //                     {courses.length === 0 ? (
// // // // // // // // // //                         <div className="p-10 text-center text-gray-400">
// // // // // // // // // //                             <BookOpen className="mx-auto mb-2 opacity-50" size={40}/>
// // // // // // // // // //                             <p>Belum ada kelas yang dibuat.</p>
// // // // // // // // // //                         </div>
// // // // // // // // // //                     ) : (
// // // // // // // // // //                         <div className="overflow-x-auto">
// // // // // // // // // //                             <table className="w-full text-left text-sm">
// // // // // // // // // //                                 <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase tracking-wider text-xs">
// // // // // // // // // //                                     <tr>
// // // // // // // // // //                                         <th className="px-6 py-4 font-bold">Judul Kelas</th>
// // // // // // // // // //                                         <th className="px-6 py-4 font-bold">Status</th>
// // // // // // // // // //                                         <th className="px-6 py-4 font-bold text-center">Modul</th>
// // // // // // // // // //                                         {/* Kolom Fasilitator hanya muncul untuk Admin */}
// // // // // // // // // //                                         {!isFacilitator && <th className="px-6 py-4 font-bold">Fasilitator</th>}
// // // // // // // // // //                                         <th className="px-6 py-4 font-bold text-right">Aksi</th>
// // // // // // // // // //                                     </tr>
// // // // // // // // // //                                 </thead>
// // // // // // // // // //                                 <tbody className="divide-y divide-gray-50">
// // // // // // // // // //                                     {courses.filter((c:any) => c.title.toLowerCase().includes(searchTerm.toLowerCase())).map((course: any) => (
// // // // // // // // // //                                         <tr key={course._id} className="hover:bg-gray-50/50 transition-colors">
// // // // // // // // // //                                             <td className="px-6 py-4">
// // // // // // // // // //                                                 <div className="flex items-center gap-3">
// // // // // // // // // //                                                     <img src={getImageUrl(course.thumbnailUrl)} className="w-10 h-10 rounded-lg object-cover bg-gray-200" alt=""/>
// // // // // // // // // //                                                     <div>
// // // // // // // // // //                                                         <p className="font-bold text-gray-900 line-clamp-1">{course.title}</p>
// // // // // // // // // //                                                         <p className="text-xs text-gray-400">{course.category || 'Umum'}</p>
// // // // // // // // // //                                                     </div>
// // // // // // // // // //                                                 </div>
// // // // // // // // // //                                             </td>
// // // // // // // // // //                                             <td className="px-6 py-4">
// // // // // // // // // //                                                 <button 
// // // // // // // // // //                                                     onClick={() => handleTogglePublish(course._id, course.isPublished)}
// // // // // // // // // //                                                     className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide flex items-center gap-1 w-fit ${
// // // // // // // // // //                                                         course.isPublished ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
// // // // // // // // // //                                                     }`}
// // // // // // // // // //                                                 >
// // // // // // // // // //                                                     {course.isPublished ? <><Eye size={10}/> Terbit</> : <><EyeOff size={10}/> Draft</>}
// // // // // // // // // //                                                 </button>
// // // // // // // // // //                                             </td>
// // // // // // // // // //                                             <td className="px-6 py-4 text-center font-mono text-gray-500">
// // // // // // // // // //                                                 {course.modules?.length || 0}
// // // // // // // // // //                                             </td>
                                            
// // // // // // // // // //                                             {!isFacilitator && (
// // // // // // // // // //                                                 <td className="px-6 py-4">
// // // // // // // // // //                                                     <div className="flex items-center gap-2">
// // // // // // // // // //                                                         <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden">
// // // // // // // // // //                                                             {/* Render Avatar Fasilitator Pertama */}
// // // // // // // // // //                                                             {/* Logika render avatar sederhana */}
// // // // // // // // // //                                                         </div>
// // // // // // // // // //                                                         <span className="text-xs text-gray-600 truncate max-w-[100px]">
// // // // // // // // // //                                                             {course.facilitatorIds?.[0]?.name || 'Admin'}
// // // // // // // // // //                                                         </span>
// // // // // // // // // //                                                     </div>
// // // // // // // // // //                                                 </td>
// // // // // // // // // //                                             )}

// // // // // // // // // //                                             <td className="px-6 py-4 text-right">
// // // // // // // // // //                                                 <div className="flex items-center justify-end gap-2">
// // // // // // // // // //                                                     <button 
// // // // // // // // // //                                                         onClick={() => router.push(`/admin/courses/${course._id}/edit`)}
// // // // // // // // // //                                                         className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
// // // // // // // // // //                                                         title="Edit Materi"
// // // // // // // // // //                                                     >
// // // // // // // // // //                                                         <Edit size={16}/>
// // // // // // // // // //                                                     </button>
// // // // // // // // // //                                                     <button 
// // // // // // // // // //                                                         onClick={() => handleDelete(course._id)}
// // // // // // // // // //                                                         className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
// // // // // // // // // //                                                         title="Hapus Kelas"
// // // // // // // // // //                                                     >
// // // // // // // // // //                                                         <Trash size={16}/>
// // // // // // // // // //                                                     </button>
// // // // // // // // // //                                                 </div>
// // // // // // // // // //                                             </td>
// // // // // // // // // //                                         </tr>
// // // // // // // // // //                                     ))}
// // // // // // // // // //                                 </tbody>
// // // // // // // // // //                             </table>
// // // // // // // // // //                         </div>
// // // // // // // // // //                     )}
// // // // // // // // // //                 </div>
// // // // // // // // // //             </div>
// // // // // // // // // //         </div>
// // // // // // // // // //     );
// // // // // // // // // // }


// // // // // // // // // 'use client';

// // // // // // // // // import { useState, useEffect } from 'react';
// // // // // // // // // import { useRouter } from 'next/navigation';
// // // // // // // // // import Link from 'next/link';
// // // // // // // // // import { api, getImageUrl } from '@/lib/api';
// // // // // // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // // // // // import Protected from '@/components/Protected';
// // // // // // // // // import { 
// // // // // // // // //     Plus, Search, Edit2, Trash2, BookOpen, Settings, 
// // // // // // // // //     MoreHorizontal, Loader2, Eye, EyeOff, Bell,
// // // // // // // // //     Image as ImageIcon, FileText, CheckCircle 
// // // // // // // // // } from 'lucide-react';

// // // // // // // // // // [PENTING] Import Modal Form yang Anda inginkan
// // // // // // // // // import CourseFormModal from '@/components/admin/courses/CourseFormModal';

// // // // // // // // // export default function AdminCoursesPage() {
// // // // // // // // //     const { user } = useAuth();
// // // // // // // // //     const router = useRouter();
    
// // // // // // // // //     // Data State
// // // // // // // // //     const [courses, setCourses] = useState<any[]>([]); 
// // // // // // // // //     const [loading, setLoading] = useState(true);
// // // // // // // // //     const [search, setSearch] = useState('');
    
// // // // // // // // //     // State Modal (Pop-up)
// // // // // // // // //     const [showModal, setShowModal] = useState(false);
// // // // // // // // //     const [selectedCourse, setSelectedCourse] = useState<any>(null);
// // // // // // // // //     const [facilitators, setFacilitators] = useState<any[]>([]);

// // // // // // // // //     const isFacilitator = user?.role === 'FACILITATOR';

// // // // // // // // //     useEffect(() => {
// // // // // // // // //         loadData();
// // // // // // // // //     }, []);

// // // // // // // // //     const loadData = async () => {
// // // // // // // // //         try {
// // // // // // // // //             setLoading(true);
            
// // // // // // // // //             // 1. Ambil Data Kursus & User sekaligus
// // // // // // // // //             const [resCourses, resUsers] = await Promise.all([
// // // // // // // // //                 api('/api/courses?limit=100'), // Ambil semua
// // // // // // // // //                 api('/api/admin/users')
// // // // // // // // //             ]);
            
// // // // // // // // //             // Handle variasi respon backend
// // // // // // // // //             const list = Array.isArray(resCourses) ? resCourses : (resCourses.courses || []);
// // // // // // // // //             setCourses(list);
            
// // // // // // // // //             // Filter user untuk dropdown fasilitator
// // // // // // // // //             if (resUsers.users) {
// // // // // // // // //                 const facs = resUsers.users.filter((u: any) => 
// // // // // // // // //                     u.role === 'FACILITATOR' || u.role === 'SUPER_ADMIN'
// // // // // // // // //                 );
// // // // // // // // //                 setFacilitators(facs);
// // // // // // // // //             }
// // // // // // // // //         } catch (e) {
// // // // // // // // //             console.error("Gagal load data:", e);
// // // // // // // // //         } finally {
// // // // // // // // //             setLoading(false);
// // // // // // // // //         }
// // // // // // // // //     };

// // // // // // // // //     // --- ACTIONS ---

// // // // // // // // //     const handleDelete = async (id: string) => {
// // // // // // // // //         if (!confirm('Yakin ingin menghapus pelatihan ini? Data peserta & progres akan hilang!')) return;
// // // // // // // // //         try {
// // // // // // // // //             await api(`/api/courses/${id}`, { method: 'DELETE' });
// // // // // // // // //             setCourses(prev => prev.filter(c => c._id !== id));
// // // // // // // // //         } catch (e: any) {
// // // // // // // // //             alert(e.message);
// // // // // // // // //         }
// // // // // // // // //     };

// // // // // // // // //     const handleTogglePublish = async (id: string, currentStatus: boolean) => {
// // // // // // // // //         try {
// // // // // // // // //             await api(`/api/courses/${id}/publish`, { method: 'PATCH' });
// // // // // // // // //             // Update state lokal agar UI berubah instan
// // // // // // // // //             setCourses(prev => prev.map(c => c._id === id ? { ...c, isPublished: !currentStatus } : c));
// // // // // // // // //         } catch(e) { alert('Gagal update status'); }
// // // // // // // // //     };

// // // // // // // // //     // Buka Modal Buat Baru
// // // // // // // // //     const handleCreate = () => {
// // // // // // // // //         setSelectedCourse(null); 
// // // // // // // // //         setShowModal(true);
// // // // // // // // //     };

// // // // // // // // //     // Buka Modal Edit
// // // // // // // // //     const handleEdit = (course: any) => {
// // // // // // // // //         setSelectedCourse(course); 
// // // // // // // // //         setShowModal(true);
// // // // // // // // //     };

// // // // // // // // //     const handleSuccess = () => {
// // // // // // // // //         setShowModal(false);
// // // // // // // // //         loadData(); // Reload data setelah simpan
// // // // // // // // //     };

// // // // // // // // //     // Filter Pencarian
// // // // // // // // //     const filteredCourses = courses.filter(c => 
// // // // // // // // //         (c.title || '').toLowerCase().includes(search.toLowerCase())
// // // // // // // // //     );

// // // // // // // // //     if (loading) return <div className="p-20 text-center flex justify-center"><Loader2 className="animate-spin text-red-700"/></div>;

// // // // // // // // //     return (
// // // // // // // // //         <Protected roles={['SUPER_ADMIN', 'FACILITATOR', 'ADMIN']}>
// // // // // // // // //             <div className="p-6 md:p-10 pb-32 max-w-7xl mx-auto min-h-screen bg-gray-50">
                
// // // // // // // // //                 {/* HEADER */}
// // // // // // // // //                 <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
// // // // // // // // //                     <div>
// // // // // // // // //                         <h1 className="text-3xl font-extrabold text-gray-900">Manajemen Pelatihan</h1>
// // // // // // // // //                         <p className="text-gray-500 mt-1">Kelola daftar kursus, materi, dan peserta.</p>
// // // // // // // // //                     </div>
// // // // // // // // //                     <button 
// // // // // // // // //                         onClick={handleCreate} 
// // // // // // // // //                         className="bg-[#B91C1C] hover:bg-[#991B1B] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg transition-transform active:scale-95"
// // // // // // // // //                     >
// // // // // // // // //                         <Plus size={20}/> Buat Kelas Baru
// // // // // // // // //                     </button>
// // // // // // // // //                 </div>

// // // // // // // // //                 {/* SEARCH & FILTER */}
// // // // // // // // //                 <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm mb-6">
// // // // // // // // //                     <div className="relative">
// // // // // // // // //                         <Search className="absolute left-3 top-3 text-gray-400" size={20}/>
// // // // // // // // //                         <input 
// // // // // // // // //                             className="w-full pl-10 p-2.5 border rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-red-500 transition-all" 
// // // // // // // // //                             placeholder="Cari judul pelatihan..." 
// // // // // // // // //                             value={search}
// // // // // // // // //                             onChange={e => setSearch(e.target.value)}
// // // // // // // // //                         />
// // // // // // // // //                     </div>
// // // // // // // // //                 </div>

// // // // // // // // //                 {/* TABLE LIST */}
// // // // // // // // //                 <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
// // // // // // // // //                     <table className="w-full text-left">
// // // // // // // // //                         <thead className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
// // // // // // // // //                             <tr>
// // // // // // // // //                                 <th className="p-4 w-20">Cover</th>
// // // // // // // // //                                 <th className="p-4">Info Pelatihan</th>
// // // // // // // // //                                 <th className="p-4 hidden md:table-cell">Tipe & Harga</th>
// // // // // // // // //                                 <th className="p-4 text-center">Status</th>
// // // // // // // // //                                 <th className="p-4 text-center">Aksi</th>
// // // // // // // // //                             </tr>
// // // // // // // // //                         </thead>
// // // // // // // // //                         <tbody className="divide-y divide-gray-100">
// // // // // // // // //                             {filteredCourses.length === 0 ? (
// // // // // // // // //                                 <tr><td colSpan={5} className="p-10 text-center text-gray-400 italic">Belum ada pelatihan ditemukan.</td></tr>
// // // // // // // // //                             ) : (
// // // // // // // // //                                 filteredCourses.map((course) => (
// // // // // // // // //                                     <tr key={course._id} className="hover:bg-gray-50 transition-colors group">
                                        
// // // // // // // // //                                         {/* 1. COVER */}
// // // // // // // // //                                         <td className="p-4 align-top">
// // // // // // // // //                                             <div className="w-20 h-14 bg-gray-200 rounded-lg overflow-hidden border border-gray-300 relative">
// // // // // // // // //                                                 {course.thumbnailUrl ? (
// // // // // // // // //                                                     <img src={getImageUrl(course.thumbnailUrl)} alt="" className="w-full h-full object-cover"/>
// // // // // // // // //                                                 ) : (
// // // // // // // // //                                                     <div className="flex items-center justify-center h-full text-gray-400"><ImageIcon size={20}/></div>
// // // // // // // // //                                                 )}
// // // // // // // // //                                             </div>
// // // // // // // // //                                         </td>

// // // // // // // // //                                         {/* 2. INFO UTAMA */}
// // // // // // // // //                                         <td className="p-4 align-top">
// // // // // // // // //                                             <div className="font-bold text-gray-900 text-base">{course.title}</div>
// // // // // // // // //                                             <div className="text-xs text-gray-500 mt-1 line-clamp-1">{course.description || 'Tidak ada deskripsi'}</div>
// // // // // // // // //                                             <div className="flex gap-2 mt-2">
// // // // // // // // //                                                 <span className="text-[10px] px-2 py-0.5 rounded border bg-gray-100 text-gray-600 border-gray-200 flex items-center gap-1">
// // // // // // // // //                                                     <BookOpen size={10}/> {course.modules?.length || 0} Modul
// // // // // // // // //                                                 </span>
// // // // // // // // //                                                 {!isFacilitator && (
// // // // // // // // //                                                     <span className="text-[10px] px-2 py-0.5 rounded border bg-gray-100 text-gray-600 border-gray-200">
// // // // // // // // //                                                         Fasilitator: {course.facilitatorIds?.[0]?.name?.split(' ')[0] || 'Admin'}
// // // // // // // // //                                                     </span>
// // // // // // // // //                                                 )}
// // // // // // // // //                                             </div>
// // // // // // // // //                                         </td>

// // // // // // // // //                                         {/* 3. TIPE & HARGA */}
// // // // // // // // //                                         <td className="p-4 align-top hidden md:table-cell">
// // // // // // // // //                                             <div className={`text-[10px] px-2 py-0.5 rounded border uppercase font-bold w-fit mb-1 ${course.programType === 'training' ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-purple-50 text-purple-700 border-purple-100'}`}>
// // // // // // // // //                                                 {course.programType === 'training' ? 'Diklat' : 'Kursus'}
// // // // // // // // //                                             </div>
// // // // // // // // //                                             <div className="font-bold text-green-700 text-sm">
// // // // // // // // //                                                 {course.price === 0 ? 'Gratis' : `Rp ${course.price.toLocaleString('id-ID')}`}
// // // // // // // // //                                             </div>
// // // // // // // // //                                         </td>

// // // // // // // // //                                         {/* 4. STATUS (TOGGLE) */}
// // // // // // // // //                                         <td className="p-4 align-top text-center">
// // // // // // // // //                                             <button 
// // // // // // // // //                                                 onClick={() => handleTogglePublish(course._id, course.isPublished)}
// // // // // // // // //                                                 className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide flex items-center justify-center gap-1 w-24 mx-auto transition-all ${
// // // // // // // // //                                                     course.isPublished 
// // // // // // // // //                                                     ? 'bg-green-100 text-green-700 hover:bg-green-200' 
// // // // // // // // //                                                     : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
// // // // // // // // //                                                 }`}
// // // // // // // // //                                                 title={course.isPublished ? "Klik untuk sembunyikan (Draft)" : "Klik untuk terbitkan (Publish)"}
// // // // // // // // //                                             >
// // // // // // // // //                                                 {course.isPublished ? <><Eye size={12}/> Terbit</> : <><EyeOff size={12}/> Draft</>}
// // // // // // // // //                                             </button>
// // // // // // // // //                                         </td>

// // // // // // // // //                                         {/* 5. AKSI */}
// // // // // // // // //                                         <td className="p-4 align-top text-center">
// // // // // // // // //                                             <div className="flex justify-center gap-2">
// // // // // // // // //                                                 {/* Edit Detail (Modal) */}
// // // // // // // // //                                                 <button onClick={() => handleEdit(course)} className="p-2 border rounded-lg text-blue-600 hover:bg-blue-50 border-blue-100 transition-colors" title="Edit Info">
// // // // // // // // //                                                     <Edit2 size={18}/>
// // // // // // // // //                                                 </button>

// // // // // // // // //                                                 {/* Kelola Materi (Pindah Halaman) */}
// // // // // // // // //                                                 <Link href={`/admin/courses/${course._id}`} className="p-2 border rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors" title="Kelola Materi & Peserta">
// // // // // // // // //                                                     <Settings size={18}/>
// // // // // // // // //                                                 </Link>
                                                
// // // // // // // // //                                                 {/* Hapus */}
// // // // // // // // //                                                 <button onClick={() => handleDelete(course._id)} className="p-2 border rounded-lg text-red-600 hover:bg-red-50 border-red-100 transition-colors" title="Hapus">
// // // // // // // // //                                                     <Trash2 size={18}/>
// // // // // // // // //                                                 </button>
// // // // // // // // //                                             </div>
// // // // // // // // //                                         </td>
// // // // // // // // //                                     </tr>
// // // // // // // // //                                 ))
// // // // // // // // //                             )}
// // // // // // // // //                         </tbody>
// // // // // // // // //                     </table>
// // // // // // // // //                 </div>

// // // // // // // // //                 {/* MODAL FORM (Dipasang kembali) */}
// // // // // // // // //                 {showModal && (
// // // // // // // // //                     <CourseFormModal 
// // // // // // // // //                         course={selectedCourse}
// // // // // // // // //                         facilitators={facilitators}
// // // // // // // // //                         currentUser={user}
// // // // // // // // //                         onClose={() => setShowModal(false)}
// // // // // // // // //                         onSuccess={handleSuccess}
// // // // // // // // //                     />
// // // // // // // // //                 )}

// // // // // // // // //             </div>
// // // // // // // // //         </Protected>
// // // // // // // // //     );
// // // // // // // // // }

// // // // // // // 'use client';

// // // // // // // import { useState, useEffect } from 'react';
// // // // // // // import { useRouter } from 'next/navigation';
// // // // // // // import Link from 'next/link';
// // // // // // // 
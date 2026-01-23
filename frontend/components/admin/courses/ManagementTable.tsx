// // // // // // // // 'use client';

// // // // // // // // import Link from 'next/link'; // [WAJIB] Untuk tombol Gear menuju Editor
// // // // // // // // import { Edit, Trash2, CheckCircle, Bell, FileClock, Settings, MoreHorizontal } from 'lucide-react';
// // // // // // // // import { getImageUrl } from '@/lib/api'; // [WAJIB] Pastikan import ini ada untuk fix gambar

// // // // // // // // interface ManagementTableProps {
// // // // // // // //     courses: any[];
// // // // // // // //     onEdit: (course: any) => void;
// // // // // // // //     onDelete: (id: string) => void;
// // // // // // // //     onPublish: (course: any) => void;
// // // // // // // //     onBroadcast: (course: any) => void;
// // // // // // // //     onViewHistory: (course: any) => void;
// // // // // // // //     currentUser: any;
// // // // // // // // }

// // // // // // // // export default function ManagementTable({ courses, onEdit, onDelete, onPublish, onBroadcast, onViewHistory, currentUser }: ManagementTableProps) {
// // // // // // // //     if (courses.length === 0) {
// // // // // // // //         return <div className="p-12 text-center text-gray-400 italic bg-white border-b border-gray-100">Belum ada data pelatihan.</div>;
// // // // // // // //     }

// // // // // // // //     return (
// // // // // // // //         <table className="w-full text-left text-sm">
// // // // // // // //             <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase tracking-wider text-[10px]">
// // // // // // // //                 <tr>
// // // // // // // //                     <th className="p-4 font-bold">Cover</th>
// // // // // // // //                     <th className="p-4 font-bold">Info Pelatihan</th>
// // // // // // // //                     <th className="p-4 font-bold text-center">Tipe Program</th>
// // // // // // // //                     <th className="p-4 font-bold text-center">Harga</th>
// // // // // // // //                     <th className="p-4 font-bold text-center">Status</th>
// // // // // // // //                     <th className="p-4 font-bold text-center">Aksi</th>
// // // // // // // //                 </tr>
// // // // // // // //             </thead>
// // // // // // // //             <tbody className="divide-y divide-gray-50 bg-white">
// // // // // // // //                 {courses.map(course => (
// // // // // // // //                     <tr key={course._id} className="hover:bg-gray-50/50 transition-colors group">
// // // // // // // //                         {/* 1. COVER PHOTO FIX */}
// // // // // // // //                         <td className="p-4 w-24 align-middle">
// // // // // // // //                             <div className="w-20 h-14 bg-gray-200 rounded-lg overflow-hidden border border-gray-100 shadow-sm relative">
// // // // // // // //                                 {course.thumbnailUrl ? (
// // // // // // // //                                     <img 
// // // // // // // //                                         src={getImageUrl(course.thumbnailUrl)} 
// // // // // // // //                                         alt={course.title} 
// // // // // // // //                                         className="w-full h-full object-cover"
// // // // // // // //                                         onError={(e) => {
// // // // // // // //                                             // Fallback jika gambar error
// // // // // // // //                                             e.currentTarget.src = 'https://via.placeholder.com/150?text=No+Image';
// // // // // // // //                                         }}
// // // // // // // //                                     />
// // // // // // // //                                 ) : (
// // // // // // // //                                     <div className="flex items-center justify-center h-full text-gray-400"><span className="text-[10px]">No Img</span></div>
// // // // // // // //                                 )}
// // // // // // // //                             </div>
// // // // // // // //                         </td>

// // // // // // // //                         {/* 2. INFO */}
// // // // // // // //                         <td className="p-4 align-middle">
// // // // // // // //                             <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">{course.title}</h3>
// // // // // // // //                             <div className="text-xs text-blue-600 font-medium mb-2">{course.organizer || 'PMI PUSAT'}</div>
// // // // // // // //                             <div className="flex gap-2">
// // // // // // // //                                 <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded border border-gray-200 flex items-center gap-1">
// // // // // // // //                                     {course.modules?.length || 0} Modul
// // // // // // // //                                 </span>
// // // // // // // //                             </div>
// // // // // // // //                         </td>

// // // // // // // //                         {/* 3. TIPE */}
// // // // // // // //                         <td className="p-4 text-center align-middle">
// // // // // // // //                             <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${course.programType === 'training' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-purple-50 text-purple-700 border-purple-100'}`}>
// // // // // // // //                                 {course.programType === 'training' ? 'Diklat' : 'Kursus'}
// // // // // // // //                             </span>
// // // // // // // //                         </td>

// // // // // // // //                         {/* 4. HARGA */}
// // // // // // // //                         <td className="p-4 text-center align-middle font-bold text-green-600 text-xs">
// // // // // // // //                             {course.price === 0 ? 'Gratis' : `Rp ${course.price.toLocaleString()}`}
// // // // // // // //                         </td>

// // // // // // // //                         {/* 5. STATUS */}
// // // // // // // //                         <td className="p-4 text-center align-middle">
// // // // // // // //                             <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${course.isPublished || course.status === 'published' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>
// // // // // // // //                                 {course.isPublished || course.status === 'published' ? <><CheckCircle size={10}/> TERBIT</> : <><Edit size={10}/> DRAFT</>}
// // // // // // // //                             </div>
// // // // // // // //                         </td>

// // // // // // // //                         {/* 6. AKSI (TOMBOL LAMA DIKEMBALIKAN) */}
// // // // // // // //                         <td className="p-4 align-middle">
// // // // // // // //                             <div className="flex justify-center gap-2 items-center">
// // // // // // // //                                 {/* A. Edit General Info (Pencil) */}
// // // // // // // //                                 <button onClick={() => onEdit(course)} className="p-2 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors" title="Edit Informasi Dasar">
// // // // // // // //                                     <Edit size={14}/>
// // // // // // // //                                 </button>
                                
// // // // // // // //                                 {/* B. [RESTORED] Editor Materi (Gear) */}
// // // // // // // //                                 <Link 
// // // // // // // //                                     href={`/admin/courses/${course._id}`} 
// // // // // // // //                                     className="p-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
// // // // // // // //                                     title="Kelola Kurikulum & Materi (Editor)"
// // // // // // // //                                 >
// // // // // // // //                                     <Settings size={14}/>
// // // // // // // //                                 </Link>

// // // // // // // //                                 {/* C. Histori Pengajuan (Request Anda) */}
// // // // // // // //                                 <button onClick={() => onViewHistory(course)} className="p-2 rounded-lg border border-purple-200 text-purple-600 hover:bg-purple-50 transition-colors" title="Lihat Histori Pengajuan">
// // // // // // // //                                     <FileClock size={14}/>
// // // // // // // //                                 </button>
                                
// // // // // // // //                                 {/* D. Publish/Unpublish (Bell) */}
// // // // // // // //                                 <button onClick={() => onPublish(course)} className={`p-2 rounded-lg border transition-colors ${course.isPublished ? 'border-orange-200 text-orange-600 hover:bg-orange-50' : 'border-green-200 text-green-600 hover:bg-green-50'}`} title={course.isPublished ? 'Tarik Kembali' : 'Terbitkan'}>
// // // // // // // //                                     <Bell size={14}/>
// // // // // // // //                                 </button>
                                
// // // // // // // //                                 {/* E. Hapus (Trash) */}
// // // // // // // //                                 <button onClick={() => onDelete(course._id)} className="p-2 rounded-lg border border-red-200 text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="Hapus Permanen">
// // // // // // // //                                     <Trash2 size={14}/>
// // // // // // // //                                 </button>
// // // // // // // //                             </div>
// // // // // // // //                         </td>
// // // // // // // //                     </tr>
// // // // // // // //                 ))}
// // // // // // // //             </tbody>
// // // // // // // //         </table>
// // // // // // // //     );
// // // // // // // // }


// // // // // // // 'use client';

// // // // // // // import Link from 'next/link'; 
// // // // // // // import { Edit, Trash2, CheckCircle, Bell, FileClock, Settings, MoreHorizontal } from 'lucide-react';
// // // // // // // import { getImageUrl } from '@/lib/api'; 

// // // // // // // interface ManagementTableProps {
// // // // // // //     courses: any[];
// // // // // // //     onEdit: (course: any) => void;
// // // // // // //     onDelete: (id: string) => void;
// // // // // // //     onPublish: (course: any) => void;
// // // // // // //     onBroadcast: (course: any) => void;
// // // // // // //     onViewHistory: (course: any) => void;
// // // // // // //     currentUser: any;
// // // // // // // }

// // // // // // // export default function ManagementTable({ courses, onEdit, onDelete, onPublish, onBroadcast, onViewHistory, currentUser }: ManagementTableProps) {
// // // // // // //     if (courses.length === 0) {
// // // // // // //         return <div className="p-12 text-center text-gray-400 italic bg-white border-b border-gray-100">Belum ada data pelatihan.</div>;
// // // // // // //     }

// // // // // // //     // Helper Cek Izin di Level Tabel
// // // // // // //     const hasPermission = (perm: string) => {
// // // // // // //         if (!currentUser) return false;
// // // // // // //         if (currentUser.role === 'SUPER_ADMIN') return true;
// // // // // // //         return currentUser.permissions?.includes(perm);
// // // // // // //     };

// // // // // // //     const canDelete = currentUser?.role === 'FACILITATOR' || hasPermission('manage_courses');
// // // // // // //     const canPublish = hasPermission('publish_courses') || currentUser?.role === 'SUPER_ADMIN';

// // // // // // //     return (
// // // // // // //         <table className="w-full text-left text-sm">
// // // // // // //             <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase tracking-wider text-[10px]">
// // // // // // //                 <tr>
// // // // // // //                     <th className="p-4 font-bold">Cover</th>
// // // // // // //                     <th className="p-4 font-bold">Info Pelatihan</th>
// // // // // // //                     <th className="p-4 font-bold text-center">Tipe Program</th>
// // // // // // //                     <th className="p-4 font-bold text-center">Harga</th>
// // // // // // //                     <th className="p-4 font-bold text-center">Status</th>
// // // // // // //                     <th className="p-4 font-bold text-center">Aksi</th>
// // // // // // //                 </tr>
// // // // // // //             </thead>
// // // // // // //             <tbody className="divide-y divide-gray-50 bg-white">
// // // // // // //                 {courses.map(course => (
// // // // // // //                     <tr key={course._id} className="hover:bg-gray-50/50 transition-colors group">
// // // // // // //                         <td className="p-4 w-24 align-middle">
// // // // // // //                             <div className="w-20 h-14 bg-gray-200 rounded-lg overflow-hidden border border-gray-100 shadow-sm relative">
// // // // // // //                                 {course.thumbnailUrl ? (
// // // // // // //                                     <img 
// // // // // // //                                         src={getImageUrl(course.thumbnailUrl)} 
// // // // // // //                                         alt={course.title} 
// // // // // // //                                         className="w-full h-full object-cover"
// // // // // // //                                         onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/150?text=No+Image'; }}
// // // // // // //                                     />
// // // // // // //                                 ) : (
// // // // // // //                                     <div className="flex items-center justify-center h-full text-gray-400"><span className="text-[10px]">No Img</span></div>
// // // // // // //                                 )}
// // // // // // //                             </div>
// // // // // // //                         </td>

// // // // // // //                         <td className="p-4 align-middle">
// // // // // // //                             <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">{course.title}</h3>
// // // // // // //                             <div className="text-xs text-blue-600 font-medium mb-2">{course.organizer || 'PMI PUSAT'}</div>
// // // // // // //                             <div className="flex gap-2">
// // // // // // //                                 <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded border border-gray-200 flex items-center gap-1">
// // // // // // //                                     {course.modules?.length || 0} Modul
// // // // // // //                                 </span>
// // // // // // //                             </div>
// // // // // // //                         </td>

// // // // // // //                         <td className="p-4 text-center align-middle">
// // // // // // //                             <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${course.programType === 'training' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-purple-50 text-purple-700 border-purple-100'}`}>
// // // // // // //                                 {course.programType === 'training' ? 'Diklat' : 'Kursus'}
// // // // // // //                             </span>
// // // // // // //                         </td>

// // // // // // //                         <td className="p-4 text-center align-middle font-bold text-green-600 text-xs">
// // // // // // //                             {course.price === 0 ? 'Gratis' : `Rp ${course.price.toLocaleString()}`}
// // // // // // //                         </td>

// // // // // // //                         <td className="p-4 text-center align-middle">
// // // // // // //                             <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${course.isPublished || course.status === 'published' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>
// // // // // // //                                 {course.isPublished || course.status === 'published' ? <><CheckCircle size={10}/> TERBIT</> : <><Edit size={10}/> DRAFT</>}
// // // // // // //                             </div>
// // // // // // //                         </td>

// // // // // // //                         <td className="p-4 align-middle">
// // // // // // //                             <div className="flex justify-center gap-2 items-center">
// // // // // // //                                 {/* Edit Info */}
// // // // // // //                                 <button onClick={() => onEdit(course)} className="p-2 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors" title="Edit Informasi Dasar">
// // // // // // //                                     <Edit size={14}/>
// // // // // // //                                 </button>
                                
// // // // // // //                                 {/* Editor Materi */}
// // // // // // //                                 <Link 
// // // // // // //                                     href={`/admin/courses/${course._id}`} 
// // // // // // //                                     className="p-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
// // // // // // //                                     title="Kelola Kurikulum & Materi (Editor)"
// // // // // // //                                 >
// // // // // // //                                     <Settings size={14}/>
// // // // // // //                                 </Link>

// // // // // // //                                 {/* Histori Pengajuan */}
// // // // // // //                                 <button onClick={() => onViewHistory(course)} className="p-2 rounded-lg border border-purple-200 text-purple-600 hover:bg-purple-50 transition-colors" title="Lihat Histori Pengajuan">
// // // // // // //                                     <FileClock size={14}/>
// // // // // // //                                 </button>
                                
// // // // // // //                                 {/* [PERMISSION] Tombol Publish */}
// // // // // // //                                 {canPublish && (
// // // // // // //                                     <button onClick={() => onPublish(course)} className={`p-2 rounded-lg border transition-colors ${course.isPublished ? 'border-orange-200 text-orange-600 hover:bg-orange-50' : 'border-green-200 text-green-600 hover:bg-green-50'}`} title={course.isPublished ? 'Tarik Kembali' : 'Terbitkan'}>
// // // // // // //                                         <Bell size={14}/>
// // // // // // //                                     </button>
// // // // // // //                                 )}
                                
// // // // // // //                                 {/* [PERMISSION] Tombol Hapus */}
// // // // // // //                                 {canDelete && (
// // // // // // //                                     <button onClick={() => onDelete(course._id)} className="p-2 rounded-lg border border-red-200 text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="Hapus Permanen">
// // // // // // //                                         <Trash2 size={14}/>
// // // // // // //                                     </button>
// // // // // // //                                 )}
// // // // // // //                             </div>
// // // // // // //                         </td>
// // // // // // //                     </tr>
// // // // // // //                 ))}
// // // // // // //             </tbody>
// // // // // // //         </table>
// // // // // // //     );
// // // // // // // }


// // // // // // 'use client';

// // // // // // import Link from 'next/link'; 
// // // // // // import { Edit, Trash2, CheckCircle, Bell, FileClock, Settings, AlertCircle } from 'lucide-react';
// // // // // // import { getImageUrl } from '@/lib/api'; 

// // // // // // interface ManagementTableProps {
// // // // // //     courses: any[];
// // // // // //     onEdit: (course: any) => void;
// // // // // //     onDelete: (id: string) => void;
// // // // // //     onPublish: (course: any) => void;
// // // // // //     onBroadcast: (course: any) => void;
// // // // // //     onViewHistory: (course: any) => void;
// // // // // //     currentUser: any;
// // // // // // }

// // // // // // export default function ManagementTable({ courses, onEdit, onDelete, onPublish, onBroadcast, onViewHistory, currentUser }: ManagementTableProps) {
// // // // // //     if (courses.length === 0) {
// // // // // //         return (
// // // // // //             <div className="p-12 text-center flex flex-col items-center justify-center text-gray-400 bg-white border-b border-gray-100">
// // // // // //                 <AlertCircle size={48} className="mb-2 opacity-20"/>
// // // // // //                 <span className="italic">Belum ada data pelatihan.</span>
// // // // // //             </div>
// // // // // //         );
// // // // // //     }

// // // // // //     return (
// // // // // //         <table className="w-full text-left text-sm">
// // // // // //             <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase tracking-wider text-[10px]">
// // // // // //                 <tr>
// // // // // //                     <th className="p-4 font-bold">Cover</th>
// // // // // //                     <th className="p-4 font-bold">Info Pelatihan</th>
// // // // // //                     <th className="p-4 font-bold text-center">Tipe Program</th>
// // // // // //                     <th className="p-4 font-bold text-center">Harga</th>
// // // // // //                     <th className="p-4 font-bold text-center">Status</th>
// // // // // //                     <th className="p-4 font-bold text-center">Aksi</th>
// // // // // //                 </tr>
// // // // // //             </thead>
// // // // // //             <tbody className="divide-y divide-gray-50 bg-white">
// // // // // //                 {courses.map(course => {
// // // // // //                     // --- DEBUGGING (Cek di Console Browser) ---
// // // // // //                     // console.log(`Course: ${course.title}`, { picIds: course.picIds, myId: currentUser?.id });

// // // // // //                     // 1. Cek Super User (Admin / Super Admin)
// // // // // //                     // Mereka otomatis bisa segalanya (termasuk Publish)
// // // // // //                     const isSuperUser = currentUser?.role === 'SUPER_ADMIN' || currentUser?.permissions?.includes('manage_courses');

// // // // // //                     // 2. Cek Pemilik Utama (Creator)
// // // // // //                     const creatorId = typeof course.creatorInfo === 'object' ? course.creatorInfo?._id || course.creatorInfo?.id : course.creatorInfo;
// // // // // //                     const isMainCreator = String(creatorId) === String(currentUser.id);

// // // // // //                     // 3. Cek PIC Tambahan
// // // // // //                     // Pastikan Dr. Budi (PIC) terdeteksi di sini
// // // // // //                     const isAdditionalPIC = course.picIds && Array.isArray(course.picIds) && course.picIds.some((pic: any) => {
// // // // // //                         const idToCheck = typeof pic === 'object' ? pic._id : pic;
// // // // // //                         return String(idToCheck) === String(currentUser.id);
// // // // // //                     });

// // // // // //                     // Gabungan: Apakah User adalah "Pemilik" (Creator atau PIC)?
// // // // // //                     // Jika YA, maka dia berhak Edit Info, Hapus, dll.
// // // // // //                     const isOwner = isMainCreator || isAdditionalPIC;

// // // // // //                     // ==========================================
// // // // // //                     // PENENTUAN TOMBOL (ACTION BUTTONS)
// // // // // //                     // ==========================================
                    
// // // // // //                     // A. MANAJEMEN DASAR (Edit Info, Hapus, Histori)
// // // // // //                     // Boleh: Admin Operasional, Super Admin, Creator, PIC Tambahan
// // // // // //                     const canManageData = isSuperUser || isOwner;

// // // // // //                     // B. EDITOR MATERI (Kurikulum)
// // // // // //                     // Boleh: Semua yang bisa lihat list ini (Fasilitator, PIC, Admin)
// // // // // //                     const canEditContent = true; 

// // // // // //                     // C. PUBLISH (Terbit/Tarik)
// // // // // //                     // Boleh: HANYA Admin Operasional & Super Admin (Sesuai Request)
// // // // // //                     const canPublish = isSuperUser; 

// // // // // //                     return (
// // // // // //                         <tr key={course._id} className="hover:bg-gray-50/50 transition-colors group">
// // // // // //                             <td className="p-4 w-24 align-middle">
// // // // // //                                 <div className="w-20 h-14 bg-gray-200 rounded-lg overflow-hidden border border-gray-100 shadow-sm relative">
// // // // // //                                     {course.thumbnailUrl ? (
// // // // // //                                         <img 
// // // // // //                                             src={getImageUrl(course.thumbnailUrl)} 
// // // // // //                                             alt={course.title} 
// // // // // //                                             className="w-full h-full object-cover"
// // // // // //                                             onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/150?text=No+Image'; }}
// // // // // //                                         />
// // // // // //                                     ) : (
// // // // // //                                         <div className="flex items-center justify-center h-full text-gray-400"><span className="text-[10px]">No Img</span></div>
// // // // // //                                     )}
// // // // // //                                 </div>
// // // // // //                             </td>

// // // // // //                             <td className="p-4 align-middle">
// // // // // //                                 <h3 className="font-bold text-gray-900 mb-1 line-clamp-1" title={course.title}>{course.title}</h3>
// // // // // //                                 <div className="text-xs text-blue-600 font-medium mb-2">{course.organizer || 'PMI PUSAT'}</div>
// // // // // //                                 <div className="flex gap-2">
// // // // // //                                     <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded border border-gray-200 flex items-center gap-1">
// // // // // //                                         {course.modules?.length || 0} Modul
// // // // // //                                     </span>
// // // // // //                                 </div>
// // // // // //                             </td>

// // // // // //                             <td className="p-4 text-center align-middle">
// // // // // //                                 <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${course.programType === 'training' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-purple-50 text-purple-700 border-purple-100'}`}>
// // // // // //                                     {course.programType === 'training' ? 'Diklat' : 'Kursus'}
// // // // // //                                 </span>
// // // // // //                             </td>

// // // // // //                             <td className="p-4 text-center align-middle font-bold text-green-600 text-xs">
// // // // // //                                 {course.price === 0 ? 'Gratis' : `Rp ${course.price.toLocaleString()}`}
// // // // // //                             </td>

// // // // // //                             <td className="p-4 text-center align-middle">
// // // // // //                                 <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${course.isPublished || course.status === 'published' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>
// // // // // //                                     {course.isPublished || course.status === 'published' ? <><CheckCircle size={10}/> TERBIT</> : <><Edit size={10}/> DRAFT</>}
// // // // // //                                 </div>
// // // // // //                             </td>

// // // // // //                             <td className="p-4 align-middle">
// // // // // //                                 <div className="flex justify-center gap-2 items-center">
                                    
// // // // // //                                     {/* 1. EDIT INFO DASAR (Hanya PIC & Admin) */}
// // // // // //                                     {canManageData && (
// // // // // //                                         <button onClick={() => onEdit(course)} className="p-2 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors" title="Edit Informasi Dasar">
// // // // // //                                             <Edit size={14}/>
// // // // // //                                         </button>
// // // // // //                                     )}
                                    
// // // // // //                                     {/* 2. EDITOR MATERI (Semua) */}
// // // // // //                                     {canEditContent && (
// // // // // //                                         <Link 
// // // // // //                                             href={`/admin/courses/${course._id}`} 
// // // // // //                                             className="p-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
// // // // // //                                             title="Kelola Kurikulum & Materi (Editor)"
// // // // // //                                         >
// // // // // //                                             <Settings size={14}/>
// // // // // //                                         </Link>
// // // // // //                                     )}

// // // // // //                                     {/* 3. HISTORI (Hanya PIC & Admin) */}
// // // // // //                                     {canManageData && (
// // // // // //                                         <button onClick={() => onViewHistory(course)} className="p-2 rounded-lg border border-purple-200 text-purple-600 hover:bg-purple-50 transition-colors" title="Lihat Histori Pengajuan">
// // // // // //                                             <FileClock size={14}/>
// // // // // //                                         </button>
// // // // // //                                     )}
                                    
// // // // // //                                     {/* 4. PUBLISH (HANYA ADMIN / SUPER ADMIN) */}
// // // // // //                                     {canPublish && (
// // // // // //                                         <button onClick={() => onPublish(course)} className={`p-2 rounded-lg border transition-colors ${course.isPublished ? 'border-orange-200 text-orange-600 hover:bg-orange-50' : 'border-green-200 text-green-600 hover:bg-green-50'}`} title={course.isPublished ? 'Tarik Kembali' : 'Terbitkan'}>
// // // // // //                                             <Bell size={14}/>
// // // // // //                                         </button>
// // // // // //                                     )}
                                    
// // // // // //                                     {/* 5. DELETE (Hanya PIC & Admin) */}
// // // // // //                                     {canManageData && (
// // // // // //                                         <button onClick={() => onDelete(course._id)} className="p-2 rounded-lg border border-red-200 text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="Hapus Permanen">
// // // // // //                                             <Trash2 size={14}/>
// // // // // //                                         </button>
// // // // // //                                     )}
// // // // // //                                 </div>
// // // // // //                             </td>
// // // // // //                         </tr>
// // // // // //                     );
// // // // // //                 })}
// // // // // //             </tbody>
// // // // // //         </table>
// // // // // //     );
// // // // // // }

// // // // // 'use client';

// // // // // import Link from 'next/link'; 
// // // // // import { Edit, Trash2, CheckCircle, Bell, FileClock, Settings, AlertCircle } from 'lucide-react';
// // // // // import { getImageUrl } from '@/lib/api'; 

// // // // // interface ManagementTableProps {
// // // // //     courses: any[];
// // // // //     onEdit: (course: any) => void;
// // // // //     onDelete: (id: string) => void;
// // // // //     onPublish: (course: any) => void;
// // // // //     onBroadcast: (course: any) => void;
// // // // //     onViewHistory: (course: any) => void;
// // // // //     currentUser: any;
// // // // // }

// // // // // export default function ManagementTable({ courses, onEdit, onDelete, onPublish, onBroadcast, onViewHistory, currentUser }: ManagementTableProps) {
// // // // //     if (courses.length === 0) {
// // // // //         return (
// // // // //             <div className="p-12 text-center flex flex-col items-center justify-center text-gray-400 bg-white border-b border-gray-100">
// // // // //                 <AlertCircle size={48} className="mb-2 opacity-20"/>
// // // // //                 <span className="italic">Belum ada data pelatihan.</span>
// // // // //             </div>
// // // // //         );
// // // // //     }

// // // // //     return (
// // // // //         <table className="w-full text-left text-sm">
// // // // //             <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase tracking-wider text-[10px]">
// // // // //                 <tr>
// // // // //                     <th className="p-4 font-bold">Cover</th>
// // // // //                     <th className="p-4 font-bold">Info Pelatihan</th>
// // // // //                     <th className="p-4 font-bold text-center">Tipe Program</th>
// // // // //                     <th className="p-4 font-bold text-center">Harga</th>
// // // // //                     <th className="p-4 font-bold text-center">Status</th>
// // // // //                     <th className="p-4 font-bold text-center">Aksi</th>
// // // // //                 </tr>
// // // // //             </thead>
// // // // //             <tbody className="divide-y divide-gray-50 bg-white">
// // // // //                 {courses.map(course => {
// // // // //                     // =================================================================
// // // // //                     // LOGIKA HAK AKSES (FINAL FIX & DEBUG)
// // // // //                     // =================================================================

// // // // //                     // 1. Ambil ID User Login dengan aman
// // // // //                     // Beberapa sistem auth menyimpan di .id, mongo di ._id
// // // // //                     const myId = String(currentUser?.id || currentUser?._id || '');

// // // // //                     // 2. Cek Super Admin / Admin Operasional (Level Dewa)
// // // // //                     const isSuperUser = currentUser?.role === 'SUPER_ADMIN' || currentUser?.permissions?.includes('manage_courses');

// // // // //                     // 3. Cek Creator (Pembuat Utama)
// // // // //                     const creatorIdRaw = course.creatorInfo?._id || course.creatorInfo?.id || course.creatorInfo;
// // // // //                     const isMainCreator = String(creatorIdRaw) === myId;

// // // // //                     // 4. Cek PIC Tambahan (Array)
// // // // //                     // Kita pastikan picIds ada dan berupa array
// // // // //                     const picList = Array.isArray(course.picIds) ? course.picIds : [];
                    
// // // // //                     const isAdditionalPIC = picList.some((pic: any) => {
// // // // //                         // Handle jika pic adalah Object (Populated) atau String ID biasa
// // // // //                         const picIdRaw = pic?._id || pic?.id || pic; 
// // // // //                         return String(picIdRaw) === myId;
// // // // //                     });

// // // // //                     // 5. Kesimpulan: Apakah User ini "Pemilik"?
// // // // //                     const isOwner = isMainCreator || isAdditionalPIC;

// // // // //                     // --- DEBUGGING LOG (Lihat di Console Browser: F12) ---
// // // // //                     // console.log(`Course: ${course.title}`, { 
// // // // //                     //    myId, 
// // // // //                     //    isSuperUser, 
// // // // //                     //    isMainCreator, 
// // // // //                     //    isAdditionalPIC, 
// // // // //                     //    picListLength: picList.length 
// // // // //                     // });

// // // // //                     // =================================================================
// // // // //                     // KONFIGURASI TOMBOL
// // // // //                     // =================================================================
                    
// // // // //                     // Full Akses: (Edit, Delete, History) -> Hanya untuk Admin & Owner (PIC)
// // // // //                     const canManageData = isSuperUser || isOwner;

// // // // //                     // Konten Akses: (Editor Materi) -> Semua yang bisa lihat row ini
// // // // //                     const canEditContent = true; 

// // // // //                     // Publish Akses: (Terbitkan) -> Hanya Admin
// // // // //                     const canPublish = isSuperUser; 

// // // // //                     return (
// // // // //                         <tr key={course._id} className="hover:bg-gray-50/50 transition-colors group">
// // // // //                             <td className="p-4 w-24 align-middle">
// // // // //                                 <div className="w-20 h-14 bg-gray-200 rounded-lg overflow-hidden border border-gray-100 shadow-sm relative">
// // // // //                                     {course.thumbnailUrl ? (
// // // // //                                         <img 
// // // // //                                             src={getImageUrl(course.thumbnailUrl)} 
// // // // //                                             alt={course.title} 
// // // // //                                             className="w-full h-full object-cover"
// // // // //                                             onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/150?text=No+Image'; }}
// // // // //                                         />
// // // // //                                     ) : (
// // // // //                                         <div className="flex items-center justify-center h-full text-gray-400"><span className="text-[10px]">No Img</span></div>
// // // // //                                     )}
// // // // //                                 </div>
// // // // //                             </td>

// // // // //                             <td className="p-4 align-middle">
// // // // //                                 <h3 className="font-bold text-gray-900 mb-1 line-clamp-1" title={course.title}>{course.title}</h3>
// // // // //                                 <div className="text-xs text-blue-600 font-medium mb-2">{course.organizer || 'PMI PUSAT'}</div>
// // // // //                                 <div className="flex gap-2">
// // // // //                                     <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded border border-gray-200 flex items-center gap-1">
// // // // //                                         {course.modules?.length || 0} Modul
// // // // //                                     </span>
// // // // //                                 </div>
// // // // //                             </td>

// // // // //                             <td className="p-4 text-center align-middle">
// // // // //                                 <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${course.programType === 'training' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-purple-50 text-purple-700 border-purple-100'}`}>
// // // // //                                     {course.programType === 'training' ? 'Diklat' : 'Kursus'}
// // // // //                                 </span>
// // // // //                             </td>

// // // // //                             <td className="p-4 text-center align-middle font-bold text-green-600 text-xs">
// // // // //                                 {course.price === 0 ? 'Gratis' : `Rp ${course.price.toLocaleString()}`}
// // // // //                             </td>

// // // // //                             <td className="p-4 text-center align-middle">
// // // // //                                 <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${course.isPublished || course.status === 'published' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>
// // // // //                                     {course.isPublished || course.status === 'published' ? <><CheckCircle size={10}/> TERBIT</> : <><Edit size={10}/> DRAFT</>}
// // // // //                                 </div>
// // // // //                             </td>

// // // // //                             <td className="p-4 align-middle">
// // // // //                                 <div className="flex justify-center gap-2 items-center">
                                    
// // // // //                                     {/* 1. EDIT INFO DASAR (Hanya PIC & Admin) */}
// // // // //                                     {canManageData && (
// // // // //                                         <button onClick={() => onEdit(course)} className="p-2 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors" title="Edit Informasi Dasar">
// // // // //                                             <Edit size={14}/>
// // // // //                                         </button>
// // // // //                                     )}
                                    
// // // // //                                     {/* 2. EDITOR MATERI (Semua) */}
// // // // //                                     {canEditContent && (
// // // // //                                         <Link 
// // // // //                                             href={`/admin/courses/${course._id}`} 
// // // // //                                             className="p-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
// // // // //                                             title="Kelola Kurikulum & Materi (Editor)"
// // // // //                                         >
// // // // //                                             <Settings size={14}/>
// // // // //                                         </Link>
// // // // //                                     )}

// // // // //                                     {/* 3. HISTORI (Hanya PIC & Admin) */}
// // // // //                                     {canManageData && (
// // // // //                                         <button onClick={() => onViewHistory(course)} className="p-2 rounded-lg border border-purple-200 text-purple-600 hover:bg-purple-50 transition-colors" title="Lihat Histori Pengajuan">
// // // // //                                             <FileClock size={14}/>
// // // // //                                         </button>
// // // // //                                     )}
                                    
// // // // //                                     {/* 4. PUBLISH (HANYA ADMIN / SUPER ADMIN) */}
// // // // //                                     {canPublish && (
// // // // //                                         <button onClick={() => onPublish(course)} className={`p-2 rounded-lg border transition-colors ${course.isPublished ? 'border-orange-200 text-orange-600 hover:bg-orange-50' : 'border-green-200 text-green-600 hover:bg-green-50'}`} title={course.isPublished ? 'Tarik Kembali' : 'Terbitkan'}>
// // // // //                                             <Bell size={14}/>
// // // // //                                         </button>
// // // // //                                     )}
                                    
// // // // //                                     {/* 5. DELETE (Hanya PIC & Admin) */}
// // // // //                                     {canManageData && (
// // // // //                                         <button onClick={() => onDelete(course._id)} className="p-2 rounded-lg border border-red-200 text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="Hapus Permanen">
// // // // //                                             <Trash2 size={14}/>
// // // // //                                         </button>
// // // // //                                     )}
// // // // //                                 </div>
// // // // //                             </td>
// // // // //                         </tr>
// // // // //                     );
// // // // //                 })}
// // // // //             </tbody>
// // // // //         </table>
// // // // //     );
// // // // // }


// // // // 'use client';

// // // // import Link from 'next/link'; 
// // // // import { Edit, Trash2, CheckCircle, Bell, FileClock, Settings, AlertCircle, Lock, Eye, BookOpen } from 'lucide-react';
// // // // import { getImageUrl } from '@/lib/api'; 

// // // // interface ManagementTableProps {
// // // //     courses: any[];
// // // //     onEdit: (course: any) => void;
// // // //     onDelete: (id: string) => void;
// // // //     onPublish: (course: any) => void;
// // // //     onBroadcast: (course: any) => void;
// // // //     onViewHistory: (course: any) => void;
// // // //     currentUser: any;
// // // // }

// // // // export default function ManagementTable({ courses, onEdit, onDelete, onPublish, onBroadcast, onViewHistory, currentUser }: ManagementTableProps) {
// // // //     if (courses.length === 0) {
// // // //         return (
// // // //             <div className="p-12 text-center flex flex-col items-center justify-center text-gray-400 bg-white border-b border-gray-100">
// // // //                 <AlertCircle size={48} className="mb-2 opacity-20"/>
// // // //                 <span className="italic">Belum ada data pelatihan di manajemen.</span>
// // // //             </div>
// // // //         );
// // // //     }

// // // //     // --- HELPER: Label Status Workflow ---
// // // //     const getStatusLabel = (status: string, isPublished: boolean) => {
// // // //         // 1. Status LIVE (Sudah Publish)
// // // //         if (isPublished || status === 'published') {
// // // //             return { 
// // // //                 text: 'TERBIT (LIVE)', 
// // // //                 color: 'bg-green-100 text-green-700 border-green-200', 
// // // //                 icon: <CheckCircle size={12}/> 
// // // //             };
// // // //         }
// // // //         // 2. Status READY (Disetujui Admin, Menunggu User Klik Publish)
// // // //         if (status === 'ready') {
// // // //             return { 
// // // //                 text: 'SIAP PUBLISH', 
// // // //                 color: 'bg-blue-100 text-blue-700 border-blue-200 animate-pulse', 
// // // //                 icon: <Bell size={12}/> 
// // // //             };
// // // //         }
// // // //         // 3. Status DRAFT (Baru disetujui proposalnya, konten belum lengkap)
// // // //         if (status === 'draft') {
// // // //             return { 
// // // //                 text: 'DRAFT (ISI KONTEN)', 
// // // //                 color: 'bg-orange-50 text-orange-700 border-orange-200', 
// // // //                 icon: <Edit size={12}/> 
// // // //             };
// // // //         }
// // // //         // Fallback
// // // //         return { text: status.toUpperCase(), color: 'bg-gray-100 text-gray-500', icon: null };
// // // //     };

// // // //     return (
// // // //         <table className="w-full text-left text-sm">
// // // //             <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase tracking-wider text-[10px]">
// // // //                 <tr>
// // // //                     <th className="p-4 font-bold">Cover</th>
// // // //                     <th className="p-4 font-bold">Info Pelatihan</th>
// // // //                     <th className="p-4 font-bold text-center">Status Workflow</th>
// // // //                     <th className="p-4 font-bold text-center">Aksi</th>
// // // //                 </tr>
// // // //             </thead>
// // // //             <tbody className="divide-y divide-gray-50 bg-white">
// // // //                 {courses.map(course => {
// // // //                     // 1. Identifikasi User & Role
// // // //                     const myId = String(currentUser?.id || currentUser?._id || '');
// // // //                     const isSuperUser = currentUser?.role === 'SUPER_ADMIN' || currentUser?.permissions?.includes('manage_courses');
                    
// // // //                     // 2. Cek Pemilik (Creator / PIC)
// // // //                     const creatorIdRaw = course.creatorInfo?._id || course.creatorInfo?.id || course.creatorInfo;
// // // //                     const isMainCreator = String(creatorIdRaw) === myId;
// // // //                     const picList = Array.isArray(course.picIds) ? course.picIds : [];
// // // //                     const isAdditionalPIC = picList.some((pic: any) => String(pic?._id || pic?.id || pic) === myId);
// // // //                     const isOwner = isMainCreator || isAdditionalPIC;

// // // //                     const canManageData = isSuperUser || isOwner;
// // // //                     const canEditContent = isSuperUser || isOwner; // Semua yang punya akses bisa edit materi

// // // //                     // 3. LOGIKA BUTTON PUBLISH (KUNCI UTAMA)
// // // //                     // - Status 'ready' + Owner = Tombol Publish Muncul
// // // //                     // - Admin selalu bisa publish (bypass)
// // // //                     const isReadyToPublish = course.status === 'ready'; 
// // // //                     const isLive = course.isPublished || course.status === 'published';

// // // //                     const showPublishButton = (isOwner && isReadyToPublish) || (isSuperUser && !isLive);
// // // //                     const showUnpublishButton = isSuperUser && isLive; // Hanya admin yang boleh unpublish paksa

// // // //                     // Ambil Label
// // // //                     const statusBadge = getStatusLabel(course.status, isLive);

// // // //                     return (
// // // //                         <tr key={course._id} className="hover:bg-gray-50/50 transition-colors group">
// // // //                             <td className="p-4 w-24 align-middle">
// // // //                                 <div className="w-20 h-14 bg-gray-200 rounded-lg overflow-hidden border border-gray-100 shadow-sm relative">
// // // //                                     {course.thumbnailUrl ? (
// // // //                                         <img 
// // // //                                             src={getImageUrl(course.thumbnailUrl)} 
// // // //                                             alt={course.title} 
// // // //                                             className="w-full h-full object-cover"
// // // //                                             onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/150?text=No+Img'; }}
// // // //                                         />
// // // //                                     ) : (
// // // //                                         <div className="flex items-center justify-center h-full text-gray-400"><span className="text-[10px]">No Img</span></div>
// // // //                                     )}
// // // //                                 </div>
// // // //                             </td>

// // // //                             <td className="p-4 align-middle">
// // // //                                 <h3 className="font-bold text-gray-900 mb-1 line-clamp-1" title={course.title}>{course.title}</h3>
// // // //                                 <div className="text-xs text-blue-600 font-medium mb-1">{course.organizer || 'PMI PUSAT'}</div>
// // // //                                 <div className="flex gap-2 text-[10px] text-gray-500">
// // // //                                     <span className="flex items-center gap-1 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">
// // // //                                         <Settings size={10}/> {course.modules?.length || 0} Modul
// // // //                                     </span>
// // // //                                 </div>
// // // //                                 {/* Pesan untuk status Draft */}
// // // //                                 {course.status === 'draft' && (
// // // //                                     <div className="text-[10px] text-orange-600 mt-1 italic flex items-center gap-1">
// // // //                                         <AlertCircle size={10}/> Menunggu kelengkapan materi & approval Admin.
// // // //                                     </div>
// // // //                                 )}
// // // //                             </td>

// // // //                             <td className="p-4 text-center align-middle">
// // // //                                 <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${statusBadge.color}`}>
// // // //                                     {statusBadge.icon} {statusBadge.text}
// // // //                                 </div>
// // // //                             </td>

// // // //                             <td className="p-4 align-middle">
// // // //                                 <div className="flex justify-center gap-2 items-center">
                                    
// // // //                                     {/* 1. EDIT INFO (Admin & Owner) */}
// // // //                                     {canManageData && (
// // // //                                         <button onClick={() => onEdit(course)} className="p-2 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors" title="Edit Informasi & Review Konten">
// // // // //                                             <Edit size={14}/>
// // // // //                                         </button>
// // // // //                                     )}

// // // // //                                     {/* 2. EDITOR MATERI (Kurikulum) */}
// // // // //                                     {canEditContent && (
// // // // //                                         <Link 
// // // // //                                             href={`/admin/courses/${course._id}`} 
// // // // //                                             className="p-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors" 
// // // // //                                             title="Susun Kurikulum & Materi"
// // // // //                                         >
// // // // //                                             <BookOpen size={14}/>
// // // // //                                         </Link>
// // // // //                                     )}

// // // // //                                     {/* 3. HISTORI */}
// // // // //                                     {canManageData && (
// // // // //                                         <button onClick={() => onViewHistory(course)} className="p-2 rounded-lg border border-purple-200 text-purple-600 hover:bg-purple-50 transition-colors" title="Lihat Histori">
// // // // //                                             <FileClock size={14}/>
// // // // //                                         </button>
// // // // //                                     )}
                                    
// // // // //                                     {/* 4. PUBLISH BUTTON (Logic Baru) */}
// // // // //                                     {showPublishButton ? (
// // // // //                                         <button 
// // // // //                                             onClick={() => onPublish(course)} 
// // // // //                                             className="px-3 py-2 rounded-lg border border-green-200 bg-green-50 text-green-700 hover:bg-green-100 font-bold text-xs flex items-center gap-1 shadow-sm animate-in zoom-in" 
// // // // //                                             title="Terbitkan Pelatihan"
// // // // //                                         >
// // // // //                                             <Bell size={12}/> Publish
// // // // //                                         </button>
// // // // //                                     ) : (
// // // // //                                         // Tampilkan Gembok jika belum live dan User adalah Owner (bukan Admin)
// // // // //                                         (!isLive && isOwner && !isSuperUser) && (
// // // // //                                             <div className="p-2 rounded-lg border border-gray-100 text-gray-300 cursor-not-allowed bg-gray-50" title="Selesaikan materi & tunggu approval Admin untuk Publish">
// // // // //                                                 <Lock size={14}/>
// // // // //                                             </div>
// // // // //                                         )
// // // // //                                     )}

// // // // //                                     {/* 5. UNPUBLISH (Admin Only) */}
// // // // //                                     {showUnpublishButton && (
// // // // //                                         <button onClick={() => onPublish(course)} className="p-2 rounded-lg border border-orange-200 text-orange-600 hover:bg-orange-50 transition-colors" title="Tarik Kembali (Unpublish)">
// // // // //                                             <Bell size={14}/>
// // // // //                                         </button>
// // // // //                                     )}
                                    
// // // // //                                     {/* 6. DELETE */}
// // // // //                                     {canManageData && (
// // // // //                                         <button onClick={() => onDelete(course._id)} className="p-2 rounded-lg border border-red-200 text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="Hapus">
// // // // //                                             <Trash2 size={14}/>
// // // // //                                         </button>
// // // // //                                     )}
// // // // //                                 </div>
// // // // //                             </td>
// // // // //                         </tr>
// // // // //                     );
// // // // //                 })}
// // // // //             </tbody>
// // // // //         </table>
// // // // //     );
// // // // // }


// // // // 'use client';

// // // // import Link from 'next/link'; 
// // // // import { Edit, Trash2, CheckCircle, Bell, FileClock, Settings, AlertCircle, Lock, BookOpen } from 'lucide-react'; // Gunakan BookOpen untuk kurikulum agar beda
// // // // import { getImageUrl } from '@/lib/api'; 

// // // // interface ManagementTableProps {
// // // //     courses: any[];
// // // //     onEdit: (course: any) => void;
// // // //     onDelete: (id: string) => void;
// // // //     onPublish: (course: any) => void;
// // // //     onBroadcast: (course: any) => void;
// // // //     onViewHistory: (course: any) => void;
// // // //     currentUser: any;
// // // // }

// // // // export default function ManagementTable({ courses, onEdit, onDelete, onPublish, onBroadcast, onViewHistory, currentUser }: ManagementTableProps) {
// // // //     if (courses.length === 0) {
// // // //         return (
// // // //             <div className="p-12 text-center flex flex-col items-center justify-center text-gray-400 bg-white border-b border-gray-100">
// // // //                 <AlertCircle size={48} className="mb-2 opacity-20"/>
// // // //                 <span className="italic">Belum ada data pelatihan di manajemen.</span>
// // // //             </div>
// // // //         );
// // // //     }

// // // //     const getStatusLabel = (status: string, isPublished: boolean) => {
// // // //         if (isPublished || status === 'published') return { text: 'TERBIT (LIVE)', color: 'bg-green-100 text-green-700 border-green-200', icon: <CheckCircle size={12}/> };
// // // //         if (status === 'ready') return { text: 'SIAP PUBLISH', color: 'bg-blue-100 text-blue-700 border-blue-200 animate-pulse', icon: <Bell size={12}/> };
// // // //         if (status === 'draft') return { text: 'DRAFT (ISI KONTEN)', color: 'bg-orange-50 text-orange-700 border-orange-200', icon: <Edit size={12}/> };
// // // //         return { text: status.toUpperCase(), color: 'bg-gray-100 text-gray-500', icon: null };
// // // //     };

// // // //     return (
// // // //         <table className="w-full text-left text-sm">
// // // //             <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase tracking-wider text-[10px]">
// // // //                 <tr>
// // // //                     <th className="p-4 font-bold">Cover</th>
// // // //                     <th className="p-4 font-bold">Info Pelatihan</th>
// // // //                     <th className="p-4 font-bold text-center">Status Workflow</th>
// // // //                     <th className="p-4 font-bold text-center">Aksi</th>
// // // //                 </tr>
// // // //             </thead>
// // // //             <tbody className="divide-y divide-gray-50 bg-white">
// // // //                 {courses.map(course => {
// // // //                     const myId = String(currentUser?.id || currentUser?._id || '');
                    
// // // //                     // 1. Cek Super Admin
// // // //                     const isSuperUser = currentUser?.role === 'SUPER_ADMIN' || currentUser?.permissions?.includes('manage_courses');
                    
// // // //                     // 2. Cek Owner (Pembuat)
// // // //                     const creatorIdRaw = course.creatorInfo?._id || course.creatorInfo?.id || course.creatorInfo;
// // // //                     const isMainCreator = String(creatorIdRaw) === myId;
                    
// // // //                     // 3. Cek PIC (Tim Admin Tambahan)
// // // //                     const picList = Array.isArray(course.picIds) ? course.picIds : [];
// // // //                     const isAdditionalPIC = picList.some((pic: any) => String(pic?._id || pic?.id || pic) === myId);
                    
// // // //                     // 4. [BARU] Cek Tim Fasilitator (Dr. Budi ada disini)
// // // //                     // Pastikan Dr. Budi dimasukkan ke field 'facilitatorIds' di database
// // // //                     const facList = Array.isArray(course.facilitatorIds) ? course.facilitatorIds : [];
// // // //                     const isAssignedFacilitator = facList.some((fac: any) => String(fac?._id || fac?.id || fac) === myId);

// // // //                     // --- PERMISSION LOGIC ---
// // // //                     const isOwner = isMainCreator || isAdditionalPIC;
                    
// // // //                     // Siapa yang boleh Edit Data Umum (Judul, Harga)? -> Admin, Owner
// // // //                     const canManageData = isSuperUser || isOwner; 
                    
// // // //                     // Siapa yang boleh Susun Kurikulum? -> Admin, Owner, DAN FASILITATOR TIM
// // // //                     const canEditContent = isSuperUser || isOwner || isAssignedFacilitator; 

// // // //                     // Logic Publish
// // // //                     const isReadyToPublish = course.status === 'ready'; 
// // // //                     const isLive = course.isPublished || course.status === 'published';
// // // //                     const showPublishButton = (isOwner && isReadyToPublish) || (isSuperUser && !isLive);
// // // //                     const showUnpublishButton = isSuperUser && isLive;

// // // //                     const statusBadge = getStatusLabel(course.status, isLive);

// // // //                     return (
// // // //                         <tr key={course._id} className="hover:bg-gray-50/50 transition-colors group">
// // // //                             <td className="p-4 w-24 align-middle">
// // // //                                 <div className="w-20 h-14 bg-gray-200 rounded-lg overflow-hidden border border-gray-100 shadow-sm relative">
// // // //                                     <img 
// // // //                                         src={getImageUrl(course.thumbnailUrl)} 
// // // //                                         alt={course.title} 
// // // //                                         className="w-full h-full object-cover"
// // // //                                         onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/150?text=No+Img'; }}
// // // //                                     />
// // // //                                 </div>
// // // //                             </td>

// // // //                             <td className="p-4 align-middle">
// // // //                                 <h3 className="font-bold text-gray-900 mb-1 line-clamp-1" title={course.title}>{course.title}</h3>
// // // //                                 <div className="text-xs text-blue-600 font-medium mb-1">{course.organizer || 'PMI PUSAT'}</div>
// // // //                                 <div className="flex gap-2 text-[10px] text-gray-500">
// // // //                                     <span className="flex items-center gap-1 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">
// // // //                                         <BookOpen size={10}/> {course.modules?.length || 0} Modul
// // // //                                     </span>
// // // //                                 </div>
// // // //                                 {course.status === 'draft' && (
// // // //                                     <div className="text-[10px] text-orange-600 mt-1 italic flex items-center gap-1">
// // // //                                         <AlertCircle size={10}/> Menunggu konten.
// // // //                                     </div>
// // // //                                 )}
// // // //                             </td>

// // // //                             <td className="p-4 text-center align-middle">
// // // //                                 <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${statusBadge.color}`}>
// // // //                                     {statusBadge.icon} {statusBadge.text}
// // // //                                 </div>
// // // //                             </td>

// // // //                             <td className="p-4 align-middle">
// // // //                                 <div className="flex justify-center gap-2 items-center">
                                    
// // // //                                     {/* 1. EDIT INFO UTAMA */}
// // // //                                     {canManageData && (
// // // //                                         <button onClick={() => onEdit(course)} className="p-2 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors" title="Edit Informasi">
// // // //                                             <Edit size={14}/>
// // // //                                         </button>
// // // //                                     )}

// // // //                                     {/* 2. SUSUN KURIKULUM (Fasilitator Bisa Akses Ini) */}
// // // //                                     {canEditContent && (
// // // //                                         <Link 
// // // //                                             href={`/admin/courses/${course._id}`} 
// // // //                                             className="p-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors bg-white shadow-sm" 
// // // //                                             title="Susun Kurikulum & Materi"
// // // //                                         >
// // // //                                             <Settings size={14}/>
// // // //                                         </Link>
// // // //                                     )}

// // // //                                     {/* 3. HISTORI */}
// // // //                                     {canManageData && (
// // // //                                         <button onClick={() => onViewHistory(course)} className="p-2 rounded-lg border border-purple-200 text-purple-600 hover:bg-purple-50 transition-colors" title="Lihat Histori">
// // // //                                             <FileClock size={14}/>
// // // //                                         </button>
// // // //                                     )}
                                    
// // // //                                     {/* 4. PUBLISH */}
// // // //                                     {showPublishButton ? (
// // // //                                         <button onClick={() => onPublish(course)} className="px-3 py-2 rounded-lg border border-green-200 bg-green-50 text-green-700 hover:bg-green-100 font-bold text-xs flex items-center gap-1 shadow-sm animate-pulse" title="Terbitkan">
// // // //                                             <Bell size={12}/> Publish
// // // //                                         </button>
// // // //                                     ) : (
// // // //                                         (!isLive && isOwner && !isSuperUser) && (
// // // //                                             <div className="p-2 rounded-lg border border-gray-100 text-gray-300 cursor-not-allowed bg-gray-50" title="Menunggu Approval Admin">
// // // //                                                 <Lock size={14}/>
// // // //                                             </div>
// // // //                                         )
// // // //                                     )}

// // // //                                     {/* 5. UNPUBLISH */}
// // // //                                     {showUnpublishButton && (
// // // //                                         <button onClick={() => onPublish(course)} className="p-2 rounded-lg border border-orange-200 text-orange-600 hover:bg-orange-50 transition-colors" title="Unpublish">
// // // //                                             <Bell size={14}/>
// // // //                                         </button>
// // // //                                     )}
                                    
// // // //                                     {/* 6. DELETE */}
// // // //                                     {canManageData && (
// // // //                                         <button onClick={() => onDelete(course._id)} className="p-2 rounded-lg border border-red-200 text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="Hapus">
// // // //                                             <Trash2 size={14}/>
// // // //                                         </button>
// // // //                                     )}
// // // //                                 </div>
// // // //                             </td>
// // // //                         </tr>
// // // //                     );
// // // //                 })}
// // // //             </tbody>
// // // //         </table>
// // // //     );
// // // // }


// // // 'use client';

// // // import Link from 'next/link'; 
// // // import { Edit, Trash2, CheckCircle, Settings, AlertCircle, Lock, BookOpen, Bell, FileClock, Send } from 'lucide-react'; 
// // // import { getImageUrl } from '@/lib/api'; 

// // // interface ManagementTableProps {
// // //     courses: any[];
// // //     onEdit: (course: any) => void;
// // //     onDelete: (id: string) => void;
// // //     onPublish: (course: any) => void;
// // //     onBroadcast: (course: any) => void;
// // //     onViewHistory: (course: any) => void;
// // //     currentUser: any;
// // // }

// // // export default function ManagementTable({ courses, onEdit, onDelete, onPublish, onBroadcast, onViewHistory, currentUser }: ManagementTableProps) {
// // //     if (courses.length === 0) return <div className="p-12 text-center text-gray-400 bg-white border-b shadow-sm"><AlertCircle className="mx-auto mb-2 opacity-20" size={48}/> Belum ada data pelatihan.</div>;

// // //     const getStatusLabel = (status: string, isPublished: boolean) => {
// // //         if (isPublished || status === 'published') return { text: 'TERBIT (LIVE)', color: 'bg-green-100 text-green-700 border-green-200', icon: <CheckCircle size={12}/> };
// // //         if (status === 'ready') return { text: 'SIAP PUBLISH', color: 'bg-blue-100 text-blue-700 border-blue-200 animate-pulse', icon: <Bell size={12}/> };
// // //         if (status === 'draft') return { text: 'DRAFT (ISI KONTEN)', color: 'bg-orange-50 text-orange-700 border-orange-200', icon: <Edit size={12}/> };
// // //         return { text: status.toUpperCase(), color: 'bg-gray-100 text-gray-500', icon: null };
// // //     };

// // //     return (
// // //         <table className="w-full text-left text-sm">
// // //             <thead className="bg-gray-50 border-b text-gray-500 uppercase tracking-wider text-[10px]">
// // //                 <tr>
// // //                     <th className="p-4 font-bold">Cover</th>
// // //                     <th className="p-4 font-bold">Info Pelatihan</th>
// // //                     <th className="p-4 font-bold text-center">Status Workflow</th>
// // //                     <th className="p-4 font-bold text-center">Aksi</th>
// // //                 </tr>
// // //             </thead>
// // //             <tbody className="divide-y divide-gray-50 bg-white">
// // //                 {courses.map(course => {
// // //                     const myId = String(currentUser?.id || currentUser?._id || '');
// // //                     const isSuperUser = currentUser?.role === 'SUPER_ADMIN' || currentUser?.role === 'ADMIN';
// // //                     const isMainCreator = String(course.creatorInfo?.id || course.creatorInfo?._id || course.creatorInfo) === myId;
// // //                     const isPIC = (course.picIds || []).some((id: any) => String(id?._id || id) === myId);
// // //                     const isFacilitator = (course.facilitatorIds || []).some((id: any) => String(id?._id || id) === myId);

// // //                     const canEditInfo = isSuperUser || isMainCreator || isPIC;
// // //                     const canEditContent = canEditInfo || isFacilitator;

// // //                     const infoLengkap = course.isInfoCompleted === true || course.status === 'published';
// // //                     const isLive = course.isPublished || course.status === 'published';
// // //                     const moduleCount = course.modules?.length || 0;
// // //                     const statusBadge = getStatusLabel(course.status, isLive);

// // //                     return (
// // //                         <tr key={course._id} className="hover:bg-gray-50/50 transition-colors group">
// // //                             <td className="p-4 w-24 align-middle">
// // //                                 <div className="w-20 h-14 bg-gray-100 rounded-lg overflow-hidden border shadow-sm">
// // //                                     <img src={getImageUrl(course.thumbnailUrl)} alt={course.title} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/150?text=No+Cover'; }} />
// // //                                 </div>
// // //                             </td>
// // //                             <td className="p-4">
// // //                                 <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">{course.title}</h3>
// // //                                 <div className="text-xs text-blue-600 font-medium mb-1 uppercase">{course.organizer || 'PMI PUSAT'}</div>
                                
// // //                                 {/* PANDUAN ALUR KECIL INLINE */}
// // //                                 <div className="flex items-center gap-2 mt-2">
// // //                                     {!infoLengkap ? (
// // //                                         <div className="flex items-center gap-1 text-[8px] font-bold uppercase bg-red-50 text-red-600 px-1.5 py-0.5 rounded border border-red-100 animate-pulse">
// // //                                             <AlertCircle size={8}/> 1. Edit Info Terlebih Dahulu
// // //                                         </div>
// // //                                     ) : moduleCount === 0 ? (
// // //                                         <div className="flex items-center gap-1 text-[8px] font-bold uppercase bg-orange-50 text-orange-600 px-1.5 py-0.5 rounded border border-orange-100">
// // //                                             <Settings size={8}/> 2. Susun Materi (Gear)
// // //                                         </div>
// // //                                     ) : !isLive && (
// // //                                         <div className="flex items-center gap-1 text-[8px] font-bold uppercase bg-green-50 text-green-600 px-1.5 py-0.5 rounded border border-green-100">
// // //                                             <Send size={8}/> 3. Siap Publish
// // //                                         </div>
// // //                                     )}
// // //                                 </div>
// // //                             </td>
// // //                             <td className="p-4 text-center align-middle">
// // //                                 <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${statusBadge.color}`}>
// // //                                     {statusBadge.icon} {statusBadge.text}
// // //                                 </div>
// // //                             </td>
// // //                             <td className="p-4 align-middle">
// // //                                 <div className="flex justify-center gap-2 items-center">
// // //                                     {/* 1. EDIT (PIC/Super) */}
// // //                                     {canEditInfo && (
// // //                                         <button onClick={() => onEdit(course)} className="p-2 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-100 bg-white" title="Edit Informasi"><Edit size={14}/></button>
// // //                                     )}

// // //                                     {/* 2. GEAR (Fasilitator/PIC, terkunci jika info belum lengkap) */}
// // //                                     {canEditContent && (
// // //                                         infoLengkap ? (
// // //                                             <Link href={`/admin/courses/${course._id}`} className="p-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 bg-white shadow-sm" title="Susun Materi"><Settings size={14}/></Link>
// // //                                         ) : (
// // //                                             <div className="p-2 text-gray-300 bg-gray-50 border rounded-lg cursor-not-allowed" title="Terkunci"><Lock size={14}/></div>
// // //                                         )
// // //                                     )}

// // //                                     {/* 3. HISTORY (FileClock) */}
// // //                                     {canEditInfo && (
// // //                                         <button onClick={() => onViewHistory(course)} className="p-2 rounded-lg border border-purple-200 text-purple-600 hover:bg-purple-50" title="Histori"><FileClock size={14}/></button>
// // //                                     )}

// // //                                     {/* 4. PUBLISH (Bell Icon) */}
// // //                                     {canEditInfo && (
// // //                                         <button disabled={!infoLengkap} onClick={() => onPublish(course)} className={`px-3 py-2 rounded-lg font-bold text-xs flex items-center gap-1 transition-all ${infoLengkap ? (isLive ? 'bg-orange-50 text-orange-600 border-orange-200' : 'bg-green-600 text-white shadow-md') : 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'}`}>
// // //                                             <Bell size={12}/> {isLive ? 'Unpublish' : 'Publish'}
// // //                                         </button>
// // //                                     )}

// // //                                     {/* 5. DELETE (Hanya Super Admin) */}
// // //                                     {isSuperUser && (
// // //                                         <button onClick={() => onDelete(course._id)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg" title="Hapus"><Trash2 size={14}/></button>
// // //                                     )}
// // //                                 </div>
// // //                             </td>
// // //                         </tr>
// // //                     );
// // //                 })}
// // //             </tbody>
// // //         </table>
// // //     );
// // // }


// // 'use client';

// // import Link from 'next/link'; 
// // import { Edit, Trash2, CheckCircle, Settings, AlertCircle, Lock, BookOpen, Bell, FileClock, Send } from 'lucide-react'; 
// // import { getImageUrl } from '@/lib/api'; 

// // interface ManagementTableProps {
// //     courses: any[];
// //     onEdit: (course: any) => void;
// //     onDelete: (id: string) => void;
// //     onPublish: (course: any) => void;
// //     onBroadcast: (course: any) => void;
// //     onViewHistory: (course: any) => void;
// //     currentUser: any;
// // }

// // export default function ManagementTable({ courses, onEdit, onDelete, onPublish, onBroadcast, onViewHistory, currentUser }: ManagementTableProps) {
// //     if (courses.length === 0) return <div className="p-12 text-center text-gray-400 bg-white shadow-sm"><AlertCircle className="mx-auto mb-2 opacity-20" size={48}/> Belum ada data pelatihan.</div>;

// //     const getStatusLabel = (status: string, isPublished: boolean) => {
// //         if (isPublished || status === 'published') return { text: 'TERBIT (LIVE)', color: 'bg-green-100 text-green-700 border-green-200', icon: <CheckCircle size={12}/> };
// //         if (status === 'ready') return { text: 'SIAP PUBLISH', color: 'bg-blue-100 text-blue-700 border-blue-200 animate-pulse', icon: <Bell size={12}/> };
// //         if (status === 'draft') return { text: 'DRAFT (ISI KONTEN)', color: 'bg-orange-50 text-orange-700 border-orange-200', icon: <Edit size={12}/> };
// //         return { text: status.toUpperCase(), color: 'bg-gray-100 text-gray-500', icon: null };
// //     };

// //     return (
// //         <table className="w-full text-left text-sm">
// //             <thead className="bg-gray-50 border-b text-gray-500 uppercase tracking-wider text-[10px]">
// //                 <tr>
// //                     <th className="p-4 font-bold">Cover</th>
// //                     <th className="p-4 font-bold">Info Pelatihan</th>
// //                     <th className="p-4 font-bold text-center">Status Workflow</th>
// //                     <th className="p-4 font-bold text-center">Aksi</th>
// //                 </tr>
// //             </thead>
// //             <tbody className="divide-y divide-gray-50 bg-white">
// //                 {courses.map(course => {
// //                     const myId = String(currentUser?.id || currentUser?._id || '');
// //                     const isSuperUser = currentUser?.role === 'SUPER_ADMIN' || currentUser?.role === 'ADMIN';
// //                     const creatorId = course.creatorInfo?.id || course.creatorInfo?._id || course.creatorInfo;
// //                     const isMainCreator = String(creatorId) === myId;
// //                     const isPIC = (course.picIds || []).some((id: any) => String(id?._id || id) === myId);
// //                     const isFacilitator = (course.facilitatorIds || []).some((id: any) => String(id?._id || id) === myId);

// //                     const canEditInfo = isSuperUser || isMainCreator || isPIC;
// //                     const canEditContent = canEditInfo || isFacilitator;

// //                     const infoLengkap = course.isInfoCompleted === true || course.status === 'published';
// //                     const isLive = course.isPublished || course.status === 'published';
// //                     const moduleCount = course.modules?.length || 0;
// //                     const statusBadge = getStatusLabel(course.status, isLive);

// //                     return (
// //                         <tr key={course._id} className="hover:bg-gray-50/50 transition-colors group">
// //                             <td className="p-4 w-24 align-middle">
// //                                 <div className="w-20 h-14 bg-gray-100 rounded-lg overflow-hidden border shadow-sm">
// //                                     <img src={getImageUrl(course.thumbnailUrl)} alt={course.title} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/150?text=No+Cover'; }} />
// //                                 </div>
// //                             </td>
// //                             <td className="p-4">
// //                                 <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">{course.title}</h3>
// //                                 <div className="text-xs text-blue-600 font-medium mb-1 uppercase">{course.organizer || 'PMI PUSAT'}</div>
                                
// //                                 <div className="flex items-center gap-2 mt-2">
// //                                     {!infoLengkap ? (
// //                                         <div className="flex items-center gap-1 text-[8px] font-bold uppercase bg-red-50 text-red-600 px-1.5 py-0.5 rounded border border-red-100 animate-pulse">
// //                                             <AlertCircle size={8}/> 1. Edit Info Dulu
// //                                         </div>
// //                                     ) : moduleCount === 0 ? (
// //                                         <div className="flex items-center gap-1 text-[8px] font-bold uppercase bg-orange-50 text-orange-600 px-1.5 py-0.5 rounded border border-orange-100">
// //                                             <Settings size={8}/> 2. Susun Materi (Gear)
// //                                         </div>
// //                                     ) : !isLive && (
// //                                         <div className="flex items-center gap-1 text-[8px] font-bold uppercase bg-green-50 text-green-600 px-1.5 py-0.5 rounded border border-green-100">
// //                                             <Send size={8}/> 3. Siap Publish
// //                                         </div>
// //                                     )}
// //                                 </div>
// //                             </td>
// //                             <td className="p-4 text-center align-middle">
// //                                 <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${statusBadge.color}`}>
// //                                     {statusBadge.icon} {statusBadge.text}
// //                                 </div>
// //                             </td>
// //                             <td className="p-4 align-middle">
// //                                 <div className="flex justify-center gap-2 items-center">
// //                                     {canEditInfo && (
// //                                         <button onClick={() => onEdit(course)} className="p-2 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-100 bg-white" title="Edit Informasi"><Edit size={14}/></button>
// //                                     )}
// //                                     {canEditContent && (
// //                                         infoLengkap ? (
// //                                             <Link href={`/admin/courses/${course._id}`} className="p-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 bg-white shadow-sm" title="Susun Materi"><Settings size={14}/></Link>
// //                                         ) : (
// //                                             <div className="p-2 text-gray-300 bg-gray-50 border rounded-lg cursor-not-allowed" title="Terkunci (PIC harus edit info dahulu)"><Lock size={14}/></div>
// //                                         )
// //                                     )}
// //                                     {canEditInfo && (
// //                                         <button onClick={() => onViewHistory(course)} className="p-2 rounded-lg border border-purple-200 text-purple-600 hover:bg-purple-50" title="Histori"><FileClock size={14}/></button>
// //                                     )}
// //                                     {canEditInfo && (
// //                                         <button disabled={!infoLengkap} onClick={() => onPublish(course)} className={`px-3 py-2 rounded-lg font-bold text-xs flex items-center gap-1 transition-all ${infoLengkap ? (isLive ? 'bg-orange-50 text-orange-600' : 'bg-green-600 text-white shadow-md') : 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'}`} title="Publish">
// //                                             <Bell size={12}/> {isLive ? 'Unpublish' : 'Publish'}
// //                                         </button>
// //                                     )}
// //                                     {isSuperUser && (
// //                                         <button onClick={() => onDelete(course._id)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg" title="Hapus"><Trash2 size={14}/></button>
// //                                     )}
// //                                 </div>
// //                             </td>
// //                         </tr>
// //                     );
// //                 })}
// //             </tbody>
// //         </table>
// //     );
// // }



// 'use client';

// import Link from 'next/link'; 
// import { Edit, Trash2, CheckCircle, Settings, AlertCircle, Lock, BookOpen, Bell, FileClock, Send } from 'lucide-react'; 
// import { getImageUrl } from '@/lib/api'; 

// interface ManagementTableProps {
//     courses: any[];
//     onEdit: (course: any) => void;
//     onDelete: (id: string) => void;
//     onPublish: (course: any) => void;
//     onBroadcast: (course: any) => void;
//     onViewHistory: (course: any) => void;
//     currentUser: any;
// }

// export default function ManagementTable({ courses, onEdit, onDelete, onPublish, onBroadcast, onViewHistory, currentUser }: ManagementTableProps) {
//     if (courses.length === 0) return <div className="p-12 text-center text-gray-400 bg-white shadow-sm"><AlertCircle className="mx-auto mb-2 opacity-20" size={48}/> Belum ada data.</div>;

//     const getStatusLabel = (status: string, isPublished: boolean) => {
//         if (isPublished || status === 'published') return { text: 'TERBIT (LIVE)', color: 'bg-green-100 text-green-700 border-green-200', icon: <CheckCircle size={12}/> };
//         if (status === 'ready') return { text: 'SIAP PUBLISH', color: 'bg-blue-100 text-blue-700 border-blue-200 animate-pulse', icon: <Bell size={12}/> };
//         if (status === 'draft') return { text: 'DRAFT (ISI KONTEN)', color: 'bg-orange-50 text-orange-700 border-orange-200', icon: <Edit size={12}/> };
//         return { text: status.toUpperCase(), color: 'bg-gray-100 text-gray-500', icon: null };
//     };

//     return (
//         <table className="w-full text-left text-sm">
//             <thead className="bg-gray-50 border-b text-gray-500 uppercase tracking-wider text-[10px]">
//                 <tr>
//                     <th className="p-4 font-bold">Cover</th>
//                     <th className="p-4 font-bold">Info Pelatihan</th>
//                     <th className="p-4 font-bold text-center">Status Workflow</th>
//                     <th className="p-4 font-bold text-center">Aksi</th>
//                 </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-50 bg-white">
//                 {courses.map(course => {
//                     const myId = String(currentUser?.id || currentUser?._id || '');
//                     const isSuperUser = currentUser?.role === 'SUPER_ADMIN' || currentUser?.role === 'ADMIN';
//                     const isOwner = String(course.creatorInfo?.id || course.creatorInfo?._id || course.creatorInfo) === myId;
//                     const isPIC = (course.picIds || []).some((id: any) => String(id?._id || id) === myId);
//                     const isFacilitator = (course.facilitatorIds || []).some((id: any) => String(id?._id || id) === myId);

//                     const canEditInfo = isSuperUser || isOwner || isPIC;
//                     const canEditContent = canEditInfo || isFacilitator;

//                     const infoLengkap = course.isInfoCompleted === true || course.status === 'published';
//                     const isLive = course.isPublished || course.status === 'published';
//                     const moduleCount = course.modules?.length || 0;
//                     const statusBadge = getStatusLabel(course.status, isLive);

//                     return (
//                         <tr key={course._id} className="hover:bg-gray-50/50 transition-colors group">
//                             <td className="p-4 w-24 align-middle">
//                                 <div className="w-20 h-14 bg-gray-100 rounded-lg overflow-hidden border shadow-sm">
//                                     <img src={getImageUrl(course.thumbnailUrl)} alt={course.title} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/150?text=No+Cover'; }} />
//                                 </div>
//                             </td>
//                             <td className="p-4">
//                                 <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">{course.title}</h3>
//                                 <div className="text-xs text-blue-600 font-medium mb-1 uppercase tracking-tight">{course.organizer || 'PMI PUSAT'}</div>
                                
//                                 {/* PANDUAN ALUR KECIL INLINE */}
//                                 <div className="flex items-center gap-2 mt-2">
//                                     {!infoLengkap ? (
//                                         <div className="flex items-center gap-1 text-[8px] font-bold uppercase bg-red-50 text-red-600 px-1.5 py-0.5 rounded border border-red-100 animate-pulse">
//                                             <AlertCircle size={8}/> 1. EDIT INFO TERLEBIH DAHULU
//                                         </div>
//                                     ) : moduleCount === 0 ? (
//                                         <div className="flex items-center gap-1 text-[8px] font-bold uppercase bg-orange-50 text-orange-600 px-1.5 py-0.5 rounded border border-orange-100">
//                                             <Settings size={8}/> 2. KLIK GEAR UNTUK SUSUN MATERI
//                                         </div>
//                                     ) : !isLive && (
//                                         <div className="flex items-center gap-1 text-[8px] font-bold uppercase bg-green-50 text-green-600 px-1.5 py-0.5 rounded border border-green-100 shadow-sm">
//                                             <Send size={8}/> 3. SIAP PUBLISH
//                                         </div>
//                                     )}
//                                 </div>
//                             </td>
//                             <td className="p-4 text-center align-middle">
//                                 <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${statusBadge.color}`}>
//                                     {statusBadge.icon} {statusBadge.text}
//                                 </div>
//                             </td>
//                             <td className="p-4 align-middle">
//                                 <div className="flex justify-center gap-2 items-center">
//                                     {canEditInfo && (
//                                         <button onClick={() => onEdit(course)} className="p-2 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-100 bg-white" title="Edit Informasi"><Edit size={14}/></button>
//                                     )}
//                                     {canEditContent && (
//                                         infoLengkap ? (
//                                             <Link href={`/admin/courses/${course._id}`} className="p-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 bg-white shadow-sm" title="Susun Materi"><Settings size={14}/></Link>
//                                         ) : (
//                                             <div className="p-2 text-gray-300 bg-gray-50 border rounded-lg cursor-not-allowed shadow-inner" title="Lengkapi Info Dulu"><Lock size={14}/></div>
//                                         )
//                                     )}
//                                     {canEditInfo && (
//                                         <button onClick={() => onViewHistory(course)} className="p-2 rounded-lg border border-purple-200 text-purple-600 hover:bg-purple-50 shadow-sm" title="Histori"><FileClock size={14}/></button>
//                                     )}
//                                     {canEditInfo && (
//                                         <button disabled={!infoLengkap} onClick={() => onPublish(course)} className={`px-3 py-2 rounded-lg font-bold text-xs flex items-center gap-1 transition-all ${infoLengkap ? (isLive ? 'bg-orange-50 text-orange-600' : 'bg-green-600 text-white shadow-md') : 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'}`} title="Publish">
//                                             <Bell size={12}/> {isLive ? 'Unpublish' : 'Publish'}
//                                         </button>
//                                     )}
//                                     {isSuperUser && (
//                                         <button onClick={() => onDelete(course._id)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg shadow-sm" title="Hapus"><Trash2 size={14}/></button>
//                                     )}
//                                 </div>
//                             </td>
//                         </tr>
//                     );
//                 })}
//             </tbody>
//         </table>
//     );
// }


'use client';

import Link from 'next/link'; 
import { Edit, Trash2, CheckCircle, Settings, AlertCircle, Lock, BookOpen, Bell, FileClock, Send } from 'lucide-react'; 
import { getImageUrl } from '@/lib/api'; 
// [FIX IMPORT] Gunakan fungsi baru yang spesifik untuk Edit Konten
import { canEditCourseContent, canAccessCourse } from '@/lib/permissionUtils';

interface ManagementTableProps {
    courses: any[];
    onEdit: (course: any) => void;
    onDelete: (id: string) => void;
    onPublish: (course: any) => void;
    onBroadcast: (course: any) => void;
    onViewHistory: (course: any) => void;
    currentUser: any;
}

export default function ManagementTable({ courses, onEdit, onDelete, onPublish, onBroadcast, onViewHistory, currentUser }: ManagementTableProps) {
    if (courses.length === 0) return <div className="p-12 text-center text-gray-400 bg-white shadow-sm"><AlertCircle className="mx-auto mb-2 opacity-20" size={48}/> Belum ada data.</div>;

    const getStatusLabel = (status: string, isPublished: boolean) => {
        if (isPublished || status === 'published') return { text: 'TERBIT (LIVE)', color: 'bg-green-100 text-green-700 border-green-200', icon: <CheckCircle size={12}/> };
        if (status === 'ready') return { text: 'SIAP PUBLISH', color: 'bg-blue-100 text-blue-700 border-blue-200 animate-pulse', icon: <Bell size={12}/> };
        if (status === 'draft') return { text: 'DRAFT (ISI KONTEN)', color: 'bg-orange-50 text-orange-700 border-orange-200', icon: <Edit size={12}/> };
        return { text: status.toUpperCase(), color: 'bg-gray-100 text-gray-500', icon: null };
    };

    return (
        <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b text-gray-500 uppercase tracking-wider text-[10px]">
                <tr>
                    <th className="p-4 font-bold">Cover</th>
                    <th className="p-4 font-bold">Info Pelatihan</th>
                    <th className="p-4 font-bold text-center">Status Workflow</th>
                    <th className="p-4 font-bold text-center">Aksi</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 bg-white">
                {courses.map(course => {
                    const myId = String(currentUser?.id || currentUser?._id || '');
                    const isSuperUser = currentUser?.role === 'SUPER_ADMIN'; 
                    
                    const infoLengkap = course.isInfoCompleted === true || course.status === 'published';
                    const isLive = course.isPublished || course.status === 'published';
                    const moduleCount = course.modules?.length || 0;
                    const statusBadge = getStatusLabel(course.status, isLive);

                    // [LOGIKA BARU] 
                    // Gunakan canEditCourseContent untuk mengecek Toggle "Kelola Pelatihan" + Wilayah
                    const isAllowedToEdit = canEditCourseContent(currentUser, course);
                    
                    // Cek akses dasar (untuk tombol View Only)
                    const hasViewAccess = canAccessCourse(currentUser, course);

                    return (
                        <tr key={course._id} className="hover:bg-gray-50/50 transition-colors group">
                            <td className="p-4 w-24 align-middle">
                                <div className="w-20 h-14 bg-gray-100 rounded-lg overflow-hidden border shadow-sm">
                                    <img src={getImageUrl(course.thumbnailUrl)} alt={course.title} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/150?text=No+Cover'; }} />
                                </div>
                            </td>
                            <td className="p-4">
                                <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">{course.title}</h3>
                                <div className="text-xs text-blue-600 font-medium mb-1 uppercase tracking-tight">{course.organizer || 'PMI PUSAT'}</div>
                                
                                <div className="flex items-center gap-2 mt-2">
                                    {!infoLengkap ? (
                                        <div className="flex items-center gap-1 text-[8px] font-bold uppercase bg-red-50 text-red-600 px-1.5 py-0.5 rounded border border-red-100 animate-pulse">
                                            <AlertCircle size={8}/> 1. EDIT INFO TERLEBIH DAHULU
                                        </div>
                                    ) : moduleCount === 0 ? (
                                        <div className="flex items-center gap-1 text-[8px] font-bold uppercase bg-orange-50 text-orange-600 px-1.5 py-0.5 rounded border border-orange-100">
                                            <Settings size={8}/> 2. KLIK GEAR UNTUK SUSUN MATERI
                                        </div>
                                    ) : !isLive && (
                                        <div className="flex items-center gap-1 text-[8px] font-bold uppercase bg-green-50 text-green-600 px-1.5 py-0.5 rounded border border-green-100 shadow-sm">
                                            <Send size={8}/> 3. SIAP PUBLISH
                                        </div>
                                    )}
                                </div>
                            </td>
                            <td className="p-4 text-center align-middle">
                                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${statusBadge.color}`}>
                                    {statusBadge.icon} {statusBadge.text}
                                </div>
                            </td>
                            <td className="p-4 align-middle">
                                <div className="flex justify-center gap-2 items-center">
                                    {/* JIKA PUNYA IZIN EDIT (Toggle 'Kelola Pelatihan' ON) */}
                                    {isAllowedToEdit ? (
                                        <>
                                            {/* TOMBOL EDIT INFO */}
                                            <button onClick={() => onEdit(course)} className="p-2 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-100 bg-white" title="Edit Informasi"><Edit size={14}/></button>
                                            
                                            {/* TOMBOL MATERI (GEAR) */}
                                            {infoLengkap ? (
                                                <Link href={`/admin/courses/${course._id}`} className="p-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 bg-white shadow-sm" title="Susun Materi"><Settings size={14}/></Link>
                                            ) : (
                                                <div className="p-2 text-gray-300 bg-gray-50 border rounded-lg cursor-not-allowed shadow-inner" title="Lengkapi Info Dulu"><Lock size={14}/></div>
                                            )}

                                            {/* TOMBOL HISTORI */}
                                            <button onClick={() => onViewHistory(course)} className="p-2 rounded-lg border border-purple-200 text-purple-600 hover:bg-purple-50 shadow-sm" title="Histori"><FileClock size={14}/></button>
                                            
                                            {/* TOMBOL PUBLISH */}
                                            <button disabled={!infoLengkap} onClick={() => onPublish(course)} className={`px-3 py-2 rounded-lg font-bold text-xs flex items-center gap-1 transition-all ${infoLengkap ? (isLive ? 'bg-orange-50 text-orange-600' : 'bg-green-600 text-white shadow-md') : 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'}`} title="Publish">
                                                <Bell size={12}/> {isLive ? 'Unpublish' : 'Publish'}
                                            </button>

                                            {/* TOMBOL HAPUS (Super Admin Only) */}
                                            {isSuperUser && (
                                                <button onClick={() => onDelete(course._id)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg shadow-sm" title="Hapus"><Trash2 size={14}/></button>
                                            )}
                                        </>
                                    ) : (
                                        // JIKA TIDAK PUNYA IZIN EDIT (View Only)
                                        <>
                                            {hasViewAccess ? (
                                                <button onClick={() => onViewHistory(course)} className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 shadow-sm" title="Lihat Detail"><BookOpen size={14}/></button>
                                            ) : null}
                                            
                                            <div className="flex items-center gap-1 px-2 py-1 bg-gray-50 border border-gray-200 rounded text-[10px] text-gray-400 cursor-not-allowed" title="Anda hanya memiliki akses lihat">
                                                <Lock size={12}/> <span>View Only</span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
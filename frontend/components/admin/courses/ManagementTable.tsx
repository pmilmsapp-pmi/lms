// // // 'use client';

// // // import Link from 'next/link'; // [WAJIB] Untuk tombol Gear menuju Editor
// // // import { Edit, Trash2, CheckCircle, Bell, FileClock, Settings, MoreHorizontal } from 'lucide-react';
// // // import { getImageUrl } from '@/lib/api'; // [WAJIB] Pastikan import ini ada untuk fix gambar

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
// // //     if (courses.length === 0) {
// // //         return <div className="p-12 text-center text-gray-400 italic bg-white border-b border-gray-100">Belum ada data pelatihan.</div>;
// // //     }

// // //     return (
// // //         <table className="w-full text-left text-sm">
// // //             <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase tracking-wider text-[10px]">
// // //                 <tr>
// // //                     <th className="p-4 font-bold">Cover</th>
// // //                     <th className="p-4 font-bold">Info Pelatihan</th>
// // //                     <th className="p-4 font-bold text-center">Tipe Program</th>
// // //                     <th className="p-4 font-bold text-center">Harga</th>
// // //                     <th className="p-4 font-bold text-center">Status</th>
// // //                     <th className="p-4 font-bold text-center">Aksi</th>
// // //                 </tr>
// // //             </thead>
// // //             <tbody className="divide-y divide-gray-50 bg-white">
// // //                 {courses.map(course => (
// // //                     <tr key={course._id} className="hover:bg-gray-50/50 transition-colors group">
// // //                         {/* 1. COVER PHOTO FIX */}
// // //                         <td className="p-4 w-24 align-middle">
// // //                             <div className="w-20 h-14 bg-gray-200 rounded-lg overflow-hidden border border-gray-100 shadow-sm relative">
// // //                                 {course.thumbnailUrl ? (
// // //                                     <img 
// // //                                         src={getImageUrl(course.thumbnailUrl)} 
// // //                                         alt={course.title} 
// // //                                         className="w-full h-full object-cover"
// // //                                         onError={(e) => {
// // //                                             // Fallback jika gambar error
// // //                                             e.currentTarget.src = 'https://via.placeholder.com/150?text=No+Image';
// // //                                         }}
// // //                                     />
// // //                                 ) : (
// // //                                     <div className="flex items-center justify-center h-full text-gray-400"><span className="text-[10px]">No Img</span></div>
// // //                                 )}
// // //                             </div>
// // //                         </td>

// // //                         {/* 2. INFO */}
// // //                         <td className="p-4 align-middle">
// // //                             <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">{course.title}</h3>
// // //                             <div className="text-xs text-blue-600 font-medium mb-2">{course.organizer || 'PMI PUSAT'}</div>
// // //                             <div className="flex gap-2">
// // //                                 <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded border border-gray-200 flex items-center gap-1">
// // //                                     {course.modules?.length || 0} Modul
// // //                                 </span>
// // //                             </div>
// // //                         </td>

// // //                         {/* 3. TIPE */}
// // //                         <td className="p-4 text-center align-middle">
// // //                             <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${course.programType === 'training' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-purple-50 text-purple-700 border-purple-100'}`}>
// // //                                 {course.programType === 'training' ? 'Diklat' : 'Kursus'}
// // //                             </span>
// // //                         </td>

// // //                         {/* 4. HARGA */}
// // //                         <td className="p-4 text-center align-middle font-bold text-green-600 text-xs">
// // //                             {course.price === 0 ? 'Gratis' : `Rp ${course.price.toLocaleString()}`}
// // //                         </td>

// // //                         {/* 5. STATUS */}
// // //                         <td className="p-4 text-center align-middle">
// // //                             <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${course.isPublished || course.status === 'published' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>
// // //                                 {course.isPublished || course.status === 'published' ? <><CheckCircle size={10}/> TERBIT</> : <><Edit size={10}/> DRAFT</>}
// // //                             </div>
// // //                         </td>

// // //                         {/* 6. AKSI (TOMBOL LAMA DIKEMBALIKAN) */}
// // //                         <td className="p-4 align-middle">
// // //                             <div className="flex justify-center gap-2 items-center">
// // //                                 {/* A. Edit General Info (Pencil) */}
// // //                                 <button onClick={() => onEdit(course)} className="p-2 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors" title="Edit Informasi Dasar">
// // //                                     <Edit size={14}/>
// // //                                 </button>
                                
// // //                                 {/* B. [RESTORED] Editor Materi (Gear) */}
// // //                                 <Link 
// // //                                     href={`/admin/courses/${course._id}`} 
// // //                                     className="p-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
// // //                                     title="Kelola Kurikulum & Materi (Editor)"
// // //                                 >
// // //                                     <Settings size={14}/>
// // //                                 </Link>

// // //                                 {/* C. Histori Pengajuan (Request Anda) */}
// // //                                 <button onClick={() => onViewHistory(course)} className="p-2 rounded-lg border border-purple-200 text-purple-600 hover:bg-purple-50 transition-colors" title="Lihat Histori Pengajuan">
// // //                                     <FileClock size={14}/>
// // //                                 </button>
                                
// // //                                 {/* D. Publish/Unpublish (Bell) */}
// // //                                 <button onClick={() => onPublish(course)} className={`p-2 rounded-lg border transition-colors ${course.isPublished ? 'border-orange-200 text-orange-600 hover:bg-orange-50' : 'border-green-200 text-green-600 hover:bg-green-50'}`} title={course.isPublished ? 'Tarik Kembali' : 'Terbitkan'}>
// // //                                     <Bell size={14}/>
// // //                                 </button>
                                
// // //                                 {/* E. Hapus (Trash) */}
// // //                                 <button onClick={() => onDelete(course._id)} className="p-2 rounded-lg border border-red-200 text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="Hapus Permanen">
// // //                                     <Trash2 size={14}/>
// // //                                 </button>
// // //                             </div>
// // //                         </td>
// // //                     </tr>
// // //                 ))}
// // //             </tbody>
// // //         </table>
// // //     );
// // // }


// // 'use client';

// // import Link from 'next/link'; 
// // import { Edit, Trash2, CheckCircle, Bell, FileClock, Settings, MoreHorizontal } from 'lucide-react';
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
// //     if (courses.length === 0) {
// //         return <div className="p-12 text-center text-gray-400 italic bg-white border-b border-gray-100">Belum ada data pelatihan.</div>;
// //     }

// //     // Helper Cek Izin di Level Tabel
// //     const hasPermission = (perm: string) => {
// //         if (!currentUser) return false;
// //         if (currentUser.role === 'SUPER_ADMIN') return true;
// //         return currentUser.permissions?.includes(perm);
// //     };

// //     const canDelete = currentUser?.role === 'FACILITATOR' || hasPermission('manage_courses');
// //     const canPublish = hasPermission('publish_courses') || currentUser?.role === 'SUPER_ADMIN';

// //     return (
// //         <table className="w-full text-left text-sm">
// //             <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase tracking-wider text-[10px]">
// //                 <tr>
// //                     <th className="p-4 font-bold">Cover</th>
// //                     <th className="p-4 font-bold">Info Pelatihan</th>
// //                     <th className="p-4 font-bold text-center">Tipe Program</th>
// //                     <th className="p-4 font-bold text-center">Harga</th>
// //                     <th className="p-4 font-bold text-center">Status</th>
// //                     <th className="p-4 font-bold text-center">Aksi</th>
// //                 </tr>
// //             </thead>
// //             <tbody className="divide-y divide-gray-50 bg-white">
// //                 {courses.map(course => (
// //                     <tr key={course._id} className="hover:bg-gray-50/50 transition-colors group">
// //                         <td className="p-4 w-24 align-middle">
// //                             <div className="w-20 h-14 bg-gray-200 rounded-lg overflow-hidden border border-gray-100 shadow-sm relative">
// //                                 {course.thumbnailUrl ? (
// //                                     <img 
// //                                         src={getImageUrl(course.thumbnailUrl)} 
// //                                         alt={course.title} 
// //                                         className="w-full h-full object-cover"
// //                                         onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/150?text=No+Image'; }}
// //                                     />
// //                                 ) : (
// //                                     <div className="flex items-center justify-center h-full text-gray-400"><span className="text-[10px]">No Img</span></div>
// //                                 )}
// //                             </div>
// //                         </td>

// //                         <td className="p-4 align-middle">
// //                             <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">{course.title}</h3>
// //                             <div className="text-xs text-blue-600 font-medium mb-2">{course.organizer || 'PMI PUSAT'}</div>
// //                             <div className="flex gap-2">
// //                                 <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded border border-gray-200 flex items-center gap-1">
// //                                     {course.modules?.length || 0} Modul
// //                                 </span>
// //                             </div>
// //                         </td>

// //                         <td className="p-4 text-center align-middle">
// //                             <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${course.programType === 'training' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-purple-50 text-purple-700 border-purple-100'}`}>
// //                                 {course.programType === 'training' ? 'Diklat' : 'Kursus'}
// //                             </span>
// //                         </td>

// //                         <td className="p-4 text-center align-middle font-bold text-green-600 text-xs">
// //                             {course.price === 0 ? 'Gratis' : `Rp ${course.price.toLocaleString()}`}
// //                         </td>

// //                         <td className="p-4 text-center align-middle">
// //                             <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${course.isPublished || course.status === 'published' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>
// //                                 {course.isPublished || course.status === 'published' ? <><CheckCircle size={10}/> TERBIT</> : <><Edit size={10}/> DRAFT</>}
// //                             </div>
// //                         </td>

// //                         <td className="p-4 align-middle">
// //                             <div className="flex justify-center gap-2 items-center">
// //                                 {/* Edit Info */}
// //                                 <button onClick={() => onEdit(course)} className="p-2 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors" title="Edit Informasi Dasar">
// //                                     <Edit size={14}/>
// //                                 </button>
                                
// //                                 {/* Editor Materi */}
// //                                 <Link 
// //                                     href={`/admin/courses/${course._id}`} 
// //                                     className="p-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
// //                                     title="Kelola Kurikulum & Materi (Editor)"
// //                                 >
// //                                     <Settings size={14}/>
// //                                 </Link>

// //                                 {/* Histori Pengajuan */}
// //                                 <button onClick={() => onViewHistory(course)} className="p-2 rounded-lg border border-purple-200 text-purple-600 hover:bg-purple-50 transition-colors" title="Lihat Histori Pengajuan">
// //                                     <FileClock size={14}/>
// //                                 </button>
                                
// //                                 {/* [PERMISSION] Tombol Publish */}
// //                                 {canPublish && (
// //                                     <button onClick={() => onPublish(course)} className={`p-2 rounded-lg border transition-colors ${course.isPublished ? 'border-orange-200 text-orange-600 hover:bg-orange-50' : 'border-green-200 text-green-600 hover:bg-green-50'}`} title={course.isPublished ? 'Tarik Kembali' : 'Terbitkan'}>
// //                                         <Bell size={14}/>
// //                                     </button>
// //                                 )}
                                
// //                                 {/* [PERMISSION] Tombol Hapus */}
// //                                 {canDelete && (
// //                                     <button onClick={() => onDelete(course._id)} className="p-2 rounded-lg border border-red-200 text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="Hapus Permanen">
// //                                         <Trash2 size={14}/>
// //                                     </button>
// //                                 )}
// //                             </div>
// //                         </td>
// //                     </tr>
// //                 ))}
// //             </tbody>
// //         </table>
// //     );
// // }


// 'use client';

// import Link from 'next/link'; 
// import { Edit, Trash2, CheckCircle, Bell, FileClock, Settings, AlertCircle } from 'lucide-react';
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
//     if (courses.length === 0) {
//         return (
//             <div className="p-12 text-center flex flex-col items-center justify-center text-gray-400 bg-white border-b border-gray-100">
//                 <AlertCircle size={48} className="mb-2 opacity-20"/>
//                 <span className="italic">Belum ada data pelatihan.</span>
//             </div>
//         );
//     }

//     return (
//         <table className="w-full text-left text-sm">
//             <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase tracking-wider text-[10px]">
//                 <tr>
//                     <th className="p-4 font-bold">Cover</th>
//                     <th className="p-4 font-bold">Info Pelatihan</th>
//                     <th className="p-4 font-bold text-center">Tipe Program</th>
//                     <th className="p-4 font-bold text-center">Harga</th>
//                     <th className="p-4 font-bold text-center">Status</th>
//                     <th className="p-4 font-bold text-center">Aksi</th>
//                 </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-50 bg-white">
//                 {courses.map(course => {
//                     // --- DEBUGGING (Cek di Console Browser) ---
//                     // console.log(`Course: ${course.title}`, { picIds: course.picIds, myId: currentUser?.id });

//                     // 1. Cek Super User (Admin / Super Admin)
//                     // Mereka otomatis bisa segalanya (termasuk Publish)
//                     const isSuperUser = currentUser?.role === 'SUPER_ADMIN' || currentUser?.permissions?.includes('manage_courses');

//                     // 2. Cek Pemilik Utama (Creator)
//                     const creatorId = typeof course.creatorInfo === 'object' ? course.creatorInfo?._id || course.creatorInfo?.id : course.creatorInfo;
//                     const isMainCreator = String(creatorId) === String(currentUser.id);

//                     // 3. Cek PIC Tambahan
//                     // Pastikan Dr. Budi (PIC) terdeteksi di sini
//                     const isAdditionalPIC = course.picIds && Array.isArray(course.picIds) && course.picIds.some((pic: any) => {
//                         const idToCheck = typeof pic === 'object' ? pic._id : pic;
//                         return String(idToCheck) === String(currentUser.id);
//                     });

//                     // Gabungan: Apakah User adalah "Pemilik" (Creator atau PIC)?
//                     // Jika YA, maka dia berhak Edit Info, Hapus, dll.
//                     const isOwner = isMainCreator || isAdditionalPIC;

//                     // ==========================================
//                     // PENENTUAN TOMBOL (ACTION BUTTONS)
//                     // ==========================================
                    
//                     // A. MANAJEMEN DASAR (Edit Info, Hapus, Histori)
//                     // Boleh: Admin Operasional, Super Admin, Creator, PIC Tambahan
//                     const canManageData = isSuperUser || isOwner;

//                     // B. EDITOR MATERI (Kurikulum)
//                     // Boleh: Semua yang bisa lihat list ini (Fasilitator, PIC, Admin)
//                     const canEditContent = true; 

//                     // C. PUBLISH (Terbit/Tarik)
//                     // Boleh: HANYA Admin Operasional & Super Admin (Sesuai Request)
//                     const canPublish = isSuperUser; 

//                     return (
//                         <tr key={course._id} className="hover:bg-gray-50/50 transition-colors group">
//                             <td className="p-4 w-24 align-middle">
//                                 <div className="w-20 h-14 bg-gray-200 rounded-lg overflow-hidden border border-gray-100 shadow-sm relative">
//                                     {course.thumbnailUrl ? (
//                                         <img 
//                                             src={getImageUrl(course.thumbnailUrl)} 
//                                             alt={course.title} 
//                                             className="w-full h-full object-cover"
//                                             onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/150?text=No+Image'; }}
//                                         />
//                                     ) : (
//                                         <div className="flex items-center justify-center h-full text-gray-400"><span className="text-[10px]">No Img</span></div>
//                                     )}
//                                 </div>
//                             </td>

//                             <td className="p-4 align-middle">
//                                 <h3 className="font-bold text-gray-900 mb-1 line-clamp-1" title={course.title}>{course.title}</h3>
//                                 <div className="text-xs text-blue-600 font-medium mb-2">{course.organizer || 'PMI PUSAT'}</div>
//                                 <div className="flex gap-2">
//                                     <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded border border-gray-200 flex items-center gap-1">
//                                         {course.modules?.length || 0} Modul
//                                     </span>
//                                 </div>
//                             </td>

//                             <td className="p-4 text-center align-middle">
//                                 <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${course.programType === 'training' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-purple-50 text-purple-700 border-purple-100'}`}>
//                                     {course.programType === 'training' ? 'Diklat' : 'Kursus'}
//                                 </span>
//                             </td>

//                             <td className="p-4 text-center align-middle font-bold text-green-600 text-xs">
//                                 {course.price === 0 ? 'Gratis' : `Rp ${course.price.toLocaleString()}`}
//                             </td>

//                             <td className="p-4 text-center align-middle">
//                                 <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${course.isPublished || course.status === 'published' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>
//                                     {course.isPublished || course.status === 'published' ? <><CheckCircle size={10}/> TERBIT</> : <><Edit size={10}/> DRAFT</>}
//                                 </div>
//                             </td>

//                             <td className="p-4 align-middle">
//                                 <div className="flex justify-center gap-2 items-center">
                                    
//                                     {/* 1. EDIT INFO DASAR (Hanya PIC & Admin) */}
//                                     {canManageData && (
//                                         <button onClick={() => onEdit(course)} className="p-2 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors" title="Edit Informasi Dasar">
//                                             <Edit size={14}/>
//                                         </button>
//                                     )}
                                    
//                                     {/* 2. EDITOR MATERI (Semua) */}
//                                     {canEditContent && (
//                                         <Link 
//                                             href={`/admin/courses/${course._id}`} 
//                                             className="p-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
//                                             title="Kelola Kurikulum & Materi (Editor)"
//                                         >
//                                             <Settings size={14}/>
//                                         </Link>
//                                     )}

//                                     {/* 3. HISTORI (Hanya PIC & Admin) */}
//                                     {canManageData && (
//                                         <button onClick={() => onViewHistory(course)} className="p-2 rounded-lg border border-purple-200 text-purple-600 hover:bg-purple-50 transition-colors" title="Lihat Histori Pengajuan">
//                                             <FileClock size={14}/>
//                                         </button>
//                                     )}
                                    
//                                     {/* 4. PUBLISH (HANYA ADMIN / SUPER ADMIN) */}
//                                     {canPublish && (
//                                         <button onClick={() => onPublish(course)} className={`p-2 rounded-lg border transition-colors ${course.isPublished ? 'border-orange-200 text-orange-600 hover:bg-orange-50' : 'border-green-200 text-green-600 hover:bg-green-50'}`} title={course.isPublished ? 'Tarik Kembali' : 'Terbitkan'}>
//                                             <Bell size={14}/>
//                                         </button>
//                                     )}
                                    
//                                     {/* 5. DELETE (Hanya PIC & Admin) */}
//                                     {canManageData && (
//                                         <button onClick={() => onDelete(course._id)} className="p-2 rounded-lg border border-red-200 text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="Hapus Permanen">
//                                             <Trash2 size={14}/>
//                                         </button>
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
import { Edit, Trash2, CheckCircle, Bell, FileClock, Settings, AlertCircle } from 'lucide-react';
import { getImageUrl } from '@/lib/api'; 

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
    if (courses.length === 0) {
        return (
            <div className="p-12 text-center flex flex-col items-center justify-center text-gray-400 bg-white border-b border-gray-100">
                <AlertCircle size={48} className="mb-2 opacity-20"/>
                <span className="italic">Belum ada data pelatihan.</span>
            </div>
        );
    }

    return (
        <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase tracking-wider text-[10px]">
                <tr>
                    <th className="p-4 font-bold">Cover</th>
                    <th className="p-4 font-bold">Info Pelatihan</th>
                    <th className="p-4 font-bold text-center">Tipe Program</th>
                    <th className="p-4 font-bold text-center">Harga</th>
                    <th className="p-4 font-bold text-center">Status</th>
                    <th className="p-4 font-bold text-center">Aksi</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 bg-white">
                {courses.map(course => {
                    // =================================================================
                    // LOGIKA HAK AKSES (FINAL FIX & DEBUG)
                    // =================================================================

                    // 1. Ambil ID User Login dengan aman
                    // Beberapa sistem auth menyimpan di .id, mongo di ._id
                    const myId = String(currentUser?.id || currentUser?._id || '');

                    // 2. Cek Super Admin / Admin Operasional (Level Dewa)
                    const isSuperUser = currentUser?.role === 'SUPER_ADMIN' || currentUser?.permissions?.includes('manage_courses');

                    // 3. Cek Creator (Pembuat Utama)
                    const creatorIdRaw = course.creatorInfo?._id || course.creatorInfo?.id || course.creatorInfo;
                    const isMainCreator = String(creatorIdRaw) === myId;

                    // 4. Cek PIC Tambahan (Array)
                    // Kita pastikan picIds ada dan berupa array
                    const picList = Array.isArray(course.picIds) ? course.picIds : [];
                    
                    const isAdditionalPIC = picList.some((pic: any) => {
                        // Handle jika pic adalah Object (Populated) atau String ID biasa
                        const picIdRaw = pic?._id || pic?.id || pic; 
                        return String(picIdRaw) === myId;
                    });

                    // 5. Kesimpulan: Apakah User ini "Pemilik"?
                    const isOwner = isMainCreator || isAdditionalPIC;

                    // --- DEBUGGING LOG (Lihat di Console Browser: F12) ---
                    // console.log(`Course: ${course.title}`, { 
                    //    myId, 
                    //    isSuperUser, 
                    //    isMainCreator, 
                    //    isAdditionalPIC, 
                    //    picListLength: picList.length 
                    // });

                    // =================================================================
                    // KONFIGURASI TOMBOL
                    // =================================================================
                    
                    // Full Akses: (Edit, Delete, History) -> Hanya untuk Admin & Owner (PIC)
                    const canManageData = isSuperUser || isOwner;

                    // Konten Akses: (Editor Materi) -> Semua yang bisa lihat row ini
                    const canEditContent = true; 

                    // Publish Akses: (Terbitkan) -> Hanya Admin
                    const canPublish = isSuperUser; 

                    return (
                        <tr key={course._id} className="hover:bg-gray-50/50 transition-colors group">
                            <td className="p-4 w-24 align-middle">
                                <div className="w-20 h-14 bg-gray-200 rounded-lg overflow-hidden border border-gray-100 shadow-sm relative">
                                    {course.thumbnailUrl ? (
                                        <img 
                                            src={getImageUrl(course.thumbnailUrl)} 
                                            alt={course.title} 
                                            className="w-full h-full object-cover"
                                            onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/150?text=No+Image'; }}
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-gray-400"><span className="text-[10px]">No Img</span></div>
                                    )}
                                </div>
                            </td>

                            <td className="p-4 align-middle">
                                <h3 className="font-bold text-gray-900 mb-1 line-clamp-1" title={course.title}>{course.title}</h3>
                                <div className="text-xs text-blue-600 font-medium mb-2">{course.organizer || 'PMI PUSAT'}</div>
                                <div className="flex gap-2">
                                    <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded border border-gray-200 flex items-center gap-1">
                                        {course.modules?.length || 0} Modul
                                    </span>
                                </div>
                            </td>

                            <td className="p-4 text-center align-middle">
                                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${course.programType === 'training' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-purple-50 text-purple-700 border-purple-100'}`}>
                                    {course.programType === 'training' ? 'Diklat' : 'Kursus'}
                                </span>
                            </td>

                            <td className="p-4 text-center align-middle font-bold text-green-600 text-xs">
                                {course.price === 0 ? 'Gratis' : `Rp ${course.price.toLocaleString()}`}
                            </td>

                            <td className="p-4 text-center align-middle">
                                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${course.isPublished || course.status === 'published' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                                    {course.isPublished || course.status === 'published' ? <><CheckCircle size={10}/> TERBIT</> : <><Edit size={10}/> DRAFT</>}
                                </div>
                            </td>

                            <td className="p-4 align-middle">
                                <div className="flex justify-center gap-2 items-center">
                                    
                                    {/* 1. EDIT INFO DASAR (Hanya PIC & Admin) */}
                                    {canManageData && (
                                        <button onClick={() => onEdit(course)} className="p-2 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors" title="Edit Informasi Dasar">
                                            <Edit size={14}/>
                                        </button>
                                    )}
                                    
                                    {/* 2. EDITOR MATERI (Semua) */}
                                    {canEditContent && (
                                        <Link 
                                            href={`/admin/courses/${course._id}`} 
                                            className="p-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
                                            title="Kelola Kurikulum & Materi (Editor)"
                                        >
                                            <Settings size={14}/>
                                        </Link>
                                    )}

                                    {/* 3. HISTORI (Hanya PIC & Admin) */}
                                    {canManageData && (
                                        <button onClick={() => onViewHistory(course)} className="p-2 rounded-lg border border-purple-200 text-purple-600 hover:bg-purple-50 transition-colors" title="Lihat Histori Pengajuan">
                                            <FileClock size={14}/>
                                        </button>
                                    )}
                                    
                                    {/* 4. PUBLISH (HANYA ADMIN / SUPER ADMIN) */}
                                    {canPublish && (
                                        <button onClick={() => onPublish(course)} className={`p-2 rounded-lg border transition-colors ${course.isPublished ? 'border-orange-200 text-orange-600 hover:bg-orange-50' : 'border-green-200 text-green-600 hover:bg-green-50'}`} title={course.isPublished ? 'Tarik Kembali' : 'Terbitkan'}>
                                            <Bell size={14}/>
                                        </button>
                                    )}
                                    
                                    {/* 5. DELETE (Hanya PIC & Admin) */}
                                    {canManageData && (
                                        <button onClick={() => onDelete(course._id)} className="p-2 rounded-lg border border-red-200 text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="Hapus Permanen">
                                            <Trash2 size={14}/>
                                        </button>
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
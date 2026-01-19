// // // // 'use client';

// // // // import { CheckCircle, User, Clock, Eye, XCircle } from 'lucide-react';

// // // // interface ProposalTableProps {
// // // //     courses: any[];
// // // //     onApprove: (course: any) => void;
// // // //     onReject: (id: string) => void;
// // // //     onViewDetail: (course: any) => void; // [BARU] Prop untuk view detail
// // // // }

// // // // export default function ProposalTable({ courses, onApprove, onReject, onViewDetail }: ProposalTableProps) {
// // // //     if (courses.length === 0) {
// // // //         return <div className="p-12 text-center text-gray-400 italic bg-white border-b border-gray-100">Tidak ada pengajuan baru saat ini.</div>;
// // // //     }

// // // //     return (
// // // //         <table className="w-full text-left text-sm">
// // // //             <thead className="bg-orange-50 border-b border-orange-100 text-orange-800 uppercase tracking-wider text-[10px]">
// // // //                 <tr>
// // // //                     <th className="p-4 font-bold">Judul Pengajuan</th>
// // // //                     <th className="p-4 font-bold">Pengaju</th>
// // // //                     <th className="p-4 font-bold text-center">Tipe</th>
// // // //                     <th className="p-4 font-bold text-center">Tanggal</th>
// // // //                     <th className="p-4 font-bold text-center">Aksi</th>
// // // //                 </tr>
// // // //             </thead>
// // // //             <tbody className="divide-y divide-gray-50 bg-white">
// // // //                 {courses.map(course => (
// // // //                     <tr key={course._id} className="hover:bg-orange-50/30 transition-colors">
// // // //                         <td className="p-4 align-middle">
// // // //                             <div className="font-bold text-gray-800 text-base">{course.title}</div>
// // // //                             <div className="flex items-center gap-1 mt-1 text-[11px] text-orange-600 font-medium">
// // // //                                 <Clock size={12}/> Menunggu Persetujuan
// // // //                             </div>
// // // //                         </td>
// // // //                         <td className="p-4 align-middle">
// // // //                             <div className="flex items-center gap-3">
// // // //                                 <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 border border-gray-200">
// // // //                                     <User size={14}/>
// // // //                                 </div>
// // // //                                 <div className="text-xs">
// // // //                                     <div className="font-bold text-gray-700">{course.creatorInfo?.name || 'User'}</div>
// // // //                                     <div className="text-gray-400">{course.creatorInfo?.email}</div>
// // // //                                 </div>
// // // //                             </div>
// // // //                         </td>
// // // //                         <td className="p-4 align-middle text-center">
// // // //                             <span className={`px-2 py-1 rounded text-[10px] border font-bold ${course.programType==='training'?'bg-blue-50 text-blue-700 border-blue-200':'bg-purple-50 text-purple-700 border-purple-200'}`}>
// // // //                                 {course.programType === 'training' ? 'Diklat' : 'Kursus'}
// // // //                             </span>
// // // //                         </td>
// // // //                         <td className="p-4 align-middle text-center text-xs text-gray-500">
// // // //                             {new Date(course.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
// // // //                         </td>
// // // //                         <td className="p-4 align-middle text-center">
// // // //                             <div className="flex justify-center gap-2">
// // // //                                 {/* Tombol Lihat Detail (Mata) */}
// // // //                                 <button onClick={() => onViewDetail(course)} className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors" title="Lihat Detail & Dokumen">
// // // //                                     <Eye size={16}/>
// // // //                                 </button>
                                
// // // //                                 <button onClick={() => onReject(course._id)} className="p-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors" title="Tolak">
// // // //                                     <XCircle size={16}/>
// // // //                                 </button>
                                
// // // //                                 <button onClick={() => onApprove(course)} className="px-3 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700 text-xs font-bold shadow-sm transition-colors flex items-center gap-1">
// // // //                                     <CheckCircle size={14}/> Setujui
// // // //                                 </button>
// // // //                             </div>
// // // //                         </td>
// // // //                     </tr>
// // // //                 ))}
// // // //             </tbody>
// // // //         </table>
// // // //     );
// // // // }


// // // 'use client';

// // // import { CheckCircle, User, Clock, Eye, Undo2 } from 'lucide-react'; // Ganti XCircle dengan Undo2

// // // interface ProposalTableProps {
// // //     courses: any[];
// // //     onApprove: (course: any) => void;
// // //     onReject: (course: any) => void; // Ubah signature menerima object course
// // //     onViewDetail: (course: any) => void; 
// // // }

// // // export default function ProposalTable({ courses, onApprove, onReject, onViewDetail }: ProposalTableProps) {
// // //     if (courses.length === 0) {
// // //         return <div className="p-12 text-center text-gray-400 italic bg-white border-b border-gray-100">Belum ada pengajuan baru yang masuk.</div>;
// // //     }

// // //     return (
// // //         <table className="w-full text-left text-sm">
// // //             <thead className="bg-orange-50 border-b border-orange-100 text-orange-800 uppercase tracking-wider text-[10px]">
// // //                 <tr>
// // //                     <th className="p-4 font-bold">Judul Pengajuan</th>
// // //                     <th className="p-4 font-bold">Pengaju</th>
// // //                     <th className="p-4 font-bold text-center">Tipe Program</th>
// // //                     <th className="p-4 font-bold text-center">Tanggal</th>
// // //                     <th className="p-4 font-bold text-center">Aksi / Keputusan</th>
// // //                 </tr>
// // //             </thead>
// // //             <tbody className="divide-y divide-gray-50 bg-white">
// // //                 {courses.map(course => (
// // //                     <tr key={course._id} className="hover:bg-orange-50/30 transition-colors">
// // //                         <td className="p-4 align-middle">
// // //                             <div className="font-bold text-gray-800 text-base line-clamp-2">{course.title}</div>
// // //                             <div className="flex items-center gap-1 mt-1 text-[11px] text-orange-600 font-medium">
// // //                                 <Clock size={12}/> Menunggu Review
// // //                             </div>
// // //                         </td>
// // //                         <td className="p-4 align-middle">
// // //                             <div className="flex items-center gap-3">
// // //                                 <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 border border-gray-200">
// // //                                     <User size={14}/>
// // //                                 </div>
// // //                                 <div className="text-xs">
// // //                                     <div className="font-bold text-gray-700">{course.creatorInfo?.name || 'User'}</div>
// // //                                     <div className="text-gray-400">{course.creatorInfo?.email}</div>
// // //                                 </div>
// // //                             </div>
// // //                         </td>
// // //                         <td className="p-4 align-middle text-center">
// // //                             <span className={`px-2 py-1 rounded text-[10px] border font-bold uppercase ${course.programType==='training'?'bg-blue-50 text-blue-700 border-blue-200':'bg-purple-50 text-purple-700 border-purple-200'}`}>
// // //                                 {course.programType === 'training' ? 'Diklat' : 'Kursus'}
// // //                             </span>
// // //                         </td>
// // //                         <td className="p-4 align-middle text-center text-xs text-gray-500">
// // //                             {new Date(course.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
// // //                         </td>
// // //                         <td className="p-4 align-middle text-center">
// // //                             <div className="flex justify-center gap-2">
// // //                                 <button 
// // //                                     onClick={() => onViewDetail(course)} 
// // //                                     className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 border border-gray-200 transition-colors" 
// // //                                     title="Lihat Detail & Dokumen"
// // //                                     aria-label="Lihat Detail"
// // //                                 >
// // //                                     <Eye size={16}/>
// // //                                 </button>
                                
// // //                                 {/* Tombol Kembalikan (Revisi) */}
// // //                                 <button 
// // //                                     onClick={() => onReject(course)} 
// // //                                     className="p-2 rounded-lg border border-yellow-200 text-yellow-700 hover:bg-yellow-50 transition-colors" 
// // //                                     title="Kembalikan untuk Revisi"
// // //                                     aria-label="Kembalikan"
// // //                                 >
// // //                                     <Undo2 size={16}/>
// // //                                 </button>
                                
// // //                                 <button 
// // //                                     onClick={() => onApprove(course)} 
// // //                                     className="px-3 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700 text-xs font-bold shadow-sm transition-colors flex items-center gap-1"
// // //                                     title="Setujui Pengajuan"
// // //                                     aria-label="Setujui"
// // //                                 >
// // //                                     <CheckCircle size={14}/> Setujui
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

// // import { CheckCircle, User, Clock, Eye, Undo2, BellRing, MessageCircle } from 'lucide-react';

// // interface ProposalTableProps {
// //     courses: any[];
// //     onApprove: (course: any) => void;
// //     onReject: (course: any) => void; 
// //     onViewDetail: (course: any) => void;
    
// //     // [FIX] Definisi Type ditambahkan agar tidak error di page.tsx
// //     currentUser: any; 
// //     onRemind?: (course: any) => void; 
// // }

// // export default function ProposalTable({ 
// //     courses, 
// //     onApprove, 
// //     onReject, 
// //     onViewDetail, 
// //     onRemind,
// //     currentUser 
// // }: ProposalTableProps) {

// //     if (courses.length === 0) {
// //         return <div className="p-12 text-center text-gray-400 italic bg-white border-b border-gray-100">Belum ada pengajuan baru yang masuk.</div>;
// //     }

// //     // Cek apakah user adalah Admin/Super Admin
// //     const isDecisionMaker = ['ADMIN', 'SUPER_ADMIN'].includes(currentUser?.role);

// //     return (
// //         <table className="w-full text-left text-sm">
// //             <thead className="bg-orange-50 border-b border-orange-100 text-orange-800 uppercase tracking-wider text-[10px]">
// //                 <tr>
// //                     <th className="p-4 font-bold">Judul Pengajuan</th>
// //                     <th className="p-4 font-bold">Pengaju</th>
// //                     <th className="p-4 font-bold text-center">Tipe Program</th>
// //                     <th className="p-4 font-bold text-center">Tanggal</th>
// //                     <th className="p-4 font-bold text-center">Aksi / Keputusan</th>
// //                 </tr>
// //             </thead>
// //             <tbody className="divide-y divide-gray-50 bg-white">
// //                 {courses.map(course => {
// //                     // Cek kepemilikan
// //                     const isMyProposal = course.creatorInfo?.id === currentUser?.id || course.creatorInfo?._id === currentUser?.id;

// //                     return (
// //                         <tr key={course._id} className={`hover:bg-orange-50/30 transition-colors ${isMyProposal ? 'bg-blue-50/30' : ''}`}>
// //                             <td className="p-4 align-middle">
// //                                 <div className="font-bold text-gray-800 text-base line-clamp-2">{course.title}</div>
// //                                 <div className="flex items-center gap-1 mt-1 text-[11px] text-orange-600 font-medium">
// //                                     <Clock size={12}/> Menunggu Review
// //                                     {isMyProposal && <span className="ml-2 text-blue-600">(Milik Saya)</span>}
// //                                 </div>
// //                             </td>
// //                             <td className="p-4 align-middle">
// //                                 <div className="flex items-center gap-3">
// //                                     <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 border border-gray-200">
// //                                         <User size={14}/>
// //                                     </div>
// //                                     <div className="text-xs">
// //                                         <div className="font-bold text-gray-700">{course.creatorInfo?.name || 'User'}</div>
// //                                         <div className="text-gray-400">{course.creatorInfo?.email}</div>
// //                                     </div>
// //                                 </div>
// //                             </td>
// //                             <td className="p-4 align-middle text-center">
// //                                 <span className={`px-2 py-1 rounded text-[10px] border font-bold uppercase ${course.programType==='training'?'bg-blue-50 text-blue-700 border-blue-200':'bg-purple-50 text-purple-700 border-purple-200'}`}>
// //                                     {course.programType === 'training' ? 'Diklat' : 'Kursus'}
// //                                 </span>
// //                             </td>
// //                             <td className="p-4 align-middle text-center text-xs text-gray-500">
// //                                 {new Date(course.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
// //                             </td>
// //                             <td className="p-4 align-middle text-center">
// //                                 <div className="flex justify-center gap-2">
                                    
// //                                     {/* 1. TOMBOL LIHAT DETAIL (SEMUA ROLE) */}
// //                                     <button 
// //                                         onClick={() => onViewDetail(course)} 
// //                                         className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 border border-gray-200 transition-colors" 
// //                                         title={isDecisionMaker ? "Review & Putuskan" : "Lihat Detail & Feedback"}
// //                                     >
// //                                         <Eye size={16}/>
// //                                     </button>
                                    
// //                                     {/* 2. AREA KEPUTUSAN (KHUSUS ADMIN) */}
// //                                     {isDecisionMaker ? (
// //                                         <>
// //                                             <button 
// //                                                 onClick={() => onReject(course)} 
// //                                                 className="p-2 rounded-lg border border-yellow-200 text-yellow-700 hover:bg-yellow-50 transition-colors" 
// //                                                 title="Kembalikan untuk Revisi"
// //                                             >
// //                                                 <Undo2 size={16}/>
// //                                             </button>
                                            
// //                                             <button 
// //                                                 onClick={() => onApprove(course)} 
// //                                                 className="px-3 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700 text-xs font-bold shadow-sm transition-colors flex items-center gap-1"
// //                                                 title="Setujui Pengajuan"
// //                                             >
// //                                                 <CheckCircle size={14}/> Setujui
// //                                             </button>
// //                                         </>
// //                                     ) : (
// //                                         // 3. AREA FASILITATOR (REMINDING)
// //                                         <>
// //                                             {onRemind && (
// //                                                 <button 
// //                                                     onClick={() => onRemind(course)}
// //                                                     className="p-2 rounded-lg border border-orange-200 text-orange-600 hover:bg-orange-50 transition-colors"
// //                                                     title="Ingatkan Admin untuk Review"
// //                                                 >
// //                                                     <BellRing size={16}/>
// //                                                 </button>
// //                                             )}
// //                                         </>
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

// import { Eye, Bell, CheckCircle, XCircle, Clock } from 'lucide-react';
// import { getImageUrl, api } from '@/lib/api'; // Pastikan import api benar

// interface ProposalTableProps {
//     courses: any[];
//     onApprove: (course: any) => void;
//     onReject: (course: any) => void;
//     onViewDetail: (course: any) => void;
//     currentUser: any;
//     onRemind?: (course: any) => void; // Optional prop
// }

// export default function ProposalTable({ courses, onApprove, onReject, onViewDetail, currentUser }: ProposalTableProps) {
    
//     // --- LOGIC KIRIM NOTIFIKASI KE ADMIN ---
//     const handleRemindAdmin = async (course: any) => {
//         if(!confirm(`Kirim notifikasi ke Admin untuk segera me-review "${course.title}"?`)) return;

//         try {
//             await api('/api/notifications', {
//                 method: 'POST',
//                 body: {
//                     roleTarget: 'ADMIN', // Flag Broadcast
//                     type: 'course',
//                     message: `📢 ${currentUser?.name || 'Fasilitator'} mengingatkan review untuk: ${course.title}`,
//                     targetUrl: `/admin/courses?highlight=${course._id}`, // Link tujuan Admin
//                     topic: course._id
//                 }
//             });

//             alert(`✅ Pesan terkirim! Admin telah menerima notifikasi.`);
//         } catch (e: any) {
//             console.error(e);
//             alert("Gagal mengirim notifikasi: " + (e.message || "Server Error"));
//         }
//     };

//     if (courses.length === 0) {
//         return <div className="p-8 text-center text-gray-400 italic bg-white rounded-xl border border-gray-200">Belum ada pengajuan masuk.</div>;
//     }

//     return (
//         <table className="w-full text-left text-sm">
//             <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase tracking-wider text-[10px]">
//                 <tr>
//                     <th className="p-4 font-bold">Judul Pengajuan</th>
//                     <th className="p-4 font-bold">Pengaju</th>
//                     <th className="p-4 font-bold text-center">Tipe Program</th>
//                     <th className="p-4 font-bold text-center">Tanggal</th>
//                     <th className="p-4 font-bold text-center">Aksi / Keputusan</th>
//                 </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-50 bg-white">
//                 {courses.map(course => (
//                     <tr key={course._id} className="hover:bg-gray-50/50 transition-colors">
//                         {/* 1. Judul */}
//                         <td className="p-4">
//                             <div className="font-bold text-gray-900 mb-1">{course.title}</div>
//                             <div className="flex items-center gap-1 text-[10px] text-orange-600 font-medium">
//                                 <Clock size={10}/> {course.status === 'revision' ? 'Menunggu Revisi' : 'Menunggu Review'}
//                                 {currentUser?._id === course.creatorInfo?._id && <span className="text-blue-500 ml-1">(Milik Saya)</span>}
//                             </div>
//                         </td>

//                         {/* 2. Pengaju */}
//                         <td className="p-4">
//                             <div className="flex items-center gap-3">
//                                 <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 border border-gray-200">
//                                     {course.creatorInfo?.avatarUrl ? 
//                                         <img 
//     src={getImageUrl(course.creatorInfo.avatarUrl)} 
//     alt={`Avatar ${course.creatorInfo.name}`} // <--- Tambahkan Alt Text Dinamis
//     className="w-full h-full rounded-full object-cover"
// /> : 
//                                         course.creatorInfo?.name?.charAt(0) || 'U'
//                                     }
//                                 </div>
//                                 <div>
//                                     <div className="font-bold text-xs text-gray-800">{course.creatorInfo?.name || 'Unknown'}</div>
//                                     <div className="text-[10px] text-gray-400">{course.creatorInfo?.email}</div>
//                                 </div>
//                             </div>
//                         </td>

//                         {/* 3. Tipe */}
//                         <td className="p-4 text-center">
//                             <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${course.programType === 'training' ? 'bg-purple-50 text-purple-700 border-purple-100' : 'bg-blue-50 text-blue-700 border-blue-100'}`}>
//                                 {course.programType === 'training' ? 'Diklat' : 'Kursus'}
//                             </span>
//                         </td>

//                         {/* 4. Tanggal */}
//                         <td className="p-4 text-center text-xs text-gray-500">
//                             {new Date(course.createdAt).toLocaleDateString('id-ID', {day: 'numeric', month: 'short', year: 'numeric'})}
//                         </td>

//                         {/* 5. Aksi */}
//                         <td className="p-4 text-center">
//                             <div className="flex justify-center items-center gap-2">
//                                 {/* Tombol Detail (Mata) */}
//                                 <button onClick={() => onViewDetail(course)} className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors" title="Lihat Detail & Chat">
//                                     <Eye size={16}/>
//                                 </button>

//                                 {/* Tombol Lonceng (Hanya muncul jika user adalah Pembuat/Fasilitator, bukan Admin) */}
//                                 {/* Logic: Jika saya bukan admin, saya ingin ingatkan admin */}
//                                 {!['ADMIN', 'SUPER_ADMIN'].includes(currentUser?.role) && (
//                                     <button 
//                                         onClick={() => handleRemindAdmin(course)} 
//                                         className="p-2 rounded-lg border border-orange-200 text-orange-600 hover:bg-orange-50 transition-colors" 
//                                         title="Ingatkan Admin untuk Review"
//                                     >
//                                         <Bell size={16}/>
//                                     </button>
//                                 )}

//                                 {/* Tombol Approve/Reject (Hanya Admin) */}
//                                 {['ADMIN', 'SUPER_ADMIN'].includes(currentUser?.role) && (
//                                     <>
//                                         <button onClick={() => onReject(course)} className="p-2 rounded-lg border border-yellow-200 text-yellow-700 hover:bg-yellow-50 transition-colors" title="Kembalikan (Revisi)">
//                                             <XCircle size={16}/>
//                                         </button>
//                                         <button onClick={() => onApprove(course)} className="px-3 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 font-bold text-xs flex items-center gap-1 shadow-sm transition-colors" title="Setujui">
//                                             <CheckCircle size={14}/> Setujui
//                                         </button>
//                                     </>
//                                 )}
//                             </div>
//                         </td>
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//     );
// }


'use client';

import { useState, useEffect } from 'react';
import { Eye, Bell, CheckCircle, XCircle, Clock } from 'lucide-react';
import { getImageUrl, api } from '@/lib/api';

interface ProposalTableProps {
    courses: any[];
    onApprove: (course: any) => void;
    onReject: (course: any) => void;
    onViewDetail: (course: any) => void;
    currentUser: any;
}

export default function ProposalTable({ courses, onApprove, onReject, onViewDetail, currentUser }: ProposalTableProps) {
    const [unreadTopics, setUnreadTopics] = useState<Set<string>>(new Set());
    const isAdminOrSuper = currentUser && ['ADMIN', 'SUPER_ADMIN'].includes(currentUser.role);

    // Polling Badge Mata setiap 5 Detik
    useEffect(() => {
        const fetchUnreadTopics = async () => {
            const userStr = localStorage.getItem('user');
            if (!userStr) return;

            try {
                // Returns list of course IDs that have unread notifications for this user
                const res = await api('/api/notifications/unread-topics');
                if (res.topics) {
                    setUnreadTopics(new Set(res.topics));
                }
            } catch (e) { /* Silent fail */ }
        };

        fetchUnreadTopics();
        const interval = setInterval(fetchUnreadTopics, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleRemindAdmin = async (course: any) => {
        if(!confirm(`Kirim pengingat ke Admin?`)) return;
        try {
            await api('/api/notifications', {
                method: 'POST',
                body: {
                    roleTarget: 'ADMIN',
                    type: 'course',
                    message: `📢 ${currentUser?.name} mengingatkan review untuk: "${course.title}".`,
                    targetUrl: `/admin/courses?highlight=${course._id}`,
                    topic: course._id
                }
            });
            alert("🔔 Pengingat terkirim!");
        } catch (e: any) { alert("Gagal: " + e.message); }
    };

    const handleApproveWithNotif = async (course: any) => {
        if(!confirm(`Setujui pelatihan "${course.title}"?`)) return;
        try {
            await onApprove(course);
            if (course.creatorInfo?._id || course.creatorInfo?.id) {
                await api('/api/notifications', {
                    method: 'POST',
                    body: {
                        recipient: course.creatorInfo._id || course.creatorInfo.id,
                        type: 'system',
                        message: `🎉 Pengajuan "${course.title}" telah DISETUJUI oleh Admin.`,
                        targetUrl: `/admin/courses?highlight=${course._id}`,
                        topic: course._id
                    }
                });
            }
        } catch (e) { console.error(e); }
    };

    if (courses.length === 0) return <div className="p-8 text-center text-gray-400 italic bg-white rounded-xl border border-gray-200">Belum ada pengajuan.</div>;

    return (
        <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase tracking-wider text-[10px]">
                <tr>
                    <th className="p-4 font-bold">Judul Pengajuan</th>
                    <th className="p-4 font-bold">Pengaju</th>
                    <th className="p-4 font-bold text-center">Tipe</th>
                    <th className="p-4 font-bold text-center">Tanggal</th>
                    <th className="p-4 font-bold text-center">Aksi</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 bg-white">
                {courses.map(course => (
                    <tr key={course._id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="p-4">
                            <div className="font-bold text-gray-900 mb-1">{course.title}</div>
                            <div className="flex items-center gap-1 text-[10px] text-orange-600 font-medium">
                                <Clock size={10}/> {course.status === 'revision' ? 'Menunggu Revisi' : 'Menunggu Review'}
                                {currentUser?._id === course.creatorInfo?._id && <span className="text-blue-500 ml-1">(Milik Saya)</span>}
                            </div>
                        </td>
                        <td className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 border border-gray-200 overflow-hidden">
                                    {course.creatorInfo?.avatarUrl ? <img src={getImageUrl(course.creatorInfo.avatarUrl)} alt="Avatar" className="w-full h-full object-cover"/> : <span className="text-xs font-bold">{course.creatorInfo?.name?.charAt(0) || 'U'}</span>}
                                </div>
                                <div>
                                    <div className="font-bold text-xs text-gray-800">{course.creatorInfo?.name || 'Unknown'}</div>
                                    <div className="text-[10px] text-gray-400">{course.creatorInfo?.email}</div>
                                </div>
                            </div>
                        </td>
                        <td className="p-4 text-center">
                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${course.programType === 'training' ? 'bg-purple-50 text-purple-700 border-purple-100' : 'bg-blue-50 text-blue-700 border-blue-100'}`}>{course.programType === 'training' ? 'Diklat' : 'Kursus'}</span>
                        </td>
                        <td className="p-4 text-center text-xs text-gray-500">{new Date(course.createdAt).toLocaleDateString('id-ID', {day: 'numeric', month: 'short', year: 'numeric'})}</td>
                        <td className="p-4 text-center">
                            <div className="flex justify-center items-center gap-2">
                                <button
                                    onClick={() => onViewDetail(course)}
                                    className="relative p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors group"
                                    title="Lihat Detail"
                                    aria-label="Lihat Detail"
                                >
                                    <Eye size={16}/>
                                    {/* BADGE LOGIC */}
                                    {unreadTopics.has(course._id) && (
                                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-white rounded-full animate-pulse"></span>
                                    )}
                                </button>

                                {!isAdminOrSuper && (
                                    <button onClick={() => handleRemindAdmin(course)} className="p-2 rounded-lg border border-orange-200 text-orange-600 hover:bg-orange-50 transition-colors" title="Ingatkan Admin" aria-label="Ingatkan Admin"><Bell size={16}/></button>
                                )}

                                {isAdminOrSuper && (
                                    <>
                                        <button onClick={() => onReject(course)} className="p-2 rounded-lg border border-yellow-200 text-yellow-700 hover:bg-yellow-50 transition-colors" title="Kembalikan" aria-label="Kembalikan"><XCircle size={16}/></button>
                                        <button onClick={() => handleApproveWithNotif(course)} className="px-3 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 font-bold text-xs flex items-center gap-1 shadow-sm" title="Setujui" aria-label="Setujui"><CheckCircle size={14}/> Setujui</button>
                                    </>
                                )}
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
// 'use client';

// import { CheckCircle, User, Clock, Eye, XCircle } from 'lucide-react';

// interface ProposalTableProps {
//     courses: any[];
//     onApprove: (course: any) => void;
//     onReject: (id: string) => void;
//     onViewDetail: (course: any) => void; // [BARU] Prop untuk view detail
// }

// export default function ProposalTable({ courses, onApprove, onReject, onViewDetail }: ProposalTableProps) {
//     if (courses.length === 0) {
//         return <div className="p-12 text-center text-gray-400 italic bg-white border-b border-gray-100">Tidak ada pengajuan baru saat ini.</div>;
//     }

//     return (
//         <table className="w-full text-left text-sm">
//             <thead className="bg-orange-50 border-b border-orange-100 text-orange-800 uppercase tracking-wider text-[10px]">
//                 <tr>
//                     <th className="p-4 font-bold">Judul Pengajuan</th>
//                     <th className="p-4 font-bold">Pengaju</th>
//                     <th className="p-4 font-bold text-center">Tipe</th>
//                     <th className="p-4 font-bold text-center">Tanggal</th>
//                     <th className="p-4 font-bold text-center">Aksi</th>
//                 </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-50 bg-white">
//                 {courses.map(course => (
//                     <tr key={course._id} className="hover:bg-orange-50/30 transition-colors">
//                         <td className="p-4 align-middle">
//                             <div className="font-bold text-gray-800 text-base">{course.title}</div>
//                             <div className="flex items-center gap-1 mt-1 text-[11px] text-orange-600 font-medium">
//                                 <Clock size={12}/> Menunggu Persetujuan
//                             </div>
//                         </td>
//                         <td className="p-4 align-middle">
//                             <div className="flex items-center gap-3">
//                                 <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 border border-gray-200">
//                                     <User size={14}/>
//                                 </div>
//                                 <div className="text-xs">
//                                     <div className="font-bold text-gray-700">{course.creatorInfo?.name || 'User'}</div>
//                                     <div className="text-gray-400">{course.creatorInfo?.email}</div>
//                                 </div>
//                             </div>
//                         </td>
//                         <td className="p-4 align-middle text-center">
//                             <span className={`px-2 py-1 rounded text-[10px] border font-bold ${course.programType==='training'?'bg-blue-50 text-blue-700 border-blue-200':'bg-purple-50 text-purple-700 border-purple-200'}`}>
//                                 {course.programType === 'training' ? 'Diklat' : 'Kursus'}
//                             </span>
//                         </td>
//                         <td className="p-4 align-middle text-center text-xs text-gray-500">
//                             {new Date(course.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
//                         </td>
//                         <td className="p-4 align-middle text-center">
//                             <div className="flex justify-center gap-2">
//                                 {/* Tombol Lihat Detail (Mata) */}
//                                 <button onClick={() => onViewDetail(course)} className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors" title="Lihat Detail & Dokumen">
//                                     <Eye size={16}/>
//                                 </button>
                                
//                                 <button onClick={() => onReject(course._id)} className="p-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors" title="Tolak">
//                                     <XCircle size={16}/>
//                                 </button>
                                
//                                 <button onClick={() => onApprove(course)} className="px-3 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700 text-xs font-bold shadow-sm transition-colors flex items-center gap-1">
//                                     <CheckCircle size={14}/> Setujui
//                                 </button>
//                             </div>
//                         </td>
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//     );
// }


'use client';

import { CheckCircle, User, Clock, Eye, Undo2 } from 'lucide-react'; // Ganti XCircle dengan Undo2

interface ProposalTableProps {
    courses: any[];
    onApprove: (course: any) => void;
    onReject: (course: any) => void; // Ubah signature menerima object course
    onViewDetail: (course: any) => void; 
}

export default function ProposalTable({ courses, onApprove, onReject, onViewDetail }: ProposalTableProps) {
    if (courses.length === 0) {
        return <div className="p-12 text-center text-gray-400 italic bg-white border-b border-gray-100">Belum ada pengajuan baru yang masuk.</div>;
    }

    return (
        <table className="w-full text-left text-sm">
            <thead className="bg-orange-50 border-b border-orange-100 text-orange-800 uppercase tracking-wider text-[10px]">
                <tr>
                    <th className="p-4 font-bold">Judul Pengajuan</th>
                    <th className="p-4 font-bold">Pengaju</th>
                    <th className="p-4 font-bold text-center">Tipe Program</th>
                    <th className="p-4 font-bold text-center">Tanggal</th>
                    <th className="p-4 font-bold text-center">Aksi / Keputusan</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 bg-white">
                {courses.map(course => (
                    <tr key={course._id} className="hover:bg-orange-50/30 transition-colors">
                        <td className="p-4 align-middle">
                            <div className="font-bold text-gray-800 text-base line-clamp-2">{course.title}</div>
                            <div className="flex items-center gap-1 mt-1 text-[11px] text-orange-600 font-medium">
                                <Clock size={12}/> Menunggu Review
                            </div>
                        </td>
                        <td className="p-4 align-middle">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 border border-gray-200">
                                    <User size={14}/>
                                </div>
                                <div className="text-xs">
                                    <div className="font-bold text-gray-700">{course.creatorInfo?.name || 'User'}</div>
                                    <div className="text-gray-400">{course.creatorInfo?.email}</div>
                                </div>
                            </div>
                        </td>
                        <td className="p-4 align-middle text-center">
                            <span className={`px-2 py-1 rounded text-[10px] border font-bold uppercase ${course.programType==='training'?'bg-blue-50 text-blue-700 border-blue-200':'bg-purple-50 text-purple-700 border-purple-200'}`}>
                                {course.programType === 'training' ? 'Diklat' : 'Kursus'}
                            </span>
                        </td>
                        <td className="p-4 align-middle text-center text-xs text-gray-500">
                            {new Date(course.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </td>
                        <td className="p-4 align-middle text-center">
                            <div className="flex justify-center gap-2">
                                <button 
                                    onClick={() => onViewDetail(course)} 
                                    className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 border border-gray-200 transition-colors" 
                                    title="Lihat Detail & Dokumen"
                                    aria-label="Lihat Detail"
                                >
                                    <Eye size={16}/>
                                </button>
                                
                                {/* Tombol Kembalikan (Revisi) */}
                                <button 
                                    onClick={() => onReject(course)} 
                                    className="p-2 rounded-lg border border-yellow-200 text-yellow-700 hover:bg-yellow-50 transition-colors" 
                                    title="Kembalikan untuk Revisi"
                                    aria-label="Kembalikan"
                                >
                                    <Undo2 size={16}/>
                                </button>
                                
                                <button 
                                    onClick={() => onApprove(course)} 
                                    className="px-3 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700 text-xs font-bold shadow-sm transition-colors flex items-center gap-1"
                                    title="Setujui Pengajuan"
                                    aria-label="Setujui"
                                >
                                    <CheckCircle size={14}/> Setujui
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
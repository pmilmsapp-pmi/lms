'use client';

import { CheckCircle, User, Clock } from 'lucide-react';

interface ProposalTableProps {
    courses: any[];
    onApprove: (course: any) => void;
    onReject: (id: string) => void;
}

export default function ProposalTable({ courses, onApprove, onReject }: ProposalTableProps) {
    if (courses.length === 0) {
        return <div className="p-8 text-center text-gray-400 italic bg-white border border-dashed border-gray-200 rounded-xl">Belum ada pengajuan baru.</div>;
    }

    return (
        <table className="w-full text-left text-sm">
            <thead className="bg-orange-50 border-b border-orange-100 text-orange-800 uppercase tracking-wider text-[10px]">
                <tr>
                    <th className="p-4 font-bold">Judul Pengajuan</th>
                    <th className="p-4 font-bold">Pengaju</th>
                    <th className="p-4 font-bold text-center">Tipe</th>
                    <th className="p-4 font-bold text-center">Tanggal</th>
                    <th className="p-4 font-bold text-center">Aksi Persetujuan</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
                {courses.map(course => (
                    <tr key={course._id} className="hover:bg-gray-50/50">
                        <td className="p-4 align-middle font-bold text-gray-800">
                            {course.title}
                            <div className="flex items-center gap-1 mt-1 text-[10px] text-orange-600 font-normal">
                                <Clock size={10}/> Menunggu Persetujuan
                            </div>
                        </td>
                        <td className="p-4 align-middle">
                            <div className="flex items-center gap-2">
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
                            <span className={`px-2 py-1 rounded text-[10px] border font-bold ${course.programType==='training'?'bg-blue-50 text-blue-700 border-blue-200':'bg-purple-50 text-purple-700 border-purple-200'}`}>
                                {course.programType === 'training' ? 'Diklat' : 'Kursus'}
                            </span>
                        </td>
                        <td className="p-4 align-middle text-center text-xs text-gray-500">
                            {new Date(course.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </td>
                        <td className="p-4 align-middle text-center">
                            <div className="flex justify-center gap-2">
                                <button onClick={() => onReject(course._id)} className="px-3 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold transition-colors">
                                    Tolak
                                </button>
                                <button onClick={() => onApprove(course)} className="px-3 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700 text-xs font-bold shadow-sm transition-colors flex items-center gap-1">
                                    <CheckCircle size={12}/> Setujui & Proses
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
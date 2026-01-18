'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
    Edit3, Trash2, BookOpen, MoreHorizontal, Building, 
    Image as ImageIcon, CheckCircle, Settings, Eye, Copy, XCircle, Bell
} from 'lucide-react';
import { getImageUrl } from '@/lib/api';

interface ManagementTableProps {
    courses: any[];
    onEdit: (course: any) => void;
    onDelete: (id: string) => void;
    onPublish: (course: any) => void;
    onBroadcast: (course: any) => void; // Prop Baru
    currentUser: any;
}

export default function ManagementTable({ courses, onEdit, onDelete, onPublish, onBroadcast, currentUser }: ManagementTableProps) {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setActiveMenu(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (courses.length === 0) {
        return <div className="p-8 text-center text-gray-400 italic bg-white border border-dashed border-gray-200 rounded-xl">Belum ada pelatihan aktif. Silakan setujui pengajuan di tab sebelah.</div>;
    }

    return (
        <div className="overflow-visible">
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
                <tbody className="divide-y divide-gray-50">
                    {courses.map(course => (
                        <tr key={course._id} className="hover:bg-gray-50/50 transition-colors">
                            {/* 1. COVER */}
                            <td className="p-4 w-32">
                                <div className="w-24 h-16 rounded-lg bg-gray-100 overflow-hidden relative border border-gray-200">
                                    {course.thumbnailUrl ? (
                                        <img src={getImageUrl(course.thumbnailUrl)} className="w-full h-full object-cover" alt="Cover"/>
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-gray-300"><ImageIcon size={20}/></div>
                                    )}
                                </div>
                            </td>

                            {/* 2. INFO PELATIHAN (Format Lama: Judul, Pelaksana, Modul) */}
                            <td className="p-4 align-top">
                                <Link href={`/admin/courses/${course._id}`} className="font-bold text-gray-900 text-base line-clamp-2 hover:text-red-700 transition-colors" aria-label={`Detail ${course.title}`}>
                                    {course.title}
                                </Link>
                                
                                <div className="text-[11px] text-blue-600 font-bold mt-1.5 mb-1.5 uppercase tracking-wider flex items-center gap-1">
                                    <Building size={12}/>
                                    {course.organizer || 'PMI Pusat'}
                                </div>

                                <div className="flex gap-2 mt-1">
                                    <span className="text-[10px] px-2 py-0.5 rounded border bg-gray-100 text-gray-600 border-gray-200 flex items-center gap-1"><BookOpen size={10}/> {course.modules?.length || 0} Modul</span>
                                </div>
                            </td>

                            {/* 3. TIPE PROGRAM (Format Lama: Badge) */}
                            <td className="p-4 text-center align-middle">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${course.programType === 'training' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-purple-50 text-purple-700 border-purple-100'}`}>
                                    {course.programType === 'training' ? 'Diklat' : 'Kursus'}
                                </span>
                            </td>

                            {/* 4. HARGA */}
                            <td className="p-4 text-center align-middle font-bold text-green-600">
                                {course.price === 0 ? 'Gratis' : `Rp ${course.price.toLocaleString('id-ID')}`}
                            </td>

                            {/* 5. STATUS (Jika tidak ada status, anggap Published sesuai request) */}
                            <td className="p-4 text-center align-middle">
                                <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase flex items-center justify-center gap-1 w-fit mx-auto ${course.status === 'draft' ? 'bg-gray-100 text-gray-600' : 'bg-green-100 text-green-700'}`}>
                                    {course.status === 'draft' ? <><Edit3 size={12}/> Draft</> : <><Eye size={12}/> Terbit</>}
                                </div>
                            </td>

                            {/* 6. AKSI (Edit, Gear, Publish, Lonceng, Menu[Sampah]) */}
                            <td className="p-4 text-center align-middle relative">
                                <div className="flex items-center justify-center gap-2">
                                    {/* Edit Info */}
                                    <button onClick={() => onEdit(course)} className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 border border-blue-100 hover:border-blue-200 transition-all" title="Edit Informasi" aria-label="Edit Informasi"><Edit3 size={16}/></button>
                                    
                                    {/* Gear (Editor Kurikulum) */}
                                    <Link href={`/admin/courses/${course._id}`} className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 border border-gray-200 hover:border-gray-300 transition-all" title="Edit Kurikulum" aria-label="Edit Kurikulum">
                                        <Settings size={16}/>
                                    </Link>

                                    {/* Publish Button */}
                                    <button onClick={() => onPublish(course)} className={`p-2 rounded-lg border transition-all ${course.status === 'draft' ? 'text-green-600 hover:bg-green-50 border-green-200' : 'text-orange-500 hover:bg-orange-50 border-orange-200'}`} title={course.status === 'draft' ? 'Terbitkan' : 'Tarik Kembali'} aria-label="Toggle Publish">
                                        {course.status === 'draft' ? <CheckCircle size={16}/> : <XCircle size={16}/>}
                                    </button>

                                    {/* Lonceng (Broadcast) - FITUR BARU */}
                                    <button onClick={() => onBroadcast(course)} className="p-2 rounded-lg text-orange-500 hover:bg-orange-50 border border-orange-200 hover:border-orange-300 transition-all" title="Broadcast Notifikasi" aria-label="Broadcast Notifikasi">
                                        <Bell size={16}/>
                                    </button>

                                    {/* Menu Dropdown (Berisi Sampah/Delete) */}
                                    <div className="relative">
                                        <button onClick={() => setActiveMenu(activeMenu === course._id ? null : course._id)} className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 border border-gray-200 hover:border-gray-300 transition-all" aria-label="Menu Opsi Lainnya" title="Menu">
                                            <MoreHorizontal size={16}/>
                                        </button>
                                        {activeMenu === course._id && (
                                            <div ref={menuRef} className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden animate-in fade-in zoom-in-95 origin-top-right">
                                                <button className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm text-gray-700 flex items-center gap-2" aria-label="Duplikat"><Copy size={14}/> Duplikat</button>
                                                {/* TOMBOL SAMPAH ADA DISINI */}
                                                <button onClick={() => onDelete(course._id)} className="w-full text-left px-4 py-3 hover:bg-red-50 text-sm text-red-600 flex items-center gap-2 border-t border-gray-50" aria-label="Hapus Pelatihan"><Trash2 size={14}/> Hapus</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
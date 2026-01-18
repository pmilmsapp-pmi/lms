'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
// Import Form Komponen
import FormKSR from './FormKSR';
import FormPMR from './FormPMR';
// Anda bisa buat file dummy untuk TSR/Pegawai/Pengurus nanti, atau pakai placeholder dulu

export default function ProfileManager({ user, onSuccess }: any) {
    // State tipe anggota default 'UMUM' jika belum diset
    const [memberType, setMemberType] = useState(user?.memberType || 'UMUM');

    const handleTypeChange = async (newType: string) => {
        setMemberType(newType);
    };

    return (
        <div className="space-y-6">
            {/* 1. SELECTOR JENIS ANGGOTA */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-4">Pilih Jenis Keanggotaan</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {['PMR', 'KSR', 'TSR', 'PEGAWAI', 'PENGURUS'].map((type) => (
                        <button
                            key={type}
                            onClick={() => handleTypeChange(type)}
                            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                                memberType === type 
                                ? 'bg-red-700 text-white border-red-700 shadow-md' 
                                : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'
                            }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            {/* 2. RENDER FORM SESUAI PILIHAN */}
            <div className="transition-all duration-300">
                {memberType === 'KSR' && <FormKSR initialData={user} onSuccess={onSuccess} />}
                {memberType === 'PMR' && <FormPMR initialData={user} onSuccess={onSuccess} />}
                
                {/* Placeholder untuk form lain yang belum dibuat */}
                {(memberType === 'TSR' || memberType === 'PEGAWAI' || memberType === 'PENGURUS') && (
                    <div className="bg-yellow-50 p-8 rounded-2xl border border-yellow-200 text-yellow-800 text-center">
                        <p className="font-bold text-lg mb-2">Formulir {memberType}</p>
                        <p className="text-sm">
                            Fitur form untuk <b>{memberType}</b> sedang disiapkan. <br/>
                            Silakan gunakan form KSR sebagai referensi sementara.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
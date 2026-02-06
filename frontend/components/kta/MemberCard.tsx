'use client';

import React from 'react';
import QRCode from 'react-qr-code';
import { getImageUrl } from '@/lib/api';
import { User } from '@/lib/AuthProvider';

interface MemberCardProps {
    user: User | null;
}

export default function MemberCard({ user }: MemberCardProps) {
    if (!user) return null;

    // --- DATA PREPARATION ---
    const memberData = user.memberData || {};
    const nama = user.name || 'Nama Anggota';
    const nia = memberData.nia || memberData.kode_anggota || user.id || '-';
    
    // Unit & Parent
    const unitName = memberData.unit || 'PUSAT';
    const parentPmi = memberData.parentPmi || user.province || 'PUSAT'; 
    
    // Jabatan Logic
    let jabatanRaw = (user.memberType || memberData.position || 'ANGGOTA').toUpperCase();
    let jabatanDisplay = jabatanRaw;
    if (jabatanRaw === 'TSR') jabatanDisplay = 'TENAGA SUKARELA';
    else if (jabatanRaw === 'KSR') jabatanDisplay = 'KORPS SUKARELA';
    else if (jabatanRaw === 'PMR') jabatanDisplay = 'PALANG MERAH REMAJA';

    // Cek Jenis Kartu (White for Staff/Admin, Red for Volunteers)
    const isStaff = ['STAF', 'PEGAWAI', 'PENGURUS', 'ADMIN', 'SUPER_ADMIN'].includes(jabatanRaw);

    // Foto Logic
    const photoUrl = user.avatarUrl || getImageUrl(memberData.path_foto);
    const defaultImage = (memberData.gender === 'P' || memberData.kelamin === 'P') ? '/assets/woman.png' : '/assets/man.png';

    return (
        <div className="flex justify-center w-full font-sans select-none">
            
            {/* CONTAINER - Fixed Ratio similar to Mobile */}
            <div className="relative w-[320px] h-[510px] rounded-xl overflow-hidden shadow-2xl bg-white group">
                
                {/* 1. BACKGROUND IMAGE (Absolute Full) */}
                <div className="absolute inset-0 z-0">
                    <img 
                        src={isStaff ? "/assets/bg_card2.png" : "/assets/bg_card.jpeg"} 
                        alt="KTA Background" 
                        className="w-full h-full object-fill"
                    />
                </div>

                {/* =========================================================
                   LAYOUT KARTU MERAH (RELAWAN - KSR/TSR/PMR)
                   Refer: image_e91da0.jpg & image_f54d75.jpg
                   ========================================================= */}
                {!isStaff && (
                    <>
                        {/* Header Info (QR Left, Text Right) - Adjusted Top Position */}
                        <div className="absolute top-[28%] left-0 right-0 px-5 z-10 flex items-start gap-3">
                            {/* QR Code Box */}
                            <div className="bg-white p-1 rounded-sm shrink-0">
                                <QRCode value={nia} size={45} viewBox={`0 0 256 256`} style={{ height: "auto", maxWidth: "100%", width: "100%" }} />
                            </div>
                            
                            {/* Text Jabatan */}
                            <div className="flex flex-col text-white pt-1 drop-shadow-md">
                                <h2 className="font-extrabold text-lg leading-none uppercase tracking-tight mb-1 font-sans">
                                    {jabatanDisplay}
                                </h2>
                                <p className="font-bold text-[10px] uppercase opacity-90 font-sans leading-tight">
                                    PMI {parentPmi}
                                </p>
                                <p className="font-bold text-[10px] uppercase opacity-90 font-sans leading-tight">
                                    UNIT {unitName}
                                </p>
                            </div>
                        </div>

                        {/* Foto Profil (Center) - Red Border */}
                        <div className="absolute top-[43%] left-0 right-0 flex justify-center z-10">
                            <div className="w-[130px] h-[160px] bg-gray-200 border-[4px] border-[#ce2327] shadow-lg">
                                <img 
                                    src={photoUrl || defaultImage} 
                                    alt="Foto" 
                                    className="w-full h-full object-cover"
                                    onError={(e) => { e.currentTarget.src = defaultImage; }}
                                />
                            </div>
                        </div>

                        {/* Logo PMI (Bottom Center) */}
                        <div className="absolute bottom-[20%] left-0 right-0 flex justify-center z-10">
                             <img src="/assets/pmi.png" alt="Logo" className="w-20 object-contain opacity-90"/>
                        </div>

                        {/* Nama & NIA (Bottom) */}
                        <div className="absolute bottom-[5%] left-0 right-0 text-center z-20 px-4 text-white">
                            <h1 className="font-extrabold text-xl uppercase mb-1 drop-shadow-md font-sans">
                                {nama}
                            </h1>
                            <p className="font-bold text-sm opacity-90 drop-shadow-md font-sans">
                                NI. {nia}
                            </p>
                        </div>
                    </>
                )}


                {/* =========================================================
                   LAYOUT KARTU PUTIH (STAFF / PENGURUS)
                   Refer: WhatsApp Image...jpeg
                   ========================================================= */}
                {isStaff && (
                    <>
                         {/* Header Logo (Jika tidak ada di background image) */}
                         <div className="absolute top-[5%] left-6 z-10">
                             <img src="/assets/pmi.png" alt="Logo" className="w-12 object-contain"/>
                        </div>

                        {/* Foto Profil (Top Center) - Red Border */}
                        <div className="absolute top-[28%] left-0 right-0 flex justify-center z-10">
                            <div className="w-[125px] h-[155px] bg-gray-200 border-[3px] border-[#e20a16] shadow-lg">
                                <img 
                                    src={photoUrl || defaultImage} 
                                    alt="Foto" 
                                    className="w-full h-full object-cover"
                                    onError={(e) => { e.currentTarget.src = defaultImage; }}
                                />
                            </div>
                        </div>

                        {/* Nama & NIA (Middle) - Black Text */}
                        <div className="absolute top-[60%] left-0 right-0 text-center z-20 px-4">
                            <h1 className="text-black font-extrabold text-xl uppercase mb-1 leading-tight font-sans">
                                {nama}
                            </h1>
                            <p className="text-black font-bold text-sm font-sans">
                                NI. {nia}
                            </p>
                        </div>

                        {/* Footer (QR Left, Role Right) */}
                        <div className="absolute bottom-[5%] left-6 right-6 z-20 flex justify-between items-end">
                            {/* QR Code */}
                            <div className="bg-white p-0">
                                <QRCode value={nia} size={55} viewBox={`0 0 256 256`} style={{ height: "auto", maxWidth: "100%", width: "100%" }} />
                            </div>

                            {/* Jabatan Merah (Right Aligned) */}
                            <div className="text-right flex flex-col justify-end">
                                <h2 className="text-[#e20a16] font-black text-xl leading-none uppercase font-sans mb-1">
                                    {jabatanDisplay}
                                </h2>
                                <p className="text-[#e20a16] font-bold text-[10px] uppercase font-sans">
                                    MARKAS PUSAT
                                </p>
                                <p className="text-[#e20a16] font-bold text-[10px] uppercase font-sans">
                                    Palang Merah Indonesia
                                </p>
                            </div>
                        </div>
                    </>
                )}

            </div>
        </div>
    );
}
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { api, getImageUrl } from '@/lib/api';
import Protected from '@/components/Protected';
import { 
    User, Mail, Phone, MapPin, MessageSquare, 
    BookOpen, FileText, CreditCard, Calendar, 
    Heart, ShieldCheck, Map, Building, Briefcase, ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import MemberCard from '@/components/kta/MemberCard'; 

export default function PublicProfilePage() {
    const params = useParams();
    const userId = params?.userId as string;
    
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'biodata'>('biodata');

    useEffect(() => {
        if(userId) loadUserData();
    }, [userId]);

    const loadUserData = async () => {
        try {
            setLoading(true);
            // Panggil API admin untuk ambil data user (support pg_id)
            const res = await api(`/api/admin/users/${userId}/details`);
            if(res.success) {
                setUser(res.user);
            } else {
                setError(res.error || 'User tidak ditemukan');
            }
        } catch (err:any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString?: string | Date) => {
        if (!dateString || dateString === '-' || dateString === '0000-00-00') return '-';
        try {
            return new Date(dateString).toLocaleDateString('id-ID', {
                day: 'numeric', month: 'long', year: 'numeric'
            });
        } catch (e) { return dateString; }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div></div>;
    if (error || !user) return <div className="min-h-screen flex items-center justify-center text-red-500 font-bold">{error || 'User tidak ditemukan'}</div>;

    const memberData = user.memberData || {};
    const isSynced = memberData.source?.includes('POSTGRES');

    return (
        <Protected roles={['SUPER_ADMIN', 'ADMIN', 'FACILITATOR']}>
            <div className="min-h-screen bg-gray-50 pb-20">
                
                {/* Header Pattern */}
                <div className="h-48 bg-gradient-to-r from-red-700 to-red-900 relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/5 opacity-20"></div>
                    <div className="absolute top-4 left-4 z-20">
                        <Link href="/admin/users" className="flex items-center gap-2 text-white/90 hover:text-white bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm transition">
                            <ArrowLeft size={18}/> Kembali ke Daftar
                        </Link>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-20 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* === KOLOM KIRI: KARTU PROFIL & KTA === */}
                        <div className="space-y-6">
                            
                            {/* KARTU PROFIL */}
                            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden text-center p-6 relative">
                                <div className="relative w-32 h-32 mx-auto mb-4">
                                    <div className="w-full h-full rounded-full p-1 bg-white shadow-md">
                                        <img 
                                            src={getImageUrl(user.avatarUrl)} 
                                            alt={user.name} 
                                            className="w-full h-full rounded-full object-cover border-4 border-gray-50"
                                            onError={(e) => e.currentTarget.src = `https://ui-avatars.com/api/?name=${user.name}&background=random`}
                                        />
                                    </div>
                                    {isSynced && (
                                        <div className="absolute bottom-1 right-1 bg-blue-500 text-white p-1.5 rounded-full border-2 border-white shadow-sm" title="Data Pusat">
                                            <ShieldCheck size={14} fill="currentColor"/>
                                        </div>
                                    )}
                                </div>

                                <h1 className="text-xl font-bold text-gray-900 mb-1">{user.name}</h1>
                                <p className="text-sm text-gray-500 mb-4 font-medium">{user.email}</p>

                                <div className="flex flex-wrap justify-center gap-2 mb-6">
                                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-600 border border-gray-200 uppercase tracking-wide">
                                        {user.role}
                                    </span>
                                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-50 text-orange-600 border border-orange-100 uppercase tracking-wide">
                                        {user.memberType || 'Anggota'}
                                    </span>
                                </div>
                            </div>

                            {/* KTA DIGITAL */}
                            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden p-6 flex flex-col items-center">
                                <div className="flex items-center gap-2 mb-4 w-full border-b border-gray-50 pb-2">
                                    <div className="p-2 bg-red-100 text-red-600 rounded-lg">
                                        <CreditCard size={18}/>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800 text-sm uppercase">KTA Digital</h3>
                                        <p className="text-[10px] text-gray-400">Kartu Tanda Anggota Resmi</p>
                                    </div>
                                </div>
                                <div className="transform hover:scale-[1.02] transition-transform duration-300">
                                    <MemberCard user={user} />
                                </div>
                            </div>

                        </div>

                        {/* === KOLOM KANAN: DETAIL DATA === */}
                        <div className="lg:col-span-2 space-y-6">
                            
                            {/* Navigasi Tab (Static for now) */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-1.5 sticky top-20 z-10">
                                <div className="flex overflow-x-auto gap-1">
                                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gray-900 text-white shadow-md text-sm font-bold">
                                        <User size={16}/> Biodata Lengkap
                                    </button>
                                </div>
                            </div>

                            {/* Konten Biodata */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                        <ShieldCheck className="text-red-600"/> Informasi Anggota
                                    </h3>
                                    {isSynced && <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded border">Read Only from MIS</span>}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                                    <div className="space-y-6">
                                        <InfoRow label="Nama Lengkap" value={user.name} icon={<User size={16}/>} />
                                        <InfoRow label="Nomor Induk Anggota (NIA)" value={memberData.nia || memberData.kode_anggota || '-'} icon={<CreditCard size={16}/>} />
                                        <InfoRow label="No. Identitas (KTP/SIM)" value={memberData.no_identitas || memberData.nik || '-'} icon={<CreditCard size={16}/>} />
                                        <InfoRow label="Jenis Kelamin" value={memberData.kelamin || memberData.gender || '-'} icon={<User size={16}/>} />
                                        <InfoRow label="Agama" value={memberData.agama || memberData.religion || '-'} icon={<Heart size={16}/>} />
                                    </div>

                                    <div className="space-y-6">
                                        <InfoRow label="Email" value={user.email} icon={<Mail size={16}/>} />
                                        <InfoRow label="No. Handphone" value={memberData.phone || memberData.no_hp || '-'} icon={<Phone size={16}/>} />
                                        <InfoRow 
                                            label="Tempat, Tanggal Lahir" 
                                            value={`${memberData.tempat_lahir || memberData.birthPlace || '-'}, ${formatDate(memberData.tanggal_lahir || memberData.birthDate)}`} 
                                            icon={<Calendar size={16}/>} 
                                        />
                                        
                                        <div className="bg-orange-50/50 p-4 rounded-xl border border-orange-100 space-y-4 mt-2">
                                            <InfoRow label="Provinsi Keanggotaan" value={user.province || '-'} icon={<Map size={16}/>} />
                                            <InfoRow label="Kabupaten/Kota" value={user.city || '-'} icon={<Building size={16}/>} />
                                            <InfoRow label="Unit PMI" value={memberData.unit || 'PMI Pusat'} icon={<MapPin size={16}/>} />
                                        </div>

                                        <InfoRow label="Alamat Lengkap" value={memberData.address || memberData.alamat || '-'} icon={<MapPin size={16}/>} />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </Protected>
    );
}

const InfoRow = ({ label, value, icon }: { label: string, value: string, icon: any }) => (
    <div className="flex gap-4 items-start group">
        <div className="mt-1 text-gray-400 bg-gray-50 p-2 rounded-lg group-hover:text-red-600 group-hover:bg-red-50 transition-colors">
            {icon}
        </div>
        <div className="flex-1 border-b border-gray-100 pb-3 group-hover:border-gray-200 transition-colors">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-0.5">{label}</p>
            <p className="font-medium text-gray-900 text-base">{value}</p>
        </div>
    </div>
);
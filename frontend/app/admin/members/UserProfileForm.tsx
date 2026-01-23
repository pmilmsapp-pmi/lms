// 'use client';

// import { useState } from 'react';
// import { Save, X, User, MapPin, Calendar, Mail, Hash, Briefcase } from 'lucide-react';

// interface UserProfileFormProps {
//     initialData?: any;
//     onClose: () => void;
//     onSave: (data: any) => void;
// }

// export default function UserProfileForm({ initialData, onClose, onSave }: UserProfileFormProps) {
//     // Inisialisasi state dengan nilai default atau data yang ada
//     const [formData, setFormData] = useState({
//         // Identitas Dasar
//         nama: initialData?.name || '',
//         email: initialData?.email || '',
//         noanggota: initialData?.memberData?.nia || '', // NIA untuk relawan, Kode untuk pengurus/pegawai
        
//         // Data Pribadi
//         kelamin: initialData?.memberData?.gender || 'Laki-Laki',
//         tempat_lahir: initialData?.memberData?.birthPlace || '',
//         tgl_lahir: initialData?.memberData?.birthDate ? new Date(initialData.memberData.birthDate).toISOString().split('T')[0] : '',
//         no_telp: initialData?.memberData?.phone || '',
        
//         // Keanggotaan
//         jenis: initialData?.memberType || 'KSR', // PMR, KSR, TSR, Pegawai, Pengurus
//         status: initialData?.status || 'Aktif',
        
//         // Data Organisasi/Unit
//         nama_unit: initialData?.memberData?.unit || '', // Nama Unit / PMI / Markas
//         jabatan: initialData?.memberData?.position || '', // Jabatan Pengurus / Jenis SDM Pegawai
        
//         // Periode (Khusus Pengurus)
//         awal_periode: initialData?.memberData?.periodStart || '',
//         akhir_periode: initialData?.memberData?.periodEnd || '',

//         // Lokasi
//         kabupaten: initialData?.city || '',
//         nama_provinsi: initialData?.province || 'JAWA TIMUR',
//     });

//     // Helper boolean untuk kondisional rendering
//     const isPengurus = formData.jenis === 'Pengurus';
//     const isPegawai = formData.jenis === 'Pegawai';
//     // Relawan biasanya PMR, KSR, TSR
//     const isRelawan = ['PMR', 'KSR', 'TSR'].includes(formData.jenis);

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
        
//         // Format payload agar sesuai skema database User (MongoDB)
//         const payload = {
//             name: formData.nama,
//             email: formData.email,
//             memberType: formData.jenis,
//             status: formData.status,
//             city: formData.kabupaten,
//             province: formData.nama_provinsi,
//             memberData: {
//                 // Spread data lama agar field yang tidak ada di form tidak hilang
//                 ...initialData?.memberData,
                
//                 nia: formData.noanggota, // Disimpan sebagai nia/kode
//                 gender: formData.kelamin,
//                 birthPlace: formData.tempat_lahir,
//                 birthDate: formData.tgl_lahir,
//                 phone: formData.no_telp,
//                 unit: formData.nama_unit, // Unit/Markas/PMI
                
//                 // Field khusus
//                 position: formData.jabatan, // Jabatan/Jenis SDM
//                 periodStart: formData.awal_periode,
//                 periodEnd: formData.akhir_periode
//             }
//         };
//         onSave(payload);
//     };

//     return (
//         <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
//             <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                
//                 {/* HEADER */}
//                 <div className="sticky top-0 bg-white z-10 border-b border-gray-100 px-6 py-4 flex justify-between items-center">
//                     <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center text-red-600">
//                             <User size={20} />
//                         </div>
//                         <div>
//                             <h2 className="text-lg font-bold text-gray-800">Edit Profil Anggota</h2>
//                             <p className="text-xs text-gray-500">Sesuaikan data anggota PMI ({formData.jenis})</p>
//                         </div>
//                     </div>
//                     <button 
//                         onClick={onClose} 
//                         className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
//                         title="Tutup"
//                         aria-label="Tutup"
//                     >
//                         <X size={20} />
//                     </button>
//                 </div>

//                 {/* FORM */}
//                 <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    
//                     {/* 1. DATA DIRI */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div className="space-y-4">
//                             <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
//                                 <Hash size={12}/> Identitas Dasar
//                             </h3>
                            
//                             <div>
//                                 <label className="block text-xs font-bold text-gray-600 mb-1">
//                                     {isPengurus || isPegawai ? "Kode Anggota" : "Nomor Anggota (NIA)"}
//                                 </label>
//                                 <input type="text" name="noanggota" value={formData.noanggota} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 outline-none" placeholder="Contoh: NI-3527..." title="NIA" aria-label="NIA"/>
//                             </div>

//                             <div>
//                                 <label className="block text-xs font-bold text-gray-600 mb-1">Nama Lengkap</label>
//                                 <input type="text" name="nama" value={formData.nama} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 outline-none" placeholder="Nama Lengkap" title="Nama" aria-label="Nama"/>
//                             </div>

//                             <div className="grid grid-cols-2 gap-4">
//                                 <div>
//                                     <label className="block text-xs font-bold text-gray-600 mb-1">Email</label>
//                                     <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 outline-none" title="Email" aria-label="Email"/>
//                                 </div>
//                                 <div>
//                                     <label className="block text-xs font-bold text-gray-600 mb-1">No. HP / Telp</label>
//                                     <input type="text" name="no_telp" value={formData.no_telp} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 outline-none" placeholder="08..." title="No HP" aria-label="No HP"/>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="space-y-4">
//                             <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
//                                 <Calendar size={12}/> Data Kelahiran
//                             </h3>

//                             <div className="grid grid-cols-2 gap-4">
//                                 <div>
//                                     <label className="block text-xs font-bold text-gray-600 mb-1">Tempat Lahir</label>
//                                     <input type="text" name="tempat_lahir" value={formData.tempat_lahir} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 outline-none" title="Tempat Lahir" aria-label="Tempat Lahir"/>
//                                 </div>
//                                 <div>
//                                     <label className="block text-xs font-bold text-gray-600 mb-1">Tanggal Lahir</label>
//                                     <input type="date" name="tgl_lahir" value={formData.tgl_lahir} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 outline-none" title="Tanggal Lahir" aria-label="Tanggal Lahir"/>
//                                 </div>
//                             </div>

//                             <div>
//                                 <label className="block text-xs font-bold text-gray-600 mb-1">Jenis Kelamin</label>
//                                 <select name="kelamin" value={formData.kelamin} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 outline-none bg-white" title="Jenis Kelamin" aria-label="Jenis Kelamin">
//                                     <option value="Laki-Laki">Laki-Laki</option>
//                                     <option value="Perempuan">Perempuan</option>
//                                 </select>
//                             </div>
//                         </div>
//                     </div>

//                     <hr className="border-gray-100" />

//                     {/* 2. DATA ORGANISASI (DINAMIS SESUAI TIPE) */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div className="space-y-4">
//                             <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
//                                 <Briefcase size={12}/> Detail Keanggotaan
//                             </h3>

//                             <div className="grid grid-cols-2 gap-4">
//                                 <div>
//                                     <label className="block text-xs font-bold text-gray-600 mb-1">Tipe Anggota</label>
//                                     <select name="jenis" value={formData.jenis} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 outline-none bg-white font-bold" title="Tipe Anggota" aria-label="Tipe Anggota">
//                                         <option value="KSR">KSR</option>
//                                         <option value="TSR">TSR</option>
//                                         <option value="PMR">PMR</option>
//                                         <option value="Pengurus">Pengurus</option>
//                                         <option value="Pegawai">Pegawai</option>
//                                     </select>
//                                 </div>
//                                 <div>
//                                     <label className="block text-xs font-bold text-gray-600 mb-1">Status</label>
//                                     <select name="status" value={formData.status} onChange={handleChange} className={`w-full p-2.5 border border-gray-300 rounded-lg text-sm font-bold outline-none ${formData.status === 'Aktif' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`} title="Status" aria-label="Status">
//                                         <option value="Aktif">Aktif</option>
//                                         <option value="Tidak Aktif">Tidak Aktif</option>
//                                         <option value="Suspan">Suspan</option>
//                                     </select>
//                                 </div>
//                             </div>

//                             {/* Field Nama Unit/Markas (Muncul untuk semua tipe) */}
//                             <div>
//                                 <label className="block text-xs font-bold text-gray-600 mb-1">
//                                     {isPengurus ? "Nama PMI" : "Nama Unit / Markas"}
//                                 </label>
//                                 <input type="text" name="nama_unit" value={formData.nama_unit} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 outline-none" placeholder="Contoh: MARKAS KAB. SAMPANG" title="Nama Unit" aria-label="Nama Unit"/>
//                             </div>

//                             {/* Field Khusus Pegawai/Pengurus */}
//                             {(isPegawai || isPengurus) && (
//                                 <div>
//                                     <label className="block text-xs font-bold text-gray-600 mb-1">
//                                         {isPengurus ? "Jabatan" : "Jenis SDM / Posisi"}
//                                     </label>
//                                     <input type="text" name="jabatan" value={formData.jabatan} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 outline-none" placeholder={isPengurus ? "SEKRETARIS" : "STAF"} title="Jabatan" aria-label="Jabatan"/>
//                                 </div>
//                             )}

//                             {/* Field Khusus Pengurus (Periode) */}
//                             {isPengurus && (
//                                 <div className="grid grid-cols-2 gap-4">
//                                     <div>
//                                         <label className="block text-xs font-bold text-gray-600 mb-1">Awal Periode</label>
//                                         <input type="number" name="awal_periode" value={formData.awal_periode} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 outline-none" placeholder="Tahun" title="Awal Periode" aria-label="Awal Periode"/>
//                                     </div>
//                                     <div>
//                                         <label className="block text-xs font-bold text-gray-600 mb-1">Akhir Periode</label>
//                                         <input type="number" name="akhir_periode" value={formData.akhir_periode} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 outline-none" placeholder="Tahun" title="Akhir Periode" aria-label="Akhir Periode"/>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>

//                         <div className="space-y-4">
//                             <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
//                                 <MapPin size={12}/> Wilayah Domisili
//                             </h3>

//                             <div>
//                                 <label className="block text-xs font-bold text-gray-600 mb-1">Provinsi</label>
//                                 <input type="text" name="nama_provinsi" value={formData.nama_provinsi} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 text-gray-500 font-medium" readOnly title="Provinsi" aria-label="Provinsi"/>
//                             </div>

//                             <div>
//                                 <label className="block text-xs font-bold text-gray-600 mb-1">Kabupaten / Kota</label>
//                                 <input type="text" name="kabupaten" value={formData.kabupaten} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 outline-none" placeholder="Contoh: KABUPATEN SAMPANG" title="Kabupaten" aria-label="Kabupaten"/>
//                             </div>
//                         </div>
//                     </div>

//                     {/* FOOTER */}
//                     <div className="pt-4 border-t border-gray-100 flex gap-3 justify-end">
//                         <button type="button" onClick={onClose} className="px-6 py-2.5 rounded-lg border border-gray-300 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors" title="Batal" aria-label="Batal">
//                             Batal
//                         </button>
//                         <button type="submit" className="px-6 py-2.5 rounded-lg bg-[#990000] text-white text-sm font-bold hover:bg-[#7f0000] shadow-md flex items-center gap-2" title="Simpan" aria-label="Simpan">
//                             <Save size={16} /> Simpan Perubahan
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }



'use client';

import { useState, useRef } from 'react';
import { X, Camera, Save, Loader2, Mail, MapPin, Building, User, Phone } from 'lucide-react';
import { getImageUrl } from '@/lib/api';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

interface UserProfileFormProps {
    initialData: any;
    onClose: () => void;
    onSave: (data: any) => void;
}

export default function UserProfileForm({ initialData, onClose, onSave }: UserProfileFormProps) {
    const [formData, setFormData] = useState({
        name: initialData.name || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        avatarUrl: initialData.avatarUrl || '',
    });
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            const userStr = localStorage.getItem('user');
            const token = userStr ? JSON.parse(userStr).token : null;
            const fd = new FormData(); fd.append('file', file);
            const res = await axios.post(`${API_BASE_URL}/api/materials/upload`, fd, { headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` } });
            if (res.data?.data?.url || res.data?.url) setFormData(prev => ({ ...prev, avatarUrl: res.data?.data?.url || res.data?.url }));
        } catch { alert("Gagal upload"); } finally { setUploading(false); }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try { await onSave(formData); } catch (e) { console.error(e); } finally { setLoading(false); }
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-2xl w-full max-w-[500px] shadow-2xl overflow-hidden flex flex-col relative">
                
                {/* Header Blue */}
                <div className="bg-blue-600 h-24 w-full relative">
                    <div className="absolute top-5 left-5 text-white">
                        <h2 className="text-lg font-bold">Profil Pengguna</h2>
                        <span className="text-xs opacity-90 block mt-0.5">• Kelola biodata akun</span>
                    </div>
                    <button onClick={onClose} className="absolute top-4 right-4 text-blue-200 hover:text-white transition-colors" title="Tutup Modal" aria-label="Tutup">
                        <X size={24}/>
                    </button>
                </div>

                {/* Avatar */}
                <div className="px-6 -mt-10 mb-4 flex justify-center">
                    <div className="relative group">
                        <div className="w-24 h-24 rounded-full border-[4px] border-white bg-white shadow-md overflow-hidden flex items-center justify-center">
                            {uploading ? <Loader2 className="animate-spin text-gray-400"/> : 
                                <img 
                                    src={getImageUrl(formData.avatarUrl)} 
                                    alt="Foto Profil Pengguna" 
                                    className="w-full h-full object-cover" 
                                    onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/150?text=USER'; }}
                                />
                            }
                        </div>
                        <button onClick={() => fileInputRef.current?.click()} className="absolute bottom-0 right-0 p-1.5 bg-gray-900 text-white rounded-full hover:bg-black border-2 border-white shadow-lg" title="Ganti Foto" aria-label="Ganti Foto">
                            <Camera size={14}/>
                        </button>
                        <input type="file" ref={fileInputRef} onChange={handleAvatarChange} className="hidden" accept="image/*" aria-label="Input File Foto"/>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-5">
                    {/* Read Only Info */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                            <label className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1 mb-1"><Building size={10}/> UNIT / ASAL</label>
                            <p className="font-bold text-gray-800 text-xs truncate" title={initialData.memberData?.unit}>{initialData.memberData?.unit || 'Umum'}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                            <label className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1 mb-1"><MapPin size={10}/> DOMISILI</label>
                            <div className="text-xs font-bold text-gray-800 leading-tight">
                                <p className="truncate" title={initialData.city}>{initialData.city || 'Kota -'}</p>
                                <p className="text-[10px] text-gray-500 font-normal truncate" title={initialData.province}>{initialData.province || 'Provinsi -'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Inputs */}
                    <div className="space-y-4">
                        <div>
                            <label className="text-[11px] font-bold text-gray-500 uppercase block mb-1">NAMA LENGKAP</label>
                            <div className="relative">
                                <User className="absolute left-3 top-2.5 text-gray-400" size={16}/>
                                <input className="w-full pl-10 pr-4 py-2 border rounded-xl text-sm font-bold text-gray-800 outline-none focus:ring-2 focus:ring-blue-100" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Nama Lengkap" aria-label="Nama Lengkap"/>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-[11px] font-bold text-gray-500 uppercase block mb-1">EMAIL</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-2.5 text-gray-400" size={16}/>
                                    <input className="w-full pl-10 pr-4 py-2 border bg-gray-50 text-gray-500 rounded-xl text-xs font-medium outline-none cursor-not-allowed" value={formData.email} disabled title="Email tidak dapat diubah" aria-label="Email"/>
                                </div>
                            </div>
                            <div>
                                <label className="text-[11px] font-bold text-gray-500 uppercase block mb-1">NO. HP / WA</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-2.5 text-gray-400" size={16}/>
                                    <input className="w-full pl-10 pr-4 py-2 border rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-blue-100" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="08..." aria-label="Nomor Telepon"/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-gray-300 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors" aria-label="Batal">Batal</button>
                        <button type="submit" disabled={loading || uploading} className="flex-[2] py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 shadow-md transition-all flex items-center justify-center gap-2" aria-label="Simpan">
                            {loading ? <Loader2 className="animate-spin" size={14}/> : <Save size={14}/>} Simpan Perubahan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
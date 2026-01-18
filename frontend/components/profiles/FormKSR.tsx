'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import { Save, User, MapPin, Phone, CreditCard, Building } from 'lucide-react';

export default function FormKSR({ initialData, onSuccess }: any) {
    const data = initialData?.memberData || {};
    
    const [formData, setFormData] = useState({
        nik: data.nik || '',          // [Req: NIK]
        nia: data.nia || '',          // [CSV: noanggota]
        unit: data.unit || '',        // [CSV: nama_unit]
        gender: data.gender || 'L',   // [CSV: kelamin]
        bloodType: data.bloodType || 'O',
        placeOfBirth: data.birthPlace || '', // [CSV: tempat_lahir]
        dateOfBirth: data.birthDate ? new Date(data.birthDate).toISOString().split('T')[0] : '', // [CSV: tgl_lahir]
        address: data.address || '',
        province: data.province || '', // [CSV: nama_provinsi / id_provinsi] - PENTING UTK ADMIN DAERAH
        regency: data.regency || '',   // [CSV: kabupaten] - PENTING UTK ADMIN DAERAH
        phone: data.phone || '',
        status: data.status || 'Aktif' // [CSV: status]
    });

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                memberType: 'KSR',
                memberData: {
                    ...formData,
                    // Pastikan format tanggal valid
                    birthDate: formData.dateOfBirth
                },
                // Update regionScope user agar otomatis terdeteksi Admin Daerah (Opsional, biasanya Admin yg set)
                // regionScope: 'province', 
                // managedProvinces: [formData.province] 
            };
            
            await api('/api/profile/update', { method: 'PATCH', body: payload });
            alert("Data KSR berhasil disimpan!");
            if(onSuccess) onSuccess();
        } catch (error) {
            console.error(error);
            alert("Gagal menyimpan data.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b">
                <div className="bg-red-100 p-2 rounded-lg text-red-700"><User size={24}/></div>
                <div>
                    <h3 className="font-bold text-gray-800 text-lg">Biodata Korps Sukarela (KSR)</h3>
                    <p className="text-xs text-gray-500">Lengkapi data sesuai KTP dan Kartu Anggota.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* 1. IDENTITAS UTAMA (NIK & NIA) */}
                <div className="space-y-5">
                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <CreditCard size={14}/> Identitas
                    </h4>
                    
                    <div>
                        <label htmlFor="nik" className="block text-sm font-bold text-gray-700 mb-1">NIK (KTP) <span className="text-red-500">*</span></label>
                        <input id="nik" type="number" required className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none" 
                            value={formData.nik} onChange={e => setFormData({...formData, nik: e.target.value})} placeholder="16 digit NIK" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                         <div>
                            <label htmlFor="nia" className="block text-sm font-medium text-gray-700 mb-1">NIA (No. Anggota)</label>
                            <input id="nia" type="text" className="w-full p-3 border border-gray-300 rounded-xl" 
                                value={formData.nia} onChange={e => setFormData({...formData, nia: e.target.value})} placeholder="Nomor Induk PMI" />
                        </div>
                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status Keaktifan</label>
                            <select id="status" className="w-full p-3 border border-gray-300 rounded-xl bg-white" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                                <option value="Aktif">Aktif</option>
                                <option value="Tidak Aktif">Tidak Aktif</option>
                                <option value="Calon">Calon</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* 2. DATA PRIBADI */}
                <div className="space-y-5">
                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <User size={14}/> Data Diri
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="birthPlace" className="block text-sm font-medium text-gray-700 mb-1">Tempat Lahir</label>
                            <input id="birthPlace" type="text" className="w-full p-3 border border-gray-300 rounded-xl" value={formData.placeOfBirth} onChange={e => setFormData({...formData, placeOfBirth: e.target.value})} />
                        </div>
                        <div>
                            <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">Tgl Lahir</label>
                            <input id="birthDate" type="date" className="w-full p-3 border border-gray-300 rounded-xl" value={formData.dateOfBirth} onChange={e => setFormData({...formData, dateOfBirth: e.target.value})} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                            <select id="gender" className="w-full p-3 border border-gray-300 rounded-xl bg-white" value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})}>
                                <option value="L">Laki-laki</option>
                                <option value="P">Perempuan</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="bloodType" className="block text-sm font-medium text-gray-700 mb-1">Gol. Darah</label>
                            <select id="bloodType" className="w-full p-3 border border-gray-300 rounded-xl bg-white" value={formData.bloodType} onChange={e => setFormData({...formData, bloodType: e.target.value})}>
                                <option value="O">O</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="AB">AB</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* 3. LOKASI & UNIT (Sesuai CSV untuk Admin Daerah) */}
                <div className="md:col-span-2 space-y-5 pt-4 border-t border-dashed border-gray-200">
                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <MapPin size={14}/> Penugasan & Wilayah
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-1">Unit / Markas Asal</label>
                            <input id="unit" type="text" className="w-full p-3 border border-gray-300 rounded-xl" 
                                value={formData.unit} onChange={e => setFormData({...formData, unit: e.target.value})} placeholder="Contoh: MARKAS KAB. SAMPANG" />
                        </div>
                        <div>
                             <label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><Phone size={14}/> No. WhatsApp</label>
                             <input id="phone" type="text" className="w-full p-3 border border-gray-300 rounded-xl" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="08..." />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Alamat Domisili</label>
                            <input id="address" type="text" className="w-full p-3 border border-gray-300 rounded-xl" 
                                value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} placeholder="Nama Jalan, RT/RW" />
                        </div>
                        <div>
                            {/* Input Manual atau Dropdown (Disini manual agar fleksibel sesuai CSV) */}
                            <label htmlFor="regency" className="block text-sm font-medium text-gray-700 mb-1">Kabupaten/Kota</label>
                            <input id="regency" type="text" className="w-full p-3 border border-gray-300 rounded-xl uppercase" 
                                value={formData.regency} onChange={e => setFormData({...formData, regency: e.target.value})} placeholder="Contoh: SAMPANG" />
                        </div>
                        <div>
                            <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-1">Provinsi</label>
                            <input id="province" type="text" className="w-full p-3 border border-gray-300 rounded-xl uppercase" 
                                value={formData.province} onChange={e => setFormData({...formData, province: e.target.value})} placeholder="Contoh: JAWA TIMUR" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 flex justify-end gap-3 pt-6 border-t">
                 <button type="submit" disabled={loading} className="bg-red-700 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-800 transition-all shadow-lg flex items-center gap-2 active:scale-95 disabled:opacity-50">
                    <Save size={18}/> {loading ? 'Menyimpan...' : 'Simpan Data KSR'}
                </button>
            </div>
        </form>
    );
}
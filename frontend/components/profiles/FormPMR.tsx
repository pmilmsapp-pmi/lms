'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import { Save, User, GraduationCap, MapPin, Phone } from 'lucide-react';

export default function FormPMR({ initialData, onSuccess }: any) {
    const data = initialData?.memberData || {};
    
    const [formData, setFormData] = useState({
        nia: data.nia || '',
        unit: data.unit || '', // Nama Sekolah
        gender: data.gender || 'L',
        bloodType: data.bloodType || 'O',
        placeOfBirth: data.birthPlace || '',
        dateOfBirth: data.birthDate ? new Date(data.birthDate).toISOString().split('T')[0] : '',
        address: data.address || '',
        phone: data.phone || '',
    });

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                memberType: 'PMR',
                memberData: {
                    ...formData,
                    birthDate: formData.dateOfBirth
                }
            };
            await api('/api/profile/update', { method: 'PATCH', body: payload });
            alert("Data PMR berhasil disimpan!");
            if(onSuccess) onSuccess();
        } catch (error) { alert("Gagal menyimpan."); } 
        finally { setLoading(false); }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-blue-200 animate-in fade-in">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-700"><GraduationCap size={24}/></div>
                <div>
                    <h3 className="font-bold text-gray-800 text-lg">Biodata Palang Merah Remaja (PMR)</h3>
                    <p className="text-xs text-gray-500">Anggota tingkat Mula, Madya, dan Wira.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="unit" className="block text-sm font-bold text-gray-700 mb-1">Nama Sekolah / Unit</label>
                    <input id="unit" type="text" className="w-full p-3 border border-gray-300 rounded-xl" required
                        value={formData.unit} onChange={e => setFormData({...formData, unit: e.target.value})} placeholder="Contoh: SMA Negeri 1..." />
                </div>
                <div>
                    <label htmlFor="nia" className="block text-sm font-medium text-gray-700 mb-1">Nomor Anggota (Jika ada)</label>
                    <input id="nia" type="text" className="w-full p-3 border border-gray-300 rounded-xl" 
                        value={formData.nia} onChange={e => setFormData({...formData, nia: e.target.value})} />
                </div>
                
                {/* Tambahkan field lain sesuai kebutuhan PMR (mirip KSR) */}
            </div>

            <div className="mt-8 flex justify-end">
                 <button type="submit" disabled={loading} className="bg-blue-700 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-800 transition-all shadow-lg flex items-center gap-2">
                    <Save size={18}/> {loading ? 'Menyimpan...' : 'Simpan Data PMR'}
                </button>
            </div>
        </form>
    );
}
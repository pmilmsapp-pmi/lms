// 'use client';

// import { useState, useEffect } from 'react';
// import regionDataRaw from '@/data/indonesia_provinces_regencies.json'; 

// // Type definition for JSON structure
// type Regency = { code: string; name: string; type: string };
// type Province = { code: string; name: string; regencies: Regency[] };
// type RegionData = { provinces: Province[] };

// const regionData = regionDataRaw as RegionData;

// interface Props {
//     value: {
//         scope: 'national' | 'province' | 'regency';
//         provinces: string[];
//         regencies: string[];
//     };
//     onChange: (val: any) => void;
// }

// export default function RegionSelector({ value, onChange }: Props) {
//     const [scope, setScope] = useState(value.scope);
    
//     // Handler ganti scope
//     const handleScopeChange = (newScope: 'national' | 'province' | 'regency') => {
//         setScope(newScope);
//         // Reset pilihan jika naik level (misal dari regency ke national)
//         onChange({ ...value, scope: newScope, provinces: [], regencies: [] });
//     };

//     // Handler centang provinsi
//     const toggleProvince = (code: string) => {
//         const current = value.provinces || [];
//         const newProvs = current.includes(code) 
//             ? current.filter(c => c !== code) 
//             : [...current, code];
        
//         onChange({ ...value, provinces: newProvs });
//     };

//     // Handler centang kabupaten
//     const toggleRegency = (code: string) => {
//         const current = value.regencies || [];
//         const newRegs = current.includes(code)
//             ? current.filter(c => c !== code)
//             : [...current, code];
        
//         onChange({ ...value, regencies: newRegs });
//     };

//     // Filter kabupaten yang ditampilkan (hanya dari provinsi yang dipilih)
//     const activeProvinces = regionData.provinces.filter(p => value.provinces.includes(p.code));

//     return (
//         <div className="space-y-4 border p-4 rounded-xl bg-gray-50">
//             <h3 className="font-bold text-gray-700 text-sm">Cakupan Wilayah Tugas</h3>
            
//             {/* 1. PILIH LEVEL */}
//             <div className="flex gap-4 text-sm">
//                 <label className="flex items-center gap-2 cursor-pointer">
//                     <input type="radio" checked={scope === 'national'} onChange={() => handleScopeChange('national')} className="text-red-600"/>
//                     <span>Nasional</span>
//                 </label>
//                 <label className="flex items-center gap-2 cursor-pointer">
//                     <input type="radio" checked={scope === 'province'} onChange={() => handleScopeChange('province')} className="text-red-600"/>
//                     <span>Provinsi</span>
//                 </label>
//                 <label className="flex items-center gap-2 cursor-pointer">
//                     <input type="radio" checked={scope === 'regency'} onChange={() => handleScopeChange('regency')} className="text-red-600"/>
//                     <span>Kabupaten/Kota</span>
//                 </label>
//             </div>

//             {/* 2. PILIH PROVINSI (Muncul jika scope != national) */}
//             {scope !== 'national' && (
//                 <div className="mt-2">
//                     <p className="text-xs font-bold text-gray-500 mb-2">Pilih Provinsi:</p>
//                     <div className="h-48 overflow-y-auto border p-2 bg-white rounded grid grid-cols-2 gap-2 text-xs">
//                         {regionData.provinces.map(p => (
//                             <label key={p.code} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
//                                 <input 
//                                     type="checkbox" 
//                                     checked={value.provinces.includes(p.code)} 
//                                     onChange={() => toggleProvince(p.code)}
//                                     className="rounded text-red-600"
//                                 />
//                                 {p.name}
//                             </label>
//                         ))}
//                     </div>
//                 </div>
//             )}

//             {/* 3. PILIH KABUPATEN (Muncul hanya jika scope == regency) */}
//             {scope === 'regency' && value.provinces.length > 0 && (
//                 <div className="mt-2">
//                     <p className="text-xs font-bold text-gray-500 mb-2">Pilih Kabupaten/Kota (dari Provinsi terpilih):</p>
//                     <div className="h-60 overflow-y-auto border p-2 bg-white rounded space-y-3">
//                         {activeProvinces.map(prov => (
//                             <div key={prov.code}>
//                                 <p className="font-bold text-red-600 text-[10px] mb-1 sticky top-0 bg-white py-1">{prov.name}</p>
//                                 <div className="grid grid-cols-2 gap-2 text-xs pl-2 border-l-2 border-red-100">
//                                     {prov.regencies.map(reg => (
//                                         <label key={reg.code} className="flex items-center gap-2 cursor-pointer">
//                                             <input 
//                                                 type="checkbox" 
//                                                 checked={value.regencies.includes(reg.code)}
//                                                 onChange={() => toggleRegency(reg.code)}
//                                                 className="rounded text-blue-600"
//                                             />
//                                             {reg.type === 'Kota' ? 'Kota ' : ''}{reg.name}
//                                         </label>
//                                     ))}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             )}
            
//             {scope === 'regency' && value.provinces.length === 0 && (
//                 <p className="text-xs text-red-500 italic">* Pilih minimal satu provinsi di atas untuk melihat daftar kabupaten.</p>
//             )}
//         </div>
//     );
// }


'use client';

import { useState, useMemo } from 'react';
import { Search, MapPin, CheckCircle, Circle, ChevronRight } from 'lucide-react';
import regionDataRaw from '../../data/indonesia_provinces_regencies.json'; 

type Regency = { code: string; name: string; type: string };
type Province = { code: string; name: string; regencies: Regency[] };
type RegionData = { provinces: Province[] };

const regionData = regionDataRaw as RegionData;

interface Props {
    value: {
        scope: 'national' | 'province' | 'regency';
        provinces: string[];
        regencies: string[];
    };
    onChange: (val: any) => void;
}

export default function RegionSelector({ value, onChange }: Props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeProvForRegency, setActiveProvForRegency] = useState<string | null>(null);

    // Handler ganti scope
    const handleScopeChange = (newScope: 'national' | 'province' | 'regency') => {
        onChange({ ...value, scope: newScope, provinces: [], regencies: [] });
        setActiveProvForRegency(null);
    };

    // Toggle Provinsi
    const toggleProvince = (code: string) => {
        const current = value.provinces || [];
        const newProvs = current.includes(code) ? current.filter(c => c !== code) : [...current, code];
        onChange({ ...value, provinces: newProvs });
    };

    // Toggle Kabupaten
    const toggleRegency = (code: string) => {
        const current = value.regencies || [];
        const newRegs = current.includes(code) ? current.filter(c => c !== code) : [...current, code];
        onChange({ ...value, regencies: newRegs });
    };

    // Filter Provinsi berdasarkan Search
    const filteredProvinces = useMemo(() => {
        return regionData.provinces.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [searchTerm]);

    // Provinsi yang dipilih (untuk tab Kabupaten)
    const selectedProvincesList = useMemo(() => {
        return regionData.provinces.filter(p => value.provinces.includes(p.code));
    }, [value.provinces]);

    return (
        <div className="border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden">
            {/* 1. HEADER & SCOPE SELECTION */}
            <div className="bg-gray-50 p-4 border-b border-gray-200">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Cakupan Wilayah Tugas</h4>
                <div className="flex flex-wrap gap-2">
                    {['national', 'province', 'regency'].map((scope) => (
                        <button
                            key={scope}
                            onClick={() => handleScopeChange(scope as any)}
                            className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all flex items-center gap-2 ${
                                value.scope === scope 
                                ? 'bg-red-600 text-white border-red-600 shadow-md' 
                                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100'
                            }`}
                        >
                            {value.scope === scope ? <CheckCircle size={14}/> : <Circle size={14}/>}
                            {scope === 'national' ? 'Nasional (Seluruh Indonesia)' : 
                             scope === 'province' ? 'Pilih Provinsi' : 'Pilih Kabupaten/Kota'}
                        </button>
                    ))}
                </div>
            </div>

            {/* 2. CONTENT AREA */}
            <div className="p-4">
                {value.scope === 'national' && (
                    <div className="text-center py-8 text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                        <MapPin size={32} className="mx-auto mb-2 opacity-50"/>
                        <p className="text-sm font-medium">Admin memiliki akses ke seluruh data Nasional.</p>
                    </div>
                )}

                {/* PILIH PROVINSI */}
                {value.scope !== 'national' && (
                    <div className="space-y-4">
                        {/* Search Bar */}
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 text-gray-400" size={16}/>
                            <input 
                                type="text" 
                                placeholder="Cari Provinsi..." 
                                className="w-full pl-9 p-2 border rounded-lg text-sm bg-gray-50 focus:bg-white transition-colors outline-none focus:ring-2 focus:ring-red-100"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* List Provinsi (Grid & Scrollable) */}
                        <div className="border rounded-xl overflow-hidden">
                            <div className="bg-gray-100 px-4 py-2 text-[10px] font-bold text-gray-500 uppercase">Daftar Provinsi</div>
                            <div className="h-64 overflow-y-auto p-2 bg-white grid grid-cols-1 md:grid-cols-2 gap-1 custom-scrollbar">
                                {filteredProvinces.map(p => (
                                    <label key={p.code} className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors text-xs font-medium ${value.provinces.includes(p.code) ? 'bg-red-50 text-red-700' : 'hover:bg-gray-50 text-gray-700'}`}>
                                        <input 
                                            type="checkbox" 
                                            checked={value.provinces.includes(p.code)} 
                                            onChange={() => toggleProvince(p.code)}
                                            className="rounded text-red-600 focus:ring-red-500 w-4 h-4 border-gray-300"
                                        />
                                        {p.name}
                                    </label>
                                ))}
                                {filteredProvinces.length === 0 && <p className="text-xs text-gray-400 p-2 col-span-2 text-center">Provinsi tidak ditemukan.</p>}
                            </div>
                        </div>
                    </div>
                )}

                {/* PILIH KABUPATEN (Hanya jika scope Regency & Provinsi sudah dipilih) */}
                {value.scope === 'regency' && (
                    <div className="mt-6 pt-6 border-t border-gray-100 animate-in slide-in-from-bottom-2">
                        <h4 className="text-xs font-bold text-gray-700 mb-3 flex items-center gap-2">
                            <MapPin size={14}/> Pilih Kabupaten/Kota
                        </h4>
                        
                        {value.provinces.length === 0 ? (
                            <p className="text-xs text-orange-600 bg-orange-50 p-3 rounded-lg border border-orange-100">
                                ⚠️ Mohon pilih minimal satu Provinsi di atas terlebih dahulu.
                            </p>
                        ) : (
                            <div className="flex flex-col md:flex-row gap-4 h-80 border rounded-xl overflow-hidden bg-gray-50">
                                {/* Kiri: List Provinsi Terpilih */}
                                <div className="w-full md:w-1/3 border-r border-gray-200 bg-white overflow-y-auto">
                                    {selectedProvincesList.map(p => (
                                        <button 
                                            key={p.code}
                                            onClick={() => setActiveProvForRegency(p.code)}
                                            className={`w-full text-left px-4 py-3 text-xs font-bold flex justify-between items-center border-b border-gray-50 ${activeProvForRegency === p.code ? 'bg-red-50 text-red-700' : 'text-gray-600 hover:bg-gray-50'}`}
                                        >
                                            {p.name}
                                            <ChevronRight size={14} className={activeProvForRegency === p.code ? 'text-red-500' : 'text-gray-300'}/>
                                        </button>
                                    ))}
                                </div>

                                {/* Kanan: List Kabupaten dari Provinsi Aktif */}
                                <div className="w-full md:w-2/3 bg-gray-50 p-3 overflow-y-auto">
                                    {!activeProvForRegency ? (
                                        <div className="h-full flex items-center justify-center text-gray-400 text-xs">
                                            ← Pilih Provinsi di sebelah kiri
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 gap-1">
                                            {regionData.provinces.find(p => p.code === activeProvForRegency)?.regencies.map(reg => (
                                                <label key={reg.code} className="flex items-center gap-3 p-2 bg-white rounded border border-gray-100 cursor-pointer hover:border-blue-300 transition-all text-xs">
                                                    <input 
                                                        type="checkbox" 
                                                        checked={value.regencies.includes(reg.code)}
                                                        onChange={() => toggleRegency(reg.code)}
                                                        className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 border-gray-300"
                                                    />
                                                    <span className="text-gray-700">{reg.type === 'Kota' ? 'Kota' : 'Kab.'} {reg.name}</span>
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
// // // // // // 'use client';

// // // // // // import { useState, useEffect } from 'react';
// // // // // // import regionDataRaw from '@/data/indonesia_provinces_regencies.json'; 

// // // // // // // Type definition for JSON structure
// // // // // // type Regency = { code: string; name: string; type: string };
// // // // // // type Province = { code: string; name: string; regencies: Regency[] };
// // // // // // type RegionData = { provinces: Province[] };

// // // // // // const regionData = regionDataRaw as RegionData;

// // // // // // interface Props {
// // // // // //     value: {
// // // // // //         scope: 'national' | 'province' | 'regency';
// // // // // //         provinces: string[];
// // // // // //         regencies: string[];
// // // // // //     };
// // // // // //     onChange: (val: any) => void;
// // // // // // }

// // // // // // export default function RegionSelector({ value, onChange }: Props) {
// // // // // //     const [scope, setScope] = useState(value.scope);
    
// // // // // //     // Handler ganti scope
// // // // // //     const handleScopeChange = (newScope: 'national' | 'province' | 'regency') => {
// // // // // //         setScope(newScope);
// // // // // //         // Reset pilihan jika naik level (misal dari regency ke national)
// // // // // //         onChange({ ...value, scope: newScope, provinces: [], regencies: [] });
// // // // // //     };

// // // // // //     // Handler centang provinsi
// // // // // //     const toggleProvince = (code: string) => {
// // // // // //         const current = value.provinces || [];
// // // // // //         const newProvs = current.includes(code) 
// // // // // //             ? current.filter(c => c !== code) 
// // // // // //             : [...current, code];
        
// // // // // //         onChange({ ...value, provinces: newProvs });
// // // // // //     };

// // // // // //     // Handler centang kabupaten
// // // // // //     const toggleRegency = (code: string) => {
// // // // // //         const current = value.regencies || [];
// // // // // //         const newRegs = current.includes(code)
// // // // // //             ? current.filter(c => c !== code)
// // // // // //             : [...current, code];
        
// // // // // //         onChange({ ...value, regencies: newRegs });
// // // // // //     };

// // // // // //     // Filter kabupaten yang ditampilkan (hanya dari provinsi yang dipilih)
// // // // // //     const activeProvinces = regionData.provinces.filter(p => value.provinces.includes(p.code));

// // // // // //     return (
// // // // // //         <div className="space-y-4 border p-4 rounded-xl bg-gray-50">
// // // // // //             <h3 className="font-bold text-gray-700 text-sm">Cakupan Wilayah Tugas</h3>
            
// // // // // //             {/* 1. PILIH LEVEL */}
// // // // // //             <div className="flex gap-4 text-sm">
// // // // // //                 <label className="flex items-center gap-2 cursor-pointer">
// // // // // //                     <input type="radio" checked={scope === 'national'} onChange={() => handleScopeChange('national')} className="text-red-600"/>
// // // // // //                     <span>Nasional</span>
// // // // // //                 </label>
// // // // // //                 <label className="flex items-center gap-2 cursor-pointer">
// // // // // //                     <input type="radio" checked={scope === 'province'} onChange={() => handleScopeChange('province')} className="text-red-600"/>
// // // // // //                     <span>Provinsi</span>
// // // // // //                 </label>
// // // // // //                 <label className="flex items-center gap-2 cursor-pointer">
// // // // // //                     <input type="radio" checked={scope === 'regency'} onChange={() => handleScopeChange('regency')} className="text-red-600"/>
// // // // // //                     <span>Kabupaten/Kota</span>
// // // // // //                 </label>
// // // // // //             </div>

// // // // // //             {/* 2. PILIH PROVINSI (Muncul jika scope != national) */}
// // // // // //             {scope !== 'national' && (
// // // // // //                 <div className="mt-2">
// // // // // //                     <p className="text-xs font-bold text-gray-500 mb-2">Pilih Provinsi:</p>
// // // // // //                     <div className="h-48 overflow-y-auto border p-2 bg-white rounded grid grid-cols-2 gap-2 text-xs">
// // // // // //                         {regionData.provinces.map(p => (
// // // // // //                             <label key={p.code} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
// // // // // //                                 <input 
// // // // // //                                     type="checkbox" 
// // // // // //                                     checked={value.provinces.includes(p.code)} 
// // // // // //                                     onChange={() => toggleProvince(p.code)}
// // // // // //                                     className="rounded text-red-600"
// // // // // //                                 />
// // // // // //                                 {p.name}
// // // // // //                             </label>
// // // // // //                         ))}
// // // // // //                     </div>
// // // // // //                 </div>
// // // // // //             )}

// // // // // //             {/* 3. PILIH KABUPATEN (Muncul hanya jika scope == regency) */}
// // // // // //             {scope === 'regency' && value.provinces.length > 0 && (
// // // // // //                 <div className="mt-2">
// // // // // //                     <p className="text-xs font-bold text-gray-500 mb-2">Pilih Kabupaten/Kota (dari Provinsi terpilih):</p>
// // // // // //                     <div className="h-60 overflow-y-auto border p-2 bg-white rounded space-y-3">
// // // // // //                         {activeProvinces.map(prov => (
// // // // // //                             <div key={prov.code}>
// // // // // //                                 <p className="font-bold text-red-600 text-[10px] mb-1 sticky top-0 bg-white py-1">{prov.name}</p>
// // // // // //                                 <div className="grid grid-cols-2 gap-2 text-xs pl-2 border-l-2 border-red-100">
// // // // // //                                     {prov.regencies.map(reg => (
// // // // // //                                         <label key={reg.code} className="flex items-center gap-2 cursor-pointer">
// // // // // //                                             <input 
// // // // // //                                                 type="checkbox" 
// // // // // //                                                 checked={value.regencies.includes(reg.code)}
// // // // // //                                                 onChange={() => toggleRegency(reg.code)}
// // // // // //                                                 className="rounded text-blue-600"
// // // // // //                                             />
// // // // // //                                             {reg.type === 'Kota' ? 'Kota ' : ''}{reg.name}
// // // // // //                                         </label>
// // // // // //                                     ))}
// // // // // //                                 </div>
// // // // // //                             </div>
// // // // // //                         ))}
// // // // // //                     </div>
// // // // // //                 </div>
// // // // // //             )}
            
// // // // // //             {scope === 'regency' && value.provinces.length === 0 && (
// // // // // //                 <p className="text-xs text-red-500 italic">* Pilih minimal satu provinsi di atas untuk melihat daftar kabupaten.</p>
// // // // // //             )}
// // // // // //         </div>
// // // // // //     );
// // // // // // }


// // // // 'use client';

// // // // import { useState, useMemo } from 'react';
// // // // import { Search, MapPin, CheckCircle, Circle, ChevronRight } from 'lucide-react';
// // // // import regionDataRaw from '../../data/indonesia_provinces_regencies.json'; 

// // // // type Regency = { code: string; name: string; type: string };
// // // // type Province = { code: string; name: string; regencies: Regency[] };
// // // // type RegionData = { provinces: Province[] };

// // // // const regionData = regionDataRaw as RegionData;

// // // // interface Props {
// // // //     value: {
// // // //         scope: 'national' | 'province' | 'regency';
// // // //         provinces: string[];
// // // //         regencies: string[];
// // // //     };
// // // //     onChange: (val: any) => void;
// // // // }

// // // // export default function RegionSelector({ value, onChange }: Props) {
// // // //     const [searchTerm, setSearchTerm] = useState('');
// // // //     const [activeProvForRegency, setActiveProvForRegency] = useState<string | null>(null);

// // // //     // Handler ganti scope
// // // //     const handleScopeChange = (newScope: 'national' | 'province' | 'regency') => {
// // // //         onChange({ ...value, scope: newScope, provinces: [], regencies: [] });
// // // //         setActiveProvForRegency(null);
// // // //     };

// // // //     // Toggle Provinsi
// // // //     const toggleProvince = (code: string) => {
// // // //         const current = value.provinces || [];
// // // //         const newProvs = current.includes(code) ? current.filter(c => c !== code) : [...current, code];
// // // //         onChange({ ...value, provinces: newProvs });
// // // //     };

// // // //     // Toggle Kabupaten
// // // //     const toggleRegency = (code: string) => {
// // // //         const current = value.regencies || [];
// // // //         const newRegs = current.includes(code) ? current.filter(c => c !== code) : [...current, code];
// // // //         onChange({ ...value, regencies: newRegs });
// // // //     };

// // // //     // Filter Provinsi berdasarkan Search
// // // //     const filteredProvinces = useMemo(() => {
// // // //         return regionData.provinces.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
// // // //     }, [searchTerm]);

// // // //     // Provinsi yang dipilih (untuk tab Kabupaten)
// // // //     const selectedProvincesList = useMemo(() => {
// // // //         return regionData.provinces.filter(p => value.provinces.includes(p.code));
// // // //     }, [value.provinces]);

// // // //     return (
// // // //         <div className="border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden">
// // // //             {/* 1. HEADER & SCOPE SELECTION */}
// // // //             <div className="bg-gray-50 p-4 border-b border-gray-200">
// // // //                 <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Cakupan Wilayah Tugas</h4>
// // // //                 <div className="flex flex-wrap gap-2">
// // // //                     {['national', 'province', 'regency'].map((scope) => (
// // // //                         <button
// // // //                             key={scope}
// // // //                             onClick={() => handleScopeChange(scope as any)}
// // // //                             className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all flex items-center gap-2 ${
// // // //                                 value.scope === scope 
// // // //                                 ? 'bg-red-600 text-white border-red-600 shadow-md' 
// // // //                                 : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100'
// // // //                             }`}
// // // //                         >
// // // //                             {value.scope === scope ? <CheckCircle size={14}/> : <Circle size={14}/>}
// // // //                             {scope === 'national' ? 'Nasional (Seluruh Indonesia)' : 
// // // //                              scope === 'province' ? 'Pilih Provinsi' : 'Pilih Kabupaten/Kota'}
// // // //                         </button>
// // // //                     ))}
// // // //                 </div>
// // // //             </div>

// // // //             {/* 2. CONTENT AREA */}
// // // //             <div className="p-4">
// // // //                 {value.scope === 'national' && (
// // // //                     <div className="text-center py-8 text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
// // // //                         <MapPin size={32} className="mx-auto mb-2 opacity-50"/>
// // // //                         <p className="text-sm font-medium">Admin memiliki akses ke seluruh data Nasional.</p>
// // // //                     </div>
// // // //                 )}

// // // //                 {/* PILIH PROVINSI */}
// // // //                 {value.scope !== 'national' && (
// // // //                     <div className="space-y-4">
// // // //                         {/* Search Bar */}
// // // //                         <div className="relative">
// // // //                             <Search className="absolute left-3 top-2.5 text-gray-400" size={16}/>
// // // //                             <input 
// // // //                                 type="text" 
// // // //                                 placeholder="Cari Provinsi..." 
// // // //                                 className="w-full pl-9 p-2 border rounded-lg text-sm bg-gray-50 focus:bg-white transition-colors outline-none focus:ring-2 focus:ring-red-100"
// // // //                                 value={searchTerm}
// // // //                                 onChange={e => setSearchTerm(e.target.value)}
// // // //                             />
// // // //                         </div>

// // // //                         {/* List Provinsi (Grid & Scrollable) */}
// // // //                         <div className="border rounded-xl overflow-hidden">
// // // //                             <div className="bg-gray-100 px-4 py-2 text-[10px] font-bold text-gray-500 uppercase">Daftar Provinsi</div>
// // // //                             <div className="h-64 overflow-y-auto p-2 bg-white grid grid-cols-1 md:grid-cols-2 gap-1 custom-scrollbar">
// // // //                                 {filteredProvinces.map(p => (
// // // //                                     <label key={p.code} className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors text-xs font-medium ${value.provinces.includes(p.code) ? 'bg-red-50 text-red-700' : 'hover:bg-gray-50 text-gray-700'}`}>
// // // //                                         <input 
// // // //                                             type="checkbox" 
// // // //                                             checked={value.provinces.includes(p.code)} 
// // // //                                             onChange={() => toggleProvince(p.code)}
// // // //                                             className="rounded text-red-600 focus:ring-red-500 w-4 h-4 border-gray-300"
// // // //                                         />
// // // //                                         {p.name}
// // // //                                     </label>
// // // //                                 ))}
// // // //                                 {filteredProvinces.length === 0 && <p className="text-xs text-gray-400 p-2 col-span-2 text-center">Provinsi tidak ditemukan.</p>}
// // // //                             </div>
// // // //                         </div>
// // // //                     </div>
// // // //                 )}

// // // //                 {/* PILIH KABUPATEN (Hanya jika scope Regency & Provinsi sudah dipilih) */}
// // // //                 {value.scope === 'regency' && (
// // // //                     <div className="mt-6 pt-6 border-t border-gray-100 animate-in slide-in-from-bottom-2">
// // // //                         <h4 className="text-xs font-bold text-gray-700 mb-3 flex items-center gap-2">
// // // //                             <MapPin size={14}/> Pilih Kabupaten/Kota
// // // //                         </h4>
                        
// // // //                         {value.provinces.length === 0 ? (
// // // //                             <p className="text-xs text-orange-600 bg-orange-50 p-3 rounded-lg border border-orange-100">
// // // //                                 ⚠️ Mohon pilih minimal satu Provinsi di atas terlebih dahulu.
// // // //                             </p>
// // // //                         ) : (
// // // //                             <div className="flex flex-col md:flex-row gap-4 h-80 border rounded-xl overflow-hidden bg-gray-50">
// // // //                                 {/* Kiri: List Provinsi Terpilih */}
// // // //                                 <div className="w-full md:w-1/3 border-r border-gray-200 bg-white overflow-y-auto">
// // // //                                     {selectedProvincesList.map(p => (
// // // //                                         <button 
// // // //                                             key={p.code}
// // // //                                             onClick={() => setActiveProvForRegency(p.code)}
// // // //                                             className={`w-full text-left px-4 py-3 text-xs font-bold flex justify-between items-center border-b border-gray-50 ${activeProvForRegency === p.code ? 'bg-red-50 text-red-700' : 'text-gray-600 hover:bg-gray-50'}`}
// // // //                                         >
// // // //                                             {p.name}
// // // //                                             <ChevronRight size={14} className={activeProvForRegency === p.code ? 'text-red-500' : 'text-gray-300'}/>
// // // //                                         </button>
// // // //                                     ))}
// // // //                                 </div>

// // // //                                 {/* Kanan: List Kabupaten dari Provinsi Aktif */}
// // // //                                 <div className="w-full md:w-2/3 bg-gray-50 p-3 overflow-y-auto">
// // // //                                     {!activeProvForRegency ? (
// // // //                                         <div className="h-full flex items-center justify-center text-gray-400 text-xs">
// // // //                                             ← Pilih Provinsi di sebelah kiri
// // // //                                         </div>
// // // //                                     ) : (
// // // //                                         <div className="grid grid-cols-1 gap-1">
// // // //                                             {regionData.provinces.find(p => p.code === activeProvForRegency)?.regencies.map(reg => (
// // // //                                                 <label key={reg.code} className="flex items-center gap-3 p-2 bg-white rounded border border-gray-100 cursor-pointer hover:border-blue-300 transition-all text-xs">
// // // //                                                     <input 
// // // //                                                         type="checkbox" 
// // // //                                                         checked={value.regencies.includes(reg.code)}
// // // //                                                         onChange={() => toggleRegency(reg.code)}
// // // //                                                         className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 border-gray-300"
// // // //                                                     />
// // // //                                                     <span className="text-gray-700">{reg.type === 'Kota' ? 'Kota' : 'Kab.'} {reg.name}</span>
// // // //                                                 </label>
// // // //                                             ))}
// // // //                                         </div>
// // // //                                     )}
// // // //                                 </div>
// // // //                             </div>
// // // //                         )}
// // // //                     </div>
// // // //                 )}
// // // //             </div>
// // // //         </div>
// // // //     );
// // // // }


// // // 'use client';

// // // import { useState, useEffect } from 'react';
// // // import { ChevronDown, Loader2 } from 'lucide-react';

// // // interface RegionSelectorProps {
// // //     value: {
// // //         scope: 'national' | 'province' | 'regency';
// // //         provinces: string[];
// // //         regencies: string[];
// // //     };
// // //     onChange: (val: any) => void;
// // //     disabled?: boolean;
// // // }

// // // export default function RegionSelector({ value, onChange, disabled = false }: RegionSelectorProps) {
// // //     const [provincesData, setProvincesData] = useState<any[]>([]);
// // //     const [regenciesData, setRegenciesData] = useState<any[]>([]);
// // //     const [loadingProv, setLoadingProv] = useState(false);
// // //     const [loadingReg, setLoadingReg] = useState(false);

// // //     // 1. Load Data Provinsi
// // //     useEffect(() => {
// // //         const fetchProvinces = async () => {
// // //             setLoadingProv(true);
// // //             try {
// // //                 const res = await fetch('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json');
// // //                 const data = await res.json();
// // //                 setProvincesData(data);
// // //             } catch (e) { 
// // //                 console.error("Gagal load provinsi", e); 
// // //             } finally { 
// // //                 setLoadingProv(false); 
// // //             }
// // //         };
// // //         fetchProvinces();
// // //     }, []);

// // //     // 2. Load Data Kabupaten
// // //     useEffect(() => {
// // //         const fetchRegencies = async () => {
// // //             if (value.scope === 'regency' && value.provinces.length > 0) {
// // //                 const provName = value.provinces[0];
// // //                 const selectedProv = provincesData.find(p => p.name === provName);
                
// // //                 if (selectedProv) {
// // //                     setLoadingReg(true);
// // //                     try {
// // //                         const res = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProv.id}.json`);
// // //                         const data = await res.json();
// // //                         setRegenciesData(data);
// // //                     } catch (e) { 
// // //                         console.error("Gagal load kabupaten", e); 
// // //                     } finally { 
// // //                         setLoadingReg(false); 
// // //                     }
// // //                 }
// // //             }
// // //         };

// // //         if (provincesData.length > 0) {
// // //             fetchRegencies();
// // //         }
// // //     }, [value.scope, value.provinces, provincesData]);

// // //     const handleScopeChange = (scope: 'national' | 'province' | 'regency') => {
// // //         if (disabled) return;
// // //         onChange({ ...value, scope, provinces: [], regencies: [] });
// // //     };

// // //     const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
// // //         if (disabled) return;
// // //         const provName = e.target.value;
// // //         onChange({ ...value, provinces: [provName], regencies: [] }); 
// // //     };

// // //     const handleRegencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
// // //         if (disabled) return;
// // //         onChange({ ...value, regencies: [e.target.value] });
// // //     };

// // //     return (
// // //         <div className={`space-y-4 transition-opacity ${disabled ? 'opacity-60 pointer-events-none grayscale' : ''}`}>
            
// // //             {/* 1. PILIHAN SCOPE */}
// // //             <div className="flex flex-wrap gap-4">
// // //                 <label className={`flex items-center gap-2 px-4 py-3 border rounded-xl cursor-pointer transition-all ${value.scope === 'national' ? 'bg-red-50 border-red-500 text-red-700 font-bold' : 'bg-white border-gray-200 hover:border-gray-300'}`}>
// // //                     <input 
// // //                         type="radio" name="scope" className="accent-red-600 w-4 h-4"
// // //                         checked={value.scope === 'national'} 
// // //                         onChange={() => handleScopeChange('national')}
// // //                         disabled={disabled}
// // //                     />
// // //                     <span className="text-sm">Nasional</span>
// // //                 </label>

// // //                 <label className={`flex items-center gap-2 px-4 py-3 border rounded-xl cursor-pointer transition-all ${value.scope === 'province' ? 'bg-red-50 border-red-500 text-red-700 font-bold' : 'bg-white border-gray-200 hover:border-gray-300'}`}>
// // //                     <input 
// // //                         type="radio" name="scope" className="accent-red-600 w-4 h-4"
// // //                         checked={value.scope === 'province'} 
// // //                         onChange={() => handleScopeChange('province')}
// // //                         disabled={disabled}
// // //                     />
// // //                     <span className="text-sm">Provinsi</span>
// // //                 </label>

// // //                 <label className={`flex items-center gap-2 px-4 py-3 border rounded-xl cursor-pointer transition-all ${value.scope === 'regency' ? 'bg-red-50 border-red-500 text-red-700 font-bold' : 'bg-white border-gray-200 hover:border-gray-300'}`}>
// // //                     <input 
// // //                         type="radio" name="scope" className="accent-red-600 w-4 h-4"
// // //                         checked={value.scope === 'regency'} 
// // //                         onChange={() => handleScopeChange('regency')}
// // //                         disabled={disabled}
// // //                     />
// // //                     <span className="text-sm">Kabupaten/Kota</span>
// // //                 </label>
// // //             </div>

// // //             {/* 2. DROPDOWN PROVINSI */}
// // //             {(value.scope === 'province' || value.scope === 'regency') && (
// // //                 <div className="animate-in fade-in slide-in-from-top-2">
// // //                     <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">
// // //                         Pilih Provinsi {loadingProv && <span className="text-blue-500 animate-pulse">(Memuat...)</span>}
// // //                     </label>
// // //                     <div className="relative">
// // //                         <select 
// // //                             className="w-full p-3 pl-4 pr-10 border border-gray-300 rounded-xl appearance-none bg-white focus:ring-2 focus:ring-red-500 outline-none text-sm font-medium disabled:bg-gray-100"
// // //                             value={value.provinces[0] || ''}
// // //                             onChange={handleProvinceChange}
// // //                             disabled={disabled || loadingProv}
// // //                             aria-label="Pilih Provinsi" // <--- FIX ERROR ACCESSBILITY
// // //                         >
// // //                             <option value="">-- Pilih Provinsi --</option>
// // //                             {provincesData.map((p) => (
// // //                                 <option key={p.id} value={p.name}>{p.name}</option>
// // //                             ))}
// // //                         </select>
// // //                         <div className="absolute right-3 top-3.5 text-gray-400 pointer-events-none">
// // //                             {loadingProv ? <Loader2 size={16} className="animate-spin"/> : <ChevronDown size={16}/>}
// // //                         </div>
// // //                     </div>
// // //                 </div>
// // //             )}

// // //             {/* 3. DROPDOWN KABUPATEN */}
// // //             {value.scope === 'regency' && value.provinces.length > 0 && (
// // //                 <div className="animate-in fade-in slide-in-from-top-2">
// // //                     <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">
// // //                         Pilih Kabupaten/Kota {loadingReg && <span className="text-blue-500 animate-pulse">(Memuat...)</span>}
// // //                     </label>
// // //                     <div className="relative">
// // //                         <select 
// // //                             className="w-full p-3 pl-4 pr-10 border border-gray-300 rounded-xl appearance-none bg-white focus:ring-2 focus:ring-red-500 outline-none text-sm font-medium disabled:bg-gray-100"
// // //                             value={value.regencies[0] || ''}
// // //                             onChange={handleRegencyChange}
// // //                             disabled={disabled || loadingReg}
// // //                             aria-label="Pilih Kabupaten/Kota" // <--- FIX ERROR ACCESSBILITY
// // //                         >
// // //                             <option value="">-- Pilih Kabupaten --</option>
// // //                             {regenciesData.map((r) => (
// // //                                 <option key={r.id} value={r.name}>{r.name}</option>
// // //                             ))}
// // //                         </select>
// // //                         <div className="absolute right-3 top-3.5 text-gray-400 pointer-events-none">
// // //                             {loadingReg ? <Loader2 size={16} className="animate-spin"/> : <ChevronDown size={16}/>}
// // //                         </div>
// // //                     </div>
// // //                 </div>
// // //             )}
// // //         </div>
// // //     );
// // // }


// // 'use client';

// // import { useState, useMemo, useEffect } from 'react';
// // import { Search, MapPin, CheckCircle, Circle, ChevronRight } from 'lucide-react';
// // // Import JSON Lokal
// // import regionDataRaw from '../../data/indonesia_provinces_regencies.json'; 

// // type Regency = { code: string; name: string; type: string };
// // type Province = { code: string; name: string; regencies: Regency[] };
// // type RegionData = { provinces: Province[] };

// // const regionData = regionDataRaw as RegionData;

// // interface Props {
// //     value: {
// //         scope: 'national' | 'province' | 'regency';
// //         provinces: string[]; // Berisi Array CODE
// //         regencies: string[]; // Berisi Array CODE
// //     };
// //     onChange: (val: any) => void;
// //     disabled?: boolean; // Prop untuk mengunci
// // }

// // export default function RegionSelector({ value, onChange, disabled = false }: Props) {
// //     const [searchTerm, setSearchTerm] = useState('');
// //     const [activeProvForRegency, setActiveProvForRegency] = useState<string | null>(null);

// //     // Auto-select active province saat mode edit/terkunci
// //     useEffect(() => {
// //         if (value.scope === 'regency' && value.provinces.length > 0 && !activeProvForRegency) {
// //             setActiveProvForRegency(value.provinces[0]);
// //         }
// //     }, [value.scope, value.provinces]);

// //     const handleScopeChange = (newScope: 'national' | 'province' | 'regency') => {
// //         if (disabled) return;
// //         onChange({ ...value, scope: newScope, provinces: [], regencies: [] });
// //         setActiveProvForRegency(null);
// //     };

// //     const toggleProvince = (code: string) => {
// //         if (disabled) return;
// //         const newProvs = [code]; // Single select
// //         onChange({ ...value, provinces: newProvs });
// //         if (value.scope === 'regency') setActiveProvForRegency(code);
// //     };

// //     const toggleRegency = (code: string) => {
// //         if (disabled) return;
// //         const newRegs = [code];
// //         onChange({ ...value, regencies: newRegs });
// //     };

// //     const filteredProvinces = useMemo(() => {
// //         return regionData.provinces.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
// //     }, [searchTerm]);

// //     // Provinsi yang dipilih
// //     const selectedProvincesList = useMemo(() => {
// //         return regionData.provinces.filter(p => value.provinces.includes(p.code));
// //     }, [value.provinces]);

// //     return (
// //         <div className={`border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden transition-all ${disabled ? 'opacity-80 bg-gray-50 pointer-events-none' : ''}`}>
            
// //             {/* HEADER */}
// //             <div className="bg-gray-50 p-4 border-b border-gray-200">
// //                 <div className="flex justify-between items-center mb-3">
// //                     <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Cakupan Wilayah Tugas</h4>
// //                     {disabled && <span className="text-[10px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded border border-orange-200 font-bold flex items-center gap-1"><MapPin size={10}/> TERKUNCI SESUAI DOMISILI</span>}
// //                 </div>
// //                 <div className="flex flex-wrap gap-2">
// //                     {['national', 'province', 'regency'].map((scope) => (
// //                         <button
// //                             key={scope}
// //                             type="button"
// //                             onClick={() => handleScopeChange(scope as any)}
// //                             className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all flex items-center gap-2 ${
// //                                 value.scope === scope 
// //                                 ? 'bg-red-600 text-white border-red-600 shadow-md' 
// //                                 : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100'
// //                             } ${disabled && value.scope !== scope ? 'opacity-50' : ''}`}
// //                         >
// //                             {value.scope === scope ? <CheckCircle size={14}/> : <Circle size={14}/>}
// //                             {scope === 'national' ? 'Nasional' : scope === 'province' ? 'Provinsi' : 'Kab/Kota'}
// //                         </button>
// //                     ))}
// //                 </div>
// //             </div>

// //             {/* CONTENT */}
// //             <div className="p-4">
// //                 {value.scope === 'national' && (
// //                     <div className="text-center py-8 text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
// //                         <MapPin size={32} className="mx-auto mb-2 opacity-50"/>
// //                         <p className="text-sm font-medium">Cakupan Seluruh Indonesia (Nasional)</p>
// //                     </div>
// //                 )}

// //                 {value.scope !== 'national' && (
// //                     <div className="space-y-4">
// //                         {!disabled && (
// //                             <div className="relative">
// //                                 <Search className="absolute left-3 top-2.5 text-gray-400" size={16}/>
// //                                 <input 
// //                                     type="text" placeholder="Cari Provinsi..." 
// //                                     className="w-full pl-9 p-2 border rounded-lg text-sm bg-gray-50 focus:bg-white transition-colors outline-none focus:ring-2 focus:ring-red-100"
// //                                     value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
// //                                 />
// //                             </div>
// //                         )}

// //                         <div className="border rounded-xl overflow-hidden">
// //                             <div className="bg-gray-100 px-4 py-2 text-[10px] font-bold text-gray-500 uppercase flex justify-between">
// //                                 <span>DAFTAR PROVINSI</span>
// //                                 {/* Tampilkan nama provinsi yang dipilih jika terkunci */}
// //                                 {disabled && selectedProvincesList.length > 0 && <span className="text-red-600 font-bold">{selectedProvincesList[0].name.toUpperCase()}</span>}
// //                             </div>
// //                             <div className="h-48 overflow-y-auto p-2 bg-white grid grid-cols-1 md:grid-cols-2 gap-1 custom-scrollbar">
// //                                 {(disabled ? selectedProvincesList : filteredProvinces).map(p => (
// //                                     <label key={p.code} className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors text-xs font-medium ${value.provinces.includes(p.code) ? 'bg-red-50 text-red-700 ring-1 ring-red-100' : 'hover:bg-gray-50 text-gray-700'}`}>
// //                                         <input 
// //                                             type="radio" name="province_select"
// //                                             checked={value.provinces.includes(p.code)} 
// //                                             onChange={() => toggleProvince(p.code)}
// //                                             className="accent-red-600 w-4 h-4"
// //                                             disabled={disabled}
// //                                         />
// //                                         {p.name}
// //                                     </label>
// //                                 ))}
// //                             </div>
// //                         </div>
// //                     </div>
// //                 )}

// //                 {value.scope === 'regency' && (
// //                     <div className="mt-6 pt-6 border-t border-gray-100 animate-in slide-in-from-bottom-2">
// //                         <h4 className="text-xs font-bold text-gray-700 mb-3 flex items-center gap-2"><MapPin size={14}/> Pilih Kabupaten/Kota</h4>
// //                         {value.provinces.length === 0 ? (
// //                             <p className="text-xs text-orange-600 bg-orange-50 p-3 rounded-lg border border-orange-100">⚠️ Pilih Provinsi terlebih dahulu.</p>
// //                         ) : (
// //                             <div className="flex flex-col md:flex-row gap-4 h-64 border rounded-xl overflow-hidden bg-gray-50">
// //                                 <div className="w-full md:w-1/3 border-r border-gray-200 bg-white overflow-y-auto">
// //                                     {selectedProvincesList.map(p => (
// //                                         <button key={p.code} type="button" onClick={() => setActiveProvForRegency(p.code)} className={`w-full text-left px-4 py-3 text-xs font-bold flex justify-between items-center border-b border-gray-50 ${activeProvForRegency === p.code ? 'bg-red-50 text-red-700' : 'text-gray-600 hover:bg-gray-50'}`} disabled={disabled}>
// //                                             {p.name} <ChevronRight size={14} className={activeProvForRegency === p.code ? 'text-red-500' : 'text-gray-300'}/>
// //                                         </button>
// //                                     ))}
// //                                 </div>
// //                                 <div className="w-full md:w-2/3 bg-gray-50 p-3 overflow-y-auto">
// //                                     {!activeProvForRegency ? (
// //                                         <div className="h-full flex items-center justify-center text-gray-400 text-xs">← Pilih Provinsi</div>
// //                                     ) : (
// //                                         <div className="grid grid-cols-1 gap-1">
// //                                             {regionData.provinces.find(p => p.code === activeProvForRegency)?.regencies.map(reg => (
// //                                                 <label key={reg.code} className={`flex items-center gap-3 p-2 bg-white rounded border cursor-pointer transition-all text-xs ${value.regencies.includes(reg.code) ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-100 hover:border-blue-300'}`}>
// //                                                     <input type="radio" name="regency_select" checked={value.regencies.includes(reg.code)} onChange={() => toggleRegency(reg.code)} className="accent-blue-600 w-4 h-4" disabled={disabled} />
// //                                                     <span className="text-gray-700">{reg.type === 'Kota' ? 'Kota' : 'Kab.'} {reg.name}</span>
// //                                                 </label>
// //                                             ))}
// //                                         </div>
// //                                     )}
// //                                 </div>
// //                             </div>
// //                         )}
// //                     </div>
// //                 )}
// //             </div>
// //         </div>
// //     );
// // }


// 'use client';

// import { useState, useMemo, useEffect } from 'react';
// import { Search, MapPin, CheckCircle, Circle, ChevronRight, Lock } from 'lucide-react';
// import regionDataRaw from '../../data/indonesia_provinces_regencies.json'; 

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
//     disabled?: boolean;
// }

// export default function RegionSelector({ value, onChange, disabled = false }: Props) {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [activeProvForRegency, setActiveProvForRegency] = useState<string | null>(null);

//     // Auto-select active province
//     useEffect(() => {
//         if (value.scope === 'regency' && value.provinces.length > 0 && !activeProvForRegency) {
//             setActiveProvForRegency(value.provinces[0]);
//         }
//     }, [value.scope, value.provinces]);

//     const handleScopeChange = (newScope: 'national' | 'province' | 'regency') => {
//         if (disabled) return;
//         onChange({ ...value, scope: newScope, provinces: [], regencies: [] });
//         setActiveProvForRegency(null);
//     };

//     const toggleProvince = (code: string) => {
//         if (disabled) return;
//         onChange({ ...value, provinces: [code] });
//         if (value.scope === 'regency') setActiveProvForRegency(code);
//     };

//     const toggleRegency = (code: string) => {
//         if (disabled) return;
//         onChange({ ...value, regencies: [code] });
//     };

//     const filteredProvinces = useMemo(() => {
//         return regionData.provinces.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
//     }, [searchTerm]);

//     const selectedProvincesList = useMemo(() => {
//         return regionData.provinces.filter(p => value.provinces.includes(p.code));
//     }, [value.provinces]);

//     // --- TAMPILAN COMPACT SAAT TERKUNCI (GAMBAR 1) ---
//     if (disabled) {
//         // Cari nama wilayah yang terpilih untuk ditampilkan
//         let displayLocation = 'Nasional';
//         if (value.scope === 'province' && selectedProvincesList.length > 0) {
//             displayLocation = selectedProvincesList[0].name;
//         } else if (value.scope === 'regency' && activeProvForRegency) {
//             const prov = regionData.provinces.find(p => p.code === activeProvForRegency);
//             const reg = prov?.regencies.find(r => value.regencies.includes(r.code));
//             if (reg) displayLocation = `${reg.type === 'Kota' ? 'Kota' : 'Kab.'} ${reg.name}`;
//         }

//         return (
//             <div className="border border-gray-200 rounded-xl bg-gray-50 p-3 opacity-90">
//                 <div className="flex justify-between items-center mb-2">
//                     <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1">
//                         <Lock size={10} /> Cakupan Wilayah Tugas
//                     </h4>
//                     <span className="text-[9px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded border border-orange-200 font-bold">
//                         TERKUNCI
//                     </span>
//                 </div>
                
//                 {/* Tampilan Tab Statis */}
//                 <div className="flex gap-2 mb-2 opacity-60">
//                     <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded ${value.scope === 'national' ? 'bg-red-100 text-red-700' : 'text-gray-400'}`}>
//                         <Circle size={8} fill={value.scope === 'national' ? 'currentColor' : 'none'}/> Nasional
//                     </div>
//                     <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded ${value.scope === 'province' ? 'bg-red-100 text-red-700' : 'text-gray-400'}`}>
//                         <Circle size={8} fill={value.scope === 'province' ? 'currentColor' : 'none'}/> Provinsi
//                     </div>
//                     <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded ${value.scope === 'regency' ? 'bg-red-100 text-red-700' : 'text-gray-400'}`}>
//                         <Circle size={8} fill={value.scope === 'regency' ? 'currentColor' : 'none'}/> Kab/Kota
//                     </div>
//                 </div>

//                 {/* Tampilan Wilayah Terpilih (Kecil Saja) */}
//                 <div className="bg-white border border-gray-200 rounded-lg p-2 flex items-center gap-2 shadow-sm">
//                     <CheckCircle size={16} className="text-green-600"/>
//                     <span className="text-sm font-bold text-gray-800">{displayLocation}</span>
//                 </div>
//             </div>
//         );
//     }

//     // --- TAMPILAN NORMAL (INTERAKTIF) ---
//     return (
//         <div className="border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden">
//             <div className="bg-gray-50 p-4 border-b border-gray-200">
//                 <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Cakupan Wilayah Tugas</h4>
//                 <div className="flex flex-wrap gap-2">
//                     {[{id:'national', l:'Nasional'}, {id:'province', l:'Provinsi'}, {id:'regency', l:'Kab/Kota'}].map((opt) => (
//                         <button key={opt.id} type="button" onClick={() => handleScopeChange(opt.id as any)} className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all flex items-center gap-2 ${value.scope === opt.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100'}`}>
//                             {value.scope === opt.id ? <CheckCircle size={14}/> : <Circle size={14}/>} {opt.l}
//                         </button>
//                     ))}
//                 </div>
//             </div>

//             <div className="p-4">
//                 {value.scope === 'national' && (
//                     <div className="text-center py-4 text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200"><MapPin size={24} className="mx-auto mb-2 opacity-50"/><p className="text-xs font-medium">Cakupan Seluruh Indonesia</p></div>
//                 )}

//                 {value.scope !== 'national' && (
//                     <div className="space-y-3">
//                         <div className="relative">
//                             <Search className="absolute left-3 top-2.5 text-gray-400" size={14}/>
//                             <input type="text" placeholder="Cari Provinsi..." className="w-full pl-9 p-2 border rounded-lg text-xs" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}/>
//                         </div>
//                         <div className="border rounded-xl overflow-hidden">
//                             <div className="bg-gray-100 px-3 py-1.5 text-[10px] font-bold text-gray-500 uppercase">DAFTAR PROVINSI</div>
//                             <div className="h-40 overflow-y-auto p-2 bg-white grid grid-cols-1 md:grid-cols-2 gap-1 custom-scrollbar">
//                                 {filteredProvinces.map(p => (
//                                     <label key={p.code} className={`flex items-center gap-2 p-1.5 rounded cursor-pointer text-xs font-medium ${value.provinces.includes(p.code) ? 'bg-red-50 text-red-700' : 'hover:bg-gray-50 text-gray-700'}`}>
//                                         <input type="radio" name="province_select" checked={value.provinces.includes(p.code)} onChange={() => toggleProvince(p.code)} className="accent-red-600"/> {p.name}
//                                     </label>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {value.scope === 'regency' && (
//                     <div className="mt-4 pt-4 border-t border-gray-100">
//                         <h4 className="text-xs font-bold text-gray-700 mb-2 flex items-center gap-2"><MapPin size={12}/> Pilih Kabupaten/Kota</h4>
//                         {value.provinces.length === 0 ? (
//                             <p className="text-xs text-orange-600 bg-orange-50 p-2 rounded border border-orange-100">⚠️ Pilih Provinsi terlebih dahulu.</p>
//                         ) : (
//                             <div className="flex flex-col md:flex-row gap-2 h-48 border rounded-xl overflow-hidden bg-gray-50">
//                                 <div className="w-full md:w-1/3 border-r border-gray-200 bg-white overflow-y-auto p-1">
//                                     {selectedProvincesList.map(p => (
//                                         <button key={p.code} type="button" onClick={() => setActiveProvForRegency(p.code)} className={`w-full text-left px-3 py-2 text-xs font-bold rounded flex justify-between items-center ${activeProvForRegency === p.code ? 'bg-red-50 text-red-700' : 'text-gray-600 hover:bg-gray-50'}`}>
//                                             {p.name} <ChevronRight size={12}/>
//                                         </button>
//                                     ))}
//                                 </div>
//                                 <div className="w-full md:w-2/3 bg-gray-50 p-2 overflow-y-auto">
//                                     {!activeProvForRegency ? <div className="h-full flex items-center justify-center text-gray-400 text-xs">← Pilih Provinsi</div> : (
//                                         <div className="grid grid-cols-1 gap-1">
//                                             {regionData.provinces.find(p => p.code === activeProvForRegency)?.regencies.map(reg => (
//                                                 <label key={reg.code} className={`flex items-center gap-2 p-1.5 bg-white rounded border cursor-pointer text-xs ${value.regencies.includes(reg.code) ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-100 hover:border-blue-300'}`}>
//                                                     <input type="radio" name="regency_select" checked={value.regencies.includes(reg.code)} onChange={() => toggleRegency(reg.code)} className="accent-blue-600"/>
//                                                     <span className="truncate">{reg.type === 'Kota' ? 'Kota' : 'Kab.'} {reg.name}</span>
//                                                 </label>
//                                             ))}
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }


'use client';

import { useState, useMemo, useEffect } from 'react';
import { Search, MapPin, CheckCircle, Circle, ChevronRight, Lock } from 'lucide-react';
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
    disabled?: boolean;
}

export default function RegionSelector({ value, onChange, disabled = false }: Props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeProvForRegency, setActiveProvForRegency] = useState<string | null>(null);

    // Auto-select active province
    useEffect(() => {
        if (value.scope === 'regency' && value.provinces.length > 0 && !activeProvForRegency) {
            setActiveProvForRegency(value.provinces[0]);
        }
    }, [value.scope, value.provinces]);

    // [LOGIKA BARU: PINDAH TAB]
    const handleScopeChange = (newScope: 'national' | 'province' | 'regency') => {
        if (disabled) return;

        // Jika user pindah dari 'regency' ke 'province'
        // dan sebelumnya sudah memilih kabupaten yang terikat provinsi tertentu,
        // pertahankan provinsi tersebut sebagai 'checked'.
        if (newScope === 'province' && value.scope === 'regency' && value.provinces.length > 0) {
            onChange({ ...value, scope: newScope, provinces: value.provinces, regencies: [] });
        } 
        // Jika pindah ke Nasional atau lainnya, reset
        else {
            onChange({ ...value, scope: newScope, provinces: [], regencies: [] });
        }
        
        setActiveProvForRegency(null);
    };

    const toggleProvince = (code: string) => {
        if (disabled) return;
        // Logic Multiselect untuk mode Edit Permission, Single Select untuk Proposal
        // Kita asumsikan mode edit (Provinces array)
        const current = value.provinces || [];
        // Cek apakah mode single (proposal) atau multi (user edit)
        // Untuk amannya, kita buat toggle.
        const newProvs = current.includes(code) 
            ? current.filter(c => c !== code) 
            : [...current, code];
            
        onChange({ ...value, provinces: newProvs });
        if (value.scope === 'regency') setActiveProvForRegency(code);
    };

    const toggleRegency = (code: string) => {
        if (disabled) return;
        const current = value.regencies || [];
        const newRegs = current.includes(code) 
            ? current.filter(c => c !== code) 
            : [...current, code];
        onChange({ ...value, regencies: newRegs });
    };

    const filteredProvinces = useMemo(() => {
        return regionData.provinces.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [searchTerm]);

    const selectedProvincesList = useMemo(() => {
        return regionData.provinces.filter(p => value.provinces.includes(p.code));
    }, [value.provinces]);

    // COMPACT VIEW (SAAT DIKUNCI DI MODAL PROPOSAL)
    if (disabled) {
        let displayLocation = 'Nasional';
        if (value.scope === 'province' && selectedProvincesList.length > 0) {
            displayLocation = selectedProvincesList[0].name;
        } else if (value.scope === 'regency' && activeProvForRegency) {
            const prov = regionData.provinces.find(p => p.code === activeProvForRegency);
            const reg = prov?.regencies.find(r => value.regencies.includes(r.code));
            if (reg) displayLocation = `${reg.type === 'Kota' ? 'Kota' : 'Kab.'} ${reg.name}`;
        }

        return (
            <div className="border border-gray-200 rounded-xl bg-gray-50 p-3 opacity-90">
                <div className="flex justify-between items-center mb-2">
                    <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1">
                        <Lock size={10} /> Cakupan Wilayah Tugas
                    </h4>
                    <span className="text-[9px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded border border-orange-200 font-bold">TERKUNCI</span>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-2 flex items-center gap-2 shadow-sm">
                    <CheckCircle size={16} className="text-green-600"/>
                    <span className="text-sm font-bold text-gray-800">{displayLocation}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden">
            <div className="bg-gray-50 p-4 border-b border-gray-200">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Cakupan Wilayah Tugas</h4>
                <div className="flex flex-wrap gap-2">
                    {[{id:'national', l:'Nasional'}, {id:'province', l:'Provinsi'}, {id:'regency', l:'Kab/Kota'}].map((opt) => (
                        <button key={opt.id} type="button" onClick={() => handleScopeChange(opt.id as any)} className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all flex items-center gap-2 ${value.scope === opt.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100'}`}>
                            {value.scope === opt.id ? <CheckCircle size={14}/> : <Circle size={14}/>} {opt.l}
                        </button>
                    ))}
                </div>
            </div>

            <div className="p-4">
                {value.scope === 'national' && (
                    <div className="text-center py-4 text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200"><MapPin size={24} className="mx-auto mb-2 opacity-50"/><p className="text-xs font-medium">Cakupan Seluruh Indonesia</p></div>
                )}

                {value.scope !== 'national' && (
                    <div className="space-y-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 text-gray-400" size={14}/>
                            <input type="text" placeholder="Cari Provinsi..." className="w-full pl-9 p-2 border rounded-lg text-xs" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}/>
                        </div>
                        <div className="border rounded-xl overflow-hidden">
                            <div className="bg-gray-100 px-3 py-1.5 text-[10px] font-bold text-gray-500 uppercase">DAFTAR PROVINSI</div>
                            <div className="h-40 overflow-y-auto p-2 bg-white grid grid-cols-1 md:grid-cols-2 gap-1 custom-scrollbar">
                                {filteredProvinces.map(p => (
                                    <label key={p.code} className={`flex items-center gap-2 p-1.5 rounded cursor-pointer text-xs font-medium ${value.provinces.includes(p.code) ? 'bg-red-50 text-red-700' : 'hover:bg-gray-50 text-gray-700'}`}>
                                        <input type="checkbox" checked={value.provinces.includes(p.code)} onChange={() => toggleProvince(p.code)} className="rounded text-red-600 focus:ring-red-500 w-4 h-4 border-gray-300"/> {p.name}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {value.scope === 'regency' && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <h4 className="text-xs font-bold text-gray-700 mb-2 flex items-center gap-2"><MapPin size={12}/> Pilih Kabupaten/Kota</h4>
                        {value.provinces.length === 0 ? (
                            <p className="text-xs text-orange-600 bg-orange-50 p-2 rounded border border-orange-100">⚠️ Pilih Provinsi terlebih dahulu.</p>
                        ) : (
                            <div className="flex flex-col md:flex-row gap-2 h-48 border rounded-xl overflow-hidden bg-gray-50">
                                <div className="w-full md:w-1/3 border-r border-gray-200 bg-white overflow-y-auto p-1">
                                    {selectedProvincesList.map(p => (
                                        <button key={p.code} type="button" onClick={() => setActiveProvForRegency(p.code)} className={`w-full text-left px-3 py-2 text-xs font-bold rounded flex justify-between items-center ${activeProvForRegency === p.code ? 'bg-red-50 text-red-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                                            {p.name} <ChevronRight size={12}/>
                                        </button>
                                    ))}
                                </div>
                                <div className="w-full md:w-2/3 bg-gray-50 p-2 overflow-y-auto">
                                    {!activeProvForRegency ? <div className="h-full flex items-center justify-center text-gray-400 text-xs">← Pilih Provinsi</div> : (
                                        <div className="grid grid-cols-1 gap-1">
                                            {regionData.provinces.find(p => p.code === activeProvForRegency)?.regencies.map(reg => (
                                                <label key={reg.code} className={`flex items-center gap-2 p-1.5 bg-white rounded border cursor-pointer text-xs ${value.regencies.includes(reg.code) ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-100 hover:border-blue-300'}`}>
                                                    <input type="checkbox" checked={value.regencies.includes(reg.code)} onChange={() => toggleRegency(reg.code)} className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 border-gray-300"/>
                                                    <span className="truncate">{reg.type === 'Kota' ? 'Kota' : 'Kab.'} {reg.name}</span>
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
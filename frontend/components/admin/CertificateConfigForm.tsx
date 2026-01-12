// // // // // // // // // // 'use client';

// // // // // // // // // // import { useState, useEffect } from 'react';

// // // // // // // // // // // Tipe Data Config
// // // // // // // // // // interface CertConfig {
// // // // // // // // // //   certificateNumber: string;
// // // // // // // // // //   executionDate: string; // Format YYYY-MM-DD untuk input date
// // // // // // // // // //   city: string;
// // // // // // // // // //   signatoryName: string;
// // // // // // // // // //   signatoryPosition: string;
// // // // // // // // // // }

// // // // // // // // // // interface Props {
// // // // // // // // // //   initialData?: any;
// // // // // // // // // //   onSave: (data: CertConfig) => void;
// // // // // // // // // //   isSaving: boolean;
// // // // // // // // // // }

// // // // // // // // // // export default function CertificateConfigForm({ initialData, onSave, isSaving }: Props) {
// // // // // // // // // //   const [formData, setFormData] = useState<CertConfig>({
// // // // // // // // // //     certificateNumber: '',
// // // // // // // // // //     executionDate: new Date().toISOString().split('T')[0],
// // // // // // // // // //     city: '',
// // // // // // // // // //     signatoryName: '',
// // // // // // // // // //     signatoryPosition: ''
// // // // // // // // // //   });

// // // // // // // // // //   // Load data awal jika ada
// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     if (initialData) {
// // // // // // // // // //       setFormData({
// // // // // // // // // //         certificateNumber: initialData.certificateNumber || '',
// // // // // // // // // //         executionDate: initialData.executionDate 
// // // // // // // // // //           ? new Date(initialData.executionDate).toISOString().split('T')[0] 
// // // // // // // // // //           : new Date().toISOString().split('T')[0],
// // // // // // // // // //         city: initialData.city || '',
// // // // // // // // // //         signatoryName: initialData.signatoryName || '',
// // // // // // // // // //         signatoryPosition: initialData.signatoryPosition || ''
// // // // // // // // // //       });
// // // // // // // // // //     }
// // // // // // // // // //   }, [initialData]);

// // // // // // // // // //   const handleChange = (field: keyof CertConfig, value: string) => {
// // // // // // // // // //     setFormData(prev => ({ ...prev, [field]: value }));
// // // // // // // // // //   };

// // // // // // // // // //   // Helper untuk preview format tanggal Indonesia (18 September 2025)
// // // // // // // // // //   const getIndonesianDatePreview = (dateString: string) => {
// // // // // // // // // //     if (!dateString) return '-';
// // // // // // // // // //     try {
// // // // // // // // // //       const date = new Date(dateString);
// // // // // // // // // //       return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
// // // // // // // // // //     } catch (e) { return '-'; }
// // // // // // // // // //   };

// // // // // // // // // //   return (
// // // // // // // // // //     <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mt-6">
// // // // // // // // // //       <div className="flex justify-between items-center mb-6">
// // // // // // // // // //         <h3 className="text-lg font-bold text-gray-800">📜 Pengaturan Data Sertifikat</h3>
// // // // // // // // // //         <button
// // // // // // // // // //           onClick={() => onSave(formData)}
// // // // // // // // // //           disabled={isSaving}
// // // // // // // // // //           className="bg-purple-700 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-purple-800 disabled:opacity-50 flex items-center gap-2"
// // // // // // // // // //         >
// // // // // // // // // //           {isSaving ? 'Menyimpan...' : '💾 Simpan Pengaturan'}
// // // // // // // // // //         </button>
// // // // // // // // // //       </div>

// // // // // // // // // //       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
// // // // // // // // // //         {/* KOLOM KIRI: Data Pelaksanaan */}
// // // // // // // // // //         <div className="space-y-5">
// // // // // // // // // //           <h4 className="text-sm font-bold text-gray-500 uppercase border-b pb-2">Detail Pelaksanaan</h4>
          
// // // // // // // // // //           <div>
// // // // // // // // // //             <label className="block text-sm font-bold text-gray-700 mb-1">Nomor Sertifikat (SK)</label>
// // // // // // // // // //             <input
// // // // // // // // // //               type="text"
// // // // // // // // // //               placeholder="Contoh: 00204/DIKLAT/03.01.09/IX/2025"
// // // // // // // // // //               value={formData.certificateNumber}
// // // // // // // // // //               onChange={(e) => handleChange('certificateNumber', e.target.value)}
// // // // // // // // // //               className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
// // // // // // // // // //             />
// // // // // // // // // //           </div>

// // // // // // // // // //           <div>
// // // // // // // // // //             <label className="block text-sm font-bold text-gray-700 mb-1">Tanggal Dilaksanakan</label>
// // // // // // // // // //             <input
// // // // // // // // // //               type="date"
// // // // // // // // // //               value={formData.executionDate}
// // // // // // // // // //               onChange={(e) => handleChange('executionDate', e.target.value)}
// // // // // // // // // //               className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
// // // // // // // // // //             />
// // // // // // // // // //             <p className="text-xs text-green-600 mt-1 font-medium">
// // // // // // // // // //               Akan tertulis: {getIndonesianDatePreview(formData.executionDate)}
// // // // // // // // // //             </p>
// // // // // // // // // //           </div>

// // // // // // // // // //           <div>
// // // // // // // // // //             <label className="block text-sm font-bold text-gray-700 mb-1">Tempat Pelaksanaan (Kota)</label>
// // // // // // // // // //             <input
// // // // // // // // // //               type="text"
// // // // // // // // // //               placeholder="Contoh: Singaraja"
// // // // // // // // // //               value={formData.city}
// // // // // // // // // //               onChange={(e) => handleChange('city', e.target.value)}
// // // // // // // // // //               className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
// // // // // // // // // //             />
// // // // // // // // // //           </div>
// // // // // // // // // //         </div>

// // // // // // // // // //         {/* KOLOM KANAN: Penanda Tangan */}
// // // // // // // // // //         <div className="space-y-5 bg-gray-50 p-5 rounded-xl border border-gray-100">
// // // // // // // // // //           <h4 className="text-sm font-bold text-gray-500 uppercase border-b pb-2">Pejabat Penanda Tangan</h4>
          
// // // // // // // // // //           <div>
// // // // // // // // // //             <label className="block text-sm font-bold text-gray-700 mb-1">Jabatan</label>
// // // // // // // // // //             <input
// // // // // // // // // //               type="text"
// // // // // // // // // //               placeholder="Contoh: Ketua / Kepala Pusdiklat"
// // // // // // // // // //               value={formData.signatoryPosition}
// // // // // // // // // //               onChange={(e) => handleChange('signatoryPosition', e.target.value)}
// // // // // // // // // //               className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none bg-white"
// // // // // // // // // //             />
// // // // // // // // // //           </div>

// // // // // // // // // //           <div>
// // // // // // // // // //             <label className="block text-sm font-bold text-gray-700 mb-1">Nama Lengkap & Gelar</label>
// // // // // // // // // //             <input
// // // // // // // // // //               type="text"
// // // // // // // // // //               placeholder="Contoh: dr. I NYOMAN SUTJIDRA, Sp.OG"
// // // // // // // // // //               value={formData.signatoryName}
// // // // // // // // // //               onChange={(e) => handleChange('signatoryName', e.target.value)}
// // // // // // // // // //               className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none bg-white"
// // // // // // // // // //             />
// // // // // // // // // //           </div>

// // // // // // // // // //           <div className="text-xs text-gray-400 italic">
// // // // // // // // // //             *Data ini akan otomatis muncul di halaman depan dan belakang sertifikat PDF.
// // // // // // // // // //           </div>
// // // // // // // // // //         </div>

// // // // // // // // // //       </div>
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // }
// // // // // // // // // 'use client';

// // // // // // // // // import { useState, useEffect } from 'react';

// // // // // // // // // // Tipe Data Config
// // // // // // // // // interface CertConfig {
// // // // // // // // //   certificateNumber: string;
// // // // // // // // //   executionDate: string; // Format YYYY-MM-DD untuk input date
// // // // // // // // //   city: string;
// // // // // // // // //   signatoryName: string;
// // // // // // // // //   signatoryPosition: string;
// // // // // // // // // }

// // // // // // // // // interface Props {
// // // // // // // // //   initialData?: any;
// // // // // // // // //   onSave: (data: CertConfig) => void;
// // // // // // // // //   isSaving: boolean;
// // // // // // // // // }

// // // // // // // // // export default function CertificateConfigForm({ initialData, onSave, isSaving }: Props) {
// // // // // // // // //   const [formData, setFormData] = useState<CertConfig>({
// // // // // // // // //     certificateNumber: '',
// // // // // // // // //     executionDate: new Date().toISOString().split('T')[0],
// // // // // // // // //     city: '',
// // // // // // // // //     signatoryName: '',
// // // // // // // // //     signatoryPosition: ''
// // // // // // // // //   });

// // // // // // // // //   // Load data awal jika ada
// // // // // // // // //   useEffect(() => {
// // // // // // // // //     if (initialData) {
// // // // // // // // //       setFormData({
// // // // // // // // //         certificateNumber: initialData.certificateNumber || '',
// // // // // // // // //         executionDate: initialData.executionDate 
// // // // // // // // //           ? new Date(initialData.executionDate).toISOString().split('T')[0] 
// // // // // // // // //           : new Date().toISOString().split('T')[0],
// // // // // // // // //         city: initialData.city || '',
// // // // // // // // //         signatoryName: initialData.signatoryName || '',
// // // // // // // // //         signatoryPosition: initialData.signatoryPosition || ''
// // // // // // // // //       });
// // // // // // // // //     }
// // // // // // // // //   }, [initialData]);

// // // // // // // // //   const handleChange = (field: keyof CertConfig, value: string) => {
// // // // // // // // //     setFormData(prev => ({ ...prev, [field]: value }));
// // // // // // // // //   };

// // // // // // // // //   // Helper untuk preview format tanggal Indonesia (18 September 2025)
// // // // // // // // //   const getIndonesianDatePreview = (dateString: string) => {
// // // // // // // // //     if (!dateString) return '-';
// // // // // // // // //     try {
// // // // // // // // //       const date = new Date(dateString);
// // // // // // // // //       return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
// // // // // // // // //     } catch (e) { return '-'; }
// // // // // // // // //   };

// // // // // // // // //   return (
// // // // // // // // //     <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mt-6">
// // // // // // // // //       <div className="flex justify-between items-center mb-6">
// // // // // // // // //         <h3 className="text-lg font-bold text-gray-800">📜 Pengaturan Data Sertifikat</h3>
// // // // // // // // //         <button
// // // // // // // // //           onClick={() => onSave(formData)}
// // // // // // // // //           disabled={isSaving}
// // // // // // // // //           className="bg-purple-700 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-purple-800 disabled:opacity-50 flex items-center gap-2"
// // // // // // // // //         >
// // // // // // // // //           {isSaving ? 'Menyimpan...' : '💾 Simpan Pengaturan'}
// // // // // // // // //         </button>
// // // // // // // // //       </div>

// // // // // // // // //       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
// // // // // // // // //         {/* KOLOM KIRI: Data Pelaksanaan */}
// // // // // // // // //         <div className="space-y-5">
// // // // // // // // //           <h4 className="text-sm font-bold text-gray-500 uppercase border-b pb-2">Detail Pelaksanaan</h4>
          
// // // // // // // // //           <div>
// // // // // // // // //             <label htmlFor="certNumber" className="block text-sm font-bold text-gray-700 mb-1">Nomor Sertifikat (SK)</label>
// // // // // // // // //             <input
// // // // // // // // //               id="certNumber"
// // // // // // // // //               type="text"
// // // // // // // // //               placeholder="Contoh: 00204/DIKLAT/03.01.09/IX/2025"
// // // // // // // // //               value={formData.certificateNumber}
// // // // // // // // //               onChange={(e) => handleChange('certificateNumber', e.target.value)}
// // // // // // // // //               className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
// // // // // // // // //             />
// // // // // // // // //           </div>

// // // // // // // // //           <div>
// // // // // // // // //             <label htmlFor="execDate" className="block text-sm font-bold text-gray-700 mb-1">Tanggal Dilaksanakan</label>
// // // // // // // // //             <input
// // // // // // // // //               id="execDate"
// // // // // // // // //               type="date"
// // // // // // // // //               value={formData.executionDate}
// // // // // // // // //               onChange={(e) => handleChange('executionDate', e.target.value)}
// // // // // // // // //               className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
// // // // // // // // //             />
// // // // // // // // //             <p className="text-xs text-green-600 mt-1 font-medium">
// // // // // // // // //               Akan tertulis: {getIndonesianDatePreview(formData.executionDate)}
// // // // // // // // //             </p>
// // // // // // // // //           </div>

// // // // // // // // //           <div>
// // // // // // // // //             <label htmlFor="city" className="block text-sm font-bold text-gray-700 mb-1">Tempat Pelaksanaan (Kota)</label>
// // // // // // // // //             <input
// // // // // // // // //               id="city"
// // // // // // // // //               type="text"
// // // // // // // // //               placeholder="Contoh: Singaraja"
// // // // // // // // //               value={formData.city}
// // // // // // // // //               onChange={(e) => handleChange('city', e.target.value)}
// // // // // // // // //               className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
// // // // // // // // //             />
// // // // // // // // //           </div>
// // // // // // // // //         </div>

// // // // // // // // //         {/* KOLOM KANAN: Penanda Tangan */}
// // // // // // // // //         <div className="space-y-5 bg-gray-50 p-5 rounded-xl border border-gray-100">
// // // // // // // // //           <h4 className="text-sm font-bold text-gray-500 uppercase border-b pb-2">Pejabat Penanda Tangan</h4>
          
// // // // // // // // //           <div>
// // // // // // // // //             <label htmlFor="sigPos" className="block text-sm font-bold text-gray-700 mb-1">Jabatan</label>
// // // // // // // // //             <input
// // // // // // // // //               id="sigPos"
// // // // // // // // //               type="text"
// // // // // // // // //               placeholder="Contoh: Ketua / Kepala Pusdiklat"
// // // // // // // // //               value={formData.signatoryPosition}
// // // // // // // // //               onChange={(e) => handleChange('signatoryPosition', e.target.value)}
// // // // // // // // //               className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none bg-white"
// // // // // // // // //             />
// // // // // // // // //           </div>

// // // // // // // // //           <div>
// // // // // // // // //             <label htmlFor="sigName" className="block text-sm font-bold text-gray-700 mb-1">Nama Lengkap & Gelar</label>
// // // // // // // // //             <input
// // // // // // // // //               id="sigName"
// // // // // // // // //               type="text"
// // // // // // // // //               placeholder="Contoh: dr. I NYOMAN SUTJIDRA, Sp.OG"
// // // // // // // // //               value={formData.signatoryName}
// // // // // // // // //               onChange={(e) => handleChange('signatoryName', e.target.value)}
// // // // // // // // //               className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none bg-white"
// // // // // // // // //             />
// // // // // // // // //           </div>

// // // // // // // // //           <div className="text-xs text-gray-400 italic">
// // // // // // // // //             *Data ini akan otomatis muncul di halaman depan dan belakang sertifikat PDF.
// // // // // // // // //           </div>
// // // // // // // // //         </div>

// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }
// // // // // // // // 'use client';

// // // // // // // // import { useState, useEffect } from 'react';

// // // // // // // // // Tipe Data Config
// // // // // // // // interface CertConfig {
// // // // // // // //   certificateNumber: string;
// // // // // // // //   startNumber: number; // [NEW] Field Nomor Awal
// // // // // // // //   executionDate: string; // Format YYYY-MM-DD untuk input date
// // // // // // // //   city: string;
// // // // // // // //   signatoryName: string;
// // // // // // // //   signatoryPosition: string;
// // // // // // // // }

// // // // // // // // interface Props {
// // // // // // // //   initialData?: any;
// // // // // // // //   onSave: (data: CertConfig) => void;
// // // // // // // //   isSaving: boolean;
// // // // // // // // }

// // // // // // // // export default function CertificateConfigForm({ initialData, onSave, isSaving }: Props) {
// // // // // // // //   const [formData, setFormData] = useState<CertConfig>({
// // // // // // // //     certificateNumber: '',
// // // // // // // //     startNumber: 1, // Default mulai dari 1
// // // // // // // //     executionDate: new Date().toISOString().split('T')[0],
// // // // // // // //     city: '',
// // // // // // // //     signatoryName: '',
// // // // // // // //     signatoryPosition: ''
// // // // // // // //   });

// // // // // // // //   // Load data awal jika ada
// // // // // // // //   useEffect(() => {
// // // // // // // //     if (initialData) {
// // // // // // // //       setFormData({
// // // // // // // //         certificateNumber: initialData.certificateNumber || '',
// // // // // // // //         // Jika data lama tidak punya startNumber, default ke 1
// // // // // // // //         startNumber: initialData.startNumber || 1, 
// // // // // // // //         executionDate: initialData.executionDate 
// // // // // // // //           ? new Date(initialData.executionDate).toISOString().split('T')[0] 
// // // // // // // //           : new Date().toISOString().split('T')[0],
// // // // // // // //         city: initialData.city || '',
// // // // // // // //         signatoryName: initialData.signatoryName || '',
// // // // // // // //         signatoryPosition: initialData.signatoryPosition || ''
// // // // // // // //       });
// // // // // // // //     }
// // // // // // // //   }, [initialData]);

// // // // // // // //   // Handle perubahan input text/number
// // // // // // // //   const handleChange = (field: keyof CertConfig, value: string | number) => {
// // // // // // // //     setFormData(prev => ({ ...prev, [field]: value }));
// // // // // // // //   };

// // // // // // // //   // Helper untuk preview format tanggal Indonesia
// // // // // // // //   const getIndonesianDatePreview = (dateString: string) => {
// // // // // // // //     if (!dateString) return '-';
// // // // // // // //     try {
// // // // // // // //       const date = new Date(dateString);
// // // // // // // //       return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
// // // // // // // //     } catch (e) { return '-'; }
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mt-6">
// // // // // // // //       <div className="flex justify-between items-center mb-6">
// // // // // // // //         <h3 className="text-lg font-bold text-gray-800">📜 Pengaturan Data Sertifikat</h3>
// // // // // // // //         <button
// // // // // // // //           onClick={() => onSave(formData)}
// // // // // // // //           disabled={isSaving}
// // // // // // // //           className="bg-purple-700 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-purple-800 disabled:opacity-50 flex items-center gap-2 transition-colors shadow-md"
// // // // // // // //         >
// // // // // // // //           {isSaving ? 'Menyimpan...' : '💾 Simpan Pengaturan'}
// // // // // // // //         </button>
// // // // // // // //       </div>

// // // // // // // //       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
// // // // // // // //         {/* KOLOM KIRI: Data Pelaksanaan */}
// // // // // // // //         <div className="space-y-5">
// // // // // // // //           <h4 className="text-sm font-bold text-gray-500 uppercase border-b pb-2">Detail Pelaksanaan</h4>
          
// // // // // // // //           {/* Format Nomor */}
// // // // // // // //           <div>
// // // // // // // //             <label htmlFor="certNumber" className="block text-sm font-bold text-gray-700 mb-1">Format Nomor Sertifikat (SK)</label>
// // // // // // // //             <input
// // // // // // // //               id="certNumber"
// // // // // // // //               type="text"
// // // // // // // //               placeholder="Contoh: 00{NO}/DIKLAT/03.01.09/IX/2025"
// // // // // // // //               value={formData.certificateNumber}
// // // // // // // //               onChange={(e) => handleChange('certificateNumber', e.target.value)}
// // // // // // // //               className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
// // // // // // // //             />
// // // // // // // //             <p className="text-[10px] text-gray-400 mt-1">Gunakan <code>{'{NO}'}</code> agar nomor urut otomatis.</p>
// // // // // // // //           </div>

// // // // // // // //           {/* Start Number (FITUR BARU) */}
// // // // // // // //           <div>
// // // // // // // //             <label htmlFor="startNumber" className="block text-sm font-bold text-blue-700 mb-1">Nomor Awal Peserta (Start Number)</label>
// // // // // // // //             <div className="flex items-center gap-3">
// // // // // // // //                 <input
// // // // // // // //                   id="startNumber"
// // // // // // // //                   type="number"
// // // // // // // //                   min="1"
// // // // // // // //                   value={formData.startNumber}
// // // // // // // //                   onChange={(e) => handleChange('startNumber', parseInt(e.target.value) || 1)}
// // // // // // // //                   className="w-24 border border-blue-300 bg-blue-50 text-center font-bold text-blue-800 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
// // // // // // // //                 />
// // // // // // // //                 <p className="text-xs text-gray-500 flex-1 leading-tight">
// // // // // // // //                   Jika diisi <strong>87</strong>, peserta pertama mendapat nomor <strong>0087</strong>, kedua <strong>0088</strong>, dst. <br/>
// // // // // // // //                   <span className="italic">(Default: 1)</span>
// // // // // // // //                 </p>
// // // // // // // //             </div>
// // // // // // // //           </div>

// // // // // // // //           {/* Tanggal */}
// // // // // // // //           <div>
// // // // // // // //             <label htmlFor="execDate" className="block text-sm font-bold text-gray-700 mb-1">Tanggal Dilaksanakan</label>
// // // // // // // //             <input
// // // // // // // //               id="execDate"
// // // // // // // //               type="date"
// // // // // // // //               value={formData.executionDate}
// // // // // // // //               onChange={(e) => handleChange('executionDate', e.target.value)}
// // // // // // // //               className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
// // // // // // // //             />
// // // // // // // //             <p className="text-xs text-green-600 mt-1 font-medium">
// // // // // // // //               Akan tertulis: {getIndonesianDatePreview(formData.executionDate)}
// // // // // // // //             </p>
// // // // // // // //           </div>

// // // // // // // //           {/* Kota */}
// // // // // // // //           <div>
// // // // // // // //             <label htmlFor="city" className="block text-sm font-bold text-gray-700 mb-1">Tempat Pelaksanaan (Kota)</label>
// // // // // // // //             <input
// // // // // // // //               id="city"
// // // // // // // //               type="text"
// // // // // // // //               placeholder="Contoh: Singaraja"
// // // // // // // //               value={formData.city}
// // // // // // // //               onChange={(e) => handleChange('city', e.target.value)}
// // // // // // // //               className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
// // // // // // // //             />
// // // // // // // //           </div>
// // // // // // // //         </div>

// // // // // // // //         {/* KOLOM KANAN: Penanda Tangan */}
// // // // // // // //         <div className="space-y-5 bg-gray-50 p-5 rounded-xl border border-gray-100 h-fit">
// // // // // // // //           <h4 className="text-sm font-bold text-gray-500 uppercase border-b pb-2">Pejabat Penanda Tangan</h4>
          
// // // // // // // //           <div>
// // // // // // // //             <label htmlFor="sigPos" className="block text-sm font-bold text-gray-700 mb-1">Jabatan</label>
// // // // // // // //             <input
// // // // // // // //               id="sigPos"
// // // // // // // //               type="text"
// // // // // // // //               placeholder="Contoh: Ketua / Kepala Pusdiklat"
// // // // // // // //               value={formData.signatoryPosition}
// // // // // // // //               onChange={(e) => handleChange('signatoryPosition', e.target.value)}
// // // // // // // //               className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none bg-white"
// // // // // // // //             />
// // // // // // // //           </div>

// // // // // // // //           <div>
// // // // // // // //             <label htmlFor="sigName" className="block text-sm font-bold text-gray-700 mb-1">Nama Lengkap & Gelar</label>
// // // // // // // //             <input
// // // // // // // //               id="sigName"
// // // // // // // //               type="text"
// // // // // // // //               placeholder="Contoh: dr. I NYOMAN SUTJIDRA, Sp.OG"
// // // // // // // //               value={formData.signatoryName}
// // // // // // // //               onChange={(e) => handleChange('signatoryName', e.target.value)}
// // // // // // // //               className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none bg-white"
// // // // // // // //             />
// // // // // // // //           </div>

// // // // // // // //           <div className="text-xs text-gray-400 italic pt-4 border-t border-gray-200">
// // // // // // // //             *Data ini akan otomatis muncul di halaman depan dan belakang sertifikat PDF yang diunduh siswa.
// // // // // // // //           </div>
// // // // // // // //         </div>

// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }
// // // // // // // 'use client';

// // // // // // // import { useState, useEffect } from 'react';
// // // // // // // import { FileText, Calendar, MapPin, UserCheck, Hash, Save, Eye, Printer } from 'lucide-react';
// // // // // // // import { api } from '@/lib/api'; // Pastikan import api wrapper Anda

// // // // // // // // Tipe Data Config
// // // // // // // interface CertConfig {
// // // // // // //   certificateNumber: string;
// // // // // // //   startNumber: number;
// // // // // // //   executionDate: string; 
// // // // // // //   city: string;
// // // // // // //   signatoryName: string;
// // // // // // //   signatoryPosition: string;
// // // // // // // }

// // // // // // // interface Props {
// // // // // // //   initialData?: any;
// // // // // // //   onSave: (data: CertConfig) => void;
// // // // // // //   isSaving: boolean;
// // // // // // // }

// // // // // // // export default function CertificateConfigForm({ initialData, onSave, isSaving }: Props) {
// // // // // // //   const [formData, setFormData] = useState<CertConfig>({
// // // // // // //     certificateNumber: '',
// // // // // // //     startNumber: 1, 
// // // // // // //     executionDate: new Date().toISOString().split('T')[0],
// // // // // // //     city: '',
// // // // // // //     signatoryName: '',
// // // // // // //     signatoryPosition: ''
// // // // // // //   });

// // // // // // //   const [isPreviewing, setIsPreviewing] = useState(false);

// // // // // // //   useEffect(() => {
// // // // // // //     if (initialData) {
// // // // // // //       setFormData({
// // // // // // //         certificateNumber: initialData.certificateNumber || '',
// // // // // // //         startNumber: initialData.startNumber || 1, 
// // // // // // //         executionDate: initialData.executionDate 
// // // // // // //           ? new Date(initialData.executionDate).toISOString().split('T')[0] 
// // // // // // //           : new Date().toISOString().split('T')[0],
// // // // // // //         city: initialData.city || '',
// // // // // // //         signatoryName: initialData.signatoryName || '',
// // // // // // //         signatoryPosition: initialData.signatoryPosition || ''
// // // // // // //       });
// // // // // // //     }
// // // // // // //   }, [initialData]);

// // // // // // //   const handleChange = (field: keyof CertConfig, value: string | number) => {
// // // // // // //     setFormData(prev => ({ ...prev, [field]: value }));
// // // // // // //   };

// // // // // // //   // --- [NEW] FUNGSI LIHAT DRAFT PDF ---
// // // // // // //   const handlePreview = async () => {
// // // // // // //     try {
// // // // // // //       setIsPreviewing(true);
      
// // // // // // //       // Ambil token dari localStorage (sesuai cara auth Anda)
// // // // // // //       const token = localStorage.getItem('token'); 

// // // // // // //       const response = await fetch('http://localhost:4000/api/courses/certificate/preview', {
// // // // // // //         method: 'POST',
// // // // // // //         headers: {
// // // // // // //           'Content-Type': 'application/json',
// // // // // // //           'x-auth-token': token || ''
// // // // // // //         },
// // // // // // //         body: JSON.stringify({ certificateConfig: formData })
// // // // // // //       });

// // // // // // //       if (!response.ok) throw new Error('Gagal generate preview');

// // // // // // //       // Convert response ke Blob (File)
// // // // // // //       const blob = await response.blob();
// // // // // // //       const url = window.URL.createObjectURL(blob);
      
// // // // // // //       // Buka di tab baru
// // // // // // //       window.open(url, '_blank');

// // // // // // //     } catch (error) {
// // // // // // //       alert("Gagal memuat preview sertifikat.");
// // // // // // //       console.error(error);
// // // // // // //     } finally {
// // // // // // //       setIsPreviewing(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const getIndonesianDatePreview = (dateString: string) => {
// // // // // // //     if (!dateString) return '-';
// // // // // // //     try {
// // // // // // //       const date = new Date(dateString);
// // // // // // //       return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
// // // // // // //     } catch (e) { return '-'; }
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mt-6">
// // // // // // //       <div className="flex justify-between items-center mb-6">
// // // // // // //         <h3 className="text-lg font-bold text-gray-800">📜 Pengaturan Data Sertifikat</h3>
        
// // // // // // //         <div className="flex gap-2">
// // // // // // //             {/* [NEW] TOMBOL VIEW DRAFT */}
// // // // // // //             <button
// // // // // // //                 type="button"
// // // // // // //                 onClick={handlePreview}
// // // // // // //                 disabled={isPreviewing}
// // // // // // //                 className="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-50 flex items-center gap-2 transition-colors"
// // // // // // //             >
// // // // // // //                 {isPreviewing ? 'Loading...' : <><Eye size={16}/> Lihat Draft PDF</>}
// // // // // // //             </button>

// // // // // // //             <button
// // // // // // //                 onClick={() => onSave(formData)}
// // // // // // //                 disabled={isSaving}
// // // // // // //                 className="bg-purple-700 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-purple-800 disabled:opacity-50 flex items-center gap-2 transition-colors shadow-md"
// // // // // // //             >
// // // // // // //                 {isSaving ? 'Menyimpan...' : '💾 Simpan Pengaturan'}
// // // // // // //             </button>
// // // // // // //         </div>
// // // // // // //       </div>

// // // // // // //       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
// // // // // // //         {/* KOLOM KIRI: Data Pelaksanaan */}
// // // // // // //         <div className="space-y-5">
// // // // // // //           <h4 className="text-sm font-bold text-gray-500 uppercase border-b pb-2">Detail Pelaksanaan</h4>
          
// // // // // // //           <div>
// // // // // // //             <label htmlFor="certNumber" className="block text-sm font-bold text-gray-700 mb-1">Format Nomor Sertifikat (SK)</label>
// // // // // // //             <input
// // // // // // //               id="certNumber"
// // // // // // //               type="text"
// // // // // // //               placeholder="Contoh: 00{NO}/DIKLAT/03.01.09/IX/2025"
// // // // // // //               value={formData.certificateNumber}
// // // // // // //               onChange={(e) => handleChange('certificateNumber', e.target.value)}
// // // // // // //               className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
// // // // // // //             />
// // // // // // //             <p className="text-[10px] text-gray-400 mt-1">Gunakan <code>{'{NO}'}</code> agar nomor urut otomatis.</p>
// // // // // // //           </div>

// // // // // // //           <div>
// // // // // // //             <label htmlFor="startNumber" className="block text-sm font-bold text-blue-700 mb-1">Nomor Awal Peserta (Start Number)</label>
// // // // // // //             <div className="flex items-center gap-3">
// // // // // // //                 <input
// // // // // // //                   id="startNumber"
// // // // // // //                   type="number"
// // // // // // //                   min="1"
// // // // // // //                   value={formData.startNumber}
// // // // // // //                   onChange={(e) => handleChange('startNumber', parseInt(e.target.value) || 1)}
// // // // // // //                   className="w-24 border border-blue-300 bg-blue-50 text-center font-bold text-blue-800 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
// // // // // // //                 />
// // // // // // //                 <p className="text-xs text-gray-500 flex-1 leading-tight">
// // // // // // //                   Jika diisi <strong>87</strong>, peserta pertama mendapat nomor <strong>0087</strong>, kedua <strong>0088</strong>, dst. <br/>
// // // // // // //                   <span className="italic">(Default: 1)</span>
// // // // // // //                 </p>
// // // // // // //             </div>
// // // // // // //           </div>

// // // // // // //           <div>
// // // // // // //             <label htmlFor="execDate" className="block text-sm font-bold text-gray-700 mb-1">Tanggal Dilaksanakan</label>
// // // // // // //             <input
// // // // // // //               id="execDate"
// // // // // // //               type="date"
// // // // // // //               value={formData.executionDate}
// // // // // // //               onChange={(e) => handleChange('executionDate', e.target.value)}
// // // // // // //               className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
// // // // // // //             />
// // // // // // //             <p className="text-xs text-green-600 mt-1 font-medium">
// // // // // // //               Akan tertulis: {getIndonesianDatePreview(formData.executionDate)}
// // // // // // //             </p>
// // // // // // //           </div>

// // // // // // //           <div>
// // // // // // //             <label htmlFor="city" className="block text-sm font-bold text-gray-700 mb-1">Tempat Pelaksanaan (Kota)</label>
// // // // // // //             <input
// // // // // // //               id="city"
// // // // // // //               type="text"
// // // // // // //               placeholder="Contoh: Singaraja"
// // // // // // //               value={formData.city}
// // // // // // //               onChange={(e) => handleChange('city', e.target.value)}
// // // // // // //               className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
// // // // // // //             />
// // // // // // //           </div>
// // // // // // //         </div>

// // // // // // //         {/* KOLOM KANAN: Penanda Tangan */}
// // // // // // //         <div className="space-y-5 bg-gray-50 p-5 rounded-xl border border-gray-100 h-fit">
// // // // // // //           <h4 className="text-sm font-bold text-gray-500 uppercase border-b pb-2">Pejabat Penanda Tangan</h4>
          
// // // // // // //           <div>
// // // // // // //             <label htmlFor="sigPos" className="block text-sm font-bold text-gray-700 mb-1">Jabatan</label>
// // // // // // //             <input
// // // // // // //               id="sigPos"
// // // // // // //               type="text"
// // // // // // //               placeholder="Contoh: Ketua / Kepala Pusdiklat"
// // // // // // //               value={formData.signatoryPosition}
// // // // // // //               onChange={(e) => handleChange('signatoryPosition', e.target.value)}
// // // // // // //               className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none bg-white"
// // // // // // //             />
// // // // // // //           </div>

// // // // // // //           <div>
// // // // // // //             <label htmlFor="sigName" className="block text-sm font-bold text-gray-700 mb-1">Nama Lengkap & Gelar</label>
// // // // // // //             <input
// // // // // // //               id="sigName"
// // // // // // //               type="text"
// // // // // // //               placeholder="Contoh: dr. I NYOMAN SUTJIDRA, Sp.OG"
// // // // // // //               value={formData.signatoryName}
// // // // // // //               onChange={(e) => handleChange('signatoryName', e.target.value)}
// // // // // // //               className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none bg-white"
// // // // // // //             />
// // // // // // //           </div>

// // // // // // //           <div className="text-xs text-gray-400 italic pt-4 border-t border-gray-200">
// // // // // // //             *Data ini akan otomatis muncul di halaman depan dan belakang sertifikat PDF yang diunduh siswa.
// // // // // // //           </div>
// // // // // // //         </div>

// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }
// // // // // // 'use client';

// // // // // // import { useState, useEffect } from 'react';
// // // // // // import { FileText, Calendar, MapPin, UserCheck, Hash, Save, Eye, RefreshCw, Info } from 'lucide-react';

// // // // // // // Tipe Data Config
// // // // // // interface CertConfig {
// // // // // //   certificateNumber: string;
// // // // // //   startNumber: number; // Field Nomor Awal
// // // // // //   executionDate: string; // Format YYYY-MM-DD
// // // // // //   city: string;
// // // // // //   signatoryName: string;
// // // // // //   signatoryPosition: string;
// // // // // // }

// // // // // // interface Props {
// // // // // //   initialData?: any;
// // // // // //   onSave: (data: CertConfig) => void;
// // // // // //   isSaving: boolean;
// // // // // // }

// // // // // // export default function CertificateConfigForm({ initialData, onSave, isSaving }: Props) {
// // // // // //   const [formData, setFormData] = useState<CertConfig>({
// // // // // //     certificateNumber: '',
// // // // // //     startNumber: 1, // Default mulai dari 1
// // // // // //     executionDate: new Date().toISOString().split('T')[0],
// // // // // //     city: '',
// // // // // //     signatoryName: '',
// // // // // //     signatoryPosition: ''
// // // // // //   });

// // // // // //   const [isPreviewing, setIsPreviewing] = useState(false);

// // // // // //   // Load data awal jika ada dari database
// // // // // //   useEffect(() => {
// // // // // //     if (initialData) {
// // // // // //       setFormData({
// // // // // //         certificateNumber: initialData.certificateNumber || '',
// // // // // //         startNumber: initialData.startNumber || 1,
// // // // // //         executionDate: initialData.executionDate 
// // // // // //           ? new Date(initialData.executionDate).toISOString().split('T')[0] 
// // // // // //           : new Date().toISOString().split('T')[0],
// // // // // //         city: initialData.city || '',
// // // // // //         signatoryName: initialData.signatoryName || '',
// // // // // //         signatoryPosition: initialData.signatoryPosition || ''
// // // // // //       });
// // // // // //     }
// // // // // //   }, [initialData]);

// // // // // //   const handleChange = (field: keyof CertConfig, value: string | number) => {
// // // // // //     setFormData(prev => ({ ...prev, [field]: value }));
// // // // // //   };

// // // // // //   // --- FUNGSI LIHAT DRAFT PDF (PENTING) ---
// // // // // //   const handlePreview = async () => {
// // // // // //     try {
// // // // // //       setIsPreviewing(true);
      
// // // // // //       // 1. CARI TOKEN (Mendukung berbagai format penyimpanan LMS)
// // // // // //       let token = localStorage.getItem('token'); 
// // // // // //       if (!token) {
// // // // // //           // Coba cari di dalam object 'user' jika 'token' direct tidak ada
// // // // // //           const userStr = localStorage.getItem('user');
// // // // // //           if (userStr) {
// // // // // //               try {
// // // // // //                   const user = JSON.parse(userStr);
// // // // // //                   token = user.token || user.accessToken;
// // // // // //               } catch (e) {}
// // // // // //           }
// // // // // //       }

// // // // // //       if (!token) {
// // // // // //           alert("Sesi kadaluarsa atau Anda belum login. Silakan refresh halaman.");
// // // // // //           return;
// // // // // //       }

// // // // // //       // 2. TEMBAK API BACKEND (localhost:4000)
// // // // // //       const BACKEND_URL = 'http://localhost:4000'; 

// // // // // //       const response = await fetch(`${BACKEND_URL}/api/courses/certificate/preview`, {
// // // // // //         method: 'POST',
// // // // // //         headers: {
// // // // // //           'Content-Type': 'application/json',
// // // // // //           'Authorization': `Bearer ${token}` // Standar Auth Bearer
// // // // // //         },
// // // // // //         body: JSON.stringify({ certificateConfig: formData })
// // // // // //       });

// // // // // //       if (!response.ok) {
// // // // // //           const errText = await response.text();
// // // // // //           throw new Error(`Gagal (${response.status}): ${errText}`);
// // // // // //       }

// // // // // //       // 3. SUKSES: Buka PDF di Tab Baru
// // // // // //       const blob = await response.blob();
// // // // // //       const url = window.URL.createObjectURL(blob);
// // // // // //       window.open(url, '_blank');

// // // // // //     } catch (error: any) {
// // // // // //       console.error("Preview Error:", error);
// // // // // //       alert(`Gagal memuat preview: ${error.message}\n\nPastikan Backend sudah jalan di localhost:4000`);
// // // // // //     } finally {
// // // // // //       setIsPreviewing(false);
// // // // // //     }
// // // // // //   };

// // // // // //   // Helper untuk preview format tanggal Indonesia
// // // // // //   const getIndonesianDatePreview = (dateString: string) => {
// // // // // //     if (!dateString) return '-';
// // // // // //     try {
// // // // // //       const date = new Date(dateString);
// // // // // //       return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
// // // // // //     } catch (e) { return '-'; }
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mt-6">
// // // // // //       <div className="flex justify-between items-center mb-6">
// // // // // //         <h3 className="text-lg font-bold text-gray-800">📜 Pengaturan Data Sertifikat</h3>
        
// // // // // //         <div className="flex gap-2">
// // // // // //             {/* TOMBOL VIEW DRAFT */}
// // // // // //             <button
// // // // // //                 type="button"
// // // // // //                 onClick={handlePreview}
// // // // // //                 disabled={isPreviewing}
// // // // // //                 className="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-50 flex items-center gap-2 transition-colors shadow-sm"
// // // // // //                 title="Lihat contoh hasil PDF sebelum disimpan"
// // // // // //             >
// // // // // //                 {isPreviewing ? <RefreshCw size={16} className="animate-spin"/> : <Eye size={16}/>}
// // // // // //                 {isPreviewing ? 'Loading...' : 'Lihat Draft PDF'}
// // // // // //             </button>

// // // // // //             {/* TOMBOL SIMPAN */}
// // // // // //             <button
// // // // // //                 onClick={() => onSave(formData)}
// // // // // //                 disabled={isSaving}
// // // // // //                 className="bg-purple-700 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-purple-800 disabled:opacity-50 flex items-center gap-2 transition-colors shadow-md"
// // // // // //             >
// // // // // //                 {isSaving ? <RefreshCw size={16} className="animate-spin"/> : <Save size={16}/>}
// // // // // //                 {isSaving ? 'Menyimpan...' : 'Simpan Pengaturan'}
// // // // // //             </button>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
// // // // // //         {/* KOLOM KIRI: Data Pelaksanaan */}
// // // // // //         <div className="space-y-5">
// // // // // //           <h4 className="text-sm font-bold text-gray-500 uppercase border-b pb-2">Detail Pelaksanaan</h4>
          
// // // // // //           {/* Format Nomor */}
// // // // // //           <div>
// // // // // //             <label htmlFor="certNumber" className="block text-sm font-bold text-gray-700 mb-1">Format Nomor Sertifikat (SK)</label>
// // // // // //             <input
// // // // // //               id="certNumber"
// // // // // //               type="text"
// // // // // //               placeholder="Contoh: 00{NO}/DIKLAT/03.01.09/IX/2025"
// // // // // //               value={formData.certificateNumber}
// // // // // //               onChange={(e) => handleChange('certificateNumber', e.target.value)}
// // // // // //               className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none font-mono"
// // // // // //             />
// // // // // //             <div className="flex gap-1 mt-1 text-[10px] text-gray-500 items-center">
// // // // // //                 <Info size={10} />
// // // // // //                 <span>Gunakan <code>{'{NO}'}</code> agar sistem mengisi nomor urut otomatis.</span>
// // // // // //             </div>
// // // // // //           </div>

// // // // // //           {/* Start Number (FITUR BARU) */}
// // // // // //           <div>
// // // // // //             <label htmlFor="startNumber" className="block text-sm font-bold text-blue-700 mb-1">Nomor Awal Peserta (Start Number)</label>
// // // // // //             <div className="flex items-center gap-3">
// // // // // //                 <input
// // // // // //                   id="startNumber"
// // // // // //                   type="number"
// // // // // //                   min="1"
// // // // // //                   value={formData.startNumber}
// // // // // //                   onChange={(e) => handleChange('startNumber', parseInt(e.target.value) || 1)}
// // // // // //                   className="w-24 border border-blue-300 bg-blue-50 text-center font-bold text-blue-800 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
// // // // // //                 />
// // // // // //                 <p className="text-xs text-gray-500 flex-1 leading-tight">
// // // // // //                   Jika diisi <strong>87</strong>, peserta pertama mendapat nomor <strong>0087</strong>, kedua <strong>0088</strong>, dst. <br/>
// // // // // //                   <span className="italic">(Default: 1)</span>
// // // // // //                 </p>
// // // // // //             </div>
// // // // // //           </div>

// // // // // //           {/* Tanggal */}
// // // // // //           <div>
// // // // // //             <label htmlFor="execDate" className="block text-sm font-bold text-gray-700 mb-1">Tanggal Dilaksanakan</label>
// // // // // //             <input
// // // // // //               id="execDate"
// // // // // //               type="date"
// // // // // //               value={formData.executionDate}
// // // // // //               onChange={(e) => handleChange('executionDate', e.target.value)}
// // // // // //               className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
// // // // // //             />
// // // // // //             <p className="text-xs text-green-600 mt-1 font-medium">
// // // // // //               Akan tertulis: {getIndonesianDatePreview(formData.executionDate)}
// // // // // //             </p>
// // // // // //           </div>

// // // // // //           {/* Kota */}
// // // // // //           <div>
// // // // // //             <label htmlFor="city" className="block text-sm font-bold text-gray-700 mb-1">Tempat Pelaksanaan (Kota)</label>
// // // // // //             <input
// // // // // //               id="city"
// // // // // //               type="text"
// // // // // //               placeholder="Contoh: Singaraja"
// // // // // //               value={formData.city}
// // // // // //               onChange={(e) => handleChange('city', e.target.value)}
// // // // // //               className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
// // // // // //             />
// // // // // //           </div>
// // // // // //         </div>

// // // // // //         {/* KOLOM KANAN: Penanda Tangan */}
// // // // // //         <div className="space-y-5 bg-gray-50 p-5 rounded-xl border border-gray-100 h-fit">
// // // // // //           <h4 className="text-sm font-bold text-gray-500 uppercase border-b pb-2">Pejabat Penanda Tangan</h4>
          
// // // // // //           <div>
// // // // // //             <label htmlFor="sigPos" className="block text-sm font-bold text-gray-700 mb-1">Jabatan</label>
// // // // // //             <input
// // // // // //               id="sigPos"
// // // // // //               type="text"
// // // // // //               placeholder="Contoh: Ketua / Kepala Pusdiklat"
// // // // // //               value={formData.signatoryPosition}
// // // // // //               onChange={(e) => handleChange('signatoryPosition', e.target.value)}
// // // // // //               className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none bg-white"
// // // // // //             />
// // // // // //           </div>

// // // // // //           <div>
// // // // // //             <label htmlFor="sigName" className="block text-sm font-bold text-gray-700 mb-1">Nama Lengkap & Gelar</label>
// // // // // //             <input
// // // // // //               id="sigName"
// // // // // //               type="text"
// // // // // //               placeholder="Contoh: dr. I NYOMAN SUTJIDRA, Sp.OG"
// // // // // //               value={formData.signatoryName}
// // // // // //               onChange={(e) => handleChange('signatoryName', e.target.value)}
// // // // // //               className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none bg-white"
// // // // // //             />
// // // // // //           </div>

// // // // // //           <div className="text-xs text-gray-400 italic pt-4 border-t border-gray-200">
// // // // // //             *Data ini akan otomatis muncul di halaman depan dan belakang sertifikat PDF yang diunduh siswa.
// // // // // //           </div>
// // // // // //         </div>

// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }
// // // // // 'use client';

// // // // // import { useState, useEffect } from 'react';
// // // // // import { RefreshCw, Save, Eye, Info } from 'lucide-react';

// // // // // // Tipe Data Config
// // // // // interface CertConfig {
// // // // //   certificateNumber: string;
// // // // //   startNumber: number;
// // // // //   executionDate: string;
// // // // //   city: string;
// // // // //   signatoryName: string;
// // // // //   signatoryPosition: string;
// // // // // }

// // // // // interface Props {
// // // // //   initialData?: any;
// // // // //   onSave: (data: CertConfig) => void;
// // // // //   isSaving: boolean;
// // // // //   // [NEW] Props tambahan agar Preview bisa baca data kompetensi
// // // // //   competencies?: any[];
// // // // //   includeCompetencies?: boolean;
// // // // //   courseId?: string;
// // // // // }

// // // // // export default function CertificateConfigForm({ 
// // // // //   initialData, 
// // // // //   onSave, 
// // // // //   isSaving,
// // // // //   competencies = [], 
// // // // //   includeCompetencies = false, 
// // // // //   courseId 
// // // // // }: Props) {
  
// // // // //   const [formData, setFormData] = useState<CertConfig>({
// // // // //     certificateNumber: '',
// // // // //     startNumber: 1,
// // // // //     executionDate: new Date().toISOString().split('T')[0],
// // // // //     city: '',
// // // // //     signatoryName: '',
// // // // //     signatoryPosition: ''
// // // // //   });

// // // // //   const [isPreviewing, setIsPreviewing] = useState(false);

// // // // //   useEffect(() => {
// // // // //     if (initialData) {
// // // // //       setFormData({
// // // // //         certificateNumber: initialData.certificateNumber || '',
// // // // //         startNumber: initialData.startNumber || 1,
// // // // //         executionDate: initialData.executionDate 
// // // // //           ? new Date(initialData.executionDate).toISOString().split('T')[0] 
// // // // //           : new Date().toISOString().split('T')[0],
// // // // //         city: initialData.city || '',
// // // // //         signatoryName: initialData.signatoryName || '',
// // // // //         signatoryPosition: initialData.signatoryPosition || ''
// // // // //       });
// // // // //     }
// // // // //   }, [initialData]);

// // // // //   const handleChange = (field: keyof CertConfig, value: string | number) => {
// // // // //     setFormData(prev => ({ ...prev, [field]: value }));
// // // // //   };

// // // // //   const getIndonesianDatePreview = (dateString: string) => {
// // // // //     if (!dateString) return '-';
// // // // //     try {
// // // // //       const date = new Date(dateString);
// // // // //       return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
// // // // //     } catch (e) { return '-'; }
// // // // //   };

// // // // //   // --- FUNGSI PREVIEW PDF (UPDATED) ---
// // // // //   const handlePreview = async () => {
// // // // //     try {
// // // // //       setIsPreviewing(true);
      
// // // // //       let token = localStorage.getItem('token'); 
// // // // //       if (!token) {
// // // // //           const userStr = localStorage.getItem('user');
// // // // //           if (userStr) {
// // // // //               try { const user = JSON.parse(userStr); token = user.token || user.accessToken; } catch (e) {}
// // // // //           }
// // // // //       }

// // // // //       if (!token) {
// // // // //           alert("Sesi kadaluarsa. Silakan login ulang.");
// // // // //           return;
// // // // //       }

// // // // //       const BACKEND_URL = 'http://localhost:4000'; 

// // // // //       // [FIX] Kirim juga competencies, includeCompetencies, dan courseId
// // // // //       const payload = {
// // // // //         certificateConfig: formData,
// // // // //         competencies: competencies,
// // // // //         includeCompetenciesInCertificate: includeCompetencies,
// // // // //         courseId: courseId
// // // // //       };

// // // // //       const response = await fetch(`${BACKEND_URL}/api/courses/certificate/preview`, {
// // // // //         method: 'POST',
// // // // //         headers: {
// // // // //           'Content-Type': 'application/json',
// // // // //           'Authorization': `Bearer ${token}`
// // // // //         },
// // // // //         body: JSON.stringify(payload)
// // // // //       });

// // // // //       if (!response.ok) {
// // // // //           const errText = await response.text();
// // // // //           throw new Error(`Gagal (${response.status}): ${errText}`);
// // // // //       }

// // // // //       const blob = await response.blob();
// // // // //       const url = window.URL.createObjectURL(blob);
// // // // //       window.open(url, '_blank');

// // // // //     } catch (error: any) {
// // // // //       console.error("Preview Error:", error);
// // // // //       alert(`Gagal memuat preview: ${error.message}`);
// // // // //     } finally {
// // // // //       setIsPreviewing(false);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mt-6">
// // // // //       <div className="flex justify-between items-center mb-6">
// // // // //         <h3 className="text-lg font-bold text-gray-800">📜 Pengaturan Data Sertifikat</h3>
        
// // // // //         <div className="flex gap-2">
// // // // //             {/* TOMBOL PREVIEW */}
// // // // //             <button
// // // // //                 type="button"
// // // // //                 onClick={handlePreview}
// // // // //                 disabled={isPreviewing}
// // // // //                 className="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-50 flex items-center gap-2 transition-colors shadow-sm"
// // // // //             >
// // // // //                 {isPreviewing ? <RefreshCw size={16} className="animate-spin"/> : <Eye size={16}/>}
// // // // //                 {isPreviewing ? 'Loading...' : 'Lihat Draft PDF'}
// // // // //             </button>

// // // // //             {/* TOMBOL SIMPAN */}
// // // // //             <button
// // // // //                 onClick={() => onSave(formData)}
// // // // //                 disabled={isSaving}
// // // // //                 className="bg-purple-700 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-purple-800 disabled:opacity-50 flex items-center gap-2 transition-colors shadow-md"
// // // // //             >
// // // // //                 {isSaving ? <RefreshCw size={16} className="animate-spin"/> : <Save size={16}/>}
// // // // //                 {isSaving ? 'Menyimpan...' : 'Simpan Pengaturan'}
// // // // //             </button>
// // // // //         </div>
// // // // //       </div>

// // // // //       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// // // // //         {/* KOLOM KIRI */}
// // // // //         <div className="space-y-5">
// // // // //           <h4 className="text-sm font-bold text-gray-500 uppercase border-b pb-2">Detail Pelaksanaan</h4>
          
// // // // //           <div>
// // // // //             <label htmlFor="certNumber" className="block text-sm font-bold text-gray-700 mb-1">Format Nomor Sertifikat (SK)</label>
// // // // //             <input
// // // // //               id="certNumber"
// // // // //               type="text"
// // // // //               placeholder="Contoh: 00{NO}/DIKLAT/03.01.09/IX/2025"
// // // // //               value={formData.certificateNumber}
// // // // //               onChange={(e) => handleChange('certificateNumber', e.target.value)}
// // // // //               className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none font-mono"
// // // // //             />
// // // // //             <div className="flex gap-1 mt-1 text-[10px] text-gray-500 items-center">
// // // // //                 <Info size={10} />
// // // // //                 <span>Gunakan <code>{'{NO}'}</code> agar sistem mengisi nomor urut otomatis.</span>
// // // // //             </div>
// // // // //           </div>

// // // // //           <div>
// // // // //             <label htmlFor="startNumber" className="block text-sm font-bold text-blue-700 mb-1">Nomor Awal Peserta (Start Number)</label>
// // // // //             <div className="flex items-center gap-3">
// // // // //                 <input
// // // // //                   id="startNumber"
// // // // //                   type="number"
// // // // //                   min="1"
// // // // //                   value={formData.startNumber}
// // // // //                   onChange={(e) => handleChange('startNumber', parseInt(e.target.value) || 1)}
// // // // //                   className="w-24 border border-blue-300 bg-blue-50 text-center font-bold text-blue-800 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
// // // // //                 />
// // // // //                 <p className="text-xs text-gray-500 flex-1 leading-tight">
// // // // //                   Jika diisi <strong>87</strong>, peserta pertama mendapat nomor <strong>0087</strong>, kedua <strong>0088</strong>, dst. <br/>
// // // // //                   <span className="italic">(Default: 1)</span>
// // // // //                 </p>
// // // // //             </div>
// // // // //           </div>

// // // // //           <div>
// // // // //             <label htmlFor="execDate" className="block text-sm font-bold text-gray-700 mb-1">Tanggal Dilaksanakan</label>
// // // // //             <input
// // // // //               id="execDate"
// // // // //               type="date"
// // // // //               value={formData.executionDate}
// // // // //               onChange={(e) => handleChange('executionDate', e.target.value)}
// // // // //               className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
// // // // //             />
// // // // //             <p className="text-xs text-green-600 mt-1 font-medium">
// // // // //               Akan tertulis: {getIndonesianDatePreview(formData.executionDate)}
// // // // //             </p>
// // // // //           </div>

// // // // //           <div>
// // // // //             <label htmlFor="city" className="block text-sm font-bold text-gray-700 mb-1">Tempat Pelaksanaan (Kota)</label>
// // // // //             <input
// // // // //               id="city"
// // // // //               type="text"
// // // // //               placeholder="Contoh: Singaraja"
// // // // //               value={formData.city}
// // // // //               onChange={(e) => handleChange('city', e.target.value)}
// // // // //               className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
// // // // //             />
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* KOLOM KANAN */}
// // // // //         <div className="space-y-5 bg-gray-50 p-5 rounded-xl border border-gray-100 h-fit">
// // // // //           <h4 className="text-sm font-bold text-gray-500 uppercase border-b pb-2">Pejabat Penanda Tangan</h4>
          
// // // // //           <div>
// // // // //             <label htmlFor="sigPos" className="block text-sm font-bold text-gray-700 mb-1">Jabatan</label>
// // // // //             <input
// // // // //               id="sigPos"
// // // // //               type="text"
// // // // //               placeholder="Contoh: Ketua / Kepala Pusdiklat"
// // // // //               value={formData.signatoryPosition}
// // // // //               onChange={(e) => handleChange('signatoryPosition', e.target.value)}
// // // // //               className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none bg-white"
// // // // //             />
// // // // //           </div>

// // // // //           <div>
// // // // //             <label htmlFor="sigName" className="block text-sm font-bold text-gray-700 mb-1">Nama Lengkap & Gelar</label>
// // // // //             <input
// // // // //               id="sigName"
// // // // //               type="text"
// // // // //               placeholder="Contoh: dr. I NYOMAN SUTJIDRA, Sp.OG"
// // // // //               value={formData.signatoryName}
// // // // //               onChange={(e) => handleChange('signatoryName', e.target.value)}
// // // // //               className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none bg-white"
// // // // //             />
// // // // //           </div>

// // // // //           <div className="text-xs text-gray-400 italic pt-4 border-t border-gray-200">
// // // // //             *Data ini akan otomatis muncul di halaman depan dan belakang sertifikat PDF yang diunduh siswa.
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }
// // // // 'use client';

// // // // import { useState, useEffect } from 'react';
// // // // import { RefreshCw, Save, Eye, Info } from 'lucide-react';

// // // // interface CertConfig {
// // // //   certificateNumber: string;
// // // //   startNumber: number;
// // // //   executionDate: string;
// // // //   city: string;
// // // //   signatoryName: string;
// // // //   signatoryPosition: string;
// // // // }

// // // // interface Props {
// // // //   initialData?: any;
// // // //   onSave: (data: CertConfig) => void;
// // // //   isSaving: boolean;
// // // //   competencies?: any[]; // Data kompetensi dari parent
// // // //   includeCompetencies?: boolean; 
// // // //   courseId?: string;
// // // // }

// // // // export default function CertificateConfigForm({ 
// // // //   initialData, 
// // // //   onSave, 
// // // //   isSaving,
// // // //   competencies = [], 
// // // //   includeCompetencies = false, 
// // // //   courseId 
// // // // }: Props) {
  
// // // //   // State Lokal Form
// // // //   const [formData, setFormData] = useState<CertConfig>({
// // // //     certificateNumber: '',
// // // //     startNumber: 1,
// // // //     executionDate: new Date().toISOString().split('T')[0],
// // // //     city: '',
// // // //     signatoryName: '',
// // // //     signatoryPosition: ''
// // // //   });

// // // //   const [isPreviewing, setIsPreviewing] = useState(false);

// // // //   // Load Data Awal dari Props
// // // //   useEffect(() => {
// // // //     if (initialData) {
// // // //       setFormData({
// // // //         certificateNumber: initialData.certificateNumber || '',
// // // //         startNumber: initialData.startNumber || 1,
// // // //         executionDate: initialData.executionDate 
// // // //           ? new Date(initialData.executionDate).toISOString().split('T')[0] 
// // // //           : new Date().toISOString().split('T')[0],
// // // //         city: initialData.city || '',
// // // //         signatoryName: initialData.signatoryName || '',
// // // //         signatoryPosition: initialData.signatoryPosition || ''
// // // //       });
// // // //     }
// // // //   }, [initialData]);

// // // //   const handleChange = (field: keyof CertConfig, value: string | number) => {
// // // //     setFormData(prev => ({ ...prev, [field]: value }));
// // // //   };

// // // //   // --- FUNGSI PREVIEW PDF ---
// // // //   const handlePreview = async () => {
// // // //     try {
// // // //       setIsPreviewing(true);
      
// // // //       let token = localStorage.getItem('token'); 
// // // //       if (!token) {
// // // //           const userStr = localStorage.getItem('user');
// // // //           if (userStr) {
// // // //               try { const user = JSON.parse(userStr); token = user.token || user.accessToken; } catch (e) {}
// // // //           }
// // // //       }

// // // //       if (!token) {
// // // //           alert("Sesi kadaluarsa. Silakan login ulang.");
// // // //           return;
// // // //       }

// // // //       const BACKEND_URL = 'http://localhost:4000'; 

// // // //       // [DEBUG] Log data sebelum dikirim
// // // //       console.log("DATA FORM:", formData);
// // // //       console.log("KOMPETENSI:", competencies);

// // // //       // Payload yang dikirim adalah DATA DARI FORM SAAT INI (formData), bukan initialData
// // // //       const payload = {
// // // //         certificateConfig: formData, // <--- INI KUNCINYA
// // // //         competencies: competencies, 
// // // //         includeCompetenciesInCertificate: includeCompetencies,
// // // //         courseId: courseId
// // // //       };

// // // //       const response = await fetch(`${BACKEND_URL}/api/courses/certificate/preview`, {
// // // //         method: 'POST',
// // // //         headers: {
// // // //           'Content-Type': 'application/json',
// // // //           'Authorization': `Bearer ${token}`
// // // //         },
// // // //         body: JSON.stringify(payload)
// // // //       });

// // // //       if (!response.ok) {
// // // //           const errText = await response.text();
// // // //           throw new Error(`Gagal (${response.status}): ${errText}`);
// // // //       }

// // // //       const blob = await response.blob();
// // // //       const url = window.URL.createObjectURL(blob);
// // // //       window.open(url, '_blank');

// // // //     } catch (error: any) {
// // // //       console.error("Preview Error:", error);
// // // //       alert(`Gagal memuat preview: ${error.message}`);
// // // //     } finally {
// // // //       setIsPreviewing(false);
// // // //     }
// // // //   };

// // // //   // Helper tanggal
// // // //   const getIndonesianDatePreview = (dateString: string) => {
// // // //     if (!dateString) return '-';
// // // //     try {
// // // //       const date = new Date(dateString);
// // // //       return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
// // // //     } catch (e) { return '-'; }
// // // //   };

// // // //   return (
// // // //     <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mt-6">
// // // //       <div className="flex justify-between items-center mb-6">
// // // //         <h3 className="text-lg font-bold text-gray-800">📜 Pengaturan Data Sertifikat</h3>
        
// // // //         <div className="flex gap-2">
// // // //             <button
// // // //                 type="button"
// // // //                 onClick={handlePreview}
// // // //                 disabled={isPreviewing}
// // // //                 className="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-50 flex items-center gap-2 transition-colors shadow-sm"
// // // //                 aria-label="Lihat Draft PDF"
// // // //             >
// // // //                 {isPreviewing ? <RefreshCw size={16} className="animate-spin"/> : <Eye size={16}/>}
// // // //                 {isPreviewing ? 'Loading...' : 'Lihat Draft PDF'}
// // // //             </button>

// // // //             <button
// // // //                 onClick={() => onSave(formData)}
// // // //                 disabled={isSaving}
// // // //                 className="bg-purple-700 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-purple-800 disabled:opacity-50 flex items-center gap-2 transition-colors shadow-md"
// // // //                 aria-label="Simpan Pengaturan"
// // // //             >
// // // //                 {isSaving ? <RefreshCw size={16} className="animate-spin"/> : <Save size={16}/>}
// // // //                 {isSaving ? 'Menyimpan...' : 'Simpan Pengaturan'}
// // // //             </button>
// // // //         </div>
// // // //       </div>

// // // //       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// // // //         {/* KOLOM KIRI */}
// // // //         <div className="space-y-5">
// // // //           <h4 className="text-sm font-bold text-gray-500 uppercase border-b pb-2">Detail Pelaksanaan</h4>
          
// // // //           <div>
// // // //             <label className="block text-sm font-bold text-gray-700 mb-1">Format Nomor Sertifikat (SK)</label>
// // // //             <input
// // // //               type="text"
// // // //               placeholder="Contoh: 00{NO}/DIKLAT/03.01.09/IX/2025"
// // // //               value={formData.certificateNumber}
// // // //               onChange={(e) => handleChange('certificateNumber', e.target.value)}
// // // //               className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none font-mono"
// // // //               aria-label="Format Nomor Sertifikat"
// // // //             />
// // // //             <div className="flex gap-1 mt-1 text-[10px] text-gray-500 items-center">
// // // //                 <Info size={10} aria-hidden="true" />
// // // //                 <span>Gunakan <code>{'{NO}'}</code> agar sistem mengisi nomor urut otomatis.</span>
// // // //             </div>
// // // //           </div>

// // // //           <div>
// // // //             <label className="block text-sm font-bold text-blue-700 mb-1">Nomor Awal Peserta (Start Number)</label>
// // // //             <div className="flex items-center gap-3">
// // // //                 <input
// // // //                   type="number"
// // // //                   min="1"
// // // //                   value={formData.startNumber}
// // // //                   onChange={(e) => handleChange('startNumber', parseInt(e.target.value) || 1)}
// // // //                   className="w-24 border border-blue-300 bg-blue-50 text-center font-bold text-blue-800 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
// // // //                   aria-label="Nomor Awal Peserta"
// // // //                   placeholder="1"
// // // //                 />
// // // //                 <p className="text-xs text-gray-500 flex-1 leading-tight">
// // // //                   Jika diisi <strong>87</strong>, peserta pertama mendapat nomor <strong>0087</strong>, dst.
// // // //                 </p>
// // // //             </div>
// // // //           </div>

// // // //           <div>
// // // //             <label className="block text-sm font-bold text-gray-700 mb-1">Tanggal Dilaksanakan</label>
// // // //             <input
// // // //               type="date"
// // // //               value={formData.executionDate}
// // // //               onChange={(e) => handleChange('executionDate', e.target.value)}
// // // //               className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
// // // //               aria-label="Tanggal Dilaksanakan"
// // // //             />
// // // //             <p className="text-xs text-green-600 mt-1 font-medium">
// // // //               Akan tertulis: {getIndonesianDatePreview(formData.executionDate)}
// // // //             </p>
// // // //           </div>

// // // //           <div>
// // // //             <label className="block text-sm font-bold text-gray-700 mb-1">Tempat Pelaksanaan (Kota)</label>
// // // //             <input
// // // //               type="text"
// // // //               placeholder="Contoh: Singaraja"
// // // //               value={formData.city}
// // // //               onChange={(e) => handleChange('city', e.target.value)}
// // // //               className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
// // // //               aria-label="Tempat Pelaksanaan"
// // // //             />
// // // //           </div>
// // // //         </div>

// // // //         {/* KOLOM KANAN */}
// // // //         <div className="space-y-5 bg-gray-50 p-5 rounded-xl border border-gray-100 h-fit">
// // // //           <h4 className="text-sm font-bold text-gray-500 uppercase border-b pb-2">Pejabat Penanda Tangan</h4>
          
// // // //           <div>
// // // //             <label className="block text-sm font-bold text-gray-700 mb-1">Jabatan</label>
// // // //             <input
// // // //               type="text"
// // // //               placeholder="Contoh: Ketua / Kepala Pusdiklat"
// // // //               value={formData.signatoryPosition}
// // // //               onChange={(e) => handleChange('signatoryPosition', e.target.value)}
// // // //               className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none bg-white"
// // // //               aria-label="Jabatan Penanda Tangan"
// // // //             />
// // // //           </div>

// // // //           <div>
// // // //             <label className="block text-sm font-bold text-gray-700 mb-1">Nama Lengkap & Gelar</label>
// // // //             <input
// // // //               type="text"
// // // //               placeholder="Contoh: dr. I NYOMAN SUTJIDRA, Sp.OG"
// // // //               value={formData.signatoryName}
// // // //               onChange={(e) => handleChange('signatoryName', e.target.value)}
// // // //               className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none bg-white"
// // // //               aria-label="Nama Penanda Tangan"
// // // //             />
// // // //           </div>

// // // //           <div className="text-xs text-gray-400 italic pt-4 border-t border-gray-200">
// // // //             *Data ini akan otomatis muncul di halaman depan dan belakang sertifikat PDF yang diunduh siswa.
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }
// // // 'use client';

// // // import { useState, useEffect } from 'react';
// // // import { RefreshCw, Save, Eye, Info } from 'lucide-react';

// // // interface CertConfig {
// // //   certificateNumber: string;
// // //   startNumber: number;
// // //   executionDate: string;
// // //   city: string;
// // //   // Penanda Tangan
// // //   signatoryName: string;
// // //   signatoryPosition: string;      // Jabatan Indo
// // //   signatoryPositionEng: string;   // Jabatan Inggris (Baru)
// // //   // Pelaksana (Di atas Jabatan)
// // //   executorIndo: string;           // Baru (misal: Pengurus Pusat)
// // //   executorEng: string;            // Baru (misal: Central Board Member)
// // //   // Judul Khusus
// // //   courseNameIndo: string;         // Baru (Override Judul Kursus)
// // //   courseNameEng: string;          // Baru (Judul Inggris)
// // // }

// // // interface Props {
// // //   initialData?: any;
// // //   onSave: (data: CertConfig) => void;
// // //   isSaving: boolean;
// // //   competencies?: any[]; 
// // //   includeCompetencies?: boolean; 
// // //   courseId?: string;
// // // }

// // // export default function CertificateConfigForm({ 
// // //   initialData, 
// // //   onSave, 
// // //   isSaving,
// // //   competencies = [], 
// // //   includeCompetencies = false, 
// // //   courseId 
// // // }: Props) {
  
// // //   const [formData, setFormData] = useState<CertConfig>({
// // //     certificateNumber: '',
// // //     startNumber: 1,
// // //     executionDate: new Date().toISOString().split('T')[0],
// // //     city: '',
// // //     signatoryName: '',
// // //     signatoryPosition: '',
// // //     signatoryPositionEng: '',
// // //     executorIndo: '',
// // //     executorEng: '',
// // //     courseNameIndo: '',
// // //     courseNameEng: ''
// // //   });

// // //   const [isPreviewing, setIsPreviewing] = useState(false);

// // //   useEffect(() => {
// // //     if (initialData) {
// // //       setFormData({
// // //         certificateNumber: initialData.certificateNumber || '',
// // //         startNumber: initialData.startNumber || 1,
// // //         executionDate: initialData.executionDate 
// // //           ? new Date(initialData.executionDate).toISOString().split('T')[0] 
// // //           : new Date().toISOString().split('T')[0],
// // //         city: initialData.city || '',
// // //         signatoryName: initialData.signatoryName || '',
// // //         signatoryPosition: initialData.signatoryPosition || '',
// // //         signatoryPositionEng: initialData.signatoryPositionEng || '',
// // //         executorIndo: initialData.executorIndo || '',
// // //         executorEng: initialData.executorEng || '',
// // //         courseNameIndo: initialData.courseNameIndo || '',
// // //         courseNameEng: initialData.courseNameEng || ''
// // //       });
// // //     }
// // //   }, [initialData]);

// // //   const handleChange = (field: keyof CertConfig, value: string | number) => {
// // //     setFormData(prev => ({ ...prev, [field]: value }));
// // //   };

// // //   const handlePreview = async () => {
// // //     try {
// // //       setIsPreviewing(true);
      
// // //       let token = localStorage.getItem('token'); 
// // //       if (!token) {
// // //           const userStr = localStorage.getItem('user');
// // //           if (userStr) {
// // //               try { const user = JSON.parse(userStr); token = user.token || user.accessToken; } catch (e) {}
// // //           }
// // //       }

// // //       if (!token) {
// // //           alert("Sesi kadaluarsa. Silakan login ulang.");
// // //           return;
// // //       }

// // //       const BACKEND_URL = 'http://localhost:3000'; 

// // //       const payload = {
// // //         certificateConfig: formData, 
// // //         competencies: competencies, 
// // //         includeCompetenciesInCertificate: includeCompetencies,
// // //         courseId: courseId
// // //       };

// // //       const response = await fetch(`${BACKEND_URL}/api/courses/certificate/preview`, {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //           'Authorization': `Bearer ${token}`
// // //         },
// // //         body: JSON.stringify(payload)
// // //       });

// // //       if (!response.ok) {
// // //           const errText = await response.text();
// // //           throw new Error(`Gagal (${response.status}): ${errText}`);
// // //       }

// // //       const blob = await response.blob();
// // //       const url = window.URL.createObjectURL(blob);
// // //       window.open(url, '_blank');

// // //     } catch (error: any) {
// // //       console.error("Preview Error:", error);
// // //       alert(`Gagal memuat preview: ${error.message}`);
// // //     } finally {
// // //       setIsPreviewing(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mt-6">
// // //       <div className="flex justify-between items-center mb-6">
// // //         <h3 className="text-lg font-bold text-gray-800">📜 Pengaturan Data Sertifikat</h3>
        
// // //         <div className="flex gap-2">
// // //             <button
// // //                 type="button"
// // //                 onClick={handlePreview}
// // //                 disabled={isPreviewing}
// // //                 title="Lihat Draft PDF"
// // //                 className="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-50 flex items-center gap-2 transition-colors shadow-sm"
// // //             >
// // //                 {isPreviewing ? <RefreshCw size={16} className="animate-spin"/> : <Eye size={16}/>}
// // //                 {isPreviewing ? 'Loading...' : 'Lihat Draft PDF'}
// // //             </button>

// // //             <button
// // //                 onClick={() => onSave(formData)}
// // //                 disabled={isSaving}
// // //                 title="Simpan Pengaturan"
// // //                 className="bg-purple-700 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-purple-800 disabled:opacity-50 flex items-center gap-2 transition-colors shadow-md"
// // //             >
// // //                 {isSaving ? <RefreshCw size={16} className="animate-spin"/> : <Save size={16}/>}
// // //                 {isSaving ? 'Menyimpan...' : 'Simpan Pengaturan'}
// // //             </button>
// // //         </div>
// // //       </div>

// // //       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
// // //         {/* KOLOM KIRI: Detail Pelaksanaan */}
// // //         <div className="space-y-5">
// // //           <h4 className="text-sm font-bold text-gray-500 uppercase border-b pb-2">Detail Pelaksanaan</h4>
          
// // //           {/* NOMOR */}
// // //           <div>
// // //             <label className="block text-sm font-bold text-gray-700 mb-1">Format Nomor Sertifikat</label>
// // //             <input
// // //               type="text"
// // //               title="Format Nomor"
// // //               placeholder="Contoh: 00{NO}/DIKLAT/03.01.09/IX/2025"
// // //               value={formData.certificateNumber}
// // //               onChange={(e) => handleChange('certificateNumber', e.target.value)}
// // //               className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none font-mono"
// // //             />
// // //             <div className="flex gap-1 mt-1 text-[10px] text-gray-500 items-center">
// // //                 <Info size={10} /> <span>Gunakan <code>{'{NO}'}</code> untuk nomor urut otomatis.</span>
// // //             </div>
// // //           </div>

// // //           {/* START NUMBER */}
// // //           <div>
// // //             <label className="block text-sm font-bold text-blue-700 mb-1">Nomor Awal Peserta</label>
// // //             <div className="flex items-center gap-3">
// // //                 <input
// // //                   type="number"
// // //                   min="1"
// // //                   title="Start Number"
// // //                   value={formData.startNumber}
// // //                   onChange={(e) => handleChange('startNumber', parseInt(e.target.value) || 1)}
// // //                   className="w-24 border border-blue-300 bg-blue-50 text-center font-bold text-blue-800 rounded-lg px-3 py-2 text-sm"
// // //                 />
// // //                 <p className="text-xs text-gray-500">Jika diisi 96, peserta pertama dapat nomor 0096.</p>
// // //             </div>
// // //           </div>

// // //           {/* TANGGAL & TEMPAT */}
// // //           <div className="grid grid-cols-2 gap-4">
// // //             <div>
// // //                 <label className="block text-sm font-bold text-gray-700 mb-1">Tanggal</label>
// // //                 <input
// // //                   type="date"
// // //                   title="Tanggal"
// // //                   value={formData.executionDate}
// // //                   onChange={(e) => handleChange('executionDate', e.target.value)}
// // //                   className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
// // //                 />
// // //             </div>
// // //             <div>
// // //                 <label className="block text-sm font-bold text-gray-700 mb-1">Kota</label>
// // //                 <input
// // //                   type="text"
// // //                   title="Kota"
// // //                   placeholder="Jakarta"
// // //                   value={formData.city}
// // //                   onChange={(e) => handleChange('city', e.target.value)}
// // //                   className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
// // //                 />
// // //             </div>
// // //           </div>

// // //           {/* JUDUL PELATIHAN (CUSTOM) */}
// // //           <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mt-4">
// // //             <h5 className="text-xs font-bold text-gray-500 mb-2">JUDUL PELATIHAN (Opsional/Override)</h5>
// // //             <div className="space-y-3">
// // //                 <div>
// // //                     <label className="block text-xs font-bold text-gray-700 mb-1">Judul Indonesia</label>
// // //                     <input
// // //                       type="text"
// // //                       title="Judul Indo"
// // //                       placeholder="Default: Mengikuti Nama Kursus"
// // //                       value={formData.courseNameIndo}
// // //                       onChange={(e) => handleChange('courseNameIndo', e.target.value)}
// // //                       className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
// // //                     />
// // //                 </div>
// // //                 <div>
// // //                     <label className="block text-xs font-bold text-gray-700 mb-1">Judul Inggris (English Title)</label>
// // //                     <input
// // //                       type="text"
// // //                       title="Judul Inggris"
// // //                       placeholder="Contoh: Basic Training of Volunteer Corps"
// // //                       value={formData.courseNameEng}
// // //                       onChange={(e) => handleChange('courseNameEng', e.target.value)}
// // //                       className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm italic"
// // //                     />
// // //                 </div>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* KOLOM KANAN: Pejabat Penanda Tangan */}
// // //         <div className="space-y-5 bg-gray-50 p-5 rounded-xl border border-gray-100 h-fit">
// // //           <h4 className="text-sm font-bold text-gray-500 uppercase border-b pb-2">Pejabat Penanda Tangan</h4>
          
// // //           {/* PELAKSANA (ATAS JABATAN) */}
// // //           <div className="grid grid-cols-2 gap-3">
// // //              <div className="col-span-2">
// // //                 <label className="block text-xs font-bold text-gray-500 mb-1">Pelaksana / Struktur (Di atas Jabatan)</label>
// // //              </div>
// // //              <div>
// // //                 <input
// // //                   type="text"
// // //                   title="Pelaksana Indo"
// // //                   placeholder="ID: Pengurus Pusat"
// // //                   value={formData.executorIndo}
// // //                   onChange={(e) => handleChange('executorIndo', e.target.value)}
// // //                   className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
// // //                 />
// // //              </div>
// // //              <div>
// // //                 <input
// // //                   type="text"
// // //                   title="Pelaksana Inggris"
// // //                   placeholder="EN: Central Board Member"
// // //                   value={formData.executorEng}
// // //                   onChange={(e) => handleChange('executorEng', e.target.value)}
// // //                   className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm italic"
// // //                 />
// // //              </div>
// // //           </div>

// // //           <hr className="border-gray-200"/>

// // //           {/* JABATAN */}
// // //           <div className="grid grid-cols-2 gap-3">
// // //              <div className="col-span-2">
// // //                 <label className="block text-xs font-bold text-gray-500 mb-1">Jabatan Penanda Tangan</label>
// // //              </div>
// // //              <div>
// // //                 <input
// // //                   type="text"
// // //                   title="Jabatan Indo"
// // //                   placeholder="ID: Ketua / Kepala"
// // //                   value={formData.signatoryPosition}
// // //                   onChange={(e) => handleChange('signatoryPosition', e.target.value)}
// // //                   className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
// // //                 />
// // //              </div>
// // //              <div>
// // //                 <input
// // //                   type="text"
// // //                   title="Jabatan Inggris"
// // //                   placeholder="EN: Chairman / Head"
// // //                   value={formData.signatoryPositionEng}
// // //                   onChange={(e) => handleChange('signatoryPositionEng', e.target.value)}
// // //                   className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm italic"
// // //                 />
// // //              </div>
// // //           </div>

// // //           {/* NAMA */}
// // //           <div>
// // //             <label className="block text-sm font-bold text-gray-700 mb-1">Nama Lengkap & Gelar</label>
// // //             <input
// // //               type="text"
// // //               title="Nama Penanda Tangan"
// // //               placeholder="Contoh: dr. H. Jusuf Kalla"
// // //               value={formData.signatoryName}
// // //               onChange={(e) => handleChange('signatoryName', e.target.value)}
// // //               className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-bold"
// // //             />
// // //           </div>

// // //           <div className="text-[10px] text-gray-400 italic pt-2">
// // //             *Data ini akan muncul otomatis di bagian tanda tangan halaman depan dan belakang.
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // 'use client';

// // import { useState, useEffect } from 'react';
// // import { RefreshCw, Save, Eye, Info } from 'lucide-react';

// // interface CertConfig {
// //   certificateNumber: string;
// //   startNumber: number;
// //   executionDate: string;
// //   city: string;
// //   signatoryName: string;
// //   signatoryPosition: string;      
// //   signatoryPositionEng: string;   
// //   executorIndo: string;           
// //   executorEng: string;            
// //   courseNameIndo: string;         
// //   courseNameEng: string;          
// // }

// // interface Props {
// //   initialData?: any;
// //   onSave: (data: CertConfig) => void;
// //   isSaving: boolean;
// //   competencies?: any[]; 
// //   includeCompetencies?: boolean; 
// //   courseId?: string;
// // }

// // export default function CertificateConfigForm({ 
// //   initialData, 
// //   onSave, 
// //   isSaving,
// //   competencies = [], 
// //   includeCompetencies = false, 
// //   courseId 
// // }: Props) {
  
// //   const [formData, setFormData] = useState<CertConfig>({
// //     certificateNumber: '',
// //     startNumber: 1,
// //     executionDate: new Date().toISOString().split('T')[0],
// //     city: '',
// //     signatoryName: '',
// //     signatoryPosition: '',
// //     signatoryPositionEng: '',
// //     executorIndo: '',
// //     executorEng: '',
// //     courseNameIndo: '',
// //     courseNameEng: ''
// //   });

// //   const [isPreviewing, setIsPreviewing] = useState(false);

// //   useEffect(() => {
// //     if (initialData) {
// //       setFormData({
// //         certificateNumber: initialData.certificateNumber || '',
// //         startNumber: initialData.startNumber || 1,
// //         executionDate: initialData.executionDate 
// //           ? new Date(initialData.executionDate).toISOString().split('T')[0] 
// //           : new Date().toISOString().split('T')[0],
// //         city: initialData.city || '',
// //         signatoryName: initialData.signatoryName || '',
// //         signatoryPosition: initialData.signatoryPosition || '',
// //         signatoryPositionEng: initialData.signatoryPositionEng || '',
// //         executorIndo: initialData.executorIndo || '',
// //         executorEng: initialData.executorEng || '',
// //         courseNameIndo: initialData.courseNameIndo || '',
// //         courseNameEng: initialData.courseNameEng || ''
// //       });
// //     }
// //   }, [initialData]);

// //   const handleChange = (field: keyof CertConfig, value: string | number) => {
// //     setFormData(prev => ({ ...prev, [field]: value }));
// //   };

// //   const handlePreview = async () => {
// //     try {
// //       setIsPreviewing(true);
      
// //       let token = localStorage.getItem('token'); 
// //       if (!token) {
// //           const userStr = localStorage.getItem('user');
// //           if (userStr) {
// //               try { const user = JSON.parse(userStr); token = user.token || user.accessToken; } catch (e) {}
// //           }
// //       }

// //       if (!token) {
// //           alert("Sesi kadaluarsa. Silakan login ulang.");
// //           return;
// //       }

// //       // [FIX] Pastikan Port Backend Benar (Biasanya 4000 atau 5000, bukan 3000)
// //       const BACKEND_URL = 'http://localhost:4000'; 

// //       const payload = {
// //         certificateConfig: formData, 
// //         competencies: competencies, 
// //         includeCompetenciesInCertificate: includeCompetencies,
// //         courseId: courseId
// //       };

// //       const response = await fetch(`${BACKEND_URL}/api/courses/certificate/preview`, {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'Authorization': `Bearer ${token}`
// //         },
// //         body: JSON.stringify(payload)
// //       });

// //       if (!response.ok) {
// //           const errText = await response.text();
// //           throw new Error(`Gagal (${response.status}): ${errText}`);
// //       }

// //       const blob = await response.blob();
// //       const url = window.URL.createObjectURL(blob);
// //       window.open(url, '_blank');

// //     } catch (error: any) {
// //       console.error("Preview Error:", error);
// //       alert(`Gagal memuat preview: ${error.message}`);
// //     } finally {
// //       setIsPreviewing(false);
// //     }
// //   };

// //   return (
// //     <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mt-6">
// //       <div className="flex justify-between items-center mb-6">
// //         <h3 className="text-lg font-bold text-gray-800">📜 Pengaturan Data Sertifikat</h3>
        
// //         <div className="flex gap-2">
// //             <button
// //                 type="button"
// //                 onClick={handlePreview}
// //                 disabled={isPreviewing}
// //                 title="Lihat Draft PDF"
// //                 className="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-50 flex items-center gap-2 transition-colors shadow-sm"
// //             >
// //                 {isPreviewing ? <RefreshCw size={16} className="animate-spin"/> : <Eye size={16}/>}
// //                 {isPreviewing ? 'Loading...' : 'Lihat Draft PDF'}
// //             </button>

// //             <button
// //                 onClick={() => onSave(formData)}
// //                 disabled={isSaving}
// //                 title="Simpan Pengaturan"
// //                 className="bg-purple-700 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-purple-800 disabled:opacity-50 flex items-center gap-2 transition-colors shadow-md"
// //             >
// //                 {isSaving ? <RefreshCw size={16} className="animate-spin"/> : <Save size={16}/>}
// //                 {isSaving ? 'Menyimpan...' : 'Simpan Pengaturan'}
// //             </button>
// //         </div>
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
// //         {/* KOLOM KIRI: Detail Pelaksanaan */}
// //         <div className="space-y-5">
// //           <h4 className="text-sm font-bold text-gray-500 uppercase border-b pb-2">Detail Pelaksanaan</h4>
          
// //           {/* NOMOR */}
// //           <div>
// //             <label className="block text-sm font-bold text-gray-700 mb-1">Format Nomor Sertifikat</label>
// //             <input
// //               type="text"
// //               title="Format Nomor"
// //               placeholder="Contoh: 00{NO}/DIKLAT/03.01.09/IX/2025"
// //               value={formData.certificateNumber}
// //               onChange={(e) => handleChange('certificateNumber', e.target.value)}
// //               className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none font-mono"
// //             />
// //             <div className="flex gap-1 mt-1 text-[10px] text-gray-500 items-center">
// //                 <Info size={10} /> <span>Gunakan <code>{'{NO}'}</code> untuk nomor urut otomatis.</span>
// //             </div>
// //           </div>

// //           {/* START NUMBER */}
// //           <div>
// //             <label className="block text-sm font-bold text-blue-700 mb-1">Nomor Awal Peserta</label>
// //             <div className="flex items-center gap-3">
// //                 <input
// //                   type="number"
// //                   min="1"
// //                   title="Start Number"
// //                   value={formData.startNumber}
// //                   onChange={(e) => handleChange('startNumber', parseInt(e.target.value) || 1)}
// //                   className="w-24 border border-blue-300 bg-blue-50 text-center font-bold text-blue-800 rounded-lg px-3 py-2 text-sm"
// //                 />
// //                 <p className="text-xs text-gray-500">Jika diisi 96, peserta pertama dapat nomor 0096.</p>
// //             </div>
// //           </div>

// //           {/* TANGGAL & TEMPAT */}
// //           <div className="grid grid-cols-2 gap-4">
// //             <div>
// //                 <label className="block text-sm font-bold text-gray-700 mb-1">Tanggal</label>
// //                 <input
// //                   type="date"
// //                   title="Tanggal"
// //                   value={formData.executionDate}
// //                   onChange={(e) => handleChange('executionDate', e.target.value)}
// //                   className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
// //                 />
// //             </div>
// //             <div>
// //                 <label className="block text-sm font-bold text-gray-700 mb-1">Kota</label>
// //                 <input
// //                   type="text"
// //                   title="Kota"
// //                   placeholder="Jakarta"
// //                   value={formData.city}
// //                   onChange={(e) => handleChange('city', e.target.value)}
// //                   className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
// //                 />
// //             </div>
// //           </div>

// //           {/* JUDUL PELATIHAN (CUSTOM) */}
// //           <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mt-4">
// //             <h5 className="text-xs font-bold text-gray-500 mb-2">JUDUL PELATIHAN (Opsional/Override)</h5>
// //             <div className="space-y-3">
// //                 <div>
// //                     <label className="block text-xs font-bold text-gray-700 mb-1">Judul Indonesia</label>
// //                     <input
// //                       type="text"
// //                       title="Judul Indo"
// //                       placeholder="Default: Mengikuti Nama Kursus"
// //                       value={formData.courseNameIndo}
// //                       onChange={(e) => handleChange('courseNameIndo', e.target.value)}
// //                       className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
// //                     />
// //                 </div>
// //                 <div>
// //                     <label className="block text-xs font-bold text-gray-700 mb-1">Judul Inggris (English Title)</label>
// //                     <input
// //                       type="text"
// //                       title="Judul Inggris"
// //                       placeholder="Contoh: Basic Training of Volunteer Corps"
// //                       value={formData.courseNameEng}
// //                       onChange={(e) => handleChange('courseNameEng', e.target.value)}
// //                       className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm italic"
// //                     />
// //                 </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* KOLOM KANAN: Pejabat Penanda Tangan */}
// //         <div className="space-y-5 bg-gray-50 p-5 rounded-xl border border-gray-100 h-fit">
// //           <h4 className="text-sm font-bold text-gray-500 uppercase border-b pb-2">Pejabat Penanda Tangan</h4>
          
// //           {/* PELAKSANA (ATAS JABATAN) */}
// //           <div className="grid grid-cols-2 gap-3">
// //              <div className="col-span-2">
// //                 <label className="block text-xs font-bold text-gray-500 mb-1">Pelaksana / Struktur (Di atas Jabatan)</label>
// //              </div>
// //              <div>
// //                 <input
// //                   type="text"
// //                   title="Pelaksana Indo"
// //                   placeholder="ID: Pengurus Pusat"
// //                   value={formData.executorIndo}
// //                   onChange={(e) => handleChange('executorIndo', e.target.value)}
// //                   className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
// //                 />
// //              </div>
// //              <div>
// //                 <input
// //                   type="text"
// //                   title="Pelaksana Inggris"
// //                   placeholder="EN: Central Board Member"
// //                   value={formData.executorEng}
// //                   onChange={(e) => handleChange('executorEng', e.target.value)}
// //                   className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm italic"
// //                 />
// //              </div>
// //           </div>

// //           <hr className="border-gray-200"/>

// //           {/* JABATAN */}
// //           <div className="grid grid-cols-2 gap-3">
// //              <div className="col-span-2">
// //                 <label className="block text-xs font-bold text-gray-500 mb-1">Jabatan Penanda Tangan</label>
// //              </div>
// //              <div>
// //                 <input
// //                   type="text"
// //                   title="Jabatan Indo"
// //                   placeholder="ID: Ketua / Kepala"
// //                   value={formData.signatoryPosition}
// //                   onChange={(e) => handleChange('signatoryPosition', e.target.value)}
// //                   className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
// //                 />
// //              </div>
// //              <div>
// //                 <input
// //                   type="text"
// //                   title="Jabatan Inggris"
// //                   placeholder="EN: Chairman / Head"
// //                   value={formData.signatoryPositionEng}
// //                   onChange={(e) => handleChange('signatoryPositionEng', e.target.value)}
// //                   className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm italic"
// //                 />
// //              </div>
// //           </div>

// //           {/* NAMA */}
// //           <div>
// //             <label className="block text-sm font-bold text-gray-700 mb-1">Nama Lengkap & Gelar</label>
// //             <input
// //               type="text"
// //               title="Nama Penanda Tangan"
// //               placeholder="Contoh: dr. H. Jusuf Kalla"
// //               value={formData.signatoryName}
// //               onChange={(e) => handleChange('signatoryName', e.target.value)}
// //               className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-bold"
// //             />
// //           </div>

// //           <div className="text-[10px] text-gray-400 italic pt-2">
// //             *Data ini akan muncul otomatis di bagian tanda tangan halaman depan dan belakang.
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { RefreshCw, Save, Eye, Info, X } from 'lucide-react';

// interface CertConfig {
//   certificateNumber: string;
//   startNumber: number;
//   executionDate: string;
//   city: string;
//   signatoryName: string;
//   signatoryPosition: string;      
//   signatoryPositionEng: string;   
//   executorIndo: string;           
//   executorEng: string;            
//   courseNameIndo: string;         
//   courseNameEng: string;          
//   useSignatureImage: boolean;     
//   signatureImageUrl?: string;     
// }

// interface Props {
//   initialData?: any;
//   onSave: (data: CertConfig) => void; // Fungsi simpan dari parent
//   isSaving: boolean;
//   competencies?: any[]; 
//   includeCompetencies?: boolean; 
//   courseId?: string;
//   courseTitle?: string; 
// }

// export default function CertificateConfigForm({ 
//   initialData, 
//   onSave, 
//   isSaving,
//   competencies = [], 
//   includeCompetencies = false, 
//   courseId,
//   courseTitle = 'Judul Pelatihan Asli'
// }: Props) {
  
//   // State Form
//   const [formData, setFormData] = useState<CertConfig>({
//     certificateNumber: '',
//     startNumber: 1,
//     executionDate: new Date().toISOString().split('T')[0],
//     city: '',
//     signatoryName: '',
//     signatoryPosition: '',
//     signatoryPositionEng: '',
//     executorIndo: '',
//     executorEng: '',
//     courseNameIndo: '',
//     courseNameEng: '',
//     useSignatureImage: false,
//     signatureImageUrl: ''
//   });

//   const [isPreviewing, setIsPreviewing] = useState(false);
//   const [isUploading, setIsUploading] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // Load Data Awal
//   useEffect(() => {
//     if (initialData) {
//       setFormData(prev => ({
//         ...prev, // Merge dengan default state agar field baru tidak undefined
//         certificateNumber: initialData.certificateNumber || '',
//         startNumber: initialData.startNumber || 1,
//         executionDate: initialData.executionDate ? new Date(initialData.executionDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
//         city: initialData.city || '',
//         signatoryName: initialData.signatoryName || '',
//         signatoryPosition: initialData.signatoryPosition || '',
//         signatoryPositionEng: initialData.signatoryPositionEng || '',
//         executorIndo: initialData.executorIndo || '',
//         executorEng: initialData.executorEng || '',
//         courseNameIndo: initialData.courseNameIndo || '',
//         courseNameEng: initialData.courseNameEng || '',
//         useSignatureImage: initialData.useSignatureImage || false,
//         signatureImageUrl: initialData.signatureImageUrl || ''
//       }));
//     }
//   }, [initialData]);

//   const handleChange = (field: keyof CertConfig, value: any) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   // --- LOGIC UPLOAD GAMBAR ---
//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     try {
//         setIsUploading(true);
//         const formDataUpload = new FormData();
//         formDataUpload.append('file', file);

//         // Upload ke endpoint backend
//         // Pastikan endpoint '/api/upload' sudah ada dan mengembalikan { url: '...' }
//         let token = localStorage.getItem('token');
//         if (!token) { 
//             const userStr = localStorage.getItem('user'); 
//             if(userStr) token = JSON.parse(userStr).token; 
//         }

//         const res = await fetch('http://localhost:4000/api/upload', {
//             method: 'POST',
//             headers: { 'Authorization': `Bearer ${token}` },
//             body: formDataUpload
//         });

//         if(!res.ok) throw new Error("Gagal upload gambar");
        
//         const data = await res.json();
//         const imageUrl = data.url || data.file?.url; // Sesuaikan dengan response backend upload Anda

//         // Update state dengan URL gambar baru
//         setFormData(prev => ({ ...prev, signatureImageUrl: imageUrl }));
        
//     } catch (err: any) {
//         alert("Upload Error: " + err.message);
//     } finally {
//         setIsUploading(false);
//         // Reset input file agar bisa upload ulang file yang sama jika perlu
//         if(fileInputRef.current) fileInputRef.current.value = '';
//     }
//   };

//   const handleRemoveSignature = () => {
//       setFormData(prev => ({ ...prev, signatureImageUrl: '' }));
//   };

//   // --- PREVIEW PDF ---
//   const handlePreview = async () => {
//     try {
//       setIsPreviewing(true);
//       let token = localStorage.getItem('token'); 
//       if (!token) {
//           const userStr = localStorage.getItem('user');
//           if (userStr) { try { const user = JSON.parse(userStr); token = user.token || user.accessToken; } catch (e) {} }
//       }
//       if (!token) return alert("Sesi kadaluarsa.");

//       const payload = {
//         certificateConfig: formData, 
//         competencies: competencies, 
//         includeCompetenciesInCertificate: includeCompetencies,
//         courseId: courseId
//       };

//       const response = await fetch(`http://localhost:4000/api/courses/certificate/preview`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
//         body: JSON.stringify(payload)
//       });

//       if (!response.ok) throw new Error(await response.text());
//       const blob = await response.blob();
//       window.open(window.URL.createObjectURL(blob), '_blank');

//     } catch (error: any) {
//       alert(`Gagal preview: ${error.message}`);
//     } finally {
//       setIsPreviewing(false);
//     }
//   };

//   return (
//     <div className="space-y-6">
//     <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mt-6">
//       <div className="flex justify-between items-center mb-6">
//         <h3 className="text-lg font-bold text-gray-800">📜 Pengaturan Data Sertifikat</h3>
//         <div className="flex gap-2">
//             <button type="button" onClick={handlePreview} disabled={isPreviewing} className="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-50 flex items-center gap-2">
//                 {isPreviewing ? <RefreshCw size={16} className="animate-spin"/> : <Eye size={16}/>} Preview PDF
//             </button>
//             {/* Tombol Simpan memanggil onSave dari parent yang akan kirim data ke DB */}
//             <button onClick={() => onSave(formData)} disabled={isSaving} className="bg-purple-700 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-purple-800 flex items-center gap-2">
//                 {isSaving ? <RefreshCw size={16} className="animate-spin"/> : <Save size={16}/>} Simpan
//             </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
//         {/* KOLOM KIRI */}
//         <div className="space-y-5">
//           <h4 className="text-sm font-bold text-gray-500 uppercase border-b pb-2">Detail Pelaksanaan</h4>
          
//           {/* JUDUL PELATIHAN */}
//           <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
//             <h5 className="text-xs font-bold text-blue-700 mb-2">JUDUL PELATIHAN (Utama)</h5>
//             <div className="space-y-3">
//                 <div>
//                     <label className="block text-xs font-bold text-gray-700 mb-1">Judul Indonesia</label>
//                     <input type="text" value={formData.courseNameIndo} onChange={(e) => handleChange('courseNameIndo', e.target.value)} placeholder={`Default: ${courseTitle}`} className="w-full border border-blue-200 rounded-lg px-3 py-2 text-sm bg-white" title="Judul Indo" aria-label="Judul Indo"/>
//                 </div>
//                 <div>
//                     <label className="block text-xs font-bold text-gray-700 mb-1">Judul Inggris</label>
//                     <input type="text" value={formData.courseNameEng} onChange={(e) => handleChange('courseNameEng', e.target.value)} placeholder="Contoh: Basic Training..." className="w-full border border-blue-200 rounded-lg px-3 py-2 text-sm italic bg-white" title="Judul Inggris" aria-label="Judul Inggris"/>
//                 </div>
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-bold text-gray-700 mb-1">Format Nomor Sertifikat</label>
//             <input type="text" value={formData.certificateNumber} onChange={(e) => handleChange('certificateNumber', e.target.value)} placeholder="00{NO}/DIKLAT/..." className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono" title="Format Nomor" aria-label="Format Nomor"/>
//             <div className="flex gap-1 mt-1 text-[10px] text-gray-500 items-center"><Info size={10} /> <span>Gunakan <code>{'{NO}'}</code> untuk auto-number.</span></div>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//              <div>
//                 <label className="block text-sm font-bold text-blue-700 mb-1">Start Number</label>
//                 <input type="number" min="1" value={formData.startNumber} onChange={(e) => handleChange('startNumber', parseInt(e.target.value)||1)} className="w-full border border-blue-300 bg-blue-50 text-center font-bold text-blue-800 rounded-lg px-3 py-2 text-sm" title="Start Num" aria-label="Start Num"/>
//              </div>
//              <div>
//                 <label className="block text-sm font-bold text-gray-700 mb-1">Kota</label>
//                 <input type="text" value={formData.city} onChange={(e) => handleChange('city', e.target.value)} placeholder="Jakarta" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" title="Kota" aria-label="Kota"/>
//              </div>
//           </div>
//           <div>
//              <label className="block text-sm font-bold text-gray-700 mb-1">Tanggal</label>
//              <input type="date" value={formData.executionDate} onChange={(e) => handleChange('executionDate', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" title="Tanggal" aria-label="Tanggal"/>
//           </div>
//         </div>

//         {/* KOLOM KANAN */}
//         <div className="space-y-5 bg-gray-50 p-5 rounded-xl border border-gray-100 h-fit">
//           <h4 className="text-sm font-bold text-gray-500 uppercase border-b pb-2">Pejabat Penanda Tangan</h4>
          
//           <div className="grid grid-cols-2 gap-3">
//              <div className="col-span-2"><label className="block text-xs font-bold text-gray-500">Pejabat Penanda Tangan (Executor)</label></div>
//              <input type="text" value={formData.executorIndo} onChange={(e) => handleChange('executorIndo', e.target.value)} placeholder="ID: Pengurus Pusat" className="col-span-1 border rounded px-2 py-1.5 text-sm" title="Executor Indo" aria-label="Executor Indo"/>
//              <input type="text" value={formData.executorEng} onChange={(e) => handleChange('executorEng', e.target.value)} placeholder="EN: Central Board..." className="col-span-1 border rounded px-2 py-1.5 text-sm italic" title="Executor Eng" aria-label="Executor Eng"/>
//           </div>

//           <hr className="border-gray-200"/>

//           <div className="grid grid-cols-2 gap-3">
//              <div className="col-span-2"><label className="block text-xs font-bold text-gray-500">Jabatan Penanda Tangan (Position)</label></div>
//              <input type="text" value={formData.signatoryPosition} onChange={(e) => handleChange('signatoryPosition', e.target.value)} placeholder="ID: Kepala Badiklat" className="col-span-1 border rounded px-2 py-1.5 text-sm" title="Job Indo" aria-label="Job Indo"/>
//              <input type="text" value={formData.signatoryPositionEng} onChange={(e) => handleChange('signatoryPositionEng', e.target.value)} placeholder="EN: Chairman" className="col-span-1 border rounded px-2 py-1.5 text-sm italic" title="Job Eng" aria-label="Job Eng"/>
//           </div>

//           <div>
//             <label className="block text-sm font-bold text-gray-700 mb-1">Nama Lengkap & Gelar</label>
//             <input type="text" value={formData.signatoryName} onChange={(e) => handleChange('signatoryName', e.target.value)} placeholder="Contoh: Dwi Hariyadi" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-bold" title="Nama" aria-label="Nama"/>
//           </div>

//           {/* UPLOAD TANDA TANGAN DIGITAL */}
//           <div className="bg-white p-3 rounded border border-gray-200">
//              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 cursor-pointer mb-2">
//                 <input type="checkbox" checked={formData.useSignatureImage} onChange={(e) => handleChange('useSignatureImage', e.target.checked)} className="w-4 h-4 text-blue-600 rounded" title="Checkbox TTD" aria-label="Checkbox TTD"/>
//                 Gunakan Tanda Tangan Digital (Opsional)
//              </label>
             
//              {formData.useSignatureImage && (
//                  <div className="mt-2 space-y-2">
//                     {/* Input File */}
//                     <input 
//                         type="file" 
//                         ref={fileInputRef} 
//                         onChange={handleFileChange} 
//                         className="text-xs text-gray-500 w-full file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//                         accept="image/*"
//                         disabled={isUploading}
//                         title="Upload File" 
//                         aria-label="Upload File"
//                     />
                    
//                     {/* Preview Gambar Tanda Tangan */}
//                     {isUploading && <p className="text-xs text-blue-500 animate-pulse">Sedang mengupload...</p>}
                    
//                     {formData.signatureImageUrl && (
//                         <div className="relative w-fit mt-2 border p-1 rounded bg-gray-50">
//                             <img src={formData.signatureImageUrl} alt="Preview TTD" className="h-16 object-contain" />
//                             <button 
//                                 onClick={handleRemoveSignature}
//                                 className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 shadow-md hover:bg-red-600"
//                                 title="Hapus Gambar"
//                             >
//                                 <X size={12}/>
//                             </button>
//                         </div>
//                     )}
//                  </div>
//              )}
//           </div>
//         </div>
//       </div>
//     </div>

//     {/* BOX DATA KONFIGURASI TERSIMPAN (PREVIEW BAWAH) */}
//     {formData && (
//         <div className="border rounded-xl overflow-hidden shadow-sm bg-white mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
//             <div className="bg-gray-50 px-5 py-3 border-b flex items-center gap-2 font-bold text-gray-700 text-sm">
//                 <Info size={16}/> Data Konfigurasi Tersimpan (Preview)
//             </div>
//             <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
//                 <div>
//                     <p className="text-xs text-gray-500 font-bold mb-1"># Judul Pelatihan</p>
//                     <div className="bg-blue-50 border border-blue-100 px-3 py-2 rounded">
//                         <p className="font-bold text-blue-800">{formData.courseNameIndo || courseTitle}</p>
//                         <p className="text-xs text-gray-500 italic">{formData.courseNameEng || '-'}</p>
//                     </div>
//                 </div>
//                 <div>
//                     <p className="text-xs text-gray-500 font-bold mb-1"># Format Nomor</p>
//                     <p className="font-mono bg-gray-50 border px-3 py-2 rounded text-gray-800">{formData.certificateNumber || '-'}</p>
//                 </div>
//                 <div>
//                     <p className="text-xs text-gray-500 font-bold mb-1"># Pejabat Penanda Tangan (Executor)</p>
//                     <div className="bg-gray-50 border px-3 py-2 rounded">
//                         <p className="font-bold text-gray-800">{formData.executorIndo || '-'}</p>
//                         <p className="text-xs text-gray-500 italic">{formData.executorEng}</p>
//                     </div>
//                 </div>
//                 <div>
//                     <p className="text-xs text-gray-500 font-bold mb-1"># Jabatan Penanda Tangan</p>
//                     <div className="bg-gray-50 border px-3 py-2 rounded">
//                         <p className="font-bold text-gray-800">{formData.signatoryPosition || '-'}</p>
//                         <p className="text-xs text-gray-500 italic">{formData.signatoryPositionEng}</p>
//                     </div>
//                 </div>
//                 <div className="col-span-1 md:col-span-2 flex justify-between items-start">
//                     <div>
//                         <p className="text-xs text-gray-500 font-bold mb-1"># Nama Penanda Tangan</p>
//                         <p className="font-bold text-gray-800 bg-gray-50 border px-3 py-2 rounded">{formData.signatoryName || '-'}</p>
//                     </div>
//                     {formData.useSignatureImage && formData.signatureImageUrl && (
//                         <div>
//                             <p className="text-xs text-gray-500 font-bold mb-1 text-right"># Preview TTD</p>
//                             <img src={formData.signatureImageUrl} className="h-12 border rounded bg-white p-1" alt="TTD"/>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     )}
//     </div>
//   );
// }
'use client';

import { useState, useEffect, useRef } from 'react';
import { RefreshCw, Save, Eye, Info, X, Upload } from 'lucide-react';

interface CertConfig {
  certificateNumber: string;
  startNumber: number;
  executionDate: string;
  city: string;
  signatoryName: string;
  signatoryPosition: string;      
  signatoryPositionEng: string;   
  executorIndo: string;           
  executorEng: string;            
  courseNameIndo: string;         
  courseNameEng: string;          
  useSignatureImage: boolean;     
  signatureImageUrl: string;      
}

interface Props {
  initialData?: any;
  onSave: (data: CertConfig) => void;
  isSaving: boolean;
  competencies?: any[]; 
  includeCompetencies?: boolean; 
  courseId?: string;
  courseTitle?: string;
}

export default function CertificateConfigForm({ 
  initialData, 
  onSave, 
  isSaving,
  competencies = [], 
  includeCompetencies = false, 
  courseId,
  courseTitle = 'Judul Pelatihan Asli'
}: Props) {
  
  // Default State (Aman)
  const [formData, setFormData] = useState<CertConfig>({
    certificateNumber: '',
    startNumber: 1,
    executionDate: new Date().toISOString().split('T')[0],
    city: '',
    signatoryName: '',
    signatoryPosition: '',
    signatoryPositionEng: '',
    executorIndo: '',
    executorEng: '',
    courseNameIndo: '',
    courseNameEng: '',
    useSignatureImage: false,
    signatureImageUrl: ''
  });

  const [isUploading, setIsUploading] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load Data Sekali Saja saat Komponen Mount atau InitialData berubah
  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
        ...prev,
        ...initialData, // Merge data yang ada
        startNumber: initialData.startNumber || 1,
        executionDate: initialData.executionDate 
          ? new Date(initialData.executionDate).toISOString().split('T')[0] 
          : new Date().toISOString().split('T')[0],
      }));
    }
  }, [initialData]);

  const handleChange = (field: keyof CertConfig, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
        setIsUploading(true);
        const formPayload = new FormData();
        formPayload.append('file', file);

        const token = localStorage.getItem('token');
        const BACKEND_URL = 'http://localhost:4000'; 
        
        const res = await fetch(`${BACKEND_URL}/api/upload/signature`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: formPayload
        });

        const data = await res.json();
        if (data.url) {
            handleChange('signatureImageUrl', data.url);
            handleChange('useSignatureImage', true);
        } else {
            alert("Gagal upload gambar.");
        }
    } catch (err) {
        console.error(err);
        alert("Error upload signature");
    } finally {
        setIsUploading(false);
        if(fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handlePreview = async () => {
    try {
      setIsPreviewing(true);
      let token = localStorage.getItem('token'); 
      if (!token) return alert("Sesi kadaluarsa.");

      const BACKEND_URL = 'http://localhost:4000'; 

      const payload = {
        certificateConfig: formData, 
        competencies: competencies, 
        includeCompetenciesInCertificate: includeCompetencies,
        courseId: courseId
      };

      const response = await fetch(`${BACKEND_URL}/api/courses/certificate/preview`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error(await response.text());
      const blob = await response.blob();
      window.open(window.URL.createObjectURL(blob), '_blank');

    } catch (error: any) {
      alert(`Gagal preview: ${error.message}`);
    } finally {
      setIsPreviewing(false);
    }
  };

  const getFullImageUrl = (path: string) => {
      if (!path) return '';
      if (path.startsWith('http')) return path;
      return `http://localhost:4000${path}`;
  };

  return (
    <div className="space-y-6">
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mt-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-800">📜 Pengaturan Data Sertifikat</h3>
        <div className="flex gap-2">
            <button type="button" onClick={handlePreview} disabled={isPreviewing} className="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-50 flex items-center gap-2" title="Preview">
                {isPreviewing ? <RefreshCw size={16} className="animate-spin"/> : <Eye size={16}/>} Preview PDF
            </button>
            <button onClick={() => onSave(formData)} disabled={isSaving} className="bg-purple-700 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-purple-800 flex items-center gap-2" title="Simpan">
                {isSaving ? <RefreshCw size={16} className="animate-spin"/> : <Save size={16}/>} Simpan
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* KOLOM KIRI */}
        <div className="space-y-5">
          <h4 className="text-sm font-bold text-gray-500 uppercase border-b pb-2">Detail Pelaksanaan</h4>
          
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
            <h5 className="text-xs font-bold text-blue-700 mb-2">JUDUL PELATIHAN (Utama)</h5>
            <div className="space-y-3">
                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Judul Indonesia</label>
                    <input type="text" value={formData.courseNameIndo} onChange={(e) => handleChange('courseNameIndo', e.target.value)} placeholder={`Default: ${courseTitle}`} className="w-full border border-blue-200 rounded-lg px-3 py-2 text-sm bg-white" title="Judul Indo"/>
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Judul Inggris</label>
                    <input type="text" value={formData.courseNameEng} onChange={(e) => handleChange('courseNameEng', e.target.value)} placeholder="Contoh: Basic Training..." className="w-full border border-blue-200 rounded-lg px-3 py-2 text-sm italic bg-white" title="Judul Ing"/>
                </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Format Nomor Sertifikat</label>
            <input type="text" value={formData.certificateNumber} onChange={(e) => handleChange('certificateNumber', e.target.value)} placeholder="00{NO}/DIKLAT/..." className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono" title="No Sertifikat"/>
            <div className="flex gap-1 mt-1 text-[10px] text-gray-500 items-center"><Info size={10} /> <span>Gunakan <code>{'{NO}'}</code> untuk auto-number.</span></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-sm font-bold text-blue-700 mb-1">Start Number</label>
                <input type="number" min="1" value={formData.startNumber} onChange={(e) => handleChange('startNumber', parseInt(e.target.value)||1)} className="w-full border border-blue-300 bg-blue-50 text-center font-bold text-blue-800 rounded-lg px-3 py-2 text-sm" title="Start No"/>
             </div>
             <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Kota</label>
                <input type="text" value={formData.city} onChange={(e) => handleChange('city', e.target.value)} placeholder="Jakarta" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" title="Kota"/>
             </div>
          </div>
          <div>
             <label className="block text-sm font-bold text-gray-700 mb-1">Tanggal</label>
             <input type="date" value={formData.executionDate} onChange={(e) => handleChange('executionDate', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" title="Tanggal"/>
          </div>
        </div>

        {/* KOLOM KANAN */}
        <div className="space-y-5 bg-gray-50 p-5 rounded-xl border border-gray-100 h-fit">
          <h4 className="text-sm font-bold text-gray-500 uppercase border-b pb-2">Pejabat Penanda Tangan</h4>
          
          <div className="grid grid-cols-2 gap-3">
             <div className="col-span-2"><label className="block text-xs font-bold text-gray-500">Pejabat Penanda Tangan (Executor)</label></div>
             <input type="text" value={formData.executorIndo} onChange={(e) => handleChange('executorIndo', e.target.value)} placeholder="ID: Pengurus Pusat" className="col-span-1 border rounded px-2 py-1.5 text-sm" title="Exec ID"/>
             <input type="text" value={formData.executorEng} onChange={(e) => handleChange('executorEng', e.target.value)} placeholder="EN: Central Board..." className="col-span-1 border rounded px-2 py-1.5 text-sm italic" title="Exec EN"/>
          </div>

          <hr className="border-gray-200"/>

          <div className="grid grid-cols-2 gap-3">
             <div className="col-span-2"><label className="block text-xs font-bold text-gray-500">Jabatan Penanda Tangan (Position)</label></div>
             <input type="text" value={formData.signatoryPosition} onChange={(e) => handleChange('signatoryPosition', e.target.value)} placeholder="ID: Kepala Badiklat" className="col-span-1 border rounded px-2 py-1.5 text-sm" title="Pos ID"/>
             <input type="text" value={formData.signatoryPositionEng} onChange={(e) => handleChange('signatoryPositionEng', e.target.value)} placeholder="EN: Chairman" className="col-span-1 border rounded px-2 py-1.5 text-sm italic" title="Pos EN"/>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Nama Lengkap & Gelar</label>
            <input type="text" value={formData.signatoryName} onChange={(e) => handleChange('signatoryName', e.target.value)} placeholder="Contoh: Dwi Hariyadi" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-bold" title="Nama"/>
          </div>

          {/* UPLOAD TANDA TANGAN */}
          <div className="bg-white p-3 rounded border border-gray-200">
             <label className="flex items-center gap-2 text-sm font-bold text-gray-700 cursor-pointer mb-2">
                <input type="checkbox" checked={formData.useSignatureImage} onChange={(e) => handleChange('useSignatureImage', e.target.checked)} className="w-4 h-4 text-blue-600 rounded" title="Checkbox TTD"/>
                Gunakan Tanda Tangan Digital (Opsional)
             </label>
             
             <div className="space-y-2">
                <div className="flex gap-2 items-center">
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" disabled={!formData.useSignatureImage} className="text-xs text-gray-500 w-full file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50" title="Upload File"/>
                    {isUploading && <span className="text-xs text-blue-600 animate-pulse">Uploading...</span>}
                </div>
                {/* PREVIEW GAMBAR TTD DI SINI */}
                {formData.signatureImageUrl && formData.useSignatureImage && (
                    <div className="relative w-full h-20 border rounded bg-gray-50 flex items-center justify-center overflow-hidden group">
                        <img src={getFullImageUrl(formData.signatureImageUrl)} alt="TTD Preview" className="h-full object-contain" />
                        <button onClick={() => handleChange('signatureImageUrl', '')} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" title="Hapus Gambar"><X size={12}/></button>
                    </div>
                )}
             </div>
          </div>
        </div>
      </div>
    </div>

    {/* PREVIEW BOX BAWAH */}
    {formData && (
        <div className="border rounded-xl overflow-hidden shadow-sm bg-white mt-4">
            <div className="bg-gray-50 px-5 py-3 border-b flex items-center gap-2 font-bold text-gray-700 text-sm">
                <Info size={16}/> Data Konfigurasi Tersimpan (Preview Live)
            </div>
            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div className="col-span-1 md:col-span-2">
                    <p className="text-xs text-gray-500 font-bold mb-1"># Judul Pelatihan</p>
                    <div className="font-bold text-blue-800 bg-blue-50 border border-blue-100 px-3 py-2 rounded">
                        {formData.courseNameIndo || courseTitle} 
                        <div className="font-normal text-xs text-gray-500 italic mt-1">{formData.courseNameEng || '-'}</div>
                    </div>
                </div>
                <div>
                    <p className="text-xs text-gray-500 font-bold mb-1"># Pejabat (Executor)</p>
                    <p className="font-bold text-gray-800 bg-gray-50 border px-3 py-2 rounded">{formData.executorIndo || '-'}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500 font-bold mb-1"># Jabatan (Position)</p>
                    <p className="font-bold text-gray-800 bg-gray-50 border px-3 py-2 rounded">{formData.signatoryPosition || '-'}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500 font-bold mb-1"># Nama Penanda Tangan</p>
                    <p className="font-bold text-gray-800 bg-gray-50 border px-3 py-2 rounded">{formData.signatoryName || '-'}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500 font-bold mb-1"># Tanda Tangan Digital</p>
                    <div className="h-12 w-full border bg-white flex items-center justify-center rounded">
                        {formData.useSignatureImage && formData.signatureImageUrl ? (
                            <img src={getFullImageUrl(formData.signatureImageUrl)} alt="TTD" className="h-full object-contain"/>
                        ) : (
                            <span className="text-xs text-gray-400 italic">Tidak digunakan</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )}
    </div>
  );
}
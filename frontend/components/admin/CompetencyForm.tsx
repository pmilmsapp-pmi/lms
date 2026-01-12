// // // // // // 'use client';

// // // // // // import { useState, useEffect } from 'react';

// // // // // // // Tipe Data untuk Props
// // // // // // interface Competency {
// // // // // //   code: string;
// // // // // //   title: string;
// // // // // // }

// // // // // // interface CompetencyFormProps {
// // // // // //   initialData?: Competency[];
// // // // // //   onChange: (data: Competency[]) => void;
// // // // // // }

// // // // // // export default function CompetencyForm({ initialData = [], onChange }: CompetencyFormProps) {
// // // // // //   const [competencies, setCompetencies] = useState<Competency[]>(initialData);

// // // // // //   // Update parent component setiap kali ada perubahan
// // // // // //   useEffect(() => {
// // // // // //     onChange(competencies);
// // // // // //   }, [competencies]);

// // // // // //   const handleAdd = () => {
// // // // // //     setCompetencies([...competencies, { code: '', title: '' }]);
// // // // // //   };

// // // // // //   const handleRemove = (index: number) => {
// // // // // //     const list = [...competencies];
// // // // // //     list.splice(index, 1);
// // // // // //     setCompetencies(list);
// // // // // //   };

// // // // // //   const handleChange = (index: number, field: 'code' | 'title', value: string) => {
// // // // // //     const list = [...competencies];
// // // // // //     list[index][field] = value;
// // // // // //     setCompetencies(list);
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mt-6">
// // // // // //       <div className="flex justify-between items-center mb-4">
// // // // // //         <h3 className="text-lg font-bold text-gray-800">📋 Daftar Unit Kompetensi (Kurikulum)</h3>
// // // // // //         <button
// // // // // //           type="button"
// // // // // //           onClick={handleAdd}
// // // // // //           className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors"
// // // // // //         >
// // // // // //           + Tambah Unit
// // // // // //         </button>
// // // // // //       </div>

// // // // // //       <div className="space-y-3">
// // // // // //         {competencies.length === 0 && (
// // // // // //           <p className="text-gray-400 text-sm italic text-center py-4 bg-gray-50 rounded-lg">
// // // // // //             Belum ada unit kompetensi. Klik tombol tambah di atas.
// // // // // //           </p>
// // // // // //         )}

// // // // // //         {competencies.map((item, index) => (
// // // // // //           <div key={index} className="flex gap-3 items-start animate-fadeIn">
// // // // // //             <div className="w-10 pt-3 text-center text-sm font-bold text-gray-400">
// // // // // //               {index + 1}.
// // // // // //             </div>
            
// // // // // //             <div className="w-1/3">
// // // // // //               <input
// // // // // //                 type="text"
// // // // // //                 placeholder="Kode Unit (Cth: 0.8423...)"
// // // // // //                 value={item.code}
// // // // // //                 onChange={(e) => handleChange(index, 'code', e.target.value)}
// // // // // //                 className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
// // // // // //               />
// // // // // //             </div>
            
// // // // // //             <div className="flex-1">
// // // // // //               <input
// // // // // //                 type="text"
// // // // // //                 placeholder="Judul Unit (Cth: Melakukan Pertolongan Pertama...)"
// // // // // //                 value={item.title}
// // // // // //                 onChange={(e) => handleChange(index, 'title', e.target.value)}
// // // // // //                 className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
// // // // // //               />
// // // // // //             </div>

// // // // // //             <button
// // // // // //               type="button"
// // // // // //               onClick={() => handleRemove(index)}
// // // // // //               className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
// // // // // //               title="Hapus Baris"
// // // // // //             >
// // // // // //               🗑️
// // // // // //             </button>
// // // // // //           </div>
// // // // // //         ))}
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }
// // // // // 'use client';

// // // // // import { useState, useEffect } from 'react';

// // // // // // Tipe Data
// // // // // interface Competency {
// // // // //   code: string;
// // // // //   title: string;
// // // // // }

// // // // // interface CompetencyFormProps {
// // // // //   initialData?: Competency[];
// // // // //   onChange: (data: Competency[]) => void;
// // // // // }

// // // // // export default function CompetencyForm({ initialData = [], onChange }: CompetencyFormProps) {
// // // // //   const [competencies, setCompetencies] = useState<Competency[]>(initialData);

// // // // //   // Sinkronisasi data awal jika parent update (misal setelah load API)
// // // // //   useEffect(() => {
// // // // //     if (initialData && initialData.length > 0) {
// // // // //       setCompetencies(initialData);
// // // // //     }
// // // // //   }, [initialData]);

// // // // //   // Kirim perubahan ke Parent Component setiap kali state berubah
// // // // //   useEffect(() => {
// // // // //     onChange(competencies);
// // // // //   }, [competencies]);

// // // // //   const handleAdd = () => {
// // // // //     setCompetencies([...competencies, { code: '', title: '' }]);
// // // // //   };

// // // // //   const handleRemove = (index: number) => {
// // // // //     const list = [...competencies];
// // // // //     list.splice(index, 1);
// // // // //     setCompetencies(list);
// // // // //   };

// // // // //   const handleChange = (index: number, field: 'code' | 'title', value: string) => {
// // // // //     const list = [...competencies];
// // // // //     list[index][field] = value;
// // // // //     setCompetencies(list);
// // // // //   };

// // // // //   return (
// // // // //     <div className="mt-4">
// // // // //       {/* HEADER & TOMBOL TAMBAH */}
// // // // //       <div className="flex justify-between items-center mb-3">
// // // // //         <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide">
// // // // //           Tabel Kurikulum (Unit Kompetensi)
// // // // //         </h4>
// // // // //         <button
// // // // //           type="button"
// // // // //           onClick={handleAdd}
// // // // //           className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-700 transition-all flex items-center gap-1 shadow-sm"
// // // // //         >
// // // // //           <span>+</span> Tambah Baris
// // // // //         </button>
// // // // //       </div>

// // // // //       {/* TABEL DATA */}
// // // // //       <div className="overflow-hidden border border-gray-200 rounded-xl shadow-sm">
// // // // //         <table className="min-w-full divide-y divide-gray-200">
// // // // //           <thead className="bg-gray-50">
// // // // //             <tr>
// // // // //               <th scope="col" className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider w-12 text-center">
// // // // //                 No.
// // // // //               </th>
// // // // //               <th scope="col" className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider w-1/3">
// // // // //                 No. Kode (Unit Code)
// // // // //               </th>
// // // // //               <th scope="col" className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
// // // // //                 Judul Unit (Unit Title)
// // // // //               </th>
// // // // //               <th scope="col" className="px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider w-16">
// // // // //                 Aksi
// // // // //               </th>
// // // // //             </tr>
// // // // //           </thead>
// // // // //           <tbody className="bg-white divide-y divide-gray-200">
// // // // //             {competencies.length === 0 ? (
// // // // //               <tr>
// // // // //                 <td colSpan={4} className="px-6 py-8 text-center text-gray-400 text-sm italic bg-gray-50/50">
// // // // //                   Belum ada data kompetensi. Klik tombol <strong>+ Tambah Baris</strong> di atas.
// // // // //                 </td>
// // // // //               </tr>
// // // // //             ) : (
// // // // //               competencies.map((item, index) => (
// // // // //                 <tr key={index} className="hover:bg-blue-50/30 transition-colors group">
// // // // //                   <td className="px-4 py-2 text-center text-sm text-gray-500 font-medium">
// // // // //                     {index + 1}
// // // // //                   </td>
// // // // //                   <td className="px-4 py-2">
// // // // //                     <input
// // // // //                       type="text"
// // // // //                       placeholder="Cth: 0.842340.028.01"
// // // // //                       value={item.code}
// // // // //                       onChange={(e) => handleChange(index, 'code', e.target.value)}
// // // // //                       className="w-full border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 text-sm py-1.5 px-2 bg-transparent group-hover:bg-white border focus:bg-white transition-all"
// // // // //                     />
// // // // //                   </td>
// // // // //                   <td className="px-4 py-2">
// // // // //                     <input
// // // // //                       type="text"
// // // // //                       placeholder="Cth: Menyosialisasikan Misi..."
// // // // //                       value={item.title}
// // // // //                       onChange={(e) => handleChange(index, 'title', e.target.value)}
// // // // //                       className="w-full border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 text-sm py-1.5 px-2 bg-transparent group-hover:bg-white border focus:bg-white transition-all"
// // // // //                     />
// // // // //                   </td>
// // // // //                   <td className="px-4 py-2 text-center">
// // // // //                     <button
// // // // //                       type="button"
// // // // //                       onClick={() => handleRemove(index)}
// // // // //                       className="text-red-400 hover:text-red-600 p-1.5 rounded-md hover:bg-red-50 transition-colors"
// // // // //                       title="Hapus Baris"
// // // // //                     >
// // // // //                       🗑️
// // // // //                     </button>
// // // // //                   </td>
// // // // //                 </tr>
// // // // //               ))
// // // // //             )}
// // // // //           </tbody>
// // // // //         </table>
// // // // //       </div>
      
// // // // //       <div className="mt-2 text-[10px] text-gray-400 text-right italic">
// // // // //         *Data ini akan dicetak pada halaman belakang sertifikat (Transkrip).
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }
// // // // 'use client';

// // // // import { useState, useEffect } from 'react';

// // // // // Tipe Data
// // // // interface Competency {
// // // //   code: string;
// // // //   title: string;
// // // // }

// // // // interface CompetencyFormProps {
// // // //   initialData?: Competency[];
// // // //   onChange: (data: Competency[]) => void;
// // // // }

// // // // export default function CompetencyForm({ initialData = [], onChange }: CompetencyFormProps) {
// // // //   const [competencies, setCompetencies] = useState<Competency[]>(initialData);

// // // //   // Sinkronisasi data awal jika parent update
// // // //   useEffect(() => {
// // // //     if (initialData && initialData.length > 0) {
// // // //       setCompetencies(initialData);
// // // //     }
// // // //   }, [initialData]);

// // // //   // Kirim perubahan ke Parent Component setiap kali state berubah
// // // //   useEffect(() => {
// // // //     onChange(competencies);
// // // //   }, [competencies]);

// // // //   const handleAdd = () => {
// // // //     setCompetencies([...competencies, { code: '', title: '' }]);
// // // //   };

// // // //   const handleRemove = (index: number) => {
// // // //     const list = [...competencies];
// // // //     list.splice(index, 1);
// // // //     setCompetencies(list);
// // // //   };

// // // //   const handleChange = (index: number, field: 'code' | 'title', value: string) => {
// // // //     const list = [...competencies];
// // // //     list[index][field] = value;
// // // //     setCompetencies(list);
// // // //   };

// // // //   return (
// // // //     <div className="mt-4">
// // // //       {/* HEADER & TOMBOL TAMBAH */}
// // // //       <div className="flex justify-between items-center mb-3">
// // // //         <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide">
// // // //           Tabel Kurikulum (Unit Kompetensi)
// // // //         </h4>
// // // //         <button
// // // //           type="button"
// // // //           onClick={handleAdd}
// // // //           className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-700 transition-all flex items-center gap-1 shadow-sm"
// // // //           title="Tambah Baris Baru"
// // // //         >
// // // //           <span>+</span> Tambah Baris
// // // //         </button>
// // // //       </div>

// // // //       {/* TABEL DATA */}
// // // //       <div className="overflow-hidden border border-gray-200 rounded-xl shadow-sm">
// // // //         <table className="min-w-full divide-y divide-gray-200">
// // // //           <thead className="bg-gray-50">
// // // //             <tr>
// // // //               {/* PERBAIKAN: Hapus 'text-left', gunakan 'text-center' saja */}
// // // //               <th scope="col" className="px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider w-12">
// // // //                 No.
// // // //               </th>
// // // //               {/* Kolom ini tetap text-left */}
// // // //               <th scope="col" className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider w-1/3">
// // // //                 No. Kode (Unit Code)
// // // //               </th>
// // // //               {/* Kolom ini tetap text-left */}
// // // //               <th scope="col" className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
// // // //                 Judul Unit (Unit Title)
// // // //               </th>
// // // //               {/* PERBAIKAN: Hapus 'text-left', gunakan 'text-center' saja */}
// // // //               <th scope="col" className="px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider w-16">
// // // //                 Aksi
// // // //               </th>
// // // //             </tr>
// // // //           </thead>
// // // //           <tbody className="bg-white divide-y divide-gray-200">
// // // //             {competencies.length === 0 ? (
// // // //               <tr>
// // // //                 <td colSpan={4} className="px-6 py-8 text-center text-gray-400 text-sm italic bg-gray-50/50">
// // // //                   Belum ada data kompetensi. Klik tombol <strong>+ Tambah Baris</strong> di atas.
// // // //                 </td>
// // // //               </tr>
// // // //             ) : (
// // // //               competencies.map((item, index) => (
// // // //                 <tr key={index} className="hover:bg-blue-50/30 transition-colors group">
// // // //                   <td className="px-4 py-2 text-center text-sm text-gray-500 font-medium">
// // // //                     {index + 1}
// // // //                   </td>
// // // //                   <td className="px-4 py-2">
// // // //                     <input
// // // //                       type="text"
// // // //                       placeholder="Cth: 0.842340.028.01"
// // // //                       value={item.code}
// // // //                       onChange={(e) => handleChange(index, 'code', e.target.value)}
// // // //                       className="w-full border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 text-sm py-1.5 px-2 bg-transparent group-hover:bg-white border focus:bg-white transition-all"
// // // //                       aria-label={`Kode Unit Baris ${index + 1}`}
// // // //                       title="Kode Unit"
// // // //                     />
// // // //                   </td>
// // // //                   <td className="px-4 py-2">
// // // //                     <input
// // // //                       type="text"
// // // //                       placeholder="Cth: Menyosialisasikan Misi..."
// // // //                       value={item.title}
// // // //                       onChange={(e) => handleChange(index, 'title', e.target.value)}
// // // //                       className="w-full border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 text-sm py-1.5 px-2 bg-transparent group-hover:bg-white border focus:bg-white transition-all"
// // // //                       aria-label={`Judul Unit Baris ${index + 1}`}
// // // //                       title="Judul Unit"
// // // //                     />
// // // //                   </td>
// // // //                   <td className="px-4 py-2 text-center">
// // // //                     <button
// // // //                       type="button"
// // // //                       onClick={() => handleRemove(index)}
// // // //                       className="text-red-400 hover:text-red-600 p-1.5 rounded-md hover:bg-red-50 transition-colors"
// // // //                       title="Hapus Baris"
// // // //                       aria-label={`Hapus Baris ${index + 1}`}
// // // //                     >
// // // //                       🗑️
// // // //                     </button>
// // // //                   </td>
// // // //                 </tr>
// // // //               ))
// // // //             )}
// // // //           </tbody>
// // // //         </table>
// // // //       </div>
      
// // // //       <div className="mt-2 text-[10px] text-gray-400 text-right italic">
// // // //         *Data ini akan dicetak pada halaman belakang sertifikat (Transkrip).
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }
// // // 'use client';

// // // import { useState, useEffect } from 'react';

// // // // Tipe Data
// // // interface Competency {
// // //   code: string;
// // //   title: string;
// // // }

// // // interface CompetencyFormProps {
// // //   initialData?: Competency[];
// // //   onChange: (data: Competency[]) => void;
// // // }

// // // export default function CompetencyForm({ initialData = [], onChange }: CompetencyFormProps) {
// // //   const [competencies, setCompetencies] = useState<Competency[]>(initialData);

// // //   // Sinkronisasi data awal jika parent update (misal setelah load API)
// // //   useEffect(() => {
// // //     if (initialData && initialData.length > 0) {
// // //       setCompetencies(initialData);
// // //     }
// // //   }, [initialData]);

// // //   // Kirim perubahan ke Parent Component setiap kali state berubah
// // //   useEffect(() => {
// // //     onChange(competencies);
// // //   }, [competencies, onChange]); // Tambahkan onChange ke dependency array untuk best practice

// // //   const handleAdd = () => {
// // //     setCompetencies([...competencies, { code: '', title: '' }]);
// // //   };

// // //   const handleRemove = (index: number) => {
// // //     const list = [...competencies];
// // //     list.splice(index, 1);
// // //     setCompetencies(list);
// // //   };

// // //   const handleChange = (index: number, field: 'code' | 'title', value: string) => {
// // //     const list = [...competencies];
// // //     list[index][field] = value;
// // //     setCompetencies(list);
// // //   };

// // //   return (
// // //     <div className="mt-4">
// // //       {/* HEADER & TOMBOL TAMBAH */}
// // //       <div className="flex justify-between items-center mb-3">
// // //         <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide">
// // //           Tabel Kurikulum (Unit Kompetensi)
// // //         </h4>
// // //         <button
// // //           type="button"
// // //           onClick={handleAdd}
// // //           className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-700 transition-all flex items-center gap-1 shadow-sm"
// // //           title="Tambah Baris Baru"
// // //           aria-label="Tambah Baris Baru"
// // //         >
// // //           <span>+</span> Tambah Baris
// // //         </button>
// // //       </div>

// // //       {/* TABEL DATA */}
// // //       <div className="overflow-hidden border border-gray-200 rounded-xl shadow-sm">
// // //         <table className="min-w-full divide-y divide-gray-200">
// // //           <thead className="bg-gray-50">
// // //             <tr>
// // //               <th scope="col" className="px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider w-12">
// // //                 No.
// // //               </th>
// // //               <th scope="col" className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider w-1/3">
// // //                 No. Kode (Unit Code)
// // //               </th>
// // //               <th scope="col" className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
// // //                 Judul Unit (Unit Title)
// // //               </th>
// // //               <th scope="col" className="px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider w-16">
// // //                 Aksi
// // //               </th>
// // //             </tr>
// // //           </thead>
// // //           <tbody className="bg-white divide-y divide-gray-200">
// // //             {competencies.length === 0 ? (
// // //               <tr>
// // //                 <td colSpan={4} className="px-6 py-8 text-center text-gray-400 text-sm italic bg-gray-50/50">
// // //                   Belum ada data kompetensi. Klik tombol <strong>+ Tambah Baris</strong> di atas.
// // //                 </td>
// // //               </tr>
// // //             ) : (
// // //               competencies.map((item, index) => (
// // //                 <tr key={index} className="hover:bg-blue-50/30 transition-colors group">
// // //                   <td className="px-4 py-2 text-center text-sm text-gray-500 font-medium">
// // //                     {index + 1}
// // //                   </td>
// // //                   <td className="px-4 py-2">
// // //                     <input
// // //                       type="text"
// // //                       placeholder="Cth: 0.842340.028.01"
// // //                       value={item.code}
// // //                       onChange={(e) => handleChange(index, 'code', e.target.value)}
// // //                       className="w-full border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 text-sm py-1.5 px-2 bg-transparent group-hover:bg-white border focus:bg-white transition-all"
// // //                       aria-label={`Kode Unit Baris ${index + 1}`}
// // //                       title="Kode Unit"
// // //                     />
// // //                   </td>
// // //                   <td className="px-4 py-2">
// // //                     <input
// // //                       type="text"
// // //                       placeholder="Cth: Menyosialisasikan Misi..."
// // //                       value={item.title}
// // //                       onChange={(e) => handleChange(index, 'title', e.target.value)}
// // //                       className="w-full border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 text-sm py-1.5 px-2 bg-transparent group-hover:bg-white border focus:bg-white transition-all"
// // //                       aria-label={`Judul Unit Baris ${index + 1}`}
// // //                       title="Judul Unit"
// // //                     />
// // //                   </td>
// // //                   <td className="px-4 py-2 text-center">
// // //                     <button
// // //                       type="button"
// // //                       onClick={() => handleRemove(index)}
// // //                       className="text-red-400 hover:text-red-600 p-1.5 rounded-md hover:bg-red-50 transition-colors"
// // //                       title="Hapus Baris"
// // //                       aria-label={`Hapus Baris ${index + 1}`}
// // //                     >
// // //                       🗑️
// // //                     </button>
// // //                   </td>
// // //                 </tr>
// // //               ))
// // //             )}
// // //           </tbody>
// // //         </table>
// // //       </div>
      
// // //       <div className="mt-2 text-[10px] text-gray-400 text-right italic">
// // //         *Data ini akan dicetak pada halaman belakang sertifikat (Transkrip).
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // 'use client';

// // import { useState, useEffect } from 'react';
// // import { Plus, Trash2, Save, FileText } from 'lucide-react';

// // interface Competency {
// //   code: string;
// //   title: string;
// // }

// // interface Props {
// //   initialData?: Competency[];
// //   onChange: (data: Competency[]) => void;
// // }

// // export default function CompetencyForm({ initialData, onChange }: Props) {
// //   const [rows, setRows] = useState<Competency[]>([{ code: '', title: '' }]);
// //   const [savedData, setSavedData] = useState<Competency[]>([]); // Untuk Tabel View

// //   useEffect(() => {
// //     if (initialData && initialData.length > 0) {
// //       setRows(initialData);
// //       setSavedData(initialData); // Tampilkan di tabel view jika sudah ada data
// //     }
// //   }, [initialData]);

// //   const addRow = () => setRows([...rows, { code: '', title: '' }]);

// //   const removeRow = (index: number) => {
// //     const newRows = rows.filter((_, i) => i !== index);
// //     setRows(newRows);
// //   };

// //   const updateRow = (index: number, field: keyof Competency, value: string) => {
// //     const newRows = [...rows];
// //     newRows[index][field] = value;
// //     setRows(newRows);
// //   };

// //   // Saat tombol Simpan diklik
// //   const handleSave = () => {
// //     // Filter baris kosong
// //     const validData = rows.filter(r => r.code.trim() !== '' && r.title.trim() !== '');
// //     onChange(validData); // Kirim ke parent (page.tsx) untuk disimpan ke DB
// //     setSavedData(validData); // Update tabel view
// //   };

// //   return (
// //     <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mt-6">
// //       <h3 className="text-lg font-bold text-gray-800 mb-4">📋 Kompetensi / Kurikulum</h3>

// //       {/* --- TABEL VIEW (SETELAH DISIMPAN) --- */}
// //       {savedData.length > 0 && (
// //         <div className="mb-8 border rounded-xl overflow-hidden animate-in fade-in slide-in-from-top-4">
// //           <div className="bg-green-50 px-4 py-3 border-b border-green-100 flex items-center gap-2">
// //             <FileText size={16} className="text-green-700"/>
// //             <span className="text-sm font-bold text-green-800">Daftar Kompetensi Tersimpan (Preview Halaman Belakang)</span>
// //           </div>
// //           <table className="w-full text-left text-sm">
// //             <thead className="bg-gray-50 border-b">
// //               <tr>
// //                 <th className="px-4 py-3 w-16 text-center border-r">No.</th>
// //                 <th className="px-4 py-3 w-48 border-r">No. Kode (Unit Code)</th>
// //                 <th className="px-4 py-3">Judul Unit (Unit Title)</th>
// //               </tr>
// //             </thead>
// //             <tbody className="divide-y">
// //               {savedData.map((item, idx) => (
// //                 <tr key={idx} className="hover:bg-gray-50">
// //                   <td className="px-4 py-2 text-center border-r font-mono text-gray-500">{idx + 1}</td>
// //                   <td className="px-4 py-2 border-r font-mono font-bold text-gray-700">{item.code}</td>
// //                   <td className="px-4 py-2 text-gray-700">{item.title}</td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       )}

// //       {/* --- FORM INPUT --- */}
// //       <div className="border rounded-xl overflow-hidden">
// //         <div className="bg-gray-50 px-4 py-2 border-b flex justify-between items-center">
// //           <span className="text-xs font-bold text-gray-500 uppercase">Input Data Kompetensi</span>
// //           <button 
// //             type="button" 
// //             onClick={addRow} 
// //             className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 font-bold flex items-center gap-1"
// //           >
// //             <Plus size={12} /> Tambah Baris
// //           </button>
// //         </div>
        
// //         <div className="p-4 space-y-3">
// //           {rows.map((row, index) => (
// //             <div key={index} className="flex gap-3 items-center">
// //               <span className="text-xs text-gray-400 w-6 text-center">{index + 1}.</span>
// //               <input
// //                 placeholder="No. Kode (Misal: 0.842340.028.01)"
// //                 className="w-1/3 border p-2 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none font-mono"
// //                 value={row.code}
// //                 onChange={(e) => updateRow(index, 'code', e.target.value)}
// //               />
// //               <input
// //                 placeholder="Judul Unit Kompetensi"
// //                 className="flex-1 border p-2 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
// //                 value={row.title}
// //                 onChange={(e) => updateRow(index, 'title', e.target.value)}
// //               />
// //               {rows.length > 1 && (
// //                 <button 
// //                   type="button"
// //                   onClick={() => removeRow(index)} 
// //                   className="text-red-400 hover:text-red-600 p-2"
// //                   aria-label="Hapus Baris" // [FIX] Tambahkan label aksesibilitas
// //                   title="Hapus Baris"      // [FIX] Tooltip saat hover
// //                 >
// //                   <Trash2 size={16} />
// //                 </button>
// //               )}
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       <div className="mt-4 text-right">
// //         <p className="text-xs text-gray-400 mb-2 italic">Pastikan data sudah benar sebelum disimpan.</p>
// //         <button 
// //             type="button" 
// //             onClick={handleSave} 
// //             className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold text-sm shadow hover:bg-blue-700 flex items-center gap-2 ml-auto"
// //         >
// //             <Save size={16}/> Simpan Kompetensi
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }
// 'use client';

// import { useState, useEffect } from 'react';
// import { Plus, Trash2, Info } from 'lucide-react';

// interface Competency {
//   code: string;
//   title: string;
//   titleEng: string;
//   useEnglish: boolean;
// }

// interface Props {
//   initialData?: any[];
//   onChange: (data: Competency[]) => void;
// }

// export default function CompetencyForm({ initialData = [], onChange }: Props) {
//   const [items, setItems] = useState<Competency[]>([]);

//   // Load Data
//   useEffect(() => {
//     if (initialData && initialData.length > 0) {
//       // Map data lama ke format baru jika perlu
//       const mapped = initialData.map(item => ({
//         code: item.code || '',
//         title: item.title || '',
//         titleEng: item.titleEng || '',
//         useEnglish: item.useEnglish !== undefined ? item.useEnglish : false
//       }));
//       setItems(mapped);
//     } else {
//       // Default 1 baris kosong
//       setItems([{ code: '', title: '', titleEng: '', useEnglish: false }]);
//     }
//   }, [initialData]);

//   // Update Parent saat ada perubahan
//   useEffect(() => {
//     onChange(items);
//   }, [items, onChange]);

//   const addRow = () => {
//     setItems([...items, { code: '', title: '', titleEng: '', useEnglish: false }]);
//   };

//   const removeRow = (index: number) => {
//     const newItems = items.filter((_, i) => i !== index);
//     setItems(newItems);
//   };

//   const updateRow = (index: number, field: keyof Competency, value: any) => {
//     const newItems = [...items];
//     // @ts-ignore
//     newItems[index][field] = value;
//     setItems(newItems);
//   };

//   return (
//     <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mt-6">
//       <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
//         📚 Kompetensi / Kurikulum
//       </h3>

//       {/* PREVIEW TABEL SEDERHANA */}
//       <div className="bg-green-50 border border-green-100 rounded-xl overflow-hidden mb-6">
//         <div className="px-4 py-2 bg-green-100 text-green-800 text-xs font-bold flex items-center gap-2">
//            <Info size={14}/> Preview Data Tersimpan (Halaman Belakang Sertifikat)
//         </div>
//         <table className="w-full text-sm text-left">
//             <thead className="bg-green-50 text-gray-600 border-b border-green-200">
//                 <tr>
//                     <th className="px-4 py-2 w-16 text-center">No.</th>
//                     <th className="px-4 py-2 w-32">Kode Unit</th>
//                     <th className="px-4 py-2">Judul Unit (Indonesia & Inggris)</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {items.map((item, idx) => (
//                     <tr key={idx} className="border-b border-green-100 last:border-0 hover:bg-green-50/50">
//                         <td className="px-4 py-2 text-center font-mono text-gray-500">{idx + 1}</td>
//                         <td className="px-4 py-2 font-mono font-bold text-gray-800">{item.code || '-'}</td>
//                         <td className="px-4 py-2">
//                             <div className="font-bold text-gray-800">{item.title || '-'}</div>
//                             {item.useEnglish && item.titleEng && (
//                                 <div className="text-gray-500 italic text-xs mt-0.5">{item.titleEng}</div>
//                             )}
//                         </td>
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//       </div>

//       {/* FORM INPUT */}
//       <div className="space-y-4">
//         {items.map((item, index) => (
//           <div key={index} className="flex flex-col gap-3 p-4 border rounded-xl bg-gray-50 hover:border-blue-300 transition-colors group relative">
            
//             {/* Tombol Hapus (Absolute Kanan Atas) */}
//             {items.length > 1 && (
//                 <button 
//                     onClick={() => removeRow(index)}
//                     className="absolute top-2 right-2 text-gray-400 hover:text-red-500 p-1"
//                     title="Hapus Baris"
//                 >
//                     <Trash2 size={16}/>
//                 </button>
//             )}

//             <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                
//                 {/* NO URUT */}
//                 <div className="md:col-span-1 flex items-center justify-center h-full pt-2">
//                     <span className="text-gray-400 font-mono font-bold">{index + 1}.</span>
//                 </div>

//                 {/* KODE UNIT */}
//                 <div className="md:col-span-3">
//                     <label className="block text-xs font-bold text-gray-500 mb-1">Kode Unit</label>
//                     <input 
//                         type="text" 
//                         value={item.code}
//                         onChange={(e) => updateRow(index, 'code', e.target.value)}
//                         placeholder="Contoh: O.842340.028.01"
//                         className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-blue-500 outline-none"
//                     />
//                 </div>

//                 {/* JUDUL INDONESIA */}
//                 <div className="md:col-span-8">
//                     <label className="block text-xs font-bold text-gray-500 mb-1">Judul Unit (Bahasa Indonesia)</label>
//                     <input 
//                         type="text" 
//                         value={item.title}
//                         onChange={(e) => updateRow(index, 'title', e.target.value)}
//                         placeholder="Contoh: Menyosialisasikan Misi Organisasi"
//                         className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none"
//                     />
//                 </div>
//             </div>

//             {/* OPSI BAHASA INGGRIS */}
//             <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
//                 <div className="md:col-span-1"></div> {/* Spacer */}
//                 <div className="md:col-span-11 bg-white p-3 rounded border border-gray-200">
//                     <label className="flex items-center gap-2 mb-2 cursor-pointer w-fit">
//                         <input 
//                             type="checkbox" 
//                             checked={item.useEnglish} 
//                             onChange={(e) => updateRow(index, 'useEnglish', e.target.checked)}
//                             className="w-4 h-4 text-blue-600 rounded"
//                         />
//                         <span className="text-xs font-bold text-blue-600">Tambahkan Terjemahan Bahasa Inggris (Opsional)</span>
//                     </label>
                    
//                     {item.useEnglish && (
//                         <input 
//                             type="text" 
//                             value={item.titleEng}
//                             onChange={(e) => updateRow(index, 'titleEng', e.target.value)}
//                             placeholder="Contoh: Socialize Mission And Organizational Service"
//                             className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm italic bg-gray-50 focus:bg-white transition-colors"
//                         />
//                     )}
//                 </div>
//             </div>

//           </div>
//         ))}
//       </div>

//       <button 
//         onClick={addRow}
//         className="mt-4 flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors"
//       >
//         <Plus size={16}/> Tambah Baris Kompetensi
//       </button>
//     </div>
//   );
// }
'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react';

interface Competency {
  code: string;
  title: string;      // Judul Indonesia
  titleEng: string;   // Judul Inggris
}

interface Props {
  initialData: Competency[];
  onChange: (data: Competency[]) => void;
}

export default function CompetencyForm({ initialData, onChange }: Props) {
  const [competencies, setCompetencies] = useState<Competency[]>(initialData || []);
  
  // State untuk Input Baru
  const [newCode, setNewCode] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newTitleEng, setNewTitleEng] = useState('');

  // State untuk Edit Mode
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editCode, setEditCode] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editTitleEng, setEditTitleEng] = useState('');

  // Sync dengan Parent saat Initial Data berubah
  useEffect(() => {
    if (initialData) {
        setCompetencies(initialData);
    }
  }, [initialData]);

  // Tambah Kompetensi Baru
  const handleAdd = () => {
    if (!newCode.trim() && !newTitle.trim()) return alert("Kode atau Judul harus diisi");
    
    const newItem: Competency = { 
        code: newCode, 
        title: newTitle, 
        titleEng: newTitleEng 
    };
    
    const updated = [...competencies, newItem];
    setCompetencies(updated);
    onChange(updated); // Update ke Parent

    // Reset Form
    setNewCode('');
    setNewTitle('');
    setNewTitleEng('');
  };

  // Hapus Kompetensi
  const handleDelete = (index: number) => {
    if (!confirm('Hapus kompetensi ini?')) return;
    const updated = competencies.filter((_, i) => i !== index);
    setCompetencies(updated);
    onChange(updated);
  };

  // Mulai Edit
  const startEdit = (index: number) => {
    setEditingIndex(index);
    setEditCode(competencies[index].code);
    setEditTitle(competencies[index].title);
    setEditTitleEng(competencies[index].titleEng || '');
  };

  // Simpan Edit
  const saveEdit = () => {
    if (editingIndex === null) return;
    
    const updated = [...competencies];
    updated[editingIndex] = {
        code: editCode,
        title: editTitle,
        titleEng: editTitleEng
    };
    
    setCompetencies(updated);
    onChange(updated);
    setEditingIndex(null); // Keluar mode edit
  };

  // Batal Edit
  const cancelEdit = () => {
    setEditingIndex(null);
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-800">📚 Unit Kompetensi</h3>
        <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded font-bold">Total: {competencies.length}</span>
      </div>

      {/* --- FORM INPUT BARU --- */}
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-3">
        <h4 className="text-xs font-bold text-gray-500 uppercase">Tambah Kompetensi Baru</h4>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-2">
                <input 
                    placeholder="Kode Unit" 
                    value={newCode} 
                    onChange={e => setNewCode(e.target.value)} 
                    className="w-full p-2 border rounded text-sm"
                    title="Kode Unit Baru"
                    aria-label="Kode Unit Baru"
                />
            </div>
            <div className="md:col-span-5">
                <input 
                    placeholder="Judul Unit (Indonesia)" 
                    value={newTitle} 
                    onChange={e => setNewTitle(e.target.value)} 
                    className="w-full p-2 border rounded text-sm"
                    title="Judul Unit Indonesia Baru"
                    aria-label="Judul Unit Indonesia Baru"
                />
            </div>
            <div className="md:col-span-4">
                <input 
                    placeholder="English Title (Optional)" 
                    value={newTitleEng} 
                    onChange={e => setNewTitleEng(e.target.value)} 
                    className="w-full p-2 border rounded text-sm italic"
                    title="Judul Unit Inggris Baru"
                    aria-label="Judul Unit Inggris Baru"
                />
            </div>
            <div className="md:col-span-1">
                <button 
                    onClick={handleAdd} 
                    className="w-full h-full bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center"
                    title="Tambah Kompetensi"
                    aria-label="Tambah Kompetensi"
                >
                    <Plus size={20}/>
                </button>
            </div>
        </div>
      </div>

      {/* --- TABEL DAFTAR KOMPETENSI (PREVIEW & EDIT) --- */}
      <div className="border rounded-xl overflow-hidden">
        <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-bold border-b">
                <tr>
                    <th className="p-3 w-10 text-center">No</th>
                    <th className="p-3 w-32">Kode Unit</th>
                    <th className="p-3">Judul Unit (ID / EN)</th>
                    <th className="p-3 w-24 text-center">Aksi</th>
                </tr>
            </thead>
            <tbody className="divide-y">
                {competencies.length === 0 ? (
                    <tr>
                        <td colSpan={4} className="p-8 text-center text-gray-400 italic">Belum ada data kompetensi.</td>
                    </tr>
                ) : (
                    competencies.map((comp, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                            <td className="p-3 text-center">{idx + 1}</td>
                            
                            {/* LOGIC TAMPILAN: EDIT MODE vs VIEW MODE */}
                            {editingIndex === idx ? (
                                <>
                                    <td className="p-2">
                                        <input 
                                            value={editCode} 
                                            onChange={e => setEditCode(e.target.value)} 
                                            className="w-full p-1 border rounded"
                                            title="Edit Kode Unit"
                                            aria-label="Edit Kode Unit"
                                        />
                                    </td>
                                    <td className="p-2 space-y-1">
                                        <input 
                                            value={editTitle} 
                                            onChange={e => setEditTitle(e.target.value)} 
                                            className="w-full p-1 border rounded placeholder-gray-300"
                                            placeholder="Judul Indo"
                                            title="Edit Judul Indonesia"
                                            aria-label="Edit Judul Indonesia"
                                        />
                                        <input 
                                            value={editTitleEng} 
                                            onChange={e => setEditTitleEng(e.target.value)} 
                                            className="w-full p-1 border rounded italic text-gray-500 placeholder-gray-300"
                                            placeholder="English Title"
                                            title="Edit Judul Inggris"
                                            aria-label="Edit Judul Inggris"
                                        />
                                    </td>
                                    <td className="p-2 text-center">
                                        <div className="flex justify-center gap-1">
                                            <button onClick={saveEdit} className="bg-green-100 text-green-700 p-1.5 rounded hover:bg-green-200" title="Simpan Perubahan" aria-label="Simpan Perubahan"><Check size={16}/></button>
                                            <button onClick={cancelEdit} className="bg-gray-100 text-gray-600 p-1.5 rounded hover:bg-gray-200" title="Batal Edit" aria-label="Batal Edit"><X size={16}/></button>
                                        </div>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td className="p-3 font-mono text-gray-700">{comp.code}</td>
                                    <td className="p-3">
                                        <div className="font-bold text-gray-800">{comp.title}</div>
                                        {comp.titleEng && <div className="text-xs text-gray-500 italic">{comp.titleEng}</div>}
                                    </td>
                                    <td className="p-3 text-center">
                                        <div className="flex justify-center gap-2">
                                            <button onClick={() => startEdit(idx)} className="text-blue-600 hover:bg-blue-50 p-1.5 rounded" title="Edit Baris" aria-label="Edit Baris"><Edit2 size={16}/></button>
                                            <button onClick={() => handleDelete(idx)} className="text-red-600 hover:bg-red-50 p-1.5 rounded" title="Hapus Baris" aria-label="Hapus Baris"><Trash2 size={16}/></button>
                                        </div>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))
                )}
            </tbody>
        </table>
      </div>
    </div>
  );
}
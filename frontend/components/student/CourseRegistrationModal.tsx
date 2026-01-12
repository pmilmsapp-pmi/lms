// // // 'use client';

// // // import { useState } from 'react';
// // // import { X, CheckCircle, Loader2 } from 'lucide-react';
// // // import { api } from '@/lib/api'; 

// // // interface Props {
// // //     courseId: string;
// // //     courseTitle: string;
// // //     user: any; 
// // //     onClose: () => void;
// // //     onSuccess: () => void;
// // // }

// // // export default function CourseRegistrationModal({ courseId, courseTitle, user, onClose, onSuccess }: Props) {
// // //     const [isLoading, setIsLoading] = useState(false);
    
// // //     const [formData, setFormData] = useState({
// // //         fullName: user?.name || '',
// // //         address: '',
// // //         birthPlace: '',
// // //         birthDate: '',
// // //         phoneNumber: '', 
// // //         email: user?.email || '',
// // //         pmiOrigin: '',
// // //         pmiMembershipId: '',
// // //         agreement: false 
// // //     });

// // //     const handleSubmit = async (e: React.FormEvent) => {
// // //         e.preventDefault();
// // //         if (!formData.agreement) return alert("Anda harus menyetujui pernyataan kesediaan.");

// // //         try {
// // //             setIsLoading(true);
// // //             await api(`/api/enrollments/${courseId}`, {
// // //                 method: 'POST',
// // //                 body: { registrationData: formData }
// // //             });
// // //             onSuccess();
// // //         } catch (error: any) {
// // //             alert(error.message || "Gagal mendaftar");
// // //         } finally {
// // //             setIsLoading(false);
// // //         }
// // //     };

// // //     const handleChange = (e: any) => {
// // //         const { name, value, type, checked } = e.target;
// // //         setFormData(prev => ({
// // //             ...prev,
// // //             [name]: type === 'checkbox' ? checked : value
// // //         }));
// // //     };

// // //     return (
// // //         <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
// // //             <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                
// // //                 {/* Header */}
// // //                 <div className="bg-red-700 p-5 text-white flex justify-between items-center shrink-0">
// // //                     <div>
// // //                         <h3 className="font-bold text-lg">Formulir Pendaftaran Peserta</h3>
// // //                         <p className="text-xs opacity-90 text-red-100 line-clamp-1">{courseTitle}</p>
// // //                     </div>
// // //                     {/* [FIX] Tambahkan aria-label dan title untuk tombol tutup */}
// // //                     <button 
// // //                         onClick={onClose} 
// // //                         className="p-2 hover:bg-white/20 rounded-full transition"
// // //                         aria-label="Tutup Formulir"
// // //                         title="Tutup Formulir"
// // //                     >
// // //                         <X size={20}/>
// // //                     </button>
// // //                 </div>

// // //                 {/* Body Form */}
// // //                 <div className="p-6 overflow-y-auto flex-1 space-y-5">
// // //                     <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm text-blue-800">
// // //                         <strong>Identitas Peserta:</strong><br/>
// // //                         Mohon lengkapi data berikut sesuai identitas asli Anda untuk keperluan sertifikat.
// // //                     </div>

// // //                     <form id="regForm" onSubmit={handleSubmit} className="space-y-4">
// // //                         {/* Nama */}
// // //                         <div>
// // //                             <label className="block text-sm font-bold text-gray-700 mb-1">Nama Lengkap</label>
// // //                             <input required name="fullName" value={formData.fullName} onChange={handleChange} className="w-full border p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-red-500 outline-none" placeholder="Sesuai KTP..." title="Nama Lengkap" />
// // //                         </div>

// // //                         {/* Alamat */}
// // //                         <div>
// // //                             <label className="block text-sm font-bold text-gray-700 mb-1">Alamat Domisili</label>
// // //                             <textarea required name="address" value={formData.address} onChange={handleChange} className="w-full border p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-red-500 outline-none h-20" placeholder="Alamat lengkap..." title="Alamat Domisili" />
// // //                         </div>

// // //                         {/* TTL */}
// // //                         <div className="grid grid-cols-2 gap-4">
// // //                             <div>
// // //                                 <label className="block text-sm font-bold text-gray-700 mb-1">Tempat Lahir</label>
// // //                                 <input required name="birthPlace" value={formData.birthPlace} onChange={handleChange} className="w-full border p-2.5 rounded-lg text-sm" placeholder="Kota" title="Tempat Lahir" />
// // //                             </div>
// // //                             <div>
// // //                                 <label className="block text-sm font-bold text-gray-700 mb-1">Tanggal Lahir</label>
// // //                                 {/* [FIX] Tambahkan title pada input date */}
// // //                                 <input required type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} className="w-full border p-2.5 rounded-lg text-sm" title="Tanggal Lahir" />
// // //                             </div>
// // //                         </div>

// // //                         {/* Kontak */}
// // //                         <div className="grid grid-cols-2 gap-4">
// // //                             <div>
// // //                                 <label className="block text-sm font-bold text-gray-700 mb-1">No. HP / WhatsApp</label>
// // //                                 <input required type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="w-full border p-2.5 rounded-lg text-sm" placeholder="08..." title="Nomor HP" />
// // //                             </div>
// // //                             <div>
// // //                                 <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
// // //                                 <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border p-2.5 rounded-lg text-sm bg-gray-50" readOnly title="Email Peserta" />
// // //                             </div>
// // //                         </div>

// // //                         {/* Data PMI */}
// // //                         <div className="grid grid-cols-2 gap-4">
// // //                             <div>
// // //                                 <label className="block text-sm font-bold text-gray-700 mb-1">Asal PMI (Kab/Kota)</label>
// // //                                 <input required name="pmiOrigin" value={formData.pmiOrigin} onChange={handleChange} className="w-full border p-2.5 rounded-lg text-sm" placeholder="Contoh: PMI Jakarta Selatan" title="Asal PMI" />
// // //                             </div>
// // //                             <div>
// // //                                 <label className="block text-sm font-bold text-gray-700 mb-1">Keanggotaan PMI</label>
// // //                                 <input name="pmiMembershipId" value={formData.pmiMembershipId} onChange={handleChange} className="w-full border p-2.5 rounded-lg text-sm" placeholder="Nomor Anggota (Opsional)" title="ID Keanggotaan PMI" />
// // //                             </div>
// // //                         </div>

// // //                         <hr className="border-gray-200 my-4"/>

// // //                         {/* Pernyataan */}
// // //                         <label className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition border">
// // //                             {/* [FIX] Tambahkan title pada checkbox */}
// // //                             <input type="checkbox" name="agreement" checked={formData.agreement} onChange={handleChange} className="w-5 h-5 text-red-600 mt-0.5 rounded focus:ring-red-500" title="Setujui Pernyataan" />
// // //                             <span className="text-xs text-gray-600 leading-relaxed text-justify">
// // //                                 <strong>PERNYATAAN:</strong> Menyatakan dengan ini bersedia untuk mengikuti tahapan seleksi dan rangkaian kegiatan pelatihan ini. Saya menjamin data yang saya isikan adalah benar.
// // //                             </span>
// // //                         </label>
// // //                     </form>
// // //                 </div>

// // //                 {/* Footer */}
// // //                 <div className="p-5 border-t bg-gray-50 flex justify-end gap-3 shrink-0">
// // //                     <button onClick={onClose} className="px-5 py-2.5 rounded-xl font-bold text-sm text-gray-600 hover:bg-gray-200 transition" disabled={isLoading}>Batal</button>
// // //                     <button 
// // //                         form="regForm" 
// // //                         type="submit" 
// // //                         disabled={isLoading || !formData.agreement}
// // //                         className="bg-red-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg hover:bg-red-800 disabled:opacity-50 flex items-center gap-2"
// // //                     >
// // //                         {isLoading ? <Loader2 className="animate-spin" size={18}/> : <CheckCircle size={18}/>}
// // //                         {isLoading ? 'Mengirim Data...' : 'Kirim & Daftar'}
// // //                     </button>
// // //                 </div>
// // //             </div>
// // //         </div>
// // //     );
// // // }

// // 'use client';

// // import { useState, useEffect } from 'react';
// // import { X, CheckCircle, Loader2, RefreshCw } from 'lucide-react';
// // import { api } from '@/lib/api'; 

// // interface Props {
// //     courseId: string;
// //     courseTitle: string;
// //     user: any; 
// //     onClose: () => void;
// //     onSuccess: () => void;
// // }

// // export default function CourseRegistrationModal({ courseId, courseTitle, user, onClose, onSuccess }: Props) {
// //     const [isLoading, setIsLoading] = useState(false);
// //     const [isFetchingData, setIsFetchingData] = useState(true);
    
// //     const [formData, setFormData] = useState({
// //         fullName: user?.name || '',
// //         address: '',
// //         birthPlace: '',
// //         birthDate: '',
// //         phoneNumber: '', 
// //         email: user?.email || '',
// //         pmiOrigin: '',
// //         pmiMembershipId: '',
// //         agreement: false 
// //     });

// //     useEffect(() => {
// //         const fetchLastData = async () => {
// //             try {
// //                 const lastData = await api('/api/enrollments/last-data');
// //                 if (lastData) {
// //                     setFormData(prev => ({
// //                         ...prev,
// //                         ...lastData,
// //                         email: user?.email || lastData.email,
// //                         agreement: false 
// //                     }));
// //                 }
// //             } catch (e) {
// //                 console.log("Belum ada data history");
// //             } finally {
// //                 setIsFetchingData(false);
// //             }
// //         };
// //         fetchLastData();
// //     }, [user]);

// //     const handleSubmit = async (e: React.FormEvent) => {
// //         e.preventDefault();
// //         if (!formData.agreement) return alert("Anda harus menyetujui pernyataan kesediaan.");

// //         try {
// //             setIsLoading(true);
// //             await api(`/api/enrollments/${courseId}`, {
// //                 method: 'POST',
// //                 body: { registrationData: formData }
// //             });
// //             onSuccess();
// //         } catch (error: any) {
// //             alert(error.message || "Gagal mendaftar");
// //         } finally {
// //             setIsLoading(false);
// //         }
// //     };

// //     const handleChange = (e: any) => {
// //         const { name, value, type, checked } = e.target;
// //         setFormData(prev => ({
// //             ...prev,
// //             [name]: type === 'checkbox' ? checked : value
// //         }));
// //     };

// //     return (
// //         <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
// //             <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                
// //                 {/* Header */}
// //                 <div className="bg-red-700 p-5 text-white flex justify-between items-center shrink-0">
// //                     <div>
// //                         <h3 className="font-bold text-lg">Konfirmasi Pendaftaran</h3>
// //                         <p className="text-xs opacity-90 text-red-100 line-clamp-1">{courseTitle}</p>
// //                     </div>
// //                     <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition" aria-label="Tutup" title="Tutup"><X size={20}/></button>
// //                 </div>

// //                 {/* Body Form */}
// //                 <div className="p-6 overflow-y-auto flex-1 space-y-5 bg-gray-50">
                    
// //                     {isFetchingData ? (
// //                         <div className="py-10 text-center text-gray-500 flex flex-col items-center">
// //                             <RefreshCw className="animate-spin mb-2" />
// //                             <p className="text-xs">Mengambil data profil Anda...</p>
// //                         </div>
// //                     ) : (
// //                         <>
// //                             <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm text-blue-800">
// //                                 <strong>Halo, {user?.name}!</strong><br/>
// //                                 Silakan periksa kembali data diri Anda di bawah ini. Jika ada perubahan, silakan ubah langsung pada kolom yang tersedia.
// //                             </div>

// //                             <form id="regForm" onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-xl border shadow-sm">
// //                                 {/* Nama */}
// //                                 <div>
// //                                     <label htmlFor="fullName" className="block text-xs font-bold text-gray-500 mb-1 uppercase">Nama Lengkap</label>
// //                                     <input id="fullName" required name="fullName" value={formData.fullName} onChange={handleChange} className="w-full border-b-2 border-gray-200 p-2 text-sm focus:border-red-500 outline-none bg-transparent font-bold text-gray-800" placeholder="Sesuai KTP..." />
// //                                 </div>

// //                                 {/* Alamat */}
// //                                 <div>
// //                                     <label htmlFor="address" className="block text-xs font-bold text-gray-500 mb-1 uppercase">Alamat Domisili</label>
// //                                     <textarea id="address" required name="address" value={formData.address} onChange={handleChange} className="w-full border p-3 rounded-lg text-sm focus:ring-2 focus:ring-red-500 outline-none h-20 bg-gray-50" placeholder="Alamat lengkap..." />
// //                                 </div>

// //                                 {/* TTL */}
// //                                 <div className="grid grid-cols-2 gap-4">
// //                                     <div>
// //                                         <label htmlFor="birthPlace" className="block text-xs font-bold text-gray-500 mb-1 uppercase">Tempat Lahir</label>
// //                                         <input id="birthPlace" required name="birthPlace" value={formData.birthPlace} onChange={handleChange} className="w-full border p-2 rounded-lg text-sm" />
// //                                     </div>
// //                                     <div>
// //                                         <label htmlFor="birthDate" className="block text-xs font-bold text-gray-500 mb-1 uppercase">Tanggal Lahir</label>
// //                                         <input id="birthDate" required type="date" name="birthDate" value={formData.birthDate ? new Date(formData.birthDate).toISOString().split('T')[0] : ''} onChange={handleChange} className="w-full border p-2 rounded-lg text-sm" />
// //                                     </div>
// //                                 </div>

// //                                 {/* Kontak */}
// //                                 <div className="grid grid-cols-2 gap-4">
// //                                     <div>
// //                                         <label htmlFor="phoneNumber" className="block text-xs font-bold text-gray-500 mb-1 uppercase">No. HP / WA</label>
// //                                         <input id="phoneNumber" required type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="w-full border p-2 rounded-lg text-sm" />
// //                                     </div>
// //                                     <div>
// //                                         <label htmlFor="email" className="block text-xs font-bold text-gray-500 mb-1 uppercase">Email</label>
// //                                         <input id="email" required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border p-2 rounded-lg text-sm bg-gray-100 text-gray-500 cursor-not-allowed" readOnly />
// //                                     </div>
// //                                 </div>

// //                                 {/* Data PMI */}
// //                                 <div className="grid grid-cols-2 gap-4 bg-red-50 p-3 rounded-lg border border-red-100">
// //                                     <div>
// //                                         <label htmlFor="pmiOrigin" className="block text-xs font-bold text-red-800 mb-1 uppercase">Asal PMI (Unit)</label>
// //                                         <input id="pmiOrigin" required name="pmiOrigin" value={formData.pmiOrigin} onChange={handleChange} className="w-full border p-2 rounded-lg text-sm bg-white" placeholder="Contoh: PMI Jakarta Selatan" />
// //                                     </div>
// //                                     <div>
// //                                         <label htmlFor="pmiMembershipId" className="block text-xs font-bold text-red-800 mb-1 uppercase">ID Keanggotaan</label>
// //                                         <input id="pmiMembershipId" name="pmiMembershipId" value={formData.pmiMembershipId} onChange={handleChange} className="w-full border p-2.5 rounded-lg text-sm bg-white" placeholder="Nomor Anggota" />
// //                                     </div>
// //                                 </div>

// //                                 <hr className="border-gray-200 my-4"/>

// //                                 {/* Pernyataan */}
// //                                 <label htmlFor="agreement" className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition border">
// //                                     <input id="agreement" type="checkbox" name="agreement" checked={formData.agreement} onChange={handleChange} className="w-5 h-5 text-red-600 mt-0.5 rounded focus:ring-red-500" title="Setujui" />
// //                                     <span className="text-xs text-gray-600 leading-relaxed text-justify">
// //                                         Dengan ini saya menyatakan data di atas adalah benar dan saya bersedia mengikuti seluruh rangkaian pelatihan.
// //                                     </span>
// //                                 </label>
// //                             </form>
// //                         </>
// //                     )}
// //                 </div>

// //                 {/* Footer */}
// //                 <div className="p-5 border-t bg-white flex justify-end gap-3 shrink-0">
// //                     <button onClick={onClose} className="px-5 py-2.5 rounded-xl font-bold text-sm text-gray-600 hover:bg-gray-100 transition" disabled={isLoading}>Batal</button>
// //                     <button 
// //                         form="regForm" 
// //                         type="submit" 
// //                         disabled={isLoading || !formData.agreement || isFetchingData}
// //                         className="bg-red-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg hover:bg-red-800 disabled:opacity-50 flex items-center gap-2"
// //                     >
// //                         {isLoading ? <Loader2 className="animate-spin" size={18}/> : <CheckCircle size={18}/>}
// //                         {isLoading ? 'Memproses...' : 'Konfirmasi & Daftar'}
// //                     </button>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }
// 'use client';

// import { useState, useEffect } from 'react';
// import { X, CheckCircle, Loader2, RefreshCw, User, MapPin, Calendar, Phone, Mail, Building } from 'lucide-react';
// import { api } from '@/lib/api'; 

// interface Props {
//     courseId: string;
//     courseTitle: string;
//     user: any; 
//     onClose: () => void;
//     onSuccess: () => void;
// }

// export default function CourseRegistrationModal({ courseId, courseTitle, user, onClose, onSuccess }: Props) {
//     const [isLoading, setIsLoading] = useState(false);
//     const [isFetchingData, setIsFetchingData] = useState(true);
//     const [isReadOnly, setIsReadOnly] = useState(false); // State untuk mengunci form
    
//     const [formData, setFormData] = useState({
//         fullName: user?.name || '',
//         address: '',
//         birthPlace: '',
//         birthDate: '',
//         phoneNumber: '', 
//         email: user?.email || '',
//         pmiOrigin: '',
//         pmiMembershipId: '',
//         agreement: false 
//     });

//     // Load data terakhir saat modal dibuka
//     useEffect(() => {
//         const fetchLastData = async () => {
//             try {
//                 const lastData = await api('/api/enrollments/last-data');
//                 if (lastData) {
//                     setFormData(prev => ({
//                         ...prev,
//                         ...lastData,
//                         email: user?.email || lastData.email, // Email selalu dari akun
//                         agreement: false
//                     }));
//                     setIsReadOnly(true); // KUNCI FORM JIKA DATA DITEMUKAN
//                 }
//             } catch (e) {
//                 console.log("Belum ada data history, mode input manual aktif.");
//             } finally {
//                 setIsFetchingData(false);
//             }
//         };
//         fetchLastData();
//     }, [user]);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!formData.agreement) return alert("Anda harus menyetujui pernyataan kesediaan.");

//         try {
//             setIsLoading(true);
//             await api(`/api/enrollments/${courseId}`, {
//                 method: 'POST',
//                 body: { registrationData: formData }
//             });
//             onSuccess();
//         } catch (error: any) {
//             alert(error.message || "Gagal mendaftar");
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleChange = (e: any) => {
//         const { name, value, type, checked } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: type === 'checkbox' ? checked : value
//         }));
//     };

//     // Helper class untuk input yang disabled
//     const inputClass = `w-full border p-2.5 rounded-lg text-sm outline-none transition-colors ${
//         isReadOnly 
//         ? 'bg-gray-100 text-gray-500 cursor-not-allowed border-gray-200' 
//         : 'bg-white text-gray-900 border-gray-300 focus:ring-2 focus:ring-red-500'
//     }`;

//     const labelClass = "block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider";

//     return (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
//             <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                
//                 {/* Header */}
//                 <div className="bg-red-700 p-5 text-white flex justify-between items-center shrink-0">
//                     <div>
//                         <h3 className="font-bold text-lg flex items-center gap-2">
//                             {isReadOnly ? <CheckCircle size={20}/> : <User size={20}/>}
//                             {isReadOnly ? 'Konfirmasi Pendaftaran' : 'Formulir Pendaftaran'}
//                         </h3>
//                         <p className="text-xs opacity-90 text-red-100 line-clamp-1">{courseTitle}</p>
//                     </div>
//                     <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition" aria-label="Tutup" title="Tutup"><X size={20}/></button>
//                 </div>

//                 {/* Body Form */}
//                 <div className="p-6 overflow-y-auto flex-1 space-y-5 bg-white">
                    
//                     {isFetchingData ? (
//                         <div className="py-20 text-center text-gray-400 flex flex-col items-center animate-pulse">
//                             <RefreshCw className="animate-spin mb-3 h-8 w-8 text-red-600" />
//                             <p className="text-sm font-medium">Memeriksa data kepesertaan...</p>
//                         </div>
//                     ) : (
//                         <>
//                             {isReadOnly ? (
//                                 <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl flex justify-between items-center text-yellow-800 text-sm">
//                                     <div>
//                                         <strong>Data Tersimpan Ditemukan</strong>
//                                         <p className="text-xs mt-1 opacity-80">Data berikut diambil dari pendaftaran sebelumnya.</p>
//                                     </div>
//                                     <button 
//                                         type="button" 
//                                         onClick={() => alert("Silakan update data melalui menu Profil Akun Anda.")}
//                                         className="bg-white border border-yellow-300 text-yellow-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-yellow-100 transition"
//                                     >
//                                         Ubah di Profil
//                                     </button>
//                                 </div>
//                             ) : (
//                                 <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl text-blue-800 text-sm">
//                                     <strong>Pendaftaran Baru</strong>
//                                     <p className="text-xs mt-1 opacity-80">Mohon lengkapi data diri Anda. Data ini akan disimpan untuk pendaftaran berikutnya.</p>
//                                 </div>
//                             )}

//                             <form id="regForm" onSubmit={handleSubmit} className="space-y-5">
//                                 {/* Nama */}
//                                 <div>
//                                     <label htmlFor="fullName" className={labelClass}>Nama Lengkap (Sesuai Sertifikat)</label>
//                                     <div className="relative">
//                                         <User className="absolute left-3 top-3 text-gray-400" size={16}/>
//                                         <input 
//                                             id="fullName" 
//                                             name="fullName" 
//                                             value={formData.fullName} 
//                                             onChange={handleChange} 
//                                             className={`${inputClass} pl-10 font-bold`} 
//                                             placeholder="Nama Lengkap..." 
//                                             disabled={isReadOnly}
//                                             required
//                                         />
//                                     </div>
//                                 </div>

//                                 {/* Alamat */}
//                                 <div>
//                                     <label htmlFor="address" className={labelClass}>Alamat Domisili</label>
//                                     <div className="relative">
//                                         <MapPin className="absolute left-3 top-3 text-gray-400" size={16}/>
//                                         <textarea 
//                                             id="address" 
//                                             name="address" 
//                                             value={formData.address} 
//                                             onChange={handleChange} 
//                                             className={`${inputClass} pl-10 h-24 resize-none`} 
//                                             placeholder="Alamat lengkap..." 
//                                             disabled={isReadOnly}
//                                             required
//                                         />
//                                     </div>
//                                 </div>

//                                 {/* TTL */}
//                                 <div className="grid grid-cols-2 gap-4">
//                                     <div>
//                                         <label htmlFor="birthPlace" className={labelClass}>Tempat Lahir</label>
//                                         <input id="birthPlace" name="birthPlace" value={formData.birthPlace} onChange={handleChange} className={inputClass} disabled={isReadOnly} required />
//                                     </div>
//                                     <div>
//                                         <label htmlFor="birthDate" className={labelClass}>Tanggal Lahir</label>
//                                         <input id="birthDate" type="date" name="birthDate" value={formData.birthDate ? new Date(formData.birthDate).toISOString().split('T')[0] : ''} onChange={handleChange} className={inputClass} disabled={isReadOnly} required />
//                                     </div>
//                                 </div>

//                                 {/* Kontak */}
//                                 <div className="grid grid-cols-2 gap-4">
//                                     <div>
//                                         <label htmlFor="phoneNumber" className={labelClass}>No. HP / WA</label>
//                                         <div className="relative">
//                                             <Phone className="absolute left-3 top-3 text-gray-400" size={16}/>
//                                             <input id="phoneNumber" type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className={`${inputClass} pl-10`} disabled={isReadOnly} required />
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <label htmlFor="email" className={labelClass}>Email</label>
//                                         <div className="relative">
//                                             <Mail className="absolute left-3 top-3 text-gray-400" size={16}/>
//                                             <input id="email" type="email" name="email" value={formData.email} className={`${inputClass} pl-10`} disabled readOnly />
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* Data PMI */}
//                                 <div className={`grid grid-cols-2 gap-4 p-4 rounded-xl border ${isReadOnly ? 'bg-gray-50 border-gray-200' : 'bg-red-50 border-red-100'}`}>
//                                     <div>
//                                         <label htmlFor="pmiOrigin" className={labelClass}>Asal PMI (Unit)</label>
//                                         <div className="relative">
//                                             <Building className="absolute left-3 top-3 text-gray-400" size={16}/>
//                                             <input id="pmiOrigin" name="pmiOrigin" value={formData.pmiOrigin} onChange={handleChange} className={`${inputClass} pl-10`} placeholder="Contoh: PMI Jakarta" disabled={isReadOnly} required />
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <label htmlFor="pmiMembershipId" className={labelClass}>ID Keanggotaan</label>
//                                         <input id="pmiMembershipId" name="pmiMembershipId" value={formData.pmiMembershipId} onChange={handleChange} className={inputClass} placeholder="Nomor Anggota" disabled={isReadOnly} />
//                                     </div>
//                                 </div>

//                                 <div className="border-t border-gray-100 my-4"></div>

//                                 {/* Pernyataan */}
//                                 <label htmlFor="agreement" className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition border border-gray-200">
//                                     <input id="agreement" type="checkbox" name="agreement" checked={formData.agreement} onChange={handleChange} className="w-5 h-5 text-red-600 mt-0.5 rounded focus:ring-red-500 cursor-pointer" title="Setujui" />
//                                     <span className="text-xs text-gray-600 leading-relaxed text-justify select-none">
//                                         Dengan ini saya menyatakan data di atas adalah benar dan saya bersedia mengikuti seluruh rangkaian pelatihan sesuai ketentuan yang berlaku di <strong>PMI Humanis</strong>.
//                                     </span>
//                                 </label>
//                             </form>
//                         </>
//                     )}
//                 </div>

//                 {/* Footer */}
//                 <div className="p-5 border-t bg-gray-50 flex justify-end gap-3 shrink-0">
//                     <button onClick={onClose} className="px-5 py-2.5 rounded-xl font-bold text-sm text-gray-600 hover:bg-gray-200 transition border border-gray-200" disabled={isLoading}>Batal</button>
//                     <button 
//                         form="regForm" 
//                         type="submit" 
//                         disabled={isLoading || !formData.agreement || isFetchingData}
//                         className="bg-red-700 text-white px-8 py-2.5 rounded-xl font-bold text-sm shadow-lg hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all active:scale-95"
//                     >
//                         {isLoading ? <Loader2 className="animate-spin" size={18}/> : (isReadOnly ? <CheckCircle size={18}/> : <CheckCircle size={18}/>)}
//                         {isLoading ? 'Memproses...' : (isReadOnly ? 'Konfirmasi Data' : 'Daftar Sekarang')}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }


'use client';

import { useState, useRef } from 'react';
import { X, UploadCloud, FileText, Download, AlertCircle } from 'lucide-react';
import { api, apiUpload } from '@/lib/api';

interface ModalProps {
    courseId: string;
    courseTitle: string;
    programType?: string; 
    user: any;
    onClose: () => void;
    onSuccess: () => void;
}

export default function CourseRegistrationModal({ courseId, courseTitle, programType = 'course', user, onClose, onSuccess }: ModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        reason: '',
        phoneNumber: '',
        institution: '',
    });
    
    // State Upload
    const [uploadedFileUrl, setUploadedFileUrl] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const isTraining = programType === 'training';

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const fd = new FormData();
            fd.append('file', file);
            const res = await apiUpload('/api/upload', fd);
            const url = res.url || res.file?.url || res.imageUrl;
            setUploadedFileUrl(url);
        } catch (err: any) {
            alert("Gagal upload: " + err.message);
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (isTraining && !uploadedFileUrl) {
            alert("Mohon upload Formulir Pendaftaran yang telah diisi.");
            return;
        }

        setIsSubmitting(true);
        try {
            await api(`/api/courses/${courseId}/enroll`, {
                method: 'POST',
                body: {
                    registrationData: {
                        ...formData,
                        fullName: user.name,
                        email: user.email,
                        uploadedFormUrl: uploadedFileUrl 
                    }
                }
            });
            onSuccess();
        } catch (error: any) {
            alert(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-[999] flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95">
                <div className="bg-red-700 p-4 text-white flex justify-between items-center">
                    <h3 className="font-bold text-lg">Pendaftaran {isTraining ? 'Pelatihan' : 'Kursus'}</h3>
                    <button onClick={onClose} className="hover:bg-red-800 p-1 rounded" title="Tutup" aria-label="Tutup"><X size={20}/></button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg border">
                        <p className="text-sm font-bold text-gray-800">{courseTitle}</p>
                        <p className="text-xs text-gray-500 mt-1">Pastikan data diri Anda benar sebelum mendaftar.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold text-gray-600 block mb-1">Nama Lengkap</label>
                            {/* [FIX] Tambahkan title dan aria-label */}
                            <input 
                                disabled 
                                value={user.name} 
                                className="w-full p-2 border rounded bg-gray-100 text-sm text-gray-500"
                                title="Nama Lengkap"
                                aria-label="Nama Lengkap"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-600 block mb-1">Email</label>
                            <input 
                                disabled 
                                value={user.email} 
                                className="w-full p-2 border rounded bg-gray-100 text-sm text-gray-500"
                                title="Email"
                                aria-label="Email"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-600 block mb-1">Nomor WhatsApp <span className="text-red-500">*</span></label>
                        <input required type="tel" className="w-full p-2 border rounded text-sm focus:ring-2 focus:ring-red-500 outline-none" placeholder="0812..." value={formData.phoneNumber} onChange={e=>setFormData({...formData, phoneNumber: e.target.value})} title="Nomor WhatsApp" aria-label="Nomor WhatsApp"/>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-600 block mb-1">Asal Instansi / PMI <span className="text-red-500">*</span></label>
                        <input required className="w-full p-2 border rounded text-sm focus:ring-2 focus:ring-red-500 outline-none" placeholder="Contoh: PMI Kota Jakarta Selatan" value={formData.institution} onChange={e=>setFormData({...formData, institution: e.target.value})} title="Asal Instansi" aria-label="Asal Instansi"/>
                    </div>

                    {isTraining && (
                        <div className="border-t pt-4 mt-4">
                            <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200 mb-4">
                                <h4 className="text-sm font-bold text-yellow-800 flex items-center gap-2 mb-2">
                                    <AlertCircle size={16}/> Syarat Wajib Pelatihan
                                </h4>
                                <ol className="list-decimal list-inside text-xs text-yellow-800 space-y-1">
                                    <li>Download Formulir Calon Peserta.</li>
                                    <li>Isi data secara manual dan tanda tangan.</li>
                                    <li>Scan/Foto formulir lalu upload kembali di bawah ini.</li>
                                </ol>
                                
                                {/* Pastikan file .docx ada di folder public/files/ */}
                                <a 
                                    href="/files/Formulir_Calon_Peserta_Pelatihan.docx" 
                                    download 
                                    className="mt-3 inline-flex items-center gap-2 bg-white border border-yellow-300 text-yellow-800 px-3 py-1.5 rounded text-xs font-bold hover:bg-yellow-100 transition-colors"
                                >
                                    <Download size={14}/> Download Template Formulir
                                </a>
                            </div>

                            <label className="text-xs font-bold text-gray-600 block mb-2">Upload Formulir yang sudah ditandatangani <span className="text-red-500">*</span></label>
                            
                            <div className="flex items-center gap-3">
                                <input 
                                    type="file" 
                                    ref={fileInputRef} 
                                    className="hidden" 
                                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                    onChange={handleUpload} 
                                    title="Upload Formulir Pendaftaran"
                                    aria-label="Upload Formulir Pendaftaran"
                                />
                                <button 
                                    type="button" 
                                    onClick={() => fileInputRef.current?.click()} 
                                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold border border-gray-300 flex items-center gap-2"
                                >
                                    {isUploading ? 'Mengupload...' : <><UploadCloud size={16}/> Pilih File</>}
                                </button>
                                {uploadedFileUrl && (
                                    <div className="flex items-center gap-1 text-green-600 text-xs font-bold">
                                        <FileText size={14}/> File Terupload
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="pt-4 flex justify-end gap-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg text-sm font-bold text-gray-500 hover:bg-gray-100">Batal</button>
                        <button 
                            type="submit" 
                            disabled={isSubmitting || isUploading || (isTraining && !uploadedFileUrl)} 
                            className="bg-red-700 hover:bg-red-800 text-white px-6 py-2 rounded-lg text-sm font-bold disabled:opacity-50 flex items-center gap-2"
                        >
                            {isSubmitting ? 'Mendaftarkan...' : 'Kirim Pendaftaran'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
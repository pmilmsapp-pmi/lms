// // 'use client';

// // import { useState, useEffect } from 'react';
// // import { X, Send, Loader2, FileText, HelpCircle, Upload, CheckCircle, Trash2 } from 'lucide-react';
// // import { api, apiUpload } from '@/lib/api';

// // interface CourseProposalModalProps {
// //     onClose: () => void;
// //     onSuccess: () => void;
// //     currentUser: any;
// // }

// // export default function CourseProposalModal({ onClose, onSuccess, currentUser }: CourseProposalModalProps) {
// //     const [loading, setLoading] = useState(false);
// //     const [configLoading, setConfigLoading] = useState(true);
    
// //     // Data Form
// //     const [formData, setFormData] = useState({
// //         title: '',
// //         programType: 'training',
// //         reason: '',
// //         organizer: 'PMI Pusat'
// //     });

// //     // Syarat Dokumen (Dari Admin CMS)
// //     const [requiredDocs, setRequiredDocs] = useState<string[]>([]);
    
// //     // File yang sudah diupload: { 'Kerangka Acuan': 'https://url...' }
// //     const [uploadedFiles, setUploadedFiles] = useState<Record<string, string>>({});
// //     const [uploadingItem, setUploadingItem] = useState<string | null>(null);

// //     // --- FETCH CONFIG ---
// //     useEffect(() => {
// //         const fetchRequirements = async () => {
// //             try {
// //                 const res = await api('/api/content');
// //                 // Default fallback jika admin belum setting
// //                 setRequiredDocs(res.trainingRequirements || ['Kerangka Acuan Kerja (KAK)']);
// //             } catch (e) {
// //                 console.error("Gagal load syarat dokumen", e);
// //             } finally {
// //                 setConfigLoading(false);
// //             }
// //         };
// //         fetchRequirements();
// //     }, []);

// //     const handleChange = (field: string, value: string) => {
// //         setFormData(prev => ({ ...prev, [field]: value }));
// //     };

// //     // --- HANDLER UPLOAD ---
// //     const handleFileUpload = async (docName: string, e: React.ChangeEvent<HTMLInputElement>) => {
// //         const file = e.target.files?.[0];
// //         if (!file) return;

// //         setUploadingItem(docName);
// //         try {
// //             const fd = new FormData();
// //             fd.append('file', file);
// //             // Gunakan apiUpload helper yang sudah ada
// //             const res = await apiUpload('/api/upload', fd);
// //             const url = res.url || res.file?.url || res.data?.url;
            
// //             if (url) {
// //                 setUploadedFiles(prev => ({ ...prev, [docName]: url }));
// //             } else {
// //                 alert("Gagal mendapatkan URL file.");
// //             }
// //         } catch (err: any) {
// //             alert("Upload gagal: " + err.message);
// //         } finally {
// //             setUploadingItem(null);
// //         }
// //     };

// //     const removeFile = (docName: string) => {
// //         const newFiles = { ...uploadedFiles };
// //         delete newFiles[docName];
// //         setUploadedFiles(newFiles);
// //     };

// //     // --- SUBMIT ---
// //     const handleSubmit = async () => {
// //         if (!formData.title || !formData.reason) return alert("Judul dan Alasan Pengajuan wajib diisi.");
        
// //         // Validasi Dokumen Wajib jika Diklat Resmi
// //         if (formData.programType === 'training') {
// //             const missingDocs = requiredDocs.filter(doc => !uploadedFiles[doc]);
// //             if (missingDocs.length > 0) {
// //                 return alert(`Mohon lengkapi dokumen wajib berikut:\n- ${missingDocs.join('\n- ')}`);
// //             }
// //         }
        
// //         setLoading(true);
// //         try {
// //             // Format dokumen untuk disimpan di DB
// //             const proposalDocuments = Object.entries(uploadedFiles).map(([name, url]) => ({ name, url }));

// //             const payload = {
// //                 ...formData,
// //                 status: 'proposed', 
// //                 description: '<p>Draft awal pengajuan.</p>',
// //                 proposalDocuments: proposalDocuments, // Kirim dokumen ke backend
// //                 creatorInfo: currentUser
// //             };

// //             await api('/api/courses', { method: 'POST', body: payload });
// //             alert("Pengajuan berhasil dikirim ke Admin!");
// //             onSuccess();
// //         } catch (err: any) {
// //             alert("Gagal mengajukan: " + err.message);
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     return (
// //         <div className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-in zoom-in-95" role="dialog" aria-modal="true">
// //             <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
// //                 {/* Header */}
// //                 <div className="bg-[#990000] text-white p-5 flex justify-between items-center shrink-0">
// //                     <div>
// //                         <h2 className="text-lg font-bold">Form Pengajuan Pelatihan</h2>
// //                         <p className="text-xs text-red-100">Langkah 1: Ajukan ide pelatihan Anda.</p>
// //                     </div>
// //                     <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition-colors" aria-label="Tutup Modal"><X size={20}/></button>
// //                 </div>

// //                 {/* Body Scrollable */}
// //                 <div className="p-6 space-y-5 overflow-y-auto">
// //                     <div>
// //                         <label className="block text-sm font-bold text-gray-700 mb-1">Judul Usulan Pelatihan <span className="text-red-500">*</span></label>
// //                         <input 
// //                             className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
// //                             placeholder="Contoh: Pelatihan Dasar KSR 2026"
// //                             value={formData.title}
// //                             onChange={(e) => handleChange('title', e.target.value)}
// //                         />
// //                     </div>

// //                     <div>
// //                         <label className="block text-sm font-bold text-gray-700 mb-2">Jenis Program</label>
// //                         <div className="flex gap-4">
// //                             <label className={`flex-1 flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${formData.programType === 'training' ? 'border-red-600 bg-red-50' : 'border-gray-200'}`}>
// //                                 <input type="radio" name="ptype" className="hidden" checked={formData.programType === 'training'} onChange={() => handleChange('programType', 'training')}/>
// //                                 <div className={`w-4 h-4 rounded-full border ${formData.programType === 'training' ? 'bg-red-600 border-red-600' : 'border-gray-400'}`}></div>
// //                                 <span className="text-sm font-bold">Diklat Resmi</span>
// //                             </label>
// //                             <label className={`flex-1 flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${formData.programType === 'course' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'}`}>
// //                                 <input type="radio" name="ptype" className="hidden" checked={formData.programType === 'course'} onChange={() => handleChange('programType', 'course')}/>
// //                                 <div className={`w-4 h-4 rounded-full border ${formData.programType === 'course' ? 'bg-blue-600 border-blue-600' : 'border-gray-400'}`}></div>
// //                                 <span className="text-sm font-bold">Kursus Mandiri</span>
// //                             </label>
// //                         </div>
// //                     </div>

// //                     {/* SECTION DINAMIS: DOKUMEN WAJIB (Hanya Jika Diklat Resmi) */}
// //                     {formData.programType === 'training' && (
// //                         <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 animate-in fade-in slide-in-from-top-2">
// //                             <h3 className="font-bold text-orange-800 mb-3 flex items-center gap-2 text-sm">
// //                                 <FileText size={16}/> Dokumen Wajib Dilampirkan
// //                             </h3>
                            
// //                             {configLoading ? (
// //                                 <div className="text-xs text-gray-500 flex items-center gap-2"><Loader2 className="animate-spin" size={12}/> Memuat daftar syarat...</div>
// //                             ) : requiredDocs.length === 0 ? (
// //                                 <p className="text-xs text-gray-500 italic">Tidak ada dokumen wajib yang diatur Admin.</p>
// //                             ) : (
// //                                 <div className="space-y-3">
// //                                     {requiredDocs.map((docName, idx) => (
// //                                         <div key={idx} className="bg-white p-3 rounded-lg border border-orange-200 shadow-sm">
// //                                             <div className="flex justify-between items-center mb-2">
// //                                                 <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">{docName} <span className="text-red-500">*</span></span>
// //                                                 {uploadedFiles[docName] ? (
// //                                                     <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold flex items-center gap-1"><CheckCircle size={10}/> Terupload</span>
// //                                                 ) : (
// //                                                     <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-bold">Wajib</span>
// //                                                 )}
// //                                             </div>

// //                                             {uploadedFiles[docName] ? (
// //                                                 <div className="flex items-center gap-2 bg-green-50 p-2 rounded border border-green-100">
// //                                                     <FileText size={16} className="text-green-600"/>
// //                                                     <span className="text-xs text-green-700 truncate flex-1 font-medium">File berhasil diupload</span>
// //                                                     <button onClick={() => removeFile(docName)} className="text-red-500 p-1 hover:bg-red-100 rounded" title="Hapus File" aria-label={`Hapus ${docName}`}><Trash2 size={14}/></button>
// //                                                 </div>
// //                                             ) : (
// //                                                 <div className="relative">
// //                                                     <input 
// //                                                         type="file" 
// //                                                         className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-orange-100 file:text-orange-700 hover:file:bg-orange-200 cursor-pointer"
// //                                                         onChange={(e) => handleFileUpload(docName, e)}
// //                                                         disabled={uploadingItem === docName}
// //                                                         aria-label={`Upload ${docName}`}
// //                                                     />
// //                                                     {uploadingItem === docName && <div className="absolute right-2 top-2"><Loader2 className="animate-spin text-orange-500" size={16}/></div>}
// //                                                 </div>
// //                                             )}
// //                                         </div>
// //                                     ))}
// //                                 </div>
// //                             )}
// //                         </div>
// //                     )}

// //                     <div>
// //                         <label className="block text-sm font-bold text-gray-700 mb-1">Tujuan / Alasan Pengajuan <span className="text-red-500">*</span></label>
// //                         <textarea 
// //                             className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-red-500 outline-none h-24 resize-none"
// //                             placeholder="Jelaskan secara singkat kenapa pelatihan ini perlu dibuat..."
// //                             value={formData.reason}
// //                             onChange={(e) => handleChange('reason', e.target.value)}
// //                         ></textarea>
// //                     </div>

// //                     <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 flex gap-3 items-start">
// //                         <HelpCircle className="text-blue-600 shrink-0 mt-0.5" size={18}/>
// //                         <p className="text-xs text-blue-700 leading-relaxed">
// //                             Setelah dikirim, Admin akan meninjau. Jika disetujui, Anda akan mendapatkan notifikasi dan akses untuk melengkapi modul kurikulum di tab <strong>Manajemen Pelatihan</strong>.
// //                         </p>
// //                     </div>
// //                 </div>

// //                 {/* Footer */}
// //                 <div className="p-4 border-t bg-gray-50 flex justify-end gap-3 shrink-0">
// //                     <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-gray-300 font-bold text-sm text-gray-600 hover:bg-white" aria-label="Batal">Batal</button>
// //                     <button onClick={handleSubmit} disabled={loading || (formData.programType === 'training' && requiredDocs.some(doc => !uploadedFiles[doc]))} className="px-6 py-2.5 rounded-xl bg-[#990000] text-white font-bold text-sm shadow-lg hover:bg-[#7f0000] flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed" aria-label="Ajukan Sekarang">
// //                         {loading ? <Loader2 className="animate-spin" size={18}/> : <Send size={18}/>} Ajukan Sekarang
// //                     </button>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }

// 'use client';

// import { CheckCircle, User, Clock, Eye, Undo2, BellRing, MessageCircle } from 'lucide-react';

// interface ProposalTableProps {
//     courses: any[];
//     onApprove: (course: any) => void;
//     onReject: (course: any) => void; 
//     onViewDetail: (course: any) => void;
    
//     // [BARU] Menambahkan Prop User & Remind Handler
//     currentUser: any;
//     onRemind?: (course: any) => void; 
// }

// export default function ProposalTable({ 
//     courses, 
//     onApprove, 
//     onReject, 
//     onViewDetail, 
//     onRemind,
//     currentUser 
// }: ProposalTableProps) {

//     if (courses.length === 0) {
//         return <div className="p-12 text-center text-gray-400 italic bg-white border-b border-gray-100">Belum ada pengajuan baru yang masuk.</div>;
//     }

//     // Cek apakah user adalah Admin/Super Admin
//     const isDecisionMaker = ['ADMIN', 'SUPER_ADMIN'].includes(currentUser?.role);

//     return (
//         <table className="w-full text-left text-sm">
//             <thead className="bg-orange-50 border-b border-orange-100 text-orange-800 uppercase tracking-wider text-[10px]">
//                 <tr>
//                     <th className="p-4 font-bold">Judul Pengajuan</th>
//                     <th className="p-4 font-bold">Pengaju</th>
//                     <th className="p-4 font-bold text-center">Tipe Program</th>
//                     <th className="p-4 font-bold text-center">Tanggal</th>
//                     <th className="p-4 font-bold text-center">Aksi / Keputusan</th>
//                 </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-50 bg-white">
//                 {courses.map(course => {
//                     // Cek apakah ini pengajuan milik user sendiri (untuk highlight)
//                     const isMyProposal = course.creatorInfo?.id === currentUser?.id || course.creatorInfo?._id === currentUser?.id;

//                     return (
//                         <tr key={course._id} className={`hover:bg-orange-50/30 transition-colors ${isMyProposal ? 'bg-blue-50/30' : ''}`}>
//                             <td className="p-4 align-middle">
//                                 <div className="font-bold text-gray-800 text-base line-clamp-2">{course.title}</div>
//                                 <div className="flex items-center gap-1 mt-1 text-[11px] text-orange-600 font-medium">
//                                     <Clock size={12}/> Menunggu Review
//                                     {isMyProposal && <span className="ml-2 text-blue-600">(Milik Saya)</span>}
//                                 </div>
//                             </td>
//                             <td className="p-4 align-middle">
//                                 <div className="flex items-center gap-3">
//                                     <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 border border-gray-200">
//                                         <User size={14}/>
//                                     </div>
//                                     <div className="text-xs">
//                                         <div className="font-bold text-gray-700">{course.creatorInfo?.name || 'User'}</div>
//                                         <div className="text-gray-400">{course.creatorInfo?.email}</div>
//                                     </div>
//                                 </div>
//                             </td>
//                             <td className="p-4 align-middle text-center">
//                                 <span className={`px-2 py-1 rounded text-[10px] border font-bold uppercase ${course.programType==='training'?'bg-blue-50 text-blue-700 border-blue-200':'bg-purple-50 text-purple-700 border-purple-200'}`}>
//                                     {course.programType === 'training' ? 'Diklat' : 'Kursus'}
//                                 </span>
//                             </td>
//                             <td className="p-4 align-middle text-center text-xs text-gray-500">
//                                 {new Date(course.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
//                             </td>
//                             <td className="p-4 align-middle text-center">
//                                 <div className="flex justify-center gap-2">
                                    
//                                     {/* 1. TOMBOL LIHAT DETAIL (SEMUA ROLE) */}
//                                     <button 
//                                         onClick={() => onViewDetail(course)} 
//                                         className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 border border-gray-200 transition-colors" 
//                                         title={isDecisionMaker ? "Review & Putuskan" : "Lihat Detail & Feedback"}
//                                     >
//                                         <Eye size={16}/>
//                                     </button>
                                    
//                                     {/* 2. AREA KEPUTUSAN (KHUSUS ADMIN) */}
//                                     {isDecisionMaker ? (
//                                         <>
//                                             <button 
//                                                 onClick={() => onReject(course)} 
//                                                 className="p-2 rounded-lg border border-yellow-200 text-yellow-700 hover:bg-yellow-50 transition-colors" 
//                                                 title="Kembalikan untuk Revisi"
//                                             >
//                                                 <Undo2 size={16}/>
//                                             </button>
                                            
//                                             <button 
//                                                 onClick={() => onApprove(course)} 
//                                                 className="px-3 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700 text-xs font-bold shadow-sm transition-colors flex items-center gap-1"
//                                                 title="Setujui Pengajuan"
//                                             >
//                                                 <CheckCircle size={14}/> Setujui
//                                             </button>
//                                         </>
//                                     ) : (
//                                         // 3. AREA FASILITATOR (REMINDING & FEEDBACK)
//                                         <>
//                                             <button 
//                                                 onClick={() => onViewDetail(course)} 
//                                                 className="p-2 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors"
//                                                 title="Buka Diskusi / Feedback"
//                                             >
//                                                 <MessageCircle size={16}/>
//                                             </button>

//                                             {onRemind && (
//                                                 <button 
//                                                     onClick={() => onRemind(course)}
//                                                     className="p-2 rounded-lg border border-orange-200 text-orange-600 hover:bg-orange-50 transition-colors"
//                                                     title="Ingatkan Admin untuk Review"
//                                                 >
//                                                     <BellRing size={16}/>
//                                                 </button>
//                                             )}
//                                         </>
//                                     )}
//                                 </div>
//                             </td>
//                         </tr>
//                     );
//                 })}
//             </tbody>
//         </table>
//     );
// }

'use client';

import { useState, useEffect } from 'react';
import { Send, Loader2, FileText, Upload, CheckCircle, Trash2, AlertCircle } from 'lucide-react';
import { api } from '@/lib/api';
import BaseModal from '@/components/ui/BaseModal';

// ... (Interface Props) ...

export default function CourseProposalModal({ onClose, onSuccess, currentUser }: any) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ title: '', programType: 'training', reason: '' });
    // ... (State & Logic Lainnya) ...

    const footerButtons = (
        <>
            <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-gray-300 font-bold text-sm text-gray-600 hover:bg-gray-50">Batal</button>
            <button className="px-6 py-2.5 rounded-xl bg-[#990000] text-white font-bold text-sm hover:bg-[#7f0000] flex items-center gap-2">
                {loading ? <Loader2 className="animate-spin" size={18}/> : <Send size={18}/>} Ajukan
            </button>
        </>
    );

    return (
        <BaseModal
            isOpen={true}
            onClose={onClose}
            title="Form Pengajuan Pelatihan"
            subTitle="Lengkapi data & dokumen pendukung."
            size="xl" // [FIX] UKURAN XL YANG PAS UNTUK FORM SIMPLE
            footer={footerButtons}
        >
            <div className="space-y-6">
                <div><label className="block text-sm font-bold text-gray-700 mb-1">Judul Usulan</label><input className="w-full p-3 border rounded-xl" placeholder="Contoh: Pelatihan..." value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} /></div>
                {/* ... Isi Form Lainnya ... */}
            </div>
        </BaseModal>
    );
}
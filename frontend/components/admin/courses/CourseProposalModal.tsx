// // // // // // // // // // // // 'use client';

// // // // // // // // // // // // import { useState, useEffect } from 'react';
// // // // // // // // // // // // import { X, Send, Loader2, FileText, HelpCircle, Upload, CheckCircle, Trash2 } from 'lucide-react';
// // // // // // // // // // // // import { api, apiUpload } from '@/lib/api';

// // // // // // // // // // // // interface CourseProposalModalProps {
// // // // // // // // // // // //     onClose: () => void;
// // // // // // // // // // // //     onSuccess: () => void;
// // // // // // // // // // // //     currentUser: any;
// // // // // // // // // // // // }

// // // // // // // // // // // // export default function CourseProposalModal({ onClose, onSuccess, currentUser }: CourseProposalModalProps) {
// // // // // // // // // // // //     const [loading, setLoading] = useState(false);
// // // // // // // // // // // //     const [configLoading, setConfigLoading] = useState(true);
    
// // // // // // // // // // // //     // Data Form
// // // // // // // // // // // //     const [formData, setFormData] = useState({
// // // // // // // // // // // //         title: '',
// // // // // // // // // // // //         programType: 'training',
// // // // // // // // // // // //         reason: '',
// // // // // // // // // // // //         organizer: 'PMI Pusat'
// // // // // // // // // // // //     });

// // // // // // // // // // // //     // Syarat Dokumen (Dari Admin CMS)
// // // // // // // // // // // //     const [requiredDocs, setRequiredDocs] = useState<string[]>([]);
    
// // // // // // // // // // // //     // File yang sudah diupload: { 'Kerangka Acuan': 'https://url...' }
// // // // // // // // // // // //     const [uploadedFiles, setUploadedFiles] = useState<Record<string, string>>({});
// // // // // // // // // // // //     const [uploadingItem, setUploadingItem] = useState<string | null>(null);

// // // // // // // // // // // //     // --- FETCH CONFIG ---
// // // // // // // // // // // //     useEffect(() => {
// // // // // // // // // // // //         const fetchRequirements = async () => {
// // // // // // // // // // // //             try {
// // // // // // // // // // // //                 const res = await api('/api/content');
// // // // // // // // // // // //                 // Default fallback jika admin belum setting
// // // // // // // // // // // //                 setRequiredDocs(res.trainingRequirements || ['Kerangka Acuan Kerja (KAK)']);
// // // // // // // // // // // //             } catch (e) {
// // // // // // // // // // // //                 console.error("Gagal load syarat dokumen", e);
// // // // // // // // // // // //             } finally {
// // // // // // // // // // // //                 setConfigLoading(false);
// // // // // // // // // // // //             }
// // // // // // // // // // // //         };
// // // // // // // // // // // //         fetchRequirements();
// // // // // // // // // // // //     }, []);

// // // // // // // // // // // //     const handleChange = (field: string, value: string) => {
// // // // // // // // // // // //         setFormData(prev => ({ ...prev, [field]: value }));
// // // // // // // // // // // //     };

// // // // // // // // // // // //     // --- HANDLER UPLOAD ---
// // // // // // // // // // // //     const handleFileUpload = async (docName: string, e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // // // // // //         const file = e.target.files?.[0];
// // // // // // // // // // // //         if (!file) return;

// // // // // // // // // // // //         setUploadingItem(docName);
// // // // // // // // // // // //         try {
// // // // // // // // // // // //             const fd = new FormData();
// // // // // // // // // // // //             fd.append('file', file);
// // // // // // // // // // // //             // Gunakan apiUpload helper yang sudah ada
// // // // // // // // // // // //             const res = await apiUpload('/api/upload', fd);
// // // // // // // // // // // //             const url = res.url || res.file?.url || res.data?.url;
            
// // // // // // // // // // // //             if (url) {
// // // // // // // // // // // //                 setUploadedFiles(prev => ({ ...prev, [docName]: url }));
// // // // // // // // // // // //             } else {
// // // // // // // // // // // //                 alert("Gagal mendapatkan URL file.");
// // // // // // // // // // // //             }
// // // // // // // // // // // //         } catch (err: any) {
// // // // // // // // // // // //             alert("Upload gagal: " + err.message);
// // // // // // // // // // // //         } finally {
// // // // // // // // // // // //             setUploadingItem(null);
// // // // // // // // // // // //         }
// // // // // // // // // // // //     };

// // // // // // // // // // // //     const removeFile = (docName: string) => {
// // // // // // // // // // // //         const newFiles = { ...uploadedFiles };
// // // // // // // // // // // //         delete newFiles[docName];
// // // // // // // // // // // //         setUploadedFiles(newFiles);
// // // // // // // // // // // //     };

// // // // // // // // // // // //     // --- SUBMIT ---
// // // // // // // // // // // //     const handleSubmit = async () => {
// // // // // // // // // // // //         if (!formData.title || !formData.reason) return alert("Judul dan Alasan Pengajuan wajib diisi.");
        
// // // // // // // // // // // //         // Validasi Dokumen Wajib jika Diklat Resmi
// // // // // // // // // // // //         if (formData.programType === 'training') {
// // // // // // // // // // // //             const missingDocs = requiredDocs.filter(doc => !uploadedFiles[doc]);
// // // // // // // // // // // //             if (missingDocs.length > 0) {
// // // // // // // // // // // //                 return alert(`Mohon lengkapi dokumen wajib berikut:\n- ${missingDocs.join('\n- ')}`);
// // // // // // // // // // // //             }
// // // // // // // // // // // //         }
        
// // // // // // // // // // // //         setLoading(true);
// // // // // // // // // // // //         try {
// // // // // // // // // // // //             // Format dokumen untuk disimpan di DB
// // // // // // // // // // // //             const proposalDocuments = Object.entries(uploadedFiles).map(([name, url]) => ({ name, url }));

// // // // // // // // // // // //             const payload = {
// // // // // // // // // // // //                 ...formData,
// // // // // // // // // // // //                 status: 'proposed', 
// // // // // // // // // // // //                 description: '<p>Draft awal pengajuan.</p>',
// // // // // // // // // // // //                 proposalDocuments: proposalDocuments, // Kirim dokumen ke backend
// // // // // // // // // // // //                 creatorInfo: currentUser
// // // // // // // // // // // //             };

// // // // // // // // // // // //             await api('/api/courses', { method: 'POST', body: payload });
// // // // // // // // // // // //             alert("Pengajuan berhasil dikirim ke Admin!");
// // // // // // // // // // // //             onSuccess();
// // // // // // // // // // // //         } catch (err: any) {
// // // // // // // // // // // //             alert("Gagal mengajukan: " + err.message);
// // // // // // // // // // // //         } finally {
// // // // // // // // // // // //             setLoading(false);
// // // // // // // // // // // //         }
// // // // // // // // // // // //     };

// // // // // // // // // // // //     return (
// // // // // // // // // // // //         <div className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-in zoom-in-95" role="dialog" aria-modal="true">
// // // // // // // // // // // //             <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
// // // // // // // // // // // //                 {/* Header */}
// // // // // // // // // // // //                 <div className="bg-[#990000] text-white p-5 flex justify-between items-center shrink-0">
// // // // // // // // // // // //                     <div>
// // // // // // // // // // // //                         <h2 className="text-lg font-bold">Form Pengajuan Pelatihan</h2>
// // // // // // // // // // // //                         <p className="text-xs text-red-100">Langkah 1: Ajukan ide pelatihan Anda.</p>
// // // // // // // // // // // //                     </div>
// // // // // // // // // // // //                     <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition-colors" aria-label="Tutup Modal"><X size={20}/></button>
// // // // // // // // // // // //                 </div>

// // // // // // // // // // // //                 {/* Body Scrollable */}
// // // // // // // // // // // //                 <div className="p-6 space-y-5 overflow-y-auto">
// // // // // // // // // // // //                     <div>
// // // // // // // // // // // //                         <label className="block text-sm font-bold text-gray-700 mb-1">Judul Usulan Pelatihan <span className="text-red-500">*</span></label>
// // // // // // // // // // // //                         <input 
// // // // // // // // // // // //                             className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
// // // // // // // // // // // //                             placeholder="Contoh: Pelatihan Dasar KSR 2026"
// // // // // // // // // // // //                             value={formData.title}
// // // // // // // // // // // //                             onChange={(e) => handleChange('title', e.target.value)}
// // // // // // // // // // // //                         />
// // // // // // // // // // // //                     </div>

// // // // // // // // // // // //                     <div>
// // // // // // // // // // // //                         <label className="block text-sm font-bold text-gray-700 mb-2">Jenis Program</label>
// // // // // // // // // // // //                         <div className="flex gap-4">
// // // // // // // // // // // //                             <label className={`flex-1 flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${formData.programType === 'training' ? 'border-red-600 bg-red-50' : 'border-gray-200'}`}>
// // // // // // // // // // // //                                 <input type="radio" name="ptype" className="hidden" checked={formData.programType === 'training'} onChange={() => handleChange('programType', 'training')}/>
// // // // // // // // // // // //                                 <div className={`w-4 h-4 rounded-full border ${formData.programType === 'training' ? 'bg-red-600 border-red-600' : 'border-gray-400'}`}></div>
// // // // // // // // // // // //                                 <span className="text-sm font-bold">Diklat Resmi</span>
// // // // // // // // // // // //                             </label>
// // // // // // // // // // // //                             <label className={`flex-1 flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${formData.programType === 'course' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'}`}>
// // // // // // // // // // // //                                 <input type="radio" name="ptype" className="hidden" checked={formData.programType === 'course'} onChange={() => handleChange('programType', 'course')}/>
// // // // // // // // // // // //                                 <div className={`w-4 h-4 rounded-full border ${formData.programType === 'course' ? 'bg-blue-600 border-blue-600' : 'border-gray-400'}`}></div>
// // // // // // // // // // // //                                 <span className="text-sm font-bold">Kursus Mandiri</span>
// // // // // // // // // // // //                             </label>
// // // // // // // // // // // //                         </div>
// // // // // // // // // // // //                     </div>

// // // // // // // // // // // //                     {/* SECTION DINAMIS: DOKUMEN WAJIB (Hanya Jika Diklat Resmi) */}
// // // // // // // // // // // //                     {formData.programType === 'training' && (
// // // // // // // // // // // //                         <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 animate-in fade-in slide-in-from-top-2">
// // // // // // // // // // // //                             <h3 className="font-bold text-orange-800 mb-3 flex items-center gap-2 text-sm">
// // // // // // // // // // // //                                 <FileText size={16}/> Dokumen Wajib Dilampirkan
// // // // // // // // // // // //                             </h3>
                            
// // // // // // // // // // // //                             {configLoading ? (
// // // // // // // // // // // //                                 <div className="text-xs text-gray-500 flex items-center gap-2"><Loader2 className="animate-spin" size={12}/> Memuat daftar syarat...</div>
// // // // // // // // // // // //                             ) : requiredDocs.length === 0 ? (
// // // // // // // // // // // //                                 <p className="text-xs text-gray-500 italic">Tidak ada dokumen wajib yang diatur Admin.</p>
// // // // // // // // // // // //                             ) : (
// // // // // // // // // // // //                                 <div className="space-y-3">
// // // // // // // // // // // //                                     {requiredDocs.map((docName, idx) => (
// // // // // // // // // // // //                                         <div key={idx} className="bg-white p-3 rounded-lg border border-orange-200 shadow-sm">
// // // // // // // // // // // //                                             <div className="flex justify-between items-center mb-2">
// // // // // // // // // // // //                                                 <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">{docName} <span className="text-red-500">*</span></span>
// // // // // // // // // // // //                                                 {uploadedFiles[docName] ? (
// // // // // // // // // // // //                                                     <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold flex items-center gap-1"><CheckCircle size={10}/> Terupload</span>
// // // // // // // // // // // //                                                 ) : (
// // // // // // // // // // // //                                                     <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-bold">Wajib</span>
// // // // // // // // // // // //                                                 )}
// // // // // // // // // // // //                                             </div>

// // // // // // // // // // // //                                             {uploadedFiles[docName] ? (
// // // // // // // // // // // //                                                 <div className="flex items-center gap-2 bg-green-50 p-2 rounded border border-green-100">
// // // // // // // // // // // //                                                     <FileText size={16} className="text-green-600"/>
// // // // // // // // // // // //                                                     <span className="text-xs text-green-700 truncate flex-1 font-medium">File berhasil diupload</span>
// // // // // // // // // // // //                                                     <button onClick={() => removeFile(docName)} className="text-red-500 p-1 hover:bg-red-100 rounded" title="Hapus File" aria-label={`Hapus ${docName}`}><Trash2 size={14}/></button>
// // // // // // // // // // // //                                                 </div>
// // // // // // // // // // // //                                             ) : (
// // // // // // // // // // // //                                                 <div className="relative">
// // // // // // // // // // // //                                                     <input 
// // // // // // // // // // // //                                                         type="file" 
// // // // // // // // // // // //                                                         className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-orange-100 file:text-orange-700 hover:file:bg-orange-200 cursor-pointer"
// // // // // // // // // // // //                                                         onChange={(e) => handleFileUpload(docName, e)}
// // // // // // // // // // // //                                                         disabled={uploadingItem === docName}
// // // // // // // // // // // //                                                         aria-label={`Upload ${docName}`}
// // // // // // // // // // // //                                                     />
// // // // // // // // // // // //                                                     {uploadingItem === docName && <div className="absolute right-2 top-2"><Loader2 className="animate-spin text-orange-500" size={16}/></div>}
// // // // // // // // // // // //                                                 </div>
// // // // // // // // // // // //                                             )}
// // // // // // // // // // // //                                         </div>
// // // // // // // // // // // //                                     ))}
// // // // // // // // // // // //                                 </div>
// // // // // // // // // // // //                             )}
// // // // // // // // // // // //                         </div>
// // // // // // // // // // // //                     )}

// // // // // // // // // // // //                     <div>
// // // // // // // // // // // //                         <label className="block text-sm font-bold text-gray-700 mb-1">Tujuan / Alasan Pengajuan <span className="text-red-500">*</span></label>
// // // // // // // // // // // //                         <textarea 
// // // // // // // // // // // //                             className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-red-500 outline-none h-24 resize-none"
// // // // // // // // // // // //                             placeholder="Jelaskan secara singkat kenapa pelatihan ini perlu dibuat..."
// // // // // // // // // // // //                             value={formData.reason}
// // // // // // // // // // // //                             onChange={(e) => handleChange('reason', e.target.value)}
// // // // // // // // // // // //                         ></textarea>
// // // // // // // // // // // //                     </div>

// // // // // // // // // // // //                     <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 flex gap-3 items-start">
// // // // // // // // // // // //                         <HelpCircle className="text-blue-600 shrink-0 mt-0.5" size={18}/>
// // // // // // // // // // // //                         <p className="text-xs text-blue-700 leading-relaxed">
// // // // // // // // // // // //                             Setelah dikirim, Admin akan meninjau. Jika disetujui, Anda akan mendapatkan notifikasi dan akses untuk melengkapi modul kurikulum di tab <strong>Manajemen Pelatihan</strong>.
// // // // // // // // // // // //                         </p>
// // // // // // // // // // // //                     </div>
// // // // // // // // // // // //                 </div>

// // // // // // // // // // // //                 {/* Footer */}
// // // // // // // // // // // //                 <div className="p-4 border-t bg-gray-50 flex justify-end gap-3 shrink-0">
// // // // // // // // // // // //                     <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-gray-300 font-bold text-sm text-gray-600 hover:bg-white" aria-label="Batal">Batal</button>
// // // // // // // // // // // //                     <button onClick={handleSubmit} disabled={loading || (formData.programType === 'training' && requiredDocs.some(doc => !uploadedFiles[doc]))} className="px-6 py-2.5 rounded-xl bg-[#990000] text-white font-bold text-sm shadow-lg hover:bg-[#7f0000] flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed" aria-label="Ajukan Sekarang">
// // // // // // // // // // // //                         {loading ? <Loader2 className="animate-spin" size={18}/> : <Send size={18}/>} Ajukan Sekarang
// // // // // // // // // // // //                     </button>
// // // // // // // // // // // //                 </div>
// // // // // // // // // // // //             </div>
// // // // // // // // // // // //         </div>
// // // // // // // // // // // //     );
// // // // // // // // // // // // }

// // // // // // // // // // // 'use client';

// // // // // // // // // // // import { CheckCircle, User, Clock, Eye, Undo2, BellRing, MessageCircle } from 'lucide-react';

// // // // // // // // // // // interface ProposalTableProps {
// // // // // // // // // // //     courses: any[];
// // // // // // // // // // //     onApprove: (course: any) => void;
// // // // // // // // // // //     onReject: (course: any) => void; 
// // // // // // // // // // //     onViewDetail: (course: any) => void;
    
// // // // // // // // // // //     // [BARU] Menambahkan Prop User & Remind Handler
// // // // // // // // // // //     currentUser: any;
// // // // // // // // // // //     onRemind?: (course: any) => void; 
// // // // // // // // // // // }

// // // // // // // // // // // export default function ProposalTable({ 
// // // // // // // // // // //     courses, 
// // // // // // // // // // //     onApprove, 
// // // // // // // // // // //     onReject, 
// // // // // // // // // // //     onViewDetail, 
// // // // // // // // // // //     onRemind,
// // // // // // // // // // //     currentUser 
// // // // // // // // // // // }: ProposalTableProps) {

// // // // // // // // // // //     if (courses.length === 0) {
// // // // // // // // // // //         return <div className="p-12 text-center text-gray-400 italic bg-white border-b border-gray-100">Belum ada pengajuan baru yang masuk.</div>;
// // // // // // // // // // //     }

// // // // // // // // // // //     // Cek apakah user adalah Admin/Super Admin
// // // // // // // // // // //     const isDecisionMaker = ['ADMIN', 'SUPER_ADMIN'].includes(currentUser?.role);

// // // // // // // // // // //     return (
// // // // // // // // // // //         <table className="w-full text-left text-sm">
// // // // // // // // // // //             <thead className="bg-orange-50 border-b border-orange-100 text-orange-800 uppercase tracking-wider text-[10px]">
// // // // // // // // // // //                 <tr>
// // // // // // // // // // //                     <th className="p-4 font-bold">Judul Pengajuan</th>
// // // // // // // // // // //                     <th className="p-4 font-bold">Pengaju</th>
// // // // // // // // // // //                     <th className="p-4 font-bold text-center">Tipe Program</th>
// // // // // // // // // // //                     <th className="p-4 font-bold text-center">Tanggal</th>
// // // // // // // // // // //                     <th className="p-4 font-bold text-center">Aksi / Keputusan</th>
// // // // // // // // // // //                 </tr>
// // // // // // // // // // //             </thead>
// // // // // // // // // // //             <tbody className="divide-y divide-gray-50 bg-white">
// // // // // // // // // // //                 {courses.map(course => {
// // // // // // // // // // //                     // Cek apakah ini pengajuan milik user sendiri (untuk highlight)
// // // // // // // // // // //                     const isMyProposal = course.creatorInfo?.id === currentUser?.id || course.creatorInfo?._id === currentUser?.id;

// // // // // // // // // // //                     return (
// // // // // // // // // // //                         <tr key={course._id} className={`hover:bg-orange-50/30 transition-colors ${isMyProposal ? 'bg-blue-50/30' : ''}`}>
// // // // // // // // // // //                             <td className="p-4 align-middle">
// // // // // // // // // // //                                 <div className="font-bold text-gray-800 text-base line-clamp-2">{course.title}</div>
// // // // // // // // // // //                                 <div className="flex items-center gap-1 mt-1 text-[11px] text-orange-600 font-medium">
// // // // // // // // // // //                                     <Clock size={12}/> Menunggu Review
// // // // // // // // // // //                                     {isMyProposal && <span className="ml-2 text-blue-600">(Milik Saya)</span>}
// // // // // // // // // // //                                 </div>
// // // // // // // // // // //                             </td>
// // // // // // // // // // //                             <td className="p-4 align-middle">
// // // // // // // // // // //                                 <div className="flex items-center gap-3">
// // // // // // // // // // //                                     <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 border border-gray-200">
// // // // // // // // // // //                                         <User size={14}/>
// // // // // // // // // // //                                     </div>
// // // // // // // // // // //                                     <div className="text-xs">
// // // // // // // // // // //                                         <div className="font-bold text-gray-700">{course.creatorInfo?.name || 'User'}</div>
// // // // // // // // // // //                                         <div className="text-gray-400">{course.creatorInfo?.email}</div>
// // // // // // // // // // //                                     </div>
// // // // // // // // // // //                                 </div>
// // // // // // // // // // //                             </td>
// // // // // // // // // // //                             <td className="p-4 align-middle text-center">
// // // // // // // // // // //                                 <span className={`px-2 py-1 rounded text-[10px] border font-bold uppercase ${course.programType==='training'?'bg-blue-50 text-blue-700 border-blue-200':'bg-purple-50 text-purple-700 border-purple-200'}`}>
// // // // // // // // // // //                                     {course.programType === 'training' ? 'Diklat' : 'Kursus'}
// // // // // // // // // // //                                 </span>
// // // // // // // // // // //                             </td>
// // // // // // // // // // //                             <td className="p-4 align-middle text-center text-xs text-gray-500">
// // // // // // // // // // //                                 {new Date(course.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
// // // // // // // // // // //                             </td>
// // // // // // // // // // //                             <td className="p-4 align-middle text-center">
// // // // // // // // // // //                                 <div className="flex justify-center gap-2">
                                    
// // // // // // // // // // //                                     {/* 1. TOMBOL LIHAT DETAIL (SEMUA ROLE) */}
// // // // // // // // // // //                                     <button 
// // // // // // // // // // //                                         onClick={() => onViewDetail(course)} 
// // // // // // // // // // //                                         className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 border border-gray-200 transition-colors" 
// // // // // // // // // // //                                         title={isDecisionMaker ? "Review & Putuskan" : "Lihat Detail & Feedback"}
// // // // // // // // // // //                                     >
// // // // // // // // // // //                                         <Eye size={16}/>
// // // // // // // // // // //                                     </button>
                                    
// // // // // // // // // // //                                     {/* 2. AREA KEPUTUSAN (KHUSUS ADMIN) */}
// // // // // // // // // // //                                     {isDecisionMaker ? (
// // // // // // // // // // //                                         <>
// // // // // // // // // // //                                             <button 
// // // // // // // // // // //                                                 onClick={() => onReject(course)} 
// // // // // // // // // // //                                                 className="p-2 rounded-lg border border-yellow-200 text-yellow-700 hover:bg-yellow-50 transition-colors" 
// // // // // // // // // // //                                                 title="Kembalikan untuk Revisi"
// // // // // // // // // // //                                             >
// // // // // // // // // // //                                                 <Undo2 size={16}/>
// // // // // // // // // // //                                             </button>
                                            
// // // // // // // // // // //                                             <button 
// // // // // // // // // // //                                                 onClick={() => onApprove(course)} 
// // // // // // // // // // //                                                 className="px-3 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700 text-xs font-bold shadow-sm transition-colors flex items-center gap-1"
// // // // // // // // // // //                                                 title="Setujui Pengajuan"
// // // // // // // // // // //                                             >
// // // // // // // // // // //                                                 <CheckCircle size={14}/> Setujui
// // // // // // // // // // //                                             </button>
// // // // // // // // // // //                                         </>
// // // // // // // // // // //                                     ) : (
// // // // // // // // // // //                                         // 3. AREA FASILITATOR (REMINDING & FEEDBACK)
// // // // // // // // // // //                                         <>
// // // // // // // // // // //                                             <button 
// // // // // // // // // // //                                                 onClick={() => onViewDetail(course)} 
// // // // // // // // // // //                                                 className="p-2 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors"
// // // // // // // // // // //                                                 title="Buka Diskusi / Feedback"
// // // // // // // // // // //                                             >
// // // // // // // // // // //                                                 <MessageCircle size={16}/>
// // // // // // // // // // //                                             </button>

// // // // // // // // // // //                                             {onRemind && (
// // // // // // // // // // //                                                 <button 
// // // // // // // // // // //                                                     onClick={() => onRemind(course)}
// // // // // // // // // // //                                                     className="p-2 rounded-lg border border-orange-200 text-orange-600 hover:bg-orange-50 transition-colors"
// // // // // // // // // // //                                                     title="Ingatkan Admin untuk Review"
// // // // // // // // // // //                                                 >
// // // // // // // // // // //                                                     <BellRing size={16}/>
// // // // // // // // // // //                                                 </button>
// // // // // // // // // // //                                             )}
// // // // // // // // // // //                                         </>
// // // // // // // // // // //                                     )}
// // // // // // // // // // //                                 </div>
// // // // // // // // // // //                             </td>
// // // // // // // // // // //                         </tr>
// // // // // // // // // // //                     );
// // // // // // // // // // //                 })}
// // // // // // // // // // //             </tbody>
// // // // // // // // // // //         </table>
// // // // // // // // // // //     );
// // // // // // // // // // // }








// // // // // // // // // // // 'use client';

// // // // // // // // // // // import { useState, useEffect } from 'react';
// // // // // // // // // // // import { Send, Loader2, FileText, Upload, CheckCircle, Trash2, AlertCircle } from 'lucide-react';
// // // // // // // // // // // import { api } from '@/lib/api';
// // // // // // // // // // // import BaseModal from '@/components/ui/BaseModal';

// // // // // // // // // // // // ... (Interface Props) ...

// // // // // // // // // // // export default function CourseProposalModal({ onClose, onSuccess, currentUser }: any) {
// // // // // // // // // // //     const [loading, setLoading] = useState(false);
// // // // // // // // // // //     const [formData, setFormData] = useState({ title: '', programType: 'training', reason: '' });
// // // // // // // // // // //     // ... (State & Logic Lainnya) ...

// // // // // // // // // // //     const footerButtons = (
// // // // // // // // // // //         <>
// // // // // // // // // // //             <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-gray-300 font-bold text-sm text-gray-600 hover:bg-gray-50">Batal</button>
// // // // // // // // // // //             <button className="px-6 py-2.5 rounded-xl bg-[#990000] text-white font-bold text-sm hover:bg-[#7f0000] flex items-center gap-2">
// // // // // // // // // // //                 {loading ? <Loader2 className="animate-spin" size={18}/> : <Send size={18}/>} Ajukan
// // // // // // // // // // //             </button>
// // // // // // // // // // //         </>
// // // // // // // // // // //     );

// // // // // // // // // // //     return (
// // // // // // // // // // //         <BaseModal
// // // // // // // // // // //             isOpen={true}
// // // // // // // // // // //             onClose={onClose}
// // // // // // // // // // //             title="Form Pengajuan Pelatihan"
// // // // // // // // // // //             subTitle="Lengkapi data & dokumen pendukung."
// // // // // // // // // // //             size="xl" // [FIX] UKURAN XL YANG PAS UNTUK FORM SIMPLE
// // // // // // // // // // //             footer={footerButtons}
// // // // // // // // // // //         >
// // // // // // // // // // //             <div className="space-y-6">
// // // // // // // // // // //                 <div><label className="block text-sm font-bold text-gray-700 mb-1">Judul Usulan</label><input className="w-full p-3 border rounded-xl" placeholder="Contoh: Pelatihan..." value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} /></div>
// // // // // // // // // // //                 {/* ... Isi Form Lainnya ... */}
// // // // // // // // // // //             </div>
// // // // // // // // // // //         </BaseModal>
// // // // // // // // // // //     );
// // // // // // // // // // // }

// // // // // // // // // // 'use client';

// // // // // // // // // // import { useState, useRef } from 'react';
// // // // // // // // // // import { X, Send, FileText, Upload, Loader2, CheckCircle2 } from 'lucide-react';
// // // // // // // // // // import { api, apiUpload } from '@/lib/api';
// // // // // // // // // // import BaseModal from '@/components/ui/BaseModal';

// // // // // // // // // // interface CourseProposalModalProps {
// // // // // // // // // //     onClose: () => void;
// // // // // // // // // //     onSuccess: () => void;
// // // // // // // // // //     currentUser: any;
// // // // // // // // // // }

// // // // // // // // // // export default function CourseProposalModal({ onClose, onSuccess, currentUser }: CourseProposalModalProps) {
// // // // // // // // // //     const [title, setTitle] = useState('');
// // // // // // // // // //     const [reason, setReason] = useState('');
// // // // // // // // // //     const [programType, setProgramType] = useState<'training' | 'course'>('training');
// // // // // // // // // //     const [loading, setLoading] = useState(false);
// // // // // // // // // //     const [uploading, setUploading] = useState(false);
// // // // // // // // // //     const [document, setDocument] = useState<{ name: string; url: string } | null>(null);
// // // // // // // // // //     const fileInputRef = useRef<HTMLInputElement>(null);

// // // // // // // // // //     // --- HANDLE UPLOAD DOKUMEN KAK ---
// // // // // // // // // //     const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // // // //         const file = e.target.files?.[0];
// // // // // // // // // //         if (!file) return;

// // // // // // // // // //         setUploading(true);
// // // // // // // // // //         try {
// // // // // // // // // //             const formData = new FormData();
// // // // // // // // // //             formData.append('file', file);
            
// // // // // // // // // //             const res = await apiUpload('/api/upload', formData);
// // // // // // // // // //             const url = res.url || res.data?.url;
            
// // // // // // // // // //             if (url) {
// // // // // // // // // //                 setDocument({
// // // // // // // // // //                     name: file.name,
// // // // // // // // // //                     url: url
// // // // // // // // // //                 });
// // // // // // // // // //             }
// // // // // // // // // //         } catch (err: any) {
// // // // // // // // // //             alert("Gagal upload dokumen: " + err.message);
// // // // // // // // // //         } finally {
// // // // // // // // // //             setUploading(false);
// // // // // // // // // //         }
// // // // // // // // // //     };

// // // // // // // // // //     // --- HANDLE KIRIM PENGAJUAN ---
// // // // // // // // // //     const handleSubmit = async (e: React.FormEvent) => {
// // // // // // // // // //         e.preventDefault();
// // // // // // // // // //         if (!title.trim()) return alert("Judul usulan wajib diisi!");
        
// // // // // // // // // //         setLoading(true);
// // // // // // // // // //         try {
// // // // // // // // // //             const payload = {
// // // // // // // // // //                 title: title,
// // // // // // // // // //                 programType: programType, // Pilihan Pelatihan (training) atau Kursus (course)
// // // // // // // // // //                 description: reason,
// // // // // // // // // //                 status: 'proposed', // Status awal pengajuan
// // // // // // // // // //                 proposalDocuments: document ? [document] : [], // Sinkron dengan Review & Diskusi
// // // // // // // // // //                 creatorInfo: {
// // // // // // // // // //                     id: currentUser?._id || currentUser?.id,
// // // // // // // // // //                     name: currentUser?.name,
// // // // // // // // // //                     email: currentUser?.email
// // // // // // // // // //                 },
// // // // // // // // // //                 isPublished: false,
// // // // // // // // // //                 isInfoCompleted: false
// // // // // // // // // //             };

// // // // // // // // // //             await api('/api/courses', {
// // // // // // // // // //                 method: 'POST',
// // // // // // // // // //                 body: payload
// // // // // // // // // //             });

// // // // // // // // // //             alert("✅ Pengajuan berhasil dikirim! Silakan tunggu review dari Admin.");
// // // // // // // // // //             onSuccess();
// // // // // // // // // //             onClose();
// // // // // // // // // //         } catch (err: any) {
// // // // // // // // // //             alert("Gagal mengirim pengajuan: " + err.message);
// // // // // // // // // //         } finally {
// // // // // // // // // //             setLoading(false);
// // // // // // // // // //         }
// // // // // // // // // //     };

// // // // // // // // // //     return (
// // // // // // // // // //         <BaseModal
// // // // // // // // // //             isOpen={true}
// // // // // // // // // //             onClose={onClose}
// // // // // // // // // //             title="Form Pengajuan Pelatihan"
// // // // // // // // // //             subTitle="Lengkapi data & dokumen pendukung."
// // // // // // // // // //             size="md"
// // // // // // // // // //         >
// // // // // // // // // //             <form onSubmit={handleSubmit} className="space-y-5 py-2 text-left">
// // // // // // // // // //                 {/* INPUT JUDUL USULAN */}
// // // // // // // // // //                 <div>
// // // // // // // // // //                     <label htmlFor="proposalTitle" className="block text-sm font-bold text-gray-700 mb-1">
// // // // // // // // // //                         Judul Usulan <span className="text-red-500">*</span>
// // // // // // // // // //                     </label>
// // // // // // // // // //                     <input
// // // // // // // // // //                         id="proposalTitle"
// // // // // // // // // //                         type="text"
// // // // // // // // // //                         className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all"
// // // // // // // // // //                         placeholder="Contoh: Pelatihan Pertolongan Pertama Tingkat Dasar..."
// // // // // // // // // //                         value={title}
// // // // // // // // // //                         onChange={(e) => setTitle(e.target.value)}
// // // // // // // // // //                         required
// // // // // // // // // //                         title="Masukkan Judul Usulan"
// // // // // // // // // //                     />
// // // // // // // // // //                 </div>

// // // // // // // // // //                 {/* PILIHAN JENIS PROGRAM (PELATIHAN vs KURSUS) */}
// // // // // // // // // //                 <div>
// // // // // // // // // //                     <label className="block text-sm font-bold text-gray-700 mb-2">Jenis Program Pelatihan</label>
// // // // // // // // // //                     <div className="grid grid-cols-2 gap-3">
// // // // // // // // // //                         <button
// // // // // // // // // //                             type="button"
// // // // // // // // // //                             onClick={() => setProgramType('training')}
// // // // // // // // // //                             className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all ${
// // // // // // // // // //                                 programType === 'training' 
// // // // // // // // // //                                 ? 'border-red-600 bg-red-50 text-red-700 shadow-sm' 
// // // // // // // // // //                                 : 'border-gray-100 bg-white text-gray-500 hover:border-gray-200'
// // // // // // // // // //                             }`}
// // // // // // // // // //                             title="Pilih Pelatihan (Diklat Resmi)"
// // // // // // // // // //                         >
// // // // // // // // // //                             <div className="flex flex-col text-left">
// // // // // // // // // //                                 <span className="text-xs font-bold uppercase tracking-wider">Diklat Resmi</span>
// // // // // // // // // //                                 <span className="text-[10px] opacity-70 italic">Pelatihan (Training)</span>
// // // // // // // // // //                             </div>
// // // // // // // // // //                             {programType === 'training' && <CheckCircle2 size={16} className="shrink-0" />}
// // // // // // // // // //                         </button>

// // // // // // // // // //                         <button
// // // // // // // // // //                             type="button"
// // // // // // // // // //                             onClick={() => setProgramType('course')}
// // // // // // // // // //                             className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all ${
// // // // // // // // // //                                 programType === 'course' 
// // // // // // // // // //                                 ? 'border-red-600 bg-red-50 text-red-700 shadow-sm' 
// // // // // // // // // //                                 : 'border-gray-100 bg-white text-gray-500 hover:border-gray-200'
// // // // // // // // // //                             }`}
// // // // // // // // // //                             title="Pilih Kursus (Mandiri)"
// // // // // // // // // //                         >
// // // // // // // // // //                             <div className="flex flex-col text-left">
// // // // // // // // // //                                 <span className="text-xs font-bold uppercase tracking-wider">Mandiri</span>
// // // // // // // // // //                                 <span className="text-[10px] opacity-70 italic">Kursus (Course)</span>
// // // // // // // // // //                             </div>
// // // // // // // // // //                             {programType === 'course' && <CheckCircle2 size={16} className="shrink-0" />}
// // // // // // // // // //                         </button>
// // // // // // // // // //                     </div>
// // // // // // // // // //                 </div>

// // // // // // // // // //                 {/* ALASAN PENGAJUAN */}
// // // // // // // // // //                 <div>
// // // // // // // // // //                     <label htmlFor="proposalReason" className="block text-sm font-bold text-gray-700 mb-1">
// // // // // // // // // //                         Alasan / Deskripsi Singkat
// // // // // // // // // //                     </label>
// // // // // // // // // //                     <textarea
// // // // // // // // // //                         id="proposalReason"
// // // // // // // // // //                         className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none h-24 resize-none text-sm"
// // // // // // // // // //                         placeholder="Jelaskan kebutuhan pelatihan ini untuk membantu proses review..."
// // // // // // // // // //                         value={reason}
// // // // // // // // // //                         onChange={(e) => setReason(e.target.value)}
// // // // // // // // // //                         title="Masukkan Alasan Pengajuan"
// // // // // // // // // //                     />
// // // // // // // // // //                 </div>

// // // // // // // // // //                 {/* UPLOAD DOKUMEN KAK */}
// // // // // // // // // //                 <div className="p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
// // // // // // // // // //                     <div className="flex items-center justify-between mb-3">
// // // // // // // // // //                         <h5 className="text-xs font-bold text-gray-600 flex items-center gap-2">
// // // // // // // // // //                             <FileText size={14} /> Dokumen KAK (Kerangka Acuan)
// // // // // // // // // //                         </h5>
// // // // // // // // // //                         <input
// // // // // // // // // //                             type="file"
// // // // // // // // // //                             ref={fileInputRef}
// // // // // // // // // //                             onChange={handleFileChange}
// // // // // // // // // //                             className="hidden"
// // // // // // // // // //                             accept=".pdf,.doc,.docx"
// // // // // // // // // //                             title="Pilih Dokumen KAK"
// // // // // // // // // //                         />
// // // // // // // // // //                         <button
// // // // // // // // // //                             type="button"
// // // // // // // // // //                             onClick={() => fileInputRef.current?.click()}
// // // // // // // // // //                             disabled={uploading}
// // // // // // // // // //                             className="text-[10px] font-bold bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm flex items-center gap-1 hover:bg-gray-100 transition-all"
// // // // // // // // // //                             title="Klik untuk Upload Dokumen"
// // // // // // // // // //                         >
// // // // // // // // // //                             {uploading ? <Loader2 size={12} className="animate-spin" /> : <Upload size={12} />}
// // // // // // // // // //                             {document ? 'Ganti File' : 'Pilih File'}
// // // // // // // // // //                         </button>
// // // // // // // // // //                     </div>

// // // // // // // // // //                     {document ? (
// // // // // // // // // //                         <div className="flex items-center gap-3 p-2 bg-blue-50 border border-blue-100 rounded-lg animate-in zoom-in-95">
// // // // // // // // // //                             <div className="p-2 bg-white rounded-lg text-blue-600 shadow-sm">
// // // // // // // // // //                                 <FileText size={20} />
// // // // // // // // // //                             </div>
// // // // // // // // // //                             <div className="flex-1 min-w-0">
// // // // // // // // // //                                 <p className="text-xs font-bold text-gray-700 truncate">{document.name}</p>
// // // // // // // // // //                                 <p className="text-[10px] text-blue-500 uppercase font-black">Berhasil diupload</p>
// // // // // // // // // //                             </div>
// // // // // // // // // //                             <button
// // // // // // // // // //                                 type="button"
// // // // // // // // // //                                 onClick={() => setDocument(null)}
// // // // // // // // // //                                 className="p-1 hover:bg-red-50 text-red-400 hover:text-red-600 rounded transition-colors"
// // // // // // // // // //                                 title="Hapus File"
// // // // // // // // // //                             >
// // // // // // // // // //                                 <X size={16} />
// // // // // // // // // //                             </button>
// // // // // // // // // //                         </div>
// // // // // // // // // //                     ) : (
// // // // // // // // // //                         <div className="text-center py-2 italic">
// // // // // // // // // //                             <p className="text-[10px] text-gray-400">Belum ada dokumen yang dilampirkan.</p>
// // // // // // // // // //                         </div>
// // // // // // // // // //                     )}
// // // // // // // // // //                 </div>

// // // // // // // // // //                 {/* ACTION BUTTONS */}
// // // // // // // // // //                 <div className="flex gap-3 pt-2">
// // // // // // // // // //                     <button
// // // // // // // // // //                         type="button"
// // // // // // // // // //                         onClick={onClose}
// // // // // // // // // //                         className="flex-1 py-3 border border-gray-300 rounded-2xl font-bold text-gray-600 hover:bg-gray-50 transition-all text-sm shadow-sm"
// // // // // // // // // //                         title="Batal"
// // // // // // // // // //                     >
// // // // // // // // // //                         Batal
// // // // // // // // // //                     </button>
// // // // // // // // // //                     <button
// // // // // // // // // //                         type="submit"
// // // // // // // // // //                         disabled={loading || !title.trim()}
// // // // // // // // // //                         className="flex-2 px-10 py-3 bg-[#990000] text-white rounded-2xl font-bold shadow-lg shadow-red-200 hover:bg-[#7f0000] disabled:opacity-50 flex items-center justify-center gap-2 transition-all text-sm uppercase tracking-widest"
// // // // // // // // // //                         title="Kirim Ajukan Sekarang"
// // // // // // // // // //                     >
// // // // // // // // // //                         {loading ? (
// // // // // // // // // //                             <Loader2 size={18} className="animate-spin" />
// // // // // // // // // //                         ) : (
// // // // // // // // // //                             <>
// // // // // // // // // //                                 <Send size={18} />
// // // // // // // // // //                                 <span>Ajukan</span>
// // // // // // // // // //                             </>
// // // // // // // // // //                         )}
// // // // // // // // // //                     </button>
// // // // // // // // // //                 </div>
// // // // // // // // // //             </form>
// // // // // // // // // //         </BaseModal>
// // // // // // // // // //     );
// // // // // // // // // // }
// // // // // // // // // 'use client';

// // // // // // // // // import { useState, useEffect } from 'react';
// // // // // // // // // import { Send, Loader2, FileText, Upload, CheckCircle, Trash2, AlertCircle } from 'lucide-react';
// // // // // // // // // import { api } from '@/lib/api';
// // // // // // // // // import axios from 'axios'; 
// // // // // // // // // import BaseModal from '@/components/ui/BaseModal';

// // // // // // // // // const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// // // // // // // // // interface CourseProposalModalProps {
// // // // // // // // //     onClose: () => void;
// // // // // // // // //     onSuccess: () => void;
// // // // // // // // //     currentUser: any;
// // // // // // // // // }

// // // // // // // // // export default function CourseProposalModal({ onClose, onSuccess, currentUser }: CourseProposalModalProps) {
// // // // // // // // //     const [loading, setLoading] = useState(false);
// // // // // // // // //     const [configLoading, setConfigLoading] = useState(true);
    
// // // // // // // // //     // Config Dokumen dari Backend
// // // // // // // // //     const [requiredDocs, setRequiredDocs] = useState<string[]>([]);
// // // // // // // // //     const [courseDocs, setCourseDocs] = useState<string[]>([]);
    
// // // // // // // // //     const [formData, setFormData] = useState({
// // // // // // // // //         title: '',
// // // // // // // // //         programType: 'training',
// // // // // // // // //         reason: '',
// // // // // // // // //     });

// // // // // // // // //     const [uploadedFiles, setUploadedFiles] = useState<Record<string, { url: string, originalName: string }>>({});
// // // // // // // // //     const [uploadingItem, setUploadingItem] = useState<string | null>(null);

// // // // // // // // //     // Load Config Dokumen Wajib
// // // // // // // // //     useEffect(() => {
// // // // // // // // //         const fetchConfig = async () => {
// // // // // // // // //             try {
// // // // // // // // //                 const res = await api('/api/content').catch(() => ({}));
// // // // // // // // //                 setRequiredDocs(res.trainingRequirements || ['Kerangka Acuan Kerja (KAK)', 'Rencana Anggaran Biaya (RAB)']);
// // // // // // // // //                 setCourseDocs(res.courseRequirements || ['Silabus Ringkas']);
// // // // // // // // //             } catch (e) {
// // // // // // // // //                 console.error("Gagal load config", e);
// // // // // // // // //                 setRequiredDocs(['Kerangka Acuan Kerja (KAK)', 'Rencana Anggaran Biaya (RAB)']);
// // // // // // // // //             } finally { setConfigLoading(false); }
// // // // // // // // //         };
// // // // // // // // //         fetchConfig();
// // // // // // // // //     }, []);

// // // // // // // // //     const handleFileUpload = async (docName: string, e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // // //         const file = e.target.files?.[0];
// // // // // // // // //         if (!file) return;
// // // // // // // // //         setUploadingItem(docName);
        
// // // // // // // // //         const fd = new FormData();
// // // // // // // // //         fd.append('file', file);

// // // // // // // // //         try {
// // // // // // // // //             const userStr = localStorage.getItem('user');
// // // // // // // // //             const token = userStr ? JSON.parse(userStr).token : '';

// // // // // // // // //             const response = await axios.post(`${API_BASE_URL}/api/materials/upload`, fd, {
// // // // // // // // //                 headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` },
// // // // // // // // //                 withCredentials: true 
// // // // // // // // //             });

// // // // // // // // //             const result = response.data;
// // // // // // // // //             const fileUrl = result.data?.url || result.url;
// // // // // // // // //             const fileName = result.data?.originalName || result.originalName || file.name;

// // // // // // // // //             if (fileUrl) {
// // // // // // // // //                 setUploadedFiles(prev => ({
// // // // // // // // //                     ...prev,
// // // // // // // // //                     [docName]: { url: fileUrl, originalName: fileName }
// // // // // // // // //                 }));
// // // // // // // // //             }
// // // // // // // // //         } catch (err: any) {
// // // // // // // // //             alert("Gagal Upload: " + (err.response?.data?.message || err.message));
// // // // // // // // //         } finally {
// // // // // // // // //             setUploadingItem(null);
// // // // // // // // //             e.target.value = '';
// // // // // // // // //         }
// // // // // // // // //     };

// // // // // // // // //     const removeFile = (docName: string) => {
// // // // // // // // //         if(!confirm("Hapus file ini?")) return;
// // // // // // // // //         const newFiles = { ...uploadedFiles };
// // // // // // // // //         delete newFiles[docName];
// // // // // // // // //         setUploadedFiles(newFiles);
// // // // // // // // //     };

// // // // // // // // //     const createSlug = (title: string) => {
// // // // // // // // //         return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') + '-' + Date.now();
// // // // // // // // //     };

// // // // // // // // //     const handleSubmit = async () => {
// // // // // // // // //         if (!formData.title || !formData.reason) return alert("Judul dan Alasan Pengajuan wajib diisi.");
        
// // // // // // // // //         const currentRequirements = formData.programType === 'training' ? requiredDocs : courseDocs;
// // // // // // // // //         const missingDocs = currentRequirements.filter(doc => !uploadedFiles[doc]);
        
// // // // // // // // //         if (missingDocs.length > 0) return alert(`Mohon lengkapi dokumen wajib berikut:\n- ${missingDocs.join('\n- ')}`);
        
// // // // // // // // //         setLoading(true);
// // // // // // // // //         try {
// // // // // // // // //             const proposalDocuments = Object.entries(uploadedFiles).map(([name, data]) => ({
// // // // // // // // //                 name: name, 
// // // // // // // // //                 originalName: data.originalName, 
// // // // // // // // //                 url: data.url
// // // // // // // // //             }));

// // // // // // // // //             const payload = {
// // // // // // // // //                 ...formData,
// // // // // // // // //                 slug: createSlug(formData.title),
// // // // // // // // //                 status: 'proposed', 
// // // // // // // // //                 description: `<p><strong>Alasan Pengajuan:</strong> ${formData.reason}</p>`, 
// // // // // // // // //                 proposalDocuments: proposalDocuments, 
// // // // // // // // //                 creatorInfo: currentUser
// // // // // // // // //             };

// // // // // // // // //             await api('/api/courses', { method: 'POST', body: payload });
// // // // // // // // //             alert("✅ Pengajuan berhasil dikirim!");
// // // // // // // // //             onSuccess();
// // // // // // // // //         } catch (err: any) {
// // // // // // // // //             alert("Gagal mengajukan: " + err.message);
// // // // // // // // //         } finally { setLoading(false); }
// // // // // // // // //     };

// // // // // // // // //     const activeRequirements = formData.programType === 'training' ? requiredDocs : courseDocs;

// // // // // // // // // //     const footerButtons = (
// // // // // // // // // //         <>
// // // // // // // // // //             <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-gray-300 font-bold text-sm text-gray-600 hover:bg-gray-50" aria-label="Batal">Batal</button>
// // // // // // // // // //             <button onClick={handleSubmit} disabled={loading || activeRequirements.some(doc => !uploadedFiles[doc])} className="px-6 py-2.5 rounded-xl bg-[#990000] text-white font-bold text-sm hover:bg-[#7f0000] flex items-center gap-2 disabled:opacity-50" aria-label="Ajukan Sekarang">{loading ? <Loader2 className="animate-spin" size={18}/> : <Send size={18}/>} Ajukan Sekarang</button>
// // // // // // // // // //         </>
// // // // // // // // // //     );

// // // // // // // // // //     return (
// // // // // // // // // //         <BaseModal
// // // // // // // // // //             isOpen={true}
// // // // // // // // // //             onClose={onClose}
// // // // // // // // // //             title="Form Pengajuan Pelatihan"
// // // // // // // // // //             subTitle="Lengkapi data & dokumen pendukung."
// // // // // // // // // //             size="lg"
// // // // // // // // // //             footer={footerButtons}
// // // // // // // // // //         >
// // // // // // // // // //             <div className="space-y-6">
// // // // // // // // // //                 <div>
// // // // // // // // // //                     <label className="block text-sm font-bold text-gray-700 mb-1">Judul Usulan Pelatihan <span className="text-red-500">*</span></label>
// // // // // // // // // //                     <input className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-red-500 outline-none text-sm" placeholder="Contoh: Pelatihan Dasar KSR 2026" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} aria-label="Judul Pelatihan"/>
// // // // // // // // // //                 </div>
                
// // // // // // // // // //                 <div>
// // // // // // // // // //                     <label className="block text-sm font-bold text-gray-700 mb-2">Jenis Program</label>
// // // // // // // // // //                     <div className="flex gap-4">
// // // // // // // // // //                         <label className={`flex-1 flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${formData.programType === 'training' ? 'border-red-600 bg-red-50' : 'border-gray-200 hover:bg-gray-50'}`}>
// // // // // // // // // //                             <input type="radio" name="ptype" className="hidden" checked={formData.programType === 'training'} onChange={() => setFormData({...formData, programType: 'training'})}/>
// // // // // // // // // //                             <span className="text-sm font-bold text-gray-800">Diklat Resmi</span>
// // // // // // // // // //                         </label>
// // // // // // // // // //                         <label className={`flex-1 flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${formData.programType === 'course' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}>
// // // // // // // // // //                             <input type="radio" name="ptype" className="hidden" checked={formData.programType === 'course'} onChange={() => setFormData({...formData, programType: 'course'})}/>
// // // // // // // // // //                             <span className="text-sm font-bold text-gray-800">Kursus Mandiri</span>
// // // // // // // // // //                         </label>
// // // // // // // // // //                     </div>
// // // // // // // // // //                 </div>

// // // // // // // // // //                 {activeRequirements.length > 0 && (
// // // // // // // // // //                     <div className={`p-4 rounded-xl border ${formData.programType === 'training' ? 'bg-orange-50 border-orange-200' : 'bg-blue-50 border-blue-200'} animate-in fade-in slide-in-from-top-2`}>
// // // // // // // // // //                         <h3 className={`font-bold mb-3 flex items-center gap-2 text-sm ${formData.programType === 'training' ? 'text-orange-800' : 'text-blue-800'}`}><FileText size={16}/> Dokumen Wajib</h3>
// // // // // // // // // //                         {configLoading ? <div className="text-xs"><Loader2 className="animate-spin" size={12}/> Loading...</div> : (
// // // // // // // // // //                             <div className="space-y-3">
// // // // // // // // // //                                 {activeRequirements.map((docName, idx) => (
// // // // // // // // // //                                     <div key={idx} className="bg-white p-3 rounded-lg border shadow-sm">
// // // // // // // // // //                                         <div className="flex justify-between mb-2"><span className="text-xs font-bold text-gray-700">{docName} <span className="text-red-500">*</span></span>{uploadedFiles[docName] ? <CheckCircle size={14} className="text-green-600"/> : <span className="text-[10px] bg-gray-100 px-2 rounded font-bold">Wajib</span>}</div>
// // // // // // // // // //                                         {uploadedFiles[docName] ? (
// // // // // // // // // //                                             <div className="flex items-center gap-2 bg-green-50 p-2 rounded border border-green-200">
// // // // // // // // // //                                                 <FileText size={14} className="text-green-600"/>
// // // // // // // // // //                                                 <span className="text-xs font-bold text-green-800 flex-1 truncate">{uploadedFiles[docName].originalName}</span>
// // // // // // // // // //                                                 <button onClick={() => removeFile(docName)} className="text-red-500 hover:text-red-700 p-1" title={`Hapus ${docName}`}><Trash2 size={14}/></button>
// // // // // // // // // //                                             </div>
// // // // // // // // // //                                         ) : (
// // // // // // // // // //                                             <div className="relative group">
// // // // // // // // // //                                                 <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => handleFileUpload(docName, e)} disabled={uploadingItem === docName} title={`Upload ${docName}`}/>
// // // // // // // // // //                                                 <div className="flex items-center gap-2 p-2 rounded border border-dashed bg-gray-50 hover:bg-gray-100 transition-colors">
// // // // // // // // // //                                                     {uploadingItem === docName ? <Loader2 className="animate-spin text-blue-600" size={16}/> : <Upload size={16} className="text-gray-400"/>}
// // // // // // // // // //                                                     <span className="text-xs text-gray-500">Klik untuk upload...</span>
// // // // // // // // // //                                                 </div>
// // // // // // // // // //                                             </div>
// // // // // // // // // //                                         )}
// // // // // // // // // //                                     </div>
// // // // // // // // // //                                 ))}
// // // // // // // // // //                             </div>
// // // // // // // // // //                         )}
// // // // // // // // // //                     </div>
// // // // // // // // // //                 )}

// // // // // // // // // //                 <div>
// // // // // // // // // //                     <label className="block text-sm font-bold text-gray-700 mb-1">Alasan Pengajuan <span className="text-red-500">*</span></label>
// // // // // // // // // //                     <textarea className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-red-500 outline-none h-24 text-sm" placeholder="Jelaskan alasan..." value={formData.reason} onChange={(e) => setFormData({...formData, reason: e.target.value})} aria-label="Alasan Pengajuan"></textarea>
// // // // // // // // // //                 </div>
                
// // // // // // // // // //                 <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 flex gap-3 items-start"><AlertCircle className="text-blue-600 shrink-0 mt-0.5" size={18}/><p className="text-xs text-blue-700">Pastikan semua dokumen wajib telah terupload.</p></div>
// // // // // // // // // //             </div>
// // // // // // // // // //         </BaseModal>
// // // // // // // // // //     );
// // // // // // // // // // }
// // // // // // // // // 'use client';

// // // // // // // // // import { useState, useEffect } from 'react';
// // // // // // // // // import { Send, Loader2, FileText, Upload, CheckCircle, Trash2, AlertCircle } from 'lucide-react';
// // // // // // // // // import { api } from '@/lib/api';
// // // // // // // // // import axios from 'axios'; 
// // // // // // // // // import BaseModal from '@/components/ui/BaseModal';

// // // // // // // // // const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// // // // // // // // // interface CourseProposalModalProps {
// // // // // // // // //     onClose: () => void;
// // // // // // // // //     onSuccess: () => void;
// // // // // // // // //     currentUser: any;
// // // // // // // // // }

// // // // // // // // // export default function CourseProposalModal({ onClose, onSuccess, currentUser }: CourseProposalModalProps) {
// // // // // // // // //     const [loading, setLoading] = useState(false);
// // // // // // // // //     const [configLoading, setConfigLoading] = useState(true);
    
// // // // // // // // //     // Config Dokumen dari Backend
// // // // // // // // //     const [requiredDocs, setRequiredDocs] = useState<string[]>([]);
// // // // // // // // //     const [courseDocs, setCourseDocs] = useState<string[]>([]);
    
// // // // // // // // //     const [formData, setFormData] = useState({
// // // // // // // // //         title: '',
// // // // // // // // //         programType: 'training',
// // // // // // // // //         reason: '',
// // // // // // // // //     });

// // // // // // // // //     const [uploadedFiles, setUploadedFiles] = useState<Record<string, { url: string, originalName: string }>>({});
// // // // // // // // //     const [uploadingItem, setUploadingItem] = useState<string | null>(null);

// // // // // // // // //     // Load Config Dokumen Wajib
// // // // // // // // //     useEffect(() => {
// // // // // // // // //         const fetchConfig = async () => {
// // // // // // // // //             try {
// // // // // // // // //                 const res = await api('/api/content').catch(() => ({}));
// // // // // // // // //                 setRequiredDocs(res.trainingRequirements || ['Kerangka Acuan Kerja (KAK)', 'Rencana Anggaran Biaya (RAB)']);
// // // // // // // // //                 setCourseDocs(res.courseRequirements || ['Silabus Ringkas']);
// // // // // // // // //             } catch (e) {
// // // // // // // // //                 console.error("Gagal load config", e);
// // // // // // // // //                 setRequiredDocs(['Kerangka Acuan Kerja (KAK)', 'Rencana Anggaran Biaya (RAB)']);
// // // // // // // // //             } finally { setConfigLoading(false); }
// // // // // // // // //         };
// // // // // // // // //         fetchConfig();
// // // // // // // // //     }, []);

// // // // // // // // //     const handleFileUpload = async (docName: string, e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // // //         const file = e.target.files?.[0];
// // // // // // // // //         if (!file) return;
// // // // // // // // //         setUploadingItem(docName);
        
// // // // // // // // //         const fd = new FormData();
// // // // // // // // //         fd.append('file', file);

// // // // // // // // //         try {
// // // // // // // // //             const userStr = localStorage.getItem('user');
// // // // // // // // //             const token = userStr ? JSON.parse(userStr).token : '';

// // // // // // // // //             const response = await axios.post(`${API_BASE_URL}/api/materials/upload`, fd, {
// // // // // // // // //                 headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` },
// // // // // // // // //                 withCredentials: true 
// // // // // // // // //             });

// // // // // // // // //             const result = response.data;
// // // // // // // // //             const fileUrl = result.data?.url || result.url;
// // // // // // // // //             const fileName = result.data?.originalName || result.originalName || file.name;

// // // // // // // // //             if (fileUrl) {
// // // // // // // // //                 setUploadedFiles(prev => ({
// // // // // // // // //                     ...prev,
// // // // // // // // //                     [docName]: { url: fileUrl, originalName: fileName }
// // // // // // // // //                 }));
// // // // // // // // //             }
// // // // // // // // //         } catch (err: any) {
// // // // // // // // //             alert("Gagal Upload: " + (err.response?.data?.message || err.message));
// // // // // // // // //         } finally {
// // // // // // // // //             setUploadingItem(null);
// // // // // // // // //             e.target.value = '';
// // // // // // // // //         }
// // // // // // // // //     };

// // // // // // // // //     const removeFile = (docName: string) => {
// // // // // // // // //         if(!confirm("Hapus file ini?")) return;
// // // // // // // // //         const newFiles = { ...uploadedFiles };
// // // // // // // // //         delete newFiles[docName];
// // // // // // // // //         setUploadedFiles(newFiles);
// // // // // // // // //     };

// // // // // // // // //     const createSlug = (title: string) => {
// // // // // // // // //         return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') + '-' + Date.now();
// // // // // // // // //     };

// // // // // // // // //     const handleSubmit = async () => {
// // // // // // // // //         if (!formData.title || !formData.reason) return alert("Judul dan Alasan Pengajuan wajib diisi.");
        
// // // // // // // // //         const currentRequirements = formData.programType === 'training' ? requiredDocs : courseDocs;
// // // // // // // // //         const missingDocs = currentRequirements.filter(doc => !uploadedFiles[doc]);
        
// // // // // // // // //         if (missingDocs.length > 0) return alert(`Mohon lengkapi dokumen wajib berikut:\n- ${missingDocs.join('\n- ')}`);
        
// // // // // // // // //         setLoading(true);
// // // // // // // // //         try {
// // // // // // // // //             const proposalDocuments = Object.entries(uploadedFiles).map(([name, data]) => ({
// // // // // // // // //                 name: name, 
// // // // // // // // //                 originalName: data.originalName, 
// // // // // // // // //                 url: data.url
// // // // // // // // //             }));

// // // // // // // // //             const payload = {
// // // // // // // // //                 ...formData,
// // // // // // // // //                 slug: createSlug(formData.title),
// // // // // // // // //                 status: 'proposed', 
// // // // // // // // //                 description: `<p><strong>Alasan Pengajuan:</strong> ${formData.reason}</p>`, 
// // // // // // // // //                 proposalDocuments: proposalDocuments, 
// // // // // // // // //                 creatorInfo: currentUser
// // // // // // // // //             };

// // // // // // // // //             await api('/api/courses', { method: 'POST', body: payload });
// // // // // // // // //             alert("✅ Pengajuan berhasil dikirim!");
// // // // // // // // //             onSuccess();
// // // // // // // // //         } catch (err: any) {
// // // // // // // // //             alert("Gagal mengajukan: " + err.message);
// // // // // // // // //         } finally { setLoading(false); }
// // // // // // // // //     };

// // // // // // // // //     const activeRequirements = formData.programType === 'training' ? requiredDocs : courseDocs;

// // // // // // // // //     const footerButtons = (
// // // // // // // // //         <>
// // // // // // // // //             <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-gray-300 font-bold text-sm text-gray-600 hover:bg-gray-50" aria-label="Batal">Batal</button>
// // // // // // // // //             <button onClick={handleSubmit} disabled={loading || activeRequirements.some(doc => !uploadedFiles[doc])} className="px-6 py-2.5 rounded-xl bg-[#990000] text-white font-bold text-sm hover:bg-[#7f0000] flex items-center gap-2 disabled:opacity-50" aria-label="Ajukan Sekarang">{loading ? <Loader2 className="animate-spin" size={18}/> : <Send size={18}/>} Ajukan Sekarang</button>
// // // // // // // // //         </>
// // // // // // // // //     );

// // // // // // // // //     return (
// // // // // // // // //         <BaseModal
// // // // // // // // //             isOpen={true}
// // // // // // // // //             onClose={onClose}
// // // // // // // // //             title="Form Pengajuan Pelatihan"
// // // // // // // // //             subTitle="Lengkapi data & dokumen pendukung."
// // // // // // // // //             size="lg"
// // // // // // // // //             footer={footerButtons}
// // // // // // // // //         >
// // // // // // // // //             <div className="space-y-6">
// // // // // // // // //                 <div>
// // // // // // // // //                     <label className="block text-sm font-bold text-gray-700 mb-1">Judul Usulan Pelatihan <span className="text-red-500">*</span></label>
// // // // // // // // //                     <input className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-red-500 outline-none text-sm" placeholder="Contoh: Pelatihan Dasar KSR 2026" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} aria-label="Judul Pelatihan"/>
// // // // // // // // //                 </div>
                
// // // // // // // // //                 <div>
// // // // // // // // //                     <label className="block text-sm font-bold text-gray-700 mb-2">Jenis Program</label>
// // // // // // // // //                     <div className="flex gap-4">
// // // // // // // // //                         <label className={`flex-1 flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${formData.programType === 'training' ? 'border-red-600 bg-red-50' : 'border-gray-200 hover:bg-gray-50'}`}>
// // // // // // // // //                             <input type="radio" name="ptype" className="hidden" checked={formData.programType === 'training'} onChange={() => setFormData({...formData, programType: 'training'})}/>
// // // // // // // // //                             <span className="text-sm font-bold text-gray-800">Diklat Resmi</span>
// // // // // // // // //                         </label>
// // // // // // // // //                         <label className={`flex-1 flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${formData.programType === 'course' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}>
// // // // // // // // //                             <input type="radio" name="ptype" className="hidden" checked={formData.programType === 'course'} onChange={() => setFormData({...formData, programType: 'course'})}/>
// // // // // // // // //                             <span className="text-sm font-bold text-gray-800">Kursus Mandiri</span>
// // // // // // // // //                         </label>
// // // // // // // // //                     </div>
// // // // // // // // //                 </div>

// // // // // // // // //                 {activeRequirements.length > 0 && (
// // // // // // // // //                     <div className={`p-4 rounded-xl border ${formData.programType === 'training' ? 'bg-orange-50 border-orange-200' : 'bg-blue-50 border-blue-200'} animate-in fade-in slide-in-from-top-2`}>
// // // // // // // // //                         <h3 className={`font-bold mb-3 flex items-center gap-2 text-sm ${formData.programType === 'training' ? 'text-orange-800' : 'text-blue-800'}`}><FileText size={16}/> Dokumen Wajib</h3>
// // // // // // // // //                         {configLoading ? <div className="text-xs"><Loader2 className="animate-spin" size={12}/> Loading...</div> : (
// // // // // // // // //                             <div className="space-y-3">
// // // // // // // // //                                 {activeRequirements.map((docName, idx) => (
// // // // // // // // //                                     <div key={idx} className="bg-white p-3 rounded-lg border shadow-sm">
// // // // // // // // //                                         <div className="flex justify-between mb-2"><span className="text-xs font-bold text-gray-700">{docName} <span className="text-red-500">*</span></span>{uploadedFiles[docName] ? <CheckCircle size={14} className="text-green-600"/> : <span className="text-[10px] bg-gray-100 px-2 rounded font-bold">Wajib</span>}</div>
// // // // // // // // //                                         {uploadedFiles[docName] ? (
// // // // // // // // //                                             <div className="flex items-center gap-2 bg-green-50 p-2 rounded border border-green-200">
// // // // // // // // //                                                 <FileText size={14} className="text-green-600"/>
// // // // // // // // //                                                 <span className="text-xs font-bold text-green-800 flex-1 truncate">{uploadedFiles[docName].originalName}</span>
// // // // // // // // //                                                 <button onClick={() => removeFile(docName)} className="text-red-500 hover:text-red-700 p-1" title={`Hapus ${docName}`}><Trash2 size={14}/></button>
// // // // // // // // //                                             </div>
// // // // // // // // //                                         ) : (
// // // // // // // // //                                             <div className="relative group">
// // // // // // // // //                                                 <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => handleFileUpload(docName, e)} disabled={uploadingItem === docName} title={`Upload ${docName}`}/>
// // // // // // // // //                                                 <div className="flex items-center gap-2 p-2 rounded border border-dashed bg-gray-50 hover:bg-gray-100 transition-colors">
// // // // // // // // //                                                     {uploadingItem === docName ? <Loader2 className="animate-spin text-blue-600" size={16}/> : <Upload size={16} className="text-gray-400"/>}
// // // // // // // // //                                                     <span className="text-xs text-gray-500">Klik untuk upload...</span>
// // // // // // // // //                                                 </div>
// // // // // // // // //                                             </div>
// // // // // // // // //                                         )}
// // // // // // // // //                                     </div>
// // // // // // // // //                                 ))}
// // // // // // // // //                             </div>
// // // // // // // // //                         )}
// // // // // // // // //                     </div>
// // // // // // // // //                 )}

// // // // // // // // //                 <div>
// // // // // // // // //                     <label className="block text-sm font-bold text-gray-700 mb-1">Alasan Pengajuan <span className="text-red-500">*</span></label>
// // // // // // // // //                     <textarea className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-red-500 outline-none h-24 text-sm" placeholder="Jelaskan alasan..." value={formData.reason} onChange={(e) => setFormData({...formData, reason: e.target.value})} aria-label="Alasan Pengajuan"></textarea>
// // // // // // // // //                 </div>
                
// // // // // // // // //                 <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 flex gap-3 items-start"><AlertCircle className="text-blue-600 shrink-0 mt-0.5" size={18}/><p className="text-xs text-blue-700">Pastikan semua dokumen wajib telah terupload.</p></div>
// // // // // // // // //             </div>
// // // // // // // // //         </BaseModal>
// // // // // // // // //     );
// // // // // // // // // }

// // // // // // // // 'use client';

// // // // // // // // import { useState, useRef, useEffect } from 'react';
// // // // // // // // import { X, Send, FileText, Upload, Loader2, CheckCircle2, DollarSign, Calendar, MapPin, Building, User, Info } from 'lucide-react';
// // // // // // // // import { api, apiUpload } from '@/lib/api';
// // // // // // // // import { getProvinces, getRegencies } from '@/lib/indonesia';
// // // // // // // // import BaseModal from '@/components/ui/BaseModal';

// // // // // // // // interface CourseProposalModalProps {
// // // // // // // //     onClose: () => void;
// // // // // // // //     onSuccess: () => void;
// // // // // // // //     currentUser: any;
// // // // // // // // }

// // // // // // // // // DEFINISI DEFAULT YANG JELAS (Fallback jika CMS gagal total)
// // // // // // // // const DEFAULT_DOCS = [
// // // // // // // //     { id: 'kak', label: 'Kerangka Acuan Kerja (KAK)' },
// // // // // // // //     { id: 'rab', label: 'Rencana Anggaran Biaya (RAB)' },
// // // // // // // //     { id: 'jadwal', label: 'Jadwal Kegiatan' }
// // // // // // // // ];

// // // // // // // // export default function CourseProposalModal({ onClose, onSuccess, currentUser }: CourseProposalModalProps) {
// // // // // // // //     // --- STATE ---
// // // // // // // //     const [title, setTitle] = useState('');
// // // // // // // //     const [reason, setReason] = useState('');
// // // // // // // //     const [programType, setProgramType] = useState<'training' | 'course'>('training');
    
// // // // // // // //     // Wilayah
// // // // // // // //     const [scope, setScope] = useState<'nasional' | 'provinsi' | 'kota'>('nasional');
// // // // // // // //     const [selectedProvId, setSelectedProvId] = useState('');
// // // // // // // //     const [selectedCityId, setSelectedCityId] = useState('');
// // // // // // // //     const [provinces, setProvinces] = useState<any[]>([]);
// // // // // // // //     const [regencies, setRegencies] = useState<any[]>([]);

// // // // // // // //     // Dokumen
// // // // // // // //     const [cmsData, setCmsData] = useState<any>(null); 
// // // // // // // //     // Inisialisasi dengan DEFAULT agar tidak pernah muncul "Dokumen Wajib 1"
// // // // // // // //     const [requiredDocs, setRequiredDocs] = useState<any[]>(DEFAULT_DOCS); 
// // // // // // // //     const [uploadedDocs, setUploadedDocs] = useState<Record<string, {name: string, url: string}>>({});

// // // // // // // //     // UI
// // // // // // // //     const [loading, setLoading] = useState(false);
// // // // // // // //     const [fetchingCms, setFetchingCms] = useState(true);
// // // // // // // //     const [uploadingField, setUploadingField] = useState<string | null>(null);
// // // // // // // //     const [showConfirm, setShowConfirm] = useState(false); 

// // // // // // // //     const fileInputRef = useRef<HTMLInputElement>(null);
// // // // // // // //     const activeDocRef = useRef<string | null>(null);

// // // // // // // //     // --- HELPER FORMAT ---
// // // // // // // //     const formatDocs = (arr: any[]) => {
// // // // // // // //         if (!Array.isArray(arr) || arr.length === 0) return [];
// // // // // // // //         return arr.map((d: any, i: number) => ({
// // // // // // // //             id: d.id || `doc_${i}`,
// // // // // // // //             // Prioritas Label: label > title > name > string value
// // // // // // // //             label: d.label || d.title || d.name || (typeof d === 'string' ? d : `Dokumen Wajib ${i+1}`)
// // // // // // // //         }));
// // // // // // // //     };

// // // // // // // //     // --- LOAD DATA ---
// // // // // // // //     useEffect(() => {
// // // // // // // //         setProvinces(getProvinces());
        
// // // // // // // //         // Ambil Data CMS
// // // // // // // //         api('/api/content').then(res => {
// // // // // // // //             setCmsData(res);
// // // // // // // //             // Cek apakah ada requirements khusus training di CMS
// // // // // // // //             const tDocs = res.trainingRequirements || res.proposalRequirements || [];
            
// // // // // // // //             if (tDocs.length > 0) {
// // // // // // // //                 // Jika ada, gunakan format dari CMS
// // // // // // // //                 setRequiredDocs(formatDocs(tDocs));
// // // // // // // //             } 
// // // // // // // //             // Jika kosong, biarkan tetap DEFAULT_DOCS (KAK, RAB, Jadwal)
// // // // // // // //         }).catch((err) => {
// // // // // // // //             console.error("Gagal load CMS, menggunakan default.", err);
// // // // // // // //             // Tetap pakai DEFAULT_DOCS, tidak perlu diubah
// // // // // // // //         }).finally(() => {
// // // // // // // //             setFetchingCms(false);
// // // // // // // //         });
// // // // // // // //     }, []);

// // // // // // // //     useEffect(() => {
// // // // // // // //         if (selectedProvId) {
// // // // // // // //             setRegencies(getRegencies(selectedProvId));
// // // // // // // //             setSelectedCityId('');
// // // // // // // //         } else {
// // // // // // // //             setRegencies([]);
// // // // // // // //         }
// // // // // // // //     }, [selectedProvId]);

// // // // // // // //     const handleProgramTypeChange = (type: 'training' | 'course') => {
// // // // // // // //         setProgramType(type);
// // // // // // // //         setUploadedDocs({}); // Reset upload saat ganti tipe
        
// // // // // // // //         // Logika Penggantian Dokumen
// // // // // // // //         if (cmsData) {
// // // // // // // //             let raw = type === 'training' ? (cmsData.trainingRequirements || []) : (cmsData.courseRequirements || []);
            
// // // // // // // //             if (raw.length > 0) {
// // // // // // // //                 setRequiredDocs(formatDocs(raw));
// // // // // // // //                 return;
// // // // // // // //             }
// // // // // // // //         }
        
// // // // // // // //         // Fallback Logic jika CMS data spesifik kosong
// // // // // // // //         if (type === 'training') {
// // // // // // // //             setRequiredDocs(DEFAULT_DOCS);
// // // // // // // //         } else {
// // // // // // // //             setRequiredDocs([
// // // // // // // //                 { id: 'silabus', label: 'Silabus / Outline Materi' },
// // // // // // // //                 { id: 'cv', label: 'CV Pengajar / Fasilitator' }
// // // // // // // //             ]);
// // // // // // // //         }
// // // // // // // //     };

// // // // // // // //     // --- UPLOAD ---
// // // // // // // //     const triggerUpload = (docId: string) => {
// // // // // // // //         activeDocRef.current = docId;
// // // // // // // //         fileInputRef.current?.click();
// // // // // // // //     };

// // // // // // // //     const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // //         const file = e.target.files?.[0];
// // // // // // // //         const docId = activeDocRef.current;
// // // // // // // //         if (!file || !docId) return;

// // // // // // // //         setUploadingField(docId);
// // // // // // // //         try {
// // // // // // // //             const formData = new FormData();
// // // // // // // //             formData.append('file', file);
// // // // // // // //             const res = await apiUpload('/api/upload', formData);
// // // // // // // //             const url = res.url || res.data?.url;
            
// // // // // // // //             if (url) {
// // // // // // // //                 // Update state uploadedDocs agar UI berubah
// // // // // // // //                 setUploadedDocs(prev => ({
// // // // // // // //                     ...prev,
// // // // // // // //                     [docId]: { name: file.name, url: url }
// // // // // // // //                 }));
// // // // // // // //             }
// // // // // // // //         } catch (err: any) { 
// // // // // // // //             alert("Gagal upload: " + err.message); 
// // // // // // // //         } finally { 
// // // // // // // //             setUploadingField(null); 
// // // // // // // //             if (fileInputRef.current) fileInputRef.current.value = ''; 
// // // // // // // //         }
// // // // // // // //     };

// // // // // // // //     const handleRemoveDoc = (docId: string) => {
// // // // // // // //         const newDocs = { ...uploadedDocs };
// // // // // // // //         delete newDocs[docId];
// // // // // // // //         setUploadedDocs(newDocs);
// // // // // // // //     };

// // // // // // // //     // --- SUBMIT ---
// // // // // // // //     const handlePreSubmit = (e: React.FormEvent) => {
// // // // // // // //         e.preventDefault();
// // // // // // // //         if (!title.trim()) return alert("Isi Judul Usulan!");
        
// // // // // // // //         // Validasi Dokumen Wajib
// // // // // // // //         const missing = requiredDocs.filter(d => !uploadedDocs[d.id]);
// // // // // // // //         if (missing.length > 0) {
// // // // // // // //             return alert(`Mohon lengkapi dokumen wajib: ${missing.map(d => d.label).join(', ')}`);
// // // // // // // //         }

// // // // // // // //         if (scope === 'provinsi' && !selectedProvId) return alert("Pilih Provinsi");
// // // // // // // //         if (scope === 'kota' && (!selectedProvId || !selectedCityId)) return alert("Pilih Kota");
        
// // // // // // // //         setShowConfirm(true);
// // // // // // // //     };

// // // // // // // //     const handleFinalSubmit = async () => {
// // // // // // // //         setLoading(true);
// // // // // // // //         try {
// // // // // // // //             let organizer = 'PMI Pusat';
// // // // // // // //             if (scope === 'provinsi') organizer = `PMI Provinsi: ${provinces.find(p => p.code === selectedProvId)?.name}`;
// // // // // // // //             else if (scope === 'kota') organizer = `PMI Kabupaten/Kota: ${regencies.find(r => r.code === selectedCityId)?.name}, ${provinces.find(p => p.code === selectedProvId)?.name}`;

// // // // // // // //             // Format dokumen untuk backend
// // // // // // // //             const docs = Object.entries(uploadedDocs).map(([key, file]) => {
// // // // // // // //                 // Cari definisi dokumen asli untuk label yang benar
// // // // // // // //                 const def = requiredDocs.find(d => d.id === key);
// // // // // // // //                 return { 
// // // // // // // //                     ...file, 
// // // // // // // //                     type: key, 
// // // // // // // //                     label: def?.label || key, // Label penting untuk Admin
// // // // // // // //                     originalName: file.name 
// // // // // // // //                 };
// // // // // // // //             });

// // // // // // // //             const payload = {
// // // // // // // //                 title, programType, description: reason, status: 'proposed',
// // // // // // // //                 proposalDocuments: docs, organizer,
// // // // // // // //                 creatorInfo: { id: currentUser?._id || currentUser?.id, name: currentUser?.name, email: currentUser?.email, role: currentUser?.role },
// // // // // // // //                 isPublished: false, isInfoCompleted: false
// // // // // // // //             };

// // // // // // // //             await api('/api/courses', { method: 'POST', body: payload });
// // // // // // // //             onSuccess(); onClose();
// // // // // // // //         } catch (err: any) { 
// // // // // // // //             alert("Gagal kirim: " + err.message); 
// // // // // // // //             setLoading(false); 
// // // // // // // //             setShowConfirm(false); 
// // // // // // // //         }
// // // // // // // //     };

// // // // // // // //     return (
// // // // // // // //         <BaseModal isOpen={true} onClose={onClose} title="Pengajuan Pelatihan Baru" size="full">
// // // // // // // //             <div className="max-w-7xl mx-auto h-full flex flex-col justify-center px-2">
// // // // // // // //                 <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf,.doc,.docx,.xls,.xlsx" title="Input File Hidden" aria-label="Input File Hidden" />

// // // // // // // //                 <form onSubmit={handlePreSubmit} className="pb-1">
// // // // // // // //                     <div className="grid grid-cols-12 gap-5 items-stretch">
                        
// // // // // // // //                         {/* KOLOM 1 */}
// // // // // // // //                         <div className="col-span-4 flex flex-col gap-4">
// // // // // // // //                             <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl flex items-center justify-between shadow-sm">
// // // // // // // //                                 <div className="flex items-center gap-2">
// // // // // // // //                                     <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">{currentUser?.name?.charAt(0)}</div>
// // // // // // // //                                     <div><p className="text-[10px] font-bold text-blue-600 uppercase">PENGAJU</p><p className="text-xs font-bold text-gray-800 leading-tight">{currentUser?.name}</p></div>
// // // // // // // //                                 </div>
// // // // // // // //                                 <div className="text-[10px] text-gray-500 bg-white px-2 py-1 rounded border border-blue-200">{currentUser?.role}</div>
// // // // // // // //                             </div>

// // // // // // // //                             <div>
// // // // // // // //                                 <label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block" htmlFor="inpTitle">JUDUL USULAN *</label>
// // // // // // // //                                 <input id="inpTitle" type="text" className="w-full p-2.5 border border-gray-300 rounded-lg text-sm font-bold focus:ring-1 focus:ring-red-500 outline-none shadow-sm" placeholder="Contoh: Diklat Manajemen..." value={title} onChange={e => setTitle(e.target.value)} title="Judul" />
// // // // // // // //                             </div>

// // // // // // // //                             <div className="bg-white rounded-lg border border-gray-200 p-2">
// // // // // // // //                                 <label className="text-[10px] font-bold text-gray-500 uppercase mb-2 block px-1">JENIS PROGRAM</label>
// // // // // // // //                                 <div className="grid grid-cols-2 gap-2">
// // // // // // // //                                     <button type="button" onClick={() => handleProgramTypeChange('training')} className={`py-2 rounded-md border text-xs font-bold flex items-center justify-center gap-1 ${programType === 'training' ? 'border-red-600 bg-red-50 text-red-700' : 'bg-gray-50 text-gray-500'}`} title="Diklat"><Building size={14}/> DIKLAT</button>
// // // // // // // //                                     <button type="button" onClick={() => handleProgramTypeChange('course')} className={`py-2 rounded-md border text-xs font-bold flex items-center justify-center gap-1 ${programType === 'course' ? 'border-red-600 bg-red-50 text-red-700' : 'bg-gray-50 text-gray-500'}`} title="Kursus"><User size={14}/> KURSUS</button>
// // // // // // // //                                 </div>
// // // // // // // //                             </div>
// // // // // // // //                         </div>

// // // // // // // //                         {/* KOLOM 2 */}
// // // // // // // //                         <div className="col-span-4 flex flex-col gap-4">
// // // // // // // //                             <div className="bg-orange-50/50 border border-orange-200 p-3 rounded-xl shadow-sm flex-1 flex flex-col">
// // // // // // // //                                 <label className="text-[10px] font-bold text-orange-800 uppercase mb-2 flex items-center gap-1"><MapPin size={12}/> PELAKSANA (ADMIN APPROVAL)</label>
// // // // // // // //                                 <div className="flex gap-2 mb-2">
// // // // // // // //                                     {['nasional', 'provinsi', 'kota'].map((s) => (
// // // // // // // //                                         <label key={s} className="flex items-center gap-1 cursor-pointer bg-white px-2 py-1 rounded border border-orange-100 shadow-sm">
// // // // // // // //                                             <input type="radio" checked={scope === s} onChange={() => setScope(s as any)} className="w-3 h-3 accent-red-600" title={s}/>
// // // // // // // //                                             <span className="text-[10px] font-bold capitalize text-gray-700">{s}</span>
// // // // // // // //                                         </label>
// // // // // // // //                                     ))}
// // // // // // // //                                 </div>
// // // // // // // //                                 <div className="space-y-2 mt-auto">
// // // // // // // //                                     {scope !== 'nasional' && <select className="w-full p-2 border border-orange-200 rounded text-xs bg-white" value={selectedProvId} onChange={e => setSelectedProvId(e.target.value)} title="Pilih Provinsi"><option value="">- Pilih Provinsi -</option>{provinces.map(p => <option key={p.code} value={p.code}>{p.name}</option>)}</select>}
// // // // // // // //                                     {scope === 'kota' && <select className="w-full p-2 border border-orange-200 rounded text-xs bg-white" value={selectedCityId} onChange={e => setSelectedCityId(e.target.value)} disabled={!selectedProvId} title="Pilih Kota"><option value="">- Pilih Kota -</option>{regencies.map(r => <option key={r.code} value={r.code}>{r.name}</option>)}</select>}
// // // // // // // //                                 </div>
// // // // // // // //                             </div>

// // // // // // // //                             <div>
// // // // // // // //                                 <label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block" htmlFor="rsnInp">ALASAN / URGENSI</label>
// // // // // // // //                                 <textarea id="rsnInp" className="w-full p-2.5 border border-gray-300 rounded-lg text-xs h-20 resize-none focus:ring-1 focus:ring-red-500 outline-none" placeholder="Jelaskan urgensi..." value={reason} onChange={e => setReason(e.target.value)} title="Alasan" />
// // // // // // // //                             </div>
// // // // // // // //                         </div>

// // // // // // // //                         {/* KOLOM 3: DOKUMEN WAJIB (FIXED LABELS) */}
// // // // // // // //                         <div className="col-span-4 flex flex-col h-full bg-gray-50 border border-gray-200 rounded-xl p-3 shadow-inner">
// // // // // // // //                             <label className="text-[10px] font-bold text-gray-600 uppercase mb-2 block">DOKUMEN WAJIB ({requiredDocs.length})</label>
// // // // // // // //                             <div className="space-y-2 overflow-y-auto max-h-[300px] custom-scrollbar pr-1 flex-1">
// // // // // // // //                                 {fetchingCms ? <div className="text-center text-xs text-gray-400 py-4"><Loader2 className="animate-spin inline mr-1"/> Loading...</div> : requiredDocs.map((doc: any) => (
// // // // // // // //                                     <div key={doc.id} className={`p-2 rounded border flex items-center justify-between bg-white ${uploadedDocs[doc.id] ? 'border-green-300 shadow-sm' : 'border-gray-200'}`}>
// // // // // // // //                                         <div className="flex items-center gap-2 overflow-hidden">
// // // // // // // //                                             <div className={`p-1.5 rounded ${uploadedDocs[doc.id] ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
// // // // // // // //                                                 {uploadedDocs[doc.id] ? <CheckCircle2 size={14}/> : <FileText size={14}/>}
// // // // // // // //                                             </div>
// // // // // // // //                                             <div className="min-w-0">
// // // // // // // //                                                 {/* FIX: LABEL DARI CMS/DEFAULT PASTI MUNCUL */}
// // // // // // // //                                                 <p className="text-[10px] font-bold text-gray-700 truncate w-32" title={doc.label}>{doc.label}</p>
// // // // // // // //                                                 {uploadedDocs[doc.id] ? (
// // // // // // // //                                                     <p className="text-[9px] text-green-600 truncate w-24 font-medium" title={uploadedDocs[doc.id].name}>
// // // // // // // //                                                         {uploadedDocs[doc.id].name}
// // // // // // // //                                                     </p>
// // // // // // // //                                                 ) : (
// // // // // // // //                                                     <p className="text-[9px] text-gray-400 italic">Belum ada file</p>
// // // // // // // //                                                 )}
// // // // // // // //                                             </div>
// // // // // // // //                                         </div>
// // // // // // // //                                         {uploadedDocs[doc.id] ? (
// // // // // // // //                                             <button type="button" onClick={() => handleRemoveDoc(doc.id)} className="text-red-400 hover:text-red-600 p-1" title="Hapus File"><X size={14}/></button>
// // // // // // // //                                         ) : (
// // // // // // // //                                             <button type="button" onClick={() => triggerUpload(doc.id)} disabled={!!uploadingField} className="px-2 py-1 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded text-[9px] font-bold flex items-center gap-1" title="Upload">
// // // // // // // //                                                 {uploadingField === doc.id ? <Loader2 size={10} className="animate-spin"/> : <Upload size={10}/>} Upload
// // // // // // // //                                             </button>
// // // // // // // //                                         )}
// // // // // // // //                                     </div>
// // // // // // // //                                 ))}
// // // // // // // //                             </div>
// // // // // // // //                         </div>
// // // // // // // //                     </div>

// // // // // // // //                     <div className="flex gap-3 pt-4 mt-2 border-t border-gray-100">
// // // // // // // //                         <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-gray-300 rounded-lg font-bold text-gray-600 hover:bg-gray-50 text-xs" title="Batal">Batal</button>
// // // // // // // //                         <button type="submit" className="flex-[3] py-2.5 bg-[#990000] text-white rounded-lg font-bold hover:bg-[#7f0000] flex items-center justify-center gap-2 text-xs shadow-md tracking-wider" title="Kirim">
// // // // // // // //                             <Send size={14} /> KIRIM USULAN
// // // // // // // //                         </button>
// // // // // // // //                     </div>
// // // // // // // //                 </form>

// // // // // // // //                 {showConfirm && (
// // // // // // // //                     <div className="absolute inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-lg animate-in fade-in">
// // // // // // // //                         <div className="bg-white w-[300px] p-5 rounded-2xl shadow-2xl text-center space-y-3 animate-in zoom-in-95 border border-gray-200">
// // // // // // // //                             <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto text-blue-600 shadow-inner"><Info size={24}/></div>
// // // // // // // //                             <h4 className="text-base font-black text-gray-900">Konfirmasi</h4>
// // // // // // // //                             <p className="text-xs text-gray-500 leading-snug">Usulan dikirim ke <b>Admin {scope === 'nasional' ? 'Pusat' : 'Wilayah'}</b>. Pantau status berkala.</p>
// // // // // // // //                             <div className="flex gap-2 pt-2">
// // // // // // // //                                 <button onClick={() => setShowConfirm(false)} className="flex-1 py-2 border rounded-lg text-xs font-bold text-gray-500" title="Batal">Batal</button>
// // // // // // // //                                 <button onClick={handleFinalSubmit} disabled={loading} className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold flex justify-center items-center gap-1" title="Ya">
// // // // // // // //                                     {loading ? <Loader2 size={12} className="animate-spin"/> : <CheckCircle2 size={12}/>} Ya, Kirim
// // // // // // // //                                 </button>
// // // // // // // //                             </div>
// // // // // // // //                         </div>
// // // // // // // //                     </div>
// // // // // // // //                 )}
// // // // // // // //             </div>
// // // // // // // //         </BaseModal>
// // // // // // // //     );
// // // // // // // // }


// // // // // // // 'use client';

// // // // // // // import { useState, useRef, useEffect } from 'react';
// // // // // // // import { X, Send, FileText, Upload, Loader2, CheckCircle2, MapPin, Building, User, Info, Trash2, AlertCircle } from 'lucide-react';
// // // // // // // import { api } from '@/lib/api'; 
// // // // // // // import { getProvinces, getRegencies } from '@/lib/indonesia';
// // // // // // // import BaseModal from '@/components/ui/BaseModal';
// // // // // // // import axios from 'axios';

// // // // // // // // Gunakan Port 4000 sesuai skema Test Upload Anda yang berhasil
// // // // // // // const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// // // // // // // interface CourseProposalModalProps {
// // // // // // //     onClose: () => void;
// // // // // // //     onSuccess: () => void;
// // // // // // //     currentUser: any;
// // // // // // // }

// // // // // // // export default function CourseProposalModal({ onClose, onSuccess, currentUser }: CourseProposalModalProps) {
// // // // // // //     // --- STATE DATA ---
// // // // // // //     const [title, setTitle] = useState('');
// // // // // // //     const [reason, setReason] = useState('');
// // // // // // //     const [programType, setProgramType] = useState<'training' | 'course'>('training');
    
// // // // // // //     // --- STATE WILAYAH ---
// // // // // // //     const [scope, setScope] = useState<'nasional' | 'provinsi' | 'kota'>('nasional');
// // // // // // //     const [selectedProvId, setSelectedProvId] = useState('');
// // // // // // //     const [selectedCityId, setSelectedCityId] = useState('');
// // // // // // //     const [provinces, setProvinces] = useState<any[]>([]);
// // // // // // //     const [regencies, setRegencies] = useState<any[]>([]);

// // // // // // //     // --- STATE DOKUMEN (LOGIKA LAMA DIKEMBALIKAN) ---
// // // // // // //     // Menggunakan array string sederhana seperti script lama Anda
// // // // // // //     const [requiredDocs, setRequiredDocs] = useState<string[]>([]);
// // // // // // //     const [courseDocs, setCourseDocs] = useState<string[]>([]);
    
// // // // // // //     // Key-nya adalah nama dokumen (misal: "Kerangka Acuan Kerja")
// // // // // // //     const [uploadedFiles, setUploadedFiles] = useState<Record<string, { url: string, originalName: string }>>({});
    
// // // // // // //     // --- UI STATES ---
// // // // // // //     const [loading, setLoading] = useState(false);
// // // // // // //     const [configLoading, setConfigLoading] = useState(true);
// // // // // // //     const [uploadingItem, setUploadingItem] = useState<string | null>(null);
// // // // // // //     const [showConfirm, setShowConfirm] = useState(false); 

// // // // // // //     // --- 1. LOAD DATA (CMS & WILAYAH) ---
// // // // // // //     useEffect(() => {
// // // // // // //         setProvinces(getProvinces());
        
// // // // // // //         // Logika Load CMS persis script lama
// // // // // // //         const fetchConfig = async () => {
// // // // // // //             try {
// // // // // // //                 const res = await api('/api/content').catch(() => ({}));
// // // // // // //                 // Fallback default jika CMS kosong/gagal
// // // // // // //                 setRequiredDocs(res.trainingRequirements?.length > 0 ? res.trainingRequirements : ['Kerangka Acuan Kerja (KAK)', 'Rencana Anggaran Biaya (RAB)', 'Jadwal Kegiatan']);
// // // // // // //                 setCourseDocs(res.courseRequirements?.length > 0 ? res.courseRequirements : ['Silabus Ringkas', 'CV Pengajar']);
// // // // // // //             } catch (e) {
// // // // // // //                 console.error("Gagal load config", e);
// // // // // // //                 setRequiredDocs(['Kerangka Acuan Kerja (KAK)', 'Rencana Anggaran Biaya (RAB)', 'Jadwal Kegiatan']);
// // // // // // //                 setCourseDocs(['Silabus Ringkas', 'CV Pengajar']);
// // // // // // //             } finally { 
// // // // // // //                 setConfigLoading(false); 
// // // // // // //             }
// // // // // // //         };
// // // // // // //         fetchConfig();
// // // // // // //     }, []);

// // // // // // //     useEffect(() => {
// // // // // // //         if (selectedProvId) {
// // // // // // //             setRegencies(getRegencies(selectedProvId));
// // // // // // //             setSelectedCityId('');
// // // // // // //         } else {
// // // // // // //             setRegencies([]);
// // // // // // //         }
// // // // // // //     }, [selectedProvId]);

// // // // // // //     // --- 2. UPLOAD LOGIC (PERSIS UPLOADTEST.TSX) ---
// // // // // // //     const handleFileUpload = async (docName: string, e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // //         const file = e.target.files?.[0];
// // // // // // //         if (!file) return;
        
// // // // // // //         setUploadingItem(docName);
        
// // // // // // //         // Ambil token manual (Sesuai Test Upload)
// // // // // // //         const userStr = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
// // // // // // //         const token = userStr ? JSON.parse(userStr).token : '';

// // // // // // //         if (!token) {
// // // // // // //             alert("Sesi habis. Silakan login ulang.");
// // // // // // //             setUploadingItem(null);
// // // // // // //             return;
// // // // // // //         }

// // // // // // //         const fd = new FormData();
// // // // // // //         fd.append('file', file);

// // // // // // //         try {
// // // // // // //             // Panggil API Backend (Port 4000)
// // // // // // //             const response = await axios.post(`${API_BASE_URL}/api/materials/upload`, fd, {
// // // // // // //                 headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` },
// // // // // // //                 withCredentials: true 
// // // // // // //             });

// // // // // // //             // Parsing hasil sesuai skema backend Anda
// // // // // // //             const result = response.data;
// // // // // // //             const fileUrl = result.data?.url || result.url;
// // // // // // //             const fileName = result.data?.originalName || result.originalName || file.name;

// // // // // // //             if (fileUrl) {
// // // // // // //                 setUploadedFiles(prev => ({
// // // // // // //                     ...prev,
// // // // // // //                     [docName]: { url: fileUrl, originalName: fileName }
// // // // // // //                 }));
// // // // // // //             } else {
// // // // // // //                 throw new Error("URL tidak ditemukan di respon server.");
// // // // // // //             }
// // // // // // //         } catch (err: any) {
// // // // // // //             console.error("Upload Error:", err);
// // // // // // //             alert("Gagal Upload: " + (err.response?.data?.message || err.message));
// // // // // // //         } finally {
// // // // // // //             setUploadingItem(null);
// // // // // // //             e.target.value = ''; // Reset input agar bisa upload ulang file yang sama
// // // // // // //         }
// // // // // // //     };

// // // // // // //     const removeFile = (docName: string) => {
// // // // // // //         if(!confirm("Hapus file ini?")) return;
// // // // // // //         const newFiles = { ...uploadedFiles };
// // // // // // //         delete newFiles[docName];
// // // // // // //         setUploadedFiles(newFiles);
// // // // // // //     };

// // // // // // //     // --- 3. SUBMIT LOGIC ---
// // // // // // //     const activeRequirements = programType === 'training' ? requiredDocs : courseDocs;

// // // // // // //     const handlePreSubmit = (e: React.FormEvent) => {
// // // // // // //         e.preventDefault();
// // // // // // //         if (!title.trim()) return alert("Judul usulan wajib diisi!");
        
// // // // // // //         // Cek kelengkapan dokumen berdasarkan nama file
// // // // // // //         const missingDocs = activeRequirements.filter(doc => !uploadedFiles[doc]);
// // // // // // //         if (missingDocs.length > 0) {
// // // // // // //             return alert(`Mohon lengkapi dokumen wajib berikut:\n- ${missingDocs.join('\n- ')}`);
// // // // // // //         }

// // // // // // //         if (scope === 'provinsi' && !selectedProvId) return alert("Pilih Provinsi tujuan.");
// // // // // // //         if (scope === 'kota' && (!selectedProvId || !selectedCityId)) return alert("Pilih Provinsi dan Kota tujuan.");
        
// // // // // // //         setShowConfirm(true);
// // // // // // //     };

// // // // // // //     const handleFinalSubmit = async () => {
// // // // // // //         setLoading(true);
// // // // // // //         try {
// // // // // // //             let organizer = 'PMI Pusat';
// // // // // // //             if (scope === 'provinsi') organizer = `PMI Provinsi: ${provinces.find(p => p.code === selectedProvId)?.name}`;
// // // // // // //             else if (scope === 'kota') organizer = `PMI Kabupaten/Kota: ${regencies.find(r => r.code === selectedCityId)?.name}, ${provinces.find(p => p.code === selectedProvId)?.name}`;

// // // // // // //             // Format Dokumen untuk DB (Array of Objects)
// // // // // // //             const proposalDocuments = Object.entries(uploadedFiles).map(([name, data]) => ({
// // // // // // //                 name: name, // Label Dokumen (misal: KAK)
// // // // // // //                 originalName: data.originalName, // Nama File Asli (misal: kak_final.pdf)
// // // // // // //                 url: data.url,
// // // // // // //                 type: 'document',
// // // // // // //                 label: name
// // // // // // //             }));

// // // // // // //             const payload = {
// // // // // // //                 title, programType, description: reason, status: 'proposed',
// // // // // // //                 proposalDocuments: proposalDocuments, 
// // // // // // //                 organizer,
// // // // // // //                 creatorInfo: { 
// // // // // // //                     id: currentUser?._id || currentUser?.id, 
// // // // // // //                     name: currentUser?.name, 
// // // // // // //                     email: currentUser?.email, 
// // // // // // //                     role: currentUser?.role 
// // // // // // //                 },
// // // // // // //                 isPublished: false, isInfoCompleted: false
// // // // // // //             };

// // // // // // //             await api('/api/courses', { method: 'POST', body: payload });
// // // // // // //             alert("✅ Pengajuan berhasil dikirim!");
// // // // // // //             onSuccess(); 
// // // // // // //             onClose();
// // // // // // //         } catch (err: any) { 
// // // // // // //             alert("Gagal mengirim: " + err.message); 
// // // // // // //             setLoading(false); 
// // // // // // //             setShowConfirm(false); 
// // // // // // //         }
// // // // // // //     };

// // // // // // //     return (
// // // // // // //         <BaseModal isOpen={true} onClose={onClose} title="Pengajuan Pelatihan Baru" size="full">
// // // // // // //             <div className="max-w-7xl mx-auto h-full flex flex-col justify-center px-2">
                
// // // // // // //                 <form onSubmit={handlePreSubmit} className="pb-1">
// // // // // // //                     {/* LAYOUT 3 KOLOM COMPACT */}
// // // // // // //                     <div className="grid grid-cols-12 gap-5 items-stretch">
                        
// // // // // // //                         {/* KOLOM 1: INFO DASAR */}
// // // // // // //                         <div className="col-span-4 flex flex-col gap-4">
// // // // // // //                             <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl flex items-center justify-between shadow-sm">
// // // // // // //                                 <div className="flex items-center gap-2">
// // // // // // //                                     <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">{currentUser?.name?.charAt(0)}</div>
// // // // // // //                                     <div><p className="text-[10px] font-bold text-blue-600 uppercase">PENGAJU</p><p className="text-xs font-bold text-gray-800 leading-tight">{currentUser?.name}</p></div>
// // // // // // //                                 </div>
// // // // // // //                                 <div className="text-[10px] text-gray-500 bg-white px-2 py-1 rounded border border-blue-200">{currentUser?.role}</div>
// // // // // // //                             </div>

// // // // // // //                             <div>
// // // // // // //                                 <label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block" htmlFor="inpTitle">JUDUL USULAN *</label>
// // // // // // //                                 <input id="inpTitle" type="text" className="w-full p-2.5 border border-gray-300 rounded-lg text-sm font-bold focus:ring-1 focus:ring-red-500 outline-none shadow-sm" placeholder="Contoh: Diklat Manajemen..." value={title} onChange={e => setTitle(e.target.value)} title="Judul" />
// // // // // // //                             </div>

// // // // // // //                             <div className="bg-white rounded-lg border border-gray-200 p-2">
// // // // // // //                                 <label className="text-[10px] font-bold text-gray-500 uppercase mb-2 block px-1">JENIS PROGRAM</label>
// // // // // // //                                 <div className="grid grid-cols-2 gap-2">
// // // // // // //                                     <button type="button" onClick={() => setProgramType('training')} className={`py-2 rounded-md border text-xs font-bold flex items-center justify-center gap-1 ${programType === 'training' ? 'border-red-600 bg-red-50 text-red-700' : 'bg-gray-50 text-gray-500'}`} title="Diklat"><Building size={14}/> DIKLAT</button>
// // // // // // //                                     <button type="button" onClick={() => setProgramType('course')} className={`py-2 rounded-md border text-xs font-bold flex items-center justify-center gap-1 ${programType === 'course' ? 'border-red-600 bg-red-50 text-red-700' : 'bg-gray-50 text-gray-500'}`} title="Kursus"><User size={14}/> KURSUS</button>
// // // // // // //                                 </div>
// // // // // // //                             </div>
// // // // // // //                         </div>

// // // // // // //                         {/* KOLOM 2: WILAYAH & ALASAN */}
// // // // // // //                         <div className="col-span-4 flex flex-col gap-4">
// // // // // // //                             <div className="bg-orange-50/50 border border-orange-200 p-3 rounded-xl shadow-sm flex-1 flex flex-col">
// // // // // // //                                 <label className="text-[10px] font-bold text-orange-800 uppercase mb-2 flex items-center gap-1"><MapPin size={12}/> PELAKSANA (ADMIN APPROVAL)</label>
// // // // // // //                                 <div className="flex gap-2 mb-2">
// // // // // // //                                     {['nasional', 'provinsi', 'kota'].map((s) => (
// // // // // // //                                         <label key={s} className="flex items-center gap-1 cursor-pointer bg-white px-2 py-1 rounded border border-orange-100 shadow-sm">
// // // // // // //                                             <input type="radio" checked={scope === s} onChange={() => setScope(s as any)} className="w-3 h-3 accent-red-600" title={s}/>
// // // // // // //                                             <span className="text-[10px] font-bold capitalize text-gray-700">{s}</span>
// // // // // // //                                         </label>
// // // // // // //                                     ))}
// // // // // // //                                 </div>
// // // // // // //                                 <div className="space-y-2 mt-auto">
// // // // // // //                                     {scope !== 'nasional' && <select className="w-full p-2 border border-orange-200 rounded text-xs bg-white" value={selectedProvId} onChange={e => setSelectedProvId(e.target.value)} title="Pilih Provinsi"><option value="">- Pilih Provinsi -</option>{provinces.map(p => <option key={p.code} value={p.code}>{p.name}</option>)}</select>}
// // // // // // //                                     {scope === 'kota' && <select className="w-full p-2 border border-orange-200 rounded text-xs bg-white" value={selectedCityId} onChange={e => setSelectedCityId(e.target.value)} disabled={!selectedProvId} title="Pilih Kota"><option value="">- Pilih Kota -</option>{regencies.map(r => <option key={r.code} value={r.code}>{r.name}</option>)}</select>}
// // // // // // //                                 </div>
// // // // // // //                             </div>

// // // // // // //                             <div>
// // // // // // //                                 <label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block" htmlFor="rsnInp">ALASAN / URGENSI</label>
// // // // // // //                                 <textarea id="rsnInp" className="w-full p-2.5 border border-gray-300 rounded-lg text-xs h-20 resize-none focus:ring-1 focus:ring-red-500 outline-none" placeholder="Jelaskan urgensi..." value={reason} onChange={e => setReason(e.target.value)} title="Alasan" />
// // // // // // //                             </div>
// // // // // // //                         </div>

// // // // // // //                         {/* KOLOM 3: DOKUMEN WAJIB (LOGIKA & TAMPILAN LAMA) */}
// // // // // // //                         <div className="col-span-4 flex flex-col h-full bg-gray-50 border border-gray-200 rounded-xl p-3 shadow-inner">
// // // // // // //                             <label className="text-[10px] font-bold text-gray-600 uppercase mb-2 block flex justify-between">
// // // // // // //                                 <span>DOKUMEN WAJIB</span>
// // // // // // //                                 <span className="bg-gray-200 px-1.5 rounded text-gray-600">{activeRequirements.length}</span>
// // // // // // //                             </label>
                            
// // // // // // //                             <div className="space-y-2 overflow-y-auto max-h-[300px] custom-scrollbar pr-1 flex-1">
// // // // // // //                                 {configLoading ? (
// // // // // // //                                     <div className="text-center text-xs text-gray-400 py-4"><Loader2 className="animate-spin inline mr-1"/> Memuat Syarat...</div>
// // // // // // //                                 ) : (
// // // // // // //                                     activeRequirements.map((docName, idx) => (
// // // // // // //                                         <div key={idx} className={`p-2 rounded border transition-all ${uploadedFiles[docName] ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200 shadow-sm'}`}>
// // // // // // //                                             <div className="flex justify-between items-center mb-1">
// // // // // // //                                                 {/* NAMA DOKUMEN DARI CMS */}
// // // // // // //                                                 <span className="text-[10px] font-bold text-gray-700 flex items-center gap-1">
// // // // // // //                                                     {uploadedFiles[docName] ? <CheckCircle2 size={12} className="text-green-600"/> : <AlertCircle size={12} className="text-orange-500"/>}
// // // // // // //                                                     {docName} <span className="text-red-500">*</span>
// // // // // // //                                                 </span>
// // // // // // //                                             </div>

// // // // // // //                                             {uploadedFiles[docName] ? (
// // // // // // //                                                 // TAMPILAN SETELAH UPLOAD (HIJAU + NAMA FILE + HAPUS)
// // // // // // //                                                 <div className="flex items-center gap-2 bg-white p-1.5 rounded border border-green-200 mt-1">
// // // // // // //                                                     <FileText size={14} className="text-green-600"/>
// // // // // // //                                                     <span className="text-[9px] font-bold text-green-700 flex-1 truncate" title={uploadedFiles[docName].originalName}>
// // // // // // //                                                         {uploadedFiles[docName].originalName}
// // // // // // //                                                     </span>
// // // // // // //                                                     <button type="button" onClick={() => removeFile(docName)} className="text-red-400 hover:text-red-600 p-1 bg-red-50 rounded" title="Hapus">
// // // // // // //                                                         <Trash2 size={12}/>
// // // // // // //                                                     </button>
// // // // // // //                                                 </div>
// // // // // // //                                             ) : (
// // // // // // //                                                 // TOMBOL UPLOAD
// // // // // // //                                                 <div className="relative group mt-1">
// // // // // // //                                                     <input 
// // // // // // //                                                         type="file" 
// // // // // // //                                                         className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
// // // // // // //                                                         onChange={(e) => handleFileUpload(docName, e)} 
// // // // // // //                                                         disabled={uploadingItem === docName} 
// // // // // // //                                                         title={`Upload ${docName}`}
// // // // // // //                                                     />
// // // // // // //                                                     <div className="flex items-center justify-center gap-2 py-1.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded text-blue-600 transition-colors">
// // // // // // //                                                         {uploadingItem === docName ? <Loader2 className="animate-spin" size={14}/> : <Upload size={14}/>}
// // // // // // //                                                         <span className="text-[10px] font-bold">Upload File</span>
// // // // // // //                                                     </div>
// // // // // // //                                                 </div>
// // // // // // //                                             )}
// // // // // // //                                         </div>
// // // // // // //                                     ))
// // // // // // //                                 )}
// // // // // // //                                 {activeRequirements.length === 0 && <p className="text-center text-xs text-gray-400 italic py-4">Tidak ada dokumen wajib.</p>}
// // // // // // //                             </div>
// // // // // // //                         </div>
// // // // // // //                     </div>

// // // // // // //                     {/* FOOTER */}
// // // // // // //                     <div className="flex gap-3 pt-4 mt-2 border-t border-gray-100">
// // // // // // //                         <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-gray-300 rounded-lg font-bold text-gray-600 hover:bg-gray-50 text-xs" title="Batal">Batal</button>
// // // // // // //                         <button type="submit" className="flex-[3] py-2.5 bg-[#990000] text-white rounded-lg font-bold hover:bg-[#7f0000] flex items-center justify-center gap-2 text-xs shadow-md tracking-wider" title="Kirim">
// // // // // // //                             <Send size={14} /> KIRIM USULAN
// // // // // // //                         </button>
// // // // // // //                     </div>
// // // // // // //                 </form>

// // // // // // //                 {/* POPUP CONFIRM */}
// // // // // // //                 {showConfirm && (
// // // // // // //                     <div className="absolute inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-lg animate-in fade-in">
// // // // // // //                         <div className="bg-white w-[300px] p-5 rounded-2xl shadow-2xl text-center space-y-3 animate-in zoom-in-95 border border-gray-200">
// // // // // // //                             <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto text-blue-600 shadow-inner"><Info size={24}/></div>
// // // // // // //                             <h4 className="text-base font-black text-gray-900">Konfirmasi</h4>
// // // // // // //                             <p className="text-xs text-gray-500 leading-snug">Usulan dikirim ke <b>Admin {scope === 'nasional' ? 'Pusat' : 'Wilayah'}</b>.</p>
// // // // // // //                             <div className="flex gap-2 pt-2">
// // // // // // //                                 <button onClick={() => setShowConfirm(false)} className="flex-1 py-2 border rounded-lg text-xs font-bold text-gray-500" title="Batal">Batal</button>
// // // // // // //                                 <button onClick={handleFinalSubmit} disabled={loading} className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold flex justify-center items-center gap-1" title="Ya">
// // // // // // //                                     {loading ? <Loader2 size={12} className="animate-spin"/> : <CheckCircle2 size={12}/>} Ya, Kirim
// // // // // // //                                 </button>
// // // // // // //                             </div>
// // // // // // //                         </div>
// // // // // // //                     </div>
// // // // // // //                 )}
// // // // // // //             </div>
// // // // // // //         </BaseModal>
// // // // // // //     );
// // // // // // // }


// // // // // // 'use client';

// // // // // // import { useState, useRef, useEffect } from 'react';
// // // // // // import { X, Send, FileText, Upload, Loader2, CheckCircle2, MapPin, Building, User, Info, Trash2 } from 'lucide-react';
// // // // // // import { api } from '@/lib/api'; 
// // // // // // import { getProvinces, getRegencies } from '@/lib/indonesia';
// // // // // // import BaseModal from '@/components/ui/BaseModal';
// // // // // // import axios from 'axios'; // Wajib pakai Axios untuk upload manual

// // // // // // // Sesuaikan Port Backend Anda (4000)
// // // // // // const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// // // // // // interface CourseProposalModalProps {
// // // // // //     onClose: () => void;
// // // // // //     onSuccess: () => void;
// // // // // //     currentUser: any;
// // // // // // }

// // // // // // export default function CourseProposalModal({ onClose, onSuccess, currentUser }: CourseProposalModalProps) {
// // // // // //     // --- STATE DATA ---
// // // // // //     const [title, setTitle] = useState('');
// // // // // //     const [reason, setReason] = useState('');
// // // // // //     const [programType, setProgramType] = useState<'training' | 'course'>('training');
    
// // // // // //     // --- STATE WILAYAH ---
// // // // // //     const [scope, setScope] = useState<'nasional' | 'provinsi' | 'kota'>('nasional');
// // // // // //     const [selectedProvId, setSelectedProvId] = useState('');
// // // // // //     const [selectedCityId, setSelectedCityId] = useState('');
// // // // // //     const [provinces, setProvinces] = useState<any[]>([]);
// // // // // //     const [regencies, setRegencies] = useState<any[]>([]);
    
// // // // // //     // Lock State (Kunci Wilayah jika user punya provinsi)
// // // // // //     const [isProvLocked, setIsProvLocked] = useState(false);

// // // // // //     // --- STATE DOKUMEN & CMS ---
// // // // // //     // Menyimpan daftar nama dokumen yang wajib (String Array)
// // // // // //     const [requiredDocs, setRequiredDocs] = useState<string[]>([]);
// // // // // //     // Menyimpan file yang sudah diupload: Key = Nama Dokumen (misal: "KAK")
// // // // // //     const [uploadedFiles, setUploadedFiles] = useState<Record<string, { url: string, originalName: string }>>({});
    
// // // // // //     // --- UI STATES ---
// // // // // //     const [loading, setLoading] = useState(false);
// // // // // //     const [configLoading, setConfigLoading] = useState(true);
// // // // // //     const [uploadingItem, setUploadingItem] = useState<string | null>(null);
// // // // // //     const [showConfirm, setShowConfirm] = useState(false); 

// // // // // //     // --- 1. LOAD DATA, CMS & LOCK WILAYAH ---
// // // // // //     useEffect(() => {
// // // // // //         setProvinces(getProvinces());
        
// // // // // //         // A. Load CMS Config (Dokumen Wajib)
// // // // // //         const fetchConfig = async () => {
// // // // // //             try {
// // // // // //                 const res = await api('/api/content').catch(() => ({}));
// // // // // //                 // Ambil array string nama dokumen
// // // // // //                 const tDocs = res.trainingRequirements || ['Kerangka Acuan Kerja (KAK)', 'Rencana Anggaran Biaya (RAB)', 'Jadwal Kegiatan'];
// // // // // //                 const cDocs = res.courseRequirements || ['Silabus Materi', 'CV Pengajar'];
                
// // // // // //                 // Set awal berdasarkan tipe default (Training)
// // // // // //                 setRequiredDocs(tDocs);
// // // // // //                 // Simpan juga di variable global window/state jika ingin switch cepat, tapi disini kita fetch ulang atau simpan di state terpisah
// // // // // //                 (window as any)._cmsDocs = { tDocs, cDocs };
                
// // // // // //             } catch (e) {
// // // // // //                 console.error("Gagal load config CMS, pakai default.", e);
// // // // // //                 setRequiredDocs(['Kerangka Acuan Kerja (KAK)', 'Rencana Anggaran Biaya (RAB)']);
// // // // // //             } finally { 
// // // // // //                 setConfigLoading(false); 
// // // // // //             }
// // // // // //         };
// // // // // //         fetchConfig();

// // // // // //         // B. Logika Lock Wilayah User
// // // // // //         if (currentUser) {
// // // // // //             // Cek apakah user memiliki provinceId atau cityId
// // // // // //             // Prioritas: cityId (Lock Kota) -> provinceId (Lock Provinsi)
// // // // // //             if (currentUser.cityId) {
// // // // // //                 setScope('kota');
// // // // // //                 setSelectedProvId(currentUser.provinceId);
// // // // // //                 setSelectedCityId(currentUser.cityId);
// // // // // //                 setIsProvLocked(true); // Kunci semua
// // // // // //             } else if (currentUser.provinceId) {
// // // // // //                 setScope('provinsi');
// // // // // //                 setSelectedProvId(currentUser.provinceId);
// // // // // //                 setIsProvLocked(true); // Kunci dropdown provinsi
// // // // // //             }
// // // // // //         }
// // // // // //     }, [currentUser]);

// // // // // //     // Update Kota saat Provinsi berubah (Jika tidak dilock penuh)
// // // // // //     useEffect(() => {
// // // // // //         if (selectedProvId) {
// // // // // //             setRegencies(getRegencies(selectedProvId));
// // // // // //             if (!currentUser?.cityId) setSelectedCityId(''); // Reset kota hanya jika user bukan admin kota
// // // // // //         } else {
// // // // // //             setRegencies([]);
// // // // // //         }
// // // // // //     }, [selectedProvId, currentUser]);

// // // // // //     // --- 2. GANTI TIPE PROGRAM ---
// // // // // //     const handleProgramTypeChange = (type: 'training' | 'course') => {
// // // // // //         setProgramType(type);
// // // // // //         setUploadedFiles({}); // Reset file saat ganti tipe
        
// // // // // //         const cached = (window as any)._cmsDocs;
// // // // // //         if (cached) {
// // // // // //             setRequiredDocs(type === 'training' ? cached.tDocs : cached.cDocs);
// // // // // //         } else {
// // // // // //             // Fallback
// // // // // //             setRequiredDocs(type === 'training' 
// // // // // //                 ? ['Kerangka Acuan Kerja (KAK)', 'Rencana Anggaran Biaya (RAB)'] 
// // // // // //                 : ['Silabus Materi', 'CV Pengajar']);
// // // // // //         }
// // // // // //     };

// // // // // //     // --- 3. UPLOAD LOGIC (SESUAI UPLOADTEST.TSX) ---
// // // // // //     const handleFileUpload = async (docName: string, e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // //         const file = e.target.files?.[0];
// // // // // //         if (!file) return;
        
// // // // // //         setUploadingItem(docName);
        
// // // // // //         // A. Ambil Token Manual dari LocalStorage (Solusi "Sesi Habis")
// // // // // //         const userStr = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
// // // // // //         const token = userStr ? JSON.parse(userStr).token : '';

// // // // // //         if (!token) {
// // // // // //             alert("Gagal: Sesi habis atau token tidak ditemukan. Silakan login ulang.");
// // // // // //             setUploadingItem(null);
// // // // // //             return;
// // // // // //         }

// // // // // //         const fd = new FormData();
// // // // // //         fd.append('file', file);

// // // // // //         try {
// // // // // //             // B. POST ke Backend (Port 4000) menggunakan AXIOS
// // // // // //             const response = await axios.post(`${API_BASE_URL}/api/materials/upload`, fd, {
// // // // // //                 headers: { 
// // // // // //                     'Content-Type': 'multipart/form-data', 
// // // // // //                     'Authorization': `Bearer ${token}` 
// // // // // //                 },
// // // // // //                 withCredentials: true // Tambahan untuk keamanan cookie jika perlu
// // // // // //             });

// // // // // //             // C. Parsing Response (Sesuai UploadTest)
// // // // // //             const result = response.data;
// // // // // //             const fileUrl = result.data?.url || result.url; // Cek struktur respon
// // // // // //             const fileName = result.data?.originalName || result.originalName || file.name;

// // // // // //             if (fileUrl) {
// // // // // //                 setUploadedFiles(prev => ({
// // // // // //                     ...prev,
// // // // // //                     [docName]: { url: fileUrl, originalName: fileName }
// // // // // //                 }));
// // // // // //                 // Feedback Sukses
// // // // // //                 // alert(`✅ Berhasil: ${fileName}`); 
// // // // // //             } else {
// // // // // //                 throw new Error("URL tidak ditemukan di respon server.");
// // // // // //             }
// // // // // //         } catch (err: any) {
// // // // // //             console.error("Upload Error:", err);
// // // // // //             const msg = err.response?.data?.message || err.message || "Gagal upload";
// // // // // //             alert("Gagal Upload: " + msg);
// // // // // //         } finally {
// // // // // //             setUploadingItem(null);
// // // // // //             e.target.value = ''; // Reset input
// // // // // //         }
// // // // // //     };

// // // // // //     const removeFile = (docName: string) => {
// // // // // //         if(!confirm("Hapus file ini?")) return;
// // // // // //         const newFiles = { ...uploadedFiles };
// // // // // //         delete newFiles[docName];
// // // // // //         setUploadedFiles(newFiles);
// // // // // //     };

// // // // // //     // --- 4. SUBMIT LOGIC ---
// // // // // //     const handlePreSubmit = (e: React.FormEvent) => {
// // // // // //         e.preventDefault();
// // // // // //         if (!title.trim()) return alert("Judul usulan wajib diisi!");
        
// // // // // //         // Validasi Dokumen
// // // // // //         const missingDocs = requiredDocs.filter(docName => !uploadedFiles[docName]);
// // // // // //         if (missingDocs.length > 0) {
// // // // // //             return alert(`Mohon upload dokumen wajib berikut:\n- ${missingDocs.join('\n- ')}`);
// // // // // //         }

// // // // // //         if (scope === 'provinsi' && !selectedProvId) return alert("Pilih Provinsi tujuan.");
// // // // // //         if (scope === 'kota' && (!selectedProvId || !selectedCityId)) return alert("Pilih Provinsi dan Kota tujuan.");
        
// // // // // //         setShowConfirm(true);
// // // // // //     };

// // // // // //     const handleFinalSubmit = async () => {
// // // // // //         setLoading(true);
// // // // // //         try {
// // // // // //             let organizer = 'PMI Pusat';
// // // // // //             if (scope === 'provinsi') organizer = `PMI Provinsi: ${provinces.find(p => p.code === selectedProvId)?.name}`;
// // // // // //             else if (scope === 'kota') organizer = `PMI Kabupaten/Kota: ${regencies.find(r => r.code === selectedCityId)?.name}, ${provinces.find(p => p.code === selectedProvId)?.name}`;

// // // // // //             // Format Dokumen untuk DB
// // // // // //             const proposalDocuments = Object.entries(uploadedFiles).map(([name, data]) => ({
// // // // // //                 name: name, // Label (Misal: KAK)
// // // // // //                 originalName: data.originalName, // Nama file asli
// // // // // //                 url: data.url,
// // // // // //                 type: 'document',
// // // // // //                 label: name
// // // // // //             }));

// // // // // //             const payload = {
// // // // // //                 title, programType, description: reason, status: 'proposed',
// // // // // //                 proposalDocuments: proposalDocuments, 
// // // // // //                 organizer,
// // // // // //                 creatorInfo: { 
// // // // // //                     id: currentUser?._id || currentUser?.id, 
// // // // // //                     name: currentUser?.name, 
// // // // // //                     email: currentUser?.email, 
// // // // // //                     role: currentUser?.role 
// // // // // //                 },
// // // // // //                 isPublished: false, isInfoCompleted: false
// // // // // //             };

// // // // // //             await api('/api/courses', { method: 'POST', body: payload });
// // // // // //             alert("✅ Pengajuan berhasil dikirim!");
// // // // // //             onSuccess(); 
// // // // // //             onClose();
// // // // // //         } catch (err: any) { 
// // // // // //             alert("Gagal mengirim: " + err.message); 
// // // // // //             setLoading(false); 
// // // // // //             setShowConfirm(false); 
// // // // // //         }
// // // // // //     };

// // // // // //     return (
// // // // // //         <BaseModal isOpen={true} onClose={onClose} title="Pengajuan Pelatihan Baru" size="full">
// // // // // //             <div className="max-w-7xl mx-auto h-full flex flex-col justify-center px-2">
                
// // // // // //                 <form onSubmit={handlePreSubmit} className="pb-1">
// // // // // //                     {/* LAYOUT 3 KOLOM COMPACT */}
// // // // // //                     <div className="grid grid-cols-12 gap-5 items-stretch">
                        
// // // // // //                         {/* KOLOM 1: INFO DASAR */}
// // // // // //                         <div className="col-span-4 flex flex-col gap-4">
// // // // // //                             <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl flex items-center justify-between shadow-sm">
// // // // // //                                 <div className="flex items-center gap-2">
// // // // // //                                     <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">{currentUser?.name?.charAt(0)}</div>
// // // // // //                                     <div><p className="text-[10px] font-bold text-blue-600 uppercase">PENGAJU</p><p className="text-xs font-bold text-gray-800 leading-tight">{currentUser?.name}</p></div>
// // // // // //                                 </div>
// // // // // //                                 <div className="text-[10px] text-gray-500 bg-white px-2 py-1 rounded border border-blue-200">{currentUser?.role}</div>
// // // // // //                             </div>

// // // // // //                             <div>
// // // // // //                                 <label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block" htmlFor="inpTitle">JUDUL USULAN *</label>
// // // // // //                                 <input id="inpTitle" type="text" className="w-full p-2.5 border border-gray-300 rounded-lg text-sm font-bold focus:ring-1 focus:ring-red-500 outline-none shadow-sm" placeholder="Contoh: Diklat Manajemen..." value={title} onChange={e => setTitle(e.target.value)} title="Judul" />
// // // // // //                             </div>

// // // // // //                             <div className="bg-white rounded-lg border border-gray-200 p-2">
// // // // // //                                 <label className="text-[10px] font-bold text-gray-500 uppercase mb-2 block px-1">JENIS PROGRAM</label>
// // // // // //                                 <div className="grid grid-cols-2 gap-2">
// // // // // //                                     <button type="button" onClick={() => handleProgramTypeChange('training')} className={`py-2 rounded-md border text-xs font-bold flex items-center justify-center gap-1 ${programType === 'training' ? 'border-red-600 bg-red-50 text-red-700' : 'bg-gray-50 text-gray-500'}`} title="Diklat"><Building size={14}/> DIKLAT</button>
// // // // // //                                     <button type="button" onClick={() => handleProgramTypeChange('course')} className={`py-2 rounded-md border text-xs font-bold flex items-center justify-center gap-1 ${programType === 'course' ? 'border-red-600 bg-red-50 text-red-700' : 'bg-gray-50 text-gray-500'}`} title="Kursus"><User size={14}/> KURSUS</button>
// // // // // //                                 </div>
// // // // // //                             </div>
// // // // // //                         </div>

// // // // // //                         {/* KOLOM 2: WILAYAH & ALASAN */}
// // // // // //                         <div className="col-span-4 flex flex-col gap-4">
// // // // // //                             <div className="bg-orange-50/50 border border-orange-200 p-3 rounded-xl shadow-sm flex-1 flex flex-col">
// // // // // //                                 <label className="text-[10px] font-bold text-orange-800 uppercase mb-2 flex items-center gap-1"><MapPin size={12}/> PELAKSANA (ADMIN APPROVAL)</label>
// // // // // //                                 <div className="flex gap-2 mb-2">
// // // // // //                                     {/* Radio Button Pilihan Scope */}
// // // // // //                                     {['nasional', 'provinsi', 'kota'].map((s) => (
// // // // // //                                         <label key={s} className={`flex items-center gap-1 cursor-pointer bg-white px-2 py-1 rounded border shadow-sm ${scope === s ? 'border-orange-400 ring-1 ring-orange-200' : 'border-orange-100'} ${isProvLocked && s !== scope ? 'opacity-50 cursor-not-allowed' : ''}`}>
// // // // // //                                             <input 
// // // // // //                                                 type="radio" 
// // // // // //                                                 checked={scope === s} 
// // // // // //                                                 onChange={() => {
// // // // // //                                                     // Jika dilock, jangan biarkan user pindah ke level yang lebih tinggi (misal Admin Kota pindah ke Nasional)
// // // // // //                                                     if (!isProvLocked) setScope(s as any);
// // // // // //                                                 }} 
// // // // // //                                                 className="w-3 h-3 accent-red-600" 
// // // // // //                                                 title={s}
// // // // // //                                                 disabled={isProvLocked && s !== scope}
// // // // // //                                             />
// // // // // //                                             <span className="text-[10px] font-bold capitalize text-gray-700">{s}</span>
// // // // // //                                         </label>
// // // // // //                                     ))}
// // // // // //                                 </div>
// // // // // //                                 <div className="space-y-2 mt-auto">
// // // // // //                                     {scope !== 'nasional' && (
// // // // // //                                         <select 
// // // // // //                                             className={`w-full p-2 border border-orange-200 rounded text-xs bg-white ${isProvLocked ? 'bg-gray-100 text-gray-500' : ''}`} 
// // // // // //                                             value={selectedProvId} 
// // // // // //                                             onChange={e => setSelectedProvId(e.target.value)} 
// // // // // //                                             title="Pilih Provinsi"
// // // // // //                                             disabled={isProvLocked} // Lock Dropdown Provinsi
// // // // // //                                         >
// // // // // //                                             <option value="">- Pilih Provinsi -</option>
// // // // // //                                             {provinces.map(p => <option key={p.code} value={p.code}>{p.name}</option>)}
// // // // // //                                         </select>
// // // // // //                                     )}
// // // // // //                                     {scope === 'kota' && (
// // // // // //                                         <select 
// // // // // //                                             className="w-full p-2 border border-orange-200 rounded text-xs bg-white" 
// // // // // //                                             value={selectedCityId} 
// // // // // //                                             onChange={e => setSelectedCityId(e.target.value)} 
// // // // // //                                             disabled={!selectedProvId} 
// // // // // //                                             title="Pilih Kota"
// // // // // //                                         >
// // // // // //                                             <option value="">- Pilih Kota -</option>
// // // // // //                                             {regencies.map(r => <option key={r.code} value={r.code}>{r.name}</option>)}
// // // // // //                                         </select>
// // // // // //                                     )}
// // // // // //                                 </div>
// // // // // //                             </div>

// // // // // //                             <div>
// // // // // //                                 <label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block" htmlFor="rsnInp">ALASAN / URGENSI</label>
// // // // // //                                 <textarea id="rsnInp" className="w-full p-2.5 border border-gray-300 rounded-lg text-xs h-20 resize-none focus:ring-1 focus:ring-red-500 outline-none" placeholder="Jelaskan urgensi..." value={reason} onChange={e => setReason(e.target.value)} title="Alasan" />
// // // // // //                             </div>
// // // // // //                         </div>

// // // // // //                         {/* KOLOM 3: DOKUMEN WAJIB (SESUAI CMS & UPLOAD TEST) */}
// // // // // //                         <div className="col-span-4 flex flex-col h-full bg-gray-50 border border-gray-200 rounded-xl p-3 shadow-inner">
// // // // // //                             <label className="text-[10px] font-bold text-gray-600 uppercase mb-2 block flex justify-between">
// // // // // //                                 <span>DOKUMEN WAJIB</span>
// // // // // //                                 <span className="bg-gray-200 px-1.5 rounded text-gray-600">{requiredDocs.length}</span>
// // // // // //                             </label>
                            
// // // // // //                             <div className="space-y-2 overflow-y-auto max-h-[300px] custom-scrollbar pr-1 flex-1">
// // // // // //                                 {configLoading ? (
// // // // // //                                     <div className="text-center text-xs text-gray-400 py-4"><Loader2 className="animate-spin inline mr-1"/> Memuat Syarat...</div>
// // // // // //                                 ) : (
// // // // // //                                     requiredDocs.map((docName, idx) => (
// // // // // //                                         <div key={idx} className={`p-2 rounded border transition-all ${uploadedFiles[docName] ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200 shadow-sm'}`}>
// // // // // //                                             <div className="flex justify-between items-center mb-1">
// // // // // //                                                 {/* NAMA DOKUMEN DARI CMS */}
// // // // // //                                                 <span className="text-[10px] font-bold text-gray-700 flex items-center gap-1">
// // // // // //                                                     {uploadedFiles[docName] ? <CheckCircle2 size={12} className="text-green-600"/> : <Info size={12} className="text-orange-500"/>}
// // // // // //                                                     {docName} <span className="text-red-500">*</span>
// // // // // //                                                 </span>
// // // // // //                                             </div>

// // // // // //                                             {uploadedFiles[docName] ? (
// // // // // //                                                 // TAMPILAN SETELAH UPLOAD (HIJAU + NAMA FILE)
// // // // // //                                                 <div className="flex items-center gap-2 bg-white p-1.5 rounded border border-green-200 mt-1">
// // // // // //                                                     <FileText size={14} className="text-green-600"/>
// // // // // //                                                     <span className="text-[9px] font-bold text-green-700 flex-1 truncate" title={uploadedFiles[docName].originalName}>
// // // // // //                                                         {uploadedFiles[docName].originalName}
// // // // // //                                                     </span>
// // // // // //                                                     <button type="button" onClick={() => removeFile(docName)} className="text-red-400 hover:text-red-600 p-1 bg-red-50 rounded" title="Hapus">
// // // // // //                                                         <Trash2 size={12}/>
// // // // // //                                                     </button>
// // // // // //                                                 </div>
// // // // // //                                             ) : (
// // // // // //                                                 // TOMBOL UPLOAD
// // // // // //                                                 <div className="relative group mt-1">
// // // // // //                                                     <input 
// // // // // //                                                         type="file" 
// // // // // //                                                         className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
// // // // // //                                                         onChange={(e) => handleFileUpload(docName, e)} 
// // // // // //                                                         disabled={uploadingItem === docName} 
// // // // // //                                                         title={`Upload ${docName}`}
// // // // // //                                                     />
// // // // // //                                                     <div className="flex items-center justify-center gap-2 py-1.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded text-blue-600 transition-colors">
// // // // // //                                                         {uploadingItem === docName ? <Loader2 className="animate-spin" size={14}/> : <Upload size={14}/>}
// // // // // //                                                         <span className="text-[10px] font-bold">Upload File</span>
// // // // // //                                                     </div>
// // // // // //                                                 </div>
// // // // // //                                             )}
// // // // // //                                         </div>
// // // // // //                                     ))
// // // // // //                                 )}
// // // // // //                                 {requiredDocs.length === 0 && <p className="text-center text-xs text-gray-400 italic py-4">Tidak ada dokumen wajib.</p>}
// // // // // //                             </div>
// // // // // //                         </div>
// // // // // //                     </div>

// // // // // //                     {/* FOOTER */}
// // // // // //                     <div className="flex gap-3 pt-4 mt-2 border-t border-gray-100">
// // // // // //                         <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-gray-300 rounded-lg font-bold text-gray-600 hover:bg-gray-50 text-xs" title="Batal">Batal</button>
// // // // // //                         <button type="submit" className="flex-[3] py-2.5 bg-[#990000] text-white rounded-lg font-bold hover:bg-[#7f0000] flex items-center justify-center gap-2 text-xs shadow-md tracking-wider" title="Kirim">
// // // // // //                             <Send size={14} /> KIRIM USULAN
// // // // // //                         </button>
// // // // // //                     </div>
// // // // // //                 </form>

// // // // // //                 {/* POPUP CONFIRM */}
// // // // // //                 {showConfirm && (
// // // // // //                     <div className="absolute inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-lg animate-in fade-in">
// // // // // //                         <div className="bg-white w-[300px] p-5 rounded-2xl shadow-2xl text-center space-y-3 animate-in zoom-in-95 border border-gray-200">
// // // // // //                             <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto text-blue-600 shadow-inner"><Info size={24}/></div>
// // // // // //                             <h4 className="text-base font-black text-gray-900">Konfirmasi</h4>
// // // // // //                             <p className="text-xs text-gray-500 leading-snug">Usulan dikirim ke <b>Admin {scope === 'nasional' ? 'Pusat' : 'Wilayah'}</b>.</p>
// // // // // //                             <div className="flex gap-2 pt-2">
// // // // // //                                 <button onClick={() => setShowConfirm(false)} className="flex-1 py-2 border rounded-lg text-xs font-bold text-gray-500" title="Batal">Batal</button>
// // // // // //                                 <button onClick={handleFinalSubmit} disabled={loading} className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold flex justify-center items-center gap-1" title="Ya">
// // // // // //                                     {loading ? <Loader2 size={12} className="animate-spin"/> : <CheckCircle2 size={12}/>} Ya, Kirim
// // // // // //                                 </button>
// // // // // //                             </div>
// // // // // //                         </div>
// // // // // //                     </div>
// // // // // //                 )}
// // // // // //             </div>
// // // // // //         </BaseModal>
// // // // // //     );
// // // // // // }




// // // // // 'use client';

// // // // // import { useState, useRef, useEffect } from 'react';
// // // // // import { X, Send, FileText, Upload, Loader2, CheckCircle2, MapPin, Building, User, Info, Trash2, AlertCircle } from 'lucide-react';
// // // // // import { api } from '@/lib/api'; 
// // // // // import { getProvinces, getRegencies } from '@/lib/indonesia';
// // // // // import BaseModal from '@/components/ui/BaseModal';
// // // // // import axios from 'axios';

// // // // // // PORT 4000 (Matching UploadTest)
// // // // // const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// // // // // interface CourseProposalModalProps {
// // // // //     onClose: () => void;
// // // // //     onSuccess: () => void;
// // // // //     currentUser: any;
// // // // // }

// // // // // export default function CourseProposalModal({ onClose, onSuccess, currentUser }: CourseProposalModalProps) {
// // // // //     // --- STATE DATA ---
// // // // //     const [title, setTitle] = useState('');
// // // // //     const [reason, setReason] = useState('');
// // // // //     const [programType, setProgramType] = useState<'training' | 'course'>('training');
    
// // // // //     // --- STATE LOCATION ---
// // // // //     const [scope, setScope] = useState<'nasional' | 'provinsi' | 'kota'>('nasional');
// // // // //     const [selectedProvId, setSelectedProvId] = useState('');
// // // // //     const [selectedCityId, setSelectedCityId] = useState('');
// // // // //     const [provinces, setProvinces] = useState<any[]>([]);
// // // // //     const [regencies, setRegencies] = useState<any[]>([]);
// // // // //     const [isProvLocked, setIsProvLocked] = useState(false);

// // // // //     // --- STATE DOCUMENTS (OLD LOGIC) ---
// // // // //     const [requiredDocs, setRequiredDocs] = useState<string[]>([]);
// // // // //     const [courseDocs, setCourseDocs] = useState<string[]>([]);
    
// // // // //     // Key = Doc Name (String)
// // // // //     const [uploadedFiles, setUploadedFiles] = useState<Record<string, { url: string, originalName: string }>>({});
    
// // // // //     // --- UI STATES ---
// // // // //     const [loading, setLoading] = useState(false);
// // // // //     const [configLoading, setConfigLoading] = useState(true);
// // // // //     const [uploadingItem, setUploadingItem] = useState<string | null>(null);
// // // // //     const [showConfirm, setShowConfirm] = useState(false); 

// // // // //     // --- HELPER: ROBUST TOKEN GETTER ---
// // // // //     const getToken = () => {
// // // // //         if (typeof window === 'undefined') return null;
        
// // // // //         // 1. Try 'token' key direct
// // // // //         let token = localStorage.getItem('token');
// // // // //         if (token && token !== 'undefined' && token !== 'null') return token;

// // // // //         // 2. Try 'user' key object
// // // // //         const userStr = localStorage.getItem('user');
// // // // //         if (userStr) {
// // // // //             try {
// // // // //                 const userData = JSON.parse(userStr);
// // // // //                 if (userData.token) return userData.token;
// // // // //             } catch (e) { console.error("Error parsing user data", e); }
// // // // //         }
// // // // //         return null;
// // // // //     };

// // // // //     // --- 1. LOAD DATA & LOCK LOCATION ---
// // // // //     useEffect(() => {
// // // // //         const provData = getProvinces();
// // // // //         setProvinces(provData);
        
// // // // //         // A. FETCH CMS
// // // // //         const fetchConfig = async () => {
// // // // //             try {
// // // // //                 const res = await api('/api/content').catch(() => ({}));
// // // // //                 setRequiredDocs(res.trainingRequirements || ['Kerangka Acuan Kerja (KAK)', 'Rencana Anggaran Biaya (RAB)']);
// // // // //                 setCourseDocs(res.courseRequirements || ['Silabus Ringkas']);
// // // // //             } catch (e) {
// // // // //                 console.error("Gagal load config", e);
// // // // //                 setRequiredDocs(['Kerangka Acuan Kerja (KAK)', 'Rencana Anggaran Biaya (RAB)']);
// // // // //                 setCourseDocs(['Silabus Ringkas']);
// // // // //             } finally { 
// // // // //                 setConfigLoading(false); 
// // // // //             }
// // // // //         };
// // // // //         fetchConfig();

// // // // //         // B. LOCK LOCATION LOGIC
// // // // //         if (currentUser) {
// // // // //             const userProv = currentUser.provinceId || currentUser.province || (currentUser.regionScope === 'province' ? currentUser.managedProvinces?.[0] : null);
// // // // //             const userCity = currentUser.cityId || currentUser.city || (currentUser.regionScope === 'regency' ? currentUser.managedRegencies?.[0] : null);

// // // // //             if (userProv) {
// // // // //                 // Find by Code OR Name (Case Insensitive)
// // // // //                 const foundProv = provData.find((p: any) => 
// // // // //                     p.code === userProv || 
// // // // //                     p.name.toLowerCase() === String(userProv).toLowerCase()
// // // // //                 );
                
// // // // //                 if (foundProv) {
// // // // //                     setScope('provinsi');
// // // // //                     setSelectedProvId(foundProv.code);
// // // // //                     setIsProvLocked(true); 

// // // // //                     if (userCity) {
// // // // //                         setScope('kota');
// // // // //                         const regs = getRegencies(foundProv.code);
// // // // //                         setRegencies(regs);
                        
// // // // //                         const foundCity = regs.find((c: any) => 
// // // // //                             c.code === userCity || 
// // // // //                             c.name.toLowerCase() === String(userCity).toLowerCase()
// // // // //                         );
// // // // //                         if (foundCity) setSelectedCityId(foundCity.code);
// // // // //                     }
// // // // //                 }
// // // // //             }
// // // // //         }
// // // // //     }, [currentUser]);

// // // // //     useEffect(() => {
// // // // //         if (selectedProvId) {
// // // // //             if (regencies.length === 0 || !isProvLocked) {
// // // // //                 setRegencies(getRegencies(selectedProvId));
// // // // //             }
// // // // //             if (!isProvLocked) setSelectedCityId(''); 
// // // // //         } else {
// // // // //             setRegencies([]);
// // // // //         }
// // // // //     }, [selectedProvId, isProvLocked]);

// // // // //     // --- 2. UPLOAD LOGIC (FIXED TOKEN) ---
// // // // //     const handleFileUpload = async (docName: string, e: React.ChangeEvent<HTMLInputElement>) => {
// // // // //         const file = e.target.files?.[0];
// // // // //         if (!file) return;
        
// // // // //         setUploadingItem(docName);
        
// // // // //         // 1. Get Token Robustly
// // // // //         const token = getToken();

// // // // //         if (!token) {
// // // // //             alert("Sesi habis atau token tidak ditemukan. Silakan login ulang.");
// // // // //             setUploadingItem(null);
// // // // //             return;
// // // // //         }

// // // // //         const fd = new FormData();
// // // // //         fd.append('file', file);

// // // // //         try {
// // // // //             // 2. POST Axios to Port 4000
// // // // //             const response = await axios.post(`${API_BASE_URL}/api/materials/upload`, fd, {
// // // // //                 headers: { 
// // // // //                     'Content-Type': 'multipart/form-data', 
// // // // //                     'Authorization': `Bearer ${token}` 
// // // // //                 },
// // // // //             });

// // // // //             // 3. Parse Result
// // // // //             const result = response.data;
// // // // //             const fileUrl = result.data?.url || result.url;
// // // // //             const fileName = result.data?.originalName || result.originalName || file.name;

// // // // //             if (fileUrl) {
// // // // //                 setUploadedFiles(prev => ({
// // // // //                     ...prev,
// // // // //                     [docName]: { url: fileUrl, originalName: fileName }
// // // // //                 }));
// // // // //                 // alert(`✅ Berhasil upload: ${fileName}`);
// // // // //             } else {
// // // // //                 throw new Error("URL tidak ditemukan.");
// // // // //             }
// // // // //         } catch (err: any) {
// // // // //             console.error("Upload Error:", err);
// // // // //             const msg = err.response?.data?.message || err.message || "Gagal upload";
// // // // //             alert("Gagal Upload: " + msg);
// // // // //         } finally {
// // // // //             setUploadingItem(null);
// // // // //             e.target.value = ''; 
// // // // //         }
// // // // //     };

// // // // //     const removeFile = (docName: string) => {
// // // // //         if(!confirm("Hapus file ini?")) return;
// // // // //         const newFiles = { ...uploadedFiles };
// // // // //         delete newFiles[docName];
// // // // //         setUploadedFiles(newFiles);
// // // // //     };

// // // // //     // --- 3. SUBMIT LOGIC ---
// // // // //     const activeRequirements = programType === 'training' ? requiredDocs : courseDocs;

// // // // //     const handlePreSubmit = (e: React.FormEvent) => {
// // // // //         e.preventDefault();
// // // // //         if (!title.trim()) return alert("Judul usulan wajib diisi!");
        
// // // // //         const missingDocs = activeRequirements.filter(doc => !uploadedFiles[doc]);
// // // // //         if (missingDocs.length > 0) {
// // // // //             return alert(`Mohon lengkapi dokumen wajib berikut:\n- ${missingDocs.join('\n- ')}`);
// // // // //         }

// // // // //         if (scope === 'provinsi' && !selectedProvId) return alert("Pilih Provinsi tujuan.");
// // // // //         if (scope === 'kota' && (!selectedProvId || !selectedCityId)) return alert("Pilih Provinsi dan Kota tujuan.");
        
// // // // //         setShowConfirm(true);
// // // // //     };

// // // // //     const handleFinalSubmit = async () => {
// // // // //         setLoading(true);
// // // // //         try {
// // // // //             let organizer = 'PMI Pusat';
// // // // //             if (scope === 'provinsi') {
// // // // //                 const provName = provinces.find(p => p.code === selectedProvId)?.name || selectedProvId;
// // // // //                 organizer = `PMI Provinsi: ${provName}`;
// // // // //             } else if (scope === 'kota') {
// // // // //                 const provName = provinces.find(p => p.code === selectedProvId)?.name || selectedProvId;
// // // // //                 const cityName = regencies.find(r => r.code === selectedCityId)?.name || selectedCityId;
// // // // //                 organizer = `PMI Kabupaten/Kota: ${cityName}, ${provName}`;
// // // // //             }

// // // // //             const proposalDocuments = Object.entries(uploadedFiles).map(([name, data]) => ({
// // // // //                 name: name,
// // // // //                 originalName: data.originalName,
// // // // //                 url: data.url,
// // // // //                 type: 'document',
// // // // //                 label: name
// // // // //             }));

// // // // //             const payload = {
// // // // //                 title, programType, description: reason, status: 'proposed',
// // // // //                 proposalDocuments: proposalDocuments, 
// // // // //                 organizer,
// // // // //                 creatorInfo: { 
// // // // //                     id: currentUser?._id || currentUser?.id, 
// // // // //                     name: currentUser?.name, 
// // // // //                     email: currentUser?.email, 
// // // // //                     role: currentUser?.role 
// // // // //                 },
// // // // //                 isPublished: false, isInfoCompleted: false
// // // // //             };

// // // // //             await api('/api/courses', { method: 'POST', body: payload });
// // // // //             alert("✅ Pengajuan berhasil dikirim!");
// // // // //             onSuccess(); 
// // // // //             onClose();
// // // // //         } catch (err: any) { 
// // // // //             alert("Gagal mengirim: " + err.message); 
// // // // //             setLoading(false); 
// // // // //             setShowConfirm(false); 
// // // // //         }
// // // // //     };

// // // // //     return (
// // // // //         <BaseModal isOpen={true} onClose={onClose} title="Pengajuan Pelatihan Baru" size="full">
// // // // //             <div className="max-w-7xl mx-auto h-full flex flex-col justify-center px-2">
                
// // // // //                 <form onSubmit={handlePreSubmit} className="pb-1">
// // // // //                     {/* LAYOUT 3 KOLOM */}
// // // // //                     <div className="grid grid-cols-12 gap-5 items-stretch">
                        
// // // // //                         {/* KOLOM 1: INFO */}
// // // // //                         <div className="col-span-4 flex flex-col gap-4">
// // // // //                             <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl flex items-center justify-between shadow-sm">
// // // // //                                 <div className="flex items-center gap-2">
// // // // //                                     <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">{currentUser?.name?.charAt(0)}</div>
// // // // //                                     <div><p className="text-[10px] font-bold text-blue-600 uppercase">PENGAJU</p><p className="text-xs font-bold text-gray-800 leading-tight">{currentUser?.name}</p></div>
// // // // //                                 </div>
// // // // //                                 <div className="text-[10px] text-gray-500 bg-white px-2 py-1 rounded border border-blue-200">{currentUser?.role}</div>
// // // // //                             </div>

// // // // //                             <div>
// // // // //                                 <label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block" htmlFor="inpTitle">JUDUL USULAN *</label>
// // // // //                                 <input id="inpTitle" type="text" className="w-full p-2.5 border border-gray-300 rounded-lg text-sm font-bold focus:ring-1 focus:ring-red-500 outline-none shadow-sm" placeholder="Contoh: Diklat Manajemen..." value={title} onChange={e => setTitle(e.target.value)} title="Judul" />
// // // // //                             </div>

// // // // //                             <div className="bg-white rounded-lg border border-gray-200 p-2">
// // // // //                                 <label className="text-[10px] font-bold text-gray-500 uppercase mb-2 block px-1">JENIS PROGRAM</label>
// // // // //                                 <div className="grid grid-cols-2 gap-2">
// // // // //                                     <button type="button" onClick={() => setProgramType('training')} className={`py-2 rounded-md border text-xs font-bold flex items-center justify-center gap-1 ${programType === 'training' ? 'border-red-600 bg-red-50 text-red-700' : 'bg-gray-50 text-gray-500'}`} title="Diklat"><Building size={14}/> DIKLAT</button>
// // // // //                                     <button type="button" onClick={() => setProgramType('course')} className={`py-2 rounded-md border text-xs font-bold flex items-center justify-center gap-1 ${programType === 'course' ? 'border-red-600 bg-red-50 text-red-700' : 'bg-gray-50 text-gray-500'}`} title="Kursus"><User size={14}/> KURSUS</button>
// // // // //                                 </div>
// // // // //                             </div>
// // // // //                         </div>

// // // // //                         {/* KOLOM 2: WILAYAH */}
// // // // //                         <div className="col-span-4 flex flex-col gap-4">
// // // // //                             <div className="bg-orange-50/50 border border-orange-200 p-3 rounded-xl shadow-sm flex-1 flex flex-col">
// // // // //                                 <label className="text-[10px] font-bold text-orange-800 uppercase mb-2 flex items-center gap-1"><MapPin size={12}/> PELAKSANA (ADMIN APPROVAL)</label>
// // // // //                                 <div className="flex gap-2 mb-2">
// // // // //                                     {['nasional', 'provinsi', 'kota'].map((s) => (
// // // // //                                         <label key={s} className={`flex items-center gap-1 cursor-pointer bg-white px-2 py-1 rounded border shadow-sm ${scope === s ? 'border-orange-400 ring-1 ring-orange-200' : 'border-orange-100'} ${(isProvLocked && s !== scope && s !== 'kota' && scope !== 'kota') ? 'opacity-50 cursor-not-allowed' : ''}`}>
// // // // //                                             <input 
// // // // //                                                 type="radio" 
// // // // //                                                 checked={scope === s} 
// // // // //                                                 onChange={() => !isProvLocked && setScope(s as any)} 
// // // // //                                                 className="w-3 h-3 accent-red-600" 
// // // // //                                                 title={s}
// // // // //                                                 disabled={isProvLocked && s !== scope && !(scope === 'provinsi' && s === 'kota')}
// // // // //                                             />
// // // // //                                             <span className="text-[10px] font-bold capitalize text-gray-700">{s}</span>
// // // // //                                         </label>
// // // // //                                     ))}
// // // // //                                 </div>
// // // // //                                 <div className="space-y-2 mt-auto">
// // // // //                                     {scope !== 'nasional' && (
// // // // //                                         <select 
// // // // //                                             className={`w-full p-2 border border-orange-200 rounded text-xs bg-white ${isProvLocked ? 'bg-gray-100 text-gray-600 font-bold' : ''}`} 
// // // // //                                             value={selectedProvId} 
// // // // //                                             onChange={e => setSelectedProvId(e.target.value)} 
// // // // //                                             title="Pilih Provinsi"
// // // // //                                             disabled={isProvLocked}
// // // // //                                         >
// // // // //                                             <option value="">- Pilih Provinsi -</option>
// // // // //                                             {provinces.map(p => <option key={p.code} value={p.code}>{p.name}</option>)}
// // // // //                                         </select>
// // // // //                                     )}
// // // // //                                     {scope === 'kota' && (
// // // // //                                         <select className="w-full p-2 border border-orange-200 rounded text-xs bg-white" value={selectedCityId} onChange={e => setSelectedCityId(e.target.value)} disabled={!selectedProvId} title="Pilih Kota">
// // // // //                                             <option value="">- Pilih Kota -</option>
// // // // //                                             {regencies.map(r => <option key={r.code} value={r.code}>{r.name}</option>)}
// // // // //                                         </select>
// // // // //                                     )}
// // // // //                                 </div>
// // // // //                             </div>

// // // // //                             <div>
// // // // //                                 <label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block" htmlFor="rsnInp">ALASAN / URGENSI</label>
// // // // //                                 <textarea id="rsnInp" className="w-full p-2.5 border border-gray-300 rounded-lg text-xs h-20 resize-none focus:ring-1 focus:ring-red-500 outline-none" placeholder="Jelaskan urgensi..." value={reason} onChange={e => setReason(e.target.value)} title="Alasan" />
// // // // //                             </div>
// // // // //                         </div>

// // // // //                         {/* KOLOM 3: DOKUMEN WAJIB */}
// // // // //                         <div className="col-span-4 flex flex-col h-full bg-gray-50 border border-gray-200 rounded-xl p-3 shadow-inner">
// // // // //                             <label className="text-[10px] font-bold text-gray-600 uppercase mb-2 flex justify-between">
// // // // //                                 <span>DOKUMEN WAJIB</span>
// // // // //                                 <span className="bg-gray-200 px-1.5 rounded text-gray-600">{activeRequirements.length}</span>
// // // // //                             </label>
                            
// // // // //                             <div className="space-y-2 overflow-y-auto max-h-[300px] custom-scrollbar pr-1 flex-1">
// // // // //                                 {configLoading ? (
// // // // //                                     <div className="text-center text-xs text-gray-400 py-4"><Loader2 className="animate-spin inline mr-1"/> Memuat Syarat...</div>
// // // // //                                 ) : (
// // // // //                                     activeRequirements.map((docName, idx) => (
// // // // //                                         <div key={idx} className={`p-2 rounded border transition-all ${uploadedFiles[docName] ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200 shadow-sm'}`}>
// // // // //                                             <div className="flex justify-between items-center mb-1">
// // // // //                                                 <span className="text-[10px] font-bold text-gray-700 flex items-center gap-1">
// // // // //                                                     {uploadedFiles[docName] ? <CheckCircle2 size={12} className="text-green-600"/> : <AlertCircle size={12} className="text-orange-500"/>}
// // // // //                                                     {docName} <span className="text-red-500">*</span>
// // // // //                                                 </span>
// // // // //                                             </div>

// // // // //                                             {uploadedFiles[docName] ? (
// // // // //                                                 <div className="flex items-center gap-2 bg-white p-1.5 rounded border border-green-200 mt-1">
// // // // //                                                     <FileText size={14} className="text-green-600"/>
// // // // //                                                     <span className="text-[9px] font-bold text-green-700 flex-1 truncate" title={uploadedFiles[docName].originalName}>
// // // // //                                                         {uploadedFiles[docName].originalName}
// // // // //                                                     </span>
// // // // //                                                     <button type="button" onClick={() => removeFile(docName)} className="text-red-400 hover:text-red-600 p-1 bg-red-50 rounded" title="Hapus">
// // // // //                                                         <Trash2 size={12}/>
// // // // //                                                     </button>
// // // // //                                                 </div>
// // // // //                                             ) : (
// // // // //                                                 <div className="relative group mt-1">
// // // // //                                                     <input 
// // // // //                                                         type="file" 
// // // // //                                                         className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
// // // // //                                                         onChange={(e) => handleFileUpload(docName, e)} 
// // // // //                                                         disabled={uploadingItem === docName} 
// // // // //                                                         title={`Upload ${docName}`}
// // // // //                                                         accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.png"
// // // // //                                                     />
// // // // //                                                     <div className="flex items-center justify-center gap-2 py-1.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded text-blue-600 transition-colors">
// // // // //                                                         {uploadingItem === docName ? <Loader2 className="animate-spin" size={14}/> : <Upload size={14}/>}
// // // // //                                                         <span className="text-[10px] font-bold">Upload File</span>
// // // // //                                                     </div>
// // // // //                                                 </div>
// // // // //                                             )}
// // // // //                                         </div>
// // // // //                                     ))
// // // // //                                 )}
// // // // //                                 {activeRequirements.length === 0 && <p className="text-center text-xs text-gray-400 italic py-4">Tidak ada dokumen wajib.</p>}
// // // // //                             </div>
// // // // //                         </div>
// // // // //                     </div>

// // // // //                     <div className="flex gap-3 pt-4 mt-2 border-t border-gray-100">
// // // // //                         <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-gray-300 rounded-lg font-bold text-gray-600 hover:bg-gray-50 text-xs" title="Batal">Batal</button>
// // // // //                         <button type="submit" className="flex-[3] py-2.5 bg-[#990000] text-white rounded-lg font-bold hover:bg-[#7f0000] flex items-center justify-center gap-2 text-xs shadow-md tracking-wider" title="Kirim">
// // // // //                             <Send size={14} /> KIRIM USULAN
// // // // //                         </button>
// // // // //                     </div>
// // // // //                 </form>

// // // // //                 {showConfirm && (
// // // // //                     <div className="absolute inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-lg animate-in fade-in">
// // // // //                         <div className="bg-white w-[300px] p-5 rounded-2xl shadow-2xl text-center space-y-3 animate-in zoom-in-95 border border-gray-200">
// // // // //                             <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto text-blue-600 shadow-inner"><Info size={24}/></div>
// // // // //                             <h4 className="text-base font-black text-gray-900">Konfirmasi</h4>
// // // // //                             <p className="text-xs text-gray-500 leading-snug">Usulan dikirim ke <b>Admin {scope === 'nasional' ? 'Pusat' : 'Wilayah'}</b>.</p>
// // // // //                             <div className="flex gap-2 pt-2">
// // // // //                                 <button onClick={() => setShowConfirm(false)} className="flex-1 py-2 border rounded-lg text-xs font-bold text-gray-500" title="Batal">Batal</button>
// // // // //                                 <button onClick={handleFinalSubmit} disabled={loading} className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold flex justify-center items-center gap-1" title="Ya">
// // // // //                                     {loading ? <Loader2 size={12} className="animate-spin"/> : <CheckCircle2 size={12}/>} Ya, Kirim
// // // // //                                 </button>
// // // // //                             </div>
// // // // //                         </div>
// // // // //                     </div>
// // // // //                 )}
// // // // //             </div>
// // // // //         </BaseModal>
// // // // //     );
// // // // // }


// // // // 'use client';

// // // // import { useState, useRef, useEffect } from 'react';
// // // // import { X, Send, FileText, Upload, Loader2, CheckCircle2, MapPin, Building, User, Info, Trash2, AlertCircle } from 'lucide-react';
// // // // import { api } from '@/lib/api'; 
// // // // import { getProvinces, getRegencies } from '@/lib/indonesia';
// // // // import BaseModal from '@/components/ui/BaseModal';
// // // // import axios from 'axios';

// // // // // Ensure this matches your backend port
// // // // const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// // // // interface CourseProposalModalProps {
// // // //     onClose: () => void;
// // // //     onSuccess: () => void;
// // // //     currentUser: any;
// // // // }

// // // // export default function CourseProposalModal({ onClose, onSuccess, currentUser }: CourseProposalModalProps) {
// // // //     // --- STATE DATA ---
// // // //     const [title, setTitle] = useState('');
// // // //     const [reason, setReason] = useState('');
// // // //     const [programType, setProgramType] = useState<'training' | 'course'>('training');
    
// // // //     // --- STATE LOCATION ---
// // // //     const [scope, setScope] = useState<'nasional' | 'provinsi' | 'kota'>('nasional');
// // // //     const [selectedProvId, setSelectedProvId] = useState('');
// // // //     const [selectedCityId, setSelectedCityId] = useState('');
// // // //     const [provinces, setProvinces] = useState<any[]>([]);
// // // //     const [regencies, setRegencies] = useState<any[]>([]);
// // // //     const [isProvLocked, setIsProvLocked] = useState(false);

// // // //     // --- STATE DOCUMENTS ---
// // // //     // Using string[] to ensure names like "Kerangka Acuan Kerja" appear correctly
// // // //     const [requiredDocs, setRequiredDocs] = useState<string[]>([]);
// // // //     const [courseDocs, setCourseDocs] = useState<string[]>([]);
    
// // // //     // Key = Document Name (String)
// // // //     const [uploadedFiles, setUploadedFiles] = useState<Record<string, { url: string, originalName: string }>>({});
    
// // // //     // --- UI STATES ---
// // // //     const [loading, setLoading] = useState(false);
// // // //     const [configLoading, setConfigLoading] = useState(true);
// // // //     const [uploadingItem, setUploadingItem] = useState<string | null>(null);
// // // //     const [showConfirm, setShowConfirm] = useState(false); 

// // // //     // --- REFS ---
// // // //     const fileInputRef = useRef<HTMLInputElement>(null);
// // // //     const [activeDocName, setActiveDocName] = useState<string | null>(null);

// // // //     // --- 1. LOAD DATA & LOCK LOCATION ---
// // // //     useEffect(() => {
// // // //         const provData = getProvinces();
// // // //         setProvinces(provData);
        
// // // //         // A. FETCH CMS CONFIG
// // // //         const fetchConfig = async () => {
// // // //             try {
// // // //                 const res = await api('/api/content').catch(() => ({}));
// // // //                 setRequiredDocs(res.trainingRequirements || ['Kerangka Acuan Kerja (KAK)', 'Rencana Anggaran Biaya (RAB)']);
// // // //                 setCourseDocs(res.courseRequirements || ['Silabus Ringkas']);
// // // //             } catch (e) {
// // // //                 console.error("Gagal load config", e);
// // // //                 setRequiredDocs(['Kerangka Acuan Kerja (KAK)', 'Rencana Anggaran Biaya (RAB)']);
// // // //                 setCourseDocs(['Silabus Ringkas']);
// // // //             } finally { 
// // // //                 setConfigLoading(false); 
// // // //             }
// // // //         };
// // // //         fetchConfig();

// // // //         // B. LOCK LOCATION LOGIC
// // // //         if (currentUser) {
// // // //             // Check for various property names for flexibility
// // // //             const userProvIdentifier = currentUser.provinceId || currentUser.province || currentUser.wilayah;
// // // //             const userCityIdentifier = currentUser.cityId || currentUser.city || currentUser.kota;

// // // //             if (userProvIdentifier) {
// // // //                 // Find Province by Code OR Name (Case Insensitive)
// // // //                 const foundProv = provData.find((p: any) => 
// // // //                     p.code === userProvIdentifier || 
// // // //                     p.name.toLowerCase() === String(userProvIdentifier).toLowerCase()
// // // //                 );
                
// // // //                 if (foundProv) {
// // // //                     setScope('provinsi');
// // // //                     setSelectedProvId(foundProv.code);
// // // //                     setIsProvLocked(true); // Lock the province dropdown

// // // //                     // If user also has city data
// // // //                     if (userCityIdentifier) {
// // // //                         setScope('kota');
// // // //                         const regs = getRegencies(foundProv.code);
// // // //                         setRegencies(regs);
                        
// // // //                         const foundCity = regs.find((c: any) => 
// // // //                             c.code === userCityIdentifier || 
// // // //                             c.name.toLowerCase() === String(userCityIdentifier).toLowerCase()
// // // //                         );
// // // //                         if (foundCity) setSelectedCityId(foundCity.code);
// // // //                     }
// // // //                 }
// // // //             }
// // // //         }
// // // //     }, [currentUser]);

// // // //     // Update regencies if province changes manually (and not locked)
// // // //     useEffect(() => {
// // // //         if (selectedProvId) {
// // // //             // Only update regencies if not already set by lock logic
// // // //             if (regencies.length === 0 || !isProvLocked) {
// // // //                 setRegencies(getRegencies(selectedProvId));
// // // //             }
// // // //             if (!isProvLocked) setSelectedCityId(''); 
// // // //         } else {
// // // //             setRegencies([]);
// // // //         }
// // // //     }, [selectedProvId, isProvLocked]);

// // // //     // --- 2. UPLOAD LOGIC (EXACT REPLICA OF UPLOADTEST.TSX) ---
// // // //     const triggerUpload = (docName: string) => {
// // // //         setActiveDocName(docName);
// // // //         if (fileInputRef.current) {
// // // //             fileInputRef.current.value = '';
// // // //             fileInputRef.current.click();
// // // //         }
// // // //     };

// // // //     const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // //         const file = e.target.files?.[0];
// // // //         const docName = activeDocName; // Capture active doc name
        
// // // //         if (!file || !docName) return;
        
// // // //         setUploadingItem(docName);
        
// // // //         // 1. ROBUST TOKEN RETRIEVAL
// // // //         // Matches exactly how your working UploadTest likely does it
// // // //         let token = '';
// // // //         if (typeof window !== 'undefined') {
// // // //             const userStr = localStorage.getItem('user');
// // // //             if (userStr) {
// // // //                 try {
// // // //                     const userData = JSON.parse(userStr);
// // // //                     token = userData.token;
// // // //                 } catch (err) { console.error("Error parsing user token", err); }
// // // //             }
            
// // // //             // Fallback: try direct token key if user key fails
// // // //             if (!token) {
// // // //                 token = localStorage.getItem('token') || '';
// // // //             }
// // // //         }

// // // //         if (!token) {
// // // //             alert("Sesi habis. Silakan login ulang.");
// // // //             setUploadingItem(null);
// // // //             return;
// // // //         }

// // // //         const fd = new FormData();
// // // //         fd.append('file', file);

// // // //         try {
// // // //             // 2. POST AXIOS TO PORT 4000
// // // //             const response = await axios.post(`${API_BASE_URL}/api/materials/upload`, fd, {
// // // //                 headers: { 
// // // //                     'Content-Type': 'multipart/form-data', 
// // // //                     'Authorization': `Bearer ${token}` 
// // // //                 },
// // // //                 // withCredentials: true // Uncomment if your backend relies on cookies
// // // //             });

// // // //             // 3. PARSE RESPONSE
// // // //             const result = response.data;
// // // //             const fileUrl = result.data?.url || result.url;
// // // //             const fileName = result.data?.originalName || result.originalName || file.name;

// // // //             if (fileUrl) {
// // // //                 setUploadedFiles(prev => ({
// // // //                     ...prev,
// // // //                     [docName]: { url: fileUrl, originalName: fileName }
// // // //                 }));
// // // //                 // alert(`✅ Berhasil: ${fileName}`); // Optional success message
// // // //             } else {
// // // //                 console.error("API Response:", result);
// // // //                 throw new Error("URL tidak ditemukan di respon server.");
// // // //             }
// // // //         } catch (err: any) {
// // // //             console.error("Upload Error:", err);
// // // //             const errMsg = err.response?.data?.message || err.message || "Gagal upload file";
// // // //             alert("Gagal Upload: " + errMsg);
// // // //         } finally {
// // // //             setUploadingItem(null);
// // // //             setActiveDocName(null);
// // // //             if (fileInputRef.current) fileInputRef.current.value = ''; 
// // // //         }
// // // //     };

// // // //     const removeFile = (docName: string) => {
// // // //         if(!confirm("Hapus file ini?")) return;
// // // //         const newFiles = { ...uploadedFiles };
// // // //         delete newFiles[docName];
// // // //         setUploadedFiles(newFiles);
// // // //     };

// // // //     // --- 3. SUBMIT LOGIC ---
// // // //     const activeRequirements = programType === 'training' ? requiredDocs : courseDocs;

// // // //     const handlePreSubmit = (e: React.FormEvent) => {
// // // //         e.preventDefault();
// // // //         if (!title.trim()) return alert("Judul usulan wajib diisi!");
        
// // // //         const missingDocs = activeRequirements.filter(doc => !uploadedFiles[doc]);
// // // //         if (missingDocs.length > 0) {
// // // //             return alert(`Mohon lengkapi dokumen wajib berikut:\n- ${missingDocs.join('\n- ')}`);
// // // //         }

// // // //         if (scope === 'provinsi' && !selectedProvId) return alert("Pilih Provinsi tujuan.");
// // // //         if (scope === 'kota' && (!selectedProvId || !selectedCityId)) return alert("Pilih Provinsi dan Kota tujuan.");
        
// // // //         setShowConfirm(true);
// // // //     };

// // // //     const handleFinalSubmit = async () => {
// // // //         setLoading(true);
// // // //         try {
// // // //             let organizer = 'PMI Pusat';
// // // //             // Determine Organizer Name based on Scope
// // // //             if (scope === 'provinsi') {
// // // //                 const provName = provinces.find(p => p.code === selectedProvId)?.name || selectedProvId;
// // // //                 organizer = `PMI Provinsi: ${provName}`;
// // // //             } else if (scope === 'kota') {
// // // //                 const provName = provinces.find(p => p.code === selectedProvId)?.name || selectedProvId;
// // // //                 const cityName = regencies.find(r => r.code === selectedCityId)?.name || selectedCityId;
// // // //                 organizer = `PMI Kabupaten/Kota: ${cityName}, ${provName}`;
// // // //             }

// // // //             // Format Documents for DB
// // // //             const proposalDocuments = Object.entries(uploadedFiles).map(([name, data]) => ({
// // // //                 name: name, // Document Label (e.g. "KAK")
// // // //                 originalName: data.originalName, // Original Filename
// // // //                 url: data.url,
// // // //                 type: 'document',
// // // //                 label: name
// // // //             }));

// // // //             const payload = {
// // // //                 title, programType, description: reason, status: 'proposed',
// // // //                 proposalDocuments: proposalDocuments, 
// // // //                 organizer,
// // // //                 creatorInfo: { 
// // // //                     id: currentUser?._id || currentUser?.id, 
// // // //                     name: currentUser?.name, 
// // // //                     email: currentUser?.email, 
// // // //                     role: currentUser?.role 
// // // //                 },
// // // //                 isPublished: false, isInfoCompleted: false
// // // //             };

// // // //             await api('/api/courses', { method: 'POST', body: payload });
// // // //             alert("✅ Pengajuan berhasil dikirim!");
// // // //             onSuccess(); 
// // // //             onClose();
// // // //         } catch (err: any) { 
// // // //             alert("Gagal mengirim: " + err.message); 
// // // //             setLoading(false); 
// // // //             setShowConfirm(false); 
// // // //         }
// // // //     };

// // // //     return (
// // // //         <BaseModal isOpen={true} onClose={onClose} title="Pengajuan Pelatihan Baru" size="full">
// // // //             <div className="max-w-7xl mx-auto h-full flex flex-col justify-center px-2 relative">
                
// // // //                 {/* GLOBAL HIDDEN FILE INPUT */}
// // // //                 <input 
// // // //                     type="file" 
// // // //                     ref={fileInputRef} 
// // // //                     onChange={handleFileChange} 
// // // //                     className="hidden" 
// // // //                     accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.png" 
// // // //                     title="File Upload Input"
// // // //                     aria-label="File Upload Input"
// // // //                 />

// // // //                 <form onSubmit={handlePreSubmit} className="pb-1">
// // // //                     {/* 3-COLUMN COMPACT LAYOUT */}
// // // //                     <div className="grid grid-cols-12 gap-5 items-stretch">
                        
// // // //                         {/* COLUMN 1: BASIC INFO */}
// // // //                         <div className="col-span-4 flex flex-col gap-4">
// // // //                             <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl flex items-center justify-between shadow-sm">
// // // //                                 <div className="flex items-center gap-2">
// // // //                                     <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">{currentUser?.name?.charAt(0)}</div>
// // // //                                     <div><p className="text-[10px] font-bold text-blue-600 uppercase">PENGAJU</p><p className="text-xs font-bold text-gray-800 leading-tight">{currentUser?.name}</p></div>
// // // //                                 </div>
// // // //                                 <div className="text-[10px] text-gray-500 bg-white px-2 py-1 rounded border border-blue-200">{currentUser?.role}</div>
// // // //                             </div>

// // // //                             <div>
// // // //                                 <label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block" htmlFor="inpTitle">JUDUL USULAN *</label>
// // // //                                 <input id="inpTitle" type="text" className="w-full p-2.5 border border-gray-300 rounded-lg text-sm font-bold focus:ring-1 focus:ring-red-500 outline-none shadow-sm" placeholder="Contoh: Diklat Manajemen..." value={title} onChange={e => setTitle(e.target.value)} title="Judul" />
// // // //                             </div>

// // // //                             <div className="bg-white rounded-lg border border-gray-200 p-2">
// // // //                                 <label className="text-[10px] font-bold text-gray-500 uppercase mb-2 block px-1">JENIS PROGRAM</label>
// // // //                                 <div className="grid grid-cols-2 gap-2">
// // // //                                     <button type="button" onClick={() => setProgramType('training')} className={`py-2 rounded-md border text-xs font-bold flex items-center justify-center gap-1 ${programType === 'training' ? 'border-red-600 bg-red-50 text-red-700' : 'bg-gray-50 text-gray-500'}`} title="Diklat"><Building size={14}/> DIKLAT</button>
// // // //                                     <button type="button" onClick={() => setProgramType('course')} className={`py-2 rounded-md border text-xs font-bold flex items-center justify-center gap-1 ${programType === 'course' ? 'border-red-600 bg-red-50 text-red-700' : 'bg-gray-50 text-gray-500'}`} title="Kursus"><User size={14}/> KURSUS</button>
// // // //                                 </div>
// // // //                             </div>
// // // //                         </div>

// // // //                         {/* COLUMN 2: LOCATION & REASON */}
// // // //                         <div className="col-span-4 flex flex-col gap-4">
// // // //                             <div className="bg-orange-50/50 border border-orange-200 p-3 rounded-xl shadow-sm flex-1 flex flex-col">
// // // //                                 <label className="text-[10px] font-bold text-orange-800 uppercase mb-2 flex items-center gap-1"><MapPin size={12}/> PELAKSANA (ADMIN APPROVAL)</label>
// // // //                                 <div className="flex gap-2 mb-2">
// // // //                                     {['nasional', 'provinsi', 'kota'].map((s) => (
// // // //                                         <label key={s} className={`flex items-center gap-1 cursor-pointer bg-white px-2 py-1 rounded border shadow-sm ${scope === s ? 'border-orange-400 ring-1 ring-orange-200' : 'border-orange-100'} ${(isProvLocked && s !== scope && s !== 'kota' && scope !== 'kota') ? 'opacity-50 cursor-not-allowed' : ''}`}>
// // // //                                             <input 
// // // //                                                 type="radio" 
// // // //                                                 checked={scope === s} 
// // // //                                                 onChange={() => !isProvLocked && setScope(s as any)} 
// // // //                                                 className="w-3 h-3 accent-red-600" 
// // // //                                                 title={s}
// // // //                                                 disabled={isProvLocked && s !== scope && !(scope === 'provinsi' && s === 'kota')}
// // // //                                             />
// // // //                                             <span className="text-[10px] font-bold capitalize text-gray-700">{s}</span>
// // // //                                         </label>
// // // //                                     ))}
// // // //                                 </div>
// // // //                                 <div className="space-y-2 mt-auto">
// // // //                                     {scope !== 'nasional' && (
// // // //                                         <select 
// // // //                                             className={`w-full p-2 border border-orange-200 rounded text-xs bg-white ${isProvLocked ? 'bg-gray-100 text-gray-600 font-bold' : ''}`} 
// // // //                                             value={selectedProvId} 
// // // //                                             onChange={e => setSelectedProvId(e.target.value)} 
// // // //                                             title="Pilih Provinsi"
// // // //                                             disabled={isProvLocked}
// // // //                                         >
// // // //                                             <option value="">- Pilih Provinsi -</option>
// // // //                                             {provinces.map(p => <option key={p.code} value={p.code}>{p.name}</option>)}
// // // //                                         </select>
// // // //                                     )}
// // // //                                     {scope === 'kota' && (
// // // //                                         <select className="w-full p-2 border border-orange-200 rounded text-xs bg-white" value={selectedCityId} onChange={e => setSelectedCityId(e.target.value)} disabled={!selectedProvId} title="Pilih Kota">
// // // //                                             <option value="">- Pilih Kota -</option>
// // // //                                             {regencies.map(r => <option key={r.code} value={r.code}>{r.name}</option>)}
// // // //                                         </select>
// // // //                                     )}
// // // //                                 </div>
// // // //                             </div>

// // // //                             <div>
// // // //                                 <label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block" htmlFor="rsnInp">ALASAN / URGENSI</label>
// // // //                                 <textarea id="rsnInp" className="w-full p-2.5 border border-gray-300 rounded-lg text-xs h-20 resize-none focus:ring-1 focus:ring-red-500 outline-none" placeholder="Jelaskan urgensi..." value={reason} onChange={e => setReason(e.target.value)} title="Alasan" />
// // // //                             </div>
// // // //                         </div>

// // // //                         {/* COLUMN 3: DOCUMENTS (STRING ARRAY - FROM CMS) */}
// // // //                         <div className="col-span-4 flex flex-col h-full bg-gray-50 border border-gray-200 rounded-xl p-3 shadow-inner">
// // // //                             <div className="flex justify-between mb-2">
// // // //                                 <label className="text-[10px] font-bold text-gray-600 uppercase">DOKUMEN WAJIB</label>
// // // //                                 <span className="bg-gray-200 px-1.5 rounded text-[10px] font-bold text-gray-600">{activeRequirements.length}</span>
// // // //                             </div>
                            
// // // //                             <div className="space-y-2 overflow-y-auto max-h-[300px] custom-scrollbar pr-1 flex-1">
// // // //                                 {configLoading ? (
// // // //                                     <div className="text-center text-xs text-gray-400 py-4"><Loader2 className="animate-spin inline mr-1"/> Memuat Syarat...</div>
// // // //                                 ) : (
// // // //                                     activeRequirements.map((docName, idx) => (
// // // //                                         <div key={idx} className={`p-2 rounded border transition-all ${uploadedFiles[docName] ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200 shadow-sm'}`}>
// // // //                                             <div className="flex justify-between items-center mb-1">
// // // //                                                 <span className="text-[10px] font-bold text-gray-700 flex items-center gap-1">
// // // //                                                     {uploadedFiles[docName] ? <CheckCircle2 size={12} className="text-green-600"/> : <AlertCircle size={12} className="text-orange-500"/>}
// // // //                                                     {docName} <span className="text-red-500">*</span>
// // // //                                                 </span>
// // // //                                             </div>

// // // //                                             {uploadedFiles[docName] ? (
// // // //                                                 // UPLOAD SUCCESS STATE
// // // //                                                 <div className="flex items-center gap-2 bg-white p-1.5 rounded border border-green-200 mt-1">
// // // //                                                     <FileText size={14} className="text-green-600"/>
// // // //                                                     <span className="text-[9px] font-bold text-green-700 flex-1 truncate" title={uploadedFiles[docName].originalName}>
// // // //                                                         {uploadedFiles[docName].originalName}
// // // //                                                     </span>
// // // //                                                     <button type="button" onClick={() => removeFile(docName)} className="text-red-400 hover:text-red-600 p-1 bg-red-50 rounded" title="Hapus">
// // // //                                                         <Trash2 size={12}/>
// // // //                                                     </button>
// // // //                                                 </div>
// // // //                                             ) : (
// // // //                                                 // UPLOAD BUTTON STATE
// // // //                                                 <button 
// // // //                                                     type="button" 
// // // //                                                     onClick={() => triggerUpload(docName)}
// // // //                                                     disabled={uploadingItem === docName}
// // // //                                                     className="w-full flex items-center justify-center gap-2 py-1.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded text-blue-600 transition-colors mt-1"
// // // //                                                 >
// // // //                                                     {uploadingItem === docName ? <Loader2 className="animate-spin" size={14}/> : <Upload size={14}/>}
// // // //                                                     <span className="text-[10px] font-bold">Upload File</span>
// // // //                                                 </button>
// // // //                                             )}
// // // //                                         </div>
// // // //                                     ))
// // // //                                 )}
// // // //                                 {activeRequirements.length === 0 && <p className="text-center text-xs text-gray-400 italic py-4">Tidak ada dokumen wajib.</p>}
// // // //                             </div>
// // // //                         </div>
// // // //                     </div>

// // // //                     <div className="flex gap-3 pt-4 mt-2 border-t border-gray-100">
// // // //                         <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-gray-300 rounded-lg font-bold text-gray-600 hover:bg-gray-50 text-xs" title="Batal">Batal</button>
// // // //                         <button type="submit" className="flex-[3] py-2.5 bg-[#990000] text-white rounded-lg font-bold hover:bg-[#7f0000] flex items-center justify-center gap-2 text-xs shadow-md tracking-wider" title="Kirim">
// // // //                             <Send size={14} /> KIRIM USULAN
// // // //                         </button>
// // // //                     </div>
// // // //                 </form>

// // // //                {/* --- POPUP KONFIRMASI (FIXED Z-INDEX & POSITION) --- */}
// // // //                 {showConfirm && (
// // // //                     // Gunakan z-[9999] agar pasti di atas BaseModal
// // // //                     // Gunakan fixed inset-0 agar menutupi seluruh viewport browser, bukan hanya container modal
// // // //                     <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                        
// // // //                         {/* Kotak Popup */}
// // // //                         <div className="bg-white w-[320px] p-6 rounded-2xl shadow-2xl text-center space-y-4 animate-in zoom-in-95 border border-gray-200 relative">
                            
// // // //                             {/* Ikon */}
// // // //                             <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto text-blue-600 shadow-inner mb-2">
// // // //                                 <Info size={28}/>
// // // //                             </div>
                            
// // // //                             {/* Teks */}
// // // //                             <div>
// // // //                                 <h4 className="text-lg font-black text-gray-900 mb-1">Konfirmasi</h4>
// // // //                                 <p className="text-xs text-gray-500 leading-relaxed px-2">
// // // //                                     Usulan akan dikirim ke <b>Admin {scope === 'nasional' ? 'Pusat' : 'Wilayah'}</b>.<br/>
// // // //                                     Pastikan data sudah benar.
// // // //                                 </p>
// // // //                             </div>
                            
// // // //                             {/* Tombol Aksi */}
// // // //                             <div className="flex gap-3 pt-2">
// // // //                                 <button 
// // // //                                     type="button" 
// // // //                                     onClick={() => setShowConfirm(false)} 
// // // //                                     className="flex-1 py-2.5 border border-gray-300 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-gray-200 outline-none" 
// // // //                                     title="Batal"
// // // //                                 >
// // // //                                     Batal
// // // //                                 </button>
// // // //                                 <button 
// // // //                                     type="button" 
// // // //                                     onClick={handleFinalSubmit} 
// // // //                                     disabled={loading} 
// // // //                                     className="flex-[1.5] py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 flex justify-center items-center gap-2 shadow-md transition-colors focus:ring-2 focus:ring-blue-400 outline-none disabled:opacity-70 disabled:cursor-not-allowed" 
// // // //                                     title="Ya, Kirim"
// // // //                                 >
// // // //                                     {loading ? <Loader2 size={14} className="animate-spin"/> : <CheckCircle2 size={14}/>} 
// // // //                                     {loading ? 'Mengirim...' : 'Ya, Kirim'}
// // // //                                 </button>
// // // //                             </div>
// // // //                         </div>
// // // //                     </div>
// // // //                 )}
// // // //             </div>
// // // //         </BaseModal>
// // // //     );
// // // // }



// // // 'use client';

// // // import { useState, useRef, useEffect } from 'react';
// // // import { X, Send, FileText, Upload, Loader2, CheckCircle2, MapPin, Building, User, Info, Trash2, AlertCircle } from 'lucide-react';
// // // import { api } from '@/lib/api'; 
// // // import { getProvinces, getRegencies } from '@/lib/indonesia';
// // // import BaseModal from '@/components/ui/BaseModal';
// // // import axios from 'axios';

// // // // PORT 4000 (Sesuai UploadTest)
// // // const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// // // interface CourseProposalModalProps {
// // //     onClose: () => void;
// // //     onSuccess: () => void;
// // //     currentUser: any;
// // // }

// // // export default function CourseProposalModal({ onClose, onSuccess, currentUser }: CourseProposalModalProps) {
// // //     // --- STATE DATA ---
// // //     const [title, setTitle] = useState('');
// // //     const [reason, setReason] = useState('');
// // //     const [programType, setProgramType] = useState<'training' | 'course'>('training');
    
// // //     // --- STATE WILAYAH ---
// // //     const [scope, setScope] = useState<'nasional' | 'provinsi' | 'kota'>('nasional');
// // //     const [selectedProvId, setSelectedProvId] = useState('');
// // //     const [selectedCityId, setSelectedCityId] = useState('');
// // //     const [provinces, setProvinces] = useState<any[]>([]);
// // //     const [regencies, setRegencies] = useState<any[]>([]);
// // //     const [isProvLocked, setIsProvLocked] = useState(false);

// // //     // --- STATE DOKUMEN ---
// // //     const [requiredDocs, setRequiredDocs] = useState<string[]>([]);
// // //     const [courseDocs, setCourseDocs] = useState<string[]>([]);
    
// // //     // Key = Nama Dokumen (String)
// // //     const [uploadedFiles, setUploadedFiles] = useState<Record<string, { url: string, originalName: string }>>({});
    
// // //     // --- UI STATES ---
// // //     const [loading, setLoading] = useState(false);
// // //     const [configLoading, setConfigLoading] = useState(true);
// // //     const [uploadingItem, setUploadingItem] = useState<string | null>(null);
// // //     const [showConfirm, setShowConfirm] = useState(false); 

// // //     // --- REFS ---
// // //     // Gunakan nullable ref untuk menghindari error read-only assignment
// // //     const fileInputRef = useRef<HTMLInputElement | null>(null);
// // //     const [activeDocName, setActiveDocName] = useState<string | null>(null);

// // //     // --- 1. LOAD DATA & LOCK LOCATION ---
// // //     useEffect(() => {
// // //         const provData = getProvinces();
// // //         setProvinces(provData);
        
// // //         // A. FETCH CMS CONFIG
// // //         const fetchConfig = async () => {
// // //             try {
// // //                 const res = await api('/api/content').catch(() => ({}));
// // //                 setRequiredDocs(res.trainingRequirements || ['Kerangka Acuan Kerja (KAK)', 'Rencana Anggaran Biaya (RAB)']);
// // //                 setCourseDocs(res.courseRequirements || ['Silabus Ringkas']);
// // //             } catch (e) {
// // //                 console.error("Gagal load config", e);
// // //                 setRequiredDocs(['Kerangka Acuan Kerja (KAK)', 'Rencana Anggaran Biaya (RAB)']);
// // //                 setCourseDocs(['Silabus Ringkas']);
// // //             } finally { 
// // //                 setConfigLoading(false); 
// // //             }
// // //         };
// // //         fetchConfig();

// // //         // B. LOCK LOCATION LOGIC
// // //         if (currentUser) {
// // //             const userProvIdentifier = currentUser.provinceId || currentUser.province || currentUser.wilayah;
// // //             const userCityIdentifier = currentUser.cityId || currentUser.city || currentUser.kota;

// // //             if (userProvIdentifier) {
// // //                 const foundProv = provData.find((p: any) => 
// // //                     p.code === userProvIdentifier || 
// // //                     p.name.toLowerCase() === String(userProvIdentifier).toLowerCase()
// // //                 );
                
// // //                 if (foundProv) {
// // //                     setScope('provinsi');
// // //                     setSelectedProvId(foundProv.code);
// // //                     setIsProvLocked(true); 

// // //                     if (userCityIdentifier) {
// // //                         setScope('kota');
// // //                         const regs = getRegencies(foundProv.code);
// // //                         setRegencies(regs);
                        
// // //                         const foundCity = regs.find((c: any) => 
// // //                             c.code === userCityIdentifier || 
// // //                             c.name.toLowerCase() === String(userCityIdentifier).toLowerCase()
// // //                         );
// // //                         if (foundCity) setSelectedCityId(foundCity.code);
// // //                     }
// // //                 }
// // //             }
// // //         }
// // //     }, [currentUser]);

// // //     useEffect(() => {
// // //         if (selectedProvId) {
// // //             if (regencies.length === 0 || !isProvLocked) {
// // //                 setRegencies(getRegencies(selectedProvId));
// // //             }
// // //             if (!isProvLocked) setSelectedCityId(''); 
// // //         } else {
// // //             setRegencies([]);
// // //         }
// // //     }, [selectedProvId, isProvLocked]);

// // //     // --- 2. UPLOAD LOGIC (DIPERBAIKI: DEFINISI FUNGSI HARUS ADA DI SINI) ---
    
// // //     // Fungsi handler input change
// // //     const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // //         const file = e.target.files?.[0];
// // //         const docName = activeDocName; 
        
// // //         if (!file || !docName) return;
        
// // //         setUploadingItem(docName);
        
// // //         // 1. ROBUST TOKEN RETRIEVAL
// // //         let token = '';
// // //         if (typeof window !== 'undefined') {
// // //             const userStr = localStorage.getItem('user');
// // //             if (userStr) {
// // //                 try {
// // //                     const userData = JSON.parse(userStr);
// // //                     token = userData.token;
// // //                 } catch (err) { console.error("Error parsing user token", err); }
// // //             }
// // //             if (!token) token = localStorage.getItem('token') || '';
// // //         }

// // //         if (!token) {
// // //             alert("Sesi habis. Silakan login ulang.");
// // //             setUploadingItem(null);
// // //             return;
// // //         }

// // //         const fd = new FormData();
// // //         fd.append('file', file);

// // //         try {
// // //             // 2. POST AXIOS TO PORT 4000
// // //             const response = await axios.post(`${API_BASE_URL}/api/materials/upload`, fd, {
// // //                 headers: { 
// // //                     'Content-Type': 'multipart/form-data', 
// // //                     'Authorization': `Bearer ${token}` 
// // //                 },
// // //             });

// // //             // 3. PARSE RESPONSE
// // //             const result = response.data;
// // //             const fileUrl = result.data?.url || result.url;
// // //             const fileName = result.data?.originalName || result.originalName || file.name;

// // //             if (fileUrl) {
// // //                 setUploadedFiles(prev => ({
// // //                     ...prev,
// // //                     [docName]: { url: fileUrl, originalName: fileName }
// // //                 }));
// // //             } else {
// // //                 throw new Error("URL tidak ditemukan di respon server.");
// // //             }
// // //         } catch (err: any) {
// // //             console.error("Upload Error:", err);
// // //             const errMsg = err.response?.data?.message || err.message || "Gagal upload file";
// // //             alert("Gagal Upload: " + errMsg);
// // //         } finally {
// // //             setUploadingItem(null);
// // //             setActiveDocName(null);
// // //             // Reset input value agar bisa pilih file yang sama lagi
// // //             if (fileInputRef.current) fileInputRef.current.value = ''; 
// // //         }
// // //     };

// // //     // Fungsi trigger klik input hidden
// // //     const triggerUpload = (docName: string) => {
// // //         setActiveDocName(docName);
// // //         if (fileInputRef.current) {
// // //             fileInputRef.current.value = '';
// // //             fileInputRef.current.click();
// // //         }
// // //     };

// // //     const removeFile = (docName: string) => {
// // //         if(!confirm("Hapus file ini?")) return;
// // //         const newFiles = { ...uploadedFiles };
// // //         delete newFiles[docName];
// // //         setUploadedFiles(newFiles);
// // //     };

// // //     // --- 3. SUBMIT LOGIC ---
// // //     const activeRequirements = programType === 'training' ? requiredDocs : courseDocs;

// // //     const handlePreSubmit = (e: React.FormEvent) => {
// // //         e.preventDefault();
// // //         if (!title.trim()) return alert("Judul usulan wajib diisi!");
        
// // //         const missingDocs = activeRequirements.filter(doc => !uploadedFiles[doc]);
// // //         if (missingDocs.length > 0) {
// // //             return alert(`Mohon lengkapi dokumen wajib berikut:\n- ${missingDocs.join('\n- ')}`);
// // //         }

// // //         if (scope === 'provinsi' && !selectedProvId) return alert("Pilih Provinsi tujuan.");
// // //         if (scope === 'kota' && (!selectedProvId || !selectedCityId)) return alert("Pilih Provinsi dan Kota tujuan.");
        
// // //         setShowConfirm(true);
// // //     };

// // //     const handleFinalSubmit = async () => {
// // //         setLoading(true);
// // //         try {
// // //             let organizer = 'PMI Pusat';
// // //             if (scope === 'provinsi') {
// // //                 const provName = provinces.find(p => p.code === selectedProvId)?.name || selectedProvId;
// // //                 organizer = `PMI Provinsi: ${provName}`;
// // //             } else if (scope === 'kota') {
// // //                 const provName = provinces.find(p => p.code === selectedProvId)?.name || selectedProvId;
// // //                 const cityName = regencies.find(r => r.code === selectedCityId)?.name || selectedCityId;
// // //                 organizer = `PMI Kabupaten/Kota: ${cityName}, ${provName}`;
// // //             }

// // //             const proposalDocuments = Object.entries(uploadedFiles).map(([name, data]) => ({
// // //                 name: name,
// // //                 originalName: data.originalName,
// // //                 url: data.url,
// // //                 type: 'document',
// // //                 label: name
// // //             }));

// // //             const payload = {
// // //                 title, programType, description: reason, status: 'proposed',
// // //                 proposalDocuments: proposalDocuments, 
// // //                 organizer,
// // //                 creatorInfo: { 
// // //                     id: currentUser?._id || currentUser?.id, 
// // //                     name: currentUser?.name, 
// // //                     email: currentUser?.email, 
// // //                     role: currentUser?.role 
// // //                 },
// // //                 isPublished: false, isInfoCompleted: false
// // //             };

// // //             await api('/api/courses', { method: 'POST', body: payload });
// // //             alert("✅ Pengajuan berhasil dikirim!");
// // //             onSuccess(); 
// // //             onClose();
// // //         } catch (err: any) { 
// // //             alert("Gagal mengirim: " + err.message); 
// // //             setLoading(false); 
// // //             setShowConfirm(false); 
// // //         }
// // //     };

// // //     return (
// // //         <BaseModal isOpen={true} onClose={onClose} title="Pengajuan Pelatihan Baru" size="full">
// // //             <div className="max-w-7xl mx-auto h-full flex flex-col justify-center px-2 relative">
                
// // //                 {/* GLOBAL HIDDEN FILE INPUT - FIX AXE ERROR */}
// // //                 <input 
// // //                     type="file" 
// // //                     ref={fileInputRef} 
// // //                     onChange={handleFileChange} 
// // //                     className="hidden" 
// // //                     accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.png" 
// // //                     title="File Upload Input" 
// // //                     aria-label="File Upload Input"
// // //                 />

// // //                 <form onSubmit={handlePreSubmit} className="pb-1">
// // //                     <div className="grid grid-cols-12 gap-5 items-stretch">
                        
// // //                         {/* KOLOM 1: INFO */}
// // //                         <div className="col-span-4 flex flex-col gap-4">
// // //                             <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl flex items-center justify-between shadow-sm">
// // //                                 <div className="flex items-center gap-2">
// // //                                     <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">{currentUser?.name?.charAt(0)}</div>
// // //                                     <div><p className="text-[10px] font-bold text-blue-600 uppercase">PENGAJU</p><p className="text-xs font-bold text-gray-800 leading-tight">{currentUser?.name}</p></div>
// // //                                 </div>
// // //                                 <div className="text-[10px] text-gray-500 bg-white px-2 py-1 rounded border border-blue-200">{currentUser?.role}</div>
// // //                             </div>

// // //                             <div>
// // //                                 <label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block" htmlFor="inpTitle">JUDUL USULAN *</label>
// // //                                 <input id="inpTitle" type="text" className="w-full p-2.5 border border-gray-300 rounded-lg text-sm font-bold focus:ring-1 focus:ring-red-500 outline-none shadow-sm" placeholder="Contoh: Diklat Manajemen..." value={title} onChange={e => setTitle(e.target.value)} title="Judul Usulan" />
// // //                             </div>

// // //                             <div className="bg-white rounded-lg border border-gray-200 p-2">
// // //                                 <label className="text-[10px] font-bold text-gray-500 uppercase mb-2 block px-1">JENIS PROGRAM</label>
// // //                                 <div className="grid grid-cols-2 gap-2">
// // //                                     <button type="button" onClick={() => setProgramType('training')} className={`py-2 rounded-md border text-xs font-bold flex items-center justify-center gap-1 ${programType === 'training' ? 'border-red-600 bg-red-50 text-red-700' : 'bg-gray-50 text-gray-500'}`} title="Pilih Diklat"><Building size={14}/> DIKLAT</button>
// // //                                     <button type="button" onClick={() => setProgramType('course')} className={`py-2 rounded-md border text-xs font-bold flex items-center justify-center gap-1 ${programType === 'course' ? 'border-red-600 bg-red-50 text-red-700' : 'bg-gray-50 text-gray-500'}`} title="Pilih Kursus"><User size={14}/> KURSUS</button>
// // //                                 </div>
// // //                             </div>
// // //                         </div>

// // //                         {/* KOLOM 2: WILAYAH */}
// // //                         <div className="col-span-4 flex flex-col gap-4">
// // //                             <div className="bg-orange-50/50 border border-orange-200 p-3 rounded-xl shadow-sm flex-1 flex flex-col">
// // //                                 <label className="text-[10px] font-bold text-orange-800 uppercase mb-2 flex items-center gap-1"><MapPin size={12}/> PELAKSANA (ADMIN APPROVAL)</label>
// // //                                 <div className="flex gap-2 mb-2">
// // //                                     {['nasional', 'provinsi', 'kota'].map((s) => (
// // //                                         <label key={s} className={`flex items-center gap-1 cursor-pointer bg-white px-2 py-1 rounded border shadow-sm ${scope === s ? 'border-orange-400 ring-1 ring-orange-200' : 'border-orange-100'} ${(isProvLocked && s !== scope && s !== 'kota' && scope !== 'kota') ? 'opacity-50 cursor-not-allowed' : ''}`}>
// // //                                             <input 
// // //                                                 type="radio" 
// // //                                                 checked={scope === s} 
// // //                                                 onChange={() => !isProvLocked && setScope(s as any)} 
// // //                                                 className="w-3 h-3 accent-red-600" 
// // //                                                 title={`Lingkup ${s}`}
// // //                                                 disabled={isProvLocked && s !== scope && !(scope === 'provinsi' && s === 'kota')}
// // //                                             />
// // //                                             <span className="text-[10px] font-bold capitalize text-gray-700">{s}</span>
// // //                                         </label>
// // //                                     ))}
// // //                                 </div>
// // //                                 <div className="space-y-2 mt-auto">
// // //                                     {scope !== 'nasional' && (
// // //                                         <select 
// // //                                             className={`w-full p-2 border border-orange-200 rounded text-xs bg-white ${isProvLocked ? 'bg-gray-100 text-gray-600 font-bold' : ''}`} 
// // //                                             value={selectedProvId} 
// // //                                             onChange={e => setSelectedProvId(e.target.value)} 
// // //                                             title="Pilih Provinsi" 
// // //                                             aria-label="Pilih Provinsi"
// // //                                             disabled={isProvLocked}
// // //                                         >
// // //                                             <option value="">- Pilih Provinsi -</option>
// // //                                             {provinces.map(p => <option key={p.code} value={p.code}>{p.name}</option>)}
// // //                                         </select>
// // //                                     )}
// // //                                     {scope === 'kota' && (
// // //                                         <select 
// // //                                             className="w-full p-2 border border-orange-200 rounded text-xs bg-white" 
// // //                                             value={selectedCityId} 
// // //                                             onChange={e => setSelectedCityId(e.target.value)} 
// // //                                             disabled={!selectedProvId} 
// // //                                             title="Pilih Kota"
// // //                                             aria-label="Pilih Kota"
// // //                                         >
// // //                                             <option value="">- Pilih Kota -</option>
// // //                                             {regencies.map(r => <option key={r.code} value={r.code}>{r.name}</option>)}
// // //                                         </select>
// // //                                     )}
// // //                                 </div>
// // //                             </div>

// // //                             <div>
// // //                                 <label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block" htmlFor="rsnInp">ALASAN / URGENSI</label>
// // //                                 <textarea id="rsnInp" className="w-full p-2.5 border border-gray-300 rounded-lg text-xs h-20 resize-none focus:ring-1 focus:ring-red-500 outline-none" placeholder="Jelaskan urgensi..." value={reason} onChange={e => setReason(e.target.value)} title="Alasan Pengajuan" />
// // //                             </div>
// // //                         </div>

// // //                         {/* KOLOM 3: DOKUMEN WAJIB */}
// // //                         <div className="col-span-4 flex flex-col h-full bg-gray-50 border border-gray-200 rounded-xl p-3 shadow-inner">
// // //                             <label className="text-[10px] font-bold text-gray-600 uppercase mb-2 flex justify-between">
// // //                                 <span>DOKUMEN WAJIB</span>
// // //                                 <span className="bg-gray-200 px-1.5 rounded text-gray-600">{activeRequirements.length}</span>
// // //                             </label>
                            
// // //                             <div className="space-y-2 overflow-y-auto max-h-[300px] custom-scrollbar pr-1 flex-1">
// // //                                 {configLoading ? (
// // //                                     <div className="text-center text-xs text-gray-400 py-4"><Loader2 className="animate-spin inline mr-1"/> Memuat Syarat...</div>
// // //                                 ) : (
// // //                                     activeRequirements.map((docName, idx) => (
// // //                                         <div key={idx} className={`p-2 rounded border transition-all ${uploadedFiles[docName] ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200 shadow-sm'}`}>
// // //                                             <div className="flex justify-between items-center mb-1">
// // //                                                 <span className="text-[10px] font-bold text-gray-700 flex items-center gap-1">
// // //                                                     {uploadedFiles[docName] ? <CheckCircle2 size={12} className="text-green-600"/> : <AlertCircle size={12} className="text-orange-500"/>}
// // //                                                     {docName} <span className="text-red-500">*</span>
// // //                                                 </span>
// // //                                             </div>

// // //                                             {uploadedFiles[docName] ? (
// // //                                                 <div className="flex items-center gap-2 bg-white p-1.5 rounded border border-green-200 mt-1">
// // //                                                     <FileText size={14} className="text-green-600"/>
// // //                                                     <span className="text-[9px] font-bold text-green-700 flex-1 truncate" title={uploadedFiles[docName].originalName}>
// // //                                                         {uploadedFiles[docName].originalName}
// // //                                                     </span>
// // //                                                     <button type="button" onClick={() => removeFile(docName)} className="text-red-400 hover:text-red-600 p-1 bg-red-50 rounded" title="Hapus File" aria-label="Hapus File">
// // //                                                         <Trash2 size={12}/>
// // //                                                     </button>
// // //                                                 </div>
// // //                                             ) : (
// // //                                                 <button 
// // //                                                     type="button" 
// // //                                                     onClick={() => triggerUpload(docName)}
// // //                                                     disabled={uploadingItem === docName}
// // //                                                     className="w-full flex items-center justify-center gap-2 py-1.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded text-blue-600 transition-colors mt-1"
// // //                                                     title={`Upload ${docName}`}
// // //                                                     aria-label={`Upload ${docName}`}
// // //                                                 >
// // //                                                     {uploadingItem === docName ? <Loader2 className="animate-spin" size={14}/> : <Upload size={14}/>}
// // //                                                     <span className="text-[10px] font-bold">Upload File</span>
// // //                                                 </button>
// // //                                             )}
// // //                                         </div>
// // //                                     ))
// // //                                 )}
// // //                                 {activeRequirements.length === 0 && <p className="text-center text-xs text-gray-400 italic py-4">Tidak ada dokumen wajib.</p>}
// // //                             </div>
// // //                         </div>
// // //                     </div>

// // //                     <div className="flex gap-3 pt-4 mt-2 border-t border-gray-100">
// // //                         <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-gray-300 rounded-lg font-bold text-gray-600 hover:bg-gray-50 text-xs" title="Batal" aria-label="Batal">Batal</button>
// // //                         <button type="submit" className="flex-[3] py-2.5 bg-[#990000] text-white rounded-lg font-bold hover:bg-[#7f0000] flex items-center justify-center gap-2 text-xs shadow-md tracking-wider" title="Kirim Usulan" aria-label="Kirim Usulan">
// // //                             <Send size={14} /> KIRIM USULAN
// // //                         </button>
// // //                     </div>
// // //                 </form>

// // //                 {showConfirm && (
// // //                     <div className="absolute inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-lg animate-in fade-in">
// // //                         <div className="bg-white w-[300px] p-5 rounded-2xl shadow-2xl text-center space-y-3 animate-in zoom-in-95 border border-gray-200">
// // //                             <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto text-blue-600 shadow-inner"><Info size={24}/></div>
// // //                             <h4 className="text-base font-black text-gray-900">Konfirmasi</h4>
// // //                             <p className="text-xs text-gray-500 leading-snug">Usulan dikirim ke <b>Admin {scope === 'nasional' ? 'Pusat' : 'Wilayah'}</b>.</p>
// // //                             <div className="flex gap-2 pt-2">
// // //                                 <button onClick={() => setShowConfirm(false)} className="flex-1 py-2 border rounded-lg text-xs font-bold text-gray-500" title="Batal Konfirmasi" aria-label="Batal Konfirmasi">Batal</button>
// // //                                 <button onClick={handleFinalSubmit} disabled={loading} className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold flex justify-center items-center gap-1" title="Ya, Kirim" aria-label="Ya, Kirim">
// // //                                     {loading ? <Loader2 size={12} className="animate-spin"/> : <CheckCircle2 size={12}/>} Ya, Kirim
// // //                                 </button>
// // //                             </div>
// // //                         </div>
// // //                     </div>
// // //                 )}
// // //             </div>
// // //         </BaseModal>
// // //     );
// // // }







// // 'use client';

// // import { useState, useRef, useEffect } from 'react';
// // import { X, Send, FileText, Upload, Loader2, CheckCircle2, MapPin, Building, User, Info, Trash2, AlertCircle } from 'lucide-react';
// // import { api } from '@/lib/api'; 
// // import { getProvinces, getRegencies } from '@/lib/indonesia';
// // import BaseModal from '@/components/ui/BaseModal';
// // import axios from 'axios';

// // // PORT 4000 (Sesuai UploadTest)
// // const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// // interface CourseProposalModalProps {
// //     onClose: () => void;
// //     onSuccess: () => void;
// //     currentUser: any;
// // }

// // export default function CourseProposalModal({ onClose, onSuccess, currentUser }: CourseProposalModalProps) {
// //     // --- STATE DATA ---
// //     const [title, setTitle] = useState('');
// //     const [reason, setReason] = useState('');
// //     const [programType, setProgramType] = useState<'training' | 'course'>('training');
    
// //     // --- STATE WILAYAH ---
// //     const [scope, setScope] = useState<'nasional' | 'provinsi' | 'kota'>('nasional');
// //     const [selectedProvId, setSelectedProvId] = useState('');
// //     const [selectedCityId, setSelectedCityId] = useState('');
// //     const [provinces, setProvinces] = useState<any[]>([]);
// //     const [regencies, setRegencies] = useState<any[]>([]);
// //     const [isProvLocked, setIsProvLocked] = useState(false);

// //     // --- STATE DOKUMEN ---
// //     const [requiredDocs, setRequiredDocs] = useState<string[]>([]);
// //     const [courseDocs, setCourseDocs] = useState<string[]>([]);
// //     const [uploadedFiles, setUploadedFiles] = useState<Record<string, { url: string, originalName: string }>>({});
    
// //     // --- UI STATES ---
// //     const [loading, setLoading] = useState(false);
// //     const [configLoading, setConfigLoading] = useState(true);
// //     const [uploadingItem, setUploadingItem] = useState<string | null>(null);
// //     const [showConfirm, setShowConfirm] = useState(false); 

// //     // --- REFS & HELPER STATE ---
// //     const fileInputRef = useRef<HTMLInputElement | null>(null);
// //     const [activeDocName, setActiveDocName] = useState<string | null>(null);

// //     // --- 1. LOAD DATA & LOCK WILAYAH ---
// //     useEffect(() => {
// //         const provData = getProvinces();
// //         setProvinces(provData);
        
// //         // A. Load Config CMS
// //         const fetchConfig = async () => {
// //             try {
// //                 const res = await api('/api/content').catch(() => ({}));
// //                 setRequiredDocs(res.trainingRequirements || ['Kerangka Acuan Kerja (KAK)', 'Rencana Anggaran Biaya (RAB)']);
// //                 setCourseDocs(res.courseRequirements || ['Silabus Ringkas']);
// //             } catch (e) {
// //                 console.error("Gagal load config", e);
// //                 setRequiredDocs(['Kerangka Acuan Kerja (KAK)', 'Rencana Anggaran Biaya (RAB)']);
// //                 setCourseDocs(['Silabus Ringkas']);
// //             } finally { 
// //                 setConfigLoading(false); 
// //             }
// //         };
// //         fetchConfig();

// //         // B. LOGIKA LOCK WILAYAH (PRIORITAS managedProvinces)
// //         if (currentUser) {
// //             let userProvCode = null;
// //             let userCityCode = null;

// //             // CEK 1: Array managedProvinces (Prioritas Tertinggi)
// //             if (Array.isArray(currentUser.managedProvinces) && currentUser.managedProvinces.length > 0) {
// //                 userProvCode = currentUser.managedProvinces[0];
// //             } 
// //             // CEK 2: Property provinceId/province biasa
// //             else if (currentUser.provinceId) {
// //                 userProvCode = currentUser.provinceId;
// //             } else if (currentUser.province) {
// //                 userProvCode = currentUser.province;
// //             }

// //             // CEK KOTA (managedRegencies atau cityId)
// //             if (Array.isArray(currentUser.managedRegencies) && currentUser.managedRegencies.length > 0) {
// //                 userCityCode = currentUser.managedRegencies[0];
// //             } else if (currentUser.cityId) {
// //                 userCityCode = currentUser.cityId;
// //             } else if (currentUser.city) {
// //                 userCityCode = currentUser.city;
// //             }

// //             if (userProvCode) {
// //                 const foundProv = provData.find((p: any) => 
// //                     p.code === userProvCode || 
// //                     p.name.toLowerCase() === String(userProvCode).toLowerCase()
// //                 );

// //                 if (foundProv) {
// //                     setScope('provinsi');
// //                     setSelectedProvId(foundProv.code);
// //                     setIsProvLocked(true); // KUNCI!

// //                     if (userCityCode) {
// //                         setScope('kota');
// //                         const regs = getRegencies(foundProv.code);
// //                         setRegencies(regs);
                        
// //                         const foundCity = regs.find((c: any) => 
// //                             c.code === userCityCode || 
// //                             c.name.toLowerCase() === String(userCityCode).toLowerCase()
// //                         );
// //                         if (foundCity) setSelectedCityId(foundCity.code);
// //                     }
// //                 }
// //             }
// //         }
// //     }, [currentUser]);

// //     // Update regencies jika provinsi berubah (dan tidak dilock)
// //     useEffect(() => {
// //         if (selectedProvId) {
// //             if (regencies.length === 0 || !isProvLocked) {
// //                 setRegencies(getRegencies(selectedProvId));
// //             }
// //             if (!isProvLocked && !currentUser?.managedRegencies?.length) {
// //                 setSelectedCityId(''); 
// //             }
// //         } else {
// //             setRegencies([]);
// //         }
// //     }, [selectedProvId]); 

// //     // --- 2. UPLOAD LOGIC (FIXED NAME: handleFileChange) ---
    
// //     const triggerUpload = (docName: string) => {
// //         setActiveDocName(docName);
// //         if (fileInputRef.current) {
// //             fileInputRef.current.value = '';
// //             fileInputRef.current.click();
// //         }
// //     };

// //     // FUNGSI INI WAJIB ADA DAN BERNAMA handleFileChange
// //     const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
// //         const file = e.target.files?.[0];
// //         const docName = activeDocName; // Mengambil nama dokumen dari state
        
// //         if (!file || !docName) return;
        
// //         setUploadingItem(docName);
        
// //         // Ambil Token Manual
// //         let token = '';
// //         if (typeof window !== 'undefined') {
// //             const userStr = localStorage.getItem('user');
// //             if (userStr) {
// //                 try {
// //                     const userData = JSON.parse(userStr);
// //                     token = userData.token;
// //                 } catch (err) { console.error(err); }
// //             }
// //             if (!token) token = localStorage.getItem('token') || '';
// //         }

// //         if (!token) {
// //             alert("Sesi habis. Silakan login ulang.");
// //             setUploadingItem(null);
// //             return;
// //         }

// //         const fd = new FormData();
// //         fd.append('file', file);

// //         try {
// //             const response = await axios.post(`${API_BASE_URL}/api/materials/upload`, fd, {
// //                 headers: { 
// //                     'Content-Type': 'multipart/form-data', 
// //                     'Authorization': `Bearer ${token}` 
// //                 },
// //             });

// //             const result = response.data;
// //             const fileUrl = result.data?.url || result.url;
// //             const fileName = result.data?.originalName || result.originalName || file.name;

// //             if (fileUrl) {
// //                 setUploadedFiles(prev => ({
// //                     ...prev,
// //                     [docName]: { url: fileUrl, originalName: fileName }
// //                 }));
// //             } else {
// //                 throw new Error("URL tidak ditemukan di respon server.");
// //             }
// //         } catch (err: any) {
// //             console.error("Upload Error:", err);
// //             alert("Gagal Upload: " + (err.response?.data?.message || err.message));
// //         } finally {
// //             setUploadingItem(null);
// //             setActiveDocName(null);
// //             if (fileInputRef.current) fileInputRef.current.value = '';
// //         }
// //     };

// //     const removeFile = (docName: string) => {
// //         if(!confirm("Hapus file ini?")) return;
// //         const newFiles = { ...uploadedFiles };
// //         delete newFiles[docName];
// //         setUploadedFiles(newFiles);
// //     };

// //     // --- 3. SUBMIT LOGIC ---
// //     const activeRequirements = programType === 'training' ? requiredDocs : courseDocs;

// //     const handlePreSubmit = (e: React.FormEvent) => {
// //         e.preventDefault();
// //         if (!title.trim()) return alert("Judul usulan wajib diisi!");
        
// //         const missingDocs = activeRequirements.filter(doc => !uploadedFiles[doc]);
// //         if (missingDocs.length > 0) {
// //             return alert(`Mohon lengkapi dokumen wajib:\n- ${missingDocs.join('\n- ')}`);
// //         }

// //         if (scope === 'provinsi' && !selectedProvId) return alert("Pilih Provinsi tujuan.");
// //         if (scope === 'kota' && (!selectedProvId || !selectedCityId)) return alert("Pilih Kota tujuan.");
        
// //         setShowConfirm(true);
// //     };

// //     const handleFinalSubmit = async () => {
// //         setLoading(true);
// //         try {
// //             let organizer = 'PMI Pusat';
// //             let regionCodeToSend = 'national'; 

// //             if (scope === 'provinsi') {
// //                 const p = provinces.find(x => x.code === selectedProvId);
// //                 organizer = `PMI Provinsi: ${p?.name || selectedProvId}`;
// //                 regionCodeToSend = selectedProvId; 
// //             } else if (scope === 'kota') {
// //                 const p = provinces.find(x => x.code === selectedProvId);
// //                 const c = regencies.find(x => x.code === selectedCityId);
// //                 organizer = `PMI Kabupaten/Kota: ${c?.name}, ${p?.name}`;
// //                 regionCodeToSend = selectedCityId; 
// //             }

// //             const docs = Object.entries(uploadedFiles).map(([k, v]) => ({ 
// //                 name: k, 
// //                 originalName: v.originalName, 
// //                 url: v.url, 
// //                 type: 'document', 
// //                 label: k 
// //             }));
            
// //             const payload = {
// //                 title, programType, description: reason, status: 'proposed',
// //                 proposalDocuments: docs, organizer,
// //                 regionCode: regionCodeToSend, 
// //                 creatorInfo: { 
// //                     id: currentUser?._id || currentUser?.id, 
// //                     name: currentUser?.name, 
// //                     email: currentUser?.email, 
// //                     role: currentUser?.role 
// //                 },
// //                 isPublished: false, isInfoCompleted: false
// //             };

// //             await api('/api/courses', { method: 'POST', body: payload });
// //             alert("✅ Pengajuan berhasil dikirim!"); 
// //             onSuccess(); 
// //             onClose();
// //         } catch (err: any) { 
// //             alert("Gagal kirim: " + err.message); 
// //             setLoading(false); 
// //             setShowConfirm(false); 
// //         }
// //     };

// //     return (
// //         <BaseModal isOpen={true} onClose={onClose} title="Pengajuan Pelatihan Baru" size="full">
// //             <div className="max-w-7xl mx-auto h-full flex flex-col justify-center px-2 relative">
                
// //                 {/* INPUT HIDDEN - HANDLER SUDAH BENAR SEKARANG */}
// //                 <input 
// //                     type="file" 
// //                     ref={fileInputRef} 
// //                     onChange={handleFileChange} 
// //                     className="hidden" 
// //                     accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.png" 
// //                     title="File Input"
// //                     aria-label="File Input"
// //                 />

// //                 <form onSubmit={handlePreSubmit} className="pb-1">
// //                     <div className="grid grid-cols-12 gap-5 items-stretch">
                        
// //                         {/* KOLOM 1: INFO */}
// //                         <div className="col-span-4 flex flex-col gap-4">
// //                             <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl flex items-center justify-between shadow-sm">
// //                                 <div className="flex items-center gap-2">
// //                                     <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">{currentUser?.name?.charAt(0)}</div>
// //                                     <div><p className="text-[10px] font-bold text-blue-600 uppercase">PENGAJU</p><p className="text-xs font-bold text-gray-800 leading-tight">{currentUser?.name}</p></div>
// //                                 </div>
// //                                 <div className="text-[10px] text-gray-500 bg-white px-2 py-1 rounded border border-blue-200">{currentUser?.role}</div>
// //                             </div>

// //                             <div>
// //                                 <label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block" htmlFor="title">JUDUL USULAN *</label>
// //                                 <input id="title" className="w-full p-2.5 border border-gray-300 rounded-lg text-sm font-bold shadow-sm" placeholder="Contoh: Diklat Manajemen..." value={title} onChange={e => setTitle(e.target.value)} title="Judul" />
// //                             </div>

// //                             <div className="bg-white rounded-lg border border-gray-200 p-2">
// //                                 <label className="text-[10px] font-bold text-gray-500 uppercase mb-2 block px-1">JENIS PROGRAM</label>
// //                                 <div className="grid grid-cols-2 gap-2">
// //                                     <button type="button" onClick={() => setProgramType('training')} className={`py-2 rounded-md border text-xs font-bold flex items-center justify-center gap-1 ${programType === 'training' ? 'border-red-600 bg-red-50 text-red-700' : 'bg-gray-50 text-gray-500'}`} title="Diklat"><Building size={14}/> DIKLAT</button>
// //                                     <button type="button" onClick={() => setProgramType('course')} className={`py-2 rounded-md border text-xs font-bold flex items-center justify-center gap-1 ${programType === 'course' ? 'border-red-600 bg-red-50 text-red-700' : 'bg-gray-50 text-gray-500'}`} title="Kursus"><User size={14}/> KURSUS</button>
// //                                 </div>
// //                             </div>
// //                         </div>

// //                         {/* KOLOM 2: WILAYAH */}
// //                         <div className="col-span-4 flex flex-col gap-4">
// //                             <div className="bg-orange-50/50 border border-orange-200 p-3 rounded-xl shadow-sm flex-1 flex flex-col">
// //                                 <label className="text-[10px] font-bold text-orange-800 uppercase mb-2 flex items-center gap-1"><MapPin size={12}/> PELAKSANA {isProvLocked ? "(TERKUNCI)" : ""}</label>
// //                                 <div className="flex gap-2 mb-2">
// //                                     {['nasional', 'provinsi', 'kota'].map((s) => (
// //                                         <label key={s} className={`flex items-center gap-1 cursor-pointer bg-white px-2 py-1 rounded border shadow-sm ${scope === s ? 'border-orange-400 ring-1 ring-orange-200' : 'border-orange-100'} ${(isProvLocked && s !== scope && s !== 'kota' && scope !== 'kota') ? 'opacity-50 cursor-not-allowed' : ''}`}>
// //                                             <input 
// //                                                 type="radio" 
// //                                                 checked={scope === s} 
// //                                                 onChange={() => !isProvLocked && setScope(s as any)} 
// //                                                 className="w-3 h-3 accent-red-600" 
// //                                                 title={s}
// //                                                 disabled={isProvLocked && s !== scope && !(scope === 'provinsi' && s === 'kota')}
// //                                             />
// //                                             <span className="text-[10px] font-bold capitalize text-gray-700">{s}</span>
// //                                         </label>
// //                                     ))}
// //                                 </div>
// //                                 <div className="space-y-2 mt-auto">
// //                                     {scope !== 'nasional' && (
// //                                         <select 
// //                                             className={`w-full p-2 border rounded text-xs bg-white ${isProvLocked ? 'bg-gray-100 text-gray-600 font-bold' : ''}`} 
// //                                             value={selectedProvId} 
// //                                             onChange={e => setSelectedProvId(e.target.value)} 
// //                                             disabled={isProvLocked}
// //                                             title="Provinsi"
// //                                         >
// //                                             <option value="">- Pilih Provinsi -</option>
// //                                             {provinces.map(p => <option key={p.code} value={p.code}>{p.name}</option>)}
// //                                         </select>
// //                                     )}
// //                                     {scope === 'kota' && (
// //                                         <select 
// //                                             className="w-full p-2 border rounded text-xs bg-white" 
// //                                             value={selectedCityId} 
// //                                             onChange={e => setSelectedCityId(e.target.value)} 
// //                                             disabled={!selectedProvId} 
// //                                             title="Kota"
// //                                         >
// //                                             <option value="">- Pilih Kota -</option>
// //                                             {regencies.map(r => <option key={r.code} value={r.code}>{r.name}</option>)}
// //                                         </select>
// //                                     )}
// //                                 </div>
// //                             </div>

// //                             <div>
// //                                 <label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block" htmlFor="reason">ALASAN</label>
// //                                 <textarea id="reason" className="w-full p-2.5 border rounded-lg text-xs h-20 resize-none outline-none" placeholder="Urgensi..." value={reason} onChange={e => setReason(e.target.value)} title="Alasan"/>
// //                             </div>
// //                         </div>

// //                         {/* KOLOM 3: DOKUMEN WAJIB */}
// //                         <div className="col-span-4 flex flex-col h-full bg-gray-50 border border-gray-200 rounded-xl p-3 shadow-inner">
// //                             <label className="text-[10px] font-bold text-gray-600 uppercase mb-2 flex justify-between">
// //                                 <span>DOKUMEN WAJIB</span>
// //                                 <span className="bg-gray-200 px-1.5 rounded text-gray-600">{activeRequirements.length}</span>
// //                             </label>
                            
// //                             <div className="space-y-2 overflow-y-auto max-h-[300px] custom-scrollbar pr-1 flex-1">
// //                                 {configLoading ? (
// //                                     <div className="text-center text-xs text-gray-400 py-4"><Loader2 className="animate-spin inline mr-1"/> Loading...</div>
// //                                 ) : (
// //                                     activeRequirements.map((docName, idx) => (
// //                                         <div key={idx} className={`p-2 rounded border transition-all ${uploadedFiles[docName] ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200 shadow-sm'}`}>
// //                                             <div className="flex justify-between items-center mb-1">
// //                                                 <span className="text-[10px] font-bold text-gray-700 flex items-center gap-1">
// //                                                     {uploadedFiles[docName] ? <CheckCircle2 size={12} className="text-green-600"/> : <AlertCircle size={12} className="text-orange-500"/>}
// //                                                     {docName} <span className="text-red-500">*</span>
// //                                                 </span>
// //                                             </div>

// //                                             {uploadedFiles[docName] ? (
// //                                                 <div className="flex items-center gap-2 bg-white p-1.5 rounded border border-green-200 mt-1">
// //                                                     <FileText size={14} className="text-green-600"/>
// //                                                     <span className="text-[9px] font-bold text-green-700 flex-1 truncate">{uploadedFiles[docName].originalName}</span>
// //                                                     <button type="button" onClick={() => removeFile(docName)} className="text-red-400 hover:text-red-600 p-1 bg-red-50 rounded" title="Hapus"><Trash2 size={12}/></button>
// //                                                 </div>
// //                                             ) : (
// //                                                 <button 
// //                                                     type="button" 
// //                                                     onClick={() => triggerUpload(docName)} 
// //                                                     disabled={uploadingItem === docName} 
// //                                                     className="w-full flex items-center justify-center gap-2 py-1.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded text-blue-600 transition-colors mt-1"
// //                                                     title="Upload File"
// //                                                 >
// //                                                     {uploadingItem === docName ? <Loader2 className="animate-spin" size={14}/> : <Upload size={14}/>}
// //                                                     <span className="text-[10px] font-bold">Upload File</span>
// //                                                 </button>
// //                                             )}
// //                                         </div>
// //                                     ))
// //                                 )}
// //                             </div>
// //                         </div>
// //                     </div>

// //                     <div className="flex gap-3 pt-4 mt-2 border-t border-gray-100">
// //                         <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-gray-300 rounded-lg font-bold text-gray-600 hover:bg-gray-50 text-xs" title="Batal">Batal</button>
// //                         <button type="submit" className="flex-[3] py-2.5 bg-[#990000] text-white rounded-lg font-bold hover:bg-[#7f0000] flex items-center justify-center gap-2 text-xs shadow-md tracking-wider" title="Kirim"><Send size={14} /> KIRIM USULAN</button>
// //                     </div>
// //                 </form>

// //                 {showConfirm && (
// //                     <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
// //                         <div className="bg-white w-[320px] p-6 rounded-2xl shadow-2xl text-center space-y-4 animate-in zoom-in-95 border border-gray-200 relative">
// //                             <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto text-blue-600 shadow-inner mb-2"><Info size={28}/></div>
// //                             <div>
// //                                 <h4 className="text-lg font-black text-gray-900 mb-1">Konfirmasi</h4>
// //                                 <p className="text-xs text-gray-500 leading-relaxed">
// //                                     Usulan akan dikirim ke <b>Admin {scope === 'nasional' ? 'Pusat' : 'Wilayah'}</b>.<br/>Pastikan data sudah benar.
// //                                 </p>
// //                             </div>
// //                             <div className="flex gap-3 pt-2">
// //                                 <button type="button" onClick={() => setShowConfirm(false)} className="flex-1 py-2.5 border border-gray-300 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors" title="Batal">Batal</button>
// //                                 <button type="button" onClick={handleFinalSubmit} disabled={loading} className="flex-[1.5] py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 flex justify-center items-center gap-2 shadow-md transition-colors" title="Ya, Kirim">
// //                                     {loading ? <Loader2 size={14} className="animate-spin"/> : <CheckCircle2 size={14}/>} Ya, Kirim
// //                                 </button>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 )}
// //             </div>
// //         </BaseModal>
// //     );
// // }




// ===========================================
// // HANYA KUNCI DI PROVINSI
// ======================================

// 'use client';

// import { useState, useRef, useEffect } from 'react';
// import { X, Send, FileText, Upload, Loader2, CheckCircle2, MapPin, Building, User, Info, Trash2, AlertCircle } from 'lucide-react';
// import { api } from '@/lib/api'; 
// import { getProvinces, getRegencies } from '@/lib/indonesia';
// import BaseModal from '@/components/ui/BaseModal';
// import axios from 'axios';

// // PORT 4000 (Matching UploadTest)
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// interface CourseProposalModalProps {
//     onClose: () => void;
//     onSuccess: () => void;
//     currentUser: any;
// }

// export default function CourseProposalModal({ onClose, onSuccess, currentUser }: CourseProposalModalProps) {
//     // --- STATE DATA ---
//     const [title, setTitle] = useState('');
//     const [reason, setReason] = useState('');
//     const [programType, setProgramType] = useState<'training' | 'course'>('training');
    
//     // --- STATE LOCATION ---
//     const [scope, setScope] = useState<'nasional' | 'provinsi' | 'kota'>('nasional');
//     const [selectedProvId, setSelectedProvId] = useState('');
//     const [selectedCityId, setSelectedCityId] = useState('');
//     const [provinces, setProvinces] = useState<any[]>([]);
//     const [regencies, setRegencies] = useState<any[]>([]);
//     const [isProvLocked, setIsProvLocked] = useState(false);

//     // --- STATE DOCUMENTS ---
//     const [requiredDocs, setRequiredDocs] = useState<string[]>([]);
//     const [courseDocs, setCourseDocs] = useState<string[]>([]);
//     const [uploadedFiles, setUploadedFiles] = useState<Record<string, { url: string, originalName: string }>>({});
    
//     // --- UI STATES ---
//     const [loading, setLoading] = useState(false);
//     const [configLoading, setConfigLoading] = useState(true);
//     const [uploadingItem, setUploadingItem] = useState<string | null>(null);
//     const [showConfirm, setShowConfirm] = useState(false); 

//     // --- REFS ---
//     const fileInputRef = useRef<HTMLInputElement | null>(null);
//     const [activeDocName, setActiveDocName] = useState<string | null>(null);

//     // --- 1. LOAD DATA & LOCK LOCATION (UPDATED LOGIC) ---
//     useEffect(() => {
//         const provData = getProvinces();
//         setProvinces(provData);
        
//         // A. FETCH CMS
//         const fetchConfig = async () => {
//             try {
//                 const res = await api('/api/content').catch(() => ({}));
//                 setRequiredDocs(res.trainingRequirements || ['Kerangka Acuan Kerja (KAK)', 'Rencana Anggaran Biaya (RAB)']);
//                 setCourseDocs(res.courseRequirements || ['Silabus Ringkas']);
//             } catch (e) {
//                 console.error("Failed to load config", e);
//                 setRequiredDocs(['Kerangka Acuan Kerja (KAK)', 'Rencana Anggaran Biaya (RAB)']);
//                 setCourseDocs(['Silabus Ringkas']);
//             } finally { 
//                 setConfigLoading(false); 
//             }
//         };
//         fetchConfig();

//         // B. LOCK LOCATION LOGIC (PRIORITIZE managedProvinces)
//         if (currentUser) {
//             let userProvCode = null;
//             let userCityCode = null;

//             // CHECK 1: managedProvinces Array (Highest Priority)
//             // Even if scope says "national", if this array has data, treat as regional admin
//             if (Array.isArray(currentUser.managedProvinces) && currentUser.managedProvinces.length > 0) {
//                 userProvCode = currentUser.managedProvinces[0];
//             } 
//             // CHECK 2: Standard province properties
//             else if (currentUser.provinceId) {
//                 userProvCode = currentUser.provinceId;
//             } else if (currentUser.province) {
//                 userProvCode = currentUser.province;
//             }

//             // CHECK CITY (managedRegencies or cityId)
//             if (Array.isArray(currentUser.managedRegencies) && currentUser.managedRegencies.length > 0) {
//                 userCityCode = currentUser.managedRegencies[0];
//             } else if (currentUser.cityId) {
//                 userCityCode = currentUser.cityId;
//             } else if (currentUser.city) {
//                 userCityCode = currentUser.city;
//             }

//             if (userProvCode) {
//                 // Find matching province data (Code or Name)
//                 const foundProv = provData.find((p: any) => 
//                     p.code === userProvCode || 
//                     p.name.toLowerCase() === String(userProvCode).toLowerCase()
//                 );

//                 if (foundProv) {
//                     setScope('provinsi');
//                     setSelectedProvId(foundProv.code);
//                     setIsProvLocked(true); // LOCK DROPDOWN!

//                     // If user is city-level, lock city too
//                     if (userCityCode) {
//                         setScope('kota');
//                         const regs = getRegencies(foundProv.code);
//                         setRegencies(regs);
                        
//                         const foundCity = regs.find((c: any) => 
//                             c.code === userCityCode || 
//                             c.name.toLowerCase() === String(userCityCode).toLowerCase()
//                         );
//                         if (foundCity) setSelectedCityId(foundCity.code);
//                     }
//                 }
//             }
//         }
//     }, [currentUser]);

//     // Update regencies if province changes manually (only if not fully locked)
//     useEffect(() => {
//         if (selectedProvId) {
//             if (regencies.length === 0 || !isProvLocked) {
//                 setRegencies(getRegencies(selectedProvId));
//             }
//             // Reset city only if not locked by system
//             if (!isProvLocked && !currentUser?.managedRegencies?.length) {
//                 setSelectedCityId(''); 
//             }
//         } else {
//             setRegencies([]);
//         }
//     }, [selectedProvId]); // Remove isProvLocked dependency to avoid loops

//     // --- 2. UPLOAD LOGIC (MANUAL TOKEN - FIXES SESSION ERROR) ---
//     const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         const docName = activeDocName;
        
//         if (!file || !docName) return;
        
//         setUploadingItem(docName);
        
//         // Manual Token Retrieval
//         let token = '';
//         if (typeof window !== 'undefined') {
//             const userStr = localStorage.getItem('user');
//             if (userStr) {
//                 try {
//                     const userData = JSON.parse(userStr);
//                     token = userData.token;
//                 } catch (err) { console.error(err); }
//             }
//             if (!token) token = localStorage.getItem('token') || '';
//         }

//         if (!token) {
//             alert("Session expired. Please login again.");
//             setUploadingItem(null);
//             return;
//         }

//         const fd = new FormData();
//         fd.append('file', file);

//         try {
//             const response = await axios.post(`${API_BASE_URL}/api/materials/upload`, fd, {
//                 headers: { 
//                     'Content-Type': 'multipart/form-data', 
//                     'Authorization': `Bearer ${token}` 
//                 },
//             });

//             const result = response.data;
//             const fileUrl = result.data?.url || result.url;
//             const fileName = result.data?.originalName || result.originalName || file.name;

//             if (fileUrl) {
//                 setUploadedFiles(prev => ({
//                     ...prev,
//                     [docName]: { url: fileUrl, originalName: fileName }
//                 }));
//             } else {
//                 throw new Error("URL not found in response.");
//             }
//         } catch (err: any) {
//             console.error("Upload Error:", err);
//             alert("Upload Failed: " + (err.response?.data?.message || err.message));
//         } finally {
//             setUploadingItem(null);
//             setActiveDocName(null);
//             if (fileInputRef.current) fileInputRef.current.value = '';
//         }
//     };

//     const triggerUpload = (docName: string) => {
//         setActiveDocName(docName);
//         if (fileInputRef.current) {
//             fileInputRef.current.value = '';
//             fileInputRef.current.click();
//         }
//     };

//     const removeFile = (docName: string) => {
//         if(!confirm("Delete file?")) return;
//         const newFiles = { ...uploadedFiles };
//         delete newFiles[docName];
//         setUploadedFiles(newFiles);
//     };

//     // --- 3. SUBMIT LOGIC ---
//     const activeRequirements = programType === 'training' ? requiredDocs : courseDocs;

//     const handlePreSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!title.trim()) return alert("Proposal title is required!");
//         const missingDocs = activeRequirements.filter(doc => !uploadedFiles[doc]);
//         if (missingDocs.length > 0) {
//             return alert(`Please complete the following documents:\n- ${missingDocs.join('\n- ')}`);
//         }

//         if (scope === 'provinsi' && !selectedProvId) return alert("Please select a Province.");
//         if (scope === 'kota' && (!selectedProvId || !selectedCityId)) return alert("Please select a City.");
        
//         setShowConfirm(true);
//     };

//     const handleFinalSubmit = async () => {
//         setLoading(true);
//         try {
//             // GENERATE ORGANIZER NAME & REGION CODE
//             let organizer = 'PMI Pusat';
//             let regionCodeToSend = 'national'; // Default

//             if (scope === 'provinsi') {
//                 const p = provinces.find(x => x.code === selectedProvId);
//                 organizer = `PMI Provinsi: ${p?.name || selectedProvId}`;
//                 regionCodeToSend = selectedProvId; // Send Province ID
//             } else if (scope === 'kota') {
//                 const p = provinces.find(x => x.code === selectedProvId);
//                 const c = regencies.find(x => x.code === selectedCityId);
//                 organizer = `PMI Kabupaten/Kota: ${c?.name}, ${p?.name}`;
//                 regionCodeToSend = selectedCityId; // Send City ID
//             }

//             const docs = Object.entries(uploadedFiles).map(([k, v]) => ({ 
//                 name: k, 
//                 originalName: v.originalName, 
//                 url: v.url, 
//                 type: 'document', 
//                 label: k 
//             }));
            
//             const payload = {
//                 title, programType, description: reason, status: 'proposed',
//                 proposalDocuments: docs, organizer,
//                 regionCode: regionCodeToSend, // CRITICAL FOR ADMIN FILTERING
//                 creatorInfo: { 
//                     id: currentUser?._id || currentUser?.id, 
//                     name: currentUser?.name, 
//                     email: currentUser?.email, 
//                     role: currentUser?.role 
//                 },
//                 isPublished: false, isInfoCompleted: false
//             };

//             await api('/api/courses', { method: 'POST', body: payload });
//             alert("✅ Proposal sent successfully!"); 
//             onSuccess(); 
//             onClose();
//         } catch (err: any) { 
//             alert("Failed to send: " + err.message); 
//             setLoading(false); 
//             setShowConfirm(false); 
//         }
//     };

//     return (
//         <BaseModal isOpen={true} onClose={onClose} title="Pengajuan Pelatihan Baru" size="full">
//             <div className="max-w-7xl mx-auto h-full flex flex-col justify-center px-2 relative">
                
//                 {/* HIDDEN INPUT */}
//                 <input 
//                     type="file" 
//                     ref={fileInputRef} 
//                     onChange={handleFileChange} 
//                     className="hidden" 
//                     accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.png" 
//                     title="File Input"
//                     aria-label="File Input"
//                 />

//                 <form onSubmit={handlePreSubmit} className="pb-1">
//                     <div className="grid grid-cols-12 gap-5 items-stretch">
                        
//                         {/* COLUMN 1: INFO */}
//                         <div className="col-span-4 flex flex-col gap-4">
//                             <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl flex items-center justify-between shadow-sm">
//                                 <div className="flex items-center gap-2">
//                                     <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">{currentUser?.name?.charAt(0)}</div>
//                                     <div><p className="text-[10px] font-bold text-blue-600 uppercase">PENGAJU</p><p className="text-xs font-bold text-gray-800 leading-tight">{currentUser?.name}</p></div>
//                                 </div>
//                                 <div className="text-[10px] text-gray-500 bg-white px-2 py-1 rounded border border-blue-200">{currentUser?.role}</div>
//                             </div>

//                             <div>
//                                 <label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block" htmlFor="title">JUDUL USULAN *</label>
//                                 <input id="title" className="w-full p-2.5 border border-gray-300 rounded-lg text-sm font-bold shadow-sm" placeholder="Contoh: Diklat Manajemen..." value={title} onChange={e => setTitle(e.target.value)} title="Judul" />
//                             </div>

//                             <div className="bg-white rounded-lg border border-gray-200 p-2">
//                                 <label className="text-[10px] font-bold text-gray-500 uppercase mb-2 block px-1">JENIS PROGRAM</label>
//                                 <div className="grid grid-cols-2 gap-2">
//                                     <button type="button" onClick={() => setProgramType('training')} className={`py-2 rounded-md border text-xs font-bold flex items-center justify-center gap-1 ${programType === 'training' ? 'border-red-600 bg-red-50 text-red-700' : 'bg-gray-50 text-gray-500'}`} title="Diklat"><Building size={14}/> DIKLAT</button>
//                                     <button type="button" onClick={() => setProgramType('course')} className={`py-2 rounded-md border text-xs font-bold flex items-center justify-center gap-1 ${programType === 'course' ? 'border-red-600 bg-red-50 text-red-700' : 'bg-gray-50 text-gray-500'}`} title="Kursus"><User size={14}/> KURSUS</button>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* COLUMN 2: LOCATION */}
//                         <div className="col-span-4 flex flex-col gap-4">
//                             <div className="bg-orange-50/50 border border-orange-200 p-3 rounded-xl shadow-sm flex-1 flex flex-col">
//                                 <label className="text-[10px] font-bold text-orange-800 uppercase mb-2 flex items-center gap-1"><MapPin size={12}/> PELAKSANA {isProvLocked ? "(TERKUNCI)" : ""}</label>
//                                 <div className="flex gap-2 mb-2">
//                                     {['nasional', 'provinsi', 'kota'].map((s) => (
//                                         <label key={s} className={`flex items-center gap-1 cursor-pointer bg-white px-2 py-1 rounded border shadow-sm ${scope === s ? 'border-orange-400 ring-1 ring-orange-200' : 'border-orange-100'} ${(isProvLocked && s !== scope && s !== 'kota' && scope !== 'kota') ? 'opacity-50 cursor-not-allowed' : ''}`}>
//                                             <input 
//                                                 type="radio" 
//                                                 checked={scope === s} 
//                                                 onChange={() => !isProvLocked && setScope(s as any)} 
//                                                 className="w-3 h-3 accent-red-600" 
//                                                 title={s}
//                                                 disabled={isProvLocked && s !== scope && !(scope === 'provinsi' && s === 'kota')}
//                                             />
//                                             <span className="text-[10px] font-bold capitalize text-gray-700">{s}</span>
//                                         </label>
//                                     ))}
//                                 </div>
//                                 <div className="space-y-2 mt-auto">
//                                     {scope !== 'nasional' && (
//                                         <select 
//                                             className={`w-full p-2 border rounded text-xs bg-white ${isProvLocked ? 'bg-gray-100 text-gray-600 font-bold' : ''}`} 
//                                             value={selectedProvId} 
//                                             onChange={e => setSelectedProvId(e.target.value)} 
//                                             disabled={isProvLocked}
//                                             title="Provinsi"
//                                         >
//                                             <option value="">- Pilih Provinsi -</option>
//                                             {provinces.map(p => <option key={p.code} value={p.code}>{p.name}</option>)}
//                                         </select>
//                                     )}
//                                     {scope === 'kota' && (
//                                         <select 
//                                             className="w-full p-2 border rounded text-xs bg-white" 
//                                             value={selectedCityId} 
//                                             onChange={e => setSelectedCityId(e.target.value)} 
//                                             disabled={!selectedProvId} 
//                                             title="Kota"
//                                         >
//                                             <option value="">- Pilih Kota -</option>
//                                             {regencies.map(r => <option key={r.code} value={r.code}>{r.name}</option>)}
//                                         </select>
//                                     )}
//                                 </div>
//                             </div>

//                             <div>
//                                 <label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block" htmlFor="reason">ALASAN</label>
//                                 <textarea id="reason" className="w-full p-2.5 border rounded-lg text-xs h-20 resize-none outline-none" placeholder="Urgensi..." value={reason} onChange={e => setReason(e.target.value)} title="Alasan"/>
//                             </div>
//                         </div>

//                         {/* COLUMN 3: DOCUMENTS */}
//                         <div className="col-span-4 flex flex-col h-full bg-gray-50 border border-gray-200 rounded-xl p-3 shadow-inner">
//                             <label className="text-[10px] font-bold text-gray-600 uppercase mb-2 flex justify-between">
//                                 <span>DOKUMEN WAJIB</span>
//                                 <span className="bg-gray-200 px-1.5 rounded text-gray-600">{activeRequirements.length}</span>
//                             </label>
                            
//                             <div className="space-y-2 overflow-y-auto max-h-[300px] custom-scrollbar pr-1 flex-1">
//                                 {configLoading ? (
//                                     <div className="text-center text-xs text-gray-400 py-4"><Loader2 className="animate-spin inline mr-1"/> Loading...</div>
//                                 ) : (
//                                     activeRequirements.map((docName, idx) => (
//                                         <div key={idx} className={`p-2 rounded border transition-all ${uploadedFiles[docName] ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200 shadow-sm'}`}>
//                                             <div className="flex justify-between items-center mb-1">
//                                                 <span className="text-[10px] font-bold text-gray-700 flex items-center gap-1">
//                                                     {uploadedFiles[docName] ? <CheckCircle2 size={12} className="text-green-600"/> : <AlertCircle size={12} className="text-orange-500"/>}
//                                                     {docName} <span className="text-red-500">*</span>
//                                                 </span>
//                                             </div>

//                                             {uploadedFiles[docName] ? (
//                                                 <div className="flex items-center gap-2 bg-white p-1.5 rounded border border-green-200 mt-1">
//                                                     <FileText size={14} className="text-green-600"/>
//                                                     <span className="text-[9px] font-bold text-green-700 flex-1 truncate">{uploadedFiles[docName].originalName}</span>
//                                                     <button type="button" onClick={() => removeFile(docName)} className="text-red-400 hover:text-red-600 p-1 bg-red-50 rounded" title="Hapus"><Trash2 size={12}/></button>
//                                                 </div>
//                                             ) : (
//                                                 <button 
//                                                     type="button" 
//                                                     onClick={() => triggerUpload(docName)} 
//                                                     disabled={uploadingItem === docName} 
//                                                     className="w-full flex items-center justify-center gap-2 py-1.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded text-blue-600 transition-colors mt-1"
//                                                     title="Upload File"
//                                                 >
//                                                     {uploadingItem === docName ? <Loader2 className="animate-spin" size={14}/> : <Upload size={14}/>}
//                                                     <span className="text-[10px] font-bold">Upload File</span>
//                                                 </button>
//                                             )}
//                                         </div>
//                                     ))
//                                 )}
//                             </div>
//                         </div>
//                     </div>

//                     <div className="flex gap-3 pt-4 mt-2 border-t border-gray-100">
//                         <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-gray-300 rounded-lg font-bold text-gray-600 hover:bg-gray-50 text-xs" title="Batal">Batal</button>
//                         <button type="submit" className="flex-[3] py-2.5 bg-[#990000] text-white rounded-lg font-bold hover:bg-[#7f0000] flex items-center justify-center gap-2 text-xs shadow-md tracking-wider" title="Kirim"><Send size={14} /> KIRIM USULAN</button>
//                     </div>
//                 </form>

//                 {/* POPUP CONFIRMATION (FIXED OVERLAY) */}
//                 {showConfirm && (
//                     <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
//                         <div className="bg-white w-[320px] p-6 rounded-2xl shadow-2xl text-center space-y-4 animate-in zoom-in-95 border border-gray-200 relative">
//                             <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto text-blue-600 shadow-inner mb-2"><Info size={28}/></div>
//                             <div>
//                                 <h4 className="text-lg font-black text-gray-900 mb-1">Konfirmasi</h4>
//                                 <p className="text-xs text-gray-500 leading-relaxed px-2">
//                                     Usulan akan dikirim ke <b>Admin {scope === 'nasional' ? 'Pusat' : 'Wilayah'}</b>.<br/>Pastikan data sudah benar.
//                                 </p>
//                             </div>
//                             <div className="flex gap-3 pt-2">
//                                 <button type="button" onClick={() => setShowConfirm(false)} className="flex-1 py-2.5 border border-gray-300 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors" title="Batal">Batal</button>
//                                 <button type="button" onClick={handleFinalSubmit} disabled={loading} className="flex-[1.5] py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 flex justify-center items-center gap-2 shadow-md transition-colors" title="Ya, Kirim">
//                                     {loading ? <Loader2 size={14} className="animate-spin"/> : <CheckCircle2 size={14}/>} Ya, Kirim
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </BaseModal>
//     );
// }



// =====================================
// KINCI SAMPAI KABUPATEN
// =====================================


'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Send, FileText, Upload, Loader2, CheckCircle2, MapPin, Building, User, Info, Trash2, AlertCircle } from 'lucide-react';
import { api } from '@/lib/api'; 
import { getProvinces, getRegencies } from '@/lib/indonesia';
import BaseModal from '@/components/ui/BaseModal';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

interface CourseProposalModalProps {
    onClose: () => void;
    onSuccess: () => void;
    currentUser: any;
}

export default function CourseProposalModal({ onClose, onSuccess, currentUser }: CourseProposalModalProps) {
    // --- STATE DATA ---
    const [title, setTitle] = useState('');
    const [reason, setReason] = useState('');
    const [programType, setProgramType] = useState<'training' | 'course'>('training');
    
    // --- STATE LOCATION ---
    const [scope, setScope] = useState<'nasional' | 'provinsi' | 'kota'>('nasional');
    const [selectedProvId, setSelectedProvId] = useState('');
    const [selectedCityId, setSelectedCityId] = useState('');
    const [provinces, setProvinces] = useState<any[]>([]);
    const [regencies, setRegencies] = useState<any[]>([]);
    const [isProvLocked, setIsProvLocked] = useState(false);
    const [isCityLocked, setIsCityLocked] = useState(false);

    // --- STATE DOKUMEN ---
    const [requiredDocs, setRequiredDocs] = useState<string[]>([]);
    const [courseDocs, setCourseDocs] = useState<string[]>([]);
    const [uploadedFiles, setUploadedFiles] = useState<Record<string, { url: string, originalName: string }>>({});
    
    // --- UI STATES ---
    const [loading, setLoading] = useState(false);
    const [configLoading, setConfigLoading] = useState(true);
    const [uploadingItem, setUploadingItem] = useState<string | null>(null);
    const [showConfirm, setShowConfirm] = useState(false); 

    // --- REFS ---
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [activeDocName, setActiveDocName] = useState<string | null>(null);

    // --- 1. LOAD DATA & SMART LOCK LOCATION ---
    useEffect(() => {
        const provData = getProvinces();
        setProvinces(provData);
        
        const fetchConfig = async () => {
            try {
                const res = await api('/api/content').catch(() => ({}));
                setRequiredDocs(res.trainingRequirements || ['Kerangka Acuan Kerja (KAK)', 'Rencana Anggaran Biaya (RAB)']);
                setCourseDocs(res.courseRequirements || ['Silabus Ringkas']);
            } catch (e) {
                setRequiredDocs(['Kerangka Acuan Kerja (KAK)', 'Rencana Anggaran Biaya (RAB)']);
                setCourseDocs(['Silabus Ringkas']);
            } finally { 
                setConfigLoading(false); 
            }
        };
        fetchConfig();

        // === SMART LOCK & AUTO-SELECT LOGIC ===
        if (currentUser) {
            let userProvCode = null;
            
            // 1. TENTUKAN PROVINSI (Priority: Managed > ID > Name)
            if (Array.isArray(currentUser.managedProvinces) && currentUser.managedProvinces.length > 0) {
                userProvCode = currentUser.managedProvinces[0];
            } else if (currentUser.provinceId) {
                userProvCode = currentUser.provinceId;
            } else if (currentUser.province) {
                userProvCode = currentUser.province;
            }

            if (userProvCode) {
                // Cari Object Provinsi
                const foundProv = provData.find((p: any) => 
                    p.code === userProvCode || 
                    p.name.toLowerCase() === String(userProvCode).toLowerCase()
                );

                if (foundProv) {
                    setScope('provinsi'); 
                    setSelectedProvId(foundProv.code);
                    setIsProvLocked(true); // LOCK PROVINSI

                    // Load Kota Langsung
                    const regs = getRegencies(foundProv.code);
                    setRegencies(regs);

                    // 2. DETEKSI KOTA (SCANN STRING MEMBERDATA)
                    // Kita cari string seperti "SAMPANG" di dalam `unit` atau `address`
                    let potentialCityName = '';

                    // Cek managedRegencies (Paling Kuat)
                    if (Array.isArray(currentUser.managedRegencies) && currentUser.managedRegencies.length > 0) {
                        potentialCityName = currentUser.managedRegencies[0]; // Bisa Kode atau Nama
                    } 
                    // Cek Data Member (Unit / Address) - Kasus Ilham
                    else {
                        const unit = currentUser.memberData?.unit || '';
                        const address = currentUser.memberData?.address || '';
                        // Gabungkan string untuk pencarian
                        potentialCityName = (unit + ' ' + address).toUpperCase(); 
                    }

                    if (potentialCityName) {
                        // Loop semua kota di provinsi ini untuk mencari kecocokan
                        const foundCity = regs.find((c: any) => {
                            // Bersihkan nama kota di sistem: "KABUPATEN SAMPANG" -> "SAMPANG"
                            const cleanSystemName = c.name.replace(/KABUPATEN|KOTA/i, '').trim().toUpperCase();
                            
                            // Cek 1: Apakah Kode cocok?
                            if (c.code === potentialCityName) return true;

                            // Cek 2: Apakah string profil mengandung nama kota? (misal: "MARKAS KAB. SAMPANG" mengandung "SAMPANG")
                            // Pastikan panjang nama kota minimal 4 huruf untuk hindari match pendek yang salah
                            if (cleanSystemName.length > 3 && potentialCityName.includes(cleanSystemName)) {
                                return true;
                            }
                            return false;
                        });

                        if (foundCity) {
                            setSelectedCityId(foundCity.code);
                            // Karena Ilham Fasilitator Provinsi, kita tidak Lock City (biar bisa ganti kota lain di Jatim),
                            // tapi kita auto-select supaya cepat.
                            // Jika ingin lock, uncomment baris bawah:
                            // setIsCityLocked(true); 
                        }
                    }
                }
            }
        }
    }, [currentUser]);

    // Update regencies jika provinsi berubah (hanya jika tidak dilock)
    useEffect(() => {
        if (selectedProvId) {
            if (regencies.length === 0 || !isProvLocked) {
                setRegencies(getRegencies(selectedProvId));
            }
            if (!isProvLocked && !isCityLocked) setSelectedCityId(''); 
        } else {
            setRegencies([]);
        }
    }, [selectedProvId]); 

    // --- 2. UPLOAD LOGIC ---
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; const docName = activeDocName; 
        if (!file || !docName) return;
        setUploadingItem(docName);
        
        let token = '';
        if (typeof window !== 'undefined') {
            const userStr = localStorage.getItem('user');
            if (userStr) { try { token = JSON.parse(userStr).token; } catch (e) {} }
            if (!token) token = localStorage.getItem('token') || '';
        }

        if (!token) { alert("Sesi habis."); setUploadingItem(null); return; }
        const fd = new FormData(); fd.append('file', file);

        try {
            const response = await axios.post(`${API_BASE_URL}/api/materials/upload`, fd, {
                headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` },
            });
            const url = response.data.data?.url || response.data.url;
            const name = response.data.data?.originalName || response.data.originalName || file.name;
            if (url) setUploadedFiles(prev => ({ ...prev, [docName]: { url, originalName: name } }));
        } catch (err: any) { alert("Gagal Upload: " + err.message); } 
        finally { setUploadingItem(null); if(fileInputRef.current) fileInputRef.current.value=''; }
    };

    const triggerUpload = (n:string) => { setActiveDocName(n); fileInputRef.current?.click(); };
    const removeFile = (n:string) => { if(confirm("Hapus?")) { const d={...uploadedFiles}; delete d[n]; setUploadedFiles(d); }};

    // --- 3. SUBMIT LOGIC ---
    const activeRequirements = programType === 'training' ? requiredDocs : courseDocs;
    const handlePreSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return alert("Judul wajib!");
        const missing = activeRequirements.filter(d => !uploadedFiles[d]);
        if (missing.length) return alert(`Kurang: ${missing.join(', ')}`);
        if (scope === 'provinsi' && !selectedProvId) return alert("Pilih Provinsi!");
        if (scope === 'kota' && (!selectedProvId || !selectedCityId)) return alert("Pilih Kota!");
        setShowConfirm(true);
    };

    const handleFinalSubmit = async () => {
        setLoading(true);
        try {
            let organizer = 'PMI Pusat'; let regionCode = 'national';
            if (scope === 'provinsi') { const p = provinces.find(x => x.code === selectedProvId); organizer = `PMI Provinsi: ${p?.name}`; regionCode = selectedProvId; } 
            else if (scope === 'kota') { const p = provinces.find(x => x.code === selectedProvId); const c = regencies.find(x => x.code === selectedCityId); organizer = `PMI Kabupaten/Kota: ${c?.name}, ${p?.name}`; regionCode = selectedCityId; }

            const docs = Object.entries(uploadedFiles).map(([k, v]) => ({ name: k, originalName: v.originalName, url: v.url, type: 'document', label: k }));
            const payload = { title, programType, description: reason, status: 'proposed', proposalDocuments: docs, organizer, regionCode, creatorInfo: { id: currentUser?._id, name: currentUser?.name, email: currentUser?.email, role: currentUser?.role }, isPublished: false, isInfoCompleted: false };
            
            await api('/api/courses', { method: 'POST', body: payload });
            alert("✅ Terkirim!"); onSuccess(); onClose();
        } catch (e: any) { alert("Gagal: " + e.message); setLoading(false); setShowConfirm(false); }
    };

    return (
        <BaseModal isOpen={true} onClose={onClose} title="Pengajuan Pelatihan Baru" size="full">
            <div className="max-w-7xl mx-auto h-full flex flex-col justify-center px-2 relative">
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.png" title="Upload" aria-label="Upload"/>
                <form onSubmit={handlePreSubmit} className="pb-1">
                    <div className="grid grid-cols-12 gap-5 items-stretch">
                        <div className="col-span-4 flex flex-col gap-4">
                            <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl flex items-center gap-2 shadow-sm"><div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">{currentUser?.name?.charAt(0)}</div><div><p className="text-[10px] font-bold text-blue-600">PENGAJU</p><p className="text-xs font-bold text-gray-800">{currentUser?.name}</p></div></div>
                            <div><label className="text-[10px] font-bold text-gray-500 block mb-1">JUDUL USULAN *</label><input className="w-full p-2.5 border rounded-lg text-sm font-bold" placeholder="Contoh: Diklat..." value={title} onChange={e=>setTitle(e.target.value)} title="Judul" aria-label="Judul"/></div>
                            <div className="bg-white border rounded-lg p-2"><label className="text-[10px] font-bold text-gray-500 block mb-2 px-1">JENIS PROGRAM</label><div className="grid grid-cols-2 gap-2"><button type="button" onClick={()=>setProgramType('training')} className={`py-2 rounded-md border text-xs font-bold flex items-center justify-center gap-1 ${programType==='training'?'border-red-600 bg-red-50 text-red-700':'bg-gray-50 text-gray-500'}`} title="Diklat" aria-label="Diklat"><Building size={14}/> DIKLAT</button><button type="button" onClick={()=>setProgramType('course')} className={`py-2 rounded-md border text-xs font-bold flex items-center justify-center gap-1 ${programType==='course'?'border-red-600 bg-red-50 text-red-700':'bg-gray-50 text-gray-500'}`} title="Kursus" aria-label="Kursus"><User size={14}/> KURSUS</button></div></div>
                        </div>
                        <div className="col-span-4 flex flex-col gap-4">
                            <div className="bg-orange-50/50 border border-orange-200 p-3 rounded-xl shadow-sm flex-1 flex flex-col">
                                <label className="text-[10px] font-bold text-orange-800 uppercase mb-2 flex items-center gap-1"><MapPin size={12}/> PELAKSANA {isProvLocked && "(TERKUNCI)"}</label>
                                <div className="flex gap-2 mb-2">
                                    {['nasional', 'provinsi', 'kota'].map((s) => (
                                        <label key={s} className={`flex items-center gap-1 cursor-pointer bg-white px-2 py-1 rounded border shadow-sm ${scope===s?'border-orange-400':'border-orange-100'} ${(isProvLocked && s !== scope && s !== 'kota' && scope !== 'kota') ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                            <input type="radio" checked={scope === s} onChange={() => !isProvLocked && setScope(s as any)} className="w-3 h-3 accent-red-600" disabled={isProvLocked && s !== scope && !(scope === 'provinsi' && s === 'kota')} title={s} aria-label={s}/>
                                            <span className="text-[10px] font-bold capitalize text-gray-700">{s}</span>
                                        </label>
                                    ))}
                                </div>
                                <div className="space-y-2 mt-auto">
                                    {scope !== 'nasional' && <select className={`w-full p-2 border rounded text-xs bg-white ${isProvLocked ? 'bg-gray-100 text-gray-600 font-bold' : ''}`} value={selectedProvId} onChange={e => setSelectedProvId(e.target.value)} disabled={isProvLocked} title="Provinsi" aria-label="Provinsi"><option value="">- Pilih Provinsi -</option>{provinces.map(p => <option key={p.code} value={p.code}>{p.name}</option>)}</select>}
                                    {scope === 'kota' && <select className={`w-full p-2 border rounded text-xs bg-white ${isCityLocked ? 'bg-gray-100 text-gray-600 font-bold' : ''}`} value={selectedCityId} onChange={e => setSelectedCityId(e.target.value)} disabled={!selectedProvId || isCityLocked} title="Kota" aria-label="Kota"><option value="">- Pilih Kota -</option>{regencies.map(r => <option key={r.code} value={r.code}>{r.name}</option>)}</select>}
                                </div>
                            </div>
                            <div><label className="text-[10px] font-bold text-gray-500 block mb-1">ALASAN</label><textarea className="w-full p-2.5 border rounded-lg text-xs h-20 resize-none" placeholder="Jelaskan..." value={reason} onChange={e=>setReason(e.target.value)} title="Alasan" aria-label="Alasan"/></div>
                        </div>
                        <div className="col-span-4 flex flex-col h-full bg-gray-50 border border-gray-200 rounded-xl p-3 shadow-inner">
                            <div className="flex justify-between mb-2"><label className="text-[10px] font-bold text-gray-600">DOKUMEN WAJIB</label><span className="bg-gray-200 px-1.5 rounded text-[10px] font-bold text-gray-600">{activeRequirements.length}</span></div>
                            <div className="space-y-2 overflow-y-auto max-h-[300px] custom-scrollbar pr-1 flex-1">
                                {activeRequirements.map((docName, idx) => (
                                    <div key={idx} className="p-2 rounded border bg-white border-gray-200 shadow-sm">
                                        <div className="flex justify-between items-center mb-1"><span className="text-[10px] font-bold text-gray-700 flex items-center gap-1">{uploadedFiles[docName] ? <CheckCircle2 size={12} className="text-green-600"/> : <AlertCircle size={12} className="text-orange-500"/>}{docName} <span className="text-red-500">*</span></span></div>
                                        {uploadedFiles[docName] ? (<div className="flex items-center gap-2 bg-white p-1.5 rounded border border-green-200 mt-1"><FileText size={14} className="text-green-600"/><span className="text-[9px] font-bold text-green-700 flex-1 truncate">{uploadedFiles[docName].originalName}</span><button type="button" onClick={() => removeFile(docName)} className="text-red-400 hover:text-red-600 p-1 bg-red-50 rounded" title="Hapus" aria-label="Hapus"><Trash2 size={12}/></button></div>) : (<button type="button" onClick={() => triggerUpload(docName)} disabled={uploadingItem === docName} className="w-full flex items-center justify-center gap-2 py-1.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded text-blue-600 transition-colors mt-1" title="Upload" aria-label="Upload">{uploadingItem === docName ? <Loader2 className="animate-spin" size={14}/> : <Upload size={14}/>}<span className="text-[10px] font-bold">Upload File</span></button>)}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3 pt-4 mt-2 border-t border-gray-100"><button type="button" onClick={onClose} className="flex-1 py-2.5 border border-gray-300 rounded-lg font-bold text-gray-600 hover:bg-gray-50 text-xs" title="Batal" aria-label="Batal">Batal</button><button type="submit" className="flex-[3] py-2.5 bg-[#990000] text-white rounded-lg font-bold hover:bg-[#7f0000] flex items-center justify-center gap-2 text-xs shadow-md tracking-wider" title="Kirim" aria-label="Kirim"><Send size={14} /> KIRIM USULAN</button></div>
                </form>
                {showConfirm && (<div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"><div className="bg-white w-[320px] p-6 rounded-2xl shadow-2xl text-center space-y-4 animate-in zoom-in-95 border border-gray-200 relative"><div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto text-blue-600 shadow-inner mb-2"><Info size={28}/></div><div><h4 className="text-lg font-black text-gray-900 mb-1">Konfirmasi</h4><p className="text-xs text-gray-500 leading-relaxed">Usulan dikirim ke <b>Admin {scope === 'nasional' ? 'Pusat' : 'Wilayah'}</b>.</p></div><div className="flex gap-3 pt-2"><button type="button" onClick={() => setShowConfirm(false)} className="flex-1 py-2.5 border border-gray-300 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors" title="Batal" aria-label="Batal">Batal</button><button type="button" onClick={handleFinalSubmit} disabled={loading} className="flex-[1.5] py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 flex justify-center items-center gap-2 shadow-md transition-colors" title="Ya, Kirim" aria-label="Ya, Kirim">{loading ? <Loader2 size={14} className="animate-spin"/> : <CheckCircle2 size={14}/>} Ya, Kirim</button></div></div></div>)}
            </div>
        </BaseModal>
    );
}
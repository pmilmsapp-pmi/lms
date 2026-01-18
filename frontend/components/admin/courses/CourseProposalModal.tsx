// 'use client';

// import { useState, useEffect } from 'react';
// import { X, Send, Loader2, FileText, HelpCircle, Upload, CheckCircle, Trash2 } from 'lucide-react';
// import { api, apiUpload } from '@/lib/api';

// interface CourseProposalModalProps {
//     onClose: () => void;
//     onSuccess: () => void;
//     currentUser: any;
// }

// export default function CourseProposalModal({ onClose, onSuccess, currentUser }: CourseProposalModalProps) {
//     const [loading, setLoading] = useState(false);
//     const [configLoading, setConfigLoading] = useState(true);
    
//     // Data Form
//     const [formData, setFormData] = useState({
//         title: '',
//         programType: 'training',
//         reason: '',
//         organizer: 'PMI Pusat'
//     });

//     // Syarat Dokumen (Dari Admin CMS)
//     const [requiredDocs, setRequiredDocs] = useState<string[]>([]);
    
//     // File yang sudah diupload: { 'Kerangka Acuan': 'https://url...' }
//     const [uploadedFiles, setUploadedFiles] = useState<Record<string, string>>({});
//     const [uploadingItem, setUploadingItem] = useState<string | null>(null);

//     // --- FETCH CONFIG ---
//     useEffect(() => {
//         const fetchRequirements = async () => {
//             try {
//                 const res = await api('/api/content');
//                 // Default fallback jika admin belum setting
//                 setRequiredDocs(res.trainingRequirements || ['Kerangka Acuan Kerja (KAK)']);
//             } catch (e) {
//                 console.error("Gagal load syarat dokumen", e);
//             } finally {
//                 setConfigLoading(false);
//             }
//         };
//         fetchRequirements();
//     }, []);

//     const handleChange = (field: string, value: string) => {
//         setFormData(prev => ({ ...prev, [field]: value }));
//     };

//     // --- HANDLER UPLOAD ---
//     const handleFileUpload = async (docName: string, e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (!file) return;

//         setUploadingItem(docName);
//         try {
//             const fd = new FormData();
//             fd.append('file', file);
//             // Gunakan apiUpload helper yang sudah ada
//             const res = await apiUpload('/api/upload', fd);
//             const url = res.url || res.file?.url || res.data?.url;
            
//             if (url) {
//                 setUploadedFiles(prev => ({ ...prev, [docName]: url }));
//             } else {
//                 alert("Gagal mendapatkan URL file.");
//             }
//         } catch (err: any) {
//             alert("Upload gagal: " + err.message);
//         } finally {
//             setUploadingItem(null);
//         }
//     };

//     const removeFile = (docName: string) => {
//         const newFiles = { ...uploadedFiles };
//         delete newFiles[docName];
//         setUploadedFiles(newFiles);
//     };

//     // --- SUBMIT ---
//     const handleSubmit = async () => {
//         if (!formData.title || !formData.reason) return alert("Judul dan Alasan Pengajuan wajib diisi.");
        
//         // Validasi Dokumen Wajib jika Diklat Resmi
//         if (formData.programType === 'training') {
//             const missingDocs = requiredDocs.filter(doc => !uploadedFiles[doc]);
//             if (missingDocs.length > 0) {
//                 return alert(`Mohon lengkapi dokumen wajib berikut:\n- ${missingDocs.join('\n- ')}`);
//             }
//         }
        
//         setLoading(true);
//         try {
//             // Format dokumen untuk disimpan di DB
//             const proposalDocuments = Object.entries(uploadedFiles).map(([name, url]) => ({ name, url }));

//             const payload = {
//                 ...formData,
//                 status: 'proposed', 
//                 description: '<p>Draft awal pengajuan.</p>',
//                 proposalDocuments: proposalDocuments, // Kirim dokumen ke backend
//                 creatorInfo: currentUser
//             };

//             await api('/api/courses', { method: 'POST', body: payload });
//             alert("Pengajuan berhasil dikirim ke Admin!");
//             onSuccess();
//         } catch (err: any) {
//             alert("Gagal mengajukan: " + err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-in zoom-in-95" role="dialog" aria-modal="true">
//             <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
//                 {/* Header */}
//                 <div className="bg-[#990000] text-white p-5 flex justify-between items-center shrink-0">
//                     <div>
//                         <h2 className="text-lg font-bold">Form Pengajuan Pelatihan</h2>
//                         <p className="text-xs text-red-100">Langkah 1: Ajukan ide pelatihan Anda.</p>
//                     </div>
//                     <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition-colors" aria-label="Tutup Modal"><X size={20}/></button>
//                 </div>

//                 {/* Body Scrollable */}
//                 <div className="p-6 space-y-5 overflow-y-auto">
//                     <div>
//                         <label className="block text-sm font-bold text-gray-700 mb-1">Judul Usulan Pelatihan <span className="text-red-500">*</span></label>
//                         <input 
//                             className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
//                             placeholder="Contoh: Pelatihan Dasar KSR 2026"
//                             value={formData.title}
//                             onChange={(e) => handleChange('title', e.target.value)}
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-sm font-bold text-gray-700 mb-2">Jenis Program</label>
//                         <div className="flex gap-4">
//                             <label className={`flex-1 flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${formData.programType === 'training' ? 'border-red-600 bg-red-50' : 'border-gray-200'}`}>
//                                 <input type="radio" name="ptype" className="hidden" checked={formData.programType === 'training'} onChange={() => handleChange('programType', 'training')}/>
//                                 <div className={`w-4 h-4 rounded-full border ${formData.programType === 'training' ? 'bg-red-600 border-red-600' : 'border-gray-400'}`}></div>
//                                 <span className="text-sm font-bold">Diklat Resmi</span>
//                             </label>
//                             <label className={`flex-1 flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${formData.programType === 'course' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'}`}>
//                                 <input type="radio" name="ptype" className="hidden" checked={formData.programType === 'course'} onChange={() => handleChange('programType', 'course')}/>
//                                 <div className={`w-4 h-4 rounded-full border ${formData.programType === 'course' ? 'bg-blue-600 border-blue-600' : 'border-gray-400'}`}></div>
//                                 <span className="text-sm font-bold">Kursus Mandiri</span>
//                             </label>
//                         </div>
//                     </div>

//                     {/* SECTION DINAMIS: DOKUMEN WAJIB (Hanya Jika Diklat Resmi) */}
//                     {formData.programType === 'training' && (
//                         <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 animate-in fade-in slide-in-from-top-2">
//                             <h3 className="font-bold text-orange-800 mb-3 flex items-center gap-2 text-sm">
//                                 <FileText size={16}/> Dokumen Wajib Dilampirkan
//                             </h3>
                            
//                             {configLoading ? (
//                                 <div className="text-xs text-gray-500 flex items-center gap-2"><Loader2 className="animate-spin" size={12}/> Memuat daftar syarat...</div>
//                             ) : requiredDocs.length === 0 ? (
//                                 <p className="text-xs text-gray-500 italic">Tidak ada dokumen wajib yang diatur Admin.</p>
//                             ) : (
//                                 <div className="space-y-3">
//                                     {requiredDocs.map((docName, idx) => (
//                                         <div key={idx} className="bg-white p-3 rounded-lg border border-orange-200 shadow-sm">
//                                             <div className="flex justify-between items-center mb-2">
//                                                 <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">{docName} <span className="text-red-500">*</span></span>
//                                                 {uploadedFiles[docName] ? (
//                                                     <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold flex items-center gap-1"><CheckCircle size={10}/> Terupload</span>
//                                                 ) : (
//                                                     <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-bold">Wajib</span>
//                                                 )}
//                                             </div>

//                                             {uploadedFiles[docName] ? (
//                                                 <div className="flex items-center gap-2 bg-green-50 p-2 rounded border border-green-100">
//                                                     <FileText size={16} className="text-green-600"/>
//                                                     <span className="text-xs text-green-700 truncate flex-1 font-medium">File berhasil diupload</span>
//                                                     <button onClick={() => removeFile(docName)} className="text-red-500 p-1 hover:bg-red-100 rounded" title="Hapus File" aria-label={`Hapus ${docName}`}><Trash2 size={14}/></button>
//                                                 </div>
//                                             ) : (
//                                                 <div className="relative">
//                                                     <input 
//                                                         type="file" 
//                                                         className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-orange-100 file:text-orange-700 hover:file:bg-orange-200 cursor-pointer"
//                                                         onChange={(e) => handleFileUpload(docName, e)}
//                                                         disabled={uploadingItem === docName}
//                                                         aria-label={`Upload ${docName}`}
//                                                     />
//                                                     {uploadingItem === docName && <div className="absolute right-2 top-2"><Loader2 className="animate-spin text-orange-500" size={16}/></div>}
//                                                 </div>
//                                             )}
//                                         </div>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>
//                     )}

//                     <div>
//                         <label className="block text-sm font-bold text-gray-700 mb-1">Tujuan / Alasan Pengajuan <span className="text-red-500">*</span></label>
//                         <textarea 
//                             className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-red-500 outline-none h-24 resize-none"
//                             placeholder="Jelaskan secara singkat kenapa pelatihan ini perlu dibuat..."
//                             value={formData.reason}
//                             onChange={(e) => handleChange('reason', e.target.value)}
//                         ></textarea>
//                     </div>

//                     <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 flex gap-3 items-start">
//                         <HelpCircle className="text-blue-600 shrink-0 mt-0.5" size={18}/>
//                         <p className="text-xs text-blue-700 leading-relaxed">
//                             Setelah dikirim, Admin akan meninjau. Jika disetujui, Anda akan mendapatkan notifikasi dan akses untuk melengkapi modul kurikulum di tab <strong>Manajemen Pelatihan</strong>.
//                         </p>
//                     </div>
//                 </div>

//                 {/* Footer */}
//                 <div className="p-4 border-t bg-gray-50 flex justify-end gap-3 shrink-0">
//                     <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-gray-300 font-bold text-sm text-gray-600 hover:bg-white" aria-label="Batal">Batal</button>
//                     <button onClick={handleSubmit} disabled={loading || (formData.programType === 'training' && requiredDocs.some(doc => !uploadedFiles[doc]))} className="px-6 py-2.5 rounded-xl bg-[#990000] text-white font-bold text-sm shadow-lg hover:bg-[#7f0000] flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed" aria-label="Ajukan Sekarang">
//                         {loading ? <Loader2 className="animate-spin" size={18}/> : <Send size={18}/>} Ajukan Sekarang
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

'use client';

import { useState, useEffect } from 'react';
import { X, Send, Loader2, FileText, Upload, CheckCircle, Trash2, AlertCircle } from 'lucide-react';
import { api } from '@/lib/api';
import axios from 'axios'; 

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

interface CourseProposalModalProps {
    onClose: () => void;
    onSuccess: () => void;
    currentUser: any;
}

export default function CourseProposalModal({ onClose, onSuccess, currentUser }: CourseProposalModalProps) {
    const [loading, setLoading] = useState(false);
    const [configLoading, setConfigLoading] = useState(true);
    
    const [formData, setFormData] = useState({
        title: '',
        programType: 'training',
        reason: '',
    });

    const [requiredDocs, setRequiredDocs] = useState<string[]>([]);
    const [courseDocs, setCourseDocs] = useState<string[]>([]);
    const [uploadedFiles, setUploadedFiles] = useState<Record<string, { url: string, originalName: string }>>({});
    const [uploadingItem, setUploadingItem] = useState<string | null>(null);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const res = await api('/api/content');
                setRequiredDocs(res.trainingRequirements || ['Kerangka Acuan Kerja (KAK)', 'Rencana Anggaran Biaya (RAB)']);
                setCourseDocs(res.courseRequirements || []);
            } catch (e) {
                console.error("Gagal load config", e);
            } finally { setConfigLoading(false); }
        };
        fetchConfig();
    }, []);

    const handleFileUpload = async (docName: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploadingItem(docName);
        
        const fd = new FormData();
        fd.append('file', file);

        try {
            const userStr = localStorage.getItem('user');
            const token = userStr ? JSON.parse(userStr).token : '';

            const response = await axios.post(`${API_BASE_URL}/api/materials/upload`, fd, {
                headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` },
                withCredentials: true 
            });

            const result = response.data;
            // Support struktur respon yang berbeda (data.url atau url langsung)
            const fileUrl = result.data?.url || result.url;
            const fileName = result.data?.originalName || result.originalName || file.name;

            if (fileUrl) {
                setUploadedFiles(prev => ({
                    ...prev,
                    [docName]: { url: fileUrl, originalName: fileName }
                }));
            }
        } catch (err: any) {
            alert("Gagal Upload: " + (err.response?.data?.message || err.message));
        } finally {
            setUploadingItem(null);
            e.target.value = '';
        }
    };

    const removeFile = (docName: string) => {
        if(!confirm("Hapus file ini?")) return;
        const newFiles = { ...uploadedFiles };
        delete newFiles[docName];
        setUploadedFiles(newFiles);
    };

    const createSlug = (title: string) => {
        return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') + '-' + Date.now();
    };

    const handleSubmit = async () => {
        if (!formData.title || !formData.reason) return alert("Judul dan Alasan Pengajuan wajib diisi.");
        
        const currentRequirements = formData.programType === 'training' ? requiredDocs : courseDocs;
        const missingDocs = currentRequirements.filter(doc => !uploadedFiles[doc]);
        
        if (missingDocs.length > 0) return alert(`Mohon lengkapi dokumen wajib berikut:\n- ${missingDocs.join('\n- ')}`);
        
        setLoading(true);
        try {
            // [FIX] Map object ke array sesuai Schema Backend baru
            const proposalDocuments = Object.entries(uploadedFiles).map(([name, data]) => ({
                name: name, // Jenis Dokumen (misal: KAK)
                originalName: data.originalName, // Nama File Asli (misal: file.pdf)
                url: data.url
            }));

            const payload = {
                ...formData,
                slug: createSlug(formData.title),
                status: 'proposed', 
                description: `<p><strong>Alasan Pengajuan:</strong> ${formData.reason}</p>`, 
                proposalDocuments: proposalDocuments, 
                creatorInfo: currentUser
            };

            await api('/api/courses', { method: 'POST', body: payload });
            alert("✅ Pengajuan berhasil dikirim!");
            onSuccess();
        } catch (err: any) {
            alert("Gagal mengajukan: " + err.message);
        } finally { setLoading(false); }
    };

    const activeRequirements = formData.programType === 'training' ? requiredDocs : courseDocs;

    return (
        <div className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-in zoom-in-95" role="dialog" aria-modal="true">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="bg-[#990000] text-white p-5 flex justify-between items-center shrink-0">
                    <div>
                        <h2 className="text-lg font-bold">Form Pengajuan Pelatihan</h2>
                        <p className="text-xs text-red-100">Lengkapi data & dokumen pendukung.</p>
                    </div>
                    <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition-colors" title="Tutup"><X size={20}/></button>
                </div>
                <div className="p-6 space-y-6 overflow-y-auto">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Judul Usulan Pelatihan <span className="text-red-500">*</span></label>
                        <input className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-red-500 outline-none text-sm" placeholder="Contoh: Pelatihan Dasar KSR 2026" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} aria-label="Judul Pelatihan"/>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Jenis Program</label>
                        <div className="flex gap-4">
                            <label className={`flex-1 flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${formData.programType === 'training' ? 'border-red-600 bg-red-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                                <input type="radio" name="ptype" className="hidden" checked={formData.programType === 'training'} onChange={() => setFormData({...formData, programType: 'training'})}/>
                                <span className="text-sm font-bold text-gray-800">Diklat Resmi</span>
                            </label>
                            <label className={`flex-1 flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${formData.programType === 'course' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                                <input type="radio" name="ptype" className="hidden" checked={formData.programType === 'course'} onChange={() => setFormData({...formData, programType: 'course'})}/>
                                <span className="text-sm font-bold text-gray-800">Kursus Mandiri</span>
                            </label>
                        </div>
                    </div>
                    {activeRequirements.length > 0 && (
                        <div className={`p-4 rounded-xl border ${formData.programType === 'training' ? 'bg-orange-50 border-orange-200' : 'bg-blue-50 border-blue-200'} animate-in fade-in slide-in-from-top-2`}>
                            <h3 className={`font-bold mb-3 flex items-center gap-2 text-sm ${formData.programType === 'training' ? 'text-orange-800' : 'text-blue-800'}`}><FileText size={16}/> Dokumen Wajib</h3>
                            {configLoading ? <div className="text-xs"><Loader2 className="animate-spin" size={12}/> Loading...</div> : (
                                <div className="space-y-3">
                                    {activeRequirements.map((docName, idx) => (
                                        <div key={idx} className="bg-white p-3 rounded-lg border shadow-sm">
                                            <div className="flex justify-between mb-2"><span className="text-xs font-bold text-gray-700">{docName} <span className="text-red-500">*</span></span>{uploadedFiles[docName] ? <CheckCircle size={14} className="text-green-600"/> : <span className="text-[10px] bg-gray-100 px-2 rounded font-bold">Wajib</span>}</div>
                                            {uploadedFiles[docName] ? (
                                                <div className="flex items-center gap-2 bg-green-50 p-2 rounded border border-green-200">
                                                    <FileText size={14} className="text-green-600"/>
                                                    <span className="text-xs font-bold text-green-800 flex-1 truncate">{uploadedFiles[docName].originalName}</span>
                                                    <button onClick={() => removeFile(docName)} className="text-red-500 hover:text-red-700 p-1" title={`Hapus ${docName}`}><Trash2 size={14}/></button>
                                                </div>
                                            ) : (
                                                <div className="relative group">
                                                    <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => handleFileUpload(docName, e)} disabled={uploadingItem === docName} title={`Upload ${docName}`}/>
                                                    <div className="flex items-center gap-2 p-2 rounded border border-dashed bg-gray-50 hover:bg-gray-100 transition-colors">
                                                        {uploadingItem === docName ? <Loader2 className="animate-spin text-blue-600" size={16}/> : <Upload size={16} className="text-gray-400"/>}
                                                        <span className="text-xs text-gray-500">Klik untuk upload...</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Alasan Pengajuan <span className="text-red-500">*</span></label>
                        <textarea className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-red-500 outline-none h-24 text-sm" placeholder="Jelaskan alasan..." value={formData.reason} onChange={(e) => setFormData({...formData, reason: e.target.value})} aria-label="Alasan Pengajuan"></textarea>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 flex gap-3 items-start"><AlertCircle className="text-blue-600 shrink-0 mt-0.5" size={18}/><p className="text-xs text-blue-700">Pastikan semua dokumen wajib telah terupload.</p></div>
                </div>
                <div className="p-4 border-t bg-gray-50 flex justify-end gap-3 shrink-0">
                    <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-gray-300 font-bold text-sm text-gray-600 hover:bg-white" aria-label="Batal">Batal</button>
                    <button onClick={handleSubmit} disabled={loading || activeRequirements.some(doc => !uploadedFiles[doc])} className="px-6 py-2.5 rounded-xl bg-[#990000] text-white font-bold text-sm hover:bg-[#7f0000] flex items-center gap-2 disabled:opacity-50" aria-label="Ajukan Sekarang">{loading ? <Loader2 className="animate-spin" size={18}/> : <Send size={18}/>} Ajukan Sekarang</button>
                </div>
            </div>
        </div>
    );
}
// // // // // // // // // 'use client';

// // // // // // // // // import { X, FileText, CheckCircle, XCircle, Download, User, Calendar } from 'lucide-react';

// // // // // // // // // interface CourseProposalDetailModalProps {
// // // // // // // // //     course: any;
// // // // // // // // //     onClose: () => void;
// // // // // // // // //     onApprove: (course: any) => void;
// // // // // // // // //     onReject: (id: string) => void;
// // // // // // // // // }

// // // // // // // // // export default function CourseProposalDetailModal({ course, onClose, onApprove, onReject }: CourseProposalDetailModalProps) {
// // // // // // // // //     if (!course) return null;

// // // // // // // // //     return (
// // // // // // // // //         <div className="fixed inset-0 bg-black/70 z-[110] flex items-center justify-center p-4 backdrop-blur-sm animate-in zoom-in-95">
// // // // // // // // //             <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                
// // // // // // // // //                 {/* Header */}
// // // // // // // // //                 <div className="bg-orange-50 p-5 border-b border-orange-100 flex justify-between items-center">
// // // // // // // // //                     <div>
// // // // // // // // //                         <h2 className="text-lg font-bold text-orange-900">Review Pengajuan Pelatihan</h2>
// // // // // // // // //                         <p className="text-xs text-orange-700">Verifikasi dokumen sebelum menyetujui.</p>
// // // // // // // // //                     </div>
// // // // // // // // //                     {/* [FIX] Tambahkan title dan aria-label */}
// // // // // // // // //                     <button 
// // // // // // // // //                         onClick={onClose} 
// // // // // // // // //                         className="p-2 hover:bg-orange-100 rounded-full text-orange-800 transition-colors"
// // // // // // // // //                         title="Tutup Modal"
// // // // // // // // //                         aria-label="Tutup Modal"
// // // // // // // // //                     >
// // // // // // // // //                         <X size={20}/>
// // // // // // // // //                     </button>
// // // // // // // // //                 </div>

// // // // // // // // //                 {/* Body */}
// // // // // // // // //                 <div className="p-6 overflow-y-auto space-y-6">
                    
// // // // // // // // //                     {/* Info Utama */}
// // // // // // // // //                     <div className="flex gap-4 items-start">
// // // // // // // // //                         <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
// // // // // // // // //                             <User size={24}/>
// // // // // // // // //                         </div>
// // // // // // // // //                         <div>
// // // // // // // // //                             <h3 className="font-bold text-gray-900 text-lg">{course.title}</h3>
// // // // // // // // //                             <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
// // // // // // // // //                                 <span className="font-semibold">{course.creatorInfo?.name || 'User'}</span>
// // // // // // // // //                                 <span>•</span>
// // // // // // // // //                                 <span>{course.creatorInfo?.email}</span>
// // // // // // // // //                             </div>
// // // // // // // // //                             <div className="mt-2 flex gap-2">
// // // // // // // // //                                 <span className={`px-2 py-1 rounded text-xs font-bold border ${course.programType==='training'?'bg-blue-50 text-blue-700 border-blue-200':'bg-purple-50 text-purple-700 border-purple-200'}`}>
// // // // // // // // //                                     {course.programType === 'training' ? 'Diklat Resmi' : 'Kursus Mandiri'}
// // // // // // // // //                                 </span>
// // // // // // // // //                                 <span className="px-2 py-1 rounded text-xs font-bold bg-gray-100 text-gray-600 flex items-center gap-1">
// // // // // // // // //                                     <Calendar size={12}/> Diajukan: {new Date(course.createdAt).toLocaleDateString('id-ID')}
// // // // // // // // //                                 </span>
// // // // // // // // //                             </div>
// // // // // // // // //                         </div>
// // // // // // // // //                     </div>

// // // // // // // // //                     {/* Alasan Pengajuan */}
// // // // // // // // //                     <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
// // // // // // // // //                         <h4 className="text-sm font-bold text-gray-700 mb-2">Latar Belakang / Tujuan</h4>
// // // // // // // // //                         <div className="text-sm text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: course.description }} />
// // // // // // // // //                     </div>

// // // // // // // // //                     {/* Dokumen Lampiran */}
// // // // // // // // //                     <div>
// // // // // // // // //                         <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
// // // // // // // // //                             <FileText size={16}/> Dokumen Pendukung
// // // // // // // // //                         </h4>
                        
// // // // // // // // //                         {!course.proposalDocuments || course.proposalDocuments.length === 0 ? (
// // // // // // // // //                             <div className="p-4 border-2 border-dashed border-gray-200 rounded-xl text-center text-gray-400 text-sm italic">
// // // // // // // // //                                 Tidak ada dokumen yang dilampirkan.
// // // // // // // // //                             </div>
// // // // // // // // //                         ) : (
// // // // // // // // //                             <div className="grid gap-3">
// // // // // // // // //                                 {course.proposalDocuments.map((doc: any, idx: number) => (
// // // // // // // // //                                     <div key={idx} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
// // // // // // // // //                                         <div className="flex items-center gap-3 overflow-hidden">
// // // // // // // // //                                             <div className="bg-red-50 p-2 rounded text-red-600"><FileText size={18}/></div>
// // // // // // // // //                                             <span className="text-sm font-medium text-gray-700 truncate max-w-[200px] md:max-w-xs" title={doc.name}>
// // // // // // // // //                                                 {doc.name}
// // // // // // // // //                                             </span>
// // // // // // // // //                                         </div>
// // // // // // // // //                                         <a 
// // // // // // // // //                                             href={doc.url} 
// // // // // // // // //                                             target="_blank" 
// // // // // // // // //                                             rel="noopener noreferrer"
// // // // // // // // //                                             className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 transition-colors"
// // // // // // // // //                                             title="Download Dokumen"
// // // // // // // // //                                             aria-label="Download Dokumen"
// // // // // // // // //                                         >
// // // // // // // // //                                             <Download size={12}/> Lihat / Download
// // // // // // // // //                                         </a>
// // // // // // // // //                                     </div>
// // // // // // // // //                                 ))}
// // // // // // // // //                             </div>
// // // // // // // // //                         )}
// // // // // // // // //                     </div>
// // // // // // // // //                 </div>

// // // // // // // // //                 {/* Footer Action */}
// // // // // // // // //                 <div className="p-5 border-t bg-gray-50 flex justify-end gap-3">
// // // // // // // // //                     <button 
// // // // // // // // //                         onClick={() => onReject(course._id)} 
// // // // // // // // //                         className="px-5 py-2.5 rounded-xl border border-red-200 text-red-600 font-bold text-sm hover:bg-red-50 flex items-center gap-2"
// // // // // // // // //                         title="Tolak Pengajuan"
// // // // // // // // //                     >
// // // // // // // // //                         <XCircle size={18}/> Tolak Pengajuan
// // // // // // // // //                     </button>
// // // // // // // // //                     <button 
// // // // // // // // //                         onClick={() => onApprove(course)} 
// // // // // // // // //                         className="px-6 py-2.5 rounded-xl bg-green-600 text-white font-bold text-sm hover:bg-green-700 shadow-lg flex items-center gap-2"
// // // // // // // // //                         title="Setujui Pengajuan"
// // // // // // // // //                     >
// // // // // // // // //                         <CheckCircle size={18}/> Setujui & Proses
// // // // // // // // //                     </button>
// // // // // // // // //                 </div>
// // // // // // // // //             </div>
// // // // // // // // //         </div>
// // // // // // // // //     );
// // // // // // // // // }

// // // // // // // // 'use client';

// // // // // // // // import { useState, useRef, useEffect } from 'react';
// // // // // // // // import { X, FileText, CheckCircle, Undo2, User, Calendar, ExternalLink, AlertTriangle, Upload, MessageSquare, Loader2, Image as ImageIcon, Send } from 'lucide-react';
// // // // // // // // import { api } from '@/lib/api'; 
// // // // // // // // import axios from 'axios';

// // // // // // // // const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// // // // // // // // interface CourseProposalDetailModalProps {
// // // // // // // //     course: any;
// // // // // // // //     onClose: () => void;
// // // // // // // //     onApprove: (course: any) => void;
// // // // // // // //     onReject: (course: any) => void; 
// // // // // // // //     currentUser: any;
// // // // // // // //     refreshData?: () => void;
// // // // // // // //     isReadOnly?: boolean;
// // // // // // // // }

// // // // // // // // export default function CourseProposalDetailModal({ 
// // // // // // // //     course, onClose, onApprove, onReject, currentUser, refreshData, isReadOnly = false 
// // // // // // // // }: CourseProposalDetailModalProps) {
// // // // // // // //     const [newMessage, setNewMessage] = useState('');
// // // // // // // //     const [sending, setSending] = useState(false);
// // // // // // // //     const [uploading, setUploading] = useState(false);
    
// // // // // // // //     // Fallback array jika null
// // // // // // // //     const [localDocuments, setLocalDocuments] = useState(course.proposalDocuments || []);
// // // // // // // //     const [localHistory, setLocalHistory] = useState(course.feedbackHistory || []);

// // // // // // // //     const chatContainerRef = useRef<HTMLDivElement>(null);

// // // // // // // //     useEffect(() => {
// // // // // // // //         if (chatContainerRef.current) {
// // // // // // // //             chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
// // // // // // // //         }
// // // // // // // //     }, [localHistory]);

// // // // // // // //     if (!course) return null;

// // // // // // // //     const isAdminOrSuper = currentUser && ['ADMIN', 'SUPER_ADMIN'].includes(currentUser.role);

// // // // // // // //     const getFileType = (url: string) => {
// // // // // // // //         const ext = url.split('.').pop()?.toLowerCase();
// // // // // // // //         if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext || '')) return 'image';
// // // // // // // //         if (ext === 'pdf') return 'pdf';
// // // // // // // //         return 'file';
// // // // // // // //     };

// // // // // // // //     const handleSendFeedback = async () => {
// // // // // // // //         if (!newMessage.trim()) return;
// // // // // // // //         setSending(true);
// // // // // // // //         try {
// // // // // // // //             const feedbackItem = {
// // // // // // // //                 senderName: currentUser?.name || 'Admin',
// // // // // // // //                 role: currentUser?.role || 'ADMIN',
// // // // // // // //                 message: newMessage,
// // // // // // // //                 createdAt: new Date()
// // // // // // // //             };
// // // // // // // //             const updatedHistory = [...localHistory, feedbackItem];
// // // // // // // //             await api(`/api/courses/${course._id}`, { method: 'PATCH', body: { feedbackHistory: updatedHistory } });
// // // // // // // //             setLocalHistory(updatedHistory);
// // // // // // // //             setNewMessage('');
// // // // // // // //         } catch (e) { alert("Gagal mengirim pesan."); } finally { setSending(false); }
// // // // // // // //     };

// // // // // // // //     const handleUploadSusulan = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // //         const file = e.target.files?.[0];
// // // // // // // //         if (!file) return;
// // // // // // // //         setUploading(true);
// // // // // // // //         const fd = new FormData();
// // // // // // // //         fd.append('file', file);

// // // // // // // //         try {
// // // // // // // //             const userStr = localStorage.getItem('user');
// // // // // // // //             const token = userStr ? JSON.parse(userStr).token : '';
// // // // // // // //             const response = await axios.post(`${API_BASE_URL}/api/materials/upload`, fd, {
// // // // // // // //                 headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` }
// // // // // // // //             });

// // // // // // // //             const fileUrl = response.data.data?.url || response.data.url;
// // // // // // // //             const fileName = response.data.data?.originalName || file.name;

// // // // // // // //             if (fileUrl) {
// // // // // // // //                 const newDoc = { name: fileName, originalName: fileName, url: fileUrl }; // Simpan nama asli
// // // // // // // //                 const updatedDocs = [...localDocuments, newDoc];
// // // // // // // //                 const autoMsg = {
// // // // // // // //                     senderName: "System", role: "SYSTEM",
// // // // // // // //                     message: `📄 Mengunggah dokumen susulan: ${fileName}`, createdAt: new Date()
// // // // // // // //                 };
// // // // // // // //                 const newHistory = [...localHistory, autoMsg];

// // // // // // // //                 await api(`/api/courses/${course._id}`, {
// // // // // // // //                     method: 'PATCH',
// // // // // // // //                     body: { proposalDocuments: updatedDocs, feedbackHistory: newHistory }
// // // // // // // //                 });

// // // // // // // //                 setLocalDocuments(updatedDocs);
// // // // // // // //                 setLocalHistory(newHistory);
// // // // // // // //             }
// // // // // // // //         } catch (err: any) { alert("Gagal Upload: " + err.message); } finally {
// // // // // // // //             setUploading(false);
// // // // // // // //             e.target.value = '';
// // // // // // // //         }
// // // // // // // //     };

// // // // // // // //     return (
// // // // // // // //         <div className="fixed inset-0 bg-black/70 z-[110] flex items-center justify-center p-4 backdrop-blur-sm animate-in zoom-in-95">
// // // // // // // //             <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
// // // // // // // //                 <div className="bg-white p-5 border-b border-gray-100 flex justify-between items-center shadow-sm z-10">
// // // // // // // //                     <div>
// // // // // // // //                         <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
// // // // // // // //                             {isReadOnly ? 'Histori Pengajuan' : 'Review & Diskusi Pengajuan'}
// // // // // // // //                             <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full uppercase border border-orange-200">{course.status}</span>
// // // // // // // //                         </h2>
// // // // // // // //                     </div>
// // // // // // // //                     <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors" title="Tutup"><X size={20}/></button>
// // // // // // // //                 </div>

// // // // // // // //                 <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
// // // // // // // //                     {/* KOLOM KIRI */}
// // // // // // // //                     <div className="flex-1 overflow-y-auto p-6 bg-gray-50 space-y-6 border-r border-gray-200">
// // // // // // // //                         <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
// // // // // // // //                             <h3 className="font-bold text-lg text-gray-800 mb-2">{course.title}</h3>
// // // // // // // //                             <div className="text-sm text-gray-600 leading-relaxed mb-4">
// // // // // // // //                                 <div dangerouslySetInnerHTML={{ __html: course.description }} />
// // // // // // // //                             </div>
// // // // // // // //                             <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
// // // // // // // //                                 <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-bold">
// // // // // // // //                                     {course.creatorInfo?.name?.charAt(0) || 'U'}
// // // // // // // //                                 </div>
// // // // // // // //                                 <div className="text-xs">
// // // // // // // //                                     <div className="font-bold text-gray-700">{course.creatorInfo?.name}</div>
// // // // // // // //                                     <div className="text-gray-500">{course.creatorInfo?.email}</div>
// // // // // // // //                                 </div>
// // // // // // // //                             </div>
// // // // // // // //                         </div>

// // // // // // // //                         {/* LIST DOKUMEN */}
// // // // // // // //                         <div>
// // // // // // // //                             <div className="flex justify-between items-center mb-3">
// // // // // // // //                                 <h4 className="text-sm font-bold text-gray-700 flex items-center gap-2"><FileText size={16}/> Dokumen Pendukung ({localDocuments.length})</h4>
// // // // // // // //                                 {!isReadOnly && (
// // // // // // // //                                     <div className="relative">
// // // // // // // //                                         <input type="file" onChange={handleUploadSusulan} disabled={uploading} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" title="Upload"/>
// // // // // // // //                                         <button className="flex items-center gap-1 text-[10px] font-bold bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors">
// // // // // // // //                                             {uploading ? <Loader2 size={12} className="animate-spin"/> : <Upload size={12}/>} Upload Susulan
// // // // // // // //                                         </button>
// // // // // // // //                                     </div>
// // // // // // // //                                 )}
// // // // // // // //                             </div>
                            
// // // // // // // //                             {localDocuments.length === 0 ? (
// // // // // // // //                                 <div className="p-6 border-2 border-dashed border-gray-200 rounded-xl text-center text-gray-400 text-sm italic bg-white">
// // // // // // // //                                     <AlertTriangle size={20} className="mx-auto mb-2 text-gray-300"/> Belum ada dokumen.
// // // // // // // //                                 </div>
// // // // // // // //                             ) : (
// // // // // // // //                                 <div className="space-y-3">
// // // // // // // //                                     {localDocuments.map((doc: any, idx: number) => {
// // // // // // // //                                         const type = getFileType(doc.url);
// // // // // // // //                                         // [FIX] Menggunakan originalName untuk judul
// // // // // // // //                                         const displayName = doc.originalName || doc.name;
// // // // // // // //                                         const displayType = doc.originalName ? doc.name : 'Dokumen'; // Jika ada originalName, 'name' jadi label tipe (misal: KAK)

// // // // // // // //                                         return (
// // // // // // // //                                             <div key={idx} className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all">
// // // // // // // //                                                 <div className="flex items-start gap-3">
// // // // // // // //                                                     <div className={`p-2 rounded-lg shrink-0 ${type === 'pdf' ? 'bg-red-50 text-red-600' : type === 'image' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>
// // // // // // // //                                                         {type === 'image' ? <ImageIcon size={20}/> : <FileText size={20}/>}
// // // // // // // //                                                     </div>
// // // // // // // //                                                     <div className="flex-1 min-w-0">
// // // // // // // //                                                         <p className="text-sm font-bold text-gray-700 truncate" title={displayName}>{displayName}</p>
// // // // // // // //                                                         <p className="text-[10px] text-gray-400 uppercase mt-0.5">{displayType}</p>
// // // // // // // //                                                         {type === 'image' && (
// // // // // // // //                                                             <div className="mt-2 mb-2 rounded-lg overflow-hidden border border-gray-100 w-fit">
// // // // // // // //                                                                 <img src={doc.url} alt="Preview" className="h-32 w-auto object-cover"/>
// // // // // // // //                                                             </div>
// // // // // // // //                                                         )}
// // // // // // // //                                                         <div className="mt-2">
// // // // // // // //                                                             <a href={doc.url} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1.5 rounded transition-colors ${type === 'pdf' ? 'bg-red-50 text-red-700 hover:bg-red-100' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}`}>
// // // // // // // //                                                                 <ExternalLink size={10}/> {type === 'image' ? 'Lihat Full Size' : 'Download File'}
// // // // // // // //                                                             </a>
// // // // // // // //                                                         </div>
// // // // // // // //                                                     </div>
// // // // // // // //                                                 </div>
// // // // // // // //                                             </div>
// // // // // // // //                                         );
// // // // // // // //                                     })}
// // // // // // // //                                 </div>
// // // // // // // //                             )}
// // // // // // // //                         </div>
// // // // // // // //                     </div>

// // // // // // // //                     {/* KOLOM KANAN */}
// // // // // // // //                     <div className="w-full md:w-[350px] flex flex-col bg-white border-l border-gray-200 h-[600px] md:h-auto">
// // // // // // // //                         <div className="p-3 bg-gray-50 border-b border-gray-200 font-bold text-xs text-gray-500 uppercase tracking-wider flex items-center gap-2">
// // // // // // // //                             <MessageSquare size={14}/> Catatan & Feedback
// // // // // // // //                         </div>
// // // // // // // //                         <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
// // // // // // // //                             {localHistory.length === 0 && <div className="text-center text-gray-400 text-xs italic mt-10">Belum ada catatan.</div>}
// // // // // // // //                             {localHistory.map((msg: any, idx: number) => {
// // // // // // // //                                 const isMe = currentUser && msg.senderName === currentUser.name;
// // // // // // // //                                 const isSystem = msg.role === 'SYSTEM';
// // // // // // // //                                 if (isSystem) return <div key={idx} className="flex justify-center my-2"><span className="text-[10px] bg-gray-100 text-gray-500 px-3 py-1 rounded-full border border-gray-200">{msg.message}</span></div>;
// // // // // // // //                                 return (
// // // // // // // //                                     <div key={idx} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
// // // // // // // //                                         <div className={`max-w-[90%] p-3 rounded-2xl text-sm shadow-sm ${isMe ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-gray-100 text-gray-800 rounded-tl-none'}`}>
// // // // // // // //                                             {msg.message}
// // // // // // // //                                         </div>
// // // // // // // //                                         <span className="text-[10px] text-gray-400 mt-1 px-1">
// // // // // // // //                                             {isMe ? 'Anda' : msg.senderName} • {new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
// // // // // // // //                                         </span>
// // // // // // // //                                     </div>
// // // // // // // //                                 );
// // // // // // // //                             })}
// // // // // // // //                         </div>
// // // // // // // //                         {!isReadOnly && (
// // // // // // // //                             <div className="p-3 border-t border-gray-200 bg-gray-50">
// // // // // // // //                                 <div className="flex gap-2">
// // // // // // // //                                     <input type="text" className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tulis catatan..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendFeedback()}/>
// // // // // // // //                                     <button onClick={handleSendFeedback} disabled={sending || !newMessage.trim()} className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors" title="Kirim" aria-label="Kirim">
// // // // // // // //                                         {sending ? <Loader2 size={18} className="animate-spin"/> : <Send size={18}/>}
// // // // // // // //                                     </button>
// // // // // // // //                                 </div>
// // // // // // // //                             </div>
// // // // // // // //                         )}
// // // // // // // //                     </div>
// // // // // // // //                 </div>

// // // // // // // //                 <div className="p-4 border-t bg-white flex justify-end gap-3 shrink-0">
// // // // // // // //                     <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-colors">Tutup</button>
// // // // // // // //                     {!isReadOnly && isAdminOrSuper && (
// // // // // // // //                         <>
// // // // // // // //                             <button onClick={() => onReject(course)} className="px-5 py-2.5 rounded-xl border border-yellow-200 text-yellow-700 font-bold text-sm hover:bg-yellow-50 flex items-center gap-2">
// // // // // // // //                                 <Undo2 size={18}/> Kembalikan
// // // // // // // //                             </button>
// // // // // // // //                             <button onClick={() => onApprove(course)} className="px-6 py-2.5 rounded-xl bg-green-600 text-white font-bold text-sm hover:bg-green-700 shadow-lg flex items-center gap-2">
// // // // // // // //                                 <CheckCircle size={18}/> Setujui
// // // // // // // //                             </button>
// // // // // // // //                         </>
// // // // // // // //                     )}
// // // // // // // //                 </div>
// // // // // // // //             </div>
// // // // // // // //         </div>
// // // // // // // //     );
// // // // // // // // }


// // // // // // // 'use client';

// // // // // // // import { useState, useRef, useEffect } from 'react';
// // // // // // // import { X, FileText, CheckCircle, Undo2, User, Calendar, ExternalLink, AlertTriangle, Upload, MessageSquare, Loader2, Image as ImageIcon, Send } from 'lucide-react';
// // // // // // // import { api } from '@/lib/api'; 
// // // // // // // import axios from 'axios';

// // // // // // // const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// // // // // // // interface CourseProposalDetailModalProps {
// // // // // // //     course: any;
// // // // // // //     onClose: () => void;
// // // // // // //     onApprove: (course: any) => void;
// // // // // // //     onReject: (course: any) => void; 
// // // // // // //     currentUser: any;
// // // // // // //     refreshData?: () => void;
// // // // // // //     isReadOnly?: boolean;
// // // // // // // }

// // // // // // // export default function CourseProposalDetailModal({ 
// // // // // // //     course, onClose, onApprove, onReject, currentUser, refreshData, isReadOnly = false 
// // // // // // // }: CourseProposalDetailModalProps) {
// // // // // // //     const [newMessage, setNewMessage] = useState('');
// // // // // // //     const [sending, setSending] = useState(false);
// // // // // // //     const [uploading, setUploading] = useState(false);
    
// // // // // // //     const [localDocuments, setLocalDocuments] = useState(course.proposalDocuments || []);
// // // // // // //     const [localHistory, setLocalHistory] = useState(course.feedbackHistory || []);

// // // // // // //     const chatContainerRef = useRef<HTMLDivElement>(null);

// // // // // // //     useEffect(() => {
// // // // // // //         if (chatContainerRef.current) {
// // // // // // //             chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
// // // // // // //         }
// // // // // // //     }, [localHistory]);

// // // // // // //     if (!course) return null;

// // // // // // //     const isAdminOrSuper = currentUser && ['ADMIN', 'SUPER_ADMIN'].includes(currentUser.role);

// // // // // // //     const getFileType = (url: string) => {
// // // // // // //         const ext = url.split('.').pop()?.toLowerCase();
// // // // // // //         if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext || '')) return 'image';
// // // // // // //         if (ext === 'pdf') return 'pdf';
// // // // // // //         return 'file';
// // // // // // //     };

// // // // // // //     const handleSendFeedback = async () => {
// // // // // // //         if (!newMessage.trim()) return;
// // // // // // //         setSending(true);
// // // // // // //         try {
// // // // // // //             const feedbackItem = {
// // // // // // //                 senderName: currentUser?.name || 'Admin',
// // // // // // //                 role: currentUser?.role || 'ADMIN',
// // // // // // //                 message: newMessage,
// // // // // // //                 createdAt: new Date()
// // // // // // //             };
// // // // // // //             const updatedHistory = [...localHistory, feedbackItem];
// // // // // // //             await api(`/api/courses/${course._id}`, { method: 'PATCH', body: { feedbackHistory: updatedHistory } });
// // // // // // //             setLocalHistory(updatedHistory);
// // // // // // //             setNewMessage('');
// // // // // // //         } catch (e) { alert("Gagal mengirim pesan."); } finally { setSending(false); }
// // // // // // //     };

// // // // // // //     const handleUploadSusulan = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // //         const file = e.target.files?.[0];
// // // // // // //         if (!file) return;
        
// // // // // // //         // [FIX] Cek Token Sebelum Upload
// // // // // // //         const userStr = localStorage.getItem('user');
// // // // // // //         const token = userStr ? JSON.parse(userStr).token : null;

// // // // // // //         if (!token) {
// // // // // // //             alert("Sesi Anda telah habis. Silakan Logout dan Login kembali.");
// // // // // // //             return;
// // // // // // //         }

// // // // // // //         setUploading(true);
// // // // // // //         const fd = new FormData();
// // // // // // //         fd.append('file', file);

// // // // // // //         try {
// // // // // // //             const response = await axios.post(`${API_BASE_URL}/api/materials/upload`, fd, {
// // // // // // //                 headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` }
// // // // // // //             });

// // // // // // //             // [FIX] Handle struktur response yang mungkin berbeda
// // // // // // //             const resultData = response.data;
// // // // // // //             // Cek apakah url ada di root atau di dalam object data
// // // // // // //             const fileUrl = resultData.data?.url || resultData.url;
// // // // // // //             const fileName = resultData.data?.originalName || resultData.originalName || file.name;

// // // // // // //             if (fileUrl) {
// // // // // // //                 const newDoc = { name: fileName, originalName: fileName, url: fileUrl };
// // // // // // //                 const updatedDocs = [...localDocuments, newDoc];
                
// // // // // // //                 const autoMsg = {
// // // // // // //                     senderName: "System", role: "SYSTEM",
// // // // // // //                     message: `📄 Mengunggah dokumen susulan: ${fileName}`, createdAt: new Date()
// // // // // // //                 };
// // // // // // //                 const newHistory = [...localHistory, autoMsg];

// // // // // // //                 await api(`/api/courses/${course._id}`, {
// // // // // // //                     method: 'PATCH',
// // // // // // //                     body: { proposalDocuments: updatedDocs, feedbackHistory: newHistory }
// // // // // // //                 });

// // // // // // //                 setLocalDocuments(updatedDocs);
// // // // // // //                 setLocalHistory(newHistory);
// // // // // // //             } else {
// // // // // // //                 throw new Error("URL File tidak ditemukan dalam respon server");
// // // // // // //             }
// // // // // // //         } catch (err: any) { 
// // // // // // //             console.error(err);
// // // // // // //             // Pesan error lebih detail
// // // // // // //             const msg = err.response?.data?.message || err.message || "Gagal Upload";
// // // // // // //             alert(`Gagal Upload: ${msg}. Coba login ulang.`);
// // // // // // //         } finally {
// // // // // // //             setUploading(false);
// // // // // // //             e.target.value = '';
// // // // // // //         }
// // // // // // //     };

// // // // // // //     return (
// // // // // // //         <div className="fixed inset-0 bg-black/70 z-[110] flex items-center justify-center p-4 backdrop-blur-sm animate-in zoom-in-95">
// // // // // // //             <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                
// // // // // // //                 <div className="bg-white p-5 border-b border-gray-100 flex justify-between items-center shadow-sm z-10">
// // // // // // //                     <div>
// // // // // // //                         <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
// // // // // // //                             {isReadOnly ? 'Histori Pengajuan' : 'Review & Diskusi Pengajuan'}
// // // // // // //                             <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full uppercase border border-orange-200">
// // // // // // //                                 {course.status}
// // // // // // //                             </span>
// // // // // // //                         </h2>
// // // // // // //                     </div>
// // // // // // //                     <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors" title="Tutup"><X size={20}/></button>
// // // // // // //                 </div>

// // // // // // //                 <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
// // // // // // //                     {/* KOLOM KIRI */}
// // // // // // //                     <div className="flex-1 overflow-y-auto p-6 bg-gray-50 space-y-6 border-r border-gray-200">
// // // // // // //                         <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
// // // // // // //                             <h3 className="font-bold text-lg text-gray-800 mb-2">{course.title}</h3>
// // // // // // //                             <div className="text-sm text-gray-600 leading-relaxed mb-4">
// // // // // // //                                 <div dangerouslySetInnerHTML={{ __html: course.description }} />
// // // // // // //                             </div>
// // // // // // //                             <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
// // // // // // //                                 <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-bold">
// // // // // // //                                     {course.creatorInfo?.name?.charAt(0) || 'U'}
// // // // // // //                                 </div>
// // // // // // //                                 <div className="text-xs">
// // // // // // //                                     <div className="font-bold text-gray-700">{course.creatorInfo?.name}</div>
// // // // // // //                                     <div className="text-gray-500">{course.creatorInfo?.email}</div>
// // // // // // //                                 </div>
// // // // // // //                             </div>
// // // // // // //                         </div>

// // // // // // //                         <div>
// // // // // // //                             <div className="flex justify-between items-center mb-3">
// // // // // // //                                 <h4 className="text-sm font-bold text-gray-700 flex items-center gap-2"><FileText size={16}/> Dokumen Pendukung ({localDocuments.length})</h4>
// // // // // // //                                 {!isReadOnly && (
// // // // // // //                                     <div className="relative">
// // // // // // //                                         <input type="file" onChange={handleUploadSusulan} disabled={uploading} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" title="Upload"/>
// // // // // // //                                         <button className="flex items-center gap-1 text-[10px] font-bold bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors">
// // // // // // //                                             {uploading ? <Loader2 size={12} className="animate-spin"/> : <Upload size={12}/>} Upload Susulan
// // // // // // //                                         </button>
// // // // // // //                                     </div>
// // // // // // //                                 )}
// // // // // // //                             </div>
                            
// // // // // // //                             {localDocuments.length === 0 ? (
// // // // // // //                                 <div className="p-6 border-2 border-dashed border-gray-200 rounded-xl text-center text-gray-400 text-sm italic bg-white">
// // // // // // //                                     <AlertTriangle size={20} className="mx-auto mb-2 text-gray-300"/> Belum ada dokumen.
// // // // // // //                                 </div>
// // // // // // //                             ) : (
// // // // // // //                                 <div className="space-y-3">
// // // // // // //                                     {localDocuments.map((doc: any, idx: number) => {
// // // // // // //                                         const type = getFileType(doc.url);
// // // // // // //                                         const displayName = doc.originalName || doc.name;
// // // // // // //                                         const displayType = doc.originalName ? doc.name : 'Dokumen';

// // // // // // //                                         return (
// // // // // // //                                             <div key={idx} className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all">
// // // // // // //                                                 <div className="flex items-start gap-3">
// // // // // // //                                                     <div className={`p-2 rounded-lg shrink-0 ${type === 'pdf' ? 'bg-red-50 text-red-600' : type === 'image' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>
// // // // // // //                                                         {type === 'image' ? <ImageIcon size={20}/> : <FileText size={20}/>}
// // // // // // //                                                     </div>
// // // // // // //                                                     <div className="flex-1 min-w-0">
// // // // // // //                                                         <p className="text-sm font-bold text-gray-700 truncate" title={displayName}>{displayName}</p>
// // // // // // //                                                         <p className="text-[10px] text-gray-400 uppercase mt-0.5">{displayType}</p>
// // // // // // //                                                         {type === 'image' && (
// // // // // // //                                                             <div className="mt-2 mb-2 rounded-lg overflow-hidden border border-gray-100 w-fit">
// // // // // // //                                                                 <img src={doc.url} alt="Preview" className="h-32 w-auto object-cover"/>
// // // // // // //                                                             </div>
// // // // // // //                                                         )}
// // // // // // //                                                         <div className="mt-2">
// // // // // // //                                                             <a href={doc.url} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1.5 rounded transition-colors ${type === 'pdf' ? 'bg-red-50 text-red-700 hover:bg-red-100' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}`}>
// // // // // // //                                                                 <ExternalLink size={10}/> {type === 'image' ? 'Lihat Full Size' : 'Download File'}
// // // // // // //                                                             </a>
// // // // // // //                                                         </div>
// // // // // // //                                                     </div>
// // // // // // //                                                 </div>
// // // // // // //                                             </div>
// // // // // // //                                         );
// // // // // // //                                     })}
// // // // // // //                                 </div>
// // // // // // //                             )}
// // // // // // //                         </div>
// // // // // // //                     </div>

// // // // // // //                     {/* KOLOM KANAN */}
// // // // // // //                     <div className="w-full md:w-[350px] flex flex-col bg-white border-l border-gray-200 h-[600px] md:h-auto">
// // // // // // //                         <div className="p-3 bg-gray-50 border-b border-gray-200 font-bold text-xs text-gray-500 uppercase tracking-wider flex items-center gap-2">
// // // // // // //                             <MessageSquare size={14}/> Catatan & Feedback
// // // // // // //                         </div>
// // // // // // //                         <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
// // // // // // //                             {localHistory.length === 0 && <div className="text-center text-gray-400 text-xs italic mt-10">Belum ada catatan.</div>}
// // // // // // //                             {localHistory.map((msg: any, idx: number) => {
// // // // // // //                                 const isMe = currentUser && msg.senderName === currentUser.name;
// // // // // // //                                 const isSystem = msg.role === 'SYSTEM';
// // // // // // //                                 if (isSystem) return <div key={idx} className="flex justify-center my-2"><span className="text-[10px] bg-gray-100 text-gray-500 px-3 py-1 rounded-full border border-gray-200">{msg.message}</span></div>;
// // // // // // //                                 return (
// // // // // // //                                     <div key={idx} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
// // // // // // //                                         <div className={`max-w-[90%] p-3 rounded-2xl text-sm shadow-sm ${isMe ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-gray-100 text-gray-800 rounded-tl-none'}`}>
// // // // // // //                                             {msg.message}
// // // // // // //                                         </div>
// // // // // // //                                         <span className="text-[10px] text-gray-400 mt-1 px-1">
// // // // // // //                                             {isMe ? 'Anda' : msg.senderName} • {new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
// // // // // // //                                         </span>
// // // // // // //                                     </div>
// // // // // // //                                 );
// // // // // // //                             })}
// // // // // // //                         </div>
// // // // // // //                         {!isReadOnly && (
// // // // // // //                             <div className="p-3 border-t border-gray-200 bg-gray-50">
// // // // // // //                                 <div className="flex gap-2">
// // // // // // //                                     <input type="text" className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tulis catatan..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendFeedback()}/>
// // // // // // //                                     <button onClick={handleSendFeedback} disabled={sending || !newMessage.trim()} className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors" title="Kirim" aria-label="Kirim">
// // // // // // //                                         {sending ? <Loader2 size={18} className="animate-spin"/> : <Send size={18}/>}
// // // // // // //                                     </button>
// // // // // // //                                 </div>
// // // // // // //                             </div>
// // // // // // //                         )}
// // // // // // //                     </div>
// // // // // // //                 </div>

// // // // // // //                 <div className="p-4 border-t bg-white flex justify-end gap-3 shrink-0">
// // // // // // //                     <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-colors">Tutup</button>
// // // // // // //                     {!isReadOnly && isAdminOrSuper && (
// // // // // // //                         <>
// // // // // // //                             <button onClick={() => onReject(course)} className="px-5 py-2.5 rounded-xl border border-yellow-200 text-yellow-700 font-bold text-sm hover:bg-yellow-50 flex items-center gap-2">
// // // // // // //                                 <Undo2 size={18}/> Kembalikan
// // // // // // //                             </button>
// // // // // // //                             <button onClick={() => onApprove(course)} className="px-6 py-2.5 rounded-xl bg-green-600 text-white font-bold text-sm hover:bg-green-700 shadow-lg flex items-center gap-2">
// // // // // // //                                 <CheckCircle size={18}/> Setujui
// // // // // // //                             </button>
// // // // // // //                         </>
// // // // // // //                     )}
// // // // // // //                 </div>
// // // // // // //             </div>
// // // // // // //         </div>
// // // // // // //     );
// // // // // // // }



// // // // // // 'use client';

// // // // // // import { useState, useRef, useEffect } from 'react';
// // // // // // import { X, FileText, CheckCircle, Undo2, MessageSquare, Loader2, Image as ImageIcon, Send, ExternalLink, AlertTriangle, Upload } from 'lucide-react';
// // // // // // import { api } from '@/lib/api'; 
// // // // // // import axios from 'axios';

// // // // // // const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// // // // // // interface CourseProposalDetailModalProps {
// // // // // //     course: any;
// // // // // //     onClose: () => void;
// // // // // //     onApprove: (course: any) => void;
// // // // // //     onReject: (course: any) => void; 
// // // // // //     currentUser: any;
// // // // // //     refreshData?: () => void;
// // // // // //     isReadOnly?: boolean;
// // // // // // }

// // // // // // export default function CourseProposalDetailModal({ 
// // // // // //     course, onClose, onApprove, onReject, currentUser, refreshData, isReadOnly = false 
// // // // // // // }: CourseProposalDetailModalProps) {
// // // // // // //     const [newMessage, setNewMessage] = useState('');
// // // // // // //     const [sending, setSending] = useState(false);
// // // // // // //     const [uploading, setUploading] = useState(false);
    
// // // // // // //     const [localDocuments, setLocalDocuments] = useState(course.proposalDocuments || []);
// // // // // // //     const [localHistory, setLocalHistory] = useState(course.feedbackHistory || []);

// // // // // // //     const chatContainerRef = useRef<HTMLDivElement>(null);

// // // // // // //     useEffect(() => {
// // // // // // //         if (chatContainerRef.current) {
// // // // // // //             chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
// // // // // // //         }
// // // // // // //     }, [localHistory]);

// // // // // // //     if (!course) return null;

// // // // // // //     const isAdminOrSuper = currentUser && ['ADMIN', 'SUPER_ADMIN'].includes(currentUser.role);

// // // // // // //     const getFileType = (url: string) => {
// // // // // // //         const ext = url.split('.').pop()?.toLowerCase();
// // // // // // //         if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext || '')) return 'image';
// // // // // // //         if (ext === 'pdf') return 'pdf';
// // // // // // //         return 'file';
// // // // // // //     };

// // // // // // //     const handleSendFeedback = async () => {
// // // // // // //         if (!newMessage.trim()) return;
// // // // // // //         setSending(true);
// // // // // // //         try {
// // // // // // //             const feedbackItem = {
// // // // // // //                 senderName: currentUser?.name || 'Admin',
// // // // // // //                 role: currentUser?.role || 'ADMIN',
// // // // // // //                 message: newMessage,
// // // // // // //                 createdAt: new Date()
// // // // // // //             };
// // // // // // //             const updatedHistory = [...localHistory, feedbackItem];
// // // // // // //             await api(`/api/courses/${course._id}`, { method: 'PATCH', body: { feedbackHistory: updatedHistory } });
// // // // // // //             setLocalHistory(updatedHistory);
// // // // // // //             setNewMessage('');
// // // // // // //         } catch (e) { alert("Gagal mengirim pesan."); } finally { setSending(false); }
// // // // // // //     };

// // // // // // //     const handleUploadSusulan = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // //         const file = e.target.files?.[0];
// // // // // // //         if (!file) return;
        
// // // // // // //         const userStr = localStorage.getItem('user');
// // // // // // //         const token = userStr ? JSON.parse(userStr).token : null;
// // // // // // //         if (!token) { alert("Sesi habis."); return; }

// // // // // // //         setUploading(true);
// // // // // // //         const fd = new FormData();
// // // // // // //         fd.append('file', file);

// // // // // // //         try {
// // // // // // //             const response = await axios.post(`${API_BASE_URL}/api/materials/upload`, fd, {
// // // // // // //                 headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` }
// // // // // // //             });
// // // // // // //             const resultData = response.data;
// // // // // // //             const fileUrl = resultData.data?.url || resultData.url;
// // // // // // //             const fileName = resultData.data?.originalName || resultData.originalName || file.name;

// // // // // // //             if (fileUrl) {
// // // // // // //                 const newDoc = { name: fileName, originalName: fileName, url: fileUrl };
// // // // // // //                 const updatedDocs = [...localDocuments, newDoc];
// // // // // // //                 const autoMsg = {
// // // // // // //                     senderName: "System", role: "SYSTEM", message: `📄 Upload susulan: ${fileName}`, createdAt: new Date()
// // // // // // //                 };
// // // // // // //                 const newHistory = [...localHistory, autoMsg];
// // // // // // //                 await api(`/api/courses/${course._id}`, {
// // // // // // //                     method: 'PATCH', body: { proposalDocuments: updatedDocs, feedbackHistory: newHistory }
// // // // // // //                 });
// // // // // // //                 setLocalDocuments(updatedDocs);
// // // // // // //                 setLocalHistory(newHistory);
// // // // // // //             }
// // // // // // //         } catch (err: any) { console.error(err); alert("Gagal Upload"); } finally { setUploading(false); e.target.value = ''; }
// // // // // // //     };

// // // // // // //     return (
// // // // // // //         /* KEMBALI KE DEFAULT: Kita hapus manual positioning (items-start, pt-20) 
// // // // // // //            karena sekarang globals.css yang akan menanganinya via z-[110] */
// // // // // // //         <div className="fixed inset-0 bg-black/70 z-[110] flex justify-center items-center p-4 backdrop-blur-sm animate-in zoom-in-95">
            
// // // // // // //             {/* Max-width kita kunci di 4xl agar tetap compact sesuai request terakhir */}
// // // // // // //             <div className="bg-white w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] border border-gray-100">
                
// // // // // // //                 <div className="bg-white px-5 py-4 border-b border-gray-100 flex justify-between items-center shadow-sm z-10 shrink-0">
// // // // // // //                     <div>
// // // // // // //                         <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
// // // // // // //                             {isReadOnly ? 'Histori Pengajuan' : 'Review & Diskusi'}
// // // // // // //                             <span className="text-[10px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full uppercase border border-orange-200 tracking-wide font-bold">
// // // // // // //                                 {course.status}
// // // // // // //                             </span>
// // // // // // //                         </h2>
// // // // // // //                     </div>
// // // // // // //                     <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500 transition-colors" title="Tutup"><X size={18}/></button>
// // // // // // //                 </div>

// // // // // // //                 <div className="flex-1 overflow-hidden flex flex-col md:flex-row min-h-0">
// // // // // // //                     {/* KOLOM KIRI */}
// // // // // // //                     <div className="flex-1 overflow-y-auto p-5 bg-gray-50 space-y-5 border-r border-gray-200">
// // // // // // //                         <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
// // // // // // //                             <h3 className="font-bold text-base text-gray-800 mb-2">{course.title}</h3>
// // // // // // //                             <div className="text-xs text-gray-600 leading-relaxed mb-3">
// // // // // // //                                 <div dangerouslySetInnerHTML={{ __html: course.description }} />
// // // // // // //                             </div>
// // // // // // //                             <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
// // // // // // //                                 <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-[10px] font-bold">
// // // // // // //                                     {course.creatorInfo?.name?.charAt(0) || 'U'}
// // // // // // //                                 </div>
// // // // // // //                                 <div className="text-[10px]">
// // // // // // //                                     <div className="font-bold text-gray-700">{course.creatorInfo?.name}</div>
// // // // // // //                                     <div className="text-gray-500">{course.creatorInfo?.email}</div>
// // // // // // //                                 </div>
// // // // // // //                             </div>
// // // // // // //                         </div>

// // // // // // //                         <div>
// // // // // // //                             <div className="flex justify-between items-center mb-3">
// // // // // // //                                 <h4 className="text-xs font-bold text-gray-700 flex items-center gap-2"><FileText size={14}/> Dokumen ({localDocuments.length})</h4>
// // // // // // //                                 {!isReadOnly && (
// // // // // // //                                     <div className="relative">
// // // // // // //                                         <input type="file" onChange={handleUploadSusulan} disabled={uploading} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" title="Upload"/>
// // // // // // //                                         <button className="flex items-center gap-1 text-[10px] font-bold bg-white text-blue-600 px-3 py-1.5 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors shadow-sm">
// // // // // // //                                             {uploading ? <Loader2 size={12} className="animate-spin"/> : <Upload size={12}/>} Susulan
// // // // // // //                                         </button>
// // // // // // //                                     </div>
// // // // // // //                                 )}
// // // // // // //                             </div>
                            
// // // // // // //                             {localDocuments.length === 0 ? (
// // // // // // //                                 <div className="p-4 border-2 border-dashed border-gray-200 rounded-xl text-center text-gray-400 text-xs italic bg-white">
// // // // // // //                                     <AlertTriangle size={16} className="mx-auto mb-1 text-gray-300"/> Belum ada dokumen.
// // // // // // //                                 </div>
// // // // // // //                             ) : (
// // // // // // //                                 <div className="space-y-2">
// // // // // // //                                     {localDocuments.map((doc: any, idx: number) => {
// // // // // // //                                         const type = getFileType(doc.url);
// // // // // // //                                         const displayName = doc.originalName || doc.name;
// // // // // // //                                         return (
// // // // // // //                                             <div key={idx} className="bg-white p-2.5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all">
// // // // // // //                                                 <div className="flex items-start gap-3">
// // // // // // //                                                     <div className={`p-1.5 rounded-md shrink-0 ${type === 'pdf' ? 'bg-red-50 text-red-600' : type === 'image' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>
// // // // // // //                                                         {type === 'image' ? <ImageIcon size={16}/> : <FileText size={16}/>}
// // // // // // //                                                     </div>
// // // // // // //                                                     <div className="flex-1 min-w-0">
// // // // // // //                                                         <p className="text-xs font-bold text-gray-700 truncate" title={displayName}>{displayName}</p>
// // // // // // //                                                         <div className="mt-2">
// // // // // // //                                                             <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-600 hover:underline flex items-center gap-1"><ExternalLink size={10}/> Buka File</a>
// // // // // // //                                                         </div>
// // // // // // //                                                     </div>
// // // // // // //                                                 </div>
// // // // // // //                                             </div>
// // // // // // //                                         );
// // // // // // //                                     })}
// // // // // // //                                 </div>
// // // // // // //                             )}
// // // // // // //                         </div>
// // // // // // //                     </div>

// // // // // // //                     {/* KOLOM KANAN */}
// // // // // // //                     <div className="w-full md:w-[320px] flex flex-col bg-white border-l border-gray-200 h-[400px] md:h-auto min-h-0">
// // // // // // //                         <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 font-bold text-[10px] text-gray-500 uppercase tracking-wider flex items-center gap-2 shrink-0">
// // // // // // //                             <MessageSquare size={12}/> Diskusi
// // // // // // //                         </div>
// // // // // // //                         <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-white">
// // // // // // //                             {localHistory.length === 0 && <div className="text-center text-gray-400 text-[10px] italic mt-10">Belum ada catatan.</div>}
// // // // // // //                             {localHistory.map((msg: any, idx: number) => {
// // // // // // //                                 const isMe = currentUser && msg.senderName === currentUser.name;
// // // // // // //                                 const isSystem = msg.role === 'SYSTEM';
// // // // // // //                                 if (isSystem) return <div key={idx} className="flex justify-center my-2"><span className="text-[9px] bg-gray-50 text-gray-400 px-2 py-0.5 rounded-full border border-gray-100">{msg.message}</span></div>;
// // // // // // //                                 return (
// // // // // // //                                     <div key={idx} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
// // // // // // //                                         <div className={`max-w-[90%] px-3 py-2 rounded-2xl text-xs shadow-sm ${isMe ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-gray-100 text-gray-800 rounded-tl-none'}`}>
// // // // // // //                                             {msg.message}
// // // // // // //                                         </div>
// // // // // // //                                         <span className="text-[9px] text-gray-300 mt-0.5 px-1">
// // // // // // //                                             {isMe ? 'Anda' : msg.senderName} • {new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
// // // // // // //                                         </span>
// // // // // // //                                     </div>
// // // // // // //                                 );
// // // // // // //                             })}
// // // // // // //                         </div>
// // // // // // //                         {!isReadOnly && (
// // // // // // //                             <div className="p-3 border-t border-gray-200 bg-gray-50 shrink-0">
// // // // // // //                                 <div className="flex gap-2">
// // // // // // //                                     <input type="text" className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tulis..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendFeedback()}/>
// // // // // // //                                     <button onClick={handleSendFeedback} disabled={sending || !newMessage.trim()} className="bg-blue-600 text-white p-1.5 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors">
// // // // // // //                                         {sending ? <Loader2 size={16} className="animate-spin"/> : <Send size={16}/>}
// // // // // // //                                     </button>
// // // // // // //                                 </div>
// // // // // // //                             </div>
// // // // // // //                         )}
// // // // // // //                     </div>
// // // // // // //                 </div>

// // // // // // //                 <div className="px-5 py-4 border-t bg-white flex justify-end gap-3 shrink-0">
// // // // // // //                     <button onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 font-bold text-xs hover:bg-gray-50 transition-colors">Tutup</button>
// // // // // // //                     {!isReadOnly && isAdminOrSuper && (
// // // // // // //                         <>
// // // // // // //                             <button onClick={() => onReject(course)} className="px-4 py-2 rounded-lg border border-yellow-200 text-yellow-700 font-bold text-xs hover:bg-yellow-50 flex items-center gap-2"><Undo2 size={14}/> Kembalikan</button>
// // // // // // //                             <button onClick={() => onApprove(course)} className="px-5 py-2 rounded-lg bg-green-600 text-white font-bold text-xs hover:bg-green-700 shadow-sm flex items-center gap-2"><CheckCircle size={14}/> Setujui</button>
// // // // // // //                         </>
// // // // // // //                     )}
// // // // // // //                 </div>
// // // // // // //             </div>
// // // // // // //         </div>
// // // // // // //     );
// // // // // // // }


// // // // // // 'use client';

// // // // // // import { useState, useRef, useEffect } from 'react';
// // // // // // import { X, FileText, CheckCircle, Undo2, MessageSquare, Loader2, Image as ImageIcon, Send, ExternalLink, AlertTriangle, Upload } from 'lucide-react';
// // // // // // import { api } from '@/lib/api'; 
// // // // // // import axios from 'axios';

// // // // // // const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// // // // // // interface CourseProposalDetailModalProps {
// // // // // //     course: any;
// // // // // //     onClose: () => void;
// // // // // //     onApprove: (course: any) => void;
// // // // // //     onReject: (course: any) => void; 
// // // // // //     currentUser: any;
// // // // // //     refreshData?: () => void;
// // // // // //     isReadOnly?: boolean;
// // // // // // }

// // // // // // export default function CourseProposalDetailModal({ 
// // // // // //     course, onClose, onApprove, onReject, currentUser, refreshData, isReadOnly = false 
// // // // // // }: CourseProposalDetailModalProps) {
// // // // // //     const [newMessage, setNewMessage] = useState('');
// // // // // //     const [sending, setSending] = useState(false);
// // // // // //     const [uploading, setUploading] = useState(false);
    
// // // // // //     const [localDocuments, setLocalDocuments] = useState(course.proposalDocuments || []);
// // // // // //     const [localHistory, setLocalHistory] = useState(course.feedbackHistory || []);

// // // // // //     const chatContainerRef = useRef<HTMLDivElement>(null);

// // // // // //     // [SCROLL LOCK - FINAL SOLUTION]
// // // // // //     // Ini adalah standar industri untuk mematikan scroll layar belakang secara total.
// // // // // //     useEffect(() => {
// // // // // //         // 1. Saat modal muncul: Bekukan body
// // // // // //         document.body.style.overflow = 'hidden';
        
// // // // // //         // 2. Saat modal hilang (unmount): Cairkan kembali
// // // // // //         return () => {
// // // // // //             document.body.style.overflow = 'unset';
// // // // // //         };
// // // // // //     }, []);

// // // // // //     useEffect(() => {
// // // // // //         if (chatContainerRef.current) {
// // // // // //             chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
// // // // // //         }
// // // // // //     }, [localHistory]);

// // // // // //     if (!course) return null;

// // // // // //     const isAdminOrSuper = currentUser && ['ADMIN', 'SUPER_ADMIN'].includes(currentUser.role);

// // // // // //     const getFileType = (url: string) => {
// // // // // //         const ext = url.split('.').pop()?.toLowerCase();
// // // // // //         if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext || '')) return 'image';
// // // // // //         if (ext === 'pdf') return 'pdf';
// // // // // //         return 'file';
// // // // // //     };

// // // // // //     const handleSendFeedback = async () => {
// // // // // //         if (!newMessage.trim()) return;
// // // // // //         setSending(true);
// // // // // //         try {
// // // // // //             const feedbackItem = {
// // // // // //                 senderName: currentUser?.name || 'Admin',
// // // // // //                 role: currentUser?.role || 'ADMIN',
// // // // // //                 message: newMessage,
// // // // // //                 createdAt: new Date()
// // // // // //             };
// // // // // //             const updatedHistory = [...localHistory, feedbackItem];
// // // // // //             await api(`/api/courses/${course._id}`, { method: 'PATCH', body: { feedbackHistory: updatedHistory } });
// // // // // //             setLocalHistory(updatedHistory);
// // // // // //             setNewMessage('');
// // // // // //         } catch (e) { alert("Gagal mengirim pesan."); } finally { setSending(false); }
// // // // // //     };

// // // // // //     const handleUploadSusulan = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // //         const file = e.target.files?.[0];
// // // // // //         if (!file) return;
        
// // // // // //         const userStr = localStorage.getItem('user');
// // // // // //         const token = userStr ? JSON.parse(userStr).token : null;
// // // // // //         if (!token) { alert("Sesi habis."); return; }

// // // // // //         setUploading(true);
// // // // // //         const fd = new FormData();
// // // // // //         fd.append('file', file);

// // // // // //         try {
// // // // // //             const response = await axios.post(`${API_BASE_URL}/api/materials/upload`, fd, {
// // // // // //                 headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` }
// // // // // //             });
// // // // // //             const resultData = response.data;
// // // // // //             const fileUrl = resultData.data?.url || resultData.url;
// // // // // //             const fileName = resultData.data?.originalName || resultData.originalName || file.name;

// // // // // //             if (fileUrl) {
// // // // // //                 const newDoc = { name: fileName, originalName: fileName, url: fileUrl };
// // // // // //                 const updatedDocs = [...localDocuments, newDoc];
// // // // // //                 const autoMsg = {
// // // // // //                     senderName: "System", role: "SYSTEM", message: `📄 Upload susulan: ${fileName}`, createdAt: new Date()
// // // // // //                 };
// // // // // //                 const newHistory = [...localHistory, autoMsg];
// // // // // //                 await api(`/api/courses/${course._id}`, {
// // // // // //                     method: 'PATCH', body: { proposalDocuments: updatedDocs, feedbackHistory: newHistory }
// // // // // //                 });
// // // // // //                 setLocalDocuments(updatedDocs);
// // // // // //                 setLocalHistory(newHistory);
// // // // // //             }
// // // // // //         } catch (err: any) { console.error(err); alert("Gagal Upload"); } finally { setUploading(false); e.target.value = ''; }
// // // // // //     };

// // // // // //     return (
// // // // // //         <div className="fixed inset-0 bg-black/70 z-[110] flex justify-center items-center p-4 backdrop-blur-sm animate-in zoom-in-95">
// // // // // //             <div className="bg-white w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] border border-gray-100">
// // // // // //                 <div className="bg-white px-5 py-4 border-b border-gray-100 flex justify-between items-center shadow-sm z-10 shrink-0">
// // // // // //                     <div>
// // // // // //                         <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
// // // // // //                             {isReadOnly ? 'Histori Pengajuan' : 'Review & Diskusi'}
// // // // // //                             <span className="text-[10px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full uppercase border border-orange-200 tracking-wide font-bold">
// // // // // //                                 {course.status}
// // // // // //                             </span>
// // // // // //                         </h2>
// // // // // //                     </div>
// // // // // //                     <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500 transition-colors" title="Tutup"><X size={18}/></button>
// // // // // //                 </div>

// // // // // //                 <div className="flex-1 overflow-hidden flex flex-col md:flex-row min-h-0">
// // // // // //                     {/* KOLOM KIRI */}
// // // // // //                     <div className="flex-1 overflow-y-auto p-5 bg-gray-50 space-y-5 border-r border-gray-200">
// // // // // //                         <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
// // // // // //                             <h3 className="font-bold text-base text-gray-800 mb-2">{course.title}</h3>
// // // // // //                             <div className="text-xs text-gray-600 leading-relaxed mb-3">
// // // // // //                                 <div dangerouslySetInnerHTML={{ __html: course.description }} />
// // // // // //                             </div>
// // // // // //                             <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
// // // // // //                                 <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-[10px] font-bold">
// // // // // //                                     {course.creatorInfo?.name?.charAt(0) || 'U'}
// // // // // //                                 </div>
// // // // // //                                 <div className="text-[10px]">
// // // // // //                                     <div className="font-bold text-gray-700">{course.creatorInfo?.name}</div>
// // // // // //                                     <div className="text-gray-500">{course.creatorInfo?.email}</div>
// // // // // //                                 </div>
// // // // // //                             </div>
// // // // // //                         </div>

// // // // // //                         <div>
// // // // // //                             <div className="flex justify-between items-center mb-3">
// // // // // //                                 <h4 className="text-xs font-bold text-gray-700 flex items-center gap-2"><FileText size={14}/> Dokumen ({localDocuments.length})</h4>
// // // // // //                                 {!isReadOnly && (
// // // // // //                                     <div className="relative">
// // // // // //                                         <input type="file" onChange={handleUploadSusulan} disabled={uploading} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" title="Upload"/>
// // // // // //                                         <button className="flex items-center gap-1 text-[10px] font-bold bg-white text-blue-600 px-3 py-1.5 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors shadow-sm">
// // // // // //                                             {uploading ? <Loader2 size={12} className="animate-spin"/> : <Upload size={12}/>} Susulan
// // // // // //                                         </button>
// // // // // //                                     </div>
// // // // // //                                 )}
// // // // // //                             </div>
                            
// // // // // //                             {localDocuments.length === 0 ? (
// // // // // //                                 <div className="p-4 border-2 border-dashed border-gray-200 rounded-xl text-center text-gray-400 text-xs italic bg-white">
// // // // // //                                     <AlertTriangle size={16} className="mx-auto mb-1 text-gray-300"/> Belum ada dokumen.
// // // // // //                                 </div>
// // // // // //                             ) : (
// // // // // //                                 <div className="space-y-2">
// // // // // //                                     {localDocuments.map((doc: any, idx: number) => {
// // // // // //                                         const type = getFileType(doc.url);
// // // // // //                                         const displayName = doc.originalName || doc.name;
// // // // // //                                         return (
// // // // // //                                             <div key={idx} className="bg-white p-2.5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all">
// // // // // //                                                 <div className="flex items-start gap-3">
// // // // // //                                                     <div className={`p-1.5 rounded-md shrink-0 ${type === 'pdf' ? 'bg-red-50 text-red-600' : type === 'image' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>
// // // // // //                                                         {type === 'image' ? <ImageIcon size={16}/> : <FileText size={16}/>}
// // // // // //                                                     </div>
// // // // // //                                                     <div className="flex-1 min-w-0">
// // // // // //                                                         <p className="text-xs font-bold text-gray-700 truncate" title={displayName}>{displayName}</p>
// // // // // //                                                         <div className="mt-2">
// // // // // //                                                             <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-600 hover:underline flex items-center gap-1"><ExternalLink size={10}/> Buka File</a>
// // // // // //                                                         </div>
// // // // // //                                                     </div>
// // // // // //                                                 </div>
// // // // // //                                             </div>
// // // // // //                                         );
// // // // // //                                     })}
// // // // // //                                 </div>
// // // // // //                             )}
// // // // // //                         </div>
// // // // // //                     </div>

// // // // // //                     {/* KOLOM KANAN */}
// // // // // //                     <div className="w-full md:w-[320px] flex flex-col bg-white border-l border-gray-200 h-[400px] md:h-auto min-h-0">
// // // // // //                         <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 font-bold text-[10px] text-gray-500 uppercase tracking-wider flex items-center gap-2 shrink-0">
// // // // // //                             <MessageSquare size={12}/> Diskusi
// // // // // //                         </div>
// // // // // //                         <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-white">
// // // // // //                             {localHistory.length === 0 && <div className="text-center text-gray-400 text-[10px] italic mt-10">Belum ada catatan.</div>}
// // // // // //                             {localHistory.map((msg: any, idx: number) => {
// // // // // //                                 const isMe = currentUser && msg.senderName === currentUser.name;
// // // // // //                                 const isSystem = msg.role === 'SYSTEM';
// // // // // //                                 if (isSystem) return <div key={idx} className="flex justify-center my-2"><span className="text-[9px] bg-gray-50 text-gray-400 px-2 py-0.5 rounded-full border border-gray-100">{msg.message}</span></div>;
// // // // // //                                 return (
// // // // // //                                     <div key={idx} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
// // // // // //                                         <div className={`max-w-[90%] px-3 py-2 rounded-2xl text-xs shadow-sm ${isMe ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-gray-100 text-gray-800 rounded-tl-none'}`}>
// // // // // //                                             {msg.message}
// // // // // //                                         </div>
// // // // // //                                         <span className="text-[9px] text-gray-300 mt-0.5 px-1">
// // // // // //                                             {isMe ? 'Anda' : msg.senderName} • {new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
// // // // // //                                         </span>
// // // // // //                                     </div>
// // // // // //                                 );
// // // // // //                             })}
// // // // // //                         </div>
// // // // // //                         {!isReadOnly && (
// // // // // //                             <div className="p-3 border-t border-gray-200 bg-gray-50 shrink-0">
// // // // // //                                 <div className="flex gap-2">
// // // // // //                                     <input type="text" className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tulis..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendFeedback()}/>
// // // // // //                                     <button onClick={handleSendFeedback} disabled={sending || !newMessage.trim()} className="bg-blue-600 text-white p-1.5 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors">
// // // // // //                                         {sending ? <Loader2 size={16} className="animate-spin"/> : <Send size={16}/>}
// // // // // //                                     </button>
// // // // // //                                 </div>
// // // // // //                             </div>
// // // // // //                         )}
// // // // // //                     </div>
// // // // // //                 </div>

// // // // // //                 <div className="px-5 py-4 border-t bg-white flex justify-end gap-3 shrink-0">
// // // // // //                     <button onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 font-bold text-xs hover:bg-gray-50 transition-colors">Tutup</button>
// // // // // //                     {!isReadOnly && isAdminOrSuper && (
// // // // // //                         <>
// // // // // //                             <button onClick={() => onReject(course)} className="px-4 py-2 rounded-lg border border-yellow-200 text-yellow-700 font-bold text-xs hover:bg-yellow-50 flex items-center gap-2"><Undo2 size={14}/> Kembalikan</button>
// // // // // //                             <button onClick={() => onApprove(course)} className="px-5 py-2 rounded-lg bg-green-600 text-white font-bold text-xs hover:bg-green-700 shadow-sm flex items-center gap-2"><CheckCircle size={14}/> Setujui</button>
// // // // // //                         </>
// // // // // //                     )}
// // // // // //                 </div>
// // // // // //             </div>
// // // // // //         </div>
// // // // // //     );
// // // // // // }


// // // // // 'use client';

// // // // // import { useState, useRef, useEffect } from 'react';
// // // // // import { FileText, CheckCircle, Undo2, MessageSquare, Loader2, Image as ImageIcon, Send, ExternalLink, AlertTriangle, Upload } from 'lucide-react';
// // // // // import { api } from '@/lib/api'; 
// // // // // import axios from 'axios';
// // // // // import BaseModal from '@/components/ui/BaseModal';

// // // // // const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// // // // // interface CourseProposalDetailModalProps {
// // // // //     course: any;
// // // // //     onClose: () => void;
// // // // //     onApprove: (course: any) => void;
// // // // //     onReject: (course: any) => void; 
// // // // //     currentUser: any;
// // // // //     refreshData?: () => void;
// // // // //     isReadOnly?: boolean;
// // // // // }

// // // // // export default function CourseProposalDetailModal({ 
// // // // //     course, onClose, onApprove, onReject, currentUser, refreshData, isReadOnly = false 
// // // // // }: CourseProposalDetailModalProps) {
// // // // //     const [newMessage, setNewMessage] = useState('');
// // // // //     const [sending, setSending] = useState(false);
// // // // //     const [uploading, setUploading] = useState(false);
    
// // // // //     const [localDocuments, setLocalDocuments] = useState(course.proposalDocuments || []);
// // // // //     const [localHistory, setLocalHistory] = useState(course.feedbackHistory || []);

// // // // //     const chatContainerRef = useRef<HTMLDivElement>(null);

// // // // //     useEffect(() => {
// // // // //         if (chatContainerRef.current) {
// // // // //             chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
// // // // //         }
// // // // //     }, [localHistory]);

// // // // //     if (!course) return null;

// // // // //     const isAdminOrSuper = currentUser && ['ADMIN', 'SUPER_ADMIN'].includes(currentUser.role);

// // // // //     const getFileType = (url: string) => {
// // // // //         const ext = url.split('.').pop()?.toLowerCase();
// // // // //         if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext || '')) return 'image';
// // // // //         if (ext === 'pdf') return 'pdf';
// // // // //         return 'file';
// // // // //     };

// // // // //     const handleSendFeedback = async () => {
// // // // //         if (!newMessage.trim()) return;
// // // // //         setSending(true);
// // // // //         try {
// // // // //             const feedbackItem = {
// // // // //                 senderName: currentUser?.name || 'Admin',
// // // // //                 role: currentUser?.role || 'ADMIN',
// // // // //                 message: newMessage,
// // // // //                 createdAt: new Date()
// // // // //             };
// // // // //             const updatedHistory = [...localHistory, feedbackItem];
// // // // //             await api(`/api/courses/${course._id}`, { method: 'PATCH', body: { feedbackHistory: updatedHistory } });
// // // // //             setLocalHistory(updatedHistory);
// // // // //             setNewMessage('');
// // // // //         } catch (e) { alert("Gagal mengirim pesan."); } finally { setSending(false); }
// // // // //     };

// // // // //     const handleUploadSusulan = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // //         const file = e.target.files?.[0];
// // // // //         if (!file) return;
        
// // // // //         const userStr = localStorage.getItem('user');
// // // // //         const token = userStr ? JSON.parse(userStr).token : null;
// // // // //         if (!token) { alert("Sesi habis."); return; }

// // // // //         setUploading(true);
// // // // //         const fd = new FormData();
// // // // //         fd.append('file', file);

// // // // //         try {
// // // // //             const response = await axios.post(`${API_BASE_URL}/api/materials/upload`, fd, {
// // // // //                 headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` }
// // // // //             });
// // // // //             const resultData = response.data;
// // // // //             const fileUrl = resultData.data?.url || resultData.url;
// // // // //             const fileName = resultData.data?.originalName || resultData.originalName || file.name;

// // // // //             if (fileUrl) {
// // // // //                 const newDoc = { name: fileName, originalName: fileName, url: fileUrl };
// // // // //                 const updatedDocs = [...localDocuments, newDoc];
// // // // //                 const autoMsg = {
// // // // //                     senderName: "System", role: "SYSTEM", message: `📄 Upload susulan: ${fileName}`, createdAt: new Date()
// // // // //                 };
// // // // //                 const newHistory = [...localHistory, autoMsg];
// // // // //                 await api(`/api/courses/${course._id}`, {
// // // // //                     method: 'PATCH', body: { proposalDocuments: updatedDocs, feedbackHistory: newHistory }
// // // // //                 });
// // // // //                 setLocalDocuments(updatedDocs);
// // // // //                 setLocalHistory(newHistory);
// // // // //             }
// // // // //         } catch (err: any) { console.error(err); alert("Gagal Upload"); } finally { setUploading(false); e.target.value = ''; }
// // // // //     };

// // // // //     const footerButtons = (
// // // // //         <>
// // // // //             <button onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 font-bold text-xs hover:bg-gray-50 transition-colors">Tutup</button>
// // // // //             {!isReadOnly && isAdminOrSuper && (
// // // // //                 <>
// // // // //                     <button onClick={() => onReject(course)} className="px-4 py-2 rounded-lg border border-yellow-200 text-yellow-700 font-bold text-xs hover:bg-yellow-50 flex items-center gap-2"><Undo2 size={14}/> Kembalikan</button>
// // // // //                     <button onClick={() => onApprove(course)} className="px-5 py-2 rounded-lg bg-green-600 text-white font-bold text-xs hover:bg-green-700 shadow-sm flex items-center gap-2"><CheckCircle size={14}/> Setujui</button>
// // // // //                 </>
// // // // //             )}
// // // // //         </>
// // // // //     );

// // // // //     return (
// // // // //         <BaseModal
// // // // //             isOpen={true}
// // // // //             onClose={onClose}
// // // // //             title={isReadOnly ? 'Histori Pengajuan' : 'Review & Diskusi'}
// // // // //             subTitle={course.status}
// // // // //             size="2xl" // Lebih kecil dari form edit agar fokus
// // // // //             footer={footerButtons}
// // // // //         >
// // // // //             <div className="flex flex-col md:flex-row min-h-0 bg-gray-50 h-[500px] -m-6">
                
// // // // //                 {/* KOLOM KIRI (Info & Dokumen) */}
// // // // //                 <div className="flex-1 overflow-y-auto p-5 space-y-5 border-r border-gray-200 custom-scrollbar">
// // // // //                     <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
// // // // //                         <h3 className="font-bold text-base text-gray-800 mb-2">{course.title}</h3>
// // // // //                         <div className="text-xs text-gray-600 leading-relaxed mb-3">
// // // // //                             <div dangerouslySetInnerHTML={{ __html: course.description }} />
// // // // //                         </div>
// // // // //                         <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
// // // // //                             <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-[10px] font-bold">
// // // // //                                 {course.creatorInfo?.name?.charAt(0) || 'U'}
// // // // //                             </div>
// // // // //                             <div className="text-[10px]">
// // // // //                                 <div className="font-bold text-gray-700">{course.creatorInfo?.name}</div>
// // // // //                                 <div className="text-gray-500">{course.creatorInfo?.email}</div>
// // // // //                             </div>
// // // // //                         </div>
// // // // //                     </div>

// // // // //                     <div>
// // // // //                         <div className="flex justify-between items-center mb-3">
// // // // //                             <h4 className="text-xs font-bold text-gray-700 flex items-center gap-2"><FileText size={14}/> Dokumen ({localDocuments.length})</h4>
                            
// // // // //                             {/* [FITUR SUSULAN DIKEMBALIKAN] */}
// // // // //                             {!isReadOnly && (
// // // // //                                 <div className="relative">
// // // // //                                     <input type="file" onChange={handleUploadSusulan} disabled={uploading} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" title="Upload" aria-label="Upload Susulan"/>
// // // // //                                     <button className="flex items-center gap-1 text-[10px] font-bold bg-white text-blue-600 px-3 py-1.5 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors shadow-sm">
// // // // //                                         {uploading ? <Loader2 size={12} className="animate-spin"/> : <Upload size={12}/>} Susulan
// // // // //                                     </button>
// // // // //                                 </div>
// // // // //                             )}
// // // // //                         </div>
                        
// // // // //                         {localDocuments.length === 0 ? (
// // // // //                             <div className="p-4 border-2 border-dashed border-gray-200 rounded-xl text-center text-gray-400 text-xs italic bg-white">
// // // // //                                 <AlertTriangle size={16} className="mx-auto mb-1 text-gray-300"/> Belum ada dokumen.
// // // // //                             </div>
// // // // //                         ) : (
// // // // //                             <div className="space-y-2">
// // // // //                                 {localDocuments.map((doc: any, idx: number) => {
// // // // //                                     const type = getFileType(doc.url);
// // // // //                                     const displayName = doc.originalName || doc.name;
// // // // //                                     return (
// // // // //                                         <div key={idx} className="bg-white p-2.5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all">
// // // // //                                             <div className="flex items-start gap-3">
// // // // //                                                 <div className={`p-1.5 rounded-md shrink-0 ${type === 'pdf' ? 'bg-red-50 text-red-600' : type === 'image' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>
// // // // //                                                     {type === 'image' ? <ImageIcon size={16}/> : <FileText size={16}/>}
// // // // //                                                 </div>
// // // // //                                                 <div className="flex-1 min-w-0">
// // // // //                                                     <p className="text-xs font-bold text-gray-700 truncate" title={displayName}>{displayName}</p>
// // // // //                                                     <div className="mt-2">
// // // // //                                                         <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-600 hover:underline flex items-center gap-1"><ExternalLink size={10}/> Buka File</a>
// // // // //                                                     </div>
// // // // //                                                 </div>
// // // // //                                             </div>
// // // // //                                         </div>
// // // // //                                     );
// // // // //                                 })}
// // // // //                             </div>
// // // // //                         )}
// // // // //                     </div>
// // // // //                 </div>

// // // // //                 {/* KOLOM KANAN (Chat / Diskusi) */}
// // // // //                 <div className="w-full md:w-[350px] flex flex-col bg-white border-l border-gray-200 h-full min-h-0">
// // // // //                     <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 font-bold text-[10px] text-gray-500 uppercase tracking-wider flex items-center gap-2 shrink-0">
// // // // //                         <MessageSquare size={12}/> Diskusi
// // // // //                     </div>
// // // // //                     <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-white custom-scrollbar">
// // // // //                         {localHistory.length === 0 && <div className="text-center text-gray-400 text-[10px] italic mt-10">Belum ada catatan.</div>}
// // // // //                         {localHistory.map((msg: any, idx: number) => {
// // // // //                             const isMe = currentUser && msg.senderName === currentUser.name;
// // // // //                             const isSystem = msg.role === 'SYSTEM';
// // // // //                             if (isSystem) return <div key={idx} className="flex justify-center my-2"><span className="text-[9px] bg-gray-50 text-gray-400 px-2 py-0.5 rounded-full border border-gray-100">{msg.message}</span></div>;
// // // // //                             return (
// // // // //                                 <div key={idx} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
// // // // //                                     <div className={`max-w-[90%] px-3 py-2 rounded-2xl text-xs shadow-sm ${isMe ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-gray-100 text-gray-800 rounded-tl-none'}`}>
// // // // //                                         {msg.message}
// // // // //                                     </div>
// // // // //                                     <span className="text-[9px] text-gray-300 mt-0.5 px-1">
// // // // //                                         {isMe ? 'Anda' : msg.senderName} • {new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
// // // // //                                     </span>
// // // // //                                 </div>
// // // // //                             );
// // // // //                         })}
// // // // //                     </div>
// // // // //                     {!isReadOnly && (
// // // // //                         <div className="p-3 border-t border-gray-200 bg-gray-50 shrink-0">
// // // // //                             <div className="flex gap-2">
// // // // //                                 <input type="text" className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tulis..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendFeedback()}/>
// // // // //                                 <button onClick={handleSendFeedback} disabled={sending || !newMessage.trim()} className="bg-blue-600 text-white p-1.5 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors">
// // // // //                                     {sending ? <Loader2 size={16} className="animate-spin"/> : <Send size={16}/>}
// // // // //                                 </button>
// // // // //                             </div>
// // // // //                         </div>
// // // // //                     )}
// // // // //                 </div>
// // // // //             </div>
// // // // //         </BaseModal>
// // // // //     );
// // // // // }


// // // // 'use client';

// // // // import { useState, useRef, useEffect } from 'react';
// // // // import { FileText, CheckCircle, Undo2, MessageSquare, Loader2, Image as ImageIcon, Send, Upload } from 'lucide-react';
// // // // import { api } from '@/lib/api';
// // // // import axios from 'axios';
// // // // import BaseModal from '@/components/ui/BaseModal';

// // // // const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// // // // interface CourseProposalDetailModalProps {
// // // //     course: any;
// // // //     onClose: () => void;
// // // //     onApprove: (course: any) => void;
// // // //     onReject: (course: any) => void;
// // // //     currentUser: any;
// // // //     refreshData?: () => void;
// // // //     isReadOnly?: boolean;
// // // // }

// // // // export default function CourseProposalDetailModal({
// // // //     course, onClose, onApprove, onReject, currentUser, refreshData, isReadOnly = false
// // // // }: CourseProposalDetailModalProps) {
// // // //     const [newMessage, setNewMessage] = useState('');
// // // //     const [sending, setSending] = useState(false);
// // // //     const [uploading, setUploading] = useState(false);

// // // //     const [localDocuments, setLocalDocuments] = useState(course.proposalDocuments || []);
// // // //     const [localHistory, setLocalHistory] = useState(course.feedbackHistory || []);

// // // //     const chatContainerRef = useRef<HTMLDivElement>(null);
// // // //     // Ensure accurate role check matching your DB
// // // //     const isAdminOrSuper = currentUser && ['ADMIN', 'SUPER_ADMIN'].includes(currentUser.role);

// // // //     useEffect(() => {
// // // //         if (chatContainerRef.current) {
// // // //             chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
// // // //         }
// // // //     }, [localHistory]);

// // // //     if (!course) return null;

// // // //     // --- HANDLE SEND MESSAGE ---
// // // //     const handleSendFeedback = async () => {
// // // //         if (!newMessage.trim()) return;
// // // //         setSending(true);
// // // //         try {
// // // //             // 1. Save Chat to Course DB
// // // //             const feedbackItem = {
// // // //                 senderName: currentUser?.name || 'User',
// // // //                 role: currentUser?.role || 'USER',
// // // //                 message: newMessage,
// // // //                 createdAt: new Date()
// // // //             };
// // // //             const updatedHistory = [...localHistory, feedbackItem];

// // // //             await api(`/api/courses/${course._id}`, {
// // // //                 method: 'PATCH',
// // // //                 body: { feedbackHistory: updatedHistory }
// // // //             });

// // // //             // 2. Send Notification
// // // //             // STRICTLY use this URL format for proposals
// // // //             const correctTargetUrl = `/admin/courses?highlight=${course._id}`;

// // // //             if (isAdminOrSuper) {
// // // //                 // Admin sends -> Notify Facilitator (User)
// // // //                 if (course.creatorInfo?._id || course.creatorInfo?.id) {
// // // //                     await api('/api/notifications', {
// // // //                         method: 'POST',
// // // //                         body: {
// // // //                             recipient: course.creatorInfo._id || course.creatorInfo.id,
// // // //                             type: 'reply', // Keep type as 'reply'
// // // //                             message: `💬 Admin membalas di "${course.title}": ${newMessage.substring(0, 30)}...`,
// // // //                             targetUrl: correctTargetUrl, // <--- CRITICAL FIX
// // // //                             topic: course._id
// // // //                         }
// // // //                     });
// // // //                 }
// // // //             } else {
// // // //                 // Facilitator sends -> Notify All Admins
// // // //                 await api('/api/notifications', {
// // // //                     method: 'POST',
// // // //                     body: {
// // // //                         roleTarget: 'ADMIN',
// // // //                         type: 'reply',
// // // //                         message: `💬 ${currentUser?.name} membalas di "${course.title}": ${newMessage.substring(0, 30)}...`,
// // // //                         targetUrl: correctTargetUrl, // <--- CRITICAL FIX
// // // //                         topic: course._id
// // // //                     }
// // // //                 });
// // // //             }

// // // //             setLocalHistory(updatedHistory);
// // // //             setNewMessage('');
// // // //         } catch (e) {
// // // //             alert("Gagal kirim pesan.");
// // // //         } finally {
// // // //             setSending(false);
// // // //         }
// // // //     };

// // // //     // --- HANDLE UPLOAD SUSULAN ---
// // // //     const handleUploadSusulan = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // //         const file = e.target.files?.[0];
// // // //         if (!file) return;
// // // //         const userStr = localStorage.getItem('user'); const token = userStr ? JSON.parse(userStr).token : null;
// // // //         setUploading(true); const fd = new FormData(); fd.append('file', file);
// // // //         try {
// // // //             const res = await axios.post(`${API_BASE_URL}/api/materials/upload`, fd, { headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` } });
// // // //             const fileUrl = res.data?.data?.url || res.data?.url; const fileName = res.data?.data?.originalName || file.name;
// // // //             if (fileUrl) {
// // // //                 const newDoc = { name: fileName, originalName: fileName, url: fileUrl };
// // // //                 const updatedDocs = [...localDocuments, newDoc];
// // // //                 const autoMsg = { senderName: "System", role: "SYSTEM", message: `📄 Upload susulan: ${fileName}`, createdAt: new Date() };
// // // //                 const newHistory = [...localHistory, autoMsg];
// // // //                 await api(`/api/courses/${course._id}`, { method: 'PATCH', body: { proposalDocuments: updatedDocs, feedbackHistory: newHistory } });
// // // //                 setLocalDocuments(updatedDocs); setLocalHistory(newHistory);

// // // //                 // Notify Admin on upload
// // // //                 if (!isAdminOrSuper) {
// // // //                     await api('/api/notifications', {
// // // //                         method: 'POST',
// // // //                         body: {
// // // //                             roleTarget: 'ADMIN',
// // // //                             type: 'reply',
// // // //                             message: `📄 ${currentUser?.name} mengupload dokumen susulan di "${course.title}".`,
// // // //                             targetUrl: `/admin/courses?highlight=${course._id}`,
// // // //                             topic: course._id
// // // //                         }
// // // //                     });
// // // //                 }
// // // //             }
// // // //         } catch (e) { alert("Gagal upload"); } finally { setUploading(false); e.target.value = ''; }
// // // //     };

// // // //     const footerButtons = (
// // // //         <>
// // // //             <button onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 font-bold text-xs hover:bg-gray-50 transition-colors">Tutup</button>
// // // //             {!isReadOnly && isAdminOrSuper && (
// // // //                 <>
// // // //                     <button onClick={() => onReject(course)} className="px-4 py-2 rounded-lg border border-yellow-200 text-yellow-700 font-bold text-xs hover:bg-yellow-50 flex items-center gap-2"><Undo2 size={14}/> Kembalikan</button>
// // // //                     <button onClick={() => onApprove(course)} className="px-5 py-2 rounded-lg bg-green-600 text-white font-bold text-xs hover:bg-green-700 shadow-sm flex items-center gap-2"><CheckCircle size={14}/> Setujui</button>
// // // //                 </>
// // // //             )}
// // // //         </>
// // // //     );

// // // //     return (
// // // //         <BaseModal isOpen={true} onClose={onClose} title={isReadOnly ? 'Histori Pengajuan' : 'Review & Diskusi'} subTitle={course.status} size="2xl" footer={footerButtons}>
// // // //             <div className="flex flex-col md:flex-row min-h-0 bg-gray-50 h-[500px] -m-6">
// // // //                 {/* LEFT SIDE */}
// // // //                 <div className="flex-1 overflow-y-auto p-5 space-y-5 border-r border-gray-200 custom-scrollbar">
// // // //                     <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
// // // //                         <h3 className="font-bold text-base text-gray-800 mb-2">{course.title}</h3>
// // // //                         <div className="text-xs text-gray-600 leading-relaxed mb-3" dangerouslySetInnerHTML={{ __html: course.description }} />
// // // //                         <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
// // // //                             <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-[10px] font-bold">{course.creatorInfo?.name?.charAt(0) || 'U'}</div>
// // // //                             <div className="text-[10px]"><div className="font-bold text-gray-700">{course.creatorInfo?.name}</div><div className="text-gray-500">{course.creatorInfo?.email}</div></div>
// // // //                         </div>
// // // //                     </div>
// // // //                     <div>
// // // //                         <div className="flex justify-between items-center mb-3">
// // // //                             <h4 className="text-xs font-bold text-gray-700 flex items-center gap-2"><FileText size={14}/> Dokumen ({localDocuments.length})</h4>
// // // //                             {!isReadOnly && (<div className="relative"><input type="file" onChange={handleUploadSusulan} disabled={uploading} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" title="Upload"/><button className="flex items-center gap-1 text-[10px] font-bold bg-white text-blue-600 px-3 py-1.5 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors shadow-sm">{uploading ? <Loader2 size={12} className="animate-spin"/> : <Upload size={12}/>} Susulan</button></div>)}
// // // //                         </div>
// // // //                         <div className="space-y-2">
// // // //                             {localDocuments.map((doc: any, idx: number) => (
// // // //                                 <div key={idx} className="bg-white p-2.5 rounded-lg border border-gray-200 shadow-sm flex items-center gap-3"><div className="p-1.5 bg-blue-50 text-blue-600 rounded"><FileText size={16}/></div><div className="flex-1 min-w-0"><p className="text-xs font-bold text-gray-700 truncate">{doc.originalName || doc.name}</p><a href={doc.url} target="_blank" className="text-[10px] text-blue-600 hover:underline">Buka File</a></div></div>
// // // //                             ))}
// // // //                         </div>
// // // //                     </div>
// // // //                 </div>
// // // //                 {/* RIGHT SIDE */}
// // // //                 <div className="w-full md:w-[350px] flex flex-col bg-white border-l border-gray-200 h-full min-h-0">
// // // //                     <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 font-bold text-[10px] text-gray-500 uppercase tracking-wider flex items-center gap-2 shrink-0"><MessageSquare size={12}/> Diskusi</div>
// // // //                     <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-white custom-scrollbar">
// // // //                         {localHistory.map((msg: any, idx: number) => (
// // // //                             <div key={idx} className={`flex flex-col ${currentUser && msg.senderName === currentUser.name ? 'items-end' : 'items-start'}`}>
// // // //                                 <div className={`max-w-[90%] px-3 py-2 rounded-2xl text-xs shadow-sm ${msg.role === 'SYSTEM' ? 'bg-gray-50 text-gray-500 mx-auto rounded-full border' : currentUser && msg.senderName === currentUser.name ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-gray-100 text-gray-800 rounded-tl-none'}`}>{msg.message}</div>
// // // //                                 {msg.role !== 'SYSTEM' && <span className="text-[9px] text-gray-300 mt-0.5 px-1">{msg.senderName}</span>}
// // // //                             </div>
// // // //                         ))}
// // // //                     </div>
// // // //                     {!isReadOnly && <div className="p-3 border-t border-gray-200 bg-gray-50 shrink-0"><div className="flex gap-2"><input type="text" className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tulis..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendFeedback()}/><button onClick={handleSendFeedback} disabled={sending || !newMessage.trim()} className="bg-blue-600 text-white p-1.5 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors">{sending ? <Loader2 size={16} className="animate-spin"/> : <Send size={16}/>}</button></div></div>}
// // // //                 </div>
// // // //             </div>
// // // //         </BaseModal>
// // // //     );
// // // // }

// // // 'use client';

// // // import { X, CheckCircle, XCircle, FileText, Calendar, DollarSign, Download, MapPin, User, Building, ExternalLink } from 'lucide-react';
// // // import BaseModal from '@/components/ui/BaseModal';
// // // import { getImageUrl } from '@/lib/api';

// // // interface CourseProposalDetailModalProps {
// // //     course: any;
// // //     onClose: () => void;
// // //     onApprove: (id: string) => void;
// // //     onReject: (id: string) => void;
// // //     loading?: boolean;
// // // }

// // // export default function CourseProposalDetailModal({ course, onClose, onApprove, onReject, loading }: CourseProposalDetailModalProps) {
// // //     if (!course) return null;

// // //     const documents = course.proposalDocuments || [];
// // //     const creator = course.creatorInfo || {};

// // //     return (
// // //         <BaseModal
// // //             isOpen={true}
// // //             onClose={onClose}
// // //             title="Review Usulan Pelatihan"
// // //             size="2xl"
// // //         >
// // //             <div className="space-y-6 text-left pb-2">
                
// // //                 {/* 1. HEADER INFO PENGAJU */}
// // //                 <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-100">
// // //                     <div className="flex items-center gap-4">
// // //                         <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
// // //                             {creator.name?.charAt(0) || 'U'}
// // //                         </div>
// // //                         <div>
// // //                             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Diusulkan Oleh</p>
// // //                             <p className="text-sm font-bold text-gray-900 leading-none">{creator.name}</p>
// // //                             <p className="text-xs text-gray-500 mt-0.5">{creator.email}</p>
// // //                         </div>
// // //                     </div>
// // //                     <div className="text-right">
// // //                         <div className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-[10px] font-bold border border-yellow-200">
// // //                             STATUS: {course.status.toUpperCase()}
// // //                         </div>
// // //                         <p className="text-[10px] text-gray-400 mt-1">Diajukan pada: {new Date(course.createdAt).toLocaleDateString('id-ID')}</p>
// // //                     </div>
// // //                 </div>

// // //                 {/* 2. DETAIL UTAMA */}
// // //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // //                     <div className="md:col-span-2 space-y-4">
// // //                         <div>
// // //                             <label className="text-[10px] font-black text-gray-400 uppercase block mb-1">Judul Pelatihan</label>
// // //                             <h2 className="text-lg font-bold text-gray-900 leading-tight">{course.title}</h2>
// // //                         </div>
// // //                         <div>
// // //                             <label className="text-[10px] font-black text-gray-400 uppercase block mb-1">Alasan / Urgensi</label>
// // //                             <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-sm text-gray-700 leading-relaxed min-h-[80px]">
// // //                                 {course.description || "Tidak ada deskripsi."}
// // //                             </div>
// // //                         </div>
// // //                     </div>
// // //                     <div className="space-y-4">
// // //                         <div className="p-3 rounded-xl border border-gray-200">
// // //                             <label className="text-[10px] font-black text-gray-400 uppercase block mb-2">Jenis Program</label>
// // //                             <div className="flex items-center gap-2 text-sm font-bold text-gray-800">
// // //                                 {course.programType === 'training' ? <Building size={16} className="text-red-600"/> : <User size={16} className="text-blue-600"/>}
// // //                                 {course.programType === 'training' ? 'Diklat Resmi' : 'Kursus Mandiri'}
// // //                             </div>
// // //                         </div>
// // //                         <div className="p-3 rounded-xl border border-gray-200">
// // //                             <label className="text-[10px] font-black text-gray-400 uppercase block mb-2">Target Wilayah</label>
// // //                             <div className="flex items-start gap-2 text-sm font-bold text-gray-800">
// // //                                 <MapPin size={16} className="text-orange-600 shrink-0 mt-0.5"/>
// // //                                 <span className="leading-tight">{course.organizer || 'Nasional'}</span>
// // //                             </div>
// // //                         </div>
// // //                     </div>
// // //                 </div>

// // //                 <hr className="border-gray-100"/>

// // //                 {/* 3. DOKUMEN PENDUKUNG */}
// // //                 <div>
// // //                     <label className="text-[10px] font-black text-gray-400 uppercase block mb-3">Dokumen Pendukung ({documents.length})</label>
// // //                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
// // //                         {documents.map((doc: any, i: number) => (
// // //                             <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50/30 transition-all group">
// // //                                 <div className="flex items-center gap-3 overflow-hidden">
// // //                                     <div className="p-2 bg-blue-100 text-blue-600 rounded-lg shrink-0">
// // //                                         {doc.type === 'RAB' ? <DollarSign size={16}/> : doc.type === 'Jadwal' ? <Calendar size={16}/> : <FileText size={16}/>}
// // //                                     </div>
// // //                                     <div className="min-w-0">
// // //                                         <p className="text-[10px] font-bold text-gray-500 uppercase">{doc.label || doc.type}</p>
// // //                                         <p className="text-xs font-bold text-gray-800 truncate">{doc.name}</p>
// // //                                     </div>
// // //                                 </div>
// // //                                 <a href={getImageUrl(doc.url)} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-blue-600 hover:bg-white rounded-lg transition-colors" title="Download">
// // //                                     <Download size={16}/>
// // //                                 </a>
// // //                             </div>
// // //                         ))}
// // //                         {documents.length === 0 && <p className="text-sm text-gray-400 italic col-span-3">Tidak ada dokumen dilampirkan.</p>}
// // //                     </div>
// // //                 </div>

// // //                 {/* 4. FOOTER ACTIONS */}
// // //                 <div className="flex gap-3 pt-4 border-t border-gray-100 mt-2">
// // //                     <button onClick={onClose} className="px-6 py-3 rounded-xl border border-gray-300 font-bold text-gray-600 hover:bg-gray-50 text-sm" title="Tutup">Tutup</button>
// // //                     <div className="flex-1 flex gap-3 justify-end">
// // //                         <button onClick={() => onReject(course._id)} disabled={loading} className="px-6 py-3 rounded-xl bg-red-50 text-red-600 font-bold hover:bg-red-100 flex items-center gap-2 text-sm transition-colors border border-red-200" title="Tolak">
// // //                             <XCircle size={18}/> Tolak
// // //                         </button>
// // //                         <button onClick={() => onApprove(course._id)} disabled={loading} className="px-8 py-3 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 flex items-center gap-2 text-sm shadow-lg transition-all" title="Setujui">
// // //                             {loading ? <span className="animate-spin">⏳</span> : <CheckCircle size={18}/>} Setujui & Buka Akses
// // //                         </button>
// // //                     </div>
// // //                 </div>
// // //             </div>
// // //         </BaseModal>
// // //     );
// // // }

// // 'use client';

// // import { useState, useRef, useEffect } from 'react';
// // import { 
// //     FileText, CheckCircle, Undo2, MessageSquare, Loader2, 
// //     Image as ImageIcon, Send, ExternalLink, AlertTriangle, 
// //     Upload, Building, User, MapPin, XCircle 
// // } from 'lucide-react';
// // import { api } from '@/lib/api'; 
// // import axios from 'axios';
// // import BaseModal from '@/components/ui/BaseModal';

// // const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// // interface CourseProposalDetailModalProps {
// //     course: any;
// //     onClose: () => void;
// //     onApprove: (id: string) => void;
// //     onReject: (id: string) => void;
// //     currentUser: any;
// //     isReadOnly?: boolean;
// // }

// // export default function CourseProposalDetailModal({ 
// //     course, onClose, onApprove, onReject, currentUser, isReadOnly = false 
// // }: CourseProposalDetailModalProps) {
    
// //     // --- STATE ---
// //     const [activeTab, setActiveTab] = useState<'detail' | 'feedback'>('detail');
// //     const [newMessage, setNewMessage] = useState('');
// //     const [sending, setSending] = useState(false);
// //     const [uploading, setUploading] = useState(false);
// //     const [loadingAction, setLoadingAction] = useState(false);
    
// //     // Sinkronisasi data lokal dengan props
// //     const [localDocuments, setLocalDocuments] = useState(course.proposalDocuments || []);
// //     const [localHistory, setLocalHistory] = useState(course.feedbackHistory || []);

// //     const chatContainerRef = useRef<HTMLDivElement>(null);
// //     const creator = course.creatorInfo || {};
    
// //     // Cek Role
// //     const isAdminOrSuper = currentUser && ['ADMIN', 'SUPER_ADMIN'].includes(currentUser.role);

// //     // Auto-scroll chat
// //     useEffect(() => {
// //         if (activeTab === 'feedback' && chatContainerRef.current) {
// //             chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
// //         }
// //     }, [localHistory, activeTab]);

// //     if (!course) return null;

// //     // --- LOGIKA PESAN (DARI SKRIP LAMA) ---
// //     const handleSendFeedback = async () => {
// //         if (!newMessage.trim()) return;
// //         setSending(true);
// //         try {
// //             // 1. Simpan Chat ke DB (Array feedbackHistory)
// //             const feedbackItem = {
// //                 senderName: currentUser?.name || 'User',
// //                 role: currentUser?.role || 'USER',
// //                 message: newMessage,
// //                 createdAt: new Date()
// //             };
// //             const updatedHistory = [...localHistory, feedbackItem];

// //             // PENTING: Gunakan PATCH ke endpoint course utama, bukan endpoint feedback terpisah
// //             await api(`/api/courses/${course._id}`, {
// //                 method: 'PATCH',
// //                 body: { feedbackHistory: updatedHistory }
// //             });

// //             // 2. Kirim Notifikasi (Logic Lama)
// //             const targetUrl = `/admin/courses?highlight=${course._id}`; // URL Redirect
// //             if (isAdminOrSuper) {
// //                 // Admin kirim -> Notif ke Fasilitator
// //                 if (creator.id || creator._id) {
// //                     await api('/api/notifications', {
// //                         method: 'POST',
// //                         body: {
// //                             recipient: creator.id || creator._id,
// //                             type: 'reply',
// //                             message: `💬 Admin membalas di "${course.title}": ${newMessage.substring(0, 30)}...`,
// //                             targetUrl: targetUrl,
// //                             topic: course._id
// //                         }
// //                     });
// //                 }
// //             } else {
// //                 // Fasilitator kirim -> Notif ke Admin
// //                 await api('/api/notifications', {
// //                     method: 'POST',
// //                     body: {
// //                         roleTarget: 'ADMIN',
// //                         type: 'reply',
// //                         message: `💬 ${currentUser?.name} membalas di "${course.title}": ${newMessage.substring(0, 30)}...`,
// //                         targetUrl: targetUrl,
// //                         topic: course._id
// //                     }
// //                 });
// //             }

// //             setLocalHistory(updatedHistory);
// //             setNewMessage('');
// //         } catch (e: any) {
// //             alert("Gagal kirim pesan: " + e.message);
// //         } finally {
// //             setSending(false);
// //         }
// //     };

// //     // --- LOGIKA UPLOAD SUSULAN (DARI SKRIP LAMA) ---
// //     const handleUploadSusulan = async (e: React.ChangeEvent<HTMLInputElement>) => {
// //         const file = e.target.files?.[0];
// //         if (!file) return;
        
// //         const userStr = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
// //         const token = userStr ? JSON.parse(userStr).token : null;
// //         if (!token) return alert("Sesi habis.");

// //         setUploading(true);
// //         const fd = new FormData();
// //         fd.append('file', file);

// //         try {
// //             const res = await axios.post(`${API_BASE_URL}/api/materials/upload`, fd, {
// //                 headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` }
// //             });
// //             const fileUrl = res.data?.data?.url || res.data?.url;
// //             const fileName = res.data?.data?.originalName || file.name;

// //             if (fileUrl) {
// //                 const newDoc = { name: fileName, originalName: fileName, url: fileUrl, type: 'Susulan', label: 'Dokumen Susulan' };
// //                 const updatedDocs = [...localDocuments, newDoc];
                
// //                 // Tambahkan pesan otomatis sistem
// //                 const autoMsg = {
// //                     senderName: "System",
// //                     role: "SYSTEM",
// //                     message: `📄 Upload susulan: ${fileName}`,
// //                     createdAt: new Date()
// //                 };
// //                 const newHistory = [...localHistory, autoMsg];

// //                 await api(`/api/courses/${course._id}`, {
// //                     method: 'PATCH',
// //                     body: { proposalDocuments: updatedDocs, feedbackHistory: newHistory }
// //                 });

// //                 setLocalDocuments(updatedDocs);
// //                 setLocalHistory(newHistory);
// //             }
// //         } catch (e) { alert("Gagal Upload"); } 
// //         finally { setUploading(false); e.target.value = ''; }
// //     };

// //     // --- APPROVE / REJECT WRAPPERS ---
// //     const handleApproveAction = async () => {
// //         if(!confirm("Setujui usulan ini?")) return;
// //         setLoadingAction(true);
// //         await onApprove(course._id);
// //         setLoadingAction(false);
// //     };

// //     const handleRejectAction = async () => {
// //         if(!confirm("Tolak/Kembalikan usulan ini?")) return;
// //         setLoadingAction(true);
// //         await onReject(course._id);
// //         setLoadingAction(false);
// //     };

// //     return (
// //         <BaseModal isOpen={true} onClose={onClose} title={isReadOnly ? 'Histori Pengajuan' : 'Review & Diskusi'} size="2xl">
// //             <div className="flex flex-col h-[600px] -m-1">
                
// //                 {/* TABS HEADER */}
// //                 <div className="flex border-b border-gray-200 px-4 bg-white shrink-0">
// //                     <button onClick={() => setActiveTab('detail')} className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'detail' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
// //                         <FileText size={16}/> Detail Usulan
// //                     </button>
// //                     <button onClick={() => setActiveTab('feedback')} className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'feedback' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
// //                         <MessageSquare size={16}/> Diskusi & Revisi
// //                         {localHistory.length > 0 && <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-[10px]">{localHistory.length}</span>}
// //                     </button>
// //                 </div>

// //                 {/* CONTENT AREA */}
// //                 <div className="flex-1 overflow-y-auto bg-gray-50 p-5 custom-scrollbar">
                    
// //                     {/* === TAB 1: DETAIL === */}
// //                     {activeTab === 'detail' && (
// //                         <div className="space-y-6">
// //                             {/* INFO BAR */}
// //                             <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex justify-between items-center">
// //                                 <div className="flex items-center gap-3">
// //                                     <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">{creator.name?.charAt(0) || 'U'}</div>
// //                                     <div>
// //                                         <p className="text-[10px] font-black text-gray-400 uppercase">PENGAJU</p>
// //                                         <p className="text-sm font-bold text-gray-900">{creator.name}</p>
// //                                         <p className="text-xs text-gray-500">{creator.email}</p>
// //                                     </div>
// //                                 </div>
// //                                 <div className={`px-3 py-1 rounded-full text-[10px] font-bold border ${course.status === 'proposed' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>
// //                                     {course.status.toUpperCase()}
// //                                 </div>
// //                             </div>

// //                             {/* JUDUL & ALASAN */}
// //                             <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
// //                                 <div>
// //                                     <label className="text-[10px] font-black text-gray-400 uppercase block mb-1">Judul Pelatihan</label>
// //                                     <h3 className="text-lg font-bold text-gray-900">{course.title}</h3>
// //                                 </div>
// //                                 <div>
// //                                     <label className="text-[10px] font-black text-gray-400 uppercase block mb-1">Jenis & Wilayah</label>
// //                                     <div className="flex gap-4 text-sm font-medium text-gray-700">
// //                                         <span className="flex items-center gap-1"><Building size={14} className="text-red-500"/> {course.programType === 'training' ? 'Diklat Resmi' : 'Kursus Mandiri'}</span>
// //                                         <span className="flex items-center gap-1"><MapPin size={14} className="text-orange-500"/> {course.organizer || 'Nasional'}</span>
// //                                     </div>
// //                                 </div>
// //                                 <div>
// //                                     <label className="text-[10px] font-black text-gray-400 uppercase block mb-1">Alasan Pengajuan</label>
// //                                     <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-600 leading-relaxed border border-gray-100">
// //                                         {course.description || "-"}
// //                                     </div>
// //                                 </div>
// //                             </div>

// //                             {/* DOKUMEN LIST */}
// //                             <div>
// //                                 <div className="flex justify-between items-center mb-3">
// //                                     <label className="text-[10px] font-black text-gray-400 uppercase">DOKUMEN PENDUKUNG ({localDocuments.length})</label>
// //                                     {!isReadOnly && (
// //                                         <div className="relative">
// //                                             <input type="file" onChange={handleUploadSusulan} disabled={uploading} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" title="Upload"/>
// //                                             <button className="flex items-center gap-1 text-[10px] font-bold bg-white text-blue-600 px-3 py-1.5 rounded-lg border border-blue-200 hover:bg-blue-50 shadow-sm">
// //                                                 {uploading ? <Loader2 size={12} className="animate-spin"/> : <Upload size={12}/>} Upload Susulan
// //                                             </button>
// //                                         </div>
// //                                     )}
// //                                 </div>
// //                                 <div className="grid grid-cols-1 gap-2">
// //                                     {localDocuments.map((doc: any, i: number) => (
// //                                         <div key={i} className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200 hover:border-blue-300 transition-all group">
// //                                             <div className="flex items-center gap-3 overflow-hidden">
// //                                                 <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><FileText size={18}/></div>
// //                                                 <div className="min-w-0">
// //                                                     <p className="text-[10px] font-bold text-gray-500 uppercase">{doc.label || doc.type || 'Dokumen'}</p>
// //                                                     <p className="text-xs font-bold text-gray-800 truncate">{doc.name || doc.originalName}</p>
// //                                                 </div>
// //                                             </div>
// //                                             <a href={doc.url} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
// //                                                 <ExternalLink size={16}/>
// //                                             </a>
// //                                         </div>
// //                                     ))}
// //                                     {localDocuments.length === 0 && <p className="text-center py-4 text-gray-400 text-xs italic">Tidak ada dokumen.</p>}
// //                                 </div>
// //                             </div>
// //                         </div>
// //                     )}

// //                     {/* === TAB 2: CHAT / FEEDBACK === */}
// //                     {activeTab === 'feedback' && (
// //                         <div className="flex flex-col h-full">
// //                             <div ref={chatContainerRef} className="flex-1 space-y-4 pb-4">
// //                                 {localHistory.length === 0 && (
// //                                     <div className="flex flex-col items-center justify-center h-full text-gray-400 opacity-50">
// //                                         <MessageSquare size={48} className="mb-2"/>
// //                                         <p className="text-xs">Belum ada diskusi.</p>
// //                                     </div>
// //                                 )}
// //                                 {localHistory.map((msg: any, idx: number) => {
// //                                     const isMe = currentUser && msg.senderName === currentUser.name;
// //                                     const isSystem = msg.role === 'SYSTEM';
                                    
// //                                     if (isSystem) return (
// //                                         <div key={idx} className="flex justify-center my-4">
// //                                             <span className="text-[10px] bg-gray-200 text-gray-600 px-3 py-1 rounded-full border border-gray-300 font-medium shadow-sm">
// //                                                 {msg.message}
// //                                             </span>
// //                                         </div>
// //                                     );

// //                                     return (
// //                                         <div key={idx} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
// //                                             <div className={`flex items-end gap-2 max-w-[85%] ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
// //                                                 <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 shadow-sm ${isMe ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-700'}`}>
// //                                                     {msg.senderName?.charAt(0)}
// //                                                 </div>
// //                                                 <div className={`p-3 rounded-2xl text-xs leading-relaxed shadow-sm ${isMe ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none'}`}>
// //                                                     {msg.message}
// //                                                 </div>
// //                                             </div>
// //                                             <span className="text-[9px] text-gray-400 mt-1 px-1">
// //                                                 {msg.senderName} • {new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
// //                                             </span>
// //                                         </div>
// //                                     );
// //                                 })}
// //                             </div>
// //                         </div>
// //                     )}
// //                 </div>

// //                 {/* FOOTER & INPUT */}
// //                 <div className="bg-white border-t border-gray-200 p-4 shrink-0">
// //                     {activeTab === 'feedback' && !isReadOnly ? (
// //                         <div className="flex gap-2">
// //                             <input 
// //                                 className="flex-1 border border-gray-300 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-blue-500 outline-none" 
// //                                 placeholder="Tulis pesan / revisi..." 
// //                                 value={newMessage} 
// //                                 onChange={e => setNewMessage(e.target.value)} 
// //                                 onKeyDown={e => e.key === 'Enter' && handleSendFeedback()}
// //                             />
// //                             <button onClick={handleSendFeedback} disabled={sending || !newMessage.trim()} className="bg-blue-600 text-white p-2.5 rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm">
// //                                 {sending ? <Loader2 size={18} className="animate-spin"/> : <Send size={18}/>}
// //                             </button>
// //                         </div>
// //                     ) : (
// //                         <div className="flex gap-3 justify-end">
// //                             <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-gray-300 font-bold text-gray-600 hover:bg-gray-50 text-xs transition-colors">Tutup</button>
// //                             {!isReadOnly && isAdminOrSuper && (
// //                                 <>
// //                                     <button onClick={handleRejectAction} disabled={loadingAction} className="px-5 py-2.5 rounded-xl bg-red-50 text-red-600 font-bold hover:bg-red-100 flex items-center gap-2 text-xs transition-colors border border-red-200">
// //                                         <Undo2 size={16}/> Kembalikan / Tolak
// //                                     </button>
// //                                     <button onClick={handleApproveAction} disabled={loadingAction} className="px-6 py-2.5 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 flex items-center gap-2 text-xs shadow-lg transition-all">
// //                                         {loadingAction ? <Loader2 size={16} className="animate-spin"/> : <CheckCircle size={16}/>} Setujui
// //                                     </button>
// //                                 </>
// //                             )}
// //                         </div>
// //                     )}
// //                 </div>
// //             </div>
// //         </BaseModal>
// //     );
// // }

// 'use client';

// import { useState, useRef, useEffect } from 'react';
// import { FileText, CheckCircle, Undo2, MessageSquare, Loader2, Image as ImageIcon, Send, Upload, ExternalLink, XCircle, Building, User, MapPin } from 'lucide-react';
// import { api } from '@/lib/api'; 
// import axios from 'axios';
// import BaseModal from '@/components/ui/BaseModal';

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// interface CourseProposalDetailModalProps {
//     course: any;
//     onClose: () => void;
//     onApprove: (id: string) => void;
//     onReject: (id: string) => void;
//     currentUser: any;
//     refreshData?: () => void;
//     isReadOnly?: boolean;
// }

// export default function CourseProposalDetailModal({ 
//     course, onClose, onApprove, onReject, currentUser, refreshData, isReadOnly = false 
// }: CourseProposalDetailModalProps) {
    
//     const [activeTab, setActiveTab] = useState<'detail' | 'feedback'>('detail');
//     const [newMessage, setNewMessage] = useState('');
//     const [sending, setSending] = useState(false);
//     const [uploading, setUploading] = useState(false);
//     const [loadingAction, setLoadingAction] = useState(false);
    
//     const [localDocuments, setLocalDocuments] = useState(course.proposalDocuments || []);
//     const [localHistory, setLocalHistory] = useState(course.feedbackHistory || []);

//     const chatContainerRef = useRef<HTMLDivElement>(null);
//     // FIX: Ensure creator object exists securely
//     const creator = course.creatorInfo || {};
//     const isAdminOrSuper = currentUser && ['ADMIN', 'SUPER_ADMIN'].includes(currentUser.role);

//     useEffect(() => {
//         if (activeTab === 'feedback' && chatContainerRef.current) {
//             chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//         }
//     }, [localHistory, activeTab]);

//     if (!course) return null;

//     const handleSendFeedback = async () => {
//         if (!newMessage.trim()) return;
//         setSending(true);
//         try {
//             // 1. Simpan Chat
//             const feedbackItem = {
//                 senderName: currentUser?.name || 'User',
//                 role: currentUser?.role || 'USER',
//                 message: newMessage,
//                 createdAt: new Date()
//             };
//             const updatedHistory = [...localHistory, feedbackItem];

//             // Update Database
//             await api(`/api/courses/${course._id}`, {
//                 method: 'PATCH',
//                 body: { feedbackHistory: updatedHistory }
//             });

//             // 2. Logic Notifikasi (FIXED)
//             const targetUrl = `/admin/courses?highlight=${course._id}`;
//             let notificationBody: any = null;

//             if (isAdminOrSuper) {
//                 // Admin kirim -> Notif ke Fasilitator (Recipient wajib ada)
//                 const recipientId = creator._id || creator.id;
                
//                 if (recipientId) {
//                     notificationBody = {
//                         recipient: recipientId,
//                         type: 'reply',
//                         message: `💬 Admin membalas di "${course.title}": ${newMessage.substring(0, 30)}...`,
//                         targetUrl,
//                         topic: course._id
//                     };
//                 }
//             } else {
//                 // Fasilitator kirim -> Notif ke Admin (RoleTarget)
//                 notificationBody = {
//                     roleTarget: 'ADMIN',
//                     type: 'reply',
//                     message: `💬 ${currentUser?.name} membalas di "${course.title}": ${newMessage.substring(0, 30)}...`,
//                     targetUrl,
//                     topic: course._id
//                 };
//             }

//             // Hanya kirim notifikasi jika body valid (mencegah error 'recipient required')
//             if (notificationBody) {
//                 await api('/api/notifications', { method: 'POST', body: notificationBody });
//             }

//             setLocalHistory(updatedHistory);
//             setNewMessage('');
//             if (refreshData) refreshData();
//         } catch (e: any) {
//             // Error notifikasi tidak boleh memblokir UI chat, tapi kita log
//             console.error("Feedback error:", e);
//             // Jika errornya murni jaringan, baru alert
//             if (e.message !== 'Notification validation failed') {
//                // alert("Gagal kirim pesan."); // Optional: suppress alert for minor errors
//             }
//         } finally {
//             setSending(false);
//         }
//     };

//     const handleUploadSusulan = async (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0]; if (!file) return;
//         const userStr = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
//         const token = userStr ? JSON.parse(userStr).token : null;
//         if (!token) return alert("Sesi habis.");

//         setUploading(true); 
//         const fd = new FormData(); 
//         fd.append('file', file);

//         try {
//             const res = await axios.post(`${API_BASE_URL}/api/materials/upload`, fd, {
//                 headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` }
//             });
//             const fileUrl = res.data?.data?.url || res.data?.url;
            
//             if (fileUrl) {
//                 const newDoc = { name: file.name, url: fileUrl, label: 'Dokumen Susulan' };
//                 const updatedDocs = [...localDocuments, newDoc];
//                 const autoMsg = {
//                     senderName: "System",
//                     role: "SYSTEM",
//                     message: `📄 Upload dokumen susulan: ${file.name}`,
//                     createdAt: new Date()
//                 };
//                 const newHistory = [...localHistory, autoMsg];

//                 await api(`/api/courses/${course._id}`, {
//                     method: 'PATCH',
//                     body: { proposalDocuments: updatedDocs, feedbackHistory: newHistory }
//                 });

//                 setLocalDocuments(updatedDocs);
//                 setLocalHistory(newHistory);
//             }
//         } catch (e) { alert("Gagal Upload"); } 
//         finally { setUploading(false); e.target.value = ''; }
//     };

//     const handleApproveAction = async () => { if(confirm("Setujui usulan ini?")) { setLoadingAction(true); await onApprove(course._id); setLoadingAction(false); }};
//     const handleRejectAction = async () => { if(confirm("Tolak usulan ini?")) { setLoadingAction(true); await onReject(course._id); setLoadingAction(false); }};

//     return (
//         <BaseModal isOpen={true} onClose={onClose} title="Review Usulan" size="full">
//             <div className="max-w-6xl mx-auto flex flex-col h-[550px] -m-1">
//                 <div className="flex border-b border-gray-200 px-4 bg-white shrink-0">
//                     <button onClick={() => setActiveTab('detail')} className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'detail' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`} title="Detail"><FileText size={16}/> Detail</button>
//                     <button onClick={() => setActiveTab('feedback')} className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'feedback' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`} title="Diskusi"><MessageSquare size={16}/> Diskusi {localHistory.length > 0 && <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-[10px]">{localHistory.length}</span>}</button>
//                 </div>

//                 <div className="flex-1 overflow-y-auto bg-gray-50 p-5 custom-scrollbar">
//                     {activeTab === 'detail' && (
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div className="space-y-4">
//                                 <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-3">
//                                     <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">{creator.name?.charAt(0)}</div>
//                                     <div><p className="text-[10px] font-black text-gray-400 uppercase">PENGAJU</p><p className="text-sm font-bold">{creator.name}</p><p className="text-xs text-gray-500">{creator.email}</p></div>
//                                 </div>
//                                 <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
//                                     <label className="text-[10px] font-black text-gray-400 uppercase block mb-1">JUDUL</label>
//                                     <h3 className="text-lg font-bold text-gray-900">{course.title}</h3>
//                                     <div className="flex gap-4 mt-2 text-sm text-gray-600">
//                                         <span className="flex items-center gap-1"><Building size={14}/> {course.programType === 'training' ? 'Diklat' : 'Kursus'}</span>
//                                         <span className="flex items-center gap-1"><MapPin size={14}/> {course.organizer || 'Nasional'}</span>
//                                     </div>
//                                 </div>
//                                 <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
//                                     <label className="text-[10px] font-black text-gray-400 uppercase block mb-1">ALASAN</label>
//                                     <div className="text-sm text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: course.description || '-' }} />
//                                 </div>
//                             </div>
//                             <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
//                                 <div className="flex justify-between items-center mb-3">
//                                     <label className="text-[10px] font-black text-gray-400 uppercase">DOKUMEN ({localDocuments.length})</label>
//                                     {!isReadOnly && <div className="relative"><input type="file" onChange={handleUploadSusulan} disabled={uploading} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" title="Input"/><button className="px-3 py-1 bg-blue-50 text-blue-600 rounded text-[10px] font-bold border border-blue-100 flex gap-1 items-center">{uploading ? <Loader2 size={10} className="animate-spin"/> : <Upload size={10}/>} Susulan</button></div>}
//                                 </div>
//                                 <div className="space-y-2">
//                                     {localDocuments.map((doc: any, i: number) => (
//                                         <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-200">
//                                             <div className="flex items-center gap-2 overflow-hidden"><FileText size={16} className="text-blue-500"/><span className="text-xs truncate w-40 font-bold" title={doc.name}>{doc.name}</span></div>
//                                             <a href={doc.url} target="_blank" className="text-blue-600 hover:underline text-[10px] flex items-center gap-1"><ExternalLink size={10}/> Buka</a>
//                                         </div>
//                                     ))}
//                                     {localDocuments.length === 0 && <p className="text-center text-xs text-gray-400 italic">Kosong.</p>}
//                                 </div>
//                             </div>
//                         </div>
//                     )}

//                     {activeTab === 'feedback' && (
//                         <div className="flex flex-col h-full bg-white rounded-xl border border-gray-200">
//                             <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
//                                 {localHistory.length === 0 && <div className="text-center text-gray-400 text-xs mt-10">Belum ada diskusi.</div>}
//                                 {localHistory.map((msg: any, idx: number) => {
//                                     const isMe = currentUser && msg.senderName === currentUser.name;
//                                     if(msg.role === 'SYSTEM') return <div key={idx} className="text-center"><span className="text-[9px] bg-gray-100 px-2 py-1 rounded text-gray-500">{msg.message}</span></div>;
//                                     return (
//                                         <div key={idx} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
//                                             <div className={`px-3 py-2 rounded-xl text-xs max-w-[80%] ${isMe ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}>{msg.message}</div>
//                                             <span className="text-[9px] text-gray-400 mt-1">{msg.senderName} • {new Date(msg.createdAt).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</span>
//                                         </div>
//                                     )
//                                 })}
//                             </div>
//                             {!isReadOnly && <div className="p-3 border-t flex gap-2"><input className="flex-1 border rounded-lg px-3 text-xs" placeholder="Ketik pesan..." value={newMessage} onChange={e=>setNewMessage(e.target.value)} onKeyDown={e=>e.key==='Enter' && handleSendFeedback()}/><button onClick={handleSendFeedback} disabled={sending} className="bg-blue-600 text-white p-2 rounded-lg" title="Kirim">{sending?<Loader2 size={16} className="animate-spin"/>:<Send size={16}/>}</button></div>}
//                         </div>
//                     )}
//                 </div>

//                 <div className="flex gap-3 pt-3 border-t border-gray-200 mt-auto bg-white p-3">
//                     <button onClick={onClose} className="px-5 py-2 border rounded-lg text-xs font-bold text-gray-600" title="Tutup">Tutup</button>
//                     <div className="flex-1 flex gap-2 justify-end">
//                         {!isReadOnly && isAdminOrSuper && (
//                             <>
//                                 <button onClick={handleRejectAction} disabled={loadingAction} className="px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg text-xs font-bold flex gap-1 items-center" title="Tolak"><Undo2 size={14}/> Tolak</button>
//                                 <button onClick={handleApproveAction} disabled={loadingAction} className="px-5 py-2 bg-green-600 text-white rounded-lg text-xs font-bold flex gap-1 items-center shadow-sm" title="Setujui"><CheckCircle size={14}/> Setujui</button>
//                             </>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </BaseModal>
//     );
// }


'use client';

import { useState, useRef, useEffect } from 'react';
import { FileText, CheckCircle, Undo2, MessageSquare, Loader2, Send, Upload, ExternalLink, Building, MapPin, X } from 'lucide-react';
import { api } from '@/lib/api'; 
import axios from 'axios';
import BaseModal from '@/components/ui/BaseModal';
// IMPORT Permission Baru
import { canAccessCourse, canVerifyCourse } from '@/lib/permissionUtils'; 

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

interface CourseProposalDetailModalProps {
    course: any;
    onClose: () => void;
    onApprove: (course: any) => void;
    onReject: (course: any) => void;
    currentUser: any;
    refreshData?: () => void;
    isReadOnly?: boolean;
}

export default function CourseProposalDetailModal({ 
    course, onClose, onApprove, onReject, currentUser, refreshData, isReadOnly = false 
}: CourseProposalDetailModalProps) {
    
    const [activeTab, setActiveTab] = useState<'detail' | 'feedback'>('detail');
    const [newMessage, setNewMessage] = useState('');
    const [sending, setSending] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [loadingAction, setLoadingAction] = useState(false);
    
    const [localDocuments, setLocalDocuments] = useState(course.proposalDocuments || []);
    const [localHistory, setLocalHistory] = useState(course.feedbackHistory || []);

    const chatContainerRef = useRef<HTMLDivElement>(null);
    const creator = course.creatorInfo || {};
    
    // --- CEK PERMISSION ---
    // 1. Cek apakah boleh melihat dokumen? (Wilayah Cocok)
    const hasViewAccess = canAccessCourse(currentUser, course);
    
    // 2. Cek apakah boleh MENYETUJUI? (Wilayah Cocok + Toggle "Verifikasi" ON)
    const canApprove = canVerifyCourse(currentUser, course);
    
    const showActionButtons = !isReadOnly && canApprove; 

    useEffect(() => {
        if (activeTab === 'feedback' && chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [localHistory, activeTab]);

    if (!course) return null;

    // ... (Fungsi Chat & Upload sama persis, tidak berubah) ...
    const handleSendFeedback = async () => {
        if (!newMessage.trim()) return;
        setSending(true);
        try {
            const feedbackItem = { senderName: currentUser?.name || 'User', role: currentUser?.role || 'USER', message: newMessage, createdAt: new Date() };
            const updatedHistory = [...localHistory, feedbackItem];
            await api(`/api/courses/${course._id}`, { method: 'PATCH', body: { feedbackHistory: updatedHistory } });
            
            const targetUrl = `/admin/courses?highlight=${course._id}`;
            let notificationBody = null;
            if (['ADMIN', 'SUPER_ADMIN'].includes(currentUser.role)) {
                const recipientId = creator._id || creator.id;
                if (recipientId) notificationBody = { recipient: recipientId, type: 'reply', message: `💬 Admin membalas di "${course.title}": ${newMessage.substring(0, 30)}...`, targetUrl, topic: course._id };
            } else {
                notificationBody = { roleTarget: 'ADMIN', type: 'reply', message: `💬 ${currentUser?.name} membalas di "${course.title}": ${newMessage.substring(0, 30)}...`, targetUrl, topic: course._id };
            }
            if (notificationBody) await api('/api/notifications', { method: 'POST', body: notificationBody });

            setLocalHistory(updatedHistory);
            setNewMessage('');
            if (refreshData) refreshData();
        } catch (e) { console.error(e); } finally { setSending(false); }
    };

    const handleUploadSusulan = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; if (!file) return;
        const userStr = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
        const token = userStr ? JSON.parse(userStr).token : null;
        if (!token) return alert("Sesi habis.");

        setUploading(true); 
        const fd = new FormData(); fd.append('file', file);
        try {
            const res = await axios.post(`${API_BASE_URL}/api/materials/upload`, fd, { headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` } });
            const fileUrl = res.data?.data?.url || res.data?.url;
            if (fileUrl) {
                const updatedDocs = [...localDocuments, { name: file.name, url: fileUrl, label: 'Dokumen Susulan' }];
                const newHistory = [...localHistory, { senderName: "System", role: "SYSTEM", message: `📄 Upload dokumen susulan: ${file.name}`, createdAt: new Date() }];
                
                await api(`/api/courses/${course._id}`, { method: 'PATCH', body: { proposalDocuments: updatedDocs, feedbackHistory: newHistory } });
                setLocalDocuments(updatedDocs);
                setLocalHistory(newHistory);
            }
        } catch (e) { alert("Gagal Upload"); } finally { setUploading(false); e.target.value = ''; }
    };

    const handleApproveAction = async () => { 
        if(confirm("Apakah Anda yakin sudah mereview dokumen dan menyetujui usulan ini?")) { 
            setLoadingAction(true); 
            await onApprove(course); 
            setLoadingAction(false); 
        }
    };
    const handleRejectAction = async () => { 
        if(confirm("Tolak usulan ini? Pengaju akan diminta revisi.")) { 
            setLoadingAction(true); 
            await onReject(course); 
            setLoadingAction(false); 
        }
    };

    return (
        <BaseModal isOpen={true} onClose={onClose} title="Review Detail Usulan" size="full">
            <div className="max-w-6xl mx-auto flex flex-col h-[550px] -m-1">
                {/* HEADER TABS */}
                <div className="flex border-b border-gray-200 px-4 bg-white shrink-0">
                    <button onClick={() => setActiveTab('detail')} className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'detail' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}><FileText size={16}/> Detail & Dokumen</button>
                    <button onClick={() => setActiveTab('feedback')} className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'feedback' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}><MessageSquare size={16}/> Diskusi & Revisi {localHistory.length > 0 && <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-[10px]">{localHistory.length}</span>}</button>
                </div>

                <div className="flex-1 overflow-y-auto bg-gray-50 p-5 custom-scrollbar">
                    {activeTab === 'detail' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* KIRI: INFO */}
                            <div className="space-y-4">
                                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">{creator.name?.charAt(0)}</div>
                                    <div><p className="text-[10px] font-black text-gray-400 uppercase">PENGAJU</p><p className="text-sm font-bold">{creator.name}</p><p className="text-xs text-gray-500">{creator.email}</p></div>
                                </div>
                                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                                    <label className="text-[10px] font-black text-gray-400 uppercase block mb-1">JUDUL</label>
                                    <h3 className="text-lg font-bold text-gray-900">{course.title}</h3>
                                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                                        <span className="flex items-center gap-1"><Building size={14}/> {course.programType === 'training' ? 'Diklat' : 'Kursus'}</span>
                                        <span className="flex items-center gap-1"><MapPin size={14}/> {course.organizer || 'Nasional'}</span>
                                    </div>
                                </div>
                                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                                    <label className="text-[10px] font-black text-gray-400 uppercase block mb-1">ALASAN</label>
                                    <div className="text-sm text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: course.description || '-' }} />
                                </div>
                            </div>
                            {/* KANAN: DOKUMEN */}
                            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                                <div className="flex justify-between items-center mb-3">
                                    <label className="text-[10px] font-black text-gray-400 uppercase">DOKUMEN ({localDocuments.length})</label>
                                    {showActionButtons && (
                                        <div className="relative">
                                            <input type="file" onChange={handleUploadSusulan} disabled={uploading} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" title="Upload Dokumen Susulan" aria-label="Upload Dokumen Susulan" />
                                            <button className="px-3 py-1 bg-blue-50 text-blue-600 rounded text-[10px] font-bold border border-blue-100 flex gap-1 items-center">{uploading ? <Loader2 size={10} className="animate-spin"/> : <Upload size={10}/>} Susulan</button>
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    {/* Jika tidak punya akses view, dokumen bisa disembunyikan/diblur jika perlu */}
                                    {hasViewAccess ? localDocuments.map((doc: any, i: number) => (
                                        <div key={i} className="flex items-center justify-between p-2.5 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors">
                                            <div className="flex items-center gap-3 overflow-hidden">
                                                <div className="p-2 bg-white rounded border border-gray-200"><FileText size={16} className="text-red-500"/></div>
                                                <div className="flex flex-col"><span className="text-xs font-bold text-gray-700 truncate w-48" title={doc.name}>{doc.label || doc.name}</span><span className="text-[10px] text-gray-400 truncate w-48">{doc.name}</span></div>
                                            </div>
                                            <a href={doc.url} target="_blank" className="text-blue-600 hover:text-blue-800 text-[10px] font-bold flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-md border border-blue-100"><ExternalLink size={10}/> Buka</a>
                                        </div>
                                    )) : <p className="text-center text-xs text-red-400 italic py-4">Dokumen tidak dapat diakses (Beda Wilayah).</p>}
                                    
                                    {hasViewAccess && localDocuments.length === 0 && <p className="text-center text-xs text-gray-400 italic py-4">Tidak ada dokumen.</p>}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'feedback' && (
                        <div className="flex flex-col h-full bg-white rounded-xl border border-gray-200">
                            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                                {localHistory.length === 0 && <div className="text-center text-gray-400 text-xs mt-10">Belum ada diskusi.</div>}
                                {localHistory.map((msg: any, idx: number) => {
                                    const isMe = currentUser && msg.senderName === currentUser.name;
                                    if(msg.role === 'SYSTEM') return <div key={idx} className="text-center my-2"><span className="text-[9px] bg-gray-100 px-2 py-1 rounded-full text-gray-500 border border-gray-200">{msg.message}</span></div>;
                                    return (
                                        <div key={idx} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                                            <div className={`px-3 py-2 rounded-xl text-xs max-w-[80%] shadow-sm ${isMe ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none border border-gray-200'}`}>{msg.message}</div>
                                            <span className="text-[9px] text-gray-400 mt-1 px-1">{msg.senderName} • {new Date(msg.createdAt).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</span>
                                        </div>
                                    )
                                })}
                            </div>
                            {/* Chat hanya aktif jika punya akses */}
                            {hasViewAccess && (
                                <div className="p-3 border-t bg-gray-50 flex gap-2">
                                    <input className="flex-1 border rounded-lg px-3 text-xs focus:ring-2 focus:ring-blue-100 outline-none" placeholder="Ketik revisi atau komentar..." value={newMessage} onChange={e=>setNewMessage(e.target.value)} onKeyDown={e=>e.key==='Enter' && handleSendFeedback()}/>
                                    <button onClick={handleSendFeedback} disabled={sending} className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors" title="Kirim">{sending?<Loader2 size={16} className="animate-spin"/>:<Send size={16}/>}</button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* FOOTER ACTIONS - TOMBOL SETUJUI MUNCUL DISINI */}
                <div className="flex gap-3 pt-3 border-t border-gray-200 mt-auto bg-white p-4">
                    <button onClick={onClose} className="px-5 py-2.5 border border-gray-300 hover:bg-gray-50 rounded-xl text-xs font-bold text-gray-700 transition-colors" title="Tutup">Tutup</button>
                    <div className="flex-1 flex gap-3 justify-end">
                        
                        {/* HANYA MUNCUL JIKA PUNYA IZIN VERIFIKASI (TOGGLE ON) */}
                        {showActionButtons && (
                            <>
                                <button 
                                    onClick={handleRejectAction} 
                                    disabled={loadingAction} 
                                    className="px-5 py-2.5 bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 rounded-xl text-xs font-bold flex gap-2 items-center transition-colors"
                                >
                                    <Undo2 size={16}/> Minta Revisi / Tolak
                                </button>
                                <button 
                                    onClick={handleApproveAction} 
                                    disabled={loadingAction} 
                                    className="px-6 py-2.5 bg-green-600 text-white hover:bg-green-700 rounded-xl text-xs font-bold flex gap-2 items-center shadow-md transition-colors"
                                >
                                    {loadingAction ? <Loader2 size={16} className="animate-spin"/> : <CheckCircle size={16}/>} 
                                    Setujui Usulan
                                </button>
                            </>
                        )}

                        {!showActionButtons && hasViewAccess && (
                            <span className="flex items-center text-xs text-gray-400 italic px-2 bg-gray-50 rounded border">Read Only (Menunggu Verifikasi)</span>
                        )}
                    </div>
                </div>
            </div>
        </BaseModal>
    );
}